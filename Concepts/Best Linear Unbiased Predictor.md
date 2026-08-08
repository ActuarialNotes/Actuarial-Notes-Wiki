The **best linear unbiased predictor (BLUP)** is the estimate a [[Linear Mixed Model]] produces for a [[Random Effects|random effect]]. It is the group's raw deviation shrunk toward zero by a factor that is, in the simplest case, exactly a credibility weight.

> $$\hat{\mathbf{b}} = \mathbf{D}\mathbf{Z}^{\top}\mathbf{V}^{-1}\left(\mathbf{y} - \mathbf{X}\hat{\boldsymbol{\beta}}\right)$$
>
> $$\text{random intercept: } \hat{b}_i = \frac{n_i\sigma_b^{2}}{n_i\sigma_b^{2} + \sigma^{2}}\left(\bar{y}_i - \bar{y}\right)$$

- Fixed effects are **estimated**, random effects are **predicted** — a random effect is a realized value of a random variable, not a fixed constant, so "prediction" is the correct word
- The shrinkage factor $\dfrac{n_i}{n_i + \sigma^2/\sigma_b^2}$ is [[Bühlmann Credibility|Bühlmann's]] $Z = n/(n+k)$ with $k = \sigma^2/\sigma_b^2 = \mathrm{EPV}/\mathrm{VHM}$ — the mixed model and the credibility model are the same estimator
- A group with plenty of data keeps nearly all of its own deviation; a thin group is pulled almost all the way back to the population mean
- BLUPs are **shrunk on purpose**: they minimize mean squared prediction error, so their spread is deliberately narrower than the true effects'
- Adding $\mathbf{X}\hat{\boldsymbol\beta} + \mathbf{Z}\hat{\mathbf{b}}$ gives the group-specific (conditional) fitted values, against the population-average fit $\mathbf{X}\hat{\boldsymbol\beta}$

![[Media/Figures/Best_Linear_Unbiased_Predictor.svg|340]]

> [!example]- BLUP as a Credibility Estimate {Example}
> A random-intercept model of pure premium by class has $\hat\sigma_b^2 = 900$ and $\hat\sigma^2 = 3{,}600$. Class C has 6 policy-years averaging 260 against a grand mean of 200. What is its BLUP and its fitted pure premium?
>
> > [!answer]-
> > $k = \sigma^2/\sigma_b^2 = 3{,}600/900 = 4$, so
> > $$Z = \frac{6}{6 + 4} = 0.60 \qquad \hat b_C = 0.60(260 - 200) = 36$$
> > Fitted pure premium $= 200 + 36 = 236$, not the raw 260. Six policy-years earn 60% credibility; the remaining 40% stays with the class mean.
