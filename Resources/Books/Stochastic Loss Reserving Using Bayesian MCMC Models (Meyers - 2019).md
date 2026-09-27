---
Title: "Stochastic Loss Reserving Using Bayesian MCMC Models"
Authors: "Glenn Meyers"
Publisher: "Casualty Actuarial Society"
Year: "2019"
date: "2019"
Edition: "2nd"
Type: "Monograph"
Code: "CAS Monograph No. 8"
ISBN: "978-1-7370028-1-9"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2021-02/08-Meyers.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d4b8379e79b4f95acbe5b9f306c5df8b6632f401daaa80cc2b8f7ef1d36e5f1f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Stochastic Loss Reserving Using Bayesian MCMC Models (Meyers - 2019).md
---
![[Stochastic Loss Reserving Using Bayesian MCMC Models (Meyers - 2019) - Cover.svg]]

A CAS monograph that tests stochastic loss reserve models on outcomes from the CAS Loss Reserve Database and proposes Bayesian MCMC models that validate better. It begins by testing the Mack model on incurred data and the bootstrap overdispersed Poisson model on paid data, then proposes Bayesian MCMC models that recognize correlation between accident years in incurred data, allow for a change in the claim settlement rate in paid data, and combine paid and incurred data in one model. It continues with dependencies between lines of insurance and a cost of capital risk margin. This second edition (2019) revises the 2015 original, with the models run in Stan instead of JAGS.

> [!info] On the syllabus
> - [[Exam 7 (CAS)|Exam 7]] — objectives A9–A11 and A14; 2nd edition, CAS Monograph #8, including errata.

## Preface to the Second Edition
- Since the original publication in January 2015, the Bayesian MCMC software Stan has become the software of choice of many CAS members, and Meyers (2017) and Meyers (2018) applied the original techniques to dependencies between lines of insurance and to a cost of capital risk margin.
- The major changes: the modeling is done in Stan instead of JAGS; the research on dependencies and risk margins is included; the set of loss triangles was selected more rigorously; and prior distributions are chosen more thoughtfully.
- There is a different set of models: a Bayesian MCMC version of the [[Cape Cod Method|Cape Cod]] model and an integrated paid/incurred model are new, and the incremental paid loss models are gone, because the attempts at a new one did not yield a model that validated.
- The first edition's only tests were the [[PP Plot|p-p plots]]; this edition adds prospective tests and another retrospective test, including a criterion for adding or deleting a parameter.
- Some of the text introducing the tools needed to run the analyses was removed; the Stan website is suggested as a place to start.

## 1 Introduction
- The two most prominent non-proprietary stochastic loss reserve models are those of Mack (1993, 1994) and England and Verrall (2002), but little work had been done to retrospectively test them in an organized fashion on a large number of insurers.
- Meyers and Shi (2011) assembled [[Schedule P]] triangles from 1997 NAIC Annual Statements and "completed the triangle" from later statements, so that the predictive distribution of any proposed model can be validated.
- The Mack and England and Verrall models do not accurately predict the distribution of outcomes on these data; the explanations offered are an insurance loss environment too dynamic for any single model ("black swan" events), other models that fit better, and data missing crucial information such as changes in claim processes or reinsurance.
- A "Bayesian model" is a model whose parameters have a prior distribution specified by the user; "Bayesian estimation" predicts the distribution of a statistic of interest from the model's [[Posterior Distribution|posterior distribution]].
- [[Markov Chain Monte Carlo|Bayesian Markov chain Monte Carlo (MCMC)]] models make complex Bayesian stochastic loss reserve models practical; the lineage runs from the Metropolis algorithm through Hastings (1970) to Gelfand and Smith (1990), and to reserving applications by Scollnik (2001), De Alba (2002), Ntzoufras and Dellaportas (2002) and Verrall (2007), who applied them to the chain ladder.
- The models are implemented in R, with the MCMC calculations in a Stan script, and the companion R/Stan scripts are published by the CAS.

## 2 The CAS Loss Reserve Database
- Schedule P reports insurer-level run-off triangles of paid and incurred losses net of reinsurance; paid losses are in Part 3, and incurred losses are Part 2 less Part 4.
- The upper triangles, from the 1997 Annual Statements, are used to build the models; the outcomes below the diagonal, taken from subsequent statements, are used to validate them.
- The models are tested on 200 triangles, 50 from each of Commercial Auto, Personal Auto, Workers' Compensation and Other Liability, selected to control for changes in net premium and in the ratio of net to direct premium, two hints of changes in an insurer's operations.
- Insurer group #353 for Commercial Auto is the illustrative insurer: its net written premium and its paid and incurred [[Development Triangle|triangles]] with outcomes are Tables 2.1 to 2.3.

