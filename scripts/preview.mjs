import http from 'node:http'
import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

export async function startPreview(port = 0) {
  const root = path.resolve('dist')
  const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript', '.css':'text/css', '.svg':'image/svg+xml', '.png':'image/png', '.webp':'image/webp', '.pdf':'application/pdf', '.woff2':'font/woff2' }
  const server = http.createServer(async (request, response) => {
    try {
      let pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname)
      if (pathname.startsWith('/portfolio/')) pathname = pathname.slice('/portfolio'.length)
      const file = path.resolve(root, '.' + pathname + (pathname.endsWith('/') ? 'index.html' : ''))
      if (!file.startsWith(root + path.sep)) { response.writeHead(403).end(); return }
      const data = await fs.readFile(file)
      response.writeHead(200, { 'Content-Type':types[path.extname(file)] || 'application/octet-stream', 'Cache-Control':'no-store' })
      response.end(request.method === 'HEAD' ? undefined : data)
    } catch { response.writeHead(404).end('Not found') }
  })
  await new Promise(resolve => server.listen(port,'127.0.0.1',resolve))
  return { url:`http://127.0.0.1:${server.address().port}`, close:()=>new Promise(resolve=>server.close(resolve)) }
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const preview = await startPreview(4180)
  console.log(`Production preview: ${preview.url}/ (also mounted at /portfolio/)`)
}
