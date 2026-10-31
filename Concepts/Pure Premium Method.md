---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-12
  last_checked_by: agent:validate-v1
  content_hash: sha256:19dd8ba1ea120e3a24cd70f2029956e57e9c543e724efbae210fe1b6af128ac3
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 8 pp.141-142 and 145-147 (PDF pp.153-154, 157-159), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 2 p.29 (PDF p.41) — NCCI loss costs adjusted by each insurer for its own expenses, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Pure Premium Method.md
---

**Pure Premium Method** derives the indicated **rate** directly: project loss and LAE per exposure, add the fixed expense per exposure, and gross up for variable expenses and profit. It never divides by premium, so it requires no [[On-Leveling|on-levelling]].

> $$\text{Indicated Rate} = \frac{\text{Pure Premium} + F}{1 - V - Q_T}$$

> $$\text{Indicated Change} = \frac{\text{Indicated Rate}}{\text{Current Rate}} - 1$$

- The method produces an **absolute rate**, which is why it is the only choice for a **new** line or programme where there is no current rate to change. The [[Loss Ratio Method]] can only produce a change to something that already exists.
- Inputs: losses developed to ultimate and trended, [[Earned Exposure|earned exposures]] (trended if the base inflates — see [[Exposure Trend]]), the fixed expense per exposure $F$, the variable expense ratio $V$, and the target profit provision $Q_T$.
- The method's requirement is a **well-defined, stable exposure base**. Where exposures are not consistently recorded, or where the base changed mid-history, the pure premium is unreliable and the loss ratio method is preferred.
- Both methods are **algebraically equivalent** given consistent inputs, since $\text{Loss Ratio} = \text{Pure Premium} / \text{Average Premium}$. They differ in the data each demands: pure premium needs exposures, loss ratio needs premium on level.
- Advisory organizations file **loss costs** — pure premiums — leaving each insurer to apply its own expense and profit provisions through a loss cost multiplier. That division of labour only works in the pure premium framework.

**In classification ratemaking** (Werner & Modlin, Ch. 9, pp. 161–168, and Ch. 10, pp. 171–173). The same approach gives a rating variable's relativities: each level's loss and ALAE divided by its exposures is its pure premium, and its relativity is that pure premium divided by the total's or the base level's (see [[Classification Ratemaking]]).

- **The hidden assumption.** A one-way pure premium analysis assumes each level's exposures are spread the same way across the levels of every other rating variable. Where one territory holds a disproportionate share of high-value homes, its pure premium reflects the high-value homes' experience as well as its own, and the indicated relativity is distorted, a double-counting effect called distributional bias.
- **Testing for exposure correlation.** Compare the distribution of one variable's exposures within each level of the other: for each territory, the percentage of its exposures at each amount-of-insurance level. If the mix is the same within every territory (it need not be an even split, only the same split everywhere), the variables are not exposure-correlated and the one-way relativities are not distorted by it, so they need no adjustment. If the mixes differ, the variables are correlated and the one-way results are biased (p. 164).
- **The adjusted pure premium approach.** Where premium at current rate level is not available for each level, as the loss ratio approach needs, the pure premium approach can be performed using exposures adjusted by the exposure-weighted average relativity of all the other rating variables. For each level of the variable being analysed, its exposures in each level of the other variable are multiplied by that level's current relativity and summed; the weights come from the exposure distribution and the factors are the other variable's relativities, while the losses enter only as the numerator. The level's losses divided by its adjusted exposures is its adjusted pure premium, from which relativities are computed as before (pp. 166–168).
- **What it achieves.** The adjustment minimizes the impact of distributional bias. With the current relativities as the factors it gives the same indicated relativities as the loss ratio approach (apart from rounding), carrying any inequity in the current relativities with it; only with the true relativities, which are never known, would it be exact (p. 168). Werner calls it merely an approximation to a proper reflection of all exposure correlations (Ch. 10, p. 171).
- **Sequential analysis** chains the adjustment: a one-way analysis of the first variable, then the second variable's relativities from exposures adjusted for the first variable's results, and so on through the list in one pass. The results depend on the order of the variables (Ch. 10, pp. 173–174).

![[Media/Figures/Pure_Premium_Method.svg|340]]

> [!example]- Pure Premium Indication {Example}
> Accident year $2023$: reported losses $\$1{,}200{,}000$ at $24$ months on $5{,}000$ earned exposures. The CDF to ultimate is $1.15$; loss trend is $4\%$ a year; exposure trend is $1\%$ a year; the trend period is $2.5$ years. Fixed expenses are $\$25$ per exposure, variable expenses $22\%$, target profit $5\%$. The current rate is $\$425$.
>
> Compute the indicated rate change.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Ultimate losses} &= \$1{,}200{,}000 \times 1.15 \\
> > &= \$1{,}380{,}000 \\[4pt]
> > \text{Trended losses} &= \$1{,}380{,}000 \times 1.04^{2.5} \\
> > &= \$1{,}380{,}000 \times 1.1030 \\
> > &= \$1{,}522{,}167 \\[4pt]
> > \text{Trended exposures} &= 5{,}000 \times 1.01^{2.5} \\
> > &= 5{,}126 \\[6pt]
> > \text{Pure premium} &= \frac{\$1{,}522{,}167}{5{,}126} \\
> > &= \$296.95
> > \end{align*}$$
> >
> > $$\begin{align*}
> > \text{Indicated rate} &= \frac{\$296.95 + \$25.00}{1 - 0.22 - 0.05} \\
> > &= \frac{\$321.95}{0.73} \\
> > &= \$441.03 \\[6pt]
> > \text{Indicated change} &= \frac{\$441.03}{\$425.00} - 1 \\
> > &= +3.8\%
> > \end{align*}$$
> >
> > Note that exposure trend appears in the **denominator** of the pure premium, partially offsetting the loss trend. Omitting it (dividing by $5{,}000$ instead of $5{,}126$) would give a pure premium of $\$304.43$ and an indication of $+6.2\%$ — an increase the insurer would collect automatically as its inflating exposure base grows.

> [!example]- Pure Premium and Loss Ratio Methods Agree {Example}
> Same book: trended on-level earned premium is $\$2{,}178{,}550$ ($5{,}126$ trended exposures at the current $\$425$ rate), fixed expense ratio $5.7\%$, variable expenses $22\%$, target profit $5\%$.
>
> Show the two methods give the same answer.
>
> > [!answer]-
> > **Loss ratio method:**
> >
> > $$\begin{align*}
> > \text{Projected LR} &= \frac{\$1{,}522{,}167}{\$2{,}178{,}550} = 69.87\% \\[6pt]
> > \text{Indicated factor} &= \frac{0.6987 + 0.057}{1 - 0.22 - 0.05} \\
> > &= \frac{0.7557}{0.73} \\
> > &= 1.0352
> > \end{align*}$$
> >
> > an indication of $+3.5\%$, against $+3.8\%$ from the pure premium method.
> >
> > The small residual is the fixed expense treatment: the pure premium method carries $F$ as $\$25$ per exposure, while the loss ratio method carries it as $5.7\%$ of the *current* premium ($\$24.23$). Force them to agree — set $F\% = \$25/\$425 = 5.88\%$ — and both give $+3.8\%$.
> >
> > The lesson is that the methods are equivalent **only if the inputs are consistent**. When an exam question produces different answers from the two methods, the discrepancy is almost always in the fixed expense provision or in whether exposures were trended.
