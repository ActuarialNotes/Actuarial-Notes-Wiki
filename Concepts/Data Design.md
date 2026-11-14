---
aliases:
  - Effective Data
  - Granularity
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0994c26dc07a6d89a8d25cd17a920caa7f5b34a9a1e9d893b1b2dc1df6ddfb2d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Data Design.md
---
**Data Design** is the set of choices that decide which records an analysis uses and what each record describes: the time frame the data are drawn from, the sampling that selects records within it, and the granularity, the level of detail of one row. Effective data design fits these choices to the business question before any model is fitted, because a model can only describe the population, period and level of detail it was given.

| Choice | Question it answers | Trade-off |
|---|---|---|
| Time frame | Which period's experience? | A longer period gives more data. A recent one is more relevant but less mature. |
| Sampling | Which records, in what proportions? | A random sample keeps the population mix. Oversampling a rare event distorts its probability, which must be corrected. |
| Granularity | What does one row describe? | Fine data can be aggregated later. Aggregated data cannot be split again. |

## Time frame

The period should be long enough to give credible volumes and cover whole years, so every season is equally represented. It should be recent enough that the business, the rating plan and the legal environment still resemble the future. Old data describe old products, rules and prices, so adding them raises the volume and can lower the accuracy.

The latest [[Accident Year|accident years]] are immature, so their losses need development or exclusion. Used undeveloped, they understate losses for the newest business. A known change (a new underwriting rule, a coverage change) may justify starting after it or flagging records before and after it. Holding out the latest period as a test set also checks stability over time.

## Sampling

A [[Random Sample|random sample]] keeps the population's mix. Stratified sampling draws separately within groups, such as territories or years, so small groups are represented. Undersampling the common class or oversampling the rare one makes a rare event such as fraud learnable, but every predicted probability must then be corrected.

When every event is kept and non-events are kept with probability $r$, the odds of the event in the population are

> $$\text{odds}_{\text{population}} = r \times \text{odds}_{\text{sample}}$$

- $\text{odds}_{\text{sample}}$ is the odds predicted by a model fitted to the sample.

In terms of the sample probability $p_s$ the model predicts, the population probability is

> $$p = \frac{r\,p_s}{r\,p_s + 1 - p_s}$$

In a [[Logistic Regression|logistic regression]] the correction changes only the intercept, by $\ln r$.

> [!example]- What is this claim's fraud probability on the population scale? {Example}
> Of 200,000 claims, 1% (2,000) were found fraudulent. To train a fraud model, the analyst keeps all 2,000 fraudulent claims and a random 10% of the 198,000 legitimate ones. The model gives a new claim a fitted probability of 0.30.
>
> > [!answer]-
> > - The sample holds $2{,}000 + 19{,}800 = 21{,}800$ claims, so its fraud rate is $2{,}000/21{,}800 = 9.17\%$, about nine times the population rate.
> > - With $r = 0.10$ and $p_s = 0.30$, $p = 0.03/(0.03 + 0.70) = 0.0411$.
> > - The claim's fraud probability in the population is about 4.1%, not 30%.
> > - A referral threshold set on the uncorrected scale would refer far too many claims, while the ranking of claims is unchanged by the correction.

The sampled population also matters. Data describe only the risks the company accepted, so declined applicants and the business of other insurers are absent. An extract of policies in force today leaves out those that lapsed or were cancelled during the period, so a model fitted to it describes the survivors. The design draws the records from the population the predictions are for.

## Granularity

The unit of a row (a policy-year, a vehicle, a claim, a payment) should match the unit of the decision, such as a premium per vehicle. Fine data can always be summed to a coarser level, with [[Earned Exposure|exposure]] carried along as a weight or an [[Offset Variable|offset]], but aggregated data cannot be split again. Aggregating also hides how predictors vary within a group. Very fine data (daily, per transaction) are noisy and large, so the design picks the coarsest level that keeps the variation the question needs.

> [!example]- What does a model fitted to these territory totals conclude, and what would the policy-level data show? {Example}
> An auto insurer's data are stored by territory. At the policy level, drivers under 25 have a frequency of 0.15 and all other drivers 0.05 in both territories.
>
> | Territory | Car-years | Claims | Young drivers' car-years |
> | :--- | ---: | ---: | ---: |
> | A | 1,000 | 60 | 100 |
> | B | 500 | 45 | 200 |
>
> > [!answer]-
> > - At the territory level the frequencies are $60/1{,}000 = 0.06$ and $45/500 = 0.09$, so B looks 50% worse than A.
> > - At the policy level, A's claims are $100(0.15) + 900(0.05) = 15 + 45 = 60$.
> > - B's claims are $200(0.15) + 300(0.05) = 30 + 15 = 45$.
> > - Within each age group the two territories have the same frequency, so the whole difference comes from B's larger share of young drivers (40% against 10%).
> > - A model built on territory totals would charge B's older drivers for B's young ones. The policy-level design keeps the driver age variation that the totals average away.

> [!trap] Using sampled probabilities uncorrected
> A model trained on an oversampled event predicts the sample's event rate, not the population's. In the fraud example a fitted 0.30 is 0.041 in the population. Correct the probabilities before using them as costs or comparing them with a threshold.
