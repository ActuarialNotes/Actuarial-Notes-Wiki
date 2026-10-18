---
target: Concepts/Loss Sensitive Rating.md
created: 2026-10-17
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- status_set: verified
- confidence: high
- checks_run: definition, formulas and every bullet checked against the routed reading pages; every worked example recomputed before comparison; [[links]] and $$ balance checked
- sources_checked: Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.2 §2-9, Ch.3 §1.2-3.1, Ch.4 §1, PDF pp.22-32, 58, 62, 66, 100, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf; Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, 2016), Ch.15 retrospective rating, PDF p.319, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: Fisher Ch.2 §2-9: retro formula (B + cL)T, T = 1/(1 - tax rate), c loads LAE, expense portion e - (c-1)E, insurance charge and savings, per-occurrence limits; large deductibles more common than retro, per-occurrence limit required, aggregate optional, no minimum, reimbursements not premium; SIRs (insured adjusts claims, insurer reimburses above the retention, limit not eroded); dividend plans collect nothing when losses are high, so unbalanced; credit risk managed by security, LDFs and holdbacks; insured keeps the working layer; retentions rise with trend. Fisher Ch.3: psi(r) = phi(r) + r - 1 (Formula 3.1), I = [phi(rG) - psi(rH)]E, E{R} = e + E, Table M by size of policy (PDF pp.58, 62, 66); Tables M_D and L (Ch.3 §4-5 per the document outline). Fisher Ch.4 §1: balanced premium no longer necessary or desirable for most policy types, but expected losses must balance. Examples recomputed: phi(1.5) = 0.06, psi(0.6) = 0.04, phi(0.6) = 0.44; I = 12,000, B = 203,200, G = 1,228,996, H = 617,176, average of the five outcomes 875,500 = (250,000+600,000)(1.03).
