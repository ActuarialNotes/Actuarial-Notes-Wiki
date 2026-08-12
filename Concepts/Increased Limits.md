**Increased Limits Factors** (ILFs) are the multiplicative factors that convert a basic-limits loss cost into the loss cost for a higher policy limit, reflecting the additional expected loss in the layer above the basic limit.

> $$\text{ILF}(L) = \frac{E[X \wedge L]}{E[X \wedge B]}$$

> $$\text{Layer } (M, L] \text{ cost} = \text{Basic LC} \times \left[\text{ILF}(L) - \text{ILF}(M)\right]$$

- $B$ is the basic limit (commonly $\$100{,}000$), so $\text{ILF}(B) = 1.000$ by construction and $\text{ILF}(L) > 1$ for $L > B$. $E[X \wedge L]$ is the **limited expected value**, the expected loss capped at $L$.
- Werner's fuller formulation includes more than indemnity in each layer: **ALAE**, a **risk load** for the greater volatility of high layers, and sometimes ULAE. The risk load is what makes the ILF exceed the pure expected-loss ratio — writing a $\$5$M limit carries more parameter and process risk per dollar than writing $\$100$K.
- ILFs are estimated from a **size-of-loss distribution** — empirical where enough large claims exist, otherwise a fitted curve (Pareto, lognormal, mixed exponential). Because the number of claims in the top layers is tiny, ILFs are usually taken from industry data (ISO) rather than from one insurer's own experience.
- **Consistency test (Lee).** The *marginal* cost per dollar of additional limit must decrease as the limit rises: expected loss in each successive layer falls, because fewer claims reach it. An ILF table whose marginal cost increases lets a buyer purchase a higher limit for less than the layer is worth.
- ILFs are **leveraged by inflation**. As losses grow, more of them pierce the basic limit and the excess layers grow faster than the ground-up trend — so ILF tables must be reviewed, not left in place, through inflationary periods.
- The **assumptions** behind an ILF table matter: frequency is independent of severity, the severity distribution is the same at all limits, and there is no adverse selection by limit. All three fail somewhat in practice — insureds who buy $\$5$M limits are not a random sample.

![[Media/Figures/Increased_Limits.svg|340]]

> [!example]- Pricing a Higher Limit {Example}
> The basic limit is $\$100{,}000$, with $\text{ILF}(100\text{K}) = 1.00$, $\text{ILF}(300\text{K}) = 1.25$, $\text{ILF}(500\text{K}) = 1.35$, $\text{ILF}(1\text{M}) = 1.45$. The basic-limits loss cost is $\$800$.
>
> Price the $\$500$K policy, and the $\$300$K excess of $\$200$K layer.
>
> > [!answer]-
> > $$\text{Loss cost at } \$500\text{K} = \$800 \times 1.35 = \$1{,}080$$
> >
> > For the layer between $\$200$K and $\$500$K, the ILF at $\$200$K is not given; using the $\$300$K–$\$500$K layer instead:
> >
> > $$\begin{align*}
> > \text{Layer cost} &= \$800 \times (1.35 - 1.25) \\
> > &= \$80
> > \end{align*}$$
> >
> > Note how little the top of the tower costs: the first $\$100$K costs $\$800$, the next $\$200$K costs $\$200$, and the $\$200$K above that costs $\$80$. Each successive layer is cheaper per dollar of limit — which is exactly the consistency property.
> >
> > Note also that the ILF applies to the **loss cost**, not the full rate. Fixed expenses do not double when the limit doubles, so the final premium rises by less than the ILF.

> [!example]- Testing an ILF Table for Consistency {Example}
> A filing proposes:
>
> | Limit | ILF |
> |---|---|
> | $\$100$K | $1.00$ |
> | $\$250$K | $1.30$ |
> | $\$500$K | $1.45$ |
> | $\$1$M | $1.75$ |
>
> Is the table consistent?
>
> > [!answer]-
> > Marginal cost per $\$1{,}000$ of additional limit:
> >
> > $$\begin{align*}
> > \$100\text{K} \to \$250\text{K}: \; \frac{0.30}{150} &= 0.00200 \\[6pt]
> > \$250\text{K} \to \$500\text{K}: \; \frac{0.15}{250} &= 0.00060 \\[6pt]
> > \$500\text{K} \to \$1\text{M}: \; \frac{0.30}{500} &= 0.00060
> > \end{align*}$$
> >
> > The marginal cost falls from $0.00200$ to $0.00060$, then stays **flat**. Flat is a failure of the strict test: it implies the expected loss in the $\$500$K–$\$1$M layer is the same per dollar as in the $\$250$K–$\$500$K layer, which requires a severity distribution with no decay at all over that range.
> >
> > Either the $\$1$M factor is too high or the $\$500$K factor is too low. In practice a flat or rising marginal cost at the top of a table is usually the fingerprint of a **risk load** that grows with the layer — legitimate in principle, but it should be shown explicitly rather than buried in the indemnity ILF, since a buyer comparing tables will otherwise arbitrage against it.
