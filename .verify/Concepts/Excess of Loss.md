---
target: Concepts/Excess of Loss.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Per-risk vs per-occurrence, working/exposed excess/clash layers, experience rating steps (trend each loss before layering, excess LDFs, divide by adjusted subject premium, ALAE pro rata added per loss), exposure rating with exposure curves and ILFs, credibility blending, rate on line and payback against Clark pp.14-15, 17-23, 27, 47-48. Recomputed the experience example (layer 254/26/750/77; developed 1,205.6; loss cost 7.54%; untrended 850, +30.2%; ground-up +16.6%) and the ILF example (0.40/1.75=0.2286, 0.40/2.00=0.2000, 0.65x3.286=2.136M, 14.2%).
- sources_checked: Clark, Basics of Reinsurance Pricing (CAS study note, rev. 2014), §1A pp.3–4, §1B pp.9–12, §2A pp.14–15, casualty layers pp.22–23, 27, sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/2021-03/8_Clark.pdf
- note: Medium: vault-authored examples; formulas consistent with Clark (rank 2).
