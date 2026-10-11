---
target: Concepts/Insurer Goals and Constraints.md
created: 2026-10-10
---

## [C-001] Pass incomplete: goal framework unsourced
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- note: Checked: loss ratio indicated-change formula (Werner & Modlin Ch.8, PDF p.157), operating income = underwriting + investment (Rejda Ch.7 p.129), mutuals need surplus (Rejda Ch.5). Examples recomputed (6.85%; 0.312M, 3.0% margin; capacity 120M < 130M). Not verified: the four major goals (profit, customer needs, legal compliance, duty to society) and the internal/external constraint lists - no source read states them (The Institutes' text is not freely available; a secondary study-aid list adds rating agencies and public opinion as external constraints). Left in_review.

## [F-001] U.S. page links Canadian-framed regulation pages
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- severity: minor
- status: open
- locus: Comply with legal requirements bullet
- claim: Links [[Solvency Regulation]], [[Rate Regulation]] and [[Market Conduct Regulation]] for U.S. regulatory oversight.
- evidence: Solvency Regulation opens with OSFI's federal mandate; Rate Regulation and Market Conduct Regulation are framed around Canada and the provinces (followups note D2 created U.S. pages, e.g. State Market Conduct Regulation, State and Federal Insurance Regulation).
- source_rank: 4
- proposed_action: Relink to the U.S. regulation pages.
- applied: false
- fingerprint: 361043d21796

## [C-002] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- status_set: in_review
- checks_run: every definition, list, rule and attribution checked against the sources listed; every worked example recomputed; all [[links]] resolve; U.S. framing reviewed
- sources_checked: Werner & Modlin, Basic Ratemaking, 5th ed. (CAS 2016), Ch.8 (PDF p.157) loss ratio method, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.7 p.129 (PDF p.148), sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0
- note: Left in_review: goal and constraint framework unsourced (see comment).

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Per lead decision: [[Rate Regulation]] -> [[State Rating Laws]], [[Market Conduct Regulation]] -> [[State Market Conduct Regulation]], [[Solvency Regulation]] link dropped.

## [C-003] Framework still unsourced after clean-up
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- note: Searched the open Baranoff/Brockett/Kahane text (Saylor) table of contents and its insurer-operations, insurer-types and regulation sections (s10-04, s11-01, s11-02, s12-02): none states insurer goals or internal/external constraints. Rejda 12th ed. has no such section either. The four-goal framework is The Institutes' and cannot be sourced from what is readable; restating the page to a source would mean rewriting it. Stays in_review pending a maintainer decision (obtain the Institutes text or rewrite).

## [C-004] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- status_set: in_review
- checks_run: re-check after this run's authorized edits: every changed sentence checked against the sources listed; links resolve; earlier checks of unchanged content carried forward
- sources_checked: Werner & Modlin, Basic Ratemaking, 5th ed. (CAS 2016), Ch.8 (PDF p.157), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.7 p.129, sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0; Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), table of contents, chapters 4-12, sha256:b9329afa59c3f4ccbe1d34f742ce4d05b9557a8e95bcbf473b10fcd23a7a6d48 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/index.html
- note: Left in_review: goal/constraint framework unsourced (see comment).

## [F-002] U.S. page links the Canadian-framed Solvency page
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/dv14a
- date: 2026-10-11
- severity: minor
- status: open
- locus: lead, second sentence ([[Solvency|solvent]])
- claim: The lead links [[Solvency|solvent]] for a U.S. insurer's duty to stay solvent.
- evidence: Concepts/Solvency.md is framed on Canada: its formula is the MCT ratio, its tools are MCT, FCT and ORSA, and it cites PACICC and OSFI's mandate. docs/cas-publication-plan.md §3.5 rule 5 says U.S. DISC pages drop or retarget Canadian-framed links (Solvency Regulation was already dropped from this page for that reason, F-001). The page's own solvency claim is sourced to BBK §8.2, not to that page.
- source_rank: 4
- proposed_action: Drop the link and keep the word 'solvent'.
- applied: false
- fingerprint: 7387e16e8cd1

## [C-005] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/dv14a
- date: 2026-10-11
- status_set: in_review
- checks_run: D6 rewrite checked sentence by sentence against sources fetched this run (hashes match the writer's notes for BBK and W&M; IRMI pages re-fetched, new hashes): lead, three formulas (W&M p.5 two sources of profit; p.145 indicated change rendered and read; IRMI Kenney 2:1/3:1), each bullet, both examples recomputed from scratch (0.78/0.73-1=6.85%; 10.4-7.2-0.6-2.288=0.312, 3.0%; 3x40M=120M, 130M/3=43.33M), tip and traps; links resolved and checked for country framing
- sources_checked: Baranoff, Brockett & Kahane, Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012, CC BY-NC-SA), §6.4 Types of Insurance and Insurers (Stock Insurers; Mutual Insurers), sha256:627a6ed1d0a36f68e681bdcc3a027f60fd8537b741d67e2cbdea3d41eb76005d — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s10-04-types-of-insurance-and-insurer.html; Baranoff, Brockett & Kahane, Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012, CC BY-NC-SA), §7.2 Insurance Operations: Actuarial and Investment (investment paragraph: two businesses; assets cover reserves and leave adequate capital and surplus), sha256:0064ff8c9ff68c89296f1a67346ed0a2468f58d808fd560b9d5ad468da9db501 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s11-02-insurance-operations-actuarial.html; Baranoff, Brockett & Kahane, Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012, CC BY-NC-SA), §7.3 Reinsurance, Legal and Regulatory Issues, Claims, and Management (Benefits of Reinsurance: capacity, rapidly expanding company, reinsurer's knowledge of rates and underwriting), sha256:85078f2f0eb5eeae7a77d336f6f5ff14be25519272bfc27d528e037c21424877 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s11-03-insurance-operations-reinsuran.html; Baranoff, Brockett & Kahane, Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012, CC BY-NC-SA), §8.1 Insurance Market Conditions (soft/hard markets, capacity, cash flow underwriting, break-even combined ratios by line, box on the 2008-2009 recession), sha256:7e7830b39c5a0cd17f75dbfeb2f0d2abe4e422df2b92c3f0218097ca48411d3d — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s12-01-insurance-market-conditions.html; Baranoff, Brockett & Kahane, Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012, CC BY-NC-SA), §8.2 Insurance Regulation (objective of solvency; Table 8.4; commissioner's powers incl. grant all, part or none of a rate request; licensing capital and surplus; solvency regulations, investments, RBC, reserves; prior approval and file-and-use; trade practices), sha256:d6b9f53c3fd3c106c652f9ef8b46b21ee9199f1fda6e8951f64e4cf4b09bb021 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s12-02-insurance-regulation.html; Werner & Modlin, Basic Ratemaking, 5th ed. (CAS 2016), Ch.1 pp.5, 11 (PDF pp.17, 23); Ch.8 p.145 (PDF p.157); Ch.13 pp.239-246 (PDF pp.251-258), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; IRMI Glossary, 'capacity', sha256:3415704b5ee0c824b7783afa78c17c89f84b733510356e74abb572b9a7cd9e6b — https://www.irmi.com/term/insurance-definitions/capacity; IRMI Glossary, 'Kenney ratio', sha256:29601c36922c9186f07f0fc8e5af26ab649858629e0be5e67c2485d666080cc0 — https://www.irmi.com/term/insurance-definitions/kenney-ratio
- note: All content claims are stated by a source read this run; one minor finding (Canadian-framed Solvency link) left for the clean-up run.
