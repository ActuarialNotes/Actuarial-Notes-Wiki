---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:e776ba7c0bfba6347e7b6b76c901e68be4f2d918fbaa5f8c2178c7d924b0753a
  sources:
    - "Hürlimann, Credible Loss Ratio Claims Reserves: The Benktander, Neuhaus and Mack Methods Revisited (ASTIN Bulletin 39(1), 2009), printed pp.81-94 (PDF pp.1-14: eqs 2.1-2.8, 3.1-3.5, 4.4-4.7, 4.11, 6.1-6.14, Theorem 6.1, abstract and Section 1 conclusions), sha256:83ebe8ec5758fdb800e168175d6b7f2a6862a2d85bf8314875fcc7d5d1453c28 — https://www.casact.org/sites/default/files/2021-03/7_Hurlimann.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Credible Loss Ratio Reserve.md
---

A **Credible Loss Ratio Reserve** $R_i^c$ is [[Credible Loss Ratio Claims Reserves (Hurlimann - 2009)|Hürlimann's]] credibility mixture of two reserves for origin period $i$, both built from a triangle's incremental loss ratios. The **individual** loss ratio reserve $R_i^{ind}$ grosses up the period's own paid claims, like the [[Chain Ladder Method|chain ladder]]. The **collective** loss ratio reserve $R_i^{coll}$ applies the whole portfolio's burning cost, like [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] with an a priori taken from the data. With credibility weight $Z_i$ on the individual reserve, the credible loss ratio reserve is

> $$R_i^{c} = Z_i\,R_i^{ind} + (1 - Z_i)\,R_i^{coll}$$

The result is an estimate of the unpaid claims, not of the ultimate. The total reserve is the sum of the origin periods' reserves.

## Individual and collective reserves

The method works from loss ratios where the standard methods use link ratios. The **incremental loss ratio** of development period $k$ is the paid claims of that period, summed over the origin periods that have reached it, divided by those periods' premium:

> $$m_k = \frac{\sum_{i \le n-k+1} S_{ik}}{\sum_{i \le n-k+1} V_i}$$

- $S_{ik}$ is the incremental paid claims of origin period $i$ in development period $k$.
- $V_i$ is the premium of origin period $i$.
- $n$ is the number of development periods.

$\sum_k m_k$ is the expected loss ratio. The **loss ratio payout factor**, the expected share of ultimate paid by now, is

> $$p_i = \frac{\sum_{k \le n-i+1} m_k}{\sum_{k=1}^{n} m_k}$$

and $q_i = 1 - p_i$ is the reserve factor. The individual loss ratio reserve is

> $$R_i^{ind} = \frac{q_i}{p_i}\,C_{i,n-i+1}$$

- $C_{i,n-i+1}$ is the latest cumulative paid claims of origin period $i$.

The collective loss ratio reserve is

> $$R_i^{coll} = q_i\,V_i\sum_{k=1}^{n} m_k$$

The collective reserve ignores the paid claims to date. It uses only the premium, the expected loss ratio and the reserve factor, and its a priori ultimate is $U_i^{BC} = V_i\sum_k m_k$. The same $m_k$, and so the same expected loss ratio and payout pattern, are applied to every origin period. An origin period with no development expected beyond its latest age has $p_i = 1$ and $q_i = 0$, so every one of these reserves is zero for it.

## Credibility weights

Benktander's weight is $Z_i = p_i$, the [[Benktander Method|Benktander]] loss ratio reserve. Neuhaus's is $Z_i = p_i \sum_k m_k$, the payout factor times a constant, the expected loss ratio, so it too grows as the period matures. Hürlimann's optimal weight minimizes both the mean squared error and the variance of $R_i^c$ when $\mathrm{Var}[U_i] = \mathrm{Var}[U_i^{BC}]$, and it is

> $$Z_i^{*} = \frac{p_i}{p_i + \sqrt{p_i}}$$

$Z_i^* \le \tfrac{1}{2}$, with equality only when $p_i = 1$, and it falls as origin periods get younger. It is below Benktander's $p_i$ whenever $p_i > 0.382$, and Hürlimann notes that the Benktander and Neuhaus methods usually give the individual reserve more weight. In his examples, all three credible reserves are close to one another and well ahead of either extreme on mean squared error.

> [!example]- What are the individual, collective, Benktander, Neuhaus and optimal credible loss ratio reserves for this triangle? {Example}
> Incremental paid claims and premium are in \$000s, with no development after $36$ months:
>
> | AY | $0$–$12$ | $12$–$24$ | $24$–$36$ | Premium |
> |---|---|---|---|---|
> | 1 | $800$ | $600$ | $200$ | $2{,}000$ |
> | 2 | $1{,}100$ | $750$ | | $2{,}500$ |
> | 3 | $1{,}100$ | | | $3{,}000$ |
>
> > [!answer]-
> > - The incremental loss ratios are $m_1 = 3{,}000/7{,}500 = 0.40$, $m_2 = 1{,}350/4{,}500 = 0.30$ and $m_3 = 200/2{,}000 = 0.10$.
> > - The expected loss ratio is $\sum m_k = 0.80$, so $p_2 = 0.70/0.80 = 0.875$ and $p_3 = 0.40/0.80 = 0.50$.
> > - AY 1 is fully developed, so its reserve is zero.
> > - AY 2 has $C = 1{,}850$ and $q = 0.125$, so $R^{ind} = (0.125/0.875)(1{,}850) = 264.29$ and $R^{coll} = 0.125 \times 2{,}500 \times 0.80 = 250.00$.
> > - AY 3 has $C = 1{,}100$ and $q = 0.50$, so $R^{ind} = (0.50/0.50)(1{,}100) = 1{,}100$ and $R^{coll} = 0.50 \times 3{,}000 \times 0.80 = 1{,}200$.
> > - The optimal AY 2 weight is $0.875/(0.875 + 0.9354) = 0.4833$, and $0.4833(264.29) + 0.5167(250) = 256.90$. The other weights work the same way:
> >
> > | | AY 2 $Z$ | AY 2 $R^c$ | AY 3 $Z$ | AY 3 $R^c$ |
> > |---|---|---|---|---|
> > | Benktander, $p$ | $0.875$ | $262.50$ | $0.500$ | $1{,}150.00$ |
> > | Neuhaus, $p \times 0.80$ | $0.700$ | $260.00$ | $0.400$ | $1{,}160.00$ |
> > | Optimal, $p/(p + \sqrt{p})$ | $0.483$ | $256.90$ | $0.414$ | $1{,}158.58$ |
> >
> > - The totals are $1{,}364.29$ (individual), $1{,}450.00$ (collective), $1{,}412.50$ (Benktander), $1{,}420.00$ (Neuhaus) and $1{,}415.48$ (optimal).
> > - The three credible reserves lie between the extremes, as Hürlimann found. For AY 2, the optimal weight ($0.48$) is far below Benktander's ($0.875$), so it leans more on the collective reserve for the mature year.

## Mean squared error

Hürlimann uses Mack's (2000) conditional payout model, $\mathrm{Var}[C_{i,n-i+1} \mid U_i] = p_i q_i\,\alpha_i^2(U_i)$. With credibility parameter $t_i$, the mean squared error of the credible reserve is

> $$\mathrm{mse}(R_i^c) = E[\alpha_i^2(U_i)]\left(\frac{Z_i^2}{p_i} + \frac{1}{q_i} + \frac{(1 - Z_i)^2}{t_i}\right)q_i^2$$

- $t_i = \sqrt{p_i}$ when $\mathrm{Var}[U_i] = \mathrm{Var}[U_i^{BC}]$.

The individual reserve is the case $Z_i = 1$, with $\mathrm{mse}(R_i^{ind}) = E[\alpha_i^2]\,q_i/p_i$. The collective reserve is the case $Z_i = 0$, with $\mathrm{mse}(R_i^{coll}) = E[\alpha_i^2]\,q_i(1 + q_i/t_i)$. The minimum is at $Z_i = p_i/(p_i + t_i)$.

> [!example]- Which reserve for AY 3 above has the smallest mean squared error? {Example}
> AY 3 has $p = q = 0.5$. Take $E[\alpha^2(U)] = 20{,}000$ and $t = \sqrt{p} = 0.7071$.
>
> > [!answer]-
> > - The mean squared error is $20{,}000\,(Z^2/0.5 + 2 + (1-Z)^2/0.7071)(0.25)$.
> > - For the optimal weight $Z = 0.414$, it is $20{,}000\,(0.1716/0.5 + 2 + 0.3431/0.7071)(0.25) = 20{,}000 \times 0.7071 = 14{,}142$.
> > - The other weights give:
> >
> > | Reserve | $Z$ | MSE | Root MSE |
> > |---|---|---|---|
> > | Individual | $1$ | $20{,}000$ | $141.4$ |
> > | Collective | $0$ | $17{,}071$ | $130.7$ |
> > | Benktander | $0.500$ | $14{,}268$ | $119.4$ |
> > | Neuhaus | $0.400$ | $14{,}146$ | $118.9$ |
> > | Optimal | $0.414$ | $14{,}142$ | $118.9$ |
> >
> > - Blending cuts the error by about $17\%$ against the better extreme, the collective reserve.
> > - Among the blends the differences are tiny. Benktander's MSE is only $0.9\%$ above the optimum and Neuhaus's $0.02\%$.
> > - This is why Hürlimann recommends all three simple credible methods when the optimal weights cannot be estimated more precisely.

## Relation to the standard methods

The collective reserve is Mack's (1997) loss ratio method. Its a priori is the portfolio's burning cost, so actuaries using the same premiums always agree, unlike with a judgmental Bornhuetter-Ferguson prior.

Iterating $U \to C_{i,n-i+1} + q_i U$ from the burning cost $V_i\sum_k m_k$ gives first the collective reserve, then the Benktander reserve, and converges to the individual reserve.

With chain-ladder lag factors $p_i^{CL} = 1/\text{CDF}$ in place of $p_i$, the individual reserve becomes the chain ladder reserve, $R_i^{CL} = (q_i^{CL}/p_i^{CL})\,C_{i,n-i+1}$.

Hürlimann's [[Cape Cod Method|Cape Cod]] method is the credibility mixture of that chain ladder reserve with the collective reserve $q_i^{CL}\cdot LR\cdot V_i$, where $LR = \sum_i C_{i,n-i+1} \big/ \sum_i p_i^{CL} V_i$ is the latest claims over the lag-weighted premium. Its weight is Benktander's, $Z_i = p_i^{CL}$, the period's share of ultimate in by now, so a more mature period leans more on the chain ladder. Using the optimal weight $Z_i = p_i^{CL}/(p_i^{CL} + \sqrt{p_i^{CL}})$ instead, with a Cape Cod or Bornhuetter-Ferguson collective reserve, gives Hürlimann's optimal Cape Cod and optimal Bornhuetter-Ferguson methods.

> [!trap] Neuhaus's weight taken as the payout factor
> Benktander's weight is $p_i$, but Neuhaus's is $p_i$ times the expected loss ratio. With $p_2 = 0.875$ and $\sum m_k = 0.80$, Neuhaus gives $Z_2 = 0.70$, not $0.875$.
