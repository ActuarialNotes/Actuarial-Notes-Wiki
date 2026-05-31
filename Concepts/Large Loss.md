**Large Losses** (also called shock losses) are individual claims that exceed a specified threshold and, if left uncapped, can distort average loss statistics and produce misleading ratemaking indications; they are treated separately to prevent a single catastrophic claim from causing an unjustified rate change.

> $$\text{Limited Average Severity}(M)$$
>
> $$= E[\min(X, M)] = \int_0^{M} S(x)\,dx$$

- The standard treatment is to cap each individual loss at a large-loss limitation amount $M$ for the basic ratemaking analysis, then add a separate large-loss loading for the excess layer above $M$
- The large-loss loading is typically derived from Increased Limits Factors (ILFs): $\text{Loading} = \text{Uncapped Pure Premium} \times (ILF(U) / ILF(M) - 1)$, where $U$ is the policy limit and $M$ is the cap
- Alternatively, large losses may be excluded entirely and replaced with an expected loss load based on historical frequency of large losses and their average excess severity
- The choice of threshold $M$ balances two concerns: too low a cap removes too much data from the base analysis, while too high a cap fails to protect against distortion

> [!example]- Capping a Large Loss {Example}
> A general liability class has a $500K per-occurrence large-loss cap. In accident year 2023, one claim settled for $1,200,000. How is it treated in ratemaking?
>
> > [!answer]-
> > The claim is capped at $500,000 in the basic loss analysis. The excess $700,000 is excluded from the per-occurrence data. A separate large-loss loading based on ILFs or historical excess experience is added back to ensure the rate covers expected costs above the $500K threshold. This prevents the single $1.2M claim from inflating the indicated pure premium for the entire class.
