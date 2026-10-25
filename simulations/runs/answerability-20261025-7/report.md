# Answerability: Exam 7 (CAS)

Run `answerability-20261025-7` · 42 questions checked of 42 attempted · cost $14.17

Each question's official solution was broken into the knowledge it uses (by a model that saw no study page), and each item was looked for on the pages the vault gives for the question. An item counts as taught only if a quote of the teaching passage is really on the page; the check is done in code. *Answerable* is necessary, not sufficient: a page can hold the formula and still not teach it well.

| Verdict | Questions | Share |
|---|---|---|
| **Answerable** — everything taught on a tagged page, one link away or on a prerequisite exam's page | 21 | 50% |
| **Untagged** — everything is in the vault, but some of it on a page neither tagged nor linked | 5 | 12% |
| **Gap** — something the solution uses is taught on no page | 16 | 38% |

Requirements: 265 — tagged 207 (78%), linked 21 (8%), prerequisite 0 (0%), elsewhere 7 (3%), missing 30 (11%)
Not checked: 19 off syllabus.

## By sitting

A paper whose gaps far outrun the rest may test a reading the syllabus has since dropped.

| Sitting | Questions | Answerable | Untagged | Gap |
|---|---|---|---|---|
| Spring 2012 | 10 | 3 | 0 | 7 (70%) |
| Spring 2013 | 11 | 7 | 2 | 2 (18%) |
| Spring 2014 | 14 | 7 | 3 | 4 (29%) |
| Spring 2015 | 7 | 4 | 0 | 3 (43%) |

## Gaps, by the page that should teach them

Ranked by how many questions each page's gaps cost. The page is the one named for the item's concept; "no page" means the vault has no page by that name.

### `Concepts/Reinsurance Reserving.md` — 3 question(s)

- `cas7-2012-q11` (fact): Reinsurance loss data show persistent upward development because of inflation, cedents booking large claims at a modal value when first reported, and underestimation of ALAE.
- `cas7-2012-q11` (fact): Reinsurers' data coding and IT systems often cannot keep pace with the complex, changing data needs of reinsurance, delaying capture of claims and necessary information.
- `cas7-2014-q13` (fact): Industry statistics such as Schedule P data are of limited use for reinsurance reserving because categories like excess casualty blend many lines of business and attachment points and are inconsistent across companies.
- `cas7-2015-q12` (fact): Reinsurance reserving is complicated by persistent upward development of most claim reserves, often because primary insurers tend to underestimate (under-reserve) ALAE on reported claims.
- `cas7-2015-q12` (procedure): To detect possible ALAE under-reserving in claim data, compute the ratio of ALAE to loss for each claim and compare across claims or accident years, where lower ratios on less mature claims suggest ALAE is understated and will develop upward.

### `Concepts/Bootstrap.md` — 2 question(s)

- `cas7-2014-q7` (procedure): When fitting a negative-column triangle with the GLM, add the absolute value of the largest negative incremental value to every incremental value, solve the GLM, then subtract that constant from each fitted incremental value.
- `cas7-2014-q7` (procedure): Outliers or extreme values can be excluded from the average age-to-age factor and residual calculations, while the corresponding incremental value is still resampled when simulating triangles.
- `cas7-2014-q7` (procedure): Heteroecthesious data (partial-year or interim evaluation periods) can be handled by projecting future incremental values before applying the model, annualizing the data and then de-annualizing the results.
- `cas7-2014-q7` (procedure): If the sum of the residuals is non-zero, add a single constant to all residuals so the adjusted residuals sum to zero.
- `cas7-2015-q11` (fact): A change in exposure level, or thin/missing data, in one accident year (e.g., the earliest year) makes that row inconsistent with the others and can bias the model results.
- `cas7-2015-q11` (procedure): To handle a thin or unreliable accident year, remove that entire row from the loss triangle before modeling.
- `cas7-2015-q11` (fact): Zeros in the later ages of a triangle (e.g., oldest year at the last ages) are not necessarily missing data; they may reflect claim closure and no further development, and are not by themselves a model-failure issue.

### `Concepts/Retrospective Rating.md` — 2 question(s)

- `cas7-2012-q7` (procedure): Expected capped loss for each retro adjustment period equals expected unlimited loss times the percent of loss emerged in that period times that period's loss capping ratio (capping ratios are incremental, not cumulative).
- `cas7-2015-q14` (fact): If small claims (below the loss cap/limit) settle faster, early capped-to-unlimited loss ratios rise toward one, so early PDLD ratios increase, while later emerging loss is mainly large claims hitting the cap or limits, so later PDLD ratios decrease.

### **no page for Chain Ladder vs Stanard-Bühlmann** — 1 question(s)

- `cas7-2012-q10` (fact): Stanard-Bühlmann is preferred over chain ladder when reported losses fluctuate but the expected loss ratio to on-level premium is expected to be stable, since it does not leverage reported losses.

### **no page for Incremental Loss Triangle** — 1 question(s)

- `cas7-2013-q7` (procedure): To build the GLM bootstrap input, convert the cumulative loss triangle to an incremental triangle by differencing successive cumulative values in each accident year (the first column stays as is).

### **no page for Loss Development Method Re-evaluation** — 1 question(s)

- `cas7-2012-q1` (procedure): When re-evaluating one year later, update the paid to date to include the new incremental paid loss and use the CDF for the next age (e.g., 24-ultimate) while keeping the expected ultimate and selected factors unchanged.

### **no page for Model Diagnostics for Reserve Variability** — 1 question(s)

- `cas7-2014-q9` (fact): The mean unpaid estimates should increase from the oldest to the most recent accident year, since less mature years have more unpaid claims remaining.

### **no page for Stanard-Bühlmann Method** — 1 question(s)

- `cas7-2012-q10` (procedure): Remove commission, brokerage and internal expenses from treaty premium (multiply by one minus the expense ratio) before using it as the exposure base in the Stanard-Bühlmann method.

### `Concepts/Bayesian Bornhuetter-Ferguson Model.md` — 1 question(s)

- `cas7-2012-q8` (formula): In the Bayesian (Verrall/Bayesian-CL-BF credibility) model with over-dispersed Poisson incremental losses, the expected incremental loss is Z times the chain ladder incremental estimate (λ_j − 1)·D_{i,j−1} plus (1 − Z) times the BF-type estimate (λ_j − 1)·x_i/(λ_j λ_{j+1}…λ_n), where x_i is the pri… — *the locator quoted text that isn't on the page:* “E[C_{ij}] ={}& Z_{ij}\,(\lambda_j - 1)\,D_{i,j-1} \\ > &+ (1 - Z_{ij})\,(\lambda_j - 1)\,\frac{M_i}{\lambda_j\lambda_{j…”

### `Concepts/Bayesian Credibility.md` — 1 question(s)

- `cas7-2014-q1` (formula): With reported loss X = D*Y (D the reporting percentage independent of ultimate Y), the variance of hypothetical means is VHM = (E[D])^2 * Var(Y). — *the locator quoted text that isn't on the page:* “VHM &= \mathrm{Var}(0.6\,Y) \\ > > &= (0.6 \times 7)^2 \\”

### `Concepts/Chain Ladder Assumptions.md` — 1 question(s)

- `cas7-2012-q3` (fact): Mack's chain ladder variance assumption (variance of the next-period loss proportional to the cumulative loss at the prior age) is supported when weighted residuals are randomly scattered around zero with no trend or pattern, such as increasing or decreasing spread, as the earlier-age loss changes.

### `Concepts/Credibility.md` — 1 question(s)

- `cas7-2013-q10` (fact): When credibility is a linear function of report lag, an accident year's Z equals the given credibility factor times its percentage reported, so more mature years get more weight on the chain ladder estimate.

### `Concepts/Generalized Linear Model.md` — 1 question(s)

- `cas7-2013-q7` (fact): The GLM bootstrap model requires non-negative incremental losses because the log of a negative number (or zero) is undefined, so negative incrementals prevent the log-link fit directly.
- `cas7-2013-q7` (procedure): To handle negative incrementals when the -ln(\|x\|) method fails, shift every incremental value in the whole triangle by subtracting the largest negative (most negative) incremental value, so all values are non-negative, then take logs, setting ln(0) = 0.
- `cas7-2013-q7` (procedure): After fitting the GLM to the shifted triangle, undo the shift by subtracting the same shift amount from every fitted incremental value.

### `Concepts/Least Squares Development Method.md` — 1 question(s)

- `cas7-2012-q4` (fact): A simple arithmetic average of two methods corresponds to a credibility weight Z = 1/2, so it is optimal only if the least squares credibility Z equals 1/2; otherwise it is not optimal.

### `Concepts/Mack Chain Ladder Model.md` — 1 question(s)

- `cas7-2012-q3` (formula): Mack's weighted residual for a development period is (C_{i,k+1} - f_k * C_{ik}) / sqrt(C_{ik}), i.e. actual minus expected next-period cumulative loss divided by the square root of the beginning-of-period cumulative loss.
- `cas7-2012-q3` (procedure): To diagnose chain ladder assumptions, plot the weighted residuals on the vertical axis against the cumulative loss at the earlier age (or accident year) on the horizontal axis.

### `Concepts/Retrospective Premium Reserve.md` — 1 question(s)

- `cas7-2012-q7` (procedure): When no retro adjustment has yet occurred, the total expected capped loss is the sum across all adjustment periods of the emerged-loss-weighted capping ratios, which is multiplied by total expected unlimited loss.

## Tagging and linking gaps

The vault teaches what these questions need, but on a page the question isn't tagged with and its tagged pages don't link to. Adding the page to the question's `wiki_link` (or linking it from the tagged page) puts it in reach.

| Question | Pages that teach what it needs |
|---|---|
| `cas7-2013-q13` | Net of Reinsurance |
| `cas7-2013-q8` | Risk Diversification |
| `cas7-2014-q11` | Long Tail Lines |
| `cas7-2014-q14` | Generalized Cape Cod Method |
| `cas7-2014-q4` | Correlation |
| `cas7-2014-q7` | Deviance Residual |

## Taught only in a collapsed section

The passage that teaches these items sits inside a folded callout (a worked example, a table behind a toggle). A reader who skims never opens it.

