---
target: Concepts/Solvency Monitoring.md
created: 2026-10-10
---

## [F-001] IRIS liquidity threshold and name are out of date
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- severity: minor
- status: open
- locus: Example 'Growth That Trips the Early Warning', second paragraph
- claim: 'Its adjusted liabilities to liquid assets ratio ... is still inside its range (below 100%)', and the IRIS manual notes failed insurers' ratio rising in their final years.
- evidence: NAIC 2025 Property and Casualty IRIS results (publication-iris-means-median-2025.pdf): ratio 9 is 'Liabilities to Liquid Assets' and the unusual-value row flags it at 105 or over (row p.5: 900, 300, 33/-33, 15, 100, 6.5/3.0, 50/-10, 25/-10, 105, 40, 20, 20, 25). Change in net writings is flagged at 33 / -33, which the page has right. The example's 96% is inside either threshold, so its conclusion stands. The attribution to the IRIS manual of the rising-ratio pattern could not be checked: the manual is not on the NAIC's public site.
- source_rank: 1
- proposed_action: Change 'adjusted liabilities to liquid assets' to 'liabilities to liquid assets' and '100%' to '105%'; source or soften the manual attribution.
- applied: false
- fingerprint: 40460f475ba3

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: every statement against NAIC testimony, NAIC model acts, IRIS publication and NAMIC; example recomputed; links resolve
- sources_checked: NAIC testimony (Dilweg), House Financial Services, Mar 18 2010, PDF pp.2-6 (FAST tools, Analyst Team, Scoring System, Insurer Profiles, Financial Analysis Handbook stair-step, FAWG), sha256:6b54489519acef3b13de704b7ee457613331d9eb7881c25cb79a9928f9fa9239 — https://financialservices.house.gov/media/file/hearings/111/final_dilweg_testimony_3_18_2010.pdf; NAIC Model Law on Examinations (#390), examination frequency (not less than once every five years), sha256:0ac0345b424cbe0e28f85c01b9c87b276bdaa967c64dbb2accb192f04e9b46c4 — https://content.naic.org/sites/default/files/model-law-390.pdf; NAIC Model Regulation to Define Standards and Commissioner's Authority for Companies Deemed to be in Hazardous Financial Condition (#385), s.3 standards, s.4 orders, sha256:a85597cbe53da10521b464543813d02aa1ab01a9d6fe332e307f49ea6f2086a4 — https://content.naic.org/sites/default/files/model-law-385.pdf; NAIC Risk-Based Capital (RBC) for Insurers Model Act (#312), s.1 definitions (Regulatory Action Level RBC = 1.5 x ACL; P&C trend test band), s.4, sha256:973063eff4e1d044765b1d06e88d025da452d900d587faadd85528ba4c45bf63 — https://content.naic.org/sites/default/files/model-law-312.pdf; NAIC Risk Management and Own Risk and Solvency Assessment Model Act (#505), ORSA Summary Report, sha256:d5df715f08b8061178f58fbf5d6aefd4b5993d845584455f0fa7eef492108798 — https://content.naic.org/sites/default/files/model-law-505.pdf; NAIC Corporate Governance Annual Disclosure Model Act (#305), CGAD filing, sha256:8ae9cdde0ecc51884b9299b925008c5f9733e236cece540382ce551a4e98c64a — https://content.naic.org/sites/default/files/model-law-305.pdf; NAIC Insurer Receivership Model Act (#520), scope, sha256:0bcda9fc876090b38d9fce9b0edc98b0884b467840acc33801cb1eab4837b908 — https://content.naic.org/sites/default/files/model-law-520.pdf; NAIC 2025 Property and Casualty IRIS Ratios (means/medians and results), PDF p.2 (ratio list), p.5 (unusual-value row), sha256:0cb14c7a1f73bee94056296833cce0b70659e23b43842df033819fb962fde0ba — https://content.naic.org/sites/default/files/publication-iris-means-median-2025.pdf; NAMIC Issue Analysis, "The Financial Examination" (Dec 2019, rank 3), pp.4-6 (3-5 year cycle, risk-focused, controls, prospective), sha256:677c4dbbb2e5d4dba57816c5ccadf95831810b80b1360ba5d714ec22417b72c6 — https://www.NAMIC.org/pdf/publicpolicy/191218_financial_exam_v2.pdf; S. Harrington, testimony to Senate Banking Committee, July 18 2006, PDF pp.3-4, 9, sha256:b9f8f73ee163f8da541f0b1eac83254cafbcf66cdd8e508c0fb8e770a7fcf20c — https://www.banking.senate.gov/download/harrington-july-18-2006&download=1
- note: Quarterly off-site analysis under the Financial Analysis Handbook's stair-step approach, FAST tools (IRIS, Scoring System, Insurer Profiles, Analyst Team), FAWG (Dilweg 2010); exam at least every five years (Model 390; NAMIC: three to five); risk-focused exams on inherent risk and controls, current and prospective (NAMIC); hazardous financial condition standards (Model 385); RBC action levels and the P&C trend test between CAL (200%) and 3.0 x ACL (Model 312); ORSA (505), CGAD (305), receivership (520) agree. Not separately sourced: Form B / Form F names. Example: (400-250)/250=60% vs IRIS 33. Open: one minor finding. The syllabus reading (The Institutes, Insurance Accounting, Coverage Analysis, Insurance Law, and Insurance Regulation, 2023) is sold, not published, and was not read; confidence is held at medium for that reason.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Ratio renamed 'liabilities to liquid assets' and the threshold restated as 105% per the NAIC 2025 P&C IRIS results; the unverifiable IRIS-manual attribution deleted. Example still holds: 96% < 105%, risen 18 points.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: re-read the edited passages against the sources cited; links resolve; question_lint clean
- sources_checked: NAIC testimony (Dilweg), House Financial Services, Mar 18 2010, PDF pp.2-6 (FAST tools, Analyst Team, Scoring System, Insurer Profiles, Financial Analysis Handbook stair-step, FAWG), sha256:6b54489519acef3b13de704b7ee457613331d9eb7881c25cb79a9928f9fa9239 — https://financialservices.house.gov/media/file/hearings/111/final_dilweg_testimony_3_18_2010.pdf; NAIC Model Law on Examinations (#390), examination frequency (not less than once every five years), sha256:0ac0345b424cbe0e28f85c01b9c87b276bdaa967c64dbb2accb192f04e9b46c4 — https://content.naic.org/sites/default/files/model-law-390.pdf; NAIC Model Regulation to Define Standards and Commissioner's Authority for Companies Deemed to be in Hazardous Financial Condition (#385), s.3 standards, s.4 orders, sha256:a85597cbe53da10521b464543813d02aa1ab01a9d6fe332e307f49ea6f2086a4 — https://content.naic.org/sites/default/files/model-law-385.pdf; NAIC Risk-Based Capital (RBC) for Insurers Model Act (#312), s.1 definitions (Regulatory Action Level RBC = 1.5 x ACL; P&C trend test band), s.4, sha256:973063eff4e1d044765b1d06e88d025da452d900d587faadd85528ba4c45bf63 — https://content.naic.org/sites/default/files/model-law-312.pdf; NAIC Risk Management and Own Risk and Solvency Assessment Model Act (#505), ORSA Summary Report, sha256:d5df715f08b8061178f58fbf5d6aefd4b5993d845584455f0fa7eef492108798 — https://content.naic.org/sites/default/files/model-law-505.pdf; NAIC Corporate Governance Annual Disclosure Model Act (#305), CGAD filing, sha256:8ae9cdde0ecc51884b9299b925008c5f9733e236cece540382ce551a4e98c64a — https://content.naic.org/sites/default/files/model-law-305.pdf; NAIC Insurer Receivership Model Act (#520), scope, sha256:0bcda9fc876090b38d9fce9b0edc98b0884b467840acc33801cb1eab4837b908 — https://content.naic.org/sites/default/files/model-law-520.pdf; NAIC 2025 Property and Casualty IRIS Ratios (means/medians and results), PDF p.2 (ratio list), p.5 (unusual-value row), sha256:0cb14c7a1f73bee94056296833cce0b70659e23b43842df033819fb962fde0ba — https://content.naic.org/sites/default/files/publication-iris-means-median-2025.pdf; NAMIC Issue Analysis, "The Financial Examination" (Dec 2019, rank 3), pp.4-6 (3-5 year cycle, risk-focused, controls, prospective), sha256:677c4dbbb2e5d4dba57816c5ccadf95831810b80b1360ba5d714ec22417b72c6 — https://www.NAMIC.org/pdf/publicpolicy/191218_financial_exam_v2.pdf; S. Harrington, testimony to Senate Banking Committee, July 18 2006, PDF pp.3-4, 9, sha256:b9f8f73ee163f8da541f0b1eac83254cafbcf66cdd8e508c0fb8e770a7fcf20c — https://www.banking.senate.gov/download/harrington-july-18-2006&download=1
- note: Re-verified after the clean-up edits (all open findings resolved in this run). Quarterly off-site analysis under the Financial Analysis Handbook's stair-step approach, FAST tools (IRIS, Scoring System, Insurer Profiles, Analyst Team), FAWG (Dilweg 2010); exam at least every five years (Model 390; NAMIC: three to five); risk-focused exams on inherent risk and controls, current and prospective (NAMIC); hazardous financial condition standards (Model 385); RBC action levels and the P&C trend test between CAL (200%) and 3.0 x ACL (Model 312); ORSA (505), CGAD (305), receivership (520) agree. Not separately sourced: Form B / Form F names. Example: (400-250)/250=60% vs IRIS 33.
