---
target: Resources/Books/Actuarial Mathematics for Life Contingent Risks (Dickson - 2020).md
created: 2026-10-31
---

## [F-001] 'Contents unavailable' note contradicted by the publisher's Contents tab
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T18:44Z/0c7d
- date: 2026-10-31
- severity: minor
- status: open
- locus: callout after '## On the syllabus' (> [!note] Contents unavailable)
- claim: The book's full table of contents could not be read: Cambridge's front-matter PDF could not be fetched, and its book pages and Google Books list only some of the chapter titles, without chapter numbers.
- evidence: Cambridge's own book page (Cambridge Aspire, DOI 10.1017/9781108784184, fetched 2026-10-31, sha256 f4c31b14…) carries a Contents tab listing every chapter with its identifier 9781108784184#C1 to #C19 and page range (C1 'Introduction to life and long-term health insurance' to p.33 … C19 'Stochastic longevity models' pp.696-715) and Appendices A 'Probability and statistics', B 'Numerical techniques', C 'Monte Carlo simulation', D 'Tables' (pp.716-747), then References and Index. So the chapter level of the contents can be read free; only the section level cannot. The page therefore had no divisions where the standard (docs/resource-pages.md §2.4) wants the sourced table of contents, an omission that hid that the FAM/ALTAM/CIA ranges refer to these chapter titles.
- source_rank: 2
- proposed_action: Replace the note with the 19 chapter headings and Appendices A-D exactly as titled and numbered on the publisher's Contents tab (bare headings; sections are not published), and say so under ## Sources.
- applied: true
- fingerprint: 4789a9284f79

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T18:44Z/0c7d
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Applied in this run: the note is replaced by '## 1 Introduction to life and long-term health insurance' … '## 19 Stochastic longevity models' and '## Appendix A' … '## Appendix D', transcribed from Cambridge's Contents tab, bare headings (no section list is published); ## Sources says where they came from and adds Cambridge's errata sheet. resource_lint.py: 0 errors.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T18:44Z/0c7d
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Chapter headings built from the publisher's Contents tab before re-reading the page (19 chapters, Appendices A-D, no omissions); FAM callout diffed line by line against the October 2026 FAM syllabus p.8 (Ch 1, 2, 3 except 4/10/11/12, 4, 5, 6, 7 §§1-3 except 2.4/2.5, 7, 8, 16; exercises required) - identical; ALTAM callout against the October 2026 ALTAM syllabus p.7 (Ch 3 §§4 and 10, 7 §§2.4 and 4, 8, 9, 10, 11 except 12, 13 except 8, 14, 15 §§1-3, 17, 18 §§5-6 with 1-3 background) - identical; ACIA Capstone callout against the CIA syllabus p.27 rows A4.1-A4.6 - identical; both exam pages' Source Material lists match their syllabi; frontmatter (title, authors, publisher, 3rd ed., ISBN 978-1-108-47808-3, 2020) against Cambridge's record and the SOA/CIA citations; lead against Cambridge's description and key features (782 pp., 300 exercises, 160 worked examples, 'required text for the SOA's LTAM Exam'); Related readings against ALTAM-21-23 p.1 ('intended to be read with Chapter 15 of AMLCR'); Cambridge errata sheet read (no erratum touches a page claim); every Sources URL fetched; wiki links resolve; resource_lint 0 errors.
- sources_checked: Cambridge University Press, Actuarial Mathematics for Life Contingent Risks, 3rd ed., publisher's book page, Overview (key features, description, 3rd edition, hardback ISBN 9781108478083, 30 January 2020, 782 pages) and Contents tab (C1-C19, Appendices A-D), sha256:f4c31b143f6563789d7539db1e16f9027b352037a21f6f46b8757d59188abd81 — https://www.cambridge.org/highereducation/books/actuarial-mathematics-for-life-contingent-risks/281DA4E8D523A6B23280ADC3D165AFDA; Cambridge University Press, Errata Sheet for Actuarial Mathematics for Life Contingent Risks, 3rd Edition, pp.1-2 (last updated 18 August 2024), sha256:d24c02c762df5e0041acbec305f25b1020e99585e70109dbd632b1f3e08f99ed — https://www.cambridge.org/highereducation/api/resources/C378270E398166C6F8732D8F09F101C3; SOA Exam FAM syllabus, October 2026, Topics 8-10 learning outcomes pp.6-7; Readings p.8 (AMLCR chapters), sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf; SOA Exam ALTAM syllabus, October 2026, Topic 1 p.2, Topic 3 p.3; Resources p.7 (AMLCR chapters), sha256:44b64a78219337f43387cb52837c7c2ce590ae2b97321d6e8e4e29ab2cd38c5e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-altam-syllabus.pdf; CIA Education Syllabus - ACIA Capstone Exam and Modules (last updated January 19, 2026), section 2 Topics of long-term actuarial mathematics, p.27, rows A4.1-A4.6, sha256:2a0fb1facb47c97a76ac956d86f0514bcb9e5459ecdc0a973bd3f6f155e3d291 — https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=608114&fid=627235; SOA ALTAM-21-23: Variable Annuity Guarantees, Introduction p.1, sha256:995033045fafcbfbeb02cd375a7b8548ad9e87089bfee4e37af6bf3493b127e6 — https://www.soa.org/globalassets/assets/files/edu/2023/2023-07-altam-21-23.pdf
- note: Medium per D7: commercial text, checked against the publisher's record, contents and errata and the three syllabi; no copy of the book was read, so section-level contents are not on the page. Conflict inside the sources, logged not filed: Cambridge's page says both 'Published 2019' and a hardback publication date of 30 January 2020, and ALTAM-21-23 cites 'Dickson et al., 2019'; the page's Year 2020 follows the SOA syllabi and the CIA syllabus, and Cambridge's dated format record.
