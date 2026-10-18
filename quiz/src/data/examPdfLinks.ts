export interface ExamPdfLink {
  url: string
  label: string
}

// The source paper behind a sitting: the PDF the examining body published for
// it. Shown above the mock-exam shelf and opened in the in-app viewer
// (`components/PdfViewerPanel.tsx`).
//
// ── Rules for this file ───────────────────────────────────────────────────────
// A URL here is **transcribed from the publisher, never constructed**. The CAS
// filenames look regular and are not: Spring 2019 is
// `admissions_studytools_exam5_sp19-5.pdf`, Spring 2015 is `sp15-5_0.pdf`,
// Spring 2018 is `sp18-5_examiners_report.pdf` and Spring 2012 still sits under
// `/old/`. Extrapolating the pattern is how this table filled up with dead
// links in the first place. A sitting whose PDF hasn't been located is simply
// **absent** — the browser then shows no button, which is honest, where a
// guessed URL is a 404 the learner has to discover for themselves.
//
// What CAS publishes also differs by exam. Exams 5–9 are written-answer papers
// that come with an *Examiner's Report* (sample answers plus commentary on how
// candidates actually scored); the MAS exams are multiple choice, so what's
// published is the paper and its *final answer key*. The label follows the
// document, not the button.
//
// Coverage notes, so a gap is recognisable as researched rather than forgotten:
//   • CAS began publishing Examiner's Reports with the **May 2012** sitting, so
//     2011's papers have none.
//   • Fall 2012 Exam 5 has not been located on casact.org (the `/old/` file is
//     the Spring paper — CAS names Spring `12-5` and Fall `f12-5`).
//   • Pass marks, answer keys and Examiner's Reports **ceased** with the move
//     to computer-based testing in Fall 2020, so nothing after 2019 exists.
//   • MAS-II was first sat in **Fall 2018**; there is no Spring 2018 paper.

