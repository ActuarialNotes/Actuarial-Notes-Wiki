---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:35fabaa6052639c7bcc46ff5c3a8e3c042bfd9871e367ad3e81601053a6da9e2
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 11 p.201 (PDF p.213); Ch. 15 pp.295-296, Tables 15.4-15.5 (PDF pp.307-308); App. D p.D-2 (PDF p.395), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Experience Rating.md
---

![[Media/Figures/Experience_Rating.svg|340]]

**Experience Rating** modifies an individual insured's manual premium prospectively, using its own past loss experience, weighted by [[Credibility|credibility]]. The output is an **experience modification factor** (mod): above $1.0$ for worse-than-expected experience, below for better. In its simplest form, the mod is

> $$M = Z \times \frac{A}{E} + (1 - Z)$$

- $A$ is the insured's actual losses over the experience period and $E$ the losses expected for a risk of its size and class.
- $Z$ is the credibility of the insured's experience, between 0 and 1.

The mod is applied to the manual premium, so

> $$\text{Modified Premium} = \text{Manual Premium} \times M$$

A mod is therefore a **relative** measure: it says how this risk compares with the average risk already reflected in the manual rate. Experience rating is **prospective**: it uses a completed experience period (typically three years, excluding the most recent, incomplete one) to modify the *coming* policy's premium. [[Retrospective Rating|Retrospective rating]] instead adjusts the current policy's premium after the period. Order of application: schedule and experience modifications apply to the manual premium to give **standard premium**, which is then the base for a retro plan or a large-deductible programme.

The mod creates an incentive for loss control. It also creates an incentive for **claim suppression**, paying small claims outside the policy to keep them out of the mod.

> [!example]- An insured has expected losses of $\$200{,}000$, actual capped losses of $\$280{,}000$ and a credibility of 0.60. Its manual premium is $\$100{,}000$. What are its mod and modified premium? {Example}
> - The ratio of actual to expected losses is $280{,}000/200{,}000 = 1.40$.
> - The mod is $0.60 \times 1.40 + 0.40 = 1.24$.
> - The modified premium is $100{,}000 \times 1.24 = \$124{,}000$.
> - With a credibility of 0.25, the same experience would give a mod of $0.25 \times 1.40 + 0.75 = 1.10$.

## Credibility in experience rating

Credibility rises with size. A small risk's mod stays near $1.0$ however good or bad its recent record, because a few claims say little. A large risk approaches $Z = 1$ and effectively self-rates. Whatever method produces it, the credibility $Z$ is expected to have three properties:

1. $Z$ is between 0 and 1, so credibility is neither negative nor more than 100%.
2. $Z$ does not decrease as the size of the risk, its expected losses $E$, increases.
3. The ratio $Z/E$ decreases as the size of the risk increases, so the charge for a loss of any given size decreases as the size of the risk increases.

Experience rating uses a Bühlmann framework, $Z = E/(E + K)$, where $K$ is the expected value of the process variance divided by the variance of the hypothetical means. Substituted into the mod, it gives

> $$M = \frac{A + K}{E + K}$$

Process variance is purely random and should not be charged to the risk. The variance of the hypothetical means is the risk being innately different from its class, and $Z$ is the portion of experience due to those differences.

> [!example]- An insured has expected losses of $\$200{,}000$ and actual losses of $\$280{,}000$, and $K = \$300{,}000$. What are its credibility and mod? {Example}
> - The credibility is $200{,}000/(200{,}000 + 300{,}000) = 0.40$.
> - The mod is $(280{,}000 + 300{,}000)/(200{,}000 + 300{,}000) = 1.16$.
> - In the credibility form, $0.40 \times 1.40 + 0.60 = 1.16$, the same mod.

## Capping losses

Losses are **capped** at a per-claim limit before entering $A$. A single catastrophic claim should not dominate a mod, so a Maximum Single Loss (MSL) caps individual large losses when they enter the risk's actual experience. A minimum and maximum mod are a final measure to keep the adjustment from being too extreme. The MSL, the minimum and maximum mods and $Z$ itself all vary with the size of the risk. The expected losses are capped on the same basis as the actual losses.

