**Lift** is a model performance metric used to evaluate how much better a predictive model performs relative to a random baseline when targeting a fraction of the population. It is commonly used in insurance for fraud detection, marketing, and pricing model validation.

> $$\text{Lift at decile } d = \frac{\text{Response rate in top-}d\text{ decile}}{\text{Overall response rate}}$$
>
> $$\text{Cumulative Lift} = \frac{\text{Responses captured in top fraction}}{\text{Expected responses if random}}$$

**Lift chart (gains chart) construction:**
1. Score all observations using the model
2. Rank observations from highest to lowest predicted probability
3. Divide into deciles (10% groups)
4. For each decile, compute the actual response rate
5. Plot cumulative lift vs. fraction of population targeted

- A **lift of 2** at the top decile means the model identifies twice as many positives in that decile as random selection would
- The **double lift chart** compares two models by plotting their cumulative lift curves — the model with higher lift across the top deciles is preferred
- Lift is closely related to the [[AUROC]] and [[Gini Index]] — all measure ranking/discriminatory ability
- **At 100% of the population**: cumulative lift = 1 for any model (all positives are eventually captured)

> [!example]- Calculating Lift for the Top Decile {Example}
> A fraud detection model is applied to 1,000 claims. 100 claims are actual fraud (10% base rate). In the top decile (100 highest-scored claims), 35 are fraudulent. What is the lift?
>
> > [!answer]-
> > Response rate in top decile: $35/100 = 35\%$.
> > Overall response rate: $100/1{,}000 = 10\%$.
> > $$\text{Lift} = \frac{35\%}{10\%} = 3.5$$
> > The model is **3.5 times** better than random at identifying fraud in the top-scored decile.
