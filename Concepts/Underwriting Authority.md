---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d2758857a326014f05f7d20a2b183b8e98ad0152c67cdf2f0540c503b6405ffc
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Underwriting Authority.md
---

**Underwriting Authority** is the scope of decisions a person may make on an insurer's behalf without approval from someone higher up: which classes of business they may accept, up to what values, limits and premiums, on what forms and at what prices. The insurer grants it in layers, to its line underwriters, to senior and home office staff underwriters, and outside the company to producers with binding authority and to managing general agents, and it documents each layer in its underwriting guide. A submission beyond a person's authority must be referred to the next level.

> $$\ell_c(s) = \min\{\,k : s \text{ meets } A_{k,c}\,\}$$

> $$\ell(s) = \max_{c}\ \ell_c(s)$$

- **Symbols:** Levels of authority are numbered $k = 1, 2, \dots$ from the narrowest, such as a producer, to the widest, such as the home office. $A_{k,c}$ is level $k$'s limit on criterion $c$, where a criterion is a class of business, a total insured value, a policy limit, a premium, a loss history or a form. $\ell_c(s)$ is the lowest level whose authority covers submission $s$ on that one criterion, and $\ell(s)$ is the level that must decide it: the highest level that any single criterion demands.
- **Line underwriters:** Line underwriters work on individual accounts. They evaluate submissions, select and price risks, choose coverage terms, support producers and keep files in compliance with regulation. Their authority grows with experience and is stated in an authority letter, often by line of business.
- **Staff underwriters:** Staff underwriters, usually at a regional or home office, manage underwriting results rather than single accounts. They form and revise [[Underwriting Policy|underwriting policy]], write the underwriting guide, review referrals that exceed line authority, conduct underwriting audits and train line staff. The largest or most unusual accounts, and any exception to a prohibited class, are reserved to them.
- **Producers' binding authority:** An agent with binding authority can put coverage in force before the insurer sees the application, within the classes and limits the agency agreement allows. It is common in personal lines and small commercial accounts, where speed matters and the risks are uniform. The insurer can still cancel a bound risk it would not have accepted, but only within the period and on the grounds that state law allows, so the agency contract keeps binding authority narrow ([[Insurance Producer]]).
- **Managing general agents:** A managing general agent (MGA) holds wide delegated authority from one or more insurers. It may underwrite, bind, issue policies, collect premium and sometimes settle claims, usually in a specialty or [[Excess and Surplus Lines|excess and surplus lines]] niche the insurer could not staff itself. The insurer bears the results, so it controls the MGA through the binding agreement, regular reporting and audits.
- **Referral thresholds:** A guide sets thresholds that trigger a referral, such as a total insured value above a level, a class marked as borderline, a large loss in recent years, a nonstandard form or a schedule credit beyond a limit. A referral is not a decline: the higher level may approve the account, approve it on modified terms or decline it.
- **Why authority is layered:** Wider authority speeds service and lowers expense, while narrower authority keeps unusual risks in front of experienced people and keeps the book consistent with the insurer's rates and reinsurance. An account larger than the insurer's [[Treaty Reinsurance|treaty]] capacity has to go to the level that can arrange [[Facultative Reinsurance|facultative reinsurance]], whatever its class.
- **Automated authority:** Rules engines now bind many small accounts with no human review. They are a level of authority like any other: the rules state what may be accepted straight through, and anything outside them is referred to an underwriter.

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
> - **Binding authority is not underwriting freedom:** An agent with binding authority can bind only within the agency contract. Binding a risk outside it exposes the agent to the insurer, and the insurer is still bound to the insured until it cancels within what the law allows.
> - **Line versus staff:** Line underwriters decide individual accounts, and staff underwriters set and police the policy those decisions follow. Describing staff underwriters as the ones who price each submission confuses the two roles.
> - **A referral is not a decline:** Sending an account up a level asks for a decision by someone with wider authority, who may still accept it.
