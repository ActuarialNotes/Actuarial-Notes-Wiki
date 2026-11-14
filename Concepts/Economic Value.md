---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:864abe14bd8581009c40f205094d900d65ae97960ca5cb376281477fc40b1ec1
  sources:
    - "Goldfarb, Risk-Adjusted Performance Measurement for P&C Insurers (CAS study note, rev. Oct 2010), pp.3-5, 9-11, 31-44, sha256:b0ee2f3239c7f53d07401d4c56828d9a1129d5c1f7b660603d811a50019d7b8e — https://www.casact.org/sites/default/files/database/studynotes_goldfarb8.2.pdf"
    - "Robbin, IRR, ROE, and PVI/PVE (CAS Forum Winter 2007), pp.189-191, 201-206, 227-229 (PDF pp.1-3, 13-18, 39-41), sha256:151252827511805261ec416c1454571361957b728d9fcce961f15c7fab268e7c — https://casact.org/sites/default/files/database/forum_07wforum_07w195.pdf"
    - "Ward & Lee, Practical Application of the Risk-Adjusted Return on Capital Framework (CAS Forum 2002), pp.113, 120-125 (PDF pp.35, 42-47), sha256:8fba670b85d32b9ddcb5477e4dde607564737f24c7b39489347ec575b247ff4d — https://www.casact.org/sites/default/files/database/forum_02sforum_02sf079.pdf"
    - "CIA Educational Note, Comparison of IFRS 17 to current CIA standards (June 2022), p.26, §8.2.1 bottom-up approach (illiquidity premium), sha256:dad0c798ecf3320c7887ed8bdb2820811617951a5c94c1ede6b05da9706560db — https://www.casact.org/sites/default/files/2023-05/6C_CIA_Educatitional_Note_Comparision_of_IFRS_17_to_CurrentCIA.pdf"
    - "Major & Mildenhall, Pricing and Capital Allocation for Multiline Insurance Firms With Finite Assets in an Imperfect Market (arXiv:2008.12427v1, 2020), pp.1-9 (notation p.5-6), 18-24 (eqs 18-25), sha256:a68e6551421c0861f18fdaebef82591dd173af6a781c66f6b2758a809994cca4 — https://arxiv.org/pdf/2008.12427v1"
    - "CAS Exam 9 Practice Items and Solutions (2026; retired Spring 2026 items), Items 3 (M&M 11.3: cost of capital i = [g(s)-s]/[1-g(s)], g(s) = (s+i)/(1+i), LR = s/g(s)) and 4 (M&M pp.317-318: Shapley allocation), sha256:9cf61c6c2597a9a1a6d2d548d83f78a1a56e73778226176ab30308aa85f615fb — https://www.casact.org/sites/default/files/2026-08/Exam9_PracticeItems_2026.xlsx"
    - "CAS Exam 9 Content Outline, Fall 2026, pp.4-5, 7 (Domains B and C; text references), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Index excerpt, pp.523-546, sha256:4e7a560b390d357308ca1274a4c35f13e03d3d7c36555455dd25125f675f3517 — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-10.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Economic Value.md
---

The **Economic Value** of a set of insurance cash flows is their expected value at one date, normally policy inception, after discounting each flow for the [[Time Value of Money|time value of money]] and, where it is risky, for its risk. A policy creates value for its owners when the present value of what it brings in exceeds the present value of everything it commits them to, including a fair return on the capital it ties up.

The economic value at inception is

> $$V_0 = \sum_{t} \frac{E[CF_t]}{(1 + r)^{t}}$$

- $CF_t$ is the net [[Cash Flow|cash flow]] at time $t$: premium in; commissions, expenses, claims, LAE and taxes out.
- $r$ is a discount rate suited to the flow.

Claim payments are often discounted at a risk-free rate, since for many lines indemnity losses carry little systematic risk, and their risk is priced separately through a [[Risk Loads|risk load]]. IFRS 17's bottom-up approach adds an illiquidity premium to the risk-free rate ([[IFRS 17 Discount Rates]]).

