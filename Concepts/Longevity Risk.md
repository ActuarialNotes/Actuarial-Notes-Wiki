---
aliases:
  - Longevity
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0381d19be349ba3e42a5a957ce587c105b97452a5c181894f27494fb49e9ea71
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Longevity Risk.md
---
**Longevity Risk** is the risk that people live longer than assumed, so that payments contingent on survival, such as [[Annuity Contract|annuities]] and defined benefit [[Pension|pensions]], last longer and cost more than the provider set aside. It is the mirror image of the [[Mortality|mortality]] risk in [[Life Insurance|life insurance]], where deaths come earlier than assumed. An insurer that writes both carries a partial natural hedge, the mortality offset, which matters for [[Risk Diversification|risk diversification]] and capital. Longevity risk is also a large part of what makes liabilities that run beyond 30 years hard to invest for.

> $$\bar{a}_x = \int_0^\infty e^{-\delta t}\,{}_tp_x\,dt$$

> $$\mu^{*}_{x+t} = (1 - s)\,\mu_{x+t}$$

> $$\Delta L = \Delta L_{\text{ann}} + \Delta L_{\text{life}}$$

- **Symbols:** $\bar{a}_x$ is the expected present value of a continuous [[Life Annuity|life annuity]] of 1 a year on $(x)$, ${}_tp_x$ the survival probability, $\mu_{x+t}$ the force of mortality and $\delta$ the [[Force of Interest|force of interest]]. A longevity stress lowers the force of mortality by a proportion $s$, which raises every ${}_tp_x$ and so $\bar{a}_x$. $\Delta L$ is the change in the value of the liabilities, split between the annuity and life blocks.
- **Four components:** Level risk is that the assumed mortality rates are wrong today, because the table does not fit the insured population. Trend risk is that mortality improves faster than projected, which is the largest and slowest-moving part. Volatility risk is random variation in the number of deaths in a finite group, which diversifies away in a large block. Basis risk is the gap between the population a hedge is based on, such as a national index, and the lives actually covered.
- **Who carries it:** Insurers writing payout annuities and pension risk transfer business carry it on their balance sheets. Defined benefit [[Pension Plan|pension plans]] and their sponsors carry it until they transfer it, governments carry it through social security and public pensions, and individuals with savings but no annuity carry it on their own.
- **The mortality offset:** Lighter mortality raises annuity liabilities and lowers the cost of life insurance, so the two blocks move in opposite directions. The offset is partial, because annuitants are older than most insured lives, the populations differ in health and wealth, and improvement does not hit all ages equally. Modelling the offset needs a correlation between the stresses on the two blocks, and assuming a perfect offset overstates the [[Diversification Credit|diversification credit]].
- **Investing for long-tail liabilities:** Payments more than 30 years away are hard to match, because few bonds are that long. The investor faces [[Reinvestment Risk|reinvestment risk]] at unknown future rates, and pension benefits indexed to prices add [[Inflation|inflation]] risk that nominal bonds do not hedge. Longevity extends the tail further, and the longest cash flows are both the least certain and the most sensitive to the discount rate, so the investor uses inflation-linked bonds, long [[Interest Rate Risk|interest rate]] hedges and real assets alongside matching.
- **Transfer tools:** A pension plan can buy annuities from an insurer, as a buy-in held as a plan asset or a buy-out that moves the members to the insurer. Longevity swaps and [[Reinsurance Transaction|longevity reinsurance]] exchange fixed payments for the actual payments to a named group of lives, which transfers longevity risk while the plan keeps its assets. Index-based instruments, such as longevity bonds and q-forwards, pay on a population mortality index, which makes them tradable but leaves basis risk.

> [!example]- Valuing a Longevity Stress on an Annuity Block {Example}
> An insurer pays 1,000 annuitants \$10,000 a year each, continuously for life. On its best-estimate basis the force of mortality is a constant 0.04, and $\delta = 0.04$. A longevity stress lowers the force of mortality by 20% at all ages. Find the liability before and after the stress.
>
> > [!answer]-
> > Under a constant force, $\bar{a}_x = 1/(\mu + \delta)$.
> > $$
> > \begin{align*}
> > \bar{a} &= \frac{1}{0.04 + 0.04} \\
> > &= 12.5 \\
> > \bar{a}^{*} &= \frac{1}{0.032 + 0.04} \\
> > &= 13.8889 \\
> > \Delta L_{\text{ann}} &= 10{,}000{,}000(13.8889 - 12.5) \\
> > &= 13{,}888{,}889
> > \end{align*}
> > $$
> > The liability rises from \$125.0 million to \$138.9 million, or 11.1%. The rise is smaller than the 20% cut in mortality because discounting reduces the weight of the payments that the stress adds, which come late.

> [!example]- How Much of the Stress Does the Life Block Offset? {Example}
> The same insurer also holds a block of whole life policies with a total sum insured of \$500 million, paid at the moment of death, with a best-estimate force of mortality of 0.01 and $\delta = 0.04$. Because the insured lives are younger, the same longevity scenario lowers their mortality by only 10%. Find the net effect on the insurer.
>
> > [!answer]-
> > Under a constant force, $\bar{A}_x = \mu/(\mu + \delta)$.
> > $$
> > \begin{align*}
> > L_{\text{life}} &= 500{,}000{,}000\left(\frac{0.01}{0.05}\right) \\
> > &= 100{,}000{,}000 \\
> > L^{*}_{\text{life}} &= 500{,}000{,}000\left(\frac{0.009}{0.049}\right) \\
> > &= 91{,}836{,}735 \\
> > \Delta L &= 13{,}888{,}889 - 8{,}163{,}265 \\
> > &= 5{,}725{,}624
> > \end{align*}
> > $$
> > The life block gains \$8.2 million, which offsets about 59% of the \$13.9 million annuity loss, and the insurer still loses \$5.7 million. With an equal 20% stress on both blocks the offset would look larger, which is why the correlation between the stresses drives the diversification benefit.

> [!tip]- How it appears on the exam
> - **ILA-201I and ILA-201U:** Questions ask candidates to analyse the impact of risk diversification, including how to model the offset between mortality and longevity risk. A case gives a company with annuity and life business and asks how the offset affects capital, why it is only partial, and what correlation or scenario assumptions are reasonable.
> - **CP-351:** Questions ask candidates to evaluate the difficulties of investing for liabilities beyond 30 years, with inflation and longevity as the named examples. Answers cover the shortage of long assets, reinvestment and inflation risk, and the strategies and transfer tools that address them.

> [!warning]- Exam traps
> - **Direction of the risk:** Lighter mortality is a loss for an annuity writer and a gain for a life insurer. Applying a mortality shock in the wrong direction reverses the sign of the result.
> - **Trend is not volatility:** Volatility risk falls as the block grows, but trend and level risk affect every life together and do not diversify with size. Arguing that a large annuity block has little longevity risk confuses the two.
> - **A perfect offset:** The mortality and longevity blocks cover different ages and populations, so their experience is far from perfectly negatively correlated. Netting the two stresses one for one overstates diversification.
> - **Basis risk in hedges:** An index-based hedge pays on a population index, not on the hedger's own lives. A pension plan whose members are wealthier than the population can still lose when the index pays nothing.
