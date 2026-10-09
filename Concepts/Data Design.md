---
aliases:
  - Effective Data
  - Granularity
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0b868e250977f4267dec3107d50fd6de1225513a370061fb6044a60894a33744
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Data Design.md
---
**Data design** is the set of choices that decide which records an analysis uses and what each record describes: the **time frame** the data are drawn from, the **sampling** that selects records within it, and the **granularity**, the level of detail of one row. Effective data design fits these choices to the business question before any model is fitted, because a model can only describe the population, period and level of detail it was given.

| Choice | Question it answers | Trade-off |
|---|---|---|
| Time frame | Which period's experience? | A longer period gives more data; a recent one is more relevant but less mature |
| Sampling | Which records, in what proportions? | A random sample keeps the population mix; oversampling a rare event distorts its probability, which must be corrected |
| Granularity | What does one row describe? | Fine data can be aggregated later; aggregated data cannot be split again |

> $$\text{odds}_{\text{population}} = r \times \text{odds}_{\text{sample}}$$

> $$p = \frac{r\,p_s}{r\,p_s + 1 - p_s}$$

- **Symbols:** When every event is kept and non-events are kept with probability $r$, a model fitted to the sample predicts the sample probability $p_s$, and the second block converts it to the population probability $p$. In a [[Logistic Regression|logistic regression]] the correction changes only the intercept, by $\ln r$.
- **Time frame:** The period should be long enough to give credible volumes and cover whole years, so every season is equally represented, but recent enough that the business, the rating plan and the legal environment still resemble the future. The latest [[Accident Year|accident years]] are immature, so their losses need development or exclusion, and a known change (a new underwriting rule, a coverage change) may justify starting after it or flagging records before and after it. Holding out the latest period as a test set also checks stability over time.
- **Sampling:** A [[Random Sample|random sample]] keeps the population's mix. Stratified sampling draws separately within groups, such as territories or years, so small groups are represented. Undersampling the common class or oversampling the rare one makes a rare event such as fraud learnable, but every predicted probability must then be corrected with the blocks above. The sampled population also matters: data describe only the risks the company accepted, so declined applicants and the business of other insurers are absent.
- **Granularity:** The unit of a row (a policy-year, a vehicle, a claim, a payment) should match the unit of the decision, such as a premium per vehicle. Fine data can always be summed to a coarser level, with [[Earned Exposure|exposure]] carried along as a weight or an [[Offset Variable|offset]], but aggregated data cannot be split again. Aggregating also hides how predictors vary within a group, and very fine data (daily, per transaction) are noisy and large, so the design picks the coarsest level that keeps the variation the question needs ([[Tidy Data]]).

> [!example]- Correcting Predictions from an Undersampled Fraud File {Example}
> Of 200,000 claims, 1% (2,000) were found fraudulent. To train a fraud model, the analyst keeps all 2,000 fraudulent claims and a random 10% of the 198,000 legitimate ones. Find the fraud rate in the training sample, and convert a fitted probability of 0.30 for a new claim to the population scale.
>
> > [!answer]-
> > The sample holds $2{,}000 + 19{,}800 = 21{,}800$ claims, so its fraud rate is $2{,}000/21{,}800 = 9.17\%$, about nine times the population rate. With $r = 0.10$:
> > $$
> > \begin{align*}
> > p &= \frac{0.10(0.30)}{0.10(0.30) + 1 - 0.30} \\
> > &= \frac{0.03}{0.73} \\
> > &= 0.0411
> > \end{align*}
> > $$
> > The claim's fraud probability in the population is about 4.1%, not 30%. A referral threshold set on the uncorrected scale would refer far too many claims, while the ranking of claims is unchanged by the correction.

> [!example]- What Aggregation Hides {Example}
> An auto insurer's data are stored by territory. Territory A has 1,000 car-years and 60 claims; territory B has 500 car-years and 45 claims. At the policy level, drivers under 25 have a frequency of 0.15 and all other drivers 0.05 in both territories, and young drivers make up 100 car-years in A and 200 in B. What does a model fitted to the territory totals conclude, and what would the policy-level data show?
>
> > [!answer]-
> > At the territory level the frequencies are $60/1{,}000 = 0.06$ and $45/500 = 0.09$, so B looks 50% worse than A. The policy-level data explain the difference completely:
> > $$
> > \begin{align*}
> > \text{Claims}_A &= 100(0.15) + 900(0.05) \\
> > &= 15 + 45 \\
> > &= 60 \\
> > \text{Claims}_B &= 200(0.15) + 300(0.05) \\
> > &= 30 + 15 \\
> > &= 45
> > \end{align*}
> > $$
> > Within each age group the two territories have the same frequency, so the whole difference comes from B's larger share of young drivers (40% against 10%). A model built on territory totals would charge B's older drivers for B's young ones. The policy-level design keeps the driver age variation that the territory totals average away.

> [!tip]- How it appears on the exam
> - **PA** asks candidates to evaluate effective data design with respect to time frame, sampling and granularity, in written tasks built on a business problem and a described data set.
> - **Typical tasks:** A task may ask which years of data to use and why, whether a stratified or undersampled design suits a rare target and what it does to predictions, or whether policy-level or aggregated data answer the question.
> - **Answers:** Good answers name the trade-off (relevance against volume, detail against noise) and tie the choice to how the model will be used.

> [!warning]- Exam traps
> - **Uncorrected sampled probabilities:** A model trained on an oversampled event predicts the sample's event rate, not the population's. Its probabilities must be corrected before they are used as costs or compared with a threshold.
> - **More years is not always better:** Old data describe old products, rules and prices. Adding them raises the volume and can lower the accuracy.
> - **Immature periods:** Recent accident years look cheaper because their claims are still developing. Using them undeveloped understates losses for the newest business.
> - **Coarse data cannot be refined:** A design that stores only totals by group cannot later measure an effect within the group. Data should be collected at the finest level the question might need and aggregated afterwards.
> - **Who is in the data:** An extract of policies in force today leaves out those that lapsed or were cancelled during the period, so a model fitted to it describes the survivors. The design must draw the records from the population the predictions are for.