/** Per-sitting papers — keyed by `${examTopic}|${year}|${session.toLowerCase()}`. */
const SITTING_PDF_LINKS: Record<string, ExamPdfLink> = {
  // ── CAS Exam 5 — exam + Examiner's Report in one PDF ──────────────────────
  'Exam 5|2012|spring': {
    url: 'https://www.casact.org/sites/default/files/old/studytools_exam5_12-5.pdf',
    label: "Examiner's Report",
  },
  'Exam 5|2013|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam5_13-5.pdf',
    label: "Examiner's Report",
  },
  'Exam 5|2013|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam5_f13-5.pdf',
    label: "Examiner's Report",
  },
  'Exam 5|2014|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam5_sp14-5.pdf',
    label: "Examiner's Report",
  },
  'Exam 5|2014|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam5_f14-5.pdf',
    label: "Examiner's Report",
  },
  'Exam 5|2015|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-03/sp15-5_0.pdf',
    label: "Examiner's Report",
  },
  'Exam 5|2015|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam5_f15-5.pdf',
    label: "Examiner's Report",
  },
  'Exam 5|2016|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam5_sp16-5.pdf',
    label: "Examiner's Report",
  },
  'Exam 5|2016|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam5_f16-5.pdf',
    label: "Examiner's Report",
  },
  'Exam 5|2017|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam5_sp17-5.pdf',
    label: "Examiner's Report",
  },
  'Exam 5|2017|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam5_f17-5.pdf',
    label: "Examiner's Report",
  },
  // Spring 2018 was sat twice (the original paper and a make-up); CAS published
  // a separate report for each, and this is the original.
  'Exam 5|2018|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-02/sp18-5_examiners_report.pdf',
    label: "Examiner's Report",
  },
  'Exam 5|2018|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam5_f18-5.pdf',
    label: "Examiner's Report",
  },
  'Exam 5|2019|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam5_sp19-5.pdf',
    label: "Examiner's Report",
  },
  'Exam 5|2019|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam5_f19-5.pdf',
    label: "Examiner's Report",
  },

  // ── CAS Exam 6C — Exam 6-Canada; exam + Examiner's Report ────────────────
  // Transcribed from casact.org's Past Exams & Pass Marks page, with one
  // exception: that page's "Fall 2016" link
  // (`2021-02/admissions_studytools_exam6c_f16-6c.pdf`) serves the *Spring*
  // 2016 paper — its every page is headed SPRING 2016 — so Fall 2016 is the
  // `f16-6c.pdf` the Examiners' Reports page links, headed FALL 2016.
  'Exam 6C|2013|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam6c_13-6c.pdf',
    label: "Examiner's Report",
  },
  'Exam 6C|2014|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam6c_14-6c.pdf',
    label: "Examiner's Report",
  },
  'Exam 6C|2014|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam6c_f14-6c.pdf',
    label: "Examiner's Report",
  },
  'Exam 6C|2015|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-03/sp15-6c_0.pdf',
    label: "Examiner's Report",
  },
  'Exam 6C|2015|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam6c_f15-6c.pdf',
    label: "Examiner's Report",
  },
  'Exam 6C|2016|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-03/sp16-6c_0.pdf',
    label: "Examiner's Report",
  },
  'Exam 6C|2016|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-03/f16-6c.pdf',
    label: "Examiner's Report",
  },
  'Exam 6C|2017|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-03/sp17-6c_0.pdf',
    label: "Examiner's Report",
  },
  'Exam 6C|2017|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam6c_f17-6c.pdf',
    label: "Examiner's Report",
  },
  'Exam 6C|2018|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-03/sp18-6c.pdf',
    label: "Examiner's Report",
  },
  'Exam 6C|2018|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam6c_f18-6c.pdf',
    label: "Examiner's Report",
  },
  'Exam 6C|2019|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam6c_sp19-6c.pdf',
    label: "Examiner's Report",
  },
  'Exam 6C|2019|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam6c_f19-6c.pdf',
    label: "Examiner's Report",
  },

  // ── CAS Exam 7 — sat once a year, in the spring; exam + Examiner's Report ──
  // Transcribed from casact.org's Past Exams & Pass Marks page. The filenames
  // are as irregular as Exam 5's: 2017 is upper-case `.PDF` under `2021-01/`,
  // 2018 and 2019 carry a `_0` suffix.
  'Exam 7|2012|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam7_12-7.pdf',
    label: "Examiner's Report",
  },
  'Exam 7|2013|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-03/13-7.pdf',
    label: "Examiner's Report",
  },
  'Exam 7|2014|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam7_14-7.pdf',
    label: "Examiner's Report",
  },
  'Exam 7|2015|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-03/15-7.pdf',
    label: "Examiner's Report",
  },
  'Exam 7|2016|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-03/16-7.pdf',
    label: "Examiner's Report",
  },
  'Exam 7|2017|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-01/17-7.PDF',
    label: "Examiner's Report",
  },
  'Exam 7|2018|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-03/18-7_0.pdf',
    label: "Examiner's Report",
  },
  'Exam 7|2019|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-03/19-7_0.pdf',
    label: "Examiner's Report",
  },

  // ── CAS Exam 8 — sat once a year, in the fall; exam + Examiner's Report ────
  // Fall 2013–2019 are transcribed from casact.org's Past Exams & Pass Marks
  // page; that page lists nothing earlier, and the October 2012 paper (with its
  // Examiners' Report) is the `f12-8.pdf` casact.org serves under `2021-03/`.
  'Exam 8|2012|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-03/f12-8.pdf',
    label: "Examiner's Report",
  },
  'Exam 8|2013|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-03/13-8.pdf',
    label: "Examiner's Report",
  },
  'Exam 8|2014|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-03/14-8_0.pdf',
    label: "Examiner's Report",
  },
  'Exam 8|2015|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam8_15-8.pdf',
    label: "Examiner's Report",
  },
  'Exam 8|2016|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam8_16-8.pdf',
    label: "Examiner's Report",
  },
  'Exam 8|2017|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam8_17-8.pdf',
    label: "Examiner's Report",
  },
  'Exam 8|2018|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam8_18-8.pdf',
    label: "Examiner's Report",
  },
  'Exam 8|2019|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam8_19-8.pdf',
    label: "Examiner's Report",
  },

  // ── CAS Exam 9 — sat once a year, in the spring; exam + Examiner's Report ──
  // Spring 2013–2019, transcribed from casact.org's Past Exams & Pass Marks
  // page, which lists nothing earlier for Exam 9; no 2012 paper has been
  // located. 2013's report keeps the pre-2014 layout (model solutions, then a
  // section of examiners' comments at the back).
  'Exam 9|2013|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam9_13-9.pdf',
    label: "Examiner's Report",
  },
  'Exam 9|2014|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam9_14-9.pdf',
    label: "Examiner's Report",
  },
  'Exam 9|2015|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-03/15-9.pdf',
    label: "Examiner's Report",
  },
  'Exam 9|2016|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-03/16-9.pdf',
    label: "Examiner's Report",
  },
  'Exam 9|2017|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-03/17-9.pdf',
    label: "Examiner's Report",
  },
  'Exam 9|2018|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam9_18-9.pdf',
    label: "Examiner's Report",
  },
  'Exam 9|2019|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-03/19-9_0.pdf',
    label: "Examiner's Report",
  },

  // ── CAS Exam MAS-I — multiple choice, so paper + final answer key ─────────
  'Exam MAS-I|2018|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_spmasi-18.pdf',
    label: 'Exam & Answer Key',
  },
  'Exam MAS-I|2018|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_fmasi-18.pdf',
    label: 'Exam & Answer Key',
  },
  'Exam MAS-I|2019|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_spmasi-19.pdf',
    label: 'Exam & Answer Key',
  },
  'Exam MAS-I|2019|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_fmasi-19.pdf',
    label: 'Exam & Answer Key',
  },

  // ── CAS Exam MAS-II — first sat Fall 2018 ─────────────────────────────────
  'Exam MAS-II|2018|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasii_fmasii-18.pdf',
    label: 'Exam & Answer Key',
  },
  'Exam MAS-II|2019|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasii_spmasii-19.pdf',
    label: 'Exam & Answer Key',
  },
  'Exam MAS-II|2019|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasii_fmasii-19.pdf',
    label: 'Exam & Answer Key',
  },
}

