---
target: questions/exam-8/cas8-an-005.md
created: 2026-10-17
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- status_set: verified
- confidence: high
- checks_run: key recomputed/derived independently from the stem before reading the answer; stem premises checked against the cited reading; every option's rationale checked; options distinct and key present; validate_content.py passed; wiki_link targets exist
- sources_checked: Chalk et al., From GLMs to Comprehensive Insurance Pricing: Techniques and Challenges, CAS Monograph 16, 1st ed., §6.2, Eq.6.1, PDF pp.86-88, sha256:0b293634c3d6320eac9aca5d2f8ba4ca7954f20db8a462b24771c60b5e046d74 — https://www.casact.org/sites/default/files/2026-02/CAS_Monograph-16_From_GLMs.pdf
- note: Vault-written question. Recomputed from the stem: beta = (0.080-0.050)/(600/200 + 1) = 0.0075, prediction 0.0575 -> B (0.055-0.059); key B. Chalk Eq.6.1 (§6.2, PDF pp.86-87): beta_k = (ybar_k - ybar)/(lambda/n_k + 1), prediction ybar + beta_k, a credibility weight n_k/(n_k+lambda) with lambda chosen by cross-validation. Distractor values recomputed: A 0.0075, C 0.060, D 0.0725, E 0.080 each fall in its own band; Chalk p.88 warns software often encodes the raw mean with no credibility adjustment (E's rationale).
