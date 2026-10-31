# Answerability: Exam 9 (CAS)

Run `answerability-20261031-9` · 131 questions checked of 131 attempted · cost $18.38

Each question's official solution was broken into the knowledge it uses (by a model that saw no study page), and each item was looked for on the pages the vault gives for the question. An item counts as taught only if a quote of the teaching passage is really on the page; the check is done in code. *Answerable* is necessary, not sufficient: a page can hold the formula and still not teach it well.

| Verdict | Questions | Share |
|---|---|---|
| **Answerable** — everything taught on a tagged page, one link away, on the exam's syllabus or on a prerequisite exam's page | 43 | 33% |
| **Untagged** — everything is in the vault, but some of it on a page neither tagged nor linked | 11 | 8% |
| **Gap** — something the solution uses is taught on no page | 77 | 59% |

Requirements: 765 — tagged 445 (58%), linked 52 (7%), syllabus 20 (3%), prerequisite 0 (0%), elsewhere 68 (9%), missing 180 (24%)
Not checked: 149 off syllabus.

## By sitting

A paper whose gaps far outrun the rest may test a reading the syllabus has since dropped.

| Sitting | Questions | Answerable | Untagged | Gap |
|---|---|---|---|---|
| Fall 2012 | 4 | 2 | 0 | 2 (50%) |
| Fall 2013 | 6 | 4 | 1 | 1 (17%) |
| Fall 2014 | 6 | 3 | 0 | 3 (50%) |
| Fall 2015 | 4 | 2 | 0 | 2 (50%) |
| Fall 2016 | 4 | 2 | 0 | 2 (50%) |
| Fall 2017 | 3 | 1 | 0 | 2 (67%) |
| Fall 2018 | 4 | 0 | 0 | 4 (100%) |
| Fall 2019 | 3 | 2 | 1 | 0 (0%) |
| Spring 2012 | 12 | 2 | 1 | 9 (75%) |
| Spring 2013 | 13 | 2 | 1 | 10 (77%) |
| Spring 2014 | 13 | 2 | 2 | 9 (69%) |
| Spring 2015 | 15 | 5 | 3 | 7 (47%) |
| Spring 2016 | 13 | 5 | 0 | 8 (62%) |
| Spring 2017 | 9 | 2 | 0 | 7 (78%) |
| Spring 2018 | 7 | 2 | 1 | 4 (57%) |
| Spring 2019 | 5 | 0 | 0 | 5 (100%) |
| Undated (samples and the vault's own) | 10 | 7 | 1 | 2 (20%) |

## Gaps, by the page that should teach them

Ranked by how many questions each page's gaps cost. The page is the one named for the item's concept; "no page" means the vault has no page by that name.

### **no page for Copulas** — 5 question(s)

- `cas7-2012-q23` (procedure): When company data on tail dependence is lacking, correlations can be set using industry or expert opinion and copulas or other dependency models to represent structural dependencies not yet observed.
- `cas7-2014-q20` (definition): A copula is a function that joins marginal distributions of individual risks into a joint distribution, specifying the dependency structure separately from the marginals.
- `cas7-2014-q20` (fact): The choice of copula determines how dependence varies across the distribution; some copulas (e.g., Heavy Right Tail copula) give strong correlation in the right tail but little in the middle.
- `cas7-2015-q21` (definition): A copula is a function that joins marginal distributions into a joint distribution, capturing the dependence structure separately from the marginals.
- `cas7-2015-q21` (fact): A copula can join marginal distributions of any family, and can represent dependence without revealing the underlying marginal distributions.
- `cas7-2015-q21` (fact): Copulas allow correlation to vary across the distribution, e.g. stronger dependence in the tails than in the body, so tail dependence can be modeled and quantified.
- `cas7-2017-q23` (fact): The Frank copula has little or no tail dependence, so it understates correlation among lines in extreme events such as clash and accumulation.
- `cas7-2017-q23` (fact): The Gumbel (heavy right tail) copula has strong right-tail dependence, making it a better choice for correlating lines in large loss events.
- `cas7-2019-q20` (fact): A copula only specifies the dependence between variables and not their marginal distributions, so the expected value of the aggregate (sum) is unchanged by the choice of copula, while measures of variability and tail risk do change.

### `Concepts/Correlation.md` — 5 question(s)

- `cas7-2012-q23` (fact): Cross-class correlations tend to be stronger in the tails of the distribution during extreme events, and little or no company data exists on extreme scenarios, so estimating and validating them is difficult and relies largely on actuarial judgment.
- `cas7-2013-q16` (fact): Loss ratios of a large, stable book of business tend to be positively correlated across years because the same policyholders remain and the book performs similarly over time, and a large book has high credibility so its loss ratio does not swing widely.
- `cas7-2013-q16` (fact): Personal auto is highly regulated and has low catastrophe exposure, so rate levels change slowly and results are consistent, which makes loss ratios positively correlated from year to year.
- `cas7-2013-q17` (fact): Spearman correlation is an ordinal measure based only on ranks, so it weights all observations equally and is not affected by the magnitude of outliers.
- `cas7-2014-q20` (fact): Lines of insurance that are normally uncorrelated (different perils, policyholders, industries, geography) can become correlated when a single extreme event, such as a hurricane or economic recession, simultaneously drives losses in both lines.
- `cas7-2015-q23` (fact): Pearson's correlation is a cardinal measure that depends on the actual values (deviations from the mean, squared), so it is sensitive to outliers, whereas Spearman's is ordinal, depending only on ranks, and is not affected by the magnitude of extreme values.
- `cas7-2015-q23` (fact): A pair of extreme values that are both the largest in their series (an outlier pair) can inflate Pearson's correlation well above Spearman's, producing a discrepancy between the two measures.

### **no page for Franchise Value** — 4 question(s)

- `cas9-2013-q9` (formula): Panning's franchise value formula is F = c·s·(a + b·y) / ((1+y)(1+y−c_r)), where c_r is the client retention rate, s is surplus, y is the risk-free rate, and a and b describe how the target return depends on the interest rate.
- `cas9-2016-q15` (formula): Under a fixed target return on surplus, franchise value equals (P - E - L/(1+y)) times d/(1-d), where d is the discount factor reflecting retention and the risk-free rate.
- `cas9-2016-q15` (formula): The retention-based discount factor d equals the client retention rate cr divided by (1+y), so cr = d(1+y).
- `cas9-2017-q12` (formula): For constant client retention cr and risk-free rate y, franchise value = [P - E - L/(1+y)] * d/(1-d), where d = cr/(1+y) and the bracket is the per-policy present value of profit for one policy year.
- `cas9-2017-q12` (procedure): Franchise value of a book of identical policies is the per-policy value scaled by the number of policies.
- `cas9-2019-q8` (formula): Franchise value (value of future new and renewal business) with retention ratio cr is F = cr·S·(a + b·y − y) / [(1+y)(1+y−cr)].

### `Concepts/Reinsurance.md` — 4 question(s)

- `cas7-2013-q20` (definition): The efficient frontier approach plots expected underwriting profit against a risk measure (e.g., VaR or TVaR) for reinsurance options; preferred options have higher profit for lower risk (upper left).
- `cas7-2014-q24` (fact): Reinsurance can raise firm value by lowering the probability of financial distress, which raises the risk-adjusted discount factor and the earnings multiple, even though it lowers expected earnings; the change in firm value is the with-reinsurance value minus the without-reinsurance value.
- `cas7-2017-q23` (definition): A cost/benefit diagram plots the benefit of a reinsurance program (on the vertical axis) against its cost (on the horizontal axis) at selected return periods, with the bare (no reinsurance) program at the origin.
- `cas7-2017-q23` (formula): The benefit of a reinsurance program at a given percentile equals the net premium minus net loss under the program minus that under the bare program at the same percentile.
- `cas7-2018-q22` (formula): The annual cost of quota-share reinsurance is the ceded premium (cession percentage times gross earned premium) times the economic margin on the contract.
- `cas7-2018-q22` (definition): The three paradigms for measuring the value of a reinsurance structure are: (1) stabilizing results, (2) freeing up or replacing required capital/surplus, and (3) adding value to the firm (equity/market value).

### **no page for Tail Value at Risk (TVaR)** — 3 question(s)

- `cas7-2012-q13` (fact): TVaR is linear in losses above the threshold, so a loss twice as large is treated as only twice as bad; this understates extreme tail risk, and alternatives such as risk-adjusted TVaR or distortion measures weight the tail more heavily.
- `cas7-2015-q24` (fact): TVaR weights tail losses linearly, so it does not reflect risk aversion (a risk twice as large being more than twice as bad), and it ignores losses below the percentile that may still be significant.
- `cas7-2016-q24` (fact): TVaR weights all tail losses linearly, so it does not treat a loss twice as large as more than twice as bad, which is inconsistent with risk aversion.

### `Concepts/Exposure Curves.md` — 3 question(s)

- `cas8-2012-q10` (procedure): To test scale independence in a book, compare pure premium divided by insured value (using range midpoints) across insured value ranges; roughly constant ratios support combining the ranges into one exposure curve.
- `cas8-2012-q10` (fact): Scale independence is less appropriate for commercial property than for homeowners, because commercial risks are heterogeneous in construction and occupancy across sizes, whereas homeowner risks are fairly homogeneous.
- `cas8-2012-q10` (fact): An exposure curve applied to a limits profile requires the profile to be on the same basis (per location vs per risk) as the data used to build the curve; a per-risk profile may include varying numbers of locations and so skews results for a per-location curve.
- `cas8-2016-q21` (fact): For a range of insured values, assume insured values are evenly distributed and use the midpoint (average insured value) to compute the ratio of loss size to insured value and the exposure factors, rather than the range's maximum.
- `cas8-2017-q18` (procedure): To build an exposure curve from an exposure distribution by loss-as-percent-of-MPL, restate it as a distribution of loss sizes among exposures with positive loss (divide each probability by 1 minus the probability of zero loss) to get the conditional loss distribution.

### `Concepts/Risk Measure.md` — 3 question(s)

- `cas7-2013-q19` (fact): TVaR weights all tail losses equally (linear in the tail) so it does not show increasing risk aversion to larger losses, while the Wang transform shifts probability weight toward larger losses (f*(x) > f(x) for large x), reflecting increasing risk aversion.
- `cas7-2016-q24` (fact): Weighted (transformed-probability) TVaR is suitable for portfolios with heavy-tailed, skewed losses (e.g., catastrophe property, excess casualty) because it counts a loss twice as large as more than twice as bad.
- `cas7-2016-q24` (fact): Other suitable risk measures for capital allocation include expected policyholder deficit (EPD) on transformed probabilities, the value of a put option, and the exponential moment, each capturing tail or skewness behavior and risk aversion.
- `cas7-2019-q19` (fact): When comparing reinsurance options by their CDF curves, an option whose curve lies to the left (lower combined ratio) at high percentiles performs better in the tail, so a tail-concerned actuary prefers it even if it performs worse at lower percentiles.

### **no page for Agency Theory** — 2 question(s)

- `cas7-2012-q19` (fact): A compensation structure that rewards high returns and penalizes low returns encourages the agent to take excessive risk (e.g., forgo reinsurance), conflicting with principals who prefer stability and low risk, and can increase financial distress costs.
- `cas7-2016-q27` (fact): Management incentive plans tied to short-term measures such as top line growth and calendar year combined ratio can encourage managers to pursue short-term results (aggressive growth, underpricing, writing wrong risks) at the expense of the owners' long-term interests.

### **no page for Catastrophe Bonds** — 2 question(s)

- `cas9-2017-q14` (fact): Catastrophe bonds exposed to different perils (e.g., hurricane and earthquake) are essentially uncorrelated, so a CDO pool mixing perils is more diversified than separate single-peril pools.
- `cas9-2017-q15` (procedure): To compare CAT bond and reinsurance costs, match the reinsurance LOL layer to the bond's expected loss percent of principal in the same year and compare the premium-to-expected-loss ratios; a lower ratio means cheaper coverage for the same expected loss.

### **no page for Exceedance Probability Curve** — 2 question(s)

- `cas8-2012-q9` (procedure): To read a loss level off an exceedance probability curve given only some plotted points, treat the curve as continuous and linearly interpolate between the adjacent points rather than choosing a plotted point.
- `cas8-2018-q16` (procedure): To find a PML at a return period not listed in the table, convert return periods to exceedance probabilities and linearly interpolate between the bracketing points on exceedance probability, not on return period years.

### **no page for Kendall's Tau** — 2 question(s)

- `cas7-2012-q15` (formula): Kendall's tau equals 1 minus Q divided by half the number of pairs, where Q is the number of adjacent swaps needed to put the second variable's ranking in the same order as the first and the number of pairs is n(n-1)/2 (equivalently, (concordant - discordant pairs) / total pairs).
- `cas7-2014-q21` (formula): Kendall's tau equals 1 - 4Q/(N(N-1)), where Q is the number of swaps (discordant pairs) needed to put one variable's ranks in the same order as the other's; equivalently (concordant - discordant)/(concordant + discordant) pairs when no ties.
- `cas7-2014-q21` (procedure): To compute Kendall's tau, rank the observations of each variable, order the pairs by the rank of one variable, then count concordant and discordant pairs (or the adjacent swaps needed to sort the other variable's ranks).
- `cas7-2014-q21` (fact): Kendall's tau is a rank-based (ordinal) measure that is invariant under monotone transformations and less influenced by outliers than Pearson, but like Pearson it still summarizes dependence in a single number and so does not reveal dependence varying along the distribution.

### **no page for Normal Copula** — 2 question(s)

- `cas7-2015-q21` (fact): The normal copula has light tails with little tail dependence, so it understates the joint extreme-loss correlation seen in insurance losses.
- `cas7-2019-q20` (fact): The Normal copula is symmetric and has no strong tail dependence, so its scatter plot looks more uniform with weaker clustering in the corners, especially the upper-right tail.
- `cas7-2019-q20` (fact): The Normal copula extends easily to more than two lines of business (via a correlation matrix) and is easy to simulate from and invert, whereas the HRT copula is harder to generalize beyond two variables.

### **no page for Underwriting Cycle Management** — 2 question(s)

- `cas7-2014-q25` (fact): A firm's franchise value comes mainly from intellectual property (talent, systems, databases, reputation, market relationships), so effective cycle management requires continuing to invest in and retain it throughout the underwriting cycle, especially in soft markets, to avoid obsolete systems and …
- `cas7-2014-q25` (fact): Underwriter incentives should be flexible and aligned with portfolio goals, so underwriters are not penalized for reducing or ceasing new business when market prices are inadequate in a soft market.
- `cas7-2014-q25` (fact): Owner and management education about the underwriting cycle helps them understand that deteriorating ratios (e.g., expense ratio) in a soft market stem from the cycle, preventing mistaken responses such as cutting prices to gain market share.
- `cas7-2016-q27` (fact): Effective underwriting cycle management includes maintaining intellectual property (retaining key talent, investing in systems, models and data, and keeping presence in core markets and distribution channels) during soft markets.
- `cas7-2016-q27` (fact): Effective underwriting cycle management includes setting underwriting incentives that support portfolio profitability goals rather than growth alone, so underwriters are not penalized for missing growth targets in bad markets.

### **no page for Weighted Tail Value at Risk (WTVaR)** — 2 question(s)

- `cas7-2018-q21` (procedure): To compute a 1-in-N WTVaR from simulations, take the worst scenarios in descending order, weight each by its transformed probability f*(x) obtained as differences in F*, cap the last scenario's weight so total weight equals the tail probability 1/N, and divide the weighted sum by 1/N.
- `cas7-2019-q19` (fact): A weakness of TV@R is that it weights all tail losses equally (linearly), so it does not reflect risk-averse attitudes toward increasingly large losses; WTV@R corrects this by giving greater weight to more extreme losses.

### `Concepts/Duration.md` — 2 question(s)

- `cas9-2014-q10` (formula): Duration of franchise value D_F = (a − b + 1) / [(1 + y)(a + b·y − y)] + 1 / (1 + y − c·r), measuring the sensitivity of franchise value to changes in interest rates.
- `cas9-2019-q8` (formula): Duration of franchise value is D_F = (a − b + 1)/[(1+y)(a + b·y − y)] + 1/(1+y−cr).

### **no page for Agency Theory (Shareholder-Debtholder Conflict)** — 1 question(s)

- `cas7-2014-q23` (fact): Debtholders anticipate shareholder risk-taking and demand higher yields and stricter bond covenants, so a firm benefits from reducing risk (including diversifiable risk through risk transfer) to appease debtholders and lower its financing costs.

### **no page for Aggregate Loss Distribution** — 1 question(s)

- `cas8-2014-q23` (fact): An aggregate loss distribution model should reflect the true volatility and potential loss cost of the underlying business, so contract smoothing features like carryforwards are generally not built into it, partly because renewal or cancellation of the treaty in later years is uncertain.

### **no page for Asset Management Strategy and the Underwriting Cycle** — 1 question(s)

- `cas7-2016-q22` (procedure): To smooth earnings across the underwriting cycle, shift the asset mix toward higher-yielding, riskier assets (equities, high-yield bonds) in soft markets to offset weak underwriting income, and toward conservative lower-yield assets (treasuries) in hard markets when underwriting profit is high.

### **no page for Basel II Basic Indicator Approach** — 1 question(s)

- `cas7-2013-q21` (formula): Under the Basel II basic indicator approach, operational risk capital equals a single fixed percentage α (15%) times the average annual positive gross income over the previous three years, excluding years with zero or negative gross income from the average (dividing by the number of positive years).

### **no page for Basel II Standardized Approach** — 1 question(s)

- `cas7-2013-q21` (formula): Under the Basel II standardized approach, capital equals the three-year average of the annual sum across business lines of β_j times gross income_j, with each year's total floored at zero and the average always divided by three.
- `cas7-2013-q21` (fact): The standardized approach assigns different β factors (12%, 15%, 18%) to different business lines, such as retail banking at 12% and commercial banking at 15%, so capital depends on the firm's mix of business, whereas the basic indicator approach uses one α for the whole firm and ignores business m…
- `cas7-2013-q21` (fact): Under the standardized approach, negative gross income in one business line can offset positive gross income in other lines within the same year, and a negative annual total is floored at zero but still counted in the divisor of three, which can yield lower capital than the basic indicator approach…

### **no page for Capital Model Calibration Levels** — 1 question(s)

- `cas7-2014-q26` (definition): Economic impairment earnings level is the amount of loss (not capital) that would put the firm into a state of economic impairment at a given threshold.
- `cas7-2014-q26` (definition): Protection of franchise value level is the amount of capital required to keep the firm's franchise value (market value minus book value) above a tolerable threshold with a given probability.
- `cas7-2014-q26` (fact): A firm may calibrate to economic impairment rather than franchise value protection because impairment has more severe consequences, affecting debt holders and policyholders rather than mainly shareholders, and impairment-level losses are useful for measuring risk appetite as an input to decisions.

### **no page for Capital Requirement Based on TV@R Multiple** — 1 question(s)

- `cas7-2016-q23` (procedure): To build a minimum capital requirement from a reference point, choose a maximum tolerable fraction of capital lost in a 1-in-y-year event, express that event's average loss as TV@R at the corresponding percentile, and set capital equal to TV@R divided by the tolerated fraction (a multiple of TV@R).

### **no page for Catastrophe Model Hazard Module** — 1 question(s)

- `cas8-2017-q20` (fact): Uncertainty in the intensity experienced at the site, given an earthquake (e.g., from an initial estimate of intensity), is represented by a probability distribution over intensity (secondary uncertainty in hazard).

### **no page for Catastrophe Model Loss Provision** — 1 question(s)

- `cas9-an-002` (fact): A catastrophe model provision already stated at the future policy period's cost level must not be developed or trended again.

### **no page for Chi-Plot** — 1 question(s)

