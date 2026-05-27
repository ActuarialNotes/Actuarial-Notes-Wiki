**Increased Limits Factors** (ILFs) are multiplicative adjustments applied to basic limits loss costs to price coverage at higher policy limits, reflecting the additional expected losses in the layer above the basic limit.

> $$ILF(L) = \frac{E[\min(X, L)]}{E[\min(X, B)]}$$

- $B$ is the basic limit (commonly $100K); $ILF(B) = 1.0$ by definition; $ILF(L) > 1.0$ for all $L > B$
- ILFs are derived from limited average severity calculations using fitted loss distributions (e.g., Pareto, lognormal) or empirical excess loss data
- ILFs increase at a decreasing rate as limits rise: the marginal cost of additional coverage diminishes because large losses are rare
- Used to price excess layers in umbrella and surplus lines policies: Layer cost = Basic loss cost $\times$ $[ILF(\text{top}) - ILF(\text{bottom})]$

> [!example]- Pricing a Higher Limit Using ILFs {Example}
> The basic limit is $100K. $ILF(100K) = 1.00$, $ILF(300K) = 1.25$, $ILF(500K) = 1.35$. The manual rate at $100K limits is $800. What is the rate at $500K limits?
>
> > [!answer]-
> > $$\text{Rate at } \$500K = \$800 \times ILF(500K) = \$800 \times 1.35 = \$1{,}080$$
> > The $200K–$500K excess layer alone costs $\$800 \times (1.35 - 1.25) = \$80$.
