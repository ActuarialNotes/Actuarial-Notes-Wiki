---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:67ef0aefa912cefdb6a4b2fb6636fcb208d07ef1f4e310c3073d2b7dc29fcf1a
  sources:
    - "Robbin, IRR, ROE, and PVI/PVE (CAS Forum Winter 2007), pp.189-191, 201-206, 227-229 (PDF pp.1-3, 13-18, 39-41), sha256:151252827511805261ec416c1454571361957b728d9fcce961f15c7fab268e7c — https://casact.org/sites/default/files/database/forum_07wforum_07w195.pdf"
    - "Goldfarb, Risk-Adjusted Performance Measurement for P&C Insurers (CAS study note, rev. Oct 2010), pp.3-5, 9-11, 31-44, sha256:b0ee2f3239c7f53d07401d4c56828d9a1129d5c1f7b660603d811a50019d7b8e — https://www.casact.org/sites/default/files/database/studynotes_goldfarb8.2.pdf"
    - "Ward & Lee, Practical Application of the Risk-Adjusted Return on Capital Framework (CAS Forum 2002), pp.113, 120-125 (PDF pp.35, 42-47), sha256:8fba670b85d32b9ddcb5477e4dde607564737f24c7b39489347ec575b247ff4d — https://www.casact.org/sites/default/files/database/forum_02sforum_02sf079.pdf"
    - "Major & Mildenhall, Pricing and Capital Allocation for Multiline Insurance Firms With Finite Assets in an Imperfect Market (arXiv:2008.12427v1, 2020), pp.1-9 (notation p.5-6), 18-24 (eqs 18-25), sha256:a68e6551421c0861f18fdaebef82591dd173af6a781c66f6b2758a809994cca4 — https://arxiv.org/pdf/2008.12427v1"
    - "CAS Exam 9 Content Outline, Fall 2026, pp.4-5, 7 (Domains B and C; text references), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Index excerpt, pp.523-546, sha256:4e7a560b390d357308ca1274a4c35f13e03d3d7c36555455dd25125f675f3517 — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-10.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Cash Flows.md
---

**Insurance Cash Flows** are the amounts and timing of money moving through an insurance contract: premium in, up front or in instalments; commissions and other expenses out, mostly at the start; claim and LAE payments out over the settlement period; reinsurance premiums and recoveries; taxes; and investment income on the funds held in between. From the owners' side they also include the capital committed at inception and released as the liabilities run off.

> $$\text{PV(losses)} = L \sum_{t} p_t\, v^{t}$$

- $L$ is the nominal (undiscounted) expected loss, $p_t$ the **payout pattern** — the share of $L$ paid at time $t$, summing to $1$ — and $v = 1/(1+r)$ the [[Discount Factor|discount factor]] at a risk-free rate $r$. The sum is the **discount factor for the line**.
- Premium is mostly collected before losses are paid. The gap earns investment income, and its length separates [[Short Tail Insurance|short-tail]] property, paid quickly, from [[Long Tail Lines|long-tail]] liability and workers compensation, paid over many years.
- **Capital is a cash flow too.** It must be held from inception until the liability is settled, so a long-tail line pays the [[Cost of Capital|cost of capital]] for more years. The investment-income credit and the longer capital commitment pull in opposite directions, and pricing has to reflect both — see [[Economic Value]].
- The same patterns drive [[Loss Reserve Discounting]], asset–liability [[Duration|duration]] matching and the management of [[Interest Rate Risk]].
- Pricing theory built on a one-period model, as in Mildenhall and Major, collects premium at the start and pays losses at the end, with the risk-free rate set to zero and expenses excluded; the timing of real flows is dealt with outside that model, alongside its [[Insurance Pricing|premium]], [[Insurance Margin|margin]] and capital.

> [!example]- Present Value of Losses: Property Versus Liability {Example}
> Two lines each have nominal expected losses of $70$ per $100$ of premium. Property pays $90\%$ at the end of year 1 and $10\%$ at the end of year 2. Liability pays $10\%$, $20\%$, $25\%$, $25\%$ and $20\%$ at the ends of years 1 to 5. Discount at $4\%$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Property factor} &= \frac{0.90}{1.04} + \frac{0.10}{1.04^2} \\
> > &= 0.9578 \\
> > \text{PV}_{\text{prop}} &= 70(0.9578) \\
> > &= 67.05 \\
> > \text{Liability factor} &= \frac{0.10}{1.04} + \frac{0.20}{1.04^2} + \frac{0.25}{1.04^3} \\
> > &\quad + \frac{0.25}{1.04^4} + \frac{0.20}{1.04^5} \\
> > &= 0.8814 \\
> > \text{PV}_{\text{liab}} &= 70(0.8814) \\
> > &= 61.70
> > \end{align*}
> > $$
> >
> > The same nominal $70\%$ loss ratio is a $67\%$ discounted loss ratio for property and $62\%$ for liability, whose average payment is made after $3.25$ years rather than $1.1$.

> [!example]- Premium Needed for the Same Economic Margin {Example}
> For the two lines above, expenses are $25\%$ of premium, paid at inception, and the insurer wants a margin of $5\%$ of premium in present-value terms. What premium does each line need, compared with a nominal calculation that ignores timing?
>
> > [!answer]-
> > The premium must fund expenses, the margin and the discounted losses, so $P(1 - 0.25 - 0.05) = \text{PV(losses)}$:
> >
> > $$
> > \begin{align*}
> > P_{\text{nominal}} &= \frac{70}{0.70} \\
> > &= 100.00 \\
> > P_{\text{prop}} &= \frac{67.05}{0.70} \\
> > &= 95.78 \\
> > P_{\text{liab}} &= \frac{61.70}{0.70} \\
> > &= 88.14
> > \end{align*}
> > $$
> >
> > Timing is worth about $4\%$ of premium on property and $12\%$ on liability. The liability line holds capital for years longer, though, so the $5\%$ margin is a smaller return per year of capital; a full analysis charges the cost of capital for each year it is held, which recovers part of the apparent discount.
