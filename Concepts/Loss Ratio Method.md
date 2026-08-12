**Loss Ratio Method** derives an indicated rate **change** by comparing the projected loss and LAE ratio against the [[Permissible Loss Ratio|permissible loss ratio]]. It works entirely in ratios, so it needs premium on level rather than exposure counts.

> $$\text{Indicated Change} = \frac{\text{Projected Loss \& LAE Ratio} + F\%}{1 - V - Q_T} - 1$$

> $$\text{Indicated Change} = \frac{\text{Projected Loss Ratio}}{\text{PLR}} - 1 \quad \text{(all-variable form)}$$

- The first form is Werner's: [[Fixed Expenses|fixed expenses]] as a ratio in the **numerator**, [[Variable Expenses|variable expenses]] $V$ and profit $Q_T$ in the denominator. The second is the all-variable simplification, where $\text{PLR} = 1 - V - F\% - Q_T$. Using $F\%$ in both places double-counts it.
- The numerator's loss ratio must be **projected**: ultimate losses (developed), trended to the future policy period, over earned premium brought to **current rate level** ([[On-Leveling]]) and trended ([[Premium Trend]]).
- The method's advantage is that it needs no exposure data, which makes it the practical choice where the [[Exposure Base|exposure base]] is dollar-denominated (payroll, sales, amount of insurance) or unreliable. Its requirement is a clean rate-change history, without which on-levelling is guesswork.
- It produces a **change**, not a rate — so it cannot price a new programme, and it presumes the current rate structure is a sensible starting point.
- The method is equivalent to the [[Pure Premium Method]] given consistent inputs, because a loss ratio is the pure premium divided by the average premium. Most filings use the loss ratio method for the overall indication and the pure premium method for [[Classification Ratemaking|class relativities]].

> [!example]- Straightforward Loss Ratio Indication {Example}
> Projected ultimate trended losses and LAE are $\$720{,}000$; trended on-level earned premium is $\$1{,}000{,}000$. Variable expenses are $22\%$, fixed expenses $6\%$ of premium, target profit $5\%$.
>
> Compute the indicated change.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Projected LR} &= \frac{\$720{,}000}{\$1{,}000{,}000} = 72.0\% \\[6pt]
> > \text{Indicated factor} &= \frac{0.72 + 0.06}{1 - 0.22 - 0.05} \\
> > &= \frac{0.78}{0.73} \\
> > &= 1.0685
> > \end{align*}$$
> >
> > $$\text{Indicated change} = +6.9\%$$
> >
> > Under the all-variable shortcut, $\text{PLR} = 1 - 0.22 - 0.06 - 0.05 = 0.67$ and the indication is $0.72/0.67 - 1 = +7.5\%$. Both are defensible; using $0.78/0.67 = +16.4\%$ is not.

> [!example]- A Full Indication from Raw Data {Example}
> Three accident years, each with reported losses at $12/31/2024$, earned premium, and the on-level factors and CDFs shown. Loss trend is $5\%$; trend periods are $3.5$, $2.5$ and $1.5$ years. LAE is $11\%$ of loss. Variable expenses $21\%$, fixed expense ratio $7\%$, target profit $4\%$.
>
> | AY | EP | Reported loss | OLF | CDF |
> |---|---|---|---|---|
> | $2022$ | $\$8{,}000{,}000$ | $\$4{,}600{,}000$ | $1.120$ | $1.08$ |
> | $2023$ | $\$8{,}600{,}000$ | $\$4{,}500{,}000$ | $1.075$ | $1.19$ |
> | $2024$ | $\$9{,}300{,}000$ | $\$3{,}900{,}000$ | $1.030$ | $1.42$ |
>
> Compute the indicated rate change.
>
> > [!answer]-
> > **Losses — develop, trend, load LAE:**
> >
> > $$\begin{align*}
> > 2022: \; 4{,}600 \times 1.08 \times 1.05^{3.5} \times 1.11 &= \$6{,}541 \text{K} \\
> > 2023: \; 4{,}500 \times 1.19 \times 1.05^{2.5} \times 1.11 &= \$6{,}715 \text{K} \\
> > 2024: \; 3{,}900 \times 1.42 \times 1.05^{1.5} \times 1.11 &= \$6{,}614 \text{K}
> > \end{align*}$$
> >
> > **Premium — on level:**
> >
> > $$\begin{align*}
> > 2022: \; 8{,}000 \times 1.120 &= \$8{,}960 \text{K} \\
> > 2023: \; 8{,}600 \times 1.075 &= \$9{,}245 \text{K} \\
> > 2024: \; 9{,}300 \times 1.030 &= \$9{,}579 \text{K}
> > \end{align*}$$
> >
> > **Loss ratios by year:** $73.0\%$, $72.6\%$, $69.0\%$ — a stable series, which is itself a reasonableness check.
> >
> > $$\begin{align*}
> > \text{Weighted LR} &= \frac{\$19{,}870}{\$27{,}784} \\
> > &= 71.5\% \\[6pt]
> > \text{Indicated factor} &= \frac{0.715 + 0.07}{1 - 0.21 - 0.04} \\
> > &= \frac{0.785}{0.75} \\
> > &= 1.047
> > \end{align*}$$
> >
> > $$\text{Indicated change} = +4.7\%$$
> >
> > Two judgment calls sit inside this: whether to weight the three years equally (as here, by premium volume) or to give more weight to the most recent, and whether the $69.0\%$ in AY 2024 is a genuine improvement or an artefact of the $1.42$ CDF on the least mature year. A common refinement is to weight $20/30/50$ toward recency — which here would give a slightly lower indication.
