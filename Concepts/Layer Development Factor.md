---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-11
  last_checked_by: agent:validate-v1
  content_hash: sha256:ab7467a8d4bb59b3efad3992a7f93af5c9a7e4690b6dfae198a7bae9c3573a0a
  sources:
    - "Sahasrabuddhe, Claims Development by Layer (CAS E-Forum Fall 2010, rev. Jan 2, 2013), PDF pp.1-14 (eqs 2.4, 3.1, 3.2, 3.7, 3.8-3.10, Section 3.3 properties, 4.1, 4.2, 5), p.23 Example 3, sha256:42ecb7ecc7270a462e397a1d4d5c8d42e50b4bc9719122b4c53873dfc84fd5a3 — https://www.casact.org/sites/default/files/2021-03/7_Sahasrabuddhe.pdf"
    - "Sahasrabuddhe, Errata to Claims Development by Layer, p.1, sha256:0f73306a697fd764ca98b3138b416563585f8800e4f169166e359b59ce3142ca — https://www.casact.org/sites/default/files/2021-03/7_Sahasrabuddhe_Errata.pdf"
    - "Siewert, A Model for Reserving Workers Compensation High Deductibles (CAS Forum Summer 1996, pp.217-244), PDF pp.12-13, 16 (eqs 4.2, 4.3, 4.10), sha256:3c340e8fd550816e5c0a4612c20350eb56c5cc3d5c928c0d4c7d1408c66a091c — https://www.casact.org/sites/default/files/2021-03/7_Siewert.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Layer Development Factor.md
---
A **Layer Development Factor** ($F^X_{i,j}$) is the factor that develops claims in a [[Layer of Insurance|layer]] $X$, from $d$ up to $p$, for exposure period $i$ from maturity $j$ to ultimate. Sahasrabuddhe derives it from one basic-limit pattern at the latest exposure period's cost level. That pattern is rescaled by the layer's [[Limited Expected Value|limited expected value]] relative to the basic limit's, at ultimate and at maturity $j$, under a claim size model adjusted for trend.

With $B$ the basic limit and $n$ the latest exposure period, the layer development factor is

> $$F^X_{i,j} = F^B_{n,j} \times \frac{A_{i,\infty}}{A_{i,j}}$$

- $F^B_{n,j}$ is the basic-limit factor from maturity $j$ to ultimate, at the latest exposure period's cost level.
- $A_{i,j}$ is the ratio of the layer's expected claims to the basic limit's at maturity $j$, and $A_{i,\infty}$ the same ratio at ultimate.

The basic limit is chosen where the data is credible enough to estimate development. The ratio $A_{i,j}$ is

> $$A_{i,j} = \frac{LEV(X; \Phi_{i,j})}{LEV(B; \Phi_{n,j})}$$

- $\Phi_{i,j}$ are the claim size model's parameters for exposure period $i$ at maturity $j$. They follow from $\Phi_{n,j}$ and the cost level indices $T_{i,j}$: for a scale family such as the [[Exponential Distribution|exponential]], $\theta_{i,j} = \theta_{n,j} \, T_{i,j}/T_{n,j}$.

The layer's limited expected value is

> $$LEV(X; \Phi) = LEV(p; \Phi) - LEV(d; \Phi)$$

## Building the basic-limit pattern

Restate each cell of the triangle, observed in layer $L$, to the basic limit at the latest cost level: $C^L_{i,j} \times LEV(B; \Phi_{n,j}) / LEV(L; \Phi_{i,j})$. Then develop the restated triangle as usual to get $F^B_{n,j}$. When $B = L$, the restatement only removes the effect of [[Loss Trend|trend]] within the layer.