// Exam-level source PDFs, for exams with no dated papers to browse: the SOA
// publishes one rolling sample set for P and FM rather than releasing sittings,
// and that set is where this app's P and FM banks come from. Questions and
// solutions are **separate downloads**, so each gets its own entry and its own
// button — the questions paper answers "where did these come from", and the
// solutions paper is what a candidate reaches for after sitting the mix.
const EXAM_LEVEL_PDF_LINKS: Record<string, ExamPdfLink> = {
  Probability: {
    url: 'https://www.soa.org/globalassets/assets/files/edu/edu-exam-p-sample-quest.pdf',
    label: 'Sample Questions',
  },
  'Financial Mathematics': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2017/exam-fm-sample-questions.pdf',
    label: 'Sample Questions',
  },
}

// The solutions half of the same sample sets. Transcribed like everything else
// here, and this pair is a good illustration of why that rule holds: the two
// SOA documents do *not* share a naming scheme. Exam P's solutions swap
// `-quest` for `-sol` in the same directory, while Exam FM's swap the whole
// word (`exam-fm-sample-questions` → `exam-fm-sample-solutions`) — and the SOA
// also publishes per-sitting reissues of the FM set under a dated name
// (`2018/2018-10-exam-fm-sample-solutions.pdf`), which is a different document
// from the rolling set linked here. An exam whose solutions paper hasn't been
// located is absent, and shows no second button.
const EXAM_LEVEL_SOLUTION_LINKS: Record<string, ExamPdfLink> = {
  Probability: {
    url: 'https://www.soa.org/globalassets/assets/files/edu/edu-exam-p-sample-sol.pdf',
    label: 'Sample Solutions',
  },
  'Financial Mathematics': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2017/exam-fm-sample-solutions.pdf',
    label: 'Sample Solutions',
  },
}

