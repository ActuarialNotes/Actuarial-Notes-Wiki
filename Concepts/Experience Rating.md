---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:33b9f3b6780ea1bea2072e57e14176d1743a4ac398061e0c9fc24bdbb60a262c
  sources:
    - "Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.1 §6-8, §10, PDF pp.10-13, 14-17, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf"
    - "Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, 2016), Ch.15 experience rating, PDF pp.301-305, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Experience Rating.md
---

**Experience Rating** modifies an individual insured's manual premium prospectively, using its own past loss experience, weighted by [[Credibility|credibility]]. The output is an **experience modification factor** (mod): above $1.0$ for worse-than-expected experience, below for better.

> $$M = Z \times \frac{A}{E} + (1 - Z)$$

> $$\text{Modified Premium} = \text{Manual Premium} \times M$$

- $A$ is the insured's actual losses over the experience period and $E$ the losses expected for a risk of its size and class. A mod is therefore a **relative** measure: it says how this risk compares with the average risk already reflected in the manual rate.
- Credibility rises with size. A small risk's mod stays near $1.0$ however good or bad its recent record, because a few claims say little; a large risk approaches $Z = 1$ and effectively self-rates.
- Losses are **capped** at a per-claim limit before entering $A$. A single catastrophic claim should not dominate a mod, and the split between primary (capped) and excess losses is the mechanism the NCCI workers compensation formula uses to weight frequency more heavily than severity — the theory being that frequency is more predictive of future experience than severity.
- Experience rating is **prospective**: it uses a completed experience period (typically three years, excluding the most recent, incomplete one) to modify the *coming* policy's premium. [[Retrospective Rating|Retrospective rating]] instead adjusts the *current* policy's premium after the fact.
- It creates a real incentive for loss control, and an equally real incentive for **claim suppression** — paying small claims outside the policy to keep them out of the mod. Both are consequences of the same mechanism.
- Order of application: schedule and experience modifications apply to the manual premium to give **standard premium**, which is then the base for a retro plan or a large-deductible programme.
- **What a credibility factor must do.** Whatever method produces it, the credibility factor $Z$ is expected to have three properties. $Z$ is a value between 0 and 1: credibility can be neither negative nor more than 100%. $Z$ does not decrease as the size of the risk (its expected losses $E$) increases. As the size of a risk increases, the ratio of $Z$ to $E$ decreases, which amounts to the charge for a loss of any given size decreasing as the size of the risk increases.
- **Bühlmann credibility.** Experience rating uses a Bühlmann framework, $Z = E/(E+K)$, where $K$ is the expected value of the process variance divided by the variance of the hypothetical means. Substituting it into the mod gives $M = \dfrac{ZA + (1-Z)E}{E} = \dfrac{A + K}{E + K}$. Process variance is purely random and should not be charged to the risk; the variance of the hypothetical means is the risk being innately different from its class, and $Z$ is the portion of experience due to those differences.
- **Stabilising the mod.** A Maximum Single Loss (MSL) caps individual large losses when they enter the risk's actual experience $A$, so a single random event cannot exert too much influence on the mod. A minimum and maximum mod are a final measure to keep the experience rating adjustment from being too extreme. The MSL, the min and max mods and $Z$ itself all vary with the size of the risk.
- **Split loss plans.** A split loss plan separates each claim into layers at a split point. Apply the split point to each claim separately: the claim's primary loss is the lesser of the claim's loss and the split point, and its excess loss is the remainder above the split point, which is zero for a claim at or below the split point. Primary and excess losses are dollar amounts, each summed over the risk's claims, not claim counts. The risk's actual primary and excess losses are then compared with expected primary and excess losses separately.
- With a low split point the primary layer measures **frequency** (actual primary above expected must mean more claims than expected, since primary losses are truncated from above) and the excess layer measures **severity**.
- **Why split.** Many real loss distributions are skewed with extremely heavy tails, so the most predictive estimate might come from normalising the losses, for example by assigning credibility to the logarithm of the loss amount. A split rating plan, which gives much more weight to the primary portion of losses than to the excess portion, is a linear approximation to assigning credibility to the log of the loss amount — a compromise between simplicity and precision. The split plan has been found to produce empirically better results for the NCCI workers compensation plan than a total or limited loss plan, perhaps because workers compensation loss distributions are very heavy tailed.
- **The split-plan mod.** With subscripts $p$ for primary and $e$ for excess, $E = E_p + E_e$ total expected losses, and credibilities $Z_p$ and $Z_e$:

  $$M = \frac{Z_p A_p + (1-Z_p)E_p + Z_e A_e + (1-Z_e)E_e}{E} = 1 + Z_p\frac{A_p - E_p}{E} + Z_e\frac{A_e - E_e}{E}$$

  In words, the split-plan mod is unity (the manual premium) plus the primary credibility times the primary deviation (actual minus expected primary losses) divided by total expected losses, plus the excess credibility times the excess deviation (actual minus expected excess losses) divided by total expected losses.
