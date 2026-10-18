---
target: Concepts/Experience Rating.md
created: 2026-10-17
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- status_set: verified
- confidence: medium
- checks_run: definition, formulas and every bullet checked against the routed reading pages; every worked example recomputed before comparison; [[links]] and $$ balance checked
- sources_checked: Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.1 §1-9, Ch.2 §2, PDF pp.8-14, 22, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf; Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, 2016), Ch.15 experience rating, PDF pp.301-305, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: Fisher Ch.1: standard premium = e-mod x manual premium; mod > 1 debit, < 1 credit; mod is a prospective measure of loss potential relative to others in the class, not a charge-back; credibility Z = E/(E+K) grows with size; MSL caps single losses; min/max mods; split plans weight primary losses (frequency) more than excess (severity), NCCI WC is a split plan; incentive for safety; schedule vs experience double counting (PDF pp.8-14). Fisher Ch.2 §2: retro rating adjusts the same policy period (PDF p.22). Werner Ch.15: experience period usually two to five policy years ending with the last complete year; actual and expected on the same basis; per-occurrence caps; off-balance (PDF pp.301-303). Examples recomputed: 1.24, 1.10; capped 1.50 vs 0.83. Claim-suppression sentence is a finding.

## [F-001] Claim-suppression incentive not in the readings
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- severity: minor
- status: open
- locus: sixth bullet
- claim: Experience rating creates an equally real incentive for claim suppression - paying small claims outside the policy to keep them out of the mod.
- evidence: Fisher Ch.1 §4 (PDF p.9) states only the increased incentive for safety; Werner Ch.15 (PDF pp.301-305) does not mention suppression. No reading checked supports the claim-suppression statement or "equally real".
- source_rank: 2
- proposed_action: Cite a source for the claim-suppression incentive or delete the clause.
- applied: false
- fingerprint: 254395def583
