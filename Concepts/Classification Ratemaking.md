---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:badc87014abff1f348836ffdde4f2b3b3602f30e43ae9205c84c5935fd166c7d
  sources:
    - "Actuarial Standards Board, ASOP No. 12, Risk Classification (for All Practice Areas), Doc. No. 132 (Dec. 2005), Appendix 1 p.8 (PDF p.14), sha256:7d4f2631a589bac24cf34b1f622e95aa7bfa979aaca96de27c651099c0b12dc7 — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop012_132.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Classification Ratemaking.md
---

**Classification Ratemaking** is the segmentation of a book into rating classes and the derivation of **relativities** — the factors by which each class's rate differs from the base class — so that each risk pays according to its own expected cost.

> $$\text{Relativity}_i = \frac{\text{Pure Premium}_i}{\text{Pure Premium}_{\text{base}}}$$

> $$\text{Rate}_i = \text{Base Rate} \times \prod_k R_{i,k}$$

**Why classify at all.** In a competitive market an insurer that charges one average rate to a heterogeneous group loses the better risks to competitors that price them properly, and retains the worse ones — the **adverse selection spiral**. Classification is what keeps the pool viable, and [[Principles of Ratemaking|Principle 3]] requires the rate to reflect the individual risk transfer.

**What risk classification is used for** ([[ASOP 12 - Risk Classification (ASB - 2005)|ASOP 12]], Appendix 1, which is background and not part of the standard). ASOP 12 states that risk classification is generally used for three purposes: to treat participants with similar risk characteristics in a consistent manner, to permit economic incentives to operate and thereby encourage widespread availability of coverage, and to protect the soundness of the system. For voluntary coverages, failing to follow actuarial principles of risk classification can leave lower risk individuals underusing the system, and so without coverage, while higher risk individuals are covered at insufficient rates, which threatens the viability of the entire system. ASOP 12 cites the American Academy of Actuaries' 1980 *Risk Classification Statement of Principles* as background on the subject.

