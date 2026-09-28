---
target: Resources/Books/Probability for Risk Management (Hassett - 2021).md
created: 2026-09-27
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- status_set: verified
- confidence: medium
- checks_run: outline built from printed contents first, then diffed entry by entry against the page (319/319 entries, numbers and titles) and against the PDF bookmarks (319/319); syllabus callout diffed both ways against Nov 2026 REFERENCES; every excluded section number confirmed to exist in the contents; Jul/Sep/Nov 2026 and Jan 2027 syllabi diffed (identical but for the sitting name); frontmatter vs title/copyright pages, product page and syllabus; ISBN check digits; lead vs preface; resource_lint clean
- sources_checked: Hassett, Stewart and Milovanovic, Probability for Risk Management, 3rd ed. (ACTEX Learning, 2021) - publisher digital sample: title page p.2, copyright page p.3, preface p.iii, printed contents pp.v-xi and PDF bookmark outline (sha256:c327b939c7793edf526f7b9618699df1b57858093f6d4118508b1766bbd84115) https://www.actexmadriver.com/samples/PRM_3rd_Edition_Digital%20Sample.pdf; ACTEX Learning product page, Probability for Risk Management 3rd Edition - ISBN list (Printed 978-1-64756-322-6; Digital 365-day 978-1-64756-323-3) https://www.actexlearning.com/exams/p/probability-for-risk-management; SOA Probability Exam syllabus, November 2026, REFERENCES pp.5-6 (sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397) https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Outline matches the printed contents exactly; only differences are EXERCISES title-cased as Exercises and math typeset in LaTeX (source typos such as 8.7 Weibull Dstribution and the truncated 10.2 title are kept verbatim, correctly). Printed contents and bookmarks agree (no conflict inside the source). The sample prints ISBN 978-1-64756-323-3, which ACTEX lists as the digital-licence ISBN; the page uses the printed ISBN 978-1-64756-322-6, which the syllabus also gives - not a conflict. Callout matches the syllabus word for word; nothing changes in the January 2027 syllabus. Sources cites the July 2026 syllabus, which is textually identical to November 2026 apart from the sitting name. Confidence capped at medium per the sweep brief: the chapters themselves were not read, though the page claims nothing beyond the sampled front matter.
