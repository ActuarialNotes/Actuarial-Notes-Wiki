---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:046b4fcd3ae5918876fb165e398d794ed082576a72727d6f25830f36bfe7ab3d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Bayesian Bornhuetter-Ferguson Model.md
---

**Bayesian Bornhuetter-Ferguson Model** is [[Obtaining Predictive Distributions for Reserves Which Incorporate Expert Opinion (Verrall - 2007)|Verrall's]] stochastic version of the [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] method. The row parameters $x_i$ of the [[Over-Dispersed Poisson Model|over-dispersed Poisson]] model, each accident year's expected ultimate loss, are given [[Gamma|gamma]] prior distributions that carry an expert's view of the ultimate. Each future incremental loss then has a predictive mean that is a [[Credibility|credibility]] weighting of the chain ladder and the Bornhuetter-Ferguson estimates. The strength of the prior moves the result along a spectrum from the [[Chain Ladder Method|chain ladder]] to BF.

> $$x_i \sim \mathrm{Gamma}(\alpha_i, \beta_i)$$

> $$E[x_i] = M_i = \frac{\alpha_i}{\beta_i}$$

> $$\mathrm{Var}(x_i) = \frac{M_i}{\beta_i}$$

> $$
> \begin{aligned}
> E[C_{ij}] ={}& Z_{ij}\,(\lambda_j - 1)\,D_{i,j-1} \\
> &+ (1 - Z_{ij})\,(\lambda_j - 1)\,\frac{M_i}{\lambda_j\lambda_{j+1}\cdots\lambda_n}
> \end{aligned}
> $$

> $$Z_{ij} = \frac{\sum_{k=1}^{j-1} y_k}{\beta_i\,\phi + \sum_{k=1}^{j-1} y_k}$$

- $C_{ij}$ is the incremental and $D_{ij}$ the cumulative loss of accident year $i$ at development year $j$, and $\lambda_j$ are the chain ladder factors. $M_i$ is the expert's ultimate, for example from the premium calculation. $y_k$ is the share of ultimate emerging in period $k$, so $\sum_{k<j} y_k = 1/(\lambda_j\cdots\lambda_n)$ is the share emerged to date. $\phi$ is the over-dispersion parameter, which Verrall plugs in from the ODP model rather than giving it a prior.
- **The prior sets the credibility.** For a given $M_i$, a larger $\beta_i$ is a smaller prior variance and more certainty about $M_i$. That pushes $Z_{ij}$ toward $0$, which is the Bornhuetter-Ferguson method. A small $\beta_i$, a vague prior, pushes $Z_{ij}$ toward $1$, the chain ladder. Everything between is a complete spectrum of models. In Verrall's Taylor and Ashe illustration, a prior standard deviation of $1{,}000$ on means of $5.5$–$6$ million reproduced BF, and $1{,}000{,}000$ gave reserves between the two.
- **Credibility grows with maturity.** $Z_{ij}$ rises with the share emerged, as BF's own weight $1/\text{CDF}$ does, but the prior's variance and $\phi$ now decide how fast. The gamma prior is [[Conjugate Prior|conjugate]] to the ODP likelihood. The [[Posterior Distribution|posterior]] mean of $x_i$ is $Z \cdot D_{i,j-1}/\sum_{k<j} y_k + (1 - Z) M_i$, and every future cell is $y_j$ times it. So the same $Z$ blends the chain ladder and BF *reserves* for the whole accident year.
- **Implementation.** The column parameters get improper priors and are estimated first, so they are the chain ladder's. The model is then rewritten as an [[Over-Dispersed Negative Binomial Model|over-dispersed negative binomial]] recursive down the rows, with mean $(\gamma_i - 1)\sum_{m<i} C_{m,j}$. Verrall's equation (5.4), as corrected in the errata, converts the prior values of $x_i$ into the $\gamma_i$. [[Markov Chain Monte Carlo|MCMC]] simulation in winBUGS gives the full [[Predictive Distribution|predictive distribution]], whose standard deviation is the [[Prediction Error|prediction error]].
- **What it adds** to deterministic BF is a prediction error and a predictive distribution, with the uncertainty in the a priori built in instead of ignored. Verrall notes the method can also be adapted so that the expert specifies the reserve rather than the ultimate.

> [!example]- Turning an Expert's View into a Prior {Example}
> At 12 months an accident year has cumulative paid losses of $1{,}500$ (\$000s). The factors are $\lambda_2 = 2.00$, $\lambda_3 = 1.25$ and $\lambda_4 = 1.10$, with development complete at 48 months. The underwriter expects an ultimate of $6{,}000$ with a standard deviation of $1{,}500$, and $\phi = 50$.
>
> Find the gamma prior, the credibility weight, the mean of the next incremental payment, and the blended reserve for the year.
>
> > [!answer]-
> > **Prior.**
> >
> > $$
> > \begin{align*}
> > \beta &= \frac{M}{\mathrm{Var}(x)} \\
> > &= \frac{6{,}000}{1{,}500^2} \\
> > &= 0.002667 \\
> > \alpha &= M\beta \\
> > &= 16
> > \end{align*}
> > $$
> >
> > **Credibility.** The share emerged is $1/(2.00 \times 1.25 \times 1.10) = 1/2.75 = 0.3636$, and $\beta\phi = 0.1333$.
> >
> > $$
> > \begin{align*}
> > Z &= \frac{0.3636}{0.1333 + 0.3636} \\
> > &= 0.7317
> > \end{align*}
> > $$
> >
> > **Next incremental.** The chain ladder mean is $(2.00 - 1)(1{,}500) = 1{,}500$ and the BF mean is $(2.00 - 1)(6{,}000/2.75) = 2{,}181.8$.
> >
> > $$
> > \begin{align*}
> > E[C_{i2}] &= 0.7317(1{,}500) + 0.2683(2{,}181.8) \\
> > &= 1{,}097.6 + 585.4 \\
> > &= 1{,}682.9
> > \end{align*}
> > $$
> >
> > **Reserve.** The chain ladder gives $1{,}500 \times 1.75 = 2{,}625.0$ and BF gives $6{,}000 \times (1 - 0.3636) = 3{,}818.2$.
> >
> > $$
> > \begin{align*}
> > \hat R &= 0.7317(2{,}625.0) + 0.2683(3{,}818.2) \\
> > &= 2{,}945.1
> > \end{align*}
> > $$
> >
> > The weight on the data is already $73\%$ at 12 months, well above BF's own $1/2.75 = 36\%$, because a $1{,}500$ standard deviation on $6{,}000$ is a weak prior. By 36 months, with $1/1.10 = 90.9\%$ emerged, $Z$ would be $0.9091/(0.1333 + 0.9091) = 0.872$.

> [!example]- Verrall's Taylor and Ashe Illustration, Accident Year 10 {Example}
> Verrall's accident year 10 has one observed payment of $344{,}014$. The chain ladder factors multiply to $14.4466$, and its chain ladder reserve is $4{,}625{,}811$. The prior mean ultimate is $6{,}000{,}000$, and his program's plug-in scale parameter is $52.8615$ in thousands, so $\phi = 52{,}861.5$.
>
> Estimate the Bayesian reserve with prior standard deviations of $1{,}000$ and of $1{,}000{,}000$.
>
> > [!answer]-
> > **BF reserve**, which the precise prior should reproduce:
> >
> > $$
> > \begin{align*}
> > R_{BF} &= 6{,}000{,}000\left(1 - \frac{1}{14.4466}\right) \\
> > &= 5{,}584{,}677
> > \end{align*}
> > $$
> >
> > The share emerged is $1/14.4466 = 0.06922$.
> >
> > **Standard deviation $1{,}000$:** $\beta = 6{,}000{,}000/1{,}000^2 = 6$, so $\beta\phi = 317{,}169$ and $Z \approx 0.0000002$. The reserve is the BF $5{,}584{,}677$. Verrall's Table 9 shows a simulated Bayesian mean of $5{,}587{,}000$.
> >
> > **Standard deviation $1{,}000{,}000$:** $\beta = 6 \times 10^{-6}$, so $\beta\phi = 0.3172$.
> >
> > $$
> > \begin{align*}
> > Z &= \frac{0.06922}{0.3172 + 0.06922} \\
> > &= 0.1791 \\
> > \hat R &= 0.1791(4{,}625{,}811) + 0.8209(5{,}584{,}677) \\
> > &= 5{,}412{,}899
> > \end{align*}
> > $$
> >
> > Table 10 shows $5{,}390{,}000$, between the chain ladder and BF as expected. The gap of under $0.5\%$ reflects simulation error and the way the program enters the prior, on the outstanding part of the ultimate. With a single payment to go on, even a prior as loose as $\pm 1$ million on $6$ million keeps about $82\%$ of the weight on the expert, and Table 10's prediction error for the year falls to $20\%$, from the chain ladder's $43\%$.
