---
aliases:
  - Actual Profit
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2fda1e924ecc5c1a823508cc673827ad1513e19dce9481082b39a6bd069ad859
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Analysis of Surplus.md
---

**Analysis of Surplus** compares the **actual profit** a block of long-term policies produced in a year with the **expected profit** from its [[Profit Vector|profit vector]], and splits the difference into gains by source, such as interest, expenses, mortality and [[Lapse|lapses]]. Each source's gain is the cost or saving of that item's experience differing from the assumption, so the analysis shows which assumptions are holding up.

In the notation of Dickson, Hardy & Waters, the profit expected in year $t$ per policy in force at the start of the year, on the profit test's assumptions, is

> $$\mathrm{Pr}_t = \left({}_{t-1}V + P - E\right)(1+i) - q\,S - p\,{}_tV$$

- ${}_{t-1}V$ and ${}_tV$ are the [[Policy Value|policy values]] per policy at the start and end of the year.
- $P$ is the premium and $E$ the expense at the start of the year.
- $i$ is the interest rate and $S$ the sum insured.
- $q$ and $p = 1 - q$ are the probabilities of death and survival in the year.

Multiplying it by $N$, the number of policies in force at the start of the year, gives the expected profit of the block. The block's actual profit is

> $$\mathrm{AP}_t = N\left({}_{t-1}V + P - E'\right)(1+i') - d'\,S - \left(N - d'\right){}_tV$$

- A prime marks the actual value: $E'$ is the actual expense and $i'$ the rate earned.
- $d'$ is the number of policyholders who died.

The total gain in the year is

> $$\text{Gain}_t = \mathrm{AP}_t - N\,\mathrm{Pr}_t$$

When the policy values are gross premium policy values on the profit test's basis, the expected profit is zero and all of the actual profit is gain.

> [!example]- What are this block's expected profit, actual profit and total gain for the year? {Example}
> An insurer has 1,000 whole life policies of $\$100{,}000$ in force at the start of year $t$. The policy value is $\$10{,}000$ at the start of the year and $\$12{,}000$ at the end, and the annual premium is $\$2{,}500$. The profit test assumes an expense of $\$100$ per policy at the start of the year, interest at 5% and $q = 0.008$. In the year, the expense was $\$110$ per policy, the insurer earned 4.2%, and 6 policyholders died.
>
> > [!answer]-
> > - $\mathrm{Pr}_t = 12{,}400(1.05) - 0.008(100{,}000) - 0.992(12{,}000) = 13{,}020 - 800 - 11{,}904 = 316$.
> > - The expected profit of the block is $1{,}000 \times 316 = \$316{,}000$.
> > - The amount invested per policy is $10{,}000 + 2{,}500 - 110 = 12{,}390$.
> > - $\mathrm{AP}_t = 1{,}000(12{,}390)(1.042) - 6(100{,}000) - 994(12{,}000) = \$382{,}380$.
> > - The total gain is $382{,}380 - 316{,}000 = \$66{,}380$.

## Gains by source

Each source is replaced, one at a time and in a stated order, from its expected to its actual value, keeping the sources already replaced at their actual values. For the order interest, expenses, mortality, the gain from interest is

> $$G^{I} = N\left({}_{t-1}V + P - E\right)(i' - i)$$

the gain from expenses is

> $$G^{E} = N\left(E - E'\right)(1 + i')$$

and the gain from mortality is

> $$G^{M} = \left(Nq - d'\right)\left(S - {}_tV\right)$$

The three add up to the total gain. Each death costs the sum at risk, $S - {}_tV$, because the policy value held for that life is released.

The interest gain depends on how much was invested, and that depends on the expense paid, so the split between interest and expenses changes with the order. Taking expenses first, at the assumed rate, moves the cross term $N(E - E')(i' - i)$ from the expense gain to the interest gain. The total gain does not change, and the order should be stated with the answer.

> [!example]- What is the gain from each source for the block above, in the order interest, expenses, mortality? {Example}
> - $G^{I} = 1{,}000(12{,}400)(0.042 - 0.05) = -\$99{,}200$.
> - $G^{E} = 1{,}000(100 - 110)(1.042) = -\$10{,}420$.
> - $G^{M} = (8 - 6)(100{,}000 - 12{,}000) = \$176{,}000$.
> - The three add to the total gain of $\$66{,}380$. Two fewer deaths than expected more than made up for the shortfall in interest and the expense overrun.
> - Taking expenses first gives $G^{E} = 1{,}000(-10)(1.05) = -\$10{,}500$ and $G^{I} = 1{,}000(12{,}390)(-0.008) = -\$99{,}120$. The $\$80$ cross term changes sides and the total stays the same.

## Gain from lapses

A lapse that pays a cash value $CV$ in place of the policy value costs $CV - {}_tV$. An extra lapse is therefore a gain this year when the cash value is below the policy value. It also removes the future profits that policy would have earned, which the one-year analysis does not show.

> [!example]- What are this block's expected profit per policy and its gain from lapses? {Example}
> The block above also allows surrender at the end of the year for a cash value of $\$11{,}000$. The profit test assumes that 5% of policies surrender. In the year, 80 policyholders surrendered and 8 died, and mortality, interest and expenses were exactly as assumed.
>
> > [!answer]-
> > - Only the policies that neither die nor surrender need the year-end policy value, so $\mathrm{Pr}_t = 13{,}020 - 800 - 0.05(11{,}000) - 0.942(12{,}000) = 366$.
> > - Each surrender pays $\$11{,}000$ and releases the $\$12{,}000$ policy value.
> > - There were 30 more surrenders than the 50 expected, so the gain from lapses is $(80 - 50)(12{,}000 - 11{,}000) = \$30{,}000$.
> > - The actual profit is $\$366{,}000 + \$30{,}000 = \$396{,}000$.

## Uses

The analysis explains the year's profit to management and tests whether the [[Profit Testing|profit test]] assumptions should be changed. It also supports the distribution of surplus to participating policyholders, who share in favorable interest, expense and mortality experience.

> [!trap] Valuing a death at the sum insured
> The mortality gain is $(Nq - d')(S - {}_tV)$. Valuing each extra death at $S$ forgets the policy value released and overstates the gain or loss: $\$200{,}000$ in place of $\$176{,}000$ in the example above.
