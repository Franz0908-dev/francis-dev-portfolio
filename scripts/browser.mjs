import { spawn } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import { existsSync } from 'node:fs'

// Dependency-free Chrome DevTools client for local production QA.
export async function openBrowser() {
  const candidates = process.platform === 'win32' ? ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'] : process.platform === 'darwin' ? ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'] : ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser']
  const executable = process.env.CHROME_PATH || candidates.find(candidate => existsSync(candidate))
  if (!executable) throw new Error('Set CHROME_PATH to an installed Chromium browser')
  const port = 9233
  const processHandle = spawn(executable, ['--headless=new', '--disable-gpu', '--in-process-gpu', ...(process.env.QA_SINGLE_PROCESS === '1' ? ['--single-process', '--no-sandbox'] : []), '--no-first-run', '--no-default-browser-check', `--remote-debugging-port=${port}`, `--user-data-dir=${path.resolve('.cache/browser-profile-qa-single')}`, 'about:blank'], { windowsHide: true, stdio: ['ignore','ignore','pipe'] })
  processHandle.stderr.on('data', data => { if(process.env.BROWSER_DEBUG)console.error(String(data)) })
  processHandle.on('error', error => { console.error(error.message) })
  let target
  for(let attempt=0;attempt<100;attempt++) {
    try { target = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find(item => item.type === 'page'); if(target)break } catch { /* Wait for Chrome startup. */ }
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  if(!target) { processHandle.kill(); throw new Error('Chrome DevTools did not start') }
  const socket = new WebSocket(target.webSocketDebuggerUrl)
  const keepAlive = setInterval(() => {}, 1000)
  await new Promise((resolve,reject) => { socket.onopen=resolve; socket.onerror=reject })
  let sequence=0; const pending = new Map(); const listeners = new Map()
  socket.onclose = () => { for (const item of pending.values()) item.reject(new Error('DevTools connection closed')); pending.clear() }
  socket.onmessage = event => {
    const message=JSON.parse(event.data)
    if(message.id) { const item=pending.get(message.id); if(item) { pending.delete(message.id); message.error ? item.reject(new Error(JSON.stringify(message.error))) : item.resolve(message.result) } }
    else for(const listener of listeners.get(message.method)||[]) listener(message.params)
  }
  const send = (method, params={}) => new Promise((resolve,reject) => { const id=++sequence; const timer=setTimeout(()=>reject(new Error(`DevTools timeout: ${method}`)),15000); pending.set(id,{resolve: value=>{clearTimeout(timer);resolve(value)},reject: error=>{clearTimeout(timer);reject(error)}}); socket.send(JSON.stringify({id,method,params})) })
  const evaluate = async expression => {
    const result = await send('Runtime.evaluate',{ expression, returnByValue:true, awaitPromise:true, userGesture:true })
    if(result.exceptionDetails)throw new Error(JSON.stringify(result.exceptionDetails))
    return result.result.value
  }
  await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable'); await send('Emulation.setFocusEmulationEnabled',{enabled:true})
  return {
    send, evaluate,
    on(method,listener) { listeners.set(method,[...(listeners.get(method)||[]),listener]) },
    async viewport(width,height,touch=false) { await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:touch}); await send('Emulation.setTouchEmulationEnabled',{enabled:touch}) },
    async navigate(url) { await send('Page.navigate',{url}); await this.waitFor('document.readyState === "complete" && !!document.querySelector("h1")') },
    async waitFor(expression) { for(let attempt=0;attempt<100;attempt++) { if(await evaluate(expression))return; await new Promise(resolve=>setTimeout(resolve,100)) } throw new Error(`Timed out: ${expression}`) },
    async screenshot(name) { await fs.mkdir('.cache/screenshots',{recursive:true}); const result=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false}); await fs.writeFile(`.cache/screenshots/${name}.png`,Buffer.from(result.data,'base64')) },
    async close() { await send('Browser.close').catch(()=>{}); socket.close(); processHandle.kill(); clearInterval(keepAlive) },
  }
}
