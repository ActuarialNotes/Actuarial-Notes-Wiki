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

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Delta check: diffed f46336499 (last pass, high, against Werner & Modlin) to HEAD; the change adds only the 'Why insurers audit' and 'How audits are done' bullets and the DISC-RM tip and traps callouts. Each added claim checked: estimate vs actual exposures and classifications, can go down as well as up, audit methods (online, mail, phone, virtual, physical) and audit noncompliance charge varying by state against AF Group; Florida minimums ($10,000+ annual physical; $1-$9,999 mail or physical; new-business construction classes physical), the record list (RT forms, federal reports of employee income, payroll, cash disbursement journals, other accounting records, subcontractor certificates, independent contractor documents) and classification audits against R. 69O-189.003(4)(b) verbatim; definition against IRMI. Unchanged Werner-checked material not re-read.
- sources_checked: AF Group / Accident Fund, Premium Audit Process (web page, read 2026-10-10): estimate vs actual exposures and classifications, online/mail/phone/virtual/physical audits, audit noncompliance charge varies by state, sha256:bb3f82a60aebdb65467e3bf0144b0406cce6742e2713a6ea2c3df00b3f096259 — https://accidentfund.com/ph/premium-audit-process; Fla. Admin. Code R. 69O-189.003(4)(b) and (f) (via Cornell LII), voluntary-market minimum audit requirements, records examined, classification audits, sha256:a361d22c0e135409ed917b6df625d654dda03db24afd8fbd17602e93d6fff80f — https://www.law.cornell.edu/regulations/florida/Fla-Admin-Code-Ann-R-69O-189-003; IRMI glossary, 'premium audit', sha256:4d303e9e2670eb03ca6e5050b336726d99d40c4294ec4a273a9a9f79a6b79909 — https://www.irmi.com/term/insurance-definitions/premium-audit
- note: Confidence lowered from high to medium because the added DISC-RM material rests partly on an insurer's web page (rank 3), corroborated by the Florida rule (primary) and IRMI.
