A **forward rate** $f_{t_1, t_2}$ is the interest rate agreed upon today for an investment (or loan) beginning at a future time $t_1$ and maturing at time $t_2$. Forward rates are implied by the [[Yield Curve]] via [[Spot Rate]]s:

$$(1+s_{t_2})^{t_2} = (1+s_{t_1})^{t_1} \cdot (1+f_{t_1, t_2})^{t_2-t_1}$$

The one-period forward rate from time $t$ to $t+1$:
$$f_{t, t+1} = \frac{(1+s_{t+1})^{t+1}}{(1+s_t)^t} - 1$$

Forward rates are used to price interest rate derivatives and to construct [[Yield Curve]]s from market data.

> [!example]- Computing a Forward Rate {💡 Example}
> The 1-year spot rate is $4\%$ and the 2-year spot rate is $5\%$. Find the 1-year forward rate for year 2.
>
> > [!answer]- Answer
> > $$(1.05)^2 = (1.04)(1+f_{1,2}) \implies 1+f_{1,2} = \frac{(1.05)^2}{1.04} = \frac{1.1025}{1.04} = 1.0601$$
> > $$f_{1,2} = 6.01\%$$
