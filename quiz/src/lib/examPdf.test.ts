import { describe, it, expect } from 'vitest'
import {
  EXAM_PDF_HOSTS,
  isSupportedPdfSource,
  describeNonPdfResponse,
  looksLikePdf,
  pdfDownloadUrl,
  pdfFileName,
  pdfProxyUrl,
  pdfSourceHost,
} from './examPdf'
import {
  allExamPdfLinks,
  getExamPdfLink,
  getSittingPdfLink,
  getSyllabusPdfLink,
} from '@/data/examPdfLinks'
import { examIdFromFile } from '@/lib/wikiRoutes'

const REPORT = 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam5_sp19-5.pdf'

describe('isSupportedPdfSource', () => {
  it('accepts a publisher PDF', () => {
    expect(isSupportedPdfSource(REPORT)).toBe(true)
    expect(isSupportedPdfSource('https://www.soa.org/globalassets/a/b.pdf')).toBe(true)
  })

  it('accepts a source document a resource page links to', () => {
    // Resource pages carry the same kind of link as the exam shelf — an ASOP
    // published as a PDF — and it is read in the same viewer, so the standards
    // board is a publisher we proxy.
    expect(
      isSupportedPdfSource(
        'https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop012_132.pdf',
      ),
    ).toBe(true)
  })

  it('refuses anything the proxy would refuse', () => {
    // The endpoint enforces the same three rules; disagreeing would open a
    // viewer on a request that is then rejected.
    expect(isSupportedPdfSource('http://www.casact.org/a.pdf')).toBe(false)
    expect(isSupportedPdfSource('https://example.com/a.pdf')).toBe(false)
    expect(isSupportedPdfSource('https://www.casact.org/exams')).toBe(false)
    expect(isSupportedPdfSource('not a url')).toBe(false)
    // A resource page's other links — a library catalogue, a publisher's shop
    // page, an ASOP landing page — are out-links, not documents to read here.
    expect(isSupportedPdfSource('https://search.worldcat.org/title/1023819820')).toBe(false)
    expect(
      isSupportedPdfSource(
        'https://www.actuarialstandardsboard.org/asops/trending-procedures-propertycasualty-insurance/',
      ),
    ).toBe(false)
  })
})

describe('viewer URLs', () => {
  it('reads the document through the endpoint, not the publisher', () => {
    // Fetching casact.org from the page is what the proxy exists to avoid: no
    // CORS headers there, so pdf.js would never see a byte.
    const url = pdfProxyUrl(REPORT)
    expect(url.startsWith('/api/exam-pdf?url=')).toBe(true)
    expect(url).toContain(encodeURIComponent(REPORT))
  })

  it('asks for an attachment when downloading', () => {
    expect(pdfDownloadUrl(REPORT)).toContain('&download=1')
  })

  it('keeps the publisher’s own filename', () => {
    expect(pdfFileName(REPORT)).toBe('admissions_studytools_exam5_sp19-5.pdf')
    expect(pdfFileName('https://www.casact.org/')).toBe('exam.pdf')
  })

  it('names the publisher without the www', () => {
    expect(pdfSourceHost(REPORT)).toBe('casact.org')
    expect(pdfSourceHost('nonsense')).toBe('')
  })
})

describe('reading a response that is not a PDF', () => {
  const bytes = (text: string) => new TextEncoder().encode(text)

  it('recognises PDF bytes by their header, not by what the response claims', () => {
    expect(looksLikePdf(bytes('%PDF-1.4'))).toBe(true)
    expect(looksLikePdf(bytes('<!doctype html>'))).toBe(false)
    expect(looksLikePdf(bytes('%PD'))).toBe(false)
  })

  it('names the deployment when the SPA answers instead of the endpoint', () => {
    // The failure this exists for: the app's host rewrites unknown paths to
    // index.html, so a deployment without the function returns 200 + the app's
    // own page. pdf.js calls that "Invalid PDF structure", which reads as a
    // corrupt document and sends you looking in the wrong place entirely.
    expect(describeNonPdfResponse(200, 'text/html; charset=utf-8', '<!doctype html><html>…'))
      .toBe("the PDF service isn't available on this deployment")
    expect(describeNonPdfResponse(200, '', '  <html>…')).toContain('deployment')
  })

  it('passes the endpoint’s own explanation through', () => {
    expect(describeNonPdfResponse(502, 'application/json', '{"error":"Source responded 404"}'))
      .toBe('Source responded 404')
  })

  it('falls back to the status, then to the plain fact', () => {
    expect(describeNonPdfResponse(503, 'text/plain', 'nope')).toBe('the service responded 503')
    expect(describeNonPdfResponse(200, 'application/json', 'not json at all')).toBe('the response was not a PDF')
    expect(describeNonPdfResponse(200, 'application/octet-stream', 'PK\u0003\u0004')).toBe('the response was not a PDF')
  })
})

