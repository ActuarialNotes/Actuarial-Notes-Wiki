---
aliases:
  - Longevity
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ab8de029c58ac971be802677fee6025b36096ac08a9300c3d5e03be8404bf32c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Longevity Risk.md
---
**Longevity Risk** is the risk that people live longer than assumed, so that payments contingent on survival, such as [[Annuity Contract|annuities]] and defined benefit [[Pension|pensions]], last longer and cost more than the provider set aside. It is the mirror image of the [[Mortality|mortality]] risk in [[Life Insurance|life insurance]], where deaths come earlier than assumed.

The expected present value of a continuous [[Life Annuity|life annuity]] of 1 a year on $(x)$, $\bar{a}_x$, is

> $$\bar{a}_x = \int_0^\infty e^{-\delta t}\,{}_tp_x\,dt$$

- ${}_tp_x$ is the probability that $(x)$ survives $t$ years.
- $\delta$ is the [[Force of Interest|force of interest]].

When people live longer, every ${}_tp_x$ rises, so $\bar{a}_x$ and the liability for the annuity rise with it.

## Components of longevity risk

Longevity risk has four components:

1. **Level risk** is that the assumed mortality rates are wrong today, because the table does not fit the insured population.
2. **Trend risk** is that mortality improves faster than projected. It is the largest and slowest-moving part.
3. **Volatility risk** is random variation in the number of deaths in a finite group, which diversifies away in a large block.
4. **Basis risk** is the gap between the population a hedge is based on, such as a national index, and the lives actually covered.

Volatility risk falls as the block grows, but level and trend risk affect every life together and do not diversify with size. A large annuity block still carries them in full.

## A longevity stress

A longevity stress lowers the force of mortality $\mu_{x+t}$ by a proportion $s$ at every age, so the stressed force of mortality is

> $$\mu^{*}_{x+t} = (1 - s)\,\mu_{x+t}$$

The stress raises every ${}_tp_x$, and so $\bar{a}_x$. Under a constant force of mortality $\mu$, $\bar{a}_x = 1/(\mu + \delta)$.

> [!example]- How much does this longevity stress raise the annuity liability? {Example}
> An insurer pays 1,000 annuitants $\$10{,}000$ a year each, continuously for life. On its best-estimate basis the force of mortality is a constant 0.04, and $\delta = 0.04$. A longevity stress lowers the force of mortality by 20% at all ages.
>
> > [!answer]-
> > - Before the stress, $\bar{a} = 1/(0.04 + 0.04) = 12.5$, so the liability is $\$125.0$ million.
> > - The stressed force of mortality is $0.8 \times 0.04 = 0.032$, so $\bar{a}^{*} = 1/(0.032 + 0.04) = 13.8889$.
> > - The liability rises by $10{,}000{,}000 \times (13.8889 - 12.5) = \$13{,}888{,}889$, to $\$138.9$ million.
> > - That is a rise of 11.1%, smaller than the 20% cut in mortality, because the payments the stress adds come late and are discounted most.

## The mortality offset

An insurer that writes both annuities and life insurance carries a partial natural hedge, the mortality offset, which matters for [[Risk Diversification|risk diversification]] and capital. Lighter mortality raises annuity liabilities and lowers the cost of life insurance, so the two blocks move in opposite directions. The change in the value of the insurer's liabilities is

> $$\Delta L = \Delta L_{\text{ann}} + \Delta L_{\text{life}}$$

- $\Delta L_{\text{ann}}$ is the change in the annuity block's liability.
- $\Delta L_{\text{life}}$ is the change in the life block's liability.

The offset is partial, because annuitants are older than most insured lives, the populations differ in health and wealth, and improvement does not hit all ages equally. Modelling the offset needs a correlation between the stresses on the two blocks, and assuming a perfect offset overstates the [[Diversification Credit|diversification credit]].

> [!example]- How much of the annuity stress does the life block offset? {Example}
> The insurer above also holds whole life policies with a total sum insured of $\$500$ million, paid at the moment of death, with a best-estimate force of mortality of 0.01 and $\delta = 0.04$. The insured lives are younger, so the same scenario lowers their mortality by only 10%.
>
> > [!answer]-
> > - Under a constant force, $\bar{A}_x = \mu/(\mu + \delta)$.
> > - Before the stress, the life liability is $500{,}000{,}000 \times 0.01/0.05 = \$100{,}000{,}000$.
> > - After it, the force is 0.009 and the liability is $500{,}000{,}000 \times 0.009/0.049 = \$91{,}836{,}735$, a gain of $\$8{,}163{,}265$.
> > - The net change is $\Delta L = 13{,}888{,}889 - 8{,}163{,}265 = \$5{,}725{,}624$.
> > - The life block offsets about 59% of the annuity loss, and the insurer still loses $\$5.7$ million.
> > - With an equal 20% stress on both blocks the offset would look larger, which is why the correlation between the stresses drives the diversification benefit.

## Who carries longevity risk

Insurers writing payout annuities and pension risk transfer business carry it on their balance sheets. Defined benefit [[Pension Plan|pension plans]] and their sponsors carry it until they transfer it. Governments carry it through social security and public pensions, and individuals with savings but no annuity carry it on their own.

## Investing for long-tail liabilities

Payments more than 30 years away are hard to match, because few bonds are that long. The investor faces [[Reinvestment Risk|reinvestment risk]] at unknown future rates, and pension benefits indexed to prices add [[Inflation|inflation]] risk that nominal bonds do not hedge. Longevity extends the tail further, and the longest cash flows are both the least certain and the most sensitive to the discount rate. The investor therefore uses inflation-linked bonds, long [[Interest Rate Risk|interest rate]] hedges and real assets alongside matching.

## Transferring longevity risk

A pension plan can buy annuities from an insurer, as a buy-in held as a plan asset or a buy-out that moves the members to the insurer. Longevity swaps and [[Reinsurance Transaction|longevity reinsurance]] exchange fixed payments for the actual payments to a named group of lives, which transfers longevity risk while the plan keeps its assets. Index-based instruments, such as longevity bonds and q-forwards, pay on a population mortality index. That makes them tradable but leaves basis risk. A pension plan whose members are wealthier than the population can still lose when the index pays nothing.

> [!trap] Applying the mortality shock in the wrong direction
> Lighter mortality is a loss for an annuity writer and a gain for a life insurer. A longevity stress lowers the force of mortality, so a shock that raises it for the annuity block reverses the sign of the result.