## 3 Validating the Mack Model on Incurred Losses
- The chain ladder projects the latest loss with volume-weighted age-to-age factors; Mack makes it stochastic with three assumptions — the expected next cumulative loss is the current one times $f_d$, accident years are independent, and the conditional variance is the current loss times $\alpha_d$ — and derives the standard deviation of the ultimate (see [[Mack Chain Ladder Model]]).
- Following Mack's suggestion, the percentile of the total outcome is calculated from a [[Lognormal Distribution|lognormal distribution]] with the Mack mean and standard deviation; for the illustrative insurer it is the 86.03rd percentile.
- A model is generally applicable if the outcome percentiles of many triangles are uniformly distributed; the p-p plot with the Kolmogorov-Smirnov test makes this testable, and a model is "validated" if it passes the test at the 5% level, rejecting uniformity when the largest gap exceeds $136/\sqrt{n}$.
- The Anderson-Darling test is more sensitive in the tails, but almost all the models failed it, so the KS test is kept as the tool that differentiates between models.
- A slanted "S" p-p plot means the predicted distribution is too light in the tails, a slanted backward "S" too heavy, and a model predicting too high puts more outcomes in the low percentiles.
- On the 200 incurred triangles the Mack plots resemble the slanted "S" in all four lines, and the combined plot lies outside the KS band: the Mack model has a "reputation", defined as the result of this retrospective analysis, for predicting light tails.

## 4 Validating the Bootstrap ODP and Mack Models on Paid Losses
- The [[ODP Bootstrap Model|bootstrap ODP]] model of England and Verrall (2002) models incremental losses with $E[I_{w,d}] = \alpha_w \beta_d$ and $\mathrm{Var}[I_{w,d}] = \phi\, \alpha_w \beta_d$, estimated with a GLM, and quantifies volatility by bootstrap resampling.
- Because the overdispersed Poisson is defined only for nonnegative losses, it all but requires paid rather than incurred losses, although the GLM tolerates negative incrementals as long as every column sum stays positive.
- Neither the ODP nor the Mack model validates on the paid triangles, and the p-p plots suggest both deserve a reputation for overestimating ultimate losses.
- Two plausible explanations are changes in the loss environment not observable at the time, or other models that can be validated; developing models that validate would disprove the first.

## 5 The Cross Classified Model
- The [[Cross Classified Model|cross classified (CRC) model]] is a basic Bayesian MCMC model with an independent parameter for each accident year and each development year, fitted to cumulative losses with a lognormal distribution.

> $$\mu_{w,d} = \log(\text{Premium}_w) + \mathit{logelr} + \alpha_w + \beta_d$$

- Its variance falls with development year, $\sigma_1^2 > \dots > \sigma_{10}^2$, because the proportion of settled claims increases as $d$ increases.
- The priors are regarded as a feature of the model rather than a statement of belief, are wider than the author believes, and are neither improper nor heavy-tailed where values are impossible; parameters are stated in familiar terms, such as $e^{\mathit{logelr}}$ being approximately the final loss ratio of the first accident year.
- The predictive distribution of the development-year-10 outcome is simulated from 10,000 posterior parameter vectors, and the outcome's percentile is the share of simulated totals at or below it.
- On the 200 triangles the paid CRC model shares the Mack and ODP reputation for predicting losses that are too high, and the incurred CRC model is better than Mack but still understates variability.
- Standardized residual box plots by accident year and by development year, from 100 random posterior parameter vectors, are a diagnostic on the upper triangle; comfort comes from an interquartile range that contains 0.

## 6 The Stochastic Cape Cod Model
- In the [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] method the ultimate is the current loss plus premium times a judgmentally selected expected loss ratio times the unreported proportion; Stanard and Bühlmann proposed estimating the expected loss ratio from the data instead — the [[Cape Cod Method|Cape Cod]] model.
- The [[Stochastic Cape Cod Model|stochastic Cape Cod (SCC) model]] is the CRC model without the accident year parameters, so the expected loss ratio is constant across accident years.
- Its simulation first simulates a loss at development year 10, subtracts the model's expected value of the current reported loss and adds the current reported loss.
- The SCC model has a decidedly worse reputation than the other models, and its standardized residual plots suggest the fixed expected loss ratio across accident years explains it.
- [[AIC]] rewards log-likelihood and penalizes parameters; for Bayesian MCMC models the monograph uses the expected log predictive density estimated by leave-one-out [[Cross-Validation|cross-validation]], $\widehat{elpd}_{loo}$, computed with the R "loo" package, where the higher value is preferred.

> $$\text{LOOIC} = -2\,\widehat{elpd}_{loo}$$

