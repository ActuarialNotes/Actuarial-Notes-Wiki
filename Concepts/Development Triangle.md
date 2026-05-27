**A development triangle** (loss development triangle) organizes cumulative losses by accident year (rows) and age/maturity in months (columns), enabling actuaries to measure how losses grow from early emergence to ultimate settlement.

> $$LDF_{k \to k+1} = \frac{\sum_{\text{AY}} C_{AY,\, k+1}}{\sum_{\text{AY}} C_{AY,\, k}}$$

- Each cell $C_{AY,\,k}$ contains cumulative losses for accident year $AY$ evaluated at age $k$ months (e.g., 12, 24, 36, …)
- Age-to-age factors (link ratios) derived from the triangle drive the [[Chain Ladder Method|chain ladder]] and all development-based methods
- Triangles can be built on [[Paid Losses|paid losses]], [[Incurred Losses|incurred losses]], claim counts, or ALAE; each reveals different development characteristics
- The latest diagonal represents the most recent valuation; cells below the diagonal are the future development to be estimated

> [!example]- Reading a Development Triangle {Example}
> A triangle shows accident year 2021 with $\$500$ at 12 months and $\$650$ at 24 months. Accident year 2022 shows $\$480$ at 12 months. Compute the 12-to-24 age-to-age factor.
>
> > [!answer]-
> > Using the volume-weighted link ratio (single year for simplicity):
> > $$LDF_{12\to24} = \frac{650}{500} = 1.300$$
> > This factor is then applied to AY 2022: $\$480 \times 1.300 = \$624$ projected at 24 months.
