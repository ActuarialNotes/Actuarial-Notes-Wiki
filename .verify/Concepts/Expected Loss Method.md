---
target: Concepts/Expected Loss Method.md
created: 2026-10-31
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/3355
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: independent recomputation of both examples (1,300,000 / IBNR 1,250,000; 1.06^4 = 1.2625, 1.08×1.12×1.05×1.02^4 = 1.3748, ELR 64.3%, 70/64.3 ≈ +9%); formula and naming against Friedland p.137 fn 52 ('expected loss method'); uses against p.137 bullet list; stability/ignores-actual against p.158
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.8 Expected Claims Technique, PDF pp.137-139 (printed 131-133): key assumption, common uses, claim-ratio and exposure bases, on-level and trend adjustments, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.9, PDF p.158 (printed 152), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: Formula, uses and both examples agree with Friedland Ch.8; no findings.
