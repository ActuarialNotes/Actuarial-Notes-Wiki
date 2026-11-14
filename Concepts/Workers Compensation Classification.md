---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-17
  last_checked_by: agent:validate-v1
  content_hash: sha256:ed9a9b45c2d5b365d31a00a8c90b3158cfaf8e4fdc21377a2747fd4d565cd379
  sources:
    - "Robertson, NCCI's 2007 Hazard Group Mapping (Variance 3:2, 2009), abstract, §1, Tables 3-4, PDF pp.1-2, 7-9, sha256:458f17d0e4279114ba2c895fd4c7a5bf58de1ebf82fbd27d60ef08af120e3d4b — https://www.casact.org/sites/default/files/2021-07/NCCI-2007-Hazard-Robertson.pdf"
    - "Couret & Venter, Using Multi-Dimensional Credibility to Estimate Class Frequency Vectors in Workers Compensation (ASTIN Bulletin 38(1), 2008), PDF pp.1-3, sha256:ce50d8a0fbc395621d29dd153836b0303a269d94697bb1932b5f334b47ebba18 — https://www.casact.org/sites/default/files/2021-03/8_Couret_Venter.pdf"
    - "Chalk et al., From GLMs to Comprehensive Insurance Pricing: Techniques and Challenges, CAS Monograph 16, 1st ed., §6.4.1 fn.33, PDF p.92, sha256:0b293634c3d6320eac9aca5d2f8ba4ca7954f20db8a462b24771c60b5e046d74 — https://www.casact.org/sites/default/files/2026-02/CAS_Monograph-16_From_GLMs.pdf"
    - "Bahnemann, Distributions for Actuaries, CAS Monograph 2 (2015), Ch.6 intro, PDF p.174, sha256:d4d172f9646852ab018ae3f0df95e5fbdbfabda4db55d6d4596977ed2eaa3ef8 — https://www.casact.org/sites/default/files/2021-03/8_Bahnemann.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §10.1, PDF pp.105-106, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Workers Compensation Classification.md
---

A **Workers Compensation Classification** is a payroll class describing an employer's business, with a manual rate per $\$100$ of payroll. Each employer is assigned to one or more classifications, which in the United States are maintained by rating bureaus such as NCCI.

An employer's manual premium is

> $$\text{Manual Premium} = \sum_{c} \frac{\text{Payroll}_c}{100} \times \text{Rate}_c$$

- $\text{Payroll}_c$ is the employer's payroll in class $c$.
- $\text{Rate}_c$ is class $c$'s manual rate per $\$100$ of payroll.

The class sets the manual rate, and [[Experience Rating|experience rating]] captures the differences between employers *within* a class.

> [!example]- What is this framing contractor's manual premium, and can the carpentry crew's supervisor be reported as clerical? {Example}
> The contractor has $\$2{,}000{,}000$ of carpentry payroll at a (hypothetical) rate of $\$9.50$ per $\$100$, and $\$300{,}000$ of clerical office payroll at $\$0.25$.
>
> > [!answer]-
> > - The carpentry premium is $2{,}000{,}000/100 \times 9.50 = \$190{,}000$.
> > - The clerical premium is $300{,}000/100 \times 0.25 = \$750$.
> > - The manual premium is $\$190{,}750$.
> > - The clerical exception covers only employees confined to clerical office work. A supervisor who is exposed to the job site belongs to the governing class.
> > - Otherwise any employer could cut its premium by 97% per dollar of payroll ($0.25$ against $9.50$) by relabelling staff. The audit exists to enforce this.

## Assigning an employer to classes

An employer is classified by its *business*, the governing classification, rather than by each worker's occupation. A short list of standard exceptions, such as clerical office employees and outside salespersons, is rated separately. Classifying by business also stops payroll from being shifted into cheaper classes.

Payroll is the [[Exposure Base|exposure base]]. It tracks the exposure, moves with wage inflation, and is verified by [[Premium Audit|premium audit]].

## Estimating a thin class's loss cost

Robertson (2009) put the count at about 800 classes in NCCI states, many of them small. Their loss costs are dominated by rare, severe injuries (fatal, permanent total, major permanent partial), so raw class estimates are volatile. With hundreds of thinly populated levels, the class is the textbook high-dimensional rating variable.

Weighting a class's own indication against its group's, the estimated loss cost of class $c$ is

> $$\widehat{\text{LC}}_c = Z_c\,\text{LC}_c + (1 - Z_c)\,\text{LC}_{\text{group}}$$

- $\text{LC}_c$ is class $c$'s indicated loss cost per $\$100$ of payroll.
- $\text{LC}_{\text{group}}$ is the loss cost of the broader group it belongs to.
- $Z_c$ is the class's [[Credibility|credibility]].

> [!example]- What is the estimated loss cost of this thin class? {Example}
> A small class shows an indicated loss cost of $\$3.20$ per $\$100$ of payroll, based on $\$400{,}000$ of expected losses. Its industry group's loss cost is $\$2.40$. Credibility is $Z = E/(E + K)$ with $K = \$600{,}000$.
>
> > [!answer]-
> > - $Z = 400{,}000/(400{,}000 + 600{,}000) = 0.40$.
> > - $\widehat{\text{LC}} = 0.40(3.20) + 0.60(2.40) = \$2.72$.
> > - The class keeps 40% of its apparent excess over the group. A large class with the same indication would keep most of it.

Credibility-weighting each class toward its group is one of four ways to deal with thin classes:

1. Credibility-weight each class toward its group, as above.
2. Use multi-dimensional credibility across injury types, estimating a class's rare serious-injury frequencies from its correlated, more common types (Couret and Venter).
3. Treat class as a random effect in a GLMM, whose shrinkage is the [[Bühlmann-Straub Credibility|Bühlmann–Straub]] blend ([[Random Effects]]).
4. [[Clustering|Cluster]] classes with similar loss characteristics into a few groups, as NCCI's hazard groups do.

## Hazard groups

NCCI moved to seven hazard groups in 2007, assigning classes by weighted [[K-Means Clustering|k-means]] on credibility-weighted vectors of excess ratios at five loss limits, from $\$100$K to $\$5$M (Robertson). Classes in a hazard group share the same excess loss factors, which NCCI uses in class ratemaking and in pricing loss limits on retrospectively rated policies. Excess loss potential and loss cost per $\$100$ of payroll are separate questions, so a class whose excess ratios differ from its group's has its hazard group assignment revisited.

In Canada, workers compensation is run by provincial boards that assess employers by industry rate group ([[Workers Compensation Insurance]]).

> [!trap] Classifying each worker by occupation
> The employer's governing classification covers all its employees except the standard exceptions. Only employees confined to clerical office work fall under the clerical exception, so a supervisor exposed to the job site is rated in the governing class.
