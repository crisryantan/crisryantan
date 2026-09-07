#!/usr/bin/env node
/**
 * Renders resume/resume.data.js into three artefacts:
 *
 *   resume/resume.html   designed two-column source (open it in a browser to preview)
 *   static/resume.pdf    printed from that HTML by headless Chrome
 *   static/resume.docx   single-column OOXML, easier for recruiters and ATS to parse
 *
 * Usage: npm run resume
 *
 * Only external requirement is a local Google Chrome (for the PDF) and the
 * system `zip` (for the .docx). No new npm dependencies.
 */
import { writeFileSync, mkdtempSync, mkdirSync, rmSync, existsSync } from 'fs'
import { execFileSync } from 'child_process'
import { tmpdir } from 'os'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

import {
  profile,
  summary,
  education,
  skills,
  experience,
} from './resume.data.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const staticDir = join(root, 'static')

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/* ------------------------------------------------------------------ HTML */

/* Inline so the PDF has no external image dependency. */
const svg = (d) =>
  `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`
const icon = {
  phone: svg(
    '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>'
  ),
  mail: svg(
    '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>'
  ),
  globe: svg(
    '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20 15.3 15.3 0 0 1 0-20z"/>'
  ),
  pin: svg(
    '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>'
  ),
}

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${esc(profile.name)} - Résumé</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=Lato:wght@400;700&display=swap" rel="stylesheet" />
<style>
  :root {
    --ink: #2f3a48;
    --ink-soft: #55606e;
    --sidebar: #414c5e;
    --sidebar-hi: #4d596c;
    --rule: #c9cfd8;
    --sidebar-w: 34%;
  }

  @page { size: A4; margin: 0; }

  * { box-sizing: border-box; }

  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Lato', -apple-system, 'Helvetica Neue', Arial, sans-serif;
    font-size: 9.1pt;
    line-height: 1.38;
    color: var(--ink);
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Fixed so Chrome repeats the band on every printed page, matching the
     original two-page layout. */
  .sidebar {
    position: fixed;
    top: 0; left: 0; bottom: 0;
    width: var(--sidebar-w);
    background: var(--sidebar);
    color: #fff;
    padding: 16mm 8mm 9mm;
  }
  .sidebar::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 62mm;
    background: linear-gradient(200deg, var(--sidebar-hi) 0 46%, transparent 46.4%);
  }

  .mark {
    position: relative;
    width: 25mm; height: 25mm;
    margin: 0 auto 7mm;
    border: 1.1pt solid rgba(255,255,255,.8);
    border-radius: 50%;
  }
  .mark span {
    position: absolute;
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    font-size: 16pt;
    color: #fff;
  }
  .mark span:first-child { top: 3.4mm; left: 5.6mm; }
  .mark span:last-child  { bottom: 2.6mm; right: 5.6mm; }

  .side-h {
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    font-size: 10pt;
    letter-spacing: .3em;
    text-transform: uppercase;
    margin: 0 0 3mm;
  }
  .side-sep { border: 0; border-top: .8pt solid rgba(255,255,255,.45); margin: 4.6mm 0; }

  .contact-row { display: flex; gap: 3.4mm; margin-bottom: 2.6mm; align-items: center; }
  .contact-row .ico { width: 3.6mm; height: 3.6mm; flex: none; opacity: .9; }

  .edu-item { margin-bottom: 3.2mm; }
  .edu-q {
    font-weight: 700; font-size: 8pt;
    letter-spacing: .06em; text-transform: uppercase;
    margin-bottom: .8mm;
  }
  .edu-s { color: rgba(255,255,255,.88); }
  .edu-p { font-weight: 700; margin-top: .8mm; }

  .skill-list { margin: 0; padding-left: 4.4mm; }
  .skill-list li { margin-bottom: 1.7mm; }
  .skill-list b { font-weight: 700; }

  /* ------------------------------------------------------------ main */

  main {
    margin-left: var(--sidebar-w);
    padding: 15mm 11mm 8mm 10mm;
  }

  h1 {
    font-family: 'Oswald', 'Helvetica Neue', sans-serif;
    font-weight: 700;
    font-size: 36pt;
    line-height: .96;
    letter-spacing: .01em;
    text-transform: uppercase;
    margin: 0 0 2.5mm;
  }
  .role-line {
    font-weight: 700;
    font-size: 12pt;
    letter-spacing: .28em;
    text-transform: uppercase;
    color: var(--ink-soft);
    margin-bottom: 6mm;
  }

  h2 {
    font-weight: 700;
    font-size: 10.5pt;
    letter-spacing: .34em;
    text-transform: uppercase;
    margin: 0 0 3.5mm;
  }
  .rule { border: 0; border-top: .8pt solid var(--rule); margin: 5mm 0; }

  .summary p { margin: 0 0 2mm; }

  .job { margin-bottom: 3.8mm; break-inside: auto; }
  .job-role {
    font-weight: 700;
    font-size: 10pt;
    letter-spacing: .07em;
    text-transform: uppercase;
    margin-bottom: .8mm;
  }
  .job-where { color: var(--ink-soft); }
  .job-when { font-weight: 700; margin: .6mm 0 2mm; }
  .job ul { margin: 0; padding-left: 4.6mm; }
  .job li { margin-bottom: 1.05mm; }