- The statistics favor the CRC model over the SCC model for all 200 paid and incurred triangles; since no premium adjustment was made, the result also indicates the sensitivity of the BF method to that adjustment.

## 7 The Changing Settlement Rate Model
- The [[Changing Settlement Rate Model|changing settlement rate (CSR)]] model addresses the CRC model's overestimate of paid ultimate losses by replacing $\beta_d$ with $\beta_d(1-\gamma)^{w-1}$; a positive $\gamma$ moves the log-development factors toward zero, a speedup in [[Settlement Rate|claim settlement]], and $\gamma = 0$ gives back the CRC model.
- For the illustrative insurer the posterior mean of $\gamma$ is 0.0446, a speedup, and a speedup is fairly common among the 200 triangles.
- A second retrospective statistic, $\widehat{elpd}_{test}$, scores a model on the lower-triangle [[Holdout Sample|holdout]] data; it cannot be used on current data, but across the 200 triangles it compares models' reputations.
- The CSR model beats the CRC model in over half the triangles on both statistics, and its p-p plots fit the lower-triangle outcomes better.

## 8 The Correlated Accident Year Model
- The [[Correlated Accident Year Model|correlated accident year (CAY)]] model addresses the light tail predicted on incurred losses by adding $\rho \cdot (\log(C_{w-1,d}) - \mu_{w-1,d})$ to $\mu_{w,d}$, with $\rho$ in $(-1, 1)$; $\rho = 0$ gives back the CRC model.
- A proposition credited to John Major gives the correlation between the log losses of successive accident years.

> $$\operatorname{Corr}\big[\log(C_{w,d}),\, \log(C_{w-1,d})\big] = \frac{\rho}{1+\rho^2}$$

- For the illustrative insurer the posterior mean of $\rho$ is 0.1709, with a wide posterior; positive mean $\rho$s are an overwhelming majority of the 200 triangles, and the CAY model tends to raise the standard error.
- $\widehat{elpd}_{loo}$ favors CAY over CRC in only 26 of 200 triangles but $\widehat{elpd}_{test}$ in 121, and the p-p plots improve for three of the four lines, so the choice of the CAY model rests mainly on its reputation.

