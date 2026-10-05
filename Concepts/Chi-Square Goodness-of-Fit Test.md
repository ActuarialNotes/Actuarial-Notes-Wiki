---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9764ae4c4172b63de194b63adddf12cf7019b3b64be146f956aa75dc8a199d92
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Chi-Square Goodness-of-Fit Test.md
---

The **Chi-Square Goodness-of-Fit Test** checks whether a sample came from a hypothesized distribution by sorting the observations into $k$ cells and comparing each cell's observed count $O_j$ with the count $E_j$ the model predicts. Large discrepancies give a large statistic $Q$ and lead to rejecting the model, so it is a right-tailed [[Hypothesis Testing|hypothesis test]].

> $$Q = \sum_{j=1}^{k} \frac{(O_j - E_j)^2}{E_j}$$

> $$E_j = n\,p_j = n\left[F(c_j) - F(c_{j-1})\right]$$

> $$Q \ \dot\sim\ \chi^2_{\,k-1-r} \quad \text{under } H_0$$

- $n$ is the sample size, $p_j$ the model probability of cell $j$ (from the [[Cumulative Distribution Function (CDF)|CDF]] $F$ at the cell boundaries $c_{j-1} < c_j$), and $r$ is the number of parameters **estimated from the data**. Reject $H_0$ at level $\alpha$ when $Q$ exceeds the upper-$\alpha$ [[Critical Value|critical value]] of the [[Chi-Squared Distribution|chi-squared distribution]] with $k - 1 - r$ degrees of freedom.
- **Degrees of freedom.** One is lost because the counts must sum to $n$; one more is lost for each estimated parameter. A fully specified model ($r = 0$) has $k - 1$; a [[Poisson Distribution|Poisson]] with $\lambda$ estimated, on four cells, has $4 - 1 - 1 = 2$.
- **Large-sample rule of thumb:** the chi-squared approximation needs every $E_j \ge 5$; combine sparse cells (usually in the tail) until it holds.
- The value of $Q$ depends on how the cells are chosen, and the test works for **discrete** models such as the Poisson and binomial as well as for binned continuous data. The [[Kolmogorov-Smirnov Test|Kolmogorov–Smirnov and Anderson–Darling tests]] are the alternatives for ungrouped continuous data.
- **Test of independence.** The same statistic on a $k \times m$ contingency table, with $E_{ij} = (\text{row } i \text{ total})(\text{column } j \text{ total})/n$, tests whether two classifications are independent, on $(k-1)(m-1)$ degrees of freedom.

> [!example]- Claim Counts Against a Fully Specified Size Distribution {Example}
> An insurer's pricing model says that 50% of claims are under \$1,000, 30% are \$1,000–\$5,000, 15% are \$5,000–\$25,000 and 5% exceed \$25,000. Last year's 400 claims fell 186, 132, 58 and 24 into these bands. Test the model at the 5% level.
>
> > [!answer]-
> > The expected counts are $400 \times (0.50, 0.30, 0.15, 0.05) = (200, 120, 60, 20)$, all at least 5:
> >
> > $$
> > \begin{align*}
> > Q &= \frac{(186-200)^2}{200} + \frac{(132-120)^2}{120} + \frac{(58-60)^2}{60} + \frac{(24-20)^2}{20} \\
> >   &= 0.980 + 1.200 + 0.067 + 0.800 \\
> >   &= 3.05
> > \end{align*}
> > $$
> >
> > No parameters were estimated, so there are $4 - 1 = 3$ degrees of freedom and the critical value is $\chi^2_{0.05,\,3} = 7.81$. Since $3.05 < 7.81$, **do not reject** — the pricing model's size bands are consistent with the year's claims.

> [!example]- Testing a Fitted Poisson Frequency Model {Example}
> Of 500 policies, 260 had no claims, 190 had one, 40 had two and 10 had three (none had more). Fit a Poisson by maximum likelihood and test it at the 5% level using the cells $0, 1, 2, 3{+}$.
>
> > [!answer]-
> > The MLE is the sample mean, $\hat\lambda = (190 + 2 \cdot 40 + 3 \cdot 10)/500 = 0.6$. The Poisson probabilities are $0.5488, 0.3293, 0.0988$, leaving $0.0231$ for $3{+}$, so the expected counts are $274.41, 164.64, 49.39, 11.56$:
> >
> > $$
> > \begin{align*}
> > Q &= \frac{(260-274.41)^2}{274.41} + \frac{(190-164.64)^2}{164.64} + \frac{(40-49.39)^2}{49.39} + \frac{(10-11.56)^2}{11.56} \\
> >   &= 0.756 + 3.905 + 1.786 + 0.210 \\
> >   &= 6.66
> > \end{align*}
> > $$
> >
> > One parameter was estimated, so there are $4 - 1 - 1 = 2$ degrees of freedom and $\chi^2_{0.05,\,2} = 5.99$. Since $6.66 > 5.99$, **reject** the Poisson model at 5% (but not at 2.5%, where the critical value is $7.38$). Forgetting to subtract the estimated parameter would have compared $6.66$ with $\chi^2_{0.05,\,3} = 7.81$ and wrongly kept the model: the policies show more one-claim risks than a single Poisson rate allows.
