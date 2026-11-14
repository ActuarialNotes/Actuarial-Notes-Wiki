---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:6e557074a07e9fa7d68ae2915a288bb957d620067d80609e8d669515cf051611
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

An **Insurance Cash Flow** is an amount of money moving into or out of an insurance contract at a given time: premium in, commissions and other expenses out mostly at the start, claim and LAE payments out over the settlement period, reinsurance premiums and recoveries, taxes, and investment income on the funds held in between. From the owners' side, insurance cash flows also include the capital committed at inception and released as the liabilities run off.

The present value of a line's expected losses $L$, nominal and undiscounted, is

> $$\text{PV(losses)} = L \sum_{t} p_t\, v^{t}$$

- $p_t$ is the payout pattern, the share of $L$ paid at time $t$, summing to $1$.
- $v = 1/(1+r)$ is the [[Discount Factor|discount factor]] at a risk-free rate $r$.
- The sum $\sum_t p_t v^t$ is the discount factor for the line.

Premium is mostly collected before losses are paid. The gap earns investment income, and its length separates [[Short Tail Insurance|short-tail]] property, paid quickly, from [[Long Tail Lines|long-tail]] liability and workers compensation, paid over many years. The same payout patterns drive [[Loss Reserve Discounting|loss reserve discounting]], asset–liability [[Duration|duration]] matching and the management of [[Interest Rate Risk|interest rate risk]].

> [!example]- What is the present value of losses for each of these two lines? {Example}
> Two lines each have nominal expected losses of $70$ per $100$ of premium. Property pays $90\%$ at the end of year 1 and $10\%$ at the end of year 2. Liability pays $10\%$, $20\%$, $25\%$, $25\%$ and $20\%$ at the ends of years 1 to 5. Discount at $4\%$.
>
> > [!answer]-
> > - The property factor is $0.90/1.04 + 0.10/1.04^2 = 0.9578$.
> > - The property losses are worth $70 \times 0.9578 = 67.05$.
> > - Discounting the liability payments one by one gives $0.0962$, $0.1849$, $0.2222$, $0.2137$ and $0.1644$, so the liability factor is $0.8814$.
> > - The liability losses are worth $70 \times 0.8814 = 61.70$.
> > - The same nominal $70\%$ loss ratio is a $67\%$ discounted loss ratio for property and $62\%$ for liability, whose average payment is made after $3.25$ years rather than $1.1$.

## Premium that funds the discounted losses

When expenses are paid at inception and the margin is measured in present-value terms, the premium $P$ must fund the expenses, the margin and the discounted losses, so

> $$P\,(1 - e - m) = \text{PV(losses)}$$

- $e$ is the expense ratio, paid up front and not discounted.
- $m$ is the margin as a share of premium, in present-value terms.

Measured at time $0$, the line's net profit is $1$ minus the discounted loss ratio minus the expense ratio, times the premium. That is $mP$.

> [!example]- With expenses of 25% of premium paid at inception, what premium does each line above need for a 5% margin in present-value terms? {Example}
> - The premium must cover $1 - e - m = 0.70$ of itself with the discounted losses.
> - A nominal calculation that ignores timing needs $70/0.70 = 100.00$.
> - Property needs $67.05/0.70 = 95.78$.
> - Liability needs $61.70/0.70 = 88.14$.
> - Timing is worth about $4\%$ of premium on property and $12\%$ on liability.

## Capital as a cash flow

Capital must be held from inception until the liability is settled, so a long-tail line pays the [[Cost of Capital|cost of capital]] for more years. The investment-income credit and the longer capital commitment pull in opposite directions, and the [[Economic Value|economic value]] of a line reflects both. In the example above the liability line holds capital for years longer, so its $5\%$ margin is a smaller return per year of capital, and charging the cost of capital for each year recovers part of the apparent discount.

Pricing theory built on a one-period model, as in Mildenhall and Major, collects premium at the start and pays losses at the end, with the risk-free rate set to zero and expenses excluded. The timing of real flows is dealt with outside that model, alongside its [[Insurance Pricing|premium]], [[Insurance Margin|margin]] and capital.
