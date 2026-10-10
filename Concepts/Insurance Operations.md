---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:8f874b4f19ebe6bc65915bc3c12e40ab84cb9a5df5eff6b450f8a895d4af6530
  sources:
    - "Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.6 pp.104-118; Ch.7 p.129, sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0"
    - "Werner & Modlin, Basic Ratemaking, 5th ed. (CAS 2016), Ch.1; Ch.4-5 (PDF pp.63, 81) premium audits; Ch.8, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Operations.md
---

**Insurance Operations** are the functions through which an [[Insurer|insurer]] finds business, decides what to accept, pays what it promised and manages the money in between. The functional view organizes an insurer by these activities rather than by its departments: the core functions of marketing and distribution, [[Underwriting|underwriting]] and claims, supported by [[Risk Control|risk control]], [[Premium Audit|premium auditing]], actuarial, [[Reinsurance|reinsurance]] and investments, and by support functions such as information technology, accounting, legal and compliance, and human resources. Each function's results show up somewhere in the insurer's profit identity.

> $$\text{Pre-tax income} = \text{UW profit} + \text{Investment income}$$

> $$\text{UW profit} = \text{EP} - \text{Losses} - \text{LAE} - \text{UW expenses}$$

> $$\text{CR} = \frac{\text{Losses} + \text{LAE}}{\text{EP}} + \frac{\text{UW expenses}}{\text{WP}}$$

- **Symbols:** EP and WP are [[Earned Premium|earned]] and [[Written Premium|written premium]], LAE is loss adjustment expense, and CR is the trade-basis [[Combined Ratio|combined ratio]]. [[Underwriting Profit|Underwriting profit]] is the insurance operation's own result, and investment income on the funds held between collecting premium and paying claims is added to it. Subtracting the investment income ratio from the combined ratio gives the operating ratio.
- **Marketing and distribution:** This function decides which customers and markets the insurer serves and reaches them through [[Insurance Producer|producers]] or directly. Its main cost, commission, sits in the expense ratio, and the business it brings in sets the premium every other ratio is measured against.
- **Underwriting:** Underwriters select and classify the accounts offered so that the business written matches the assumptions in the rates. Their selection decisions show up most directly in the [[Loss Ratio|loss ratio]], because a book of accounts worse than the rates assume produces losses the premium can't cover.
- **Claims:** [[Claims Handling|Claims handling]] keeps the insurer's promise by investigating and paying covered losses, and it controls what the losses and LAE cost. Paying too little breaks the promise and exposes the insurer to regulators and courts, while paying too much erodes profit.
- **Risk control and premium auditing:** Risk control representatives inspect accounts and recommend loss-reducing measures, which lowers expected losses. Premium auditors verify exposures after the policy period on auditable lines, so that the premium collected matches the exposure actually insured.
- **Actuarial, reinsurance and investments:** Actuaries set rates and reserves, measure results and support planning, so their estimates determine both the price and the losses reported. Reinsurance transfers part of the risk and frees capacity to write more business. The investment function manages the assets that back reserves and surplus and earns the investment income in the profit identity.
- **How the functions cooperate:** Loss-control specialists provide services such as advice on sprinklers, alarms and fire prevention, and they also assist underwriters with information about the accounts they inspect.
- **Goals and conflicts:** The functions share the insurer's goals of earning a profit and meeting customers' needs, but they can pull in different directions. Marketing wants more accounts accepted, underwriting wants the right ones, and claims wants fair settlements while the insurer wants losses kept in check, so the results are only good when the functions work together.

> [!example]- Tracing Each Function to the Income Statement {Example}
> An insurer reports the following for one year (\$ millions): earned premium \$500, written premium \$520, incurred losses \$300, allocated LAE \$30, unallocated LAE \$25, commissions \$78, other underwriting expenses \$62 (underwriting, risk control, premium audit, actuarial and support costs) and investment income \$45. Find the combined ratio, the operating ratio and pre-tax operating income, and say which function each line belongs to.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \frac{\text{Losses} + \text{LAE}}{\text{EP}} &= \frac{300 + 30 + 25}{500} \\
> > &= 71.0\% \\
> > \frac{\text{UW exp}}{\text{WP}} &= \frac{78 + 62}{520} \\
> > &= 26.9\% \\
> > \text{CR} &= 71.0\% + 26.9\% \\
> > &= 97.9\% \\
> > \text{Operating ratio} &= 97.9\% - \frac{45}{500} \\
> > &= 88.9\% \\
> > \text{UW profit} &= 500 - 355 - 140 \\
> > &= 5 \\
> > \text{Pre-tax income} &= 5 + 45 \\
> > &= 50
> > \end{align*}
> > $$
> > The losses reflect underwriting's selection and risk control's loss prevention. The LAE is the cost of the claims function, with [[Allocated Loss Adjustment Expense|allocated LAE]] attributable to individual claims and [[Unallocated Loss Adjustment Expenses ULAE|unallocated LAE]] covering the claims department's overhead. Commissions are the cost of distribution, at 15% of written premium here, and the investment function earns nine times the underwriting profit. A combined ratio below 100% means the insurance operation itself made money before any investment income. The trade-basis ratio divides expenses by written premium, so its 2.1-point margin is not the same as the underwriting profit of \$5 million, which is 1% of earned premium.

> [!example]- Risk Control Turns a Decline Into an Acceptance {Example}
> A commercial property account rates to a premium of \$60,000, and the underwriter estimates expected losses of \$45,000. The permissible loss ratio is 65%. A risk control survey recommends repairs to the sprinkler system and better housekeeping, which the risk control representative estimates will cut expected losses by 20%. Should the underwriter accept the account with or without the recommendations?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{ELR}_{\text{before}} &= \frac{45{,}000}{60{,}000} \\
> > &= 75\% \\
> > E[L]_{\text{after}} &= 45{,}000 \times 0.80 \\
> > &= 36{,}000 \\
> > \text{ELR}_{\text{after}} &= \frac{36{,}000}{60{,}000} \\
> > &= 60\%
> > \end{align*}
> > $$
> > At 75% the account is above the 65% [[Permissible Loss Ratio|permissible loss ratio]], and written as it stands it would need a premium of about \$69,231. With the recommendations made a condition of coverage, the expected loss ratio falls to 60% and the account can be written at the rated premium. The producer keeps the account, the underwriter writes it at an adequate price, and the claims department should see fewer losses from it.

> [!tip]- How it appears on the exam
> - **DISC-RM:** Questions ask candidates to describe each insurer function, what it contributes to the insurer's goals, and how it interacts with the others. The risk control section asks how risk control cooperates with marketing and distribution, underwriting, claims and premium auditing, often through a short scenario about one account.
> - **DISC-RM, performance:** The functional view sits next to measuring insurer performance, so a question may ask which function's activity explains a movement in the loss ratio, the expense ratio or the combined ratio.

> [!warning]- Exam traps
> - **Combined ratio is not total profit:** A combined ratio above 100% means an underwriting loss, but investment income can still leave the insurer with an operating profit. The operating ratio, not the combined ratio, includes investment income.
> - **LAE belongs to claims:** Loss adjustment expense, allocated and unallocated, is part of the loss side of the combined ratio, not part of underwriting expenses. Counting it as an underwriting expense moves it to the wrong denominator.
> - **Functions are not departments:** The functional view describes activities, and one person or department can perform several of them. A producer may handle some claims and collect premium, and a small insurer may combine risk control and premium auditing.
> - **Loss control is not only the underwriter's job:** Underwriting, risk control and claims all affect losses. An exam answer that credits only underwriting with the loss ratio misses the cooperation the course stresses.