## 9 Combining the CAY and CSR Models
- The CSR model performs best on paid data and the CAY model on incurred data, and their $\mathit{logelr}$ and $\alpha_w$ parameters have the same interpretation.
- The [[Integrated Paid and Incurred Model|integrated paid and incurred (IPI) model]] shares $\mathit{logelr}$ and $\alpha_w$ between a CSR model of the paid triangle and a CAY model of the incurred triangle, with the paid $\beta_{10}$ no longer fixed at 0, to reduce the distortion when the paid and incurred loss ratio levels differ (frequent in Workers' Compensation).
- The standard deviations of $\mathit{logelr}$ and $\alpha_w$ are noticeably smaller, which lowers the standard errors of the estimates for almost all of the 200 triangles.
- The $\widehat{elpd}$ statistics favor the IPI model over the CSR and CAY models over half the time, and seven of its eight p-p plots fall within the KS bounds; the exception, Workers' Compensation, is light-tailed, a line where paid and incurred losses can still differ after 10 years.
- Because a liability under IFRS 17 is a discounted best estimate plus a risk margin, the rest of the monograph uses the CSR model and the paid side of the IPI model to estimate payout patterns and risk margins.

## 10 Dependencies Between Lines of Insurance
- Dependencies are model dependent: residuals from the wrong model can be correlated where those from the right model are not.
- Given the posterior samples for two lines, a second MCMC step samples a single correlation $\rho$ between their log losses for each simulation, from a bivariate normal model.
- For the illustrative insurer the posterior of $\rho$ is wide and the CSR model captures the accident year effect best; the SCC model does not capture it, and ignoring that effect can flip the estimated correlation from positive to negative.
- Across 119 pairs of lines within the same insurer, $\widehat{elpd}_{loo}$ favors independence in every case for the CSR and IPI models, but $\widehat{elpd}_{test}$ favors dependence in 75 and 73 of the 119 pairs, suggesting unknown variables in the later period.
- It is not prudent to assume independence, but sensitivity tests show the risk of grossly understating the standard error is fairly small; the main source of dependency identified is failing to recognize the accident year effect.

## 11 Risk Margin
- Following the Solvency II technical provisions and IFRS 17, the liability is the expected present value of unpaid claims plus a [[Risk Margin|risk margin]].
- The insurer holds capital $K_t$ each year, invested at the risk-free rate $i$; $K_{t-1}(1+i) - K_t$ is returned to the investor, and the [[Cost of Capital|cost of capital]] risk margin makes up the shortfall of that stream's present value at the risky rate $r$ against $K_0$.

> $$R_{COC} = (r-i) \sum_{t=0}^{u} \frac{K_t}{(1+r)^{t+1}}$$

- The capital is $K_t = \text{TVaR}_{97\%} - E_t$ of the ultimate loss estimate, with Bayes' theorem reweighting the 10,000 MCMC simulations as each future calendar year of losses emerges; the examples use $i = 4\%$, $r = 10\%$ and $u = 9$, and the posted risk margin is the average over the simulations.
- The more accurate IPI model needs noticeably less capital than the CSR model (an initial 3,087 against 7,139 for the illustrative insurer).
- Regressing $\log(R_{COC})$ on $\log(E_{Best})$ gives slopes below 1 in all four lines, so the ratio of risk margin to best estimate falls as the best estimate grows.
- Solvency II sums the risk margins of the lines; a normal copula with a selected correlation gives combined margins with a [[Diversification Credit|diversification credit]] that varies by insurer, and allocating by marginal risk margin gives a dominant line a small credit and a minor line a large one.
- A one-year time horizon, as in Solvency II, can also be calculated, and it does not automatically produce lower risk margins.

## 12 Summary and Conclusions
- The retrospective tests are the p-p plots with the KS statistic on the outcome percentiles and the $\widehat{elpd}_{test}$ statistic on the lower triangle; the prospective tests, usable on current data, are the standardized residual box plots and the $\widehat{elpd}_{loo}$ statistic.
- On these data, Mack on incurred triangles under-predicts variability, Mack and ODP on paid triangles over-predict the outcomes, the CRC model performs similarly, the SCC model performs very poorly, the CSR and CAY models improve on the CRC model, and the IPI model almost always reduces the standard errors significantly.
- A suggested reserve analysis fits the Mack model, then the CRC and CSR models on paid and the CRC and CAY models on incurred data with wide priors, selects a paid and an incurred model from the box plots and $\widehat{elpd}_{loo}$, refines the priors, and combines the two in an IPI model.
- Model fits should be retained and retrospectively tested as new data come in; the risk margin work finds the IPI margins noticeably lower than the CSR margins, and it seems prudent to allow some correlation between lines in diversification credits.

## References

## Appendix—The Data Selection Process
- The selection was mechanical: selecting all insurers risks including ones whose business changed, and being too selective risks keeping only data that fit a chosen model.
- A significant change in volume suggests a change in business operation, and a significant change in the net to direct premium ratio a change in reinsurance strategy.
- Triangles qualified with minimum annual premium over \$20,000 and incurred loss over \$4,000 (in thousands); the 50 per line with the lowest coefficient of variation of net earned premium were taken, subject to a limit on that of the net to direct premium ratio.

## Errata
- Page 4: the links to the reserve database and to the key summary statistics are dead; both are available on the CAS website, and the monograph is based on the original Schedule P database.
- Page 23: in the stochastic Cape Cod model $\beta_d$ should have a mean of 0, $\beta_d \sim \text{normal}(0, \sqrt{10})$ for $d = 1, \dots, 9$, with $\beta_{10} = 0$.
- Page 62: the denominator of the Solvency II risk margin summation in footnote 21 should be $(1+i)^{t+1}$, not $(1+i)^t$.
- Pages 84–85: Table A.2 is missing a column of data for Commercial Auto; the errata sheet gives the complete table.

## Related readings
- [[Measuring the Variability of Chain Ladder Reserve Estimates (Mack - 1994)]] — the Mack model the monograph validates on incurred and paid triangles (Sections 3 and 4).
- [[Obtaining Predictive Distributions for Reserves Which Incorporate Expert Opinion (Verrall - 2007)]] — cited as applying Bayesian MCMC models to the chain ladder.
- [[A Framework for Assessing Risk Margins (Marshall et al. - 2008)]] — assigned with it for objective A14, risk margins.

## Sources
- [Stochastic Loss Reserving Using Bayesian MCMC Models, 2nd Edition (CAS Monograph No. 8, 2019)](https://www.casact.org/sites/default/files/2021-02/08-Meyers.pdf) — the document: title and copyright pages (edition, ISBN), abstract, contents, preface, and the text, model specifications, tables and figures of Sections 1–12 and the Appendix; pages 10, 96 and 97 are blank
- [Errata, Stochastic Loss Reserving Using Bayesian MCMC Models, 2nd Edition (approved 8/13/2026)](https://www.casact.org/sites/default/files/2026-06/Monographs-8-Errata.pdf) — the four corrections under Errata, linked from the [CAS Monograph No. 8 page](https://www.casact.org/monograph/cas-monograph-no-8)
- [CAS Exam 7 Content Outline, Fall 2026](https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf) — the citation and the assigned scope
