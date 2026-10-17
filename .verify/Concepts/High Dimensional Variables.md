---
target: Concepts/High Dimensional Variables.md
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
- sources_checked: Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §5.5, §9.2, §10.1, PDF pp.65, 100-101, 103-106, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Chalk et al., From GLMs to Comprehensive Insurance Pricing: Techniques and Challenges, CAS Monograph 16, 1st ed., Ch.6 §6.1-6.7, Ch.8 §8.2, PDF pp.85-105, 143, sha256:0b293634c3d6320eac9aca5d2f8ba4ca7954f20db8a462b24771c60b5e046d74 — https://www.casact.org/sites/default/files/2026-02/CAS_Monograph-16_From_GLMs.pdf; Couret & Venter, Using Multi-Dimensional Credibility to Estimate Class Frequency Vectors in Workers Compensation (ASTIN Bulletin 38(1), 2008), abstract, §2, PDF pp.1-2, 7-11, sha256:ce50d8a0fbc395621d29dd153836b0303a269d94697bb1932b5f334b47ebba18 — https://www.casact.org/sites/default/files/2021-03/8_Couret_Venter.pdf
- note: Goldburd §5.5 (too many levels consume degrees of freedom, may not converge), §9.2 (territories do not fit the GLM; standalone spatial model entered as an offset; two-way street iterated to convergence), §10.1 (GLM gives full credibility to thin levels; GLMM estimates fall between the GLM full-credibility value and the grand mean, analogous to Buhlmann-Straub). Chalk Ch.6: one-hot unpenalized estimates unreliable for thin levels, penalized regression shrinks like credibility (Eq.6.1), grouping rare levels, hierarchical complements, feature creation from characteristics, GLMMs, novel categories have no encoding (§6.7.3); Ch.8 §8.2 geographic two-stage model. Couret & Venter: multi-dimensional credibility by injury type adds information beyond the seven-hazard-group system on holdout data. Example recomputed: Z 0.20 -> 1.072, Z 0.90 -> 1.324. One omission finding recorded (target encoding/leakage).

## [F-001] The A8 reading's target encoding and leakage are not covered
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- severity: minor
- status: open
- locus: Approaches (Exam 8) list
- claim: The page lists five approaches (grouping, characteristics, shrinkage/GLMM, separate model as offset, multi-dimensional credibility) and does not mention target encoding or leakage.
- evidence: Chalk et al. (CAS Monograph 16), the reading the Exam 8 outline assigns to A7-A8, devote Ch.6 §6.2-6.3 (PDF pp.86-91) to target encoding (Eq.6.1-6.3, credibility-shrunk level means) and to leakage, fixed by out-of-fold encoding, and §6.7.3 to novel categories. The page is otherwise consistent with that chapter. Two vault questions (cas8-an-005, cas8-an-006) test exactly this material.
- source_rank: 2
- proposed_action: Add a bullet on target encoding with out-of-fold encoding, citing Chalk et al. Ch.6 (new prose: for an author).
- applied: false
- fingerprint: fc08fb3032fd
