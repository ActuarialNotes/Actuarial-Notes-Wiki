---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:f371c12ba6bbaec4f8944583d7a1fd8cb5332a061f12b24fd02ea0f78ba03bfd
  sources:
    - "IRMI Glossary, 'line underwriter', entry, sha256:5798e2b8d8b3f666cb25ffe076c1283556d86f27c6dcb33b49929a4152f707b5 — https://www.irmi.com/term/insurance-definitions/line-underwriter"
    - "IRMI Glossary, 'staff underwriter', entry, sha256:b2d2b0aacfead61f6ee5debe5c8f13fdd6475253d2bba76b5ee7a148cf45b632 — https://www.irmi.com/term/insurance-definitions/staff-underwriter"
    - "IRMI Glossary, 'managing general agent (MGA)', entry, sha256:6a995d166456ad5d3628e11e57d8985a68e371bb26fa474f7cdf606b39cd1ce6 — https://www.irmi.com/term/insurance-definitions/managing-general-agent"
    - "NAIC Managing General Agents Act, Model #225, underwriting guidelines, settlement authority, semi-annual on-site review, sha256:207df638926293f00eeb10ff247ce66a6172e1d00317a048b51ad6051cfd386a — https://content.naic.org/sites/default/files/model-law-225.pdf"
    - "Baranoff, Brockett & Kahane, Risk Management for Enterprises and Individuals (Saylor, CC BY-NC-SA), ch. 7 'Insurance Operations' §7.1, §7.1 independent agency system, sha256:ca16a568fa570ed4aade53cffc55f5c3eba724e809d13c0a24a8f1edddeb56f5 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s11-insurance-operations.html"
    - "SOA Exam GIINT Introduction to General Insurance, February 10, 2014, with answers (NAIC-hosted copy), Q11 and Q12 (p.7), answer key p.32: Q11 A, Q12 D, sha256:7e0e508af4eb9322d2b05593cb8c1eca3e43a8838e3ea10fdb51b923bdfde7f3 — https://content.naic.org/sites/default/files/inline-files/committees_c_catf_related_five.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Underwriting Authority.md
---

**Underwriting Authority** is the scope of decisions a person may make on an insurer's behalf without approval from someone higher up: which classes of business they may accept, up to what values, limits and premiums, on what forms and at what prices. The insurer grants it in layers and documents each layer in its underwriting guide. A submission beyond a person's authority must be referred to the next level.

Wider authority speeds service and lowers expense. Narrower authority keeps unusual risks in front of experienced people and keeps the book consistent with the insurer's rates and reinsurance.

## Line and staff underwriters

Line underwriters work on individual accounts. They evaluate, select, price and accept or reject risks within a line, applying the [[Underwriting Guidelines|underwriting guidelines]], loss experience, the risk's characteristics and available capacity, and they review renewals, endorsements and changes in exposure. An application whose limits exceed a line underwriter's binding authority goes to supervisory personnel in the underwriting department for approval.

Staff underwriters, usually at a regional or home office, manage underwriting results rather than single accounts. They form and revise [[Underwriting Policy|underwriting policy]], write the underwriting guide, review referrals that exceed line authority, conduct underwriting audits and train line staff. The largest or most unusual accounts, and any exception to a prohibited class, are reserved to them.

## Producers and managing general agents

Authority also extends outside the company. An independent agent with binding authority, using the insurer's forms, can bind the insurer, sends the underwriting information to it, and later delivers the policy ([[Insurance Producer]]).

A managing general agent (MGA) holds wide delegated authority from one or more insurers. It may underwrite, bind, issue policies, collect premium and sometimes settle claims, usually in a specialty or [[Excess and Surplus Lines|excess and surplus lines]] niche the insurer could not staff itself. The insurer bears the results, so it controls the MGA through the binding agreement, regular reporting and audits.

## Referral to a higher level

A guide sets thresholds that trigger a referral, such as a total insured value above a level, a class marked as borderline, a large loss in recent years, a nonstandard form or a schedule credit beyond a limit. A borderline class is one the guide lets only some levels accept. A submission within a person's authority on every criterion is decided at that level.

Each criterion is a separate limit, and a submission must meet all of them. To route a submission:

1. For each criterion, find the lowest level whose authority covers the submission.
2. Send the submission to the highest of those levels.

A referral is not a decline. The higher level may approve the account, approve it on modified terms or decline it. An account larger than the insurer's [[Treaty Reinsurance|treaty]] capacity has to go to the level that can arrange [[Facultative Reinsurance|facultative reinsurance]], whatever its class.

> [!example]- Which level must decide each of these four submissions? {Example}
> An insurer's commercial property guide grants this illustrative authority:
>
> | Level | Classes | Total insured value (TIV) | Loss history |
> | :--- | :--- | :--- | :--- |
> | 1, producer | Approved | Up to \$2,000,000 | No single loss over \$25,000 in the past three years |
> | 2, line underwriter | Approved | Up to \$10,000,000 | Any |
> | 3, senior underwriter | Approved and borderline | Up to \$25,000,000, the limit of the surplus share treaty | Any |
> | 4, home office | Anything larger, exceptions to prohibited classes, and any account needing facultative reinsurance | | |
>
> The submissions are:
>
> | Submission | Class | TIV | Losses |
> | :--- | :--- | ---: | :--- |
> | A, dental office | Approved | \$1,200,000 | None |
> | B, dental office | Approved | \$1,500,000 | \$60,000 water damage last year |
> | C, furniture manufacturer | Borderline | \$6,000,000 | None |
> | D, distribution warehouse | Approved | \$32,000,000 | None |
>
> > [!answer]-
> > - Each criterion gives the lowest level that can handle it, and the account goes to the highest of those. The levels below are for class, TIV and loss history, in that order.
> > - A needs levels 1, 1 and 1, so the producer binds it.
> > - B needs levels 1, 1 and 2. It is small enough for the producer, but the recent loss sends it to a line underwriter.
> > - C needs levels 3, 2 and 1. It is within line authority on value, yet its class is borderline, so a senior underwriter must review it.
> > - D needs levels 1, 4 and 1. It is an ordinary class, but its value exceeds the treaty, so the home office must decide whether to write it with facultative reinsurance.

> [!trap] Routing on value alone
> A small account in a borderline class still needs the authority the class requires. Checking only the value or the premium routes it to too low a level, so test every criterion and take the highest level any one of them demands.
