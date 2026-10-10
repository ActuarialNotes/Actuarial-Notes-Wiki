---
target: Concepts/Risk Control.md
created: 2026-10-10
---

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- status_set: in_review
- checks_run: Recomputed the sprinkler example (dE[L] 0.02x2,000,000-0.02x400,000=32,000; B=29,000; a(20,6%)=11.4699; NPV=82,628; break-even saving 24,796/0.02=1,239,800) and classified the trucking example; risk control techniques checked against IRMI (risk control, loss control, avoidance, loss reduction, duplication, segregation) and Baranoff §4.4 (loss prevention lowers probability, loss reduction severity); insurer engineering/loss control services against Baranoff §7.1; links validated.
- note: Left in_review: the DISC-RM 12.1-12.3 content (the four insurer risk control goals - profit, customer needs, duty to society, legal requirements; the menu of risk control services; cooperation with marketing, underwriting, premium audit and claims; fee-based services) rests on The Institutes' course text, which is sold and could not be read. No public primary or reputable rank-3 source naming the four goals was found (only flashcard sites). Technique bullets and both examples check against the IRMI/Baranoff sources listed in this note: IRMI glossary, 'risk control', sha256:d1e631a123ad2a66372fb3e2404d1aff925e3588718b570ffbb1fb22c3aaeb61 — https://www.irmi.com/term/insurance-definitions/risk-control; IRMI glossary, 'loss control', sha256:7efa96e8a590392c1748da96a17f95a0949fc7f3b2546f8a7e06e0fa84f7a950 — https://www.irmi.com/term/insurance-definitions/loss-control; IRMI glossary, 'avoidance', sha256:4d3e36f99baaea77a2652032aa888207c5eda9ba2e43ccdb8d8ad1839be3faab — https://www.irmi.com/term/insurance-definitions/avoidance; IRMI glossary, 'loss reduction', sha256:d3a175e005f318461e3170d59824f822c1f1c1e516673203347639aeff85e8f6 — https://www.irmi.com/term/insurance-definitions/loss-reduction; IRMI glossary, 'duplication', sha256:93f03ed00654b4f2f5d99f7700def916dfc5569cfc0686d36cd29c75e9d5cce7 — https://www.irmi.com/term/insurance-definitions/duplication; IRMI glossary, 'segregation', sha256:a9234bdba67979e85d524862fc915420d836836e00c8d5ef565d1e7180172f5d — https://www.irmi.com/term/insurance-definitions/segregation; Baranoff, Brockett & Kahane, Risk Management for Enterprises and Individuals (Saylor), §4.4 risk management matrix: loss prevention and loss reduction, sha256:5da3c20b87e2a72ff64a492c44f23e70c966629c990a5dfd9739b0ec09c59eb8 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s08-04-risk-management-alternatives-t.html; Baranoff, Brockett & Kahane, Risk Management for Enterprises and Individuals (Saylor), §7.1, 'engineering and loss control' services, sha256:9abf601a8c7e62c112667b15df20471c0a07e5e32ff1dea40448eec0afdccf7e — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s11-01-insurance-operations-marketing.html

