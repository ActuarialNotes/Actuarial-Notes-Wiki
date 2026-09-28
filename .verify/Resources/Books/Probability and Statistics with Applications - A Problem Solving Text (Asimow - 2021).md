---
target: Resources/Books/Probability and Statistics with Applications - A Problem Solving Text (Asimow - 2021).md
created: 2026-09-27
---

## [F-001] Filename and inbound link give the year as 2021; the edition is 2015
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- severity: minor
- status: open
- locus: filename / link target (Exam P-1 (SOA).md Source Material)
- claim: The page is named and linked as (Asimow - 2021), while its own frontmatter says Year 2015, 2nd edition, ISBN 978-1-62542-472-3.
- evidence: ACTEX sample of the 2nd edition (sha256:35ab158018e8e8999b6311506f5c38ed3519bcca1d32ac9bf0eca82888eebcad, https://www.actexlearning.com/samples/ProbStats%20Sample.pdf) p.3 copyright page: Copyright 2015, 2023 by ACTEX Learning; CIP call number HG8045.A85 2015; LCCN 2015010222; ISBN 978-1-62542-472-3. ACTEX product page (https://www.actexlearning.com/exams/p/probability-and-statistics-with-applications) lists 2nd Edition, Printed 978-1-62542-472-3. SOA Exam P syllabus Nov 2026 p.6 (and Jul/Sep 2026, Jan 2027 identically): (Second Edition) 2015, ISBN 978-1-62542-472-3. No source dates this edition 2021. The frontmatter (Year/date 2015, Edition 2nd, ISBN) is correct; only the filename year is wrong, and Obsidian shows it as the link text on the exam page.
- source_rank: 1
- proposed_action: Maintainer decision: rename to (Asimow - 2015).md and update the Exam P-1 (SOA) Source Material link, the verification log path and any Cowork wikiRef in the same change (filenames are link targets and public URLs, docs/resource-pages.md 2.5).
- applied: false
- fingerprint: 3b110a4a3ff5

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- status_set: verified
- confidence: medium
- checks_run: outline built from printed contents first, then diffed entry by entry against the page (211/211 numbered and back-matter entries; 6.5.5 Z-squared confirmed from the rendered page image); syllabus callout diffed both ways against Nov 2026 REFERENCES; every excluded section number confirmed to exist in the contents; Jul/Sep/Nov 2026 and Jan 2027 syllabi diffed (identical but for the sitting name); frontmatter vs title/CIP page, product page and syllabus; ISBN check digit; lead vs CIP summary and second-edition preface; resource_lint clean
- sources_checked: Asimow and Maxwell, Probability and Statistics with Applications: A Problem Solving Text, 2nd ed. (ACTEX Learning, 2015) - publisher sample: title page p.2, copyright/CIP page p.3, prefaces pp.iii-v, printed contents pp.vii-xiii (sha256:35ab158018e8e8999b6311506f5c38ed3519bcca1d32ac9bf0eca82888eebcad) https://www.actexlearning.com/samples/ProbStats%20Sample.pdf; ACTEX Learning product page, Probability and Statistics with Applications 2nd Edition - ISBN list (Printed 978-1-62542-472-3) https://www.actexlearning.com/exams/p/probability-and-statistics-with-applications; SOA Probability Exam syllabus, November 2026, REFERENCES pp.5-6 (sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397) https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Outline matches the printed contents exactly (all-caps chapter titles title-cased; the PDF has no usable bookmarks, only Blank Page entries, so the printed contents are the single in-source outline). Frontmatter is right: 2nd edition, 2015, ISBN 978-1-62542-472-3 is the printed ISBN of that edition per ACTEX and the syllabus; the title page and CIP have no hyphen in Problem Solving (the syllabus writes Problem-Solving). The only error is the 2021 in the filename (F-001). Lead is supported by the CIP summary and the second-edition preface; its list of new topics gives five of the six the preface names (omits sufficient statistical estimators and the linear exponential family) - partial, not wrong. Callout matches the syllabus word for word; nothing changes in January 2027. Confidence capped at medium per the sweep brief: the chapters themselves were not read, though the page claims nothing beyond the sampled front matter.

## [F-002] Syllabus citation names a past sitting (July 2026)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- severity: minor
- status: open
- locus: ## Sources, SOA syllabus entry
- claim: Sources cites SOA Exam P Syllabus, July 2026 (https://www.soa.org/globalassets/assets/files/edu/2026/july/syllabi/2026-07-p-syllabus.pdf) for the citation and the assigned chapters and sections.
- evidence: SOA Probability Exam syllabus, November 2026 (7 pp.), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397, https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf. p.6 carries the same Asimow citation (Second Edition, 2015, ACTEX, ISBN 978-1-62542-472-3) and chapter list as the callout; the July 2026 sitting has passed and its text is identical bar the title (per this page log C-001, Jul/Sep/Nov 2026 and Jan 2027 diffed).
- source_rank: 1
- proposed_action: Cite the November 2026 syllabus.
- applied: true
- fingerprint: 628b25c515d6
