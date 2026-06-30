A **Control Variable** is a predictor included in an insurance [[Generalized Linear Model]] to account for a real, known effect on the response — preventing that effect from being incorrectly absorbed into the coefficients of the rating variables — even though the control variable itself will not be used to set the final rate.

> $$\hat{\beta}_{\text{rating}}\big|_{\text{control omitted}} \;\neq\; \hat{\beta}_{\text{rating}}\big|_{\text{control included}} \quad \text{if the rating and control variables are correlated}$$

- Common control variables in ratemaking include accident year or calendar year (to absorb trend) and a territory or class variable that is priced separately outside the model
- Omitting a relevant control variable causes **omitted variable bias**: correlated rating variables' coefficients absorb some of the missing variable's true effect, distorting the indicated rate relativities
- A control variable's coefficient is **estimated from the data**, unlike an **[[Offset Variable]]**, whose coefficient is fixed at $1$
- Control variables are still checked for statistical significance and reasonableness in the [[Parameter Estimate Tables|parameter estimate table]], even though they will not appear in the final rating plan

> [!example]- Including a Control Variable to Avoid Bias {Example}
> An actuary fits a Poisson frequency GLM with vehicle age as the only rating variable. Calendar year is known to affect frequency (due to changing claim-reporting patterns) and is correlated with the vehicle-age mix of the book, but calendar year will not be used to set rates. Should calendar year be included in the model?
>
> > [!answer]-
> > Yes — calendar year should be included as a **control variable**. Because it is correlated with vehicle age and has a real effect on frequency, omitting it would let part of the calendar-year effect leak into the vehicle-age coefficient, biasing the indicated vehicle-age relativities. Including it (without using its coefficient for rating) isolates the true vehicle-age effect.