// The exam's own **syllabus**: the examining body's statement of what the exam
// covers. Opened from the study guide's title row, in the same in-app viewer
// the papers above use — a candidate reading our page of the syllabus should be
// able to check it against the publisher's without leaving for a browser tab.
//
// Keyed by the wiki exam id (`lib/wikiRoutes.examIdFromFile`, lower-cased), the
// same key `data/examGuides.ts` is keyed by — so a dash-less exam carries the
// `-1` suffix (Exam 5 is `5-1`).
//
// ── Rules for this file, again, and why they bite harder here ────────────────
// A URL is transcribed from the publisher, never constructed. A syllabus is
// also **reissued** where an examiner's report never is: the SOA publishes one
// per sitting (`2026-07-p-syllabus.pdf`) and CAS one per administration, so
// these entries rot into *superseded* rather than dead — a link that still opens
// and is no longer what the candidate sits. Each entry therefore records which
// edition it is, so staleness is visible in the diff rather than only in the
// PDF's own first page. An exam whose current document hasn't been located is
// **absent**, and its page shows no button.
//
// What's published differs by body, so the label follows the document:
//   • SOA — a per-sitting *Syllabus* for each exam.
//   • CAS — since the move to computer-based testing, the per-exam *Content
//     Outline* is the document that defines what's examined; the old per-exam
//     "Syllabus of Basic Education" extracts are no longer reissued.
const SYLLABUS_PDF_LINKS: Record<string, ExamPdfLink> = {
  // ── SOA ───────────────────────────────────────────────────────────────────
  // July 2026 sitting.
  'p-1': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2026/july/syllabi/2026-07-p-syllabus.pdf',
    label: 'Syllabus',
  },
  // June 2026 sitting.
  'fm-2': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2026/syllabi/2026-06-exam-fm-syllabus.pdf',
    label: 'Syllabus',
  },

  // The SOA exams past FM, for the next sitting each serves (read off the
  // SOA's exam pages on 2026-10-05). These are also the PDFs
  // scripts/syllabus_extract.py transcribed the exam pages from, and
  // lib/examCatalog.test.ts holds the two together. ATPA's is its 2022
  // learning-objectives document, the one its page links.
  'fam-1': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf',
    label: 'Syllabus',
  }, // October 2026
  'srm-1': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-01-exam-srm-syllabus.pdf',
    label: 'Syllabus',
  }, // January 2027
  'pa-1': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-exam-pa-syllabus.pdf',
    label: 'Syllabus',
  }, // October 2026
  'altam-1': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-altam-syllabus.pdf',
    label: 'Syllabus',
  }, // OCTOBER 2026
  'astam-1': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2026/astam/2026-fall-exam-astam-syllabus.pdf',
    label: 'Syllabus',
  }, // OCTOBER 2026
  'atpa-1': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2022/2022-01-atpa-learning-objectives.pdf',
    label: 'Syllabus',
  },
  // The SOA's e-learning modules publish no syllabus: each module's page links
  // its "Module Introduction and Objectives" instead, the document
  // scripts/syllabus_extract.py read the module's page from (read 2026-10-17).
  'paf-1': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/paf-objectives.pdf',
    label: 'Module Objectives',
  },
  'asf-1': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/asf-objectives.pdf',
    label: 'Module Objectives',
  },
  'fap-1': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2023/fap-intro-objectives.pdf',
    label: 'Module Objectives',
  },
  'dmac-1': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/dmac-objectives.pdf',
    label: 'Module Objectives',
  },
  // The three VEEs: the SOA's Guidelines for Approval of VEE Courses and
  // Educational Experiences (effective November 1, 2024), which the CAS's VEE
  // page links too. One document lists the topics of all three.
  'vee-ms': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/edu-vee-guidelines.pdf',
    label: 'VEE Guidelines',
  },
  'vee-econ': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/edu-vee-guidelines.pdf',
    label: 'VEE Guidelines',
  },
  'vee-af': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/edu-vee-guidelines.pdf',
    label: 'VEE Guidelines',
  },
  'cfe-101': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2026/cfe-101/2026-11-cfe-101-syllabus.pdf',
    label: 'Syllabus',
  }, // Nov 2026/Mar 2027/Jul 2027
  'cfe-201': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2026/cfe-201/2026-2027-cfe-201-syllabus.pdf',
    label: 'Syllabus',
  }, // Mar 2027/Jul 2027
  'cp-311': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2026/cp-311/2026-2027-cp-311-syllabus.pdf',
    label: 'Syllabus',
  }, // Nov 2026/Mar 2027
  'cp-312': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2026/cp-312/2026-2027-cp-312-syllabus.pdf',
    label: 'Syllabus',
  }, // Nov 2026/Mar 2027
  'cp-321': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2026/cp-321/2026-2027-cp-321-syllabus.pdf',
    label: 'Syllabus',
  }, // Nov 2026/Jul 2027
  'cp-341': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2026/cp-341/2026-2027-cp-341-syllabus.pdf',
    label: 'Syllabus',
  }, // Mar 2027/Jul 2027
  'cp-351': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2026/cp-351/2026-2027-cp-351-syllabus.pdf',
    label: 'Syllabus',
  }, // Nov 2026/Mar 2027/Jul 2027
  'gh-101': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2026/gh-101/2026-2027-gh-101-syllabus.pdf',
    label: 'Syllabus',
  }, // Nov 2026/Mar 2027/Jul 2027
  'gh-201c': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2026/gh-201c/2026-2027-gh-201c-syllabus.pdf',
    label: 'Syllabus',
  }, // Nov 2026/Mar 2027/Jul 2027
  'gh-201u': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2026/gh-201u/2026-2027-gh-201u-syllabus.pdf',
    label: 'Syllabus',
  }, // Nov 2026/Mar 2027/Jul 2027
  'gh-301': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2026/gh-301/2026-2027-gh-301-syllabus.pdf',
    label: 'Syllabus',
  }, // Nov 2026/Mar 2027/Jul 2027
  'gi-101': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2026/gi-101/2026-2027-gi-101-syllabus.pdf',
    label: 'Syllabus',
  }, // Nov 2026/Mar 2027/Jul 2027
  'gi-201': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2026/gi-201/2026-2027-gi-201-syllabus.pdf',
    label: 'Syllabus',
  }, // Nov 2026/Mar 2027
  'gi-301': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2026/gi-301/2027-03-gi-301-syllabus.pdf',
    label: 'Syllabus',
  }, // Mar 2027/Jul 2027
  'gi-302': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2026/gi-302/2027-07-gi-302-syllabus.pdf',
    label: 'Syllabus',
  }, // Jul 2027
  'ila-101': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2026/ila-101/2026-2027-ila-101-syllabus.pdf',
    label: 'Syllabus',
  }, // Nov 2026/Mar 2027/Jul 2027
  'ila-201i': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2026/ila-201i/2026-2027-ila-201i-syllabus.pdf',
    label: 'Syllabus',
  }, // Nov 2026/Mar 2027/Jul 2027
  'ila-201u': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2026/ila-201u/2026-2027-ila-201u-syllabus.pdf',
    label: 'Syllabus',
  }, // Nov 2026/Mar 2027/Jul 2027
  'inv-101': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2026/inv-101/2026-2027-inv-101-syllabus.pdf',
    label: 'Syllabus',
  }, // Nov 2026/Mar 2027/Jul 2027
  'inv-201': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2026/inv-201/2026-2027-inv-201-syllabus.pdf',
    label: 'Syllabus',
  }, // Nov 2026/Mar 2027/Jul 2027
  'ret-101': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2026/ret-101/2026-2027-ret-101-syllabus.pdf',
    label: 'Syllabus',
  }, // Nov 2026/Mar 2027/Jul 2027
  'ret-201': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2026/ret-201/2026-2027-ret-201-syllabus.pdf',
    label: 'Syllabus',
  }, // Mar 2027/Jul 2027
  'ret-301': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2026/ret-301/2026-2027-ret-301-syllabus.pdf',
    label: 'Syllabus',
  }, // Nov 2026/Jul 2027

  // ── CAS ───────────────────────────────────────────────────────────────────
  '5-1': {
    url: 'https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf',
    label: 'Content Outline',
  },
  // Fall 2026 administration — CAS names the newer outlines
  // `Exam_<id>_CO_<year>_<season>.pdf` rather than the older
  // `Exam<id>_Content_Outline.pdf`, which is exactly why neither name may be
  // extrapolated to the exams below.
  '6c-1': {
    url: 'https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf',
    label: 'Content Outline',
  },
  // Fall 2026 administration (October 2026 window) — v04 of 16 Sep 2026, the
  // "October 2026 Content Outline" the CAS Exam 7 page links. Replaces the
  // 2023 `Exam7_Content_Outline.pdf`.
  '7-1': {
    url: 'https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf',
    label: 'Content Outline',
  },
  // v06 of 29 Jun 2026 (`MASI_CO_2026_F`) — the "2026 Content Outline" the CAS
  // MAS-I page links. Replaces the 2023-06 upload, which now serves the Spring
  // 2025 outline.
  'mas-i': {
    url: 'https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf',
    label: 'Content Outline',
  },
  // The 2026 outline the CAS MAS-II page links. Replaces the 2023-06 upload.
  'mas-ii': {
    url: 'https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf',
    label: 'Content Outline',
  },
  // v.8, updated 9 Sep 2026 and effective September 2026 — the document the
  // CAS PCPA page links as its content outline, despite the `2025_F` filename.
  'pcpa-1': {
    url: 'https://www.casact.org/sites/default/files/2024-05/Exam_PCPA_2025_F_Content_Outlines.pdf',
    label: 'Content Outline',
  },
  // Fall 2026 administration (October 2026 window) — v03 of 22 Jun 2026, the
  // "October 2026 Content Outline" the CAS Exam 8 page links.
  '8-1': {
    url: 'https://www.casact.org/sites/default/files/2026-03/Exam_8_CO_2026_Fall.pdf',
    label: 'Content Outline',
  },
  // Fall 2026 administration (October 2026 window) — v01 of 18 Mar 2026, the
  // "October 2026 Content Outline" the CAS Exam 9 page links.
  '9-1': {
    url: 'https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf',
    label: 'Content Outline',
  },
  // The three DISC courses: The Institutes' course syllabi (© 2023, the PDFs
  // dated Nov 2023), which the CAS DISC page links under the courses' names.
  // They list the course's topics and sections and give no exam weights.
  'disc-da': {
    url: 'https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf',
    label: 'Syllabus',
  },
  'disc-rm': {
    url: 'https://www.casact.org/sites/default/files/2022-12/DISC_RM.pdf',
    label: 'Syllabus',
  },
  'disc-ia': {
    url: 'https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf',
    label: 'Syllabus',
  },
  // Fall 2026 administration — v03 of 8 Jul 2026 (`Exam_6I_ CO_2026_F`), the
  // "October 2026 Content Outline" the CAS Exam 6 International page links.
  '6i-1': {
    url: 'https://www.casact.org/sites/default/files/2026-03/Exam_6I_CO_2026_Fall.pdf',
    label: 'Content Outline',
  },
  // The 2023 Syllabus of Basic Education extract for Exam 6-Taipei (v01 of
  // 16 Nov 2022), the later of the two the CAS Exam 6T page links. It names the
  // AICT exams that are credited for 6T and lists no readings of its own.
  '6t-1': {
    url: 'https://www.casact.org/sites/default/files/2021-11/Exam6T_Syllabus.pdf',
    label: 'Syllabus',
  },
  // Exam 6U has no entry: its current document hasn't been located on
  // casact.org. Adding a guess is the one thing this file forbids.
}