| Page | Questions | Items |
|---|---|---|
| Cape Cod Method | 1 | The percent reported at a given maturity equals the reciprocal of the age-to-ul… |
| Data Issues | 1 | Outliers in the triangle (an unusually large incremental value for one accident… |
| Least Squares Development Method | 1 | With reported loss X = D*Y, the expected value of process variance is EVPV = Va…; The prior mean ultimate loss for a year with changed coverage is the average ul… |
| ODP Bootstrap Model | 1 | Negative incremental losses cause problems in an over-dispersed Poisson bootstr… |
| PDLD Ratio | 1 | PDLD ratios derived from the retrospective rating formula are more stable than … |
| Parameter Risk | 1 | Parameter variance is the square of the parameter standard deviation of the res… |
| Process Risk | 1 | Process variance of the total reserve equals reserve × σ², so the process stand… |

## Every question

<details><summary><code>cas7-2012-q1</code> · gap</summary>

Tagged pages: Benktander Method, Bornhuetter-Ferguson Method, Chain Ladder Method

| Item | Kind | Status | Where |
|---|---|---|---|
| The chain ladder ultimate loss equals paid (reported) loss to date times the cumulative loss development factor to ultimate. | formula | tagged | Chain Ladder Method: “$$U_{\text{AY}} = C_{\text{AY},\,n} \times \text{CDF}_{n \to \text{ult}}$$” |
| The Bornhuetter-Ferguson ultimate equals losses to date plus the expected ultimate loss (expected loss ratio times premium) times the perce… | formula | tagged | Bornhuetter-Ferguson Method: “$$U_{\text{BF}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) \times U_{0}$$” |
| The Benktander (iterated BF) ultimate equals losses to date plus the BF ultimate times the percent unpaid (q = 1 - 1/CDF); equivalently q^2… | formula | tagged | Benktander Method: “$$U_{\text{GB}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) U_{\text{BF}}$$” |
| The percent unpaid (q) equals 1 minus the reciprocal of the cumulative development factor, and the percent paid (p) equals 1/CDF. | definition | tagged | Benktander Method: “$C$ is reported (or paid) losses to date, $p = 1/\text{CDF}$ is the percentage developed, and $q = …” |
| A cumulative LDF from a later age to ultimate is found by dividing the age-to-ultimate factor at the earlier age by the age-to-age link rat… | procedure | linked | Cumulative Development Factor: “CDFs are built **backwards from the tail**: start with the tail factor, multiply in each successive…” |
| When re-evaluating one year later, update the paid to date to include the new incremental paid loss and use the CDF for the next age (e.g.,… | procedure | missing |  |

</details>

<details><summary><code>cas7-2012-q10</code> · gap</summary>

Tagged pages: Cape Cod Method, Reinsurance, Bornhuetter-Ferguson Method, Losses-Occurring-During and Risks-Attaching, Reinsurance Reserving

| Item | Kind | Status | Where |
|---|---|---|---|
| Remove commission, brokerage and internal expenses from treaty premium (multiply by one minus the expense ratio) before using it as the exp… | procedure | missing |  |
| Allocate treaty premium to accident years according to the coverage basis (loss occurring vs. policies written) and the policy term and uni… | procedure | tagged | Losses-Occurring-During and Risks-Attaching: “An LOD contract covers every loss that occurs between its inception and expiration dates, whenever …” |
| The percent reported at a given maturity equals the reciprocal of the age-to-ultimate loss development factor (1/CDF). | formula | tagged | Cape Cod Method (collapsed): “\\| $2022$ \\| $36$ mo \\| $7{,}000$ \\| $1{,}750$ \\| $1.084$ \\| $92.3\%$ \\|” |
| Stanard-Bühlmann used-up (on-level) premium is the sum over accident years of premium times the percent reported for that year's maturity; … | formula | tagged | Cape Cod Method: “$$\text{ELR} = \frac{\sum_i C_i}{\sum_i \text{EP}_i \times \tfrac{1}{\text{CDF}_i}}$$” |
| Stanard-Bühlmann IBNR equals ELR times premium times (1 − percent reported), i.e., (1 − 1/CDF); ultimate loss equals reported losses plus I… | formula | tagged | Cape Cod Method: “$$\text{IBNR}_i = \text{ELR} \times \text{EP}_i \times \left(1 - \tfrac{1}{\text{CDF}_i}\right)$$” |
| Combine multiple treaties by pooling their premiums, used-up premiums and reported losses to estimate a single ELR and IBNR. | procedure | tagged | Cape Cod Method: “The ELR is estimated as total reported losses over total *used-up* (on-level, developed) premium ac…” |
| The chain ladder method is preferred over Stanard-Bühlmann when premium is difficult to bring to a common rate level or net of expenses, si… | fact | tagged | Cape Cod Method: “Premium **must be on level** and losses must be trended to a common cost level before the ELR is co…” |
| Stanard-Bühlmann is preferred over chain ladder when reported losses fluctuate but the expected loss ratio to on-level premium is expected … | fact | missing |  |
| The key innovation of Stanard-Bühlmann over Bornhuetter-Ferguson is that the expected loss ratio is estimated from the actual loss experien… | fact | tagged | Cape Cod Method: “The whole difference between the two methods is **where the a priori comes from**: BF imports it, C…” |

</details>

<details><summary><code>cas7-2012-q11</code> · gap</summary>

Tagged pages: Reinsurance, Loss Reserving, Bordereau, Reinsurance Reserving

| Item | Kind | Status | Where |
|---|---|---|---|
| Reinsurers face longer claim reporting lags than primary insurers because claims pass through a long pipeline (cedent claim system, cedent … | fact | tagged | Bordereau: “Bordereau delays are one of Friedland's reasons that reinsurance reporting and payment patterns are…” |
| Cedents often do not report a claim to the reinsurer until it reaches a reporting threshold (e.g., a fraction of the attachment point), and… | fact | tagged | Reinsurance Reserving: “Excess claims arrive later still, once they approach the retention or a reporting threshold.” |
| Reinsurance loss data show persistent upward development because of inflation, cedents booking large claims at a modal value when first rep… | fact | missing |  |
| Reinsurance data are heterogeneous because reporting and development patterns vary by line, contract type and attachment point, so combinin… | fact | tagged | Reinsurance Reserving: “Reporting lags are longer, data are thinner and less homogeneous, contracts are manuscript, results…” |
| Industry statistics (e.g., Schedule P, ISO) are of limited use for reinsurance reserving because they are not broken down into homogeneous … | fact | tagged | Reinsurance Reserving: “External patterns such as RAA data help but mix unlike contracts.” |
| Reports reaching reinsurers often lack key information, such as only summary claim detail or calendar-year or underwriting-year rather than… | fact | tagged | Reinsurance Reserving: “Data often arrive as summary reports rather than claim detail” |
| Reinsurers' data coding and IT systems often cannot keep pace with the complex, changing data needs of reinsurance, delaying capture of cla… | fact | missing |  |

</details>

<details><summary><code>cas7-2012-q2</code> · answerable</summary>

Tagged pages: Cape Cod Method, Maximum Likelihood Estimation, Coefficient of Variation, Process Risk, Growth Curve, Prediction Error

| Item | Kind | Status | Where |
|---|---|---|---|
| The fitted paid emergence pattern gives the cumulative percentage of ultimate loss expected to be paid by each evaluation date, so the unpa… | definition | tagged | Growth Curve: “giving the expected cumulative proportion of ultimate loss reported (or paid) at age $x$” |
| The Cape Cod (Stanard-Bühlmann) expected loss ratio equals total cumulative paid (or reported) loss divided by total used-up on-level premi… | formula | tagged | Cape Cod Method: “The ELR is estimated as total reported losses over total *used-up* (on-level, developed) premium ac…” |
| The Cape Cod reserve (IBNR) for each accident year equals the Cape Cod ELR times on-level premium times (1 minus percent paid); the total r… | formula | tagged | Cape Cod Method: “$$\text{IBNR}_i = \text{ELR} \times \text{EP}_i \times \left(1 - \tfrac{1}{\text{CDF}_i}\right)$$” |
| In the Clark-type loss development variance framework, the process variance of the reserve equals the scale parameter σ² times the estimate… | formula | tagged | Process Risk: “$$\mathrm{Var}_{\text{process}}(R) = \sigma^2 \sum \mu_{AY;x,y}$$” |
| Total variance of a reserve estimate equals process variance plus parameter variance; standard deviations are not added directly, so total … | fact | tagged | Prediction Error: “$$E\big[(R - \hat R)^2\big] = \underbrace{\mathrm{Var}(R)}_{\text{process}} + \underbrace{E\big[(\h…” |
| The coefficient of variation of a reserve estimate is its standard deviation divided by its mean (the reserve estimate). | definition | tagged | Coefficient of Variation: “The **Coefficient of Variation** $CV$ is the ratio of the standard deviation to the mean, measuring…” |

</details>

<details><summary><code>cas7-2012-q3</code> · gap</summary>

Tagged pages: Chain Ladder Method, Development Factor, Mack Chain Ladder Model, Chain Ladder Assumptions

| Item | Kind | Status | Where |
|---|---|---|---|
| The volume-weighted average age-to-age factor is the sum of cumulative losses at the later age divided by the sum of cumulative losses at t… | formula | tagged | Development Factor: “**Volume-weighted average**: $\Sigma(\text{col }n{+}1) / \Sigma(\text{col }n)$ — gives more credibi…” |
| Mack's weighted residual for a development period is (C_{i,k+1} - f_k * C_{ik}) / sqrt(C_{ik}), i.e. actual minus expected next-period cumu… | formula | missing |  |
| Compute the expected next-period cumulative loss for each accident year by multiplying its current cumulative loss by the selected age-to-a… | procedure | tagged | Chain Ladder Method: “U_{\text{AY}} = C_{\text{AY},\,n} \times \text{CDF}_{n \to \text{ult}}” |
| To diagnose chain ladder assumptions, plot the weighted residuals on the vertical axis against the cumulative loss at the earlier age (or a… | procedure | missing |  |
| Mack's chain ladder variance assumption (variance of the next-period loss proportional to the cumulative loss at the prior age) is supporte… | fact | missing |  |

</details>

<details><summary><code>cas7-2012-q4</code> · gap</summary>

Tagged pages: Loss Development, Credibility, Linear Regression, Least Squares Development Method

| Item | Kind | Status | Where |
|---|---|---|---|
| The least squares estimator for a linear relation y = a + b x fits slope b-hat = (mean(xy) - mean(x)*mean(y)) / (mean(x^2) - mean(x)^2) and… | formula | tagged | Least Squares Development Method: “$$b = \frac{\overline{xy} - \bar{x}\,\bar{y}}{\overline{x^2} - \bar{x}^2}$$” |
| To predict the latest accident year's later-age loss ratio by least squares, fit a linear regression of later-age loss ratios on earlier-ag… | procedure | tagged | Least Squares Development Method: “**Least squares development** estimates a later value $y$ of an accident year's losses from its cur…” |
| The link ratio (chain ladder) estimate of a later-age loss ratio is x times the ratio of the average later-age loss ratio to the average ea… | formula | tagged | Least Squares Development Method: “$b = 0$ is the budgeted loss method, $L(x) = k$, as in the [[Expected Loss Method\\|expected loss me…” |
| The least squares estimate equals a credibility-weighted average of the link ratio estimate (weight Z) and the budgeted loss ratio estimate… | fact | tagged | Least Squares Development Method: “With $c = \bar{y}/\bar{x}$ as the link ratio and $Z = b/c$, the fit is $L(x) = Z\,(cx) + (1 - Z)\,\…” |
| A simple arithmetic average of two methods corresponds to a credibility weight Z = 1/2, so it is optimal only if the least squares credibil… | fact | missing |  |

</details>

<details><summary><code>cas7-2012-q5</code> · answerable</summary>

Tagged pages: Chain Ladder Method, Development Factor, Mack Chain Ladder Model, Chain Ladder Assumptions, Calendar Year Effect, Development Factor Correlation Test

| Item | Kind | Status | Where |
|---|---|---|---|
| Mack's first chain ladder assumption: the expected cumulative loss at the next age, given the accident year's prior cumulative losses, equa… | fact | tagged | Mack Chain Ladder Model: “$$E(C_{i,k+1} \mid C_{i1}, \dots, C_{ik}) = C_{ik}\,f_k$$” |
| Mack's second chain ladder assumption: losses from different accident years are independent of each other. | fact | tagged | Chain Ladder Assumptions: “The second, independence, says $c(w,d)$ and $c(v,g)$ are independent unless $v = w$; a strong diago…” |
| Mack's third chain ladder assumption: the variance of the next-period cumulative loss, given prior losses, is proportional to the cumulativ… | fact | tagged | Mack Chain Ladder Model: “$$\text{Var}(C_{i,k+1} \mid C_{i1}, \dots, C_{ik}) = C_{ik}\,\alpha_k^2$$” |
| Calendar year effects, such as a change in claims processing speed, affect all accident years along a diagonal and so violate Mack's accide… | fact | tagged | Calendar Year Effect: “is an influence that acts on every accident year in the same calendar period, and so on one diagona…” |
| Volume-weighted all-year average development factors are the minimum-variance estimators under Mack's variance assumption, so using them is… | fact | tagged | Mack Chain Ladder Model: “it weights the individual factors by $C_{jk}$, which gives the [[Minimum Variance\\|minimum-variance…” |
| Correlation between successive development factor columns (e.g., a high factor followed by a low one) means development depends on earlier … | fact | tagged | Development Factor Correlation Test: “Under Mack's assumption $E(C_{i,k+1} \mid C_{i1}, \dots, C_{ik}) = C_{ik}f_k$, the expected next fa…” |

</details>

<details><summary><code>cas7-2012-q6</code> · answerable</summary>

Tagged pages: Deductible, Development Factor, Excess Loss Development Factor, Layer of Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| A multi-period age-to-age development factor is obtained by multiplying the successive age-to-age factors across the interval, done separat… | procedure | tagged | Excess Loss Development Factor: “The relativity ratios telescope, so the 12-to-ultimate factors come straight from the end points:” |
| The limited severity relativity R^L at age t is the ratio of expected limited (below-deductible/retention) losses to total unlimited losses… | definition | tagged | Excess Loss Development Factor: “$R^L_t = E[X \wedge L]/E[X]$ is the [[Loss Elimination Ratio\\|loss elimination ratio]] of the deduc…” |
| The unlimited development factor from age t to a later age equals the limited LDF weighted by the starting-age relativity R^L plus the exce… | formula | tagged | Excess Loss Development Factor: “$$\text{LDF}_t = R^L_t \, \text{LDF}^L_t + (1 - R^L_t) \, \text{XSLDF}^L_t$$” |
| The limited LDF from age t1 to t2 relates to the unlimited LDF by LDF^L = LDF × R^L_{t2}/R^L_{t1}, so the unlimited LDF = LDF^L × R^L_{t1}/… | formula | tagged | Excess Loss Development Factor: “$$\text{LDF}^L_t = \text{LDF}_t \times \frac{R^L}{R^L_t}$$” |
| When weighting limited and excess factors over a multi-period interval, the relativity used is the one at the beginning age of the interval… | fact | tagged | Excess Loss Development Factor: “The weights in the balance equation are the relativities at the **starting** age $t$.” |

</details>

<details><summary><code>cas7-2012-q7</code> · gap</summary>

Tagged pages: Retrospective Rating, PDLD Ratio, Retrospective Premium Reserve

| Item | Kind | Status | Where |
|---|---|---|---|
| Retrospective premium = (basic premium + capped (limited) losses × loss conversion factor) × tax multiplier. | formula | tagged | Retrospective Rating: “$$R = \left(\text{BP} + L \times \text{LCF}\right) \times \text{TM}$$” |
| Standard premium is estimated by dividing expected unlimited loss by the expected loss ratio, and basic premium is the basic premium factor… | procedure | tagged | Retrospective Rating: “It is expressed as a basic premium factor times standard premium.” |
| Expected capped loss for each retro adjustment period equals expected unlimited loss times the percent of loss emerged in that period times… | procedure | missing |  |
| When no retro adjustment has yet occurred, the total expected capped loss is the sum across all adjustment periods of the emerged-loss-weig… | procedure | missing |  |
| The retrospective premium asset (accrual) is the estimated total retrospective premium including all future adjustments minus the premium c… | definition | tagged | Retrospective Premium Reserve: “$$\text{Premium asset} = \text{Expected ultimate premium} - \text{Premium booked}$$” |
| Paid development loss development (PDLD) factor for the first period is the basic premium component, (BP × TM)/(SP × %loss × ELR), plus cap… | formula | tagged | Retrospective Premium Reserve: “$$\text{PDLD}_1 = \frac{\text{BPF} \times \text{TM}}{\text{ELR} \times \%L_1} + \frac{CL_1}{L_1}\,\…” |

</details>

<details><summary><code>cas7-2012-q8</code> · gap</summary>

Tagged pages: Bayesian, Bornhuetter-Ferguson Method, Chain Ladder Method, Bayesian Bornhuetter-Ferguson Model, Over-Dispersed Poisson Model

| Item | Kind | Status | Where |
|---|---|---|---|
| In the Bayesian (Verrall/Bayesian-CL-BF credibility) model with over-dispersed Poisson incremental losses, the expected incremental loss is… | formula | missing |  |
| The credibility factor is Z = (cumulative proportion of ultimate reported to date) / (β·φ + cumulative proportion reported), where β is the… | formula | tagged | Bayesian Bornhuetter-Ferguson Model: “$$Z_{ij} = \frac{\sum_{k=1}^{j-1} y_k}{\beta_i\,\phi + \sum_{k=1}^{j-1} y_k}$$” |
| The prior mean of the gamma distribution is α/β, which gives the expected ultimate losses x_i for the accident year (used as the BF a prior… | fact | tagged | Bayesian Bornhuetter-Ferguson Model: “$$E[x_i] = M_i = \frac{\alpha_i}{\beta_i}$$” |
| Compute the cumulative development factor to ultimate by multiplying the selected age-to-age link ratios from the given age through the las… | procedure | linked | Cumulative Development Factor: “**Cumulative Development Factor** (CDF, or age-to-ultimate factor) is the product of all selected […” |
| The percent of ultimate losses reported at a given age (the cumulative proportion of ultimate emerged) equals the reciprocal of the cumulat… | definition | linked | Cumulative Development Factor: “The reciprocal is the **percentage reported** (or paid): $p_n = 1/\text{CDF}_n$, and $1 - p_n$ is t…” |
| The chain ladder incremental loss estimate for the next period equals cumulative losses to date times (age-to-age factor − 1). | formula | linked | Over-Dispersed Negative Binomial Model: “$$E[C_{ij} \mid D_{i,j-1}] = (\lambda_j - 1)\,D_{i,j-1}$$” |
| The Bayesian model is a credibility-weighted average of the chain ladder estimate (weight Z) and the Bornhuetter-Ferguson estimate (weight … | fact | tagged | Bayesian Bornhuetter-Ferguson Model: “A small $\beta_i$, a vague prior, pushes $Z_{ij}$ toward $1$, the chain ladder.” |

</details>

<details><summary><code>cas7-2013-q1</code> · answerable</summary>

Tagged pages: Chain Ladder Method, Age to Age Factor, Calendar Year, Calendar Year Effect

| Item | Kind | Status | Where |
|---|---|---|---|
| A calendar year effect is a change affecting all accident years' development in the same calendar year (a diagonal of the triangle), violat… | definition | tagged | Calendar Year Effect: “**Calendar Year Effect** (diagonal effect) is an influence that acts on every accident year in the …” |
| To test for calendar year effects, rank the age-to-age factors within each development column, label each factor as larger (L) or smaller (… | procedure | tagged | Calendar Year Effect: “In each column, factors above the [[Median\\|median]] are L and below it are S; with an odd count th…” |
| For each calendar-year diagonal with at least two non-excluded elements, count the S and L labels and set the diagonal's test statistic Z_n… | procedure | tagged | Calendar Year Effect: “$$Z_j = \min(L_j,\ S_j)$$” |
| For a diagonal with n non-excluded elements, m = floor((n-1)/2), c_n = C(n-1, m)·n/2^n, and E[Z_n] = n/2 − c_n. | formula | tagged | Calendar Year Effect: “$$E(Z_j) = \frac{n}{2} - \binom{n-1}{m}\frac{n}{2^n}$$” |
| Var[Z_n] = n(n−1)/4 − (n−1)c_n + E[Z_n] − (E[Z_n])^2. | formula | tagged | Calendar Year Effect: “$$\text{Var}(Z_j) = \frac{n(n-1)}{4} - \binom{n-1}{m}\frac{n(n-1)}{2^n} + E(Z_j) - E(Z_j)^2$$” |
| Sum E[Z_n] and Var[Z_n] across diagonals to get the total mean and variance (diagonals independent), form a confidence interval of total E[… | procedure | tagged | Calendar Year Effect: “$Z$ is treated as Normal, and "no calendar year effect" is rejected at 5% if $Z$ falls outside $E(Z…” |
| Calendar year effects can be caused by changes in claim handling or case reserving practices, inflation or trend changes, and legislative o… | fact | tagged | Calendar Year Effect: “Examples are a major change in [[Claims Processing Changes\\|claims handling]] or [[Case Adequacy\\|c…” |

</details>

<details><summary><code>cas7-2013-q10</code> · gap</summary>

Tagged pages: Cape Cod Method, Credibility, Chain Ladder Method

| Item | Kind | Status | Where |
|---|---|---|---|
| Used-up premium for an accident year equals its adjusted (on-level, trended) premium multiplied by the percentage of losses reported (the r… | definition | tagged | Cape Cod Method: “**Used-up premium** $\text{EP}_i / \text{CDF}_i$ is the share of each year's premium "exposed" to t…” |
| The Stanard-Bühlmann expected loss ratio equals total reported losses across all accident years divided by total used-up premium across all… | formula | tagged | Cape Cod Method: “$$\text{ELR} = \frac{\sum_i C_i}{\sum_i \text{EP}_i \times \tfrac{1}{\text{CDF}_i}}$$” |
| Stanard-Bühlmann IBNR for an accident year equals the expected loss ratio times adjusted premium times the percentage unreported (1 minus r… | formula | tagged | Cape Cod Method: “$$\text{IBNR}_i = \text{ELR} \times \text{EP}_i \times \left(1 - \tfrac{1}{\text{CDF}_i}\right)$$” |
| Chain ladder IBNR equals reported loss times (LDF minus 1), where the LDF is the reciprocal of the percentage reported (report lag). | formula | tagged | Chain Ladder Method: “$$\text{IBNR} = U_{\text{AY}} - C_{\text{AY},\,n}$$” |
| Credibility-weighted IBNR equals Z times the chain ladder IBNR plus (1 minus Z) times the Stanard-Bühlmann IBNR, with Z computed for each a… | procedure | linked | Bornhuetter-Ferguson Method: “BF is a **credibility weighting** in disguise: it equals $Z \, U_{\text{CL}} + (1-Z)\,U_0$ with $Z …” |
| When credibility is a linear function of report lag, an accident year's Z equals the given credibility factor times its percentage reported… | fact | missing |  |
| Compared with the chain ladder method, Stanard-Bühlmann gives more stable IBNR estimates for immature years because it relies on an expecte… | fact | tagged | Cape Cod Method: “Premium **must be on level** and losses must be trended to a common cost level before the ELR is co…” |

</details>

<details><summary><code>cas7-2013-q13</code> · untagged</summary>

Tagged pages: Unpaid Claims, Risk Margin

| Item | Kind | Status | Where |
|---|---|---|---|
| Catastrophe events (or changes in catastrophe frequency/severity) increase the uncertainty of property unpaid claim estimates, especially w… | fact | linked | External Systemic Risk: “**Event**: single events causing many claims, material for property and motor, and for medical malp…” |
| Changes in costs of materials and replacement costs (e.g., from fuel prices or supply chain changes) make property claim settlement values … | fact | linked | External Systemic Risk: “**Economic and social**: standard inflation (AWE and CPI), economic conditions, fuel prices, drivin…” |
| Changes in reinsurance protection (such as purchasing excess of loss on some lines or dropping treaties on others) change the net retained … | fact | elsewhere | Net of Reinsurance: “Net experience is **less volatile** than gross — excess-of-loss reinsurance caps exactly the [[Larg…” |
| Legal or legislative changes (e.g., to benefit levels) are a risk source that can increase uncertainty in long-tailed lines such as workers… | fact | linked | External Systemic Risk: “**Legislative, political and claims inflation**: legislative change and its erosion, court preceden…” |
| Inflation is a major source of risk for long-tailed lines because claims stay open a long time and inflationary pressure can cause upward d… | fact | linked | External Systemic Risk: “Event risk tends to dominate property premium liabilities, and legislative, political and claims in…” |
| Latent exposures (e.g., asbestos) and late-reported claims in the pipeline are risk sources that can cause underestimation of unpaid claim … | fact | linked | External Systemic Risk: “**Latent claim**: claims from a source not currently thought to be covered; material mainly for wor…” |

</details>

<details><summary><code>cas7-2013-q2</code> · answerable</summary>

Tagged pages: Credibility, Loss Ratio, Bornhuetter-Ferguson Method, Credible Loss Ratio Reserve

| Item | Kind | Status | Where |
|---|---|---|---|
| In the Individual Loss Ratio (Benktander/Hovinen-type reserving per Mack-style) method, the reserve for an accident year is R_ind = (q_i/p_… | formula | tagged | Credible Loss Ratio Reserve: “$$R_i^{ind} = \frac{q_i}{p_i}\,C_{i,n-i+1}$$” |
| The incremental loss ratio for development period k is m_k = (sum of incremental losses at that development period across accident years th… | formula | tagged | Credible Loss Ratio Reserve: “$m_k$ is the **incremental loss ratio** of development period $k$: the paid claims $S_{ik}$ of that…” |
| The proportion of ultimate loss developed to date for an accident year is p_i = (sum of m_k for periods observed to date) / (sum of all m_k… | formula | tagged | Credible Loss Ratio Reserve: “$p_i = \sum_{k \le n-i+1} m_k \big/ \sum_k m_k$ is the **loss ratio payout factor**, the expected s…” |
| Accident years that are fully developed (p = 1, q = 0) contribute zero reserve, and the total reserve is the sum of the accident-year reser… | procedure | tagged | Credible Loss Ratio Reserve: “$p_i = \sum_{k \le n-i+1} m_k \big/ \sum_k m_k$ is the **loss ratio payout factor**, the expected s…” |
| The collective loss ratio reserve for an accident year is R_coll = q_i × U_i^BC, where the a priori (budget) ultimate is U_i^BC = premium V… | formula | tagged | Credible Loss Ratio Reserve: “$$R_i^{coll} = q_i\,V_i\sum_{k=1}^{n} m_k$$” |
| The collective loss ratio method ignores actual paid losses to date and uses only the premium, the expected loss ratio and the unpaid propo… | fact | tagged | Credible Loss Ratio Reserve: “The **individual** loss ratio reserve grosses up the period's own paid claims, like the [[Chain Lad…” |

</details>

<details><summary><code>cas7-2013-q3</code> · answerable</summary>

Tagged pages: Maximum Likelihood Estimation, Residual Plot, Growth Curve, Process Risk

| Item | Kind | Status | Where |
|---|---|---|---|
| In the Clark LDF method, the loss emergence growth function G(x) is a parametric curve (e.g., Weibull G(x)=1-exp(-(x/θ)^ω)) giving the expe… | formula | tagged | Growth Curve: “**Growth curve** $G(x \mid \omega, \theta)$ is a smooth parametric curve, in the form of a cumulati…” |
| Evaluate the growth function at the average accident date age (mid-point of the period, e.g., 6, 18, 30 months for evaluation ages 12, 24, … | procedure | tagged | Growth Curve: “The age $x$ runs from the *average* accident date to the evaluation date, so an [[Accident Year\\|ac…” |
| In the Clark LDF method, the ultimate loss estimate equals cumulative paid loss to date divided by G(x) at the current age (LDF = 1/G(x)), … | formula | tagged | Growth Curve: “the age-to-ultimate factor is its reciprocal.” |
| Check whether the LDF should be truncated by evaluating G at a far-out age; if G there is reasonably close to 1, no truncation is needed (o… | procedure | tagged | Growth Curve: “To avoid relying on a mechanical extrapolation, Clark truncates at a selected age $x_T$ (240 months…” |
| Expected incremental loss in a period from age x to y for an accident year is μ = Ultimate × [G(y) − G(x)], and actual and expected increme… | formula | tagged | Growth Curve: “The expected increment between ages $x$ and $y$ is $\text{ULT}_{AY}[G(y) - G(x)]$ in Clark's LDF me…” |
| The scale factor is σ² = (1/(n−p)) Σ (c−μ)²/μ, where n is the number of incremental data points and p is the number of parameters (two grow… | formula | tagged | Process Risk: “There are $n$ increments in the data and $p$ fitted parameters: $3$ for Clark's [[Cape Cod Method\\|…” |
| Process variance of the total reserve equals reserve × σ², so the process standard deviation is √(R σ²) (the square root must be taken). | formula | tagged | Process Risk (collapsed): “Each year's process variance is $\sigma^2$ times its reserve:” |
| Normalized residual = (actual incremental − expected incremental) / √(σ² × expected incremental). | formula | tagged | Process Risk: “The same $\sigma^2$ scales the normalized residuals $(c - \hat\mu)/\sqrt{\sigma^2\hat\mu}$ used to …” |
| If the model fits well, normalized residuals plotted against age of emergence should scatter randomly around zero; a systematic pattern (e.… | fact | tagged | Residual Plot: “\\| Random scatter around zero \\| Model is adequate \\|” |

</details>

<details><summary><code>cas7-2013-q4</code> · answerable</summary>

Tagged pages: Benktander Method, Bornhuetter-Ferguson Method, Chain Ladder Method

| Item | Kind | Status | Where |
|---|---|---|---|
| The Benktander (iterated BF) ultimate equals the case-incurred/paid-to-date amount plus the expected unreported (unpaid) percentage times t… | formula | tagged | Benktander Method: “$$U_{\text{GB}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) U_{\text{BF}}$$” |
| The Bornhuetter-Ferguson ultimate equals actual reported (paid) loss to date plus the a priori expected ultimate times the percent unreport… | formula | tagged | Bornhuetter-Ferguson Method: “$$U_{\text{BF}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) \times U_{0}$$” |
| The percent unreported q equals 1 − 1/CDF (where percent reported/paid p = 1/CDF) for the cumulative development factor to ultimate. | definition | linked | Cumulative Development Factor: “The reciprocal is the **percentage reported** (or paid): $p_n = 1/\text{CDF}_n$, and $1 - p_n$ is t…” |
| The chain ladder ultimate equals the loss to date multiplied by the cumulative development factor to ultimate: U_CL = C × CDF. | formula | tagged | Chain Ladder Method: “$$U_{\text{AY}} = C_{\text{AY},\,n} \times \text{CDF}_{n \to \text{ult}}$$” |
| Iterating the BF method repeatedly (Benktander with more iterations) converges to the chain ladder ultimate as the number of iterations app… | fact | tagged | Benktander Method: “Repeating $R = qU$ then $U = C + R$ from $U_0$ gives $U^{(m)} = (1 - q^m)\,U_{\text{CL}} + q^m U_0$…” |

</details>

<details><summary><code>cas7-2013-q5</code> · answerable</summary>

Tagged pages: Limited Expected Value, Exponential Distribution, Loss Trend, Layer Development Factor

| Item | Kind | Status | Where |
|---|---|---|---|
| To put claim size distributions from different accident years on a common cost level (Sahasrabuddhe), de-trend the latest-year unlimited me… | procedure | tagged | Layer Development Factor: “for a scale family such as the [[Exponential Distribution\\|exponential]], $\theta_{i,j} = \theta_{n…” |
| Adjust each triangle cell to the basic limit at the target (latest accident year) cost level by multiplying the reported unlimited loss by … | procedure | tagged | Layer Development Factor: “Restate each cell of the triangle, observed in layer $L$, to the basic limit at the latest cost lev…” |
| The limited expected value of an exponential distribution with mean θ at limit k is E[X∧k] = θ(1 − e^(−k/θ)). | formula | tagged | Limited Expected Value: “\\| Exponential$(\theta)$ \\| $\theta(1 - e^{-u/\theta})$ \\|” |
| Calendar-period trend at a constant annual rate compounds over the number of years between accident years, so the trend factor between two … | fact | tagged | Loss Trend: “$$\text{Trend Factor} = (1 + t)^{n}$$” |
| The basic-limit LEVs must be computed from the latest accident year's (target cost level) unlimited means at each maturity, not from each a… | fact | tagged | Layer Development Factor: “Sahasrabuddhe derives it from one basic-limit pattern at the latest exposure period's cost level.” |

</details>

<details><summary><code>cas7-2013-q6</code> · answerable</summary>

Tagged pages: Retrospective Rating, PDLD Ratio

| Item | Kind | Status | Where |
|---|---|---|---|
| The PDLD (premium development to loss development) ratio at the first retrospective adjustment equals the retrospective premium at that adj… | formula | tagged | PDLD Ratio: “$$\text{PDLD}_1 = \frac{\text{BP} \times \text{TM}}{L_1} + \frac{CL_1}{L_1} \, \text{LCF} \times \t…” |
| For later adjustments, the PDLD ratio equals the change in capped losses divided by the change in losses between adjustments (incremental c… | formula | tagged | PDLD Ratio: “$$\text{PDLD}_n = \frac{CL_n - CL_{n-1}}{L_n - L_{n-1}} \, \text{LCF} \times \text{TM}$$” |
| Expected losses emerged at a given loss age equal expected ultimate losses (standard premium × expected loss ratio) divided by the LDF to u… | procedure | linked | Retrospective Premium Reserve: “$CL/L$ is the **loss capping ratio**, the share of loss development that the per-accident limit and…” |
| The loss capping ratio is the ratio of losses capped by the per-occurrence limit and maximum premium to total (uncapped) losses, and it is … | definition | linked | Retrospective Premium Reserve: “$CL/L$ is the **loss capping ratio**, the share of loss development that the per-accident limit and…” |
| Only losses that remain within the per-occurrence limit and maximum premium generate additional retrospective premium, so premium responsiv… | fact | tagged | PDLD Ratio: “Later ratios are the incremental loss capping ratio times $\text{LCF} \times \text{TM}$. They are u…” |

</details>

<details><summary><code>cas7-2013-q7</code> · gap</summary>

Tagged pages: Bootstrap, Generalized Linear Model, Link Function, ODP Bootstrap Model, Data Issues

| Item | Kind | Status | Where |
|---|---|---|---|
| To build the GLM bootstrap input, convert the cumulative loss triangle to an incremental triangle by differencing successive cumulative val… | procedure | missing |  |
| With a log link, the expected incremental loss is modeled as ln(m_{w,d}) = eta_{w,d}, so the log-link triangle is formed by taking the natu… | formula | linked | Over-Dispersed Poisson Model: “$$\ln m_{w,d} = c + \alpha_w + \beta_d$$” |
| The GLM bootstrap model requires non-negative incremental losses because the log of a negative number (or zero) is undefined, so negative i… | fact | missing |  |
| If a column of incremental losses has a negative sum, the negative-incremental fix of using -ln(\|incremental\|) fails (it requires the col… | procedure | tagged | Data Issues: “a modified log link handles them unless a whole column sums negative, which needs a constant shift” |
| To handle negative incrementals when the -ln(\|x\|) method fails, shift every incremental value in the whole triangle by subtracting the la… | procedure | missing |  |
| After fitting the GLM to the shifted triangle, undo the shift by subtracting the same shift amount from every fitted incremental value. | procedure | missing |  |

</details>

<details><summary><code>cas7-2013-q8</code> · untagged</summary>

Tagged pages: Coefficient of Variation, Correlation, Independent Risk, Internal Systemic Risk, External Systemic Risk, Risk Margin

| Item | Kind | Status | Where |
|---|---|---|---|
| Independent risk CoV for a combined book, assuming independent risks across lines, is the square root of the sum of squared (reserve-weight… | formula | tagged | Independent Risk: “$$\mathrm{CoV}_{\text{ind}} = \frac{\sqrt{\sum_i (w_i\,\mathrm{CoV}_i)^2}}{\sum_i w_i}$$” |
| Internal systemic risk CoV for a combined book is the square root of the double sum over line pairs of correlation × (weight_i × CoV_i)(wei… | formula | tagged | Internal Systemic Risk: “$$\mathrm{CoV}_{\text{int}} = \frac{\sqrt{\sum_i\sum_j \rho_{ij}\,(w_i c_i)(w_j c_j)}}{\sum_i w_i}$$” |
| Consolidated CoV across the three sources of risk (independent, internal systemic, external systemic) is the square root of the sum of thei… | formula | tagged | Risk Margin: “The three sources are taken as independent, so $\mathrm{CoV}^2 = \mathrm{CoV}_{\text{ind}}^2 + \mat…” |
| With normally distributed liabilities, the risk margin for a target probability of adequacy equals the z-value × total CoV × central estima… | formula | tagged | Risk Margin: “Under a normal distribution the margin is $z_p \times \mathrm{CoV} \times$ the central estimate.” |
| Internal systemic risk is the risk internal to the valuation modeling process (data errors, specification error, parameter selection error,… | definition | tagged | Internal Systemic Risk: “**Internal systemic risk** is the uncertainty that arises because the actuarial valuation models ar…” |
| A higher correlation between lines raises the combined internal systemic CoV (less diversification), which raises the total CoV and hence t… | fact | tagged | Risk Margin: “Under a normal distribution the margin is $z_p \times \mathrm{CoV} \times$ the central estimate.” |
| Internal benchmarking of selected CoVs by line: independent risk (process and parameter risk) should be higher for more complex or longer-t… | fact | tagged | Independent Risk: “By the law of large numbers, larger portfolios have lower independent CoVs, and longer run-off leav…” |
| External systemic risk includes economic and social risk, legislative and political risk, claims inflation, claims management process risk,… | definition | tagged | External Systemic Risk: “**Economic and social**: standard inflation (AWE and CPI), economic conditions, fuel prices, drivin…” |
| Constant correlation across the loss distribution fails when lines are correlated mainly in the tails, as with event or catastrophe risk (e… | fact | elsewhere | Risk Diversification: “Correlations estimated in normal times tend to rise in a crisis, when a market fall, credit default…” |
| To incorporate variable correlation into the risk margin, use a copula or scenario-based or mixture approach (e.g. simulation with a tail-d… | procedure | elsewhere | Risk Diversification: “A copula joins the marginal distributions and can give the tails more dependence than the body.” |

</details>

<details><summary><code>cas7-2013-q9</code> · answerable</summary>

Tagged pages: Bayesian, Chain Ladder Method, Predictive Distribution, Over-Dispersed Negative Binomial Model, Mack Chain Ladder Model, Prediction Error, Stochastic Reserving

| Item | Kind | Status | Where |
|---|---|---|---|
| In a Bayesian chain-ladder model, a prior with a large variance is weakly informative, so the posterior parameters are driven mainly by the… | fact | tagged | Predictive Distribution: “Priors with large variances reproduce the [[Chain Ladder Method\\|chain ladder]], and priors with ve…” |
| To incorporate a judgmental link ratio selection with low confidence, set the mean of that interval's prior link ratio distribution equal t… | procedure | tagged | Over-Dispersed Negative Binomial Model: “Its prior mean is the expert's factor, and its variance $W$ is set to reflect the strength of the o…” |
| Using an expert-opinion prior with a large variance pulls the simulated mean for that link ratio toward the selection, and the greater unce… | fact | tagged | Over-Dispersed Negative Binomial Model: “Its prior mean is the expert's factor, and its variance $W$ is set to reflect the strength of the o…” |
| Prediction error is the square root of the mean squared error of prediction (MSEP) of the predictive distribution of the reserve estimate. | definition | tagged | Prediction Error: “**Prediction error** of a reserve is the root mean squared error of the estimate $\hat R$ as a fore…” |
| Compared with bootstrapping, a Bayesian approach readily allows expert opinion to be incorporated into parameter selection through the prio… | fact | tagged | Predictive Distribution: “Expert opinion enters through the prior distributions, either on individual development factors or …” |
| Compared with the Mack method, which gives only the first two moments (mean and variance), a Bayesian approach produces the full predictive… | fact | tagged | Stochastic Reserving: “**Mack:** distribution-free. It gives the first two moments of the chain ladder reserve, and no mor…” |
| To adapt the Bayesian chain-ladder model to the Bornhuetter-Ferguson method, add a row (accident year) parameter for each accident year wit… | procedure | linked | Bayesian Bornhuetter-Ferguson Model: “The row parameters $x_i$ of the [[Over-Dispersed Poisson Model\\|over-dispersed Poisson]] model, eac…” |

</details>

<details><summary><code>cas7-2014-q1</code> · gap</summary>

Tagged pages: Loss Development, Bayesian Credibility, Least Squares Development Method

| Item | Kind | Status | Where |
|---|---|---|---|
| The Bayesian (Bornhuetter-Ferguson/Benktander-style credibility) estimate of ultimate loss from reported loss x is L(x) = Z*(x/d) + (1-Z)*E… | formula | tagged | Least Squares Development Method: “$L(x) = Z\,(cx) + (1 - Z)\,\bar{y}$” |
| The credibility Z for the Bayesian loss development estimate equals VHM/(VHM+EVPV), the variance of hypothetical means divided by the sum o… | formula | tagged | Least Squares Development Method: “Brosius's Development Formula 2 gives the theoretical weight $Z = VHM/(VHM + EVPV)$.” |
| With reported loss X = D*Y (D the reporting percentage independent of ultimate Y), the variance of hypothetical means is VHM = (E[D])^2 * V… | formula | missing |  |
| With reported loss X = D*Y, the expected value of process variance is EVPV = Var(D)*[Var(Y) + (E[Y])^2]. | formula | tagged | Least Squares Development Method (collapsed): “EVPV &= E\left[(0.10)^2\,Y^2\right] \\” |
| The prior mean ultimate loss for a year with changed coverage is the average ultimate loss of prior comparable years (with constant exposur… | procedure | tagged | Least Squares Development Method (collapsed): “Before it, ultimate losses of $\$50$M were expected; pricing expects a $30\%$ saving, so $E(Y) = \$…” |
| The least squares development method assumes a stable loss distribution and that year-to-year fluctuation is due mainly to random variation… | fact | tagged | Least Squares Development Method: “The method assumes every year shares one pair of loss and reporting distributions, so it suits rand…” |

</details>

<details><summary><code>cas7-2014-q10</code> · answerable</summary>

Tagged pages: Bayesian, Bornhuetter-Ferguson Method, Chain Ladder Method, Over-Dispersed Negative Binomial Model, Bayesian Bornhuetter-Ferguson Model, Stochastic Reserving

| Item | Kind | Status | Where |
|---|---|---|---|
| In a stochastic (Bayesian) reserving model, expert opinion can override model-calculated row parameters, such as the a priori expected ulti… | fact | tagged | Over-Dispersed Negative Binomial Model: “Intervene in some rows.* If a change in settlement makes an older factor wrong for recent rows, tho…” |
| In a stochastic reserving model, expert opinion can override column or diagonal parameters such as loss development factors, e.g. a claims … | fact | tagged | Over-Dispersed Negative Binomial Model: “If a change in settlement makes an older factor wrong for recent rows, those rows share a separate …” |
| The variance of a gamma distribution with parameters alpha and beta is alpha/beta^2 (mean alpha/beta), so for a fixed mean a larger beta gi… | formula | tagged | Bayesian Bornhuetter-Ferguson Model: “$$E[x_i] = M_i = \frac{\alpha_i}{\beta_i}$$” |
| In the Bayesian (Gamma prior) model the Bornhuetter-Ferguson and chain-ladder estimates are combined as a credibility-weighted average, wit… | formula | tagged | Bayesian Bornhuetter-Ferguson Model: “$$Z_{ij} = \frac{\sum_{k=1}^{j-1} y_k}{\beta_i\,\phi + \sum_{k=1}^{j-1} y_k}$$” |
| A larger beta (smaller prior variance, more confidence in the prior) lowers Z and shifts weight toward the Bornhuetter-Ferguson estimate, w… | fact | tagged | Bayesian Bornhuetter-Ferguson Model: “For a given $M_i$, a larger $\beta_i$ is a smaller prior variance and more certainty about $M_i$. T…” |

</details>

<details><summary><code>cas7-2014-q11</code> · untagged</summary>

Tagged pages: External Systemic Risk, Risk Margin

| Item | Kind | Status | Where |
|---|---|---|---|
| Legislative risk is the risk that legislatures change laws or statutes (e.g., statutory benefit levels, what is compensable, caps, statutes… | definition | tagged | External Systemic Risk: “**Legislative, political and claims inflation**: legislative change and its erosion, court preceden…” |
| Legislative risk matters most for long-tail lines such as workers compensation, liability and medical malpractice, because longer claim dur… | fact | elsewhere | Long Tail Lines: “Long-tail reserves are also exposed to **calendar-year** forces that no accident-year pattern antic…” |
| Event risk is the risk that a single event (e.g., hurricane, earthquake) triggers coverage on many policies at once, creating correlated lo… | definition | tagged | External Systemic Risk: “**Event**: single events causing many claims, material for property and motor, and for medical malp…” |
| Event risk is important for property-type lines (property, homeowners, auto physical damage) with geographic concentration of exposures, be… | fact | tagged | External Systemic Risk: “Event risk tends to dominate property premium liabilities” |
| Latent claim risk is the risk that claims arise from exposures unknown or unpriced at policy inception and take a long time to be discovere… | definition | tagged | External Systemic Risk: “**Latent claim**: claims from a source not currently thought to be covered; material mainly for wor…” |
| Latent claim risk is important for long-tail lines such as workers compensation, medical malpractice and liability, because insurers may be… | fact | linked | Latent Liability: “so the claims fall on policies written, priced and often long closed years or decades earlier, unde…” |

</details>

<details><summary><code>cas7-2014-q12</code> · answerable</summary>

Tagged pages: Retrospective Rating, PDLD Ratio

| Item | Kind | Status | Where |
|---|---|---|---|
| The premium development to loss development (PDLD) ratio is the incremental retrospective premium at an adjustment divided by the increment… | definition | tagged | PDLD Ratio: “$$\text{PDLD}_n = \frac{P_n - P_{n-1}}{L_n - L_{n-1}}$$” |
| Retrospective premium equals (basic premium + converted loss, where converted loss is capped loss times the loss conversion factor) times t… | formula | tagged | Retrospective Rating: “$$R = \left(\text{BP} + L \times \text{LCF}\right) \times \text{TM}$$” |
| At the first adjustment the incremental premium can exceed incremental losses because it includes the basic premium (charged regardless of … | fact | tagged | PDLD Ratio: “$\text{PDLD}_1$ is usually **above 1**. It carries the whole basic premium, and little loss is capp…” |
| Retrospective rating limits the losses that enter the premium calculation through a per-accident loss limit (cap) on each claim, along with… | definition | tagged | Retrospective Rating: “**Converted losses** $(L \times \text{LCF})$ are the insured's reported losses $L$, limited by any …” |
| Loss development on a claim already at the per-accident limit produces no additional capped loss and thus no incremental premium, whereas d… | fact | tagged | PDLD Ratio: “Later ratios are the incremental loss capping ratio times $\text{LCF} \times \text{TM}$. They are u…” |
| Incremental premium can be negative while total incremental losses are positive when upward development occurs on claims already capped (no… | fact | tagged | PDLD Ratio: “An individual policy quarter's historical ratio can even be negative. That happens when upward deve…” |

</details>

<details><summary><code>cas7-2014-q13</code> · gap</summary>

Tagged pages: Reinsurance, Loss Reserving, Bordereau, Reinsurance Reserving

| Item | Kind | Status | Where |
|---|---|---|---|
| Reinsurance claims have longer report lags than primary claims because claims are reported to the reinsurer only once they reach a size thr… | fact | tagged | Bordereau: “Bordereau delays are one of Friedland's reasons that reinsurance reporting and payment patterns are…” |
| Reinsurance reporting patterns are not homogeneous because contracts span many lines of business, attachment points, contract types (treaty… | fact | tagged | Reinsurance Reserving: “Reporting lags are longer, data are thinner and less homogeneous, contracts are manuscript, results…” |
| Industry statistics such as Schedule P data are of limited use for reinsurance reserving because categories like excess casualty blend many… | fact | missing |  |
| Reinsurance losses tend to show persistent upward development because primary companies often under-reserve for LAE and severity trend affe… | fact | tagged | Reinsurance Reserving: “As a result, early development factors and tails are higher than primary, especially for non-propor…” |
| Other challenges of reinsurance reserving include the reinsurer's limited knowledge of exposures (often only summary data from cedants), di… | fact | tagged | Reinsurance Reserving: “Data often arrive as summary reports rather than claim detail” |

</details>

<details><summary><code>cas7-2014-q14</code> · untagged</summary>

Tagged pages: Cape Cod Method, Reinsurance, Reinsurance Reserving

| Item | Kind | Status | Where |
|---|---|---|---|
| The percent reported (reporting lag) at a given age equals 1 divided by the reported loss development factor to ultimate at that age. | formula | tagged | Cape Cod Method: “$$\text{ELR} = \frac{\sum_i C_i}{\sum_i \text{EP}_i \times \tfrac{1}{\text{CDF}_i}}$$” |
| Used-up (on-level) premium for an accident year is its adjusted premium multiplied by the percent reported at its current age; adjusted pre… | definition | tagged | Cape Cod Method: “**Used-up premium** $\text{EP}_i / \text{CDF}_i$ is the share of each year's premium "exposed" to t…” |
| The Cape Cod expected loss ratio equals total reported losses across all accident years divided by total used-up premium (sum of adjusted p… | formula | tagged | Cape Cod Method: “The ELR is estimated as total reported losses over total *used-up* (on-level, developed) premium ac…” |
| Cape Cod IBNR for an accident year equals the ELR times adjusted premium times (1 minus percent reported), i.e. a Bornhuetter-Ferguson-styl… | formula | tagged | Cape Cod Method: “$$\text{IBNR}_i = \text{ELR} \times \text{EP}_i \times \left(1 - \tfrac{1}{\text{CDF}_i}\right)$$” |
| Ultimate loss for an accident year equals reported loss plus IBNR, and the ultimate loss ratio is obtained by dividing ultimate loss by the… | procedure | elsewhere | Generalized Cape Cod Method: “$$\hat U_j = C_j + \text{IBNR}_j$$” |

</details>

<details><summary><code>cas7-2014-q2</code> · answerable</summary>

Tagged pages: Chain Ladder Method, Residual Plot, Mack Chain Ladder Model, Chain Ladder Assumptions

| Item | Kind | Status | Where |
|---|---|---|---|
| Mack's chain-ladder assumptions are that expected incremental (next-period) loss is proportional to losses reported to date, that accident … | fact | tagged | Chain Ladder Assumptions: “The first says expected emergence is proportional to losses emerged to date: a line through the ori…” |
| Test the proportionality assumption by plotting next-age cumulative loss against current-age cumulative loss for each accident year; a roug… | procedure | tagged | Chain Ladder Assumptions: “The first says expected emergence is proportional to losses emerged to date: a line through the ori…” |
| Weighted residuals in the chain-ladder regression are the actual minus fitted next-period losses, divided by the square root of the varianc… | definition | tagged | Residual Plot: “For [[Generalized Linear Model]]s, **Pearson residuals** $r_i^P = (y_i - \hat{\mu}_i)/\sqrt{V(\hat{…” |
| If the Mack chain-ladder variance assumption holds, a plot of weighted residuals against loss size should show random scatter around zero w… | fact | tagged | Residual Plot: “\\| Random scatter around zero \\| Model is adequate \\|” |

</details>

<details><summary><code>cas7-2014-q3</code> · answerable</summary>

Tagged pages: Maximum Likelihood Estimation, Cape Cod Method, Process Risk, Growth Curve, Prediction Error

| Item | Kind | Status | Where |
|---|---|---|---|
| In the Clark framework, the scaling factor for process variance is estimated as sigma^2 = (1/(n-p)) * sum over incremental cells of (Actual… | formula | tagged | Process Risk: “$$\sigma^2 = \frac{1}{n-p}\sum_{AY,t}\frac{(c_{AY,t} - \hat\mu_{AY,t})^2}{\hat\mu_{AY,t}}$$” |
| In the sigma^2 estimator, n is the number of incremental loss data points and p is the number of estimated parameters; the Cape Cod method … | definition | tagged | Process Risk: “There are $n$ increments in the data and $p$ fitted parameters: $3$ for Clark's [[Cape Cod Method\\|…” |
| Process variance of the total reserve equals sigma^2 times the estimated total reserve (variance-to-mean scaling of an over-dispersed Poiss… | formula | tagged | Process Risk: “$$\mathrm{Var}_{\text{process}}(R) = \sigma^2 \sum \mu_{AY;x,y}$$” |
| Total reserve variance is the sum of process variance and parameter variance, so total standard deviation is the square root of their sum. | fact | tagged | Process Risk: “**Total variance.** Clark adds the two, treating them as independent.” |
| Parameter variance is the square of the parameter standard deviation of the reserve; and sigma^2 must be on the same units as the reserve (… | fact | linked | Parameter Risk (collapsed): “\text{Parameter} &= (10{,}000 \times 0.40)^2 \times 0.05^2 \\” |

</details>

<details><summary><code>cas7-2014-q4</code> · untagged</summary>

Tagged pages: Development Factor, Correlation Coefficient, Chain Ladder Method, Development Factor Correlation Test, Chain Ladder Assumptions

| Item | Kind | Status | Where |
|---|---|---|---|
| An age-to-age (link ratio) factor is the ratio of cumulative reported losses at one development age to cumulative losses at the prior age f… | definition | linked | Age to Age Factor: “**Age-to-Age Factor** (link ratio) is the ratio of a cohort's cumulative amount at one maturity to …” |
| To test independence of adjacent age-to-age factor columns, pair the factors for each accident year that has both (e.g., 12-24 with 24-36) … | procedure | tagged | Development Factor Correlation Test: “computes the sample [[Correlation Coefficient\\|correlation]] $r$ for *every* pair of columns, over …” |
| The Pearson sample correlation coefficient is r = (E[XY] - E[X]E[Y]) / (σX σY), equivalently Σ(X-X̄)(Y-Ȳ) / sqrt(Σ(X-X̄)² Σ(Y-Ȳ)²). | formula | elsewhere | Correlation: “$$r = \frac{\sum_{i=1}^n (x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum_{i=1}^n (x_i - \bar{x})^2}\,\sq…” |
| The test statistic T = r·sqrt((n-2)/(1-r²)) follows a t-distribution with n-2 degrees of freedom, where n is the number of paired observati… | formula | tagged | Development Factor Correlation Test: “$$T = r\sqrt{\frac{n-2}{1-r^2}} \sim t_{n-2}$$” |
| Compare \|T\| with the critical t-value at n-2 degrees of freedom for the chosen significance level; if \|T\| exceeds it the correlation is… | procedure | tagged | Development Factor Correlation Test: “Correlations can be positive or negative, so the test is two-tailed: $r$ is significant at the 10% …” |
| The chain-ladder method assumes the expected next-period incremental losses are proportional to cumulative losses to date, via a factor tha… | fact | tagged | Chain Ladder Assumptions: “The first says expected emergence is proportional to losses emerged to date: a line through the ori…” |
| For least squares optimality of the chain-ladder factors, the variance of next-period incremental losses is proportional to cumulative loss… | fact | tagged | Chain Ladder Assumptions: “Mack's $a = k(d)\,c(w,d)$ gives the volume-weighted factor $\sum q/\sum c$.” |

</details>

<details><summary><code>cas7-2014-q5</code> · answerable</summary>

Tagged pages: Benktander Method, Cape Cod Method, Growth Curve

| Item | Kind | Status | Where |
|---|---|---|---|
| For exposures uniformly distributed over the accident year, the average age of the accident year's losses at evaluation time t months from … | definition | tagged | Growth Curve: “The age $x$ runs from the *average* accident date to the evaluation date, so an [[Accident Year\\|ac…” |
| The loglogistic cumulative payment (or reporting) pattern is G(x) = x^ω / (x^ω + θ^ω), where x is the average age of losses and ω, θ are pa… | formula | tagged | Growth Curve: “$$\text{Loglogistic: } G(x) = \frac{x^{\omega}}{x^{\omega} + \theta^{\omega}}$$” |
| Expected paid loss to date equals exposures times the a priori ultimate loss per exposure times the expected cumulative percent paid G at t… | procedure | tagged | Growth Curve: “The expected increment between ages $x$ and $y$ is $\text{ULT}_{AY}[G(y) - G(x)]$ in Clark's LDF me…” |
| The Cape Cod (Bornhuetter-Ferguson-type) ultimate estimate equals actual paid to date plus expected unpaid, where expected unpaid is (1 − G… | procedure | linked | Bornhuetter-Ferguson Method: “$$U_{\text{BF}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) \times U_{0}$$” |
| The LDF (chain ladder) ultimate estimate equals actual paid to date divided by the expected percent paid G, ignoring the a priori estimate. | procedure | tagged | Growth Curve: “$$\text{LDF}_x = \frac{1}{G(x)}$$” |
| When the payment pattern has a long tail, truncate the pattern at a finite age (e.g., twice the evaluation age) and use G at the truncation… | procedure | tagged | Growth Curve: “To avoid relying on a mechanical extrapolation, Clark truncates at a selected age $x_T$ (240 months…” |
| The Benktander (Gunnar Benktander) ultimate is a credibility weighted average of the LDF ultimate and the Cape Cod/BF ultimate, with credib… | formula | tagged | Benktander Method: “$$U_{\text{GB}} = \tfrac{1}{\text{CDF}} \, U_{\text{CL}} + \left(1 - \tfrac{1}{\text{CDF}}\right) U…” |
| The reserve (unpaid) estimate equals the ultimate loss estimate minus actual paid losses to date. | procedure | linked | Chain Ladder Method: “$$\text{IBNR} = U_{\text{AY}} - C_{\text{AY},\,n}$$” |

</details>

<details><summary><code>cas7-2014-q6</code> · answerable</summary>

Tagged pages: Limited Expected Value, Development Factor, Deductible, Excess Loss Development Factor, Layer of Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| The limited age-to-age development factor equals the unlimited factor times the ratio of the limited severity relativity at the later age t… | formula | tagged | Excess Loss Development Factor: “$$\text{LDF}^L_t = \text{LDF}_t \times \frac{R^L}{R^L_t}$$” |
| The limited severity relativity R^L_t at age t is the ratio of expected limited (capped) loss and ALAE to expected unlimited loss and ALAE … | definition | tagged | Excess Loss Development Factor: “$R^L_t$ the limited severity divided by the unlimited severity at age $t$. $R^L$ is the same ratio …” |
| Match relativities to the development interval correctly: a factor from age t to t+1 uses the relativity at age t (starting age) and the re… | procedure | tagged | Excess Loss Development Factor: “The weights in the balance equation are the relativities at the **starting** age $t$.” |
| The unlimited development factor is the weighted average of the limited factor and the excess factor, with weights equal to the limited rel… | formula | tagged | Excess Loss Development Factor: “$$\text{LDF}_t = R^L_t \, \text{LDF}^L_t + (1 - R^L_t) \, \text{XSLDF}^L_t$$” |
| Unlimited losses equal limited losses plus excess losses, so the excess layer's share of unlimited losses at age t is 1 − R_t, and the exce… | fact | tagged | Excess Loss Development Factor: “The limited part is $C_t S_t R^L_t$ and the excess part $C_t S_t (1 - R^L_t)$.” |

</details>

<details><summary><code>cas7-2014-q7</code> · gap</summary>

Tagged pages: Bootstrap, ODP Bootstrap Model, Heteroscedasticity, Data Issues

| Item | Kind | Status | Where |
|---|---|---|---|
| Negative incremental losses cause problems in an over-dispersed Poisson bootstrap (e.g., the log of a negative value is undefined in the GL… | fact | tagged | ODP Bootstrap Model (collapsed): “The remedies there are to remove the extreme iterations, recalibrate the model, or floor the increm…” |
| When fitting a negative-column triangle with the GLM, add the absolute value of the largest negative incremental value to every incremental… | procedure | missing |  |
| Missing or incomplete data in the triangle can be handled by estimating the missing value from surrounding values, or by excluding it from … | procedure | tagged | Data Issues: “*missing values* (estimate from surrounding cells, or exclude from the factors and residuals)” |
| Heteroscedasticity in bootstrap residuals means the residuals do not have a common variance across development periods, violating the assum… | definition | tagged | Heteroscedasticity: “In a reserving model it usually means the residuals of some development periods are more variable t…” |
| To adjust for heteroscedasticity, group development periods into groups with homogeneous variance and either resample residuals only within… | procedure | tagged | Heteroscedasticity: “*Stratified sampling* draws each group's residuals only from that group.” |
| When exposures change dramatically across accident years, convert the data to pure premiums (loss per exposure) before modeling, and multip… | procedure | tagged | Data Issues: “*exposure changes* (model losses per exposure)” |
| Outliers or extreme values can be excluded from the average age-to-age factor and residual calculations, while the corresponding incrementa… | procedure | missing |  |
| Heteroecthesious data (partial-year or interim evaluation periods) can be handled by projecting future incremental values before applying t… | procedure | missing |  |
| If the sum of the residuals is non-zero, add a single constant to all residuals so the adjusted residuals sum to zero. | procedure | missing |  |
| When there are too few residuals to sample from or too few extreme residuals, parameterize a distribution from which to sample residuals. | procedure | elsewhere | Deviance Residual: “a parametric bootstrap in Shibata's sense can replace resampling the actual residuals with draws fr…” |

</details>

<details><summary><code>cas7-2014-q8</code> · answerable</summary>

Tagged pages: Internal Systemic Risk, Risk Margin

| Item | Kind | Status | Where |
|---|---|---|---|
| Internal systemic risk is the risk arising from within the insurer's own modeling and valuation process (as opposed to external systemic ri… | definition | tagged | Risk Margin: “**[[Internal Systemic Risk\\|Internal systemic risk]]** is specification error, parameter selection …” |
| Specification error is the risk that arises because it is not possible to model the insurance process perfectly, so the chosen model form m… | definition | tagged | Internal Systemic Risk: “**Specification error** is the inability to build a model fully representative of the insurance pro…” |
| Parameter selection error is the risk that model parameters, predictors or trends are not estimated or selected correctly, so the chosen pa… | definition | tagged | Internal Systemic Risk: “**Parameter selection error** arises because the model cannot adequately measure all the predictors…” |
| Data error is the risk arising from inaccurate, untimely or inadequate data and from a lack of knowledge of the portfolio's pricing and und… | definition | tagged | Internal Systemic Risk: “**Data error** comes from poor or unavailable data, or inadequate knowledge of the portfolio, inclu…” |
| Typical specification-error risk indicators include the number of models or methods run, the consistency of results across models, and how … | fact | tagged | Internal Systemic Risk: “Indicators include the number of independent models, whether claim or payment types are modelled se…” |
| Typical parameter-selection-error risk indicators include the stability of predictors over time, the amount of data history and experience … | fact | tagged | Internal Systemic Risk: “Indicators include whether the best predictors have been identified, whether they are stable over t…” |
| Typical data-error risk indicators include the timeliness, reliability and consistency of data, the data source (such as a third-party admi… | fact | tagged | Internal Systemic Risk: “Indicators include knowledge of past processes, information from the business, reconciliations, rob…” |
| Score each risk indicator on a balanced scorecard as more or less favorable by tying it to the facts given for the line of business, with f… | procedure | tagged | Internal Systemic Risk: “it is assessed by scoring the modelling infrastructure on a balanced scorecard and mapping the scor…” |

</details>

<details><summary><code>cas7-2014-q9</code> · gap</summary>

Tagged pages: Bootstrap, Generalized Linear Model, Coefficient of Variation, ODP Bootstrap Model, Reasonableness Testing, Model Output

| Item | Kind | Status | Where |
|---|---|---|---|
| In a reasonable reserve model, the standard error of unpaid estimates should increase from the oldest to the most recent accident year, bec… | fact | tagged | Model Output: “Standard errors should **rise** from older to more recent accident years, and the total SE should e…” |
| The coefficient of variation of unpaid estimates should generally decrease from older to more recent accident years, since variability is m… | fact | tagged | Model Output: “The CV of the most recent year or two may rise again. Those estimates lean on the largest, least ce…” |
| The standard error of the total unpaid across all accident years should be larger than the standard error of any individual accident year. | fact | tagged | Model Output: “Standard errors should **rise** from older to more recent accident years, and the total SE should e…” |
| The coefficient of variation of the total unpaid should be smaller than the CV of any individual accident year because of diversification a… | fact | tagged | Model Output: “CVs should **fall** from older to more recent years, and the total CV should be below that of any s…” |
| The mean unpaid estimates should increase from the oldest to the most recent accident year, since less mature years have more unpaid claims… | fact | missing |  |
| The coefficient of variation is the standard error divided by the mean, used to compare relative variability across accident years. | definition | tagged | Model Output: “$$\mathrm{CV} = \frac{\mathrm{SE}(\text{unpaid})}{\text{Mean}(\text{unpaid})}$$” |

</details>

<details><summary><code>cas7-2015-q1</code> · answerable</summary>

Tagged pages: Credibility, Bornhuetter-Ferguson Method, Chain Ladder Method, Credible Loss Ratio Reserve

| Item | Kind | Status | Where |
|---|---|---|---|
| In the Benktander/Neuhaus framework, the incremental paid loss ratio for development period k is m_k = (sum of incremental paid claims in p… | formula | tagged | Credible Loss Ratio Reserve: “$m_k$ is the **incremental loss ratio** of development period $k$: the paid claims $S_{ik}$ of that…” |
| The expected percent paid to date for an accident year at development age k is p_k = m_1+...+m_k divided by m_tot (for the latest year, the… | formula | tagged | Credible Loss Ratio Reserve: “$p_i = \sum_{k \le n-i+1} m_k \big/ \sum_k m_k$ is the **loss ratio payout factor**, the expected s…” |
| The individual reserve estimate is R^ind = (q/p) × cumulative paid claims to date, i.e., paid claims scaled by the ratio of expected unpaid… | formula | tagged | Credible Loss Ratio Reserve: “$$R_i^{ind} = \frac{q_i}{p_i}\,C_{i,n-i+1}$$” |
| The collective reserve estimate is R^coll = q × U^BC, where the a priori (budget/Bornhuetter-Ferguson) ultimate U^BC = m_tot × earned premi… | formula | tagged | Credible Loss Ratio Reserve: “$$R_i^{coll} = q_i\,V_i\sum_{k=1}^{n} m_k$$” |
| The Neuhaus credibility weight given to the individual estimate is Z^WN = p × m_tot... more precisely equal to m_1 for the first-period los… | formula | tagged | Credible Loss Ratio Reserve: “$$R_i^{c} = Z_i\,R_i^{ind} + (1 - Z_i)\,R_i^{coll}$$” |
| Hürlimann's optimal (minimum variance) credibility weight for the individual estimate is Z* = p / (p + sqrt(p)), where p is the expected pe… | formula | tagged | Credible Loss Ratio Reserve: “$$Z_i^{*} = \frac{p_i}{p_i + \sqrt{p_i}}$$” |
| In credibility reserving, the individual estimate R^ind receives the credibility weight Z and the collective estimate R^coll is the complem… | fact | tagged | Credible Loss Ratio Reserve: “$$R_i^{c} = Z_i\,R_i^{ind} + (1 - Z_i)\,R_i^{coll}$$” |

</details>

<details><summary><code>cas7-2015-q10</code> · answerable</summary>

Tagged pages: Bootstrap, Residual Plot, Heteroscedasticity, ODP Bootstrap Model

| Item | Kind | Status | Where |
|---|---|---|---|
| Heteroscedasticity means the residuals do not have constant variance across groups such as accident years, development periods, or calendar… | definition | tagged | Heteroscedasticity: “**Heteroscedasticity** is non-constant variance among a model's [[Residual\\|residuals]].” |
| To check for heteroscedasticity in an ODP bootstrap, plot standardized residuals against accident year, development period, or calendar per… | procedure | tagged | Heteroscedasticity: “A [[Residual Plot\\|residual graph]] by development period shows it: the residuals in some periods s…” |
| The ODP bootstrap assumes the standardized residuals are independent and identically distributed, so heteroscedasticity violates this assum… | fact | tagged | Heteroscedasticity: “The [[ODP Bootstrap Model\\|ODP bootstrap]] assumes the opposite, homoscedasticity: that the standar…” |
| Stratified sampling adjusts for heteroscedasticity by grouping residuals with similar variances and resampling residuals only from within t… | procedure | tagged | Heteroscedasticity: “*Stratified sampling* draws each group's residuals only from that group.” |
| The hetero-adjustment factor method groups residuals with similar variances, computes each group's standard deviation, and multiplies each … | procedure | tagged | Heteroscedasticity: “$h_i$ is group $i$'s hetero-adjustment factor: the standard deviation of all the residuals over tha…” |

</details>

<details><summary><code>cas7-2015-q11</code> · gap</summary>

Tagged pages: Bootstrap, Generalized Linear Model, Outlier, ODP Bootstrap Model, Data Issues

| Item | Kind | Status | Where |
|---|---|---|---|
| A GLM bootstrap with a log link and over-dispersed Poisson error fails when incremental values are negative (the log of a negative value is… | fact | tagged | Data Issues: “*negative incremental values* (a modified log link handles them unless a whole column sums negative…” |
| To handle negative incremental values in an ODP/GLM model, add a constant to every cell of the triangle so all values are non-negative, fit… | procedure | tagged | Data Issues: “a modified log link handles them unless a whole column sums negative, which needs a constant shift” |
| Outliers in the triangle (an unusually large incremental value for one accident year and age) can distort the fitted parameters, residuals … | fact | tagged | Data Issues (collapsed): “in an ODP bootstrap an error left in the triangle becomes an extreme residual that is resampled int…” |
| To address outliers, exclude the outlier from the triangle (treat it as missing and estimate it from surrounding values) or exclude it from… | procedure | tagged | Data Issues: “*missing values* (estimate from surrounding cells, or exclude from the factors and residuals); *out…” |
| A change in exposure level, or thin/missing data, in one accident year (e.g., the earliest year) makes that row inconsistent with the other… | fact | missing |  |
| To adjust for differing exposure levels across accident years, divide the loss triangle by earned exposure and model pure premium (or loss … | procedure | tagged | Data Issues: “*exposure changes* (model losses per exposure)” |
| To handle a thin or unreliable accident year, remove that entire row from the loss triangle before modeling. | procedure | missing |  |
| Zeros in the later ages of a triangle (e.g., oldest year at the last ages) are not necessarily missing data; they may reflect claim closure… | fact | missing |  |

</details>

<details><summary><code>cas7-2015-q12</code> · gap</summary>

Tagged pages: Reinsurance, Loss Reserving, Reinsurance Reserving

| Item | Kind | Status | Where |
|---|---|---|---|
| Reinsurance claim report lags are generally longer than primary report lags, because the reinsurer is notified only when a claim's reported… | fact | tagged | Reinsurance Reserving: “Claims reach the reinsurer only after the cedant has reported and assessed them. Excess claims arri…” |
| Reinsurance reserving is complicated by persistent upward development of most claim reserves, often because primary insurers tend to undere… | fact | missing |  |
| To detect possible ALAE under-reserving in claim data, compute the ratio of ALAE to loss for each claim and compare across claims or accide… | procedure | missing |  |
| Reinsurers have heterogeneous exposures and treaty terms (line of business, retentions, limits), and changes in the retention between years… | fact | tagged | Reinsurance Reserving: “Reporting lags are longer, data are thinner and less homogeneous, contracts are manuscript, results…” |
| A per-occurrence excess-of-loss retention is the amount of loss (here combined loss and ALAE) per occurrence that the primary insurer keeps… | definition | linked | Excess of Loss: “is non-proportional reinsurance in which the reinsurer pays the part of each loss — per risk or per…” |

</details>

<details><summary><code>cas7-2015-q13</code> · answerable</summary>

Tagged pages: Cape Cod Method, Reinsurance, On-Leveling, Reinsurance Reserving

| Item | Kind | Status | Where |
|---|---|---|---|
| Used-up premium for an accident year is its adjusted (on-level) premium multiplied by the percentage of losses reported (the aggregate loss… | definition | tagged | Cape Cod Method: “**Used-up premium** $\text{EP}_i / \text{CDF}_i$ is the share of each year's premium "exposed" to t…” |
| The Stanard-Bühlmann expected loss ratio equals total reported losses across all accident years divided by total used-up premium (sum of ad… | formula | tagged | Cape Cod Method: “$$\text{ELR} = \frac{\sum_i C_i}{\sum_i \text{EP}_i \times \tfrac{1}{\text{CDF}_i}}$$” |
| Stanard-Bühlmann IBNR for an accident year equals the ELR times adjusted premium times (1 minus the percent reported); total IBNR is the su… | formula | tagged | Cape Cod Method: “$$\text{IBNR}_i = \text{ELR} \times \text{EP}_i \times \left(1 - \tfrac{1}{\text{CDF}_i}\right)$$” |
| Stanard-Bühlmann IBNR is the expected unreported portion of losses (ELR × premium × percent unreported), not expected ultimate loss minus r… | procedure | tagged | Cape Cod Method: “$$\text{IBNR}_i = \text{ELR} \times \text{EP}_i \times \left(1 - \tfrac{1}{\text{CDF}_i}\right)$$” |
| Earned premium is adjusted to the current rate level (on-level premium) before use in the Stanard-Bühlmann method, so premiums from all yea… | procedure | tagged | Cape Cod Method: “Premium **must be on level** and losses must be trended to a common cost level before the ELR is co…” |
| Stanard-Bühlmann assumes a single constant ELR across all accident years, so premiums must be on a common rate level (and cost level) for o… | fact | tagged | Cape Cod Method: “Premium **must be on level** and losses must be trended to a common cost level before the ELR is co…” |

</details>

<details><summary><code>cas7-2015-q14</code> · gap</summary>

Tagged pages: Retrospective Rating, PDLD Ratio

| Item | Kind | Status | Where |
|---|---|---|---|
| The premium development to loss development (PDLD) ratio at a retrospective adjustment is the incremental change in premium divided by the … | definition | tagged | PDLD Ratio: “For each retro adjustment it is the premium developed in that adjustment divided by the loss develo…” |
| For the first adjustment, PDLD(1) = [Basic premium / (Standard premium × ELR × percent of loss emerged at first adjustment) + (capped loss … | formula | tagged | PDLD Ratio: “$\text{BP}/L_1$ is approximated by $\text{BPF}/(\text{ELR} \times \%L_1)$, the basic premium factor…” |
| For adjustments after the first, PDLD(n) = incremental loss capping ratio × loss conversion factor × tax multiplier, since basic premium is… | formula | tagged | PDLD Ratio: “Later ratios are the incremental loss capping ratio times $\text{LCF} \times \text{TM}$.” |
| Calculating PDLD ratios from the retrospective rating formula reflects the pricing parameters of policies currently being sold, whereas his… | fact | tagged | PDLD Ratio: “The formula ratios respond to changes in the plan parameters sold.” |
| PDLD ratios derived from the retrospective rating formula are more stable than those from empirical historical loss data, which can be high… | fact | tagged | PDLD Ratio (collapsed): “A single negative point is noise to be averaged over as many quarters as possible, or replaced by t…” |
| If small claims (below the loss cap/limit) settle faster, early capped-to-unlimited loss ratios rise toward one, so early PDLD ratios incre… | fact | missing |  |

</details>

<details><summary><code>cas7-2015-q2</code> · answerable</summary>

Tagged pages: Maximum Likelihood Estimation, Coefficient of Variation, Cape Cod Method, Over-Dispersed Poisson Model, Growth Curve, Process Risk, Prediction Error

| Item | Kind | Status | Where |
|---|---|---|---|
| In Clark's LDF method, the cumulative proportion of ultimate claims paid at a given age is given by a growth curve G(x) (e.g., the loglogis… | formula | tagged | Growth Curve: “$$\text{LDF}_x = \frac{1}{G(x)}$$” |
| Truncate the LDF at a chosen truncation age by using G(truncation age)/G(x) instead of 1/G(x), so that development beyond the truncation po… | procedure | tagged | Growth Curve: “Clark truncates at a selected age $x_T$ (240 months), using $G(x_T)/G(x)$ in place of $1/G(x)$.” |
| The age x used in G(x) is the average age (time since accident occurrence) at the evaluation date, which for an accident year is the age at… | definition | tagged | Growth Curve: “The age $x$ runs from the *average* accident date to the evaluation date, so an [[Accident Year\\|ac…” |
| Estimated ultimate claims equal paid claims times the truncated LDF, and estimated unpaid claims equal estimated ultimate minus paid claims… | procedure | tagged | Growth Curve: “To avoid relying on a mechanical extrapolation, Clark truncates at a selected age $x_T$ (240 months…” |
| Under the over-dispersed Poisson assumption, process variance of the unpaid claims estimate equals the scaling factor sigma^2 times the est… | formula | tagged | Process Risk: “Clark assumes each increment is [[Over-Dispersed Poisson Model\\|over-dispersed Poisson]]: a Poisson…” |
| Total variance of the unpaid estimate equals process variance plus parameter variance (parameter variance is the square of the parameter st… | formula | tagged | Prediction Error: “Dividing it by the mean gives the [[Coefficient of Variation\\|coefficient of variation]].” |
| The Cape Cod method generally yields a lower coefficient of variation than the LDF method because it uses additional information (premium o… | fact | tagged | Process Risk: “He notes that the Cape Cod method may carry somewhat more process variance than the LDF method but …” |

</details>

Nothing here edits the vault. A gap is fixed from the syllabus reading, in general form — never by copying the question's own numbers onto the page — and the edited page is fact checked again (docs/verification.md).
