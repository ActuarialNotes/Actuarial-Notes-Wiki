---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c78c534b7f55fa23ec2f14bfe03fce2e9d6244e0888543d2c8419762a08c29e1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Credibility Theory.md
---

![[Media/Figures/Credibility_Theory.svg|340]]

**Credibility Theory** is the set of methods for weighting a risk's observed experience against a broader expectation, so that an estimate uses the risk's own data as far as that data is reliable. Every method gives an estimate of the form

> $$U = Z D + (1 - Z) M$$

- $D$ is the observed experience.
- $M$ is the [[Complement of Credibility|complement of credibility]], such as a class mean, industry data or a manual rate.
- $Z$ is the [[Credibility|credibility]], between 0 and 1.

The methods differ in how they choose $Z$.

> [!example]- A class's observed pure premium is 250, the manual pure premium is 200, and its credibility is $0.40$. What is the credibility-weighted pure premium? {Example}
> - The estimate is $0.40(250) + 0.60(200) = 100 + 120 = 220$.

## Limited fluctuation credibility

[[Limited Fluctuation Credibility|Limited fluctuation credibility]] gives full credibility once the experience reaches a [[Full Credibility Standard|full credibility standard]] $n_F$, and below it uses the square-root rule:

> $$Z = \min\left(\sqrt{\frac{n}{n_F}},\; 1\right)$$

- $n$ is the volume of the experience, in the same unit as $n_F$.

> [!example]- A rating class has 300 claims, and the full credibility standard is 1,082 claims. What is its limited fluctuation credibility? {Example}
> - $Z = \sqrt{300/1{,}082} = \sqrt{0.277} = 0.527$.

## Greatest accuracy credibility

[[Bühlmann Credibility|Bühlmann (greatest accuracy) credibility]] chooses $Z$ to minimize the expected squared error of the estimate. With $n$ observations, the credibility is

> $$Z = \frac{n}{n + k}$$

- $k = v/a$, the [[Expected Value of Process Variance|expected value of the process variance]] $v$ divided by the [[Variance of Hypothetical Means|variance of the hypothetical means]] $a$.

> [!example]- A risk has 3 years of experience, with $v = 400$ and $a = 100$. What is its Bühlmann credibility? {Example}
> - $k = 400/100 = 4$.
> - $Z = 3/(3 + 4) = 0.429$.

## Bayesian credibility

[[Bayesian Credibility|Bayesian credibility]] takes the estimate to be the mean of the risk's hypothetical mean given its experience, $E[\mu(\Theta) \mid X_1, \ldots, X_n]$, computed from the [[Posterior Distribution|posterior distribution]] of the risk parameter $\Theta$. It is not of the form $Z D + (1 - Z) M$ in general. When it is, it equals the Bühlmann estimate, and the credibility is called [[Exact Credibility|exact]].
