# Answerability: Exam 5 (CAS)

Run `answerability-20261031-5` · 357 questions checked of 357 attempted · cost $44.19

Each question's official solution was broken into the knowledge it uses (by a model that saw no study page), and each item was looked for on the pages the vault gives for the question. An item counts as taught only if a quote of the teaching passage is really on the page; the check is done in code. *Answerable* is necessary, not sufficient: a page can hold the formula and still not teach it well.

| Verdict | Questions | Share |
|---|---|---|
| **Answerable** — everything taught on a tagged page, one link away, on the exam's syllabus or on a prerequisite exam's page | 202 | 57% |
| **Untagged** — everything is in the vault, but some of it on a page neither tagged nor linked | 32 | 9% |
| **Gap** — something the solution uses is taught on no page | 123 | 34% |

Requirements: 2320 — tagged 1665 (72%), linked 272 (12%), syllabus 91 (4%), prerequisite 0 (0%), elsewhere 98 (4%), missing 194 (8%)

## By sitting

A paper whose gaps far outrun the rest may test a reading the syllabus has since dropped.

| Sitting | Questions | Answerable | Untagged | Gap |
|---|---|---|---|---|
| Fall 2013 | 24 | 11 | 4 | 9 (38%) |
| Fall 2014 | 24 | 12 | 1 | 11 (46%) |
| Fall 2015 | 25 | 15 | 3 | 7 (28%) |
| Fall 2016 | 25 | 16 | 2 | 7 (28%) |
| Fall 2017 | 28 | 17 | 5 | 6 (21%) |
| Fall 2018 | 24 | 12 | 2 | 10 (42%) |
| Fall 2019 | 25 | 14 | 1 | 10 (40%) |
| Spring 2013 | 26 | 16 | 1 | 9 (35%) |
| Spring 2014 | 23 | 12 | 4 | 7 (30%) |
| Spring 2015 | 25 | 17 | 2 | 6 (24%) |
| Spring 2016 | 25 | 17 | 2 | 6 (24%) |
| Spring 2017 | 26 | 12 | 1 | 13 (50%) |
| Spring 2018 | 26 | 14 | 1 | 11 (42%) |
| Spring 2019 | 24 | 12 | 2 | 10 (42%) |
| Undated (samples and the vault's own) | 7 | 5 | 1 | 1 (14%) |

## Gaps, by the page that should teach them

Ranked by how many questions each page's gaps cost. The page is the one named for the item's concept; "no page" means the vault has no page by that name.

### `Concepts/Frequency-Severity Method.md` — 10 question(s)

- `cas5-2013f-q16` (fact): Claim count and dollar triangles must be treated consistently as either cumulative or incremental when applying the frequency-severity method.
- `cas5-2013s-q19` (fact): Accident year data affected by an unusual event (such as a temporary slowdown in claim opening) is unreliable for selecting frequency and should be excluded from the selection, while severity, being a per-claim average, may be unaffected and justified separately.
- `cas5-2014f-q17` (procedure): To adjust for changing closure rates, project future incremental closed counts for the accident year by applying the incremental disposal rates from the latest calendar-year diagonal to the ultimate counts (remaining unclosed share), instead of averaging historical disposal rates.
- `cas5-2015f-q7` (procedure): In a frequency-severity projection, select an ultimate frequency and severity (e.g., a recent-years average when there is a clear shift, an all-year average when there is no pattern) and justify the choice based on the pattern in the trended data.
- `cas5-2015s-q21` (definition): Incremental average severity at a development age is the incremental paid claims divided by the incremental closed claim counts for that interval.
- `cas5-2016f-q20` (fact): The frequency-severity technique assumes claims are paid in full at closure with no partial payments; partial payments on open claims violate this assumption.
- `cas5-2017-q16` (formula): Frequency equals trended ultimate claim counts divided by on-level earned premium, which removes the effects of rate changes, count trend and book growth.
- `cas5-2017f-q18` (fact): Severity is an average, so severities of sub-periods (e.g., half-years) cannot be summed to get an annual severity; compute ultimate claims for each sub-period and add the dollars.
- `cas5-2017f-q23` (definition): In the disposal-rate frequency-severity method, the tail severity at maturity m is the average severity of all claims closing at age m and later, i.e. pooled paid dollars divided by pooled closed claim counts for all cells at maturity m or beyond.
- `cas5-2017f-q23` (procedure): Compute a tail severity by summing trended incremental paid losses over all cells at maturity m or later and dividing by the sum of untrended incremental closed counts over those same cells.
- `cas5-2017f-q23` (formula): The tail severity at age m equals the count-weighted average of the severity of claims closing at age m and the tail severity at the next age, which allows building tail severities recursively from a later-age tail severity.
- `cas5-2017f-q23` (procedure): To choose the maturity at which to combine data into a single tail severity, compare trended incremental severities by cell (paid x trend / counts) across accident years and pick the age where they stop being stable and credible, keeping earlier ages as their own steps.
- `cas5-2017f-q23` (fact): Combining at too early an age discards usable development detail, while combining too late leaves the tail selection resting on few, volatile claims; late-maturity incremental severities based on small claim counts are erratic and noisy.
- `cas5-2019f-q20` (procedure): To project future closed counts for an immature accident year, take the remaining open claims (ultimate minus closed to date) and allocate them across future ages in proportion to the incremental selected disposal rates divided by one minus the current disposal rate.

### `Concepts/Case Outstanding Development Method.md` — 5 question(s)

- `cas5-2013f-q18` (fact): The case outstanding development method is best suited to claims-made coverages and is not appropriate for occurrence coverages such as workers compensation.
- `cas5-2013s-q17` (formula): The case outstanding development factor equals (RCDF − 1) × PCDF / (PCDF − RCDF) + 1, equivalently RCDF × (PCDF − 1)/(PCDF − RCDF), where RCDF and PCDF are the reported and paid CDFs to ultimate; unpaid = case outstanding × this factor.
- `cas5-2013s-q17` (fact): The case outstanding development technique is particularly useful when case outstanding is the only claims data available, such as when an entity has no paid or reported loss history.
- `cas5-2016f-q19` (formula): The case outstanding development factor equals paid CDF × (reported CDF − 1) / (paid CDF − reported CDF) + 1, and unpaid claims equal this factor times case outstanding.
- `cas5-2016f-q19` (procedure): For an accident year beyond the oldest age in the triangle, use the benchmark tail (ultimate) CDFs at the age after the last development column, applying the case outstanding technique to the case reserve.
- `cas5-2016s-q17` (fact): The case outstanding development technique projects development only on reported claims, so it is appropriate only when most or all claims are reported in the first period; it is not appropriate when significant pure IBNR (unreported claims) exists.
- `cas5-2019f-q18` (formula): In the alternative case outstanding method, the case outstanding development factor equals (CDF_reported − 1) × CDF_paid / (CDF_paid − CDF_reported) + 1, and unpaid claims equal case outstanding times this factor.

### `Concepts/Complement of Credibility.md` — 4 question(s)

- `cas5-2014f-q8` (fact): A competitor's rate indication is a questionable complement because competitors may target a different market and use different operations, so it may be biased and adjustments are hard to make; a general inflation trend does not reflect the loss experience or rate need of the state.
- `cas5-2016f-q13` (procedure): Normalize current territorial relativities by dividing each by the exposure-weighted average current relativity, so that they are on the same average-rating-factor basis as the indicated relativities before credibility weighting.
- `cas5-2016s-q11` (procedure): The complement of credibility for an excess layer via the lower limits analysis is experience losses capped at a lower limit (using all policy limits) times the industry ILF difference between the layer's top and bottom limits divided by the industry ILF at the capping limit.
- `cas5-2016s-q11` (fact): Increased limits analysis (capping at the attachment point) requires data not truncated below the attachment point, so only policies with limits at or above it are used; lower limits analysis uses all policy limits and is more stable but less logically related to the excess layer.
- `cas5-2017-q7` (procedure): When the complement of credibility is 'no change', current relativities must be rebased by dividing each by their exposure-weighted average so they are on the same normalized basis as the indicated relativities, and used as the complement.

### **no page for Loss Development Method** — 3 question(s)

- `cas5-2013s-q5` (formula): Age-to-age development factors are ratios of reported losses at successive evaluation ages for each accident year, and a selected factor (e.g., an average) is chosen for each age interval.
- `cas5-2013s-q8` (procedure): Determine an accident year's maturity in months at the evaluation date (months from the start of the accident year to the valuation date) to select the correct development factor.
- `cas5-2017-q13` (procedure): Compute age-to-age development factors as ratios of reported loss at successive maturities from a loss triangle, and select a factor for each interval by averaging the observed factors.

### `Concepts/Adverse Selection.md` — 3 question(s)

- `cas5-2013s-q14` (fact): Capping can worsen adverse selection because high-risk insureds with capped increases stay while low-risk insureds who receive decreases or shop elsewhere leave, worsening the portfolio mix.
- `cas5-2014f-q9` (procedure): Compute the switching probability from the formula given for a risk, based on the difference between the competitor's offered rate and the new insurer's rate relative to true expected cost; risks switch only when offered a lower price.
- `cas5-2017f-q9` (procedure): To measure the effect of price-based switching, compare the insurer's rate to the competitor's rate for each risk class: the class where the insurer is cheaper gains a share of the competitor's policies and the class where it is more expensive loses that share of its own, then recompute the portfol…

### `Concepts/Berquist-Sherman Method.md` — 3 question(s)

- `cas5-2014f-q20` (formula): Adjusted open claim count equals ultimate-consistent reported count minus restated closed count, i.e., actual reported (closed plus open) counts less adjusted closed counts.
- `cas5-2014f-q20` (fact): When both case outstanding adequacy and settlement rate changes occur, the Berquist-Sherman adjustments are combined into a single adjusted reported triangle, giving one ultimate estimate rather than separate ones.
- `cas5-2016s-q20` (definition): The Berquist-Sherman paid adjustment models the relationship between cumulative paid claims Y and cumulative closed claim counts X with an exponential curve Y = a·e^(bX), whose parameters a and b are fit (e.g., by a two-point fit) between successive ages.
- `cas5-2018s-q21` (procedure): To adjust for changes in settlement rate, apply the disposal rates from the selected basis diagonal at each age to every accident year's ultimate claim counts to get adjusted closed counts, then subtract them from reported counts to get adjusted open counts.

### `Concepts/Bornhuetter-Ferguson Method.md` — 3 question(s)

- `cas5-2013s-q18` (fact): The credibility interpretation of BF breaks down when cumulative percent reported or paid exceeds 100% (e.g. due to salvage and subrogation recoveries), since Z cannot exceed 1.
- `cas5-2015f-q18` (fact): When CDFs are less than 1.00, the implied credibility Z = 1/CDF exceeds 1, which is not a valid credibility weight; the BF method may still be used with adjustments such as capping CDFs at 1.00, or an alternative technique may be used.
- `cas5-2015f-q22` (fact): The Bornhuetter-Ferguson method is inappropriate when severity changes, because the change also alters the percent unreported implied by the historical pattern.

### `Concepts/Claim Count Triangle.md` — 3 question(s)

- `cas5-2017-q17` (fact): A law limiting benefits changes claim severity but not claim counts, so the claim count triangle needs no adjustment for it.
- `cas5-2017f-q18` (fact): Reported claim counts excluding claims closed with no payment can develop downward because claims counted at early maturities are removed when later closed without payment, and this outweighs newly reported claims.
- `cas5-2018s-q6` (fact): In a cumulative reported claim count triangle, each entry already includes all earlier reported claims for that accident year, so the count covered as of a given date is read directly from the entry at that age, and the latest diagonal value is the total reported to date, with no summing of cells.

### **no page for D-Ratio** — 2 question(s)

- `cas5-2016f-q15` (definition): The D-ratio is the expected proportion of expected losses that are primary losses, so expected primary losses Ep = D × expected losses and expected excess losses Ee = (1 − D) × expected losses.
- `cas5-2018s-q15` (definition): The D-ratio is the proportion of expected losses that are expected primary losses; expected excess losses equal expected losses minus expected primary losses.

### **no page for Expense Provisions in Ratemaking** — 2 question(s)

- `cas5-2013f-q12` (fact): Typical expense provisions in a rate level reflect ongoing variable costs (expenses that vary with premium or policy count), while one-time investments such as market-entry marketing are funded by company capital or management outside the rates.
- `cas5-2018f-q6` (procedure): Expense ratios or per-exposure amounts are computed for each historical year, and a selection representative of future expense levels is made.

### **no page for Loss Development Triangles** — 2 question(s)

- `cas5-2014s-q20` (procedure): Convert incremental paid claims and incremental received salvage and subrogation into cumulative amounts by summing across development ages.
- `cas5-2018f-q23` (procedure): Update a cumulative paid triangle's latest diagonal by adding each accident year's calendar-year payments to its prior cumulative value at the preceding age (the same accident year's previous diagonal entry).

### **no page for Retention Ratio** — 2 question(s)

- `cas5-2015s-q3` (procedure): To estimate renewals in a period, subtract new business from total written exposure; exposure eligible to renew is obtained from the prior policies' expirations (e.g., six-month policies written in a period expire and become eligible to renew, so the eligible exposure equals the written exposure of…
- `cas5-2019-q12` (definition): Retention ratio is the number of policies renewed divided by the number of policies currently in force (up for renewal); a minimum retention ratio target caps the rate increase that can be taken.
- `cas5-2019-q12` (procedure): Apply a retention constraint by computing the minimum retained policy count (current count times minimum retention ratio), finding the largest rate change in the retention model output that still meets it, and capping the indicated rate change at that level.

### **no page for Seasonality in Loss Development** — 2 question(s)

- `cas5-2013s-q16` (fact): When age-to-age factors show seasonality across accident periods, such as systematically different factors for first-half versus second-half accident half-years, separate factors should be selected and applied for each season, not blended across seasons.
- `cas5-2014f-q16` (fact): When accident periods in different parts of the year (e.g., first half vs. second half) show systematically different development patterns, this indicates seasonality, and a blended all-period factor will be distorted.
- `cas5-2014f-q16` (procedure): When seasonality is present, select age-to-age factors separately for each season by averaging only factors from accident periods of the same season.

### `Concepts/Experience Rating.md` — 2 question(s)

- `cas5-2016f-q15` (formula): Expected losses equal the payroll (in units of $100) multiplied by the expected loss rate per $100 of payroll.
- `cas5-2018s-q15` (formula): Expected losses equal the expected loss rate per $100 of payroll times payroll divided by 100.

### `Concepts/On Level Premium.md` — 2 question(s)

- `cas5-2013f-q4` (fact): If a growing book writes more premium late in the year, the even-earning assumption understates the portion of earned premium at new rates, so on-level factors and on-level premium are overstated, the loss ratio is understated, and the indicated rate increase is too low.
- `cas5-2014s-q1` (procedure): For in-force premium at a date, weight the rate levels by the share of policies in force at that date that were written under each rate level, looking back one policy term from that date.

### **no page for ALAE Development Technique Selection** — 1 question(s)

- `cas5-2018s-q25` (fact): The ratio technique depends on the selected ultimate claims and carries forward the latest observed ratio, so distortions in an accident year's paid claims (e.g., unusually low early paid claims inflating the ratio) or in the selected ultimate claims overstate ultimate ALAE; the paid ALAE technique…

### **no page for Accident Period Aggregation** — 1 question(s)

- `cas5-2013s-q16` (fact): An accident year's ultimate is obtained by estimating ultimate for each of its accident half-years from its own latest diagonal value and summing them.

### **no page for Actual vs. Expected Claim Development** — 1 question(s)

- `cas5-2014s-q23` (procedure): Update reported and paid claims at the new evaluation date by adding the period's expected (or actual) emergence to the prior cumulative reported and paid claims.

### **no page for Additive Development Technique** — 1 question(s)

- `cas5-2015f-q24` (procedure): The additive development technique computes age-to-age differences in the ratio (later minus earlier), sums them from a given age to the last age to get the additive age-to-ultimate amount, and adds that to the current ratio.

### **no page for Additive vs Multiplicative Ratio Development** — 1 question(s)

- `cas5-2019-q24` (fact): The additive ratio approach is preferred over the multiplicative approach when ALAE ratios are very small (especially at early maturities), because multiplicative link ratios then become highly leveraged while additive differences are less leveraged and more stable.

### **no page for Adjusting Claims Development Methods for Changes in Legal Environment** — 1 question(s)

- `cas5-2019-q19` (fact): A change in the legal environment such as tort reform affects only future claim payments: already-paid claims are unchanged, while both case reserves and IBNR (all unpaid claims) are scaled by the expected reduction.
- `cas5-2019-q19` (procedure): To incorporate a change affecting future payments, compute the unadjusted unpaid estimate under the technique, multiply it by (1 − reduction), and add back paid claims to obtain adjusted ultimate claims.

### **no page for Adjusting Loss Triangles for Severity or Law Changes** — 1 question(s)

- `cas5-2017-q23` (procedure): To restate claims for a change in severity (e.g., a court decision) that applies to payments made after a date, de-cumulate the triangle into incremental payments, because each incremental cell is paid in a single calendar year, and multiply the incremental payments made before the change by the se…

### **no page for Asset Share Model** — 1 question(s)

- `cas5-2013f-q12` (definition): The asset-share model evaluates the long-term profitability of a policy cohort, recognizing that a short-term loss on new business can be offset by profitable renewals, which have better loss experience and lower acquisition costs.

### **no page for Average Accident Date** — 1 question(s)

- `cas5-2013s-q16` (fact): With rapidly growing exposures, the average accident date within a full accident year shifts away from the midpoint; shorter accident periods keep the average accident date closer to the midpoint, making development more comparable across periods.

### **no page for Average Claim Triangles** — 1 question(s)

- `cas5-2019-q14` (fact): Average case outstanding can exceed average reported values because small claims close early, leaving larger claims open; also an average paid triangle cannot be derived without claim count information on a consistent basis.

### **no page for Base Level** — 1 question(s)

- `cas5-2019f-q11` (fact): In both one-way analyses and GLMs the base level of a variable is conventionally chosen as the level with the most exposures, since it is the most stable and credible reference, so the two methods' relativities necessarily agree there.

### **no page for Calendar Year Incremental Development** — 1 question(s)

- `cas5-2017-q19` (procedure): The expected incremental claims in a given calendar year equal the difference between projected cumulative amounts at the end and the start of the development period that falls in that calendar year (a diagonal of the triangle), not the projection to ultimate.

### **no page for Capping Relativity Changes** — 1 question(s)

- `cas5-2015f-q9` (procedure): To apply a cap on the maximum-to-minimum relativity ratio, set the capped territory's relativity at the cap multiple of the lowest territory's relativity, rebasing the lowest territory to 1.000.

### **no page for Claim Severity Diagnostics** — 1 question(s)

- `cas5-2013f-q15` (formula): Average paid claim (paid severity) equals cumulative paid losses divided by cumulative closed claim counts at each age.

### **no page for Claims Closed Without Payment** — 1 question(s)

- `cas5-2019-q15` (fact): Cumulative reported claim counts can decrease over time when claims that were reported are later closed without payment (e.g. found fraudulent, outside coverage, or otherwise not payable) and removed from the count.

### **no page for Classical Credibility** — 1 question(s)

- `cas5-2018s-q4` (procedure): Select the expected claim frequency for each coverage separately by pooling the experience years (total claims divided by total exposures) rather than using a single year's frequency or combining coverages.
- `cas5-2018s-q4` (fact): An exposure-based full credibility standard is preferred because exposures are known or projectable in advance of the experience period, whereas claim counts are not known until the period has developed, so the needed volume of business is known up front and is simpler to apply.
- `cas5-2018s-q4` (fact): Disadvantages of classical credibility are that it assumes Poisson claim frequency and constant severity, relies on an arbitrary choice of probability p and range k for the full credibility standard, and ignores the accuracy or quality of the complement of credibility.

### **no page for Classical Paid-to-Paid ULAE Technique** — 1 question(s)

- `cas5-2016f-q26` (procedure): Test the same-inflation assumption by comparing trends in loss cost per exposure (ultimate claims ÷ exposures) with trends in paid ULAE; differing trends mean the assumption is violated and the ratio will misstate future ULAE.

### **no page for Classical ULAE Technique** — 1 question(s)

- `cas5-2017f-q26` (fact): A multi-year weighted average ULAE ratio equals total paid ULAE divided by total paid claims over the period, so total ULAE equals ratio times total paid claims and a missing year's ULAE can be found by subtracting known years.

### **no page for Coinsurance Penalty** — 1 question(s)

- `cas5-2015f-q12` (fact): The coinsurance penalty as a function of loss rises linearly from the origin to its maximum at L = F (where the indemnity reaches the face amount), then falls linearly to zero at L = cV, and is zero for larger losses.

### **no page for Competitor Rate Comparison** — 1 question(s)

- `cas5-2018f-q8` (procedure): To compare premiums fairly across companies, hold risk characteristics fixed by obtaining competitor quotes for representative risk profiles, re-rating the company's book with competitors' filed rates, or comparing by segment.

### **no page for Competitor Rate Filings** — 1 question(s)

- `cas5-2018s-q13` (fact): Competitor rate filing factors are useful as a reasonableness check and a fallback source because they come from a similar line and market, but they reflect the competitor's own book, underwriting and possibly non-cost-based pricing.

### **no page for Controllability as a Social Criterion** — 1 question(s)

- `cas5-2018s-q10` (fact): A variable is controllable if the insured can change it to reduce their risk and premium; a variable that is costly to change or does not affect risk gives the insured no real incentive to reduce losses.

### **no page for Cost-Benefit of Rate Implementation** — 1 question(s)

- `cas5-2017-q6` (procedure): To decide whether to implement a rate change, net the one-time implementation cost against only the scenario that implements the change, then compare it to the profit of the alternative scenario.

### **no page for Criteria for Evaluating Rating Variables** — 1 question(s)

- `cas5-2018f-q12` (definition): Affordability means premiums should remain affordable, especially for compulsory coverage; controllability means the insured can influence the rating characteristic and thereby their premium, encouraging loss control.

### **no page for Data Mining Techniques** — 1 question(s)

- `cas5-2014f-q10` (fact): A neural network can enhance a GLM analysis by identifying missing predictive variables not yet included in the GLM.

### **no page for Effect of Changing Exposure Volume on Development Techniques** — 1 question(s)

- `cas5-2014f-q19` (fact): Rapid growth in written premium during the year shifts the average accident date of the latest accident year later, so that year is less mature than prior years at the same evaluation date, and the reported development technique understates ultimate claims.

### **no page for Excess Loss Ratio** — 1 question(s)

- `cas5-2015s-q8` (procedure): Combine the current year's excess ratio with the historical excess ratio by weighting (by losses, limited losses, claim counts, or years) rather than simply averaging the two ratios.

### **no page for Expense Allocation Basis (Earned vs Written)** — 1 question(s)

- `cas5-2018s-q7` (fact): Countrywide expenses (general, other acquisition) are spread over countrywide premium and exposures, while state-specific expenses (taxes, licenses and fees, commissions) are spread over that state's premium and exposures.

### **no page for Expense Fee Earning** — 1 question(s)

- `cas5-2013f-q2` (fact): The expense fee is a flat per-policy amount that earns pro-rata over the policy term along with the rest of the premium, so it is not fully earned at inception.

### **no page for Expense Provisions for a New State** — 1 question(s)

- `cas5-2019-q6` (fact): Countrywide or benchmark expense ratios may be inappropriate for a new state because expenses (e.g., taxes, commissions) vary by state and start-up costs make initial expenses higher than historical benchmarks.

### **no page for Experience Rating Modification Factor** — 1 question(s)

- `cas5-2014s-q2` (procedure): To adjust premium for experience modification level, multiply by the ratio of the projected average experience mod to that year's historical average experience mod (do not multiply the mods together).

### **no page for Exposure Correlation in Univariate Analysis** — 1 question(s)

- `cas5-2019-q10` (procedure): To test for exposure correlation, compare the percentage mix of one variable's levels (e.g., driver type) across each level of the other variable (e.g., territory); identical mixes mean no correlation and differing mixes mean correlation.
- `cas5-2019-q10` (fact): When two rating variables are not exposure correlated, no exposure adjustment is needed and the simple univariate relativities can be used for both.

### **no page for Exposure Earning Pattern** — 1 question(s)

- `cas5-2019f-q1` (procedure): To derive a non-uniform quarterly earning pattern from exposure data, divide each calendar quarter's earned exposures by the exposures in force during that quarter (starting with the first quarter, where only the first cohort is in force); the resulting fractions sum to 1 over a policy's term.

### **no page for Exposure-Based Projection Method** — 1 question(s)

- `cas5-2018f-q6` (fact): The exposure-based method can be distorted by economies of scale as the book grows or shrinks, by exposures trending differently than expenses, and by fixed expenses that vary by risk characteristic (e.g. new vs. renewal business).

### **no page for Fixed Expense Provision** — 1 question(s)

- `cas5-2014s-q5` (procedure): Select the fixed expense provision by averaging historical fixed expense ratios while excluding anomalous years caused by extraordinary events, and justify the exclusion.

### **no page for GLM Challenges with Loss Ratio Data** — 1 question(s)

- `cas5-2018f-q9` (fact): Loss ratios have no natural error distribution or a priori expected shape (unlike Poisson-family for frequency and Gamma for severity), making distribution and link function choice difficult.

### **no page for GLM Diagnostics** — 1 question(s)

- `cas5-2018s-q13` (procedure): Assess GLM relativity credibility from diagnostic charts by comparing exposure volume at each level and the width of the standard-error bounds: many exposures and narrow bands indicate a credible estimate, while few exposures and wide bands indicate an unreliable one.

### **no page for GLM Model Diagnostics and Variable Selection** — 1 question(s)

- `cas5-2014f-q10` (procedure): Consistency test: compare a variable's indicated relativities across individual years; if the yearly curves follow similar patterns and direction, the variable's results are stable and pass the consistency test.

### **no page for GLM Model Validation: Consistency Test** — 1 question(s)

- `cas5-2019f-q10` (definition): The consistency test fits the same GLM separately to each year of experience and plots the resulting relativities for a variable side by side to check whether the variable's signal is stable over time.
- `cas5-2019f-q10` (fact): A variable whose fitted relativities keep the same direction, shape and slope across years passes the consistency test and is a stable predictor to retain; relativities that jump around or reverse direction indicate noise.

### **no page for GLM Variable Predictive Quality Tests** — 1 question(s)

- `cas5-2018f-q9` (procedure): The consistency test compares GLM-indicated relativities across time periods (e.g., years); a variable passes only if the indications move in a consistent pattern, and fails if years diverge or move in opposite directions.

### **no page for Harwayne's Method** — 1 question(s)

- `cas5-2019f-q12` (procedure): When the complement is built from all other states, remove the subject state's exposures and losses from the countrywide totals for each class before computing the other states' class pure premiums.

### **no page for Homeowners Insurance Rating by Amount of Insurance** — 1 question(s)

- `cas5-2017-q11` (formula): The homeowners rate per $1,000 of coverage equals expected frequency times expected severity limited to the amount of insurance (pure premium), divided by the amount of insurance in thousands.

### **no page for ISO Personal Automobile Classification Plan** — 1 question(s)

- `cas5-2015s-q1` (fact): The primary classification is based on auto usage (e.g., work commute distance, pleasure, farm, business), and the secondary classification is based on the driver's age, SDIP driving record points and licensing experience.

### **no page for Impact of Law Changes on Workers Compensation Losses** — 1 question(s)

- `cas5-2017f-q6` (procedure): To estimate the direct impact of a benefit law change on losses, compute total benefits under the current and proposed structures (benefit per wage band times number of workers, summed), and express the impact as the percentage change of proposed over current benefits.
- `cas5-2017f-q6` (procedure): When wages are grouped in bands, approximate each band's wage by its average (total wages divided by number of workers) when applying benefit rate and limits.

### **no page for Importance of Unpaid Claim Estimates** — 1 question(s)

- `cas5-2018f-q14` (fact): Investors use reserve levels, through their effect on reported earnings and surplus, to assess the dividends a company can sustainably pay.

### **no page for Increased Limit Factors** — 1 question(s)

- `cas5-2019f-q13` (procedure): Using the stated assumption about payment amounts (e.g., claims are paid at either a fixed fraction of the limit or the full limit), split each policy limit's claim count by the percentage at the limit to get the number of claims at each claim size.

### **no page for Increased Limits Factors** — 1 question(s)

- `cas5-2016s-q11` (procedure): With policy-limit-censored data, estimate LAS at the basic limit using all claims from all policy limits, with losses capped at the basic limit divided by total claim count.
- `cas5-2016s-q11` (procedure): To extend LAS to a higher limit, add to LAS at the lower limit the average layer severity per claim (losses in the layer, with claims exceeding the layer capped at layer width, divided by claims exceeding the lower limit), using only policies whose limits reach the top of the layer, multiplied by t…

### **no page for Incremental and Cumulative Loss Triangles** — 1 question(s)

- `cas5-2013f-q14` (procedure): To build an incremental triangle, sum the payments made during each calendar year for the claims in each row (by accident or report year) and place them at the development age corresponding to that calendar year; a cumulative triangle sums the incremental payments through each evaluation age.

### **no page for Indirect Effects of Workers Compensation Benefit Changes** — 1 question(s)

- `cas5-2017f-q6` (fact): Raising the minimum benefit reduces the financial incentive of low-wage workers to avoid injury claims and return to work, increasing claim frequency and duration among low-wage workers.
- `cas5-2017f-q6` (fact): Lowering the maximum benefit widens the gap between wage and benefit for high-wage workers, strengthening their incentive to avoid claims and return to work sooner, so claim frequency and duration fall among high-wage workers.

### **no page for Insurance Rate** — 1 question(s)

- `cas5-2015f-q12` (procedure): The rate per $1000 of insurance equals the pure premium divided by the amount of insurance in thousands.

### **no page for Interpolating Development Patterns** — 1 question(s)

- `cas5-2018f-q24` (procedure): To get the expected pattern at an age between evaluation points, assume linear emergence and linearly interpolate the percent reported/paid between the adjacent evaluation ages, not the development factors.

### **no page for Interpolation of Development Factors** — 1 question(s)

- `cas5-2014s-q22` (procedure): To find the percent reported or paid at an age between evaluation points, linearly interpolate between the cumulative percentages at the adjacent ages, using the accident-period age in months at the evaluation date.

### **no page for Judgmental Adjustment of GLM Indications** — 1 question(s)

- `cas5-2013s-q12` (procedure): When a GLM indication for a sparse or counterintuitive level is unreliable, select a factor judgmentally that fits a smooth monotone pattern relative to neighboring levels (for example, interpolating between reliable levels or continuing the trend), rather than collapsing levels or reweighting GLM …

### **no page for Law Change Adjustment** — 1 question(s)

- `cas5-2018s-q18` (procedure): Adjust the selected severity for a law change such as tort reform by multiplying by (1 minus the percentage reduction) when all claims in the projected accident year occur after the effective date; the adjustment applies to severity, not to claim counts or reporting.

### **no page for Linear Interpolation** — 1 question(s)

- `cas5-2014f-q22` (definition): Linear interpolation estimates a value at an intermediate maturity by assuming the change between two known maturities occurs uniformly (a straight line) over the interval, so the fraction of the interval elapsed times the total change is added to the starting value.
- `cas5-2014f-q22` (fact): Linear interpolation of claim development may be inappropriate for an immature accident year because claims do not emerge uniformly; the development pattern is a curve (e.g., seasonality, faster early reporting, highly leveraged development factors), so a straight line can misestimate expected clai…

### **no page for Mixed Loss Distributions** — 1 question(s)

- `cas5-2015f-q12` (procedure): For a loss distribution mixing a point mass at total loss with a uniform distribution on the remaining losses, the probability of each segment is found by scaling the uniform portion by (1 − point mass probability) and the interval's share of the range, with the remaining probability going to the s…

### **no page for Model Lift and Decile Plots** — 1 question(s)

- `cas5-2019-q9` (fact): Predictions that are flat and fail to match the amplitude of actual differences across deciles (underestimating high deciles, overestimating low ones) may indicate the model is missing predictive variables.

### **no page for Multivariate Methods: Data Limitations** — 1 question(s)

- `cas5-2017-q8` (fact): Multivariate methods are discouraged when data is insufficient (new line or territory) or too heterogeneous (large commercial, large-deductible or retrospectively rated, individually underwritten risks) to build a credible model dataset.

### **no page for Multivariate Methods: Operational and Competitive Environment** — 1 question(s)

- `cas5-2017-q8` (fact): Multivariate methods may also be discouraged by operational constraints (lack of systems, data infrastructure or expertise where cost exceeds benefit) or by little competitive pressure (no adverse selection threat from rivals).

### **no page for Multivariate Methods: Regulatory Environment** — 1 question(s)

- `cas5-2017-q8` (fact): Multivariate methods are discouraged in heavily regulated markets where the regulator mandates a different ratemaking method (e.g. California private passenger auto using univariate sequential factor selection and adjusted pure premium), whereas merely restricting allowable variables does not precl…

### **no page for Normalizing Current Relativities** — 1 question(s)

- `cas5-2018s-q12` (procedure): Normalize current relativities by dividing each by the exposure-weighted average current relativity, so they are on the same basis as the indicated relativities (relativity to the total) and can serve as the credibility complement.

### **no page for Payment Pattern Emergence Assumptions** — 1 question(s)

- `cas5-2019f-q25` (procedure): Under a uniform emergence assumption, the expected payments in an interval are spread equally across its sub-periods, so each quarter of a four-quarter interval receives 25%.
- `cas5-2019f-q25` (fact): An industry payment pattern will not exactly match a company's own experience because of differences in policy types, claim settlement practices and mix, so small deviations from it are not strong evidence the estimate is wrong.

### **no page for Premium-Based Projection Method** — 1 question(s)

- `cas5-2014f-q6` (fact): When projected average premium exceeds the historical average premium behind the expense ratios, the premium-based method overstates fixed expense per exposure, so the indicated rate is excessive; the reverse makes it inadequate.

### **no page for Rating Plan Premium Calculation** — 1 question(s)

- `cas5-2016s-q12` (procedure): Estimate the average premium under a multiplicative rating plan by computing the exposure-weighted average of each rating variable's factor (and of each discount factor, i.e. 1 minus the discount) and multiplying these averages by the base premium.

### **no page for Ratio Development of ALAE to Claims** — 1 question(s)

- `cas5-2016s-q23` (procedure): In the paid ALAE-to-paid claims development technique, compute the ratio of cumulative paid ALAE to cumulative paid claims for each accident year at each age, then project each accident year's ratio to its ultimate ratio (additively via differences between ages, or multiplicatively via ratio link f…
- `cas5-2016s-q23` (fact): Advantage of the paid ALAE-to-paid claims method: it uses the inherent relationship between ALAE and claims, and its ratio development is less leveraged/more stable than developing ALAE alone, with ratios able to be judgmentally selected.

### **no page for Ratio Methods for ALAE** — 1 question(s)

- `cas5-2018f-q23` (formula): Additive development factors are the differences between successive-age ALAE-to-claims ratios, and are cumulated by summing selected differences to give an age-to-ultimate additive factor.
- `cas5-2018f-q23` (formula): The projected ultimate ALAE-to-claims ratio equals the current ratio plus the age-to-ultimate additive factor.

### **no page for Ratio Techniques for Developing ALAE** — 1 question(s)

- `cas5-2019-q24` (fact): Advantages of ratio techniques: they recognize the relationship between losses and ALAE, provide diagnostics (unreasonable year ratios can be excluded), and give less leveraged, more stable factors than developing paid ALAE dollars directly.

### **no page for Ratio of Excess to Ground-Up Claim Counts** — 1 question(s)

- `cas5-2014s-q16` (procedure): Alternative approach: compute the ratio of trended ultimate excess counts to trended ultimate ground-up counts for undistorted years, average the ratios, and apply it to the projection year's ultimate ground-up counts to get excess counts.

### **no page for Ratio of Paid ALAE to Paid Claims Development Technique** — 1 question(s)

- `cas5-2018s-q25` (procedure): In the ratio of paid ALAE to paid claims technique with additive factors, the development factor from one age to the next is the average change (difference) in the paid ALAE-to-paid claims ratio, and the ultimate ratio equals the latest ratio plus the sum of the additive development through the fin…

### **no page for Ratio of Paid ALAE to Paid Claims Technique** — 1 question(s)

- `cas5-2017-q25` (formula): In the paid ALAE to paid claims ratio technique, the development factor is the ultimate ALAE-to-claims ratio divided by the paid ALAE-to-paid claims ratio.

### **no page for Reported Claim Development Method** — 1 question(s)

- `cas5-2013s-q20` (fact): A change in settlement rate alters the mix of open claims, so an apparent change in average case outstanding may not indicate a change in case reserve adequacy; case outstanding alone is inconclusive.

### **no page for Reported Claim Development Technique** — 1 question(s)

- `cas5-2017-q21` (fact): A change in the speed of claim reporting (faster reporting with unchanged payment pace) distorts reported development factors and reported ultimates but not paid ultimates.

### **no page for Reported Claims** — 1 question(s)

- `cas5-2018s-q16` (procedure): The case outstanding at an evaluation date is the ending case outstanding from the claim's latest transaction on or before that date; if no later transaction occurs it carries forward, and a claim not yet reported by that date contributes zero.

### **no page for Revising Selected Ultimate Claims** — 1 question(s)

- `cas5-2018f-q24` (fact): The selected ultimate should be revised when actual-versus-expected variance reflects genuinely more claim dollars, such as a large loss or catastrophe claim occurring in the period, even if it is a one-off that is excluded from future accident-year expectations.

### **no page for Selecting Expense Provisions** — 1 question(s)

- `cas5-2016s-q7` (procedure): Select each expense ratio based on its trend: if ratios show a consistent trend, select the most recent year to remain responsive; if there is no clear pattern or the ratios are volatile, select an average of the years.
- `cas5-2016s-q7` (fact): Selections should be made on each expense category's total ratio before splitting into fixed and variable, so that volatility in one component does not mask a trend in another.

### **no page for Sequential Analysis (Exposure Adjustment)** — 1 question(s)

- `cas5-2019-q10` (procedure): To adjust for exposure correlation in sequential univariate analysis, first compute relativities for one variable, then compute adjusted exposures for the other variable's levels by weighting each exposure by the first variable's relativity, and compute pure premiums and relativities from losses di…
- `cas5-2019-q10` (fact): The exposure adjustment must use exposure tables (not loss tables) for the weights and pure premium relativities (not loss relativities) for the factors.

### **no page for Severity Trend in Claim Projection** — 1 question(s)

- `cas5-2019f-q20` (fact): With no severity trend, historical severities need no trend adjustment and the selected severities can be used as observed.

### **no page for Tail Factor and Loss Trend** — 1 question(s)

- `cas5-2017-q17` (fact): With no development beyond the last observed maturity, the tail factor is 1.000, and with no loss trend severities need no trend adjustment across accident years.

### **no page for Tail Severity (Frequency-Severity Method)** — 1 question(s)

- `cas5-2019-q20` (procedure): A frequency-severity tail severity is computed by pooling all incremental paid claims and closed claim counts at the maturity age and older, then dividing total adjusted paid by total claim count (a count-weighted pooled severity).
- `cas5-2019-q20` (fact): The maturity age for the tail should be set where data becomes erratic or sparse, so pooling older data gives a more stable and credible estimate than separate age-to-age factors.
- `cas5-2019-q20` (fact): Choosing the tail maturity age involves a trade-off: too late leaves too little data in the tail for credibility, too early discards reliable individual age-to-age factors; also consider the share of claims expected to close after that age, the impact on total projections, and alignment with indust…

### **no page for Trended Ultimate Losses** — 1 question(s)

- `cas5-2016f-q4` (procedure): After trending each accident year's ultimate losses to the future period, average the trended ultimate losses across the selected years to get the projected losses (exposures constant).

### **no page for Trending Claim Counts and Severity** — 1 question(s)

- `cas5-2017-q16` (procedure): De-trend a selected frequency (claim count) and a selected severity from the level of one year back to the earlier accident year by dividing by the respective annual trend factors for the years between them.

### **no page for Trending Frequency and Severity** — 1 question(s)

- `cas5-2015f-q7` (procedure): To restate trended-to-latest-year frequency and severity selections to an earlier accident year, de-trend them by dividing by one plus the annual trend rate raised to the number of years between the years.

### **no page for Triangle Time Period Selection (Annual vs Quarterly)** — 1 question(s)

- `cas5-2013f-q14` (fact): Quarterly triangles can be more appropriate for a growing book because changing exposure volume shifts the average accident date within each annual period and distorts annual development factors.

### **no page for Uniform Writing Assumption** — 1 question(s)

- `cas5-2015s-q3` (fact): Changing the policy term from six months to annual means renewals of the converted policies occur only once a year (concentrated in the first half of the year), so writings in the year after the change are not spread evenly across the year; a uniform-writing assumption is reasonable only when appli…

### **no page for Univariate vs Multivariate Classification Analysis** — 1 question(s)

- `cas5-2018f-q9` (fact): Univariate analysis can be preferable to GLM because it is simpler and more transparent to explain to management, underwriters and regulators, and it suits thin data or limited software, computing power or expertise.

### **no page for Workers Compensation Benefit Level Impact Analysis** — 1 question(s)

- `cas5-2014f-q4` (procedure): To estimate the average weekly benefit across a wage distribution, compute each wage level's benefit after applying the minimum and maximum limits, then weight by the percentage of workers at each level and sum.

### **no page for Workers Compensation Indemnity Benefits** — 1 question(s)

- `cas5-2014f-q4` (procedure): A worker's weekly indemnity benefit equals the compensation rate times pre-injury wage, subject to a minimum benefit floor and a maximum benefit cap (both usually expressed as percentages of the state average weekly wage).

### **no page for Workers Compensation Maximum Weekly Benefit** — 1 question(s)

- `cas5-2014f-q4` (fact): Lowering the maximum benefit reduces benefits only for higher-wage workers whose benefits are capped, and it affects more workers as the cap falls below their uncapped benefit; lower-wage workers are affected only by the compensation rate.

### **no page for Workers Compensation Medical-Only Claims** — 1 question(s)

- `cas5-2014s-q2` (fact): Projected ultimate medical-only claims are already at ultimate and are not subject to indemnity benefit level changes, so they are added to indemnity losses without development or trend.

### **no page for Workers Compensation Ratemaking: Benefit Level Adjustment** — 1 question(s)

- `cas5-2014s-q2` (procedure): To put historical indemnity losses on current benefit level, multiply each year by the cumulative annual benefit level changes occurring after that year up to the current year (the current year's own change is excluded).

### **no page for Workers Compensation Ratemaking: Payroll Adjustment** — 1 question(s)

- `cas5-2014s-q2` (procedure): To put historical industry loss cost premium on current payroll level, multiply each year by the cumulative annual payroll level changes occurring after that year up to the current year (the current year's own change is excluded).

### `Concepts/Accident Year.md` — 1 question(s)

- `cas5-an-004` (fact): Accident-year data occur within a shorter time frame and are useful for isolating and tracking the effect of a single event such as a catastrophe or a court ruling, whereas policy-year data make such effects difficult to isolate because the claims are spread across many cohorts.

### `Concepts/Actual vs Expected Analysis.md` — 1 question(s)

- `cas5-2014s-q22` (procedure): Expected claims emerging over a period equal the prior unreported (or unpaid) amount, ultimate minus actual to date, times the percent emerging in the period divided by the percent still unreported (or unpaid) at the start; adding this to the actual to date gives the cumulative expected.

### `Concepts/Benefit Limit.md` — 1 question(s)

- `cas5-2017f-q6` (formula): A worker's weekly indemnity benefit equals the compensation rate times the pre-injury wage, floored at the minimum benefit and capped at the maximum benefit: min(max(rate x wage, minimum), maximum).

### `Concepts/Calendar Year.md` — 1 question(s)

- `cas5-2017-q20` (fact): Calendar year payments are incremental paid amounts: the latest diagonal of the cumulative paid triangle minus the prior diagonal, with the first-age cell of the latest accident year counted in full.

### `Concepts/Cape Cod Method.md` — 1 question(s)

- `cas5-2015s-q17` (fact): Cape Cod can be done on an exposure basis instead of on-level premium, because premium cancels in the IBNR calculation and gives the same IBNR.

### `Concepts/Case Adequacy.md` — 1 question(s)

- `cas5-2019-q22` (procedure): Apply the adjustment only to the claim segment affected by the change in case reserve adequacy (e.g., large claims) and leave unaffected segments (e.g., small claims) unadjusted, using their unadjusted reported data.

### `Concepts/Coinsurance.md` — 1 question(s)

- `cas5-2016f-q14` (fact): The maximum coinsurance penalty occurs when the loss is at or above the policy face amount (the insurer pays up to the limit), so the maximum penalty is face amount × (1 − apportionment ratio).

### `Concepts/Credibility.md` — 1 question(s)

- `cas5-2014f-q10` (fact): Levels with few exposures have volatile, less credible results, so disparities at those levels do not invalidate the stable results at well-populated levels.

### `Concepts/Development Triangle.md` — 1 question(s)

- `cas5-2017f-q26` (procedure): Calendar year paid claims are obtained by summing incremental payments (differences between successive cumulative values) along each diagonal of the accident year triangle.

### `Concepts/Earned Exposure.md` — 1 question(s)

- `cas5-2019f-q1` (formula): Calendar period earned exposures equal the in-force exposures during the period (by cohort) times that calendar quarter's earning pattern fraction, so future earned exposures after writing stops are based on in-force (not unearned) exposures.

### `Concepts/Expense Ratio.md` — 1 question(s)

- `cas5-2019-q6` (procedure): Select a ratemaking expense ratio for each expense category by comparing the latest year's ratio with prior years and averaging stable years while excluding anomalous years or relying on the latest data.

### `Concepts/Exposure Base.md` — 1 question(s)

- `cas5-2017-q1` (fact): A policy with a term longer than one year carries one exposure unit per year of term (e.g., a two-year policy counts as two exposures).

### `Concepts/In-Force.md` — 1 question(s)

- `cas5-2019f-q2` (fact): Averaging beginning and ending in-force premium approximates calendar year earned premium only if policies have the same term (e.g., all annual) and are written uniformly throughout the year; shorter-term policies can incept and expire between valuations and be missed, and irregular writing or a sm…

### `Concepts/Loss Development.md` — 1 question(s)

- `cas5-2018f-q5` (fact): When no loss development occurs after a given maturity, losses at or beyond that maturity are already ultimate and need no development factor.

### `Concepts/Net of Reinsurance.md` — 1 question(s)

- `cas5-2018f-q15` (procedure): For net reported (incurred) claims under excess of loss, the ceded amount in a calendar year is the change in cumulative ceded incurred (cumulative paid plus case above retention) from the prior year-end to the current year-end, and net reported equals gross reported minus that cession.

### `Concepts/Parallelogram Method.md` — 1 question(s)

- `cas5-2014s-q1` (procedure): When a fraction of policies is written on a single date (a special writing pattern), allocate that fraction entirely to the rate level in effect on that date and spread the remaining fraction uniformly across the period, then combine the weighted rate levels.

### `Concepts/Permissible Loss Ratio.md` — 1 question(s)

- `cas5-2013s-q5` (procedure): When variable expenses change during the future rate period (e.g., a commission cut), compute the permissible loss ratio for each sub-period and weight them by the portion of the rate period (time) each covers.

### `Concepts/Pure Premium Method.md` — 1 question(s)

- `cas5-2014f-q11` (procedure): Indicated relativities are computed by dividing each class's pure premium by the overall (total) pure premium, normalizing so the exposure-weighted average relativity is 1.

### `Concepts/Rate Regulation.md` — 1 question(s)

- `cas5-2013s-q14` (fact): Regulations in some jurisdictions limit the maximum rate change a policyholder may receive at a single renewal, which can make a capping rule legally required.

### `Concepts/Rating Variable.md` — 1 question(s)

- `cas5-2018s-q10` (fact): A rating variable satisfies the objective definition criterion when its categories are clear and unambiguous, so that different people classify the same risk identically.

### `Concepts/Retrospective Rating.md` — 1 question(s)

- `cas5-2015f-q13` (formula): The minimum and maximum retrospective premiums equal the minimum and maximum retro premium ratios multiplied by the standard premium.

### `Concepts/Risk Classifications.md` — 1 question(s)

- `cas5-2019f-q9` (fact): Neither classification rating nor individual risk rating is necessary when all risks have the same expected loss cost (nothing to differentiate) or when rates are set by the regulator rather than the insurer.

### `Concepts/Salvage and Subrogation.md` — 1 question(s)

- `cas5-2015s-q24` (fact): The S&S-to-paid ratio can keep developing after S&S payments stop developing, because the paid claims in the denominator are still developing.

### `Concepts/Seasonality.md` — 1 question(s)

- `cas5-2017f-q18` (fact): When development factors differ systematically by season (e.g., first versus second half of the year), select separate development patterns for each season rather than averaging across all periods.

### `Concepts/Tail Factor.md` — 1 question(s)

- `cas5-2017f-q19` (procedure): A tail factor (the oldest age-to-ultimate factor) can be derived from the ultimate claims already estimated for the oldest accident year divided by its latest reported claims.

### `Concepts/Territory Ratemaking.md` — 1 question(s)

- `cas5-2018f-q10` (fact): Basic geographic units such as zip codes are granular but their boundaries change over time, whereas counties are stable but coarser, so unit choice trades off granularity against stability.

### `Concepts/Trend.md` — 1 question(s)

- `cas5-2015s-q17` (fact): Pure premium changes from the most immature accident year are highly leveraged and unreliable, so they may be excluded when selecting a trend; select a trend consistent with the more stable mature-year changes.

### `Concepts/Unallocated Loss Adjustment Expenses ULAE.md` — 1 question(s)

- `cas5-2013f-q19` (fact): The Wendy Johnson (classical-type) ULAE method is based on claim counts and transactions (openings and closings), assuming ULAE per transaction is independent of claim size, so it is not affected by errors in the dollar amount of ultimate losses (unlike percent-of-loss ULAE methods).

### `Concepts/Workers Compensation Insurance.md` — 1 question(s)

- `cas5-2013f-q1` (fact): Workers compensation indemnity benefits are a percentage of the injured worker's wages, so payroll reflects both claim frequency and severity, whereas hours worked reflects only time exposed to hazards (frequency and medical losses).

## Tagging and linking gaps

The vault teaches what these questions need, but on a page the question isn't tagged with and its tagged pages don't link to. Adding the page to the question's `wiki_link` (or linking it from the tagged page) puts it in reach.

| Question | Pages that teach what it needs |
|---|---|
| `cas5-2013f-q10` | Balancing Back |
| `cas5-2013f-q12` | Expenses |
| `cas5-2013f-q13` | Insurance to Value, Territorial Rating |
| `cas5-2013f-q22` | Quota Share, Stop-Loss Reinsurance |
| `cas5-2013f-q9` | Balancing Back |
| `cas5-2013s-q10` | Profit Margin |
| `cas5-2013s-q12` | Statistical Significance |
| `cas5-2014f-q10` | Regression Tree |
| `cas5-2014f-q12` | Profit Margin, Return on Capital |
| `cas5-2014f-q19` | Excess Loss Development Factor |
| `cas5-2014f-q4` | Moral Hazard |
| `cas5-2014f-q9` | Price Optimization |
| `cas5-2014s-q6` | Rating Variable |
| `cas5-2014s-q7` | Excess of Loss |
| `cas5-2014s-q8` | Balancing Back |
| `cas5-2014s-q9` | Credit-Based Insurance Scoring, Statistical Significance |
| `cas5-2015f-q10` | Confidence Interval, Rating Variable |
| `cas5-2015f-q23` | Stop-Loss Reinsurance, Types of Reinsurance |
| `cas5-2015f-q8` | Law of Large Numbers |
| `cas5-2015f-q9` | Balancing Back |
| `cas5-2015s-q1` | Business Auto Coverage, Common Policy Conditions, Personal Auto Underwriting |
| `cas5-2015s-q13` | Balancing Back |
| `cas5-2015s-q14` | Severity Distribution |
| `cas5-2016f-q10` | Professional Responsibilities of the Actuary |
| `cas5-2016f-q11` | Excess of Loss, Layer of Insurance |
| `cas5-2016f-q13` | Balancing Back, Territorial Rating |
| `cas5-2016s-q10` | Balancing Back |
| `cas5-2016s-q13` | Balancing Back |
| `cas5-2017-q10` | Territorial Rating |
| `cas5-2017-q7` | Territorial Rating |
| `cas5-2017-q8` | Chi-Squared Distribution |
| `cas5-2017f-q10` | Balancing Back |
| `cas5-2017f-q11` | Statistical Significance |
| `cas5-2017f-q13` | Balancing Back |
| `cas5-2017f-q21` | Generalized Cape Cod Method |
| `cas5-2017f-q25` | Aggregate Excess of Loss, Ceded Loss Reserve |
| `cas5-2017f-q6` | Workers Compensation Underwriting |
| `cas5-2017f-q9` | Rating Variable |
| `cas5-2018f-q1` | Liability Loss Exposure, Property Loss Exposure |
| `cas5-2018f-q12` | Balancing Back, Territorial Rating |
| `cas5-2018f-q13` | Layer of Insurance, Uniform Continuous Distribution |
| `cas5-2018f-q15` | Excess of Loss, Pro Rata Reinsurance |
| `cas5-2018f-q8` | Claims Handling |
| `cas5-2018f-q9` | Statistical Significance, Variable Selection |
| `cas5-2018s-q12` | Balancing Back |
| `cas5-2018s-q3` | Insurer Operational Data |
| `cas5-2018s-q6` | CGL Endorsements |
| `cas5-2019-q23` | Aggregate Excess of Loss |
| `cas5-2019-q4` | Excess of Loss |
| `cas5-2019-q9` | Model Training and Evaluation, Model Validation |
| `cas5-2019f-q10` | Statistical Significance |
| `cas5-2019f-q13` | Layer of Insurance |
| `cas5-2019f-q15` | Loss Sensitive Rating, Rating Plan |
| `cas5-2019f-q25` | Pro Rata Reinsurance |
| `cas5-an-007` | Automobile Insurance Reform |

## Taught only in a collapsed section

The passage that teaches these items sits inside a folded callout (a worked example, a table behind a toggle). A reader who skims never opens it.

| Page | Questions | Items |
|---|---|---|
| Loss Trend | 8 | For annual policies written uniformly over a period the rates are in effect, th…; For annual policies written on a single date each year, the average accident da…; For annual policies written uniformly over a one-year rate effective period, th… |
| Balancing Back | 4 | The relativity change factor for a class or territory is the indicated relativi…; The base class has a relativity of 1.00, so capping its rate change caps the ba…; Indicated relativity change equals indicated relativity (relative to base) divi… |
| Claims Made Coverage | 4 | Because the trend period for an occurrence policy runs from the date of loss to…; An occurrence policy premium is the sum over report lags of the loss cost at ea…; A reduction in the maximum report lag removes the later-lag loss costs from the… |
| Berquist-Sherman Method | 3 | Higher historical reported values in the adjusted triangle (with the latest dia…; The paid to reported claim ratio at each age is cumulative paid claims divided …; The Berquist-Sherman case outstanding adjustment restates the whole reported tr… |
| Large Deductible Policy | 3 | When the insurer pays all ALAE (deductible is for loss only), ALAE is calculate…; When the deductible applies to loss only and not to ALAE, the insurer bears the…; When the insurer pays all ALAE (deductible applies to loss only), ALAE is based… |
| Loss Development | 3 | When actual emergence exceeds expected emergence, the actuary should revise the…; A reported claim count development factor to ultimate well above 1.0 (highly le…; The paid-to-reported (case-incurred) claims ratio is cumulative paid claims div… |
| Loss Ratio Method | 3 | Load loss and ALAE for ULAE by multiplying by (1 + ULAE percentage of loss and …; Select the frequency/pure premium by averaging the trended, developed indicatio…; Loss and LAE are obtained by multiplying losses by (1 + LAE provision) when LAE… |
| Parallelogram Method | 3 | A longer policy term (e.g., two years) means more earned premium in a period co…; With semi-annual policies, a rate change takes six months to be fully earned in…; Longer policy terms spread rate changes over a longer earning period, so more o… |
| Unallocated Loss Adjustment Expenses ULAE | 3 | The classical ULAE technique assumes the insurer's ULAE-to-claim relationship i…; Select the ULAE ratio from the yearly ratios by judgment, giving weight to rece…; Expected ALAE or ULAE must be restated to reflect a known expense change (e.g. … |
| Actual vs Expected Analysis | 2 | Each accident year ages by 12 months over a calendar year, so the starting and …; Changes in operations, such as case reserve strengthening or faster claim repor… |
| Allocated Loss Adjustment Expense | 2 | Convert the ultimate ALAE-to-claims ratio to ultimate ALAE dollars by multiplyi…; Disadvantages of ratio techniques: errors in ultimate claims estimates carry in… |
| Coinsurance Rating | 2 | The coinsurance penalty is the amount that would have been paid without the coi…; Underinsurance makes rates inequitable: insureds with equal values and expected… |
| Complement of Credibility | 2 | Harwayne's method first restates each other state's overall pure premium at the…; The state adjustment factor for each other state equals the subject state's ove…; The Harwayne complement for a class equals the average of the other states' cla… |
| Considerations for Implementing Rates | 2 | Spreading a rate change over multiple periods or capping renewal rate changes o…; To evaluate a rating plan scenario, use the rates charged under that scenario t… |
| Excess of Loss | 2 | Policies with limits at or below a layer's attachment point contribute nothing …; To measure the basic limits loss trend, apply the severity trend factor to each… |
| Exposure Base | 2 | To select an exposure base, assess each candidate against each criterion and re…; Choose a recommended exposure base by weighing how well each candidate meets th… |
| Frequency-Severity Method | 2 | Implied average frequency is projected ultimate claim counts divided by earned …; The frequency-severity technique's appropriateness depends on the currency of i… |
| Increased Limits | 2 | The rate per $1,000 of coverage decreases as the amount of insurance increases,…; Equal ILFs at two different limits imply zero expected loss, and therefore no p… |
| Insurance to Value | 2 | When the insured carries at least the required coinsurance amount (F ≥ c × V), …; No coinsurance penalty applies to losses at or above the coinsurance requiremen… |
| On-Leveling | 2 | With annual policies, a rate change takes a full year after its effective date …; If rates have not changed during the historical experience period, the on-level… |
| Overall Rate Level Indication | 2 | Loss adjustment expense provided as a percentage of loss is included by multipl…; With full credibility, the indicated rate change is based entirely on the exper… |
| Pure Premium Method | 2 | The Premium-Based method distorts the fixed expense provision when rate changes…; To get net reinsurance cost per exposure, divide the net cost by the exposures … |
| Rating Algorithm | 2 | Capping policy-level increases leaves capped policies with premium below the in…; Remove the per-policy expense fee from the total premium to get the premium sub… |
| Rating Variable | 2 | Controllability is a social consideration: a rating variable is more acceptable…; A rating variable is socially acceptable on causality grounds if it has a direc… |
| Recoveries | 2 | For a new accident year, estimate ultimate S&S by applying the selected ultimat…; The S&S ratio at a given maturity is cumulative received salvage and subrogatio…; Estimate the ultimate S&S ratio for each accident year by multiplying its lates… |
| Settlement Rate | 2 | The Berquist-Sherman paid adjustment assumes paid dollars are proportional to c…; An accident year whose disposal rate exceeds the target rate settled claims fas… |
| Statistical Significance | 2 | If the confidence interval (about ±2 standard errors) of a GLM relativity inclu…; If a rating variable shows no statistically significant or practically meaningf…; The main effect test examines the GLM standard error bounds around each level's… |
| Adverse Selection | 1 | A one-time implementation cost can be evaluated over a short-term view (first-y… |
| Automobile Insurance Reform | 1 | The reform adjustment factor applied to pre-reform claims is one minus the refo…; Claims are affected by a law or tort reform based on the accident date: only cl… |
| Case Outstanding Development Method | 1 | Case outstanding reserve equals reported (incurred) claims minus paid claims. |
| Chain Ladder Method | 1 | Assess the reasonability of an estimate by comparing it to an independently dev… |
| Changing Conditions | 1 | The reported Bornhuetter-Ferguson technique is overstated when case reserves ar… |
| Chi-Squared Distribution | 1 | A variable's chi-squared (p-value) percentage below the significance threshold … |
| Claim Count Triangle | 1 | A higher average case reserve caused by a changed mix of open claims (e.g., onl… |
| Coinsurance | 1 | The coinsurance penalty is the amount the insured would have received without t… |
| Confidence Interval | 1 | Assess statistical significance of a GLM relativity by checking whether its +/-… |
| Credibility | 1 | Trended present rates are an appropriate complement mainly when no larger group… |
| Data Quality | 1 | When questionable values are found, especially material ones, the actuary shoul… |
| Data Validation | 1 | Reconciling data totals to financial statements is only one component of data r… |
| Earned Premium | 1 | Compute the fraction of each written cohort's exposure earned in a calendar yea… |
| Expense Provisions | 1 | Split each selected expense ratio into fixed and variable portions by multiplyi… |
| Frequency | 1 | The percent impact of a benefit change equals proposed average benefit divided … |
| Generalized Cape Cod Method | 1 | Developed (ultimate) claims must not be paired with used-up premium; developed … |
| In-Force | 1 | Premium per policy for a term shorter than a year must be annualized (e.g., mul… |
| Layer of Insurance | 1 | Compute a layer's average severity by pooling all eligible policies' claims, ta… |
| Lifetime Value | 1 | Higher persistency shifts more weight to later policy years, so a segment's mul… |
| Loss and Loss Adjustment Expense | 1 | ULAE is loaded onto loss and ALAE by multiplying by one plus the ULAE provision… |
| Minimum Premium | 1 | Identify which classes fall below the minimum premium using the new base rate a… |
| Mix of Business | 1 | When settlement patterns differ by claim size, adjust a development technique b… |
| Moral Hazard | 1 | Indirect effect on frequency: a lower maximum benefit reduces the incentive of … |
| Paid Losses | 1 | Paid development applied to an accident year containing unusually large paid cl… |
| Policy Provision Changes | 1 | A benefit/law change applying to claims occurring after its effective date affe… |
| Policy Year | 1 | A policy year of annual policies spans two years of exposure with an average wr… |
| Pure Premium Analysis | 1 | Test whether the univariate assumption holds by comparing the distribution of e… |
| Regression Tree | 1 | CART can enhance a GLM by identifying interactions between variables that can t… |
| Report Year | 1 | Average paid claim (severity) at a given age equals cumulative paid claims divi… |
| Reserving Data Organization | 1 | A segment with a large volume of data is credible enough to be analyzed on its … |
| Territorial Rating | 1 | When selecting relativities that move a fraction of the way from current to ind… |
| Ultimate Loss | 1 | Reported claims that emerge higher than expected, with paid in line with expect… |

## Every question

<details><summary><code>cas5-2013f-q1</code> · gap</summary>

Tagged pages: Exposure Base

| Item | Kind | Status | Where |
|---|---|---|---|
| An exposure base is a measure of the size of a risk (e.g., payroll, hours worked) used to scale premium, and a good exposure base should be… | definition | tagged | Exposure Base: “**Exposure Base** is the basic unit of risk that underlies the premium — the quantity the rate is c…” |
| A good exposure base should be proportional to expected losses, so that a change in the base corresponds to a proportional change in expect… | fact | tagged | Exposure Base: “**Proportional to expected loss.** All else equal, a policy with two exposures should have twice th…” |
| Workers compensation indemnity benefits are a percentage of the injured worker's wages, so payroll reflects both claim frequency and severi… | fact | missing |  |
| A good exposure base should be practical: objectively verifiable, easy to obtain, and not subject to manipulation, such as payroll that is … | fact | tagged | Exposure Base: “**Practical.** Objective, and relatively easy and inexpensive to obtain and verify — which also kee…” |
| A good exposure base should be consistent with historical precedent and industry practice, because changing it requires costly changes to d… | fact | tagged | Exposure Base: “**Consistent with historical precedence.** A change of base can cause large premium swings for indi…” |

</details>

<details><summary><code>cas5-2013f-q10</code> · untagged</summary>

Tagged pages: Classification Ratemaking, Territory Ratemaking, Pure Premium Method

| Item | Kind | Status | Where |
|---|---|---|---|
| The univariate pure premium approach computes indicated relativities from each class's (or territory's) pure premium (loss and ALAE per exp… | definition | tagged | Classification Ratemaking: “A **univariate** (one-way) pure premium or loss ratio analysis attributes to a variable the effect …” |
| Distribution (correlation) bias arises in a univariate analysis when exposures are distributed differently across levels of another rating … | fact | tagged | Classification Ratemaking: “If young drivers also drive older cars, a one-way age relativity contains part of the vehicle-age e…” |
| To adjust for distortion from another rating variable, compute adjusted (on-level) exposures by weighting each class's exposures at each le… | procedure | elsewhere | Balancing Back: “When other rating variables also apply, each class's exposures are first multiplied by their averag…” |
| Indicated pure premium for a class = reported loss and ALAE divided by its exposures (here, adjusted exposures). | formula | syllabus | Pure Premium Analysis: “$$\text{Pure Premium} = \frac{\text{Losses} + \text{LAE}}{\text{Earned Exposures}} = \text{Frequenc…” |
| The indicated relativity for each class is its pure premium divided by the pure premium of the base class (indicated relativity to base = c… | procedure | tagged | Classification Ratemaking: “$$\text{Relativity}_i = \frac{\text{Pure Premium}_i}{\text{Pure Premium}_{\text{base}}}$$” |

</details>

<details><summary><code>cas5-2013f-q11</code> · answerable</summary>

Tagged pages: Increased Limits, Large Loss, Limited Expected Value, Generalized Linear Model

| Item | Kind | Status | Where |
|---|---|---|---|
| An increased limits factor (ILF) at a given limit is the ratio of the limited average severity at that limit to the limited average severit… | definition | tagged | Increased Limits: “$$\text{ILF}(L) = \frac{E[X \wedge L]}{E[X \wedge B]}$$” |
| Compute the limited average severity at the basic limit by capping every claim from all policy limits at the basic limit (claims above it c… | procedure | tagged | Large Loss: “$$\text{Capped Loss} = \min(X, M)$$” |
| Build the ILF layer by layer: the average loss in a higher layer is measured only on claims from policies whose limits reach that layer, an… | procedure | tagged | Increased Limits: “$$\text{Layer } (M, L] \text{ cost} = \text{Basic LC} \times \left[\text{ILF}(L) - \text{ILF}(M)\ri…” |
| Losses in a layer from claims bucketed in a size range are found by subtracting the layer's lower attachment from each claim (total losses … | procedure | linked | Policy Limit: “$$Y^L = (X \wedge u) - (X \wedge d)$$” |
| The traditional empirical ILF approach assumes claim frequency is the same regardless of policy limit, whereas a GLM does not assume unifor… | fact | tagged | Increased Limits: “and frequency is the same whatever limit is chosen. The last fails for some lines — personal auto i…” |
| Reasonable ILFs should increase with the policy limit at a decreasing rate; an indicated factor below that of a lower limit (a reversal) is… | fact | tagged | Increased Limits: “So the *marginal* indemnity cost per dollar of additional limit must not increase as the limit rise…” |

</details>

<details><summary><code>cas5-2013f-q12</code> · gap</summary>

Tagged pages: Expense Provisions, Variable Expenses, Fixed Expenses

| Item | Kind | Status | Where |
|---|---|---|---|
| Rates are prospective: they should cover expected future costs over the policy period, so non-recurring or atypical expenses that are not e… | fact | tagged | Variable Expenses: “A **structural change** in distribution — moving business direct, renegotiating commission scales, …” |
| Rates should be adequate, not excessive, and not unfairly discriminatory; loading an expense that will not exist in later years makes rates… | fact | syllabus | Principles of Ratemaking: “**Principle 4 — A rate is reasonable and not excessive, inadequate, or unfairly discriminatory if i…” |
| A fixed expense divided by a small premium volume produces a very high expense ratio that falls as premium grows, so an expense ratio from … | fact | elsewhere | Expenses: “Much of the cost of servicing an account doesn't grow with its size, so the expense *ratio* falls a…” |
| The asset-share model evaluates the long-term profitability of a policy cohort, recognizing that a short-term loss on new business can be o… | definition | missing |  |
| Rates must be competitive to attract business in a new market; loading atypical costs into rates makes prices exceed competitors' and hinde… | fact | syllabus | Ratemaking Constraints: “The traditional indication sets a rate without regard to whether the product will be bought. Past s…” |
| Typical expense provisions in a rate level reflect ongoing variable costs (expenses that vary with premium or policy count), while one-time… | fact | missing |  |

</details>

<details><summary><code>cas5-2013f-q13</code> · untagged</summary>

Tagged pages: Overall Rate Level Indication, Territory Ratemaking, Classification Ratemaking, Coinsurance Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| Insurance to value (ITV) is the ratio of the amount of insurance carried to the property's full replacement cost; underinsurance means ITV … | definition | elsewhere | Insurance to Value: “**Insurance to Value** (ITV) means insuring property for its full value, or close to it, so that th…” |
| Without a coinsurance clause or guaranteed replacement cost endorsement, the insurer pays losses only up to the policy limit (insured value… | fact | elsewhere | Insurance to Value: “Most property losses are partial, so an insured who carries a low limit would otherwise pay a small…” |
| Rates are derived from historical loss experience, so when a rating structure has been recently and fully reviewed, a consistent and persis… | fact | linked | Principles of Ratemaking: “Historical data is used only as evidence about the future, which is why losses are developed to ult…” |
| Premium equity (fairness) means premiums are commensurate with expected losses and expenses for each insured or group, not that all insured… | definition | tagged | Classification Ratemaking: “In a competitive market an insurer that charges one average rate to a heterogeneous group loses the…” |
| If territorial rate differentials do not reflect differences in loss costs caused by differing insurance-to-value levels, the group with hi… | fact | elsewhere | Territorial Rating: “**Flattening a territory differential** has the effect Werner & Modlin describe for any rating vari…” |
| Territorial rate adequacy is assessed by comparing each territory's premium to its own expected losses, so a territory's rates can be adequ… | fact | tagged | Classification Ratemaking: “**Classification Ratemaking** is the segmentation of a book into rating classes and the derivation …” |

</details>

<details><summary><code>cas5-2013f-q14</code> · gap</summary>

Tagged pages: Loss Development, Loss Reserving, Accident Year, Report Year, Development Triangle

| Item | Kind | Status | Where |
|---|---|---|---|
| An accident year triangle groups claims by the year in which the accident (loss event) occurred, with rows as accident years and columns as… | definition | tagged | Accident Year: “**Accident Year** (AY) is a data aggregation method that groups losses by the calendar year in whic…” |
| A report year triangle groups claims by the year in which the claim was first reported to the insurer, so claims reported in a given year f… | definition | tagged | Report Year: “**Report Year** (RY) is a data aggregation method that groups claims by the calendar year in which …” |
| To build an incremental triangle, sum the payments made during each calendar year for the claims in each row (by accident or report year) a… | procedure | missing |  |
| Accident year triangles capture pure IBNR (incurred but not reported claims) and match losses to the exposures that generated them, so they… | fact | tagged | Accident Year: “AY matches premium and losses better than [[Calendar Year]], and its claims occur over a shorter ti…” |
| For a small company, quarterly triangles have thin, volatile data in each cell, producing unreliable development factors, so annual triangl… | fact | tagged | Development Triangle: “Finer periods are more responsive and show seasonality; they also thin the data and multiply the fa…” |
| Quarterly triangles can be more appropriate for a growing book because changing exposure volume shifts the average accident date within eac… | fact | missing |  |

</details>

<details><summary><code>cas5-2013f-q15</code> · gap</summary>

Tagged pages: Loss Reserving, Loss Development, Data Diagnostic Analysis, Data Segmentation, Homogeneity

| Item | Kind | Status | Where |
|---|---|---|---|
| The Statement of Principles Regarding P&C Loss and LAE Reserves directs the actuary to consider the appropriateness (homogeneity and consis… | fact | tagged | Data Segmentation: “**Reserving practice (Friedland):** group claims that share coverage (the same laws, policy terms a…” |
| Differences in claims handling practices, case reserve adequacy, settlement speed, or mix of business between two sets of data can distort … | fact | tagged | Data Segmentation: “Do not combine segments whose relative volume is changing — see [[Mix of Business]] and [[Reserving…” |
| Average paid claim (paid severity) equals cumulative paid losses divided by cumulative closed claim counts at each age. | formula | missing |  |
| The paid-to-reported (paid-to-incurred) loss ratio equals cumulative paid losses divided by cumulative reported losses at each age, and ind… | formula | tagged | Loss Development: “a rising ratio is consistent with faster settlement or weaker case reserves, a falling one with slo…” |
| The settlement (disposal) rate equals cumulative closed claim counts divided by cumulative reported claim counts at each age, and measures … | formula | linked | Claim Count Triangle: “The [[Settlement Rate\\|disposal rate]] is closed counts over ultimate (or reported) counts.” |
| Average case outstanding equals (reported losses minus paid losses) divided by (reported counts minus closed counts), i.e., case reserves p… | formula | tagged | Data Diagnostic Analysis: “$$\bar O_{w,d} = \frac{L^{\text{rep}}_{w,d} - L^{\text{paid}}_{w,d}}{N^{\text{open}}_{w,d}}$$” |
| To decide whether to combine data from two sources, compare diagnostics (severity, paid-to-reported, disposal rate, case outstanding) acros… | procedure | tagged | Data Segmentation: “Where a level is too thin, combine similar levels or find more data.” |
| Historical development data reflects the claims practices under which it was generated, so if a merged company adopts one company's claims … | fact | linked | Settlement Rate: “Historical paid factors — built when claims closed more slowly — then **over-develop** it and overs…” |

</details>

<details><summary><code>cas5-2013f-q16</code> · gap</summary>

Tagged pages: Frequency-Severity Method, IBNR, Loss Reserving

| Item | Kind | Status | Where |
|---|---|---|---|
| In the frequency-severity method, ultimate losses are estimated as ultimate claim count times ultimate average severity, with each componen… | procedure | tagged | Frequency-Severity Method: “Develop the count triangle to ultimate counts; develop an average severity triangle (dollars ÷ coun…” |
| Average severity at each maturity equals reported losses divided by reported claim counts at that maturity, and a severity triangle is buil… | definition | tagged | Frequency-Severity Method: “develop an average severity triangle (dollars ÷ counts at each age) to ultimate severity” |
| Age-to-age (link ratio) factors are the ratio of a later-maturity value to the prior-maturity value for the same accident year, calculated … | formula | syllabus | Age to Age Factor: “is the ratio of a cohort's cumulative amount at one maturity to its amount at the previous maturity” |
| Select age-to-age development factors by averaging the observed link ratios at each maturity (e.g., simple average), and use a tail factor … | procedure | syllabus | Age to Age Factor: “equal weight to each year, so a small, volatile year counts as much as a large one” |
| The cumulative development factor to ultimate at a given age is the product of the selected age-to-age factors from that age through the ta… | formula | linked | Chain Ladder Method: “$$U_{\text{AY}} = C_{\text{AY},\,n} \times \text{CDF}_{n \to \text{ult}}$$” |
| IBNR for an accident year equals estimated ultimate losses minus reported losses; total IBNR is the sum across accident years. | formula | tagged | IBNR: “$$\text{IBNR} = \text{Ultimate} - \text{Reported}$$” |
| Claim count and dollar triangles must be treated consistently as either cumulative or incremental when applying the frequency-severity meth… | fact | missing |  |

</details>

<details><summary><code>cas5-2013f-q17</code> · answerable</summary>

Tagged pages: Benktander Method, Bornhuetter-Ferguson Method, IBNR

| Item | Kind | Status | Where |
|---|---|---|---|
| The Bornhuetter-Ferguson ultimate equals reported claims plus the a priori expected ultimate claims (premium times expected claim ratio) ti… | formula | tagged | Bornhuetter-Ferguson Method: “U_{\text{BF}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) \times U_{0}” |
| The percent reported at a given maturity is the reciprocal of the reported CDF to ultimate, so the percent unreported is 1 - 1/CDF. | definition | tagged | Bornhuetter-Ferguson Method: “and $1 - 1/\text{CDF}$ the percentage unreported from the [[Development Triangle\\|development patte…” |
| The Benktander (iterated BF) ultimate replaces the a priori expected ultimate in the BF formula with the prior BF ultimate: U_GB = reported… | procedure | tagged | Benktander Method: “U_{\text{GB}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) U_{\text{BF}}” |
| Unpaid (or IBNR-type) claims under an ultimate-based method equal the estimated ultimate claims minus the claims reported to date. | definition | tagged | IBNR: “\text{IBNR} = \text{Ultimate} - \text{Reported}” |
| As the number of Benktander iterations increases without bound, the Benktander ultimate converges to the development (chain-ladder) techniq… | fact | tagged | Benktander Method: “Repeating $R = qU$ then $U = C + R$ from $U_0$ gives $U^{(m)} = (1 - q^m)\,U_{\text{CL}} + q^m U_0$…” |
| The development (chain-ladder) technique estimates ultimate claims as reported claims times the CDF to ultimate, so unpaid claims equal rep… | formula | linked | Chain Ladder Method: “U_{\text{AY}} = C_{\text{AY},\,n} \times \text{CDF}_{n \to \text{ult}}” |

</details>

<details><summary><code>cas5-2013f-q18</code> · gap</summary>

Tagged pages: Loss Reserving, Loss Development, Bornhuetter-Ferguson Method, Changing Conditions, Claims Processing Changes

| Item | Kind | Status | Where |
|---|---|---|---|
| Excess-of-loss layers with high attachment points have thin, volatile, sparse early data, so development-factor methods are highly leverage… | fact | tagged | Bornhuetter-Ferguson Method: “It is therefore the method of choice at **immature maturities** and for [[Long Tail Lines\\|long-tai…” |
| The Cape Cod method derives its expected loss ratio from the experience of the data itself, so it is unsuitable when there is little or no … | fact | linked | Cape Cod Method: “**Cape Cod Method** (Stanard-Bühlmann) is the [[Bornhuetter-Ferguson Method\\|Bornhuetter-Ferguson]]…” |
| The Bornhuetter-Ferguson method estimates ultimate claims as reported (or paid) claims to date plus the expected unreported (or unpaid) por… | definition | tagged | Bornhuetter-Ferguson Method: “**Bornhuetter-Ferguson Method** (BF) estimates ultimate losses by adding to what has actually been …” |
| The Berquist-Sherman settlement rate (paid) adjustment restates the historical paid claims triangle to reflect the current speed of claim s… | procedure | linked | Berquist-Sherman Method: “For each historical cell, interpolate the paid losses that *would* have been paid had that year clo…” |
| A change in claim settlement or payment speed distorts both paid and reported development patterns, while the incurred Berquist-Sherman adj… | fact | tagged | Claims Processing Changes: “A moving **disposal rate** is a [[Settlement Rate\\|settlement speed]] change and distorts **paid** …” |
| Development methods assume a stable, stationary reporting and payment pattern; a structural change such as a shortened statute of limitatio… | fact | tagged | Changing Conditions: “Every development-based estimate of [[Unpaid Claims\\|unpaid claims]] assumes the past pattern will …” |
| The case outstanding development method is best suited to claims-made coverages and is not appropriate for occurrence coverages such as wor… | fact | missing |  |
| Property catastrophe claims are reported quickly but paid slowly, so paid development factors at early maturities are very large and levera… | fact | linked | Long Tail Lines: “Because the [[Cumulative Development Factor\\|CDF]] at early maturities is large, estimates are high…” |

</details>

<details><summary><code>cas5-2013f-q19</code> · gap</summary>

Tagged pages: Loss Reserving, Unallocated Loss Adjustment Expenses ULAE, Loss and Loss Adjustment Expense, Claims Processing Changes, Allocated Loss Adjustment Expense, Reinsurance Recovery

| Item | Kind | Status | Where |
|---|---|---|---|
| When claim payments speed up but the paid loss development method still uses historical (slower-pattern) paid development factors, the meth… | fact | tagged | Claims Processing Changes: “Faster closing inflates the recent paid diagonal, so historical paid factors **over-develop** it.” |
| In the paid ALAE to paid claims ratio method, ultimate ALAE is estimated by applying the historical ratio of paid ALAE to paid claims to th… | procedure | tagged | Allocated Loss Adjustment Expense: “develop a **ratio of ALAE to loss** and apply it to projected losses.” |
| The Wendy Johnson (classical-type) ULAE method is based on claim counts and transactions (openings and closings), assuming ULAE per transac… | fact | missing |  |
| In the pure premium method, the loss pure premium equals projected ultimate losses divided by exposures, and the indicated rate is obtained… | formula | linked | Pure Premium Method: “$$\text{Indicated Rate} = \frac{\text{Pure Premium} + F}{1 - V - Q_T}$$” |
| Overstated projected ultimate losses lead to overstated pure premiums and indicated rates in ratemaking, since rates are built directly fro… | fact | linked | Pure Premium Method: “Inputs: losses developed to ultimate and trended, [[Earned Exposure\\|earned exposures]] (trended if…” |
| For an excess-of-loss reinsurance contract, the recoverable on a loss is the amount above the retention, capped at the limit (min(loss minu… | fact | linked | Reinsurance: “$$\text{Ceded}_{\text{XOL}} = \min\!\left(\max(X - R,\, 0),\, L\right)$$” |

</details>

<details><summary><code>cas5-2013f-q2</code> · gap</summary>

Tagged pages: On Level Premium, Earned Premium, On-Leveling, Extension of Exposures

| Item | Kind | Status | Where |
|---|---|---|---|
| The extension of exposures method computes on-level earned premium by multiplying earned exposures by the premium per exposure computed fro… | definition | tagged | Extension of Exposures: “**Extension of Exposures** is the [[On-Leveling\\|on-leveling]] method that re-rates every historica…” |
| Premium per exposure at current rate level equals base rate times class factor plus the expense fee, using the currently effective rates fo… | formula | tagged | Extension of Exposures: “Rating algorithm: premium $=$ base rate $\times$ territory factor $\times$ class factor $+$ policy …” |
| Policies written uniformly over a period have an average written date at the period's midpoint, so a policy of term T earns uniformly over … | fact | linked | Premium Accounting: “the **monthly pro rata** method, which assumes business is written evenly through each month, so th…” |
| Compute the fraction of each written cohort's exposure earned in a calendar year by overlapping its earning window (average written date th… | procedure | tagged | Earned Premium (collapsed): “The policy is in force for three of its twelve months during $2024$:” |
| The expense fee is a flat per-policy amount that earns pro-rata over the policy term along with the rest of the premium, so it is not fully… | fact | missing |  |

</details>

<details><summary><code>cas5-2013f-q20</code> · answerable</summary>

Tagged pages: Cape Cod Method, IBNR, Bornhuetter-Ferguson Method, Rate Level Change

| Item | Kind | Status | Where |
|---|---|---|---|
| Used-up premium is on-level premium divided by the reported CDF to ultimate (on-level premium times the percent reported); it is the premiu… | definition | tagged | Cape Cod Method: “**Used-up premium** $\text{EP}_i / \text{CDF}_i$ is the share of each year's premium "exposed" to t…” |
| The Cape Cod expected claims ratio equals total adjusted (trended, on-level) reported claims divided by total used-up premium across accide… | formula | tagged | Cape Cod Method: “The ELR is estimated as total reported losses over total *used-up* (on-level, developed) premium ac…” |
| Cape Cod IBNR for an accident year equals on-level premium times the expected claims ratio times (1 − 1/reported CDF), i.e. expected ultima… | formula | tagged | Cape Cod Method: “$$\text{IBNR}_i = \text{ELR} \times \text{EP}_i \times \left(1 - \tfrac{1}{\text{CDF}_i}\right)$$” |
| To put premiums from different accident years on a common rate level, apply on-level factors relative to the target year's factor, so the t… | procedure | tagged | Rate Level Change: “$$\text{Adjusted ELR}_i = \text{ELR}_{\text{base}} \times \frac{\text{Rate level}_{\text{base}}}{\t…” |
| Adjust each year's reported claims to the target accident year's level by applying pure premium trend and tort reform (benefit-level change… | procedure | linked | Loss Trend: “trend restates past losses to the level expected for similar losses in the *future* period.” |
| The Cape Cod ECR must be put at the target year's level and weighted by used-up premium; adjusting claims to ultimate with the CDF before d… | fact | tagged | Cape Cod Method: “Weighting by it puts each accident year on a common maturity footing, so an immature year contribut…” |

</details>

<details><summary><code>cas5-2013f-q21</code> · answerable</summary>

Tagged pages: Berquist-Sherman Method, Loss Development, Settlement Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The cumulative disposal rate is the cumulative closed claim count at a given age divided by the ultimate claim count for that accident year. | definition | tagged | Settlement Rate: “$$\text{Disposal Rate}_n = \frac{\text{Closed claims at age } n}{\text{Ultimate claim counts}}$$” |
| The Berquist-Sherman paid adjustment restates historical paid claims to the disposal rate level of the latest calendar year diagonal, remov… | fact | tagged | Berquist-Sherman Method: “Rebuild the paid triangle at the common disposal pattern and select factors from it.” |
| Compare disposal rates by age across accident years and take the latest diagonal's rate as the target at each age; only ages whose disposal… | procedure | tagged | Berquist-Sherman Method: “Select the current disposal rate pattern as the target.” |
| Adjusted cumulative paid claims are found by linearly interpolating paid claims (including the origin of zero paid at zero disposal rate) b… | procedure | tagged | Berquist-Sherman Method: “For each historical cell, interpolate the paid losses that *would* have been paid had that year clo…” |
| Age-to-age factors are volume-weighted averages: the sum of the later-age cumulative values divided by the sum of the earlier-age values fo… | formula | linked | Age to Age Factor: “$$f_{n \to n+1}^{\text{vol-wtd}} = \frac{\sum_{\text{AY}} C_{\text{AY},\,n+1}}{\sum_{\text{AY}} C_{…” |
| Cumulative development factors to ultimate are the product of subsequent age-to-age factors (including the tail factor), and ultimate claim… | procedure | tagged | Loss Development: “$$\text{CDF}_{n \to \text{ult}} = \prod_{k \ge n} f_{k \to k+1} \times \text{Tail}$$” |
| With no development after the last observed age, the tail factor is 1.000. | fact | linked | Tail Factor: “A tail of exactly $1.000$ is itself an assumption — that development is complete — and it is the wr…” |

</details>

<details><summary><code>cas5-2013f-q22</code> · untagged</summary>

Tagged pages: Reinsurance, Loss Development, Loss Reserving, Gross Losses, Net Losses, Tail Factor, Data Issues

| Item | Kind | Status | Where |
|---|---|---|---|
| A quota share treaty cedes a fixed percentage of every gross loss, so net losses under quota share equal gross losses times (1 minus the ce… | fact | linked | Pro Rata Reinsurance: “Because every policy is shared alike, a quota share reduces the cedant's net premium and net losses…” |
| An aggregate stop loss treaty caps the retained (net) losses at its attachment point, with the reinsurer paying aggregate losses above the … | fact | elsewhere | Stop-Loss Reinsurance: “Over a stated period, the reinsurer pays the amount by which the total losses $S$ exceed a retentio…” |
| Validate net (or ceded) loss data by applying the reinsurance treaty terms to the gross data and comparing the expected amounts to the repo… | procedure | linked | Net of Reinsurance: “A first check on the data is that net losses and net premium are no greater than gross.” |
| When net data is unreliable but gross data is correct, develop gross ultimate losses with a loss development method on the gross triangle, … | procedure | tagged | Net Losses: “It should be **derived, not developed**. Each component — gross, ceded, S&S, deductible recoveries …” |
| A proportional treaty such as quota share does not change the shape of the development pattern, so it leaves the tail factor unchanged rela… | fact | elsewhere | Quota Share: “For reserving, ceded losses are a scalar multiple of gross and develop on the gross pattern, unlike…” |
| An aggregate stop loss cedes losses only once retained losses exceed the attachment point, so ceded losses emerge later than gross losses a… | fact | tagged | Reinsurance: “Excess cessions attach only to large claims, which report late and settle slowly, so the ceded patt…” |

</details>

<details><summary><code>cas5-2013f-q23</code> · answerable</summary>

Tagged pages: Loss Reserving, Berquist-Sherman Method, Loss Development, Case Adequacy, Reasonableness Testing

| Item | Kind | Status | Where |
|---|---|---|---|
| Case reserve strengthening (or a slowdown in claim settlement) inflates reported claims, so reported-based methods give higher ultimates th… | fact | tagged | Case Adequacy: “**Strengthening** raises reported losses immediately, so recent age-to-age factors fall (more of th…” |
| The Berquist-Sherman method adjusts reported claims for changes in case reserve adequacy, so after adjustment reported-based ultimates move… | fact | tagged | Berquist-Sherman Method: “**Berquist-Sherman Method** restates a historical [[Development Triangle\\|triangle]] so that every …” |
| To understand the impact of a change in case reserving on the unpaid claims estimate, ask the claims department about changes in case reser… | procedure | linked | Settlement Rate: “Drivers to ask about (Friedland Ch. 4): staffing levels and adjuster caseloads, changes in settleme…” |
| Implied average frequency is projected ultimate claim counts divided by earned exposures for each accident year, and it should be stable or… | definition | linked | Frequency-Severity Method (collapsed): “An accident year has $10{,}000$ earned car-years. Projected ultimate frequency is $0.08$ claims per…” |
| Implied average severity is projected ultimate claims divided by projected ultimate claim counts for each accident year, and it should foll… | definition | linked | Claim Count Triangle: “$$\text{Severity} = \frac{\text{Ultimate Losses}}{\text{Ultimate Counts}}$$” |
| The projected loss ratio is projected ultimate claims divided by earned premium, and it is compared across accident years and against expec… | definition | linked | Reserve Adequacy: “$$\text{Implied Ultimate LR}_{\text{AY}} = \frac{\text{Selected Ultimate}}{\text{On-level Earned Pr…” |

</details>

<details><summary><code>cas5-2013f-q24</code> · answerable</summary>

Tagged pages: Loss Development, IBNR, Loss Reserving, Actual vs Expected Analysis

| Item | Kind | Status | Where |
|---|---|---|---|
| Under the reported development technique, the ultimate claims equal reported claims times the cumulative development factor (CDF) to ultima… | formula | tagged | Loss Development: “$$\text{Ultimate Losses} = \text{Losses at age } n \times \text{CDF}_{n \to \text{ult}}$$” |
| Age-to-age factors are derived from CDFs as the ratio of the CDF at the earlier age to the CDF at the later age (f = CDF_earlier / CDF_late… | fact | linked | Cumulative Development Factor: “The reciprocal is the **percentage reported** (or paid): $p_n = 1/\text{CDF}_n$, and $1 - p_n$ is t…” |
| Expected claim emergence over a period equals the selected ultimate times the change in expected percent reported (1/CDF at the end age min… | procedure | tagged | Actual vs Expected Analysis: “$$\text{Expected emergence} = U_{\text{prior}} \times \left(\frac{1}{\text{CDF}_{n+1}} - \frac{1}{\…” |
| Actual claim emergence is the change in actual reported claims over the period; comparing it with expected emergence shows whether developm… | procedure | tagged | Actual vs Expected Analysis: “**Actual vs. Expected Analysis** (A/E) compares the emergence that actually occurred in a period ag…” |
| When actual emergence exceeds expected emergence, the actuary should revise the age-to-age and tail development factors upward, and may con… | procedure | tagged | Loss Development (collapsed): “The standard responses are the [[Berquist-Sherman Method]] (restate the triangle for the changed se…” |
| Revised ultimate claims are obtained by applying the revised CDFs to the latest reported claims (the current evaluation, not the prior one)… | procedure | linked | Cumulative Development Factor: “$$\text{Ultimate} = C_n \times \text{CDF}_{n \to \text{ult}}$$” |

</details>

<details><summary><code>cas5-2013f-q3</code> · answerable</summary>

Tagged pages: Calendar Year, Policy Year, Ratemaking Data Organization, Accident Year

| Item | Kind | Status | Where |
|---|---|---|---|
| Calendar year aggregation groups premiums and losses by the date of the accounting transaction (premiums written or earned in the year, los… | definition | tagged | Calendar Year: “**Calendar Year** (CY) is a data aggregation method that groups every transaction by the calendar y…” |
| Calendar year aggregation matches losses and premiums poorly because losses from policies written in prior years can be paired with premium… | fact | tagged | Calendar Year: “CY incurred losses **mix accident years**: a CY 2024 figure contains payments and reserve changes o…” |
| Calendar year data is fixed and complete at year end with no further loss development, so it is the most timely and responsive aggregation … | fact | tagged | Calendar Year: “A calendar year **never develops** — it is closed and fixed the moment the books close.” |
| Calendar/accident year aggregation pairs calendar-year premiums with losses grouped by the date of accident occurring in the year. | definition | tagged | Ratemaking Data Organization: “**[[Accident Year]]** — losses by occurrence date against premium earned in the same year.” |
| Calendar/accident year matches losses and premiums better than calendar year but imperfectly, because premium is still based on calendar-ye… | fact | tagged | Ratemaking Data Organization: “The accepted norm for P&C insurers in the U.S. and Canada (Friedland): a better match than calendar…” |
| Accident-year losses continue to develop (IBNR, IBNER) after year end, so calendar/accident year data is less immediately available than ca… | fact | tagged | Accident Year: “An AY cohort is **not final** at year end: losses still develop as claims are reported and case res…” |
| Policy year aggregation groups all premiums and losses for policies written during a given year together, regardless of when the premiums a… | definition | tagged | Policy Year: “**Policy Year** (PY), also called underwriting year or year of account, is a data aggregation metho…” |
| Policy year aggregation gives the best match of premiums and losses because both relate to the same cohort of policies. | fact | tagged | Policy Year: “PY gives the **cleanest match** of premium to loss: every dollar of premium and every claim in the …” |
| Policy year data is the least responsive because a policy year does not close until policies written at year end expire (up to two calendar… | fact | tagged | Policy Year: “The price of that match is **time**. With annual policies a PY cohort is not fully written until $1…” |

</details>

<details><summary><code>cas5-2013f-q4</code> · gap</summary>

Tagged pages: Overall Rate Level Indication, On Level Premium, Loss Trend, Premium Trend, Parallelogram Method, Loss Ratio Method, Extension of Exposures

| Item | Kind | Status | Where |
|---|---|---|---|
| The loss ratio method indicated rate change is (projected loss and LAE ratio + fixed expense ratio) / (1 - variable expense ratio - profit … | formula | tagged | Overall Rate Level Indication: “$$\text{Indicated Change} = \frac{\text{Projected Loss \& LAE Ratio} + F\%}{1 - V - Q_T} - 1$$” |
| The parallelogram method computes on-level factors by finding, for each calendar year, the share of earned premium written at each rate lev… | procedure | tagged | Parallelogram Method: “**Werner's six steps:** date the changes and form rate level groups; find each group's area in each…” |
| With annual policies and even writing, a rate change taking effect part-way through a year affects a triangular fraction of that calendar y… | fact | tagged | Parallelogram Method: “$$A_{\text{new}} = \tfrac{1}{2}(1 - p)^2$$” |
| Two-step premium trend: first trend historical average earned premium at current rate level to the latest average written premium at curren… | procedure | tagged | Premium Trend: “**Two-step trending** is used when the recent history contains a shift the historical fit would und…” |
| Projected trend period for premium runs from the average written date of the latest period to the average written date of policies issued d… | procedure | tagged | Premium Trend: “The trend period $n$ runs from the average written date of the policies earning premium in the expe…” |
| Develop losses to ultimate by computing age-to-age factors, selecting averages (state or countrywide, if state data is volatile), forming c… | procedure | linked | Loss Development: “$$\text{CDF}_{n \to \text{ult}} = \prod_{k \ge n} f_{k \to k+1} \times \text{Tail}$$” |
| Loss trend is applied from each accident year's average accident date to the average accident date of policies the new rates will cover, an… | procedure | tagged | Loss Trend: “$t$ is the selected annual trend and $n$ the **trend period**, measured from the average date of lo…” |
| Extension of exposures is an on-leveling method that re-rates each policy at current rates, and can be used instead of the parallelogram me… | definition | tagged | Extension of Exposures: “**Extension of Exposures** is the [[On-Leveling\\|on-leveling]] method that re-rates every historica…” |
| Using finer time periods (quarterly or monthly premium data) for on-leveling better reflects uneven writing and earning patterns than annua… | fact | tagged | Parallelogram Method: “It assumes uniform writing — false for seasonal business such as boat owners, whose policies are bo…” |
| If a growing book writes more premium late in the year, the even-earning assumption understates the portion of earned premium at new rates,… | fact | missing |  |

</details>

<details><summary><code>cas5-2013f-q5</code> · answerable</summary>

Tagged pages: Large Loss, Loss Trend, Overall Rate Level Indication, Extraordinary Losses

| Item | Kind | Status | Where |
|---|---|---|---|
| The excess (large loss) factor is total excess losses divided by total limited losses (reported losses minus excess losses) over the full e… | formula | tagged | Large Loss: “$$\text{Excess Load} = \frac{\text{Expected losses above } M}{\text{Expected losses below } M}$$” |
| To apply a large loss adjustment, remove the year's actual excess losses from reported losses, develop and trend the remaining limited loss… | procedure | tagged | Large Loss: “The standard treatment has three steps: **cap** each claim at a threshold $M$ for the experience an…” |
| The trend period runs from the average accident date of the experience period (July 1 for an accident year) to the average accident date of… | procedure | tagged | Loss Trend: “In Werner & Modlin's example — accident year 2011 losses, annual policies written during 2015 — tha…” |
| Loss trend (pure premium) equals frequency trend times severity trend, applied as (1+frequency trend)(1+severity trend) compounded over the… | formula | tagged | Loss Trend: “$$1 + t_{PP} = (1 + t_{\text{freq}})(1 + t_{\text{sev}})$$” |
| In a loss ratio method with on-level premium, premium is trended to the future period by the premium trend (average premium per exposure tr… | procedure | linked | Premium Trend: “$$\text{Premium Trend Factor} = (1 + t_P)^{n}$$” |
| When exposures are inflation sensitive, exposure growth trend affects premium (premium per exposure trend is supplemented by exposure trend… | fact | linked | Premium Trend: “and from inflation in an inflation-sensitive exposure base, which Werner & Modlin treat as [[Exposu…” |
| Ultimate losses are estimated by multiplying reported losses by the loss development factor (cumulative), here applied to limited losses us… | procedure | linked | Loss Development: “$$\text{Ultimate Losses} = \text{Losses at age } n \times \text{CDF}_{n \to \text{ult}}$$” |
| A large loss adjustment is appropriate when excess losses are volatile from year to year, since a single year's excess experience is unreli… | fact | tagged | Large Loss: “**Large Losses** (shock losses) are individual claims big enough that including them at face value …” |
| When analyzing losses limited to a basic limit, premium should be adjusted to cover only the limited layer, loss development factors should… | fact | tagged | Loss Trend: “Limits **leverage** severity trend: for a positive trend, basic-limits losses trend more slowly tha…” |

</details>

<details><summary><code>cas5-2013f-q6</code> · answerable</summary>

Tagged pages: Berquist-Sherman Method, Loss Development, Pure Premium Method

| Item | Kind | Status | Where |
|---|---|---|---|
| Average case outstanding reserve is the case outstanding reserve divided by the number of open claims at the same evaluation. | definition | linked | Case Adequacy: “$$\text{Avg Case Outstanding} = \frac{\text{Case Reserves}}{\text{Open Claim Counts}}$$” |
| In the Berquist-Sherman case outstanding adjustment, keep the latest diagonal's average case outstanding and de-trend it backward at the se… | procedure | tagged | Berquist-Sherman Method: “$$\text{Adjusted Case}_{\text{AY},n} = \text{Case}_{\text{latest},n} \times \left(1 + t\right)^{-(\…” |
| Adjusted reported (incurred) loss equals adjusted average case outstanding times open claim counts, plus cumulative paid loss. | formula | tagged | Berquist-Sherman Method: “4. Multiply the restated averages by the open claim counts to get adjusted case reserves, add paid,…” |
| Develop age-to-age factors from the adjusted loss triangle, select factors by averaging, and multiply them (with a tail factor of 1.0 if no… | procedure | tagged | Loss Development: “$$\text{CDF}_{n \to \text{ult}} = \prod_{k \ge n} f_{k \to k+1} \times \text{Tail}$$” |
| Trend each accident year's losses from its average accident date to the average accident date of the future period the rates will be in eff… | procedure | linked | Loss Trend: “$t$ is the selected annual trend and $n$ the **trend period**, measured from the average date of lo…” |
| For policies of term T in effect for a period starting at the effective date, the average accident date of the prospective period is the ef… | fact | linked | Loss Trend: “The first policy is exposed $7/1/2025$–$6/30/2026$ and the last $7/1/2026$–$6/30/2027$, so the expo…” |
| Load ultimate loss and ALAE for ULAE by multiplying by one plus the ULAE provision (percent of loss and ALAE). | procedure | syllabus | Loss and Loss Adjustment Expense: “It cannot be traced to a claim, so it is estimated in aggregate — classically as the ratio of calen…” |
| Loss and LAE pure premium equals projected ultimate loss and LAE divided by earned exposures; with multiple accident years, the indicated p… | formula | syllabus | Pure Premium: “$$\text{Pure Premium} = \frac{\text{Losses} + \text{LAE}}{\text{Earned Exposures}}$$” |

</details>

<details><summary><code>cas5-2013f-q7</code> · answerable</summary>

Tagged pages: Expense Provisions, Fixed Expenses, Variable Expenses

| Item | Kind | Status | Where |
|---|---|---|---|
| Variable expenses (e.g., commissions, premium taxes) vary in proportion to premium, while fixed expenses are incurred per policy or exposur… | definition | tagged | Fixed Expenses: “**Fixed Expenses** are underwriting expenses assumed to be the same for each risk regardless of the…” |
| In the Premium-Based Projection Method, fixed and variable expenses are separated, each is divided by written or earned premium to get a fi… | procedure | tagged | Fixed Expenses: “The fixed dollars are then put per exposure either by multiplying the fixed expense ratio by the pr…” |
| In the Exposure/Policy-Based Projection Method, variable expenses are converted to a ratio to premium, while fixed expenses are divided by … | procedure | tagged | Expense Provisions: “a fixed expense *per exposure* on a base that does not inflate (car-years, house-years) or per poli…” |
| The Premium-Based method distorts the fixed expense provision when rate changes occur during or after the experience period, because fixed … | fact | linked | Pure Premium Method (collapsed): “the loss ratio method carries it as $5.7\%$ of the *current* premium ($\$24.23$)” |
| The Exposure/Policy-Based method can misstate fixed expenses because it ignores economies of scale as the book grows and because exposures … | fact | tagged | Fixed Expenses: “Because $F$ is a dollar amount, it is expected to rise with inflation.” |

</details>

<details><summary><code>cas5-2013f-q8</code> · answerable</summary>

Tagged pages: Credibility, Pure Premium Method, Overall Rate Level Indication

| Item | Kind | Status | Where |
|---|---|---|---|
| Trended ultimate loss and ALAE for an accident year equals reported loss and ALAE times the loss development factor times the loss trend fa… | formula | tagged | Pure Premium Method: “\text{Trended losses} &= \$1{,}380{,}000 \times 1.04^{2.5}” |
| Load loss and ALAE for ULAE by multiplying by (1 + ULAE percentage of loss and ALAE). | procedure | linked | Loss Ratio Method (collapsed): “LAE is $11\%$ of loss.” |
| Pure premium is losses (and LAE) divided by earned exposures; an experience pure premium is estimated by averaging the projected per-exposu… | definition | syllabus | Pure Premium: “$$\text{Pure Premium} = \frac{\text{Losses} + \text{LAE}}{\text{Earned Exposures}}$$” |
| Square root rule for partial credibility: Z = sqrt(n / full-credibility standard), capped at 1, where n is the number of claims in the expe… | formula | tagged | Credibility: “$$Z = \sqrt{\frac{n}{n_{\text{full}}}} \qquad \text{(limited fluctuation)}$$” |
| Credibility-weighted estimate = Z × experience estimate + (1 − Z) × complement of credibility, where the complement here is the regional pu… | formula | tagged | Credibility: “$$\text{Estimate} = Z \times \text{Experience} + (1 - Z) \times \text{Complement}$$” |
| Total indicated pure premium is the sum of the non-catastrophe, non-modeled catastrophe, modeled catastrophe pure premiums, reinsurance cos… | procedure | linked | Catastrophe Loss: “$$\text{Total Pure Premium} = \text{Non-Cat PP} + \text{Cat Load}$$” |
| Indicated average premium = (pure premium + fixed expense per exposure) / (1 − variable expense provision − profit and contingency provisio… | formula | tagged | Pure Premium Method: “$$\text{Indicated Rate} = \frac{\text{Pure Premium} + F}{1 - V - Q_T}$$” |
| Indicated rate change = indicated average premium / current on-level average premium − 1. | formula | tagged | Pure Premium Method: “$$\text{Indicated Change} = \frac{\text{Indicated Rate}}{\text{Current Rate}} - 1$$” |

</details>

<details><summary><code>cas5-2013f-q9</code> · untagged</summary>

Tagged pages: Territory Ratemaking, Classification Ratemaking, Considerations for Implementing Rates

| Item | Kind | Status | Where |
|---|---|---|---|
| The relativity change factor for a class or territory is the indicated relativity divided by the current relativity. | formula | elsewhere | Balancing Back (collapsed): “A class's rate change is $(1 + \Delta)\,\text{OBF}\,r_i^{\text{new}}/r_i^{\text{old}} - 1$.” |
| To make relativity changes revenue-neutral, compute the premium-weighted average of the relativity change factors and divide each class's c… | procedure | elsewhere | Balancing Back: “$$\text{OBF} = \frac{\sum_i w_i\, r_i^{\text{old}}}{\sum_i w_i\, r_i^{\text{new}}}$$” |
| Combine the revenue-neutral relativity change with the overall target rate level change by multiplying each class's revenue-neutral factor … | procedure | linked | Rate Change: “Taking $+8.0\%$ on the base rate *and* implementing the new relativities would deliver $1.08 \times…” |
| When a maximum rate change cap is imposed, cap each class whose total change exceeds the limit, and compute the premium shortfall as the ca… | procedure | tagged | Considerations for Implementing Rates: “**Capping** limits how much premium can move: a cap on the change for any level of a rating variabl…” |
| Recover the shortfall from capping by increasing the uncapped classes' rates proportionally, using a factor of one plus the shortfall divid… | procedure | tagged | Considerations for Implementing Rates: “**Capping** limits how much premium can move: a cap on the change for any level of a rating variabl…” |
| The base class has a relativity of 1.00, so capping its rate change caps the base rate change; the base rate must be reduced by the capped-… | fact | elsewhere | Balancing Back (collapsed): “The base class's relativity stays at 1.00, but its rate still changes, because the base rate carrie…” |
| Final implemented relativities for uncapped classes equal their indicated relativities times the combined adjustment factor (shortfall reco… | procedure | elsewhere | Balancing Back: “$B$ is the base rate, which is the rate charged to the base class, whose relativity is 1.00.” |

</details>

<details><summary><code>cas5-2013s-q1</code> · answerable</summary>

Tagged pages: Earned Exposure, Calendar Year, Policy Year

| Item | Kind | Status | Where |
|---|---|---|---|
| Car-years (exposure) are the number of vehicles multiplied by the policy term in years, so a 24-month policy on one vehicle represents 2 ca… | definition | tagged | Earned Exposure: “A $12$-month policy contributes **one** earned car-year in total, spread pro rata over its term: wr…” |
| Earned exposure is the portion of a policy's exposure for which coverage has already been provided as of a date, accruing evenly over the p… | definition | tagged | Earned Exposure: “**Earned Exposure** is the portion of written exposure for which coverage has actually been provide…” |
| Calendar year earned exposure counts only the exposure earned during that calendar year, regardless of when the policy was written. | definition | tagged | Earned Exposure: “With policies written **uniformly** through the year, a calendar year earns roughly half of that ye…” |
| Policy year groups all policies by the year they were written/effective, and its earned exposure at a given evaluation date is the exposure… | definition | tagged | Policy Year: “**Policy Year** (PY), also called underwriting year or year of account, is a data aggregation metho…” |
| Calendar year written exposure is recorded in the year the policy is written and is not affected by later cancellations in the original yea… | definition | tagged | Calendar Year: “**Calendar Year** (CY) is a data aggregation method that groups every transaction by the calendar y…” |
| When a policy is cancelled mid-term, the unearned exposure is returned as a negative written exposure (cancellation) in the period of cance… | procedure | linked | Unearned Premium: “In the ratemaking data both the return premium and the shortened exposure must flow through, or the…” |
| Policy year written exposure evaluated before a cancellation occurs equals the full original written exposure, and only after the cancellat… | fact | syllabus | Written Premium: “Written premium may still change after issuance — endorsements, cancellations and [[Premium Audit\\|…” |

</details>

<details><summary><code>cas5-2013s-q10</code> · untagged</summary>

Tagged pages: Expense Provisions, Principles of Ratemaking, Lifetime Value

| Item | Kind | Status | Where |
|---|---|---|---|
| Customer lifetime value (lifetime profit) analysis sums the expected profit from a policyholder over all expected future policy years, rath… | definition | tagged | Lifetime Value: “**Lifetime Value** (LTV) is the present value of the expected profit from a customer relationship o…” |
| Compute expected profit for each policy year as premium minus expected losses minus expenses per policy in force, using new business expens… | procedure | tagged | Lifetime Value: “$$\text{LTV} = \sum_{t=1}^{T} \frac{\left(P_t - L_t - E_t\right) \times {}_{t}p}{(1 + r)^{t}}$$” |
| Persistency (retention) is the probability that a policyholder renews; cumulative persistency for a given year is the product of the renewa… | definition | tagged | Lifetime Value: “$$\text{Retention Ratio} = \frac{\text{Policies renewed}}{\text{Policies eligible to renew}}$$” |
| Weight each year's expected profit and premium by cumulative persistency, and discount each to present value by dividing by (1+i)^(t-1), wi… | procedure | tagged | Lifetime Value: “$$\text{LTV} = \sum_{t=1}^{T} \frac{\left(P_t - L_t - E_t\right) \times {}_{t}p}{(1 + r)^{t}}$$” |
| Lifetime profit as a percentage of premium equals the sum of persistency-weighted discounted profits divided by the sum of persistency-weig… | formula | elsewhere | Profit Margin: “$$\text{Profit margin} = \frac{\text{NPV}}{\text{EPV of premiums}}$$” |
| Lifetime value analysis differs from standard ratemaking in that it uses a multi-year horizon, models persistency, discounts cash flows to … | fact | tagged | Lifetime Value: “The professional boundary matters: the **indication** is an actuarial estimate of expected cost; LT…” |

</details>

<details><summary><code>cas5-2013s-q11</code> · answerable</summary>

Tagged pages: Classification Ratemaking, Credibility, Complement of Credibility

| Item | Kind | Status | Where |
|---|---|---|---|
| Using credit score as a rating variable raises concerns that it lacks a demonstrable causal link to loss, may act as a proxy for socioecono… | fact | tagged | Classification Ratemaking: “**Social** — privacy, causality, controllability and affordability; these are where public and regu…” |
| A rating variable that insureds cannot control (such as age) raises fairness concerns, and one whose indicated relativities run opposite to… | fact | tagged | Classification Ratemaking: “**Social** — privacy, causality, controllability and affordability; these are where public and regu…” |
| A rating variable whose characteristics are costly or difficult to verify and subject to insured manipulation, or whose class definitions a… | fact | tagged | Classification Ratemaking: “**Operational** — objective, inexpensive to obtain and verify, not manipulable by the insured.” |
| Good rating variables show meaningful loss cost differentiation, have objective and well-defined levels, and are inexpensive to administer;… | fact | tagged | Classification Ratemaking: “**Operational** — objective, inexpensive to obtain and verify, not manipulable by the insured.” |
| The indicated relativity of a class equals its pure premium divided by the base (or total) pure premium; the competitor relativities must b… | formula | tagged | Classification Ratemaking: “$$\text{Relativity}_i = \frac{\text{Pure Premium}_i}{\text{Pure Premium}_{\text{base}}}$$” |
| Under the square root rule, partial credibility is Z = sqrt(n / full credibility standard), where n is the expected claim count (exposures … | formula | tagged | Credibility: “Partial credibility uses the **square root rule**, $Z = \sqrt{n / n_{\text{full}}}$, capped at $1$ …” |
| The credibility-weighted relativity is Z times the indicated relativity plus (1 − Z) times the complement of credibility, here the competit… | formula | tagged | Credibility: “$$\text{Estimate} = Z \times \text{Experience} + (1 - Z) \times \text{Complement}$$” |
| After credibility weighting, re-base the relativities by dividing each by the base class's credibility-weighted relativity so the base clas… | procedure | tagged | Classification Ratemaking: “$$\text{Relativity}_i = \frac{\text{Pure Premium}_i}{\text{Pure Premium}_{\text{base}}}$$” |

</details>

<details><summary><code>cas5-2013s-q12</code> · gap</summary>

Tagged pages: Classification Ratemaking, Generalized Linear Model

| Item | Kind | Status | Where |
|---|---|---|---|
| If the confidence interval (about ±2 standard errors) of a GLM relativity includes the base level's value of 1.00, the level is not statist… | fact | elsewhere | Statistical Significance (collapsed): “Its relativity is $1.10$ with interval $[0.96, 1.26]$, which includes $1.00$. The data cannot tell …” |
| A narrow confidence interval together with large exposure volume means a GLM relativity is reliable and the indicated factor can be selecte… | fact | tagged | Classification Ratemaking: “risk classes should be large enough to allow credible statistical inferences about expected outcomes” |
| Levels with sparse data produce wide confidence intervals and unreliable GLM estimates, so the indicated factors should be moved judgmental… | fact | tagged | Generalized Linear Model: “The GLM gives that small segment full credibility, driving one coefficient very high and the other …” |
| Rating factors for ordered levels such as deductibles should be monotonic, with higher deductibles having lower or equal factors; GLM resul… | fact | tagged | Generalized Linear Model: “In a frequency or pure premium GLM, a deductible above the base often gets a significant positive c…” |
| When a GLM indication for a sparse or counterintuitive level is unreliable, select a factor judgmentally that fits a smooth monotone patter… | procedure | missing |  |
| If a rating variable shows no statistically significant or practically meaningful difference from the base, or has insufficient data, do no… | procedure | elsewhere | Statistical Significance (collapsed): “Either combine it with the base or credibility-weight its indication.” |

</details>

<details><summary><code>cas5-2013s-q13</code> · answerable</summary>

Tagged pages: Self-Insured Retention, Expense Provisions, Deductible Rating, Large Deductible Policy, Loss Elimination Ratio

| Item | Kind | Status | Where |
|---|---|---|---|
| The loss elimination ratio (LER) for a deductible is the fraction of ground-up losses that fall at or below the deductible, i.e., the porti… | definition | tagged | Loss Elimination Ratio: “**Loss Elimination Ratio** (LER) is the proportion of ground-up losses removed by a deductible — th…” |
| Split ground-up losses into losses below the deductible (LER × ground-up) and excess losses above the deductible ((1 − LER) × ground-up); t… | procedure | tagged | Large Deductible Policy: “$$\text{Excess Losses} = E[X] \times \big(1 - \text{LER}(d)\big)$$” |
| When the insurer pays all ALAE (deductible is for loss only), ALAE is calculated as a percentage of ground-up losses and is included in ful… | fact | tagged | Large Deductible Policy (collapsed): “ALAE is $9\%$ of ground-up losses and is not reduced by the deductible.” |
| On a large deductible policy where the insurer pays and handles all claims and seeks reimbursement, the premium includes a deductible proce… | fact | tagged | Deductible Rating: “On a large deductible policy the insurer may pay the whole claim and seek reimbursement below the d…” |
| An additional risk margin load is applied to the excess losses retained by the insurer on a large deductible policy. | fact | tagged | Large Deductible Policy: “*Risk margin* — losses above a large deductible are more uncertain than those below, so the profit …” |
| Premium = (expected losses + ALAE + other loads + fixed expenses) / (1 − variable expense ratio − profit ratio), with fixed expenses in the… | formula | tagged | Large Deductible Policy: “$$\text{Premium} = \frac{\text{Excess Losses} + \text{ALAE} + F + \text{CR} + \text{RM}}{1 - V - Q}…” |

</details>

<details><summary><code>cas5-2013s-q14</code> · gap</summary>

Tagged pages: Classification Ratemaking, Overall Rate Level Indication, Considerations for Implementing Rates

| Item | Kind | Status | Where |
|---|---|---|---|
| A capping rule limits the premium change an individual policy can receive at renewal to a maximum percentage increase or decrease, regardle… | definition | tagged | Considerations for Implementing Rates: “**Capping** limits how much premium can move: a cap on the change for any level of a rating variabl…” |
| Capping policy-level increases leaves capped policies with premium below the indicated level, so rates are inadequate and the overall imple… | fact | linked | Rating Algorithm (collapsed): “The $+11.8\%$ factor change delivers $+9.0\%$ — and the gap does not close by itself: the capped po…” |
| A capping rule adds operational complexity: it must be programmed into rating systems, and it may require a premium transition plan to phas… | fact | tagged | Considerations for Implementing Rates: “The base rate must reflect the transition — the actuary decides whether the target average premium …” |
| Capping can worsen adverse selection because high-risk insureds with capped increases stay while low-risk insureds who receive decreases or… | fact | missing |  |
| Insurers adopt capping rules to improve policyholder retention, since large renewal premium increases cause customers to shop competitors a… | fact | tagged | Considerations for Implementing Rates: “a **premium transition rule** caps any one renewal's change (at $15\%$, an insured due $+20\%$ gets…” |
| Regulations in some jurisdictions limit the maximum rate change a policyholder may receive at a single renewal, which can make a capping ru… | fact | missing |  |

</details>

<details><summary><code>cas5-2013s-q15</code> · answerable</summary>

Tagged pages: Retrospective Rating, Large Loss

| Item | Kind | Status | Where |
|---|---|---|---|
| The retrospective premium is RP = (Basic Premium + Loss Conversion Factor × Limited Losses) × Tax Multiplier. | formula | tagged | Retrospective Rating: “$$R = \left(\text{BP} + L \times \text{LCF}\right) \times \text{TM}$$” |
| The basic premium is Standard Premium × [expense allowance excluding taxes − (LCF − 1) × expected loss ratio + net insurance charge], where… | formula | tagged | Retrospective Rating: “**The expense part of $B$** is $e - (c - 1)E$ as a percentage of guaranteed-cost premium, where $e$…” |
| Apply the per-accident loss limitation by capping each claim's reported loss at the limit before summing to get limited losses for the retr… | procedure | tagged | Retrospective Rating: “**Converted losses** $(L \times \text{LCF})$ are the insured's reported losses $L$, limited by any …” |
| The final retrospective premium is bounded by the minimum and maximum premiums, computed as the minimum/maximum premium ratios times Standa… | procedure | tagged | Retrospective Rating: “$$\text{Retro Premium} = \min\!\left(\max(R,\, R_{\min}),\, R_{\max}\right)$$” |
| Retrospective premium is adjusted periodically as reported losses are re-evaluated; when premium is at the maximum it can only stay flat or… | fact | tagged | Retrospective Rating: “Outside it, nothing. So the insured is buying:” |

</details>

<details><summary><code>cas5-2013s-q16</code> · gap</summary>

Tagged pages: Loss Development, Loss Reserving, Claim Count Triangle, Reserving Data Organization

| Item | Kind | Status | Where |
|---|---|---|---|
| An age-to-age (link ratio) factor is the ratio of cumulative claim counts at one development age to the cumulative count at the previous ag… | definition | linked | Age to Age Factor: “**Age-to-Age Factor** (link ratio) is the ratio of a cohort's cumulative amount at one maturity to …” |
| Project ultimate claims by multiplying the latest cumulative value by the cumulative development factor, which is the product of the select… | procedure | linked | Chain Ladder Method: “**Chain Ladder Method** (development or link-ratio method) projects each cohort to ultimate by mult…” |
| Select age-to-age factors by averaging the observed factors in a column (e.g., a simple average of available factors). | procedure | linked | Age to Age Factor: “**Simple average** — equal weight to each year, so a small, volatile year counts as much as a large…” |
| When age-to-age factors show seasonality across accident periods, such as systematically different factors for first-half versus second-hal… | fact | missing |  |
| Claim counts assumed to have no development after the last age use a tail factor of 1.000, so the cumulative factor includes only the remai… | fact | linked | Tail Factor: “A tail of exactly $1.000$ is itself an assumption — that development is complete — and it is the wr…” |
| An accident year's ultimate is obtained by estimating ultimate for each of its accident half-years from its own latest diagonal value and s… | fact | missing |  |
| Using shorter accident periods (half-years) rather than full accident years captures seasonality in development patterns, which annual data… | fact | linked | Development Triangle: “Finer periods are more responsive and show seasonality; they also thin the data and multiply the fa…” |
| With rapidly growing exposures, the average accident date within a full accident year shifts away from the midpoint; shorter accident perio… | fact | missing |  |

</details>

<details><summary><code>cas5-2013s-q17</code> · gap</summary>

Tagged pages: Loss Development, Self-Insured Retention, Loss Reserving, Case Outstanding Development Method, External Information in Reserving

| Item | Kind | Status | Where |
|---|---|---|---|
| The case outstanding development technique estimates total unpaid claims (case outstanding plus IBNR) for an accident year by multiplying c… | definition | tagged | Case Outstanding Development Method: “**Case Outstanding Development Method** projects future payments from the **case outstanding** bala…” |
| The case outstanding development factor equals (RCDF − 1) × PCDF / (PCDF − RCDF) + 1, equivalently RCDF × (PCDF − 1)/(PCDF − RCDF), where R… | formula | missing |  |
| Reported claims equal ultimate divided by the reported CDF, paid claims equal ultimate divided by the paid CDF, case outstanding equals rep… | fact | linked | Unpaid Claims: “$$\text{Unpaid} = \text{Ultimate} - \text{Paid to date}$$” |
| A limitation of the case outstanding development technique is that industry benchmark CDFs may not reflect the entity's own claims mix, set… | fact | tagged | External Information in Reserving: “Two books with the same nominal line code can have very different development if one is written at …” |
| A limitation of the case outstanding development technique is that a large unusual open claim in case outstanding is scaled by the same fac… | fact | linked | Chain Ladder Method: “A [[Large Loss\\|shock loss]] reported early is multiplied by the full CDF.” |
| A limitation of the case outstanding development technique is that the factor is highly leveraged, so small errors in the selected CDFs (es… | fact | linked | Long Tail Lines: “Because the [[Cumulative Development Factor\\|CDF]] at early maturities is large, estimates are high…” |
| The case outstanding development technique is particularly useful when case outstanding is the only claims data available, such as when an … | fact | missing |  |

</details>

<details><summary><code>cas5-2013s-q18</code> · gap</summary>

Tagged pages: Bornhuetter-Ferguson Method, Loss Development, Cape Cod Method, Credibility

| Item | Kind | Status | Where |
|---|---|---|---|
| The Bornhuetter-Ferguson method assumes that claims reported (or paid) to date carry no information about future development, so the unrepo… | fact | tagged | Bornhuetter-Ferguson Method: “**Bornhuetter-Ferguson Method** (BF) estimates ultimate losses by adding to what has actually been …” |
| The BF ultimate equals claims to date plus (1 - percent reported or paid) times the a priori expected ultimate claims (ELR x premium). | formula | tagged | Bornhuetter-Ferguson Method: “$$U_{\text{BF}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) \times U_{0}$$” |
| The BF ultimate can be written as a credibility-weighted average of the development method ultimate and the expected claims ultimate, with … | fact | tagged | Bornhuetter-Ferguson Method: “BF is a **credibility weighting** in disguise: it equals $Z \, U_{\text{CL}} + (1-Z)\,U_0$ with $Z …” |
| The credibility interpretation of BF breaks down when cumulative percent reported or paid exceeds 100% (e.g. due to salvage and subrogation… | fact | missing |  |
| Percent reported is generally greater than percent paid at a given maturity, so the reported BF gives more weight to the development method… | fact | tagged | Loss Development: “**Reported (incurred) development** is normally faster than **paid development**, because claims ar…” |
| The Cape Cod method estimates the expected loss ratio from the data as total reported (or paid) losses divided by total used-up premium (pr… | definition | tagged | Cape Cod Method: “The ELR is estimated as total reported losses over total *used-up* (on-level, developed) premium ac…” |
| Cape Cod and BF are similar in estimating unreported claims from an expected loss ratio times percent unreported, but differ in that BF use… | fact | tagged | Bornhuetter-Ferguson Method: “Where no reliable external ELR exists, the [[Cape Cod Method\\|Cape Cod]] technique derives one from…” |

</details>

<details><summary><code>cas5-2013s-q19</code> · gap</summary>

Tagged pages: Frequency-Severity Method, IBNR, Loss Trend, Exposure Trend

| Item | Kind | Status | Where |
|---|---|---|---|
| Ultimate claim counts (or ultimate severities) equal reported counts (or severities) divided by the percentage reported at that maturity; t… | formula | linked | Claim Count Triangle: “$$\text{Ultimate Counts} = N_n \times \text{CDF}^{\text{count}}_{n \to \text{ult}}$$” |
| Trend historical ultimate frequency and severity (and exposure such as payroll) to the projected accident year's level by applying the annu… | procedure | tagged | Loss Trend: “$t$ is the selected annual trend and $n$ the **trend period**, measured from the average date of lo…” |
| Pure premium equals frequency times severity, where frequency is ultimate claim counts per unit of exposure (e.g. payroll); ultimate loss f… | formula | tagged | Frequency-Severity Method: “$$U = \text{Exposures} \times \text{Frequency}_{\text{ult}} \times S_{\text{ult}}$$” |
| Accident year data affected by an unusual event (such as a temporary slowdown in claim opening) is unreliable for selecting frequency and s… | fact | missing |  |
| Select the frequency/pure premium by averaging the trended, developed indications from the reliable accident years, with the averaging choi… | procedure | linked | Loss Ratio Method (collapsed): “whether to weight the three years by premium volume (as here — summing losses and premium across ye…” |
| IBNR equals estimated ultimate losses minus reported losses, where reported losses equal reported claim counts times reported average sever… | formula | tagged | IBNR: “$$\text{IBNR} = \text{Ultimate} - \text{Reported}$$” |

</details>

<details><summary><code>cas5-2013s-q2</code> · answerable</summary>

Tagged pages: Premium Trend, Earned Premium, On Level Premium

| Item | Kind | Status | Where |
|---|---|---|---|
| Premium trend measures the change in average premium per exposure over time (due to shifts in mix of business such as coverages, deductible… | definition | tagged | Premium Trend: “**Premium Trend** is the change over time in the average premium per exposure at a *constant rate l…” |
| Select a premium trend by computing average written premium per exposure for successive overlapping 12-month periods, finding the change be… | procedure | tagged | Premium Trend: “The trend is measured on the **average premium per exposure at current rate level**, usually from w…” |
| In one-step trending, project the historical earned premium at current rate level by applying the trend factor raised to the period from th… | procedure | tagged | Premium Trend: “The trend period $n$ runs from the average written date of the policies earning premium in the expe…” |
| For annual policies written uniformly, the average written date of a calendar year's earned premium is the start of that year (January 1), … | fact | tagged | Premium Trend: “for calendar-year 2011 earned premium and annual policies written in 2013, $1/1/2011$ to $6/30/2013…” |
| Premium trend should be based on written premium at current rate level, not at historical rate levels, because historical-rate-level premiu… | fact | linked | Written Premium: “Written premium is the right measure for production, market share, commission (paid on writings) an…” |
| Moving insureds to a higher deductible shifts more loss to the insured, lowering expected losses and the premium charged, so average premiu… | fact | tagged | Premium Trend: “a move of insureds to higher deductibles” |

</details>

<details><summary><code>cas5-2013s-q20</code> · gap</summary>

Tagged pages: Loss Development, Loss Reserving, Data Diagnostic Analysis, Settlement Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| Average paid claim (severity) at a given age equals cumulative paid claims divided by cumulative closed claim counts; average reported clai… | formula | syllabus | Report Year (collapsed): “\text{Avg severity at 12 mo} &= \frac{\$6{,}150{,}000}{820} = \$7{,}500 \\[4pt]” |
| Average case outstanding equals case outstanding claims divided by outstanding claim counts, and the closed-to-reported claim count ratio e… | formula | linked | Case Adequacy: “$$\text{Avg Case Outstanding} = \frac{\text{Case Reserves}}{\text{Open Claim Counts}}$$” |
| Compare diagnostics down the columns of the triangle (same age, successive accident years), compute year-to-year changes, and compare them … | procedure | tagged | Data Diagnostic Analysis: “Reading **down a column** compares years at the same age, which shows trends and mix.” |
| A rising closed-to-reported count ratio at a given age indicates that claims are being settled faster (a change in settlement rate). | fact | tagged | Data Diagnostic Analysis: “**Faster [[Settlement Rate\\|settlement]]:** closure rates and paid-to-reported rise together.” |
| The paid development method is distorted by a change in settlement rate because historical paid CDFs are applied to paid amounts that are f… | fact | tagged | Settlement Rate: “- **Faster settlement** pushes losses from open to paid, so the recent paid diagonal is high relati…” |
| A change in settlement rate alters the mix of open claims, so an apparent change in average case outstanding may not indicate a change in c… | fact | missing |  |
| If average reported claims move in line with the underlying severity trend, case adequacy is stable and the unadjusted reported development… | fact | linked | Case Adequacy: “It should grow at roughly the severity trend.” |

</details>

<details><summary><code>cas5-2013s-q21</code> · answerable</summary>

Tagged pages: Loss Development, IBNR, Actual vs Expected Analysis, Settlement Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| Expected paid (or reported) claims emerging in a calendar period for an accident year equal its ultimate claims times the difference betwee… | formula | tagged | Actual vs Expected Analysis: “$$\text{Expected emergence} = U_{\text{prior}} \times \left(\frac{1}{\text{CDF}_{n+1}} - \frac{1}{\…” |
| Each accident year ages by 12 months over a calendar year, so the starting and ending ages for the expected emergence are read from the cum… | fact | tagged | Actual vs Expected Analysis (collapsed): “At $12/31/2023$, AY 2022 was estimated at ultimate $\$10{,}000{,}000$ with $60\%$ reported at $24$ …” |
| Compare actual emergence in the period (current cumulative less prior cumulative reported or paid claims) with expected emergence to identi… | procedure | tagged | Actual vs Expected Analysis: “- A/E is run **by accident year and by maturity**, on paid and reported separately. Where the devia…” |
| A speed-up in claim settlement (shorter settlement lag) makes paid claims exceed expectations while reported claims (paid plus case reserve… | fact | tagged | Settlement Rate: “- **Faster settlement** pushes losses from open to paid, so the recent paid diagonal is high relati…” |
| The paid development technique is distorted by changes in settlement rates because historical paid patterns no longer apply, while the repo… | fact | tagged | Settlement Rate: “- **Reported data is largely immune**, because reported losses include the case reserve whether or …” |

</details>

<details><summary><code>cas5-2013s-q22</code> · answerable</summary>

Tagged pages: Loss Reserving, Frequency-Severity Method, Self-Insured Retention, Changing Conditions, Data Diagnostic Analysis, Expected Loss Method

| Item | Kind | Status | Where |
|---|---|---|---|
| A change in the per-occurrence retention or limit changes the layer of loss in the data, so historical claim data and development triangles… | fact | tagged | Self-Insured Retention: “the development technique assumes stable retention limits over the experience period — so factors m…” |
| Increased limits factors or loss limitation factors are applied to restate losses from one retention or limit level to another. | formula | syllabus | Increased Limits: “$$\text{ILF}(L) = \frac{E[X \wedge L]}{E[X \wedge B]}$$” |
| A change in the risk profile of the insured (such as a shift in workforce mix to lower-hazard jobs) changes claim frequency and severity, s… | fact | syllabus | Frequency: “rising frequency at flat severity points at underwriting, mix or the claim environment” |
| In the expected claims method, put historical exposures and claims on current levels by adjusting for retention changes, risk profile chang… | procedure | tagged | Changing Conditions: “adjust a priori ratios for rate level and trend; segment for mix; restate history to current retent…” |
| A self-insured entity has no premium for its retained layer, so exposure bases such as payroll are used rather than premium, and premium on… | fact | tagged | Self-Insured Retention: “Self-insurers collect no premium in the insurer's sense, so exposure bases such as payroll, vehicle…” |
| Before using the frequency-severity method, examine a triangle of average severity (e.g. paid loss divided by closed claim counts) by accid… | procedure | tagged | Data Diagnostic Analysis: “Reading **down a column** compares years at the same age, which shows trends and mix.” |
| Before using the frequency-severity method, examine claim frequency (claim counts per unit of exposure such as payroll) by accident year fo… | procedure | syllabus | Frequency: “rising frequency at flat severity points at underwriting, mix or the claim environment” |

</details>

<details><summary><code>cas5-2013s-q23</code> · answerable</summary>

Tagged pages: Berquist-Sherman Method, Loss Development, Loss Reserving, Case Adequacy

| Item | Kind | Status | Where |
|---|---|---|---|
| Average case outstanding is the case outstanding reserve divided by the number of open claim counts at the same evaluation. | definition | tagged | Case Adequacy: “$$\text{Avg Case Outstanding} = \frac{\text{Case Reserves}}{\text{Open Claim Counts}}$$” |
| In the Berquist-Sherman case outstanding adjustment, take the latest diagonal average case outstanding at each age as the base and restate … | procedure | tagged | Berquist-Sherman Method: “$$\text{Adjusted Case}_{\text{AY},n} = \text{Case}_{\text{latest},n} \times \left(1 + t\right)^{-(\…” |
| Adjusted case outstanding equals the adjusted average case outstanding multiplied by the actual open claim counts for each cell. | procedure | tagged | Berquist-Sherman Method: “Multiply the restated averages by the open claim counts to get adjusted case reserves, add paid, an…” |
| Adjusted cumulative reported claims equal cumulative paid claims plus adjusted case outstanding. | formula | tagged | Berquist-Sherman Method: “$$\text{Adjusted Reported}_{\text{AY},n} = \text{Paid}_{\text{AY},n} + \text{Adjusted Case}_{\text{…” |
| The Berquist-Sherman case outstanding adjustment is used when case reserve adequacy has changed over time, restating historical case reserv… | fact | tagged | Berquist-Sherman Method: “restates a historical [[Development Triangle\\|triangle]] so that every year reflects **current** cl…” |
| Higher historical reported values in the adjusted triangle (with the latest diagonal unchanged) lower the age-to-age development factors, w… | fact | tagged | Berquist-Sherman Method (collapsed): “in the original triangle, the $12$-month column was artificially *low* in the old years relative to…” |

</details>

<details><summary><code>cas5-2013s-q24</code> · answerable</summary>

Tagged pages: Salvage and Subrogation, Loss Development

| Item | Kind | Status | Where |
|---|---|---|---|
| A volume-weighted (all-year weighted) average age-to-age factor for a development age is the sum of the later-age values divided by the sum… | formula | linked | Age to Age Factor: “$$f_{n \to n+1}^{\text{vol-wtd}} = \frac{\sum_{\text{AY}} C_{\text{AY},\,n+1}}{\sum_{\text{AY}} C_{…” |
| In the development method, the cumulative development factor to ultimate is the product of the selected age-to-age factors from the current… | procedure | tagged | Loss Development: “$$\text{CDF}_{n \to \text{ult}} = \prod_{k \ge n} f_{k \to k+1} \times \text{Tail}$$” |
| Salvage and subrogation development approach: develop the paid salvage and subrogation triangle by itself with age-to-age factors to projec… | procedure | tagged | Salvage and Subrogation: “S&S must be **projected on its own triangle**, not scaled from losses.” |
| Salvage and subrogation ratio approach: compute the ratio of paid S&S to paid claims (gross of S&S) at each age, select an ultimate ratio f… | procedure | syllabus | Recoveries: “**Salvage and subrogation** (Friedland Ch. 14) are projected either by the development technique on…” |
| With no development after the last triangle age, the tail factor is 1.000, so the ratio or S&S at the last observed age is ultimate. | fact | linked | Tail Factor: “A tail of exactly $1.000$ is itself an assumption — that development is complete — and it is the wr…” |
| The ratio approach is generally preferred for immature accident years because it is more stable and less leveraged than applying large deve… | fact | syllabus | Recoveries: “The ratio's development factors are less leveraged than those of S&S dollars, and the ultimate rati…” |

</details>

<details><summary><code>cas5-2013s-q25</code> · answerable</summary>

Tagged pages: Unallocated Loss Adjustment Expenses ULAE, Loss and Loss Adjustment Expense, Loss Reserving

| Item | Kind | Status | Where |
|---|---|---|---|
| Reported (incurred) claims for a calendar year equal paid claims plus the change in case reserves plus the change in IBNR over the year. | formula | syllabus | Calendar Year: “\text{CY Incurred Losses (finance)} = \text{Paid} + \Delta\text{Case Reserves} + \Delta\text{IBNR}” |
| The Kittel ULAE ratio for a calendar year is paid ULAE divided by the average of paid claims and reported (incurred) claims. | formula | tagged | Unallocated Loss Adjustment Expenses ULAE: “R_{\text{Kittel}} = \frac{\text{Paid ULAE}}{0.5(\text{Paid Loss}) + 0.5(\text{Incurred Loss})}” |
| Compute the ULAE ratio separately for each calendar year, examine the trend for stability, and select a ratio rather than pooling all years… | procedure | tagged | Unallocated Loss Adjustment Expenses ULAE: “Compute the ratio $R$ of calendar-year paid ULAE to calendar-year paid loss, review it for trend, a…” |
| The classical ULAE reserve is the selected ratio times [50% of case reserves plus 100% of pure IBNR], since half of a claim's ULAE is spent… | formula | tagged | Unallocated Loss Adjustment Expenses ULAE: “\text{ULAE Reserve} = R \times \left(0.5 \times \text{Case} + 1.0 \times \text{IBNR}\right)” |
| On a claims-made policy, all covered claims are reported by the end of the policy period, so there is no pure IBNR; IBNR consists of develo… | fact | linked | IBNR: “**A claims-made book has no pure IBNR** by construction — every claim in a [[Report Year\\|report ye…” |
| The purpose of the Kittel adjustment is to improve the classical paid-to-paid method for growing lines of business, where paid claims under… | fact | tagged | Unallocated Loss Adjustment Expenses ULAE: “The classical ratio is distorted in a growing book, because paid ULAE reflects today's claim *activ…” |
| The classical method assumes ULAE is split 50/50 between opening and closing a claim; this assumption is inflexible and is not addressed by… | fact | tagged | Unallocated Loss Adjustment Expenses ULAE: “If ULAE is assumed to be spent half at reporting and half at settlement, only $50\%$ remains on rep…” |

</details>

<details><summary><code>cas5-2013s-q26</code> · answerable</summary>

Tagged pages: Loss Reserving, Loss Development, Bornhuetter-Ferguson Method, Case Adequacy, Data Diagnostic Analysis

| Item | Kind | Status | Where |
|---|---|---|---|
| If case reserves are strengthened (case adequacy increases), the reported claims triangle shows artificially high development, so applying … | fact | tagged | Case Adequacy: “Applying historical factors — built under weaker reserving — to a strengthened diagonal **over-stat…” |
| If claim settlement slows down, paid amounts at the evaluation date are lower than historical patterns imply, so applying historical paid C… | fact | linked | Settlement Rate: “**Slower settlement** does the reverse and understates ultimate from paid data.” |
| Large differences between paid-based and reported-based ultimate estimates for an accident year signal a change in case reserve adequacy or… | fact | tagged | Case Adequacy: “**Paid data is immune**, so a divergence between paid and reported chain ladder estimates is the co…” |
| To test for case reserve strengthening, compare average case outstanding per open claim across accident years at the same maturity, looking… | procedure | tagged | Case Adequacy: “**The diagnostic is average case outstanding per open claim**, compared *down each column* of the t…” |
| To test for a settlement slowdown, compare paid-to-reported claim ratios or closed-to-reported count ratios across accident years at the sa… | procedure | tagged | Loss Development: “a rising ratio is consistent with faster settlement or weaker case reserves, a falling one with slo…” |
| To choose a projection method, consult the claims department about changes in case reserving or settlement practices, confirm the cause wit… | procedure | tagged | Loss Reserving: “Meet claims, underwriting and operations to identify changes in coding, processing, case reserving,…” |
| The Berquist-Sherman technique adjusts the reported (case outstanding) triangle to restore consistent case reserve adequacy levels before a… | procedure | tagged | Case Adequacy: “The remedy is the [[Berquist-Sherman Method\\|Berquist-Sherman]] case adjustment: restate historical…” |

</details>

<details><summary><code>cas5-2013s-q3</code> · answerable</summary>

Tagged pages: Overall Rate Level Indication, Loss Trend, On Level Premium, Loss Ratio, Loss Development, Loss Ratio Method

| Item | Kind | Status | Where |
|---|---|---|---|
| On-level historical earned premium to current rate level (e.g., with the parallel-grid/extension-of-exposures method) so that loss ratios a… | procedure | tagged | On Level Premium: “**On-Level Premium** is historical earned premium restated as though every policy had been written …” |
| Apply loss trend (frequency and severity changes) to historical losses to project them to the cost level of the future period during which … | procedure | tagged | Loss Trend: “**Loss Trend** is the annual rate of change in loss cost over time — driven by inflation, the legal…” |
| Apply loss development factors to reported losses to develop them to ultimate, capturing IBNR and further development so that loss ratios a… | procedure | tagged | Loss Development: “Development has two drivers: **pure IBNR** (claims that occurred but have not yet been reported) an…” |
| A rate indication should include unallocated loss adjustment expense (ULAE) in addition to allocated loss adjustment expense, because ULAE … | fact | linked | Unallocated Loss Adjustment Expenses ULAE: “In **ratemaking**, ULAE may be handled as a load on losses or as a [[Fixed Expenses\\|fixed expense]…” |
| Combining years' loss ratios should use a premium-weighted (volume-weighted) average rather than a simple average, so that years with more … | fact | tagged | Overall Rate Level Indication: “Weighting across years in the experience period is a judgment: many companies sum projected losses …” |
| In the loss ratio method, fixed expenses should be treated separately from variable expenses (added to the loss ratio / handled via a fixed… | fact | tagged | Loss Ratio Method: “The first form is Werner's: [[Fixed Expenses\\|fixed expenses]] as a ratio in the **numerator**, [[V…” |
| Rate indication data should be on a consistent basis: accident-year losses should be matched with premium on a consistent (e.g., accident-y… | fact | linked | Calendar Year: “CY incurred losses **mix accident years**: a CY 2024 figure contains payments and reserve changes o…” |
| The profit provision in a rate indication can reflect investment income, accounting for the time value of money between premium receipt and… | fact | linked | Profit and Contingency Provision: “Total return also includes investment income on policyholder-supplied funds (the loss and unearned …” |

</details>

<details><summary><code>cas5-2013s-q4</code> · answerable</summary>

Tagged pages: Bornhuetter-Ferguson Method, Loss Development, IBNR, Rate Level Change, Loss Trend

| Item | Kind | Status | Where |
|---|---|---|---|
| The reported Bornhuetter-Ferguson ultimate loss equals reported losses to date plus expected losses (premium times expected loss ratio) tim… | formula | tagged | Bornhuetter-Ferguson Method: “$C$ is reported (or paid) losses to date, $U_0 = \text{ELR} \times \text{EP}$ the a priori expectat…” |
| To use historical selected loss ratios as the expected loss ratio for a new accident year, adjust each to the new year's level by trending … | procedure | tagged | Rate Level Change: “$$\text{Adjusted ELR}_i = \text{ELR}_{\text{base}} \times \frac{\text{Rate level}_{\text{base}}}{\t…” |
| The parallelogram method computes on-level factors for calendar year earned premium with annual policies by finding the fraction of each ye… | procedure | linked | On-Leveling: “For **annual** policies written uniformly, a rate change effective at time $p$ through year $Y$ ear…” |
| With annual policies, a rate change takes a full year after its effective date to be fully earned, so calendar year earned premium reflects… | fact | linked | On-Leveling (collapsed): “Calendar year $2025$ would be fully at the new level, with an on-level factor of $1.000$. Notice ho…” |
| Putting premium on current rate level raises premium, so the on-level factor divides (lowers) the historical loss ratio, while loss trend c… | fact | tagged | Rate Level Change: “$$\text{On-Level Factor} = \frac{\text{Current cumulative index}}{\text{Index in force during the p…” |
| The percentage of loss reported at a given maturity is the reciprocal of the reported loss development factor, and the unreported share (1 … | fact | tagged | Bornhuetter-Ferguson Method: “BF is a **credibility weighting** in disguise: it equals $Z \, U_{\text{CL}} + (1-Z)\,U_0$ with $Z …” |

</details>

<details><summary><code>cas5-2013s-q5</code> · gap</summary>

Tagged pages: Overall Rate Level Indication, On Level Premium, Loss Trend, Premium Trend, Loss Ratio Method, Permissible Loss Ratio

| Item | Kind | Status | Where |
|---|---|---|---|
| Age-to-age development factors are ratios of reported losses at successive evaluation ages for each accident year, and a selected factor (e… | formula | missing |  |
| The cumulative development factor to ultimate at a given age is the product of the selected age-to-age factors from that age through the ta… | formula | linked | Loss Development: “$$\text{Ultimate Losses} = \text{Losses at age } n \times \text{CDF}_{n \to \text{ult}}$$” |
| If rates have not changed during the historical experience period, the on-level factor is 1.00 and no premium adjustment for rate changes i… | fact | linked | On-Leveling (collapsed): “Calendar year $2025$ would be fully at the new level, with an on-level factor of $1.000$.” |
| Trend periods run from the average date of the historical period (average accident date for losses, average written date for premium) to th… | procedure | tagged | Loss Trend: “$t$ is the selected annual trend and $n$ the **trend period**, measured from the average date of lo…” |
| Trended values are computed by compounding the annual trend rate over the trend period: historical amount × (1 + trend)^t, applied to losse… | formula | tagged | Loss Trend: “$$\text{Trend Factor} = (1 + t)^{n}$$” |
| Loss adjustment expense provided as a percentage of loss is included by multiplying losses by (1 + LAE provision). | procedure | tagged | Overall Rate Level Indication (collapsed): “2023: \; 7{,}100 \times 1.16 \times 1.06^{3.0} \times 1.10 &= \$10{,}790 \text{K} \\” |
| The permissible loss ratio equals 1 minus the variable expense ratio minus the underwriting profit and contingencies provision; fixed expen… | formula | tagged | Permissible Loss Ratio: “$$\text{VPLR} = 1 - V - Q_T \quad \text{(variable permissible loss ratio)}$$” |
| When variable expenses change during the future rate period (e.g., a commission cut), compute the permissible loss ratio for each sub-perio… | procedure | missing |  |
| With fixed expenses as a ratio to premium, the indicated rate change = (projected loss & LAE ratio + fixed expense ratio) / permissible los… | formula | tagged | Overall Rate Level Indication: “$$\text{Indicated Change} = \frac{\text{Projected Loss \& LAE Ratio} + F\%}{1 - V - Q_T} - 1$$” |

</details>

<details><summary><code>cas5-2013s-q6</code> · answerable</summary>

Tagged pages: Claims Made Coverage, IBNR, Loss Trend, Occurrence Coverage

| Item | Kind | Status | Where |
|---|---|---|---|
| Pure IBNR is the portion of IBNR for claims that have occurred but have not yet been reported, whereas IBNER (incurred but not enough repor… | definition | tagged | IBNR: “**Pure IBNR** (narrow IBNR) covers claims that have occurred but are unknown to the insurer.” |
| A mature claims-made policy has no pure IBNR at the end of the report year because all claims reported during the period are known, so its … | fact | tagged | IBNR: “**A claims-made book has no pure IBNR** by construction — every claim in a [[Report Year\\|report ye…” |
| A claims-made policy covers claims reported during the policy period regardless of when the loss occurred, while an occurrence policy cover… | definition | tagged | Claims Made Coverage: “**Claims-Made Coverage** is a policy trigger under which the policy responds to claims *reported* d…” |
| When claim costs are increasing, a claims-made policy costs less than an occurrence policy because its claims are reported at near-current … | fact | tagged | Claims Made Coverage: “A claims-made policy should always cost less than an occurrence policy **as long as claim costs are…” |
| Because the trend period for an occurrence policy runs from the date of loss to a distant report date, a change in trend compounds over a l… | fact | tagged | Claims Made Coverage (collapsed): “because the occurrence policy's claims are reported further into the future, where trend has pushed…” |
| A retroactive date on a claims-made policy restricts coverage to claims from losses occurring on or after that date. | definition | tagged | Claims Made Coverage: “**Claims-Made Coverage** is a policy trigger under which the policy responds to claims *reported* d…” |
| When an insured switches from an occurrence policy to claims-made without a retroactive date, a loss that occurred during the occurrence po… | fact | tagged | Claims Made Coverage: “Switching the other way, from occurrence to claims-made, the retroactive date should be coordinated…” |
| When an insured switches from claims-made to occurrence coverage, there is a gap for losses that occurred during the claims-made period but… | fact | tagged | Claims Made Coverage: “An **extended reporting endorsement** (ERP, or "tail coverage") covers claims that occurred during …” |

</details>

<details><summary><code>cas5-2013s-q7</code> · answerable</summary>

Tagged pages: Loss Trend, Policy Provision Changes

| Item | Kind | Status | Where |
|---|---|---|---|
| To project historical losses to a future rate period, trend each accident year's losses from its average accident date to the average accid… | procedure | tagged | Loss Trend: “$t$ is the selected annual trend and $n$ the **trend period**, measured from the average date of lo…” |
| For annual policies written uniformly over a period the rates are in effect, the average accident date of the future period is the average … | procedure | tagged | Loss Trend (collapsed): “The first policy is exposed $7/1/2025$–$6/30/2026$ and the last $7/1/2026$–$6/30/2027$, so the expo…” |
| A benefit change that applies to losses by accident date affects losses from accidents after the change date, while a benefit change that a… | fact | tagged | Policy Provision Changes: “Changes attach to the **policy**, so they phase in over the policy term.” |
| To bring historical losses stated at an old benefit level to the benefit level in effect for the future rate period, multiply by a benefit … | procedure | tagged | Policy Provision Changes: “**Benefit-level changes** in statutory lines (workers compensation reform, auto no-fault changes) a…” |
| In workers compensation indemnity loss projection, wage inflation acts as an annual trend on indemnity benefits and is applied as a separat… | fact | tagged | Loss Trend: “**Loss Trend** is the annual rate of change in loss cost over time — driven by inflation, the legal…” |

</details>

<details><summary><code>cas5-2013s-q8</code> · gap</summary>

Tagged pages: Loss Trend, Exponential Trend, Underwriting Changes

| Item | Kind | Status | Where |
|---|---|---|---|
| Ultimate loss equals reported (or paid) loss to date multiplied by the age-to-ultimate loss development factor at the loss's current maturi… | formula | linked | Loss Development: “$$\text{Ultimate Losses} = \text{Losses at age } n \times \text{CDF}_{n \to \text{ult}}$$” |
| Age-to-ultimate factors are cumulative factors applied directly at the current age; they should not be multiplied or compounded again as if… | fact | linked | Loss Development: “$$\text{Ultimate Losses} = \text{Losses at age } n \times \text{CDF}_{n \to \text{ult}}$$” |
| Determine an accident year's maturity in months at the evaluation date (months from the start of the accident year to the valuation date) t… | procedure | missing |  |
| The trend factor equals (1 + frequency trend) × (1 + severity trend), or equivalently (1 + pure premium trend), raised to the trend period … | formula | tagged | Loss Trend: “$$1 + t_{PP} = (1 + t_{\text{freq}})(1 + t_{\text{sev}})$$” |
| Estimate trend rates by fitting an exponential curve to historical frequency, severity or pure premium data; the choice of number of points… | procedure | tagged | Loss Trend: “Linear and exponential regressions are the most common measures; exponential models may be fit to t…” |
| When a past change (such as underwriting guideline revisions) altered the book's composition, historical trends mixing pre- and post-change… | fact | tagged | Loss Trend: “A **two-step** trend is used when the trend in the historical period differs from the trend expecte…” |
| The historical trend period runs from the average accident date of the experience period to the latest data point (end of the experience da… | procedure | tagged | Loss Trend: “losses are first trended at a *current* trend from the experience period's average accident date to…” |
| For annual policies written on a single date each year, the average accident date of a policy period is the midpoint of the policy term's y… | fact | tagged | Loss Trend (collapsed): “The first policy is exposed $7/1/2025$–$6/30/2026$ and the last $7/1/2026$–$6/30/2027$, so the expo…” |

</details>

<details><summary><code>cas5-2013s-q9</code> · answerable</summary>

Tagged pages: Expense Provisions, Overall Rate Level Indication, Loss Ratio, Fixed Expenses, Variable Expenses, Permissible Loss Ratio

| Item | Kind | Status | Where |
|---|---|---|---|
| The permissible loss ratio when all expenses are variable equals 1 minus the variable expense ratio minus the profit and contingency provis… | formula | tagged | Expense Provisions: “The **variable permissible loss ratio** is what is left after the variable expense and profit provi…” |
| The loss ratio indicated rate change equals experience loss ratio divided by permissible loss ratio, minus 1. | formula | tagged | Permissible Loss Ratio: “$$\text{Indicated Change} = \frac{\text{Projected Loss \& LAE Ratio}}{\text{PLR}} - 1$$” |
| When fixed expenses are separated, the indicated rate change equals (experience loss ratio + fixed expense ratio) divided by (1 - variable … | formula | tagged | Overall Rate Level Indication: “$$\text{Indicated Change} = \frac{\text{Projected Loss \& LAE Ratio} + F\%}{1 - V - Q_T} - 1$$” |
| Fixed expenses do not scale with premium, so they are added to the experience loss ratio in the numerator, while only variable expenses red… | fact | tagged | Fixed Expenses: “$F$ enters the **numerator** of the rate; [[Variable Expenses\\|variable expenses]] $V$ and the prof…” |
| Treating all expenses as variable overcharges large-premium risks and undercharges small-premium risks, so separating fixed expenses improv… | fact | tagged | Expense Provisions: “Treating a fixed cost as variable over-charges large policies and under-charges small ones.” |
| Fixed and variable expenses behave and trend differently over time, so separating them allows separate trending and monitoring of each expe… | fact | tagged | Expense Provisions: “Expense **trend**: a variable expense ratio needs none, since it changes with premium automatically.” |

</details>

<details><summary><code>cas5-2014f-q1</code> · answerable</summary>

Tagged pages: Exposure Base, Frequency, Rating Algorithm, Severity

| Item | Kind | Status | Where |
|---|---|---|---|
| A good exposure base is proportional to expected losses, meaning twice the exposure implies twice the expected loss. | fact | tagged | Exposure Base: “All else equal, a policy with two exposures should have twice the expected loss of a similar policy…” |
| A good exposure base is practical: objective, easy to obtain, and inexpensive to verify and administer, and not easily manipulated by the i… | fact | tagged | Exposure Base: “Objective, and relatively easy and inexpensive to obtain and verify — which also keeps policyholder…” |
| A good exposure base should take historical precedence into account, since changing the base can cause large premium swings, costly system … | fact | tagged | Exposure Base: “A change of base can cause large premium swings for individual insureds, requires a change in the r…” |
| Claim frequency equals claim counts divided by exposures, so changing to an exposure base with larger numerical values lowers frequency (an… | formula | tagged | Frequency: “$$\text{Frequency} = \frac{\text{Number of Claims}}{\text{Earned Exposures}}$$” |
| Claim severity equals loss dollars divided by claim counts, so it does not depend on the exposure base and is unaffected by a change in exp… | formula | tagged | Severity: “$$\text{Severity} = \frac{\text{Total Losses}}{\text{Number of Claims}}$$” |
| An exposure base change shifts premiums among insureds; those with premium increases may leave for other insurers, producing adverse or fav… | fact | tagged | Exposure Base: “Objective, and relatively easy and inexpensive to obtain and verify — which also keeps policyholder…” |

</details>

<details><summary><code>cas5-2014f-q10</code> · gap</summary>

Tagged pages: Generalized Linear Model, Neural Network, Predictive Analytics

| Item | Kind | Status | Where |
|---|---|---|---|
| To evaluate a rating variable's predictive value in a GLM, examine the indicated relativities by level: a consistent, monotonic pattern wit… | procedure | tagged | Generalized Linear Model: “Output is judged on more than significance: consistency of the pattern across levels, standard erro…” |
| Consistency test: compare a variable's indicated relativities across individual years; if the yearly curves follow similar patterns and dir… | procedure | missing |  |
| Levels with few exposures have volatile, less credible results, so disparities at those levels do not invalidate the stable results at well… | fact | missing |  |
| CART (classification and regression trees) is a data mining technique that builds a tree-structured series of if-then splits to identify re… | definition | elsewhere | Regression Tree: “A **regression tree** is a [[Decision Tree\\|decision tree]] for a quantitative [[Response Variable\…” |
| CART can enhance a GLM by identifying interactions between variables that can then be included as interaction terms in the GLM. | fact | elsewhere | Regression Tree (collapsed): “The tree has built an interaction between vehicle age and garaging, which a linear model would incl…” |
| A neural network is a data mining technique that is trained on data and automatically learns the structure of the data, essentially an iter… | definition | tagged | Neural Network: “A **Neural Network** (also called an **artificial neural network** or **multilayer perceptron**) is…” |
| A neural network can enhance a GLM analysis by identifying missing predictive variables not yet included in the GLM. | fact | missing |  |

</details>

<details><summary><code>cas5-2014f-q11</code> · gap</summary>

Tagged pages: Territory Ratemaking, Full Credibility Standard, Pure Premium Method, Large Loss, Credibility

| Item | Kind | Status | Where |
|---|---|---|---|
| In the pure premium method, the indicated pure premium for each class is its ultimate losses (including loaded ALAE) divided by its earned … | procedure | tagged | Pure Premium Method: “**Pure Premium Method** derives the indicated **rate** directly: project loss and LAE per exposure,…” |
| Loss and ALAE are combined by multiplying ultimate losses by (1 + ratio of ALAE to loss). | formula | syllabus | Allocated Loss Adjustment Expense: “$$\text{ALAE Ratio} = \frac{\text{ALAE}}{\text{Indemnity}}$$” |
| Indicated relativities are computed by dividing each class's pure premium by the overall (total) pure premium, normalizing so the exposure-… | procedure | missing |  |
| Under the square root rule, credibility Z = min(1, sqrt(exposures / full credibility standard)). | formula | linked | Limited Fluctuation Credibility: “$$Z = \min\!\left(1,\, \sqrt{\frac{n}{n_{\text{full}}}}\right)$$” |
| The credibility-weighted relativity is Z times the indicated relativity plus (1 − Z) times the complement, which is the current relativity … | procedure | tagged | Credibility: “$$\text{Estimate} = Z \times \text{Experience} + (1 - Z) \times \text{Complement}$$” |
| To restate relativities to a chosen base class, divide each class's credibility-weighted relativity by the base class's credibility-weighte… | procedure | tagged | Territory Ratemaking: “$$\text{Territory Relativity}_i = \frac{\text{Pure Premium}_i}{\text{Pure Premium}_{\text{base}}}$$” |
| The univariate pure premium method assumes rating variables are uncorrelated and ignores correlation between them, so correlated variables … | fact | linked | Classification Ratemaking: “A **univariate** (one-way) pure premium or loss ratio analysis attributes to a variable the effect …” |
| Large (shock) losses are capped or removed from the class experience to reduce volatility and distortion, and an excess/large loss load der… | procedure | tagged | Large Loss: “The standard treatment has three steps: **cap** each claim at a threshold $M$ for the experience an…” |

</details>

<details><summary><code>cas5-2014f-q12</code> · untagged</summary>

Tagged pages: Lifetime Value, Considerations for Implementing Rates, Insurance Premium, Present Value

| Item | Kind | Status | Where |
|---|---|---|---|
| Asset share pricing evaluates the profitability of a policy over multiple policy periods (long term) and reflects persistency, separate new… | fact | tagged | Lifetime Value: “**Lifetime Value** (LTV) is the present value of the expected profit from a customer relationship o…” |
| Cumulative persistency for a policy year is the product of the annual persistency (renewal) rates through that year, i.e., the probability … | definition | tagged | Lifetime Value: “the year-$t$ profit is received with probability $p^{t}$” |
| Present value of premiums in an asset share model for a policy year equals premium times cumulative persistency divided by the discount fac… | formula | elsewhere | Profit Margin: “$$\text{EPV of premiums} = \sum_{t=0}^{n-1} P\,{}_tp_x\,(1+r)^{-t}$$” |
| Present value of profit for a policy year equals the per-policy-in-force profit (income) times cumulative persistency divided by the discou… | formula | tagged | Lifetime Value: “$$\text{LTV} = \sum_{t=1}^{T} \frac{\left(P_t - L_t - E_t\right) \times {}_{t}p}{(1 + r)^{t}}$$” |
| Return on equity in an asset share model is the present value of profit divided by the present value of required surplus (premium-to-surplu… | formula | elsewhere | Return on Capital: “$$\iota = \frac{M}{Q}$$” |
| Lower persistency reduces the weight of later, profitable renewal years relative to the unprofitable first year (due to new-business expens… | fact | tagged | Lifetime Value: “The acquisition swings from $+\$147$ to $-\$92$ on the retention assumption alone.” |
| When asset share results are sensitive to persistency and the company seeks growth, rather than raising rates (which would reduce persisten… | fact | tagged | Lifetime Value: “Modelling renewal probability as a function of the rate change offered lets an insurer see the trad…” |

</details>

<details><summary><code>cas5-2014f-q13</code> · answerable</summary>

Tagged pages: Unpaid Claims, Reinsurance, Ultimate Loss, Loss Ratio, Reserve Adequacy

| Item | Kind | Status | Where |
|---|---|---|---|
| A redundant unpaid claim estimate is one that exceeds the amount ultimately needed to pay the claims (overstated liabilities), while an ina… | definition | tagged | Reserve Adequacy: “$$\text{Redundancy / (Deficiency)} = \text{Carried Reserve} - \text{Indicated Reserve}$$” |
| Unpaid claim estimates feed into reported loss ratios and profitability, so a redundant estimate makes a book look less profitable and an i… | fact | tagged | Reserve Adequacy: “Redundancy is a profit deferral; deficiency understates the loss ratio, overstates surplus, and fee…” |
| Internal management uses unpaid claim estimates for pricing, reinsurance purchasing, capital allocation, and line-of-business growth or exi… | fact | tagged | Reserve Adequacy: “The second consequence is the one that compounds, and it is the reason reserve adequacy findings be…” |
| Investors rely on reported results from unpaid claim estimates to decide where to invest; redundant estimates understate profitability and … | fact | tagged | Unpaid Claims: “Accuracy matters beyond the balance sheet: unpaid claim estimates drive solvency assessment, [[Rate…” |
| Regulators use unpaid claim estimates to assess insurer solvency; if they take the estimate as accurate, a redundant estimate may lead to u… | fact | tagged | Unpaid Claims: “Accuracy matters beyond the balance sheet: unpaid claim estimates drive solvency assessment, [[Rate…” |

</details>

<details><summary><code>cas5-2014f-q14</code> · answerable</summary>

Tagged pages: Reserving Data Organization, Reserve Adequacy, Accident Year, Development Triangle, Data Diagnostic Analysis

| Item | Kind | Status | Where |
|---|---|---|---|
| Build a cumulative accident-year triangle by assigning each claim's calendar-year amounts to its accident year and accumulating across deve… | procedure | tagged | Accident Year: “The **occurrence date** alone decides the year. A policy written $10/1/2023$ with a loss on $2/4/20…” |
| Reported (incurred) claims at a valuation are cumulative paid claims plus ending case outstanding reserves. | definition | linked | Incurred Losses: “**Incurred Losses** — more precisely **reported losses** — are cumulative [[Paid Losses\\|payments]]…” |
| Reported claim count by accident year counts a claim in the accident year of its accident date once its report date has occurred by the val… | procedure | tagged | Accident Year: “The **occurrence date** alone decides the year.” |
| Closed claim count is the cumulative number of reported claims that are closed, defined here as case outstanding equal to zero, at each val… | definition | linked | Claim Count Triangle: “- **Closed counts** — how fast claims settle. The [[Settlement Rate\\|disposal rate]] is closed coun…” |
| Diagnostic triangles are derived from the base triangles as ratios or averages, such as paid to reported, closed to reported counts, averag… | procedure | tagged | Development Triangle: “The *comparison* between them is where the diagnostics live: paid-to-reported ratios, average case …” |
| Changes in diagnostic ratios indicate operational changes. A rising paid-to-reported ratio suggests faster payments or weaker case reserve … | fact | tagged | Data Diagnostic Analysis: “**[[Case Adequacy\\|Case strengthening]]:** average case outstanding rises faster than trend on the …” |

</details>

<details><summary><code>cas5-2014f-q15</code> · answerable</summary>

Tagged pages: Expected Loss Method, Bornhuetter-Ferguson Method, Earned Premium, Accident Year, Policy Provision Changes

| Item | Kind | Status | Where |
|---|---|---|---|
| In the expected claims technique, IBNR is the expected ultimate claims (expected claims ratio times exposure/premium) minus reported claims… | procedure | tagged | Expected Loss Method: “$$\text{IBNR} = U - \text{Reported}$$” |
| To select an expected claims ratio, bring each prior year's reported claims to ultimate with the reported development factor, adjust to the… | procedure | tagged | Expected Loss Method: “The **ELR** is the whole method, and it must be derived, not assumed: from the pricing indication f…” |
| Trend adjustment factor to bring a year's claims to the target year's level is (1 + annual trend) raised to the number of years between the… | formula | linked | Loss Trend: “$$\text{Trend Factor} = (1 + t)^{n}$$” |
| A benefit/law change applying to claims occurring after its effective date affects an accident year only in proportion to the share of that… | procedure | tagged | Policy Provision Changes (collapsed): “So on an accident year basis the change phases in over **two years**, at approximately $50\%$ and $…” |
| The expected claims ratio is selected from years that are developed to ultimate and adjusted to the current level; the most recent immature… | fact | linked | Cape Cod Method: “Weighting by it puts each accident year on a common maturity footing, so an immature year contribut…” |

</details>

<details><summary><code>cas5-2014f-q16</code> · gap</summary>

Tagged pages: Claim Count Triangle, Development Factor, Accident Year, Seasonality

| Item | Kind | Status | Where |
|---|---|---|---|
| An age-to-age (link ratio) reported claim count development factor is the ratio of reported claim counts at one maturity to those at the pr… | definition | tagged | Development Factor: “$$f_{n \to n{+}1} = \frac{\text{Losses at age }n{+}1}{\text{Losses at age }n}$$” |
| When accident periods in different parts of the year (e.g., first half vs. second half) show systematically different development patterns,… | fact | missing |  |
| When seasonality is present, select age-to-age factors separately for each season by averaging only factors from accident periods of the sa… | procedure | missing |  |
| The cumulative development factor to ultimate at a given age is the product of the selected age-to-age factors from that age through the la… | formula | linked | Loss Development: “$$\text{CDF}_{n \to \text{ult}} = \prod_{k \ge n} f_{k \to k+1} \times \text{Tail}$$” |
| Project ultimate claim counts for each accident period by multiplying its latest reported claim count by the cumulative development factor … | procedure | tagged | Claim Count Triangle: “$$\text{Ultimate Counts} = N_n \times \text{CDF}^{\text{count}}_{n \to \text{ult}}$$” |
| Assess the reasonability of an estimate by comparing it to an independently developed benchmark estimate and commenting on whether it is to… | procedure | linked | Chain Ladder Method (collapsed): “— a $103\%$ loss ratio, against an a priori of $65\%$, driven by one claim.” |

</details>

<details><summary><code>cas5-2014f-q17</code> · gap</summary>

Tagged pages: Frequency-Severity Method, Calendar Year, Unpaid Claims, Severity, Changing Conditions, Settlement Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| A disposal rate is the cumulative closed claim count at an evaluation divided by the ultimate claim count for the accident year. | definition | tagged | Settlement Rate: “$$\text{Disposal Rate}_n = \frac{\text{Closed claims at age } n}{\text{Ultimate claim counts}}$$” |
| To adjust for changing closure rates, project future incremental closed counts for the accident year by applying the incremental disposal r… | procedure | missing |  |
| Incremental paid severity equals incremental paid claims divided by incremental closed claim counts for the same period (not cumulative sev… | formula | syllabus | Severity Analysis: “Reported losses over reported counts, paid over closed, ultimate over ultimate” |
| Severity trend is measured by the year-over-year ratios of incremental severities between adjacent accident years at the same age, with eac… | procedure | linked | Inflation: “For an insurer operating in a stable environment, the average case outstanding should increase down…” |
| To project future incremental severities for an accident year, start from the latest diagonal severity for that accident year and trend it … | procedure | tagged | Frequency-Severity Method: “Project the number of claims closing in each future period from historical **disposal rates**, valu…” |
| Unpaid claims equal the sum over future periods of projected incremental closed claim counts times projected incremental severities. | procedure | tagged | Frequency-Severity Method: “Project the number of claims closing in each future period from historical **disposal rates**, valu…” |
| A rise in disposal rates in the latest calendar year indicates claims are closing faster (open for less time); severity trend diagnostics s… | fact | tagged | Settlement Rate: “**Faster settlement** pushes losses from open to paid, so the recent paid diagonal is high relative…” |

</details>

<details><summary><code>cas5-2014f-q18</code> · answerable</summary>

Tagged pages: Benktander Method, Accident Year, Credibility, Insurance Premium

| Item | Kind | Status | Where |
|---|---|---|---|
| The Bornhuetter-Ferguson IBNR equals expected claims (on-level premium times expected claims ratio) multiplied by the percent unreported, (… | formula | linked | Bornhuetter-Ferguson Method: “$$\text{IBNR} = \left(1 - \tfrac{1}{\text{CDF}}\right) \times \text{ELR} \times \text{EP}$$” |
| The percent unreported equals 1 - 1/CDF, where 1/CDF is the percent reported (expected proportion of ultimate claims reported to date). | definition | tagged | Benktander Method: “**Notation.** $C$ is reported (or paid) losses to date, $p = 1/\text{CDF}$ is the percentage develo…” |
| The Benktander ultimate equals reported claims plus the percent unreported times the prior-iteration (BF) ultimate estimate; i.e., it is a … | formula | tagged | Benktander Method: “$$U_{\text{GB}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) U_{\text{BF}}$$” |
| Benktander IBNR is obtained as the Benktander ultimate minus reported claims, which equals the BF ultimate times the percent unreported (no… | procedure | tagged | Benktander Method: “The reserve mixes the same way, $R_{\text{GB}} = q\,U_{\text{BF}} = p\,R_{\text{CL}} + q\,R_{\text{…” |
| The Benktander estimate is a credibility weighting of the BF and the development (chain-ladder) techniques, with weight on the development … | fact | tagged | Benktander Method: “[[Credible Claims Reserves: The Benktander Method (Mack - 2000)\\|Mack (2000)]] shows the result is …” |
| The development (chain-ladder) IBNR equals reported claims times the CDF minus reported claims. | formula | linked | Cumulative Development Factor: “$$\text{Ultimate} = C_n \times \text{CDF}_{n \to \text{ult}}$$” |

</details>

<details><summary><code>cas5-2014f-q19</code> · gap</summary>

Tagged pages: Loss Development, Berquist-Sherman Method, Loss Ratio, Accident Year, Changing Conditions, Case Adequacy, Mix of Business

| Item | Kind | Status | Where |
|---|---|---|---|
| The reported (incurred) development technique estimates ultimate claims by multiplying reported claims to date by a cumulative loss develop… | definition | tagged | Loss Development: “$$\text{Ultimate Losses} = \text{Losses at age } n \times \text{CDF}_{n \to \text{ult}}$$” |
| If case outstanding adequacy strengthens (e.g., reserves set at policy limits), reported claims rise relative to history, so historical LDF… | fact | tagged | Changing Conditions: “*Case strengthening*: reported development overstates, reported BF and Cape Cod overstate less; pai…” |
| When case outstanding adequacy has changed, improve the estimate with the Berquist-Sherman case outstanding adjustment, or use a paid devel… | procedure | tagged | Berquist-Sherman Method: “**Berquist-Sherman Method** restates a historical [[Development Triangle\\|triangle]] so that every …” |
| Rapid growth in written premium during the year shifts the average accident date of the latest accident year later, so that year is less ma… | fact | missing |  |
| To correct for a shifted average accident date from rapid growth, use development triangles by shorter intervals such as accident quarters,… | procedure | linked | Development Triangle: “Triangles may be annual, semi-annual or quarterly. Finer periods are more responsive and show seaso…” |
| Excess-of-basic-limits coverage develops more slowly and is more volatile than basic-limits coverage, so historical LDFs understate develop… | fact | elsewhere | Excess Loss Development Factor: “**Leverage.** Late development lands mostly above the deductible, so the LER falls with maturity ($…” |
| For a new excess-limits product lacking relevant history, use industry benchmark development patterns (or adjust the pattern with a new tai… | procedure | linked | Expected Loss Method: “The right use is a **very immature** cohort (a few months old), a **new line or programme** with no…” |

</details>

<details><summary><code>cas5-2014f-q2</code> · answerable</summary>

Tagged pages: Ratemaking Data Organization, Insurance Premium, Premium Audit, Earned Premium, Written Premium

| Item | Kind | Status | Where |
|---|---|---|---|
| Calendar year earned premium is the premium earned on all policies during the calendar year, equal to the portion of each policy's term fal… | definition | tagged | Earned Premium: “- **Calendar year** earned premium blends policy cohorts: CY 2024 earned premium comes from policie…” |
| Calendar year written premium is the premium on policies written (effective) during the calendar year, plus premium changes such as audits … | definition | tagged | Written Premium: “Written premium may still change after issuance — endorsements, cancellations and [[Premium Audit\\|…” |
| Policy year earned and written premium are assigned by the policy's effective date: a policy year includes only policies effective in that … | definition | tagged | Earned Premium: “- **Policy year** earned premium comes from one cohort only, and is fully earned $24$ months after …” |
| Premium audit adjustments are treated as written and earned in full at the time the audit occurs (booked in the calendar year of the audit)… | fact | tagged | Premium Audit: “An audit on a policy written in $2023$ books premium in $2025$, so **[[Policy Year]] premium keeps …” |
| For a policy year, audit premium is attributed back to the policy's original policy year, so it is included in policy year written premium … | fact | tagged | Premium Audit: “An audit on a policy written in $2023$ books premium in $2025$, so **[[Policy Year]] premium keeps …” |
| Earned premium for a policy in a period equals initial premium times the fraction of the policy term (in months) falling in the period, ass… | procedure | tagged | Earned Premium: “$$\text{EP for one policy} = \text{Full premium} \times \frac{\text{days elapsed}}{\text{policy ter…” |
| The audit adjustment is a percentage of the entire initial policy premium (not just the earned portion), and is recognized at the audit dat… | fact | tagged | Insurance Premium: “The audit books $\$30{,}000$ of additional premium ($15\%$) in a period after the policy expired.” |

</details>

<details><summary><code>cas5-2014f-q20</code> · gap</summary>

Tagged pages: Berquist-Sherman Method, Development Factor, Accident Year, Settlement Rate, Case Adequacy

| Item | Kind | Status | Where |
|---|---|---|---|
| In the Berquist-Sherman case outstanding adjustment, compute average case outstanding per open claim for each cell, keep the latest diagona… | procedure | tagged | Berquist-Sherman Method: “**Trend the latest diagonal's** average case outstanding backwards at $t$ to restate each historica…” |
| The disposal rate equals closed claim counts divided by projected ultimate claim counts, and the Berquist-Sherman settlement-rate adjustmen… | formula | tagged | Settlement Rate: “$$\text{Disposal Rate}_n = \frac{\text{Closed claims at age } n}{\text{Ultimate claim counts}}$$” |
| Adjusted cumulative paid claims are found by interpolating each accident year's paid-versus-closed-count relationship at the restated close… | procedure | tagged | Berquist-Sherman Method: “For each historical cell, interpolate the paid losses that *would* have been paid had that year clo…” |
| Adjusted open claim count equals ultimate-consistent reported count minus restated closed count, i.e., actual reported (closed plus open) c… | formula | missing |  |
| Adjusted reported (incurred) claims equal adjusted paid claims plus adjusted open claim count times adjusted average case outstanding. | formula | tagged | Berquist-Sherman Method: “4. Multiply the restated averages by the open claim counts to get adjusted case reserves, add paid,…” |
| To develop to ultimate, compute age-to-age factors from the adjusted triangle, select factors with the all-year simple average, and multipl… | procedure | tagged | Development Factor: “- **Simple average**: unweighted mean of all individual year factors — treats each accident year eq…” |
| When both case outstanding adequacy and settlement rate changes occur, the Berquist-Sherman adjustments are combined into a single adjusted… | fact | missing |  |

</details>

<details><summary><code>cas5-2014f-q21</code> · answerable</summary>

Tagged pages: Net of Reinsurance, Reinsurance, Accident Year, Ceded Losses, Gross Losses

| Item | Kind | Status | Where |
|---|---|---|---|
| A quota share reinsurance treaty cedes a fixed percentage of every claim (and premium) to the reinsurer, so the net-to-gross claim ratio is… | definition | tagged | Reinsurance: “**Quota share** — a flat percentage of every policy. Ceded losses are a scalar multiple of gross, s…” |
| To identify the reinsurance structure, compute the net-to-gross ratio of cumulative reported claims for each cell of the triangle; a consta… | procedure | tagged | Ceded Losses: “Under **quota share**, ceded is a fixed share $c$ of gross, so the ceded triangle is a scalar multi…” |
| Age-to-age (link ratio) reported development factors are computed as the ratio of cumulative reported claims at consecutive ages for each a… | formula | syllabus | Age to Age Factor: “**Age-to-Age Factor** (link ratio) is the ratio of a cohort's cumulative amount at one maturity to …” |
| Select an age-to-age factor for each development period by averaging the observed factors (e.g., a volume-weighted or simple average), and … | procedure | syllabus | Age to Age Factor: “- **Volume-weighted (all-year)** — the ratio of column sums.” |
| Age-to-ultimate factors are obtained by multiplying the selected age-to-age factors from a given age through the last age, and ultimate cla… | procedure | linked | Loss Development: “$$\text{CDF}_{n \to \text{ult}} = \prod_{k \ge n} f_{k \to k+1} \times \text{Tail}$$” |
| IBNR (reported-claim basis) equals ultimate claims minus cumulative reported claims to date. | formula | syllabus | Chain Ladder Method: “$$\text{IBNR} = U_{\text{AY}} - C_{\text{AY},\,n}$$” |
| Ceded claims equal gross claims minus net claims, and under a quota share the ceded IBNR can be found by applying the ceded percentage (1 m… | fact | tagged | Ceded Losses: “$$\text{Ceded} = \text{Gross} - \text{Net}$$” |

</details>

<details><summary><code>cas5-2014f-q22</code> · gap</summary>

Tagged pages: Actual vs Expected Analysis, Cumulative Development Factor, Development Factor, Accident Year

| Item | Kind | Status | Where |
|---|---|---|---|
| The expected percent reported at a given maturity equals the reciprocal of the selected cumulative claim development factor to ultimate at … | formula | tagged | Cumulative Development Factor: “The reciprocal is the **percentage reported** (or paid): $p_n = 1/\text{CDF}_n$, and $1 - p_n$ is t…” |
| Linear interpolation estimates a value at an intermediate maturity by assuming the change between two known maturities occurs uniformly (a … | definition | missing |  |
| Expected emergence in a future period under the Expected Claims (Bornhuetter-Ferguson style) method equals the unreported (IBNR) amount, ul… | procedure | tagged | Actual vs Expected Analysis: “$$\text{Expected emergence} = U_{\text{prior}} \times \left(\frac{1}{\text{CDF}_{n+1}} - \frac{1}{\…” |
| Projected reported claims at a future date equal claims reported to date plus the expected emergence between the evaluation date and that f… | procedure | tagged | Actual vs Expected Analysis: “The **expected** figure comes from the prior ultimate and the emergence pattern: the share of ultim…” |
| Months of development for an accident year at an evaluation date are measured from the start of the accident year to the evaluation date (e… | procedure | linked | Development Triangle: “**maturities as columns** (age in months since the start of the cohort), and **valuation dates as d…” |
| Linear interpolation of claim development may be inappropriate for an immature accident year because claims do not emerge uniformly; the de… | fact | missing |  |

</details>

<details><summary><code>cas5-2014f-q23</code> · answerable</summary>

Tagged pages: Unallocated Loss Adjustment Expenses ULAE, Accident Year, Development Factor, Bornhuetter-Ferguson Method

| Item | Kind | Status | Where |
|---|---|---|---|
| The paid Bornhuetter-Ferguson ultimate equals paid claims to date plus the expected claims times (1 − 1/CDF), where the CDF is the paid cum… | formula | tagged | Bornhuetter-Ferguson Method: “$$U_{\text{BF}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) \times U_{0}$$” |
| The cumulative development factor to ultimate at a given age is the product of the age-to-age factors from that age onward, with each age-t… | procedure | tagged | Development Factor: “**Development Factor** (link ratio or age-to-age factor) is the ratio used to project cumulative lo…” |
| IBNR is the ultimate claims minus reported (paid plus case outstanding) claims, so it is not the same as total unpaid claims, which are ult… | definition | linked | IBNR: “$$\text{IBNR} = \text{Ultimate} - \text{Reported}$$” |
| In the classical ULAE technique, compute the ratio of calendar-year paid ULAE to calendar-year paid claims for each year, examine the ratio… | procedure | tagged | Unallocated Loss Adjustment Expenses ULAE: “**Classical (dollar-based, paid-to-paid).** Compute the ratio $R$ of calendar-year paid ULAE to cal…” |
| Under the classical technique, unpaid ULAE equals the selected ULAE ratio times (50% of case outstanding reserves plus 100% of IBNR). | formula | tagged | Unallocated Loss Adjustment Expenses ULAE: “$$\text{ULAE Reserve} = R \times \left(0.5 \times \text{Case} + 1.0 \times \text{IBNR}\right)$$” |
| The classical technique assumes half of ULAE is incurred when a claim is opened and half when it is closed, that future ULAE on unreported … | fact | tagged | Unallocated Loss Adjustment Expenses ULAE: “If ULAE is assumed to be spent half at reporting and half at settlement, only $50\%$ remains on rep…” |
| The classical technique is inappropriate for a new or rapidly growing insurer because its paid-to-paid ratio is not at a steady state, so t… | fact | tagged | Unallocated Loss Adjustment Expenses ULAE: “The classical method's central weakness is **growth**: in a rapidly growing book, current paid ULAE…” |
| The Kittel refinement for growing insurers divides calendar-year paid ULAE by the average of paid claims and incurred claims (incurred = re… | procedure | tagged | Unallocated Loss Adjustment Expenses ULAE: “$$R_{\text{Kittel}} = \frac{\text{Paid ULAE}}{0.5(\text{Paid Loss}) + 0.5(\text{Incurred Loss})}$$” |

</details>

<details><summary><code>cas5-2014f-q24</code> · answerable</summary>

Tagged pages: Bornhuetter-Ferguson Method, Large Loss, Loss Development, Catastrophe Loss

| Item | Kind | Status | Where |
|---|---|---|---|
| Reported (incurred) development method: ultimate claims = reported claims to date × reported age-to-ultimate factor (CDF). | formula | tagged | Loss Development: “$$\text{Ultimate Losses} = \text{Losses at age } n \times \text{CDF}_{n \to \text{ult}}$$” |
| Paid development method: ultimate claims = paid claims to date × paid age-to-ultimate factor. | formula | tagged | Loss Development: “Reported triangles capture both; paid triangles also capture the lag between a case reserve being s…” |
| Bornhuetter-Ferguson method: ultimate = actual claims to date + expected (a priori) claims × (1 − 1/CDF), where the unreported/unpaid perce… | formula | tagged | Bornhuetter-Ferguson Method: “$$U_{\text{BF}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) \times U_{0}$$” |
| Development methods apply historical development patterns to current claims, so when the current period has an unusual event (e.g. a catast… | fact | tagged | Large Loss: “Leaving a $\$2$M claim in an immature diagonal and multiplying it by a CDF of $4$ produces an $\$8$…” |
| The Bornhuetter-Ferguson method is a blend that uses actual claims to date but projects future emergence from the a priori expectation, so … | fact | tagged | Bornhuetter-Ferguson Method: “The key structural property: **actual emergence is taken at face value and only the unemerged porti…” |
| The expected claims method uses only the a priori expectation and does not respond to actual experience, so it ignores a catastrophe that h… | fact | linked | Expected Loss Method: “**Expected Loss Method** (expected claims technique) estimates ultimate losses entirely from an a p…” |
| To handle a large loss/catastrophe not in the historical data, separate it from the data: estimate expected reported claims at the evaluati… | procedure | tagged | Large Loss: “The standard treatment has three steps: **cap** each claim at a threshold $M$ for the experience an…” |
| Case outstanding development method: ultimate = paid claims + case outstanding × OS LDF, where the case outstanding LDF is derived from the… | formula | syllabus | Case Outstanding Development Method: “$$U = \text{Paid to date} + \text{Case Outstanding} \times f_{\text{case}}$$” |

</details>

<details><summary><code>cas5-2014f-q3</code> · answerable</summary>

Tagged pages: On Level Premium, Parallelogram Method, Extension of Exposures

| Item | Kind | Status | Where |
|---|---|---|---|
| The parallelogram method adjusts historical earned premium to current rate level using an aggregate calculation based on the geometric area… | definition | tagged | Parallelogram Method: “The **Parallelogram Method** (or geometric method) is the [[On-Leveling\\|on-leveling]] method that …” |
| The parallelogram method assumes policies are written evenly (uniformly) throughout the period and earned evenly over the policy term, an a… | fact | tagged | Parallelogram Method: “It assumes uniform writing — false for seasonal business such as boat owners, whose policies are bo…” |
| The extension of exposures method restates each policy's (or exposure's) historical premium at current rates by re-rating the exposures usi… | definition | tagged | Extension of Exposures: “**Extension of Exposures** is the [[On-Leveling\\|on-leveling]] method that re-rates every historica…” |
| Extension of exposures is more accurate than the parallelogram method because it reflects the class-level rate changes and the actual distr… | fact | tagged | Extension of Exposures: “**Why accuracy matters:** because each policy is re-rated, changes that differed by class, territor…” |
| The parallelogram method is simpler and requires less data than extension of exposures, but because it works in aggregate it may not correc… | fact | tagged | Parallelogram Method: “And it applies the *overall average* change, so if changes varied by class or territory the segment…” |

</details>

<details><summary><code>cas5-2014f-q4</code> · gap</summary>

Tagged pages: Workers Compensation Insurance, Frequency, Policy Provision Changes

| Item | Kind | Status | Where |
|---|---|---|---|
| A worker's weekly indemnity benefit equals the compensation rate times pre-injury wage, subject to a minimum benefit floor and a maximum be… | procedure | missing |  |
| To estimate the average weekly benefit across a wage distribution, compute each wage level's benefit after applying the minimum and maximum… | procedure | missing |  |
| The percent impact of a benefit change equals proposed average benefit divided by current average benefit, minus 1. | formula | tagged | Frequency (collapsed): “\text{Frequency change} &= \frac{0.0720}{0.0600} - 1 = +20.0\%” |
| Lowering the maximum benefit reduces benefits only for higher-wage workers whose benefits are capped, and it affects more workers as the ca… | fact | missing |  |
| Indirect effect on frequency: a lower maximum benefit reduces the incentive of high-wage workers to file claims, which tends to decrease cl… | fact | elsewhere | Moral Hazard (collapsed): “with $\$2{,}500$ at stake, the insured takes more care and does not submit marginal claims.” |
| Indirect effect on duration: a lower maximum benefit gives affected high-wage claimants a financial incentive to return to work sooner, whi… | fact | elsewhere | Moral Hazard: “The larger effect in practice: extended treatment under [[Statutory Accident Benefits\\|accident ben…” |

</details>

<details><summary><code>cas5-2014f-q5</code> · answerable</summary>

Tagged pages: Pure Premium Method, Overall Rate Level Indication, Trend, Exposure Trend, Catastrophe Loss

| Item | Kind | Status | Where |
|---|---|---|---|
| Compute the ultimate loss development factor for an accident year as the product of the age-to-age factors from its current age to ultimate… | procedure | linked | Loss Development: “$$\text{CDF}_{n \to \text{ult}} = \prod_{k \ge n} f_{k \to k+1} \times \text{Tail}$$” |
| Trend historical losses to the future period by applying annual trend over the time from the average accident date of each historical year … | procedure | tagged | Trend: “The trend period runs from the average date of historical losses (midpoint of the accident year) to…” |
| For annual policies written uniformly over a one-year rate effective period, the average accident date falls one year after the effective d… | procedure | linked | Loss Trend (collapsed): “The first policy is exposed $7/1/2025$–$6/30/2026$ and the last $7/1/2026$–$6/30/2027$, so the expo…” |
| Apply the historical non-catastrophe ULAE-to-loss-and-ALAE ratio as a multiplicative load on developed, trended non-catastrophe loss and AL… | procedure | linked | Unallocated Loss Adjustment Expenses ULAE: “In **ratemaking**, ULAE may be handled as a load on losses or as a [[Fixed Expenses\\|fixed expense]…” |
| Compute the non-catastrophe pure premium by summing the projected ultimate loss and LAE across the experience years and dividing by total e… | procedure | syllabus | Pure Premium: “$$\text{Pure Premium} = \frac{\text{Losses} + \text{LAE}}{\text{Earned Exposures}}$$” |
| Trend the catastrophe exposure base (amount of insurance years per exposure) by the observed average annual change to the future exposure p… | procedure | tagged | Exposure Trend: “$$\text{Trended Exposure} = \text{Historical Exposure} \times (1 + t_E)^{n}$$” |
| Catastrophe loss and LAE per exposure = projected AIY per exposure × (non-modeled long-term cat loss-to-AIY ratio + modeled cat loss-to-AIY… | formula | tagged | Catastrophe Loss: “Werner's approach: express historical catastrophe losses as a ratio to a stable base (non-catastrop…” |
| The total projected pure premium provision is the sum of the non-catastrophe and catastrophe loss and LAE provisions per exposure, and the … | fact | tagged | Catastrophe Loss: “$$\text{Total Pure Premium} = \text{Non-Cat PP} + \text{Cat Load}$$” |

</details>

<details><summary><code>cas5-2014f-q6</code> · gap</summary>

Tagged pages: Expense Provisions, Expense Ratio, Trend, Fixed Expenses, Variable Expenses

| Item | Kind | Status | Where |
|---|---|---|---|
| Under the pure premium method, the indicated average rate equals (projected ultimate pure premium + fixed expense per exposure) divided by … | formula | tagged | Fixed Expenses: “$$\text{Rate} = \frac{\text{Pure Premium} + F}{1 - V - Q_T}$$” |
| Under the all variable expense method, treat every expense category (general, other acquisition, taxes, commission) as a percentage of prem… | procedure | tagged | Expense Provisions: “The **all-variable expense method** loads every expense as a percentage of premium.” |
| Under the premium-based projection method, the fixed expense per exposure is the sum of each category's expense ratio times its percent fix… | procedure | tagged | Fixed Expenses: “The fixed dollars are then put per exposure either by multiplying the fixed expense ratio by the pr…” |
| The premium-based projection method assumes fixed expenses scale proportionally with average premium, so if projected average premium diffe… | fact | tagged | Expense Provisions: “A fixed expense *ratio* (premium-based method) needs none if average fixed expense and average prem…” |
| When projected average premium exceeds the historical average premium behind the expense ratios, the premium-based method overstates fixed … | fact | missing |  |
| Fixed expenses do not necessarily depend on policy size and may trend differently from premium, so scaling them with premium is inaccurate. | fact | tagged | Expense Provisions: “are assumed the same for each risk regardless of premium — typically home-office overhead, and per-…” |

</details>

<details><summary><code>cas5-2014f-q7</code> · answerable</summary>

Tagged pages: Overall Rate Level Indication, Pure Premium, Insurance Premium, Earned Exposure, Pure Premium Method, Loss Trend

| Item | Kind | Status | Where |
|---|---|---|---|
| A policy with a six-month term represents one-half of an annual exposure (one car-year), so written exposures equal written policies times … | fact | tagged | Earned Exposure: “A $12$-month policy contributes **one** earned car-year in total, spread pro rata over its term: wr…” |
| Convert written exposures to earned exposures for a given year by adding the earned portions of the current and prior year's written exposu… | procedure | tagged | Earned Exposure: “With policies written **uniformly** through the year, a calendar year earns roughly half of that ye…” |
| The loss trend period runs from the average accident date of each historical experience period to the average accident date of the future p… | procedure | tagged | Loss Trend: “$t$ is the selected annual trend and $n$ the **trend period**, measured from the average date of lo…” |
| Trended ultimate losses equal ultimate losses times (1 + annual trend) raised to the trend period; the projected pure premium is trended ul… | formula | tagged | Pure Premium: “$$\text{Pure Premium} = \frac{\text{Losses} + \text{LAE}}{\text{Earned Exposures}}$$” |
| Select the projected ultimate pure premium from the yearly indications (e.g. all years combined when fully credible, or weighting recent ye… | procedure | tagged | Overall Rate Level Indication: “Weighting across years in the experience period is a judgment: many companies sum projected losses …” |
| Pure premium method: indicated average rate = (projected pure premium + fixed expense per exposure) / (1 − variable expense ratio − profit … | formula | tagged | Pure Premium Method: “$$\text{Indicated Rate} = \frac{\text{Pure Premium} + F}{1 - V - Q_T}$$” |
| Indicated rate change = indicated average rate / current average rate − 1. | formula | tagged | Overall Rate Level Indication: “$$\text{Indicated Change} = \frac{\text{Indicated Rate}}{\text{Current Rate}} - 1$$” |
| Exposure trend is applied only when the exposure base is inflation-sensitive; a policy/car-year exposure base is not, so no exposure trend … | fact | linked | Exposure Trend: “Exposure trend applies **only** to inflation-sensitive bases. Car-years and house-years do not infl…” |

</details>

<details><summary><code>cas5-2014f-q8</code> · gap</summary>

Tagged pages: Complement of Credibility, Trend, Age to Age Factor, Loss Development, On Level Premium, Loss Ratio Method

| Item | Kind | Status | Where |
|---|---|---|---|
| A good complement of credibility should be unbiased, independent of the base statistic's experience, available, easy to compute, and logica… | fact | tagged | Complement of Credibility: “(2) **unbiased** — not routinely higher or lower than the observed experience; (3) **statistically …” |
| A complement that contains a large share of the state's own experience (e.g., a region where the state is 50% of the exposure) is not indep… | fact | tagged | Complement of Credibility: “its independence depends on how large the subject is relative to the larger group.” |
| A competitor's rate indication is a questionable complement because competitors may target a different market and use different operations,… | fact | missing |  |
| Credibility-weighted indication = Z × state indicated change + (1 − Z) × complement. | procedure | tagged | Complement of Credibility: “$$\text{Estimate} = Z \times \text{Experience} + (1 - Z) \times \text{Complement}$$” |
| On-level factor by the parallel-grid (area/geometric) method: for annual policies, the portion of each year's earned premium written at eac… | procedure | tagged | On Level Premium: “$$\text{On-Level Factor} = \frac{\text{Current cumulative rate level index}}{\text{Average rate lev…” |
| A rate change mandated to apply to all policies in force takes effect immediately for all earned premium rather than being earned in gradua… | fact | linked | On-Leveling: “A special case: if the rate change applies to **in-force** policies rather than only new and renewa…” |
| Reported loss development: multiply reported losses by the cumulative development factor (product of selected age-to-age factors to ultimat… | procedure | tagged | Loss Development: “$$\text{Ultimate Losses} = \text{Losses at age } n \times \text{CDF}_{n \to \text{ult}}$$” |
| Select age-to-age factors (e.g., all-year, latest-n average, or latest) and justify the choice by observed patterns, balancing responsivene… | procedure | tagged | Age to Age Factor: “Look at the column **before** averaging it. A steady column supports a volume-weighted all-year sel…” |
| Trend losses from the average accident date of each accident year to the average accident date of the period the new rates will be in effec… | procedure | tagged | Trend: “- The trend period runs from the average date of historical losses (midpoint of the accident year) …” |
| Loss and LAE are obtained by multiplying losses by (1 + LAE provision) when LAE is expressed as a percent of loss. | formula | tagged | Loss Ratio Method (collapsed): “LAE is $11\%$ of loss. … 2022: \; 4{,}600 \times 1.08 \times 1.05^{3.5} \times 1.11 &= \$6{,}541 \t…” |
| Indicated rate change = (loss & LAE ratio + fixed expense ratio) / (1 − variable expense ratio − profit and contingencies provision) − 1. | formula | tagged | Loss Ratio Method: “$$\text{Indicated Change} = \frac{\text{Projected Loss \& LAE Ratio} + F\%}{1 - V - Q_T} - 1$$” |

</details>

<details><summary><code>cas5-2014f-q9</code> · gap</summary>

Tagged pages: Adverse Selection, Probability, Classification Ratemaking

| Item | Kind | Status | Where |
|---|---|---|---|
| To compare candidate prices in the short term, compute expected profit as (price minus true expected cost) times the retained policies plus… | procedure | elsewhere | Price Optimization: “$C$ is the policy's expected cost — losses, LAE and expenses; $\rho(P)$ is the probability that the…” |
| Compute the switching probability from the formula given for a risk, based on the difference between the competitor's offered rate and the … | procedure | missing |  |
| An insurer that does not segment risks as finely as a competitor suffers adverse selection: its low risks leave for cheaper competitor pric… | fact | tagged | Adverse Selection: “**Adverse Selection** is the tendency for those who know they are worse-than-average risks to buy m…” |
| If the insurer does not respond, adverse selection becomes a spiral: worsening loss experience forces rate increases, which drive off more … | fact | tagged | Adverse Selection: “**The death spiral.** Price at the population average; low risks find the price poor value and leav…” |
| Responses to a competitor's better segmentation include adopting the same or a more refined rating variable, lowering prices on low risks, … | fact | tagged | Adverse Selection: “**Defences:** [[Risk Classification Restrictions\\|risk classification]] (price to the risk, so nobo…” |

</details>

<details><summary><code>cas5-2014s-q1</code> · gap</summary>

Tagged pages: On Level Premium, Earned Premium, Calendar Year, Rate Change, Parallelogram Method, In-Force

| Item | Kind | Status | Where |
|---|---|---|---|
| The on-level factor equals the current cumulative rate level divided by the average rate level earned over the period, and restates histori… | definition | tagged | On Level Premium: “$$\text{On-Level Factor} = \frac{\text{Current cumulative rate level index}}{\text{Average rate lev…” |
| Convert a history of rate changes into cumulative rate level indices by compounding successive rate changes multiplicatively from a base le… | procedure | tagged | On Level Premium: “Rate level indices **compound**: successive changes of $+8\%$ and $+5\%$ give a cumulative index of…” |
| With the parallelogram method, for uniformly written annual policies, the average rate level in a calendar year is the area-weighted averag… | procedure | tagged | Parallelogram Method: “$$\text{OLF}_Y = \frac{I_{\text{current}}}{\sum_k A_{Y,k}\, I_k}$$” |
| For in-force premium at a date, weight the rate levels by the share of policies in force at that date that were written under each rate lev… | procedure | missing |  |
| When a fraction of policies is written on a single date (a special writing pattern), allocate that fraction entirely to the rate level in e… | procedure | missing |  |
| A longer policy term (e.g., two years) means more earned premium in a period comes from policies written under older, lower rate levels, wh… | fact | tagged | Parallelogram Method (collapsed): “Six-month policies take on a change faster, so they need a smaller adjustment; and CY 2025 needs no…” |

</details>

<details><summary><code>cas5-2014s-q10</code> · answerable</summary>

Tagged pages: Considerations for Implementing Rates, Rate Change, Underwriting Profit, Lifetime Value, Non-Pricing Solutions, Rating Algorithm

| Item | Kind | Status | Where |
|---|---|---|---|
| A company may take less than the indicated rate change for regulatory reasons, such as regulatory limits on the size of an increase, regula… | fact | tagged | Rate Change: “the regulator has informally signalled that increases above $10\%$ will draw a hearing” |
| A company may take less than the indicated rate change for operational reasons (cost and resources of implementing large changes in rating … | fact | tagged | Rate Change: “A rate change also changes the **mix**: price-sensitive risks shop, so a large increase can worsen …” |
| A pricing shortfall (requested below indicated rate change) can be offset by non-pricing actions: reducing expenses, reducing loss costs th… | fact | tagged | Considerations for Implementing Rates: “tightening **underwriting** criteria or non-renewing policies whose premium is grossly inadequate;” |
| Spreading a rate change over multiple periods or capping renewal rate changes only delays achieving the needed rate and does not offset the… | fact | tagged | Considerations for Implementing Rates (collapsed): “The cost of phasing is a full year written at an inadequate rate.” |
| The premium under a rating algorithm combining multiplicative factors, an additive discount and an additive fee is Base rate × R1 × R2 × (1… | formula | tagged | Rating Algorithm: “$$\text{Premium} = \left[\text{Base Rate} \times \prod_i R_i + \sum_j A_j\right] \times (1 - D) + \…” |
| To calculate the proposed base rate, set target average premium (current average premium × (1 + requested rate change)) equal to proposed b… | procedure | tagged | Considerations for Implementing Rates: “$$\text{Base Rate}_{\text{new}} = \text{Base Rate}_{\text{current}} \times \frac{1 + \text{overall …” |
| The current average premium is not the current base rate; the rate change applies to the current average premium, not to the base rate, and… | fact | tagged | Rating Algorithm: “$$\text{Premium} = \left[\text{Base Rate} \times \prod_i R_i + \sum_j A_j\right] \times (1 - D) + \…” |

</details>

<details><summary><code>cas5-2014s-q11</code> · answerable</summary>

Tagged pages: Retrospective Rating, Insurance Premium, Loss Ratio

| Item | Kind | Status | Where |
|---|---|---|---|
| Retrospective premium = (basic premium + converted losses) × tax multiplier, where converted losses = limited reported losses × loss conver… | formula | tagged | Retrospective Rating: “$$R = \left(\text{BP} + L \times \text{LCF}\right) \times \text{TM}$$” |
| Basic premium = standard premium × (expense allowance excluding taxes − expected loss ratio × (loss conversion factor − 1) + net insurance … | formula | tagged | Retrospective Rating: “$e - (c - 1)E$ as a percentage of guaranteed-cost premium, where $e$ is the expense ratio underlyin…” |
| The loss conversion factor covers loss-related expenses (e.g., LAE), so the expected loss ratio × (LCF − 1) is subtracted from the expense … | fact | tagged | Retrospective Rating: “which loads them for the ALAE not already in the losses plus ULAE.” |
| The net insurance charge is the insurance charge (cost of the maximum premium limit) minus the insurance savings (value of the minimum prem… | definition | tagged | Retrospective Rating: “the insurance charge for the maximum less the insurance savings for the minimum — is the price of t…” |
| Minimum and maximum retrospective premiums equal the min/max ratios times standard premium; the final retrospective premium is the computed… | procedure | tagged | Retrospective Rating: “$$\text{Retro Premium} = \min\!\left(\max(R,\, R_{\min}),\, R_{\max}\right)$$” |
| The basic premium covers non-tax, non-loss-related expenses (underwriting expenses and profit net of expenses provided via the loss convers… | fact | tagged | Retrospective Rating: “covers the insurer's non-LAE expenses, profit, and the **net insurance charge** — the cost of the m…” |

</details>

<details><summary><code>cas5-2014s-q12</code> · answerable</summary>

Tagged pages: Reserving Data Organization, Development Factor, Earned Exposure, Data Segmentation, Homogeneity

| Item | Kind | Status | Where |
|---|---|---|---|
| When grouping data for reserving, groups should be homogeneous: segments combined should have similar loss development patterns, since comb… | fact | tagged | Homogeneity: “Two coverages may have similar loss ratios and completely different reporting and settlement speeds…” |
| A segment with a large volume of data is credible enough to be analyzed on its own and need not be combined with other segments, especially… | fact | tagged | Reserving Data Organization (collapsed): “at $\$21{,}000{,}000$ of BI premium there is ample volume for its own triangle; splitting comprehen…” |
| A segment with small volume lacks credibility on its own and may be combined with other segments that have similar development and exposure… | fact | tagged | Data Segmentation: “Where a level is too thin, combine similar levels or find more data.” |
| A rapidly growing segment (rising exposures and claim counts over accident years) changes the mix of business by year and affects the devel… | fact | tagged | Data Segmentation: “Do not combine segments whose relative volume is changing — see [[Mix of Business]] and [[Reserving…” |
| Similarity of claim frequency (claim counts per exposure) across segments is not a valid reason to group them, because segments with simila… | fact | tagged | Homogeneity: “Two coverages may have similar loss ratios and completely different reporting and settlement speeds…” |
| Assess grouping by comparing age-to-age development factors across segments at each valuation age, and by examining trends in earned exposu… | procedure | tagged | Reserving Data Organization: “Keep counts alongside dollars. Paid, reported, closed and open **claim counts** ([[Claim Count Tria…” |

</details>

<details><summary><code>cas5-2014s-q13</code> · answerable</summary>

Tagged pages: Loss Development, Berquist-Sherman Method, Expected Loss Method, Age to Age Factor, Chain Ladder Method, Changing Conditions

| Item | Kind | Status | Where |
|---|---|---|---|
| Age-to-age (link ratio) factors are the ratios of cumulative reported claims at one maturity to the previous maturity for the same accident… | definition | tagged | Age to Age Factor: “**Age-to-Age Factor** (link ratio) is the ratio of a cohort's cumulative amount at one maturity to …” |
| Select age-to-age factors from the historical factors using an average such as a simple average or a volume-weighted average over a chosen … | procedure | tagged | Age to Age Factor: “- **Latest $k$-year** average (volume-weighted or simple) — responsive to a genuine change in the p…” |
| A volume-weighted average age-to-age factor equals the sum of cumulative claims at the later age divided by the sum of cumulative claims at… | formula | tagged | Age to Age Factor: “$$f_{n \to n+1}^{\text{vol-wtd}} = \frac{\sum_{\text{AY}} C_{\text{AY},\,n+1}}{\sum_{\text{AY}} C_{…” |
| Cumulative development factors (to ultimate) are the product of the selected age-to-age factors from a given age through the tail factor, a… | procedure | tagged | Chain Ladder Method: “**Chain Ladder Method** (development or link-ratio method) projects each cohort to ultimate by mult…” |
| The tail factor is the development factor from the last observed age to ultimate; it equals 1.000 when no development is assumed beyond tha… | definition | linked | Tail Factor: “A tail of exactly $1.000$ is itself an assumption — that development is complete — and it is the wr…” |
| The reported claim development technique assumes that claims reported in the future will develop in the same way as in the past, so past de… | fact | tagged | Chain Ladder Method: “**The pattern is stable over calendar time.** Violated by a change in [[Case Adequacy\\|case adequac…” |
| When historical reported development is not predictive of future development, use the expected claims method, which relies on an a priori e… | procedure | tagged | Expected Loss Method: “**Expected Loss Method** (expected claims technique) estimates ultimate losses entirely from an a p…” |
| The Bornhuetter-Ferguson method estimates ultimate claims as reported claims plus expected unreported claims, where unreported is the perce… | procedure | linked | Bornhuetter-Ferguson Method: “**Bornhuetter-Ferguson Method** (BF) estimates ultimate losses by adding to what has actually been …” |
| The Berquist-Sherman case outstanding adjustment restates historical case reserves to the current level of case reserve adequacy, derives a… | procedure | tagged | Berquist-Sherman Method: “**Berquist-Sherman Method** restates a historical [[Development Triangle\\|triangle]] so that every …” |
| The paid claim development technique is unaffected by changes in case reserve adequacy and can be used instead of reported development when… | fact | tagged | Changing Conditions: “*Case strengthening*: reported development overstates, reported BF and Cape Cod overstate less; pai…” |

</details>

<details><summary><code>cas5-2014s-q14</code> · answerable</summary>

Tagged pages: Bornhuetter-Ferguson Method, Accident Year, Line of Business, Case Reserves

| Item | Kind | Status | Where |
|---|---|---|---|
| The Bornhuetter-Ferguson ultimate claims estimate equals actual reported (or paid) claims to date plus the expected claims times the percen… | formula | tagged | Bornhuetter-Ferguson Method: “$$U_{\text{BF}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) \times U_{0}$$” |
| Percent reported is derived as reported claims to date divided by the reported-development ultimate (equivalently 1/reported CDF), so perce… | procedure | linked | Cumulative Development Factor: “The reciprocal is the **percentage reported** (or paid): $p_n = 1/\text{CDF}_n$, and $1 - p_n$ is t…” |
| Paid claims to date are obtained by multiplying the paid-development ultimate by the percentage paid (one minus the percentage unpaid), and… | procedure | linked | Cumulative Development Factor: “The reciprocal is the **percentage reported** (or paid): $p_n = 1/\text{CDF}_n$, and $1 - p_n$ is t…” |
| The reported BF estimate equals the reported claim development estimate when the percentage unreported is zero (CDF equals 1), or when actu… | fact | tagged | Bornhuetter-Ferguson Method: “- BF is a **credibility weighting** in disguise: it equals $Z \, U_{\text{CL}} + (1-Z)\,U_0$ with $…” |
| BF is preferable to the claim development technique for immature accident years or long-tail lines where highly leveraged LDFs make develop… | fact | tagged | Bornhuetter-Ferguson Method: “- It is therefore the method of choice at **immature maturities** and for [[Long Tail Lines\\|long-t…” |
| BF is preferable when actual claims data are volatile, thin, distorted by large or catastrophe claims, or affected by case reserve strength… | fact | linked | Chain Ladder Method: “- **Future development is proportional to what has emerged.** This is the strong one: the method ta…” |

</details>

<details><summary><code>cas5-2014s-q15</code> · answerable</summary>

Tagged pages: Cape Cod Method, Accident Year, Insurance Premium, Bornhuetter-Ferguson Method, Loss Trend

| Item | Kind | Status | Where |
|---|---|---|---|
| The Bornhuetter-Ferguson IBNR equals the a priori expected claims (expected claims ratio times premium) multiplied by the percent unreporte… | formula | tagged | Bornhuetter-Ferguson Method: “$$\text{IBNR} = \left(1 - \tfrac{1}{\text{CDF}}\right) \times \text{ELR} \times \text{EP}$$” |
| The percent reported at a given age equals the reciprocal of the reported development factor to ultimate, so the percent unreported is one … | fact | tagged | Bornhuetter-Ferguson Method: “$C$ is reported (or paid) losses to date, $U_0 = \text{ELR} \times \text{EP}$ the a priori expectat…” |
| Used-up premium (used-up exposure) is on-level earned premium multiplied by the percent of claims reported, i.e. the portion of premium who… | definition | tagged | Cape Cod Method: “- **Used-up premium** $\text{EP}_i / \text{CDF}_i$ is the share of each year's premium "exposed" to…” |
| Premium used in the Cape Cod expected claims ratio is on-level earned premium, obtained by multiplying earned premium by the on-level facto… | procedure | linked | On Level Premium: “**On-Level Premium** is historical earned premium restated as though every policy had been written …” |
| Trend reported claims (not premium) to the latest accident year's cost level using the annual pure premium trend compounded over the number… | procedure | tagged | Cape Cod Method: “Premium **must be on level** and losses must be trended to a common cost level before the ELR is co…” |
| The Cape Cod expected claims ratio equals total trended reported claims divided by total used-up premium across accident years; the IBNR is… | formula | tagged | Cape Cod Method: “$$\text{ELR} = \frac{\sum_i C_i}{\sum_i \text{EP}_i \times \tfrac{1}{\text{CDF}_i}}$$” |
| Cape Cod derives the expected claims ratio from the data and so captures changes in the underlying claims ratio, whereas Bornhuetter-Fergus… | fact | tagged | Cape Cod Method: “Once the ELR is in hand, the IBNR formula is identical to BF. The whole difference between the two …” |
| With thin or volatile data, Bornhuetter-Ferguson is preferred because it relies on an a priori expected claims ratio rather than one estima… | fact | tagged | Bornhuetter-Ferguson Method: “BF's answer moves dollar-for-dollar with a reporting anomaly; the chain ladder's moves by CDF-times.” |

</details>

<details><summary><code>cas5-2014s-q16</code> · gap</summary>

Tagged pages: Net of Reinsurance, Large Loss, Reinsurance, Accident Year, Exposure Trend, Changing Conditions, Frequency-Severity Method

| Item | Kind | Status | Where |
|---|---|---|---|
| Develop reported claim counts to ultimate by multiplying them by the reported claim count development factor to ultimate for their maturity. | procedure | linked | Claim Count Triangle: “$$\text{Ultimate Counts} = N_n \times \text{CDF}^{\text{count}}_{n \to \text{ult}}$$” |
| A change in case reserving practice (e.g., case strengthening) distorts reported counts at an excess attachment point, since claims are rep… | fact | tagged | Changing Conditions: “*Case strengthening*: reported development overstates, reported BF and Cape Cod overstate less; pai…” |
| When the latest year's data is distorted, project its claim counts by the frequency development approach: for each undistorted prior year c… | procedure | tagged | Exposure Trend: “$$\text{Trended Exposure} = \text{Historical Exposure} \times (1 + t_E)^{n}$$” |
| Frequency trend is applied separately from exposure (e.g., revenue) trend; exposure must be trended to the projection year's level and freq… | fact | tagged | Exposure Trend: “Exposure trend applies **only** to inflation-sensitive bases. Car-years and house-years do not infl…” |
| Alternative approach: compute the ratio of trended ultimate excess counts to trended ultimate ground-up counts for undistorted years, avera… | procedure | missing |  |
| Ultimate counts not exceeding the attachment point equal ultimate ground-up counts minus ultimate counts exceeding the attachment point. | fact | tagged | Reinsurance: “$$\text{Net} = \text{Gross} - \text{Ceded}$$” |

</details>

<details><summary><code>cas5-2014s-q17</code> · answerable</summary>

Tagged pages: Case Adequacy, Cape Cod Method, Actuary, Insurance Premium, Chain Ladder Method, Expected Loss Method, Bornhuetter-Ferguson Method, Changing Conditions

| Item | Kind | Status | Where |
|---|---|---|---|
| The reported claim development technique estimates ultimate claims by multiplying reported claims to date by a reported CDF (the reciprocal… | procedure | tagged | Chain Ladder Method: “**Chain Ladder Method** (development or link-ratio method) projects each cohort to ultimate by mult…” |
| When case outstanding adequacy is increasing, the latest reported claims are at a higher level than the historical triangle used to derive … | fact | tagged | Case Adequacy: “Applying historical factors — built under weaker reserving — to a strengthened diagonal **over-stat…” |
| The expected claim technique estimates ultimate claims as an a priori expected claims amount (exposure or premium times an expected loss ra… | procedure | tagged | Expected Loss Method: “**Expected Loss Method** (expected claims technique) estimates ultimate losses entirely from an a p…” |
| Because the expected claim technique does not use reported claims or development patterns, a change in case outstanding adequacy does not a… | fact | tagged | Changing Conditions: “*Case strengthening*: reported development overstates, reported BF and Cape Cod overstate less; pai…” |
| The Bornhuetter-Ferguson technique estimates ultimate claims as reported claims plus expected claims times the percent unreported (1 − 1/CD… | formula | tagged | Bornhuetter-Ferguson Method: “$$U_{\text{BF}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) \times U_{0}$$” |
| When case adequacy increases, the reported CDFs are overstated, so the percent unreported is overstated and the reported BF technique overs… | fact | tagged | Changing Conditions: “*Case strengthening*: reported development overstates, reported BF and Cape Cod overstate less; pai…” |
| The Cape Cod technique derives an expected claim ratio (ELR) from reported claims divided by on-level used-up premium across all years (adj… | procedure | tagged | Cape Cod Method: “The ELR is estimated as total reported losses over total *used-up* (on-level, developed) premium ac…” |
| With increasing case adequacy, the reported Cape Cod technique overstates IBNR both because the CDFs (percent unreported) are overstated an… | fact | tagged | Case Adequacy: “Adequacy also affects the a priori methods indirectly: the [[Cape Cod Method\\|Cape Cod]] ELR is com…” |

</details>

<details><summary><code>cas5-2014s-q18</code> · answerable</summary>

Tagged pages: Berquist-Sherman Method, Accident Year, Inflation, Data Diagnostic Analysis, Chain Ladder Method, Frequency-Severity Method

| Item | Kind | Status | Where |
|---|---|---|---|
| Paid (chain-ladder) development method: compute age-to-age factors from the cumulative paid triangle, select factors (e.g. volume-weighted … | procedure | tagged | Chain Ladder Method: “$$U_{\text{AY}} = C_{\text{AY},\,n} \times \text{CDF}_{n \to \text{ult}}$$” |
| Average paid claim (paid severity) equals cumulative paid claims divided by cumulative closed claim counts; average case outstanding equals… | formula | tagged | Data Diagnostic Analysis: “$$\bar O_{w,d} = \frac{L^{\text{rep}}_{w,d} - L^{\text{paid}}_{w,d}}{N^{\text{open}}_{w,d}}$$” |
| The ratio of closed claim counts to reported (total) claim counts is a measure of the claim settlement (disposal) rate; a stable ratio acro… | definition | tagged | Data Diagnostic Analysis: “reported, closed and open [[Claim Count Triangle\\|claim counts]], and closed-to-reported ratios (cl…” |
| If average case outstanding rises much faster than average paid claims, case reserve adequacy has strengthened, which distorts reported-los… | fact | tagged | Berquist-Sherman Method: “a jump in average case outstanding across all years points to adequacy; a jump in closure rates poi…” |
| Frequency-severity (paid) technique: project ultimate claim counts by developing closed counts with age-to-ultimate factors, project ultima… | procedure | tagged | Frequency-Severity Method: “Develop the count triangle to ultimate counts; develop an average severity triangle (dollars ÷ coun…” |
| Berquist-Sherman case outstanding adjustment: restate average case outstanding at each earlier year by detrending the current-level average… | procedure | tagged | Berquist-Sherman Method: “$$\text{Adjusted Case}_{\text{AY},n} = \text{Case}_{\text{latest},n} \times \left(1 + t\right)^{-(\…” |

</details>

<details><summary><code>cas5-2014s-q19</code> · answerable</summary>

Tagged pages: Expected Loss Method, Earned Premium, Accident Year, Insurance Premium, Loss Development, Loss Trend

| Item | Kind | Status | Where |
|---|---|---|---|
| The expected claims technique estimates ultimate claims as an expected claims ratio (ultimate claims divided by on-level earned premium) mu… | definition | tagged | Expected Loss Method: “**Expected Loss Method** (expected claims technique) estimates ultimate losses entirely from an a p…” |
| An age-to-age (link ratio) development factor is the reported claims at a later maturity divided by reported claims at the prior maturity f… | formula | linked | Age to Age Factor: “**Age-to-Age Factor** (link ratio) is the ratio of a cohort's cumulative amount at one maturity to …” |
| The cumulative development factor to ultimate at a given age is the product of the selected age-to-age factors from that age onward (with t… | formula | tagged | Loss Development: “$$\text{CDF}_{n \to \text{ult}} = \prod_{k \ge n} f_{k \to k+1} \times \text{Tail}$$” |
| To derive an expected claims ratio from historical years, develop each accident year's reported claims to ultimate, trend them to the proje… | procedure | tagged | Expected Loss Method: “The **ELR** is the whole method, and it must be derived, not assumed: from the pricing indication f…” |
| Premium used as the denominator for historical claims ratios must be on-level (adjusted to current rates), while the projection applies the… | fact | tagged | Insurance Premium: “Premium is the denominator of the [[Loss Ratio\\|loss ratio]], so historical premium has to be resta…” |
| The expected claims ratio is selected from the historical accident-year ratios (e.g., their average), and the latest immature year is exclu… | fact | tagged | Expected Loss Method: “The **ELR** is the whole method, and it must be derived, not assumed: from the pricing indication f…” |

</details>

<details><summary><code>cas5-2014s-q2</code> · gap</summary>

Tagged pages: Workers Compensation Insurance, Ultimate Loss, Insurance Premium, Ratemaking, Exposure Trend, Loss Ratio, Loss Development

| Item | Kind | Status | Where |
|---|---|---|---|
| To put historical industry loss cost premium on current payroll level, multiply each year by the cumulative annual payroll level changes oc… | procedure | missing |  |
| To adjust premium for experience modification level, multiply by the ratio of the projected average experience mod to that year's historica… | procedure | missing |  |
| Trend premium (for expected future wage level changes) and losses (for expected future benefit level changes) from the current level to the… | procedure | tagged | Exposure Trend: “$t_E$ is the annual exposure trend and $n$ the trend period in years, measured from the average dat…” |
| To put historical indemnity losses on current benefit level, multiply each year by the cumulative annual benefit level changes occurring af… | procedure | missing |  |
| Develop reported indemnity claims to ultimate by multiplying by the loss development factor to ultimate. | procedure | tagged | Loss Development: “$$\text{Ultimate Losses} = \text{Losses at age } n \times \text{CDF}_{n \to \text{ult}}$$” |
| Projected ultimate medical-only claims are already at ultimate and are not subject to indemnity benefit level changes, so they are added to… | fact | missing |  |
| Load combined indemnity and medical ultimate losses for LAE by multiplying by (1 + LAE percentage of losses). | procedure | tagged | Loss Ratio: “$$\text{Loss Ratio} = \frac{\text{Losses} + \text{LAE}}{\text{Earned Premium}}$$” |
| The projected ultimate loss & LAE ratio equals total adjusted, developed, trended losses with LAE divided by total adjusted, trended indust… | formula | tagged | Loss Ratio: “$$\text{Loss Ratio} = \frac{\text{Losses} + \text{LAE}}{\text{Earned Premium}}$$” |

</details>

<details><summary><code>cas5-2014s-q20</code> · gap</summary>

Tagged pages: Salvage and Subrogation, Accident Year, Recoveries, Loss Development

| Item | Kind | Status | Where |
|---|---|---|---|
| Develop cumulative paid claims to ultimate by computing age-to-age factors from the cumulative triangle, selecting them (e.g., averages), a… | procedure | linked | Chain Ladder Method: “**The procedure:** build the cumulative [[Development Triangle\\|triangle]] → compute [[Age to Age F…” |
| Convert incremental paid claims and incremental received salvage and subrogation into cumulative amounts by summing across development ages. | procedure | missing |  |
| In the ratio approach to salvage and subrogation, the S&S-to-paid-claims ratio at each age is the cumulative received S&S divided by cumula… | definition | tagged | Recoveries: “or by the **ratio approach**: develop the ratio of received S&S to paid claims to an ultimate ratio…” |
| Develop the S&S-to-paid ratio to its ultimate value by computing age-to-age factors of the ratio triangle, selecting them, and compounding … | procedure | tagged | Recoveries: “Ratio development to ultimate: $0.108 / 0.095 = 1.137$ from $24$ months; $0.108 / 0.060 = 1.800$ fr…” |
| Ultimate S&S for an accident year equals estimated ultimate paid claims times the current S&S-to-paid ratio times the ratio's age-to-ultima… | formula | tagged | Recoveries: “develop the ratio of received S&S to paid claims to an ultimate ratio, and multiply by selected ult…” |
| When no development is assumed beyond the last observed age, the age-to-age factor from that age to ultimate is 1.000 (tail factor of 1). | fact | linked | Tail Factor: “A tail of exactly $1.000$ is itself an assumption — that development is complete” |

</details>

<details><summary><code>cas5-2014s-q21</code> · answerable</summary>

Tagged pages: Allocated Loss Adjustment Expense, Development Factor, Frequency, Severity, Claims Processing Changes, Frequency-Severity Method

| Item | Kind | Status | Where |
|---|---|---|---|
| The paid development (chain ladder) method for ALAE multiplies paid ALAE to date by a cumulative development factor derived from historical… | procedure | tagged | Allocated Loss Adjustment Expense: “Because ALAE attaches to a claim, it is captured in case reserves and can be **developed in a trian…” |
| Development methods assume the historical development pattern remains representative of future development, so a change in claim handling (… | fact | tagged | Claims Processing Changes: “Faster closing inflates the recent paid diagonal, so historical paid factors **over-develop** it. S…” |
| The paid ALAE-to-paid claims ratio method projects ultimate ALAE by applying a historical ratio of ALAE to claims (developed to ultimate) t… | procedure | tagged | Allocated Loss Adjustment Expense: “Friedland gives three approaches: develop a **combined** loss-and-ALAE triangle, develop **ALAE sep…” |
| The ALAE ratio method is distorted when claim handling changes, because current ALAE-to-claims ratios at early maturities differ from histo… | fact | tagged | Allocated Loss Adjustment Expense: “A "defence and settle" strategy shift moves both components, in opposite directions, and shows up i…” |
| The frequency-severity technique can be applied to ALAE by projecting ultimate claim counts and ultimate average ALAE per claim and multipl… | procedure | tagged | Frequency-Severity Method: “**Frequency-Severity Method** projects [[Claim Count Triangle\\|claim counts]] and average [[Severit…” |
| The frequency-severity technique works best when claim settlement practices, business mix, and claim definitions are stable; operational ch… | fact | tagged | Frequency-Severity Method: “The method needs **consistent count definitions** across the whole triangle, and it is sensitive to…” |

</details>

<details><summary><code>cas5-2014s-q22</code> · gap</summary>

Tagged pages: Actual vs Expected Analysis, Accident Year, Actuary, Paid Losses

| Item | Kind | Status | Where |
|---|---|---|---|
| The cumulative percent reported (or paid) at an age equals the reciprocal of the cumulative development factor to ultimate at that age (1/C… | formula | linked | Cumulative Development Factor: “The reciprocal is the **percentage reported** (or paid): $p_n = 1/\text{CDF}_n$, and $1 - p_n$ is t…” |
| To find the percent reported or paid at an age between evaluation points, linearly interpolate between the cumulative percentages at the ad… | procedure | missing |  |
| Expected claims emerging over a period equal the prior unreported (or unpaid) amount, ultimate minus actual to date, times the percent emer… | procedure | missing |  |
| Expected emergence in a period can alternatively be computed as selected ultimate times the difference in the percent reported (or paid) at… | formula | tagged | Actual vs Expected Analysis: “$$\text{Expected emergence} = U_{\text{prior}} \times \left(\frac{1}{\text{CDF}_{n+1}} - \frac{1}{\…” |
| Reported claims that emerge higher than expected, with paid in line with expected, suggest the ultimate should be revised upward if driven … | fact | linked | Ultimate Loss (collapsed): “The distinction matters: the first three are process failures to be corrected in the method, the fo…” |
| Changes in operations, such as case reserve strengthening or faster claim reporting or processing, shift the timing of reported or paid cla… | fact | tagged | Actual vs Expected Analysis (collapsed): “The wider consequence: paid A/E at $1.0$ means the ultimate cost of these claims may not have chang…” |
| Comparing reported and paid actual-vs-expected results together diagnoses the cause of a deviation: reported deviating while paid matches e… | fact | tagged | Actual vs Expected Analysis: “Paid and reported A/E together diagnose the cause. Reported running high with paid on track suggest…” |

</details>

<details><summary><code>cas5-2014s-q23</code> · gap</summary>

Tagged pages: Case Outstanding Development Method, Accident Year, Calendar Year, Unpaid Claims

| Item | Kind | Status | Where |
|---|---|---|---|
| IBNR under the expected claims / IBNR-to-case approach is the selected ultimate claims minus reported (case-incurred) claims. | definition | linked | IBNR: “$$\text{IBNR} = \text{Ultimate} - \text{Reported}$$” |
| Expected emergence of reported claims over a period equals current IBNR times the proportion of remaining unreported claims that emerges, (… | procedure | syllabus | Actual vs Expected Analysis: “$$\text{Expected emergence} = U_{\text{prior}} \times \left(\frac{1}{\text{CDF}_{n+1}} - \frac{1}{\…” |
| Update reported and paid claims at the new evaluation date by adding the period's expected (or actual) emergence to the prior cumulative re… | procedure | missing |  |
| Case outstanding claims equal cumulative reported (case-incurred) claims minus cumulative paid claims. | definition | syllabus | Case Reserves: “$$= \text{Paid Losses} + \text{Case Reserves}$$” |
| In the case outstanding development technique, unpaid claims = case outstanding × (1 + IBNR/case ratio), where IBNR/case = (1 − percent rep… | formula | tagged | Case Outstanding Development Method: “$$U = \text{Paid to date} + \text{Case Outstanding} \times f_{\text{case}}$$” |
| The case outstanding development technique uses the selected percentages reported and paid at the current evaluation age (after the period'… | fact | tagged | Case Outstanding Development Method: “$f_{\text{case}}$ converts the current case balance into *all* remaining payments” |

</details>

<details><summary><code>cas5-2014s-q3</code> · answerable</summary>

Tagged pages: Earned Exposure, Calendar Year, In-Force

| Item | Kind | Status | Where |
|---|---|---|---|
| Written exposures for a calendar year are the exposures of policies written (effective) in that year; a mid-term cancellation produces nega… | definition | tagged | Earned Exposure: “A $12$-month policy contributes **one** earned car-year in total, spread pro rata over its term: wr…” |
| Earned exposure is the portion of a policy's exposure whose coverage period has already elapsed as of a date, and unearned exposure is the … | definition | tagged | Earned Exposure: “**Earned Exposure** is the portion of written exposure for which coverage has actually been provide…” |
| In-force exposure as of a date counts policies that are in effect (effective on or before the date and not yet expired or cancelled) on tha… | definition | tagged | In-Force: “**In-Force** describes the policies, exposures or premium that are actively providing coverage at a…” |
| With exposure earned uniformly over an annual policy term, the fraction earned at a date equals the elapsed time since the effective date d… | fact | tagged | Earned Exposure: “A $12$-month policy contributes **one** earned car-year in total, spread pro rata over its term: wr…” |
| A cancelled policy's exposure ends at its cancellation date; a policy that is in force on a date must have been cancelled after that date, … | fact | linked | Written Premium: “Written premium may still change after issuance — endorsements, cancellations and [[Premium Audit\\|…” |

</details>

<details><summary><code>cas5-2014s-q4</code> · answerable</summary>

Tagged pages: Ratemaking Data Organization, Large Loss, Complement of Credibility, Pure Premium Method, Credibility, Loss Trend, Loss Development, Policy Provision Changes

| Item | Kind | Status | Where |
|---|---|---|---|
| Historical losses must be developed to ultimate and trended to the future period in which the rates will be in effect; using unadjusted his… | fact | tagged | Loss Trend: “Trend and [[Loss Development\\|development]] answer different questions and must both be applied: de…” |
| The pure premium method computes the indicated rate from projected ultimate losses (and LAE) per exposure, so it uses exposures rather than… | definition | tagged | Pure Premium Method: “**Pure Premium Method** derives the indicated **rate** directly: project loss and LAE per exposure,…” |
| Exposures should be trended to the projected period when the exposure base is inflation sensitive. | fact | tagged | Pure Premium Method: “Inputs: losses developed to ultimate and trended, [[Earned Exposure\\|earned exposures]] (trended if…” |
| When underwriting changes such as a higher minimum deductible will alter future covered losses, restate historical losses and LAE to the ne… | procedure | tagged | Policy Provision Changes: “The adjustment is a **pro-forma restatement**: take each historical claim and recompute what the in…” |
| Experience from a small number of exposures or a single year has low credibility and should be supplemented by lengthening the experience p… | fact | tagged | Complement of Credibility: “When $Z$ is low — a small class, a new territory, an excess layer — the complement, not the data, d…” |
| Excluding losses above a cap from the indication understates losses and makes rates inadequate; losses above the cap must be included via a… | fact | tagged | Large Loss: “The standard treatment has three steps: **cap** each claim at a threshold $M$ for the experience an…” |
| The capping level should be chosen to include as much loss data as possible while limiting the volatility introduced by large losses, and p… | fact | tagged | Large Loss: “Ideally the threshold is the point at which losses become extraordinary and their inclusion makes r…” |

</details>

<details><summary><code>cas5-2014s-q5</code> · gap</summary>

Tagged pages: Overall Rate Level Indication, Complement of Credibility, Development Factor, Credibility, Parallelogram Method, Premium Trend, Fixed Expenses

| Item | Kind | Status | Where |
|---|---|---|---|
| Use the parallelogram method to bring historical earned premium to current rate level, weighting each rate change by the portion of the per… | procedure | tagged | Parallelogram Method: “- **Werner's six steps:** date the changes and form rate level groups; find each group's area in ea…” |
| Select a one-step premium trend from historical average premiums at current rate level, and apply it over the period from the average writt… | procedure | tagged | Premium Trend: “**One-step trending** applies a single selected annual trend across the whole period. It is adequat…” |
| Determine the trend period for premium and loss trend: from the average date of the experience period (average written or accident date) to… | procedure | tagged | Premium Trend: “The trend period $n$ runs from the average written date of the policies earning premium in the expe…” |
| Develop reported loss and ALAE to ultimate by multiplying by the cumulative development factor, built from selected age-to-age factors (cha… | procedure | tagged | Development Factor: “**Development Factor** (link ratio or age-to-age factor) is the ratio used to project cumulative lo…” |
| When selecting age-to-age factors, choose an averaging method that reflects a change in the claims process (such as new claims software): u… | fact | tagged | Development Factor: “**Latest-$k$-year average**: uses only the most recent $k$ accident years — reduces the influence o…” |
| Apply one-step loss trend to developed ultimate losses over the period from the accident period's average date to the average date the new … | procedure | linked | Loss Trend: “$t$ is the selected annual trend and $n$ the **trend period**, measured from the average date of lo…” |
| Select the fixed expense provision by averaging historical fixed expense ratios while excluding anomalous years caused by extraordinary eve… | procedure | missing |  |
| Indicated rate change = (projected loss & LAE ratio + fixed expense ratio) / (1 − variable expense ratio − profit and contingencies provisi… | formula | tagged | Overall Rate Level Indication: “$$\text{Indicated Change} = \frac{\text{Projected Loss \& LAE Ratio} + F\%}{1 - V - Q_T} - 1$$” |
| Desirable qualities of a credibility complement include being independent of (uncorrelated with) the base statistic, unbiased, easy to comp… | definition | tagged | Complement of Credibility: “(3) **statistically independent** from the base statistic, or any error in the base statistic can b…” |
| Countrywide loss costs as a complement are readily available and easy to compute, but they include the state's own data, so they are not fu… | fact | tagged | Complement of Credibility: “**Loss costs of a larger group that includes the group being rated** — e.g. all states in the regio…” |

</details>

<details><summary><code>cas5-2014s-q6</code> · untagged</summary>

Tagged pages: Classification Ratemaking, Moral Hazard, Actuary

| Item | Kind | Status | Where |
|---|---|---|---|
| Criteria for evaluating a rating variable in a risk classification system fall into four categories: statistical (e.g., significance, credi… | fact | linked | Homogeneity: “Werner's criteria for evaluating a rating variable (after Finger's *Risk Classification*) are **sta…” |
| An operational criterion requires a rating variable to be objective, well defined, and practical to obtain and verify, so that policyholder… | definition | tagged | Classification Ratemaking: “**Operational** — objective, inexpensive to obtain and verify, not manipulable by the insured.” |
| Privacy is a social consideration: rating variables requiring personal or intrusive information may be viewed by the public as an invasion … | fact | tagged | Classification Ratemaking: “**Social** — privacy, causality, controllability and affordability; these are where public and regu…” |
| Causality is a social consideration: a variable with a plausible causal relationship to losses is more readily accepted by the public, but … | fact | elsewhere | Rating Variable: “It must be statistically related to expected losses; a causal story strengthens the case, but ASOP …” |
| Controllability is a social consideration: a rating variable is more acceptable when the insured can influence their own classification by … | definition | elsewhere | Rating Variable (collapsed): “- **Social:** it passes. The variable is controllable by the insured, causally intuitive and not a …” |
| A rating variable must be permitted by law, so the insurer must check state regulations on whether a variable may be used for rating. | fact | tagged | Classification Ratemaking: “**Legal** — some variables are prohibited outright in some jurisdictions.” |

</details>

<details><summary><code>cas5-2014s-q7</code> · untagged</summary>

Tagged pages: Complement of Credibility, Increased Limits, Credibility, Loss Ratio

| Item | Kind | Status | Where |
|---|---|---|---|
| Under the increased limits (ILF) approach for a layer's complement of credibility, scale the capped (basic-limit) losses by the ratio of th… | procedure | tagged | Increased Limits: “$$\text{Layer } (M, L] \text{ cost} = \text{Basic LC} \times \left[\text{ILF}(L) - \text{ILF}(M)\ri…” |
| In the limits analysis approach, the complement for a layer equals the expected total limits loss ratio times the sum, over each policy lim… | formula | elsewhere | Excess of Loss: “For casualty, use a severity curve or ILFs: $\big[E[X \wedge \min(PL, R+L)] - E[X \wedge \min(PL, R…” |
| Policies with limits at or below a layer's attachment point contribute nothing to losses in that layer, while policies with limits at or ab… | fact | elsewhere | Excess of Loss (collapsed): “The layer tops out at $\$1$M, so for both limits the numerator is $\text{ILF}(1\text{M}) - \text{IL…” |
| The ratio of a limit's ILF to another's applies to premium and losses alike, so the ILF ratio multiplied by premium and the expected loss r… | fact | elsewhere | Excess of Loss: “In both cases the factor multiplies subject premium times the expected loss ratio.” |
| Criticisms of the limits analysis approach: it assumes the same expected loss ratio for all limits, and it relies on ILFs and industry data… | fact | tagged | Increased Limits: “Data at high limits is sparse and volatile, which is why ILFs are calculated from a broader body of…” |

</details>

<details><summary><code>cas5-2014s-q8</code> · untagged</summary>

Tagged pages: Territory Ratemaking, Earned Exposure, Classification Ratemaking, Pure Premium Analysis

| Item | Kind | Status | Where |
|---|---|---|---|
| Under the adjusted pure premium method, adjust each territory's exposures for the other rating variable by weighting exposures by that vari… | procedure | elsewhere | Balancing Back: “When other rating variables also apply, each class's exposures are first multiplied by their averag…” |
| Adjusted pure premium for a class = loss and LAE divided by the exposures adjusted (weighted) by the other variable's current relativities. | formula | elsewhere | Balancing Back: “When other rating variables also apply, each class's exposures are first multiplied by their averag…” |
| Indicated relativity for a class equals its pure premium divided by the overall (total) average pure premium; relativity to base equals the… | formula | tagged | Territory Ratemaking: “$$\text{Territory Relativity}_i = \frac{\text{Pure Premium}_i}{\text{Pure Premium}_{\text{base}}}$$” |
| Indicated relativity change equals indicated relativity (relative to base) divided by current relativity, minus 1. | formula | elsewhere | Balancing Back (collapsed): “A class's rate change is $(1 + \Delta)\,\text{OBF}\,r_i^{\text{new}}/r_i^{\text{old}} - 1$.” |
| Keeping the base territory's relativity at 1.0 means indicated relativities are rebased to the base class, and the overall change is revenu… | fact | tagged | Classification Ratemaking: “Relativity changes almost always change the average rate. The base rate must be adjusted so that th…” |

</details>

<details><summary><code>cas5-2014s-q9</code> · untagged</summary>

Tagged pages: Generalized Linear Model, Credit, Frequency, Predictive Analytics, Classification Ratemaking

| Item | Kind | Status | Where |
|---|---|---|---|
| Interpret GLM output for a rating variable by comparing each level's indicated relativity with its standard error: non-overlapping standard… | procedure | elsewhere | Statistical Significance: “The 95% [[Confidence Interval\\|confidence interval]] is $\hat{\beta} \pm 1.96\,\mathrm{SE}$, and ex…” |
| Levels with low exposure or volume have low credibility, so their GLM-indicated relativities are less reliable and should be adjusted when … | fact | linked | Credibility: “Partial credibility uses the **square root rule**, $Z = \sqrt{n / n_{\text{full}}}$, capped at $1$ …” |
| A model built on only one year of data may be distorted by anomalies, shock losses, or random fluctuation, so its results may not be reliab… | fact | tagged | Generalized Linear Model: “A small class with one unusually large loss can look very risky with the loss in the data and very …” |
| Operational criteria for a good rating variable: objective, clearly defined, easy to administer and verify, and not manipulable by the insu… | definition | tagged | Classification Ratemaking: “**Operational** — objective, inexpensive to obtain and verify, not manipulable by the insured.” |
| Social criteria for a rating variable include affordability, causality (a logical relationship to expected loss), controllability by the in… | definition | tagged | Classification Ratemaking: “**Social** — privacy, causality, controllability and affordability; these are where public and regu…” |
| Failing to charge a rate that reflects a high-risk group's true expected loss (underpricing) can lead to adverse selection against the insu… | fact | tagged | Classification Ratemaking: “In a competitive market an insurer that charges one average rate to a heterogeneous group loses the…” |
| Credit score is a commonly used insurance rating variable whose use is debated: it is predictive of loss and easy to verify, but it may lac… | fact | elsewhere | Credit-Based Insurance Scoring: “It is one of the most predictive [[Rating Variable\\|rating variables]] U.S. insurers use and one of…” |

</details>

<details><summary><code>cas5-2015f-q1</code> · answerable</summary>

Tagged pages: On Level Premium, Earned Exposure, Calendar Year, Earned Premium, Exposure Base, Parallelogram Method, Extension of Exposures

| Item | Kind | Status | Where |
|---|---|---|---|
| Written exposures for a calendar year are the exposures of policies written (effective) during that year; earned exposures are the portion … | definition | tagged | Earned Exposure: “**Earned Exposure** is the portion of written exposure for which coverage has actually been provide…” |
| With a car-year exposure base, a policy with a term shorter than one year contributes only the fraction of a car-year equal to its term (e.… | procedure | tagged | Earned Exposure: “A $12$-month policy contributes **one** earned car-year in total, spread pro rata over its term: wr…” |
| Earned exposure in a calendar year for a policy is its exposure multiplied by the fraction of its term falling in that year, assuming expos… | procedure | tagged | Earned Exposure: “With policies written **uniformly** through the year, a calendar year earns roughly half of that ye…” |
| Parallelogram method: draw the policy-year/calendar-year square, find the area earned at the new rate level in the calendar year, compute t… | procedure | tagged | On Level Premium: “$$\text{On-Level Factor} = \frac{\text{Current cumulative rate level index}}{\text{Average rate lev…” |
| The parallelogram method assumes policies are written uniformly throughout the period; it is inappropriate when writings are concentrated o… | fact | tagged | Parallelogram Method: “It assumes uniform writing — false for seasonal business such as boat owners, whose policies are bo…” |
| Extension of exposures: re-rate each earned exposure at current rates, so earned premium at current rate level equals earned exposures time… | procedure | tagged | Extension of Exposures: “**Extension of Exposures** is the [[On-Leveling\\|on-leveling]] method that re-rates every historica…” |
| Premium per policy for a term shorter than a year must be annualized (e.g., multiplied by 12/term in months) when applied to car-year expos… | procedure | linked | In-Force (collapsed): “Each policy in force contributes its full-term premium — D its six-month $\$500$, not an annualized…” |

</details>

<details><summary><code>cas5-2015f-q10</code> · untagged</summary>

Tagged pages: Generalized Linear Model, Exposure Base, Loss Ratio Method, Loss Ratio, Classification Ratemaking

| Item | Kind | Status | Where |
|---|---|---|---|
| A good rating variable produces clear differentiation between its levels, i.e. distinct indicated relativities for each level. | fact | elsewhere | Rating Variable: “A categorical one uses the levels of a [[Categorical Predictor\\|categorical predictor]], possibly w…” |
| A good rating variable has stable, consistent indicated relativities from year to year (stability over time). | fact | elsewhere | Rating Variable: “Models lose accuracy as the world changes, so they are also rebuilt periodically.” |
| Assess statistical significance of a GLM relativity by checking whether its +/-2 standard error band (approximate 95% confidence interval) … | procedure | elsewhere | Confidence Interval (collapsed): “Urban risks are estimated to have $12\%$ to $80\%$ higher frequency. The interval excludes $1.00$, …” |
| When the one-way loss ratio relativity differs materially from the GLM relativity, the variable is probably correlated with other rating va… | fact | tagged | Classification Ratemaking: “A **univariate** (one-way) pure premium or loss ratio analysis attributes to a variable the effect …” |
| Levels with very few exposures yield less credible, more volatile estimates (wider standard errors), so such a level may be combined with a… | fact | tagged | Generalized Linear Model: “Very high correlation makes the model unstable, with erratic coefficients, large standard errors an…” |
| Operational and practical criteria for a good rating variable include objectivity/controllability, ease and cost of verification, resistanc… | definition | tagged | Classification Ratemaking: “**Operational** — objective, inexpensive to obtain and verify, not manipulable by the insured.” |
| A recommendation on adding a rating variable weighs statistical evidence (differentiation, stability, significance) against operational cri… | procedure | tagged | Generalized Linear Model: “Model relativities are still [[Credibility\\|credibility]]-weighted and are still subject to the ope…” |

</details>

<details><summary><code>cas5-2015f-q11</code> · answerable</summary>

Tagged pages: Classification Ratemaking, Minimum Premium, Insurance Premium, In-Force, Extension of Exposures

| Item | Kind | Status | Where |
|---|---|---|---|
| Using the extension of exposures method, compute current premium by multiplying each cell's exposures by the base rate and the current rela… | procedure | tagged | Classification Ratemaking: “$$\text{Rate}_i = \text{Base Rate} \times \prod_k R_{i,k}$$” |
| The target premium after a rate change equals current premium times one plus the indicated overall average rate change. | procedure | linked | Rate Change: “Taking $+8.0\%$ on the base rate *and* implementing the new relativities would deliver $1.08 \times…” |
| When the base class is kept, rebase the indicated relativities by dividing each level's indicated relativity by the indicated relativity of… | procedure | tagged | Classification Ratemaking: “$$\text{Relativity}_i = \frac{\text{Pure Premium}_i}{\text{Pure Premium}_{\text{base}}}$$” |
| To find the new base rate, set the proposed premium (exposures times new base rate times proposed relativities, summed) equal to the target… | procedure | tagged | Classification Ratemaking: “**Off-balance.** Relativity changes almost always change the average rate. The base rate must be ad…” |
| A minimum premium requirement means any policy whose calculated premium falls below the minimum is charged the minimum premium instead. | definition | tagged | Minimum Premium: “$$\text{Premium} = \max\!\left(\text{Rate} \times \text{Exposure},\; \text{Minimum Premium}\right)$$” |
| Identify which classes fall below the minimum premium using the new base rate and relativities, then compute the extra premium raised by ch… | procedure | tagged | Minimum Premium (collapsed): “Since $\$600 < \$750$, the minimum applies and the charge is $\$750$.” |
| Offset the extra premium from the minimum premium by lowering the base rate: divide the base rate by an off-balance factor of one plus the … | procedure | tagged | Classification Ratemaking: “**Off-balance.** Relativity changes almost always change the average rate. The base rate must be ad…” |

</details>

<details><summary><code>cas5-2015f-q12</code> · gap</summary>

Tagged pages: Coinsurance Rating, Coinsurance, Pure Premium, Frequency, Probability, Limited Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The coinsurance requirement means the insured must carry insurance at least equal to the coinsurance percentage times the property value; t… | definition | syllabus | Coinsurance Percentage: “The insured must carry insurance of at least $cV$, e.g. $80\%$ of the property's value $V$, or the …” |
| With a coinsurance penalty, the indemnity is I = min(L × F/(cV), L, F), where L is the loss, F the amount of insurance, c the coinsurance r… | formula | syllabus | Coinsurance Percentage: “$$I = L \times \frac{F}{cV}, \quad \text{where } I \le F \text{ and } I \le L$$” |
| The coinsurance penalty as a function of loss rises linearly from the origin to its maximum at L = F (where the indemnity reaches the face … | fact | missing |  |
| For a loss distribution mixing a point mass at total loss with a uniform distribution on the remaining losses, the probability of each segm… | procedure | missing |  |
| The limited average severity at the amount of insurance is the probability-weighted average of losses capped at the amount of insurance: un… | formula | tagged | Limited Expected Value: “The **Limited Expected Value** (LEV) of a random variable $X$ at limit $u$ is the expected value of…” |
| Pure premium equals loss frequency times limited average severity. | formula | tagged | Pure Premium: “$$\text{Pure Premium} = \text{Frequency} \times \text{Severity}$$” |
| The rate per $1000 of insurance equals the pure premium divided by the amount of insurance in thousands. | procedure | missing |  |

</details>

<details><summary><code>cas5-2015f-q13</code> · gap</summary>

Tagged pages: Retrospective Rating, Insurance Premium, Minimum Premium

| Item | Kind | Status | Where |
|---|---|---|---|
| Retrospective premium = (basic premium + loss conversion factor × limited reported losses) × tax multiplier, subject to the minimum and max… | formula | tagged | Retrospective Rating: “$$R = \left(\text{BP} + L \times \text{LCF}\right) \times \text{TM}$$” |
| The minimum and maximum retrospective premiums equal the minimum and maximum retro premium ratios multiplied by the standard premium. | formula | missing |  |
| If the calculated retrospective premium falls below the minimum, the minimum premium is charged; if it exceeds the maximum, the maximum is … | procedure | tagged | Retrospective Rating: “$$\text{Retro Premium} = \min\!\left(\max(R,\, R_{\min}),\, R_{\max}\right)$$” |
| A retrospectively rated policy's premium is recomputed at each successive evaluation age using the limited reported losses at that age, wit… | fact | tagged | Retrospective Rating: “Incurred loss retro plans are typically first evaluated 6 months after policy expiration (18 months…” |

</details>

<details><summary><code>cas5-2015f-q14</code> · answerable</summary>

Tagged pages: Reserving Data Organization, Frequency-Severity Method, Mix of Business, Unpaid Claims, Severity, Data Segmentation

| Item | Kind | Status | Where |
|---|---|---|---|
| Combining segments (e.g., states) in an unpaid claims analysis gives more data volume and greater credibility/stability, which favors combi… | fact | tagged | Data Segmentation: “fine enough that each group's risks share similar expected costs and emergence patterns ([[Homogene…” |
| Combined data should be homogeneous with a stable mix of business; differing policy limits or a shifting mix of volume between segments mak… | fact | tagged | Mix of Business: “In **reserving**, a mix shift breaks the [[Homogeneity\\|homogeneity]] assumption behind the [[Devel…” |
| Reported CDFs (loss development patterns) that are similar across segments support combining those segments, since combining will not mater… | fact | tagged | Data Segmentation: “group claims that share coverage (the same laws, policy terms and claims handling), with enough cla…” |
| Higher policy limits allow larger claims, so a segment with higher limits has higher expected severity, and a shift in the mix of business … | fact | tagged | Severity: “For that reason severity is usually studied on **capped** or **basic limits** data, with the excess…” |

</details>

<details><summary><code>cas5-2015f-q15</code> · answerable</summary>

Tagged pages: Large Loss, Unpaid Claims, Credibility, Line of Business, Chain Ladder Method, Bornhuetter-Ferguson Method

| Item | Kind | Status | Where |
|---|---|---|---|
| A large claim threshold should reflect the number of claims exceeding it, so that enough large claims exist to assess them credibly and the… | fact | tagged | Large Loss: “Otherwise Werner sets it to balance including as many losses as possible against minimizing volatil…” |
| A large claim threshold should consider the size of claims relative to policy limits and reinsurance retention or limits, since these cap o… | fact | tagged | Large Loss: “where the size-of-loss distribution varies a lot by policy (property), as a percentage of the amoun…” |
| A large claim threshold may vary by line of business and by the size of the book, and can be informed by loss distribution percentiles, ind… | fact | tagged | Large Loss: “for example at the $99$th percentile of claim sizes, or at a percentage of losses” |
| Large claims distort the development technique because LDFs derived from data without large claims (or leveraged by large claims) are appli… | fact | tagged | Large Loss: “Leaving a $\$2$M claim in an immature diagonal and multiplying it by a CDF of $4$ produces an $\$8$…” |
| The Bornhuetter-Ferguson technique is less affected by large claims than the development technique because its unpaid claims are based on a… | fact | tagged | Bornhuetter-Ferguson Method: “The key structural property: **actual emergence is taken at face value and only the unemerged porti…” |

</details>

<details><summary><code>cas5-2015f-q16</code> · answerable</summary>

Tagged pages: Development Triangle, Accident Year, Report Year, Mix of Business, Deductible Recovery

| Item | Kind | Status | Where |
|---|---|---|---|
| Report year aggregation groups claims by the year in which they were reported, whereas accident year aggregation groups claims by the year … | definition | tagged | Accident Year: “**Accident Year** (AY) is a data aggregation method that groups losses by the calendar year in whic…” |
| Reported (incurred) claims at an evaluation date equal cumulative paid claims plus case outstanding reserves, net of any recoveries such as… | definition | linked | Incurred Losses: “$$\text{Reported (Incurred)} = \text{Paid} + \text{Case Reserves}$$” |
| To build a cumulative development triangle, assign each claim to its aggregation period, evaluate its cumulative amount at each annual valu… | procedure | tagged | Development Triangle: “Cell $C_{\text{AY},k}$ holds the cumulative amount for that accident year at age $k$. The triangle …” |
| Paid claims count only actual payments net of recoveries; case outstanding is excluded, and a claim closed without payment contributes zero… | fact | tagged | Deductible Recovery: “$$\text{Net Loss} = \text{Gross Paid} - \text{Collected Recoveries}$$” |
| Report year aggregation has fixed claim counts at year end, suits claims-made policies and shifts in legal climate tied to report date, and… | fact | tagged | Report Year: “A report year **closes to new claims** at year end — pure [[IBNR]] is zero by construction, since e…” |
| Accident year aggregation is common with abundant industry benchmarks, easy to understand, and useful for changes in legal or economic envi… | fact | tagged | Accident Year: “Premium and losses are only *approximately* matched. AY $n$ earned premium comes partly from polici…” |

</details>

<details><summary><code>cas5-2015f-q17</code> · answerable</summary>

Tagged pages: Expected Loss Method, Accident Year, Earned Premium, Loss Ratio, Credibility, Chain Ladder Method, Loss Trend

| Item | Kind | Status | Where |
|---|---|---|---|
| An age-to-age (link ratio) factor is the reported claims at a later age divided by the reported claims at the prior age for the same accide… | formula | linked | Age to Age Factor: “$$f_{n \to n+1}^{\text{AY}} = \frac{C_{\text{AY},\,n+1}}{C_{\text{AY},\,n}}$$” |
| Select an age-to-age factor for each development period from the observed factors using an average (volume-weighted, simple, geometric, or … | procedure | linked | Age to Age Factor: “Look at the column **before** averaging it. A steady column supports a volume-weighted all-year sel…” |
| Compute the age-to-ultimate factor (CDF) by multiplying the selected age-to-age factors from the given age through the last development age… | procedure | linked | Cumulative Development Factor: “CDFs are built **backwards from the tail**: start with the tail factor, multiply in each successive…” |
| The reported development technique estimates ultimate claims as reported claims to date times the age-to-ultimate factor for that age. | formula | tagged | Chain Ladder Method: “$$U_{\text{AY}} = C_{\text{AY},\,n} \times \text{CDF}_{n \to \text{ult}}$$” |
| In the expected claims technique, estimate each prior year's ultimate claims by developing it to ultimate, trend it to the cost level of th… | procedure | tagged | Expected Loss Method: “The **ELR** is the whole method, and it must be derived, not assumed: from the pricing indication f…” |
| Select the expected claim ratio from prior years' ratios (excluding the year being projected), justified by the pattern in the data such as… | procedure | tagged | Expected Loss Method: “Select $70\%$ as the base-year (AY 2020) expectation, from the three mature years.” |
| Annual claims trend compounds, so trending a year's claims to a later cost level multiplies by (1 + trend) raised to the number of years be… | fact | tagged | Loss Trend: “$$\text{Trend Factor} = (1 + t)^{n}$$” |

</details>

<details><summary><code>cas5-2015f-q18</code> · gap</summary>

Tagged pages: Bornhuetter-Ferguson Method, Development Factor, Loss Development, Accident Year, Age to Age Factor, Cumulative Development Factor

| Item | Kind | Status | Where |
|---|---|---|---|
| The age-to-age (link ratio) factor for a development interval is the cumulative reported claims at the later age divided by cumulative repo… | formula | tagged | Development Factor: “$$f_{n \to n{+}1} = \frac{\text{Losses at age }n{+}1}{\text{Losses at age }n}$$” |
| Select an age-to-age factor for each development interval from the observed factors (e.g., simple average, excluding anomalous outliers), a… | procedure | tagged | Development Factor: “**Volume-weighted average**: $\Sigma(\text{col }n{+}1) / \Sigma(\text{col }n)$ — gives more credibi…” |
| The cumulative development factor (CDF) to ultimate at a given age is the product of the selected age-to-age factors from that age through … | procedure | tagged | Loss Development: “$$\text{CDF}_{n \to \text{ult}} = \prod_{k \ge n} f_{k \to k+1} \times \text{Tail}$$” |
| Bornhuetter-Ferguson ultimate claims = reported claims to date + (a priori expected claim ratio × earned premium) × (1 − 1/CDF), where the … | formula | tagged | Bornhuetter-Ferguson Method: “$$U_{\text{BF}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) \times U_{0}$$” |
| The BF method can be interpreted as a credibility weighting of the development (chain-ladder) method and the expected claims method, with c… | fact | tagged | Bornhuetter-Ferguson Method: “BF is a **credibility weighting** in disguise: it equals $Z \, U_{\text{CL}} + (1-Z)\,U_0$ with $Z …” |
| When CDFs are less than 1.00, the implied credibility Z = 1/CDF exceeds 1, which is not a valid credibility weight; the BF method may still… | fact | missing |  |

</details>

<details><summary><code>cas5-2015f-q19</code> · answerable</summary>

Tagged pages: Reserve Adequacy, Age to Age Factor, Line of Business, Accident Year, Reasonableness Testing, Tail Factor, Bornhuetter-Ferguson Method

| Item | Kind | Status | Where |
|---|---|---|---|
| The development (chain-ladder) method estimates ultimate claims as current reported or paid claims multiplied by the cumulative development… | formula | linked | Chain Ladder Method: “**Chain Ladder Method** (development or link-ratio method) projects each cohort to ultimate by mult…” |
| The Bornhuetter-Ferguson ultimate equals actual reported (or paid) claims to date plus expected claims (earned premium × expected claims ra… | formula | tagged | Bornhuetter-Ferguson Method: “$$U_{\text{BF}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) \times U_{0}$$” |
| A tail factor beyond the last observed age can be selected from the ratio of reported claims to paid claims at the latest maturity, and the… | procedure | tagged | Tail Factor: “**Paid-to-reported convergence** — reported losses must eventually equal paid, so the ratio of the …” |
| The expected claims ratio in B-F should be selected by reviewing the ultimate claims ratios from historical years and methods, and lowered … | procedure | syllabus | Ultimate Loss: “The ultimate loss ratio ($U / \text{EP}$) is the number that links reserving to pricing: it is the …” |
| A drop in the paid-to-reported claims ratio at a given maturity, together with a jump in reported claims but stable paid claims, indicates … | fact | linked | Loss Development: “a rising ratio is consistent with faster settlement or weaker case reserves, a falling one with slo…” |
| To adjust for a change in case reserve adequacy, restate reported claims (or the reported CDF) by the adequacy change factor, e.g. dividing… | procedure | syllabus | Case Adequacy: “The remedy is the [[Berquist-Sherman Method\\|Berquist-Sherman]] case adjustment: restate historical…” |
| If case reserve adequacy has increased, reported-claims-based methods (reported development, and to a lesser degree reported B-F) overstate… | fact | tagged | Bornhuetter-Ferguson Method: “BF's answer moves dollar-for-dollar with a reporting anomaly; the chain ladder's moves by CDF-times.” |
| Assess a selected ultimate by comparing it to the revised method estimates (range, average) and explaining why it lies outside them, consid… | procedure | syllabus | Loss Reserving: “No method is right; the **selection** is the deliverable. Methods disagree in informative ways, and…” |

</details>

<details><summary><code>cas5-2015f-q2</code> · answerable</summary>

Tagged pages: Exposure Base, Line of Business, Moral Hazard, Insurance Premium

| Item | Kind | Status | Where |
|---|---|---|---|
| An exposure base is a measure of the size of the risk or unit of exposure (e.g., sales, payroll, number of patients) to which a rate is app… | definition | tagged | Exposure Base: “**Exposure Base** is the basic unit of risk that underlies the premium — the quantity the rate is c…” |
| A good exposure base is proportional to expected losses, meaning it is correlated with and responsive to changes in the underlying exposure… | fact | tagged | Exposure Base: “**Proportional to expected loss.** All else equal, a policy with two exposures should have twice th…” |
| A good exposure base is practical: it is easy and inexpensive to obtain and verify, and hard for the insured to manipulate or misreport (li… | fact | tagged | Exposure Base: “**Practical.** Objective, and relatively easy and inexpensive to obtain and verify — which also kee…” |
| A good exposure base has historical precedence: using the established industry-standard base avoids large premium swings and system change … | fact | tagged | Exposure Base: “**Consistent with historical precedence.** A change of base can cause large premium swings for indi…” |
| Common exposure bases by line: sales/revenue for general liability, and number of patients, physicians/nurses, or occupied beds for hospita… | fact | tagged | Exposure Base: “Common bases: earned car-years (personal auto), earned house-years (homeowners), payroll — in hundr…” |

</details>

<details><summary><code>cas5-2015f-q20</code> · answerable</summary>

Tagged pages: Frequency-Severity Method, Deductible, Severity, Frequency, Unpaid Claims, Policy Provision Changes

| Item | Kind | Status | Where |
|---|---|---|---|
| The frequency-severity technique is applicable to all lines but is most often used for long-tailed lines, where ultimate severities are not… | fact | tagged | Frequency-Severity Method: “Projecting each with the tool it suits — development for counts, trend for severity — is often bett…” |
| General liability is a long-tailed, low-frequency, high-severity line, so analyzing frequency and severity separately is sensible. | fact | syllabus | Long Tail Lines: “Typical long-tail lines: medical malpractice, workers compensation (especially permanent total disa…” |
| The frequency-severity technique assumes that claim definitions, policy terms and the mix of claims (e.g., deductible levels) are consisten… | fact | tagged | Frequency-Severity Method: “The method needs **consistent count definitions** across the whole triangle, and it is sensitive to…” |
| Lowering the deductible increases claim frequency (more losses exceed the deductible and are reported as claims) and changes average severi… | fact | tagged | Policy Provision Changes: “A higher deductible eliminates small, fast-closing claims, so the surviving claims are larger and s…” |
| Data on losses below a large deductible are censored/unavailable, so historical data cannot be restated to a smaller deductible basis witho… | fact | syllabus | Deductible Rating: “When the data hold only losses net of the deductible, policies with a deductible *higher* than the …” |
| When policy terms change, use policy-year rather than accident-year grouping to separate policies with different deductibles, and adjust pr… | procedure | tagged | Policy Provision Changes: “On a [[Policy Year]] basis the change is clean; on an [[Accident Year]] basis it phases in over rou…” |
| The expected claims method or Bornhuetter-Ferguson method, using an expected claim ratio selected from judgment or industry data, is prefer… | procedure | linked | Underwriting Changes: “The responses here are to weight recent years more heavily, to segment the data so the changing mix…” |

</details>

<details><summary><code>cas5-2015f-q21</code> · answerable</summary>

Tagged pages: Berquist-Sherman Method, Settlement Rate, Severity

| Item | Kind | Status | Where |
|---|---|---|---|
| A disposal rate is the cumulative closed claim count at a given age divided by the ultimate reported claim count for that accident year. | definition | tagged | Settlement Rate: “$$\text{Disposal Rate}_n = \frac{\text{Closed claims at age } n}{\text{Ultimate claim counts}}$$” |
| Ultimate reported claim counts are estimated by developing the reported count triangle with age-to-age factors, selecting an average for ea… | procedure | syllabus | Claim Count Triangle: “$$\text{Ultimate Counts} = N_n \times \text{CDF}^{\text{count}}_{n \to \text{ult}}$$” |
| A Berquist-Sherman paid claim adjustment is appropriate when disposal rates show a change in the rate of settlement (e.g., a shift along th… | fact | tagged | Berquist-Sherman Method: “Which adjustment applies is decided by the **diagnostic**, not by preference: a jump in average cas…” |
| The Berquist-Sherman paid adjustment assumes that a higher proportion of closed claim counts corresponds to a higher proportion of claims p… | fact | tagged | Berquist-Sherman Method: “For each historical cell, interpolate the paid losses that *would* have been paid had that year clo…” |
| Falling paid severity on closed claims together with rising disposal rates suggests a change in claim handling, such as closing small claim… | fact | syllabus | Close Year: “Closed-claim severity therefore **understates** ultimate severity, and the bias is worst in the [[L…” |

</details>

<details><summary><code>cas5-2015f-q22</code> · gap</summary>

Tagged pages: Loss Development, Deductible, Mix of Business, Accident Year, Policy Year, Changing Conditions, Chain Ladder Method

| Item | Kind | Status | Where |
|---|---|---|---|
| At early maturities the development (chain-ladder) technique is highly leveraged: small fluctuations in the few reported or paid losses are… | fact | tagged | Loss Development: “**Long-tail lines** ([[Long Tail Lines\\|liability, workers compensation]]) have large CDFs at early…” |
| When the development technique is too leveraged at early maturities, respond by using the Bornhuetter-Ferguson or Expected Claims method, w… | procedure | tagged | Chain Ladder Method: “There, [[Bornhuetter-Ferguson Method\\|BF]] or the [[Expected Loss Method\\|expected claims]] techniq…” |
| If a change such as tort reform or faster claim processing shortens development or lowers severity, historical development factors are too … | fact | tagged | Changing Conditions: “*Faster settlement*: paid development overstates; reported methods are largely unaffected.” |
| The Bornhuetter-Ferguson method is inappropriate when severity changes, because the change also alters the percent unreported implied by th… | fact | missing |  |
| To handle a shift in severity or settlement speed, use the Frequency-Severity technique with modified severity, or use report-year data, ra… | procedure | linked | Frequency-Severity Method: “Develop counts, but estimate severity by **trending** a mature year's severity forward rather than …” |
| When claim settlement speeds up (e.g., a new claims system), use the Berquist-Sherman method to adjust the historical data (paid and report… | procedure | linked | Berquist-Sherman Method: “**Berquist-Sherman Method** restates a historical [[Development Triangle\\|triangle]] so that every …” |
| Higher policy deductibles slow development, since losses take longer to reach the deductible and a larger share of loss comes from large cl… | fact | tagged | Mix of Business: “Other common causes: a new distribution channel, entering or exiting a territory, a change in the […” |
| To address a change in deductibles, restate historical claims at the current deductible level or use policy-year data, which isolates the c… | procedure | tagged | Changing Conditions: “restate history to current retentions or benefit levels.” |

</details>

<details><summary><code>cas5-2015f-q23</code> · untagged</summary>

Tagged pages: Net of Reinsurance, Reinsurance, Policy Year, Unpaid Claims, IBNR

| Item | Kind | Status | Where |
|---|---|---|---|
| IBNR (including IBNER) for a policy year equals the ultimate claims estimate minus reported (case-incurred) claims. | definition | tagged | IBNR: “$$\text{IBNR} = \text{Ultimate} - \text{Reported}$$” |
| Unpaid claims for a policy year equal the ultimate claims estimate minus claims paid to date. | formula | tagged | Unpaid Claims: “$$\text{Unpaid} = \text{Ultimate} - \text{Paid to date}$$” |
| To get claims net of all reinsurance when a policy has both excess of loss and stop loss cover, first apply the excess of loss cover to get… | procedure | elsewhere | Types of Reinsurance: “Order matters too: a surplus share may *inure* to the benefit of a per-risk or catastrophe cover, w…” |
| A stop loss limit caps the insurer's retained claims, so it must be applied consistently to the ultimate, reported, and paid amounts, since… | fact | elsewhere | Stop-Loss Reinsurance: “the insurer keeps $S \wedge d$, so the retention caps the insurer's total cost for the period.” |
| Unpaid claims net of reinsurance must use the net ultimate after the stop loss cap, not the net-of-XOL ultimate estimate. | fact | tagged | Unpaid Claims: “It must also reflect [[Salvage and Subrogation\\|salvage and subrogation]] and [[Reinsurance Recover…” |

</details>

<details><summary><code>cas5-2015f-q24</code> · gap</summary>

Tagged pages: Allocated Loss Adjustment Expense, Accident Year, Settlement Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| To project ultimate ALAE with a ratio technique, form a triangle of paid ALAE-to-paid claims ratios at each evaluation age and develop that… | procedure | tagged | Allocated Loss Adjustment Expense: “Friedland gives three approaches: develop a **combined** loss-and-ALAE triangle, develop **ALAE sep…” |
| Multiplicative age-to-age factors are the ratio of the value at the later age to the value at the earlier age, and age-to-ultimate factors … | formula | linked | Loss Development: “\text{CDF}_{n \to \text{ult}} = \prod_{k \ge n} f_{k \to k+1} \times \text{Tail}” |
| Select age-to-age factors from the historical triangle by averaging the observed factors across accident years at each maturity, using all … | procedure | linked | Development Triangle: “f_{k \to k+1} = \frac{\sum_{\text{AY}} C_{\text{AY},\,k+1}}{\sum_{\text{AY}} C_{\text{AY},\,k}}” |
| Ultimate ALAE-to-loss ratio by accident year equals the latest diagonal ratio times the age-to-ultimate factor (multiplicative) or plus the… | formula | syllabus | Chain Ladder Method: “U_{\text{AY}} = C_{\text{AY},\,n} \times \text{CDF}_{n \to \text{ult}}” |
| Convert the ultimate ALAE-to-claims ratio to ultimate ALAE dollars by multiplying it by the selected ultimate claims (not paid claims to da… | procedure | tagged | Allocated Loss Adjustment Expense (collapsed): “\text{Ultimate ALAE} &= 0.19 \times \$12{,}000{,}000” |
| The additive development technique computes age-to-age differences in the ratio (later minus earlier), sums them from a given age to the la… | procedure | missing |  |
| Multiplicative development is highly leveraged and sensitive to an unusually high early-maturity observation, while additive development is… | fact | linked | Cumulative Development Factor: “At a CDF of $4$, a dollar of distortion on the diagonal becomes four dollars of ultimate” |

</details>

<details><summary><code>cas5-2015f-q25</code> · answerable</summary>

Tagged pages: Actual vs Expected Analysis, Accident Year, Calendar Year, Settlement Rate, Actuary

| Item | Kind | Status | Where |
|---|---|---|---|
| The age-to-ultimate (cumulative) development factor is the ratio of ultimate claims to claims to date at a given maturity, and its reciproc… | definition | linked | Cumulative Development Factor: “The reciprocal is the **percentage reported** (or paid): $p_n = 1/\text{CDF}_n$, and $1 - p_n$ is t…” |
| At a valuation date, an accident year is at a maturity equal to 12 months times the number of years since the start of that accident year (… | fact | linked | Development Triangle: “**maturities as columns** (age in months since the start of the cohort), and **valuation dates as d…” |
| Expected incremental reported (or paid) claims in the next calendar year for the latest accident year equal (ultimate − claims to date) tim… | procedure | tagged | Actual vs Expected Analysis: “$$\text{Expected emergence} = U_{\text{prior}} \times \left(\frac{1}{\text{CDF}_{n+1}} - \frac{1}{\…” |
| To get expected emergence consistent with the actuary's selection, apply the same percent reported/paid pattern but use the selected ultima… | procedure | tagged | Actual vs Expected Analysis: “The **expected** figure comes from the prior ultimate and the emergence pattern: the share of ultim…” |
| Compare actual to expected reported and paid claims in the period; if actual emergence is consistent with expected (especially reported, wh… | procedure | tagged | Actual vs Expected Analysis: “**One period's deviation is noise; a run of them is a signal.** Emergence is volatile, so a single …” |
| Paid claims at early maturities are highly leveraged and volatile, and a shortfall in paid versus expected can reflect changes in settlemen… | fact | tagged | Settlement Rate: “**Faster settlement** pushes losses from open to paid, so the recent paid diagonal is high relative…” |

</details>

<details><summary><code>cas5-2015f-q3</code> · answerable</summary>

Tagged pages: Complement of Credibility, Credibility, Ratemaking, Rate Change

| Item | Kind | Status | Where |
|---|---|---|---|
| Credibility is the weight given to an insurer's own observed data (versus a complement) in an indication, reflecting how much predictive va… | definition | tagged | Credibility: “**Credibility** $Z$ is the weight given to a body of observed experience when it is blended with a …” |
| The role of credibility in ratemaking is to ensure rate changes reflect true signal rather than noise from sparse or erratic data, by blend… | fact | syllabus | Experience Rating: “Credibility rises with size. A small risk's mod stays near $1.0$ however good or bad its recent rec…” |
| The complement of credibility is the estimate (alternative information) that receives the remaining weight (1 - Z) when the observed data i… | definition | tagged | Complement of Credibility: “**Complement of Credibility** is the estimate that receives the weight $(1-Z)$ when observed experi…” |
| Desirable qualities of a credibility complement are that it is unbiased (accurately estimates the expected value), uncorrelated/independent… | fact | tagged | Complement of Credibility: “(2) **unbiased** — not routinely higher or lower than the observed experience; (3) **statistically …” |
| Evaluate a proposed complement by assessing it against each desirable quality, e.g., a complement from a larger related group's experience … | procedure | tagged | Complement of Credibility: “**Loss costs of a larger related group** — a *separate* but similar group, e.g. owners-form content…” |
| Trended present rates are an appropriate complement mainly when no larger group data is available; when larger related group data exists, i… | fact | tagged | Credibility (collapsed): “Note the complement here is the *current* relativity, which embeds whatever was believed last year.…” |

</details>

<details><summary><code>cas5-2015f-q4</code> · answerable</summary>

Tagged pages: Loss Trend, Trend, Accident Year, Exposure Base, Exponential Trend, Frequency, Severity

| Item | Kind | Status | Where |
|---|---|---|---|
| When the frequency or severity trend changes significantly over time, use a two-step trend: apply one selected trend from the historical pe… | procedure | tagged | Loss Trend: “losses are first trended at a *current* trend from the experience period's average accident date to…” |
| Select a trend from the exponential fits by judging stability across the different numbers of points: use a longer period when fits are sta… | procedure | tagged | Loss Trend: “exponential models may be fit to the whole of the data and to more recent periods, supplemented wit…” |
| The trend period runs from the average accident date of the historical experience period to the average accident date of the future period … | definition | tagged | Loss Trend: “$t$ is the selected annual trend and $n$ the **trend period**, measured from the average date of lo…” |
| The average accident date of the future period equals the rate effective date plus half of the period rates are in effect (to the average w… | procedure | tagged | Loss Trend (collapsed): “The first policy is exposed $7/1/2025$–$6/30/2026$ and the last $7/1/2026$–$6/30/2027$, so the expo…” |
| Pure premium trend factor equals (1 + frequency trend)^t multiplied by (1 + severity trend)^t, compounded over each trend period and multip… | formula | tagged | Loss Trend: “$$1 + t_{PP} = (1 + t_{\text{freq}})(1 + t_{\text{sev}})$$” |
| The average accident date of a calendar-accident-year-based period such as an accident year is its midpoint (e.g., July 1 for a calendar ye… | fact | tagged | Trend: “The trend period runs from the average date of historical losses (midpoint of the accident year) to…” |

</details>

<details><summary><code>cas5-2015f-q5</code> · answerable</summary>

Tagged pages: Policy Provision Changes, Loss Trend, Trend, Pure Premium, Insurance Premium

| Item | Kind | Status | Where |
|---|---|---|---|
| To adjust losses for direct benefit changes, compute the average benefit level for the period as the area-weighted average of benefit level… | procedure | linked | On-Leveling: “each region's **area** is the share of the year's earned premium written at that rate level.” |
| When a benefit change applies only to policies written on or after its effective date, the change phases in gradually over a policy term, s… | fact | linked | On-Leveling: “For **annual** policies written uniformly, a rate change effective at time $p$ through year $Y$ ear…” |
| When a benefit change applies to all claims occurring on or after its effective date, the boundary is a vertical line in accident time, and… | fact | linked | On-Leveling: “it takes effect immediately across the whole book and is drawn as a **vertical** line rather than a…” |
| The current benefit level is the cumulative product of all benefit change factors (1 plus each direct impact), and successive changes compo… | definition | linked | On Level Premium: “Rate level indices **compound**: successive changes of $+8\%$ and $+5\%$ give a cumulative index of…” |
| Loss trend should be selected from pure premium or loss data that has first been adjusted for direct benefit changes; using unadjusted data… | fact | tagged | Policy Provision Changes: “**Benefit-level changes** in statutory lines (workers compensation reform, auto no-fault changes) a…” |

</details>

<details><summary><code>cas5-2015f-q6</code> · answerable</summary>

Tagged pages: Expense Ratio, Earned Premium, Insurance Premium, Written Premium, Basic Insurance Ratios

| Item | Kind | Status | Where |
|---|---|---|---|
| The operating expense ratio is the sum of the underwriting expense ratios (commissions, taxes/licenses/fees, general expenses) and the LAE … | definition | tagged | Expense Ratio: “The **operating expense ratio** adds all loss adjustment expense — allocated and [[Unallocated Loss…” |
| Commissions and taxes, licenses and fees are incurred when a policy is written, so their ratios are measured against written premium, while… | fact | tagged | Expense Ratio: “those incurred at the onset of the policy (commissions, other acquisition, taxes, licenses and fees…” |
| Combined ratio = loss ratio + LAE ratio + underwriting expense ratio, so the loss-and-LAE ratio equals loss ratio × (1 + LAE ratio to loss). | formula | tagged | Basic Insurance Ratios: “$\text{LAE ratio} = \text{LAE}/\text{Losses}$ (allocated and unallocated). So the loss and LAE rati…” |
| To find the LAE ratio to premium when the LAE-to-loss ratio is given, derive the loss ratio from the combined ratio less the expense ratio,… | procedure | tagged | Basic Insurance Ratios: “**The LAE ratio is to losses, not premium:** $\text{LAE ratio} = \text{LAE}/\text{Losses}$ (allocat…” |

</details>

<details><summary><code>cas5-2015f-q7</code> · gap</summary>

Tagged pages: Pure Premium Method, Overall Rate Level Indication, Underwriting Profit, Catastrophe Loss, Exposure Trend, Loss Trend

| Item | Kind | Status | Where |
|---|---|---|---|
| In a frequency-severity projection, select an ultimate frequency and severity (e.g., a recent-years average when there is a clear shift, an… | procedure | missing |  |
| To restate trended-to-latest-year frequency and severity selections to an earlier accident year, de-trend them by dividing by one plus the … | procedure | missing |  |
| Ultimate loss and ALAE for an accident year equals selected frequency times selected severity times that year's earned exposures (not amoun… | formula | syllabus | Frequency-Severity Method: “$$U = \text{Exposures} \times \text{Frequency}_{\text{ult}} \times S_{\text{ult}}$$” |
| Trend each accident year's pure premium from its accident year to the average accident date of the future policy period; for annual policie… | procedure | tagged | Loss Trend: “$t$ is the selected annual trend and $n$ the **trend period**, measured from the average date of lo…” |
| The non-modeled catastrophe provision per exposure is the long-term average ratio of non-modeled cat loss and ALAE to AIY times the AIY per… | procedure | tagged | Catastrophe Loss: “express historical catastrophe losses as a ratio to a stable base (non-catastrophe losses, or amoun…” |
| Pure premium method indicated rate = (pure premium loss and ALAE with ULAE load + cat provisions + fixed expense per exposure) / (1 − varia… | formula | tagged | Pure Premium Method: “$$\text{Indicated Rate} = \frac{\text{Pure Premium} + F}{1 - V - Q_T}$$” |
| The indicated rate change equals the indicated rate divided by the current (projected average) rate, minus one. | formula | tagged | Pure Premium Method: “$$\text{Indicated Change} = \frac{\text{Indicated Rate}}{\text{Current Rate}} - 1$$” |
| ULAE is loaded as a percentage of loss and ALAE, so it is applied by multiplying the non-catastrophe loss and ALAE pure premium by one plus… | fact | linked | Unallocated Loss Adjustment Expenses ULAE: “In **ratemaking**, ULAE may be handled as a load on losses or as a [[Fixed Expenses\\|fixed expense]…” |

</details>

<details><summary><code>cas5-2015f-q8</code> · untagged</summary>

Tagged pages: Combined Ratio, Expense Provisions, Salvage and Subrogation, Loss Ratio, Non-Pricing Solutions, Lifetime Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The combined ratio is the loss ratio (including loss adjustment expenses) plus the expense ratio, and a value above 100% indicates an under… | definition | tagged | Combined Ratio: “**Combined Ratio** is the sum of the [[Loss Ratio\\|loss and LAE ratio]] and the underwriting expens…” |
| Investment income on policyholder-supplied funds and surplus can offset an underwriting loss, so a company with a combined ratio above 100%… | fact | tagged | Combined Ratio: “Because it excludes investment income, a combined ratio above $100\%$ is not automatically unprofit…” |
| New business typically has higher expenses (e.g., higher commissions, marketing, startup costs) than renewal business, so the expense ratio… | fact | tagged | Lifetime Value: “LTV justifies **first-year pricing below full cost** where acquisition costs are large and renewal …” |
| New business tends to have higher loss ratios than renewal business, because riskier insureds who shop frequently leave while better risks … | fact | tagged | Lifetime Value: “The "seasoning" effect (a policy's loss ratio improving with tenure) is real in personal lines and …” |
| Asset share pricing evaluates the long-term profitability of a policy over its expected life by accounting for persistency, allowing a firs… | definition | tagged | Lifetime Value: “**Lifetime Value** (LTV) is the present value of the expected profit from a customer relationship o…” |
| Redundant (over-stated) reserves produce favorable (downward) loss development in later periods, which improves later-period results withou… | fact | linked | Loss Development: “Lines dominated by salvage/subrogation recoveries or by conservative initial case reserving produce…” |
| A small new book has volatile results, and as premium volume grows, the loss experience becomes more credible and less volatile; the insure… | fact | elsewhere | Law of Large Numbers: “It is the formal reason risk pooling works: the average loss per policy becomes predictable as an i…” |

</details>

<details><summary><code>cas5-2015f-q9</code> · gap</summary>

Tagged pages: Territory Ratemaking, Adverse Selection, Loss Ratio, Loss Ratio Method, Insurance Premium, Ratemaking Constraints

| Item | Kind | Status | Where |
|---|---|---|---|
| Current on-level premium for a class or territory equals exposures times the base rate times the territory relativity times the other ratin… | formula | tagged | Insurance Premium: “\text{Premium} = \text{Rate} \times \text{Exposure}” |
| In the loss ratio method for territorial relativities, compute each territory's loss ratio (losses divided by premium at current rates), di… | procedure | elsewhere | Balancing Back: “Under the [[Loss Ratio Method\\|loss ratio method]], a class's indicated relativity is its current r…” |
| When full credibility is assumed, the indicated relativity is used without any credibility weighting against the current relativity. | fact | linked | Credibility: “Partial credibility uses the **square root rule**, $Z = \sqrt{n / n_{\text{full}}}$, capped at $1$ …” |
| To apply a cap on the maximum-to-minimum relativity ratio, set the capped territory's relativity at the cap multiple of the lowest territor… | procedure | missing |  |
| To keep a revenue-neutral change after adjusting relativities, compute an off-balance factor equal to premium at current relativities divid… | procedure | syllabus | Rate Change: “\text{Off-balance factor} &= \frac{1.080}{1.030}” |
| Raising rates for a lower-risk territory and lowering them for a higher-risk territory (because of a cap) causes adverse selection: in the … | fact | tagged | Adverse Selection: “Every classification restriction reintroduces adverse selection by forcing a single price across ri…” |

</details>

<details><summary><code>cas5-2015s-q1</code> · gap</summary>

Tagged pages: Rating Algorithm, Exposure Base, Insurance Premium

| Item | Kind | Status | Where |
|---|---|---|---|
| In the ISO Personal Auto classification plan, a driver's combined class factor is the sum of the primary classification factor and the seco… | procedure | elsewhere | Business Auto Coverage: “The manual adds the secondary factor to the primary factor to give each vehicle's combined rating f…” |
| When a vehicle has multiple operators, the principal operator (the driver with the highest primary classification factor) determines the cl… | fact | elsewhere | Personal Auto Underwriting: “When a household has more than one driver and car, the insurer's principal operator rule decides wh…” |
| The primary classification is based on auto usage (e.g., work commute distance, pleasure, farm, business), and the secondary classification… | fact | missing |  |
| Remove the per-policy expense fee from the total premium to get the premium subject to class factors, then the premium for a new classifica… | procedure | tagged | Rating Algorithm (collapsed): “$$\$355 \times \frac{0.95}{0.85} = \$396.76$$” |
| A mid-term policy change's additional premium is the annual premium difference prorated by the fraction of the policy term remaining (pro r… | procedure | elsewhere | Common Policy Conditions: “$$R_{\text{pro rata}} = P \times \frac{T - t}{T}$$” |

</details>

<details><summary><code>cas5-2015s-q10</code> · answerable</summary>

Tagged pages: Territory Ratemaking, Overall Rate Level Indication, Permissible Loss Ratio, Underwriting Profit, Loss Ratio Method, Non-Pricing Solutions, Ratemaking Constraints

| Item | Kind | Status | Where |
|---|---|---|---|
| With all expenses variable, the permissible loss ratio equals 1 minus the variable expense ratio (V) minus the profit and contingencies pro… | formula | tagged | Permissible Loss Ratio: “$$\text{VPLR} = 1 - V - Q_T \quad \text{(variable permissible loss ratio)}$$” |
| Under the loss ratio method, the indicated rate change for a class or territory equals its expected (ultimate) loss ratio divided by the pe… | formula | tagged | Permissible Loss Ratio: “$$\text{Indicated Change} = \frac{\text{Projected Loss \& LAE Ratio}}{\text{PLR}} - 1$$” |
| When a cap on rate changes limits an indicated increase in one territory, the premium falls short of what is needed to reach the permissibl… | fact | tagged | Ratemaking Constraints: “The base rate has to be adjusted to make up the capped premium” |
| To offset a capping shortfall, compute the premium lost in the capped territory (premium × (indicated change – capped change)) and spread i… | procedure | linked | Considerations for Implementing Rates: “a cap on the change for any level of a rating variable is made up by adjusting the base rate and th…” |
| The fundamental insurance equation balances premium against expected losses, expenses, and profit; if pricing cannot be changed enough, bal… | fact | tagged | Non-Pricing Solutions: “**Non-Pricing Solutions** are actions that bring the fundamental insurance equation back into balan…” |

</details>

<details><summary><code>cas5-2015s-q11</code> · answerable</summary>

Tagged pages: Overall Rate Level Indication, Complement of Credibility, Full Credibility Standard, Credibility, Development Factor, Salvage and Subrogation, Premium Trend, Loss Trend

| Item | Kind | Status | Where |
|---|---|---|---|
| Select loss development factors at each age by averaging the historical age-to-age factors (e.g., all-year or fewer-year averages), justify… | procedure | tagged | Development Factor: “**Medial average**: drops the highest and lowest individual factors before averaging — reduces the …” |
| Develop the ratio of subrogation/salvage to paid loss to ultimate with its own development factors, then subtract ultimate salvage/subrogat… | procedure | tagged | Salvage and Subrogation: “S&S must be **projected on its own triangle**, not scaled from losses.” |
| Trend historical losses and premiums from each year's average accident (or earned) date to the average accident date of the future period, … | procedure | tagged | Premium Trend: “The trend period $n$ runs from the average written date of the policies earning premium in the expe…” |
| Trend on-level earned premium using the premium trend rate over the same period lengths, using earned rather than written dates, to get tre… | procedure | tagged | Premium Trend: “Measuring between average *earned* dates gives the same $2.5$ years, because both dates shift by th…” |
| LAE is included by loading losses by the LAE provision percentage; the trended loss and LAE ratio equals trended net loss plus LAE divided … | formula | tagged | Overall Rate Level Indication: “and including [[Allocated Loss Adjustment Expense\\|ALAE]] and [[Unallocated Loss Adjustment Expense…” |
| Loss ratio method indicated rate change = (loss ratio + fixed expense ratio) / (1 − variable expense ratio − profit and contingencies provi… | formula | tagged | Overall Rate Level Indication: “$$\text{Indicated Change} = \frac{\text{Projected Loss \& LAE Ratio} + F\%}{1 - V - Q_T} - 1$$” |
| With the square root rule, partial credibility Z = sqrt(actual exposures / full credibility standard), capped at 1. | formula | tagged | Credibility: “Partial credibility uses the **square root rule**, $Z = \sqrt{n / n_{\text{full}}}$, capped at $1$” |
| Credibility-weight the indicated rate changes (not the loss ratios): Z times the company indication plus (1 − Z) times the complement of cr… | procedure | tagged | Overall Rate Level Indication: “**Credibility** — weight the indication against a [[Complement of Credibility\\|complement]] where t…” |
| Trended present rates complement = (prior indicated change / prior implemented change) × (premium-trend-adjusted loss trend ratio, (1+loss … | procedure | tagged | Complement of Credibility: “**Trended present rates** — the current rate adjusted to what was last *indicated* rather than impl…” |

</details>

<details><summary><code>cas5-2015s-q12</code> · answerable</summary>

Tagged pages: Classification Ratemaking, Insurance Premium

| Item | Kind | Status | Where |
|---|---|---|---|
| One primary purpose of risk classification is to enhance fairness: premiums reflect differences in expected future losses, so low-risk insu… | fact | tagged | Classification Ratemaking: “**Classification Ratemaking** is the segmentation of a book into rating classes and the derivation …” |
| One primary purpose of risk classification is to protect the financial stability of the insurance system: without classification, adverse s… | fact | tagged | Classification Ratemaking: “In a competitive market an insurer that charges one average rate to a heterogeneous group loses the…” |
| One primary purpose of risk classification is to permit economic incentives to operate and promote widespread availability of coverage: whe… | fact | tagged | Classification Ratemaking: “ASOP 12 states that risk classification is generally used for three purposes: to treat participants…” |

</details>

<details><summary><code>cas5-2015s-q13</code> · untagged</summary>

Tagged pages: Classification Ratemaking, Pure Premium, Correlation, Insurance Premium, Pure Premium Analysis

| Item | Kind | Status | Where |
|---|---|---|---|
| Criteria for evaluating a rating variable include statistical criteria (homogeneity, credibility, statistical significance), operational cr… | definition | tagged | Classification Ratemaking: “**Statistical** — statistical significance, [[Homogeneity\\|homogeneity]] within levels, and [[Credi…” |
| When exposures are unevenly distributed across another rating variable (e.g., vehicle symbol) within each class of the variable being analy… | fact | tagged | Classification Ratemaking: “A **univariate** (one-way) pure premium or loss ratio analysis attributes to a variable the effect …” |
| The adjusted pure premium approach corrects for distributional bias, so it is preferred over the simple pure premium approach when exposure… | fact | tagged | Classification Ratemaking: “A **univariate** (one-way) pure premium or loss ratio analysis attributes to a variable the effect …” |
| Adjusted pure premium approach: compute each class's adjusted exposures by weighting exposures at each level of the other variable by its c… | procedure | elsewhere | Balancing Back: “When other rating variables also apply, each class's exposures are first multiplied by their averag…” |
| The indicated relativity for a class equals its pure premium divided by the base class's pure premium (or divided by the total pure premium… | formula | tagged | Classification Ratemaking: “$$\text{Relativity}_i = \frac{\text{Pure Premium}_i}{\text{Pure Premium}_{\text{base}}}$$” |
| Revenue-neutral base rate change: compute the exposure-weighted average relativity under current and under indicated factors; the off-balan… | procedure | syllabus | Considerations for Implementing Rates: “$$\text{Base Rate}_{\text{new}} = \text{Base Rate}_{\text{current}} \times \frac{1 + \text{overall …” |

</details>

<details><summary><code>cas5-2015s-q14</code> · untagged</summary>

Tagged pages: Deductible Rating, Increased Limits, Deductible, Loss Elimination Ratio, Limited Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The limited average severity (LAS) at limit L is the average claim size with each loss capped at L, i.e. total losses limited to L divided … | definition | tagged | Increased Limits: “$E[X \wedge L]$ is the **limited expected value**, the expected loss capped at $L$.” |
| The increased limits factor for limit L equals LAS at L divided by LAS at the basic limit. | formula | tagged | Increased Limits: “\text{ILF}(L) = \frac{E[X \wedge L]}{E[X \wedge B]}” |
| To compute limited losses from binned data, losses in size bins entirely below the limit are kept as reported, and each claim above the lim… | procedure | tagged | Deductible: “For a discrete loss with probability function $p(x)$, the payment sums over the loss amounts above …” |
| The loss elimination ratio is the proportion of total ground-up losses eliminated by a deductible (or limit), i.e. losses eliminated divide… | definition | tagged | Deductible Rating: “The rate credit is derived from the [[Loss Elimination Ratio\\|loss elimination ratio]] — the share …” |
| For a policy with both a deductible and a policy limit, the limit applies to the loss payment after the deductible, so the insurer's maximu… | procedure | linked | Policy Limit: “With a deductible $d$ and coinsurance $\alpha$, the payment is $\alpha\big[(X \wedge u) - (X \wedge…” |
| Historical data from policies with deductibles is truncated (losses below the deductible are missing or only excess amounts are reported) a… | fact | elsewhere | Severity Distribution: “The fit must allow for [[Truncation\\|truncation]] by deductibles and [[Censoring\\|censoring]] at po…” |
| Insureds self-select deductibles and limits and claim reporting behavior varies by deductible, and data is thin at higher layers; these iss… | fact | tagged | Deductible Rating: “an insured with a higher deductible may not report a claim whose small net payment is not worth a c…” |

</details>

<details><summary><code>cas5-2015s-q15</code> · answerable</summary>

Tagged pages: Development Triangle, Accident Year, Report Year, Case Reserves

| Item | Kind | Status | Where |
|---|---|---|---|
| Cumulative reported claims at an evaluation date equal cumulative paid claims plus the case reserve outstanding at that date. | definition | linked | Incurred Losses: “**Incurred Losses** — more precisely **reported losses** — are cumulative [[Paid Losses\\|payments]]…” |
| On an accident year basis, each claim is assigned to the calendar year in which its accident occurred, regardless of when it is reported or… | definition | tagged | Accident Year: “**Accident Year** (AY) is a data aggregation method that groups losses by the calendar year in whic…” |
| On a report year basis, each claim is assigned to the calendar year in which it was reported to the insurer, so a claim has no reported amo… | definition | tagged | Report Year: “**Report Year** (RY) is a data aggregation method that groups claims by the calendar year in which …” |
| To build a loss development triangle from transactional data, evaluate each cohort (accident or report year) at each year-end, accumulating… | procedure | tagged | Development Triangle: “**Development Triangle** is the fundamental data structure of reserving: cumulative amounts arrange…” |
| A triangle includes only the development ages observed as of the latest evaluation date, so the most recent cohort has only a 12-month valu… | fact | tagged | Development Triangle: “The triangle is triangular because a $2024$ accident year cannot yet have a $36$-month valuation.” |
| Case reserves are a point-in-time balance, not incremental, so the case reserve at an evaluation date is the most recent ending reserve and… | fact | linked | Calendar Year: “$\Delta$ terms are ending balance minus beginning balance.” |

</details>

<details><summary><code>cas5-2015s-q16</code> · answerable</summary>

Tagged pages: Claims Processing Changes, Reserve Adequacy, Settlement Rate, Accident Year, Unpaid Claims, Data Diagnostic Analysis, Berquist-Sherman Method

| Item | Kind | Status | Where |
|---|---|---|---|
| The ratio of cumulative paid claims to cumulative reported (case-incurred) claims by accident year and maturity is a diagnostic; a ratio th… | formula | tagged | Data Diagnostic Analysis: “**Faster [[Settlement Rate\\|settlement]]:** closure rates and paid-to-reported rise together.” |
| The ratio of closed claim counts to reported claim counts by accident year and maturity measures the claim closure (disposal) rate; a ratio… | formula | tagged | Settlement Rate: “$$\text{Disposal Rate}_n = \frac{\text{Closed claims at age } n}{\text{Ultimate claim counts}}$$” |
| Average case outstanding is (reported claims minus paid claims) divided by open claim counts (reported counts minus closed counts); an incr… | formula | tagged | Data Diagnostic Analysis: “The first block is the **average case outstanding** for accident year $w$ at age $d$: reported less…” |
| Paid severity (paid claims per closed count) and reported severity (reported claims per reported count) are diagnostics; rising values down… | formula | linked | Claim Count Triangle: “**Counts closed with payment** (vs. closed without) — a shift in the CWP proportion changes average…” |
| The Berquist-Sherman paid method adjusts historical paid claims to a common (latest diagonal) settlement rate, and the Berquist-Sherman rep… | fact | tagged | Settlement Rate: “The remedy is the [[Berquist-Sherman Method\\|Berquist-Sherman]] paid adjustment: restate each histo…” |
| The expected claims method relies on an a priori estimate of ultimate claims and is unaffected by changes in claim development patterns, se… | fact | tagged | Claims Processing Changes: “Lean on methods that do not depend on the triangle's recent diagonal at all: the [[Expected Loss Me…” |
| The reported development (chain ladder) technique is not distorted by speedups in claim settlement, because it uses reported claims rather … | fact | tagged | Claims Processing Changes: “A moving **disposal rate** is a [[Settlement Rate\\|settlement speed]] change and distorts **paid** …” |

</details>

<details><summary><code>cas5-2015s-q17</code> · gap</summary>

Tagged pages: Cape Cod Method, Insurance Premium, Development Factor, Trend, Loss Trend, Rate Level Change

| Item | Kind | Status | Where |
|---|---|---|---|
| Cape Cod method: the expected loss ratio (or pure premium) is the sum of trended reported losses divided by the sum of used-up (on-level) p… | procedure | tagged | Cape Cod Method: “The ELR is estimated as total reported losses over total *used-up* (on-level, developed) premium ac…” |
| Cape Cod IBNR for a year equals the ELR times the premium (or exposure) times (1 - 1/CDF), i.e. the percent unreported. | formula | tagged | Cape Cod Method: “$$\text{IBNR}_i = \text{ELR} \times \text{EP}_i \times \left(1 - \tfrac{1}{\text{CDF}_i}\right)$$” |
| To select a claims trend, develop reported claims to ultimate with the CDFs, divide by exposures to get pure premiums, and compute year-ove… | procedure | linked | Pure Premium Method: “- Inputs: losses developed to ultimate and trended, [[Earned Exposure\\|earned exposures]] (trended …” |
| Pure premium changes from the most immature accident year are highly leveraged and unreliable, so they may be excluded when selecting a tre… | fact | missing |  |
| Trend each year's reported claims to the target accident year's cost level by applying the selected annual trend factor compounded over the… | procedure | tagged | Trend: “$$\text{Trend Factor} = (1 + r)^n$$” |
| Extension of exposures on-leveling: restate each year's premium at the current rate level by multiplying exposures by the current average r… | procedure | tagged | Insurance Premium: “[[Extension of Exposures\\|Extension of exposures]] re-rates every policy at today's rates, which is…” |
| Cape Cod can be done on an exposure basis instead of on-level premium, because premium cancels in the IBNR calculation and gives the same I… | fact | missing |  |

</details>

<details><summary><code>cas5-2015s-q18</code> · answerable</summary>

Tagged pages: Expected Loss Method, Loss Reserving, Pure Premium, Loss Trend, Loss Development

| Item | Kind | Status | Where |
|---|---|---|---|
| In the expected claims technique, ultimate claims for the projected year equal the selected expected pure premium (expected claims per expo… | procedure | tagged | Expected Loss Method: “$$U = \text{ELR} \times \text{Earned Premium}$$” |
| Estimate the expected pure premium for each historical year by developing its reported claims to ultimate with cumulative development facto… | procedure | tagged | Pure Premium: “The pure premium used in a rate is always **projected**: historical losses developed to ultimate, t…” |
| A cumulative development factor to ultimate for a given age is the product of the age-to-age factors from that age through to ultimate, inc… | formula | tagged | Loss Development: “$$\text{CDF}_{n \to \text{ult}} = \prod_{k \ge n} f_{k \to k+1} \times \text{Tail}$$” |
| An age-to-age (link ratio) factor is the ratio of cumulative reported claims at a later age to that at the earlier age for the same acciden… | formula | linked | Age to Age Factor: “$$f_{n \to n+1}^{\text{AY}} = \frac{C_{\text{AY},\,n+1}}{C_{\text{AY},\,n}}$$” |
| Trend a historical pure premium to the projected year by multiplying by (1 + annual trend) raised to the number of years between the histor… | formula | tagged | Loss Trend: “$$\text{Trend Factor} = (1 + t)^{n}$$” |
| Selecting the expected pure premium requires judgment and justification: for example, weigh whether a recent spike reflects lasting change … | fact | linked | Age to Age Factor: “Look at the column **before** averaging it. A steady column supports a volume-weighted all-year sel…” |

</details>

<details><summary><code>cas5-2015s-q19</code> · answerable</summary>

Tagged pages: Bornhuetter-Ferguson Method, Accident Year, Unpaid Claims, Credibility, Benktander Method, Reasonableness Testing

| Item | Kind | Status | Where |
|---|---|---|---|
| The paid development technique's ultimate equals paid claims to date times the paid cumulative development factor to ultimate, so the paid … | formula | linked | Cumulative Development Factor: “$$\text{Ultimate} = C_n \times \text{CDF}_{n \to \text{ult}}$$” |
| Bornhuetter-Ferguson ultimate = claims to date (paid or reported) + a priori expected ultimate claims × percent unpaid (or unreported), whe… | formula | tagged | Bornhuetter-Ferguson Method: “$$U_{\text{BF}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) \times U_{0}$$” |
| Back out the a priori expected claims from a given paid BF estimate by using the paid claims to date and the paid CDF-based percent unpaid,… | procedure | tagged | Bornhuetter-Ferguson Method: “$$U_{\text{BF}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) \times U_{0}$$” |
| The Benktander ultimate = reported claims to date + (prior BF ultimate estimate × percent unreported), i.e. it reuses the BF ultimate in pl… | formula | tagged | Benktander Method: “$$U_{\text{GB}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) U_{\text{BF}}$$” |
| The Benktander method is a credibility-weighted average of the development technique and the BF technique, and each successive iteration gi… | fact | tagged | Benktander Method: “Repeating $R = qU$ then $U = C + R$ from $U_0$ gives $U^{(m)} = (1 - q^m)\,U_{\text{CL}} + q^m U_0$…” |
| Development techniques are more responsive but leveraged and volatile at immature ages, while BF is more stable and preferred for immature … | fact | linked | Loss Development: “a change in the paid-to-reported ratio signals a change in settlement patterns or in case adequacy …” |
| When there is no development after the final maturity, the CDF to ultimate at that age is 1.0, and the percent unreported/unpaid is zero fo… | fact | tagged | Bornhuetter-Ferguson Method: “$C$ is reported (or paid) losses to date, $U_0 = \text{ELR} \times \text{EP}$ the a priori expectat…” |

</details>

<details><summary><code>cas5-2015s-q2</code> · answerable</summary>

Tagged pages: Exposure Base, Line of Business

| Item | Kind | Status | Where |
|---|---|---|---|
| An exposure base is a measure of the size of a risk (e.g. car-years, miles driven, payroll) that is used to scale expected losses and premi… | definition | tagged | Exposure Base: “**Exposure Base** is the basic unit of risk that underlies the premium — the quantity the rate is c…” |
| A good exposure base should be proportional to expected losses, so that expected loss per unit of exposure stays roughly constant as exposu… | fact | tagged | Exposure Base: “**Proportional to expected loss.** All else equal, a policy with two exposures should have twice th…” |
| A good exposure base should be practical: it should be objective, easy and inexpensive to obtain and verify, and resistant to manipulation … | fact | tagged | Exposure Base: “**Practical.** Objective, and relatively easy and inexpensive to obtain and verify — which also kee…” |
| A good exposure base should be consistent with historical precedent and industry practice, because changing it causes premium swings, IT an… | fact | tagged | Exposure Base: “**Consistent with historical precedence.** A change of base can cause large premium swings for indi…” |
| The criteria for evaluating an exposure base (proportionality, practicality, historical precedent) differ from the criteria for evaluating … | fact | linked | Classification Ratemaking: “**Statistical** — statistical significance, [[Homogeneity\\|homogeneity]] within levels, and [[Credi…” |
| To select an exposure base, assess each candidate against each criterion and recommend the one whose overall evaluation is best, giving a c… | procedure | tagged | Exposure Base (collapsed): “On the criterion that the exposure base should be the factor most directly proportional to expected…” |

</details>

<details><summary><code>cas5-2015s-q20</code> · answerable</summary>

Tagged pages: Loss Reserving, Reserve Adequacy, Development Factor, Accident Year, Earned Premium, Frequency-Severity Method, Chain Ladder Method, Bornhuetter-Ferguson Method

| Item | Kind | Status | Where |
|---|---|---|---|
| Frequency-severity technique: ultimate claims = exposure units × ultimate (trended) frequency per exposure unit × ultimate (trended) severi… | formula | tagged | Frequency-Severity Method: “$$U = \text{Exposures} \times \text{Frequency}_{\text{ult}} \times S_{\text{ult}}$$” |
| Trend a selected ultimate severity from its base accident year to the target accident year by compounding the annual severity trend rate ov… | procedure | linked | Loss Trend: “$t$ is the selected annual trend and $n$ the **trend period**, measured from the average date of lo…” |
| A selected ultimate frequency is already at ultimate, so the claim count development factor is not applied to it; the count development fac… | fact | syllabus | Frequency: “Frequency computed on reported counts at an immature age is biased low, since claims are still bein…” |
| Claims development technique: ultimate claims = reported (or paid) claims to date × selected age-to-ultimate claims development factor. | formula | tagged | Chain Ladder Method: “$$U_{\text{AY}} = C_{\text{AY},\,n} \times \text{CDF}_{n \to \text{ult}}$$” |
| Reported Bornhuetter-Ferguson ultimate = reported claims + expected claims (exposure base × expected loss ratio, or premium × ELR) × (1 − 1… | formula | tagged | Bornhuetter-Ferguson Method: “$$U_{\text{BF}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) \times U_{0}$$” |
| Premium (the a priori exposure base for B-F) can be computed as exposure units times the rate per unit of exposure, with the rate quoted pe… | definition | syllabus | Exposure Base: “$$\text{Premium} = \text{Rate} \times \text{Exposures}$$” |
| A rise in reported claims not matched in paid claims indicates case reserve strengthening (or a shock loss), so the reported development te… | fact | tagged | Chain Ladder Method: “A [[Large Loss\\|shock loss]] reported early is multiplied by the full CDF.” |
| The paid development technique at early maturities is highly leveraged (large age-to-ultimate factor) and may be unreliable, while B-F is m… | fact | tagged | Chain Ladder Method: “at its worst at immature ages in [[Long Tail Lines\\|long-tail lines]], where the CDF is large and t…” |
| The frequency-severity technique's appropriateness depends on the currency of its selected severity and frequency, and it can be distorted … | fact | tagged | Frequency-Severity Method (collapsed): “if severity trend has genuinely stepped up, the **pricing** severity trend selection is stale too, …” |

</details>

<details><summary><code>cas5-2015s-q21</code> · gap</summary>

Tagged pages: Frequency-Severity Method, Berquist-Sherman Method, Severity, Accident Year, Frequency, Settlement Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The disposal rate is the cumulative closed claim count at a development age divided by the ultimate claim count for the accident year. | definition | tagged | Settlement Rate: “$$\text{Disposal Rate}_n = \frac{\text{Closed claims at age } n}{\text{Ultimate claim counts}}$$” |
| Incremental average severity at a development age is the incremental paid claims divided by the incremental closed claim counts for that in… | definition | missing |  |
| Project ultimate claims for an accident year as paid to date plus, for each remaining development interval, ultimate counts times the incre… | procedure | tagged | Frequency-Severity Method: “Project the number of claims closing in each future period from historical **disposal rates**, valu…” |
| Select disposal rates and incremental severities from the latest diagonal when it is representative of current claim adjusting practices, r… | procedure | tagged | Berquist-Sherman Method: “Select the current disposal rate pattern as the target.” |
| Trend selected severities from the latest diagonal's year to the year in which each future payment occurs, using the annual severity trend … | procedure | linked | Loss Trend: “$t$ is the selected annual trend and $n$ the **trend period**, measured from the average date of lo…” |
| If one accident year has a one-time severity shock, adjust that year's incremental severity (e.g. restate the affected severity) or exclude… | procedure | tagged | Berquist-Sherman Method: “That is a calendar-year signal, and averaging it into the selections applies a one-time shift as th…” |
| If a severity change (such as a law change) persists into later accident years, the earlier years' incremental severities should be adjuste… | fact | linked | Loss Trend: “A benefit-level change is restated in the data, or allowed for in the selection, so that it is not …” |

</details>

<details><summary><code>cas5-2015s-q22</code> · answerable</summary>

Tagged pages: Berquist-Sherman Method, Accident Year, Development Factor, Case Adequacy, Severity, Data Diagnostic Analysis

| Item | Kind | Status | Where |
|---|---|---|---|
| To test whether case outstanding adequacy has changed, compute average case outstanding (case outstanding divided by open claim count) at e… | procedure | tagged | Berquist-Sherman Method: “1. Compute **average case outstanding** per open claim at each accident year and maturity.” |
| If average case outstanding grows faster than the severity trend (while average paid per closed claim grows at the trend), case reserves ar… | fact | tagged | Case Adequacy: “Applying historical factors — built under weaker reserving — to a strengthened diagonal **over-stat…” |
| In the Berquist-Sherman case outstanding adjustment, keep the latest diagonal average case outstanding and detrend it backward at the sever… | procedure | tagged | Berquist-Sherman Method: “3. **Trend the latest diagonal's** average case outstanding backwards at $t$ to restate each histor…” |
| Adjusted case outstanding equals adjusted average case outstanding times open claim count, and adjusted reported claims equal cumulative pa… | formula | tagged | Berquist-Sherman Method: “4. Multiply the restated averages by the open claim counts to get adjusted case reserves, add paid,…” |
| Build age-to-age factors from the adjusted reported claims triangle, select factors, take cumulative products to ultimate, and multiply the… | procedure | tagged | Development Factor: “**Development Factor** (link ratio or age-to-age factor) is the ratio used to project cumulative lo…” |
| The Berquist-Sherman case outstanding adjustment can be incorporated in the Bornhuetter-Ferguson technique by using the adjusted reported d… | fact | tagged | Berquist-Sherman Method: “Select factors from the **restated** triangle.” |

</details>

<details><summary><code>cas5-2015s-q23</code> · answerable</summary>

Tagged pages: Settlement Rate, Berquist-Sherman Method, Case Reserves, Chain Ladder Method, Claims Processing Changes

| Item | Kind | Status | Where |
|---|---|---|---|
| The paid development technique assumes the historical payment (settlement) pattern remains stable, so a change in claim settlement rates ma… | fact | tagged | Settlement Rate: “**Faster settlement** pushes losses from open to paid, so the recent paid diagonal is high relative…” |
| When small claims settle faster while large claims settle later, paid amounts at early maturities shift relative to ultimate, so historical… | fact | linked | Mix of Business: “If the segments have different emergence patterns, the blended development factors drift as the wei…” |
| The reported development technique assumes a stable reporting pattern and consistent case reserve adequacy; a change in settlement or closu… | fact | tagged | Chain Ladder Method: “**The pattern is stable over calendar time.** Violated by a change in [[Case Adequacy\\|case adequac…” |
| A higher average case reserve caused by a changed mix of open claims (e.g., only large claims remain open) is not a change in case reserve … | fact | syllabus | Claim Count Triangle (collapsed): “The average case outstanding falling from $\$5{,}000$ to $\$3{,}500$ is consistent with that story …” |
| The Berquist-Sherman paid adjustment restates historical paid claims to the current settlement rate level, using closed claim counts, to co… | procedure | tagged | Berquist-Sherman Method: “For each historical cell, interpolate the paid losses that *would* have been paid had that year clo…” |
| The Berquist-Sherman paid adjustment assumes paid dollars are proportional to closed claim counts; if settlement shifts by claim size this … | fact | tagged | Settlement Rate (collapsed): “Note the assumption being made: that paid losses move **linearly** with the disposal rate between o…” |
| When settlement patterns differ by claim size, adjust a development technique by splitting the data into separate triangles by size of loss… | procedure | linked | Mix of Business (collapsed): “The only fix is structural: **split the triangle** by coverage ([[Reserving Data Organization]]). T…” |

</details>

<details><summary><code>cas5-2015s-q24</code> · gap</summary>

Tagged pages: Salvage and Subrogation, Development Factor, Accident Year, Recoveries, Net Losses

| Item | Kind | Status | Where |
|---|---|---|---|
| In the ratio approach to salvage and subrogation, compute the ratio of received S&S to paid claims at each maturity, then develop that rati… | procedure | tagged | Recoveries: “**Salvage and subrogation** (Friedland Ch. 14) are projected either by the development technique on…” |
| The S&S-to-paid ratio can keep developing after S&S payments stop developing, because the paid claims in the denominator are still developi… | fact | missing |  |
| Develop paid claims to ultimate by the chain ladder (development) technique: compute age-to-age factors from the triangle, select them (e.g… | procedure | tagged | Development Factor: “**Simple average**: unweighted mean of all individual year factors — treats each accident year equa…” |
| Ultimate S&S equals ultimate gross claims times the ultimate S&S-to-claims ratio. | formula | tagged | Recoveries: “**Salvage and subrogation** (Friedland Ch. 14) are projected either by the development technique on…” |
| Ultimate claims net of salvage and subrogation equal ultimate gross claims minus ultimate S&S recoveries. | formula | tagged | Salvage and Subrogation: “$$\text{Net Ultimate} = \text{Gross Ultimate} - \text{S\&S Ultimate}$$” |
| When no development is stated beyond the last triangle age, the cumulative factor at that age is 1.0 (no tail factor). | fact | syllabus | Tail Factor: “A tail of exactly $1.000$ is itself an assumption — that development is complete — and it is the wr…” |

</details>

<details><summary><code>cas5-2015s-q25</code> · answerable</summary>

Tagged pages: Unallocated Loss Adjustment Expenses ULAE, Bornhuetter-Ferguson Method, Calendar Year, Accident Year

| Item | Kind | Status | Where |
|---|---|---|---|
| The classical ULAE technique assumes the insurer's ULAE-to-claim relationship is in steady state, so the ratio of paid ULAE to paid claims … | fact | tagged | Unallocated Loss Adjustment Expenses ULAE (collapsed): “In a mature, stable book the two ratios converge.” |
| For a growing insurer, paid claims lag behind claims reported and incurred, which distorts the paid ULAE-to-paid claims ratio and makes it … | fact | tagged | Unallocated Loss Adjustment Expenses ULAE: “The classical ratio is distorted in a growing book, because paid ULAE reflects today's claim *activ…” |
| The Kittel refinement computes the ULAE ratio as calendar-year paid ULAE divided by the average of calendar-year paid claims and reported (… | definition | tagged | Unallocated Loss Adjustment Expenses ULAE: “$$R_{\text{Kittel}} = \frac{\text{Paid ULAE}}{0.5(\text{Paid Loss}) + 0.5(\text{Incurred Loss})}$$” |
| Select the ULAE ratio from the yearly ratios by judgment, giving weight to recent stable years and excluding or discounting outlier years, … | procedure | tagged | Unallocated Loss Adjustment Expenses ULAE (collapsed): “Selecting the three-year average of $6.6\%$ would understate the cost of running off the remaining …” |
| Unpaid ULAE = selected ULAE ratio × [50% × case outstanding reserve (reported but unpaid claims) + 100% of IBNR], reflecting that half of U… | formula | tagged | Unallocated Loss Adjustment Expenses ULAE: “$$\text{ULAE Reserve} = R \times \left(0.5 \times \text{Case} + 1.0 \times \text{IBNR}\right)$$” |
| The generalized approach splits ULAE between opening and closing claims (e.g. 60/40) and applies the ratio to the pure IBNR portion and to … | procedure | tagged | Unallocated Loss Adjustment Expenses ULAE: “Drops the $50/50$ assumption entirely: ULAE is allocated to claim events (opening, maintenance, clo…” |

</details>

<details><summary><code>cas5-2015s-q3</code> · gap</summary>

Tagged pages: Earned Exposure, Calendar Year, Basic Insurance Ratios

| Item | Kind | Status | Where |
|---|---|---|---|
| Earned exposure is the portion of written exposure whose coverage period has expired by a given date; earned car years for a calendar year … | definition | tagged | Earned Exposure: “**Earned Exposure** is the portion of written exposure for which coverage has actually been provide…” |
| Under uniform writing over a period, the average written date is the period midpoint, and the share of a policy term earned in a given cale… | procedure | tagged | Earned Exposure: “With policies written **uniformly** through the year, a calendar year earns roughly half of that ye…” |
| Retention ratio is the number of policies renewed divided by the number of policies eligible to renew (policies expiring), not divided by t… | definition | tagged | Basic Insurance Ratios: “$\text{Retention ratio} = \text{policies renewed} / \text{potential renewal policies}$” |
| To estimate renewals in a period, subtract new business from total written exposure; exposure eligible to renew is obtained from the prior … | procedure | missing |  |
| Changing the policy term from six months to annual means renewals of the converted policies occur only once a year (concentrated in the fir… | fact | missing |  |

</details>

<details><summary><code>cas5-2015s-q4</code> · answerable</summary>

Tagged pages: Premium Trend, Insurance Premium, Earned Premium, Calendar Year, Exponential Trend, Parallelogram Method

| Item | Kind | Status | Where |
|---|---|---|---|
| Compute the on-level factor with the parallelogram method: find the area of each calendar-year exposure region corresponding to each rate l… | procedure | tagged | Parallelogram Method: “**Werner's six steps:** date the changes and form rate level groups; find each group's area in each…” |
| A law change that applies to all policies, including those in force, takes effect immediately for all exposure and is shown as a vertical l… | fact | tagged | Parallelogram Method: “A change forced by law onto policies already in force is a **vertical** line.” |
| With annual policies written uniformly, a rate change earns in over one year, so the calendar-year exposure regions for each rate level are… | fact | tagged | Parallelogram Method: “A rate change for policies written on or after a date is a **diagonal** line whose slope is set by …” |
| Rate level indices are cumulative products of the successive rate and law changes, and the current rate level is the product of all changes… | fact | tagged | Parallelogram Method: “$I_k$ is the cumulative rate level index of rate level group $k$ (each index is the previous one ti…” |
| Select an exponential premium trend by choosing the fit over a period that excludes distortions from non-recurring changes (such as a deduc… | procedure | tagged | Exponential Trend: “Catastrophes are excluded from trend data (with rolling years, one event contaminates four points) …” |
| The trend period runs from the average accident (earned) date of the historical period to the average earned date of the future period when… | procedure | tagged | Premium Trend: “Measuring between average *earned* dates gives the same $2.5$ years, because both dates shift by th…” |
| Trended on-level earned premium = earned premium × on-level factor × (1 + annual trend)^(trend period). | formula | tagged | Insurance Premium: “$$\text{Projected EP} = \text{EP} \times \text{OLF} \times \text{Trend}$$” |

</details>

<details><summary><code>cas5-2015s-q5</code> · answerable</summary>

Tagged pages: On Level Premium, Insurance Premium, Earned Premium, Calendar Year, Parallelogram Method, Extension of Exposures

| Item | Kind | Status | Where |
|---|---|---|---|
| On-level premium is historical earned premium restated to what it would have been at current rate levels; it equals earned premium times th… | definition | tagged | On Level Premium: “**On-Level Premium** is historical earned premium restated as though every policy had been written …” |
| In the parallelogram method, represent each annual policy's written and earned time as a parallelogram (or unit square with diagonals) in t… | procedure | tagged | Parallelogram Method: “A calendar year is a unit square: time across, fraction of the policy term earned up. A rate change…” |
| The average rate level for a period equals the sum over rate levels of (portion of earned premium at that level × the cumulative rate level… | formula | tagged | On Level Premium: “$$\text{On-Level Factor} = \frac{\text{Current cumulative rate level index}}{\text{Average rate lev…” |
| With uniform writings of annual policies, a mid-year rate change gives a parallelogram split in which the portion earned at the new rate in… | fact | tagged | Parallelogram Method: “The second formula is the area earned in the same calendar year at a new level effective a fraction…” |
| When writings are not uniform across the year, apply the parallelogram method separately to each quarter (uniform within each) and weight e… | procedure | tagged | Parallelogram Method: “It assumes uniform writing — false for seasonal business such as boat owners, whose policies are bo…” |
| The extension of exposures method calculates on-level premium by re-rating each historical policy's exposures at current rates, then recomp… | definition | tagged | Extension of Exposures: “**Extension of Exposures** is the [[On-Leveling\\|on-leveling]] method that re-rates every historica…” |
| The parallelogram method can be applied to smaller time periods (e.g., monthly or daily) and the resulting on-level premiums aggregated to … | fact | tagged | Parallelogram Method: “It assumes uniform writing — false for seasonal business such as boat owners, whose policies are bo…” |

</details>

<details><summary><code>cas5-2015s-q6</code> · answerable</summary>

Tagged pages: Ratemaking Data Organization, Underwriting Changes, Line of Business, Calendar Year, Policy Year, Report Year, Short Tail Insurance, Long Tail Lines

| Item | Kind | Status | Where |
|---|---|---|---|
| Calendar year aggregation groups transactions (premiums earned and losses paid/incurred) by the calendar year in which they are recorded, s… | definition | tagged | Ratemaking Data Organization: “- **[[Calendar Year]]** — everything booked in the year. Available quickly and already collected fo…” |
| Calendar year aggregation is responsive and quickly available, so it suits short-tailed lines whose losses are mostly settled soon after oc… | fact | tagged | Ratemaking Data Organization: “Werner & Modlin say it may be most appropriate for lines whose losses are reported and settled rela…” |
| Policy year aggregation groups losses and premiums by the year in which the policy was written or became effective, matching losses to the … | definition | tagged | Policy Year: “**Policy Year** (PY), also called underwriting year or year of account, is a data aggregation metho…” |
| Policy year data is not fully mature until about a year or more after the year ends (policies span two calendar years), so it develops slow… | fact | tagged | Ratemaking Data Organization: “The best match of premium to loss, and particularly useful when underwriting or pricing changes occ…” |
| Property lines such as auto physical damage and homeowners are short-tailed, while medical professional liability is long-tailed. | fact | tagged | Short Tail Insurance: “Typical short-tail lines: auto physical damage (collision, comprehensive), homeowners property, inl…” |
| Report year aggregation groups claims by the year in which they are reported to the insurer, so claims made after the period are excluded. | definition | tagged | Ratemaking Data Organization: “- **[[Report Year]]** — claims by report date. Typically used for commercial lines written on a [[C…” |
| Report year aggregation is appropriate for claims-made policies, where all claims are reported within the policy period and no IBNR for lat… | fact | tagged | Report Year: “RY is the correct basis for [[Claims Made Coverage\\|claims-made]] coverage, because a claims-made p…” |

</details>

<details><summary><code>cas5-2015s-q7</code> · answerable</summary>

Tagged pages: Claims Made Coverage, Report Year, Ultimate Loss, Insurance Premium, Occurrence Coverage, Loss Trend

| Item | Kind | Status | Where |
|---|---|---|---|
| A mature claims-made policy covers claims reported in the policy year from losses of all prior occurrence years, so its premium is the sum … | procedure | tagged | Claims Made Coverage: “A first-year policy covers only accidents since the retro date — a thin sliver of exposure — while …” |
| An occurrence policy premium is the sum over report lags of the loss cost at each lag, trended from the base year to the report year in whi… | procedure | tagged | Claims Made Coverage (collapsed): “With claim costs trending upward, Principle 1 applies to the mature step too: the mature claims-mad…” |
| Loss cost data labeled by report year must be trended forward to the policy's report year before computing premium, since the given costs a… | fact | tagged | Loss Trend: “applied to bring historical losses from the cost level of the experience period to the cost level o…” |
| With negative loss cost trend, a mature claims-made policy costs more than an occurrence policy, because claims-made pays all claims at cur… | fact | tagged | Claims Made Coverage: “A claims-made policy should always cost less than an occurrence policy **as long as claim costs are…” |
| A reduction in the maximum report lag removes the later-lag loss costs from the occurrence premium (and may shift costs to earlier lags, wh… | fact | tagged | Claims Made Coverage (collapsed): “With claim costs trending upward, Principle 1 applies to the mature step too: the mature claims-mad…” |
| A mature claims-made premium for a policy year is unaffected by a new reporting-deadline law applying only to losses occurring after the la… | fact | tagged | Claims Made Coverage: “If there is a sudden, unexpected shift in the reporting pattern, the cost of a **mature** claims-ma…” |

</details>

<details><summary><code>cas5-2015s-q8</code> · gap</summary>

Tagged pages: Large Loss, Trend, Development Factor, Severity, Extraordinary Losses, Loss Trend

| Item | Kind | Status | Where |
|---|---|---|---|
| The excess ratio at a threshold is the ratio of excess loss dollars (the portion of each claim above the threshold) to non-excess (limited)… | definition | tagged | Large Loss: “$$\text{Excess Load} = \frac{\text{Expected losses above } M}{\text{Expected losses below } M}$$” |
| Compute a year's excess loss by summing, for each claim above the threshold, the amount by which it exceeds the threshold, and subtract thi… | procedure | tagged | Extraordinary Losses: “Each claim is capped at a threshold (the **non-excess** loss); the portion above it is **excess**.” |
| Excess losses are volatile and a single year's excess ratio is unstable, so the selected excess ratio should be based on a longer experienc… | fact | tagged | Large Loss: “The excess load is computed over a **long** period because large losses are rare” |
| Combine the current year's excess ratio with the historical excess ratio by weighting (by losses, limited losses, claim counts, or years) r… | procedure | missing |  |
| In the excess loss procedure, trend and develop the limited (non-excess) losses and then load for excess losses by multiplying by (1 + sele… | procedure | tagged | Extraordinary Losses: “The excess loss factor (ELF) is the long-run ratio of excess to non-excess losses, applied to each …” |
| When separate frequency and severity trend factors are given, both apply to projected losses (their product is the pure premium trend); sev… | fact | tagged | Loss Trend: “$$1 + t_{PP} = (1 + t_{\text{freq}})(1 + t_{\text{sev}})$$” |
| Project ultimate loss and ALAE by applying the loss and ALAE development factor and the trend factors to each component, then summing the l… | procedure | linked | Loss Development: “$$\text{Ultimate Losses} = \text{Losses at age } n \times \text{CDF}_{n \to \text{ult}}$$” |

</details>

<details><summary><code>cas5-2015s-q9</code> · answerable</summary>

Tagged pages: Expense Provisions, Written Premium, Earned Premium, Insurance Premium, Expense Ratio, Variable Expenses

| Item | Kind | Status | Where |
|---|---|---|---|
| The indicated average rate under the loss cost approach equals (loss cost per exposure + fixed expense per exposure) / (1 - variable expens… | formula | tagged | Expense Provisions: “$$\text{Rate} = \frac{\text{Pure Premium} + \text{Fixed Expense per Exposure}}{1 - V - Q_T}$$” |
| Under the all-variable expense method, every expense type is converted to a ratio to premium and the ratios are summed into a single total … | procedure | tagged | Expense Provisions: “The **all-variable expense method** loads every expense as a percentage of premium.” |
| Expenses incurred at the policy inception (such as commissions, other acquisition, and taxes, licenses, and fees) are divided by written pr… | fact | tagged | Expense Provisions: “Expenses incurred at the onset of the policy — commissions, other acquisition, and taxes, licenses …” |
| Expenses incurred throughout the policy term (such as general expenses) are divided by earned premium, because they are spread over the cov… | fact | tagged | Expense Provisions: “Expenses incurred at the onset of the policy — commissions, other acquisition, and taxes, licenses …” |

</details>

<details><summary><code>cas5-2016f-q1</code> · answerable</summary>

Tagged pages: Earned Exposure, Calendar Year, Policy Year, In-Force

| Item | Kind | Status | Where |
|---|---|---|---|
| An exposure (car-year) is one vehicle insured for one year, so a policy with a term shorter than a year (e.g. 6 months) contributes only th… | definition | tagged | Earned Exposure: “A $12$-month policy contributes **one** earned car-year in total, spread pro rata over its term: wr…” |
| Written exposures for a period are the exposures of all policies issued (effective) during that period, counted in full at the policy's eff… | definition | tagged | Earned Exposure: “A $12$-month policy contributes **one** earned car-year in total, spread pro rata over its term: wr…” |
| In-force exposures at a date are the exposures of policies that have been issued and not yet expired on that date, each counted at its full… | definition | tagged | In-Force: “In-force exposures count the insured units exposed to loss at the date — a snapshot with no regard …” |
| Earned exposures for a period are the portion of each policy's exposure whose coverage time falls within the period. | definition | tagged | Earned Exposure: “**Earned Exposure** is the portion of written exposure for which coverage has actually been provide…” |
| To compute earned exposure policy by policy, multiply each policy's exposure by the fraction of its term that falls inside the period (zero… | procedure | linked | Earned Premium: “$$\text{EP for one policy} = \text{Full premium} \times \frac{\text{days elapsed}}{\text{policy ter…” |
| The parallelogram method approximates earned exposure assuming policies are written evenly throughout the year, so it is not appropriate wh… | fact | tagged | Earned Exposure: “With policies written **uniformly** through the year, a calendar year earns roughly half of that ye…” |

</details>

<details><summary><code>cas5-2016f-q10</code> · untagged</summary>

Tagged pages: Classification Ratemaking

| Item | Kind | Status | Where |
|---|---|---|---|
| ASOP 12 says a risk characteristic should be causally related to (or correlated with) expected outcomes, i.e. have a plausible relationship… | fact | elsewhere | Professional Responsibilities of the Actuary: “ASOP 12 (*Risk Classification*: risk characteristics must be related to expected outcomes, though a…” |
| ASOP 12 considers a risk characteristic more appropriate when it is objective, meaning it is well defined and unambiguous, and easy to veri… | fact | tagged | Classification Ratemaking: “**Operational** — objective, inexpensive to obtain and verify, not manipulable by the insured.” |
| ASOP 12 requires that a risk characteristic comply with existing law, so that characteristics prohibited by law or regulation cannot be use… | fact | tagged | Classification Ratemaking: “**Legal** — some variables are prohibited outright in some jurisdictions.” |
| ASOP 12 asks the actuary to consider whether classes have enough data volume to be credible, and sparse categories may be combined to make … | fact | tagged | Classification Ratemaking: “**Credibility** — risk classes should be large enough to allow credible statistical inferences abou…” |
| ASOP 12 also asks the actuary to consider industry practices (whether the characteristic is commonly used for the coverage) and practical c… | fact | tagged | Classification Ratemaking: “**Practicality** — the actuary balances the potentially conflicting objectives of accuracy and effi…” |

</details>

<details><summary><code>cas5-2016f-q11</code> · untagged</summary>

Tagged pages: Increased Limits, Severity, Trend, Limited Expected Value, Loss Trend

| Item | Kind | Status | Where |
|---|---|---|---|
| The limited average severity at limit L is the average per-claim loss with each claim capped at L (E[min(X, L)]), computed over all claims,… | definition | tagged | Increased Limits: “$E[X \wedge L]$ is the **limited expected value**, the expected loss capped at $L$.” |
| The increased limits factor for limit L equals the limited average severity at L divided by the limited average severity at the basic limit… | formula | tagged | Increased Limits: “$$\text{ILF}(L) = \frac{E[X \wedge L]}{E[X \wedge B]}$$” |
| ILF calculations assume claim frequency is the same across limits, so the same claim count is used as the denominator for every limit and t… | fact | tagged | Increased Limits: “and frequency is the same whatever limit is chosen.” |
| To measure severity trend in an excess layer, apply the ground-up trend factor to each ground-up loss, recompute the loss in the layer (exc… | procedure | elsewhere | Excess of Loss: “Trend each historical loss individually *before* applying the layer. Excess losses grow faster than…” |
| Average severity in an excess layer is calculated using only the claims that reach the layer (those exceeding the attachment point), not al… | fact | elsewhere | Layer of Insurance: “$E[N]\,S(a)$ claims are expected to reach the layer. Each pays on average $\left(E[X \wedge b] - E[…” |
| Leverage: a layer above a fixed attachment point trends at a higher rate than the ground-up severity trend, because a uniform percentage in… | fact | tagged | Increased Limits: “As losses grow, more of them pierce the basic limit and the excess layers grow faster than the grou…” |
| ILFs at high limits computed from a company's own data are not credible when few claims reach or exceed those limits, because the results a… | fact | tagged | Increased Limits: “Data at high limits is sparse and volatile, which is why ILFs are calculated from a broader body of…” |
| Alternative sources for high-limit ILFs include industry/bureau data (e.g., ISO, NCCI), competitor filings, data combined from similar line… | fact | tagged | Increased Limits: “ILFs are calculated from a broader body of experience (class group, state group or countrywide)” |

</details>

<details><summary><code>cas5-2016f-q13</code> · gap</summary>

Tagged pages: Territory Ratemaking, Credibility, Pure Premium, Insurance Premium, Complement of Credibility, Pure Premium Analysis, Ratemaking Constraints

| Item | Kind | Status | Where |
|---|---|---|---|
| The pure premium for a territory equals its trended ultimate losses (and ALAE) divided by its number of exposures. | formula | tagged | Pure Premium: “$$\text{Pure Premium} = \frac{\text{Losses} + \text{LAE}}{\text{Earned Exposures}}$$” |
| Under the square root rule, partial credibility Z equals the square root of (actual exposures divided by the full credibility standard), ca… | formula | tagged | Credibility: “Partial credibility uses the **square root rule**, $Z = \sqrt{n / n_{\text{full}}}$, capped at $1$” |
| The indicated pure premium relativity for a territory is its pure premium divided by the overall exposure-weighted average pure premium (re… | procedure | elsewhere | Territorial Rating: “$$\text{Territory relativity} = \frac{\text{Territory pure premium}}{\text{Overall pure premium}}$$” |
| Normalize current territorial relativities by dividing each by the exposure-weighted average current relativity, so that they are on the sa… | procedure | missing |  |
| The credibility-weighted relativity equals Z times the indicated relativity plus (1 − Z) times the complement (normalized current relativit… | formula | tagged | Credibility: “$$\text{Estimate} = Z \times \text{Experience} + (1 - Z) \times \text{Complement}$$” |
| Rebase credibility-weighted relativities to the base territory by dividing each by the base territory's credibility-weighted relativity, so… | procedure | tagged | Territory Ratemaking: “$$\text{Territory Relativity}_i = \frac{\text{Pure Premium}_i}{\text{Pure Premium}_{\text{base}}}$$” |
| For a revenue-neutral change, the indicated relativity change for each territory (new relativity over current relativity, minus 1) is divid… | procedure | elsewhere | Balancing Back: “$$\text{OBF} = \frac{\sum_i w_i\, r_i^{\text{old}}}{\sum_i w_i\, r_i^{\text{new}}}$$” |
| Proposed rate changes may differ from indicated changes because of regulatory restrictions, customer disruption or retention concerns, comp… | fact | tagged | Ratemaking Constraints: “**Operational.** Base rates and relativities are usually easy to change; changing the structure of …” |

</details>

<details><summary><code>cas5-2016f-q14</code> · gap</summary>

Tagged pages: Coinsurance, Coinsurance Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| The coinsurance requirement is the minimum fraction of property value that the insured must carry as insurance (face amount) to avoid a pen… | definition | tagged | Coinsurance Rating: “the property **coinsurance clause**, which penalizes an insured who carries limits below a required…” |
| The coinsurance apportionment ratio is a = min(F / (c × V), 1), where F is the policy face amount, c is the coinsurance requirement fractio… | formula | tagged | Coinsurance Rating: “$$\text{Recovery}_{\text{clause}} = \min\!\left(\frac{\text{Insurance Carried}}{\text{Coinsurance \…” |
| The coinsurance penalty on a partial loss equals (1 − apportionment ratio) × loss amount, and is the part of the loss the insurer does not … | formula | syllabus | Coinsurance Percentage: “$F$ is the face value of the policy, $V$ the value of the property, $L$ the loss after deductible, …” |
| The maximum coinsurance penalty occurs when the loss is at or above the policy face amount (the insurer pays up to the limit), so the maxim… | fact | missing |  |
| When the insured carries at least the required coinsurance amount (F ≥ c × V), the apportionment ratio is capped at 1 and no coinsurance pe… | fact | linked | Insurance to Value (collapsed): “The insured met the requirement at inception, but the test uses the value at the time of loss.” |
| Underinsured properties are not fully covered for losses, so the insured is not returned to the pre-loss condition, particularly for losses… | fact | tagged | Coinsurance Rating: “The clause applies only up to the policy limit, and full limits are still paid on total losses up t…” |
| Underinsured properties cause premium inequity and inadequacy: with partial losses possible, a policy with lower insurance-to-value has hig… | fact | linked | Insurance to Value: “A book insured below value therefore collects too little premium at the filed rate.” |

</details>

<details><summary><code>cas5-2016f-q15</code> · gap</summary>

Tagged pages: Experience Rating, Credibility

| Item | Kind | Status | Where |
|---|---|---|---|
| In experience rating, primary losses are the portion of each individual claim up to the primary loss cap (split point), and excess losses a… | definition | tagged | Experience Rating: “Apply the split point to each claim separately: the claim's primary loss is the lesser of the claim…” |
| Expected losses equal the payroll (in units of $100) multiplied by the expected loss rate per $100 of payroll. | formula | missing |  |
| The D-ratio is the expected proportion of expected losses that are primary losses, so expected primary losses Ep = D × expected losses and … | definition | missing |  |
| The experience modification is M = [Ap + W·Ae... i.e. Zp·Ap + (1−Zp)·Ep + Ze·Ae + (1−Ze)·Ee] divided by expected losses (E), where Ap and A… | formula | tagged | Experience Rating: “$$M = \frac{Z_p A_p + (1-Z_p)E_p + Z_e A_e + (1-Z_e)E_e}{E} = 1 + Z_p\frac{A_p - E_p}{E} + Z_e\frac…” |
| The policy's premium under experience rating is the standard premium multiplied by the experience modification factor. | procedure | tagged | Experience Rating: “\text{Modified Premium} = \text{Manual Premium} \times M” |
| The experience period for an experience rating modification covers three policy years, so expected losses use the full experience-period pa… | fact | tagged | Experience Rating: “Experience rating is **prospective**: it uses a completed experience period (typically three years,…” |

</details>

<details><summary><code>cas5-2016f-q16</code> · answerable</summary>

Tagged pages: Reserving Data Organization, Development Triangle, Accident Year, Data Diagnostic Analysis, Settlement Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| Build an accident-year cumulative paid claims triangle from transactional claim data by assigning each payment to its claim's accident year… | procedure | tagged | Development Triangle: “cumulative amounts arranged with **cohorts as rows** (usually [[Accident Year\\|accident years]]), *…” |
| Reported (incurred) claims at an evaluation date equal cumulative paid claims plus case outstanding reserves, including all claims for that… | definition | linked | Incurred Losses: “**Incurred Losses** — more precisely **reported losses** — are cumulative [[Paid Losses\\|payments]]…” |
| Build an accident-year cumulative reported claims triangle by adding each accident year's case outstanding at the evaluation date to its cu… | procedure | linked | Incurred Losses: “**Incurred Losses** — more precisely **reported losses** — are cumulative [[Paid Losses\\|payments]]…” |
| Diagnose changes in settlement rate by building a paid-to-reported (or reported-to-paid) claims ratio triangle and examining the latest cal… | procedure | tagged | Development Triangle: “**Along a diagonal** — everything that happened in one calendar period. A diagonal effect is [[Infl…” |
| A rising paid-to-reported ratio along the latest diagonal, with unchanged case reserve adequacy, indicates claims are being paid faster (an… | fact | tagged | Data Diagnostic Analysis: “**Faster [[Settlement Rate\\|settlement]]:** closure rates and paid-to-reported rise together.” |
| A change in settlement rate distorts historical paid development factors, making the paid development method unreliable, whereas reported-c… | fact | tagged | Settlement Rate: “- **Reported data is largely immune**, because reported losses include the case reserve whether or …” |
| The Berquist-Sherman paid adjustment restates the historical paid claims triangle to the current settlement rate, after which paid developm… | procedure | tagged | Settlement Rate: “The remedy is the [[Berquist-Sherman Method\\|Berquist-Sherman]] paid adjustment: restate each histo…” |

</details>

<details><summary><code>cas5-2016f-q17</code> · answerable</summary>

Tagged pages: Reserving Data Organization, Credibility, Mix of Business, Data Segmentation, External Information in Reserving

| Item | Kind | Status | Where |
|---|---|---|---|
| Reserve estimation methods work best on homogeneous data, meaning claims with similar characteristics, settlement rates, severity and frequ… | fact | tagged | Reserving Data Organization: “Split into groups that balance [[Homogeneity]] against [[Credibility]] — by [[Line of Business\\|lin…” |
| Aggregating lines of business with different development patterns, settlement rates, or tail lengths (long-tailed vs. short-tailed) distort… | fact | tagged | Reserving Data Organization: “Combining them would average a multi-year liability pattern with an essentially immediate property …” |
| Reserving methods based on aggregated data perform poorly when the mix of business is changing, since historical development factors reflec… | fact | tagged | Mix of Business: “In **reserving**, a mix shift breaks the [[Homogeneity\\|homogeneity]] assumption behind the [[Devel…” |
| Using only internal data captures the company's own operations (claim settlement rates, case reserving practices, book mix) without needing… | fact | tagged | External Information in Reserving: “a small or newly segmented book whose triangle is too volatile to be [[Credibility\\|credible]]” |
| Supplementing company data with industry (external) data as a complement of credibility increases data volume and credibility, and reduces … | fact | tagged | Credibility: “**Credibility** $Z$ is the weight given to a body of observed experience when it is blended with a …” |
| External or industry data may not be comparable to the company's data because of differences in coverage levels, underwriting guidelines, c… | fact | tagged | External Information in Reserving: “Two books with the same nominal line code can have very different development if one is written at …” |

</details>

<details><summary><code>cas5-2016f-q18</code> · answerable</summary>

Tagged pages: Bornhuetter-Ferguson Method, Development Factor, Unpaid Claims, Settlement Rate, Expected Loss Method, Chain Ladder Method, Claims Processing Changes

| Item | Kind | Status | Where |
|---|---|---|---|
| The Bornhuetter-Ferguson unpaid claims estimate equals the expected claims ratio times on-level premium times the percentage unpaid (1 - 1/… | formula | tagged | Bornhuetter-Ferguson Method: “$$\text{IBNR} = \left(1 - \tfrac{1}{\text{CDF}}\right) \times \text{ELR} \times \text{EP}$$” |
| Percent unpaid equals 1 minus the reciprocal of the cumulative development factor (percent reported or paid is 1/CDF). | formula | tagged | Bornhuetter-Ferguson Method: “$C$ is reported (or paid) losses to date, $U_0 = \text{ELR} \times \text{EP}$ the a priori expectat…” |
| The implied paid CDF for an accident year is obtained from the paid development unpaid estimate: CDF = (paid + development unpaid) / paid, … | procedure | linked | Cumulative Development Factor: “$$\text{Ultimate} = C_n \times \text{CDF}_{n \to \text{ult}}$$” |
| The paid development method applies cumulative factors directly to paid claims, so it leverages errors or distortions in the paid data into… | fact | tagged | Bornhuetter-Ferguson Method: “The chain ladder instead scales the whole diagonal, so a distorted diagonal is multiplied by the fu…” |
| The BF technique is a credibility-weighted blend of the expected claims and development techniques, giving weight to expected claims, so it… | fact | tagged | Bornhuetter-Ferguson Method: “BF is a **credibility weighting** in disguise: it equals $Z \, U_{\text{CL}} + (1-Z)\,U_0$ with $Z …” |
| The expected claims technique estimates unpaid claims as premium times the expected claims ratio minus paid claims to date, so the ultimate… | formula | tagged | Unpaid Claims: “$$\text{Unpaid} = \text{Ultimate} - \text{Paid to date}$$” |
| When claim payments slow, historical paid development factors and percentages unpaid derived from them are too low/understated, and paid cl… | fact | tagged | Settlement Rate: “**Slower settlement** does the reverse and understates ultimate from paid data.” |
| Under a payment slowdown the expected claims unpaid estimate is neither over- nor understated, because the ultimate is unchanged and the lo… | fact | tagged | Unpaid Claims: “$$\text{Unpaid} = \text{Ultimate} - \text{Paid to date}$$” |

</details>

<details><summary><code>cas5-2016f-q19</code> · gap</summary>

Tagged pages: Development Factor, Unpaid Claims, Accident Year, Case Outstanding Development Method, External Information in Reserving

| Item | Kind | Status | Where |
|---|---|---|---|
| The case outstanding development factor equals paid CDF × (reported CDF − 1) / (paid CDF − reported CDF) + 1, and unpaid claims equal this … | formula | missing |  |
| For an accident year beyond the oldest age in the triangle, use the benchmark tail (ultimate) CDFs at the age after the last development co… | procedure | missing |  |
| An age-to-age development factor is the ratio of cumulative claims at one age to cumulative claims at the prior age for the same accident y… | definition | tagged | Development Factor: “**Development Factor** (link ratio or age-to-age factor) is the ratio used to project cumulative lo…” |
| To assess benchmark factors, compute the company's own age-to-age factors for reported and paid claims, and compare them with the industry … | procedure | tagged | External Information in Reserving: “**External information also flags problems.** A development pattern far outside the industry range,…” |
| When company paid factors match the benchmark but reported factors are higher, the benchmark reported pattern is inappropriate, indicating … | fact | linked | Case Adequacy: “**Paid data is immune**, so a divergence between paid and reported chain ladder estimates is the co…” |
| Using a benchmark reported CDF that is too low understates the case development factor and therefore understates the unpaid claim estimate. | fact | linked | Cumulative Development Factor: “$$\text{Ultimate} = C_n \times \text{CDF}_{n \to \text{ult}}$$” |

</details>

<details><summary><code>cas5-2016f-q2</code> · answerable</summary>

Tagged pages: On Level Premium, Rate Change, Earned Premium, Parallelogram Method

| Item | Kind | Status | Where |
|---|---|---|---|
| The on-level factor for earned premium equals the current cumulative rate level divided by the average cumulative rate level in effect over… | definition | tagged | On Level Premium: “$$\text{On-Level Factor} = \frac{\text{Current cumulative rate level index}}{\text{Average rate lev…” |
| The parallelogram method assumes policies are written uniformly and earned evenly over the policy term; for annual policies, a calendar yea… | procedure | tagged | Parallelogram Method: “The **Parallelogram Method** (or geometric method) is the [[On-Leveling\\|on-leveling]] method that …” |
| For a rate change taking effect part-way through the calendar year, the area of the triangle at the corner of the square (0.5 × fraction × … | procedure | tagged | Parallelogram Method: “**CY 2023.** Still earning at $1.0400$ (written $1/1$–$3/31/2022$): $\tfrac{1}{2}(0.25)^2 = 0.03125…” |
| The cumulative rate level index is the product of (1 + rate change) over successive rate changes, and the average rate level for a period i… | formula | tagged | On Level Premium: “- The *average* index for a year is the earned-premium-weighted blend of the levels in force during…” |
| A law change applying to all in-force policies takes effect immediately for existing policies, so it is treated as a rate change at its eff… | fact | tagged | Parallelogram Method: “- $I_k$ is the cumulative rate level index of rate level group $k$ (each index is the previous one …” |
| A weakness of the parallelogram method is its assumption that policies are written uniformly throughout the period, which fails for seasona… | fact | tagged | Parallelogram Method: “- **Two weaknesses.** It assumes uniform writing — false for seasonal business such as boat owners,…” |
| The extension of exposures method corrects the parallelogram method's weaknesses by re-rating each policy individually at current rates and… | procedure | tagged | Parallelogram Method: “refining to quarters or months, or weighting by the actual distribution of writings, helps.” |

</details>

<details><summary><code>cas5-2016f-q20</code> · gap</summary>

Tagged pages: Frequency-Severity Method, Berquist-Sherman Method, Severity, Changing Conditions, Long Tail Lines

| Item | Kind | Status | Where |
|---|---|---|---|
| The frequency-severity technique using disposal rates projects ultimate claim counts, applies disposal rates (cumulative closed-with-paymen… | procedure | tagged | Frequency-Severity Method: “Project the number of claims closing in each future period from historical **disposal rates**, valu…” |
| The disposal rate technique uses only paid (closed) claim data and is therefore unaffected by changes in case reserve adequacy, and it avoi… | fact | linked | Case Adequacy: “**Paid data is immune**, so a divergence between paid and reported chain ladder estimates is the co…” |
| Because severities are explicitly trended, the frequency-severity method can directly address claim inflation, but it depends heavily on se… | fact | tagged | Frequency-Severity Method: “Develop counts, but estimate severity by **trending** a mature year's severity forward rather than …” |
| The disposal rate technique assumes stable disposal rates (a stable settlement pattern) and a consistent definition of claim counts over ti… | fact | tagged | Frequency-Severity Method: “The method needs **consistent count definitions** across the whole triangle, and it is sensitive to…” |
| The frequency-severity technique assumes claims are paid in full at closure with no partial payments; partial payments on open claims viola… | fact | missing |  |
| The Berquist-Sherman method restates historical data for changes in claim settlement rates (adjusting closed counts/disposal rates to the c… | procedure | tagged | Berquist-Sherman Method: “For each historical cell, interpolate the paid losses that *would* have been paid had that year clo…” |
| Adjustments for violated assumptions include excluding partial payments from severity and reapplying them in the period the claim closes, s… | procedure | tagged | Berquist-Sherman Method: “The adjustments are **large and judgment-laden** — the severity trend and the target disposal patte…” |

</details>

<details><summary><code>cas5-2016f-q21</code> · answerable</summary>

Tagged pages: Bornhuetter-Ferguson Method, Cape Cod Method, Accident Year, Reasonableness Testing

| Item | Kind | Status | Where |
|---|---|---|---|
| Bornhuetter-Ferguson IBNR = expected claims (expected claims ratio × on-level earned premium) × percent unreported, where the percent unrep… | formula | tagged | Bornhuetter-Ferguson Method: “$$\text{IBNR} = \left(1 - \tfrac{1}{\text{CDF}}\right) \times \text{ELR} \times \text{EP}$$” |
| The percent reported (or its complement, percent unreported) implied by the reported development technique equals reported claims divided b… | formula | tagged | Reasonableness Testing: “$p_t = 1/\text{CDF}_t$ is the expected percentage reported (or paid) at age $t$.” |
| To assess an expected claims ratio assumption, compute the claims ratio (ultimate claims divided by on-level earned premium) for each accid… | procedure | tagged | Reasonableness Testing: “Then test the *selected* ultimates by the ratios they imply: ultimate claim ratios, severities, fre…” |
| The Bornhuetter-Ferguson technique assumes a constant expected claims ratio and relies on an a priori estimate that does not respond to eme… | fact | tagged | Bornhuetter-Ferguson Method: “BF does not respond to bad news. If emergence runs far ahead of the a priori, BF holds most of its …” |
| The Cape Cod technique derives the expected claims ratio from the data's own experience, so it responds to changing claims ratios across ye… | fact | tagged | Cape Cod Method: “**Cape Cod Method** (Stanard-Bühlmann) is the [[Bornhuetter-Ferguson Method\\|Bornhuetter-Ferguson]]…” |

</details>

<details><summary><code>cas5-2016f-q22</code> · answerable</summary>

Tagged pages: Berquist-Sherman Method, Settlement Rate, Frequency-Severity Method, Data Diagnostic Analysis

| Item | Kind | Status | Where |
|---|---|---|---|
| To test whether claims are closing faster, compare the ratio of closed (or paid) claim counts to reported claim counts at the same maturity… | procedure | tagged | Data Diagnostic Analysis: “**Faster [[Settlement Rate\\|settlement]]:** closure rates and paid-to-reported rise together.” |
| When claim settlement rates are changing, closed claim counts and paid severity (and disposal-rate methods) are distorted, so the frequency… | fact | tagged | Settlement Rate: “**Reported data is largely immune**, because reported losses include the case reserve whether or no…” |
| Reported (or paid) severity at each maturity equals the cumulative reported (or paid) claim dollars divided by the corresponding cumulative… | definition | linked | Severity: “**Severity** is the average cost per claim — total losses divided by claim count — as distinct from…” |
| Develop claim counts and severity on separate triangles: compute age-to-age factors, select factors (e.g., all-year average when stable), a… | procedure | tagged | Frequency-Severity Method: “Develop the count triangle to ultimate counts; develop an average severity triangle (dollars ÷ coun…” |
| Ultimate claims for an accident year equal ultimate claim count (latest count times count CDF) times ultimate severity (latest severity tim… | formula | tagged | Frequency-Severity Method: “U = N_{\text{ult}} \times S_{\text{ult}}” |

</details>

<details><summary><code>cas5-2016f-q23</code> · answerable</summary>

Tagged pages: Berquist-Sherman Method, Reserve Adequacy, Bornhuetter-Ferguson Method, Case Adequacy, Unearned Premium

| Item | Kind | Status | Where |
|---|---|---|---|
| The Berquist-Sherman case reserve adequacy adjustment is needed when case reserve adequacy has changed, since an unadjusted reported triang… | fact | tagged | Berquist-Sherman Method: “**Berquist-Sherman Method** restates a historical [[Development Triangle\\|triangle]] so that every …” |
| To adjust for case reserve adequacy, compute average case outstanding (case outstanding divided by open claim counts), keep the latest diag… | procedure | tagged | Berquist-Sherman Method: “3. **Trend the latest diagonal's** average case outstanding backwards at $t$ to restate each histor…” |
| Adjusted reported claims = adjusted average case outstanding × open claim counts + paid claims. | formula | tagged | Berquist-Sherman Method: “$$\text{Adjusted Reported}_{\text{AY},n} = \text{Paid}_{\text{AY},n} + \text{Adjusted Case}_{\text{…” |
| Age-to-age factors are computed from the adjusted triangle, selected (e.g. by straight average), combined with a tail factor, and cumulated… | procedure | syllabus | Chain Ladder Method: “**The procedure:** build the cumulative [[Development Triangle\\|triangle]] → compute [[Age to Age F…” |
| Calendar year earned premium equals written premium minus the change in unearned premium reserve (ending UEPR minus beginning UEPR); with a… | procedure | tagged | Unearned Premium: “For a book of annual policies written uniformly, the year-end UEP is about **half** of that year's …” |
| Bornhuetter-Ferguson ultimate = developed ultimate × (1/CDF) + expected ultimate × (1 − 1/CDF), where expected ultimate = expected claim ra… | formula | tagged | Bornhuetter-Ferguson Method: “$$U_{\text{BF}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) \times U_{0}$$” |
| Unpaid claims = ultimate claims − paid claims to date (case outstanding plus IBNR). | formula | linked | Unpaid Claims: “$$\text{Unpaid} = \text{Ultimate} - \text{Paid to date}$$” |

</details>

<details><summary><code>cas5-2016f-q24</code> · answerable</summary>

Tagged pages: Salvage and Subrogation, Accident Year, Development Factor, Recoveries

| Item | Kind | Status | Where |
|---|---|---|---|
| To develop a loss-type triangle (e.g., received salvage and subrogation), compute age-to-age factors as ratios of successive cumulative val… | procedure | tagged | Development Factor: “$$f_{n \to n{+}1} = \frac{\text{Losses at age }n{+}1}{\text{Losses at age }n}$$” |
| Select age-to-age development factors using a simple all-year average of the factors in each column, then multiply the selected factors to … | procedure | tagged | Development Factor: “**Simple average**: unweighted mean of all individual year factors — treats each accident year equa…” |
| The development technique estimates ultimate by multiplying the latest cumulative amount by the age-to-ultimate factor. | procedure | linked | Loss Development: “$$\text{Ultimate Losses} = \text{Losses at age } n \times \text{CDF}_{n \to \text{ult}}$$” |
| In the ratio approach for salvage and subrogation, form the ratio of received S&S to paid claims at each age, develop those ratios with age… | procedure | tagged | Recoveries: “**Salvage and subrogation** (Friedland Ch. 14) are projected either by the development technique on…” |
| Developing small S&S amounts directly gives volatile, highly leveraged factors for immature years, whereas the ratio approach is more stabl… | fact | tagged | Recoveries: “The ratio's development factors are less leveraged than those of S&S dollars, and the ultimate rati…” |
| For a new accident year, estimate ultimate S&S by applying the selected ultimate S&S-to-claims ratio (current ratio times age-to-ultimate f… | procedure | tagged | Recoveries (collapsed): “Absent a reason, a selection near the historical level is typical — at $0.107$, ultimate S&S is $\$…” |

</details>

<details><summary><code>cas5-2016f-q25</code> · answerable</summary>

Tagged pages: Allocated Loss Adjustment Expense, Development Factor, Accident Year, Chain Ladder Method

| Item | Kind | Status | Where |
|---|---|---|---|
| An age-to-age (link ratio) factor is the ratio of cumulative reported claims at one maturity to the cumulative reported claims at the prior… | definition | tagged | Development Factor: “**Development Factor** (link ratio or age-to-age factor) is the ratio used to project cumulative lo…” |
| Select an age-to-age factor for each development period from the observed factors in the triangle (e.g., average of the accident-year facto… | procedure | tagged | Development Factor: “- **Simple average**: unweighted mean of all individual year factors — treats each accident year eq…” |
| Compute age-to-ultimate factors by multiplying the selected age-to-age factors from a given maturity through the tail factor, working backw… | procedure | linked | Cumulative Development Factor: “CDFs are built **backwards from the tail**: start with the tail factor, multiply in each successive…” |
| Under the development technique, ultimate claims equal the latest diagonal value of reported claims for each accident year multiplied by th… | formula | tagged | Chain Ladder Method: “$$U_{\text{AY}} = C_{\text{AY},\,n} \times \text{CDF}_{n \to \text{ult}}$$” |
| Claims and ALAE may be combined for development if their development patterns and ALAE-to-claim ratios are consistent over time; if pattern… | fact | tagged | Allocated Loss Adjustment Expense: “- Combining is simplest and is the usual choice, but it assumes ALAE develops like indemnity. It of…” |
| The development technique is less reliable when age-to-age factors are volatile or leveraged (e.g., small early-maturity amounts) or when c… | fact | tagged | Chain Ladder Method: “The chain ladder is at its best on **mature cohorts with stable patterns and ample volume** — and a…” |

</details>

<details><summary><code>cas5-2016f-q26</code> · gap</summary>

Tagged pages: Unallocated Loss Adjustment Expenses ULAE, Inflation, Ultimate Loss, Trend

| Item | Kind | Status | Where |
|---|---|---|---|
| In the classical paid-to-paid technique, the ULAE ratio for each calendar year is calendar-year paid ULAE divided by calendar-year paid cla… | formula | tagged | Unallocated Loss Adjustment Expenses ULAE: “$$\text{Classical ratio} = \frac{\text{CY Paid ULAE}}{\text{CY Paid Loss}}$$” |
| Select a ULAE ratio from the calendar-year ratios by examining their pattern (e.g. choose the latest ratio when it trends steadily) rather … | procedure | tagged | Unallocated Loss Adjustment Expenses ULAE: “Compute the ratio $R$ of calendar-year paid ULAE to calendar-year paid loss, review it for trend, a…” |
| Classical technique unpaid ULAE = selected ratio × (IBNR + 50% × case outstanding reserves), reflecting that half of ULAE is spent opening … | formula | tagged | Unallocated Loss Adjustment Expenses ULAE: “If ULAE is assumed to be spent half at reporting and half at settlement, only $50\%$ remains on rep…” |
| Key assumptions of the classical technique are that ULAE is spent 50% when a claim is opened and 50% when closed, and that ULAE and claim c… | fact | tagged | Unallocated Loss Adjustment Expenses ULAE: “If ULAE is assumed to be spent half at reporting and half at settlement, only $50\%$ remains on rep…” |
| Test the same-inflation assumption by comparing trends in loss cost per exposure (ultimate claims ÷ exposures) with trends in paid ULAE; di… | procedure | missing |  |
| The Kittel refinement adjusts the classical technique for a changing book size by using the average of paid and reported (incurred) claims … | definition | tagged | Unallocated Loss Adjustment Expenses ULAE: “Kittel divides by the **average of paid and incurred** loss instead:” |
| The Kittel refinement still assumes ULAE and claims inflate at the same rate, so it cannot correct for different ULAE and claim cost inflat… | fact | tagged | Unallocated Loss Adjustment Expenses ULAE: “Kittel divides by the **average of paid and incurred** loss instead:” |

</details>

<details><summary><code>cas5-2016f-q27</code> · answerable</summary>

Tagged pages: Actual vs Expected Analysis, Development Triangle, Accident Year

| Item | Kind | Status | Where |
|---|---|---|---|
| Actual versus expected claim count emergence compares the claim counts actually reported (or closed) during a calendar period with the coun… | definition | tagged | Actual vs Expected Analysis: “**Actual vs. Expected Analysis** (A/E) compares the emergence that actually occurred in a period ag…” |
| Expected emergence over a period for an accident year equals (selected ultimate claim count minus reported claims to date) times (percent r… | formula | tagged | Actual vs Expected Analysis: “$$\text{Expected emergence} = U_{\text{prior}} \times \left(\frac{1}{\text{CDF}_{n+1}} - \frac{1}{\…” |
| Actual emergence in a calendar period for an accident year equals the cumulative reported claim counts at the end of the period minus those… | formula | tagged | Actual vs Expected Analysis: “\text{Actual emergence} &= \$8{,}100{,}000 - \$6{,}000{,}000” |
| Compare actual to expected emergence by accident year and in total (by difference or ratio); actual exceeding expected indicates ultimate c… | procedure | tagged | Actual vs Expected Analysis: “$$\text{A/E} = \frac{\text{Actual emergence}}{\text{Expected emergence}}$$” |
| A limitation of the actual vs. expected approach is that it relies on a historical development pattern and annual intervals, so it may not … | fact | tagged | Development Triangle: “Assumptions being made implicitly by using one at all: each cohort develops in a similar pattern, t…” |
| Alternatives that address the limitations include using shorter time intervals, comparing expected closed (paid) claim counts using a close… | procedure | tagged | Development Triangle: “Triangles may be annual, semi-annual or quarterly. Finer periods are more responsive and show seaso…” |

</details>

<details><summary><code>cas5-2016f-q3</code> · answerable</summary>

Tagged pages: Claims Made Coverage, Report Year, Underwriting Profit, Occurrence Coverage

| Item | Kind | Status | Where |
|---|---|---|---|
| An occurrence policy covers losses that occur during the policy period, regardless of when they are reported, so the losses for a policy ye… | definition | tagged | Occurrence Coverage: “**Occurrence Coverage** is a policy trigger under which the policy responds to losses that *occur* …” |
| A claims-made policy covers claims reported during the policy period that arise from incidents occurring on or after the retroactive date, … | definition | tagged | Claims Made Coverage: “**Claims-Made Coverage** is a policy trigger under which the policy responds to claims *reported* d…” |
| To find losses for a claims-made policy year from a report-year by lag triangle, sum the cells for that report year across the report lags … | procedure | tagged | Claims Made Coverage: “Claims-made business is organized on a [[Report Year]] basis: in Werner's report-year-by-lag table …” |
| Moving from occurrence to claims-made coverage reduces loss reserve risk because claims-made has little or no IBNR (pure IBNR/late-reported… | fact | tagged | Claims Made Coverage: “Because the trigger is the report date, a claims-made policy has **no pure IBNR** — only IBNER on c…” |
| Moving from occurrence to claims-made coverage shortens the time between premium receipt and loss payment, reducing investment income, so t… | fact | tagged | Claims Made Coverage: “The investment income earned from claims-made policies is substantially less than under occurrence …” |

</details>

<details><summary><code>cas5-2016f-q4</code> · gap</summary>

Tagged pages: Loss Trend, Trend, Frequency, Ultimate Loss, Severity, Underwriting Changes

| Item | Kind | Status | Where |
|---|---|---|---|
| The annual trend in frequency or severity between consecutive years is the ratio of the later year's value to the prior year's value, minus… | formula | tagged | Loss Trend (collapsed): “\left(\tfrac{11{,}100}{8{,}000}\right)^{1/5} - 1 &= 6.8\%” |
| Select frequency and severity trends from the observed period changes, using all years when changes are stable and only recent years when t… | procedure | tagged | Loss Trend: “exponential models may be fit to the whole of the data and to more recent periods, supplemented wit…” |
| The overall loss (pure premium) trend factor is the product of one plus the frequency trend and one plus the severity trend, compounded ove… | formula | tagged | Loss Trend: “1 + t_{PP} = (1 + t_{\text{freq}})(1 + t_{\text{sev}})” |
| Trend ultimate losses from the average accident date of each historical accident year to the average accident date of the future period, wh… | procedure | tagged | Loss Trend: “$t$ is the selected annual trend and $n$ the **trend period**, measured from the average date of lo…” |
| For annual rates in effect for a year with semi-annual policies, the average accident date of the future period is determined by the effect… | fact | syllabus | Premium Trend: “with six-month policies the trend-from date moves to $4/1/2011$ and the period is $2.25$ years.” |
| After trending each accident year's ultimate losses to the future period, average the trended ultimate losses across the selected years to … | procedure | missing |  |
| A one-time underwriting change that lowered claim counts distorts the frequency in earlier years, so the frequency trend may be selected us… | fact | tagged | Frequency: “rising frequency at flat severity points at underwriting, mix or the claim environment” |
| Writing fewer high-deductible policies increases frequency (fewer claims fall below deductibles) and decreases severity (fewer large-averag… | fact | tagged | Loss Trend: “Werner & Modlin's example is a heavily marketed higher deductible, which lowers frequency but is li…” |

</details>

<details><summary><code>cas5-2016f-q5</code> · answerable</summary>

Tagged pages: Large Loss, Reinsurance, Trend, Pure Premium, Net of Reinsurance, Loss Trend

| Item | Kind | Status | Where |
|---|---|---|---|
| Frequency is claim counts divided by earned exposures, and severity is ultimate losses divided by claim counts; the frequency and severity … | formula | tagged | Pure Premium: “The identity holds because $\dfrac{\text{Losses}}{\text{Exposures}} = \dfrac{\text{Claims}}{\text{E…” |
| Select a trend rate from the observed annual changes in the historical series (e.g., by judgment based on the fitted or year-over-year rate… | procedure | tagged | Net of Reinsurance: “A change in attachment point makes prior net years non-comparable, while gross years remain usable.” |
| The trend period runs from the average accident date of each historical year to the average accident date of the future period in which the… | definition | tagged | Trend: “The trend period runs from the average date of historical losses (midpoint of the accident year) to…” |
| For annual policies written uniformly, the average accident date of the future period is the rate effective date plus the policy term (one … | procedure | tagged | Trend: “The trend period runs from the average date of historical losses (midpoint of the accident year) to…” |
| Trended value equals the historical value multiplied by (1 + trend) raised to the trend period in years. | formula | tagged | Trend: “$$\text{Trend Factor} = (1 + r)^n$$” |
| To estimate losses net of reinsurance at the current retention, trend each large claim individually to the future level and then subtract t… | procedure | linked | Excess of Loss: “Trend each historical loss individually *before* applying the layer. Excess losses grow faster than…” |
| Pure premium equals losses divided by earned exposures; the all-year average is total trended net losses divided by total earned exposures. | formula | tagged | Pure Premium: “$$\text{Pure Premium} = \frac{\text{Losses} + \text{LAE}}{\text{Earned Exposures}}$$” |

</details>

<details><summary><code>cas5-2016f-q6</code> · answerable</summary>

Tagged pages: Expense Provisions, Variable Expenses, Insurance Premium, Earned Premium, Fixed Expenses

| Item | Kind | Status | Where |
|---|---|---|---|
| The all variable expense method projects the expense provision as total historical expenses divided by total premium, treating every expens… | definition | tagged | Expense Provisions: “The **all-variable expense method** loads every expense as a percentage of premium.” |
| Fixed expenses do not vary with premium, so treating them as variable overcharges when average premium is above average and undercharges wh… | fact | tagged | Expense Provisions: “Treating a fixed cost as variable over-charges large policies and under-charges small ones.” |
| Commissions/brokerage and other acquisition expenses are incurred at policy inception and so relate to written premium, while general expen… | fact | tagged | Expense Provisions: “Expenses incurred at the onset of the policy — commissions, other acquisition, and taxes, licenses …” |
| Compute expense ratios by year for each expense category using the appropriate premium base (written or earned) to identify trends before s… | procedure | tagged | Expense Provisions: “Expenses incurred at the onset of the policy — commissions, other acquisition, and taxes, licenses …” |
| In the exposure-based (policy-based) method, divide fixed expense dollars by exposures to get a per-exposure cost, trend it to the future p… | procedure | tagged | Fixed Expenses: “The fixed dollars are then put per exposure either by multiplying the fixed expense ratio by the pr…” |
| Giving equal weight to multiple years of data in a shrinking book weights older years too heavily, and recent years are more representative… | fact | tagged | Fixed Expenses: “In the premium-based method no trend is needed if average fixed expense and average premium change …” |

</details>

<details><summary><code>cas5-2016f-q7</code> · answerable</summary>

Tagged pages: Underwriting Profit, Expense Ratio, Rate Change, Insurance Premium, Pure Premium Method, Loss Ratio Method

| Item | Kind | Status | Where |
|---|---|---|---|
| The overall indicated rate per exposure with fixed expenses is (projected loss and LAE + fixed expenses per exposure total) / exposures div… | formula | tagged | Pure Premium Method: “$$\text{Indicated Rate} = \frac{\text{Pure Premium} + F}{1 - V - Q_T}$$” |
| Under the loss ratio method with fixed expenses, the indicated rate change equals [(projected loss and LAE + fixed expenses) / premium at c… | formula | tagged | Loss Ratio Method: “$$\text{Indicated Change} = \frac{\text{Projected Loss \& LAE Ratio} + F\%}{1 - V - Q_T} - 1$$” |
| The underwriting profit provision (Q) is the target profit as a percentage of premium, included as a variable component in the permissible … | definition | linked | Permissible Loss Ratio: “$V$ is the [[Variable Expenses\\|variable expense]] ratio, $Q_T$ the target [[Underwriting Profit\\|u…” |
| A company may target a lower underwriting profit provision when it expects greater investment income (e.g., longer-tail lines with long los… | fact | linked | Profit and Contingency Provision: “[[Long Tail Lines\\|Long-tail lines]] hold reserves for years and earn substantial investment income…” |
| Underwriting profit provisions can differ between companies due to business strategy (reducing the provision to grow or gain market share),… | fact | linked | Profit and Contingency Provision: “a charge for **random** variation from expected costs belongs in the total return consistent with t…” |

</details>

<details><summary><code>cas5-2016f-q9</code> · answerable</summary>

Tagged pages: Overall Rate Level Indication, Underwriting Profit, Variable Expenses, Fixed Expenses, Loss Ratio Method

| Item | Kind | Status | Where |
|---|---|---|---|
| The loss ratio method with fixed expenses gives the indicated rate change as (projected ultimate loss & LAE ratio + fixed expense ratio) / … | formula | tagged | Overall Rate Level Indication: “$$\text{Indicated Change} = \frac{\text{Projected Loss \& LAE Ratio} + F\%}{1 - V - Q_T} - 1$$” |
| Split each expense category into fixed and variable portions by multiplying its expense ratio by its variable percentage (variable) and the… | procedure | tagged | Fixed Expenses: “Expense studies rarely split cleanly. Ideally detailed expense data or activity-based cost studies …” |
| When expenses are incurred/paid at policy inception, expense ratios for those items (e.g., general expenses) are computed against written p… | fact | tagged | Variable Expenses: “Because commissions and taxes attach when a policy is **written**, these ratios are computed agains…” |
| A negative indicated rate change means the rate should decrease; the sign of the result (ratio minus 1) must be retained. | definition | linked | Permissible Loss Ratio: “an indicated change of $-6.8\%$.” |

</details>

<details><summary><code>cas5-2016s-q1</code> · answerable</summary>

Tagged pages: Loss Trend, Accident Year, Loss Ratio, Insurance Premium, On Level Premium, Parallelogram Method, Policy Provision Changes

| Item | Kind | Status | Where |
|---|---|---|---|
| On-level factor is the ratio of the current rate (or benefit) level to the average rate (or benefit) level in effect over the period, used … | definition | tagged | On Level Premium: “$$\text{On-Level Factor} = \frac{\text{Current cumulative rate level index}}{\text{Average rate lev…” |
| Compute the average rate level for an accident year by weighting each rate level by the share of the year's earned premium written at that … | procedure | tagged | On Level Premium: “The *average* index for a year is the earned-premium-weighted blend of the levels in force during t…” |
| For a rate change effective mid-year with one-year policies, the portion of the accident year's earned premium at the new rate equals the a… | procedure | tagged | Parallelogram Method: “The second formula is the area earned in the same calendar year at a new level effective a fraction…” |
| Benefit level changes affect losses by accident date for accident-year losses, but for policies written after a date they apply to policies… | procedure | tagged | Policy Provision Changes: “Changes attach to the **policy**, so they phase in over the policy term.” |
| Successive benefit or rate changes compound multiplicatively to give the current level (e.g., a +10% change followed by a -5% change gives … | fact | tagged | On Level Premium: “Rate level indices **compound**: successive changes of $+8\%$ and $+5\%$ give a cumulative index of…” |
| Trend on-level losses from the average accident date of the experience period to the average accident date of the period in which the new r… | procedure | tagged | Loss Trend: “$t$ is the selected annual trend and $n$ the **trend period**, measured from the average date of lo…” |
| When rates are filed once per year and policies have one-year terms, the average accident date of the period the new rates apply is six mon… | fact | tagged | Loss Trend (collapsed): “Policies are written between $7/1/2025$ and $6/30/2026$; each provides coverage for a year after it…” |
| On-level loss ratio = (losses × loss on-level factor × loss trend factor) / (earned premium × rate on-level factor). | formula | linked | Overall Rate Level Indication: “**Premium** — historical earned premium, brought to [[On Level Premium\\|current rate level]], devel…” |

</details>

<details><summary><code>cas5-2016s-q10</code> · untagged</summary>

Tagged pages: Classification Ratemaking, Complement of Credibility, Full Credibility Standard, Loss Ratio Method, Credibility, Generalized Linear Model

| Item | Kind | Status | Where |
|---|---|---|---|
| Square root rule for partial credibility: Z = sqrt(n / full credibility standard), capped at 1.0 when the claim count meets or exceeds the … | formula | tagged | Credibility: “$$Z = \sqrt{\frac{n}{n_{\text{full}}}} \qquad \text{(limited fluctuation)}$$” |
| Compute a class's loss ratio relativity as its loss ratio divided by the overall (all-class) loss ratio, and multiply by the class's curren… | procedure | elsewhere | Balancing Back: “Under the [[Loss Ratio Method\\|loss ratio method]], a class's indicated relativity is its current r…” |
| Credibility-weight the indicated relativity with the current relativity, using the current relativity (no change) as the complement of cred… | procedure | tagged | Complement of Credibility: “$$\text{Estimate} = Z \times \text{Experience} + (1 - Z) \times \text{Complement}$$” |
| Rebase credibility-weighted relativities to the base class by dividing each by the base class's relativity, then compare to the current rel… | procedure | tagged | Classification Ratemaking: “$$\text{Relativity}_i = \frac{\text{Pure Premium}_i}{\text{Pure Premium}_{\text{base}}}$$” |
| To make class rate changes revenue-neutral, compute the off-balance as the premium-weighted average change from rebasing and apply an offse… | procedure | tagged | Classification Ratemaking: “The base rate must be adjusted so that the combined effect equals the intended [[Overall Rate Level…” |
| Multivariate classification methods consider all rating variables simultaneously and so account for exposure and response correlations amon… | fact | tagged | Classification Ratemaking: “modern practice uses a [[Generalized Linear Model\\|GLM]], which estimates all variables simultaneou…” |
| Multivariate methods isolate the signal from the noise in each variable, provide diagnostic statistics for evaluating the model and variabl… | fact | tagged | Generalized Linear Model: “Model fit is assessed via [[Deviance]], [[AIC]], [[BIC]], and [[Residual Plot]]s” |

</details>

<details><summary><code>cas5-2016s-q11</code> · gap</summary>

Tagged pages: Increased Limits, Trend, Loss Trend, Severity, Limited Expected Value, Complement of Credibility

| Item | Kind | Status | Where |
|---|---|---|---|
| The limited average severity (LAS) at a limit is the expected claim size with each loss capped at that limit; the increased limits factor i… | definition | tagged | Increased Limits: “$$\text{ILF}(L) = \frac{E[X \wedge L]}{E[X \wedge B]}$$” |
| With policy-limit-censored data, estimate LAS at the basic limit using all claims from all policy limits, with losses capped at the basic l… | procedure | missing |  |
| To extend LAS to a higher limit, add to LAS at the lower limit the average layer severity per claim (losses in the layer, with claims excee… | procedure | missing |  |
| Severity trend has a leveraged effect on excess layers: excess layer losses trend faster than ground-up losses, which trend faster than bas… | fact | tagged | Increased Limits: “ILFs are **leveraged by inflation**. As losses grow, more of them pierce the basic limit and the ex…” |
| The complement of credibility for an excess layer via the lower limits analysis is experience losses capped at a lower limit (using all pol… | procedure | missing |  |
| Increased limits analysis (capping at the attachment point) requires data not truncated below the attachment point, so only policies with l… | fact | missing |  |

</details>

<details><summary><code>cas5-2016s-q12</code> · gap</summary>

Tagged pages: Classification Ratemaking, Insurance Premium, Rating Algorithm, Considerations for Implementing Rates, Non-Pricing Solutions

| Item | Kind | Status | Where |
|---|---|---|---|
| Estimate the average premium under a multiplicative rating plan by computing the exposure-weighted average of each rating variable's factor… | procedure | missing |  |
| Premium = base rate × product of rating factors × product of (1 − discount) factors, plus any additive (fixed) expense fee applied after th… | formula | tagged | Classification Ratemaking: “$$\text{Rate}_i = \text{Base Rate} \times \prod_k R_{i,k}$$” |
| The change in average premium equals proposed average premium divided by current average premium, minus 1. | formula | linked | Rate Change: “$$\text{Indicated Change} = \frac{\text{Indicated Rate}}{\text{Current Rate}} - 1$$” |
| Using separate exposure-weighted average factors for each variable assumes the variables are independent and ignores correlation/interactio… | fact | tagged | Classification Ratemaking: “A **univariate** (one-way) pure premium or loss ratio analysis attributes to a variable the effect …” |
| Calculating premium change from the current exposure distribution ignores that the insured mix may shift after a rate change, so the future… | fact | tagged | Considerations for Implementing Rates: “One further check belongs here: the off-balance is computed on the **current** in-force distributio…” |
| Inadequate rates can be addressed with non-pricing actions that improve profitability, such as reducing expenses, tightening underwriting g… | fact | tagged | Considerations for Implementing Rates: “Werner's central point is that rate adequacy is not only achieved through rate. Where a full increa…” |

</details>

<details><summary><code>cas5-2016s-q13</code> · untagged</summary>

Tagged pages: Territory Ratemaking, Workers Compensation Insurance, Development Factor, Insurance Premium, Loss Trend, Pure Premium Analysis

| Item | Kind | Status | Where |
|---|---|---|---|
| Develop losses to ultimate by multiplying each loss type's reported loss and ALAE by its own loss development factor, treating indemnity an… | procedure | linked | Loss Development: “Ultimate Losses} = \text{Losses at age } n \times \text{CDF}_{n \to \text{ult}}” |
| Determine the trend period as the time from the average accident date of the experience period to the average accident date of the future p… | procedure | tagged | Loss Trend: “$t$ is the selected annual trend and $n$ the **trend period**, measured from the average date of lo…” |
| Trended losses equal losses times (1 + annual trend) raised to the trend period, using the trend rate specific to each loss type. | formula | tagged | Loss Trend: “$$\text{Trend Factor} = (1 + t)^{n}$$” |
| Pure premium is trended ultimate loss and ALAE (summed across loss types) divided by exposures. | definition | tagged | Pure Premium Analysis: “$$\text{Pure Premium} = \frac{\text{Losses} + \text{LAE}}{\text{Earned Exposures}} = \text{Frequenc…” |
| The indicated territorial relativity is the territory's pure premium divided by the base territory's pure premium (rebasing so the base ter… | procedure | tagged | Territory Ratemaking: “$$\text{Territory Relativity}_i = \frac{\text{Pure Premium}_i}{\text{Pure Premium}_{\text{base}}}$$” |
| For no overall premium change when relativities change, compute an off-balance factor as the exposure-weighted average current relativity d… | procedure | elsewhere | Balancing Back: “$$\text{OBF} = \frac{\sum_i w_i\, r_i^{\text{old}}}{\sum_i w_i\, r_i^{\text{new}}}$$” |
| Percent rate change by territory equals (indicated relativity / current relativity) times the off-balance factor minus 1, when the base ter… | formula | elsewhere | Balancing Back (collapsed): “A class's rate change is $(1 + \Delta)\,\text{OBF}\,r_i^{\text{new}}/r_i^{\text{old}} - 1$.” |

</details>

<details><summary><code>cas5-2016s-q14</code> · answerable</summary>

Tagged pages: Chain Ladder Method, Development Factor, Accident Year, Settlement Rate, External Information in Reserving

| Item | Kind | Status | Where |
|---|---|---|---|
| An age-to-age (link ratio) factor is the ratio of cumulative claims at one maturity to cumulative claims at the previous maturity for the s… | definition | tagged | Development Factor: “**Development Factor** (link ratio or age-to-age factor) is the ratio used to project cumulative lo…” |
| Select age-to-age factors from the triangle by averaging observed factors (simple, volume-weighted, latest-n-year, or latest diagonal), cho… | procedure | tagged | Development Factor: “**Latest-$k$-year average**: uses only the most recent $k$ accident years — reduces the influence o…” |
| A volume-weighted average age-to-age factor equals the sum of claims at the later maturity divided by the sum of claims at the earlier matu… | formula | tagged | Development Factor: “**Volume-weighted average**: $\Sigma(\text{col }n{+}1) / \Sigma(\text{col }n)$ — gives more credibi…” |
| Under the paid claim development technique, ultimate claims equal current cumulative paid claims times the cumulative development factor, w… | formula | linked | Cumulative Development Factor: “$$\text{CDF}_{n \to \text{ult}} = \left(\prod_{k \ge n} f_{k \to k+1}\right) \times \text{Tail}$$” |
| Industry development factors can be used in place of company factors for the development technique when company factors are volatile or spa… | procedure | tagged | External Information in Reserving: “a small or newly segmented book whose triangle is too volatile to be [[Credibility\\|credible]]” |
| Development technique estimates at early maturities are highly leveraged and volatile because small changes in early factors, often driven … | fact | tagged | Chain Ladder Method: “The chain ladder is at its best on **mature cohorts with stable patterns and ample volume** — and a…” |

</details>

<details><summary><code>cas5-2016s-q15</code> · answerable</summary>

Tagged pages: Calendar Year, Accident Year, Unpaid Claims, Mix of Business, Reserving Data Organization, Data Segmentation

| Item | Kind | Status | Where |
|---|---|---|---|
| Calendar year aggregation groups claims by the year in which they are reported or paid, so a calendar year's amount combines activity from … | definition | tagged | Calendar Year: “**Calendar Year** (CY) is a data aggregation method that groups every transaction by the calendar y…” |
| Calendar year reported claims are obtained from a cumulative triangle by summing the latest diagonal's incremental amounts, i.e., each cell… | procedure | tagged | Calendar Year: “$$\text{CY Reported Losses} = \text{Paid} + \Delta\text{Case Reserves}$$” |
| Calendar year aggregation is generally inappropriate for estimating unpaid claims because calendar year totals do not develop, so there is … | fact | tagged | Calendar Year: “A calendar year **never develops** — it is closed and fixed the moment the books close. Friedland c…” |
| Accident year aggregation is appropriate for estimating unpaid claims because claims from an accident year continue to develop after year e… | fact | tagged | Accident Year: “Friedland calls it the accepted norm for P&C insurers in the U.S. and Canada, and by far the most c…” |
| Lines of business should be combined for unpaid claim estimation only if the data are homogeneous, with similar development patterns, growt… | fact | tagged | Mix of Business: “If the segments have different emergence patterns, the blended development factors drift as the wei…” |
| Combining lines can be motivated by a lack of credibility in a line's own data, so the tradeoff between homogeneity and credibility must be… | fact | tagged | Reserving Data Organization: “Split into groups that balance [[Homogeneity]] against [[Credibility]] — by [[Line of Business\\|lin…” |
| An age-to-age (link ratio) development factor is the cumulative claims at a later age divided by cumulative claims at the earlier age for t… | formula | linked | Development Triangle: “$$f_{k \to k+1} = \frac{\sum_{\text{AY}} C_{\text{AY},\,k+1}}{\sum_{\text{AY}} C_{\text{AY},\,k}}$$” |

</details>

<details><summary><code>cas5-2016s-q16</code> · answerable</summary>

Tagged pages: Development Factor, Accident Year, Earned Premium, Calendar Year, Expected Loss Method, Chain Ladder Method, Bornhuetter-Ferguson Method, Claim Reserve

| Item | Kind | Status | Where |
|---|---|---|---|
| Case outstanding reserve equals reported (incurred) claims minus paid claims. | definition | syllabus | Case Outstanding Development Method (collapsed): “AY 2023 at $24$ months: paid to date $\$800{,}000$, case outstanding $\$500{,}000$, so reported is …” |
| IBNR equals ultimate claims minus reported claims, and total unpaid claims equal ultimate claims minus paid claims (equivalently case outst… | definition | tagged | Expected Loss Method: “$$\text{IBNR} = U - \text{Reported}$$” |
| Under the expected claims technique, ultimate claims equal earned premium times the expected claim ratio. | formula | tagged | Expected Loss Method: “$$U = \text{ELR} \times \text{Earned Premium}$$” |
| An age-to-ultimate factor for a maturity is the ultimate claims divided by cumulative claims at that age, and successive age-to-age factors… | procedure | linked | Cumulative Development Factor: “$$\text{Ultimate} = C_n \times \text{CDF}_{n \to \text{ult}}$$” |
| Cumulative development factors are computed by multiplying age-to-age factors from a given age through the final age (times any tail factor… | procedure | linked | Cumulative Development Factor: “CDFs are built **backwards from the tail**: start with the tail factor, multiply in each successive…” |
| Paid development technique ultimate claims equal cumulative paid claims times the paid age-to-ultimate factor. | formula | tagged | Chain Ladder Method: “$$U_{\text{AY}} = C_{\text{AY},\,n} \times \text{CDF}_{n \to \text{ult}}$$” |
| Paid Bornhuetter-Ferguson ultimate equals paid claims plus expected ultimate claims (premium times expected claim ratio) times (1 − 1/paid … | formula | tagged | Bornhuetter-Ferguson Method: “$$U_{\text{BF}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) \times U_{0}$$” |

</details>

<details><summary><code>cas5-2016s-q17</code> · gap</summary>

Tagged pages: Development Factor, Accident Year, Unpaid Claims, Report Year, Case Outstanding Development Method

| Item | Kind | Status | Where |
|---|---|---|---|
| In the case outstanding development technique, current case outstanding is estimated as reported claims minus paid claims. | procedure | syllabus | Paid Losses: “$$\text{Reported Losses} = \text{Paid Losses} + \text{Case Reserves}$$” |
| Project future case outstanding at each later age by multiplying the prior age's case outstanding by the selected ratio of case outstanding… | procedure | tagged | Case Outstanding Development Method: “Friedland's fuller version works period by period, using two ratios estimated from history: **paid …” |
| Project future incremental paid claims in each period by multiplying the prior age's case outstanding by the selected ratio of incremental … | procedure | tagged | Case Outstanding Development Method: “Friedland's fuller version works period by period, using two ratios estimated from history: **paid …” |
| Unpaid claims under the case outstanding development technique equal the sum of projected future incremental paid claims only; amounts alre… | fact | tagged | Case Outstanding Development Method: “$f_{\text{case}}$ converts the current case balance into *all* remaining payments — including payme…” |
| The case outstanding development technique projects development only on reported claims, so it is appropriate only when most or all claims … | fact | missing |  |
| A reported claim count development factor to ultimate well above 1.0 (highly leveraged) indicates significant unreported claims (pure IBNR)… | fact | linked | Loss Development (collapsed): “A CDF of $2.27$ means more than half the ultimate estimate is unreported.” |

</details>

<details><summary><code>cas5-2016s-q18</code> · answerable</summary>

Tagged pages: Bornhuetter-Ferguson Method, Insurance Premium, Chain Ladder Method, Trend, Cape Cod Method, Rate Level Change, Loss Trend

| Item | Kind | Status | Where |
|---|---|---|---|
| Both the Bornhuetter-Ferguson and Cape Cod methods estimate ultimate claims as reported (or paid) claims to date plus expected ultimate cla… | formula | tagged | Bornhuetter-Ferguson Method: “$$\text{IBNR} = \left(1 - \tfrac{1}{\text{CDF}}\right) \times \text{ELR} \times \text{EP}$$” |
| Both BF and Cape Cod are credibility-weighted blends of the development (chain ladder) technique and the expected claims technique, with we… | fact | tagged | Bornhuetter-Ferguson Method: “BF is a **credibility weighting** in disguise: it equals $Z \, U_{\text{CL}} + (1-Z)\,U_0$ with $Z …” |
| In the Cape Cod method the ELR is calculated from the historical data as total reported claims divided by total used-up on-level premium (o… | procedure | tagged | Bornhuetter-Ferguson Method: “Where no reliable external ELR exists, the [[Cape Cod Method\\|Cape Cod]] technique derives one from…” |
| Because the Cape Cod ELR is computed from the experience directly, it responds automatically to a changing claims environment (if recent ye… | fact | tagged | Bornhuetter-Ferguson Method: “A stale ELR that ignores [[Rate Level Change\\|rate changes]] and [[Loss Trend\\|trend]] produces a s…” |
| Historical claims used to derive the ELR must be adjusted to be comparable to the claims expected in the projected year, e.g. trend for fre… | procedure | tagged | Cape Cod Method: “Premium **must be on level** and losses must be trended to a common cost level before the ELR is co…” |
| Historical earned premium must be adjusted to the premium level of the projected year by on-leveling for past rate changes and trending for… | procedure | tagged | Insurance Premium: “Historical premium was charged at the rates of its time, and [[On-Leveling\\|on-leveling]] restates …” |
| When a one-time event (e.g. court decision) distorts one historical year, BF with an unadjusted ELR is appropriate if it is an anomaly; if … | fact | tagged | Bornhuetter-Ferguson Method: “BF does not respond to bad news. If emergence runs far ahead of the a priori, BF holds most of its …” |

</details>

<details><summary><code>cas5-2016s-q19</code> · answerable</summary>

Tagged pages: Frequency-Severity Method, Line of Business, Development Factor, Reserve Adequacy, Long Tail Lines, Case Adequacy, Claims Coding Changes

| Item | Kind | Status | Where |
|---|---|---|---|
| Frequency-severity techniques are especially useful for long-tailed lines because they avoid the highly leveraged, unreliable development f… | fact | tagged | Frequency-Severity Method: “**Counts and trended severity.** Develop counts, but estimate severity by **trending** a mature yea…” |
| Frequency-severity methods require a clear, consistent definition of claim counts; significant reopened claims make the count definition am… | fact | tagged | Frequency-Severity Method: “The method needs **consistent count definitions** across the whole triangle, and it is sensitive to…” |
| Frequency-severity methods assume a stable mix of claim types, so a recent increase in high-severity claims violates the assumption unless … | fact | tagged | Frequency-Severity Method: “The method needs **consistent count definitions** across the whole triangle, and it is sensitive to…” |
| To handle a shift in severity, adjust the severity selections for affected years (e.g., restate past severities with a new trend, select in… | procedure | tagged | Frequency-Severity Method: “**Counts and trended severity.** Develop counts, but estimate severity by **trending** a mature yea…” |
| Frequency-severity techniques can be based on either paid or reported data, and paid-data methods (such as the disposal rate method using c… | fact | tagged | Case Adequacy: “**Paid data is immune**, so a divergence between paid and reported chain ladder estimates is the co…” |
| Frequency-severity techniques let frequency and severity be selected and trended separately, helping diagnose changes over time and allowin… | fact | tagged | Frequency-Severity Method: “Counts are more **credible** and less inflation-sensitive; severity is where the trend lives. Proje…” |

</details>

<details><summary><code>cas5-2016s-q2</code> · answerable</summary>

Tagged pages: Earned Exposure, Insurance Premium, Written Premium, Calendar Year, Earned Premium, In-Force

| Item | Kind | Status | Where |
|---|---|---|---|
| Written premium for a calendar year is the premium for policies and transactions (new, cancellations, endorsements) whose effective dates f… | definition | tagged | Written Premium: “Written premium is recorded when the policy takes effect, not when it is collected.” |
| Earned premium for a period is the portion of written premium corresponding to the part of the policy term that has expired within that per… | definition | tagged | Earned Premium: “**Earned Premium** is the portion of premium corresponding to coverage the insurer has actually pro…” |
| In-force premium at a date is the full-term annualized premium of all policies in effect on that date, using the characteristics in force t… | definition | tagged | Insurance Premium: “[[In-Force\\|In-force]] premium is the annual premium of policies in force on a given date.” |
| Full-term written premium applies to the policy's whole term (6 or 12 months from effective to expiration dates), so premium for a partial … | procedure | tagged | Earned Premium: “$$\text{EP for one policy} = \text{Full premium} \times \frac{\text{days elapsed}}{\text{policy ter…” |
| A mid-term cancellation (pro rata) is recorded as negative written premium for the unexpired portion, and only the premium for the expired … | procedure | tagged | Written Premium: “Written premium may still change after issuance — endorsements, cancellations and [[Premium Audit\\|…” |
| A mid-term change such as a territory relocation is treated as canceling the remaining term at the old premium and rewriting it at the new … | procedure | tagged | In-Force: “After a mid-term change, in-force premium is the full-term premium applicable on the date.” |
| Earned exposure is the exposure units (e.g., car-years, where a 12-month policy is 1.0 car-year) for the portion of the policy term expired… | definition | tagged | Earned Exposure: “A $12$-month policy contributes **one** earned car-year in total, spread pro rata over its term: wr…” |

</details>

<details><summary><code>cas5-2016s-q20</code> · gap</summary>

Tagged pages: Berquist-Sherman Method, Development Factor, Accident Year, Calendar Year, Settlement Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| In the Berquist-Sherman paid claim adjustment, adjust cumulative closed claim counts by multiplying each accident year's estimated ultimate… | procedure | tagged | Berquist-Sherman Method: “Compute **disposal rates** — closed claims ÷ ultimate (or reported) claims — at each accident year …” |
| The Berquist-Sherman paid adjustment models the relationship between cumulative paid claims Y and cumulative closed claim counts X with an … | definition | missing |  |
| Restate historical cumulative paid claims by plugging the adjusted closed claim count into the fitted exponential curve, using the paramete… | procedure | tagged | Berquist-Sherman Method: “For each historical cell, interpolate the paid losses that *would* have been paid had that year clo…” |
| The latest calendar-year diagonal of the paid claim triangle is not adjusted in the Berquist-Sherman method; the adjusted values on that di… | fact | tagged | Berquist-Sherman Method: “Berquist-Sherman does not fix the diagonal itself. Strengthened reserves are on the books and belon…” |
| A volume-weighted all-year age-to-age factor is the sum of the later-age values divided by the sum of the earlier-age values over all accid… | formula | linked | Development Triangle: “$$f_{k \to k+1} = \frac{\sum_{\text{AY}} C_{\text{AY},\,k+1}}{\sum_{\text{AY}} C_{\text{AY},\,k}}$$” |
| Estimate ultimate claims for an accident year by multiplying its latest diagonal value (here the unadjusted paid claims) by the age-to-ulti… | procedure | linked | Chain Ladder Method: “$$U_{\text{AY}} = C_{\text{AY},\,n} \times \text{CDF}_{n \to \text{ult}}$$” |

</details>

<details><summary><code>cas5-2016s-q21</code> · answerable</summary>

Tagged pages: Berquist-Sherman Method, Cumulative Development Factor, Claim Count Triangle, Reserve Adequacy, Data Diagnostic Analysis, Case Adequacy

| Item | Kind | Status | Where |
|---|---|---|---|
| The paid-to-reported (case-incurred) claims ratio is cumulative paid claims divided by cumulative reported claims at each maturity; it is a… | definition | syllabus | Loss Development (collapsed): “$$\text{Paid-to-reported ratio} = \frac{\$6{,}300{,}000}{\$9{,}000{,}000} = 0.70$$” |
| Average case outstanding equals (cumulative reported claims minus cumulative paid claims) divided by open claim counts at the same maturity. | formula | tagged | Data Diagnostic Analysis: “$$\bar O_{w,d} = \frac{L^{\text{rep}}_{w,d} - L^{\text{paid}}_{w,d}}{N^{\text{open}}_{w,d}}$$” |
| A paid-to-reported ratio that declines down a column (for later accident years at the same age) and a rising average case outstanding on th… | fact | tagged | Data Diagnostic Analysis: “**[[Case Adequacy\\|Case strengthening]]:** average case outstanding rises faster than trend on the …” |
| A strengthening of case reserve adequacy distorts reported (case incurred) development, overstating loss development factors and ultimate c… | fact | tagged | Case Adequacy: “Applying historical factors — built under weaker reserving — to a strengthened diagonal **over-stat…” |
| The Berquist-Sherman case outstanding adjustment restates historical diagonals' case outstanding to the current level of case reserve adequ… | procedure | tagged | Berquist-Sherman Method: “**Berquist-Sherman Method** restates a historical [[Development Triangle\\|triangle]] so that every …” |
| The expected claims technique (and paid development, when settlement rates are stable) is not affected by changes in case reserve adequacy,… | fact | tagged | Case Adequacy: “**Paid data is immune**, so a divergence between paid and reported chain ladder estimates is the co…” |

</details>

<details><summary><code>cas5-2016s-q22</code> · answerable</summary>

Tagged pages: Accident Year, Development Factor, Calendar Year, Loss Development, Unallocated Loss Adjustment Expenses ULAE, Allocated Loss Adjustment Expense

| Item | Kind | Status | Where |
|---|---|---|---|
| When a calendar-year change in the claims process distorts the latest diagonal, do not relate unpaid to paid-to-date; use a method such as … | procedure | linked | Bornhuetter-Ferguson Method: “The chain ladder instead scales the whole diagonal, so a distorted diagonal is multiplied by the fu…” |
| Bornhuetter-Ferguson unpaid = (1 - 1/CDF) × expected ultimate, where CDF is the age-to-ultimate development factor. | formula | linked | Bornhuetter-Ferguson Method: “\text{IBNR} = \left(1 - \tfrac{1}{\text{CDF}}\right) \times \text{ELR} \times \text{EP}” |
| Age-to-ultimate factors are obtained by multiplying age-to-age factors selected from steady-state (pre-change) years, from the tail back to… | procedure | tagged | Loss Development: “\text{CDF}_{n \to \text{ult}} = \prod_{k \ge n} f_{k \to k+1} \times \text{Tail}” |
| Expected ALAE or ULAE must be restated to reflect a known expense change (e.g. a 50% decline in ALAE), and historical ratios that predate t… | procedure | tagged | Unallocated Loss Adjustment Expenses ULAE (collapsed): “Selecting the three-year average of $6.6\%$ would understate the cost of running off the remaining …” |
| The classical technique for unpaid ULAE assumes ULAE is 50% incurred when a claim is opened/reported and 50% when it is closed, and applies… | definition | tagged | Unallocated Loss Adjustment Expenses ULAE: “If ULAE is assumed to be spent half at reporting and half at settlement, only $50\%$ remains on rep…” |
| Unpaid ULAE (classical) = ULAE-to-paid-claims ratio × [50% × case outstanding + IBNR]. | formula | tagged | Unallocated Loss Adjustment Expenses ULAE: “\text{ULAE Reserve} = R \times \left(0.5 \times \text{Case} + 1.0 \times \text{IBNR}\right)” |
| If ULAE shifts to being incurred later in a claim's life (e.g. in-house legal costs after reporting), the 50/50 assumption fails and the cl… | fact | tagged | Unallocated Loss Adjustment Expenses ULAE: “If ULAE is assumed to be spent half at reporting and half at settlement, only $50\%$ remains on rep…” |
| The Kittel method adjusts the ULAE ratio by using reported (incurred) losses alongside paid, but keeps the same reported/settled split assu… | fact | tagged | Unallocated Loss Adjustment Expenses ULAE: “Kittel divides by the **average of paid and incurred** loss instead:” |

</details>

<details><summary><code>cas5-2016s-q23</code> · gap</summary>

Tagged pages: Allocated Loss Adjustment Expense, Mix of Business, Development Factor, Accident Year

| Item | Kind | Status | Where |
|---|---|---|---|
| In the paid ALAE-to-paid claims development technique, compute the ratio of cumulative paid ALAE to cumulative paid claims for each acciden… | procedure | missing |  |
| Develop paid claims to ultimate by selecting age-to-age factors from the triangle (e.g., averages of observed link ratios) and multiplying … | procedure | linked | Chain Ladder Method: “**The procedure:** build the cumulative [[Development Triangle\\|triangle]] → compute [[Age to Age F…” |
| Ultimate ALAE equals ultimate claims times the ultimate ALAE-to-claims ratio, and unpaid ALAE equals ultimate ALAE minus paid ALAE to date,… | formula | tagged | Allocated Loss Adjustment Expense: “or develop a **ratio of ALAE to loss** and apply it to projected losses.” |
| When there is no development beyond the last observed age, the tail factor is 1.00 and the latest ratio/claims are treated as ultimate for … | fact | syllabus | Tail Factor: “A tail of exactly $1.000$ is itself an assumption — that development is complete — and it is the wr…” |
| Advantage of the paid ALAE-to-paid claims method: it uses the inherent relationship between ALAE and claims, and its ratio development is l… | fact | missing |  |
| Disadvantage of the paid ALAE-to-paid claims method under a change in business mix: the historical ALAE-to-claims ratio may no longer apply… | fact | tagged | Mix of Business: “In **reserving**, a mix shift breaks the [[Homogeneity\\|homogeneity]] assumption behind the [[Devel…” |

</details>

<details><summary><code>cas5-2016s-q24</code> · answerable</summary>

Tagged pages: Actual vs Expected Analysis, Development Factor, Unpaid Claims, Chain Ladder Method, Bornhuetter-Ferguson Method, Expected Loss Method

| Item | Kind | Status | Where |
|---|---|---|---|
| Age-to-age (link ratio) factors are computed as the ratio of cumulative reported claims at one maturity to those at the prior maturity for … | formula | linked | Age to Age Factor: “$$f_{n \to n+1}^{\text{AY}} = \frac{C_{\text{AY},\,n+1}}{C_{\text{AY},\,n}}$$” |
| Age-to-ultimate factors are obtained by cumulating the selected age-to-age factors from the latest age to ultimate, using a tail factor (1.… | procedure | linked | Cumulative Development Factor: “The reciprocal is the **percentage reported** (or paid): $p_n = 1/\text{CDF}_n$, and $1 - p_n$ is t…” |
| IBNR (unreported claims) for an accident year equals the selected ultimate claims minus claims reported to date. | definition | tagged | Expected Loss Method: “$$\text{IBNR} = U - \text{Reported}$$” |
| Expected emergence in the next calendar period equals the current IBNR times (percent reported at the end of the period minus percent repor… | formula | tagged | Actual vs Expected Analysis: “$$\text{Expected emergence} = U_{\text{prior}} \times \left(\frac{1}{\text{CDF}_{n+1}} - \frac{1}{\…” |
| Actual emergence in a calendar year is the change in reported claims over the year (latest diagonal minus prior diagonal) and is compared w… | procedure | tagged | Actual vs Expected Analysis: “$$\text{A/E} = \frac{\text{Actual emergence}}{\text{Expected emergence}}$$” |
| The reported (or paid) development technique relies fully on historical data with no a priori complement, so lower-than-expected actual eme… | fact | tagged | Chain Ladder Method: “This is the strong one: the method takes whatever sits on the diagonal at face value and scales it.” |
| The Bornhuetter-Ferguson technique, with unreported percentage as weight, projects unpaid claims as expected ultimate times percent unrepor… | fact | tagged | Bornhuetter-Ferguson Method: “$$\text{IBNR} = \left(1 - \tfrac{1}{\text{CDF}}\right) \times \text{ELR} \times \text{EP}$$” |
| The expected claims technique holds ultimate claims at the a priori expected value, so lower-than-expected actual emergence implies higher … | fact | tagged | Expected Loss Method: “The $\$50{,}000$ reported is used only to split the estimate between reported and IBNR — it plays n…” |

</details>

<details><summary><code>cas5-2016s-q25</code> · answerable</summary>

Tagged pages: Loss Development, Reserve Adequacy, Accident Year, Settlement Rate, Changing Conditions, Bornhuetter-Ferguson Method, Chain Ladder Method

| Item | Kind | Status | Where |
|---|---|---|---|
| A large paid or reported claim at an early maturity inflates the paid or reported development (chain ladder) estimate because historical LD… | fact | tagged | Bornhuetter-Ferguson Method: “The chain ladder instead scales the whole diagonal, so a distorted diagonal is multiplied by the fu…” |
| An increase in case reserve adequacy inflates reported (and case outstanding-based) development estimates, but leaves paid methods unaffect… | fact | tagged | Changing Conditions: “*Case strengthening*: reported development overstates, reported BF and Cape Cod overstate less; pai…” |
| A slowdown in settlement rates makes paid development methods understate ultimate claims (historical LDFs applied to lower paid amounts), w… | fact | tagged | Settlement Rate: “**Slower settlement** does the reverse and understates ultimate from paid data.” |
| When the expected loss ratio is increasing (deteriorating), the expected claims method understates ultimate claims and the BF method, which… | fact | tagged | Changing Conditions: “*Rising claim ratios*: development techniques still work; the [[Expected Loss Method\\|expected clai…” |
| The Bornhuetter-Ferguson method is a credibility-weighted blend of the development method and the expected claims method, giving more stabl… | fact | tagged | Bornhuetter-Ferguson Method: “BF is a **credibility weighting** in disguise: it equals $Z \, U_{\text{CL}} + (1-Z)\,U_0$ with $Z …” |
| Diagnose the cause of differences among reserving method estimates by comparing which methods (paid vs reported, development vs BF vs expec… | procedure | tagged | Changing Conditions: “**Responses:** detect the change (interview plus [[Data Diagnostic Analysis\\|diagnostics]] — averag…” |

</details>

<details><summary><code>cas5-2016s-q3</code> · answerable</summary>

Tagged pages: Exposure Base, Adverse Selection, Credibility, Homogeneity, Classification Ratemaking

| Item | Kind | Status | Where |
|---|---|---|---|
| The three criteria of a good exposure base are that it is proportional to expected loss, practical, and has historical precedence. | definition | tagged | Exposure Base: “**Proportional to expected loss.** All else equal, a policy with two exposures should have twice th…” |
| An exposure base is proportional to expected loss when a change in the amount of exposure units corresponds to a proportional change in exp… | fact | tagged | Exposure Base: “All else equal, a policy with two exposures should have twice the expected loss of a similar policy…” |
| An exposure base is practical if it is objectively defined, easy and inexpensive to obtain and verify, and not subject to manipulation (e.g… | fact | tagged | Exposure Base: “Objective, and relatively easy and inexpensive to obtain and verify — which also keeps policyholder…” |
| Historical precedence means the exposure base is consistent with past practice and industry use, so changing it can cause IT/system costs, … | fact | tagged | Exposure Base: “A change of base can cause large premium swings for individual insureds, requires a change in the r…” |
| ASOP 12 lists considerations for evaluating a risk characteristic used in risk classification: relationship to expected outcomes, causality… | definition | tagged | Classification Ratemaking: “ASOP 12 also asks the actuary to comply with applicable law, consider industry and business practic…” |
| To evaluate a proposed risk characteristic under ASOP 12, pick distinct considerations and explain how the characteristic does or does not … | procedure | tagged | Classification Ratemaking: “Once risk characteristics are chosen, the actuary forming the classes weighs three considerations, …” |

</details>

<details><summary><code>cas5-2016s-q4</code> · answerable</summary>

Tagged pages: Incurred Losses, Calendar Year, Policy Year, Ratemaking Data Organization, Accident Year

| Item | Kind | Status | Where |
|---|---|---|---|
| Case incurred loss equals loss payments plus the change in case reserves (i.e., paid loss plus change in outstanding case reserve). | definition | tagged | Calendar Year: “$$\text{CY Reported Losses} = \text{Paid} + \Delta\text{Case Reserves}$$” |
| Calendar year losses are aggregated by summing all loss payments and case reserve changes with transaction dates falling within that calend… | procedure | tagged | Calendar Year: “groups every transaction by the calendar year in which it is *booked* — premium as it is earned, lo…” |
| Policy year losses include all transactions on claims whose policy effective date falls in the policy year, limited to transactions on or b… | procedure | tagged | Policy Year: “groups every premium and loss transaction belonging to policies *incepting* in a given calendar yea…” |
| Accident year losses include all transactions on claims whose accident date falls in the accident year, limited to transactions on or befor… | procedure | tagged | Accident Year: “groups losses by the calendar year in which the loss event *occurred*, and matches them against the…” |
| A loss ratio equals losses divided by premium, and an accident year loss ratio uses the earned premium for the matching year (calendar year… | formula | tagged | Calendar Year: “Accident-year aggregation takes its premium and exposures on the calendar-year basis — Werner & Mod…” |
| Advantage of policy year data: it gives the best match of premium and losses (exposures to losses), and it isolates the effect of changes i… | fact | tagged | Ratemaking Data Organization: “**[[Policy Year]]** — every transaction on policies incepting in the year. The best match of premiu…” |
| Disadvantage of policy year data: it takes the longest to become fully developed and available, so it is the least responsive, and its prem… | fact | tagged | Policy Year: “The price of that match is **time**. With annual policies a PY cohort is not fully written until $1…” |

</details>

<details><summary><code>cas5-2016s-q5</code> · answerable</summary>

Tagged pages: Claims Made Coverage, Ultimate Loss, Interest Rate, Settlement Rate, Occurrence Coverage

| Item | Kind | Status | Where |
|---|---|---|---|
| A claims-made policy covers claims that are reported during the policy period (and occur on or after the retroactive date), regardless of w… | definition | tagged | Claims Made Coverage: “**Claims-Made Coverage** is a policy trigger under which the policy responds to claims *reported* d…” |
| An occurrence policy covers losses that occur (accident date) during the policy period, regardless of when they are reported. | definition | tagged | Occurrence Coverage: “**Occurrence Coverage** is a policy trigger under which the policy responds to losses that *occur* …” |
| Tail coverage (extended reporting endorsement) covers claims reported after a claims-made policy ends for accidents that occurred during th… | definition | tagged | Claims Made Coverage: “An **extended reporting endorsement** (ERP, or "tail coverage") covers claims that occurred during …” |
| To assign claims to insurers when switching from claims-made to occurrence, allocate each claim to the claims-made insurer if reported in i… | procedure | tagged | Claims Made Coverage: “$$\text{Covered if } \; \text{accident date} \ge \text{retro date} \; \text{ and } \; \text{report …” |
| Occurrence policy ultimate losses are more volatile than claims-made because occurrence policies have a report lag (pure IBNR) plus settlem… | fact | tagged | Claims Made Coverage: “Because the trigger is the report date, a claims-made policy has **no pure IBNR** — only IBNER on c…” |
| Unexpected changes in loss trend or reporting/settlement patterns affect occurrence policy estimates more than claims-made estimates becaus… | fact | tagged | Claims Made Coverage: “If there is a sudden, unpredictable change in the underlying trends, the claims-made policy priced …” |
| Occurrence policies earn more investment income than claims-made policies because the longer lag between premium receipt and loss payment (… | fact | tagged | Claims Made Coverage: “The investment income earned from claims-made policies is substantially less than under occurrence …” |
| Report lag is the time from claim occurrence to when it is reported; settlement lag is the time from report to claim closure. | definition | linked | Report Year: “$$\text{Report lag} = \text{Report date} - \text{Accident date}$$” |

</details>

<details><summary><code>cas5-2016s-q6</code> · answerable</summary>

Tagged pages: Overall Rate Level Indication, Profit and Contingency Provision, Complement of Credibility, Full Credibility Standard, Pure Premium Method, Loss Ratio Method

| Item | Kind | Status | Where |
|---|---|---|---|
| Square root rule for partial credibility: Z = sqrt(number of claims / claims required for full credibility), capped at 1. | formula | linked | Limited Fluctuation Credibility: “Partial credibility uses the **square root rule**: $Z = \sqrt{n/n_{\text{full}}}$ when $n < n_{\tex…” |
| Credibility-weighted estimate = Z × (state indication) + (1 − Z) × (complement of credibility), where the complement for a state's rate cha… | formula | tagged | Complement of Credibility: “$$\text{Estimate} = Z \times \text{Experience} + (1 - Z) \times \text{Complement}$$” |
| Loss ratio method indicated rate change with all-variable expenses = (loss and ALAE ratio) / (1 − variable expense ratio − profit provision… | formula | tagged | Loss Ratio Method: “$$\text{Indicated Change} = \frac{\text{Projected Loss Ratio}}{\text{PLR}} - 1 \quad \text{(all-var…” |
| Loss ratio method indicated rate change with fixed expenses = (loss and ALAE ratio + fixed expense ratio) / (1 − variable expense ratio − p… | formula | tagged | Overall Rate Level Indication: “$$\text{Indicated Change} = \frac{\text{Projected Loss \& LAE Ratio} + F\%}{1 - V - Q_T} - 1$$” |
| The target profit and contingency provision is a choice made by the insurer (or constrained by regulation); a negative provision may be use… | fact | tagged | Profit and Contingency Provision: “[[Long Tail Lines\\|Long-tail lines]] hold reserves for years and earn substantial investment income…” |
| The pure premium method is preferable to the loss ratio method for new business with no existing rates, since there is no premium to on-lev… | fact | tagged | Pure Premium Method: “The method produces an **absolute rate**, which is why it is the only choice for a **new** line or …” |
| The pure premium method is preferable when new rating variables are introduced that are not in the historical data, because premium cannot … | fact | tagged | Loss Ratio Method: “Its requirement is premium at current rate level, which is hard to calculate accurately after many …” |

</details>

<details><summary><code>cas5-2016s-q7</code> · gap</summary>

Tagged pages: Expense Provisions, Underwriting Profit, Fixed Expenses, Variable Expenses, Expense Ratio, Non-Pricing Solutions

| Item | Kind | Status | Where |
|---|---|---|---|
| Under the premium-based projection method with fixed and variable expenses, the indicated average rate = (pure premium including LAE + fixe… | formula | tagged | Expense Provisions: “$$\text{Rate} = \frac{\text{Pure Premium} + \text{Fixed Expense per Exposure}}{1 - V - Q_T}$$” |
| Split each selected expense ratio into fixed and variable portions by multiplying it by the % fixed and (1 - % fixed), then sum fixed porti… | procedure | tagged | Expense Provisions (collapsed): “$$V = 15.0\% + 2.5\% + (6.0\% \times 0.25) + (4.0\% \times 0.50)$$” |
| Convert a fixed expense ratio (a percentage of premium) to a fixed dollar expense per exposure by multiplying it by the projected average p… | procedure | tagged | Fixed Expenses: “The fixed dollars are then put per exposure either by multiplying the fixed expense ratio by the pr…” |
| Select each expense ratio based on its trend: if ratios show a consistent trend, select the most recent year to remain responsive; if there… | procedure | missing |  |
| Selections should be made on each expense category's total ratio before splitting into fixed and variable, so that volatility in one compon… | fact | missing |  |
| Fundamental insurance equation: premium = losses and LAE + expenses + underwriting profit, so a target profit without a rate change require… | fact | tagged | Underwriting Profit: “$$\text{UW Profit} = \text{EP} - \text{Losses} - \text{LAE} - \text{UW Expenses}$$” |

</details>

<details><summary><code>cas5-2016s-q8</code> · answerable</summary>

Tagged pages: Overall Rate Level Indication, Trend, Rate Change, Accident Year, Parallelogram Method, Premium Trend, Catastrophe Loss

| Item | Kind | Status | Where |
|---|---|---|---|
| Compute on-level factors with the parallelogram method: determine the fraction of each year's earned premium written at each rate level (gi… | procedure | tagged | Parallelogram Method: “$$\text{OLF}_Y = \frac{I_{\text{current}}}{\sum_k A_{Y,k}\, I_k}$$” |
| With semi-annual policies, a rate change takes six months to be fully earned in, so the parallelogram uses a 6-month policy term rather tha… | fact | tagged | Parallelogram Method (collapsed): “With a six-month term the diagonal runs from $4/1$ at the bottom of the square to $10/1$ at the top.” |
| Trend premium (and losses) from each experience period's average written/earned/accident date to the average date for the future period whe… | procedure | tagged | Trend: “The trend period runs from the average date of historical losses (midpoint of the accident year) to…” |
| Combine frequency and severity trends multiplicatively, (1 + frequency trend)(1 + severity trend), to obtain the loss trend (pure premium t… | formula | linked | Loss Trend: “$$1 + t_{PP} = (1 + t_{\text{freq}})(1 + t_{\text{sev}})$$” |
| Develop losses with the chain-ladder method: select age-to-age factors from the triangle (e.g. averages of observed link ratios), multiply … | procedure | linked | Loss Development: “$$\text{CDF}_{n \to \text{ult}} = \prod_{k \ge n} f_{k \to k+1} \times \text{Tail}$$” |
| Handle catastrophes separately: remove catastrophe losses from the development and trend analysis, then add a projected catastrophe load, c… | procedure | tagged | Catastrophe Loss: “Catastrophe losses are … from the experience period and replaced with a long-run expected load.” |
| Loss ratio indicated rate change = [(loss & ALAE ratio × (1 + ULAE provision)) + fixed expense ratio] / (1 − variable expense ratio − profi… | formula | tagged | Overall Rate Level Indication: “$$\text{Indicated Change} = \frac{\text{Projected Loss \& LAE Ratio} + F\%}{1 - V - Q_T} - 1$$” |
| Under full credibility, the indication is based entirely on the experience-period loss ratio, with no complement of credibility. | fact | linked | Complement of Credibility: “$$\text{Estimate} = Z \times \text{Experience} + (1 - Z) \times \text{Complement}$$” |

</details>

<details><summary><code>cas5-2016s-q9</code> · answerable</summary>

Tagged pages: Deductible, Insurance Premium, Large Deductible Policy, Deductible Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| The loss elimination ratio (LER) at a given deductible or loss limit is the fraction of ground-up losses that fall below that amount (elimi… | definition | tagged | Large Deductible Policy: “$E[X]$ is expected ground-up loss, $\text{LER}(d)$ the [[Loss Elimination Ratio\\|loss elimination r…” |
| To split expected ground-up losses for a large deductible policy, select the LER and excess ratio at the deductible amount and multiply the… | procedure | tagged | Large Deductible Policy: “$$\text{Excess Losses} = E[X] \times \big(1 - \text{LER}(d)\big)$$” |
| When the deductible applies to loss only and not to ALAE, the insurer bears the full ALAE (a percentage of total ground-up losses), so all … | fact | tagged | Large Deductible Policy (collapsed): “ALAE is $9\%$ of ground-up losses and is not reduced by the deductible.” |
| Large deductible premium = (excess losses + ALAE + fixed expenses + risk margin + cost of processing losses below deductible + credit risk … | formula | tagged | Large Deductible Policy: “$$\text{Premium} = \frac{\text{Excess Losses} + \text{ALAE} + F + \text{CR} + \text{RM}}{1 - V - Q}…” |
| Variable expenses and the underwriting profit provision are expressed as percentages of premium, so they go in the denominator as (1 − V − … | fact | tagged | Large Deductible Policy: “$$\text{Premium} = \frac{\text{Excess Losses} + \text{ALAE} + F + \text{CR} + \text{RM}}{1 - V - Q}…” |

</details>

<details><summary><code>cas5-2017-q1</code> · gap</summary>

Tagged pages: Earned Exposure, Exposure Base, Calendar Year

| Item | Kind | Status | Where |
|---|---|---|---|
| Written exposures for a calendar year are the exposures of all policies written (effective) in that year, counted for the full policy term … | definition | tagged | Earned Exposure: “A $12$-month policy contributes **one** earned car-year in total, spread pro rata over its term: wr…” |
| Earned exposures for a calendar year are the portion of policy exposure that has expired (been in force) during that year, recognized pro r… | definition | tagged | Earned Exposure: “**Earned Exposure** is the portion of written exposure for which coverage has actually been provide…” |
| A policy with a term longer than one year carries one exposure unit per year of term (e.g., a two-year policy counts as two exposures). | fact | missing |  |
| Compute a policy's earned exposures in a calendar year as its total exposure times the fraction of its term (months in force) that falls wi… | procedure | tagged | Earned Exposure: “A $12$-month policy contributes **one** earned car-year in total, spread pro rata over its term: wr…” |
| Over the life of a policy, total earned exposures across calendar years equal the written exposures, so earned amounts in successive years … | fact | tagged | Earned Exposure: “A $12$-month policy contributes **one** earned car-year in total, spread pro rata over its term: wr…” |

</details>

<details><summary><code>cas5-2017-q10</code> · untagged</summary>

Tagged pages: Pure Premium Method, Territory Ratemaking, Fixed Expenses, Underwriting Profit, Rating Algorithm

| Item | Kind | Status | Where |
|---|---|---|---|
| Premium under a rating algorithm equals base rate times the territory factor, plus any additive policy fee added last, multiplied by exposu… | procedure | tagged | Rating Algorithm: “$$\text{Premium} = \left[\text{Base Rate} \times \prod_i R_i + \sum_j A_j\right] \times (1 - D) + \…” |
| Underwriting profit equals premium minus loss and LAE, minus fixed expenses, minus variable expenses. | formula | tagged | Underwriting Profit: “$$\text{UW Profit} = \text{EP} - \text{Losses} - \text{LAE} - \text{UW Expenses}$$” |
| LAE provided as a percentage of loss cost is a load applied to loss (loss times one plus the LAE percentage), and loss costs per exposure a… | fact | syllabus | Pure Premium: “$$\text{Pure Premium} = \frac{\text{Losses} + \text{LAE}}{\text{Earned Exposures}}$$” |
| Fixed expense is a per-exposure cost, distinct from a policy fee, which is a premium component; the variable expense ratio applies to total… | fact | tagged | Fixed Expenses: “They cost roughly the same on a $\$500$ policy as on a $\$5{,}000$ one, so they are recovered as a …” |
| The indicated policy fee equals fixed expense per exposure divided by (1 minus variable expense ratio minus profit provision). | formula | tagged | Pure Premium Method: “$$\text{Indicated Rate} = \frac{\text{Pure Premium} + F}{1 - V - Q_T}$$” |
| Indicated territory relativities are each territory's loss cost per exposure divided by the base territory's loss cost per exposure, with t… | procedure | tagged | Territory Ratemaking: “$$\text{Territory Relativity}_i = \frac{\text{Pure Premium}_i}{\text{Pure Premium}_{\text{base}}}$$” |
| The indicated base rate equals the base territory's loss cost times (1 plus LAE load) divided by (1 minus variable expense ratio minus prof… | formula | tagged | Pure Premium Method: “$$\text{Indicated Rate} = \frac{\text{Pure Premium} + F}{1 - V - Q_T}$$” |
| Changing only the base rate leaves inaccurate territory relativities and policy fee in place, so underpriced classes remain subsidized by o… | fact | elsewhere | Territorial Rating: “**Flattening a territory differential** has the effect Werner & Modlin describe for any rating vari…” |

</details>

<details><summary><code>cas5-2017-q11</code> · gap</summary>

Tagged pages: Coinsurance Rating, Coinsurance Percentage, Increased Limits, Adverse Selection, Limited Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The homeowners rate per $1,000 of coverage equals expected frequency times expected severity limited to the amount of insurance (pure premi… | formula | missing |  |
| To find expected severity at an amount of insurance below the home's value, cap each loss band's average at the amount of insurance and wei… | procedure | tagged | Limited Expected Value: “It equals the expected value of $\min(X, u)$.” |
| The rate per $1,000 of coverage decreases as the amount of insurance increases, because the lower layers of coverage are the most likely to… | fact | tagged | Increased Limits (collapsed): “Each successive layer is cheaper per dollar of limit — which is exactly the consistency property.” |
| Underinsurance harms the insured, who retains losses above the limit and bears coinsurance penalties on partial losses, and harms the insur… | fact | tagged | Coinsurance Rating: “Fall short and every partial loss is settled at the ratio of insurance carried to insurance require…” |
| The coinsurance apportionment ratio is the lesser of 1 and the amount of insurance divided by the product of the coinsurance percentage and… | formula | tagged | Coinsurance Percentage: “$$a = \min\!\left(\frac{F}{cV},\ 1.0\right)$$” |
| The indemnity payment is the lesser of the amount of insurance and the apportionment ratio times the loss (with no deductible). | formula | tagged | Coinsurance Percentage: “$$I = L \times \frac{F}{cV}, \quad \text{where } I \le F \text{ and } I \le L$$” |
| The coinsurance penalty is the amount that would have been paid without the coinsurance provision (the loss capped at the amount of insuran… | definition | tagged | Coinsurance Rating (collapsed): “The insured absorbs $\$50{,}000$ — a penalty for under-insurance, not a deductible.” |

</details>

<details><summary><code>cas5-2017-q12</code> · answerable</summary>

Tagged pages: Experience Rating, Schedule Rating, Credibility, Allocated Loss Adjustment Expense, Commercial Lines Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| The experience rating modification factor equals 1 + Z × (AER − EER)/EER, where AER is the actual experience ratio, EER is the expected exp… | formula | tagged | Experience Rating: “$M = Z \times \frac{A}{E} + (1 - Z)$” |
| Expected unreported basic limit loss and ALAE equals company subject basic limit loss and ALAE times the expected experience ratio times th… | formula | tagged | Experience Rating: “For each experience year and sub-line, the expected future development is that row's company subjec…” |
| The actual experience ratio equals the risk's reported basic limit loss and ALAE plus expected unreported loss and ALAE, divided by company… | formula | tagged | Experience Rating: “The actual experience ratio is built from the loss history and the expected future development.” |
| Experience rating uses losses limited to basic limits and the maximum single limit per occurrence, not unlimited reported losses. | fact | tagged | Experience Rating: “For each experience year and sub-line, the loss history is the incurred loss excluding ALAE capped …” |
| Schedule rating applies to individual risk characteristics expected to materially affect future losses but not yet reflected in the histori… | fact | tagged | Schedule Rating: “If a risk has made a recent change that will likely impact its loss experience, then it is appropri…” |

</details>

<details><summary><code>cas5-2017-q13</code> · gap</summary>

Tagged pages: Overall Rate Level Indication, On Level Premium, Loss Development, Large Loss, Parallelogram Method, Extraordinary Losses, Premium Trend

| Item | Kind | Status | Where |
|---|---|---|---|
| Compute age-to-age development factors as ratios of reported loss at successive maturities from a loss triangle, and select a factor for ea… | procedure | missing |  |
| Obtain cumulative development factors by multiplying the selected age-to-age factors from a given maturity through the tail factor, then mu… | procedure | linked | Cumulative Development Factor: “CDFs are built **backwards from the tail**: start with the tail factor, multiply in each successive…” |
| Determine the trend period for each experience year as the time from its average accident (or earned) date to the average accident (or earn… | procedure | tagged | Premium Trend: “The trend period $n$ runs from the average written date of the policies earning premium in the expe…” |
| Use the parallelogram method to find the average rate level for each experience year (areas of the policy-writing parallelogram at each rat… | procedure | tagged | Parallelogram Method: “$$\text{OLF}_Y = \frac{I_{\text{current}}}{\sum_k A_{Y,k}\, I_k}$$” |
| Apply annual premium trend to on-level earned premium over the trend period, and apply loss trend compounded over the trend period to ultim… | procedure | tagged | Premium Trend: “$$\text{Premium Trend Factor} = (1 + t_P)^{n}$$” |
| When losses are capped at a basic limit, build an excess loss factor as 1 plus the ratio of long-term historical excess losses to capped lo… | procedure | tagged | Extraordinary Losses: “$$\text{ELF} = 1 + \frac{\sum \text{Excess losses}}{\sum \text{Non-excess losses}}$$” |
| Loss ratio indicated rate change = (trended loss & LAE ratio including ULAE + fixed expense ratio) / (1 − variable expense ratio − profit a… | formula | tagged | Overall Rate Level Indication: “$$\text{Indicated Change} = \frac{\text{Projected Loss \& LAE Ratio} + F\%}{1 - V - Q_T} - 1$$” |
| An insurer may not take the full indicated rate change because of marketplace/competitive considerations, regulatory constraints, or custom… | fact | linked | Rate Change: “The **selected** change may differ for reasons that are legitimate and must be documented: [[Credib…” |

</details>

<details><summary><code>cas5-2017-q14</code> · answerable</summary>

Tagged pages: IBNR, Report Year, Accident Year, Loss Development, Tail Factor

| Item | Kind | Status | Where |
|---|---|---|---|
| Total IBNR equals IBNER plus IBNYR, so IBNYR equals total IBNR minus IBNER. | fact | tagged | IBNR: “\text{IBNR} = \underbrace{\text{Pure IBNR}}_{\text{unreported claims}} + \underbrace{\text{IBNER}}_…” |
| An accident year triangle groups claims by occurrence date, so developing it to ultimate captures both development on known claims and late… | fact | tagged | Accident Year: “An AY cohort is **not final** at year end: losses still develop as claims are reported and case res…” |
| A report year triangle groups claims by report date, so no new claims enter a closed report year; developing it to ultimate captures only d… | fact | tagged | IBNR: “**A claims-made book has no pure IBNR** by construction — every claim in a [[Report Year\\|report ye…” |
| Compute age-to-age factors from a cumulative triangle as ratios of successive cumulative values, select a factor for each age, and multiply… | procedure | linked | Chain Ladder Method: “**The procedure:** build the cumulative [[Development Triangle\\|triangle]] → compute [[Age to Age F…” |
| Ultimate claims for each year equal reported-to-date claims times the cumulative development factor to ultimate. | formula | tagged | Loss Development: “\text{Ultimate Losses} = \text{Losses at age } n \times \text{CDF}_{n \to \text{ult}}” |
| Apply a tail factor only to a triangle that is still developing past the last observed age; a report year triangle with no claims reported … | fact | tagged | Report Year: “A report year **closes to new claims** at year end — pure [[IBNR]] is zero by construction, since e…” |
| Frequency-severity alternative: project cumulative claim counts to ultimate, subtract reported counts to get pure IBNR counts, and multiply… | procedure | tagged | IBNR: “Splitting the two requires a [[Claim Count Triangle\\|claim count triangle]]: develop counts to ulti…” |

</details>

<details><summary><code>cas5-2017-q15</code> · answerable</summary>

Tagged pages: Case Adequacy, Settlement Rate, Case Reserves, Claim Count Triangle, Data Diagnostic Analysis

| Item | Kind | Status | Where |
|---|---|---|---|
| Diagnostic triangles are interpreted by reading down the columns, comparing the same maturity across accident years, not across rows, since… | procedure | tagged | Data Diagnostic Analysis: “Reading **down a column** compares years at the same age, which shows trends and mix.” |
| The paid to reported claim ratio at each age is cumulative paid claims divided by cumulative reported claims (equivalently paid/(paid + cas… | formula | linked | Berquist-Sherman Method (collapsed): “Paid ÷ reported losses” |
| A rising paid-to-reported ratio down a column can result from faster settlement of claims, weaker case reserve adequacy, or both, so this r… | fact | tagged | Data Diagnostic Analysis: “**Faster [[Settlement Rate\\|settlement]]:** closure rates and paid-to-reported rise together.” |
| Closed claim counts are obtained as cumulative reported claim counts less open claim counts, and the closed to reported count ratio is clos… | procedure | tagged | Claim Count Triangle: “The [[Settlement Rate\\|disposal rate]] is closed counts over ultimate (or reported) counts.” |
| A rising closed-to-reported count ratio down a column indicates claims are being settled faster, i.e., an increase in settlement rates. | fact | tagged | Data Diagnostic Analysis: “**Faster [[Settlement Rate\\|settlement]]:** closure rates and paid-to-reported rise together.” |
| Average case outstanding equals (cumulative reported claims minus cumulative paid claims) divided by open claim count. | formula | tagged | Case Adequacy: “$$\text{Avg Case Outstanding} = \frac{\text{Case Reserves}}{\text{Open Claim Counts}}$$” |
| With no claim cost inflation, average case outstanding is unaffected by closure speed, so a flat pattern down a column indicates unchanged … | fact | tagged | Case Adequacy: “**The diagnostic is average case outstanding per open claim**, compared *down each column* of the t…” |

</details>

<details><summary><code>cas5-2017-q16</code> · gap</summary>

Tagged pages: Frequency-Severity Method, On Level Premium, Frequency, Severity, Loss Trend

| Item | Kind | Status | Where |
|---|---|---|---|
| Put historical earned premium on the current rate level by multiplying each year's earned premium by its premium on-level adjustment factor… | procedure | tagged | On Level Premium: “$$\text{On-Level Premium} = \text{Historical EP} \times \text{On-Level Factor}$$” |
| Trend historical ultimate claim counts to a common target year by applying the annual claim count trend compounded for the number of years … | procedure | tagged | Loss Trend: “$t$ is the selected annual trend and $n$ the **trend period**, measured from the average date of lo…” |
| Frequency equals trended ultimate claim counts divided by on-level earned premium, which removes the effects of rate changes, count trend a… | formula | missing |  |
| Select a frequency from the historical trended frequencies, excluding or discounting outliers, and apply it to the target year's on-level p… | procedure | tagged | Frequency-Severity Method: “$$U = \text{Exposures} \times \text{Frequency}_{\text{ult}} \times S_{\text{ult}}$$” |
| De-trend a selected frequency (claim count) and a selected severity from the level of one year back to the earlier accident year by dividin… | procedure | missing |  |
| Ultimate claims equal ultimate claim count times ultimate average severity, and IBNR equals ultimate claims minus reported (cumulative) cla… | formula | tagged | Frequency-Severity Method: “$$U = N_{\text{ult}} \times S_{\text{ult}}$$” |
| Frequency-severity methods are useful when frequency and severity move at different rates or when development factors on long-tailed lines … | fact | tagged | Frequency-Severity Method: “The value of the split is **diagnostic**. A dollar triangle tells you losses grew; frequency and se…” |
| Frequency-severity methods are not useful when the claim count definition is inconsistent over time (for example changes in treatment of cl… | fact | tagged | Frequency-Severity Method: “The method needs **consistent count definitions** across the whole triangle, and it is sensitive to…” |

</details>

<details><summary><code>cas5-2017-q17</code> · gap</summary>

Tagged pages: Frequency-Severity Method, Severity Analysis, Claim Count Triangle, Development Factor, Changing Conditions

| Item | Kind | Status | Where |
|---|---|---|---|
| In the frequency-severity technique, develop reported claim counts to ultimate and develop severity (claims divided by counts) to ultimate … | procedure | tagged | Frequency-Severity Method: “Develop the count triangle to ultimate counts; develop an average severity triangle (dollars ÷ coun…” |
| Age-to-age development factors are the ratio of cumulative values at successive maturities for the same accident year; a selected factor is… | formula | tagged | Development Factor: “**Simple average**: unweighted mean of all individual year factors” |
| Average reported severity at a given maturity equals cumulative reported claims divided by cumulative reported claim counts, and a severity… | formula | tagged | Frequency-Severity Method: “develop an average severity triangle (dollars ÷ counts at each age) to ultimate severity” |
| When a benefit-level change affects claims by accident date, restate the accident years not subject to the change to the common benefit lev… | procedure | linked | Loss Trend: “A benefit-level change is restated in the data, or allowed for in the selection, so that it is not …” |
| A law limiting benefits changes claim severity but not claim counts, so the claim count triangle needs no adjustment for it. | fact | missing |  |
| With no development beyond the last observed maturity, the tail factor is 1.000, and with no loss trend severities need no trend adjustment… | fact | missing |  |

</details>

<details><summary><code>cas5-2017-q18</code> · answerable</summary>

Tagged pages: Bornhuetter-Ferguson Method, Expected Loss Method, IBNR, Unpaid Claims

| Item | Kind | Status | Where |
|---|---|---|---|
| Under the expected claims technique, ultimate claims equal earned premium times the a priori expected claim ratio, ignoring the year's own … | formula | tagged | Expected Loss Method: “**Expected Loss Method** (expected claims technique) estimates ultimate losses entirely from an a p…” |
| IBNR is the portion of ultimate claims not yet reported, so it equals ultimate claims minus reported claims. | definition | tagged | IBNR: “$$\text{IBNR} = \text{Ultimate} - \text{Reported}$$” |
| Total unpaid claims are ultimate claims not yet paid, equal to ultimate minus paid claims, i.e. case reserves (reported minus paid) plus IB… | definition | tagged | Unpaid Claims: “$$\text{Unpaid} = \text{Ultimate} - \text{Paid to date}$$” |
| In the reported Bornhuetter-Ferguson technique, IBNR equals expected claims (premium times expected claim ratio) times (1 − 1/CDF), where 1… | formula | tagged | Bornhuetter-Ferguson Method: “$$\text{IBNR} = \left(1 - \tfrac{1}{\text{CDF}}\right) \times \text{ELR} \times \text{EP}$$” |
| Select age-to-age factors from the triangle (e.g. an average of the observed individual factors) for each development period. | procedure | linked | Chain Ladder Method: “**The procedure:** build the cumulative [[Development Triangle\\|triangle]] → compute [[Age to Age F…” |
| Compute age-to-ultimate cumulative development factors by multiplying selected age-to-age factors from the given age through the last age, … | procedure | syllabus | Cumulative Development Factor: “$$\text{CDF}_{n \to \text{ult}} = \left(\prod_{k \ge n} f_{k \to k+1}\right) \times \text{Tail}$$” |
| The percent unreported for BF must use the age-to-ultimate CDF for the accident year's current age, not just the next age-to-age factor. | fact | linked | Long Tail Lines: “$$\text{Reported \%} = \frac{1}{\text{CDF}_{n \to \text{ult}}}$$” |

</details>

<details><summary><code>cas5-2017-q19</code> · gap</summary>

Tagged pages: Case Outstanding Development Method, Chain Ladder Method, Case Reserves, Report Year

| Item | Kind | Status | Where |
|---|---|---|---|
| In the reported claim development technique, compute age-to-age factors as ratios of successive cumulative reported claims, select a factor… | procedure | tagged | Chain Ladder Method: “**The procedure:** build the cumulative [[Development Triangle\\|triangle]] → compute [[Age to Age F…” |
| The expected incremental claims in a given calendar year equal the difference between projected cumulative amounts at the end and the start… | procedure | missing |  |
| Reported claims equal paid claims plus case outstanding, so incremental reported claims over a period equal incremental paid claims plus th… | fact | syllabus | Calendar Year: “$$\text{CY Reported Losses} = \text{Paid} + \Delta\text{Case Reserves}$$” |
| Build the incremental paid triangle by differencing cumulative paid claims, and divide each incremental payment by the case outstanding at … | procedure | tagged | Case Outstanding Development Method: “Friedland's fuller version works period by period, using two ratios estimated from history: **paid …” |
| Compute case outstanding development ratios as case outstanding at the end of a period divided by case outstanding at its start, select rat… | procedure | tagged | Case Outstanding Development Method: “Friedland's fuller version works period by period, using two ratios estimated from history: **paid …” |
| To project incremental reported claims for a future period, apply the paid-to-previous-case ratio to the projected case outstanding at the … | procedure | tagged | Case Outstanding Development Method: “Rolling these forward generates a payment stream and runs the case balance down to zero.” |
| The case outstanding technique projects development only on claims that already have case reserves (IBNER) and cannot capture pure IBNR; it… | fact | tagged | Case Reserves: “**Case reserves** (also called case outstanding) are claim-specific estimates of the expected futur…” |

</details>

<details><summary><code>cas5-2017-q2</code> · answerable</summary>

Tagged pages: On Level Premium, Policy Year, Variable Expenses, Premium Audit, Parallelogram Method

| Item | Kind | Status | Where |
|---|---|---|---|
| Cumulate successive rate changes multiplicatively into a rate level index (each change applies on top of prior changes), with an arbitrary … | procedure | tagged | On Level Premium: “Rate level indices **compound**: successive changes of $+8\%$ and $+5\%$ give a cumulative index of…” |
| Under the parallelogram method, the on-level factor equals the current rate level divided by the average rate level in effect over the expe… | procedure | tagged | On Level Premium: “$$\text{On-Level Factor} = \frac{\text{Current cumulative rate level index}}{\text{Average rate lev…” |
| For a policy year (policies written during the year) with annual policies, the parallelogram collapses to a rectangle, so each rate level i… | fact | tagged | Parallelogram Method: “**Policy-year and written premium** are grouped by write date, so the rate level boundary cuts them…” |
| The loss ratio method indicated rate change factor is (loss & LAE ratio + fixed expense ratio) / (1 − variable expense ratio − profit and c… | formula | linked | Loss Ratio Method: “$$\text{Indicated Change} = \frac{\text{Projected Loss \& LAE Ratio} + F\%}{1 - V - Q_T} - 1$$” |
| The parallelogram method assumes policies are written uniformly throughout the period; if exposures grow rapidly, more policies are written… | fact | tagged | Parallelogram Method: “**Two weaknesses.** It assumes uniform writing — false for seasonal business such as boat owners, w…” |
| Policy year premium can develop after the policy year ends because of premium audits (exposure bases such as payroll or sales measured afte… | fact | tagged | Premium Audit: “Audits break the tidy relationship between transaction date and cohort. An audit on a policy writte…” |

</details>

<details><summary><code>cas5-2017-q20</code> · gap</summary>

Tagged pages: Chain Ladder Method, Loss Development, IBNR, Calendar Year, Paid Losses

| Item | Kind | Status | Where |
|---|---|---|---|
| Age-to-age (link ratio) development factors are computed as the cumulative claims at a later age divided by the cumulative claims at the pr… | formula | linked | Age to Age Factor: “$$f_{n \to n+1}^{\text{AY}} = \frac{C_{\text{AY},\,n+1}}{C_{\text{AY},\,n}}$$” |
| An all-year simple average selects each age-to-age factor as the unweighted arithmetic mean of all available observed factors for that deve… | procedure | linked | Age to Age Factor: “**Simple average** — equal weight to each year, so a small, volatile year counts as much as a large…” |
| The cumulative development factor to ultimate is the product of the selected age-to-age factors from the current age through the last age, … | procedure | tagged | Chain Ladder Method: “$$U_{\text{AY}} = C_{\text{AY},\,n} \times \text{CDF}_{n \to \text{ult}}$$” |
| IBNR equals ultimate claims minus reported (case-incurred) claims, not ultimate minus paid claims. | definition | tagged | IBNR: “$$\text{IBNR} = \text{Ultimate} - \text{Reported}$$” |
| Calendar year payments are incremental paid amounts: the latest diagonal of the cumulative paid triangle minus the prior diagonal, with the… | fact | missing |  |

</details>

<details><summary><code>cas5-2017-q21</code> · gap</summary>

Tagged pages: Loss Development, Case Adequacy, Berquist-Sherman Method, Bornhuetter-Ferguson Method, Large Loss

| Item | Kind | Status | Where |
|---|---|---|---|
| In the reported claim development technique, ultimate claims are estimated by applying a cumulative development factor (from volume-weighte… | procedure | linked | Cumulative Development Factor: “**Cumulative Development Factor** (CDF, or age-to-ultimate factor) is the product of all selected […” |
| In the paid claim development technique, ultimate claims are estimated by applying a cumulative development factor (from volume-weighted av… | procedure | linked | Cumulative Development Factor: “A CDF is specific to the triangle it came from: paid CDFs differ from reported CDFs, count CDFs fro…” |
| The reported development technique assumes a consistent case reserve adequacy over time; a strengthening of case reserves raises the latest… | fact | tagged | Case Adequacy: “Applying historical factors — built under weaker reserving — to a strengthened diagonal **over-stat…” |
| A change in the speed of claim reporting (faster reporting with unchanged payment pace) distorts reported development factors and reported … | fact | missing |  |
| A large reported but unpaid claim in a single immature accident year inflates that year's reported claims, and applying the age-to-age fact… | fact | tagged | Bornhuetter-Ferguson Method: “The chain ladder instead scales the whole diagonal, so a distorted diagonal is multiplied by the fu…” |
| The Berquist-Sherman case outstanding adjustment restates historical average case outstanding to the current adequacy level by detrending t… | procedure | tagged | Case Adequacy: “The remedy is the [[Berquist-Sherman Method\\|Berquist-Sherman]] case adjustment: restate historical…” |
| The expected claims method estimates ultimate claims from an a priori loss ratio or exposure-based expectation, independent of the company'… | procedure | linked | Expected Loss Method: “**Expected Loss Method** (expected claims technique) estimates ultimate losses entirely from an a p…” |
| The Bornhuetter-Ferguson method estimates ultimate claims as actual reported (or paid) claims plus expected claims times the percent unrepo… | formula | tagged | Bornhuetter-Ferguson Method: “$$U_{\text{BF}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) \times U_{0}$$” |
| A large claim can be handled separately by removing it from the triangle, developing the remaining claims, and adding the claim department'… | procedure | tagged | Large Loss: “In **reserving** the parallel treatment applies: the actuary may exclude large claims from the init…” |

</details>

<details><summary><code>cas5-2017-q22</code> · answerable</summary>

Tagged pages: Berquist-Sherman Method, Settlement Rate, Claim Count Triangle, Chain Ladder Method

| Item | Kind | Status | Where |
|---|---|---|---|
| The disposal rate is the ratio of cumulative closed claim counts at a given maturity to the ultimate claim count for that accident year. | definition | tagged | Settlement Rate: “$$\text{Disposal Rate}_n = \frac{\text{Closed claims at age } n}{\text{Ultimate claim counts}}$$” |
| The Berquist-Sherman settlement-rate (paid claim development) adjustment restates all accident years to the current settlement rate, using … | fact | tagged | Berquist-Sherman Method: “2. Select the current disposal rate pattern as the target.” |
| Adjusted closed claim counts at a maturity equal the selected (latest diagonal) disposal rate times each accident year's ultimate claim cou… | procedure | tagged | Berquist-Sherman Method: “Select the current disposal rate pattern as the target.” |
| An accident year whose disposal rate exceeds the target rate settled claims faster than current practice and its closed counts are adjusted… | fact | tagged | Settlement Rate (collapsed): “AY 2021's restated $24$-month paid figure is $\$4{,}977{,}800$ instead of $\$4{,}000{,}000$ — what …” |
| Ultimate claim counts are estimated by applying the chain ladder method to the reported claim count triangle: compute age-to-age factors, s… | procedure | tagged | Chain Ladder Method: “**The procedure:** build the cumulative [[Development Triangle\\|triangle]] → compute [[Age to Age F…” |

</details>

<details><summary><code>cas5-2017-q23</code> · gap</summary>

Tagged pages: Cape Cod Method, Chain Ladder Method, On Level Premium, Development Triangle, Changing Conditions, Rate Level Change

| Item | Kind | Status | Where |
|---|---|---|---|
| To restate claims for a change in severity (e.g., a court decision) that applies to payments made after a date, de-cumulate the triangle in… | procedure | missing |  |
| Incremental payments in a triangle are on the calendar-year diagonals: the cell for accident year a at age m months was paid in calendar ye… | fact | tagged | Development Triangle: “**Along a diagonal** — everything that happened in one calendar period.” |
| After adjusting the triangle, re-cumulate the incremental payments, compute age-to-age factors as ratios of successive cumulative values, s… | procedure | tagged | Chain Ladder Method: “**The procedure:** build the cumulative [[Development Triangle\\|triangle]] → compute [[Age to Age F…” |
| Paid development ultimate claims = cumulative paid claims to date × cumulative development factor to ultimate (the product of the remaining… | formula | tagged | Chain Ladder Method: “$$U_{\text{AY}} = C_{\text{AY},\,n} \times \text{CDF}_{n \to \text{ult}}$$” |
| On-level factor by the parallelogram method: compute each year's average rate level from the share of the year's earned premium written at … | procedure | tagged | On Level Premium: “$$\text{On-Level Factor} = \frac{\text{Current cumulative rate level index}}{\text{Average rate lev…” |
| Cape Cod used-up (on-level) premium for each accident year = on-level earned premium / cumulative development factor (i.e., × percent devel… | formula | tagged | Cape Cod Method: “**Used-up premium** $\text{EP}_i / \text{CDF}_i$ is the share of each year's premium "exposed" to t…” |
| The Cape Cod expected loss ratio is the total of adjusted (on-level) reported or paid claims across all accident years divided by the total… | formula | tagged | Cape Cod Method: “The ELR is estimated as total reported losses over total *used-up* (on-level, developed) premium ac…” |
| Cape Cod ultimate claims = claims paid to date + on-level premium × Cape Cod loss ratio × (1 − 1/CDF), i.e., actual paid plus expected unpa… | formula | tagged | Cape Cod Method: “$$\text{IBNR}_i = \text{ELR} \times \text{EP}_i \times \left(1 - \tfrac{1}{\text{CDF}_i}\right)$$” |

</details>

<details><summary><code>cas5-2017-q24</code> · answerable</summary>

Tagged pages: Unallocated Loss Adjustment Expenses ULAE, Loss Reserving, Long Tail Lines, Catastrophe Loss

| Item | Kind | Status | Where |
|---|---|---|---|
| The classical ULAE technique uses a ratio of calendar-year paid ULAE to calendar-year paid claims, applied to unpaid claims to estimate the… | definition | tagged | Unallocated Loss Adjustment Expenses ULAE: “Compute the ratio $R$ of calendar-year paid ULAE to calendar-year paid loss, review it for trend, a…” |
| The classical ULAE reserve equals the ratio times (50% of case outstanding reserves plus 100% of IBNR), reflecting the assumption that half… | formula | tagged | Unallocated Loss Adjustment Expenses ULAE: “If ULAE is assumed to be spent half at reporting and half at settlement, only $50\%$ remains on rep…” |
| In a rapidly growing book, ULAE is spent as claims are reported while paid claims lag, so the paid-to-paid ratio is distorted upward and th… | fact | tagged | Unallocated Loss Adjustment Expenses ULAE: “The classical method's central weakness is **growth**: in a rapidly growing book, current paid ULAE…” |
| Kittel's refinement divides calendar-year paid ULAE by the average of paid claims and incurred claims (0.5 paid + 0.5 incurred) to correct … | formula | tagged | Unallocated Loss Adjustment Expenses ULAE: “$$R_{\text{Kittel}} = \frac{\text{Paid ULAE}}{0.5(\text{Paid Loss}) + 0.5(\text{Incurred Loss})}$$” |
| In a catastrophe-prone area, catastrophe years produce volatile spikes in paid claims that are not matched by ULAE, so the paid-to-paid rat… | fact | tagged | Unallocated Loss Adjustment Expenses ULAE: “Where calendar-year paid losses are volatile, replace them with *expected* losses — apply reporting…” |
| The Mango-Allen bootstrap smooths the ratio by dividing paid ULAE by expected paid claims (accident year ultimates run through a payment pa… | procedure | tagged | Unallocated Loss Adjustment Expenses ULAE: “Where calendar-year paid losses are volatile, replace them with *expected* losses — apply reporting…” |
| For long-tail lines the 50/50 assumption fails because claims stay open for years and incur substantial maintenance ULAE after opening, so … | fact | tagged | Unallocated Loss Adjustment Expenses ULAE: “Drops the $50/50$ assumption entirely: ULAE is allocated to claim events (opening, maintenance, clo…” |
| The Conger-Nolibos generalized approach attributes ULAE to opening, maintaining and closing a claim with separately selected weights, and a… | procedure | tagged | Unallocated Loss Adjustment Expenses ULAE: “Drops the $50/50$ assumption entirely: ULAE is allocated to claim events (opening, maintenance, clo…” |

</details>

<details><summary><code>cas5-2017-q25</code> · gap</summary>

Tagged pages: Allocated Loss Adjustment Expense, Large Loss, Cumulative Development Factor, Loss Development

| Item | Kind | Status | Where |
|---|---|---|---|
| A large claim with atypical ALAE emergence distorts standard ALAE development and ratio techniques, so it should be removed before applying… | fact | tagged | Large Loss: “the actuary may exclude large claims from the initial projection, then add back a case-specific pro…” |
| Adjusted ultimate ALAE by the paid ALAE development technique: develop paid ALAE excluding the large claim with the paid ALAE CDF, then add… | procedure | tagged | Allocated Loss Adjustment Expense: “Friedland gives three approaches: develop a **combined** loss-and-ALAE triangle, develop **ALAE sep…” |
| The implied paid ALAE development factor equals the unadjusted ultimate ALAE estimate divided by the paid ALAE to date. | formula | tagged | Cumulative Development Factor: “$$\text{Ultimate} = C_n \times \text{CDF}_{n \to \text{ult}}$$” |
| In the paid ALAE to paid claims ratio technique, the development factor is the ultimate ALAE-to-claims ratio divided by the paid ALAE-to-pa… | formula | missing |  |
| Adjusted ultimate ALAE by the ratio technique: develop the paid ALAE-to-paid claims ratio excluding the large claim to an ultimate ratio, m… | procedure | tagged | Allocated Loss Adjustment Expense: “Friedland gives three approaches: develop a **combined** loss-and-ALAE triangle, develop **ALAE sep…” |

</details>

<details><summary><code>cas5-2017-q26</code> · answerable</summary>

Tagged pages: Loss Reserving, Benktander Method, Bornhuetter-Ferguson Method, Case Reserves, Reasonableness Testing, Changing Conditions

| Item | Kind | Status | Where |
|---|---|---|---|
| At early maturities the paid and reported development methods are highly leveraged, because the large cumulative development factor magnifi… | fact | tagged | Bornhuetter-Ferguson Method: “The chain ladder instead scales the whole diagonal, so a distorted diagonal is multiplied by the fu…” |
| The Bornhuetter-Ferguson method blends actual emerged claims with expected claims for the unreported (or unpaid) portion, so it is more sta… | fact | tagged | Bornhuetter-Ferguson Method: “The key structural property: **actual emergence is taken at face value and only the unemerged porti…” |
| A large gap between paid and reported indications signals that case reserves or settlement patterns differ from history, such as a large cl… | fact | tagged | Case Reserves: “Changes in case reserving adequacy over time (systematic strengthening or weakening) distort develo…” |
| The Benktander ultimate equals reported (or paid) claims plus (1 - p) times the B-F ultimate, where p is the percentage reported (or paid),… | formula | tagged | Benktander Method: “$$U_{\text{GB}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) U_{\text{BF}}$$” |
| The Benktander ultimate is a credibility-weighted average of the development ultimate (weight p) and the B-F ultimate (weight 1-p), so it l… | fact | tagged | Benktander Method: “- **Credibility $Z = p$.** The second identity is the useful one. Benktander weights chain ladder a…” |
| When ultimate estimates for an accident year shift across successive evaluations, the actuary should ask management about operational chang… | procedure | tagged | Loss Reserving: “**Understand the business.** Meet claims, underwriting and operations to identify changes in coding…” |

</details>

<details><summary><code>cas5-2017-q3</code> · answerable</summary>

Tagged pages: Reserving Data Organization, Calendar Year, Accident Year, Case Reserves, Incurred Losses

| Item | Kind | Status | Where |
|---|---|---|---|
| Accident year incurred losses as of a valuation date equal cumulative paid losses plus case reserves outstanding at that date, for claims w… | definition | tagged | Incurred Losses: “**Incurred Losses** — more precisely **reported losses** — are cumulative [[Paid Losses\\|payments]]…” |
| Assign each claim to an accident year by its accident date, and for the case reserve use only the latest reserve at the valuation date for … | procedure | tagged | Accident Year: “The **occurrence date** alone decides the year. A policy written $10/1/2023$ with a loss on $2/4/20…” |
| Calendar year incurred losses = payments during the calendar year + ending case reserves − beginning case reserves. | formula | tagged | Calendar Year: “$$\text{CY Reported Losses} = \text{Paid} + \Delta\text{Case Reserves}$$” |
| Calendar year aggregation counts only transactions occurring in that year regardless of accident date, and a claim not yet reported has a b… | fact | tagged | Calendar Year: “**Calendar Year** (CY) is a data aggregation method that groups every transaction by the calendar y…” |
| An advantage of calendar year aggregation is that its data are final once the year closes (no later development), so they are immediately a… | fact | tagged | Calendar Year: “CY is the **financial reporting** basis: most insurers report financially by calendar year, so the …” |
| A disadvantage of calendar year aggregation is that losses include transactions from all prior accident years while premium is earned only … | fact | tagged | Calendar Year: “CY incurred losses **mix accident years**: a CY 2024 figure contains payments and reserve changes o…” |

</details>

<details><summary><code>cas5-2017-q4</code> · answerable</summary>

Tagged pages: Expense Provisions, Expense Ratio, Permissible Loss Ratio, Underwriting Profit, Variable Expenses, Written Premium

| Item | Kind | Status | Where |
|---|---|---|---|
| The fundamental insurance equation in ratio form: permissible loss and LAE ratio = 1 − total variable expense ratio − underwriting profit a… | formula | tagged | Permissible Loss Ratio: “$$\text{VPLR} = 1 - V - Q_T \quad \text{(variable permissible loss ratio)}$$” |
| Compute an expense ratio by dividing the expense by the premium base that matches how the expense is incurred: written premium for expenses… | procedure | tagged | Expense Provisions: “**Premium-based ratios use different denominators.** Expenses incurred at the onset of the policy —…” |
| Commissions, other acquisition costs, and taxes, licenses and fees are incurred when the policy is written, so they are related to written … | fact | tagged | Expense Provisions: “**Premium-based ratios use different denominators.** Expenses incurred at the onset of the policy —…” |
| A negative underwriting profit provision does not imply an overall loss; investment income on loss reserves and unearned premium (float) ca… | fact | tagged | Underwriting Profit: “Underwriting profit is **not** total profit. An insurer holds policyholder-supplied funds — [[Unear…” |
| Test whether underwriting profit expectations were met by comparing the actual loss and LAE ratio (ultimate losses and LAE divided by earne… | procedure | linked | Loss Ratio: “Rate adequacy is judged against the [[Permissible Loss Ratio]], not against $100\%$: a projected lo…” |

</details>

<details><summary><code>cas5-2017-q5</code> · answerable</summary>

Tagged pages: Overall Rate Level Indication, Loss Ratio Method, Pure Premium Method, Fixed Expenses

| Item | Kind | Status | Where |
|---|---|---|---|
| Under the loss ratio method, the indicated rate level change factor equals (projected loss and LAE ratio + fixed expense ratio) divided by … | formula | tagged | Overall Rate Level Indication: “$$\text{Indicated Change} = \frac{\text{Projected Loss \& LAE Ratio} + F\%}{1 - V - Q_T} - 1$$” |
| In the loss ratio method, compute the loss and LAE ratio and the fixed expense ratio by dividing trended and developed losses and fixed exp… | procedure | tagged | Overall Rate Level Indication: “**Premium** — historical earned premium, brought to [[On Level Premium\\|current rate level]], devel…” |
| Under the pure premium method, the indicated average rate equals (pure premium + fixed expense per exposure) divided by (1 − variable expen… | formula | tagged | Pure Premium Method: “$$\text{Indicated Rate} = \frac{\text{Pure Premium} + F}{1 - V - Q_T}$$” |
| Pure premium is trended and developed losses and LAE divided by earned exposures; the pure premium method uses losses and exposures but not… | definition | tagged | Pure Premium Method: “project loss and LAE per exposure, add the fixed expense per exposure, and gross up for variable ex…” |
| The loss ratio method cannot be used when there is no premium at current rate level or rate history to on-level (e.g., a new line of busine… | fact | tagged | Loss Ratio Method: “It produces a **change**, not a rate — so it cannot price a new line of business with no current ra…” |
| The pure premium method cannot be used when there is no well-defined or consistently measured exposure base, since losses must be divided b… | fact | tagged | Loss Ratio Method: “The method's advantage is that it needs no exposure data, which makes it preferable where exposure …” |

</details>

<details><summary><code>cas5-2017-q6</code> · gap</summary>

Tagged pages: Considerations for Implementing Rates, Underwriting Profit, Adverse Selection, Classification Ratemaking

| Item | Kind | Status | Where |
|---|---|---|---|
| Expected profit equals the sum over classes of (rate charged minus true expected cost) times projected exposures. | formula | tagged | Underwriting Profit: “$$\text{UW Profit} = \text{EP} - \text{Losses} - \text{LAE} - \text{UW Expenses}$$” |
| With a 0% profit provision in the indicated rate, the true expected cost is the break-even rate, so profit is the margin of charged rate ab… | fact | linked | Profit and Contingency Provision: “$$\text{Rate} = \frac{\text{Pure Premium} + F}{1 - V - Q_T}$$” |
| To evaluate a rating plan scenario, use the rates charged under that scenario together with the projected exposures that result from those … | procedure | tagged | Considerations for Implementing Rates (collapsed): “If the relativity change is large enough to shift the mix — insureds receiving large increases non-…” |
| Adverse selection: underpriced classes attract more exposures and overpriced classes lose exposures, so exposure shifts toward classes subs… | fact | tagged | Adverse Selection: “**Adverse Selection** is the tendency for those who know they are worse-than-average risks to buy m…” |
| To decide whether to implement a rate change, net the one-time implementation cost against only the scenario that implements the change, th… | procedure | missing |  |
| A one-time implementation cost can be evaluated over a short-term view (first-year net) or long-term view (payback period equals cost divid… | fact | tagged | Adverse Selection (collapsed): “**Classification.** Charge $\$200$ and $\$1{,}000$ respectively; both groups buy; everyone is insur…” |

</details>

<details><summary><code>cas5-2017-q7</code> · gap</summary>

Tagged pages: Classification Ratemaking, Pure Premium, Partial Credibility, Complement of Credibility, Pure Premium Analysis

| Item | Kind | Status | Where |
|---|---|---|---|
| The indicated relativity for a class from loss experience is the class's pure premium (loss and ALAE per exposure) divided by the pure prem… | formula | elsewhere | Territorial Rating: “$$\text{Territory relativity} = \frac{\text{Territory pure premium}}{\text{Overall pure premium}}$$” |
| When the complement of credibility is 'no change', current relativities must be rebased by dividing each by their exposure-weighted average… | procedure | missing |  |
| Under the square root rule, partial credibility is Z = min(sqrt(n / full credibility standard), 1). | formula | tagged | Partial Credibility: “$$Z = \min\left(\sqrt{\frac{n}{n_F}},\; 1\right)$$” |
| The credibility-weighted relativity is Z times the indicated relativity plus (1 − Z) times the complement relativity. | formula | tagged | Complement of Credibility: “$$\text{Estimate} = Z \times \text{Experience} + (1 - Z) \times \text{Complement}$$” |
| To make class changes revenue neutral, off-balance the credibility-weighted relativities by dividing by their exposure-weighted average so … | procedure | tagged | Classification Ratemaking: “**Off-balance.** Relativity changes almost always change the average rate. The base rate must be ad…” |
| The indicated class rate change is the new relativity divided by the current relativity minus 1, with both relativities on the same basis (… | procedure | linked | Pure Premium Method: “$$\text{Indicated Change} = \frac{\text{Indicated Rate}}{\text{Current Rate}} - 1$$” |

</details>

<details><summary><code>cas5-2017-q8</code> · gap</summary>

Tagged pages: Generalized Linear Model, Classification Ratemaking, Variable Selection, Risk Classification Restrictions, Predictive Analytics

| Item | Kind | Status | Where |
|---|---|---|---|
| To judge whether a GLM rating variable is worth adding, check that the indicated relativities show a sensible (e.g. monotonic, intuitive) t… | procedure | tagged | Generalized Linear Model: “Output is judged on more than significance: consistency of the pattern across levels, standard erro…” |
| Check consistency of a variable's fitted relativities across individual years (by-year test); relativities that are stable over time indica… | procedure | tagged | Generalized Linear Model: “Stability is assessed by refitting without the most influential records (the highest Cook's distanc…” |
| A variable's chi-squared (p-value) percentage below the significance threshold (e.g. 5%) means the null hypothesis that the variable adds n… | fact | elsewhere | Chi-Squared Distribution (collapsed): “Since $9.4 > 7.81$, reject the smaller model at 5%: the variable is significant.” |
| Levels with little exposure have low credibility, producing wide standard error bands, volatile year-to-year relativities and counterintuit… | fact | syllabus | Data Segmentation: “Where a level is too thin, combine similar levels or find more data.” |
| A good rating variable should also meet practical criteria: it is objective and easy to administer, intuitively related to the loss, social… | fact | tagged | Classification Ratemaking: “**Operational** — objective, inexpensive to obtain and verify, not manipulable by the insured.” |
| Multivariate methods are discouraged in heavily regulated markets where the regulator mandates a different ratemaking method (e.g. Californ… | fact | missing |  |
| Multivariate methods are discouraged when data is insufficient (new line or territory) or too heterogeneous (large commercial, large-deduct… | fact | missing |  |
| Multivariate methods may also be discouraged by operational constraints (lack of systems, data infrastructure or expertise where cost excee… | fact | missing |  |

</details>

<details><summary><code>cas5-2017-q9</code> · answerable</summary>

Tagged pages: Complement of Credibility, Partial Credibility, Pure Premium, Classification Ratemaking

| Item | Kind | Status | Where |
|---|---|---|---|
| Harwayne's method first restates each other state's overall pure premium at the subject state's class exposure distribution, by weighting t… | procedure | tagged | Complement of Credibility (collapsed): “**Step 2 — Y's and Z's average pure premiums on State X's class mix** (X's exposures, each state's …” |
| The state adjustment factor for each other state equals the subject state's overall pure premium divided by that other state's overall pure… | formula | tagged | Complement of Credibility (collapsed): “F_Y &= \frac{4.20}{5.04} = 0.833” |
| The Harwayne complement for a class equals the average of the other states' class pure premiums, each multiplied by its state adjustment fa… | procedure | tagged | Complement of Credibility (collapsed): “C = \frac{400(3.00) + 300(3.09)}{400 + 300} = \$3.04” |
| Under classical (limited fluctuation) credibility, Z = min(1, sqrt(n / full credibility standard)), the square root rule, with n the exposu… | formula | tagged | Partial Credibility: “Z = \min\left(\sqrt{\frac{n}{n_F}},\; 1\right)” |
| The credibility-weighted estimate equals Z times the subject's own experience plus (1 − Z) times the complement of credibility. | formula | tagged | Complement of Credibility: “\text{Estimate} = Z \times \text{Experience} + (1 - Z) \times \text{Complement}” |
| Harwayne's method corrects for distributional bias from differing class mixes across states, so it suits situations where class distributio… | fact | tagged | Complement of Credibility (collapsed): “the complement is unbiased because it adjusts for the distributional differences, reasonably accura…” |
| Desirable qualities of a complement of credibility are: unbiased, statistically independent of the base statistic, available, accurate, eas… | definition | tagged | Complement of Credibility: “It should be (1) **accurate** — as low an error variance as possible around the future expected los…” |

</details>

<details><summary><code>cas5-2017f-q1</code> · answerable</summary>

Tagged pages: Premium Trend, On Level Premium, Written Premium, Earned Premium

| Item | Kind | Status | Where |
|---|---|---|---|
| Two-step premium trending: step 1 trends historical average premium at current rate level from its experience period to the latest availabl… | procedure | tagged | Premium Trend: “Step one brings historical average earned premium up to the **current** average written premium lev…” |
| The step 1 trend factor equals the latest quarter's average written premium at current rate level divided by the calendar year's average ea… | formula | tagged | Premium Trend: “$$\text{Step 1} = \frac{\text{Latest avg written premium at CRL}}{\text{Historical avg earned premi…” |
| The projected trend period runs from the average written date of the latest data quarter (midpoint of the quarter) to the average written d… | procedure | tagged | Premium Trend: “The trend period $n$ runs from the average written date of the policies earning premium in the expe…” |
| The step 2 projection factor is (1 + annual trend rate) raised to the length of the trend period in years. | formula | tagged | Premium Trend: “$$\text{Step 2} = (1 + t_P)^{n_2}$$” |
| Because premium is at current rate level, rate changes are excluded, so negative premium trend arises from changes in the characteristics o… | fact | tagged | Premium Trend: “**Premium Trend** is the change over time in the average premium per exposure at a *constant rate l…” |
| Falling price levels (deflation) reduce premium per policy when the exposure base is inflation-sensitive, such as payroll or receipts, prod… | fact | linked | Exposure Trend: “Under the [[Loss Ratio Method]] the effect enters through [[Premium Trend\\|premium trend]] instead:…” |

</details>

<details><summary><code>cas5-2017f-q10</code> · untagged</summary>

Tagged pages: Territory Ratemaking, Classification Ratemaking, Pure Premium, Pure Premium Analysis

| Item | Kind | Status | Where |
|---|---|---|---|
| The univariate (one-way) relativity method estimates each level of a rating variable from that level's own pure premium or loss ratio, igno… | definition | tagged | Classification Ratemaking: “A **univariate** (one-way) pure premium or loss ratio analysis attributes to a variable the effect …” |
| Univariate methods implicitly assume exposures are distributed uniformly across other rating variables; when exposures are correlated acros… | fact | tagged | Territory Ratemaking: “Urban territories carry different vehicle mixes, limit selections and driver populations, and a one…” |
| Test whether the univariate assumption holds by comparing the distribution of exposures across other rating variables (e.g., class mix) in … | procedure | tagged | Pure Premium Analysis (collapsed): “**Correlation.** If urban policyholders also skew toward younger drivers or higher limits, part of …” |
| In the adjusted pure premium method, compute adjusted exposures for each level by multiplying exposures in each level of the other rating v… | procedure | elsewhere | Balancing Back: “When other rating variables also apply, each class's exposures are first multiplied by their averag…” |
| Adjusted pure premium = loss (and ALAE) divided by adjusted exposures for the level. | formula | tagged | Pure Premium: “$$\text{Pure Premium} = \frac{\text{Losses} + \text{LAE}}{\text{Earned Exposures}}$$” |
| Indicated relativity equals a level's adjusted pure premium divided by the base level's adjusted pure premium, so the base level has a rela… | procedure | tagged | Territory Ratemaking: “$$\text{Territory Relativity}_i = \frac{\text{Pure Premium}_i}{\text{Pure Premium}_{\text{base}}}$$” |

</details>

<details><summary><code>cas5-2017f-q11</code> · untagged</summary>

Tagged pages: Generalized Linear Model, Territory Ratemaking, Classification Ratemaking, Predictive Analytics

| Item | Kind | Status | Where |
|---|---|---|---|
| In GLM output, a variable's chi-square percentage (p-value) below a conventional threshold such as 5% indicates the variable is statistical… | fact | elsewhere | Statistical Significance: “With a log link, a class coefficient $\hat{\beta}$ is a relativity of $e^{\hat{\beta}}$, and the [[…” |
| Narrow standard error bands around GLM relativity estimates indicate the level estimates are precise, while wide bands (typically from thin… | fact | elsewhere | Statistical Significance: “A sparse base widens every other level's interval, so the [[Generalized Linear Models for Insurance…” |
| Substantial, ordered differences in fitted relativities across the levels of a variable show that the variable differentiates expected cost… | fact | elsewhere | Statistical Significance: “In classification ratemaking it is the first actuarial test of whether a [[Rating Class\\|rate class…” |
| Multivariate methods account for correlation among rating variables by evaluating all variables simultaneously, whereas univariate methods … | fact | tagged | Generalized Linear Model: “because it estimates every rating variable *simultaneously* and so reports each one net of the othe…” |
| Multivariate methods can capture interactions between rating variables, where the effect of one variable depends on the level of another, w… | fact | tagged | Generalized Linear Model: “A coefficient on a variable that is interacted with a continuous predictor $x$ describes the effect…” |
| Multivariate methods provide statistical diagnostics (standard errors, significance tests, residuals) and separate systematic signal from r… | fact | tagged | Generalized Linear Model: “Output is judged on more than significance: consistency of the pattern across levels, standard erro…” |
| Spatial smoothing improves territory relativity estimates by credibility-weighting a territory's own experience with the experience of near… | definition | tagged | Territory Ratemaking: “**Spatial smoothing** is what makes fine granularity workable: because loss cost varies continuousl…” |
| Spatial smoothing borrows information from neighboring territories, increasing effective data volume, narrowing confidence intervals, and p… | fact | tagged | Territory Ratemaking: “because loss cost varies continuously across space, a cell's estimate can borrow strength from its …” |

</details>

<details><summary><code>cas5-2017f-q12</code> · answerable</summary>

Tagged pages: Increased Limits, Limited Expected Value, Censoring, Credibility

| Item | Kind | Status | Where |
|---|---|---|---|
| An increased limits factor (ILF) for a limit is the ratio of expected losses limited to that limit to expected losses limited to the basic … | definition | tagged | Increased Limits: “$$\text{ILF}(L) = \frac{E[X \wedge L]}{E[X \wedge B]}$$” |
| Expected losses in a layer between two limits equal the expected basic limit losses times the difference between the ILFs at the upper and … | formula | tagged | Increased Limits: “$$\text{Layer } (M, L] \text{ cost} = \text{Basic LC} \times \left[\text{ILF}(L) - \text{ILF}(M)\ri…” |
| Equal ILFs at two different limits imply zero expected loss, and therefore no premium, for the layer between them, which is inadequate and … | fact | tagged | Increased Limits (collapsed): “Flat is acceptable only in a degenerate case: it implies the expected loss in the $\$500$K–$\$1$M l…” |
| ILFs should increase with the limit but at a decreasing rate, so the indicated ILFs must be checked for consistency (monotonic, no zero-cha… | fact | tagged | Increased Limits: “So the *marginal* indemnity cost per dollar of additional limit must not increase as the limit rise…” |
| To derive ILFs for limits above those with experience, fit a parametric severity distribution to ground-up loss data, compute limited expec… | procedure | tagged | Increased Limits: “ILFs are estimated from a **size-of-loss distribution** — empirically, building the limited average…” |
| Alternative ways to get ILFs for new higher limits include using industry or bureau ILFs, or credibility-weighting the company's own indica… | procedure | tagged | Increased Limits: “Data at high limits is sparse and volatile, which is why ILFs are calculated from a broader body of…” |
| Challenges in setting higher-limit ILFs include selecting a severity curve for the tail, loss data being censored at current policy limits … | fact | tagged | Increased Limits: “Data at high limits is sparse and volatile, which is why ILFs are calculated from a broader body of…” |

</details>

<details><summary><code>cas5-2017f-q13</code> · untagged</summary>

Tagged pages: Considerations for Implementing Rates, Territory Ratemaking, Classification Ratemaking, Overall Rate Level Indication, Ratemaking Constraints

| Item | Kind | Status | Where |
|---|---|---|---|
| The change in a territory's relativity equals its indicated relativity divided by its current relativity. | formula | elsewhere | Balancing Back (collapsed): “A class's rate change is $(1 + \Delta)\,\text{OBF}\,r_i^{\text{new}}/r_i^{\text{old}} - 1$.” |
| Because moving to indicated relativities changes the average rate level, compute an off-balance factor as the reciprocal of the premium-wei… | procedure | tagged | Considerations for Implementing Rates: “must be **off-balanced** against any simultaneous change in relativities so the two together delive…” |
| A territory's total rate change is the product of its relativity change, the off-balance factor, and one plus the overall target rate chang… | procedure | elsewhere | Balancing Back (collapsed): “A class's rate change is $(1 + \Delta)\,\text{OBF}\,r_i^{\text{new}}/r_i^{\text{old}} - 1$.” |
| When a territory's change exceeds a cap, set it at the cap and recover the resulting premium shortfall by scaling up the changes of the unc… | procedure | tagged | Considerations for Implementing Rates: “a cap on the change for any level of a rating variable is made up by adjusting the base rate and th…” |
| To convert capped rate changes back to relativities, multiply each territory's capped change by its current relativity, then divide by the … | procedure | elsewhere | Balancing Back (collapsed): “Relative to class A, the new relativities are $1.25(0.660/0.600) = 1.375$ for B and $1.60(0.750/0.6…” |

</details>

<details><summary><code>cas5-2017f-q14</code> · answerable</summary>

Tagged pages: Coinsurance Rating, Coinsurance, Coinsurance Percentage

| Item | Kind | Status | Where |
|---|---|---|---|
| Under a coinsurance clause, the apportionment ratio equals the amount of insurance carried divided by the amount required (coinsurance perc… | formula | tagged | Coinsurance Percentage: “$$a = \min\!\left(\frac{F}{cV},\ 1.0\right)$$” |
| The insurer's indemnity equals the apportionment ratio times the loss (less any deductible), capped at the policy limit; the coinsurance pe… | fact | tagged | Coinsurance Rating: “Fall short and every partial loss is settled at the ratio of insurance carried to insurance require…” |
| With no deductible, the amount of loss equals the indemnity payment plus the coinsurance penalty. | fact | tagged | Coinsurance: “The insured absorbs the rest or relies on other insurance.” |
| An inflation guard endorsement automatically increases the amount of insurance periodically by a set percentage or construction cost index,… | definition | linked | Insurance to Value: “or an inflation guard, which raises the limit through the year.” |
| Insurers can encourage insurance to value by offering guaranteed replacement cost only to insureds who insure to a specified percentage of … | fact | linked | Insurance to Value: “The homeowners replacement cost condition pays full replacement cost only when the dwelling is insu…” |
| Other insurance-to-value initiatives include property valuation software to identify underinsured homes, inspections or appraisals to estab… | fact | linked | Insurance to Value: “That is why underwriters verify property values with appraisals and building cost estimates” |

</details>

<details><summary><code>cas5-2017f-q15</code> · answerable</summary>

Tagged pages: Overall Rate Level Indication, Bornhuetter-Ferguson Method, On Level Premium, Loss Development, Parallelogram Method

| Item | Kind | Status | Where |
|---|---|---|---|
| The cumulative development factor at a given maturity is the product of the age-to-age factors from that maturity to ultimate (with a tail … | procedure | tagged | Loss Development: “$$\text{CDF}_{n \to \text{ult}} = \prod_{k \ge n} f_{k \to k+1} \times \text{Tail}$$” |
| The loss development method estimates ultimate loss as reported (or paid) loss to date times the cumulative development factor. | formula | tagged | Loss Development: “$$\text{Ultimate Losses} = \text{Losses at age } n \times \text{CDF}_{n \to \text{ult}}$$” |
| The Bornhuetter-Ferguson method estimates ultimate loss as reported loss plus expected loss (expected loss ratio times premium) times the p… | formula | tagged | Bornhuetter-Ferguson Method: “$$U_{\text{BF}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) \times U_{0}$$” |
| The BF a priori expected loss uses unadjusted earned premium; on-leveling and trending are done in the rate indication, not in the BF expec… | fact | tagged | Bornhuetter-Ferguson Method: “$$\text{IBNR} = \left(1 - \tfrac{1}{\text{CDF}}\right) \times \text{ELR} \times \text{EP}$$” |
| The development method is highly leveraged for immature years because reported losses are multiplied by a large CDF, making it volatile; BF… | fact | tagged | Bornhuetter-Ferguson Method: “It is therefore the method of choice at **immature maturities** and for [[Long Tail Lines\\|long-tai…” |
| On-level factors are found with the parallelogram method: for annual policies written evenly, a mid-year rate change affects 12.5% of that … | procedure | tagged | Parallelogram Method: “$$\text{OLF}_Y = \frac{I_{\text{current}}}{\sum_k A_{Y,k}\, I_k}$$” |
| Trend periods run from the average date of each historical period (average earned date for premium, average accident date for losses) to th… | procedure | linked | Loss Trend: “$t$ is the selected annual trend and $n$ the **trend period**, measured from the average date of lo…” |
| The projected loss ratio is trended ultimate loss and ALAE divided by on-level trended earned premium, summed across years, then loaded for… | procedure | linked | Loss Ratio Method: “The numerator's loss ratio must be **projected**: ultimate losses (developed), trended to the futur…” |
| The indicated rate change is (projected loss and LAE ratio + fixed expense ratio) / (1 - variable expense ratio - profit and contingencies … | formula | tagged | Overall Rate Level Indication: “$$\text{Indicated Change} = \frac{\text{Projected Loss \& LAE Ratio} + F\%}{1 - V - Q_T} - 1$$” |
| With full credibility, the indicated rate change is based entirely on the experience-period indication with no complement of credibility. | fact | tagged | Overall Rate Level Indication (collapsed): “$$0.80 \times 18.5\% + 0.20 \times 2.0\% = +15.2\%$$” |

</details>

<details><summary><code>cas5-2017f-q16</code> · answerable</summary>

Tagged pages: Ratemaking Data Organization, Earned Premium, Unearned Premium, Net of Reinsurance, Net Losses

| Item | Kind | Status | Where |
|---|---|---|---|
| Earned premium for a period is the portion of a policy's written premium corresponding to the part of its term that has expired within that… | definition | tagged | Earned Premium: “**Earned Premium** is the portion of premium corresponding to coverage the insurer has actually pro…” |
| Compute a policy's earned premium in a period by pro rata allocation: written premium times months of the policy's own term falling in the … | procedure | tagged | Earned Premium: “$$\text{EP for one policy} = \text{Full premium} \times \frac{\text{days elapsed}}{\text{policy ter…” |
| Policies that expired before the start of the period contribute no earned premium to that period, and a policy whose whole term lies within… | fact | tagged | Earned Premium: “$$\text{EP for one policy} = \text{Full premium} \times \frac{\text{days elapsed}}{\text{policy ter…” |
| Unearned premium at a valuation date is the portion of written premium for the unexpired part of policies still in force at that date (writ… | definition | tagged | Unearned Premium: “**Unearned Premium** is the portion of written premium corresponding to coverage not yet provided —…” |
| Accident year groups claims by the date of the accident (occurrence), regardless of when the claim is reported or paid. | definition | linked | Accident Year: “**Accident Year** (AY) is a data aggregation method that groups losses by the calendar year in whic…” |
| Reported claims (losses) net of reinsurance equal gross paid claims plus gross case reserves minus reinsurance recoveries. | formula | tagged | Net Losses: “$$\text{Net} = \text{Gross} - \text{Ceded} - \text{S\&S} - \text{Deductible Recoveries}$$” |

</details>

<details><summary><code>cas5-2017f-q17</code> · answerable</summary>

Tagged pages: Reserving Data Organization, Homogeneity, Credibility, External Information in Reserving, Data Segmentation

| Item | Kind | Status | Where |
|---|---|---|---|
| Development techniques assume the historical development pattern applies to immature years, so data grouped with differing development patt… | fact | tagged | Homogeneity: “Two coverages may have similar loss ratios and completely different reporting and settlement speeds…” |
| A combined triangle blending segments with different development patterns yields a biased estimate when the mix of business between segment… | fact | tagged | Homogeneity: “If the insurer grows the liability side to $55\%$ of premium, the true blended factor rises, but th…” |
| Analyzing segments separately lets changes in frequency, severity, settlement rates or case reserve adequacy be attributed to the segment w… | fact | linked | Mix of Business: “Diagnosing which has moved requires segment-level data; the aggregate alone cannot distinguish them.” |
| External or industry data reflects other companies' business mix, underwriting, claim handling, case reserve adequacy and settlement practi… | fact | tagged | External Information in Reserving: “**Never use external data unadjusted.** It must be reconciled to the subject book on the dimensions…” |
| Long-tailed coverages like bodily injury need many years of history to observe ultimate development; with limited history, internal data la… | fact | tagged | External Information in Reserving: “**When external data is needed:** a new line or new company with no history; a small or newly segme…” |
| Splitting data into more segments reduces the volume in each, increasing the variability of link ratios and lowering credibility, so there … | fact | tagged | Homogeneity: “Homogeneity is always traded against [[Credibility]]. Splitting a book finer makes each group more …” |
| Separate analyses by segment require more data preparation, selections and review, and volatile reserve estimates can cause swings in repor… | fact | tagged | Data Segmentation: “**Practical limits:** a segment needs a field the systems actually capture; separate analyses cost …” |

</details>

<details><summary><code>cas5-2017f-q18</code> · gap</summary>

Tagged pages: Frequency-Severity Method, Chain Ladder Method, Claim Count Triangle, Seasonality, Data Diagnostic Analysis

| Item | Kind | Status | Where |
|---|---|---|---|
| Ultimate claims equal ultimate claim counts times ultimate severity (average claim size), computed separately for each accident period. | formula | tagged | Frequency-Severity Method: “$$U = N_{\text{ult}} \times S_{\text{ult}}$$” |
| Severity is an average, so severities of sub-periods (e.g., half-years) cannot be summed to get an annual severity; compute ultimate claims… | fact | missing |  |
| Apply the chain ladder method to the reported count and reported severity triangles: compute age-to-age factors, select factors, form cumul… | procedure | tagged | Chain Ladder Method: “**The procedure:** build the cumulative [[Development Triangle\\|triangle]] → compute [[Age to Age F…” |
| When development factors differ systematically by season (e.g., first versus second half of the year), select separate development patterns… | fact | missing |  |
| Use the CDF matching each accident period's current age (e.g., the 12-to-ultimate CDF for a period evaluated at 12 months), applied to the … | fact | tagged | Chain Ladder Method: “$$U_{\text{AY}} = C_{\text{AY},\,n} \times \text{CDF}_{n \to \text{ult}}$$” |
| Reported claim counts excluding claims closed with no payment can develop downward because claims counted at early maturities are removed w… | fact | missing |  |
| Seasonality can only be detected with data at a finer granularity than annual (monthly, quarterly, semi-annual), by comparing the same sub-… | fact | tagged | Seasonality: “Signature on the [[Autocorrelation Function\\|ACF]]: significant spikes at lags $s, 2s, 3s, \dots$ t…” |

</details>

<details><summary><code>cas5-2017f-q19</code> · gap</summary>

Tagged pages: Chain Ladder Method, Tail Factor, Case Adequacy, Reserve Adequacy, Data Diagnostic Analysis, Unpaid Claims

| Item | Kind | Status | Where |
|---|---|---|---|
| Age-to-age (link ratio) development factors are the ratio of cumulative claims at a later age to cumulative claims at the prior age for the… | formula | linked | Age to Age Factor: “**Age-to-Age Factor** (link ratio) is the ratio of a cohort's cumulative amount at one maturity to …” |
| In the reported claims development technique, ultimate claims equal the latest cumulative reported claims multiplied by the age-to-ultimate… | procedure | tagged | Chain Ladder Method: “$$U_{\text{AY}} = C_{\text{AY},\,n} \times \text{CDF}_{n \to \text{ult}}$$” |
| A tail factor (the oldest age-to-ultimate factor) can be derived from the ultimate claims already estimated for the oldest accident year di… | procedure | missing |  |
| Age-to-age factors are selected from the triangle, for example as an all-year weighted average or from consistent observed link ratios, and… | procedure | tagged | Chain Ladder Method: “**The procedure:** build the cumulative [[Development Triangle\\|triangle]] → compute [[Age to Age F…” |
| A triangle of cumulative paid claims divided by cumulative reported claims (paid-to-reported ratios) is a diagnostic used to detect changes… | procedure | tagged | Data Diagnostic Analysis: “**[[Case Adequacy\\|Case strengthening]]:** average case outstanding rises faster than trend on the …” |
| A decline in paid-to-reported ratios in recent accident years at the same age indicates slower claim settlement (e.g. tighter claims handli… | fact | tagged | Chain Ladder Method: “**The pattern is stable over calendar time.** Violated by a change in [[Case Adequacy\\|case adequac…” |
| Understated unpaid claims overstate profitability, which can mislead investors into investing, lead regulators to set lower target profit o… | fact | tagged | Reserve Adequacy: “Redundancy is a profit deferral; deficiency understates the loss ratio, overstates surplus, and fee…” |

</details>

<details><summary><code>cas5-2017f-q2</code> · answerable</summary>

Tagged pages: On Level Premium, Premium Trend, Overall Rate Level Indication, Earned Premium, Parallelogram Method, Loss Ratio Method

| Item | Kind | Status | Where |
|---|---|---|---|
| On-level premium (earned premium at current rate level) is historical earned premium restated as if all policies had been written at the cu… | definition | tagged | On Level Premium: “**On-Level Premium** is historical earned premium restated as though every policy had been written …” |
| Use the parallelogram method for annual policies written uniformly: a rate change effective a fraction p through the year leaves p^2/2 of t… | procedure | tagged | Parallelogram Method: “The second formula is the area earned in the same calendar year at a new level effective a fraction…” |
| The cumulative rate level index is the product of (1 + rate change) over successive rate changes, and the current rate level is the index a… | fact | tagged | On Level Premium: “Rate level indices **compound**: successive changes of $+8\%$ and $+5\%$ give a cumulative index of…” |
| Trend on-level premium from each year's average earned date (July 1 for a calendar year) to the average earned date of the projected period… | procedure | tagged | Premium Trend: “The trend period $n$ runs from the average written date of the policies earning premium in the expe…” |
| With fixed expenses as a percentage of premium, the loss ratio indicated rate change is (projected loss & LAE ratio + fixed expense provisi… | formula | tagged | Overall Rate Level Indication: “$$\text{Indicated Change} = \frac{\text{Projected Loss \& LAE Ratio} + F\%}{1 - V - Q_T} - 1$$” |
| The projected loss and LAE ratio equals projected ultimate loss and LAE divided by projected earned premium at current rate level. | formula | tagged | Loss Ratio Method: “The numerator's loss ratio must be **projected**: ultimate losses (developed), trended to the futur…” |

</details>

<details><summary><code>cas5-2017f-q20</code> · answerable</summary>

Tagged pages: Bornhuetter-Ferguson Method, Frequency-Severity Method, Loss Trend, Exposure Base, Exposure Trend

| Item | Kind | Status | Where |
|---|---|---|---|
| Frequency in the frequency-severity technique is ultimate claim counts divided by an exposure base (e.g., payroll), expressed as claims per… | definition | syllabus | Frequency: “**Frequency** is the number of claims per unit of exposure — how often losses happen, as distinct f…” |
| To compare frequencies across accident years, trend both the claim counts (at the claim count trend rate) and the inflation-sensitive expos… | procedure | tagged | Exposure Trend: “Exposure trend applies **only** to inflation-sensitive bases. Car-years and house-years do not infl…” |
| Select an ultimate frequency from the trended historical frequencies by judging their pattern: if frequencies show a consistent increasing … | procedure | tagged | Loss Trend (collapsed): “The series is not a constant trend — it **accelerated** around $2022$. The five-year figure average…” |
| Select an ultimate severity for the projected year by trending each available selected ultimate severity to the projected year's level at t… | procedure | tagged | Frequency-Severity Method: “**Counts and trended severity.** Develop counts, but estimate severity by **trending** a mature yea…” |
| The frequency-severity ultimate claims equals the selected frequency times the projected year's exposure base times the selected severity (… | formula | tagged | Frequency-Severity Method: “$$U = \text{Exposures} \times \text{Frequency}_{\text{ult}} \times S_{\text{ult}}$$” |
| The percent unreported equals 1 minus 1/CDF, where the CDF is the cumulative reported claims development factor at the evaluation age. | formula | tagged | Bornhuetter-Ferguson Method: “- $C$ is reported (or paid) losses to date, $U_0 = \text{ELR} \times \text{EP}$ the a priori expect…” |
| The Bornhuetter-Ferguson ultimate equals actual reported claims plus the expected ultimate claims (a priori, here from the frequency-severi… | formula | tagged | Bornhuetter-Ferguson Method: “$$U_{\text{BF}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) \times U_{0}$$” |

</details>

<details><summary><code>cas5-2017f-q21</code> · untagged</summary>

Tagged pages: Cape Cod Method, On Level Premium, Cumulative Development Factor, Expected Loss Method, Changing Conditions

| Item | Kind | Status | Where |
|---|---|---|---|
| The Cape Cod technique is a Bornhuetter-Ferguson method in which the expected claim ratio is derived from the data (reported claims relativ… | definition | tagged | Cape Cod Method: “**Cape Cod Method** (Stanard-Bühlmann) is the [[Bornhuetter-Ferguson Method\\|Bornhuetter-Ferguson]]…” |
| Used-up premium for an accident year equals on-level earned premium divided by the reported claims development factor (CDF) to ultimate. | formula | tagged | Cape Cod Method: “**Used-up premium** $\text{EP}_i / \text{CDF}_i$ is the share of each year's premium "exposed" to t…” |
| The Cape Cod expected claim ratio equals total (adjusted) reported claims across all years divided by total used-up premium across all year… | formula | tagged | Cape Cod Method: “$$\text{ELR} = \frac{\sum_i C_i}{\sum_i \text{EP}_i \times \tfrac{1}{\text{CDF}_i}}$$” |
| Developed (ultimate) claims must not be paired with used-up premium; developed claims pair with full on-level premium and undeveloped repor… | fact | elsewhere | Generalized Cape Cod Method (collapsed): “Weighting the developed loss ratios by full premium gives immature years far too much say.” |
| To adjust for a legislative change that alters claim costs, restate each accident year's claims to a common cost level by applying a reform… | procedure | tagged | Changing Conditions: “Split accident years at the effective date and adjust expected claim ratios with a law-change estim…” |
| Bornhuetter-Ferguson ultimate claims = reported claims + expected claim ratio × on-level earned premium × (1 − 1/CDF), i.e., reported plus … | formula | tagged | Cape Cod Method: “$$\text{IBNR}_i = \text{ELR} \times \text{EP}_i \times \left(1 - \tfrac{1}{\text{CDF}_i}\right)$$” |
| When the expected claim ratio is stated at a common cost level, the expected-claims term must be restated back to a given accident year's o… | procedure | linked | Rate Level Change: “$$\text{Adjusted ELR}_i = \text{ELR}_{\text{base}} \times \frac{\text{Rate level}_{\text{base}}}{\t…” |

</details>

<details><summary><code>cas5-2017f-q22</code> · answerable</summary>

Tagged pages: Case Outstanding Development Method, Case Reserves, Paid Losses, External Information in Reserving

| Item | Kind | Status | Where |
|---|---|---|---|
| Paid claims equal reported (incurred) claims minus case outstanding, so a paid triangle can be derived from reported and case outstanding t… | definition | tagged | Paid Losses: “$$\text{Reported Losses} = \text{Paid Losses} + \text{Case Reserves}$$” |
| Compute age-to-age development factors from a cumulative triangle as ratios of successive maturities, select a factor for each period (e.g.… | procedure | syllabus | Age to Age Factor: “$$f_{n \to n+1}^{\text{AY}} = \frac{C_{\text{AY},\,n+1}}{C_{\text{AY},\,n}}$$” |
| When there is no development after the last observed maturity, the tail factor equals 1.000. | fact | linked | Tail Factor: “A tail of exactly $1.000$ is itself an assumption — that development is complete” |
| Ultimate claims equal reported claims times the reported CDF and also equal paid claims times the paid CDF, so reported = U/reported CDF an… | formula | tagged | Paid Losses: “$$\text{Ultimate}_{\text{paid}} = \text{Paid}_n \times \text{CDF}^{\text{paid}}_{n \to \text{ult}}$$” |
| The case outstanding development factor at a maturity equals industry unpaid claims divided by industry case outstanding, i.e., (1 − 1/paid… | formula | tagged | Case Outstanding Development Method: “$$f_{\text{case}} = \frac{\text{All future payments}}{\text{Current case outstanding}}$$” |
| In the case outstanding technique, the industry-derived factor for the accident year's maturity is applied to the company's own case outsta… | procedure | tagged | Case Outstanding Development Method: “$$U = \text{Paid to date} + \text{Case Outstanding} \times f_{\text{case}}$$” |
| Limitations of the case outstanding technique with industry factors: industry case reserving, settlement practices and business mix may dif… | fact | tagged | External Information in Reserving: “It must be reconciled to the subject book on the dimensions that actually drive development” |

</details>

<details><summary><code>cas5-2017f-q23</code> · gap</summary>

Tagged pages: Frequency-Severity Method, Severity, Loss Trend, Tail Factor, Severity Analysis

| Item | Kind | Status | Where |
|---|---|---|---|
| In the disposal-rate frequency-severity method, the tail severity at maturity m is the average severity of all claims closing at age m and … | definition | missing |  |
| Compute a tail severity by summing trended incremental paid losses over all cells at maturity m or later and dividing by the sum of untrend… | procedure | missing |  |
| Trend incremental paid claims to a target cost level by applying (1+trend)^(target year - accident year) to every cell in an accident year'… | procedure | tagged | Loss Trend: “**Loss Trend** is the annual rate of change in loss cost over time — driven by inflation, the legal…” |
| The tail severity at age m equals the count-weighted average of the severity of claims closing at age m and the tail severity at the next a… | formula | missing |  |
| To choose the maturity at which to combine data into a single tail severity, compare trended incremental severities by cell (paid x trend /… | procedure | missing |  |
| Combining at too early an age discards usable development detail, while combining too late leaves the tail selection resting on few, volati… | fact | missing |  |

</details>

<details><summary><code>cas5-2017f-q24</code> · answerable</summary>

Tagged pages: Berquist-Sherman Method, Case Adequacy, Loss Development, IBNR, Data Diagnostic Analysis

| Item | Kind | Status | Where |
|---|---|---|---|
| Diagnose a change in case reserve adequacy versus a change in settlement rate: flat closed-to-reported count ratios indicate no settlement … | procedure | tagged | Case Adequacy: “A jump concentrated on one **diagonal**, appearing at every maturity at once, is a change in reserv…” |
| The Berquist-Sherman case outstanding adjustment restates the whole reported triangle to the case adequacy level of the latest diagonal, so… | fact | tagged | Berquist-Sherman Method (collapsed): “Against the original reported figures ($\$1{,}300{,}000$, $\$1{,}350{,}000$, $\$1{,}675{,}000$), th…” |
| Select a severity trend from year-over-year changes in average paid claim severity (unaffected by case reserving practice), not from total … | procedure | tagged | Case Adequacy: “**Paid data is immune**, so a divergence between paid and reported chain ladder estimates is the co…” |
| Adjusted average case outstanding for each accident year is the latest-diagonal average case outstanding in that maturity column de-trended… | procedure | tagged | Berquist-Sherman Method: “$$\text{Adjusted Case}_{\text{AY},n} = \text{Case}_{\text{latest},n} \times \left(1 + t\right)^{-(\…” |
| Adjusted reported claims = actual paid claims + adjusted average case outstanding × actual open claim counts. | formula | tagged | Berquist-Sherman Method: “$$\text{Adjusted Reported}_{\text{AY},n} = \text{Paid}_{\text{AY},n} + \text{Adjusted Case}_{\text{…” |
| Develop the adjusted reported triangle to ultimate by selecting volume-weighted age-to-age factors, multiplying them into a cumulative deve… | procedure | linked | Age to Age Factor: “**Volume-weighted (all-year)** — the ratio of column sums. Weights each year by its size, so it is …” |
| IBNR (total, including development on known claims) = ultimate claims minus reported (case-incurred) claims, not minus paid claims. | formula | tagged | IBNR: “$$\text{IBNR} = \text{Ultimate} - \text{Reported}$$” |
| When case reserve adequacy changes, techniques that avoid case reserves (paid development, paid frequency-severity/disposal rate, expected … | fact | tagged | Case Adequacy: “**Paid data is immune**, so a divergence between paid and reported chain ladder estimates is the co…” |

</details>

<details><summary><code>cas5-2017f-q25</code> · untagged</summary>

Tagged pages: Reinsurance, Ceded Losses, Net of Reinsurance, Loss Development, Net Losses, Gross Losses

| Item | Kind | Status | Where |
|---|---|---|---|
| To apply the reported claims development technique to a reinsured book, first subtract ceded excess of loss reported claims from gross repo… | procedure | tagged | Reinsurance: “$$\text{Net} = \text{Gross} - \text{Ceded}$$” |
| Age-to-age factors are ratios of cumulative reported claims at successive ages, a selected factor is chosen (e.g. by averaging), and the cu… | formula | tagged | Loss Development: “$$\text{CDF}_{n \to \text{ult}} = \prod_{k \ge n} f_{k \to k+1} \times \text{Tail}$$” |
| Projected ultimate claims equal latest cumulative reported claims multiplied by the cumulative development factor for that age. | formula | tagged | Loss Development: “$$\text{Ultimate Losses} = \text{Losses at age } n \times \text{CDF}_{n \to \text{ult}}$$” |
| An aggregate stop loss reinsurance caps an accident year's total net losses at the stop loss limit, so it applies to the projected ultimate… | fact | elsewhere | Ceded Loss Reserve: “Typically per-occurrence excess comes off first, then the quota share applies to what remains, and …” |
| Net ultimate after all reinsurance is the minimum of ultimate net of XOL and the stop loss limit (no cap for years without a stop loss), an… | procedure | elsewhere | Aggregate Excess of Loss: “$$Y = \min\left(\max(S - A,\, 0),\; L_A\right)$$” |
| Unpaid claims equal ultimate claims minus paid claims to date, with both measured on the same net-of-reinsurance basis. | formula | syllabus | Unpaid Claims: “$$\text{Unpaid} = \text{Ultimate} - \text{Paid to date}$$” |

</details>

<details><summary><code>cas5-2017f-q26</code> · gap</summary>

Tagged pages: Unallocated Loss Adjustment Expenses ULAE, Loss and Loss Adjustment Expense, Case Reserves, IBNR, Reasonableness Testing

| Item | Kind | Status | Where |
|---|---|---|---|
| The classical (paid-to-paid) ULAE technique uses a ratio of calendar year paid ULAE to calendar year paid claims. | definition | tagged | Unallocated Loss Adjustment Expenses ULAE: “**Classical (dollar-based, paid-to-paid).** Compute the ratio $R$ of calendar-year paid ULAE to cal…” |
| The classical technique assumes half of ULAE is incurred when a claim is opened and half as it is closed/paid over its life, so ULAE for re… | fact | tagged | Unallocated Loss Adjustment Expenses ULAE: “If ULAE is assumed to be spent half at reporting and half at settlement, only $50\%$ remains on rep…” |
| Unpaid ULAE under the classical technique = paid-to-paid ULAE ratio × (50% × case reserves + 100% × IBNR). | formula | tagged | Unallocated Loss Adjustment Expenses ULAE: “$$\text{ULAE Reserve} = R \times \left(0.5 \times \text{Case} + 1.0 \times \text{IBNR}\right)$$” |
| Calendar year paid claims are obtained by summing incremental payments (differences between successive cumulative values) along each diagon… | procedure | missing |  |
| A multi-year weighted average ULAE ratio equals total paid ULAE divided by total paid claims over the period, so total ULAE equals ratio ti… | fact | missing |  |
| The classical technique assumes a steady-state book; if paid-to-paid ratios trend over time (e.g., a start-up year or a growing book inflat… | fact | tagged | Unallocated Loss Adjustment Expenses ULAE: “The classical method's central weakness is **growth**: in a rapidly growing book, current paid ULAE…” |

</details>

<details><summary><code>cas5-2017f-q27</code> · answerable</summary>

Tagged pages: Loss Reserving, Case Adequacy, Bornhuetter-Ferguson Method, Frequency-Severity Method, Large Loss, Changing Conditions

| Item | Kind | Status | Where |
|---|---|---|---|
| Strengthening case reserves is a calendar-year effect that raises reported claims on the latest diagonal of every accident year, while larg… | fact | tagged | Case Adequacy: “A jump concentrated on one **diagonal**, appearing at every maturity at once, is a change in reserv…” |
| Paid development methods use only paid claims and are not affected by changes in case reserve adequacy. | fact | tagged | Case Adequacy: “**Paid data is immune**, so a divergence between paid and reported chain ladder estimates is the co…” |
| The reported development technique overstates ultimate claims when case reserves are strengthened but historical development factors are no… | fact | tagged | Changing Conditions: “*Case strengthening*: reported development overstates, reported BF and Cape Cod overstate less; pai…” |
| The Bornhuetter-Ferguson estimate of ultimate equals actual claims (paid or reported) plus (1 - 1/CDF) times a priori expected claims. | formula | tagged | Bornhuetter-Ferguson Method: “$$U_{\text{BF}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) \times U_{0}$$” |
| The reported Bornhuetter-Ferguson technique is overstated when case reserves are strengthened without adjusting the CDF, because the percen… | fact | tagged | Changing Conditions (collapsed): “its IBNR comes from the a priori and the unreported *proportion*, so it takes no credit for the cla…” |
| The disposal rate frequency-severity technique relies on closed claim counts and paid severities, so it is unaffected by case reserve stren… | fact | tagged | Frequency-Severity Method: “**Disposal rate (Berquist-Sherman) approach.** Project the number of claims closing in each future …” |
| Paid development applied to an accident year containing unusually large paid claims overstates ultimate, since the development factor lever… | fact | linked | Paid Losses (collapsed): “The paid method magnifies the same distortion nearly three times as much.” |
| The paid Bornhuetter-Ferguson technique handles large paid losses better than paid development because only the unpaid portion is estimated… | fact | tagged | Bornhuetter-Ferguson Method: “The key structural property: **actual emergence is taken at face value and only the unemerged porti…” |

</details>

<details><summary><code>cas5-2017f-q28</code> · answerable</summary>

Tagged pages: Bornhuetter-Ferguson Method, Loss Development, Frequency-Severity Method, Loss Ratio, Reasonableness Testing, Age to Age Factor

| Item | Kind | Status | Where |
|---|---|---|---|
| To assess selected development factors, compare the ultimate claim ratios from the development technique with those from other techniques (… | procedure | tagged | Reasonableness Testing: “Then test the *selected* ultimates by the ratios they imply: ultimate claim ratios, severities, fre…” |
| The most recent (least mature) accident year's development estimate depends on the earliest age-to-age factor (e.g., 12-24 months), which i… | fact | tagged | Loss Development: “A $5\%$ error in the $12\text{–}24$ factor moves ultimate by roughly $\$480{,}000$” |
| When business mix is unchanged and there are no unusually large losses, the true ultimate claim ratio should be roughly stable across accid… | fact | tagged | Loss Ratio: “As a reserving diagnostic, the loss ratio series across accident years at a fixed maturity should m…” |
| The Bornhuetter-Ferguson ultimate equals reported claims plus expected claims times the percent unreported (1 - 1/CDF); equivalently it is … | formula | tagged | Bornhuetter-Ferguson Method: “$$U_{\text{BF}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) \times U_{0}$$” |
| In the Bornhuetter-Ferguson method, mature years put almost all weight on reported claims (so BF matches the development estimate), while i… | fact | tagged | Bornhuetter-Ferguson Method: “The more of the year that has emerged, the more the answer relies on the data — automatically, with…” |
| To assess the initial expected loss ratio, check whether BF results drift steadily away from the other techniques' stable estimates as matu… | procedure | tagged | Bornhuetter-Ferguson Method: “The a priori is the weak point. A stale ELR that ignores [[Rate Level Change\\|rate changes]] and [[…” |

</details>

<details><summary><code>cas5-2017f-q3</code> · answerable</summary>

Tagged pages: Ratemaking Data Organization, Calendar Year, Policy Year, Earned Premium, Written Premium

| Item | Kind | Status | Where |
|---|---|---|---|
| Calendar year aggregation assigns to a calendar year the premium earned during that year (and losses/transactions recorded in that year), r… | definition | tagged | Ratemaking Data Organization: “everything booked in the year. Available quickly and already collected for financial reporting” |
| Calendar year earned premium for a policy is its annual premium times the fraction of the policy term falling within the calendar year, sum… | procedure | tagged | Calendar Year: “$$\text{CY Earned Premium} = \text{Written Premium} - \Delta\text{UEP}$$” |
| Written premium is the full policy premium assigned to the period containing the policy's effective date. | definition | tagged | Written Premium: “is the full premium booked when a policy is issued, for the entire policy term, regardless of how m…” |
| Policy year aggregation groups policies by effective date within the year and follows each policy through the end of its term, so a policy … | definition | tagged | Ratemaking Data Organization: “its exposures are not fully earned until 24 months after it starts” |
| When a policy is cancelled mid-term, its premium is reduced pro rata to the time in force, lowering both written and earned premium for its… | procedure | linked | Unearned Premium: “Cancellation returns the unearned portion. **Pro rata** cancellation returns the full unearned prem…” |
| Once all policies in a policy year have expired or been cancelled, there is no unearned premium, so the policy year's written and earned pr… | fact | tagged | Ratemaking Data Organization: “its exposures are not fully earned until 24 months after it starts” |
| Advantage of calendar year data: it is final at year end with no development, readily available, and reconciles to financial statements. | fact | tagged | Ratemaking Data Organization: “Available quickly and already collected for financial reporting” |
| Disadvantage of calendar year data: losses include claims from earlier accident years and premium comes from policies written in different … | fact | tagged | Ratemaking Data Organization: “but its losses include payments and reserve changes on claims from policies issued years ago, a mis…” |

</details>

<details><summary><code>cas5-2017f-q4</code> · answerable</summary>

Tagged pages: Claims Made Coverage, Occurrence Coverage, Report Year, Loss Trend

| Item | Kind | Status | Where |
|---|---|---|---|
| An occurrence policy covers claims that occur during the policy period, regardless of when they are reported, so its loss cost sums the cos… | definition | tagged | Occurrence Coverage: “**Occurrence Coverage** is a policy trigger under which the policy responds to losses that *occur* …” |
| A claims-made policy covers claims reported during the policy period, subject to the retroactive date, which excludes claims that occurred … | definition | tagged | Claims Made Coverage: “**Claims-Made Coverage** is a policy trigger under which the policy responds to claims *reported* d…” |
| To get a report-year total from the loss cost of one occurrence/report-lag component, divide that component by its lag percentage, then spl… | procedure | tagged | Claims Made Coverage (collapsed): “Claims report $25\%$ in the accident year, then $35\%$, $25\%$ and $15\%$ in the following three.” |
| Trend loss costs by the annual trend rate compounded over the number of years between the base report year and the report year of the claim… | procedure | tagged | Loss Trend: “$$\text{Trend Factor} = (1 + t)^{n}$$” |
| When switching from claims-made to occurrence coverage, a gap exists for claims occurring before the occurrence policy's start but reported… | fact | tagged | Claims Made Coverage: “An **extended reporting endorsement** (ERP, or "tail coverage") covers claims that occurred during …” |
| Complete coverage without overlap when switching from claims-made to occurrence equals the occurrence policy loss cost plus the tail loss c… | procedure | tagged | Claims Made Coverage: “An **extended reporting endorsement** (ERP, or "tail coverage") covers claims that occurred during …” |

</details>

<details><summary><code>cas5-2017f-q5</code> · answerable</summary>

Tagged pages: Bornhuetter-Ferguson Method, On Level Premium, Loss Trend, Loss Development, Rate Level Change, Parallelogram Method

| Item | Kind | Status | Where |
|---|---|---|---|
| Bornhuetter-Ferguson ultimate loss = reported loss + expected loss ratio × premium × (1 − 1/CDF), where (1 − 1/CDF) is the percent unreport… | formula | tagged | Bornhuetter-Ferguson Method: “$C$ is reported (or paid) losses to date, $U_0 = \text{ELR} \times \text{EP}$ the a priori expectat…” |
| Develop reported losses to ultimate by multiplying them by the cumulative loss development factor for the accident year's maturity. | procedure | tagged | Loss Development: “$$\text{Ultimate Losses} = \text{Losses at age } n \times \text{CDF}_{n \to \text{ult}}$$” |
| Trend historical ultimate losses to the target accident year's cost level by compounding the annual loss cost trend over the number of year… | procedure | tagged | Loss Trend: “$$\text{Trend Factor} = (1 + t)^{n}$$” |
| Use the parallelogram method to on-level earned premium: with annual policies written uniformly and rate changes on January 1, each calenda… | procedure | tagged | On Level Premium: “The *average* index for a year is the earned-premium-weighted blend of the levels in force during t…” |
| Select the expected loss ratio as total trended ultimate losses divided by total on-level premium over the chosen experience years (a premi… | procedure | linked | Expected Loss Method: “The **ELR** is the whole method, and it must be derived, not assumed: from the pricing indication f…” |
| When applying BF to the target year, the premium used for expected losses must be on-level at the same basis as the ELR, and losses trended… | fact | tagged | Rate Level Change: “The [[Bornhuetter-Ferguson Method\\|BF]] and [[Expected Loss Method\\|expected claims]] techniques ne…” |

</details>

<details><summary><code>cas5-2017f-q6</code> · gap</summary>

Tagged pages: Workers Compensation Insurance, Benefit Limit, Loss Trend

| Item | Kind | Status | Where |
|---|---|---|---|
| The minimum and maximum weekly indemnity benefits are set as stated percentages of the state average weekly wage (SAWW), so each limit equa… | formula | elsewhere | Workers Compensation Underwriting: “Texas, for example, publishes a maximum weekly income benefit tied to its state average weekly wage…” |
| A worker's weekly indemnity benefit equals the compensation rate times the pre-injury wage, floored at the minimum benefit and capped at th… | formula | missing |  |
| To estimate the direct impact of a benefit law change on losses, compute total benefits under the current and proposed structures (benefit … | procedure | missing |  |
| When wages are grouped in bands, approximate each band's wage by its average (total wages divided by number of workers) when applying benef… | procedure | missing |  |
| Raising the minimum benefit reduces the financial incentive of low-wage workers to avoid injury claims and return to work, increasing claim… | fact | missing |  |
| Lowering the maximum benefit widens the gap between wage and benefit for high-wage workers, strengthening their incentive to avoid claims a… | fact | missing |  |

</details>

<details><summary><code>cas5-2017f-q7</code> · answerable</summary>

Tagged pages: Expense Provisions, Fixed Expenses, Variable Expenses, Permissible Loss Ratio, Expense Ratio

| Item | Kind | Status | Where |
|---|---|---|---|
| Under the premium-based projection method, acquisition-type expenses (commission, other acquisition, premium tax and licensing fees) are in… | procedure | tagged | Expense Provisions: “Expenses incurred at the onset of the policy — commissions, other acquisition, and taxes, licenses …” |
| Under the premium-based projection method, general expenses (and other costs incurred over the policy term) are ratioed to earned premium. | procedure | tagged | Expense Provisions: “Expenses incurred at the onset of the policy — commissions, other acquisition, and taxes, licenses …” |
| The underwriting expense ratio is the sum of the commission, other acquisition, taxes/licenses/fees, and general expense ratios, and exclud… | definition | tagged | Expense Ratio: “**Expense Ratio** is underwriting expenses as a share of premium — the non-claim cost of writing an…” |
| The operating expense ratio equals the underwriting expense ratio plus the loss adjustment expense ratio, with LAE ratioed to earned premiu… | definition | tagged | Expense Ratio: “$$\text{Operating Expense Ratio} = \text{UW Expense Ratio} + \frac{\text{LAE}}{\text{Earned Premium…” |
| The total permissible loss ratio equals 1 minus the underwriting expense ratio minus the underwriting profit provision (if LAE is treated a… | formula | tagged | Expense Provisions: “the **total permissible loss ratio** also takes out the fixed expense ratio, $\text{PLR} = 1 - F - …” |
| With the premium-based projection method, indicated rate change = (projected loss & LAE ratio + fixed expense ratio) / (1 − variable expens… | formula | tagged | Permissible Loss Ratio: “$$\text{Indicated Change} = \frac{\text{Projected Loss \& LAE Ratio} + F\%}{\text{VPLR}} - 1$$” |
| When the projected loss ratio excludes LAE, add the LAE ratio to the loss ratio (not multiply by 1+LAE ratio) in the numerator of the indic… | procedure | linked | Loss Ratio: “$$\text{Loss Ratio} = \frac{\text{Losses} + \text{LAE}}{\text{Earned Premium}}$$” |
| Fixed expenses do not vary with premium level and are kept separate from variable expenses (which vary with premium) in the premium-based p… | definition | tagged | Expense Provisions: “[[Fixed Expenses]] are assumed the same for each risk regardless of premium — typically home-office…” |

</details>

<details><summary><code>cas5-2017f-q8</code> · answerable</summary>

Tagged pages: Lifetime Value, Principles of Ratemaking, Fixed Expenses, Underwriting Profit

| Item | Kind | Status | Where |
|---|---|---|---|
| Lifetime value analysis sets the premium so that the policy breaks even (including the profit provision) over the customer's expected multi… | definition | tagged | Lifetime Value: “**Lifetime Value** (LTV) is the present value of the expected profit from a customer relationship o…” |
| Weight each future year's entire net position (premium, loss, LAE and fixed expense) by the retention probability and discount it at the di… | procedure | tagged | Lifetime Value: “$$\text{LTV} = \sum_{t=1}^{T} \frac{\left(P_t - L_t - E_t\right) \times {}_{t}p}{(1 + r)^{t}}$$” |
| Required premium per exposure = (pure premium including LAE + fixed expense per exposure) / (1 - variable expense ratio - profit and contin… | formula | tagged | Fixed Expenses: “$$\text{Rate} = \frac{\text{Pure Premium} + F}{1 - V - Q_T}$$” |
| Load the pure premium for LAE by multiplying by (1 + LAE provision) when LAE is expressed as a percentage of loss. | procedure | syllabus | Loss and Loss Adjustment Expense: “It cannot be traced to a claim, so it is estimated in aggregate — classically as the ratio of calen…” |
| In a multi-year projection, trend the loss cost by the annual loss trend for each later year and trend the premium by the annual premium tr… | procedure | linked | Loss Trend: “$$\text{Trend Factor} = (1 + t)^{n}$$” |
| The Statement of Principles Regarding Property and Casualty Ratemaking states that a rate is an estimate of the expected value of future co… | fact | tagged | Principles of Ratemaking: “**Principle 1 — A rate is an estimate of the expected value of future costs.**” |
| Justify lifetime value analysis under the Statement of Principles by tying its features (forward-looking multi-year projection, allocation … | procedure | tagged | Lifetime Value: “The professional boundary matters: the **indication** is an actuarial estimate of expected cost; LT…” |

</details>

<details><summary><code>cas5-2017f-q9</code> · gap</summary>

Tagged pages: Exposure Base, Risk Classification Restrictions, Adverse Selection, Classification Ratemaking

| Item | Kind | Status | Where |
|---|---|---|---|
| A good exposure base is proportional to expected loss, practical (objective, easily measured and verifiable), and supported by historical p… | fact | tagged | Exposure Base: “**Proportional to expected loss.** All else equal, a policy with two exposures should have twice th…” |
| The social criteria for evaluating a rating variable are affordability, causality, controllability and privacy. | definition | tagged | Risk Classification Restrictions: “social (privacy, causality, affordability, controllability) and legal (permitted in the jurisdictio…” |
| A rating variable is socially acceptable on causality grounds if it has a direct causal link to loss rather than being merely a correlated … | fact | elsewhere | Rating Variable (collapsed): “**Social:** it passes. The variable is controllable by the insured, causally intuitive and not a pr…” |
| Adverse selection (anti-selection) occurs when an insurer does not use a risk-differentiating variable that competitors use, so it attracts… | definition | tagged | Adverse Selection: “Every classification restriction reintroduces adverse selection by forcing a single price across ri…” |
| An insurer that ignores a rating variable and has no expenses or profit charges every insured the average expected cost of its book (weight… | procedure | tagged | Classification Ratemaking: “In a competitive market an insurer that charges one average rate to a heterogeneous group loses the…” |
| To measure the effect of price-based switching, compare the insurer's rate to the competitor's rate for each risk class: the class where th… | procedure | missing |  |

</details>

<details><summary><code>cas5-2018f-q1</code> · untagged</summary>

Tagged pages: Exposure Base, Ratemaking, Principles of Ratemaking

| Item | Kind | Status | Where |
|---|---|---|---|
| A good exposure base should be proportional to expected loss, meaning expected loss changes in direct proportion to the exposure units and … | definition | tagged | Exposure Base: “All else equal, a policy with two exposures should have twice the expected loss of a similar policy…” |
| A good exposure base should be practical: objective, easy to obtain and verify, inexpensive to administer, and not subject to manipulation … | definition | tagged | Exposure Base: “Objective, and relatively easy and inexpensive to obtain and verify — which also keeps policyholder…” |
| A good exposure base should consider historical precedence: changing the base requires system, rating-algorithm and statistical-reporting c… | definition | tagged | Exposure Base: “A change of base can cause large premium swings for individual insureds, requires a change in the r…” |
| For liability coverage, loss depends on third-party damages and injuries rather than the value of the insured's own property, so a value-ba… | fact | elsewhere | Liability Loss Exposure: “any condition or situation that presents the possibility of a claim alleging that a person or organ…” |
| For physical damage coverage, repair and replacement costs rise with the value of the insured property, so insured value is proportional to… | fact | elsewhere | Property Loss Exposure: “$\Delta V$ is the reduction in the value of the property, measured on whichever valuation basis app…” |
| Value-based exposure bases are harder to obtain and verify objectively than unit counts like boat-years (market value, purchase price and r… | fact | tagged | Exposure Base: “Objective, and relatively easy and inexpensive to obtain and verify — which also keeps policyholder…” |
| Choose a recommended exposure base by weighing how well each candidate meets the three criteria for each coverage, retaining the existing b… | procedure | tagged | Exposure Base (collapsed): “The proposal should be rejected; the AOI effect in the table is a case for an [[Classification Rate…” |

</details>

<details><summary><code>cas5-2018f-q10</code> · gap</summary>

Tagged pages: Territory Ratemaking, Classification Ratemaking, Homogeneity, Credibility

| Item | Kind | Status | Where |
|---|---|---|---|
| Overly broad rating territories are heterogeneous, so a single average territorial relativity overcharges better risks and undercharges wor… | fact | tagged | Homogeneity: “In **ratemaking**, a non-homogeneous class means systematic cross-subsidy: the better risks in the …” |
| Territory definitions based on a single peril (e.g., weather) fail to capture geographic variation in other perils such as theft, fire, wat… | fact | tagged | Territory Ratemaking: “Geographic cost drivers: population and traffic density, crime, weather and catastrophe exposure, r…” |
| Developing rating territories proceeds by defining basic geographic units, quantifying each unit's geographic risk, smoothing the residual … | procedure | tagged | Territory Ratemaking: “Territories are defined at some granularity (postal code, county, census tract) and then **grouped*…” |
| Basic geographic units such as zip codes are granular but their boundaries change over time, whereas counties are stable but coarser, so un… | fact | missing |  |
| Geography is correlated with other rating variables, so a multivariate model such as a GLM that includes those variables is used to isolate… | fact | tagged | Territory Ratemaking: “Territory must be estimated **alongside** other rating variables, not before them.” |
| Spatial smoothing of residual geographic variation across neighboring units can be distance-based, which suits perils like weather, or adja… | procedure | tagged | Territory Ratemaking: “Werner describes distance-based and adjacency-based smoothing, applied *before* territories are gro…” |
| Clustering groups basic units with similar smoothed relativities into territories, using methods such as quantile-based (similar exposure p… | procedure | tagged | Territory Ratemaking: “Too fine and no cell is [[Credibility\\|credible]]; too coarse and real cost differences are average…” |

</details>

<details><summary><code>cas5-2018f-q11</code> · answerable</summary>

Tagged pages: Deductible, Loss Elimination Ratio, Deductible Rating, Allocated Loss Adjustment Expense, Large Deductible Policy

| Item | Kind | Status | Where |
|---|---|---|---|
| The loss elimination ratio (LER) for a deductible is the fraction of ground-up losses that fall below the deductible (eliminated by it). | definition | tagged | Loss Elimination Ratio: “**Loss Elimination Ratio** (LER) is the proportion of ground-up losses removed by a deductible — th…” |
| Split ground-up losses into losses below the deductible (ground-up × LER) and excess losses above the deductible (ground-up × (1 − LER)); o… | procedure | tagged | Deductible: “Under an ordinary deductible $d$ the loss splits in two: the part the policyholder keeps (is not re…” |
| When the insurer pays all ALAE (deductible applies to loss only), ALAE is based on ground-up losses and is not reduced by the deductible, s… | fact | tagged | Large Deductible Policy (collapsed): “ALAE is $9\%$ of ground-up losses and is not reduced by the deductible.” |
| Deductible processing cost and credit risk charges are applied as percentages of the losses below the deductible, since the insurer fronts … | fact | tagged | Deductible Rating: “so the premium must cover invoicing and monitoring and a provision for the credit risk that the ins…” |
| An additional risk margin is applied as a percentage of the excess (above-deductible) losses. | fact | tagged | Large Deductible Policy (collapsed): “the risk margin is $12\%$ of excess losses” |
| Premium = (expected losses + ALAE + fixed expenses + other fixed-dollar charges) / (1 − variable expense ratio − profit ratio); fixed-dolla… | formula | tagged | Large Deductible Policy: “$$\text{Premium} = \frac{\text{Excess Losses} + \text{ALAE} + F + \text{CR} + \text{RM}}{1 - V - Q}…” |

</details>

<details><summary><code>cas5-2018f-q12</code> · gap</summary>

Tagged pages: Classification Ratemaking, Pure Premium Method, Rating Algorithm, Ratemaking Constraints, Pure Premium Analysis

| Item | Kind | Status | Where |
|---|---|---|---|
| In the adjusted pure premium method, each cell's exposure is multiplied by the current rating factor of the other rating variable(s) to giv… | procedure | elsewhere | Balancing Back: “When other rating variables also apply, each class's exposures are first multiplied by their averag…” |
| The adjusted pure premium for a segment equals the segment's total loss (and ALAE) divided by its adjusted exposures. | formula | tagged | Pure Premium Analysis: “$$\text{Pure Premium} = \frac{\text{Losses} + \text{LAE}}{\text{Earned Exposures}} = \text{Frequenc…” |
| The indicated relativity for a segment equals its pure premium divided by the pure premium of the base class, so the base class has relativ… | formula | tagged | Classification Ratemaking: “$$\text{Relativity}_i = \frac{\text{Pure Premium}_i}{\text{Pure Premium}_{\text{base}}}$$” |
| When selecting relativities that move a fraction of the way from current to indicated, the selected relativity equals current plus that fra… | procedure | elsewhere | Territorial Rating (collapsed): “With, say, $Z = 0.45$, the credibility-weighted relativity is $0.45(1.56) + 0.55(1.00) = 1.25$” |
| The off-balance factor is the exposure-weighted average current relativity divided by the exposure-weighted average selected relativity, us… | procedure | elsewhere | Balancing Back: “$$\text{OBF} = \frac{\sum_i w_i\, r_i^{\text{old}}}{\sum_i w_i\, r_i^{\text{new}}}$$” |
| The proposed base rate equals the current base rate times the off-balance factor (and times one plus the overall rate level change), so the… | procedure | linked | Considerations for Implementing Rates: “$$\text{Base Rate}_{\text{new}} = \text{Base Rate}_{\text{current}} \times \frac{1 + \text{overall …” |
| Social criteria for evaluating rating variables include affordability, causality, controllability, and privacy. | definition | tagged | Classification Ratemaking: “**Social** — privacy, causality, controllability and affordability; these are where public and regu…” |
| Affordability means premiums should remain affordable, especially for compulsory coverage; controllability means the insured can influence … | definition | missing |  |

</details>

<details><summary><code>cas5-2018f-q13</code> · untagged</summary>

Tagged pages: Coinsurance Rating, Coinsurance Percentage, Increased Limits, Limited Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| When losses are uniformly distributed within a loss layer, the layer's average severity is its midpoint, so expected severity is the sum of… | procedure | elsewhere | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| Pure premium equals expected claim frequency times expected severity, and the rate per $1,000 of coverage is the pure premium divided by (a… | formula | elsewhere | Layer of Insurance: “$E[\text{layer loss}] = E[N]\left(E[X \wedge b] - E[X \wedge a]\right)$” |
| For an amount of insurance below the home's value, losses are capped at the amount of insurance; expected severity is computed on capped lo… | procedure | tagged | Limited Expected Value: “The **Limited Expected Value** (LEV) of a random variable $X$ at limit $u$ is the expected value of…” |
| Rate per $1,000 of coverage is higher at lower amounts of insurance because the first dollars of coverage are the most likely to be used (l… | fact | tagged | Increased Limits: “Each successive layer is cheaper per dollar of limit — which is exactly the consistency property.” |
| Underinsurance harms the insured because on a total or near-total loss they recover only the amount of insurance (short of rebuild cost), a… | fact | tagged | Coinsurance Rating: “Fall short and every partial loss is settled at the ratio of insurance carried to insurance require…” |
| Rates are built assuming insurance to value, so underinsured homes pay inadequate premium for their loss propensity; across-the-board rate … | fact | tagged | Coinsurance Rating: “Its purpose is **insurance-to-value**. Because most property losses are partial, an insured carryin…” |
| The coinsurance apportionment ratio is min(amount of insurance / (coinsurance % × property value), 1). | formula | tagged | Coinsurance Rating: “\text{Recovery}_{\text{clause}} = \min\!\left(\frac{\text{Insurance Carried}}{\text{Coinsurance \% …” |
| Indemnity under a coinsurance clause is the lesser of the policy limit and loss times the apportionment ratio; the coinsurance penalty is t… | formula | tagged | Coinsurance Rating: “\text{Recovery}_{\text{clause}} = \min\!\left(\frac{\text{Insurance Carried}}{\text{Coinsurance \% …” |

</details>

<details><summary><code>cas5-2018f-q14</code> · gap</summary>

Tagged pages: Reserve Communication, Reserve Adequacy, Unpaid Claims, Stakeholder Reporting, Regulatory Reporting

| Item | Kind | Status | Where |
|---|---|---|---|
| Management uses unpaid claim estimates in pricing, underwriting and strategic decisions, so under-reserving makes indicated rates look adeq… | fact | tagged | Reserve Adequacy: “The **direction of error is asymmetric in consequence**. Redundancy is a profit deferral; deficienc…” |
| Management relies on accurate unpaid claim estimates for decisions on reinsurance purchases and capital allocation. | fact | tagged | Unpaid Claims: “- Accuracy matters beyond the balance sheet: unpaid claim estimates drive solvency assessment, [[Ra…” |
| Investors use financial statements to judge earnings and financial strength, and the unpaid claim estimate is the largest liability on a P&… | fact | tagged | Stakeholder Reporting: “**Investors and rating agencies** — reserve development history, volatility, and the earnings effec…” |
| Investors use reserve levels, through their effect on reported earnings and surplus, to assess the dividends a company can sustainably pay. | fact | missing |  |
| Regulators are principally concerned with insurer solvency to protect policyholders, and understated reserves overstate surplus and mask fi… | fact | tagged | Reserve Adequacy: “The **direction of error is asymmetric in consequence**. Redundancy is a profit deferral; deficienc…” |
| Regulators need accurate estimates of ultimate claim costs when reviewing rate filings because indicated rate levels depend directly on the… | fact | tagged | Unpaid Claims: “Accuracy matters beyond the balance sheet: unpaid claim estimates drive solvency assessment, [[Rate…” |

</details>

<details><summary><code>cas5-2018f-q15</code> · gap</summary>

Tagged pages: Reserving Data Organization, Calendar Year, Case Reserves, Net of Reinsurance, Net Losses, Gross Losses

| Item | Kind | Status | Where |
|---|---|---|---|
| Calendar year reported claims equal payments made during the calendar year plus the change in case outstanding reserves over that year (end… | definition | tagged | Calendar Year: “$$\text{CY Reported Losses} = \text{Paid} + \Delta\text{Case Reserves}$$” |
| Calendar year amounts are assigned by transaction date, not accident date, and a claim's case reserve before its first transaction is zero,… | fact | tagged | Calendar Year: “groups every transaction by the calendar year in which it is *booked* — premium as it is earned, lo…” |
| A decrease in case outstanding over the year gives a negative change in case that reduces calendar year reported claims, because payments p… | fact | tagged | Calendar Year: “$\Delta$ terms are ending balance minus beginning balance.” |
| Under a quota share, the ceded amount is the ceded percentage times the gross loss, and the net amount is the retained percentage (one minu… | procedure | elsewhere | Pro Rata Reinsurance: “$$\text{Ceded}_{\text{QS}} = a \times X$$” |
| Per-claim excess of loss reinsurance cedes the portion of each individual claim's cumulative amount above the retention, applied claim by c… | procedure | elsewhere | Excess of Loss: “the reinsurer pays the part of each loss — per risk or per occurrence — above the cedant's retentio…” |
| For net reported (incurred) claims under excess of loss, the ceded amount in a calendar year is the change in cumulative ceded incurred (cu… | procedure | missing |  |

</details>

<details><summary><code>cas5-2018f-q16</code> · answerable</summary>

Tagged pages: Loss Development, Bornhuetter-Ferguson Method, Expected Loss Method, Credibility, Chain Ladder Method

| Item | Kind | Status | Where |
|---|---|---|---|
| An age-to-age (link ratio) factor is the reported claims at a later maturity divided by reported claims at the immediately adjacent earlier… | formula | linked | Age to Age Factor: “**Age-to-Age Factor** (link ratio) is the ratio of a cohort's cumulative amount at one maturity to …” |
| Select an age-to-age factor from the available historical factors at that maturity (e.g., a simple average of the factors, or the only one … | procedure | linked | Age to Age Factor: “- **Simple average** — equal weight to each year, so a small, volatile year counts as much as a lar…” |
| The cumulative development factor to ultimate at a given age is the product of the selected age-to-age factors from that age onward, includ… | formula | linked | Cumulative Development Factor: “**Cumulative Development Factor** (CDF, or age-to-ultimate factor) is the product of all selected […” |
| Under the reported development technique, ultimate claims equal reported claims to date multiplied by the cumulative development factor to … | formula | tagged | Chain Ladder Method: “$$U_{\text{AY}} = C_{\text{AY},\,n} \times \text{CDF}_{n \to \text{ult}}$$” |
| Percent unreported equals 1 minus 1/CDF; percent reported is 1/CDF. | formula | linked | Cumulative Development Factor: “The reciprocal is the **percentage reported** (or paid): $p_n = 1/\text{CDF}_n$, and $1 - p_n$ is t…” |
| Under the Bornhuetter-Ferguson technique, ultimate claims equal reported claims to date plus expected claims (earned premium times expected… | formula | tagged | Bornhuetter-Ferguson Method: “$$U_{\text{BF}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) \times U_{0}$$” |
| Under the expected claims technique, ultimate claims equal earned premium times the expected claims ratio, ignoring reported claims to date. | formula | tagged | Expected Loss Method: “**Expected Loss Method** (expected claims technique) estimates ultimate losses entirely from an a p…” |
| A small, volatile book gives unstable, low-credibility development factors, so techniques relying on its own development pattern are unreli… | fact | tagged | Expected Loss Method: “Its virtue is **stability**: the estimate does not move with a thin diagonal, so a single early lar…” |

</details>

<details><summary><code>cas5-2018f-q17</code> · answerable</summary>

Tagged pages: Frequency-Severity Method, On Level Premium, Loss Trend, Policy Provision Changes

| Item | Kind | Status | Where |
|---|---|---|---|
| Ultimate claims under the frequency-severity technique equal selected frequency (claim counts per exposure) times exposure times selected u… | formula | tagged | Frequency-Severity Method: “$$U = \text{Exposures} \times \text{Frequency}_{\text{ult}} \times S_{\text{ult}}$$” |
| When premium is used as the exposure base, restate historical earned premium to the current rate level by multiplying by the on-level adjus… | procedure | tagged | On Level Premium: “$$\text{On-Level Premium} = \text{Historical EP} \times \text{On-Level Factor}$$” |
| Trend ultimate claim counts (frequency) and ultimate severities separately for each accident year, using compounded annual trend factors ov… | procedure | tagged | Loss Trend: “$$\text{Trend Factor} = (1 + t)^{n}$$” |
| Adjust historical severities for a legislative (tort) change by applying the savings factor (one minus the savings) to periods before the c… | procedure | tagged | Loss Trend: “A benefit-level change is restated in the data, or allowed for in the selection, so that it is not …” |
| To move a selected frequency or severity from the target year level back to an earlier accident year, detrend it by dividing by one plus th… | procedure | syllabus | Rate Level Change: “$$\text{Adjusted ELR}_i = \text{ELR}_{\text{base}} \times \frac{\text{Rate level}_{\text{base}}}{\t…” |
| Frequency-severity techniques assume claim counts are defined and reported consistently over time (a stable claim count definition), so pas… | fact | tagged | Frequency-Severity Method: “The method needs **consistent count definitions** across the whole triangle” |
| Frequency-severity techniques assume the claim settlement rate and case reserve adequacy are stable and the business mix is homogeneous, so… | fact | linked | Case Adequacy: “A *change* in adequacy over calendar time is one of the two distortions ([[Settlement Rate\\|settlem…” |

</details>

<details><summary><code>cas5-2018f-q18</code> · answerable</summary>

Tagged pages: Cape Cod Method, Loss Development, Mix of Business, Expected Loss Method, Changing Conditions

| Item | Kind | Status | Where |
|---|---|---|---|
| An age-to-age development factor is the ratio of cumulative reported claims at one maturity to cumulative reported claims at the prior matu… | formula | linked | Age to Age Factor: “**Age-to-Age Factor** (link ratio) is the ratio of a cohort's cumulative amount at one maturity to …” |
| The cumulative development factor (CDF) to ultimate for a maturity is the product of the selected age-to-age factors from that maturity thr… | formula | tagged | Loss Development: “$$\text{CDF}_{n \to \text{ult}} = \prod_{k \ge n} f_{k \to k+1} \times \text{Tail}$$” |
| Used-up premium for an accident year equals its earned premium multiplied by the percent reported (1/CDF to ultimate). | formula | tagged | Cape Cod Method: “**Used-up premium** $\text{EP}_i / \text{CDF}_i$ is the share of each year's premium "exposed" to t…” |
| The Cape Cod expected claims ratio equals total reported claims across all accident years divided by total used-up premium. | formula | tagged | Cape Cod Method: “The ELR is estimated as total reported losses over total *used-up* (on-level, developed) premium ac…” |
| Cape Cod ultimate claims equal reported claims plus expected unreported claims, where expected unreported claims = premium × expected claim… | procedure | tagged | Cape Cod Method: “$$\text{IBNR}_i = \text{ELR} \times \text{EP}_i \times \left(1 - \tfrac{1}{\text{CDF}_i}\right)$$” |
| A change in the mix of business that speeds up claim reporting lowers the observed development factors, so selected factors that include ol… | fact | tagged | Mix of Business: “If the segments have different emergence patterns, the blended development factors drift as the wei…” |
| In the Cape Cod method, CDFs that are too high understate the percent reported and used-up premium, which overstates the expected claims ra… | fact | tagged | Cape Cod Method: “The cost is that the estimate is no longer independent of the data: a systematically distorted tria…” |

</details>

<details><summary><code>cas5-2018f-q19</code> · answerable</summary>

Tagged pages: Loss Reserving, IBNR, Loss Development, Expected Loss Method, Cape Cod Method, Mix of Business, Changing Conditions

| Item | Kind | Status | Where |
|---|---|---|---|
| The development (chain ladder) technique estimates ultimate claims by multiplying reported claims by the cumulative development factor (CDF… | procedure | tagged | IBNR: “$$\text{IBNR} = \text{Ultimate} - \text{Reported}$$” |
| The development technique assumes the historical development pattern still applies; if reporting speeds up (operational change) and the fac… | fact | tagged | Changing Conditions: “Every development-based estimate of [[Unpaid Claims\\|unpaid claims]] assumes the past pattern will …” |
| The development technique is sensitive to the level of reported claims, so a shift in mix producing higher reported claims in recent years … | fact | tagged | Mix of Business: “In **reserving**, a mix shift breaks the [[Homogeneity\\|homogeneity]] assumption behind the [[Devel…” |
| The expected claims technique estimates ultimate claims as premium times an a priori expected claims ratio, with IBNR equal to ultimate min… | procedure | tagged | IBNR: “the [[Expected Loss Method\\|expected claims]] technique by subtracting reported from an a priori ul…” |
| The expected claims technique is unaffected by changes in reporting pattern when the pattern is only used for percent unreported, and a mix… | fact | tagged | Expected Loss Method: “Its virtue is **stability**: the estimate does not move with a thin diagonal, so a single early lar…” |
| The Cape Cod technique computes the expected claims ratio as total reported claims divided by total used-up premium (premium divided by CDF… | procedure | tagged | Cape Cod Method: “The ELR is estimated as total reported losses over total *used-up* (on-level, developed) premium ac…” |
| With overstated CDFs, Cape Cod understates used-up premium (raising the expected claims ratio) and overstates the percent unreported, so IB… | fact | tagged | Cape Cod Method: “The cost is that the estimate is no longer independent of the data: a systematically distorted tria…” |

</details>

<details><summary><code>cas5-2018f-q2</code> · answerable</summary>

Tagged pages: Ratemaking Data Organization, Earned Premium, Policy Year, Loss Ratio, Calendar Year

| Item | Kind | Status | Where |
|---|---|---|---|
| Calendar year earned premium is the premium earned during the calendar year, found by earning each policy's premium pro rata over the porti… | definition | tagged | Earned Premium: “$$\text{EP for one policy} = \text{Full premium} \times \frac{\text{days elapsed}}{\text{policy ter…” |
| A full-term premium for a mid-term endorsement is earned only over the period from the endorsement effective date to the policy expiration,… | procedure | linked | Premium Accounting: “Additional premium for an endorsement is recorded on the endorsement's effective date and earned in…” |
| A cancellation effective after the end of the calendar year does not affect that calendar year's earned premium, since the policy is still … | fact | tagged | Earned Premium: “the portion of premium corresponding to coverage the insurer has actually provided — the premium it…” |
| Policy year groups together all policies by their effective date within the year, so a policy year contains only policies written (effectiv… | definition | tagged | Earned Premium: “**Policy year** earned premium comes from one cohort only, and is fully earned $24$ months after th…” |
| Policy year losses include all losses from accidents on policies effective in that year, regardless of when they occur or are paid, as long… | procedure | tagged | Ratemaking Data Organization: “**[[Policy Year]]** — every transaction on policies incepting in the year.” |
| For a canceled policy, policy year premium is the full-term premium prorated to the portion of the term the policy was in force before canc… | procedure | linked | Unearned Premium: “Cancellation returns the unearned portion. **Pro rata** cancellation returns the full unearned prem…” |
| Loss ratio equals losses divided by premium, where for a policy year evaluation, the premium is the fully earned premium of that policy yea… | formula | tagged | Earned Premium: “Earned premium is the usual denominator of a [[Loss Ratio\\|loss ratio]]” |

</details>

<details><summary><code>cas5-2018f-q20</code> · answerable</summary>

Tagged pages: Berquist-Sherman Method, Case Adequacy, Case Reserves, Loss Development, Data Diagnostic Analysis

| Item | Kind | Status | Where |
|---|---|---|---|
| Average case outstanding per open claim is case outstanding divided by the number of open claims at the same evaluation date; the triangle … | definition | tagged | Case Adequacy: “$$\text{Avg Case Outstanding} = \frac{\text{Case Reserves}}{\text{Open Claim Counts}}$$” |
| If average case outstanding per open claim down a column (same maturity) rises faster than the selected severity trend, the excess indicate… | fact | tagged | Case Adequacy: “It should grow at roughly the severity trend. A jump concentrated on one **diagonal**, appearing at…” |
| To restate average case outstanding, take the latest diagonal as the current adequacy level and de-trend each value backward along its colu… | procedure | tagged | Berquist-Sherman Method: “3. **Trend the latest diagonal's** average case outstanding backwards at $t$ to restate each histor…” |
| Adjusted case outstanding equals adjusted average case outstanding times open claim count, and adjusted reported claims equal cumulative pa… | formula | tagged | Berquist-Sherman Method: “4. Multiply the restated averages by the open claim counts to get adjusted case reserves, add paid,…” |
| Compute age-to-age factors from the adjusted reported triangle, select factors (e.g., average or weighted average), multiply them with the … | procedure | linked | Cumulative Development Factor: “$$\text{CDF}_{n \to \text{ult}} = \left(\prod_{k \ge n} f_{k \to k+1}\right) \times \text{Tail}$$” |
| When case reserve adequacy has strengthened, unadjusted reported development factors are distorted upward (historical case reserves were we… | fact | tagged | Case Adequacy: “Applying historical factors — built under weaker reserving — to a strengthened diagonal **over-stat…” |
| A limitation of the Berquist-Sherman case outstanding adjustment is that results are highly sensitive to the judgmentally selected severity… | fact | tagged | Berquist-Sherman Method: “The adjustments are **large and judgment-laden** — the severity trend and the target disposal patte…” |

</details>

<details><summary><code>cas5-2018f-q21</code> · answerable</summary>

Tagged pages: Salvage and Subrogation, Loss Development, Paid Losses, Ultimate Loss

| Item | Kind | Status | Where |
|---|---|---|---|
| The S&S ratio at a given maturity is cumulative received salvage and subrogation divided by cumulative paid claims gross of S&S at that sam… | definition | syllabus | Recoveries (collapsed): “Auto physical damage. Historical ratios of cumulative received S&S to cumulative paid claims settle…” |
| Develop the S&S ratios by computing age-to-age factors of the ratios between successive maturities, selecting a factor for each interval (e… | procedure | linked | Tail Factor: “A tail of exactly $1.000$ is itself an assumption — that development is complete — and it is the wr…” |
| The cumulative development factor to ultimate at a given age is the product of the selected age-to-age factors from that age through the fi… | formula | tagged | Loss Development: “$$\text{CDF}_{n \to \text{ult}} = \prod_{k \ge n} f_{k \to k+1} \times \text{Tail}$$” |
| Estimate the ultimate S&S ratio for each accident year by multiplying its latest diagonal ratio by the CDF to ultimate for its age. | procedure | syllabus | Recoveries (collapsed): “\text{Ultimate ratio} &= 0.0950 \times 1.137 = 0.1080” |
| Select the ultimate S&S ratio for the immature year using judgment: an indication that is out of line with mature years because a highly le… | procedure | syllabus | Recoveries (collapsed): “Absent a reason, a selection near the historical level is typical” |
| Ultimate S&S for an accident year equals the selected ultimate S&S ratio times the accident year's selected ultimate claims gross of S&S. | formula | syllabus | Recoveries (collapsed): “\text{Ultimate S\&S} &= 0.1080 \times \$12{,}000{,}000 = \$1{,}296{,}000” |

</details>

<details><summary><code>cas5-2018f-q22</code> · answerable</summary>

Tagged pages: Unallocated Loss Adjustment Expenses ULAE, IBNR, Unpaid Claims, Case Reserves

| Item | Kind | Status | Where |
|---|---|---|---|
| IBNYR (pure IBNR) is the provision for claims that have occurred but have not yet been reported, as distinct from case outstanding and IBNE… | definition | tagged | IBNR: “**Pure IBNR** (narrow IBNR) covers claims that have occurred but are unknown to the insurer.” |
| IBNYR for an accident year equals ultimate claims times (1 minus reported claim counts divided by ultimate claim counts), i.e. unreported c… | formula | tagged | IBNR: “develop counts to ultimate, subtract reported counts to get unreported claims, and value them at an…” |
| Total unpaid claims for an accident year equal ultimate claims minus paid claims, and this total equals case outstanding plus IBNER plus IB… | formula | tagged | Unpaid Claims: “$$\text{Unpaid} = \text{Ultimate} - \text{Paid to date}$$” |
| In the classical (Wendy Johnson) ULAE method, estimate the ULAE ratio as calendar-year paid ULAE divided by calendar-year paid claims, usin… | procedure | tagged | Unallocated Loss Adjustment Expenses ULAE: “Compute the ratio $R$ of calendar-year paid ULAE to calendar-year paid loss, review it for trend, a…” |
| Under the classical ULAE method, the assumed split of ULAE work (opening vs closing) determines the weights: claims not yet reported (IBNYR… | fact | tagged | Unallocated Loss Adjustment Expenses ULAE: “If ULAE is assumed to be spent half at reporting and half at settlement, only $50\%$ remains on rep…” |
| Unpaid ULAE = ULAE ratio × [IBNYR + closing percentage × (case outstanding + IBNER)]. | formula | tagged | Unallocated Loss Adjustment Expenses ULAE: “$$\text{ULAE Reserve} = R \times \left(0.5 \times \text{Case} + 1.0 \times \text{IBNR}\right)$$” |

</details>

<details><summary><code>cas5-2018f-q23</code> · gap</summary>

Tagged pages: Allocated Loss Adjustment Expense, Loss Development, Paid Losses, Calendar Year

| Item | Kind | Status | Where |
|---|---|---|---|
| Update a cumulative paid triangle's latest diagonal by adding each accident year's calendar-year payments to its prior cumulative value at … | procedure | missing |  |
| In the additive ratio approach, build a triangle of cumulative paid ALAE divided by cumulative paid claims for each accident year and age. | procedure | tagged | Allocated Loss Adjustment Expense: “Friedland gives three approaches: develop a **combined** loss-and-ALAE triangle, develop **ALAE sep…” |
| Additive development factors are the differences between successive-age ALAE-to-claims ratios, and are cumulated by summing selected differ… | formula | missing |  |
| The projected ultimate ALAE-to-claims ratio equals the current ratio plus the age-to-ultimate additive factor. | formula | missing |  |
| Estimate ultimate claims with the paid development (chain ladder) method: select age-to-age factors, multiply them into a cumulative develo… | procedure | linked | Chain Ladder Method: “**The procedure:** build the cumulative [[Development Triangle\\|triangle]] → compute [[Age to Age F…” |
| Ultimate ALAE under the ratio approach is the projected ultimate ALAE-to-claims ratio multiplied by the estimated ultimate claims (not by p… | procedure | tagged | Allocated Loss Adjustment Expense: “develop a **ratio of ALAE to loss** and apply it to projected losses.” |
| A disadvantage of ratio techniques for ALAE is that the ALAE estimate depends on the accuracy of the ultimate claims estimate, and the rati… | fact | tagged | Allocated Loss Adjustment Expense: “Combining is simplest and is the usual choice, but it assumes ALAE develops like indemnity. It ofte…” |

</details>

<details><summary><code>cas5-2018f-q24</code> · gap</summary>

Tagged pages: Actual vs Expected Analysis, Roll Forward Analysis, Loss Development, Case Adequacy, Ultimate Loss, Reasonableness Testing

| Item | Kind | Status | Where |
|---|---|---|---|
| The percent reported (or percent paid) at an age equals the reciprocal of the cumulative reported (or paid) development factor to ultimate … | definition | tagged | Reasonableness Testing: “$p_t = 1/\text{CDF}_t$ is the expected percentage reported (or paid) at age $t$.” |
| To get the expected pattern at an age between evaluation points, assume linear emergence and linearly interpolate the percent reported/paid… | procedure | missing |  |
| Expected incremental emergence over a period equals the unreported (or unpaid) amount at the start (selected ultimate minus actual reported… | procedure | tagged | Actual vs Expected Analysis: “$$\text{Expected emergence} = U_{\text{prior}} \times \left(\frac{1}{\text{CDF}_{n+1}} - \frac{1}{\…” |
| Expected cumulative reported/paid claims equal the latest actual cumulative amount plus the expected incremental emergence, and this is com… | procedure | tagged | Reasonableness Testing: “$$\text{Expected emergence} = \text{IBNR} \times \frac{p_{t+\Delta} - p_t}{1 - p_t}$$” |
| The selected ultimate should be revised when actual-versus-expected variance reflects genuinely more claim dollars, such as a large loss or… | fact | missing |  |
| Reported claims exceeding expectation while paid claims track expectation can result from case reserve strengthening, which changes timing … | fact | tagged | Case Adequacy: “**Strengthening** raises reported losses immediately, so recent age-to-age factors fall (more of th…” |

</details>

<details><summary><code>cas5-2018f-q3</code> · answerable</summary>

Tagged pages: On Level Premium, On-Leveling, Rate Change, Classification Ratemaking, Parallelogram Method, Extension of Exposures

| Item | Kind | Status | Where |
|---|---|---|---|
| The parallelogram method computes the average rate level for a calendar year by weighting each rate level by the portion of the year's earn… | procedure | tagged | On-Leveling: “each region's **area** is the share of the year's earned premium written at that rate level.” |
| With policies of term length m (in years) and uniform writing, a rate change effective at time t within the year is fully earned after m ye… | fact | tagged | On-Leveling: “For **annual** policies written uniformly, a rate change effective at time $p$ through year $Y$ ear…” |
| The on-level factor equals the current cumulative rate level divided by the average rate level for the period, where the cumulative rate le… | formula | tagged | On Level Premium: “\text{On-Level Factor} = \frac{\text{Current cumulative rate level index}}{\text{Average rate level…” |
| The extension of exposures method computes the on-level factor for a policy or class by recalculating premium at current rates (base rate t… | procedure | tagged | Extension of Exposures: “$\mathbf{x}_j$ is policy $j$'s set of rating characteristics (class, territory, limit, deductible, …” |
| The parallelogram method uses the overall average rate change at the aggregate level and cannot capture rate changes that differ across cla… | fact | tagged | On-Leveling: “where the rate changes varied by class the on-level premium is unusable for classification ratemaki…” |

</details>

<details><summary><code>cas5-2018f-q4</code> · answerable</summary>

Tagged pages: Claims Made Coverage, Occurrence Coverage, IBNR, Report Year

| Item | Kind | Status | Where |
|---|---|---|---|
| A claims-made policy covers all claims reported during the policy period, regardless of when the loss occurred, so its report-year loss cos… | definition | tagged | Claims Made Coverage: “**Claims-Made Coverage** is a policy trigger under which the policy responds to claims *reported* d…” |
| An occurrence policy covers all claims occurring during the policy period regardless of when they are reported, so its accident-year loss c… | definition | tagged | Claims Made Coverage: “in Werner's report-year-by-lag table a claims-made policy is a row, where an occurrence policy is a…” |
| An occurrence policy has a longer development period than a claims-made policy because it is exposed to both report lag and settlement lag,… | fact | tagged | Claims Made Coverage: “If there is a sudden, unpredictable change in the underlying trends, the claims-made policy priced …” |
| IBNR consists of pure IBNR (IBNYR: losses incurred but not yet reported) and IBNER (losses reported but not yet adequately valued). | definition | tagged | IBNR: “**Pure IBNR** (narrow IBNR) covers claims that have occurred but are unknown to the insurer.” |
| A claims-made policy has no pure IBNR because all covered claims are reported by the end of the policy period, so reserve inadequacy risk i… | fact | tagged | Claims Made Coverage: “Because the trigger is the report date, a claims-made policy has **no pure IBNR** — only IBNER on c…” |
| A claims-made policy has a shorter time between premium collection and claim payment, so premium is invested for less time and earns less i… | fact | tagged | Claims Made Coverage: “The investment income earned from claims-made policies is substantially less than under occurrence …” |

</details>

<details><summary><code>cas5-2018f-q5</code> · gap</summary>

Tagged pages: Loss Trend, Trend, Frequency, Severity, Exponential Trend, Underwriting Changes

| Item | Kind | Status | Where |
|---|---|---|---|
| When no loss development occurs after a given maturity, losses at or beyond that maturity are already ultimate and need no development fact… | fact | missing |  |
| The future trend period runs from the average accident date of the historical experience period to the average accident (loss) date of the … | procedure | tagged | Loss Trend: “$t$ is the selected annual trend and $n$ the **trend period**, measured from the average date of lo…” |
| The average written date of the future period is the rate effective date plus half the period rates remain in effect (policy term excluded)… | procedure | tagged | Loss Trend: “The first policy is exposed $7/1/2025$–$6/30/2026$ and the last $7/1/2026$–$6/30/2027$, so the expo…” |
| Exponential trend is applied as (1 + annual trend) raised to the trend period in years, and the total projected loss equals the loss multip… | procedure | tagged | Loss Trend: “$$\text{Trend Factor} = (1 + t)^{n}$$” |
| Pure premium trend equals the product of (1 + frequency trend) and (1 + severity trend) minus 1, so one can trend with pure premium directl… | fact | tagged | Loss Trend: “$$1 + t_{PP} = (1 + t_{\text{freq}})(1 + t_{\text{sev}})$$” |
| When an event such as an underwriting change materially alters the book's composition, use a two-step trend: a longer-term trend before the… | procedure | linked | Premium Trend: “**Two-step trending** is used when the recent history contains a shift the historical fit would und…” |
| When a trend is consistent across different point selections, a single trend can be selected for the whole period; when trends vary across … | fact | tagged | Loss Trend: “exponential models may be fit to the whole of the data and to more recent periods, supplemented wit…” |

</details>

<details><summary><code>cas5-2018f-q6</code> · gap</summary>

Tagged pages: Expense Provisions, Fixed Expenses, Variable Expenses, Exposure Base

| Item | Kind | Status | Where |
|---|---|---|---|
| In expense provisioning, each expense category (commissions, taxes/licenses/fees, general, other acquisition) is first separated into fixed… | procedure | tagged | Fixed Expenses: “Ideally detailed expense data or activity-based cost studies make the split; otherwise it is genera…” |
| Variable expenses are divided by premium (written premium if incurred at policy writing, e.g. commissions; earned premium if incurred over … | procedure | tagged | Variable Expenses: “Because commissions and taxes attach when a policy is **written**, these ratios are computed agains…” |
| In the premium-based projection method, fixed expenses are also divided by premium to give a fixed expense ratio to premium, which can be a… | procedure | tagged | Expense Provisions: “A fixed expense *ratio* (premium-based method) needs none if average fixed expense and average prem…” |
| In the exposure-based projection method, fixed expenses are divided by exposures (written if incurred at inception, earned if incurred over… | procedure | tagged | Fixed Expenses: “The fixed dollars are then put per exposure either by multiplying the fixed expense ratio by the pr…” |
| Expense ratios or per-exposure amounts are computed for each historical year, and a selection representative of future expense levels is ma… | procedure | missing |  |
| The premium-based method distorts fixed expense ratios when rates change, since premium changes without a change in dollar expense, and it … | fact | tagged | Fixed Expenses: “Loading fixed expenses as a percentage of premium instead — the **all-variable expense method** — u…” |
| The exposure-based method can be distorted by economies of scale as the book grows or shrinks, by exposures trending differently than expen… | fact | missing |  |

</details>

<details><summary><code>cas5-2018f-q7</code> · answerable</summary>

Tagged pages: Frequency-Severity Method, Overall Rate Level Indication, Pure Premium Method, Reinsurance

| Item | Kind | Status | Where |
|---|---|---|---|
| Net reinsurance cost is the expected ceded premium (cost of reinsurance) less expected reinsurance recoveries. | definition | tagged | Reinsurance: “includes the **net cost of reinsurance** (the cost of the reinsurance minus the expected recoveries…” |
| To get net reinsurance cost per exposure, divide the net cost by the exposures projected from the latest year's exposures to the reinsuranc… | procedure | tagged | Pure Premium Method (collapsed): “\text{Trended exposures} &= 5{,}000 \times 1.01^{2.5}” |
| In the frequency-severity development technique, build triangles of reported claim counts and of severity (reported loss and ALAE divided b… | procedure | tagged | Frequency-Severity Method: “Develop the count triangle to ultimate counts; develop an average severity triangle (dollars ÷ coun…” |
| Ultimate loss and ALAE equals ultimate claim count (reported count times count CDF) times ultimate severity (reported severity times severi… | formula | tagged | Frequency-Severity Method: “U = N_{\text{ult}} \times S_{\text{ult}}” |
| Loss trend periods run from the midpoint of each historical accident year to the average loss date of the future policy period; for annual … | procedure | linked | Loss Trend: “$t$ is the selected annual trend and $n$ the **trend period**, measured from the average date of lo…” |
| Compute the projected pure premium by trending each accident year's ultimate loss per earned exposure (exposures not trended) at the pure p… | procedure | tagged | Overall Rate Level Indication: “Weighting across years in the experience period is a judgment: many companies sum projected losses …” |
| Indicated average premium = [pure premium × (1 + ULAE ratio) + fixed expense per exposure + net reinsurance cost per exposure] / (1 − varia… | formula | tagged | Pure Premium Method: “\text{Indicated Rate} = \frac{\text{Pure Premium} + F}{1 - V - Q_T}” |
| Indicated rate change equals indicated average premium divided by current on-level projected average premium per exposure, minus 1. | formula | tagged | Overall Rate Level Indication: “\text{Indicated Change} = \frac{\text{Indicated Rate}}{\text{Current Rate}} - 1” |

</details>

<details><summary><code>cas5-2018f-q8</code> · gap</summary>

Tagged pages: Considerations for Implementing Rates, Ratemaking Constraints, Underwriting Changes, Mix of Business, Non-Pricing Solutions

| Item | Kind | Status | Where |
|---|---|---|---|
| A large rate increase relative to competitors' prices lowers policyholder retention (renewal ratio) and new business close (hit) ratio, shr… | fact | tagged | Ratemaking Constraints: “Past some price the business lost outweighs the higher price on what remains, and rate changes them…” |
| An insured's propensity to renew depends on factors such as the size of the rate change at renewal, price relative to competitors, claim ha… | fact | tagged | Ratemaking Constraints: “Past some price the business lost outweighs the higher price on what remains, and rate changes them…” |
| A company can protect profitability without changing rates by reducing expenses such as commissions, marketing and overhead. | fact | tagged | Considerations for Implementing Rates: “reducing **expenses** — fixed or variable;” |
| A company can improve its expected loss ratio without a rate change by tightening underwriting guidelines, writing fewer high-risk exposure… | fact | tagged | Considerations for Implementing Rates: “tightening **underwriting** criteria or non-renewing policies whose premium is grossly inadequate;” |
| Improving claims handling, such as using more experienced adjusters and controlling claim leakage, reduces loss dollars paid and supports p… | fact | elsewhere | Claims Handling: “to support the insurer's profit goal by paying no more than the policy owes and controlling the cos…” |
| Comparing average premiums across companies is distorted by differences in mix of business, such as risk profiles, coverage levels, limits,… | fact | tagged | Mix of Business: “A shift in the mix changes aggregate results even when nothing about any individual segment has cha…” |
| To compare premiums fairly across companies, hold risk characteristics fixed by obtaining competitor quotes for representative risk profile… | procedure | missing |  |

</details>

<details><summary><code>cas5-2018f-q9</code> · gap</summary>

Tagged pages: Generalized Linear Model, Classification Ratemaking, Loss Ratio

| Item | Kind | Status | Where |
|---|---|---|---|
| The statistical (chi-square/p-value) test judges a GLM variable's significance: if the p-value is above the significance threshold (commonl… | procedure | elsewhere | Statistical Significance: “A 5% threshold admits roughly one useless variable in twenty when many are tried, and the monograph…” |
| The main effect test examines the GLM standard error bounds around each level's indicated relativity: if the bounds include 1.0 (the base) … | procedure | elsewhere | Statistical Significance (collapsed): “**Class C** has $p = 0.17$. Its relativity is $1.10$ with interval $[0.96, 1.26]$, which includes $…” |
| The consistency test compares GLM-indicated relativities across time periods (e.g., years); a variable passes only if the indications move … | procedure | missing |  |
| Judgment is the final test of a variable; low exposure at levels with extreme indications explains wide error bounds and inconsistency, and… | fact | elsewhere | Variable Selection: “Variable selection should combine statistical significance (from the [[Parameter Estimate Tables\\|p…” |
| Modeling loss ratios in a GLM requires premium to be on-leveled to current rate level, otherwise the model reflects past rate changes rathe… | fact | linked | Loss Ratio Method: “It works entirely in ratios, so it needs premium on level rather than exposure counts.” |
| Loss ratios have no natural error distribution or a priori expected shape (unlike Poisson-family for frequency and Gamma for severity), mak… | fact | missing |  |
| A GLM fitted to loss ratios is tied to the rate level during the experience period and becomes obsolete when rates change, unlike a pure pr… | fact | syllabus | On Level Premium: “The [[Pure Premium Method]] needs no on-levelling at all, because it never divides by premium. That…” |
| Univariate analysis can be preferable to GLM because it is simpler and more transparent to explain to management, underwriters and regulato… | fact | missing |  |

</details>

<details><summary><code>cas5-2018s-q1</code> · answerable</summary>

Tagged pages: Exposure Base, Earned Exposure, Policy Year, Calendar Year

| Item | Kind | Status | Where |
|---|---|---|---|
| Written exposures are the exposures on policies recorded when the policy is written (or when a mid-term change takes effect), attributed to… | definition | tagged | Earned Exposure: “A $12$-month policy contributes **one** earned car-year in total, spread pro rata over its term: wr…” |
| Earned exposures are the portion of exposure for which coverage has actually been provided during the period, equal to exposure multiplied … | definition | tagged | Earned Exposure: “**Earned Exposure** is the portion of written exposure for which coverage has actually been provide…” |
| Policy year exposures include all transactions on policies effective in that policy year, but only those transactions that have occurred by… | procedure | tagged | Policy Year: “With annual policies a PY cohort is not fully written until $12$ months after the year begins and n…” |
| A good exposure base should satisfy three criteria: it is proportional to expected loss, it is practical, and it has historical precedence. | fact | tagged | Exposure Base: “All else equal, a policy with two exposures should have twice the expected loss of a similar policy…” |
| An exposure base is practical if it is objectively defined, easy and inexpensive to obtain and verify, and not subject to manipulation by t… | fact | tagged | Exposure Base: “**Practical.** Objective, and relatively easy and inexpensive to obtain and verify — which also kee…” |
| Historical precedence means that changing the exposure base from the one currently used would cause system and rating algorithm costs, prem… | fact | tagged | Exposure Base: “**Consistent with historical precedence.** A change of base can cause large premium swings for indi…” |

</details>

<details><summary><code>cas5-2018s-q10</code> · gap</summary>

Tagged pages: Rating Variable, Classification Ratemaking, Risk Classifications

| Item | Kind | Status | Where |
|---|---|---|---|
| Operational criteria for evaluating a rating variable are practical considerations for the insurer, including objective definition, verifia… | definition | tagged | Rating Variable: “It should be objective and hard to manipulate, practical to collect and verify, and legal ([[Risk C…” |
| Social criteria for evaluating a rating variable are considerations of public acceptability, including causality, controllability, affordab… | definition | tagged | Classification Ratemaking: “**Social** — privacy, causality, controllability and affordability; these are where public and regu…” |
| A rating variable satisfies the objective definition criterion when its categories are clear and unambiguous, so that different people clas… | fact | missing |  |
| A rating variable should be verifiable by the insurer, because a variable the insured can misreport gives an incentive to manipulate it to … | fact | tagged | Rating Variable: “The insured reports the figure, has every reason to under-report it, and the insurer cannot cheaply…” |
| A rating variable is more acceptable to the public when it has an intuitive causal relationship to losses rather than only a statistical co… | fact | tagged | Rating Variable: “It must be statistically related to expected losses; a causal story strengthens the case, but ASOP …” |
| A variable is controllable if the insured can change it to reduce their risk and premium; a variable that is costly to change or does not a… | fact | missing |  |

</details>

<details><summary><code>cas5-2018s-q11</code> · answerable</summary>

Tagged pages: Adverse Selection, Classification Ratemaking

| Item | Kind | Status | Where |
|---|---|---|---|
| Adverse selection in insurance pricing occurs when a company's rates are too low for high-risk insureds relative to competitors, so it attr… | definition | tagged | Adverse Selection: “**Adverse Selection** is the tendency for those who know they are worse-than-average risks to buy m…” |
| Price-shopping insureds in each risk class move to the company charging the lower rate for that class, so the shifted count is the shopping… | procedure | tagged | Adverse Selection: “Price at the population average; low risks find the price poor value and leave; the remaining pool …” |
| A company's underwriting profit equals the sum over risk classes of the number of insureds times (charged rate minus true expected cost), w… | formula | syllabus | Underwriting Profit: “$$\text{UW Profit} = \text{EP} - \text{Losses} - \text{LAE} - \text{UW Expenses}$$” |
| A company suffering adverse selection can reduce insolvency risk by refining its rate classification to charge each class a rate closer to … | fact | tagged | Adverse Selection: “[[Risk Classification Restrictions\\|risk classification]] (price to the risk, so nobody is overchar…” |
| A company suffering adverse selection can tighten underwriting to decline or restrict high-risk applicants, or shift marketing toward low-r… | fact | tagged | Adverse Selection: “underwriting and medical or inspection requirements” |

</details>

<details><summary><code>cas5-2018s-q12</code> · gap</summary>

Tagged pages: Pure Premium Method, Classification Ratemaking, Complement of Credibility, Full Credibility Standard

| Item | Kind | Status | Where |
|---|---|---|---|
| The pure premium for a class is its reported loss and ALAE divided by its earned exposures, and the indicated relativity is the class pure … | formula | tagged | Classification Ratemaking: “\text{Relativity}_i = \frac{\text{Pure Premium}_i}{\text{Pure Premium}_{\text{base}}}” |
| Square root rule for partial credibility: Z = sqrt(actual exposures / full credibility standard), capped at 1. | formula | linked | Limited Fluctuation Credibility: “Z = \min\!\left(1,\, \sqrt{\frac{n}{n_{\text{full}}}}\right)” |
| Normalize current relativities by dividing each by the exposure-weighted average current relativity, so they are on the same basis as the i… | procedure | missing |  |
| The credibility-weighted relativity is Z times the indicated relativity plus (1 - Z) times the complement (normalized current relativity); … | procedure | tagged | Complement of Credibility: “\text{Estimate} = Z \times \text{Experience} + (1 - Z) \times \text{Complement}” |
| Off-balance factor for revenue neutrality equals total premium at current relativities (exposures times current relativity) divided by tota… | procedure | elsewhere | Balancing Back: “\text{OBF} = \frac{\sum_i w_i\, r_i^{\text{old}}}{\sum_i w_i\, r_i^{\text{new}}}” |
| The univariate pure premium method assumes exposures in each class are uniformly distributed across the other rating variables; if not, the… | fact | tagged | Classification Ratemaking: “A **univariate** (one-way) pure premium or loss ratio analysis attributes to a variable the effect …” |
| The adjusted pure premium approach divides class losses by exposures adjusted by the exposure-weighted average relativity of the other rati… | procedure | elsewhere | Balancing Back: “When other rating variables also apply, each class's exposures are first multiplied by their averag…” |

</details>

<details><summary><code>cas5-2018s-q13</code> · gap</summary>

Tagged pages: Generalized Linear Model, Rating Factors, Model Diagnostics, External Data

| Item | Kind | Status | Where |
|---|---|---|---|
| Assess GLM relativity credibility from diagnostic charts by comparing exposure volume at each level and the width of the standard-error bou… | procedure | missing |  |
| When a GLM estimate for a level is credible (large exposure, tight standard errors), rely on the internal GLM relativity over external sour… | fact | syllabus | External Information in Reserving: “The usual application is a credibility-weighted selection: $\hat{U} = Z \cdot U_{\text{internal}} +…” |
| When internal GLM results for a level are not credible, rely on external information such as a competitor's factors or an industry benchmar… | procedure | syllabus | Complement of Credibility: “When $Z$ is low — a small class, a new territory, an excess layer — the complement, not the data, d…” |
| Competitor rate filing factors are useful as a reasonableness check and a fallback source because they come from a similar line and market,… | fact | missing |  |
| Industry benchmark factors reflect the average mix of the whole industry rather than the company's own book, so they receive less weight th… | fact | syllabus | External Information in Reserving: “A development pattern far outside the industry range, or a loss ratio that diverges persistently fr…” |
| Validate a selected factor by checking that its direction and magnitude are consistent with the GLM's standard-error range and with competi… | procedure | syllabus | External Information in Reserving: “A development pattern far outside the industry range, or a loss ratio that diverges persistently fr…” |

</details>

<details><summary><code>cas5-2018s-q14</code> · answerable</summary>

Tagged pages: Coinsurance Rating, Coinsurance, Insurance to Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The coinsurance requirement is the required percentage of the property's value that must be insured; a policy with insured value below this… | definition | tagged | Coinsurance Rating: “the property **coinsurance clause**, which penalizes an insured who carries limits below a required…” |
| When the insured amount is below the coinsurance requirement, the indemnity is the loss times (insured amount / required amount), capped at… | formula | tagged | Coinsurance Rating: “$$\text{Recovery}_{\text{clause}} = \min\!\left(\frac{\text{Insurance Carried}}{\text{Coinsurance \…” |
| The coinsurance penalty is the amount the insured would have received without the coinsurance clause (loss capped at the face value) minus … | definition | tagged | Coinsurance (collapsed): “With at least \$450,000 of insurance the insurer would have paid \$79,000, so the penalty costs the…” |
| No coinsurance penalty applies to losses at or above the coinsurance requirement, because the capped indemnity equals the face value; the i… | fact | tagged | Insurance to Value (collapsed): “**Total losses:** The clause cannot raise the payment above the limit, and on a total loss the insu…” |
| Rates per unit of insurance assume insurance to value, and since most losses are partial, an underinsured policy produces nearly the same e… | fact | tagged | Coinsurance Rating: “Because most property losses are partial, an insured carrying $50\%$ of value would otherwise pay h…” |
| Underinsurance makes rates inequitable: insureds with equal values and expected losses pay different premiums, so fully insured policyholde… | fact | tagged | Coinsurance Rating (collapsed): “Without the clause, under-insuring would be free money on partial losses, and the rate per $\$1{,}0…” |

</details>

<details><summary><code>cas5-2018s-q15</code> · gap</summary>

Tagged pages: Experience Rating, Retrospective Rating, Workers Compensation Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| Expected losses equal the expected loss rate per $100 of payroll times payroll divided by 100. | formula | missing |  |
| The D-ratio is the proportion of expected losses that are expected primary losses; expected excess losses equal expected losses minus expec… | definition | missing |  |
| The experience rating modification is M = (Ap + w*Ae + (1-w)*Ee + B) / (E + B), where Ap and Ae are actual primary and excess losses, Ee is… | formula | tagged | Experience Rating: “$$M = \frac{A_p + wA_e + (1-w)E_e + B}{E_p + (1-w)E_e + B + wE_e} = \frac{A_p + wA_e + (1-w)E_e + B…” |
| The basic premium ratio in retrospective rating is the expense allowance minus (LCF - 1) times the expected loss ratio, plus LCF times (ins… | formula | tagged | Retrospective Rating: “$B = e - (c - 1)E + c\,[\phi(r_G) - \psi(r_H)]\,E$” |
| Retrospective premium equals (basic premium + loss conversion factor times limited reported losses) times the tax multiplier. | formula | tagged | Retrospective Rating: “$$R = \left(\text{BP} + L \times \text{LCF}\right) \times \text{TM}$$” |
| Minimum and maximum retrospective premiums equal the minimum and maximum premium ratios times standard premium, and the calculated retrospe… | procedure | tagged | Retrospective Rating: “$$\text{Retro Premium} = \min\!\left(\max(R,\, R_{\min}),\, R_{\max}\right)$$” |
| The experience rating modification factor is not used in the retrospective premium calculation, which is based on standard premium and limi… | fact | tagged | Experience Rating: “Order of application: schedule and experience modifications apply to the manual premium to give **s…” |

</details>

<details><summary><code>cas5-2018s-q16</code> · gap</summary>

Tagged pages: Reserving Data Organization, Accident Year, Case Reserves, Paid Losses

| Item | Kind | Status | Where |
|---|---|---|---|
| Accident year (calendar-year accident period) groups claims by the year in which the accident occurred, so claims with accident dates in ot… | definition | tagged | Reserving Data Organization: “**[[Accident Year]]** is the default reserving basis for direct business: claims grouped by occurre…” |
| Development ages for an accident year are measured from the start of the accident year on a common calendar basis, so 12 months is the end … | procedure | linked | Development Triangle: “**Development Triangle** is the fundamental data structure of reserving: cumulative amounts arrange…” |
| Paid claims as of an evaluation date are the cumulative sum of all payments made on or before that date. | definition | tagged | Paid Losses: “**Paid Losses** are the cumulative cash payments made on covered claims through a valuation date — …” |
| Reported (incurred) claims as of an evaluation date equal cumulative paid claims plus the case outstanding reserve at that date. | definition | tagged | Paid Losses: “$$\text{Reported Losses} = \text{Paid Losses} + \text{Case Reserves}$$” |
| The case outstanding at an evaluation date is the ending case outstanding from the claim's latest transaction on or before that date; if no… | procedure | missing |  |

</details>

<details><summary><code>cas5-2018s-q17</code> · answerable</summary>

Tagged pages: Bornhuetter-Ferguson Method, Development Factor

| Item | Kind | Status | Where |
|---|---|---|---|
| The Bornhuetter-Ferguson ultimate claims estimate equals reported claims plus expected claims times the percentage unreported (1 − 1/CDF). | formula | tagged | Bornhuetter-Ferguson Method: “$$U_{\text{BF}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) \times U_{0}$$” |
| Expected claims for an accident year equal the a priori expected claims ratio times earned premium, with premium adjusted to a common rate … | formula | tagged | Bornhuetter-Ferguson Method: “$C$ is reported (or paid) losses to date, $U_0 = \text{ELR} \times \text{EP}$ the a priori expectat…” |
| Estimate age-to-age development factors from a claims triangle as volume-weighted averages (sum of later-age cumulative claims over sum of … | procedure | tagged | Development Factor: “**Volume-weighted average**: $\Sigma(\text{col }n{+}1) / \Sigma(\text{col }n)$ — gives more credibi…” |
| Compute cumulative development factors to ultimate by multiplying age-to-age factors from the given age through the last age, including a t… | procedure | linked | Cumulative Development Factor: “CDFs are built **backwards from the tail**: start with the tail factor, multiply in each successive…” |
| The ultimate claim ratio is the ultimate claims divided by earned premium for the accident year. | definition | syllabus | Loss Ratio: “$$\text{Loss Ratio} = \frac{\text{Losses} + \text{LAE}}{\text{Earned Premium}}$$” |
| The Bornhuetter-Ferguson technique relies on the a priori expected claims ratio for the unreported portion, so it is appropriate only if th… | fact | tagged | Bornhuetter-Ferguson Method: “The a priori is the weak point. A stale ELR that ignores [[Rate Level Change\\|rate changes]] and [[…” |

</details>

<details><summary><code>cas5-2018s-q18</code> · gap</summary>

Tagged pages: Frequency-Severity Method, Tort Reform, Claim Count Triangle, Severity

| Item | Kind | Status | Where |
|---|---|---|---|
| In the frequency-severity technique, ultimate claims for an accident year equal projected ultimate claim counts multiplied by projected ult… | procedure | tagged | Frequency-Severity Method: “$$U = N_{\text{ult}} \times S_{\text{ult}}$$” |
| Develop reported claim counts to ultimate by computing age-to-age factors from the count triangle, selecting them (e.g., simple average), a… | procedure | tagged | Claim Count Triangle: “$$\text{Ultimate Counts} = N_n \times \text{CDF}^{\text{count}}_{n \to \text{ult}}$$” |
| Average reported severity at a given age equals cumulative reported claims divided by cumulative reported claim counts at that age. | definition | tagged | Severity: “**Severity** is the average cost per claim — total losses divided by claim count — as distinct from…” |
| Build a severity triangle, compute and select severity age-to-age factors, and use age-to-ultimate severity factors to develop each acciden… | procedure | tagged | Frequency-Severity Method: “Develop the count triangle to ultimate counts; develop an average severity triangle (dollars ÷ coun…” |
| Trend each accident year's ultimate severity to the target accident year's level using the annual severity trend compounded over the number… | procedure | syllabus | Loss Trend: “$$\text{Trend Factor} = (1 + t)^{n}$$” |
| Adjust the selected severity for a law change such as tort reform by multiplying by (1 minus the percentage reduction) when all claims in t… | procedure | missing |  |

</details>

<details><summary><code>cas5-2018s-q19</code> · answerable</summary>

Tagged pages: Bornhuetter-Ferguson Method, Chain Ladder Method, Settlement Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The paid (or reported) development technique estimates ultimate claims by multiplying the latest diagonal of cumulative claims by a cumulat… | procedure | tagged | Chain Ladder Method: “**Chain Ladder Method** (development or link-ratio method) projects each cohort to ultimate by mult…” |
| The Bornhuetter-Ferguson technique estimates ultimate claims as actual reported (or paid) claims to date plus expected claims times the per… | formula | tagged | Bornhuetter-Ferguson Method: “**Bornhuetter-Ferguson Method** (BF) estimates ultimate losses by adding to what has actually been …” |
| The development technique leverages actual claims to date by the full development factor, so for immature years an unusually large shock lo… | fact | tagged | Chain Ladder Method: “the method takes whatever sits on the diagonal at face value and scales it. A [[Large Loss\\|shock l…” |
| The development technique assumes historical development patterns remain stable, so a change in claim settlement speed distorts paid develo… | fact | tagged | Settlement Rate: “**Faster settlement** pushes losses from open to paid, so the recent paid diagonal is high relative…” |
| BF expected claims are usually computed as an expected claims ratio times on-level earned premium, so an inaccurate rate change history imp… | fact | linked | Rate Level Change: “The [[Bornhuetter-Ferguson Method\\|BF]] and [[Expected Loss Method\\|expected claims]] techniques ne…” |
| The development technique uses actual claims to date and so reflects unexpectedly high severity trend, while BF expected claims rely on the… | fact | syllabus | Loss Development: “Development can be **downward**.” |
| The development technique relies only on the claim triangle and does not use premium or rate change information, so rate changes do not aff… | fact | tagged | Chain Ladder Method: “It is entirely **data-driven**: nothing external — premium, exposure, rate level or judgment about …” |

</details>

<details><summary><code>cas5-2018s-q2</code> · answerable</summary>

Tagged pages: Bühlmann Credibility, Complement of Credibility, Expected Value of Process Variance, Variance of Hypothetical Means, Loss Trend

| Item | Kind | Status | Where |
|---|---|---|---|
| Bühlmann credibility parameter K equals the expected value of process variance divided by the variance of hypothetical means (K = EPV/VHM). | formula | tagged | Bühlmann Credibility: “\\| $k = v/a$ \\| Bühlmann credibility parameter \\| Ratio of process variance to structural variance …” |
| Bühlmann credibility Z = N/(N+K), where N is the number of observations (exposures) and K is the Bühlmann credibility parameter. | formula | tagged | Bühlmann Credibility: “$$Z = \frac{n}{n + k}, \quad k = \frac{v}{a}$$” |
| The credibility-weighted indicated value is Z times the indicated value plus (1 − Z) times the complement of credibility. | formula | tagged | Bühlmann Credibility: “$$\text{Estimate} = Z \cdot \bar{X} + (1-Z) \cdot \mu$$” |
| When the complement of credibility is trended present rates, trend the current average premium at present rates from the target effective d… | procedure | tagged | Complement of Credibility: “the current rate adjusted to what was last *indicated* rather than implemented, and trended from th…” |
| When a prior indicated rate change was only partly implemented, adjust the trended present-rate complement by the residual indication, comp… | procedure | tagged | Complement of Credibility: “the current rate adjusted to what was last *indicated* rather than implemented” |
| The trend period for the trended present rates complement is measured from the prior review's target effective date, not its actual effecti… | fact | tagged | Complement of Credibility: “trended from the original target effective date of the current rates to that of the new rates.” |

</details>

<details><summary><code>cas5-2018s-q20</code> · answerable</summary>

Tagged pages: Case Adequacy, Case Outstanding Development Method, Chain Ladder Method

| Item | Kind | Status | Where |
|---|---|---|---|
| The reported claim development technique projects ultimate claims by applying age-to-age factors from historical reported claims to the cur… | procedure | tagged | Chain Ladder Method: “**Chain Ladder Method** (development or link-ratio method) projects each cohort to ultimate by mult…” |
| The case outstanding development technique applies historical ratios of future payments (or unpaid) to case outstanding at each age to the … | procedure | tagged | Case Outstanding Development Method: “$f_{\text{case}}$ converts the current case balance into *all* remaining payments — including payme…” |
| Development techniques assume that case reserve adequacy (claims settlement and case reserving practices) is consistent over time, so histo… | fact | tagged | Chain Ladder Method: “**The pattern is stable over calendar time.** Violated by a change in [[Case Adequacy\\|case adequac…” |
| If case reserve strength increases and no adjustment is made, reported claim development overstates ultimate claims, because historical fac… | fact | tagged | Case Adequacy: “**Strengthening** raises reported losses immediately, so recent age-to-age factors fall (more of th…” |
| If case reserve strength increases and no adjustment is made, the case outstanding development technique overstates unpaid claims, because … | fact | tagged | Case Outstanding Development Method: “Its weakness is the mirror image: it depends entirely on case adequacy being stable. A [[Case Adequ…” |
| Paid claim development techniques rely only on paid claim data and are therefore not affected by changes in case reserve adequacy. | fact | tagged | Case Adequacy: “**Paid data is immune**, so a divergence between paid and reported chain ladder estimates is the co…” |

</details>

<details><summary><code>cas5-2018s-q21</code> · gap</summary>

Tagged pages: Berquist-Sherman Method, Case Adequacy, Settlement Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| In the Berquist-Sherman case outstanding adjustment, select the average case outstanding at each age from the basis diagonal (latest or cho… | procedure | tagged | Berquist-Sherman Method: “3. **Trend the latest diagonal's** average case outstanding backwards at $t$ to restate each histor…” |
| The disposal rate is cumulative closed claim counts divided by ultimate claim counts for an accident year at a given age, and it measures t… | definition | tagged | Settlement Rate: “$$\text{Disposal Rate}_n = \frac{\text{Closed claims at age } n}{\text{Ultimate claim counts}}$$” |
| To adjust for changes in settlement rate, apply the disposal rates from the selected basis diagonal at each age to every accident year's ul… | procedure | missing |  |
| Adjusted reported (incurred) loss equals adjusted cumulative paid loss plus adjusted open claim counts times adjusted average case outstand… | formula | tagged | Berquist-Sherman Method: “$$\text{Adjusted Reported}_{\text{AY},n} = \text{Paid}_{\text{AY},n} + \text{Adjusted Case}_{\text{…” |
| Compute volume-weighted age-to-age factors from the adjusted reported triangle, multiply them into a cumulative development factor (includi… | procedure | syllabus | Chain Ladder Method: “**The procedure:** build the cumulative [[Development Triangle\\|triangle]] → compute [[Age to Age F…” |
| Berquist-Sherman adjustments are needed when case reserve adequacy or claim settlement rates have changed, since these distortions make the… | fact | tagged | Berquist-Sherman Method: “**Berquist-Sherman Method** restates a historical [[Development Triangle\\|triangle]] so that every …” |

</details>

<details><summary><code>cas5-2018s-q22</code> · answerable</summary>

Tagged pages: Net of Reinsurance, Quota Share, Stop-Loss Reinsurance, Tail Factor

| Item | Kind | Status | Where |
|---|---|---|---|
| Volume-weighted average age-to-age factor for a development age is the sum of cumulative claims at the later age divided by the sum of cumu… | formula | syllabus | Age to Age Factor: “$$f_{n \to n+1}^{\text{vol-wtd}} = \frac{\sum_{\text{AY}} C_{\text{AY},\,n+1}}{\sum_{\text{AY}} C_{…” |
| Compute the age-to-ultimate (cumulative) development factor for each maturity by multiplying the selected age-to-age factors from that age … | procedure | syllabus | Cumulative Development Factor: “CDFs are built **backwards from the tail**: start with the tail factor, multiply in each successive…” |
| Development technique ultimate claims equal the latest cumulative reported claims multiplied by the age-to-ultimate development factor. | formula | syllabus | Cumulative Development Factor: “$$\text{Ultimate} = C_n \times \text{CDF}_{n \to \text{ult}}$$” |
| To get net ultimate claims with a quota share followed by an aggregate stop loss, first multiply gross ultimate by the retained share (1 mi… | procedure | tagged | Quota Share: “Net loss is $(1-a)X$, so its coefficient of variation equals gross.” |
| IBNR equals ultimate claims minus reported claims; net IBNR uses net ultimate and net reported claims, and ceded IBNR equals gross IBNR min… | definition | syllabus | IBNR: “$$\text{IBNR} = \text{Ultimate} - \text{Reported}$$” |
| With aggregate stop loss reinsurance, the net tail factor is typically smaller than the gross tail factor (but not necessarily 1.0) because… | fact | tagged | Net of Reinsurance: “so net development patterns are frequently at or below gross ones, and a net tail factor larger tha…” |
| With quota share reinsurance, the net tail factor equals the gross tail factor because the same proportion of every claim is ceded at every… | fact | tagged | Quota Share: “For reserving, ceded losses are a scalar multiple of gross and develop on the gross pattern” |

</details>

<details><summary><code>cas5-2018s-q23</code> · answerable</summary>

Tagged pages: Unallocated Loss Adjustment Expenses ULAE, IBNR

| Item | Kind | Status | Where |
|---|---|---|---|
| The classical paid-to-paid ratio is calendar-year paid ULAE divided by calendar-year paid claims. | formula | tagged | Unallocated Loss Adjustment Expenses ULAE: “Compute the ratio $R$ of calendar-year paid ULAE to calendar-year paid loss, review it for trend, a…” |
| Select the ULAE ratio from the calendar-year ratios by judgment, using recent stable years and excluding outlier years (e.g., early years w… | procedure | tagged | Unallocated Loss Adjustment Expenses ULAE: “Compute the ratio $R$ of calendar-year paid ULAE to calendar-year paid loss, review it for trend, a…” |
| The classical technique assumes half of a claim's ULAE is spent when the claim is opened and half when it is closed, so 50% of the ratio ap… | fact | tagged | Unallocated Loss Adjustment Expenses ULAE: “If ULAE is assumed to be spent half at reporting and half at settlement, only $50\%$ remains on rep…” |
| Total IBNR splits into IBNER (future development on known, reported claims) and IBNYR (claims incurred but not yet reported); IBNYR equals … | definition | tagged | IBNR: “**Pure IBNR** (narrow IBNR) covers claims that have occurred but are unknown to the insurer.” |
| Unpaid ULAE equals the selected ratio times [50% × (case outstanding + IBNER) + 100% × IBNYR]. | formula | tagged | Unallocated Loss Adjustment Expenses ULAE: “$$\text{ULAE Reserve} = R \times \left(0.5 \times \text{Case} + 1.0 \times \text{IBNR}\right)$$” |
| Kittel's refinement computes the ULAE ratio as calendar-year paid ULAE divided by the average of calendar-year paid claims and incurred cla… | formula | tagged | Unallocated Loss Adjustment Expenses ULAE: “$$R_{\text{Kittel}} = \frac{\text{Paid ULAE}}{0.5(\text{Paid Loss}) + 0.5(\text{Incurred Loss})}$$” |
| The classical paid-to-paid ratio is distorted when claim volume is changing (e.g., a growing book), because ULAE spent on opening new claim… | fact | tagged | Unallocated Loss Adjustment Expenses ULAE: “The classical ratio is distorted in a growing book, because paid ULAE reflects today's claim *activ…” |

</details>

<details><summary><code>cas5-2018s-q24</code> · answerable</summary>

Tagged pages: Actual vs Expected Analysis, Development Factor

| Item | Kind | Status | Where |
|---|---|---|---|
| An age-to-age (link ratio) factor is the ratio of cumulative reported claims at one age to cumulative reported claims at the previous age, … | definition | syllabus | Age to Age Factor: “**Age-to-Age Factor** (link ratio) is the ratio of a cohort's cumulative amount at one maturity to …” |
| The age-to-ultimate factor at a given age equals the product of the age-to-age factors from that age through the tail factor. | formula | linked | Cumulative Development Factor: “**Cumulative Development Factor** (CDF, or age-to-ultimate factor) is the product of all selected […” |
| The expected percentage of ultimate claims reported at a given age equals 1 divided by the age-to-ultimate factor at that age. | formula | linked | Cumulative Development Factor: “The reciprocal is the **percentage reported** (or paid): $p_n = 1/\text{CDF}_n$, and $1 - p_n$ is t…” |
| Expected claim emergence over a period equals the selected ultimate claims times the change in expected percent reported from the start to … | procedure | tagged | Actual vs Expected Analysis: “$$\text{Expected emergence} = U_{\text{prior}} \times \left(\frac{1}{\text{CDF}_{n+1}} - \frac{1}{\…” |
| Actual emergence over a period equals the change in cumulative reported claims between the two evaluation dates, and is compared to expecte… | procedure | tagged | Actual vs Expected Analysis: “**Actual vs. Expected Analysis** (A/E) compares the emergence that actually occurred in a period ag…” |
| Reported claims (paid plus case reserves) emerge lower than expected when case reserve adequacy weakens, when reporting slows (e.g., a shif… | fact | linked | Case Adequacy: “**Weakening** does the reverse and understates ultimate, which is the more dangerous direction: the…” |
| Reported claims emerge higher than expected when case reserve adequacy strengthens, when reporting speeds up (e.g., a shift toward a shorte… | fact | linked | Chain Ladder Method: “A [[Large Loss\\|shock loss]] reported early is multiplied by the full CDF.” |

</details>

<details><summary><code>cas5-2018s-q25</code> · gap</summary>

Tagged pages: Allocated Loss Adjustment Expense, Development Factor

| Item | Kind | Status | Where |
|---|---|---|---|
| In the paid development technique applied to ALAE, compute age-to-age factors from the cumulative paid ALAE triangle itself (volume-weighte… | procedure | tagged | Development Factor: “**Volume-weighted average**: $\Sigma(\text{col }n{+}1) / \Sigma(\text{col }n)$ — gives more credibi…” |
| Estimate ultimate ALAE by multiplying latest cumulative paid ALAE by the cumulative development factor (product of the age-to-age factors f… | procedure | linked | Cumulative Development Factor: “$$\text{CDF}_{n \to \text{ult}} = \left(\prod_{k \ge n} f_{k \to k+1}\right) \times \text{Tail}$$” |
| In the ratio of paid ALAE to paid claims technique with additive factors, the development factor from one age to the next is the average ch… | procedure | missing |  |
| Ultimate ALAE under the ratio technique = projected ultimate ALAE-to-claims ratio × selected ultimate claims, done for every accident year. | formula | tagged | Allocated Loss Adjustment Expense: “Friedland gives three approaches: develop a **combined** loss-and-ALAE triangle, develop **ALAE sep…” |
| The ratio technique depends on the selected ultimate claims and carries forward the latest observed ratio, so distortions in an accident ye… | fact | missing |  |
| Evaluate reasonableness of an ultimate ALAE estimate by comparing the implied ALAE per ultimate claim (or ALAE-to-claims ratio) with that o… | procedure | syllabus | Reasonableness Testing: “Then test the *selected* ultimates by the ratios they imply: ultimate claim ratios, severities, fre…” |

</details>

<details><summary><code>cas5-2018s-q26</code> · answerable</summary>

Tagged pages: Case Adequacy, Berquist-Sherman Method, Settlement Rate, Data Diagnostic Analysis

| Item | Kind | Status | Where |
|---|---|---|---|
| An increase in case reserve adequacy inflates reported claims on the latest diagonal, so reported development and reported Bornhuetter-Ferg… | fact | tagged | Case Adequacy: “Applying historical factors — built under weaker reserving — to a strengthened diagonal **over-stat…” |
| Paid claim development and paid Bornhuetter-Ferguson methods are not affected by changes in case reserve adequacy, and agreement among paid… | fact | tagged | Case Adequacy: “**Paid data is immune**, so a divergence between paid and reported chain ladder estimates is the co…” |
| The reported Berquist-Sherman method restates case reserves (average case outstanding) to a consistent adequacy level, correcting the disto… | fact | tagged | Case Adequacy: “The remedy is the [[Berquist-Sherman Method\\|Berquist-Sherman]] case adjustment: restate historical…” |
| Diagnose a case reserve strengthening by examining average case outstanding (case outstanding divided by open claim counts) along the lates… | procedure | tagged | Case Adequacy: “The diagnostic is average case outstanding per open claim**, compared *down each column* of the tri…” |
| Diagnose a case reserve strengthening with the ratio of paid to reported claims, which declines along the latest diagonals relative to earl… | procedure | tagged | Data Diagnostic Analysis: “**[[Case Adequacy\\|Case strengthening]]:** average case outstanding rises faster than trend on the …” |
| The disposal rate is the ratio of closed claim counts to ultimate claim counts at each maturity, and measures the rate of claim settlement. | definition | tagged | Settlement Rate: “$$\text{Disposal Rate}_n = \frac{\text{Closed claims at age } n}{\text{Ultimate claim counts}}$$” |
| The paid Berquist-Sherman technique adjusts only for changes in settlement rate, so when disposal rates are stable across accident years it… | fact | tagged | Berquist-Sherman Method: “Which adjustment applies is decided by the **diagnostic**, not by preference: a jump in average cas…” |

</details>

<details><summary><code>cas5-2018s-q3</code> · untagged</summary>

Tagged pages: Loss Trend, Loss Development, External Data

| Item | Kind | Status | Where |
|---|---|---|---|
| Data from competitor filings comes from a longer-established, larger and more credible body of experience than a new entrant's own limited … | fact | syllabus | Ratemaking Data Organization: “**external** ones — data calls and statistical plans, [[External Information in Reserving\\|aggregat…” |
| Competitor data reflects the competitor's own mix of business, underwriting, policy forms and claims handling, and may be dated or lack det… | fact | syllabus | Mix of Business: “A shift in the mix changes aggregate results even when nothing about any individual segment has cha…” |
| Internal company data reflects the company's own book, underwriting and claims practices, so it measures the trend the company will actuall… | fact | elsewhere | Insurer Operational Data: “It is the main source for pricing and modelling an existing product, because it describes the insur…” |
| Limited internal data, such as a single year in a new state, is immature, volatile and not credible for estimating a loss trend, which requ… | fact | syllabus | Credibility: “Partial credibility uses the **square root rule**, $Z = \sqrt{n / n_{\text{full}}}$, capped at $1$ …” |
| The loss development and trending overlap fallacy is the incorrect claim that applying both loss development and loss trend double-counts i… | definition | tagged | Loss Trend: “Werner & Modlin call the belief that doing both double-counts inflation the **overlap fallacy**: de…” |
| Loss development moves an accident year's losses from their current immature value to ultimate at that accident year's cost level, while tr… | fact | tagged | Loss Trend: “Trend and [[Loss Development\\|development]] answer different questions and must both be applied: de…” |

</details>

<details><summary><code>cas5-2018s-q4</code> · gap</summary>

Tagged pages: Full Credibility Standard, Limited Fluctuation Credibility, Complement of Credibility

| Item | Kind | Status | Where |
|---|---|---|---|
| In classical credibility, the exposure standard for full credibility equals the claim-count standard for full credibility divided by the ex… | formula | tagged | Full Credibility Standard: “A standard stated in claims converts to exposures by dividing by the expected claim frequency per e…” |
| Select the expected claim frequency for each coverage separately by pooling the experience years (total claims divided by total exposures) … | procedure | missing |  |
| An exposure-based full credibility standard is preferred because exposures are known or projectable in advance of the experience period, wh… | fact | missing |  |
| Advantages of classical credibility are that it is the most commonly used and accepted method and is easy to compute from readily available… | fact | linked | Credibility: “Bühlmann has the better theoretical footing; limited fluctuation persists because it needs only a c…” |
| Disadvantages of classical credibility are that it assumes Poisson claim frequency and constant severity, relies on an arbitrary choice of … | fact | missing |  |
| Criteria for a good complement of credibility include being unbiased, independent of the experience being weighted, readily available, easy… | fact | tagged | Complement of Credibility: “(2) **unbiased** — not routinely higher or lower than the observed experience; (3) **statistically …” |

</details>

<details><summary><code>cas5-2018s-q5</code> · answerable</summary>

Tagged pages: Large Loss, Extraordinary Losses, Catastrophe Loss

| Item | Kind | Status | Where |
|---|---|---|---|
| The excess loss factor equals 1 plus the ratio of excess losses (losses above the threshold) to non-excess losses (losses limited to the th… | formula | tagged | Extraordinary Losses: “The excess loss factor (ELF) is the long-run ratio of excess to non-excess losses, applied to each …” |
| To split ground-up losses at a threshold, losses below the threshold are entirely non-excess; for each loss above the threshold, the thresh… | procedure | tagged | Large Loss: “$$\text{Capped Loss} = \min(X, M)$$” |
| An event is a catastrophe if its industry-wide insured losses meet or exceed the catastrophe definition threshold, and a non-catastrophe ex… | fact | tagged | Extraordinary Losses: “Werner cites the ISO Property Claim Services definition: at least $\$25$ million of direct insured …” |
| Ground-up loss data are not censored: the excess loss factor must be computed by splitting large losses at the threshold, and it is a facto… | fact | tagged | Extraordinary Losses: “$$\text{ELF} = 1 + \frac{\sum \text{Excess losses}}{\sum \text{Non-excess losses}}$$” |
| Large and catastrophe losses are rare and volatile, so capping losses at a threshold and adding a longer-term average excess loss provision… | fact | tagged | Large Loss: “The rate then covers the full expected cost without being hostage to whether a shock loss happened …” |

</details>

<details><summary><code>cas5-2018s-q6</code> · gap</summary>

Tagged pages: Claims Made Coverage, Occurrence Coverage, Claim Count Triangle

| Item | Kind | Status | Where |
|---|---|---|---|
| A claims-made policy covers claims that are reported during the policy period and that occurred on or after the policy's retroactive date. | definition | tagged | Claims Made Coverage: “**Claims-Made Coverage** is a policy trigger under which the policy responds to claims *reported* d…” |
| An occurrence policy covers claims that occur during the policy period, regardless of when they are reported. | definition | tagged | Occurrence Coverage: “**Occurrence Coverage** is a policy trigger under which the policy responds to losses that *occur* …” |
| In a cumulative reported claim count triangle, each entry already includes all earlier reported claims for that accident year, so the count… | fact | missing |  |
| When switching from claims-made to occurrence coverage, a gap arises for claims that occurred during the claims-made period but are reporte… | fact | tagged | Claims Made Coverage: “An **extended reporting endorsement** (ERP, or "tail coverage") covers claims that occurred during …” |
| Claims-made step factors give the cumulative proportion of an accident year's ultimate claims that are reported by the end of each claims-m… | definition | tagged | Claims Made Coverage (collapsed): “With the retro date set at inception, year $1$ can only receive accident-year reports, year $2$ rec…” |
| Ultimate claim count is estimated as the latest cumulative reported count divided by the cumulative reporting percentage (step factor) at t… | formula | tagged | Claim Count Triangle: “$$\text{Ultimate Counts} = N_n \times \text{CDF}^{\text{count}}_{n \to \text{ult}}$$” |
| Estimate the number of claims in the coverage gap as the ultimate claims for the claims-made-period accident years minus the claims already… | procedure | tagged | Claims Made Coverage: “covers claims that occurred during the claims-made coverage period but are reported after the last …” |
| The coverage gap when moving from claims-made to occurrence can be addressed by purchasing tail coverage (an extended reporting period endo… | fact | elsewhere | CGL Endorsements: “If a claims-made CGL is cancelled or not renewed, replaced with an occurrence policy, or renewed wi…” |

</details>

<details><summary><code>cas5-2018s-q7</code> · gap</summary>

Tagged pages: Expense Provisions, Fixed Expenses, Variable Expenses, Underwriting Profit

| Item | Kind | Status | Where |
|---|---|---|---|
| Split each expense category into a fixed portion and a variable portion using its percent-fixed assumption (fixed = expense × % fixed, vari… | procedure | tagged | Fixed Expenses: “Expense studies rarely split cleanly. Ideally detailed expense data or activity-based cost studies …” |
| General expenses are incurred over the life of the policy so they are allocated using earned premium and earned exposures, while other acqu… | fact | tagged | Expense Provisions: “Expenses incurred at the onset of the policy — commissions, other acquisition, and taxes, licenses …” |
| Countrywide expenses (general, other acquisition) are spread over countrywide premium and exposures, while state-specific expenses (taxes, … | fact | missing |  |
| Average fixed expense per exposure for each expense type equals its fixed expense dollars divided by the appropriate exposures, and the tot… | formula | tagged | Fixed Expenses: “$$F = \frac{\text{Total Fixed Expenses}}{\text{Exposures (or Policies)}}$$” |
| The variable expense provision is each variable expense divided by the appropriate premium (a ratio to premium, not exposures), summed acro… | formula | tagged | Variable Expenses: “$$V = \frac{\text{Variable Expenses}}{\text{Premium}}$$” |
| Fixed expense fee = average fixed expense per exposure / (1 − variable expense provision − underwriting profit provision), grossing up so t… | formula | tagged | Fixed Expenses: “$F$ enters the **numerator** of the rate; [[Variable Expenses\\|variable expenses]] $V$ and the prof…” |

</details>

<details><summary><code>cas5-2018s-q8</code> · answerable</summary>

Tagged pages: Cape Cod Method, On Level Premium, Loss Trend, Premium Trend, Overall Rate Level Indication

| Item | Kind | Status | Where |
|---|---|---|---|
| Estimate age-to-age development factors as volume-weighted averages (sum of later-age cumulative losses over sum of corresponding earlier-a… | procedure | syllabus | Age to Age Factor: “$$f_{n \to n+1}^{\text{vol-wtd}} = \frac{\sum_{\text{AY}} C_{\text{AY},\,n+1}}{\sum_{\text{AY}} C_{…” |
| Compute on-level factors with the parallelogram method: for annual policies written evenly, determine the share of each calendar year's ear… | procedure | linked | On-Leveling: “For **annual** policies written uniformly, a rate change effective at time $p$ through year $Y$ ear…” |
| Cape Cod method: compute used-up premium as on-level, trended premium divided by the cumulative development factor, and set the expected cl… | procedure | tagged | Cape Cod Method: “$$\text{ELR} = \frac{\sum_i C_i}{\sum_i \text{EP}_i \times \tfrac{1}{\text{CDF}_i}}$$” |
| Bring losses and premiums to a common cost level by trending losses from each accident year's average accident date and premium from each c… | procedure | tagged | Loss Trend: “- $t$ is the selected annual trend and $n$ the **trend period**, measured from the average date of …” |
| Convert the Cape Cod expected claim ratio back to each accident year's level by adjusting for on-level factor and net trend (premium trend … | procedure | tagged | Cape Cod Method: “Premium **must be on level** and losses must be trended to a common cost level before the ELR is co…” |
| Cape Cod ultimate loss = actual (untrended) reported loss + expected claims × (1 − 1/CDF), where expected claims are the year's expected lo… | formula | tagged | Cape Cod Method: “$$\text{IBNR}_i = \text{ELR} \times \text{EP}_i \times \left(1 - \tfrac{1}{\text{CDF}_i}\right)$$” |
| For annual policies, the average written date of a policy year is mid-year and the average accident date is one year after the average writ… | fact | tagged | Premium Trend: “The trend period $n$ runs from the average written date of the policies earning premium in the expe…” |
| Indicated rate change = (projected loss ratio including ULAE + fixed expense ratio) / (1 − variable expense ratio − profit and contingencie… | formula | tagged | Overall Rate Level Indication: “$$\text{Indicated Change} = \frac{\text{Projected Loss \& LAE Ratio} + F\%}{1 - V - Q_T} - 1$$” |
| Projected loss ratio = total trended ultimate losses divided by total trended on-level earned premium, summing across the experience years. | procedure | tagged | Overall Rate Level Indication: “many companies sum projected losses and premium across all years, which weights each year's loss ra…” |

</details>

<details><summary><code>cas5-2018s-q9</code> · answerable</summary>

Tagged pages: Lifetime Value, Premium Persistency

| Item | Kind | Status | Where |
|---|---|---|---|
| Weight each future policy year's premium, loss and expense by the cumulative probability the policy is still in force, which is the product… | procedure | linked | Lapse: “${}_tp^{(\tau)}_x = \prod_{k=0}^{t-1}\left(1 - q^{(d)}_{x+k} - q^{(w)}_{x+k}\right)$” |
| Discount each year's cash flows to the policy inception date at the annual discount rate, using a factor of 1/(1+i)^t where t is the time f… | procedure | linked | Profit Testing: “$$\text{NPV} = \sum_{t=0}^{n} \Pi_t\,(1+r)^{-t}$$” |
| Return on premium over a multi-year horizon equals (PV of premium minus PV of losses and expenses) divided by PV of premium, using persiste… | formula | syllabus | Underwriting Profit: “\text{Margin} &= \frac{\$200{,}000}{\$10{,}000{,}000} = 2.0\%” |
| Both losses and expenses are costs deducted from premium when computing underwriting profit, and the profit percentage uses discounted prem… | fact | syllabus | Underwriting Profit: “**Underwriting Profit** is income from the insurance operation alone — earned premium less incurred…” |
| Higher persistency shifts more weight to later policy years, so a segment's multi-year return depends on both its per-year profitability an… | fact | tagged | Lifetime Value (collapsed): “The acquisition swings from $+\$147$ to $-\$92$ on the retention assumption alone.” |

</details>

<details><summary><code>cas5-2019-q10</code> · gap</summary>

Tagged pages: Classification Ratemaking, Pure Premium Method, Territory Ratemaking, Pure Premium Analysis

| Item | Kind | Status | Where |
|---|---|---|---|
| In the univariate pure premium method, a level's pure premium is its losses divided by its exposures, and its relativity is that level's pu… | formula | tagged | Classification Ratemaking: “$$\text{Relativity}_i = \frac{\text{Pure Premium}_i}{\text{Pure Premium}_{\text{base}}}$$” |
| Exposure correlation between two rating variables exists when the distribution of exposures across levels of one variable differs across le… | definition | tagged | Classification Ratemaking: “A **univariate** (one-way) pure premium or loss ratio analysis attributes to a variable the effect …” |
| To test for exposure correlation, compare the percentage mix of one variable's levels (e.g., driver type) across each level of the other va… | procedure | missing |  |
| When two rating variables are not exposure correlated, no exposure adjustment is needed and the simple univariate relativities can be used … | fact | missing |  |
| To adjust for exposure correlation in sequential univariate analysis, first compute relativities for one variable, then compute adjusted ex… | procedure | missing |  |
| The exposure adjustment must use exposure tables (not loss tables) for the weights and pure premium relativities (not loss relativities) fo… | fact | missing |  |

</details>

<details><summary><code>cas5-2019-q11</code> · answerable</summary>

Tagged pages: Deductible Rating, Deductible, Profit and Contingency Provision, Large Deductible Policy, Deductible Recovery

| Item | Kind | Status | Where |
|---|---|---|---|
| Under a large deductible policy, the insurer typically handles and pays claims ground-up (including those below the deductible) and then bi… | fact | tagged | Large Deductible Policy: “usually the insurer handles every claim, so the premium must cover handling cost even on claims tha…” |
| Because the insurer administers claims below the deductible (claim handling, billing, processing), the rates for a large deductible policy … | fact | tagged | Large Deductible Policy: “usually the insurer handles every claim, so the premium must cover handling cost even on claims tha…” |
| Credit (insolvency) risk in a large deductible policy is the risk that the insured becomes bankrupt or otherwise cannot reimburse the deduc… | definition | tagged | Large Deductible Policy: “a provision for the insured's inability to pay; collateral rarely covers that credit risk fully.” |
| Credit risk from unrecoverable deductible payments is a legitimate cost of writing a large deductible policy, so the rates may include a pr… | fact | tagged | Large Deductible Policy: “a provision for the insured's inability to pay; collateral rarely covers that credit risk fully.” |
| Losses retained by the insurer above a large deductible are higher severity, sparser, and more volatile and harder to predict, so greater r… | fact | tagged | Large Deductible Policy: “losses above a large deductible are more uncertain than those below, so the profit margin may need …” |

</details>

<details><summary><code>cas5-2019-q12</code> · gap</summary>

Tagged pages: Overall Rate Level Indication, Permissible Loss Ratio, Territory Ratemaking, Classification Ratemaking, Non-Pricing Solutions, Loss Ratio Method, Considerations for Implementing Rates

| Item | Kind | Status | Where |
|---|---|---|---|
| The loss ratio method indicated rate change equals the ultimate (expected) loss ratio divided by the permissible loss ratio, minus 1. | formula | tagged | Permissible Loss Ratio: “$$\text{Indicated Change} = \frac{\text{Projected Loss \& LAE Ratio}}{\text{PLR}} - 1$$” |
| Retention ratio is the number of policies renewed divided by the number of policies currently in force (up for renewal); a minimum retentio… | definition | missing |  |
| Apply a retention constraint by computing the minimum retained policy count (current count times minimum retention ratio), finding the larg… | procedure | missing |  |
| When a capped territory's rate change falls short of its indication, compute the premium shortfall (indicated factor minus capped factor, t… | procedure | tagged | Considerations for Implementing Rates: “a cap on the change for any level of a rating variable is made up by adjusting the base rate and th…” |
| Adverse selection arises when rates deviate from indicated: overcharged (overpriced) segments leave for cheaper competitors while underchar… | fact | linked | Rate Change: “A rate change also changes the **mix**: price-sensitive risks shop, so a large increase can worsen …” |
| When rate increases are constrained, the fundamental insurance equation can be rebalanced by non-pricing actions such as reducing expenses … | fact | tagged | Non-Pricing Solutions: “**Reduce expenses** — underwriting or LAE: a smaller marketing budget, lower staffing, lower acquis…” |

</details>

<details><summary><code>cas5-2019-q13</code> · answerable</summary>

Tagged pages: Frequency-Severity Method, Severity, Frequency, Credibility, Data Segmentation, Pure Premium

| Item | Kind | Status | Where |
|---|---|---|---|
| Data with low claim counts is not fully credible on its own; combining it with a related, higher-volume coverage gives more credible and st… | fact | tagged | Data Segmentation: “Where a level is too thin, combine similar levels or find more data.” |
| Data combined for an unpaid claim analysis should be homogeneous; segments with different development patterns (e.g., differing age-to-ulti… | fact | tagged | Data Segmentation: “**Reserving practice (Friedland):** group claims that share coverage (the same laws, policy terms a…” |
| Segments whose exposure and claim counts grow at different rates are unlike populations, and combining them can distort the projected resul… | fact | tagged | Data Segmentation: “Do not combine segments whose relative volume is changing — see [[Mix of Business]] and [[Reserving…” |
| Pure premium (loss cost) = frequency × severity = (ultimate claim count × ultimate severity) / earned exposure. | formula | tagged | Pure Premium: “$$\text{Pure Premium} = \text{Frequency} \times \text{Severity}$$” |
| Premium and pricing decisions should be based on loss cost (pure premium), which reflects both frequency and severity, not on severity alon… | fact | tagged | Pure Premium: “Pure premium is the building block of the [[Pure Premium Method]] indication, where the indicated r…” |
| Ultimate claim counts are already developed to ultimate, so paid age-to-ultimate loss development factors should not be applied to them. | fact | tagged | Frequency-Severity Method: “Develop the count triangle to ultimate counts; develop an average severity triangle (dollars ÷ coun…” |

</details>

<details><summary><code>cas5-2019-q14</code> · gap</summary>

Tagged pages: Berquist-Sherman Method, Case Reserves, Chain Ladder Method, Development Triangle, Data Diagnostic Analysis, Settlement Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| Reported claims equal paid claims plus case outstanding reserves, so changes in reported and case outstanding amounts imply changes in paid… | fact | linked | Paid Losses: “$$\text{Reported Losses} = \text{Paid Losses} + \text{Case Reserves}$$” |
| Evaluate a development technique's reasonableness by computing age-to-age factors of the relevant (average) triangles and comparing them ac… | procedure | tagged | Development Triangle: “**Along a diagonal** — everything that happened in one calendar period. A diagonal effect is [[Infl…” |
| Compute diagonal (calendar/accident-year) growth rates in average values at a fixed age and compare them to the industry claim cost trend t… | procedure | tagged | Data Diagnostic Analysis: “average case outstanding rises faster than trend on the latest diagonals, and paid-to-reported fall…” |
| A spike in average case outstanding without a matching rise in average reported claims indicates slower claim settlement (decreased paid), … | fact | linked | Case Adequacy: “**Strengthening** raises reported losses immediately, so recent age-to-age factors fall (more of th…” |
| The paid development technique assumes historical payment patterns persist; a slowdown in settlement makes historical paid factors too high… | fact | tagged | Settlement Rate: “- **Slower settlement** does the reverse and understates ultimate from paid data.” |
| The reported claim development technique is not distorted by changes in settlement rates and is more appropriate when paid patterns shift b… | fact | tagged | Settlement Rate: “- **Reported data is largely immune**, because reported losses include the case reserve whether or …” |
| Average case outstanding can exceed average reported values because small claims close early, leaving larger claims open; also an average p… | fact | missing |  |

</details>

<details><summary><code>cas5-2019-q15</code> · gap</summary>

Tagged pages: Frequency-Severity Method, Development Triangle, Ultimate Loss, IBNR, Claim Count Triangle

| Item | Kind | Status | Where |
|---|---|---|---|
| In the frequency-severity technique, project ultimate claims as ultimate claim count times ultimate average severity, where each is develop… | procedure | tagged | Frequency-Severity Method: “Develop the count triangle to ultimate counts; develop an average severity triangle (dollars ÷ coun…” |
| An age-to-age development factor is the cumulative value at a later age divided by the cumulative value at the prior age for the same accid… | formula | syllabus | Age to Age Factor: “$$f_{n \to n+1}^{\text{AY}} = \frac{C_{\text{AY},\,n+1}}{C_{\text{AY},\,n}}$$” |
| Select age-to-age factors by averaging the available observed factors at each age (e.g. a simple average), then multiply the selected facto… | procedure | linked | Chain Ladder Method: “**The procedure:** build the cumulative [[Development Triangle\\|triangle]] → compute [[Age to Age F…” |
| Develop reported claim counts to ultimate by multiplying the latest reported count by the cumulative count age-to-ultimate factor. | procedure | tagged | Claim Count Triangle: “$$\text{Ultimate Counts} = N_n \times \text{CDF}^{\text{count}}_{n \to \text{ult}}$$” |
| Average severity (average claim size) at each age equals cumulative reported claims divided by cumulative reported claim count at that age;… | formula | tagged | Frequency-Severity Method: “develop an average severity triangle (dollars ÷ counts at each age) to ultimate severity” |
| Unpaid claims estimate equals ultimate claims minus claims paid to date (not minus reported claims). | procedure | syllabus | Unpaid Claims: “$$\text{Unpaid} = \text{Ultimate} - \text{Paid to date}$$” |
| Cumulative reported claim counts can decrease over time when claims that were reported are later closed without payment (e.g. found fraudul… | fact | missing |  |

</details>

<details><summary><code>cas5-2019-q16</code> · answerable</summary>

Tagged pages: Chain Ladder Method, Age to Age Factor, Tail Factor, Development Triangle, External Information in Reserving, Claims Processing Changes

| Item | Kind | Status | Where |
|---|---|---|---|
| An age-to-age (link ratio) development factor is the ratio of cumulative reported claims at one maturity to cumulative reported claims at t… | definition | tagged | Age to Age Factor: “**Age-to-Age Factor** (link ratio) is the ratio of a cohort's cumulative amount at one maturity to …” |
| Select each age-to-age factor from the observed factors using an average (e.g., simple or volume-weighted average) across accident years. | procedure | tagged | Age to Age Factor: “**Volume-weighted (all-year)** — the ratio of column sums. Weights each year by its size, so it is …” |
| The cumulative development factor to ultimate at a given maturity is the product of the selected age-to-age factors from that maturity onwa… | formula | linked | Cumulative Development Factor: “**Cumulative Development Factor** (CDF, or age-to-ultimate factor) is the product of all selected […” |
| In the reported development technique, ultimate claims equal current cumulative reported claims multiplied by the cumulative development fa… | formula | tagged | Chain Ladder Method: “$$U_{\text{AY}} = C_{\text{AY},\,n} \times \text{CDF}_{n \to \text{ult}}$$” |
| Before supplementing company data with industry development data, one should check comparability of the industry data, such as differences … | fact | tagged | External Information in Reserving: “**Never use external data unadjusted.** It must be reconciled to the subject book on the dimensions…” |
| The reported development technique assumes historical development patterns remain stable; changes in claims handling (e.g., more adjusters … | fact | tagged | Chain Ladder Method: “**The pattern is stable over calendar time.** Violated by a change in [[Case Adequacy\\|case adequac…” |

</details>

<details><summary><code>cas5-2019-q17</code> · answerable</summary>

Tagged pages: Bornhuetter-Ferguson Method, Loss Trend, Development Triangle, Data Segmentation, Mix of Business

| Item | Kind | Status | Where |
|---|---|---|---|
| Bornhuetter-Ferguson ultimate claims = reported claims + expected claims ratio × earned premium × (1 − 1/age-to-ultimate factor), where the… | formula | tagged | Bornhuetter-Ferguson Method: “$$U_{\text{BF}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) \times U_{0}$$” |
| The percent unreported at a given maturity equals 1 minus the reciprocal of the reported age-to-ultimate factor (1 − 1/CDF). | definition | tagged | Bornhuetter-Ferguson Method: “$1 - 1/\text{CDF}$ the percentage unreported from the [[Development Triangle\\|development pattern]].” |
| A combined expected claims ratio is the premium-weighted average of the regional expected claims ratios, so one region's ELR can be backed … | procedure | tagged | Mix of Business: “$$\overline{\text{LR}} = \sum_i w_i \times \text{LR}_i$$” |
| To trend an expected claims ratio from one accident year to another, multiply by (1 + frequency trend) × (1 + severity trend) for each year… | procedure | tagged | Loss Trend: “$$1 + t_{PP} = (1 + t_{\text{freq}})(1 + t_{\text{sev}})$$” |
| Each age-to-ultimate factor applies to the accident year at its corresponding maturity at the evaluation date (e.g., latest accident year a… | fact | tagged | Development Triangle: “- Cell $C_{\text{AY},k}$ holds the cumulative amount for that accident year at age $k$.” |
| Data from segments should not be combined when they have different development patterns, different trends, or a shifting mix of business; i… | fact | tagged | Development Triangle: “Assumptions being made implicitly by using one at all: each cohort develops in a similar pattern, t…” |

</details>

<details><summary><code>cas5-2019-q18</code> · answerable</summary>

Tagged pages: Cape Cod Method, Bornhuetter-Ferguson Method, Loss Trend, Ultimate Loss, Case Adequacy

| Item | Kind | Status | Where |
|---|---|---|---|
| Cape Cod ultimate claims for an accident year equal reported claims plus the expected claims ratio times earned premium times the percent u… | formula | tagged | Cape Cod Method: “$$\text{IBNR}_i = \text{ELR} \times \text{EP}_i \times \left(1 - \tfrac{1}{\text{CDF}_i}\right)$$” |
| Used-up premium (premium exposed to date) for an accident year is its on-level earned premium divided by its age-to-ultimate development fa… | definition | tagged | Cape Cod Method: “**Used-up premium** $\text{EP}_i / \text{CDF}_i$ is the share of each year's premium "exposed" to t…” |
| The Cape Cod expected claims ratio is the sum of trended reported claims across accident years divided by the sum of used-up premiums acros… | formula | tagged | Cape Cod Method: “$$\text{ELR} = \frac{\sum_i C_i}{\sum_i \text{EP}_i \times \tfrac{1}{\text{CDF}_i}}$$” |
| To put each accident year's claims on the cost level of the target year, apply pure premium trend factors (to a common cost level, e.g., di… | procedure | tagged | Loss Trend: “applied to bring historical losses from the cost level of the experience period to the cost level o…” |
| Premium is brought to current rate level (on-leveled) and adjusted for premium trend before use in Cape Cod; with no rate changes and no pr… | procedure | tagged | Cape Cod Method: “Premium **must be on level** and losses must be trended to a common cost level before the ELR is co…” |
| A change in case reserve adequacy distorts reported claims and reported development factors, so reported Cape Cod gives distorted ultimates… | fact | tagged | Case Adequacy: “**Paid data is immune**, so a divergence between paid and reported chain ladder estimates is the co…” |

</details>

<details><summary><code>cas5-2019-q19</code> · gap</summary>

Tagged pages: Bornhuetter-Ferguson Method, Chain Ladder Method, Ultimate Loss, IBNR, Changing Conditions

| Item | Kind | Status | Where |
|---|---|---|---|
| The reported development technique estimates ultimate claims as reported claims times the reported age-to-ultimate (cumulative development)… | formula | tagged | Chain Ladder Method: “$$U_{\text{AY}} = C_{\text{AY},\,n} \times \text{CDF}_{n \to \text{ult}}$$” |
| The Bornhuetter-Ferguson technique estimates ultimate claims as reported claims plus expected claims (expected claims ratio times premium) … | formula | tagged | Bornhuetter-Ferguson Method: “$$U_{\text{BF}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) \times U_{0}$$” |
| Unpaid claims equal ultimate claims minus paid claims, and consist of case reserves (reported minus paid claims) plus pure IBNR (ultimate m… | definition | tagged | IBNR: “$$\text{IBNR} = \text{Ultimate} - \text{Reported}$$” |
| A change in the legal environment such as tort reform affects only future claim payments: already-paid claims are unchanged, while both cas… | fact | missing |  |
| To incorporate a change affecting future payments, compute the unadjusted unpaid estimate under the technique, multiply it by (1 − reductio… | procedure | missing |  |

</details>

<details><summary><code>cas5-2019-q2</code> · answerable</summary>

Tagged pages: On Level Premium, Premium Trend, Earned Premium, Parallelogram Method

| Item | Kind | Status | Where |
|---|---|---|---|
| The parallelogram method on-levels earned premium by splitting the calendar-year earned premium into regions of each rate level, based on r… | procedure | tagged | Parallelogram Method: “A calendar year is a unit square: time across, fraction of the policy term earned up. A rate change…” |
| The on-level factor equals the current rate level divided by the average rate level in the period; on-level premium equals earned premium t… | formula | tagged | On Level Premium: “$$\text{On-Level Factor} = \frac{\text{Current cumulative rate level index}}{\text{Average rate lev…” |
| Cumulative rate level indices are found by multiplying successive (1 + rate change) factors. | formula | tagged | On Level Premium: “Rate level indices **compound**: successive changes of $+8\%$ and $+5\%$ give a cumulative index of…” |
| Estimate the premium trend from the year-over-year change in average written premium at current rate level (comparing like quarters) and se… | procedure | tagged | Premium Trend: “The trend is measured on the **average premium per exposure at current rate level**, usually from w…” |
| The trend period runs from the average written date of the historical earned premium (average earned date less half the policy term) to the… | procedure | tagged | Premium Trend: “The trend period $n$ runs from the average written date of the policies earning premium in the expe…” |
| Trended premium equals on-level premium times (1 + annual trend) raised to the trend period in years. | formula | tagged | Premium Trend: “$$\text{Premium Trend Factor} = (1 + t_P)^{n}$$” |
| Longer policy terms (annual vs semi-annual) give an earlier average written date for the earned premium, lengthening the trend period and r… | fact | tagged | Premium Trend: “with six-month policies the trend-from date moves to $4/1/2011$ and the period is $2.25$ years.” |
| Longer policy terms spread rate changes over a longer earning period, so more of the calendar-year earned premium is at older, lower rate l… | fact | tagged | Parallelogram Method (collapsed): “Six-month policies take on a change faster, so they need a smaller adjustment” |

</details>

<details><summary><code>cas5-2019-q20</code> · gap</summary>

Tagged pages: Tail Factor, Severity Analysis, Development Triangle, Frequency-Severity Method

| Item | Kind | Status | Where |
|---|---|---|---|
| A frequency-severity tail severity is computed by pooling all incremental paid claims and closed claim counts at the maturity age and older… | procedure | missing |  |
| Adjust historical claim costs for a legislative change by applying the cost-change factor (1 minus the reduction) only to accident years wh… | procedure | linked | Loss Trend: “A benefit-level change is restated in the data, or allowed for in the selection, so that it is not …” |
| Trend severities to a target cost level by compounding the annual severity trend over the period from each accident year's average accident… | procedure | linked | Loss Trend: “$t$ is the selected annual trend and $n$ the **trend period**, measured from the average date of lo…” |
| The maturity age for the tail should be set where data becomes erratic or sparse, so pooling older data gives a more stable and credible es… | fact | missing |  |
| Choosing the tail maturity age involves a trade-off: too late leaves too little data in the tail for credibility, too early discards reliab… | fact | missing |  |

</details>

<details><summary><code>cas5-2019-q21</code> · answerable</summary>

Tagged pages: Chain Ladder Method, IBNR, Changing Conditions

| Item | Kind | Status | Where |
|---|---|---|---|
| Elevated reported claims at constant frequency, with no catastrophe/large claims and no change in case reserve adequacy or claims handling,… | fact | tagged | Changing Conditions: “**External environment:** [[Inflation\\|inflation]] (a calendar-year effect on every open claim) and…” |
| The reported (chain ladder) development method is responsive to changes in the claims ratio and is appropriate when claims handling and cas… | fact | tagged | Changing Conditions: “With reported claims the [[Chain Ladder Method\\|development technique]] assumes [[Case Adequacy\\|ca…” |
| The frequency/severity method projects ultimate claim counts (frequency times exposure) and ultimate severity separately, so it can isolate… | procedure | linked | Frequency-Severity Method: “**Frequency-Severity Method** projects [[Claim Count Triangle\\|claim counts]] and average [[Severit…” |
| The Bornhuetter-Ferguson method blends reported claims with an a priori expected claims ratio applied to the unreported portion, so it is n… | fact | tagged | IBNR: “the [[Bornhuetter-Ferguson Method\\|BF]] method by applying the unreported percentage to an a priori” |
| The expected claims method applies an expected claims ratio to premium (exposure), so it accounts for changes in premium or volume independ… | fact | linked | Expected Loss Method: “**Expected Loss Method** (expected claims technique) estimates ultimate losses entirely from an a p…” |
| When reinsurance terms change, estimate ultimate claims on gross (direct) data, then adjust for the new contract; alternatively, restate pr… | procedure | tagged | Changing Conditions: “restate history to current retentions or benefit levels.” |

</details>

<details><summary><code>cas5-2019-q22</code> · gap</summary>

Tagged pages: Berquist-Sherman Method, Chain Ladder Method, Development Triangle, Ultimate Loss, Case Adequacy

| Item | Kind | Status | Where |
|---|---|---|---|
| Reported (case-incurred) claims equal cumulative paid claims plus case outstanding reserves, where case outstanding equals average case out… | definition | tagged | Case Adequacy: “$$\text{Avg Case Outstanding} = \frac{\text{Case Reserves}}{\text{Open Claim Counts}}$$” |
| To adjust for a change in case reserve adequacy, restate historical average case outstanding at the latest (current) adequacy level by detr… | procedure | tagged | Berquist-Sherman Method: “$$\text{Adjusted Case}_{\text{AY},n} = \text{Case}_{\text{latest},n} \times \left(1 + t\right)^{-(\…” |
| Apply the adjustment only to the claim segment affected by the change in case reserve adequacy (e.g., large claims) and leave unaffected se… | procedure | missing |  |
| Age-to-age development factors are computed as ratios of successive cumulative reported claims for each accident year, and the selected fac… | formula | tagged | Development Triangle: “$$f_{k \to k+1} = \frac{\sum_{\text{AY}} C_{\text{AY},\,k+1}}{\sum_{\text{AY}} C_{\text{AY},\,k}}$$” |
| Age-to-ultimate factors are the cumulative product of selected age-to-age factors from a given age through the tail factor (including the t… | formula | tagged | Chain Ladder Method: “**The procedure:** build the cumulative [[Development Triangle\\|triangle]] → compute [[Age to Age F…” |
| Ultimate claims under the reported development technique equal reported claims at the current age times the age-to-ultimate reported develo… | formula | tagged | Chain Ladder Method: “$$U_{\text{AY}} = C_{\text{AY},\,n} \times \text{CDF}_{n \to \text{ult}}$$” |
| Total ultimate claims are obtained by estimating ultimates separately for large and small claim segments and summing them. | fact | tagged | Chain Ladder Method: “Corrected — remove the shock loss, develop the rest, add it back:” |

</details>

<details><summary><code>cas5-2019-q23</code> · untagged</summary>

Tagged pages: Reinsurance, IBNR, Chain Ladder Method, Ultimate Loss, Net Losses, Net of Reinsurance

| Item | Kind | Status | Where |
|---|---|---|---|
| Under the reported development technique, ultimate claims equal reported claims divided by the percent reported (the reciprocal of the repo… | formula | tagged | Chain Ladder Method: “$$U_{\text{AY}} = C_{\text{AY},\,n} \times \text{CDF}_{n \to \text{ult}}$$” |
| A per occurrence retention limits the retained amount of each claim to the retention, so a large claim's retained amount is the lesser of t… | fact | linked | Large Loss: “$$\text{Capped Loss} = \min(X, M)$$” |
| Large claims known to have no further development are handled separately from the development of the remaining claims: they are held at the… | procedure | tagged | Chain Ladder Method: “**Corrected — remove the shock loss, develop the rest, add it back:**” |
| A stop-loss (aggregate) limit caps total retained ultimate claims at the limit; when one limit applies to several accident years combined, … | fact | elsewhere | Aggregate Excess of Loss: “The reinsurer pays the aggregate in excess of an aggregate retention $A$, up to an aggregate limit …” |
| Retained IBNR equals total retained ultimate claims (net of per occurrence retention and stop-loss limits) minus total retained reported cl… | formula | tagged | IBNR: “$$\text{IBNR} = \text{Ultimate} - \text{Reported}$$” |

</details>

<details><summary><code>cas5-2019-q24</code> · gap</summary>

Tagged pages: Development Triangle, Age to Age Factor, Ultimate Loss, Allocated Loss Adjustment Expense

| Item | Kind | Status | Where |
|---|---|---|---|
| The ALAE ratio at a given maturity is cumulative paid ALAE divided by cumulative paid claims (loss) only at that same maturity. | definition | tagged | Allocated Loss Adjustment Expense: “$$\text{ALAE Ratio} = \frac{\text{ALAE}}{\text{Indemnity}}$$” |
| In the multiplicative ratio development approach, compute age-to-age link ratios as the ratio of successive ALAE ratios (ALAE ratio at late… | procedure | tagged | Age to Age Factor: “$$f_{n \to n+1}^{\text{AY}} = \frac{C_{\text{AY},\,n+1}}{C_{\text{AY},\,n}}$$” |
| Multiply the selected age-to-age ratio factors (with a tail factor of 1.000 when there is no development beyond the last age) to get the cu… | procedure | linked | Chain Ladder Method: “**The procedure:** build the cumulative [[Development Triangle\\|triangle]] → compute [[Age to Age F…” |
| Ultimate ALAE equals the projected ultimate ALAE ratio multiplied by the selected ultimate claims (loss) estimate for the accident year. | procedure | tagged | Allocated Loss Adjustment Expense: “Friedland gives three approaches: develop a **combined** loss-and-ALAE triangle, develop **ALAE sep…” |
| The additive ratio approach is preferred over the multiplicative approach when ALAE ratios are very small (especially at early maturities),… | fact | missing |  |
| Advantages of ratio techniques: they recognize the relationship between losses and ALAE, provide diagnostics (unreasonable year ratios can … | fact | missing |  |
| Disadvantages of ratio techniques: errors in ultimate claims estimates carry into ultimate ALAE, early-maturity ratios are distorted when A… | fact | tagged | Allocated Loss Adjustment Expense (collapsed): “If instead ALAE were $85\%$ paid against $63\%$ on indemnity, the ratio method would be projecting …” |

</details>

<details><summary><code>cas5-2019-q3</code> · answerable</summary>

Tagged pages: Ratemaking Data Organization, Calendar Year, Report Year, Claims Made Coverage, Accident Year

| Item | Kind | Status | Where |
|---|---|---|---|
| Calendar year aggregation groups premium/exposure and losses by the calendar period in which they are earned/recorded (transactions occur),… | definition | tagged | Ratemaking Data Organization: “**[[Calendar Year]]** — everything booked in the year.” |
| An advantage of calendar year data is that it is fixed at the end of the period, so it is immediately available, easy and inexpensive to co… | fact | tagged | Ratemaking Data Organization: “Available quickly and already collected for financial reporting” |
| A disadvantage of calendar year data is a poor match of losses to premium/exposure, since it mixes losses and exposures from different acci… | fact | tagged | Ratemaking Data Organization: “Available quickly and already collected for financial reporting, but its losses include payments an…” |
| Accident year aggregation groups losses by the date of occurrence and policy year aggregation groups losses by the effective date of the po… | definition | tagged | Ratemaking Data Organization: “**[[Accident Year]]** — losses by occurrence date against premium earned in the same year.” |
| Accident year and policy year aggregation match losses to premium/exposure much better than calendar year data (policy year most closely), … | fact | tagged | Calendar Year: “[[Accident Year]] aggregation matches premium and losses better, and [[Policy Year]] best — see [[R…” |
| Risk classification analysis requires losses to be well matched to the exposures that generated them, so accident year or policy year aggre… | fact | tagged | Ratemaking Data Organization: “Werner & Modlin set three objectives for it: **accurately match losses and premium** for the policy…” |
| Under claims-made coverage, the trigger is the report date of the claim, so report year aggregation matches losses to the premium/exposure … | fact | tagged | Report Year: “RY is the correct basis for [[Claims Made Coverage\\|claims-made]] coverage, because a claims-made p…” |
| Claims-made policies and report year data have no pure IBNR once the period ends, only IBNER on reported claims, so report year data develo… | fact | tagged | Report Year: “A report year **closes to new claims** at year end — pure [[IBNR]] is zero by construction, since e…” |

</details>

<details><summary><code>cas5-2019-q4</code> · untagged</summary>

Tagged pages: Loss Trend, Increased Limits, Large Loss

| Item | Kind | Status | Where |
|---|---|---|---|
| To measure the basic limits loss trend, apply the severity trend factor to each ground-up (total limits) loss, cap both the original and th… | procedure | elsewhere | Excess of Loss (collapsed): “**Leverage:** untrended layer losses are $150 + 0 + 650 + 50 = 850$, so trend raised them by $1{,}1…” |
| A claim's excess loss is the portion of its total limits loss above the basic limit, equal to total limits loss minus basic limits (capped)… | definition | tagged | Increased Limits: “reflecting the additional expected loss in the layer above the basic limit” |
| To measure the excess loss trend, compute trended excess loss as trended total (uncapped) loss minus trended basic limits loss, and compare… | procedure | elsewhere | Excess of Loss: “Trend each historical loss individually *before* applying the layer. Excess losses grow faster than…” |
| When a uniform severity trend applies to total limits losses, the basic limits layer trends slower than the total trend and the excess laye… | fact | tagged | Loss Trend: “for a positive trend, basic-limits losses trend more slowly than total-limits losses and the excess…” |
| Applying the total limits trend to basic limits losses is inappropriate because it overstates basic limits trend; basic limits and excess l… | fact | tagged | Loss Trend: “so a severity trend measured on total-limits data must be adjusted before it is applied to basic-li…” |

</details>

<details><summary><code>cas5-2019-q5</code> · answerable</summary>

Tagged pages: Large Loss, Loss Trend, Severity, Trend, Extraordinary Losses, Exponential Trend

| Item | Kind | Status | Where |
|---|---|---|---|
| Select frequency and severity trends from exponential-trend fits over different numbers of points, choosing longer-term fits when the trend… | procedure | tagged | Exponential Trend: “Werner's example fits windows of 20, 16, 12, 8, 6 and 4 points, and $R^2$ is the usual diagnostic; …” |
| When severity trend has changed recently, use two-step trending: the longer-term trend for the historical experience period to the current … | procedure | tagged | Loss Trend: “losses are first trended at a *current* trend from the experience period's average accident date to…” |
| Determine the number of trend years for each accident year as the time from the average accident date of that year (for annual policies, Ju… | procedure | tagged | Loss Trend: “$t$ is the selected annual trend and $n$ the **trend period**, measured from the average date of lo…” |
| Trend historical cumulative losses and shock (ground-up) losses to the future level, removing trended shock losses from trended total losse… | procedure | tagged | Large Loss: “Ideally the procedure is run on losses trended to future levels, since higher layers are subject to…” |
| Excess loss load (ratio) equals trended excess losses (shock losses minus threshold per claim) divided by trended losses with excess remove… | formula | tagged | Large Loss: “$$\text{Excess Load} = \frac{\text{Expected losses above } M}{\text{Expected losses below } M}$$” |
| Develop the latest-year losses (after removing excess over the threshold) to ultimate by multiplying by the cumulative product of selected … | procedure | linked | Loss Development: “$$\text{Ultimate Losses} = \text{Losses at age } n \times \text{CDF}_{n \to \text{ult}}$$” |
| Approaches to selecting an excess (shock) loss threshold include choosing a quantile/percentile of the loss distribution where large losses… | fact | tagged | Large Loss: “Otherwise Werner sets it to balance including as many losses as possible against minimizing volatil…” |

</details>

<details><summary><code>cas5-2019-q6</code> · gap</summary>

Tagged pages: Variable Expenses, Fixed Expenses, Permissible Loss Ratio, Profit and Contingency Provision, Expense Ratio

| Item | Kind | Status | Where |
|---|---|---|---|
| Compute each expense ratio using the appropriate premium base: commissions, other acquisition and taxes/licenses/fees are divided by direct… | procedure | tagged | Expense Ratio: “Werner splits the categories by when they are incurred: those incurred at the onset of the policy (…” |
| Select a ratemaking expense ratio for each expense category by comparing the latest year's ratio with prior years and averaging stable year… | procedure | missing |  |
| Variable permissible loss ratio = 1 - variable expense ratio - profit provision. | formula | linked | Expense Provisions: “The **variable permissible loss ratio** is what is left after the variable expense and profit provi…” |
| Expenses that do not vary with premium are removed from the variable expense ratio and recovered as a flat fixed dollar amount per policy (… | procedure | tagged | Fixed Expenses: “They cost roughly the same on a $\$500$ policy as on a $\$5{,}000$ one, so they are recovered as a …” |
| Treating fixed expenses as variable with premium understates the premium for small-premium policies and overstates it for large-premium pol… | fact | tagged | Fixed Expenses: “Loading fixed expenses as a percentage of premium instead — the **all-variable expense method** — u…” |
| Countrywide or benchmark expense ratios may be inappropriate for a new state because expenses (e.g., taxes, commissions) vary by state and … | fact | missing |  |

</details>

<details><summary><code>cas5-2019-q7</code> · answerable</summary>

Tagged pages: Bornhuetter-Ferguson Method, Overall Rate Level Indication, Loss Trend, On Level Premium, Complement of Credibility, Parallelogram Method

| Item | Kind | Status | Where |
|---|---|---|---|
| Bornhuetter-Ferguson ultimate loss = reported loss + (1 - 1/CDF to ultimate) × earned premium × expected loss ratio, where the unreported p… | formula | tagged | Bornhuetter-Ferguson Method: “$$U_{\text{BF}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) \times U_{0}$$” |
| On-level earned premium is calculated by multiplying earned premium by an on-level factor equal to the current rate level divided by the av… | procedure | tagged | On Level Premium: “$$\text{On-Level Premium} = \text{Historical EP} \times \text{On-Level Factor}$$” |
| Premium and loss are trended from the average written/accident date of the historical period to the average written/earned or loss date of … | procedure | tagged | Loss Trend: “$t$ is the selected annual trend and $n$ the **trend period**, measured from the average date of lo…” |
| ULAE is incorporated by loading loss and ALAE with the ULAE provision percentage (multiplying by 1 + ULAE ratio) before computing the loss … | procedure | linked | Unallocated Loss Adjustment Expenses ULAE: “In **ratemaking**, ULAE may be handled as a load on losses or as a [[Fixed Expenses\\|fixed expense]…” |
| Loss ratio method indicated rate change = (projected loss ratio + fixed expense ratio) / (1 - variable expense ratio - profit provision) - … | formula | tagged | Overall Rate Level Indication: “$$\text{Indicated Change} = \frac{\text{Projected Loss \& LAE Ratio} + F\%}{1 - V - Q_T} - 1$$” |
| The credibility-weighted indicated change equals Z × the company's indicated change plus (1 - Z) × the complement of credibility. | formula | tagged | Complement of Credibility: “$$\text{Estimate} = Z \times \text{Experience} + (1 - Z) \times \text{Complement}$$” |
| A competitor's rate change is a poor complement of credibility because the competitor's book (mix of business, limits, underwriting, and go… | fact | tagged | Complement of Credibility: “5. **Trended present rates** — the current rate adjusted to what was last *indicated* rather than i…” |

</details>

<details><summary><code>cas5-2019-q8</code> · answerable</summary>

Tagged pages: Classification Ratemaking, Principles of Ratemaking, Rate Change

| Item | Kind | Status | Where |
|---|---|---|---|
| Expected total profit equals total revenue (sum over classes of number of risks times rate per risk) minus total losses and expenses minus … | formula | linked | Lifetime Value: “$$\text{LTV} = \sum_{t=1}^{T} \frac{\left(P_t - L_t - E_t\right) \times {}_{t}p}{(1 + r)^{t}}$$” |
| Insureds are price sensitive: when an insurer raises rates relative to competitors, insureds may shop elsewhere and the number of risks fal… | fact | tagged | Rate Change: “price-sensitive risks shop, so a large increase can worsen the remaining experience through adverse…” |
| Introducing a rating variable that better matches rates to risk lets the insurer attract lower-risk classes with lower rates and shed highe… | fact | tagged | Classification Ratemaking: “In a competitive market an insurer that charges one average rate to a heterogeneous group loses the…” |
| An across-the-board rate increase may cause the best risks, who can find cheaper rates elsewhere, to leave while higher-risk insureds with … | fact | tagged | Rate Change: “price-sensitive risks shop, so a large increase can worsen the remaining experience through adverse…” |
| Holding the number of risks fixed when rates change ignores customer response, so calculated profit may over- or understate true profit; th… | fact | linked | Ratemaking Constraints: “The traditional indication sets a rate without regard to whether the product will be bought. Past s…” |

</details>

<details><summary><code>cas5-2019-q9</code> · gap</summary>

Tagged pages: Classification Ratemaking, Generalized Linear Model, Predictive Analytics

| Item | Kind | Status | Where |
|---|---|---|---|
| Validate a GLM by comparing predicted versus actual values (e.g., pure premium by equal-volume decile sorted by actual loss) on both the tr… | procedure | elsewhere | Model Training and Evaluation: “A [[Quantile Plot\\|quantile plot]] sorts records by predicted loss cost into equal-exposure buckets…” |
| An overfit model captures noise in the training data rather than the underlying signal, so it fits training data very well but fails to gen… | definition | elsewhere | Model Training and Evaluation: “A model with small training error and large test error is [[Overfitting\\|overfitting]]: it has lear…” |
| A model that fits the training data nearly perfectly but gives erratic, volatile predictions that diverge from actuals on the hold-out samp… | fact | elsewhere | Model Validation: “Training error always falls as flexibility rises, while validation error turns up once the model st…” |
| A model whose predictions are stable and consistent across training and hold-out samples, following the trend of actuals, is more likely to… | fact | tagged | Generalized Linear Model: “Model stability is the sensitivity of the model to changes in the modelling data.” |
| Predictions that are flat and fail to match the amplitude of actual differences across deciles (underestimating high deciles, overestimatin… | fact | missing |  |

</details>

<details><summary><code>cas5-2019f-q1</code> · gap</summary>

Tagged pages: Earned Exposure, In-Force, Policy Year, Calendar Year

| Item | Kind | Status | Where |
|---|---|---|---|
| Written exposures are exposures on policies written (incepted) in a period; earned exposures are the portion of written exposures whose cov… | definition | tagged | Earned Exposure: “**Earned Exposure** is the portion of written exposure for which coverage has actually been provide…” |
| To derive a non-uniform quarterly earning pattern from exposure data, divide each calendar quarter's earned exposures by the exposures in f… | procedure | missing |  |
| Earned exposures for a cohort of annual policies as of a date equal the written exposures times the sum of the earning pattern fractions fo… | procedure | tagged | Earned Exposure: “written the day it is issued, earned $1/12$ per month, in force from effective date to expiry.” |
| In-force exposures at a date are found by summing written exposures of policies already incepted whose term (e.g., twelve months from the f… | procedure | tagged | In-Force: “\text{In-force at date } t = \sum_{\text{policies}} \mathbf{1}\{\text{effective} \le t < \text{expi…” |
| Unearned exposures at a date equal the sum over unexpired cohorts of written exposures times the unearned fraction (one minus the cumulativ… | formula | tagged | Earned Exposure: “\text{Earned Exposure} = \text{Written Exposure} - \Delta\text{Unearned Exposure}” |
| Calendar period earned exposures equal the in-force exposures during the period (by cohort) times that calendar quarter's earning pattern f… | formula | missing |  |
| Calendar year earned exposures differ from policy year earned exposures: calendar-year figures include earning from all policy years during… | fact | tagged | Policy Year: “groups every premium and loss transaction belonging to policies *incepting* in a given calendar yea…” |

</details>

<details><summary><code>cas5-2019f-q10</code> · gap</summary>

Tagged pages: Generalized Linear Model, Variable Selection, Classification Ratemaking, Hypothesis Testing

| Item | Kind | Status | Where |
|---|---|---|---|
| The consistency test fits the same GLM separately to each year of experience and plots the resulting relativities for a variable side by si… | definition | missing |  |
| A variable whose fitted relativities keep the same direction, shape and slope across years passes the consistency test and is a stable pred… | fact | missing |  |
| Exposure volume bars shown on a relativity plot indicate how much data supports each level, helping distinguish genuinely unstable relativi… | fact | tagged | Classification Ratemaking: “risk classes should be large enough to allow credible statistical inferences about expected outcome…” |
| Statistical significance test: test the null hypothesis that a variable's parameters are zero using a chi-square test on the deviance with … | procedure | tagged | Hypothesis Testing: “Reject $H_0$ when p-value $< \alpha$” |
| Standard error test: examine the standard errors or confidence intervals around fitted parameters; wide intervals, especially those spannin… | procedure | elsewhere | Statistical Significance: “The 95% [[Confidence Interval\\|confidence interval]] is $\hat{\beta} \pm 1.96\,\mathrm{SE}$, and ex…” |
| Judgment (common-sense) test: fitted relativities should be intuitive and explainable in direction and magnitude, and the variable must be … | fact | tagged | Variable Selection: “Variable selection should combine statistical significance (from the [[Parameter Estimate Tables\\|p…” |
| Tests for deciding whether to include a specific variable (significance, standard error, consistency, judgment) are distinct from measures … | fact | tagged | Variable Selection: “Lower [[AIC]] or [[BIC]] indicates a better trade-off between fit and complexity” |

</details>

<details><summary><code>cas5-2019f-q11</code> · gap</summary>

Tagged pages: Generalized Linear Model, Univariate Plot, Classification Ratemaking, Adverse Selection

| Item | Kind | Status | Where |
|---|---|---|---|
| The base level of a rating variable is the reference level whose relativity is set to 1.00, and all other levels' relativities are expresse… | definition | tagged | Classification Ratemaking: “the factors by which each class's rate differs from the base class” |
| In both one-way analyses and GLMs the base level of a variable is conventionally chosen as the level with the most exposures, since it is t… | fact | missing |  |
| A one-way analysis estimates each level of a rating variable using only the raw experience of that level, ignoring all other rating variabl… | definition | tagged | Classification Ratemaking: “A univariate** (one-way) pure premium or loss ratio analysis attributes to a variable the effect of…” |
| Exposure correlation (distributional bias) occurs when the distribution of one rating variable differs across levels of another, so that a … | definition | tagged | Classification Ratemaking: “If young drivers also drive older cars, a one-way age relativity contains part of the vehicle-age e…” |
| A GLM estimates all rating variables simultaneously, holding the others constant, so each variable's relativity reflects only its own effec… | fact | tagged | Generalized Linear Model: “it estimates every rating variable *simultaneously* and so reports each one net of the others” |
| Using less accurate one-way relativities overcharges some segments and undercharges others, causing adverse selection: the insurer loses ov… | fact | tagged | Adverse Selection: “**Adverse Selection** is the tendency for those who know they are worse-than-average risks to buy m…” |

</details>

<details><summary><code>cas5-2019f-q12</code> · gap</summary>

Tagged pages: Complement of Credibility, Pure Premium, Classification Ratemaking, Credibility

| Item | Kind | Status | Where |
|---|---|---|---|
| Harwayne's Method builds a complement of credibility from another group's (e.g., other states') experience by adjusting for differences in … | definition | tagged | Complement of Credibility: “**Harwayne's method** — other states' data adjusted to remove the overall differences between state…” |
| When the complement is built from all other states, remove the subject state's exposures and losses from the countrywide totals for each cl… | procedure | missing |  |
| Pure premium for a class equals losses divided by exposures. | formula | tagged | Pure Premium: “$$\text{Pure Premium} = \frac{\text{Losses} + \text{LAE}}{\text{Earned Exposures}}$$” |
| In Harwayne's Method, compute the other states' overall average pure premium using the subject state's exposure distribution as weights acr… | procedure | tagged | Complement of Credibility (collapsed): “**Step 2 — Y's and Z's average pure premiums on State X's class mix** (X's exposures, each state's …” |
| Harwayne's adjustment factor equals the subject state's overall pure premium divided by the other states' overall pure premium re-weighted … | formula | tagged | Complement of Credibility (collapsed): “F_Y &= \frac{4.20}{5.04} = 0.833, & \hat{L}_{1,Y} &= 3.60(0.833) = \$3.00 \\[4pt]” |
| The Harwayne complement for a class equals the adjustment factor times the other states' pure premium for that class. | formula | tagged | Complement of Credibility (collapsed): “F_Y &= \frac{4.20}{5.04} = 0.833, & \hat{L}_{1,Y} &= 3.60(0.833) = \$3.00 \\[4pt]” |
| Advantages of using the current rate as the complement of credibility over Harwayne's method are that it is simpler and quicker to compute … | fact | tagged | Complement of Credibility: “**easy to compute** — easy to perform and understand, which matters most when the actuary must just…” |

</details>

<details><summary><code>cas5-2019f-q13</code> · gap</summary>

Tagged pages: Increased Limits, Limited Expected Value, Censoring, Severity

| Item | Kind | Status | Where |
|---|---|---|---|
| The increased limit factor (ILF) for a limit is the ratio of the limited average severity at that limit to the limited average severity at … | definition | tagged | Increased Limits: “$$\text{ILF}(L) = \frac{E[X \wedge L]}{E[X \wedge B]}$$” |
| Limited average severity at a limit equals the sum of the limited average severities of successive layers from zero up to that limit (e.g.,… | formula | elsewhere | Layer of Insurance: “Layers stack: the layers of a tower add up to the ground-up loss.” |
| Policy limits censor the loss data: a policy cannot show losses above its limit, so for each layer only policies with limits at or above th… | fact | tagged | Increased Limits: “building the limited average severity layer by layer so that losses censored at policy limits intro…” |
| Compute a layer's average severity by pooling all eligible policies' claims, taking each claim's contribution as min(loss, layer top) minus… | procedure | elsewhere | Layer of Insurance (collapsed): “Cap each claim at $750$ and at $250$, then difference the totals:” |
| Using the stated assumption about payment amounts (e.g., claims are paid at either a fixed fraction of the limit or the full limit), split … | procedure | missing |  |

</details>

<details><summary><code>cas5-2019f-q14</code> · answerable</summary>

Tagged pages: Coinsurance Rating, Coinsurance, Coinsurance Percentage

| Item | Kind | Status | Where |
|---|---|---|---|
| A coinsurance clause requires the insured to carry insurance of at least a specified coinsurance percentage times the property's value, and… | definition | tagged | Coinsurance Rating: “the insured agrees to carry limits of at least, say, $80\%$ of the property's value. Fall short and…” |
| The coinsurance apportionment factor is the lesser of 1 and (insurance carried) divided by (coinsurance percentage times property value). | formula | tagged | Coinsurance Rating: “$$\text{Recovery}_{\text{clause}} = \min\!\left(\frac{\text{Insurance Carried}}{\text{Coinsurance \…” |
| The insurer's payment equals the lesser of the apportionment factor times the loss and the insured amount (policy limit); the policyholder … | formula | tagged | Coinsurance: “$$\text{Property payment} = \min\left(\min\left(\frac{C}{p \times V},\ 1\right) \times L - D,\ C\ri…” |
| Coinsurance is a penalty on underinsurance applied to the loss payment, distinct from a copayment in which the insured shares a fixed perce… | fact | tagged | Coinsurance Rating: “**Coinsurance Rating** prices the two distinct provisions that go by the name *coinsurance*: the **…” |
| Coinsurance promotes equitable rates because property rates assume insurance to value, and reducing loss payments at the time of loss only … | fact | tagged | Coinsurance Rating: “Because most property losses are partial, an insured carrying $50\%$ of value would otherwise pay h…” |
| Coinsurance promotes adequate rates by reducing losses paid on underinsured risks and by encouraging (not requiring or guaranteeing) insure… | fact | tagged | Coinsurance Rating: “Because most property losses are partial, an insured carrying $50\%$ of value would otherwise pay h…” |

</details>

<details><summary><code>cas5-2019f-q15</code> · untagged</summary>

Tagged pages: Schedule Rating, Experience Rating, Retrospective Rating, Workers Compensation Insurance, Commercial Lines Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| Schedule rating is a subjective debit or credit applied by the underwriter to reflect risk characteristics not otherwise captured in the ma… | definition | tagged | Schedule Rating: “**Schedule Rating** applies underwriter-assigned debits and credits to the manual premium for chara…” |
| Experience rating looks backward at the insured's historical losses, so a recent change such as a new loss-control program has no emerged e… | fact | tagged | Schedule Rating: “If a risk has made a recent change that will likely impact its loss experience, then it is appropri…” |
| Once a change's effect has emerged in the insured's loss experience and is reflected in the experience modification, the schedule credit gr… | procedure | tagged | Schedule Rating: “A risk that has always had the characteristic — a full-time safety manager throughout the experienc…” |
| Manual premium equals the manual rate times the exposure base, so a change in exposure (e.g., workers compensation payroll) flows directly … | formula | elsewhere | Rating Plan: “$$\text{Manual Premium} = \text{Exposure} \times \text{Base Rate} \times \prod_k f_k$$” |
| Workers compensation is rated using payroll as the exposure base, so a larger workforce increases exposure and premium roughly proportional… | fact | syllabus | Exposure Base: “Payroll is the workers compensation base because it is responsive to changes in exposure: as the nu…” |
| A premium discount reduces the premium for larger policies because fixed expenses are a smaller percentage of premium as policy size grows. | definition | tagged | Commercial Lines Rating: “premium discount (for size)” |
| Retrospective rating determines the final premium after the policy period from the insured's own losses during that period, subject to a mi… | definition | tagged | Retrospective Rating: “**Retrospective Rating** adjusts a policy's premium *after* the period, based on the insured's own …” |
| A large deductible policy has the insured retain losses below a substantial deductible, lowering premium while the insurer covers losses ab… | definition | elsewhere | Loss Sensitive Rating: “*Large deductible:* the insurer pays every claim and bills the deductible back. It must have a per-…” |

</details>

<details><summary><code>cas5-2019f-q16</code> · answerable</summary>

Tagged pages: Unpaid Claims, IBNR, Case Reserves, Loss Reserving, Stakeholder Reporting, Reserve Adequacy

| Item | Kind | Status | Where |
|---|---|---|---|
| Case outstanding is the unpaid amount held on claims that have been reported to and recorded by the insurer, as set by claims adjusters. | definition | tagged | Case Reserves: “**Case reserves** (also called case outstanding) are claim-specific estimates of the expected futur…” |
| IBNER (incurred but not enough reported) is the expected future development on reported claims, i.e. the amount by which case reserves on k… | definition | tagged | IBNR: “**IBNER** — incurred but not enough reported — is expected development on claims already in the cas…” |
| IBNYR (pure IBNR, incurred but not yet reported) is the estimate for claims that have occurred but have not yet been reported to the insure… | definition | tagged | IBNR: “**Pure IBNR** (narrow IBNR) covers claims that have occurred but are unknown to the insurer.” |
| Unpaid claims estimate = case outstanding + IBNER + IBNYR; reopened claims and claims in transit (reported but not yet recorded) are additi… | formula | tagged | Unpaid Claims: “$$\text{Unpaid} = \text{Case Reserves} + \text{IBNR}$$” |
| An inadequate (understated) unpaid claims estimate makes recent results look more profitable than they are, so internal management may set … | fact | tagged | Loss Reserving: “Under-reserving can put **solvency** at risk: it presents the insurer as stronger than it is, and a…” |
| An understated unpaid claims liability overstates earnings and surplus, so investors overvalue the company and invest capital they otherwis… | fact | tagged | Stakeholder Reporting: “**Investors and rating agencies** — reserve development history, volatility, and the earnings effec…” |
| Regulators rely on reported liabilities to monitor solvency, so an inadequate estimate makes capital appear adequate and delays regulatory … | fact | linked | Regulatory Reporting: “It is how regulators monitor reserve adequacy across the industry and identify deteriorating compan…” |

</details>

<details><summary><code>cas5-2019f-q17</code> · answerable</summary>

Tagged pages: Loss Development, Case Adequacy, Settlement Rate, Claim Count Triangle, Data Diagnostic Analysis, Changing Conditions

| Item | Kind | Status | Where |
|---|---|---|---|
| Internal company changes (within management's control), such as changes in case reserve adequacy, claim settlement rate, business mix or un… | fact | tagged | Changing Conditions: “**Changing Conditions** are changes in an insurer's internal operations or in its external environm…” |
| Average case outstanding per open claim is a diagnostic triangle computed as case outstanding divided by open claim counts at each accident… | definition | tagged | Case Adequacy: “$$\text{Avg Case Outstanding} = \frac{\text{Case Reserves}}{\text{Open Claim Counts}}$$” |
| Strengthened case reserve adequacy appears as average case outstanding per open claim increasing down the column (same maturity, more recen… | fact | tagged | Loss Development: “a rising ratio is consistent with faster settlement or weaker case reserves, a falling one with slo…” |
| The disposal rate is closed claim counts divided by ultimate (or reported) claim counts, shown in a triangle by accident year and maturity. | definition | tagged | Settlement Rate: “$$\text{Disposal Rate}_n = \frac{\text{Closed claims at age } n}{\text{Ultimate claim counts}}$$” |
| A speed-up in claim settlement appears as the disposal rate and the paid-to-reported claims ratio increasing down the column, since recent … | fact | tagged | Loss Development: “a rising ratio is consistent with faster settlement or weaker case reserves, a falling one with slo…” |
| Average severity triangles are reported (or paid) claims divided by reported (or closed) claim counts at each accident year and maturity. | definition | linked | Frequency-Severity Method: “develop an average severity triangle (dollars ÷ counts at each age) to ultimate severity” |
| A shift in business mix toward larger risks or higher policy limits appears as average severity increasing down the column at each maturity… | fact | linked | Mix of Business: “The only fix is structural: **split the triangle** by coverage ([[Reserving Data Organization]]).” |

</details>

<details><summary><code>cas5-2019f-q18</code> · gap</summary>

Tagged pages: Case Outstanding Development Method, Unpaid Claims, Case Reserves, Loss Development

| Item | Kind | Status | Where |
|---|---|---|---|
| The case outstanding development technique projects future payments from the latest case outstanding using two sets of factors: the ratio o… | procedure | tagged | Case Outstanding Development Method: “Friedland's fuller version works period by period, using two ratios estimated from history: **paid …” |
| Incremental paid claims are obtained by differencing the cumulative paid triangle, and the case outstanding method uses incremental (not cu… | procedure | tagged | Case Outstanding Development Method: “Friedland's fuller version works period by period, using two ratios estimated from history: **paid …” |
| The incremental paid to prior case outstanding factor for a period equals the incremental paid during the period divided by the case outsta… | formula | tagged | Case Outstanding Development Method: “Friedland's fuller version works period by period, using two ratios estimated from history: **paid …” |
| Factors are selected by averaging the observed age-to-age ratios across accident years (e.g., a weighted or simple average), and a tail fac… | procedure | linked | Age to Age Factor: “**Volume-weighted (all-year)** — the ratio of column sums. Weights each year by its size, so it is …” |
| Unpaid claims under the case outstanding method equal the sum of projected future incremental payments only; amounts already paid are exclu… | fact | tagged | Unpaid Claims: “$$\text{Unpaid} = \text{Ultimate} - \text{Paid to date}$$” |
| In the alternative case outstanding method, the case outstanding development factor equals (CDF_reported − 1) × CDF_paid / (CDF_paid − CDF_… | formula | missing |  |
| The case outstanding development technique is appropriate when there is little or no pure IBNR, such as for short-tailed lines, claims-made… | fact | linked | IBNR: “**A claims-made book has no pure IBNR** by construction — every claim in a [[Report Year\\|report ye…” |

</details>

<details><summary><code>cas5-2019f-q19</code> · answerable</summary>

Tagged pages: Cape Cod Method, On Level Premium, Loss Development, Loss Trend, Parallelogram Method, Rate Level Change

| Item | Kind | Status | Where |
|---|---|---|---|
| The Cape Cod method computes a single expected claims ratio for all years combined as total trended reported claims divided by total used-u… | procedure | tagged | Cape Cod Method: “The ELR is estimated as total reported losses over total *used-up* (on-level, developed) premium ac…” |
| Used-up premium is on-level, trended earned premium multiplied by the percentage of claims reported (1/CDF), serving as the exposure base i… | definition | tagged | Cape Cod Method: “**Used-up premium** $\text{EP}_i / \text{CDF}_i$ is the share of each year's premium "exposed" to t…” |
| Cape Cod ultimate claims = reported claims + ECR × premium (at the matching level) × (1 − 1/CDF), i.e., reported plus expected unreported c… | formula | tagged | Cape Cod Method: “$$\text{IBNR}_i = \text{ELR} \times \text{EP}_i \times \left(1 - \tfrac{1}{\text{CDF}_i}\right)$$” |
| Use the parallelogram method to compute on-level factors: for annual policies written evenly, a mid-year rate change affects a fraction of … | procedure | tagged | On Level Premium: “$$\text{On-Level Factor} = \frac{\text{Current cumulative rate level index}}{\text{Average rate lev…” |
| Trend claims and premium to a common cost level by applying annual trend over the number of years between each accident year and the target… | procedure | tagged | Cape Cod Method: “Premium **must be on level** and losses must be trended to a common cost level before the ELR is co…” |
| In the Cape Cod method, claims used in the ECR are reported (not developed to ultimate) claims, and the result is independent of the chosen… | fact | tagged | Cape Cod Method: “The ELR is estimated as total reported losses over total *used-up* (on-level, developed) premium ac…” |

</details>

<details><summary><code>cas5-2019f-q2</code> · gap</summary>

Tagged pages: Written Premium, Earned Premium, In-Force, Unearned Premium, Calendar Year

| Item | Kind | Status | Where |
|---|---|---|---|
| Written premium for an aggregation period (calendar, fiscal, or policy year) is the full premium of policies whose effective date falls wit… | definition | tagged | Written Premium: “$$\text{Written Premium} = \sum_{\text{policies issued in period}} \text{full-term premium}$$” |
| In-force premium at a valuation date is the full written premium of policies that have incepted and not yet expired or been cancelled as of… | definition | tagged | In-Force: “In-force premium is the **full-term** premium of each policy in effect at the date — the policy's o…” |
| A mid-term cancellation produces a return premium equal to the unexpired fraction of the term times the premium, recorded as negative writt… | procedure | tagged | Unearned Premium: “Cancellation returns the unearned portion. **Pro rata** cancellation returns the full unearned prem…” |
| Written premium equals earned premium plus the change in unearned premium (WP = EP + ΔUEP). | fact | tagged | Written Premium: “$$\text{Earned Premium} = \text{Written Premium} - \Delta\text{UEP}$$” |
| Averaging beginning and ending in-force premium approximates calendar year earned premium only if policies have the same term (e.g., all an… | fact | missing |  |
| In-force premium has practical uses besides estimating earned premium, such as measuring the premium impact of a proposed rate change, dete… | fact | tagged | In-Force: “the latest in-force premium is used to measure the impact of a rate change on the existing portfolio” |

</details>

<details><summary><code>cas5-2019f-q20</code> · gap</summary>

Tagged pages: Frequency-Severity Method, Settlement Rate, Claim Count Triangle, Unpaid Claims, Changing Conditions

| Item | Kind | Status | Where |
|---|---|---|---|
| The disposal rate is the cumulative closed claim count at a given age divided by the ultimate claim count for the accident year. | definition | tagged | Settlement Rate: “$$\text{Disposal Rate}_n = \frac{\text{Closed claims at age } n}{\text{Ultimate claim counts}}$$” |
| To project future closed counts for an immature accident year, take the remaining open claims (ultimate minus closed to date) and allocate … | procedure | missing |  |
| Incremental severity is computed as incremental paid claims divided by incremental closed claim counts for each accident year and age, and … | procedure | tagged | Frequency-Severity Method: “develop an average severity triangle (dollars ÷ counts at each age) to ultimate severity” |
| Unpaid claims equal the sum over future ages of projected incremental closed counts multiplied by selected incremental severity. | procedure | tagged | Frequency-Severity Method: “Project the number of claims closing in each future period from historical **disposal rates**, valu…” |
| With no severity trend, historical severities need no trend adjustment and the selected severities can be used as observed. | fact | missing |  |
| A law or court change that increases future payments is reflected by multiplying the projected future severities (all unpaid amounts for pe… | procedure | linked | Policy Provision Changes: “and are handled by a law-level adjustment factor applied to historical losses before trend” |
| The frequency-severity technique separates claim counts from severity, so assumptions such as a sudden severity change from a legal change … | fact | tagged | Frequency-Severity Method: “A dollar triangle tells you losses grew; frequency and severity tell you *why*, and the two causes …” |

</details>

<details><summary><code>cas5-2019f-q21</code> · answerable</summary>

Tagged pages: Berquist-Sherman Method, Case Adequacy, Unpaid Claims, Loss Development

| Item | Kind | Status | Where |
|---|---|---|---|
| The reported Berquist-Sherman technique adjusts a reported claims triangle for a change in case reserve adequacy, which shows up as a shift… | fact | tagged | Berquist-Sherman Method: “a jump in average case outstanding across all years points to adequacy; a jump in closure rates poi…” |
| Case outstanding is derived as reported claims minus paid claims, and open claim counts as reported counts minus closed counts, each cell b… | procedure | syllabus | Paid Losses: “$$\text{Reported Losses} = \text{Paid Losses} + \text{Case Reserves}$$” |
| Average case outstanding is case outstanding divided by the number of open claims at each age and accident year. | definition | tagged | Case Adequacy: “$$\text{Avg Case Outstanding} = \frac{\text{Case Reserves}}{\text{Open Claim Counts}}$$” |
| To de-trend average case outstanding, keep the latest diagonal value in each column as current adequacy and divide it by one plus the sever… | procedure | tagged | Berquist-Sherman Method: “$$\text{Adjusted Case}_{\text{AY},n} = \text{Case}_{\text{latest},n} \times \left(1 + t\right)^{-(\…” |
| The adjusted reported claims triangle is the de-trended average case outstanding multiplied by open claim counts, plus unadjusted paid clai… | procedure | tagged | Berquist-Sherman Method: “Multiply the restated averages by the open claim counts to get adjusted case reserves, add paid, an…” |
| Develop the adjusted reported triangle with the chain ladder: compute age-to-age factors, select them by an average (straight or volume-wei… | procedure | tagged | Loss Development: “$$\text{CDF}_{n \to \text{ult}} = \prod_{k \ge n} f_{k \to k+1} \times \text{Tail}$$” |
| Unpaid claims for an accident year equal the ultimate claims (latest adjusted reported claims times the CDF) minus the paid claims to date,… | formula | tagged | Unpaid Claims: “$$\text{Unpaid} = \text{Ultimate} - \text{Paid to date}$$” |

</details>

<details><summary><code>cas5-2019f-q22</code> · answerable</summary>

Tagged pages: Salvage and Subrogation, Loss Development, Unpaid Claims, Recoveries

| Item | Kind | Status | Where |
|---|---|---|---|
| In the ratio approach to salvage and subrogation, form a triangle of cumulative received S&S divided by cumulative paid claims gross of S&S… | procedure | tagged | Recoveries: “**Salvage and subrogation** (Friedland Ch. 14) are projected either by the development technique on…” |
| Ultimate gross paid claims for an accident year equal its latest cumulative paid claims times the age-to-ultimate development factor for pa… | formula | tagged | Loss Development: “$$\text{Ultimate Losses} = \text{Losses at age } n \times \text{CDF}_{n \to \text{ult}}$$” |
| When there is no development beyond the last triangle age, the tail factor is 1.000, so an accident year at that age is fully developed and… | fact | linked | Tail Factor: “A tail of exactly $1.000$ is itself an assumption — that development is complete — and it is the wr…” |
| Select the ultimate S&S ratio using judgment: if an immature year's projected ratio is out of line with consistent mature years, treat it a… | procedure | tagged | Recoveries: “Before accepting it, ask whether recording or recovery practice changed or one large claim is disto…” |
| The S&S recoverable (still to be collected) equals the estimated ultimate S&S minus S&S already received to date. | definition | tagged | Recoveries: “\begin{aligned} \text{Recoverable} &= \text{Ultimate Recoveries} \\ &\quad - \text{Recoveries Recei…” |
| Advantages of the ratio approach over developing S&S dollars: ratios to paid claims act as a diagnostic benchmark that exposes unreasonable… | fact | tagged | Recoveries: “The ratio's development factors are less leveraged than those of S&S dollars, and the ultimate rati…” |

</details>

<details><summary><code>cas5-2019f-q23</code> · answerable</summary>

Tagged pages: IBNR, Bornhuetter-Ferguson Method, Cape Cod Method, Frequency-Severity Method, Changing Conditions, Chain Ladder Method

| Item | Kind | Status | Where |
|---|---|---|---|
| The reported development (chain-ladder) method estimates ultimate claims as reported claims times a cumulative development factor built fro… | formula | tagged | Chain Ladder Method: “$$U_{\text{AY}} = C_{\text{AY},\,n} \times \text{CDF}_{n \to \text{ult}}$$” |
| The development method relies entirely on historical development patterns and does not adjust for a change such as a law change, so factors… | fact | tagged | Changing Conditions: “Every development-based estimate of [[Unpaid Claims\\|unpaid claims]] assumes the past pattern will …” |
| The Bornhuetter-Ferguson method estimates ultimate claims as actual reported claims plus the a priori expected claims times the percentage … | formula | tagged | Bornhuetter-Ferguson Method: “$$U_{\text{BF}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) \times U_{0}$$” |
| The BF a priori expected claims ratio is selected with judgment, so an anticipated change like higher severity can be built into it immedia… | fact | tagged | Bornhuetter-Ferguson Method: “BF is a **credibility weighting** in disguise: it equals $Z \, U_{\text{CL}} + (1-Z)\,U_0$ with $Z …” |
| The Cape Cod method derives the expected claims ratio from the experience of the data itself (reported claims relative to used-up exposure/… | procedure | tagged | Cape Cod Method: “The ELR is estimated as total reported losses over total *used-up* (on-level, developed) premium ac…” |
| Because the Cape Cod expected claims ratio is based on mostly historical experience, a sudden severity increase is understated in both the … | fact | tagged | Cape Cod Method: “The cost is that the estimate is no longer independent of the data: a systematically distorted tria…” |
| The frequency/severity technique projects claim counts and average severity separately, so an actuary can directly adjust the severity assu… | fact | tagged | Frequency-Severity Method: “**Counts and trended severity.** Develop counts, but estimate severity by **trending** a mature yea…” |

</details>

<details><summary><code>cas5-2019f-q24</code> · answerable</summary>

Tagged pages: Unallocated Loss Adjustment Expenses ULAE, Bornhuetter-Ferguson Method, Claims Made Coverage, IBNR

| Item | Kind | Status | Where |
|---|---|---|---|
| The Kittel refinement ULAE ratio equals calendar-year paid ULAE divided by the average of calendar-year paid claims and incurred claims (0.… | formula | tagged | Unallocated Loss Adjustment Expenses ULAE: “$$R_{\text{Kittel}} = \frac{\text{Paid ULAE}}{0.5(\text{Paid Loss}) + 0.5(\text{Incurred Loss})}$$” |
| Select the ULAE ratio from the yearly ratios: if they show no trend, treat variation as random and use the simple average; if there is a tr… | procedure | tagged | Unallocated Loss Adjustment Expenses ULAE (collapsed): “Selecting the three-year average of $6.6\%$ would understate the cost of running off the remaining …” |
| Reported Bornhuetter-Ferguson ultimate claims equal reported claims plus earned premium × expected claims ratio × percent unreported. | formula | tagged | Bornhuetter-Ferguson Method: “$C$ is reported (or paid) losses to date, $U_0 = \text{ELR} \times \text{EP}$ the a priori expectat…” |
| Case reserves equal reported claims minus paid claims, and total IBNR equals ultimate claims minus reported claims; IBNR consists of pure I… | definition | tagged | IBNR: “$$\text{IBNR} = \text{Ultimate} - \text{Reported}$$” |
| Under claims-made policies coverage is triggered by the report date, so there are no unreported covered claims for report years already clo… | fact | tagged | Claims Made Coverage: “Because the trigger is the report date, a claims-made policy has **no pure IBNR** — only IBNER on c…” |
| Under the Kittel refinement, unpaid ULAE equals the ULAE ratio × [pure IBNR + 0.5 × (case reserves + IBNER)], since unreported claims have … | formula | tagged | Unallocated Loss Adjustment Expenses ULAE: “If ULAE is assumed to be spent half at reporting and half at settlement, only $50\%$ remains on rep…” |

</details>

<details><summary><code>cas5-2019f-q25</code> · gap</summary>

Tagged pages: Actual vs Expected Analysis, Net of Reinsurance, Loss Development, Unpaid Claims, Reasonableness Testing

| Item | Kind | Status | Where |
|---|---|---|---|
| Expected paid claims between two evaluation ages equals current paid claims times (CDF at earlier age / CDF at later age − 1), because ulti… | formula | tagged | Actual vs Expected Analysis: “$$\text{Expected emergence} = U_{\text{prior}} \times \left(\frac{1}{\text{CDF}_{n+1}} - \frac{1}{\…” |
| Under a quota share reinsurance agreement the reinsurer takes a fixed proportion of premium and losses, so net claims equal gross claims ti… | fact | elsewhere | Pro Rata Reinsurance: “Because every policy is shared alike, a quota share reduces the cedant's net premium and net losses…” |
| Under a uniform emergence assumption, the expected payments in an interval are spread equally across its sub-periods, so each quarter of a … | procedure | missing |  |
| Using an industry incremental payment pattern, allocate the interval's expected payments to a sub-period by multiplying by that sub-period'… | procedure | tagged | Actual vs Expected Analysis: “The **expected** figure comes from the prior ultimate and the emergence pattern: the share of ultim…” |
| To decide whether to revise the unpaid estimate, compare actual emergence to expected emergence under the more realistic benchmark and revi… | procedure | tagged | Actual vs Expected Analysis: “One period's deviation is noise; a run of them is a signal.” |
| Paid development estimates at immature ages with large development factors are highly leveraged, so small timing differences cause large sw… | fact | tagged | Loss Development: “A CDF of $2.27$ means more than half the ultimate estimate is unreported. A $5\%$ error in the $12\…” |
| An industry payment pattern will not exactly match a company's own experience because of differences in policy types, claim settlement prac… | fact | missing |  |

</details>

<details><summary><code>cas5-2019f-q3</code> · answerable</summary>

Tagged pages: Complement of Credibility, Limited Fluctuation Credibility, Full Credibility Standard, Partial Credibility

| Item | Kind | Status | Where |
|---|---|---|---|
| Under classical (limited fluctuation) credibility, the full credibility standard in claims is (z/k)^2, where k is the allowed tolerance aro… | formula | tagged | Full Credibility Standard: “- **Frequency**, Poisson: $\sigma_N^2/\mu_N = 1$ and there is no severity term, so the standard red…” |
| A probability P of being within k of the expected value is a two-sided interval, so the z-value is the percentile (1+P)/2 of the standard n… | fact | tagged | Full Credibility Standard: “$p = 0.90 \Rightarrow z_{0.95} = 1.645$, and $k = 0.05$:” |
| Convert exposures to expected claims by multiplying by the projected claim frequency, so experience can be compared with a claims-based ful… | procedure | tagged | Full Credibility Standard: “A standard stated in claims converts to exposures by dividing by the expected claim frequency per e…” |
| Partial credibility under the square-root rule is Z = sqrt(n / n_full), capped at 1, where n is expected claims (or exposures) and n_full i… | formula | tagged | Limited Fluctuation Credibility: “$$Z = \min\!\left(1,\, \sqrt{\frac{n}{n_{\text{full}}}}\right)$$” |
| The trended present rates complement of credibility equals the unimplemented residual of the prior indication, (1 + prior indicated change)… | procedure | tagged | Complement of Credibility: “**Trended present rates** — the current rate adjusted to what was last *indicated* rather than impl…” |
| The credibility-weighted indicated rate change is Z × (indicated change factor) + (1 − Z) × (complement factor), expressed as a factor and … | formula | tagged | Complement of Credibility: “$$\text{Estimate} = Z \times \text{Experience} + (1 - Z) \times \text{Complement}$$” |
| Complements of credibility appropriate for first dollar ratemaking include loss costs of a larger related group, rate change of a larger re… | fact | tagged | Complement of Credibility: “2. **Loss costs of a larger related group** — a *separate* but similar group, e.g. owners-form cont…” |

</details>

<details><summary><code>cas5-2019f-q4</code> · answerable</summary>

Tagged pages: Claims Made Coverage, Occurrence Coverage, Report Year, Loss Trend

| Item | Kind | Status | Where |
|---|---|---|---|
| A claims-made policy is triggered by the date the claim is reported during the policy term (subject to any retroactive date), regardless of… | definition | tagged | Claims Made Coverage: “**Claims-Made Coverage** is a policy trigger under which the policy responds to claims *reported* d…” |
| An occurrence policy is triggered by the date of loss: coverage applies if the event occurs during the policy term, regardless of when the … | definition | tagged | Occurrence Coverage: “**Occurrence Coverage** is a policy trigger under which the policy responds to losses that *occur* …” |
| To cost a claims-made policy from a report-year-by-report-lag triangle, sum the entire row for the policy's report year (all lags, same rep… | procedure | tagged | Claims Made Coverage: “Claims-made business is organized on a [[Report Year]] basis: in Werner's report-year-by-lag table …” |
| With positive loss cost trend, an occurrence policy costs more than a claims-made policy because its later-reported claims are trended thro… | fact | tagged | Claims Made Coverage: “A claims-made policy should always cost less than an occurrence policy **as long as claim costs are…” |
| A claims-made policy's price is set by the report-year cost level, so misestimating report-year trend affects it little, while an occurrenc… | fact | tagged | Claims Made Coverage: “If there is a sudden, unpredictable change in the underlying trends, the claims-made policy priced …” |
| An occurrence policy has both pure IBNR (report lag) and IBNER (settlement development), while a claims-made policy has essentially no pure… | fact | tagged | Claims Made Coverage: “Because the trigger is the report date, a claims-made policy has **no pure IBNR** — only IBNER on c…” |
| An occurrence policy earns more investment income than a claims-made policy because the time from premium collection to claim payment inclu… | fact | tagged | Claims Made Coverage: “The investment income earned from claims-made policies is substantially less than under occurrence …” |

</details>

<details><summary><code>cas5-2019f-q5</code> · answerable</summary>

Tagged pages: Loss Trend, Accident Year, Policy Year, Loss Development

| Item | Kind | Status | Where |
|---|---|---|---|
| A loss trend factor is computed from the average loss date of the experience period to the average loss date of the future period being pri… | procedure | tagged | Loss Trend: “$t$ is the selected annual trend and $n$ the **trend period**, measured from the average date of lo…” |
| The future period's average loss date is found by taking the rate-effective period (policies written for the length of time rates are in ef… | procedure | tagged | Loss Trend (collapsed): “The first policy is exposed $7/1/2025$–$6/30/2026$ and the last $7/1/2026$–$6/30/2027$, so the expo…” |
| For an accident year with losses occurring uniformly, the average loss date is the midpoint of the year (July 1). | fact | tagged | Loss Trend (collapsed): “Accident year $2023$ runs $1/1$–$12/31/2023$; with losses occurring uniformly, its average loss dat…” |
| A policy year of annual policies spans two years of exposure with an average written date at mid-year, so its average loss date is half a p… | fact | tagged | Policy Year (collapsed): “This is why PY 2024 at $24$ months of maturity is comparable to AY 2024 at about $18$ months: the e…” |
| Loss development projects losses for a fixed accident or policy year from their current valuation to ultimate, accounting for claims yet to… | definition | tagged | Loss Development: “**Loss Development** is the change in the reported or paid value of a cohort of claims as it mature…” |
| Trending restates ultimate losses of a past period to the cost level of the future period being priced, reflecting changes in frequency and… | fact | tagged | Loss Trend: “Trend and [[Loss Development\\|development]] answer different questions and must both be applied: de…” |

</details>

<details><summary><code>cas5-2019f-q6</code> · answerable</summary>

Tagged pages: Expense Provisions, Fixed Expenses, Variable Expenses, Reinsurance

| Item | Kind | Status | Where |
|---|---|---|---|
| Under proportional reinsurance (quota share or surplus share) the same percentage of premium and losses is ceded, so the net loss ratio equ… | fact | tagged | Expense Provisions: “Proportional reinsurance may need no explicit treatment; for non-proportional reinsurance the proje…” |
| Under non-proportional reinsurance (excess of loss, stop loss, catastrophe) premium and losses are ceded disproportionately, which distorts… | fact | tagged | Expense Provisions: “Proportional reinsurance may need no explicit treatment; for non-proportional reinsurance the proje…” |
| Sources of investment income in the total profit provision include policyholder-supplied funds (unearned premium reserve), loss reserves (c… | fact | linked | Profit and Contingency Provision: “Total return also includes investment income on policyholder-supplied funds (the loss and unearned …” |
| Variable expenses are defined as a fixed percentage of premium, so they change automatically with premium and need no separate trend. | definition | tagged | Expense Provisions: “Expense **trend**: a variable expense ratio needs none, since it changes with premium automatically.” |
| In the exposure-based projection method, fixed expenses per exposure may need trending because fixed expenses can trend at a different rate… | fact | tagged | Expense Provisions: “A fixed expense *per exposure* on a base that does not inflate (car-years, house-years) or per poli…” |
| In the premium-based projection method, fixed expenses must be trended independently unless one explicitly assumes they trend at the same r… | fact | tagged | Expense Provisions: “A fixed expense *ratio* (premium-based method) needs none if average fixed expense and average prem…” |

</details>

<details><summary><code>cas5-2019f-q7</code> · answerable</summary>

Tagged pages: Overall Rate Level Indication, Bornhuetter-Ferguson Method, On Level Premium, Fixed Expenses, Parallelogram Method

| Item | Kind | Status | Where |
|---|---|---|---|
| Compute age-to-age development factors from a cumulative loss triangle as ratios of successive evaluations and select an average across acc… | procedure | linked | Development Triangle: “$$f_{k \to k+1} = \frac{\sum_{\text{AY}} C_{\text{AY},\,k+1}}{\sum_{\text{AY}} C_{\text{AY},\,k}}$$” |
| The cumulative development factor to ultimate at a given age is the product (not the sum) of the selected age-to-age factors from that age … | formula | linked | Loss Development: “$$\text{CDF}_{n \to \text{ult}} = \prod_{k \ge n} f_{k \to k+1} \times \text{Tail}$$” |
| The Bornhuetter-Ferguson ultimate equals reported loss plus expected loss (premium times expected loss ratio) times the percent unreported,… | formula | tagged | Bornhuetter-Ferguson Method: “$$U_{\text{BF}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) \times U_{0}$$” |
| Trend ultimate losses and premium from each accident year's average accident date to the average accident date of the future policy period,… | procedure | linked | Loss Trend: “$t$ is the selected annual trend and $n$ the **trend period**, measured from the average date of lo…” |
| ULAE is loaded onto loss and ALAE by multiplying by one plus the ULAE provision percentage. | formula | syllabus | Loss and Loss Adjustment Expense (collapsed): “ULAE loaded at $4\%$ of loss and ALAE” |
| Use the parallelogram method to compute on-level factors: determine the portion of each year's earned premium written at each rate level, c… | procedure | tagged | Parallelogram Method: “**Werner's six steps:** date the changes and form rate level groups; find each group's area in each…” |
| For annual policies written evenly, a mid-year (July 1) rate change affects a triangle equal to 12.5% of that calendar year's earned premiu… | fact | tagged | Parallelogram Method: “$$A_{\text{new}} = \tfrac{1}{2}(1 - p)^2$$” |
| Fixed expense ratio is computed as fixed expenses divided by (unadjusted) earned premium; a non-recurring outlier year is excluded and the … | procedure | tagged | Fixed Expenses: “The fixed dollars are then put per exposure either by multiplying the fixed expense ratio by the pr…” |
| With fixed expenses, the loss ratio method indicated rate change is (loss & LAE ratio + fixed expense ratio) / (1 − variable expense ratio … | formula | tagged | Overall Rate Level Indication: “$$\text{Indicated Change} = \frac{\text{Projected Loss \& LAE Ratio} + F\%}{1 - V - Q_T} - 1$$” |

</details>

<details><summary><code>cas5-2019f-q8</code> · answerable</summary>

Tagged pages: Lifetime Value, Principles of Ratemaking, Underwriting Profit

| Item | Kind | Status | Where |
|---|---|---|---|
| Customer lifetime value is the profit expected from a customer over their entire expected life with the insurer, summing expected profit ac… | definition | tagged | Lifetime Value: “**Lifetime Value** (LTV) is the present value of the expected profit from a customer relationship o…” |
| The retention ratio is the proportion of policies that renew at a given renewal and is predicted by a retention model as a function of the … | definition | tagged | Lifetime Value: “Modelling renewal probability as a function of the rate change offered lets an insurer see the trad…” |
| To compute expected lifetime profit per policy, multiply each renewal term's net profit (premium minus loss & LAE, expenses) by the cumulat… | procedure | tagged | Lifetime Value: “\text{LTV} = \sum_{t=1}^{T} \frac{\left(P_t - L_t - E_t\right) \times {}_{t}p}{(1 + r)^{t}}” |
| In optimized pricing, evaluate each candidate rate change by its resulting premium and retention, compute profit for each, and select the r… | procedure | tagged | Lifetime Value: “a larger increase raises premium per policy and lowers the number of policies, and the optimum is r…” |
| With a 0% discount rate no present-valuing is needed, and a 0% retention at a later renewal ends the customer's life so later terms contrib… | fact | tagged | Lifetime Value: “${}_{t}p$ is the probability the customer is still on the books at time $t$ and $r$ the discount ra…” |
| The CAS Statement of Principles Regarding Property Casualty Insurance Ratemaking has four principles, including that a rate provides for al… | fact | tagged | Principles of Ratemaking: “A rate is reasonable and not excessive, inadequate, or unfairly discriminatory if it is an actuaria…” |
| Affordability is not part of the CAS ratemaking principles, and a rate chosen to maximize profit via a retention model, rather than from es… | fact | tagged | Principles of Ratemaking: “involving considerations such as marketing goals, competition and legal restrictions *to the extent…” |

</details>

<details><summary><code>cas5-2019f-q9</code> · gap</summary>

Tagged pages: Classification Ratemaking, Risk Classification Restrictions, Adverse Selection, Commercial Lines Rating

| Item | Kind | Status | Where |
|---|---|---|---|
| Risk classification groups insureds with similar characteristics into classes and uses relativities to differentiate the rates of the class… | definition | tagged | Classification Ratemaking: “**Classification Ratemaking** is the segmentation of a book into rating classes and the derivation …” |
| Risk classification and individual risk rating share the purpose of matching the premium to each insured's expected losses more closely tha… | fact | tagged | Classification Ratemaking: “In a competitive market an insurer that charges one average rate to a heterogeneous group loses the…” |
| Classification rating is more appropriate than individual risk rating when there are many small, homogeneous risks, because no single risk'… | fact | tagged | Classification Ratemaking: “- **Credibility** — risk classes should be large enough to allow credible statistical inferences ab…” |
| Neither classification rating nor individual risk rating is necessary when all risks have the same expected loss cost (nothing to different… | fact | missing |  |
| A rating characteristic should be excluded from a classification plan if it is not statistically significant or is highly correlated with a… | fact | tagged | Classification Ratemaking: “If young drivers also drive older cars, a one-way age relativity contains part of the vehicle-age e…” |
| A rating characteristic may be excluded if it is not objectively verifiable, because self-reported or judgment-based values are open to man… | fact | tagged | Classification Ratemaking: “**Operational** — objective, inexpensive to obtain and verify, not manipulable by the insured.” |
| A rating characteristic may be excluded for legal, social or cost reasons: it is prohibited by law, raises privacy or social acceptability … | fact | tagged | Classification Ratemaking: “**Social** — privacy, causality, controllability and affordability; these are where public and regu…” |
| A rating characteristic may be excluded if there is too little data at its level to estimate a stable, credible relativity. | fact | tagged | Classification Ratemaking: “- **Credibility** — risk classes should be large enough to allow credible statistical inferences ab…” |

</details>

<details><summary><code>cas5-2019s-q1</code> · answerable</summary>

Tagged pages: Exposure Base, Earned Exposure, Calendar Year, Policy Year

| Item | Kind | Status | Where |
|---|---|---|---|
| Written exposures for a period are the exposures of all policies written (effective) during that period, counted in full over the policy te… | definition | tagged | Earned Exposure: “A $12$-month policy contributes **one** earned car-year in total, spread pro rata over its term: wr…” |
| Earned exposures for a period equal the exposure units times the portion of the policy term (in years) that has expired within that period. | definition | tagged | Earned Exposure: “**Earned Exposure** is the portion of written exposure for which coverage has actually been provide…” |
| In-force exposures at a point in time are the exposure units of policies whose effective date is on or before that date and whose expiratio… | definition | linked | In-Force: “In-force exposures count the insured units exposed to loss at the date — a snapshot with no regard …” |
| Calendar year earned exposures count only the exposure earned within the calendar year, whereas policy year earned exposures count all expo… | fact | tagged | Earned Exposure: “With policies written **uniformly** through the year, a calendar year earns roughly half of that ye…” |
| An exposure base is a measurable unit that is proportional to expected losses, practical (easy to obtain, inexpensive to verify, objective)… | definition | tagged | Exposure Base: “**Proportional to expected loss.** All else equal, a policy with two exposures should have twice th…” |
| To evaluate a proposed exposure base such as miles driven, assess it against each criterion with reasoning: more miles raises accident like… | procedure | tagged | Exposure Base: “**Practical.** Objective, and relatively easy and inexpensive to obtain and verify — which also kee…” |

</details>

<details><summary><code>cas5-an-001</code> · answerable</summary>

Tagged pages: Close Year, Severity, Claims Processing Changes

| Item | Kind | Status | Where |
|---|---|---|---|
| Close-year (closed-claim) average severity equals paid losses on claims closed during a period divided by the number of claims closed durin… | definition | tagged | Close Year: “**Close Year** is a data aggregation method that groups claims by the calendar year in which they w…” |
| Changes in claims handling procedures or settlement speed (e.g., adding adjusters, clearing a backlog) change which claims close in a perio… | fact | tagged | Claims Processing Changes: “Processing changes hit the **diagonal**: they affect every open accident year in the calendar perio…” |
| Closing a disproportionate number of small claims lowers average closed-claim severity because the claim count rises by more than the paid … | fact | tagged | Close Year: “The trade-off is severe selection bias: within any recent accident year the claims that close first…” |
| A severity change caused by claims-processing or mix shifts should not be read as a real loss cost trend, so it should not be reflected in … | fact | syllabus | Severity Analysis: “Three distinct forces move a severity series and the analysis must separate them:” |

</details>

<details><summary><code>cas5-an-002</code> · answerable</summary>

Tagged pages: Data Quality, Data Issues, Reasonableness Testing

| Item | Kind | Status | Where |
|---|---|---|---|
| A data review (verification of the data) checks several components: consistency with financial statement data, consistency with prior data,… | procedure | tagged | Data Issues: “*consistency with financial statement data*; *consistency with the prior analysis's data*, with any…” |
| Reconciling data totals to financial statements is only one component of data review; totals can tie out while individual values are unreas… | fact | linked | Data Validation (collapsed): “Premium can reconcile in total while records are coded to the wrong territory or class. Record-leve…” |
| Questionable data values, such as large negative paid claims, are not always incorrect values (e.g., they may be recoveries such as salvage… | fact | tagged | Data Issues: “*reasonableness* — questionable values such as large negative paid claims or fields that contradict…” |
| When questionable values are found, especially material ones, the actuary should investigate what they represent before using the data, rat… | procedure | tagged | Data Quality (collapsed): “First, **find the definition**: ask the data owner what the field means and why these values occur.” |
| Actuarial standards of practice require the actuary to take steps to verify that data are reliable and sufficient, and to document the revi… | fact | tagged | Data Quality: “A review is not an **audit**, and the actuary is not required to perform one” |

</details>

<details><summary><code>cas5-an-003</code> · answerable</summary>

Tagged pages: Linear Trend, Loss Trend, Severity

| Item | Kind | Status | Where |
|---|---|---|---|
| A linear trend assumes the statistic changes by a constant dollar amount each period, so projected change equals the annual slope times the… | definition | tagged | Linear Trend: “Werner & Modlin: with a linear selection the trend is a constant amount, so the projected change is…” |
| The least-squares slope is b = Σ(t − t̄)(y − ȳ) / Σ(t − t̄)², fitted to the observed values against time. | formula | tagged | Linear Trend: “$$b = \frac{\sum (t - \bar{t})(y_t - \bar{y})}{\sum (t - \bar{t})^2}$$” |
| To project a trended value, add the slope times the trend period length to the most recent observed value (the base to be trended), not to … | procedure | tagged | Linear Trend: “It is fitted by least-squares regression of the statistic itself on time, and projected by adding t…” |

</details>

<details><summary><code>cas5-an-004</code> · gap</summary>

Tagged pages: Underwriting Year, Accident Year, Policy Year, Reserving Data Organization

| Item | Kind | Status | Where |
|---|---|---|---|
| Underwriting-year (policy-year) data group claims by the year in which the reinsurance policy or contract became effective, so each cohort … | definition | tagged | Underwriting Year: “**Underwriting Year** (UY), also called treaty year or contract year, groups all premium and losses…” |
| The main advantage of policy-year (underwriting-year) aggregation is a close match of claims with the premium and exposures from the same c… | fact | tagged | Underwriting Year: “The offsetting advantage is an exact match of premium to exposure: … all belong to one set of contr…” |
| Policy-year (underwriting-year) claims for 12-month contracts occur over about a 24-month period, so claims take longer to be reported and … | fact | tagged | Policy Year: “The price of that match is **time**. With annual policies a PY cohort is not fully written until $1…” |
| Accident-year data occur within a shorter time frame and are useful for isolating and tracking the effect of a single event such as a catas… | fact | missing |  |

</details>

<details><summary><code>cas5-an-005</code> · answerable</summary>

Tagged pages: Types of Insurance, Short Tail Insurance, Long Tail Lines, Claims Made Coverage, Frequency

| Item | Kind | Status | Where |
|---|---|---|---|
| Short-tail lines (e.g., automobile physical damage, property) have short reporting and settlement periods, so paid claims and case outstand… | fact | tagged | Types of Insurance: “[[Short Tail Insurance\\|Short-tail]] lines — auto physical damage, homeowners property, inland mari…” |
| Long-tail lines (e.g., medical malpractice occurrence) have lengthy reporting and settlement periods, so IBNR is a large share of unpaid cl… | fact | tagged | Types of Insurance: “[[Long Tail Lines\\|Long-tail]] lines — medical malpractice, workers compensation, general liability…” |
| For long-tail lines, cumulative development factors for the most recent accident years can be very large, so projections based on them are … | fact | tagged | Long Tail Lines: “Because the [[Cumulative Development Factor\\|CDF]] at early maturities is large, estimates are high…” |
| A claims-made policy covers claims reported during the policy period, whereas an occurrence policy covers claims arising from events occurr… | definition | tagged | Claims Made Coverage: “**Claims-Made Coverage** is a policy trigger under which the policy responds to claims *reported* d…” |
| Claims-made experience should be segregated from occurrence experience, and actuaries often prefer report-year aggregation for claims-made … | fact | tagged | Claims Made Coverage: “Claims-made business is organized on a [[Report Year]] basis: in Werner's report-year-by-lag table …” |
| Reserve estimates tend to be more accurate for high-frequency, low-severity groups of claims than for low-frequency, high-severity groups, … | fact | tagged | Types of Insurance: “**Low frequency, high severity** (excess liability, medical malpractice, property catastrophe): a h…” |

</details>

<details><summary><code>cas5-an-006</code> · answerable</summary>

Tagged pages: Tort Litigation, Changing Conditions, Expected Loss Method, Chain Ladder Method

| Item | Kind | Status | Where |
|---|---|---|---|
| The development technique assumes that historical claim development patterns are predictive of future development, so the factors from past… | fact | tagged | Chain Ladder Method: “projects each cohort to ultimate by multiplying its latest cumulative amount by a [[Cumulative Deve…” |
| Changes in the external environment, such as legal or judicial changes, can invalidate the development technique's assumption even when int… | fact | tagged | Tort Litigation: “Development patterns depend on court backlogs, limitation periods and settlement practice as much a…” |
| The expected claims technique is appropriate for the latest accident year after major changes in the legal environment (e.g., longer statut… | fact | tagged | Expected Loss Method: “The **ELR** is the whole method, and it must be derived, not assumed: from the pricing indication f…” |
| A case outstanding adequacy adjustment (such as Berquist-Sherman) addresses changes in case reserve strength, not changes in the legal envi… | fact | linked | Berquist-Sherman Method: “restates a historical [[Development Triangle\\|triangle]] so that every year reflects **current** cl…” |
| Both paid and reported development techniques rest on the same assumption that past development predicts future development, so a change in… | fact | tagged | Changing Conditions: “With reported claims the [[Chain Ladder Method\\|development technique]] assumes [[Case Adequacy\\|ca…” |

</details>

<details><summary><code>cas5-an-007</code> · untagged</summary>

Tagged pages: Tort Reform, External Information in Reserving, Expected Loss Method

| Item | Kind | Status | Where |
|---|---|---|---|
| To adjust historical claims for a tort reform (legal environment change), restate each period's claims to the legal environment of the proj… | procedure | linked | Loss Trend: “A benefit-level change is restated in the data, or allowed for in the selection, so that it is not …” |
| The reform adjustment factor applied to pre-reform claims is one minus the reform's percentage reduction in claim cost (e.g., a 20% reducti… | formula | elsewhere | Automobile Insurance Reform (collapsed): “So historical loss costs are multiplied by $1 - 0.11 = 0.89$ to restate them at the post-reform ben…” |
| Claims are affected by a law or tort reform based on the accident date: only claims occurring on or after the effective date are subject to… | fact | elsewhere | Automobile Insurance Reform (collapsed): “The insurer's data covers accident years before the reform.” |
| The expected claim ratio is selected by averaging the trended, on-level, reform-adjusted historical claim ratios across accident years (a s… | procedure | tagged | Expected Loss Method: “The **ELR** is the whole method, and it must be derived, not assumed: from the pricing indication f…” |

</details>

Nothing here edits the vault. A gap is fixed from the syllabus reading, in general form — never by copying the question's own numbers onto the page — and the edited page is fact checked again (docs/verification.md).
