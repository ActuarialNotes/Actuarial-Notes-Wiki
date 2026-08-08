A **quantile plot** (or lift chart by predicted quantile) sorts a held-out dataset by predicted loss cost, splits it into equal-exposure buckets, and plots the actual against the predicted average in each. It is the standard first look at whether a rating model separates risk.

> $$\text{sort by } \hat{y}_i,\ \text{split into } q \text{ equal-exposure buckets, plot } \bar{y}_b \text{ and } \overline{\hat{y}}_b$$

- Two things are read off it: **monotonicity** — do the actuals rise across the buckets, i.e. does the model rank risk? — and **calibration** — does each bar's actual match its predicted level?
- A model can rank well and be badly calibrated (bars rise but sit above the predicted line throughout), or be well calibrated on average and rank nothing (flat bars at the overall mean)
- The spread between the first and last bucket is the model's **lift**: how much better than the average rate the extremes are priced
- Buckets are **equal exposure**, not equal count, so each bar carries the same credibility
- Must be built on **held-out** data; on training data the plot flatters the more flexible model. Compare two models with a [[Double Lift Chart]]

![[Media/Figures/Quantile_Plot.svg|340]]

> [!example]- Does the Model Rank Risk? {Example}
> Five equal-exposure deciles of a held-out set give actual loss ratios 0.68, 0.84, 0.97, 1.11, 1.42 against predicted 0.71, 0.86, 0.98, 1.12, 1.33. What does the plot say?
>
> > [!answer]-
> > **Ranking is good** — actuals rise monotonically across all five buckets, and the spread from 0.68 to 1.42 is genuine lift of roughly $1.42/0.68 = 2.1\times$.
> > **Calibration is good in the middle, weak in the top bucket** — the model predicts 1.33 where 1.42 emerged, under-predicting the worst risks by about 7%. That is the usual pattern when a model is capped or the tail is thin, and it points at where the rating plan needs a further variable or a higher relativity.