- **The NCCI weight-and-ballast form.** The NCCI uses a mathematically equivalent formula written with an excess loss weighting factor $w$ and a ballast value $B$:

  $$M = \frac{A_p + wA_e + (1-w)E_e + B}{E_p + (1-w)E_e + B + wE_e} = \frac{A_p + wA_e + (1-w)E_e + B}{E + B}$$

  Matching the two forms, the primary credibility is $Z_p = E/(E+B)$ and the excess credibility is $Z_e = wZ_p = wE/(E+B)$.
- **Evaluating a plan: the quintile test.** An effective experience rating plan should identify risk differences among otherwise similar risks and adjust for them. Rank the risks by the size of their mod and collapse them into five groups; calculate the manual loss ratio (losses over manual premium) and the standard loss ratio (losses over standard, modified premium) for each group; and observe any trends across the groups. An upward trend in manual loss ratios as the mod rises shows that the plan identifies differences between risks. Standard loss ratios that are much less dispersed, with no discernible trend, show that it adjusts for them.
- A downward trend in standard loss ratios as the mods increase means the plan gives too much credibility to the risks' own experience; an upward trend means it does not give enough credibility. A good experience rating plan will have no discernible trend in the modified loss ratios, so that risks with credit mods and risks with debit mods are equally profitable after the mod is applied — all risks equal in profit potential and therefore equally desirable to write.
- **The efficiency test.** For each plan, the efficiency test statistic is the ratio of the variance of the standard loss ratios across the quintiles to the variance of the manual loss ratios. The plan with the lower variance ratio is better: it makes risks of differing experience more equally desirable.
- **Ballast as a stabiliser.** The ballast value $B$ is added to both the numerator and the denominator of the NCCI mod. Since the primary credibility is $Z_p = E/(E+B)$, a larger ballast gives the risk's own losses less credibility and keeps the mod closer to $1$. With the Maximum Single Loss and the minimum and maximum mods, the ballast is one of the devices that dampen the effect of one risk's experience on its mod.
- **Don't count the same experience twice.** Whatever already shows in a risk's past losses is already reflected in its experience mod. A schedule credit for a safety program that was in place during the experience period would double-count the expected benefit of the program, first by the schedule credit and then by the experience mod. Only an effect that the experience period does not contain, such as a program implemented during or after the experience period, earns a separate credit, and a risk too small to have fully credible experience may earn a smaller credit for it.
- **The ISO commercial general liability plan.** ISO's *Commercial General Liability Experience and Schedule Rating Plan* experience rates and schedule rates CGL risks. A policy may be written on an occurrence basis, covering claims that occur while it is in force, or on a claims-made basis, covering any claim reported while it is in force whatever the accident date. The rules below are as BattleActs' study guide to the manual describes them.
- **ISO experience period (Rule 4).** The experience period ends at least six months before the rating date, so the latest policy year is always incomplete and is not used. The experience period consists of the latest three full policy years of experience, or at least one complete policy year if data is unavailable.
- **ISO experience modification (Rule 5).** The ISO experience modification is defined from two ratios, the actual experience ratio (AER) and the expected experience ratio (EER). A positive modification is a debit and a negative modification is a credit.
- **ISO basic limits expected losses.** For each experience year and sub-line (premises/operations and products), the basic limits expected losses (BLEL), which include allocated loss adjustment expense, are the company expected loss ratio times the annual basic limits company premium. When only total annual company premium at the limits actually purchased is available, Rule 10 restates it at basic limits first.
- **ISO company subject loss cost (Rule 5B, the standard approach).** For each experience year and sub-line, multiply the basic limits expected losses by policy adjustment factor 13B, policy adjustment factor 13C and the detrend factor from Rule 14. The company subject loss cost (CSLC) is the sum of these products over all experience years and sub-lines.
- **What the ISO adjustment factors do.** Policy adjustment factor 13B translates the policy type being rated, such as a claims-made policy, to an occurrence basis. Policy adjustment factor 13C translates from an occurrence basis to the policy type used in the historical experience period. The detrend factor moves the expected losses back to the same level as the actual historical experience. So a risk whose first claims-made policy is being rated still uses its prior occurrence policies as its experience period, and the change of policy type is handled by the policy adjustment factors.
- **The CSLC is already detrended.** Because the detrend factor is one of the factors in every row of the company subject loss cost, the CSLC is already at the level of the historical experience, and no further trend or detrend factor is applied to it.
- **ISO credibility, EER and MSL (Rule 16).** The company subject loss cost is looked up in the Rule 16 table to find the risk's credibility (which also decides eligibility for experience rating), its expected experience ratio and its Maximum Single Loss.
- **ISO expected future development (Rules 5D and 5E).** For each experience year and sub-line, the expected future development is that row's company subject loss cost times the expected experience ratio times a loss development factor from Rule 15, and the rows are summed. The expected future development is also called the Adjustment to Reflect Ultimate Level of Losses (ARULL).
- **Claims-made years are not developed.** In the ISO plan a claims-made policy always has a loss development factor of 0, so a claims-made year in the experience period adds no expected future development and only its reported losses enter the actual experience.
- **ISO loss history.** For each experience year and sub-line, the loss history is the incurred loss excluding ALAE capped at the basic per-occurrence limit, plus the ALAE, then capped at the Maximum Single Loss. The actual experience ratio is built from the loss history and the expected future development. Because the losses are capped at the basic limit, the ISO CGL plan responds mostly to frequency.

