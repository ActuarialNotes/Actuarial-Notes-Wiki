# Answerability: Exam 7 (CAS)

Run `answerability-20261031-7` · 83 questions checked of 83 attempted · cost $9.56

Each question's official solution was broken into the knowledge it uses (by a model that saw no study page), and each item was looked for on the pages the vault gives for the question. An item counts as taught only if a quote of the teaching passage is really on the page; the check is done in code. *Answerable* is necessary, not sufficient: a page can hold the formula and still not teach it well.

| Verdict | Questions | Share |
|---|---|---|
| **Answerable** — everything taught on a tagged page, one link away, on the exam's syllabus or on a prerequisite exam's page | 47 | 57% |
| **Untagged** — everything is in the vault, but some of it on a page neither tagged nor linked | 12 | 14% |
| **Gap** — something the solution uses is taught on no page | 24 | 29% |

Requirements: 506 — tagged 410 (81%), linked 46 (9%), syllabus 0 (0%), prerequisite 0 (0%), elsewhere 17 (3%), missing 33 (7%)
Not checked: 19 off syllabus.

## By sitting

A paper whose gaps far outrun the rest may test a reading the syllabus has since dropped.

| Sitting | Questions | Answerable | Untagged | Gap |
|---|---|---|---|---|
| Spring 2015 | 7 | 4 | 1 | 2 (29%) |
| Spring 2016 | 18 | 10 | 2 | 6 (33%) |
| Spring 2017 | 18 | 9 | 3 | 6 (33%) |
| Spring 2018 | 17 | 7 | 5 | 5 (29%) |
| Spring 2019 | 15 | 10 | 1 | 4 (27%) |
| Undated (samples and the vault's own) | 8 | 7 | 0 | 1 (12%) |

## Gaps, by the page that should teach them

Ranked by how many questions each page's gaps cost. The page is the one named for the item's concept; "no page" means the vault has no page by that name.

### `Concepts/ODP Bootstrap Model.md` — 3 question(s)

- `cas7-2017-q10` (fact): A calendar year trend such as inflation not captured by the model appears in a residual-versus-calendar-year plot as residuals trending upward, negative in early calendar years and positive in later ones, meaning the model over-predicts early years and under-predicts recent years.
- `cas7-2017-q12` (procedure): When the first development period is a partial year (e.g., the latest accident year has only a half year of exposure), annualize the partial-period losses (or estimate the full-year equivalent), compute development factors, then de-annualize the results for that accident year.
- `cas7-2017-q12` (procedure): When the latest diagonal is only a partial calendar year, the latest diagonal's incremental amounts cover a shorter period; adjust by annualizing that diagonal for fitting and residuals, and after simulation re-adjust the simulated latest-diagonal claims back to a partial-year basis.
- `cas7-2018-q13` (procedure): For a log-link GLM, the response triangle is built by taking the natural log of each incremental paid cell, which is then used to solve for the GLM parameters.

### `Concepts/Reinsurance Reserving.md` — 3 question(s)

- `cas7-2017-q14` (fact): Reinsurers experience persistent upward loss development because cedants tend to reserve at modal values and understate ALAE, and claims reaching the reinsurance layer tend to be larger than the modal claim.
- `cas7-2018-q14` (fact): Reserving a potentially serious claim to the mode (which is low because most claims are small) consistently under-reserves loss and ALAE, and reinsurance claims tend to show persistent upward development, so modal case reserves are inadequate as initial reserves.
- `cas7-2018-q14` (fact): Diverse coding and handling requirements for heterogeneous reinsurance business strain data coding and IT systems, causing backlogs and processing errors that hamper reserving.
- `cas7-2019-q14` (fact): Reinsurance reserves show persistent upward development of reported losses, caused by primary insurers under-reserving ALAE, setting case reserves at modal values, and social and economic inflation.
- `cas7-2019-q14` (fact): Reinsurer IT and data-coding systems struggle to keep up with constantly changing information requirements across varied contract types, so reserve data may be outdated or erroneous.
- `cas7-2019-q14` (fact): Greater uncertainty in reinsurance reserves gives reinsurers a higher reserve-to-surplus ratio than primary insurers, so management may be reluctant to accept the higher indicated reserves and must be convinced.

### **no page for Incremental Loss Triangle** — 2 question(s)

- `cas7-2016-q12` (procedure): Convert a cumulative loss triangle to an incremental triangle by differencing successive cumulative values within each accident year, then check the sign of each development column's sum of incrementals to choose the modification.
- `cas7-2018-q13` (procedure): Convert a cumulative paid triangle to incremental paid by differencing successive maturities in each accident year.

### `Concepts/Retrospective Rating.md` — 2 question(s)

- `cas7-2016-q18` (procedure): Expected future loss emergence for a policy period is ultimate loss minus losses reported as of the prior retro adjustment.
- `cas7-an-001` (fact): Loss emerging after the last allowable retro adjustment generates no additional premium, so it is included in the CPDLD denominator with a PDLD ratio of zero.

### **no page for Causes of Insurer Insolvency** — 1 question(s)

- `cas7-2018-q1` (fact): Primary causes of P&C insurer impairment and insolvency include deficient loss reserves, inadequate pricing, rapid growth, catastrophe events, reinsurance failure, external fraud, overstated assets, reckless management and insolvency of a subsidiary or affiliate.

### **no page for Incremental vs Cumulative Paid Losses** — 1 question(s)

- `cas7-2018-q5` (fact): Cumulative paid loss at the next evaluation equals the prior cumulative paid plus incremental paid in the period, and the BF and Benktander methods are then applied at that later age using the later-age percent unreported.

### **no page for Mack Method Empirical Limits** — 1 question(s)

- `cas7-2017-q6` (procedure): An empirical-limits confidence interval for ultimate loss applies the minimum and maximum observed individual age-to-age factors for each remaining development period (multiplying them across periods) to the latest cumulative loss to give the lower and upper bounds.

### **no page for Price-to-Book Value Transaction Multiples** — 1 question(s)

- `cas7-2018-q1` (procedure): To value an acquisition target with transaction multiples, select comparable transactions with similar ROE, growth rate and discount rate, then multiply the target's book value (assets less liabilities, excluding intangible assets) by their price-to-book multiples to get a range of values.

### **no page for Risk Load in Loss Reserves** — 1 question(s)

- `cas7-2017-q15` (definition): A risk load is an explicit margin added to the reserve estimate to provide protection against adverse deviation from uncertainty in the reserve.
- `cas7-2017-q15` (fact): Reinsurers carry a larger risk load than primary insurers (who often hold none) because of greater uncertainty from report lag, limited information, heterogeneous claims, volatile excess layers, and catastrophe exposure.

### **no page for Sahasrabuddhe Claim Size Model for Loss Development** — 1 question(s)

- `cas7-2016-q8` (fact): The choice of basic limit does not affect the difference between modeled and unadjusted factors, because the adjustment is a ratio of LEVs applied to data already at the basic limit, so the basic limit cancels out.

### **no page for Valuation Classes** — 1 question(s)

- `cas7-2016-q10` (fact): Valuation classes should be homogeneous yet large enough to be credible; many small classes make data more volatile and raise internal systemic risk, and grouping non-homogeneous claims together also raises it.

### `Concepts/Bayesian Bornhuetter-Ferguson Model.md` — 1 question(s)

- `cas7-2017-q11` (procedure): To project multiple future periods, use the expected incremental loss from the prior period added to cumulative losses as D_{i,j−1} for the next period's chain ladder component, while the Z and the BF percent emerging are taken at each age.

### `Concepts/Bornhuetter-Ferguson Method.md` — 1 question(s)

- `cas7-2019-q10` (procedure): Sample the expected loss (a priori ultimate) for a stochastic BF by using a random number against the given cumulative distribution function of expected losses, with linear interpolation between the CDF points.

### `Concepts/Chain Ladder Method.md` — 1 question(s)

- `cas7-2019-q13` (formula): In the credibility-weighted combination of the Stanard-Bühlmann and chain ladder methods, the weight on the chain ladder is Z equal to the selected credibility factor times the report lag, and the remaining 1 − Z goes to Stanard-Bühlmann; the IBNR is the weighted average of the two IBNR estimates.

### `Concepts/Credibility.md` — 1 question(s)

- `cas7-2016-q16` (procedure): In Patrik's credibility weighting, the weight on the chain ladder IBNR is Z = (percent reported) × (selected credibility factor), and the final IBNR is Z × chain ladder IBNR + (1 − Z) × Stanard-Bühlmann IBNR for that year.

### `Concepts/Development Factor.md` — 1 question(s)

- `cas7-2018-q9` (procedure): A state-space model tests stability by comparing the volatility of observations around the mean with the volatility of the mean itself over time.

### `Concepts/Implied Development Method.md` — 1 question(s)

- `cas7-2015-q6` (procedure): The ratio of reported losses at the lower limit to those at the higher limit at a given maturity is the ultimate ratio times e^(b·t), where t is the time remaining to ultimate maturity (e.g., 3 years at 12 months when ultimate is 48 months).

### `Concepts/Mack Chain Ladder Model.md` — 1 question(s)

- `cas7-2016-q7` (formula): Mack's weighted residual for an accident year is (actual cumulative loss at the next age minus the age-to-age factor times cumulative loss at the current age) divided by the square root of the cumulative loss at the current age.

### `Concepts/Operational Risk.md` — 1 question(s)

- `cas7-2019-q1` (definition): Operational risk is the risk of loss from inadequate or failed internal processes, people, systems or external events (such as vendor reliance), and a key risk indicator (KRI) is a metric monitored to give early warning of a specific risk.

### `Concepts/Parameter Risk.md` — 1 question(s)

- `cas7-2018-q1` (fact): A change in claims settlement rate alters the pattern of payments, raising parameter risk because historical development no longer reflects the future, and affecting process risk by changing the volatility and timing of ultimate payments.

### `Concepts/Reinsurance.md` — 1 question(s)

- `cas7-2017-q15` (fact): Reinsurers typically need larger additional case reserves than primary insurers because cedants often set case reserves at modal (most likely) values and may under-reserve ALAE, and the reinsurer faces report lag and limited claim detail.

### `Concepts/Reserving Data Organization.md` — 1 question(s)

- `cas7-2015-q7` (fact): Differences in policy limits (and sometimes deductibles) lead to different claim development, with higher-limit policies developing more slowly, so they may warrant separate classes.

## Tagging and linking gaps

The vault teaches what these questions need, but on a page the question isn't tagged with and its tagged pages don't link to. Adding the page to the question's `wiki_link` (or linking it from the tagged page) puts it in reach.

| Question | Pages that teach what it needs |
|---|---|
| `cas7-2015-q5` | Correlation |
| `cas7-2015-q7` | Data Segmentation |
| `cas7-2016-q4` | Generalized Cape Cod Method |
| `cas7-2016-q6` | Correlation |
| `cas7-2017-q17` | Cumulative Development Factor |
| `cas7-2017-q18` | Linear Regression, Premium Accounting |
| `cas7-2017-q4` | Stochastic Cape Cod Model |
| `cas7-2018-q1` | Cost of Capital |
| `cas7-2018-q12` | Model Validation |
| `cas7-2018-q13` | Paid Losses |
| `cas7-2018-q15` | Catastrophe Loss |
| `cas7-2018-q2` | Severity |
| `cas7-2018-q3` | Mean Square Error |
| `cas7-2018-q6` | Generalized Cape Cod Method |
| `cas7-2019-q15` | Loss Development |

## Taught only in a collapsed section

The passage that teaches these items sits inside a folded callout (a worked example, a table behind a toggle). A reader who skims never opens it.

| Page | Questions | Items |
|---|---|---|
| Layer Development Factor | 2 | A larger exponential mean θ (larger claim sizes) means more losses are capped a…; The LEV ratios used in the final adjustment must come from the same accident ye… |
| Retrospective Premium Reserve | 2 | The incremental percent of loss emerging between adjustments is the difference …; Policy years that have not yet reached their first retro adjustment (no prior a… |
| Chain Ladder Assumptions | 1 | In simple linear regression the standard error of the slope is s_b = sqrt(sum e… |
| Chain Ladder Method | 1 | To obtain the cumulative development factor from a later age to ultimate, divid… |
| Generalized Cape Cod Method | 1 | To test whether a single constant ELR suits all accident years, convert each ye… |
| Implied Development Method | 1 | Modeled excess IBNR equals reported excess loss times the excess age-to-ultimat… |
| Independent Risk | 1 | To internally benchmark the independent-risk CoV for a portfolio, compare it wi… |
| Internal Systemic Risk | 1 | Map each class's overall balanced scorecard score to a coefficient of variation… |
| Least Squares Development Method | 1 | When the prior expected ultimate loss changes by some percentage, the new prior… |
| Mean Square Error | 1 | The method with the lower mean squared error is the preferable estimator; if th… |
| Parameter Risk | 1 | In the Cape Cod method (Clark), expected prospective losses equal the ELR times… |
| Range of Indications | 1 | A model counts as used in the modeled range if it receives at least some weight… |
| Reasonableness Testing | 1 | Actual emergence is the change in aggregate reported loss between evaluation da… |

## Every question

<details><summary><code>cas7-2015-q3</code> · answerable</summary>

Tagged pages: Chain Ladder Method, Residual Plot, Mack Chain Ladder Model, Chain Ladder Assumptions

| Item | Kind | Status | Where |
|---|---|---|---|
| Mack's weighted residual for development from age k to k+1 is (C_{i,k+1} − f_k·C_{i,k}) / sqrt(C_{i,k}), where C is cumulative claims and f… | formula | tagged | Mack Chain Ladder Model: “$$E(C_{i,k+1} \mid C_{i1}, \dots, C_{ik}) = C_{ik}\,f_k$$ … $$\text{Var}(C_{i,k+1} \mid C_{i1}, \do…” |
| The volume-weighted (weighted-average) age-to-age factor f_k equals the sum of cumulative claims at age k+1 divided by the sum of cumulativ… | formula | tagged | Mack Chain Ladder Model: “$\hat f_k = \sum_j C_{j,k+1} / \sum_j C_{jk}$” |
| To test Mack's assumptions, plot weighted residuals against cumulative claims at the earlier age (or other variable); residuals should be r… | procedure | tagged | Residual Plot: “**Residuals vs. predictor**: checks whether a variable's effect is correctly specified” |
| Mack's three chain ladder assumptions are: expected next-period cumulative claims proportional to current cumulative claims (factor by age)… | fact | tagged | Mack Chain Ladder Model: “The chain ladder uses one factor per age for every accident year and projects from the latest amoun…” |
| The weighted-residual plot tests the variance assumption (variance proportional to prior cumulative claims); a systematic trend in the resi… | fact | tagged | Residual Plot: “\\| Fan shape (spread increases) \\| **Heteroscedasticity** — variance is not constant \\|” |

</details>

<details><summary><code>cas7-2015-q4</code> · answerable</summary>

Tagged pages: Chain Ladder Method, Calendar Year, Calendar Year Effect

| Item | Kind | Status | Where |
|---|---|---|---|
| Calendar year effects are factors (e.g., changes in claims handling, inflation, legal or legislative changes) that affect all accident year… | definition | tagged | Calendar Year Effect: “**Calendar Year Effect** (diagonal effect) is an influence that acts on every accident year in the …” |
| To set up the calendar year test, find the median age-to-age factor for each development column and label each factor L if above the median… | procedure | tagged | Calendar Year Effect: “In each column, factors above the [[Median\\|median]] are L and below it are S; with an odd count th…” |
| For each diagonal j, with Sj small and Lj large factors, n_j = Sj + Lj, and the test statistic Zj = min(Sj, Lj); the overall statistic Z is… | definition | tagged | Calendar Year Effect: “$$Z_j = \min(L_j,\ S_j)$$ … $$Z = \sum_j Z_j$$” |
| Under the null hypothesis of no calendar year effects, for a diagonal with n elements and m = floor((n-1)/2), E[Zn] = n/2 − C(n−1, m)·n/2^n… | formula | tagged | Calendar Year Effect: “$$E(Z_j) = \frac{n}{2} - \binom{n-1}{m}\frac{n}{2^n}$$ … $$\text{Var}(Z_j) = \frac{n(n-1)}{4} - \bi…” |
| Under the null hypothesis, the diagonal statistics are treated as independent so that E[Z] and Var[Z] are the sums of the diagonal expectat… | fact | tagged | Calendar Year Effect: “$Z$ is treated as Normal, and "no calendar year effect" is rejected at 5% if $Z$ falls outside $E(Z…” |
| Test the null hypothesis by forming the confidence interval E[Z] ± z·sqrt(Var[Z]) (z = 1.96 for 95%); reject the null of no calendar year e… | procedure | tagged | Calendar Year Effect: “$Z$ is treated as Normal, and "no calendar year effect" is rejected at 5% if $Z$ falls outside $E(Z…” |

</details>

<details><summary><code>cas7-2015-q5</code> · untagged</summary>

Tagged pages: Development Factor, Correlation Coefficient, Development Factor Correlation Test

| Item | Kind | Status | Where |
|---|---|---|---|
| To test independence of adjacent development periods, pair the age-to-age factors of two adjacent columns by accident year, using only the … | procedure | tagged | Development Factor Correlation Test: “[[Testing the Assumptions of Age-to-Age Factors (Venter - 1998)\\|Venter (1998)]] computes the sampl…” |
| The sample correlation coefficient is r = Σ(X−X̄)(Y−Ȳ) / sqrt(Σ(X−X̄)² · Σ(Y−Ȳ)²), equivalently (E[XY]−E[X]E[Y]) divided by the product of … | formula | elsewhere | Correlation: “$$r = \frac{\sum_{i=1}^n (x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum_{i=1}^n (x_i - \bar{x})^2}\,\sq…” |
| Spearman's rank correlation is r = 1 − S / [n(n²−1)/6], where S is the sum of squared differences between the ranks of paired observations. | formula | tagged | Development Factor Correlation Test: “$$T_k = 1 - \frac{6\sum_{i=1}^{I-k}(r_{ik} - s_{ik})^2}{(I-k)^3 - (I-k)}$$” |
| The test statistic T = r·sqrt((n−2)/(1−r²)) is t-distributed with n−2 degrees of freedom under the null hypothesis of independence, where n… | formula | tagged | Development Factor Correlation Test: “$$T = r\sqrt{\frac{n-2}{1-r^2}} \sim t_{n-2}$$” |
| Reject independence if \|T\| exceeds the critical t-value at n−2 degrees of freedom for the chosen significance level (two-tailed per the 2… | procedure | tagged | Development Factor Correlation Test: “Correlations can be positive or negative, so the test is two-tailed: $r$ is significant at the 10% …” |

</details>

<details><summary><code>cas7-2015-q6</code> · gap</summary>

Tagged pages: Deductible, Increased Limits, Development Factor, Implied Development Method, Layer Development Factor, Excess Loss Development Factor, Layer of Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| Under Siewert's loss ratio approach, expected ultimate losses limited to a given per-occurrence limit equal earned premium × expected loss … | formula | tagged | Implied Development Method: “The **loss ratio approach** sets excess losses at $P \cdot E \cdot \chi$ from pricing.” |
| Per-occurrence charges apply to ground-up losses (the charge is the proportion of losses excess of the limit), so (1 − charge) gives the li… | fact | tagged | Excess Loss Development Factor: “Measured on the severity distribution at that maturity, $R^L_t = E[X \wedge L]/E[X]$ is the [[Loss …” |
| Losses in a layer between a retention and a limit are estimated as the difference between losses limited to the higher limit and losses lim… | procedure | tagged | Layer Development Factor: “$$LEV(X; \Phi) = LEV(p; \Phi) - LEV(d; \Phi)$$” |
| Under Siewert's implied development approach, develop reported losses at each limit separately using age-to-age factors from that limit's o… | procedure | tagged | Implied Development Method: “develop full coverage (unlimited) losses to ultimate, develop deductible (limited) losses to ultima…” |
| The ratio of ultimate losses limited to a lower limit versus a higher limit equals the ratio of the corresponding increased limit factors. | formula | tagged | Increased Limits: “$$\text{ILF}(L) = \frac{E[X \wedge L]}{E[X \wedge B]}$$” |
| The ratio of reported losses at the lower limit to those at the higher limit at a given maturity is the ultimate ratio times e^(b·t), where… | procedure | missing |  |
| The excess-layer LDF equals the higher-limit LDF × (1 − ultimate ratio of lower-limit to higher-limit losses) / (1 − ratio at the current m… | formula | tagged | Excess Loss Development Factor: “$$\text{XSLDF}^L_t = \text{LDF}_t \times \frac{1 - R^L}{1 - R^L_t}$$” |
| Ultimate layer losses are estimated by applying the layer LDF to the reported losses currently in the layer, which equal reported losses at… | procedure | linked | Chain Ladder Method: “$$U_{\text{AY}} = C_{\text{AY},\,n} \times \text{CDF}_{n \to \text{ult}}$$” |

</details>

<details><summary><code>cas7-2015-q7</code> · gap</summary>

Tagged pages: Reserving Data Organization, Homogeneity

| Item | Kind | Status | Where |
|---|---|---|---|
| Segmenting a claims portfolio for reserving requires balancing homogeneity (classes with similar claim development patterns and risk charac… | fact | tagged | Reserving Data Organization: “Split into groups that balance [[Homogeneity]] against [[Credibility]] — by [[Line of Business\\|lin…” |
| Catastrophe claims develop differently from non-catastrophe claims, so catastrophe losses (e.g., in homeowners) should be separated from no… | fact | linked | Catastrophe Loss: “In **reserving**, catastrophe claims are triangulated separately: they report fast and settle in a …” |
| Different coverages within a line (e.g., auto liability versus physical damage) have different reporting and payment patterns and tail leng… | fact | tagged | Homogeneity: “Two coverages may have similar loss ratios and completely different reporting and settlement speeds…” |
| Differences in policy limits (and sometimes deductibles) lead to different claim development, with higher-limit policies developing more sl… | fact | missing |  |
| Geographic differences in legislation, regulation, court environment, or claims handling practices and staffing change claim settlement spe… | fact | elsewhere | Data Segmentation: “group claims that share coverage (the same laws, policy terms and claims handling)” |
| Information about business mix, coverages, limits, catastrophe exposure, regulatory changes, and claims operations that cannot be seen in t… | procedure | tagged | Reserving Data Organization: “The right response is to diagnose first: check average case outstanding by maturity and the [[Settl…” |

</details>

<details><summary><code>cas7-2015-q8</code> · answerable</summary>

Tagged pages: Coefficient of Variation, Correlation, Internal Systemic Risk, External Systemic Risk, Independent Risk, Risk Margin

| Item | Kind | Status | Where |
|---|---|---|---|
| Internal systemic risk is risk arising from within the insurer's own actuarial process and is not diversifiable across lines; its main sour… | definition | tagged | Internal Systemic Risk: “**Internal systemic risk** is the uncertainty that arises because the actuarial valuation models ar…” |
| Specification error is the risk that the insurance process is too complex for any model to fully explain it, so the chosen model is an impe… | definition | tagged | Internal Systemic Risk: “**Specification error** is the inability to build a model fully representative of the insurance pro…” |
| Parameter selection error is the risk that the model cannot accurately measure the predictors of claim cost or the trends in those predicto… | definition | tagged | Internal Systemic Risk: “**Parameter selection error** arises because the model cannot adequately measure all the predictors…” |
| Data error is the risk from errors in the data, unreliable data, or lack of understanding of the data; it is higher for lines with few indu… | definition | tagged | Internal Systemic Risk: “**Data error** comes from poor or unavailable data, or inadequate knowledge of the portfolio, inclu…” |
| Low-frequency, high-severity, heterogeneous, long-tailed lines such as umbrella are more volatile and harder to model than auto lines, supp… | fact | tagged | Internal Systemic Risk: “Their example scale is not linear, and is higher for long-tail classes.” |
| External systemic risk is risk from outside the insurer's control that can affect multiple lines at once; sources include economic, legal/p… | definition | tagged | External Systemic Risk: “**External systemic risk** is the uncertainty from non-random risks outside the actuarial modelling…” |
| Correlation of an external systemic risk between two lines is high when both lines share the same exposure to the driver (same coverages, i… | fact | tagged | External Systemic Risk: “Within a category, portfolios can be correlated with each other and with the matching outstanding c…” |
| Under independence, the portfolio independent-risk CoV is the square root of the sum of squares of each line's CoV weighted by its share of… | formula | tagged | Independent Risk: “$$\mathrm{CoV}_{\text{ind}} = \frac{\sqrt{\sum_i (w_i\,\mathrm{CoV}_i)^2}}{\sum_i w_i}$$” |
| Independent risk (process and parameter risk) is diversifiable across lines, so only the independent risk CoV is aggregated assuming indepe… | fact | tagged | Independent Risk: “There are no cross terms, because independent risk is uncorrelated with every other source of uncer…” |

</details>

<details><summary><code>cas7-2015-q9</code> · answerable</summary>

Tagged pages: Coefficient of Variation, Risk Margin

| Item | Kind | Status | Where |
|---|---|---|---|
| A larger portfolio size lowers the coefficient of variation (variability as a percentage of the mean) of both outstanding claim liabilities… | fact | linked | Independent Risk: “By the law of large numbers, larger portfolios have lower independent CoVs, and longer run-off leav…” |
| A longer claim run-off (longer-tailed business) produces a higher coefficient of variation for both outstanding claim liabilities and premi… | fact | linked | Independent Risk: “So a short-tail portfolio's outstanding claim CoV is likely below a similar-sized long-tail one's.” |
| For long-tailed lines, the premium liability CoV is expected to exceed the outstanding claim liability CoV for the same portfolio, since pr… | fact | linked | Independent Risk: “A long-tail portfolio's premium liability CoV is normally above its outstanding claim CoV, while a …” |
| To internally benchmark the independent-risk CoV for a portfolio, compare it with the selected CoVs of other portfolios, adjusting up or do… | procedure | linked | Independent Risk (collapsed): “The inflated liability looks like a larger portfolio, and larger portfolios have less random volati…” |
| Event risk (systemic risk from rare external events) is separate from independent risk; when it is not material, the CoV selection only nee… | definition | linked | External Systemic Risk: “Each category is uncorrelated with [[Independent Risk\\|independent risk]], [[Internal Systemic Risk…” |

</details>

<details><summary><code>cas7-2016-q1</code> · answerable</summary>

Tagged pages: Credibility, Benktander Method, Credible Loss Ratio Reserve

| Item | Kind | Status | Where |
|---|---|---|---|
| Loss-ratio based payout factors (Hürlimann) are built by estimating the incremental paid loss amount for each development period from the a… | procedure | tagged | Credible Loss Ratio Reserve: “$p_i = \sum_{k \le n-i+1} m_k \big/ \sum_k m_k$ is the **loss ratio payout factor**, the expected s…” |
| The Benktander (iterated BF) ultimate equals the cumulative paid plus the unpaid proportion q times the prior iteration's ultimate, startin… | formula | tagged | Benktander Method: “Repeating $R = qU$ then $U = C + R$ from $U_0$ gives $U^{(m)} = (1 - q^m)\,U_{\text{CL}} + q^m U_0$.” |
| The n-th iteration Benktander reserve equals the individual (chain-ladder) reserve times (1 - q^n) plus the expected-cost (a priori) reserv… | formula | tagged | Benktander Method: “Repeating $R = qU$ then $U = C + R$ from $U_0$ gives $U^{(m)} = (1 - q^m)\,U_{\text{CL}} + q^m U_0$.” |
| The individual (development/chain-ladder) reserve for a year equals paid-to-date divided by P times Q, the collective (Cape Cod/expected lo… | formula | tagged | Credible Loss Ratio Reserve: “$$R_i^{ind} = \frac{q_i}{p_i}\,C_{i,n-i+1}$$” |
| Hürlimann's optimal credibility for minimum variance (when Var[U_i] = Var[U_i^BC]) is Z = P / (P + √P), where P is the percent paid, and th… | formula | tagged | Credible Loss Ratio Reserve: “Hürlimann's optimal weight minimizes both the mean squared error and the variance of $R_i^c$ when $…” |
| The a priori expected loss ratio for the Benktander/Hürlimann method comes from the average payout amounts (a priori ultimate from averaged… | procedure | tagged | Credible Loss Ratio Reserve: “$m_k$ is the **incremental loss ratio** of development period $k$: the paid claims $S_{ik}$ of that…” |

</details>

<details><summary><code>cas7-2016-q10</code> · gap</summary>

Tagged pages: Model Risk, Internal Systemic Risk, External Systemic Risk, Risk Margin

| Item | Kind | Status | Where |
|---|---|---|---|
| External systemic risk is risk external to the actuarial valuation/modeling process (arising from changes in the environment) that affects … | definition | tagged | External Systemic Risk: “**External systemic risk** is the uncertainty from non-random risks outside the actuarial modelling…” |
| Internal systemic risk is risk internal to the valuation/modeling process, arising because the model cannot fully replicate the insurance p… | definition | tagged | Internal Systemic Risk: “**Internal systemic risk** is the uncertainty that arises because the actuarial valuation models ar…” |
| Event risk is external systemic risk from large unpredicted catastrophes or disasters, natural or manmade, that cause many losses. | definition | tagged | External Systemic Risk: “**Event**: single events causing many claims, material for property and motor, and for medical malp…” |
| Economic and social risk is external systemic risk from economic or social changes, such as inflation, that affect claim costs. | definition | tagged | External Systemic Risk: “**Economic and social**: standard inflation (AWE and CPI), economic conditions, fuel prices, drivin…” |
| Recovery risk is external systemic risk from uncertainty in recoveries such as salvage, subrogation and reinsurance, including the reinsure… | definition | tagged | External Systemic Risk: “**Recovery**: reinsurance and non-reinsurance [[Recoveries\\|recoveries]], including reinsurers' abi…” |
| Parameter selection error is internal systemic risk arising because the model cannot capture all predictors of future claim costs or the tr… | definition | tagged | Internal Systemic Risk: “**Parameter selection error** arises because the model cannot adequately measure all the predictors…” |
| Data error is internal systemic risk arising from lack of credible data or inadequate understanding of the portfolio and data being analyze… | definition | tagged | Internal Systemic Risk: “**Data error** comes from poor or unavailable data, or inadequate knowledge of the portfolio, inclu…” |
| Valuation classes should be homogeneous yet large enough to be credible; many small classes make data more volatile and raise internal syst… | fact | missing |  |

</details>

<details><summary><code>cas7-2016-q11</code> · answerable</summary>

Tagged pages: Bayesian, Chain Ladder Method, Dispersion Parameter, Over-Dispersed Poisson Model, Over-Dispersed Negative Binomial Model, Stochastic Reserving

| Item | Kind | Status | Where |
|---|---|---|---|
| In Verrall's over-dispersed Poisson (ODP) chain ladder model, the variance of the incremental loss equals the scale parameter φ times the m… | formula | tagged | Over-Dispersed Poisson Model: “Its variance is a constant scale parameter $\phi$ times the mean” |
| In the over-dispersed negative binomial model, the variance of the incremental loss is φ·(λ_j − 1)·λ_j·D_{i,j−1}, where λ_j is the developm… | formula | tagged | Over-Dispersed Negative Binomial Model: “$$\mathrm{Var}[C_{ij} \mid D_{i,j-1}] = \phi\,\lambda_j(\lambda_j - 1)\,D_{i,j-1}$$” |
| In the normal stochastic chain ladder model, the variance of the incremental loss equals φ times the prior-period cumulative loss D_{i,j−1}. | formula | tagged | Over-Dispersed Negative Binomial Model: “keeps the mean but uses a normal distribution with variance $\phi_j D_{i,j-1}$” |
| The over-dispersed negative binomial and normal models have mean forms (a development factor times the prior cumulative loss) that directly… | fact | tagged | Over-Dispersed Negative Binomial Model: “Written that way, the connection with the chain ladder is immediately apparent from the mean.” |
| The ODP and over-dispersed negative binomial models cannot handle a negative column sum of incremental losses without adjusting the data, w… | fact | tagged | Over-Dispersed Negative Binomial Model: “The same positivity constraint applies: every column sum must be positive, because $\lambda_j < 1$ …” |

</details>

<details><summary><code>cas7-2016-q12</code> · gap</summary>

Tagged pages: Bootstrap, Generalized Linear Model, ODP Bootstrap Model, Data Issues

| Item | Kind | Status | Where |
|---|---|---|---|
| The log-link GLM cannot be fit when incremental losses are negative because the log of a negative value is undefined, and a negative column… | fact | linked | Over-Dispersed Poisson Model: “That needs a parameter for every accident and every development period, a common $\phi$, and positi…” |
| Modify the log-link for negative incrementals by using ln(q) for q>0, 0 for q=0, and -ln(-q) for q<0; this works when the column sum is pos… | procedure | tagged | Data Issues: “*negative incremental values* (a modified log link handles them unless a whole column sums negative…” |
| Shift method: subtract the largest negative incremental value from every cell (making all cells nonnegative), fit the GLM on the shifted tr… | procedure | tagged | Data Issues: “*negative incremental values* (a modified log link handles them unless a whole column sums negative…” |
| Convert a cumulative loss triangle to an incremental triangle by differencing successive cumulative values within each accident year, then … | procedure | missing |  |

</details>

<details><summary><code>cas7-2016-q13</code> · answerable</summary>

Tagged pages: Bootstrap, Residual Plot, ODP Bootstrap Model, Heteroscedasticity, Pearson Residual, Data Diagnostic Analysis

| Item | Kind | Status | Where |
|---|---|---|---|
| In diagnosing a bootstrap model, residuals can be plotted against several variables besides development period, including accident year, ca… | fact | tagged | Residual Plot: “- A **Normal [[QQ Plot]]** of residuals checks the normality assumption” |
| Residual plots that show a trend (residuals systematically positive or negative in some region) or non-constant spread (heteroscedasticity,… | fact | tagged | Residual Plot: “\\| Fan shape (spread increases) \\| **Heteroscedasticity** — variance is not constant \\|” |
| Outliers in a residual plot, or residuals on a normality plot that stray from a straight 45-degree line, are signs of model inadequacy that… | fact | tagged | Residual Plot: “\\| Isolated points far from zero \\| **Outliers**; whether one is influential depends on its leverag…” |
| Scaled Pearson (standardized) residuals under the ODP model are the actual minus expected incremental, divided by the square root of the ex… | definition | tagged | Pearson Residual: “**Pearson Residual** is an actual incremental loss minus its fitted value, divided by the standard …” |
| Because Pearson residuals are already scaled for the expected variance, larger incremental values at early ages do not justify larger resid… | fact | tagged | Heteroscedasticity: “In a reserving model it usually means the residuals of some development periods are more variable t…” |

</details>

<details><summary><code>cas7-2016-q14</code> · answerable</summary>

Tagged pages: Bootstrap, Generalized Linear Model, Heteroscedasticity, Pearson Residual, ODP Bootstrap Model

| Item | Kind | Status | Where |
|---|---|---|---|
| In the ODP bootstrap, the sampled incremental loss for a cell is q* = r*·√m + m, where m is the fitted incremental loss and r* is the (adju… | formula | tagged | Pearson Residual: “**In the bootstrap**, a sampled residual $r^*$ makes a pseudo value $q^*(w,d) = r^* \sqrt{m_{w,d}} …” |
| Fitted incremental losses are obtained by differencing fitted cumulative losses between consecutive development ages (the bootstrap is appl… | definition | tagged | ODP Bootstrap Model: “*Fit.* Compute volume-weighted factors and divide the latest diagonal backwards to get the fitted i…” |
| To adjust for heteroscedasticity, group accident years (or cells) whose standardized residual standard deviations are similar, and compute … | procedure | tagged | Heteroscedasticity: “The development periods are split into groups $1, \dots, j$ whose residuals have similar variances.” |
| The hetero-adjustment factor for a group is h_i = (reference standard deviation, e.g. the largest group's or overall standard deviation) di… | formula | tagged | Heteroscedasticity: “$h_i$ is group $i$'s hetero-adjustment factor: the standard deviation of all the residuals over tha…” |
| When sampling a residual in a heteroscedastic bootstrap, multiply the sampled residual by the hetero-adjustment factor of the group it was … | procedure | tagged | Heteroscedasticity: “Multiplied by $h_i$, every group's residuals have the same standard deviation, so the adjusted resi…” |
| Bootstrapping residuals from anywhere in the triangle requires the residuals to be independent and identically distributed; heteroscedastic… | fact | tagged | Heteroscedasticity: “The [[ODP Bootstrap Model\\|ODP bootstrap]] assumes the opposite, homoscedasticity: that the standar…” |

</details>

<details><summary><code>cas7-2016-q15</code> · answerable</summary>

Tagged pages: Bayesian, Chain Ladder Method, Hypothesis Testing, PP Plot, Leveled Chain Ladder Model, Correlated Chain Ladder Model, Mack Chain Ladder Model, Unpaid Claim Distribution, Stochastic Reserving

| Item | Kind | Status | Where |
|---|---|---|---|
| To test model percentiles for uniformity with the Kolmogorov-Smirnov test, sort the percentiles of actual outcomes ascending, compare each … | procedure | tagged | PP Plot: “The **Kolmogorov-Smirnov (KS) test** measures the gap against $f_i = 100\,i/n$, an approximation to…” |
| If the model is correct, the percentiles of actual outcomes within the predicted distributions should be uniformly distributed; the model p… | fact | tagged | PP Plot: “If the model is right, each outcome is a random draw from its predictive distribution, so its perce…” |
| Common reasons reserving models fail to predict the distribution of outcomes include unobservable changes in the loss environment, an overl… | fact | tagged | Stochastic Reserving: “Changes that are not in the data, such as reform, a new claims system or a shift in inflation, are …” |
| Mack model shortcomings include treating the latest reported loss (row level) as fixed, assuming accident years are independent, ignoring c… | fact | tagged | Leveled Chain Ladder Model: “**What it fixes.** The [[Mack Chain Ladder Model\\|Mack model]] multiplies the age-to-age factors by…” |
| Alternative models address Mack's shortcomings: Leveled Chain Ladder lets the row level vary, Correlated Chain Ladder allows correlation be… | fact | tagged | Correlated Chain Ladder Model: “It adds correlation between successive [[Accident Year\\|accident years]] to the [[Leveled Chain Lad…” |
| On incurred loss triangles, the Mack model tends to produce predictive distributions that are too light-tailed (too narrow), so actual outc… | fact | tagged | Stochastic Reserving: “On incurred data, Mack's distributions had tails that were too light.” |

</details>

<details><summary><code>cas7-2016-q16</code> · gap</summary>

Tagged pages: Cape Cod Method, Reinsurance, Credibility, Reinsurance Reserving

| Item | Kind | Status | Where |
|---|---|---|---|
| The Stanard-Bühlmann (Cape Cod) expected loss ratio is the sum of aggregate reported losses divided by the sum of on-level (adjusted) premi… | formula | tagged | Cape Cod Method: “The ELR is estimated as total reported losses over total *used-up* (on-level, developed) premium ac…” |
| The percent reported (report lag factor) equals the reciprocal of the reported loss development factor to ultimate, Rlag = 1/LDF. | definition | tagged | Reinsurance Reserving: “and a selected development pattern with $12\%$ reported (a CDF to ultimate of $1/0.12 = 8.333$)” |
| The Stanard-Bühlmann IBNR for an accident year equals adjusted premium times the ELR times (1 − percent reported); total IBNR is the sum ov… | formula | tagged | Cape Cod Method: “$$\text{IBNR}_i = \text{ELR} \times \text{EP}_i \times \left(1 - \tfrac{1}{\text{CDF}_i}\right)$$” |
| The chain ladder IBNR equals reported loss times (LDF to ultimate − 1), i.e., reported/percent reported minus reported. | formula | linked | Chain Ladder Method: “$$U_{\text{AY}} = C_{\text{AY},\,n} \times \text{CDF}_{n \to \text{ult}}$$” |
| In Patrik's credibility weighting, the weight on the chain ladder IBNR is Z = (percent reported) × (selected credibility factor), and the f… | procedure | missing |  |

</details>

<details><summary><code>cas7-2016-q17</code> · answerable</summary>

Tagged pages: Reinsurance, Loss Reserving, Reinsurance Reserving

| Item | Kind | Status | Where |
|---|---|---|---|
| Reinsurance loss reserves tend to exhibit persistent upward development, a technical problem that makes reinsurance reserving harder than p… | fact | tagged | Reinsurance Reserving: “As a result, early development factors and tails are higher than primary, especially for non-propor…” |
| Reinsurance reserving is hampered by IT system and data coding problems, and by heterogeneous industry reinsurance data (e.g., cedant lines… | fact | tagged | Reinsurance Reserving: “External patterns such as RAA data help but mix unlike contracts.” |
| Causes of persistent upward development in reinsurance include cedants under-reserving ALAE, cedants setting case reserves at modal values,… | fact | tagged | Reinsurance Reserving: “As a result, early development factors and tails are higher than primary, especially for non-propor…” |
| Causes of reinsurance data and coding problems include systems not updated quickly enough to keep pace with changing needs, heterogeneity o… | fact | tagged | Reinsurance Reserving: “External patterns such as RAA data help but mix unlike contracts.” |

</details>

<details><summary><code>cas7-2016-q18</code> · gap</summary>

Tagged pages: Retrospective Rating, PDLD Ratio, Retrospective Premium Reserve

| Item | Kind | Status | Where |
|---|---|---|---|
| A retrospectively rated policy's premium asset (or liability) is the estimated future retrospective premium adjustments, i.e. expected addi… | definition | tagged | Retrospective Premium Reserve: “$$\text{Ult. premium} = P_{\text{last adj.}} + \text{CPDLD}_k \times \text{Future loss emergence}$$” |
| The paid/incurred loss development ratio (PDLD) is the ratio of the change in retrospective premium at an adjustment to the change in repor… | definition | tagged | PDLD Ratio: “For each retro adjustment it is the premium developed in that adjustment divided by the loss develo…” |
| The cumulative PDLD ratio (CPDLD) for a given adjustment is the sum of PDLD × percent loss emerged over that adjustment and all later adjus… | formula | tagged | PDLD Ratio: “$$\text{CPDLD}_k = \frac{\sum_{n \ge k} \text{PDLD}_n \, \Delta\%L_n}{\sum_{n \ge k} \Delta\%L_n}$$” |
| Expected future loss emergence for a policy period is ultimate loss minus losses reported as of the prior retro adjustment. | procedure | missing |  |
| Expected future retrospective premium for a policy period is its expected future loss multiplied by the CPDLD for the next retro adjustment… | procedure | tagged | Retrospective Premium Reserve: “Note how year B uses booked premium from its *last adjustment* as the base and applies only the lat…” |

</details>

<details><summary><code>cas7-2016-q2</code> · answerable</summary>

Tagged pages: Loss Development, Linear Regression, Bayesian Credibility, Least Squares Development Method

| Item | Kind | Status | Where |
|---|---|---|---|
| In the least squares development method, regress ultimate loss (Y) on reported loss (X) with Y = a + bX, and estimate a new year's ultimate… | procedure | tagged | Least Squares Development Method: “**Least squares development** estimates a later value $y$ of an accident year's losses from its cur…” |
| A negative slope in the least squares development method implies ultimate loss decreases as reported loss increases (negative development),… | fact | tagged | Least Squares Development Method: “If $b < 0$, the estimate falls as $x$ rises, so substitute the budgeted loss method.” |
| A negative intercept in the least squares development method implies a negative ultimate loss when reported loss is zero or small, which is… | fact | tagged | Least Squares Development Method: “If $a < 0$, the estimate is negative for small $x$, so substitute the link ratio method.” |
| The Bayesian credibility (Bayesian development) estimate of ultimate loss is L(x) = Z*(X/d) + (1-Z)*E(Y), where X is reported loss, d is th… | formula | tagged | Least Squares Development Method: “With $c = \bar{y}/\bar{x}$ as the link ratio and $Z = b/c$, the fit is $L(x) = Z\,(cx) + (1 - Z)\,\…” |
| The Bayesian development credibility is Z = VHM/(VHM+EVPV), with VHM = d^2*Var(Y) and EVPV = Var(X/Y)*[Var(Y)+E(Y)^2], where Var(X/Y) is th… | formula | tagged | Least Squares Development Method: “Brosius's Development Formula 2 gives the theoretical weight $Z = VHM/(VHM + EVPV)$.” |
| The expected reporting percentage d equals the sum of reported losses divided by the sum of ultimate losses over historical years. | formula | linked | Bornhuetter-Ferguson Method: “and $1 - 1/\text{CDF}$ the percentage unreported from the [[Development Triangle\\|development patte…” |
| When the prior expected ultimate loss changes by some percentage, the new prior E(Y) is the historical average ultimate loss scaled by that… | fact | tagged | Least Squares Development Method (collapsed): “Before it, ultimate losses of $\$50$M were expected; pricing expects a $30\%$ saving, so $E(Y) = \$…” |

</details>

<details><summary><code>cas7-2016-q3</code> · answerable</summary>

Tagged pages: Maximum Likelihood Estimation, Cape Cod Method, Process Risk, Prediction Error

| Item | Kind | Status | Where |
|---|---|---|---|
| The Cape Cod ELR equals total cumulative reported/paid loss divided by total used-up premium, where used-up premium is the sum over years o… | formula | tagged | Cape Cod Method: “The ELR is estimated as total reported losses over total *used-up* (on-level, developed) premium ac…” |
| The Cape Cod reserve for each accident year equals on-level premium times ELR times (1 minus the percent emerged); total reserve is the sum… | formula | tagged | Cape Cod Method: “$$\text{IBNR}_i = \text{ELR} \times \text{EP}_i \times \left(1 - \tfrac{1}{\text{CDF}_i}\right)$$” |
| The LDF (chain ladder) method reserve equals cumulative loss times (CDF minus 1), where CDF is 1 divided by the percent emerged, i.e., paid… | formula | linked | Chain Ladder Method: “$$U_{\text{AY}} = C_{\text{AY},\,n} \times \text{CDF}_{n \to \text{ult}}$$ … $$\text{IBNR} = U_{\te…” |
| In the Clark framework, process variance of the reserve estimate equals the scale parameter σ² times the reserve (expected unpaid loss), no… | fact | tagged | Process Risk: “the process variance of a reserve is its expected value times a constant variance-to-mean ratio $\s…” |
| Total variance of the reserve estimate is the sum of process variance and parameter variance; total standard deviation is the square root o… | formula | tagged | Process Risk: “**Total variance.** Clark adds the two, treating them as independent.” |
| The scale parameter σ² is estimated as 1/(n−p) times the sum of squared chi-square residuals, (actual incremental − fitted incremental)²/fi… | formula | tagged | Process Risk: “$$\sigma^2 = \frac{1}{n-p}\sum_{AY,t}\frac{(c_{AY,t} - \hat\mu_{AY,t})^2}{\hat\mu_{AY,t}}$$” |
| The LDF method has more parameters than Cape Cod (one expected-ultimate parameter per accident year versus a single ELR, plus the growth cu… | fact | tagged | Process Risk: “There are $n$ increments in the data and $p$ fitted parameters: $3$ for Clark's [[Cape Cod Method\\|…” |

</details>

<details><summary><code>cas7-2016-q4</code> · untagged</summary>

Tagged pages: Cape Cod Method, Maximum Likelihood Estimation, Growth Curve

| Item | Kind | Status | Where |
|---|---|---|---|
| The average age of losses for an accident year at a valuation date is the months elapsed from the accident year's midpoint to the valuation… | definition | tagged | Growth Curve: “The age $x$ runs from the *average* accident date to the evaluation date, so an [[Accident Year\\|ac…” |
| A loglogistic (or similar) curve G(x) = x^θ/(x^θ+ω^θ) gives the cumulative proportion of ultimate losses paid at average age x, so the prop… | formula | tagged | Growth Curve: “$$\text{Loglogistic: } G(x) = \frac{x^{\omega}}{x^{\omega} + \theta^{\omega}}$$” |
| Under the Cape Cod method with a given expected loss ratio, expected unpaid losses for an accident year = on-level premium × ELR × (1 − G(x… | formula | tagged | Cape Cod Method: “$$\text{IBNR}_i = \text{ELR} \times \text{EP}_i \times \left(1 - \tfrac{1}{\text{CDF}_i}\right)$$” |
| Used-up premium for an accident year is its on-level premium multiplied by the expected percentage of ultimate losses paid, G(x), at the va… | definition | tagged | Cape Cod Method: “**Used-up premium** $\text{EP}_i / \text{CDF}_i$ is the share of each year's premium "exposed" to t…” |
| The Cape Cod a priori (average) loss ratio is the sum of reported/paid losses over all years divided by the sum of used-up premium; the los… | formula | tagged | Cape Cod Method: “The ELR is estimated as total reported losses over total *used-up* (on-level, developed) premium ac…” |
| Cape Cod assumes a constant expected loss ratio across accident years; a systematic trend in the ratio of losses to used-up premium (or in … | fact | elsewhere | Generalized Cape Cod Method: “Cape Cod assumes one trended, on-level ratio holds for every year.” |

</details>

<details><summary><code>cas7-2016-q5</code> · answerable</summary>

Tagged pages: Chain Ladder Method, Calendar Year, Hypothesis Testing, Calendar Year Effect

| Item | Kind | Status | Where |
|---|---|---|---|
| Calendar year effects are influences that act along the diagonals of a loss development triangle, affecting several accident years in the s… | definition | tagged | Calendar Year Effect: “**Calendar Year Effect** (diagonal effect) is an influence that acts on every accident year in the …” |
| To run Mack's calendar year test, rank the age-to-age factors within each development column, label each factor larger than the column medi… | procedure | tagged | Calendar Year Effect: “In each column, factors above the [[Median\\|median]] are L and below it are S; with an odd count th…” |
| The test statistic for each diagonal is Z_j = min(S_j, L_j), and the overall statistic is Z = sum of Z_j across diagonals, with n_j = S_j +… | definition | tagged | Calendar Year Effect: “$$Z_j = \min(L_j,\ S_j)$$” |
| For a diagonal with n non-excluded factors and m = (n-1)/2 (rounded down), E[Z_j] = n/2 - C(n-1, m) * n / 2^n. | formula | tagged | Calendar Year Effect: “$$E(Z_j) = \frac{n}{2} - \binom{n-1}{m}\frac{n}{2^n}$$” |
| For a diagonal with n non-excluded factors and m = (n-1)/2 (rounded down), Var[Z_j] = n(n-1)/4 - C(n-1, m) * n(n-1) / 2^n + E[Z_j] - E[Z_j]… | formula | tagged | Calendar Year Effect: “$$\text{Var}(Z_j) = \frac{n(n-1)}{4} - \binom{n-1}{m}\frac{n(n-1)}{2^n} + E(Z_j) - E(Z_j)^2$$” |
| Test the null hypothesis of no calendar year effects by checking whether Z lies within E[Z] ± z × sqrt(Var[Z]) (with the z-value for the ch… | procedure | tagged | Calendar Year Effect: “"no calendar year effect" is rejected at 5% if $Z$ falls outside $E(Z) \pm 2\sqrt{\text{Var}(Z)}$.” |
| Internal company actions can cause calendar year effects, such as strengthening case reserves across all accident years in one calendar yea… | fact | linked | Development Triangle: “A diagonal effect is [[Inflation\\|inflation]], a reserve strengthening, or a settlement push, and i…” |

</details>

<details><summary><code>cas7-2016-q6</code> · untagged</summary>

Tagged pages: Development Factor, Correlation Coefficient, Hypothesis Testing, Development Factor Correlation Test

| Item | Kind | Status | Where |
|---|---|---|---|
| Venter's correlation test checks the chain ladder assumption that age-to-age factors are independent across development periods, by testing… | definition | tagged | Development Factor Correlation Test: “**Development Factor Correlation Test** checks whether a triangle's development factors are correla…” |
| The sample (Pearson) correlation coefficient is r = Σ(X−X̄)(Y−Ȳ) / sqrt(Σ(X−X̄)² · Σ(Y−Ȳ)²), equivalently (E[XY]−E[X]E[Y])/(σXσY). | formula | elsewhere | Correlation: “$$r = \frac{\sum_{i=1}^n (x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum_{i=1}^n (x_i - \bar{x})^2}\,\sq…” |
| To test the significance of a correlation r from n pairs, compute T = r·sqrt((n−2)/(1−r²)), which follows a t-distribution with n−2 degrees… | procedure | tagged | Development Factor Correlation Test: “Correlations can be positive or negative, so the test is two-tailed: $r$ is significant at the 10% …” |
| Spearman's rank correlation for a pair of columns is computed by ranking the factors within each column (ranking the same accident years), … | procedure | tagged | Development Factor Correlation Test: “$$T_k = 1 - \frac{6\sum_{i=1}^{I-k}(r_{ik} - s_{ik})^2}{(I-k)^3 - (I-k)}$$” |
| The Spearman coefficient for the whole triangle is the weighted average of the column-pair coefficients T_k with weights (I−k−1), i.e. the … | formula | tagged | Development Factor Correlation Test: “$$T = \frac{\sum_{k=2}^{I-2}(I-k-1)\,T_k}{\sum_{k=2}^{I-2}(I-k-1)}$$” |
| Testing the triangle as a whole is preferred to testing individual column pairs because multiple column-pair tests accumulate error probabi… | fact | tagged | Development Factor Correlation Test: “With $m$ pairs, the number significant at 10% is Binomial$(m, 0.1)$, with standard deviation $0.3\s…” |
| What matters is whether correlation prevails globally across the triangle, rather than finding a small part of the triangle that shows corr… | fact | tagged | Development Factor Correlation Test: “Because the test is only approximate and should catch correlation in a substantial part of the tria…” |

</details>

<details><summary><code>cas7-2016-q7</code> · gap</summary>

Tagged pages: Chain Ladder Method, Residual Plot, Mack Chain Ladder Model, Chain Ladder Assumptions

| Item | Kind | Status | Where |
|---|---|---|---|
| Under Mack's chain-ladder model, the volume-weighted average age-to-age factor is the sum of losses at the later age divided by the sum of … | formula | tagged | Mack Chain Ladder Model: “$\hat f_k = \sum_j C_{j,k+1} / \sum_j C_{jk}$ is [[Unbiasedness\\|unbiased]].” |
| Mack's weighted residual for an accident year is (actual cumulative loss at the next age minus the age-to-age factor times cumulative loss … | formula | missing |  |
| To test Mack's assumptions, plot the weighted residuals against the cumulative loss at the earlier age (or other variable) and check whethe… | procedure | tagged | Residual Plot: “**Residuals vs. predictor**: checks whether a variable's effect is correctly specified” |
| Mack's third chain-ladder assumption (variance assumption) states that the variance of the next period's cumulative (or incremental) loss i… | definition | tagged | Mack Chain Ladder Model: “$$\text{Var}(C_{i,k+1} \mid C_{i1}, \dots, C_{ik}) = C_{ik}\,\alpha_k^2$$” |
| The weighted residual plot is used to test the variance assumption; a non-random pattern (e.g., mostly negative residuals with one large po… | fact | tagged | Residual Plot: “\\| Fan shape (spread increases) \\| **Heteroscedasticity** — variance is not constant \\|” |

</details>

<details><summary><code>cas7-2016-q8</code> · gap</summary>

Tagged pages: Limited Expected Value, Exponential Distribution, Development Factor, Layer Development Factor

| Item | Kind | Status | Where |
|---|---|---|---|
| In Sahasrabuddhe's approach, claim size model (limited expected value) ratios are used to adjust age-to-age development factors for differe… | procedure | tagged | Layer Development Factor: “That pattern is rescaled by the layer's [[Limited Expected Value\\|limited expected value]] relative…” |
| Trend and limit adjustment requires detrending claim sizes to the target cost level of each accident year and development period, then comp… | procedure | tagged | Layer Development Factor: “They follow from $\Phi_{n,j}$ and the cost level indices $T_{i,j}$: for a scale family such as the …” |
| The limited expected value of an exponential distribution with mean θ at limit L is LEV(L) = θ(1 − e^(−L/θ)). | formula | tagged | Limited Expected Value: “\\| Exponential$(\theta)$ \\| $\theta(1 - e^{-u/\theta})$ \\|” |
| A larger exponential mean θ (larger claim sizes) means more losses are capped at a given limit, so the ratio of LEVs at different limits va… | fact | tagged | Layer Development Factor (collapsed): “The older periods, at lower cost levels, are capped less by the same \$250,000 limit, so their deve…” |
| The choice of basic limit does not affect the difference between modeled and unadjusted factors, because the adjustment is a ratio of LEVs … | fact | missing |  |
| Modeled development factors in Sahasrabuddhe's approach depend on accident-year and calendar-year trend assumptions, the claim size distrib… | fact | tagged | Layer Development Factor: “Development factors at different layers and cost levels are tied together by the claim size model a…” |

</details>

<details><summary><code>cas7-2016-q9</code> · answerable</summary>

Tagged pages: Deductible, Loss Development, Excess Loss Development Factor, Implied Development Method, Excess Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| With a per-occurrence deductible policy, the insurer retains only the losses excess of the deductible; losses below the deductible are born… | fact | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| Expected insurer-retained (excess) losses equal premium × unlimited expected loss ratio × excess ratio at the deductible, summed across haz… | formula | linked | Large Deductible Policy: “\text{Excess Losses} = E[X] \times \big(1 - \text{LER}(d)\big)” |
| The limited-to-unlimited ratio at a given maturity is the limited (deductible) severity divided by the unlimited severity at that maturity. | definition | tagged | Excess Loss Development Factor: “- **Symbols.** $\text{LDF}_t$ is the unlimited [[Development Factor\\|development factor]] from age …” |
| Unlimited LDF = Limited LDF × (limited-to-unlimited ratio) + Excess LDF × (1 − limited-to-unlimited ratio), so Excess LDF = Unlimited LDF ×… | formula | tagged | Excess Loss Development Factor: “\text{XSLDF}^L_t = \text{LDF}_t \times \frac{1 - R^L}{1 - R^L_t}” |
| When all claims are already reported, development on reported excess losses comes from severity development on known claims (LDF is not 1.0… | procedure | tagged | Excess Loss Development Factor: “With counts complete, the unlimited factor is the severity ratio:” |
| Industry-based (expected loss) estimates are more stable and credible but ignore the insurer's actual loss experience and book differences;… | fact | tagged | Excess Loss Development Factor: “Siewert finds excess factors "quite leveraged and extremely volatile".” |

</details>

<details><summary><code>cas7-2017-q1</code> · answerable</summary>

Tagged pages: Credibility, Benktander Method, Credible Loss Ratio Reserve

| Item | Kind | Status | Where |
|---|---|---|---|
| Estimate the expected incremental loss ratio for each development period as total incremental loss in that period divided by total earned p… | procedure | tagged | Credible Loss Ratio Reserve: “$m_k$ is the **incremental loss ratio** of development period $k$: the paid claims $S_{ik}$ of that…” |
| The percent reported (paid) p at a given age is the cumulative sum of incremental loss ratios through that age divided by the total of all … | formula | tagged | Credible Loss Ratio Reserve: “$p_i = \sum_{k \le n-i+1} m_k \big/ \sum_k m_k$ is the **loss ratio payout factor**, the expected s…” |
| Collective loss ratio (Cape Cod style) method: ultimate = reported loss + earned premium × ELR × q (the unreported percentage). | formula | linked | Bornhuetter-Ferguson Method: “$$\text{IBNR} = \left(1 - \tfrac{1}{\text{CDF}}\right) \times \text{ELR} \times \text{EP}$$” |
| Individual loss ratio method (chain ladder): ultimate = reported loss / p, i.e. reported loss multiplied by the cumulative development fact… | formula | tagged | Benktander Method: “$p = 1/\text{CDF}$ is the percentage developed, and $q = 1 - p$.” |
| Benktander (Gunnar Benktander) method: ultimate = (1 - q²) × individual (chain ladder) ultimate + q² × a priori ultimate (earned premium × … | formula | tagged | Benktander Method: “$$U_{\text{GB}} = p(2 - p)\,U_{\text{CL}} + \left[1 - p(2-p)\right] U_{0}$$” |
| Optimal (Neuhaus-type minimum variance) credibility for the individual loss ratio is Z = p / (p + √p), and the optimal ultimate = Z × indiv… | formula | tagged | Credible Loss Ratio Reserve: “$$R_i^{c} = Z_i\,R_i^{ind} + (1 - Z_i)\,R_i^{coll}$$ … $$Z_i^{*} = \frac{p_i}{p_i + \sqrt{p_i}}$$” |
| When an accident year is fully developed (p = 1, q = 0), all credibility methods give ultimate equal to the reported loss, as no further de… | fact | tagged | Credible Loss Ratio Reserve: “$$R_i^{ind} = \frac{q_i}{p_i}\,C_{i,n-i+1}$$” |

</details>

<details><summary><code>cas7-2017-q10</code> · gap</summary>

Tagged pages: Bootstrap, Residual Plot, Heteroscedasticity, ODP Bootstrap Model, Data Diagnostic Analysis

| Item | Kind | Status | Where |
|---|---|---|---|
| Heteroscedasticity means the variance of the residuals is not constant across a factor such as development age; a bootstrap model assumes s… | definition | tagged | Residual Plot: “\\| Fan shape (spread increases) \\| **Heteroscedasticity** — variance is not constant \\|” |
| Test bootstrap model assumptions by plotting standardized residuals against development age, calendar year, accident year, or fitted values… | procedure | tagged | Data Diagnostic Analysis: “Plot residuals against development period, accident period, calendar period and fitted value. They …” |
| A calendar year trend such as inflation not captured by the model appears in a residual-versus-calendar-year plot as residuals trending upw… | fact | missing |  |
| Heteroscedasticity across development ages appears in a residual-versus-development-age plot as residuals at some ages (e.g., 12 and 24) ha… | fact | tagged | Heteroscedasticity: “**Detecting it.** A [[Residual Plot\\|residual graph]] by development period shows it: the residuals…” |
| In a loss triangle, later calendar years and earlier development ages have more data points, so a residual plot has more residuals at later… | fact | tagged | Heteroscedasticity: “There are fewer residuals in the later development periods, so the credibility of an apparent diffe…” |

</details>

<details><summary><code>cas7-2017-q11</code> · gap</summary>

Tagged pages: Bayesian, Bornhuetter-Ferguson Method, Dispersion Parameter, Bayesian Bornhuetter-Ferguson Model, Over-Dispersed Poisson Model

| Item | Kind | Status | Where |
|---|---|---|---|
| In the Bayesian (Verrall/Bornhuetter-Ferguson-chain-ladder credibility) model, the expected incremental loss in development year j is Z_ij(… | formula | tagged | Bayesian Bornhuetter-Ferguson Model: “E[C_{ij}] ={}& Z_{ij}\,(\lambda_j - 1)\,D_{i,j-1} \\ … &+ (1 - Z_{ij})\,(\lambda_j - 1)\,\frac{M_i}…” |
| The credibility weight is Z_ij = (cumulative proportion reported before year j) / (βφ + cumulative proportion reported before year j), wher… | formula | tagged | Bayesian Bornhuetter-Ferguson Model: “Z_{ij} = \frac{\sum_{k=1}^{j-1} y_k}{\beta_i\,\phi + \sum_{k=1}^{j-1} y_k}” |
| The prior mean of ultimate losses M_i (the a priori expected ultimate) equals the gamma prior mean α_i/β_i. | fact | tagged | Bayesian Bornhuetter-Ferguson Model: “E[x_i] = M_i = \frac{\alpha_i}{\beta_i}” |
| To project multiple future periods, use the expected incremental loss from the prior period added to cumulative losses as D_{i,j−1} for the… | procedure | missing |  |
| The percent of ultimate emerging in a development period equals the difference between the percent reported at the end and at the start of … | fact | tagged | Bayesian Bornhuetter-Ferguson Model: “$y_k$ is the share of ultimate emerging in period $k$, so $\sum_{k<j} y_k = 1/(\lambda_j\cdots\lamb…” |
| β controls the variance of the gamma prior (variance α/β²); a smaller β gives a larger prior variance, a larger Z, and more weight on chain… | fact | tagged | Bayesian Bornhuetter-Ferguson Model: “For a given $M_i$, a larger $\beta_i$ is a smaller prior variance and more certainty about $M_i$. T…” |

</details>

<details><summary><code>cas7-2017-q12</code> · gap</summary>

Tagged pages: Bootstrap, ODP Bootstrap Model, Data Issues

| Item | Kind | Status | Where |
|---|---|---|---|
| When exposure changes materially across accident years, adjust the ODP bootstrap by dividing claims by exposure (modeling loss ratios/pure … | procedure | tagged | Data Issues: “*exposure changes* (model losses per exposure)” |
| When the first development period is a partial year (e.g., the latest accident year has only a half year of exposure), annualize the partia… | procedure | missing |  |
| When the latest diagonal is only a partial calendar year, the latest diagonal's incremental amounts cover a shorter period; adjust by annua… | procedure | missing |  |
| When the triangle is missing early-age data for older accident years (irregular triangle shape), exclude the missing or unusable cells from… | procedure | tagged | Data Issues: “*missing values* (estimate from surrounding cells, or exclude from the factors and residuals)” |
| Outliers in the triangle can be excluded from the development factor and residual calculations (while still resampling the corresponding in… | procedure | tagged | Data Issues: “*outliers* (exclude with care — skewed residuals are expected)” |

</details>

<details><summary><code>cas7-2017-q13</code> · answerable</summary>

Tagged pages: Bayesian, Confidence Interval, Percentile, PP Plot, Unpaid Claim Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| A histogram of percentiles (rank histogram) plots how often actual observations fall in each percentile bucket of the model's predicted dis… | definition | tagged | PP Plot: “**A histogram** of the percentiles is the most visual test, with bars that should be level.” |
| If the extreme (lowest and highest) percentile bars of the histogram are too tall, actual results fall in the tails more often than predict… | fact | tagged | PP Plot: “**Slanted "S"** (flat at both ends, steep through the middle): too many outcomes in the high and lo…” |
| A p-p plot graphs the model's predicted (theoretical) percentiles against the empirical percentiles of the actual observations, with a 45-d… | definition | tagged | PP Plot: “$e_i$, the expected value of the $i$-th of $n$ sorted uniform percentiles, goes on the horizontal a…” |
| A p-p plot with a backwards S shape that is symmetric about the center indicates a heavy-tailed model: actual results land in the extreme p… | fact | tagged | PP Plot: “**Slanted backward "S"** (steep at both ends, flat through the middle): too many outcomes in the mi…” |
| If the histogram shows too many observations in the highest percentile buckets, actual results exceed predictions too often, so the model i… | fact | tagged | PP Plot: “**Below the $45^\circ$ line throughout**: outcomes pile into the low percentiles, so the model pred…” |
| Bias in the expected value is judged from asymmetry in the percentile histogram or p-p plot; a centered 50th percentile match alone does no… | fact | tagged | PP Plot: “**Below the $45^\circ$ line throughout**: outcomes pile into the low percentiles, so the model pred…” |

</details>

<details><summary><code>cas7-2017-q14</code> · gap</summary>

Tagged pages: Reinsurance, Loss Reserving, Bordereau, Reinsurance Reserving

| Item | Kind | Status | Where |
|---|---|---|---|
| Reinsurers face a longer claim report lag than primary insurers because a claim must first be recognized as reportable by the cedant and th… | fact | tagged | Bordereau: “Bordereau delays are one of Friedland's reasons that reinsurance reporting and payment patterns are…” |
| Reinsurers experience persistent upward loss development because cedants tend to reserve at modal values and understate ALAE, and claims re… | fact | missing |  |
| Reinsurance reporting patterns are heterogeneous because they vary by line of business, contract type, cedant, intermediary, attachment poi… | fact | tagged | Bordereau: “Each ceding company and broker reports from its own systems, so bordereaux differ in the data they …” |
| Because of the heterogeneity of reinsurance business, industry statistics and benchmark development patterns are less useful to reinsurers … | fact | tagged | Reinsurance Reserving: “External patterns such as RAA data help but mix unlike contracts.” |
| Reports reinsurers receive from cedants often lack important detail, being summarized (e.g., for proportional reinsurance) with inadequate … | fact | tagged | Bordereau: “a bordereau's loss detail is far less complete than the claim file behind it.” |
| Reinsurers often have IT system and data coding problems because systems cannot keep pace with rapid company growth and the heterogeneous n… | fact | tagged | Bordereau: “Each ceding company and broker reports from its own systems, so bordereaux differ in the data they …” |

</details>

<details><summary><code>cas7-2017-q15</code> · gap</summary>

Tagged pages: Reinsurance, IBNR, Reinsurance Reserving

| Item | Kind | Status | Where |
|---|---|---|---|
| Additional case reserves (ACR) are reserves a reinsurer adds on top of the case reserves reported by the ceding company on individual claim… | definition | tagged | Reinsurance Reserving: “Reported losses include the reinsurer's **additional case reserves** (ACRs) on top of cedant case r…” |
| Reinsurers typically need larger additional case reserves than primary insurers because cedants often set case reserves at modal (most like… | fact | missing |  |
| Pure IBNR is the reserve for claims that have occurred but have not yet been reported, as distinct from IBNER (development on known, report… | definition | tagged | IBNR: “- **Pure IBNR** (narrow IBNR) covers claims that have occurred but are unknown to the insurer. It i…” |
| A reinsurer's pure IBNR is typically higher than a primary insurer's because claims may be reported to the primary insurer but not yet to t… | fact | tagged | Reinsurance Reserving: “Claims reach the reinsurer only after the cedant has reported and assessed them. Excess claims arri…” |
| A risk load is an explicit margin added to the reserve estimate to provide protection against adverse deviation from uncertainty in the res… | definition | missing |  |
| Reinsurers carry a larger risk load than primary insurers (who often hold none) because of greater uncertainty from report lag, limited inf… | fact | missing |  |

</details>

<details><summary><code>cas7-2017-q16</code> · answerable</summary>

Tagged pages: Cape Cod Method, Bornhuetter-Ferguson Method

| Item | Kind | Status | Where |
|---|---|---|---|
| Used-up (earned) premium for an accident year is its rate-level (on-level) adjusted premium multiplied by the percent reported (reciprocal … | definition | tagged | Cape Cod Method: “**Used-up premium** $\text{EP}_i / \text{CDF}_i$ is the share of each year's premium "exposed" to t…” |
| The Stanard-Bühlmann expected loss ratio equals total reported losses across all accident years divided by total used-up premium across all… | formula | tagged | Cape Cod Method: “The ELR is estimated as total reported losses over total *used-up* (on-level, developed) premium ac…” |
| Stanard-Bühlmann IBNR for an accident year equals rate-level adjusted premium × ELR × (1 − percent reported), i.e., the ELR applied to the … | formula | tagged | Cape Cod Method: “$$\text{IBNR}_i = \text{ELR} \times \text{EP}_i \times \left(1 - \tfrac{1}{\text{CDF}_i}\right)$$” |
| Stanard-Bühlmann premium must be adjusted to a common rate level (on-level), which can be difficult when information is limited (disadvanta… | fact | tagged | Cape Cod Method: “with the a priori loss ratio **derived from the data itself** rather than supplied externally.” |
| At early maturities the chain ladder method is highly leveraged and sensitive to random fluctuations in reported losses, while BF and Stana… | fact | tagged | Bornhuetter-Ferguson Method: “BF does not respond to bad news. If emergence runs far ahead of the a priori, BF holds most of its …” |

</details>

<details><summary><code>cas7-2017-q17</code> · untagged</summary>

Tagged pages: Retrospective Rating, PDLD Ratio

| Item | Kind | Status | Where |
|---|---|---|---|
| The Premium Development to Loss Development (PDLD) ratio at a retrospective adjustment is the ratio of the premium developing (changing) at… | definition | tagged | PDLD Ratio: “For each retro adjustment it is the premium developed in that adjustment divided by the loss develo…” |
| The cumulative PDLD ratio at a retro adjustment is the average of the PDLD ratios for that and all later adjustments, weighted by the incre… | formula | tagged | PDLD Ratio: “$$\text{CPDLD}_k = \frac{\sum_{n \ge k} \text{PDLD}_n \, \Delta\%L_n}{\sum_{n \ge k} \Delta\%L_n}$$” |
| The percent of ultimate loss reported at an adjustment equals the reciprocal of the cumulative loss development factor at that adjustment (… | formula | elsewhere | Cumulative Development Factor: “The reciprocal is the **percentage reported** (or paid): $p_n = 1/\text{CDF}_n$, and $1 - p_n$ is t…” |
| The incremental percent of loss emerging between adjustments is the difference between consecutive cumulative percent reported values; when… | procedure | linked | Retrospective Premium Reserve (collapsed): “Losses emerge $80\%$ by the first adjustment, a further $12\%$ by the second and a further $8\%$ by…” |

</details>

<details><summary><code>cas7-2017-q18</code> · untagged</summary>

Tagged pages: Retrospective Rating, PDLD Ratio, Retrospective Premium Reserve

| Item | Kind | Status | Where |
|---|---|---|---|
| The chain ladder method for retrospective premium applies age-to-age development factors to historical earned (booked) premium triangles (e… | procedure | linked | Chain Ladder Method: “**Chain Ladder Method** (development or link-ratio method) projects each cohort to ultimate by mult…” |
| Chain ladder premium development relies on historical premium patterns, so it is slow to reflect lagged premium data, does not capture chan… | fact | elsewhere | Premium Accounting: “Ten percent of EBUB above collateral held for the specific policy is nonadmitted.” |
| Fitzgibbon's method estimates retrospective premium as a linear regression of premium on ultimate (expected) losses, with a single constant… | formula | elsewhere | Linear Regression: “$$Y_i = \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip} + \varepsilon_i, \qquad \varepsilon_i \s…” |
| Fitzgibbon's method assumes a constant premium-to-loss relationship and is based on ultimate losses only, so it ignores the premium actuall… | fact | tagged | PDLD Ratio: “Each segment starts from the **actual** point reached (his Assumptions A and B). That is what lets …” |
| The slope of retro premium against loss is below 1 because of minimum and maximum premiums, loss limits (per-occurrence caps), and the loss… | fact | tagged | Retrospective Rating: “Converted losses $(L \times \text{LCF})$ are the insured's reported losses $L$, limited by any per-…” |
| The PDLD method projects retrospective premium development from loss development, using the retro rating formula with average plan paramete… | procedure | tagged | PDLD Ratio: “For each retro adjustment it is the premium developed in that adjustment divided by the loss develo…” |
| The formula-based PDLD method is timely and responds to current plan parameters, but its average parameters (basic premium, tax multiplier,… | fact | tagged | PDLD Ratio: “The formula ratios respond to changes in the plan parameters sold. They should be tested against ac…” |
| PDLD slopes differ by adjustment and decline over time because premium responsiveness to losses falls as more losses hit loss caps and min/… | fact | tagged | PDLD Ratio: “Later ratios are the incremental loss capping ratio times $\text{LCF} \times \text{TM}$. They are u…” |

</details>

<details><summary><code>cas7-2017-q2</code> · answerable</summary>

Tagged pages: Loss Development, Linear Regression, Least Squares Development Method

| Item | Kind | Status | Where |
|---|---|---|---|
| In the least squares (Clark-style regression) loss development method, regress ultimate loss ratios (age-to-ultimate developed values) on t… | procedure | tagged | Least Squares Development Method: “**Least squares development** estimates a later value $y$ of an accident year's losses from its cur…” |
| The least squares slope is b = (mean(XY) - mean(X)*mean(Y)) / (mean(X^2) - mean(X)^2) and the intercept is a = mean(Y) - b*mean(X). | formula | tagged | Least Squares Development Method: “$$b = \frac{\overline{xy} - \bar{x}\,\bar{y}}{\overline{x^2} - \bar{x}^2}$$ … $$a = \bar{y} - b\,\b…” |
| The dependent variable (ultimate loss ratio) for a mature year is its latest reported loss ratio times the tail factor; for the regression … | procedure | tagged | Loss Development: “$$\text{CDF}_{n \to \text{ult}} = \prod_{k \ge n} f_{k \to k+1} \times \text{Tail}$$” |
| A negative intercept a is not acceptable in the least squares method because it can produce negative loss ratio predictions; in that case t… | fact | tagged | Least Squares Development Method: “If $a < 0$, the estimate is negative for small $x$, so substitute the link ratio method.” |
| A chain ladder ultimate for a year is its current loss ratio times the ratio of the sum of later-age (to ultimate) loss ratios to the sum o… | procedure | linked | Chain Ladder Method: “**The procedure:** build the cumulative [[Development Triangle\\|triangle]] → compute [[Age to Age F…” |
| Predicted ultimates from a more mature year (e.g., from a prior regression/chain ladder) can be used as additional data points in the regre… | procedure | tagged | Least Squares Development Method: “**In a triangle**, Brosius develops the most mature years first. He then uses their projected ultim…” |

</details>

<details><summary><code>cas7-2017-q3</code> · answerable</summary>

Tagged pages: Chain Ladder Method, Development Factor, Residual Plot, Mack Chain Ladder Model, Chain Ladder Assumptions

| Item | Kind | Status | Where |
|---|---|---|---|
| In Mack's generalized chain ladder, the variance of C_{i,k+1} given prior cumulative losses is proportional to C_{ik}^(2-alpha); alpha=1 gi… | fact | tagged | Chain Ladder Assumptions: “The third, the variance function, picks the estimator. Mack's $a = k(d)\,c(w,d)$ gives the volume-w…” |
| When the variance of C_{i,k+1} is constant across accident years, the age-to-age factor is f_k = sum(C_ik * C_{i,k+1}) / sum(C_ik^2), i.e. … | formula | tagged | Chain Ladder Assumptions: “A constant $a$ gives $\sum c\,q/\sum c^2$ ([[Mack Chain Ladder Model]]). Here $f(d)$ is the *increm…” |
| The residual for accident year i at development k is the actual next-period cumulative loss minus the fitted value: C_{i,k+1} - f_k * C_ik … | formula | tagged | Residual Plot: “$$e_i = y_i - \hat{y}_i \quad \text{(raw residual)}$$” |
| To check a chain ladder variance/linearity assumption, plot residuals (y-axis) against the prior-age cumulative loss C_ik (x-axis) for each… | procedure | tagged | Residual Plot: “A **Residual Plot** is a diagnostic graph used to assess model fit by plotting **residuals** (obser…” |
| Residuals randomly scattered around zero with no trend and no change in magnitude indicate the assumed variance structure and linear develo… | fact | tagged | Residual Plot: “\\| Random scatter around zero \\| Model is adequate \\|” |

</details>

<details><summary><code>cas7-2017-q4</code> · untagged</summary>

Tagged pages: Cape Cod Method, Maximum Likelihood Estimation, Growth Curve

| Item | Kind | Status | Where |
|---|---|---|---|
| A loss development growth curve G(x) gives the cumulative proportion of ultimate losses reported by age x, and the reciprocal 1/G(x) is the… | definition | tagged | Growth Curve: “**Growth curve** $G(x \mid \omega, \theta)$ is a smooth parametric curve, in the form of a cumulati…” |
| Evaluate a loglogistic growth curve G(x)=x^w/(x^w+θ^w) at an accident year's average age, which for a 12-month accident year is the evaluat… | procedure | tagged | Growth Curve: “The age $x$ runs from the *average* accident date to the evaluation date, so an [[Accident Year\\|ac…” |
| Used-up (earned) premium equals on-level premium times G(x), the portion of premium expected to have emerged as reported loss at the evalua… | formula | tagged | Cape Cod Method: “**Used-up premium** $\text{EP}_i / \text{CDF}_i$ is the share of each year's premium "exposed" to t…” |
| Estimate each accident year's loss ratio without using a pooled ELR, either as reported loss divided by used-up premium or as reported loss… | procedure | linked | Accident Year: “\text{AY } n \text{ Loss Ratio} = \frac{\text{Losses occurring in year } n}{\text{Premium earned in…” |
| Test constancy of the expected loss ratio across accident years by comparing accident year loss ratios (or standardized residuals (A−E)/√E)… | procedure | elsewhere | Stochastic Cape Cod Model: “The standardized residual box plots by accident year were the most revealing. They point to the ass…” |
| The Cape Cod ELR is total reported losses divided by total used-up premium, and expected losses for an accident year equal premium times EL… | formula | tagged | Cape Cod Method: “The ELR is estimated as total reported losses over total *used-up* (on-level, developed) premium ac…” |

</details>

<details><summary><code>cas7-2017-q5</code> · answerable</summary>

Tagged pages: Cape Cod Method, Benktander Method, Maximum Likelihood Estimation, Growth Curve, Process Risk, Prediction Error

| Item | Kind | Status | Where |
|---|---|---|---|
| The loglogistic growth curve G(x) = x^ω/(x^ω+θ^ω) gives the cumulative proportion of ultimate losses paid (or reported) by average age x, w… | definition | tagged | Growth Curve: “$G(x \mid \omega, \theta)$ is a smooth parametric curve, in the form of a cumulative distribution f…” |
| The Cape Cod ELR equals total cumulative losses to date divided by total premium multiplied by G(x) (used-up onlevel premium), summed acros… | formula | tagged | Cape Cod Method: “$$\text{ELR} = \frac{\sum_i C_i}{\sum_i \text{EP}_i \times \tfrac{1}{\text{CDF}_i}}$$” |
| The Cape Cod reserve for an accident year equals (1 - G(x)) × ELR × onlevel premium; if the curve is truncated at age T, use (G(T) - G(x)) … | formula | tagged | Cape Cod Method: “$$\text{IBNR}_i = \text{ELR} \times \text{EP}_i \times \left(1 - \tfrac{1}{\text{CDF}_i}\right)$$” |
| The variance of the Cape Cod total reserve is process variance plus parameter variance, where process variance = scale parameter σ² × total… | formula | tagged | Process Risk: “In [[LDF Curve-Fitting and Stochastic Reserving (Clark - 2003)\\|Clark (2003)]], the process varianc…” |
| The chain ladder (LDF) reserve for an accident year equals the cumulative loss divided by G(x), minus the cumulative loss, i.e., losses × (… | formula | tagged | Growth Curve: “$$\text{LDF}_x = \frac{1}{G(x)}$$” |
| The Benktander method is a credibility weighting of the chain ladder and Cape Cod (expected loss) reserves, with credibility Z = G(x) appli… | fact | tagged | Benktander Method: “The reserve mixes the same way, $R_{\text{GB}} = q\,U_{\text{BF}} = p\,R_{\text{CL}} + q\,R_{\text{…” |
| The Weibull growth curve G(x) = 1 - exp(-(x/θ)^ω) has a lighter tail than the loglogistic, so it reaches full development sooner and suits … | fact | tagged | Growth Curve: “The loglogistic's is heavy: in Clark's example only $77.24\%$ has emerged after ten years, a tail o…” |

</details>

<details><summary><code>cas7-2017-q6</code> · gap</summary>

Tagged pages: Chain Ladder Method, Lognormal Distribution, Confidence Interval, Mack Chain Ladder Model, Unpaid Claim Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The volume-weighted average age-to-age factor for a development period equals the sum of cumulative losses at the later age divided by the … | formula | tagged | Mack Chain Ladder Model: “$\hat f_k = \sum_j C_{j,k+1} / \sum_j C_{jk}$ is [[Unbiasedness\\|unbiased]].” |
| The cumulative development factor to ultimate is the product of the remaining age-to-age factors (with no tail beyond the last age), and th… | procedure | tagged | Chain Ladder Method: “$$\text{IBNR} = U_{\text{AY}} - C_{\text{AY},\,n}$$” |
| For a lognormal reserve with mean R and standard error se, the parameters are sigma^2 = ln(1 + se^2/R^2) and mu = ln(R) - sigma^2/2. | formula | tagged | Mack Chain Ladder Model: “That fit has $\sigma_i^2 = \ln\!\big(1 + \text{s.e.}^2/\hat R_i^2\big)$, and its $z$-[[Percentile\\|…” |
| A lognormal confidence interval at a given level is exp(mu ± z·sigma), where z is the standard normal percentile (e.g. the 90th percentile … | formula | tagged | Mack Chain Ladder Model: “That fit has $\sigma_i^2 = \ln\!\big(1 + \text{s.e.}^2/\hat R_i^2\big)$, and its $z$-[[Percentile\\|…” |
| An empirical-limits confidence interval for ultimate loss applies the minimum and maximum observed individual age-to-age factors for each r… | procedure | missing |  |
| An individual age-to-age factor is an accident year's cumulative loss at one age divided by its cumulative loss at the prior age. | definition | linked | Age to Age Factor: “**Age-to-Age Factor** (link ratio) is the ratio of a cohort's cumulative amount at one maturity to …” |

</details>

<details><summary><code>cas7-2017-q7</code> · answerable</summary>

Tagged pages: Limited Expected Value, Development Factor, Layer Development Factor

| Item | Kind | Status | Where |
|---|---|---|---|
| A volume-weighted average age-to-age development factor is the sum of the later-age cumulative losses divided by the sum of the earlier-age… | formula | tagged | Development Factor: “**Volume-weighted average**: $\Sigma(\text{col }n{+}1) / \Sigma(\text{col }n)$ — gives more credibi…” |
| An age-to-ultimate development factor is the product of the successive age-to-age factors from that age through the last age, times the tai… | formula | linked | Cumulative Development Factor: “\text{CDF}_{n \to \text{ult}} = \left(\prod_{k \ge n} f_{k \to k+1}\right) \times \text{Tail}” |
| In Sahasrabuddhe's method, to put a reported loss triangle on a basic-limit, latest-accident-year cost level, multiply each cell by the rat… | procedure | tagged | Layer Development Factor: “Restate each cell of the triangle, observed in layer $L$, to the basic limit at the latest cost lev…” |
| Compute age-to-age and age-to-ultimate factors from the triangle adjusted to basic limit and latest cost level, using the volume-weighted a… | procedure | tagged | Layer Development Factor: “F^B_{1 \to 2} &= \frac{1{,}020.9 + 1{,}082.2}{744.2 + 787.1}” |
| To convert a basic-limit, current-cost-level age-to-ultimate factor to the triangle's limit and historical cost level, multiply it by the r… | procedure | tagged | Layer Development Factor: “F^{250}_{3,1} &= 1.4518 \times \frac{135.12 / 76.72}{91.79 / 63.21}” |
| The LEV ratios used in the final adjustment must come from the same accident year (the most recent, whose cost level is the target) across … | fact | tagged | Layer Development Factor (collapsed): “F^{250}_{3,1} &= 1.4518 \times \frac{135.12 / 76.72}{91.79 / 63.21}” |

</details>

<details><summary><code>cas7-2017-q8</code> · answerable</summary>

Tagged pages: Coefficient of Variation, Correlation, Internal Systemic Risk, Independent Risk, External Systemic Risk, Risk Margin

| Item | Kind | Status | Where |
|---|---|---|---|
| The three components of internal systemic risk in a balanced scorecard assessment are specification error, parameter selection error, and d… | definition | tagged | Internal Systemic Risk: “**Data error** comes from poor or unavailable data, or inadequate knowledge of the portfolio, inclu…” |
| In a balanced scorecard, a score of 1 is worst practice (highest risk) and 5 is best practice; a worst score for data information quality d… | fact | tagged | Internal Systemic Risk: “$s_r$ is risk indicator $r$'s score from $1$ to $5$ ($5$ is best practice)” |
| Compute a class's overall balanced scorecard score as the weighted average of its indicator scores, with each indicator weighted by the wei… | procedure | tagged | Internal Systemic Risk: “$$\bar s = \frac{\sum_r v_r\,s_r}{\sum_r v_r}$$” |
| Map each class's overall balanced scorecard score to a coefficient of variation using the lookup table of score ranges for that class. | procedure | tagged | Internal Systemic Risk (collapsed): “The CoV scale for this class (the paper's example scale for its long-tail CTP class) is $11.5\%$ fo…” |
| Total internal systemic risk CoV across valuation classes = sqrt(Σi Σj ρij wi wj φi φj), where wi is the class's share of total outstanding… | formula | tagged | Internal Systemic Risk: “$$\mathrm{CoV}_{\text{int}} = \frac{\sqrt{\sum_i\sum_j \rho_{ij}\,(w_i c_i)(w_j c_j)}}{\sum_i w_i}$$” |
| Total CoV of insurance liabilities = sqrt(independent CoV² + internal systemic CoV² + external systemic CoV²), because the three risk sourc… | formula | tagged | Independent Risk: “There are no cross terms, because independent risk is uncorrelated with every other source of uncer…” |
| For a Normal distribution of liabilities, risk margin = z × CoV × mean, where z is the standard normal percentile for the required probabil… | formula | tagged | Risk Margin: “Under a normal distribution the margin is $z_p \times \mathrm{CoV} \times$ the central estimate.” |

</details>

<details><summary><code>cas7-2017-q9</code> · answerable</summary>

Tagged pages: Deductible, Development Factor, Excess Loss Development Factor, Layer of Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| The unlimited age-to-ultimate loss development factor is the product of the unlimited age-to-age factors from the current age through the t… | formula | linked | Cumulative Development Factor: “\text{CDF}_{n \to \text{ult}} = \left(\prod_{k \ge n} f_{k \to k+1}\right) \times \text{Tail}” |
| Siewert's method: the limited LDF at a given limit from age t to ultimate equals the unlimited LDF times the ratio of the limited severity … | formula | tagged | Excess Loss Development Factor: “\text{LDF}^L_t = \text{LDF}_t \times \frac{R^L}{R^L_t}” |
| The limited severity relativity for a layer between a lower and an upper limit is the ratio of the limited severity at the lower limit to t… | definition | tagged | Excess Loss Development Factor: “For a layer between two limits, the relativity becomes a difference, $(R^{L_2} - R^{L_1})/(R^{L_2}_…” |
| Siewert's excess layer LDF equals the LDF limited to the upper limit times (1 − ultimate layer relativity) / (1 − layer relativity at age t… | formula | tagged | Excess Loss Development Factor: “\text{XSLDF}^L_t = \text{LDF}_t \times \frac{1 - R^L}{1 - R^L_t}” |
| Reported loss in a layer between two limits equals reported loss limited to the upper limit minus reported loss limited to the lower limit. | fact | tagged | Layer of Insurance: “X_{(a,b]} = \min(X, b) - \min(X, a)” |
| In the direct development approach, IBNR for a layer equals the layer's reported loss times (layer LDF − 1), applying the layer LDF directl… | procedure | linked | Implied Development Method: “**Direct development** applies an [[Excess Loss Development Factor\\|excess loss development factor]…” |

</details>

<details><summary><code>cas7-2018-q1</code> · gap</summary>

Tagged pages: Bootstrap, Risk Management, ODP Bootstrap Model, Pearson Residual, Parameter Risk

| Item | Kind | Status | Where |
|---|---|---|---|
| Strategic risk is the risk of failing to achieve business objectives from strategy choices, and includes types such as technology, reputati… | definition | linked | Risk Taxonomies: “**Strategic or [[Business Risk\\|business]] risk** — competition, the underwriting cycle, regulation…” |
| Primary causes of P&C insurer impairment and insolvency include deficient loss reserves, inadequate pricing, rapid growth, catastrophe even… | fact | missing |  |
| The discount rate (cost of equity) is computed by CAPM as the risk-free rate plus beta times the equity market risk premium. | formula | elsewhere | Cost of Capital: “$$k_E = r_f + \beta_E\,\bigl(E[r_m] - r_f\bigr)$$” |
| To value an acquisition target with transaction multiples, select comparable transactions with similar ROE, growth rate and discount rate, … | procedure | missing |  |
| In an ODP bootstrap, convert a sampled standardized Pearson residual into a sample incremental claim by inverting the residual formula (inc… | procedure | tagged | ODP Bootstrap Model: “In each iteration, sample a residual for every cell, form the pseudo triangle, cumulate it and reco…” |
| Chain ladder age-to-age factors are volume-weighted (sum of later cumulative over sum of earlier cumulative for accident years with both), … | formula | tagged | ODP Bootstrap Model: “Compute volume-weighted factors and divide the latest diagonal backwards to get the fitted incremen…” |
| For an over-dispersed Poisson distribution, variance equals the scale parameter φ times the mean. | formula | tagged | ODP Bootstrap Model: “drawn from a [[Gamma\\|gamma]] with that mean and variance $\phi\, m^*_{w,d}$, where $\phi$ is the s…” |
| The ODP scale parameter φ equals the sum of squared unscaled Pearson residuals divided by (N − p), or equivalently the sum of squared stand… | formula | tagged | ODP Bootstrap Model: “the scale parameter $\phi = \sum r^2/(N-p)$ with $p = 2n - 1$” |
| Process variance is incorporated in a bootstrap by simulating each future incremental claim from a process distribution (e.g., gamma or ODP… | procedure | tagged | ODP Bootstrap Model: “$$q_{\text{future}}(w,d) \sim \mathrm{Gamma}\left(m^{*}_{w,d},\ \phi\, m^{*}_{w,d}\right)$$” |
| A change in claims settlement rate alters the pattern of payments, raising parameter risk because historical development no longer reflects… | fact | missing |  |
| Internal systemic risk correlation refers to correlation of risk across segments within a company, arising from shared drivers like common … | fact | tagged | Parameter Risk: “*Parameter selection error* is internal systemic risk, also called model specification risk (a [[Mo…” |

</details>

<details><summary><code>cas7-2018-q10</code> · answerable</summary>

Tagged pages: Development Factor, Linear Regression, Chain Ladder Assumptions

| Item | Kind | Status | Where |
|---|---|---|---|
| To test whether a regression coefficient is statistically significant, compare it to its standard error: the coefficient is significant if … | procedure | tagged | Chain Ladder Assumptions: “A factor is usually wanted at least twice its standard deviation (about a 4.5% chance for a Normal …” |
| Fit the regression of incremental loss at the next age on cumulative loss to date, compute fitted values and residuals (actual minus predic… | procedure | tagged | Linear Regression: “$$\hat\beta_1 = \frac{S_{xy}}{S_{xx}} = \frac{400}{250} = 1.6$$” |
| In simple linear regression the standard error of the slope is s_b = sqrt(sum e_i^2 / ((n-2) sum (x_i - xbar)^2)), and the standard error o… | formula | tagged | Chain Ladder Assumptions (collapsed): “\text{sd}(a) &= \sqrt{30{,}333\left(\tfrac15 + \tfrac{2{,}000^2}{2{,}500{,}000}\right)}” |
| The chain ladder (Mack) model assumes that expected incremental loss in the next development period is proportional to loss to date, so tes… | fact | tagged | Chain Ladder Assumptions: “The first says expected emergence is proportional to losses emerged to date: a line through the ori…” |
| The additive (Bornhuetter-Ferguson-type) model assumes expected future incremental loss is independent of loss to date, so it is not affect… | fact | tagged | Chain Ladder Assumptions: “Age-1 emergence is about $2{,}000$ whether a year started at $700$ or $1{,}600$, which the chain la…” |

</details>

<details><summary><code>cas7-2018-q11</code> · answerable</summary>

Tagged pages: Bootstrap, Residual Plot, Heteroscedasticity, ODP Bootstrap Model

| Item | Kind | Status | Where |
|---|---|---|---|
| Heteroscedasticity means the residuals do not share a common (constant) variance across the triangle, e.g. variance differs by development … | definition | tagged | Heteroscedasticity: “**Heteroscedasticity** is non-constant variance among a model's [[Residual\\|residuals]]. In a reser…” |
| The GLM bootstrap assumes residuals are independent and identically distributed, so with heteroscedasticity residuals cannot be sampled fre… | fact | tagged | Heteroscedasticity: “The [[ODP Bootstrap Model\\|ODP bootstrap]] assumes the opposite, homoscedasticity: that the standar…” |
| To test for heteroscedasticity by development period, compare the variance/standard deviation/spread of residuals (e.g. via residual plot b… | procedure | tagged | Heteroscedasticity: “- **Detecting it.** A [[Residual Plot\\|residual graph]] by development period shows it: the residua…” |
| Stratified sampling adjusts for heteroscedasticity by grouping development periods whose residuals have similar variance and sampling resid… | procedure | tagged | Heteroscedasticity: “*Stratified sampling* draws each group's residuals only from that group. It is simple, but a small …” |
| The hetero-adjustment approach groups residuals with similar variance, multiplies each group's standardized residuals by a hetero factor (o… | procedure | tagged | Heteroscedasticity: “$h_i$ is group $i$'s hetero-adjustment factor: the standard deviation of all the residuals over tha…” |

</details>

<details><summary><code>cas7-2018-q12</code> · untagged</summary>

Tagged pages: Model Risk, PP Plot, Internal Systemic Risk, Risk Margin

| Item | Kind | Status | Where |
|---|---|---|---|
| Specification error is the internal systemic risk that the chosen model structure cannot fully capture the complexity of the insurance proc… | definition | tagged | Internal Systemic Risk: “**Specification error** is the inability to build a model fully representative of the insurance pro…” |
| Parameter selection error is the internal systemic risk that the selected parameters, predictors and their trends do not match the true par… | definition | tagged | Internal Systemic Risk: “**Parameter selection error** arises because the model cannot adequately measure all the predictors…” |
| A retrospective test compares actual emergence to the model's predicted distribution by finding the percentile of each actual outcome in th… | procedure | tagged | PP Plot: “Each of $n$ triangles is fitted with its outcome held back, and the [[Percentile\\|percentile]] of t…” |
| If the model is well calibrated, the percentile histogram of actual outcomes is approximately uniform; mass concentrated in low percentiles… | fact | tagged | PP Plot: “**Below the $45^\circ$ line throughout**: outcomes pile into the low percentiles, so the model pred…” |
| A model fit without adjustment to a short experience period containing a rare, large catastrophe event overstates expected losses in period… | fact | elsewhere | Model Validation: “Training error always falls as flexibility rises, while validation error turns up once the model st…” |

</details>

<details><summary><code>cas7-2018-q13</code> · gap</summary>

Tagged pages: Bootstrap, Generalized Linear Model, ODP Bootstrap Model

| Item | Kind | Status | Where |
|---|---|---|---|
| The log-link GLM bootstrap cannot handle negative incremental values (logs of zero or negative cells are undefined), so it needs adjustment… | fact | tagged | ODP Bootstrap Model: “Negative incremental values use $\sqrt{\\|m\\|}$, and a negative future mean is simulated as $-\mathr…” |
| The GLM bootstrap has practical limitations: parameters must be re-solved at every bootstrap iteration (computationally intensive), it uses… | fact | tagged | ODP Bootstrap Model: “The residuals must be independent and identically distributed, but need not be normal, so their ske…” |
| Convert cumulative reported loss to cumulative paid loss by subtracting case reserves, where case reserves equal the number of open claims … | procedure | elsewhere | Paid Losses: “$$\text{Reported Losses} = \text{Paid Losses} + \text{Case Reserves}$$” |
| Convert a cumulative paid triangle to incremental paid by differencing successive maturities in each accident year. | procedure | missing |  |
| For a log-link GLM, the response triangle is built by taking the natural log of each incremental paid cell, which is then used to solve for… | procedure | missing |  |
| In the log-link GLM, the log of expected incremental loss for accident year i and development period j is ln q(i,j) = alpha_i + sum of beta… | formula | linked | Over-Dispersed Poisson Model: “In the log-link form of [[Using the ODP Bootstrap Model (Shapland - 2016)\\|Shapland's]] formula 3.7…” |

</details>

<details><summary><code>cas7-2018-q14</code> · gap</summary>

Tagged pages: Reinsurance, Loss Reserving, Reinsurance Reserving

| Item | Kind | Status | Where |
|---|---|---|---|
| Reinsurers typically learn of a claim only once it pierces the reinsurance layer, so a primary claims person who reserves to a low modal va… | fact | tagged | Reinsurance Reserving: “Claims reach the reinsurer only after the cedant has reported and assessed them. Excess claims arri…” |
| Reserving a potentially serious claim to the mode (which is low because most claims are small) consistently under-reserves loss and ALAE, a… | fact | missing |  |
| Heterogeneous reinsurance exposures make industry statistics (e.g., Schedule P benchmarks) of limited use for reserving because they are to… | fact | tagged | Reinsurance Reserving: “External patterns such as RAA data help but mix unlike contracts.” |
| Traditional reserving methods require homogeneous data groups, but splitting heterogeneous reinsurance data into homogeneous groups reduces… | fact | tagged | Reinsurance Reserving: “Credibility limits how far it can be taken.” |
| Diverse coding and handling requirements for heterogeneous reinsurance business strain data coding and IT systems, causing backlogs and pro… | fact | missing |  |

</details>

<details><summary><code>cas7-2018-q15</code> · untagged</summary>

Tagged pages: Bayesian, Chain Ladder Method, Over-Dispersed Negative Binomial Model, Actuarial Assumptions

| Item | Kind | Status | Where |
|---|---|---|---|
| Increased claims staffing lets adjusters set more adequate case reserves sooner, which speeds up reporting/case incurred development so tha… | fact | linked | Case Adequacy: “**Strengthening** raises reported losses immediately, so recent age-to-age factors fall (more of th…” |
| When a change in operations shifts the development pattern, use expert opinion to override the selected link ratios or LDFs for affected di… | procedure | tagged | Over-Dispersed Negative Binomial Model: “If a change in settlement makes an older factor wrong for recent rows, those rows share a separate …” |
| In the chain-ladder method, applying LDFs that are higher than the true future development overstates IBNR, while applying LDFs that are to… | fact | tagged | Chain Ladder Method: “$$\text{IBNR} = U_{\text{AY}} - C_{\text{AY},\,n}$$” |
| Catastrophe losses have different frequency, severity and reporting/development patterns from non-catastrophe (attritional) losses, so comb… | fact | elsewhere | Catastrophe Loss: “In **reserving**, catastrophe claims are triangulated separately: they report fast and settle in a …” |
| Handle catastrophe exposure by analyzing cat and non-cat losses separately, using a catastrophe model or a cat load to estimate reserves fo… | procedure | linked | Loss Reserving: “separate treatment of [[Large Loss\\|large]] and [[Catastrophe Loss\\|catastrophe]] claims” |
| A large claim that develops downward (favorable settlement) creates negative development in the triangle at that age, depressing the age-to… | fact | linked | Age to Age Factor: “Salvage and subrogation recoveries, conservative initial case reserving, and claims closing below t…” |
| Treat an anomalous large loss as an outlier by removing it from the triangle used to compute age-to-age factors, so that it does not distor… | procedure | linked | Large Loss: “the actuary may exclude large claims from the initial projection, then add back a case-specific pro…” |

</details>

<details><summary><code>cas7-2018-q16</code> · answerable</summary>

Tagged pages: Cape Cod Method, Reinsurance, Credibility, Reasonableness Testing

| Item | Kind | Status | Where |
|---|---|---|---|
| Used-up premium for an accident year is its rate-level adjusted (on-level) premium multiplied by the percent reported (reporting lag) at th… | definition | tagged | Cape Cod Method: “**Used-up premium** $\text{EP}_i / \text{CDF}_i$ is the share of each year's premium "exposed" to t…” |
| The Stanard-Bühlmann (Cape Cod) expected loss ratio is total reported losses divided by total used-up premium across accident years. | formula | tagged | Cape Cod Method: “$$\text{ELR} = \frac{\sum_i C_i}{\sum_i \text{EP}_i \times \tfrac{1}{\text{CDF}_i}}$$” |
| Stanard-Bühlmann IBNR for an accident year equals premium × ELR × (1 − percent reported). | formula | tagged | Cape Cod Method: “$$\text{IBNR}_i = \text{ELR} \times \text{EP}_i \times \left(1 - \tfrac{1}{\text{CDF}_i}\right)$$” |
| Chain ladder IBNR equals reported loss divided by percent reported, minus reported loss (i.e., reported × (1 − p)/p). | formula | tagged | Reasonableness Testing: “chain ladder IBNR is its ultimate times $1 - p_t$” |
| Credibility-weight the chain ladder and Stanard-Bühlmann IBNR estimates using Z equal to a selected credibility factor multiplied by the pe… | procedure | tagged | Credibility: “$$\text{Estimate} = Z \times \text{Experience} + (1 - Z) \times \text{Complement}$$” |
| Expected loss emergence over a period is the IBNR estimate times the incremental percent reported during the period divided by the percent … | procedure | tagged | Reasonableness Testing: “$$\text{Expected emergence} = \text{IBNR} \times \frac{p_{t+\Delta} - p_t}{1 - p_t}$$” |
| Actual emergence is the change in aggregate reported loss between evaluation dates, and it is compared with the expected emergence by takin… | procedure | tagged | Reasonableness Testing (collapsed): “Emergence ran $900$ above expectation.” |
| Actual emergence can differ from expected because of random fluctuation or large losses, or because of changes in claim reporting or case r… | fact | linked | Chain Ladder Method: “A [[Large Loss\\|shock loss]] reported early is multiplied by the full CDF.” |

</details>

<details><summary><code>cas7-2018-q17</code> · answerable</summary>

Tagged pages: Retrospective Rating, PDLD Ratio, Retrospective Premium Reserve

| Item | Kind | Status | Where |
|---|---|---|---|
| The paid (retro premium) development to loss development (PDLD) ratio for a retro adjustment period is the incremental change in retrospect… | definition | tagged | PDLD Ratio: “For each retro adjustment it is the premium developed in that adjustment divided by the loss develo…” |
| The cumulative PDLD (CPDLD) ratio for an adjustment period is the expected premium development per unit of loss emergence from that period … | definition | tagged | Retrospective Premium Reserve: “$\text{CPDLD}_k$ averages the PDLDs from adjustment $k$ onward, weighted by the expected loss emerg…” |
| The CPDLD ratio at a given adjustment is the sum of each remaining period's PDLD ratio times its percentage of ultimate loss emerging, divi… | formula | tagged | PDLD Ratio: “$$\text{CPDLD}_k = \frac{\sum_{n \ge k} \text{PDLD}_n \, \Delta\%L_n}{\sum_{n \ge k} \Delta\%L_n}$$” |
| Expected future retro premium for a policy year equals expected future loss emergence (ultimate loss minus losses reported at the prior ret… | procedure | tagged | Retrospective Premium Reserve: “$$\text{Ult. premium} = P_{\text{last adj.}} + \text{CPDLD}_k \times \text{Future loss emergence}$$” |
| The retro premium asset equals estimated ultimate retro premium (expected future premium plus premium booked at the prior adjustment) minus… | formula | tagged | Retrospective Premium Reserve: “$$\text{Premium asset} = \text{Expected ultimate premium} - \text{Premium booked}$$” |
| Policy years that have not yet reached their first retro adjustment (no prior adjustment losses or premium) use the first-adjustment CPDLD … | fact | tagged | Retrospective Premium Reserve (collapsed): “\text{Ult}_A &= 1.3427 \times 10.0” |
| PDLD ratios decline with later adjustment periods because more losses hit per-accident/occurrence loss caps (limits) so added losses genera… | fact | tagged | PDLD Ratio: “They are usually **well below 1**, as more new loss lands above the caps.” |
| PDLD ratios decline with later adjustment periods because the first period includes basic premium (expense loads) charged once, and as retr… | fact | tagged | Retrospective Rating: “every dollar of loss inside the band costs the insured $\text{LCF} \times \text{TM}$ dollars of pre…” |

</details>

<details><summary><code>cas7-2018-q2</code> · untagged</summary>

Tagged pages: Deductible, Limited Expected Value, Excess Loss Development Factor, Implied Development Method, Excess Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| Modeled excess IBNR equals reported excess loss times the excess age-to-ultimate factor minus reported excess loss, i.e. reported excess × … | formula | tagged | Implied Development Method (collapsed): “\text{IBNR}^{XS} &= 200(5.000) - 200” |
| The loss ratio (expected loss / Bornhuetter-Ferguson style) approach estimates excess IBNR as expected ultimate excess loss (premium or exp… | formula | tagged | Implied Development Method: “\text{IBNR}^{XS} &= 800 \times (1 - 1/5.000)” |
| Expected ultimate excess loss from fitted limited severities equals (unlimited ultimate severity − limited ultimate severity at the deducti… | formula | tagged | Excess Insurance: “E[Y] = E[X \wedge (a + l)] - E[X \wedge a]” |
| The excess age-to-ultimate factor can be derived from the unlimited LDF and limited-to-unlimited severity ratios R: XS LDF = unlimited LDF … | formula | tagged | Excess Loss Development Factor: “\text{XSLDF}^L_t = \text{LDF}_t \times \frac{1 - R^L}{1 - R^L_t}” |
| Reasonability of the modeled excess IBNR is assessed by comparing it to the loss ratio approach IBNR; a large disagreement (e.g. a modeled … | fact | tagged | Excess Loss Development Factor: “Because $1 - R^L_t$ is small, a small error in the relativity becomes a large error in the excess f…” |
| Limited severity data at later ages is based on claim counts that are not fully developed; at 36 months claim counts still develop (count L… | fact | elsewhere | Severity: “This is why average severity triangles are often built on a [[Report Year]] basis, where the count …” |

</details>

<details><summary><code>cas7-2018-q3</code> · untagged</summary>

Tagged pages: Credibility, Credible Loss Ratio Reserve, Prediction Error

| Item | Kind | Status | Where |
|---|---|---|---|
| In the Bayesian/credibility (Hurlimann) loss ratio reserving framework, the MSE of a reserve estimate with credibility Z is E[α²(U)] × q² ×… | formula | tagged | Credible Loss Ratio Reserve: “$$\mathrm{mse}(R_i^c) = E[\alpha_i^2(U_i)]\left(\frac{Z_i^2}{p_i} + \frac{1}{q_i} + \frac{(1 - Z_i)…” |
| The individual loss ratio method uses credibility Z = 1 (estimate based only on the accident year's own loss experience), and the collectiv… | definition | tagged | Credible Loss Ratio Reserve: “$Z_i = 1$ gives $\mathrm{mse}(R_i^{ind}) = E[\alpha_i^2]\,q_i/p_i$ and $Z_i = 0$ gives $\mathrm{mse…” |
| Estimate the incremental expected paid loss per unit of premium for each development period as the sum of incremental paid losses at that a… | procedure | tagged | Credible Loss Ratio Reserve: “$m_k$ is the **incremental loss ratio** of development period $k$: the paid claims $S_{ik}$ of that…” |
| The loss ratio payout factor p for an accident year is the cumulative share of the ultimate expected loss ratio paid to date (sum of increm… | definition | tagged | Credible Loss Ratio Reserve: “$p_i = \sum_{k \le n-i+1} m_k \big/ \sum_k m_k$ is the **loss ratio payout factor**, the expected s…” |
| The expected ultimate loss ratio equals the sum of the incremental loss ratios across all development periods, with no development after th… | fact | tagged | Credible Loss Ratio Reserve: “$\sum_k m_k$ is the expected loss ratio.” |
| The method with the lower mean squared error is the preferable estimator; if the MSEs are nearly equal, the methods are about equally good. | fact | elsewhere | Mean Square Error (collapsed): “For $n > 1$, $\text{MSE}(\hat{\sigma}^2) < \text{MSE}(S^2)$, so the biased MLE has smaller MSE desp…” |

</details>

<details><summary><code>cas7-2018-q4</code> · answerable</summary>

Tagged pages: Loss Development, Linear Regression, Least Squares Development Method

| Item | Kind | Status | Where |
|---|---|---|---|
| In the least squares method for loss development (Y = a + bX, with X as incurred loss ratio at an earlier age and Y as ultimate/later-age l… | formula | tagged | Least Squares Development Method: “$$b = \frac{\overline{xy} - \bar{x}\,\bar{y}}{\overline{x^2} - \bar{x}^2}$$” |
| The fitted least squares line passes through the point of sample means (mean X, mean Y), so mean(Y) = a + b·mean(X) and the intercept a = m… | fact | tagged | Least Squares Development Method: “$$a = \bar{y} - b\,\bar{x}$$” |
| The sample mean of X² is the average of the squared observations, which differs from the square of the sample mean; their difference is the… | definition | tagged | Least Squares Development Method: “Bars are averages over the prior years, so $\overline{xy}$ is the mean of the products and $\overli…” |
| To project ultimate loss with the least squares method, compute the current year's X as incurred loss divided by earned premium, predict th… | procedure | tagged | Least Squares Development Method: “estimates a later value $y$ of an accident year's losses from its current value $x$ with a straight…” |

</details>

<details><summary><code>cas7-2018-q5</code> · gap</summary>

Tagged pages: Benktander Method, Bornhuetter-Ferguson Method

| Item | Kind | Status | Where |
|---|---|---|---|
| The Bornhuetter-Ferguson ultimate equals losses to date plus the expected loss (premium times initial expected loss ratio) times the percen… | formula | tagged | Bornhuetter-Ferguson Method: “$$U_{\text{BF}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) \times U_{0}$$” |
| The Benktander ultimate equals losses to date plus the BF ultimate (used as the prior estimate of ultimate) times the percent unreported (1… | formula | tagged | Benktander Method: “$$U_{\text{GB}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) U_{\text{BF}}$$” |
| To obtain the cumulative development factor from a later age to ultimate, divide the cumulative factor from the earlier age to ultimate by … | procedure | linked | Chain Ladder Method (collapsed): “\text{CDF}_{12} &= 1.500 \times 1.265 = 1.898” |
| Cumulative paid loss at the next evaluation equals the prior cumulative paid plus incremental paid in the period, and the BF and Benktander… | fact | missing |  |
| The Benktander ultimate exceeds the BF ultimate when the chain ladder ultimate exceeds the BF ultimate, i.e. when actual reported/paid loss… | fact | tagged | Benktander Method: “Whichever of $U_{\text{CL}}$ and $U_{\text{BF}}$ is larger, $U_{\text{GB}}$ lies between them.” |
| The BF method's IBNR/unpaid estimate depends only on the a priori expected loss and development pattern and ignores actual claim emergence … | fact | tagged | Bornhuetter-Ferguson Method: “BF does not respond to bad news. If emergence runs far ahead of the a priori, BF holds most of its …” |

</details>

<details><summary><code>cas7-2018-q6</code> · untagged</summary>

Tagged pages: Cape Cod Method, Maximum Likelihood Estimation, Growth Curve, Process Risk, Parameter Risk

| Item | Kind | Status | Where |
|---|---|---|---|
| In the Cape Cod (and Bornhuetter-Ferguson style) reserve framework, the estimated reserve for an accident year equals onlevel premium times… | formula | tagged | Cape Cod Method: “$$\text{IBNR}_i = \text{ELR} \times \text{EP}_i \times \left(1 - \tfrac{1}{\text{CDF}_i}\right)$$” |
| Under the loglogistic growth function G(x) = x/(x+θ), where x is the average age of paid losses in months, the proportion unpaid is 1 – G(x… | formula | tagged | Growth Curve: “$$\text{Loglogistic: } G(x) = \frac{x^{\omega}}{x^{\omega} + \theta^{\omega}}$$” |
| The Cape Cod expected loss ratio is the total cumulative paid (or reported) loss divided by total used-up premium, where used-up premium fo… | definition | tagged | Cape Cod Method: “The ELR is estimated as total reported losses over total *used-up* (on-level, developed) premium ac…” |
| To test whether a single constant ELR suits all accident years, convert each year's G(x) into an implied ultimate loss (paid / G(x)) or use… | procedure | elsewhere | Generalized Cape Cod Method (collapsed): “The used-up premiums are 7,272.7, 6,720.0, 5,500.0 and 3,680.0, and the developed loss ratios are 8…” |
| Cape Cod assumes the same expected loss ratio for all accident years; a systematic trend in implied loss ratios across years violates this … | fact | elsewhere | Generalized Cape Cod Method: “Cape Cod assumes one trended, on-level ratio holds for every year.” |
| Process variance is the variance from the inherent randomness of the insurance loss process, while parameter variance is the uncertainty ar… | definition | tagged | Process Risk: “**Process risk** is the variability of actual outcomes around their expected value that would remai…” |
| Parameter variance can be reduced by using a model with fewer parameters (e.g., Cape Cod rather than a method with a separate parameter per… | fact | tagged | Parameter Risk: “Replacing the ultimates with one Cape Cod ELR leaves 3 parameters, and the parameter standard devia…” |

</details>

<details><summary><code>cas7-2018-q7</code> · answerable</summary>

Tagged pages: Chain Ladder Method, Development Factor, Mack Chain Ladder Model, Chain Ladder Assumptions

| Item | Kind | Status | Where |
|---|---|---|---|
| In Mack's chain ladder model, the variance of the next incremental loss is assumed proportional to c^(2-α) of the cumulative loss to date, … | fact | tagged | Mack Chain Ladder Model: “it weights the individual factors by $C_{jk}$, which gives the [[Minimum Variance\\|minimum-variance…” |
| When the variance of the next incremental loss is constant at a development age (α=2), the Mack LDF is the least squares estimate f_k = Σ c… | formula | tagged | Chain Ladder Assumptions: “A constant $a$ gives $\sum c\,q/\sum c^2$ ([[Mack Chain Ladder Model]]). Here $f(d)$ is the *increm…” |
| When the variance of the next incremental loss is proportional to losses reported to date (α=1), the Mack LDF is the volume-weighted averag… | formula | tagged | Mack Chain Ladder Model: “$\hat f_k = \sum_j C_{j,k+1} / \sum_j C_{jk}$ is [[Unbiasedness\\|unbiased]].” |
| When the variance of the next incremental loss is proportional to the square of losses reported to date (α=0), the Mack LDF is the simple a… | formula | tagged | Development Factor: “**Simple average**: unweighted mean of all individual year factors — treats each accident year equa…” |
| Project ultimate loss by multiplying the latest cumulative loss by the product of the selected age-to-age factors from the current age to u… | procedure | tagged | Chain Ladder Method: “**The procedure:** build the cumulative [[Development Triangle\\|triangle]] → compute [[Age to Age F…” |
| To test Mack's variance assumption, compute weighted residuals (c_{i,k+1} − f_k·c_{i,k}) divided by c_{i,k}^(α/2)-type weights (no division… | procedure | tagged | Chain Ladder Assumptions: “The model is linear: no runs of same-signed [[Residual\\|residuals]] against $c(w,d)$.” |
| The variance assumption whose weighted residual plot looks most random (scattered around zero with no trend or pattern) is the most reasona… | fact | tagged | Development Factor: “**Volume-weighted average**: $\Sigma(\text{col }n{+}1) / \Sigma(\text{col }n)$ — gives more credibi…” |

</details>

<details><summary><code>cas7-2018-q8</code> · answerable</summary>

Tagged pages: Chain Ladder Method, Development Factor, Hypothesis Testing, Development Factor Correlation Test, Mack Chain Ladder Model

| Item | Kind | Status | Where |
|---|---|---|---|
| The chain ladder method assumes that age-to-age development factors in subsequent development columns are uncorrelated (the assumption of n… | fact | tagged | Development Factor Correlation Test: “Under Mack's assumption $E(C_{i,k+1} \mid C_{i1}, \dots, C_{ik}) = C_{ik}f_k$, the expected next fa…” |
| To compute Spearman's rank correlation between two adjacent columns of development factors, rank the factors in each column across accounti… | procedure | tagged | Development Factor Correlation Test: “$r_{ik}$ ranks the $I-k$ factors $C_{i,k+1}/C_{ik}$ of column $k$. $s_{ik}$ ranks the preceding fac…” |
| The overall test statistic T for the triangle is the weighted average of the column-pair Spearman coefficients T_k, with weights equal to n… | formula | tagged | Development Factor Correlation Test: “$$T = \frac{\sum_{k=2}^{I-2}(I-k-1)\,T_k}{\sum_{k=2}^{I-2}(I-k-1)}$$” |
| Under the null hypothesis of no correlation, E(T) = 0 and Var(T) = 1 / [(I-2)(I-3)/2], where I is the number of accident years (rows) in th… | formula | tagged | Development Factor Correlation Test: “$$\text{Var}(T) = \frac{1}{(I-2)(I-3)/2}$$” |
| Form the confidence interval for T under the null as ± z·√Var(T), using the standard normal quantile z for the chosen confidence level (e.g… | procedure | tagged | Development Factor Correlation Test: “Mack uses a **50%** interval: reject if $\\|T\\| > 0.67\sqrt{\text{Var}(T)}$.” |
| Testing the triangle as a whole rather than each pair of columns separately avoids accumulating error probabilities (testing many pairs mak… | fact | linked | Calendar Year Effect: “The triangle is tested as a whole to avoid accumulating error probabilities.” |
| What matters for reserving is whether correlation prevails across the triangle as a whole (since the whole triangle is used for projection … | fact | tagged | Development Factor Correlation Test: “checks whether a triangle's development factors are correlated across ages” |

</details>

<details><summary><code>cas7-2018-q9</code> · gap</summary>

Tagged pages: Development Factor, Chain Ladder Method, Changing Settlement Rate Model, Correlated Chain Ladder Model, Chain Ladder Assumptions

| Item | Kind | Status | Where |
|---|---|---|---|
| One testable implication of the chain ladder assumptions is that age-to-age factors are stable over time, with no trend or shift in level a… | fact | tagged | Chain Ladder Method: “- **The pattern is stable over calendar time.** Violated by a change in [[Case Adequacy\\|case adequ…” |
| A trend or shift in the level of age-to-age factors in recent accident years (seen in a plot or moving average) indicates instability and m… | fact | linked | Age to Age Factor: “Look at the column **before** averaging it. A steady column supports a volume-weighted all-year sel…” |
| When age-to-age factors are unstable, improve the selected factor by using only recent diagonals or accident years (e.g., a 5-year weighted… | procedure | tagged | Development Factor: “- **Latest-$k$-year average**: uses only the most recent $k$ accident years — reduces the influence…” |
| Alternative remedies for unstable development factors include adjusting the data for systematic changes (e.g., Berquist-Sherman), fitting a… | procedure | linked | Age to Age Factor: “- **Judgmental selection**, documented — the honest answer when the column contains a known one-off.” |
| Test stability of development factors by plotting residuals against time; strings of positive and negative residuals indicate the factors a… | procedure | tagged | Chain Ladder Assumptions: “The factor is stable: no such runs against time.” |
| A state-space model tests stability by comparing the volatility of observations around the mean with the volatility of the mean itself over… | procedure | missing |  |
| Stability can also be assessed by looking for changes in claim settlement rates, measured as the percentage of claims closed by age. | procedure | linked | Settlement Rate: “$$\text{Disposal Rate}_n = \frac{\text{Closed claims at age } n}{\text{Ultimate claim counts}}$$” |

</details>

<details><summary><code>cas7-2019-q1</code> · gap</summary>

Tagged pages: Bayesian, Credibility, Salvage and Subrogation, Bayesian Bornhuetter-Ferguson Model, Over-Dispersed Poisson Model, Parameter Risk

| Item | Kind | Status | Where |
|---|---|---|---|
| The mean and variance of a gamma distribution with parameters alpha and beta are alpha/beta and alpha/beta^2; a larger beta (with the mean … | formula | tagged | Bayesian Bornhuetter-Ferguson Model: “$\mathrm{Var}(x_i) = \frac{M_i}{\beta_i}$” |
| In the Bayesian (Bornhuetter-Ferguson/chain ladder credibility) model, a smaller prior variance (higher beta) lowers the credibility Z give… | fact | tagged | Bayesian Bornhuetter-Ferguson Model: “For a given $M_i$, a larger $\beta_i$ is a smaller prior variance and more certainty about $M_i$. T…” |
| Compute incremental age-to-age chain ladder factors as volume-weighted sums of later cumulative over earlier cumulative losses from the tri… | procedure | tagged | Bayesian Bornhuetter-Ferguson Model: “$y_k$ is the share of ultimate emerging in period $k$, so $\sum_{k<j} y_k = 1/(\lambda_j\cdots\lamb…” |
| The credibility factor Z_ij = sum of y_k (k<j) / (beta_i*phi + sum of y_k (k<j)), where the sum of y_k is the cumulative percent paid at th… | formula | tagged | Bayesian Bornhuetter-Ferguson Model: “Z_{ij} = \frac{\sum_{k=1}^{j-1} y_k}{\beta_i\,\phi + \sum_{k=1}^{j-1} y_k}” |
| Estimate expected incremental losses by weighting the chain ladder incremental estimate (lambda-1)*D_{i,j-1} with the Bornhuetter-Ferguson-… | procedure | tagged | Bayesian Bornhuetter-Ferguson Model: “Z_{ij}\,(\lambda_j - 1)\,D_{i,j-1} … (1 - Z_{ij})\,(\lambda_j - 1)\,\frac{M_i}{\lambda_j\lambda_{j+…” |
| Model risk is the risk that the chosen model (distributional form, prior, or credibility procedure) does not correctly reflect the underlyi… | definition | tagged | Parameter Risk: “*Parameter selection error* is internal systemic risk, also called model specification risk (a [[Mo…” |
| Estimation risk (parameter risk) is the risk that the model's parameters are estimated imprecisely from limited or unrepresentative data. | definition | tagged | Parameter Risk: “**Parameter risk** is the uncertainty in a reserve that comes from not knowing the model's paramete…” |
| In Bühlmann-Straub-style Bayesian credibility for a ratio such as percent recovered, VHM = (E[percent])^2-type variance of the hypothetical… | formula | tagged | Credibility: “$K = \text{EPV}/\text{VHM}$ — expected value of the process variance over the variance of the hypot…” |
| Estimate ultimate recoveries from data to date by dividing the amount recovered to date by the expected percent received at that age (gross… | procedure | tagged | Bayesian Bornhuetter-Ferguson Model: “$y_k$ is the share of ultimate emerging in period $k$, so $\sum_{k<j} y_k = 1/(\lambda_j\cdots\lamb…” |
| Unpaid losses net of S&S equal unpaid gross losses minus expected unrecovered future S&S recoveries (ultimate S&S less S&S already received… | fact | tagged | Salvage and Subrogation: “\text{Net Ultimate} = \text{Gross Ultimate} - \text{S\&S Ultimate}” |
| Operational risk is the risk of loss from inadequate or failed internal processes, people, systems or external events (such as vendor relia… | definition | missing |  |

</details>

<details><summary><code>cas7-2019-q10</code> · gap</summary>

Tagged pages: Bootstrap, Bornhuetter-Ferguson Method, ODP Bootstrap Model, Heteroscedasticity, Pearson Residual

| Item | Kind | Status | Where |
|---|---|---|---|
| Standardized Pearson residuals in a GLM are (actual − fitted incremental loss) divided by the square root of the fitted value (scaled by a … | definition | tagged | Pearson Residual: “**Pearson Residual** is an actual incremental loss minus its fitted value, divided by the standard …” |
| Bootstrap residuals must be identically distributed (same variance) for random resampling to be valid; if residual standard deviations diff… | fact | tagged | Heteroscedasticity: “The [[ODP Bootstrap Model\\|ODP bootstrap]] assumes the opposite, homoscedasticity: that the standar…” |
| The heteroscedasticity adjustment factor for a group is h_i = (overall standard deviation of residuals) / (standard deviation of residuals … | formula | tagged | Heteroscedasticity: “$h_i$ is group $i$'s hetero-adjustment factor: the standard deviation of all the residuals over tha…” |
| When a residual is sampled and placed into a cell, first undo the sampled residual's group adjustment by dividing by the h of the cell's de… | procedure | tagged | Heteroscedasticity: “Dividing a sampled $r^*$ by the $h_i$ of the cell being simulated puts that group's variance back.” |
| A sampled incremental loss is the fitted incremental loss plus the residual times the square root of the fitted incremental loss (q* = m + … | formula | tagged | ODP Bootstrap Model: “$$q^{*}(w,d) = r^{*}\sqrt{m_{w,d}} + m_{w,d}$$” |
| Sample the expected loss (a priori ultimate) for a stochastic BF by using a random number against the given cumulative distribution functio… | procedure | missing |  |
| The age-to-ultimate CDF is the product of the age-to-age factors (computed from the fitted or sampled cumulative triangle) and the tail fac… | formula | tagged | Bornhuetter-Ferguson Method: “and $1 - 1/\text{CDF}$ the percentage unreported from the [[Development Triangle\\|development patte…” |
| The Bornhuetter-Ferguson reserve equals expected ultimate loss × (1 − 1/CDF); the total reserve is the sum over accident years, and the ran… | formula | tagged | Bornhuetter-Ferguson Method: “$$U_{\text{BF}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) \times U_{0}$$” |

</details>

<details><summary><code>cas7-2019-q11</code> · answerable</summary>

Tagged pages: Bayesian, Chain Ladder Method, Bornhuetter-Ferguson Method, Bayesian Bornhuetter-Ferguson Model, Correlated Chain Ladder Model

| Item | Kind | Status | Where |
|---|---|---|---|
| The Bayesian ultimate loss estimate (Meyers) is a credibility-weighted average of the chain ladder ultimate and the Bornhuetter-Ferguson ul… | formula | tagged | Bayesian Bornhuetter-Ferguson Model: “So the same $Z$ blends the chain ladder and BF *reserves* for the whole accident year.” |
| The credibility for the Bayesian ultimate is Z = p / (p + β·φ), where p is the percent of ultimate reported (incurred losses divided by cha… | formula | tagged | Bayesian Bornhuetter-Ferguson Model: “$$Z_{ij} = \frac{\sum_{k=1}^{j-1} y_k}{\beta_i\,\phi + \sum_{k=1}^{j-1} y_k}$$” |
| A larger variance of the prior distribution of expected ultimate losses (smaller β) gives more credibility to the chain ladder estimate, so… | fact | tagged | Bayesian Bornhuetter-Ferguson Model: “For a given $M_i$, a larger $\beta_i$ is a smaller prior variance and more certainty about $M_i$. T…” |
| For a gamma prior with parameters α and β, the variance is α/β², so for a given α a larger β implies a smaller prior variance. | fact | tagged | Bayesian Bornhuetter-Ferguson Model: “$$E[x_i] = M_i = \frac{\alpha_i}{\beta_i}$$ … $$\mathrm{Var}(x_i) = \frac{M_i}{\beta_i}$$” |
| In the correlated chain ladder model, the log mean ultimate for accident year w is μ_w = α_w + β_d (with the development-period term) + ρ·(… | formula | tagged | Correlated Chain Ladder Model: “Each year's log mean moves by $\rho$ times the previous year's deviation from its own log mean.” |
| The correlated chain ladder model incorporates correlation between accident years (via ρ) and has been shown (Meyers) to accurately describ… | fact | tagged | Correlated Chain Ladder Model: “Meyers concludes that the CCL predicts the distribution of incurred outcomes correctly within the s…” |
| The Bayesian method can incorporate expert opinion (an informative prior) and produces a full predictive distribution of outcomes in additi… | fact | tagged | Bayesian Bornhuetter-Ferguson Model: “The row parameters $x_i$ of the [[Over-Dispersed Poisson Model\\|over-dispersed Poisson]] model, eac…” |

</details>

<details><summary><code>cas7-2019-q12</code> · answerable</summary>

Tagged pages: Generalized Linear Model, Tweedie Distribution, Chain Ladder Method, Over-Dispersed Poisson Model, GLM Loss Reserving

| Item | Kind | Status | Where |
|---|---|---|---|
| In an exponential dispersion family, θ is the canonical (location) parameter, related to the mean by θ = (b')^{-1}(μ). | definition | linked | Exponential Family: “$\theta$ is the **canonical parameter**, $\phi$ the [[Dispersion Parameter]], $b(\theta)$ the cumul…” |
| In an exponential dispersion family, b(θ) is the cumulant function, whose first derivative gives the mean (μ = b'(θ)) and whose second deri… | definition | linked | Exponential Family: “$$E[Y] = b'(\theta) = \mu, \qquad \text{Var}(Y) = a(\phi)\,b''(\theta) = \phi\,V(\mu)$$” |
| The Tweedie sub-family is obtained from the EDF by restricting the variance function to the power form V(μ) = μ^p with p ≤ 0 or p ≥ 1 (no v… | fact | tagged | Tweedie Distribution: “The **Tweedie Distribution** is the [[Exponential Family]] member whose variance is a power of the …” |
| In the Tweedie family a larger power p gives larger variance and a heavier tail (p=2 gamma, p=3 inverse Gaussian), so a heavy-tailed exposu… | fact | tagged | GLM Loss Reserving: “**Choosing the model** means choosing the error distribution (a larger Tweedie $p$ for a heavier ta…” |
| A Tweedie GLM with p = 1 (log link) is an over-dispersed Poisson model, and its cross-classified MLE fit reproduces the standard chain ladd… | fact | tagged | Over-Dispersed Poisson Model: “Fitted as a [[Generalized Linear Model\\|GLM]] with a log link, it reproduces the volume-weighted [[…” |
| Volume-weighted chain ladder age-to-age factor = sum of later-age cumulative losses divided by sum of the earlier-age cumulative losses ove… | formula | linked | Age to Age Factor: “$$f_{n \to n+1}^{\text{vol-wtd}} = \frac{\sum_{\text{AY}} C_{\text{AY},\,n+1}}{\sum_{\text{AY}} C_{…” |
| Estimate an accident year's ultimate loss by multiplying its latest cumulative loss by the product of the remaining age-to-age factors (cum… | procedure | tagged | Chain Ladder Method: “projects each cohort to ultimate by multiplying its latest cumulative amount by a [[Cumulative Deve…” |

</details>

<details><summary><code>cas7-2019-q13</code> · gap</summary>

Tagged pages: Cape Cod Method, Reinsurance, Chain Ladder Method, Reinsurance Reserving

| Item | Kind | Status | Where |
|---|---|---|---|
| The Stanard-Bühlmann (Cape Cod) expected loss ratio equals total aggregate reported losses divided by total used-up (adjusted) premium, whe… | formula | tagged | Cape Cod Method: “The ELR is estimated as total reported losses over total *used-up* (on-level, developed) premium ac…” |
| Used-up premium (exposure) is the premium on a risk-adjusted/on-level basis (adjusted premium) multiplied by the percent of losses expected… | definition | tagged | Cape Cod Method: “**Used-up premium** $\text{EP}_i / \text{CDF}_i$ is the share of each year's premium "exposed" to t…” |
| The Stanard-Bühlmann IBNR for an accident year equals adjusted premium times the ELR times (1 minus the report lag percentage). | formula | tagged | Cape Cod Method: “$$\text{IBNR}_i = \text{ELR} \times \text{EP}_i \times \left(1 - \tfrac{1}{\text{CDF}_i}\right)$$” |
| The chain ladder IBNR equals reported loss times (1/report lag minus 1), where the loss development factor is the reciprocal of the percent… | formula | tagged | Chain Ladder Method: “$$U_{\text{AY}} = C_{\text{AY},\,n} \times \text{CDF}_{n \to \text{ult}}$$” |
| In the credibility-weighted combination of the Stanard-Bühlmann and chain ladder methods, the weight on the chain ladder is Z equal to the … | formula | missing |  |
| The chain ladder method is responsive to actual reported losses but is highly leveraged and unstable at immature ages with large LDFs, whil… | fact | tagged | Chain Ladder Method: “and at its worst at immature ages in [[Long Tail Lines\\|long-tail lines]], where the CDF is large a…” |

</details>

<details><summary><code>cas7-2019-q14</code> · gap</summary>

Tagged pages: Reinsurance, Loss Reserving, Bordereau, Reinsurance Reserving

| Item | Kind | Status | Where |
|---|---|---|---|
| Reinsurance report lags are longer than primary lags because a claim must first be recognized by the cedant, often only reaches the reinsur… | fact | tagged | Bordereau: “Bordereau delays are one of Friedland's reasons that reinsurance reporting and payment patterns are…” |
| Reinsurance reserves show persistent upward development of reported losses, caused by primary insurers under-reserving ALAE, setting case r… | fact | missing |  |
| Reinsurance exposures are heterogeneous (differing by product, retention, attachment point, policy terms), so data are not homogeneous and … | fact | tagged | Reinsurance Reserving: “External patterns such as RAA data help but mix unlike contracts.” |
| Data reported by cedants to reinsurers can lack key details (such as accident year, requiring the reinsurer to impute it), be heavily summa… | fact | tagged | Bordereau: “a bordereau's loss detail is far less complete than the claim file behind it” |
| Reinsurer IT and data-coding systems struggle to keep up with constantly changing information requirements across varied contract types, so… | fact | missing |  |
| Greater uncertainty in reinsurance reserves gives reinsurers a higher reserve-to-surplus ratio than primary insurers, so management may be … | fact | missing |  |

</details>

<details><summary><code>cas7-2019-q15</code> · untagged</summary>

Tagged pages: Retrospective Rating, PDLD Ratio

| Item | Kind | Status | Where |
|---|---|---|---|
| The premium development to loss development (PDLD) ratio at a retro adjustment is the ratio of the incremental premium change at that adjus… | definition | tagged | PDLD Ratio: “For each retro adjustment it is the premium developed in that adjustment divided by the loss develo…” |
| The formula-method PDLD at the first retro adjustment equals (Basic premium / Standard premium) x Tax multiplier / (Expected loss ratio x P… | formula | tagged | PDLD Ratio: “$\text{BP}/L_1$ is approximated by $\text{BPF}/(\text{ELR} \times \%L_1)$, the basic premium factor…” |
| The PDLD at later adjustments (no basic premium term) equals the incremental loss capping ratio x Loss conversion factor x Tax multiplier. | formula | tagged | PDLD Ratio: “Later ratios are the incremental loss capping ratio times $\text{LCF} \times \text{TM}$.” |
| Derive the incremental percent of ultimate loss emerging at each retro adjustment from the age-to-ultimate loss development factors (differ… | procedure | elsewhere | Loss Development: “the [[Bornhuetter-Ferguson Method]] uses the *complement* $(1 - 1/\text{CDF})$ to weight an a prior…” |
| The cumulative PDLD at an adjustment is the emergence-weighted average of the incremental PDLDs for that and all later adjustments, dividin… | procedure | tagged | PDLD Ratio: “$$\text{CPDLD}_k = \frac{\sum_{n \ge k} \text{PDLD}_n \, \Delta\%L_n}{\sum_{n \ge k} \Delta\%L_n}$$” |
| An alternative to the formula method for estimating PDLD ratios is the empirical method (selecting ratios from booked premium and loss deve… | fact | tagged | PDLD Ratio: “Empirical ratios divide booked premium by reported loss with the booking lag: premium to 27 months …” |
| The formula method responds to changing retro parameters, is more stable, and captures the nonlinear, declining premium responsiveness at l… | fact | tagged | PDLD Ratio: “The formula ratios respond to changes in the plan parameters sold. They should be tested against ac…” |

</details>

<details><summary><code>cas7-2019-q2</code> · answerable</summary>

Tagged pages: Credibility, Benktander Method, Credible Loss Ratio Reserve

| Item | Kind | Status | Where |
|---|---|---|---|
| In Hurlimann's loss-ratio payout method, the incremental loss ratio m_k for each development period is the sum of incremental paid losses a… | formula | tagged | Credible Loss Ratio Reserve: “$m_k$ is the **incremental loss ratio** of development period $k$: the paid claims $S_{ik}$ of that…” |
| The expected percent paid (reported) at development period k is p_k = (m_1 + ... + m_k)/ELR, and q_k = 1 - p_k is the percent unpaid. | formula | tagged | Credible Loss Ratio Reserve: “$p_i = \sum_{k \le n-i+1} m_k \big/ \sum_k m_k$ is the **loss ratio payout factor**, the expected s…” |
| The individual (chain ladder) reserve is R^ind = Loss × q/p, and the collective (BF-type) reserve is R^coll = Premium × ELR × q. | formula | tagged | Credible Loss Ratio Reserve: “$$R_i^{ind} = \frac{q_i}{p_i}\,C_{i,n-i+1}$$ … $$R_i^{coll} = q_i\,V_i\sum_{k=1}^{n} m_k$$” |
| The Benktander (Gunnar Benktander) reserve is a credibility-weighted average of the individual and collective reserves, R^GB = p·R^ind + (1… | formula | tagged | Benktander Method: “The reserve mixes the same way, $R_{\text{GB}} = q\,U_{\text{BF}} = p\,R_{\text{CL}} + q\,R_{\text{…” |
| The optimal credibility is Z = p/(p + t), where t = sqrt(p) when Var(U_i) = Var(U_i^BC); the optimal credible reserve is R_c = Z·R^ind + (1… | formula | tagged | Credible Loss Ratio Reserve: “$$R_i^{c} = Z_i\,R_i^{ind} + (1 - Z_i)\,R_i^{coll}$$ … Hürlimann's optimal weight minimizes both th…” |
| The optimal credible reserve minimizes the mean squared error of the reserve estimate, so it is statistically preferable to the Benktander … | fact | tagged | Credible Loss Ratio Reserve: “Hürlimann's optimal weight minimizes both the mean squared error and the variance of $R_i^c$ when $…” |
| A larger later-period incremental loss raises the ELR while leaving the first-period m_1 unchanged, so p = m_1/ELR falls and the Benktander… | fact | tagged | Credible Loss Ratio Reserve: “$p_i = \sum_{k \le n-i+1} m_k \big/ \sum_k m_k$ is the **loss ratio payout factor**, the expected s…” |

</details>

<details><summary><code>cas7-2019-q3</code> · answerable</summary>

Tagged pages: Credibility, Bornhuetter-Ferguson Method, Chain Ladder Method, Credible Loss Ratio Reserve

| Item | Kind | Status | Where |
|---|---|---|---|
| In the Neuhaus method, the loss ratio reserve factor (incremental loss ratio) at each age is m_k = total incremental paid losses at age k d… | formula | tagged | Credible Loss Ratio Reserve: “$m_k$ is the **incremental loss ratio** of development period $k$: the paid claims $S_{ik}$ of that…” |
| The cumulative payout proportion through age k is p_k = (m_1 + ... + m_k) / ELR, where ELR = sum of all m_k, so p equals 1 at the last deve… | formula | tagged | Credible Loss Ratio Reserve: “$p_i = \sum_{k \le n-i+1} m_k \big/ \sum_k m_k$ is the **loss ratio payout factor**, the expected s…” |
| The Neuhaus credibility for an accident year at age k is z = p_k × ELR, the weight placed on the individual (chain ladder) reserve, and the… | formula | tagged | Credible Loss Ratio Reserve: “Neuhaus's is $Z_i = p_i \sum_k m_k$.” |
| The Neuhaus collective reserve is the Bornhuetter-Ferguson reserve: premium × ELR × (1 − p_k), the expected loss ratio times premium times … | formula | tagged | Credible Loss Ratio Reserve: “$$R_i^{coll} = q_i\,V_i\sum_{k=1}^{n} m_k$$” |
| The Neuhaus individual reserve is the chain ladder reserve based on cumulative paid losses to date: cumulative paid / p_k − cumulative paid… | formula | tagged | Credible Loss Ratio Reserve: “$$R_i^{ind} = \frac{q_i}{p_i}\,C_{i,n-i+1}$$” |
| Neuhaus assumes a single constant expected loss ratio and stable payout pattern across all accident years, so it is inappropriate when prem… | fact | tagged | Credible Loss Ratio Reserve: “$m_k$ is the **incremental loss ratio** of development period $k$: the paid claims $S_{ik}$ of that…” |
| When no development is expected beyond the last age, the fully developed accident year has p = 1 and therefore zero reserve. | fact | tagged | Credible Loss Ratio Reserve: “$p_i = \sum_{k \le n-i+1} m_k \big/ \sum_k m_k$ is the **loss ratio payout factor**, the expected s…” |

</details>

<details><summary><code>cas7-2019-q4</code> · answerable</summary>

Tagged pages: Limited Expected Value, Deductible, Layer Development Factor, Excess Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| In Sahasrabuddhe's method, restate each historical reported loss limited to a given limit to the basic limit at the latest accident year's … | procedure | tagged | Layer Development Factor: “Restate each cell of the triangle, observed in layer $L$, to the basic limit at the latest cost lev…” |
| Calculate basic-limit age-to-age development factors as the sum of adjusted losses at the later age divided by the sum of adjusted losses a… | procedure | tagged | Layer Development Factor: “F^B_{3,1} &= 1.3734 \times 1.0571” |
| Development factor for a layer or limit at a given age equals the basic-limit CDF times the ratio of [(unlimited EV minus limited EV at the… | formula | tagged | Layer Development Factor: “$$F^X_{i,j} = F^B_{n,j} \times \frac{A_{i,\infty}}{A_{i,j}}$$” |
| Estimate the ultimate loss in a layer by multiplying the currently reported loss in that layer (e.g., excess of the deductible) by the laye… | procedure | linked | Excess Loss Development Factor: “\text{Ultimate} &= \$1{,}350{,}000 \times 1.7778” |
| Under an exponential severity distribution, a smaller parameter (smaller mean) means limits eliminate a smaller share of losses, so limited… | fact | tagged | Limited Expected Value: “Exponential$(\theta)$ \\| $\theta(1 - e^{-u/\theta})$ \\|” |
| A smaller excess share of expected losses at early maturity relative to later maturity makes the excess layer more leveraged, which raises … | fact | tagged | Excess Insurance: “Layer development factors are leveraged and volatile.” |

</details>

<details><summary><code>cas7-2019-q5</code> · answerable</summary>

Tagged pages: Cape Cod Method, Maximum Likelihood Estimation, Coefficient of Variation, Process Risk, Parameter Risk

| Item | Kind | Status | Where |
|---|---|---|---|
| In the Cape Cod method (Clark), expected prospective losses equal the ELR times the premium (exposure base). | formula | tagged | Parameter Risk (collapsed): “\hat R &= 0.70 \times 10{,}000 \times 0.40” |
| Process variance of prospective losses equals the variance/mean ratio (sigma squared) times the expected losses. | formula | tagged | Process Risk: “\mathrm{Var}_{\text{process}}(R) = \sigma^2 \sum \mu_{AY;x,y}” |
| For Cape Cod prospective losses (premium times ELR), the parameter variance equals premium squared times the variance of the ELR estimate, … | formula | tagged | Process Risk: “Parameter variance, $(\partial R)'\,\Sigma\,(\partial R)$, comes from parameters shared by every ye…” |
| Total variance of prospective losses is the sum of process variance and parameter variance; the coefficient of variation is the square root… | procedure | tagged | Process Risk: “Clark adds the two, treating them as independent.” |
| Process variance measures the uncertainty from the inherent randomness of the insurance loss process, while parameter variance measures the… | definition | tagged | Process Risk: “**Process risk** is the variability of actual outcomes around their expected value that would remai…” |
| The Cape Cod method typically has lower parameter variance than the chain ladder (LDF) method because it uses fewer parameters (less overpa… | fact | tagged | Process Risk: “He notes that the Cape Cod method may carry somewhat more process variance than the LDF method but …” |

</details>

<details><summary><code>cas7-2019-q6</code> · answerable</summary>

Tagged pages: Cape Cod Method, Maximum Likelihood Estimation, Growth Curve, Process Risk

| Item | Kind | Status | Where |
|---|---|---|---|
| The loglogistic growth curve is G(x) = x^ω / (x^ω + θ^ω), giving the expected cumulative proportion of ultimate loss paid (or reported) at … | formula | tagged | Growth Curve: “\text{Loglogistic: } G(x) = \frac{x^{\omega}}{x^{\omega} + \theta^{\omega}}” |
| With uniform accident occurrence over a year, the average age of an accident year at a valuation date is the evaluation age in months minus… | procedure | tagged | Growth Curve: “The age $x$ runs from the *average* accident date to the evaluation date, so an [[Accident Year\\|ac…” |
| When payments stop after a truncation point, the pattern is truncated: G is evaluated at the truncation age (average age at the truncation … | procedure | tagged | Growth Curve: “Clark truncates at a selected age $x_T$ (240 months), using $G(x_T)/G(x)$ in place of $1/G(x)$.” |
| The Cape Cod ELR estimate is total cumulative actual loss to date divided by the sum of on-level premium times G(x) (used-up premium) acros… | formula | tagged | Cape Cod Method: “The ELR is estimated as total reported losses over total *used-up* (on-level, developed) premium ac…” |
| Expected incremental loss in a period for an accident year equals premium × ELR × [G(end age) − G(start age)]; for the first period the sta… | formula | tagged | Growth Curve: “The expected increment between ages $x$ and $y$ is $\text{ULT}_{AY}[G(y) - G(x)]$ in Clark's LDF me…” |
| The normalized (Pearson) residual is (actual incremental − expected incremental) / sqrt(σ² × expected incremental), where σ² is the scale p… | formula | tagged | Process Risk: “The same $\sigma^2$ scales the normalized residuals $(c - \hat\mu)/\sqrt{\sigma^2\hat\mu}$ used to …” |
| Cape Cod ultimate loss for an accident year equals paid to date plus the unpaid estimate, where unpaid = ELR × premium × [G(truncation) − G… | formula | tagged | Cape Cod Method: “\text{IBNR}_i = \text{ELR} \times \text{EP}_i \times \left(1 - \tfrac{1}{\text{CDF}_i}\right)” |

</details>

<details><summary><code>cas7-2019-q7</code> · answerable</summary>

Tagged pages: Chain Ladder Method, Calendar Year, Case Reserves, Calendar Year Effect, Chain Ladder Assumptions, Data Diagnostic Analysis

| Item | Kind | Status | Where |
|---|---|---|---|
| To test for calendar year effects with Mack's method, apply the test to the age-to-age development factor triangle (not the loss triangle),… | procedure | tagged | Calendar Year Effect: “In each column, factors above the [[Median\\|median]] are L and below it are S; with an odd count th…” |
| For each calendar year diagonal, count the large and small factors and set Z_i = min(#L, #S); the test statistic Z is the sum of Z_i over a… | procedure | tagged | Calendar Year Effect: “$$Z_j = \min(L_j,\ S_j)$$ … A diagonal with $n \le 1$ is left out.” |
| Form a 95% confidence interval E[Z] ± 1.96·sqrt(Var(Z)) (the standard deviation is the square root of the variance) and reject the null hyp… | procedure | tagged | Calendar Year Effect: “"no calendar year effect" is rejected at 5% if $Z$ falls outside $E(Z) \pm 2\sqrt{\text{Var}(Z)}$.” |
| A sustained increase in calendar year trend raises actual losses above expected on all later diagonals, giving persistently positive residu… | fact | tagged | Calendar Year Effect: “If the diagonals measure claims inflation, the latest ones can be projected forward ([[Separation M…” |
| An increase in case reserve adequacy raises case incurred losses in the year of the change (positive residuals) and reduces later case incu… | fact | linked | Case Adequacy: “**Strengthening** raises reported losses immediately, so recent age-to-age factors fall (more of th…” |
| An acceleration of loss payments affects paid loss development but not case incurred losses, since payments are offset by reductions in cas… | fact | linked | Settlement Rate: “**Reported data is largely immune**, because reported losses include the case reserve whether or no…” |

</details>

<details><summary><code>cas7-2019-q8</code> · answerable</summary>

Tagged pages: Maximum Likelihood Estimation, Development Factor, Cape Cod Method, Growth Curve, Parameter Risk

| Item | Kind | Status | Where |
|---|---|---|---|
| A fitted growth curve (loglogistic or Weibull) implies a tail beyond the latest observed age, with percent emerged below 100% at the end of… | fact | tagged | Growth Curve: “The curve extrapolates to infinite age, so it produces its own [[Tail Factor\\|tail factor]].” |
| A fitted growth curve is monotonically increasing in percent emerged, so it cannot reflect negative development (e.g., salvage and subrogat… | fact | tagged | Growth Curve: “Emergence must rise strictly from $0\%$ to $100\%$, so a line with real expected negative developme…” |
| A weighted average LDF is sensitive to outlying age-to-age factors and to the weights chosen, while a curve fit smooths out spurious points… | fact | tagged | Growth Curve: “And the pattern is smooth instead of following every random movement in the [[Age to Age Factor\\|ag…” |
| Advantages of the curve-fit method: it uses few parameters, which reduces parameter variance, it provides a tail beyond the observed data, … | fact | tagged | Growth Curve: “Only two parameters describe the whole pattern.” |
| Advantages of the weighted average LDF method: it is simple to calculate and explain, relies directly on the company's actual data, and can… | fact | tagged | Development Factor: “uses only the most recent $k$ accident years — reduces the influence of older, potentially unrepres…” |
| The Cape Cod method has fewer parameters than the LDF method because it uses a single expected loss ratio (ELR) across all years rather tha… | fact | tagged | Cape Cod Method: “The ELR is estimated as total reported losses over total *used-up* (on-level, developed) premium ac…” |
| In Clark's LDF method with a curve fit, total variance includes process variance and parameter variance, which includes uncertainty in the … | fact | tagged | Growth Curve: “$\omega$, $\theta$ and the ultimates or ELR are fitted by [[Maximum Likelihood Estimation\\|maximum …” |

</details>

<details><summary><code>cas7-2019-q9</code> · answerable</summary>

Tagged pages: Coefficient of Variation, Internal Systemic Risk, Risk Margin

| Item | Kind | Status | Where |
|---|---|---|---|
| Specification error is the internal systemic risk that the selected model cannot perfectly represent the underlying insurance (loss) proces… | definition | tagged | Internal Systemic Risk: “**Specification error** is the inability to build a model fully representative of the insurance pro…” |
| Parameter selection error is the internal systemic risk that the model fails to identify or measure all predictors of future claim costs (a… | definition | tagged | Internal Systemic Risk: “**Parameter selection error** arises because the model cannot adequately measure all the predictors…” |
| Data error is the internal systemic risk that an effective model cannot be fitted because data is of poor quality, lacking or not credible,… | definition | tagged | Internal Systemic Risk: “**Data error** comes from poor or unavailable data, or inadequate knowledge of the portfolio, inclu…” |
| In a balanced scorecard of internal systemic risk, score each risk source (specification, parameter selection, data) by whether the modelin… | procedure | tagged | Internal Systemic Risk: “Each indicator is scored against best practice even where best practice is not possible for the por…” |
| Better balanced scorecard scores (best-practice risk indicators) map to a lower coefficient of variation, because they reduce the magnitude… | fact | tagged | Internal Systemic Risk: “For a single aggregated model with limited data, few predictors and heavy subjective adjustment, $2…” |

</details>

<details><summary><code>cas7-an-001</code> · gap</summary>

Tagged pages: Premium Reserve, Retrospective Premium Reserve, Retrospective Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| A paid development to lead-date-loss (PDLD) ratio for a retro adjustment period is the expected incremental retrospective premium change in… | definition | linked | PDLD Ratio: “For each retro adjustment it is the premium developed in that adjustment divided by the loss develo…” |
| The cumulative PDLD ratio at a given adjustment is the average of the later-period PDLD ratios weighted by the expected share of loss emerg… | formula | tagged | Retrospective Premium Reserve: “$\text{CPDLD}_k$ averages the PDLDs from adjustment $k$ onward, weighted by the expected loss emerg…” |
| Loss emerging after the last allowable retro adjustment generates no additional premium, so it is included in the CPDLD denominator with a … | fact | missing |  |
| Expected future retro premium equals the cumulative PDLD ratio times the expected loss still to emerge. | procedure | tagged | Premium Reserve: “$$\text{Future premium} = \text{CPDLD} \times \text{Expected future loss emergence}$$” |
| Expected ultimate retro premium equals the premium booked from the latest retro adjustment plus expected future premium, and the premium as… | procedure | tagged | Premium Reserve: “$$\text{Premium reserve} = \text{Expected ultimate premium} - \text{Premium booked to date}$$” |

</details>

<details><summary><code>cas7-an-002</code> · answerable</summary>

Tagged pages: Premium Reserve, Retrospective Premium Reserve, Retrospective Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| The PDLD (premium development to loss development) ratio at an adjustment is the incremental retrospective premium booked through that adju… | definition | linked | PDLD Ratio: “For each retro adjustment it is the premium developed in that adjustment divided by the loss develo…” |
| The formula PDLD ratio at an adjustment equals (basic premium × tax multiplier)/reported loss plus (capped loss/reported loss) × loss conve… | formula | tagged | Retrospective Premium Reserve: “$$\text{PDLD}_1 = \frac{\text{BPF} \times \text{TM}}{\text{ELR} \times \%L_1} + \frac{CL_1}{L_1}\,\…” |
| To diagnose a trend in empirical PDLD ratios, compare them with the formula ratio computed from the parameters of plans currently sold: if … | procedure | tagged | Retrospective Premium Reserve: “PDLDs can come from the plan parameters sold, which respond to changes in plan design, or from hist…” |
| Better loss experience places more loss within the retro maximum and per-accident limitation, raising the capped-loss-to-loss ratio and thu… | fact | tagged | Retrospective Premium Reserve: “Later PDLDs fall well **below 1** as more of each new dollar of loss lands above a cap.” |
| Upward development in high loss layers combined with return premium in lower layers makes incremental PDLD ratios after the first adjustmen… | fact | linked | PDLD Ratio: “An individual policy quarter's historical ratio can even be negative. That happens when upward deve…” |

</details>

<details><summary><code>cas7-an-003</code> · answerable</summary>

Tagged pages: Parameter Estimation, Chain Ladder Method, Unpaid Claim Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| Mack's volume-weighted age-to-age factor is f_k = (sum of C_{j,k+1} over accident years with both ages) / (sum of C_{j,k} over the same yea… | formula | tagged | Parameter Estimation: “Mack estimates volume-weighted factors $\hat{f}_k = \sum_i C_{i,k+1} / \sum_i C_{i,k}$” |
| Mack's unbiased estimator of the variance parameter is alpha_k^2 = (1/(I-k-1)) * sum over j=1..I-k of C_{jk} * (C_{j,k+1}/C_{jk} - f_k)^2. | formula | linked | Prediction Error: “\hat\sigma_k^{2} = \frac{1}{I-k-1}\sum_{j=1}^{I-k} C_{j,k}\left(\frac{C_{j,k+1}}{C_{j,k}} - \hat f_…” |
| In Mack's model, Var(C_{j,k+1} \| C_{jk}) = alpha_k^2 * C_{jk}, so squared link-ratio deviations are weighted by the age-k amount C_{jk}. | fact | linked | Prediction Error: “\mathrm{Var}(C_{i,k+1} \mid C_{i,k}) = C_{i,k}\,\sigma_k^2” |
| The divisor I-k-1 in Mack's variance estimator is the number of link ratios (I-k) minus one degree of freedom lost by estimating f_k, which… | fact | linked | Sample Variance: “The divisor $n - 1$ is the **degrees of freedom**: one is spent estimating $\mu$ by $\bar{X}$, and …” |

</details>

<details><summary><code>cas7-an-004</code> · answerable</summary>

Tagged pages: Moment, Lognormal Distribution, Percentile, Unpaid Claim Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| Mack (1994) suggests approximating the distribution of the chain ladder reserve by a lognormal distribution when the standard error is larg… | fact | tagged | Moment: “When the [[Unpaid Claim Distribution\\|reserve distribution]] is rather skewed — especially once the…” |
| For a lognormal distribution with parameters mu and sigma, the mean is exp(mu + sigma^2/2) and the variance is exp(2mu + sigma^2)(exp(sigma… | formula | tagged | Lognormal Distribution: “$$E[X] = e^{\mu + \sigma^2/2}$$ … $$\text{Var}(X) = e^{2\mu+\sigma^2}(e^{\sigma^2}-1)$$” |
| To fit a lognormal by matching moments to a given mean and standard deviation, set sigma^2 = ln(1 + (SD/mean)^2) and mu = ln(mean) - sigma^… | procedure | tagged | Moment: “$\sigma^2 = \ln\!\big(1 + \text{s.e.}(R)^2/R^2\big)$ and $\mu = \ln R - \sigma^2/2$” |
| A percentile of a lognormal distribution is found as exp(mu + z*sigma), where z is the corresponding standard normal percentile. | procedure | tagged | Unpaid Claim Distribution: “Its $p$-th percentile is then $R_p = e^{\mu + z_p\sigma}$.” |

</details>

<details><summary><code>cas7-an-005</code> · answerable</summary>

Tagged pages: Range of Indications, Bootstrap, Unpaid Claim Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| When combining several ODP bootstrap models, the weighted best estimate of unpaid claims is formed by applying the actuary's selected weigh… | procedure | tagged | Range of Indications: “Run several bootstrap models (paid and incurred chain ladder, BF, Cape Cod, GLM) and weight them by…” |
| The weighted range of total unpaid claims is found by taking, for each accident year, the lowest and highest mean among the models given we… | procedure | tagged | Range of Indications: “The **weighted range** uses, for each year, only the models given weight in that year. … A is $[100…” |
| The modeled range of total unpaid claims is the range from the lowest to the highest total mean unpaid among all models used, where each mo… | procedure | tagged | Range of Indications: “The **modeled range** spans the means of every model used anywhere.” |
| A model counts as used in the modeled range if it receives at least some weight for any accident year, even if its weight is zero in other … | fact | tagged | Range of Indications (collapsed): “The modeled range's top end is set by the paid chain ladder on AY B, a model the actuary gave *no* …” |
| The weighted range is narrower than the modeled range because it ignores, year by year, models given no weight, making it a more representa… | fact | tagged | Range of Indications: “It is the more representative view of uncertainty in the actuarial central estimate.” |

</details>

<details><summary><code>cas7-an-006</code> · answerable</summary>

Tagged pages: Ceded Loss Reserve, Excess of Loss, Quota Share, Aggregate Excess of Loss

| Item | Kind | Status | Where |
|---|---|---|---|
| Inuring reinsurance applies in a specified order: a cover that inures to the benefit of another is applied first, and the later cover appli… | definition | tagged | Ceded Loss Reserve: “**Order matters.** Covers inure in a stated sequence. Typically per-occurrence excess comes off fir…” |
| An excess per occurrence reinsurance cover cedes the portion of each occurrence loss above the attachment point, up to the limit: min(limit… | formula | tagged | Excess of Loss: “$$Y = \min\left(\max(X - R,\, 0),\; L\right)$$” |
| A quota share treaty cedes a fixed percentage of the losses (ultimate and paid) that reach it, after any inuring covers. | formula | tagged | Quota Share: “the reinsurer takes a fixed percentage $a$ of the premium and of every loss (usually including ALAE…” |
| An aggregate stop-loss cover cedes the amount by which retained losses exceed the stated cap, max(retained loss - cap, 0), applied separate… | formula | tagged | Aggregate Excess of Loss: “$$Y = \min\left(\max(S - A,\, 0),\; L_A\right)$$” |
| Unpaid loss equals ultimate loss minus paid loss, so ceded unpaid equals ceded ultimate minus ceded paid, and equals gross unpaid minus net… | formula | tagged | Ceded Loss Reserve: “$$\text{Ceded unpaid} = \text{Gross unpaid} - \text{Net unpaid}$$” |

</details>

<details><summary><code>cas7-an-007</code> · answerable</summary>

Tagged pages: Ceded Loss Reserve, Quota Share, Surplus Share, Aggregate Excess of Loss

| Item | Kind | Status | Where |
|---|---|---|---|
| On a quota share treaty, losses and premiums are shared at one fixed percentage from the ground up, so age-to-age factors for gross, ceded … | fact | tagged | Quota Share: “For reserving, ceded losses are a scalar multiple of gross and develop on the gross pattern, unlike…” |
| A surplus share treaty cedes a different percentage of each risk depending on the policy limit relative to the retained line, so its gross,… | fact | tagged | Surplus Share: “**Surplus Share** is a proportional treaty, common on property, in which the percentage ceded varie…” |
| A risks-attaching treaty covers policies incepting during its term, so a change in its ceded percentage applies by the policy year of the u… | fact | tagged | Ceded Loss Reserve: “When the percentage changes, it follows the *policy* year on a risks-attaching treaty and the *acci…” |
| Stop-loss reinsurance typically applies after all other reinsurance, so other covers inure to its benefit and it protects the ceding compan… | fact | tagged | Ceded Loss Reserve: “**Order matters.** Covers inure in a stated sequence. Typically per-occurrence excess comes off fir…” |

</details>

<details><summary><code>cas7-an-008</code> · answerable</summary>

Tagged pages: Types of Reinsurance, Treaty Reinsurance, Surplus Share, Aggregate Excess of Loss, Ceded Loss Reserve

| Item | Kind | Status | Where |
|---|---|---|---|
| The defining characteristic of treaty reinsurance is that the reinsurer does not underwrite individual risks; it accepts all business withi… | fact | tagged | Treaty Reinsurance: “The reinsurer accepts business it has not underwritten risk by risk, so it shares the results of th…” |
| In facultative reinsurance the reinsurer may underwrite each submitted risk individually, which mitigates adverse selection. | fact | tagged | Treaty Reinsurance: “Contrast [[Facultative Reinsurance]], where each risk is offered, underwritten and priced on its ow…” |
| Under a surplus share treaty, the ceded proportion of each policy is (policy limit - retained line) / policy limit, and this proportion app… | formula | tagged | Surplus Share: “s(V) = \frac{\min\left(\max(V - R,\, 0),\; N R\right)}{V}” |
| A surplus share treaty is a proportional cover, so losses are shared pro rata (even losses below the retained line are partly ceded when th… | fact | tagged | Types of Reinsurance: “Once the risk's share is fixed by its size, the reinsurer pays that share of every loss on it, howe…” |
| Aggregate excess of loss (stop-loss) reinsurance generally applies to all or part of the cedant's net retention, so the cedant's other rein… | fact | tagged | Ceded Loss Reserve: “Covers inure in a stated sequence. Typically per-occurrence excess comes off first, then the quota …” |

</details>

Nothing here edits the vault. A gap is fixed from the syllabus reading, in general form — never by copying the question's own numbers onto the page — and the edited page is fact checked again (docs/verification.md).