- `cas7-2012-q16` (formula): The chi statistic at point i is chi_i = (H_i - F_i G_i) / sqrt(F_i(1-F_i) G_i(1-G_i)), where F_i and G_i are the marginal empirical distribution values and H_i is the joint empirical distribution value.
- `cas7-2012-q16` (definition): Chi measures how far the joint empirical distribution at a point is from what independence would give (the product of the marginals), scaled to lie between -1 and 1; a value of 0 corresponds to independence.
- `cas7-2012-q16` (formula): The lambda statistic is lambda_i = 4 * sign(F~_i G~_i) * max(F~_i^2, G~_i^2), where F~_i = F_i - 1/2 and G~_i = G_i - 1/2.
- `cas7-2012-q16` (definition): Lambda measures the signed distance of a point from the center (median) of the bivariate distribution, showing where in the distribution the point lies: near 0 means near the middle, and magnitude near 1 means toward the corners (with sign distinguishing the top-right/bottom-left from the top-left/…
- `cas7-2012-q16` (procedure): To read a chi-plot, check whether the points scatter randomly around the chi = 0 line (indicating independence) or show a systematic pattern or lopsidedness toward positive or negative chi (indicating dependence, and how it varies across the distribution).

### **no page for Copula** — 1 question(s)

- `cas7-2014-q27` (procedure): Instead of fitting a pdf, use the sampled (simulated) capital values from each individual risk's capital distribution directly to represent the distribution and combine them with a copula, which avoids approximating the distribution.

### **no page for Correlation Assumptions in ERM Models** — 1 question(s)

- `cas7-2018-q23` (fact): Correlation assumptions between lines of business require broad knowledge of the whole firm and are politically sensitive, so individual line leaders may be inexperienced or biased; the assumptions should be owned or reviewed at the corporate level (CRO, ERM department) or set by consensus among le…

### **no page for Default Avoidance Reference Point for Capital Requirements** — 1 question(s)

- `cas7-2016-q23` (fact): Default avoidance as a capital reference point requires a capital level deep in the tail of the loss distribution, where the ERM model is least reliable and least credible.
- `cas7-2016-q23` (fact): Default avoidance mainly protects policyholders, whereas shareholders and other stakeholders can be harmed by large partial losses of capital well before default, so a more likely, less extreme reference point may be more meaningful.

### **no page for Dependency Measures** — 1 question(s)

- `cas7-2012-q15` (fact): Pearson's correlation, Spearman's rho and Kendall's tau each summarize dependency in a single number ranging from -1 to 1, but Pearson uses the data values (cardinal) while Spearman and Kendall use only the ordering (ranks, ordinal).

### **no page for Duration of Franchise Value** — 1 question(s)

- `cas9-2016-q15` (formula): Duration of franchise value under variable target return pricing is D_f = (a-b+1)/(1+y)/(a+b·y-y) + 1/(1+y-cr).

### **no page for ERM Governance and Implementation** — 1 question(s)

- `cas7-2018-q23` (fact): ERM models need dedicated, full-time staff or a dedicated ERM function; staff doing ERM part-time alongside regular duties creates scheduling conflicts and delays in implementation and maintenance.

### **no page for Econometric Models of the Underwriting Cycle** — 1 question(s)

- `cas7-2016-q28` (fact): Econometric modeling of the underwriting cycle resembles soft approaches in that it needs a large quantity, variety and complexity of data and incorporates structural and human factors that influence the cycle.
- `cas7-2016-q28` (fact): Econometric modeling of the underwriting cycle resembles technical models in that both use mathematical formalism and statistical rigor and can be tested for statistical validity, to a greater degree than soft approaches.

### **no page for Economic Impairment Earnings Level** — 1 question(s)

- `cas7-2012-q24` (definition): An economic impairment earnings level is a threshold of losses or earnings shortfall that would put the company in economic impairment; it is not a capital amount and is typically modeled at a much lower confidence level (shorter return period) than rating agency or economic capital.

### **no page for Economic Profit** — 1 question(s)

- `cas9-2015-q15` (fact): When premium is raised, the expense ratio and loss ratio assumptions determine how expenses and losses scale with the added premium; if the loss and expense ratios are held constant, the added premium is multiplied by (1 − expense ratio − loss ratio) plus investment return on (1 − expense ratio).

### **no page for Excess of Loss Reinsurance** — 1 question(s)

- `cas8-2016-q19` (procedure): With pro-rata ALAE in an excess treaty, ALAE is shared in the same proportion as the ceded loss is to the total loss on each claim (ceded loss / total claim loss times ALAE).

### **no page for Expert Opinion in Internal Models** — 1 question(s)

- `cas7-2013-q15` (fact): Expert opinion draws on industry experts' knowledge to assess a company's exposure to extreme events and possible mitigation, but it is subject to judgment and bias.

### **no page for Exposure Base for Frequency** — 1 question(s)

- `cas8-2018-q1` (procedure): When exposures are not given, use earned premium as the exposure base, test each line separately, and compute expected counts as each group's premium times the overall claim frequency per premium.

### **no page for Financial Distress Costs for Insurers** — 1 question(s)

- `cas7-2015-q27` (fact): Market capital reactions to an insurer entering distress tend to be a multiple of the actual drop in book value that caused the distress.

### **no page for Firm Value as Risk-Adjusted Present Value of Earnings** — 1 question(s)

- `cas7-2014-q24` (formula): Firm value is the risk-adjusted present value of a perpetuity of earnings with no growth: V = E × D/(1−D) = E(1−d)/(r+d) = E/k.

### **no page for Franchise Value (Panning)** — 1 question(s)

- `cas9-2014-q10` (formula): Franchise value F = c·r·S·(a + b·y − y) / [(1 + y)(1 + y − c·r)] when the target return on surplus is k = a + b·y, where cr is the client retention rate, S is surplus and y is the risk-free rate.

### **no page for Frank Copula** — 1 question(s)

- `cas7-2015-q21` (fact): Frank's copula does not have a heavier tail than the normal copula, so it is not a suitable choice for heavy tail dependence.

### **no page for General Factor Model of the Underwriting Cycle** — 1 question(s)

- `cas7-2016-q28` (formula): The general factor model for the underwriting cycle has a latent factor Z_t = a + b Z_{t-1} + sigma*epsilon_t, and the observed combined ratio X_t = d + c (Z_{t-1} - X_{t-1}) + tau*delta_t, so X adjusts toward the prior latent factor value.

### **no page for Gumbel Copula** — 1 question(s)

- `cas7-2015-q21` (fact): Copulas with heavy right-tail dependence, such as the Gumbel copula or the Heavy Right Tail (HRT) copula, better reflect increased correlation of insurance losses in extreme events and the skewness of losses than the normal copula.

### **no page for Heavy Right Tail (HRT) Copula** — 1 question(s)

- `cas7-2019-q20` (fact): The HRT (heavy right tail) copula has dependence concentrated in the right tail, so its scatter plot shows points bunched in the upper-right corner and is asymmetric.
- `cas7-2019-q20` (fact): The HRT copula suits lines of business that are largely uncorrelated normally but become highly dependent in extreme events such as catastrophes, because it puts heavy dependence in the right tail.

### **no page for Insurance CAPM** — 1 question(s)

- `cas9-an-008` (fact): The ratio k_i/s_i equals liabilities divided by premium (L_i/P_i), so the risk-free interest credit on policyholder-supplied funds must be expressed per dollar of premium rather than per dollar of equity.

### **no page for Insurance Supply and Demand Curves** — 1 question(s)

- `cas7-2017-q25` (fact): Insurance supply and demand graphs plot price on the vertical axis and quantity of insurance on the horizontal axis, with a downward-sloping demand curve and an upward-sloping supply curve meeting at the equilibrium price and quantity.
- `cas7-2017-q25` (fact): After a capital infusion shifts both supply and demand outward, equilibrium quantity increases while the equilibrium price may rise or fall depending on the relative size of the shifts.

### **no page for Internal Model Uses and Limitations** — 1 question(s)

- `cas7-2012-q24` (fact): A single firm-wide internal model may be impractical for day-to-day business decisions because its long run time makes it too slow for quick decisions such as whether to underwrite a policy.
- `cas7-2012-q24` (fact): A single firm-wide internal model may be too simple for specialized business-unit needs such as product pricing or bonus calculation, which require more complex, detailed models.

### **no page for Internal Models for Solvency** — 1 question(s)

- `cas7-2013-q16` (procedure): To reflect positively correlated loss ratios in an internal model, input an expected rating environment, select volatility around the mean that increases over later projection periods, and apply an appropriate correlation between premium rating movements across projection years and across classes.

### **no page for Investment Portfolio Taxation** — 1 question(s)

- `cas7-2016-q22` (fact): Tax-exempt bonds have lower pre-tax yields than taxable bonds but reduce tax on investment income, making them more valuable when the insurer has taxable profits (e.g., underwriting profit in a hard market).

### **no page for Limit and Attachment Point Drift** — 1 question(s)

- `cas8-2014-q20` (fact): Policy limits and attachment points drift upward over time, so applying current limits and attachment points to historical losses misstates the ground-up loss implied by a historical layer payment, because past attachment points were lower.
- `cas8-2014-q20` (fact): If a historical claim is converted to ground-up using the current (higher) attachment point rather than the lower historical one, the ground-up loss is overstated, so the trended layer claim is overstated.

### **no page for Logic Trees** — 1 question(s)

- `cas8-2018-q17` (procedure): A logic tree incorporates uncertainty by assigning probability weights (based on expert opinion) to alternative parameter values or model branches and combining the results as a weighted average; it is easy to trace and communicate but relies on subjective, simplified opinions and does not scale we…

### **no page for Loss Ratio Planning Bridging Model** — 1 question(s)

- `cas7-2014-q25` (definition): A bridging model projects loss ratios for recent, immature years by starting from mature older-year loss ratios and adjusting them for loss cost trend and rate level changes, using them as expected loss ratios (e.g., in a Bornhuetter-Ferguson method).
- `cas7-2014-q25` (fact): A bridging model creates autocorrelation between loss ratios of different years, so errors or deterioration in older-year loss ratios carry forward into plan and recent-year loss ratios, which can cause reserve problems, especially for long-tailed lines.

### **no page for Loss and ALAE Relationship** — 1 question(s)

- `cas7-2013-q18` (fact): Loss and ALAE are positively correlated, and for large claims ALAE tends to be large too because insurers contest and litigate them (attorney fees, investigation expenses).
- `cas7-2013-q18` (fact): For small claims the correlation between loss and ALAE is weaker and ALAE varies widely (near zero to large amounts, including high ALAE with zero loss from a successful defense), so the loss-ALAE dependence is not uniform across claim sizes.

### **no page for Mortgage Market Innovations (Fannie Mae and Freddie Mac)** — 1 question(s)

- `cas9-2014-q13` (fact): Fannie Mae and Freddie Mac purchased whole mortgages from originators to free lenders' balance sheets, increasing mortgage credit availability and liquidity and removing regional imbalances in funding, effectively nationalizing the home mortgage market.

### **no page for Mutual vs Stock Insurance Companies** — 1 question(s)

- `cas7-2015-q27` (fact): In a mutual insurer the policyholders are the owners and are more risk-averse than shareholders of public companies, which leads mutuals to purchase more reinsurance.

### **no page for Occurrence Exceedance Probability Curve** — 1 question(s)

- `cas8-2013-q24` (procedure): To find the loss at an exceedance probability not listed on an OEP curve, linearly interpolate between the two adjacent curve points (probability, loss).

### **no page for Panning Risk-Adjusted Present Value of Future Earnings** — 1 question(s)

- `cas7-2013-q20` (formula): In the Panning model, firm value equals risk-adjusted earnings times a multiplier, V = E × M, where M = D/(1−D).
- `cas7-2013-q20` (formula): The risk-adjusted discount factor is D = (1 − d)/(1 + r), where d is the probability of financial distress and r is the risk-free rate.

### **no page for Plan Loss Ratio** — 1 question(s)

- `cas7-2016-q26` (fact): A plan (planned) loss ratio is often used as the expected loss ratio (ELR) in reserving methods such as Bornhuetter-Ferguson and Expected Loss Ratio, so an optimistic plan loss ratio understates selected ultimate losses and unpaid claim estimates.

### **no page for Pricing of Defaultable Securities** — 1 question(s)

- `cas9-2019-q10` (formula): Price of a risky zero-coupon-type tranche = promised payment × (1 − default probability) discounted at the discount rate over the number of years to maturity: P = Payoff × (1−PD)/(1+r)^T.

### **no page for Risk-Adjusted Discount Factor and Probability of Distress** — 1 question(s)

- `cas7-2014-q24` (formula): The risk-adjusted discount factor is D = (1 − d)/(1 + r), where d is the probability of financial distress and r is the risk-free rate; the implied risk-adjusted discount rate k satisfies D = 1/(1+k).

### **no page for Risk-adjusted Tail Value at Risk (RTVaR)** — 1 question(s)

- `cas7-2015-q24` (formula): Risk-adjusted TVaR (RTVaR) equals TVaR plus a constant c times the standard deviation of losses in the tail: RTVaR = TVaR + c·SD(X \| X > α percentile).
- `cas7-2015-q24` (fact): RTVaR is based only on tail losses and so does not evaluate the whole distribution; and because its standard deviation load is a quadratic measure, it may place insufficient weight on very large losses for skewed distributions.

### **no page for Scatterplots for Dependency** — 1 question(s)

- `cas7-2014-q21` (fact): A scatterplot can reveal how dependency varies across the distribution (e.g., in the tails), unlike single-number measures, but its interpretation is subjective, may mistake random patterns for dependence, and mixes marginal distribution shapes with the dependency.

### **no page for Scenario Planning** — 1 question(s)

- `cas7-2017-q24` (definition): Traditional unilateral planning sets a single version of the plan (one point estimate of premium volume and loss ratio by line) that is used as the target for the year regardless of how conditions evolve.
- `cas7-2017-q24` (fact): A drawback of a single fixed plan is that underwriters pressured to 'make plan' may write business at inadequate prices when market conditions worsen (e.g., a soft market), harming long-term underwriting results.
- `cas7-2017-q24` (fact): A drawback of a single fixed plan is organizational inertia: management is reluctant to revise plan loss ratio estimates when actual results deviate, so booked losses drift from reality and optimistic plan loss ratios feed into reserving (e.g., Bornhuetter-Ferguson).
- `cas7-2017-q24` (procedure): Scenario planning steps: define a set of plausible future scenarios (e.g., market conditions, possibly with likelihoods), develop pre-agreed action plans and targets (premium volume and loss ratio by line) for each scenario, then monitor the environment and implement the plan of the scenario that e…
- `cas7-2017-q24` (fact): Scenario planning lets management respond quickly to changing conditions because responses were agreed in advance rather than devised on the fly.
- `cas7-2017-q24` (fact): Scenario planning reduces pressure to make plan at all costs and overcomes organizational inertia, since alternative plans and incentives are already sanctioned when the environment changes, supporting long-term profitability.

### **no page for Simulation of Discrete Distributions (Inverse Transform)** — 1 question(s)

- `cas8-2015-q22` (procedure): To simulate a loss from a discrete aggregate distribution with a uniform random number, find the interval of the cumulative distribution F(x) (or of 1 − random number on the exceedance curve) that contains the number and select the corresponding discrete loss amount, without interpolating.

### **no page for Strategic Risk** — 1 question(s)

- `cas7-2015-q28` (fact): Industry risk is a type of strategic risk, including capital intensiveness, overcapacity, commoditization, deregulation, and cycle volatility, all significant for insurers.

### **no page for Surplus Notes** — 1 question(s)

- `cas7-2018-q22` (formula): The annual cost of a surplus note is the principal times the difference between the coupon rate and the bond yield (the coupon paid minus the investment income earned on the proceeds at the bond yield).
- `cas7-2018-q22` (fact): The return of surplus note principal at maturity is not counted as a cost of the surplus note strategy, since only the net financing cost (coupon minus yield) is the cost.

### **no page for Tail Concentration Functions** — 1 question(s)

- `cas7-2016-q25` (definition): The right-tail concentration function R(z) is the probability that both variables exceed their z-th quantiles, given that one exceeds its z-th quantile: R(z) = P(U > z, V > z) / (1 - z) = (1 - 2z + C(z,z)) / (1 - z).
- `cas7-2016-q25` (fact): A right-tail concentration graph can be misleading because a copula may have significant tail dependence even when R(1) = 0 (R may decline rapidly), and because it shows only the right tail and reduces a two-dimensional dependence to a one-dimensional curve.
- `cas7-2016-q25` (procedure): To address the limitations of the right-tail concentration graph, examine R(z) at values somewhat below 1, combine it with the left-tail concentration function L(z) (using L for z ≤ 0.5 and R for z ≥ 0.5), and/or supplement with other measures such as Kendall's tau or industry data.

### **no page for Tail Concentration Functions of Copulas** — 1 question(s)

- `cas7-2012-q17` (definition): The right-tail concentration function R(z) is the conditional probability that both variables exceed their z-quantiles given one does, R(z) = Pr(U>z and V>z)/(1-z) = Pr(V>z \| U>z), measuring how much probability a copula places in its joint right tail.
- `cas7-2012-q17` (formula): For a copula C, Pr(U>z and V>z) = 1 - 2z + C(z,z), so R(z) = (1 - 2z + C(z,z))/(1 - z).
- `cas7-2012-q17` (fact): The limit of R(z) as z approaches 1 measures right-tail dependence; the independence (product) copula has R(z)=1-z going to 0, while a copula with a positive limit has asymptotic right-tail dependence.

### **no page for Tail Dependence** — 1 question(s)

- `cas7-2014-q20` (fact): Correlation between risks often increases in the tails of the loss distributions, so a single constant correlation coefficient understates joint extreme outcomes.

### **no page for Treatment of ALAE in Increased Limits and Umbrella Pricing** — 1 question(s)

- `cas8-2014-q21` (fact): Ranking of umbrella cost by ALAE treatment: ALAE inside underlying and outside umbrella is most expensive; ALAE outside both is least expensive; ALAE inside both is in between, since lowered attachment outweighs uncapped ALAE above the umbrella limit when most expected loss lies in lower portions o…

### **no page for Underinvestment Problem** — 1 question(s)

- `cas7-2014-q23` (definition): The underinvestment problem: when a firm is in financial distress, shareholders may forgo safer or positive-value projects whose benefits go mainly to debtholders, harming debtholders and firm viability; reducing risk of distress helps avoid this.

### **no page for Underwriting Cycle Management Strategies** — 1 question(s)

- `cas7-2018-q24` (definition): A 'maintain market share' (naive) underwriting cycle strategy keeps premium volume or plan targets constant through the cycle by cutting prices or loosening terms to avoid losing customers.
- `cas7-2018-q24` (fact): Effective cycle management aligns underwriter incentives and management goals with owner objectives (agency theory), rewarding underwriting discipline over premium growth, and educates owners to expect lower volume and higher expense ratios in soft markets.
- `cas7-2018-q24` (fact): Effective cycle management includes scenario planning with pre-determined responses to market changes and investment strategy adjusted to the cycle (e.g., taxable bonds in soft markets, tax-exempt bonds in hard markets).

### **no page for Underwriting Cycle Modeling Approaches** — 1 question(s)

- `cas7-2017-q25` (definition): A behavioral (econometric) approach to modeling the underwriting cycle is a middle ground between soft and technical approaches, combining human/economic behavior with mathematical rigor.
- `cas7-2017-q25` (procedure): A behavioral model of the underwriting cycle represents insurance supply and demand curves, varies key inputs (capital, shock events, inflation, capital flows) to shift the curves, and uses the resulting equilibrium prices to model cycle turns.

### **no page for Underwriting Cycle Modeling: Soft Approaches** — 1 question(s)

- `cas7-2016-q28` (definition): The Delphi method is a soft approach to the underwriting cycle in which experts answer questionnaires, responses are aggregated and fed back to participants who may revise or justify their views, and the process repeats until consensus is reached.
- `cas7-2016-q28` (definition): Competitor analysis is a soft approach that combines trade publications, rate filings, agents and financial statements to detect whether many competitors are financially distressed or unusually profitable, in order to predict a turn in the underwriting cycle.
- `cas7-2016-q28` (definition): Scenario testing is a soft approach that uses written descriptions of possible future states of the insurance environment to prepare management to think about responses.

### **no page for Underwriting Risk in Internal Models** — 1 question(s)

- `cas7-2012-q23` (definition): Attritional loss risk is the risk of many high-frequency, low-severity claims, i.e. more claims than expected or higher severity on small claims than expected, and it is modeled separately in an internal solvency model.

### **no page for VaR Exceedance Probability Curves** — 1 question(s)

- `cas9-2017-q20` (procedure): Using the exceedance probability curve at a chosen exceedance probability, read off the ratio of (expected loss plus capital) to expected loss for each line, and solve for the line's allocated capital C.

### **no page for Value at Risk** — 1 question(s)

- `cas7-2019-q20` (fact): A copula with stronger right-tail dependence makes large losses across lines more likely to occur together, which gives a higher VaR at high percentiles of the aggregate loss distribution.

### **no page for Variable Target Return on Surplus Pricing** — 1 question(s)

- `cas9-2016-q15` (formula): When target return on surplus varies with the risk-free rate as k = a + b·y, franchise value equals cr·S·[a + y(b-1)] / (1+y) / (1+y-cr).
- `cas9-2016-q15` (formula): Premium under a target return on surplus k is P = [S(k - y) + L]/(1+y) + E, with k = a + b·y under the variable strategy.

### `Concepts/Catastrophe Risk.md` — 1 question(s)

- `cas9-2013-q13` (fact): A catastrophe risk swap is an unfunded agreement to pay on a covered event, so each party is exposed to counterparty default risk that can be reduced by choosing a financially strong counterparty.
- `cas9-2013-q13` (fact): A catastrophe risk swap exchanges uncorrelated catastrophe exposures (e.g., different regions or perils) between two parties, giving each risk diversification.

### `Concepts/Correlation Coefficient.md` — 1 question(s)

- `cas7-2013-q17` (fact): Pearson correlation is a cardinal measure based on the magnitudes of the values, so it is highly sensitive to outliers and points far from the mean, which can dominate and inflate it.

### `Concepts/Covariance and Correlation Coefficient.md` — 1 question(s)

- `cas7-2012-q15` (fact): Pearson's correlation measures linear dependence using actual values and is heavily affected by outliers; if rank-based measures (Spearman, Kendall) agree with Pearson, Pearson is appropriate, whereas a large gap suggests outliers or non-linearity are distorting it.

### `Concepts/Credibility.md` — 1 question(s)

- `cas8-2018-q1` (procedure): To evaluate a credibility weight Z with the MSE criterion, form for each past period a prediction as Z/2 times each of the two prior periods' frequencies plus (1-Z) times the cumulative overall frequency up to that point, then average the squared differences between actual and predicted frequencies…

### `Concepts/Credit Risk.md` — 1 question(s)

- `cas7-2013-q14` (definition): Settlement risk is the risk arising from the lag between a bond's maturity or payment date and actual receipt of payment.
- `cas7-2013-q14` (fact): Bonds from the same issuer are treated as perfectly correlated (correlation of 1, diversification parameter α = 0), so no diversification benefit applies.

### `Concepts/Finite Reinsurance.md` — 1 question(s)

- `cas8-2015-q21` (procedure): With a cedent termination option, a trial in which the interim profit commission is positive is terminated at that point and pays only that commission; trials not terminated continue and use cumulative full-term ceded premium and ceded loss to determine the final commission.

### `Concepts/Loss Corridors.md` — 1 question(s)

- `cas8-2018-q15` (procedure): To find the reassumed corridor percentage, set the expected loss ratio net of corridor recoveries (expected unadjusted loss ratio minus the expected corridor loss ratio times the share) equal to the target loss ratio, and solve for the share, equivalently dividing the required loss ratio reduction …

### `Concepts/Operational Risk.md` — 1 question(s)

- `cas7-2012-q22` (procedure): Mitigate external fraud and data-security risk from outsourcing to third parties through access controls such as passwords and heightened security.
- `cas7-2012-q22` (procedure): Mitigate execution, delivery and process management risk from vendors by clearly communicating expectations between internal staff and vendor personnel and by funding or reserving for the risk of errors.

### `Concepts/Quota Share.md` — 1 question(s)

- `cas8-2016-q19` (fact): A quota share with a maximum ceded loss ratio caps the reinsurer's recovery at that ratio times ceded premium, so the capital reduction from the quota share is limited to that cap rather than the full cession percentage of the gross loss.

### `Concepts/Reinsurance Pricing.md` — 1 question(s)

- `cas9-2017-q15` (definition): Rate on line (ROL) is reinsurance premium divided by the policy limit; loss on line (LOL) is expected loss divided by the policy limit.
- `cas9-2017-q15` (definition): ROL/LOL equals premium divided by expected loss for a reinsurance layer, so it is directly comparable to the CAT bond spread as a price per dollar of expected loss.
- `cas9-2017-q15` (fact): Reinsurance ROL/LOL multiples rise as layers become higher and less likely to be hit (lower LOL), so high excess layers are expensive per dollar of expected loss, and these multiples are volatile year to year.

### `Concepts/Risk Management.md` — 1 question(s)

- `cas7-2012-q21` (fact): Firms with high market-to-book ratios or high R&D spending have many growth opportunities, need capital for capital-intensive, long-payout investments with unstable cash flows, and have few tangible assets, so distress is costlier and raising capital is more expensive; risk management that keeps th…

### `Concepts/Risk Transfer.md` — 1 question(s)

- `cas7-2013-q20` (procedure): The value of reinsurance's risk transfer is the change in firm value, i.e. risk-adjusted PV of earnings with reinsurance minus without; lower distress probability raises D and the multiplier, so value rises despite lower earnings.

### `Concepts/Risk-Adjusted Performance.md` — 1 question(s)

- `cas9-2015-q18` (formula): The discounted loss ratio equals the undiscounted loss ratio divided by (1 + interest rate) raised to the loss reserve duration, since losses are paid at the end of the period, on average at the duration.

### `Concepts/Solvency II.md` — 1 question(s)

- `cas7-2014-q27` (fact): Fitting a probability density function to a few known points of a capital distribution is easy and smooths the distribution, allowing interpolated or extrapolated quantiles and confidence intervals to be calculated.
- `cas7-2014-q27` (fact): A fitted probability density function may poorly represent the full range of real-world outcomes, may under-fit the tail (the most important part for solvency), and has difficulty handling steps in the distribution such as those caused by reinsurance contracts.

### `Concepts/Underwriting Cycle.md` — 1 question(s)

- `cas7-2019-q21` (definition): An econometric model of the underwriting cycle combines components such as capital, supply, demand, and profit flows, whose interactions determine the equilibrium price and quantity of insurance; it blends technical (statistical) modeling with soft (human-factor) modeling.

## Tagging and linking gaps

The vault teaches what these questions need, but on a page the question isn't tagged with and its tagged pages don't link to. Adding the page to the question's `wiki_link` (or linking it from the tagged page) puts it in reach.

| Question | Pages that teach what it needs |
|---|---|
| `cas7-2012-q13` | Expected Loss |
| `cas7-2012-q15` | Development Factor Correlation Test, Variance and Standard Deviation |
| `cas7-2012-q18` | Basic Risk Measures, Variance and Standard Deviation |
| `cas7-2012-q24` | Economic Capital |
| `cas7-2013-q14` | Regulatory Capital |
| `cas7-2013-q15` | Catastrophe Model Output, Economic Scenario Generator |
| `cas7-2013-q16` | Underwriting Cycle |
| `cas7-2013-q17` | Development Factor Correlation Test |
| `cas7-2013-q19` | Convolution |
| `cas7-2013-q20` | Investment Income |
| `cas7-2013-q22` | Claim Reserve, Investment Income, Market Risk |
| `cas7-2014-q18` | Market Risk, Risk Diversification |
| `cas7-2014-q22` | Coefficient of Variation, Variance and Standard Deviation |
| `cas7-2014-q24` | Investment Income |
| `cas7-2014-q27` | Bootstrap, Cumulative Distribution Function (CDF), Economic Capital |
| `cas7-2015-q20` | Risk Transfer |
| `cas7-2015-q22` | Risk Experience |
| `cas7-2015-q23` | Development Factor Correlation Test |
| `cas7-2015-q27` | Types of Insurers |
| `cas7-2015-q29` | ALM Risk |
| `cas7-2016-q22` | Underwriting Cycle |
| `cas7-2016-q27` | Underwriting Cycle |
| `cas7-2016-q28` | Autoregressive Model |
| `cas7-2017-q25` | Underwriting Cycle |
| `cas7-2018-q24` | Underwriting Cycle |
| `cas7-2019-q19` | Empirical Distribution |
| `cas8-2013-q24` | Net of Reinsurance |
| `cas8-2013-q25` | Frequency Distribution, Panjer Recursion |
| `cas8-2014-q21` | Umbrella Liability Insurance |
| `cas8-2015-q22` | Catastrophe Model Output, Discrete Random Variable |
| `cas8-2017-q20` | Catastrophe Model Output, Variance and Standard Deviation |
| `cas8-2018-q1` | Chi-Square Goodness-of-Fit Test |
| `cas8-2018-q17` | Parameter Risk |
| `cas8-2019-q18` | Complement of Credibility, Net of Reinsurance |
| `cas9-2013-q9` | Lifetime Value |
| `cas9-2014-q13` | Florida Hurricane Catastrophe Fund, Mortgage-Backed Security |
| `cas9-2017-q12` | Lifetime Value |
| `cas9-2018-q12` | Risk-Neutral Valuation |
| `cas9-2019-q10` | Corporate Bond, Yield Rate |
| `cas9-an-008` | Financial Economics |
| `cas9-an-010` | Risk Diversification |

## Taught only in a collapsed section

The passage that teaches these items sits inside a folded callout (a worked example, a table behind a toggle). A reader who skims never opens it.

| Page | Questions | Items |
|---|---|---|
| Model Selection | 4 | Copulas such as Gumbel and heavy-right-tail have strong right-tail concentratio…; A copula with positive right-tail concentration is appropriate for lines of bus…; Copulas combine the loss distributions of multiple lines of business and specif… |
| Structured Finance | 4 | With perfectly correlated defaults, all bonds in the pool default together, so …; The junior tranche absorbs the first losses, so with two underlying securities …; Compute a tranche's default probability for uncorrelated (independent) underlyi… |
| Interest Rate Risk | 2 | Manage franchise value duration through pricing by making the target return on …; In Panning's framework, the target return is modeled as k = a + b·y, where y is…; With assets held in risk-free instruments matching the liability payout timing,… |
| Catastrophe Expected Loss Cost | 1 | With an expense load expressed as a percentage of premium, premium = (expected … |
| Catastrophe Model Output | 1 | Compute exceedance probabilities by sorting the aggregate loss outcomes from la… |
| Convolution | 1 | The distribution of the combined loss of two independent perils is built by mul… |
| Cost of Capital | 1 | In a competitive market, the price is set so that the one-year economic profit … |
| Insurance-Linked Securities | 1 | A binary-triggered ILW pays its full limit when the trigger conditions are met … |
| Mortgage-Backed Security | 1 | Expected monthly prepayment equals SMM multiplied by the beginning-of-month bal… |
| Parameter Risk | 1 | Simulation incorporates uncertainty by randomly sampling parameter values from … |
| Quota Share | 1 | A quota share with a loss limit cedes the quota share percentage times the loss… |
| Risk Diversification | 1 | Because the correlation matrix is symmetric and the diagonal entries equal 1, t… |
| Risk Modeling | 1 | Setting capital solely to achieve a small probability of default is weak becaus… |
| Treaty Reinsurance | 1 | When a risks attaching treaty and a losses occurring treaty cover consecutive p…; Overlapping treaty coverage can be avoided with an interlocking clause assignin… |

## Every question

<details><summary><code>cas7-2012-q13</code> · gap</summary>

Tagged pages: Risk Management, Capital Required, Reinsurance, Risk Measure, Risk Capital

| Item | Kind | Status | Where |
|---|---|---|---|
| Expected loss on a line of business equals expected claim count times expected claim severity; loss reserves for known claims equal claim c… | formula | elsewhere | Expected Loss: “**Expected loss** is the mean of the loss that an insurer, or one layer of its coverage, will bear …” |
| Value at Risk at level p (VaR_p) is the p-th percentile of the loss distribution. | definition | tagged | Risk Measure: “- **Value at Risk** is the lower $p$-quantile of the loss ([[Percentile]]).” |
| Tail Value at Risk at level p (TVaR_p) is the expected loss given that the loss exceeds VaR_p, i.e. the average of losses in the tail beyon… | definition | tagged | Risk Measure: “- **Tail Value at Risk** averages the worst $1-p$ of outcomes; for any distribution $\text{TVaR}_p …” |
| When no closed form is used, approximate TVaR_p by averaging the VaR values at higher percentiles in the tail (a discrete approximation of … | procedure | tagged | Risk Measure: “$$\text{TVaR}_p(X) = \frac{1}{1-p}\int_p^1 \text{VaR}_s(X)\, ds$$” |
| TVaR is linear in losses above the threshold, so a loss twice as large is treated as only twice as bad; this understates extreme tail risk,… | fact | missing |  |
| Aggregating lines in a capital model requires accounting for dependence between lines, especially tail dependence (e.g. from catastrophes o… | fact | tagged | Risk Management: “Following modern portfolio theory, the risk of the whole organization is not the simple sum of its …” |
| An underwriting-risk-only factor-based RBC formula omits other risks (catastrophe, premium risk, market, credit, operational), which requir… | fact | tagged | Capital Required: “It is the sum of the requirements for each category of risk, less a credit for diversification, and…” |
| Quota share reinsurance reduces losses proportionally but does not eliminate extreme tail losses, does not cover already-incurred loss rese… | fact | tagged | Reinsurance: “Provides capacity and surplus relief, and protects against frequency and severity alike — but only …” |

</details>

<details><summary><code>cas7-2012-q14</code> · answerable</summary>

Tagged pages: Interest Rate, Stochastic Differential Equation

| Item | Kind | Status | Where |
|---|---|---|---|
| The Vasicek short-rate model is dr_t = (b - a r_t) dt + s dW_t, where W_t is a standard Brownian motion, a is the speed of mean reversion, … | formula | tagged | Stochastic Differential Equation: “Hull's chapter on equilibrium short-rate models writes it $dr_t = a(b - r_t)\,dt + \sigma\,dW_t$, w…” |
| The Vasicek model is a continuous-time, mean-reverting Brownian motion model of the short interest rate, in which the rate is pulled toward… | definition | tagged | Stochastic Differential Equation: “Hull's chapter on equilibrium short-rate models writes it $dr_t = a(b - r_t)\,dt + \sigma\,dW_t$, w…” |
| The CIR model is dr_t = (b - a r_t) dt + s sqrt(r_t) dW_t, which differs from Vasicek by multiplying the volatility term by the square root… | formula | tagged | Stochastic Differential Equation: “The model $dr_t = a(b - r_t)\,dt + \sigma\sqrt{r_t}\,dW_t$ has the same drift as Vasicek, so $r_T$ …” |
| In the CIR model volatility is proportional to the square root of the rate, so volatility rises with the level of rates (as observed empiri… | fact | tagged | Stochastic Differential Equation: “The volatility shrinks as the rate falls, so the rate stays non-negative, and it stays strictly pos…” |
| The CIR model cannot produce negative interest rates because volatility goes to zero as the rate approaches zero, whereas the Vasicek model… | fact | tagged | Stochastic Differential Equation: “The volatility shrinks as the rate falls, so the rate stays non-negative, and it stays strictly pos…” |

</details>

<details><summary><code>cas7-2012-q15</code> · gap</summary>

Tagged pages: Correlation, Covariance and Correlation Coefficient

| Item | Kind | Status | Where |
|---|---|---|---|
| Pearson's correlation coefficient equals the covariance of X and Y, E(XY) - E(X)E(Y), divided by the product of the standard deviations of … | formula | tagged | Correlation: “$$\rho(X, Y) = \frac{\text{Cov}(X, Y)}{\sigma_X \, \sigma_Y}$$” |
| Standard deviation is computed as the square root of E(X^2) minus the square of E(X). | formula | elsewhere | Variance and Standard Deviation: “$$= E[X^2] - \mu^2$$ … $$\sigma = \text{SD}(X) = \sqrt{\text{Var}(X)}$$” |
| Kendall's tau equals 1 minus Q divided by half the number of pairs, where Q is the number of adjacent swaps needed to put the second variab… | formula | missing |  |
| Spearman's rho equals 1 minus 6s divided by n(n^2 - 1), where s is the sum of squared differences between the ranks of paired observations. | formula | elsewhere | Development Factor Correlation Test: “$$T_k = 1 - \frac{6\sum_{i=1}^{I-k}(r_{ik} - s_{ik})^2}{(I-k)^3 - (I-k)}$$” |
| To compute a rank correlation measure, rank each variable's observations from smallest to largest (or largest to smallest) and base the cal… | procedure | elsewhere | Development Factor Correlation Test: “$r_{ik}$ ranks the $I-k$ factors $C_{i,k+1}/C_{ik}$ of column $k$.” |
| Pearson's correlation measures linear dependence using actual values and is heavily affected by outliers; if rank-based measures (Spearman,… | fact | missing |  |
| Pearson's correlation, Spearman's rho and Kendall's tau each summarize dependency in a single number ranging from -1 to 1, but Pearson uses… | fact | missing |  |

</details>

<details><summary><code>cas7-2012-q16</code> · gap</summary>

Tagged pages: Correlation, Independent Random Variables

| Item | Kind | Status | Where |
|---|---|---|---|
| The chi statistic at point i is chi_i = (H_i - F_i G_i) / sqrt(F_i(1-F_i) G_i(1-G_i)), where F_i and G_i are the marginal empirical distrib… | formula | missing |  |
| Chi measures how far the joint empirical distribution at a point is from what independence would give (the product of the marginals), scale… | definition | missing |  |
| The lambda statistic is lambda_i = 4 * sign(F~_i G~_i) * max(F~_i^2, G~_i^2), where F~_i = F_i - 1/2 and G~_i = G_i - 1/2. | formula | missing |  |
| Lambda measures the signed distance of a point from the center (median) of the bivariate distribution, showing where in the distribution th… | definition | missing |  |
| To read a chi-plot, check whether the points scatter randomly around the chi = 0 line (indicating independence) or show a systematic patter… | procedure | missing |  |

</details>

<details><summary><code>cas7-2012-q17</code> · gap</summary>

Tagged pages: Correlation, Multivariate Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The right-tail concentration function R(z) is the conditional probability that both variables exceed their z-quantiles given one does, R(z)… | definition | missing |  |
| For a copula C, Pr(U>z and V>z) = 1 - 2z + C(z,z), so R(z) = (1 - 2z + C(z,z))/(1 - z). | formula | missing |  |
| The limit of R(z) as z approaches 1 measures right-tail dependence; the independence (product) copula has R(z)=1-z going to 0, while a copu… | fact | missing |  |
| Copulas such as Gumbel and heavy-right-tail have strong right-tail concentration, whereas symmetric copulas such as normal and Frank have z… | fact | syllabus | Model Selection (collapsed): “The Gumbel copula has upper-tail dependence: extreme losses in the two lines tend to occur together…” |
| A copula with positive right-tail concentration is appropriate for lines of business that are mostly independent but can be driven together… | fact | syllabus | Model Selection (collapsed): “Evidence on whether the two lines' extreme losses coincide — such as both lines being hit by the sa…” |

</details>

<details><summary><code>cas7-2012-q18</code> · untagged</summary>

Tagged pages: Risk Management, Capital, Risk Measure

| Item | Kind | Status | Where |
|---|---|---|---|
| Standard deviation as a risk measure is the square root of the variance of the aggregate loss distribution; it is a mean-based measure that… | definition | elsewhere | Variance and Standard Deviation: “**Variance** $\sigma^2$ and **Standard Deviation** $\sigma$ both measure how far a [[Random Variabl…” |
| Standard deviation works poorly for highly skewed distributions (e.g., catastrophe or hurricane losses) because it does not focus on the ta… | fact | tagged | Risk Measure: “The standard deviation principle $E[X] + k\,\sigma(X)$ and the variance principle $E[X] + k\,\text{…” |
| Semi-standard deviation measures variability using only outcomes that are adverse (above the mean for losses), ignoring favorable deviation… | definition | elsewhere | Basic Risk Measures: “the variance, the standard deviation and the semivariance, which counts only unfavourable deviations” |
| Value at Risk (VaR) at level p is the p-th percentile of the loss distribution; it is a single point on the distribution and gives no infor… | definition | tagged | Risk Measure: “**Value at Risk** is the lower $p$-quantile of the loss ([[Percentile]]). A [[Probable Maximum Loss…” |
| Tail Value at Risk (TVaR) at level p is the average of all losses at or above VaR at p (the expected loss given the loss exceeds the VaR), … | definition | tagged | Risk Measure: “**Tail Value at Risk** averages the worst $1-p$ of outcomes; for any distribution $\text{TVaR}_p = …” |
| For tail-driven, low-frequency/high-severity exposures such as hurricane risk, tail risk measures (VaR, TVaR) are more appropriate than mea… | fact | tagged | Risk Measure: “a target at one return period can be met by piling risk just beyond it, while TVaR charges for the …” |
| For concerns such as price adequacy, where the whole distribution of outcomes (including frequent small adverse results) matters, whole-dis… | fact | tagged | Risk Measure: “*performance-related* measures, which look at volatility near the mean (variance, standard deviatio…” |

</details>

<details><summary><code>cas7-2012-q19</code> · gap</summary>

Tagged pages: Rating Agency, Reinsurance, Risk Management, Insurance Market Imperfections

| Item | Kind | Status | Where |
|---|---|---|---|
| Financial distress is costly: raising capital under distress means issuing debt at high interest rates or stock at a discount, assets may n… | fact | tagged | Insurance Market Imperfections: “Outsiders know less than management about reserve adequacy and exposure, so new equity raised after…” |
| Policyholders are less willing to pay as much premium to a financially distressed or unstable insurer, and demand a discount for the uncert… | fact | tagged | Insurance Market Imperfections: “Policyholders — customers who, unlike investors, find it costly to diversify their insurer's defaul…” |
| Reinsurance reduces volatility of underwriting results and the chance of financial distress, but lowers expected return on equity because o… | fact | tagged | Reinsurance: “because reinsurance caps exactly the large losses that drive volatility” |
| With a progressive (convex) tax structure, volatile income is taxed more heavily than stable income of the same average, so stabilizing ear… | fact | tagged | Insurance Market Imperfections: “For most firms the tax function is also convex — losses cannot always be offset in full or in time …” |
| A reinsurer with a strong credit rating has low default risk, so it provides more reliable protection than a weaker-rated reinsurer, whose … | fact | syllabus | Reinsurance Credit Risk: “Select counterparties by [[Rating Agency\\|rating]] and financial strength (an approved list)” |
| In agency theory, the agent (e.g., a manager such as the CFO) acts on behalf of the principals (shareholders, policyholders, debtholders), … | definition | tagged | Insurance Market Imperfections: “Managers may spend surplus capital on low-return growth or acquisitions instead of returning it. Sh…” |
| A compensation structure that rewards high returns and penalizes low returns encourages the agent to take excessive risk (e.g., forgo reins… | fact | missing |  |

</details>

<details><summary><code>cas7-2012-q20</code> · answerable</summary>

Tagged pages: Reinsurance, Risk Management, Types of Reinsurance

| Item | Kind | Status | Where |
|---|---|---|---|
| Proportional reinsurance (e.g., quota share) has the reinsurer take a fixed percentage of every policy's premiums and losses, whereas non-p… | definition | tagged | Types of Reinsurance: “*proportional* (the reinsurer takes the same share of premium and of loss) or *non-proportional* (t…” |
| Reasons an insurer buys reinsurance include protection against large or catastrophic losses (lower insolvency risk and capital needs), smoo… | fact | tagged | Reinsurance: “The **cedant** transfers part of its exposure to a **reinsurer** for a ceded premium, reducing net …” |
| Non-proportional reinsurance caps the insurer's losses above a threshold, so it best addresses extreme, low-frequency high-severity losses … | fact | tagged | Reinsurance: “Provides capacity and surplus relief, and protects against frequency and severity alike — but only …” |
| Proportional reinsurance does not change the loss ratio, so it does not stabilize earnings, and ceding premium reduces top-line premium, so… | fact | linked | Pro Rata Reinsurance: “Because every policy is shared alike, a quota share reduces the cedant's net premium and net losses…” |
| Proportional reinsurance gives surplus relief because the ceding commission received from the reinsurer offsets the unearned premium reserv… | fact | linked | Pro Rata Reinsurance: “It gives surplus relief to a growing insurer whose premium and unearned premium are outpacing its s…” |
| Proportional reinsurance has the reinsurer share in the profits and losses of the ceded business, aligning interests and encouraging the re… | fact | tagged | Reinsurance: “**Proportional** — the reinsurer takes a share of premium and losses alike:” |

</details>

<details><summary><code>cas7-2012-q21</code> · gap</summary>

Tagged pages: Rating Agency, Risk Management, Insurance Market Imperfections

| Item | Kind | Status | Where |
|---|---|---|---|
| A financially distressed insurer is perceived as riskier, so policyholders demand a discount on premiums (or leave), reducing premium witho… | fact | tagged | Insurance Market Imperfections: “Policyholders — customers who, unlike investors, find it costly to diversify their insurer's defaul…” |
| Regulators require insurers to hold sufficient capital, and a distressed insurer may be forced to hold more capital that is costly to raise… | fact | tagged | Insurance Market Imperfections: “The cost reaches future business through reputation as well as the business in place.” |
| Financial distress raises the cost of external financing: debt must be issued at higher yields and equity sold at a discount because repaym… | fact | tagged | Insurance Market Imperfections: “Outsiders know less than management about reserve adequacy and exposure, so new equity raised after…” |
| A distressed firm may be forced to sell assets below market value (fire sale) because it cannot wait for the best price and buyers know it. | fact | linked | Financial Risk: “*liquidity risk* — being forced to sell assets at a loss to pay claims.” |
| Other general costs of financial distress include agency problems between agents and principals, regulatory and tax effects (stable outcome… | fact | tagged | Insurance Market Imperfections: “**Agency costs.** Managers may spend surplus capital on low-return growth or acquisitions instead o…” |
| Firms with high market-to-book ratios or high R&D spending have many growth opportunities, need capital for capital-intensive, long-payout … | fact | missing |  |

</details>

<details><summary><code>cas7-2012-q22</code> · gap</summary>

Tagged pages: Risk Management, Operational Risk, Risk Mitigation

| Item | Kind | Status | Where |
|---|---|---|---|
| Operational risk is the risk of loss resulting from failed or inadequate people, processes, or systems, or from external events. | definition | tagged | Operational Risk: “**Operational Risk** is the risk of loss resulting from inadequate or failed internal processes, pe…” |
| Operational risk includes legal risk but excludes reputational and strategic risk. | fact | tagged | Operational Risk: “It includes legal risk but excludes strategic and reputational risk, and it is classified by **caus…” |
| Operational risk is categorized into event types such as internal fraud, external fraud, employment practices and workplace safety, clients… | fact | tagged | Operational Risk: “**Basel's seven event types:** internal fraud; external fraud; employment practices and workplace s…” |
| Mitigate business disruption and system failure risk by maintaining a backup or parallel system and scheduling outages during low-activity … | procedure | linked | Business Continuity Plan: “For IT, alternate sites range from a cold site (space, power, telecommunications and environmental …” |
| Mitigate external fraud and data-security risk from outsourcing to third parties through access controls such as passwords and heightened s… | procedure | missing |  |
| Mitigate execution, delivery and process management risk from vendors by clearly communicating expectations between internal staff and vend… | procedure | missing |  |

</details>

<details><summary><code>cas7-2012-q23</code> · gap</summary>

Tagged pages: Risk Management, Correlation, Large Loss, Insurance Risk, Risk Modeling

| Item | Kind | Status | Where |
|---|---|---|---|
| Attritional loss risk is the risk of many high-frequency, low-severity claims, i.e. more claims than expected or higher severity on small c… | definition | missing |  |
| Large loss risk is the risk of more or larger individual claims than expected, which can cause large unexpected losses threatening solvency… | definition | tagged | Large Loss: “**Large Losses** (shock losses) are individual claims big enough that including them at face value …” |
| Catastrophe risk is the risk of low-frequency, high-severity events in the extreme tail of the loss distribution, where a single event make… | definition | tagged | Insurance Risk: “**catastrophe risk** from single events that strike many policies at once.” |
| Other recognized sources of underwriting risk to model include pricing risk (premiums insufficient), reserve/claims risk, product design ri… | fact | tagged | Insurance Risk: “pricing risk from mis-estimation and competitive pressure” |
| Cross-class correlations tend to be stronger in the tails of the distribution during extreme events, and little or no company data exists o… | fact | missing |  |
| When company data on tail dependence is lacking, correlations can be set using industry or expert opinion and copulas or other dependency m… | procedure | missing |  |

</details>

<details><summary><code>cas7-2012-q24</code> · gap</summary>

Tagged pages: Risk Management, Rating Agency, Capital Required, Risk Modeling, Risk Capital

| Item | Kind | Status | Where |
|---|---|---|---|
| Rating agency capital is the amount of capital an insurer needs to maintain a target credit rating, calculated using the rating agency's fa… | definition | tagged | Rating Agency: “Agencies apply their own capital models — Best's BCAR, S&P's capital model — which can differ subst…” |
| Economic capital is the amount of capital needed to keep the insurer's probability of ruin below a target level, usually estimated with the… | definition | elsewhere | Economic Capital: “**Economic capital** (EC) is the capital an insurer itself estimates it needs to stay solvent, at a…” |
| An economic impairment earnings level is a threshold of losses or earnings shortfall that would put the company in economic impairment; it … | definition | missing |  |
| A single firm-wide internal model may be impractical for day-to-day business decisions because its long run time makes it too slow for quic… | fact | missing |  |
| A single firm-wide internal model may be too simple for specialized business-unit needs such as product pricing or bonus calculation, which… | fact | missing |  |

</details>

<details><summary><code>cas7-2013-q14</code> · gap</summary>

Tagged pages: Risk Management, Concentration Risk, Credit Risk

| Item | Kind | Status | Where |
|---|---|---|---|
| Default (direct) credit risk is the risk that a bond issuer fails to pay the coupon and/or principal when due. | definition | tagged | Credit Risk: “**Credit Risk** is the risk of loss because a counterparty fails to pay what it owes (**default**) …” |
| Downgrade (migration) risk is the risk that a bond's credit rating falls, lowering its market value and possibly raising its default probab… | definition | tagged | Credit Risk: “A deterioration in credit standing widens a bond's credit spread over the risk-free curve and lower…” |
| Concentration risk in a credit portfolio is the risk from exposure concentrated in a single issuer, rating class, industry or geography, wh… | definition | tagged | Concentration Risk: “**Concentration Risk** is the risk that exposures which appear separate turn out to be a single exp…” |
| Settlement risk is the risk arising from the lag between a bond's maturity or payment date and actual receipt of payment. | definition | missing |  |
| Key drivers of credit risk are credit quality, maturity (term), and size of expected loss (exposure); financial risks such as interest rate… | fact | tagged | Credit Risk: “- $PD$ is the probability of default over the horizon, $LGD = 1 - \text{recovery rate}$ the share o…” |
| Aggregate credit risk capital combines individual capital requirements using a correlation-based square-root formula, which reduces to the … | formula | elsewhere | Regulatory Capital: “Most formulas add some charges in full and combine the rest by a square root, which assumes the mai…” |
| Bonds from the same issuer are treated as perfectly correlated (correlation of 1, diversification parameter α = 0), so no diversification b… | fact | missing |  |

</details>

<details><summary><code>cas7-2013-q15</code> · gap</summary>

Tagged pages: Catastrophe Modelling, Stress Testing, Risk Modeling

| Item | Kind | Status | Where |
|---|---|---|---|
| Catastrophe (CAT) models quantify the magnitude and loss distribution of natural and man-made catastrophe events under various scenarios, a… | fact | tagged | Catastrophe Modelling: “Catastrophe models are used in ratemaking, underwriting and portfolio management, the cost and anal…” |
| Economic scenario generators simulate many scenarios of economic factors (inflation, interest rates, credit defaults, equity and property r… | fact | elsewhere | Economic Scenario Generator: “An **Economic Scenario Generator** (ESG) is a model that simulates many joint future paths of econo…” |
| Expert opinion draws on industry experts' knowledge to assess a company's exposure to extreme events and possible mitigation, but it is sub… | fact | missing |  |
| Copulas combine the loss distributions of multiple lines of business and specify how strongly they are correlated in different parts of the… | fact | linked | Model Selection (collapsed): “The Gumbel copula has upper-tail dependence: extreme losses in the two lines tend to occur together…” |
| Modeling extreme events in an internal model requires fattening the tail of the underlying severity distribution so that large losses are a… | fact | elsewhere | Catastrophe Model Output: “Models carry a distribution of loss for each event, often a beta distribution, and including it fat…” |

</details>

<details><summary><code>cas7-2013-q16</code> · gap</summary>

Tagged pages: Correlation, Loss Ratio, Risk Modeling

| Item | Kind | Status | Where |
|---|---|---|---|
| Loss ratios of a large, stable book of business tend to be positively correlated across years because the same policyholders remain and the… | fact | missing |  |
| Personal auto is highly regulated and has low catastrophe exposure, so rate levels change slowly and results are consistent, which makes lo… | fact | missing |  |
| The underwriting cycle moves rate levels between low and high periods, so years in the same phase of the cycle have similar rate adequacy a… | fact | elsewhere | Underwriting Cycle: “It is usually traced through the industry's [[Combined Ratio\\|combined ratio]], which climbs while …” |
| To reflect positively correlated loss ratios in an internal model, input an expected rating environment, select volatility around the mean … | procedure | missing |  |

</details>

<details><summary><code>cas7-2013-q17</code> · gap</summary>

Tagged pages: Correlation, Correlation Coefficient

| Item | Kind | Status | Where |
|---|---|---|---|
| Pearson product-moment correlation equals the sum of products of deviations from the means divided by the square root of the product of the… | formula | tagged | Correlation: “$$r = \frac{\sum_{i=1}^n (x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum_{i=1}^n (x_i - \bar{x})^2}\,\sq…” |
| Spearman rank correlation equals 1 - 6·Σd² / [N(N² - 1)], where d is the difference between the ranks of paired observations and N is the n… | formula | elsewhere | Development Factor Correlation Test: “$$T_k = 1 - \frac{6\sum_{i=1}^{I-k}(r_{ik} - s_{ik})^2}{(I-k)^3 - (I-k)}$$” |
| To compute Spearman rank correlation, rank each variable's observations separately from lowest to highest, pair the ranks by observation (e… | procedure | elsewhere | Development Factor Correlation Test: “$r_{ik}$ ranks the $I-k$ factors $C_{i,k+1}/C_{ik}$ of column $k$. $s_{ik}$ ranks the preceding fac…” |
| Pearson correlation is a cardinal measure based on the magnitudes of the values, so it is highly sensitive to outliers and points far from … | fact | missing |  |
| Spearman correlation is an ordinal measure based only on ranks, so it weights all observations equally and is not affected by the magnitude… | fact | missing |  |

</details>

<details><summary><code>cas7-2013-q18</code> · gap</summary>

Tagged pages: Correlation, Allocated Loss Adjustment Expense

| Item | Kind | Status | Where |
|---|---|---|---|
| Loss and ALAE are positively correlated, and for large claims ALAE tends to be large too because insurers contest and litigate them (attorn… | fact | missing |  |
| For small claims the correlation between loss and ALAE is weaker and ALAE varies widely (near zero to large amounts, including high ALAE wi… | fact | missing |  |
| A copula is a function that joins the marginal distributions of two variables (e.g., loss and ALAE) into a joint distribution, describing t… | definition | syllabus | Model Selection: “Correlation alone does not fix how risks combine — two dependence structures with the same marginal…” |
| To model loss and ALAE dependence in excess-of-loss reinsurance pricing, select a copula type that captures the observed dependence (testin… | procedure | syllabus | Model Selection (collapsed): “Capital is set in the tail, so fit to the body of the data can't decide between them.” |
| Gumbel and Heavy Right Tail copulas exhibit strong right-tail dependence, so they suit loss and ALAE where large losses go with large ALAE. | fact | syllabus | Model Selection (collapsed): “The Gumbel copula has upper-tail dependence: extreme losses in the two lines tend to occur together…” |

</details>

<details><summary><code>cas7-2013-q19</code> · gap</summary>

Tagged pages: Risk Management, Risk Measure

| Item | Kind | Status | Where |
|---|---|---|---|
| TVaR at level α is the conditional expected loss given that the loss exceeds the α-level VaR (percentile), i.e. the average of losses in th… | definition | tagged | Risk Measure: “**Tail Value at Risk** averages the worst $1-p$ of outcomes; for any distribution $\text{TVaR}_p = …” |
| To apply the Wang transform to a discrete loss distribution, convert each cumulative probability F(x) to Φ^{-1}[F(x)], subtract Φ^{-1}(α), … | procedure | tagged | Risk Measure: “**Distortion (spectral) risk measures** weight each layer of loss by $g(S(x))$, where $S = 1 - F$ a…” |
| Expected policyholder deficit at level α equals (1−α) × (TVaR_α − VaR_α). | formula | tagged | Risk Measure: “**Tail Value at Risk** averages the worst $1-p$ of outcomes; for any distribution $\text{TVaR}_p = …” |
| TVaR considers only losses beyond the threshold, so it ignores non-tail risk and does not charge for all risk taken, whereas the Wang trans… | fact | tagged | Risk Measure: “**Tail Value at Risk** averages the worst $1-p$ of outcomes” |
| TVaR weights all tail losses equally (linear in the tail) so it does not show increasing risk aversion to larger losses, while the Wang tra… | fact | missing |  |
| A risk measure that is sub-additive (measure of combined book less than sum of the separate measures) reflects diversification benefits; bo… | fact | tagged | Risk Measure: “*subadditive*: $\rho(X + Y) \leq \rho(X) + \rho(Y)$” |
| The distribution of the combined loss of two independent perils is built by multiplying marginal probabilities for each combination of outc… | procedure | elsewhere | Convolution (collapsed): “- **Forgetting the order count.** $f_X^{*2}(3) = 2(0.6)(0.4)$, not $(0.6)(0.4)$: $3 = 1+2 = 2+1$.” |

</details>

<details><summary><code>cas7-2013-q20</code> · gap</summary>

Tagged pages: Reinsurance, Risk Transfer, Quota Share

| Item | Kind | Status | Where |
|---|---|---|---|
| In the Panning model, firm value equals risk-adjusted earnings times a multiplier, V = E × M, where M = D/(1−D). | formula | missing |  |
| The risk-adjusted discount factor is D = (1 − d)/(1 + r), where d is the probability of financial distress and r is the risk-free rate. | formula | missing |  |
| Annual earnings E equal underwriting income plus investment income, where underwriting income is premium less losses and expenses. | procedure | syllabus | Risk-Adjusted Performance: “$\text{NOI}_i$ is the unit's net operating income (pre- or after-tax, with the hurdle on the same b…” |
| Investment income is the investment yield times the assets available to invest at the start of the year (beginning surplus plus premium les… | procedure | elsewhere | Investment Income: “In the projection, $A_{t-1}$ is the assets at the start of year $t$, $P_t$ the premiums received an…” |
| Under a quota share, the ceded share of premium and losses is removed from the cedent's results, and the ceding commission (a percentage of… | procedure | tagged | Quota Share: “In return it pays the cedant a **ceding commission** for the expenses the cedant incurred to write …” |
| The value of reinsurance's risk transfer is the change in firm value, i.e. risk-adjusted PV of earnings with reinsurance minus without; low… | procedure | missing |  |
| The efficient frontier approach plots expected underwriting profit against a risk measure (e.g., VaR or TVaR) for reinsurance options; pref… | definition | missing |  |
| The cost allocation (cost of capital) approach compares the cost of holding capital (required return on capital) plus net reinsurance cost … | definition | tagged | Reinsurance: “includes the **net cost of reinsurance** (the cost of the reinsurance minus the expected recoveries…” |

</details>

<details><summary><code>cas7-2013-q21</code> · gap</summary>

Tagged pages: Risk Management, Mix of Business, Operational Risk

| Item | Kind | Status | Where |
|---|---|---|---|
| Under the Basel II basic indicator approach, operational risk capital equals a single fixed percentage α (15%) times the average annual pos… | formula | missing |  |
| Under the Basel II standardized approach, capital equals the three-year average of the annual sum across business lines of β_j times gross … | formula | missing |  |
| The standardized approach assigns different β factors (12%, 15%, 18%) to different business lines, such as retail banking at 12% and commer… | fact | missing |  |
| Under the standardized approach, negative gross income in one business line can offset positive gross income in other lines within the same… | fact | missing |  |

</details>

<details><summary><code>cas7-2013-q22</code> · untagged</summary>

Tagged pages: Risk Management, Correlation, Insurance Risk, Financial Risk

| Item | Kind | Status | Where |
|---|---|---|---|
| Pricing risk is the risk that premium rates are inadequate to cover expected losses, expenses and cost of capital, including the effect of … | definition | tagged | Insurance Risk: “pricing risk from mis-estimation and competitive pressure” |
| An insurer with low-yield, stable investments (e.g., duration-matched government securities) relies mainly on underwriting profit, while an… | fact | elsewhere | Investment Income: “Investment income on the [[Unearned Premium\\|unearned premium]] and loss reserves lets a line accep…” |
| Claim variability (reserving/underwriting risk) is the risk that actual claims differ from expected, arising from sources such as catastrop… | definition | tagged | Insurance Risk: “**Insurance Risk** is the risk that claims, their timing and the cost of settling them differ from …” |
| Short-tailed lines like personal auto have less claim variability than long-tailed lines, which are harder to estimate and exposed to infla… | fact | elsewhere | Claim Reserve: “For the most recent incurral months $CF_k$ is small, so $1/CF_k$ magnifies any noise in $P_m$.” |
| Market risk is the risk of loss from changes in asset values and rates, including interest rate risk, reinvestment risk, default/credit ris… | definition | tagged | Financial Risk: “*liquidity risk* — being forced to sell assets at a loss to pay claims.” |
| Duration-matching assets to liabilities and holding high-quality government securities limits interest rate, liquidity and credit exposure,… | fact | elsewhere | Market Risk: “Asset–liability matching, such as [[Duration Matching\\|duration matching]] and [[Immunization\\|immu…” |
| Correlation risk is the risk that different risk sources (lines of business, assets and liabilities) move together, especially in the tail,… | definition | tagged | Risk Management: “Following modern portfolio theory, the risk of the whole organization is not the simple sum of its …” |

</details>

<details><summary><code>cas7-2014-q18</code> · untagged</summary>

Tagged pages: Risk Management, Concentration Risk, Reinvestment Risk, Financial Risk, Credit Risk, Risk Taxonomies

| Item | Kind | Status | Where |
|---|---|---|---|
| Market risk is the risk of loss from changes in asset and liability values caused by changing financial variables or market prices (e.g., i… | definition | elsewhere | Market Risk: “**Market risk** is the risk of loss from movements in market prices and rates: equity prices, [[Int…” |
| Credit risk is the risk of loss from a change in credit quality (downgrade or default) of a counterparty, i.e., that a party cannot fulfill… | definition | tagged | Credit Risk: “**Credit Risk** is the risk of loss because a counterparty fails to pay what it owes (**default**) …” |
| Types of insurer market risk include interest rate risk, equity/property risk, concentration risk, reinvestment risk, basis risk, and asset… | definition | tagged | Concentration Risk: “**Concentration Risk** is the risk that exposures which appear separate turn out to be a single exp…” |
| Market risk affects asset values (e.g., falling equity or bond prices) and liability values (e.g., discounted liabilities change with the r… | fact | tagged | Financial Risk: “A bond portfolio that loses value when rates rise is partly offset by loss reserves whose present v…” |
| Credit risk affects asset values through issuer default or downgrade of bonds held, and affects liabilities through uncollectible reinsuran… | fact | tagged | Credit Risk: “**Loss before default.** A deterioration in credit standing widens a bond's credit spread over the …” |
| With independent (zero correlation) risk factors, total risk is the square root of the sum of the squared individual risk amounts. | formula | elsewhere | Risk Diversification: “$$C = \sqrt{C_1^2 + C_2^2 + 2\rho\, C_1 C_2}$$” |
| With perfectly correlated (100% correlation) risk factors, total risk is the simple sum of the individual risk amounts. | formula | elsewhere | Risk Diversification: “A simple sum assumes every correlation is one, which gives no benefit and an upper bound.” |
| For non-negative correlations, total risk lies between the zero-correlation value (minimum) and the perfect-correlation value (maximum); ri… | fact | elsewhere | Risk Diversification: “When risks are aggregated, the capital needed for the [[Portfolio\\|portfolio]] is less than the sum…” |

</details>

<details><summary><code>cas7-2014-q19</code> · answerable</summary>

Tagged pages: Risk Management, Concentration Risk, Bonds, Credit Risk

| Item | Kind | Status | Where |
|---|---|---|---|
| Credit quality is the probability that an issuer will meet all its contractual obligations, commonly measured by the rating agency rating a… | definition | linked | Credit Risk Margin: “**Bond credit risk** is factor-based by rating and term. Government of Canada bonds attract essenti…” |
| The longer the term to maturity of an investment, the longer even a high-quality issuer has to deteriorate, so longer maturity increases cr… | fact | linked | Reinsurance Credit Risk: “Recoverables on long-tailed and excess covers (an excess workers compensation treaty, say) may be c…” |
| Credit events tend to affect entities within the same industry sector similarly, so concentration in one industry raises credit risk while … | fact | tagged | Credit Risk: “Defaults cluster, so the loss distribution of a credit portfolio is skewed with a heavy tail whose …” |
| Credit risk shows contagion and regional clustering, with depressed regions producing higher default experience, so concentrating investmen… | fact | tagged | Concentration Risk: “- **Geographic** — property exposure concentrated where a single [[Earthquake Exposure Risk Margin\…” |
| Size of expected loss is the magnitude of loss from a credit event, ranging from loss of return to loss of principal, including losses from… | definition | tagged | Credit Risk: “A deterioration in credit standing widens a bond's credit spread over the risk-free curve and lower…” |

</details>

<details><summary><code>cas7-2014-q20</code> · gap</summary>

Tagged pages: Correlation

| Item | Kind | Status | Where |
|---|---|---|---|
| Lines of insurance that are normally uncorrelated (different perils, policyholders, industries, geography) can become correlated when a sin… | fact | missing |  |
| Correlation between risks often increases in the tails of the loss distributions, so a single constant correlation coefficient understates … | fact | missing |  |
| A copula is a function that joins marginal distributions of individual risks into a joint distribution, specifying the dependency structure… | definition | missing |  |
| The choice of copula determines how dependence varies across the distribution; some copulas (e.g., Heavy Right Tail copula) give strong cor… | fact | missing |  |

</details>

<details><summary><code>cas7-2014-q21</code> · gap</summary>

Tagged pages: Correlation, Correlation Coefficient, Scatter Plot

| Item | Kind | Status | Where |
|---|---|---|---|
| The Pearson product-moment correlation coefficient is the sum of products of deviations from the means divided by the square root of the pr… | formula | tagged | Correlation: “$$r = \frac{\sum_{i=1}^n (x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum_{i=1}^n (x_i - \bar{x})^2}\,\sq…” |
| Kendall's tau equals 1 - 4Q/(N(N-1)), where Q is the number of swaps (discordant pairs) needed to put one variable's ranks in the same orde… | formula | missing |  |
| To compute Kendall's tau, rank the observations of each variable, order the pairs by the rank of one variable, then count concordant and di… | procedure | missing |  |
| Pearson correlation has weaknesses: it summarizes dependence in a single number (hiding tail vs. middle dependence), is heavily influenced … | fact | tagged | Correlation: “Zero correlation does **not** in general imply [[Independent Random Variables\\|independence]]: with…” |
| Kendall's tau is a rank-based (ordinal) measure that is invariant under monotone transformations and less influenced by outliers than Pears… | fact | missing |  |
| A scatterplot can reveal how dependency varies across the distribution (e.g., in the tails), unlike single-number measures, but its interpr… | fact | missing |  |

</details>

<details><summary><code>cas7-2014-q22</code> · untagged</summary>

Tagged pages: Risk Management, Normal Distribution, Risk-Adjusted Performance, Risk Capital

| Item | Kind | Status | Where |
|---|---|---|---|
| The coefficient of variation is the standard deviation divided by the mean, so the standard deviation equals CV times the expected value. | definition | elsewhere | Coefficient of Variation: “The **Coefficient of Variation** $CV$ is the ratio of the standard deviation to the mean, measuring…” |
| For normally distributed income, the VaR-based risk capital at percentile p equals the standard deviation times the standard normal quantil… | formula | tagged | Normal Distribution: “$$x = \mu + z_p\,\sigma$$” |
| Return on risk-adjusted capital (RORAC) is expected profit divided by the risk capital allocated; the line with the higher ratio performs b… | definition | tagged | Risk-Adjusted Performance: “$$\text{RAROC}_i = \frac{\text{NOI}_i}{C_i}$$” |
| For independent lines, the portfolio standard deviation is the square root of the sum of the squared line standard deviations, so portfolio… | fact | elsewhere | Variance and Standard Deviation: “For a sum, $\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y) + 2\,\text{Cov}(X,Y)$; the [[Covarian…” |
| Proportional capital allocation assigns total portfolio risk capital to each line in proportion to its stand-alone risk capital divided by … | procedure | tagged | Risk Capital: “**Proportional** to standalone capital, or to a regulatory [[Risk-Based Capital]] formula — simple,…” |
| Incremental marginal (last-in) allocation computes each line's marginal capital as portfolio capital minus the portfolio capital without th… | procedure | tagged | Risk Capital: “**Merton–Perold marginal** — $C_i = C(\text{all}) - C(\text{all but } i)$. Correct for adding or dr…” |
| The incremental marginal approach charges each unit with the additional capital it requires, preserving the financial principle of comparin… | fact | tagged | Risk Capital: “and marginal methods that recognise diversification are the ones that support good decisions.” |

</details>

<details><summary><code>cas7-2014-q23</code> · gap</summary>

Tagged pages: Risk Management, Insurance Market Imperfections, Capital Structure

| Item | Kind | Status | Where |
|---|---|---|---|
| Agency conflict between shareholders and debtholders: shareholders (who control the firm's assets) prefer higher risk and return on investm… | definition | tagged | Insurance Market Imperfections: “Shareholders, protected by limited liability, gain from taking more asset or underwriting risk once…” |
| Debtholders anticipate shareholder risk-taking and demand higher yields and stricter bond covenants, so a firm benefits from reducing risk … | fact | missing |  |
| The underinvestment problem: when a firm is in financial distress, shareholders may forgo safer or positive-value projects whose benefits g… | definition | missing |  |
| For an insurer, policyholders are the largest debtholders because unearned premium and loss and LAE reserves dominate its balance sheet, so… | fact | tagged | Capital Structure: “For an [[Insurer\\|insurer]] the largest claimholders are its own [[Policyholder\\|policyholders]] — …” |
| Policyholders cannot diversify their exposure to an insurer's default as bondholders can across many issuers, so they are especially risk a… | fact | tagged | Insurance Market Imperfections: “Policyholders — customers who, unlike investors, find it costly to diversify their insurer's defaul…” |
| Because insurers risk losing customers and their source of financing when distressed (and cutting rates would worsen distress), they tend t… | fact | tagged | Insurance Market Imperfections: “a failing insurer leaves its customers cancelling policies, pursuing claims and finding new cover” |

</details>

<details><summary><code>cas7-2014-q24</code> · gap</summary>

Tagged pages: Reinsurance, Underwriting Profit

| Item | Kind | Status | Where |
|---|---|---|---|
| Underwriting profit equals earned premium minus expected losses minus expenses (excluding investment income). | formula | tagged | Underwriting Profit: “**Underwriting Profit** is income from the insurance operation alone — earned premium less incurred…” |
| With reinsurance, underwriting profit is computed using premium net of ceded reinsurance premium, losses net of expected reinsurance recove… | procedure | tagged | Reinsurance: “includes the **net cost of reinsurance** (the cost of the reinsurance minus the expected recoveries…” |
| Investment income equals the investment rate of return times investable assets, where investable assets equal beginning surplus plus premiu… | formula | elsewhere | Investment Income: “$$I_t = i_t \left(A_{t-1} + \tfrac{1}{2}\left(P_t - C_t\right)\right)$$” |
| Earnings (net income) for firm valuation equal underwriting profit plus investment income. | definition | tagged | Underwriting Profit: “Total profit is underwriting profit plus investment income” |
| The risk-adjusted discount factor is D = (1 − d)/(1 + r), where d is the probability of financial distress and r is the risk-free rate; the… | formula | missing |  |
| Firm value is the risk-adjusted present value of a perpetuity of earnings with no growth: V = E × D/(1−D) = E(1−d)/(r+d) = E/k. | formula | missing |  |
| Reinsurance can raise firm value by lowering the probability of financial distress, which raises the risk-adjusted discount factor and the … | fact | missing |  |

</details>

<details><summary><code>cas7-2014-q25</code> · gap</summary>

Tagged pages: Risk Management, Operational Risk, Business Risk

| Item | Kind | Status | Where |
|---|---|---|---|
| A bridging model projects loss ratios for recent, immature years by starting from mature older-year loss ratios and adjusting them for loss… | definition | missing |  |
| A bridging model creates autocorrelation between loss ratios of different years, so errors or deterioration in older-year loss ratios carry… | fact | missing |  |
| A firm's franchise value comes mainly from intellectual property (talent, systems, databases, reputation, market relationships), so effecti… | fact | missing |  |
| Underwriter incentives should be flexible and aligned with portfolio goals, so underwriters are not penalized for reducing or ceasing new b… | fact | missing |  |
| Owner and management education about the underwriting cycle helps them understand that deteriorating ratios (e.g., expense ratio) in a soft… | fact | missing |  |

</details>

<details><summary><code>cas7-2014-q26</code> · gap</summary>

Tagged pages: Risk Management, Economic Capital, Rating Agency, Risk Capital

| Item | Kind | Status | Where |
|---|---|---|---|
| Economic capital level is the amount of capital needed to keep the probability of ruin (insolvency) below a chosen threshold. | definition | tagged | Economic Capital: “**Economic capital** (EC) is the capital an insurer itself estimates it needs to stay solvent, at a…” |
| Rating agency capital is the amount of capital needed to achieve or maintain a target rating (keep the risk of a downgrade below a threshol… | definition | tagged | Rating Agency: “Agencies apply their own capital models — Best's BCAR, S&P's capital model — which can differ subst…” |
| A firm may calibrate to economic capital rather than rating agency capital because it sets its own insolvency threshold and risk coverage, … | fact | tagged | Economic Capital: “An EC model fixes a risk measure, a confidence level, a horizon and a valuation basis.” |
| Economic impairment earnings level is the amount of loss (not capital) that would put the firm into a state of economic impairment at a giv… | definition | missing |  |
| Protection of franchise value level is the amount of capital required to keep the firm's franchise value (market value minus book value) ab… | definition | missing |  |
| A firm may calibrate to economic impairment rather than franchise value protection because impairment has more severe consequences, affecti… | fact | missing |  |

</details>

<details><summary><code>cas7-2014-q27</code> · gap</summary>

Tagged pages: Risk Management, Solvency II, Probability Density Function (PDF), Risk Modeling

| Item | Kind | Status | Where |
|---|---|---|---|
| Fitting a probability density function to a few known points of a capital distribution is easy and smooths the distribution, allowing inter… | fact | missing |  |
| A fitted probability density function may poorly represent the full range of real-world outcomes, may under-fit the tail (the most importan… | fact | missing |  |
| Instead of fitting a pdf, use the sampled (simulated) capital values from each individual risk's capital distribution directly to represent… | procedure | missing |  |
| A bootstrap procedure resamples observed losses to build an empirical distribution, so one need not choose a known parametric pdf for the l… | procedure | elsewhere | Bootstrap: “The **bootstrap** estimates the sampling variability of a statistic by resampling the observed data…” |
| A stochastic model that lets risks vary stochastically can capture non-linear effects between risks and in the impact of risks on required … | fact | elsewhere | Economic Capital: “Factor approaches are cheaper but blunt, while stochastic models capture options and guarantees and…” |
| A probability density function is the derivative of the cumulative distribution function, distinct from the distribution (cumulative) funct… | definition | elsewhere | Cumulative Distribution Function (CDF): “For a continuous random variable, $F(x) = \int_{-\infty}^{x} f(t)\, dt$” |

</details>

<details><summary><code>cas7-2015-q18</code> · answerable</summary>

Tagged pages: Correlation, Mixed Poisson Process, Insurance Risk, Insurance Portfolio

| Item | Kind | Status | Where |
|---|---|---|---|
| In the IAA multi-line loss simulation model, the variance of a line's loss ratio has a process-risk component that shrinks as expected clai… | fact | tagged | Insurance Risk: “The first term is **process risk** — randomness given the parameters, which pooling diversifies awa…” |
| Because the minimum loss-ratio variance (1+b)c+b is positive, increasing the size of a line cannot diversify away all risk; parameter and s… | fact | tagged | Insurance Risk: “The second is **[[Parameter Risk\\|parameter risk]]** — the chance the parameters are wrong — which …” |
| In the IAA model, the gamma mixing parameter c_i (the variance of the frequency multiplier chi_i) captures correlation among claims within … | definition | tagged | Mixed Poisson Process: “Increments are **not independent**: observing many claims early raises the posterior for $\Lambda$ …” |
| In the IAA model, the parameter b_i (the variance of the percentile-driven multiplier beta_i, common across lines via the shared p) capture… | definition | tagged | Insurance Risk: “*systematic* (drivers that hit all policies together)” |

</details>

<details><summary><code>cas7-2015-q19</code> · answerable</summary>

Tagged pages: Reinsurance, Correlation, Reinsurance Credit Risk

| Item | Kind | Status | Where |
|---|---|---|---|
| A primary insurer's underwriting exposure is correlated with that of a reinsurer writing the same line and peril, so a catastrophe that hit… | fact | tagged | Reinsurance Credit Risk: “The catastrophes and market conditions that create large recoverables also weaken reinsurers — many…” |
| A reinsurer diversified across lines and geographies is less vulnerable to a single catastrophe, so its reinsurance recoverables carry less… | fact | tagged | Reinsurance Credit Risk: “The catastrophes and market conditions that create large recoverables also weaken reinsurers — many…” |
| In an enterprise risk capital model, the correlation between the cedent's and the reinsurer's exposures is most important in the extreme ri… | fact | linked | Credit Risk: “Defaults cluster, so the loss distribution of a credit portfolio is skewed with a heavy tail whose …” |
| Reinsurance credit (counterparty) risk is a component of the capital model's required capital, and the capital held for it rises with conce… | fact | linked | Credit Risk: “Regulators charge capital for it — the U.S. [[Risk-Based Capital]] formula (R1 for fixed income, wh…” |
| Spreading ceded coverage across multiple reinsurers reduces exposure to any one reinsurer's failure and can lower the credit risk capital, … | fact | tagged | Reinsurance Credit Risk: “**Concentration.** Recoverables can be concentrated with one reinsurer ([[Concentration Risk]]), wh…” |

</details>

<details><summary><code>cas7-2015-q20</code> · untagged</summary>

Tagged pages: Reinsurance, Reinsurance Credit Risk, Risk Measure

| Item | Kind | Status | Where |
|---|---|---|---|
| TVaR at level alpha equals VaR_alpha plus (E[X] minus the limited expected value of X at VaR_alpha) divided by (1 minus alpha). | formula | tagged | Risk Measure: “for any distribution $\text{TVaR}_p = \text{VaR}_p + E[(X - \text{VaR}_p)^+]/(1-p)$” |
| Net capital requirement with reinsurance equals gross TVaR minus (1 minus credit risk charge) times the TVaR of ceded losses, so the recove… | formula | linked | Credit Risk Margin: “so the net capital benefit of reinsurance is the reduction in the [[Insurance Risk Margin\\|insuranc…” |
| For an excess-of-loss layer that attaches at or below the VaR level and has a limit large enough, ceded losses exceed zero only in the tail… | fact | tagged | Risk Measure: “for any distribution $\text{TVaR}_p = \text{VaR}_p + E[(X - \text{VaR}_p)^+]/(1-p)$” |
| Under a quota share with ceding percentage p, ceded losses are p times gross losses, so ceded TVaR equals p times gross TVaR (TVaR scales l… | fact | tagged | Reinsurance: “Ceded losses are a scalar multiple of gross, so the ceded triangle has the same shape as the gross …” |
| Net, ceded and gross losses satisfy Gross = Net + Ceded, and TVaR of net and ceded are additive when the net and ceded are comonotonic (e.g… | fact | tagged | Reinsurance: “$$\text{Net} = \text{Gross} - \text{Ceded}$$” |
| Challenges in assessing reinsurance's impact on risk profile include contract complexity and the non-linear relationship between excess-of-… | fact | elsewhere | Risk Transfer: “Risk transfer is assessed on the **contract as a whole**, including side letters and undocumented u…” |
| An insurer can reduce reinsurance recoverable credit risk by diversifying across many reinsurers (reducing concentration) and by choosing r… | fact | tagged | Reinsurance Credit Risk: “Select counterparties by [[Rating Agency\\|rating]] and financial strength (an approved list); set l…” |

</details>

<details><summary><code>cas7-2015-q21</code> · gap</summary>

Tagged pages: Correlation

| Item | Kind | Status | Where |
|---|---|---|---|
| A copula is a function that joins marginal distributions into a joint distribution, capturing the dependence structure separately from the … | definition | missing |  |
| A copula can join marginal distributions of any family, and can represent dependence without revealing the underlying marginal distribution… | fact | missing |  |
| Copulas allow correlation to vary across the distribution, e.g. stronger dependence in the tails than in the body, so tail dependence can b… | fact | missing |  |
| The normal copula has light tails with little tail dependence, so it understates the joint extreme-loss correlation seen in insurance losse… | fact | missing |  |
| Copulas with heavy right-tail dependence, such as the Gumbel copula or the Heavy Right Tail (HRT) copula, better reflect increased correlat… | fact | missing |  |
| Frank's copula does not have a heavier tail than the normal copula, so it is not a suitable choice for heavy tail dependence. | fact | missing |  |

</details>

<details><summary><code>cas7-2015-q22</code> · untagged</summary>

Tagged pages: Model Risk, Risk Modeling

| Item | Kind | Status | Where |
|---|---|---|---|
| Model (specification) risk is the risk that the chosen model or distribution cannot accurately capture the complexity of the insurance loss… | definition | tagged | Model Risk: “**Model error** — the model is a wrong representation: an omitted variable, an inappropriate distri…” |
| Parameter (estimation) risk is the risk that historical data are insufficient or not credible enough to estimate the model's parameters acc… | definition | linked | Parameter Risk: “**Parameter risk** is the uncertainty in a reserve that comes from not knowing the model's paramete…” |
| Structural (projection) risk is the risk that parameters or trends in the projection period differ from those in the historical period, for… | definition | elsewhere | Risk Experience: “Mahler showed that risk parameters shift over time, so older years predict less.” |
| Insurance losses are typically skewed with heavy tails, so a symmetric normal distribution fits poorly and an asymmetric heavier-tailed dis… | fact | linked | Model Selection: “Counts, positive skewed amounts, binary outcomes, or a variance that grows with the mean call for a…” |
| Parameter risk can be reduced by using a longer history of internal data or supplementing it with industry or external data to increase cre… | fact | linked | Parameter Risk: “In Marshall et al.'s framework, the random component of parameter risk is *independent risk*, which…” |
| Reduce structural risk by adjusting historical data or parameter estimates to reflect known changes, such as a court ruling that alters cov… | procedure | linked | Standards of Practice: “The decision provides evidence of conditions that existed at the valuation date, so the liability m…” |

</details>

<details><summary><code>cas7-2015-q23</code> · gap</summary>

Tagged pages: Correlation, Correlation Coefficient

| Item | Kind | Status | Where |
|---|---|---|---|
| Pearson's product-moment correlation is the sum of products of deviations from the means divided by the square root of the product of the s… | formula | tagged | Correlation: “$$r = \frac{\sum_{i=1}^n (x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum_{i=1}^n (x_i - \bar{x})^2}\,\sq…” |
| To compute Spearman's rank correlation, rank each variable's observations separately (smallest = 1), then take the differences between pair… | procedure | elsewhere | Development Factor Correlation Test: “$r_{ik}$ ranks the $I-k$ factors $C_{i,k+1}/C_{ik}$ of column $k$.” |
| Spearman's rho = 1 - S / [n(n^2-1)/6], where S is the sum of squared differences between paired ranks and n is the number of observations. | formula | elsewhere | Development Factor Correlation Test: “$$T_k = 1 - \frac{6\sum_{i=1}^{I-k}(r_{ik} - s_{ik})^2}{(I-k)^3 - (I-k)}$$” |
| Pearson's correlation is a cardinal measure that depends on the actual values (deviations from the mean, squared), so it is sensitive to ou… | fact | missing |  |
| A pair of extreme values that are both the largest in their series (an outlier pair) can inflate Pearson's correlation well above Spearman'… | fact | missing |  |

</details>

<details><summary><code>cas7-2015-q24</code> · gap</summary>

Tagged pages: Risk Management, Risk Measure

| Item | Kind | Status | Where |
|---|---|---|---|
| Value at Risk (VaR) at level α is the α percentile of the loss distribution, i.e., the loss value that is not exceeded with probability α. | definition | tagged | Risk Measure: “**Value at Risk** is the lower $p$-quantile of the loss ([[Percentile]]).” |
| VaR is a single point on the loss distribution: it ignores the size of losses beyond the percentile (tail risk) and is not sub-additive, so… | fact | tagged | Risk Measure: “VaR is well understood, but it is blind to how bad losses beyond the quantile are.” |
| Tail Value at Risk (TVaR) at level α is the expected value of losses given that losses exceed the α percentile (VaR), E[X \| X > VaR_α]. | definition | tagged | Risk Measure: “**Tail Value at Risk** averages the worst $1-p$ of outcomes; for any distribution $\text{TVaR}_p = …” |
| TVaR weights tail losses linearly, so it does not reflect risk aversion (a risk twice as large being more than twice as bad), and it ignore… | fact | missing |  |
| Risk-adjusted TVaR (RTVaR) equals TVaR plus a constant c times the standard deviation of losses in the tail: RTVaR = TVaR + c·SD(X \| X > α… | formula | missing |  |
| RTVaR is based only on tail losses and so does not evaluate the whole distribution; and because its standard deviation load is a quadratic … | fact | missing |  |

</details>

<details><summary><code>cas7-2015-q25</code> · answerable</summary>

Tagged pages: Risk Management, Reinsurance, Insurance Risk, Financial Risk, Risk Mitigation

| Item | Kind | Status | Where |
|---|---|---|---|
| Insurance underwriting risk is the risk that premiums charged are inadequate to cover the exposure written (e.g., from pricing, product des… | definition | tagged | Insurance Risk: “For a P&C insurer it has three parts: **underwriting (premium) risk** on business written or to be …” |
| Liquidity risk is the risk of having insufficient liquid assets (assets convertible to cash at full value) to meet sudden cash demands or o… | definition | tagged | Financial Risk: “*liquidity risk* — being forced to sell assets at a loss to pay claims.” |
| Underwriting risk and liquidity risk comove when a single event (e.g., a catastrophe, economic downturn, or emergence of a latent claim sou… | fact | tagged | Financial Risk: “The two interact: a catastrophe can force asset sales into a falling market, and inflation raises c…” |
| Catastrophe reinsurance reduces underwriting risk by transferring part of catastrophic losses to the reinsurer, and reduces liquidity risk … | fact | tagged | Reinsurance: “**Per-occurrence / catastrophe XOL** — responds to the accumulation from one event, which is how [[…” |
| A catastrophe bond reduces underwriting risk by using investor principal to cover a large catastrophe loss, and reduces liquidity risk by p… | fact | tagged | Insurance Risk: “That is why catastrophe risk is managed through exposure limits, reinsurance and [[CAT Bonds\\|cat b…” |

</details>

<details><summary><code>cas7-2015-q26</code> · answerable</summary>

Tagged pages: Reinsurance, Cost of Capital, Risk Mitigation

| Item | Kind | Status | Where |
|---|---|---|---|
| In an efficient frontier analysis, plot each alternative's expected underwriting profit (return) against a risk measure (e.g., probability … | procedure | tagged | Risk Mitigation: “Brehm puts reinsurance programmes on an **efficient frontier** of expected return against risk: a p…” |
| An option is superior on the efficient frontier if it gives higher expected profit for the same risk or lower risk for the same profit; if … | fact | tagged | Risk Mitigation: “Brehm puts reinsurance programmes on an **efficient frontier** of expected return against risk: a p…” |
| Probability of distress is the probability that the insurer's underwriting results fall below a distress threshold; VaR at a given return p… | definition | linked | Risk Measure: “**Value at Risk** is the lower $p$-quantile of the loss ([[Percentile]]). … **Tail Value at Risk** …” |
| Under the cost of allocated risk capital method, compute the cost of capital as the cost-of-capital rate times required risk capital (here … | procedure | tagged | Cost of Capital: “$$\text{Capital charge}_i = k \times C_i$$” |
| Compare reinsurance options by accounting for both the cost of reinsurance (expected profit given up) and the cost of capital saved: the pr… | procedure | tagged | Cost of Capital: “The hurdle $k$ is compared with the unit's [[Return on Capital]] (RAROC), or subtracted from its in…” |

</details>

<details><summary><code>cas7-2015-q27</code> · gap</summary>

Tagged pages: Reinsurance, Insurance Market Imperfections

| Item | Kind | Status | Where |
|---|---|---|---|
| Financial distress devalues an insurer's product (its promise to pay claims), so customers demand discounts or buy elsewhere, causing lower… | fact | tagged | Insurance Market Imperfections: “pay less for, or buy less from, a weaker insurer: higher-[[Rating Agency\\|rated]] insurers get high…” |
| An insurer in financial distress raises capital less efficiently: new shares are issued at a discount, borrowing carries higher interest ra… | fact | tagged | Insurance Market Imperfections: “so new equity raised after a large loss is sold at a discount, if at all.” |
| Market capital reactions to an insurer entering distress tend to be a multiple of the actual drop in book value that caused the distress. | fact | missing |  |
| Agency problems arise in distress because management acting for shareholders may gain from taking more risk, while policyholders, as primar… | fact | tagged | Insurance Market Imperfections: “Shareholders, protected by limited liability, gain from taking more asset or underwriting risk once…” |
| Mutual insurers have limited access to capital markets, so they have fewer ways to raise funds when in distress and therefore buy more rein… | fact | elsewhere | Types of Insurers: “It has no shares to sell, so it builds surplus mainly from retained earnings.” |
| In a mutual insurer the policyholders are the owners and are more risk-averse than shareholders of public companies, which leads mutuals to… | fact | missing |  |

</details>

<details><summary><code>cas7-2015-q28</code> · gap</summary>

Tagged pages: Risk Management, Operational Risk, Business Risk

| Item | Kind | Status | Where |
|---|---|---|---|
| Operational risk is the risk of loss from failed or inadequate internal systems, processes, or people, or from external events; it includes… | definition | tagged | Operational Risk: “**Operational Risk** is the risk of loss resulting from inadequate or failed internal processes, pe…” |
| Strategic risk is the risk of loss from making poor strategic decisions, i.e., choosing the wrong strategy or having a bad plan, regardless… | definition | tagged | Business Risk: “Narrowly, it is the *strategic* category: competition, shifts in demand, the underwriting cycle, re…” |
| Operational risk concerns failure in executing the chosen strategy and operations, whereas strategic risk concerns selecting the wrong stra… | fact | tagged | Operational Risk: “**Operational Risk** is the risk of loss resulting from inadequate or failed internal processes, pe…” |
| Industry risk is a type of strategic risk, including capital intensiveness, overcapacity, commoditization, deregulation, and cycle volatili… | fact | missing |  |
| Competitor risk is a type of strategic risk, including global rivals, gainers, and unique competitors, which for insurers includes aggressi… | fact | tagged | Business Risk: “For a P&C insurer the underwriting cycle is the classic case — rates soften under competition until…” |

</details>

<details><summary><code>cas7-2015-q29</code> · untagged</summary>

Tagged pages: Risk Management, Concentration Risk, Risk Mitigation

| Item | Kind | Status | Where |
|---|---|---|---|
| Currency (foreign exchange) risk is the risk that changes in exchange rates reduce the value of assets or liabilities denominated in foreig… | definition | elsewhere | ALM Risk: “Assets in one currency backing liabilities in another expose the surplus to exchange rates unless h…” |
| Concentration risk is the risk from having business or assets concentrated in a single line of business, geographic area, or industry, so t… | definition | tagged | Concentration Risk: “**Concentration Risk** is the risk that exposures which appear separate turn out to be a single exp…” |
| Catastrophe (event) risk is the risk of large losses from a single event, such as a hurricane, affecting many policies at once; it is highe… | definition | linked | Risk Taxonomies: “*catastrophe* risk from events that strike many policies together.” |
| Liquidity risk is the risk that an insurer cannot meet cash obligations as they come due, for example from large claim payments after a cat… | definition | elsewhere | ALM Risk: “Funding liquidity risk is the risk of not having cash to meet obligations when they fall due, and m…” |
| Quota share reinsurance cedes a fixed percentage of every risk and so does not significantly reduce the severity of extreme event losses re… | fact | linked | Reinsurance: “Provides capacity and surplus relief, and protects against frequency and severity alike — but only …” |
| An insurer can reduce its risk profile by diversifying geographically or by line of business, buying excess of loss or catastrophe reinsura… | fact | tagged | Risk Mitigation: “*Reduce* — underwriting standards, loss control, exposure and aggregate limits, diversification, an…” |

</details>

<details><summary><code>cas7-2016-q21</code> · answerable</summary>

Tagged pages: Risk Management, Enterprise Risk Management, Risk Modeling

| Item | Kind | Status | Where |
|---|---|---|---|
| An ERM process should be dynamic and monitored on a regular, ongoing basis so the company can respond to changing conditions, ensure proces… | fact | tagged | Enterprise Risk Management: “ERM is a continuing cycle, not a project.” |
| ERM must cover all major risk categories (hazard/insurance, financial, operational, strategic), and operational and strategic risks should … | fact | tagged | Risk Management: “which treats every source of risk, with its upside as well as its downside, as one portfolio.” |
| ERM should focus on risks that are material to the company, so excluding a small, short-tailed, run-off line that is immaterial is appropri… | fact | tagged | Enterprise Risk Management: “is the process of systematically and comprehensively identifying an organisation's critical risks, …” |
| ERM should consider both downside and upside risk, since favorable outcomes present opportunities that management can exploit to maximize f… | fact | tagged | Risk Management: “Many now also keep or pursue risks they have a special ability to manage, so risk management can cr…” |
| An ERM model must be enterprise-wide and quantify dependencies and correlations among business lines and risks (especially in the tail and … | fact | tagged | Risk Management: “Managing risks in separate silos can therefore be inefficient or even counterproductive.” |

</details>

<details><summary><code>cas7-2016-q22</code> · gap</summary>

Tagged pages: Risk Management, Business Risk, Financial Risk

| Item | Kind | Status | Where |
|---|---|---|---|
| In the underwriting cycle, soft markets bring low prices and underwriting losses or lower underwriting profit, while hard markets bring hig… | fact | elsewhere | Underwriting Cycle: “combined ratios rise as the business written at inadequate prices is earned and its losses develop.” |
| To smooth earnings across the underwriting cycle, shift the asset mix toward higher-yielding, riskier assets (equities, high-yield bonds) i… | procedure | missing |  |
| Tax-exempt bonds have lower pre-tax yields than taxable bonds but reduce tax on investment income, making them more valuable when the insur… | fact | missing |  |
| Shifting assets into higher-return investments such as equities or longer-duration bonds increases asset (investment) risk, including marke… | fact | linked | Interest Rate Risk: “Rising rates cut bond values ([[Price Risk]]); falling rates cut the yield on reinvested cash flows…” |

</details>

<details><summary><code>cas7-2016-q23</code> · gap</summary>

Tagged pages: Risk Management, Risk Capital

| Item | Kind | Status | Where |
|---|---|---|---|
| Default avoidance as a capital reference point requires a capital level deep in the tail of the loss distribution, where the ERM model is l… | fact | missing |  |
| Default avoidance mainly protects policyholders, whereas shareholders and other stakeholders can be harmed by large partial losses of capit… | fact | missing |  |
| Other meaningful reference points for setting capital include having enough capital to continue servicing the renewal book, to withstand an… | definition | linked | Financial Risk Management: “Choose a [[Risk Measure]] and tolerance (TVaR at a chosen level, an expected policyholder deficit r…” |
| TV@R at level p (Tail Value at Risk) is the expected loss given that the loss exceeds the p-th percentile (VaR), and it can be read as the … | definition | linked | Risk Measure: “- **Tail Value at Risk** averages the worst $1-p$ of outcomes; for any distribution $\text{TVaR}_p …” |
| To build a minimum capital requirement from a reference point, choose a maximum tolerable fraction of capital lost in a 1-in-y-year event, … | procedure | missing |  |

</details>

<details><summary><code>cas7-2016-q24</code> · gap</summary>

Tagged pages: Risk Management, Risk Measure

| Item | Kind | Status | Where |
|---|---|---|---|
| Standard deviation as a risk measure treats favorable deviations below the mean the same as unfavorable deviations above it, and penalizes … | fact | tagged | Risk Measure: “[[Variance]] and [[Standard Deviation\\|standard deviation]] average the deviations from the mean, t…” |
| TVaR (Tail Value at Risk) at a given probability level is the average loss over all outcomes above the VaR at that level. | definition | tagged | Risk Measure: “**Tail Value at Risk** averages the worst $1-p$ of outcomes; for any distribution $\text{TVaR}_p = …” |
| TVaR weights all tail losses linearly, so it does not treat a loss twice as large as more than twice as bad, which is inconsistent with ris… | fact | missing |  |
| TVaR with transformed probabilities (weighted TVaR) applies a probability transform that places more weight on extreme unfavorable outcomes… | definition | tagged | Risk Measure: “**Distortion (spectral) risk measures** weight each layer of loss by $g(S(x))$, where $S = 1 - F$ a…” |
| Weighted (transformed-probability) TVaR is suitable for portfolios with heavy-tailed, skewed losses (e.g., catastrophe property, excess cas… | fact | missing |  |
| Other suitable risk measures for capital allocation include expected policyholder deficit (EPD) on transformed probabilities, the value of … | fact | missing |  |

</details>

<details><summary><code>cas7-2016-q25</code> · gap</summary>

Tagged pages: Correlation

| Item | Kind | Status | Where |
|---|---|---|---|
| The right-tail concentration function R(z) is the probability that both variables exceed their z-th quantiles, given that one exceeds its z… | definition | missing |  |
| If R(z) stays above zero as z approaches 1, the copula has right-tail (upper) dependence, meaning extreme large outcomes in the variables t… | fact | syllabus | Model Selection (collapsed): “The Gumbel copula has upper-tail dependence: extreme losses in the two lines tend to occur together” |
| A catastrophe such as an earthquake can produce large losses simultaneously in otherwise weakly related lines of business, so a copula with… | fact | syllabus | Model Selection (collapsed): “Evidence on whether the two lines' extreme losses coincide — such as both lines being hit by the sa…” |
| A right-tail concentration graph can be misleading because a copula may have significant tail dependence even when R(1) = 0 (R may decline … | fact | missing |  |
| To address the limitations of the right-tail concentration graph, examine R(z) at values somewhat below 1, combine it with the left-tail co… | procedure | missing |  |

</details>

<details><summary><code>cas7-2016-q26</code> · gap</summary>

Tagged pages: Risk Management, Operational Risk, Insurance Risk

| Item | Kind | Status | Where |
|---|---|---|---|
| A plan (planned) loss ratio is often used as the expected loss ratio (ELR) in reserving methods such as Bornhuetter-Ferguson and Expected L… | fact | missing |  |
| An optimistic plan loss ratio can lead to financial consequences such as reserve deficiency, underpricing, premium growth in unprofitable l… | fact | tagged | Insurance Risk: “PACICC has identified inadequate pricing and deficient reserves as the leading causes of insolvency…” |
| Underwriting risk is the risk of random volatility and inaccuracy in insurance loss outcomes and loss ratio forecasts, including pricing an… | definition | tagged | Insurance Risk: “For a P&C insurer it has three parts: **underwriting (premium) risk** on business written or to be …” |
| Operational risk is the risk of loss from inadequate or failed internal processes, people, and systems, such as poor review processes, misu… | definition | tagged | Operational Risk: “**Operational Risk** is the risk of loss resulting from inadequate or failed internal processes, pe…” |
| Underwriting risk and operational risk overlap in hindsight because a deteriorated loss ratio may reflect either unforeseeable random volat… | fact | tagged | Operational Risk: “a loss is operational because of why it happened, not because of the account it lands in.” |

</details>

<details><summary><code>cas7-2016-q27</code> · gap</summary>

Tagged pages: Risk Management, Business Risk

| Item | Kind | Status | Where |
|---|---|---|---|
| Agency theory studies the relationship between principals (owners) and agents (management) and aims to align management's interests with ow… | definition | syllabus | Insurance Market Imperfections: “Managers may spend surplus capital on low-return growth or acquisitions instead of returning it.” |
| Management incentive plans tied to short-term measures such as top line growth and calendar year combined ratio can encourage managers to p… | fact | missing |  |
| In a soft underwriting market, cutting prices to retain or gain market share on long-tailed business leads to adverse selection and unprofi… | fact | elsewhere | Underwriting Cycle: “Insurers compete for market share by cutting rates, broadening coverage, offering higher limits and…” |
| Effective underwriting cycle management includes maintaining intellectual property (retaining key talent, investing in systems, models and … | fact | missing |  |
| Effective underwriting cycle management includes setting underwriting incentives that support portfolio profitability goals rather than gro… | fact | missing |  |
| Effective underwriting cycle management includes not overreacting to lost business in a soft market, educating owners that shrinking in sof… | fact | elsewhere | Underwriting Cycle: “An insurer that keeps its underwriting discipline in a soft market loses volume to competitors but …” |

</details>

<details><summary><code>cas7-2016-q28</code> · gap</summary>

Tagged pages: Risk Management, Business Risk, Risk Modeling

| Item | Kind | Status | Where |
|---|---|---|---|
| The Delphi method is a soft approach to the underwriting cycle in which experts answer questionnaires, responses are aggregated and fed bac… | definition | missing |  |
| Competitor analysis is a soft approach that combines trade publications, rate filings, agents and financial statements to detect whether ma… | definition | missing |  |
| Scenario testing is a soft approach that uses written descriptions of possible future states of the insurance environment to prepare manage… | definition | missing |  |
| An autoregressive AR(n) model of the industry combined ratio is X_t = a + sum_{j=1..n} b_j X_{t-j} + error term with a random normal distur… | formula | elsewhere | Autoregressive Model: “$$Y_t = c + \phi_1 Y_{t-1} + \cdots + \phi_p Y_{t-p} + \varepsilon_t$$” |
| The general factor model for the underwriting cycle has a latent factor Z_t = a + b Z_{t-1} + sigma*epsilon_t, and the observed combined ra… | formula | missing |  |
| Econometric modeling of the underwriting cycle resembles soft approaches in that it needs a large quantity, variety and complexity of data … | fact | missing |  |
| Econometric modeling of the underwriting cycle resembles technical models in that both use mathematical formalism and statistical rigor and… | fact | missing |  |

</details>

<details><summary><code>cas7-2017-q21</code> · answerable</summary>

Tagged pages: Risk Management, Risk Mitigation

| Item | Kind | Status | Where |
|---|---|---|---|
| The four traditional forms of risk management are avoidance, mitigation (reduction), transfer, and acceptance (retention); diversification … | fact | tagged | Risk Mitigation: “**Risk Mitigation** is the set of actions — the **ERM tools** — that move an organisation's risk pr…” |
| Risk avoidance means eliminating exposure to a risk altogether, such as exiting a market or not writing a type of business. | definition | tagged | Risk Mitigation: “*Avoid* — decline a class, exit a territory, turn down an account outside appetite.” |
| Risk mitigation (reduction) means taking actions to reduce the frequency or severity of losses, such as raising deductibles, lowering polic… | definition | tagged | Risk Mitigation: “*Reduce* — underwriting standards, loss control, exposure and aggregate limits, diversification, an…” |
| Risk transfer means shifting the financial consequences of a risk to another party, such as through reinsurance or catastrophe bonds. | definition | tagged | Risk Mitigation: “*Transfer* — [[Reinsurance]] ([[Quota Share]], [[Excess of Loss]]), [[CAT Bonds\\|cat bonds]] and ot…” |
| Risk acceptance (retention) means knowingly keeping the risk and bearing its losses, typically funded by capital or reserves. | definition | tagged | Risk Mitigation: “*Retain* — keep the risk and hold [[Risk Capital\\|capital]]: right when the risk is the business th…” |
| Diversification manages risk by spreading exposure across imperfectly correlated risks, such as geographically, so that losses from one reg… | definition | linked | Risk Control: “Diversification spreads activity across products, customers or regions whose losses are not perfect…” |

</details>

<details><summary><code>cas7-2017-q22</code> · answerable</summary>

Tagged pages: Model Risk, Risk Management, Risk Modeling, Insurance Risk, Parameter Risk

| Item | Kind | Status | Where |
|---|---|---|---|
| Parameter risk is the uncertainty that the estimated form and parameters of the frequency and severity distributions in a model differ from… | definition | tagged | Insurance Risk: “The second is **[[Parameter Risk\\|parameter risk]]** — the chance the parameters are wrong — which …” |
| Total model uncertainty in ERM comes from process risk and parameter risk; process risk can be diversified with more volume, whereas parame… | fact | tagged | Insurance Risk: “The first term is **process risk** — randomness given the parameters, which pooling diversifies awa…” |
| If an estimated parameter does not reflect the true parameter, projected results can be materially overstated or understated. | fact | tagged | Insurance Risk: “The second is **[[Parameter Risk\\|parameter risk]]** — the chance the parameters are wrong — which …” |
| Estimation risk is the risk that parameters estimated from limited, biased or erroneous data (e.g., a new line with little data) are incorr… | definition | tagged | Insurance Risk: “parameter risk, subdivided into *estimation* (too little data), *projection* (trend and development…” |
| Projection risk is the risk that parameters estimated from past data no longer hold in the future because conditions change over time (e.g.… | definition | tagged | Insurance Risk: “parameter risk, subdivided into *estimation* (too little data), *projection* (trend and development…” |
| Event risk is the risk that a legislative, regulatory or judicial event changes the underlying risk or coverage intent, invalidating the mo… | definition | tagged | Insurance Risk: “parameter risk, subdivided into *estimation* (too little data), *projection* (trend and development…” |
| Systemic risk is parameter error that affects many policies at once (e.g., inflation), so it is non-diversifying; model risk is the risk of… | definition | tagged | Model Risk: “**Model error** — the model is a wrong representation: an omitted variable, an inappropriate distri…” |
| Because diversification reduces other risks as volume grows but not parameter risk, parameter risk makes up a relatively larger share of to… | fact | tagged | Parameter Risk: “**Its random part falls with volume; selection error does not.** In Marshall et al.'s framework, th…” |
| Parameter risk can be reduced by more and better-quality data, sensitivity testing with multiple or weighted models, expert judgment, valid… | procedure | tagged | Model Risk: “**Back-testing is the discipline that catches drift**: compare what the model predicted with what h…” |

</details>

<details><summary><code>cas7-2017-q23</code> · gap</summary>

Tagged pages: Reinsurance, Correlation, Risk Mitigation

| Item | Kind | Status | Where |
|---|---|---|---|
| A cost/benefit diagram plots the benefit of a reinsurance program (on the vertical axis) against its cost (on the horizontal axis) at selec… | definition | missing |  |
| The net cost of a reinsurance program equals ceded premium minus expected recoveries. | formula | tagged | Reinsurance: “(the cost of the reinsurance minus the expected recoveries)” |
| The benefit of a reinsurance program at a given percentile equals the net premium minus net loss under the program minus that under the bar… | formula | missing |  |
| Convert a 1-in-N year return period to a percentile of the distribution (probability 1/N) and read the corresponding values from the cumula… | procedure | linked | Risk Measure: “A [[Probable Maximum Loss\\|PML]] is a VaR: the 1-in-250 PML is $\text{VaR}_{0.996}$.” |
| Choose among reinsurance programs by comparing their cost and tail protection; a program with lower net cost and greater benefit at extreme… | procedure | tagged | Risk Mitigation: “because it cedes only the tail that drives the capital measure” |
| The Frank copula has little or no tail dependence, so it understates correlation among lines in extreme events such as clash and accumulati… | fact | missing |  |
| The Gumbel (heavy right tail) copula has strong right-tail dependence, making it a better choice for correlating lines in large loss events. | fact | missing |  |

</details>

<details><summary><code>cas7-2017-q24</code> · gap</summary>

Tagged pages: Risk Management, Stress Testing, Business Strategy

| Item | Kind | Status | Where |
|---|---|---|---|
| Traditional unilateral planning sets a single version of the plan (one point estimate of premium volume and loss ratio by line) that is use… | definition | missing |  |
| A drawback of a single fixed plan is that underwriters pressured to 'make plan' may write business at inadequate prices when market conditi… | fact | missing |  |
| A drawback of a single fixed plan is organizational inertia: management is reluctant to revise plan loss ratio estimates when actual result… | fact | missing |  |
| Scenario planning steps: define a set of plausible future scenarios (e.g., market conditions, possibly with likelihoods), develop pre-agree… | procedure | missing |  |
| Scenario planning lets management respond quickly to changing conditions because responses were agreed in advance rather than devised on th… | fact | missing |  |
| Scenario planning reduces pressure to make plan at all costs and overcomes organizational inertia, since alternative plans and incentives a… | fact | missing |  |

</details>

<details><summary><code>cas7-2017-q25</code> · gap</summary>

Tagged pages: Risk Management, Business Risk

| Item | Kind | Status | Where |
|---|---|---|---|
| A behavioral (econometric) approach to modeling the underwriting cycle is a middle ground between soft and technical approaches, combining … | definition | missing |  |
| A behavioral model of the underwriting cycle represents insurance supply and demand curves, varies key inputs (capital, shock events, infla… | procedure | missing |  |
| Insurance supply and demand graphs plot price on the vertical axis and quantity of insurance on the horizontal axis, with a downward-slopin… | fact | missing |  |
| An industry-wide capital infusion shifts the supply curve outward (right) because insurers have greater capacity to write more business at … | fact | elsewhere | Underwriting Cycle: “Hard-market profits rebuild surplus, and high returns attract new capital, both from existing insur…” |
| An industry-wide capital infusion shifts the demand curve outward (right) because better-capitalized insurers have a lower default probabil… | fact | syllabus | Insurance Market Imperfections: “pay less for, or buy less from, a weaker insurer: higher-[[Rating Agency\\|rated]] insurers get high…” |
| After a capital infusion shifts both supply and demand outward, equilibrium quantity increases while the equilibrium price may rise or fall… | fact | missing |  |

</details>

<details><summary><code>cas7-2018-q20</code> · answerable</summary>

Tagged pages: Reinsurance, Capital Required, Return on Capital, Risk Mitigation

| Item | Kind | Status | Where |
|---|---|---|---|
| Marginal ROE of a reinsurance option is the net cost of the reinsurance (the change in underwriting profit forgone) divided by the capital … | definition | tagged | Risk Mitigation: “$\Delta C$ is the capital released, $C_{\text{before}} - C_{\text{after}}$, where required capital …” |
| Required capital under a TV@R standard equals the TV@R net loss at the chosen probability level (e.g., 1-in-100), so capital freed is the r… | fact | tagged | Risk Mitigation: “$\Delta C$ is the capital released, $C_{\text{before}} - C_{\text{after}}$, where required capital …” |
| Net premium equals direct premium minus ceded premium. | formula | tagged | Reinsurance: “$$\text{Net} = \text{Gross} - \text{Ceded}$$” |
| Net underwriting profit equals net premium times (1 minus the net combined ratio), where the combined ratio is measured against net premium. | formula | linked | Net of Reinsurance: “$$\text{Net Loss Ratio} = \frac{\text{Gross Losses} - \text{Ceded Losses}}{\text{Gross Premium} - \…” |
| Net cost of reinsurance equals ceded premium minus expected ceded losses (recoveries); ceded loss can be backed out as direct loss minus ne… | procedure | tagged | Risk Mitigation: “$$\text{Net cost} = \text{Premium paid} - E[\text{Recoveries}]$$” |
| Marginal ROE must be computed from incremental changes in profit and capital versus the current position, not as the difference between the… | fact | tagged | Risk Mitigation: “**Assessing effectiveness** means checking the change in the risk measure against the net cost” |

</details>

<details><summary><code>cas7-2018-q21</code> · gap</summary>

Tagged pages: Risk Management, Capital, Risk Capital, Risk Measure

| Item | Kind | Status | Where |
|---|---|---|---|
| The 1-in-N TVaR of a simulated loss distribution is the average of the losses in the worst 1/N fraction of equally likely scenarios (the ta… | definition | tagged | Risk Measure: “**Tail Value at Risk** averages the worst $1-p$ of outcomes; for any distribution $\text{TVaR}_p = …” |
| To compute a 1-in-N TVaR from simulations, determine the number of tail scenarios as (number of simulations)/N, sort losses in descending o… | procedure | linked | Risk Modeling: “$$\widehat{\text{TVaR}}_{\alpha} = \frac{1}{m}\sum_{j=1}^{m} Y_{(n+1-j)}$$” |
| Proportional capital allocation assigns total company capital to each line in proportion to that line's stand-alone risk measure value divi… | definition | tagged | Risk Capital: “**Proportional** to standalone capital, or to a regulatory [[Risk-Based Capital]] formula — simple,…” |
| WTVaR (weighted/Wang-transformed TVaR) is the expected loss under the transformed probability distribution F*, computed by weighting each t… | definition | tagged | Risk Measure: “**Distortion (spectral) risk measures** weight each layer of loss by $g(S(x))$, where $S = 1 - F$ a…” |
| To compute a 1-in-N WTVaR from simulations, take the worst scenarios in descending order, weight each by its transformed probability f*(x) … | procedure | missing |  |

</details>

<details><summary><code>cas7-2018-q22</code> · gap</summary>

Tagged pages: Reinsurance, Capital, Capital Structure, Time Value of Money

| Item | Kind | Status | Where |
|---|---|---|---|
| The annual cost of a surplus note is the principal times the difference between the coupon rate and the bond yield (the coupon paid minus t… | formula | missing |  |
| The annual cost of quota-share reinsurance is the ceded premium (cession percentage times gross earned premium) times the economic margin o… | formula | missing |  |
| To compare multi-year costs of capital strategies, discount each year's cost at the given rate (e.g., the bond yield) and sum the present v… | procedure | linked | Present Value: “For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = …” |
| The return of surplus note principal at maturity is not counted as a cost of the surplus note strategy, since only the net financing cost (… | fact | missing |  |
| The three paradigms for measuring the value of a reinsurance structure are: (1) stabilizing results, (2) freeing up or replacing required c… | definition | missing |  |
| Evaluating reinsurance as a cost-effective substitute for capital (compared with alternatives like a surplus note) falls under the paradigm… | fact | linked | Pro Rata Reinsurance: “It gives surplus relief to a growing insurer whose premium and unearned premium are outpacing its s…” |

</details>

<details><summary><code>cas7-2018-q23</code> · gap</summary>

Tagged pages: Risk Management, Model Risk, Correlation, Risk Modeling

| Item | Kind | Status | Where |
|---|---|---|---|
| ERM models need dedicated, full-time staff or a dedicated ERM function; staff doing ERM part-time alongside regular duties creates scheduli… | fact | missing |  |
| Catastrophe model output is uncertain (data quality, model and parameter risk, and results varying across vendors and versions), so relying… | fact | linked | Probable Maximum Loss: “Using a single model's output as a precise figure is a [[Model Risk]] failure; the defensible pract…” |
| Correlation assumptions between lines of business require broad knowledge of the whole firm and are politically sensitive, so individual li… | fact | missing |  |
| Setting capital solely to achieve a small probability of default is weak because tail estimates are highly uncertain, it mainly protects po… | fact | tagged | Risk Modeling (collapsed): “VaR does not see A's $2\%$ chance of a $200$ loss at all.” |
| Capital requirements can be improved by using thresholds other than default, such as the capital needed to maintain a target rating, to con… | fact | tagged | Risk Modeling: “how much capital a target rating or ruin probability requires” |

</details>

<details><summary><code>cas7-2018-q24</code> · gap</summary>

Tagged pages: Risk Management, Business Risk

| Item | Kind | Status | Where |
|---|---|---|---|
| A soft market is a phase of the underwriting cycle in which prices are low and coverage terms are loose, with strong competition and abunda… | definition | elsewhere | Underwriting Cycle: “a soft market, in which prices fall, [[Underwriting\\|underwriting]] standards loosen and insurance …” |
| A 'maintain market share' (naive) underwriting cycle strategy keeps premium volume or plan targets constant through the cycle by cutting pr… | definition | missing |  |
| Maintaining market share in a soft market means writing more exposure at inadequate rates, which erodes price adequacy and profitability, w… | fact | syllabus | Insurance Market Imperfections: “When capacity is plentiful, insurers cut prices relative to competitors to buy market share, and an…” |
| Effective cycle management aligns underwriter incentives and management goals with owner objectives (agency theory), rewarding underwriting… | fact | missing |  |
| Effective cycle management preserves capital and surplus and retains talent, data and presence in core markets during soft markets, so the … | fact | elsewhere | Underwriting Cycle: “An insurer that keeps its underwriting discipline in a soft market loses volume to competitors but …” |
| Effective cycle management includes scenario planning with pre-determined responses to market changes and investment strategy adjusted to t… | fact | missing |  |

</details>

<details><summary><code>cas7-2019-q19</code> · gap</summary>

Tagged pages: Reinsurance, Risk Management, Risk Measure

| Item | Kind | Status | Where |
|---|---|---|---|
| To build a cumulative distribution function chart from simulation results, sort the simulated outcomes (e.g., combined ratios) in ascending… | procedure | elsewhere | Empirical Distribution: “The **Empirical Distribution** of a sample $x_1, \ldots, x_n$ is the discrete distribution that put…” |
| When comparing reinsurance options by their CDF curves, an option whose curve lies to the left (lower combined ratio) at high percentiles p… | fact | missing |  |
| Value at Risk (V@R) at percentile p is the loss level at the p-th percentile of the distribution; for equally likely simulations it is the … | definition | tagged | Risk Measure: “**Value at Risk** is the lower $p$-quantile of the loss” |
| Tail Value at Risk (TV@R) at percentile p is the expected loss given that the loss is at or beyond the V@R at p, i.e., the average of the t… | definition | tagged | Risk Measure: “**Tail Value at Risk** averages the worst $1-p$ of outcomes” |
| Excess Tail Value at Risk (XTV@R) equals TV@R minus the mean of the distribution, measuring the tail's excess over the average outcome. | formula | syllabus | Risk Mitigation: “where required capital is set by the risk measure (for example $C = \text{TVaR}_{99\%}(L) - E[L]$)” |
| Weighted Tail Value at Risk (WTV@R) is calculated like TV@R but with the scenario probabilities transformed (e.g., by a Wang transform) to … | definition | tagged | Risk Measure: “**Distortion (spectral) risk measures** weight each layer of loss by $g(S(x))$, where $S = 1 - F$” |
| A weakness of TV@R is that it weights all tail losses equally (linearly), so it does not reflect risk-averse attitudes toward increasingly … | fact | missing |  |

</details>

<details><summary><code>cas7-2019-q20</code> · gap</summary>

Tagged pages: Correlation

| Item | Kind | Status | Where |
|---|---|---|---|
| The Normal copula is symmetric and has no strong tail dependence, so its scatter plot looks more uniform with weaker clustering in the corn… | fact | missing |  |
| The HRT (heavy right tail) copula has dependence concentrated in the right tail, so its scatter plot shows points bunched in the upper-righ… | fact | missing |  |
| The HRT copula suits lines of business that are largely uncorrelated normally but become highly dependent in extreme events such as catastr… | fact | missing |  |
| The Normal copula extends easily to more than two lines of business (via a correlation matrix) and is easy to simulate from and invert, whe… | fact | missing |  |
| A copula only specifies the dependence between variables and not their marginal distributions, so the expected value of the aggregate (sum)… | fact | missing |  |
| A copula with stronger right-tail dependence makes large losses across lines more likely to occur together, which gives a higher VaR at hig… | fact | missing |  |

</details>

<details><summary><code>cas7-2019-q21</code> · gap</summary>

Tagged pages: Underwriting Cycle, Business Risk

| Item | Kind | Status | Where |
|---|---|---|---|
| Under the institutional factors theory, data lags (pricing on historical data, delayed statistical bureau aggregation) and regulatory lags … | fact | tagged | Underwriting Cycle: “Rates are set from past experience, so prices lag the losses they are meant to cover, and loss rese…” |
| Under the competition theory, insurers may cut prices to gain market share or from optimistic views of future losses, new entrants may unde… | fact | tagged | Underwriting Cycle: “Competition for market share pushes prices down while results look good, and the supply of capacity…” |
| Under the capacity and capital theory, an increase in industry capital (e.g., a capital infusion or retained earnings) raises insurers' cap… | fact | tagged | Underwriting Cycle: “Hard-market profits rebuild surplus, and high returns attract new capital, both from existing insur…” |
| Under the economic linkages theory, general economic conditions soften the market: higher interest rates raise investment income and let in… | fact | tagged | Underwriting Cycle: “Interest rates matter as well: when investment yields are high, insurers accept higher combined rat…” |
| An econometric model of the underwriting cycle combines components such as capital, supply, demand, and profit flows, whose interactions de… | definition | missing |  |
| In the econometric model, capital links to supply and demand: capital infusions raise capacity and shift supply right (and demand right if … | fact | tagged | Underwriting Cycle: “Capacity is the premium volume that surplus can support, so the cycle in prices runs alongside a cy…” |

</details>

<details><summary><code>cas8-2012-q10</code> · gap</summary>

Tagged pages: Exposure Curves, Reinsurance Pricing

| Item | Kind | Status | Where |
|---|---|---|---|
| Using a single exposure curve across risks of different sizes assumes scale independence: the expected loss as a percentage of insured valu… | fact | linked | Severity Distribution: “Property losses grow with the size of the risk, so they are expressed as a fraction $X \in [0,1]$ o…” |
| To test scale independence in a book, compare pure premium divided by insured value (using range midpoints) across insured value ranges; ro… | procedure | missing |  |
| Scale independence is less appropriate for commercial property than for homeowners, because commercial risks are heterogeneous in construct… | fact | missing |  |
| An exposure curve applied to a limits profile requires the profile to be on the same basis (per location vs per risk) as the data used to b… | fact | missing |  |
| Exposure rating relies on an expected loss ratio for the subject business; highly volatile historical loss ratios make this expected loss r… | fact | tagged | Reinsurance Pricing: “credibility rests on the claim count *expected* in the experience period (not the count observed) a…” |

</details>

<details><summary><code>cas8-2012-q7</code> · answerable</summary>

Tagged pages: Sliding Scale Commissions, Reinsurance Pricing, Aggregate Loss Model, Reinsurance Contract Provisions

| Item | Kind | Status | Where |
|---|---|---|---|
| To compute the sliding scale commission for a loss ratio, find where it falls on the scale: at or below the maximum-commission loss ratio p… | procedure | tagged | Sliding Scale Commissions: “$$c(\text{LR}) = \min\left(c_{\max},\; \max\left(c_{\min},\; c_0 + s\,(\text{LR}_0 - \text{LR})\rig…” |
| Expected loss ratio and expected sliding scale commission from a discrete aggregate loss distribution are the probability-weighted sums of … | procedure | tagged | Sliding Scale Commissions: “$$E[c] = \sum_i p_i \, c(\text{LR}_i)$$” |
| A carryforward provision adds the amount by which a prior year's loss ratio exceeded the minimum-commission loss ratio (the excess) to the … | definition | tagged | Sliding Scale Commissions: “Past deficits above the minimum-commission loss ratio can be carried into the current year. Priced …” |
| If the prior year's loss ratio exceeded the minimum-commission loss ratio, the carryforward raises the current year's adjusted loss ratio (… | fact | tagged | Sliding Scale Commissions: “Priced for a single year, this simply shifts the slide by the carryforward.” |
| One approach to pricing a carryforward is to estimate its impact on the current year only by shifting the commission scale and the aggregat… | procedure | tagged | Sliding Scale Commissions: “Priced for a single year, this simply shifts the slide by the carryforward.” |
| A second approach to pricing a carryforward is to model the longer-term loss ratio distribution over a block of multiple years, capturing t… | procedure | tagged | Sliding Scale Commissions: “Priced over a multi-year block, it cuts the variance roughly in proportion to the number of years.” |

</details>

<details><summary><code>cas8-2012-q8</code> · answerable</summary>

Tagged pages: Exposure Curves, Reinsurance Pricing

| Item | Kind | Status | Where |
|---|---|---|---|
| A valid exposure curve G(x) must satisfy G(0)=0 and G(1)=1, be increasing (G'(x) ≥ 0), and be concave (G''(x) ≤ 0), equivalently G'(0) ≥ 1 … | fact | tagged | Exposure Curves: “$G(0) = 0$ and $G(1) = 1$, and $G$ is increasing and concave.” |
| An exposure curve G(x) gives the proportion of total expected loss that falls below the limit at fraction x of the maximum possible loss. | definition | tagged | Exposure Curves: “**Exposure Curves** give, for a class of property risks, the share of expected loss that falls belo…” |
| To find the proportion of expected loss in a layer, convert the layer's attachment and exit points to fractions of the maximum possible los… | procedure | tagged | Exposure Curves: “$$E[\text{loss in } (D_1, D_2]] = E[X]\left[G\!\left(\tfrac{D_2}{M}\right) - G\!\left(\tfrac{D_1}{M…” |
| The probability of a total loss under an exposure curve equals G'(1)/G'(0); for the curve G(x)=(1−b^x)/(1−b) this equals b (and 1/g in MBBE… | fact | tagged | Exposure Curves: “$p = G'(1)/G'(0)$ is the probability of a total loss.” |
| A higher probability of total loss (a higher b) yields a flatter exposure curve, hence a larger share of loss in upper layers; so an overly… | fact | tagged | Exposure Curves: “At $c = 0$ every loss is a total loss. Higher $c$ gives a more concave curve: small partial losses …” |

</details>

<details><summary><code>cas8-2012-q9</code> · gap</summary>

Tagged pages: Catastrophe Risk, Probable Maximum Loss, Catastrophe Modelling, Catastrophe Exposure Management

| Item | Kind | Status | Where |
|---|---|---|---|
| An exceedance probability curve shows, for each possible level of loss over a period (usually annual), the probability that the loss exceed… | definition | tagged | Catastrophe Risk: “$$\text{EP}(x) = P(\text{annual loss} > x)$$” |
| A 1-in-N year Probable Maximum Loss (PML) is the loss level whose annual exceedance probability is 1/N. | definition | tagged | Catastrophe Risk: “$$\text{Return period}(x) = \frac{1}{\text{EP}(x)}$$” |
| To read a loss level off an exceedance probability curve given only some plotted points, treat the curve as continuous and linearly interpo… | procedure | missing |  |
| Exceedance probability curves are used to determine PML at a chosen return period and to test whether capital meets a solvency or risk-tole… | fact | tagged | Probable Maximum Loss: “It is the central figure in catastrophe risk management: it sizes the reinsurance programme, drives…” |
| Exceedance probability curves are used in reinsurance and portfolio management, such as deciding how much risk to cede, structuring reinsur… | fact | tagged | Catastrophe Exposure Management: “Model-based portfolio management judges each new account by its *marginal* effect $\Delta\rho$ on t…” |
| The area under an exceedance probability curve gives the average annual loss (AAL), so the curves are used for pricing and expected loss es… | fact | tagged | Catastrophe Risk: “The area under the AEP curve is the average annual loss ([[Catastrophe Expected Loss Cost]])” |

</details>

<details><summary><code>cas8-2013-q20</code> · answerable</summary>

Tagged pages: Exposure Curves, Reinsurance Pricing, Layer of Insurance, Severity Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The exposure curve G(d) gives the proportion of total expected loss that falls below the limit d (as a fraction of the maximum loss), i.e. … | definition | tagged | Exposure Curves: “**Exposure Curves** give, for a class of property risks, the share of expected loss that falls belo…” |
| An exposure curve can be derived from the loss distribution (on a scale of 0 to 1) as G(d) = ∫_0^d (1 − F(x)) dx / ∫_0^1 (1 − F(x)) dx, equ… | formula | tagged | Exposure Curves: “$$G(d) = \frac{\int_0^d \left(1 - F(y)\right) dy}{\int_0^1 \left(1 - F(y)\right) dy}$$” |
| To use an exposure curve with a maximum possible loss, convert layer attachment and limit dollar amounts into fractions of the maximum loss… | procedure | tagged | Exposure Curves: “$d = D/M$ the normalised retention, capped at $1$.” |
| The proportion of pure risk premium in a layer from a to b is G(b) − G(a), the difference of the exposure curve at the layer's upper and lo… | fact | tagged | Exposure Curves: “$$E[\text{loss in } (D_1, D_2]] = E[X]\left[G\!\left(\tfrac{D_2}{M}\right) - G\!\left(\tfrac{D_1}{M…” |

</details>

<details><summary><code>cas8-2013-q21</code> · answerable</summary>

Tagged pages: Reinstatements, Excess of Loss, Catastrophe Risk

| Item | Kind | Status | Where |
|---|---|---|---|
| A reinstatement provision restores the layer limit after a loss in exchange for an additional reinstatement premium, and with no limit on t… | definition | tagged | Reinstatements: “**Reinstatements** restore the limit of an [[Excess of Loss\\|excess of loss]] layer, typically a pr…” |
| Reinstatement premium pro-rata as to amount = (premium rate factor, e.g. 120% for a 120% provision) × layer annual premium × (layer loss am… | formula | tagged | Reinstatements: “$$\text{RP} = P \times r \times \frac{\text{Limit reinstated}}{L}$$” |
| To find the layer loss for a ground-up loss to an excess-of-loss layer, subtract the attachment point from the ground-up loss and cap the r… | procedure | tagged | Excess of Loss: “$$Y = \min\left(\max(X - R,\, 0),\; L\right)$$” |
| Reinstatement premium pro-rata as to amount and as to time is the pro-rata-as-to-amount premium multiplied by the fraction of the contract … | formula | tagged | Reinstatements: “*Pro rata as to time* multiplies RP by the fraction of the term left at the loss date.” |
| Pro-rata as to time reinstatement assumes losses occur uniformly throughout the year, which is a poor assumption for seasonal property cata… | fact | tagged | Reinstatements: “*Pro rata as to time* multiplies RP by the fraction of the term left at the loss date. Clark notes …” |

</details>

<details><summary><code>cas8-2013-q22</code> · answerable</summary>

Tagged pages: Exposure Curves, Reinsurance Pricing, Excess of Loss

| Item | Kind | Status | Where |
|---|---|---|---|
| An exposure curve G(x) gives the proportion of total expected loss (pure risk premium) that falls below a retention expressed as a fraction… | definition | tagged | Exposure Curves: “**Exposure Curves** give, for a class of property risks, the share of expected loss that falls belo…” |
| The share of pure risk premium in a layer from attachment a to a+L on a policy with maximum loss M equals G((a+L)/M) − G(a/M). | formula | tagged | Exposure Curves: “$$E[\text{loss in } (D_1, D_2]] = E[X]\left[G\!\left(\tfrac{D_2}{M}\right) - G\!\left(\tfrac{D_1}{M…” |
| The portion of pure premium retained by the cedant below the retention d equals G(d/M), where M is the maximum possible loss on the policy. | fact | tagged | Exposure Curves: “- $X$ is the ground-up loss, $M$ the MPL (or sum insured or EML), $y = X/M \in [0, 1]$ the **loss d…” |
| In a layer reinsurance treaty, the reinsurer's maximum loss equals the policy limit (total insured value) minus the cedant's retention, so … | fact | tagged | Reinsurance Pricing: “In the exposure factor $\text{EF}$, $PL$ is the policy limit, $u = \min(PL, AP + Lim)$ and $d = \mi…” |

</details>

<details><summary><code>cas8-2013-q23</code> · answerable</summary>

Tagged pages: Types of Reinsurance, Quota Share, Surplus Share, Excess of Loss

| Item | Kind | Status | Where |
|---|---|---|---|
| Under a quota share treaty the cedent cedes a fixed percentage of every loss, so retained losses equal (1 − ceded percentage) times total l… | procedure | tagged | Quota Share: “Net loss is $(1-a)X$, so its coefficient of variation equals gross.” |
| A surplus share treaty with an n-line capacity has a retained line (the maximum the cedent keeps per risk) and cedes up to n times the reta… | definition | tagged | Surplus Share: “The cedant keeps a fixed amount of each risk's insured value (the **retained line**). The reinsurer…” |
| For each risk under a surplus share, the retained line is the lesser of the insured value and the retained line limit, the ceded amount is … | procedure | tagged | Surplus Share: “$$s(V) = \frac{\min\left(\max(V - R,\, 0),\; N R\right)}{V}$$” |
| In a surplus share, losses are shared proportionally: the reinsurer pays the ceded fraction of each loss on a risk, and the cedent retains … | fact | tagged | Surplus Share: “$$\text{Ceded loss on the risk} = s(V) \cdot X$$” |
| A per-risk excess of loss contract of L xs R cedes, on each risk's loss, the amount max(min(loss − R, L), 0), and the cedent retains the lo… | procedure | tagged | Types of Reinsurance: “$$\text{Ceded}_{\text{XS}} = \min\left(\max(X - R,\,0),\; L\right)$$” |
| Lowest retained losses is equivalent to highest ceded losses, so contracts can be compared by either measure. | fact | linked | Reinsurance: “$$\text{Net} = \text{Gross} - \text{Ceded}$$” |

</details>

<details><summary><code>cas8-2013-q24</code> · gap</summary>

Tagged pages: Probable Maximum Loss, Catastrophe Modelling, Quota Share, Excess of Loss, Catastrophe Exposure Management

| Item | Kind | Status | Where |
|---|---|---|---|
| Probable Maximum Loss (PML) is the largest loss likely to occur for the insurer at a given return period, i.e., the loss exceeded with prob… | definition | tagged | Probable Maximum Loss: “**The Probable Maximum Loss** (PML) is the loss an insurer's portfolio would suffer from a catastro…” |
| A return period of N years corresponds to an annual exceedance probability of 1/N. | fact | tagged | Probable Maximum Loss: “A $1$-in-$500$ event has a $0.2\%$ annual probability” |
| To find the loss at an exceedance probability not listed on an OEP curve, linearly interpolate between the two adjacent curve points (proba… | procedure | missing |  |
| A quota share with a loss limit cedes the quota share percentage times the loss, capped at the loss limit (percentage applied to loss up to… | procedure | tagged | Quota Share (collapsed): “Ceded catastrophe loss at $40\%$ is $0, 4, 12, 24$ (in \$ millions) before the cap, and $0, 4, 8, 8…” |
| Inuring reinsurance applies to the loss first and benefits subsequent reinsurance, so later treaties apply to the loss net of the inuring r… | definition | syllabus | Types of Reinsurance: “Order matters too: a surplus share may *inure* to the benefit of a per-risk or catastrophe cover, w…” |
| An excess of loss layer 'L xs A' with placement percentage p cedes p times min(L, max(0, loss − A)) of the loss. | procedure | tagged | Excess of Loss: “$$Y = \min\left(\max(X - R,\, 0),\; L\right)$$” |
| The net retained loss equals the gross loss minus the amounts ceded to the quota share and to each excess of loss layer (including the unpl… | fact | elsewhere | Net of Reinsurance: “$$\text{Net} = \text{Gross} - \text{Ceded}$$” |

</details>

<details><summary><code>cas8-2013-q25</code> · untagged</summary>

Tagged pages: Aggregate Loss Model, Sliding Scale Commissions, Lognormal Distribution, Reinsurance Pricing, Model Selection

| Item | Kind | Status | Where |
|---|---|---|---|
| A lognormal distribution is defined only for positive values, so it assigns no probability mass at zero and cannot represent loss-free (zer… | fact | tagged | Lognormal Distribution: “It is widely used to model insurance losses, asset prices, and any quantity that must be positive a…” |
| Fitting a single parametric distribution (such as a lognormal) directly to aggregate losses makes it difficult to reflect differing policy … | fact | linked | Severity Distribution: “Paired with a claim-count distribution, it prices anything that depends on how large claims are: de…” |
| Panjer's recursive formula (collective risk model) computes the aggregate loss distribution from separate frequency and discretized severit… | fact | tagged | Aggregate Loss Model: “$N$ is the **claim count** (frequency) random variable; $X_i$ are i.i.d. **claim severity** random …” |
| The recursive formula with Poisson frequency works well for low-frequency situations and naturally allows a positive probability of zero cl… | fact | elsewhere | Panjer Recursion: “When $f_X(0) = 0$ it is simply $p_0$, and for a Poisson $N$ it is $e^{-\lambda(1 - f_X(0))}$.” |
| The Poisson distribution is a standard frequency model whose mean equals its variance, so comparing the sample mean and variance of claim c… | fact | elsewhere | Frequency Distribution: “The variance is below the mean for the binomial, equal to it for the Poisson and above it for the n…” |

</details>

<details><summary><code>cas8-2014-q20</code> · gap</summary>

Tagged pages: Loss Trend, Excess of Loss, Layer of Insurance, Reinsurance Pricing

| Item | Kind | Status | Where |
|---|---|---|---|
| Trend for a prospective policy year is applied from the loss date to the midpoint of the prospective policy period (for an annual policy, s… | fact | tagged | Loss Trend: “so the exposure period runs $7/1/2025$ to $6/30/2027$ and its midpoint — the average loss date — is…” |
| To trend an excess/umbrella layer claim, convert it to the ground-up loss by adding the attachment point to the layer payment, trend the gr… | procedure | tagged | Excess of Loss: “Trend each historical loss individually *before* applying the layer.” |
| Trended loss = original loss × (1 + annual trend)^t, where t is the number of years of trend, so the annual trend factor is (trended/origin… | formula | tagged | Loss Trend: “$$\text{Trend Factor} = (1 + t)^{n}$$” |
| Trending causes layer losses to grow faster than ground-up losses because the fixed attachment point leverages the trend on the excess port… | fact | tagged | Excess of Loss: “Excess losses grow faster than trend because a loss just below $R$ trends into the layer.” |
| Policy limits and attachment points drift upward over time, so applying current limits and attachment points to historical losses misstates… | fact | missing |  |
| If a historical claim is converted to ground-up using the current (higher) attachment point rather than the lower historical one, the groun… | fact | missing |  |

</details>

<details><summary><code>cas8-2014-q21</code> · gap</summary>

Tagged pages: Allocated Loss Adjustment Expense, Clash Cover, Reinsurance Pricing, Excess of Loss

| Item | Kind | Status | Where |
|---|---|---|---|
| When ALAE is included within the underlying policy's limit, ALAE erodes the underlying limit so that the umbrella layer attaches effectivel… | fact | tagged | Clash Cover: “It is penetrated when several policies (or lines) are involved in the same occurrence, when extra-c…” |
| When ALAE is included within the umbrella limit, total loss plus ALAE is capped at the layer limit; when ALAE is in addition to the umbrell… | fact | tagged | Excess of Loss: “Decide how ALAE enters: pro rata with loss, or added to loss so the limit applies to the sum.” |
| Ranking of umbrella cost by ALAE treatment: ALAE inside underlying and outside umbrella is most expensive; ALAE outside both is least expen… | fact | missing |  |
| ALAE-to-loss ratios from a small, volatile loss history are not credible for setting an ALAE load; few claims make the data have low credib… | fact | elsewhere | Umbrella Liability Insurance: “Claims are rare but severe, so experience is seldom credible, and pricing leans on [[Increased Limi…” |
| Loss amounts capped at an underlying policy limit distort the ratio of ALAE to loss, and ALAE exceeding loss on claims (e.g. from extensive… | fact | tagged | Allocated Loss Adjustment Expense: “A "defence and settle" strategy shift moves both components, in opposite directions, and shows up i…” |
| ALAE treatment matters for clash covers: ALAE included within underlying limits makes penetration of excess layers more likely, and runaway… | fact | tagged | Clash Cover: “It is penetrated when several policies (or lines) are involved in the same occurrence, when extra-c…” |

</details>

<details><summary><code>cas8-2014-q22</code> · answerable</summary>

Tagged pages: Surplus Share, Quota Share, Reinsurance Pricing, Treaty Reinsurance, Losses-Occurring-During and Risks-Attaching

| Item | Kind | Status | Where |
|---|---|---|---|
| On a risks attaching basis, a reinsurance treaty covers losses from policies whose effective (written) date falls within the treaty period,… | definition | tagged | Treaty Reinsurance: “A *risks-attaching* treaty covers losses on policies written during the period, which can occur up …” |
| On a losses occurring basis, a reinsurance treaty covers losses that occur during the treaty period, regardless of when the underlying poli… | definition | tagged | Treaty Reinsurance: “A *losses-occurring* treaty covers losses that occur during the treaty period, whenever the policy …” |
| In a quota share treaty, the reinsurer pays a fixed percentage of each covered loss, so its liability is the quota share percentage times t… | procedure | tagged | Quota Share: “the reinsurer takes a fixed percentage $a$ of the premium and of every loss (usually including ALAE…” |
| In a surplus share treaty, the reinsurer's share of a risk equals the ceded lines (insured value minus retention, capped at the number of l… | formula | tagged | Surplus Share: “$$s(V) = \frac{\min\left(\max(V - R,\, 0),\; N R\right)}{V}$$” |
| When a risks attaching treaty and a losses occurring treaty cover consecutive periods, a loss occurring in the later period on a policy wri… | fact | tagged | Treaty Reinsurance (collapsed): “Under a risks-attaching *catastrophe* cover, one event on 3/15/2026 hits policies written in 2025 a…” |
| Overlapping treaty coverage can be avoided with an interlocking clause assigning each loss to one treaty, an exclusion in the later treaty … | procedure | tagged | Treaty Reinsurance (collapsed): “An *interlocking clause* apportions such an event between the contracts.” |

</details>

<details><summary><code>cas8-2014-q23</code> · gap</summary>

Tagged pages: Sliding Scale Commissions, Loss Corridors, Quota Share, Aggregate Loss Model, Reinsurance Contract Provisions

| Item | Kind | Status | Where |
|---|---|---|---|
| A sliding scale commission is a quota share commission that starts at a provisional rate paid up front and is later adjusted up or down (wi… | definition | tagged | Sliding Scale Commissions: “**A Sliding Scale Commission** is a ceding commission on a proportional treaty that varies inversel…” |
| A loss corridor is a reinsurance provision where the ceding company retains a stated percentage of losses within a specified loss ratio ban… | definition | tagged | Loss Corridors: “**A Loss Corridor** is a reinsurance contract provision under which the cedant **reassumes** part o…” |
| A sliding scale plan's provisional commission is typically higher than a loss corridor's fixed commission and is paid at the start of the t… | fact | tagged | Sliding Scale Commissions: “A provisional commission is paid as premium is ceded and then adjusted as losses mature.” |
| A carryforward provision stabilizes sliding scale commissions by adding the portion of the loss ratio beyond the loss ratio at the minimum … | procedure | tagged | Sliding Scale Commissions: “Past deficits above the minimum-commission loss ratio can be carried into the current year.” |
| Commission volatility under a sliding scale can also be reduced by computing the loss ratio over a block of multiple years, narrowing the r… | procedure | tagged | Sliding Scale Commissions: “Priced over a multi-year block, it cuts the variance roughly in proportion to the number of years.” |
| An aggregate loss distribution model should reflect the true volatility and potential loss cost of the underlying business, so contract smo… | fact | missing |  |

</details>

<details><summary><code>cas8-2014-q24</code> · answerable</summary>

Tagged pages: Reinstatements, Catastrophe Risk, Quota Share, Reinsurance Pricing

| Item | Kind | Status | Where |
|---|---|---|---|
| An occurrence exceedance probability (OEP) curve gives the probability that the largest single-event loss in a year exceeds a given amount;… | definition | tagged | Catastrophe Risk: “The *occurrence* curve (OEP) looks at the largest single event in a year, the *aggregate* curve (AE…” |
| Under the payback approach, the payback period is the reciprocal of the annual probability of a full layer loss, and the pure premium equal… | procedure | tagged | Reinstatements: “Before models, the *payback* approach set $P$ so that $L$ would be repaid over a chosen number of y…” |
| Pro-rata as to amount reinstatement premium = (loss paid to the layer / layer limit) × reinstatement rate percentage × original treaty prem… | formula | tagged | Reinstatements: “$$\text{RP} = P \times r \times \frac{\text{Limit reinstated}}{L}$$” |
| Loss to an excess of loss layer is the portion of the occurrence loss above the attachment point, capped at the layer limit. | procedure | linked | Excess of Loss: “$$Y = \min\left(\max(X - R,\, 0),\; L\right)$$” |
| A reinsurance treaty that inures to the benefit of another is applied first, so the other treaty applies only to the loss remaining after t… | fact | linked | Surplus Share: “Per-risk excess and catastrophe covers usually apply to the retention *after* the surplus share.” |
| A quota share treaty pays its fixed percentage of the ground-up loss, and the insurer's net loss equals the ground-up loss minus the quota … | procedure | tagged | Quota Share: “Net loss is $(1-a)X$” |

</details>

<details><summary><code>cas8-2014-q25</code> · answerable</summary>

Tagged pages: Exposure Curves, Limited Expected Value, Reinsurance Pricing, Loss Cost

| Item | Kind | Status | Where |
|---|---|---|---|
| The exposure factor (exposure curve value) for a layer is the proportion of ground-up expected loss falling in that layer, computed relativ… | definition | tagged | Reinsurance Pricing: “In the exposure factor $\text{EF}$, $PL$ is the policy limit, $u = \min(PL, AP + Lim)$ and $d = \mi…” |
| For a layer with attachment a and limit l, the exposure factor equals (E[X; a+l] - E[X; a]) / E[X; policy limit], where E[X; L] is the limi… | formula | tagged | Reinsurance Pricing: “$$\text{EF} = \frac{E[X \wedge u] - E[X \wedge d]}{E[X \wedge PL]}$$” |
| The exposure curve G(r) equals E[X; rL] / E[X; L] (limited expected value at fraction r of the policy limit over that at the full limit), s… | formula | tagged | Exposure Curves: “$$G(d) = \frac{E[X \wedge dM]}{E[X]}$$” |
| Expected loss in a reinsurance layer equals the exposure factor times the ground-up expected loss, so ground-up loss can be obtained by div… | fact | tagged | Exposure Curves: “$$E[\text{loss in } (D_1, D_2]] = E[X]\left[G\!\left(\tfrac{D_2}{M}\right) - G\!\left(\tfrac{D_1}{M…” |

</details>

<details><summary><code>cas8-2015-q20</code> · answerable</summary>

Tagged pages: Exposure Curves, Reinsurance Pricing, Excess of Loss

| Item | Kind | Status | Where |
|---|---|---|---|
| To allocate gross premium between cedant and reinsurer, convert gross premium to expected losses (risk premium) using the expected loss rat… | procedure | tagged | Exposure Curves: “Band the risk profile by MPL, estimate each band's expected loss as $\text{ELR} \times \text{premiu…” |
| The expected loss ratio times gross premium gives the total expected loss (risk premium). | formula | tagged | Exposure Curves: “estimate each band's expected loss as $\text{ELR} \times \text{premium}$” |
| The probability of a total loss under an exposure curve equals p = G'(1)/G'(0), the ratio of the curve's slope at 100% of the maximum loss … | formula | tagged | Exposure Curves: “$p = G'(1)/G'(0)$ is the probability of a total loss.” |
| The exposure curve G(x)=(1-b^x)/(1-b) is a special case of the MBBEFD family (with bg=1), for which the total-loss probability p equals b. | fact | tagged | Exposure Curves: “Match the total-loss probability and the mean: $g = 1/p$ directly, then solve for $b$ iteratively f…” |
| The share of expected losses in a layer from retention R with limit L is G((R+L)/MPL) − G(R/MPL), where MPL is the maximum possible loss or… | formula | tagged | Exposure Curves: “E[\text{loss in } (D_1, D_2]] = E[X]\left[G\!\left(\tfrac{D_2}{M}\right) - G\!\left(\tfrac{D_1}{M}\…” |
| The exposure curve G(x) gives the proportion of total expected loss falling below a loss limit expressed as a fraction x of the maximum pos… | definition | tagged | Exposure Curves: “**Exposure Curves** give, for a class of property risks, the share of expected loss that falls belo…” |

</details>

<details><summary><code>cas8-2015-q21</code> · gap</summary>

Tagged pages: Profit Commission, Finite Reinsurance, Aggregate Excess of Loss, Reinsurance Pricing, Reinsurance Contract Provisions

| Item | Kind | Status | Where |
|---|---|---|---|
| An aggregate stop loss layer covers aggregate losses between an attachment loss ratio and an exhaustion loss ratio applied to subject premi… | fact | tagged | Aggregate Excess of Loss: “The reinsurer pays the aggregate in excess of an aggregate retention $A$, up to an aggregate limit …” |
| Compute ceded loss in each simulation as (loss ratio minus attachment loss ratio, bounded to the layer) times subject premium, or equivalen… | procedure | tagged | Aggregate Excess of Loss: “$$Y = \min\left(\max(S - A,\, 0),\; L_A\right)$$” |
| Profit commission = max(0, commission percentage × ceded premium − ceded loss), with premium and loss over the relevant period (single year… | formula | tagged | Profit Commission: “$$\text{PC} = k \times \max\left(0,\; 1 - \text{LR} - c - m\right)$$” |
| Expected profit commission from simulated trials is the simple average of the profit commission across all trials, computed trial by trial … | procedure | tagged | Profit Commission: “$$E[\text{PC}] = k \sum_i p_i \max\left(0,\; 1 - \text{LR}_i - c - m\right)$$” |
| With a cedent termination option, a trial in which the interim profit commission is positive is terminated at that point and pays only that… | procedure | missing |  |

</details>

<details><summary><code>cas8-2015-q22</code> · gap</summary>

Tagged pages: Catastrophe Modelling, Probable Maximum Loss, Catastrophe Risk

| Item | Kind | Status | Where |
|---|---|---|---|
| The aggregate exceedance probability (AEP) at a loss level x is the probability that total annual loss across all events exceeds x; it equa… | definition | tagged | Catastrophe Risk: “The *occurrence* curve (OEP) looks at the largest single event in a year, the *aggregate* curve (AE…” |
| To build the aggregate loss distribution for independent events that each occur at most once per year, enumerate every combination of event… | procedure | elsewhere | Discrete Random Variable: “The PMF of a sum of independent discrete variables is a **convolution**, $P(X + Y = s) = \sum_x p_X…” |
| Compute exceedance probabilities by sorting the aggregate loss outcomes from largest to smallest and cumulating the probabilities of all la… | procedure | elsewhere | Catastrophe Model Output (collapsed): “For the OEP curve, add the rates of events at least as large as each loss.” |
| To simulate a loss from a discrete aggregate distribution with a uniform random number, find the interval of the cumulative distribution F(… | procedure | missing |  |

</details>

<details><summary><code>cas8-2015-q23</code> · answerable</summary>

Tagged pages: Reinsurance Pricing, Exposure Curves, Excess of Loss, Loss Cost

| Item | Kind | Status | Where |
|---|---|---|---|
| In experience rating an excess layer, apply the layer attachment point to each individual trended ground-up occurrence (loss minus attachme… | procedure | tagged | Reinsurance Pricing: “trend each large loss individually and keep every loss that would pierce the layer *after* trend” |
| Trend ground-up losses to the prospective period before computing layer losses, and develop the excess layer losses with the excess loss de… | procedure | tagged | Excess of Loss: “Sum the layer losses by year, apply *excess* development factors (the layer reports and develops la…” |
| The experience loss cost (loss ratio) for a layer equals total developed, trended layer losses divided by total on-level trended premium ov… | formula | tagged | Reinsurance Pricing: “$$\text{Loss cost rate} = \frac{\sum \text{trended, developed layer losses}}{\sum \text{on-level su…” |
| An exposure curve gives the exposure factor (cumulative share of loss) at each percentage of insured value; the share of loss in a layer is… | definition | tagged | Exposure Curves: “$$E[\text{loss in } (D_1, D_2]] = E[X]\left[G\!\left(\tfrac{D_2}{M}\right) - G\!\left(\tfrac{D_1}{M…” |
| To extend experience-based layer costs to a higher layer with little or no experience, scale the experience layer loss cost by the ratio of… | procedure | tagged | Reinsurance Pricing: “*free cover* — no trended loss reaching the top of a layer — is priced from exposure-rating relativ…” |
| Using experience for the full layer when the observed losses reach only part of it gives free cover for the upper portion; to avoid this, u… | fact | tagged | Reinsurance Pricing: “*free cover* — no trended loss reaching the top of a layer — is priced from exposure-rating relativ…” |

</details>

<details><summary><code>cas8-2016-q18</code> · answerable</summary>

Tagged pages: Catastrophe Modelling, Parameter Risk, Catastrophe Risk

| Item | Kind | Status | Where |
|---|---|---|---|
| The four basic modules of a catastrophe model are hazard (event), inventory (exposure), vulnerability (damage), and loss; the hazard module… | definition | tagged | Catastrophe Modelling: “Data used in catastrophe models describe the hazard (event magnitude, location, wind speed, soil ty…” |
| Epistemic risk is uncertainty due to lack of knowledge or data (parameter or model risk, the catastrophe-model analogue of parameter risk) … | definition | tagged | Catastrophe Risk: “*Aleatory* uncertainty is the inherent randomness of events and cannot be reduced; *epistemic* unce…” |
| Aleatory risk is uncertainty due to inherent randomness (process risk) and cannot be reduced by collecting more data or improving the model. | definition | tagged | Catastrophe Risk: “*Aleatory* uncertainty is the inherent randomness of events and cannot be reduced; *epistemic* unce…” |
| Epistemic risk appears in each catastrophe model module as limited or inaccurate knowledge or data, such as limited scientific understandin… | fact | tagged | Catastrophe Risk: “*Aleatory* uncertainty is the inherent randomness of events and cannot be reduced; *epistemic* unce…” |
| Aleatory risk appears in each catastrophe model module as pure randomness, such as the random magnitude or path of an event (hazard), or th… | fact | tagged | Catastrophe Risk: “*Aleatory* uncertainty is the inherent randomness of events and cannot be reduced; *epistemic* unce…” |

</details>

<details><summary><code>cas8-2016-q19</code> · gap</summary>

Tagged pages: Probable Maximum Loss, Quota Share, Excess of Loss, Catastrophe Modelling, Return on Capital

| Item | Kind | Status | Where |
|---|---|---|---|
| For an excess-of-loss per-risk treaty, the ceded loss on each claim is the portion of the loss above the retention, capped at the layer lim… | procedure | tagged | Excess of Loss: “the reinsurer pays the part of each loss — per risk or per occurrence — above the cedant's retentio…” |
| With pro-rata ALAE in an excess treaty, ALAE is shared in the same proportion as the ceded loss is to the total loss on each claim (ceded l… | procedure | missing |  |
| Ceded premium for an excess of loss treaty equals the reinsurance rate times the company's premium. | formula | tagged | Excess of Loss: “**Price language:** rate $=$ premium $\div$ subject premium” |
| Under a quota share, ceded premium and ceded loss and ALAE equal the cession percentage times the original premium and loss and ALAE, and t… | formula | tagged | Quota Share: “the reinsurer takes a fixed percentage $a$ of the premium and of every loss (usually including ALAE…” |
| Net profit after reinsurance equals premium minus ceded premium plus ceding commission, minus expenses, minus retained loss and ALAE; retur… | formula | tagged | Return on Capital: “**Return on Capital** — Mildenhall and Major's $\iota$ — is the expected margin earned per unit of …” |
| Required capital is set to cover the Probable Maximum Loss at a given return period (e.g., 1-in-100 year, a 1% exceedance probability), rea… | definition | tagged | Probable Maximum Loss: “**The Probable Maximum Loss** (PML) is the loss an insurer's portfolio would suffer from a catastro…” |
| A quota share with a maximum ceded loss ratio caps the reinsurer's recovery at that ratio times ceded premium, so the capital reduction fro… | fact | missing |  |

</details>

<details><summary><code>cas8-2016-q20</code> · answerable</summary>

Tagged pages: Reinstatements, Excess of Loss, Reinsurance Pricing

| Item | Kind | Status | Where |
|---|---|---|---|
| An excess of loss layer 'L xs A' pays the portion of a loss above the attachment point A, capped at the layer limit L: ceded = min(L, max(0… | definition | tagged | Excess of Loss: “Y = \min\left(\max(X - R,\, 0),\; L\right)” |
| Rate on line is the reinsurance premium divided by the layer limit, so the initial treaty premium equals rate on line times the limit. | definition | tagged | Excess of Loss: “**Price language:** rate $=$ premium $\div$ subject premium; *rate on line* $=$ premium $\div L$; *…” |
| A treaty with a single reinstatement provides total aggregate coverage of twice the layer limit; once the limit has been exhausted twice, t… | fact | tagged | Reinstatements: “With $n$ reinstatements the most the reinsurer pays in a year is $(1+n)L$.” |
| Pro rata as to amount reinstatement premium = initial treaty premium × (loss paid by the layer / layer limit) × the reinstatement percentag… | formula | tagged | Reinstatements: “\text{RP} = P \times r \times \frac{\text{Limit reinstated}}{L}” |
| Total reinstatement premium payable under a treaty is limited by the number of reinstatements: with one reinstatement, cumulative reinstate… | fact | tagged | Reinstatements: “With $n$ reinstatements the most the reinsurer pays in a year is $(1+n)L$. Pro rata as to amount me…” |
| The primary insurer retains the loss not ceded to the reinsurance layers, including any loss above the top of the layers or beyond exhauste… | fact | tagged | Reinstatements: “Its net cost of an event is retention, plus loss above the limit, plus RP, and the net [[Probable M…” |

</details>

<details><summary><code>cas8-2016-q21</code> · gap</summary>

Tagged pages: Exposure Curves, Reinsurance Pricing, Excess of Loss

| Item | Kind | Status | Where |
|---|---|---|---|
| To select a best-fitting exposure curve, compute the empirical share of cumulative loss below a given size (limited expected value at that … | procedure | linked | Severity Distribution: “$G(d)$ is then the share of expected loss kept below a deductible of $d$.” |
| When claim data lists losses above a threshold as ground-up amounts, each claim exceeding the threshold contributes the threshold amount to… | fact | linked | Severity Distribution: “$E[X \wedge u]$ is the [[Limited Expected Value\\|limited expected value]], the expected loss capped…” |
| For a range of insured values, assume insured values are evenly distributed and use the midpoint (average insured value) to compute the rat… | fact | missing |  |
| The exposure curve G(x) gives the percentage of cumulative loss below x, where x is expressed as a percentage of insured value (or maximum … | definition | tagged | Exposure Curves: “$G(0) = 0$ and $G(1) = 1$, and $G$ is increasing and concave.” |
| The MBBEFD exposure curve is G(x) = ln[((g-1)b + (1-gb)b^x)/(1-b)] / ln(gb), with parameters b and g determined by the curve parameter c; S… | formula | tagged | Exposure Curves: “$$G_{b,g}(d) = \frac{\ln\!\left[\dfrac{(g-1)b + (1-gb)\,b^{d}}{1-b}\right]}{\ln(gb)}$$” |
| For a per-risk excess treaty with attachment a and limit L on policies with average insured value V, the share of ground-up loss ceded is G… | procedure | tagged | Excess of Loss: “For property, use an [[Exposure Curves\\|exposure curve]]: $G\big((R+L)/IV\big) - G\big(R/IV\big)$ b…” |
| The expected ceded loss is the subject premium times the expected ground-up loss ratio times the exposure factor, where the ground-up loss … | procedure | tagged | Reinsurance Pricing: “$\text{EF}$ times subject premium times the expected loss ratio is the layer loss ([[Limited Expect…” |
| The expected ceded loss ratio for a treaty equals expected ceded loss divided by treaty premium, where treaty premium is the treaty rate ti… | procedure | linked | Loss Cost: “$$\text{Loss Cost} = \frac{E[\text{Losses}]}{\text{Exposure}}$$” |

</details>

<details><summary><code>cas8-2017-q18</code> · gap</summary>

Tagged pages: Exposure Curves, Reinsurance Pricing, Severity Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| To build an exposure curve from an exposure distribution by loss-as-percent-of-MPL, restate it as a distribution of loss sizes among exposu… | procedure | missing |  |
| The exposure curve is G(x) = E[min(X, x)] / E[X], the limited expected value at x divided by the mean, for loss X as a fraction of MPL. | formula | tagged | Exposure Curves: “G(d) = \frac{E[X \wedge dM]}{E[X]}” |
| An exposure curve is plotted with cumulative percent of MPL (loss size) on the x-axis and cumulative percent of losses on the y-axis, passe… | fact | tagged | Exposure Curves: “$G(0) = 0$ and $G(1) = 1$, and $G$ is increasing and concave.” |
| In the MBBEFD exposure curve, the parameter g equals 1/p, where p is the probability of a total (full MPL) loss among losses (the mass at t… | formula | tagged | Exposure Curves: “Match the total-loss probability and the mean: $g = 1/p$ directly, then solve for $b$ iteratively f…” |
| The MBBEFD mean parameter mu equals 1/G'(0), where G'(0) = (1 - F(0)) / E[X] is the slope of the exposure curve at zero (equal to the recip… | formula | tagged | Exposure Curves: “$G'(0) = 1/E[y]$, so the slope at the origin gives the mean damage ratio.” |
| Find the MBBEFD parameter b by looking up the computed g and mu in a table of b values. | procedure | tagged | Exposure Curves: “Match the total-loss probability and the mean: $g = 1/p$ directly, then solve for $b$ iteratively f…” |
| The proportion of total losses in a layer of limit L excess of retention R with underlying MPL M is G((R+L)/M) - G(R/M). | formula | tagged | Exposure Curves: “E[\text{loss in } (D_1, D_2]] = E[X]\left[G\!\left(\tfrac{D_2}{M}\right) - G\!\left(\tfrac{D_1}{M}\…” |

</details>

<details><summary><code>cas8-2017-q19</code> · answerable</summary>

Tagged pages: Reinsurance Pricing, Aggregate Loss Model, Reinsurance Contract Provisions

| Item | Kind | Status | Where |
|---|---|---|---|
| The loss to a per-claim excess layer of limit L xs retention R is min(L, max(0, claim - R)) for each claim, summed over all claims in the p… | formula | linked | Reinsurance: “$$\text{Ceded}_{\text{XOL}} = \min\!\left(\max(X - R,\, 0),\, L\right)$$” |
| A swing plan (retrospective rated reinsurance) charges a premium equal to the layer losses times a loading factor, subject to a minimum and… | definition | tagged | Reinsurance Contract Provisions: “*Swing plan:* a retrospectively rated premium on an excess layer, within a minimum and maximum, as …” |
| Compute swing plan premium for each year by applying the loading to that year's layer loss and then bounding the result by the minimum and … | procedure | linked | Retrospective Rating: “$$\text{Retro Premium} = \min\!\left(\max(R,\, R_{\min}),\, R_{\max}\right)$$” |
| The expected loss ratio under an empirical distribution model is the equal-weighted average of annual loss ratios (or total layer losses ov… | procedure | tagged | Reinsurance Pricing: “$$\text{Loss cost rate} = \frac{\sum \text{trended, developed layer losses}}{\sum \text{on-level su…” |
| An empirical distribution model is inappropriate when data are thin (few claims, especially few in the layer) or exposure changes (e.g., ra… | fact | tagged | Reinsurance Contract Provisions: “Historical adjusted loss ratios are a reasonability check only: they are distorted by past catastro…” |
| A collective risk model explicitly models claim frequency and claim severity separately and combines them into an aggregate loss distributi… | definition | tagged | Aggregate Loss Model: “An **Aggregate Loss Model** models the total (aggregate) losses $S$ from a portfolio as the sum of …” |
| Concerns with collective risk models include assumed independence of frequency and severity and among claims, reflecting only process varia… | fact | linked | Aggregate Excess of Loss: “don't treat the model as a black box — check its CV and percentiles against the data; occurrences, …” |

</details>

<details><summary><code>cas8-2017-q20</code> · gap</summary>

Tagged pages: Catastrophe Modelling, Catastrophe Risk, Risk Loads, Catastrophe Expected Loss Cost

| Item | Kind | Status | Where |
|---|---|---|---|
| The damage function (damage ratio curve) in a catastrophe model gives the mean damage ratio (damage as a fraction of the property's value) … | definition | tagged | Catastrophe Risk: “*vulnerability* (damage given intensity)” |
| Uncertainty in the damage function is represented by a distribution of damage ratios around the mean at each given intensity (secondary unc… | fact | elsewhere | Catastrophe Model Output: “Even for a given event the loss is uncertain, because damage to buildings of the same type varies. …” |
| Uncertainty in the intensity experienced at the site, given an earthquake (e.g., from an initial estimate of intensity), is represented by … | fact | missing |  |
| Event loss at a given intensity equals the damage ratio read from the damage function times the property value; expected annual loss is the… | procedure | tagged | Catastrophe Expected Loss Cost: “$$\text{AAL} = \sum_{i} \lambda_i\, \bar{L}_i$$” |
| The standard deviation of loss over discrete events is the square root of (sum of probability times loss squared minus the squared expected… | formula | elsewhere | Variance and Standard Deviation: “$$= E[X^2] - \mu^2$$” |
| Risk load is a specified percentage multiplied by the standard deviation of loss (standard deviation risk load). | formula | tagged | Risk Loads: “*standard deviation*: $P = E[X] + k\,\sigma(X)$” |
| With an expense load expressed as a percentage of premium, premium = (expected loss + risk load) / (1 − expense load percentage). | formula | tagged | Catastrophe Expected Loss Cost (collapsed): “\text{Rate} &= \frac{\$900 + \$735 + \$60}{1 - 0.20 - 0.05} \\” |

</details>

<details><summary><code>cas8-2018-q1</code> · gap</summary>

Tagged pages: Reinsurance Pricing, Aggregate Excess of Loss, Quota Share, Credibility, Reinsurance Contract Provisions

| Item | Kind | Status | Where |
|---|---|---|---|
| The chi-square statistic for testing shifting risk parameters is the sum over groups of (actual - expected)^2 / expected, where expected co… | formula | elsewhere | Chi-Square Goodness-of-Fit Test: “$$Q = \sum_{j=1}^{k} \frac{(O_j - E_j)^2}{E_j}$$” |
| Compare the chi-square statistic to the critical value at the given significance level with degrees of freedom equal to the number of group… | procedure | elsewhere | Chi-Square Goodness-of-Fit Test: “Reject $H_0$ at level $\alpha$ when $Q$ exceeds the upper-$\alpha$ [[Critical Value\\|critical value…” |
| When exposures are not given, use earned premium as the exposure base, test each line separately, and compute expected counts as each group… | procedure | missing |  |
| To evaluate a credibility weight Z with the MSE criterion, form for each past period a prediction as Z/2 times each of the two prior period… | procedure | missing |  |
| The credibility-weighted frequency estimate is the sum of Z-weighted recent-period frequencies plus (1-Z) times the overall mean frequency. | formula | tagged | Credibility: “$$\text{Estimate} = Z \times \text{Experience} + (1 - Z) \times \text{Complement}$$” |
| Aggregate excess of loss ceded premium is rate on line times the limit, and the ceded loss is the gross aggregate loss in excess of the att… | formula | tagged | Aggregate Excess of Loss: “$$Y = \min\left(\max(S - A,\, 0),\; L_A\right)$$” |
| For an aggregate quota share, ceded premium and ceded loss are the cession percentage of gross premium and loss, with ceded loss limited by… | procedure | tagged | Quota Share: “$$\begin{aligned} \text{Ceded premium} &= a \cdot P \\ \text{Ceded loss} &= a \cdot X \end{aligned}…” |

</details>

<details><summary><code>cas8-2018-q15</code> · gap</summary>

Tagged pages: Loss Corridors, Quota Share, Reinsurance Pricing

| Item | Kind | Status | Where |
|---|---|---|---|
| The reinsurer's expected combined ratio equals the expected loss ratio plus the ceding commission, brokerage, administrative and unallocate… | formula | tagged | Quota Share: “$$\text{Reinsurer's ratio} = \text{ELR} + c + b + e$$” |
| A loss corridor is a reinsurance provision under which the ceding insurer reassumes a specified percentage of losses falling between two lo… | definition | tagged | Loss Corridors: “**A Loss Corridor** is a reinsurance contract provision under which the cedant **reassumes** part o…” |
| Compute the expected loss ratio from a loss ratio distribution as the probability-weighted sum of the average loss ratios in each range. | procedure | linked | Reinsurance Contract Provisions: “$$E\left[g(\text{LR})\right] = \sum_i p_i \, g(\text{LR}_i)$$” |
| The loss ratio reassumed in a corridor for a given outcome is the corridor share times the portion of the loss ratio within the corridor: z… | procedure | tagged | Loss Corridors: “$$\text{LR}_{\text{net}} = \text{LR} - c \cdot \min\left(\max(\text{LR} - a,\, 0),\; b - a\right)$$” |
| To find the reassumed corridor percentage, set the expected loss ratio net of corridor recoveries (expected unadjusted loss ratio minus the… | procedure | missing |  |

</details>

<details><summary><code>cas8-2018-q16</code> · gap</summary>

Tagged pages: Probable Maximum Loss, Catastrophe Risk, Excess of Loss, Catastrophe Modelling, Catastrophe Exposure Management

| Item | Kind | Status | Where |
|---|---|---|---|
| A probable maximum loss (PML) at a given return period is the loss on the exceedance probability curve whose annual exceedance probability … | definition | tagged | Probable Maximum Loss: “**The Probable Maximum Loss** (PML) is the loss an insurer's portfolio would suffer from a catastro…” |
| To find a PML at a return period not listed in the table, convert return periods to exceedance probabilities and linearly interpolate betwe… | procedure | missing |  |
| Apply an excess-of-loss layer to a gross loss: ceded loss is the portion of the gross loss above the attachment point, capped at the layer … | procedure | tagged | Excess of Loss: “the reinsurer pays the part of each loss — per risk or per occurrence — above the cedant's retentio…” |
| An occurrence exceedance probability (OEP) curve describes the largest single event loss in a year, whereas an aggregate exceedance probabi… | definition | tagged | Catastrophe Risk: “The *occurrence* curve (OEP) looks at the largest single event in a year, the *aggregate* curve (AE…” |
| PMLs for a portfolio are not additive across contracts or perils; the combined PML must be assessed by re-running the model on the combined… | fact | tagged | Catastrophe Exposure Management: “Model-based portfolio management judges each new account by its *marginal* effect $\Delta\rho$ on t…” |
| Writing a contract exposed to a different peril than the one driving the existing PML provides diversification benefit, so the reinsurer's … | fact | tagged | Catastrophe Exposure Management: “An account in an unrelated region can add little to the portfolio's tail; the same account in the p…” |
| A reinsurer's capital requirement is that its capital must cover its 1-in-N PML (the survival standard), so a new contract is acceptable if… | fact | tagged | Probable Maximum Loss: “net PML — after reinsurance and after any reinstatement premiums — is what actually hits capital. O…” |

</details>

<details><summary><code>cas8-2018-q17</code> · gap</summary>

Tagged pages: Catastrophe Modelling, Catastrophe Modelling Framework

| Item | Kind | Status | Where |
|---|---|---|---|
| The inventory module of a catastrophe model describes the properties at risk (location, construction type, and other characteristics of the… | definition | tagged | Catastrophe Modelling: “the exposed properties (construction type, building codes, built value, contents)” |
| The vulnerability module of a catastrophe model quantifies the physical damage to properties at risk from a given hazard intensity, i.e. th… | definition | syllabus | Catastrophe Risk: “*vulnerability* (damage given intensity)” |
| A change in a building's construction characteristics affects both the inventory module (to identify the new construction type in the portf… | fact | syllabus | Catastrophe Risk: “Grossi and Kunreuther describe a catastrophe model in four parts: *hazard* (where events occur, how…” |
| Aleatory uncertainty is the inherent randomness of the hazard event itself (process risk), while epistemic uncertainty stems from lack of k… | definition | syllabus | Catastrophe Risk: “*Aleatory* uncertainty is the inherent randomness of events and cannot be reduced; *epistemic* unce…” |
| Uncertainty about the effectiveness of a new, untested technique with no historical performance data and no expert consensus is epistemic u… | fact | syllabus | Catastrophe Risk: “*Aleatory* uncertainty is the inherent randomness of events and cannot be reduced; *epistemic* unce…” |
| A logic tree incorporates uncertainty by assigning probability weights (based on expert opinion) to alternative parameter values or model b… | procedure | missing |  |
| Simulation incorporates uncertainty by randomly sampling parameter values from probability distributions over many trials to produce a dist… | procedure | elsewhere | Parameter Risk (collapsed): “A simulation draws the parameter and *then* the outcome for each iteration, and ranks the outcomes.” |

</details>

<details><summary><code>cas8-2019-q17</code> · answerable</summary>

Tagged pages: Sliding Scale Commissions, Quota Share, Reinsurance Pricing, Reinsurance Contract Provisions

| Item | Kind | Status | Where |
|---|---|---|---|
| A sliding-scale commission varies the ceding commission inversely with the loss ratio, between a minimum commission at a high loss ratio an… | definition | tagged | Sliding Scale Commissions: “A Sliding Scale Commission is a ceding commission on a proportional treaty that varies inversely wi…” |
| To find the commission for a given loss ratio, start at the commission at the nearest scale breakpoint and adjust by the slide rate times t… | procedure | tagged | Sliding Scale Commissions: “c(\text{LR}) = \min\left(c_{\max},\; \max\left(c_{\min},\; c_0 + s\,(\text{LR}_0 - \text{LR})\right…” |
| The reinsurer's technical ratio is the expected loss ratio plus the ceding commission ratio (plus other expense loads), representing the re… | definition | tagged | Quota Share: “\text{Reinsurer's ratio} = \text{ELR} + c + b + e” |
| A carry-forward provision in a sliding-scale commission lets loss ratio experience above the minimum-commission loss ratio (the excess not … | definition | tagged | Sliding Scale Commissions: “Past deficits above the minimum-commission loss ratio can be carried into the current year.” |
| To value a carry-forward, compute the expected carry-forward amount from year 1 (probability-weighted loss ratio excess over the minimum-co… | procedure | tagged | Sliding Scale Commissions: “Priced for a single year, this simply shifts the slide by the carryforward.” |
| The expected technical ratio over a loss distribution is the probability-weighted average of the technical ratios (or loss ratios plus comm… | fact | tagged | Sliding Scale Commissions: “E[c] = \sum_i p_i \, c(\text{LR}_i)” |

</details>

<details><summary><code>cas8-2019-q18</code> · untagged</summary>

Tagged pages: Reinsurance Pricing, Exposure Curves, Profit Commission, Quota Share, Loss Cost, Treaty Reinsurance

| Item | Kind | Status | Where |
|---|---|---|---|
| Experience loss cost for an excess layer is estimated by averaging historical on-level trended layer loss costs (per unit of subject premiu… | procedure | tagged | Loss Cost: “An [[Excess of Loss\\|excess of loss]] layer gets its loss cost from **experience rating**, the *bur…” |
| An exposure curve G(x) gives the proportion of total (ground-up) pure risk premium that falls below a loss size x expressed as a fraction o… | definition | tagged | Exposure Curves: “**Exposure Curves** give, for a class of property risks, the share of expected loss that falls belo…” |
| Exposure-rated layer loss cost equals the expected subject loss ratio (pure risk premium ratio) times the exposure curve's layer share, wit… | procedure | tagged | Reinsurance Pricing: “$\text{EF}$ times subject premium times the expected loss ratio is the layer loss ([[Limited Expect…” |
| Experience and exposure loss cost estimates are combined as a credibility-weighted average: Z times the experience estimate plus (1 − Z) ti… | procedure | elsewhere | Complement of Credibility: “$$\text{Estimate} = Z \times \text{Experience} + (1 - Z) \times \text{Complement}$$” |
| Ceded premium for an excess treaty equals expected ceded losses divided by the ceded loss ratio; ceded loss equals loss cost times subject … | formula | tagged | Treaty Reinsurance: “$$\text{Loss cost} = \frac{E[\text{Ceded loss}]}{\text{Subject premium}}$$” |
| Insurer's net underwriting profit after reinsurance = gross premium + ceding commission received − premium ceded (quota share and excess) −… | procedure | elsewhere | Net of Reinsurance: “$$\text{Net} = \text{Gross} - \text{Ceded}$$” |
| A quota share cedes a fixed percentage of premium and losses to the reinsurer, and the reinsurer pays the cedent a ceding commission as a p… | definition | tagged | Quota Share: “**Quota Share** is a proportional treaty in which the reinsurer takes a fixed percentage $a$ of the…” |
| Profit commission each year = profit-commission % × max(0, 1 − ceded loss ratio − ceding commission − reinsurer margin), applied to ceded p… | formula | tagged | Profit Commission: “$$\text{PC} = k \times \max\left(0,\; 1 - \text{LR} - c - m\right)$$” |
| A profit commission is variable and pays only when results are favorable (rewards good underwriting/risk control, but is less stable and ma… | fact | tagged | Profit Commission: “It is paid only when that profit is positive, so the cedant shares the upside and never the downsid…” |

</details>

<details><summary><code>cas8-2019-q19</code> · answerable</summary>

Tagged pages: Probable Maximum Loss, Quota Share, Catastrophe Risk, Coefficient of Variation, Risk Loads

| Item | Kind | Status | Where |
|---|---|---|---|
| The return period of a loss level is the average number of years between exceedances of that level; a 1-in-N year return period corresponds… | definition | tagged | Probable Maximum Loss: “A $1$-in-$500$ event has a $0.2\%$ annual probability; over $30$ years the probability of at least …” |
| To find the probability that retained loss exceeds a given amount, read the return period at that loss level off the exceedance curve (loss… | procedure | tagged | Catastrophe Risk: “The year's total exceeds $70$ once in $1/0.005 = 200$ years.” |
| A quota share treaty cedes the same fixed proportion of every loss, so the retained loss distribution is the gross distribution scaled down… | fact | tagged | Quota Share: “Net loss is $(1-a)X$, so its coefficient of variation equals gross.” |
| The quota share percentage equals 1 minus the ratio of retained loss to gross loss at any given return period (equivalently, 1 minus retain… | formula | tagged | Quota Share: “Net loss is $(1-a)X$, so its coefficient of variation equals gross.” |
| A reinsurance layer with a higher coefficient of variation of ceded loss (more volatile, tail-focused coverage) carries more uncertainty an… | fact | tagged | Risk Loads: “*standard deviation*: $P = E[X] + k\,\sigma(X)$ — the load scales with share, so a 50% share pays h…” |

</details>

<details><summary><code>cas9-2013-q12</code> · answerable</summary>

Tagged pages: Structured Finance, Correlation, Credit Risk, Securitization

| Item | Kind | Status | Where |
|---|---|---|---|
| A tranche in a CDO pool absorbs losses in order of seniority: the junior tranche takes the first slice of loss, the mezzanine the next slic… | fact | tagged | Structured Finance: “The tranche loses nothing until the claims beneath it are exhausted, then absorbs everything up to …” |
| With perfectly correlated defaults, all bonds in the pool default together, so the probability that the pool suffers any given level of los… | fact | tagged | Structured Finance (collapsed): “At $\rho = 1$ the structure achieves no enhancement at all.” |
| With independent (uncorrelated) defaults, the number of defaulting bonds is binomial, and the probability a tranche defaults is the probabi… | procedure | tagged | Structured Finance: “With $N \sim \text{Bin}(10, p)$ defaults, equity is impaired if $N \geq 1$, mezzanine if $N \geq 2$…” |
| Underestimating default probabilities (and ignoring correlation) made senior CDO tranches appear very safe, so rating agencies gave them AA… | fact | tagged | Structured Finance: “so it is acutely sensitive to **default [[Correlation\\|correlation]]** and to errors in default pro…” |
| When underlying defaults rose above the estimated levels, the CDO structure magnified the effect of the underestimation, so senior tranches… | fact | tagged | Structured Finance: “Coval, Jurek & Stafford's first point is that tranching **amplifies** those errors, and re-tranchin…” |

</details>

<details><summary><code>cas9-2013-q13</code> · gap</summary>

Tagged pages: CAT Bonds, Insurance-Linked Securities, Credit Risk, Catastrophe Risk

| Item | Kind | Status | Where |
|---|---|---|---|
| A CAT bond's limit is fully collateralized (investor funds are held in a trust via the special purpose reinsurer), so the issuer faces esse… | fact | tagged | Catastrophe Risk: “A cat bond's principal is held in a collateral trust, largely removing counterparty credit risk.” |
| A catastrophe risk swap is an unfunded agreement to pay on a covered event, so each party is exposed to counterparty default risk that can … | fact | missing |  |
| Basis risk is the risk that the payoff from a risk transfer instrument does not match the insurer's actual loss; it is driven by the trigge… | definition | tagged | CAT Bonds: “**Basis risk** — the gap between the sponsor's actual loss and its recovery — is two-sided, and it …” |
| Trigger types (indemnity, index, parametric) determine basis risk: indemnity triggers have the least basis risk but are less liked by inves… | fact | tagged | CAT Bonds: “**Triggers** — indemnity at one end (no basis risk, the most moral hazard) and parametric at the ot…” |
| A CAT bond acts like excess-of-loss reinsurance and gives the issuing company no risk diversification; the diversification benefit (catastr… | fact | tagged | Insurance-Linked Securities: “Because [[Catastrophe Risk\\|catastrophe losses]] are nearly independent of financial markets, inves…” |
| A catastrophe risk swap exchanges uncorrelated catastrophe exposures (e.g., different regions or perils) between two parties, giving each r… | fact | missing |  |

</details>

<details><summary><code>cas9-2013-q15</code> · answerable</summary>

Tagged pages: Risk-Adjusted Performance, Risk Capital, Cost of Capital

| Item | Kind | Status | Where |
|---|---|---|---|
| RAROC = [(Premium − Expenses) × (1 + investment return) − PV of losses] / Required capital, i.e., risk-adjusted underwriting-plus-investmen… | formula | tagged | Risk-Adjusted Performance: “$$\text{RAROC}_i = \frac{\text{NOI}_i}{C_i}$$” |
| EVA = (Premium − Expenses) × (1 + investment return) − losses discounted to the end of the year − (cost of capital rate × capital held). | formula | tagged | Risk-Adjusted Performance: “$$\text{EVA}_i = \text{NOI}_i - k\,C_i$$” |
| Investment income is earned only on policyholder-supplied funds (premium net of immediately paid expenses), not on the capital; a discounte… | fact | tagged | Risk-Adjusted Performance: “Conventions differ on the capital itself: some credit the line with investment income on its alloca…” |
| A line is acceptable if its RAROC exceeds the target risk-adjusted return on capital (or equivalently its EVA is positive), so if capital i… | fact | tagged | Risk-Adjusted Performance: “Since $\text{EVA}_i = (\text{RAROC}_i - k)\,C_i$, a unit creates value exactly when its RAROC excee…” |
| When capital is constrained so that only some lines can be written, rank the lines by risk-adjusted performance (higher RAROC, or higher EV… | procedure | tagged | Risk-Adjusted Performance: “**RAROC ranks, EVA sizes.** RAROC is a ratio; EVA is in dollars and adds across units (when the all…” |

</details>

<details><summary><code>cas9-2013-q9</code> · gap</summary>

Tagged pages: Economic Value, Interest Rate Risk, Present Value

| Item | Kind | Status | Where |
|---|---|---|---|
| Total economic value of a firm equals its current economic value plus its franchise value. | definition | tagged | Interest Rate Risk: “$F$ is **franchise value** — the present value of profits on future renewals — and $V = A - L + F$ …” |
| Current economic value equals surplus plus premium minus expenses minus the present value of losses (discounted at the risk-free rate), whe… | formula | tagged | Economic Value: “**Two equivalent views.** The *policy* view values premium less expenses less losses, all in [[Pres…” |
| Franchise value is the one-year economic profit (P - E - PV of losses) times d/(1-d), where d = retention rate/(1 + risk-free rate), reflec… | formula | elsewhere | Lifetime Value: “${}_{t}p$ is the probability the customer is still on the books at time $t$ and $r$ the discount ra…” |
| Panning's franchise value formula is F = c·s·(a + b·y) / ((1+y)(1+y−c_r)), where c_r is the client retention rate, s is surplus, y is the r… | formula | missing |  |
| Discounting and the franchise multiplier use the risk-free rate, not the firm's target return on surplus; the target return only determines… | fact | linked | Cost of Capital: “The part pricing must recover is the required return **less** what the capital earns while it is he…” |
| In a competitive market, the price is set so that the one-year economic profit (P − E − PV of losses) equals the spread between target retu… | fact | linked | Cost of Capital (collapsed): “After tax, the capital earns $5\% \times (1 - 0.21) = 3.95\%$ while held. Underwriting must supply …” |

</details>

<details><summary><code>cas9-2014-q10</code> · gap</summary>

Tagged pages: Interest Rate Risk, Duration, Economic Value

| Item | Kind | Status | Where |
|---|---|---|---|
| Franchise value is the present value of the expected future excess profits (returns above the required return on surplus) from renewing bus… | definition | tagged | Interest Rate Risk: “$F$ is **franchise value** — the present value of profits on future renewals — and $V = A - L + F$ …” |
| Franchise value F = c·r·S·(a + b·y − y) / [(1 + y)(1 + y − c·r)] when the target return on surplus is k = a + b·y, where cr is the client r… | formula | missing |  |
| Duration of franchise value D_F = (a − b + 1) / [(1 + y)(a + b·y − y)] + 1 / (1 + y − c·r), measuring the sensitivity of franchise value to… | formula | missing |  |
| When choosing a pricing strategy, a higher franchise value is preferred, and a lower duration of franchise value is preferred because it me… | fact | tagged | Interest Rate Risk: “Panning's alternative is a **pricing strategy** whose target return moves with interest rates, whic…” |
| The target return on surplus can be modeled as k = a + b·y, where b measures how much the target return moves with the risk-free rate; pric… | fact | tagged | Interest Rate Risk: “Panning's alternative is a **pricing strategy** whose target return moves with interest rates, whic…” |

</details>

<details><summary><code>cas9-2014-q13</code> · gap</summary>

Tagged pages: Securitization, CAT Bonds, Insurance-Linked Securities, Structured Finance

| Item | Kind | Status | Where |
|---|---|---|---|
| Fannie Mae and Freddie Mac purchased whole mortgages from originators to free lenders' balance sheets, increasing mortgage credit availabil… | fact | missing |  |
| A pass-through mortgage security pools mortgages and passes the principal and interest cash flows to investors, without splitting cash flow… | definition | elsewhere | Mortgage-Backed Security: “A **Mortgage-Backed Security** (MBS) is a bond whose cash flows come from a pool of [[Mortgage Loan…” |
| Pass-through securitization opened capital markets to fund mortgages, increasing mortgage capital and availability, and gave investors a hi… | fact | tagged | Securitization: “**Securitization** is the transfer of a pool of assets — or of a defined block of insurance risk — …” |
| Catastrophe bonds securitize insurance risk by transferring catastrophe exposure to capital market investors, who value its low correlation… | fact | tagged | Securitization: “Catastrophe losses are nearly uncorrelated with financial markets, so investors earn a diversifier.” |
| Reinsurance (including quota share, fronting, loss portfolio transfers of reserves, and sidecars) transfers purchased blocks of insurance r… | fact | syllabus | Types of Reinsurance: “**Function (Exam 7).** Capacity to write larger risks than surplus supports; stabilisation of resul…” |
| Government-backed residual market mechanisms and facilities (e.g., NFIP, Citizens, FHCF) provide coverage availability where the private ma… | fact | elsewhere | Florida Hurricane Catastrophe Fund: “Created in November 1993 after Hurricane Andrew (1992) caused over $\$15$ billion of insured losses…” |

</details>

<details><summary><code>cas9-2014-q16</code> · answerable</summary>

Tagged pages: Structured Finance, CAT Bonds, Securitization, Correlation

| Item | Kind | Status | Where |
|---|---|---|---|
| Under CAPM, a security's theoretical required return depends on its systematic (market) risk (beta/covariance with the market); idiosyncrat… | fact | syllabus | Cost of Capital: “In practice underwriting betas are hard to estimate, and the CAPM prices only systematic risk, wher…” |
| To compare securities with the same market-expected return under CAPM, compare their systematic risk: the security with less systematic ris… | procedure | tagged | Structured Finance: “Idiosyncratic defaults diversify away in a large pool, so a senior tranche is impaired only in a se…” |
| Catastrophe bond risk is largely uncorrelated with the market (low systematic risk), whereas CDO tranches, especially senior tranches of CD… | fact | tagged | Structured Finance: “Idiosyncratic defaults diversify away in a large pool, so a senior tranche is impaired only in a se…” |
| In a CDO, the junior tranche absorbs losses first, then mezzanine, then senior tranches; so a rise in underlying default probability hurts … | fact | tagged | Structured Finance: “so that losses hit the junior tranches first and the senior tranches can be far safer than the aver…” |
| A catastrophe bond (single underlying risk) loses value roughly in proportion to an increase in its default probability, and is unaffected … | fact | tagged | Structured Finance: “A single bond's rating needs only its own default probability; a senior tranche's needs the probabi…” |
| Higher default correlation does not change individual default probabilities; it makes defaults more likely to cluster, shifting risk from j… | fact | tagged | Structured Finance: “A modest correlation of $0.2$ nearly **triples** the senior tranche's default probability while mov…” |
| Increased risk of a security lowers its market price (for a given expected cash flow, higher risk means a lower price and higher expected r… | fact | linked | Credit Risk: “A deterioration in credit standing widens a bond's credit spread over the risk-free curve and lower…” |

</details>

<details><summary><code>cas9-2015-q14</code> · answerable</summary>

Tagged pages: CAT Bonds, Structured Finance, Securitization, Model Risk

| Item | Kind | Status | Where |
|---|---|---|---|
| A CAT bond is a security whose principal is lost or reduced if a defined catastrophe trigger (indemnity, index, parametric or modeled loss)… | definition | tagged | CAT Bonds: “**CAT Bonds** (catastrophe bonds) are fully collateralised securities through which an insurer or r…” |
| A special purpose reinsurer (SPR) is an entity that issues the CAT bond, holds the collateral, and shields investors from the sponsoring in… | definition | tagged | CAT Bonds: “The sponsor enters a reinsurance (or derivative) contract with a single-purpose reinsurer, usually …” |
| A CDO or CMO pools underlying securities or mortgages and divides the cash flows into tranches of differing seniority, so losses are absorb… | definition | tagged | Structured Finance: “the pooling of credit-sensitive assets — loans, bonds, mortgages — in a special purpose vehicle, fo…” |
| Tranche ratings and values of structured securities are extremely sensitive to the correlation assumptions among the underlying assets. Und… | fact | tagged | Structured Finance: “A tranche's rating depends on the joint distribution.” |
| Natural catastrophe risk is largely diversifiable and has low correlation with financial markets and the economy, whereas mortgage default … | fact | tagged | Structured Finance: “Idiosyncratic defaults diversify away in a large pool, so a senior tranche is impaired only in a se…” |
| Key drivers of the subprime crisis were a huge MBS market integral to the economy, pass-through of mortgage risk to investors with moral ha… | fact | tagged | Securitization: “An originator that sells everything it makes has little reason to underwrite carefully ([[Moral Haz…” |
| CAT bond trigger types trade off moral hazard against basis risk: indemnity triggers carry more moral hazard, while index or parametric tri… | fact | tagged | CAT Bonds: “Indemnity — the sponsor's actual losses. No basis risk, but [[Moral Hazard\\|moral hazard]] in claim…” |
| CAT bonds are typically structured with a swap of fixed for floating payments, which shields investors from interest rate risk, and they co… | fact | tagged | Securitization: “The securities are **fully collateralised**, removing the [[Reinsurance Credit Risk\\|reinsurer cred…” |
| Regulatory safeguards for structured securities include requiring transparent, independent assessment of correlation and model risk, limiti… | procedure | tagged | Securitization: “after [[Dodd-Frank]], U.S. securitizers must generally retain at least $5\%$ of the credit risk.” |

</details>

<details><summary><code>cas9-2015-q15</code> · gap</summary>

Tagged pages: Risk-Adjusted Performance, Risk-Adjusted Pricing, Return on Capital, Risk Capital

| Item | Kind | Status | Where |
|---|---|---|---|
| Economic profit of a line = premium net of expenses, grown at the investment return (premium and expenses are paid up front), minus the los… | formula | tagged | Risk-Adjusted Performance: “$\text{NOI}_i$ is the unit's net operating income (pre- or after-tax, with the hurdle on the same b…” |
| RAROC (risk-adjusted return on capital) equals economic profit divided by required capital. | formula | tagged | Risk-Adjusted Performance: “$$\text{RAROC}_i = \frac{\text{NOI}_i}{C_i}$$” |
| Economic profit (an absolute dollar measure) and RAROC (a return per dollar of capital) can rank alternatives differently, since a line wit… | fact | tagged | Risk-Adjusted Performance: “RAROC is a ratio; EVA is in dollars and adds across units (when the allocation is complete), which …” |
| To find the additional premium needed to reach a target RAROC, set RAROC equal to the target with the premium increased by an unknown amoun… | procedure | tagged | Risk-Adjusted Pricing: “the premium that earns hurdle $k$ is $P_i = \text{PV}(E[L_i]) + \text{PV}(\text{expenses}_i) + \fra…” |
| When premium is raised, the expense ratio and loss ratio assumptions determine how expenses and losses scale with the added premium; if the… | fact | missing |  |

</details>

<details><summary><code>cas9-2015-q18</code> · gap</summary>

Tagged pages: Risk-Adjusted Performance, Risk Capital, Cost of Capital, Line of Business, Insurance Cash Flows

| Item | Kind | Status | Where |
|---|---|---|---|
| The discounted loss ratio equals the undiscounted loss ratio divided by (1 + interest rate) raised to the loss reserve duration, since loss… | formula | missing |  |
| Risk-adjusted net profit for a line, measured at time 0, equals (1 - discounted loss ratio - expense ratio) times premium, with expenses pa… | formula | tagged | Insurance Cash Flows: “The premium must fund expenses, the margin and the discounted losses, so $P(1 - 0.25 - 0.05) = \tex…” |
| Allocate total required capital to each line in proportion to its Co-CTE: line Co-CTE divided by the sum of line Co-CTEs, times total requi… | procedure | tagged | Risk Capital: “**Co-measures and margin allocation** — co-TVaR allocates by each unit's average loss in the tail; …” |
| RAROC is risk-adjusted net profit divided by allocated capital. | definition | tagged | Risk-Adjusted Performance: “$$\text{RAROC}_i = \frac{\text{NOI}_i}{C_i}$$” |
| A line adds value on a risk-adjusted basis if its RAROC exceeds the cost of capital; equivalently, if its economic value added (net profit … | fact | tagged | Risk-Adjusted Performance: “Since $\text{EVA}_i = (\text{RAROC}_i - k)\,C_i$, a unit creates value exactly when its RAROC excee…” |
| Economic value added equals risk-adjusted net profit minus the cost of capital multiplied by allocated capital. | formula | tagged | Risk-Adjusted Performance: “$$\text{EVA}_i = \text{NOI}_i - k\,C_i$$” |

</details>

<details><summary><code>cas9-2016-q15</code> · gap</summary>

Tagged pages: Interest Rate Risk, Economic Value, Duration

| Item | Kind | Status | Where |
|---|---|---|---|
| Current economic value of an insurer equals surplus plus written premium minus expenses minus expected losses discounted at the risk-free r… | formula | tagged | Economic Value: “$$V_0 = \sum_{t} \frac{E[CF_t]}{(1 + r)^{t}}$$” |
| Total economic (market) value equals current economic value plus franchise value, so franchise value is total market value minus current ec… | fact | tagged | Interest Rate Risk: “$F$ is **franchise value** — the present value of profits on future renewals — and $V = A - L + F$ …” |
| Under a fixed target return on surplus, franchise value equals (P - E - L/(1+y)) times d/(1-d), where d is the discount factor reflecting r… | formula | missing |  |
| The retention-based discount factor d equals the client retention rate cr divided by (1+y), so cr = d(1+y). | formula | missing |  |
| When target return on surplus varies with the risk-free rate as k = a + b·y, franchise value equals cr·S·[a + y(b-1)] / (1+y) / (1+y-cr). | formula | missing |  |
| Premium under a target return on surplus k is P = [S(k - y) + L]/(1+y) + E, with k = a + b·y under the variable strategy. | formula | missing |  |
| Duration of franchise value under variable target return pricing is D_f = (a-b+1)/(1+y)/(a+b·y-y) + 1/(1+y-cr). | formula | missing |  |
| A variable target return strategy (k tied to interest rates) is more plausible than a fixed one because it gives a realistic retention belo… | fact | tagged | Interest Rate Risk: “Panning's alternative is a **pricing strategy** whose target return moves with interest rates, whic…” |

</details>

<details><summary><code>cas9-2016-q18</code> · answerable</summary>

Tagged pages: Structured Finance, Securitization, Correlation, Credit Risk

| Item | Kind | Status | Where |
|---|---|---|---|
| A CDO is a securitization that pools underlying credit assets (e.g., mortgages) and splits the pooled losses into tranches (junior and seni… | definition | tagged | Structured Finance: “is the pooling of credit-sensitive assets — loans, bonds, mortgages — in a special purpose vehicle,…” |
| The junior tranche absorbs the first losses, so with two underlying securities it defaults if at least one underlying defaults, while the s… | fact | tagged | Structured Finance (collapsed): “The senior tranche defaults only if **both** bonds default; the junior defaults if **either** does.” |
| Compute a tranche's default probability for uncorrelated (independent) underlying securities using binomial logic: junior = P(1 default)+P(… | procedure | tagged | Structured Finance (collapsed): “P(\text{junior defaults}) &= 2p - p_{DD} \\” |
| Compute a CDO^2 tranche's default probability by treating the underlying CDO tranches' default probabilities as the inputs, applying the sa… | procedure | tagged | Structured Finance (collapsed): “The senior tranche defaults only if **both** bonds default; the junior defaults if **either** does.” |
| Construct a synthetic security from the junior tranches of a CDO and a CDO^2; its senior tranche defaults only when both underlying tranche… | procedure | tagged | Structured Finance (collapsed): “The senior tranche defaults only if **both** bonds default; the junior defaults if **either** does.” |
| Higher default correlation among underlying assets raises the probability of joint defaults, thereby increasing the default probability of … | fact | tagged | Credit Risk: “Coval, Jurek & Stafford's AAA senior tranche falls to A+ at a correlation of 40% and to BBB− at 60%” |

</details>

<details><summary><code>cas9-2016-q19</code> · answerable</summary>

Tagged pages: Insurance-Linked Securities, Risk Capital, Catastrophe Risk, Risk Measure, Risk Mitigation

| Item | Kind | Status | Where |
|---|---|---|---|
| An Industry Loss Warranty (ILW) is a reinsurance/hedge contract whose payout is triggered by the size of an industry-wide loss (and, for a … | definition | tagged | Insurance-Linked Securities: “**Industry loss warranties** (ILWs) — pay a fixed limit if an industry loss index exceeds a trigger…” |
| A binary-triggered ILW pays its full limit when the trigger conditions are met (industry loss above the warranty trigger and the buyer's lo… | fact | tagged | Insurance-Linked Securities (collapsed): “An insurer buys a $\$50$ million ILW in reinsurance form: it pays the full limit if U.S. hurricane …” |
| Compute the reinsurer's loss from the ground-up loss on an excess-of-retention layer as the amount above the attachment point, capped at th… | procedure | linked | Excess of Loss: “the reinsurer pays the part of each loss — per risk or per occurrence — above the cedant's retentio…” |
| The premium for a reinsurance cover equals the rate on line multiplied by the coverage limit. | formula | linked | Excess of Loss: “*rate on line* $=$ premium $\div L$” |
| The p% Conditional Tail Expectation (CTE) is the average of the losses in the worst (1-p) tail of the simulated loss distribution; with equ… | definition | tagged | Risk Measure: “The **conditional tail expectation** $E[X \mid X \geq \text{VaR}_p]$ equals TVaR for a continuous l…” |
| Risk capital is set equal to the CTE of the loss distribution minus the expected loss. | formula | tagged | Risk Capital: “$$C = \rho(X) - E[X]$$” |
| Evaluate a risk mitigation tool by computing risk capital on gross losses and on net losses (gross loss minus the hedge payout, with the co… | procedure | tagged | Risk Mitigation: “$\Delta C$ is the capital released, $C_{\text{before}} - C_{\text{after}}$, where required capital …” |
| Basis risk is the risk that a hedge's payout is imperfectly correlated with the buyer's actual losses, so the buyer may receive no recovery… | definition | tagged | Catastrophe Risk: “Its trigger — indemnity (the sponsor's own losses), industry index, parametric (physical event meas…” |

</details>

<details><summary><code>cas9-2016-q22</code> · answerable</summary>

Tagged pages: Risk Capital, Risk-Adjusted Performance, Cost of Capital, Business Unit

| Item | Kind | Status | Where |
|---|---|---|---|
| The Myers-Read method allocates 100% of the firm's total required capital (marginal capital amounts are additive and sum to the total), so … | fact | tagged | Risk Capital: “For a measure that scales with the portfolio these add up exactly (Euler's theorem)” |
| The Merton-Perold method does not allocate all required capital; the sum of the marginal capitals is less than the total capital, leaving u… | fact | tagged | Risk Capital: “Correct for adding or dropping a whole line, but the pieces do not in general sum to $C$ — they can…” |
| Because lines of business are imperfectly correlated, combining them yields diversification benefits, so capital for the combined firm (or … | fact | tagged | Risk Capital: “The gap below the sum of standalone amounts is the **diversification benefit**; how to share it is …” |
| Underwriting profit (with expenses paid at the start and loss discounted) = premium × (1 − discounted loss ratio − expense ratio); expected… | formula | linked | Risk-Adjusted Pricing: “With allocated capital $C_i$ held for one period, invested at yield $y$ and credited to the line, a…” |
| RAROC = risk-adjusted expected profit divided by allocated capital; a line or portfolio adds value if RAROC exceeds the cost of capital (eq… | formula | tagged | Risk-Adjusted Performance: “Since $\text{EVA}_i = (\text{RAROC}_i - k)\,C_i$, a unit creates value exactly when its RAROC excee…” |
| To decide between writing a line standalone versus all lines together, compute RAROC using standalone capital for individual lines and usin… | procedure | tagged | Business Unit: “Charged on standalone capital, a unit is over-charged and will underwrite too little of the busines…” |

</details>

<details><summary><code>cas9-2016-q23</code> · answerable</summary>

Tagged pages: Risk-Adjusted Performance, Return on Capital, Cost of Capital

| Item | Kind | Status | Where |
|---|---|---|---|
| RAROC (risk-adjusted return on capital) is risk-adjusted net income divided by required capital, and it is used to compare lines of busines… | definition | tagged | Risk-Adjusted Performance: “$$\text{RAROC}_i = \frac{\text{NOI}_i}{C_i}$$” |
| Net income for a line equals (premium minus expenses) accumulated at the investment return, minus losses paid at the end of the year: (P - … | formula | tagged | Risk-Adjusted Performance: “$\text{NOI}_i$ is the unit's net operating income (pre- or after-tax, with the hurdle on the same b…” |
| In the RAROC methodology, investment income earned on the capital is excluded from the line's income because it belongs to the stockholders… | fact | tagged | Risk-Adjusted Performance: “others credit only the policyholder-supplied funds — as CAS's model solution to Exam 9 Spring 2013 …” |
| Put the loss ratio on the same time basis as the rest of the cash flows: a loss ratio discounted to time 0 is multiplied by (1+y) to get th… | procedure | linked | Risk-Adjusted Pricing: “the capital earns $y$ while held, so pricing supplies only the spread, discounted from year end to …” |
| Compare each line's RAROC to the cost of capital (hurdle rate); pursue the line with the higher RAROC, provided it exceeds the cost of capi… | procedure | tagged | Risk-Adjusted Performance: “Since $\text{EVA}_i = (\text{RAROC}_i - k)\,C_i$, a unit creates value exactly when its RAROC excee…” |

</details>

<details><summary><code>cas9-2017-q12</code> · gap</summary>

Tagged pages: Interest Rate Risk, Economic Value, Duration

| Item | Kind | Status | Where |
|---|---|---|---|
| Franchise value is the economic value of an insurer's future renewal business (expected profits from policies that will renew), as distinct… | definition | tagged | Interest Rate Risk: “$F$ is **franchise value** — the present value of profits on future renewals — and $V = A - L + F$ …” |
| For constant client retention cr and risk-free rate y, franchise value = [P - E - L/(1+y)] * d/(1-d), where d = cr/(1+y) and the bracket is… | formula | missing |  |
| When client retention varies by year, compute franchise value by discounting and applying cumulative retention for each year: first-year re… | procedure | elsewhere | Lifetime Value: “$$\text{LTV} = \sum_{t=1}^{T} \frac{\left(P_t - L_t - E_t\right) \times {}_{t}p}{(1 + r)^{t}}$$” |
| Franchise value of a book of identical policies is the per-policy value scaled by the number of policies. | procedure | missing |  |
| Franchise value has a high duration and is highly sensitive to interest rates, so it is a large part of total economic value and raises the… | fact | tagged | Interest Rate Risk: “It has a long duration, especially when renewal premiums are priced to a fixed target return: a rat…” |
| The practical dilemma of managing franchise value: shortening invested asset duration may be insufficient to offset franchise value's durat… | fact | tagged | Interest Rate Risk: “Hedging it with asset duration alone may require a zero or negative asset duration — infeasible, an…” |
| Manage franchise value duration through pricing by making the target return on surplus a positive linear function of the risk-free rate (k … | procedure | tagged | Interest Rate Risk (collapsed): “Panning shows that changing the pricing rule so that the target return moves one-for-one with the r…” |

</details>

<details><summary><code>cas9-2017-q14</code> · gap</summary>

Tagged pages: Structured Finance, CAT Bonds, Correlation, Securitization

| Item | Kind | Status | Where |
|---|---|---|---|
| A CDO pools credit-risky assets and splits the pool into tranches of differing seniority, where junior tranches absorb losses first and sen… | definition | tagged | Structured Finance: “**Structured Finance** is the pooling of credit-sensitive assets — loans, bonds, mortgages — in a s…” |
| The default probability of CDO tranches depends on the correlation of the underlying assets: lower correlation among pooled assets lowers t… | fact | tagged | Structured Finance: “A single bond's rating needs only its own default probability; a senior tranche's needs the probabi…” |
| Catastrophe bonds exposed to different perils (e.g., hurricane and earthquake) are essentially uncorrelated, so a CDO pool mixing perils is… | fact | missing |  |
| Increasing the number of securities in a CDO pool (e.g., combining all bonds into a single pool) diversifies the pool and reduces the defau… | fact | tagged | Structured Finance: “Idiosyncratic defaults diversify away in a large pool, so a senior tranche is impaired only in a se…” |
| A CDO² (CDO-squared) is a CDO whose collateral pool consists of tranches of other CDOs rather than of underlying bonds. | definition | tagged | Structured Finance: “and re-tranching tranches (the CDO-squared) amplifies them again.” |
| To create additional AAA-rated securities, pool the non-AAA (junior/mezzanine) tranches of existing CDOs into a CDO² and tranche it, so tha… | procedure | tagged | Structured Finance: “and re-tranching tranches (the CDO-squared) amplifies them again.” |

</details>

<details><summary><code>cas9-2017-q15</code> · gap</summary>

Tagged pages: CAT Bonds, Insurance-Linked Securities, Reinsurance Pricing, Reinsurance Credit Risk

| Item | Kind | Status | Where |
|---|---|---|---|
| Rate on line (ROL) is reinsurance premium divided by the policy limit; loss on line (LOL) is expected loss divided by the policy limit. | definition | missing |  |
| The CAT bond spread (multiple) is the ratio of bond premium to expected loss, so it measures price paid per dollar of expected loss. | definition | tagged | CAT Bonds: “Offerings quote the attachment probability, the exhaustion probability and the **expected loss** (E…” |
| ROL/LOL equals premium divided by expected loss for a reinsurance layer, so it is directly comparable to the CAT bond spread as a price per… | definition | missing |  |
| To compare CAT bond and reinsurance costs, match the reinsurance LOL layer to the bond's expected loss percent of principal in the same yea… | procedure | missing |  |
| Reinsurance ROL/LOL multiples rise as layers become higher and less likely to be hit (lower LOL), so high excess layers are expensive per d… | fact | missing |  |
| CAT bonds are fully collateralized (no credit risk), often have multi-year pricing locks and lower margins and transaction costs, and cat r… | fact | tagged | CAT Bonds: “**CAT Bonds** (catastrophe bonds) are fully collateralised securities through which an insurer or r…” |

</details>

<details><summary><code>cas9-2017-q20</code> · gap</summary>

Tagged pages: Risk-Adjusted Performance, Risk Capital, Cost of Capital, Return on Capital, Financial Risk Management

| Item | Kind | Status | Where |
|---|---|---|---|
| RAROC (risk-adjusted return on capital) for a line is its net income divided by the capital allocated to it. | definition | tagged | Risk-Adjusted Performance: “$$\text{RAROC}_i = \frac{\text{NOI}_i}{C_i}$$” |
| Economic Value Added (EVA) for a line equals its net income minus the cost of capital times the capital allocated to it. | definition | tagged | Risk-Adjusted Performance: “$$\text{EVA}_i = \text{NOI}_i - k\,C_i$$” |
| A line adds shareholder value when its RAROC exceeds the cost of capital (EVA greater than 0), and destroys value when RAROC is below the c… | fact | tagged | Risk-Adjusted Performance: “Since $\text{EVA}_i = (\text{RAROC}_i - k)\,C_i$, a unit creates value exactly when its RAROC excee…” |
| Allocating capital to line of business lets management compute RAROC or EVA by line, then grow lines earning above the cost of capital and … | procedure | tagged | Risk-Adjusted Performance: “A unit below its hurdle can be repriced, reinsured (lowering its capital), re-underwritten or shrun…” |
| Using the exceedance probability curve at a chosen exceedance probability, read off the ratio of (expected loss plus capital) to expected l… | procedure | missing |  |
| Limitations of allocating capital by exceedance probability: the firm may lack enough capital to attain the chosen probability, it ignores … | fact | tagged | Risk Capital: “The EPD version is better, since it reflects the size of shortfalls, but both ignore diversificatio…” |

</details>

<details><summary><code>cas9-2018-q11</code> · answerable</summary>

Tagged pages: CAT Bonds, Insurance-Linked Securities, Moral Hazard

| Item | Kind | Status | Where |
|---|---|---|---|
| An indemnity trigger on a CAT bond pays out when the sponsoring insurer's own actual incurred losses from the event exceed a specified thre… | definition | tagged | CAT Bonds: “**Indemnity** — the sponsor's actual losses. No basis risk, but [[Moral Hazard\\|moral hazard]] in c…” |
| Index triggers on a CAT bond pay out based on an external measure rather than the insurer's own losses: industry loss index, modeled loss f… | definition | tagged | CAT Bonds: “**Industry index** — an industry loss estimate (PCS in the U.S.). Transparent and quick; basis risk…” |
| Indemnity triggers have the lowest basis risk for the issuer, so they are preferable to an issuer whose losses are poorly correlated with t… | fact | tagged | CAT Bonds: “indemnity at one end (no basis risk, the most moral hazard) and parametric at the other (the most b…” |
| Investors prefer index triggers (e.g. industry index) because they are more transparent and carry less moral hazard than indemnity triggers… | fact | tagged | CAT Bonds: “**Industry index** — an industry loss estimate (PCS in the U.S.). Transparent and quick; basis risk…” |
| An Industry Loss Warranty (ILW) is a reinsurance-like contract with dual triggers, paying only when both the buyer's own loss and the indus… | definition | tagged | Insurance-Linked Securities: “**Industry loss warranties** (ILWs) — pay a fixed limit if an industry loss index exceeds a trigger…” |
| Advantages of an ILW over a non-indemnity CAT bond for the buyer include lower basis risk through the buyer's own-loss trigger, lower cost … | fact | tagged | Insurance-Linked Securities: “Written as reinsurance they add a second trigger on the buyer's own loss, which supplies the indemn…” |

</details>

<details><summary><code>cas9-2018-q12</code> · untagged</summary>

Tagged pages: Structured Finance, Securitization, Correlation, Credit Risk

| Item | Kind | Status | Where |
|---|---|---|---|
| A junior CDO tranche absorbs the first losses and is wiped out if any underlying security defaults (for tranches whose width equals one sec… | fact | tagged | Structured Finance (collapsed): “The senior tranche defaults only if **both** bonds default; the junior defaults if **either** does.” |
| With independent defaults, the probability that at least one of n securities defaults is 1 minus the product of the individual survival pro… | procedure | tagged | Credit Risk: “For two default indicators with common probability $p$ and correlation $\rho$, $P(\text{both}) = p^…” |
| A CDO-squared is built by treating the junior tranches of underlying CDOs as the collateral; its tranche default probability is derived by … | procedure | tagged | Structured Finance (collapsed): “The senior tranche defaults only if **both** bonds default; the junior defaults if **either** does.” |
| With perfectly correlated defaults, all securities default together, so the senior tranche default probability equals the single-security d… | fact | tagged | Structured Finance (collapsed): “At $\rho = 1$ the structure achieves no enhancement at all.” |
| The price of a zero-coupon tranche paying a fixed amount at maturity or nothing at default equals the payoff times (1 minus default probabi… | formula | elsewhere | Risk-Neutral Valuation: “$$V_0 = e^{-rT}\, E^{\mathbb{Q}}\!\left[V_T\right]$$” |
| Structured securities such as CDOs and CDO^2 tranches have greater exposure to systematic (economy-wide) risk than single-name securities w… | fact | tagged | Structured Finance: “A rating measures default probability or expected loss, not *when* the loss occurs, so a AAA tranch…” |

</details>

<details><summary><code>cas9-2019-q10</code> · gap</summary>

Tagged pages: Structured Finance, Credit Risk, Securitization

| Item | Kind | Status | Where |
|---|---|---|---|
| A CDO tranche is defined by attachment points (percent of notional); a junior tranche absorbs losses first, so it is wiped out once any und… | definition | tagged | Structured Finance: “so that losses hit the junior tranches first and the senior tranches can be far safer than the aver…” |
| To find the default probability of a CDO tranche built from independent securities, compute the probability that enough securities default … | procedure | tagged | Structured Finance (collapsed): “The senior tranche defaults only if **both** bonds default; the junior defaults if **either** does.” |
| A CDO² is built from the junior tranches of underlying CDOs and treats those tranches as its securities; its senior tranche defaults only w… | procedure | tagged | Structured Finance (collapsed): “The senior tranche defaults only if **both** bonds default; the junior defaults if **either** does.” |
| Price of a risky zero-coupon-type tranche = promised payment × (1 − default probability) discounted at the discount rate over the number of… | formula | missing |  |
| The yield of a tranche paying a single amount at maturity is (Payoff/Price)^(1/T) − 1. | formula | elsewhere | Yield Rate: “the interest rate per period at which the present value of all future cash flows equals the current…” |
| Default premium is the difference between a risky security's yield (return) and the risk-free rate. | definition | elsewhere | Corporate Bond: “$$s = y_{\text{corp}} - y_{\text{govt}}$$” |
| A CDO² is a leveraged structure that compounds the default risk of the underlying CDO junior tranches, so its senior tranche's default prob… | fact | tagged | Structured Finance: “and re-tranching tranches (the CDO-squared) amplifies them again.” |

</details>

<details><summary><code>cas9-2019-q8</code> · gap</summary>

Tagged pages: Interest Rate Risk, Duration, Economic Value, Asset-Liability Portfolio, Cost of Capital

| Item | Kind | Status | Where |
|---|---|---|---|
| The CAPM target return on equity/surplus is k = r_f + beta × (E(r_m) − r_f). | formula | tagged | Cost of Capital: “$$k_E = r_f + \beta_E\,\bigl(E[r_m] - r_f\bigr)$$” |
| In Panning's framework, the target return is modeled as k = a + b·y, where y is the risk-free interest rate, b is the sensitivity of target… | definition | tagged | Interest Rate Risk (collapsed): “Panning shows that changing the pricing rule so that the target return moves one-for-one with the r…” |
| Current economic value (net asset value) equals surplus plus premium minus underwriting expenses minus the present value of expected losses… | formula | tagged | Economic Value: “The *policy* view values premium less expenses less losses, all in [[Present Value\\|present value]]…” |
| Franchise value (value of future new and renewal business) with retention ratio cr is F = cr·S·(a + b·y − y) / [(1+y)(1+y−cr)]. | formula | missing |  |
| With assets held in risk-free instruments matching the liability payout timing, the duration of current economic value is 1 (policyholder o… | fact | tagged | Interest Rate Risk (collapsed): “Panning's simplified insurer holds assets of $126.19$ against losses with present value $71.43$, bo…” |
| Duration of franchise value is D_F = (a − b + 1)/[(1+y)(a + b·y − y)] + 1/(1+y−cr). | formula | missing |  |
| Duration of total economic value is the value-weighted average of the durations of current economic value and franchise value: D_TEV = (C·D… | formula | tagged | Interest Rate Risk: “As with any portfolio, a total's duration is its dollar duration divided by its value” |
| Setting the target return as the risk-free rate plus a risk premium (b = 1) lowers the duration of total economic value and thus interest r… | fact | tagged | Interest Rate Risk: “Panning's alternative is a **pricing strategy** whose target return moves with interest rates, whic…” |

</details>

<details><summary><code>cas9-an-001</code> · answerable</summary>

Tagged pages: Facultative Reinsurance, Exposure Curves, Loss Cost

| Item | Kind | Status | Where |
|---|---|---|---|
| An exposure curve G(p) gives the share of a risk's expected loss that comes from losses capped at a fraction p of insured value (limited ex… | definition | tagged | Facultative Reinsurance: “$G$ is a property [[Exposure Curves\\|exposure curve]]: the share of expected loss below a given per…” |
| To price an excess layer by exposure rating, express the retention and the retention plus limit as fractions of insured value, and take the… | procedure | tagged | Facultative Reinsurance: “$$\text{Property XS share} = G\!\left(\frac{AP + Lim}{IV}\right) - G\!\left(\frac{AP}{IV}\right)$$” |
| The expected loss to a layer equals the layer's share of expected loss (from the exposure curve) times the risk's total expected loss, wher… | procedure | tagged | Facultative Reinsurance: “The share multiplies the policy's expected loss to give the certificate's [[Loss Cost\\|loss cost]].” |
| A facultative certificate covers a single risk, so it is priced like a per-risk treaty by applying the exposure curve to that one risk's in… | fact | tagged | Facultative Reinsurance: “**Pricing** is per risk: the formulas above are Clark's exposure-rating factors applied to a single…” |
| An excess layer's share of expected loss is not proportional to its limit as a fraction of insured value, because most property losses are … | fact | tagged | Exposure Curves: “$G(0) = 0$ and $G(1) = 1$, and $G$ is increasing and concave.” |

</details>

<details><summary><code>cas9-an-002</code> · gap</summary>

Tagged pages: Ratemaking, Catastrophe Modelling, Catastrophe Expected Loss Cost, Expense Provisions

| Item | Kind | Status | Where |
|---|---|---|---|
| Hurricane (catastrophe) losses are too rare and severe for a short experience period to estimate reliably, so actual catastrophe losses are… | fact | tagged | Catastrophe Expected Loss Cost: “it becomes the catastrophe provision in a rate in place of whatever catastrophe losses happened to …” |
| Replace actual catastrophe losses with a catastrophe model's expected annual loss and add it to the non-catastrophe pure premium after the … | procedure | linked | Catastrophe Loss: “$$\text{Total Pure Premium} = \text{Non-Cat PP} + \text{Cat Load}$$” |
| A catastrophe model provision already stated at the future policy period's cost level must not be developed or trended again. | fact | missing |  |
| With fixed and variable expenses, the indicated average rate = (projected pure premium + fixed expense per exposure) / (1 - variable expens… | formula | tagged | Expense Provisions: “$$\text{Rate} = \frac{\text{Pure Premium} + \text{Fixed Expense per Exposure}}{1 - V - Q_T}$$” |

</details>

<details><summary><code>cas9-an-003</code> · answerable</summary>

Tagged pages: Insurance Pricing, Insurance Margin, Return on Capital, Risk Loads

| Item | Kind | Status | Where |
|---|---|---|---|
| Premium equals expected loss plus a margin (risk margin), P = L + M, when expenses, taxes and investment income are ignored. | fact | tagged | Insurance Margin: “**Insurance Margin** $M$ is the part of the premium above expected loss — in Mildenhall and Major's…” |
| Total assets equal premium collected plus investor-contributed capital, so capital Q = a - P. | fact | tagged | Insurance Margin: “$P$ is premium, $L$ expected loss ($E[X \wedge a]$ strictly), $Q = a - P$ capital, $a$ assets” |
| Investors' required return on contributed capital is met by the margin: M = required return rate times capital contributed. | fact | tagged | Insurance Pricing: “$$P = L + \iota\, Q$$” |
| Premium with a required return ι on capital, assets a and expected loss L is P = (L + ι·a)/(1 + ι), derived from P = L + ι(a - P). | formula | tagged | Insurance Pricing: “$$P = \nu L + \delta a$$” |

</details>

<details><summary><code>cas9-an-004</code> · answerable</summary>

Tagged pages: Insurance Margin, Insurance Leverage, Return on Capital

| Item | Kind | Status | Where |
|---|---|---|---|
| Insurance margin is premium minus expected loss (M = P - L), and the margin as a percentage of premium is M/P. | definition | tagged | Insurance Margin: “**Insurance Margin** $M$ is the part of the premium above expected loss — in Mildenhall and Major's…” |
| In a one-period model with no expenses, taxes or investment income, the margin ratio M/P equals one minus the loss ratio L/P. | fact | tagged | Insurance Margin: “**Margin ratio** $M/P = 1 - L/P$ is the complement of the [[Loss Ratio\\|loss ratio]].” |
| Investor capital equals assets minus premium (Q = a - P), and return on capital is the margin divided by capital (M/Q). | definition | tagged | Insurance Margin: “$P$ is premium, $L$ expected loss ($E[X \wedge a]$ strictly), $Q = a - P$ capital, $a$ assets, $\io…” |
| With expected loss and assets fixed, the premium that earns required return ι on capital is P = (L + ιa)/(1 + ι), equivalently P = L + ι/(1… | formula | tagged | Insurance Margin: “$$M = \iota\, Q = \delta\,(a - L)$$” |
| A higher required return on capital raises the required premium and margin and, with assets fixed, reduces the capital investors must contr… | fact | tagged | Return on Capital: “Capital is the present value, at the risk discount factor, of what investors expect back: $Q = \nu(…” |
| Return on capital decomposes as the margin ratio times the premium-to-capital leverage ratio (M/Q = M/P × P/Q), so equal margin ratios give… | fact | tagged | Insurance Leverage: “$$\iota = \frac{M}{P} \cdot \frac{P}{Q}$$” |

</details>

<details><summary><code>cas9-an-005</code> · answerable</summary>

Tagged pages: Insurance Leverage, Insurance Margin, Return on Capital, Insurance Profitability

| Item | Kind | Status | Where |
|---|---|---|---|
| Margin is premium minus expected loss (in a model with no expenses, taxes or investment income), and the margin ratio is margin divided by … | definition | tagged | Insurance Margin: “**Insurance Margin** $M$ is the part of the premium above expected loss — in Mildenhall and Major's…” |
| Return on capital is the margin divided by the allocated capital. | definition | tagged | Return on Capital: “**Return on Capital** — Mildenhall and Major's $\iota$ — is the expected margin earned per unit of …” |
| Premium-to-capital leverage is premium divided by allocated capital. | definition | tagged | Insurance Leverage: “**Insurance Leverage** is the volume of business written per unit of capital supporting it — in Mil…” |
| Return on capital equals the margin ratio times premium-to-capital leverage: M/Q = (M/P) × (P/Q). | formula | tagged | Insurance Leverage: “$$\iota = \frac{M}{P} \cdot \frac{P}{Q}$$” |
| Lines should be compared on return on capital (margin per dollar of capital), not on margin ratio or dollar margin alone; a thin margin rat… | fact | tagged | Insurance Profitability: “A thin margin on a highly leveraged book and a fat margin on a lightly leveraged one can earn the s…” |

</details>

<details><summary><code>cas9-an-006</code> · answerable</summary>

Tagged pages: Insurance Profitability, Insurance Leverage, Insurance Margin, Return on Capital

| Item | Kind | Status | Where |
|---|---|---|---|
| Return on capital equals margin divided by capital, and decomposes as the product of the margin ratio (margin/premium) and premium-to-capit… | formula | tagged | Insurance Profitability: “$$\frac{M}{Q} = \frac{M}{P} \times \frac{P}{Q}$$” |
| Underwriting margin is premium minus expected loss (with no expenses, taxes or investment income), and the margin ratio is margin divided b… | definition | tagged | Insurance Profitability: “$$\frac{M}{P} = 1 - \frac{L}{P}$$” |
| Premium-to-capital leverage is written premium divided by allocated capital (P/Q), the inverse of capital-to-premium. | definition | tagged | Insurance Profitability: “[[Insurance Leverage\\|leverage]] (premium relative to capital)” |
| To find the leverage needed to earn a target return with premium and margin fixed, divide the target return on capital by the margin ratio. | procedure | tagged | Insurance Profitability: “Return equals margin ratio times premium-to-capital leverage, and the margin ratio is one minus the…” |

</details>

<details><summary><code>cas9-an-007</code> · answerable</summary>

Tagged pages: Insurer, Capital Structure, Return on Capital, Financial Risk

| Item | Kind | Status | Where |
|---|---|---|---|
| In Cummins's model, the insurer's return on equity equals the asset return times (1 + sum of liabilities-to-equity ratios) plus the sum ove… | formula | tagged | Capital Structure: “Net income is investment income on *all* assets plus underwriting profit, so, ignoring taxes and in…” |
| Invested assets equal equity plus total liabilities (reserves), so investment income is earned on both policyholder-supplied funds and owne… | fact | tagged | Insurer: “$$\text{Assets} = \text{Liabilities} + \text{Capital}$$” |
| Line underwriting return is underwriting profit divided by premium; the liabilities-to-equity ratio k_i is L_i/E and the premium-to-equity … | definition | tagged | Return on Capital: “**Return is margin times leverage**: $\iota = (M/P)(P/Q)$.” |
| Total insurer income is investment income on all assets plus underwriting profit of each line, and return on equity is this total income di… | fact | tagged | Capital Structure: “Net income is investment income on *all* assets plus underwriting profit, so, ignoring taxes and in…” |

</details>

<details><summary><code>cas9-an-008</code> · gap</summary>

Tagged pages: Insurance Policy, Risk-Adjusted Pricing, Insurance Pricing, Cost of Capital

| Item | Kind | Status | Where |
|---|---|---|---|
| In the insurance CAPM (Cummins, corrected), a line's required underwriting return as a percentage of premium is r_i = -(k_i/s_i) r_F + β_i … | formula | elsewhere | Financial Economics: “$$\text{UPM} = -k\,R_f + \beta_u\big[E(R_m) - R_f\big]$$” |
| The ratio k_i/s_i equals liabilities divided by premium (L_i/P_i), so the risk-free interest credit on policyholder-supplied funds must be … | fact | missing |  |
| Because the insurer earns the risk-free rate on policyholder-supplied funds, the required underwriting return is reduced by that investment… | fact | elsewhere | Financial Economics: “Fairley's model gives the insurer the risk-free rate on the premium it holds, $-k\,R_f$, plus a pre…” |
| Policyholders are charged only for the line's systematic (market-related) underwriting risk, measured by underwriting beta times the market… | fact | tagged | Cost of Capital: “In practice underwriting betas are hard to estimate, and the CAPM prices only systematic risk, wher…” |

</details>

<details><summary><code>cas9-an-009</code> · answerable</summary>

Tagged pages: Prepayment Risk, Credit Risk, Interest Rate Risk

| Item | Kind | Status | Where |
|---|---|---|---|
| The PSA prepayment benchmark expresses prepayment speed as a conditional prepayment rate (CPR) that rises linearly with pool age (100% PSA … | definition | linked | Mortgage-Backed Security: “100% PSA assumes a CPR of 0.2% in the first month, rising by 0.2% a month to 6% at month 30 and lev…” |
| The conditional prepayment rate (CPR) is an annualized rate of prepayment on the pool's remaining balance, while the single monthly mortali… | definition | linked | Mortgage-Backed Security: “SMM (single monthly mortality) is the fraction of the balance left after the month's scheduled prin…” |
| The monthly prepayment rate is obtained from the annual CPR by compounding conversion: SMM = 1 - (1 - CPR)^(1/12). | formula | linked | Mortgage-Backed Security: “SMM (single monthly mortality) is the fraction of the balance left after the month's scheduled prin…” |
| Expected monthly prepayment equals SMM multiplied by the beginning-of-month balance after subtracting that month's scheduled principal paym… | procedure | linked | Mortgage-Backed Security (collapsed): “The SMM applies to the balance after the month's scheduled principal.” |

</details>

<details><summary><code>cas9-an-010</code> · untagged</summary>

Tagged pages: Risk, Correlation, Risk Modeling, Risk Capital

| Item | Kind | Status | Where |
|---|---|---|---|
| Aggregate capital under a correlation matrix (square-root formula) equals the square root of the sum over all ordered pairs (i, j) of Corr_… | formula | elsewhere | Risk Diversification: “$$C = \sqrt{\sum_i \sum_j \rho_{ij}\, C_i\, C_j}$$” |
| Because the correlation matrix is symmetric and the diagonal entries equal 1, the double sum equals the sum of squared capitals plus twice … | fact | elsewhere | Risk Diversification (collapsed): “Each pair appears twice in the double sum, so the cross term is $2\rho_{ij} C_i C_j$.” |
| Aggregate capital is less than the sum of standalone capitals when correlations are below 1; the difference is the diversification credit, … | fact | elsewhere | Risk Diversification: “A simple sum assumes every correlation is one, which gives no benefit and an upper bound.” |
| With all correlations equal to zero (independent risks), aggregate capital is the square root of the sum of squared standalone capitals, gi… | fact | linked | Risk-Based Capital: “the square root treats $R_1$–$R_5$ and $R_{\text{cat}}$ as independent.” |

</details>

Nothing here edits the vault. A gap is fixed from the syllabus reading, in general form — never by copying the question's own numbers onto the page — and the edited page is fact checked again (docs/verification.md).
