---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:ef7536ff6dccc60f709b31b337f4738cc571d5f3c1038e1b502fdd3c99483bd8
  sources:
    - "Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Chapter 1 excerpt, pp.1-11, sha256:af37057d34a0c9b927fa8d0246eaf121a500e385c6902a8f8db8b08e6a55fe2c — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-5.pdf"
    - "Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Index excerpt, pp.523-546, sha256:4e7a560b390d357308ca1274a4c35f13e03d3d7c36555455dd25125f675f3517 — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-10.pdf"
    - "Major & Mildenhall, Pricing and Capital Allocation for Multiline Insurance Firms With Finite Assets in an Imperfect Market (arXiv:2008.12427v1, 2020), pp.5-6 (notation), 19-24 (eqs 18-25), sha256:a68e6551421c0861f18fdaebef82591dd173af6a781c66f6b2758a809994cca4 — https://arxiv.org/pdf/2008.12427v1"
    - "CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), pp.4-5, 7 (Domains B and C; text references; study-note and errata hyperlinks), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Economic Value.md
---

The **Economic Value** of a set of insurance cash flows is their expected value at one date — normally policy inception — after discounting each flow for the [[Time Value of Money|time value of money]] and, where it is risky, for its risk. A policy creates value for its owners when the present value of what it brings in exceeds the present value of everything it commits them to, including a fair return on the capital it ties up.

> $$V_0 = \sum_{t} \frac{E[CF_t]}{(1 + r)^{t}}$$

- $CF_t$ is the net [[Cash Flow|cash flow]] at time $t$: premium in; commissions, expenses, claims, LAE and taxes out. The discount rate $r$ must suit the flow. Claim payments are normally discounted at a risk-free rate (IFRS 17 adds a liquidity premium — [[IFRS 17 Discount Rates]]), with their risk priced separately through a [[Risk Loads|risk load]]; discounting them at the insurer's riskier portfolio yield would credit the policyholder with investment risk the insurer keeps.
- **Two equivalent views.** The *policy* view values premium less expenses less losses, all in [[Present Value|present value]], and compares the result with the margin the capital requires. The *owners'* view values the equity flows — capital paid in at inception and released as the liabilities run off — at the [[Cost of Capital|cost of capital]], giving a [[Net Present Value|net present value]] or an internal rate of return to compare with a hurdle rate.
- **Nominal profit misleads.** [[Underwriting Profit]] ignores timing: a long-tail line can create value at a [[Combined Ratio|combined ratio]] above 100% if investment income on its reserves is large enough, and a short-tail line can destroy it below 100% if it holds much capital for a thin margin.
- **Economic value added** is the margin actually earned less the margin the capital requires, $M - \iota\, Q$ in Mildenhall and Major's notation; it is positive only when pricing beats the cost of capital ([[Insurance Margin]], [[Return on Capital]]).
- Mildenhall and Major's one-period pricing framework sets investment income aside by working with present-value losses, so its premium, loss, margin, capital and assets are all discounted amounts. See [[Insurance Cash Flows]] for the flows themselves and [[Loss Reserve Discounting]] for their reserving counterpart.

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
