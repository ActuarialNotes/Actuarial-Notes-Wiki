---
target: questions/exam-8/cas8-an-006.md
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
- sources_checked: Chalk et al., From GLMs to Comprehensive Insurance Pricing: Techniques and Challenges, CAS Monograph 16, 1st ed., §6.2-6.3, §6.7.3, PDF pp.86-91, 104, sha256:0b293634c3d6320eac9aca5d2f8ba4ca7954f20db8a462b24771c60b5e046d74 — https://www.casact.org/sites/default/files/2026-02/CAS_Monograph-16_From_GLMs.pdf
- note: Vault-written question. Independent answer D before reading the key; key D. Chalk §6.3 (PDF pp.89-91): letting the GLM see the target is leakage; target encoding on all the training data leaks because many levels have few observations; fix: for observations in a fold, encode using only the other folds. §6.2 (PDF p.87): a cross-validated lambda may generalise better than the credibility ratio (B's rationale); §6.2 p.86 unpenalized one-hot unreliable for thin levels (C); §6.7.3 novel categories (E, excluded by the stem); 'Are HCCVs really predictive?' section exists (A).
