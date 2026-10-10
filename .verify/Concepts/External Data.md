---
target: Concepts/External Data.md
created: 2026-10-10
---

## [C-001] Validation pass
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv01
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Sources: credit-based insurance scores from credit data, geo-demographic and weather data, motor vehicle records = Werner pp.46-47; usage-based insurance via on-board devices, use only with consent = Werner ch.9 p.158 fn.30 and text; legality varies by state and variables may be barred from rating = Werner ch.9 p.158 'Legal Criteria'; third-party data and AI systems, bias analysis, unfair discrimination = NAIC model bulletin via Vermont 229 §3-4; actuary still reviews data supplied by others and discloses reliance = ASOP 23 §3.5. Example recomputed first: 46,000/50,000 = 92.0%, rural 2,000/5,000 = 40.0%, other 44,000/45,000 = 97.8%; 3,000 of 5,000 rural unmatched = 60% — all match. Links resolve.
- sources_checked: Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, May 2016), Ch.3 External Data / Other Third-Party Data, printed pp.44-47 (PDF pp.56-59): credit, geo-demographic, weather indices, motor vehicle records; Ch.9 Traditional Risk Classification, printed p.158 (PDF p.170): usage-based insurance, privacy consent, legal criteria, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; ASB, ASOP No. 23 Data Quality (Doc. No. 185, Dec. 2016), §3.5 reliance on data supplied by others, disclosed, PDF p.10, sha256:784c57a1379b189b234452dc7fe18d391ae86e7f5fb8815d14d35400eb3e7bdf — https://www.actuarialstandardsboard.org/wp-content/uploads/2017/01/asop023_185.pdf; Vermont DFR Insurance Bulletin No. 229 (Mar. 12, 2024), adopting the NAIC Model Bulletin on Use of AI Systems by Insurers: unfair discrimination, bias analysis, data lineage/currency, third-party data and AI systems (§§3-4), sha256:0fa2eb6c77c4fad493df0b53612e9fd4cb815834300d37433713caaa70c215a5 — https://dfr.vermont.gov/sites/finreg/files/regbul/dfr-insurance-bulletin-229-ai.pdf; The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf
- note: Medium: the IoT sensors item and the general remark that unmatched records are rarely random are uncontroversial but not stated in a source read; the rest checks against Werner (rank 2) and the NAIC bulletin. The tip's description of DISC-DA question shapes is study guidance (the only public statement of question form is CAS's 'application-based multiple-choice'); its topic placement was checked against the DISC DA syllabus.
