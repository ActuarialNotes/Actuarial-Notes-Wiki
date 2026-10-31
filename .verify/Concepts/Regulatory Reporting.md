---
target: Concepts/Regulatory Reporting.md
created: 2026-10-31
---

## [F-001] Schedule P detail and statutory discounting basis are in no reading read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/0351
- date: 2026-10-31
- severity: minor
- status: open
- locus: Schedule P bullet (claim counts, one-year and two-year development) and statutory-basis bullet (undiscounted except tabular workers compensation indemnity and some long-term disability)
- claim: Schedule P is ... paid and incurred triangles by line, with claim counts, for ten accident years, plus the one-year and two-year development on prior reserves; reserves are stated on a statutory basis, generally undiscounted except for defined categories (tabular workers compensation indemnity, and some long-term disability).
- evidence: Friedland Ch.1 fn.5, printed p.9 (PDF p.15) describes Schedule P as 'a ten-year summary, by line of insurance, of earned premiums, claim and claim expense payments, and unpaid claims and expenses' with 'claim development schedules ... for incurred net claims, paid net claims, and net bulk and incurred but not reported (IBNR) reserves' — the ten-years-by-line part is supported; claim counts and one-/two-year development are not mentioned. ASOP 43 §1.2 addresses only the undiscounted value; ASOP 36 §4.3(a) requires disclosure of any discount but does not say which categories statutory accounting discounts. The NAIC Annual Statement Instructions and SSAP 65 (Exam 6U readings) would settle both and were not read this session.
- source_rank: 2
- proposed_action: Source the Schedule P counts / one-two-year development detail and the statutory discounting categories from the NAIC Annual Statement Instructions and SSAP 65, or reduce the bullets to what Friedland and ASOP 36 say.
- applied: false
- fingerprint: de0387d7f542

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/0351
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Opinion types against ASOP 36 §3.8.1-3.8.5 (reasonable provision; deficient or inadequate; redundant or excessive; qualified; no opinion) — match. Reasonable-provision definition against §3.8.1 and Friedland Ch.1 p.6 (SAO 'regarding the reasonableness of the carried statutory loss and LAE reserves'). RMAD bullet against ASOP 36 §3.10-3.11 and §4.2(g)-(i) (materiality standard and basis; factors underlying risks and uncertainties; whether significant risk of material adverse deviation exists). Actuarial Report bullet against ASOP 36 §3.14 (documentation 'in a form such that another actuary qualified in the same practice area could assess the reasonableness') and §4.1 (report disclosures refer to ASOPs 20, 23, 38, 41, 43, 56), and ASOP 43 §4.1(f), §4.2(b), §4.1(b),(e). Gross-and-net against ASOP 36 §3.9.1. Examples recomputed before reading the answers: carried 36M below minimum 38M → deficient/inadequate (§3.8.2, minimum reasonable amount disclosed per §4.3(f)); 38.5M within 38-44M → reasonable (§3.8.1); 47/60 = 78%; 10% × 47M = 4.7M = 7.8% of surplus ('8%'); 5.1% × 47M = 2.4M. Links resolve.
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ver. July 2010), Ch.1 pp.6, 9 fn.5 (PDF pp.12, 15), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; ASOP No. 36, Statements of Actuarial Opinion Regarding Property/Casualty Loss and Loss Adjustment Expense Reserves (ASB, March 2024, Doc. No. 213), §§3.8-3.11, 3.14, 4.2-4.3, pp.7-11 (PDF pp.14-18), sha256:3bdfe0e5e237233d7333a051b34fa8c1bf805510f0f1dbe8947c52a3cfe14b8b — https://www.actuarialstandardsboard.org/wp-content/uploads/2024/09/asop036_213.pdf; ASOP No. 43, Property/Casualty Unpaid Claim Estimates (ASB, June 2007, Doc. No. 159), §§1.2, 4.1-4.2, pp.1-10 (PDF pp.6-15), sha256:776302c442cb8d3210fc41269d38caeec4c547da8159084b80fa2ac4ce949cce — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop043_159.pdf; CAS Exam 5 Content Outline, Fall 2026, pp.3-6 (tasks A3, B16-B20; Complete Text References), sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf
- note: Verified against ASOP 36 (2024, the Exam 6U reading the SAO material comes from), Friedland Ch.1 and ASOP 43. One minor finding open (F-001): Schedule P claim counts / one-two-year development and the statutory discounting categories are in no reading read this session.
