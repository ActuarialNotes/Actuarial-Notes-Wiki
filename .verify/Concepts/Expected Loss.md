---
target: Concepts/Expected Loss.md
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
- sources_checked: Bahnemann, Distributions for Actuaries, CAS Monograph 2 (2015), §5.1, Ch.6 intro, PDF pp.154-155, 174, sha256:d4d172f9646852ab018ae3f0df95e5fbdbfabda4db55d6d4596977ed2eaa3ef8 — https://www.casact.org/sites/default/files/2021-03/8_Bahnemann.pdf; Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.3 §1.2, §3.1, PDF pp.44, 66, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf
- note: Bahnemann Ch.6: policy expected loss E[N]E[Y] (PDF p.174); §5.1 excess/layer expectations via limited expected values and the expected number of claims penetrating a layer (PDF pp.154-155, 165). Fisher Ch.3 §1.2: E{A} = E{N}E{X} (PDF p.44); §3.1 entry ratio = aggregate loss / expected aggregate loss and Table M (PDF p.66); Ch.1 experience rating compares actual with expected. Examples recomputed: exponential LEVs 49,084.22 and 43,233.24, layer 117,020 both routes (20e^-2 = 2.707 claims x 43,233); Pareto 71,428.57 / 90,909.09, layers 857,143 / 233,766 / 109,091 summing to 1,200,000; exponential tail 100,000e^-10 = 4.54.
