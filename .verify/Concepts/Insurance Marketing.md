---
target: Concepts/Insurance Marketing.md
created: 2026-10-10
---

## [C-001] Pass incomplete: activity list unconfirmed
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- note: CLV formula and examples recomputed (51.43, 532.35; CPA 800, ~82 per customer, ~41,000). The list of insurer marketing activities is not confirmed by any source read; see finding. Left in_review.

## [F-001] Marketing activity list not found in any source read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- severity: minor
- status: open
- locus: Lead sentence (main marketing activities)
- claim: An insurer's main marketing activities are market research, target marketing, advertising and promotion, customer relationship management and product development.
- evidence: No source read lists these five as insurer marketing activities. A secondary study aid for The Institutes' marketing chapter lists marketing research, market development, marketing information, marketing planning, product development, advertising and promotion, customer and public relations, and sales fulfillment - a different set. DISC-RM 7.c ('Insurer Marketing Activities') is taught from The Institutes' text, not available this run.
- source_rank: 3
- proposed_action: Check the list against The Institutes' Risk Management and Insurance Operations text and align the page.
- applied: false
- fingerprint: 620080fd282e

## [F-002] U.S. marketing page links Canadian-framed market conduct page
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- severity: minor
- status: open
- locus: Constraints bullet
- claim: Links [[Market Conduct Regulation]] for the rules on misrepresentation and unfair discrimination.
- evidence: Market Conduct Regulation is framed around Canada and the provinces; a U.S. page (State Market Conduct Regulation) exists.
- source_rank: 4
- proposed_action: Relink to State Market Conduct Regulation.
- applied: false
- fingerprint: 5444c5d6dfd2

## [C-002] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- status_set: in_review
- checks_run: every definition, list, rule and attribution checked against the sources listed; every worked example recomputed; all [[links]] resolve; U.S. framing reviewed
- note: Left in_review: activity list unconfirmed (see comment and findings).

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- resolves: F-002
- status: resolved
- note: Per lead decision: [[Market Conduct Regulation]] -> [[State Market Conduct Regulation]].

## [C-003] Activity list still unsourced after clean-up
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- note: Baranoff s11-01 covers distribution systems, Internet marketing and mass merchandising but no list of insurer marketing activities; Rejda Ch.6 defines production only. F-001 stays open: the page is built around the unconfirmed five-activity list, so restating it to a source would mean rewriting it. Stays in_review.

## [C-004] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- status_set: in_review
- checks_run: re-check after this run's authorized edits: every changed sentence checked against the sources listed; links resolve; earlier checks of unchanged content carried forward
- sources_checked: Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s11-01 Internet marketing; mass merchandising, sha256:9abf601a8c7e62c112667b15df20471c0a07e5e32ff1dea40448eec0afdccf7e — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s11-01-insurance-operations-marketing.html; Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), table of contents, chapters 4-12, sha256:b9329afa59c3f4ccbe1d34f742ce4d05b9557a8e95bcbf473b10fcd23a7a6d48 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/index.html
- note: Left in_review: F-001 open (see comment).

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/dv14a
- date: 2026-10-11
- resolves: F-001
- status: resolved
- note: Confirmed in this sweep: the five-activity list (market research, target marketing, advertising and promotion, CRM, product development) is no longer on the page (D6 rewrite, commit 149b4c72); every remaining bullet was checked against BBK §7.1, the NAIC Producer Licensing Model Act and the NAIC Unfair Trade Practices Act.

## [F-003] Managerial and group marketing called 'salaried' where the source does not
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/dv14a
- date: 2026-10-11
- severity: nit
- status: open
- locus: Life and health marketing bullet
- claim: 'a managerial system, in which a salaried branch manager runs an office the insurer pays for' and 'Group plans are sold to employers by agents or brokers, sometimes with a salaried group representative.'
- evidence: BBK §7.1 Managerial (Branch Office) System: the branch manager 'is a company employee who is compensated by a combination of salary, bonus, and commissions'; Group and Supplemental: 'An agent may be assisted in this specialized field by a group sales representative' (the group rep is called salaried only in direct negotiations between employers and insurers).
- source_rank: 2
- proposed_action: Restate: 'a branch manager employed by the insurer runs an office the insurer pays for'; 'sometimes assisted by a group sales representative'.
- applied: false
- fingerprint: 1d6202754baa

