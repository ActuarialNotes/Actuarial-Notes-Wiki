**Credibility** $Z$ is a weight between 0 and 1 assigned to observed experience data, with the complement $(1-Z)$ assigned to a prior expectation or industry complement, producing a blended estimate.

> $$\text{Estimate} = Z \times \text{Actual} + (1-Z) \times \text{Expected} \qquad Z_{\text{partial}} = \sqrt{\frac{n}{n_{\text{full}}}}$$

- Full credibility ($Z = 1$) is assigned when the observed claim count meets a threshold sufficient for the desired confidence level — the classical standard is $1{,}082$ claims for pure frequency
- Partial credibility uses the square root rule: $Z = \sqrt{n / n_{\text{full}}}$, so a class with one-quarter the required claims receives $Z = 0.50$
- The complement of credibility is typically industry data, a prior indication, or manual rates — its selection materially affects the result when $Z$ is low

> [!example]- Class Credibility Weighting {Example}
> A workers comp class has $75$ claims. Full credibility standard is $1{,}082$ claims. Indicated relativity $= 1.25$; current (manual) relativity $= 1.00$.
>
> > [!answer]-
> > $$Z = \sqrt{75/1{,}082} = \sqrt{0.0693} = 0.263$$
> > $$\text{Credibility-weighted relativity} = 0.263 \times 1.25 + 0.737 \times 1.00 = 1.066$$
