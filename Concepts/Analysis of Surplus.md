---
aliases:
  - Actual Profit
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:86c9a09a403d50b2dc4bd71f2d959bd0ace120f66534fef37edc25b1ef08071a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Analysis of Surplus.md
---
**Analysis of Surplus** compares the **actual profit** a block of long-term policies produced in a year with the **expected profit** from its [[Profit Vector|profit vector]], and splits the difference into gains by source, such as interest, expenses, mortality and [[Lapse|lapses]]. Each source's gain measures how much the year's experience of that item differed from the assumption, valued at what the difference cost or saved, so the analysis shows which assumptions are holding up and which are not.

> $$\mathrm{Pr}_t = \left({}_{t-1}V + P - E\right)(1+i) - q\,S - p\,{}_tV$$

> $$\begin{aligned} \mathrm{AP}_t = {} & N\left({}_{t-1}V + P - E'\right)(1+i') \\ & - d'\,S - \left(N - d'\right){}_tV \end{aligned}$$

> $$\text{Gain}_t = \mathrm{AP}_t - N\,\mathrm{Pr}_t$$

- **Symbols:** In the notation of Dickson, Hardy & Waters, ${}_{t-1}V$ and ${}_tV$ are the [[Policy Value|policy values]] per policy at the start and end of year $t$, $P$ is the premium, $E$ the expense at the start of the year, $i$ the interest rate, $S$ the sum insured, and $q$ and $p = 1 - q$ the probabilities of death and survival in the year. A prime marks the actual value: $E'$ and $i'$ are the actual expense and earned rate, $N$ is the number of policies in force at the start of the year, and $d'$ the number that died.
- **Expected and actual profit:** $\mathrm{Pr}_t$ is the profit expected per policy in force at the start of the year, on the profit test's assumptions. Multiplying it by $N$ gives the expected profit of the block, and $\mathrm{AP}_t$ is what the block actually produced. When the policy values are gross premium policy values on the same basis as the profit test, the expected profit is zero and all of the actual profit is gain.
- **Gains by source:** Each source is replaced, one at a time and in a stated order, from its expected to its actual value, keeping the sources already replaced at their actual values. For the order interest, expenses, mortality, the gains are $N({}_{t-1}V + P - E)(i' - i)$, $N(E - E')(1 + i')$ and $(Nq - d')(S - {}_tV)$, and the three add up to the total gain.
- **Order matters:** The interest gain depends on how much was invested, and that depends on the expense paid, so the split between interest and expenses changes with the order. Taking expenses first, at the assumed rate, moves the cross term $N(E - E')(i' - i)$ from the expense gain to the interest gain. The total gain does not change, and the order should be stated with the answer.
- **Mortality at the sum at risk:** Each death costs the sum at risk, $S - {}_tV$, rather than $S$, because the policy value held for that life is released. A lapse that pays a cash value $CV$ in place of a policy value costs $CV - {}_tV$, so an extra lapse is a gain when the cash value is below the policy value.
- **Uses:** The analysis explains the year's profit to management, tests whether the [[Profit Testing|profit test]] assumptions should be changed, and supports the distribution of surplus to participating policyholders, who share in favorable interest, expense and mortality experience.

> [!example]- Gains by Interest, Expenses and Mortality {Example}
> An insurer has 1,000 whole life policies of \$100,000 in force at the start of year $t$. The policy value is \$10,000 at the start of the year and \$12,000 at the end, and the annual premium is \$2,500. The profit test assumes an expense of \$100 per policy at the start of the year, interest at 5% and $q = 0.008$. In the year, the expense was \$110 per policy, the insurer earned 4.2%, and 6 policyholders died. Find the expected profit, the actual profit and the gain from each source in the order interest, expenses, mortality.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \mathrm{Pr}_t &= 12{,}400(1.05) - 0.008(100{,}000) - 0.992(12{,}000) \\
> > &= 13{,}020 - 800 - 11{,}904 \\
> > &= 316 \\
> > \mathrm{AP}_t &= 1{,}000(12{,}390)(1.042) - 6(100{,}000) - 994(12{,}000) \\
> > &= 12{,}910{,}380 - 600{,}000 - 11{,}928{,}000 \\
> > &= 382{,}380
> > \end{align*}
> > $$
> > The expected profit is $1{,}000 \times 316 = \$316{,}000$, so the total gain is \$66,380. Interest comes first, at the expected expense, then expenses at the actual rate, then mortality.
> > $$
> > \begin{align*}
> > G^{I} &= 1{,}000(12{,}400)(0.042 - 0.05) \\
> > &= -99{,}200 \\
> > G^{E} &= 1{,}000(100 - 110)(1.042) \\
> > &= -10{,}420 \\
> > G^{M} &= (8 - 6)(100{,}000 - 12{,}000) \\
> > &= 176{,}000
> > \end{align*}
> > $$
> > The three gains add to \$66,380. Two fewer deaths than expected more than made up for the shortfall in interest and the expense overrun. Taking expenses first instead gives $G^{E} = -10{,}500$ and $G^{I} = -99{,}120$, so the \$80 cross term changes sides while the total stays the same.

> [!example]- Gain From Lapses With a Cash Value {Example}
> The same block also allows surrender at the end of the year for a cash value of \$11,000. The profit test assumes that 5% of policies surrender, and 80 policyholders surrendered while 8 died, so mortality, interest and expenses were exactly as assumed. Find the expected profit per policy and the gain from lapses.
>
> > [!answer]-
> > Each surrender pays \$11,000 and releases the \$12,000 policy value, and only the policies that neither die nor surrender need the year-end value.
> > $$
> > \begin{align*}
> > \mathrm{Pr}_t &= 13{,}020 - 800 - 0.05(11{,}000) - 0.942(12{,}000) \\
> > &= 366 \\
> > G^{W} &= (80 - 50)(12{,}000 - 11{,}000) \\
> > &= 30{,}000
> > \end{align*}
> > $$
> > The actual profit is $\$366{,}000 + \$30{,}000 = \$396{,}000$. The extra lapses show as a gain this year because the cash value is below the policy value, but they also remove the future profits those policies would have earned, which the one-year analysis does not show.

> [!tip]- How it appears on the exam
> - **ALTAM profit analysis:** Candidates calculate and interpret expected and actual profit for a policy or a block over one year, given the profit test basis, the policy values and the year's actual interest, expenses, deaths and lapses.
> - **Gains by source:** The question then asks for the gain from each source in a stated order, and sometimes for the effect of reversing the order, or for an explanation of why the same experience gives a different split in another order.
> - **Interpretation:** Written parts ask which assumption the insurer should review, why a gain from lapses can mean lost future profit, or how the analysis would support a dividend to participating policyholders.

> [!warning]- Exam traps
> - **Death costs the sum at risk:** The mortality gain is $(Nq - d')(S - {}_tV)$. Valuing each extra death at $S$ forgets the policy value released and overstates the loss.
> - **The order changes the split:** Following a different order from the one the question states gives different interest and expense gains, even though the total is right. Each later source is valued with the earlier sources at their actual values.
> - **Interest on the right amount:** The interest gain applies to the policy value plus premium less expenses invested at the start of the year, not to the policy value alone. When expenses are taken first, the amount invested uses the actual expense.
> - **Per policy versus the block:** $\mathrm{Pr}_t$ is per policy in force at the start of the year. The expected profit of the block multiplies it by the number then in force, not by the number issued or the number at the end of the year.
