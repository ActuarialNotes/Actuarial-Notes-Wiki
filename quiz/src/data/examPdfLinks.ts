export interface ExamPdfLink {
  url: string
  label: string
}

// Per-sitting examiner's reports — keyed by `${examTopic}|${year}|${sessionNormalized}`
// sessionNormalized is the session string lowercased (e.g. 'spring', 'fall')
const SITTING_PDF_LINKS: Record<string, ExamPdfLink> = {
  'Exam 5|2019|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-02/5-s19examersrpt.pdf',
    label: "Examiner's Report",
  },
  'Exam 5|2018|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-02/5-s18examersrpt.pdf',
    label: "Examiner's Report",
  },
}

// Exam-level source question bank PDFs for exams that don't have sitting-specific banks
// (Exam P and FM use SOA sample question PDFs as the source)
const EXAM_LEVEL_PDF_LINKS: Record<string, ExamPdfLink> = {
  'Probability': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/edu-exam-p-sample-questions.pdf',
    label: 'Sample Questions & Solutions',
  },
  'Financial Mathematics': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/edu-exam-fm-sample-questions.pdf',
    label: 'Sample Questions & Solutions',
  },
}

export function getSittingPdfLink(examTopic: string, year: number, session?: string): ExamPdfLink | null {
  const normalized = (session ?? '').toLowerCase()
  return SITTING_PDF_LINKS[`${examTopic}|${year}|${normalized}`] ?? null
}

export function getExamPdfLink(examTopic: string): ExamPdfLink | null {
  return EXAM_LEVEL_PDF_LINKS[examTopic] ?? null
}
