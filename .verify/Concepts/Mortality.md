---
target: Concepts/Mortality.md
created: 2026-10-31
---

## [F-001] Late-life deceleration stated as fact
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T18:44Z/0c7d
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet 2 ('A typical mortality curve …')
- claim: A typical mortality curve … then rises roughly exponentially through adult ages and decelerates at the oldest ages
- evidence: Wikipedia, Gompertz–Makeham law of mortality, 'Empirical patterns': 'Some biodemographic studies report a slowing of the increase in death rates or the emergence of a late-life mortality plateau among the oldest-old … Other work argues that much of the apparent late-life mortality deceleration can be explained by data-quality problems such as age misreporting and cohort mixing'; the lead says that at the very highest ages estimates are 'sensitive to data quality and modelling assumptions'. No open source read states deceleration as a property of a typical curve. The rest of the bullet is supported: high infant mortality falling through childhood and a near-exponential adult rise (same article; Slud §2.2 p.43), a hump between childhood and adulthood to which traffic and other accidents contribute (Remund, Camarda & Riffe 2017, pp.2-3).
- source_rank: 3
- proposed_action: Delete 'and decelerates at the oldest ages'.
- applied: true
- fingerprint: 3a63184453b2

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T18:44Z/0c7d
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Applied in this run: the clause is deleted; the bullet now ends the curve at the roughly exponential adult rise, which the sources state.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T18:44Z/0c7d
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: tpx = exp(-int mu) (Slud §2.2); Makeham law and its tpx against the FAM tables p.22; SULT parameters A = 0.00022, B = 2.7E-6, c = 1.124 against the SOA FAM-L tables workbook (sheet 'Select and Ult' B4:B6); Gompertz as A = 0 and the Makeham term as age-independent (accident) risk against Slud §2.2 and Wikipedia; curve shape against Slud p.43, Wikipedia and Remund et al. (finding F-001 on late-life deceleration, fixed); heterogeneity factors (sex, smoking, income) against Wikipedia Life expectancy and select vs ultimate against Lim's select-life page; extra-risk methods against FAM 10(e) (age rating, constant addition to the force, constant multiple of the rate); improvement recursion q(x,t) = q(x,t-1)(1 - phi) against 29 CFR 4044.53(c)(2)(ii)-(iii) (annual factor = 1 - improvement rate, cumulative = product); exam bullets against FAM 8/9(d)/10(d)-(e), ALTAM 1(a), ILA-101 p.3, ILA-201U p.5, INV-201 p.7. Every worked example recomputed from scratch before comparing with the page's figures (rank 5, falsify only): all agree to the figures printed; one rounding artefact within the page's own stated intermediates, not a finding. mu60 0.0032215, 10p60 0.94255 = l70/l60 (96,634.1 → 91,082.4 on the SULT); extra risk 0.031253 and 0.030632; period 0.96736 vs cohort 0.96804. Links resolve.
- sources_checked: SOA Tables for Exam FAM (2024-10), Standard Ultimate Life Table pp.20-21; Makeham's law formula p.22, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf; SOA Exam FAM-L tables Excel workbook (2022-10), sheet 'Select and Ult', cells A4:B6 (A = 0.00022, B = 2.7E-6, c = 1.124), sha256:ed9eb9c1d1ce26e050d26cb59d44fa3e03ab4d7595d5485e9cad9687e63b800d — https://www.soa.org/globalassets/assets/files/edu/2022/2022-10-exam-fam-l-tables-excel-workbook.xlsx; SOA Exam FAM syllabus, October 2026, Topics 8-10 learning outcomes pp.6-7; Readings p.8 (AMLCR chapters), sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf; SOA Exam ALTAM syllabus, October 2026, Topic 1 p.2, Topic 3 p.3; Resources p.7 (AMLCR chapters), sha256:44b64a78219337f43387cb52837c7c2ce590ae2b97321d6e8e4e29ab2cd38c5e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-altam-syllabus.pdf; Slud, Actuarial Mathematics and Life-Table Statistics (Univ. of Maryland, 2001, author's posted text), §2.2 pp.39-44 (PDF 49-54: force of mortality, tpx = exp(-int mu), uniform, exponential, Weibull, Gompertz-Makeham, infant mortality); §3.2 pp.62-66 (PDF 72-76: UDD tqx = t qx and mu = q/(1-tq), constant force tpx = px^t, complete = curtate + 1/2, no simple model fits a whole life table); §4.1 pp.99-103 (PDF 109-113: term, pure endowment nEx = v^n npx, endowment = term + pure endowment, deferred = nEx A_{x+n}, d ä + A = 1); §4.2 pp.110-111 (PDF 120-121: Abar = (i/delta) A under UDD); §5.1 p.127 (PDF 137: i/i(m) on the term part only, pure endowment independent of m), sha256:dccaca6b0e9f58a2f472390538e901660d0a45eb816e2869657718735c2b80bb — https://www.math.umd.edu/~slud/s470/BookChaps/01Book.pdf; Wikipedia, Gompertz–Makeham law of mortality, lead; Mathematical formulation (Makeham term: accidents); Moments and life expectancy (closed form via the incomplete gamma function); Empirical patterns (infancy, exponential adult rise, late-life deceleration disputed), sha256:733b8c31a2e23560f0cbdc79f2513b978cd24af03be1357dbdbef4fff13ee072 — https://en.wikipedia.org/wiki/Gompertz%E2%80%93Makeham_law_of_mortality; Remund, Camarda & Riffe, A cause-of-death decomposition of the young adult mortality hump, MPIDR WP 2017-007, abstract p.2 (traffic and other accidents as contributors to the hump), p.3 (hump between childhood and adulthood), sha256:fcb9343e78e623e0d5354a4f633af93ed28baf19faf432419e2646f145a3f3c0 — https://www.demogr.mpg.de/papers/working/wp-2017-007.pdf; Wikipedia, Life expectancy, factors (tobacco smoking, income), Sex differences, sha256:9a7c01424cd83a26d7c72aebb6d8789b6b168c64428b3c98649bb4a2e6320650 — https://en.wikipedia.org/wiki/Life_expectancy; 29 CFR 4044.53 Mortality assumptions (LII), (c)(2)(ii)-(iii) cumulative and annual mortality improvement factors, sha256:59ba2c7b84f75b2de7b1453b01685a55862b6c91a7d8acdfc4e2a6a29990dc5e — https://www.law.cornell.edu/cfr/text/29/4044.53; SOA ILA-201U syllabus 2026-2027, p.5 (offsets between mortality and longevity risk), sha256:daa04ce74955f3f9410aa18ae501d020420272b16de1fe550a788bf89c1d4e87 — https://www.soa.org/globalassets/assets/files/edu/2026/ila-201u/2026-2027-ila-201u-syllabus.pdf; SOA INV-201 syllabus 2026-2027, p.7 (risks that can only be partially hedged, including mortality), sha256:8b5d280585ae9d0e35943729f861ac13ada7462be850c328da93645b7bbd9bc1 — https://www.soa.org/globalassets/assets/files/edu/2026/inv-201/2026-2027-inv-201-syllabus.pdf; SOA ILA-101 syllabus 2026-2027, p.3 (mortality, lapse ... assumptions and methods for their development), sha256:6494067f4d7faee58407e441df609030bb743fd6678f122159d3287d00217e49 — https://www.soa.org/globalassets/assets/files/edu/2026/ila-101/2026-2027-ila-101-syllabus.pdf
- note: Medium: no syllabus reading read (AMLCR commercial); every claim matched to an SOA document or an open text. ILA-101/201, INV-201 cited for the page's other-exam bullets only.
