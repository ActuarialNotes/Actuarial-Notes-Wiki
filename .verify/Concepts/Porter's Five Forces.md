---
target: Concepts/Porter's Five Forces.md
created: 2026-10-10
---

## [F-001] Barrier-to-entry link lands on a Canadian solvency page
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- severity: minor
- status: open
- locus: Threat of new entrants bullet
- claim: 'the capital that [[Solvency Regulation|solvency regulation]] requires' links Concepts/Solvency Regulation.md.
- evidence: Concepts/Solvency Regulation.md opens 'In Canada it is OSFI's federal mandate'; this page serves DISC-RM, a U.S. course, and the vault has U.S. pages (Concepts/Risk-Based Capital.md).
- source_rank: 4
- proposed_action: Link a U.S. capital page (Risk-Based Capital) or a jurisdiction-neutral one.
- applied: false
- fingerprint: 4d9501f1da5a

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- status_set: in_review
- checks_run: Five forces, profit potential, rivalry drivers (price competition, undifferentiated products, exit barriers, fragmentation), entry barriers (capital, distribution, government policy, switching costs), buyer and supplier power, substitutes vs competitors checked against MSM §3.3; SWOT internal/external and value chain/VRIO as internal tools against PoM §5.2 and MSM §4.5. Recomputed the direct-writer example (45; 130; -50+135=85; 9.0% vs 3.0%).
- note: Left in_review: the 'Factors that aren't forces' bullet, the price/cost profit decomposition and the value-chain-to-P&L framing come from Porter (2008, HBR, paywalled - only the abstract was visible) and Magretta, neither readable this run; the CP-311 tip line could not be checked. One minor finding open (link target). Sources read: Mastering Strategic Management (Saylor), §3.3 'Evaluating the Industry' (five forces), sha256:0236a5741a5c24f68527dbb1e5ece70c2dd5afb9c91ab6a1de346c781f0c2ef0 — https://saylordotorg.github.io/text_mastering-strategic-management/s07-03-evaluating-the-industry.html; Carpenter, Bauer & Erdogan, Principles of Management v1.1 (Saylor, CC BY-NC-SA), §5.2 'Strategic Management in the P-O-L-C Framework': formulation and implementation, corporate vs business strategy, SWOT and SO/ST/WO/WT, value chain, VRIO, PESTEL, sha256:f8b7b28801d9bdb61effb2c7e7ed4269d9bf3831502508d2ddfb0688bcda5890 — https://saylordotorg.github.io/text_principles-of-management-v1.1/s09-02-strategic-management-in-the-p-.html; Mastering Strategic Management (Saylor), §4.5 'SWOT Analysis', sha256:d6752e321fdf92132768a4b85f17be669789b83daac40c4f375c4c2bb549d974 — https://saylordotorg.github.io/text_mastering-strategic-management/s08-05-swot-analysis.html

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Solvency Regulation link dropped; 'solvency regulation' kept as plain words.

## [F-002] Claims from Porter (2008) and Magretta deleted
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- severity: minor
- status: open
- locus: 'Factors that aren't forces' bullet; 'Regulation is not a sixth force' trap; value chain bullet's P&L tracing; CP-311 tip line; lead sentence
- claim: The page said industry growth, technology, government and complements act only through the forces, that regulation is not a sixth force, that tracing value-chain activities to P&L price and cost lines locates a firm's advantage, and gave a CP-311 tip.
- evidence: Porter's 2008 HBR article is paywalled (only the abstract was visible) and no open source read states these claims; MSM §3.3 and §4.3 and PoM §5.2 do not. MSM §4.3 defines the value chain as the path by which products are created and sold, value added at each step, primary and support activities; PoM §5.2 pairs it with VRIO.
- source_rank: 3
- proposed_action: Delete the unconfirmed claims and restate the value chain bullet to MSM §4.3 / PoM §5.2 (done on the lead's authorization).
- applied: true
- fingerprint: e79f8dffd288

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- resolves: F-002
- status: resolved
- note: Applied in this run on the lead's authorization: Delete the unconfirmed claims and restate the value chain bullet to MSM §4.3 / PoM §5.2 (done on the lead's authorization).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Re-verify after the edits: five forces, profit potential, rivalry drivers, entry barriers, buyer and supplier power, substitutes vs competitors against MSM §3.3; value chain against MSM §4.3; VRIO and SWOT against PoM §5.2 and MSM §4.5. The profit identity pi - pibar = (P - Pbar) + (Cbar - C) is algebra; the direct-writer example recomputed (45, 130, 85).
- sources_checked: Mastering Strategic Management (Saylor), §3.3 'Evaluating the Industry' (five forces), sha256:0236a5741a5c24f68527dbb1e5ece70c2dd5afb9c91ab6a1de346c781f0c2ef0 — https://saylordotorg.github.io/text_mastering-strategic-management/s07-03-evaluating-the-industry.html; Mastering Strategic Management (Saylor), §4.3 'Value Chain' (path by which products are created and sold; primary and support activities), sha256:7b083e706d5f6b30874a39c1da896339c8d67137d3817ade97c60ce4708e375f — https://saylordotorg.github.io/text_mastering-strategic-management/s08-03-value-chain.html; Carpenter, Bauer & Erdogan, Principles of Management v1.1 (Saylor, CC BY-NC-SA), §5.2 'Strategic Management in the P-O-L-C Framework': formulation and implementation, corporate vs business strategy, SWOT and SO/ST/WO/WT, value chain, VRIO, PESTEL, sha256:f8b7b28801d9bdb61effb2c7e7ed4269d9bf3831502508d2ddfb0688bcda5890 — https://saylordotorg.github.io/text_principles-of-management-v1.1/s09-02-strategic-management-in-the-p-.html; Mastering Strategic Management (Saylor), §4.5 'SWOT Analysis', sha256:d6752e321fdf92132768a4b85f17be669789b83daac40c4f375c4c2bb549d974 — https://saylordotorg.github.io/text_mastering-strategic-management/s08-05-swot-analysis.html
- note: Medium: open textbooks.
