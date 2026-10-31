---
target: Concepts/Parametric Survival Model.md
created: 2026-10-31
---

## [F-001] 'No closed form' for Gompertz-Makeham moments contradicted
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T18:44Z/0c7d
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet 'Moments', last sentence
- claim: Gompertz and Makeham moments have no closed form, so they are found numerically or from a table.
- evidence: Wikipedia, Gompertz–Makeham law of mortality, 'Moments and life expectancy': for the Gompertz–Makeham distribution the mean-lifetime integral 'has a closed form in terms of the upper incomplete gamma function', with the expression given. The claim of no closed form is therefore wrong as stated (there is no elementary one). That the moments are in practice found numerically or from a table is consistent with the FAM-L sample solutions, which read SULT (Makeham) values from the table.
- source_rank: 3
- proposed_action: Delete 'have no closed form, so they' so the sentence reads 'Gompertz and Makeham moments are found numerically or from a table.'
- applied: true
- fingerprint: 335ef2675697

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T18:44Z/0c7d
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Applied in this run: the sentence now reads 'Gompertz and Makeham moments are found numerically or from a table.'

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T18:44Z/0c7d
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Laws against Slud §2.2 Examples (i)-(v): uniform (de Moivre) mu = 1/(omega - x), exponential, Weibull, Gompertz-Makeham A + Bc^x with Gompertz A = 0; Makeham tpx against the FAM tables p.22; SULT parameters against the FAM-L workbook and radix 100,000 at age 20 against the SULT p.20; Weibull tpx re-derived from mu = kx^n (rank 5); constant-force and uniform moments re-derived; 'no simple law fits the whole curve' against Slud §3.2 p.64 ('actuaries do not really believe that any of the simple models … ought to fit the whole of a human life table'); infant mortality against Slud p.43; Gompertz-Makeham moments against Wikipedia (finding F-001, fixed); exam bullets against FAM 8(a)-(b). Every worked example recomputed from scratch before comparing with the page's figures (rank 5, falsify only): all agree to the figures printed; one rounding artefact within the page's own stated intermediates, not a finding. Bc^65 0.00538485, 10p65 0.90086, 20p65 0.64691, 10|10q65 0.25395 = (85,203.5 - 61,184.9)/94,579.7 on the SULT; de Moivre/exponential 30, 0.5/0.3679, 300/900; Gompertz c = 1.116123, 10p60 0.84888; ln c factor 8.55 ('about 8.6'). Links resolve.
- sources_checked: Slud, Actuarial Mathematics and Life-Table Statistics (Univ. of Maryland, 2001, author's posted text), §2.2 pp.39-44 (PDF 49-54: force of mortality, tpx = exp(-int mu), uniform, exponential, Weibull, Gompertz-Makeham, infant mortality); §3.2 pp.62-66 (PDF 72-76: UDD tqx = t qx and mu = q/(1-tq), constant force tpx = px^t, complete = curtate + 1/2, no simple model fits a whole life table); §4.1 pp.99-103 (PDF 109-113: term, pure endowment nEx = v^n npx, endowment = term + pure endowment, deferred = nEx A_{x+n}, d ä + A = 1); §4.2 pp.110-111 (PDF 120-121: Abar = (i/delta) A under UDD); §5.1 p.127 (PDF 137: i/i(m) on the term part only, pure endowment independent of m), sha256:dccaca6b0e9f58a2f472390538e901660d0a45eb816e2869657718735c2b80bb — https://www.math.umd.edu/~slud/s470/BookChaps/01Book.pdf; SOA Tables for Exam FAM (2024-10), Standard Ultimate Life Table pp.20-21; Makeham's law formula p.22, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf; SOA Exam FAM-L tables Excel workbook (2022-10), sheet 'Select and Ult', cells A4:B6 (A = 0.00022, B = 2.7E-6, c = 1.124), sha256:ed9eb9c1d1ce26e050d26cb59d44fa3e03ab4d7595d5485e9cad9687e63b800d — https://www.soa.org/globalassets/assets/files/edu/2022/2022-10-exam-fam-l-tables-excel-workbook.xlsx; Wikipedia, Gompertz–Makeham law of mortality, lead; Mathematical formulation (Makeham term: accidents); Moments and life expectancy (closed form via the incomplete gamma function); Empirical patterns (infancy, exponential adult rise, late-life deceleration disputed), sha256:733b8c31a2e23560f0cbdc79f2513b978cd24af03be1357dbdbef4fff13ee072 — https://en.wikipedia.org/wiki/Gompertz%E2%80%93Makeham_law_of_mortality; SOA Exam FAM syllabus, October 2026, Topics 8-10 learning outcomes pp.6-7; Readings p.8 (AMLCR chapters), sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf; SOA Exam FAM-L sample solutions (2024-10), Q4.12 p.23 (Cov(Z1,Z2) = -E[Z1]E[Z2]), Q4.19 p.26, Q6.3-6.4 p.35 (second moments, variances), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf
- note: Notation difference noted, not corrected: Slud parametrises Weibull as S = exp(-lambda x^gamma), mu = lambda gamma x^(gamma - 1); the page's mu = kx^n is the same family.
