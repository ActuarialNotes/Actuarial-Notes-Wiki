---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8be55fab2e7b525d1493c4d1823313e86b95eade34b4c8bd6cc1b71d31def3e0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Target Encoding.md
---

**Target Encoding** (mean encoding) replaces a [[High Dimensional Variables|high cardinality categorical variable]] with one numeric feature: each level's average response, credibility-weighted toward a complement by the level's volume and computed out-of-fold. A [[Generalized Linear Model|GLM]] can then use a variable such as aircraft make (over 40,000 levels) or [[Vehicle Make and Model|vehicle make and model]] without a one-hot column per level.

> $$x'_k = (1 - z_k) \times 1 + z_k \times \frac{\bar{y}_k}{\bar{y}}$$

> $$z_k = \frac{n_k}{n_k + \lambda} = \frac{1}{\lambda/n_k + 1}$$

- $n_k$ is level $k$'s volume (observations or exposure), $\bar{y}_k$ its mean response and $\bar{y}$ the overall mean, so $\bar{y}_k/\bar{y}$ is the level's **actual-versus-expected (AvE) ratio**. This multiplicative form shrinks the AvE toward $1$. The additive form shrinks $\bar{y}_k - \bar{y}$ toward $0$, $x'_k = z_k(\bar{y}_k - \bar{y})$, and the log form shrinks $\log(\bar{y}_k/\bar{y})$ toward $0$. In a log-link GLM the feature enters as $\beta_{te}\log x'_k$, a relativity of $(x'_k)^{\beta_{te}}$.
- **Where it comes from.** [[Regularization|Ridge regression]] on the HCCV's one-hot columns (the HCCV alone, Gaussian, identity link) gives level $k$ the coefficient $(\bar{y}_k - \bar{y})/(\lambda/n_k + 1)$. Target encoding reproduces that penalized fit in a single column, and the blend is a [[Bühlmann Credibility|credibility]] estimate, with $\lambda$ in the role of Bühlmann's $k$ (within-group over between-group variance). The difference is that $\lambda$ is **chosen by cross-validation**, not assumed optimal. A [[Generalized Linear Mixed Model|GLMM]] shrinks the same way by different statistical reasoning, and is a useful check.
- **No leakage.** For records in validation fold $f$, the encoding uses only the other folds' data; one final encoding on all training data serves the test set and production ([[Data Leakage]]).
- **The expected value and the complement.** Rather than the overall mean, use the **average GLM prediction** for the level's records, so the encoding picks up only what the other features miss. With a meaningful hierarchy (ZIP prefix, SIC major group), the parent level's encoding can serve as the [[Complement of Credibility|complement]]. The hierarchy must be meaningful for the target: a maker's average is a poor complement for its sport bikes if it also builds scooters.
- **Checks.** The fitted $\beta_{te}$ should be near $1$ if the credibility is right, and it rises with $\lambda$. Many software implementations use the raw mean with **no credibility**, or a different credibility curve, so read what the code does.
- **Other encodings** in the monograph: *grouping rare categories* into "Other", using domain knowledge; *frequency encoding*, each level's share of the data, which says nothing about the target but may itself predict; *hierarchical grouping*; and features built from experts' answers or from word embeddings reduced by [[Principal Components Analysis|PCA]].
- **Practical cautions.** Extreme encodings from one claim on tiny exposure need an ad hoc credibility adjustment and underwriter review. A value of $1$ can mean "lots of data, average" or "no data". A brand-new level has no encoding and should be referred, not rated at the average, which invites [[Adverse Selection|adverse selection]].

> [!example]- Encoding Three Vehicle Models {Example}
> Across the book, frequency is $0.050$. The credibility parameter chosen by cross-validation is $\lambda = 2{,}000$ car-years. Encode three vehicle models with the multiplicative formula:
>
> - Model A: $18{,}000$ car-years, $810$ claims
> - Model B: $500$ car-years, $50$ claims
> - Model C: $20$ car-years, $2$ claims
>
> Then find Model B's relativity if the encoded feature enters a log-link GLM as $\log x'$ with $\beta_{te} = 0.8$.
>
> > [!answer]-
> > Model B's frequency is $50/500 = 0.10$, so its AvE is $2.00$. Model A's is $810/18{,}000 = 0.045$, an AvE of $0.90$. Model C's is $2/20 = 0.10$, also an AvE of $2.00$.
> >
> > $$
> > \begin{align*}
> > z_A &= \frac{18{,}000}{18{,}000 + 2{,}000} \\
> > &= 0.90 \\[4pt]
> > x'_A &= 0.10(1) + 0.90(0.90) \\
> > &= 0.910 \\[4pt]
> > z_B &= \frac{500}{500 + 2{,}000} \\
> > &= 0.20 \\[4pt]
> > x'_B &= 0.80(1) + 0.20(2.00) \\
> > &= 1.200 \\[4pt]
> > z_C &= \frac{20}{20 + 2{,}000} \\
> > &= 0.0099 \\[4pt]
> > x'_C &= 0.9901(1) + 0.0099(2.00) \\
> > &= 1.010
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{Relativity}_B &= 1.200^{0.8} \\
> > &= e^{0.8 \ln 1.200} \\
> > &= 1.157
> > \end{align*}
> > $$
> >
> > B and C show the same AvE, but B's 500 car-years earn $20\%$ credibility while C's 20 earn about $1\%$. One-hot coding would have charged both $2.00$. A $\beta_{te}$ of $0.8$ damps every encoding. That is worth a look, since $\beta_{te}$ should sit near $1$ when the credibility is right. A larger $\lambda$ would raise it, but only worth doing if cross-validation performance holds up.

> [!example]- Overall Mean or GLM Prediction as the Expected? {Example}
> An aviation GLM already contains a fixed-wing/rotorcraft feature. A helicopter make has $1{,}000$ aircraft-years and $12$ accidents. The overall frequency is $4$ per $1{,}000$ aircraft-years, and the GLM's average prediction for this make's aircraft is $15$ per $1{,}000$. With $\lambda = 1{,}000$, encode the make both ways and say which to use.
>
> > [!answer]-
> > The credibility is $z = 1{,}000/(1{,}000 + 1{,}000) = 0.50$.
> >
> > $$
> > \begin{align*}
> > \text{AvE}_{\text{overall}} &= \frac{12}{4} \\
> > &= 3.00 \\[4pt]
> > x'_{\text{overall}} &= 0.50(1) + 0.50(3.00) \\
> > &= 2.00 \\[4pt]
> > \text{AvE}_{\text{GLM}} &= \frac{12}{15} \\
> > &= 0.80 \\[4pt]
> > x'_{\text{GLM}} &= 0.50(1) + 0.50(0.80) \\
> > &= 0.90
> > \end{align*}
> > $$
> >
> > Against the overall mean, the make looks twice as risky, but most of that is simply being a helicopter, which the GLM already charges for. Against the GLM's predictions, the make is somewhat *better* than other rotorcraft with its characteristics. Use the GLM-based expected (with out-of-fold predictions) when the encoding is fitted on top of the existing GLM. Simpler features pick up the main patterns first, and the encoded HCCV picks up only what they miss. The cost is an extra round of fitting.
