---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:39679006e3bab2ce02abf4c241c394817d14463c18217f6d10a73c095e343453
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Layer Development Factor.md
---

**Layer Development Factor** ($F^X_{i,j}$) is the factor that develops claims in a layer $X$, from $d$ up to $p$, for exposure period $i$ from maturity $j$ to ultimate. Sahasrabuddhe derives it from one basic-limit pattern at the latest exposure period's cost level. That pattern is rescaled by the layer's [[Limited Expected Value|limited expected value]] relative to the basic limit's, at ultimate and at maturity $j$, under a claim size model adjusted for trend.

> $$F^X_{i,j} = F^B_{n,j} \times \frac{A_{i,\infty}}{A_{i,j}}$$

> $$A_{i,j} = \frac{LEV(X; \Phi_{i,j})}{LEV(B; \Phi_{n,j})}$$

> $$LEV(X; \Phi) = LEV(p; \Phi) - LEV(d; \Phi)$$

- **Symbols.** $B$ is the basic limit, chosen where the data is credible enough to estimate development. $n$ is the latest exposure period. $\Phi_{i,j}$ are the claim size model's parameters for exposure period $i$ at maturity $j$. They follow from $\Phi_{n,j}$ and the cost level indices $T_{i,j}$: for a scale family such as the [[Exponential Distribution|exponential]], $\theta_{i,j} = \theta_{n,j} \, T_{i,j}/T_{n,j}$. This is Sahasrabuddhe's Equation 3.7.
- **Building the basic-limit pattern.** Restate each cell of the triangle, observed in layer $L$, to the basic limit at the latest cost level: $C^L_{i,j} \times LEV(B; \Phi_{n,j}) / LEV(L; \Phi_{i,j})$. Then develop the restated triangle as usual to get $F^B_{n,j}$. When $B = L$, the restatement only removes the effect of [[Loss Trend|trend]] within the layer.
- **The finding.** Development factors at different layers and cost levels are tied together by the claim size model and trend. So the same pattern of limited factors should not be applied to every exposure period. An unadjusted pattern is right only for ground-up, unlimited data with trend acting solely in the accident year direction. Cook showed trend and development are separate adjustments; Sahasrabuddhe adds that, for limited data, they are related. The adjustment is small for short patterns, low trend and limits above the working layer. It grows when the basic limit lies within the working layer.
- **With a claim size model at ultimate only.** Often all that is at hand is a pattern for one layer and ultimate [[Increased Limits|increased limits factors]]. Then the denominator becomes $R_j(X, B)$, the ratio of layer $X$ to layer $B$ claims observed along one diagonal (Equation 3.10, as corrected by the errata):
  - $F^X_{i,j} = F^B_{n,j} \times \big[LEV(X; \Phi_{i,\infty})/LEV(B; \Phi_{i,\infty})\big] / R_j(X, B)$.
  - Absent negative development, $R_j$ falls with maturity toward its ultimate value $U$. Sahasrabuddhe selects $R_j = U + (1 - U) \times \text{decay factor}$.
  - With $B$ unlimited and $X$ a deductible layer, $R_j$ is Siewert's limited severity relativity. The formula then gives Siewert's limited and [[Excess Loss Development Factor|excess loss development factors]].
- See [[Claims Development by Layer (Sahasrabuddhe - 2010)|Sahasrabuddhe (2010)]], and [[Layer of Insurance]] and [[Excess Insurance]] for the layers themselves.

> [!example]- Moving a \$1M Pattern to Other Layers with Ratios Only {Example}
> The 24-to-ultimate factor for claims limited to \$1,000,000 is $1.800$, at the latest cost level. Increased limits factors put the ultimate ratio of claims limited to \$500,000 to claims limited to \$1,000,000 at $U = 0.88$. The ratio at 24 months is selected with a decay factor of $0.60$.
>
> Find the 24-to-ultimate factors for claims limited to \$500,000 and for the \$500,000 xs \$500,000 layer.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > R_{24} &= 0.88 + (1 - 0.88)(0.60) \\
> > &= 0.952
> > \end{align*}
> > $$
> >
> > For the \$500,000 limit, the ultimate LEV ratio is $0.88$:
> >
> > $$
> > \begin{align*}
> > F^{500\text{K}}_{24} &= 1.800 \times 0.88 / 0.952 \\
> > &= 1.6639
> > \end{align*}
> > $$
> >
> > For the layer, both ratios are complements, $1 - 0.88 = 0.12$ at ultimate and $1 - 0.952 = 0.048$ at 24 months:
> >
> > $$
> > \begin{align*}
> > F^{\text{xs}}_{24} &= 1.800 \times 0.12 / 0.048 \\
> > &= 4.5000
> > \end{align*}
> > $$
> >
> > Check that the two layers rebuild the \$1M factor, weighted by the 24-month ratio:
> >
> > $$
> > \begin{align*}
> > 0.952(1.6639) + 0.048(4.5000) &= 1.5840 + 0.2160 \\
> > &= 1.8000
> > \end{align*}
> > $$
> >
> > The upper layer's factor is two and a half times the \$1M factor, because most of its claims are yet to emerge at 24 months.

