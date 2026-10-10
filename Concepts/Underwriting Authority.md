---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:bfeff6528469bcd51e53bbde4c79d8b0fb490f21b1788b82c70e33512d92a65a
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

**Underwriting Authority** is the scope of decisions a person may make on an insurer's behalf without approval from someone higher up: which classes of business they may accept, up to what values, limits and premiums, on what forms and at what prices. The insurer grants it in layers, to its line underwriters, to senior and home office staff underwriters, and outside the company to producers with binding authority and to managing general agents, and it documents each layer in its underwriting guide. A submission beyond a person's authority must be referred to the next level.

> $$\ell_c(s) = \min\{\,k : s \text{ meets } A_{k,c}\,\}$$

> $$\ell(s) = \max_{c}\ \ell_c(s)$$

- **Symbols:** Levels of authority are numbered $k = 1, 2, \dots$ from the narrowest, such as a producer, to the widest, such as the home office. $A_{k,c}$ is level $k$'s limit on criterion $c$, where a criterion is a class of business, a total insured value, a policy limit, a premium, a loss history or a form. $\ell_c(s)$ is the lowest level whose authority covers submission $s$ on that one criterion, and $\ell(s)$ is the level that must decide it: the highest level that any single criterion demands.
- **Line underwriters:** Line underwriters work on individual accounts. They evaluate, select, price and accept or reject risks within a line, applying the underwriting guidelines, loss experience, the risk's characteristics and available capacity, and they review renewals, endorsements and changes in exposure. An application whose limits exceed a line underwriter's binding authority goes to supervisory personnel in the underwriting department for approval.
- **Staff underwriters:** Staff underwriters, usually at a regional or home office, manage underwriting results rather than single accounts. They form and revise [[Underwriting Policy|underwriting policy]], write the underwriting guide, review referrals that exceed line authority, conduct underwriting audits and train line staff. The largest or most unusual accounts, and any exception to a prohibited class, are reserved to them.
- **Producers' binding authority:** An independent agent, using the insurer's forms, can bind the insurer, sends the underwriting information to it, and later delivers the policy ([[Insurance Producer]]).
- **Managing general agents:** A managing general agent (MGA) holds wide delegated authority from one or more insurers. It may underwrite, bind, issue policies, collect premium and sometimes settle claims, usually in a specialty or [[Excess and Surplus Lines|excess and surplus lines]] niche the insurer could not staff itself. The insurer bears the results, so it controls the MGA through the binding agreement, regular reporting and audits.
- **Referral thresholds:** A guide sets thresholds that trigger a referral, such as a total insured value above a level, a class marked as borderline, a large loss in recent years, a nonstandard form or a schedule credit beyond a limit. A referral is not a decline: the higher level may approve the account, approve it on modified terms or decline it.
- **Why authority is layered:** Wider authority speeds service and lowers expense, while narrower authority keeps unusual risks in front of experienced people and keeps the book consistent with the insurer's rates and reinsurance. An account larger than the insurer's [[Treaty Reinsurance|treaty]] capacity has to go to the level that can arrange [[Facultative Reinsurance|facultative reinsurance]], whatever its class.

> [!example]- Routing Four Commercial Property Submissions {Example}
> An insurer's commercial property guide grants this illustrative authority:
>
> - **Level 1, producer:** approved classes only, total insured value (TIV) up to \$2,000,000, and no single loss over \$25,000 in the past three years.
> - **Level 2, line underwriter:** approved classes, TIV up to \$10,000,000, any loss history.
> - **Level 3, senior underwriter:** approved and borderline classes, TIV up to \$25,000,000, which is the limit of the insurer's surplus share treaty.
> - **Level 4, home office:** anything larger, exceptions to prohibited classes, and any account needing facultative reinsurance.
>
> Route these submissions: (A) a dental office, an approved class, TIV \$1,200,000, no losses; (B) a second dental office, TIV \$1,500,000, with a \$60,000 water damage loss last year; (C) a furniture manufacturer, a borderline class, TIV \$6,000,000; (D) a distribution warehouse, an approved class, TIV \$32,000,000.
>
> > [!answer]-
> > Each criterion gives the lowest level that can handle it, and the account goes to the highest of those.
> > $$
> > \begin{align*}
> > \ell(A) &= \max(1,\ 1,\ 1) \\
> > &= 1 \\
> > \ell(B) &= \max(1,\ 1,\ 2) \\
> > &= 2 \\
> > \ell(C) &= \max(3,\ 2,\ 1) \\
> > &= 3 \\
> > \ell(D) &= \max(1,\ 4,\ 1) \\
> > &= 4
> > \end{align*}
> > $$
> > The order inside each maximum is class, TIV and loss history. The producer binds A. B is small enough for the producer, but the recent loss sends it to a line underwriter. C is within line authority on value, yet its class is borderline, so a senior underwriter must review it. D is an ordinary class, but its value exceeds the treaty, so the home office must decide whether to write it with facultative reinsurance.

> [!example]- How Much Authority to Delegate {Example}
> A small-business program receives 4,000 submissions a year. When an underwriter reviews one, the review costs \$120 and screens out bad risks whose losses would average \$90 per submission. When producers bind within narrow rules, the review cost is avoided, and the rules alone screen out bad risks worth \$55 per submission. Which approach costs less?
>
> > [!answer]-
> > Compare the total cost per submission, adding the review expense to the expected losses that slip through.
> > $$
> > \begin{align*}
> > \text{Extra loss with binding} &= 90 - 55 \\
> > &= 35 \\
> > \text{Saving from binding} &= 120 - 35 \\
> > &= 85 \\
> > \text{Program saving} &= 85 \times 4{,}000 \\
> > &= 340{,}000
> > \end{align*}
> > $$
> > Delegating saves about \$340,000 a year on these illustrative figures, which is why small, uniform accounts are bound by producers or rules engines. The balance reverses for large or unusual accounts, where one poorly selected risk can cost far more than a review.

> [!tip]- How it appears on the exam
> - **DISC-RM:** Questions ask who holds underwriting authority and why: the roles of line and staff underwriters, what a producer's binding authority allows, how a managing general agent differs from an agent, and how the underwriting guide states the limits. Applied questions describe a submission and ask whether the person handling it may accept it or must refer it, and to whom.

> [!warning]- Exam traps
> - **The strictest criterion decides:** A small account in a borderline class still needs the authority the class requires. Checking only the value or the premium routes it to too low a level.
> - **Line versus staff:** Line underwriters decide individual accounts, and staff underwriters set and police the policy those decisions follow. Describing staff underwriters as the ones who price each submission confuses the two roles.
> - **A referral is not a decline:** Sending an account up a level asks for a decision by someone with wider authority, who may still accept it.
