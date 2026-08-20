// A real, two-page PDF built byte by byte, so the exam-PDF viewer can be
// exercised without a binary fixture in the repo — and without reaching
// casact.org, which would make the suite depend on a third party's uptime.
//
// It is deliberately a *valid* file (correct xref offsets, a page tree, a
// content stream per page) rather than the "%PDF-" prefix the endpoint's unit
// tests use: pdf.js parses this one for real, so a regression that breaks
// parsing or rendering shows up as a blank canvas here.
//
// The text is drawn in Helvetica *without embedding it*, which is how the
// examining bodies' own papers are typically produced — that also proves the
// Standard 14 font files shipped by `pdfStandardFontsPlugin` are reachable.

const PAGE_TEXT = ['Examiner Report - page one', 'Sample answers - page two']

export function buildSamplePdf(): Buffer {
  const objects: string[] = []

  const contents = PAGE_TEXT.map(text => {
    const stream = `BT /F1 24 Tf 60 700 Td (${text}) Tj ET\n`
    return `<< /Length ${stream.length} >>\nstream\n${stream}endstream`
  })

  objects[1] = '<< /Type /Catalog /Pages 2 0 R >>'
  objects[2] = '<< /Type /Pages /Kids [3 0 R 4 0 R] /Count 2 >>'
  objects[3] = '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 7 0 R >> >> /Contents 5 0 R >>'
  objects[4] = '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 7 0 R >> >> /Contents 6 0 R >>'
  objects[5] = contents[0]
  objects[6] = contents[1]
  objects[7] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'

  let pdf = '%PDF-1.4\n'
  const offsets: number[] = []
  for (let i = 1; i < objects.length; i++) {
    offsets[i] = pdf.length
    pdf += `${i} 0 obj\n${objects[i]}\nendobj\n`
  }

  // The cross-reference table: byte offset of every object, in the exact
  // 20-character-per-entry format the spec requires.
  const xrefOffset = pdf.length
  pdf += `xref\n0 ${objects.length}\n0000000000 65535 f \n`
  for (let i = 1; i < objects.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`
  }
  pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`

  return Buffer.from(pdf, 'latin1')
}
