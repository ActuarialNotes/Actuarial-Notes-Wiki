---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:3201957d6e59114f866f534a6742ea5fba3c4589c41afdbd5897dd1295459183
  sources:
    - "CAS Exam PCPA Content Outline 2025 (v.8), PDF pp.1-5, sha256:e22ce369f08e1feec88b1ed8a9273c67fd585b1c62193ea3105fe1fe8077189f — https://www.casact.org/sites/default/files/2024-05/Exam_PCPA_2025_F_Content_Outlines.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., §2 GLM form, Tweedie and frequency/severity PDF pp.5-6, 32-35, 53-54; §4.3 PDF pp.48-52, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021, CAS-hosted copy), §2.1.4 supervised vs unsupervised PDF p.37, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "ASB, ASOP No. 23 Data Quality (Doc. 185, Dec 2016), §3.3 Review of Data, sha256:784c57a1379b189b234452dc7fe18d391ae86e7f5fb8815d14d35400eb3e7bdf — http://www.actuarialstandardsboard.org/wp-content/uploads/2017/01/asop023_185.pdf"
    - "ASB, ASOP No. 56 Modeling (Doc. 195, Dec 2019), §2.4 Hold-out Data, §2.12 Overfitting, §3.1, §3.6, sha256:f3e159300fde3ff3f9db4198eb6b0a660f182875b2cc47a2da92c2567b7bd799 — http://www.actuarialstandardsboard.org/wp-content/uploads/2020/01/asop056_195.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Predictive Analytics.md
---

**Predictive Analytics** is the practice of fitting a statistical model to historical data so that it can predict an outcome for cases it has not seen. The outcome may be the expected loss cost of a policy being quoted, the probability a claim turns litigated or the probability a customer renews. In P&C insurance the workhorse is the [[Generalized Linear Model|generalized linear model]], whose mean $\mu = E[Y]$ of the target $Y$ is

> $$g(\mu) = \beta_0 + \beta_1 x_1 + \cdots + \beta_p x_p$$

- $g$ is the [[Link Function|link function]], usually the log link for insurance pricing.
- $x_1, \ldots, x_p$ are the **predictors**, such as rating variables and policy or claim characteristics.
- $\beta_0, \ldots, \beta_p$ are the coefficients the model estimates.

The target may be a claim count, a claim severity, a pure premium or a yes/no event. **Supervised** methods, such as GLMs and decision trees, learn from a known target. **Unsupervised** methods, such as clustering, find structure with no target. Pricing and claims models are supervised.

> [!example]- A Poisson frequency model with a log link predicts 0.06 claims per car-year for a risk, and a gamma severity model with a log link predicts an average claim of $\$7{,}500$. What is the predicted pure premium? {Example}
> - The pure premium is the frequency times the severity.
> - It is $0.06 \times 7{,}500 = \$450$ per car-year.
> - Splitting the target lets each model use the distribution that suits it, counts for frequency and positive skewed amounts for severity.
> - A single [[Tweedie Distribution|Tweedie]] pure premium model is the one-model alternative.

## The modeling workflow

The workflow the CAS PCPA requirement is built around is:

1. Frame the **business problem**: the target, the unit of analysis and the decision the model feeds.
2. Select and review the data ([[Data Quality]]).
3. Explore it ([[Exploratory Data Analysis]]), fix [[Missing Data|missing values]] and [[Outlier|outliers]], and [[Variable Transformation|transform]] variables.
4. Split off a [[Holdout Sample|hold-out sample]].
5. Fit, diagnose and refine the model.
6. Validate it on data it has not seen.
7. Interpret and communicate the result.

A prediction is only as good as its out-of-sample performance. In-sample fit always improves as terms are added, so a model is judged on hold-out data or by [[Cross-Validation|cross-validation]] ([[Bias-Variance Tradeoff]]). In the US, two actuarial standards of practice govern the work: [[ASOP 23 - Data Quality (ASB - 2016)|ASOP No. 23]] (*Data Quality*) and [[ASOP 56 - Modeling (ASB - 2019)|ASOP No. 56]] (*Modeling*).

> [!example]- A commercial auto insurer asks for "a model of our worst accounts". What must be settled before any data is touched? {Example}
> - The **target**, because "worst" could mean the highest loss ratio, the highest claim frequency or the largest single loss, and each gives a different model.
> - The **unit of analysis**, which could be the policy, the vehicle or the policy-year.
> - The **decision** the model feeds, such as a rate change, an underwriting referral or a non-renewal, because it fixes how the output must be presented and which variables may lawfully be used.
> - The **validation**, the hold-out data that will show the model works.
