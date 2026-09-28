---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7f1290632ca39a5f021a41fbb2a3bccb5020e862fbe1a5dd0a7c20660b266a13
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Credible Loss Ratio Reserve.md
---

**Credible loss ratio reserve** $R_i^c$ is [[Credible Loss Ratio Claims Reserves (Hurlimann - 2009)|Hürlimann's]] credibility mixture of two reserves for origin period $i$, both built from a triangle's incremental loss ratios. The **individual** loss ratio reserve grosses up the period's own paid claims, like the [[Chain Ladder Method|chain ladder]]. The **collective** loss ratio reserve applies the whole portfolio's burning cost, like [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] with an a priori taken from the data.

> $$R_i^{c} = Z_i\,R_i^{ind} + (1 - Z_i)\,R_i^{coll}$$

> $$R_i^{ind} = \frac{q_i}{p_i}\,C_{i,n-i+1}$$

> $$R_i^{coll} = q_i\,V_i\sum_{k=1}^{n} m_k$$

- $V_i$ is the premium of origin period $i$ and $C_{i,n-i+1}$ its latest cumulative paid claims.
- $m_k$ is the **incremental loss ratio** of development period $k$: the paid claims $S_{ik}$ of that period, summed over the origin periods that have reached it, divided by those periods' premium. $\sum_k m_k$ is the expected loss ratio.
- $p_i = \sum_{k \le n-i+1} m_k \big/ \sum_k m_k$ is the **loss ratio payout factor**, the expected share of ultimate paid by now, and $q_i = 1 - p_i$ is the reserve factor. The method works from loss ratios where the standard methods use link ratios.
- **Choosing $Z_i$.** Benktander's weight is $Z_i = p_i$, the [[Benktander Method|Benktander]] loss ratio reserve. Neuhaus's is $Z_i = p_i \sum_k m_k$. Hürlimann's optimal weight minimizes both the mean squared error and the variance of $R_i^c$ when $\mathrm{Var}[U_i] = \mathrm{Var}[U_i^{BC}]$:

> $$Z_i^{*} = \frac{p_i}{p_i + \sqrt{p_i}}$$

- **Its properties.** $Z_i^* \le \tfrac{1}{2}$, with equality only when $p_i = 1$, and it falls as origin periods get younger. It is below Benktander's $p_i$ whenever $p_i > 0.382$, and Hürlimann notes that the Benktander and Neuhaus methods usually give the individual reserve more weight. In his examples, all three credible reserves are close to one another and well ahead of either extreme on mean squared error.
- **Mean squared error.** Hürlimann uses Mack's (2000) conditional payout model, $\mathrm{Var}[C_{i,n-i+1} \mid U_i] = p_i q_i\,\alpha_i^2(U_i)$. With $t_i$ the credibility parameter ($\sqrt{p_i}$ above):

> $$\mathrm{mse}(R_i^c) = E[\alpha_i^2(U_i)]\left(\frac{Z_i^2}{p_i} + \frac{1}{q_i} + \frac{(1 - Z_i)^2}{t_i}\right)q_i^2$$

- $Z_i = 1$ gives $\mathrm{mse}(R_i^{ind}) = E[\alpha_i^2]\,q_i/p_i$ and $Z_i = 0$ gives $\mathrm{mse}(R_i^{coll}) = E[\alpha_i^2]\,q_i(1 + q_i/t_i)$. The minimum is at $Z_i = p_i/(p_i + t_i)$.
- **Relations to the standard methods.**
  - The collective reserve is Mack's (1997) loss ratio method. Its a priori is the portfolio's burning cost, so actuaries using the same premiums always agree, unlike a judgmental BF prior.
  - Iterating $U \to C_{i,n-i+1} + q_i U$ from the burning cost $V_i\sum_k m_k$ gives first the collective reserve, then the Benktander reserve, and converges to the individual reserve.
  - With chain-ladder lag factors $p_i^{CL} = 1/\text{CDF}$ in place of $p_i$, the individual reserve becomes the chain ladder reserve. Mixing it with a [[Cape Cod Method|Cape Cod]] or BF collective reserve at $Z_i = p_i^{CL}/(p_i^{CL} + \sqrt{p_i^{CL}})$ gives Hürlimann's optimal Cape Cod and optimal Bornhuetter-Ferguson methods.

> [!example]- Collective, Individual and Credible Reserves From One Triangle {Example}
> Incremental paid claims and premium (\$000s), with no development after $36$ months:
>
> | AY | $0$–$12$ | $12$–$24$ | $24$–$36$ | Premium |
> |---|---|---|---|---|
> | 1 | $800$ | $600$ | $200$ | $2{,}000$ |
> | 2 | $1{,}100$ | $750$ | | $2{,}500$ |
> | 3 | $1{,}100$ | | | $3{,}000$ |
>
> Compute the individual, collective, Benktander, Neuhaus and optimal credible loss ratio reserves.
>
> > [!answer]-
> > **Incremental loss ratios:**
> >
> > $$
> > \begin{align*}
> > m_1 &= \frac{800 + 1{,}100 + 1{,}100}{2{,}000 + 2{,}500 + 3{,}000} \\
> > &= 0.40 \\
> > m_2 &= \frac{600 + 750}{2{,}000 + 2{,}500} \\
> > &= 0.30 \\
> > m_3 &= \frac{200}{2{,}000} \\
> > &= 0.10
> > \end{align*}
> > $$
> >
> > So $\sum m_k = 0.80$, $p_2 = 0.70/0.80 = 0.875$ and $p_3 = 0.40/0.80 = 0.50$.
> >
> > **AY 2:** $C = 1{,}850$ and $q = 0.125$:
> >
> > $$
> > \begin{align*}
> > R^{ind} &= \frac{0.125}{0.875}(1{,}850) \\
> > &= 264.29 \\
> > R^{coll} &= 0.125 \times 2{,}500 \times 0.80 \\
> > &= 250.00
> > \end{align*}
> > $$
> >
> > **AY 3:** $C = 1{,}100$ and $q = 0.50$:
> >
> > $$
> > \begin{align*}
> > R^{ind} &= \frac{0.50}{0.50}(1{,}100) \\
> > &= 1{,}100 \\
> > R^{coll} &= 0.50 \times 3{,}000 \times 0.80 \\
> > &= 1{,}200
> > \end{align*}
> > $$
> >
> > **Weights and credible reserves:**
> >
> > | | AY 2 $Z$ | AY 2 $R^c$ | AY 3 $Z$ | AY 3 $R^c$ |
> > |---|---|---|---|---|
> > | Benktander, $p$ | $0.875$ | $262.50$ | $0.500$ | $1{,}150.00$ |
> > | Neuhaus, $p \times 0.80$ | $0.700$ | $260.00$ | $0.400$ | $1{,}160.00$ |
> > | Optimal, $p/(p + \sqrt{p})$ | $0.483$ | $256.90$ | $0.414$ | $1{,}158.58$ |
> >
> > For example, the optimal AY 2 weight is $0.875/(0.875 + 0.9354) = 0.4833$, and $0.4833(264.29) + 0.5167(250) = 256.90$.
> >
> > The totals are $1{,}364.29$ (individual), $1{,}450.00$ (collective), $1{,}412.50$ (Benktander), $1{,}420.00$ (Neuhaus) and $1{,}415.48$ (optimal). The three credible reserves lie between the extremes, as Hürlimann found. For AY 2, the optimal weight ($0.48$) is far below Benktander's ($0.875$), so it leans more on the collective reserve for the mature year.

> [!example]- Which Reserve Has the Smallest Mean Squared Error? {Example}
> For AY 3 above ($p = q = 0.5$), take $E[\alpha^2(U)] = 20{,}000$ and $t = \sqrt{p}$. Compare the mean squared errors of the individual, collective, Benktander, Neuhaus and optimal reserves.
>
> > [!answer]-
> > Here $t = 0.7071$, and $\mathrm{mse} = 20{,}000\,(Z^2/0.5 + 2 + (1-Z)^2/0.7071)(0.25)$:
> >
> > | Reserve | $Z$ | MSE | Root MSE |
> > |---|---|---|---|
> > | Individual | $1$ | $20{,}000$ | $141.4$ |
> > | Collective | $0$ | $17{,}071$ | $130.7$ |
> > | Benktander | $0.500$ | $14{,}268$ | $119.4$ |
> > | Neuhaus | $0.400$ | $14{,}146$ | $118.9$ |
> > | Optimal | $0.414$ | $14{,}142$ | $118.9$ |
> >
> > The optimal row, for example:
> >
> > $$
> > \begin{align*}
> > \mathrm{mse} &= 20{,}000\left(\frac{0.1716}{0.5} + 2 + \frac{0.3431}{0.7071}\right)(0.25) \\
> > &= 20{,}000 \times 0.7071 \\
> > &= 14{,}142
> > \end{align*}
> > $$
> >
> > Blending cuts the error by about $17\%$ against the better extreme. Among the blends the differences are tiny: Benktander's MSE is only $0.9\%$ above the optimum and Neuhaus's $0.02\%$. That is why Hürlimann recommends all three simple credible methods when the optimal weights cannot be estimated more precisely.
