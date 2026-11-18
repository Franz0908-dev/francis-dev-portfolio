import fs from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { openBrowser } from './browser.mjs'

// Use the public PDFs, including their flattened TESDA privacy redactions.
execFileSync('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', 'scripts/render-certificate-previews.ps1'], { stdio: 'inherit', windowsHide: true })
const sources = JSON.parse((await fs.readFile('.cache/certificate-previews/sources.json', 'utf8')).replace(/^\uFEFF/, ''))
const browser = await openBrowser()
const manifest = []
try {
  for (const source of sources) {
    const trimMargins = source.name === 'artistic-graphics-editing-workshop'
    const original = await fs.readFile(source.imagePath)
    const dataUrl = `data:image/png;base64,${original.toString('base64')}`
    const result = await browser.evaluate(`(async () => {
      const image = new Image(); image.src = ${JSON.stringify(dataUrl)}; await image.decode();
      let crop = { x: 0, y: 0, width: image.width, height: image.height };
      if (${trimMargins}) {
        const scan = document.createElement('canvas'); scan.width = image.width; scan.height = image.height;
        const scanContext = scan.getContext('2d', { willReadFrequently: true }); scanContext.drawImage(image, 0, 0);
        const pixels = scanContext.getImageData(0, 0, image.width, image.height).data;
        let left = image.width, top = image.height, right = -1, bottom = -1;
        for (let y = 0; y < image.height; y++) for (let x = 0; x < image.width; x++) {
          const offset = (y * image.width + x) * 4;
          if (Math.min(pixels[offset], pixels[offset + 1], pixels[offset + 2]) < 248) {
            left = Math.min(left, x); right = Math.max(right, x); top = Math.min(top, y); bottom = Math.max(bottom, y);
          }
        }
        if (right < left) throw new Error('Workshop document has no visible design');
        // Retain a small safety border so antialiased design edges stay intact.
        left = Math.max(0, left - 4); top = Math.max(0, top - 4);
        right = Math.min(image.width - 1, right + 4); bottom = Math.min(image.height - 1, bottom + 4);
        crop = { x: left, y: top, width: right - left + 1, height: bottom - top + 1 };
      }
      const canvas = document.createElement('canvas'); canvas.width = 960; canvas.height = Math.round(crop.height * canvas.width / crop.width);
      const context = canvas.getContext('2d'); context.imageSmoothingQuality = 'high'; context.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, canvas.width, canvas.height);
      return { data: canvas.toDataURL('image/webp', 0.86), width: canvas.width, height: canvas.height, crop, sourceWidth: image.width, sourceHeight: image.height };
    })()`)
    if (!result.data.startsWith('data:image/webp;')) throw new Error('Browser did not encode WebP')
    const bytes = Buffer.from(result.data.split(',')[1], 'base64')
    const image = `/certificates/${source.name}.webp`
    await fs.writeFile(`public${image}`, bytes)
    manifest.push({ image, width: result.width, height: result.height, bytes: bytes.length, crop: result.crop, sourceWidth: result.sourceWidth, sourceHeight: result.sourceHeight })
    console.log(image, `${result.width}x${result.height}`, bytes.length, 'bytes')
  }
  await fs.writeFile('.cache/certificate-previews/manifest.json', JSON.stringify(manifest, null, 2))
} finally { await browser.close() }
