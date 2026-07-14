The **standard deviation** ($\sigma$) is the positive square root of the [[Variance]], measuring the spread of a [[Random Variable]] in the same units as the variable itself.

> $$\text{SD}(X) = \sigma = \sqrt{\text{Var}(X)}$$

- Because it is in the original units (not squared), $\sigma$ is more directly interpretable than the variance.
- For a linear transform, $\text{SD}(aX + b) = |a|\,\sigma$.
- Standardizing via $Z = (X - \mu)/\sigma$ expresses outcomes in standard-deviation units.

> [!example]- Standard Deviation of a Loss Distribution {Example}
> The variance of a loss distribution is 400. Find the standard deviation and interpret it.
>
> > [!answer]-
> > $$\sigma = \sqrt{400} = 20$$
> > Individual losses deviate about 20 units from the mean on average. Because $\sigma$ shares the loss's units — unlike the variance, which is in squared units — it is the more interpretable measure of spread.
