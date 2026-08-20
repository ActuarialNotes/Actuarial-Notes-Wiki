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
import { allExamPdfLinks, getExamPdfLink, getSittingPdfLink } from '@/data/examPdfLinks'

const REPORT = 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam5_sp19-5.pdf'

describe('isSupportedPdfSource', () => {
  it('accepts a publisher PDF', () => {
    expect(isSupportedPdfSource(REPORT)).toBe(true)
    expect(isSupportedPdfSource('https://www.soa.org/globalassets/a/b.pdf')).toBe(true)
    // The resource pages read standards as well as papers, so the standards
    // board is a publisher here too.
    expect(
      isSupportedPdfSource('https://www.actuarialstandardsboard.org/wp-content/uploads/a/asop043_106.pdf'),
    ).toBe(true)
  })

  it('refuses anything the proxy would refuse', () => {
    // The endpoint enforces the same three rules; disagreeing would open a
    // viewer on a request that is then rejected.
    expect(isSupportedPdfSource('http://www.casact.org/a.pdf')).toBe(false)
    expect(isSupportedPdfSource('https://example.com/a.pdf')).toBe(false)
    expect(isSupportedPdfSource('https://www.casact.org/exams')).toBe(false)
    expect(isSupportedPdfSource('not a url')).toBe(false)
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
