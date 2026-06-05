**Cape Cod Method** (also called Stanard-Bühlmann) is a loss reserving technique that derives the expected loss ratio (ELR) from the data itself rather than from an external a priori estimate, then uses that ELR exactly as in the [[Bornhuetter Ferguson Method]] to compute IBNR.

> $$\text{ELR} = \frac{\sum \text{Reported}_i}{\sum \text{EP}_i \times (1/\text{CDF}_i)}$$

> $$\text{IBNR}_i = \text{ELR} \times \text{EP}_i \times \left(1 - \tfrac{1}{\text{CDF}_i}\right)$$

- The denominator $\text{EP}_i \times (1/\text{CDF}_i)$ is called **developed (used-up) premium** — the share of premium "exposed" to reported losses at the current age
- Because the ELR is endogenous, Cape Cod is preferred when no reliable external ELR exists; it is less stable than BF when data are sparse or volatile
- Cape Cod converges to the chain ladder as accident years mature ($\%$ reported $\to 1$) and to the expected loss method for very immature years

> [!example]- Cape Cod Reserve {Example}
> Three AYs: CDF at 12 mo $= 1.896$ ($\%$ reported $= 52.7\%$), at 24 mo $= 1.265$ ($79.1\%$), at 36 mo $= 1.084$ ($92.3\%$). EP: \$$6{,}000$, \$$6{,}500$, \$$7{,}000$ (000s). Reported: \$$2{,}850$, \$$2{,}600$, \$$1{,}750$ (000s).
>
> > [!answer]-
> > Used-up premium: $6{,}000 \times 0.923 = 5{,}538$; $\;6{,}500 \times 0.791 = 5{,}142$; $\;7{,}000 \times 0.527 = 3{,}689$
> >
> > $\text{ELR} = (2{,}850 + 2{,}600 + 1{,}750)/(5{,}538 + 5{,}142 + 3{,}689) = 7{,}200/14{,}369 = 50.1\%$
> >
> > IBNR (AY 2024, most immature): $0.501 \times 7{,}000 \times 0.473 = \$1{,}660{,}000$
> >
> > Total IBNR sums ELR $\times$ EP $\times (1-1/\text{CDF})$ across all three years $\approx \$2{,}150{,}000$
