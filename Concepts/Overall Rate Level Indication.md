---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:040e03ef057aaea31e3db2fb08dfc19bafffb536e80a454956dfa55ef98b8211
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 5 p.64 (PDF p.76); Ch. 6 p.94 (PDF p.106); Ch. 7 pp.137, 139 (PDF pp.149, 151); Ch. 8 pp.141-148 (PDF pp.153-160), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "ASOP No. 13, Trending Procedures in Property/Casualty Insurance (ASB, 2009), Section 3.8, p.4 (PDF p.8), sha256:5d985e9cbf666cda56b67bb6489e2f1430313278145e87816c7b2297dcd59acd — https://www.casact.org/sites/default/files/2021-03/5_ASOP_13.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Overall Rate Level Indication.md
---

**Overall Rate Level Indication** is the answer to the ratemaking question: by what percentage must the rate level change so that expected premium covers expected losses, expenses and profit for the future policy period? It is the aggregate result, before any [[Classification Ratemaking|classification]] work distributes it.

> $$\text{Indicated Change} = \frac{\text{Projected Loss \& LAE Ratio} + F\%}{1 - V - Q_T} - 1$$

> $$\text{Indicated Change} = \frac{\text{Indicated Rate}}{\text{Current Rate}} - 1$$

The build-up, following Werner & Modlin's chapters:

1. **Premium** — historical earned premium, brought to [[On Level Premium|current rate level]], developed to ultimate where it is still changing, and [[Premium Trend|trended]].
2. **Losses** — reported losses with extraordinary [[Large Loss|large losses]] and [[Catastrophe Loss|catastrophes]] replaced by a long-term provision, [[Loss Development|developed]] to ultimate, [[Loss Trend|trended]] to the future cost level, restated for any benefit or coverage change, and including [[Allocated Loss Adjustment Expense|ALAE]] and [[Unallocated Loss Adjustment Expenses ULAE|ULAE]]. Werner prescribes no single order for these adjustments.
3. **Expenses** — split into [[Fixed Expenses|fixed]] (numerator, per exposure or as a ratio) and [[Variable Expenses|variable]] (denominator); the net cost of non-proportional [[Reinsurance|reinsurance]] may be included as an expense item.
4. **Profit** — the target [[Profit and Contingency Provision|underwriting profit provision]] $Q_T$.
5. **Credibility** — weight the indication against a [[Complement of Credibility|complement]] where the data is thin.
6. **Selection** — the filed change, which may differ for the reasons on [[Rate Change]].

Further points:

- Steps 1 and 2 are the two halves of "put everything on a common basis". Premium is adjusted for **rate level**; losses for **maturity and cost level**. Skipping either produces a systematically wrong answer, and the two errors do not offset.
- The [[Loss Ratio Method]] and [[Pure Premium Method]] are alternative routes to the same indication; the first gives a change, the second an absolute rate.
- Weighting across years in the experience period is a judgment: many companies sum projected losses and premium across all years, which weights each year's loss ratio by its premium; others select weights, often giving more to the most recent years. More years buys [[Credibility|credibility]], fewer years buys responsiveness.
- The indication is an **estimate with a distribution**, not a fact. A sensitivity test shows how the answer moves under alternative trend, development and profit selections.

![[Media/Figures/Overall_Rate_Level_Indication.svg|340]]

> [!example]- Full Overall Indication {Example}
> Two accident years, valued $12/31/2024$. Loss trend $6\%$; trend periods $3.0$ and $2.0$ years. LAE $10\%$ of loss. Variable expenses $23\%$, fixed expense ratio $6\%$, target profit $5\%$. Credibility $Z = 0.80$ against a complement of $+2.0\%$.
>
> | AY | Earned premium | On-level factor | Reported loss | CDF |
> |---|---|---|---|---|
> | $2023$ | $\$12{,}000{,}000$ | $1.085$ | $\$7{,}100{,}000$ | $1.16$ |
> | $2024$ | $\$13{,}500{,}000$ | $1.030$ | $\$6{,}200{,}000$ | $1.38$ |
>
> Compute the selected rate change.
>
> > [!answer]-
> > **Losses:**
> >
> > $$\begin{align*}
> > 2023: \; 7{,}100 \times 1.16 \times 1.06^{3.0} \times 1.10 &= \$10{,}790 \text{K} \\
> > 2024: \; 6{,}200 \times 1.38 \times 1.06^{2.0} \times 1.10 &= \$10{,}575 \text{K}
> > \end{align*}$$
> >
> > **Premium:**
> >
> > $$\begin{align*}
> > 2023: \; 12{,}000 \times 1.085 &= \$13{,}020 \text{K} \\
> > 2024: \; 13{,}500 \times 1.030 &= \$13{,}905 \text{K}
> > \end{align*}$$
> >
> > **Loss ratios:** $82.9\%$ and $76.1\%$; combined $\frac{\$21{,}365}{\$26{,}925} = 79.35\%$.
> >
> > $$\begin{align*}
> > \text{Indicated factor} &= \frac{0.7935 + 0.06}{1 - 0.23 - 0.05} \\
> > &= \frac{0.8535}{0.72} \\
> > &= 1.1854
> > \end{align*}$$
> >
> > an indication of $+18.5\%$. Credibility-weighting:
> >
> > $$0.80 \times 18.5\% + 0.20 \times 2.0\% = +15.2\%$$
> >
> > Before filing $+15.2\%$, two things demand attention: the two years disagree by nearly seven points while the less mature year rests on a $1.38$ CDF, and an increase of this size will move the [[Mix of Business|mix]] through retention. Both belong in the documentation.

> [!example]- Where the Indication Is Sensitive {Example}
> Using the book above, test the $+18.5\%$ indication against alternative selections: loss trend $4\%$ instead of $6\%$; AY 2024 CDF $1.30$ instead of $1.38$; profit provision $3\%$ instead of $5\%$.
>
> > [!answer]-
> > Changing one assumption at a time (before credibility weighting):
> >
> > | Change | New indication |
> > |---|---|
> > | Base | $+18.5\%$ |
> > | Loss trend $4\%$ | $+13.4\%$ |
> > | AY 2024 CDF $1.30$ | $+15.4\%$ |
> > | Profit provision $3\%$ | $+15.3\%$ |
> >
> > A two-point change in the trend selection moves the indication five points — more than either of the other two assumptions — because trend compounds over a $2$–$3$ year period and applies to the entire loss provision.
> >
> > [[ASOP 13 - Trending Procedures in Property Casualty Insurance (ASB - 2009)|ASOP 13]] sets the standard for the trending procedure behind that selection, including documentation of its methods, assumptions and data in a form another actuary could assess for reasonableness.
