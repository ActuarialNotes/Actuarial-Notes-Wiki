---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ab97b7bfe2128499eba2022c5151e8eb5944f7a345d81c94c7f67b3b624db1b5
  sources: []
  open_findings: 0
  log: .verify/Concepts/Severity.md
---

**Severity** is the average cost per claim — total losses divided by claim count — as distinct from [[Frequency|how often claims occur]].

> $$\text{Severity} = \frac{\text{Total Losses}}{\text{Number of Claims}}$$

> $$\text{Pure Premium} = \text{Frequency} \times \text{Severity}$$

- Severity is the **inflation-sensitive** half of the pure premium. Medical costs, wage replacement, repair costs, jury awards and legal expense all feed it, which is why severity trend usually exceeds general inflation in liability lines — the phenomenon called **social inflation**.
- Severity is far **less credible** than frequency at the same volume, because claim size distributions are heavily skewed: a handful of [[Large Loss|large losses]] can move an average by a wide margin while the underlying cost level is unchanged.
- For that reason severity is usually studied on **capped** or **basic limits** data, with the excess layer priced separately through [[Increased Limits|increased limits factors]]. Trending unlimited severity mixes a genuine cost trend with the leveraged growth of the excess layer.
- Severity **develops**, and it develops in two directions at once: upward through IBNER on known claims, downward through the dilution of late-reported small claims. This is why average severity triangles are often built on a [[Report Year]] basis, where the count denominator is fixed.
- The interaction with fixed policy provisions is **leveraged**: with a fixed deductible or limit, a $10\%$ increase in ground-up loss produces more than $10\%$ increase in the insurer's severity — see [[Inflation]].

![[Media/Figures/Severity.svg|340]]

> [!example]- Projecting Ultimate Severity {Example}
> An accident year has $600$ reported claims and $\$4{,}200{,}000$ of reported losses at $24$ months. The severity development factor to ultimate is $1.20$ and ultimate claim count is projected at $650$.
>
> Estimate ultimate losses.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Severity at 24 mo} &= \frac{\$4{,}200{,}000}{600} = \$7{,}000 \\[4pt]
> > \text{Ultimate severity} &= \$7{,}000 \times 1.20 = \$8{,}400 \\[4pt]
> > \text{Ultimate losses} &= 650 \times \$8{,}400 = \$5{,}460{,}000
> > \end{align*}$$
> >
> > The implied loss development factor is $\$5{,}460{,}000 / \$4{,}200{,}000 = 1.30$ — which decomposes into $1.20$ of severity development and $650/600 = 1.083$ of count development. Splitting the two is the whole point of the [[Frequency-Severity Method|frequency-severity approach]]: the actuary can see whether the development is coming from claims not yet reported or from claims already known getting worse.

> [!example]- Capped vs. Unlimited Severity Trend {Example}
> A liability book's average severity, on both an unlimited and a $\$250{,}000$-capped basis:
>
> | AY | Unlimited | Capped at $\$250$K |
> |---|---|---|
> | $2020$ | $\$21{,}000$ | $\$18{,}500$ |
> | $2021$ | $\$23{,}500$ | $\$19{,}400$ |
> | $2022$ | $\$21{,}800$ | $\$20{,}300$ |
> | $2023$ | $\$29{,}500$ | $\$21{,}300$ |
> | $2024$ | $\$26{,}000$ | $\$22{,}300$ |
>
> Which series should be used to select a severity trend?
>
> > [!answer]-
> > The **capped** series. Its year-over-year changes are $+4.9\%$, $+4.6\%$, $+4.9\%$, $+4.7\%$ — a clean $4.8\%$ trend that an exponential fit will reproduce with a high $R^2$.
> >
> > The unlimited series swings $+11.9\%$, $-7.2\%$, $+35.3\%$, $-11.9\%$. Fitting a trend to that measures the accident of *when the large claims happened to fall*, not the rate at which costs are rising. Two actuaries fitting different windows of the same data would reach materially different answers.
> >
> > The correct procedure is:
> >
> > 1. Select the trend from capped data — here $4.8\%$.
> > 2. Price the excess layer separately with [[Increased Limits|ILFs]] or an excess loading, recognizing that the excess layer trends **faster** than the capped layer (leveraged trend).
> > 3. Recombine.
> >
> > Dropping step 2 and simply using the capped trend on unlimited losses understates the projection, because the excess layer's own growth is never picked up.
