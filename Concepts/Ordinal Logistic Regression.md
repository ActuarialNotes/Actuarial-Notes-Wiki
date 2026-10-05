**Ordinal Logistic Regression** models a response with $J$ ordered categories through its **cumulative** probabilities $\gamma_j = P(Y \le j)$. The usual form is the **proportional odds** (cumulative logit) model, which applies the logit [[Link Function]] to each $\gamma_j$ and gives every cut-point its own intercept $\theta_j$ but one common set of slopes $\boldsymbol\beta$.

> $$\ln\!\left(\frac{\gamma_j}{1-\gamma_j}\right) = \theta_j + \mathbf{x}^\top\boldsymbol\beta$$

> $$\gamma_j = \pi_1 + \pi_2 + \cdots + \pi_j$$

> $$\pi_j = \gamma_j - \gamma_{j-1}$$

- $j = 1, \dots, J-1$, with $\gamma_0 = 0$ and $\gamma_J = 1$; $\pi_j = P(Y = j \mid \mathbf{x})$. The cut-points satisfy $\theta_1 < \theta_2 < \cdots < \theta_{J-1}$ because the cumulative probabilities increase with $j$. The predictors carry no column of ones, since the cut-points play the intercept's role.
- **Proportional odds.** Exponentiating gives $\gamma_j/(1-\gamma_j) = e^{\theta_j}\,e^{\mathbf{x}^\top\boldsymbol\beta}$. A covariate multiplies the odds of "category $j$ or below" by the *same* factor $e^{\mathbf{x}^\top\boldsymbol\beta}$ at every cut-point.
- **Parsimony.** The model has $(J-1) + p$ parameters. A [[Multinomial Logistic Regression|multinomial (nominal) logistic model]] fitted to the same data has $(J-1)(p+1)$ and makes no use of the ordering.
- **Latent-variable view.** Suppose a continuous $Y^* = \mathbf{x}^\top\boldsymbol\beta^* + \varepsilon$ with a standard logistic error, and $Y = j$ when $Y^*$ falls between $\theta_{j-1}$ and $\theta_j$. This gives the same model with $\boldsymbol\beta^* = -\boldsymbol\beta$.
- **Check the sign convention.** In the form above a positive $\beta$ raises the odds of the *lower* categories. Output may instead report the latent-variable coefficients, with the model written $\theta_j - \mathbf{x}^\top\boldsymbol\beta^*$; there a positive coefficient shifts the response toward the *higher* categories.
- Dobson & Barnett (§8.4) also present the adjacent-categories and continuation-ratio logit models for ordered responses. The proportional odds model is not a log-linear model, and it is fitted by [[Maximum Likelihood Estimation]].
- Actuarial uses: a claim's severity band, an injury-severity scale, or a policyholder satisfaction rating. Compare an ordinal response with an ordinal *predictor* ([[Categorical Predictor]]).

> [!example]- Severity Band Probabilities With and Without an Attorney {Example}
> Claims are banded as small ($1$), medium ($2$) or large ($3$). A proportional odds model in the form above has $\theta_1 = 0.8$, $\theta_2 = 2.2$ and attorney coefficient $\beta = -1.1$ ($x = 1$ if represented). Find the band probabilities for a represented claim.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{logit}\,\gamma_1 &= 0.8 - 1.1 = -0.3 \\[4pt]
> > \gamma_1 &= \frac{1}{1 + e^{0.3}} \\
> > &= 0.4256
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{logit}\,\gamma_2 &= 2.2 - 1.1 = 1.1 \\[4pt]
> > \gamma_2 &= \frac{1}{1 + e^{-1.1}} \\
> > &= 0.7503
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \pi_1 &= 0.4256 \\
> > \pi_2 &= 0.7503 - 0.4256 = 0.3247 \\
> > \pi_3 &= 1 - 0.7503 = 0.2497
> > \end{align*}
> > $$
> >
> > Without an attorney the same steps give $\gamma_1 = 0.6900$ and $\gamma_2 = 0.9002$, so $\pi = (0.690,\ 0.210,\ 0.100)$. Representation moves probability toward the large band: $P(\text{large})$ rises from $10.0\%$ to $25.0\%$.

> [!example]- One Odds Ratio at Every Cut-Point {Example}
> For the model above, find the odds ratio for a represented versus an unrepresented claim at each cut-point. Then compare the parameter count with a multinomial logistic model when the response has $J = 4$ bands and there are $p = 3$ predictors.
>
> > [!answer]-
> > At the first cut-point the odds of "small" are $0.4256/0.5744 = 0.7408$ with an attorney and $0.6900/0.3100 = 2.2255$ without. At the second, the odds of "medium or below" are $0.7503/0.2497 = 3.0042$ and $0.9002/0.0998 = 9.0250$.
> >
> > $$
> > \begin{align*}
> > \frac{0.7408}{2.2255} &= 0.333 \\[4pt]
> > \frac{3.0042}{9.0250} &= 0.333 \\[4pt]
> > e^{-1.1} &= 0.333
> > \end{align*}
> > $$
> >
> > The ratio is the same at both cut-points, which is the proportional odds property: an attorney cuts the odds of being at or below *any* band by two-thirds. With $J = 4$ and $p = 3$, the proportional odds model has $(4-1) + 3 = 6$ parameters, while a multinomial logistic model has $(4-1)(3+1) = 12$.