![[Media/Figures/Experience_Rating.svg|340]]

> [!example]- Computing an Experience Modification {Example}
> An insured has expected losses $E = \$200{,}000$, actual capped losses $A = \$280{,}000$, and credibility $Z = 0.60$. The manual premium is $\$100{,}000$.
>
> Compute the mod and the modified premium.
>
> > [!answer]-
> > $$\begin{align*}
> > M &= 0.60 \times \frac{\$280{,}000}{\$200{,}000} + 0.40 \\
> > &= 0.60 \times 1.40 + 0.40 \\
> > &= 0.84 + 0.40 \\
> > &= 1.24
> > \end{align*}$$
> >
> > $$\text{Modified premium} = \$100{,}000 \times 1.24 = \$124{,}000$$
> >
> > The insured's raw loss ratio was $40\%$ worse than expected; credibility passes $60\%$ of that through, giving a $24\%$ surcharge. Had $Z$ been $0.25$ — a much smaller risk with the same relative experience — the mod would be $1.10$ and the surcharge only $10\%$.

> [!example]- Why Losses Are Capped {Example}
> Two insureds in the same class each have $\$200{,}000$ of expected losses and $Z = 0.50$. Over the experience period:
>
> - **Insured A**: $40$ claims totalling $\$300{,}000$, largest claim $\$25{,}000$.
> - **Insured B**: $4$ claims totalling $\$300{,}000$, of which one is $\$250{,}000$.
>
> Compute the mods with and without a $\$50{,}000$ per-claim cap, and comment.
>
> > [!answer]-
> > **Uncapped** — both have $A = \$300{,}000$:
> >
> > $$M = 0.50 \times 1.50 + 0.50 = 1.25 \text{ for both}$$
> >
> > **Capped at $\$50{,}000$** — A is unaffected; B's large claim is cut to $\$50{,}000$, so $A_B = \$100{,}000$. Expected losses must be capped on the same basis; suppose the capped expectation is $\$150{,}000$:
> >
> > $$\begin{align*}
> > M_A &= 0.50 \times \frac{300}{150} + 0.50 = 1.50 \\[4pt]
> > M_B &= 0.50 \times \frac{100}{150} + 0.50 = 0.83
> > \end{align*}$$
> >
> > The uncapped calculation treats these two risks as identical. They are not: **A has a frequency problem** — forty claims where the class expects far fewer — which is persistent, controllable and highly predictive of next year. **B had one bad accident**, which is largely luck and says little about its future.
> >
> > Capping is what lets the mod respond to the signal (frequency) rather than the noise (one severity outcome). It is the same reasoning that caps [[Large Loss|large losses]] in a class rate indication, applied at the level of the individual risk.

