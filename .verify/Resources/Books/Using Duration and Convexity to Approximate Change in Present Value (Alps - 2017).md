---
target: Resources/Books/Using Duration and Convexity to Approximate Change in Present Value (Alps - 2017).md
created: 2026-09-29
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: New page, written this run from scripts/resource_extract.py's extraction of the note (sha256 530436d4…, 19 pp., no bookmark outline, contents on PDF p.2) and checked back against the page images. Divisions: the ten entries of the printed Contents (Sections 1-6, Appendices A-D), numbered and titled as printed, plus the two unnumbered headings the note carries (Acknowledgements, References, PDF p.19); nothing omitted. Every formula (2.1, 3.1-3.3, 3.5, 4.1-4.2, 5.1-5.4, 6.1-6.2, A.1, D.3) compared symbol by symbol with the page images. Every example figure recomputed in python at full precision: P(0.07)=7023.58154, P(0.065)=7188.83022, sum t*PV=34739.1332, D_mac=4.9460710, D_mod=4.6224963, sum t^2*PV=228451.196, C_mac=32.526311, C_mod=32.729830; first-order modified 7185.91394 (-0.0406%), first-order Macaulay 7188.19380 (-0.0089%, 21.8% of the modified error); second-order modified 7188.78745 (-0.00060%), second-order Macaulay 7188.82657 (-0.00005%, 8.5% of the modified error) — all agree with the note. The note's (6.4) prints the exponent as 4.9460719, a slip for 4.9460710 (its own result 7188.8266 uses the latter); the page does not reproduce it. Appendix B percentages checked against Tables B.2/B.3 (15.24%-34.93%; 1.68%-17.53%; 87%, 72%-94%). Frontmatter: title, author (Robert Alps), publisher, 2017 copyright and code FM-24-17 from the title page (PDF p.1); Available from and Sources URLs fetched (HTTP 200). Syllabus callout against Dec 2026 syllabus p.7: 'Sections 1-4 are required reading for this examination'. resource_lint 0 errors 0 warnings; validate_links clean. Medium, not high: the writer of the page also verified it.
- sources_checked: SOA study note FM-24-17, Alps, Using Duration and Convexity to Approximate Change in Present Value (2017), PDF pp.1-19 (title page, contents, Sections 1-6, Appendices A-D, Acknowledgements, References; page images read for every formula), sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf; SOA Financial Mathematics Exam syllabus, December 2026, p.7 (Additional References), sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf
