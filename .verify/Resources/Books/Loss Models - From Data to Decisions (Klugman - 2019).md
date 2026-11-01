---
target: Resources/Books/Loss Models - From Data to Decisions (Klugman - 2019).md
created: 2026-10-31
---

## [F-001] Sources cites the October 2026 FAM syllabus; the SOA now posts February 2027
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T18:57Z/3d3b
- date: 2026-10-31
- severity: minor
- status: open
- locus: ## Sources, third entry (SOA Exam FAM syllabus, October 2026)
- claim: The FAM syllabus the page cites is the October 2026 one.
- evidence: The SOA FAM study page (soa.org/education/exam-req/edu-exam-fam/study/, read 2026-10-31) links both the October 2026 syllabus and a "February 2027 Syllabus with Learning Objectives/Outcomes and Readings" (2027-2-fam-syllabus.pdf, sha256:da98474b...). Its Readings, p.8, list Loss Models Chapter 3 (Sections 1, 2, 4.1, 5); 4; 5 (3, 4); 6; 8 (1-5); 9 (1, 2, 3.1, 3.2, 7, 8.1, 8.2); 11 (1-4); 12 (1-3); 16 and the Corrections and Comments -- word for word the October 2026 list and the page FAM callout, so the scope claim is current and only the citation is stale.
- source_rank: 1
- proposed_action: When Exam FAM (SOA).md rolls over to the February 2027 sitting, point this Sources entry at 2027-2-fam-syllabus.pdf in the same change.
- applied: false
- fingerprint: d2587cf10d7e

## [F-002] ASTAM bullet omits the Corrections and Comments the ASTAM syllabus also lists
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T18:57Z/3d3b
- date: 2026-10-31
- severity: nit
- status: open
- locus: > [!info] On the syllabus, Exam ASTAM bullet
- claim: The FAM bullet notes that the syllabus also lists Corrections and Comments for Loss Models, Fifth Edition; the ASTAM bullet does not.
- evidence: SOA ASTAM syllabus October 2026, Resources, p.6, lists "Corrections and Comments for Loss Models, Fifth Edition" after the sample Excel questions. The chapter/section list itself matches the ASTAM bullet exactly (3.3, 3.4.2-3.4.6; 5.1, 5.2; 7.1, 7.2; 8; 9.3.1, 9.3.2, 9.4 Theorem 9.7 & Example 9.9 only, 9.5, 9.6 except 9.6.1, 9.7; 11.5-11.7; 12.4; 13; 15 except 15.4.2; 17; 18).
- source_rank: 1
- proposed_action: Optionally append the same sentence the FAM bullet carries; cosmetic.
- applied: false
- fingerprint: b0c61d5c5f29

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T18:57Z/3d3b
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: FAM callout diffed against the Oct 2026 and Feb 2027 FAM syllabi (identical, exact match); ASTAM callout diffed against the ASTAM Oct 2026 syllabus (exact); ACIA Capstone callout diffed against the CIA syllabus A4.7-A4.13 (exact); all 267 numbered headings, Part I-VI titles and Appendices A-E diffed mechanically against the Wiley printed contents (0 differences); the Wiley excerpt PDF carries no bookmark outline, so no TOC/bookmark conflict to log; title, authors, edition, year, publisher, ISBN and lead description checked against the Wiley product page; all wiki-links and the cover embed resolve. Commercial book: medium per D7/D22/D27, no copy of the text read.
- sources_checked: SOA Exam FAM Syllabus, February 2027, Readings, Loss Models chapter list, p.8, sha256:da98474b74b0a9e9153b8ce198f30195dfbe394b3e300e785e58f12663b447e4 — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-2-fam-syllabus.pdf; SOA Exam FAM Syllabus, October 2026, Readings, Loss Models chapter list, p.8, sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf; SOA Exam ASTAM Syllabus, October 2026, Resources, Loss Models chapter list, p.6, sha256:6d462aea25c09b15cc457176ecf2d5d6143df8fb88df9f366557de17ec1ec9ba — https://www.soa.org/globalassets/assets/files/edu/2026/astam/2026-fall-exam-astam-syllabus.pdf; CIA Education Syllabus – ACIA Capstone Exam and Modules (last updated January 19, 2026), Section 3 table, A4.7-A4.13, pp.28-29, sha256:2a0fb1facb47c97a76ac956d86f0514bcb9e5459ecdc0a973bd3f6f155e3d291 — https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=608114&fid=627235; Wiley, Loss Models 5th ed. — Table of Contents excerpt (PDF), Contents, all 8 pages (pp.v-xii), sha256:814f18cfefff53b09b2f477c3d6fd8eb84d77ef1aea69a8a27beefc620f2afe3 — https://media.wiley.com/product_data/excerpt/88/11195237/1119523788-8.pdf; Wiley product page, Loss Models: From Data to Decisions, 5th Edition, authors, ISBN 978-1-119-52378-9, May 2019, 560 pages, description, sha256:c358af4e429dc3b30ab1e94bd6de20a1e669d1050d01523e11aa73307117d001 — https://www.wiley.com/en-us/Loss+Models%3A+From+Data+to+Decisions%2C+5th+Edition-p-9781119523789; SOA, Corrections and Comments for Loss Models, Fifth Edition, p.1, sha256:28b25400d43c5e9bfe0f077c96b2806e38af8ce1047a23500c71ad8d0ece24f8 — https://www.soa.org/globalassets/assets/files/edu/2021/corrections-comments-loss-models.pdf
- note: Scope claims for FAM, ASTAM and the ACIA Capstone all match the current syllabi; open F-001 (stale Oct 2026 citation; scope unchanged in Feb 2027) and F-002 (nit).
