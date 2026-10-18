---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:6e5a4cd45a3cb77f7e21285a93e0a6255aba84c93015d501ffd9613bfedb91e8
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

The **Economic Value** of a set of insurance cash flows is their expected value at one date — normally policy inception — after discounting each flow for the [[Time Value of Money|time value of money]] and, where it is risky, for its risk. A policy creates value for its owners when the present value of what it brings in exceeds the present value of everything it commits them to, including a fair return on the capital it ties up.

> $$V_0 = \sum_{t} \frac{E[CF_t]}{(1 + r)^{t}}$$

- $CF_t$ is the net [[Cash Flow|cash flow]] at time $t$: premium in; commissions, expenses, claims, LAE and taxes out. The discount rate $r$ must suit the flow. Claim payments are often discounted at a risk-free rate, since for many lines indemnity losses carry little systematic risk (IFRS 17's bottom-up approach adds an illiquidity premium — [[IFRS 17 Discount Rates]]), with their risk priced separately through a [[Risk Loads|risk load]].
- **Two equivalent views.** The *policy* view values premium less expenses less losses, all in [[Present Value|present value]], and compares the result with the margin the capital requires. The *owners'* view values the equity flows — capital paid in at inception and released as the liabilities run off — at the [[Cost of Capital|cost of capital]], giving a [[Net Present Value|net present value]] or an internal rate of return to compare with a hurdle rate.
- **Nominal profit misleads.** [[Underwriting Profit]] ignores timing: a long-tail line can create value at a [[Combined Ratio|combined ratio]] above 100% if investment income on its reserves is large enough, and a short-tail line can destroy it below 100% if it holds much capital for a thin margin.
- **Economic value added** is the margin actually earned less the cost of the capital it uses, $M - k\,Q$ with $k$ the hurdle [[Cost of Capital|cost of capital]]; it is positive only when the return actually earned, $\iota = M/Q$, beats $k$ ([[Insurance Margin]], [[Return on Capital]]).
- Mildenhall and Major's one-period pricing model collects premium at the start and pays losses at the end, with the risk-free rate set to zero and expenses excluded, so investment income and expenses are dealt with outside it. See [[Insurance Cash Flows]] for the flows themselves and [[Loss Reserve Discounting]] for their reserving counterpart.

> [!example]- Nominal Profit Versus Economic Value {Example}
> A policy's premium of $100$ is collected at inception, where expenses of $25$ are paid. Losses of $72$ are paid $30\%$, $40\%$ and $30\%$ at the ends of years 1, 2 and 3. The risk-free rate is $4\%$. Compare the nominal underwriting profit with the present value of the policy's cash flows.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Nominal profit} &= 100 - 25 - 72 \\
> > &= 3.00 \\
> > \text{PV(losses)} &= 72\left(\frac{0.30}{1.04} + \frac{0.40}{1.04^2} + \frac{0.30}{1.04^3}\right) \\
> > &= 72(0.9250) \\
> > &= 66.60 \\
> > V_0 &= 100 - 25 - 66.60 \\
> > &= 8.40
> > \end{align*}
> > $$
> >
> > Waiting to pay the losses is worth $5.40$ — the investment income earned on the premium before claims are paid. The policy's economic value is nearly three times its accounting profit. But $8.40$ is not yet profit to the owners: the capital that supports the policy for three years must still earn its cost, which is the owners' view in the next example.

> [!example]- NPV and IRR to the Owners {Example}
> Premium of $100$ is received at inception and expenses of $20$ are paid then. A single loss payment of $75$ is made at the end of year 2. Owners contribute capital of $50$ at inception, and all funds are invested at the risk-free rate of $4\%$ until the loss is paid, when everything left is released to the owners. Their cost of capital is $12\%$. Ignoring tax, does the policy create value?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Invested at start} &= 100 - 20 + 50 \\
> > &= 130 \\
> > \text{Funds after 2 years} &= 130(1.04)^2 \\
> > &= 140.61 \\
> > \text{Released after 2 years} &= 140.61 - 75 \\
> > &= 65.61 \\
> > \text{NPV} &= -50 + \frac{65.61}{1.12^2} \\
> > &= 2.30 \\
> > \text{IRR} &= \sqrt{65.61/50} - 1 \\
> > &= 14.55\%
> > \end{align*}
> > $$
> >
> > The owners earn $14.55\%$ a year against a $12\%$ hurdle, so the policy adds $2.30$ of value at inception. Were the same loss paid at the end of year 4 instead, the release would be $130(1.04)^4 - 75 = 77.08$ and the NPV $-50 + 77.08/1.12^4 = -1.01$: two more years of investment income do not pay for two more years of capital that earns $4\%$ but costs $12\%$. The timing of the cash flows, not just their size, decides the value.
