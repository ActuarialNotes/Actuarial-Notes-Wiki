---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-12
  last_checked_by: agent:validate-v1
  content_hash: sha256:0921e315801cd47ce16c8d761640d29361a43dee9bcd338ed26fd4ec90459793
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 8 pp.143-145 (PDF pp.155-157), Ch. 13 p.240 (PDF p.252) and Ch. 14 p.276 (PDF p.288), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
    - "CAS Statement of Principles Regarding Property and Casualty Insurance Ratemaking (adopted May 1988), sha256:f240ea62dd033aac827c2073e56c0a4061d5c84531e5cf6be02d333a8f9f2140 — p.2, Principle 4"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Rate Change.md
---

![[Media/Figures/Rate_Change.svg|340]]

A **Rate Change** is the percentage by which an insurer changes its rates. The indicated change comes out of the [[Overall Rate Level Indication|rate level indication]], and the selected change is the one actually filed and implemented. From the [[Pure Premium Method|pure premium method]]'s indicated average rate, the indicated change is

> $$\text{Indicated Change} = \frac{\text{Indicated Rate}}{\text{Current Rate}} - 1$$

- $\text{Indicated Rate}$ is the indicated average premium per exposure.
- $\text{Current Rate}$ is the current average premium per exposure at current rate level.

The target premium after the change is the current premium times one plus the change. The new average rate is likewise the current average rate times the indicated change factor.

> [!example]- The indicated average premium is $\$540$ per exposure and the current average premium at current rate level is $\$500$. What are the indicated change and the target premium of a book with $\$2{,}000{,}000$ of premium at current rates? {Example}
> - The indicated change is $540/500 - 1 = +8.0\%$.
> - The target premium is $2{,}000{,}000 \times 1.08 = \$2{,}160{,}000$.

## Indicated change in the loss ratio method

The [[Loss Ratio Method|loss ratio method]] gives the change directly, with the fixed expense ratio in the numerator:

> $$\text{Indicated Change} = \frac{\text{Projected Loss \& LAE Ratio} + F\%}{1 - V - Q_T} - 1$$

- $\text{Projected Loss \& LAE Ratio}$ is the projected losses and LAE, with ULAE loaded as a percentage of loss and ALAE, divided by the projected premium at current rate level.
- $F\%$ is the [[Fixed Expenses|fixed expense]] ratio.
- $V$ is the [[Variable Expenses|variable expense]] provision and $Q_T$ the target [[Profit and Contingency Provision|profit and contingencies provision]].

> [!example]- The projected loss and LAE ratio is $65\%$, the fixed expense ratio $6.5\%$, variable expenses $25\%$ and the target profit provision $10\%$. What is the indicated change? {Example}
> - The numerator is $0.65 + 0.065 = 0.715$ and the denominator is $1 - 0.25 - 0.10 = 0.65$.
> - The indicated change is $0.715/0.65 - 1 = +10\%$.

## Selected change

The selected change may differ from the indicated one, for reasons that are legitimate and documented:

1. **Regulation.** A limit on the size of a change, a regulator who disagrees with an assumption in the indication, or a notice or hearing required above some size ([[Ratemaking Constraints|ratemaking constraints]]).
2. **Customer retention.** Large increases prompt renewing customers to shop, and the insurer may cap the change any one policy receives.
3. **Competition.** The change is weighed against competitors' rates and the effect on volume and market share.
4. **Operations.** Large changes to rating systems cost time and resources.
5. **Credibility.** Thin data is weighted with a [[Complement of Credibility|complement]].
6. **Long-term profitability**, such as [[Lifetime Value|lifetime value]] analysis.

The indication is still recorded as indicated, and the departure from it is identified separately.

## Implementing the change in the rating algorithm

An overall change is implemented through the [[Rating Algorithm|rating algorithm]], usually through the base rate. When classification relativities change at the same time, the base rate is set so that the proposed premium, summed over the exposures at the new base rate and the new relativities, equals the target premium. The base rate change is then

> $$\text{Base Rate Factor} = \frac{1 + \text{Overall Change}}{1 + \text{Relativity Effect}}$$

- $\text{Overall Change}$ is the selected overall rate change.
- $\text{Relativity Effect}$ is the change in premium the new relativities alone would make at the current base rate.

The factor $1/(1 + \text{Relativity Effect})$ is the off-balance factor. A revenue-neutral change to the relativities alone, with no overall change, is off-balanced the same way, and each class's total change is its revenue-neutral factor times one plus the overall change.

> [!example]- The overall indication is $+8.0\%$. New territory relativities, applied to the current book at the current base rate, would raise premium by $3.0\%$. What base rate change is needed? {Example}
> - The relativities already deliver part of the increase, so the base rate supplies only the rest.
> - The base rate factor is $1.080/1.030 = 1.0485$, a $+4.85\%$ change.
> - Together, $1.0485 \times 1.030 = 1.080$, the intended $+8.0\%$.
> - Taking $+8.0\%$ on the base rate as well as the new relativities would give $1.08 \times 1.03 = 1.112$, a $+11.2\%$ change.

## Capping the change

When a territory's or class's change is capped below its indication, the premium falls short of the target. The shortfall is the current premium times the indicated change less the capped change. It is made up by scaling the uncapped changes up by a common factor, so total premium still meets the target.

> [!example]- Territory A has $\$1{,}000{,}000$ of current premium and an indicated change of $+25\%$, capped at $+15\%$. Territory B has $\$3{,}000{,}000$ and an indication of $+5\%$. What change does Territory B need to keep the overall $+10\%$? {Example}
> - The shortfall in Territory A is $1{,}000{,}000 \times (0.25 - 0.15) = \$100{,}000$.
> - Territory B's indicated premium is $\$3{,}150{,}000$, so it must collect $\$3{,}250{,}000$.
> - Territory B's change is $3{,}250{,}000/3{,}000{,}000 - 1 = +8.3\%$.

Raising one territory's rates above its indication to fund another's cap invites adverse selection. The over-charged insureds leave for cheaper competitors, while the under-charged ones stay or are attracted, and the mix shifts toward less profitable business.

## Effect on the book

The change in average premium is the proposed average premium divided by the current average premium, less one. Calculated on the current exposure distribution, it ignores that the mix of insureds may shift after the change. Insureds are price sensitive. An across-the-board increase may cause the best risks, who can find cheaper rates elsewhere, to leave while the higher risks with fewer alternatives stay, so a profit calculation that holds the book fixed overstates the result. Every implemented change also enters the rate level history used to put future premium [[On Level Premium|on level]].

> [!trap] Subtracting instead of dividing
> Rate changes combine by multiplication. A $+8.0\%$ target with a $+3.0\%$ relativity effect needs a $1.08/1.03 = +4.85\%$ base rate change, not $8.0\% - 3.0\% = 5.0\%$.
