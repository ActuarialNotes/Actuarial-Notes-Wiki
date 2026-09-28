---
Title: "Obtaining Predictive Distributions for Reserves Which Incorporate Expert Opinion"
Authors: "R. J. Verrall"
Publisher: "Casualty Actuarial Society"
Year: "2007"
date: "2007"
Type: "Paper"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2021-03/7_Verrall.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0f81e3c8dbb5d7837c9fcf748edd308038d8720cf308fe4a886a0fad6686ad2b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Obtaining Predictive Distributions for Reserves Which Incorporate Expert Opinion (Verrall - 2007).md
---
![[Obtaining Predictive Distributions for Reserves Which Incorporate Expert Opinion (Verrall - 2007) - Cover.svg]]

A paper showing how expert opinion can be inserted into a stochastic framework for loss reserving, using Bayesian methods. The reserving methods are the chain-ladder and Bornhuetter-Ferguson, and the stochastic framework follows England and Verrall (2002). Taking ease of implementation and adaptability to user needs as the two main obstacles to the more frequent use of stochastic models, it describes in some detail an implementation in freely available software, with the programs supplied in an appendix. It was published in Variance, Volume 1, Issue 1 (2007), pages 53–80.

> [!info] On the syllabus
> - [[Exam 7 (CAS)|Exam 7]] — objectives A9 and A13; Variance, Vol. 1, Issue 1, 2007, including errata.

## 1 Introduction
- The stochastic approaches that have found most popularity are the simplest to implement: Mack's model and the [[Bootstrap|bootstrap]] can both be implemented in a spreadsheet.
- Intervention by the actuary — for example adjusting development factors after a change in the payment pattern, or for benefit limitations — tends to disrupt the assumptions made in the stochastic framework, and the only way to address this properly is the [[Bayesian|Bayesian]] approach.
- The [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] technique, which procures an estimate of each year's losses separately from background knowledge, is a second area where expert opinion is applied, and is clearly suited to a Bayesian approach.
- [[Markov Chain Monte Carlo|Markov chain Monte Carlo]] methods make Bayesian models easy to implement: they simulate the posterior distribution by drawing each parameter in turn from its conditional distribution given all the others, and the software package winBUGS is freely available.

## 2 Notation and basic methods
- The data is a triangle of incremental losses C_ij, for accident years i = 1, …, n; D_ij are the cumulative losses, and the chain-ladder development factors λ_j are estimated as volume-weighted ratios.
- No tail factor is applied, so the cumulative losses at the latest development year observed, D_in, are called "ultimate losses".
- The paper allows a separate development factor λ_i,j in each row, which the standard chain-ladder model sets equal to λ_j for all rows.
- The Bornhuetter-Ferguson method replaces the latest cumulative losses with M_i/(λ_n−i+2 ⋯ λ_n), where M_i is a value for the ultimate losses from expert knowledge, such as the premium calculation: it uses an external estimate of the "level" of each row, where the chain-ladder uses the data in that row.

> $$\hat\lambda_j = \frac{\sum_{i=1}^{n-j+1} D_{ij}}{\sum_{i=1}^{n-j+1} D_{i,j-1}}$$

## 3 Stochastic models for the chain-ladder technique
- Mack's model specifies only the first two moments of the cumulative losses, with conditional mean λ_j D_i,j−1 and variance σ²_j D_i,j−1, so it gives no predictive distribution. ([[Mack Chain Ladder Model|Mack's model]])
- Renshaw and Verrall's [[Over-Dispersed Poisson Model|over-dispersed Poisson]] model for incremental losses has mean m_ij with log(m_ij) = c + α_i + β_j; "over-dispersed" means that if X is Poisson(μ), Y = φX has E(Y) = φμ and V(Y) = φ²μ, and a quasi-likelihood approach frees the data from the positive integers.
- Written with mean x_i y_j and the y_k summing to 1, x_i is the expected ultimate losses of accident year i and y_j the proportion of ultimate losses that emerges in development year j; the model gives the same reserve estimates as the chain-ladder as long as the row and column sums are positive.
- Verrall's (2000) [[Over-Dispersed Negative Binomial Model|over-dispersed negative binomial]] model gives the same predictive distribution, recursively, with incremental mean (λ_j − 1)D_i,j−1 and variance φλ_j(λ_j − 1)D_i,j−1; its column sums must be positive, since λ_j < 1 would make the variance negative.
- A normal approximation keeps the mean but uses the variance φ_j D_i,j−1, dealing with negative incremental claims at the cost of another set of variance parameters, as in Mack's model.
- The mean squared error of prediction is the process variance plus the estimation variance; the [[Prediction Error|prediction error]] is its square root, and a Bayesian simulation gives the full [[Predictive Distribution|predictive distribution]], whose standard deviation is the prediction error.

> $$E[(y-\hat y)^2] \approx E[(y-E[y])^2] + E[(\hat y-E[\hat y])^2]$$

## 4 Incorporating expert opinion about the development factors
- Following Verrall and England (2005), the negative binomial model is given a development factor λ_i,j in each row, with prior distributions on the factors; setting λ_i,j = λ_j within each column, with vague priors, reproduces the chain-ladder technique.
- To intervene in a particular row — information implying that the second development factor should be 1.5 for rows 8, 9 and 10 — those rows share a factor whose prior has mean 1.5 and a variance W set to reflect the strength of the prior information, while the other factors get priors with large variances.
- To choose how many years of data to use, the rows are divided into the most recent five and the earlier ones, each with its own factors given large-variance priors, so that both are estimated from the data.
- The specific form of the prior (gamma, log-normal, etc.) is usually chosen so that the numerical procedures in winBUGS work as well as possible.

