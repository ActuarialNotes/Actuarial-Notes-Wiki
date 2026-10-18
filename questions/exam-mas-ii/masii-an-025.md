---
id: "masii-an-025"
exam: "Exam MAS-II"
topic: "Variable Selection"
learning_objective: "Linear Mixed Models"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Variable+Selection
  - Concepts/Likelihood+Ratio+Test
  - Concepts/Restricted+Maximum+Likelihood
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Fixed+Effects
  - Concepts/Linear+Mixed+Model
answer: "D"
points: 2
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:60ee6e63e8da3c77f5ec7173893546c470478b10d867dcfd5cf2dc34c3874590
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-ii/masii-an-025.md
---

An actuary models the annual loss ratios of 60 agencies over five years with a linear mixed model that has a random intercept for each agency. She wants to know whether AGENCY_SIZE (three levels: small, medium and large, with small as the reference level) is needed as a fixed effect. Both models below have the same random intercept and residual variance, and each is fitted to the same data by both REML and ML:

| Model | Fixed effects | $-2 \times$ REML log-likelihood | $-2 \times$ ML log-likelihood |
| :--- | :--- | ---: | ---: |
| Full | Intercept, YEAR, AGENCY_SIZE | 1,851.3 | 1,842.6 |
| Reduced | Intercept, YEAR | 1,861.1 | 1,847.2 |

Using a likelihood ratio test at the 5% significance level, which conclusion is correct?

- A) Keep AGENCY_SIZE: the REML test statistic, 9.8, exceeds 5.99, the 95th percentile of $\chi^2_2$
- B) Keep AGENCY_SIZE: the full model has the smaller $-2 \times$ log-likelihood under both methods
- C) Keep AGENCY_SIZE: the ML test statistic, 4.6, exceeds 3.84, the 95th percentile of $\chi^2_1$
- D) Drop AGENCY_SIZE: the ML test statistic, 4.6, is below 5.99, the 95th percentile of $\chi^2_2$
- E) Keep AGENCY_SIZE: the REML statistic, 9.8, is significant against a 50:50 mixture of $\chi^2_1$ and $\chi^2_2$

## Explanation

The two models differ in their **fixed effects**, so the test must use the **ML** log-likelihoods. The REML likelihood is the likelihood of the residuals left after the fixed effects are removed, so two models with different fixed effects have REML likelihoods for different transformations of the data, and the two values cannot be compared.

The test statistic is the difference in $-2 \times$ ML log-likelihoods:

$$
\lambda = 1{,}847.2 - 1{,}842.6 = 4.6
$$

A three-level factor with one reference level enters the model as two indicator variables, so the full model has **2** more fixed-effect parameters than the reduced one, and $\lambda$ is compared with $\chi^2_2$:

$$
\chi^2_{2,\,0.95} = 5.99, \qquad P(\chi^2_2 > 4.6) = e^{-4.6/2} = 0.100
$$

Since $\lambda = 4.6 < 5.99$ ($p = 0.100 > 0.05$), the test does not reject the reduced model. AGENCY_SIZE is **dropped**, and the reduced model would then be refitted by REML for its final covariance parameter estimates. The answer is **D**.

**Why not the others**

- **A** — uses the REML log-likelihoods to test fixed effects. The degrees of freedom and the critical value are right, but the statistic $\lambda_{\text{REML}} = 1{,}861.1 - 1{,}851.3 = 9.8$ compares likelihoods of two different sets of residuals and has no $\chi^2$ distribution. REML-based likelihood ratio tests are for covariance parameters, with the fixed effects held the same.
- **B** — judges by raw fit. Under ML, adding parameters to a nested model can never increase $-2 \times$ log-likelihood, so "smaller" is guaranteed and says nothing about whether the improvement is more than chance. The test asks whether the drop of 4.6 is large *for 2 parameters*.
- **C** — uses the right statistic with 1 degree of freedom, counting AGENCY_SIZE as one variable rather than the two indicator parameters it adds. Against $\chi^2_1$ the p-value would be 0.032, a false rejection.
- **E** — borrows the boundary rule for testing a variance component. A 50:50 mixture of $\chi^2$ distributions is used when the null hypothesis puts a covariance parameter on the boundary of its space (a random-effect variance of 0); fixed-effect coefficients have no boundary at 0, and the REML statistic is invalid here in any case.