</style>
</head>
<body>

<aside class="sidebar">
  <div class="mark"><span>${esc(profile.initials[0])}</span><span>${esc(profile.initials[1])}</span></div>

  <h2 class="side-h">Contact</h2>
  <div class="contact-row">${icon.phone}<span>${esc(profile.phone)}</span></div>
  <div class="contact-row">${icon.mail}<span>${esc(profile.email)}</span></div>
  <div class="contact-row">${icon.globe}<span>${esc(profile.website)}</span></div>
  <div class="contact-row">${icon.pin}<span>${esc(profile.location)}</span></div>

  <hr class="side-sep" />

  <h2 class="side-h">Education</h2>
  ${education
    .map(
      (e) => `<div class="edu-item">
    <div class="edu-q">${esc(e.qualification)}</div>
    <div class="edu-s">${esc(e.school)}</div>
    <div class="edu-p">${esc(e.period)}</div>
  </div>`
    )
    .join('\n  ')}

  <hr class="side-sep" />

  <h2 class="side-h">Skills</h2>
  <ul class="skill-list">
    ${skills
      .map((s) => `<li><b>${esc(s.title)}:</b> ${esc(s.items)}</li>`)
      .join('\n    ')}
  </ul>
</aside>

<main>
  <h1>${esc(profile.name)}</h1>
  <div class="role-line">${esc(profile.title)}</div>

  <h2>Summary</h2>
  <div class="summary">
    ${summary.map((p) => `<p>${esc(p)}</p>`).join('\n    ')}
  </div>

  <hr class="rule" />

  <h2>Experience</h2>
  ${experience
    .map(
      (j) => `<section class="job">
    <div class="job-role">${esc(j.role)}</div>
    <div class="job-where">${esc(j.company)} - ${esc(j.location)}</div>
    <div class="job-when">${esc(j.period)}</div>
    <ul>
      ${j.bullets.map((b) => `<li>${esc(b)}</li>`).join('\n      ')}
    </ul>
  </section>`
    )
    .join('\n  ')}
</main>

</body>
</html>
`

const htmlPath = join(here, 'resume.html')
writeFileSync(htmlPath, html)
console.log('wrote resume/resume.html')

/* ------------------------------------------------------------------- PDF */

const CHROME_CANDIDATES = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
]
const chrome = CHROME_CANDIDATES.find((p) => existsSync(p))

if (!chrome) {
  console.error(
    'Skipping PDF: no Chrome found. Checked:\n  ' +
      CHROME_CANDIDATES.join('\n  ')
  )
} else {
  const pdfPath = join(staticDir, 'resume.pdf')
  execFileSync(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--no-pdf-header-footer',
      // Give the webfonts time to arrive before the snapshot is taken.
      '--virtual-time-budget=8000',
      `--print-to-pdf=${pdfPath}`,
      `file://${htmlPath}`,
    ],
    { stdio: 'ignore' }
  )
  console.log('wrote static/resume.pdf')
}

/* ------------------------------------------------------------------ DOCX */