## 5 A Bayesian model for the Bornhuetter-Ferguson method
- Following Verrall (2004), the row parameters x_i of the over-dispersed Poisson model are given independent gamma priors, with mean M_i = α_i/β_i and variance M_i/β_i, so that for a given M_i a larger β_i means more certainty about M_i. ([[Bayesian Bornhuetter-Ferguson Model]])
- The mean of C_ij for the Bayesian model is a [[Credibility|credibility]] formula, a trade-off between the chain-ladder, (λ_j − 1)D_i,j−1, and the Bornhuetter-Ferguson, (λ_j − 1)M_i/(λ_j λ_j+1 ⋯ λ_n):

> $$Z_{ij} = \frac{\sum_{k=1}^{j-1} y_k}{\beta_i\varphi + \sum_{k=1}^{j-1} y_k}$$

- The larger β_i, the closer the result is to the Bornhuetter-Ferguson method; the smaller, the closer to the chain-ladder technique, with a complete spectrum of models between the two.
- The column parameters are estimated first, with improper priors, so their estimates are those implied by the chain-ladder; the result is an over-dispersed negative binomial model recursive in i rather than j, with mean (γ_i − 1)ΣC_m,j over the rows m above, and equations (5.4) convert the prior values of x_i into the new parameters γ_i.

## 6 Implementation
- The models are implemented in winBUGS on the Taylor and Ashe data, whose chain-ladder reserve is 18,680,856; the scale parameter φ is a plug-in estimate from the over-dispersed Poisson model fitted by maximum likelihood, rather than being given a prior.
- 6.1 Using the software
    - Thirteen steps install winBUGS, load the program, data and initial values, and run the simulations; with large prior variances for the row parameters the model reproduces the chain-ladder results, with prediction errors — the standard deviations of the simulated reserves — of 16% of the total reserve.
- 6.2 Intervention in the chain-ladder technique
    - The second development factor for rows 7–10 is given a prior with mean 1.5: with a large prior variance its estimate is 1.971, and with a prior standard deviation of 0.1 it is 1.673, drawn down towards the prior mean (the chain-ladder estimate is 1.7473, and rows 1–6 give 1.68).
    - The intervention changes the prediction errors considerably, but not as a percentage of the reserves, which is how the prediction error should be thought of.
    - Using only the three most recent years of data for each development factor (all the data for the last three) does not change the reserves greatly, and increases the prediction errors for most years.
- 6.3 The Bornhuetter-Ferguson method
    - Prior means for the row parameters of 5,500,000 (years 2–6) and 6,000,000 (years 7–10) with standard deviations of 1,000 reproduce the Bornhuetter-Ferguson reserves, adding prediction errors and a predictive distribution.
    - With the same means and standard deviations of 1,000,000, the reserves lie between the chain-ladder and Bornhuetter-Ferguson results, and the precision of the prior influences the prediction errors to a lesser extent.

## 7 Conclusions
- Expert opinion separate from the reserving data can be incorporated into the prediction intervals of a stochastic model, and the full predictive distribution, not just its first two moments, can be produced.
- The Bornhuetter-Ferguson approach can be adapted so that the reserve, rather than the ultimate losses, is specified; the same approach could be taken for other models, such as the Hoerl curve, allowing tail factors.

## Appendix
- The winBUGS code for the models of Section 6: (i) the Bornhuetter-Ferguson model of Section 5, used in Sections 6.1 and 6.3, with the prior means and standard deviations entered as data; and (ii) the model of Section 4, used in Section 6.2, with options for vague priors, the intervention in the second development factor, and the latest three years.

## Errata
- Page 63, equation 5.4 for γ_i: the summation sign in the numerator should be a product sign, so that it reads x_i(1 − 1/∏λ_k), the product running from k = n − i + 2 to n.
- Page 63, equation 5.4 for γ_i: the first sum in the denominator, ΣC_m,n for m = 1 to i − 1, should read ΣC_m,n−i+2.
- The corrected equation, for i = 3, …, n:

> $$\gamma_i = 1 + \frac{x_i\left(1 - \dfrac{1}{\prod_{k=n-i+2}^{n}\lambda_k}\right)}{\sum_{m=1}^{i-1} C_{m,n-i+2} + \sum_{k=n-i+3}^{n}\left[\left(\prod_{l=n-k+2}^{i-1}\gamma_l\right)\sum_{m=1}^{n-k+1} C_{m,k}\right]}$$

## Related readings
- [[Credible Claims Reserves: The Benktander Method (Mack - 2000)]] — cited in Section 5 for further background on the Bornhuetter-Ferguson method

## Sources
- [Obtaining Predictive Distributions for Reserves Which Incorporate Expert Opinion (Variance 1:1, 2007)](https://www.casact.org/sites/default/files/2021-03/7_Verrall.pdf) — the document: title, abstract and keywords, the text of Sections 1–7, Tables 2–10, the References and the Appendix code
- [Errata (Casualty Actuarial Society)](https://www.casact.org/sites/default/files/2021-03/7_Verrall_Errata.pdf) — the journal, volume, issue and year, and the two corrections under Errata
- [CAS Exam 7 Content Outline, Fall 2026](https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf) — the citation and the assigned scope
