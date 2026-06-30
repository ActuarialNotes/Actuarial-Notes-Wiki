A **Categorical Predictor** is an explanatory variable in a [[Generalized Linear Model]] whose values fall into a finite set of unordered groups (levels), such as territory or vehicle type — contrasted with an **ordinal predictor** (categories with a natural order, e.g., a credit tier) and a **continuous predictor** (a numeric variable, e.g., vehicle age).

| Predictor type | Example | How it enters the model |
| :--- | :--- | :--- |
| Categorical (nominal) | Territory, vehicle type | $k-1$ indicator variables for $k$ levels |
| Ordinal | Credit tier, limit band | As categorical, or with order-preserving (e.g., banded numeric) coding |
| Continuous | Vehicle age, driver age | A single coefficient, or banded/transformed |

- A categorical predictor with $k$ levels is represented using $k-1$ **indicator (dummy) variables**; the omitted level is the **reference level**, absorbed into the intercept (see [[Parameter Estimate Tables]])
- An **[[Interaction]]** between two predictors allows the effect of one to differ across the levels of the other, e.g., the effect of vehicle age differing by territory
- Continuous predictors assume a smooth effect on the response (linear on the link scale unless transformed); banding a continuous variable into categories trades smoothness for flexibility at the cost of extra parameters
- Choosing the right type for each variable is part of selecting the [[Model Structure]] of an [[Extended Linear Model]]

> [!example]- Coding a Categorical Predictor with a Reference Level {Example}
> Territory has three levels: A, B, C. A Poisson GLM with a log link uses Territory A as the reference level and fits $\hat{\beta}_B = 0.20$, $\hat{\beta}_C = -0.10$. Interpret the relativities for Territories B and C relative to A.
>
> > [!answer]-
> > $$\text{Relativity}_B = e^{0.20} \approx 1.22, \qquad \text{Relativity}_C = e^{-0.10} \approx 0.90$$
> > Territory B's expected claim frequency is about **22% higher** than Territory A, and Territory C's is about **10% lower**, holding all else equal.
