---
target: Concepts/Insurance Distribution Systems.md
created: 2026-10-10
---

## [F-001] Selection-factor list unsourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- severity: minor
- status: open
- locus: Selection factors bullet
- claim: The insurer weighs the target market, its strengths and producer relationships, the control it wants, cost, and geographic area.
- evidence: Rejda Ch.5 pp.96-98 and Saylor s11-01 describe each system's features (direct response suits uncomplicated products; exclusive agents paid lower commissions; independent agents own the x-date) but give no list of selection factors; DISC-RM 7.f is taught from The Institutes' text, not available.
- source_rank: 3
- proposed_action: Cite a source for the selection factors or trim to what the sources state.
- applied: false
- fingerprint: e1764fe5305e

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: every definition, list, rule and attribution checked against the sources listed; every worked example recomputed; all [[links]] resolve; U.S. framing reviewed
- sources_checked: Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.5 pp.95-99 (PDF pp.114-118): independent agency, exclusive agency, direct writer, direct response, multiple distribution, mass merchandising, expirations, sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0; Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s11-01 x-date ownership; exclusive agents lower commissions, sha256:9abf601a8c7e62c112667b15df20471c0a07e5e32ff1dea40448eec0afdccf7e — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s11-01-insurance-operations-marketing.html; IRMI Glossary, "managing general agent", definition, sha256:6a995d166456ad5d3628e11e57d8985a68e371bb26fa474f7cdf606b39cd1ce6 — https://www.irmi.com/term/insurance-definitions/managing-general-agent
- note: System definitions, expirations, direct writer vs exclusive agency, direct response suited to uncomplicated products, MGA authority (bind, issue, appoint producers) confirmed. Examples recomputed (1,200 vs 954.67; break-even 22,222). Minor finding open on the selection-factor list.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Replaced the selection-factor list with what the sources say: direct response reaches large markets at low acquisition cost and suits uncomplicated products (Rejda Ch.5 p.96); brokers are most significant in commercial lines and handle large corporate accounts (Saylor s11-01; Rejda p.95); exclusive agents get lower commissions, the insurer absorbs some expenses and owns the expirations (Saylor s11-01). Deleted the unsourced 'strategic decision' lead sentence and the tip's 'depends on target market, control, cost and geography' sentence.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: re-check after this run's authorized edits: every changed sentence checked against the sources listed; links resolve; earlier checks of unchanged content carried forward
- sources_checked: Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.5 pp.95-99, sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0; Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s11-01 x-date; exclusive agents lower commissions; brokers in commercial lines, sha256:9abf601a8c7e62c112667b15df20471c0a07e5e32ff1dea40448eec0afdccf7e — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s11-01-insurance-operations-marketing.html; IRMI Glossary, "managing general agent", definition, sha256:6a995d166456ad5d3628e11e57d8985a68e371bb26fa474f7cdf606b39cd1ce6 — https://www.irmi.com/term/insurance-definitions/managing-general-agent
- note: Re-verified after the edit that closed F-001.
