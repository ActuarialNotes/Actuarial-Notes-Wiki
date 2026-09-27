---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1186e7bb963aa90b1c2df93df4814bc9644b85e3c0f7caa8441cafaca41db0cb
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Lasso Credibility.md
---

**Lasso Credibility** is a multivariate [[Credibility|credibility]] procedure built from a lasso-penalized [[Generalized Linear Model|GLM]]: each rating variable's [[Complement of Credibility|complement of credibility]] enters the model as an [[Offset Variable|offset]], so the penalty shrinks each coefficient toward the complement rather than toward zero, and the penalty parameter $\lambda$ sets how much credibility the data's departures from the complement receive.

> $$\hat{\beta} = \arg\min_{\beta}\ \text{NLL}(y, X, \beta) + \lambda \sum_{j=1}^{p} \lvert \beta_j \rvert$$

> $$\ln \mu_i = \beta_0 + \sum_{j=1}^{p} \left(\beta_{j,\text{offset}} + \beta_j\right) x_{ij}$$

- $\text{NLL}$ is the model's negative log-likelihood. $\beta_{j,\text{offset}}$ is the complement (the log of its relativity), fixed by the actuary and not penalized; $\beta_j$ is the fitted departure from it, and the indicated factor is the offset factor times $e^{\beta_j x_{ij}}$. The complement can be a prior model, a countrywide model, the current rating plan, or competitor or industry relativities. Without an offset every complement is $\beta = 0$, a $1.0$ relativity: that is plain lasso penalized regression, where a coefficient set to zero means the variable is not predictive. In lasso credibility a zero means **no credible difference from the complement**, and the complement's relativity stays in the plan.
- **$\lambda$ is the credibility dial.** At $\lambda = 0$ the model is the unpenalized GLM, and $\beta_{j,\text{offset}} + \beta_j = \beta_{j,\text{glm}}$ gives the data full credibility. At a large enough $\lambda$ every $\beta_j$ is zero and the indication is the complement. In between, the indicated coefficient generally lies between the two, so it can be read as $Z\,\beta_{j,\text{glm}} + (1-Z)\,\beta_{j,\text{offset}}$ for some $Z$. One $\lambda$ applies to every coefficient, so it sets a single credibility standard across all variables. It is chosen by [[Cross-Validation|cross-validation]], which gives a range of comparably good values rather than one answer. Judgment usually moves it **up**, toward the complement: to temper policyholder impacts (like selecting between current and indicated), to stabilize factors, or when trend, IBNR or case-reserve adjustments understate the data's volatility. Moving it down is rarer, for a complement known to be deficient, changed or out of date.
- **Relation to classical credibility.** As in [[Limited Fluctuation Credibility|classical]] and [[Bühlmann Credibility|Bühlmann]] credibility, the weight on the data rises with exposure. In a one-way model with normal errors and an identity link, ridge regression (a normal prior on the coefficients) is exactly Bühlmann credibility with $k = \lambda = \sigma^2/\tau^2$, while the lasso corresponds to a Laplace prior. The lasso's weight is not $n/(n+k)$: a class keeps its complement until its total departure $n_j\lvert\bar{y}_j\rvert$ exceeds $\lambda$, much like failing a significance test. Beyond that it keeps all of its departure except $\lambda/n_j$, so large departures are shrunk less than under ridge. Its implied $Z$ therefore depends on the size of the departure as well as on $n_j$, and in a multivariate model it cannot be calculated from $\lambda$ at all.

> $$\hat{\beta}_j = \begin{cases} \bar{y}_j - \lambda/n_j & \text{if } \bar{y}_j > \lambda/n_j \\ \bar{y}_j + \lambda/n_j & \text{if } \bar{y}_j < -\lambda/n_j \\ 0 & \text{otherwise} \end{cases}$$

- Here $\bar{y}_j$ is class $j$'s average departure from its complement over $n_j$ observations. In general, $\hat{\beta}_j = 0$ exactly when the gradient of the NLL with respect to $\beta_j$ is smaller than $\lambda$ in absolute value; otherwise $\beta_j$ moves until the gradient reaches $-\lambda$ (for a positive coefficient) or $+\lambda$ (for a negative one).
- **Reviewing a model.** There are no p-values; review moves from significance to credibility and has three parts.
  1. **The penalty.** Was $\lambda$ chosen by cross-validation, and was any adjustment toward a more robust model? Reversals in ordinal steps, or large departures across many coefficients, mean $\lambda$ is too small. A single large departure may be an outlier.
  2. **The complement.** Review it under [[ASOP 25 - Credibility Procedures (ASB - 2013)|ASOP 25]]. Watch correlated characteristics whose offsets come from different sources, and subject experience that is a material part of the complement.
  3. **Relativity plots.** Show the complement relativity, the indicated relativity, the observed relativity and exposures. A thin segment left at its complement tells you nothing about whether the complement is right, so judge that complement on traditional grounds. Use categorical levels at least as granular as the complement, and ordinal steps instead of continuous variables.