> [!example]- A Split-Plan Mod, Both Ways {Example}
> A risk has expected primary losses $E_p = \$40{,}000$ and expected excess losses $E_e = \$60{,}000$, so $E = \$100{,}000$. The plan splits each claim at $\$10{,}000$, its ballast is $B = \$100{,}000$ and its excess weighting factor is $w = 0.4$. The risk's claims over the experience period were $\$8{,}000$, $\$4{,}000$, $\$10{,}000$, $\$15{,}000$, $\$25{,}000$ and $\$31{,}000$.
>
> Split the losses and compute the mod in the weight-and-ballast form and in the credibility form.
>
> > [!answer]-
> > Each claim is split on its own: primary is the lesser of the claim and $\$10{,}000$, excess is the rest.
> >
> > | Claim | Primary | Excess |
> > |---|---|---|
> > | $8{,}000$ | $8{,}000$ | $0$ |
> > | $4{,}000$ | $4{,}000$ | $0$ |
> > | $10{,}000$ | $10{,}000$ | $0$ |
> > | $15{,}000$ | $10{,}000$ | $5{,}000$ |
> > | $25{,}000$ | $10{,}000$ | $15{,}000$ |
> > | $31{,}000$ | $10{,}000$ | $21{,}000$ |
> > | **Total** | $A_p = 52{,}000$ | $A_e = 41{,}000$ |
> >
> > **Weight and ballast:**
> >
> > $$\begin{align*}
> > M &= \frac{52{,}000 + 0.4(41{,}000) + 0.6(60{,}000) + 100{,}000}{100{,}000 + 100{,}000} \\
> > &= \frac{52{,}000 + 16{,}400 + 36{,}000 + 100{,}000}{200{,}000} = \frac{204{,}400}{200{,}000} = 1.022
> > \end{align*}$$
> >
> > **Credibility form:** $Z_p = 100{,}000/200{,}000 = 0.5$ and $Z_e = 0.4 \times 0.5 = 0.2$.
> >
> > $$\begin{align*}
> > M &= 1 + 0.5\,\frac{52{,}000 - 40{,}000}{100{,}000} + 0.2\,\frac{41{,}000 - 60{,}000}{100{,}000} \\
> > &= 1 + 0.060 - 0.038 = 1.022
> > \end{align*}$$
> >
> > The two forms agree. The risk had more primary loss than expected (a frequency signal, given half credibility) and less excess loss than expected (a severity signal, given only a fifth): the debit from frequency outweighs the credit from severity.
