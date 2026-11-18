// Small, searchable PDF writer using the built-in PDF Helvetica fonts.
// All content is plain text; no remote services, image-only pages, or private metadata.
const ascii = text => String(text).replace(/[–—]/g, '-').replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/·/g, '|').replace(/[^\x20-\x7e]/g, '')
const literal = text => ascii(text).replace(/([\\()])/g, '\\$1')
const widths = [278,278,355,556,556,889,667,191,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,278,278,584,584,584,556,1015,667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,667,778,722,667,611,722,667,944,667,667,611,278,278,278,469,556,333,556,556,500,556,556,278,556,556,222,222,500,222,833,556,556,556,556,333,500,278,556,500,722,500,500,500,334,260,334,584]

export function textPdf(blocks, title) {
  const pageWidth=595.28, pageHeight=841.89, margin=43
  let y=pageHeight-margin
  const commands=[]; const links=[]
  for(const block of blocks) {
    const size=block.size||10
    y-=block.before||0
    if(block.rule) { commands.push(`0.72 0.65 0.81 RG ${margin} ${y+4} m ${pageWidth-margin} ${y+4} l S`); y-=4 }
    const measure=text=>[...text].reduce((sum,c)=>sum+(widths[c.charCodeAt(0)-32]||556),0)*size/1000*(block.bold?1.06:1)
    const words=ascii(block.text).split(/\s+/)
    const lines=[]; let line=''
    for(const word of words) {
      const candidate=line?`${line} ${word}`:word
      if(measure(candidate)>pageWidth-2*margin && line) { lines.push(line); line=word } else line=candidate
    }
    if(line)lines.push(line)
    for(const text of lines) {
      y-=size*(block.leading||1.35)
      commands.push(`BT /${block.bold?'F2':'F1'} ${size} Tf ${block.color||'0.12 0.10 0.16'} rg 1 0 0 1 ${margin} ${y.toFixed(2)} Tm (${literal(text)}) Tj ET`)
      if(block.url)links.push({url:block.url,rect:[margin,y-2,margin+measure(text),y+size]})
    }
    y-=block.after||0
  }
  if(y<margin)throw new Error(`Resume overflows one page (last baseline ${y.toFixed(1)}). Shorten copy or adjust spacing.`)
  const stream=commands.join('\n')
  const objects=[null,'<< /Type /Catalog /Pages 2 0 R >>','<< /Type /Pages /Kids [3 0 R] /Count 1 >>',`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R /Annots [${links.map((_,i)=>`${8+i} 0 R`).join(' ')}] >>`,'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>','<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>',`<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`,`<< /Title (${literal(title)}) /Author (Francis Lee Recanil) >>`,...links.map(link=>`<< /Type /Annot /Subtype /Link /Rect [${link.rect.join(' ')}] /Border [0 0 0] /A << /S /URI /URI (${literal(link.url)}) >> >>`)]
  let pdf='%PDF-1.4\n'; const offsets=[0]
  for(let i=1;i<objects.length;i++) { offsets.push(Buffer.byteLength(pdf)); pdf+=`${i} 0 obj\n${objects[i]}\nendobj\n` }
  const xref=Buffer.byteLength(pdf)
  pdf+=`xref\n0 ${objects.length}\n0000000000 65535 f \n${offsets.slice(1).map(offset=>String(offset).padStart(10,'0')+' 00000 n \n').join('')}trailer\n<< /Size ${objects.length} /Root 1 0 R /Info 7 0 R >>\nstartxref\n${xref}\n%%EOF\n`
  return {data:Buffer.from(pdf),lastBaseline:y}
}
