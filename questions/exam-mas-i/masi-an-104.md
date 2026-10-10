---
id: "masi-an-104"
exam: "Exam MAS-I"
topic: "Dispersion Parameter"
learning_objective: "Extended Linear Models"
difficulty: hard
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Dispersion+Parameter
  - Concepts/Exponential+Family
  - Concepts/Variance+Function
  - Concepts/Binomial+Distribution
  - Concepts/Gamma
  - Concepts/Tweedie+Distribution
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:74e1f566c6efe3e88b9f2e3cd92c2c7a6d75bddc2932bf9b2f5b2db9be5deb9d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-104.md
---

An actuary fits five GLMs and, for each, estimates the dispersion parameter as the Pearson chi-square statistic divided by its degrees of freedom. Every model has about 2,000 residual degrees of freedom. The binomial model's response is, for each agency and year, the number of policies renewed out of the number offered renewal.

For which model does the dispersion estimate indicate that the assumed response distribution does **not** describe the variability in the data?

- A) A Normal GLM with identity link for a loss ratio: $\hat\phi = 0.0225$
- B) A Gamma GLM with log link for claim severity: $\hat\phi = 1.45$
- C) A Poisson GLM with log link for claim counts: $\hat\phi = 1.04$
- D) A Tweedie GLM with log link for pure premium: $\hat\phi = 85$
- E) A binomial GLM with logit link for agency renewal counts: $\hat\phi = 3.1$

## Explanation

What $\phi$ means depends on the family, through $\text{Var}(Y) = \phi\,V(\mu)$:

- For the **Poisson** and **binomial**, the distribution fixes $\phi = 1$; an estimate well above 1 is **overdispersion** — more spread than the distribution permits.
- For the **Normal**, **Gamma** and **Tweedie**, $\phi$ is a free parameter of the distribution, estimated from the data; any positive value is legitimate.

So only **C** and **E** can signal a problem. In **C**, $\hat\phi = 1.04$ is close to 1, as expected when the Poisson holds. In **E**, the renewals in each agency are binomial counts out of many policies, and $\hat\phi = 3.1$ says their variance is about three times what the binomial allows — typically because renewal rates vary among policyholders within an agency in ways the predictors don't capture. The answer is **E**; a quasi-binomial fit (or a richer model) is needed, or the standard errors will be understated by a factor of about $\sqrt{3.1} = 1.76$.

**Why not the others**

- **A** — for a Normal response $\phi = \sigma^2$, so $\hat\phi = 0.0225$ says only that the loss ratio's standard deviation is $\sqrt{0.0225} = 0.15$.
- **B** — for a Gamma, $\phi$ is the squared coefficient of variation; $\hat\phi = 1.45$ means a CV of $\sqrt{1.45} = 1.20$, an ordinary value for severity. Reading "$\phi > 1$" as overdispersion is a Poisson rule applied to the wrong family.
- **C** — with about 2,000 degrees of freedom, the Pearson statistic over its degrees of freedom has a standard deviation of roughly $\sqrt{2/2{,}000} = 0.03$, so 1.04 is within sampling error of the Poisson's $\phi = 1$.
- **D** — the Tweedie's $\phi$ is a scale on the amounts' own units; a large number reflects the size of pure premiums, not a misspecified variance.
