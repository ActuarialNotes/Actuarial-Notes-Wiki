The **likelihood ratio test (LRT)** compares two *nested* models by twice the gap in their maximized log-likelihoods, referred to a chi-square distribution with degrees of freedom equal to the difference in parameter counts.

> $$\Lambda = -2\left(\ell_{\text{reduced}} - \ell_{\text{full}}\right) \;\dot\sim\; \chi^{2}_{\,df}$$
>
> $$df = (\text{parameters in full}) - (\text{parameters in reduced})$$

- **Nested** means the reduced model is the full one with some parameters constrained — usually to zero. Non-nested models need [[AIC]] or [[BIC]] instead
- In a [[Generalized Linear Model]] the statistic is the [[Deviance|deviance]] difference; in a [[Linear Mixed Model]] it is the difference in $-2\ell$ reported by the software
- The fixed/random rule from [[Restricted Maximum Likelihood|REML]] applies: test fixed effects on ML fits, random-structure changes on REML fits
- **Boundary problem**: testing $\sigma_b^2 = 0$ puts the null on the edge of the parameter space, so the true null distribution is a *mixture* $\tfrac12\chi^2_0 + \tfrac12\chi^2_1$. The naive $\chi^2_1$ $p$-value is roughly double the correct one — conservative, so a rejection stands
- Large samples only: the $\chi^2$ reference is asymptotic

![[Media/Figures/Likelihood_Ratio_Test.svg|340]]

> [!example]- Testing a Random Effect {Example}
> A model of loss ratio has $-2\ell = 4{,}118.6$ without a random territory effect and $4{,}112.0$ with it (REML, identical fixed effects). Is the territory effect significant at 5%?
>
> > [!answer]-
> > $$\Lambda = 4{,}118.6 - 4{,}112.0 = 6.6 \quad \text{on } 1 \text{ df}$$
> > Naive: $\chi^2_{0.95,1} = 3.84 < 6.6$, reject. Correcting for the boundary, the $p$-value is $\tfrac12 P(\chi^2_1 > 6.6) = 0.005$ rather than $0.010$ — the same conclusion, more strongly.
> > **Keep the random territory effect.**
