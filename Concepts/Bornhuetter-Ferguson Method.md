**Bornhuetter-Ferguson Method** (BF) is a loss reserving technique that estimates IBNR by blending actual reported losses with an a priori expected loss estimate, weighted by the proportion of losses still unreported.

> $$\text{Ultimate}$$
>
> $$= \text{Reported} + \underbrace{\text{ELR} \times \text{EP} \times \left(1 - \tfrac{1}{\text{CDF}}\right)}_{\text{IBNR}}$$

- The "percent unreported" $\left(1 - 1/\text{CDF}\right)$ comes from the development triangle; expected losses $= \text{ELR} \times \text{Earned Premium}$
- BF is preferred for **immature accident years** (less credible actual emergence); for mature years, the [[Chain Ladder Method]] is preferred
- Unlike the chain ladder, BF does not allow early large (or small) reported losses to distort the ultimate — the unreported portion is anchored to the a priori expectation
- The ELR is typically sourced from pricing assumptions, budgeted loss ratios, or recent historical averages; selecting a poor ELR is the primary source of error

> [!example]- BF Reserve {Example}
> AY 2023: EP $= \$2{,}000{,}000$, ELR $= 65\%$, reported losses $= \$600{,}000$, 12-month CDF $= 1.896$.
>
> > [!answer]-
> > Expected losses $= 2{,}000{,}000 \times 0.65 = 1{,}300{,}000$
> >
> > $\%$ Unreported $= 1 - 1/1.896 = 47.2\%$; IBNR $= 1{,}300{,}000 \times 0.472 = 613{,}600$
> >
> > Ultimate $= 600{,}000 + 613{,}600 = \$1{,}213{,}600$
> >
> > Chain Ladder comparison: $600{,}000 \times 1.896 = \$1{,}137{,}600$ — BF is \$$76{,}000$ higher because the a priori expectation exceeds what the early emergence implies
