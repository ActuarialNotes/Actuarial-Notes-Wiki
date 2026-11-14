---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:c1520ce46b3b8d92aef9c0407676488106c2262552052c7eca3ede8113af1164
  sources:
    - "Verrall, Obtaining Predictive Distributions for Reserves Which Incorporate Expert Opinion (Variance 1:1, 2007), §5, PDF pp.9-11 (journal pp.61-63), sha256:da4a19ac50ec7756ad651c5632e73b71ff99f584d7db436772f94de1ec024506 — https://www.casact.org/sites/default/files/2021-03/7_Verrall.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Bayesian Bornhuetter-Ferguson Model.md
---

A **Bayesian Bornhuetter-Ferguson Model** is [[Obtaining Predictive Distributions for Reserves Which Incorporate Expert Opinion (Verrall - 2007)|Verrall's]] stochastic version of the [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] method. The row parameters $x_i$ of the [[Over-Dispersed Poisson Model|over-dispersed Poisson]] model, each accident year's expected ultimate loss, are given [[Gamma|gamma]] prior distributions that carry an expert's view of the ultimate.

The prior on accident year $i$'s expected ultimate is

> $$x_i \sim \mathrm{Gamma}(\alpha_i, \beta_i)$$

- $\alpha_i$ and $\beta_i$ are the prior's parameters, chosen from the expert's view.

The prior mean, the expert's ultimate $M_i$, is

> $$E[x_i] = M_i = \frac{\alpha_i}{\beta_i}$$

$M_i$ may come, for example, from the premium calculation. The prior variance is

> $$\mathrm{Var}(x_i) = \frac{M_i}{\beta_i}$$

which is $\alpha_i/\beta_i^2$. For a given $M_i$, a larger $\beta_i$ is a smaller prior variance.

## The predictive mean of the next increment

Each future incremental loss then has a predictive mean that is a [[Credibility|credibility]] weighting of the chain ladder and the Bornhuetter-Ferguson estimates. Given the data $C_{i1}, \dots, C_{i,j-1}$, the mean of the next incremental loss $C_{ij}$ is

> $$
> \begin{aligned}
> E[C_{ij}] ={}& Z_{ij}\,(\lambda_j - 1)\,D_{i,j-1} \\
> &+ (1 - Z_{ij})\,(\lambda_j - 1)\,\frac{M_i}{\lambda_j\lambda_{j+1}\cdots\lambda_n}
> \end{aligned}
> $$

- $D_{i,j-1}$ is the cumulative loss of accident year $i$ at development year $j-1$.
- $\lambda_j$ are the [[Chain Ladder Method|chain ladder]] factors.
- $Z_{ij}$ is the credibility weight on the chain ladder.

The credibility weight is

> $$Z_{ij} = \frac{\sum_{k=1}^{j-1} y_k}{\beta_i\,\phi + \sum_{k=1}^{j-1} y_k}$$

- $y_k$ is the share of ultimate emerging in period $k$, so $\sum_{k<j} y_k = 1/(\lambda_j\cdots\lambda_n)$ is the share emerged to date.
- $\phi$ is the over-dispersion parameter, which Verrall plugs in from the ODP model rather than giving it a prior.

$Z_{ij}$ rises with the share emerged, as BF's own weight $1/\text{CDF}$ does, but the prior's variance and $\phi$ now decide how fast. The gamma prior is [[Conjugate Prior|conjugate]] to the ODP likelihood. The [[Posterior Distribution|posterior]] mean of $x_i$ is $Z \cdot D_{i,j-1}/\sum_{k<j} y_k + (1 - Z) M_i$, and every future cell is $y_j$ times it. So the same $Z$ blends the chain ladder and BF *reserves* for the whole accident year.

> [!example]- What are the prior, the credibility weight, the next incremental payment and the reserve for this accident year? {Example}
> At 12 months an accident year has cumulative paid losses of $1{,}500$ (\$000s). The factors are $\lambda_2 = 2.00$, $\lambda_3 = 1.25$ and $\lambda_4 = 1.10$, with development complete at 48 months. The underwriter expects an ultimate of $6{,}000$ with a standard deviation of $1{,}500$, and $\phi = 50$.
>
> > [!answer]-
> > - The prior has $\beta = M/\mathrm{Var}(x) = 6{,}000/1{,}500^2 = 0.002667$ and $\alpha = M\beta = 16$.
> > - The share emerged is $1/(2.00 \times 1.25 \times 1.10) = 1/2.75 = 0.3636$, and $\beta\phi = 0.1333$.
> > - The credibility weight is $Z = 0.3636/(0.1333 + 0.3636) = 0.7317$.
> > - The chain ladder mean of the next increment is $(2.00 - 1)(1{,}500) = 1{,}500$, and the BF mean is $(2.00 - 1)(6{,}000/2.75) = 2{,}181.8$.
> > - The next incremental payment is $E[C_{i2}] = 0.7317(1{,}500) + 0.2683(2{,}181.8) = 1{,}682.9$.
> > - The chain ladder reserve is $1{,}500 \times 1.75 = 2{,}625.0$, and the BF reserve is $6{,}000 \times (1 - 0.3636) = 3{,}818.2$.
> > - The reserve is $\hat R = 0.7317(2{,}625.0) + 0.2683(3{,}818.2) = 2{,}945.1$.
> > - The weight on the data is already $73\%$ at 12 months, well above BF's own $1/2.75 = 36\%$, because a $1{,}500$ standard deviation on $6{,}000$ is a weak prior. By 36 months, with $1/1.10 = 90.9\%$ emerged, $Z$ would be $0.9091/(0.1333 + 0.9091) = 0.872$.

## The strength of the prior

The strength of the prior moves the result along a spectrum from the chain ladder to BF. For a given $M_i$, a larger $\beta_i$ is a smaller prior variance and more certainty about $M_i$. That pushes $Z_{ij}$ toward $0$, which is the Bornhuetter-Ferguson method. A small $\beta_i$, a vague prior, pushes $Z_{ij}$ toward $1$, the chain ladder. Everything between is a complete spectrum of models. In Verrall's Taylor and Ashe illustration, a prior standard deviation of $1{,}000$ on means of $5.5$–$6$ million reproduced BF, and $1{,}000{,}000$ gave reserves between the two.

> [!example]- What is the Bayesian reserve for Verrall's accident year 10 with prior standard deviations of $1{,}000$ and $1{,}000{,}000$? {Example}
> Verrall's accident year 10 has one observed payment of $344{,}014$. The chain ladder factors multiply to $14.4466$, and its chain ladder reserve is $4{,}625{,}811$. The prior mean ultimate is $6{,}000{,}000$, and his program's plug-in scale parameter is $52.8615$ in thousands, so $\phi = 52{,}861.5$.
>
> > [!answer]-
> > - The share emerged is $1/14.4466 = 0.06922$.
> > - The BF reserve, which the precise prior should reproduce, is $6{,}000{,}000(1 - 0.06922) = 5{,}584{,}677$.
> > - With a standard deviation of $1{,}000$, $\beta = 6{,}000{,}000/1{,}000^2 = 6$, so $\beta\phi = 317{,}169$ and $Z \approx 0.0000002$.
> > - The reserve is the BF $5{,}584{,}677$. Verrall's Table 9 shows a simulated Bayesian mean of $5{,}587{,}000$.
> > - With a standard deviation of $1{,}000{,}000$, $\beta = 6 \times 10^{-6}$, so $\beta\phi = 0.3172$ and $Z = 0.06922/(0.3172 + 0.06922) = 0.1791$.
> > - The reserve is $\hat R = 0.1791(4{,}625{,}811) + 0.8209(5{,}584{,}677) = 5{,}412{,}899$.
> > - Table 10 shows $5{,}390{,}000$, between the chain ladder and BF as expected. The gap of under $0.5\%$ reflects simulation error and the way the program enters the prior, on the outstanding part of the ultimate.
> > - With a single payment to go on, even a prior as loose as $\pm 1$ million on $6$ million keeps about $82\%$ of the weight on the expert. Table 10's prediction error for the year falls to $20\%$, from the chain ladder's $43\%$.

## Implementation

The column parameters get improper priors and are estimated first, so they are the chain ladder's. The model is then rewritten as an [[Over-Dispersed Negative Binomial Model|over-dispersed negative binomial]] recursive down the rows, with mean $(\gamma_i - 1)\sum_{m<i} C_{m,j}$. Verrall's equation (5.4), as corrected in the errata, converts the prior values of $x_i$ into the $\gamma_i$. [[Markov Chain Monte Carlo|MCMC]] simulation in winBUGS gives the full [[Predictive Distribution|predictive distribution]], whose standard deviation is the [[Prediction Error|prediction error]].

What the model adds to deterministic BF is a prediction error and a predictive distribution, with the uncertainty in the a priori built in instead of ignored. Verrall notes the method can also be adapted so that the expert specifies the reserve rather than the ultimate.

> [!trap] Reading a larger $\beta$ as a weaker prior
> For a given $M_i$, a larger $\beta_i$ is a smaller prior variance, a stronger prior and a lower $Z_{ij}$, so the result moves toward BF. A small $\beta_i$ moves it toward the chain ladder.
