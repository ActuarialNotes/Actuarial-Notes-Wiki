---
target: Concepts/SWOT Analysis.md
created: 2026-10-10
---

## [F-001] Limits bullet not in the sources
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- severity: minor
- status: open
- locus: Limits bullet
- claim: 'A SWOT is only as good as the honesty of its inputs ... Lists that are long, vague or unranked give little guidance, so a useful SWOT names the few factors that matter most and states the evidence for each.'
- evidence: Mastering Strategic Management §4.5 gives SWOT's limits as: do not confuse internal and external factors; do not confuse opportunities with the moves that exploit them; do not overemphasize the results - SWOT is a brainstorming technique, not a rigorous method for selecting strategies. PoM §5.2 adds nothing on limits. The page's wording appears in neither.
- source_rank: 3
- proposed_action: Replace with the cautions MSM §4.5 gives, or cite a source for the current wording.
- applied: false
- fingerprint: f623ea100140

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Internal (strengths, weaknesses) vs external (opportunities, threats), SO/ST/WO/WT option questions, SWOT as input to formulation, five forces for the external half, value chain/VRIO for the internal half, against PoM §5.2, MSM §1.4 and §4.5. The worked example's placements follow those definitions (a portfolio concentration is internal). 'TOWS matrix' is the established name (Weihrich, Long Range Planning 15(2), 1982 - title confirmed from a library catalogue record, article not read).
- sources_checked: Carpenter, Bauer & Erdogan, Principles of Management v1.1 (Saylor, CC BY-NC-SA), §5.2 'Strategic Management in the P-O-L-C Framework': formulation and implementation, corporate vs business strategy, SWOT and SO/ST/WO/WT, value chain, VRIO, PESTEL, sha256:f8b7b28801d9bdb61effb2c7e7ed4269d9bf3831502508d2ddfb0688bcda5890 — https://saylordotorg.github.io/text_principles-of-management-v1.1/s09-02-strategic-management-in-the-p-.html; Mastering Strategic Management (Saylor), §4.5 'SWOT Analysis', sha256:d6752e321fdf92132768a4b85f17be669789b83daac40c4f375c4c2bb549d974 — https://saylordotorg.github.io/text_mastering-strategic-management/s08-05-swot-analysis.html; Mastering Strategic Management (Saylor 2012, CC BY-NC-SA 3.0), §1.4 'Understanding the Strategic Management Process', sha256:9a18fcba4b6d25aeff350c1e05a8c9beec1482af1500cb9953d940cd88b719b4 — https://saylordotorg.github.io/text_mastering-strategic-management/s05-04-understanding-the-strategic-ma.html
- note: Medium: open textbooks (rank 3). One minor finding open (Limits bullet).

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Limits bullet replaced with MSM §4.5's cautions: don't confuse internal and external factors, don't confuse an opportunity with the move that exploits it, SWOT is a brainstorming starting point rather than a rigorous method for selecting strategies.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Re-verify after the Limits rewrite; the bullet now matches MSM §4.5.
- sources_checked: Carpenter, Bauer & Erdogan, Principles of Management v1.1 (Saylor, CC BY-NC-SA), §5.2 'Strategic Management in the P-O-L-C Framework': formulation and implementation, corporate vs business strategy, SWOT and SO/ST/WO/WT, value chain, VRIO, PESTEL, sha256:f8b7b28801d9bdb61effb2c7e7ed4269d9bf3831502508d2ddfb0688bcda5890 — https://saylordotorg.github.io/text_principles-of-management-v1.1/s09-02-strategic-management-in-the-p-.html; Mastering Strategic Management (Saylor), §4.5 'SWOT Analysis', sha256:d6752e321fdf92132768a4b85f17be669789b83daac40c4f375c4c2bb549d974 — https://saylordotorg.github.io/text_mastering-strategic-management/s08-05-swot-analysis.html; Mastering Strategic Management (Saylor 2012, CC BY-NC-SA 3.0), §1.4 'Understanding the Strategic Management Process', sha256:9a18fcba4b6d25aeff350c1e05a8c9beec1482af1500cb9953d940cd88b719b4 — https://saylordotorg.github.io/text_mastering-strategic-management/s05-04-understanding-the-strategic-ma.html
- note: Medium.