## [F-001] Institutes-only and unsourced claims restated to the sources
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- severity: minor
- status: open
- locus: Insurer risk control goals / services / cooperation bullets; lead; separation and cost-benefit bullets
- claim: The page listed four insurer risk control goals, a menu of risk control services, how risk control cooperates with marketing, premium audit and claims, indirect cost-benefit savings, 'make losses more predictable', and 'the label follows the main effect'.
- evidence: None of these is in a source read this run (The Institutes' text is sold). Baranoff §7.1: some insurers offer engineering and loss control, prevention and reduction where economically feasible, particularly for WC and boiler and machinery, an element in selecting an insurer. National Alliance: underwriters order loss control inspections; policies written subject to compliance with loss control recommendations. UNI handout p.6: insurers unbundle loss control for businesses that retain losses. Baranoff §4.3: cost-benefit compares cost with the present value of reduced losses or premium savings. IRMI 'segregation': reduces high loss severity exposures.
- source_rank: 3
- proposed_action: Delete the unsourced claims and restate the bullets to the sources (done on the lead's authorization).
- applied: true
- fingerprint: 917c48954ba3

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Applied in this run on the lead's authorization: Delete the unsourced claims and restate the bullets to the sources (done on the lead's authorization).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Re-verify after the restatement: definition and techniques against IRMI (risk control, loss control, avoidance, loss reduction, duplication, segregation) and PoM §5.2 (diversification spreads risk); prevention vs reduction against Baranoff §4.4; cost-benefit test and premium savings against Baranoff §4.3; insurer loss control services against Baranoff §7.1, National Alliance and the UNI handout. Sprinkler example recomputed (NPV 82,628; break-even saving about 1,240,000) and the trucking classification consistent with IRMI.
- sources_checked: IRMI glossary, 'risk control', sha256:d1e631a123ad2a66372fb3e2404d1aff925e3588718b570ffbb1fb22c3aaeb61 — https://www.irmi.com/term/insurance-definitions/risk-control; IRMI glossary, 'loss control', sha256:7efa96e8a590392c1748da96a17f95a0949fc7f3b2546f8a7e06e0fa84f7a950 — https://www.irmi.com/term/insurance-definitions/loss-control; IRMI glossary, 'avoidance', sha256:4d3e36f99baaea77a2652032aa888207c5eda9ba2e43ccdb8d8ad1839be3faab — https://www.irmi.com/term/insurance-definitions/avoidance; IRMI glossary, 'loss reduction', sha256:d3a175e005f318461e3170d59824f822c1f1c1e516673203347639aeff85e8f6 — https://www.irmi.com/term/insurance-definitions/loss-reduction; IRMI glossary, 'duplication', sha256:93f03ed00654b4f2f5d99f7700def916dfc5569cfc0686d36cd29c75e9d5cce7 — https://www.irmi.com/term/insurance-definitions/duplication; IRMI glossary, 'segregation', sha256:a9234bdba67979e85d524862fc915420d836836e00c8d5ef565d1e7180172f5d — https://www.irmi.com/term/insurance-definitions/segregation; Baranoff, Brockett & Kahane, Risk Management for Enterprises and Individuals (Saylor), §4.3 cost-benefit analysis of loss control: cost compared with the present value of reduced losses or premium savings, sha256:0365fac76564f49798290d56f0f69dbdf2f25a8b071b72b272e937fbdd34e38e — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s08-03-projected-frequency-and-severi.html; Baranoff, Brockett & Kahane, Risk Management for Enterprises and Individuals (Saylor), §4.4 risk management matrix: loss prevention and loss reduction, sha256:5da3c20b87e2a72ff64a492c44f23e70c966629c990a5dfd9739b0ec09c59eb8 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s08-04-risk-management-alternatives-t.html; Baranoff, Brockett & Kahane, Risk Management for Enterprises and Individuals (Saylor), §7.1, 'engineering and loss control' services, sha256:9abf601a8c7e62c112667b15df20471c0a07e5e32ff1dea40448eec0afdccf7e — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s11-01-insurance-operations-marketing.html; Risk & Insurance Education Alliance, 'Six Steps of the Underwriting Process' (30 Jan 2023): underwriters order loss control inspections; follow-up on loss control recommendations, sha256:ee0156096b5f8c331aae216b138dcade35da2127854d0bee28423df26c0d2ba0 — https://www.riskeducation.org/six-steps-of-the-underwriting-process/; Thompson, Insurance Operations – Claim Procedures and the Claim Adjustment Process (University of Northern Iowa course handout), pp.1–6: two goals of the claim function, users of claim information, regulators and market conduct, centralized/decentralized structure, settlement authority, staff/independent/public adjusters, producers, sha256:5ed85a349071117ddd86bbc495947689c0893f562bc2ada8c6e3db160fd42663 — https://sites.uni.edu/thompsona/Claims%20Settlement.pdf; Carpenter, Bauer & Erdogan, Principles of Management v1.1 (Saylor, CC BY-NC-SA), §5.2 'Strategic Management in the P-O-L-C Framework': formulation and implementation, corporate vs business strategy, SWOT and SO/ST/WO/WT, value chain, VRIO, PESTEL, sha256:f8b7b28801d9bdb61effb2c7e7ed4269d9bf3831502508d2ddfb0688bcda5890 — https://saylordotorg.github.io/text_principles-of-management-v1.1/s09-02-strategic-management-in-the-p-.html
- note: Medium: rank-3 references; the four-goal framework is no longer on the page.