[[Underwriting Profit]] ignores timing. A long-tail line can create value at a [[Combined Ratio|combined ratio]] above 100% if investment income on its reserves is large enough. A short-tail line can destroy value below 100% if it holds much capital for a thin margin.

> [!example]- How does this policy's nominal underwriting profit compare with the present value of its cash flows? {Example}
> A policy's premium of $100$ is collected at inception, where expenses of $25$ are paid. Losses of $72$ are paid $30\%$, $40\%$ and $30\%$ at the ends of years 1, 2 and 3. The risk-free rate is $4\%$.
>
> > [!answer]-
> > - The nominal underwriting profit is $100 - 25 - 72 = 3.00$.
> > - The discount factor for the loss payments is $0.30/1.04 + 0.40/1.04^2 + 0.30/1.04^3 = 0.9250$.
> > - The present value of the losses is $72 \times 0.9250 = 66.60$.
> > - The present value of the cash flows is $V_0 = 100 - 25 - 66.60 = 8.40$, nearly three times the accounting profit.
> > - The difference, $5.40$, is the investment income earned on the premium before the claims are paid.

## The policy view and the owners' view

The *policy* view values premium less expenses less losses, all in [[Present Value|present value]], and compares the result with the margin the capital requires. The *owners'* view values the equity flows, capital paid in at inception and released as the liabilities run off, at the [[Cost of Capital|cost of capital]]. It gives a [[Net Present Value|net present value]], or an internal rate of return to compare with a hurdle rate. The two views are equivalent.

> [!example]- Does this policy create value for its owners? {Example}
> Premium of $100$ is received at inception and expenses of $20$ are paid then. A single loss payment of $75$ is made at the end of year 2. Owners contribute capital of $50$ at inception. All funds are invested at the risk-free rate of $4\%$ until the loss is paid, when everything left is released to the owners. Their cost of capital is $12\%$. Ignore tax.
>
> > [!answer]-
> > - The funds invested at the start are $100 - 20 + 50 = 130$.
> > - After two years they are $130 \times 1.04^2 = 140.61$, and $140.61 - 75 = 65.61$ is released to the owners.
> > - The NPV at the cost of capital is $-50 + 65.61/1.12^2 = 2.30$.
> > - The internal rate of return is $\sqrt{65.61/50} - 1 = 14.55\%$.
> > - The owners earn $14.55\%$ a year against a $12\%$ hurdle, so the policy adds $2.30$ of value at inception.

Timing decides value as well as size. Were the same loss paid at the end of year 4, the release would be $130 \times 1.04^4 - 75 = 77.08$ and the NPV $-50 + 77.08/1.12^4 = -1.01$. Two more years of investment income do not pay for two more years of capital that earns $4\%$ but costs $12\%$.

Mildenhall and Major's one-period pricing model collects premium at the start and pays losses at the end, with the risk-free rate set to zero and expenses excluded, so investment income and expenses are dealt with outside it.

## Economic value added

**Economic value added** is the margin actually earned less the cost of the capital it uses. With $k$ the hurdle [[Cost of Capital|cost of capital]], it is

> $$\text{EVA} = M - k\,Q$$

- $M$ is the margin earned, the [[Insurance Margin|insurance margin]].
- $Q$ is the capital the policy or line uses.

It is positive only when the return actually earned, $\iota = M/Q$, beats $k$ ([[Return on Capital]]).

> [!example]- A line earns a margin of $8$ on capital of $50$, and the cost of capital is $12\%$. What is its economic value added? {Example}
> - The cost of the capital is $0.12 \times 50 = 6$.
> - The economic value added is $8 - 6 = 2$.
> - The return earned is $8/50 = 16\%$, above the $12\%$ hurdle, so the line adds value.

> [!trap] Treating the present-value margin as profit to the owners
> The first policy's $8.40$ is not yet profit to the owners. The capital that supports the policy for three years must still earn its cost before any value is added.
