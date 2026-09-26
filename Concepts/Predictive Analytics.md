---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:fcea13bed23cdfb7f16fb9015c6068699857f548b82d36e8e1a7546b726c0b07
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Predictive Analytics.md
---

**Predictive Analytics** is the practice of fitting a statistical model to historical data so that it can predict an outcome for cases it has not seen — the expected loss cost of a policy being quoted, the chance a claim turns litigated, the probability a customer renews. In P&C insurance the workhorse is the [[Generalized Linear Model]], and the discipline is as much about the data and the communication around the model as about the fit itself.

> $$\hat{y} = \hat{f}(\mathbf{x})$$
>
> $$g\big(E[Y \mid \mathbf{x}]\big) = \beta_0 + \beta_1 x_1 + \cdots + \beta_p x_p$$

- $Y$ is the **target** (response) — claim count, claim severity, pure premium, a yes/no event; $\mathbf{x}$ are the **predictors** (rating variables, policy and claim characteristics); $\hat{f}$ is the fitted model. The second line is the GLM form of $\hat{f}$, with [[Link Function|link]] $g$
- The workflow the CAS PCPA requirement is built around: frame the **business problem** → select and review the data ([[Data Quality]]) → explore it ([[Exploratory Data Analysis]]), fix [[Missing Data|missing values]] and [[Outlier|outliers]], [[Variable Transformation|transform]] variables → split off a [[Holdout Sample|hold-out sample]] → fit, diagnose and refine the model → validate on data it has not seen → interpret and communicate the result
- **Supervised** methods (GLMs, trees) learn from a known target; **unsupervised** methods (clustering) find structure with no target. Pricing and claims models are supervised
- A prediction is only as good as its out-of-sample performance: in-sample fit always improves as terms are added, so a model is judged on hold-out data or by [[Cross-Validation]] (see [[Bias-Variance Tradeoff]])
- In the US, two actuarial standards of practice govern the work: [[ASOP 23 - Data Quality (ASB - 2016)|ASOP No. 23]] (*Data Quality*) and [[ASOP 56 - Modeling (ASB - 2019)|ASOP No. 56]] (*Modeling*)

> [!example]- Building a Pure Premium from Two Models {Example}
> A frequency model (Poisson, log link) predicts $0.06$ claims per car-year for a risk, and a severity model (Gamma, log link) predicts an average claim of $\$7{,}500$. What is the predicted pure premium, and why fit two models rather than one?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Pure premium} &= \text{Frequency} \times \text{Severity} \\
> > &= 0.06 \times 7{,}500 \\
> > &= \$450 \text{ per car-year}
> > \end{align*}
> > $$
> > Splitting the target lets each model use the distribution that suits it (counts vs. positive, skewed amounts) and shows *why* a risk is expensive — a variable can drive frequency without moving severity. A single [[Tweedie Distribution|Tweedie]] pure-premium model is the one-model alternative.

> [!example]- Framing the Business Problem {Example}
> A commercial auto insurer asks for "a model of our worst accounts." Before any data is touched, what must be settled?
>
> > [!answer]-
> > The **target** — "worst" could mean highest loss ratio, highest claim frequency, or largest single loss, and each gives a different model. The **unit of analysis** — policy, vehicle, or policy-year. The **decision** the model feeds — a rate change, an underwriting referral, a non-renewal — which fixes how the output must be presented and which variables may lawfully be used. And the **validation** — what hold-out data will show the model works. Settling these first is what makes the rest of the project answerable.
