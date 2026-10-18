---
target: Concepts/Credit Risk.md
created: 2026-10-18
---

## [F-001] Senior tranches described as safe only near independence; Coval, Jurek & Stafford's senior CDO tranche is AAA at 0.20 correlation
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/9c55
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 'Correlation is the portfolio risk'
- claim: Senior tranches of pooled credit are safe only while defaults stay close to independent.
- evidence: Coval, Jurek & Stafford's baseline pool has pairwise default correlation 0.20 and its senior tranche is rated AAA (HBS WP 09-060 pp.11-12, Table 2); WP p.15: 'with plausible magnitudes of overcollateralization, 12 percent in our example, the expected payoff on a senior tranche of the original collateralized debt obligation is well protected from large changes in default probabilities and correlations. While its rating might change ...' (Table 3: A+ at ρ=40%, BBB- at 60%). The reading's point is that senior ratings are sensitive to correlation and that re-tranched (CDO²) senior claims are fragile, not that a senior tranche needs near-independence. Coval, Jurek & Stafford, The Economics of Structured Finance, Harvard Business School Working Paper 09-060 (2008, the authors' institution's copy), printed pp.1-28 read in full (PDF pp.1-37) with Tables 1-3, sha256:887b5c53aeb5367b127322c6972a1c41176e96dc613bc52eee296002b971c551 — https://www.hbs.edu/ris/Publication%20Files/09-060.pdf
- source_rank: 2
- proposed_action: Restate to the reading: senior tranche ratings are highly sensitive to default correlation (and CDO² senior claims highly sensitive in value), or delete 'safe only while defaults stay close to independent, and'.
- applied: false
- fingerprint: ec553c4ddda8

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/9c55
- date: 2026-10-18
- status_set: in_review
- checks_run: Exam 9 half against Coval, Jurek & Stafford: expected loss as default likelihood × severity (WP p.9), default correlation and the joint tail (pp.7-10), losses concentrated in bad economic states (pp.18-21); correlation example recomputed (p_DD = p² + ρp(1-p) is the WP footnote 1 definition rearranged; 0.25%, 1.20%, 90.25/9.50/0.25%, 91.2/7.6/1.2%) and expected-loss example recomputed ($75,000 vs $650,000); outline p.5 task C5 wording; wiki links resolve
- sources_checked: Coval, Jurek & Stafford, The Economics of Structured Finance, Harvard Business School Working Paper 09-060 (2008, the authors' institution's copy), printed pp.1-28 read in full (PDF pp.1-37) with Tables 1-3, sha256:887b5c53aeb5367b127322c6972a1c41176e96dc613bc52eee296002b971c551 — https://www.hbs.edu/ris/Publication%20Files/09-060.pdf; CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), p.5 Domain C tasks C1-C7 and pp.7-8 text references, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: Left in_review: shared with SOA CP-341, INV-101 and INV-201, whose readings were not reached; the EAD term, the spread-decomposition claim ('several times larger'), downgrade pricing by spread duration, migration matrices, RBC and MCT charges and the receivables list appear in neither Panning nor Coval, Jurek & Stafford. Open minor F-001 on the senior-tranche sentence. Panning (the other C5 reading) says nothing about credit risk beyond deferring default risk to 'a separate forthcoming paper' (p.6).
