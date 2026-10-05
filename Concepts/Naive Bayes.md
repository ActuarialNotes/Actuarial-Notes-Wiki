---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:ee1c0dfd57b13c364065a858f87ad7cfbe4c0f14d430c8f5a47ab77fd8cb035d
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; MAS-I reading), §4.4.4 Naive Bayes — eq (4.29) within-class independence, eq (4.30) posterior, options for f_kj (normal / histogram / kernel density / class proportions), 'n not large enough relative to p', QDA with a diagonal class-specific covariance matrix, printed pp.154-156 (PDF pp.164-166); §4.4 priors as training proportions (PDF p.151); §4.4.2 threshold trade-off (printed p.150, PDF p.160), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list (James et al. Chapter 4, §§4.1-4.4, assigned to Section C), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Naive Bayes.md
---

**Naive Bayes** is a classifier that estimates the probability that an observation belongs to each class with [[Bayes Theorem]]. It assumes that, **within each class, the $p$ predictors are independent**, so each class's joint density factors into one-dimensional densities that are easy to estimate.

> $$f_k(\mathbf{x}) = f_{k1}(x_1)\,f_{k2}(x_2) \cdots f_{kp}(x_p)$$

> $$P(Y = k \mid X = \mathbf{x}) = \frac{\pi_k\,f_{k1}(x_1) \cdots f_{kp}(x_p)}{\sum_{l=1}^{K} \pi_l\,f_{l1}(x_1) \cdots f_{lp}(x_p)}$$

- $\pi_k$ is the **prior** probability of class $k$, usually estimated as the share of training observations in it. $f_{kj}$ is the density (or probability function) of predictor $j$ among observations in class $k$. The observation is assigned to the class with the largest posterior probability, or flagged when that probability passes a chosen threshold.
- **Estimating each $f_{kj}$.** For a quantitative predictor, assume $X_j \mid Y = k \sim N(\mu_{jk}, \sigma^2_{jk})$, or estimate the density non-parametrically with a [[Histogram]] or a [[Kernel Density Estimation|kernel density estimate]]. For a qualitative predictor, use the proportion of class-$k$ training observations at each level.
- **Why it works.** Estimating a $p$-dimensional joint density means estimating the associations between predictors, which takes a great deal of data. Assuming them away introduces some bias but reduces variance a lot ([[Bias-Variance Tradeoff]]). The method often does well, especially when $n$ is not large relative to $p$.
- It is one of the generative classifiers of ISLR §4.4, alongside [[Quadratic Discriminant Analysis]]. With normal $f_{kj}$, it amounts to QDA with a **diagonal** class covariance matrix.
- Results are summarised in a [[Confusion Matrix]] for a chosen threshold. Lowering the threshold catches more true positives at the cost of more false positives.

> [!example]- Fraud Referral From Three Claim Flags {Example}
> In training data, $4\%$ of claims are fraudulent. Within each class the flag rates are:
>
> | Flag | Fraud | Legitimate |
> | :--- | ---: | ---: |
> | Reported more than 30 days late | 0.45 | 0.10 |
> | Soft-tissue injury only | 0.60 | 0.25 |
> | Attorney retained before first notice | 0.30 | 0.05 |
>
> A new claim was reported late and is soft-tissue only, with no early attorney. Find the naive Bayes probability that it is fraudulent.
>
> > [!answer]-
> > The "no attorney" rates are $1 - 0.30 = 0.70$ for fraud and $1 - 0.05 = 0.95$ for legitimate claims.
> >
> > $$
> > \begin{align*}
> > \text{Fraud} &: 0.04 \times 0.45 \times 0.60 \times 0.70 = 0.00756 \\
> > \text{Legit} &: 0.96 \times 0.10 \times 0.25 \times 0.95 = 0.02280
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > P(\text{fraud} \mid \mathbf{x}) &= \frac{0.00756}{0.00756 + 0.02280} \\
> > &= 0.249
> > \end{align*}
> > $$
> >
> > At a $0.5$ threshold the claim is classed as legitimate. Its fraud probability is still about six times the $4\%$ prior, so a lower referral threshold would send it to the special investigations unit.

> [!example]- Mixing a Quantitative and a Qualitative Predictor {Example}
> Replace the late-report flag with the report lag in days, modelled as normal within each class: $N(40, 15^2)$ for fraud and $N(10, 8^2)$ for legitimate claims. Keep the soft-tissue rates ($0.60$ and $0.25$) and the $4\%$ prior, and leave the attorney flag out, so the model now has two predictors: report lag and soft-tissue. Find the fraud probability for a soft-tissue claim reported after $25$ days.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > f_{\text{F}}(25) &= \frac{1}{15\sqrt{2\pi}}\,e^{-\frac{1}{2}\left(\frac{25-40}{15}\right)^2} \\
> > &= 0.01613 \\[4pt]
> > f_{\text{L}}(25) &= \frac{1}{8\sqrt{2\pi}}\,e^{-\frac{1}{2}\left(\frac{25-10}{8}\right)^2} \\
> > &= 0.00860
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{Fraud} &: 0.04 \times 0.01613 \times 0.60 = 0.000387 \\
> > \text{Legit} &: 0.96 \times 0.00860 \times 0.25 = 0.002064 \\[4pt]
> > P(\text{fraud} \mid \mathbf{x}) &= \frac{0.000387}{0.000387 + 0.002064} \\
> > &= 0.158
> > \end{align*}
> > $$
> >
> > A density, not a probability, is used for the quantitative predictor. The common $dx$ cancels between numerator and denominator.
> >
> > The answer depends on which predictors are in the model, because every $f_{kj}$ multiplies in. Had the attorney flag stayed in, for a claim again with no early attorney, the products would pick up $0.70$ and $0.95$, giving $0.000271 / (0.000271 + 0.001960) = 0.121$.
