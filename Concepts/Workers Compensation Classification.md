---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:777dea8a7b95026fa22159f9e94d722b6e7fd6951ad12cbf0b9739f18ff1e6be
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Workers Compensation Classification.md
---

**Workers Compensation Classification** assigns each employer to one or more payroll classifications describing its business, and charges a manual rate per $\$100$ of payroll for each class. In the United States the classes are maintained by rating bureaus such as NCCI. With hundreds of thinly populated levels, the class is the textbook high-dimensional rating variable.

> $$\text{Manual Premium} = \sum_{c} \frac{\text{Payroll}_c}{100} \times \text{Rate}_c$$

> $$\widehat{\text{LC}}_c = Z_c\,\text{LC}_c + (1 - Z_c)\,\text{LC}_{\text{group}}$$

- $\text{LC}_c$ is class $c$'s indicated loss cost per $\$100$ of payroll, $\text{LC}_{\text{group}}$ that of the broader group it belongs to, and $Z_c$ the class's [[Credibility|credibility]].
- **How employers are classified.** By the employer's *business* — the governing classification — rather than each worker's occupation. A short list of standard exceptions, such as clerical office employees and outside salespersons, is rated separately. Payroll is the [[Exposure Base|exposure base]]: it tracks the exposure, moves with wage inflation, and is verified by [[Premium Audit|premium audit]]. Classifying by business also stops payroll from being shifted into cheaper classes.
- **Why it is high-dimensional.** Robertson (2009) put the count at about 800 classes in NCCI states, many of them small. Their loss costs are dominated by rare, severe injuries (fatal, permanent total, major permanent partial), so raw class estimates are volatile. There are four ways to deal with that:
  - *Credibility-weight* each class toward its group, as in the formula above.
  - Use *multi-dimensional credibility* across injury types, estimating a class's rare serious-injury frequencies from its correlated, more common types (Couret and Venter).
  - Treat class as a random effect in a GLMM, whose shrinkage is the [[Bühlmann-Straub Credibility|Bühlmann–Straub]] blend ([[Random Effects]]).
  - *[[Clustering|Cluster]]* the classes.
- **Hazard groups.** NCCI moved to seven hazard groups in 2007, assigning classes by weighted [[K-Means Clustering|k-means]] on credibility-weighted vectors of excess ratios at five loss limits, from $\$100$K to $\$5$M (Robertson). Hazard groups set the excess loss factors used for retrospective-rating loss limits and large deductibles. The class sets the manual rate, and [[Experience Rating|experience rating]] captures the differences between employers *within* a class.
- In Canada, workers compensation is run by provincial boards that assess employers by industry rate group. See [[Workers Compensation Insurance]].

> [!example]- Manual Premium Across Two Classes {Example}
> A framing contractor has $\$2{,}000{,}000$ of carpentry payroll at a (hypothetical) rate of $\$9.50$ per $\$100$ and $\$300{,}000$ of clerical office payroll at $\$0.25$. Compute the manual premium, and explain why the carpentry crew's supervisor cannot be reported as clerical.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Carpentry} &= \frac{2{,}000{,}000}{100} \times 9.50 \\
> > &= \$190{,}000 \\[4pt]
> > \text{Clerical} &= \frac{300{,}000}{100} \times 0.25 \\
> > &= \$750 \\[4pt]
> > \text{Manual premium} &= \$190{,}750
> > \end{align*}
> > $$
> >
> > The clerical exception covers only employees confined to clerical office work. A supervisor who is exposed to the job site belongs to the governing class. Otherwise any employer could cut its premium by $97\%$ per dollar of payroll ($0.25$ against $9.50$) by relabelling staff. The audit exists to enforce this.

> [!example]- Estimating a Thin Class's Loss Cost {Example}
> A small class shows an indicated loss cost of $\$3.20$ per $\$100$ of payroll, based on $\$400{,}000$ of expected losses. Its industry group's loss cost is $\$2.40$. Credibility is $Z = E/(E + K)$ with $K = \$600{,}000$. Estimate the class loss cost.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > Z &= \frac{400{,}000}{400{,}000 + 600{,}000} \\
> > &= 0.40 \\[4pt]
> > \widehat{\text{LC}} &= 0.40(3.20) + 0.60(2.40) \\
> > &= \$2.72
> > \end{align*}
> > $$
> >
> > The class keeps $40\%$ of its apparent excess over the group. A large class with the same indication would keep most of it, and a GLMM with class as a random effect would shrink it by the same logic. If this class's excess ratios also differed from its group's, the hazard group assignment would be revisited too, because excess loss potential and loss cost per payroll are separate questions.
