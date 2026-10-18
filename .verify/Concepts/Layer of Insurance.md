---
target: Concepts/Layer of Insurance.md
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
- sources_checked: Bahnemann, Distributions for Actuaries, CAS Monograph 2 (2015), §5.1, Ch.5 inflation, Ch.6, PDF pp.154-155, 165-167, 181-182, sha256:d4d172f9646852ab018ae3f0df95e5fbdbfabda4db55d6d4596977ed2eaa3ef8 — https://www.casact.org/sites/default/files/2021-03/8_Bahnemann.pdf; Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.3 §2.1, PDF p.56, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf
- note: Bahnemann §5.1 (layer expectations), Poisson/negative binomial count of claims reaching a layer (PDF p.165), inflation leverage above a fixed attachment (PDF pp.166-167), Ch.6 consistency: premiums for successively higher layers of constant width decrease (I''(x) < 0) and layer pricing by ILF differences (PDF pp.181-182). Fisher Ch.3 §2.1: a horizontal strip of the Lee diagram has area S(x)dx (PDF p.56). Examples recomputed: 83,333.33 - 50,000 = 33,333.33, x20 = 666,667; 20 x 0.25 = 5 claims, 133,333 each; capped sums 2,570 and 1,470, share 0.3667, 880. The Exam 7 development remark is a finding (not checked).

## [F-001] Exam 7 claim about layer-by-layer reserving not checked
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- severity: minor
- status: open
- locus: Properties bullet, last sentence
- claim: Upper layers report and develop later, which is why unpaid claims must be estimated layer by layer rather than by scaling ground-up results.
- evidence: Bahnemann (PDF pp.165-167) supports only the faster trend of excess layers. No Exam 8 reading discusses reserving by layer; this is Exam 7 material (e.g., Siewert or Clark's reserving readings), not read this run.
- source_rank: 2
- proposed_action: Check the sentence in an Exam 7 pass against its reading and cite it.
- applied: false
- fingerprint: fc056e3cbc81
