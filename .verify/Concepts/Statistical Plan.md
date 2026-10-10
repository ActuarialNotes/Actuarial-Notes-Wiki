---
target: Concepts/Statistical Plan.md
created: 2026-10-10
---

## [F-001] Agents' edits are described as rejecting records
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv01
- date: 2026-10-10
- severity: nit
- status: open
- locus: Coded fields bullet, last sentence
- claim: 'The agent's edits reject records with codes that are not on the lists.'
- evidence: NAIC Statistical Handbook (2012) §2.3.3 'Validity Checks Required' (PDF p.23, sha256:b2929917f42e54e41b4904be523f776f28c21c482933613eca3432982b7561ca): validity checks are designed to catch codes not within the set of valid codes; 'Insurers shall fill in missing data and correct invalid codes' until the records with missing or invalid codes fall below the stated tolerances, and agents advise insurers whose data exceed 50% of them; §2.3.2 lets agents omit data that cannot be reconciled. The edits flag invalid codes for the insurer to correct; outright rejection of each record is not what the Handbook describes.
- source_rank: 3
- proposed_action: Reword to 'The agent's edits flag records whose codes are not on the lists, and the insurer must correct them' (Handbook §2.3.3).
- applied: false
- fingerprint: 2dcad98a5eda

## [C-001] Validation pass
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv01
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Definition and agents: statistical plans define data elements (line, coverage, class, state, territory, premium) and how insurers code and submit premium and loss data to the statistical agent = Handbook §1.6; ISO, NCCI and AAIS listed as statistical agents = App. A; common definitions so data can be combined = §1.6. Record contents (premium/exposure with dates, class, deductibles/limits; loss records with year of loss, claim counts, paid and outstanding losses) = Handbook §5 PPA elements. Uses: pooling because no insurer's own data is credible for every cell = §1.4; regulators designate agents, evaluate rates and markets = §1.2-1.4; advisory loss costs that insurers adjust for expenses/deviations = Werner App. D; NCCI unit statistical data feed experience rating = NCCI ABCs. Statistical vs financial data, reconciliation to Annual Statement state pages, lines not equivalent = §1.3, §2.3.2. Statistical plans capture only defined fields; Handbook minimums vs insurers capturing more = §1.6-1.7. Examples recomputed first: 12,755 / 18.3 = 696.99 (697; 183 car-years would give 69.7); pooled LC 2,240,000 / 4,000 = 560, A = 260,000 / 400 = 650, blend 0.3 x 650 + 0.7 x 560 = 587 — all match. Links resolve.
- sources_checked: NAIC, Statistical Handbook of Data Available to Insurance Regulators (2012), as hosted by the Alaska Division of Insurance, §1.3 financial vs statistical data, §1.4 pooled data and statistical agents, §1.6 role of statistical agents and statistical plans (data elements, formats, coding), §2.3.1-2.3.3 control totals, reconciliation to Annual Statement State Pages, validity checks; §5 private passenger auto data elements; §23A unit statistical reports; App. A statistical agents (AAIS, ISO, NCCI), PDF pp.13-30, 71-76, 229-232, 289-298, sha256:b2929917f42e54e41b4904be523f776f28c21c482933613eca3432982b7561ca — https://www.commerce.Alaska.gov/web/Portals/11/Pub/INS_StatisticalHandbookDataInsurance%20Regulators.pdf; Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, May 2016), Ch.3 External Data / Statistical Plans, printed pp.44-45 (PDF pp.56-57); App. D advisory loss costs and company deviation, PDF pp.394-398, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; NCCI, ABCs of Experience Rating (copy hosted by CEIWC), 'Data Used on the Experience Rating Worksheet': payroll and loss information used to calculate the mod comes from unit statistical reports filed under NCCI's Statistical Plan, sha256:268bbb28e4894f10ca942274a62ac2bcd6237e9278ddd1df8f414da99e0f31ed — https://www.ceiwc.com/PDFs/ABCs-of-Experience-Rating-NCCI.pdf; The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf
- note: Medium: the Handbook is the NAIC's 2012 edition (an official publication, here a state-hosted copy; no newer edition was found); Werner (rank 2) supports the core. Nit F-001 open on 'reject'. The tip's description of DISC-DA question shapes is study guidance (the only public statement of question form is CAS's 'application-based multiple-choice'); its topic placement was checked against the DISC DA syllabus.