const x = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const p = (text, { style = 'Body', bullet = false } = {}) =>
  `<w:p><w:pPr><w:pStyle w:val="${style}"/>${
    bullet ? '<w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr>' : ''
  }</w:pPr><w:r><w:t xml:space="preserve">${x(text)}</w:t></w:r></w:p>`

const body = [
  p(profile.name, { style: 'Name' }),
  p(
    [
      profile.title,
      profile.location,
      profile.phone,
      profile.email,
      profile.website,
    ].join('  |  '),
    { style: 'Contact' }
  ),

  p('Summary', { style: 'Heading1' }),
  ...summary.map((s) => p(s)),

  p('Experience', { style: 'Heading1' }),
  ...experience.flatMap((j) => [
    p(`${j.role} — ${j.company}`, { style: 'Heading2' }),
    p(`${j.location}  |  ${j.period}`, { style: 'Meta' }),
    ...j.bullets.map((b) => p(b, { bullet: true })),
  ]),

  p('Skills', { style: 'Heading1' }),
  ...skills.map((s) => p(`${s.title}: ${s.items}`, { bullet: true })),

  p('Education', { style: 'Heading1' }),
  ...education.flatMap((e) => [
    p(e.qualification, { style: 'Heading2' }),
    p(`${e.school}  |  ${e.period}`, { style: 'Meta' }),
  ]),
].join('')

const style = (id, name, { size, bold, color, before, after, caps }) =>
  `<w:style w:type="paragraph" w:styleId="${id}"><w:name w:val="${name}"/>` +
  `<w:pPr><w:spacing w:before="${before}" w:after="${after}" w:line="264" w:lineRule="auto"/></w:pPr>` +
  `<w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="${size}"/>` +
  (bold ? '<w:b/>' : '') +
  (caps ? '<w:caps/>' : '') +
  (color ? `<w:color w:val="${color}"/>` : '') +
  '</w:rPr></w:style>'

const files = {
  '[Content_Types].xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
<Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/>
</Types>`,

  '_rels/.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`,

  'word/_rels/document.xml.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/>
</Relationships>`,

  'word/styles.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
${style('Name', 'Name', { size: 44, bold: true, color: '2F3A48', before: 0, after: 60 })}
${style('Contact', 'Contact', { size: 18, color: '55606E', before: 0, after: 220 })}
${style('Heading1', 'heading 1', { size: 24, bold: true, caps: true, color: '2F3A48', before: 260, after: 120 })}
${style('Heading2', 'heading 2', { size: 21, bold: true, color: '2F3A48', before: 180, after: 20 })}
${style('Meta', 'Meta', { size: 18, color: '55606E', before: 0, after: 80 })}
${style('Body', 'Body', { size: 19, color: '2F3A48', before: 0, after: 80 })}
</w:styles>`,

  'word/numbering.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:numbering xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
<w:abstractNum w:abstractNumId="0"><w:lvl w:ilvl="0">
<w:start w:val="1"/><w:numFmt w:val="bullet"/><w:lvlText w:val="&#8226;"/>
<w:lvlJc w:val="left"/>
<w:pPr><w:ind w:left="360" w:hanging="240"/></w:pPr>
<w:rPr><w:rFonts w:ascii="Symbol" w:hAnsi="Symbol"/></w:rPr>
</w:lvl></w:abstractNum>
<w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num>
</w:numbering>`,

  'word/document.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
<w:body>${body}
<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1000" w:right="1000" w:bottom="1000" w:left="1000"/></w:sectPr>
</w:body></w:document>`,
}

const tmp = mkdtempSync(join(tmpdir(), 'resume-docx-'))
for (const [name, content] of Object.entries(files)) {
  const full = join(tmp, name)
  mkdirSync(dirname(full), { recursive: true })
  writeFileSync(full, content)
}
const docxPath = join(staticDir, 'resume.docx')
rmSync(docxPath, { force: true })
// mimetype-free OOXML: plain deflate zip of the parts is enough for Word.
execFileSync('zip', ['-r', '-X', '-q', docxPath, ...Object.keys(files)], {
  cwd: tmp,
})
rmSync(tmp, { recursive: true, force: true })
console.log('wrote static/resume.docx')
