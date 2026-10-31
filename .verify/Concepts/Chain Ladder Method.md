---
target: Concepts/Chain Ladder Method.md
created: 2026-10-31
---

## [F-001] Data-driven claim overlooks benchmark factors and selection judgment
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/3355
- date: 2026-10-31
- severity: minor
- status: open
- locus: Further points, third bullet
- claim: It is entirely data-driven: nothing external — premium, exposure, rate level or judgment about the year — enters the estimate.
- evidence: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010) Ch.7 says the opposite on two counts: PDF p.94 (printed 88) — when the insurer's own experience has limited credibility 'there may be a need to supplement ... with certain benchmarks', including industry development patterns; PDF p.102 (printed 96) — for a new line or a small insurer 'the development technique is still often used ... actuaries ... rely on benchmark patterns'; PDF p.95 (printed 89) — 'We use actuarial judgment to select these factors'. Premium and rate level do not enter, which is the true part. sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- source_rank: 2
- proposed_action: Narrow the bullet to premium/exposure/a priori: the method uses no expected-loss input, but factor selection is judgmental and may use external benchmark patterns.
- applied: false
- fingerprint: c19b6aa40f24

## [F-002] Cross-check labelled 'corrected treatment' uses the uncorrected diagonal
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/3355
- date: 2026-10-31
- severity: nit
- status: open
- locus: Example 'Where the Chain Ladder Breaks', BF cross-check
- claim: BF as a cross-check, using the corrected treatment: $4,500,000 + 0.6875 × 0.65 × $14,000,000 = $10,756,000
- evidence: Recomputed (rank 5): 4,500,000 + 0.6875 × 9,100,000 = 10,756,250, so the arithmetic is right, but the $4.5M reported figure includes the $1.5M shock claim — it is the uncorrected diagonal, not 'the corrected treatment'. BF takes reported at face value (Friedland Ch.9, PDF p.159, printed 153: 'Ultimate Claims = Actual Reported Claims + (Expected Claims) x (% Unreported)'), so the label, not the number, is what is off.
- source_rank: 5
- proposed_action: Drop 'using the corrected treatment', or say BF is applied to the reported figure as it stands.
- applied: false
- fingerprint: b168837223cf

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/3355
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: independent recomputation of both worked examples (CDFs 1.081/1.265/1.898, ultimates 1,108/1,139/1,186, IBNR 883; 14.4M, 11.8M, 10,756,250); assumptions diffed against Friedland Ch.7 key assumptions (PDF p.90) and 'When the Development Technique Works' (PDF pp.101-103); leverage/immature-year claim against PDF p.103
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.7 Development Technique, PDF pp.90-103 (printed 84-97): key assumptions, mechanics, when it works, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.9, PDF p.158-159 (printed 152-153), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: Formulas, assumptions and both examples agree with Friedland Ch.7; one minor overstatement and one nit left open for the maintainer.