> [!example]- What are period 3's maturity-1 factors for its \$250,000-limited claims and its \$150,000 xs \$100,000 layer? {Example}
> Reported claims limited to \$250,000 (\$000) have no development after maturity 3:
>
> | Period | Mat. 1 | Mat. 2 | Mat. 3 |
> | --- | ---: | ---: | ---: |
> | 1 | 1,000 | 1,600 | 1,800 |
> | 2 | 1,100 | 1,750 | |
> | 3 | 1,150 | | |
>
> Claim sizes are exponential. Trend is $5\%$ per exposure period, with no calendar period trend. The basic limit is \$100,000. The model gives these LEVs (\$000):
>
> | LEV | Mat. 1 | Mat. 2 | Mat. 3 |
> | --- | ---: | ---: | ---: |
> | 250, period 1 | 84.94 | 114.39 | 127.96 |
> | 250, period 2 | 88.34 | 118.03 | 131.55 |
> | 250, period 3 | 91.79 | 121.67 | 135.12 |
> | 100, period 3 | 63.21 | 72.99 | 76.72 |
>
> > [!answer]-
> > - Restate each cell to the basic limit at the period 3 cost level, multiplying by $LEV(100; \Phi_{3,j}) / LEV(250; \Phi_{i,j})$. For example, $1{,}000 \times 63.21/84.94 = 744.2$.
> >
> > | Period | Mat. 1 | Mat. 2 | Mat. 3 |
> > | --- | ---: | ---: | ---: |
> > | 1 | 744.2 | 1,020.9 | 1,079.2 |
> > | 2 | 787.1 | 1,082.2 | |
> >
> > - The restated factors are $F^B_{1 \to 2} = 2{,}103.1 / 1{,}531.3 = 1.3734$ and $F^B_{2 \to 3} = 1{,}079.2 / 1{,}020.9 = 1.0571$.
> > - The basic-limit factor to ultimate is $F^B_{3,1} = 1.3734 \times 1.0571 = 1.4518$.
> > - For the \$250,000 limit, $A_{3,\infty} = 135.12/76.72 = 1.7612$ and $A_{3,1} = 91.79/63.21 = 1.4521$.
> > - So $F^{250}_{3,1} = 1.4518 \times 1.7612 / 1.4521 = 1.7608$.
> > - For the layer, the LEVs are $135.12 - 76.72 = 58.40$ at ultimate and $91.79 - 63.21 = 28.58$ at maturity 1.
> > - So $A_{3,\infty} = 0.7612$, $A_{3,1} = 0.4521$ and $F^X_{3,1} = 1.4518 \times 0.7612 / 0.4521 = 2.444$.
> > - The unadjusted chain ladder on the \$250,000 triangle gives $1.5952 \times 1.125 = 1.7946$, about $2\%$ too high for period 3.

## Trend and the development of limited claims

Development factors at different layers and cost levels are tied together by the claim size model and trend. So the same pattern of limited factors should not be applied to every exposure period. An unadjusted pattern is right only for ground-up, unlimited data with trend acting solely in the accident year direction.

In the example above, the unadjusted chain ladder overstates period 3's development. The older periods, at lower cost levels, are capped less by the same \$250,000 limit, so their development runs closer to unlimited development. At maturity 2 the method gives $1.1209$ for period 2 and $1.1169$ for period 3. The limit and maturity are the same, but the cost levels differ.

Cook showed trend and development are separate adjustments. Sahasrabuddhe adds that, for limited data, they are related. The adjustment is small for short patterns, low trend and limits above the working layer. It grows when the basic limit lies within the working layer.

## Development factors from ratios at ultimate

Often all that is at hand is a pattern for one layer and ultimate [[Increased Limits|increased limits factors]]. Then the denominator becomes the ratio of layer $X$ to layer $B$ claims observed along one diagonal (Equation 3.10, as corrected by the errata), and the factor is

> $$F^X_{i,j} = F^B_{n,j} \times \frac{LEV(X; \Phi_{i,\infty})/LEV(B; \Phi_{i,\infty})}{R_j(X, B)}$$

- $R_j(X, B)$ is the ratio of layer $X$ to layer $B$ claims at maturity $j$.

Absent negative development, $R_j$ falls with maturity toward its ultimate value $U$. Sahasrabuddhe selects

> $$R_j = U + (1 - U) \times \text{decay factor}$$

With $B$ unlimited and $X$ a deductible layer, $R_j$ is Siewert's limited severity relativity. The formula then gives Siewert's limited and [[Excess Loss Development Factor|excess loss development factors]].

> [!example]- What are the 24-to-ultimate factors for claims limited to \$500,000 and for the \$500,000 xs \$500,000 layer? {Example}
> The 24-to-ultimate factor for claims limited to \$1,000,000 is $1.800$, at the latest cost level. Increased limits factors put the ultimate ratio of claims limited to \$500,000 to claims limited to \$1,000,000 at $U = 0.88$. The ratio at 24 months is selected with a decay factor of $0.60$.
>
> > [!answer]-
> > - The ratio at 24 months is $R_{24} = 0.88 + (1 - 0.88)(0.60) = 0.952$.
> > - For the \$500,000 limit the ultimate ratio is $0.88$, so the factor is $1.800 \times 0.88 / 0.952 = 1.6639$.
> > - For the layer both ratios are complements, $0.12$ at ultimate and $0.048$ at 24 months, so the factor is $1.800 \times 0.12 / 0.048 = 4.5000$.
> > - Check: weighted by the 24-month ratio, $0.952 \times 1.6639 + 0.048 \times 4.5000 = 1.8000$, the \$1M factor.
> > - The upper layer's factor is two and a half times the \$1M factor, because most of its claims are yet to emerge at 24 months.

> [!trap] Restating with the period's own basic-limit LEV
> The basic-limit LEV in the restatement and in $A_{i,j}$ is at the latest period's cost level, $\Phi_{n,j}$, at every maturity. Only the observed layer's LEV, $LEV(L; \Phi_{i,j})$, uses the cell's own period.
