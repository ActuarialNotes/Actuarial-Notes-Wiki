# Long example titles: backlog

A worked example on a concept page is a folded card whose title is the question
(`> [!example]- <question> {Example}`). When the question carries its whole setup,
the title runs to three or four sentences of figures, and the card's header is a
paragraph. The rule added to the `actuarial-concept-definitions` skill on
2026-11-09 (§5, *A long question is split*) is:

- over **25 words** (each `$…$` counted as one), the title keeps only the question,
  written to stand alone ("Is this commercial auto class of light trucks homogeneous?");
- the setup, every fact, figure and table, is the card's first block;
- the working goes in a folded, untitled `> > [!answer]-` box nested under it.

`Concepts/Homogeneity.md`'s first example is the model and the only one converted.
Everything below is still in the old shape and is to be converted in a later pass.

## How to work through it

- Regenerate this list with
  `python3 .claude/skills/actuarial-concept-definitions/long_example_titles.py --markdown`
  (the plain form, without `--markdown`, prints `file:line` and exits 1 while any remain).
- Convert a page's examples together, so the page reads one way. Move the setup into the
  body word for word; only the title is rewritten. Data given by category becomes a table.
- Every edit makes the page's fact check `stale` (P4); run
  `python3 scripts/verify_check.py --sync` after.

## The list

Titles longer than 90 characters are cut here.

748 examples on 368 pages.

