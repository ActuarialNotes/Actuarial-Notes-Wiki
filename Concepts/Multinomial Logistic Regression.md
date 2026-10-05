---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:efdc0a09055b36494326294dd8dfd3731adffbd038a9ecf1ae2386b77384884e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Multinomial Logistic Regression.md
---

**Multinomial Logistic Regression** extends [[Logistic Regression]] to a nominal response with $J > 2$ unordered categories. One category is chosen as the **baseline** $J$, and the log-odds of each other category against it is modelled as a linear function of the predictors. Dobson & Barnett call it *nominal logistic regression*.

> $$\ln\!\left(\frac{\pi_j}{\pi_J}\right) = \beta_{0j} + \beta_{1j}x_1 + \cdots + \beta_{pj}x_p$$

> $$\pi_j = \frac{e^{\eta_j}}{1 + \sum_{k=1}^{J-1} e^{\eta_k}}$$

> $$\pi_J = \frac{1}{1 + \sum_{k=1}^{J-1} e^{\eta_k}}$$

- $\pi_j = P(Y = j \mid \mathbf{x})$, the probabilities sum to $1$, and $\eta_j$ is the right-hand side of the first block for $j = 1, \dots, J-1$. There are $J-1$ equations, each with its own intercept and slopes, so the model has $(J-1)(p+1)$ coefficients. With $J = 2$ it is ordinary logistic regression.
- **Interpretation.** $e^{\beta_{ij}}$ multiplies the odds of category $j$ *against the baseline* for a one-unit increase in $x_i$. Coefficients only mean something relative to the baseline that was chosen.
- **The baseline does not matter for predictions.** Refitting with a different baseline changes the coefficients but not the fitted probabilities. The log-odds between two non-baseline categories is the difference of their equations: $\ln(\pi_j/\pi_k) = \eta_j - \eta_k$.
- The **softmax** coding gives every category its own $\eta_j$ and sets $\pi_j = e^{\eta_j} / \sum_{k=1}^{J} e^{\eta_k}$. It produces the same fitted values and log-odds.
- The response is multinomial, which reduces to the [[Binomial Distribution|binomial]] when $J = 2$. The coefficients are fitted by [[Maximum Likelihood Estimation]] with an iterative algorithm, and fit is judged by the [[Deviance]] and [[Likelihood Ratio Test|likelihood-ratio tests]] between nested models.
- The model ignores any ordering of the categories. When the response is ordered, [[Ordinal Logistic Regression]] uses that order and needs only one set of slopes.
- Actuarial uses: a renewal outcome (renew, change coverage, lapse), the choice among several coverage options, or the way a claim is closed.

> [!example]- Renewal Outcome Probabilities {Example}
> A renewal model has three outcomes: renew unchanged (baseline), renew with reduced coverage, and lapse. For rate increase $x$ (in %), the fitted equations are
> $\eta_{\text{reduce}} = -1.2 + 0.05x$ and $\eta_{\text{lapse}} = -2.0 + 0.10x$.
> Find the probability of each outcome for a $10\%$ rate increase, and interpret the lapse slope.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \eta_{\text{reduce}} &= -1.2 + 0.05(10) \\
> > &= -0.7 \\[4pt]
> > \eta_{\text{lapse}} &= -2.0 + 0.10(10) \\
> > &= -1.0
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > 1 + e^{-0.7} + e^{-1.0} &= 1 + 0.4966 + 0.3679 \\
> > &= 1.8645
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \pi_{\text{renew}} &= \frac{1}{1.8645} = 0.536 \\[4pt]
> > \pi_{\text{reduce}} &= \frac{0.4966}{1.8645} = 0.266 \\[4pt]
> > \pi_{\text{lapse}} &= \frac{0.3679}{1.8645} = 0.197
> > \end{align*}
> > $$
> >
> > The three probabilities sum to $1$. Each extra point of rate increase multiplies the odds of lapsing *rather than renewing unchanged* by $e^{0.10} = 1.105$, an increase of $10.5\%$.

> [!example]- Changing the Baseline {Example}
> Using the same fitted model, find the log-odds of lapsing rather than reducing coverage as a function of $x$, and check it against the probabilities at $x = 10$. How many coefficients does the model estimate?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \ln\!\left(\frac{\pi_{\text{lapse}}}{\pi_{\text{reduce}}}\right) &= \eta_{\text{lapse}} - \eta_{\text{reduce}} \\
> > &= (-2.0 + 1.2) + (0.10 - 0.05)x \\
> > &= -0.8 + 0.05x
> > \end{align*}
> > $$
> >
> > At $x = 10$ this is $-0.3$, and $e^{-0.3} = 0.741$, which matches $0.197 / 0.266 = 0.741$. A model fitted with "reduce coverage" as the baseline would report $-0.8$ and $0.05$ for this equation and would give the same probabilities. With $J = 3$ outcomes and $p = 1$ predictor the model has $(3-1)(1+1) = 4$ coefficients.
