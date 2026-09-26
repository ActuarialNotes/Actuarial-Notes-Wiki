---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7c4c3750257a2748e52f8ea459bf7ec286278a4c777d4486eb47eae6a6498639
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Rating Variable.md
---

**Rating Variable** is a characteristic of the insured, the insured object or the coverage — driver age, territory, construction, payroll class, deductible — whose level decides which [[Rating Factors|rating factor]] a risk receives. Together, the rating variables define the [[Rating Class|rating classes]].

> $$\text{Rate}_i = B \times \prod_{k=1}^{K} R_k(v_{ik})$$

> $$B_{\text{new}} = B_{\text{old}} \times \frac{\bar{R}_{\text{old}}}{\bar{R}_{\text{new}}}$$

- $v_{ik}$ is risk $i$'s level of variable $k$, $R_k$ that level's factor and $B$ the base rate. $\bar R$ is the exposure-weighted average factor across the book, and the second formula is the base-rate off-balance that keeps the overall rate level unchanged when a variable's factors are revised.
- **What makes a good variable.** It must be statistically related to expected losses; a causal story strengthens the case, but ASOP No. 12 does not require one. It should be objective and hard to manipulate, practical to collect and verify, and legal ([[Risk Classification Restrictions]], [[Unfair Discrimination]]) and socially acceptable. See the Werner criteria under [[Classification Ratemaking]].
- **Form in a model.** A continuous variable may be transformed, binned or fitted with polynomials or splines. A categorical one uses the levels of a [[Categorical Predictor|categorical predictor]], possibly with [[Interaction|interactions]]. Variables with hundreds of levels need grouping, credibility (random effects) or a separate model — see [[High Dimensional Variables]] and [[Workers Compensation Classification]].
- **Evaluating a model's variables.**
  - *Benchmark:* compare against the current plan or a competing model, for example with a [[Double Lift Chart|double lift chart]] ([[Model Benchmarking]]).
  - *Recalibrate:* refresh the coefficients on newer data while keeping the structure. Models lose accuracy as the world changes, so they are also rebuilt periodically.
  - *Implement:* the variable must be obtainable at the point of sale, and the resulting factors are capped, rounded, off-balanced and checked for dislocation ([[Model Implementation]]).
- **Coverage options** (deductible, limit) are variables the insured *chooses*. Their factors belong outside the fitted model, set by loss elimination and entered as offsets, so that selection effects do not leak into them.

> [!example]- Should Self-Reported Mileage Be a Rating Variable? {Example}
> A personal auto insurer finds that self-reported annual mileage is strongly predictive in its GLM. Evaluate it as a rating variable.
>
> > [!answer]-
> > - **Actuarial:** it passes. Exposure to driving plausibly drives loss frequency, the signal is statistically significant, and it is not already captured by other variables.
> > - **Operational:** this is the weak point. The insured reports the figure, has every reason to under-report it, and the insurer cannot cheaply verify it. A variable the insured controls *by statement* is manipulable. That erodes the factor over time, as low-mileage declarations rise without losses following.
> > - **Social:** it passes. The variable is controllable by the insured, causally intuitive and not a proxy for a protected class.
> > - **Legal:** it is generally permitted, subject to local rules.
> >
> > Adopt it only in a verifiable form — odometer readings at renewal or telematics — or with a moderated factor and audit rights. A strong model coefficient does not by itself make a usable rating variable.

> [!example]- Recalibrating One Variable Without Changing the Rate Level {Example}
> Vehicle-age factors are refitted on newer data. New vehicles (base) stay at $1.00$ with $30\%$ of exposure. Ages 3–7 move from $0.88$ to $0.92$ ($45\%$), and ages 8+ move from $0.80$ to $0.85$ ($25\%$). Hold the overall rate level constant. Find the base-rate adjustment and each level's premium change.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \bar{R}_{\text{old}} &= 0.30 + 0.45(0.88) + 0.25(0.80) \\
> > &= 0.8960 \\[4pt]
> > \bar{R}_{\text{new}} &= 0.30 + 0.45(0.92) + 0.25(0.85) \\
> > &= 0.9265 \\[4pt]
> > \frac{B_{\text{new}}}{B_{\text{old}}} &= \frac{0.8960}{0.9265} \\
> > &= 0.9671
> > \end{align*}
> > $$
> >
> > The premium changes by level are:
> >
> > - New vehicles: $0.9671 - 1 = -3.3\%$
> > - Ages 3–7: $\tfrac{0.92}{0.88} \times 0.9671 - 1 = +1.1\%$
> > - Ages 8+: $\tfrac{0.85}{0.80} \times 0.9671 - 1 = +2.8\%$
> >
> > Weighted by current premium, these net to zero. A "revenue-neutral" recalibration still moves individual premiums: new-vehicle owners get a decrease they did not earn through their own factor. That dislocation is what gets reviewed before implementation.
