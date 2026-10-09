---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:c0bb81b2ef1cb3bedeffc383005447044e449827f0f69d41cc8d5b411b9d42e4
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 7 pp.125-135 (PDF pp.137-147), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 8 p.143 (PDF p.155), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 2 p.31 (PDF p.43), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 9 p.151 (PDF p.163), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Fixed Expenses.md
---

**Fixed Expenses** are underwriting expenses assumed to be the same for each risk regardless of the size of the premium — typically home-office overhead, and per-policy costs such as printing and data entry. They cost roughly the same on a $\$500$ policy as on a $\$5{,}000$ one, so they are recovered as a **dollar amount per exposure**, not as a percentage of premium.

> $$F = \frac{\text{Total Fixed Expenses}}{\text{Exposures (or Policies)}}$$

> $$\text{Rate} = \frac{\text{Pure Premium} + F}{1 - V - Q_T}$$

- $F$ enters the **numerator** of the rate; [[Variable Expenses|variable expenses]] $V$ and the profit provision $Q_T$ enter the **denominator**. This asymmetry is the whole content of the fixed/variable distinction, and it is what makes the rate a flat charge plus a proportional gross-up.
- Loading fixed expenses as a percentage of premium instead — the **all-variable expense method** — undercharges risks with below-average premium and overcharges those above it, so large policies subsidize small ones. For the average risk the two treatments give the same premium, so the overall rate level is unchanged; only its distribution across policy sizes is wrong. The method is still used for products whose expenses are dominated by variable expenses (many commercial lines).
- Expense studies rarely split cleanly. Ideally detailed expense data or activity-based cost studies make the split; otherwise it is generally made judgmentally, with other professionals in the company, as a **fixed percentage** of each category (Werner's example: general expenses $75\%$ fixed). The fixed dollars are then put per exposure either by multiplying the fixed expense ratio by the projected average premium, or by dividing fixed expenses directly by exposures or policy count.
- Because $F$ is a dollar amount, it is expected to rise with inflation. In the premium-based method no trend is needed if average fixed expense and average premium change at the same rate; with a per-exposure figure on a base that does not inflate (car-years, house-years) or per policy, trending is appropriate.
- Companies using the all-variable method may soften its distortion with an **expense constant** — a flat fee on every policy for issuance, auditing and handling expenses that apply uniformly — or with **premium discounts** that reduce the expense loading as policy premium grows, as workers compensation insurers do.

![[Media/Figures/Fixed_Expenses.svg|340]]

> [!example]- Fixed Expense Load in the Rate {Example}
> An insurer has $\$500{,}000$ of fixed expenses and $10{,}000$ earned exposures. The projected pure premium is $\$200$, variable expenses are $20\%$ of premium, and the target underwriting profit provision is $5\%$.
>
> Compute the indicated rate.
>
> > [!answer]-
> > $$\begin{align*}
> > F &= \frac{\$500{,}000}{10{,}000} = \$50 \text{ per exposure} \\[6pt]
> > \text{Rate} &= \frac{\$200 + \$50}{1 - 0.20 - 0.05} \\
> > &= \frac{\$250}{0.75} \\
> > &= \$333.33
> > \end{align*}$$
> >
> > Checking the decomposition of the $\$333.33$:
> >
> > | Component | Amount | Share |
> > |---|---|---|
> > | Losses and LAE | $\$200.00$ | $60.0\%$ |
> > | Fixed expenses | $\$50.00$ | $15.0\%$ |
> > | Variable expenses | $\$66.67$ | $20.0\%$ |
> > | Profit | $\$16.67$ | $5.0\%$ |
> > | **Total** | $\$333.33$ | $100\%$ |
> >
> > The variable expenses and profit come to exactly $25\%$ of the *final* rate, which is why they belong in the denominator — they are a percentage of the answer, not of the input.

> [!example]- The Distortion from Treating Fixed as Variable {Example}
> The same insurer writes two risks: a small one with a pure premium of $\$80$ and a large one with a pure premium of $\$1{,}200$. Compare the correct rates with an all-variable method that loads the fixed expense ratio ($\$50/\$333 = 15\%$) as a percentage.
>
> > [!answer]-
> > **Correct (fixed per exposure):**
> >
> > $$\begin{align*}
> > \text{Small} &= \frac{\$80 + \$50}{0.75} = \$173.33 \\[4pt]
> > \text{Large} &= \frac{\$1{,}200 + \$50}{0.75} = \$1{,}666.67
> > \end{align*}$$
> >
> > **All-variable** ($V + F\% + Q = 0.20 + 0.15 + 0.05 = 0.40$):
> >
> > $$\begin{align*}
> > \text{Small} &= \frac{\$80}{0.60} = \$133.33 \\[4pt]
> > \text{Large} &= \frac{\$1{,}200}{0.60} = \$2{,}000.00
> > \end{align*}$$
> >
> > The all-variable method under-charges the small risk by $23\%$ and over-charges the large one by $20\%$. It implicitly claims that issuing the large policy costs $\$300$ of fixed expense against the small policy's $\$20$ — when both cost about $\$50$.
> >
> > Left in place, this is not merely inequitable. A competitor using the correct split will quote the large risk $\$333$ cheaper and take it, leaving the insurer with the small risks it has been under-pricing.