export function getSittingPdfLink(examTopic: string, year: number, session?: string): ExamPdfLink | null {
  const normalized = (session ?? '').toLowerCase()
  return SITTING_PDF_LINKS[`${examTopic}|${year}|${normalized}`] ?? null
}

export function getExamPdfLink(examTopic: string): ExamPdfLink | null {
  return EXAM_LEVEL_PDF_LINKS[examTopic] ?? null
}

/** The worked solutions to that same sample set, where the body publishes them. */
export function getExamSolutionsPdfLink(examTopic: string): ExamPdfLink | null {
  return EXAM_LEVEL_SOLUTION_LINKS[examTopic] ?? null
}

/** The exam's published syllabus, by wiki exam id (`P-1`, `5-1`, `MAS-I`, …). */
export function getSyllabusPdfLink(examId: string): ExamPdfLink | null {
  return SYLLABUS_PDF_LINKS[examId.toLowerCase()] ?? null
}

/** Every link in the table — the shape a link check (or a test) walks. */
export function allExamPdfLinks(): ExamPdfLink[] {
  return [
    ...Object.values(SITTING_PDF_LINKS),
    ...Object.values(EXAM_LEVEL_PDF_LINKS),
    ...Object.values(EXAM_LEVEL_SOLUTION_LINKS),
    ...Object.values(SYLLABUS_PDF_LINKS),
  ]
}
