---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-11
  last_checked_by: agent:validate-v1
  content_hash: sha256:77186ee4e01258ab53cd775a94a6fafc663d0c3db785785b0393921d3c0211e4
  sources:
    - "Mack, Measuring the Variability of Chain Ladder Reserve Estimates, CAS Forum Spring 1994, assumptions (3)-(5) pp. 109-113, formulas (6)-(9) pp. 115-117, formula (11) p. 120, Appendices D and F pp. 150-154 (PDF 9-20, 50-54), sha256:f20a3d7ff26247fb26839073418b918b9823e6908829f9ae8f889f636e1a9da5 — https://www.casact.org/sites/default/files/2021-03/7_Mack_1994.pdf"
    - "Verrall, Variance 1(1) 2007, Sections 1, 3, 5, 6.1 (pp. 53-60, 61-63, 65-66; PDF 1-8, 9-11, 13-14), sha256:da4a19ac50ec7756ad651c5632e73b71ff99f584d7db436772f94de1ec024506 — https://www.casact.org/sites/default/files/2021-03/7_Verrall.pdf"
    - "Taylor and McGuire, CAS Monograph 3 (2016), Sections 2.1.2, 3.2-3.3, 4.1-4.5, 5.2-5.4, 7 headings (pp. 10, 24-33, 35-41, 44-55; PDF 20, 34-43, 45-51, 54-65), sha256:d9ca082d0e8e8c0ed514e5e526cf0372cc457f4b5c94e4ff774cd6fc9e24249a — https://www.casact.org/sites/default/files/2021-03/7_Taylor.pdf"
    - "Clark, LDF Curve-Fitting and Stochastic Reserving, CAS Forum Fall 2003, Sections 2.3-2.4 (PDF 13-14) and the LDF/Cape Cod examples, pp. 65 and 69 (PDF 25, 29), sha256:1db0baa8ca6aef6711e6483601de5be6e180f016b1110a7fb0e49765c0953b9e — https://www.casact.org/sites/default/files/2021-03/7_Clark.pdf"
    - "Shapland, CAS Monograph 4 (2016), Sections 1, 3.2-3.4, 4.1.1, 5.5.1, 6, 6.1 (pp. 1-3, 8-19, 21-22, 41-49; PDF 9-11, 16-27, 29-30, 49-57), sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Prediction Error.md
---
The **Prediction Error** of a reserve is the root mean squared error of the estimate $\hat R$ as a forecast of the unpaid amount $R$ that will actually be paid. It combines the randomness of future payments, process risk, with the error in the estimated parameters, [[Parameter Risk|parameter risk]]. The prediction error is

> $$\mathrm{PE}(\hat R) = \sqrt{E\big[(R - \hat R)^2\big]}$$

Mack calls $\mathrm{PE}$ the **standard error** of the reserve, and bootstrap output labels it the same way. Dividing it by the mean gives the [[Coefficient of Variation|coefficient of variation]].

Because the future payments are independent of the data that produced $\hat R$, the mean squared error is

> $$E\big[(R - \hat R)^2\big] = \underbrace{\mathrm{Var}(R)}_{\text{process}} + \underbrace{E\big[(\hat R - E[R])^2\big]}_{\text{parameter}}$$

- $\mathrm{Var}(R)$ is the process variance.
- $E\big[(\hat R - E[R])^2\big]$ is the parameter variance.

> [!example]- A reserve of $1{,}000$ has process and parameter standard deviations of $60$ and $45$. What are its prediction error and coefficient of variation? {Example}
> - The total variance is the sum of the two variances, $60^2 + 45^2 = 3{,}600 + 2{,}025 = 5{,}625$.
> - The prediction error is $\sqrt{5{,}625} = 75$.
> - The coefficient of variation is $75/1{,}000 = 7.5\%$.

Other models get the same two parts by different routes. Clark uses $\sigma^2 R$ for process variance and the information matrix for parameter variance. The ODP bootstrap gets both by simulation ([[Stochastic Reserving|stochastic reserving]]). A mean and a prediction error are turned into percentiles with an [[Unpaid Claim Distribution|unpaid claim distribution]].

## Mack's formula for the chain ladder

Mack (1993, 1994) gives the prediction error of the [[Chain Ladder Method|chain ladder]] reserve without assuming any distribution. It rests on three assumptions:

1. The expected development is proportional to the cumulative losses $C_{i,k}$, with factor $f_k$.
2. The accident years are independent.
3. $\mathrm{Var}(C_{i,k+1} \mid C_{i,k}) = C_{i,k}\,\sigma_k^2$.

Testing them is part of [[Data Diagnostic Analysis|data diagnostics]]. For accident year $i$ of $I$, with volume-weighted factors $\hat f_k$, the estimated mean squared error is

> $$\widehat{\mathrm{mse}}(\hat R_i) = \hat C_{i,I}^{2} \sum_{k=I+1-i}^{I-1} \frac{\hat\sigma_k^{2}}{\hat f_k^{2}}\; w_{i,k}$$