> [!example]- The Full Method: Restate, Develop, Rescale {Example}
> Reported claims limited to \$250,000 (\$000) have no development after maturity 3:
>
> | Exposure period | Maturity 1 | Maturity 2 | Maturity 3 |
> |---|---|---|---|
> | 1 | $1{,}000$ | $1{,}600$ | $1{,}800$ |
> | 2 | $1{,}100$ | $1{,}750$ | |
> | 3 | $1{,}150$ | | |
>
> Claim sizes are exponential. Trend is $5\%$ per exposure period, with no calendar period trend. The basic limit is \$100,000. The model gives these LEVs (\$000):
>
> | LEV | Maturity 1 | Maturity 2 | Maturity 3 |
> |---|---|---|---|
> | at 250, period 1 | $84.94$ | $114.39$ | $127.96$ |
> | at 250, period 2 | $88.34$ | $118.03$ | $131.55$ |
> | at 250, period 3 | $91.79$ | $121.67$ | $135.12$ |
> | at 100, period 3 | $63.21$ | $72.99$ | $76.72$ |
>
> Find the basic-limit pattern at the period 3 cost level. Use it to find the maturity-1 factor for period 3's \$250,000-limited claims and for its \$150,000 xs \$100,000 layer. Compare with the unadjusted chain ladder.
>
> > [!answer]-
> > **Restate** each cell to the basic limit at the period 3 cost level, multiplying by $LEV(100; \Phi_{3,j}) / LEV(250; \Phi_{i,j})$:
> >
> > | Exposure period | Maturity 1 | Maturity 2 | Maturity 3 |
> > |---|---|---|---|
> > | 1 | $744.2$ | $1{,}020.9$ | $1{,}079.2$ |
> > | 2 | $787.1$ | $1{,}082.2$ | |
> >
> > For example, $1{,}000 \times 63.21/84.94 = 744.2$.
> >
> > **Develop** the restated triangle:
> >
> > $$
> > \begin{align*}
> > F^B_{1 \to 2} &= \frac{1{,}020.9 + 1{,}082.2}{744.2 + 787.1} \\
> > &= 1.3734 \\
> > F^B_{2 \to 3} &= 1{,}079.2 / 1{,}020.9 \\
> > &= 1.0571 \\
> > F^B_{3,1} &= 1.3734 \times 1.0571 \\
> > &= 1.4518
> > \end{align*}
> > $$
> >
> > **Rescale** to the \$250,000 limit for period 3:
> >
> > $$
> > \begin{align*}
> > F^{250}_{3,1} &= 1.4518 \times \frac{135.12 / 76.72}{91.79 / 63.21} \\
> > &= 1.4518 \times \frac{1.7612}{1.4521} \\
> > &= 1.7608
> > \end{align*}
> > $$
> >
> > For the \$150,000 xs \$100,000 layer, the layer LEVs are $135.12 - 76.72 = 58.40$ at ultimate and $91.79 - 63.21 = 28.58$ at maturity 1:
> >
> > $$
> > \begin{align*}
> > F^{X}_{3,1} &= 1.4518 \times \frac{58.40 / 76.72}{28.58 / 63.21} \\
> > &= 1.4518 \times \frac{0.7612}{0.4521} \\
> > &= 2.4444
> > \end{align*}
> > $$
> >
> > **Unadjusted,** the \$250,000 triangle gives $\frac{3{,}350}{2{,}100} \times \frac{1{,}800}{1{,}600} = 1.5952 \times 1.125 = 1.7946$. That overstates period 3's development by about $2\%$. The older periods, at lower cost levels, are capped less by the same \$250,000 limit, so their development runs closer to unlimited development.
> >
> > The same method at maturity 2 gives $1.0571 \times (131.55/76.72)/(118.03/72.99) = 1.1209$ for period 2. For period 3 it gives $1.0571 \times (135.12/76.72)/(121.67/72.99) = 1.1169$. The limit and maturity are the same, but the cost levels differ, so the factors differ.
