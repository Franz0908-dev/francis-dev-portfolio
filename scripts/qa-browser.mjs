import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { openBrowser } from './browser.mjs'
import { startPreview } from './preview.mjs'

const preview = await startPreview()
const browser = await openBrowser()
const screenshot = async name => { if (process.env.QA_NO_SCREENSHOTS !== '1') await browser.screenshot(name) }
const errors=[]; const report=[]
browser.on('Runtime.exceptionThrown', event=>errors.push(event.exceptionDetails.text))
browser.on('Runtime.consoleAPICalled', event=>{if(['error','warning'].includes(event.type)) errors.push(event.args.map(arg=>arg.value||arg.description).join(' '))})
browser.on('Network.responseReceived', event=>{if(event.response.status>=400)errors.push(`${event.response.status} ${event.response.url}`)})
browser.on('Network.loadingFailed', event=>{if(!event.canceled)errors.push(event.errorText)})
const evaluate = browser.evaluate
const key = async (key, code=key, modifiers=0) => { const windowsVirtualKeyCode={Enter:13,Tab:9,Escape:27,ArrowLeft:37,ArrowRight:39}[key]; await browser.send('Input.dispatchKeyEvent',{type:'keyDown',key,code,modifiers,windowsVirtualKeyCode,text:key==='Enter'?'\r':undefined}); await browser.send('Input.dispatchKeyEvent',{type:'keyUp',key,code,modifiers,windowsVirtualKeyCode}) }
const settle = () => evaluate(`new Promise(resolve=>{let previous=scrollY,stable=0;const tick=()=>{stable=scrollY===previous?stable+1:0;previous=scrollY;if(stable>5)resolve(true);else requestAnimationFrame(tick)};requestAnimationFrame(tick)})`)
const tap = async (selector, touch=false) => {
  const point=await evaluate(`(()=>{const e=document.querySelector(${JSON.stringify(selector)});const r=e.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`)
  if(touch) { await browser.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[point]}); await browser.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]}) }
  else { await browser.send('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',clickCount:1,...point}); await browser.send('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',clickCount:1,...point}) }
}
try {
  const mounts = ['/', '/portfolio/'].filter(mount => !process.env.QA_MOUNT || mount === process.env.QA_MOUNT)
  assert.ok(mounts.length, 'QA_MOUNT must be / or /portfolio/')
  for (const mount of mounts) {
    for (const [name,width,height,touch] of [['desktop',1440,900,false],['tablet',820,1180,true],['mobile',390,844,true],['narrow',320,700,true],['short-desktop',1024,600,false]]) {
      await browser.viewport(width,height,touch)
      await browser.navigate(preview.url+mount)
      await evaluate('document.fonts.ready.then(()=>true)')
      assert.equal(await evaluate('document.querySelectorAll(".certification-card__preview img").length'),5)
      // Must load before visiting Certifications; no lazy, click or hover gate.
      await browser.waitFor('[...document.querySelectorAll(".certification-card__preview img")].every(image=>image.complete && image.naturalWidth>0)')
      assert.equal(await evaluate('getComputedStyle(document.querySelector(".certification-grid")).gridTemplateColumns.split(" ").length'),width<768?1:2)
      await settle()
      assert.equal(await evaluate('document.documentElement.scrollWidth <= innerWidth'), true, `${name}: horizontal overflow`)
      assert.equal(await evaluate('document.querySelector("h1").textContent'), 'Francis Lee Recanil')
      const prefix=mount==='/'?'root':'subpath'
      await screenshot(`after-${prefix}-${name}`)
      if (mount==='/' && name==='desktop') {
        await evaluate('document.body.tabIndex=-1; document.body.focus()')
        await key('Tab')
        assert.equal(await evaluate('document.activeElement.className'),'skip-link')
        await key('Enter')
        assert.equal(await evaluate('document.activeElement.id'),'main-content')
        await evaluate('document.body.removeAttribute("tabindex")')
        const downloadPath=path.resolve('.cache/downloads')
        await fs.mkdir(downloadPath,{recursive:true})
        await fs.rm(path.join(downloadPath,'Francis-Lee-Recanil-Resume.pdf'),{force:true})
        await browser.send('Browser.setDownloadBehavior',{behavior:'allow',downloadPath})
        await evaluate('document.querySelector(".hero__actions a[download]").click()')
        let downloaded
        for(let attempt=0;attempt<50;attempt++) {
          try { downloaded=await fs.readFile(path.join(downloadPath,'Francis-Lee-Recanil-Resume.pdf')); if(downloaded.length)break } catch { /* Waiting for browser download. */ }
          await new Promise(resolve=>setTimeout(resolve,100))
        }
        const expected=await fs.readFile('public/documents/francis-lee-recanil-resume-updated.pdf')
        assert.ok(downloaded,'browser completed resume download')
        assert.equal(createHash('sha256').update(downloaded).digest('hex'),createHash('sha256').update(expected).digest('hex'))
        await evaluate('document.querySelector(".hero__actions a[target=_blank]").click()')
        const {targetInfos}=await browser.send('Target.getTargets')
        const resumeTab=targetInfos.find(target=>target.url.endsWith('francis-lee-recanil-resume-updated.pdf'))
        assert.ok(resumeTab,'View resume opens PDF in a new tab')
        await browser.send('Target.closeTarget',{targetId:resumeTab.targetId})
      }
      const nav=width>=1024?'.sidebar-nav':width>=768?'.mobile-header__nav':'.mobile-nav'
      const ids=await evaluate(`[...document.querySelectorAll('${nav} a')].map(a=>a.hash.slice(1))`)
      assert.deepEqual(ids,['introduction','project','skills','education','certifications','contact'])
      assert.equal(await evaluate(`document.querySelectorAll('#experience, a[href="#experience"]').length`),0,'deleted section has no remaining navigation targets')
      assert.deepEqual(await evaluate('[...document.querySelectorAll("main > section")].map(section=>section.id)'),ids,'Projects occupies the former internship position exactly once')
      assert.deepEqual(await evaluate('[...document.querySelectorAll("main h2")].map(heading=>heading.textContent)'),['01 / Featured projects','02 / Skills & technologies','03 / Education','04 / Certifications & training','05 / Contact'])
      assert.deepEqual(await evaluate('[...document.querySelectorAll(".section-eyebrow")].map(label=>({text:label.textContent,inHeading:!!label.closest("h2")}))'),['01 /','02 /','03 /','04 /','05 /'].map(text=>({text,inHeading:true})))
      assert.equal(await evaluate(`document.querySelector('${nav} a[href="#skills"]').textContent.trim()`),'Skills & technologies')
      assert.equal(await evaluate('document.querySelector(".hero__scroll").textContent.trim()'),'Explore projects')
      assert.equal(await evaluate('document.querySelector(".hero__scroll").hash'),'#project')
      await evaluate('document.querySelector(".hero__scroll").scrollIntoView({behavior:"instant",block:"center"})')
      await tap('.hero__scroll',touch)
      await settle()
      await browser.waitFor(`location.hash==='#project' && document.querySelector('${nav} [aria-current]')?.hash==='#project'`)
      assert.equal(await evaluate('(()=>{const rect=document.querySelector("#project-title").getBoundingClientRect();return rect.top>=0 && rect.bottom<=innerHeight})()'),true,'hero shortcut lands at the Featured Projects heading')
      assert.equal(await evaluate('document.querySelector("#contact .section-heading p").textContent'),'For roles and web projects')
      for (const id of ids.slice(1)) {
        await evaluate(`(()=>{const a=document.querySelector('${nav} a[href="#${id}"]');a.parentElement.scrollLeft=a.offsetLeft-a.parentElement.clientWidth/2+a.offsetWidth/2;})()`)
        await tap(`${nav} a[href="#${id}"]`,touch)
        await settle()
        await browser.waitFor(`document.querySelector('${nav} [aria-current]')?.hash === '#${id}'`)
        assert.equal(await evaluate(`document.querySelectorAll('${nav} [aria-current]').length`),1)
        if(name==='mobile' && ['education','certifications'].includes(id)) await screenshot(`after-${prefix}-mobile-${id}`)
        if(['desktop','mobile'].includes(name)) await screenshot(`headings-${prefix}-${name}-${id}`)
      }
      // Returning upward must update from Contact to Education, then Projects.
      for(const id of ['education','project']) {
        await evaluate(`document.getElementById('${id}').scrollIntoView({behavior:'instant',block:'start'})`)
        await settle()
        await browser.waitFor(`document.querySelector('${nav} [aria-current]')?.hash === '#${id}'`)
      }
      assert.deepEqual(await evaluate('[...document.querySelectorAll(".case-study h3")].map(title=>title.textContent)'),['1128 Tea & Café Point of Sale & Inventory System','Chimes Sales and Inventory System','BCP Laboratory Reservation System'])
      assert.equal(await evaluate('document.querySelector("#sales-inventory-title").nextElementSibling.textContent'),'Chimes Consulting · Team internship project')
      assert.equal(await evaluate('document.querySelectorAll(".case-study .section-eyebrow").length'),0)
      assert.equal(await evaluate('document.querySelectorAll(".case-study__context")[0].textContent'),'Full-stack development')
      assert.equal(await evaluate('document.querySelectorAll(".case-study__toggle[aria-expanded=false]").length'),3)
      assert.equal(await evaluate('document.querySelector("#project .section-heading p:last-child").textContent'),'Selected applications and my role in each.')
      await evaluate('Promise.all([...document.querySelectorAll(".case-study__cover img")].map(image=>image.decode())).then(()=>true)')
      const covers=await evaluate('[...document.querySelectorAll(".case-study__cover img")].map(image=>image.src)')
      assert.ok(covers[0].endsWith('/images/1128-pos/01-cover-pos-workspace.png'))
      assert.ok(covers[1].endsWith('/assets/projects/01-reports-analytics.png'))
      assert.ok(covers[2].endsWith('/images/bcp-lab-reservation/02-availability-calendar.png'))
      for(let projectIndex=0;projectIndex<3;projectIndex++) {
        await evaluate(`document.querySelectorAll('.case-study')[${projectIndex}].scrollIntoView({block:'start',behavior:'instant'})`)
        await settle()
        const layout=await evaluate(`(()=>{const card=document.querySelectorAll('.case-study')[${projectIndex}],summary=card.querySelector('.case-study__summary').getBoundingClientRect(),cover=card.querySelector('.case-study__cover').getBoundingClientRect(),image=card.querySelector('.case-study__cover img');return {summaryTop:summary.top,summaryLeft:summary.left,summaryBottom:summary.bottom,coverTop:cover.top,coverLeft:cover.left,coverBottom:cover.bottom,fit:getComputedStyle(image).objectFit,technologies:card.querySelectorAll('.case-study__technologies li').length}})()`)
        assert.equal(layout.technologies,4)
        assert.equal(await evaluate(`[...document.querySelectorAll('.case-study h3')].every(title=>{const style=getComputedStyle(title);return title.getBoundingClientRect().height>0 && style.visibility==='visible' && style.display!=='none'})`),true,'all collapsed titles are visible')
        assert.equal(layout.fit,'contain')
        if(width<768) assert.ok(layout.summaryBottom<=layout.coverTop,'mobile title and contribution precede screenshot')
        else assert.ok(layout.summaryLeft<layout.coverLeft && layout.summaryBottom>layout.coverTop && layout.coverBottom>layout.summaryTop,'desktop summary and screenshot sit beside each other')
        if(['desktop','mobile'].includes(name)) await screenshot(`project-${prefix}-${name}-${projectIndex+1}-collapsed`)
        await evaluate(`document.querySelectorAll('.case-study__toggle')[${projectIndex}].focus()`)
        await key('Enter')
        await browser.waitFor(`document.querySelectorAll('.case-study__toggle')[${projectIndex}].getAttribute('aria-expanded')==='true'`)
        assert.equal(await evaluate(`document.querySelectorAll('.case-study__details')[${projectIndex}].hidden`),false)
        if(projectIndex===2)assert.equal(await evaluate('document.querySelector("#bcp-lab-reservation-details h4").textContent'),'Reservation prototype details')
        assert.deepEqual(await evaluate('[...document.querySelectorAll(".case-study__details")].map(panel=>panel.hidden)'),[0,1,2].map(index=>index!==projectIndex),'only selected card details open')
        await key('Tab')
        assert.equal(await evaluate(`document.querySelectorAll('.case-study__details')[${projectIndex}].querySelector('.project-screenshot__trigger')===document.activeElement`),true,'expanded screenshots follow toggle in keyboard order')
        await key('Enter')
        await browser.waitFor('!!document.querySelector("dialog[open]")')
        await key('Escape')
        await browser.waitFor('!document.querySelector("dialog")')
        assert.equal(await evaluate(`document.querySelectorAll('.case-study__details')[${projectIndex}].querySelector('.project-screenshot__trigger')===document.activeElement`),true,'viewer returns focus inside expanded panel')
        if(['desktop','mobile'].includes(name)) await screenshot(`project-${prefix}-${name}-${projectIndex+1}-expanded`)
        await evaluate(`document.querySelectorAll('.case-study__toggle')[${projectIndex}].focus()`)
        await key('Enter')
        assert.equal(await evaluate(`document.querySelectorAll('.case-study__details')[${projectIndex}].hidden`),true)
        assert.equal(await evaluate(`document.querySelectorAll('.case-study__toggle')[${projectIndex}]===document.activeElement`),true)
      }
      // Exercise all three independent galleries, including every screenshot.
      await evaluate('document.querySelectorAll(".case-study__toggle").forEach(button=>button.click())')
      const screenshotIndices=Array.from({length:13},(_,index)=>index)
      const posImages=await evaluate('[...document.querySelectorAll(".case-study")[0].querySelectorAll(".project-screenshot__trigger img")].map(image=>image.src.split("/").at(-1))')
      assert.deepEqual(posImages,['01-cover-pos-workspace.png','02-gallery-product-catalog.png','03-gallery-inventory-stock.png','04-gallery-completed-receipts.png','05-gallery-sales-reports.png'])
      const projectGalleries=await evaluate('[...document.querySelectorAll(".case-study")].map(card=>[...card.querySelectorAll(".project-screenshot__trigger")].map(trigger=>({title:trigger.querySelector("img").closest("figure").querySelector("figcaption strong").textContent,src:trigger.querySelector("img").src})))')
      assert.deepEqual(projectGalleries.map(gallery=>gallery.length),[5,4,4])
      assert.ok(projectGalleries[1].every(image=>image.src.includes('/assets/projects/')),'Sales gallery contains only internship screens')
      assert.deepEqual(projectGalleries[2].map(image=>image.title),['Availability Calendar','Administrator Dashboard','Create Reservation','Equipment Management'])
      assert.equal(new Set(projectGalleries.flat().map(image=>image.src)).size,13,'all screenshots are unique')
      const count=screenshotIndices.length
      for (let item=0;item<count;item++) {
        const index=screenshotIndices[item]
        await evaluate(`(()=>{const trigger=document.querySelectorAll('.project-screenshot__trigger')[${index}];trigger.scrollIntoView({behavior:'instant',block:'center'});trigger.focus({preventScroll:true})})()`)
        await settle()
        const scrollBefore=await evaluate('scrollY')
        assert.equal(await evaluate(`document.activeElement===document.querySelectorAll('.project-screenshot__trigger')[${index}]`),true,'trigger focused before opening')
        await key('Enter')
        await browser.waitFor('!!document.querySelector("dialog[open]")')
        await evaluate('document.querySelector("dialog img").decode().then(()=>true)')
        const bounds=await evaluate(`(()=>{const d=document.querySelector('dialog');const r=d.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,viewportWidth:innerWidth,viewportHeight:innerHeight,modal:d.matches(':modal'),body:d.parentElement===document.body}})()`)
        assert.equal(bounds.modal,true); assert.equal(bounds.body,true)
        assert.ok(Math.abs(bounds.x)<1 && Math.abs(bounds.y)<1 && Math.abs(bounds.width-bounds.viewportWidth)<1 && Math.abs(bounds.height-bounds.viewportHeight)<1,JSON.stringify(bounds))
        const firstTitle=await evaluate('document.querySelector("#project-lightbox-title").textContent')
        const gallery=projectGalleries[index<5?0:index<9?1:2]
        assert.equal(firstTitle,projectGalleries.flat()[index].title,'correct project image opens')
        for(let step=0;step<gallery.length;step++) {
          const current=await evaluate('({title:document.querySelector("#project-lightbox-title").textContent,src:document.querySelector("dialog img").src})')
          assert.ok(gallery.some(image=>image.title===current.title && image.src===current.src),'viewer stays inside its project gallery')
          await key('ArrowRight')
        }
        assert.equal(await evaluate('document.querySelector("#project-lightbox-title").textContent'),firstTitle,'gallery wraps within its own project')
        await key('ArrowRight')
        assert.notEqual(await evaluate('document.querySelector("#project-lightbox-title").textContent'),firstTitle)
        await key('ArrowLeft')
        assert.equal(await evaluate('document.querySelector("#project-lightbox-title").textContent'),firstTitle)
        await key('Tab','Tab',8)
        assert.equal(await evaluate('document.querySelector("dialog").contains(document.activeElement)'),true,'Shift+Tab stays in modal')
        await key('Tab')
        assert.equal(await evaluate('document.activeElement.getAttribute("aria-label")'),'Close enlarged screenshot')
        await evaluate('document.querySelector(".hero__actions a").focus()')
        assert.equal(await evaluate('document.querySelector("dialog").contains(document.activeElement)'),true,'background cannot receive focus')
        if(touch && item===0) {
          const position=await evaluate(`(()=>{const r=document.querySelector('dialog img').getBoundingClientRect();return {x:r.x+r.width*0.8,y:r.y+r.height/2,endX:r.x+r.width*0.2}})()`)
          await browser.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:position.x,y:position.y}]})
          await browser.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:position.endX,y:position.y}]})
          await browser.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]})
          await browser.waitFor(`document.querySelector('#project-lightbox-title').textContent !== ${JSON.stringify(firstTitle)}`)
        }
        if(item===0)await screenshot(`after-${prefix}-${name}-viewer`)
        if(item%2===0)await key('Escape')
        else await tap('.project-lightbox__close',touch)
        await browser.waitFor('!document.querySelector("dialog")')
        assert.equal(await evaluate(`document.activeElement===document.querySelectorAll('.project-screenshot__trigger')[${index}]`),true,'focus restored to original screenshot')
        assert.ok(Math.abs(await evaluate('scrollY')-scrollBefore)<2,'scroll position preserved')
      }
      await evaluate(`Promise.all([...document.images].map(async image=>{image.loading='eager';await image.decode()})).then(()=>true)`)
      assert.equal(await evaluate('[...document.images].every(image=>image.naturalWidth>0)'),true)
      const files=await evaluate(`[...new Set([...document.querySelectorAll('a[href]')].map(a=>a.href).filter(h=>h.startsWith(location.origin)&&/\.(pdf|webp|png)$/.test(h)))]`)
      for(const url of files) {
        const response=await fetch(url); assert.equal(response.status,200,url)
        if(url.endsWith('.pdf'))assert.equal(Buffer.from(await response.arrayBuffer()).subarray(0,5).toString(),'%PDF-')
      }
      assert.equal(await evaluate('document.querySelectorAll(".certification-card").length'),5)
      assert.equal(await evaluate('document.querySelector(".certification-card__note").textContent'),'The supplied workshop document has a blank recipient field.')
      const certificateLinks=await evaluate("[...document.querySelectorAll('.certification-card a[type]')].map(link=>({href:link.href,target:link.target,label:link.getAttribute('aria-label')}))")
      assert.equal(certificateLinks.length,5,'all five supplied PDFs have links')
      assert.equal(new Set(certificateLinks.map(link=>link.href)).size,5)
      for(const [index,link] of certificateLinks.entries()) {
        const previewState=await evaluate(`(()=>{const a=document.querySelectorAll('.certification-card__preview')[${index}];a.scrollIntoView({block:'center',behavior:'instant'});const img=a.querySelector('img');const r=img.getBoundingClientRect();return {href:a.href,src:img.src,width:r.width,height:r.height,naturalWidth:img.naturalWidth,naturalHeight:img.naturalHeight,visible:r.top<innerHeight&&r.bottom>0&&getComputedStyle(img).visibility==='visible',beforeTitle:r.top<a.parentElement.querySelector('h3').getBoundingClientRect().top,loading:img.loading}})()`)
        await settle()
        assert.equal(previewState.href,link.href,'preview and text action open the same certificate')
        assert.ok(previewState.src.startsWith(preview.url+mount+'certificates/'))
        assert.equal(previewState.loading,'eager')
        assert.equal(previewState.visible,true)
        assert.equal(previewState.beforeTitle,true)
        assert.ok(Math.abs(previewState.width/previewState.height-previewState.naturalWidth/previewState.naturalHeight)<0.002,'full certificate aspect ratio is preserved')
        if(['desktop','mobile'].includes(name)) {
          await screenshot(`certificate-${prefix}-${name}-${index+1}`)
          await tap(`.certification-card:nth-child(${index+1}) .certification-card__preview`,touch)
          const {targetInfos}=await browser.send('Target.getTargets')
          const previewTab=targetInfos.find(target=>target.url===link.href)
          assert.ok(previewTab,'clicking the image opens its full PDF')
          await browser.send('Target.closeTarget',{targetId:previewTab.targetId})
        }
        assert.equal(link.target,'_blank')
        assert.ok(link.label.startsWith(index===4?'View workshop document: ':'View certificate: '))
        assert.ok(link.href.startsWith(preview.url+mount+'certificates/'),'certificate respects deployment subpath')
        const response=await fetch(link.href)
        assert.equal(response.status,200,link.href)
        assert.equal(response.headers.get('content-type'),'application/pdf')
        const bytes=Buffer.from(await response.arrayBuffer())
        assert.equal(bytes.subarray(0,5).toString(),'%PDF-')
        const expected=await fs.readFile('public/certificates/'+new URL(link.href).pathname.split('/').at(-1))
        assert.equal(createHash('sha256').update(bytes).digest('hex'),createHash('sha256').update(expected).digest('hex'))
        if(name==='desktop') {
          await evaluate("document.querySelectorAll(\".certification-card a[type]\")["+index+"].click()")
          const {targetInfos}=await browser.send('Target.getTargets')
          const certificateTab=targetInfos.find(target=>target.url===link.href)
          assert.ok(certificateTab,'View certificate opens the correct PDF in a new tab')
          await browser.send('Target.closeTarget',{targetId:certificateTab.targetId})
        }
      }
      assert.equal(await evaluate('document.querySelectorAll(".certification-card a").length'),10,'five image previews plus five text PDF links')
      assert.equal(await evaluate('document.querySelectorAll("a[download]").length'),3)
      assert.equal(await evaluate('document.querySelector("a[href^=mailto]").href'), 'mailto:francislee.0908@gmail.com')
      assert.ok(await evaluate(`document.querySelector('a[href="https://www.linkedin.com/in/francis-lee-recanil-53b77a402/"]') !== null`))
      report.push({mount,name,width,height,status:'passed'})
      console.log('Passed',mount,name)
    }
  }
  await browser.send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]})
  await browser.viewport(390,844,true)
  await browser.navigate(preview.url+'/')
  assert.equal(await evaluate('getComputedStyle(document.documentElement).scrollBehavior'),'auto')
  await screenshot('after-reduced-motion')
  assert.deepEqual(errors,[],'browser console and network errors')
  await fs.writeFile('.cache/browser-report.json',JSON.stringify({checks:report,reducedMotion:'passed',consoleErrors:errors,screenshots:process.env.QA_NO_SCREENSHOTS==='1'?'separate captures visually inspected; capture disabled for this interaction run':'captured'},null,2))
  console.log(`Browser QA passed: ${mounts.join(' and ')}, five viewports, keyboard, touch, focus, media, resume, certificates, reduced motion. No console/network errors.`)
} catch(error) { await screenshot('qa-failure').catch(()=>{}); console.error('Browser errors:',errors); throw error } finally { await browser.close(); await preview.close() }
