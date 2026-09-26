---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7d9eda4433a3d79d4cf58a07089d9ba29688c5894c4928a1cd6caba5350175b8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Premium.md
---

**Insurance premium** is what a [[Policyholder|policyholder]] pays an [[Insurer|insurer]] for the coverage an [[Insurance Policy|insurance policy]] gives over its term. In ratemaking it equals the rate per unit of exposure times the number of exposures. Premium is the denominator of the [[Loss Ratio|loss ratio]], so historical premium has to be restated to today's rates and the future average before it is compared with projected losses.

> $$\text{Premium} = \text{Rate} \times \text{Exposure}$$

> $$\text{Projected EP} = \text{EP} \times \text{OLF} \times \text{Trend}$$

- **Not the bond premium.** The [[Premium]] page is Exam FM's bond premium, a price above par. This page is the price of insurance.
- **Four measures.** [[Written Premium|Written]] premium is booked at inception. [[Earned Premium|Earned]] premium ($\text{EP}$) matches the coverage already provided, and [[Unearned Premium|unearned]] premium is what's left. [[In-Force|In-force]] premium is the annual premium of policies in force on a given date. Ratemaking pairs losses with earned premium.
- **Current rate level.** Historical premium was charged at the rates of its time, and [[On-Leveling|on-leveling]] restates it at current rates. [[Extension of Exposures|Extension of exposures]] re-rates every policy at today's rates, which is the most accurate approach but needs policy-level data. The [[Parallelogram Method|parallelogram method]] applies an [[On Level Premium|on-level factor]] to aggregate premium: $\text{OLF}$ is the current rate level divided by the average historical rate level. It assumes policies are written evenly through the year.
- **Premium development.** In some lines the exposure is estimated at inception and audited after expiration (payroll in workers compensation, sales in general liability). There, reported premium keeps changing. A [[Premium Audit|premium audit]] books the difference, and policy-year premium has to be developed to ultimate.
- **Premium trend.** Average premium drifts even when rates are unchanged, as the mix shifts toward higher deductibles, newer cars or higher insured values. [[Premium Trend]] projects that drift to the future policy period. Premium then has to fund [[Pure Premium|losses]], [[Expense Provisions|expenses]] and [[Profit and Contingency Provision|profit]] in the [[Overall Rate Level Indication]].

> [!example]- On-Level Factor by the Parallelogram Method {Example}
> Annual policies are written evenly through the year, and rates rose $10\%$ on July 1, 2023. Calendar-year 2024 earned premium is $\$5{,}000{,}000$.
>
> Find the on-level factor and on-level earned premium for CY 2024.
>
> > [!answer]-
> > Policies written before July 1, 2023 earn a triangle of CY 2024 with both legs one half, so its area is $\tfrac{1}{2} \times 0.5 \times 0.5 = 0.125$ at the old rate level.
> >
> > $$
> > \begin{align*}
> > \text{Average level} &= 0.125(1.00) + 0.875(1.10) \\
> > &= 1.0875 \\[4pt]
> > \text{OLF} &= \frac{1.10}{1.0875} \\
> > &= 1.0115 \\[4pt]
> > \text{On-level EP} &= \$5{,}000{,}000 \times 1.0115 \\
> > &= \$5{,}057{,}471
> > \end{align*}
> > $$
> >
> > Most of 2024's premium was already written at the new rate, so its factor is small. For CY 2023, $87.5\%$ was at the old level, which gives $\text{OLF} = 1.10/1.0125 = 1.0864$.

> [!example]- A Workers Compensation Premium Audit {Example}
> A workers compensation policy is rated at $\$2.00$ per $\$100$ of payroll on an estimated payroll of $\$10{,}000{,}000$. The audit after expiration finds actual payroll of $\$11{,}500{,}000$.
>
> Find the deposit premium, the final premium and the audit adjustment.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Deposit} &= \frac{10{,}000{,}000}{100} \times 2.00 \\
> > &= \$200{,}000 \\[4pt]
> > \text{Final} &= \frac{11{,}500{,}000}{100} \times 2.00 \\
> > &= \$230{,}000
> > \end{align*}
> > $$
> >
> > The audit books $\$30{,}000$ of additional premium ($15\%$) in a period after the policy expired. When payrolls are growing, an unaudited policy year understates premium. Pairing that premium with fully developed losses overstates the loss ratio, so premium development has to be recognized.
