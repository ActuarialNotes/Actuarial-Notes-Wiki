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

## [F-001] ICRLL described as the NCCI's current procedure
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T12:21Z/714a
- date: 2026-10-31
- severity: minor
- status: open
- locus: Per-occurrence limits bullet
- claim: The NCCI approximates the limited-loss charge with its ICRLL procedure.
- evidence: Fisher et al. Ch.3 §5.2, PDF p.89: 'until 2019, the NCCI published only unlimited Table M, and used an adjustment of this type in its workers' compensation rating manual: the Insurance Charge Reflecting Loss Limitation (ICRLL) procedure'; electronic limited Tables M now make the adjustment unnecessary.
- source_rank: 2
- proposed_action: Put it in the past: until 2019, when it published only an unlimited Table M.
- applied: true
- fingerprint: e1977778c183

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T12:21Z/714a
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Restated: 'Until 2019, when it published only an unlimited Table M, the NCCI approximated the limited-loss charge with its ICRLL procedure' (Fisher PDF p.89).

## [F-002] Clash bullet sends the insured-side clash deductible to the reinsurance clash cover page
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T12:21Z/714a
- date: 2026-10-31
- severity: minor
- status: open
- locus: Clash bullet
- claim: One occurrence that triggers retentions on several lines can be capped by a single combined retention; see [[Clash Cover]].
- evidence: Fisher et al. Ch.2 §6, PDF pp.29-30: 'Clash Coverage ... Often referred to as a Clash Deductible or Clash Aggregate, the coverage defines a single dollar amount for the sum of retained loss payments from an occurrence that impacts multiple lines of business.' The linked page, Clash Cover, is a reinsurance per-occurrence excess layer above the cedant's policy limits (Clark) — a different coverage under a similar name. The bullet's claim is right; the 'see' sent a reader to the wrong thing.
- source_rank: 2
- proposed_action: Name Fisher's terms and say the linked page is the reinsurance layer of the same name.
- applied: true
- fingerprint: d422ab9a7561

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T12:21Z/714a
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Restated: 'a single combined retention on the sum of retained losses from that occurrence, a clash deductible or clash aggregate. The reinsurance layer of the same name is [[Clash Cover]].' (Fisher PDF pp.29-30).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T12:21Z/714a
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: Delta only (older content verified against Fisher/Werner, unchanged). Guaranteed cost: premium fixed up front, no risk sharing except a small deductible, advantages/disadvantages (p.21); fair premium lower for a high-aggregate retro plan (p.100 Q1, p.121); consistency of assumptions, bureau pure premium loaded with LAE/assessments, unadjusted bureau excess factors understate (p.105, wording close to the source); clash deductible (pp.29-30); ICRLL until 2019 (p.89). Two findings fixed (F-001 ICRLL tense, F-002 clash link).
- sources_checked: Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.2 §2-9, Ch.3 §1.2-3.1, Ch.4 §1, PDF pp.22-32, 58, 62, 66, 100, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf; Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, 2016), Ch.15 retrospective rating, PDF p.319, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.2 §1 PDF p.21, §6 PDF pp.29-30; Ch.3 §5.2 PDF p.89; Ch.4 §1 and Q1 PDF pp.100, 121; Ch.4 §3 PDF p.105, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf
- note: Both findings fixed in the same edit.
