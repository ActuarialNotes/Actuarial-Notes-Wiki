---
target: Resources/Books/Interest Theory – Financial Mathematics and Deterministic Valuation (Francis, J. and Ruckman, C. – 2022).md
created: 2026-09-28
---

## [F-001] Scope cited to the superseded June 2026 FM syllabus
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: ## Sources, third entry
- claim: The scope source is '[SOA Exam FM Syllabus, June 2026](https://www.soa.org/globalassets/assets/files/edu/2026/syllabi/2026-06-exam-fm-syllabus.pdf)'.
- evidence: The current sitting's syllabus is the December 2026 one (https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39); SOA also issued August and October 2026 syllabi. The June 2026 URL still resolves (HTTP 200, sha256:055ccb5e05a984e8c1397521608e7b3678115df190c76a802c2aedea83bfa03f). The Francis & Ruckman entry is word-for-word the same in June, August, October and December 2026 (Dec PDF p.6: 'Third Edition), 2022, Actuarial Brew, ISBN 978-09981604-4-3 / Chapters 1 to 13 / Chapter 14 (excluding 14.04 and 14.05) / Chapters 15-16'). So the callout's scope is still right and no reader is misled. The citation is just out of date.
- source_rank: 1
- proposed_action: Cite the December 2026 syllabus (or the current sitting's) in ## Sources, alongside or in place of June 2026. The scope wording needs no change.
- applied: false
- fingerprint: 6c566afbccba

## [C-001] Conflict inside the source: copyright-page ISBN is not a valid ISBN-10
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- locus: frontmatter ISBN; ## Sources first entry
- note: The publisher's sample (actexmadriver.com, sha256:c3b537a0…, PDF p.2) prints 'ISBN 0-9981604-4-3'. That is not a valid ISBN-10: the check digit for 0-9981604-4 is X. It is really the ISBN-13 978-0-9981604-4-3 with the 978 prefix dropped. The SOA syllabus (Dec 2026, PDF p.6) prints '978-09981604-4-3', which has the same 13 digits with the hyphen misplaced. The frontmatter's ISBN 978-0-9981604-4-3 carries those digits with a valid check digit (3). The Sources note quotes the copyright page as printed. This conflict is inside the source documents, not a vault error, and there is nothing to change.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Outline built from the printed Table of Contents (sample PDF pp.3-5; the PDF has no bookmark outline, so there was no second outline to diff) before rereading the page. A mechanical diff of all 103 entries (16 chapter titles, 84 numbered sections, Bibliography/Answer Key/Index) found 0 differences in number, title, order or chapter attribution. The two text-layer differences were checked on the rendered page: 7.01/7.02 print 'm' in italics with a superscript 'th', which the page renders faithfully as $m^{th}$ly; 15.06 prints 'Appendix – Full Immunization Proof', where the text layer drops the dash. Nothing is omitted: every chapter, section and back-matter item on pp.3-5 is on the page. Frontmatter checked against the title page (title, subtitle, 'Third Edition', Joe Francis and Chris Ruckman in that order), the copyright page (© 2022 by ActuarialBrew) and syllabus p.6 (Third Edition, 2022, ISBN digits 9780998160443, check digit valid). There is no Available from, which is correct for a book for sale. Lead checked sentence by sentence against the publisher's description (FM exam of SOA and CAS, Key Concepts, over 300 end-of-chapter questions with difficulty ratings, free worked solutions using the BA-II Plus) and the Introduction (p.7, 'move you through the material quickly'). Syllabus callout matches Dec 2026 PDF p.5 ('There is not a single textbook required') and p.6 (Chapters 1 to 13; Chapter 14 excluding 14.04 and 14.05; Chapters 15-16) word for word. The excluded 14.04 and 14.05 exist in the TOC. The scope is identical in the June, Aug, Oct and Dec 2026 syllabi. Every [[link]] resolves (35 distinct targets), and the cover SVG exists. resource_lint: 0 errors. Every Sources URL fetched (HTTP 200). Confidence is capped at medium because this is a commercial text and only its sample pages (contents and front matter) were readable.
- sources_checked: Francis & Ruckman, Interest Theory: Financial Mathematics and Deterministic Valuation, Third Edition (ActuarialBrew, 2022), publisher's sample pages: title page p.1, copyright page p.2, Table of Contents pp.3-5, Introduction p.7, sha256:c3b537a0237c73d4c5740005ebcecb4b73f646056d32e63f2884b8b05f1cb551 — https://www.actexmadriver.com/samples/Interest%20Theory%203rd%20Edition%20Sample.pdf; ActuarialBrew, 'Financial Mathematics Textbook' (publisher's description of the third edition), home page fetched 2026-09-28, sha256:416a0fc39b58a8d19e41866a8a4c873357abd7ee47f98c99ddab1e04aebdf6ee — https://actuarialbrew.com/; SOA Financial Mathematics Exam syllabus, December 2026, Suggested Textbooks (Francis & Ruckman entry), PDF p.5-6, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: The scope source in ## Sources is now '[SOA Exam FM Syllabus, December 2026](https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf) — … the assigned chapters (p. 6)' (URL HTTP 200; sha256 b4189b65…). The callout was diffed against Dec 2026 pp.5-6 again and needs no change: 'There is not a single textbook required' (p.5); Chapters 1 to 13; Chapter 14 (excluding 14.04 and 14.05); Chapters 15-16 (p.6).

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: Re-pass after F-001; the only byte change is the syllabus entry in ## Sources (now December 2026, p. 6; URL HTTP 200). Callout re-diffed against Dec 2026 pp.5-6: suggested text, Chapters 1 to 13, Chapter 14 excluding 14.04 and 14.05, Chapters 15-16 — word for word. The publisher's sample re-fetched with the same sha256 as the aa33 pass (c3b537a0…), so its outline check (103 entries, 0 differences), frontmatter and lead checks stand unchanged. resource_lint 0 errors 0 warnings. Medium: a commercial text read only through its sample pages.
- sources_checked: Francis & Ruckman, Interest Theory: Financial Mathematics and Deterministic Valuation, Third Edition (ActuarialBrew, 2022), publisher's sample pages: title page p.1, copyright page p.2, Table of Contents pp.3-5, Introduction p.7, re-fetched 2026-09-29, sha256:c3b537a0237c73d4c5740005ebcecb4b73f646056d32e63f2884b8b05f1cb551 — https://www.actexmadriver.com/samples/Interest%20Theory%203rd%20Edition%20Sample.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Suggested Textbooks (Francis & Ruckman entry), PDF p.5-6, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf
