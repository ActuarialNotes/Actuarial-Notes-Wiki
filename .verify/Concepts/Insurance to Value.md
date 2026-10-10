---
target: Concepts/Insurance to Value.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: formula and deductible-after-ratio order diffed against CP 00 10 F.1 steps 1-4 (value at time of loss); BI coinsurance base and the three alternatives against CP 00 30; HO 80% replacement cost condition; both examples recomputed blind (R 0.86957, 255,869.57, 39,130.43; LR 87.5%, 175%, 109.4%, 7,000/6,400 = 109.4%)
- sources_checked: ISO CP 00 10 10 12 Building and Personal Property Coverage Form, F.1 coinsurance steps (1)-(4); G.1 Agreed Value; G.2 Inflation Guard, sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf; ISO CP 00 30 10 12 Business Income (And Extra Expense) Coverage Form, F.1 coinsurance base; G optional coverages, sha256:4b77049e08827380f912161468b9aef9b182853f5a217f50993546366d101b98 — https://forms.nationwideexcessandsurplus.com/FormsExternal/ContractForm?num=CP+00+30&ed=10-12; ISO HO 00 03 05 11 Homeowners 3 – Special Form (Maine BOI copy), Section I Conditions, Loss Settlement 80%, sha256:ac539e500a5767946452d1e6ad4c4b7dcc395c6c65c48fc3a8ac92a7c330a1d4 — https://www.maine.gov/pfr/insurance/sites/maine.gov.pfr.insurance/files/inline-files/ho00-03-05-11-homeowners3-special-form.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.11 'Coinsurance Clause', PDF pp.220-222, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: Forms rank 1; the rate-adequacy argument is consistent with Werner Ch.11 (which frames the clause's intent as equity among risks). Note Werner applies the deductible before the ratio; the page follows the ISO form and says so. Medium.
