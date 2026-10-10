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
