# Answerability: Exam 8 (CAS)

Run `answerability-20261031-8` · 143 questions checked of 143 attempted · cost $22.18

Each question's official solution was broken into the knowledge it uses (by a model that saw no study page), and each item was looked for on the pages the vault gives for the question. An item counts as taught only if a quote of the teaching passage is really on the page; the check is done in code. *Answerable* is necessary, not sufficient: a page can hold the formula and still not teach it well.

| Verdict | Questions | Share |
|---|---|---|
| **Answerable** — everything taught on a tagged page, one link away, on the exam's syllabus or on a prerequisite exam's page | 41 | 29% |
| **Untagged** — everything is in the vault, but some of it on a page neither tagged nor linked | 18 | 13% |
| **Gap** — something the solution uses is taught on no page | 84 | 59% |

Requirements: 875 — tagged 491 (56%), linked 95 (11%), syllabus 28 (3%), prerequisite 0 (0%), elsewhere 68 (8%), missing 193 (22%)
Not checked: 7 off syllabus.

## By sitting

A paper whose gaps far outrun the rest may test a reading the syllabus has since dropped.

| Sitting | Questions | Answerable | Untagged | Gap |
|---|---|---|---|---|
| Fall 2012 | 18 | 6 | 1 | 11 (61%) |
| Fall 2013 | 17 | 4 | 1 | 12 (71%) |
| Fall 2014 | 18 | 2 | 1 | 15 (83%) |
| Fall 2015 | 18 | 4 | 3 | 11 (61%) |
| Fall 2016 | 17 | 6 | 0 | 11 (65%) |
| Fall 2017 | 16 | 5 | 3 | 8 (50%) |
| Fall 2018 | 13 | 4 | 4 | 5 (38%) |
| Fall 2019 | 15 | 3 | 4 | 8 (53%) |
| Undated (samples and the vault's own) | 11 | 7 | 1 | 3 (27%) |

## Gaps, by the page that should teach them

Ranked by how many questions each page's gaps cost. The page is the one named for the item's concept; "no page" means the vault has no page by that name.

### `Concepts/Experience Rating.md` — 16 question(s)

- `cas8-2012-q13` (definition): A ballast value, maximum/minimum mods and swing limits on annual rate changes are other NCCI-type devices that dampen the impact of an individual risk's experience on the modification.
- `cas8-2012-q14` (procedure): When a risk's first policy is written on a claims-made basis, the experience rating plan uses prior occurrence policies as the experience period, with the three most recent complete policy years (ending at least six months before the evaluation date) included, and applies claims-made-specific adjus…
- `cas8-2012-q14` (procedure): Expected loss cost for each experience year is the basic limit premium times the expected loss ratio, then adjusted by the premium adjustment factors (PAFs) and detrended to give the subject (expected) loss cost.
- `cas8-2012-q14` (fact): PAFs, detrend factors, and loss development factors are chosen from plan tables according to the coverage (products/completed operations vs premises/operations), the policy type (occurrence vs claims-made), and the policy year's age at the evaluation date.
- `cas8-2012-q14` (procedure): The credibility Z, expected experience ratio, and maximum single loss (MSL) are looked up in the plan table using the total subject loss cost (company subject loss cost).
- `cas8-2013-q8` (procedure): Determine credibility, expected experience ratio, and maximum single loss by finding the bracket of the table containing the total company subject loss cost (summed over the experience period).
- `cas8-2013-q9` (fact): Workers compensation losses are highly skewed, so a linear credibility estimate differs from the optimal estimate; splitting losses into primary and excess components reduces skewness and improves predictive accuracy.
- `cas8-2013-q9` (fact): A constant K implies loss ratio variance falls with risk size, which is not necessarily true; letting K increase with risk size keeps credibility of large risks below 1 and avoids large risks being essentially self-rated.
- `cas8-2014-q10` (fact): Medical-only losses are a small share of total losses and mostly small claims, so increasing their weight has little effect on predictive accuracy, unless it causes widespread underreporting.
- `cas8-2014-q11` (formula): The NCCI experience rating modification is M = (Ap + W·Ae + (1−W)·Ee + B)/(E + B), where Ap is actual primary losses, Ae actual excess losses, Ee expected excess losses, E expected losses, W the excess-loss weight, and B (balance point) and K (credibility-related constant) vary with risk size.
- `cas8-2014-q11` (fact): Empirical NCCI studies show that loss ratio variance does not decline as fast with risk size as the law of large numbers predicts, because some sources of variation (changing conditions, parameter risk, long-tailed losses, heterogeneous operations in large risks) do not diminish with size; hence B …
- `cas8-2014-q8` (procedure): Look up the credibility Z, the expected experience ratio (EER), and the maximum single loss (MSL) in the ISO manual tables using the company subject loss costs (CSLC) as the entry point.
- `cas8-2014-q9` (formula): In a single-split experience rating plan, the experience modification is M = [Zp*Ap + Ze*Ae + (1-Zp)*Ep + (1-Ze)*Ee] / E, where Ap, Ae are actual primary and excess losses, Ep, Ee are expected primary and excess losses, Zp, Ze are primary and excess credibilities, and E = Ep + Ee.
- `cas8-2015-q10` (definition): In a single-split experience rating plan, the experience mod equals unity (the manual premium/class-plan starting point) plus a primary credibility-weighted deviation of actual from expected primary losses divided by total expected loss, plus an excess credibility-weighted deviation of actual from …
- `cas8-2015-q10` (definition): Primary losses are the first layer of each claim's loss (up to the split point) and excess losses are the portion above the split point; primary and excess actual and expected losses are measured in dollars, not claim counts.
- `cas8-2015-q9` (formula): Basic limits expected loss (and ALAE) for each policy year equals annual basic limits premium times the expected loss and ALAE ratio.
- `cas8-2016-q10` (formula): Expected losses equal payroll divided by 100 times the class expected loss rate (ELR), summed across classes; expected primary losses are expected losses times the D-ratio, and expected excess losses are expected losses minus expected primary losses.
- `cas8-2016-q10` (formula): The NCCI experience rating modification (split-plan form) is Mod = (Ap + w*Ae + (1-w)*Ee + B) / (E + B), where Ap and Ae are actual primary and excess losses, Ee is expected excess losses, E is expected losses, w is the weighting value and B is the ballast value.
- `cas8-2016-q10` (procedure): The weighting value W and ballast value B are looked up in the NCCI table by the insured's expected losses, using the same table year as the ELR and D-ratio, which are looked up by state and class code.
- `cas8-2016-q10` (fact): Medical-only claims are reduced to 30% (ratable at the ERA factor) of their value before being split into primary and excess losses; indemnity claims are included at full value.
- `cas8-2016-q10` (formula): The credibility form of the modification is Mod = [Ap*Zp + Ep*(1-Zp) + Ae*Ze + Ee*(1-Ze)] / E, with Zp = E/(E+B) and Ze = w*Zp.
- `cas8-2016-q11` (fact): Tests of experience rating plans are applied to all risks in a single class together (separated by premium size), not split by subgroups within the class.
- `cas8-2016-q9` (fact): If experience rating is appropriate and rates are equitable, modified loss ratios should be similar for credit-mod and debit-mod risks, so all risks are expected to be equally profitable after the mod is applied.
- `cas8-2016-q9` (fact): An overall credit mod can result from manual rates being set too high or from insureds having higher-than-average wages (more expected losses in the class), and a credit mod does not predict future plan performance since the mod equalizes risks.
- `cas8-2017-q1` (fact): A model should not include a risk's own historical losses as a predictor when experience rating already reflects them, because doing so double counts the experience, and past losses are volatile for a risk and weakly credible.
- `cas8-2017-q9` (formula): Company subject loss costs (expected basic limits losses) for each year equal basic limit premium times the expected loss ratio (ELR) times the premium adjustment factors (Table 13B and 13C) times the detrend factor.
- `cas8-2017-q9` (procedure): The credibility Z, expected experience ratio (EER), and maximum single loss (MSL) are looked up in the ISO experience rating tables using the total company subject loss costs (expected losses).
- `cas8-2017-q9` (fact): Claims-made policies require no loss development (IBNR) in the actual experience ratio, so reported limited losses are used directly.
- `cas8-2019-q7` (fact): Trending and developing experience losses to the prospective level instead of detrending/undeveloping the expected losses gives equal weight to all experience years' expected losses, whereas the standard method weights older years differently, so the resulting mods differ.

### **no page for Lee Diagram** — 7 question(s)

- `cas8-2013-q15` (definition): A Lee diagram plots the aggregate loss distribution in entry-ratio (loss divided by expected loss) space as a unit square, where areas between the curve and the aggregate minimum/maximum entry-ratio lines represent expected insurance charge and savings.
- `cas8-2013-q16` (definition): A Lee diagram graphs the loss (as a ratio to the mean) against cumulative share of premium/claims, with the insurance charge represented by the area above the entry-ratio line and below the loss curve.
- `cas8-2014-q16` (definition): A Lee diagram plots loss size (as a ratio to expected loss) against the cumulative percentage of claims or probability, so that the area represents expected loss and the effects of the occurrence and aggregate limits can be shown as the portions cut off.
- `cas8-2015-q14` (procedure): Construct a Lee diagram (loss size on the vertical axis, cumulative probability on the horizontal axis) and read expected values as areas: the area under the curve is the expected loss, and area between the limited and unlimited curves gives excess losses; the area above the aggregate limit under t…
- `cas8-2016-q14` (procedure): On a Lee diagram, the charge for the maximum premium is the area between the unlimited aggregate loss curve and the entry ratio at the maximum premium, the charge for the loss limit is the area between the unlimited and limited loss curves, and the overlap is the area common to both.
- `cas8-2016-q15` (procedure): Use a Lee diagram (loss distribution as ordered loss sizes with equal probability) to find expected excess loss above a retention: sum the layer width above the retention times the probability mass of losses exceeding each level, and search for the retention that gives a target excess loss.
- `cas8-2017-q12` (definition): A Lee diagram plots size of loss on the vertical axis against the cumulative probability (0 to 1) on the horizontal axis, so that areas represent expected loss amounts, with the area to the left of the curve and under a given loss size representing expected loss up to that size.

### `Concepts/Retrospective Rating.md` — 7 question(s)

- `cas8-2014-q15` (procedure): Determine the Aggregate Expected Loss as standard premium × expected loss ratio × state/hazard group differential.
- `cas8-2014-q15` (procedure): Measure the effect of using outdated ranges as the difference between the premium under the correct (updated) ELG and under the outdated ELG, divided by the premium under the correct (updated) ELG.
- `cas8-2014-q17` (procedure): Balance equations with a per-occurrence limit: compute the difference between max and min entry ratios as (G - H)/(c·Ê·T) and the difference in table values X̂_H - X̂_G as (e + E - H/T)/(c·Ê), using the limited expected loss Ê (unlimited E less the excess loss factor); then find the entry ratio pai…
- `cas8-2014-q18` (formula): The difference between the entropy-type loss ratios at the maximum and minimum premium points is r_G - r_H = (G - H)/(c E), where G is maximum premium, H is minimum premium, c is the loss conversion factor and E is expected losses.
- `cas8-2015-q16` (fact): With no specified minimum premium, the minimum premium is H = bT (the basic premium times the tax multiplier), so ψ(r_H) = 0, not H = 0.
- `cas8-2015-q16` (formula): When there is no specified minimum premium, the balance equation reduces to ψ(r_G) = (G/T − (E + e)) / (cE).
- `cas8-2016-q14` (fact): When a retrospective rating plan has both a per-occurrence loss limit and a maximum premium, the charges for the two overlap, because capping individual losses makes it less likely that aggregate losses reach the maximum premium, so the maximum premium charge partly double counts what the loss limi…
- `cas8-2017-q17` (formula): Total expected loss cost with a per-occurrence limit and aggregate deductible/limit = expected unlimited losses minus expected limited losses (excess of per-occurrence limit) plus expected limited losses × insurance charge at the entry ratio (aggregate limit / limited expected losses).
- `cas8-2019-q14` (fact): A per-occurrence limit reduces the variance of the aggregate loss distribution and the likelihood of reaching the maximum premium, so the insurance charge φ(r_G) is lower than an unlimited Table M charge.

### `Concepts/Credibility.md` — 6 question(s)

- `cas8-2012-q6` (fact): Bailey and Simon use earned premium at present rates as the exposure base in the territory/class analysis (for credibility) to eliminate maldistribution caused by high-frequency territories having more non-accident-free risks and higher territorial relativities.
- `cas8-2012-q6` (fact): Using earned premium as the exposure base is appropriate only if high-frequency territories are also high-premium territories and the territorial relativities are correct; otherwise earned car years is the more appropriate base.
- `cas8-2014-q1` (fact): If the predicted-to-actual ratio decreases across quintiles (predictions too high for low-risk groups and too low for high-risk groups), the predictions are not reacting enough to the raw data, so credibility is understated; the reverse pattern indicates overstated credibility.
- `cas8-2014-q1` (fact): Overstated credibility makes predictions too extreme (like the raw data), while understated credibility makes predictions stay too close to the countrywide average, so the credibility-weighted prediction should be compared with the holdout, not with the raw test data.
- `cas8-2016-q1` (formula): The credibility implied by experience is Z = 1 minus the relative frequency of the group with that experience (compared to the overall average frequency).
- `cas8-2017-q3` (formula): The credibility of an accident-free class is estimated as Z = 1 minus the class's relative claim frequency, since relative frequency = Z*R + (1-Z) with R the relativity under full credibility being zero for the accident-free class.
- `cas8-2017-q3` (procedure): Relative credibility of one class is the ratio of its credibility to the credibility of a base class (e.g., 3+ years accident-free credibility divided by 1+ years or 0+ years credibility).
- `cas8-2018-q3` (formula): When no prior-year data are available, the relative claim frequency of the zero-claim-free-years (newly claim-involved) group under Poisson claims with parameter lambda is approximated as R = 1/(1 - e^(-lambda)), the inverse of the probability of at least one claim.
- `cas8-2019-q1` (formula): The multi-dimensional credibility estimate for a quantity is the complement of credibility (storm zone/overall) mean for that quantity plus the sum over each type of its coefficient times (sector mean minus zone mean) for that type, including the type being estimated.
- `cas8-2019-q1` (fact): In multi-dimensional credibility, a sector whose other-type frequencies exceed the zone's raises the estimate above the complement mean (positive coefficient times positive deviation), which can outweigh a negative deviation in the target type and make the estimate higher than the single-dimensiona…

### `Concepts/Large Deductible Policy.md` — 6 question(s)

- `cas8-2012-q20` (formula): Total expected loss and ALAE for a large deductible policy with an aggregate equals expected excess losses plus the insurance charge times expected limited losses, with the charge applied only to limited losses.
- `cas8-2013-q18` (procedure): For an LDD policy, the excess loss ratio above a retention above the empirical cut-off is estimated by blending empirical and fitted data: the empirical excess ratio at the cut-off multiplied by the fitted-curve excess ratio for losses truncated and shifted at the cut-off.
- `cas8-2013-q19` (formula): Expected unlimited loss for a policy equals standard premium times the expected ultimate loss ratio.
- `cas8-2015-q14` (fact): If the limited loss distribution changes but the unlimited distribution does not, any increase in the insurance charge area is offset by an equal decrease in the excess loss area, so total loss cost and hence the LDD premium are unchanged.
- `cas8-2015-q19` (fact): Large dollar deductible insurers service claims from the ground up and so compete on both price and claim service quality, whereas excess insurers (with the deductible layer handled by a TPA or the insured) compete mainly on price, which can allow higher profit loads for large dollar deductible pol…
- `cas8-2015-q19` (fact): Large dollar deductible policies have a shorter average payout period because they pay from the first dollar, whereas excess policies pay only once the layer is reached, giving more time to earn investment income and so supporting a smaller profit load for the same target return on surplus.
- `cas8-2016-q15` (fact): The profit load on LDD policies is generally higher than on excess workers compensation policies because LDD insurers compete on both price and service (full claim service), whereas excess insurers compete mainly on price, which drives down profit.

### **no page for Merit Rating Plans** — 3 question(s)

- `cas8-2014-q5` (fact): Merit rating plans that use earned premium as the exposure base implicitly assume that high-frequency territories are also high-premium territories.
- `cas8-2014-q5` (fact): Using earned premium as the exposure base in a merit rating plan assumes that territorial differentials are proper/adequate, so premium at base-rate level reflects territorial risk differences.
- `cas8-2014-q5` (procedure): Claim frequency for a merit rating class group is incurred claims divided by the exposure base (earned premium, not car years), cumulated over the classes in the group (e.g., 2 or more accident-free years combines the 3+ and 2 year classes).
- `cas8-2014-q5` (formula): The merit rating modification factor for a group equals the group's claim frequency divided by the overall (total) claim frequency.
- `cas8-2014-q5` (formula): The credibility (premium credit) of a merit rating group equals 1 minus its modification factor.
- `cas8-2015-q1` (fact): Using car-years as the exposure base in a merit rating plan can create maldistribution, because risks in different classes or territories have different claim frequencies, so merit-rating groups reflect those non-merit differences.
- `cas8-2015-q1` (fact): Earned premium as an exposure base corrects for maldistribution only if the rate differentials embedded in premium (e.g., territorial) are proper; if such differentials are prohibited or improper, premium is not necessarily a better exposure base.
- `cas8-2015-q1` (procedure): Group classes by accident-free years, compute claim frequency (claims / earned car years) for each group and overall, and set the group's mod equal to its frequency divided by the overall frequency.
- `cas8-2017-q3` (procedure): Accident-free classes are cumulative: the 'n or more years' class pools all classes with at least n accident-free years (sum claims and sum exposures across those classes) before computing its frequency.

### **no page for Risk Classification Statement of Principles** — 3 question(s)

- `cas8-2012-q4` (fact): A rating variable should be constant in relation to the risk (constancy), so a characteristic that changes substantially from year to year is a poor classification variable.
- `cas8-2016-q2` (fact): The AAA Risk Classification Statement of Principles lists considerations for a classification system: homogeneity, credibility, expense, predictive stability, availability of coverage, avoidance of extreme discontinuities, and public acceptability.
- `cas8-2016-q3` (definition): Hazard reduction incentive (a social consideration) means a classification system should encourage insureds to reduce their hazard exposure, which requires the variable to be linked to controllable losses.

### **no page for Increased Limits Factors** — 2 question(s)

- `cas8-2015-q8` (fact): Reported losses may not be fully developed, and a fitted distribution can incorporate loss development, including the dispersion of development, which empirical ILFs cannot do directly.
- `cas8-2016-q8` (procedure): To test for anti-selection, compute ILFs using only the experience of policies that purchased the higher limit (the group) and compare them to ILFs computed using the experience of all policies combined (the total population); if the ILFs differ, anti-selection exists, and if there were no anti-sel…
- `cas8-2016-q8` (procedure): The ILF for the total population is computed by combining the limited severities across all policy-limit groups (weighted by the share of policies in each group) at each severity limit, then dividing by the combined limited severity at the basic limit.

### **no page for Insurance Charge Reflecting Loss Limitation (ICRLL)** — 2 question(s)

- `cas8-2013-q19` (formula): The LUGS adjustment factor F = (1 + 0.8·LER)/(1 − LER) is applied to expected unlimited loss, along with the state hazard group relativity, to obtain adjusted losses used to select the Table M expected loss group.
- `cas8-2013-q19` (procedure): Under ICRLL, expected loss cost equals the insurance charge times expected limited loss plus expected excess loss; dividing by standard premium expresses it as a percent of standard premium.
- `cas8-2013-q19` (fact): ICRLL gives reasonably accurate insurance charges because the per-loss limit or deductible reduces losses counting toward the aggregate limit, so using the unadjusted charge would double count (overlap) the losses removed by the per-loss limit and aggregate limit; the LUGS adjustment selects a larg…
- `cas8-2017-q17` (procedure): The ICRLL procedure adjusts for a per-occurrence limit by inflating the expected unlimited losses (multiplied by the state/hazard group differential and an adjustment factor based on the excess ratio) and using the result to select the expected loss group, so the Table M column reflects the lower v…
- `cas8-2017-q17` (formula): Adjusted expected losses for ELG selection = expected unlimited aggregate losses × hazard group differential × (1 + D·k)/(1 − k), where k = 1 − limited expected losses/unlimited expected losses is the excess ratio due to the per-occurrence limit and D is the aggregate deductible-to-expected-loss re…
- `cas8-2017-q17` (fact): A per-occurrence limit reduces the variance of the severity and aggregate loss distributions, which is equivalent to a policy with larger expected losses (lower relative variance); hence the ICRLL uses a larger adjusted expected loss to select the Table M column (loss group).

### **no page for Table M** — 2 question(s)

- `cas8-2013-q19` (procedure): Map the adjusted expected loss to the Table M expected loss group whose range contains it.
- `cas8-2016-q14` (procedure): Table M handles the overlap approximately: the Aggregate Excess Loss (AEL) procedure and the Increased Limits Ratio for Retrospective Loss Limitation (ICRLL) adjustment use the charge for a larger expected loss size, which has a less skewed, flatter aggregate distribution, to approximate the limite…
- `cas8-2016-q14` (fact): Table M is based on countrywide data, is more credible, can be updated for inflation by adjusting the excess loss group (ELG) table, and is flexible for changing loss limits since it does not need a separate table for each limit.

### `Concepts/Loss Elimination Ratio.md` — 2 question(s)

- `cas8-2013-q13` (fact): As the entry ratio goes to infinity, the Table L charge approaches the loss elimination ratio k (the charge never falls below k) when the table reflects per-occurrence loss limits.
- `cas8-2014-q12` (formula): Loss elimination ratio (LER) from the per-accident limit equals 1 − (expected limited losses / expected unlimited losses), and the expected loss ratio is the average loss ratio across the risks.

### `Concepts/Schedule Rating.md` — 2 question(s)

- `cas8-2017-q10` (procedure): Size a schedule debit or credit by judging the fraction of the experience period that does not reflect the current risk condition and applying that fraction to the maximum allowed modification for the characteristic.
- `cas8-2018-q11` (procedure): Look up the credibility Z, expected experience ratio (EER), and maximum single loss in the plan's credibility and maximum single loss table using the company subject loss cost.
- `cas8-2018-q11` (fact): Under the ISO CGL plan, the maximum schedule credit for employee training is 6% and for a safety program is 2%, and the total schedule mod is capped by the sum of category maximums.

### **no page for Actual Reported Unlimited Loss Layer (ARULL)** — 1 question(s)

- `cas8-2012-q14` (formula): Expected reported unlimited losses (ARULL) for each year equal the subject loss cost times the expected experience ratio (EER) times the loss development factor for that year's maturity; the totals across years are used in the modification.

### **no page for Aggregate Deductible Insurance Charge** — 1 question(s)

- `cas8-2012-q20` (formula): The aggregate deductible ratio r equals the aggregate deductible divided by expected limited losses (expected unlimited loss × (1 − ELPPF)).

### **no page for Aliasing in GLMs** — 1 question(s)

- `cas8-2015-q2` (definition): Extrinsic aliasing is perfect dependence between covariates that comes from the nature of the data rather than the variable definitions, e.g. all observations in one level of one factor fall in one level of another factor, so the two parameters are identical.
- `cas8-2015-q2` (procedure): To remove near aliasing, remove or reclassify the few offending observations that cause the near-perfect correlation; this can then turn the near aliasing into extrinsic aliasing, which is addressed by dropping one of the aliased parameters.

### **no page for Centering Variables in a GLM** — 1 question(s)

- `cas8-2019-q6` (procedure): To center a continuous predictor at its base level, add the predictor's main-effect coefficient times the base value (here ln of base AOI) to the original intercept; the main-effect and interaction coefficients are unchanged and the interaction is not included in the adjustment.
- `cas8-2019-q6` (fact): After centering at base levels, the intercept represents the predicted value (base rate) for a risk at all base levels, making it directly interpretable.
- `cas8-2019-q6` (fact): Centering makes coefficients of variables involved in interactions more intuitive, avoiding counterintuitive signs (e.g., a positive sprinklered coefficient) that arise when the continuous variable is zero outside the data's range; it does not change the continuous variable's own coefficient or sig…

### **no page for Company Subject Loss Cost** — 1 question(s)

- `cas8-2015-q9` (procedure): Company subject loss cost (CSLC) for each year is the basic limits expected loss multiplied by the present-adjustment factors (PAF, e.g. exhibits 13B and 13C) and the loss cost detrend factor for that year.

### **no page for Company Subject Loss Costs** — 1 question(s)

- `cas8-2014-q8` (fact): Company subject loss costs are already detrended, so no further trend or detrend factors are applied to them in the experience rating calculation.

### **no page for Correlation of Years Test** — 1 question(s)

- `cas8-2012-q3` (procedure): The correlation of years test for parameter shift pairs average frequencies separated by t years, computes the correlation of the pairs for each separation t, and concludes the parameter is shifting if correlation decreases as t increases.

### **no page for Credibility and Maximum Single Loss Table** — 1 question(s)

- `cas8-2015-q9` (fact): The total CSLC is used to look up in the plan tables the credibility Z, the expected experience ratio (EER), and the maximum single loss (MSL).

### **no page for Data Preparation for GLMs** — 1 question(s)

- `cas8-2012-q2` (procedure): Missing data coded as an 'unknown' level can be perfectly correlated across factors (extrinsic aliasing); remedies include removing those records, reclassifying them to an appropriate level, or dropping the unknown level from one factor.

### **no page for Effect of Per-Accident Limits on Severity Changes** — 1 question(s)

- `cas8-2013-q15` (fact): An increase in the most severe losses raises total losses but barely changes limited losses, since those losses are already capped by the per-accident limit, so the LER increases and the gap between the total and limited curves widens, especially at high aggregate loss levels.

### **no page for Entry Ratio** — 1 question(s)

- `cas8-2013-q18` (formula): The entry ratio for a fitted truncated and shifted distribution equals the (retention minus cut-off) divided by the average truncated and shifted loss; it is used to look up the excess ratio.

### **no page for Excess Loss Factors** — 1 question(s)

- `cas8-an-011` (fact): Applying unadjusted bureau excess factors, which are ratios to the bureau pure premium, to a loss-only estimate that excludes items in the pure premium (e.g., LAE) understates excess losses, so the bureau pure premium basis should be checked first when parts sum below the total.

### **no page for Excess Loss Pure Premium Factors** — 1 question(s)

- `cas8-2014-q14` (formula): For a layer attached above the empirical truncation point t, the excess ratio is the product of the empirical excess ratio at t and the fitted (truncated and shifted, unity-mean) excess ratio at the remaining amount: R(a) = R(t) * R_hat(a - t).

### **no page for Excess Loss Ratio** — 1 question(s)

- `cas8-2016-q17` (formula): For a limit above the truncation point T, the overall excess ratio equals the empirical excess ratio at T times the fitted-curve excess ratio at entry ratio (L−T)/mean of truncated and shifted losses.

### **no page for Excess Loss Ratios by Hazard Group** — 1 question(s)

- `cas8-2012-q17` (procedure): In the hybrid excess ratio method, for limits at or below the cutoff (e.g. $200,000), the excess ratio is taken directly from the observed (empirical) excess ratio data.
- `cas8-2012-q17` (procedure): For limits above the cutoff, compute the entry ratio as (limit minus cutoff) divided by the average size of loss truncated and shifted at the cutoff, then look up the excess ratio from the fitted mixed Pareto-exponential curve at that entry ratio.
- `cas8-2012-q17` (formula): The excess ratio at a limit above the cutoff equals the observed excess ratio at the cutoff multiplied by the excess ratio of the truncated-and-shifted distribution at the entry ratio: R(L) = R_obs(cutoff) × R_fitted((L − cutoff)/mean).

### **no page for Excess Ratio Table Lookup** — 1 question(s)

- `cas8-2013-q18` (procedure): When the entry ratio falls between tabulated values, the excess ratio is found by linear interpolation between the adjacent table entries (or rounding to the nearest entry).

### **no page for Excess Ratio for Developed Losses** — 1 question(s)

- `cas8-2012-q12` (fact): For a fixed mean, greater dispersion (higher CV) in the loss multipliers increases the excess ratio at higher limits, so a less dispersed multiplier distribution gives a lower excess ratio.

### **no page for Excess Workers Compensation Insurance Pricing** — 1 question(s)

- `cas8-2016-q15` (formula): Excess workers compensation premium = [expected excess loss × (1 + ULAE ratio) + standard premium × general overhead] / (1 − acquisition − taxes − profit).

### **no page for Excess Workers Compensation Policy Pricing** — 1 question(s)

- `cas8-2014-q19` (fact): For an excess WC policy, the premium covers only losses above the deductible (ELPPF plus insurance charge) with ULAE applied to the whole excess loss, and it excludes the credit risk and loss-based assessment loads that apply to LDD policies; only general overhead is based on standard premium.

### **no page for Expected Loss Groups and Table of Insurance Charges** — 1 question(s)

- `cas8-2014-q15` (procedure): Assign the risk to an Expected Loss Group (ELG) by finding the expected loss size range in the Retrospective Rating Manual table containing its expected loss; then look up Φ(r_G) and Ψ(r_H) from the Table of Insurance Charges for that ELG and the entry ratios.
- `cas8-2014-q15` (fact): When expected loss size ranges are inflated, a risk's expected loss may fall in a different (higher-numbered) ELG, which changes the insurance charge and savings used; failing to update ranges therefore misstates retro premium.

### **no page for Expected Loss Groups for Aggregate Deductible Insurance Charges** — 1 question(s)

- `cas8-2012-q20` (formula): Loss group size used to select the expected loss group is the expected unlimited loss times the hazard group/state differential m, times (1 + 0.8 × ELPPF)/(1 − ELPPF).
- `cas8-2012-q20` (procedure): Look up the state and hazard group differential and the ELPPF in the state's published tables, using the most recent effective-dated tables (e.g. the 2008 expected loss range table) unless a different year is stated, then map the adjusted loss size to an expected loss group.

### **no page for Factor Comparison Test for Two-Dimensional ILFs** — 1 question(s)

- `cas8-2013-q5` (procedure): Factor comparison test: the increase in ILF from raising the aggregate (or occurrence) limit must be larger at a lower fixed level of the other limit than at a higher level, so the difference between columns/rows is compared across adjacent limits to bound the unknown.

### **no page for Fitting Loss Distributions for ILFs** — 1 question(s)

- `cas8-2015-q8` (fact): Fitting a single curve to the whole loss distribution can overstate losses in some intervals and understate them in others, because one parametric form seldom fits all size-of-loss ranges well.
- `cas8-2015-q8` (procedure): Pick a truncation (cutoff) point: use the empirical distribution directly below it, where data is plentiful and credible, and fit a curve to the shifted and truncated data above it.
- `cas8-2015-q8` (fact): The truncation point should be a round number chosen to maximize reliance on actual data while leaving enough data above it to fit a distribution reasonably, before the data thins out.
- `cas8-2015-q8` (fact): The fitted curve above the truncation point should be joined smoothly to the empirical distribution below it, yielding a consistent set of ILFs.

### **no page for Franchise Deductible** — 1 question(s)

- `cas8-2018-q2` (definition): A franchise deductible pays the full loss amount if the loss exceeds the deductible and nothing if the loss is at or below it (no reduction of the amount paid once it is exceeded).

### **no page for Frequency and Average Premium Relativities** — 1 question(s)

- `cas8-2012-q6` (procedure): To test whether earned premium is a suitable exposure base, compare each territory's relative frequency (claims per car year) with its relative average premium (premium per car year) to see whether high-frequency territories have high average premium.

### **no page for GLM Model Refinement** — 1 question(s)

- `cas8-2016-q6` (fact): Variable stability (consistency of a coefficient estimate across data subsets or samples, or over time) is distinct from variable significance and from penalized fit measures like AIC and BIC.

### **no page for Guaranteed Cost Plan** — 1 question(s)

- `cas8-2019-q16` (fact): A guaranteed cost policy has a fixed premium known at inception, giving stable cash flow, but it does not adjust for good loss experience and typically costs more upfront because the insurer bears all loss variability.

### **no page for Hazard Group Excess Ratios and Mean Residual Life** — 1 question(s)

- `cas8-2012-q17` (fact): A single fitted curve can reasonably be used for all hazard groups if the truncated and normalized (shifted, scaled by mean) loss distributions above the cutoff have similar shapes across hazard groups; Mahler found similar mean residual life shapes across hazard groups.

### **no page for ICRLL Procedure** — 1 question(s)

- `cas8-2014-q17` (formula): With a per-occurrence limit, the adjusted expected loss used to select the expected loss group is E times (1 + 0.8·LER)/(1 - LER), where LER is the excess loss factor divided by the unlimited expected loss ratio, so the adjusted expected losses determine the ELG in Table M.

### **no page for Increased Limit Factors** — 1 question(s)

- `cas8-2018-q8` (fact): A risk-adjusted ILF is mathematically grounded but its load is embedded in the pure premium and less visible to laypersons, whereas an explicit profit and contingency load by limit is more transparent and easily understood by non-technical audiences.

### **no page for Increased Limits Factors Portfolio Average** — 1 question(s)

- `cas8-2017-q7` (procedure): The premium impact of a change in ILFs for a portfolio is the ratio of the exposure-weighted average ILF under the new method to that under the old method, minus 1, with any base premium cancelling when applied consistently.

### **no page for Insurance Charge (Table M)** — 1 question(s)

- `cas8-2013-q12` (procedure): Compute the insurance charge recursively: φ(r_i) = φ(r_{i+1}) + (r_{i+1} − r_i) × (proportion of risks with entry ratio above r_i), working downward from the largest entry ratio where φ = 0; the table must include rows at every observed entry ratio.

### **no page for Layer Method vs Size Method** — 1 question(s)

- `cas8-2017-q12` (fact): The layer method is convenient when the survival function is easy to integrate or when computing expected loss at many limits (each added layer is just an additional slice); the size method is more intuitive for a single limit and when working with the density or algebraic evaluation of integrals.

### **no page for Linear Interpolation** — 1 question(s)

- `cas8-2016-q17` (procedure): Read an excess ratio at an entry ratio not listed in a table by linear interpolation between the adjacent tabulated entry ratios.

### **no page for Loss Dispersion** — 1 question(s)

- `cas8-2013-q7` (fact): Greater variability (CV) of the dispersion produces higher excess ratios; simple dispersion has less impact than gamma dispersion and more impact than uniform dispersion.

### **no page for Loss-Free Modification** — 1 question(s)

- `cas8-2014-q9` (definition): The loss-free modification is the experience mod when the account has no actual losses, equal to [(1-Zp)Ep + (1-Ze)Ee]/E, i.e., the mod with Ap = Ae = 0.

### **no page for Mixed Pareto-Exponential Excess Ratio Curve** — 1 question(s)

- `cas8-2012-q17` (fact): Advantages of the hybrid method: it uses actual experience at lower limits where data is credible; it uses a fitted curve at higher limits where data is sparse; and the mixed Pareto-exponential joins the empirical ratios smoothly at the cutoff, capturing exponential decay for mid-size losses while …

### **no page for Model Validation Plots** — 1 question(s)

- `cas8-2019-q2` (fact): Drawbacks of validation plots: quintile plots need separate plots per model and may be skewed by uneven risk sizes; double lift charts are hard to interpret and do not show actual dollar levels; loss ratio plots show only differentiation/ranking, not prediction accuracy.

### **no page for Multi-Dimensional Credibility for Workers Compensation Excess Loss Ratios** — 1 question(s)

- `cas8-2015-q5` (formula): In multi-dimensional credibility for workers compensation injury-type ratios, the estimate for a class's ratio of one injury type to another is the hazard group's overall ratio plus weighted adjustments: each weight times the difference between the class's and the hazard group's ratio of another in…
- `cas8-2015-q5` (procedure): Compute each injury-type ratio (e.g. permanent total claims per temporary total claim) for a class and for the hazard group by pooling claim counts across all experience years, as total claims of the injury type divided by total temporary total claims.

### **no page for NCCI Table of Aggregate Excess Loss Factors (Expected Loss Groups)** — 1 question(s)

- `cas8-2015-q16` (procedure): Find the expected loss group (ELG) from the expected loss adjusted by the state/hazard group differential (adjusted E = E × differential), and use the NCCI table for that ELG to find the entry ratio r_G and φ(r_G) satisfying the required value of φ(r_G)+r_G; use the unadjusted E in the premium form…

### **no page for NCCI Table of Expected Loss Ranges** — 1 question(s)

- `cas8-2018-q14` (procedure): Convert the adjusted expected loss to the unadjusted expected loss by dividing by the state/hazard group differential, then use that expected loss and the entry ratios to look up the insurance charge and savings from the NCCI table of expected loss ranges.

### **no page for Net Insurance Charge** — 1 question(s)

- `cas8-2018-q14` (fact): Insurance charges from different sources must be compared on the same basis (dollars, percent of standard premium, or percent of expected loss).

### **no page for Penalized Regression for High-Cardinality Categorical Features** — 1 question(s)

- `cas8-an-005` (formula): In a single-feature Gaussian identity-link penalized (ridge-type) regression on a high-cardinality categorical feature, the coefficient for level k is the level's deviation from the overall mean divided by (lambda/n_k + 1): beta_k = (ybar_k - ybar)/(lambda/n_k + 1).
- `cas8-an-005` (procedure): The predicted value for a level in a single-feature penalized regression equals the overall mean (intercept) plus the shrunk level coefficient.

### **no page for Premium Adjustment Factors and Loss Detrending** — 1 question(s)

- `cas8-2017-q9` (procedure): Premium adjustment factors (Table 13B for current-level/base adjustment and Table 13C by policy year) and detrend factors are looked up by policy year, with detrend factors being larger (closer to 1) for more recent years and smaller for older years.

### **no page for Premium Discount** — 1 question(s)

- `cas8-2015-q17` (fact): In a retrospectively rated policy the premium discount is implicit, reflected as a reduction of expenses within the basic premium, whereas in a guaranteed cost policy it is explicitly deducted from the standard premium.

### **no page for Primary and Excess Losses (Split Point)** — 1 question(s)

- `cas8-2016-q10` (definition): Primary losses are the first portion of each claim's loss up to the split point; excess losses are the part of each claim's loss above the split point.
- `cas8-2016-q10` (procedure): Apply the split point to each claim separately: primary loss is the lesser of the (adjusted) claim loss and the split point, and excess loss is the remainder, which is zero when the claim is below the split point.

### **no page for Prior Weights in GLMs** — 1 question(s)

- `cas8-2014-q3` (procedure): For a retention GLM with binomial errors, the prior weight ω_i is set to the number of trials, such as the number of policies up for renewal in the cell (or 1 for individual policy records).

### **no page for Pure Premium Rating** — 1 question(s)

- `cas8-2017-q1` (procedure): Manual premium is the modeled pure premium rate multiplied by exposure (payroll divided by 100 for a rate per $100 of payroll).

### **no page for Purposes of Risk Classification (AAA Statement of Principles)** — 1 question(s)

- `cas8-2013-q1` (fact): The three primary purposes of risk classification in the AAA Risk Classification Statement of Principles are to protect the financial soundness of the insurance system, to enhance fairness, and to encourage availability of coverage by allowing economic incentives to operate.

### **no page for Quintiles Test** — 1 question(s)

- `cas8-2015-q5` (fact): An individual class SSE test is noisy because individual classes are small and volatile relative to the hazard group; grouping classes into quintiles diversifies away class-specific random variation and gives a more credible evaluation of the credibility procedure.

### **no page for Retrospective Development Factor** — 1 question(s)

- `cas8-2012-q19` (fact): Retrospective development factors stabilize premium adjustments: without them early adjustments are usually refunds because losses are still immature, and the insured must repay as losses develop, so including them brings early premium closer to ultimate, reducing back-and-forth payments and the in…

### **no page for Retrospective Development Premium** — 1 question(s)

- `cas8-2012-q19` (formula): Retrospective development premium = loss conversion factor × standard premium × retrospective development factor, charged to cover expected future loss development at the adjustment.

### **no page for Retrospective Premium Formula** — 1 question(s)

- `cas8-2014-q17` (fact): Raising the per-occurrence limit lowers the excess loss factor (and the basic premium charge) but raises the limited expected losses included in the converted loss portion; these offset dollar for dollar. Actual retro premium only falls if actual losses are lower than expected.

### **no page for Risk Load Calculation for Increased Limit Factors** — 1 question(s)

- `cas8-2018-q8` (procedure): Calculating a risk load for ILFs requires calibrating the risk constant k to the portfolio and computing the load for each limit, which is technically more demanding than judgmentally selecting a profit and contingency load per limit.

### **no page for Severity Modeling** — 1 question(s)

- `cas8-an-004` (fact): In a severity model a deductible removes many small claims, so average claim size rises with the deductible; a positive severity coefficient is therefore a distortion and not the cost of the coverage.

### **no page for Shifting Risk Parameters** — 1 question(s)

- `cas8-2016-q1` (procedure): Compute expected claims for the insureds claim-free for t years by multiplying the number of claim-free insureds in each class by that class's expected claim frequency and summing across classes.
- `cas8-2016-q1` (formula): The average frequency of the group claim-free for t years is total expected claims divided by total insureds, and the relative frequency is this average divided by the average frequency at t=0 (or for the whole group).
- `cas8-2016-q1` (fact): If an insured's underlying chance of accident is stable over time, credibility is proportional to the number of years of experience, so the ratio of the n-year credibility to the 1-year credibility is approximately n.
- `cas8-2016-q1` (procedure): Alternative test: compute correlations between class distributions (or frequencies) at different time lags and average them by lag; correlation that decreases as lag increases indicates risk parameters are changing over time.

### **no page for Simple Dispersion** — 1 question(s)

- `cas8-2013-q7` (formula): With simple dispersion (loss multiplied by factors m_i with equal probability), the dispersed excess ratio at L is the probability-weighted average of m_i × R(L/m_i), where R is the undispersed excess ratio.
- `cas8-2013-q7` (procedure): To apply the dispersion formula, divide the limit by each multiplier to get the undispersed loss level, look up or compute R at that level, and weight it by the multiplier (not divide the multiplier).
- `cas8-2013-q7` (fact): Dispersion increases excess losses without changing total expected losses, raising excess ratios at higher limits while altering (possibly lowering) those at lower limits.

### **no page for Table L** — 1 question(s)

- `cas8-2016-q14` (fact): Table L is built from California data and includes California premium taxes, so it is inappropriate for use in other states, and it gives more accurate charges for a fixed loss limit without needing many tables.

### **no page for Table L (Aggregate Loss Charges)** — 1 question(s)

- `cas8-2012-q18` (fact): When a per-occurrence limit is used with an aggregate limit, the charge relative to total unlimited losses equals the LER plus the share of losses eliminated by the aggregate cap on limited losses expressed relative to unlimited total losses; at entry ratios above the maximum limited aggregate, the…
- `cas8-2012-q18` (fact): The adjustment factor (1 − k), where k is the LER, is applied to the aggregate charge only when the charge is expressed as a ratio to expected limited losses, not when expressed relative to total unlimited losses.

### **no page for Table L (Aggregate Loss Distribution Tables)** — 1 question(s)

- `cas8-2014-q12` (fact): The Table L charge at zero entry ratio equals 1, and the charge at the highest entry ratio of the limited data equals the LER (k), since limited losses cannot all be eliminated.

### **no page for Table L (Aggregate Loss Distribution) Insurance Charge** — 1 question(s)

- `cas8-2013-q13` (fact): At an entry ratio of zero the Table L charge equals 1 for every premium size, since all expected loss is in excess of zero.
- `cas8-2013-q13` (fact): For a fixed premium size, the Table L charge is a decreasing, convex (concave up) function of entry ratio.

### **no page for Table L with Per-Occurrence Limits (Lee Diagram)** — 1 question(s)

- `cas8-2014-q12` (formula): For limited losses, the entry ratio is the limited loss ratio divided by the unlimited expected loss ratio, and the charge at that ratio is φ* = φ(1 − k) + k, where φ is the partial charge computed from the limited distribution and k is the LER.

### **no page for Table M (Aggregate Excess Loss Factors)** — 1 question(s)

- `cas8-2017-q16` (procedure): To build an empirical Table M, group insureds with similar loss potential, compute each risk's entry ratio from its aggregate loss and the group's average aggregate loss, and sort the entry ratios in increasing order.
- `cas8-2017-q16` (procedure): For each entry ratio r, determine the percentage of risks whose entry ratio exceeds r.
- `cas8-2017-q16` (formula): Charge(r_i) = Charge(r_{i+1}) + (r_{i+1} − r_i) × (percent of risks with entry ratio above r_i), starting with charge 0 at the highest entry ratio and working down.

### **no page for Table M (Excess Loss Charges)** — 1 question(s)

- `cas8-2014-q13` (definition): The entry ratio is a risk's aggregate loss ratio divided by the average loss ratio of all risks in the table, so entry ratio r corresponds to a loss ratio of r times the mean.
- `cas8-2014-q13` (procedure): Alternatively, compute the charge by horizontal slicing: cumulate, over entry ratio intervals, the interval width times the fraction of risks whose entry ratio exceeds the interval, to get the charge as the integral of the survival function above r.
- `cas8-2014-q13` (procedure): When an unknown value affects the mean, bound the unknown to find the range of the mean and cutoff loss ratio, to determine which risks lie above the entry-ratio cutoff and so contribute to the charge.

### **no page for Table M (Insurance Charge)** — 1 question(s)

- `cas8-2019-q12` (fact): The insurance charge is zero at a retention at or above the maximum possible aggregate loss, since no losses exceed it.

### **no page for Table M / Insurance Charge** — 1 question(s)

- `cas8-2017-q17` (procedure): Interpolation is not needed when the entry ratio matches a table row; otherwise insurance charges are read from the row/column for the entry ratio and expected loss group (the state hazard group differential accounts for state and hazard riskiness in the adjustment).

### **no page for Two-Dimensional Consistency Test for Increased Limits Factors** — 1 question(s)

- `cas8-2013-q5` (definition): A two-dimensional (occurrence/aggregate) ILF table is consistent if its factors satisfy the marginal-consistency conditions along both the occurrence-limit and aggregate-limit dimensions.
- `cas8-2013-q5` (procedure): The feasible range for an unknown ILF is the intersection of the bounds from all consistency conditions in both dimensions.

### **no page for Workers Compensation Off-Balance** — 1 question(s)

- `cas8-2013-q11` (fact): Experience rating mods tend to offset rate inadequacy, so the off-balance rises above 1.0 when rates are inadequate; as rate adequacy improves over successive years, the off-balance declines toward 1.0.
- `cas8-2013-q11` (fact): The off-balance masks the true rate need: when adequacy improves, the falling off-balance dampens the indicated rate decrease (the indicated rate level change is smaller than it otherwise would be), and rates may remain inadequate even after the off-balance has fallen.
- `cas8-2013-q11` (fact): If inadequate rates are approved, the off-balance factor increases and partially (not fully) corrects for the inadequacy, reducing the degree of premium inadequacy while rates remain inadequate.

### `Concepts/Correlation.md` — 1 question(s)

- `cas8-2015-q4` (procedure): The correlation test for shifting parameters: compute the correlation between frequencies for all pairs of years separated by the same lag, average these correlations for each lag (1-year, 2-year, etc.), and conclude the parameters are shifting if average correlation decreases as the lag increases.

### `Concepts/Exponential Distribution.md` — 1 question(s)

- `cas8-2015-q8` (fact): A mixed Exponential/Pareto distribution can be fit above the truncation point: the light-tailed Exponential reflects losses just above the cutoff and the heavy-tailed Pareto reflects the highest layers.

### `Concepts/Exposure Base.md` — 1 question(s)

- `cas8-2018-q3` (fact): Using earned premium as an exposure base corrects for maldistribution only if high-frequency (high-loss) classes or territories are also high-average-premium ones and the rate differentials are proper; it fails when high-claim-frequency territories are not high-average-premium territories.
- `cas8-2018-q3` (fact): Earned premium as an exposure base also fails to correct for maldistribution when the rate differentials (e.g., territorial) are improper, i.e., loss ratios after applying differentials are not approximately equal across classes.

### `Concepts/Loss Sensitive Rating.md` — 1 question(s)

- `cas8-an-011` (procedure): To check consistency of assumptions in a loss-sensitive pricing model, add the predicted primary, per-occurrence excess and aggregate excess losses across the plans and accounts the plan might write and compare the sum with the predicted total losses; if they do not compare reasonably, investigate …

### `Concepts/On Level Premium.md` — 1 question(s)

- `cas8-2018-q3` (procedure): To put earned premium at a common (base group) rate level, divide each group's earned premium by its current merit rating factor to get premium at base-class (factor 1.00) rates; premium at current rates is not already at base rates.

### `Concepts/Pareto Distribution.md` — 1 question(s)

- `cas8-2019-q15` (fact): A high R² and close visual fit support fitting a linear excess severity line for a Pareto, but the regression slope is sensitive to the few largest claims, so the estimated parameters can change substantially with small changes in large losses.

## Tagging and linking gaps

The vault teaches what these questions need, but on a page the question isn't tagged with and its tagged pages don't link to. Adding the page to the question's `wiki_link` (or linking it from the tagged page) puts it in reach.

| Question | Pages that teach what it needs |
|---|---|
| `cas8-2012-q12` | Coefficient of Variation, Excess Loss Development Factor, Uniform Continuous Distribution |
| `cas8-2012-q15` | Policy Limit |
| `cas8-2012-q18` | Loss Elimination Ratio |
| `cas8-2012-q2` | GLM Loss Reserving |
| `cas8-2013-q15` | Loss Elimination Ratio |
| `cas8-2013-q16` | Mixture Distribution |
| `cas8-2013-q18` | Mean Excess Loss |
| `cas8-2013-q2` | Maximum Likelihood Estimation |
| `cas8-2013-q7` | Excess Loss Development Factor, Uniform Continuous Distribution |
| `cas8-2013-q8` | Claims Made Coverage |
| `cas8-2014-q1` | Residual Sum of Squares |
| `cas8-2014-q13` | Aggregate Excess of Loss |
| `cas8-2014-q14` | Excess Loss Development Factor, Mean Excess Loss |
| `cas8-2014-q16` | Independent Events |
| `cas8-2014-q18` | Mean Excess Loss, Uniform Continuous Distribution |
| `cas8-2014-q19` | Profit and Contingency Provision |
| `cas8-2014-q6` | Uniform Continuous Distribution |
| `cas8-2015-q10` | Credibility Theory |
| `cas8-2015-q13` | Interest Rate Risk, Loss Development, Retrospective Premium Reserve |
| `cas8-2015-q14` | Loss and Loss Adjustment Expense, Uniform Continuous Distribution |
| `cas8-2015-q3` | Linear Regression |
| `cas8-2015-q4` | Chi-Square Goodness-of-Fit Test |
| `cas8-2015-q7` | Policy Limit |
| `cas8-2016-q17` | Excess Loss Development Factor, Tail Weight |
| `cas8-2016-q6` | Response Variable |
| `cas8-2017-q1` | Multicollinearity, Pure Premium Method |
| `cas8-2017-q14` | Mean Excess Loss |
| `cas8-2017-q16` | Aggregate Excess of Loss |
| `cas8-2017-q4` | Model Training and Evaluation |
| `cas8-2017-q6` | Model Training and Evaluation |
| `cas8-2018-q10` | Excess Loss Development Factor, Loss Trend |
| `cas8-2018-q13` | Pareto Distribution |
| `cas8-2018-q2` | Aggregate Excess of Loss, Permissible Loss Ratio |
| `cas8-2018-q5` | Categorical Predictor, Regression Spline |
| `cas8-2018-q6` | Polynomial Regression |
| `cas8-2019-q13` | Frequency Distribution |
| `cas8-2019-q15` | Mean Excess Loss |
| `cas8-2019-q2` | On Level Premium |
| `cas8-2019-q3` | Frequency Distribution |
| `cas8-2019-q5` | Model Training and Evaluation |
| `cas8-2019-q7` | Pareto Distribution, Permissible Loss Ratio |
| `cas8-2019-q8` | Loss and Loss Adjustment Expense, Permissible Loss Ratio |
| `cas8-an-007` | Clash Cover |
| `cas8-an-011` | Pure Premium |

## Taught only in a collapsed section

The passage that teaches these items sits inside a folded callout (a worked example, a table behind a toggle). A reader who skims never opens it.

| Page | Questions | Items |
|---|---|---|
| Loss Sensitive Rating | 6 | Construct an empirical aggregate loss charge by capping each risk's aggregate l…; Direct method: the insurance charge at r is the sum over risks of the amounts b…; From a Lee diagram or risk distribution, compute the Table L charge at each ent… |
| Risk Experience | 4 | The actual experience ratio (AER) equals the sum of actual basic-limit losses a…; Expected unreported (development) losses for each year equal CSLC times EER tim…; Actual experience ratio AER = (limited actual losses and ALAE + expected unrepo… |
| Experience Rating | 3 | An insured with high claim frequency but no large losses has mostly primary los…; A rising experience mod does not by itself indicate a bad risk; it can reflect …; To show a plan change improves the plan, recompute the mod and standard loss ra… |
| Individual Risk Rating | 3 | Experience rating off-balance equals total standard (modified) premium divided …; The off-balance factor of an experience rating plan is the ratio of total stand…; If an experience rating plan gives too little credibility to small risks and to… |
| Expected Loss | 2 | Expected primary and expected excess losses sum to total expected losses (E = E…; Primary, per-occurrence excess and aggregate excess losses are layers of the sa… |
| Increased Limits | 2 | Marginal consistency test: compute the slope (difference in ILF divided by diff…; The marginal rate (premium per unit of limit) for a layer is the change in prem… |
| Rating Plan | 2 | Manual loss ratio is losses divided by manual premium, and standard loss ratio …; The standard loss ratio is the manual loss ratio divided by the experience rati… |
| Uniform Continuous Distribution | 2 | For a uniform distribution on (0, b), the mean is b/2 and the density is 1/b, s…; For losses uniformly distributed on [0, M], the mean is M/2 and the excess rati… |
| Large Deductible Policy | 1 | Compare loss-sensitive plans from the insured's perspective by the expected tot… |
| Layer of Insurance | 1 | Compute the limited expected value at a limit by taking, within each loss range… |
| Link Function | 1 | The relativity between two risks under a log-link GLM is the exponential of the… |
| Mixture Distribution | 1 | Mixing a small number of extremely large claims with ordinary claims produces a… |
| Model Implementation | 1 | A factor that predicts well or is statistically significant on the current book… |
| Rate Class Validity | 1 | Choose the holdout sample so that it is representative of the fitting data, for… |
| Rating Class | 1 | Quintile test: compute credibility-weighted estimates for all classes, sort cla… |
| Statistical Significance | 1 | Compute actual claims per period as exposures times observed frequency, and exp… |

## Every question

<details><summary><code>cas8-2012-q11</code> · answerable</summary>

Tagged pages: Experience Rating, Unfair Discrimination, Principles of Ratemaking, Credibility

| Item | Kind | Status | Where |
|---|---|---|---|
| The fourth ratemaking principle holds that a rate is reasonable, not excessive, inadequate or unfairly discriminatory if it is an actuarial… | fact | tagged | Principles of Ratemaking: “A rate is reasonable and not excessive, inadequate, or unfairly discriminatory if it is an actuaria…” |
| The goal of experience rating is individual risk equity: because each risk has a different loss potential, modifying the rate by the risk's… | fact | syllabus | Individual Risk Rating: “No class is perfectly [[Homogeneity\\|homogeneous]]: experience rating picks up the variance of the …” |
| Experience rating works because a risk's historical losses are predictive of its future loss potential, so the experience modification diff… | fact | syllabus | Individual Risk Rating: “A mod is a prospective estimate of loss potential, not a charge-back for past losses.” |
| Credibility in experience rating should increase with risk size; giving too much credibility to large insureds' experience and too little t… | fact | tagged | Experience Rating: “Credibility rises with size. A small risk's mod stays near $1.0$ however good or bad its recent rec…” |
| In a competitive market, insureds and insurers compete for preferred (lower-cost) business, so risks whose rates exceed their expected cost… | fact | linked | Classification Ratemaking: “In a competitive market an insurer that charges one average rate to a heterogeneous group loses the…” |

</details>

<details><summary><code>cas8-2012-q12</code> · gap</summary>

Tagged pages: Excess and Deductible Rating, Limited Expected Value, Layer of Insurance, Severity Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The excess ratio R(L) is the expected loss above limit L divided by the total expected loss: R(L) = E[(X - L)+]/E[X] = (1/E[X]) * integral … | definition | elsewhere | Excess Loss Development Factor: “Measured on the severity distribution at that maturity, $R^L_t = E[X \wedge L]/E[X]$ is the [[Loss …” |
| For a uniform distribution on (0, b), the mean is b/2 and the density is 1/b, so the excess ratio at L is (b-L)^2/(2b) divided by b/2, i.e.… | formula | elsewhere | Uniform Continuous Distribution (collapsed): “$$E[(X-300)_+] = P(X > 300) \times E[X - 300 \mid X > 300] = 0.7 \times 350 = 245$$” |
| When each loss X is multiplied by a discrete development factor m_i with probability p_i, the developed excess ratio at L is the weighted a… | formula | linked | Inflation: “$$E[(X' - d)_+] = (1+r)\,E\!\left[\left(X - \tfrac{d}{1+r}\right)_+\right]$$” |
| To find the excess ratio of a scaled loss mX, evaluate the undeveloped excess ratio at the divided limit L/m (divide, not multiply, the lim… | procedure | linked | Inflation: “$$E[(X' - d)_+] = (1+r)\,E\!\left[\left(X - \tfrac{d}{1+r}\right)_+\right]$$” |
| The coefficient of variation of a distribution is its standard deviation divided by its mean, a measure of relative dispersion; variance is… | definition | elsewhere | Coefficient of Variation: “The **Coefficient of Variation** $CV$ is the ratio of the standard deviation to the mean, measuring…” |
| For a fixed mean, greater dispersion (higher CV) in the loss multipliers increases the excess ratio at higher limits, so a less dispersed m… | fact | missing |  |
| For a uniform distribution on (a, b), the mean is (a+b)/2 and the second moment is the integral of x^2/(b-a) over (a, b); a discrete two-po… | formula | elsewhere | Uniform Continuous Distribution: “- $E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |

</details>

<details><summary><code>cas8-2012-q13</code> · gap</summary>

Tagged pages: Experience Rating, Credibility, Catastrophe Risk

| Item | Kind | Status | Where |
|---|---|---|---|
| NCCI experience rating splits each loss into a primary portion (up to a split point) and an excess portion, giving primary losses much more… | procedure | tagged | Experience Rating: “Losses are **capped** at a per-claim limit before entering $A$. A single catastrophic claim should …” |
| Primary losses act as a proxy for claim frequency (which the insured can partly control), while excess losses reflect severity and are more… | fact | tagged | Experience Rating: “**A has a frequency problem** — forty claims where the class expects far fewer — which is persisten…” |
| Experience rating limits (caps) the amount of any single loss or accident, with separate limits for single-claimant and multiple-claimant a… | procedure | tagged | Experience Rating: “Losses are **capped** at a per-claim limit before entering $A$.” |
| Credibility given to a risk's actual experience increases with risk size because larger risks have more stable, predictable losses, so expe… | fact | tagged | Experience Rating: “Credibility rises with size. A small risk's mod stays near $1.0$ however good or bad its recent rec…” |
| Experience rating aims at individual risk equity by using past losses to the extent they are predictive of future loss, whereas terrorism r… | fact | tagged | Catastrophe Risk: “Its defining feature is **correlation**: one event strikes many policies together, so pooling does …” |
| A ballast value, maximum/minimum mods and swing limits on annual rate changes are other NCCI-type devices that dampen the impact of an indi… | definition | missing |  |

</details>

<details><summary><code>cas8-2012-q14</code> · gap</summary>

Tagged pages: Experience Rating, Claims Made Coverage, Occurrence Coverage

| Item | Kind | Status | Where |
|---|---|---|---|
| When a risk's first policy is written on a claims-made basis, the experience rating plan uses prior occurrence policies as the experience p… | procedure | missing |  |
| Expected loss cost for each experience year is the basic limit premium times the expected loss ratio, then adjusted by the premium adjustme… | procedure | missing |  |
| PAFs, detrend factors, and loss development factors are chosen from plan tables according to the coverage (products/completed operations vs… | fact | missing |  |
| Expected reported unlimited losses (ARULL) for each year equal the subject loss cost times the expected experience ratio (EER) times the lo… | formula | missing |  |
| The credibility Z, expected experience ratio, and maximum single loss (MSL) are looked up in the plan table using the total subject loss co… | procedure | missing |  |
| Experience rating modification = Z × (AER − EER) / EER, where AER = (actual includable losses + expected unreported losses) / subject loss … | formula | tagged | Experience Rating: “$$M = Z \times \frac{A}{E} + (1 - Z)$$” |
| Each individual loss included in experience rating is capped at the maximum single loss (MSL), so a single large loss contributes at most t… | fact | tagged | Experience Rating: “Losses are **capped** at a per-claim limit before entering $A$.” |

</details>

<details><summary><code>cas8-2012-q15</code> · untagged</summary>

Tagged pages: Inflation, Limited Expected Value, Layer of Insurance, Increased Limits, Severity Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The limited average severity (limited expected value) E[X;k] is the expected loss with each individual loss capped at limit k, i.e. E[min(X… | definition | tagged | Limited Expected Value: “The **Limited Expected Value** (LEV) of a random variable $X$ at limit $u$ is the expected value of…” |
| The expected loss in a layer from attachment a to limit b equals the difference of limited average severities, E[X;b] − E[X;a]. | fact | tagged | Layer of Insurance: “$$E\left[X_{(a,b]}\right] = E[X \wedge b] - E[X \wedge a]$$” |
| Under uniform multiplicative inflation of factor (1+i) on every loss, the limited expected value after inflation at limit k equals (1+i) ti… | fact | elsewhere | Policy Limit: “$$E\big[(1+r)X \wedge u\big] = (1+r)\,E\!\left[X \wedge \tfrac{u}{1+r}\right]$$” |
| The average increase in an excess layer's losses due to inflation is the ratio of the inflated layer expected loss (using deflated limits a… | procedure | tagged | Inflation: “With a positive severity trend, basic limits trend $\le$ total limits trend $\le$ excess losses tre…” |
| A heavier-tailed severity distribution than the lognormal places more loss in the excess layer, which reduces the layer's inflation impact;… | fact | tagged | Severity Distribution: “A layer's cost depends only on $1 - F$ inside the layer, so for excess layers the tail decides the …” |

</details>

<details><summary><code>cas8-2012-q16</code> · answerable</summary>

Tagged pages: Experience Rating, Individual Risk Rating, Credibility

| Item | Kind | Status | Where |
|---|---|---|---|
| Standard premium for a risk equals its manual premium multiplied by its experience modification factor. | formula | tagged | Individual Risk Rating: “$$\text{Standard Premium} = \text{Manual Premium} \times M$$” |
| Experience rating off-balance equals total standard (modified) premium divided by total manual premium; a value other than 1 means the mods… | formula | tagged | Individual Risk Rating (collapsed): “\bar{M} &= \frac{4.0(1.00) + 5.0(0.85) + 1.0(1.15)}{10.0}” |
| Manual loss ratio is losses divided by manual premium, and standard loss ratio is losses divided by standard (mod-adjusted) premium. | definition | linked | Rating Plan (collapsed): “The standard loss ratio is the manual loss ratio divided by the mod:” |
| A debit mod does not by itself make a risk undesirable: it may reflect a poor fit to its classification, and loss experience is largely ran… | fact | tagged | Individual Risk Rating: “A mod is a prospective estimate of loss potential, not a charge-back for past losses.” |
| Premium equity in an experience rating plan means that, after applying mods, standard loss ratios are about equal across risks regardless o… | definition | linked | Rating Plan: “The *standard* (modified) loss ratio should be flat, showing the plan *corrects* for them.” |
| To test premium equity, rank risks by mod and examine the trend of standard loss ratios; a trend that rises with the mod indicates the plan… | procedure | linked | Rating Plan: “Standard loss ratios falling as the mod rises mean too much credibility; rising means too little.” |
| A plan test statistic is the variance of standard loss ratios divided by the variance of manual loss ratios; a low value indicates the plan… | formula | linked | Rating Plan: “The **efficiency test** compares $\mathrm{Var}(\text{standard LR}) / \mathrm{Var}(\text{manual LR})…” |

</details>

<details><summary><code>cas8-2012-q17</code> · gap</summary>

Tagged pages: Excess and Deductible Rating, Workers Compensation Classification, Retrospective Rating, Severity Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| In the hybrid excess ratio method, for limits at or below the cutoff (e.g. $200,000), the excess ratio is taken directly from the observed … | procedure | missing |  |
| For limits above the cutoff, compute the entry ratio as (limit minus cutoff) divided by the average size of loss truncated and shifted at t… | procedure | missing |  |
| The excess ratio at a limit above the cutoff equals the observed excess ratio at the cutoff multiplied by the excess ratio of the truncated… | formula | missing |  |
| Advantages of the hybrid method: it uses actual experience at lower limits where data is credible; it uses a fitted curve at higher limits … | fact | missing |  |
| A single fitted curve can reasonably be used for all hazard groups if the truncated and normalized (shifted, scaled by mean) loss distribut… | fact | missing |  |

</details>

<details><summary><code>cas8-2012-q18</code> · gap</summary>

Tagged pages: Retrospective Rating, Loss Sensitive Rating, Aggregate Loss Model

| Item | Kind | Status | Where |
|---|---|---|---|
| An entry ratio is a loss amount (aggregate limit) divided by the expected (average) loss per risk; the Table L charge at entry ratio r is t… | definition | tagged | Loss Sensitive Rating: “The **Table M charge** $\phi(r) = \mathrm{E}[\max(A/E - r,\,0)]$ is the expected loss above $rE$ pe…” |
| Construct an empirical aggregate loss charge by capping each risk's aggregate losses at r times the average loss, and computing the proport… | procedure | tagged | Loss Sensitive Rating (collapsed): “\phi(0.6) &= \frac{0 + 0.1 + 0.3 + 0.6 + 1.2}{5}” |
| Apply a per-occurrence loss limit by capping each individual accident at the limit before summing to a risk's aggregate loss; losses under … | procedure | tagged | Retrospective Rating: “are the insured's reported losses $L$, limited by any per-accident limit, multiplied by the **loss …” |
| The loss elimination ratio (LER) of a per-occurrence limit equals total losses eliminated by the limit divided by total unlimited losses. | formula | elsewhere | Loss Elimination Ratio: “\text{LER}(d) = \frac{E[X \wedge d]}{E[X]}” |
| When a per-occurrence limit is used with an aggregate limit, the charge relative to total unlimited losses equals the LER plus the share of… | fact | missing |  |
| The adjustment factor (1 − k), where k is the LER, is applied to the aggregate charge only when the charge is expressed as a ratio to expec… | fact | missing |  |

</details>

<details><summary><code>cas8-2012-q19</code> · gap</summary>

Tagged pages: Retrospective Rating, Loss Sensitive Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| Retrospective premium = tax factor × (basic premium + converted losses + excess loss premium + retrospective development premium), then sub… | formula | tagged | Retrospective Rating: “$$R = \left(\text{BP} + L \times \text{LCF}\right) \times \text{TM}$$” |
| Basic premium = expense and profit provision (exclusive of taxes) − (loss conversion factor − 1) × expected loss + insurance charge (net in… | formula | tagged | Loss Sensitive Rating: “$$B = e - (c - 1)E + cI$$” |
| Converted losses = loss conversion factor × actual limited losses (losses capped at the per-occurrence loss limitation). | formula | tagged | Retrospective Rating: “**Converted losses** $(L \times \text{LCF})$ are the insured's reported losses $L$, limited by any …” |
| Excess loss premium = loss conversion factor × standard premium × excess loss factor, which charges for the losses above the loss limitatio… | formula | tagged | Retrospective Rating: “When the plan limits individual losses (a per-accident loss limitation), the insured pays for that …” |
| Retrospective development premium = loss conversion factor × standard premium × retrospective development factor, charged to cover expected… | formula | missing |  |
| After computing the retrospective premium, compare it with the minimum and maximum premiums and cap it at the maximum or floor it at the mi… | procedure | tagged | Retrospective Rating: “$$\text{Retro Premium} = \min\!\left(\max(R,\, R_{\min}),\, R_{\max}\right)$$” |
| Retrospective development factors stabilize premium adjustments: without them early adjustments are usually refunds because losses are stil… | fact | missing |  |

</details>

<details><summary><code>cas8-2012-q2</code> · gap</summary>

Tagged pages: Generalized Linear Model, Link Function, Design Matrix

| Item | Kind | Status | Where |
|---|---|---|---|
| Claim frequency (count) data is modeled in a GLM with a Poisson error distribution. | fact | tagged | Generalized Linear Model: “**Frequency** is modelled Poisson with a log link and exposures as an offset; **severity** is model…” |
| A log link function produces a multiplicative rating structure, so it is the usual choice for frequency models, with inverse link g^-1(x)=e… | fact | tagged | Generalized Linear Model: “The **log link makes the model multiplicative**, so $e^{\beta}$ is a relativity and the fitted coef…” |
| The response vector of a GLM lists the observed values of the target variable (e.g., observed frequencies), one entry per cell/record. | definition | elsewhere | GLM Loss Reserving: “$Y_{kj}$ is the incremental amount of accident period $k$ in development period $j$, with mean $\mu…” |
| Categorical predictors are encoded as 0/1 indicator variables with a base level omitted; the parameter vector contains an intercept plus on… | procedure | tagged | Design Matrix: “A [[Categorical Predictor\\|categorical predictor]] with $k$ levels contributes $k - 1$ indicator co…” |
| Aliasing occurs when there are linear dependencies among the columns of the design matrix (e.g., perfectly correlated predictors or includi… | definition | tagged | Design Matrix: “If one column is a linear combination of others, $\mathbf{X}^\top\mathbf{X}$ is singular and $\hat{…” |
| Aliasing prevents a unique solution for the GLM coefficients, since an arbitrary amount can be added to one parameter and subtracted from a… | fact | tagged | Design Matrix: “If one column is a linear combination of others, $\mathbf{X}^\top\mathbf{X}$ is singular and $\hat{…” |
| Missing data coded as an 'unknown' level can be perfectly correlated across factors (extrinsic aliasing); remedies include removing those r… | procedure | missing |  |

</details>

<details><summary><code>cas8-2012-q20</code> · gap</summary>

Tagged pages: Large Deductible Policy, Loss Sensitive Rating, Deductible Rating, Expected Loss

| Item | Kind | Status | Where |
|---|---|---|---|
| The Excess Loss Pure Premium Factor (ELPPF) for a large deductible policy is the expected share of unlimited loss and ALAE that falls above… | definition | tagged | Large Deductible Policy: “(so $1 - \text{LER}$ is the excess ratio)” |
| Expected limited (net of deductible) loss and ALAE equals expected unlimited loss times (1 minus the ELPPF), and expected excess loss equal… | procedure | tagged | Large Deductible Policy: “$$\text{Excess Losses} = E[X] \times \big(1 - \text{LER}(d)\big)$$” |
| Loss group size used to select the expected loss group is the expected unlimited loss times the hazard group/state differential m, times (1… | formula | missing |  |
| Look up the state and hazard group differential and the ELPPF in the state's published tables, using the most recent effective-dated tables… | procedure | missing |  |
| The aggregate deductible ratio r equals the aggregate deductible divided by expected limited losses (expected unlimited loss × (1 − ELPPF)). | formula | missing |  |
| The insurance charge Φ is the expected proportion of limited losses that exceeds the aggregate deductible, read from the insurance charge t… | definition | tagged | Loss Sensitive Rating: “The **Table M charge** $\phi(r) = \mathrm{E}[\max(A/E - r,\,0)]$ is the expected loss above $rE$ pe…” |
| Total expected loss and ALAE for a large deductible policy with an aggregate equals expected excess losses plus the insurance charge times … | formula | missing |  |

</details>

<details><summary><code>cas8-2012-q21</code> · answerable</summary>

Tagged pages: Retrospective Rating, Loss Sensitive Rating, Layer of Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| The entry ratio r is a loss limit (loss ratio) divided by the expected (average) loss ratio, so the loss ratio corresponding to an entry ra… | definition | tagged | Loss Sensitive Rating: “$A$ is the actual aggregate (ratable) loss, $E = \mathrm{E}[A]$ its expected value, and $r = A/E$ t…” |
| Insurance savings at entry ratio r is the standardized expected amount by which losses fall short of the limit, i.e. the area above the los… | definition | tagged | Loss Sensitive Rating: “the **savings** $\psi(r) = \mathrm{E}[\max(r - A/E,\,0)]$ is the expected shortfall below it.” |
| Insurance charge at entry ratio r is the standardized expected excess of losses over the limit, i.e. the area below the loss curve and abov… | definition | tagged | Loss Sensitive Rating: “The **Table M charge** $\phi(r) = \mathrm{E}[\max(A/E - r,\,0)]$ is the expected loss above $rE$ pe…” |
| To read a Lee diagram, sum rectangular strips of width equal to the share of risks in each loss ratio band times the difference between the… | procedure | tagged | Loss Sensitive Rating: “The **Table M charge** $\phi(r) = \mathrm{E}[\max(A/E - r,\,0)]$ is the expected loss above $rE$ pe…” |
| Insurance savings and insurance charge are related by Ψ(r) = Φ(r) + r − 1. | formula | tagged | Loss Sensitive Rating: “Always $\psi(r) = \phi(r) + r - 1$.” |
| Raising losses of the highest-loss risks increases the average loss ratio and the insurance charge, which raises insurance savings at a fix… | fact | tagged | Loss Sensitive Rating: “Always $\psi(r) = \phi(r) + r - 1$.” |

</details>

<details><summary><code>cas8-2012-q22</code> · answerable</summary>

Tagged pages: Loss Elimination Ratio, Deductible Rating, Inflation

| Item | Kind | Status | Where |
|---|---|---|---|
| The loss elimination ratio (LER) for a deductible is the losses eliminated by the deductible divided by total ground-up losses. | definition | tagged | Loss Elimination Ratio: “**Loss Elimination Ratio** (LER) is the proportion of ground-up losses removed by a deductible — th…” |
| For a straight deductible, the losses eliminated equal the sum of each loss capped at the deductible amount, i.e., losses below the deducti… | procedure | tagged | Loss Elimination Ratio: “Because every loss contributes at most $d$, the LER captures both the small claims eliminated entir…” |
| To apply a ground-up severity trend, multiply every individual loss amount by (1 + trend) while holding the deductible fixed, then recomput… | procedure | tagged | Inflation: “$X' = (1 + r)\,X$” |
| Under a fixed deductible, severity inflation lowers the loss elimination ratio because the deductible is a constant dollar amount while los… | fact | tagged | Loss Elimination Ratio: “The LER **falls as losses inflate**, because a fixed deductible eliminates a shrinking fraction of …” |
| The percentage change in a quantity such as LER is (new value − old value) / old value. | formula | tagged | Inflation: “$$\frac{698.2}{606.5} - 1 = +15.1\%$$” |
| The loss cost of a deductible policy (losses in excess of the deductible) can rise by more than the ground-up severity trend because the de… | fact | tagged | Inflation: “A fixed deductible **leverages** it, raising the insurer's expected payment by more than $r$” |

</details>

<details><summary><code>cas8-2012-q23</code> · answerable</summary>

Tagged pages: Retrospective Rating, Loss Sensitive Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| The basic premium for a retrospective rating plan is b = e − (c − 1)E + c·(insurance charge), where e is the expense and profit provision, … | formula | tagged | Loss Sensitive Rating: “$$B = e - (c - 1)E + cI$$” |
| The net insurance charge equals E·[Φ(r_G) − Ψ(r_H)], i.e. the charge at the maximum entry ratio minus the savings at the minimum entry rati… | formula | tagged | Loss Sensitive Rating: “Here $e$ is total expense before taxes, including LAE and profit, and $I = E[\phi(r_G) - \psi(r_H)]…” |
| The entry ratio is the loss limit (maximum or minimum loss) divided by expected loss, r = L/E, and is used to look up values in Table M. | definition | tagged | Loss Sensitive Rating: “$A$ is the actual aggregate (ratable) loss, $E = \mathrm{E}[A]$ its expected value, and $r = A/E$ t…” |
| The Table M savings at entry ratio r is the charge at r plus r minus 1: Ψ(r) = Φ(r) + r − 1. | formula | tagged | Loss Sensitive Rating: “Always $\psi(r) = \phi(r) + r - 1$.” |
| Table M charge Φ(r) is the expected excess loss above r times expected loss as a fraction of expected loss, and Table M is read as a charge… | definition | tagged | Loss Sensitive Rating: “The **Table M charge** $\phi(r) = \mathrm{E}[\max(A/E - r,\,0)]$ is the expected loss above $rE$ pe…” |

</details>

<details><summary><code>cas8-2012-q3</code> · gap</summary>

Tagged pages: Credibility, Risk Experience, Hypothesis Testing, Statistical Significance

| Item | Kind | Status | Where |
|---|---|---|---|
| The chi-squared test for parameter shift over time uses the statistic sum of w_i*(O_i - E)^2/E, where w_i is the exposures in period i, O_i… | formula | tagged | Statistical Significance: “Pearson's $\chi^2 = \sum (O - E)^2 / E$ compares each class's observed claim count with its expecte…” |
| Under the null hypothesis of a constant Poisson mean, the expected claim count for each period is the hypothesized mean frequency times tha… | fact | tagged | Statistical Significance: “The overall frequency is $500 / 10{,}000 = 0.05$, so the expected counts are $200$, $150$ and $150$:” |
| Compare the chi-squared statistic to the critical value (degrees of freedom equal to the number of periods, or periods minus one if the mea… | procedure | linked | Rating Class: “If the classes really do not differ, $\chi^2$ is approximately chi-square with $m - 1$ degrees of f…” |
| The correlation of years test for parameter shift pairs average frequencies separated by t years, computes the correlation of the pairs for… | procedure | missing |  |

</details>

<details><summary><code>cas8-2012-q4</code> · gap</summary>

Tagged pages: Logistic Regression, Link Function, Rating Variable, Predictive Analytics

| Item | Kind | Status | Where |
|---|---|---|---|
| In a GLM, the expected value of the response equals the inverse link function applied to the linear predictor: E(Y) = g^-1(intercept + sum … | formula | tagged | Link Function: “$$\mu = g^{-1}(\eta)$$” |
| A logistic model for a binary response uses the logit link, log(y/(1-y)) = linear predictor, with a binomial error term. | definition | tagged | Logistic Regression: “the outcome is modelled as binomial and the **logit** [[Link Function]] maps the probability $\pi \…” |
| The inverse of the logit link is g^-1(x) = e^x / (1 + e^x), which converts the linear predictor into a probability. | formula | tagged | Logistic Regression: “$$\pi = \frac{e^{\eta}}{1 + e^{\eta}} = \frac{1}{1 + e^{-\eta}}$$” |
| With categorical predictors in a GLM, the linear predictor sums the intercept and the parameter estimate of the level each variable takes f… | procedure | linked | Rating Factors: “In a log-link [[Generalized Linear Model\\|GLM]] a level's factor is its exponentiated coefficient, …” |
| A desirable rating variable should be hard for insureds to manipulate or misrepresent; a variable the insured can influence (like number of… | fact | tagged | Rating Variable: “It should be objective and hard to manipulate, practical to collect and verify, and legal ([[Risk C…” |
| A rating variable should be constant in relation to the risk (constancy), so a characteristic that changes substantially from year to year … | fact | missing |  |
| A classification variable should be related to expected loss potential, with a demonstrable cause-and-effect (causality) relationship betwe… | fact | tagged | Rating Variable: “It must be statistically related to expected losses; a causal story strengthens the case, but ASOP …” |

</details>

<details><summary><code>cas8-2012-q5</code> · answerable</summary>

Tagged pages: Workers Compensation Classification, Credibility, Holdout Sample, Loss Elimination Ratio, Model Benchmarking, Expected Loss

| Item | Kind | Status | Where |
|---|---|---|---|
| To test whether multi-dimensional credibility relativities improve on the hazard group (mean of 1.0) relativity, compare each one's mean sq… | procedure | tagged | Holdout Sample: “Any loss measure works (squared error for a normal model), but it must be computed on data the fit …” |
| If the predicted (credibility-weighted) relativities do not have a lower MSE/SSE against the holdout than the hazard group relativity, the … | fact | tagged | Model Benchmarking: “The winner has the flatter error line, centred on zero.” |
| Expected loss by injury type equals TT frequency × TT severity × payroll/100 × the sum over injury types of (class relativity) × (frequency… | formula | tagged | Loss Elimination Ratio: “The LER is the bridge from a full-coverage rate to a deductible rate: multiply the full-coverage lo…” |
| The loss elimination ratio at a limit is the portion of losses falling below the limit, so 1 − LER is the share of losses excess of that li… | definition | tagged | Loss Elimination Ratio: “**Loss Elimination Ratio** (LER) is the proportion of ground-up losses removed by a deductible — th…” |
| Injury types whose LER is 100% (e.g., Minor, TT, Med) contribute nothing to the excess layer loss, but they still count in the total loss d… | procedure | linked | Layer of Insurance: “Layer loss cost $= \text{overall loss cost} \times \dfrac{E[X \wedge b] - E[X \wedge a]}{E[X]}$” |

</details>

<details><summary><code>cas8-2012-q6</code> · gap</summary>

Tagged pages: Credibility, Individual Risk Rating, Territory Ratemaking

| Item | Kind | Status | Where |
|---|---|---|---|
| Bailey and Simon use earned premium at present rates as the exposure base in the territory/class analysis (for credibility) to eliminate ma… | fact | missing |  |
| Using earned premium as the exposure base is appropriate only if high-frequency territories are also high-premium territories and the terri… | fact | missing |  |
| To test whether earned premium is a suitable exposure base, compare each territory's relative frequency (claims per car year) with its rela… | procedure | missing |  |
| Territorial relativities are judged correct if the loss ratio (incurred loss divided by earned premium at present rates) is about the same … | procedure | linked | Rating Plan: “A loss ratio chart sorts policies by predicted loss cost divided by current premium; if the current…” |
| Frequency equals number of claims divided by earned car years, and average premium equals earned premium divided by earned car years, compu… | formula | syllabus | Frequency: “$$\text{Frequency} = \frac{\text{Number of Claims}}{\text{Earned Exposures}}$$” |

</details>

<details><summary><code>cas8-2013-q1</code> · gap</summary>

Tagged pages: Classification Ratemaking, Rating Variable, Adverse Selection

| Item | Kind | Status | Where |
|---|---|---|---|
| The three primary purposes of risk classification in the AAA Risk Classification Statement of Principles are to protect the financial sound… | fact | missing |  |
| Protecting financial soundness means classification and rates must be adequate to cover the insurer's costs, including the risk-adjusted co… | definition | linked | Principles of Ratemaking: “**Principle 2 — A rate provides for all costs associated with the transfer of risk.**” |
| Fairness in risk classification means that insureds with different expected costs or risk levels should be charged different premiums, and … | definition | tagged | Classification Ratemaking: “**Classification Ratemaking** is the segmentation of a book into rating classes and the derivation …” |
| Rates should provide for all costs of transferring risk, not only expected losses (pure premium), including catastrophe/concentration risk … | fact | linked | Principles of Ratemaking: “**Principle 2 — A rate provides for all costs associated with the transfer of risk.**” |
| If an insurer cannot charge adequately for a class or territory, it may withdraw from offering coverage there, reducing availability of cov… | fact | linked | Flood Insurance: “**The residual gap.** Roughly the highest-risk properties — those in frequent-flood zones — remain …” |
| Charging a rating factor that is not based on expected cost differences, not controllable by the insured, and not causally related to loss … | fact | tagged | Classification Ratemaking: “**Social** — privacy, causality, controllability and affordability; these are where public and regu…” |
| Overcharging some risks relative to competitors causes adverse selection: good risks leave for lower-priced insurers, leaving a worse-risk … | fact | tagged | Classification Ratemaking: “In a competitive market an insurer that charges one average rate to a heterogeneous group loses the…” |

</details>

<details><summary><code>cas8-2013-q10</code> · answerable</summary>

Tagged pages: Experience Rating, Individual Risk Rating, Credibility

| Item | Kind | Status | Where |
|---|---|---|---|
| The off-balance factor of an experience rating plan is the ratio of total standard (modified) premium to total manual premium, i.e. the pre… | definition | tagged | Individual Risk Rating (collapsed): “\bar{M} &= \frac{4.0(1.00) + 5.0(0.85) + 1.0(1.15)}{10.0}” |
| The off-balance factor is not a measure of experience rating plan performance; an off-balance below 1 does not make a plan better, and it c… | fact | tagged | Individual Risk Rating: “If the mods actually written average below $1.00$, manual rates must be loaded by an off-balance fa…” |
| Evaluate an experience rating plan by two criteria: how well it identifies differences among risk groups (spread and increasing trend of ma… | procedure | linked | Rating Plan: “The *manual* loss ratio should rise with the mod, showing the plan *identifies* differences. The *s…” |
| A downward trend in standard loss ratios as mods increase indicates the plan gives too much credibility to the risk's own experience (overr… | fact | linked | Rating Plan: “Standard loss ratios falling as the mod rises mean too much credibility; rising means too little.” |
| Dorweiler's necessary condition for a sound plan is that standard loss ratios be equal (or similar, with no pattern) across mod groups so i… | fact | linked | Rating Plan: “The *standard* (modified) loss ratio should be flat, showing the plan *corrects* for them.” |

</details>

<details><summary><code>cas8-2013-q11</code> · gap</summary>

Tagged pages: Experience Rating, Individual Risk Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| The experience rating off-balance (statewide off-balance) is the factor that reflects the difference between the standard premium actually … | definition | tagged | Individual Risk Rating: “If the mods actually written average below $1.00$, manual rates must be loaded by an off-balance fa…” |
| Experience rating mods tend to offset rate inadequacy, so the off-balance rises above 1.0 when rates are inadequate; as rate adequacy impro… | fact | missing |  |
| The off-balance masks the true rate need: when adequacy improves, the falling off-balance dampens the indicated rate decrease (the indicate… | fact | missing |  |
| If inadequate rates are approved, the off-balance factor increases and partially (not fully) corrects for the inadequacy, reducing the degr… | fact | missing |  |
| Only larger risks qualify for experience rating, and they receive greater credibility and weight in the off-balance calculation; these larg… | fact | tagged | Experience Rating: “Credibility rises with size. A small risk's mod stays near $1.0$ however good or bad its recent rec…” |

</details>

<details><summary><code>cas8-2013-q12</code> · gap</summary>

Tagged pages: Retrospective Rating, Loss Sensitive Rating, Aggregate Loss Model

| Item | Kind | Status | Where |
|---|---|---|---|
| The entry ratio r is a risk's loss ratio (or loss) divided by the expected loss ratio (or expected loss), i.e., r = L / E. | definition | tagged | Loss Sensitive Rating: “$A$ is the actual aggregate (ratable) loss, $E = \mathrm{E}[A]$ its expected value, and $r = A/E$ t…” |
| The insurance charge φ(r) at entry ratio r is the expected excess loss above r times expected loss, expressed as a fraction of expected los… | definition | tagged | Loss Sensitive Rating: “The **Table M charge** $\phi(r) = \mathrm{E}[\max(A/E - r,\,0)]$ is the expected loss above $rE$ pe…” |
| The insurance charge at entry ratio 0 equals 1.0 because the average entry ratio is 1 when the sample mean equals the expected loss ratio; … | fact | tagged | Loss Sensitive Rating: “Always $\psi(r) = \phi(r) + r - 1$.” |
| Compute the insurance charge recursively: φ(r_i) = φ(r_{i+1}) + (r_{i+1} − r_i) × (proportion of risks with entry ratio above r_i), working… | procedure | missing |  |
| Direct method: the insurance charge at r is the sum over risks of the amounts by which their entry ratios exceed r, divided by the number o… | procedure | tagged | Loss Sensitive Rating (collapsed): “\phi(1.5) &= \frac{0 + 0 + 0 + 0 + 0.3}{5} \\” |

</details>

<details><summary><code>cas8-2013-q13</code> · gap</summary>

Tagged pages: Loss Sensitive Rating, Retrospective Rating, Loss Elimination Ratio

| Item | Kind | Status | Where |
|---|---|---|---|
| The Table L charge (excess ratio/insurance charge) at entry ratio r is the expected excess aggregate loss above r times expected loss, expr… | definition | tagged | Loss Sensitive Rating: “The **Table M charge** $\phi(r) = \mathrm{E}[\max(A/E - r,\,0)]$ is the expected loss above $rE$ pe…” |
| At an entry ratio of zero the Table L charge equals 1 for every premium size, since all expected loss is in excess of zero. | fact | missing |  |
| For a fixed premium size, the Table L charge is a decreasing, convex (concave up) function of entry ratio. | fact | missing |  |
| As the entry ratio goes to infinity, the Table L charge approaches the loss elimination ratio k (the charge never falls below k) when the t… | fact | missing |  |
| For a given entry ratio, the Table L charge is lower for larger-premium policies than for smaller-premium policies, because larger policies… | fact | tagged | Loss Sensitive Rating: “Table M is entered by risk size, because small risks have volatile entry ratios and therefore large…” |

</details>

<details><summary><code>cas8-2013-q14</code> · answerable</summary>

Tagged pages: Retrospective Rating, Loss Sensitive Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| Expected retrospective premium for a retrospective rating plan is E[RP] = T × (b + c × E[L]), where T is the tax multiplier, b the basic pr… | formula | tagged | Retrospective Rating: “$$R = \left(\text{BP} + L \times \text{LCF}\right) \times \text{TM}$$” |
| Basic premium factor b = [e − (c − 1) × E] + c × (insurance charge − insurance savings) × E, i.e., the expense in basic (expense ratio less… | formula | tagged | Loss Sensitive Rating: “$$B = e - (c - 1)E + cI$$” |
| Expected ratable (limited) losses equal the expected loss ratio times (1 − insurance charge at the maximum + insurance savings at the minim… | formula | tagged | Loss Sensitive Rating: “$$\mathrm{E}[L] = E\left(1 - \phi(r_G) + \psi(r_H)\right)$$” |
| Insurance charge and insurance savings from Table M (read at the entry ratios for the maximum and minimum premiums) measure the expected lo… | definition | tagged | Retrospective Rating: “The **net insurance charge** in the basic premium — the insurance charge for the maximum less the i…” |
| In a balanced (equitable) retrospective rating plan, the expected retrospective premium equals the standard premium adjusted for tax: E[RP]… | fact | tagged | Loss Sensitive Rating: “Setting $\mathrm{E}[R]/T = e + E$ gives the basic premium $B$ above.” |

</details>

<details><summary><code>cas8-2013-q15</code> · gap</summary>

Tagged pages: Retrospective Rating, Loss Sensitive Rating, Aggregate Loss Model

| Item | Kind | Status | Where |
|---|---|---|---|
| A Lee diagram plots the aggregate loss distribution in entry-ratio (loss divided by expected loss) space as a unit square, where areas betw… | definition | missing |  |
| The Table M insurance charge at an entry ratio r is the expected portion of unlimited aggregate losses exceeding r times expected losses, a… | definition | tagged | Loss Sensitive Rating: “The **Table M charge** $\phi(r) = \mathrm{E}[\max(A/E - r,\,0)]$ is the expected loss above $rE$ pe…” |
| Table L is the insurance charge and savings table based on losses limited by a per-accident limit, so its charge and savings are measured o… | definition | tagged | Loss Sensitive Rating: “The aggregate charge is then computed on *limited* losses (Table M$_D$), or both are combined in on…” |
| In a retrospective rating plan, the net amount the insured is expected to pay equals expected losses plus the insurance charge minus the sa… | fact | tagged | Loss Sensitive Rating: “$$\mathrm{E}[L] = E\left(1 - \phi(r_G) + \psi(r_H)\right)$$” |
| The loss elimination ratio (LER) of a per-accident limit is the proportion of expected total losses eliminated by the limit, represented in… | definition | elsewhere | Loss Elimination Ratio: “**Loss Elimination Ratio** (LER) is the proportion of ground-up losses removed by a deductible — th…” |
| An increase in the most severe losses raises total losses but barely changes limited losses, since those losses are already capped by the p… | fact | missing |  |
| The aggregate loss distribution in entry-ratio terms has relative variance that decreases as expected claim count rises (law of large numbe… | fact | tagged | Loss Sensitive Rating: “Table M is entered by risk size, because small risks have volatile entry ratios and therefore large…” |

</details>

<details><summary><code>cas8-2013-q16</code> · gap</summary>

Tagged pages: Loss Sensitive Rating, Aggregate Loss Model, Severity Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The insurance charge for an aggregate deductible is the expected amount of aggregate losses in excess of the deductible, expressed as a rat… | definition | tagged | Loss Sensitive Rating: “The **Table M charge** $\phi(r) = \mathrm{E}[\max(A/E - r,\,0)]$ is the expected loss above $rE$ pe…” |
| The entry ratio is the aggregate deductible (or retention) divided by the expected aggregate losses. | definition | tagged | Loss Sensitive Rating: “$A$ is the actual aggregate (ratable) loss, $E = \mathrm{E}[A]$ its expected value, and $r = A/E$ t…” |
| At a fixed entry ratio, the insurance charge increases as the dispersion (variance/CV) of the aggregate loss distribution increases, becaus… | fact | tagged | Loss Sensitive Rating: “Table M is entered by risk size, because small risks have volatile entry ratios and therefore large…” |
| Mixing a small number of extremely large claims with ordinary claims produces a heavier-tailed severity distribution and a more volatile ag… | fact | elsewhere | Mixture Distribution (collapsed): “This Pareto has moments only of order below $3$, so its tail is heavier than any single exponential…” |
| Larger risks with more claims drawn from the same distribution have lower charges at a given entry ratio due to the law of large numbers, b… | fact | tagged | Loss Sensitive Rating: “Table M is entered by risk size, because small risks have volatile entry ratios and therefore large…” |
| A Lee diagram graphs the loss (as a ratio to the mean) against cumulative share of premium/claims, with the insurance charge represented by… | definition | missing |  |
| A per-occurrence loss limit removes the portion of large claims above the limit from the aggregate losses (charged separately as an excess … | fact | tagged | Loss Sensitive Rating: “A loss limit adds an excess-loss charge. The aggregate charge is then computed on *limited* losses …” |
| The aggregate insurance charge (aggregate losses over the deductible) is distinct from the excess charge for losses above a per-occurrence … | fact | tagged | Loss Sensitive Rating: “A loss limit adds an excess-loss charge. The aggregate charge is then computed on *limited* losses …” |

</details>

<details><summary><code>cas8-2013-q18</code> · gap</summary>

Tagged pages: Large Deductible Policy, Excess and Deductible Rating, Severity Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| For an LDD policy, the excess loss ratio above a retention above the empirical cut-off is estimated by blending empirical and fitted data: … | procedure | missing |  |
| The empirical excess ratio at a cut-off R(L) equals 1 minus the sum of limited loss (claims counts weighted, with losses capped at L) divid… | formula | tagged | Large Deductible Policy: “$E[X]$ is expected ground-up loss, $\text{LER}(d)$ the [[Loss Elimination Ratio\\|loss elimination r…” |
| The average truncated and shifted loss at a cut-off is the mean of (loss minus cut-off) over claims exceeding the cut-off, computed as exce… | definition | elsewhere | Mean Excess Loss: “The **Mean Excess Loss** $e_X(d)$ is the expected amount by which a loss exceeds $d$, given that it…” |
| The entry ratio for a fitted truncated and shifted distribution equals the (retention minus cut-off) divided by the average truncated and s… | formula | missing |  |
| When the entry ratio falls between tabulated values, the excess ratio is found by linear interpolation between the adjacent table entries (… | procedure | missing |  |
| LDD premium = [expected losses × (excess loss ratio + loss-based assessment % + ULAE %) + standard premium × (general expense % + credit ri… | formula | tagged | Large Deductible Policy: “$$\text{Premium} = \frac{\text{Excess Losses} + \text{ALAE} + F + \text{CR} + \text{RM}}{1 - V - Q}…” |

</details>

<details><summary><code>cas8-2013-q19</code> · gap</summary>

Tagged pages: Large Deductible Policy, Retrospective Rating, Loss Elimination Ratio, Loss Sensitive Rating, Loss Cost

| Item | Kind | Status | Where |
|---|---|---|---|
| Expected unlimited loss for a policy equals standard premium times the expected ultimate loss ratio. | formula | missing |  |
| The loss elimination ratio for a deductible equals the excess loss factor divided by the expected loss ratio (assuming the excess loss fact… | formula | tagged | Loss Elimination Ratio: “The LER is the bridge from a full-coverage rate to a deductible rate: multiply the full-coverage lo…” |
| The LUGS adjustment factor F = (1 + 0.8·LER)/(1 − LER) is applied to expected unlimited loss, along with the state hazard group relativity,… | formula | missing |  |
| Map the adjusted expected loss to the Table M expected loss group whose range contains it. | procedure | missing |  |
| The entry ratio for an aggregate limit equals the aggregate limit divided by the expected limited loss (the losses subject to the aggregate… | definition | tagged | Loss Sensitive Rating: “$A$ is the actual aggregate (ratable) loss, $E = \mathrm{E}[A]$ its expected value, and $r = A/E$ t…” |
| Under ICRLL, expected loss cost equals the insurance charge times expected limited loss plus expected excess loss; dividing by standard pre… | procedure | missing |  |
| ICRLL gives reasonably accurate insurance charges because the per-loss limit or deductible reduces losses counting toward the aggregate lim… | fact | missing |  |

</details>

<details><summary><code>cas8-2013-q2</code> · untagged</summary>

Tagged pages: Generalized Linear Model, Design Matrix, Link Function, Poisson Regression

| Item | Kind | Status | Where |
|---|---|---|---|
| In a GLM design matrix, each row is an observation (cell) and each column a parameter; categorical predictors are coded with 0/1 indicator … | definition | tagged | Design Matrix: “The **design matrix** $\mathbf{X}$ is the $n \times (p+1)$ matrix that holds a regression's predict…” |
| For a frequency GLM, the response vector Y contains the observed average frequency (claims divided by exposures) for each cell, not the cla… | definition | tagged | Poisson Regression: “The more common practice models **frequency** (claims ÷ exposure) with exposure as the **weight** a…” |
| A GLM with normal error structure and identity link is equivalent to a classical linear model, so its parameters are the least squares esti… | fact | linked | Linear Regression: “**Linear Regression** models a continuous response as a linear function of predictors plus Normal e…” |
| Estimate GLM parameters by maximum likelihood: write the log-likelihood from the error distribution, with mean μ_i = g⁻¹(Σ x_ij β_j), take … | procedure | elsewhere | Maximum Likelihood Estimation: “When the maximum is at an interior point and the log-likelihood is differentiable, the MLE solves t…” |
| A normal error structure allows negative values and assumes constant variance, whereas claim frequency is non-negative and its variance inc… | fact | tagged | Poisson Regression: “The Poisson variance function is $V(\mu) = \mu$ and the [[Dispersion Parameter]] is nominally $\phi…” |
| A log link gives a multiplicative relationship between predictors (rating factors), which better matches how insurance rating relativities … | fact | tagged | Link Function: “The **log link** is standard for insurance severity and frequency models because it guarantees posi…” |

</details>

<details><summary><code>cas8-2013-q3</code> · answerable</summary>

Tagged pages: Workers Compensation Classification, Holdout Sample, Credibility, Rating Class, Model Benchmarking

| Item | Kind | Status | Where |
|---|---|---|---|
| A holdout sample is a portion of the data withheld from model fitting and used afterward to test or validate the model's predictive power o… | definition | tagged | Holdout Sample: “A **Holdout Sample** is data deliberately kept out of model building so the finished model can be t…” |
| Choose the holdout sample so that it is representative of the fitting data, for example by using alternating (even/odd) years rather than a… | procedure | linked | Rate Class Validity (collapsed): “Relativities fitted on the even years, and observed in the odd years (the holdout), are:” |
| The sum of squared prediction errors (SSE) between each method's predictions and the holdout sample's observed values measures predictive a… | formula | linked | Rate Class Validity: “$$\text{SSE}_{\text{hold}} = \sum_{j} w_j \left(\hat{R}_j - R_j^{\text{hold}}\right)^2$$” |
| The prediction method with the lowest holdout SSE is the best predictor; a credibility procedure that beats the hazard group mean and raw d… | fact | linked | Rate Class Validity: “A finer set of classes is only worth having if it predicts the holdout better than a coarser one.” |
| Shifting risk parameters over time reduce the correlation between years' experience as the lag between years increases, so a declining corr… | fact | syllabus | Risk Experience: “Mahler showed that risk parameters shift over time, so older years predict less.” |
| A chi-squared test of whether parameters shift over time computes the sum of (O-E)^2/E, compares it to a critical value, and rejects the nu… | procedure | tagged | Rating Class: “Use a chi-square test on counts; Mahler applied the same test to each risk's results by period to s…” |

</details>

<details><summary><code>cas8-2013-q5</code> · gap</summary>

Tagged pages: Increased Limits, Layer of Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| A two-dimensional (occurrence/aggregate) ILF table is consistent if its factors satisfy the marginal-consistency conditions along both the … | definition | missing |  |
| Holding the aggregate limit fixed, ILFs must increase with the occurrence limit at a decreasing rate: the marginal rate per dollar of addit… | fact | tagged | Increased Limits: “So the *marginal* indemnity cost per dollar of additional limit must not increase as the limit rise…” |
| Holding the occurrence limit fixed, ILFs must increase with the aggregate limit at a decreasing marginal rate per dollar of additional aggr… | fact | tagged | Increased Limits: “So the *marginal* indemnity cost per dollar of additional limit must not increase as the limit rise…” |
| Marginal consistency test: compute the slope (difference in ILF divided by difference in limit) between adjacent limits on each side of the… | procedure | tagged | Increased Limits (collapsed): “\$250\text{K} \to \$500\text{K}: \; \frac{0.15}{250} &= 0.00060” |
| Factor comparison test: the increase in ILF from raising the aggregate (or occurrence) limit must be larger at a lower fixed level of the o… | procedure | missing |  |
| The feasible range for an unknown ILF is the intersection of the bounds from all consistency conditions in both dimensions. | procedure | missing |  |

</details>

<details><summary><code>cas8-2013-q6</code> · answerable</summary>

Tagged pages: Risk Loads, Increased Limits, Limited Expected Value, Variance

| Item | Kind | Status | Where |
|---|---|---|---|
| A risk-loaded increased limit factor (ILF) is the ratio of the risk-loaded premium (expected loss plus risk load) at the policy limit to th… | definition | tagged | Increased Limits: “Palmer's fuller formulation puts it inside the factor: $\text{ILF}(L) = \dfrac{\text{LAS}(L) + \tex…” |
| With a standard-deviation risk load, the premium at a limit is E[X;L] + k·σ(X;L), where k is the selected percentage and σ is the standard … | formula | tagged | Risk Loads: “*standard deviation*: $P = E[X] + k\,\sigma(X)$ — the load scales with share, so a 50% share pays h…” |
| To get the loss distribution at a policy limit, cap each loss at the limit (g(x;L) = min(x, L)) and keep the original probabilities; losses… | procedure | tagged | Limited Expected Value: “Also written $E[\min(X, u)]$; the **limited loss variable** is $Y = \min(X, u)$” |
| The limited expected value is E[min(X,L)] = Σ p_i·min(x_i, L) for a discrete distribution, and the second moment is E[min(X,L)²] = Σ p_i·mi… | formula | linked | Random Variable: “$$E[g(X)] = \sum_i g(x_i)\,P(X = x_i) + \int g(x)\,f(x)\,dx$$” |
| Standard deviation = sqrt(E[Y²] − (E[Y])²), computed separately for the loss capped at each limit so the risk load varies by limit. | formula | tagged | Variance: “Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$” |

</details>

<details><summary><code>cas8-2013-q7</code> · gap</summary>

Tagged pages: Excess and Deductible Rating, Loss Elimination Ratio, Loss Development, Severity Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The excess ratio R(L) at limit L is the expected losses above L divided by total expected losses, i.e. E[(X−L)+]/E[X]. | definition | elsewhere | Excess Loss Development Factor: “Measured on the severity distribution at that maturity, $R^L_t = E[X \wedge L]/E[X]$ is the [[Loss …” |
| For losses uniformly distributed on [0, M], the mean is M/2 and the excess ratio at L is ((M−L)/M)^2. | formula | elsewhere | Uniform Continuous Distribution (collapsed): “Since losses are uniform, those above 300 are distributed $\text{Unif}(300, 1000)$. The probability…” |
| With simple dispersion (loss multiplied by factors m_i with equal probability), the dispersed excess ratio at L is the probability-weighted… | formula | missing |  |
| To apply the dispersion formula, divide the limit by each multiplier to get the undispersed loss level, look up or compute R at that level,… | procedure | missing |  |
| Dispersion increases excess losses without changing total expected losses, raising excess ratios at higher limits while altering (possibly … | fact | missing |  |
| Greater variability (CV) of the dispersion produces higher excess ratios; simple dispersion has less impact than gamma dispersion and more … | fact | missing |  |

</details>

<details><summary><code>cas8-2013-q8</code> · gap</summary>

Tagged pages: Experience Rating, Individual Risk Rating, Credibility

| Item | Kind | Status | Where |
|---|---|---|---|
| The experience modification is Mod = Z × (AER − EER) / EER, where AER is the actual experience ratio, EER the expected experience ratio, an… | formula | tagged | Experience Rating: “$$M = Z \times \frac{A}{E} + (1 - Z)$$” |
| Actual experience ratio AER = (includable limited losses + additional reported unreported loss liability (ARULL)) / company subject loss co… | formula | tagged | Experience Rating: “$A$ is the insured's actual losses over the experience period and $E$ the losses expected for a ris…” |
| Additional unreported loss layer (ARULL) for each policy year and coverage = company subject loss cost × expected experience ratio × loss d… | formula | tagged | Credibility: “In reserving, credibility appears explicitly in the [[Bornhuetter-Ferguson Method\\|BF method]], whe…” |
| Determine credibility, expected experience ratio, and maximum single loss by finding the bracket of the table containing the total company … | procedure | missing |  |
| For a claims-made policy, the first-year (latest) claims-made policy period has an LDF of zero (no development applied) because claims-made… | fact | elsewhere | Claims Made Coverage: “Because the trigger is the report date, a claims-made policy has **no pure IBNR** — only IBNER on c…” |
| Includable losses in the experience period are limited to the maximum single loss (MSL), and the experience period consists of the prior po… | fact | tagged | Experience Rating: “Experience rating is **prospective**: it uses a completed experience period (typically three years,…” |

</details>

<details><summary><code>cas8-2013-q9</code> · gap</summary>

Tagged pages: Experience Rating, Credibility, Individual Risk Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| In an experience rating plan with credibility Z, the experience modification is M = Z*(A − E)/E + 1, equivalently M = (A + K)/(E + K) when … | formula | tagged | Experience Rating: “$$M = Z \times \frac{A}{E} + (1 - Z)$$” |
| Standard premium is the manual premium multiplied by the experience mod, and the standard loss ratio is losses divided by standard premium. | definition | tagged | Experience Rating: “Order of application: schedule and experience modifications apply to the manual premium to give **s…” |
| To test an experience rating plan, group risks by size of mod (e.g., low, middle, high or credit vs debit), and for each group compute the … | procedure | linked | Rating Plan: “Rank risks by mod and form five groups.” |
| An effective plan yields roughly equal standard loss ratios across mod groups; standard loss ratios that rise with the mod indicate the pla… | fact | linked | Rating Plan: “Standard loss ratios falling as the mod rises mean too much credibility; rising means too little.” |
| Manual loss ratios that rise with the mod show that the plan successfully identifies differences in risk quality. | fact | linked | Rating Plan: “The *manual* loss ratio should rise with the mod, showing the plan *identifies* differences.” |
| Grouping risks is needed because a single risk's one-period experience is volatile; the efficiency test is used to compare competing plans … | fact | linked | Rating Plan: “The **efficiency test** compares $\mathrm{Var}(\text{standard LR}) / \mathrm{Var}(\text{manual LR})…” |
| Workers compensation losses are highly skewed, so a linear credibility estimate differs from the optimal estimate; splitting losses into pr… | fact | missing |  |
| A constant K implies loss ratio variance falls with risk size, which is not necessarily true; letting K increase with risk size keeps credi… | fact | missing |  |

</details>

<details><summary><code>cas8-2014-q1</code> · gap</summary>

Tagged pages: Credibility, Holdout Sample, Model Benchmarking

| Item | Kind | Status | Where |
|---|---|---|---|
| A quintile (or decile) test sorts data into groups by predicted relativity and compares each group's predicted values with the actual holdo… | definition | tagged | Holdout Sample: “A **Holdout Sample** is data deliberately kept out of model building so the finished model can be t…” |
| To judge whether credibility is overstated or understated, compute the ratio of predicted to actual (holdout) relativity by quintile and lo… | procedure | tagged | Model Benchmarking: “$$\text{Error}_q = \frac{\text{Predicted}_q}{\text{Actual}_q} - 1$$” |
| If the predicted-to-actual ratio decreases across quintiles (predictions too high for low-risk groups and too low for high-risk groups), th… | fact | missing |  |
| Overstated credibility makes predictions too extreme (like the raw data), while understated credibility makes predictions stay too close to… | fact | missing |  |
| The sum of squared errors (SSE) in a quintile test is the sum over quintiles of the squared difference between predicted and holdout relati… | definition | elsewhere | Residual Sum of Squares: “The **Residual Sum of Squares (RSS)** (also called the **Sum of Squared Errors, SSE**) measures the…” |
| A credibility procedure is validated by having lower SSE than the alternatives (such as the complement/countrywide average and the raw data… | fact | linked | Cross-Validation: “Cross-validation is what turns the [[Bias-Variance Tradeoff]] into a decision: training error falls…” |

</details>

<details><summary><code>cas8-2014-q10</code> · gap</summary>

Tagged pages: Experience Rating, Individual Risk Rating, Predictive Accuracy

| Item | Kind | Status | Where |
|---|---|---|---|
| The goals of an experience rating plan include safety incentive (the plan should reward insureds for controlling losses and so encourage lo… | definition | tagged | Experience Rating: “It creates a real incentive for loss control, and an equally real incentive for **claim suppression…” |
| Giving more weight to small losses such as medical-only claims in the mod encourages insureds to avoid reporting them, which weakens the ca… | fact | tagged | Experience Rating: “It creates a real incentive for loss control, and an equally real incentive for **claim suppression…” |
| Medical-only losses are a small share of total losses and mostly small claims, so increasing their weight has little effect on predictive a… | fact | missing |  |
| In the NCCI experience rating plan, each loss is split at a split point into a primary layer (losses below the split point, which mainly re… | definition | tagged | Experience Rating: “the split between primary (capped) and excess losses is the mechanism the NCCI workers compensation…” |
| Giving zero credibility to excess losses removes the severity information from the mod, which lowers predictive accuracy, and removes the i… | fact | tagged | Experience Rating: “the split between primary (capped) and excess losses is the mechanism the NCCI workers compensation…” |
| If the split point is not indexed, inflation pushes more of each loss into the primary layer cap and more claims above the split point, so … | fact | syllabus | Excess and Deductible Rating: “A fixed retention **leverages [[Inflation\\|inflation]]** into the excess layer.” |
| An insured with high claim frequency but no large losses has mostly primary losses, so putting more weight on primary or small losses, or n… | fact | tagged | Experience Rating (collapsed): “**A has a frequency problem** — forty claims where the class expects far fewer — which is persisten…” |

</details>

<details><summary><code>cas8-2014-q11</code> · gap</summary>

Tagged pages: Experience Rating, Credibility, Individual Risk Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| The NCCI experience rating modification is M = (Ap + W·Ae + (1−W)·Ee + B)/(E + B), where Ap is actual primary losses, Ae actual excess loss… | formula | missing |  |
| Constant B and K rest on the law of large numbers: the variance of a risk's loss ratio falls in inverse proportion to risk size, so large r… | fact | tagged | Experience Rating: “- Credibility rises with size. A small risk's mod stays near $1.0$ however good or bad its recent r…” |
| Empirical NCCI studies show that loss ratio variance does not decline as fast with risk size as the law of large numbers predicts, because … | fact | missing |  |
| The quintile test compares experience rating plans by sorting risks (within size groups) by mod into five groups, computing standard (modif… | procedure | linked | Rating Plan: “Rank risks by mod and form five groups. The *manual* loss ratio should rise with the mod, showing t…” |
| The efficiency test compares plans without grouping by mod, using the ratio of variance of modified (standard premium) loss ratios to varia… | procedure | linked | Rating Plan: “The **efficiency test** compares $\mathrm{Var}(\text{standard LR}) / \mathrm{Var}(\text{manual LR})…” |
| If an experience rating plan gives too little credibility to small risks and too much to large risks, then small risks with credit mods and… | fact | tagged | Individual Risk Rating (collapsed): “Mods can average below $1.00$ when debit-mod risks leave for competitors or the residual market, or…” |

</details>

<details><summary><code>cas8-2014-q12</code> · gap</summary>

Tagged pages: Retrospective Rating, Loss Elimination Ratio, Loss Sensitive Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| The entry ratio r is a loss amount expressed as a ratio to expected loss (r = loss / expected loss), so an entry ratio times expected loss … | definition | tagged | Loss Sensitive Rating: “$A$ is the actual aggregate (ratable) loss, $E = \mathrm{E}[A]$ its expected value, and $r = A/E$ t…” |
| The Table L charge (insurance charge) at entry ratio r is the expected proportion of expected losses that exceeds r times expected losses, … | definition | tagged | Loss Sensitive Rating: “The **Table M charge** $\phi(r) = \mathrm{E}[\max(A/E - r,\,0)]$ is the expected loss above $rE$ pe…” |
| Table L savings at entry ratio r is the expected amount by which the aggregate limit (r times expected loss) exceeds actual losses, i.e. th… | definition | tagged | Loss Sensitive Rating: “The **Table M charge** $\phi(r) = \mathrm{E}[\max(A/E - r,\,0)]$ is the expected loss above $rE$ pe…” |
| Loss elimination ratio (LER) from the per-accident limit equals 1 − (expected limited losses / expected unlimited losses), and the expected… | formula | missing |  |
| For limited losses, the entry ratio is the limited loss ratio divided by the unlimited expected loss ratio, and the charge at that ratio is… | formula | missing |  |
| From a Lee diagram or risk distribution, compute the Table L charge at each entry ratio by starting at the charge of 1 at r=0 and subtracti… | procedure | tagged | Loss Sensitive Rating (collapsed): “\phi(1.5) &= \frac{0 + 0 + 0 + 0 + 0.3}{5} \\” |
| The Table L charge at zero entry ratio equals 1, and the charge at the highest entry ratio of the limited data equals the LER (k), since li… | fact | missing |  |

</details>

<details><summary><code>cas8-2014-q13</code> · gap</summary>

Tagged pages: Retrospective Rating, Aggregate Loss Model, Loss Ratio

| Item | Kind | Status | Where |
|---|---|---|---|
| A Table M (Mahler) charge at entry ratio r is the expected excess loss above r times the average risk's loss, expressed as a fraction of ex… | definition | elsewhere | Aggregate Excess of Loss: “$\phi(A)$ is Clark's **excess charge factor**, the share of expected aggregate loss above $A$.” |
| The entry ratio is a risk's aggregate loss ratio divided by the average loss ratio of all risks in the table, so entry ratio r corresponds … | definition | missing |  |
| For an empirical table of n equal-sized risks, the charge at entry ratio r equals the sum over risks with loss ratio above r times the mean… | formula | elsewhere | Aggregate Excess of Loss: “$$\phi(A) = \frac{E\left[(S - A)_+\right]}{E[S]}$$” |
| Alternatively, compute the charge by horizontal slicing: cumulate, over entry ratio intervals, the interval width times the fraction of ris… | procedure | missing |  |
| When an unknown value affects the mean, bound the unknown to find the range of the mean and cutoff loss ratio, to determine which risks lie… | procedure | missing |  |

</details>

<details><summary><code>cas8-2014-q14</code> · gap</summary>

Tagged pages: Excess Insurance, Severity Distribution, Unallocated Loss Adjustment Expenses ULAE

| Item | Kind | Status | Where |
|---|---|---|---|
| The excess ratio R(x) is the expected loss excess of limit x divided by the total expected loss, E[(L - x)+] / E[L]. | definition | elsewhere | Excess Loss Development Factor: “Measured on the severity distribution at that maturity, $R^L_t = E[X \wedge L]/E[X]$ is the [[Loss …” |
| For a layer attached above the empirical truncation point t, the excess ratio is the product of the empirical excess ratio at t and the fit… | formula | missing |  |
| Normalize the truncated and shifted losses to unity mean by dividing by their mean, computed as expected loss excess of t divided by the pr… | procedure | elsewhere | Mean Excess Loss: “$$e_X(d) = \frac{\int_d^{\infty} S_X(x)\,dx}{S_X(d)}$$” |
| The excess ratio of a mixed Exponential-Pareto distribution fitted to mean residual lives is the weighted average of the component excess r… | formula | linked | Exponential Distribution: “compute a probability within each component and weight by the mixing probabilities, never from one …” |
| Excess policy premium = [expected unlimited loss * excess ratio * (1 + ULAE ratio) + standard premium * general expense ratio] / [1 - acqui… | formula | tagged | Unallocated Loss Adjustment Expenses ULAE: “In **ratemaking**, ULAE may be handled as a load on losses or as a [[Fixed Expenses\\|fixed expense]…” |

</details>

<details><summary><code>cas8-2014-q15</code> · gap</summary>

Tagged pages: Retrospective Rating, Inflation, Loss Sensitive Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| Expected retrospective premium is E(R) = [basic premium + loss conversion factor × expected limited (retro-rated) loss] × tax multiplier. | formula | tagged | Retrospective Rating: “$$R = \left(\text{BP} + L \times \text{LCF}\right) \times \text{TM}$$” |
| Expected loss in the retro plan is E(L) = E(A) − I, where E(A) is the expected actual (unlimited) loss and I is the insurance charge net of… | formula | tagged | Loss Sensitive Rating: “$$\mathrm{E}[L] = E\left(1 - \phi(r_G) + \psi(r_H)\right)$$” |
| Determine the Aggregate Expected Loss as standard premium × expected loss ratio × state/hazard group differential. | procedure | missing |  |
| Assign the risk to an Expected Loss Group (ELG) by finding the expected loss size range in the Retrospective Rating Manual table containing… | procedure | missing |  |
| When expected loss size ranges are inflated, a risk's expected loss may fall in a different (higher-numbered) ELG, which changes the insura… | fact | missing |  |
| Measure the effect of using outdated ranges as the difference between the premium under the correct (updated) ELG and under the outdated EL… | procedure | missing |  |

</details>

<details><summary><code>cas8-2014-q16</code> · gap</summary>

Tagged pages: Large Deductible Policy, Retrospective Rating, Aggregate Loss Model

| Item | Kind | Status | Where |
|---|---|---|---|
| A large dollar deductible (LDD) policy has the insured reimburse the insurer for losses within the deductible, subject to a per-occurrence … | definition | tagged | Large Deductible Policy: “Many programs also cap the insured's total reimbursements with an **aggregate limit**” |
| Expected reimbursable loss under an LDD plan is found by listing the possible annual outcomes with their probabilities, applying the per-oc… | procedure | linked | Loss Sensitive Rating: “The aggregate charge is then computed on *limited* losses (Table M$_D$)” |
| With independent loss events, the probability of each combination of events is the product of the individual probabilities of occurrence an… | fact | elsewhere | Independent Events: “For a collection of events $A_1, \ldots, A_n$ to be **mutually independent**, the product rule must…” |
| A Lee diagram plots loss size (as a ratio to expected loss) against the cumulative percentage of claims or probability, so that the area re… | definition | missing |  |
| The Table M charge is the expected excess of aggregate losses above a given entry ratio (maximum entry ratio) as a proportion of expected l… | definition | linked | Loss Sensitive Rating: “The **Table M charge** $\phi(r) = \mathrm{E}[\max(A/E - r,\,0)]$ is the expected loss above $rE$ pe…” |
| A less volatile (thinner-tailed) aggregate loss distribution gives a lower insurance charge at a given entry ratio, so reducing the size of… | fact | linked | Loss Sensitive Rating: “Table M is entered by risk size, because small risks have volatile entry ratios and therefore large…” |
| A per-occurrence limit makes the aggregate loss distribution less volatile, so a plan with an occurrence limit (such as an LDD) has a charg… | fact | linked | Experience Rating: “Losses are **capped** at a per-claim limit before entering $A$. A single catastrophic claim should …” |

</details>

<details><summary><code>cas8-2014-q17</code> · gap</summary>

Tagged pages: Retrospective Rating, Loss Sensitive Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| Guaranteed cost premium equals (expense ratio plus expected loss ratio) times the tax multiplier times standard premium. | formula | tagged | Loss Sensitive Rating: “Setting $\mathrm{E}[R]/T = e + E$ gives the basic premium $B$ above.” |
| The premium tax multiplier is T = 1/(1 - premium tax rate), not 1 plus the tax rate. | formula | tagged | Loss Sensitive Rating: “with loss conversion factor $c$ (loads LAE) and tax multiplier $T = 1/(1 - \text{tax rate})$.” |
| With a per-occurrence limit, the adjusted expected loss used to select the expected loss group is E times (1 + 0.8·LER)/(1 - LER), where LE… | formula | missing |  |
| Balance equations with a per-occurrence limit: compute the difference between max and min entry ratios as (G - H)/(c·Ê·T) and the differenc… | procedure | missing |  |
| Savings at the minimum entry ratio is S = X̂_H - 1 + r_H, using the Table M value at that entry ratio. | formula | tagged | Loss Sensitive Rating: “Always $\psi(r) = \phi(r) + r - 1$.” |
| Basic premium factor b = e - (c - 1)E + c·(insurance charge - insurance savings), with the net insurance charge (X̂_G - Ŝ_H) multiplied by … | formula | tagged | Retrospective Rating: “**Basic premium (BP)** covers the insurer's non-LAE expenses, profit, and the **net insurance charg…” |
| In a balanced (equitable) retrospective plan, expected retrospective premium equals the guaranteed cost premium regardless of plan paramete… | fact | tagged | Loss Sensitive Rating (collapsed): “Their average is $\$875{,}500 = (250{,}000 + 600{,}000) \times 1.03$ — exactly the guaranteed-cost …” |
| Raising the per-occurrence limit lowers the excess loss factor (and the basic premium charge) but raises the limited expected losses includ… | fact | missing |  |

</details>

<details><summary><code>cas8-2014-q18</code> · gap</summary>

Tagged pages: Retrospective Rating, Aggregate Loss Model

| Item | Kind | Status | Where |
|---|---|---|---|
| A retrospectively rated plan is balanced (expected retrospective premium equals the guaranteed cost premium, or expected premium equals exp… | fact | syllabus | Loss Sensitive Rating: “Setting $\mathrm{E}[R]/T = e + E$ gives the basic premium $B$ above.” |
| The difference between the entropy-type loss ratios at the maximum and minimum premium points is r_G - r_H = (G - H)/(c E), where G is maxi… | formula | missing |  |
| The second balance equation is phi(r_H) - phi(r_G) = (e + E - H)/(c E), where phi(r) = E[(1 - r/E-scaled) excess] is the expected proportio… | formula | syllabus | Loss Sensitive Rating: “The **Table M charge** $\phi(r) = \mathrm{E}[\max(A/E - r,\,0)]$ is the expected loss above $rE$ pe…” |
| The loss at minimum premium L_H = r_H E and the loss at maximum premium L_G = r_G E are the aggregate loss amounts at which the retrospecti… | definition | syllabus | Loss Sensitive Rating: “$r_G$ and $r_H$ are the entry ratios at the maximum and minimum.” |
| For a uniform distribution on [0, B], the expected excess loss above a limit L is (B - L)^2 / (2B), i.e. the area of a triangle in the Lee … | procedure | elsewhere | Mean Excess Loss: “a uniform loss on $(0, \omega)$ has $e_X(d) = (\omega - d)/2$” |
| The expected value of a uniform distribution on [a, b] is (a + b)/2. | formula | elsewhere | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |

</details>

<details><summary><code>cas8-2014-q19</code> · gap</summary>

Tagged pages: Large Deductible Policy, Excess Insurance, Retrospective Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| The LDD premium equals expected loss and ALAE below the deductible (ELPPF-based loss elimination portion plus the aggregate-limit insurance… | formula | tagged | Large Deductible Policy: “\text{Premium} = \frac{\text{Excess Losses} + \text{ALAE} + F + \text{CR} + \text{RM}}{1 - V - Q}” |
| The Excess Loss Premium Percentage Factor (ELPPF) at a given limit is the proportion of expected loss and ALAE that falls in the layer abov… | definition | tagged | Large Deductible Policy: “(so $1 - \text{LER}$ is the excess ratio)” |
| To find the aggregate-limit insurance charge, compute the entry ratio as the aggregate limit divided by expected losses (limited by the per… | procedure | tagged | Retrospective Rating: “the charge and savings come from a table of values, expressed as a percentage of expected unlimited…” |
| For an excess WC policy, the premium covers only losses above the deductible (ELPPF plus insurance charge) with ULAE applied to the whole e… | fact | missing |  |
| Net-premium percentages such as profit and contingency enter the premium denominator as one minus the sum of the loads, so a negative profi… | fact | elsewhere | Profit and Contingency Provision: “\text{Rate} = \frac{\text{Pure Premium} + F}{1 - V - Q_T}” |
| Reasons an employer chooses an LDD plan include: a medium-sized employer can buy it without qualifying for self-insurance, the insurer cont… | fact | tagged | Large Deductible Policy: “the insured keeps the cash for its retained losses until they are paid” |
| LDD policies have higher profit assumptions than excess WC policies because LDD competes on service as well as price (and excess has longer… | fact | elsewhere | Profit and Contingency Provision: “[[Long Tail Lines\\|Long-tail lines]] hold reserves for years and earn substantial investment income…” |

</details>

<details><summary><code>cas8-2014-q3</code> · gap</summary>

Tagged pages: Generalized Linear Model, Exponential Family, Dispersion Parameter

| Item | Kind | Status | Where |
|---|---|---|---|
| In the exponential family variance formula Var(Y_i) = φV(μ_i)/ω_i, φ is the scale (dispersion) parameter, a constant that scales the varian… | definition | tagged | Dispersion Parameter: “The **Dispersion Parameter** $\phi$ is the scale factor in an [[Exponential Family]] variance: $\te…” |
| In the exponential family variance formula, ω_i is the prior weight of observation i, which gives more weight (lower variance) to observati… | definition | tagged | Dispersion Parameter: “Prior weights $w_i$ (e.g. exposure or claim count) divide the variance: a group average built from …” |
| Severity data is modeled with a gamma error distribution because it is positive-valued, right-skewed with a long tail, its variance is prop… | fact | tagged | Exponential Family: “\\| Gamma \\| $\mu^2$ \\| $-1/\mu$ (log in practice) \\| Claim severity \\|” |
| Binary yes/no outcomes such as policy renewal (retention) are modeled with a binomial error distribution, which fits 0/1 outcomes and proba… | fact | tagged | Generalized Linear Model: “\\| Binary \\| Binomial \\| Logit: $g(\mu) = \ln\!\frac{\mu}{1-\mu}$ \\|” |
| For a severity GLM with gamma errors, the prior weight ω_i is set to the number of claims underlying each observation (e.g., 1 for individu… | procedure | tagged | Generalized Linear Model: “**severity** is modelled Gamma with a log link, weighted by claim counts.” |
| For a retention GLM with binomial errors, the prior weight ω_i is set to the number of trials, such as the number of policies up for renewa… | procedure | missing |  |

</details>

<details><summary><code>cas8-2014-q4</code> · answerable</summary>

Tagged pages: Workers Compensation Classification, Homogeneity, Credibility, Predictive Accuracy

| Item | Kind | Status | Where |
|---|---|---|---|
| Homogeneity, as a statistical consideration in the AAA Risk Classification Statement of Principles, means that risks within a class or grou… | definition | tagged | Homogeneity: “**Homogeneity** is the property of a group of risks whose expected loss costs are similar enough th…” |
| Credibility, as a statistical consideration in risk classification, means that a class or group must be large enough to allow credible stat… | definition | tagged | Credibility: “- Credibility governs the **homogeneity trade-off**: splitting a book finer improves [[Homogeneity\…” |
| Predictive stability, as a statistical consideration in risk classification, means that class cost estimates should be responsive to real c… | definition | tagged | Credibility: “**Limited fluctuation (classical) credibility** asks how much data is needed for the observation to…” |
| Workers compensation hazard groups are collections of classes with similar excess loss characteristics, so estimating excess ratios by indi… | fact | tagged | Workers Compensation Classification: “Classes in a hazard group share the same excess loss factors, which NCCI uses in class ratemaking a…” |
| The multi-dimensional credibility technique estimates class excess ratios by weighting class-level injury type loss data with the hazard gr… | procedure | tagged | Workers Compensation Classification: “Use *multi-dimensional credibility* across injury types, estimating a class's rare serious-injury f…” |

</details>

<details><summary><code>cas8-2014-q5</code> · gap</summary>

Tagged pages: Credibility, Experience Rating, Bonus-Malus System, Exposure Base

| Item | Kind | Status | Where |
|---|---|---|---|
| Merit rating plans that use earned premium as the exposure base implicitly assume that high-frequency territories are also high-premium ter… | fact | missing |  |
| Using earned premium as the exposure base in a merit rating plan assumes that territorial differentials are proper/adequate, so premium at … | fact | missing |  |
| Claim frequency for a merit rating class group is incurred claims divided by the exposure base (earned premium, not car years), cumulated o… | procedure | missing |  |
| The merit rating modification factor for a group equals the group's claim frequency divided by the overall (total) claim frequency. | formula | missing |  |
| The credibility (premium credit) of a merit rating group equals 1 minus its modification factor. | formula | missing |  |
| The premium for an exposure in a merit rating class group equals the base rate multiplied by that group's modification factor. | formula | tagged | Experience Rating: “$$\text{Modified Premium} = \text{Manual Premium} \times M$$” |

</details>

<details><summary><code>cas8-2014-q6</code> · untagged</summary>

Tagged pages: Inflation, Layer of Insurance, Loss Trend

| Item | Kind | Status | Where |
|---|---|---|---|
| A uniform trend multiplies every loss by (1 + trend), so each cumulative probability stays the same while the corresponding loss amount is … | fact | tagged | Inflation: “**Inflation** in an insurance context is growth in the underlying loss random variable over time, $…” |
| When losses are uniformly distributed within a range, the CDF is linear between the range endpoints and the average loss within that range … | fact | elsewhere | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| The implied trend in a layer is the ratio of the expected trended loss in the layer to the expected untrended loss in the layer, minus 1; i… | definition | tagged | Inflation: “With a positive severity trend, basic limits trend $\le$ total limits trend $\le$ excess losses tre…” |
| The expected loss in a layer a xs a (limit L attachment a) equals the limited expected value at a+L minus the limited expected value at a, … | formula | tagged | Layer of Insurance: “Equivalently, $E[X_{(a,b]}] = \int_a^b S(x)\,dx$ with $S = 1 - F$” |
| Compute the limited expected value at a limit by taking, within each loss range, the probability times the average of the capped loss value… | procedure | tagged | Layer of Insurance (collapsed): “Cap each claim at $750$ and at $250$, then difference the totals:” |

</details>

<details><summary><code>cas8-2014-q7</code> · answerable</summary>

Tagged pages: Increased Limits, Risk Loads, Adverse Selection

| Item | Kind | Status | Where |
|---|---|---|---|
| An increased limits factor (ILF) is the ratio of the premium at a given policy limit to the premium at the basic limit. | definition | tagged | Increased Limits: “**Increased Limits Factors** (ILFs) are the multiplicative factors that convert a basic-limits loss…” |
| The marginal rate (premium per unit of limit) for a layer is the change in premium (or ILF) divided by the change in limit between consecut… | definition | tagged | Increased Limits (collapsed): “\$100\text{K} \to \$250\text{K}: \; \frac{0.30}{150} &= 0.00200” |
| Actuarially sound ILFs must have marginal rates that decrease monotonically as the limit increases (the consistency test), because losses m… | fact | tagged | Increased Limits: “Since $\text{LAS}(k) = \int_0^k S(x)\,dx$ (Palmer), each additional dollar of limit at $x$ adds $S(…” |
| Adverse selection can justify higher-than-expected premiums at higher limits: insureds with greater loss potential choose higher limits, an… | fact | tagged | Adverse Selection: “**Adverse Selection** is the tendency for those who know they are worse-than-average risks to buy m…” |
| Favorable selection can occur when less risky insureds buy higher limits to protect assets, which would argue against charging a higher mar… | fact | tagged | Increased Limits: “The last fails for some lines — personal auto insureds who choose very high limits tend to have low…” |
| A risk load for the greater volatility of high-severity, low-frequency losses at high limits can justify a premium that departs from the pu… | fact | tagged | Increased Limits: “Actuaries may vary the profit provision by limit for the volatility of high limits — a departure We…” |

</details>

<details><summary><code>cas8-2014-q8</code> · gap</summary>

Tagged pages: Experience Rating, Individual Risk Rating, Allocated Loss Adjustment Expense

| Item | Kind | Status | Where |
|---|---|---|---|
| In the ISO GL experience rating plan, the experience modification equals Z × (AER − EER) / EER, where AER is actual experience ratio, EER i… | formula | tagged | Experience Rating: “$$M = Z \times \frac{A}{E} + (1 - Z)$$” |
| The actual experience ratio (AER) equals the sum of actual basic-limit losses and ALAE limited by the maximum single loss (MSL) plus the ac… | formula | linked | Risk Experience (collapsed): “Put both at the same maturity, or complete the actual losses with the expected unreported:” |
| Determine the experience period as the most recent complete policy years that are sufficiently mature at the evaluation date (e.g., excludi… | procedure | tagged | Experience Rating: “Experience rating is **prospective**: it uses a completed experience period (typically three years,…” |
| Look up the credibility Z, the expected experience ratio (EER), and the maximum single loss (MSL) in the ISO manual tables using the compan… | procedure | missing |  |
| Include ALAE with each loss and cap each occurrence's loss plus ALAE at the maximum single loss (MSL) (after basic limits adjustment) befor… | procedure | tagged | Experience Rating: “Losses are **capped** at a per-claim limit before entering $A$.” |
| Company subject loss costs are already detrended, so no further trend or detrend factors are applied to them in the experience rating calcu… | fact | missing |  |

</details>

<details><summary><code>cas8-2014-q9</code> · gap</summary>

Tagged pages: Experience Rating, Individual Risk Rating, Credibility

| Item | Kind | Status | Where |
|---|---|---|---|
| In a single-split experience rating plan, the experience modification is M = [Zp*Ap + Ze*Ae + (1-Zp)*Ep + (1-Ze)*Ee] / E, where Ap, Ae are … | formula | missing |  |
| Split each claim at the split point: the primary portion is the lesser of the claim and the split point, and the excess portion is the amou… | procedure | linked | Large Loss: “**cap** each claim at a threshold $M$ for the experience analysis” |
| The loss-free modification is the experience mod when the account has no actual losses, equal to [(1-Zp)Ep + (1-Ze)Ee]/E, i.e., the mod wit… | definition | missing |  |
| Expected primary and expected excess losses sum to total expected losses (E = Ep + Ee), so Ep and Ee can be backed out of the loss-free mod… | fact | syllabus | Expected Loss (collapsed): “The total is $\$1{,}200{,}000 = 12 \times E[X]$.” |

</details>

<details><summary><code>cas8-2015-q1</code> · gap</summary>

Tagged pages: Credibility, Exposure Base, Poisson Distribution, Territorial Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| Using car-years as the exposure base in a merit rating plan can create maldistribution, because risks in different classes or territories h… | fact | missing |  |
| Earned premium as an exposure base corrects for maldistribution only if the rate differentials embedded in premium (e.g., territorial) are … | fact | missing |  |
| In a merit rating plan, the modification (relativity) for a group equals Z × R + (1 − Z), where R is the ratio of the credibility-weighted … | formula | syllabus | Experience Rating: “$$M = Z \times \frac{A}{E} + (1 - Z)$$” |
| Group classes by accident-free years, compute claim frequency (claims / earned car years) for each group and overall, and set the group's m… | procedure | missing |  |
| For a driver with claim-free experience, the observed experience ratio R is 0, so the mod equals 1 − Z and Z = 1 − mod. | fact | syllabus | Experience Rating: “$$M = Z \times \frac{A}{E} + (1 - Z)$$” |
| If annual claims are Poisson with mean λ, the expected relative claim experience for drivers with at least one claim (i.e., non-zero claims… | formula | tagged | Poisson Distribution: “Because $P(X = 0) = e^{-\lambda}$, a given probability of no events (or of at least one event, $1 -…” |

</details>

<details><summary><code>cas8-2015-q10</code> · gap</summary>

Tagged pages: Experience Rating, Credibility, Individual Risk Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| In a single-split experience rating plan, the experience mod equals unity (the manual premium/class-plan starting point) plus a primary cre… | definition | missing |  |
| Primary losses are the first layer of each claim's loss (up to the split point) and excess losses are the portion above the split point; pr… | definition | missing |  |
| In a split experience rating plan the primary credibility Z_p is typically larger than the excess credibility Z_e, because primary losses a… | fact | tagged | Experience Rating: “the split between primary (capped) and excess losses is the mechanism the NCCI workers compensation…” |
| A credibility function should be bounded between 0 and 100% (credibility cannot exceed 100% or be negative). | fact | elsewhere | Credibility Theory: “$Z \in [0, 1]$ is the **credibility factor**” |
| A credibility function should be non-decreasing in expected loss (credibility should not decrease as the risk's size/expected loss increase… | fact | tagged | Individual Risk Rating: “$Z$ lies between 0 and 1 and never falls as $E$ grows, while $Z/E$ falls” |
| A credibility function should have the ratio of credibility to expected loss, Z/E, decreasing as expected loss increases, i.e., credibility… | fact | tagged | Individual Risk Rating: “$Z$ lies between 0 and 1 and never falls as $E$ grows, while $Z/E$ falls” |

</details>

<details><summary><code>cas8-2015-q11</code> · answerable</summary>

Tagged pages: Experience Rating, Individual Risk Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| The experience rating modification factor equals modified premium divided by manual premium (mod = modified premium / manual premium). | formula | tagged | Experience Rating: “$$\text{Modified Premium} = \text{Manual Premium} \times M$$” |
| Manual loss ratio is actual losses divided by manual premium, and modified (standard) loss ratio is actual losses divided by modified premi… | formula | linked | Rating Plan: “The standard loss ratio is the manual loss ratio divided by the mod:” |
| To assess an experience rating plan, rank risks by mod and compare loss ratios across the ranked risks: manual loss ratios should vary with… | procedure | linked | Rating Plan: “Rank risks by mod and form five groups. The *manual* loss ratio should rise with the mod, showing t…” |
| An effective experience rating plan has manual loss ratios that increase with the mod (good dispersion) and modified loss ratios that are r… | fact | linked | Rating Plan: “Standard loss ratios falling as the mod rises mean too much credibility; rising means too little.” |
| A high mod can be driven by one or a few random large losses that are not predictive of future losses, so reviewing the risk's loss history… | fact | tagged | Experience Rating: “A single catastrophic claim should not dominate a mod” |
| Risk characteristics, class fit, or recent operational changes (e.g., safety or return-to-work programs) can make past experience unreprese… | fact | linked | Schedule Rating: “Where [[Experience Rating\\|experience rating]] looks at what happened, schedule rating looks at cha…” |

</details>

<details><summary><code>cas8-2015-q12</code> · answerable</summary>

Tagged pages: Experience Rating, Credibility, Individual Risk Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| The necessary condition for credibility in an experience rating plan is that risks receiving credit mods and risks receiving debit mods sho… | fact | tagged | Experience Rating: “A small risk's mod stays near $1.0$ however good or bad its recent record, because a few claims say…” |
| To test the necessary condition, compare the standard loss ratios of credit-mod risks and debit-mod risks within each risk size group (not … | procedure | linked | Rating Plan: “The *standard* (modified) loss ratio should be flat, showing the plan *corrects* for them. Standard…” |
| The efficiency test statistic compares the variance of modified (standard) loss ratios to the variance of unmodified (manual) loss ratios, … | definition | linked | Rating Plan: “The **efficiency test** compares $\mathrm{Var}(\text{standard LR}) / \mathrm{Var}(\text{manual LR})…” |
| A lower ratio of modified to unmodified loss ratio variance (a larger variance reduction) indicates a more accurate, more effective experie… | fact | linked | Rating Plan: “The **efficiency test** compares $\mathrm{Var}(\text{standard LR}) / \mathrm{Var}(\text{manual LR})…” |
| Experience rating is intended to adjust for individual risk differences in expected cost, not to correct overall premium inadequacy; overal… | fact | linked | Schedule Rating: “Because credits are judgmental, they are also a source of **rate level leakage**: the filed manual …” |
| Correcting overall inadequacy through the experience rating plan is less effective because it can increase off-balance and mask the needed … | fact | tagged | Individual Risk Rating: “**Plan balance.** If the mods actually written average below $1.00$, manual rates must be loaded by…” |

</details>

<details><summary><code>cas8-2015-q13</code> · untagged</summary>

Tagged pages: Loss Sensitive Rating, Large Deductible Policy, Retrospective Rating, Self-Insured Retention

| Item | Kind | Status | Where |
|---|---|---|---|
| Under a large deductible plan, the insurer pays claims and the insured reimburses the insurer for the paid losses below the deductible; the… | procedure | tagged | Loss Sensitive Rating: “*Large deductible:* the insurer pays every claim and bills the deductible back.” |
| Estimate losses paid (or incurred) to date at a given age by dividing the expected ultimate loss by the paid (or incurred) age-to-ultimate … | procedure | elsewhere | Loss Development: “$$\text{Ultimate Losses} = \text{Losses at age } n \times \text{CDF}_{n \to \text{ult}}$$” |
| The retrospective premium is R = (b + c·L + c·F)·T, where b is basic premium, c the loss conversion factor, L the limited incurred losses, … | formula | tagged | Loss Sensitive Rating: “**Retro premium** is $R = (B + cL)\,T$, with loss conversion factor $c$ (loads LAE) and tax multipl…” |
| The expected excess loss premium (loss above the per-occurrence limit) equals expected unlimited loss minus expected limited loss. | fact | tagged | Large Deductible Policy: “$$\text{Excess Losses} = E[X] \times \big(1 - \text{LER}(d)\big)$$” |
| The retro development premium covers future development of limited losses beyond the adjustment valuation, equal to limited ultimate loss t… | procedure | elsewhere | Loss Development: “the [[Bornhuetter-Ferguson Method]] uses the *complement* $(1 - 1/\text{CDF})$ to weight an a prior…” |
| The net retro cash flow at an adjustment is the computed retro premium minus the deposit premium already paid; a negative difference is a r… | procedure | elsewhere | Retrospective Premium Reserve: “$$\text{Premium asset} = \text{Expected ultimate premium} - \text{Premium booked}$$” |
| Large deductible plans carry the most credit risk because the insurer pays claims first and must collect reimbursement from the insured, wh… | fact | tagged | Large Deductible Policy: “*Deductible processing* — where the insurer pays the whole claim and bills the insured back, the pr…” |
| Interest rate risk is greatest for the plan with the longest payout period, such as an excess policy with a self-insured retention where th… | fact | elsewhere | Interest Rate Risk: “$$\Delta S \approx -\left(A\,D_A - L\,D_L\right)\Delta y$$” |

</details>

<details><summary><code>cas8-2015-q14</code> · gap</summary>

Tagged pages: Large Deductible Policy, Aggregate Loss Model, Loss Sensitive Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| The LDD (large dollar deductible) premium equals (expected limited-to-deductible-excess loss and ALAE loss cost plus insurance charge plus … | formula | tagged | Large Deductible Policy: “$$\text{Premium} = \frac{\text{Excess Losses} + \text{ALAE} + F + \text{CR} + \text{RM}}{1 - V - Q}…” |
| The expected loss cost for the insurer under an LDD policy is the expected excess loss (unlimited minus limited-to-deductible expected loss… | fact | tagged | Large Deductible Policy: “Many programs also cap the insured's total reimbursements with an **aggregate limit**; the insurer'…” |
| ULAE and loss-based assessments are percentages applied to expected unlimited (total) loss and ALAE, not to limited or excess losses, while… | fact | elsewhere | Loss and Loss Adjustment Expense: “It cannot be traced to a claim, so it is estimated in aggregate — classically as the ratio of calen…” |
| The insurance charge is the expected amount by which the insured's losses limited to the deductible exceed the aggregate loss limit (the in… | definition | tagged | Large Deductible Policy: “Many programs also cap the insured's total reimbursements with an **aggregate limit**; the insurer'…” |
| Construct a Lee diagram (loss size on the vertical axis, cumulative probability on the horizontal axis) and read expected values as areas: … | procedure | missing |  |
| If the limited loss distribution changes but the unlimited distribution does not, any increase in the insurance charge area is offset by an… | fact | missing |  |
| The expected value of a uniform distribution is the midpoint of its interval, and for a piecewise uniform distribution the expected value i… | fact | elsewhere | Uniform Continuous Distribution: “- $E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |

</details>

<details><summary><code>cas8-2015-q15</code> · answerable</summary>

Tagged pages: Retrospective Rating, Aggregate Loss Model, Loss Sensitive Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| The retrospective rating basic premium equals the expense ratio (as a premium amount) minus (loss conversion factor − 1) times expected los… | formula | tagged | Loss Sensitive Rating: “$$B = e - (c - 1)E + cI$$” |
| The net insurance charge is the insurance charge at the maximum entry ratio minus the insurance savings at the minimum entry ratio, express… | definition | tagged | Retrospective Rating: “The **net insurance charge** in the basic premium — the insurance charge for the maximum less the i…” |
| Insurance charge at entry ratio r is the expected portion of loss ratio above r (E[(X−r)+]/E[X]); insurance savings at r is the expected sh… | formula | tagged | Loss Sensitive Rating: “The **Table M charge** $\phi(r) = \mathrm{E}[\max(A/E - r,\,0)]$ is the expected loss above $rE$ pe…” |
| Build an empirical table M from observed loss ratios by sorting them, computing the entry ratio as loss ratio divided by the mean loss rati… | procedure | tagged | Loss Sensitive Rating: “The **Table M charge** $\phi(r) = \mathrm{E}[\max(A/E - r,\,0)]$ is the expected loss above $rE$ pe…” |
| Insurance charges expressed as a percent of expected losses and as a percent of standard premium differ and must be put on the same basis (… | fact | tagged | Retrospective Rating: “the charge and savings come from a table of values, expressed as a percentage of expected unlimited…” |
| Insurance charges from other risks' loss data may not be appropriate for pricing a given policy because differences in business mix, operat… | fact | tagged | Loss Sensitive Rating: “Table M is entered by risk size, because small risks have volatile entry ratios and therefore large…” |

</details>

<details><summary><code>cas8-2015-q16</code> · gap</summary>

Tagged pages: Retrospective Rating, Aggregate Loss Model, Loss Sensitive Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| Under the Gillam–Snader retrospective rating framework, the maximum premium equals G = (b + c·L_G)·T, where L_G = E·r_G is the loss at maxi… | formula | tagged | Retrospective Rating: “$$R = \left(\text{BP} + L \times \text{LCF}\right) \times \text{TM}$$” |
| The basic premium equals b = e − (c−1)E + cE(φ(r_G) − ψ(r_H)), where e is the expense provision excluding taxes, E is expected loss, φ is t… | formula | tagged | Loss Sensitive Rating: “$$B = e - (c - 1)E + cI$$” |
| With no specified minimum premium, the minimum premium is H = bT (the basic premium times the tax multiplier), so ψ(r_H) = 0, not H = 0. | fact | missing |  |
| When there is no specified minimum premium, the balance equation reduces to ψ(r_G) = (G/T − (E + e)) / (cE). | formula | missing |  |
| The savings and charge satisfy ψ(r) = φ(r) + r − 1, so φ(r_G) + r_G = 1 + ψ(r_G). | fact | tagged | Loss Sensitive Rating: “Always $\psi(r) = \phi(r) + r - 1$.” |
| Find the expected loss group (ELG) from the expected loss adjusted by the state/hazard group differential (adjusted E = E × differential), … | procedure | missing |  |

</details>

<details><summary><code>cas8-2015-q17</code> · gap</summary>

Tagged pages: Retrospective Rating, Aggregate Loss Model, Loss Sensitive Rating, Expenses

| Item | Kind | Status | Where |
|---|---|---|---|
| Premium discount is the reduction in expenses as a percentage of premium that results from fixed expenses being spread over larger premium;… | definition | tagged | Expenses: “Much of the cost of servicing an account doesn't grow with its size, so the expense *ratio* falls a…” |
| In a balanced retrospective rating plan, expected premium equals the standard premium net of premium discount: E[R] = (1 - D)·SP, which equ… | fact | tagged | Loss Sensitive Rating: “Setting $\mathrm{E}[R]/T = e + E$ gives the basic premium $B$ above.” |
| The retrospective premium is R = b + c·L between the minimum and maximum premiums, so expected premium is b + c·E[L] where E[L] is expected… | formula | tagged | Retrospective Rating: “$$\text{Retro Premium} = \min\!\left(\max(R,\, R_{\min}),\, R_{\max}\right)$$” |
| Insurance charge φ(r) is the expected losses in excess of the entry ratio r (as a fraction of expected losses E), and insurance savings ψ(r… | formula | tagged | Loss Sensitive Rating: “The **Table M charge** $\phi(r) = \mathrm{E}[\max(A/E - r,\,0)]$ is the expected loss above $rE$ pe…” |
| Expected limited losses equal E·(1 − φ(r_G) + ψ(r_H)), where r_G is the entry ratio at maximum loss and r_H the entry ratio at minimum loss… | formula | tagged | Loss Sensitive Rating: “$$\mathrm{E}[L] = E\left(1 - \phi(r_G) + \psi(r_H)\right)$$” |
| Basic premium is b = e − (c − 1)E + c·E·(φ(r_G) − ψ(r_H)), i.e. expenses less loss conversion margin on expected losses plus the loss-conve… | formula | tagged | Expenses: “$\text{BP} = e - (\text{LCF} - 1)\,E + \text{LCF} \times I$. Here $e$ is the expense provision excl…” |
| In a retrospectively rated policy the premium discount is implicit, reflected as a reduction of expenses within the basic premium, whereas … | fact | missing |  |

</details>

<details><summary><code>cas8-2015-q18</code> · answerable</summary>

Tagged pages: Large Deductible Policy, Aggregate Loss Model, Loss Sensitive Rating, Loss Cost

| Item | Kind | Status | Where |
|---|---|---|---|
| To apply a per-occurrence deductible, limit each individual claim to the deductible amount; the sum of the limited claims is the deductible… | procedure | linked | Self-Insured Retention: “$$\text{Retained Loss} = \sum_i \min(X_i, R)$$” |
| To apply an annual aggregate deductible, cap the sum of per-occurrence-limited losses at the aggregate amount; the excess of the limited lo… | procedure | linked | Aggregate Excess of Loss: “The reinsurer pays the aggregate in excess of an aggregate retention $A$, up to an aggregate limit …” |
| The insurer's expected loss cost under a deductible equals the expected total ground-up loss minus the expected loss retained by the insure… | fact | tagged | Large Deductible Policy: “$$\text{Excess Losses} = E[X] \times \big(1 - \text{LER}(d)\big)$$” |
| With aggregate limits, the expected loss cost = expected total loss − expected primary (per-occurrence limited) loss + expected primary los… | formula | tagged | Loss Sensitive Rating: “The **Table M charge** $\phi(r) = \mathrm{E}[\max(A/E - r,\,0)]$ is the expected loss above $rE$ pe…” |
| Build the Table M entry by computing each risk's ratio r of limited loss to expected limited loss, finding the percent of risks with r abov… | procedure | linked | Aggregate Excess of Loss: “$$\phi(A) = \frac{E\left[(S - A)_+\right]}{E[S]}$$” |

</details>

<details><summary><code>cas8-2015-q19</code> · gap</summary>

Tagged pages: Large Deductible Policy, Loss Sensitive Rating, Excess Insurance, Expenses

| Item | Kind | Status | Where |
|---|---|---|---|
| Large dollar deductible premium = [expected ground-up loss and ALAE × (excess ratio + ULAE load) + standard premium × (general expenses + c… | formula | tagged | Large Deductible Policy: “$$\text{Premium} = \frac{\text{Excess Losses} + \text{ALAE} + F + \text{CR} + \text{RM}}{1 - V - Q}…” |
| In a large dollar deductible policy, the insurer's expected cost includes only the loss and ALAE the insurer pays net of the deductible (th… | fact | tagged | Large Deductible Policy: “where the insurer pays the whole claim and bills the insured back, the premium carries the cost of …” |
| Credit risk load is a charge, expressed as a percentage of standard premium, for the risk that the insured fails to reimburse the insurer f… | definition | tagged | Large Deductible Policy: “where the insurer pays the whole claim and bills the insured back, the premium carries the cost of …” |
| Large dollar deductible insurers service claims from the ground up and so compete on both price and claim service quality, whereas excess i… | fact | missing |  |
| Large dollar deductible policies have a shorter average payout period because they pay from the first dollar, whereas excess policies pay o… | fact | missing |  |

</details>

<details><summary><code>cas8-2015-q2</code> · gap</summary>

Tagged pages: Generalized Linear Model, Multicollinearity, Rating Variable

| Item | Kind | Status | Where |
|---|---|---|---|
| Intrinsic aliasing is perfect linear dependence among covariates that arises from the definition of the variables themselves, e.g. includin… | definition | tagged | Multicollinearity: “**Perfect** collinearity (the dummy-variable trap: including every level of a [[Categorical Predict…” |
| Extrinsic aliasing is perfect dependence between covariates that comes from the nature of the data rather than the variable definitions, e.… | definition | missing |  |
| Near aliasing is strong but not perfect correlation between covariates, usually caused by a few observations that break an otherwise perfec… | definition | tagged | Multicollinearity: “**Multicollinearity** is strong linear association among the *predictors* of a regression.” |
| Aliasing makes the model parameters not uniquely defined, leading to convergence problems, unstable parameter estimates or confusing result… | fact | tagged | Multicollinearity: “individual coefficients become unstable: the data cannot say which of two nearly interchangeable va…” |
| To remove intrinsic aliasing, drop one level of each categorical factor as the base level (or drop one parameter per factor, using an inter… | procedure | tagged | Multicollinearity: “**Perfect** collinearity (the dummy-variable trap: including every level of a [[Categorical Predict…” |
| To remove extrinsic aliasing, keep only one of the two perfectly aliased parameters (e.g. drop one level of one factor that coincides exact… | procedure | tagged | Multicollinearity: “drop one of the pair, combine them into a single variable” |
| To remove near aliasing, remove or reclassify the few offending observations that cause the near-perfect correlation; this can then turn th… | procedure | missing |  |

</details>

<details><summary><code>cas8-2015-q3</code> · untagged</summary>

Tagged pages: Generalized Linear Model, Maximum Likelihood Estimation, Link Function, Poisson Regression

| Item | Kind | Status | Where |
|---|---|---|---|
| A GLM relates the expected response to a linear predictor of covariates through a link function g, so that mu = g^{-1}(X beta), with the de… | definition | tagged | Generalized Linear Model: “3. **Link function**: $g(\mu_i) = \eta_i$ connects the mean to the linear predictor” |
| With a log link, the inverse link is the exponential function, so the expected value of each observation is mu_i = exp(sum of the applicabl… | fact | tagged | Link Function: “\\| Log \\| $\ln\mu$ \\| $e^\eta$ \\| Poisson (counts), Gamma (severity) \\|” |
| GLM parameters are estimated by maximum likelihood: write the loglikelihood of the assumed error distribution with mu expressed through the… | procedure | tagged | Maximum Likelihood Estimation: “When the maximum is at an interior point and the log-likelihood is differentiable, the MLE solves t…” |
| Minimizing the sum of squared errors gives the same estimates as maximum likelihood only for a classical linear model (normal errors, ident… | fact | elsewhere | Linear Regression: “OLS is the [[Maximum Likelihood Estimation\\|MLE]] under Normal errors” |
| In a categorical GLM with indicator covariates, each observation's linear predictor includes only the betas for the levels that apply to it… | fact | tagged | Poisson Regression: “$$\ln\hat\mu = \ln(0.5) - 2.30 + 0.26 + 0.41 = -0.693 - 1.63 = -2.323$$” |

</details>

<details><summary><code>cas8-2015-q4</code> · gap</summary>

Tagged pages: Credibility, Correlation, Poisson Distribution, Statistical Significance

| Item | Kind | Status | Where |
|---|---|---|---|
| The Chi-squared statistic for testing whether a parameter is shifting is X^2 = sum of (Actual - Expected)^2 / Expected over the periods, eq… | formula | tagged | Statistical Significance: “Pearson's $\chi^2 = \sum (O - E)^2 / E$ compares each class's observed claim count with its expecte…” |
| Compute actual claims per period as exposures times observed frequency, and expected claims as exposures times the assumed (constant) Poiss… | procedure | tagged | Statistical Significance (collapsed): “The overall frequency is $500 / 10{,}000 = 0.05$, so the expected counts are $200$, $150$ and $150$:” |
| State the null hypothesis that the parameter (claim frequency) is not shifting over time, and reject it if the test statistic exceeds the c… | procedure | elsewhere | Chi-Square Goodness-of-Fit Test: “Reject $H_0$ at level $\alpha$ when $Q$ exceeds the upper-$\alpha$ [[Critical Value\\|critical value…” |
| A test statistic exceeding the chi-squared critical value (degrees of freedom equal to the number of periods, here 5 giving 9.49 at 5%) ind… | fact | linked | Rating Class: “If the classes really do not differ, $\chi^2$ is approximately chi-square with $m - 1$ degrees of f…” |
| The correlation test for shifting parameters: compute the correlation between frequencies for all pairs of years separated by the same lag,… | procedure | missing |  |

</details>

<details><summary><code>cas8-2015-q5</code> · gap</summary>

Tagged pages: Workers Compensation Classification, Credibility, Holdout Sample, High Dimensional Variables, Model Benchmarking

| Item | Kind | Status | Where |
|---|---|---|---|
| In multi-dimensional credibility for workers compensation injury-type ratios, the estimate for a class's ratio of one injury type to anothe… | formula | missing |  |
| Compute each injury-type ratio (e.g. permanent total claims per temporary total claim) for a class and for the hazard group by pooling clai… | procedure | missing |  |
| Quintile test: compute credibility-weighted estimates for all classes, sort classes by the estimate, and group them into five quintiles wit… | procedure | syllabus | Rating Class (collapsed): “Classes in one hazard group are ranked by estimated relativity from the even years and grouped into…” |
| For each quintile, compute the relativity to the hazard group using three methods (credibility estimate, raw class data, hazard group avera… | procedure | syllabus | Rate Class Validity: “A finer set of classes is only worth having if it predicts the holdout better than a coarser one.” |
| An individual class SSE test is noisy because individual classes are small and volatile relative to the hazard group; grouping classes into… | fact | missing |  |

</details>

<details><summary><code>cas8-2015-q7</code> · untagged</summary>

Tagged pages: Increased Limits, Limited Expected Value, Layer of Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| In a Lee diagram (x-axis is cumulative probability F(x), y-axis is loss size), the expected loss in a layer from a to b equals the integral… | fact | tagged | Layer of Insurance: “Equivalently, $E[X_{(a,b]}] = \int_a^b S(x)\,dx$ with $S = 1 - F$ — the horizontal strip of a Lee d…” |
| The size method computes the limited expected value at limit L as the integral from 0 to L of x f(x) dx plus L times (1 - F(L)), i.e. losse… | formula | elsewhere | Policy Limit: “The variable $X \wedge u$ has a point mass of $S(u)$ at $u$, and a claim recorded at the limit says…” |
| The increased limits factor for limit S with basic limit R is the ratio of the limited expected loss at S to the limited expected loss at R… | definition | tagged | Increased Limits: “**Increased Limits Factors** (ILFs) are the multiplicative factors that convert a basic-limits loss…” |
| Because the survival function decreases with size, the marginal cost of successive equal-width layers of coverage falls, so ILFs must incre… | fact | tagged | Increased Limits: “each additional dollar of limit at $x$ adds $S(x)$ — the probability a loss exceeds $x$ — which can…” |
| To check the ILF consistency test graphically, plot the ILF against the policy limit and verify that the curve is increasing and concave, s… | procedure | tagged | Increased Limits: “So the *marginal* indemnity cost per dollar of additional limit must not increase as the limit rise…” |

</details>

<details><summary><code>cas8-2015-q8</code> · gap</summary>

Tagged pages: Increased Limits, Severity Distribution, Limited Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| Empirical ILFs at high limits are volatile because few large losses exist, and fitting a smooth curve reduces this random fluctuation. | fact | tagged | Increased Limits: “Data at high limits is sparse and volatile, which is why ILFs are calculated from a broader body of…” |
| Empirical loss data may not reach the maximum policy limit (thin or gappy data at large sizes, clustering at round numbers), so no ILF can … | fact | tagged | Increased Limits: “Data at high limits is sparse and volatile, which is why ILFs are calculated from a broader body of…” |
| Reported losses may not be fully developed, and a fitted distribution can incorporate loss development, including the dispersion of develop… | fact | missing |  |
| Fitting a single curve to the whole loss distribution can overstate losses in some intervals and understate them in others, because one par… | fact | missing |  |
| Pick a truncation (cutoff) point: use the empirical distribution directly below it, where data is plentiful and credible, and fit a curve t… | procedure | missing |  |
| The truncation point should be a round number chosen to maximize reliance on actual data while leaving enough data above it to fit a distri… | fact | missing |  |
| A mixed Exponential/Pareto distribution can be fit above the truncation point: the light-tailed Exponential reflects losses just above the … | fact | missing |  |
| The fitted curve above the truncation point should be joined smoothly to the empirical distribution below it, yielding a consistent set of … | fact | missing |  |

</details>

<details><summary><code>cas8-2015-q9</code> · gap</summary>

Tagged pages: Experience Rating, Individual Risk Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| Basic limits expected loss (and ALAE) for each policy year equals annual basic limits premium times the expected loss and ALAE ratio. | formula | missing |  |
| Company subject loss cost (CSLC) for each year is the basic limits expected loss multiplied by the present-adjustment factors (PAF, e.g. ex… | procedure | missing |  |
| The experience period consists of the most recent complete policy years ending at least six months before the evaluation date, so the polic… | fact | tagged | Experience Rating: “it uses a completed experience period (typically three years, excluding the most recent, incomplete…” |
| The total CSLC is used to look up in the plan tables the credibility Z, the expected experience ratio (EER), and the maximum single loss (M… | fact | missing |  |
| Expected unreported (development) losses for each year equal CSLC times EER times the loss development factor (percent unreported) for that… | procedure | linked | Risk Experience (collapsed): “\frac{A + E_{\text{unrep}}}{E} &= \frac{120{,}000 + 0.45 \times 200{,}000}{200{,}000}” |
| Included actual losses are limited: each occurrence's loss is capped at the basic limit, and loss plus ALAE is capped at the MSL, so the gr… | procedure | tagged | Experience Rating: “Losses are **capped** at a per-claim limit before entering $A$.” |
| Actual experience ratio AER = (limited actual losses and ALAE + expected unreported losses) / CSLC. | formula | linked | Risk Experience (collapsed): “\frac{A + E_{\text{unrep}}}{E} &= \frac{120{,}000 + 0.45 \times 200{,}000}{200{,}000}” |
| Experience modification = Z × (AER − EER) / EER; the modification factor is 1 plus this value. | formula | tagged | Experience Rating: “M = Z \times \frac{A}{E} + (1 - Z)” |

</details>

<details><summary><code>cas8-2016-q1</code> · gap</summary>

Tagged pages: Credibility, Classification Ratemaking, Correlation

| Item | Kind | Status | Where |
|---|---|---|---|
| Compute expected claims for the insureds claim-free for t years by multiplying the number of claim-free insureds in each class by that clas… | procedure | missing |  |
| The average frequency of the group claim-free for t years is total expected claims divided by total insureds, and the relative frequency is… | formula | missing |  |
| The credibility implied by experience is Z = 1 minus the relative frequency of the group with that experience (compared to the overall aver… | formula | missing |  |
| If an insured's underlying chance of accident is stable over time, credibility is proportional to the number of years of experience, so the… | fact | missing |  |
| If credibility ratios deviate from proportionality to years of experience (credibility grows less than proportionally), the risk parameters… | fact | syllabus | Risk Experience: “Mahler showed that risk parameters shift over time, so older years predict less. Bailey and Simon f…” |
| Alternative test: compute correlations between class distributions (or frequencies) at different time lags and average them by lag; correla… | procedure | missing |  |

</details>

<details><summary><code>cas8-2016-q10</code> · gap</summary>

Tagged pages: Experience Rating, Claim, Rating Plan, Expected Loss

| Item | Kind | Status | Where |
|---|---|---|---|
| Expected losses equal payroll divided by 100 times the class expected loss rate (ELR), summed across classes; expected primary losses are e… | formula | missing |  |
| The NCCI experience rating modification (split-plan form) is Mod = (Ap + w*Ae + (1-w)*Ee + B) / (E + B), where Ap and Ae are actual primary… | formula | missing |  |
| The weighting value W and ballast value B are looked up in the NCCI table by the insured's expected losses, using the same table year as th… | procedure | missing |  |
| Primary losses are the first portion of each claim's loss up to the split point; excess losses are the part of each claim's loss above the … | definition | missing |  |
| Medical-only claims are reduced to 30% (ratable at the ERA factor) of their value before being split into primary and excess losses; indemn… | fact | missing |  |
| Apply the split point to each claim separately: primary loss is the lesser of the (adjusted) claim loss and the split point, and excess los… | procedure | missing |  |
| The credibility form of the modification is Mod = [Ap*Zp + Ep*(1-Zp) + Ae*Ze + Ee*(1-Ze)] / E, with Zp = E/(E+B) and Ze = w*Zp. | formula | missing |  |

</details>

<details><summary><code>cas8-2016-q11</code> · gap</summary>

Tagged pages: Experience Rating, Credibility, Rating Class, Classification Ratemaking

| Item | Kind | Status | Where |
|---|---|---|---|
| The manual loss ratio is losses divided by manual premium, and the standard (modified) loss ratio is losses divided by modified premium (ma… | definition | tagged | Experience Rating: “$$\text{Modified Premium} = \text{Manual Premium} \times M$$” |
| In the quintiles test, rank risks by the experience modification of each plan, split them into equal-sized groups (quintiles), and compute … | procedure | syllabus | Rating Plan: “Rank risks by mod and form five groups.” |
| A better experience rating plan shows greater dispersion in manual loss ratios across groups (it separates good and bad risks) and standard… | fact | syllabus | Rating Plan: “The *manual* loss ratio should rise with the mod, showing the plan *identifies* differences. The *s…” |
| Meyers efficiency test statistic = variance of standard (modified) loss ratios divided by variance of manual loss ratios; the plan with the… | formula | syllabus | Rating Plan: “The **efficiency test** compares $\mathrm{Var}(\text{standard LR}) / \mathrm{Var}(\text{manual LR})…” |
| A trend in standard loss ratios when risks are ranked by modification indicates credibility misassignment: an increasing trend means the pl… | fact | syllabus | Rating Plan: “Standard loss ratios falling as the mod rises mean too much credibility; rising means too little.” |
| Manual loss ratios that are not monotonically increasing with the modification indicate a plan that poorly identifies risk differences. | fact | syllabus | Rating Plan: “The *manual* loss ratio should rise with the mod, showing the plan *identifies* differences.” |
| Evaluate a classification plan by checking whether risks within a class are homogeneous, e.g. comparing average losses, loss ratios or expe… | procedure | tagged | Credibility: “Credibility governs the **homogeneity trade-off**: splitting a book finer improves [[Homogeneity\\|h…” |
| Tests of experience rating plans are applied to all risks in a single class together (separated by premium size), not split by subgroups wi… | fact | missing |  |

</details>

<details><summary><code>cas8-2016-q12</code> · answerable</summary>

Tagged pages: Retrospective Rating, Loss Sensitive Rating, Aggregate Loss Model

| Item | Kind | Status | Where |
|---|---|---|---|
| The entry ratio r is a risk's loss divided by the expected (average) loss for the risk group, r = L/E. | definition | tagged | Loss Sensitive Rating: “$A$ is the actual aggregate (ratable) loss, $E = \mathrm{E}[A]$ its expected value, and $r = A/E$ t…” |
| The insurance charge φ(r) is the expected excess losses above r times the mean, as a fraction of expected loss; empirically, φ(r) = φ(r_nex… | formula | tagged | Loss Sensitive Rating: “The **Table M charge** $\phi(r) = \mathrm{E}[\max(A/E - r,\,0)]$ is the expected loss above $rE$ pe…” |
| The insurance savings ψ(r) is the expected shortfall of losses below r times the mean as a fraction of expected loss, and is related to the… | formula | tagged | Loss Sensitive Rating: “Always $\psi(r) = \phi(r) + r - 1$.” |
| The insurance charge at entry ratio r is the expected amount by which aggregate losses exceed r times expected losses, expressed as a perce… | definition | tagged | Loss Sensitive Rating: “The **Table M charge** $\phi(r) = \mathrm{E}[\max(A/E - r,\,0)]$ is the expected loss above $rE$ pe…” |
| Table M curves differ by expected loss size: larger risks have less variance in entry ratios, giving flatter curves and smaller charges, so… | fact | tagged | Loss Sensitive Rating: “Table M is entered by risk size, because small risks have volatile entry ratios and therefore large…” |
| Applying a Table M that doesn't match the book's loss distribution (different mean or dispersion of entry ratios) misstates charges and sav… | fact | tagged | Loss Sensitive Rating: “Table M is entered by risk size, because small risks have volatile entry ratios and therefore large…” |

</details>

<details><summary><code>cas8-2016-q13</code> · answerable</summary>

Tagged pages: Retrospective Rating, Loss Sensitive Rating, Expenses

| Item | Kind | Status | Where |
|---|---|---|---|
| The insurance charge at a given entry ratio r is the expected excess loss ratio above r, φ(r) = ∫_r^∞ (x - r) f(x) dx / E, i.e. the share o… | formula | tagged | Loss Sensitive Rating: “The **Table M charge** $\phi(r) = \mathrm{E}[\max(A/E - r,\,0)]$ is the expected loss above $rE$ pe…” |
| The insurance savings at the minimum loss ratio is the expected shortfall of losses below the minimum loss limit H, ψ(r_H) = ∫_0^{r_H} (r_H… | formula | tagged | Loss Sensitive Rating: “the **savings** $\psi(r) = \mathrm{E}[\max(r - A/E,\,0)]$ is the expected shortfall below it.” |
| Read the insurance charge and savings from a Lee diagram by summing the areas of loss outcomes above the maximum and below the minimum loss… | procedure | tagged | Loss Sensitive Rating: “The **Table M charge** $\phi(r) = \mathrm{E}[\max(A/E - r,\,0)]$ is the expected loss above $rE$ pe…” |
| The net converted insurance charge equals the loss conversion factor c times the net insurance charge (charge minus savings) times expected… | formula | tagged | Loss Sensitive Rating: “$I = E[\phi(r_G) - \psi(r_H)]$ is the **net insurance charge**.” |
| The basic premium is b = e - (c - 1)E + cI, where e is the expense ratio times standard premium, and the provision for losses and total exp… | formula | tagged | Loss Sensitive Rating: “$$B = e - (c - 1)E + cI$$” |
| The retrospective premium is R = (b + c·L)·T, where L is the losses used (subject to limits) and T is the tax multiplier; it is bounded bet… | formula | tagged | Retrospective Rating: “$$R = \left(\text{BP} + L \times \text{LCF}\right) \times \text{TM}$$” |
| When actual losses exceed the loss amount at the maximum premium, the retrospective premium is capped, so the losses at the maximum loss ra… | fact | tagged | Retrospective Rating: “$$\text{Retro Premium} = \min\!\left(\max(R,\, R_{\min}),\, R_{\max}\right)$$” |

</details>

<details><summary><code>cas8-2016-q14</code> · gap</summary>

Tagged pages: Retrospective Rating, Loss Sensitive Rating, Aggregate Loss Model

| Item | Kind | Status | Where |
|---|---|---|---|
| When a retrospective rating plan has both a per-occurrence loss limit and a maximum premium, the charges for the two overlap, because cappi… | fact | missing |  |
| On a Lee diagram, the charge for the maximum premium is the area between the unlimited aggregate loss curve and the entry ratio at the maxi… | procedure | missing |  |
| Table M handles the overlap approximately: the Aggregate Excess Loss (AEL) procedure and the Increased Limits Ratio for Retrospective Loss … | procedure | missing |  |
| Table L is built directly with both an occurrence (per-loss) limit and an aggregate limit, giving separate tables for each loss limit on ca… | fact | tagged | Loss Sensitive Rating: “The aggregate charge is then computed on *limited* losses (Table M$_D$), or both are combined in on…” |
| Table M is based on countrywide data, is more credible, can be updated for inflation by adjusting the excess loss group (ELG) table, and is… | fact | missing |  |
| Table L is built from California data and includes California premium taxes, so it is inappropriate for use in other states, and it gives m… | fact | missing |  |

</details>

<details><summary><code>cas8-2016-q15</code> · gap</summary>

Tagged pages: Excess Insurance, Large Deductible Policy, Self-Insured Retention

| Item | Kind | Status | Where |
|---|---|---|---|
| Excess workers compensation premium = [expected excess loss × (1 + ULAE ratio) + standard premium × general overhead] / (1 − acquisition − … | formula | missing |  |
| Large dollar deductible (LDD) premium = [expected total loss × (excess ratio + loss-based assessment + ULAE ratio) + standard premium × (cr… | formula | tagged | Large Deductible Policy: “$$\text{Premium} = \frac{\text{Excess Losses} + \text{ALAE} + F + \text{CR} + \text{RM}}{1 - V - Q}…” |
| The excess ratio at a retention is the expected loss above the retention divided by total expected unlimited loss; expected excess loss equ… | definition | tagged | Large Deductible Policy: “$E[X]$ is expected ground-up loss, $\text{LER}(d)$ the [[Loss Elimination Ratio\\|loss elimination r…” |
| Use a Lee diagram (loss distribution as ordered loss sizes with equal probability) to find expected excess loss above a retention: sum the … | procedure | missing |  |
| A higher retention/deductible lowers expected excess loss and thus the excess premium, so the minimum insured retention for a premium cap i… | fact | tagged | Large Deductible Policy: “and the premium covers only what the insurer still bears” |
| The profit load on LDD policies is generally higher than on excess workers compensation policies because LDD insurers compete on both price… | fact | missing |  |

</details>

<details><summary><code>cas8-2016-q16</code> · answerable</summary>

Tagged pages: Large Deductible Policy, Retrospective Rating, Excess Insurance, Loss Sensitive Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a large dollar deductible policy equals [expected excess loss + insurance charge φ(r) × expected primary loss + expected total… | formula | tagged | Large Deductible Policy: “$$\text{Premium} = \frac{\text{Excess Losses} + \text{ALAE} + F + \text{CR} + \text{RM}}{1 - V - Q}…” |
| Expected primary losses are expected total losses minus expected losses excess of the deductible, and expected excess losses are the percen… | definition | tagged | Large Deductible Policy: “$$\text{Excess Losses} = E[X] \times \big(1 - \text{LER}(d)\big)$$” |
| Compute the entry ratio as the aggregate deductible divided by expected primary losses, and use it with the deductible column to look up th… | procedure | tagged | Loss Sensitive Rating: “$A$ is the actual aggregate (ratable) loss, $E = \mathrm{E}[A]$ its expected value, and $r = A/E$ t…” |
| Insurance charge is applied to expected primary (deductible-layer) losses, not total losses, because the aggregate deductible limits the in… | fact | tagged | Large Deductible Policy: “Many programs also cap the insured's total reimbursements with an **aggregate limit**; the insurer'…” |
| Under an excess policy with a self-insured retention, the insurer does not handle or adjust claims below the retention, has no aggregate ca… | fact | tagged | Loss Sensitive Rating: “*SIR:* the insured handles its own claims, and the insurer's limit sits above the retention.” |
| Large dollar deductible policies expose the insurer to credit risk from the insured's inability to reimburse deductible losses, while the i… | fact | tagged | Large Deductible Policy: “usually the insurer handles every claim, so the premium must cover handling cost even on claims tha…” |
| Loss trend leverages in excess layers: losses already above the retention increase fully and losses just below the retention are pushed abo… | fact | tagged | Large Deductible Policy: “and they are **leveraged**: with $d$ fixed, the excess layer grows faster than ground-up severity.” |

</details>

<details><summary><code>cas8-2016-q17</code> · gap</summary>

Tagged pages: Excess and Deductible Rating, Excess Insurance, Loss Elimination Ratio, Severity Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The excess ratio R(L) at limit L is the proportion of total expected losses that lies above L, equal to 1 minus the limited expected value … | definition | elsewhere | Excess Loss Development Factor: “Measured on the severity distribution at that maturity, $R^L_t = E[X \wedge L]/E[X]$ is the [[Loss …” |
| An entry ratio is a loss limit divided by the average loss size, and excess ratio curves are expressed as a function of the entry ratio. | definition | linked | Expected Loss: “[[Retrospective Rating\\|Retrospective rating]] and Table M express aggregate loss as an entry ratio…” |
| Fit an excess ratio curve for losses above a truncation point by truncating and shifting losses at that point (subtracting the point from l… | procedure | linked | Pareto Distribution: “given $X > d$, the excess $X - d$ is again Pareto, with shape $\alpha$ and scale $\theta + d$” |
| For a limit above the truncation point T, the overall excess ratio equals the empirical excess ratio at T times the fitted-curve excess rat… | formula | missing |  |
| Read an excess ratio at an entry ratio not listed in a table by linear interpolation between the adjacent tabulated entry ratios. | procedure | missing |  |
| Raising the truncation point makes the fitted curve rely on fewer, thinner data points (more parameter uncertainty and volatility) and shif… | fact | tagged | Excess and Deductible Rating: “Few claims reach the upper layers, so pricing leans on fitted curves and industry data, and the tai…” |
| The Pareto distribution has a heavier tail than the exponential distribution, so fitting a Pareto yields higher excess ratios and a higher … | fact | elsewhere | Tail Weight: “A **heavy-tailed** distribution such as the [[Pareto Distribution\\|Pareto]] makes extreme claims fa…” |

</details>

<details><summary><code>cas8-2016-q2</code> · gap</summary>

Tagged pages: Clustering, Hierarchical Clustering, Homogeneity, Credibility, Classification Ratemaking

| Item | Kind | Status | Where |
|---|---|---|---|
| Clustering in risk classification groups risks or classes of a rating variable into homogeneous groups, so that variance between groups is … | definition | tagged | Clustering: “groups observations into clusters so that observations within a cluster are similar to each other a…” |
| The purpose of clustering is to combine classes with similar risk characteristics or expected costs into larger groups with enough volume t… | fact | linked | Data Segmentation: “fine enough that each group's risks share similar expected costs and emergence patterns ([[Homogene…” |
| Hierarchical clustering builds nested clusters with a parent-child structure: going from k to k+1 groups splits one existing cluster in two… | definition | tagged | Hierarchical Clustering: “Agglomerative clustering starts with every observation in its own cluster and repeatedly fuses the …” |
| Non-hierarchical clustering seeks the best k clusters regardless of the best k-1 clusters, with no parent-child constraint, so risks can be… | definition | linked | K-Means Clustering: “partitions $n$ observations into $K$ non-overlapping clusters by minimizing **total within-cluster …” |
| The AAA Risk Classification Statement of Principles lists considerations for a classification system: homogeneity, credibility, expense, pr… | fact | missing |  |
| Creating more groupings within a class makes each group smaller, which can improve homogeneity and reduce discontinuities between rates but… | fact | tagged | Homogeneity: “Splitting a book finer makes each group more alike but leaves each with less data; combining groups…” |

</details>

<details><summary><code>cas8-2016-q3</code> · gap</summary>

Tagged pages: Rating Variable, Classification Ratemaking, Homogeneity, Credibility

| Item | Kind | Status | Where |
|---|---|---|---|
| The AAA Risk Classification Statement of Principles evaluates a rating variable against considerations grouped as statistical (credibility,… | fact | tagged | Classification Ratemaking: “- **Statistical** — statistical significance, [[Homogeneity\\|homogeneity]] within levels, and [[Cre…” |
| Credibility as a statistical criterion means each class is large enough to produce statistically credible predictions of expected loss. | definition | tagged | Homogeneity: “Splitting a book finer makes each group more alike but leaves each with less data; combining groups…” |
| Absence of ambiguity (an operational consideration) means each classification is objective, clearly defined, easily determined, and mutuall… | definition | linked | Model Implementation: “The plan must be clear, leaving no ambiguity about which class a risk falls in.” |
| A classification variable that improves homogeneity and the accuracy of predicting expected loss, by reflecting real cost differences, supp… | fact | tagged | Classification Ratemaking: “**Why classify at all.** In a competitive market an insurer that charges one average rate to a hete…” |
| Manipulation (an operational consideration) is the risk that insureds can change or misreport the variable to obtain lower rates, which wei… | definition | tagged | Classification Ratemaking: “- **Operational** — objective, inexpensive to obtain and verify, not manipulable by the insured.” |
| Public acceptability (a social consideration) requires a rating variable to have a plausible causal relationship to loss potential that is … | definition | tagged | Classification Ratemaking: “- **Social** — privacy, causality, controllability and affordability; these are where public and re…” |
| Hazard reduction incentive (a social consideration) means a classification system should encourage insureds to reduce their hazard exposure… | definition | missing |  |
| Predictive stability (constancy of measure) means a variable's classification and its relationship to expected loss should be stable over t… | definition | linked | Rating Class: “Actuarially, a class should be [[Homogeneity\\|homogeneous]] within, separated from the others, [[Cr…” |

</details>

<details><summary><code>cas8-2016-q4</code> · answerable</summary>

Tagged pages: Generalized Linear Model, Offset Variable, Tweedie Distribution, Loss Elimination Ratio, Rating Factors, High Dimensional Variables

| Item | Kind | Status | Where |
|---|---|---|---|
| Coverage options such as policy limit are correlated with omitted variables and affected by adverse or favorable selection, so a GLM can pr… | fact | tagged | Rating Factors: “A factor fitted in the GLM for an option the insured chose picks up selection effects: a higher ded…” |
| A GLM for a rating plan is built to predict the prospective period, so predictors must be known at quotation for new business and be stable… | fact | linked | Rating Variable: “*Implement:* the variable must be obtainable at the point of sale” |
| Including a high-cardinality categorical variable such as ZIP code adds too many parameters and degrees of freedom, creating sparse data, c… | fact | tagged | High Dimensional Variables: “A GLM gives each level the estimate that best fits its own data, whatever the volume, so thin level…” |
| Geographic variables with many levels can be handled by spatial smoothing techniques outside the GLM, with the smoothed result included in … | procedure | tagged | Rating Factors: “Smooth the result spatially and weight it by credibility. Then feed the territory relativities back…” |
| A Tweedie pure premium GLM with a log link assumes a predictor moves frequency and severity in the same direction; a deductible lowers freq… | fact | tagged | Tweedie Distribution: “it implicitly assumes frequency and severity **move in the same direction**” |
| Deductible relativities from a GLM can reflect factors beyond loss elimination, since high-risk insureds self-select or are forced by under… | fact | tagged | Rating Factors: “A factor fitted in the GLM for an option the insured chose picks up selection effects: a higher ded…” |
| Deductible relativities can be determined from loss elimination ratios (the portion of expected loss eliminated by the deductible, E[X;d]/E… | formula | tagged | Loss Elimination Ratio: “The LER is the bridge from a full-coverage rate to a deductible rate: multiply the full-coverage lo…” |
| Externally determined relativities are incorporated into a GLM as an offset term, which adds ln(relativity) to the linear predictor under a… | procedure | tagged | Offset Variable: “Offsets are also used to carry forward previously-determined relativities (e.g., an established ded…” |

</details>

<details><summary><code>cas8-2016-q5</code> · answerable</summary>

Tagged pages: Gini Index, Lift, Generalized Linear Model

| Item | Kind | Status | Where |
|---|---|---|---|
| To construct a Lorenz curve for a rating plan, sort risks from lowest to highest model-predicted loss (relative to exposure), then compute … | procedure | tagged | Gini Index: “Sort the holdout data by predicted loss cost, **lowest first**, and plot the cumulative share of ex…” |
| The Lorenz curve for a rating plan plots cumulative percentage of exposures on the x-axis against cumulative percentage of actual losses on… | definition | tagged | Gini Index: “plot the cumulative share of exposure ($x$) against the cumulative share of actual losses, $L(x)$.” |
| The line of equality is the 45-degree line from (0,0) to (1,1), representing a model with no differentiation where every exposure has the s… | definition | tagged | Gini Index: “A model that ranks nothing puts losses in proportion to exposure, so $L(x) = x$ and Gini $= 0$” |
| The Gini index equals twice the area between the Lorenz curve and the line of equality. | formula | tagged | Gini Index: “The Gini index is twice the area between that Lorenz curve and the line of equality:” |
| The Gini index measures a rating plan's ability to differentiate the best from the worst risks (predictive lift or risk classification powe… | fact | tagged | Gini Index: “the better the model separates low-cost from high-cost risks, the further the curve bows below the …” |

</details>

<details><summary><code>cas8-2016-q6</code> · gap</summary>

Tagged pages: Generalized Linear Model, Offset Variable, Cross-Validation, Bootstrap

| Item | Kind | Status | Where |
|---|---|---|---|
| In a GLM with a log link, the modeled mean is the exponential of the linear predictor: mu = exp(beta_0 + sum of beta_i * x_i), where each p… | formula | linked | Link Function: “\\| Log \\| $\ln\mu$ \\| $e^\eta$ \\| Poisson (counts), Gamma (severity) \\|” |
| A Tweedie GLM with a loss ratio response models the expected loss ratio directly, so the exponentiated linear predictor is the modeled loss… | fact | elsewhere | Response Variable: “**Pure premium or loss cost** — mostly zeros plus a skewed positive amount: the [[Tweedie Distribut…” |
| An offset is a term in a GLM's linear predictor whose coefficient is fixed at a known value rather than estimated, so that previously fitte… | definition | tagged | Offset Variable: “An **Offset Variable** is a predictor in a [[Generalized Linear Model]] whose coefficient is fixed …” |
| To keep chosen coefficients identical across two GLMs, include the prior model's linear predictor (its fitted terms) as an offset in the ne… | procedure | tagged | Offset Variable: “Offsets are also used to carry forward previously-determined relativities (e.g., an established ded…” |
| Cross-validation assesses parameter stability by splitting the data into k folds, fitting the model on k-1 folds repeatedly, and comparing … | procedure | tagged | Cross-Validation: “**$k$-fold**: split the data into $k$ equal parts, fit on $k-1$ and score on the held-out fold, the…” |
| Bootstrapping assesses parameter stability by resampling the data with replacement to build many datasets, refitting the same model on each… | procedure | tagged | Bootstrap: “The **bootstrap** estimates the sampling variability of a statistic by resampling the observed data…” |
| Variable stability (consistency of a coefficient estimate across data subsets or samples, or over time) is distinct from variable significa… | fact | missing |  |

</details>

<details><summary><code>cas8-2016-q7</code> · answerable</summary>

Tagged pages: Model Selection, AIC, BIC, Deviance

| Item | Kind | Status | Where |
|---|---|---|---|
| AIC = -2·(loglikelihood) + 2p, where p is the number of parameters; equivalently deviance + 2p when the deviance replaces -2·loglikelihood. | formula | tagged | AIC: “\text{AIC} = -2\ell(\hat{\boldsymbol{\beta}}) + 2p” |
| BIC = -2·(loglikelihood) + p·ln(n), where p is the number of parameters and n is the number of data points; equivalently deviance + p·ln(n). | formula | tagged | BIC: “\text{BIC} = -2\ell(\hat{\boldsymbol{\beta}}) + p\ln(n)” |
| For AIC and BIC, a lower value indicates a better model, since both already penalize for additional parameters; the model with the lowest s… | fact | tagged | AIC: “**Lower AIC** indicates a better model (better fit relative to complexity)” |
| BIC penalizes additional parameters more heavily than AIC when the dataset is large (ln(n) > 2), so BIC tends to exclude predictive variabl… | fact | tagged | BIC: “BIC tends to select **simpler models** than AIC for large $n$ since $\ln(n) > 2$ when $n > 7$” |
| Deviance always decreases when parameters are added to a GLM, so a lower deviance alone is not an appropriate basis for adopting a more com… | fact | syllabus | Model Fit: “Adding any predictor lowers deviance.” |

</details>

<details><summary><code>cas8-2016-q8</code> · gap</summary>

Tagged pages: Increased Limits, Adverse Selection

| Item | Kind | Status | Where |
|---|---|---|---|
| Anti-selection (adverse or favorable selection) in increased limits ratemaking occurs when insureds' choice of policy limit is correlated w… | definition | tagged | Adverse Selection: “is the tendency for those who know they are worse-than-average risks to buy more insurance, and bet…” |
| An increased limits factor for limit L is the ratio of the average limited severity at L to the average limited severity at the basic limit… | formula | tagged | Increased Limits: “$$\text{ILF}(L) = \frac{E[X \wedge L]}{E[X \wedge B]}$$” |
| To test for anti-selection, compute ILFs using only the experience of policies that purchased the higher limit (the group) and compare them… | procedure | missing |  |
| The ILF for the total population is computed by combining the limited severities across all policy-limit groups (weighted by the share of p… | procedure | missing |  |
| Adverse selection in ILFs is when higher-risk insureds (those expecting larger losses) choose higher policy limits, so higher limits show w… | definition | tagged | Adverse Selection: “is the tendency for those who know they are worse-than-average risks to buy more insurance, and bet…” |
| Favorable selection in ILFs is when safer or better-than-average insureds choose higher policy limits, so higher limits show better-than-av… | definition | tagged | Increased Limits: “The last fails for some lines — personal auto insureds who choose very high limits tend to have low…” |

</details>

<details><summary><code>cas8-2016-q9</code> · gap</summary>

Tagged pages: Experience Rating, Rating Class

| Item | Kind | Status | Where |
|---|---|---|---|
| The experience modification (experience mod) adjusts a risk's manual premium to reflect the difference between the insured's own expected l… | definition | tagged | Experience Rating: “A mod is therefore a **relative** measure: it says how this risk compares with the average risk alr…” |
| A rising experience mod does not by itself indicate a bad risk; it can reflect poor classification fit, random large losses, or class rates… | fact | tagged | Experience Rating (collapsed): “**B had one bad accident**, which is largely luck and says little about its future.” |
| If experience rating is appropriate and rates are equitable, modified loss ratios should be similar for credit-mod and debit-mod risks, so … | fact | missing |  |
| Ratemaking and experience rating are prospective: premium is set to cover expected future losses, not to recoup past losses, so a debit mod… | fact | tagged | Experience Rating: “Experience rating is **prospective**: it uses a completed experience period (typically three years,…” |
| Small risks that are not eligible for experience rating, or that receive little credibility, have mods at or near 1.0 (balanced by the off-… | fact | tagged | Experience Rating: “A small risk's mod stays near $1.0$ however good or bad its recent record, because a few claims say…” |
| An overall credit mod can result from manual rates being set too high or from insureds having higher-than-average wages (more expected loss… | fact | missing |  |

</details>

<details><summary><code>cas8-2017-q1</code> · gap</summary>

Tagged pages: Variable Selection, Generalized Linear Model, Tweedie Distribution, Experience Rating, Statistical Significance, Rating Variable

| Item | Kind | Status | Where |
|---|---|---|---|
| A low p-value indicates a variable is statistically significant and a good predictor of the response; a high p-value indicates weak predict… | fact | tagged | Statistical Significance: “the [[p-Value\\|p-value]] behind $z$ is the chance of an estimate that far from zero if the class tr…” |
| Non-statistical criteria for including a rating variable are a causal or intuitive connection to losses, practicality, and ease and objecti… | fact | tagged | Rating Variable: “a causal story strengthens the case, but ASOP No. 12 does not require one. It should be objective a…” |
| A variable that is statistically significant may still be excluded because its use is discriminatory or violates applicable law (ASOP 12), … | fact | tagged | Generalized Linear Model: “statistical significance alone does not make a variable usable” |
| Variables that are highly correlated with each other (multicollinearity) can cause model instability or convergence problems, so one of the… | fact | elsewhere | Multicollinearity: “Remedies: drop one of the pair, combine them into a single variable” |
| In a log-link GLM the expected value is the exponential of the intercept plus the sum of coefficients times the variable values, with the b… | formula | linked | Link Function: “\\| Log \\| $\ln\mu$ \\| $e^\eta$ \\| Poisson (counts), Gamma (severity) \\|” |
| Manual premium is the modeled pure premium rate multiplied by exposure (payroll divided by 100 for a rate per $100 of payroll). | procedure | missing |  |
| Premium with fixed and variable expenses: P = expected loss + fixed expenses + variable expense percentage × P, so P = (loss + fixed)/(1 − … | formula | elsewhere | Pure Premium Method: “\text{Indicated Rate} = \frac{\text{Pure Premium} + F}{1 - V - Q_T}” |
| Experience rating modification M = (A + K)/(E + K), where A is actual losses, E is expected losses and K is the experience rating constant;… | formula | tagged | Experience Rating: “M = Z \times \frac{A}{E} + (1 - Z)” |
| The standard premium equals the manual premium (with expenses loaded) multiplied by the experience modification factor. | procedure | tagged | Experience Rating: “Order of application: schedule and experience modifications apply to the manual premium to give **s…” |
| A model should not include a risk's own historical losses as a predictor when experience rating already reflects them, because doing so dou… | fact | missing |  |
| Very large risks have highly credible own experience and are poorly suited to a class-based manual rating plan, so they may be priced using… | fact | tagged | Experience Rating: “a large risk approaches $Z = 1$ and effectively self-rates” |

</details>

<details><summary><code>cas8-2017-q10</code> · gap</summary>

Tagged pages: Schedule Rating, Experience Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| Schedule rating applies credits or debits within filed maximum ranges to individual risk characteristics (e.g., cooperation/safety program,… | definition | tagged | Schedule Rating: “**Schedule Rating** applies underwriter-assigned debits and credits to the manual premium for chara…” |
| Schedule rating should not double count characteristics already reflected in the risk's experience rating; only the portion of a change not… | fact | tagged | Schedule Rating: “When both apply, the underwriter must avoid double-counting: the new programme will eventually show…” |
| The experience rating period typically uses several years of data and excludes the most recent year(s) due to a lag, so recent changes in t… | fact | tagged | Experience Rating: “Experience rating is **prospective**: it uses a completed experience period (typically three years,…” |
| Size a schedule debit or credit by judging the fraction of the experience period that does not reflect the current risk condition and apply… | procedure | missing |  |
| Removing a safety program is expected to increase future losses and so justifies a schedule debit under the cooperation/safety characterist… | fact | tagged | Schedule Rating: “schedule rating looks at characteristics expected to have a material effect on future losses that a…” |
| A change in staffing or workforce quality (employee selection, training, supervision, experience) not yet in the experience period can just… | fact | syllabus | Risk Experience: “A change in operations can make the record out of date, which is where [[Schedule Rating\\|schedule …” |
| A schedule modification must be justified by documented, risk-specific reasons and stay within the filed maximum for each characteristic. | fact | tagged | Schedule Rating: “State laws and regulations generally require the filed guidelines to be applied consistently, and d…” |

</details>

<details><summary><code>cas8-2017-q11</code> · answerable</summary>

Tagged pages: Experience Rating, Individual Risk Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| The experience rating efficiency test statistic is the variance of loss ratios to standard (modified) premium divided by the variance of lo… | definition | linked | Rating Plan: “The **efficiency test** compares $\mathrm{Var}(\text{standard LR}) / \mathrm{Var}(\text{manual LR})…” |
| A lower efficiency statistic indicates a better experience rating plan, because standard-premium loss ratios are more homogeneous (less spr… | fact | linked | Rating Plan: “The **efficiency test** compares $\mathrm{Var}(\text{standard LR}) / \mathrm{Var}(\text{manual LR})…” |
| Compute the variance of group loss ratios about their mean (sample or population form, optionally premium-weighted) for both manual and sta… | procedure | linked | Rating Plan: “The standard loss ratio is the manual loss ratio divided by the mod:” |
| A more efficient experience rating plan reduces adverse selection, which helps retain good risks, supports healthy premium growth, and limi… | fact | tagged | Individual Risk Rating: “It improves equity, strengthens the incentive for loss control, and makes more risks acceptable to …” |
| When implementing a new experience rating plan, an insurer may mitigate disruption by applying an off-balance adjustment to restore premium… | fact | tagged | Individual Risk Rating: “If the mods actually written average below $1.00$, manual rates must be loaded by an off-balance fa…” |

</details>

<details><summary><code>cas8-2017-q12</code> · gap</summary>

Tagged pages: Layer of Insurance, Limited Expected Value, Increased Limits, Deductible Rating, Expected Loss

| Item | Kind | Status | Where |
|---|---|---|---|
| A Lee diagram plots size of loss on the vertical axis against the cumulative probability (0 to 1) on the horizontal axis, so that areas rep… | definition | missing |  |
| On a Lee diagram, a deductible M and a policy limit (maximum payout N, so loss cap M+N) are shown as horizontal lines at M and M+N; the ins… | procedure | tagged | Layer of Insurance: “Equivalently, $E[X_{(a,b]}] = \int_a^b S(x)\,dx$ with $S = 1 - F$ — the horizontal strip of a Lee d…” |
| Layer method: expected loss in the layer from a to b equals the integral from a to b of the survival function 1 - F(x) dx, integrating over… | formula | tagged | Layer of Insurance: “Equivalently, $E[X_{(a,b]}] = \int_a^b S(x)\,dx$ with $S = 1 - F$ — the horizontal strip of a Lee d…” |
| Size method: expected loss in the layer from a to b equals the integral from a to b of (x - a) dF(x) plus (b - a)(1 - F(b)), integrating ov… | formula | tagged | Deductible Rating: “Werner writes the losses eliminated by a deductible $D$ as $\int_0^D x f(x)\,dx + D\,[1 - F(D)]$” |
| The layer method is convenient when the survival function is easy to integrate or when computing expected loss at many limits (each added l… | fact | missing |  |
| An increased limits factor (ILF) at limit L is the ratio of expected loss at limit L to expected loss at the basic limit. | definition | tagged | Limited Expected Value: “the increased limit factor for limit $H$ over basic limit $B$ is $\text{ILF}(H) = \text{LAS}(H)/\te…” |
| The consistency test for ILFs requires that ILFs increase at a decreasing rate, i.e. the premium for successive excess layers of equal widt… | fact | tagged | Layer of Insurance: “Expected cost per dollar of limit falls as the layer rises (the consistency test).” |
| On a Lee diagram, equal-width layers of loss size correspond to horizontal bands whose areas shrink as the layer moves higher, because the … | fact | tagged | Increased Limits: “Since $\text{LAS}(k) = \int_0^k S(x)\,dx$ (Palmer), each additional dollar of limit at $x$ adds $S(…” |

</details>

<details><summary><code>cas8-2017-q13</code> · answerable</summary>

Tagged pages: Retrospective Rating, Aggregate Loss Model, Loss Sensitive Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| The Table M insurance charge function φ(r) is the expected proportion of expected aggregate loss that exceeds r times the expected loss (r … | definition | tagged | Loss Sensitive Rating: “The **Table M charge** $\phi(r) = \mathrm{E}[\max(A/E - r,\,0)]$ is the expected loss above $rE$ pe…” |
| The insurance savings ψ(r) is the expected proportion of expected loss by which losses fall short of r times the expected loss; it equals ψ… | definition | tagged | Loss Sensitive Rating: “and the **savings** $\psi(r) = \mathrm{E}[\max(r - A/E,\,0)]$ is the expected shortfall below it. A…” |
| For a retrospective rating plan, the basic premium is b = e − (c − 1)E[A] + c·I, where the net insurance charge is I = E[A](φ(rG) − ψ(rH)),… | formula | tagged | Loss Sensitive Rating: “$$B = e - (c - 1)E + cI$$ … Here $e$ is total expense before taxes, including LAE and profit, and $…” |
| The retrospective premium is P = (b + c·L)·T, so the maximum premium is G = (b + c·L_G)·T, where L_G is the loss at the maximum premium and… | formula | tagged | Retrospective Rating: “$$R = \left(\text{BP} + L \times \text{LCF}\right) \times \text{TM}$$” |
| To build Table M values from empirical sample data, compute the sample mean E[A], convert each loss to an entry ratio r = A/E[A], and for e… | procedure | tagged | Loss Sensitive Rating: “The **Table M charge** $\phi(r) = \mathrm{E}[\max(A/E - r,\,0)]$ is the expected loss above $rE$ pe…” |
| Table M (the aggregate loss distribution) should be built from risks of similar size and subject to similar hazards, with a similar expecte… | fact | tagged | Loss Sensitive Rating: “Table M is entered by risk size, because small risks have volatile entry ratios and therefore large…” |

</details>

<details><summary><code>cas8-2017-q14</code> · untagged</summary>

Tagged pages: Excess Insurance, Exponential Distribution, Severity Distribution, Excess of Loss, Expected Loss

| Item | Kind | Status | Where |
|---|---|---|---|
| Excess severity (mean excess loss) at limit L, e(L), is the average amount by which claims exceeding L exceed L, i.e. the expected loss in … | definition | elsewhere | Mean Excess Loss: “The **Mean Excess Loss** $e_X(d)$ is the expected amount by which a loss exceeds $d$, given that it…” |
| Excess severity at L equals (E[X] - E[X;L]) / (1 - F(L)), where E[X;L] is the limited expected value and 1 - F(L) is the proportion of clai… | formula | linked | Limited Expected Value: “$e(u)$ is the mean excess loss at $u$: $e(u) = \dfrac{E[X] - E[X \wedge u]}{1 - F(u)}$” |
| From grouped ground-up data, the limited expected value E[X;L] equals (losses on claims below L plus L times the number of claims above L) … | formula | linked | Deductible: “$$E[X \wedge d] = \sum_{x < d} x\,p(x) + d\,P(X \geq d)$$” |
| A constant (flat) excess severity function across limits indicates an exponential distribution (beyond the starting point), with mean equal… | fact | elsewhere | Mean Excess Loss: “The [[Exponential Distribution\\|exponential]] has a constant mean excess, $e_X(d) = \theta$, becaus…” |
| The exponential distribution is memoryless: conditional on a claim exceeding a threshold d, the excess over d is exponential with the same … | fact | tagged | Exponential Distribution: “given $X > d$, the excess $X - d$ is again $\text{Exp}(\theta)$.” |
| Expected reinsurer losses for an excess layer above retention R equal the expected number of claims exceeding R times the excess severity a… | procedure | tagged | Expected Loss: “You can also count the claims that *reach* the layer, $E[N]\,[1 - F(a)]$, and multiply by their mea…” |

</details>

<details><summary><code>cas8-2017-q15</code> · answerable</summary>

Tagged pages: Loss Sensitive Rating, Retrospective Rating, Large Deductible Policy, Self-Insured Retention

| Item | Kind | Status | Where |
|---|---|---|---|
| Retrospective premium = (Basic premium + Loss conversion factor × Limited incurred loss & ALAE at the adjustment date) × Tax multiplier, wi… | formula | tagged | Retrospective Rating: “$$R = \left(\text{BP} + L \times \text{LCF}\right) \times \text{TM}$$” |
| The tax multiplier equals 1/(1 − tax rate), not 1 + tax rate. | formula | tagged | Loss Sensitive Rating: “with loss conversion factor $c$ (loads LAE) and tax multiplier $T = 1/(1 - \text{tax rate})$.” |
| The loss conversion factor is 1 plus the ULAE percentage of loss & ALAE (the factor applied to losses to cover loss adjustment expense). | formula | tagged | Retrospective Rating: “**Converted losses** $(L \times \text{LCF})$ are the insured's reported losses $L$, limited by any …” |
| The initial retrospective premium is set from expected limited loss & ALAE (the expected loss subject to the per-occurrence limit) using th… | procedure | tagged | Retrospective Rating: “$$R = \left(\text{BP} + L \times \text{LCF}\right) \times \text{TM}$$” |
| When the per-occurrence limit applies to the losses in the retro formula, the basic premium can be assumed to include the per-occurrence ex… | fact | tagged | Loss Sensitive Rating: “A loss limit adds an excess-loss charge.” |
| Alternative loss-sensitive plans that give the insured a cash flow benefit without added excess risk (large dollar deductible, self-insured… | fact | tagged | Loss Sensitive Rating: “*Large deductible:* the insurer pays every claim and bills the deductible back. It must have a per-…” |
| Large deductible, SIR, and paid loss plans give the insurer more credit risk because the insurer pays losses first (or collects later) and … | fact | tagged | Loss Sensitive Rating: “**Analysing a plan** means looking at [[Credit Risk\\|credit risk]] on future premium or reimburseme…” |

</details>

<details><summary><code>cas8-2017-q16</code> · gap</summary>

Tagged pages: Aggregate Loss Model, Retrospective Rating, Excess Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| An entry ratio is a risk's actual aggregate loss divided by its expected (average) aggregate loss for the group of similar risks. | definition | syllabus | Expected Loss: “[[Retrospective Rating\\|Retrospective rating]] and Table M express aggregate loss as an entry ratio…” |
| A Table M charge (insurance charge) at entry ratio r is the expected aggregate loss in excess of r times expected loss, expressed as a rati… | definition | elsewhere | Aggregate Excess of Loss: “$\phi(A)$ is Clark's **excess charge factor**, the share of expected aggregate loss above $A$.” |
| To build an empirical Table M, group insureds with similar loss potential, compute each risk's entry ratio from its aggregate loss and the … | procedure | missing |  |
| For each entry ratio r, determine the percentage of risks whose entry ratio exceeds r. | procedure | missing |  |
| Charge(r_i) = Charge(r_{i+1}) + (r_{i+1} − r_i) × (percent of risks with entry ratio above r_i), starting with charge 0 at the highest entr… | formula | missing |  |
| To estimate the aggregate excess loss cost, compute the entry ratio as the aggregate limit divided by expected aggregate loss, look up the … | procedure | elsewhere | Aggregate Excess of Loss: “The net loss cost is the layer's loss cost gross of the AAD times $\phi_{\text{AAD}}$.” |
| Continuous approximation models for aggregate loss have disadvantages: they require estimating parameters (parameter risk, sensitivity to i… | fact | elsewhere | Aggregate Excess of Loss: “numerical methods can err at low frequencies; and the model captures process variance but not param…” |

</details>

<details><summary><code>cas8-2017-q17</code> · gap</summary>

Tagged pages: Large Deductible Policy, Retrospective Rating, Aggregate Loss Model, Expected Loss

| Item | Kind | Status | Where |
|---|---|---|---|
| The ICRLL procedure adjusts for a per-occurrence limit by inflating the expected unlimited losses (multiplied by the state/hazard group dif… | procedure | missing |  |
| Adjusted expected losses for ELG selection = expected unlimited aggregate losses × hazard group differential × (1 + D·k)/(1 − k), where k =… | formula | missing |  |
| The excess ratio k for a per-occurrence limit is the fraction of expected unlimited losses lying above the limit, equal to 1 minus the rati… | definition | tagged | Large Deductible Policy: “$E[X]$ is expected ground-up loss, $\text{LER}(d)$ the [[Loss Elimination Ratio\\|loss elimination r…” |
| The entry ratio is the aggregate limit (or deductible) divided by the expected aggregate losses (here the limited expected losses), used to… | definition | tagged | Expected Loss: “[[Retrospective Rating\\|Retrospective rating]] and Table M express aggregate loss as an entry ratio…” |
| The insurance charge Φ(r) is the expected excess of aggregate losses over the entry ratio times expected losses, expressed as a fraction of… | definition | linked | Loss Sensitive Rating: “The **Table M charge** $\phi(r) = \mathrm{E}[\max(A/E - r,\,0)]$ is the expected loss above $rE$ pe…” |
| Total expected loss cost with a per-occurrence limit and aggregate deductible/limit = expected unlimited losses minus expected limited loss… | formula | missing |  |
| A per-occurrence limit reduces the variance of the severity and aggregate loss distributions, which is equivalent to a policy with larger e… | fact | missing |  |
| Interpolation is not needed when the entry ratio matches a table row; otherwise insurance charges are read from the row/column for the entr… | procedure | missing |  |

</details>

<details><summary><code>cas8-2017-q3</code> · gap</summary>

Tagged pages: Credibility, Exposure Base, Classification Ratemaking

| Item | Kind | Status | Where |
|---|---|---|---|
| Using earned premium as the exposure base for a merit rating plan corrects the maldistribution caused by correlation between the merit rati… | fact | tagged | Classification Ratemaking: “The loss ratio method for relativities has an advantage over the pure premium method: because its d…” |
| The relative claim frequency (modification) of a merit rating class is its claim frequency per exposure divided by the overall claim freque… | definition | tagged | Classification Ratemaking: “$$\text{Relativity}_i = \frac{\text{Pure Premium}_i}{\text{Pure Premium}_{\text{base}}}$$” |
| The credibility of an accident-free class is estimated as Z = 1 minus the class's relative claim frequency, since relative frequency = Z*R … | formula | missing |  |
| Accident-free classes are cumulative: the 'n or more years' class pools all classes with at least n accident-free years (sum claims and sum… | procedure | missing |  |
| Relative credibility of one class is the ratio of its credibility to the credibility of a base class (e.g., 3+ years accident-free credibil… | procedure | missing |  |

</details>

<details><summary><code>cas8-2017-q4</code> · untagged</summary>

Tagged pages: Holdout Sample, Test Error, Model Selection, Cross-Validation

| Item | Kind | Status | Where |
|---|---|---|---|
| Training error decreases monotonically as model complexity (degrees of freedom) increases, because a more complex model always fits the dat… | fact | tagged | Test Error: “it falls automatically as the model becomes more flexible, so it cannot choose between models.” |
| Testing a model on the same data used to build it gives overly optimistic results, so a holdout (test) set of unseen data is used to assess… | fact | tagged | Holdout Sample: “A **Holdout Sample** is data deliberately kept out of model building so the finished model can be t…” |
| Splitting data into training and test sets helps detect and avoid overfitting, because added complexity may improve the fit on training dat… | fact | tagged | Holdout Sample: “Training error always falls as terms are added; holdout error falls, then **rises** once the model …” |
| Test error falls as complexity increases until the model begins to overfit, after which test error rises while training error keeps falling. | fact | tagged | Holdout Sample: “Training error always falls as terms are added; holdout error falls, then **rises** once the model …” |
| The optimal balance of complexity and performance is at or near the minimum of the test error curve; models to the left are underfit (test … | procedure | tagged | Cross-Validation: “while CV error is U-shaped, and its minimum marks the right model size” |
| A time-based (out-of-time) split is advantageous over a random split when many records are influenced by a single event, such as a catastro… | fact | elsewhere | Model Training and Evaluation: “an **out-of-time** test set, such as a later accident year, is especially important when one event,…” |

</details>

<details><summary><code>cas8-2017-q5</code> · answerable</summary>

Tagged pages: Quantile Plot, Logistic Regression, Generalized Linear Model

| Item | Kind | Status | Where |
|---|---|---|---|
| To build a quintile plot, sort records by the model's predicted values from smallest to largest, divide them into five equal-sized buckets,… | procedure | tagged | Quantile Plot: “sorts a held-out dataset by predicted loss cost, splits it into equal-exposure buckets, and plots t…” |
| Because records are sorted by each model's own predictions, bucket membership and hence the actual values differ for each model, so each mo… | fact | tagged | Quantile Plot: “Two models are compared on their two quantile plots; a [[Double Lift Chart]] compares them directly” |
| A null model has only an intercept and predicts the grand mean of the response for every record. | definition | linked | Link Function: “When the model has an intercept, the column of ones gives $\sum_i \hat{\mu}_i = \sum_i y_i$: the fi…” |
| A saturated model has as many parameters as there are records and reproduces every observed outcome in the training data exactly. | definition | syllabus | Model Fit: “It measures the log-likelihood gap between the model and the saturated model, which has one paramet…” |
| For a logistic GLM the response being plotted is the proportion of records that are fraudulent (or non-fraudulent), i.e. the event probabil… | fact | tagged | Logistic Regression: “the outcome is modelled as binomial and the **logit** [[Link Function]] maps the probability $\pi \…” |
| A practical model's quintile plot lies between the null model (flat at the mean) and the saturated model (most extreme, separating actual 0… | fact | tagged | Quantile Plot: “does each bucket's actual match its predicted level?” |

</details>

<details><summary><code>cas8-2017-q6</code> · untagged</summary>

Tagged pages: Confusion Matrix, AUROC, Logistic Regression

| Item | Kind | Status | Where |
|---|---|---|---|
| A confusion matrix cross-tabulates actual outcomes against predicted outcomes, giving counts of true positives, false positives, true negat… | definition | tagged | Confusion Matrix: “A **confusion matrix** cross-tabulates predicted class against actual class for a classifier, and i…” |
| To classify observations from a logistic model, predict a positive (e.g. fraud) when the predicted probability exceeds the discrimination t… | procedure | elsewhere | Model Training and Evaluation: “A [[Logistic Regression\\|logistic]] or [[Classification Tree\\|tree]] model gives a probability; a *…” |
| Sensitivity (true positive rate) = true positives / total actual positives; specificity = true negatives / total actual negatives. | formula | tagged | Confusion Matrix: “\\| **Sensitivity** (recall, TPR) \\| $\dfrac{TP}{TP + FN}$ \\| of the actual positives, how many were…” |
| False positive rate = 1 − specificity = false positives / total actual negatives. | formula | tagged | Confusion Matrix: “\\| False positive rate \\| $1 - \text{specificity}$ \\| the $x$-axis of the ROC curve \\|” |
| An ROC curve plots sensitivity (y-axis) against false positive rate (x-axis) with one point per discrimination threshold, anchored at (0,0)… | procedure | tagged | AUROC: “**ROC Curve**: plot of **True Positive Rate (Sensitivity)** vs. **False Positive Rate (1 − Specific…” |
| Lowering the discrimination threshold raises sensitivity (catches more actual positives) but also raises the false positive rate (more nega… | fact | elsewhere | Model Training and Evaluation: “Lowering the threshold catches more true positives at the cost of more false positives.” |
| When missing a positive is very costly (high severity) and positives are rare (low frequency), a lower threshold is preferred because the c… | fact | tagged | Confusion Matrix: “The two errors rarely cost the same: a missed fraud and a wrongly investigated honest claim have di…” |

</details>

<details><summary><code>cas8-2017-q7</code> · gap</summary>

Tagged pages: Risk Loads, Increased Limits, Allocated Loss Adjustment Expense

| Item | Kind | Status | Where |
|---|---|---|---|
| Under the variance method, the risk load for limit l is k times the second moment of the limited loss, k·E[X²;l] (equivalently k·(Var + δ·E… | formula | tagged | Risk Loads: “*variance*: $P = E[X] + k\,\text{Var}(X)$” |
| An ILF without risk load at limit l is the ratio of the loaded (ALAE-included) expected limited loss at l to that at the basic limit, E[X;l… | formula | tagged | Increased Limits: “$$\text{ILF}(L) = \frac{E[X \wedge L]}{E[X \wedge B]}$$” |
| Allocated loss adjustment expense expressed as a percentage of indemnity is included by multiplying the expected limited indemnity loss by … | procedure | tagged | Allocated Loss Adjustment Expense: “$$\text{ALAE Ratio} = \frac{\text{ALAE}}{\text{Indemnity}}$$” |
| The ILF with risk load at limit l equals (E[X;l](1+ALAE%) + risk load at l) divided by (E[X;b](1+ALAE%) + risk load at basic limit); the ri… | formula | tagged | Increased Limits: “$\text{ILF}(L) = \dfrac{\text{LAS}(L) + \text{ALAE}(L) + \text{ULAE}(L) + \text{RL}(L)}{\text{LAS}(…” |
| The ILF at the basic limit equals 1.000, with or without a risk load. | fact | tagged | Increased Limits: “so $\text{ILF}(B) = 1.000$ by construction and $\text{ILF}(L) > 1$ for $L > B$.” |
| The premium impact of a change in ILFs for a portfolio is the ratio of the exposure-weighted average ILF under the new method to that under… | procedure | missing |  |

</details>

<details><summary><code>cas8-2017-q8</code> · answerable</summary>

Tagged pages: Inflation, Layer of Insurance, Limited Expected Value, Frequency, Severity

| Item | Kind | Status | Where |
|---|---|---|---|
| Under a uniform severity inflation factor t applied to all claim sizes, the new severity variable is tX, so the probability of exceeding a … | fact | tagged | Inflation: “The second identity is the whole mechanism: inflating losses against a fixed deductible $d$ is equi…” |
| Frequency of claims in a layer (a, a+l) is measured as F(a+l) - F(a), or as S(a) if all claims exceeding the attachment point are counted; … | procedure | tagged | Layer of Insurance: “$E[N]\,S(a)$ claims are expected to reach the layer.” |
| Expected loss in a layer from a to b per claim is E[X;b] - E[X;a]; layer severity (per claim in the layer) is this divided by the probabili… | formula | tagged | Layer of Insurance: “Each pays on average $\left(E[X \wedge b] - E[X \wedge a]\right)/S(a)$.” |
| With inflation factor t, the next-year expected loss in the layer (a, b) per original claim is t(E[X;b/t] - E[X;a/t]), so the limited expec… | formula | tagged | Inflation: “$$E[(X' - d)_+] = (1+r)\,E\!\left[\left(X - \tfrac{d}{1+r}\right)_+\right]$$” |
| Pure premium equals frequency times severity, so the pure premium change factor is the product of the frequency change factor and the sever… | fact | tagged | Severity: “$$\text{Pure Premium} = \text{Frequency} \times \text{Severity}$$” |

</details>

<details><summary><code>cas8-2017-q9</code> · gap</summary>

Tagged pages: Experience Rating, Individual Risk Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| In the ISO CGL experience rating plan for a claims-made policy, the experience period consists of the most recent complete policy years end… | procedure | tagged | Experience Rating: “Experience rating is **prospective**: it uses a completed experience period (typically three years,…” |
| Company subject loss costs (expected basic limits losses) for each year equal basic limit premium times the expected loss ratio (ELR) times… | formula | missing |  |
| Premium adjustment factors (Table 13B for current-level/base adjustment and Table 13C by policy year) and detrend factors are looked up by … | procedure | missing |  |
| The credibility Z, expected experience ratio (EER), and maximum single loss (MSL) are looked up in the ISO experience rating tables using t… | procedure | missing |  |
| Actual losses for experience rating are the claim's indemnity limited to the basic limit plus ALAE, with the combined amount capped at the … | procedure | tagged | Experience Rating: “Losses are **capped** at a per-claim limit before entering $A$.” |
| Claims-made policies require no loss development (IBNR) in the actual experience ratio, so reported limited losses are used directly. | fact | missing |  |
| The actual experience ratio (AER) equals actual limited losses (plus any development) divided by the company subject loss costs. | formula | tagged | Experience Rating: “$A$ is the insured's actual losses over the experience period and $E$ the losses expected for a ris…” |
| The experience modification equals Z times (AER − EER) divided by EER, and the modified premium equals the manual premium times (1 + mod). | formula | tagged | Experience Rating: “$$M = Z \times \frac{A}{E} + (1 - Z)$$” |

</details>

<details><summary><code>cas8-2018-q10</code> · untagged</summary>

Tagged pages: Experience Rating, Limited Expected Value, Risk Experience, Expected Loss

| Item | Kind | Status | Where |
|---|---|---|---|
| Expected limited (reported) losses for each experience year equal expected ultimate loss, times the percent of losses limited (ratio of lim… | procedure | tagged | Risk Experience (collapsed): “Expected *ultimate* limited losses for a risk of its class and size are $\$200{,}000$, of which $55…” |
| The percent of losses limited at a cap equals the limited expected value at the cap divided by the unlimited expected value, i.e. 1 minus (… | formula | elsewhere | Excess Loss Development Factor: “Measured on the severity distribution at that maturity, $R^L_t = E[X \wedge L]/E[X]$ is the [[Loss …” |
| Trend each historical year's expected loss to the level of the prospective policy period, using the annual trend rate compounded over the n… | procedure | elsewhere | Loss Trend: “$$\text{Trend Factor} = (1 + t)^{n}$$” |
| Limited LDFs are factors to ultimate (not age-to-age), so expected losses at current development are obtained by dividing by the LDF applic… | fact | tagged | Risk Experience (collapsed): “Comparing immature actual losses with ultimate expected losses is wrong:” |
| Only complete or mature policy years prior to the experience rating effective date are included in the experience period; a policy year sti… | fact | tagged | Experience Rating: “it uses a completed experience period (typically three years, excluding the most recent, incomplete…” |
| Actual limited losses are found by capping each individual claim at the per-claim cap and summing the capped amounts across the experience … | procedure | tagged | Experience Rating: “Losses are **capped** at a per-claim limit before entering $A$.” |
| Experience modification factor = 1 + Z × (A − E)/E, where A is actual limited losses, E is expected limited losses, and Z is the credibilit… | formula | tagged | Experience Rating: “$$M = Z \times \frac{A}{E} + (1 - Z)$$” |

</details>

<details><summary><code>cas8-2018-q11</code> · gap</summary>

Tagged pages: Schedule Rating, Experience Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| The ISO CGL experience rating modification equals credibility Z times (actual experience ratio minus expected experience ratio) divided by … | formula | tagged | Experience Rating: “$$M = Z \times \frac{A}{E} + (1 - Z)$$” |
| Look up the credibility Z, expected experience ratio (EER), and maximum single loss in the plan's credibility and maximum single loss table… | procedure | missing |  |
| The ISO CGL experience period is the three completed policy years ending about six months before the policy effective date, so a 1/1/2020 p… | fact | tagged | Experience Rating: “Experience rating is **prospective**: it uses a completed experience period (typically three years,…” |
| Schedule rating gives no credit for characteristics already reflected in the experience rating, such as changes occurring before the experi… | fact | tagged | Schedule Rating: “Where [[Experience Rating\\|experience rating]] looks at what happened, schedule rating looks at cha…” |
| Under the ISO CGL plan, the maximum schedule credit for employee training is 6% and for a safety program is 2%, and the total schedule mod … | fact | missing |  |
| Assess a selected schedule credit by comparing it with the sum of the allowable maximum credits for applicable characteristics, reduced for… | procedure | tagged | Schedule Rating: “The filed schedule lists eligible categories with maximum credits and debits, and credits and debit…” |

</details>

<details><summary><code>cas8-2018-q12</code> · answerable</summary>

Tagged pages: Loss Sensitive Rating, Retrospective Rating, Large Deductible Policy, Self-Insured Retention

| Item | Kind | Status | Where |
|---|---|---|---|
| The expected total cost of an incurred loss retrospective rating plan can be computed as the guaranteed-cost-equivalent premium: (expected … | procedure | tagged | Loss Sensitive Rating (collapsed): “Their average is $\$875{,}500 = (250{,}000 + 600{,}000) \times 1.03$ — exactly the guaranteed-cost …” |
| Retro premium is built from basic premium (expenses, insurance charge, less excess loss) plus ratable (limited) losses times the loss conve… | procedure | tagged | Retrospective Rating: “$$R = \left(\text{BP} + L \times \text{LCF}\right) \times \text{TM}$$” |
| The up-front premium for a paid loss deductible plan covers the losses above the per-occurrence and aggregate deductible (expected unlimite… | procedure | tagged | Large Deductible Policy: “$$\text{Premium} = \frac{\text{Excess Losses} + \text{ALAE} + F + \text{CR} + \text{RM}}{1 - V - Q}…” |
| In a paid loss deductible plan, the insured reimburses the insurer for losses within the deductibles (expected losses limited by occurrence… | fact | tagged | Loss Sensitive Rating: “Reimbursements are not premium, so they escape premium tax.” |
| Compare loss-sensitive plans from the insured's perspective by the expected total cost, equal to premium plus expected deductible reimburse… | procedure | tagged | Large Deductible Policy (collapsed): “The insured's expected total outlay under the large deductible is $\$1{,}182{,}759 + \$1{,}800{,}00…” |
| Paid loss deductible plans offer the insured a cash flow advantage (lower upfront premium, delayed payment of losses) and tax savings on pr… | fact | tagged | Loss Sensitive Rating: “Reimbursements are not premium, so they escape premium tax.” |
| Insured-favorable modifications to a paid deductible plan include changing the per-occurrence or aggregate deductible (higher deductible lo… | fact | tagged | Large Deductible Policy: “to loss only, or to loss plus ALAE” |
| Insured-favorable modifications to an incurred retro plan include minimum/maximum ratable loss or premium limits, a retrospective developme… | fact | tagged | Retrospective Rating: “The **maximum** protects the insured against a bad year, the **minimum** protects the insurer again…” |

</details>

<details><summary><code>cas8-2018-q13</code> · untagged</summary>

Tagged pages: Inflation, Excess Insurance, Limited Expected Value, Frequency-Severity Models, Expected Loss, Frequency

| Item | Kind | Status | Where |
|---|---|---|---|
| The expected number of claims exceeding a deductible equals the expected ground-up claim count times the probability that a claim size exce… | fact | tagged | Expected Loss: “You can also count the claims that *reach* the layer, $E[N]\,[1 - F(a)]$, and multiply by their mea…” |
| For a Pareto distribution, the survival function is 1 - F(x) = (β/(x+β))^α and the mean is E[X] = β/(α-1) for α>1. | formula | elsewhere | Pareto Distribution: “$$F(x) = 1 - \left(\frac{\theta}{x + \theta}\right)^{\alpha}$$” |
| Expected aggregate losses in a layer excess of d equal expected ground-up claim count times the expected excess severity per ground-up clai… | formula | tagged | Expected Loss: “$$E[S_{(a,\,b]}] = E[N]\,\big(E[X \wedge b] - E[X \wedge a]\big)$$” |
| Under uniform inflation rate i, claim size becomes Y=(1+i)X, and the expected excess loss over a fixed deductible d is (1+i)(E[X] - E[X; d/… | fact | tagged | Inflation: “$$E[(X' - d)_+] = (1+r)\,E\!\left[\left(X - \tfrac{d}{1+r}\right)_+\right]$$” |
| To hold expected aggregate excess losses constant, set the claim count change factor equal to the reciprocal of the severity (excess loss) … | procedure | tagged | Expected Loss: “$$E[S_{(a,\,b]}] = E[N]\,\big(E[X \wedge b] - E[X \wedge a]\big)$$” |
| With Poisson claim counts and independent severity, the expected aggregate loss equals the expected claim count times the expected severity… | fact | tagged | Expected Loss: “$$E[S] = E[N]\,E[X]$$” |

</details>

<details><summary><code>cas8-2018-q14</code> · gap</summary>

Tagged pages: Retrospective Rating, Loss Sensitive Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| The retrospective premium formula is R = [B + c(E − I)] × T, where B is basic premium, c is the loss conversion factor, E is expected loss,… | formula | tagged | Retrospective Rating: “$$R = \left(\text{BP} + L \times \text{LCF}\right) \times \text{TM}$$” |
| The net insurance charge is the insurance charge at the maximum entry ratio minus the insurance savings at the minimum entry ratio, times e… | definition | tagged | Retrospective Rating: “The **net insurance charge** in the basic premium — the insurance charge for the maximum less the i…” |
| Convert the adjusted expected loss to the unadjusted expected loss by dividing by the state/hazard group differential, then use that expect… | procedure | missing |  |
| Basic premium as a ratio to standard premium is the basic premium dollar amount divided by standard premium; alternatively, derive expenses… | procedure | tagged | Retrospective Rating: “It is expressed as a basic premium factor times standard premium.” |
| Compute an empirical insurance charge from observed loss ratios: at entry ratio r, the charge is the average of max(0, loss ratio − r) over… | procedure | tagged | Loss Sensitive Rating: “The **Table M charge** $\phi(r) = \mathrm{E}[\max(A/E - r,\,0)]$ is the expected loss above $rE$ pe…” |
| Insurance charges from different sources must be compared on the same basis (dollars, percent of standard premium, or percent of expected l… | fact | missing |  |
| Using a prior carrier's loss experience to derive basic premium is generally inappropriate because of limited credibility and volatility of… | fact | linked | Experience Rating: “A small risk's mod stays near $1.0$ however good or bad its recent record, because a few claims say…” |

</details>

<details><summary><code>cas8-2018-q2</code> · gap</summary>

Tagged pages: Deductible Rating, Aggregate Loss Model, Credit Risk, Risk Loads, Expected Loss, Increased Limits

| Item | Kind | Status | Where |
|---|---|---|---|
| Expected aggregate loss equals expected claim frequency multiplied by expected severity (E[S] = E[N] × E[X]), with E[N] and E[X] computed a… | formula | tagged | Aggregate Loss Model: “$$E[S] = E[N] \cdot E[X]$$” |
| Premium equals expected loss divided by one minus the sum of the variable expense, commission, tax and profit percentages (expected loss ti… | formula | elsewhere | Permissible Loss Ratio: “$$\text{VPLR} = 1 - V - Q_T \quad \text{(variable permissible loss ratio)}$$” |
| Under a per-occurrence deductible, the insurer's expected loss is based on the severity net of the deductible on each claim (excess of the … | procedure | tagged | Deductible Rating: “$$\text{Deductible Relativity} = 1 - \text{LER}(d)$$” |
| Under an annual aggregate deductible, the insurer's expected loss is the expected amount by which annual aggregate losses exceed the deduct… | procedure | elsewhere | Aggregate Excess of Loss: “$$\phi(A) = \frac{E\left[(S - A)_+\right]}{E[S]}$$” |
| A franchise deductible pays the full loss amount if the loss exceeds the deductible and nothing if the loss is at or below it (no reduction… | definition | missing |  |
| With deductible programs the insurer pays losses and then seeks recovery from the insured, so credit risk equals the deductible amounts the… | fact | linked | Deductible Recovery: “That difference creates **credit risk**. The insurer has already paid the claimant; if the insured …” |
| Capital required to support a policy relates to the variability/risk of the insurer's retained losses; a per-occurrence deductible lowers t… | fact | linked | Risk Capital: “**Risk Capital** is the capital an insurer holds to absorb unexpected losses — outcomes worse than …” |
| Variance method risk-loaded ILF: the risk-loaded premium at limit L is E[loss at L] + k × Var[loss at L] (the loss expected at L plus a mul… | formula | tagged | Risk Loads: “$P = E[X] + k\,\text{Var}(X)$” |
| The variance of aggregate losses for a compound frequency-severity model is Var[S] = E[N]·Var[X] + Var[N]·E[X]², where severity is limited … | formula | tagged | Aggregate Loss Model: “$$\text{Var}(S) = E[N]\cdot\text{Var}(X) + \text{Var}(N)\cdot(E[X])^2$$” |

</details>

<details><summary><code>cas8-2018-q3</code> · gap</summary>

Tagged pages: Credibility, Exposure Base, Risk Experience

| Item | Kind | Status | Where |
|---|---|---|---|
| The credibility-weighted merit rating mod for a group is Mod = Z*R + (1 - Z), where R is the estimated relative frequency (complement of cr… | formula | tagged | Credibility: “$$\text{Estimate} = Z \times \text{Experience} + (1 - Z) \times \text{Complement}$$” |
| When no prior-year data are available, the relative claim frequency of the zero-claim-free-years (newly claim-involved) group under Poisson… | formula | missing |  |
| To put earned premium at a common (base group) rate level, divide each group's earned premium by its current merit rating factor to get pre… | procedure | missing |  |
| A group's indicated mod equals its relative frequency: the group's claims per unit of adjusted exposure (premium at base rates) divided by … | fact | linked | Classification Ratemaking: “$$\text{Relativity}_i = \frac{\text{Pure Premium}_i}{\text{Pure Premium}_{\text{base}}}$$” |
| Using earned premium as an exposure base corrects for maldistribution only if high-frequency (high-loss) classes or territories are also hi… | fact | missing |  |
| Earned premium as an exposure base also fails to correct for maldistribution when the rate differentials (e.g., territorial) are improper, … | fact | missing |  |

</details>

<details><summary><code>cas8-2018-q4</code> · answerable</summary>

Tagged pages: Rating Variable, Adverse Selection, Actuarial Standards of Practice

| Item | Kind | Status | Where |
|---|---|---|---|
| Adverse selection (antiselection) is the tendency of higher-risk individuals to seek or retain insurance or coverage options priced below t… | definition | tagged | Adverse Selection: “**Adverse Selection** is the tendency for those who know they are worse-than-average risks to buy m…” |
| A rating variable or discount that participants choose to adopt can be self-selected, so a classification plan should consider whether the … | fact | tagged | Rating Variable: “**Coverage options** (deductible, limit) are variables the insured *chooses*. Their factors belong …” |
| Under ASOP 12, a risk characteristic used in classification should have a relationship to expected outcomes (such as expected costs), which… | fact | tagged | Rating Variable: “It must be statistically related to expected losses; a causal story strengthens the case, but ASOP …” |
| ASOP 12 considers practical issues in selecting risk characteristics, including the practicality and cost of administering and verifying th… | fact | tagged | Rating Variable: “It should be objective and hard to manipulate, practical to collect and verify, and legal ([[Risk C…” |
| Monitor a classification or discount by flagging participants in policy data and comparing loss experience (e.g., loss ratios or a GLM clas… | procedure | tagged | Rating Variable: “*Benchmark:* compare against the current plan or a competing model, for example with a [[Double Lif…” |

</details>

<details><summary><code>cas8-2018-q5</code> · untagged</summary>

Tagged pages: Generalized Linear Model, Residual Plot, Model Fit

| Item | Kind | Status | Where |
|---|---|---|---|
| A partial residual plot shows the working residuals plus the fitted linear contribution of one predictor against that predictor, and is use… | definition | linked | Added Variable Plot: “A partial residual (component + residual) plot is the tool for choosing a transformation” |
| Binning a continuous predictor into groups and treating it as a categorical variable lets each bin have its own coefficient, so the fitted … | procedure | linked | Added Variable Plot: “if it is there, a quadratic term (or banding vehicle age) in the [[Model Structure]] would capture …” |
| A piecewise linear (hinge) function, built from terms like max(x - k, 0) with hinge points k, fits a separate slope on each segment of a co… | procedure | linked | Model Diagnostics: “Give it more flexibility there — a band for the largest values, a polynomial term, or a hinge that …” |
| Downsides of binning a continuous variable: it adds parameters (more degrees of freedom), leaves bins with less data and credibility and le… | fact | elsewhere | Categorical Predictor: “banding a continuous variable into categories trades smoothness for flexibility at the cost of extr…” |
| Downsides of piecewise linear (hinge) functions: the hinge points must be chosen manually or judgmentally (e.g., by visual inspection of th… | fact | elsewhere | Regression Spline: “You can place more knots where the function seems to change fastest, but in practice knots are usua…” |

</details>

<details><summary><code>cas8-2018-q6</code> · untagged</summary>

Tagged pages: Model Selection, AIC, BIC, Deviance, Statistical Significance, Model Fit

| Item | Kind | Status | Where |
|---|---|---|---|
| The deviance of a GLM is D = 2(ℓℓ_saturated − ℓℓ_model), and the scaled deviance is the deviance divided by the dispersion parameter. | formula | tagged | Deviance: “$$D = \phi\, D^*, \qquad D^* = \frac{D}{\phi}$$” |
| To compare nested GLMs with an F-test, compute F = (deviance of the smaller model − deviance of the larger model) / (number of added parame… | procedure | tagged | Deviance: “When $\phi$ is estimated, use $F = \dfrac{D_{\text{reduced}} - D_{\text{full}}}{\Delta p\,\hat\phi_…” |
| A polynomial of degree k in a variable adds k parameters to a GLM (one per power term), which gives the number of added parameters in neste… | fact | elsewhere | Polynomial Regression: “**Polynomial Regression** extends [[Linear Regression]] to a non-linear relationship by adding powe…” |
| AIC = −2·log-likelihood + 2p, where p is the number of parameters; the model with the lower AIC is preferred. | formula | tagged | Model Selection: “$$\hat{M} = \arg\min_{M} \left[-2\,\hat{\ell}_M + k\,p_M\right]$$” |
| BIC = −2·log-likelihood + p·ln(n), where n is the number of observations; the model with the lower BIC is preferred, and it penalizes extra… | formula | tagged | Model Selection: “$k = 2$ gives [[AIC]]; $k = \ln n$ gives [[BIC]], which penalizes more heavily once $n \geq 8$.” |
| Adding variables to a GLM always lowers the deviance (raises the log-likelihood), so deviance alone favors more complex models and leads to… | fact | tagged | Model Fit: “**Fit is not predictive power.** Adding any predictor lowers deviance. In-sample measures therefore…” |

</details>

<details><summary><code>cas8-2018-q7</code> · answerable</summary>

Tagged pages: Offset Variable, Logistic Regression, Link Function, Credit-Based Insurance Scoring

| Item | Kind | Status | Where |
|---|---|---|---|
| An offset is a predictor term with its coefficient fixed at 1 (not estimated), included in the linear predictor so that a previous model's … | definition | syllabus | Territorial Rating: “the last term is the **offset**: a predictor whose coefficient is fixed at 1, logged to put it on t…” |
| The logit link is g(μ)=ln(μ/(1−μ)); the offset for a logistic model built on prior fitted probabilities is the logit of those fitted probab… | formula | tagged | Offset Variable: “The offset must be on the **same scale as the linear predictor**: with a log link it is the *logged…” |
| To get a revised fitted value from a GLM with an offset, sum the offset, the intercept and coefficient×variable terms to form the linear pr… | procedure | tagged | Offset Variable: “\ln\mu_i = \ln(\text{Exposure}_i) + \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip}” |
| The inverse of the logit link is the logistic function μ=1/(1+e^(−η))=e^η/(1+e^η), where η is the linear predictor. | formula | tagged | Logistic Regression: “\pi = \frac{e^{\eta}}{1 + e^{\eta}} = \frac{1}{1 + e^{-\eta}}” |
| The logit function maps probabilities in (0,1) to outputs over (−∞,∞), while the logistic function maps any real input to outputs in (0,1). | fact | tagged | Logistic Regression: “the **logit** [[Link Function]] maps the probability $\pi \in (0,1)$ onto the whole real line, so t…” |
| Logistic regression suits probability modeling because the logistic function maps any linear predictor value on the real line into (0,1), t… | fact | tagged | Logistic Regression: “the **logit** [[Link Function]] maps the probability $\pi \in (0,1)$ onto the whole real line, so t…” |
| An offset is preferable to refitting all variables when an existing variable's effect is better determined outside the GLM or must stay unc… | fact | tagged | Offset Variable: “Offsets are also used to carry forward previously-determined relativities (e.g., an established ded…” |

</details>

<details><summary><code>cas8-2018-q8</code> · gap</summary>

Tagged pages: Risk Loads, Increased Limits

| Item | Kind | Status | Where |
|---|---|---|---|
| A risk-adjusted increased limit factor incorporates a risk load that grows with the policy limit (e.g., based on variance or standard devia… | definition | tagged | Risk Loads: “*standard deviation*: $P = E[X] + k\,\sigma(X)$ — the load scales with share, so a 50% share pays h…” |
| The standard ILF derivation assumes that expenses and the profit and contingency provision are a constant percentage of premium (variable) … | fact | tagged | Increased Limits: “Werner's indicated ILF is the ratio of losses and LAE at the two limits, assuming all underwriting …” |
| Premium equals (pure premium plus fixed expense) divided by (1 minus variable expense and profit/contingency provision); fixed expenses sho… | formula | linked | Profit and Contingency Provision: “$$\text{Rate} = \frac{\text{Pure Premium} + F}{1 - V - Q_T}$$” |
| Calculating a risk load for ILFs requires calibrating the risk constant k to the portfolio and computing the load for each limit, which is … | procedure | missing |  |
| A risk-adjusted ILF is mathematically grounded but its load is embedded in the pure premium and less visible to laypersons, whereas an expl… | fact | missing |  |

</details>

<details><summary><code>cas8-2018-q9</code> · answerable</summary>

Tagged pages: Experience Rating, Adverse Selection, Individual Risk Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| The efficiency test statistic (Fisher et al.) is the ratio of the variance of the standard (modified) loss ratios across quintiles to the v… | definition | linked | Rating Plan: “The **efficiency test** compares $\mathrm{Var}(\text{standard LR}) / \mathrm{Var}(\text{manual LR})…” |
| To perform the efficiency test, sort risks by experience mod (or by manual loss ratio), group them into quintiles with equal numbers of ris… | procedure | linked | Rating Plan: “Rank risks by mod and form five groups.” |
| Standard premium equals manual premium multiplied by the experience mod; the standard loss ratio is loss divided by standard premium, and t… | formula | tagged | Experience Rating: “$$\text{Modified Premium} = \text{Manual Premium} \times M$$” |
| Standard loss ratios that rise across quintiles indicate the plan gives too little credibility to experience (high-mod risks are undercharg… | fact | linked | Rating Plan: “Standard loss ratios falling as the mod rises mean too much credibility; rising means too little.” |
| Standard loss ratios that fall across quintiles indicate the plan gives too much credibility to experience (high-mod risks overcharged, low… | fact | linked | Rating Plan: “Standard loss ratios falling as the mod rises mean too much credibility; rising means too little.” |
| In a competitive market, an insurer whose experience rating plan misprices a group of risks suffers adverse selection: the overpriced risks… | fact | tagged | Adverse Selection: “**Adverse Selection** is the tendency for those who know they are worse-than-average risks to buy m…” |

</details>

<details><summary><code>cas8-2019-q1</code> · gap</summary>

Tagged pages: Credibility, Bühlmann Credibility, Classification Ratemaking, Correlation, Territorial Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| The multi-dimensional credibility estimate for a quantity is the complement of credibility (storm zone/overall) mean for that quantity plus… | formula | missing |  |
| The single-dimensional credibility estimate equals Z times the sector's observed mean plus (1 - Z) times the complement (storm zone) mean. | formula | tagged | Credibility: “$$\text{Estimate} = Z \times \text{Experience} + (1 - Z) \times \text{Complement}$$” |
| Multi-dimensional credibility assumes the frequencies of different types (e.g. storm types) are positively correlated, so experience in oth… | fact | syllabus | High Dimensional Variables: “Couret and Venter estimate each WC class's vector of claim frequencies by injury type with multi-di…” |
| In multi-dimensional credibility, a sector whose other-type frequencies exceed the zone's raises the estimate above the complement mean (po… | fact | missing |  |

</details>

<details><summary><code>cas8-2019-q10</code> · answerable</summary>

Tagged pages: Experience Rating, Credibility, Individual Risk Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| A quintile (decile) plot of experience rating performance groups risks by their experience mod and compares loss ratios across the groups; … | definition | linked | Rating Plan: “Rank risks by mod and form five groups. The *manual* loss ratio should rise with the mod, showing t…” |
| A well-performing experience rating plan produces standard loss ratios that are roughly flat across mod quintiles, because the mod then ful… | fact | linked | Rating Plan: “The *standard* (modified) loss ratio should be flat, showing the plan *corrects* for them.” |
| To evaluate a plan with no current experience rating, compare the standard loss ratios (with the mod) to the implied manual loss ratios (wi… | procedure | linked | Rating Plan: “Rank risks by mod and form five groups. The *manual* loss ratio should rise with the mod, showing t…” |
| Experience rating improves premium equity and reduces adverse selection, since without it worse-than-average risks are underpriced and bett… | fact | tagged | Individual Risk Rating: “It improves equity, strengthens the incentive for loss control, and makes more risks acceptable to …” |
| A residual upward trend in standard loss ratios across mod quintiles indicates the mod is giving too little credibility to the risk's own e… | fact | linked | Rating Plan: “Standard loss ratios falling as the mod rises mean too much credibility; rising means too little.” |
| The efficiency test statistic measures the remaining unexplained variation in standard loss ratios across quintiles, so a lower value indic… | fact | linked | Rating Plan: “The **efficiency test** compares $\mathrm{Var}(\text{standard LR}) / \mathrm{Var}(\text{manual LR})…” |
| To decide between a current and proposed experience rating plan, compare their quintile standard loss ratio charts for flatness and their e… | procedure | linked | Rating Plan: “The **efficiency test** compares $\mathrm{Var}(\text{standard LR}) / \mathrm{Var}(\text{manual LR})…” |

</details>

<details><summary><code>cas8-2019-q11</code> · answerable</summary>

Tagged pages: Experience Rating, Credibility, Individual Risk Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| The experience rating modification is Mod = Z*(A/E) + (1-Z), equivalently 1 + Z*(A-E)/E, where A is actual experience-period losses, E is e… | formula | tagged | Experience Rating: “$$M = Z \times \frac{A}{E} + (1 - Z)$$” |
| The standard loss ratio is the manual loss ratio divided by the experience rating mod (SLR = MLR / Mod), i.e. the loss ratio after the expe… | formula | linked | Rating Plan (collapsed): “The standard loss ratio is the manual loss ratio divided by the mod:” |
| An effective experience rating plan makes standard loss ratios more homogeneous across risks than manual loss ratios, so a standard loss ra… | fact | linked | Rating Plan: “The *standard* (modified) loss ratio should be flat, showing the plan *corrects* for them. Standard…” |
| Plan improvements include capping (limiting) individual claim losses so large claims do not unduly affect the mod, or reducing the credibil… | fact | tagged | Experience Rating: “Losses are **capped** at a per-claim limit before entering $A$.” |
| Compute the efficiency test statistic as the variance of standard loss ratios divided by the variance of manual loss ratios across risks; a… | procedure | linked | Rating Plan: “The **efficiency test** compares $\mathrm{Var}(\text{standard LR}) / \mathrm{Var}(\text{manual LR})…” |
| To show a plan change improves the plan, recompute the mod and standard loss ratio under the changed plan (e.g., with capped losses or new … | procedure | tagged | Experience Rating (collapsed): “Capping is what lets the mod respond to the signal (frequency) rather than the noise (one severity …” |
| The quintiles test is a qualitative test that groups risks by manual loss ratio and observes trends in standard loss ratios, rather than co… | fact | linked | Rating Plan: “Rank risks by mod and form five groups. The *manual* loss ratio should rise with the mod, showing t…” |

</details>

<details><summary><code>cas8-2019-q12</code> · gap</summary>

Tagged pages: Loss Sensitive Rating, Retrospective Rating, Aggregate Loss Model

| Item | Kind | Status | Where |
|---|---|---|---|
| The insurance charge φ(r) at entry ratio r is the expected excess aggregate loss above r times the average loss, expressed as a fraction of… | definition | tagged | Loss Sensitive Rating: “The **Table M charge** $\phi(r) = \mathrm{E}[\max(A/E - r,\,0)]$ is the expected loss above $rE$ pe…” |
| For a discrete aggregate loss distribution, the dollar insurance charge at retention x equals the sum over outcomes of max(L − x, 0) times … | formula | tagged | Loss Sensitive Rating (collapsed): “\phi(1.5) &= \frac{0 + 0 + 0 + 0 + 0.3}{5}” |
| The insurance charge is zero at a retention at or above the maximum possible aggregate loss, since no losses exceed it. | fact | missing |  |
| The insurance charge at a given entry ratio depends on the variability and shape of the aggregate loss (severity) distribution; more volati… | fact | tagged | Loss Sensitive Rating: “Table M is entered by risk size, because small risks have volatile entry ratios and therefore large…” |
| Applying a Table M to another line of insurance requires that line to have a similar expected risk size (or entry ratios to adjust for scal… | fact | tagged | Loss Sensitive Rating: “Table M is entered by risk size, because small risks have volatile entry ratios and therefore large…” |
| A Table M should reflect the limit structure (e.g. per-occurrence limits) of the business and be built from enough data to be credible; one… | fact | tagged | Loss Sensitive Rating: “A loss limit adds an excess-loss charge. The aggregate charge is then computed on *limited* losses …” |

</details>

<details><summary><code>cas8-2019-q13</code> · untagged</summary>

Tagged pages: Aggregate Loss Model, Layer of Insurance, Limited Expected Value, Severity Distribution, Expected Loss

| Item | Kind | Status | Where |
|---|---|---|---|
| For a layer of width L excess of attachment a, the expected aggregate loss equals expected claim count times (E[X; a+L] - E[X; a]), the dif… | formula | tagged | Layer of Insurance: “$$E[\text{layer loss}] = E[N]\left(E[X \wedge b] - E[X \wedge a]\right)$$” |
| For a shifted (Lomax) Pareto with parameters alpha and beta, E[X] = beta/(alpha-1) and E[X;d] = beta/(alpha-1) * (1 - (beta/(d+beta))^(alph… | formula | tagged | Limited Expected Value: “Pareto$(\alpha, \theta)$, $\alpha \neq 1$ \\| $\dfrac{\theta}{\alpha-1}\!\left[1 - \left(\dfrac{\the…” |
| For a shifted Pareto, the mean excess loss (mean residual life) is e_X(x) = (x+beta)/(alpha-1). | formula | linked | Pareto Distribution: “So the expected payment per payment is $E[X - d \mid X > d] = \frac{\theta + d}{\alpha - 1}$, which…” |
| Compute the unconditional expected claim count by weighting the conditional claim-count mean given at least one claim by the probability th… | procedure | elsewhere | Frequency Distribution: “so its mean is $1 - p_0^M$ times the zero-truncated mean” |
| Fitting an aggregate loss distribution to an excess layer is difficult because the expected claim count in the layer is small, so data is s… | fact | linked | Excess and Deductible Rating: “Few claims reach the upper layers, so pricing leans on fitted curves and industry data, and the tai…” |

</details>

<details><summary><code>cas8-2019-q14</code> · gap</summary>

Tagged pages: Retrospective Rating, Loss Sensitive Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| The insurance charge in a retrospective rating plan is I = [φ(r_G) − ψ(r_H)] × E(A), where φ(r_G) is the insurance charge at the maximum en… | formula | tagged | Loss Sensitive Rating: “$I = E[\phi(r_G) - \psi(r_H)]$ is the **net insurance charge**.” |
| Basic premium in a retrospective rating plan is B = e − (c − 1)×E(A) + c×I, where e is expenses, c is the loss conversion factor, and I is … | formula | tagged | Loss Sensitive Rating: “$$B = e - (c - 1)E + cI$$” |
| Insurance savings at entry ratio r relate to the insurance charge by ψ(r) = φ(r) + r − 1. | formula | tagged | Loss Sensitive Rating: “Always $\psi(r) = \phi(r) + r - 1$.” |
| Losses excess of a per-occurrence limit and the insurance charge for aggregate losses exceeding the maximum premium's loss limit overlap, b… | fact | tagged | Loss Sensitive Rating: “A loss limit adds an excess-loss charge. The aggregate charge is then computed on *limited* losses …” |
| A per-occurrence limit reduces the variance of the aggregate loss distribution and the likelihood of reaching the maximum premium, so the i… | fact | missing |  |
| Unlimited Table M charges apply only to unlimited aggregate losses; with a per-occurrence limit, a limited Table M (or Table L) must be use… | fact | tagged | Loss Sensitive Rating: “A loss limit adds an excess-loss charge. The aggregate charge is then computed on *limited* losses …” |

</details>

<details><summary><code>cas8-2019-q15</code> · gap</summary>

Tagged pages: Retrospective Rating, Severity Distribution, Limited Expected Value, Expenses

| Item | Kind | Status | Where |
|---|---|---|---|
| For a Pareto (shifted Pareto) distribution with parameters alpha and beta, the mean excess loss (excess severity) function e(d) = (d + beta… | fact | linked | Pareto Distribution: “So the expected payment per payment is $E[X - d \mid X > d] = \frac{\theta + d}{\alpha - 1}$, which…” |
| Fit Pareto parameters by regressing empirical excess severity on the limit and converting the fitted slope and intercept into alpha = 1 + 1… | procedure | elsewhere | Mean Excess Loss: “$e_X(d) = (d + \theta)/(\alpha - 1)$ for $\alpha > 1$, which increases linearly” |
| For a Pareto distribution, the limited expected value is E[X;L] = (beta/(alpha-1))(1 - (beta/(L+beta))^(alpha-1)) and the survival function… | formula | tagged | Limited Expected Value: “Pareto$(\alpha, \theta)$, $\alpha \neq 1$ \\| $\dfrac{\theta}{\alpha-1}\!\left[1 - \left(\dfrac{\the…” |
| Expected aggregate losses excess of a per-occurrence limit equal expected claim count times expected excess severity (E[X] - E[X;L], or S(L… | procedure | linked | Expected Loss: “$$E[S_{(a,\,b]}] = E[N]\,\big(E[X \wedge b] - E[X \wedge a]\big)$$” |
| Retrospective rating basic premium = fixed expenses + underwriting profit load on expected excess loss + loss conversion factor times expec… | formula | tagged | Retrospective Rating: “**Basic premium (BP)** covers the insurer's non-LAE expenses, profit, and the **net insurance charg…” |
| Retrospective premium = (basic premium + loss conversion factor × actual limited losses) × tax multiplier, where tax multiplier = 1/(1 − co… | formula | tagged | Retrospective Rating: “$$R = \left(\text{BP} + L \times \text{LCF}\right) \times \text{TM}$$” |
| A high R² and close visual fit support fitting a linear excess severity line for a Pareto, but the regression slope is sensitive to the few… | fact | missing |  |

</details>

<details><summary><code>cas8-2019-q16</code> · gap</summary>

Tagged pages: Loss Sensitive Rating, Large Deductible Policy, Retrospective Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| The entry ratio r is a risk's aggregate (limited) loss divided by the expected aggregate (limited) loss per risk, so r = A_D / E(A_D). | definition | tagged | Loss Sensitive Rating: “- $A$ is the actual aggregate (ratable) loss, $E = \mathrm{E}[A]$ its expected value, and $r = A/E$…” |
| The insurance charge φ(r) is the expected excess of aggregate loss over r times expected loss, expressed as a fraction of expected loss; it… | definition | tagged | Loss Sensitive Rating: “The **Table M charge** $\phi(r) = \mathrm{E}[\max(A/E - r,\,0)]$ is the expected loss above $rE$ pe…” |
| Construct an empirical Table M by computing each risk's entry ratio, then at each entry ratio setting φ(r) = φ(next higher r) + (r_next − r… | procedure | tagged | Loss Sensitive Rating: “The **Table M charge** $\phi(r) = \mathrm{E}[\max(A/E - r,\,0)]$ is the expected loss above $rE$ pe…” |
| A Limited Loss Table M is built from losses limited by a per-occurrence limit, with entry ratios based on expected limited losses, and the … | fact | tagged | Loss Sensitive Rating: “A loss limit adds an excess-loss charge. The aggregate charge is then computed on *limited* losses …” |
| A guaranteed cost policy has a fixed premium known at inception, giving stable cash flow, but it does not adjust for good loss experience a… | fact | missing |  |
| A large dollar deductible policy has the insured reimburse losses within the deductible per occurrence, which lowers premium (and premium t… | fact | tagged | Loss Sensitive Rating: “*Large deductible:* the insurer pays every claim and bills the deductible back. It must have a per-…” |
| A retrospectively rated policy adjusts the final premium to actual losses subject to minimum and maximum limits (aggregate cap), rewarding … | fact | tagged | Retrospective Rating: “**Retrospective Rating** adjusts a policy's premium *after* the period, based on the insured's own …” |

</details>

<details><summary><code>cas8-2019-q2</code> · gap</summary>

Tagged pages: Lift, Quantile Plot, Double Lift Chart, Model Selection, Model Benchmarking

| Item | Kind | Status | Where |
|---|---|---|---|
| To build a loss ratio plot, sort observations by the model's predicted value (e.g., predicted loss cost) in ascending order, group them, an… | procedure | tagged | Model Benchmarking: “The **loss ratio chart**: sort on predicted loss cost divided by current premium. A flat actual los…” |
| A loss ratio plot assesses lift, i.e., how well a model differentiates good and bad risks (an upward trend in actual loss ratio across sort… | fact | tagged | Model Benchmarking: “The **loss ratio chart**: sort on predicted loss cost divided by current premium. A flat actual los…” |
| A simple quintile plot sorts observations by model-predicted value into five groups of roughly equal exposure and plots the average predict… | definition | tagged | Quantile Plot: “A **quantile plot** (or lift chart by predicted quantile) sorts a held-out dataset by predicted los…” |
| A double lift chart sorts observations by the ratio of one model's prediction to another model's prediction, groups them, and plots each mo… | definition | tagged | Double Lift Chart: “A **double lift chart** compares two candidate models directly by sorting the data on the *ratio* o…” |
| Drawbacks of validation plots: quintile plots need separate plots per model and may be skewed by uneven risk sizes; double lift charts are … | fact | missing |  |
| Loss ratios used in validation must use on-level earned premium when rate changes have been implemented; otherwise the loss ratio plot can … | fact | elsewhere | On Level Premium: “**On-Level Premium** is historical earned premium restated as though every policy had been written …” |

</details>

<details><summary><code>cas8-2019-q3</code> · untagged</summary>

Tagged pages: Credibility, Experience Rating, Negative Binomial Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| For a negative binomial distribution with parameters r and p (in the form where the mean is rp/(1-p)), the mean equals rp/(1-p), which is s… | formula | tagged | Negative Binomial Distribution: “$E[Y] = r(1-p)/p$” |
| For a negative binomial with parameters r and p, the probability of zero claims is Pr(N=0) = (1-p)^r. | formula | elsewhere | Frequency Distribution: “\\| Neg. binomial $(r, \beta)$ \\| $(1+\beta)^{-r}$ \\| $\frac{\beta}{1+\beta}$ \\| $\frac{(r-1)\beta}{…” |
| The expected claim frequency of risks with at least one claim relative to the overall expected frequency is R = 1/(1 - Pr(N=0)), i.e. E(N \… | formula | elsewhere | Frequency Distribution: “A zero-truncated distribution has $p_0^T = 0$ and $p_k^T = p_k/(1 - p_0)$.” |
| The experience modification factor for a group is Mod = Z × R + (1 − Z), where Z is the credibility of the group and R is the group's expec… | formula | tagged | Experience Rating: “$$M = Z \times \frac{A}{E} + (1 - Z)$$” |
| Credibility of experience rating depends not only on the volume of data (claims, exposures) but also on the variation in individual risk ha… | fact | tagged | Credibility: “Credibility rises when risks genuinely differ from one another (large VHM) and falls when individua…” |
| Experience rating is meant to distinguish individual risks within a class, so in a homogeneous or well-defined class with little variation … | fact | syllabus | Risk Experience: “because the mod measures only how far the record shows the risk to differ from others in its [[Rati…” |

</details>

<details><summary><code>cas8-2019-q5</code> · untagged</summary>

Tagged pages: AUROC, Confusion Matrix, Logistic Regression, Link Function

| Item | Kind | Status | Where |
|---|---|---|---|
| The logit link, g(μ)=ln(μ/(1−μ)), is appropriate for a GLM with a binary target because its inverse, the logistic function, maps any linear… | fact | tagged | Logistic Regression: “the **logit** [[Link Function]] maps the probability $\pi \in (0,1)$ onto the whole real line, so t…” |
| In a classification model, an observation is predicted positive when its modeled probability exceeds the discrimination threshold, converti… | fact | elsewhere | Model Training and Evaluation: “A [[Logistic Regression\\|logistic]] or [[Classification Tree\\|tree]] model gives a probability; a *…” |
| A confusion matrix tabulates actual versus predicted outcomes, giving true positives, false negatives, false positives, and true negatives. | definition | tagged | Confusion Matrix: “A **confusion matrix** cross-tabulates predicted class against actual class for a classifier, and i…” |
| Sensitivity (true positive rate) = true positives / (true positives + false negatives), the proportion of actual positives predicted positi… | formula | tagged | AUROC: “\text{TPR} = \frac{\text{TP}}{\text{TP} + \text{FN}}” |
| Specificity (true negative rate) = true negatives / (true negatives + false positives); the false positive rate equals 1 − specificity. | formula | tagged | AUROC: “\text{FPR} = \frac{\text{FP}}{\text{FP} + \text{TN}}” |
| An ROC curve plots sensitivity (y-axis) against 1 − specificity (x-axis) across discrimination thresholds; a threshold of 100% gives the po… | procedure | tagged | AUROC: “**ROC Curve**: plot of **True Positive Rate (Sensitivity)** vs. **False Positive Rate (1 − Specific…” |
| A model with no predictive power has an ROC curve along the 45-degree diagonal from (0,0) to (1,1), while a perfect model's ROC curve rises… | fact | tagged | AUROC: “No predictive power: the ROC curve follows the line of equality \\| \\| 1.0 \\| A perfect model: the R…” |
| When claims are more severe, the threshold should be lowered, since the cost of missing a fraudulent claim outweighs the cost of investigat… | fact | tagged | Confusion Matrix: “The two errors rarely cost the same: a missed fraud and a wrongly investigated honest claim have di…” |

</details>

<details><summary><code>cas8-2019-q6</code> · gap</summary>

Tagged pages: Variable Transformation, Interaction, Generalized Linear Model, Link Function

| Item | Kind | Status | Where |
|---|---|---|---|
| With a log link, the GLM predicted value is the exponential of the linear predictor (intercept plus coefficients times variable values), so… | fact | tagged | Generalized Linear Model: “The **log link makes the model multiplicative**, so $e^{\beta}$ is a relativity and the fitted coef…” |
| To compute a fitted value, include a categorical level's coefficient only when the level applies (base level contributes zero), and include… | procedure | tagged | Interaction: “For sports cars ($x_2 = 1$), one more year of age changes $\eta$ by $\hat{\beta}_1 + \hat{\beta}_3 …” |
| The relativity between two risks under a log-link GLM is the exponential of the difference in their linear predictors, so terms common to b… | fact | tagged | Link Function (collapsed): “With a log link, $\ln(\mu_{\text{sports}}) - \ln(\mu_{\text{non-sports}}) = 0.35$, so $\mu_{\text{s…” |
| To center a continuous predictor at its base level, add the predictor's main-effect coefficient times the base value (here ln of base AOI) … | procedure | missing |  |
| After centering at base levels, the intercept represents the predicted value (base rate) for a risk at all base levels, making it directly … | fact | missing |  |
| Centering makes coefficients of variables involved in interactions more intuitive, avoiding counterintuitive signs (e.g., a positive sprink… | fact | missing |  |

</details>

<details><summary><code>cas8-2019-q7</code> · gap</summary>

Tagged pages: Experience Rating, Loss Elimination Ratio, Loss Sensitive Rating, Facultative Reinsurance, Expected Loss

| Item | Kind | Status | Where |
|---|---|---|---|
| For a shifted Pareto severity with parameters alpha and beta, the mean is beta/(alpha-1) and the limited expected value at x is beta/(alpha… | formula | elsewhere | Pareto Distribution: “E[X \wedge x] = \frac{\theta}{\alpha - 1}\left[1 - \left(\frac{\theta}{x + \theta}\right)^{\alpha -…” |
| The loss elimination ratio at limit x is E[X;x]/E[X], the share of unlimited expected loss that falls below the per-claim cap; it converts … | definition | tagged | Loss Elimination Ratio: “\text{LER}(d) = \frac{E[X \wedge d]}{E[X]}” |
| To compute expected experience-period losses for an experience rating mod, bring the prospective expected limited ultimate loss back to eac… | procedure | syllabus | Risk Experience (collapsed): “Put both at the same maturity, or complete the actual losses with the expected unreported:” |
| Select experience period policy years for the mod: use the most recent three years of data excluding the latest immature year (lagged one y… | procedure | tagged | Experience Rating: “it uses a completed experience period (typically three years, excluding the most recent, incomplete…” |
| Actual experience losses for the mod are reported losses with each individual claim capped at the per-claim limit (replacing each excess cl… | procedure | tagged | Experience Rating: “Losses are **capped** at a per-claim limit before entering $A$.” |
| Experience mod = 1 + Z*(A/E - 1), equivalently (A + K)/(E + K) with K = E(1-Z)/Z, where A is actual limited reported loss and E is expected… | formula | tagged | Experience Rating: “M = Z \times \frac{A}{E} + (1 - Z)” |
| Guaranteed cost premium = expected loss including LAE load divided by (1 minus the sum of variable expense provisions: taxes, acquisition, … | formula | elsewhere | Permissible Loss Ratio: “\text{PLR} = 1 - V - F\% - Q_T \quad \text{(total permissible loss ratio)}” |
| Trending and developing experience losses to the prospective level instead of detrending/undeveloping the expected losses gives equal weigh… | fact | missing |  |
| Using Table M for an aggregate excess cover: compute the entry ratio as the attachment (or limit) divided by expected aggregate loss, find … | procedure | tagged | Loss Sensitive Rating: “The **Table M charge** $\phi(r) = \mathrm{E}[\max(A/E - r,\,0)]$ is the expected loss above $rE$ pe…” |

</details>

<details><summary><code>cas8-2019-q8</code> · untagged</summary>

Tagged pages: Increased Limits, Layer of Insurance, Limited Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The increased limits factor for limit L is ILF(L) = E[X; L] / E[X; basic limit], the ratio of limited expected severity at L to that at the… | formula | tagged | Increased Limits: “$$\text{ILF}(L) = \frac{E[X \wedge L]}{E[X \wedge B]}$$” |
| Expected loss for a basic limit is scaled to any limit by multiplying by the ILF; expected loss in a layer (deductible d, limit L above it)… | procedure | tagged | Increased Limits: “$$\text{Layer } (M, L] \text{ cost} = \text{Basic LC} \times \left[\text{ILF}(L) - \text{ILF}(M)\ri…” |
| Layer expected loss can equal expected frequency times the layer severity E[X; d+L] - E[X; d], where frequency is expected basic-limit loss… | fact | tagged | Layer of Insurance: “$$E[\text{layer loss}] = E[N]\left(E[X \wedge b] - E[X \wedge a]\right)$$” |
| Loss adjustment expenses are loaded onto indemnity: ALAE is a percentage of indemnity, and ULAE is a percentage of indemnity plus ALAE, so … | procedure | elsewhere | Loss and Loss Adjustment Expense: “applied to loss plus ALAE that has been adjusted for extraordinary events, development and trend.” |
| Premium = expected loss and LAE / (1 − variable expense ratio − risk load − profit load), with expense and profit loads taken as percentage… | formula | elsewhere | Permissible Loss Ratio: “$$\text{PLR} = 1 - V - F\% - Q_T \quad \text{(total permissible loss ratio)}$$” |

</details>

<details><summary><code>cas8-2019-q9</code> · answerable</summary>

Tagged pages: Experience Rating, Variance of Hypothetical Means, Expected Value of Process Variance, Credibility

| Item | Kind | Status | Where |
|---|---|---|---|
| The expected value of process variance (EVPV) is the average, across risks in a class, of the variance of each risk's own loss outcomes, me… | definition | tagged | Expected Value of Process Variance: “The **expected value of the process variance (EPV)**, written $v$, is the average within-risk varia…” |
| The variance of hypothetical means (VHM) is the variance across risks of each risk's expected loss, measuring how much the true risk levels… | definition | tagged | Variance of Hypothetical Means: “The **variance of the hypothetical means (VHM)**, written $a$, is the between-risk variance in a [[…” |
| Buhlmann credibility is Z = n/(n+k), where k = EVPV/VHM. | formula | tagged | Expected Value of Process Variance: “- Together with the [[Variance of Hypothetical Means]] $a$ it fixes the Bühlmann constant $k = v/a$…” |
| A higher VHM raises credibility (lower k) and a higher EVPV lowers credibility (higher k), so experience is more credible when risks differ… | fact | tagged | Variance of Hypothetical Means: “- **Large $a$** means the risks are genuinely heterogeneous, so a risk's own experience is worth a …” |
| Experience rating is more useful when the credibility of an individual risk's experience is higher, i.e., when a class is heterogeneous (hi… | fact | tagged | Experience Rating: “A small risk's mod stays near $1.0$ however good or bad its recent record, because a few claims say…” |

</details>

<details><summary><code>cas8-an-001</code> · answerable</summary>

Tagged pages: Rate Class Validity, Rating Class, Statistical Significance

| Item | Kind | Status | Where |
|---|---|---|---|
| Model stability is the sensitivity of a GLM's results (e.g., relativities) to changes in the underlying data, such as removing or adding a … | definition | tagged | Rate Class Validity: “The classic failure is one unusually large loss in a class with few members. With it, the model say…” |
| Cook's distance measures the influence of an individual record on the fitted model by quantifying how much the parameter estimates change w… | formula | syllabus | Model Fit: “Influential records (high Cook's distance) and estimates that swing across cross-validation folds o…” |
| A class with few policies and a single large loss can have its relativity driven by that one record, so the estimate is unstable and does n… | fact | tagged | Rate Class Validity: “The classic failure is one unusually large loss in a class with few members.” |
| Statistical significance (a low p-value) is computed on the data that produced it and does not guarantee validity or stability; one influen… | fact | tagged | Rate Class Validity: “**Significance is necessary, not sufficient.** A class coefficient's [[Statistical Significance\\|si…” |
| Remedies for unstable estimates in thin classes include gathering more data, credibility-weighting toward a broader group, and capping or l… | procedure | tagged | Rating Class: “Raw class averages over-react, because next period regresses toward the mean. Group averages ignore…” |
| If only one class's relativity changes when an influential record is removed while other classes' relativities barely change, the problem i… | fact | tagged | Rate Class Validity: “The classic failure is one unusually large loss in a class with few members.” |

</details>

<details><summary><code>cas8-an-002</code> · answerable</summary>

Tagged pages: Rate Class Validity, Credibility, Homogeneity, Complement of Credibility

| Item | Kind | Status | Where |
|---|---|---|---|
| ASOP No. 12 says risk classes should be large enough to allow credible statistical inferences, and when data are insufficient for credible … | fact | tagged | Rate Class Validity: “Classes should be large enough for credible inferences. When the data are thin, the actuary balance…” |
| Adding more classes never worsens fit on the data used to estimate them (overfitting to noise), so better in-sample fit does not show that … | fact | tagged | Rate Class Validity: “More classes always fit the modelling data better, so the comparison must use a holdout.” |
| Validate a class split by testing whether it predicts data not used in fitting (e.g., a holdout sample or later period) better than the coa… | procedure | tagged | Rate Class Validity: “A finer set of classes is only worth having if it predicts the holdout better than a coarser one.” |
| In lasso credibility, the complement receives full credibility for a segment in two cases: the segment has enough data but experience too s… | fact | tagged | Rate Class Validity: “A class penalised back to its complement either has plenty of data that agrees with the complement,…” |

</details>

<details><summary><code>cas8-an-003</code> · answerable</summary>

Tagged pages: Model Implementation, Rating Plan

| Item | Kind | Status | Where |
|---|---|---|---|
| A rating plan may include factors that were not in the GLM because no data existed on them (e.g., a newly offered discount); such factors m… | fact | tagged | Model Implementation: “A factor that is in the plan but not in the model (a new safe-driving discount, say) may overlap va…” |
| A model's predictive accuracy decays as conditions change, so it should be rebuilt periodically, and between rebuilds it can be refreshed w… | fact | tagged | Model Implementation: “A model's accuracy decays as the world changes. It should be **refreshed** (recalibrated on newer d…” |
| A rating plan must be clear and understandable, with no ambiguity in risk classification, regardless of how finely the underlying model was… | fact | tagged | Model Implementation: “The plan must be clear, leaving no ambiguity about which class a risk falls in.” |

</details>

<details><summary><code>cas8-an-004</code> · gap</summary>

Tagged pages: Model Implementation, Deductible Rating, Offset Variable, Loss Elimination Ratio

| Item | Kind | Status | Where |
|---|---|---|---|
| In a GLM, a higher deductible can receive a factor above 1.00 because of selection: insureds with a high appetite for risk choose high dedu… | fact | tagged | Model Implementation: “Insureds who choose high deductibles may have a greater appetite for risk, or underwriters may have…” |
| A factor that predicts well or is statistically significant on the current book should not be used as a coverage option price if it reflect… | fact | tagged | Model Implementation (collapsed): “The GLM predicts well for the existing book, but a deductible factor that departs from pure loss el…” |
| Estimate factors for coverage options such as deductibles, increased limit factors and peril groups outside the GLM using traditional loss … | procedure | tagged | Model Implementation: “Coverage options (deductibles, [[Increased Limits\\|increased limits]], peril groups) should be pric…” |
| A higher deductible eliminates losses, so a deductible warrants a credit relative to a lower deductible; ignoring the deductible or chargin… | fact | tagged | Deductible Rating: “The rate credit is derived from the [[Loss Elimination Ratio\\|loss elimination ratio]] — the share …” |
| In a severity model a deductible removes many small claims, so average claim size rises with the deductible; a positive severity coefficien… | fact | missing |  |

</details>

<details><summary><code>cas8-an-005</code> · gap</summary>

Tagged pages: Vehicle Make and Model, High Dimensional Variables, Credibility

| Item | Kind | Status | Where |
|---|---|---|---|
| In a single-feature Gaussian identity-link penalized (ridge-type) regression on a high-cardinality categorical feature, the coefficient for… | formula | missing |  |
| The predicted value for a level in a single-feature penalized regression equals the overall mean (intercept) plus the shrunk level coeffici… | procedure | missing |  |
| The shrinkage in single-feature Gaussian penalized regression is equivalent to a credibility estimate, with credibility weight Z = n_k/(n_k… | fact | tagged | High Dimensional Variables: “Elastic net and ridge penalties ([[Regularization]]) shrink in a similar way.” |

</details>

<details><summary><code>cas8-an-006</code> · answerable</summary>

Tagged pages: Vehicle Make and Model, High Dimensional Variables, Cross-Validation

| Item | Kind | Status | Where |
|---|---|---|---|
| Target (mean) encoding replaces a high-cardinality categorical variable with a single numeric feature equal to the (credibility-shrunk) mea… | definition | tagged | High Dimensional Variables: “$\bar{R}_j$ is level $j$'s own indicated relativity, net of the other rating variables. $C_j$ is it…” |
| Leakage occurs when the model is given the target, or part of it, during training through a feature, so that performance estimates are over… | definition | tagged | Cross-Validation: “Every step that touches the response — [[Variable Selection]], banding a variable by its indicated …” |
| A target encoding computed from the full training set includes each record's own outcome, so for levels with few observations the encoding … | fact | linked | Territorial Rating: “They warn of **leakage**: if the first stage's prediction for a record was fitted having seen that …” |
| Cross-validation gives overly favorable results when the encoded feature was built using the validation folds' own outcomes, while performa… | fact | tagged | Cross-Validation: “Every step that touches the response — [[Variable Selection]], banding a variable by its indicated …” |
| Out-of-fold encoding: for observations in each fold, compute the target encoding using only the observations in the other folds. | procedure | tagged | Cross-Validation: “The correct procedure repeats the screening **inside each fold**, selecting from the $200$ using on…” |
| One-hot encoding thousands of levels in an unpenalized GLM yields unreliable coefficients for levels with few observations, which is the re… | fact | tagged | High Dimensional Variables: “A GLM gives each level the estimate that best fits its own data, whatever the volume, so thin level…” |
| The shrinkage parameter lambda in credibility-weighted encoding may be chosen by cross-validation and can generalize better than the theore… | fact | tagged | Cross-Validation: “Every step that touches the response — [[Variable Selection]], banding a variable by its indicated …” |

</details>

<details><summary><code>cas8-an-007</code> · untagged</summary>

Tagged pages: Line of Business, Large Deductible Policy, Loss Sensitive Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| A large deductible policy makes the insured retain losses up to the per-occurrence deductible on each claim, with the insurer paying the ex… | definition | linked | Deductible Rating: “**Deductible Rating** is the pricing of policies under which the insured retains the first $d$ doll…” |
| Clash coverage limits what an insured retains from a single occurrence that triggers retentions on more than one line of business, by setti… | definition | elsewhere | Clash Cover: “It is penetrated when several policies (or lines) are involved in the same occurrence, when extra-c…” |
| To find the retained loss with clash coverage, first apply each line's deductible separately to get retained losses, sum them, then cap the… | procedure | linked | Self-Insured Retention: “$$\text{Retained Loss} = \sum_i \min(X_i, R)$$” |

</details>

<details><summary><code>cas8-an-008</code> · answerable</summary>

Tagged pages: Risk, Experience Rating, Rating Class

| Item | Kind | Status | Where |
|---|---|---|---|
| The experience modification is a factor applied to manual premium (standard premium = mod × manual premium) that adjusts an insured's premi… | definition | tagged | Experience Rating: “The output is an **experience modification factor** (mod): above $1.0$ for worse-than-expected expe…” |
| A mod above 1.0 (debit) or below 1.0 (credit) estimates that the risk's expected future losses are above or below the average risk in its c… | fact | tagged | Experience Rating: “A mod is therefore a **relative** measure: it says how this risk compares with the average risk alr…” |
| Experience rating is a prospective estimate of future loss potential, not a means of charging back or recovering past losses. | fact | tagged | Experience Rating: “Experience rating is **prospective**: it uses a completed experience period (typically three years,…” |
| A debit mod does not mean the risk is a 'bad' risk to be non-renewed; it only reflects that the risk's expected losses are higher than its … | fact | tagged | Risk: “Fisher et al. explain that an experience mod "merely indicates the risk's expected loss relative to…” |
| The mod is not the ratio of actual to expected losses because the experience is given only partial credibility; the mod is a credibility-we… | fact | tagged | Experience Rating: “$$M = Z \times \frac{A}{E} + (1 - Z)$$” |
| The class rate is set for the average risk in the class, and the mod adjusts an individual insured within the class rather than changing th… | fact | tagged | Experience Rating: “A mod is therefore a **relative** measure: it says how this risk compares with the average risk alr…” |

</details>

<details><summary><code>cas8-an-009</code> · answerable</summary>

Tagged pages: Insurance Policy, Retrospective Rating, Loss Sensitive Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| Retrospective premium = (basic premium + loss conversion factor × ratable losses) × tax multiplier. | formula | tagged | Retrospective Rating: “$$R = \left(\text{BP} + L \times \text{LCF}\right) \times \text{TM}$$” |
| The retrospective premium is bounded by the plan's minimum and maximum retrospective premiums: if the formula result falls below the minimu… | fact | tagged | Retrospective Rating: “$$\text{Retro Premium} = \min\!\left(\max(R,\, R_{\min}),\, R_{\max}\right)$$” |
| On an incurred loss retrospective plan, losses are first evaluated six months after policy expiration and then annually thereafter, with th… | fact | tagged | Insurance Policy: “For incurred loss retrospective plans, Fisher et al. say losses are *typically* first evaluated six…” |
| The additional or return premium at a given adjustment equals the newly computed retrospective premium minus the retrospective premium alre… | procedure | tagged | Insurance Policy: “$R_1$ falls between the minimum and maximum, so the insurer **returns** $125{,}000 - 111{,}280 = \$…” |

</details>

<details><summary><code>cas8-an-010</code> · answerable</summary>

Tagged pages: Reasonableness Testing, Increased Limits, Layer of Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| The premium for a layer equals the basic limit premium times the difference between the increased limit factors at the layer's upper and lo… | formula | tagged | Increased Limits: “$$\text{Layer } (M, L] \text{ cost} = \text{Basic LC} \times \left[\text{ILF}(L) - \text{ILF}(M)\ri…” |
| For layers of equal width, expected loss and hence premium should decrease as the attachment point rises, so the lowest excess layer is the… | fact | tagged | Increased Limits: “So the *marginal* indemnity cost per dollar of additional limit must not increase as the limit rise…” |
| A set of increased limit factors is consistent if the second derivative of the factor with respect to the limit is negative at every limit,… | definition | tagged | Increased Limits: “So the *marginal* indemnity cost per dollar of additional limit must not increase as the limit rise…” |
| Increased limit factors built from expected losses under a continuous claim-size density and reasonable distributions are always consistent… | fact | tagged | Increased Limits: “So the *marginal* indemnity cost per dollar of additional limit must not increase as the limit rise…” |
| Factors that merely increase with the limit are necessary but not sufficient for reasonableness; the increments must also decline as the li… | fact | tagged | Increased Limits: “So the *marginal* indemnity cost per dollar of additional limit must not increase as the limit rise…” |

</details>

<details><summary><code>cas8-an-011</code> · gap</summary>

Tagged pages: Reasonableness Testing, Loss Sensitive Rating, Expected Loss

| Item | Kind | Status | Where |
|---|---|---|---|
| To check consistency of assumptions in a loss-sensitive pricing model, add the predicted primary, per-occurrence excess and aggregate exces… | procedure | missing |  |
| Primary, per-occurrence excess and aggregate excess losses are layers of the same total loss, so their sum should reasonably match the tota… | fact | tagged | Expected Loss (collapsed): “The total is $\$1{,}200{,}000 = 12 \times E[X]$.” |
| A rating bureau's pure premium is sometimes loaded with non-loss items such as loss adjustment expense and loss-based assessments, so it ca… | definition | elsewhere | Pure Premium: “is expected loss and LAE per unit of exposure — the portion of the rate that pays claims, before an…” |
| Applying unadjusted bureau excess factors, which are ratios to the bureau pure premium, to a loss-only estimate that excludes items in the … | fact | missing |  |

</details>

Nothing here edits the vault. A gap is fixed from the syllabus reading, in general form — never by copying the question's own numbers onto the page — and the edited page is fact checked again (docs/verification.md).
