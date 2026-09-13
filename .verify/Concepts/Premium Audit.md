---
target: Concepts/Premium Audit.md
created: 2026-09-12
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/f2bc
- date: 2026-09-12
- status_set: verified
- confidence: high
- checks_run: Recomputed both examples from scratch first. WC audit: 2,000,000/100 x 3.50 = $70,000 deposit; 2,400,000/100 x 3.50 = $84,000 audited; $14,000 additional. Premium development: 10,070/9,500 = 1.0600, 10,812/10,200 = 1.0600, 10,171/10,070 = 1.0100; CDF 1.060 x 1.010 = 1.0706 -> 1.071; 11,000,000 x 1.071 = $11,781,000; and the closing claim that using the undeveloped premium overstates the loss ratio 'by about 7%' checks at 11,781/11,000 - 1 = 7.1%. Werner's own worked audit example reproduces the same shape (12 policies x $500,000 developing 8% at audit: $6,240,000 at 24 months, $6,480,000 at 36 months, factor 1.0385). The page's core claim — that premium development factors for audits are needed for policy year and accident year data but calendar year premium is fixed at year end — is Werner p. 81 (PDF p. 93) verbatim. Werner also times the first audit 'about three to six months after the policy expires', consistent with the page's 'two or three years' of policy-year development. No findings.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 5 pp. 80-81 (PDF pp. 92-93), Premium Development — incl. the workers compensation policy-year audit example and the 24-36 month factor 6.48/6.24 = 1.0385, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 4 p. 52 fn. 9 (PDF p. 64) and Ch. 5 p. 65 fn. 11 (PDF p. 77), policies subject to audit as the exception to CY = AY equivalence, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