> [!example]- Two insureds each have $\$200{,}000$ of expected losses and a credibility of 0.50. Insured A had 40 claims totalling $\$300{,}000$, the largest $\$25{,}000$. Insured B had 4 claims totalling $\$300{,}000$, one of them $\$250{,}000$. With a $\$50{,}000$ per-claim cap, the capped expected losses are $\$150{,}000$. What are their mods with and without the cap? {Example}
> - Uncapped, both have $A = \$300{,}000$ and a mod of $0.50 \times 1.50 + 0.50 = 1.25$.
> - Capped, A's losses are unchanged, and its mod is $0.50 \times 300/150 + 0.50 = 1.50$.
> - Capped, B's large claim falls to $\$50{,}000$, its losses to $\$100{,}000$, and its mod to $0.50 \times 100/150 + 0.50 = 0.83$.
> - **A has a frequency problem**, forty claims where the class expects far fewer, which is persistent, controllable and highly predictive of next year.
> - **B had one bad accident**, which is largely luck and says little about its future.
> - Capping is what lets the mod respond to the signal (frequency) rather than the noise (one severity outcome).

## The ISO experience rating plan

In Werner and Modlin's commercial general liability example, the experience rating credit or debit is a credibility weighting of the actual and expected experience ratios:

> $$\text{Credit or Debit} = \frac{\text{AER} - \text{EER}}{\text{EER}} \times Z$$

- $\text{AER}$ is the actual experience ratio, the projected ultimate losses and ALAE, at basic limits and limited by the MSL, divided by the company subject basic limits loss and ALAE costs.
- $\text{EER}$ is the expected experience ratio, the complement of the expected deviation of the plan's loss costs from those underlying the manual rate, caused for example by the MSL.

A positive result is a debit, which increases premium, and a negative one a credit. In ISO's *Commercial General Liability Experience and Schedule Rating Plan*:

1. **Experience period.** The three most recent complete policy years, or as few as one, ending no later than six months before the rating date, which leaves out the incomplete most recent year.
2. **Basic limits expected losses.** For each experience year and sub-line (premises/operations and products), the company expected loss ratio times the annual basic limits company premium, including ALAE.
3. **Company subject loss cost (CSLC).** The basic limits expected losses times policy adjustment factors 13B and 13C and the detrend factor, summed over years and sub-lines. Factor 13B translates the policy type being rated, such as claims-made, to an occurrence basis, and 13C converts that to the policy type in force in each historical year. The detrend factor, the reciprocal of the trend factor, brings current loss costs back to the cost level of each historical year, so no further trend is applied to the CSLC.
4. **Credibility, EER and MSL.** The CSLC is looked up in the Rule 16 table for the risk's credibility, which also decides eligibility, its EER and its MSL.
5. **Expected future development.** For each experience year and sub-line, the expected future development is that row's company subject loss cost times the expected experience ratio times a loss development factor from Rule 15, and the rows are summed. A claims-made year has a development factor of 0.
6. **Loss history.** For each experience year and sub-line, the loss history is the incurred loss excluding ALAE capped at the basic per-occurrence limit, plus the ALAE, then capped at the Maximum Single Loss. The actual experience ratio is built from the loss history and the expected future development.

Capping every loss at the basic limit makes the ISO plan respond mostly to frequency.

> [!example]- A risk's actual experience ratio is 0.983, its expected experience ratio 0.888 and its credibility 0.44. What is its experience modification? {Example}
> - The deviation from expected is $(0.983 - 0.888)/0.888 = 0.107$.
> - The debit is $0.107 \times 0.44 = 0.047$, so **the premium rises 4.7%**.

## Split loss plans

The NCCI workers compensation plan splits losses into primary and excess components, so that it weights frequency more heavily than severity, on the theory that frequency is more predictive of future experience than severity. Apply the split point to each claim separately: the claim's primary loss is the lesser of the claim's loss and the split point, and its excess loss is the remainder above the split point, which is zero for a claim at or below the split point. With a low split point the primary layer measures **frequency** and the excess layer **severity**. With primary credibility $Z_p$ and excess credibility $Z_e$, the mod is

