**Development Factor** (link ratio or age-to-age factor) is the ratio used to project cumulative losses from one maturity age to the next, forming the building blocks of the [[Chain Ladder Method]]; chaining them together produces the [[Cumulative Development Factor]] to ultimate.

> $$f_{n \to n{+}1} = \frac{\text{Losses at age }n{+}1}{\text{Losses at age }n}$$
>
> $$\text{(for a single accident year)}$$

- **Simple average**: unweighted mean of all individual year factors — treats each accident year equally regardless of size
- **Volume-weighted average**: $\Sigma(\text{col }n{+}1) / \Sigma(\text{col }n)$ — gives more credibility to larger accident years; the standard default selection
- **Latest-$k$-year average**: uses only the most recent $k$ accident years — reduces the influence of older, potentially unrepresentative data
- **Medial average**: drops the highest and lowest individual factors before averaging — reduces the impact of outliers without discarding recent years

> [!example]- Factor Selection Methods {Example}
> 12-to-24-month individual factors: AY 2020: 1.450, AY 2021: 1.550, AY 2022: 1.480, AY 2023: 1.520. Column sums: age-24 $= 9{,}900$, age-12 $= 6{,}600$ (in $000s).
>
> > [!answer]-
> > Simple average: $(1.450 + 1.550 + 1.480 + 1.520)/4 = 1.500$
> >
> > Volume-weighted: $9{,}900 / 6{,}600 = 1.500$
> >
> > Latest 2-year average: $(1.480 + 1.520)/2 = 1.500$
> >
> > Medial (drop high 1.550 and low 1.450): $(1.480 + 1.520)/2 = 1.500$
> >
> > In this case all methods agree; in practice they diverge when individual year factors are non-uniform, and the actuary selects based on data stability and recency