- **Case-study lessons** (a countrywide model refitted to states of different sizes, with the countrywide model as complement):
  1. A zero coefficient shows confidence in the complement. Farming stays at its complement of $.680$.
  2. Partially credible categories avoid overreacting. Construction moves from $1.460$ to $1.436$, not to the GLM's $1.379$.
  3. Categories with large exposure react quickly even when the complement is poor. The multipolicy discount moves from $.772$ to $.704$, close to the GLM's $.694$.
  4. *Lasso Credibility Moves Toward Experienced Relativities.* The older-driver hinge moves toward the indication without overreacting. But the errata-corrected 20% shrinkage on the vehicle-age hinge above age 10 still gives some credibility to noisy experience far from the true relativity. Credibility cannot fully protect against very noisy data.
  5. A poor complement can leave lasso credibility worse than a GLM. Health care's $1.399$ complement gives $1.288$ against a true $1.2$, where the GLM gave $1.165$. In the medium state, a 69-exposure category moving from $2.796$ to $.167$ called for a higher $\lambda$. With a good complement and a small state, cross-validation penalized every variable out of the model.

> [!example]- One Class: Stay at the Complement or Move? {Example}
> A state refit of workers compensation class loss costs uses lasso credibility with a countrywide complement of $\$250$ per exposure for each of three classes. Take the one-way case with normal errors and an identity link: each class's coefficient $\beta_j$ is its departure from the complement and minimizes $\tfrac{1}{2}\sum_{i}(y_i - \beta_j)^2 + \lambda\lvert\beta_j\rvert$, where $y_i$ is an exposure's loss cost minus the complement. The penalty is $\lambda = 6{,}000$.
>
> - Class A: $400$ exposures, average departure $+\$12$
> - Class B: $1{,}500$ exposures, average departure $+\$12$
> - Class C: $400$ exposures, average departure $+\$40$
>
> (a) Find each class's lasso credibility loss cost and its implied $Z$. (b) Compare with Bühlmann credibility at $k = 1{,}000$ and explain the difference.
>
> > [!answer]-
> > **(a)** A class moves off its complement only if $\lvert\bar{y}_j\rvert > \lambda/n_j$, and then, for a positive departure, to $\bar{y}_j - \lambda/n_j$.
> >
> > $$
> > \begin{align*}
> > \lambda/n_A &= 6{,}000/400 \\
> > &= 15 \\[4pt]
> > \lambda/n_B &= 6{,}000/1{,}500 \\
> > &= 4 \\[4pt]
> > \lambda/n_C &= 6{,}000/400 \\
> > &= 15
> > \end{align*}
> > $$
> >
> > A's departure of $12$ is below its threshold of $15$, so $\hat{\beta}_A = 0$. B and C exceed theirs:
> >
> > $$
> > \begin{align*}
> > \hat{\beta}_B &= 12 - 4 \\
> > &= 8 \\[4pt]
> > \hat{\beta}_C &= 40 - 15 \\
> > &= 25
> > \end{align*}
> > $$
> >
> > The loss costs are A $\$250$, B $\$258$ and C $\$275$. The implied credibilities are $Z_A = 0$, $Z_B = 8/12 = 0.667$ and $Z_C = 25/40 = 0.625$.
> >
> > **(b)** Bühlmann's $Z = n/(n+k)$ depends on exposure only:
> >
> > $$
> > \begin{align*}
> > Z_A = Z_C &= \frac{400}{400 + 1{,}000} \\
> > &= 0.2857 \\[4pt]
> > Z_B &= \frac{1{,}500}{1{,}500 + 1{,}000} \\
> > &= 0.600
> > \end{align*}
> > $$
> >
> > That gives A $250 + 0.2857(12) = \$253.43$, B $250 + 0.6(12) = \$257.20$ and C $250 + 0.2857(40) = \$261.43$.
> >
> > Bühlmann gives A and C the same weight because they have the same exposure. The lasso looks at the total signal $n_j\bar{y}_j$. A's is $4{,}800 < \lambda$, so its $+\$12$ is not credible and the complement gets full credibility. C's is $16{,}000$, so C keeps most of its large departure ($Z = 0.625$ against Bühlmann's $0.286$). This is the lasso's signature: small departures are set exactly to zero, and large ones are shrunk less than under ridge or Bühlmann.

> [!example]- Indicated Relativities from an Offset {Example}
> A large-state lasso credibility model uses countrywide relativities as its complement. For three levels, the complement relativity, the fitted lasso credibility coefficient $\beta_j$, and the relativity from an unpenalized GLM on the state's data are:
>
> - Construction: complement $1.460$, $\beta_j = -0.0163$, GLM $1.379$
> - Farming: complement $0.680$, $\beta_j = 0$, GLM $0.668$
> - Multipolicy discount (yes): complement $0.772$, $\beta_j = -0.0922$, GLM $0.694$
>
> (a) Calculate the indicated relativities. (b) Back out each level's implied credibility on the log scale. (c) Interpret the three results.
>
> > [!answer]-
> > **(a)** Indicated relativity $=$ complement $\times\, e^{\beta_j}$:
> >
> > $$
> > \begin{align*}
> > \text{Construction} &= 1.460\, e^{-0.0163} \\
> > &= 1.460 \times 0.9838 \\
> > &= 1.436 \\[4pt]
> > \text{Farming} &= 0.680\, e^{0} \\
> > &= 0.680 \\[4pt]
> > \text{Multipolicy} &= 0.772\, e^{-0.0922} \\
> > &= 0.772 \times 0.9119 \\
> > &= 0.704
> > \end{align*}
> > $$
> >
> > **(b)** Since $\beta_{j,\text{offset}} + \beta_j = Z\,\beta_{j,\text{glm}} + (1-Z)\,\beta_{j,\text{offset}}$, the implied $Z = \beta_j / \ln(\text{GLM}/\text{complement})$:
> >
> > $$
> > \begin{align*}
> > Z_{\text{constr}} &= \frac{-0.0163}{\ln(1.379/1.460)} \\
> > &= \frac{-0.0163}{-0.0571} \\
> > &= 0.29 \\[4pt]
> > Z_{\text{multi}} &= \frac{-0.0922}{\ln(0.694/0.772)} \\
> > &= \frac{-0.0922}{-0.1065} \\
> > &= 0.87
> > \end{align*}
> > $$
> >
> > Farming's $Z$ is $0$.
> >
> > **(c)** *Farming:* the penalty set the departure to zero. The state data show no credible difference from the complement, so the complement gets full credibility. This does not mean farming is not predictive. *Construction:* partial credibility. The indication moves toward the state's experience but not all the way to the GLM, avoiding an overreaction to noisy data. *Multipolicy:* both levels carry a great deal of exposure, so the data earn nearly full credibility and override a complement that is off. The complement matters most where exposure is thin. These $Z$s are read off after the fit and describe it; they are not inputs.

> [!example]- Reviewing a Medium-State Refit {Example}
> A medium-state lasso credibility model uses the countrywide model as its complement and the $\lambda$ that cross-validation selected. The review finds three things. An industry code with $69$ exposures has moved from its complement of $2.796$ to an indicated $0.167$. The ordinal driver-age steps reverse, up at 20, down at 21 and up at 22. Only one categorical level has been penalized to zero. A state-only GLM gives the same industry code a coefficient of $0.01$ with a p-value of $0.0645$.
>
> (a) What do these results say about $\lambda$? (b) What should the actuary do? (c) Would a p-value review have caught the problem?
>
> > [!answer]-
> > **(a)** The penalty is too small. One $\lambda$ sets the same credibility standard for every coefficient. A 69-exposure category overturning a large surcharge, and reversing ordinal steps, both show the data getting more credibility than they can support. Few levels sitting at their complements is not wrong by itself, but on a smaller data set with a good complement it is a prompt to review the credibility being assigned.
> >
> > **(b)** Cross-validation gives a range of statistically reasonable penalties, not one value. Raise $\lambda$ within and beyond that range until the relativities are actuarially reasonable for all variables and the reversals are gone, then check the result on the holdout set and document why the penalty was raised. Raising it moves every indication toward the complement. This is the direction best practice favours, much like selecting between current and indicated, and it is supported by ASOP 25's professional-judgment considerations. Overriding the one industry code by hand would be the univariate, post hoc adjustment that lasso credibility is meant to replace.
> >
> > **(c)** No. A p-value of $0.0645$ is close to significance and might even have been used to justify a discount. It only tests whether the coefficient differs from zero. It says nothing about how far to move from a complement, and a p-value screen is binary: each effect is kept at full credibility or removed, never given partial credibility.
