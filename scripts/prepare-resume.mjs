import fs from 'node:fs/promises'
import { openBrowser } from './browser.mjs'
import { textPdf } from './pdf.mjs'

const browser = await openBrowser()
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))
try {
  await browser.navigate(process.env.DEV_URL || 'http://127.0.0.1:5173/')
  const {profile, internship, featuredProject, academicProject, education, certifications} = await browser.evaluate(`import('/src/data/portfolio.ts').then(({profile,internship,featuredProject,academicProject,education,certifications})=>({profile,internship,featuredProject,academicProject,education,certifications}))`)
  const stack = project => project.technologies.map(escape).join(' · ')
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${escape(profile.name)} | Junior Full Stack Web Developer</title>
  <style>@page{size:A4;margin:13mm 15mm}*{box-sizing:border-box}body{font-family:Arial,sans-serif;font-size:10pt;line-height:1.4;color:#20202b;margin:0}h1{font-size:24pt;line-height:1.1;margin:0 0 4pt;color:#261a40}h2{font-size:10pt;text-transform:uppercase;letter-spacing:1pt;border-bottom:1px solid #b7a6cf;padding-bottom:4pt;margin:13pt 0 6pt;color:#42256b}h3{font-size:10.5pt;margin:7pt 0 3pt}p{margin:4pt 0}a{color:#42256b;text-decoration:none}.role{font-size:12pt}.contact{font-size:9pt;line-height:1.6}.meta{color:#4d4659;font-size:9pt}.stack{font-size:9pt;color:#4d4659}section,article{break-inside:avoid}ul{margin:4pt 0;padding-left:15pt}li{margin:3pt 0}.credentials{display:grid;grid-template-columns:1fr 1fr;gap:5pt 16pt}.credentials p{margin:0}</style></head><body>
  <header><h1>${escape(profile.name)}</h1><p class="role">${escape(profile.role)}</p><p class="contact">Valenzuela City, Philippines · <a href="mailto:${profile.email}">${profile.email}</a><br><a href="${profile.github}">github.com/Franz0908-dev</a> · <a href="${profile.linkedin}">LinkedIn: Francis Lee Recanil</a></p></header>
  <section><h2>Profile</h2><p>${escape(profile.introduction)}</p></section>
  <section><h2>Internship experience</h2><h3>${escape(internship.role)} | ${escape(internship.company)}</h3><p class="meta">${escape(internship.period)} · ${escape(internship.hours)}</p><p>${escape(internship.summary)}</p></section>
  <section><h2>Selected projects</h2>
  <article><h3>${escape(featuredProject.title)} | Team project</h3><p>${escape(featuredProject.description)}</p><p>${escape(featuredProject.contribution)}</p><p class="stack">${stack(featuredProject)}</p></article>
  <article><h3>${escape(academicProject.title)} | Solo academic prototype</h3><p>${escape(academicProject.description)}</p><p>${escape(academicProject.developmentContext)}</p><p class="stack">${stack(academicProject)}</p><p class="meta">Original proposal: School Laboratory Reservation System, with SQL Server proposed. The later prototype uses SQLite.</p></article></section>
  <section><h2>Education</h2><h3>${escape(education.program)}</h3><p>${escape(education.school)} · ${escape(education.period)}</p><p>${escape(education.status)}</p></section>
  <section><h2>Certifications & training</h2><div class="credentials">${certifications.map(item=>`<p><strong>${escape(item.title)}</strong><br>${escape(item.issuer)}${item.date ? ` · ${escape(item.date)}`:''}${item.detail ? ` · ${escape(item.detail)}`:''}${item.note ? `<br><em>${escape(item.note)}</em>`:''}</p>`).join('')}</div></section>
  </body></html>`
  await fs.mkdir('documents',{recursive:true})
  await fs.writeFile('documents/resume.html',html)
  const {frameTree} = await browser.send('Page.getFrameTree')
  await browser.send('Page.setDocumentContent',{frameId:frameTree.frame.id,html})
  const heading = text => ({text, size:9.5, bold:true, before:12, after:3, rule:true, color:'0.26 0.14 0.42'})
  const paragraph = text => ({text,size:9.6,after:3})
  const {data,lastBaseline}=textPdf([
    {text:profile.name,size:23,bold:true,color:'0.15 0.10 0.25'},
    {text:profile.role,size:12,after:4},
    {text:'Valenzuela City, Philippines | '+profile.email,size:9,url:'mailto:'+profile.email},
    {text:'GitHub: github.com/Franz0908-dev',size:9,url:profile.github},
    {text:'LinkedIn: Francis Lee Recanil',size:9,url:profile.linkedin},
    heading('PROFILE'),paragraph(profile.introduction),
    heading('INTERNSHIP EXPERIENCE'),
    {text:internship.role+' | '+internship.company,size:10,bold:true},
    {text:internship.period+' | '+internship.hours,size:9,after:3},
    paragraph(internship.summary),
    heading('SELECTED PROJECTS'),
    {text:featuredProject.title+' | Team project',size:10,bold:true},
    paragraph(featuredProject.description),paragraph(featuredProject.contribution),
    {text:featuredProject.technologies.join(' | '),size:9,after:5},
    {text:academicProject.title+' | Solo academic prototype',size:10,bold:true},
    paragraph(academicProject.description),paragraph(academicProject.developmentContext),
    {text:academicProject.technologies.join(' | '),size:9,after:3},
    {text:'Original proposal: School Laboratory Reservation System, with SQL Server proposed. The later prototype uses SQLite.',size:9},
    heading('EDUCATION'),
    {text:education.program,size:10,bold:true},
    paragraph(education.school+' | '+education.period),paragraph(education.status),
    heading('CERTIFICATIONS & TRAINING'),
    ...certifications.map(item=>({text:item.title+' | '+item.issuer+(item.date?' | '+item.date:'')+(item.detail?' | '+item.detail:'')+(item.note?' | '+item.note:''),size:9.3,after:2})),
  ],profile.name+' | Junior Full Stack Web Developer')
  await fs.writeFile('public/documents/francis-lee-recanil-resume-updated.pdf',data)
  console.log('PDF last baseline:',lastBaseline)
  await browser.screenshot('resume-preview')
  console.log('Revised résumé:',data.length,'bytes; supplied original preserved.')
} finally { await browser.close() }