- $\hat C_{i,k}$ is the actual diagonal value at $k = I+1-i$ and the projected value beyond it.
- $w_{i,k}$ and $\hat\sigma_k^2$ are given below.

The weight is

> $$w_{i,k} = \frac{1}{\hat C_{i,k}} + \frac{1}{\sum_{j=1}^{I-k} C_{j,k}}$$

- $1/\hat C_{i,k}$ is the process variance term.
- $1/\sum_{j} C_{j,k}$ is the estimation, or parameter, variance term.

The variance parameter is

> $$\hat\sigma_k^{2} = \frac{1}{I-k-1}\sum_{j=1}^{I-k} C_{j,k}\left(\frac{C_{j,k+1}}{C_{j,k}} - \hat f_k\right)^{2}$$

The last $\hat\sigma_{I-1}^2$ cannot be estimated, so Mack extrapolates it as the smallest of $\hat\sigma_{I-2}^4/\hat\sigma_{I-3}^2$, $\hat\sigma_{I-3}^2$ and $\hat\sigma_{I-2}^2$.

> [!example]- What are the chain ladder reserve for accident year 3 and its Mack prediction error? {Example}
> Cumulative paid losses ($000s) are:
>
> | AY | 12 | 24 | 36 | 48 |
> | :--- | ---: | ---: | ---: | ---: |
> | 1 | 1,000 | 2,000 | 2,360 | 2,478 |
> | 2 | 1,200 | 2,300 | 2,800 | |
> | 3 | 1,100 | 2,300 | | |
> | 4 | 1,300 | | | |
>
> > [!answer]-
> > - The factors are $\hat f_1 = 6{,}600/3{,}300 = 2.000$, $\hat f_2 = 5{,}160/4{,}300 = 1.200$ and $\hat f_3 = 2{,}478/2{,}360 = 1.050$.
> > - The individual 12–24 ratios are $2.000$, $1.917$ and $2.091$, so $\hat\sigma_1^2 = \tfrac{1}{2}(0 + 8.333 + 9.091) = 8.712$.
> > - The 24–36 ratios are $1.180$ and $1.217$, so $\hat\sigma_2^2 = 0.800 + 0.696 = 1.496$.
> > - $\hat\sigma_3^2$ is extrapolated as the smallest of $1.496^2/8.712 = 0.257$, $8.712$ and $1.496$, which is $0.257$.
> > - The projection is $\hat C_{3,3} = 2{,}300 \times 1.2 = 2{,}760$ and $\hat C_{3,4} = 2{,}760 \times 1.05 = 2{,}898$, so $\hat R_3 = 598$.
> > - The $k = 2$ term is $\tfrac{1.496}{1.2^2}\left(\tfrac{1}{2{,}300} + \tfrac{1}{4{,}300}\right) = 0.0006931$.
> > - The $k = 3$ term is $\tfrac{0.257}{1.05^2}\left(\tfrac{1}{2{,}760} + \tfrac{1}{2{,}360}\right) = 0.0001831$.
> > - The mean squared error is $2{,}898^2 \times 0.0008762 = 7{,}359$, of which $4{,}501$ is process variance and $2{,}857$ parameter variance.
> > - The prediction error is $\sqrt{7{,}359} = 85.8$, so the reserve is $598 \pm 86$ thousand, a coefficient of variation of $14.3\%$.

## Prediction error of the total reserve

Every accident year is projected with the same $\hat f_k$, so their parameter errors are positively correlated. The total's mean squared error is therefore the sum of the years' mean squared errors plus a covariance term for each pair of years, and its prediction error is not the root sum of squares. Only the parameter error is shared across years, so the total's prediction error lies between the root sum of squares and the sum of the standard errors.

> [!example]- What is the prediction error of the total reserve of $2{,}714$? {Example}
> For the same triangle, the reserves and Mack standard errors by year are AY 2 $140 \pm 39.65$, AY 3 $598 \pm 85.78$ and AY 4 $1{,}976 \pm 183.86$. Mack's covariance terms sum to $10{,}043$.
>
> > [!answer]-
> > - The years' mean squared errors sum to $39.65^2 + 85.78^2 + 183.86^2 = 42{,}735$.
> > - Adding the covariance terms gives $42{,}735 + 10{,}043 = 52{,}777$.
> > - The prediction error is $\sqrt{52{,}777} = 229.7$, a coefficient of variation of $8.5\%$.
> > - Treating the years as independent would give $\sqrt{42{,}735} = 206.7$, and adding the standard errors would give $309.3$.
> > - The standard error rises toward the recent years, from $39.6$ to $183.9$, while the coefficient of variation falls, from $28\%$ to $9\%$. That is the shape [[Reasonableness Testing|reasonableness tests]] of reserve distributions expect.

> [!trap] Adding standard deviations instead of variances
> Process and parameter standard deviations are not added. Square each, add the variances, and take the square root: $60$ and $45$ give $75$, not $105$.