**Criteria for a rating variable** (Werner, after Finger's *Risk Classification*):

- **Statistical** — statistical significance, [[Homogeneity|homogeneity]] within levels, and [[Credibility|credibility]].
- **Operational** — objective, inexpensive to obtain and verify, not manipulable by the insured.
- **Social** — privacy, causality, controllability and affordability; these are where public and regulatory objections arise.
- **Legal** — some variables are prohibited outright in some jurisdictions.

**The criteria in more detail** (Werner & Modlin, Ch. 9, pp. 155–158):

- **Statistical significance.** The expected cost estimates should vary across the levels of the variable, the estimated differences should be within an acceptable level of statistical confidence, and they should be relatively stable from one year to the next. A variable whose levels show no variation in loss experience may not be useful, and one whose estimated differences are volatile leaves it unclear whether the variable improves equity.
- **Objective definitions.** The levels of a variable should be objectively defined, so that classifying a risk does not rest on a subjective judgment. A surgeon's skill level plausibly affects malpractice costs but is difficult to determine and somewhat subjective, so insurers rate instead on objective proxies such as board certification, years of experience and prior malpractice claims.
- **Affordability.** It is desirable for insurance to be affordable for all risks, especially where it is required by law (auto liability) or by a third party (a lender requiring homeowners coverage). A variable that isolates a small group of very high risks can make that group's premium unaffordable, and insurers may choose, or be required by regulators, to combine classes and accept a subsidy.
- **Causality.** Some characteristics are only correlated with expected losses, while others directly affect them, and it is socially preferable for rating variables to be causal. A discount for a sump pump, which directly reduces water damage losses, is readily accepted. [[Credit-Based Insurance Scoring|Insurance credit scores]], despite their strong statistical power in predicting losses, met a consumer backlash from a belief that they lack an obvious causal link to losses.
- **Controllability.** It is preferable if insureds have some ability to control the class they belong to, and so to affect the premium they are charged. A workers compensation insured can implement approved loss control programs to reduce its expected losses and its premium; insureds cannot control their age or gender. Controllability is not the manipulation the operational criteria guard against: it means the insured is motivated to improve the risk itself, which often brings broader benefits, such as cars bought with safety devices that earn discounts.
- **Privacy.** Telematics can show where and how safely a car is driven, but such data is used only with the insured's express consent.

ASOP 12 asks that risk characteristics be related to expected outcomes, and a relationship is demonstrated if the variation in actual or reasonably anticipated experience correlates to the characteristic. The actuary need not establish a cause-and-effect relationship to use a characteristic (ASOP 12 §3.2.1–3.2.2), so causality is a social preference, not an actuarial requirement.

**Considerations in establishing risk classes** ([[ASOP 12 - Risk Classification (ASB - 2005)|ASOP 12]] §3.3.2). Once risk characteristics are chosen, the actuary forming the classes weighs three considerations, which are often interrelated:

- **[[Adverse Selection|Adverse selection]]** — if the variation in expected outcomes within a risk class is too great, adverse selection is likely, so each class should be homogeneous enough with respect to expected outcomes for the system's purpose.
- **Credibility** — risk classes should be large enough to allow credible statistical inferences about expected outcomes; where the data are not sufficient, the actuary balances predictability against homogeneity.
- **Practicality** — the actuary balances the potentially conflicting objectives of accuracy and efficiency, since the cost, time and effort of assigning risks to classes increase with the number of classes.

ASOP 12 also asks the actuary to comply with applicable law, consider industry and business practices, and consider the reasonableness of the results, such as the consistency of the pattern of rates among classes (§3.3.3–3.3.4).

**Univariate vs. multivariate.**

- A **univariate** (one-way) pure premium or loss ratio analysis attributes to a variable the effect of everything correlated with it. If young drivers also drive older cars, a one-way age relativity contains part of the vehicle-age effect, and rating both double-counts.
- **Minimum bias** procedures were the historical bridge; modern practice uses a [[Generalized Linear Model|GLM]], which estimates all variables simultaneously and reports each net of the others.
- The loss ratio method for relativities has an advantage over the pure premium method: because its denominator is premium, it is already adjusted for the *other* rating variables in force, so it measures the residual effect.

**The one-way approaches in practice** (Werner & Modlin, Ch. 9, pp. 161–168, and App. E):

- **Pure premium approach.** A level's indicated relativity is first computed as its pure premium (loss and ALAE per exposure) divided by the pure premium of all levels combined, its relativity to the total. Dividing each of these by the base level's value then rebases the set so the base level is 1.00. The interim step is kept because companies compare current, indicated and competitors' relativities with each set normalized so that its exposure-weighted average relativity is 1.00, which puts them on a consistent basis, and that basis is also needed when indicated relativities are credibility-weighted (p. 163). The adjustment for the other rating variables is under [[Pure Premium Method]].
- **Credibility-weighting the relativities.** In Werner's appendix example the complement of credibility is the current relativities, normalized the same way: each current relativity is divided by the exposure-weighted average current relativity, so that it is on the same basis as the indicated relativity to the total (premium adjusted to the base class is the preferable weight, with exposures a proxy). Each level's indicated relativity is credibility-weighted with its normalized current relativity, and the blended relativities are then divided by the base level's blended value to put the base level back at 1.00 (App. E).
- **Loss ratio approach.** Each level's loss and ALAE ratio, on premium brought to current rate level for that level, divided by the loss ratio of all levels combined is the indicated change to that level's current relativity, and the current relativity times that change is the indicated relativity (p. 165).

**Off-balance.** Relativity changes almost always change the average rate. The base rate must be adjusted so that the combined effect equals the intended [[Overall Rate Level Indication|overall indication]] — see [[Rate Change]]. The off-balance factor, the adjusted exposures it is weighted by, and each class's resulting rate change are worked through on [[Balancing Back]].

![[Media/Figures/Classification_Ratemaking.svg|340]]

> [!example]- Class Relativity from Pure Premiums {Example}
> Base class: $10{,}000$ exposures, $\$2{,}000{,}000$ losses. Class A: $5{,}000$ exposures, $\$1{,}500{,}000$ losses. The target loss ratio is $60\%$.
>
> Compute the relativity and the class rates.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{PP}_{\text{base}} &= \frac{\$2{,}000{,}000}{10{,}000} = \$200 \\[4pt]
> > \text{PP}_{A} &= \frac{\$1{,}500{,}000}{5{,}000} = \$300 \\[6pt]
> > \text{Relativity}_A &= \frac{\$300}{\$200} = 1.50
> > \end{align*}$$
> >
> > $$\begin{align*}
> > \text{Base rate} &= \frac{\$200}{0.60} = \$333.33 \\[4pt]
> > \text{Class A rate} &= \$333.33 \times 1.50 = \$500.00
> > \end{align*}$$
> >
> > Two checks before this becomes a filing: is Class A's $5{,}000$ exposures enough to be credible at $1.50$, and is the difference *caused* by the class variable or by something correlated with it that is also being rated?

> [!example]- Univariate Analysis Double-Counts {Example}
> An insurer rates on two variables. One-way pure premiums:
>
> | | Pure premium | Relativity |
> |---|---|---|
> | Youthful driver | $\$900$ | $1.80$ |
> | Adult driver | $\$500$ | $1.00$ |
> | Old vehicle | $\$780$ | $1.56$ |
> | New vehicle | $\$500$ | $1.00$ |
>
> A GLM run on the same data gives a youthful relativity of $1.55$ and an old-vehicle relativity of $1.20$. Explain the gap and its consequence.
>
> > [!answer]-
> > The two variables are **correlated**: youthful drivers disproportionately drive old vehicles. The one-way youthful figure therefore contains part of the old-vehicle effect, and the one-way old-vehicle figure contains part of the youthful effect. Each is right about its own cell and wrong about the variable's own contribution.
> >
> > Rating a youthful driver in an old vehicle:
> >
> > $$\begin{align*}
> > \text{Univariate} &= 1.80 \times 1.56 = 2.81 \\
> > \text{GLM} &= 1.55 \times 1.20 = 1.86
> > \end{align*}$$
> >
> > The univariate structure over-charges that cell by $51\%$ — and, because the relativities are balanced back to the overall level, correspondingly under-charges adult drivers in new vehicles.
> >
> > The market consequence is predictable: a competitor using the multivariate result quotes the youthful/old-vehicle segment far cheaper and takes it, while sending its own adult/new-vehicle business here. The insurer keeps exactly the risks it has under-priced. Multivariate methods are not a refinement; on a correlated book they are a competitive necessity.
