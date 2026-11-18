import fs from 'node:fs/promises'
import { openBrowser } from './browser.mjs'
const browser = await openBrowser()
try {
  for (const [file, stem, widths, quality] of [
    ['hero-purple-workspace.png', 'hero', [768,1280,1672], 0.83],
    ['profile-approved-neon-avatar.png', 'portrait', [160,320], 0.88],
  ]) {
    const data = await fs.readFile(`source-assets/images/${file}`)
    const source = `data:image/png;base64,${data.toString('base64')}`
    for(const width of widths) {
      const result = await browser.evaluate(`(async () => {
        const image = new Image(); image.src = ${JSON.stringify(source)}; await image.decode();
        const canvas = document.createElement('canvas'); canvas.width = ${width}; canvas.height = Math.round(image.height * canvas.width / image.width);
        const context = canvas.getContext('2d'); context.imageSmoothingQuality = 'high'; context.drawImage(image, 0, 0, canvas.width, canvas.height);
        return {data: canvas.toDataURL('image/webp', ${quality}), width: canvas.width, height: canvas.height};
      })()`)
      const output=`public/assets/images/${stem}-${width}.webp`
      const buffer=Buffer.from(result.data.split(',')[1],'base64')
      await fs.writeFile(output,buffer)
      console.log(output,`${result.width}x${result.height}`,buffer.length,'bytes')
    }
  }
} finally { await browser.close() }
