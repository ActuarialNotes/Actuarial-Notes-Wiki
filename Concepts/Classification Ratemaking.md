---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:0f39122554aea51013f4d8a8f42bb46eea6ea9715946e74f2f67366e05bd2a1c
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.9 printed pp.155-168 (PDF 167-180) criteria, pure premium, loss ratio and adjusted pure premium approaches; App. E pp.E-1 to E-4 (PDF 409-414), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Actuarial Standards Board, ASOP No. 12, Risk Classification (for All Practice Areas), Doc. No. 132 (Dec. 2005), §3.2.1-3.2.7, §3.3.1-3.3.4 pp.3-5 (PDF 9-11); Appendix 1 p.8 (PDF 14), sha256:7d4f2631a589bac24cf34b1f622e95aa7bfa979aaca96de27c651099c0b12dc7 — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop012_132.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Classification Ratemaking.md
---

![[Media/Figures/Classification_Ratemaking.svg|340]]

**Classification Ratemaking** is the segmentation of a book into rating classes and the derivation of **relativities**, the factors by which each class's rate differs from the base class, so that each risk pays according to its own expected cost. Under the [[Pure Premium|pure premium]] approach, the indicated relativity of class $i$ is

> $$\text{Relativity}_i = \frac{\text{Pure Premium}_i}{\text{Pure Premium}_{\text{base}}}$$

- $\text{Pure Premium}_{\text{base}}$ is the pure premium of the base class.

With several rating variables $k$, the rate of a risk in class $i$ is

> $$\text{Rate}_i = \text{Base Rate} \times \prod_k R_{i,k}$$

- $R_{i,k}$ is the relativity of the risk's level of rating variable $k$.

In a competitive market an insurer that charges one average rate to a heterogeneous group loses the better risks to competitors that price them properly, and retains the worse ones. This is the **adverse selection spiral**. Classification is what keeps the pool viable, and [[Principles of Ratemaking|Principle 3]] requires the rate to reflect the individual risk transfer.

> [!example]- The base class has 10,000 exposures and $\$2{,}000{,}000$ of losses. Class A has 5,000 exposures and $\$1{,}500{,}000$ of losses. What is Class A's relativity, and its rate at a base rate of $\$333.33$? {Example}
> - The base pure premium is $2{,}000{,}000/10{,}000 = \$200$.
> - Class A's pure premium is $1{,}500{,}000/5{,}000 = \$300$.
> - Class A's relativity is $300/200 = 1.50$.
> - Class A's rate is $333.33 \times 1.50 = \$500.00$.

## Criteria for a rating variable

Werner and Modlin, after Finger, group the criteria for a rating variable in four:

1. **Statistical** — statistical significance, [[Homogeneity|homogeneity]] within levels, and [[Credibility|credibility]].
2. **Operational** — objective, inexpensive to obtain and verify, not manipulable by the insured.
3. **Social** — privacy, causality, controllability and affordability; these are where public and regulatory objections arise.
4. **Legal** — some variables are prohibited outright in some jurisdictions.

Under the statistical criteria, the expected cost estimates should vary across the levels of the variable, the differences should be within an acceptable level of statistical confidence, and they should be relatively stable from one year to the next. Under the operational criteria, the levels should be objectively defined. A surgeon's skill plausibly affects malpractice costs but is subjective, so insurers rate on objective proxies such as board certification, years of experience and prior claims.

The social criteria in more detail:

- **Affordability.** Insurance should be affordable for all risks, especially where it is required by law or a lender. A variable that isolates a small group of very high risks can make its premium unaffordable, and insurers may choose, or be required, to combine classes and accept a subsidy.
- **Causality.** It is socially preferable for a rating variable to affect losses directly rather than only correlate with them. A sump pump discount is readily accepted, while [[Credit-Based Insurance Scoring|insurance credit scores]], despite their strong predictive power, met a backlash from a belief that they lack an obvious causal link to losses.
- **Controllability.** It is preferable if insureds can control their class, and so their premium, as a workers compensation insured can with approved loss control programs. Insureds cannot control their age or gender.
- **Privacy.** Telematics data on where and how safely a car is driven is used only with the insured's express consent.

[[ASOP 12 - Risk Classification (ASB - 2005)|ASOP 12]] asks that risk characteristics be related to expected outcomes, and a relationship is demonstrated if the variation in actual or reasonably anticipated experience correlates to the characteristic. The actuary need not establish cause and effect, so causality is a social preference, not an actuarial requirement.