| Where | Words | Title |
| :--- | ---: | :--- |
| `Concepts/AIC.md:25` | 35 | A Poisson GLM with an intercept and 3 predictors has maximized log-likelihood $-120$. A… |
| `Concepts/AIC.md:49` | 34 | Regressions are fitted to 50 observations. The full model has residual standard error 2… |
| `Concepts/AIC.md:65` | 39 | Model $q$ has 3 effective parameters and posterior predictive likelihoods 0.20, 0.30 an… |
| `Concepts/ANOVA.md:57` | 33 | Claim severities from three territories, 10 claims each, give a between-group sum of sq… |
| `Concepts/ANOVA.md:74` | 27 | With 24 observations, a model with 1 predictor has $\text{RSS}_0 = 18.0$. Adding a 3-le… |
| `Concepts/ANOVA.md:90` | 31 | A Poisson log-linear model has deviance 25.3 on 12 degrees of freedom. Adding an intera… |
| `Concepts/ARIMA.md:48` | 28 | After a first difference, an insurance loss series has an ACF with one significant spik… |
| `Concepts/AUROC.md:28` | 26 | Six holdout observations have predicted probabilities $0.9$, $0.7$, $0.6$, $0.4$, $0.3$… |
| `Concepts/Accident Year.md:27` | 40 | Claim 1 occurred on 3/1/2023 and was paid $\$2{,}000$ in 2023, with $\$4{,}000$ reserve… |
| `Concepts/Accident Year.md:44` | 36 | Accident year 2024 earned premium is $\$8{,}000{,}000$. Its reported losses are $\$4{,}… |
| `Concepts/Actual vs Expected Analysis.md:27` | 32 | At December 31, 2007, an accident year 2007 has $\$2{,}463$ of reported claims and a se… |
| `Concepts/Actual vs Expected Analysis.md:45` | 28 | An accident year has $\$6{,}000{,}000$ of reported claims at 24 months. The CDF is $1.6… |
| `Concepts/Actual vs Expected Analysis.md:77` | 39 | Over a calendar year, reported claims exceeded expectation by about 30% in every accide… |
| `Concepts/Actual vs Expected Analysis.md:102` | 49 | An accident year is 24 months old at December 31, with $\$4{,}000$ reported and a selec… |
| `Concepts/Added Variable Plot.md:39` | 47 | A simple regression of claim cost on vehicle value alone gives a slope of 1.8. In the m… |
| `Concepts/Added Variable Plot.md:59` | 36 | In a frequency GLM, the partial residual plot for driver age is flat from age 25 to age… |
| `Concepts/Age to Age Factor.md:46` | 34 | Reported claims are 500, 750 and 875 at 12, 24 and 36 months for accident year 2021, 55… |
| `Concepts/Age to Age Factor.md:63` | 47 | A liability triangle's 12-24 factors for accident years 2018 to 2023 are 1.42, 1.45, 1.… |
| `Concepts/Aggregate Loss Model.md:37` | 32 | The number of claims in a year has mean 100 and variance 300. Claim amounts have mean 5… |
| `Concepts/Aggregate Loss Model.md:51` | 31 | The number of claims in a year is Poisson with mean 100. Claim amounts have mean 500 an… |
| `Concepts/Aggregate Loss Model.md:80` | 26 | The number of claims is Poisson with mean 1, and every claim is exactly 1,000. What is… |
| `Concepts/Allocated Loss Adjustment Expense.md:53` | 62 | The ratio of paid ALAE to paid claims is 0.050, 0.080 and 0.090 at 12, 24 and 36 months… |
| `Concepts/Analysis of Covariance.md:29` | 34 | A common-slope model of log severity is $\hat\mu = 7.20 + 0.25 I_B + 0.40 I_C + 0.030x$… |
| `Concepts/Analysis of Covariance.md:56` | 47 | Log severities of 24 claims, 8 from each of 3 territories, are fitted with vehicle valu… |
| `Concepts/Axioms of Probability.md:43` | 34 | An insurer assigns probability 0.60 to no claims on a policy in a year, 0.25 to one cla… |
| `Concepts/BIC.md:29` | 29 | With 100 observations, model A has 5 parameters and maximized log-likelihood $-200$, an… |
| `Concepts/BIC.md:45` | 35 | Regressions are fitted to 50 observations, and the full model has residual standard err… |
| `Concepts/Backpropagation.md:53` | 33 | The network predicts $3.0$ for an observation whose response is $5.0$. The output weigh… |
| `Concepts/Backpropagation.md:66` | 29 | For one observation the residual is $2.0$, the output weight is $\beta_k = 1.5$, the Re… |
| `Concepts/Bagging.md:25` | 26 | An actuary bags 500 deep regression trees, and separately 500 ordinary least squares fi… |
| `Concepts/Basic Insurance Ratios.md:38` | 27 | A personal lines book has $40{,}000$ earned exposures, $2{,}400$ reported claims, $\$18… |
| `Concepts/Basic Insurance Ratios.md:56` | 32 | A book's combined ratio is 100% and its underwriting expense ratio is 28%. Its LAE is 1… |
| `Concepts/Basic Insurance Ratios.md:101` | 71 | With figures in \$ millions, an insurer has earned premium of 500, incurred losses and… |
| `Concepts/Bayes Theorem.md:31` | 40 | 20% of an insurer's policyholders are high-risk and 80% are low-risk. A high-risk polic… |
| `Concepts/Bayes Theorem.md:47` | 32 | 60% of drivers have a Poisson claim count with mean 1, and 40% have mean 3. A driver ha… |
| `Concepts/Bayesian Credibility.md:28` | 37 | Risks are 60% class A, with claim probability $0.1$ a year, and 40% class B, with claim… |
| `Concepts/Bayesian Credibility.md:49` | 36 | A policyholder's annual claim count is Poisson with mean $\Lambda$, and $\Lambda$ is ga… |
| `Concepts/Benefit Limit.md:30` | 27 | A policy pays each loss up to a limit of 600. On a loss of 900, what does the insurer p… |
| `Concepts/Benefit Limit.md:108` | 29 | A loss is uniform on $(0, 4000)$. A policy has a deductible of 200, pays 50% of the exc… |
| `Concepts/Benktander Method.md:58` | 37 | A line is 30% reported at 12 months, 60% at 24 months and 85% at 36 months. What weight… |
| `Concepts/Benktander Method.md:86` | 37 | As percentages of premium, $U_0 = 75\%$, $p = 0.40$ and $C = 36\%$. The actuary assesse… |
| `Concepts/Berquist-Sherman Method.md:33` | 30 | At 12 months the average case outstanding per open claim is $\$4{,}000$, $\$4{,}200$ an… |
| `Concepts/Berquist-Sherman Method.md:55` | 45 | For a liability book at 24 months, average case outstanding is $\$12{,}000$, $\$12{,}60… |
| `Concepts/Berquist-Sherman Method.md:78` | 40 | AY 2022 had closed 300 claims and paid $\$1{,}200{,}000$ at 12 months, and closed 600 a… |
| `Concepts/Best Linear Unbiased Predictor.md:40` | 35 | A random intercept model of pure premium by class has $\sigma_u^2 = 900$ and $\sigma^2… |
| `Concepts/Best Linear Unbiased Predictor.md:53` | 37 | A model has fixed effects $\hat{\beta}_0 = 50$ and $\hat{\beta}_1 = 2$ for age, and sub… |
| `Concepts/Bias-Variance Tradeoff.md:36` | 34 | At a point $x_0$ the irreducible error is 25. Model A has bias $-3$ and variance 16, an… |
| `Concepts/Bias-Variance Tradeoff.md:54` | 41 | A frequency model with territory in 8 groups has training deviance 2,400 and holdout de… |
| `Concepts/Bias.md:61` | 28 | Losses are uniform on $(0, \theta)$. The largest of 4 losses is 800. What is the bias o… |
| `Concepts/Bias.md:82` | 26 | A sample of 25 is drawn from a population with mean $\mu$ and variance 100. What is the… |
| `Concepts/Bias.md:97` | 27 | The true model has $\beta_1 = 2$ and $\beta_2 = 3$. The variable $x_2$ is omitted, and… |
| `Concepts/Binomial Distribution.md:73` | 26 | Six independent risks each have the same probability $p$ of a loss. Exactly two losses… |
| `Concepts/Bonus-Malus System.md:27` | 52 | A system has levels 0, 1 and 2 with premiums 500, 400 and 300. A claim-free year moves… |
| `Concepts/Bonus-Malus System.md:68` | 32 | In the system above, a driver at level 2 has an at-fault loss of 250 on the last day of… |
| `Concepts/Boosting.md:46` | 29 | An observation has $y = 20$. With $\lambda = 0.1$, the first tree predicts $18$ for it… |
| `Concepts/Boosting.md:61` | 29 | A boosted model with $\lambda = 0.01$ and $d = 2$ has training error still falling at $… |
| `Concepts/Bootstrap.md:27` | 27 | Five bootstrap samples of a claim sample give sample means of 10.2, 11.0, 9.6, 10.8 and… |
| `Concepts/Bootstrap.md:40` | 35 | A bootstrap sample of 250 claims is drawn with replacement from 250 claims. What is the… |
| `Concepts/Box Plot.md:33` | 31 | Eleven claim amounts, in thousands, are 2, 3, 4, 5, 6, 7, 8, 9, 11, 14 and 40. What are… |
| `Concepts/Box Plot.md:48` | 39 | Box plots of severity for three vehicle classes have medians of 3.1, 3.3 and 6.8 thousa… |
| `Concepts/Branching Process.md:27` | 37 | Each individual of a population lives one generation and leaves 0, 1 or 2 offspring wit… |
| `Concepts/Branching Process.md:54` | 36 | An element lives one week and leaves 0, 1 or 2 offspring with probabilities 0.75, 0.20… |
| `Concepts/Branching Process.md:75` | 28 | Each individual leaves 0, 1 or 2 offspring with probabilities 0.3, 0.3 and 0.4. Startin… |
| `Concepts/Bühlmann Credibility.md:50` | 36 | 60% of drivers have Poisson claim counts with mean 0.1 a year and 40% with mean 0.3. A… |
| `Concepts/Bühlmann-Straub Credibility.md:33` | 28 | A risk has exposures 100, 200 and 150 in three years, with losses per exposure 0.08, 0.… |
| `Concepts/Bühlmann-Straub Credibility.md:55` | 29 | Risk A has 100 exposures with mean 0.30, and risk B has 300 exposures with mean 0.10. T… |
| `Concepts/Calendar Year.md:28` | 45 | In 2024 an insurer has three claims. Claim A had a case reserve of $\$10{,}000$ at the… |
| `Concepts/Calendar Year.md:50` | 26 | A one-car annual policy is effective 7/1/2011 and is cancelled on 3/31/2012. What writt… |
| `Concepts/Calendar Year.md:60` | 31 | Cumulative reported losses by accident year were $\$800$ for 2022 and $\$600$ for 2023… |
| `Concepts/Cape Cod Method.md:34` | 43 | Three accident years have earned premium ($000) of 10,000, 10,500 and 11,000, reported… |
| `Concepts/Cape Cod Method.md:51` | 43 | The Cape Cod expected claim ratio at the 2024 rate and cost level is 70.0%. AY 2022 ear… |
| `Concepts/Cape Cod Method.md:65` | 29 | Case reserves were strengthened two years ago on every open year. Should the reported C… |
| `Concepts/Case Adequacy.md:40` | 27 | The average case outstanding at $12$ months was $\$5{,}200$, $\$5{,}500$, $\$5{,}700$ a… |
| `Concepts/Case Adequacy.md:57` | 32 | At $12$ months, the latest average case outstanding is $\$7{,}000$, for accident year $… |
| `Concepts/Case Outstanding Development Method.md:29` | 46 | AY 2023 at 24 months has paid claims of $\$800{,}000$ and case outstanding of $\$500{,}… |
| `Concepts/Case Outstanding Development Method.md:55` | 29 | A self-insurer has $\$1{,}000{,}000$ of case outstanding and no other claims history. T… |
| `Concepts/Case Reserves.md:24` | 49 | Three claims from accident year 2023 are reported during 2023, with case reserves at $1… |
| `Concepts/Case Reserves.md:33` | 35 | A medical malpractice claim has a $\$1{,}000{,}000$ limit. Counsel estimates an 80% cha… |
| `Concepts/Catastrophe Loss.md:26` | 31 | Five years of homeowners experience have $\$50{,}000{,}000$ of losses on 10,000 house-y… |
| `Concepts/Catastrophe Loss.md:45` | 29 | Hail losses and ALAE have averaged $\$0.20$ per $\$1{,}000$ of amount of insurance year… |
| `Concepts/Categorical Predictor.md:29` | 41 | Territory has levels A, B and C. A Poisson GLM with a log link uses territory A as the… |
| `Concepts/Categorical Predictor.md:46` | 30 | Territories are stored as the codes 1 to 5, and an actuary enters the code as a numeric… |
| `Concepts/Ceded Losses.md:37` | 44 | In a triangle of net to gross reported claims, every age of accident year 2023 shows 0.… |
| `Concepts/Censoring.md:28` | 32 | Losses are exponential with mean $\theta$. Two losses are observed exactly, at 2 and 3,… |
| `Concepts/Censoring.md:44` | 29 | Losses are exponential, and a policy pays at most 10,000. The payments are 1,000, 3,000… |
| `Concepts/Chain Ladder Method.md:28` | 27 | Accident year 2024 has $\$625{,}000$ of reported claims at 12 months, and the reported… |
| `Concepts/Chain Ladder Method.md:48` | 47 | Cumulative reported claims ($000) are 575, 875 and 1,025 for AY 2022 at 12, 24 and 36 m… |
| `Concepts/Chain Ladder Method.md:103` | 42 | Reported claims at 12 months have jumped in the latest accident year while paid claims… |
| `Concepts/Chain Ladder Method.md:115` | 38 | AY 2024 at 12 months has $\$4{,}500{,}000$ of reported claims, including one claim rese… |
| `Concepts/Changing Conditions.md:62` | 27 | The paid BF estimate of an accident year is $\$10{,}000{,}000$, with $\$3{,}000{,}000$… |
| `Concepts/Changing Conditions.md:79` | 29 | A tort reform cuts the cost of claims by $20\%$ for accidents on or after $1/1/2025$. H… |
| `Concepts/Changing Conditions.md:84` | 56 | An actuary learns that a new claims system opens a file per claimant rather than per ac… |
| `Concepts/Chapman-Kolmogorov Equations.md:28` | 29 | Each month a claim is Open (O), Closed (C) or Reopened (R). The claim is Open now. What… |
| `Concepts/Chi-Square Goodness-of-Fit Test.md:29` | 37 | A die is rolled 120 times, and the faces 1 to 6 come up 25, 17, 15, 23, 24 and 16 times… |
| `Concepts/Chi-Square Goodness-of-Fit Test.md:41` | 44 | Of 500 policies, 260 had no claims, 190 had one claim, 40 had two and 10 had three. Doe… |
| `Concepts/Chi-Square Goodness-of-Fit Test.md:57` | 35 | Of 200 urban policies, 30 had a claim, and of 300 rural policies, 20 had a claim. Does… |
| `Concepts/Chi-Square Goodness-of-Fit Test.md:74` | 33 | Four years have exposures of 1,000, 1,200, 1,100 and 900 and claim counts of 52, 70, 48… |
| `Concepts/Chi-Squared Distribution.md:50` | 26 | The logarithms of 10 claim amounts are a random sample from a normal distribution, with… |
| `Concepts/Chi-Squared Distribution.md:68` | 27 | A random sample of 20 losses from a normal distribution has $s^2 = 45$. What is the sma… |
| `Concepts/Chi-Squared Distribution.md:84` | 35 | A claim frequency GLM has maximized log-likelihood $-1{,}250.6$. Adding a rating variab… |
| `Concepts/Claim Count Triangle.md:26` | 51 | Reported claim counts are 450, 520 and 545 at 12, 24 and 36 months for accident year 20… |
| `Concepts/Claim.md:37` | 29 | A homeowner's kitchen burns on 3 March, the homeowner calls the insurer on 10 March, an… |
| `Concepts/Claim.md:55` | 26 | Claims arrive as a Poisson count with mean 40 a year, and each claim has mean 5,000. Wh… |
| `Concepts/Claim.md:69` | 29 | Claims arrive as a Poisson count with mean 40 a year. Each claim has mean 5,000 and sta… |
| `Concepts/Claim.md:89` | 33 | Losses are Poisson with mean 100 a year, each exponential with mean 2,000, and the poli… |
| `Concepts/Claims Coding Changes.md:36` | 26 | A workers compensation insurer starts coding a reopened claim as a new claim instead of… |
| `Concepts/Claims Made Coverage.md:54` | 39 | Report Year 2010's loss cost is $\$1{,}000$, loss costs rise 5% each report year, and 2… |
| `Concepts/Claims Made Coverage.md:101` | 43 | A claims-made medical malpractice programme starts with its retroactive date at incepti… |
| `Concepts/Claims Made Coverage.md:122` | 37 | The insured in the 5% book has been mature claims-made and switches to occurrence in 20… |
| `Concepts/Claims Processing Changes.md:44` | 46 | An insurer introduces fast-track settlement for auto bodily injury, and claims now clos… |
| `Concepts/Claims Processing Changes.md:56` | 35 | At $24$ months, the disposal rate rose from $57\%$ to $71\%$ over two years, and the av… |
| `Concepts/Classification Ratemaking.md:92` | 40 | One-way relativities are 1.80 for youthful drivers and 1.56 for old vehicles. A GLM on… |
| `Concepts/Close Year.md:36` | 39 | In 2024 an insurer closes 800 small claims averaging $\$2{,}000$ and 200 large claims a… |
| `Concepts/Close Year.md:53` | 26 | Accident year 2023 has 700 claims closed at 24 months and a selected ultimate claim cou… |
| `Concepts/Clustered Data.md:32` | 29 | In a random intercept model of loss ratios by agency, $\sigma_u^2 = 0.01$ and $\sigma^2… |
| `Concepts/Clustered Data.md:42` | 38 | A workers compensation file has one row per claim over 6 years, recording the employer… |
| `Concepts/Clustered Data.md:61` | 41 | A fleet-level indicator is tested on 1,000 observations, 200 fleets each observed for 5… |
| `Concepts/Coefficient of Variation.md:53` | 31 | A claim has mean 130 and standard deviation 190. What is its coefficient of variation a… |
| `Concepts/Coefficient of Variation.md:66` | 37 | Insurer A covers 900 homes and insurer B covers 3,600. Each home independently has a fi… |
| `Concepts/Coinsurance Percentage.md:30` | 31 | A policy has a deductible of 200 and a coinsurance percentage of 80%. On a loss of 350,… |
| `Concepts/Coinsurance Percentage.md:47` | 29 | The excess over a deductible of 500 has mean 1,200 and variance 4,000,000. The insurer… |
| `Concepts/Coinsurance Percentage.md:66` | 30 | A policy has a deductible of 200, pays 80% of the excess, and caps its payment at 400.… |
| `Concepts/Coinsurance Percentage.md:83` | 28 | A home worth 400,000 is insured for 240,000 under an 80% coinsurance clause. What is th… |
| `Concepts/Coinsurance Rating.md:87` | 28 | The insurer charges every home the full-ITV rate of $\$6.75$ per $\$1{,}000$. The home… |
| `Concepts/Combination.md:57` | 30 | A bag holds 3 red, 4 blue and 5 green marbles. Five are drawn at random. What is the pr… |
| `Concepts/Complement of Credibility.md:27` | 41 | A territory's experience indicates a rate change of $+25\%$ but earns only $Z = 0.20$.… |
| `Concepts/Compound Poisson Process.md:43` | 35 | Claims arrive as a Poisson process at a rate of 50 per year. Claim sizes are exponentia… |
| `Concepts/Compound Poisson Process.md:57` | 44 | Claims arrive as a Poisson process at a rate of 50 per year, and claim sizes are expone… |
| `Concepts/Compound Poisson Process.md:71` | 56 | Physical damage claims arrive at a rate of 30 per year with mean size 1,000. Liability… |
| `Concepts/Conditional Probability Function.md:32` | 28 | $X$ and $Y$ are the numbers of auto and home claims, with the joint probability functio… |
| `Concepts/Conditional Probability.md:31` | 30 | An insurer covers 1,000 drivers. 300 are young, and 60 of the young drivers had a claim… |
| `Concepts/Conditional Probability.md:45` | 27 | 40% of policyholders insure a car, and 25% of those who insure a car also insure a home… |
| `Concepts/Conditional Probability.md:78` | 26 | A loss is 0, 100, 400 or 1,000 with probabilities 0.4, 0.3, 0.2 and 0.1. What is the ex… |
| `Concepts/Confidence Interval.md:28` | 27 | Claim sizes are normal with standard deviation 300. A sample of 36 claims has mean 1,20… |
| `Concepts/Confidence Interval.md:43` | 28 | Claim sizes are normal. A sample of 16 claims has mean 8,400 and sample standard deviat… |
| `Concepts/Confidence Interval.md:75` | 28 | A portfolio has 400 claims in a year, and the number of claims is Poisson. What is an a… |
| `Concepts/Confidence Interval.md:84` | 33 | A log-link GLM gives $\hat{\beta} = 0.35$ with standard error 0.12 for an urban territo… |
| `Concepts/Conjugate Prior.md:45` | 35 | A driver's annual claim count is Poisson, and its mean has a gamma prior with $\alpha =… |
| `Concepts/Conjugate Prior.md:75` | 31 | Observations are normal with variance 100, and their mean has a normal prior with mean… |
| `Concepts/Conjugate Prior.md:88` | 33 | Claim sizes are exponential with mean $\theta$, and $\theta$ is inverse gamma with $\al… |
| `Concepts/Considerations for Implementing Rates.md:26` | 32 | The overall indication is +6.0%. New class relativities, applied to the current distrib… |
| `Concepts/Considerations for Implementing Rates.md:37` | 43 | The target overall change is +15.0%. New relativities for one variable give an off-bala… |
| `Concepts/Considerations for Implementing Rates.md:47` | 34 | The indication is +20%, and the insurer phases it over two annual filings, taking +10%… |
| `Concepts/Continuous Univariate Distributions.md:64` | 30 | Which distribution fits the share of claims that are fraudulent, the time until the nex… |
| `Concepts/Control Variable.md:26` | 47 | A frequency GLM uses vehicle age as a rating variable. Reported frequency has changed f… |
| `Concepts/Convergence in Probability.md:28` | 36 | Losses are uniform on $(0, \theta)$ with $\theta = 1{,}000$, and the largest of $n$ los… |
| `Concepts/Convergence in Probability.md:42` | 29 | Claims have mean $\mu$ and standard deviation 10. What bound does Chebyshev's inequalit… |
| `Concepts/Convergence in Probability.md:54` | 36 | Claim counts are Poisson with mean $\lambda$. Of 1,000 policies, 819 had no claim. Is $… |
| `Concepts/Correlation Coefficient.md:59` | 26 | Each auto claim costs 10 and each home claim costs 5. What is the correlation coefficie… |
| `Concepts/Correlogram.md:43` | 32 | A series of $n = 96$ monthly claim counts has $r_1 = 0.91$, and its autocorrelations de… |
| `Concepts/Correlogram.md:59` | 31 | An AR(1) is fitted to 120 months of claim frequency. Its residual correlogram, plotted… |
| `Concepts/Counting Process.md:30` | 36 | A claims department tracks the number of claims reported by time $t$, the number of cla… |
| `Concepts/Counting Process.md:43` | 35 | Claims are reported as a Poisson process at a rate of 2 per week. What is the probabili… |
| `Concepts/Counting Process.md:66` | 33 | Claims occur as a Poisson process at a rate of 3 per month. What is the probability of… |
| `Concepts/Covariance Structure.md:52` | 27 | A model has a random intercept and two random slopes per subject. What is the size of $… |
| `Concepts/Covariance.md:73` | 40 | A claim has a surgical part $X$ and a hospital part $Y$, with $\text{Var}(X) = 4$, $\te… |
| `Concepts/Coverage Modifications.md:29` | 30 | Losses are exponential with mean 1,000. A policy has an ordinary deductible of 500, a m… |
| `Concepts/Coverage Modifications.md:54` | 32 | For the policy in the first example, the number of losses per year is Poisson with mean… |
| `Concepts/Coverage Modifications.md:85` | 32 | For the policy in the first example, losses inflate by 10% while the deductible and the… |
| `Concepts/Coverage Modifications.md:99` | 49 | Annual medical costs are exponential with mean 2,000. The insured pays the first 500, t… |
| `Concepts/Cramér-Rao Lower Bound.md:30` | 29 | Claim counts on 100 policies are independent and Poisson with mean $\lambda$. What is t… |
| `Concepts/Cramér-Rao Lower Bound.md:42` | 29 | Claim counts on 100 policies are independent and Poisson with mean $\lambda = 0.2$. Wha… |
| `Concepts/Cramér-Rao Lower Bound.md:55` | 43 | Claim sizes follow a [[Pareto Distribution\|Pareto distribution]] with known $\theta$ an… |
| `Concepts/Credibility.md:31` | 31 | A workers compensation class has 75 claims against a full credibility standard of 1,082… |
| `Concepts/Credibility.md:57` | 29 | An account has 400 claims, and the full credibility standard is 1,082 claims. A Bühlman… |
| `Concepts/Critical Value.md:45` | 30 | Claim severities are normal. A sample of 25 claims has sample standard deviation 1,300.… |
| `Concepts/Critical Value.md:64` | 26 | Independent normal samples of sizes 6 and 11 are used to test $H_0: \sigma_1^2 = \sigma… |
| `Concepts/Critical Value.md:78` | 39 | In 10 independent trials with success probability $q$, a test of $H_0: q = 0.5$ against… |
| `Concepts/Cross-Validation.md:39` | 33 | A least squares line fitted to $x = 1, 2, 3, 4$ and $y = 3, 7, 6, 10$ is $\hat{y} = 1.5… |
| `Concepts/Cross-Validation.md:55` | 28 | Five candidate models have 10-fold cross-validated MSEs of 530, 430, 395, 415 and 470,… |
| `Concepts/Cumulative Development Factor.md:33` | 52 | The selected age-to-age factors are 1.500 from 12 to 24 months, 1.200 from 24 to 36 mon… |
| `Concepts/Data Diagnostic Analysis.md:26` | 55 | Average case outstanding at $12/31/2024$ is 7,600, 11,400 and 15,000 at 12, 24 and 36 m… |
| `Concepts/Data Diagnostic Analysis.md:63` | 51 | Closed-to-reported count ratios at 12 months have risen from about 0.14 to above 0.20 f… |
| `Concepts/Data Diagnostic Analysis.md:88` | 43 | An ODP bootstrap's residuals have a standard deviation of 1.60 in development periods 1… |
| `Concepts/Data Issues.md:59` | 37 | Paid 12-to-24-month factors for five accident years are 1.62, 1.66, 2.945, 1.67 and 1.6… |
| `Concepts/Data Quality.md:29` | 29 | Reviewing a personal auto file, an actuary finds 312 policies with a driver age of 0 an… |
| `Concepts/Data Quality.md:40` | 31 | A homeowners modelling extract totals $\$41{,}600{,}000$ of written premium for the yea… |
| `Concepts/Data Segmentation.md:30` | 36 | A commercial property class has 30,000 sprinklered exposures with 900 claims and $\$4{,… |
| `Concepts/Data Segmentation.md:47` | 33 | State A has 2,000 claims a year and State B has 150, growing at the same rate. Their re… |
| `Concepts/Data Segmentation.md:57` | 42 | A homeowners experience period has 9,600 claims. An analyst proposes pure premiums for… |
| `Concepts/Data Types.md:32` | 36 | A policy file has the columns `veh_age` (whole years), `territory` (stored as the integ… |
| `Concepts/Data Types.md:50` | 35 | A Poisson frequency GLM with a log link was fitted with `territory` (codes 1 to 8) left… |
| `Concepts/Decision Tree.md:25` | 53 | A tree first splits on driver age $< 25$, and for older drivers on vehicle age $< 5$. T… |
| `Concepts/Deductible Rating.md:33` | 26 | A homeowners book has 10,000 claims with $\$13{,}604{,}390$ of ground-up losses. 4,425… |
| `Concepts/Deductible Rating.md:60` | 33 | Policies with full coverage, a $\$100$ deductible and a $\$250$ deductible have $\$4{,}… |
| `Concepts/Deductible Rating.md:73` | 34 | A homeowners program has a full-coverage pure premium of $\$620$. The loss elimination… |
| `Concepts/Deductible Recovery.md:26` | 36 | A liability policy has a $\$250{,}000$ per-occurrence deductible. The insurer pays a $\… |
| `Concepts/Deductible Recovery.md:36` | 27 | An insured expects $40$ claims a year averaging $\$60{,}000$ each, all below $\$100{,}0… |
| `Concepts/Deductible.md:100` | 28 | A loss is 0, 100, 400 or 1,000 with probabilities 0.4, 0.3, 0.2 and 0.1, and the deduct… |
| `Concepts/Deductible.md:113` | 32 | A loss is uniform on $(0, 1000)$ and the deductible is 200. Next year every loss is 10%… |
| `Concepts/Dendrogram.md:23` | 36 | On a dendrogram, leaves A and B sit next to each other but fuse at height 9, while leav… |
| `Concepts/Design Matrix.md:28` | 41 | Five policies have vehicle ages 2, 5, 8, 1 and 4 and territories A, B, C, B and A. What… |
| `Concepts/Deterministic and Stochastic Trend.md:37` | 42 | A trend regression on 60 quarters gives $R^2 = 0.94$, but its residuals have a lag 1 au… |
| `Concepts/Development Triangle.md:50` | 50 | In a reported triangle, the age-to-age factors on the latest diagonal are 1.67 at 12 to… |
| `Concepts/Deviance.md:61` | 37 | A Poisson GLM with only an intercept has deviance 45.2 on 49 degrees of freedom. Adding… |
| `Concepts/Deviance.md:78` | 38 | A normal linear model has residual sum of squares 520 on 46 degrees of freedom. Adding… |
| `Concepts/Differencing.md:48` | 26 | Quarterly claim counts are 210 in Q1 of one year and 234 in Q1 of the next. What is the… |
| `Concepts/Differencing.md:56` | 39 | A series' autocorrelations fall from 0.97 at lag 1 to 0.71 at lag 10. After one differe… |
| `Concepts/Discrete Mathematics.md:30` | 35 | An insurer offers 4 optional coverages, and a policy may include any of them. If a poli… |
| `Concepts/Discrete Mathematics.md:43` | 26 | An insurer offers 4 optional coverages, and every policy with flood coverage must also… |
| `Concepts/Discrete Random Variable.md:66` | 27 | The claim count $X$ above and an independent count $Y$, with $P(Y = 0) = 0.7$ and $P(Y… |
| `Concepts/Discrete Univariate Distributions.md:40` | 27 | The number of accidents $X$ in a month is at most 3, with $P(X \ge 1) = 0.6$, $P(X \ge… |
| `Concepts/Discrete Univariate Distributions.md:59` | 46 | Of 30 claim files, 5 are fraudulent, and an auditor reviews 8 chosen without replacemen… |
| `Concepts/Dispersion Parameter.md:43` | 28 | In a gamma severity GLM with $\hat{\phi} = 0.64$, one row is the average of 4 claims wi… |
| `Concepts/Dispersion Parameter.md:57` | 41 | A Poisson GLM with 8 coefficients is fitted to 500 observations, and the Pearson chi-sq… |
| `Concepts/Double Lift Chart.md:32` | 45 | Sorted on the ratio of a new model's predictions to the current one's, the lowest quant… |
| `Concepts/Earned Exposure.md:27` | 29 | An insurer writes 100 annual auto policies on the first of each month of 2024 and wrote… |
| `Concepts/Earned Exposure.md:39` | 30 | An insurer writes annual policies evenly through each year: 10,000 car-years in 2023 an… |
| `Concepts/Empirical Bayes Credibility.md:44` | 31 | 100 policyholders have 0, 1, 2 and 3 claims in one year in the numbers 50, 30, 15 and 5… |
| `Concepts/Empirical Distribution.md:41` | 31 | For the ten claims above, what are the mean and the variance of the empirical distribut… |
| `Concepts/Entropy.md:40` | 26 | A node of 100 observations has entropy $0.693$. A split leaves 60 observations with ent… |
| `Concepts/Event.md:50` | 27 | A fair die is rolled. Let $E$ be "an even number is rolled" and $F$ be "at least 4 is r… |
| `Concepts/Exact Credibility.md:53` | 34 | A risk's claim sizes are exponential with mean $\Theta$, and $\Theta$ is inverse gamma… |
| `Concepts/Exact Credibility.md:66` | 35 | Drivers are 75% good (Poisson mean $0.2$) and 25% bad (Poisson mean $0.6$). The Bayesia… |
| `Concepts/Expected Loss Method.md:37` | 26 | An accident year is three months old. Its earned premium is $\$2{,}000{,}000$, the expe… |
| `Concepts/Expected Loss Method.md:53` | 29 | Case reserves were strengthened last year and claim settlement has slowed. Which estima… |
| `Concepts/Expected Loss Method.md:71` | 50 | The ultimate claims of AY 2021, 2022 and 2023 are $\$7.0$M, $\$7.4$M and $\$8.0$M, on o… |
| `Concepts/Expected Value.md:67` | 30 | A claim costs 0, 100 or 500 with probabilities 0.5, 0.3 and 0.2. A policy pays the clai… |
| `Concepts/Expected Value.md:85` | 32 | A claim has mean 130. Next year every claim rises 10% and a handling fee of 20 is added… |
| `Concepts/Expense Provisions.md:27` | 35 | Each policy has expected losses and LAE of $\$180$ and $\$20$ of fixed expenses for pri… |
| `Concepts/Expense Provisions.md:83` | 39 | Commissions are $15.0\%$ and premium taxes $2.5\%$ of written premium, both variable. G… |
| `Concepts/Expense Ratio.md:57` | 26 | A book's combined ratio is $104\%$, its underwriting expense ratio is $30\%$ and its LA… |
| `Concepts/Experience Rating.md:61` | 29 | Two insureds each have $\$200{,}000$ of expected losses and a credibility of 0.50. Insu… |
| `Concepts/Experience Rating.md:89` | 34 | A risk's projected ultimate losses and ALAE, at basic limits and limited by the MSL, ar… |
| `Concepts/Experience Rating.md:116` | 27 | A risk has expected primary losses of $\$40{,}000$ and expected excess losses of $\$60{… |
| `Concepts/Exploratory Data Analysis.md:34` | 35 | An analyst receives a claims file with paid amount, accident date, report date, vehicle… |
| `Concepts/Exploratory Data Analysis.md:49` | 33 | Side-by-side box plots of severity for four vehicle classes show medians of 3.0, 3.1, 3… |
| `Concepts/Exploratory Data Analysis.md:61` | 30 | In a box plot of severity by territory, territory 7 has a median twice that of every ot… |
| `Concepts/Exponential Distribution.md:88` | 27 | A machine's lifetime is exponential with mean 10 years. It has already worked for 4 yea… |
| `Concepts/Exponential Distribution.md:104` | 30 | Losses are exponential with mean 1,000. A policy pays the excess over a deductible of 2… |
| `Concepts/Exponential Family.md:73` | 30 | Plotting the variance of a severity data set's groups against their means shows the var… |
| `Concepts/Exponential Trend.md:34` | 39 | Accident-year severities, developed, capped and excluding catastrophes, are $\$9{,}800$… |
| `Concepts/Exponential Trend.md:51` | 43 | Frequencies for the 12 months ending six consecutive quarters are $0.0620$, $0.0615$, $… |
| `Concepts/Exposure Base.md:40` | 26 | For a homeowners insurer, the expected loss of a $\$200{,}000$ home is higher than that… |
| `Concepts/Exposure Trend.md:26` | 27 | A workers compensation book's Accident Year 2023 payroll is $\$50{,}000{,}000$. Wages r… |
| `Concepts/Exposure Trend.md:50` | 40 | Wages have risen 2% in 2023 and 3% in 2024, and a further 2.5% is expected up to the pe… |
| `Concepts/Extension of Exposures.md:26` | 44 | A policy effective $3/1/2011$ has 10 class Y exposures. It was rated at a base rate of… |
| `Concepts/Extension of Exposures.md:41` | 78 | Premium is base rate $\times$ territory factor $\times$ class factor $+$ policy fee, wi… |
| `Concepts/Extension of Exposures.md:53` | 35 | A commercial property book re-rates to $\$5{,}000{,}000$ of manual premium at current r… |
| `Concepts/External Information in Reserving.md:47` | 38 | An insurer's commercial auto liability triangle runs only 60 months, and its last age-t… |
| `Concepts/External Information in Reserving.md:63` | 55 | An insurer entered a new state for homeowners in 2024. At 12 months, accident year 2024… |
| `Concepts/Extraordinary Losses.md:24` | 30 | A liability line's reported losses over twelve years total $\$600{,}000{,}000$, includi… |
| `Concepts/Extraordinary Losses.md:41` | 26 | An insurer caps its losses at a $\$1{,}000{,}000$ threshold, trends the capped losses t… |
| `Concepts/Extraordinary Losses.md:55` | 31 | A homeowners book's developed and trended non-catastrophe pure premium is $\$620$. Hail… |
| `Concepts/F-Distribution.md:53` | 34 | Normal claim amounts are sampled from two territories. Territory 1 has 11 claims with $… |
| `Concepts/F-Distribution.md:70` | 37 | A linear model with 5 predictors is fitted to 30 observations, with RSS 120. Without tw… |
| `Concepts/Fitted Values.md:58` | 32 | A Poisson model with a log link has $\hat\eta = \ln(\text{exposure}) - 2.0 + 0.4\,I_{\t… |
| `Concepts/Fitted Values.md:62` | 39 | A log-link model with two indicators, $R$ and $F$, and their interaction has fitted mea… |
| `Concepts/Fixed Effects.md:44` | 30 | A model has an intercept, coverage (3 levels), territory (68 levels) and driver age (co… |
| `Concepts/Fixed Expenses.md:59` | 34 | General expenses are $6.0\%$ of earned premium and $75\%$ fixed, other acquisition is $… |
| `Concepts/Frequency-Severity Method.md:26` | 33 | An accident year has 400 reported claims and $\$3{,}200{,}000$ of reported claims at 24… |
| `Concepts/Frequency-Severity Method.md:54` | 34 | At the AY 2024 level the selected frequency is 0.0500 claims per car-year and the selec… |
| `Concepts/Frequency-Severity Method.md:76` | 51 | An accident year has 1,000 ultimate claims, and 600 have closed by 24 months, its selec… |
| `Concepts/Frequency.md:25` | 32 | A fleet insures 50 vehicles from January 1 to June 30 and 150 vehicles from July 1 to D… |
| `Concepts/Frequency.md:39` | 27 | A workers compensation book has 25,000 employee-years of exposure and 1,750 ultimate cl… |
| `Concepts/Frequency.md:53` | 45 | A personal auto book had 3,000 claims on 50,000 car-years with losses of 12,000,000 in… |
| `Concepts/Frequency.md:73` | 33 | A commercial auto book has 5,000 vehicle-years of exposure, and its claims follow a Poi… |
| `Concepts/Full Credibility Standard.md:76` | 27 | Claim counts are Poisson, and claim sizes have mean 3,000 and standard deviation 6,000.… |
| `Concepts/Gambler's Ruin Problem.md:51` | 54 | A gambler wins one chip on each head and loses one chip on each tail of a fair coin. He… |
| `Concepts/Gambler's Ruin Problem.md:64` | 45 | Ann starts with 4 coins and Ben with 2. In each independent round the loser pays the wi… |
| `Concepts/Gambler's Ruin Problem.md:85` | 59 | An insurer's surplus, in units of 1 million, rises by 1 in a year with probability 0.6… |
| `Concepts/Generalized Additive Model.md:26` | 40 | A severity GAM has a natural spline in building age with 4 degrees of freedom, a natura… |
| `Concepts/Generalized Additive Model.md:44` | 59 | A logistic GAM for the probability of a claim has intercept $-2.2$ and fitted functions… |
| `Concepts/Generalized Linear Model.md:35` | 50 | A Poisson GLM with a log link models claim frequency. The fitted coefficients are an in… |
| `Concepts/Generalized Linear Model.md:72` | 46 | Young drivers are concentrated in the urban territory. A one-way analysis gives the urb… |
| `Concepts/Generalized Linear Model.md:89` | 27 | A GLM for frequency gives these results for a rating variable with four ordered levels.… |
| `Concepts/Geometric Distribution.md:30` | 34 | Each policy in a file independently has a 20% chance of a claim. An analyst reviews pol… |
| `Concepts/Geometric Distribution.md:47` | 29 | Each policy has a 20% chance of a claim. How many policies does the analyst expect to r… |
| `Concepts/Geometric Distribution.md:71` | 29 | Eight policies have been reviewed with no claim. Each has a 20% chance of a claim. What… |
| `Concepts/Geometric Distribution.md:102` | 27 | A driver's accidents each year are Poisson with mean 0.2, independently from year to ye… |
| `Concepts/Gini Index.md:44` | 35 | A holdout set is sorted by predicted pure premium into four equal-exposure groups, hold… |
| `Concepts/Gross Losses.md:23` | 28 | An accident year's net claims are $\$800{,}000$ and $\$300{,}000$ is recoverable from e… |
| `Concepts/Gross Losses.md:37` | 32 | An insurer's net claim data is unreliable after a system conversion, but its gross data… |
| `Concepts/Gross Losses.md:47` | 27 | An insurer raised its per-occurrence retention from $\$250{,}000$ to $\$1{,}000{,}000$… |
| `Concepts/Hat Matrix.md:31` | 27 | Row 1 of the hat matrix is $(0.8333, 0.3333, -0.1667)$, and the responses are $2$, $3$… |
| `Concepts/Hat Matrix.md:45` | 32 | Severity is regressed on insured value for five risks with insured values 1, 2, 3, 4 an… |
| `Concepts/Hat Matrix.md:57` | 40 | Rural claims of 2 and 4 and urban claims of 7 and 9 are fitted with an intercept and an… |
| `Concepts/Hazard Rate.md:58` | 34 | A machine's lifetime is exponential with a mean of 5 years. What is its hazard rate, an… |
| `Concepts/Hidden Layer.md:31` | 31 | A fraud model has inputs $X_1 = 1.2$ and $X_2 = -0.5$, two ReLU hidden units with weigh… |
| `Concepts/Hierarchical Clustering.md:39` | 26 | A group of people splits best into two clusters by sex and into three clusters by natio… |
| `Concepts/High-Dimensional Data.md:23` | 34 | A least squares line $y = \beta_0 + \beta_1 x$ is fitted to two vehicles, with ages and… |
| `Concepts/Histogram.md:30` | 28 | A histogram of 500 claim amounts, in thousands, has a first bin from 0 to 2 that holds… |
| `Concepts/Histogram.md:43` | 42 | A density-scale histogram of 500 claim amounts, in thousands, has bins 0 to 2, 2 to 4,… |
| `Concepts/Histogram.md:55` | 27 | A histogram of the logarithm of 2,000 claim amounts is roughly symmetric, with a single… |
| `Concepts/Homogeneity.md:65` | 52 | A commercial package book is reserved with one triangle. Property claims develop by a 1… |
| `Concepts/Hypergeometric Distribution.md:51` | 26 | A file holds 10 policies, 4 with errors, and an auditor selects 3 without replacement.… |
| `Concepts/Hypergeometric Distribution.md:62` | 30 | A file holds 10 policies, 4 with errors. If the auditor replaced each policy before the… |
| `Concepts/Hypergeometric Distribution.md:80` | 30 | A file holds 3 policies with premium errors, 1 with a coverage error and 6 clean. An au… |
| `Concepts/Hypergeometric Distribution.md:89` | 28 | Eight claim files are each corrupted with probability 0.1, independently. Exactly 3 are… |
| `Concepts/Hypothesis Testing.md:41` | 28 | An actuary tests $H_0$: the current rates are adequate. The test rejects $H_0$ and rate… |
| `Concepts/Hypothesis Testing.md:67` | 29 | Claim sizes are normal with standard deviation 800. A sample of 100 claims has mean 5,2… |
| `Concepts/Hypothesis Testing.md:82` | 33 | Claim severities are normal. A sample of 16 claims has mean 5,400 and sample standard d… |
| `Concepts/Hypothesis Testing.md:99` | 40 | Two body shops each estimate the repair cost of the same six vehicles. Shop A's estimat… |
| `Concepts/IBNR.md:42` | 27 | AY 2023 at 24 months has reported claims of $\$4{,}000{,}000$ on 500 reported claims. I… |
| `Concepts/In-Force.md:26` | 27 | At 6/30/2024, an auto book has policy A (1/1/2024 to 12/31/2024, $\$1{,}200$), policy B… |
| `Concepts/In-Force.md:36` | 30 | An annual policy runs from 7/1/2011 to 6/30/2012 at a full-term premium of $\$400$. On… |
| `Concepts/In-Force.md:49` | 27 | A homeowners book had 40,000 policies in force with $\$52{,}000{,}000$ of in-force prem… |
| `Concepts/Inclusion-Exclusion Principle.md:43` | 42 | An insurer has 1,000 customers. 500 hold auto, 350 hold home and 200 hold life. 150 hol… |
| `Concepts/Inclusion-Exclusion Principle.md:85` | 28 | For the 1,000 customers above, what bounds do the single and pairwise counts give for t… |
| `Concepts/Incomplete Data.md:27` | 44 | A policy has a deductible of 500 and pays losses up to 5,000. Ground-up losses are expo… |
| `Concepts/Incomplete Data.md:45` | 41 | A policy has a deductible of 1,000 and a maximum payment of 9,000. Losses below the ded… |
| `Concepts/Incomplete Data.md:58` | 32 | Of 100 claims, 60 are below 1,000, 30 are between 1,000 and 3,000, and 10 exceed 3,000.… |
| `Concepts/Increased Limits.md:27` | 27 | 5,000 uncensored claims have these losses: 2,324 claims of at most $\$100{,}000$ total… |
| `Concepts/Incurred Losses.md:31` | 32 | An accident year has $\$450{,}000$ paid and $\$350{,}000$ of case outstanding at 24 mon… |
| `Concepts/Independent Events.md:28` | 27 | 30% of an insurer's drivers are young, 13% have a claim, and 6% are young and have a cl… |
| `Concepts/Independent Events.md:39` | 31 | Two drivers are insured separately. Ana files a claim with probability 0.2 and Ben with… |
| `Concepts/Independent Events.md:56` | 34 | A driver has an accident in a year with probability 0.1, independently from year to yea… |
| `Concepts/Independent Events.md:62` | 35 | A fair coin is tossed twice. Let $E$ be "the first toss is heads", $F$ be "the second t… |
| `Concepts/Independent and Identically Distributed.md:27` | 31 | Each policy has 0, 1 or 2 claims with probabilities 0.50, 0.35 and 0.15, independently… |
| `Concepts/Inflation.md:70` | 31 | Losses are exponential with mean 1,000, with a deductible of 500. Every loss rises 10%… |
| `Concepts/Inflation.md:94` | 33 | Losses are exponential with mean 2,000, and a policy pays each loss up to 3,000. Every… |
| `Concepts/Insurance Portfolio.md:33` | 34 | A portfolio has 1,000 independent policies, each with an annual loss of mean 1,000 and… |
| `Concepts/Insurance Portfolio.md:50` | 50 | Each home in a coastal portfolio has an annual loss with mean $\mu$ and standard deviat… |
| `Concepts/Insurance Premium.md:48` | 27 | Calendar Year 2024 earned premium is $\$5{,}000{,}000$, its on-level factor is $1.0115$… |
| `Concepts/Insurer.md:40` | 28 | Each homeowners policy has an annual loss with mean 1,000 and standard deviation 5,000.… |
| `Concepts/Insurer.md:62` | 33 | An insurer has assets of 1,200M, claim liabilities of 700M and other liabilities of 200… |
| `Concepts/Intensity Function.md:34` | 31 | Claims arrive as a nonhomogeneous Poisson process with intensity $\lambda(t) = 2t$ clai… |
| `Concepts/Intensity Function.md:45` | 40 | During a six-month season, storms arrive as a nonhomogeneous Poisson process with inten… |
| `Concepts/Intensity Function.md:59` | 31 | With the storm-season intensity above, the season produced exactly 3 storms. What is th… |
| `Concepts/Interaction.md:28` | 47 | A Poisson frequency GLM has vehicle age $x_1$, an indicator $x_2$ that is 1 for a sport… |
| `Concepts/Interaction.md:41` | 32 | A model with an intercept, two indicators and their interaction gives fitted means $\mu… |
| `Concepts/Interarrival Time.md:31` | 29 | Claims arrive as a Poisson process at a rate of 2 per month. What is the probability th… |
| `Concepts/Interarrival Time.md:44` | 28 | Claims arrive as a Poisson process at a rate of 2 per day. What are the mean and the st… |
| `Concepts/Interarrival Time.md:55` | 38 | Large claims arrive as a Poisson process at a rate of 1 per month. Three weeks have pas… |
| `Concepts/Interarrival Time.md:69` | 59 | Large property losses arrive as a Poisson process at a rate of 3 per year, and large ca… |
| `Concepts/Interarrival Time.md:84` | 29 | Exactly one claim occurred during a year under a Poisson process. What is the probabili… |
| `Concepts/Inversion Method.md:74` | 35 | Claims arrive as a Poisson process at a rate of 2 per month. Using the random numbers $… |
| `Concepts/Joint Life.md:48` | 32 | Two independent lives, aged 40 and 50, have ${}_{10}p_{40} = 0.95$ and ${}_{10}p_{50} =… |
| `Concepts/Joint Life.md:73` | 38 | Life annuities-due on $(40)$ and $(50)$ have actuarial present values 15 and 13, and th… |
| `Concepts/Joint Probability Function.md:50` | 28 | $X$ and $Y$ are the numbers of auto and home claims, with the joint probability functio… |
| `Concepts/K-Means Clustering.md:57` | 26 | The observations are 2, 5 and 9 on one variable, and the starting centroids are 2 and 5… |
| `Concepts/K-Nearest Neighbors.md:41` | 26 | The 3 nearest neighbors of a new claim are labelled Fraud, Fraud and Not Fraud. What ar… |
| `Concepts/Kolmogorov-Smirnov Test.md:35` | 29 | Eight claims are observed: 45, 110, 180, 260, 390, 520, 800 and 1,350. Does a Kolmogoro… |
| `Concepts/Large Deductible Policy.md:34` | 56 | A commercial general liability policy has a $\$500{,}000$ per-occurrence deductible on… |
| `Concepts/Large Deductible Policy.md:54` | 39 | Expected ground-up workers compensation losses are $\$2{,}400{,}000$, and $\text{LER}(\… |
| `Concepts/Large Loss.md:27` | 27 | A general liability class produced $\$14{,}000{,}000$ of losses on 20,000 exposures ove… |
| `Concepts/Large Loss.md:71` | 43 | An accident year's reported losses at 12 months are $\$4{,}500{,}000$, including one $\… |
| `Concepts/Life Annuity.md:71` | 35 | The Illustrative Life Table at $i = 0.06$ gives $l_{40} = 9{,}313{,}166$, $l_{65} = 7{,… |
| `Concepts/Life Annuity.md:84` | 28 | With the life table in the first example at $i = 0.05$, what is the actuarial present v… |
| `Concepts/Life Annuity.md:110` | 27 | For the life table in the first example at $i = 0.05$, $A_{60} = 0.84128$ and ${}^2A_{6… |
| `Concepts/Lifetime Value.md:27` | 49 | A 22-year-old driver's premium is $\$810$, $\$800$, $\$790$ and $\$780$ over four years… |
| `Concepts/Lifetime Value.md:48` | 27 | A policy costs $\$900$ in year 1, including the new business expenses, and $\$700$ in y… |
| `Concepts/Lifetime Value.md:64` | 32 | 1,000 policies are up for renewal at a $\$1{,}000$ premium and an expected cost of $\$7… |
| `Concepts/Lift.md:26` | 41 | On decile plots with loss costs divided by the average predicted loss cost, the current… |
| `Concepts/Lift.md:43` | 30 | A fraud model's lowest decile has an actual fraud rate of $0.05$ and its highest decile… |
| `Concepts/Likelihood Ratio Test.md:41` | 28 | Claim sizes are exponential with mean $\theta$. A sample of 50 claims has mean 1,200. D… |
| `Concepts/Likelihood Ratio Test.md:67` | 33 | A gamma model fitted to claim sizes has maximized log-likelihood $-2{,}401.2$, and its… |
| `Concepts/Likelihood Ratio Test.md:84` | 29 | A Poisson GLM with 4 parameters has maximized log-likelihood $-412.6$. Adding a territo… |
| `Concepts/Likelihood Ratio Test.md:99` | 42 | A linear model with residual sum of squares 520 on 46 degrees of freedom gains two pred… |
| `Concepts/Limited Expected Value.md:62` | 28 | Losses are exponential with mean 1,000. A policy has a deductible of 500 and a limit of… |
| `Concepts/Limited Fluctuation Credibility.md:41` | 43 | Claim counts are Poisson, and claim sizes have mean 2,000 and standard deviation 4,000.… |
| `Concepts/Line of Business.md:27` | 38 | Claims from commercial auto policies are reported and settled more slowly than claims f… |
| `Concepts/Line of Business.md:36` | 35 | An insurer reserves its personal auto line as one triangle. Its auto property damage cl… |
| `Concepts/Linear Algebra.md:75` | 29 | Two standardized variables have the covariance matrix with rows $(1, 0.6)$ and $(0.6, 1… |
| `Concepts/Linear Combinations of Random Variables.md:28` | 29 | Each auto claim costs 10 and each home claim costs 5. The numbers of claims $X$ and $Y$… |
| `Concepts/Linear Mixed Model.md:33` | 32 | Claims from 50 policyholders are observed over 4 years, and the model is $Y_{ti} = \bet… |
| `Concepts/Linear Mixed Model.md:49` | 26 | In a random intercept model, $\sigma_u^2 = 0.04$ and $\sigma^2 = 0.16$. What are the ma… |
| `Concepts/Linear Mixed Model.md:79` | 26 | Removing a random intercept raises $-2\,l$ from $812.4$ to $818.0$ under REML, with the… |
| `Concepts/Linear Regression.md:60` | 36 | An actuary fits claim counts, mostly 0, 1 or 2, by linear regression on territory and e… |
| `Concepts/Linear Trend.md:32` | 31 | Accident-year pure premiums are $\$212$, $\$219$, $\$227$, $\$233$ and $\$241$ for 2020… |
| `Concepts/Linear Trend.md:44` | 40 | Claim frequency on a line where a safety device is spreading is $0.0800$, $0.0725$, $0.… |
| `Concepts/Link Function.md:72` | 54 | A log-link frequency GLM has an intercept of $-2.0$, a coefficient of $0.30$ for the ur… |
| `Concepts/Loading Vector.md:27` | 28 | PCA on four standardized telematics variables gives the first loading vector $(0.52, 0.… |
| `Concepts/Local Regression.md:36` | 29 | A local linear regression of claim frequency on driver age uses $n = 50$ age groups and… |
| `Concepts/Local Regression.md:69` | 33 | A local regression of loss ratio on policy tenure for $n = 400$ policies is fitted with… |
| `Concepts/Log-Linear Model.md:93` | 42 | A $2 \times 2 \times 3$ table of $A$, $B$ and $C$ gives deviance $14.0$ on 6 degrees of… |
| `Concepts/Logistic Regression.md:36` | 33 | A logistic regression for the probability that a policy renews has $\hat\beta_0 = 1.20$… |
| `Concepts/Logistic Regression.md:48` | 30 | In the renewal model above, what are the odds of renewal for a $10\%$ rate increase, an… |
| `Concepts/Long Tail Lines.md:27` | 50 | A general liability accident year has $\$800{,}000$ of reported claims at 12 months. Th… |
| `Concepts/Long Tail Lines.md:40` | 33 | In the general liability year above, one large claim is reserved a few weeks earlier, s… |
| `Concepts/Loss Development.md:29` | 52 | Reported losses for Accident Year 2024 at 12 months are $\$4{,}200{,}000$. The selected… |
| `Concepts/Loss Random Variable.md:32` | 27 | A loss is 0, 500, 2,000 or 5,000 with probabilities 0.5, 0.3, 0.15 and 0.05. The policy… |
| `Concepts/Loss Random Variable.md:81` | 31 | Losses are exponential with mean 2,000. A policy has a deductible of 250 and pays 75% o… |
| `Concepts/Loss Ratio Method.md:27` | 37 | Projected ultimate losses and LAE are $65\%$ of projected premium at current rate level… |
| `Concepts/Loss Ratio Method.md:42` | 37 | Projected losses and LAE are $72\%$ of premium, variable expenses $22\%$, fixed expense… |
| `Concepts/Loss Ratio Method.md:60` | 50 | Three accident years have the data below. Loss trend is $5\%$ a year, with trend period… |
| `Concepts/Loss Ratio.md:71` | 31 | An insurer projects ultimate losses and LAE of $\$715{,}000$ against $\$1{,}000{,}000$… |
| `Concepts/Loss Ratio.md:81` | 29 | Reported loss ratios at 24 months are 61%, 62%, 60% and 71% for four successive acciden… |
| `Concepts/Loss Reserving.md:28` | 27 | An insurer has $\$10{,}000{,}000$ of reported claims and $\$6{,}000{,}000$ of paid clai… |
| `Concepts/Loss Trend.md:26` | 36 | Rates will be in effect for annual policies written from $7/1/2025$ to $6/30/2026$. The… |
| `Concepts/Loss Trend.md:42` | 27 | Frequency trend is $-2\%$ a year and severity trend is $+6\%$ a year. What is the pure… |
| `Concepts/Loss Trend.md:69` | 46 | Accident Year 2023's average accident date is $7/1/2023$. The latest point in the trend… |
| `Concepts/Loss and Loss Adjustment Expense.md:38` | 39 | An accident year has ultimate losses of $\$650{,}000$ and ultimate ALAE of $\$78{,}000$… |
| `Concepts/Loss and Loss Adjustment Expense.md:58` | 45 | Accident Year 2023 reported losses at 24 months are $\$5{,}000{,}000$, including a $\$2… |
| `Concepts/Loss and Loss Adjustment Expense.md:69` | 34 | An insurer pays one attorney to defend its insured against a liability suit and another… |
| `Concepts/Marginal Model Plot.md:27` | 45 | A Gamma GLM models claim severity with a linear term in vehicle age. In the marginal mo… |
| `Concepts/Marginal Probability Function.md:39` | 29 | A policyholder files $X$ claims, from 0 to 3, and $Y$ of them are paid, so $0 \le y \le… |
| `Concepts/Markov Chain.md:33` | 50 | Each day a commuter either drives (state 1) or takes the train (state 2). After a day o… |
| `Concepts/Maximum Likelihood Estimation.md:63` | 30 | Claim sizes are exponential with mean $\theta$, and the maximum likelihood estimate of… |
| `Concepts/Maximum Likelihood Estimation.md:79` | 44 | Ground-up losses are exponential with mean $\theta$. Only losses above a deductible of… |
| `Concepts/Mean Time Spent in Transient States.md:36` | 71 | Each month a claim is Open (O), in Litigation (L) or Closed (C). From O it stays O with… |
| `Concepts/Mean Time Spent in Transient States.md:69` | 33 | Policyholders move each year among Low, Medium and High risk tiers. A policyholder is L… |
| `Concepts/Method of Moments.md:34` | 30 | Losses follow a [[Pareto Distribution\|Pareto distribution]] with $\alpha = 3$ and unkno… |
| `Concepts/Method of Moments.md:70` | 42 | Of 100 losses, 60 are in $(0, 1{,}000]$, 30 are in $(1{,}000, 3{,}000]$ and 10 are in $… |
| `Concepts/Mix of Business.md:26` | 29 | Two territories have stable loss ratios of $80\%$ (urban) and $55\%$ (rural). The urban… |
| `Concepts/Mix of Business.md:40` | 41 | A combined package triangle is $70\%$ property, with a $12$-to-$24$ factor of $1.05$, a… |
| `Concepts/Mixed Poisson Process.md:43` | 44 | Half of a book of drivers have a claim rate of 0.1 per year and half have a rate of 0.3… |
| `Concepts/Mixed Poisson Process.md:57` | 41 | Annual claim rates across a portfolio are gamma distributed with mean 0.2 and variance… |
| `Concepts/Mixed Poisson Process.md:69` | 40 | Annual claim rates are gamma distributed with mean 0.2 and variance 0.04, and each insu… |
| `Concepts/Mixed Poisson Process.md:84` | 44 | In a portfolio, 70% of drivers have a claim rate of 0.1 per year and 30% have a rate of… |
| `Concepts/Mixing Distribution.md:30` | 40 | In a motor portfolio, 75% of drivers have a claim rate of 0.2 per year and 25% have a r… |
| `Concepts/Mixing Distribution.md:44` | 45 | Annual claim rates across a portfolio are gamma distributed with $\alpha = 2$ and $\the… |
| `Concepts/Mixing Distribution.md:59` | 35 | In the motor portfolio above, a driver has exactly 1 claim in a year. What is the proba… |
| `Concepts/Mixing Distribution.md:75` | 27 | Annual claim rates are gamma distributed with $\alpha = 2$ and $\theta = 0.1$. An insur… |
| `Concepts/Mixture Distribution.md:31` | 29 | Of a portfolio's claims, 70% are exponential with mean 1,000 and 30% are Pareto with $\… |
| `Concepts/Mixture Distribution.md:70` | 26 | Each insured's claim size is exponential with rate $\Lambda$, and $\Lambda$ is gamma wi… |
| `Concepts/Model Diagnostics.md:78` | 36 | A regression with 4 predictors and an intercept is fitted to 50 policies. Policy A has… |
| `Concepts/Model Output.md:48` | 32 | A regression with 3 predictors is fitted to 50 claims, with $\text{TSS} = 3{,}040$ and… |
| `Concepts/Model Output.md:64` | 41 | A Gamma severity GLM with a log link reports an intercept of 7.00, a coefficient of 0.1… |
| `Concepts/Model Output.md:81` | 28 | A model of loss ratios with a random intercept for each agency has $-2l = 412.8$. The s… |
| `Concepts/Model Selection.md:26` | 29 | Two models are fitted to 200 observations. Model 1 has 4 parameters and maximized log-l… |
| `Concepts/Model Selection.md:54` | 28 | Average repair costs per claim are modelled by vehicle class. The costs are positive, a… |
| `Concepts/Model Selection.md:84` | 37 | A normal copula and a Gumbel copula with the same rank correlation fit the joint losses… |
| `Concepts/Model Structure.md:59` | 34 | A frequency model has main effects for territory and for vehicle age. The data show tha… |
| `Concepts/Model Structure.md:70` | 33 | Model 1 has main effects for territory and vehicle age, with 6 parameters and log-likel… |
| `Concepts/Moments for Linear Combinations.md:28` | 35 | A policyholder has $E[X] = 0.40$ auto claims and $E[Y] = 0.70$ home claims a year, and… |
| `Concepts/Moments for Linear Combinations.md:84` | 28 | An insurer covers 100 independent policyholders, each with an annual cost of mean 7.5 a… |
| `Concepts/Multicollinearity.md:30` | 27 | Regressing vehicle value on the other predictors gives $R^2 = 0.92$. What is the VIF of… |
| `Concepts/Multicollinearity.md:45` | 32 | The coefficient of a predictor has standard error 0.40 in a simple regression on that p… |
| `Concepts/Multicollinearity.md:56` | 35 | A severity model includes vehicle age and vehicle value, whose correlation is $-0.94$.… |
| `Concepts/Multinomial Logistic Regression.md:36` | 38 | A renewal model has three outcomes: renew unchanged (the reference category), renew wit… |
| `Concepts/Multinomial Logistic Regression.md:51` | 42 | In the renewal model, $\eta_{\text{reduce}} = -1.2 + 0.05x$ and $\eta_{\text{lapse}} =… |
| `Concepts/Multiple Comparisons.md:29` | 35 | An actuary tests 10 candidate rating variables, each at significance level 0.05. If non… |
| `Concepts/Multiple Comparisons.md:58` | 56 | Six territories have 4 claims each, and the ANOVA gives $\hat{\sigma}^2 = 2.25$ on 18 d… |
| `Concepts/Multiple Comparisons.md:89` | 29 | Four groups have 6 observations each, with means 10.2, 11.0, 12.5 and 9.8, and $\hat{\s… |
| `Concepts/Multivariate Distribution.md:57` | 29 | Each of 10 independent claims is auto, home or liability with probabilities 0.5, 0.3 an… |
| `Concepts/Multivariate Distribution.md:78` | 31 | A file holds 12 claims: 5 auto, 4 home and 3 liability. An auditor draws 4 without repl… |
| `Concepts/Mutually Exclusive Events.md:49` | 27 | An urn holds 3 red balls and 2 blue balls. Two are drawn at random without replacement.… |
| `Concepts/Mutually Exclusive Events.md:65` | 41 | Each claim is classified as exactly one of property damage, bodily injury or other. 60%… |
| `Concepts/Naive Bayes.md:30` | 36 | In training data, $4\%$ of claims are fraudulent. A claim was reported late and is soft… |
| `Concepts/Naive Bayes.md:54` | 65 | A second fraud model uses two predictors, the report lag and the soft-tissue flag. The… |
| `Concepts/Nested and Crossed Factors.md:35` | 39 | Are these nested or crossed: vehicles on multi-vehicle policies with effects for policy… |
| `Concepts/Nested and Crossed Factors.md:50` | 38 | A model of log claim-closing time has office variance $0.04$, adjuster-within-office va… |
| `Concepts/Nested and Crossed Factors.md:59` | 33 | A crossed model of territory loss ratios has territory variance $0.012$, accident-year… |
| `Concepts/Net Losses.md:46` | 27 | An accident year's gross ultimate claims, developed on the gross triangle, are $\$12{,}… |
| `Concepts/Net Losses.md:54` | 29 | An actuary selects a tail factor of 1.08 for gross claims and 1.12 for net claims on a… |
| `Concepts/Net Losses.md:63` | 26 | A self-insurance pool retains $\$500{,}000$ per occurrence. Its ultimate claims limited… |
| `Concepts/Net of Reinsurance.md:28` | 32 | An insurer has a per-risk excess of loss treaty covering $\$750{,}000$ excess of $\$250… |
| `Concepts/Net of Reinsurance.md:42` | 26 | An insurer earns $\$2{,}000{,}000$ of gross premium and cedes $\$200{,}000$ under an ex… |
| `Concepts/Net of Reinsurance.md:57` | 54 | A property indication built gross has a projected loss and LAE ratio of 58%, a fixed ex… |
| `Concepts/Net of Reinsurance.md:72` | 30 | An insurer writes $\$1{,}000{,}000$ of premium with $\$600{,}000$ of losses and $\$250{… |
| `Concepts/Neural Network.md:31` | 30 | A network has two ReLU hidden units, with weights $w_{10} = 0.5$, $w_{11} = 1.0$, $w_{1… |
| `Concepts/Neyman-Pearson Lemma.md:28` | 29 | A single claim $X$ is exponential. What is the best critical region of size 0.05 for te… |
| `Concepts/Neyman-Pearson Lemma.md:52` | 36 | $H_0$: $X$ is uniform on $[0, 10]$, and $H_1$: $X$ is uniform on $[5, 10]$. A single ob… |
| `Concepts/Neyman-Pearson Lemma.md:63` | 37 | Claim sizes are normal with standard deviation 250. A sample of 25 claims tests $H_0: \… |
| `Concepts/Node Impurity.md:39` | 29 | A node holds 400 claims, 100 of them fraud. A split sends 200 left (80 fraud) and 200 r… |
| `Concepts/Non-Pricing Solutions.md:25` | 35 | Expected loss and LAE are $\$180$ per exposure, fixed expenses $\$20$, variable expense… |
| `Concepts/Non-Pricing Solutions.md:44` | 35 | A book has 10,000 policies averaging $\$580$ of premium and $\$420$ of expected loss an… |
| `Concepts/Noncentral Chi-Squared Distribution.md:39` | 47 | Four lines' loss-ratio deviations from plan are independent and normal with standard de… |
| `Concepts/Noncentral Chi-Squared Distribution.md:71` | 40 | Mean log severity in three territories is truly 8.0, 8.3 and 8.6, with $\sigma = 0.4$.… |
| `Concepts/Nonhomogeneous Poisson Process.md:29` | 41 | Claims arrive as a nonhomogeneous Poisson process with rate $\lambda(t) = 3 + 2t$ per m… |
| `Concepts/Nonhomogeneous Poisson Process.md:57` | 53 | Claims arrive at a rate of 12 per month during a 3-month season. A claim that arrives $… |
| `Concepts/Normal Approximation.md:28` | 27 | A portfolio has 400 independent policies. Each policy's annual claim amount has mean 25… |
| `Concepts/Normal Approximation.md:88` | 30 | Each policy's claim amount has mean $\mu$ and standard deviation $4\mu$. How many indep… |
| `Concepts/Normal Distribution.md:56` | 28 | Losses are normal with mean 50,000 and standard deviation 5,000. What is the probabilit… |
| `Concepts/Occurrence Coverage.md:27` | 36 | A general liability policy runs $1/1/2024$ to $12/31/2024$. A customer slips and falls… |
| `Concepts/Occurrence Coverage.md:51` | 28 | Report Year 2024's loss cost is $\$1{,}000$, and loss costs rise 6% each report year. C… |
| `Concepts/Offset Variable.md:37` | 37 | A Poisson GLM for claim counts has $\ln(\text{Exposure})$ as an offset and $\hat{\eta}… |
| `Concepts/Offset Variable.md:50` | 27 | A pure premium GLM with a log link carries a deductible factor of 0.90 and an increased… |
| `Concepts/Offset Variable.md:63` | 52 | A logistic model gives a policy a probability of 0.20 of renewing. A new model adds a v… |
| `Concepts/On Level Premium.md:29` | 36 | Rates changed $+8\%$ on $1/1/2022$, $+5\%$ on $7/1/2023$ and $-3\%$ on $1/1/2025$, each… |
| `Concepts/On Level Premium.md:42` | 31 | Rates rose 10% on $1/1/2024$, with annual policies written uniformly. Earned premium wa… |
| `Concepts/On-Leveling.md:26` | 35 | Rates increased 12% for policies written on or after $7/1/2023$. Policies are annual, p… |
| `Concepts/On-Leveling.md:48` | 32 | A law change cuts rates 5% on all policies in force from $7/1/2024$. What share of Cale… |
| `Concepts/On-Leveling.md:60` | 35 | A crop insurer writes 80% of its annual policies in March and the rest through the year… |
| `Concepts/Order Statistics.md:87` | 29 | A system fails as soon as either of two independent components fails. The lifetimes are… |
| `Concepts/Ordinal Logistic Regression.md:34` | 41 | Claims are banded as small ($Y = 1$), medium ($Y = 2$) or large ($Y = 3$). A proportion… |
| `Concepts/Ordinary Least Squares.md:45` | 30 | Average claim severity, in thousands, for years $x = 1, 2, 3, 4, 5$ is $10.0$, $10.6$,… |
| `Concepts/Overall Rate Level Indication.md:34` | 51 | Two accident years have the premium and losses below. Loss trend is $6\%$ a year, with… |
| `Concepts/Overall Rate Level Indication.md:75` | 28 | The two years' projected loss and LAE ratios are $82.9\%$ on $\$13{,}020{,}000$ of prem… |
| `Concepts/Paid Losses.md:26` | 26 | An accident year has $\$4{,}300{,}000$ of reported claims and $\$1{,}900{,}000$ of case… |
| `Concepts/Paid Losses.md:41` | 43 | A liability line is 55% reported and 20% paid at 12 months. Its 12-month figures for on… |
| `Concepts/Paid Losses.md:56` | 30 | An accident year at 24 months has $\$2{,}400{,}000$ of paid claims and $\$1{,}900{,}000… |
| `Concepts/Parallelogram Method.md:40` | 38 | Annual policies are written uniformly. Rates changed $+5\%$ on $7/1/2010$, $+10\%$ on $… |
| `Concepts/Parallelogram Method.md:62` | 30 | A personal auto book writes six-month policies uniformly. Rates rose 10% for policies w… |
| `Concepts/Parameter Estimate Tables.md:66` | 29 | A linear regression with 4 predictors is fitted to 30 observations. A coefficient is es… |
| `Concepts/Parameter Estimate Tables.md:77` | 43 | A Poisson frequency GLM with a log link reports an intercept of $-2.10$, territory A (d… |
| `Concepts/Parameter Estimate Tables.md:87` | 46 | A linear regression of salary on experience and an indicator Male (1 for male, 0 for fe… |
| `Concepts/Parameter Estimation.md:38` | 30 | A random sample of $n$ losses is drawn from a uniform distribution on $(0, \theta)$. Wh… |
| `Concepts/Parameter Estimation.md:95` | 51 | Accident year 1 has cumulative losses of 100 at age 1 and 150 at age 2. Accident year 2… |
| `Concepts/Parameter Estimation.md:108` | 38 | Premiums for accident years 1 to 3 are 1,000, 1,100 and 1,200. The growth curve gives $… |
| `Concepts/Pareto Distribution.md:68` | 34 | Losses follow a Pareto distribution with $\alpha = 3$ and $\theta = 2{,}000$. A policy… |
| `Concepts/Partial Credibility.md:28` | 31 | A rating class produced 300 claims against a full credibility standard of 1,082 claims.… |
| `Concepts/Partial Least Squares.md:36` | 31 | Four policies have standardized predictors $x_1$ and $x_2$ and claim cost $y$ as below.… |
| `Concepts/Payment Random Variable.md:31` | 29 | A policy has a deductible of 200, pays 80% of the excess and caps its payment at 400. W… |
| `Concepts/Payment Random Variable.md:47` | 30 | A loss is uniform on $(0, 1000)$. A policy has a deductible of 200, pays 80% of the exc… |
| `Concepts/Payment Random Variable.md:68` | 29 | A loss is uniform on $(0, 1000)$. A policy has a deductible of 200, pays 80% of the exc… |
| `Concepts/Payment Random Variable.md:82` | 36 | Losses are exponential with mean 1,000. A policy has a deductible of 200 and pays 80% o… |
| `Concepts/Payment Random Variable.md:95` | 37 | A policy has a deductible of 200, coinsurance of 75% and a limit of 900. What does it p… |
| `Concepts/Percentile Matching.md:24` | 27 | Claim sizes are exponential with unknown mean $\theta$. The smoothed empirical median o… |
| `Concepts/Percentile Matching.md:49` | 37 | Eleven losses are 54, 95, 140, 190, 230, 310, 380, 450, 620, 840 and 1,300. A loglogist… |
| `Concepts/Permissible Loss Ratio.md:26` | 31 | An insurer's variable expenses are $25\%$ of premium and its target profit provision is… |
| `Concepts/Permissible Loss Ratio.md:49` | 38 | Variable expenses are $22\%$ of premium, fixed expenses $8\%$ and the target profit pro… |
| `Concepts/Permissible Loss Ratio.md:59` | 53 | Three books each have a projected loss and LAE ratio of $68\%$ and a target profit prov… |
| `Concepts/Poisson Process.md:51` | 38 | Claims arrive as a Poisson process at a rate of 4 per month. What is the expected time… |
| `Concepts/Poisson Process.md:67` | 35 | Claims arrive as a Poisson process at a rate of 4 per month. What is the expected time… |
| `Concepts/Poisson Process.md:81` | 35 | Claims arrive as a Poisson process at a rate of 10 per year. Each claim independently e… |
| `Concepts/Poisson Process.md:93` | 47 | Collision claims arrive at a rate of 3 per month and comprehensive claims at a rate of… |
| `Concepts/Poisson Regression.md:32` | 38 | A Poisson regression for annual claim counts has $\hat\beta_0 = -2.30$, a coefficient o… |
| `Concepts/Poisson Regression.md:65` | 31 | A Poisson regression has residual deviance $1{,}840$ on $600$ degrees of freedom, and i… |
| `Concepts/Poisson Superposition.md:26` | 49 | On a block of auto policies, collision claims arrive at a rate of 3 per month, comprehe… |
| `Concepts/Poisson Superposition.md:42` | 34 | In the same block of auto policies, 8 claims occurred in a month. What is the probabili… |
| `Concepts/Poisson Superposition.md:54` | 43 | Large property losses arrive at a rate of 3 per year and large casualty losses at a rat… |
| `Concepts/Poisson Thinning.md:28` | 60 | Claims arrive as a Poisson process at a rate of 20 per year. Each claim is a collision… |
| `Concepts/Poisson Thinning.md:44` | 54 | Losses occur as a Poisson process at a rate of 10 per year. Loss amounts are exponentia… |
| `Concepts/Poisson Thinning.md:58` | 57 | Claims occur as a Poisson process at a rate of 20 per month, starting at time 0. The de… |
| `Concepts/Policy Information.md:29` | 41 | A health policy says the insured pays the first 500 of any claim, the insurer covers 80… |
| `Concepts/Policy Information.md:43` | 30 | A policy has a deductible of 250, a coinsurance percentage of 90% and a maximum payment… |
| `Concepts/Policy Information.md:58` | 28 | The health policy above instead covers losses up to 10,000, then pays 80% of the covere… |
| `Concepts/Policy Information.md:66` | 31 | A policy pays nothing on the first 200 of costs, 100% of costs from 200 to 1,000 and 50… |
| `Concepts/Policy Provision Changes.md:29` | 32 | A reform cuts benefits by $20\%$ for accidents on or after $7/1/2024$, with accidents u… |
| `Concepts/Policy Provision Changes.md:35` | 28 | A law change raises losses by $5\%$ on annual policies written on or after $7/1/2024$,… |
| `Concepts/Policy Provision Changes.md:46` | 29 | A deductible rises from $\$1{,}000$ to $\$5{,}000$. Of $1{,}000$ historical claims, alr… |
| `Concepts/Policy Year.md:57` | 31 | Annual policies are written evenly through policy year 2024. What are its average writt… |
| `Concepts/Policyholder.md:30` | 38 | A policy has a deductible of 500, the insurer pays 75% of the loss above it, and the in… |
| `Concepts/Polynomial Regression.md:27` | 36 | Average claim severity, in thousands, is fitted as a quadratic in vehicle age $x$, with… |
| `Concepts/Posterior Distribution.md:29` | 48 | A portfolio is 75% good drivers, whose annual claim counts are Poisson with mean $0.2$,… |
| `Concepts/Posterior Distribution.md:49` | 41 | A group policy covers 50 employees, each with probability $q$ of a claim in the year, a… |
| `Concepts/Posterior Distribution.md:62` | 30 | In the driver portfolio above, the driver with 1 claim in the first year has 0 claims i… |
| `Concepts/Power of a Test.md:29` | 33 | In 10 independent trials with success probability $q$, a test of $H_0: q = 0.5$ against… |
| `Concepts/Power of a Test.md:45` | 34 | Claim sizes are normal with standard deviation 800. A test of $H_0: \mu = 5{,}000$ agai… |
| `Concepts/Power of a Test.md:61` | 33 | Claim sizes are normal with standard deviation 800. How many claims does a test of $H_0… |
| `Concepts/Prediction Interval.md:27` | 34 | Quarterly claim frequency is fitted as $x_t = 2.4 + 0.6x_{t-1} + w_t$, and the software… |
| `Concepts/Prediction Interval.md:38` | 29 | An ARIMA model fitted to the log of monthly average severity forecasts $8.70$ for next… |
| `Concepts/Prediction Interval.md:57` | 35 | A regression on $n = 12$ points has $\bar{x} = 5$, $S_{xx} = 40$ and $s = 3$, and its f… |
| `Concepts/Predictive Accuracy.md:47` | 31 | A fraud model scores three fraudulent holdout claims $0.92$, $0.74$ and $0.48$, and sev… |
| `Concepts/Predictive Accuracy.md:65` | 39 | Model B's predictions are $1.10$ times Model A's. In four equal-exposure buckets of a h… |
| `Concepts/Predictive Analytics.md:29` | 37 | A Poisson frequency model with a log link predicts 0.06 claims per car-year for a risk,… |
| `Concepts/Predictive Distribution.md:29` | 40 | Drivers are 75% good (Poisson mean $0.2$) and 25% bad (Poisson mean $0.6$). After one c… |
| `Concepts/Predictive Distribution.md:45` | 26 | Claim counts are Poisson with mean $\Lambda$, and $\Lambda$ is gamma with shape $\alpha… |
| `Concepts/Predictive Distribution.md:61` | 29 | With the gamma prior above ($\alpha = 2$, $\beta = 0.5$), a driver had 0, 2 and 1 claim… |
| `Concepts/Predictor Variable.md:29` | 28 | A log-link frequency GLM has $\hat{\eta} = -4.0 + 0.30 \ln x$, where $x$ is the amount… |
| `Concepts/Predictor Variable.md:42` | 40 | A frequency file holds the claim count, earned car-years, accident year, territory, dri… |
| `Concepts/Predictor Variable.md:59` | 41 | Regressing vehicle value on the other predictors gives $R_j^2 = 0.84$. If the predictor… |
| `Concepts/Premium Audit.md:60` | 43 | A workers compensation carrier writes one policy a month in 2011, each booked at $\$500… |
| `Concepts/Premium Trend.md:30` | 43 | A homeowners book has on-level earned premium of $\$5{,}000{,}000$ for Accident Year 20… |
| `Concepts/Premium Trend.md:39` | 38 | Rates will take effect on $1/1/2013$ for one year, on annual policies. The experience p… |
| `Concepts/Premium Trend.md:60` | 42 | An auto insurer introduced a higher-deductible option in mid-2024, and take-up moved qu… |
| `Concepts/Principal Components Analysis.md:26` | 26 | Three observations of two variables are $(2, 9)$, $(6, 5)$ and $(7, 10)$. The first pri… |
| `Concepts/Principal Components Analysis.md:45` | 28 | Two standardized variables have correlation 0.6, and the eigenvalues of their correlati… |
| `Concepts/Principal Components Regression.md:30` | 28 | Two standardized predictors have first principal component loadings 0.8 and 0.6. A PCR… |
| `Concepts/Principal Components Regression.md:53` | 29 | A PCR on 40 standardized predictors has its smallest cross-validated MSE at $M = 6$. Ho… |
| `Concepts/Principles of Ratemaking.md:33` | 27 | A projected pure premium is $\$250$, fixed expenses are $\$38$ per exposure, variable e… |
| `Concepts/Principles of Ratemaking.md:45` | 26 | An insurer charges every commercial auto risk the same rate whatever its radius of oper… |
| `Concepts/Probabilities for Linear Combinations.md:28` | 30 | A policyholder's numbers of auto claims $X$ and home claims $Y$ in a year have the join… |
| `Concepts/Probability Addition Rule.md:34` | 35 | Over a year, 30% of an insurer's policyholders file a property claim, 20% file a liabil… |
| `Concepts/Probability Addition Rule.md:54` | 38 | A policyholder has probability 0.75 of no emergency room visit this year, 0.80 of no ho… |
| `Concepts/Probability Distributions.md:39` | 36 | A policy has a claim in a year with probability 0.2, independently of 9 other policies.… |
| `Concepts/Probability Distributions.md:57` | 35 | Claims arrive as a Poisson process at a rate of 2 per year. What is the distribution of… |
| `Concepts/Probability Multiplication Rule.md:36` | 34 | 60% of an insurer's customers insure more than one car. Of those customers, 20% insure… |
| `Concepts/Probability Multiplication Rule.md:55` | 29 | A portfolio has 10 policies, 4 of which will have a claim. Two policies are drawn at ra… |
| `Concepts/Probability Multiplication Rule.md:60` | 30 | From the same 10 policies, policies are drawn without replacement until one with a clai… |
| `Concepts/Profit and Contingency Provision.md:48` | 35 | Workers compensation claims are settled years after the premium is paid, while auto col… |
| `Concepts/Proportion of Variance Explained.md:29` | 27 | Three observations of two variables are $(2, 9)$, $(6, 5)$ and $(7, 10)$. The first loa… |
| `Concepts/Proportion of Variance Explained.md:43` | 28 | PCA on 8 standardized rating variables gives eigenvalues 3.6, 1.9, 1.0, 0.6, 0.4, 0.3,… |
| `Concepts/Proportion of Variance Explained.md:55` | 27 | The eight eigenvalues are 3.6, 1.9, 1.0, 0.6, 0.4, 0.3, 0.2 and 0.0. How many principal… |
| `Concepts/Pure Premium Analysis.md:48` | 42 | Territory 1 above has 179 of its 294 homes at a high amount of insurance, and Territory… |
| `Concepts/Pure Premium Analysis.md:77` | 26 | A personal auto insurer changed its rating algorithm's many variables several times dur… |
| `Concepts/Pure Premium Method.md:61` | 41 | A homeowners insurer expects reinsurance recoveries of $\$458{,}673$ on a contract cost… |
| `Concepts/Pure Premium Method.md:80` | 34 | The same book has trended on-level earned premium of $\$2{,}178{,}550$, which is 5,126… |
| `Concepts/Pure Premium.md:33` | 28 | A homeowners book has 12,000 earned house-years, 960 ultimate claims and $\$5{,}280{,}0… |
| `Concepts/Pure Premium.md:51` | 46 | An accident year has $\$2{,}000{,}000$ of reported losses and LAE at 24 months and 10,0… |
| `Concepts/Pure Premium.md:69` | 28 | The homeowners book's projected pure premium is $\$440$. Fixed expenses are $\$30$ per… |
| `Concepts/QQ Plot.md:57` | 29 | The normal QQ plot of a severity regression's residuals follows the reference line in t… |
| `Concepts/Quadratic Discriminant Analysis.md:35` | 32 | Attritional claims have log-severity $N(8, 0.5^2)$ and make up $90\%$ of claims. Comple… |
| `Concepts/Quadratic Discriminant Analysis.md:62` | 29 | A model classifies policies into 3 classes using 10 predictors. How many covariance par… |
| `Concepts/Quantile Plot.md:27` | 37 | In five equal-exposure quintiles of a holdout set, actual loss costs relative to the av… |
| `Concepts/Quantile Plot.md:42` | 29 | In five quintiles, Model A's actuals are $0.70$, $0.85$, $1.00$, $1.15$, $1.35$, and Mo… |
| `Concepts/Quasi-Likelihood.md:50` | 34 | A Poisson frequency model on 500 residual degrees of freedom has Pearson $X^2 = 1{,}450… |
| `Concepts/Quasi-Likelihood.md:67` | 41 | In the same model, adding a territory variable with 5 levels lowers the residual devian… |
| `Concepts/Random Effects.md:51` | 36 | A random intercept model of loss ratio by territory has $\sigma_u^2 = 0.010$ and $\sigm… |
| `Concepts/Random Intercept and Slope.md:44` | 36 | Log paid losses are modelled against development age with a random intercept by acciden… |
| `Concepts/Random Sample.md:45` | 35 | Four losses are a random sample from a uniform distribution on $(0, 1{,}000)$. What is… |
| `Concepts/Rao-Blackwell Theorem.md:58` | 33 | Claim counts on five policies are Poisson with mean $\lambda$: 0, 2, 1, 0 and 1. Starti… |
| `Concepts/Rate Change.md:41` | 27 | The projected loss and LAE ratio is $65\%$, the fixed expense ratio $6.5\%$, variable e… |
| `Concepts/Rate Change.md:69` | 29 | The overall indication is $+8.0\%$. New territory relativities, applied to the current… |
| `Concepts/Rate Level Change.md:46` | 42 | Accident year $2021$'s ultimate claim ratio of $68\%$ is a fair a priori. Rates rose $6… |
| `Concepts/Ratemaking Constraints.md:28` | 32 | The indication is $+18\%$, and the regulator caps a single filing at $+10\%$. The book… |
| `Concepts/Ratemaking Constraints.md:49` | 26 | A jurisdiction bans credit-based insurance scores, which the insurer's model shows to b… |
| `Concepts/Ratemaking Data Organization.md:33` | 29 | A 12-month policy is written on 7/1/2024 for $\$1{,}200$. A loss occurs on 11/15/2024 a… |
| `Concepts/Ratemaking.md:32` | 29 | A book's current rates are expected to produce $\$1{,}000{,}000$ of premium. Its expect… |
| `Concepts/Ratemaking.md:59` | 33 | The projected pure premium is $\$250$ and fixed expenses are $\$40$ per exposure. Varia… |
| `Concepts/Ratemaking.md:74` | 34 | The projected loss and LAE ratio is 65% and the fixed expense ratio is 6.5%. Variable e… |
| `Concepts/Rating Algorithm.md:36` | 37 | The base rate is $\$500$, the territory relativity 1.20 and the class relativity 0.90.… |
| `Concepts/Rating Algorithm.md:51` | 45 | A class's relativity is raised from 0.85 to 0.95, an 11.8% increase. Of its 4,000 polic… |
| `Concepts/Reasonableness Testing.md:29` | 27 | A ratemaking extract shows earned premium per earned exposure of $\$820$, $\$845$ and $… |
| `Concepts/Reasonableness Testing.md:62` | 45 | At the prior year-end, accident year 2024 had $6{,}000$ of reported claims, a 12-month… |
| `Concepts/Reasonableness Testing.md:87` | 37 | A reserving model is run on 200 historical triangles. The largest gap between the sorte… |
| `Concepts/Recoveries.md:43` | 61 | The ratios of received S&S to paid claims were $0.060$, $0.095$ and $0.108$ at $12$, $2… |
| `Concepts/Recurrent and Transient States.md:33` | 63 | Each month a claim is Open (O), under Investigation (I) or Closed (C). From O it stays… |
| `Concepts/Recurrent and Transient States.md:101` | 41 | A Markov chain on states 1 to 4 moves $1 \to 2$ with probability 0.6 and $1 \to 3$ with… |
| `Concepts/Regression Spline.md:27` | 32 | A cubic spline in vehicle age $x$ has knots at 3 and 8 and the fitted function below. W… |
| `Concepts/Regression Spline.md:59` | 32 | Driver age has knots at 25, 35, 45, 55 and 65. How many degrees of freedom do a piecewi… |
| `Concepts/Regression Spline.md:72` | 39 | A cubic spline in building age has knots at 10, 20, 30 and 50. How many degrees of free… |
| `Concepts/Regression Through the Origin.md:38` | 37 | Five cedants have earned premiums of 10, 20, 30, 40 and 50 and incurred losses of 10, 1… |
| `Concepts/Regression Through the Origin.md:52` | 48 | Expenses of 48, 62, 66, 80 and 86 are regressed on policy counts of 10, 12, 14, 16 and… |
| `Concepts/Regression Through the Origin.md:63` | 38 | Rural claims of 2 and 4 and urban claims of 7 and 9 are fitted as $\beta_0 + \beta_1 I_… |
| `Concepts/Regularization.md:62` | 26 | Five candidate pairs $(\beta_1, \beta_2)$ have the RSS values below. Which pair is the… |
| `Concepts/Reinsurance Recovery.md:35` | 32 | An accident year has gross reported claims of $\$4{,}000{,}000$ with a gross CDF of $1.… |
| `Concepts/Reinsurance Recovery.md:46` | 31 | A self-insurance pool keeps $\$500{,}000$ per occurrence and buys a $\$1{,}500{,}000$ s… |
| `Concepts/Reinsurance.md:109` | 28 | Under the same treaty, an accident year's gross reported losses are $\$3{,}000{,}000$ a… |
| `Concepts/Rejection Method.md:34` | 37 | Claim sizes, in thousands, have density $f(x) = x e^{-x}$ for $x > 0$. Candidates are d… |
| `Concepts/Rejection Method.md:48` | 30 | A random variable has density $f(x) = 20x(1 - x)^3$ for $0 < x < 1$ and is simulated wi… |
| `Concepts/Report Year.md:22` | 40 | A general liability loss occurs on 11/15/2023 and is reported on 2/3/2024. It is paid $… |
| `Concepts/Report Year.md:40` | 46 | A physician buys a claims-made policy for 2026 with a retroactive date of 1/1/2025. Whi… |
| `Concepts/Report Year.md:63` | 29 | Report year 2024 has 820 claims, with reported losses of $\$6{,}150{,}000$ at 12 months… |
| `Concepts/Reserve Communication.md:39` | 36 | General liability unpaid claims rose $\$8.0$M in a year: $\$5.2$M from adverse developm… |
| `Concepts/Reserving Data Organization.md:27` | 32 | An annual policy is effective $7/1/2024$. A claim under it occurs on $3/15/2025$, is re… |
| `Concepts/Reserving Data Organization.md:56` | 36 | A cumulative reported claims triangle has, for accident year 2023, $\$700$ at 12 months… |
| `Concepts/Reserving Data Organization.md:78` | 39 | A personal auto insurer writes bodily injury liability, property damage liability, coll… |
| `Concepts/Residual Plot.md:47` | 38 | A linear regression of claim severity on vehicle value is fitted. The residuals plotted… |
| `Concepts/Residual Plot.md:74` | 32 | An accident year has a cumulative loss of 1,000 at age 12 and 1,250 at age 24, and the… |
| `Concepts/Residual Sum of Squares.md:45` | 31 | A least squares line fitted to the points $(1, 2)$, $(2, 3)$ and $(3, 5)$ has fitted va… |
| `Concepts/Residual Sum of Squares.md:75` | 26 | A split puts responses 5, 7 and 6 in one region and 15, 14 and 16 in the other. What is… |
| `Concepts/Residual.md:59` | 27 | A simple linear regression has $\hat\sigma = 0.6$. Observations A and B both have resid… |
| `Concepts/Residual.md:102` | 28 | A random-intercept model has $\sigma_b^2 = 40$ and independent conditional errors with… |
| `Concepts/Response Variable.md:33` | 32 | Which distribution and link should model each of these responses: the number of claims… |
| `Concepts/Response Variable.md:49` | 41 | A logistic model for whether a claim is referred for investigation has $\hat{\eta} = -1… |
| `Concepts/Restricted Maximum Likelihood.md:29` | 29 | A sample of three independent observations, $2$, $4$ and $9$, has only an unknown mean… |
| `Concepts/Restricted Maximum Likelihood.md:40` | 28 | An actuary tests whether a random slope by accident year is needed, and whether a regio… |
| `Concepts/Retrospective Rating.md:34` | 37 | A workers compensation policy has a standard premium of $\$500{,}000$, a basic premium… |
| `Concepts/Retrospective Rating.md:43` | 28 | On the same plan, what is the retrospective premium at limited losses of $\$100{,}000$… |
| `Concepts/Risk Experience.md:29` | 29 | A risk has 5 exposure years with an observed frequency of $0.30$, and the class mean is… |
| `Concepts/Risk Experience.md:40` | 30 | A risk's policy year is valued 18 months after inception at $\$120{,}000$ of reported l… |
| `Concepts/Risk Experience.md:63` | 43 | Last year, a portfolio of $1{,}000$ policies had $700$ with no claims, $220$ with one,… |
| `Concepts/Roll Forward Analysis.md:45` | 34 | At the last analysis, accident year 2022's ultimate claims were selected at $\$8{,}000{… |
| `Concepts/Roll Forward Analysis.md:54` | 27 | In four successive years, development on prior accident years was $\$900$K, $\$1{,}300$… |
| `Concepts/Salvage and Subrogation.md:33` | 37 | An accident year has gross reported claims of $\$1{,}000{,}000$ with a gross CDF of $1.… |
| `Concepts/Sample Mean.md:61` | 29 | A random sample of 100 claims is drawn from a distribution with mean 5,000 and standard… |
| `Concepts/Sample Mean.md:66` | 28 | Claim sizes have standard deviation 1,500. What is the smallest number of claims for wh… |
| `Concepts/Sample Variance.md:55` | 29 | A random sample of 10 observations is drawn from a normal distribution with variance 50… |
| `Concepts/Sampling Distribution.md:36` | 29 | A random sample of 9 claim amounts from a normal distribution has $\bar{x} = 1{,}080$ a… |
| `Concepts/Sampling Distribution.md:45` | 29 | Claims have mean 2,000 and standard deviation 400. For a random sample of 64 claims, wh… |
| `Concepts/Scatter Plot.md:41` | 35 | A scatter plot of pure premium against driver age is high for young drivers, lowest aro… |
| `Concepts/Scatter Plot.md:46` | 28 | Claim severity plotted against insured value forms a wedge, narrow at small insured val… |
| `Concepts/Scatter Plot.md:55` | 28 | Four points show no trend, and a fifth point lies far to the right and high. The correl… |
| `Concepts/Schedule Rating.md:26` | 45 | A commercial general liability risk has a manual premium of $\$20{,}000$ and an experie… |
| `Concepts/Schedule Rating.md:37` | 33 | Two experience-rated risks each have a full-time safety manager. Risk A hired one last… |
| `Concepts/Schedule Rating.md:52` | 30 | An insurer files an 8% manual rate increase. Over the same period, the average schedule… |
| `Concepts/Scree Plot.md:39` | 27 | Three standardized variables are analysed, and the third is an exact linear combination… |
| `Concepts/Scree Plot.md:48` | 27 | Four standardized variables are analysed. Three are highly correlated with each other,… |
| `Concepts/Seasonality.md:42` | 35 | Quarterly claim counts exceed the yearly average in Q1 by 180 when the average is 900,… |
| `Concepts/Seasonality.md:51` | 29 | A monthly regression has a linear trend and an indicator for each month, with $\hat{x}_… |
| `Concepts/Set Function.md:41` | 36 | An agent has 100 clients. 35 have only an auto policy, 20 have only a homeowners policy… |
| `Concepts/Set Theory.md:47` | 32 | A policyholder has probability 0.80 of no auto claim this year, 0.90 of no home claim a… |
| `Concepts/Set Theory.md:63` | 35 | Every policyholder is classified as exactly one of low, medium or high risk. 50% are lo… |
| `Concepts/Settlement Rate.md:32` | 28 | The disposal rates at $24$ months were $45\%$, $47\%$, $52\%$, $58\%$ and $63\%$ for ac… |
| `Concepts/Settlement Rate.md:48` | 36 | An accident year with $1{,}000$ ultimate claims had $520$ closed claims and $\$4{,}000{… |
| `Concepts/Severity Analysis.md:66` | 42 | Average case outstanding per open claim is 9,000, 14,500 and 21,000 at 12, 24 and 36 mo… |
| `Concepts/Severity Distribution.md:67` | 31 | Four losses are reported under a deductible of 1,000, with ground-up sizes 1,500, 2,500… |
| `Concepts/Severity Distribution.md:86` | 46 | For a class of property risks, the loss as a fraction of MPL has survival function $S(x… |
| `Concepts/Severity.md:34` | 33 | In the accident year above, the severity development factor from 24 months to ultimate… |
| `Concepts/Short Tail Insurance.md:26` | 34 | A hail storm on $3/5/2024$ damages an insured car, and in the same year a worker is exp… |
| `Concepts/Smoothing Spline.md:26` | 28 | A smoothing spline is fitted to 40 observations with distinct values of $x$. What is th… |
| `Concepts/Smoothing Spline.md:56` | 31 | A smoothing spline of claim frequency on vehicle age, fitted at $\lambda = 1$, gives th… |
| `Concepts/Stakeholder Reporting.md:41` | 27 | $\$5{,}000{,}000$ of adverse development has emerged on accident years 2021–2023, drive… |
| `Concepts/Standard Deviation.md:50` | 27 | A claim has standard deviation 190. Every claim rises 10% with inflation, and then a ha… |
| `Concepts/Standard Deviation.md:63` | 26 | Each of 400 independent policies has annual claims with mean 250 and standard deviation… |
| `Concepts/Stationary Distribution.md:35` | 51 | Each year a policyholder is claim-free (state 0) or has a claim (state 1). A claim-free… |
| `Concepts/Stationary Distribution.md:74` | 64 | A chain has states 0, 1, 2 and 3. From state 0 it stays at 0 with probability $\frac12$… |
| `Concepts/Stationary Distribution.md:89` | 29 | Policyholders move each year among Low, Medium and High risk tiers, with expected annua… |
| `Concepts/Statistical Software.md:38` | 32 | In R, `glm(claims ~ territory * age + offset(log(exposure)), family = poisson)` is fitt… |
| `Concepts/Statistical Software.md:55` | 44 | A Poisson GLM with a log link and an exposure offset is fitted in R with territory as i… |
| `Concepts/Statistics.md:31` | 26 | A random sample $X_1, \ldots, X_n$ is drawn from a normal distribution with unknown mea… |
| `Concepts/Step Function.md:38` | 35 | Claim frequency is fitted as a step function of driver age with cutpoints 25, 40 and 65… |
| `Concepts/Step Function.md:56` | 36 | Nine claim severities, in thousands, are fitted with a step function of building age $x… |
| `Concepts/Stochastic Processes.md:31` | 52 | Claims are reported as a Poisson process at a rate of 4 per month, and $N(t)$ is the nu… |
| `Concepts/Stochastic Processes.md:47` | 48 | Each year an insured is in class 1 (standard) or class 2 (preferred). The class follows… |
| `Concepts/Stochastic Processes.md:57` | 53 | Each year a driver has a claim or no claim. The probability of a claim is 0.1 if neithe… |
| `Concepts/Student's t-Distribution.md:52` | 43 | Last year's mean claim severity was 1,000. A random sample of 16 claims this year has $… |
| `Concepts/Student's t-Distribution.md:68` | 46 | Six claims are each estimated by two adjusters. The differences, adjuster A less adjust… |
| `Concepts/Student's t-Distribution.md:86` | 33 | A simple linear regression fitted to 20 territories gives $\hat{\beta}_1 = 0.42$ with s… |
| `Concepts/Sufficiency.md:40` | 30 | Five policies have claim counts 3, 1, 0, 2 and 4, Poisson with mean $\lambda$. What is… |
| `Concepts/Summary Statistics.md:46` | 39 | Pleasure use has 6,000 exposures, 300 claims and losses of 1,500,000; commute 3,000, 19… |
| `Concepts/Summary Statistics.md:65` | 41 | Two mixed models of 500 policy-years with identical fixed effects are fitted by REML: a… |
| `Concepts/Supervised Learning.md:34` | 35 | Which of these are supervised learning: predicting each policy's claim count next year… |
| `Concepts/Survival Model.md:31` | 32 | A lifetime has survival function $S(x) = 1 - x/100$ for $0 \le x \le 100$. What is the… |
| `Concepts/Survival Model.md:53` | 34 | A lifetime has survival function $S(x) = 1 - x/100$ for $0 \le x \le 100$. For a life a… |
| `Concepts/System Reliability.md:53` | 30 | Components 1 and 2 are in parallel, and that block is in series with component 3. Each… |
| `Concepts/System Reliability.md:65` | 33 | A claims platform runs on three servers and stays up while at least two of them are run… |
| `Concepts/Tail Factor.md:25` | 34 | The oldest accident year has $\$2{,}000{,}000$ of reported claims at 120 months, the la… |
| `Concepts/Tail Factor.md:42` | 36 | The excesses over 1.000 of the last four age-to-age factors of a workers compensation t… |
| `Concepts/Tail Factor.md:47` | 35 | A paid triangle runs to 108 months. At that age the reported claims of the oldest accid… |
| `Concepts/Tail Weight.md:28` | 35 | Losses are either exponential with mean 1,000 or Pareto with $\alpha = 3$ and $\theta =… |
| `Concepts/Territory Ratemaking.md:45` | 31 | Five adjacent coastal postal codes have indicated relativities of 1.42 on 2,400 exposur… |
| `Concepts/Test Error.md:29` | 46 | Two severity models are compared by 5-fold cross-validation. Model A has training MSE 3… |
| `Concepts/Test Error.md:43` | 26 | A classifier predicts fraud for 200 test claims. It labels 12 legitimate claims as frau… |
| `Concepts/The Law of Total Probability.md:32` | 32 | A portfolio is 30% young drivers, 50% middle-aged and 20% senior. Their claim probabili… |
| `Concepts/The Law of Total Probability.md:49` | 27 | Two independent claim counts $X$ and $Y$ are each 0, 1 or 2 with probabilities 0.5, 0.3… |
| `Concepts/The Law of Total Probability.md:57` | 28 | Given its risk parameter $\Lambda = \lambda$, a policy has no claims in a year with pro… |
| `Concepts/The Law of Total Probability.md:75` | 39 | 25% of drivers are risky and claim in a year with probability 0.4. The rest claim with… |
| `Concepts/Time-Reversible Markov Chain.md:53` | 56 | A bonus-malus system has levels 1 (best) to 4 (worst), with premiums 100, 120, 150 and… |
| `Concepts/Tort Litigation.md:45` | 30 | A plaintiff earning $\$70{,}000$ a year is permanently unable to work after a collision… |
| `Concepts/Tort Reform.md:26` | 45 | A reform effective January 1, 2022 cuts the cost of claims occurring after it by 25%. T… |
| `Concepts/Tort Reform.md:36` | 40 | A tort reform takes effect during accident year 2006, and accident year 2007's reported… |
| `Concepts/Transformations of Random Variables.md:56` | 40 | Claim costs $X$ have mean 1,000 and standard deviation 400. Next year costs rise by 5%,… |
| `Concepts/Transition Probability Matrix.md:33` | 47 | Each year a policyholder is claim-free (state 0) or has a claim (state 1). A claim-free… |
| `Concepts/Transition Probability Matrix.md:48` | 26 | Policyholders move each year among Low, Medium and High risk tiers. This year 50% are L… |
| `Concepts/Transition Probability Matrix.md:80` | 29 | A policyholder in the risk tiers above is Low this year. What is the probability that t… |
| `Concepts/Transition Probability Matrix.md:91` | 38 | A team wins its next game with probability 0.5 after a loss, 0.6 after one win, and 0.7… |
| `Concepts/Transition Probability Matrix.md:112` | 32 | A three-state Markov chain has limiting probabilities that are all equal. Row 2 of its… |
| `Concepts/Tree Ensemble.md:28` | 29 | An actuary's single severity tree changes shape every time it is refit on new data. Whi… |
| `Concepts/Tree Pruning.md:35` | 26 | A tree with 10 terminal nodes has RSS 50. Pruning it to 4 terminal nodes raises the RSS… |
| `Concepts/Tree Pruning.md:46` | 26 | Ten-fold cross-validation gives estimated test MSEs of $48$, $41$, $39$ and $44$ for su… |
| `Concepts/Truncation.md:27` | 32 | Losses are exponential with mean $\theta$, and only losses above a deductible of 1 are… |
| `Concepts/Truncation.md:38` | 40 | Losses are exponential, and a policy has an ordinary deductible of 500. Losses below th… |
| `Concepts/Tweedie Distribution.md:54` | 39 | A policy's claims follow a Poisson distribution with mean $0.1$, and each claim amount… |
| `Concepts/Tweedie Distribution.md:68` | 37 | A Tweedie regression with a log link for pure premium has $\hat\beta_0 = 5.30$ and a co… |
| `Concepts/Type I Error.md:28` | 28 | A single claim $X$ is exponential with mean $\theta$. A test of $H_0: \theta = 100$ aga… |
| `Concepts/Type I Error.md:40` | 26 | A single claim $X$ is exponential with mean $\theta$. A test of $H_0: \theta \le 100$ a… |
| `Concepts/Type I Error.md:54` | 34 | Claim sizes are exponential with mean $\theta$. A test of $H_0: \theta = 1{,}000$ again… |
| `Concepts/Type II Error.md:27` | 28 | A single claim $X$ is exponential with mean $\theta$. A test of $H_0: \theta = 100$ aga… |
| `Concepts/Type II Error.md:41` | 32 | A test of $H_0: \mu = 100$ against $H_1: \mu = 110$ uses a normal sample of 25 with $\s… |
| `Concepts/Type II Error.md:51` | 30 | In the test of $H_0: \mu = 100$ against $H_1: \mu = 110$ with $n = 25$ and $\sigma = 20… |
| `Concepts/Types of Insurance.md:24` | 26 | Personal auto comprehensive is written on an occurrence basis, and its claims are many,… |
| `Concepts/Types of Insurance.md:34` | 47 | Two lines each have $\$1{,}000{,}000$ of reported claims at 24 months. Automobile physi… |
| `Concepts/Ultimate Loss.md:35` | 35 | AY 2024 at 12 months has paid claims of $\$300{,}000$ and reported claims of $\$500{,}0… |
| `Concepts/Ultimate Loss.md:53` | 32 | At the last year-end AY 2023's selected ultimate was $\$2{,}798$ thousand, with $\$2{,}… |
| `Concepts/Unallocated Loss Adjustment Expenses ULAE.md:29` | 38 | An insurer selects a ULAE ratio of $0.045$. Its case outstanding is $\$603$ million and… |
| `Concepts/Underwriting Changes.md:29` | 30 | An insurer stops writing contractors with more than three prior losses, and high-hazard… |
| `Concepts/Underwriting Changes.md:34` | 39 | Claim frequency was $0.050$ per exposure in $2020$, $2021$ and $2022$, and $0.045$ in $… |
| `Concepts/Underwriting Year.md:24` | 26 | A reinsurance contract incepting $1/1/2024$ covers losses occurring under the cedant's… |
| `Concepts/Underwriting Year.md:37` | 30 | A cedant writes a policy on $7/1/2024$ subject to a treaty effective $1/1/2024$. A clai… |
| `Concepts/Unearned Premium.md:43` | 29 | An insurer writes annual policies evenly through each year: $\$24{,}000{,}000$ in 2023… |
| `Concepts/Unearned Premium.md:74` | 32 | A homeowners book has $\$10{,}000{,}000$ of unearned premium and no installments due. F… |
| `Concepts/Uniform Continuous Distribution.md:73` | 27 | Two claims settle at independent times, each uniform on $(0, 1)$ years. What is the pro… |
| `Concepts/Univariate Plot.md:31` | 27 | A data set has claim count per policy (an integer, mostly zero), claim severity (positi… |
| `Concepts/Univariate Plot.md:40` | 37 | A bar chart of exposure by territory shows that territory 12 has 40 car-years, against… |
| `Concepts/Unsupervised Learning.md:26` | 31 | PCA on 12 telematics variables gives a first component with large positive loadings on… |
| `Concepts/Variable Expenses.md:42` | 30 | With $V = 20\%$, a projected pure premium of $\$300$, fixed expenses of $\$40$ per expo… |
| `Concepts/Variable Expenses.md:54` | 54 | An insurer writes through agents at $17\%$ commission, with premium taxes of $2.5\%$, o… |
| `Concepts/Variable Importance.md:43` | 27 | Shuffling territory in the out-of-bag data raises a forest's out-of-bag MSE from $40$ t… |
| `Concepts/Variance Components.md:32` | 36 | A random intercept model of claim severity by adjuster reports an adjuster variance of… |
| `Concepts/Variance Function.md:29` | 29 | A gamma severity GLM has $\phi = 0.5$. A claim with $\hat{\mu} = 5{,}000$ and claim cou… |
| `Concepts/Variance Function.md:52` | 36 | A gamma severity GLM has $\phi = 0.5$. Claim 1 has $\hat{\mu} = 5{,}000$ and settles fo… |
| `Concepts/Variance Function.md:84` | 36 | A random intercept model of loss ratios is fitted by REML with one residual variance, $… |
| `Concepts/Variance for Conditional and Marginal Distributions.md:73` | 45 | 70% of policies are Type A and 30% are Type B. A policy's number of claims is Poisson w… |
| `Concepts/Variance for Conditional and Marginal Distributions.md:89` | 34 | The number of claims is Poisson with mean 3. Claim sizes are exponential with mean 100,… |
| `Concepts/Variance.md:110` | 41 | Half of a portfolio's policies are low risk, with claims of mean 100 and variance 2,500… |
| `Concepts/Venn Diagram.md:43` | 30 | An insurer has 100 policyholders. 70 have an auto policy, 40 have a homeowners policy a… |
| `Concepts/Venn Diagram.md:66` | 36 | An insurer has 100 policyholders. 70 have an auto policy, 40 have a homeowners policy a… |
| `Concepts/Venn Diagram.md:86` | 43 | In a group of 120 people, 50 read paper $X$, 45 read $Y$ and 40 read $Z$. 20 read only… |
| `Concepts/Weibull Distribution.md:80` | 27 | A series system has 4 independent components, each with a Weibull lifetime with $\theta… |
| `Concepts/Whole Life Insurance.md:74` | 26 | The Illustrative Life Table at $i = 0.06$ gives $A_{40} = 0.16132$ and $\ddot{a}_{40} =… |
| `Concepts/Whole Life Insurance.md:86` | 27 | For the life table in the first example at $i = 0.05$, what is the variance of the pres… |
| `Concepts/Whole Life Insurance.md:98` | 26 | A life has a constant force of mortality $\mu = 0.02$, and the force of interest is $\d… |
| `Concepts/Written Premium.md:42` | 35 | An annual policy is written on 7/1/2011 for $\$400$ and cancelled on 3/31/2012, after 7… |
| `Concepts/p-Value.md:27` | 26 | A $z$ test of $H_0: \mu = 5{,}000$ against $H_1: \mu > 5{,}000$ gives $z = 2.50$. What… |
