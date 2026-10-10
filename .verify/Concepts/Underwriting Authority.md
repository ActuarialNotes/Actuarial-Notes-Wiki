---
target: Concepts/Underwriting Authority.md
created: 2026-10-10
---

## [F-001] Specific claims about authority practice not found in any source read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- severity: minor
- status: open
- locus: lead bullets 'Line underwriters', 'Producers' binding authority', 'Automated authority'
- claim: Line underwriters' authority 'grows with experience and is stated in an authority letter, often by line of business'; binding authority is 'common in personal lines and small commercial accounts'; an insurer may cancel a bound risk 'only within the period and on the grounds that state law allows'; 'Rules engines now bind many small accounts with no human review.'
- evidence: Read this run: IRMI 'line underwriter' and 'staff underwriter' (roles match the page), IRMI 'managing general agent' and NAIC Model #225 (MGA bullet matches: underwriting guidelines in the contract, settlement authority, semi-annual on-site review), Saylor §7.1 ('the agent binds an insurer'). None of them states the authority-letter practice, where binding authority is common, the state-law cancellation window for a bound risk, or automated binding by rules engines. The claims are plausible but rest on no source read.
- source_rank: 3
- proposed_action: Source each of the four claims (e.g. The Institutes' DISC-RM text or an IRMI article) or delete the ones no source supports.
- applied: false
- fingerprint: a236e2ee4959

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: definition and the four layers against IRMI line/staff underwriter and MGA entries and NAIC Model #225; both examples recomputed blind (routing max over criteria A=1, B=2, C=3, D=4; 90-55=35, 120-35=85, x4,000 = 340,000); links resolved
- sources_checked: IRMI Glossary, 'line underwriter', entry, sha256:5798e2b8d8b3f666cb25ffe076c1283556d86f27c6dcb33b49929a4152f707b5 — https://www.irmi.com/term/insurance-definitions/line-underwriter; IRMI Glossary, 'staff underwriter', entry, sha256:b2d2b0aacfead61f6ee5debe5c8f13fdd6475253d2bba76b5ee7a148cf45b632 — https://www.irmi.com/term/insurance-definitions/staff-underwriter; IRMI Glossary, 'managing general agent (MGA)', entry, sha256:6a995d166456ad5d3628e11e57d8985a68e371bb26fa474f7cdf606b39cd1ce6 — https://www.irmi.com/term/insurance-definitions/managing-general-agent; NAIC Managing General Agents Act, Model #225, §§ on underwriting guidelines, claim settlement authority, semi-annual on-site review, sha256:207df638926293f00eeb10ff247ce66a6172e1d00317a048b51ad6051cfd386a — https://content.naic.org/sites/default/files/model-law-225.pdf; Baranoff, Brockett & Kahane, Risk Management for Enterprises and Individuals (Saylor, CC BY-NC-SA), ch. 7 'Insurance Operations' §7.1, §7.1 independent agency system, sha256:ca16a568fa570ed4aade53cffc55f5c3eba724e809d13c0a24a8f1edddeb56f5 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s11-insurance-operations.html
- note: Core content checks against rank-3 references and the NAIC model act; the examples are labelled illustrative and recompute. Medium: no rank-1/2 source covers underwriting authority itself. F-001 (minor) lists four practice claims no source read supports.