> [!example]- An auto insurer considers rating on whether the car has an anti-theft device. How does the variable fare on the criteria? {Example}
> - It is statistical if theft losses vary by the variable's levels, with enough data to be credible and stable from year to year.
> - It is operational, because the device can be verified at inspection or from the vehicle's specifications.
> - It is causal and controllable, because the device directly reduces theft and the insured chooses to install it, so it meets little social objection.
> - **The variable is a strong candidate**, provided the statistical evidence supports it and no jurisdiction prohibits it.

## Establishing risk classes

ASOP 12 states that risk classification is generally used for three purposes: to treat participants with similar risk characteristics in a consistent manner, to permit economic incentives to operate and thereby encourage widespread availability of coverage, and to protect the soundness of the system. Once risk characteristics are chosen, the actuary forming the classes weighs three considerations, which are often interrelated:

1. **[[Adverse Selection|Adverse selection]]** — if the variation in expected outcomes within a risk class is too great, adverse selection is likely, so each class should be homogeneous enough for the system's purpose.
2. **Credibility** — risk classes should be large enough to allow credible statistical inferences about expected outcomes. Where the data are not sufficient, the actuary balances predictability against homogeneity.
3. **Practicality** — the actuary balances the potentially conflicting objectives of accuracy and efficiency, since the cost, time and effort of assigning risks to classes increase with the number of classes.

ASOP 12 also asks the actuary to comply with applicable law, consider industry and business practices, and consider the reasonableness of the results, such as the consistency of the pattern of rates among classes (§3.3.3–3.3.4).

## The pure premium and loss ratio approaches

In the pure premium approach, each level's pure premium is first divided by the pure premium of all levels combined, its relativity to the total, and the set is then rebased so the base level is 1.00. The interim step puts current, indicated and competitors' relativities on a consistent basis, and is needed when indicated relativities are credibility-weighted with the normalized current ones. The adjustment for the other rating variables is under [[Pure Premium Method]].

In the loss ratio approach, each level's loss ratio, on premium at current rate level, divided by the loss ratio of all levels combined is the indicated change to its current relativity, so the indicated relativity is

> $$\text{Indicated Relativity}_i = \text{Current Relativity}_i \times \frac{\text{Loss Ratio}_i}{\text{Loss Ratio}_{\text{total}}}$$

The loss ratio method for relativities has an advantage over the pure premium method: because its denominator is premium, it is already adjusted for the *other* rating variables in force, so it measures the residual effect.

> [!example]- A class has a current relativity of 1.20 and a loss ratio of 72%, against 64% for all classes combined. What is its indicated relativity? {Example}
> - The indicated change to the relativity is $0.72/0.64 = 1.125$.
> - The indicated relativity is $1.20 \times 1.125 = 1.35$.

## Univariate and multivariate methods

A **univariate** (one-way) pure premium or loss ratio analysis attributes to a variable the effect of everything correlated with it. If young drivers also drive older cars, a one-way age relativity contains part of the vehicle-age effect, and rating both double-counts. Minimum bias procedures were the historical bridge, and modern practice uses a [[Generalized Linear Model|GLM]], which estimates all variables simultaneously and reports each net of the others.

> [!example]- One-way relativities are 1.80 for youthful drivers and 1.56 for old vehicles. A GLM on the same data gives 1.55 and 1.20. What explains the gap, and what does the one-way structure charge a youthful driver in an old vehicle? {Example}
> - The two variables are **correlated**: youthful drivers disproportionately drive old vehicles.
> - Each one-way relativity therefore contains part of the other variable's effect.
> - The one-way structure charges $1.80 \times 1.56 = 2.81$, against $1.55 \times 1.20 = 1.86$ from the GLM.
> - The univariate structure over-charges that cell by $51\%$, and, because the relativities are balanced back to the overall level, correspondingly under-charges adult drivers in new vehicles.

## Off-balance

Relativity changes almost always change the average rate. The base rate must be adjusted so that the combined effect equals the intended [[Overall Rate Level Indication|overall indication]] ([[Rate Change]]). The off-balance factor, the adjusted exposures it is weighted by, and each class's resulting rate change are worked through on [[Balancing Back]].

> [!trap] Rating two correlated variables on one-way relativities
> A one-way relativity measures its variable together with everything correlated with it. Multiplying two such relativities counts their shared effect twice, as the youthful driver in an old vehicle shows.