## [C-005] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/dv14a
- date: 2026-10-11
- status_set: in_review
- checks_run: D6 rewrite checked bullet by bullet against BBK §7.1, PLMA §§3, 5A, 12A, 13, 18 and UTPA §4A, 4B, 4I; both examples recomputed (S1=-250, S3=150; C=5,000) and the disclosure answer checked against §18A(1)-(2); links resolved and checked for country framing
- sources_checked: Baranoff, Brockett & Kahane, Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012, CC BY-NC-SA), §7.1 Insurance Operations: Marketing, Underwriting, and Administration (Marketing intro; Life/Health; General Agency; Managerial; Group and Supplemental; Property/Casualty; Independent Agency; Direct Writers and Exclusive Agents; Brokers; Internet; Mass Merchandising; Service), sha256:9abf601a8c7e62c112667b15df20471c0a07e5e32ff1dea40448eec0afdccf7e — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s11-01-insurance-operations-marketing.html; NAIC Producer Licensing Model Act (MO-218, January 2005), §3, §5A, §12A(5),(7), §13A-D, §18A-D, sha256:5b1eafdc7b1a841a97440f0e1e7c98e30c935855de4add58838c0f76aee37a34 — https://content.naic.org/sites/default/files/model-law-218.pdf; NAIC Unfair Trade Practices Act (MO-880, Spring 2024), §4A(1),(4), §4B, §4I(1) Rebates, sha256:e27f5324468298edb8af55d6166ac73a928c7fcd2571340a51bb342a1bf7367e — https://content.naic.org/sites/default/files/model-law-880.pdf
- note: F-001 resolved (activity list gone). One nit open for the clean-up run.

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/dv14b
- date: 2026-10-11
- resolves: F-003
- status: resolved
- note: Restated to BBK §7.1: 'a branch manager employed by the insurer runs an office the insurer pays for'; 'sometimes assisted by a group sales representative'.

## [C-006] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/dv14b
- date: 2026-10-11
- status_set: verified
- confidence: high
- checks_run: re-check after this run's one authorized edit (Life and health bullet restated to BBK §7.1); every claim checked in sweep run dv14a against BBK §7.1 and the two NAIC model acts read this session
- sources_checked: Baranoff, Brockett & Kahane, Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012, CC BY-NC-SA), §7.1 Insurance Operations: Marketing, Underwriting, and Administration (Marketing intro; Life/Health; General Agency; Managerial; Group and Supplemental; Property/Casualty; Independent Agency; Direct Writers and Exclusive Agents; Brokers; Internet; Mass Merchandising; Service), sha256:9abf601a8c7e62c112667b15df20471c0a07e5e32ff1dea40448eec0afdccf7e — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s11-01-insurance-operations-marketing.html; NAIC Producer Licensing Model Act (MO-218, January 2005), §3, §5A, §12A(5),(7), §13A-D, §18A-D, sha256:5b1eafdc7b1a841a97440f0e1e7c98e30c935855de4add58838c0f76aee37a34 — https://content.naic.org/sites/default/files/model-law-218.pdf; NAIC Unfair Trade Practices Act (MO-880, Spring 2024), §4A(1),(4), §4B, §4I(1) Rebates, sha256:e27f5324468298edb8af55d6166ac73a928c7fcd2571340a51bb342a1bf7367e — https://content.naic.org/sites/default/files/model-law-880.pdf
- note: No finding open. High: the licensing, disclosure and advertising rules are read from the NAIC model acts themselves; the distribution bullets from the open text.