> $$M = \frac{Z_p A_p + (1-Z_p)E_p + Z_e A_e + (1-Z_e)E_e}{E} = 1 + Z_p\frac{A_p - E_p}{E} + Z_e\frac{A_e - E_e}{E}$$

- $A_p$ and $A_e$ are the actual primary and excess losses, dollar amounts summed over the risk's claims.
- $E_p$ and $E_e$ are the expected primary and excess losses, and $E = E_p + E_e$.

The NCCI writes the same mod with a ballast value $B$ and an excess weighting value $w$:

> $$M = \frac{A_p + wA_e + (1-w)E_e + B}{E_p + (1-w)E_e + B + wE_e} = \frac{A_p + wA_e + (1-w)E_e + B}{E + B}$$

- $B$ is the ballast, with $Z_p = E/(E + B)$.
- $w = Z_e/Z_p$, so $Z_e = wE/(E + B)$.

The ballast and the weighting value come from a table by the policy's expected losses, and both increase as expected losses increase. A larger ballast gives the risk's own losses less credibility and keeps the mod closer to 1.

The expected losses are the actual payroll in hundreds of dollars, by class, for the experience period, times the class's expected loss rate. The rates reflect the losses expected to be reported at each policy's evaluation, 18, 30 and 42 months from the start of the three policy years. The expected primary losses are the expected losses times the **D-ratio**, the [[Loss Elimination Ratio|loss elimination ratio]] at the primary loss limit, and the expected excess losses are the rest.

A split plan is a linear approximation to assigning credibility to the logarithm of the loss amount, which suits heavy-tailed loss distributions. It has been found to produce empirically better results for the NCCI plan than a total or limited loss plan.

> [!example]- A risk has expected primary losses of $\$40{,}000$ and expected excess losses of $\$60{,}000$. The split point is $\$10{,}000$, $B = \$100{,}000$ and $w = 0.4$. Its claims were $\$8{,}000$, $\$4{,}000$, $\$10{,}000$, $\$15{,}000$, $\$25{,}000$ and $\$31{,}000$. What is its mod? {Example}
> - The primary losses are $8{,}000 + 4{,}000 + 10{,}000 + 3 \times 10{,}000 = \$52{,}000$.
> - The excess losses are $5{,}000 + 15{,}000 + 21{,}000 = \$41{,}000$.
> - The numerator is $52{,}000 + 0.4(41{,}000) + 0.6(60{,}000) + 100{,}000 = \$204{,}400$.
> - The mod is $204{,}400/200{,}000 = 1.022$.
> - In the credibility form, $Z_p = 0.5$ and $Z_e = 0.2$, and $1 + 0.5(12{,}000/100{,}000) + 0.2(-19{,}000/100{,}000) = 1.022$.

## Evaluating an experience rating plan

An effective plan identifies risk differences among otherwise similar risks and adjusts for them. In the **quintile test**, the risks are ranked by their mods and collapsed into five groups, and the manual loss ratio (losses over manual premium) and standard loss ratio (losses over modified premium) of each group are compared. An upward trend in manual loss ratios as the mod rises shows that the plan identifies differences. Standard loss ratios that are much less dispersed, with no discernible trend, show that it adjusts for them.

A downward trend in standard loss ratios as the mods increase means the plan gives too much credibility to the risks' own experience, and an upward trend means it gives too little. In the **efficiency test**, the statistic is the variance of the standard loss ratios across the quintiles divided by the variance of the manual loss ratios, and the plan with the lower ratio is better.

Whatever already shows in a risk's past losses is already reflected in its experience mod, so a [[Schedule Rating|schedule rating]] credit for it would count it twice. In a workers compensation rate level indication, historical premium is brought to the mod level expected in the future by the ratio of the average projected mod to each year's historical average mod.

> [!trap] Capping the actual losses but not the expected
> The actual and expected losses must be on the same basis. Capping each claim in $A$ while comparing with uncapped expected losses gives every risk a credit, because the capped losses are compared with an expectation that includes the losses above the cap.