describe('the examiner-report catalogue', () => {
  it('only holds links the viewer can actually open', () => {
    // The rule this table exists to keep: a URL is transcribed from the
    // publisher, so it is https, a .pdf, and on a host we proxy. A guessed or
    // half-remembered link fails here rather than in front of a candidate.
    const bad = allExamPdfLinks().filter(link => !isSupportedPdfSource(link.url))
    expect(bad).toEqual([])
  })

  it('labels each document as what the body actually published', () => {
    // CAS publishes an Examiner's Report for the written papers and an answer
    // key for the multiple-choice MAS exams; calling both "Examiner's Report"
    // promises commentary that isn't in the file.
    expect(getSittingPdfLink('Exam 5', 2019, 'Spring')?.label).toBe("Examiner's Report")
    expect(getSittingPdfLink('Exam MAS-I', 2019, 'Fall')?.label).toBe('Exam & Answer Key')
    expect(getExamPdfLink('Probability')?.label).toBe('Sample Questions')
  })

  it('matches a sitting however its session is cased', () => {
    expect(getSittingPdfLink('Exam 5', 2019, 'spring')?.url).toBe(REPORT)
    expect(getSittingPdfLink('Exam 5', 2019, 'Spring')?.url).toBe(REPORT)
  })

  it('has nothing for a sitting whose paper was never published', () => {
    // Examiner's Reports began with the May 2012 sitting…
    expect(getSittingPdfLink('Exam 5', 2011, 'Spring')).toBeNull()
    // …MAS-II was first sat in Fall 2018…
    expect(getSittingPdfLink('Exam MAS-II', 2018, 'Spring')).toBeNull()
    // …and publication stopped when testing moved to CBT in Fall 2020.
    expect(getSittingPdfLink('Exam 5', 2021, 'Spring')).toBeNull()
  })

  it('serves every link from a publisher the proxy allows', () => {
    for (const link of allExamPdfLinks()) {
      expect(EXAM_PDF_HOSTS).toContain(new URL(link.url).hostname)
    }
  })
})

describe('the syllabus catalogue', () => {
  it('is keyed by the wiki exam id the study-guide page holds', () => {
    // `WikiExam` looks the link up with `examIdFromFile`, which lower-cases and
    // gives a dash-less exam a `-1` suffix. A key written any other way is a
    // button that silently never appears.
    expect(getSyllabusPdfLink(examIdFromFile('Exam P-1 (SOA).md'))?.label).toBe('Syllabus')
    expect(getSyllabusPdfLink(examIdFromFile('Exam FM-2 (SOA).md'))?.label).toBe('Syllabus')
    expect(getSyllabusPdfLink(examIdFromFile('Exam 5 (CAS).md'))?.label).toBe('Content Outline')
    expect(getSyllabusPdfLink(examIdFromFile('Exam MAS-II (CAS).md'))?.label).toBe('Content Outline')
  })

  it('matches an exam id however it is cased', () => {
    expect(getSyllabusPdfLink('MAS-I')?.url).toBe(getSyllabusPdfLink('mas-i')?.url)
  })

  it('has nothing for an exam whose syllabus hasn’t been located', () => {
    // Absent beats guessed: the page then shows no button at all, where an
    // extrapolated URL is a 404 the candidate finds for themselves.
    expect(getSyllabusPdfLink('6u-1')).toBeNull()
    expect(getSyllabusPdfLink('8-1')).toBeNull()
    expect(getSyllabusPdfLink('not-an-exam')).toBeNull()
  })

  it('labels each document as what the body actually published', () => {
    // The SOA publishes a per-sitting Syllabus; since CBT, CAS's per-exam
    // Content Outline is the document that defines what's examined. Calling a
    // content outline a syllabus promises the readings list it doesn't carry.
    expect(getSyllabusPdfLink('p-1')?.url).toContain('soa.org')
    expect(getSyllabusPdfLink('5-1')?.url).toContain('casact.org')
  })
})
