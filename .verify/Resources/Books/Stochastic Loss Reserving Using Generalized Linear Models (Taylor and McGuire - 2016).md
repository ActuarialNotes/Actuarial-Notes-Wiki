---
target: Resources/Books/Stochastic Loss Reserving Using Generalized Linear Models (Taylor and McGuire - 2016).md
created: 2026-10-11
---

## [F-001] Theorem 3.2's dispersion condition worded ambiguously
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7raa
- date: 2026-10-11
- severity: nit
- status: open
- locus: ## 3 Stochastic Models Supporting the Chain Ladder, 3.2 Cross-Classified Models, second bullet
- claim: In the ODP cross-classified model with one dispersion parameter for every cell, the maximum likelihood fitted values and forecasts equal the chain ladder's (Theorem 3.2, England and Verrall 2002)
- evidence: Taylor and McGuire p. 24 (PDF p. 34), Theorem 3.2 condition (EDFCC3b): 'The dispersion parameters phi_kj are identical for all cells'. 'One dispersion parameter for every cell' can be read as a separate parameter per cell, the opposite of the condition.
- source_rank: 2
- proposed_action: Restate as 'with a single dispersion parameter common to all cells'.
- applied: false
- fingerprint: 5b6aaa33c803

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7raa
- date: 2026-10-11
- status_set: verified
- confidence: high
- checks_run: outline from the printed contents (PDF pp. 4-5) and chapter bookmarks before re-reading; all chapter and section headings 1.1-7.11 incl. 7.7.1-7.7.2, 7.9.1 matched; Chapters 1-6 bullets checked against the text; 373,346, 14,076, CVP 3.8%, 10,275, phi = 114.5, 374,992 and 14,286 against Tables 5-4/5-5 (page images PDF pp. 64-65); Tweedie p<=0 or p>=1 (2-8) on the page image; AIC 2p, BIC p ln n, AICc; 20x20 simulated sets and the four fitted models (Tables 6-1, 6-2); 12 errata against the errata sheet; frontmatter against the copyright page; Exam 7 bullet against the outline (Chapters 1-6, A.iii.4-A.iv.2 = A9-A12, including errata); GI-301 bullet word for word against the SOA GI 301 syllabus p. 2
- sources_checked: Taylor and McGuire, Stochastic Loss Reserving Using Generalized Linear Models, CAS Monograph 3 (2016), abstract, copyright and contents (PDF 2-5), Foreword, Chapters 1-6 pp. 1-75 (PDF 11-85), Chapter 7-8 headings and References (PDF 86-112), sha256:d9ca082d0e8e8c0ed514e5e526cf0372cc457f4b5c94e4ff774cd6fc9e24249a — https://www.casact.org/sites/default/files/2021-03/7_Taylor.pdf; Taylor and McGuire Monograph 3 Errata, p. 1, sha256:596a7aa34f1f5a2160437173ce1b28a2bffea1a6feaa644a83be7c981f6e2e43 — https://www.casact.org/sites/default/files/2021-03/7_Taylor_Errata.pdf; CAS Exam 7 Content Outline, Fall 2026 (v04 2026_9_16), tasks pp. 3-4; text references pp. 5-6, sha256:be1833c4f35a9344e33b1c48336dca9724d6556890997b3d8715f9de709ca5ed — https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf; SOA GI 301 syllabus, Mar 2027/Jul 2027, p. 2, Taylor and McGuire reading, sha256:491e74c9baec0e9f74552e9c589f0738d914c4d340827727b0d78bea4e23d72e — https://www.soa.org/globalassets/assets/files/edu/2026/gi-301/2027-03-gi-301-syllabus.pdf
- note: One nit open (Theorem 3.2's dispersion condition wording), to be fixed in the clean-up round.
