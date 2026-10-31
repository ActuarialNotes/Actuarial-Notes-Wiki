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

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T12:18Z/46f7
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: delta check of the c7887a25 additions (credibility properties, Bühlmann Z and M=(A+K)/(E+K), MSL/min-max, split plans, why split, split-plan mod both forms, NCCI weight-and-ballast form, quintile and efficiency tests) sentence by sentence against Fisher Ch.1; split-plan example recomputed blind; derived Zp/Ze checked by expanding the NCCI form; exam-8 question files grepped for the example's figures; unchanged older text not re-checked (verified 2026-10-17 against Fisher and Werner, C-001)
- sources_checked: Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.1 §6-8, §10, PDF pp.10-13, 14-17, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf; Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, 2016), Ch.15 experience rating, PDF pp.301-305, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: Every new bullet matches Fisher Ch.1 pp.10-17 (properties of Z p.10; Bühlmann K=EPV/VHM and M=(ZA+(1-Z)E)/E=(A+K)/(E+K) pp.10-11; MSL and min/max p.11; split at 5,000 table p.12; log-credibility rationale, frequency/severity reading and NCCI empirical result p.12; both split-mod forms and the NCCI form p.13; quintile and efficiency tests pp.14-17). Zp=E/(E+B), Ze=wE/(E+B) are not stated by Fisher, who only calls the forms 'mathematically equivalent'; they follow directly: the NCCI form expands to 1+(Ap-Ep)/(E+B)+w(Ae-Ee)/(E+B), which matches 1+Zp(Ap-Ep)/E+Ze(Ae-Ee)/E term by term. Kept, and the page's 'Matching the two forms' marks it as a derivation. Example recomputed: Ap=8+4+10+10+10+10=52,000, Ae=5+15+21=41,000; (52,000+16,400+36,000+100,000)/200,000=1.022; 1+0.5(0.12)+0.2(-0.19)=1.022. The example shares a 10,000 split, one 8,000 claim and Ze=0.2 with cas8-2014-q9, but none of its other figures or its answer (1.51), so rule 10 holds. F-001 (claim suppression, minor) stays open and untouched by this edit.
