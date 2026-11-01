# Answerability: Exam FAM (SOA)

Run `answerability-20261031-fam` · 269 questions checked of 274 attempted · cost $23.53

Each question's official solution was broken into the knowledge it uses (by a model that saw no study page), and each item was looked for on the pages the vault gives for the question. An item counts as taught only if a quote of the teaching passage is really on the page; the check is done in code. *Answerable* is necessary, not sufficient: a page can hold the formula and still not teach it well.

| Verdict | Questions | Share |
|---|---|---|
| **Answerable** — everything taught on a tagged page, one link away, on the exam's syllabus or on a prerequisite exam's page | 170 | 63% |
| **Untagged** — everything is in the vault, but some of it on a page neither tagged nor linked | 38 | 14% |
| **Gap** — something the solution uses is taught on no page | 56 | 21% |
| Error — the check itself failed (re-run to retry) | 5 | |
| No requirements listed | 5 | |

Requirements: 1183 — tagged 861 (73%), linked 145 (12%), syllabus 49 (4%), prerequisite 0 (0%), elsewhere 55 (5%), missing 73 (6%)

## By sitting

A paper whose gaps far outrun the rest may test a reading the syllabus has since dropped.

| Sitting | Questions | Answerable | Untagged | Gap |
|---|---|---|---|---|
| Undated (samples and the vault's own) | 274 | 170 | 38 | 56 (20%) |

## Gaps, by the page that should teach them

Ranked by how many questions each page's gaps cost. The page is the one named for the item's concept; "no page" means the vault has no page by that name.

### `Concepts/Policy Value.md` — 6 question(s)

- `faml-7-06` (definition): Expense policy value at time t is the expected present value of future expenses minus the expected present value of future expense premiums (the portion of the gross premium that funds expenses).
- `faml-7-06` (formula): Gross premium policy value equals net premium policy value plus expense policy value, so the expense policy value is the gross premium policy value (gross premium, original assumptions) minus the net premium policy value.
- `faml-7-06` (fact): Expenses that are level in every policy year produce no expense policy value because the level expense premium equals the actual expense; only the extra first-year expenses create a (negative) expense policy value after issue.
- `faml-7-10` (definition): The expense policy value is the actuarial present value of future expenses minus the actuarial present value of future expense premiums, where the expense premium is the portion of the gross premium that covers expenses (gross premium minus net premium).
- `faml-7-10` (fact): The gross premium policy value equals the net premium policy value plus the expense policy value, and the expense premium equals the gross premium minus the net premium.
- `faml-7-10` (procedure): At duration t, the prospective expense policy value is (renewal expense per year minus the expense premium) times ä_{x+t}, using only renewal-year expenses because first-year expenses are already incurred.
- `faml-7-27` (definition): The expense policy value is the expected present value of future expenses minus the expected present value of future expense premiums (the portion of the gross premium net of the benefit premium that funds expenses).
- `faml-7-27` (fact): The gross premium policy value equals the net (benefit) policy value plus the expense policy value, so the expense premium is the gross premium minus the benefit premium.
- `faml-7-29` (fact): The gross premium policy value equals the net premium policy value plus an expense policy value, where the expense reserve is the EPV of future expenses minus the EPV of future expense-loading premiums (level expense premium = excess first-year expense / ä_x).
- `faml-7-31` (definition): The expense policy value at time t is the actuarial present value of future expenses minus the actuarial present value of future expense loadings (the expense portion of the gross premium).
- `faml-7-31` (procedure): At the end of year n-1 of an n-year contract, only the final year's expenses (percent of premium times G plus per-policy amount, paid at start of that year) remain, and the expense loading P^e is paid once, so the expense policy value is that expense minus P^e.
- `faml-7-36` (procedure): To find the effect of a changed assumption on a policy value, write the recursion under both assumptions and subtract them, so that terms unaffected by the change (premium and expenses) cancel and the change in policy value is found from the differences in q, p and the unchanged next-year policy va…

### `Concepts/Annuity Due.md` — 3 question(s)

- `faml-5-06` (formula): The variance of the present value of a whole life annuity-due equals (²A_x − (A_x)²)/d², where ²A_x is the second moment of the whole life insurance present value.
- `faml-5-08` (procedure): To find the probability that the total undiscounted payments of a life annuity-due exceed a given amount, determine the smallest number of payments k that exceeds it, then compute the probability the annuitant survives to the date of the k-th payment (age x+k−1 for an annuity-due).
- `faml-6-08` (procedure): A payment stream that is level over different durations (e.g., amounts changing at certain years) is decomposed into a sum of level temporary annuity-dues, each with an amount equal to the incremental change, and its EPV is the sum of the amount times ä_{x:n} for each piece.

### `Concepts/Term Life Insurance.md` — 3 question(s)

- `faml-6-01` (formula): For a return-of-premiums death benefit without interest, the benefit in year k is the face amount plus the cumulative premiums paid (k times P), so its present value is the face amount times the term insurance APV plus P times the increasing term insurance APV (IA)^1.
- `faml-6-02` (fact): A death benefit that returns all gross premiums paid without interest equals a benefit of G times the number of years elapsed (k+1 in year of death), so its actuarial present value is G times the increasing term insurance (IA)^1.
- `faml-6-51` (formula): The increasing n-year term insurance can be expressed as (IA)^1_{x:n\|} = (n+1)·A^1_{x:n\|} − Σ_{k=1}^{n} A^1_{x:k\|}.

### **no page for Expense Premium** — 2 question(s)

- `faml-7-06` (formula): The expense premium is the level premium (per year, payable at the beginning of each year) whose actuarial present value equals the actuarial present value of all expenses at issue: PV of expenses / ä_x.
- `faml-7-10` (formula): The level expense premium equals the present value of expenses (first-year commission and administrative expenses plus renewal expenses times the annuity-due factor) divided by the life annuity-due factor at issue.

### **no page for Out-of-Pocket Maximum** — 2 question(s)

- `fams-033` (procedure): When a benefit change is triggered by the insured's cumulative out-of-pocket amount reaching a cap, convert that cap into the corresponding ground-up loss level by adding up the insured's share in each earlier band (deductible, coinsurance share of the band, full cost portion) and solving for the l…
- `fams-060` (procedure): When a policyholder's out-of-pocket maximum-like threshold is defined by cumulative policyholder payments, find the loss level at which cumulative policyholder payments across the deductible, coinsured layer, and 100%-paid layer reach the stated amount, which gives the breakpoint where the next coi…

### **no page for (a, b, 0) Class of Distributions** — 1 question(s)

- `fams-043` (fact): If a Poisson (or geometric-type) recursion forces a = b = 0 with p_0 < 1, all later probabilities are zero and the probabilities fail to sum to 1, so that distribution is not valid.

### **no page for Annuity-Due Payable m-thly** — 1 question(s)

- `faml-6-49` (formula): Under UDD, the m-thly temporary annuity-due is approximated by ä^(m)_{x:n} = α(m) ä_{x:n} − β(m)(1 − nE_x), where α(m) and β(m) are the standard UDD annuity factors.
- `faml-6-49` (fact): Premiums payable m-thly for a maximum of n years are valued with a temporary m-thly annuity-due, and the annual premium equals the annual payment rate; each monthly premium is the annual amount divided by 12.

### **no page for Burr Distribution** — 1 question(s)

- `fams-058` (formula): The k-th raw moment of a Burr distribution with parameters α, θ, γ is E[X^k] = θ^k Γ(1+k/γ) Γ(α−k/γ) / Γ(α), valid for −γ < k < αγ (from the exam table).

### **no page for Constant Force of Mortality** — 1 question(s)

- `faml-5-04` (formula): Under a constant force of mortality mu, the complete expectation of life is 1/mu.

### **no page for Curtate Expectation of Life** — 1 question(s)

- `faml-3-13` (formula): The curtate expectation satisfies the recursion e_x = p_x (1 + e_{x+1}).

### **no page for Expected Survivors in a Population** — 1 question(s)

- `faml-2-08` (procedure): The expected number of survivors from a group at time t equals the initial number times the t-year survival probability; the expected population composition at a later time is the ratio of these expected survivor counts by subgroup.

### **no page for Expenses in Gross Premium Valuation** — 1 question(s)

- `faml-6-37` (fact): An expense paid at the end of the year of death (as well as at the end of each year survived) has APV e times A_x for the death-year payment, so total expenses payable through year of death are e*(a_x + A_x).

### **no page for Fundamental Theorem of Calculus** — 1 question(s)

- `faml-5-03` (fact): By the Fundamental Theorem of Calculus, the derivative with respect to the upper limit t of an integral from 0 to t of a function equals the integrand evaluated at t (e.g., t · {}_t p_x · v^t).

### **no page for Gross Premium Expenses and Commissions** — 1 question(s)

- `faml-6-13` (procedure): Commissions that are a higher percentage of the first-year premium and a lower percentage of renewal premiums are modeled as a renewal percentage of every premium (an annuity-due) plus an extra (first-year minus renewal) percentage of one premium at time 0.

### **no page for Increasing Term Insurance** — 1 question(s)

- `faml-6-46` (formula): The APV of a benefit equal to the return (without interest) of premiums paid, payable at the end of the year of death during an n-year period, with annual premium P, is P times the increasing term insurance (IA)^1_{x:n}.

### **no page for Life Annuities Payable m-thly** — 1 question(s)

- `faml-6-04` (formula): The expected present value of a whole life annuity-due payable m times per year (of 1 per year) is ä^(m)_x = (1 − A^(m)_x) / d^(m), where d^(m) is the nominal discount rate convertible m-thly.
- `faml-6-04` (formula): The variance of the present value of a whole life annuity-due payable m times per year (of 1 per year) is Var = (²A^(m)_x − (A^(m)_x)²) / (d^(m))², since the annuity PV is (1 − Z)/d^(m) with Z the PV of the corresponding insurance.

### **no page for M-thly Annuities under UDD** — 1 question(s)

- `faml-6-22` (formula): Under UDD, the m-thly temporary annuity-due is approximated by ä^(m)_{x:n} = α(m)·ä_{x:n} − β(m)·(1 − nE_x), where α(m) and β(m) are the UDD annuity factors.

### **no page for Net Amount at Risk** — 1 question(s)

- `faml-7-26` (fact): When the death benefit equals a fixed amount plus the end-of-year policy value, the net amount at risk is just the fixed amount, so the policy value term cancels out of the recursion: (kV + P)(1+i) = (fixed amount)·q + (k+1)V.

### **no page for Percentiles of Present Value of Insurance Benefits** — 1 question(s)

- `faml-4-05` (fact): For a term insurance with level benefit payable at death and positive force of interest, the present value of benefits decreases with time of death, so earlier deaths within the term produce larger present values and a high percentile of PV corresponds to a low percentile of the time of death.
- `faml-4-05` (procedure): To find the p-th percentile of the PV of a term insurance benefit, find the time of death t at which the cumulative probability of death equals 1-p (i.e. l_{x+t} = p·l_x), provided that time lies within the term, and evaluate the PV at that time.

### **no page for Premium Principles** — 1 question(s)

- `fams-050` (definition): A premium equal to (1+loading) times expected claims is the expected claims plus a proportional (relative security) loading.

### **no page for Present Value and Discounting** — 1 question(s)

- `faml-7-30` (fact): At an interest rate of 0%, there is no discounting, so the present value of a whole life death benefit equals the full benefit amount with certainty (A_x = 1).

### **no page for Return of Premium Benefit** — 1 question(s)

- `faml-6-07` (fact): A death benefit equal to the premiums accumulated with interest at the valuation rate, paid at the end of the year of death, has present value equal to the annuity-due of premiums over the years paid, π·a¨_{K+1\|}, since discounting the accumulated value π·s¨_{K+1\|} by v^{K+1} gives π·a¨_{K+1\|}.

### **no page for Select and Ultimate Mortality Tables** — 1 question(s)

- `faml-3-16` (procedure): To build a select life table from select and ultimate q values, start with an arbitrary radix l_{[x]} at the selected age and recursively compute l_{[x]+k+1} = l_{[x]+k}(1 - q_{[x]+k}), continuing into the ultimate part using the ultimate rates q_{x+k} and the equivalence l_{[x]+k} = l_{x+k} once p…
- `faml-3-16` (fact): Survivor counts at fractional ages within the select period are interpolated between the adjacent select survivor values l_{[x]+k} and l_{[x]+k+1}, and past the select period between l_{x+k} and l_{x+k+1}, so a fractional age crossing from select to ultimate part uses the corresponding integer-age …

### **no page for Survival Function** — 1 question(s)

- `fams-052` (formula): The density is the negative derivative of the survival function: f(x) = -S'(x).

### **no page for Survival Probability** — 1 question(s)

- `faml-2-02` (formula): The multi-year survival probability is the product of the successive one-year survival probabilities: 2p_x = p_x * p_{x+1}, where p = 1 - q. — *the locator quoted text that isn't on the page:* “${k+1}p_x^{00} = {}_kp_x^{00}\,\left(1 - i_{x+k} - q_{x+k}\right)$”

### **no page for Temporary Complete Expectation of Life** — 1 question(s)

- `faml-2-05` (formula): The complete expectation of life equals the temporary expectation plus the survival probability to the end of the term times the complete expectation at that later age: e_x = e_{x:n\|} + {}_n p_x · e_{x+n}.

### **no page for Temporary Life Annuity** — 1 question(s)

- `faml-6-36` (formula): For a constant force of mortality mu and force of interest delta, the n-year temporary continuous life annuity of 1 per year has EPV abar_{x:n} = (1 - e^{-n(mu+delta)})/(mu+delta).

### **no page for Uniform Distribution of Deaths** — 1 question(s)

- `faml-6-15` (formula): Under UDD, the m-thly annuity-due is ä_x^(m) = α(m)·ä_x − β(m), where α(m) = i·d/(i^(m)·d^(m)) and β(m) = (i − i^(m))/(i^(m)·d^(m)).

### **no page for Uniform Distribution of Deaths (UDD)** — 1 question(s)

- `faml-3-11` (fact): Under a uniform distribution of deaths (UDD) over an interval of length n, the probability of death within the first s years of the interval is s/n times the probability of death over the whole interval (s q_x = (s/n) n q_x for 0 ≤ s ≤ n).

### **no page for Uniform Distribution of Deaths (UDD) Assumption** — 1 question(s)

- `faml-6-32` (formula): Under UDD, the m-thly annuity-due is approximated by ä^(m)_x ≈ α(m)·ä_x − β(m), where α(m) = i·d / (i^(m)·d^(m)) and β(m) = (i − i^(m)) / (i^(m)·d^(m)).

### **no page for m-thly Annuities (UDD)** — 1 question(s)

- `faml-7-09` (formula): Under UDD, the m-thly temporary annuity-due is approximated by ä^(m)_{x:n} = α(m) ä_{x:n} − β(m)(1 − nE_x).

### **no page for placeholder** — 1 question(s)

- `faml-6-29` (fact): placeholder

### `Concepts/Aggregate Loss Model.md` — 1 question(s)

- `fams-020` (fact): With a fixed claim amount, aggregate loss S takes values equal to the claim count times the amount, so the distribution of S is the claim count distribution scaled by the amount.

### `Concepts/Deductible.md` — 1 question(s)

- `fams-064` (formula): The percentage reduction in loss cost from moving from deductible d1 to a higher deductible d2 is (payments at d1 - payments at d2) / payments at d1.

### `Concepts/Deferred Annuity.md` — 1 question(s)

- `faml-7-39` (fact): When no death benefit is payable during the deferral period of a deferred annuity, the death benefit term in the policy value recursion is zero, so only survivors carry a future policy value.

### `Concepts/Equation of Value.md` — 1 question(s)

- `faml-6-07` (procedure): Equation of value at time n: if premium accumulations at the valuation interest rate fund the return-of-premium death benefits, then the premiums of survivors accumulated to the end of the term must fund the endowment benefit, so π·s¨_{n\|} = endowment amount.

### `Concepts/Equivalence Principle.md` — 1 question(s)

- `faml-6-32` (definition): The EPV of premiums for a level premium payable m times per year is the annual premium amount (m times the per-payment premium) times ä^(m)_x.

### `Concepts/Force of Interest.md` — 1 question(s)

- `faml-4-15` (fact): With a constant force of mortality μ, the survival probability is t_p_x = e^{-μt}, and the discount factor is v^t = e^{-δt}.

### `Concepts/Future Lifetime Random Variable.md` — 1 question(s)

- `faml-4-18` (fact): If a random variable Y is a decreasing function of T, the p-th percentile of Y equals the function evaluated at the (1−p)-th percentile of T, so the 90th percentile of Y corresponds to the 10th percentile of T.

### `Concepts/Future Loss Random Variable.md` — 1 question(s)

- `faml-6-45` (fact): When the loss L is a monotone decreasing function of T, the p-th percentile of L equals L evaluated at the (1-p) quantile of T, i.e. at the t with Pr(T > t) = 1-p.

### `Concepts/Insurable Interest.md` — 1 question(s)

- `fam-an-003` (fact): A mere expectation of a future benefit (such as an expected inheritance) or an intention to buy property, with no ownership right or contract, is not an insurable interest.
- `fam-an-003` (fact): A buyer already bound by a contract of sale can have an insurable interest in property before the sale closes.

### `Concepts/Life Annuity.md` — 1 question(s)

- `faml-5-02` (formula): The n-year temporary life annuity-immediate relates to the annuity-due by a_{x:n} = a¨_{x:n} - 1 + nEx.

### `Concepts/Life Insurance.md` — 1 question(s)

- `faml-1-02` (fact): Life insurance products and their risk management have become more complex over recent decades because policyholders are more sophisticated, competition among insurers has increased, and computational power has grown.

### `Concepts/Life Table.md` — 1 question(s)

- `faml-3-18` (fact): The Standard Ultimate Life Table gives the one-year mortality rate q_x at each integer age (e.g., q_100), which must be read from the table to evaluate survival and mortality quantities.

### `Concepts/Limited Expected Value.md` — 1 question(s)

- `fams-014` (procedure): A bonus equal to a constant times the amount by which a random loss falls below a threshold is the payoff c·max(d − X, 0), which equals c·(d − min(X, d)); its expected value is c·(d − E[X ∧ d]).

### `Concepts/Limited Fluctuation Credibility.md` — 1 question(s)

- `fams-092` (procedure): The computed full credibility standard for the expected number of claims is rounded up to the next integer.

### `Concepts/Lognormal Distribution.md` — 1 question(s)

- `fams-104` (fact): For a lognormal stock price model with parameters mu and sigma per year, the log-return over t years has mean mu*t and variance sigma^2*t (parameters scale linearly in time for mean and variance).

### `Concepts/Maximum Likelihood Estimation.md` — 1 question(s)

- `fams-004` (procedure): When observations come from different groups whose distributions share a common parameter through scaling (e.g., mean a·θ), each observation uses its own group's density in the likelihood, and groups with no observations contribute no factor.

### `Concepts/Probability Density Function (PDF).md` — 1 question(s)

- `fams-017` (procedure): A piecewise linear density read from a graph is expressed as separate linear functions on each interval (slope and intercept from points on the graph), and integrals are computed piece by piece.

### `Concepts/Reinsurance.md` — 1 question(s)

- `fams-050` (procedure): A reinsurance layer with a fixed deductible applied to the insurer's payments (after the insurance deductible) is equivalent to a deductible on ground-up losses equal to the insurance deductible plus the reinsurance deductible.

### `Concepts/Whole Life Insurance.md` — 1 question(s)

- `faml-7-30` (fact): For a limited-pay whole life policy that has passed its premium-paying period, no future premiums remain, so the future loss equals the present value of the death benefit, i.e. benefit times the whole life insurance APV at the attained age.

## Tagging and linking gaps

The vault teaches what these questions need, but on a page the question isn't tagged with and its tagged pages don't link to. Adding the page to the question's `wiki_link` (or linking it from the tagged page) puts it in reach.

| Question | Pages that teach what it needs |
|---|---|
| `fam-an-001` | Option Trading Strategy |
| `faml-1-01` | Life Insurance Distribution |
| `faml-2-02` | Variance and Standard Deviation |
| `faml-3-01` | Mortality Table Construction |
| `faml-3-06` | Mortality Table Construction |
| `faml-3-07` | Mortality Table Construction |
| `faml-3-12` | Mortality Table Construction |
| `faml-3-13` | Mortality Table Construction |
| `faml-3-16` | Mortality Table Construction |
| `faml-4-02` | Nominal Interest Rate Convertible m-thly |
| `faml-5-10` | Types of Annuities |
| `faml-6-04` | Nominal Discount Rate |
| `faml-6-07` | Annuity Due |
| `faml-6-24` | Continuous Annuity |
| `faml-6-32` | Force of Interest |
| `faml-6-39` | In-Force |
| `faml-6-45` | Continuous Annuity |
| `faml-6-47` | Annuity Contract |
| `faml-6-50` | Cash Flow Statement |
| `faml-7-03` | Nominal Interest Rate Convertible m-thly |
| `faml-7-08` | Mortality Table Construction |
| `faml-7-09` | Payable m-thly |
| `faml-7-11` | Annuity Due |
| `faml-7-25` | Commissioners Reserve Valuation Method, Mortality Table Construction |
| `faml-7-32` | Continuous Annuity |
| `faml-7-34` | Conditional Probability |
| `faml-7-39` | Conditional Probability |
| `faml-7-41` | Annuity Due |
| `fams-008` | Exponential Distribution, Mixed Poisson Process |
| `fams-011` | Incomplete Data |
| `fams-012` | Negative Binomial Distribution, Pareto Distribution |
| `fams-015` | Compound Poisson Process |
| `fams-016` | Uniform Continuous Distribution |
| `fams-018` | Variance for Conditional and Marginal Distributions |
| `fams-021` | Uniform Discrete |
| `fams-034` | Linear Combinations of Random Variables, Uniform Continuous Distribution |
| `fams-035` | Poisson Distribution |
| `fams-042` | Poisson Distribution |
| `fams-047` | Mixture Distribution |
| `fams-048` | Policy Limit |
| `fams-051` | Poisson Distribution, Uniform Continuous Distribution |
| `fams-056` | Approximate Confidence Interval |
| `fams-063` | Cumulative Distribution Function (CDF) |
| `fams-091` | Discrete Random Variable |
| `fams-093` | Development Triangle |
| `fams-095` | Exponential Trend |
| `fams-096` | Loss Trend |
| `fams-104` | Equity-Linked Insurance, Guaranteed Minimum Maturity Benefit |

## Taught only in a collapsed section

The passage that teaches these items sits inside a folded callout (a worked example, a table behind a toggle). A reader who skims never opens it.

| Page | Questions | Items |
|---|---|---|
| Equivalence Principle | 20 | Expenses given as a percentage of gross premium (first-year vs. renewal rates) …; Annuity-due values such as ä_{x:n} and ä_x for a given age are obtained from th…; Expenses incurred at the start of each policy year are valued as the APV of ann… |
| Policy Value | 9 | The net level premium policy value for a fully discrete whole life insurance at…; Obtain actuarial values (such as A_{x:n}, nE_x, and ä_{x:n}) at the attained ag…; The expense policy value can be negative when the level expense premium exceeds… |
| Term Life Insurance | 9 | Values of q_x and A_x for a given age and interest rate are read from the Stand…; The Standard Ultimate Life Table at i = 5% provides tabulated values of l_x and…; Values of A_{x:n}, nE_x and a-double-dot_{x:n} for a given mortality table and … |
| Future Loss Random Variable | 4 | Pr(Z > c) is obtained by identifying which outcomes (times of death) give a pre…; To find Pr(Y > E[Y]) for an annuity PV random variable, which is increasing in …; Whole life insurance and whole life annuity-due values at a given age and inter… |
| Loss Trend | 4 | For one-year policies written uniformly, rates in effect for one year starting …; For accident-year data with uniformly written one-year policies, the average ac…; For one-year policies written uniformly over a one-year rate effective period, … |
| Modified Net Premium Policy Value | 4 | The reserve for an endowment insurance with unit benefit can be written as 1 - …; The policy value for a fully discrete whole life insurance just after the premi…; The net premium (benefit) policy value at time t for a fully discrete whole lif… |
| Loss Ratio Method | 3 | When experience periods are given weights for rate development, the indicated l…; Combine trended period loss costs into a single projection by taking a weighted…; The projected loss cost from multiple years of data is the weighted average of … |
| Thiele's Differential Equation | 3 | For an endowment insurance, the policy value just before maturity at the end of…; Premiums are paid only at the start of each premium period (semi-annual here), …; For an n-year endowment insurance, the policy value just before the maturity be… |
| Cape Cod Method | 2 | The total IBNR reserve is the sum of the BF reserves across all accident years.; The total loss reserve across accident years is the sum of the individual accid… |
| Endowment Insurance | 2 | Var(Z_endowment) = Var(Z_term) + Var(Z_pure endowment) + 2 Cov(Z_term, Z_pure e…; In the final year of an n-year endowment insurance, the payment at the end of t… |
| Frequency Distribution | 2 | For grouped count data, the sample mean is Σ k·n_k / n and the sample variance …; To find a and b of an (a,b,0) distribution from known probabilities, apply the … |
| Life Table | 2 | The deferred probability _{u\|t}q_{y} is the probability that a life aged y sur…; Survival and death probabilities over a sub-period are computed from a life tab… |
| Mortality | 2 | To model a modified (e.g., substandard) mortality for one year, multiply the st…; The probability of death in a year is q = 1 − p, where p is the one-year surviv… |
| Normal Approximation | 2 | Because survivors are whole persons, the required number of survivors is rounde…; Because the standard is a required number of claims, a non-integer computed val… |
| Parallelogram Method | 2 | Rate changes before the earliest period's coverage affect no earned premium in …; A rate change whose effect has not fully earned into the year (e.g., a change w… |
| Standard Actuarial Notation | 2 | For a life with select age [x], survival probabilities over multiple years are …; For a select life with a one-year select period, the temporary annuity-due sati… |
| Woolhouse's Formula | 2 | The annualized net premium for a fully discrete whole life insurance with m-thl…; Monthly premiums payable at the start of each month are valued as 12 times the … |
| Approximate Confidence Interval | 1 | Constant multiplicative factors in the likelihood (not depending on the paramet… |
| Chain Ladder Method | 1 | The total loss reserve is the sum of the accident-year reserves; an accident ye… |
| Convolution | 1 | For integer-valued aggregate losses S, E[(S - d)_+] = E[S] - d + sum_{s=0}^{d-1… |
| Deductible | 1 | When a deductible is imposed, the number of losses is taken as the original los… |
| Future Lifetime Random Variable | 1 | Survival probabilities are zero at and beyond the limiting age omega, so the cu… |
| Grouped Data | 1 | A likelihood of the form p^a (1−p)^b is maximized at p = a/(a+b), the binomial-… |
| Hazard Rate | 1 | The force of mortality can be obtained from the survival function as the negati… |
| In-Force | 1 | The average premium per policy in force is the total premium received (sum of e… |
| Insurable Interest | 1 | The insurable interest requirement exists to prevent wagering: a policy on a st… |
| Life Annuity | 1 | Annuity-due and survival values for a given attained age and mortality basis (e… |
| Life Insurance | 1 | The APV of a death benefit of size B is B times the APV per unit benefit. |
| Long-Term Insurance Coverage | 1 | Mortality probabilities (q values) do not depend on the interest rate, so an un… |
| Loss Elimination Ratio | 1 | The percentage increase in a quantity from Year 1 to Year 2 is computed as (val… |
| Payable m-thly | 1 | Premiums of P payable monthly (per 1/12 of annual rate each payment) have annua… |
| Reserve | 1 | For a limited-pay policy with n premium payments, at the end of year k the insu… |
| Risk-Neutral Valuation | 1 | Stock prices at each node of a recombining binomial tree are S0 * u^k * d^(n-k)… |
| Stop-Loss Reinsurance | 1 | To find the probability that aggregate loss equals a small value, enumerate the… |
| Types of Annuities | 1 | For an annuity-due with level payments, the undiscounted total of payments is t… |

## Every question

<details><summary><code>fam-an-001</code> · untagged</summary>

Tagged pages: Cash Flow, Payoff, European Option

| Item | Kind | Status | Where |
|---|---|---|---|
| A put option gives its holder the right to sell the underlying asset at the strike price on the expiry date (European: only at expiry). | definition | tagged | European Option: “A **European option** gives its holder the right, but not the obligation, to buy (a **call**) or se…” |
| The payoff of a long put at expiry is max(K - S_T, 0), where K is the strike and S_T is the stock price at expiry. | formula | tagged | Payoff: “\text{Put: } (K - S_T)^+ = \max(K - S_T,\,0)” |
| The buyer of an option pays the premium at time 0 and the writer (seller) receives it; the writer's cash flows are the exact opposite of th… | fact | elsewhere | Option Trading Strategy: “A bull call spread costs money up front, while a bull put spread brings in a premium.” |
| Profit on an option position is the payoff at expiry plus the premium paid (or received) accumulated with interest at the risk-free rate; i… | definition | tagged | Payoff: “Profit is the payoff less the accumulated premium” |

</details>

<details><summary><code>fam-an-002</code> · answerable</summary>

Tagged pages: Delta Hedging, Black-Scholes Model, European Option

| Item | Kind | Status | Where |
|---|---|---|---|
| In the Black-Scholes framework, d1 = [ln(S/K) + (r - δ + 0.5σ²)T] / (σ√T), and d2 = d1 - σ√T. | formula | tagged | Delta Hedging: “$d_1 = \dfrac{\ln(S/K) + (r - \delta + \sigma^2/2)T}{\sigma\sqrt{T}}$” |
| The delta of a European put on a non-dividend-paying stock is -N(-d1), which equals N(d1) - 1 and is negative. | formula | tagged | Delta Hedging: “$$\Delta_{P} = -e^{-\delta T} N(-d_1)$$” |
| Delta is the change in an option's value per unit change in the stock price, and a position's delta is the number of options times the sign… | definition | tagged | Delta Hedging: “$\Delta$ being the derivative's sensitivity to the asset price” |
| To delta-hedge an option position, take a stock position whose delta (number of shares) is the negative of the option position's delta, so … | procedure | tagged | Delta Hedging: “A writer of the derivative holds $+\Delta$ shares per option sold (a call writer buys stock, a put …” |

</details>

<details><summary><code>fam-an-003</code> · gap</summary>

Tagged pages: Insurable Interest

| Item | Kind | Status | Where |
|---|---|---|---|
| Insurable interest is a financial or legally recognized stake in the insured person or property, such that the policyholder would suffer a … | definition | tagged | Insurable Interest: “**Insurable interest** is a relationship to the subject of insurance — a property, a liability expo…” |
| Life insurance requires an insurable interest only at inception of the policy; the policy remains valid if the relationship (e.g., marriage… | fact | tagged | Insurable Interest: “**When it must exist.** For property and liability cover, at the **time of loss**; for [[Life Insur…” |
| Property insurance requires an insurable interest at the time of loss, because it indemnifies a loss the insured actually suffers. | fact | tagged | Insurable Interest: “**When it must exist.** For property and liability cover, at the **time of loss**; for [[Life Insur…” |
| A mere expectation of a future benefit (such as an expected inheritance) or an intention to buy property, with no ownership right or contra… | fact | missing |  |
| A buyer already bound by a contract of sale can have an insurable interest in property before the sale closes. | fact | missing |  |
| The insurable interest requirement exists to prevent wagering: a policy on a stranger's life by someone with no financial or family tie lac… | fact | tagged | Insurable Interest (collapsed): “**Void.** No interest at inception — the contract is a wager on the stranger's life, the abuse insu…” |

</details>

<details><summary><code>fam-an-004</code> · answerable</summary>

Tagged pages: Defined Benefit Plan, Retirement Plan

| Item | Kind | Status | Where |
|---|---|---|---|
| A defined benefit plan specifies the member's benefit by a formula (e.g., accrual rate × years of service × final average salary), independ… | definition | tagged | Defined Benefit Plan: “A **Defined Benefit Plan** (DB plan) is a [[Retirement Plan]] that promises each member a pension s…” |
| In a defined benefit plan the plan sponsor bears investment risk and longevity risk, because it must fund the promised benefits, so poor re… | fact | tagged | Defined Benefit Plan: “Risks — investment, [[Mortality\\|longevity]] and, for FAS, salary inflation — are the sponsor's; th…” |
| A defined contribution plan fixes the contribution rate (e.g., a percentage of payroll) and the member's benefit is whatever the account ba… | definition | tagged | Retirement Plan: “a [[Defined Contribution Plan]] when the *contribution* is promised and the benefit is whatever the…” |
| In a life annuity pension, a member who lives longer receives the same annual benefit for more years, so the extra cost of longevity falls … | fact | linked | Life Annuity: “A **Life Annuity** pays periodic benefits contingent on the survival of one or more lives.” |

</details>

<details><summary><code>fam-an-005</code> · answerable</summary>

Tagged pages: Defined Contribution Plan, Retirement Plan, Life Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| In a defined contribution plan the contribution (e.g., a percentage of salary) is fixed and the benefit is not; the benefit is whatever the… | definition | tagged | Defined Contribution Plan: “The contribution is promised; the benefit is not.” |
| The annual pension from a DC account equals the account balance at retirement divided by the annuity price per 1 of annual income at that t… | formula | tagged | Defined Contribution Plan: “$$P = \frac{F_{x_0+n}}{\ddot{a}^{(12)}_{x_0+n}}$$” |
| In a DC plan the member bears the investment and annuity-pricing risk: a projected annuity price or replacement ratio in an illustration is… | fact | tagged | Defined Contribution Plan: “**The member bears the risks** a [[Defined Benefit Plan]] leaves with the [[Plan Sponsor]]: investm…” |

</details>

<details><summary><code>fam-an-006</code> · answerable</summary>

Tagged pages: Risk, Risk Measure, Pareto Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| Value at risk (VaR) at security level p is the p-th percentile of the loss distribution, the value x with F(x) = p. | definition | tagged | Risk Measure: “**Value at Risk** is the lower $p$-quantile of the loss ([[Percentile]]).” |
| Tail value at risk (TVaR) at security level p is the expected loss given that the loss exceeds VaR at p, E[X \| X > VaR_p]. | definition | tagged | Risk Measure: “The **conditional tail expectation** $E[X \mid X \geq \text{VaR}_p]$ equals TVaR for a continuous l…” |
| For a continuous loss, TVaR_p equals VaR_p plus the mean excess loss (mean residual life) evaluated at VaR_p, i.e. TVaR_p = VaR_p + e(VaR_p… | fact | tagged | Risk Measure: “**Tail Value at Risk** averages the worst $1-p$ of outcomes; for any distribution $\text{TVaR}_p = …” |
| The two-parameter Pareto distribution has survival function S(x) = (θ/(x+θ))^α, which can be set equal to 1−p and inverted to get percentil… | formula | tagged | Pareto Distribution: “$$F(x) = 1 - \left(\frac{\theta}{x + \theta}\right)^{\alpha}$$” |
| For a two-parameter Pareto with α > 1, the mean excess loss at d is e(d) = (d + θ)/(α − 1). | formula | tagged | Pareto Distribution: “So the expected payment per payment is $E[X - d \mid X > d] = \frac{\theta + d}{\alpha - 1}$, which…” |

</details>

<details><summary><code>faml-1-01</code> · untagged</summary>

Tagged pages: Underwriting, Adverse Selection, Life Annuity, Pure Endowment, Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| Adverse selection in insurance is the tendency of people with higher-than-average risk (e.g., higher mortality for death benefits) to seek … | definition | tagged | Underwriting: “It is the insurer's defence against [[Adverse Selection\\|adverse selection]]: pricing assumes an av…” |
| Products that pay benefits on death (e.g., life insurance) need underwriting because higher-than-expected mortality raises the actuarial pr… | fact | tagged | Underwriting: “Dropping full underwriting saves $\$300$ but adds about $\$844$ of expected claims per policy, so a…” |
| Products that pay benefits only while the insured survives (single premium immediate annuities, pure endowments) do not need underwriting a… | fact | tagged | Pure Endowment: “${}_nE_x$ falls when the interest rate rises and rises when mortality is lighter. That is the oppos…” |
| The distribution method affects the level of underwriting; for example, direct-marketed low face amount products may have very limited unde… | fact | elsewhere | Life Insurance Distribution: “Direct response and online sales reach customers without an agent, usually for simple term products…” |
| Underwriting may classify an applicant as a rated (substandard) life when a hazardous occupation or hobby increases expected mortality. | fact | syllabus | Extra Risk: “**Extra Risk** is mortality heavier than the standard basis, carried by a life who does not meet th…” |

</details>

<details><summary><code>faml-1-02</code> · gap</summary>

Tagged pages: Life Insurance, Risk Management

| Item | Kind | Status | Where |
|---|---|---|---|
| Life insurance products and their risk management have become more complex over recent decades because policyholders are more sophisticated… | fact | missing |  |
| Modern life insurance risk management has become more complex through the use of more advanced risk management techniques. | fact | tagged | Risk Management: “The environment it works in has moved from buying insurance for pure loss exposures toward [[Enterp…” |
| Modern life insurance products increasingly combine savings elements with protection elements rather than separating them, as seen in produ… | fact | tagged | Life Insurance: “and policies with account values such as [[Universal Life Insurance\\|universal life]] and equity-li…” |

</details>

<details><summary><code>faml-1-03</code> · answerable</summary>

Tagged pages: Guaranteed Minimum Death Benefit, Guaranteed Minimum Maturity Benefit, Annuity Contract, Universal Life Insurance, Long-Term Insurance Coverage, Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| A variable annuity is a modern insurance contract whose benefits are linked to the performance of an underlying investment fund, usually wi… | definition | tagged | Annuity Contract: “It may be **immediate** (income starts at once) or **deferred** (an accumulation phase first), and …” |
| Traditional contracts such as term life, endowment insurance and reversionary annuities have benefits that are fixed or defined by the cont… | fact | tagged | Long-Term Insurance Coverage: “\\| [[Endowment Insurance]] \\| Sum insured on death within $n$ years or on survival to $n$ \\| Intere…” |
| Universal life insurance is a flexible-premium contract with an account value credited with interest, rather than a benefit linked directly… | fact | tagged | Universal Life Insurance: “**Universal Life Insurance** (UL) is a flexible-premium permanent [[Life Insurance\\|life insurance]…” |

</details>

<details><summary><code>faml-1-04</code> · answerable</summary>

Tagged pages: Disability Income Insurance, Critical Illness Insurance, Long-Term Care Insurance, Long-Term Insurance Coverage

| Item | Kind | Status | Where |
|---|---|---|---|
| Disability income insurance replaces a portion of the insured's salary when illness or injury prevents the insured from working, typically … | definition | tagged | Disability Income Insurance: “replaces part of a person's earned income while sickness or injury keeps the insured from working.” |
| Long-term care insurance pays benefits when the insured cannot perform a specified number of activities of daily living or has cognitive im… | definition | tagged | Long-Term Care Insurance: “pays for the personal care a person needs when they can no longer look after themselves because of …” |
| Critical illness insurance pays a lump-sum benefit on diagnosis of a specified serious illness (e.g., cancer, heart attack), regardless of … | definition | tagged | Critical Illness Insurance: “pays a lump sum when the insured is first diagnosed with one of the serious conditions the policy l…” |
| Term life insurance pays a death benefit only if the insured dies within the policy term, and a single premium immediate annuity pays perio… | definition | tagged | Long-Term Insurance Coverage: “\\| [[Life Annuity]] \\| Income while the annuitant is alive \\| Longevity, interest \\|” |

</details>

<details><summary><code>faml-2-01</code> · answerable</summary>

Tagged pages: Future Lifetime Random Variable, Survival Model, Hazard Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The force of mortality equals the negative derivative of the log of the survival function: mu_x = -d/dx ln S_0(x). | formula | tagged | Hazard Rate: “= -\frac{d}{dt}\ln S(t)” |
| The t-year survival probability from age x is the ratio of survival function values: t_p_x = S_0(x+t)/S_0(x). | formula | tagged | Future Lifetime Random Variable: “so ${}_tp_x = S_0(x+t)/S_0(x)$” |
| The curtate expectation of life is the sum of the k-year survival probabilities for k from 1 onward: e_x = sum_{k>=1} k_p_x. | formula | tagged | Future Lifetime Random Variable: “e_x = E[K_x] = \sum_{k=1}^{\infty} {}_kp_x” |
| Survival probabilities are zero at and beyond the limiting age omega, so the curtate life expectancy sum terminates at the last age before … | fact | tagged | Future Lifetime Random Variable (collapsed): “The survival probabilities are $p_{97} = 0.7$, ${}_2p_{97} = 0.7(0.5) = 0.35$ and ${}_3p_{97} = 0$.” |

</details>

<details><summary><code>faml-2-02</code> · gap</summary>

Tagged pages: Variance for Conditional and Marginal Distributions, Binomial Distribution, Mixture Distribution, Survival Model

| Item | Kind | Status | Where |
|---|---|---|---|
| When the lives in a group are independent given a scenario, the number of survivors to a given time is binomial with n equal to the number … | fact | tagged | Binomial Distribution: “models the number of successes in $n$ independent Bernoulli trials, each with probability of succes…” |
| The multi-year survival probability is the product of the successive one-year survival probabilities: 2p_x = p_x * p_{x+1}, where p = 1 - q. | formula | missing |  |
| A mixed distribution arises when a common random factor (here, whether the vaccine is available) affects all lives, so the lives are indepe… | definition | tagged | Mixture Distribution: “A **Mixture Distribution** describes a variable $X$ drawn from a population made of subpopulations …” |
| Conditional variance formula (law of total variance): Var(S) = E[Var(S\|A)] + Var(E[S\|A]); equivalently, compute E(S) and E(S^2) as probab… | formula | tagged | Variance for Conditional and Marginal Distributions: “$$\text{Var}(X) = E\bigl[\text{Var}(X \mid Y)\bigr] + \text{Var}\bigl(E[X \mid Y]\bigr)$$” |
| The variance of a two-point random variable taking one value with probability p and another with probability 1-p is p(1-p) times the square… | fact | tagged | Binomial Distribution: “Since $X^2 = X$, $E[X] = E[X^2] = p$, so $\text{Var}(X) = p - p^2 = p(1-p)$ and $\text{SD}(X) = \sq…” |
| The standard deviation is the square root of the variance. | definition | elsewhere | Variance and Standard Deviation: “Variance is the expected squared deviation; standard deviation is its square root, restored to the …” |

</details>

<details><summary><code>faml-2-03</code> · answerable</summary>

Tagged pages: Parametric Survival Model, Probability Density Function (PDF), Future Lifetime Random Variable

| Item | Kind | Status | Where |
|---|---|---|---|
| Gompertz Law specifies the force of mortality as mu_x = B c^x (a special case of Makeham's Law with A = 0). | definition | tagged | Parametric Survival Model: “Gompertz's law is Makeham's with $A = 0$, a force that grows exponentially with age, and Makeham's …” |
| Under Gompertz Law, the survival function is S_x(t) = t_p_x = exp(-(B/ln c) c^x (c^t - 1)). | formula | tagged | Parametric Survival Model: “$$\text{Makeham: } {}_tp_x = \exp\left(-At - \frac{Bc^x\left(c^t - 1\right)}{\ln c}\right)$$” |
| The density of time-until-death for a life aged x is f_x(t) = -d/dt S_x(t) = t_p_x * mu_{x+t}. | formula | tagged | Future Lifetime Random Variable: “$$f_x(t) = {}_tp_x\,\mu_{x+t}$$” |

</details>

<details><summary><code>faml-2-04</code> · answerable</summary>

Tagged pages: Future Lifetime Random Variable, Survival Model

| Item | Kind | Status | Where |
|---|---|---|---|
| The temporary (term) complete expectation of life e°_{x:n\|} is the expected number of years lived within the next n years by a life aged x… | definition | tagged | Future Lifetime Random Variable: “Capping the lifetime at $n$ years gives the term expectations $\mathring{e}_{x:\overline{n}\\|} = \i…” |
| The temporary complete expectation of life equals the integral of the survival probability: e°_{x:n\|} = ∫_0^n t p_x dt. | formula | tagged | Future Lifetime Random Variable: “Capping the lifetime at $n$ years gives the term expectations $\mathring{e}_{x:\overline{n}\\|} = \i…” |
| Survival probability from age x is the ratio of survival from birth: t p_x = S_0(x+t)/S_0(x) = (x+t)p_0 / x p_0, where S_0(t) = 1 − t q_0. | formula | tagged | Future Lifetime Random Variable: “The lifetimes at different ages come from one lifetime $T_0$, conditioned on survival to age $x$, s…” |

</details>

<details><summary><code>faml-2-05</code> · gap</summary>

Tagged pages: Future Lifetime Random Variable, Survival Model

| Item | Kind | Status | Where |
|---|---|---|---|
| The complete expectation of life equals the temporary expectation plus the survival probability to the end of the term times the complete e… | formula | missing |  |
| The one-year temporary complete expectation e_{x:1\|} equals p_x, because the integral of survival probability over one year with only surv… | fact | tagged | Future Lifetime Random Variable: “Capping the lifetime at $n$ years gives the term expectations $\mathring{e}_{x:\overline{n}\\|} = \i…” |
| The survival probability over n years is the complement of the n-year death probability: {}_n p_x = 1 - {}_n q_x, and p_x = 1 - q_x. | fact | tagged | Future Lifetime Random Variable: “${}_tq_x = 1 - {}_tp_x$ is the probability that $(x)$ dies within $t$ years” |

</details>

<details><summary><code>faml-2-06</code> · answerable</summary>

Tagged pages: Survival Model, Hazard Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The force of mortality can be obtained from the survival function as the negative derivative of its natural log: mu_x = -d/dx ln S_0(x) = -… | formula | tagged | Hazard Rate (collapsed): “$$\mu(t) = -\frac{d}{dt}\ln S(t) = -\frac{d}{dt}(-0.05t^2) = 0.10t$$” |

</details>

<details><summary><code>faml-2-07</code> · answerable</summary>

Tagged pages: Survival Model, Future Lifetime Random Variable

| Item | Kind | Status | Where |
|---|---|---|---|
| The survival function S_0(x) gives the probability that a newborn survives to age x; for a piecewise-defined survival function, one evaluat… | definition | tagged | Survival Model: “The model is characterized by the **survival function** $S(t)$, which gives the probability of surv…” |
| The symbol {}_t q_x denotes the probability that a life aged x dies within the next t years. | definition | tagged | Survival Model: “The conditional probability of dying between ages $x$ and $x+t$, given alive at $x$, uses **actuari…” |
| For a life aged x, the probability of dying within t years is {}_t q_x = (S_0(x) - S_0(x+t)) / S_0(x), a conditional probability given surv… | formula | tagged | Survival Model: “$_{t}p_x = \dfrac{S(x+t)}{S(x)}$ and $_{t}q_x = 1 - {_t}p_x$” |

</details>

<details><summary><code>faml-2-08</code> · gap</summary>

Tagged pages: Survival Model, Hazard Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| With a constant force of mortality mu, the t-year survival probability is e^{-mu t}. | fact | syllabus | Parametric Survival Model: “The exponential model has a constant force $\mu$, so ${}_tp_x = e^{-\mu t}$ at every age.” |
| The expected number of survivors from a group at time t equals the initial number times the t-year survival probability; the expected popul… | procedure | missing |  |
| If the force of mortality of one group is a constant multiple k of another group's constant force, its t-year survival probability is the o… | fact | linked | Exponential Distribution: “Halving the mean doubles the rate and squares the survival probability at every fixed point, and if…” |

</details>

<details><summary><code>faml-2-09</code> · answerable</summary>

Tagged pages: Parametric Survival Model, Binomial Distribution, Variance

| Item | Kind | Status | Where |
|---|---|---|---|
| The number of survivors from a group of independent lives with the same age and survival probability follows a binomial distribution with n… | fact | tagged | Binomial Distribution: “The **Binomial Distribution** $X \sim \text{Bin}(n, p)$ models the number of successes in $n$ indep…” |
| The variance of a binomial random variable with n trials and success probability p is n p (1 - p). | formula | tagged | Binomial Distribution: “- $E[X] = np$ and $\text{Var}(X) = np(1-p)$” |
| Under Makeham's Law, the force of mortality is mu_x = A + B c^x, and the t-year survival probability is t_p_x = exp[-A t - (B / ln c) c^x (… | formula | linked | Mortality: “for which ${}_tp_x = \exp\!\big(-At - Bc^x(c^t - 1)/\ln c\big)$” |
| The probability of dying within t years, t_q_x, is the complement of the t-year survival probability: t_q_x = 1 - t_p_x. | definition | linked | Future Lifetime Random Variable: “${}_tq_x = 1 - {}_tp_x$ is the probability that $(x)$ dies within $t$ years” |

</details>

<details><summary><code>faml-2-10</code> · answerable</summary>

Tagged pages: Survival Model, Hazard Rate, Life Table

| Item | Kind | Status | Where |
|---|---|---|---|
| The t-year survival probability from age x equals the ratio of lives l_{x+t}/l_x. | fact | tagged | Life Table: “_{t}p_x = \frac{\ell_{x+t}}{\ell_x}, \qquad _{t}q_x = 1 - {}_{t}p_x = \frac{\ell_x - \ell_{x+t}}{\e…” |
| The t-year survival probability equals the exponential of the negative integral of the force of mortality: t_p_x = exp(-∫_0^t μ_{x+s} ds). | formula | tagged | Survival Model: “S(t) = \exp\!\left(-\int_0^t \mu(s)\,ds\right)” |

</details>

<details><summary><code>faml-2-11</code> · answerable</summary>

Tagged pages: Fractional Age Assumption, Life Table

| Item | Kind | Status | Where |
|---|---|---|---|
| The probability that a life aged x survives to age y and then dies by age z is (l_y - l_z)/l_x, i.e., the probability of death between ages… | formula | tagged | Life Table: “_{t}q_x = 1 - {}_{t}p_x = \frac{\ell_x - \ell_{x+t}}{\ell_x}” |
| The survivor counts l_(x+1) = l_x (1 - q_x), so successive l values can be built from the one-year mortality rates q_x starting from an arb… | fact | tagged | Life Table: “_{t}p_x = \frac{\ell_{x+t}}{\ell_x}, \qquad _{t}q_x = 1 - {}_{t}p_x = \frac{\ell_x - \ell_{x+t}}{\e…” |
| Under the uniform distribution of deaths (UDD) assumption between integer ages, l_(x+s) is linear in s: l_(x+s) = (1-s) l_x + s l_(x+1). | formula | tagged | Fractional Age Assumption: “$\ell_{x+s}$ is linear in $s$, so the density ${}_sp_x\,\mu_{x+s} = q_x$ is flat over the year.” |
| Under a constant force of mortality between integer ages, l_(x+s) = l_x^(1-s) · l_(x+1)^s (geometric interpolation), equivalently l_(x+s) =… | formula | tagged | Fractional Age Assumption: “Under a constant force, $\ell_{x+s}$ is exponential in $s$ and $\mu$ is flat within the year.” |

</details>

<details><summary><code>faml-2-12</code> · answerable</summary>

Tagged pages: Future Lifetime Random Variable, Survival Model, Variance

| Item | Kind | Status | Where |
|---|---|---|---|
| The survival function _tp_0 = P(T_0 > t) equals 1 minus the cumulative distribution function _tq_0 of future lifetime T_0. | definition | tagged | Future Lifetime Random Variable: “$${}_tp_x = \Pr(T_x > t) = S_x(t)$$” |
| The complete expectation of life is E[T_0] = ∫_0^ω _tp_0 dt, the integral of the survival function over the lifetime range. | formula | tagged | Future Lifetime Random Variable: “$$\mathring{e}_x = E[T_x] = \int_0^{\infty} {}_tp_x\,dt$$” |
| The second moment of future lifetime is E[T_0^2] = 2∫_0^ω t · _tp_0 dt. | formula | tagged | Future Lifetime Random Variable: “The second moments are $E[T_x^2] = 2\int_0^\infty t\,{}_tp_x\,dt$ and $E[K_x^2] = \sum_{k \ge 1}(2k…” |
| Variance equals the second moment minus the square of the mean: Var[T] = E[T^2] − (E[T])^2. | formula | tagged | Variance: “- Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$” |

</details>

<details><summary><code>faml-2-13</code> · answerable</summary>

Tagged pages: Parametric Survival Model, Life Table, Survival Model

| Item | Kind | Status | Where |
|---|---|---|---|
| Makeham's law gives the force of mortality as mu_x = A + B c^x, with A an age-independent (accident) component and B c^x an age-dependent c… | definition | tagged | Parametric Survival Model: “Makeham's constant $A$ adds an age-independent risk such as accidents.” |
| The t-year survival probability is obtained from the force of mortality by _tp_x = exp(-∫_0^t mu_{x+s} ds). | formula | tagged | Parametric Survival Model: “{}_tp_x = \exp\left(-\int_0^t \mu_{x+s}\,ds\right)” |
| If mu_x = k·mu_x^base + a constant c0, then _tp_x = (_tp_x^base)^k · e^(-c0·t): a multiplicative factor on the force of mortality becomes a… | fact | linked | Mortality: “a **constant addition** $\theta$ to the force (third block, so ${}_tp^*_x = e^{-\theta t}\,{}_tp_x$)” |
| The t-year death probability is _tq_x = 1 - _tp_x, and _tp_x = l_{x+t}/l_x for a life table, so base survival probabilities can be computed… | formula | tagged | Life Table: “_{t}p_x = \frac{\ell_{x+t}}{\ell_x}, \qquad _{t}q_x = 1 - {}_{t}p_x = \frac{\ell_x - \ell_{x+t}}{\e…” |
| The Standard Ultimate Life Table (SULT) follows Makeham's law, and its tabulated l_x values give base survival probabilities. | fact | tagged | Parametric Survival Model: “The Standard Ultimate Life Table (SULT) used on FAM is Makeham's law with $A = 0.00022$, $B = 2.7 \…” |

</details>

<details><summary><code>faml-3-01</code> · untagged</summary>

Tagged pages: Life Table, Fractional Age Assumption

| Item | Kind | Status | Where |
|---|---|---|---|
| The deferred mortality probability n\|m q_x is the probability that a life aged x survives n years and then dies within the following m yea… | definition | tagged | Life Table: “$_{t\\|}q_x = {}_{t}p_x \cdot q_{x+t}$ is the probability of dying in the year *after* surviving $t$…” |
| Under a constant force of mortality over a year of age, l_{x+k} = (l_x)^(1-k) (l_{x+1})^k for integer x and 0 ≤ k ≤ 1, i.e. geometric inter… | formula | tagged | Fractional Age Assumption: “$$\text{Constant force:}\quad {}_sp_x = \left(p_x\right)^s$$” |
| In a select and ultimate table with select period s, l_{[x]+k} for k ≥ s is read from the ultimate column as l_{x+k}, and within the select… | fact | elsewhere | Mortality Table Construction: “A table therefore gives select rates $q_{[x]+t}$ for durations within the select period and ultimat…” |
| To find survivorship at a fractional age in a select table, interpolate between the l values at the adjacent integer ages along the same se… | procedure | tagged | Fractional Age Assumption: “With it, a [[Life Table\\|life table]] that gives only $\ell_x$ or $q_x$ at integer ages also yields…” |

</details>

<details><summary><code>faml-3-02</code> · error</summary>

Error: ValueError: no usable 'found' list in the reply

</details>

<details><summary><code>faml-3-03</code> · answerable</summary>

Tagged pages: Life Table, Fractional Age Assumption

| Item | Kind | Status | Where |
|---|---|---|---|
| In a select and ultimate life table with a select period of n years, the select values l_[x]+k apply for durations k below n, and after n y… | definition | syllabus | Standard Actuarial Notation: “After the select period ends the brackets drop and the ultimate rate $q_{x+t}$ applies.” |
| The probability of death within t years for a life aged y is t_q_y = (l_y - l_{y+t}) / l_y, the ratio of lives dying in the interval to liv… | formula | tagged | Life Table: “_{t}q_x = 1 - {}_{t}p_x = \frac{\ell_x - \ell_{x+t}}{\ell_x}” |
| Under the uniform distribution of deaths (UDD) assumption, l_{x+s} for 0 ≤ s ≤ 1 is found by linear interpolation: l_{x+s} = (1-s) l_x + s … | fact | tagged | Fractional Age Assumption: “$\ell_{x+s}$ is linear in $s$, so the density ${}_sp_x\,\mu_{x+s} = q_x$ is flat over the year.” |
| For a select life at a fractional age [x]+s within the select period, interpolate between l_[x] and l_[x]+1 using UDD; for a fractional age… | procedure | tagged | Fractional Age Assumption: “$\ell_{x+s}$ is linear in $s$, so the density ${}_sp_x\,\mu_{x+s} = q_x$ is flat over the year.” |

</details>

<details><summary><code>faml-3-04</code> · answerable</summary>

Tagged pages: Normal Approximation, Life Table, Binomial Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The number of survivors among n independent lives with the same survival probability is a binomial random variable with parameters n and th… | fact | tagged | Binomial Distribution: “The **Binomial Distribution** $X \sim \text{Bin}(n, p)$ models the number of successes in $n$ indep…” |
| The probability that a life aged x survives to age x+t is the ratio of life table values, t p_x = l_{x+t} / l_x. | formula | tagged | Life Table: “$$_{t}p_x = \frac{\ell_{x+t}}{\ell_x}, \qquad _{t}q_x = 1 - {}_{t}p_x = \frac{\ell_x - \ell_{x+t}}{…” |
| A binomial random variable with parameters n and p has mean np and variance np(1-p). | formula | tagged | Normal Approximation: “A binomial$(n, p)$ is approximately $N\big(np,\ np(1-p)\big)$ and a Poisson$(\lambda)$ approximatel…” |
| To approximate a probability for a sum of many independent random variables, replace it with a normal distribution having the same mean and… | procedure | tagged | Normal Approximation: “The recipe: identify $n$, compute $E[S_n] = n\mu$ and $\text{Var}(S_n) = n\sigma^2$ ([[Moments for …” |
| When approximating a discrete integer-valued random variable by a normal distribution, apply the continuity correction, e.g. Pr(S ≥ s) = Pr… | procedure | tagged | Normal Approximation: “When $S_n$ is integer-valued — a claim count, a [[Binomial Distribution\\|binomial]], a [[Poisson Di…” |

</details>

<details><summary><code>faml-3-05</code> · answerable</summary>

Tagged pages: Fractional Age Assumption, Life Table, Standard Actuarial Notation

| Item | Kind | Status | Where |
|---|---|---|---|
| The deferred probability s\|t q_x is the probability that (x) survives s years and then dies within the following t years, equal to (l_{x+s… | definition | tagged | Life Table: “$_{t\\|}q_x = {}_{t}p_x \cdot q_{x+t}$ is the probability of dying in the year *after* surviving $t$…” |
| Under the uniform distribution of deaths (UDD) assumption, l_{x+f} for integer x and 0≤f≤1 is found by linear interpolation: l_{x+f} = (1-f… | formula | tagged | Fractional Age Assumption: “$\ell_{x+s}$ is linear in $s$, so the density ${}_sp_x\,\mu_{x+s} = q_x$ is flat over the year.” |
| Under a constant force of mortality over each year of age, l_{x+f} for integer x and 0≤f≤1 is found by geometric interpolation: l_{x+f} = l… | formula | tagged | Fractional Age Assumption: “Under a constant force, $\ell_{x+s}$ is exponential in $s$ and $\mu$ is flat within the year.” |

</details>

<details><summary><code>faml-3-06</code> · untagged</summary>

Tagged pages: Life Table, Future Lifetime Random Variable

| Item | Kind | Status | Where |
|---|---|---|---|
| The curtate expectation of life e_x equals the sum over k≥1 of k-year survival probabilities, e_x = Σ_{k≥1} kp_x. | definition | tagged | Life Table: “e_x = \sum_{t=1}^{\infty} {}_{t}p_x = \frac{\ell_{x+1} + \ell_{x+2} + \cdots}{\ell_x}” |
| The n-year temporary curtate expectation of life is e_{x:n\|} = Σ_{k=1}^{n} kp_x, and the whole-life value splits as e_x = e_{x:n\|} + np_x… | formula | tagged | Future Lifetime Random Variable: “$e_{x:\overline{n}\\|} = \sum_{k=1}^n {}_kp_x$” |
| In a select and ultimate table, a select life [x] follows q_{[x]}, q_{[x]+1}, … through the select period, after which mortality is ultimat… | fact | elsewhere | Mortality Table Construction: “A table therefore gives select rates $q_{[x]+t}$ for durations within the select period and ultimat…” |
| Multi-year survival probability is the product of successive one-year survival probabilities: kp_x = p_x · p_{x+1} ··· p_{x+k-1}, with p = … | formula | tagged | Life Table: “$_{s+t}p_x = {}_{s}p_x \cdot {}_{t}p_{x+s}$” |

</details>

<details><summary><code>faml-3-07</code> · untagged</summary>

Tagged pages: Fractional Age Assumption, Life Table

| Item | Kind | Status | Where |
|---|---|---|---|
| In a select-and-ultimate mortality table with a select period of n years, q_[x]+k for k<n is the mortality rate for a life aged x+k who was… | definition | elsewhere | Mortality Table Construction: “A table therefore gives select rates $q_{[x]+t}$ for durations within the select period and ultimat…” |
| Survival probabilities over consecutive periods multiply, and a survival probability from a non-integer age can be found by dividing: t+s p… | fact | tagged | Life Table: “Survival probabilities **multiply** across periods: $_{s+t}p_x = {}_{s}p_x \cdot {}_{t}p_{x+s}$” |
| Under a constant force of mortality between integer ages, the survival probability over a fraction s of a year (0≤s≤1) from age y is s p_y … | formula | tagged | Fractional Age Assumption: “while a constant force gives ${}_sp_{x+t} = (p_x)^s$” |
| The probability of death within t years is the complement of the survival probability: t q_x = 1 − t p_x. | fact | tagged | Life Table: “_{t}q_x = 1 - {}_{t}p_x = \frac{\ell_x - \ell_{x+t}}{\ell_x}” |

</details>

<details><summary><code>faml-3-08</code> · answerable</summary>

Tagged pages: Normal Approximation, Life Table, Binomial Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The k-year survival probability from age x, kp_x, is the probability that a life aged x survives k years, and equals l_{x+k}/l_x using life… | definition | tagged | Life Table: “$$_{t}p_x = \frac{\ell_{x+t}}{\ell_x}, \qquad _{t}q_x = 1 - {}_{t}p_x = \frac{\ell_x - \ell_{x+t}}{…” |
| Each member's survival to a given time is a Bernoulli random variable with success probability equal to the survival probability, so the co… | fact | tagged | Binomial Distribution: “If independent trials do not share one $p$, their total count is not binomial.” |
| For a sum of independent Bernoulli variables, the mean is the sum of the probabilities p_i and the variance is the sum of p_i(1-p_i); for a… | formula | tagged | Binomial Distribution: “$E[X] = np$ and $\text{Var}(X) = np(1-p)$” |
| Using the normal approximation, Pr(N ≤ x) ≈ Φ((x − E[N])/SD[N]); to find the value with a given tail probability, set it equal to μ + z·σ w… | procedure | tagged | Normal Approximation: “Inverted, it sets a fund: the total exceeded with probability $\alpha$ is about $n\mu + z_{1-\alpha…” |

</details>

<details><summary><code>faml-3-09</code> · answerable</summary>

Tagged pages: Normal Approximation, Life Table, Percentile, Binomial Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The k-year survival probability from age x is the ratio of life table survivors: kp_x = l_{x+k} / l_x. | formula | tagged | Life Table: “$$_{t}p_x = \frac{\ell_{x+t}}{\ell_x}, \qquad _{t}q_x = 1 - {}_{t}p_x = \frac{\ell_x - \ell_{x+t}}{…” |
| The number of survivors from a group of independent lives with the same survival probability p follows a binomial distribution, with mean n… | fact | tagged | Binomial Distribution: “The **Binomial Distribution** $X \sim \text{Bin}(n, p)$ models the number of successes in $n$ indep…” |
| For independent groups, the mean and variance of the total number of survivors are the sums of the groups' means and variances. | fact | tagged | Normal Approximation: “The recipe: identify $n$, compute $E[S_n] = n\mu$ and $\text{Var}(S_n) = n\sigma^2$ ([[Moments for …” |
| Using the normal approximation without continuity correction, the p-th percentile of a total is approximated by mean + z_p * standard devia… | procedure | tagged | Normal Approximation: “Inverted, it sets a fund: the total exceeded with probability $\alpha$ is about $n\mu + z_{1-\alpha…” |

</details>

<details><summary><code>faml-3-11</code> · gap</summary>

Tagged pages: Fractional Age Assumption, Life Table

| Item | Kind | Status | Where |
|---|---|---|---|
| The probability of death within a period extending past one interval splits as the probability of death in the first interval plus the prob… | fact | tagged | Life Table: “$_{t\\|}q_x = {}_{t}p_x \cdot q_{x+t}$ is the probability of dying in the year *after* surviving $t$…” |
| The survival probability over n years is the complement of the death probability: n p_x = 1 - n q_x. | definition | tagged | Life Table: “_{t}q_x = 1 - {}_{t}p_x = \frac{\ell_x - \ell_{x+t}}{\ell_x}” |
| Under a uniform distribution of deaths (UDD) over an interval of length n, the probability of death within the first s years of the interva… | fact | missing |  |

</details>

<details><summary><code>faml-3-12</code> · untagged</summary>

Tagged pages: Life Table, Fractional Age Assumption

| Item | Kind | Status | Where |
|---|---|---|---|
| In a select and ultimate mortality table with select period n, the survival function for a life selected at age x uses l_[x]+k within the s… | definition | elsewhere | Mortality Table Construction: “A table therefore gives select rates $q_{[x]+t}$ for durations within the select period and ultimat…” |
| The k-year survival probability from age x is the ratio of table values: _k p_x = l_{x+k} / l_x; for a select life, _k p_[x]+j = l_{[x]+j+k… | formula | tagged | Life Table: “$$_{t}p_x = \frac{\ell_{x+t}}{\ell_x}, \qquad _{t}q_x = 1 - {}_{t}p_x = \frac{\ell_x - \ell_{x+t}}{…” |
| A person's select status depends on the time since policy purchase, so a life aged x who bought a policy j years ago is evaluated as [x-j]+… | fact | elsewhere | Mortality Table Construction: “Mortality is low just after underwriting and rises with duration as the effect of selection wears o…” |
| Survival probabilities multiply over consecutive periods: _{s+t}p_x = _s p_x · _t p_{x+s}, so a survival probability can be split into a wh… | fact | tagged | Life Table: “Survival probabilities **multiply** across periods: $_{s+t}p_x = {}_{s}p_x \cdot {}_{t}p_{x+s}$” |
| Under the constant force of mortality assumption over a year of age, the fractional survival probability is _t p_x = (p_x)^t = (l_{x+1}/l_x… | formula | tagged | Life Table: “a **constant force** gives $_{s}p_x = (p_x)^s$” |

</details>

<details><summary><code>faml-3-13</code> · gap</summary>

Tagged pages: Life Table, Fractional Age Assumption, Future Lifetime Random Variable

| Item | Kind | Status | Where |
|---|---|---|---|
| The complete expectation of life is the expected future lifetime, e°_x = ∫0^∞ t p_x dt, while the curtate expectation e_x = Σ_{k≥1} k p_x c… | definition | tagged | Life Table: “e_x = \sum_{t=1}^{\infty} {}_{t}p_x” |
| Under the uniform distribution of deaths assumption, the complete expectation of life equals the curtate expectation plus 0.5, i.e. e°_x = … | fact | tagged | Life Table: “if deaths are uniformly distributed within each year of age, the complete expectation is exactly $\…” |
| The curtate expectation satisfies the recursion e_x = p_x (1 + e_{x+1}). | formula | missing |  |
| In a select and ultimate table, once past the select period the survival probabilities and expectations depend only on attained age, so ℓ_{… | fact | elsewhere | Mortality Table Construction: “A table therefore gives select rates $q_{[x]+t}$ for durations within the select period and ultimat…” |
| The one-year survival probability is computed from a life table as p_x = ℓ_{x+1}/ℓ_x (and for select ages p_{[x]+k} = ℓ_{[x]+k+1}/ℓ_{[x]+k}… | formula | tagged | Life Table: “_{t}p_x = \frac{\ell_{x+t}}{\ell_x}” |

</details>

<details><summary><code>faml-3-14</code> · answerable</summary>

Tagged pages: Life Table, Fractional Age Assumption

| Item | Kind | Status | Where |
|---|---|---|---|
| The deferred mortality probability n\|m q_x is the probability that (x) survives n years and then dies within the following m years, equal … | definition | tagged | Life Table: “$_{t\\|}q_x = {}_{t}p_x \cdot q_{x+t}$ is the probability of dying in the year *after* surviving $t$…” |
| In a life table, p_x = l_{x+1}/l_x, q_x = 1 - p_x, and d_x = l_x - l_{x+1}, so l_x can be recovered backward as l_{x+1}/p_x or d_x/q_x. | fact | tagged | Life Table: “$$_{t}p_x = \frac{\ell_{x+t}}{\ell_x}, \qquad _{t}q_x = 1 - {}_{t}p_x = \frac{\ell_x - \ell_{x+t}}{…” |
| At the oldest age in a life table (q = 1), all remaining lives die within the year, so l at that age equals d at that age. | fact | tagged | Life Table: “it records $\ell_x$, the expected number still alive at age $x$, and $d_x = \ell_x - \ell_{x+1}$, t…” |
| Under the uniform distribution of deaths (UDD) assumption, for integer x and 0 ≤ s ≤ 1, l_{x+s} = l_x - s·d_x (linear interpolation between… | formula | tagged | Life Table: “**UDD** gives $_{s}q_x = s\,q_x$” |

</details>

<details><summary><code>faml-3-15</code> · answerable</summary>

Tagged pages: Hazard Rate, Survival Model, Parametric Survival Model

| Item | Kind | Status | Where |
|---|---|---|---|
| The force of mortality equals the negative derivative of the survival function divided by the survival function: mu_x = -S'(x)/S(x) = -d/dx… | formula | tagged | Hazard Rate: “$$\mu(t) = -\frac{d}{dt}\ln S(t) = -\frac{d}{dt}(-0.05t^2) = 0.10t$$” |

</details>

<details><summary><code>faml-3-16</code> · gap</summary>

Tagged pages: Life Table, Fractional Age Assumption

| Item | Kind | Status | Where |
|---|---|---|---|
| The deferred probability _{u\|t}q_{y} is the probability that a life aged y survives u years and then dies within the next t years, equal t… | definition | tagged | Life Table (collapsed): “$$_{2\\|}q_{60} = \frac{\ell_{62} - \ell_{63}}{\ell_{60}} = \frac{220}{8{,}000} = 0.0275$$” |
| In a select and ultimate table, the select period is the number of years after selection during which mortality depends on both age at sele… | definition | elsewhere | Mortality Table Construction: “A table therefore gives select rates $q_{[x]+t}$ for durations within the select period and ultimat…” |
| To build a select life table from select and ultimate q values, start with an arbitrary radix l_{[x]} at the selected age and recursively c… | procedure | missing |  |
| Under the uniform distribution of deaths (UDD) assumption, l_{y+s} for integer y and 0≤s≤1 is obtained by linear interpolation: l_{y+s} = (… | fact | tagged | Fractional Age Assumption: “$\ell_{x+s}$ is linear in $s$, so the density ${}_sp_x\,\mu_{x+s} = q_x$ is flat over the year.” |
| Survivor counts at fractional ages within the select period are interpolated between the adjacent select survivor values l_{[x]+k} and l_{[… | fact | missing |  |

</details>

<details><summary><code>faml-3-18</code> · gap</summary>

Tagged pages: Fractional Age Assumption, Hazard Rate, Life Table

| Item | Kind | Status | Where |
|---|---|---|---|
| Under the uniform distribution of deaths (UDD) assumption within an age interval, the force of mortality is mu_{x+t} = q_x / (1 - t q_x) fo… | formula | tagged | Fractional Age Assumption: “$$\text{UDD:}\quad \mu_{x+s} = \frac{q_x}{1 - s\,q_x}$$” |
| The Standard Ultimate Life Table gives the one-year mortality rate q_x at each integer age (e.g., q_100), which must be read from the table… | fact | missing |  |

</details>

<details><summary><code>faml-4-01</code> · answerable</summary>

Tagged pages: Whole Life Insurance, Term Life Insurance, Variance

| Item | Kind | Status | Where |
|---|---|---|---|
| A benefit that is larger during a deferred or initial period can be decomposed into a constant whole life benefit plus an extra benefit on … | procedure | tagged | Term Life Insurance: “The last block splits a [[Whole Life Insurance\\|whole life]] insurance into term cover for $n$ year…” |
| The actuarial present value of an n-year deferred whole life insurance issued at age x equals the n-year pure endowment factor times the wh… | formula | tagged | Term Life Insurance: “$$A_x = A^{1}_{x:\overline{n}\\|} + {}_nE_x\,A_{x+n}$$” |
| The variance of a random variable is Var(Z) = E[Z^2] - (E[Z])^2, and the standard deviation is its square root. | formula | tagged | Variance: “- Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$” |
| A whole life insurance can be split at age x+n as A_x = A^1_{x:n} + nE_x * A_{x+n}, so the n-year term insurance value equals A_x minus nE_… | fact | tagged | Term Life Insurance: “$$A_x = A^{1}_{x:\overline{n}\\|} + {}_nE_x\,A_{x+n}$$” |

</details>

<details><summary><code>faml-4-02</code> · untagged</summary>

Tagged pages: Term Life Insurance, Present Value, Fractional Age Assumption

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value random variable of a death benefit insurance takes one value per possible time of payment (here each half-year of death),… | procedure | linked | Whole Life Insurance: “a death in year $k+1$ (survive $k$ years, probability ${_k}p_x$, then die, $q_{x+k}$) is paid at ti…” |
| A nominal interest rate convertible m times per year, i^(m), gives an effective rate per 1/m-year period of i^(m)/m, so the discount factor… | formula | elsewhere | Nominal Interest Rate Convertible m-thly: “Each period, interest at rate $i^{(m)}/m$ is credited.” |
| Under a constant force of mortality between integral ages, the survival probability over a fraction s of a year is t-year survival p^s, i.e… | formula | tagged | Fractional Age Assumption: “$$\text{Constant force:}\quad {}_sp_x = \left(p_x\right)^s$$” |
| The probability of death within a given future period is found by multiplying survival probabilities up to the start of the period by the p… | procedure | linked | Future Lifetime Random Variable: “${}_{u\\|t}q_x$ is the probability that $(x)$ survives $u$ years and then dies within the following …” |
| Pr(Z > c) is obtained by identifying which outcomes (times of death) give a present value exceeding c and summing their probabilities; the … | fact | linked | Future Loss Random Variable (collapsed): “Solving $v^{K+1} > c$ gives an upper limit on $K$, and the answer is a death probability ${}_mq_x$,…” |

</details>

<details><summary><code>faml-4-03</code> · answerable</summary>

Tagged pages: Endowment Insurance, Interest Rate, Interest

| Item | Kind | Status | Where |
|---|---|---|---|
| The n-year term insurance actuarial present value A^1_{x:n\|} is the expected present value of a benefit of 1 paid at the end of the year o… | definition | linked | Term Life Insurance: “For a life aged $x$ paid at the end of the year of death, its present value random variable is $Z$ …” |
| A 3-year term insurance APV equals the sum over years k=1..3 of v^k times the probability of surviving to the start of year k and dying in … | formula | linked | Term Life Insurance: “$$A^{1}_{x:\overline{n}\\|} = \sum_{k=0}^{n-1} v^{k+1}\,{}_kp_x\,q_{x+k}$$” |
| When a policy is a 3-year endowment insurance (the notation A_{x:n\|} with no 1 over the n), the survival benefit paid at the end of year n… | fact | tagged | Endowment Insurance: “$$A_{x:\overline{n}\\|} = A^{1}_{x:\overline{n}\\|} + {}_nE_x$$” |
| Mortality probabilities (q values) do not depend on the interest rate, so an unknown q derived from an APV at one interest rate can be reus… | fact | syllabus | Long-Term Insurance Coverage (collapsed): “\text{One-year term: } 100{,}000(0.005915)/1.05 &= 563.33 \\ … 100{,}000(0.005915)/1.04 &= 568.75 \\” |
| The probability of surviving two consecutive years is the product of one-year survival probabilities, 2p_x = p_x p_{x+1} with p = 1 - q. | formula | linked | Future Lifetime Random Variable: “${}_{t+u}p_x = {}_tp_x\,{}_up_{x+t}$” |

</details>

<details><summary><code>faml-4-04</code> · answerable</summary>

Tagged pages: Whole Life Insurance, Variance, Future Lifetime Random Variable, Payable Continuously

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value random variable Z for a continuous whole life insurance with time-dependent benefit b_t and discount v(t) is Z = b_T · v(… | definition | tagged | Whole Life Insurance: “$\bar{A}_x = E\!\left[e^{-\delta T_x}\right] = \int_0^\infty e^{-\delta t}\,{_t}p_x\,\mu_{x+t}\,dt$” |
| The expected value of a function g(T) of future lifetime is E[g(T)] = ∫ g(t) f_T(t) dt, where f_T(t) = {}_tp_x μ_{x+t}. | formula | tagged | Whole Life Insurance: “$\bar{A}_x = E\!\left[e^{-\delta T_x}\right] = \int_0^\infty e^{-\delta t}\,{_t}p_x\,\mu_{x+t}\,dt$” |
| Var(Z) = E[Z²] − (E[Z])². | formula | tagged | Whole Life Insurance: “$\text{Var} = {}^2\!A_x - (A_x)^2$” |
| The second moment E[Z²] is computed by squaring the whole present value, (b_T v(T))², and integrating against the density of T; with a gene… | procedure | tagged | Future Lifetime Random Variable: “$E[T_x^2] = 2\int_0^\infty t\,{}_tp_x\,dt$” |

</details>

<details><summary><code>faml-4-05</code> · gap</summary>

Tagged pages: Term Life Insurance, Percentile, Life Table, Fractional Age Assumption

| Item | Kind | Status | Where |
|---|---|---|---|
| For a term insurance with level benefit payable at death and positive force of interest, the present value of benefits decreases with time … | fact | missing |  |
| To find the p-th percentile of the PV of a term insurance benefit, find the time of death t at which the cumulative probability of death eq… | procedure | missing |  |
| The present value of a death benefit B payable at the moment of death at time t under constant force of interest δ is B·e^{-δt}. | formula | tagged | Term Life Insurance: “$\bar{A}^{1}_{x:\overline{n}\\|}$ values a benefit paid at the moment of death, $e^{-\delta T_x}$ wh…” |
| Under the uniform distribution of deaths (UDD) assumption within each year of age, l_{x+s} is linear in s for 0≤s≤1, so fractional ages are… | fact | tagged | Life Table: “**UDD** gives $_{s}q_x = s\,q_x$” |
| l_x in a life table is the expected number of survivors to age x out of a radix of lives, and l_{x+t}/l_x is the probability that a life ag… | definition | tagged | Life Table: “it records $\ell_x$, the expected number still alive at age $x$” |

</details>

<details><summary><code>faml-4-06</code> · answerable</summary>

Tagged pages: Term Life Insurance, Life Table, Mortality

| Item | Kind | Status | Where |
|---|---|---|---|
| The single net premium of a term insurance equals the expected present value (EPV) of its death benefits, since the net premium is set by t… | fact | tagged | Term Life Insurance: “its expected present value (EPV), the net single premium, is $A^{1}_{x:\overline{n}\\|}$” |
| The EPV of an n-year term insurance paying benefit B at the end of the year of death is B times the sum over k=0..n-1 of v^(k+1) * kp_x * q… | formula | tagged | Term Life Insurance: “A^{1}_{x:\overline{n}\\|} = \sum_{k=0}^{n-1} v^{k+1}\,{}_kp_x\,q_{x+k}” |
| The probability of surviving k years is the product of successive one-year survival probabilities: kp_x = (1-q_x)(1-q_{x+1})...(1-q_{x+k-1}… | formula | tagged | Life Table: “Survival probabilities **multiply** across periods: $_{s+t}p_x = {}_{s}p_x \cdot {}_{t}p_{x+s}$, wh…” |
| The discount factor is v = 1/(1+i), where i is the annual effective interest rate. | definition | syllabus | Standard Actuarial Notation: “$v = 1/(1+i)$ is the discount factor” |
| To obtain mortality rates from a modified basis, multiply the Standard Ultimate Life Table rate at each age by the given factor (here a fac… | procedure | tagged | Mortality: “a **constant multiple** of the rate, $q^*_x = k\,q_x$” |

</details>

<details><summary><code>faml-4-07</code> · answerable</summary>

Tagged pages: Pure Endowment, Variance, Interest Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| A pure endowment pays a benefit only if the insured survives to the end of the term, so its present value random variable Z equals v^n with… | definition | tagged | Pure Endowment: “- **Symbols:** $Z = v^n I$, where $I$ indicates survival of $(x)$ to age $x+n$ and is a Bernoulli v…” |
| The expected present value of an n-year pure endowment of 1 is E[Z] = v^n · nPx. | formula | tagged | Pure Endowment: “${}_nE_x = A^{\phantom{x:}1}_{x:\overline{n}\\|} = v^n\,{}_np_x$” |
| The variance of the present value of an n-year pure endowment of 1 is Var(Z) = v^(2n) · nPx · (1 − nPx), i.e., E[Z^2] − (E[Z])^2 with E[Z^2… | formula | tagged | Pure Endowment: “$$\text{Var}(Z) = v^{2n}\,{}_np_x\,{}_nq_x$$” |
| The discount factor is v = 1/(1+i), where i is the annual effective interest rate, so v^n = (1+i)^(-n). | fact | linked | Present Value: “future cash flows are multiplied by the discount factor $v = (1+i)^{-1}$ raised to the number of pe…” |

</details>

<details><summary><code>faml-4-08</code> · answerable</summary>

Tagged pages: Whole Life Insurance, Life Table, Interest Rate, Interest

| Item | Kind | Status | Where |
|---|---|---|---|
| The actuarial present value of a whole life insurance paying a benefit at the end of the year of death is the benefit times A_x, the expect… | definition | tagged | Whole Life Insurance: “$$A_x = \sum_{k=0}^{\infty} v^{k+1}\,{_k}p_x\,q_{x+k}$$” |
| When the interest rate varies by year, split the insurance by the first year: the APV is the first-year discount factor times the sum of q_… | procedure | tagged | Whole Life Insurance: “**Recursion:** either $(x)$ dies in the first year and 1 is paid in a year, or $(x)$ survives and h…” |
| The one-year recursion for whole life insurance is A_x = v(q_x + p_x A_{x+1}), with p_x = 1 - q_x. | fact | tagged | Whole Life Insurance: “$$A_x = v\,q_x + v\,p_x\,A_{x+1}$$” |
| Values of q_x and A_x for a given age and interest rate are read from the Standard Ultimate Life Table (SULT) and its tables of values at 5… | procedure | linked | Term Life Insurance (collapsed): “because the SULT tabulates $A_x$, ${}^2A_x$ and ${}_nE_x$ rather than term insurance values” |

</details>

<details><summary><code>faml-4-09</code> · answerable</summary>

Tagged pages: Endowment Insurance, Whole Life Insurance, Term Life Insurance, Pure Endowment, Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| A whole life insurance APV at age x equals the APV of an n-year term insurance plus the APV of an n-year pure endowment times the whole lif… | fact | tagged | Term Life Insurance: “$$A_x = A^{1}_{x:\overline{n}\\|} + {}_nE_x\,A_{x+n}$$” |
| An n-year endowment insurance APV equals the n-year term insurance APV plus the n-year pure endowment APV: A_{x:n\|} = A^1_{x:n\|} + A_{x:n… | fact | tagged | Endowment Insurance: “$$A_{x:\overline{n}\\|} = A^{1}_{x:\overline{n}\\|} + {}_nE_x$$” |
| The n-year pure endowment APV A_{x:n\|}^{ 1} (nE_x) is the expected present value of a unit payment at the end of n years if the insured su… | definition | tagged | Term Life Insurance: “where ${}_nE_x = v^n\,{}_np_x$ is the [[Pure Endowment\\|pure endowment]] factor.” |

</details>

<details><summary><code>faml-4-10</code> · answerable</summary>

Tagged pages: Whole Life Insurance, Pure Endowment, Term Life Insurance, Standard Actuarial Notation, Random Variable

| Item | Kind | Status | Where |
|---|---|---|---|
| The expected present value of a continuous whole life insurance paying 1 at the moment of death of (x) is the actuarial present value \bar{… | definition | tagged | Whole Life Insurance: “$\bar{A}_x = E\!\left[e^{-\delta T_x}\right] = \int_0^\infty e^{-\delta t}\,{_t}p_x\,\mu_{x+t}\,dt$” |
| The pure endowment (discount) factor {}_nE_x = v^n {}_np_x is the actuarial present value of 1 payable at age x+n if (x) survives n years. | definition | tagged | Pure Endowment: “${}_nE_x = A^{\phantom{x:}1}_{x:\overline{n}\\|} = v^n\,{}_np_x$” |
| A deferred insurance benefit is valued by discounting to time 0 through survival: the value of a whole life insurance issued at age x+n, mu… | procedure | tagged | Pure Endowment: “${}_{n\\|}\ddot{a}_x = {}_nE_x\,\ddot{a}_{x+n}$” |
| A piecewise benefit pattern can be decomposed into a linear combination of deferred whole life insurances, with each step change in benefit… | fact | tagged | Term Life Insurance: “The last block splits a [[Whole Life Insurance\\|whole life]] insurance into term cover for $n$ year…” |
| Expectation is linear, so the expected present value of a sum of benefit components equals the sum of the components' expected present valu… | fact | syllabus | Expected Value: “It is linear: $E[aX + b] = aE[X] + b$” |

</details>

<details><summary><code>faml-4-11</code> · answerable</summary>

Tagged pages: Endowment Insurance, Term Life Insurance, Pure Endowment, Variance

| Item | Kind | Status | Where |
|---|---|---|---|
| An n-year endowment insurance is the sum of an n-year term insurance and an n-year pure endowment, so its present value random variable is … | fact | tagged | Endowment Insurance: “$Z$ is the sum of the term insurance and pure endowment present values, $Z_1 + Z_2$.” |
| The variance of a benefit-b insurance present value Z is b^2 [ ^2A - (A)^2 ], where ^2A is the actuarial present value computed at double t… | formula | tagged | Endowment Insurance: “$$\text{Var}(Z) = {}^2A_{x:\overline{n}\\|} - \left(A_{x:\overline{n}\\|}\right)^2$$” |
| The second moment of the endowment insurance PV equals the sum of the second moments of the term insurance and pure endowment, because the … | fact | tagged | Endowment Insurance: “They can never both be positive, so $E[Z_1 Z_2] = 0$ and $\text{Cov}(Z_1, Z_2) = -A^{1}_{x:\overlin…” |
| Var(Z_endowment) = Var(Z_term) + Var(Z_pure endowment) + 2 Cov(Z_term, Z_pure endowment), where Cov = -E[Z_term]E[Z_pure endowment] since t… | formula | tagged | Endowment Insurance (collapsed): “The variance of $Z$ is not $\text{Var}(Z_1) + \text{Var}(Z_2)$, because the covariance $-A^{1}_{x:\…” |

</details>

<details><summary><code>faml-4-12</code> · error</summary>

Error: ValueError: no usable 'found' list in the reply

</details>

<details><summary><code>faml-4-13</code> · answerable</summary>

Tagged pages: Term Life Insurance, Life Table

| Item | Kind | Status | Where |
|---|---|---|---|
| The actuarial present value of an n-year deferred m-year term insurance paying 1 at the end of the year of death is the sum over death year… | formula | tagged | Term Life Insurance: “its EPV is $\sum_{k=0}^{n-1} b_{k+1}\,v^{k+1}\,{}_kp_x\,q_{x+k}$ for a benefit $b_{k+1}$ on death i…” |
| A select and ultimate mortality table uses select rates q_[x]+k for ages within the select period after selection at age x, and after the s… | definition | linked | Future Lifetime Random Variable: “In a select model the distribution also depends on the age at selection, which the notation shows a…” |
| The k-year survival probability from a select age is the product of successive one-year survival probabilities, {}_{k}p_[x] = (1 - q_[x])(1… | formula | tagged | Life Table: “Survival probabilities **multiply** across periods: $_{s+t}p_x = {}_{s}p_x \cdot {}_{t}p_{x+s}$” |
| The present value of a benefit paid at the end of year k is the benefit times v^k, where v = 1/(1+i), and the APV of a benefit amount is th… | fact | syllabus | Present Value: “$PV = FV \cdot (1+i)^{-n}$” |

</details>

<details><summary><code>faml-4-14</code> · answerable</summary>

Tagged pages: Normal Approximation, Pure Endowment, Life Table

| Item | Kind | Status | Where |
|---|---|---|---|
| The k-year survival probability from age x is kpx = l_(x+k)/l_x, computed from life table values. | formula | tagged | Life Table: “$$_{t}p_x = \frac{\ell_{x+t}}{\ell_x}, \qquad _{t}q_x = 1 - {}_{t}p_x = \frac{\ell_x - \ell_{x+t}}{…” |
| The number of survivors from n independent lives with the same survival probability p is binomial(n, p), with mean np and variance np(1-p). | fact | tagged | Normal Approximation: “A binomial$(n, p)$ is approximately $N\big(np,\ np(1-p)\big)$ and a Poisson$(\lambda)$ approximatel…” |
| Using the normal approximation, the value that is not exceeded with probability q is mean + z_q * standard deviation, where z_q is the stan… | procedure | tagged | Normal Approximation: “the total exceeded with probability $\alpha$ is about $n\mu + z_{1-\alpha}\,\sigma\sqrt{n}$, where …” |
| Because survivors are whole persons, the required number of survivors is rounded up to an integer when computing the total payout. | procedure | tagged | Normal Approximation (collapsed): “n &\ge 1{,}082.4 … At least $1{,}083$ policies.” |
| The initial fund needed to meet a payment due in n years is the payment times the discount factor v^n = (1+i)^(-n). | formula | syllabus | Present Value: “A payment of $FV$ due in $n$ periods at effective rate $i$ has present value: … $$= FV \cdot v^n$$” |

</details>

<details><summary><code>faml-4-15</code> · gap</summary>

Tagged pages: Whole Life Insurance, Variance, Force of Interest

| Item | Kind | Status | Where |
|---|---|---|---|
| For a continuous (payable at moment of death) insurance with benefit b_t, the expected present value is E[Z] = ∫0^∞ b_t v^t · t_p_x · μ_{x+… | formula | tagged | Whole Life Insurance: “$\bar{A}_x = E\!\left[e^{-\delta T_x}\right] = \int_0^\infty e^{-\delta t}\,{_t}p_x\,\mu_{x+t}\,dt$” |
| The second moment of the present value of a continuous insurance is E[Z^2] = ∫0^∞ (b_t v^t)^2 · t_p_x · μ_{x+t} dt, i.e. the benefit-discou… | formula | tagged | Whole Life Insurance: “with ${}^2\!\bar{A}_x$ at $2\delta$” |
| Var(Z) = E[Z^2] − (E[Z])^2. | formula | tagged | Variance: “Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$” |
| With a constant force of mortality μ, the survival probability is t_p_x = e^{-μt}, and the discount factor is v^t = e^{-δt}. | fact | missing |  |

</details>

<details><summary><code>faml-4-16</code> · answerable</summary>

Tagged pages: Term Life Insurance, Life Table

| Item | Kind | Status | Where |
|---|---|---|---|
| The n-year term insurance actuarial present value A^1_{x:n} is the expected present value of a unit benefit paid at the end of the year of … | definition | tagged | Term Life Insurance: “**Term Life Insurance** pays a sum insured if the insured dies within a fixed term of $n$ years, an…” |
| A discrete n-year term insurance APV equals the sum over k=0..n-1 of v^{k+1} times k-year survival probability times the one-year death pro… | formula | tagged | Term Life Insurance: “$$A^{1}_{x:\overline{n}\\|} = \sum_{k=0}^{n-1} v^{k+1}\,{}_kp_x\,q_{x+k}$$” |
| In a select and ultimate mortality table, select rates q_[x]+k apply to a life selected at age x for durations k within the select period, … | definition | syllabus | Standard Actuarial Notation: “Square brackets mark the age at selection, so $q_{[x]+t}$ is the mortality rate at age $x+t$ for a …” |
| For a life with select age [x], survival probabilities over multiple years are products of one-year survival probabilities p_[x], p_[x]+1, … | fact | syllabus | Standard Actuarial Notation (collapsed): “A life selected at 60 reads along the first row, and after two years it joins the ultimate column a…” |
| The one-year survival probability is p = 1 - q, and the discount factor is v = 1/(1+i). | formula | linked | Future Lifetime Random Variable: “${}_tq_x = 1 - {}_tp_x$ is the probability that $(x)$ dies within $t$ years” |

</details>

<details><summary><code>faml-4-17</code> · answerable</summary>

Tagged pages: Whole Life Insurance, Median, Future Lifetime Random Variable, Life Table

| Item | Kind | Status | Where |
|---|---|---|---|
| The median of the curtate future lifetime K_x is the integer m satisfying P(K_x < m) ≤ 0.5 and P(K_x > m) ≤ 0.5, i.e. the point where the s… | definition | tagged | Median: “For a [[Discrete Random Variable\\|discrete]] $X$ the CDF usually jumps past 0.5 rather than landing…” |
| Survival probability to age x+m equals l_{x+m}/l_x, so the median can be found by locating the age at which l_{x+m} falls to half of l_x us… | fact | tagged | Life Table: “$$_{t}p_x = \frac{\ell_{x+t}}{\ell_x}, \qquad _{t}q_x = 1 - {}_{t}p_x = \frac{\ell_x - \ell_{x+t}}{…” |
| Decompose a benefit that depends on whether death occurs before or after time m into a whole life insurance of the lower amount from issue … | procedure | linked | Term Life Insurance: “The last block splits a [[Whole Life Insurance\\|whole life]] insurance into term cover for $n$ year…” |
| The APV of an m-year deferred whole life insurance paying 1 at end of year of death is m\|A_x = mE_x · A_{x+m}, where mE_x = v^m · l_{x+m}/… | formula | linked | Term Life Insurance: “The last block splits a [[Whole Life Insurance\\|whole life]] insurance into term cover for $n$ year…” |
| Pure endowment factors multiply over consecutive periods: (m+n)E_x = mE_x · nE_{x+m}. | fact | syllabus | Pure Endowment: “$${}_{m+n}E_x = {}_mE_x\;{}_nE_{x+m}$$” |
| The Standard Ultimate Life Table at i = 5% provides tabulated values of l_x and A_x (and nE_x can be built from them) used to evaluate insu… | fact | linked | Term Life Insurance (collapsed): “On the SULT at $5\%$, $A_{50} = 0.18931$, $A_{60} = 0.29028$, ${}^2A_{50} = 0.05108$, ${}^2A_{60} =…” |

</details>

<details><summary><code>faml-4-18</code> · gap</summary>

Tagged pages: Percentile, Present Value, Future Lifetime Random Variable

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a benefit B paid at time T under a constant force of interest δ is B·e^(−δT). | formula | syllabus | Future Loss Random Variable: “A fully continuous whole life has $L_0 = \left(S + P/\delta\right)e^{-\delta T_x} - P/\delta$.” |
| If a random variable Y is a decreasing function of T, the p-th percentile of Y equals the function evaluated at the (1−p)-th percentile of … | fact | missing |  |
| A percentile of a continuous random variable is found by integrating the density from the lower bound of the support to the unknown point a… | procedure | tagged | Percentile: “When $F$ is continuous and strictly increasing, it is the value that solves $F(x_p) = p$, found by …” |
| When a benefit is paid only if T lies in an interval, the present value is zero outside the interval, so probability mass outside the inter… | fact | tagged | Percentile: “Since $F_Y(0) = 0.1813 \ge 0.10$, the 10th percentile is $y_{0.10} = 0$, even though $F_Y(y) = 0.10…” |

</details>

<details><summary><code>faml-4-19</code> · answerable</summary>

Tagged pages: Whole Life Insurance, Life Table, Mortality

| Item | Kind | Status | Where |
|---|---|---|---|
| A select mortality table applies special (select) mortality rates during the select period after underwriting, after which mortality follow… | definition | syllabus | Standard Actuarial Notation: “Square brackets mark the age at selection, so $q_{[x]+t}$ is the mortality rate at age $x+t$ for a …” |
| The survival probability over one year equals one minus the one-year mortality rate, p = 1 - q. | fact | tagged | Life Table: “$$_{t}p_x = \frac{\ell_{x+t}}{\ell_x}, \qquad _{t}q_x = 1 - {}_{t}p_x = \frac{\ell_x - \ell_{x+t}}{…” |
| The whole life insurance APV satisfies the one-year recursion A_x = v q_x + v p_x A_{x+1}, where the first-year death benefit is paid at en… | formula | tagged | Whole Life Insurance: “$$A_x = v\,q_x + v\,p_x\,A_{x+1}$$” |
| After the select period ends, the insurance value at the next age equals the ultimate table's value (e.g., A_{x+1} from the Standard Ultima… | fact | tagged | Whole Life Insurance: “**Recursion:** either $(x)$ dies in the first year and 1 is paid in a year, or $(x)$ survives and h…” |
| The APV of a death benefit of size B is B times the APV per unit benefit. | fact | linked | Life Insurance (collapsed): “The EPV is $\$3{,}212.84$ but the standard deviation is five times that: term insurance is almost a…” |

</details>

<details><summary><code>faml-4-20</code> · answerable</summary>

Tagged pages: Whole Life Insurance, Variance, Force of Interest

| Item | Kind | Status | Where |
|---|---|---|---|
| For a fully continuous whole life insurance with time-dependent death benefit b_t, the expected present value is E(Z) = ∫0^∞ b_t v^t · tp_x… | formula | tagged | Whole Life Insurance: “$\bar{A}_x = E\!\left[e^{-\delta T_x}\right] = \int_0^\infty e^{-\delta t}\,{_t}p_x\,\mu_{x+t}\,dt$” |
| The second moment of the present value is E(Z^2) = ∫0^∞ (b_t v^t)^2 · tp_x · μ_{x+t} dt, i.e. the squared present value of the benefit is i… | formula | tagged | Whole Life Insurance: “the second moment ${}^2\!A_x$ of the present value is $A_x$ at discount factor $v^2$ (double the fo…” |
| Var(Z) = E(Z^2) − [E(Z)]^2. | formula | tagged | Variance: “Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$” |
| With a constant force of mortality μ, the survival probability is tp_x = e^{-μt} and the density of the future lifetime is tp_x·μ_{x+t} = μ… | fact | syllabus | Parametric Survival Model: “The exponential model has a constant force $\mu$, so ${}_tp_x = e^{-\mu t}$ at every age.” |
| The present value at issue of a benefit b_T paid at the moment of death T is Z = b_T e^{-δT}, where δ is the force of interest and v^t = e^… | definition | tagged | Whole Life Insurance: “$\bar{A}_x = E\!\left[e^{-\delta T_x}\right] = \int_0^\infty e^{-\delta t}\,{_t}p_x\,\mu_{x+t}\,dt$” |

</details>

<details><summary><code>faml-4-21</code> · answerable</summary>

Tagged pages: Term Life Insurance, Variance, Fractional Age Assumption

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value random variable Z of an n-year term insurance paying 1 at the moment of death is v^T if T < n and 0 otherwise, and its va… | definition | tagged | Term Life Insurance: “$\bar{A}^{1}_{x:\overline{n}\\|}$ values a benefit paid at the moment of death, $e^{-\delta T_x}$ wh…” |
| Under the uniform distribution of deaths (UDD) assumption within each year of age, the continuous insurance actuarial present value for a y… | fact | tagged | Term Life Insurance: “Under UDD, $\bar{A}^{1}_{x:\overline{n}\\|} = \frac{i}{\delta}A^{1}_{x:\overline{n}\\|}$.” |
| The APV of an n-year term insurance paying 1 at moment of death is the sum over years k of v^(k+1) · (k p_x) · q_{x+k}, multiplied by i/δ u… | formula | tagged | Term Life Insurance: “$\bar{A}^{1}_{x:\overline{n}\\|} = \int_0^n e^{-\delta t}\,{}_tp_x\,\mu_{x+t}\,dt$” |
| The second moment E(Z^2) of an insurance is computed as the first-moment APV with the force of interest doubled (δ→2δ, v→v^2), so under UDD… | procedure | tagged | Term Life Insurance: “${}^2A^{1}_{x:\overline{n}\\|}$ is the EPV at $v^2$, which is the second moment of $Z$ because $Z^2 …” |
| The force of interest is δ = ln(1+i), and the two-year survival probability is 2p_x = p_x · p_{x+1} = (1-q_x)(1-q_{x+1}) (here, survival th… | formula | linked | Future Lifetime Random Variable: “${}_{t+u}p_x = {}_tp_x\,{}_up_{x+t}$” |

</details>

<details><summary><code>faml-4-22</code> · answerable</summary>

Tagged pages: Term Life Insurance, Life Table, Mortality

| Item | Kind | Status | Where |
|---|---|---|---|
| The expected present value of an n-year term insurance paying 1 at the end of the year of death is the sum over k of v^(k+1) times the prob… | formula | tagged | Term Life Insurance: “A^{1}_{x:\overline{n}\\|} = \sum_{k=0}^{n-1} v^{k+1}\,{}_kp_x\,q_{x+k}” |
| The probability of surviving k years equals the product of successive one-year survival probabilities, kp_x = p_x · p_{x+1} · ... · p_{x+k-… | fact | tagged | Life Table: “Survival probabilities **multiply** across periods: $_{s+t}p_x = {}_{s}p_x \cdot {}_{t}p_{x+s}$” |
| To model a modified (e.g., substandard) mortality for one year, multiply the standard table's one-year survival probability by the given fa… | procedure | tagged | Mortality (collapsed): “**Adding to $q$ when the question adds to $\mu$.** A constant addition $\theta$ to the force multip…” |
| Look up the one-year mortality rates q_x at the relevant ages from the Standard Ultimate Life Table, and discount each year's benefit with … | procedure | tagged | Life Table: “Every survival and mortality probability the exam asks for can be read off these two columns.” |
| The expected present value of a death benefit of face amount B equals B times the expected present value per unit of insurance. | fact | syllabus | Long-Term Insurance Coverage: “\text{EPV} = \sum_{k} \text{CF}_k\, v^{k}\,\Pr(\text{CF}_k \text{ is paid})” |

</details>

<details><summary><code>faml-5-01</code> · answerable</summary>

Tagged pages: Life Annuity, Continuous Annuity, Future Lifetime Random Variable, Random Variable

| Item | Kind | Status | Where |
|---|---|---|---|
| A continuous annuity with n years certain pays 1 per year for n years regardless of survival and continues thereafter for as long as the an… | definition | tagged | Life Annuity: “**Guaranteed** for $n$ years (whichever comes last): $\ddot{a}_{\overline{n}\\|} + v^n\,{_n}p_x\,\dd…” |
| The expected present value of an n-year certain-and-life continuous annuity equals the n-year annuity-certain a-bar_{n} plus the deferred w… | formula | tagged | Life Annuity: “**Guaranteed** for $n$ years (whichever comes last): $\ddot{a}_{\overline{n}\\|} + v^n\,{_n}p_x\,\dd…” |
| Under constant force of interest δ and constant force of mortality μ, the continuous whole life annuity has actuarial present value 1/(δ+μ)… | formula | tagged | Life Annuity: “under a constant force of mortality $\mu$, $\bar{a}_x = 1/(\mu + \delta)$” |
| The continuous annuity-certain for n years under constant force of interest δ has present value (1 - e^{-δn})/δ, and for a life annuity wit… | formula | tagged | Continuous Annuity: “$\bar{a}_{\overline{n}\\|} = \dfrac{1 - e^{-\delta n}}{\delta}$” |
| To find Pr(Y > E[Y]) for an annuity PV random variable, which is increasing in T, convert the event into a threshold on T by solving Y(T) =… | procedure | syllabus | Future Loss Random Variable (collapsed): “Solving $v^{K+1} > c$ gives an upper limit on $K$, and the answer is a death probability ${}_mq_x$,…” |

</details>

<details><summary><code>faml-5-02</code> · gap</summary>

Tagged pages: Life Annuity, Endowment Insurance, Pure Endowment, Annuity Immediate, Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The term insurance factor A^1_{x:n} is the actuarial present value of a pure endowment's complement; specifically, the pure endowment APV n… | fact | tagged | Pure Endowment: “${}_nE_x = A^{\phantom{x:}1}_{x:\overline{n}\\|} = v^n\,{}_np_x$” |
| Whole life insurance APV splits at time n into the n-year term insurance APV plus the n-year pure endowment APV times the whole life APV at… | fact | tagged | Pure Endowment: “and how a [[Whole Life Insurance\\|whole life]] value splits, $A_x = A^{1}_{x:\overline{n}\\|} + {}_n…” |
| The n-year endowment insurance APV equals the n-year term insurance APV plus the n-year pure endowment APV: A_{x:n} = A^1_{x:n} + nEx. | fact | tagged | Pure Endowment: “An [[Endowment Insurance\\|endowment insurance]] is a [[Term Life Insurance\\|term insurance]] plus a…” |
| For an n-year temporary annuity-due and endowment insurance, a¨_{x:n} = (1 - A_{x:n}) / d, where d = i/(1+i) is the discount rate. | formula | tagged | Endowment Insurance: “$$\ddot{a}_{x:\overline{n}\\|} = \frac{1 - A_{x:\overline{n}\\|}}{d}$$” |
| The n-year temporary life annuity-immediate relates to the annuity-due by a_{x:n} = a¨_{x:n} - 1 + nEx. | formula | missing |  |

</details>

<details><summary><code>faml-5-03</code> · gap</summary>

Tagged pages: Increasing Annuity, Continuous Annuity, Fractional Age Assumption, Life Table

| Item | Kind | Status | Where |
|---|---|---|---|
| The continuous increasing temporary annuity (Ia-bar)_{x:t} pays at annual rate s at time s while the life (x) survives, up to t years, and … | definition | tagged | Continuous Annuity: “A payment stream flowing at rate $f(t)$ at time $t$ is valued by integrating each instant's payment…” |
| By the Fundamental Theorem of Calculus, the derivative with respect to the upper limit t of an integral from 0 to t of a function equals th… | fact | missing |  |
| The pure endowment actuarial present value {}_n E_x = v^n · {}_n p_x, and survival probabilities multiply across consecutive periods: {}_{s… | definition | tagged | Life Table: “Survival probabilities **multiply** across periods: $_{s+t}p_x = {}_{s}p_x \cdot {}_{t}p_{x+s}$” |
| Under the uniform distribution of deaths (UDD) assumption within each year of age, {}_u q_x = u · q_x for 0 ≤ u ≤ 1, so {}_u p_x = 1 − u · … | fact | tagged | Fractional Age Assumption: “\text{UDD:}\quad {}_sq_x = s\,q_x” |
| Values of {}_n E_x (or p_x, q_x) for the Standard Ultimate Life Table at a given interest rate are obtained from the table; discount factor… | fact | tagged | Life Table: “_{t}p_x = \frac{\ell_{x+t}}{\ell_x}, \qquad _{t}q_x = 1 - {}_{t}p_x = \frac{\ell_x - \ell_{x+t}}{\e…” |

</details>

<details><summary><code>faml-5-04</code> · gap</summary>

Tagged pages: Continuous Annuity, Deferred Annuity, Life Annuity, Payable Continuously

| Item | Kind | Status | Where |
|---|---|---|---|
| Under a constant force of mortality mu, the complete expectation of life is 1/mu. | formula | missing |  |
| The present value of an n-year continuous annuity certain of 1 per year is (1 - e^{-delta n})/delta. | formula | tagged | Continuous Annuity: “$\bar{a}_{\overline{n}\\|} = \dfrac{1 - e^{-\delta n}}{\delta}$” |
| The actuarial present value of an n-year deferred continuous life annuity is the n-year pure endowment factor times the continuous life ann… | formula | tagged | Life Annuity: “**Guaranteed** for $n$ years (whichever comes last): $\ddot{a}_{\overline{n}\\|} + v^n\,{_n}p_x\,\dd…” |
| Under constant force mu and constant interest force delta, the pure endowment factor is nE_x = e^{-(mu+delta)n} and the continuous whole li… | formula | tagged | Life Annuity: “under a constant force of mortality $\mu$, $\bar{a}_x = 1/(\mu + \delta)$” |
| A life annuity payable for life from a deferral point plus an annuity certain for the deferral period equals the total APV as the sum of th… | fact | tagged | Life Annuity: “**Guaranteed** for $n$ years (whichever comes last): $\ddot{a}_{\overline{n}\\|} + v^n\,{_n}p_x\,\dd…” |

</details>

<details><summary><code>faml-5-05</code> · answerable</summary>

Tagged pages: Annuity Due, Extra Risk, Life Table

| Item | Kind | Status | Where |
|---|---|---|---|
| The annuity-due APV satisfies the one-year recursion ä_x = 1 + v p_x ä_{x+1}, i.e. a payment now plus the discounted, survival-weighted val… | formula | linked | Life Annuity: “\ddot{a}_x = 1 + v\,p_x\,\ddot{a}_{x+1}” |
| The one-year survival probability from a force of mortality is p_x = exp(-∫_0^1 μ_{x+t} dt). | formula | syllabus | Mortality: “{}_tp_x = \exp\!\left(-\int_0^t \mu_{x+s}\,ds\right)” |
| Adding a constant to the force of mortality over an interval multiplies the survival probability over that interval by e^(-constant × lengt… | fact | tagged | Extra Risk: “{}_tp^{*}_x = e^{-\theta t}\,{}_tp_x” |
| One-year survival probability from a life table is p_x = l_{x+1}/l_x; the Standard Ultimate Life Table gives l_x and annuity values ä_x use… | procedure | tagged | Life Table: “_{t}p_x = \frac{\ell_{x+t}}{\ell_x}” |
| If the substandard mortality equals standard mortality after the first year, the annuity value at the next age (ä_{x+1}) for a substandard … | fact | linked | Life Annuity: “**Recursion:** an annuity-due on $(x)$ is a payment of 1 now plus, if $(x)$ survives the year, an a…” |

</details>

<details><summary><code>faml-5-06</code> · gap</summary>

Tagged pages: Portfolio Percentile Principle, Normal Approximation, Annuity Due, Life Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| The expected present value of a whole life annuity-due equals (1 − A_x)/d, where A_x is the whole life insurance actuarial present value an… | formula | tagged | Life Annuity: “$$\ddot{a}_x = \frac{1 - A_x}{d}$$” |
| The variance of the present value of a whole life annuity-due equals (²A_x − (A_x)²)/d², where ²A_x is the second moment of the whole life … | formula | missing |  |
| For independent lives, the mean and variance of the aggregate present value of payments are the sums of the individual means and variances … | fact | tagged | Normal Approximation: “compute $E[S_n] = n\mu$ and $\text{Var}(S_n) = n\sigma^2$” |
| Using the normal approximation, the fund F needed to be p-percent certain of meeting the payments is the p-th percentile of the aggregate p… | procedure | tagged | Normal Approximation: “Inverted, it sets a fund: the total exceeded with probability $\alpha$ is about $n\mu + z_{1-\alpha…” |

</details>

<details><summary><code>faml-5-07</code> · answerable</summary>

Tagged pages: Woolhouse's Formula, Annuity Due, Endowment Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| The two-term Woolhouse approximation for a temporary annuity-due payable m times per year is ä^(m)_{x:n} ≈ ä_{x:n} − ((m−1)/(2m))(1 − v^n·_… | formula | tagged | Woolhouse's Formula: “\ddot{a}^{(m)}_{x:\overline{n}\\|} \approx {} & \ddot{a}_{x:\overline{n}\\|} - \frac{m-1}{2m}\left(1 …” |
| The temporary annuity-due equals one minus the endowment insurance APV divided by d: ä_{x:n} = (1 − A_{x:n})/d, where d = i/(1+i). | formula | tagged | Endowment Insurance: “\ddot{a}_{x:\overline{n}\\|} = \frac{1 - A_{x:\overline{n}\\|}}{d}” |
| The endowment insurance APV equals the term insurance APV plus the pure endowment APV: A_{x:n} = A^1_{x:n} + nE_x. | fact | tagged | Endowment Insurance: “A_{x:\overline{n}\\|} = A^{1}_{x:\overline{n}\\|} + {}_nE_x” |
| The pure endowment actuarial present value is nE_x = v^n · _n p_x. | formula | linked | Pure Endowment: “{}_nE_x = A^{\phantom{x:}1}_{x:\overline{n}\\|} = v^n\,{}_np_x” |
| The term insurance APV can be obtained from whole life values: A^1_{x:n} = A_x − nE_x · A_{x+n}. | formula | linked | Pure Endowment: “A_x = A^{1}_{x:\overline{n}\\|} + {}_nE_x\,A_{x+n}” |

</details>

<details><summary><code>faml-5-08</code> · gap</summary>

Tagged pages: Life Annuity, Annuity Due, Life Table

| Item | Kind | Status | Where |
|---|---|---|---|
| The expected present value of an n-year certain-and-life annuity-due of 1 per year is the n-year annuity-certain due plus the deferred life… | formula | tagged | Life Annuity: “**Guaranteed** for $n$ years (whichever comes last): $\ddot{a}_{\overline{n}\\|} + v^n\,{_n}p_x\,\dd…” |
| The actuarial present value of a pure endowment is {}_nE_x = v^n · {}_np_x = v^n l_{x+n}/l_x. | formula | syllabus | Pure Endowment: “$${}_nE_x = A^{\phantom{x:}1}_{x:\overline{n}\\|} = v^n\,{}_np_x$$” |
| Under a certain-and-life annuity-due, payments are made for sure during the certain period and thereafter at each anniversary the annuitant… | fact | tagged | Life Annuity: “**Guaranteed** for $n$ years (whichever comes last): $\ddot{a}_{\overline{n}\\|} + v^n\,{_n}p_x\,\dd…” |
| The probability that (x) survives n years is {}_np_x = l_{x+n}/l_x, computed from life table values. | formula | tagged | Life Table: “$$_{t}p_x = \frac{\ell_{x+t}}{\ell_x}, \qquad _{t}q_x = 1 - {}_{t}p_x = \frac{\ell_x - \ell_{x+t}}{…” |
| To find the probability that the total undiscounted payments of a life annuity-due exceed a given amount, determine the smallest number of … | procedure | missing |  |

</details>

<details><summary><code>faml-5-09</code> · answerable</summary>

Tagged pages: Life Annuity, Annuity Due, Life Table

| Item | Kind | Status | Where |
|---|---|---|---|
| For a select life with a one-year select period, the temporary annuity-due satisfies the recursion ä_[x]:n\| = 1 + v · p_[x] · ä_{x+1}:n-1\… | formula | syllabus | Standard Actuarial Notation (collapsed): “The annuity-due pays at times 0 and 1, so $\ddot{a}_{[60]:\overline{2}\\|} = 1 + v(79{,}000/80{,}000…” |
| The ultimate temporary annuity-due satisfies the recursion ä_x:n\| = 1 + v · p_x · ä_{x+1}:n-1\|. | formula | tagged | Life Annuity: “**Recursion:** an annuity-due on $(x)$ is a payment of 1 now plus, if $(x)$ survives the year, an a…” |
| Under a one-year select period, the select and ultimate annuity values ä_[x]:n\| and ä_x:n\| share the same continuation value ä_{x+1}:n-1\… | fact | syllabus | Standard Actuarial Notation: “After the select period ends the brackets drop and the ultimate rate $q_{x+t}$ applies.” |

</details>

<details><summary><code>faml-5-10</code> · untagged</summary>

Tagged pages: Life Annuity, Annuity Due, Life Table

| Item | Kind | Status | Where |
|---|---|---|---|
| The EPV of an n-year certain and life annuity-due equals the n-year annuity-certain due plus the deferred life annuity: ä_{x:n}(certain and… | formula | tagged | Life Annuity: “**Guaranteed** for $n$ years (whichever comes last): $\ddot{a}_{\overline{n}\\|} + v^n\,{_n}p_x\,\dd…” |
| The pure endowment (actuarial discount factor) nE_x equals v^n · n p_x, used to discount a deferred life annuity. | formula | syllabus | Pure Endowment: “${}_nE_x = A^{\phantom{x:}1}_{x:\overline{n}\\|} = v^n\,{}_np_x$” |
| For an annuity-due with level payments, the undiscounted total of payments is the payment amount times the number of payments made, so exce… | procedure | elsewhere | Types of Annuities (collapsed): “The period certain option pays \$112,800 in total, the full 120 payments, because death fell inside…” |
| Under a certain and life annuity-due, the k-th payment is made at time k−1 if the annuitant is alive then (or is guaranteed in the certain … | fact | tagged | Life Annuity: “**Guaranteed** for $n$ years (whichever comes last): $\ddot{a}_{\overline{n}\\|} + v^n\,{_n}p_x\,\dd…” |
| The probability of surviving t years from age x is t p_x = l_{x+t}/l_x, evaluated using life table values. | formula | tagged | Life Table: “_{t}p_x = \frac{\ell_{x+t}}{\ell_x}, \qquad _{t}q_x = 1 - {}_{t}p_x = \frac{\ell_x - \ell_{x+t}}{\e…” |

</details>

<details><summary><code>faml-5-11</code> · answerable</summary>

Tagged pages: Life Annuity, Variance and Standard Deviation, Annuity Due

| Item | Kind | Status | Where |
|---|---|---|---|
| A temporary (n-year) life annuity due pays a fixed amount at the start of each year while the annuitant is alive, for at most n years, so i… | definition | tagged | Life Annuity: “**Temporary** annuity (pays until death or $n$ years, whichever comes first): $\ddot{a}_{x:\overlin…” |
| The present value of an n-year temporary life annuity due equals the accumulated-discount annuity-certain a-double-dot over K+1 years if de… | fact | syllabus | Future Loss Random Variable: “For an $n$-year [[Term Life Insurance\\|term insurance]], $L_0 = S\,v^{K_x+1}\,\mathbb{1}\{K_x < n\}…” |
| The probability of surviving k full years is the product of the one-year survival probabilities, kp_x = p_x · p_{x+1} · ... · p_{x+k-1}, an… | formula | syllabus | Future Lifetime Random Variable: “so ${}_tp_x = S_0(x+t)/S_0(x)$ and ${}_{t+u}p_x = {}_tp_x\,{}_up_{x+t}$.” |
| For a discrete random variable X, E[X] = Σ x·P(x) and E[X²] = Σ x²·P(x), so Var(X) = E[X²] − (E[X])², and the standard deviation is the squ… | formula | tagged | Variance and Standard Deviation: “- $\mu = E[X]$. The second form $E[X^2] - \mu^2$ is the one to use in practice — it needs only two …” |
| Subtracting a constant from a random variable does not change its variance, so a guaranteed first payment can be removed before computing t… | fact | tagged | Variance and Standard Deviation: “$\text{Var}(aX + b) = a^2\,\text{Var}(X)$ and $\text{SD}(aX + b) = \\|a\\|\,\text{SD}(X)$ — a shift $…” |

</details>

<details><summary><code>faml-5-12</code> · answerable</summary>

Tagged pages: Deferred Annuity, Annuity Due, Life Annuity, Life Table

| Item | Kind | Status | Where |
|---|---|---|---|
| A life annuity with a benefit that changes at a given age can be decomposed into a temporary life annuity-due paying the initial benefit pl… | procedure | tagged | Life Annuity: “**Temporary** annuity (pays until death or $n$ years, whichever comes first): $\ddot{a}_{x:\overlin…” |
| The actuarial present value of an n-year deferred whole life annuity-due is n\|ä_x = v^n · {}_np_x · ä_{x+n} = {}_nE_x · ä_{x+n}, where {}_… | formula | syllabus | Pure Endowment: “That is how a deferred annuity is valued, ${}_{n\\|}\ddot{a}_x = {}_nE_x\,\ddot{a}_{x+n}$” |
| The n-year temporary life annuity-due has actuarial present value ä_{x:n\|} = ä_x − {}_nE_x · ä_{x+n}, i.e., the sum of v^k·kp_x for k = 0 … | formula | tagged | Life Annuity: “$\ddot{a}_{x:\overline{n}\\|} = \ddot{a}_x - v^n\,{_n}p_x\,\ddot{a}_{x+n}$” |
| The present value of a level-benefit life annuity-due equals the benefit amount times the corresponding annuity factor, so annuity values s… | definition | tagged | Life Annuity: “A **life-annuity-due** pays 1 at the start of each year while $(x)$ is alive; its actuarial present…” |

</details>

<details><summary><code>faml-5-13</code> · answerable</summary>

Tagged pages: Woolhouse's Formula, Annuity Due, Life Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| The three-term Woolhouse approximation for a temporary m-thly life annuity due is ä^(m)_{x:n} ≈ ä_{x:n} − (m−1)/(2m)(1 − nEx) − (m²−1)/(12m… | formula | tagged | Woolhouse's Formula: “\ddot{a}^{(m)}_{x:\overline{n}\\|} \approx {} & \ddot{a}_{x:\overline{n}\\|} - \frac{m-1}{2m}\left(1 …” |
| The survival probability from the force of mortality is tpx = exp(−∫_0^t μ_{x+s} ds). | formula | linked | Hazard Rate: “S(t) = \exp\!\left(-\int_0^t \mu(s)\,ds\right)” |
| The pure endowment actuarial present value is nEx = v^n · npx, the discount factor times the survival probability. | definition | tagged | Woolhouse's Formula: “${}_nE_x = v^n\,{}_np_x$” |
| The force of interest is δ = ln(1+i). | definition | linked | Force of Interest: “\delta = \ln(1+i)” |

</details>

<details><summary><code>faml-6-01</code> · gap</summary>

Tagged pages: Equivalence Principle, Term Life Insurance, Premium

| Item | Kind | Status | Where |
|---|---|---|---|
| Under the equivalence principle, the level net premium is set so that the actuarial present value of premiums equals the actuarial present … | procedure | tagged | Equivalence Principle: “**The Equivalence Principle** sets a [[Insurance Premium\\|premium]] so that the expected present va…” |
| For a return-of-premiums death benefit without interest, the benefit in year k is the face amount plus the cumulative premiums paid (k time… | formula | missing |  |
| The APV of an n-year term insurance paying 1 at the end of the year of death is the sum over k of v^(k+1) times k_p_x times q_(x+k). | formula | tagged | Term Life Insurance: “$$A^{1}_{x:\overline{n}\\|} = \sum_{k=0}^{n-1} v^{k+1}\,{}_kp_x\,q_{x+k}$$” |
| The APV of an n-year increasing term insurance paying k+1 if death occurs in year k+1 is the sum over k of (k+1) v^(k+1) times k_p_x times … | formula | tagged | Term Life Insurance: “its EPV is $\sum_{k=0}^{n-1} b_{k+1}\,v^{k+1}\,{}_kp_x\,q_{x+k}$ for a benefit $b_{k+1}$ on death i…” |
| The APV of an n-year temporary life annuity-due of 1 per year is the sum over k=0 to n-1 of v^k times k_p_x, with premiums paid at the star… | formula | linked | Life Annuity: “$$\ddot{a}_x = \sum_{k=0}^{\infty} v^k\,{_k}p_x$$” |
| Survival and mortality probabilities (p_x, q_x) for ages beyond the first are read from the given life table, here the Standard Ultimate Li… | fact | linked | Future Lifetime Random Variable: “${}_{t+u}p_x = {}_tp_x\,{}_up_{x+t}$” |

</details>

<details><summary><code>faml-6-02</code> · gap</summary>

Tagged pages: Equivalence Principle, Expenses, Term Life Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| Under the equivalence principle, set the expected present value of gross premiums equal to the expected present value of benefits plus expe… | procedure | tagged | Equivalence Principle: “the expected present value (EPV) of the premiums equals the EPV of the benefits, plus the EPV of th…” |
| A death benefit that returns all gross premiums paid without interest equals a benefit of G times the number of years elapsed (k+1 in year … | fact | missing |  |
| The actuarial present value of a level n-year term insurance of amount B is B times A^1_{x:n\|}. | formula | tagged | Term Life Insurance: “$$A^{1}_{x:\overline{n}\\|} = \sum_{k=0}^{n-1} v^{k+1}\,{}_kp_x\,q_{x+k}$$” |
| Expenses given as a percentage of gross premium (first-year vs. renewal rates) and per-policy amounts are included as an annuity-due: per-p… | procedure | tagged | Equivalence Principle (collapsed): “Equate the EPV of gross premiums to the EPV of benefits plus expenses. Renewal expenses run over $\…” |

</details>

<details><summary><code>faml-6-03</code> · error</summary>

Error: ValueError: no usable 'found' list in the reply

</details>

<details><summary><code>faml-6-04</code> · gap</summary>

Tagged pages: Portfolio Percentile Principle, Normal Approximation, Life Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| The expected present value of a whole life annuity-due payable m times per year (of 1 per year) is ä^(m)_x = (1 − A^(m)_x) / d^(m), where d… | formula | missing |  |
| The variance of the present value of a whole life annuity-due payable m times per year (of 1 per year) is Var = (²A^(m)_x − (A^(m)_x)²) / (… | formula | missing |  |
| The nominal discount rate convertible m-thly is d^(m) = m[1 − (1 − d)^(1/m)] = m[1 − (1+i)^(−1/m)], where d = i/(1+i). | formula | elsewhere | Nominal Discount Rate: “d^{(m)} = m\left[1 - v^{1/m}\right]” |
| For a portfolio of independent lives, the mean of the total present value is the sum of the individual means and the variance is the sum of… | fact | tagged | Portfolio Percentile Principle: “and the losses are independent and identically distributed, so $E[L] = N\,E[L_0]$ and $\text{SD}(L)…” |
| To find a single premium by the normal approximation so that the total premium covers aggregate payments with probability p, set the total … | procedure | tagged | Portfolio Percentile Principle: “N\,E[L_0] + z_{\alpha}\sqrt{N}\,\text{SD}(L_0) = 0” |

</details>

<details><summary><code>faml-6-05</code> · answerable</summary>

Tagged pages: Equivalence Principle, Whole Life Insurance, Life Table

| Item | Kind | Status | Where |
|---|---|---|---|
| The net premium for a fully discrete whole life insurance of amount b on (x) is b·A_x / ä_x, so the net premium per unit of benefit is P_x … | formula | tagged | Whole Life Insurance: “$$P = \frac{A_x}{\ddot{a}_x}$$” |
| The expected present value at issue of the premium paid at the start of policy year k is the premium times v^(k-1) times the probability of… | procedure | tagged | Whole Life Insurance: “a premium $P$ paid at the start of each year while $(x)$ is alive is a [[Life Annuity\\|life-annuity…” |
| The expected present value at issue of the death benefit for policy year k in a fully discrete insurance is the benefit times v^k times _{k… | procedure | tagged | Whole Life Insurance: “$$A_x = \sum_{k=0}^{\infty} v^{k+1}\,{_k}p_x\,q_{x+k}$$” |
| For a standard mortality table such as the Standard Ultimate Life Table, the mortality rate q_x increases with age x at older ages, so the … | fact | linked | Term Life Insurance: “The decreasing cover costs about a third less, because the sum falls just as the probability of dea…” |

</details>

<details><summary><code>faml-6-06</code> · answerable</summary>

Tagged pages: Portfolio Percentile Principle, Future Loss Random Variable, Normal Approximation, Expenses

| Item | Kind | Status | Where |
|---|---|---|---|
| For a fully discrete whole life insurance, the net premium by the equivalence principle is P = (face amount × A_x) / ä_x. | formula | linked | Equivalence Principle: “Setting $E[L_0]=0$ gives $P = S\,A_x/\ddot{a}_x$.” |
| The loss at issue random variable for a fully discrete whole life policy with expenses is L = (face)·v^{K+1} + initial expenses − (G − per-… | formula | tagged | Future Loss Random Variable: “The net loss counts benefits and net premiums, and the gross loss adds expenses and uses the gross …” |
| The present value of an annuity-due over K+1 years is ä_{K+1} = (1 − v^{K+1})/d, where d = i/(1+i), which lets the loss be written as a lin… | formula | tagged | Future Loss Random Variable: “The second block uses $\ddot{a}_{\overline{k}\\|} = (1 - v^k)/d$, which makes the loss a linear func…” |
| E[v^{K+1}] = A_x and Var(v^{K+1}) = ²A_x − (A_x)², where ²A_x is computed at doubled force of interest; for L = a·v^{K+1} + b, E(L) = a·A_x… | fact | tagged | Future Loss Random Variable: “$$\text{Var}(L_0) = \left(S + \frac{P}{d}\right)^2\left({}^2A_x - A_x^2\right)$$” |
| For independent identical policies, the aggregate loss has mean and variance equal to the number of policies times the per-policy mean and … | fact | tagged | Portfolio Percentile Principle: “the losses are independent and identically distributed, so $E[L] = N\,E[L_0]$ and $\text{SD}(L) = \…” |
| Using the normal approximation, Pr(S < s) ≈ Φ((s − E[S]) / SD(S)), where the standard deviation is the square root of the variance. | procedure | tagged | Normal Approximation: “$$P(S_n \le s) \approx \Phi\!\left(\frac{s - n\mu}{\sigma\sqrt{n}}\right)$$” |

</details>

<details><summary><code>faml-6-07</code> · gap</summary>

Tagged pages: Equivalence Principle, Endowment Insurance, Pure Endowment

| Item | Kind | Status | Where |
|---|---|---|---|
| The actuarial present value of an n-year pure endowment of 1 on (x) is nEx = v^n · npx. | formula | tagged | Pure Endowment: “$${}_nE_x = A^{\phantom{x:}1}_{x:\overline{n}\\|} = v^n\,{}_np_x$$” |
| Under the equivalence principle, the net premium is set so that the expected present value of premiums equals the expected present value of… | fact | tagged | Equivalence Principle: “the expected present value (EPV) of the premiums equals the EPV of the benefits, plus the EPV of th…” |
| The expected present value of an n-year fully discrete premium stream of 1 per year is the temporary life annuity-due a¨_{x:n} (payments at… | formula | linked | Life Annuity: “**Temporary** annuity (pays until death or $n$ years, whichever comes first): $\ddot{a}_{x:\overlin…” |
| The accumulated value at the end of n years of an n-year annuity-due of 1 at interest i is s¨_{n\|} = ((1+i)^n − 1)/d, and a¨_{n\|} = (1 − … | formula | elsewhere | Annuity Due: “$$\ddot{s}_{\overline{n}\\|} = (1+i)\,s_{\overline{n}\\|}$$ … $$= \frac{(1+i)^n - 1}{d}$$” |
| A death benefit equal to the premiums accumulated with interest at the valuation rate, paid at the end of the year of death, has present va… | fact | missing |  |
| Equation of value at time n: if premium accumulations at the valuation interest rate fund the return-of-premium death benefits, then the pr… | procedure | missing |  |

</details>

<details><summary><code>faml-6-08</code> · gap</summary>

Tagged pages: Expenses, Equivalence Principle, Annuity Due

| Item | Kind | Status | Where |
|---|---|---|---|
| The actuarially equivalent level annual amount for a payment stream is the amount whose present value as a payable-at-start-of-year annuity… | definition | tagged | Equivalence Principle: “Setting $E[L_0]=0$ gives $P = S\,A_x/\ddot{a}_x$.” |
| The whole life annuity-due ä_x pays 1 at the start of each year while (x) is alive, and the temporary annuity-due ä_{x:n} pays 1 at the sta… | definition | linked | Life Annuity: “A **life-annuity-due** pays 1 at the start of each year while $(x)$ is alive; its actuarial present…” |
| A payment stream that is level over different durations (e.g., amounts changing at certain years) is decomposed into a sum of level tempora… | procedure | missing |  |
| Annuity-due values such as ä_{x:n} and ä_x for a given age are obtained from the Standard Ultimate Life Table at the stated interest rate. | fact | tagged | Equivalence Principle (collapsed): “Using the Standard Ultimate Life Table at $i = 5\%$ ($A_{50} = 0.18931$, ${}^2\!A_{50} = 0.05108$, …” |

</details>

<details><summary><code>faml-6-09</code> · answerable</summary>

Tagged pages: Equivalence Principle, Expenses, Term Life Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| Under the equivalence principle, the gross premium is set so that the APV of premiums equals the APV of benefits plus the APV of expenses. | fact | tagged | Equivalence Principle: “the expected present value (EPV) of the premiums equals the EPV of the benefits, plus the EPV of th…” |
| The APV of a fully discrete n-year term insurance benefit is the benefit amount times A^1_{x:n}, where A^1_{x:n} = A_{x:n} - nE_x (endowmen… | formula | linked | Endowment Insurance: “A_{x:\overline{n}\\|} = A^{1}_{x:\overline{n}\\|} + {}_nE_x” |
| A temporary annuity-due a-double-dot_{x:n} is the APV of payments of 1 at the start of each year for up to n years while the insured (x) su… | definition | linked | Life Annuity: “**Temporary** annuity (pays until death or $n$ years, whichever comes first): $\ddot{a}_{x:\overlin…” |
| Expenses incurred at the start of each policy year are valued as the APV of annuity-due payments: percent-of-premium expenses are a percent… | procedure | tagged | Equivalence Principle (collapsed): “Renewal expenses run over $\ddot{a}_{45:\overline{20}\\|} - 1$, because the first year carries the i…” |
| Values of A_{x:n}, nE_x and a-double-dot_{x:n} for a given mortality table and interest rate are obtained from the illustrative life table … | fact | tagged | Term Life Insurance (collapsed): “On the SULT at $5\%$, $A_{50} = 0.18931$, $A_{60} = 0.29028$, ${}^2A_{50} = 0.05108$, ${}^2A_{60} =…” |

</details>

<details><summary><code>faml-6-10</code> · answerable</summary>

Tagged pages: Equivalence Principle, Term Life Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| The level annual net premium for a fully discrete insurance equals the actuarial present value of the death benefit divided by the temporar… | formula | tagged | Equivalence Principle: “Setting $E[L_0]=0$ gives $P = S\,A_x/\ddot{a}_x$.” |
| The n-year temporary life annuity-due is the sum of v^k times k-year survival probability for k=0,...,n-1, with k-year survival being the p… | formula | linked | Life Annuity: “$$\ddot{a}_x = \sum_{k=0}^{\infty} v^k\,{_k}p_x$$” |
| The actuarial present value of a fully discrete n-year term insurance is the sum over years k of benefit times v^(k+1) times the probabilit… | formula | tagged | Term Life Insurance: “$$A^{1}_{x:\overline{n}\\|} = \sum_{k=0}^{n-1} v^{k+1}\,{}_kp_x\,q_{x+k}$$” |
| The one-year survival and death probabilities are complements: p_x = 1 - q_x. | fact | linked | Future Lifetime Random Variable: “${}_tq_x = 1 - {}_tp_x$ is the probability that $(x)$ dies within $t$ years … When $t = 1$ the subs…” |

</details>

<details><summary><code>faml-6-11</code> · answerable</summary>

Tagged pages: Future Loss Random Variable, Whole Life Insurance, Extra Risk

| Item | Kind | Status | Where |
|---|---|---|---|
| The net premium for a fully discrete whole life insurance is P = A_x / ä_x, from the equivalence principle (expected PV of premiums equals … | formula | tagged | Whole Life Insurance: “$$P = \frac{A_x}{\ddot{a}_x}$$” |
| The one-year recursion for whole life insurance is A_x = v q_x + v p_x A_{x+1}. | formula | tagged | Whole Life Insurance: “$$A_x = v\,q_x + v\,p_x\,A_{x+1}$$” |
| The whole life annuity-due and insurance are related by ä_x = (1 - A_x)/d, where d = i/(1+i). | formula | tagged | Whole Life Insurance: “since $\ddot{a}_x = (1 - A_x)/d$, $P$ follows from $A_x$ and $d$ alone” |
| The loss at issue random variable for a fully discrete whole life insurance is L = v^(K+1) - P ä_{K+1}, and its expected value is A_x - P ä… | definition | tagged | Future Loss Random Variable: “$$L_0 = S\,v^{K_x+1} - P\,\ddot{a}_{\overline{K_x+1}\\|}$$” |
| When a life's mortality differs from the pricing basis (e.g., a changed first-year mortality rate), recompute A_x and ä_x under the altered… | procedure | tagged | Future Loss Random Variable: “$$L_0 = S\,v^{K_x+1} - P\,\ddot{a}_{\overline{K_x+1}\\|}$$” |

</details>

<details><summary><code>faml-6-12</code> · answerable</summary>

Tagged pages: Future Loss Random Variable, Variance, Expenses, Whole Life Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| For a whole life insurance, A_x = 1 - d * a-due_x, where d = i/(1+i) is the discount rate. | formula | tagged | Whole Life Insurance: “since $\ddot{a}_x = (1 - A_x)/d$, $P$ follows from $A_x$ and $d$ alone” |
| Under the equivalence principle, the gross premium is set so that the expected present value of premiums equals the expected present value … | procedure | linked | Equivalence Principle: “the expected present value (EPV) of the premiums equals the EPV of the benefits, plus the EPV of th…” |
| The loss at issue random variable is the present value of benefits and expenses minus the present value of gross premiums, written as a fun… | definition | tagged | Future Loss Random Variable: “is the present value, at time $t$, of the insurer's future outgo less the present value of its futu…” |
| The present value of a whole life annuity-due of 1 as a random variable is Y = (1 - v^(K+1))/d, so Y is a linear function of Z = v^(K+1). | formula | tagged | Future Loss Random Variable: “The second block uses $\ddot{a}_{\overline{k}\\|} = (1 - v^k)/d$, which makes the loss a linear func…” |
| Var(aZ + b) = a^2 Var(Z), and for Z = v^(K+1) in a whole life insurance, Var(Z) = 2A_x - (A_x)^2. | fact | tagged | Variance: “$\text{Var}(aX + b) = a^2 \text{Var}(X)$ — scaling changes variance, shifts do not” |

</details>

<details><summary><code>faml-6-13</code> · gap</summary>

Tagged pages: Future Loss Random Variable, Expenses, Whole Life Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| The curtate future lifetime K_x is the integer part of the time-until-death T_x, so a death at time T falls in policy year K+1 and, for a f… | definition | tagged | Whole Life Insurance: “the benefit is paid at the **end of the year of death**” |
| The loss at issue for a fully discrete whole life insurance is the present value of the death benefit, b·v^(K+1), minus the present value o… | formula | tagged | Future Loss Random Variable: “$L_0 = S\,v^{K_x+1} - P\,\ddot{a}_{\overline{K_x+1}\\|}$” |
| Commissions that are a higher percentage of the first-year premium and a lower percentage of renewal premiums are modeled as a renewal perc… | procedure | missing |  |
| The annuity-due certain is ä_{n\|} = (1 − v^n)/d, where d = i/(1+i) and v = 1/(1+i). | formula | tagged | Whole Life Insurance: “- $v = 1/(1+i)$: a death in year $k+1$ (survive $k$ years, probability ${_k}p_x$, then die, $q_{x+k…” |
| The expected loss at issue is obtained by taking expectations term by term: E[b·v^(K+1)] = b·A_x and E[ä_{K+1}] = ä_x, with the constant ex… | fact | tagged | Whole Life Insurance: “$A_x = \sum_{k=0}^{\infty} v^{k+1}\,{_k}p_x\,q_{x+k}$” |
| Whole life insurance and whole life annuity-due values at a given age and interest rate (A_x, ä_x) are taken from the Standard Ultimate Lif… | fact | tagged | Future Loss Random Variable (collapsed): “On the SULT at $5\%$, $A_{45:\overline{20}\\|} = 0.38385$, ${}^2A_{45:\overline{20}\\|} = 0.14937$ an…” |

</details>

<details><summary><code>faml-6-14</code> · no requirements</summary>

Tagged pages: Equivalence Principle, Whole Life Insurance, Deferred Annuity

| Item | Kind | Status | Where |
|---|---|---|---|

</details>

<details><summary><code>faml-6-15</code> · gap</summary>

Tagged pages: Woolhouse's Formula, Fractional Age Assumption, Equivalence Principle, Whole Life Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| The 2-term Woolhouse approximation for the m-thly annuity-due is ä_x^(m) ≈ ä_x − (m−1)/(2m), so the first-order term is subtracted with no … | formula | tagged | Woolhouse's Formula: “The first block is the three-term formula, and dropping its last term gives the two-term formula $\…” |
| Under UDD, the m-thly annuity-due is ä_x^(m) = α(m)·ä_x − β(m), where α(m) = i·d/(i^(m)·d^(m)) and β(m) = (i − i^(m))/(i^(m)·d^(m)). | formula | missing |  |
| For a whole life insurance, A_x = 1 − d·ä_x, where d = i/(1+i) is the effective annual discount rate. | formula | tagged | Whole Life Insurance: “since $\ddot{a}_x = (1 - A_x)/d$, $P$ follows from $A_x$ and $d$ alone” |
| The annualized net premium for a fully discrete whole life insurance with m-thly premiums equals the face amount times A_x divided by ä_x^(… | procedure | tagged | Woolhouse's Formula (collapsed): “P &= \frac{24{,}000(1.42857)}{14.32745}” |

</details>

<details><summary><code>faml-6-16</code> · answerable</summary>

Tagged pages: Equivalence Principle, Expenses, Endowment Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| For an endowment insurance, the level annual net premium satisfies P = 1/ä − d, where ä is the temporary annuity-due factor over the same t… | formula | tagged | Endowment Insurance: “It follows that the net annual premium per unit is $A_{x:\overline{n}\\|}/\ddot{a}_{x:\overline{n}\\|…” |
| The endowment insurance actuarial present value satisfies A = 1 − d·ä, relating the insurance APV to the temporary annuity-due APV. | formula | tagged | Endowment Insurance: “$$\ddot{a}_{x:\overline{n}\\|} = \frac{1 - A_{x:\overline{n}\\|}}{d}$$” |
| The equivalence principle sets the actuarial present value of gross premiums equal to the actuarial present value of benefits plus expenses… | definition | tagged | Equivalence Principle: “the expected present value (EPV) of the premiums equals the EPV of the benefits, plus the EPV of th…” |
| To compute the gross premium, write the APV of expenses as first-year and renewal-year percent-of-premium and per-policy amounts, with the … | procedure | tagged | Equivalence Principle (collapsed): “Renewal expenses run over $\ddot{a}_{45:\overline{20}\\|} - 1$, because the first year carries the i…” |

</details>

<details><summary><code>faml-6-17</code> · answerable</summary>

Tagged pages: Future Loss Random Variable, Endowment Insurance, Equivalence Principle, Survival Model

| Item | Kind | Status | Where |
|---|---|---|---|
| With a constant force of mortality mu, the one-year death probability is q = 1 - e^{-mu} and the one-year survival probability is p = e^{-m… | formula | tagged | Survival Model: “Suppose $S(t) = e^{-0.02t}$ for $t \geq 0$ (constant force of mortality).” |
| The equivalence principle sets the expected present value of premiums equal to the expected present value of benefits at issue, which deter… | procedure | tagged | Equivalence Principle: “the expected present value (EPV) of the premiums equals the EPV of the benefits, plus the EPV of th…” |
| For a fully discrete two-year endowment insurance, the EPV of benefits is the death benefit times v*q_x plus the death benefit times v^2*p_… | formula | tagged | Endowment Insurance: “$$A_{x:\overline{n}\\|} = A^{1}_{x:\overline{n}\\|} + {}_nE_x$$” |
| Premiums of a fully discrete policy are paid at the start of each year while the insured is alive, so the EPV of two annual premiums P is P… | formula | linked | Whole Life Insurance: “a premium $P$ paid at the start of each year while $(x)$ is alive is a [[Life Annuity\\|life-annuity…” |
| The loss at issue random variable is the present value of benefits minus the present value of premiums, and its expected value is the EPV o… | definition | tagged | Future Loss Random Variable: “is the present value, at time $t$, of the insurer's future outgo less the present value of its futu…” |

</details>

<details><summary><code>faml-6-18</code> · answerable</summary>

Tagged pages: Deferred Annuity, Equivalence Principle, Term Life Insurance, Life Table

| Item | Kind | Status | Where |
|---|---|---|---|
| A deferred whole life annuity-due with deferral period n pays a benefit at the start of each year starting at time n while the annuitant is… | definition | tagged | Deferred Annuity: “A **deferred annuity** ${}_{k\\|}a_{\overline{n}\\|}$ is an [[Annuity Immediate\\|annuity-immediate]] …” |
| The n-year term insurance A^1_{x:n} pays 1 at the end of the year of death if death occurs within n years, and its actuarial present value … | definition | tagged | Term Life Insurance: “**Term Life Insurance** pays a sum insured if the insured dies within a fixed term of $n$ years, an…” |
| For a single-premium contract with a return-of-premium death benefit, apply the equivalence principle: set the premium equal to the expecte… | procedure | tagged | Equivalence Principle: “the expected present value (EPV) of the premiums equals the EPV of the benefits, plus the EPV of th…” |
| Values of n\|ä_x and A^1_{x:n} are obtained from the Standard Ultimate Life Table at the given interest rate (e.g., via tabulated whole lif… | fact | tagged | Term Life Insurance: “$$A_x = A^{1}_{x:\overline{n}\\|} + {}_nE_x\,A_{x+n}$$” |

</details>

<details><summary><code>faml-6-19</code> · answerable</summary>

Tagged pages: Future Loss Random Variable, Whole Life Insurance, Expenses, Equivalence Principle

| Item | Kind | Status | Where |
|---|---|---|---|
| The gross loss-at-issue random variable L0 is the present value of future benefits plus expenses minus the present value of gross premiums,… | definition | tagged | Future Loss Random Variable: “**The Future Loss Random Variable** ${}_tL$ of a long-term insurance or annuity is the present valu…” |
| Under the equivalence principle, the gross premium is set so that the expected present value of premiums equals the expected present value … | formula | tagged | Equivalence Principle: “$$\text{EPV(premiums)} = \text{EPV(benefits)} + \text{EPV(expenses)}$$” |
| For a fully discrete whole life insurance, the annuity-due present value is ä_{K+1} = (1 − v^{K+1})/d, so the loss can be written as a line… | formula | tagged | Future Loss Random Variable: “The second block uses $\ddot{a}_{\overline{k}\\|} = (1 - v^k)/d$, which makes the loss a linear func…” |
| Adding a constant does not change variance, and Var[aX + b] = a²Var[X]; hence the variance of the loss equals (1 + G/d)² times the variance… | fact | tagged | Future Loss Random Variable: “\text{Var}(L_0) = \left(S + \frac{P}{d}\right)^2\left({}^2A_x - A_x^2\right)” |
| The variance of the present value of a whole life insurance of 1 is Var[Z] = ²A_x − (A_x)², where ²A_x is the EPV computed at the doubled f… | formula | tagged | Whole Life Insurance: “the second moment ${}^2\!A_x$ of the present value is $A_x$ at discount factor $v^2$ (double the fo…” |
| The expected present value of a whole life annuity-due and insurance are related by A_x = 1 − d·ä_x, and values for A_x, ²A_x, ä_x are read… | fact | tagged | Whole Life Insurance: “since $\ddot{a}_x = (1 - A_x)/d$, $P$ follows from $A_x$ and $d$ alone” |

</details>

<details><summary><code>faml-6-20</code> · no requirements</summary>

Tagged pages: Equivalence Principle, Term Life Insurance, Life Table

| Item | Kind | Status | Where |
|---|---|---|---|

</details>

<details><summary><code>faml-6-21</code> · answerable</summary>

Tagged pages: Equivalence Principle, Endowment Insurance, Pure Endowment, Term Life Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| Under the equivalence principle for a special endowment insurance, set the actuarial present value of net premiums (P times the temporary a… | procedure | tagged | Equivalence Principle: “$$\text{EPV(premiums)} = \text{EPV(benefits)} + \text{EPV(expenses)}$$” |
| An n-year endowment insurance is the sum of an n-year term insurance and an n-year pure endowment, so the term insurance APV equals the end… | fact | tagged | Endowment Insurance: “$$A_{x:\overline{n}\\|} = A^{1}_{x:\overline{n}\\|} + {}_nE_x$$” |
| In the endowment insurance notation, A with 1 above the age and over the term (A^1_{x:n}) denotes the term insurance, and A with 1 above th… | fact | tagged | Pure Endowment: “$${}_nE_x = A^{\phantom{x:}1}_{x:\overline{n}\\|} = v^n\,{}_np_x$$” |
| The endowment benefit equal to the sum of premiums paid without interest (n times P) has actuarial present value n·P times the pure endowme… | formula | tagged | Pure Endowment: “Its expected present value (EPV) per unit, ${}_nE_x$, discounts for interest and survival together” |
| For an endowment insurance, the temporary annuity-due satisfies ä_{x:n} = (1 − A_{x:n})/d, where A_{x:n} is the endowment insurance APV and… | formula | tagged | Endowment Insurance: “$$\ddot{a}_{x:\overline{n}\\|} = \frac{1 - A_{x:\overline{n}\\|}}{d}$$” |

</details>

<details><summary><code>faml-6-22</code> · gap</summary>

Tagged pages: Equivalence Principle, Whole Life Insurance, Fractional Age Assumption, Life Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| The equivalence principle sets the net premium so that the actuarial present value of premiums equals the actuarial present value of benefi… | formula | tagged | Equivalence Principle: “**The Equivalence Principle** sets a [[Insurance Premium\\|premium]] so that the expected present va…” |
| Under the uniform distribution of deaths (UDD) assumption within each year of age, the continuous (immediate-payment) whole life insurance … | fact | tagged | Fractional Age Assumption: “Under UDD, $\bar{A}_x = \tfrac{i}{\delta}A_x$ and $A^{(m)}_x = \tfrac{i}{i^{(m)}}A_x$” |
| Under UDD, the m-thly temporary annuity-due is approximated by ä^(m)_{x:n} = α(m)·ä_{x:n} − β(m)·(1 − nE_x), where α(m) and β(m) are the UD… | formula | missing |  |
| The pure endowment (discount-survival) factor nE_x = v^n · nPx is the APV of 1 paid at the end of n years if (x) survives, and the temporar… | definition | tagged | Life Annuity: “**Temporary** annuity (pays until death or $n$ years, whichever comes first): $\ddot{a}_{x:\overlin…” |
| Values such as A_x, ä_{x:n}, and nE_x are read from the Standard Ultimate Life Table (illustrative life table) at the given interest rate; … | fact | tagged | Whole Life Insurance: “The exam's Illustrative Life Table lists $1000A_x$, $1000\,{}^2\!A_x$ and $\ddot{a}_x$ at $i = 0.06$” |

</details>

<details><summary><code>faml-6-23</code> · answerable</summary>

Tagged pages: Equivalence Principle, Expenses, Whole Life Insurance, Life Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| Under the equivalence principle, the actuarial present value of gross premiums equals the actuarial present value of benefits plus expenses… | fact | tagged | Equivalence Principle: “the expected present value (EPV) of the premiums equals the EPV of the benefits, plus the EPV of th…” |
| A fully discrete whole life insurance paying F has benefit APV F·A_x, and a premium payable for n years only is valued as G·ä_{x:n\|} (a te… | formula | tagged | Whole Life Insurance: “its actuarial present value (the **net single premium**) for a life aged $x$ is $A_x$.” |
| Per-policy expenses paid at the start of each year are valued as the expense amount times a whole life annuity-due, adjusted by the differe… | procedure | tagged | Equivalence Principle (collapsed): “If the initial expense replaces the renewal expense at time 0, renewals run over $\ddot{a}-1$. Usin…” |
| Percent-of-premium expenses that vary by policy year are valued by decomposing them into level percentages over annuity-due pieces: a perce… | procedure | tagged | Equivalence Principle (collapsed): “Expenses are 50% of the first premium plus \$250 at issue, then 5% of each later premium plus \$50 …” |
| When the gross premium is written as kF + h, the term proportional to the death benefit F comes from the benefit APV and the constant h com… | fact | tagged | Equivalence Principle: “G\,\ddot{a}_{45:\overline{20}\\|} &= 100{,}000A_{45} + 0.5G + 250 + (0.05G + 50)(\ddot{a}_{45:\overl…” |

</details>

<details><summary><code>faml-6-24</code> · untagged</summary>

Tagged pages: Future Loss Random Variable, Whole Life Insurance, Variance, Equivalence Principle

| Item | Kind | Status | Where |
|---|---|---|---|
| For a fully continuous whole life insurance of 1 with premium rate P, the loss at issue is L = v^T − P·ā_{T\|}, i.e., Z̄ − P·Ȳ, where Z̄ = … | definition | tagged | Future Loss Random Variable: “A fully continuous whole life has $L_0 = \left(S + P/\delta\right)e^{-\delta T_x} - P/\delta$.” |
| The present value of a continuous annuity to death and of the whole life insurance are related by ā_{T\|} = (1 − v^T)/δ, so Ȳ = (1 − Z̄)/δ. | formula | elsewhere | Continuous Annuity: “$$= \frac{1 - v^n}{\delta}$$” |
| The expected value relationship ā_x = (1 − Ā_x)/δ for a continuous whole life annuity. | formula | linked | Life Annuity: “$\bar{a}_x = \int_0^\infty e^{-\delta t}\,{_t}p_x\,dt = (1 - \bar{A}_x)/\delta$” |
| Under the equivalence principle, the net premium rate for a fully continuous whole life insurance is P = Ā_x / ā_x, which sets E[L] = 0. | formula | tagged | Equivalence Principle: “Setting $E[L_0]=0$ gives $P = S\,A_x/\ddot{a}_x$.” |
| For a random variable of the form aX + b, Var(aX + b) = a²·Var(X); hence for L = Z̄(1 + P/δ) − P/δ, Var(L) = (1 + P/δ)²·Var(Z̄), and this h… | fact | tagged | Variance: “$\text{Var}(aX + b) = a^2 \text{Var}(X)$” |

</details>

<details><summary><code>faml-6-25</code> · answerable</summary>

Tagged pages: Equivalence Principle, Woolhouse's Formula, Deferred Annuity, Expenses

| Item | Kind | Status | Where |
|---|---|---|---|
| The expected loss at issue (EPV of future loss) equals the EPV of benefits plus expenses minus the EPV of premiums. | fact | tagged | Equivalence Principle: “the expected present value (EPV) of the premiums equals the EPV of the benefits, plus the EPV of th…” |
| The EPV of an n-year temporary annuity-due paid at the start of each year is the premium times ä_{x:n\|}, and premiums paid only during the… | formula | linked | Life Annuity: “**Temporary** annuity (pays until death or $n$ years, whichever comes first): $\ddot{a}_{x:\overlin…” |
| The EPV of an n-year deferred annuity-due equals the pure endowment factor times the annuity-due at the later age: n\|ä_x = nE_x · ä_{x+n},… | formula | syllabus | Pure Endowment: “That is how a deferred annuity is valued, ${}_{n\\|}\ddot{a}_x = {}_nE_x\,\ddot{a}_{x+n}$” |
| Woolhouse two-term approximation: ä_x^(m) ≈ ä_x − (m−1)/(2m), used to value annuities payable m times per year. | formula | tagged | Woolhouse's Formula: “The first block is the three-term formula, and dropping its last term gives the two-term formula $\…” |
| An annual expense payable at the start of every year for life is valued as the expense amount times the whole life annuity-due ä_x. | fact | linked | Life Annuity: “A **life-annuity-due** pays 1 at the start of each year while $(x)$ is alive; its actuarial present…” |
| Annuity-due and pure endowment values for a given age are obtained from the Standard Ultimate Life Table at the stated interest rate. | fact | tagged | Equivalence Principle (collapsed): “Using the Standard Ultimate Life Table at $i = 5\%$ ($A_{50} = 0.18931$, ${}^2\!A_{50} = 0.05108$, …” |

</details>

<details><summary><code>faml-6-26</code> · answerable</summary>

Tagged pages: Equivalence Principle, Whole Life Insurance, Life Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| Under the equivalence principle, the premium is set so that the expected present value of premiums equals the expected present value of ben… | fact | tagged | Equivalence Principle: “the expected present value (EPV) of the premiums equals the EPV of the benefits, plus the EPV of th…” |
| The EPV of a fully discrete whole life insurance paying a death benefit of B is B times A_x, the whole life insurance actuarial present val… | formula | tagged | Whole Life Insurance: “In the life-table model of Exam MAS-I the benefit is paid at the **end of the year of death**, and …” |
| When the first-year premium is zero and premiums P are paid at the start of each later year, the EPV of premiums is P times (a-due_x minus … | procedure | tagged | Equivalence Principle: “Renewal expenses run over $\ddot{a}_{45:\overline{20}\\|} - 1$, because the first year carries the i…” |
| Values of A_x and a-due_x for a given age are read from the Standard Ultimate Life Table at the stated interest rate (the Illustrative Life… | fact | tagged | Whole Life Insurance: “The exam's Illustrative Life Table lists $1000A_x$, $1000\,{}^2\!A_x$ and $\ddot{a}_x$ at $i = 0.06$” |

</details>

<details><summary><code>faml-6-27</code> · answerable</summary>

Tagged pages: Equivalence Principle, Whole Life Insurance, Survival Model, Life Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| The equivalence principle sets the expected present value of premiums equal to the expected present value of benefits at issue. | fact | tagged | Equivalence Principle: “the expected present value (EPV) of the premiums equals the EPV of the benefits, plus the EPV of th…” |
| With constant force of mortality mu and force of interest delta, the continuous whole life annuity-due EPV is a-bar_x = 1/(mu + delta). | formula | tagged | Life Annuity: “under a constant force of mortality $\mu$, $\bar{a}_x = 1/(\mu + \delta)$” |
| With constant force of mortality mu and force of interest delta, the continuous whole life insurance EPV is A-bar_x = mu/(mu + delta). | formula | tagged | Whole Life Insurance: “under a constant force of mortality $\mu$, $\bar{A}_x = \mu/(\mu + \delta)$” |
| The n-year pure endowment factor is nEx = v^n * npx, which under constant force mu and delta equals e^{-n(mu+delta)}. | formula | linked | Term Life Insurance: “where ${}_nE_x = v^n\,{}_np_x$ is the [[Pure Endowment\\|pure endowment]] factor.” |
| A benefit or premium that changes at time n is valued by writing it as the initial-level whole life EPV plus the change times the deferred … | procedure | linked | Term Life Insurance: “$$A_x = A^{1}_{x:\overline{n}\\|} + {}_nE_x\,A_{x+n}$$” |

</details>

<details><summary><code>faml-6-28</code> · answerable</summary>

Tagged pages: Equivalence Principle, Expenses, Whole Life Insurance, Life Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| The equivalence principle sets the expected present value of gross premiums equal to the expected present value of benefits plus expenses, … | fact | tagged | Equivalence Principle: “the expected present value (EPV) of the premiums equals the EPV of the benefits, plus the EPV of th…” |
| The EPV of a fully discrete whole life insurance of face amount B on (x) is B*A_x, and the EPV of premiums payable at the start of each yea… | formula | tagged | Whole Life Insurance: “In the life-table model of Exam MAS-I the benefit is paid at the **end of the year of death**, and …” |
| Gross premium expenses are modeled as percent-of-premium and per-policy amounts incurred at the start of each policy year in which they app… | procedure | tagged | Equivalence Principle (collapsed): “Renewal expenses run over $\ddot{a}_{45:\overline{20}\\|} - 1$, because the first year carries the i…” |
| The temporary annuity-due satisfies a-double-dot_{x:n} = a-double-dot_x - nE_x * a-double-dot_{x+n}, where nE_x = v^n * n p_x is the pure e… | formula | tagged | Life Annuity: “$\ddot{a}_{x:\overline{n}\\|} = \ddot{a}_x - v^n\,{_n}p_x\,\ddot{a}_{x+n}$” |
| Values of A_x, a-double-dot_x and nE_x for the Standard Ultimate Life Table are read from the published table at the given interest rate. | fact | tagged | Equivalence Principle (collapsed): “Using the Standard Ultimate Life Table at $i = 5\%$ ($A_{50} = 0.18931$, ${}^2\!A_{50} = 0.05108$, …” |

</details>

<details><summary><code>faml-6-29</code> · gap</summary>

Tagged pages: Equivalence Principle, Expenses, Whole Life Insurance, Life Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| placeholder | fact | missing |  |

</details>

<details><summary><code>faml-6-30</code> · answerable</summary>

Tagged pages: Future Loss Random Variable, Expenses, Whole Life Insurance, Variance

| Item | Kind | Status | Where |
|---|---|---|---|
| The loss at issue L0 for a fully discrete insurance is the present value of future benefits plus expenses minus the present value of gross … | definition | tagged | Future Loss Random Variable: “**The Future Loss Random Variable** ${}_tL$ of a long-term insurance or annuity is the present valu…” |
| Expenses given as a percentage of gross premium are modeled as an initial amount in year 1 plus a percentage annuity-due in later years, so… | procedure | linked | Equivalence Principle (collapsed): “Equate the EPV of gross premiums to the EPV of benefits plus expenses. Renewal expenses run over $\…” |
| The certain annuity-due is ä_{n\|} = (1 − v^n)/d, with d = i/(1+i), allowing the loss to be written as a linear function of v^{K+1}. | formula | tagged | Future Loss Random Variable: “The second block uses $\ddot{a}_{\overline{k}\\|} = (1 - v^k)/d$, which makes the loss a linear func…” |
| For a loss of the form L = c·v^{K+1} + constant, the variance is c² times Var(v^{K+1}), because adding a constant does not change variance … | fact | tagged | Future Loss Random Variable: “**Forgetting the premium in the variance:** $\text{Var}(L_0)$ scales by $(S + P/d)^2$, not $S^2$.” |
| Var(v^{K+1}) = ²A_x − (A_x)², where ²A_x is the second moment of the whole life insurance present value, i.e. A_x computed at doubled force… | formula | tagged | Whole Life Insurance: “**Variance:** the second moment ${}^2\!A_x$ of the present value is $A_x$ at discount factor $v^2$ …” |
| The whole life insurance and annuity-due actuarial present values are related by A_x = 1 − d·ä_x. | formula | tagged | Whole Life Insurance: “since $\ddot{a}_x = (1 - A_x)/d$, $P$ follows from $A_x$ and $d$ alone” |

</details>

<details><summary><code>faml-6-31</code> · answerable</summary>

Tagged pages: Equivalence Principle, Whole Life Insurance, Survival Model, Life Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| When the density of future lifetime is a constant-force exponential (mu e^{-mu t}) up to age n, the force of mortality over that range equa… | fact | linked | Hazard Rate: “A **constant** hazard rate $\mu(t) = \mu$ corresponds to the [[Exponential Distribution\\|Exponentia…” |
| The actuarial present value of a whole life insurance can be split at a later age n: A-bar_x = (APV of an n-year term insurance) + e^{-delt… | formula | linked | Term Life Insurance: “$$A_x = A^{1}_{x:\overline{n}\\|} + {}_nE_x\,A_{x+n}$$” |
| For constant force mu and constant interest delta, the n-year continuous term insurance APV equals (mu/(mu+delta)) * (1 - e^{-n(mu+delta)}). | formula | linked | Term Life Insurance (collapsed): “Under a constant force, $\bar{A}^{1}_{x:\overline{n}\\|} = \frac{\mu}{\mu+\delta}\left(1 - e^{-(\mu+…” |
| The continuous whole life annuity APV relates to the insurance APV by a-bar_x = (1 - A-bar_x)/delta. | formula | tagged | Life Annuity: “$\bar{a}_x = \int_0^\infty e^{-\delta t}\,{_t}p_x\,dt = (1 - \bar{A}_x)/\delta$” |
| The fully continuous net premium rate for whole life insurance is P-bar(A-bar_x) = A-bar_x / a-bar_x by the equivalence principle, and the … | formula | tagged | Equivalence Principle: “Setting $E[L_0]=0$ gives $P = S\,A_x/\ddot{a}_x$.” |

</details>

<details><summary><code>faml-6-32</code> · gap</summary>

Tagged pages: Equivalence Principle, Whole Life Insurance, Fractional Age Assumption, Life Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| Under UDD, the m-thly annuity-due is approximated by ä^(m)_x ≈ α(m)·ä_x − β(m), where α(m) = i·d / (i^(m)·d^(m)) and β(m) = (i − i^(m)) / (… | formula | missing |  |
| Under UDD, the continuous whole life insurance EPV equals the discrete one times i/δ: Ā_x = (i/δ)·A_x. | formula | tagged | Fractional Age Assumption: “Under UDD, $\bar{A}_x = \tfrac{i}{\delta}A_x$ and $A^{(m)}_x = \tfrac{i}{i^{(m)}}A_x$.” |
| The whole life insurance and annuity-due are related by A_x = 1 − d·ä_x, where d = i/(1+i). | formula | tagged | Whole Life Insurance: “since $\ddot{a}_x = (1 - A_x)/d$, $P$ follows from $A_x$ and $d$ alone” |
| The EPV of premiums for a level premium payable m times per year is the annual premium amount (m times the per-payment premium) times ä^(m)… | definition | missing |  |
| Under the equivalence principle, the net premium is found by setting the EPV of premiums equal to the EPV of benefits and solving for the p… | procedure | tagged | Equivalence Principle: “the expected present value (EPV) of the premiums equals the EPV of the benefits, plus the EPV of th…” |
| The force of interest is δ = ln(1+i). | formula | elsewhere | Force of Interest: “$$\delta = \ln(1+i)$$” |

</details>

<details><summary><code>faml-6-33</code> · answerable</summary>

Tagged pages: Normal Approximation, Pure Endowment, Future Loss Random Variable, Survival Model

| Item | Kind | Status | Where |
|---|---|---|---|
| The survival probability from the force of mortality is t p_x = exp(-∫_0^t μ_x(s) ds). | formula | syllabus | Mortality: “$${}_tp_x = \exp\!\left(-\int_0^t \mu_{x+s}\,ds\right)$$” |
| A pure endowment pays a fixed benefit at the end of n years only if the insured is alive then, so its present value is the benefit times v^… | definition | tagged | Pure Endowment: “**Symbols:** $Z = v^n I$, where $I$ indicates survival of $(x)$ to age $x+n$ and is a Bernoulli var…” |
| Under the equivalence principle the premium is set so the expected loss at issue is zero, so the aggregate loss has mean 0. | fact | tagged | Future Loss Random Variable: “Under the [[Equivalence Principle\\|equivalence principle]] $E[L_0] = 0$, and at a later time the ex…” |
| A pure endowment's payment is Bernoulli: the variance of its present value is (benefit·v^n)^2 · n p_x · (1 − n p_x). | formula | tagged | Pure Endowment: “$$\text{Var}(Z) = v^{2n}\,{}_np_x\,{}_nq_x$$” |
| For independent policies, the variance of the aggregate loss equals the sum of individual variances, i.e. N times the individual variance f… | fact | tagged | Normal Approximation: “The recipe: identify $n$, compute $E[S_n] = n\mu$ and $\text{Var}(S_n) = n\sigma^2$ ([[Moments for …” |
| Using the normal approximation, standardize the aggregate loss by subtracting its mean and dividing by its standard deviation, then compute… | procedure | tagged | Normal Approximation: “$$P(S_n \le s) \approx \Phi\!\left(\frac{s - n\mu}{\sigma\sqrt{n}}\right)$$” |

</details>

<details><summary><code>faml-6-34</code> · answerable</summary>

Tagged pages: Equivalence Principle, Expenses, Whole Life Insurance, Life Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| Under the equivalence principle, the expected present value of premiums equals the expected present value of benefits plus expenses (EPV of… | fact | tagged | Equivalence Principle: “the expected present value (EPV) of the premiums equals the EPV of the benefits, plus the EPV of th…” |
| The EPV of premiums for a fully discrete whole life policy paying premium P at the start of each year is P times the whole life annuity-due… | formula | tagged | Whole Life Insurance: “a premium $P$ paid at the start of each year while $(x)$ is alive is a [[Life Annuity\\|life-annuity…” |
| The EPV of a fully discrete whole life insurance with death benefit B is B·A_x, where A_x is the whole life insurance actuarial present val… | formula | tagged | Whole Life Insurance: “its actuarial present value (the **net single premium**) for a life aged $x$ is $A_x$.” |
| The EPV of percent-of-premium expenses is computed by taking the initial expense percentage times the premium at time 0, plus the renewal e… | procedure | tagged | Equivalence Principle (collapsed): “G\,\ddot{a}_{45:\overline{20}\\|} &= 100{,}000A_{45} + 0.5G + 250 + (0.05G + 50)(\ddot{a}_{45:\overl…” |
| Values of ä_x and A_x for a given age are obtained from the Standard Ultimate Life Table at the stated interest rate (the tables apply for … | fact | tagged | Equivalence Principle (collapsed): “Using the Standard Ultimate Life Table at $i = 5\%$ ($A_{50} = 0.18931$, ${}^2\!A_{50} = 0.05108$, …” |

</details>

<details><summary><code>faml-6-35</code> · answerable</summary>

Tagged pages: Equivalence Principle, Expenses, Whole Life Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| The equivalence principle sets the expected present value of premiums equal to the expected present value of benefits plus expenses (commis… | fact | tagged | Equivalence Principle: “the expected present value (EPV) of the premiums equals the EPV of the benefits, plus the EPV of th…” |
| The actuarial present value of level annual premiums for a fully discrete whole life policy is the premium times the whole life annuity-due… | formula | tagged | Whole Life Insurance: “a premium $P$ paid at the start of each year while $(x)$ is alive is a [[Life Annuity\\|life-annuity…” |
| The actuarial present value of a fully discrete whole life insurance paying a benefit B at the end of the year of death is B·A_x. | formula | tagged | Whole Life Insurance: “In the life-table model of Exam MAS-I the benefit is paid at the **end of the year of death**, and …” |
| Percent-of-premium commissions that differ in the first year and renewal years are modeled as the renewal percentage times G·ä_x plus an ex… | procedure | tagged | Equivalence Principle (collapsed): “Renewal expenses run over $\ddot{a}_{45:\overline{20}\\|} - 1$, because the first year carries the i…” |
| Values of A_x and ä_x for a given age are read from the Standard Ultimate Life Table at the stated interest rate. | fact | linked | Term Life Insurance (collapsed): “On the SULT at $5\%$, $A_{50} = 0.18931$, $A_{60} = 0.29028$” |

</details>

<details><summary><code>faml-6-36</code> · gap</summary>

Tagged pages: Equivalence Principle, Term Life Insurance, Expenses, Survival Model

| Item | Kind | Status | Where |
|---|---|---|---|
| Under the equivalence principle, the expected present value of gross premiums equals the expected present value of benefits plus expenses a… | fact | tagged | Equivalence Principle: “the expected present value (EPV) of the premiums equals the EPV of the benefits, plus the EPV of th…” |
| For a constant force of mortality mu and force of interest delta, the EPV of an n-year continuous term insurance of 1 is Abar^1_{x:n} = mu/… | formula | tagged | Term Life Insurance (collapsed): “Under a constant force, $\bar{A}^{1}_{x:\overline{n}\\|} = \frac{\mu}{\mu+\delta}\left(1 - e^{-(\mu+…” |
| For a constant force of mortality mu and force of interest delta, the n-year temporary continuous life annuity of 1 per year has EPV abar_{… | formula | missing |  |
| Continuously paid premiums and continuously paid expenses at annual rates are valued as EPVs of continuous life annuities (premium-paying t… | fact | tagged | Equivalence Principle: “P &= \frac{100{,}000\,\bar{A}_{\overline{xy}}}{\bar{a}_{xy}}” |

</details>

<details><summary><code>faml-6-37</code> · gap</summary>

Tagged pages: Equivalence Principle, Expenses, Whole Life Insurance, Life Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| Under the equivalence principle, the actuarial present value of gross premiums equals the actuarial present value of benefits plus expenses… | fact | tagged | Equivalence Principle: “the expected present value (EPV) of the premiums equals the EPV of the benefits, plus the EPV of th…” |
| The APV of a fully discrete whole life insurance paying a benefit B at the end of the year of death is B times A_x, and the APV of premiums… | formula | tagged | Whole Life Insurance: “In the life-table model of Exam MAS-I the benefit is paid at the **end of the year of death**, and …” |
| The APV of an expense e paid at the end of each year while the insured is alive is e times the immediate whole life annuity a_x, which equa… | formula | tagged | Life Annuity: “A **life-annuity-immediate** pays 1 at the end of each year, provided $(x)$ is still alive then; it…” |
| An expense paid at the end of the year of death (as well as at the end of each year survived) has APV e times A_x for the death-year paymen… | fact | missing |  |

</details>

<details><summary><code>faml-6-38</code> · answerable</summary>

Tagged pages: Equivalence Principle, Endowment Insurance, Fractional Age Assumption, Pure Endowment

| Item | Kind | Status | Where |
|---|---|---|---|
| The annual net premium (equivalence principle) for an insurance paid by annual premiums at the beginning of each year equals the actuarial … | formula | tagged | Equivalence Principle: “Setting $E[L_0]=0$ gives $P = S\,A_x/\ddot{a}_x$.” |
| For an n-year endowment insurance, the actuarial present value of the endowment insurance relates to the temporary annuity-due by A_{x:n\|}… | formula | tagged | Endowment Insurance: “$$\ddot{a}_{x:\overline{n}\\|} = \frac{1 - A_{x:\overline{n}\\|}}{d}$$” |
| An n-year endowment insurance APV is the sum of the n-year term insurance APV and the pure endowment APV: A_{x:n\|} = A^1_{x:n\|} + nEx. | definition | tagged | Endowment Insurance: “$$A_{x:\overline{n}\\|} = A^{1}_{x:\overline{n}\\|} + {}_nE_x$$” |
| Under the uniform distribution of deaths assumption within each year of age, the continuous (moment-of-death) term insurance APV equals (i/… | fact | linked | Term Life Insurance: “Under UDD, $\bar{A}^{1}_{x:\overline{n}\\|} = \frac{i}{\delta}A^{1}_{x:\overline{n}\\|}$.” |
| The force of interest is δ = ln(1+i), and the pure endowment is unaffected by the UDD adjustment, so the continuous endowment insurance APV… | formula | tagged | Endowment Insurance: “$\bar{A}_{x:\overline{n}\\|} = \frac{i}{\delta}A^{1}_{x:\overline{n}\\|} + {}_nE_x$.” |

</details>

<details><summary><code>faml-6-39</code> · untagged</summary>

Tagged pages: Equivalence Principle, Whole Life Insurance, Life Table

| Item | Kind | Status | Where |
|---|---|---|---|
| The annual net premium for a fully discrete whole life insurance of face amount B on (x) is P = B·A_x / ä_x, from the equivalence principle. | formula | tagged | Equivalence Principle: “Setting $E[L_0]=0$ gives $P = S\,A_x/\ddot{a}_x$.” |
| The probability that a life aged x survives n years is n_p_x = l_{x+n} / l_x, computed from life table values. | formula | tagged | Life Table: “$$_{t}p_x = \frac{\ell_{x+t}}{\ell_x}, \qquad _{t}q_x = 1 - {}_{t}p_x = \frac{\ell_x - \ell_{x+t}}{…” |
| The expected number of policies still in force after n years equals the initial number of policies times the n-year survival probability of… | procedure | tagged | Life Table: “starting from a radix $\ell_0$ of newborns, it records $\ell_x$, the expected number still alive at…” |
| The average premium per policy in force is the total premium received (sum of each group's premium times its number of surviving policies) … | procedure | elsewhere | In-Force (collapsed): “\text{Avg premium 2023} &= \frac{\$52{,}000{,}000}{40{,}000} = \$1{,}300” |
| Net premiums are fixed at issue using the original pricing assumptions (mortality and interest), so they do not change when later experienc… | fact | tagged | Equivalence Principle: “sets a [[Insurance Premium\\|premium]] so that the expected present value of the future loss random …” |

</details>

<details><summary><code>faml-6-40</code> · error</summary>

Error: ValueError: no usable 'found' list in the reply

</details>

<details><summary><code>faml-6-41</code> · answerable</summary>

Tagged pages: Equivalence Principle, Term Life Insurance, Insurance Premium

| Item | Kind | Status | Where |
|---|---|---|---|
| The equivalence principle sets the actuarial present value of net premiums equal to the actuarial present value of benefits at issue. | fact | tagged | Equivalence Principle: “the expected present value (EPV) of the premiums equals the EPV of the benefits, plus the EPV of th…” |
| For a fully discrete term insurance, the APV of benefits is the sum over years of b_{k+1} v^{k+1} times the probability of surviving k year… | formula | tagged | Term Life Insurance: “its EPV is $\sum_{k=0}^{n-1} b_{k+1}\,v^{k+1}\,{}_kp_x\,q_{x+k}$ for a benefit $b_{k+1}$ on death i…” |
| For a fully discrete insurance, the APV of premiums is the sum of each premium paid at the start of year k times v^k times the survival pro… | formula | linked | Life Annuity: “A **life-annuity-due** pays 1 at the start of each year while $(x)$ is alive; its actuarial present…” |
| Survival probability over multiple years is the product of one-year survival probabilities, e.g. 2p_x = p_x p_{x+1}, with p = 1 - q. | fact | linked | Future Lifetime Random Variable: “${}_{t+u}p_x = {}_tp_x\,{}_up_{x+t}$” |

</details>

<details><summary><code>faml-6-42</code> · answerable</summary>

Tagged pages: Future Loss Random Variable, Endowment Insurance, Survival Model

| Item | Kind | Status | Where |
|---|---|---|---|
| For a fully discrete n-year endowment insurance, the loss at issue L0 is the present value of the death or maturity benefit (paid at end of… | definition | tagged | Future Loss Random Variable: “For an $n$-year [[Endowment Insurance\\|endowment insurance]], replace $K_x + 1$ by $\min(K_x+1, n)$…” |
| To find Pr[L0 > 0], compute the loss for each possible year of death (and for survival to maturity), determine which outcomes give a positi… | procedure | tagged | Future Loss Random Variable (collapsed): “The insurer loses only if the insured dies in the first 19 years.” |
| For a fully discrete insurance, the loss L0 decreases as the year of death gets later (benefit discounted more, more premiums paid), so a p… | fact | tagged | Future Loss Random Variable: “The insurer loses money exactly when the benefit's present value exceeds its EPV, which means when …” |
| With constant force of mortality μ, the survival probability is t_p_x = e^(-μt), so the probability of death within n years is 1 - e^(-nμ). | formula | tagged | Survival Model: “Suppose $S(t) = e^{-0.02t}$ for $t \geq 0$ (constant force of mortality).” |
| The discount factor is v = e^(-δ) under a constant force of interest δ. | formula | linked | Whole Life Insurance: “$v = 1/(1+i)$: a death in year $k+1$ (survive $k$ years, probability ${_k}p_x$, then die, $q_{x+k}$…” |

</details>

<details><summary><code>faml-6-43</code> · no requirements</summary>

Tagged pages: Equivalence Principle, Expenses, Term Life Insurance, Life Annuity

| Item | Kind | Status | Where |
|---|---|---|---|

</details>

<details><summary><code>faml-6-44</code> · answerable</summary>

Tagged pages: Equivalence Principle, Whole Life Insurance, Pure Endowment

| Item | Kind | Status | Where |
|---|---|---|---|
| The equivalence principle sets the net premium so that the actuarial present value of premiums equals the actuarial present value of benefi… | procedure | tagged | Equivalence Principle: “the expected present value (EPV) of the premiums equals the EPV of the benefits, plus the EPV of th…” |
| The present value of a death benefit equal to the return of premiums paid (without interest) during a term period is the premium times the … | formula | linked | Term Life Insurance: “A decreasing term insurance reduces the sum each year, often to match the balance of a loan, and it…” |
| The APV of a deferred whole life insurance paid at death after n years is the pure endowment factor times the whole life APV at the later a… | formula | tagged | Pure Endowment: “and how a [[Whole Life Insurance\\|whole life]] value splits, $A_x = A^{1}_{x:\overline{n}\\|} + {}_n…” |
| The temporary annuity-due is the whole life annuity-due minus the deferred portion: ä_{x:n} = ä_x − nE_x · ä_{x+n}. | formula | linked | Life Annuity: “**Temporary** annuity (pays until death or $n$ years, whichever comes first): $\ddot{a}_{x:\overlin…” |
| Whole life insurance and annuity-due are related by A_x = 1 − d·ä_x, where d = i/(1+i). | formula | tagged | Whole Life Insurance: “since $\ddot{a}_x = (1 - A_x)/d$, $P$ follows from $A_x$ and $d$ alone” |

</details>

<details><summary><code>faml-6-45</code> · gap</summary>

Tagged pages: Percentile, Future Loss Random Variable, Whole Life Insurance, Fractional Age Assumption

| Item | Kind | Status | Where |
|---|---|---|---|
| The loss at issue random variable for a fully continuous whole life insurance with benefit b and annual premium rate P is L = b v^T - P \ba… | formula | tagged | Future Loss Random Variable: “A fully continuous whole life has $L_0 = \left(S + P/\delta\right)e^{-\delta T_x} - P/\delta$.” |
| The continuous annuity-certain is \bar{a}_{\overline{t}\|} = (1 - v^t)/\delta, with force of interest \delta = ln(1+i). | formula | elsewhere | Continuous Annuity: “$$= \frac{1 - v^n}{\delta}$$” |
| When the loss L is a monotone decreasing function of T, the p-th percentile of L equals L evaluated at the (1-p) quantile of T, i.e. at the… | fact | missing |  |
| The survival probability from age x to x+t is t p_x = l_{x+t}/l_x, so Pr(T_x > t) = l_{x+t}/l_x. | formula | linked | Life Table: “$$_{t}p_x = \frac{\ell_{x+t}}{\ell_x}, \qquad _{t}q_x = 1 - {}_{t}p_x = \frac{\ell_x - \ell_{x+t}}{…” |
| Under the uniform distribution of deaths (UDD) assumption, l_{x+s} for 0 ≤ s ≤ 1 is found by linear interpolation: l_{x+s} = (1-s) l_x + s … | procedure | tagged | Fractional Age Assumption: “$\ell_{x+s}$ is linear in $s$, so the density ${}_sp_x\,\mu_{x+s} = q_x$ is flat over the year.” |

</details>

<details><summary><code>faml-6-46</code> · gap</summary>

Tagged pages: Equivalence Principle, Deferred Annuity, Annuity Due

| Item | Kind | Status | Where |
|---|---|---|---|
| The equivalence principle sets the actuarial present value of net premiums equal to the actuarial present value of benefits to determine th… | procedure | tagged | Equivalence Principle: “the expected present value (EPV) of the premiums equals the EPV of the benefits, plus the EPV of th…” |
| The APV of a benefit equal to the return (without interest) of premiums paid, payable at the end of the year of death during an n-year peri… | formula | missing |  |
| The APV of an n-year deferred whole life annuity-due is v^n * np_x * ä_{x+n}, equivalently n\|ä_x = ä_x − ä_{x:n}. | formula | linked | Life Annuity: “**Temporary** annuity (pays until death or $n$ years, whichever comes first): $\ddot{a}_{x:\overlin…” |
| The APV of a temporary (n-year) life annuity-due of premiums, ä_{x:n}, is the present value of payments made at the start of each year whil… | formula | linked | Life Annuity: “**Temporary** annuity (pays until death or $n$ years, whichever comes first): $\ddot{a}_{x:\overlin…” |

</details>

<details><summary><code>faml-6-47</code> · untagged</summary>

Tagged pages: Equivalence Principle, Deferred Annuity, Expenses

| Item | Kind | Status | Where |
|---|---|---|---|
| The equivalence principle sets the expected present value of gross premiums equal to the expected present value of benefits plus expenses a… | formula | tagged | Equivalence Principle: “the expected present value (EPV) of the premiums equals the EPV of the benefits, plus the EPV of th…” |
| The APV of a deferred whole life annuity-due paying B per year after n years is B * nE_x * ä_{x+n}, where nE_x is the n-year pure endowment… | formula | elsewhere | Annuity Contract: “\text{Deferred: } \text{EPV} = B\;{}_nE_x\;\ddot{a}_{x+n}” |
| The APV of premiums payable at the start of each year for n years is G * ä_{x:n\|}, the temporary life annuity-due. | formula | linked | Life Annuity: “(pays until death or $n$ years, whichever comes first): $\ddot{a}_{x:\overline{n}\\|} = \ddot{a}_x -…” |
| Expenses expressed as a percentage of premium are included in the APV as the percentage times G in each year incurred, with first-year and … | procedure | tagged | Equivalence Principle (collapsed): “Renewal expenses run over $\ddot{a}_{45:\overline{20}\\|} - 1$, because the first year carries the i…” |
| Values of nE_x, ä_x and temporary annuity-dues are obtained from the Standard Ultimate Life Table at the stated interest rate (with ä_{x:n\… | fact | tagged | Equivalence Principle (collapsed): “Using the Standard Ultimate Life Table at $i = 5\%$ ($A_{50} = 0.18931$, ${}^2\!A_{50} = 0.05108$, …” |

</details>

<details><summary><code>faml-6-48</code> · answerable</summary>

Tagged pages: Equivalence Principle, Term Life Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| The equivalence principle sets the actuarial present value of premiums equal to the actuarial present value of benefits at issue. | fact | tagged | Equivalence Principle: “the expected present value (EPV) of the premiums equals the EPV of the benefits, plus the EPV of th…” |
| The APV of a deferred term insurance is the sum over each year of the benefit times the probability of surviving the deferral and prior yea… | procedure | tagged | Term Life Insurance: “The last block splits a [[Whole Life Insurance\\|whole life]] insurance into term cover for $n$ year…” |
| The probability of surviving k years is the product of one-year survival probabilities (1 - q) over those years, and the probability of sur… | formula | linked | Future Lifetime Random Variable: “so ${}_tp_x = S_0(x+t)/S_0(x)$ and ${}_{t+u}p_x = {}_tp_x\,{}_up_{x+t}$.” |
| The APV of a premium payable at a future time is the premium times the probability of surviving to that time times v raised to that time; a… | procedure | linked | Life Annuity: “$$\ddot{a}_x = \sum_{k=0}^{\infty} v^k\,{_k}p_x$$” |

</details>

<details><summary><code>faml-6-49</code> · gap</summary>

Tagged pages: Equivalence Principle, Fractional Age Assumption, Expenses

| Item | Kind | Status | Where |
|---|---|---|---|
| The equivalence principle sets the expected present value of gross premiums equal to the expected present value of benefits plus expenses a… | fact | tagged | Equivalence Principle: “$$\text{EPV(premiums)} = \text{EPV(benefits)} + \text{EPV(expenses)}$$” |
| Under the uniform distribution of deaths (UDD) assumption, a whole life insurance paid at the moment of death has APV equal to (i/δ) times … | formula | tagged | Fractional Age Assumption: “Under UDD, $\bar{A}_x = \tfrac{i}{\delta}A_x$ and $A^{(m)}_x = \tfrac{i}{i^{(m)}}A_x$.” |
| Under UDD, the m-thly temporary annuity-due is approximated by ä^(m)_{x:n} = α(m) ä_{x:n} − β(m)(1 − nE_x), where α(m) and β(m) are the sta… | formula | missing |  |
| Premium-related renewal expenses expressed as a percentage of each premium (including the first) reduce the net premium annuity by a factor… | procedure | tagged | Equivalence Principle (collapsed): “G\,\ddot{a}_{45:\overline{20}\\|} &= 100{,}000A_{45} + 0.5G + 250 + (0.05G + 50)(\ddot{a}_{45:\overl…” |
| Premiums payable m-thly for a maximum of n years are valued with a temporary m-thly annuity-due, and the annual premium equals the annual p… | fact | missing |  |

</details>

<details><summary><code>faml-6-50</code> · untagged</summary>

Tagged pages: Equivalence Principle, Whole Life Insurance, Life Table

| Item | Kind | Status | Where |
|---|---|---|---|
| Under the equivalence principle, the annual net premium for a fully discrete whole life insurance per unit of benefit is P = A_x / ä_x (exp… | formula | tagged | Whole Life Insurance: “$$P = \frac{A_x}{\ddot{a}_x}$$” |
| For a fully discrete whole life policy, the death benefit is paid at the end of the year of death, so the expected benefit payments in a po… | fact | tagged | Whole Life Insurance: “In the life-table model of Exam MAS-I the benefit is paid at the **end of the year of death**, and …” |
| Premiums for a fully discrete policy are paid at the start of each policy year only by surviving policyholders, so the expected premium inc… | fact | linked | Life Annuity: “A **life-annuity-due** pays 1 at the start of each year while $(x)$ is alive; its actuarial present…” |
| Expected net cash flow for a portfolio in a period is expected premiums received minus expected benefits paid in that period (expected cash… | fact | elsewhere | Cash Flow Statement: “**Cash from operations** ($\text{CF}_{\text{ops}}$): premiums collected net of reinsurance, net inv…” |
| Obtain A_x, ä_x, and q_x for a given age and interest rate from the Standard Ultimate Life Table (SULT) in the exam tables. | procedure | tagged | Life Table: “$$_{t}p_x = \frac{\ell_{x+t}}{\ell_x}, \qquad _{t}q_x = 1 - {}_{t}p_x = \frac{\ell_x - \ell_{x+t}}{…” |

</details>

<details><summary><code>faml-6-51</code> · gap</summary>

Tagged pages: Equivalence Principle, Deferred Annuity, Term Life Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| Under the equivalence principle, the actuarial present value of net premiums equals the actuarial present value of benefits (including deat… | fact | tagged | Equivalence Principle: “the expected present value (EPV) of the premiums equals the EPV of the benefits, plus the EPV of th…” |
| The APV of a deferred whole life annuity-due payable from age x+n is n\|ä_x = ä_x − ä_{x:n\|}, the whole life annuity-due minus the tempora… | formula | linked | Pure Endowment: “${}_{n\\|}\ddot{a}_x = {}_nE_x\,\ddot{a}_{x+n}$” |
| A temporary annuity-due paying 1 per year for n years while (x) is alive has APV ä_{x:n\|}, so level premiums P payable for n years have AP… | formula | linked | Life Annuity: “**Temporary** annuity (pays until death or $n$ years, whichever comes first): $\ddot{a}_{x:\overlin…” |
| A death benefit equal to the sum of premiums paid without interest, i.e., k·P for death in year k, is valued as P times the increasing term… | procedure | tagged | Term Life Insurance: “its EPV is $\sum_{k=0}^{n-1} b_{k+1}\,v^{k+1}\,{}_kp_x\,q_{x+k}$ for a benefit $b_{k+1}$ on death i…” |
| The increasing n-year term insurance can be expressed as (IA)^1_{x:n\|} = (n+1)·A^1_{x:n\|} − Σ_{k=1}^{n} A^1_{x:k\|}. | formula | missing |  |

</details>

<details><summary><code>faml-6-52</code> · no requirements</summary>

Tagged pages: Equivalence Principle, Expenses, Whole Life Insurance

| Item | Kind | Status | Where |
|---|---|---|---|

</details>

<details><summary><code>faml-6-53</code> · answerable</summary>

Tagged pages: Equivalence Principle, Expenses

| Item | Kind | Status | Where |
|---|---|---|---|
| Under the equivalence principle, the gross premium is set so that the expected present value of premium income equals the expected present … | fact | tagged | Equivalence Principle: “the expected present value (EPV) of the premiums equals the EPV of the benefits, plus the EPV of th…” |
| A commission expressed as a percentage of premium is treated as an expense outflow equal to that percentage times the gross premium, includ… | procedure | tagged | Equivalence Principle (collapsed): “Expenses are 50% of the first premium plus \$250 at issue, then 5% of each later premium plus \$50 …” |
| The expected present value of a benefit paid at the end of the year of failure/death is the sum over years of benefit times the probability… | procedure | linked | Whole Life Insurance: “a death in year $k+1$ (survive $k$ years, probability ${_k}p_x$, then die, $q_{x+k}$) is paid at ti…” |
| With a constant annual failure probability q, the probability of surviving k years and then failing in year k+1 is (1-q)^k times q. | fact | linked | Whole Life Insurance: “$v = 1/(1+i)$: a death in year $k+1$ (survive $k$ years, probability ${_k}p_x$, then die, $q_{x+k}$…” |

</details>

<details><summary><code>faml-6-54</code> · answerable</summary>

Tagged pages: Loss Random Variable, Variance, Equivalence Principle, Whole Life Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| For a fully discrete whole life insurance with benefit b and annual premium P, the loss at issue is L_0 = b·v^(K+1) − P·ä_{K+1}, which can … | formula | tagged | Equivalence Principle: “$$L_0 = S\,v^{K_x+1} - P\,\ddot{a}_{\overline{K_x+1}\\|}$$” |
| For a fully discrete whole life insurance with benefit 1 and premium determined by the equivalence principle, Var(L_0) = (1 + P/d)^2 [²A_x … | formula | tagged | Equivalence Principle: “for whole life, $\text{Var}(L_0) = \left(S + P/d\right)^2\left({}^2\!A_x - A_x^2\right)$.” |
| The equivalence principle sets the annual premium so that the expected present value of the loss at issue is zero, giving P = A_x / ä_x for… | definition | tagged | Equivalence Principle: “Setting $E[L_0]=0$ gives $P = S\,A_x/\ddot{a}_x$.” |
| The relationship A_x = 1 − d·ä_x connects whole life insurance and annuity-due actuarial present values, with d = i/(1+i). | fact | tagged | Whole Life Insurance: “since $\ddot{a}_x = (1 - A_x)/d$, $P$ follows from $A_x$ and $d$ alone” |
| Variance of the loss scales with the square of the benefit amount, so the standard deviation for benefit b equals b times the unit-benefit … | fact | tagged | Variance: “$\text{Var}(aX + b) = a^2 \text{Var}(X)$ — scaling changes variance, shifts do not” |
| Look up A_x, ²A_x (at doubled force of interest, i.e., using v² ) and ä_x values from the Standard Ultimate Life Table at the given interes… | procedure | tagged | Whole Life Insurance: “the second moment ${}^2\!A_x$ of the present value is $A_x$ at discount factor $v^2$ (double the fo…” |

</details>

<details><summary><code>faml-6-55</code> · answerable</summary>

Tagged pages: Equivalence Principle, Deferred Annuity, Term Life Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| The equivalence principle sets the expected present value of premiums equal to the expected present value of benefits at issue. | definition | tagged | Equivalence Principle: “the expected present value (EPV) of the premiums equals the EPV of the benefits, plus the EPV of th…” |
| The EPV of an n-year term insurance paying 1 at the end of the year of death is A^1_{x:n\|} = A_{x:n\|} − v^n · {}_n p_x, i.e. the endowmen… | formula | linked | Endowment Insurance: “$A_{x:\overline{n}\\|} = A^{1}_{x:\overline{n}\\|} + {}_nE_x$” |
| The EPV of an n-year deferred whole life annuity-due of 1 is {}_{n\|}ä_x = v^n · {}_n p_x · ä_{x+n} = {}_nE_x · ä_{x+n}. | formula | linked | Pure Endowment: “${}_{n\\|}\ddot{a}_x = {}_nE_x\,\ddot{a}_{x+n}$” |
| The EPV of an n-year temporary life annuity-due is ä_{x:n\|} = ä_x − {}_nE_x · ä_{x+n}, i.e. the whole life annuity-due less the deferred a… | formula | linked | Life Annuity: “$\ddot{a}_{x:\overline{n}\\|} = \ddot{a}_x - v^n\,{_n}p_x\,\ddot{a}_{x+n}$” |
| For a policy with premiums payable for a limited number of years, the premium annuity is a temporary annuity-due over the premium payment p… | fact | tagged | Equivalence Principle (collapsed): “Pricing a 20-pay policy with $\ddot{a}_x$, or a both-alive premium with the last-survivor annuity, …” |
| Values for A_x, ä_x, and related quantities at given ages and interest rate are read from the Standard Ultimate Life Table (SULT), and the … | fact | linked | Life Annuity: “\ddot{a}_x = \frac{1 - A_x}{d}” |

</details>

<details><summary><code>faml-6-56</code> · answerable</summary>

Tagged pages: Equivalence Principle, Endowment Insurance, Expenses

| Item | Kind | Status | Where |
|---|---|---|---|
| Under the equivalence principle, the gross premium is set so that the actuarial present value of gross premiums equals the actuarial presen… | fact | tagged | Equivalence Principle: “the expected present value (EPV) of the premiums equals the EPV of the benefits, plus the EPV of th…” |
| A fully discrete n-year endowment insurance pays the death benefit at the end of the year of death if death occurs within n years, or the s… | definition | tagged | Endowment Insurance: “pays a sum insured on the death of the insured within a term of $n$ years, or at the end of the ter…” |
| The APV of a fully discrete n-year endowment insurance benefit of amount B is B times A_{x:n}, and the APV of a premium or expense paid at … | formula | tagged | Endowment Insurance: “For a life aged $x$ with the death benefit paid at the end of the year of death, its present value …” |
| Gross premium expenses are split into percent-of-premium and per-policy components, with first-year expenses differing from renewal expense… | procedure | tagged | Expenses: “A load stated as a percentage of premium goes in the denominator” |
| Actuarial values such as A_{x:n} and ä_{x:n} for a given age and interest rate are obtained from the Standard Ultimate Life Table (or from … | fact | tagged | Endowment Insurance: “On the SULT at $5\%$, $A_{45} = 0.15161$, $A_{65} = 0.35477$, ${}_{20}E_{45} = 0.35994$ and $\ddot{…” |

</details>

<details><summary><code>faml-7-01</code> · answerable</summary>

Tagged pages: Policy Value, Whole Life Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| The net premium policy value (prospective reserve) at time t is the expected present value of future benefits minus the expected present va… | definition | tagged | Policy Value: “${}_tV$ is the amount an insurer needs at time $t$ for a long-term insurance or annuity policy stil…” |
| A benefit that changes amount over time can be decomposed into a level base benefit plus a deferred additional benefit, valued as a whole l… | procedure | linked | Term Life Insurance: “The last block splits a [[Whole Life Insurance\\|whole life]] insurance into term cover for $n$ year…” |
| The actuarial present value of a deferred insurance starting after n years equals nE_x times A_{x+n}, where nE_x = v^n * np_x is the pure e… | formula | linked | Term Life Insurance: “$A_x = A^{1}_{x:\overline{n}\\|} + {}_nE_x\,A_{x+n}$” |
| The actuarial present value of level premiums payable at the start of each year for a limited term of n years (fully discrete) is the premi… | formula | tagged | Whole Life Insurance: “a premium $P$ paid at the start of each year while $(x)$ is alive is a [[Life Annuity\\|life-annuity…” |
| At duration t, the remaining premium period is the original premium term minus t, and the policy value uses the attained age x+t, with valu… | fact | linked | Modified Net Premium Policy Value: “For whole life, a net premium policy value is $S\left(1 - \ddot{a}_{x+t}/\ddot{a}_x\right)$, and th…” |

</details>

<details><summary><code>faml-7-02</code> · answerable</summary>

Tagged pages: Policy Value, Recursion, Endowment Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| The recursion for net premium policy values for a fully discrete insurance is (kV + P)(1+i) = q·(b + k+1V) + p·k+1V, where b is the death b… | formula | linked | Reserve: “$$\left({}_tV + P_t - E_t\right)(1+i) = q_{x+t}\,S + p_{x+t}\;{}_{t+1}V$$” |
| The net premium policy value at issue (time 0) is zero, because the net premium is set by the equivalence principle. | fact | linked | Reserve: “With the premium set by the [[Equivalence Principle\\|equivalence principle]], ${}_0V = 0$ on the pr…” |
| For an endowment insurance, the policy value just before maturity at the end of the final year equals the maturity benefit, so the terminal… | fact | linked | Thiele's Differential Equation (collapsed): “For an endowment, ${}_nV$ is the maturity benefit rather than 0, and each backward step takes the d…” |
| For a policy whose death benefit includes the end-of-year policy value (death benefit = face amount + k+1V), the net amount at risk is just… | procedure | tagged | Policy Value: “The amount held after the premium is paid, rolled up with interest, pays the expected claims and fu…” |

</details>

<details><summary><code>faml-7-03</code> · untagged</summary>

Tagged pages: Policy Value, Recursion, Expenses

| Item | Kind | Status | Where |
|---|---|---|---|
| A nominal annual interest rate i^(m) convertible m-thly corresponds to an effective rate of i^(m)/m per 1/m-year period. | definition | elsewhere | Nominal Interest Rate Convertible m-thly: “Each period, interest at rate $i^{(m)}/m$ is credited.” |
| The gross premium policy value recursion over one period is: (V_t + net premium after expense)(1+i) = q × benefit + p × V_{t+1}, where p an… | formula | linked | Reserve: “\left({}_tV + P_t - E_t\right)(1+i) = q_{x+t}\,S + p_{x+t}\;{}_{t+1}V” |
| Survival and death probabilities over a sub-period are computed from a life table as l_{x+t+s}/l_{x+t} and (l_{x+t} − l_{x+t+s})/l_{x+t}. | formula | syllabus | Life Table (collapsed): “_{2}p_{60} = \frac{\ell_{62}}{\ell_{60}} = \frac{7{,}650}{8{,}000} = 0.95625” |
| Gross premium policy value at time t equals the EPV of future benefits and expenses minus the EPV of future gross premiums, and premium net… | fact | tagged | Policy Value: “{}_tV = \text{EPV}_t(\text{benefits} + \text{expenses}) - \text{EPV}_t(\text{premiums})” |
| With death benefits paid at the end of the period of death, the policy value at an earlier time equals the EPV of cash flows up to a later … | fact | tagged | Policy Value: “{}_{t+s}V = v^{1-s}[{}_{1-s}q_{x+t+s}(S_{t+1} + E_{t+1}) + {}_{1-s}p_{x+t+s}\,{}_{t+1}V]” |
| Premiums are paid only at the start of each premium period (semi-annual here), so no premium cash flow occurs at quarter points that are no… | fact | linked | Thiele's Differential Equation (collapsed): “With annual premiums, it holds between premium dates with $P_t = 0$, and the policy value jumps up …” |

</details>

<details><summary><code>faml-7-04</code> · no requirements</summary>

Tagged pages: Policy Value, Expenses, Equivalence Principle

| Item | Kind | Status | Where |
|---|---|---|---|

</details>

<details><summary><code>faml-7-05</code> · answerable</summary>

Tagged pages: Policy Value, Fractional Age Assumption, Recursion

| Item | Kind | Status | Where |
|---|---|---|---|
| The recursive (one-year) policy value relation for a fully discrete insurance is (kV + P)(1+i) = q_{x+k}·b_{k+1} + p_{x+k}·(k+1)V, which ca… | formula | tagged | Policy Value: “\left({}_tV + P_t - e_t\right)(1+i_t) = {} & q_{x+t}\left(S_{t+1} + E_{t+1}\right) \\ & + p_{x+t}\,…” |
| A policy value at a fractional time within a policy year (e.g., t+s) is the actuarial present value over the remaining fraction of the year… | procedure | tagged | Policy Value: “${}_{t+s}V = v^{1-s}[{}_{1-s}q_{x+t+s}(S_{t+1} + E_{t+1}) + {}_{1-s}p_{x+t+s}\,{}_{t+1}V]$” |
| For a fully discrete policy the death benefit is paid at the end of the year of death, so at a fractional time the death benefit term is di… | fact | linked | Modified Net Premium Policy Value: “For an annual death benefit paid at the end of the year, $P^{FPT}_0 = S\,v\,q_x$.” |
| Under the uniform distribution of deaths (UDD) assumption within each year of age, s·q_x = s·q_x for 0≤s≤1 (i.e., s q_x = s·q_x), and the p… | fact | tagged | Fractional Age Assumption: “$$\text{UDD:}\quad {}_sq_x = s\,q_x$$” |
| The conditional probability of death within a fractional interval after age x+s is t·q_{x+s} = (t·q_x)/(1 − s·q_x) under UDD, and the survi… | formula | tagged | Fractional Age Assumption: “UDD gives ${}_sq_{x+t} = s\,q_x/(1 - t\,q_x)$” |

</details>

<details><summary><code>faml-7-06</code> · gap</summary>

Tagged pages: Policy Value, Expenses, Equivalence Principle

| Item | Kind | Status | Where |
|---|---|---|---|
| Under the equivalence principle, the expected present value of gross premiums equals the expected present value of benefits plus expenses, … | formula | tagged | Equivalence Principle: “$$\text{EPV(premiums)} = \text{EPV(benefits)} + \text{EPV(expenses)}$$” |
| Expense policy value at time t is the expected present value of future expenses minus the expected present value of future expense premiums… | definition | missing |  |
| Gross premium policy value equals net premium policy value plus expense policy value, so the expense policy value is the gross premium poli… | formula | missing |  |
| The net level premium policy value for a fully discrete whole life insurance at duration t is (face)A_{x+t} − P ä_{x+t}, where P = (face)A_… | formula | tagged | Policy Value (collapsed): “{}_{10}V &= 100{,}000\,A_{50:\overline{10}\\|} - P\,\ddot{a}_{50:\overline{10}\\|}” |
| The expense premium is the level premium (per year, payable at the beginning of each year) whose actuarial present value equals the actuari… | formula | missing |  |
| Expenses that are level in every policy year produce no expense policy value because the level expense premium equals the actual expense; o… | fact | missing |  |
| Policy values and premiums for a whole life policy are computed from life table values of A_x and ä_x (e.g., the Standard Ultimate Life Tab… | fact | tagged | Equivalence Principle: “Setting $E[L_0]=0$ gives $P = S\,A_x/\ddot{a}_x$.” |

</details>

<details><summary><code>faml-7-07</code> · answerable</summary>

Tagged pages: Policy Value, Woolhouse's Formula, Expenses

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a whole life annuity-due equals (1 - A)/d, where A is the whole life insurance APV and d = i/(1+i) is the discount rat… | formula | linked | Life Annuity: “\ddot{a}_x = \frac{1 - A_x}{d}” |
| The two-term Woolhouse approximation for an m-thly annuity-due is a^(m) ≈ a - (m-1)/(2m), ignoring higher-order terms. | formula | tagged | Woolhouse's Formula: “dropping its last term gives the two-term formula $\ddot{a}^{(m)}_x \approx \ddot{a}_x - \frac{m-1}…” |
| The gross premium policy value at time t is the APV of future benefits plus APV of future expenses (including commissions) minus APV of fut… | formula | tagged | Policy Value: “${}_tV = \text{EPV}_t(\text{benefits} + \text{expenses}) - \text{EPV}_t(\text{premiums})$” |
| Monthly premiums payable at the start of each month are valued as 12 times the monthly premium amount times the m-thly annuity-due a^(12); … | procedure | tagged | Woolhouse's Formula (collapsed): “The EPVs are $12{,}000(13.0915) = 157{,}098$” |
| Annual expenses payable at the start of each year are valued as the expense amount times the annual annuity-due, while the death benefit pa… | procedure | linked | Equivalence Principle (collapsed): “(0.05G + 50)(\ddot{a}_{45:\overline{20}\\|} - 1)” |

</details>

<details><summary><code>faml-7-08</code> · untagged</summary>

Tagged pages: Policy Value, Recursion, Life Table

| Item | Kind | Status | Where |
|---|---|---|---|
| A select-and-ultimate mortality table uses select mortality rates q_[x]+k for durations within the select period and ultimate rates q_{x+k}… | definition | elsewhere | Mortality Table Construction: “A table therefore gives select rates $q_{[x]+t}$ for durations within the select period and ultimat…” |
| Under the equivalence principle, the net premium policy value at time 0 is zero, since the net premium is set so that the expected present … | fact | linked | Reserve: “With the premium set by the [[Equivalence Principle\\|equivalence principle]], ${}_0V = 0$ on the pr…” |
| The recursive formula for fully discrete net premium policy values is (tV + P)(1+i) = q_{x+t}·b + p_{x+t}·(t+1)V, so (t+1)V = [(tV + P)(1+i… | formula | tagged | Policy Value: “\left({}_tV + P_t - e_t\right)(1+i_t) = {} & q_{x+t}\left(S_{t+1} + E_{t+1}\right)” |
| The prospective net premium policy value at time t equals the expected present value of future benefits minus the expected present value of… | formula | tagged | Policy Value: “${}_tV = \text{EPV}_t(\text{benefits} + \text{expenses}) - \text{EPV}_t(\text{premiums})$” |
| The whole life insurance actuarial present value satisfies the backward recursion A_x = v·q_x + v·p_x·A_{x+1}, and can be expanded as a sum… | formula | linked | Whole Life Insurance: “A_x = v\,q_x + v\,p_x\,A_{x+1}” |
| For a whole life, the annuity-due and insurance are related by ä_x = (1 − A_x)/d, where d = i/(1+i). | formula | linked | Whole Life Insurance: “since $\ddot{a}_x = (1 - A_x)/d$, $P$ follows from $A_x$ and $d$ alone” |

</details>

<details><summary><code>faml-7-09</code> · gap</summary>

Tagged pages: Policy Value, Endowment Insurance, Fractional Age Assumption

| Item | Kind | Status | Where |
|---|---|---|---|
| The net premium policy value at time t equals the actuarial present value of future benefits minus the actuarial present value of future ne… | fact | tagged | Policy Value: “the expected present value (EPV) at $t$ of the future benefits and expenses, less the EPV of the fu…” |
| A semi-continuous (death benefit paid at moment of death) endowment insurance's benefit APV equals the continuous term insurance APV plus t… | fact | tagged | Endowment Insurance: “under UDD only the term part is converted to continuous, $\bar{A}_{x:\overline{n}\\|} = \frac{i}{\de…” |
| Under the uniform distribution of deaths (UDD) assumption, the continuous insurance APV equals (i/δ) times the discrete (end-of-year) insur… | formula | tagged | Endowment Insurance: “under UDD only the term part is converted to continuous, $\bar{A}_{x:\overline{n}\\|} = \frac{i}{\de…” |
| The discrete term insurance APV is the endowment insurance APV minus the pure endowment: A¹_{x:n} = A_{x:n} − nE_x. | formula | linked | Pure Endowment: “An [[Endowment Insurance\\|endowment insurance]] is a [[Term Life Insurance\\|term insurance]] plus a…” |
| Under UDD, the m-thly temporary annuity-due is approximated by ä^(m)_{x:n} = α(m) ä_{x:n} − β(m)(1 − nE_x). | formula | missing |  |
| Premiums of P payable monthly (per 1/12 of annual rate each payment) have annual-rate present value equal to 12P times the monthly annuity-… | fact | elsewhere | Payable m-thly (collapsed): “The payments total $1{,}200$ a year, so $\text{PV} = 1{,}200\,a^{(12)}_{\overline{10}\\|}$.” |
| Obtain actuarial values (such as A_{x:n}, nE_x, and ä_{x:n}) at the attained age from the given Standard Ultimate Life Table at the specifi… | procedure | tagged | Policy Value (collapsed): “On the SULT at $5\%$, $A_{40:\overline{20}\\|} = 0.381263$, $\ddot{a}_{40:\overline{20}\\|} = 12.9934…” |

</details>

<details><summary><code>faml-7-10</code> · gap</summary>

Tagged pages: Policy Value, Expenses, Equivalence Principle

| Item | Kind | Status | Where |
|---|---|---|---|
| The expense policy value is the actuarial present value of future expenses minus the actuarial present value of future expense premiums, wh… | definition | missing |  |
| The level expense premium equals the present value of expenses (first-year commission and administrative expenses plus renewal expenses tim… | formula | missing |  |
| The gross premium policy value equals the net premium policy value plus the expense policy value, and the expense premium equals the gross … | fact | missing |  |
| The net level premium for a fully discrete whole life insurance equals the face amount times A_x divided by the annuity-due factor ä_x. | formula | tagged | Equivalence Principle: “Setting $E[L_0]=0$ gives $P = S\,A_x/\ddot{a}_x$.” |
| At duration t, the prospective expense policy value is (renewal expense per year minus the expense premium) times ä_{x+t}, using only renew… | procedure | missing |  |
| The expense policy value can be negative when the level expense premium exceeds the renewal expenses, since early premium margin is used to… | fact | tagged | Policy Value (collapsed): “The gross premium policy value is below the net premium policy value of the first example at the sa…” |

</details>

<details><summary><code>faml-7-11</code> · untagged</summary>

Tagged pages: Policy Value, Loss Random Variable

| Item | Kind | Status | Where |
|---|---|---|---|
| For a fully discrete whole life insurance with benefit B issued to (x), the loss at issue is L = B·v^(K_x+1) − P·ä_{K_x+1\|}, where K_x is … | formula | linked | Equivalence Principle: “$$L_0 = S\,v^{K_x+1} - P\,\ddot{a}_{\overline{K_x+1}\\|}$$” |
| The present value of an annuity-due certain over n periods is ä_{n\|} = (1 − v^n)/d, where d = i/(1+i). | formula | elsewhere | Annuity Due: “$$= \frac{1-v^n}{d}$$” |
| The whole life insurance actuarial present value and the whole life annuity-due are related by A_x = 1 − d·ä_x. | formula | syllabus | Life Annuity: “$d\,\ddot{a}_x + A_x = 1$, where $d = 1 - v = i/(1+i)$ is the effective rate of discount” |
| The net premium policy value at time t for a fully discrete whole life insurance is the prospective value tV = B·A_{x+t} − P·ä_{x+t}, the e… | formula | tagged | Policy Value: “${}_tV = \text{EPV}_t(\text{benefits} + \text{expenses}) - \text{EPV}_t(\text{premiums})$” |

</details>

<details><summary><code>faml-7-12</code> · answerable</summary>

Tagged pages: Policy Value, Recursion, Endowment Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| The recursive relation for fully discrete insurance reserves: (kV + P)(1+i) = b_{k+1} q_{x+k} + k+1V p_{x+k}, where P is the net premium, b… | formula | tagged | Policy Value: “\left({}_tV + P_t - e_t\right)(1+i_t) = {} & q_{x+t}\left(S_{t+1} + E_{t+1}\right) \\ & + p_{x+t}\,…” |
| In the final year of an n-year endowment insurance, the payment at the end of the year is the death benefit if the insured dies and the end… | fact | tagged | Endowment Insurance (collapsed): “A death in year $n$ is paid at time $n$, the same time as the maturity benefit. So $Z = v^n$ with p…” |
| The survival probability equals one minus the mortality probability (p_x = 1 - q_x), and the death benefit for the year in question is dete… | fact | linked | Term Life Insurance: “its EPV is $\sum_{k=0}^{n-1} b_{k+1}\,v^{k+1}\,{}_kp_x\,q_{x+k}$ for a benefit $b_{k+1}$ on death i…” |

</details>

<details><summary><code>faml-7-13</code> · answerable</summary>

Tagged pages: Modified Net Premium Policy Value, Policy Value, Endowment Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| Full preliminary term (FPT) reserving is a modified net premium reserve method in which the first-year valuation premium equals the APV of … | definition | tagged | Modified Net Premium Policy Value: “The standard method is **full preliminary term** (FPT): the first-year net premium only pays for on…” |
| The FPT reserve at time t for an n-year policy issued at age x equals the net premium policy value at time t-1 for an (n-1)-year policy iss… | fact | tagged | Modified Net Premium Policy Value: “$${}_tV^{FPT}_{x} = {}_{t-1}V_{x+1}, \quad t \geq 1$$” |
| The net premium policy value (prospective) at time t equals the APV of future benefits minus the APV of future net premiums: tV = A_{x+t:n-… | formula | tagged | Policy Value: “{}_{10}V &= 100{,}000\,A_{50:\overline{10}\\|} - P\,\ddot{a}_{50:\overline{10}\\|}” |
| The net level annual premium for a fully discrete endowment insurance is P_{x:n} = A_{x:n}/ä_{x:n}, and the endowment insurance APV satisfi… | formula | tagged | Endowment Insurance: “\ddot{a}_{x:\overline{n}\\|} = \frac{1 - A_{x:\overline{n}\\|}}{d}” |
| The reserve for an endowment insurance with unit benefit can be written as 1 - ä_{x+t:n-t}/ä_{x:n} (annuity-ratio form). | formula | tagged | Modified Net Premium Policy Value (collapsed): “For whole life, a net premium policy value is $S\left(1 - \ddot{a}_{x+t}/\ddot{a}_x\right)$” |
| The temporary (term-n) annuity-due APV is ä_{x:n} = ä_x - nE_x ä_{x+n}, where the pure endowment is nE_x = v^n × l_{x+n}/l_x. | formula | linked | Life Annuity: “$\ddot{a}_{x:\overline{n}\\|} = \ddot{a}_x - v^n\,{_n}p_x\,\ddot{a}_{x+n}$” |

</details>

<details><summary><code>faml-7-14</code> · answerable</summary>

Tagged pages: Policy Value, Recursion, Expenses

| Item | Kind | Status | Where |
|---|---|---|---|
| The gross premium policy value at a duration is the expected present value of future benefits plus expenses minus future gross premiums, us… | definition | tagged | Policy Value: “**Policy Value** ${}_tV$ is the amount an insurer needs at time $t$ for a long-term insurance or an…” |
| The recursion for gross premium policy values for a fully discrete whole life insurance is (V_t + G - e_t)(1+i) = q_{x+t}(b_{t+1} + claim e… | formula | tagged | Policy Value: “\left({}_tV + P_t - e_t\right)(1+i_t) = {} & q_{x+t}\left(S_{t+1} + E_{t+1}\right) \\ & + p_{x+t}\,…” |
| Claim (settlement) expenses are paid only upon death and are added to the death benefit in the year-end death payment of the recursion, whi… | fact | tagged | Policy Value: “In the second block (AMLCR chapter 7 notation), $P_t$ and $e_t$ are the premium and premium-related…” |
| The probability of survival over one year equals 1 minus the probability of death in that year (p_x = 1 − q_x). | fact | tagged | Policy Value (collapsed): “42{,}165.47 &= 0.0012085(100{,}200) + 0.9987915\,{}_{11}V” |

</details>

<details><summary><code>faml-7-15</code> · answerable</summary>

Tagged pages: Policy Value, Fractional Age Assumption, Recursion

| Item | Kind | Status | Where |
|---|---|---|---|
| A fractional-duration policy value recursion for a fully discrete insurance (no premium paid within the interval) is: the policy value at t… | procedure | tagged | Policy Value: “For $0 < s < 1$ the exact value comes from the same argument over a part year. It is ${}_{t+s}V = v…” |
| Under the uniform distribution of deaths (UDD) assumption, for 0 ≤ s+t ≤ 1, the survival probability from age x+s over t years is t p_{x+s}… | formula | tagged | Fractional Age Assumption: “For $0 \le t < t+s \le 1$, UDD gives ${}_sq_{x+t} = s\,q_x/(1 - t\,q_x)$” |
| Between premium dates in a fully discrete policy, no premium or benefit is paid unless death occurs, so the reserve at a fractional time is… | fact | tagged | Policy Value: “For $0 < s < 1$ the exact value comes from the same argument over a part year. It is ${}_{t+s}V = v…” |

</details>

<details><summary><code>faml-7-16</code> · answerable</summary>

Tagged pages: Future Loss Random Variable, Policy Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The prospective loss random variable at time t is the present value at time t of future benefits minus the present value of future gross pr… | definition | tagged | Future Loss Random Variable: “is the present value, at time $t$, of the insurer's future outgo less the present value of its futu…” |
| The APV of a fully discrete whole life insurance is the sum over future years of benefit times discount factor v^(k+1) times the probabilit… | procedure | linked | Whole Life Insurance: “$$A_x = \sum_{k=0}^{\infty} v^{k+1}\,{_k}p_x\,q_{x+k}$$” |
| The APV of insurance at an older age can be used as a terminal value after a finite sequence of explicit years: the benefit from that later… | fact | linked | Whole Life Insurance: “$$A_x = v\,q_x + v\,p_x\,A_{x+1}$$” |
| The APV of a limited-payment premium stream is the premium times a temporary annuity-due, summing v^k times k-year survival probability onl… | procedure | linked | Health Insurance: “$$\text{EPV(premiums)} = P\sum_{k=0}^{n-1} v^{k}\;{}_kp_x^{00}$$” |
| At time t only the remaining premium payments after time t count for the prospective loss; for an n-payment policy at duration t < n, there… | fact | tagged | Policy Value (collapsed): “"Just before" the premium at time $t$ counts that premium as future income, and "just after" does n…” |

</details>

<details><summary><code>faml-7-17</code> · answerable</summary>

Tagged pages: Loss Random Variable, Variance, Policy Value

| Item | Kind | Status | Where |
|---|---|---|---|
| For a fully discrete whole life insurance of 1 with annual premium P, the prospective loss at time k is kL = v^{K+1} - P·ä_{K+1}, which equ… | formula | linked | Equivalence Principle: “L_0 = S\,v^{K_x+1} - P\,\ddot{a}_{\overline{K_x+1}\\|}” |
| The variance of the prospective loss at time k for a fully discrete whole life insurance is (1 + P/d)^2 (²A_{x+k} − (A_{x+k})^2), i.e. the … | formula | linked | Equivalence Principle: “\text{Var}(L_0) = \left(S + P/d\right)^2\left({}^2\!A_x - A_x^2\right)” |
| The variance of a constant-multiple transformation aZ + b equals a^2 Var(Z); the premium P and d are the same at every duration, so the fac… | fact | tagged | Variance: “\text{Var}(aX + b) = a^2 \text{Var}(X)” |
| The one-year recursion for whole life insurance: A_{x} = v·q_x + v·p_x·A_{x+1}. | formula | syllabus | Whole Life Insurance: “A_x = v\,q_x + v\,p_x\,A_{x+1}” |
| The second moment of the whole life insurance present value satisfies the recursion ²A_x = v²·q_x + v²·p_x·²A_{x+1}, using the squared disc… | formula | syllabus | Whole Life Insurance: “the second moment ${}^2\!A_x$ of the present value is $A_x$ at discount factor $v^2$ (double the fo…” |

</details>

<details><summary><code>faml-7-18</code> · answerable</summary>

Tagged pages: Policy Value, Whole Life Insurance, Annuity Due

| Item | Kind | Status | Where |
|---|---|---|---|
| The net premium policy value at time t for a fully discrete whole life insurance equals the prospective difference A_{x+t} − P_x · ä_{x+t},… | formula | tagged | Policy Value (collapsed): “{}_{10}V &= 100{,}000\,A_{50:\overline{10}\\|} - P\,\ddot{a}_{50:\overline{10}\\|}” |
| For whole life insurance, A_x = 1 − d·ä_x, where d = i/(1+i) is the discount rate. | formula | tagged | Whole Life Insurance: “since $\ddot{a}_x = (1 - A_x)/d$, $P$ follows from $A_x$ and $d$ alone” |
| The net level premium for a fully discrete whole life insurance satisfies P_x = A_x/ä_x, and P_x + d = 1/ä_x. | formula | tagged | Whole Life Insurance: “$$P = \frac{A_x}{\ddot{a}_x}$$” |
| The whole life annuity-due satisfies the recursion ä_x = 1 + v·p_x·ä_{x+1}, where p_x = 1 − q_x and v = 1/(1+i). | formula | linked | Life Annuity: “\ddot{a}_x = 1 + v\,p_x\,\ddot{a}_{x+1}” |

</details>

<details><summary><code>faml-7-19</code> · answerable</summary>

Tagged pages: Policy Value, Equivalence Principle, Expenses, Whole Life Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| The gross premium policy value at time t is the expected present value of future benefits plus future expenses minus the expected present v… | definition | tagged | Policy Value: “{}_tV = \text{EPV}_t(\text{benefits} + \text{expenses}) - \text{EPV}_t(\text{premiums})” |
| Under the equivalence principle, the gross premium is set so that the expected present value of premiums equals the expected present value … | fact | tagged | Equivalence Principle: “the expected present value (EPV) of the premiums equals the EPV of the benefits, plus the EPV of th…” |
| For a fully discrete whole life insurance with a percentage-of-premium expense structure, the gross premium equation is G*ddot_a_x*(1 - ren… | formula | tagged | Equivalence Principle (collapsed): “G\,\ddot{a}_{45:\overline{20}\\|} &= 100{,}000A_{45} + 0.5G + 250 + (0.05G + 50)(\ddot{a}_{45:\overl…” |
| The policy value for a fully discrete whole life insurance just after the premium at duration t is face*A_{x+t} - (1 - renewal expense %)*G… | formula | linked | Modified Net Premium Policy Value (collapsed): “For whole life, a net premium policy value is $S\left(1 - \ddot{a}_{x+t}/\ddot{a}_x\right)$, and th…” |
| Immediately after the second premium (time 1), the premium and renewal expense have already been paid and are applied at renewal rate, so t… | fact | tagged | Policy Value (collapsed): “"Just before" the premium at time $t$ counts that premium as future income, and "just after" does n…” |
| Actuarial present values A_x and ddot_a_x are read from the specified mortality table (e.g., Standard Ultimate Life Table) at the given int… | fact | tagged | Policy Value (collapsed): “On the SULT at $5\%$, $A_{40:\overline{20}\\|} = 0.381263$, $\ddot{a}_{40:\overline{20}\\|} = 12.9934…” |

</details>

<details><summary><code>faml-7-20</code> · answerable</summary>

Tagged pages: Modified Net Premium Policy Value, Policy Value, Equivalence Principle, Expenses

| Item | Kind | Status | Where |
|---|---|---|---|
| Under the equivalence principle, the gross premium equals the actuarial present value of benefits plus expenses divided by the annuity-due … | formula | tagged | Expenses: “In words, premium equals expected loss plus fixed expense, divided by one minus the sum of the vari…” |
| The gross premium policy value at time t is the prospective present value of future benefits plus future expenses minus future gross premiu… | formula | tagged | Policy Value: “${}_tV = \text{EPV}_t(\text{benefits} + \text{expenses}) - \text{EPV}_t(\text{premiums})$” |
| The Full Preliminary Term (FPT) method modifies the net premium reserve by treating the first year as one-year term insurance, so the modif… | definition | tagged | Modified Net Premium Policy Value: “The standard method is **full preliminary term** (FPT): the first-year net premium only pays for on…” |
| For a fully discrete whole life insurance, the FPT modified reserve at the end of the first policy year is zero, because the reserve at tim… | fact | tagged | Modified Net Premium Policy Value: “FPT spends the first year's premium on the cost of cover only, which gives ${}_1V^{FPT} = 0$.” |

</details>

<details><summary><code>faml-7-21</code> · answerable</summary>

Tagged pages: Policy Value, Deferred Annuity, Equivalence Principle

| Item | Kind | Status | Where |
|---|---|---|---|
| The equivalence principle sets the actuarial present value of net premiums equal to the actuarial present value of benefits at issue, which… | procedure | tagged | Equivalence Principle: “the expected present value (EPV) of the premiums equals the EPV of the benefits, plus the EPV of th…” |
| The actuarial present value of a deferred annuity-due is the deferral discount factor times the survival probability times the annuity-due … | formula | syllabus | Pure Endowment: “That is how a deferred annuity is valued, ${}_{n\\|}\ddot{a}_x = {}_nE_x\,\ddot{a}_{x+n}$” |
| A temporary annuity-due value is ä_{x:n} = ä_x − n\|ä_x, and a premium paid for n years has present value π·ä_{x:n}. | formula | linked | Life Annuity: “$\ddot{a}_{x:\overline{n}\\|} = \ddot{a}_x - v^n\,{_n}p_x\,\ddot{a}_{x+n}$” |
| A benefit returning premiums without interest on death in year k has present value π·(IA)^1_{x:n}, so the net premium equation is π·ä_{x:n}… | formula | syllabus | Term Life Insurance: “its EPV is $\sum_{k=0}^{n-1} b_{k+1}\,v^{k+1}\,{}_kp_x\,q_{x+k}$ for a benefit $b_{k+1}$ on death i…” |
| The net premium policy value at time t is the actuarial present value of future benefits minus the actuarial present value of future net pr… | definition | tagged | Policy Value: “the expected present value (EPV) at $t$ of the future benefits and expenses, less the EPV of the fu…” |
| At the end of year 9 of a 10-year premium/death-benefit period, future cash flows are one more premium paid at time 9, a death benefit of t… | fact | tagged | Policy Value (collapsed): “"Just before" the premium at time $t$ counts that premium as future income, and "just after" does n…” |
| The one-year term insurance APV is A^1_{x:1} = v·q_x, and the one-year deferred value is 1\|ä_x = v·p_x·ä_{x+1}, where p_x = 1 − q_x is com… | formula | syllabus | Term Life Insurance: “The recursion $A^{1}_{x:\overline{n}\\|} = v\,q_x + v\,p_x\,A^{1}_{x+1:\overline{n-1}\\|}$ gives the …” |

</details>

<details><summary><code>faml-7-22</code> · answerable</summary>

Tagged pages: Loss Random Variable, Variance, Whole Life Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| For a fully discrete whole life insurance with death benefit B and annual net premium P, the loss at issue is L = B v^(K+1) - P ä_{K+1}, wh… | formula | syllabus | Future Loss Random Variable: “$$L_0 = \left(S + \frac{P}{d}\right)v^{K_x+1} - \frac{P}{d}$$” |
| The variance of the loss at issue for a fully discrete whole life policy is (B + P/d)^2 (²A_x − A_x²), where d = i/(1+i) is the discount ra… | formula | syllabus | Future Loss Random Variable: “$$\text{Var}(L_0) = \left(S + \frac{P}{d}\right)^2\left({}^2A_x - A_x^2\right)$$” |
| Policies priced with the same mortality table and interest rate share the same A_x and ²A_x per unit of benefit, so the factor (²A_x − A_x²… | fact | tagged | Whole Life Insurance: “the second moment ${}^2\!A_x$ of the present value is $A_x$ at discount factor $v^2$ (double the fo…” |
| The discount rate is d = i/(1+i), so 1/d = (1+i)/i. | formula | linked | Life Annuity: “$d = 1 - v = i/(1+i)$” |

</details>

<details><summary><code>faml-7-23</code> · answerable</summary>

Tagged pages: Modified Net Premium Policy Value, Endowment Insurance, Equivalence Principle

| Item | Kind | Status | Where |
|---|---|---|---|
| Under a modified net premium reserving method, the valuation premiums are set so that their actuarial present value at issue equals the act… | fact | tagged | Modified Net Premium Policy Value: “Both premium patterns satisfy the [[Equivalence Principle\\|equivalence principle]], so they have th…” |
| The actuarial present value of a stream of premiums is the premium times the relevant annuity-due factor, with premiums after a deferral pe… | formula | linked | Pure Endowment: “That is how a deferred annuity is valued, ${}_{n\\|}\ddot{a}_x = {}_nE_x\,\ddot{a}_{x+n}$” |
| A temporary annuity-due of n years starting at age x equals the sum of an n-year temporary annuity-due, a deferred n-year pure endowment, a… | fact | linked | Life Annuity: “**Temporary** annuity (pays until death or $n$ years, whichever comes first): $\ddot{a}_{x:\overlin…” |
| The first-year net cost of insurance for a one-year term cover is the present value of the expected death benefit for the year: v·q_x per u… | formula | tagged | Modified Net Premium Policy Value: “$$P^{FPT}_0 = S\,v\,q_x$$” |
| Net premium for a policy with face amount B is B times the premium per unit of benefit, so unit-based results (premium per 1) are scaled by… | fact | tagged | Modified Net Premium Policy Value: “$$P^{FPT} = \frac{S\,A_{x+1}}{\ddot{a}_{x+1}}$$” |

</details>

<details><summary><code>faml-7-24</code> · answerable</summary>

Tagged pages: Equivalence Principle, Expenses, Whole Life Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| The gross premium equals the net premium plus the expense loading, so the expense loading is the gross premium minus the net premium. | definition | tagged | Equivalence Principle: “**Net vs gross:** leave expenses out and the result is the **net premium**; include them and it is …” |
| For a fully discrete whole life insurance with benefit B on (x), the net premium by the equivalence principle is B * A_x / ä_x. | formula | tagged | Equivalence Principle: “Setting $E[L_0]=0$ gives $P = S\,A_x/\ddot{a}_x$.” |
| Obtain A_x and ä_x for a given age from the Standard Ultimate Life Table (at the given interest rate) to evaluate premiums. | procedure | tagged | Equivalence Principle (collapsed): “Using the Standard Ultimate Life Table at $i = 5\%$ ($A_{50} = 0.18931$, ${}^2\!A_{50} = 0.05108$, …” |

</details>

<details><summary><code>faml-7-25</code> · untagged</summary>

Tagged pages: Modified Net Premium Policy Value, Whole Life Insurance, Life Table

| Item | Kind | Status | Where |
|---|---|---|---|
| The Full Preliminary Term (FPT) reserve method assumes first-year reserve is zero (first-year cost of insurance is covered by a first-year … | definition | tagged | Modified Net Premium Policy Value: “The standard method is **full preliminary term** (FPT): the first-year net premium only pays for on…” |
| The FPT reserve at time t (t≥1) equals the prospective reserve: benefit times A at attained age minus the FPT renewal premium times the ann… | formula | elsewhere | Commissioners Reserve Valuation Method: “${}_tV^{\text{CRVM}} = S\,A_{x+t} - \beta\,\ddot{a}_{x+t:\overline{n-t}\\|}$” |
| The net level annual premium for a fully discrete whole life insurance is P = A/ä. | formula | tagged | Whole Life Insurance: “$P = \frac{A_x}{\ddot{a}_x}$” |
| The whole life annuity-due and insurance are related by ä_x = (1 − A_x)/d, where d = i/(1+i). | formula | tagged | Whole Life Insurance: “since $\ddot{a}_x = (1 - A_x)/d$” |
| In a select-and-ultimate table with select period k, values at attained age beyond the select period are ultimate, so A_{[x]+t} with t ≥ k … | fact | elsewhere | Mortality Table Construction: “A table therefore gives select rates $q_{[x]+t}$ for durations within the select period and ultimat…” |

</details>

<details><summary><code>faml-7-26</code> · gap</summary>

Tagged pages: Policy Value, Recursion, Endowment Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| The fully discrete recursion for net premium policy values is (kV + P)(1+i) = q_{x+k}·b_{k+1} + p_{x+k}·(k+1)V, where b_{k+1} is the death … | formula | tagged | Policy Value: “\left({}_tV + P_t - e_t\right)(1+i_t) = {} & q_{x+t}\left(S_{t+1} + E_{t+1}\right) \\… & + p_{x+t}\…” |
| When the death benefit equals a fixed amount plus the end-of-year policy value, the net amount at risk is just the fixed amount, so the pol… | fact | missing |  |
| The initial net premium policy value at time 0 is zero under the equivalence principle for a level net premium. | fact | linked | Future Loss Random Variable: “Under the [[Equivalence Principle\\|equivalence principle]] $E[L_0] = 0$, and at a later time the ex…” |
| For an n-year endowment insurance, the policy value just before the maturity benefit is paid (at time n, for survivors) equals the maturity… | fact | linked | Thiele's Differential Equation (collapsed): “For an endowment, ${}_nV$ is the maturity benefit rather than 0” |
| The probability of death in a year is q = 1 − p, where p is the one-year survival probability. | fact | syllabus | Mortality (collapsed): “{}_2q^*_{60} &= 1 - (1 - 0.015)(1 - 0.0165)” |

</details>

<details><summary><code>faml-7-27</code> · gap</summary>

Tagged pages: Policy Value, Expenses, Equivalence Principle, Endowment Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| When the gross premium is set by the equivalence principle, the gross policy value at time 0 equals zero (the expected present value of fut… | fact | tagged | Equivalence Principle: “sets a [[Insurance Premium\\|premium]] so that the expected present value of the future loss random …” |
| The expense policy value is the expected present value of future expenses minus the expected present value of future expense premiums (the … | definition | missing |  |
| The gross premium policy value equals the net (benefit) policy value plus the expense policy value, so the expense premium is the gross pre… | fact | missing |  |
| The fully discrete policy value recursion: (tV + G − expenses)(1+i) = q_{x+t}·(benefit) + p_{x+t}·(t+1)V; for the expense component, (tV^e … | formula | linked | Reserve: “$$\left({}_tV + P_t - E_t\right)(1+i) = q_{x+t}\,S + p_{x+t}\;{}_{t+1}V$$” |
| Expenses given as a percent of premium plus a per-policy amount are subtracted at the start of the year as (percent × G + per-policy amount… | fact | tagged | Equivalence Principle (collapsed): “Expenses are 50% of the first premium plus \$250 at issue, then 5% of each later premium plus \$50 …” |

</details>

<details><summary><code>faml-7-28</code> · answerable</summary>

Tagged pages: Policy Value, Equivalence Principle, Whole Life Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| The net premium policy value (prospective reserve) at time t equals the actuarial present value of future benefits minus the actuarial pres… | definition | tagged | Policy Value: “**Policy Value** ${}_tV$ is the amount an insurer needs at time $t$ for a long-term insurance or an…” |
| If the policy value at time t is zero, the actuarial present value of future benefits equals the actuarial present value of future premiums… | fact | tagged | Policy Value: “$${}_tV = \text{EPV}_t(\text{benefits} + \text{expenses}) - \text{EPV}_t(\text{premiums})$$” |
| By the equivalence principle, at issue the actuarial present value of benefits equals the actuarial present value of net premiums. | fact | tagged | Equivalence Principle: “the expected present value (EPV) of the premiums equals the EPV of the benefits” |
| The actuarial present value of a whole life insurance of 1,000 with a fully discrete payment is 1000*A_x, and a premium paid at the start o… | formula | tagged | Equivalence Principle: “Setting $E[L_0]=0$ gives $P = S\,A_x/\ddot{a}_x$.” |
| A deferred annuity-due starting after n years has APV n\|ä_x = nE_x * ä_{x+n}, where nE_x is the pure endowment (discount and survival) fac… | procedure | syllabus | Pure Endowment: “That is how a deferred annuity is valued, ${}_{n\\|}\ddot{a}_x = {}_nE_x\,\ddot{a}_{x+n}$” |
| The APV of a premium stream that changes after n years is the level premium annuity-due for the first n years (temporary annuity ä_{x:n}) p… | procedure | linked | Term Life Insurance (collapsed): “\ddot{a}_{50:\overline{10}\\|} &= 17.0245 - 0.60182(14.9041)” |
| Values of A_x, ä_x and nE_x for the Standard Ultimate Life Table at i = 5% are obtained from the table (or its tabulated values). | fact | tagged | Equivalence Principle (collapsed): “Using the Standard Ultimate Life Table at $i = 5\%$ ($A_{50} = 0.18931$, ${}^2\!A_{50} = 0.05108$, …” |

</details>

<details><summary><code>faml-7-29</code> · gap</summary>

Tagged pages: Policy Value, Expenses, Equivalence Principle, Whole Life Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| The net premium (benefit) policy value at time t for a fully discrete whole life insurance of B equals B(1 - ä_{x+t}/ä_x), by the prospecti… | formula | linked | Modified Net Premium Policy Value (collapsed): “For whole life, a net premium policy value is $S\left(1 - \ddot{a}_{x+t}/\ddot{a}_x\right)$, and th…” |
| For whole life insurance, A_x = 1 - d·ä_x, where d = i/(1+i) is the discount rate. | formula | tagged | Whole Life Insurance: “since $\ddot{a}_x = (1 - A_x)/d$, $P$ follows from $A_x$ and $d$ alone” |
| Under the equivalence principle, the gross premium is set so the expected present value of gross premiums equals the expected present value… | procedure | tagged | Equivalence Principle: “the expected present value (EPV) of the premiums equals the EPV of the benefits, plus the EPV of th…” |
| The gross premium policy value at time t (prospective) equals the EPV of future benefits plus future expenses minus the EPV of future gross… | formula | tagged | Policy Value: “$${}_tV = \text{EPV}_t(\text{benefits} + \text{expenses}) - \text{EPV}_t(\text{premiums})$$” |
| The gross premium policy value equals the net premium policy value plus an expense policy value, where the expense reserve is the EPV of fu… | fact | missing |  |

</details>

<details><summary><code>faml-7-30</code> · gap</summary>

Tagged pages: Future Loss Random Variable, Policy Value, Whole Life Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of future losses random variable L_t at time t is the present value of future benefits minus the present value of future … | definition | tagged | Future Loss Random Variable: “The **Future Loss Random Variable** ${}_tL$ of a long-term insurance or annuity is the present valu…” |
| For a limited-pay whole life policy that has passed its premium-paying period, no future premiums remain, so the future loss equals the pre… | fact | missing |  |
| The expected present value of a fully discrete whole life insurance of amount b issued at age x is b·A_x, with A_x evaluated using the life… | formula | tagged | Whole Life Insurance: “In the life-table model of Exam MAS-I the benefit is paid at the **end of the year of death**, and …” |
| At an interest rate of 0%, there is no discounting, so the present value of a whole life death benefit equals the full benefit amount with … | fact | missing |  |

</details>

<details><summary><code>faml-7-31</code> · gap</summary>

Tagged pages: Policy Value, Expenses, Equivalence Principle, Endowment Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| The expense policy value at time t is the actuarial present value of future expenses minus the actuarial present value of future expense lo… | definition | missing |  |
| The gross premium equals the benefit (net) premium plus an expense loading, so the net premium component is the gross premium minus the exp… | fact | tagged | Policy Value: “The gross premium is the premium actually charged, with loadings for expenses and profit.” |
| At the end of year n-1 of an n-year contract, only the final year's expenses (percent of premium times G plus per-policy amount, paid at st… | procedure | missing |  |

</details>

<details><summary><code>faml-7-32</code> · untagged</summary>

Tagged pages: Future Loss Random Variable, Variance, Whole Life Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| The prospective loss random variable at issue for a fully continuous whole life policy with benefit b and premium rate P is L = b·v^T − P·ā… | definition | tagged | Future Loss Random Variable: “A fully continuous whole life has $L_0 = \left(S + P/\delta\right)e^{-\delta T_x} - P/\delta$.” |
| The present value of a continuous annuity-certain of 1 per year for T years is ā_{T\|} = (1 − v^T)/δ, which lets the loss be written as a l… | formula | elsewhere | Continuous Annuity: “Equivalent forms: $\bar{a}_{\overline{n}\\|} = \dfrac{1 - e^{-\delta n}}{\delta}$ and $\bar{s}_{\ove…” |
| For constants a and c, Var(a·X + c) = a²·Var(X); adding a constant does not change the variance, and a multiplier scales it by its square. | fact | tagged | Variance: “$\text{Var}(aX + b) = a^2 \text{Var}(X)$ — scaling changes variance, shifts do not” |
| Rewrite the loss as (b + P/δ)·v^T − P/δ, so its variance equals (b + P/δ)² · Var(v^T); policies on the same life and interest differ only i… | procedure | tagged | Future Loss Random Variable: “A fully continuous whole life has $L_0 = \left(S + P/\delta\right)e^{-\delta T_x} - P/\delta$.” |

</details>

<details><summary><code>faml-7-33</code> · answerable</summary>

Tagged pages: Policy Value, Endowment Insurance, Life Table

| Item | Kind | Status | Where |
|---|---|---|---|
| The net premium policy value at time t is the expected present value of future benefits minus the expected present value of future net prem… | definition | tagged | Policy Value: “${}_tV$ is the amount an insurer needs at time $t$ for a long-term insurance or annuity policy stil…” |
| An endowment insurance's EPV equals the EPV of a term insurance plus the EPV of a pure endowment, so the term insurance factor is A_{x:n} m… | fact | tagged | Endowment Insurance: “$$A_{x:\overline{n}\\|} = A^{1}_{x:\overline{n}\\|} + {}_nE_x$$” |
| Under the uniform distribution of deaths (UDD) assumption, the continuous (death at moment of death) term insurance APV equals (i/δ) times … | formula | tagged | Endowment Insurance: “under UDD only the term part is converted to continuous, $\bar{A}_{x:\overline{n}\\|} = \frac{i}{\de…” |
| A semi-continuous insurance pays the death benefit at the moment of death (continuous insurance APV) while premiums are paid annually at th… | fact | tagged | Endowment Insurance: “under UDD only the term part is converted to continuous, $\bar{A}_{x:\overline{n}\\|} = \frac{i}{\de…” |
| The EPV of future net premiums is the premium times the temporary life annuity-due factor ä_{x+t:n-t}, paid while the insured survives over… | formula | tagged | Policy Value: “{}_{10}V &= 100{,}000\,A_{50:\overline{10}\\|} - P\,\ddot{a}_{50:\overline{10}\\|} \\” |
| The policy value at duration t uses the attained age x+t and remaining term n−t, with values (e.g., A_{x:n}, nEx, ä) obtained from the give… | procedure | tagged | Policy Value: “{}_{10}V &= 100{,}000\,A_{50:\overline{10}\\|} - P\,\ddot{a}_{50:\overline{10}\\|} \\” |

</details>

<details><summary><code>faml-7-34</code> · untagged</summary>

Tagged pages: Policy Value, Recursion

| Item | Kind | Status | Where |
|---|---|---|---|
| Between consecutive premium dates, the policy value at the start plus any premium paid, accumulated with interest for the interval, equals … | fact | tagged | Policy Value: “${}_{t+s}V = v^{1-s}[{}_{1-s}q_{x+t+s}(S_{t+1} + E_{t+1}) + {}_{1-s}p_{x+t+s}\,{}_{t+1}V]$” |
| Under the uniform distribution of deaths (UDD) assumption, s·q_x = s·q_x for 0≤s≤1, and the probability of surviving a fractional period fr… | formula | syllabus | Fractional Age Assumption: “For $0 \le t < t+s \le 1$, UDD gives ${}_sq_{x+t} = s\,q_x/(1 - t\,q_x)$, while a constant force gi…” |
| The death probability over a fractional interval is the complement of the survival probability, _s q_{x+t} = 1 - _s p_{x+t}. | fact | elsewhere | Conditional Probability: “$$P(A^c \mid B) = 1 - P(A \mid B)$$” |
| For a policy with premiums paid at the start of each quarter and death benefit paid at the end of the quarter of death, a policy value at a… | procedure | tagged | Policy Value: “${}_{t+s}V = v^{1-s}[{}_{1-s}q_{x+t+s}(S_{t+1} + E_{t+1}) + {}_{1-s}p_{x+t+s}\,{}_{t+1}V]$” |

</details>

<details><summary><code>faml-7-35</code> · answerable</summary>

Tagged pages: Modified Net Premium Policy Value, Whole Life Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| A modified net premium reserve method uses valuation premiums that differ from the level net premium (e.g., a lower premium in early years … | definition | tagged | Modified Net Premium Policy Value: “**A Modified Net Premium Policy Value** is a net premium [[Policy Value\\|policy value]] calculated …” |
| The prospective reserve at duration t for a fully discrete whole life insurance equals the present value of future benefits minus the prese… | formula | linked | Policy Value: “$${}_tV = \text{EPV}_t(\text{benefits} + \text{expenses}) - \text{EPV}_t(\text{premiums})$$” |
| When the modified reserve at a duration is 0 and subsequent valuation premiums are level, the level premium from that point equals the bene… | fact | tagged | Whole Life Insurance: “$$P = \frac{A_x}{\ddot{a}_x}$$” |
| Look up the values of A_x and ä_x at the required attained age from the Standard Ultimate Life Table (at the given interest rate) in the ex… | procedure | linked | Term Life Insurance (collapsed): “On the SULT at $5\%$, $A_{50} = 0.18931$, $A_{60} = 0.29028$, ${}^2A_{50} = 0.05108$, ${}^2A_{60} =…” |

</details>

<details><summary><code>faml-7-36</code> · gap</summary>

Tagged pages: Policy Value, Recursion, Expenses

| Item | Kind | Status | Where |
|---|---|---|---|
| The gross premium policy value recursion for a fully discrete whole life insurance is (kV + P − e)(1+i) = q·b + p·(k+1)V, where P is the gr… | formula | tagged | Policy Value: “\left({}_tV + P_t - e_t\right)(1+i_t) = {} & q_{x+t}\left(S_{t+1} + E_{t+1}\right) \\ & + p_{x+t}\,…” |
| A policy value at time k depends only on future benefits, premiums, expenses and mortality assumptions, so an error in the mortality rate f… | fact | tagged | Policy Value: “the expected present value (EPV) at $t$ of the future benefits and expenses, less the EPV of the fu…” |
| To find the effect of a changed assumption on a policy value, write the recursion under both assumptions and subtract them, so that terms u… | procedure | missing |  |

</details>

<details><summary><code>faml-7-37</code> · answerable</summary>

Tagged pages: Policy Value, Endowment Insurance, Annuity Due

| Item | Kind | Status | Where |
|---|---|---|---|
| The net premium policy value (prospective reserve) at time t equals the expected present value of future benefits minus the expected presen… | fact | tagged | Policy Value: “${}_tV = \text{EPV}_t(\text{benefits} + \text{expenses}) - \text{EPV}_t(\text{premiums})$” |
| The EPV of future level premiums on a fully discrete n-year endowment insurance is the annual premium times the temporary annuity-due, wher… | formula | linked | Life Annuity: “**Temporary** annuity (pays until death or $n$ years, whichever comes first): $\ddot{a}_{x:\overlin…” |
| The n-year pure endowment factor nEx = v^n * npx is the EPV of 1 paid at the end of n years if the life survives, and it is used to relate … | formula | linked | Pure Endowment: “${}_nE_x = A^{\phantom{x:}1}_{x:\overline{n}\\|} = v^n\,{}_np_x$” |
| Premiums are payable only during the premium-paying period, so for a 20-year endowment at the end of year 15 the remaining premiums are pai… | fact | linked | Term Life Insurance (collapsed): “Premiums for an $n$-year term are payable for at most $n$ years, so the premium uses $\ddot{a}_{x:\…” |
| Annuity-due and survival values for a given attained age and mortality basis (e.g., Standard Ultimate Life Table at i=5%) are read from the… | fact | linked | Life Annuity (collapsed): “The Illustrative Life Table ($i = 0.06$) gives $1000q_{40} = 2.78$, $\ddot{a}_{41} = 14.6864$ and $…” |

</details>

<details><summary><code>faml-7-38</code> · answerable</summary>

Tagged pages: Policy Value, Expenses, Annuity Due

| Item | Kind | Status | Where |
|---|---|---|---|
| The gross premium policy value at time k equals the EPV of future benefits plus the EPV of future expenses (including commissions and premi… | fact | tagged | Policy Value: “the expected present value (EPV) at $t$ of the future benefits and expenses, less the EPV of the fu…” |
| Premium taxes are an expense proportional to each gross premium paid, so changing the tax rate changes only the EPV of future expenses, not… | fact | tagged | Expenses: “The tax multiplier carries premium taxes and assessments, which are levied on whatever premium is f…” |
| The EPV of future premium-proportional expenses equals the expense per premium (rate times premium) multiplied by the EPV of a temporary an… | procedure | linked | Equivalence Principle (collapsed): “(0.05G + 50)(\ddot{a}_{45:\overline{20}\\|} - 1)” |
| For a limited-pay policy with n premium payments, at the end of year k the insured is age x+k and has n−k premium payments remaining, so th… | fact | linked | Reserve (collapsed): “Ten premiums remain.” |

</details>

<details><summary><code>faml-7-39</code> · gap</summary>

Tagged pages: Policy Value, Recursion, Deferred Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| The one-year recursion for net premium policy values: (tV + P)(1+i) = q_{x+t} × (death benefit paid at t+1) + p_{x+t} × t+1V, i.e. the poli… | formula | tagged | Policy Value: “The amount held after the premium is paid, rolled up with interest, pays the expected claims and fu…” |
| When no death benefit is payable during the deferral period of a deferred annuity, the death benefit term in the policy value recursion is … | fact | missing |  |
| The probability of survival over one year equals one minus the probability of death: p_x = 1 − q_x. | formula | elsewhere | Conditional Probability: “The complement rule holds conditionally: the probability of the complement of an event given $B$ is…” |
| For premiums paid at the beginning of each year, the policy value at time t (before the premium at t is paid) is defined so that the premiu… | fact | tagged | Policy Value (collapsed): “"Just before" the premium at time $t$ counts that premium as future income, and "just after" does n…” |

</details>

<details><summary><code>faml-7-40</code> · answerable</summary>

Tagged pages: Modified Net Premium Policy Value, Whole Life Insurance

| Item | Kind | Status | Where |
|---|---|---|---|
| A modified net premium reserve method uses modified (non-benefit) valuation premiums that differ from the net level premium in early years,… | definition | tagged | Modified Net Premium Policy Value: “calculated with a net premium that is lower in the first year and higher afterwards, so that the po…” |
| The prospective net premium reserve at duration t for a fully discrete whole life insurance of face amount F is F·A_{x+t} minus the valuati… | formula | linked | Policy Value: “{}_{10}V &= 100{,}000\,A_{50:\overline{10}\\|} - P\,\ddot{a}_{50:\overline{10}\\|}” |
| When valuation premiums are level from some duration onward, the modified premium for those years is determined by the condition that the m… | fact | tagged | Modified Net Premium Policy Value: “P^{FPT} = \frac{S\,A_{x+1}}{\ddot{a}_{x+1}}” |
| Whole life insurance and annuity-due values at specific ages are read from the Standard Ultimate Life Table at the given interest rate. | fact | tagged | Modified Net Premium Policy Value (collapsed): “On the SULT at $5\%$, $q_{40} = 0.0005272$, $A_{40} = 0.121059$, $\ddot{a}_{40} = 18.45776$, $A_{41…” |

</details>

<details><summary><code>faml-7-41</code> · untagged</summary>

Tagged pages: Future Loss Random Variable, Percentile, Life Table

| Item | Kind | Status | Where |
|---|---|---|---|
| The gross future loss random variable at time t is the present value at time t of future benefits and expenses minus the present value of f… | definition | tagged | Future Loss Random Variable: “The **Future Loss Random Variable** ${}_tL$ of a long-term insurance or annuity is the present valu…” |
| For a return-of-premium endowment benefit, the survival benefit equals accumulated gross premiums paid at the stated interest rate (an accu… | procedure | elsewhere | Annuity Due: “$$= \frac{(1+i)^n - 1}{d}$$” |
| The present value of premiums net of renewal commission over n years is the commission-adjusted premium (1 minus commission rate) times G t… | formula | tagged | Future Loss Random Variable: “$\ddot{a}_{\overline{k}\\|} = (1 - v^k)/d$” |
| When the death benefit is a level amount and premiums are level, the loss from death in year k+1 decreases as the time of death is later (s… | fact | tagged | Future Loss Random Variable: “The insurer loses money exactly when the benefit's present value exceeds its EPV, which means when …” |
| The p-th percentile of a loss random variable that is decreasing in time of death is found by identifying the death time such that the prob… | procedure | tagged | Percentile: “The **Percentile** (or quantile) $x_p$ of a [[Random Variable]] $X$ is the smallest value at which …” |
| For a fully discrete insurance, the death benefit is paid at the end of the year of death, so the loss for death within a given policy year… | fact | tagged | Future Loss Random Variable: “$$L_0 = S\,v^{K_x+1} - P\,\ddot{a}_{\overline{K_x+1}\\|}$$” |
| The Standard Ultimate Life Table gives l_x values used to compute conditional survival probabilities for the life age x. | fact | tagged | Life Table: “$$_{t}p_x = \frac{\ell_{x+t}}{\ell_x}, \qquad _{t}q_x = 1 - {}_{t}p_x = \frac{\ell_x - \ell_{x+t}}{…” |

</details>

<details><summary><code>fams-001</code> · answerable</summary>

Tagged pages: Limited Fluctuation Credibility, Full Credibility Standard, Pareto Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| For aggregate (total payment) full credibility with a compound Poisson model, the expected number of claims needed is (z/k)^2 * (1 + Var(X)… | formula | tagged | Full Credibility Standard: “**[[Aggregate Loss Model\\|Aggregate]]** loss with Poisson frequency: $n_F = (z/k)^2\left(1 + \mathr…” |
| For full credibility with probability p and tolerance k, the normal critical value is the percentile at (1+p)/2, e.g., 90% probability corr… | fact | tagged | Full Credibility Standard: “$p = 0.90 \Rightarrow z_{0.95} = 1.645$, and $k = 0.05$:” |
| A Pareto distribution with parameters theta and alpha has mean theta/(alpha-1) and second moment 2*theta^2/((alpha-1)(alpha-2)). | formula | tagged | Pareto Distribution: “$$E[X^k] = \frac{\theta^k\,k!}{(\alpha - 1)\cdots(\alpha - k)}, \quad k < \alpha$$” |
| The variance of a random variable equals its second moment minus the square of its mean. | formula | linked | Single-Parameter Pareto Distribution: “the variance is $E[X^2] - E[X]^2$ from the moment formula” |

</details>

<details><summary><code>fams-002</code> · answerable</summary>

Tagged pages: Maximum Likelihood Estimation, Single-Parameter Pareto Distribution, Censoring

| Item | Kind | Status | Where |
|---|---|---|---|
| The maximum likelihood estimate maximizes the likelihood of the observed sample, found by taking the log-likelihood, differentiating with r… | procedure | tagged | Maximum Likelihood Estimation: “When the maximum is at an interior point and the log-likelihood is differentiable, the MLE solves t…” |
| For a sample of independent observations, the likelihood is the product of the density at each exactly observed value times the survival pr… | procedure | tagged | Maximum Likelihood Estimation: “**[[Censoring]]**: observation is known to exceed some value $c$; contribute $P(X > c \mid \theta) …” |
| The distribution function is the integral of the density from the lower support bound up to x, and the survival function is S(x) = 1 − F(x). | formula | linked | Exponential Distribution: “from $S(x_0) = e^{-x_0/\theta} = s$ (equivalently $F(x_0) = 1 - s$)” |
| The single-parameter Pareto distribution with density α/x^(α+1) for x > 1 has distribution function 1 − x^(−α) and survival function x^(−α). | fact | tagged | Single-Parameter Pareto Distribution: “$F(x) = 1 - \left(\frac{\theta}{x}\right)^{\alpha}, \quad x > \theta$” |

</details>

<details><summary><code>fams-003</code> · answerable</summary>

Tagged pages: Frequency Distribution, Negative Binomial Distribution, Poisson Distribution, Model Selection

| Item | Kind | Status | Where |
|---|---|---|---|
| To choose among (a,b,0) class members from data, compute the ratio k·n_k/n_{k-1} (the empirical counterpart of k·p_k/p_{k-1}) for each k an… | procedure | tagged | Frequency Distribution: “Equivalently, $k\,p_k/p_{k-1} = ak + b$ is linear in $k$, and its slope and intercept on data sugge…” |
| In the (a,b,0) class, k·p_k/p_{k-1} = a·k + b is linear in k: a slope a>0 indicates negative binomial, a=0 indicates Poisson, and a<0 indic… | fact | tagged | Frequency Distribution: “The variance is below the mean for the binomial, equal to it for the Poisson and above it for the n…” |
| The Poisson distribution has variance equal to its mean, the negative binomial has variance greater than its mean, and the binomial has var… | fact | tagged | Frequency Distribution: “The variance is below the mean for the binomial, equal to it for the Poisson and above it for the n…” |
| For grouped count data, the sample mean is Σ k·n_k / n and the sample variance is Σ n_k (k − mean)² / (n − 1) (or divided by n for the empi… | formula | tagged | Frequency Distribution (collapsed): “\hat\sigma^2 &= \frac{140 + 50(4) + 10(9)}{500} - 0.54^2” |

</details>

<details><summary><code>fams-004</code> · gap</summary>

Tagged pages: Maximum Likelihood Estimation, Exponential Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The likelihood function for independent observations is the product of the density (pdf) of each observation evaluated at the parameter, an… | definition | tagged | Maximum Likelihood Estimation: “**Maximum Likelihood Estimation (MLE)** is a method of parameter estimation that chooses the parame…” |
| An exponential distribution with mean m has pdf f(x) = (1/m) e^{-x/m} for x > 0. | formula | tagged | Exponential Distribution: “$$f(x) = \frac{1}{\theta}\,e^{-x/\theta}, \quad x > 0$$” |
| To find the MLE, maximize the loglikelihood by differentiating with respect to the parameter and setting the derivative equal to zero, sinc… | procedure | tagged | Maximum Likelihood Estimation: “When the maximum is at an interior point and the log-likelihood is differentiable, the MLE solves t…” |
| When observations come from different groups whose distributions share a common parameter through scaling (e.g., mean a·θ), each observatio… | procedure | missing |  |

</details>

<details><summary><code>fams-006</code> · answerable</summary>

Tagged pages: Limited Expected Value, Grouped Data, Uniform Continuous Distribution, Moment

| Item | Kind | Status | Where |
|---|---|---|---|
| The limited loss variable X ∧ u equals X when X < u and equals u when X ≥ u, so its second moment is the integral of x² f(x) up to u plus u… | definition | linked | Policy Limit: “$$X \wedge u = \begin{cases} X, & X < u \\ u, & X \ge u \end{cases}$$” |
| E(X²) − E[(X∧u)²] equals the integral from u to infinity of (x² − u²) f(x) dx, since only losses above the limit contribute to the differen… | fact | linked | Policy Limit: “$$X \wedge u = \begin{cases} X, & X < u \\ u, & X \ge u \end{cases}$$” |
| From grouped data with a uniform assumption within each interval, the density on an interval is the interval's empirical probability (its c… | procedure | tagged | Grouped Data: “$$f_n(x) = \frac{n_j}{n\,(c_j - c_{j-1})}, \quad c_{j-1} \le x < c_j$$” |
| For grouped data, the empirical distribution is a piecewise-constant density, so a quantity over a range such as 150 to 200 uses the densit… | fact | tagged | Grouped Data: “The [[Histogram\\|histogram]] $f_n$ is constant on each interval, with total area 1.” |

</details>

<details><summary><code>fams-007</code> · answerable</summary>

Tagged pages: Maximum Likelihood Estimation, Negative Binomial Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The likelihood function of an i.i.d. sample is the product of the pmf (or density) values at the observations, viewed as a function of the … | definition | tagged | Maximum Likelihood Estimation: “**Maximum Likelihood Estimation (MLE)** is a method of parameter estimation that chooses the parame…” |
| To find the maximum likelihood estimate, differentiate the loglikelihood with respect to the parameter, set the derivative equal to zero, a… | procedure | tagged | Maximum Likelihood Estimation: “When the maximum is at an interior point and the log-likelihood is differentiable, the MLE solves t…” |
| The negative binomial pmf with parameters r and β is P(X=k) = [r(r+1)...(r+k-1)/k!] · β^k / (1+β)^(r+k), for k = 0, 1, 2, ... | formula | tagged | Negative Binomial Distribution: “SOA's *Tables for Exam C* (the Loss Models appendix) write the failures count as $\text{NegBin}(r, …” |

</details>

<details><summary><code>fams-008</code> · untagged</summary>

Tagged pages: Limited Fluctuation Credibility, Full Credibility Standard, Negative Binomial Distribution, Aggregate Loss Model

| Item | Kind | Status | Where |
|---|---|---|---|
| If the claim count is Poisson with a mean that varies across insureds according to a gamma distribution, the unconditional claim count is n… | fact | elsewhere | Mixed Poisson Process: “With a [[Gamma]] mixing distribution the unconditional counts are exactly **[[Negative Binomial Dis…” |
| For a negative binomial distribution, the mean is r*beta and the variance is r*beta*(1+beta). | formula | tagged | Negative Binomial Distribution: “$E[Y] = r\beta$ and $\text{Var}(Y) = r\beta(1+\beta)$” |
| For a compound (random sum) distribution S = Y1+...+YN with N independent of the iid severities, E(S)=E(N)E(Y) and Var(S)=E(N)Var(Y)+Var(N)… | formula | tagged | Aggregate Loss Model: “$$\text{Var}(S) = E[N]\cdot\text{Var}(X) + \text{Var}(N)\cdot(E[X])^2$$” |
| For an exponential distribution with mean θ, the variance is θ^2. | formula | elsewhere | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| In limited fluctuation credibility for aggregate losses, the full credibility standard in exposures is n = (z/k)^2 * Var(S)/E(S)^2, where k… | formula | tagged | Limited Fluctuation Credibility: “$$n_{\text{full}} = \left(\frac{z_{\alpha/2}}{r}\right)^2 \cdot \frac{\text{Var}(X)}{[\text{E}(X)]^…” |
| The standard normal value for a two-sided probability of 0.90 is z = 1.645 (the 95th percentile). | fact | tagged | Full Credibility Standard: “$p = 0.90 \Rightarrow z_{0.95} = 1.645$, and $k = 0.05$:” |
| To convert a full credibility standard expressed in exposures to expected claims, multiply the number of exposures by the expected number o… | procedure | tagged | Full Credibility Standard: “A standard stated in claims converts to exposures by dividing by the expected claim frequency per e…” |

</details>

<details><summary><code>fams-009</code> · answerable</summary>

Tagged pages: Maximum Likelihood Estimation, Grouped Data, Exponential Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| For grouped (interval) data, the likelihood is the product over intervals of the probability of falling in each interval, F(upper) − F(lowe… | procedure | tagged | Grouped Data: “$$L(\theta) = \prod_{j=1}^{k}\big[F(c_j \mid \theta) - F(c_{j-1} \mid \theta)\big]^{n_j}$$” |
| The exponential distribution with mean θ has CDF F(x) = 1 − e^{−x/θ}, and survival function S(x) = e^{−x/θ}. | formula | tagged | Exponential Distribution: “from $S(x_0) = e^{-x_0/\theta} = s$ (equivalently $F(x_0) = 1 - s$)” |
| To find a maximum likelihood estimate, maximize the likelihood (or log-likelihood) by setting its derivative to zero; a likelihood can be r… | procedure | tagged | Maximum Likelihood Estimation: “When the maximum is at an interior point and the log-likelihood is differentiable, the MLE solves t…” |
| A likelihood of the form p^a (1−p)^b is maximized at p = a/(a+b), the binomial-type proportion estimate. | fact | tagged | Grouped Data (collapsed): “Setting the derivative of $85\ln(1 - p) + 55\ln p$ to 0 gives $p = 55/140$.” |

</details>

<details><summary><code>fams-010</code> · answerable</summary>

Tagged pages: Aggregate Loss Model, Variance, Frequency Distribution, Convolution

| Item | Kind | Status | Where |
|---|---|---|---|
| Aggregate loss is the sum of the individual claim sizes over a random number of claims (zero if there are no claims), so its distribution c… | definition | tagged | Aggregate Loss Model: “An **Aggregate Loss Model** models the total (aggregate) losses $S$ from a portfolio as the sum of …” |
| To get the distribution of aggregate loss with a small discrete frequency and severity, enumerate each claim count, list every combination … | procedure | tagged | Convolution: “$$f_S(x) = \sum_{k=0}^{\infty} \Pr(N=k)\, f_X^{*k}(x)$$” |
| The mean of a discrete random variable is E[X] = Σ x·P(x), and its variance is Var(X) = E[X²] − (E[X])², with E[X²] = Σ x²·P(x). | formula | tagged | Variance: “- Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$” |

</details>

<details><summary><code>fams-011</code> · untagged</summary>

Tagged pages: Maximum Likelihood Estimation, Truncation, Exponential Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| Data truncated from below at a deductible d means only observations exceeding d are recorded, and the ground-up loss amounts are observed (… | definition | tagged | Truncation: “In insurance, **left-truncation** arises with deductibles: only losses exceeding the deductible $d$…” |
| For data truncated from below at d, each observation's likelihood contribution is f(x)/[1-F(d)], and the likelihood is the product of these… | formula | tagged | Truncation: “$$L_i(\theta) = \frac{f(x \mid \theta)}{S(d \mid \theta)}$$” |
| The exponential distribution is memoryless: given X > d, the excess X - d is exponential with the same mean as X. | fact | tagged | Exponential Distribution: “A direct consequence: given $X > d$, the excess $X - d$ is again $\text{Exp}(\theta)$.” |
| The maximum likelihood estimate of the exponential mean for complete data is the sample mean. | fact | elsewhere | Incomplete Data: “For an [[Exponential Distribution\\|exponential]] model with any mix of truncation and right censori…” |
| To find an MLE, write the likelihood, take its logarithm, differentiate with respect to the parameter, and set the derivative to zero to so… | procedure | tagged | Maximum Likelihood Estimation: “When the maximum is at an interior point and the log-likelihood is differentiable, the MLE solves t…” |
| The survival function of an exponential distribution with mean θ is S(x) = e^{-x/θ}, and its density is f(x) = (1/θ)e^{-x/θ}. | fact | tagged | Exponential Distribution: “Work from the survival function $S(x) = e^{-x/\theta}$ rather than the CDF; almost every exponentia…” |

</details>

<details><summary><code>fams-012</code> · untagged</summary>

Tagged pages: Partial Credibility, Limited Fluctuation Credibility, Full Credibility Standard, Aggregate Loss Model, Credibility

| Item | Kind | Status | Where |
|---|---|---|---|
| The mean and variance of a negative binomial distribution with parameters r and β are E(N)=rβ and Var(N)=rβ(1+β). | formula | elsewhere | Negative Binomial Distribution: “write the failures count as $\text{NegBin}(r, \beta)$ with $p = 1/(1+\beta)$: … $E[Y] = r\beta$ and…” |
| For a Pareto distribution with shape α and scale θ, the mean is θ/(α-1) and the variance is θ²α/((α-1)²(α-2)). | formula | elsewhere | Pareto Distribution: “$$\text{Var}(X) = \frac{\alpha\,\theta^2}{(\alpha - 1)^2(\alpha - 2)}, \quad \alpha > 2$$ … The mea…” |
| For a compound frequency-severity (aggregate) model, E(S)=E(N)E(Y) and Var(S)=E(N)Var(Y)+Var(N)E(Y)². | formula | tagged | Aggregate Loss Model: “$$E[S] = E[N] \cdot E[X]$$ … $$\text{Var}(S) = E[N]\cdot\text{Var}(X) + \text{Var}(N)\cdot(E[X])^2$$” |
| Under limited fluctuation credibility, the full credibility standard for aggregate losses (in exposures) is n = (z/k)² · σ²/μ², where z is … | formula | tagged | Limited Fluctuation Credibility: “the number of observations $n_{\text{full}}$ required so that the observed mean is within $100r\%$ …” |
| Partial credibility under limited fluctuation credibility is Z = √(n/n_full), capped at 1, where n is the actual exposure count and n_full … | formula | tagged | Partial Credibility: “$$Z = \min\left(\sqrt{\frac{n}{n_F}},\; 1\right)$$” |
| The standard normal 95th percentile is 1.645, which is the z value for a 90% probability of being within the specified tolerance (two-sided… | fact | tagged | Full Credibility Standard: “$p = 0.90 \Rightarrow z_{0.95} = 1.645$, and $k = 0.05$:” |

</details>

<details><summary><code>fams-013</code> · answerable</summary>

Tagged pages: Maximum Likelihood Estimation, Mixture Distribution, Exponential Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The density of a finite mixture distribution is the weighted sum of the component densities, with the mixing probabilities as weights. | definition | tagged | Mixture Distribution: “$$f_X(x) = \sum_{i=1}^{k} a_i\, f_{X_i}(x), \quad a_i \ge 0,\ \sum_i a_i = 1$$” |
| The exponential distribution with mean θ has density f(x) = (1/θ) e^{-x/θ} for x > 0. | formula | tagged | Exponential Distribution: “$$f(x) = \frac{1}{\theta}\,e^{-x/\theta}, \quad x > 0$$” |
| The likelihood function for independent, complete observations is the product of the density (pdf) evaluated at each observation, viewed as… | definition | tagged | Maximum Likelihood Estimation: “$$L(\theta) = \prod_{i=1}^n f(x_i \mid \theta)$$” |

</details>

<details><summary><code>fams-014</code> · gap</summary>

Tagged pages: Limited Expected Value, Pareto Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| A bonus equal to a constant times the amount by which a random loss falls below a threshold is the payoff c·max(d − X, 0), which equals c·(… | procedure | missing |  |
| The limited loss variable X ∧ d = min(X, d) caps the loss at d, and its expectation E[X ∧ d] is the limited expected value at d. | definition | tagged | Limited Expected Value: “Also written $E[\min(X, u)]$; the **limited loss variable** is $Y = \min(X, u)$” |
| For a Pareto distribution with shape α and scale θ, E[X ∧ d] = θ/(α−1) · [1 − (θ/(θ+d))^(α−1)] (α ≠ 1). | formula | tagged | Limited Expected Value: “$\dfrac{\theta}{\alpha-1}\!\left[1 - \left(\dfrac{\theta}{\theta+u}\right)^{\alpha-1}\right]$” |

</details>

<details><summary><code>fams-015</code> · untagged</summary>

Tagged pages: Aggregate Loss Model, Normal Approximation, Poisson Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| For a compound Poisson aggregate S with Poisson mean λ and severity X, E(S) = λ·E(X). | formula | tagged | Aggregate Loss Model: “$$E[S] = E[N] \cdot E[X]$$” |
| For a compound Poisson aggregate S with Poisson mean λ and severity X, Var(S) = λ·E(X²), using the second moment of severity rather than it… | formula | tagged | Aggregate Loss Model: “When $N \sim \text{Poi}(\lambda)$: $\text{Var}(S) = \lambda \cdot E[X^2]$ (simplification since $\t…” |
| The second moment of a random variable equals its variance plus the square of its mean: E(X²) = Var(X) + [E(X)]². | formula | syllabus | Moment: “The second central moment is the [[Variance]], $\mu_2 = E[X^2] - \mu^2$.” |
| A sum of independent compound Poisson aggregates (one per machine, identical) is compound Poisson with Poisson mean equal to the sum of the… | fact | elsewhere | Compound Poisson Process: “The sum of independent compound Poisson processes is compound Poisson with rate $\lambda = \sum \la…” |
| Normal approximation for aggregate losses: standardize S by subtracting E(S) and dividing by sd(S), then approximate Pr(S > s) by 1 − Φ((s … | procedure | tagged | Normal Approximation: “$$P(S_n \le s) \approx \Phi\!\left(\frac{s - n\mu}{\sigma\sqrt{n}}\right)$$” |

</details>

<details><summary><code>fams-016</code> · untagged</summary>

Tagged pages: Coverage Modifications, Frequency Distribution, Deductible, Poisson Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The modified frequency under an ordinary deductible is the number of losses that result in a payment (losses exceeding the deductible), and… | definition | tagged | Coverage Modifications: “**Frequency.** Only losses above $d$ become payments, so each loss becomes a payment with probabili…” |
| With an ordinary deductible d, the probability that a loss produces a payment is P(X > d) = 1 - F_X(d), so the expected number of payments … | fact | tagged | Coverage Modifications: “**Frequency.** Only losses above $d$ become payments, so each loss becomes a payment with probabili…” |
| If the number of losses is Poisson with mean λ and each loss independently results in a payment with probability v, then the number of paym… | fact | tagged | Coverage Modifications: “A [[Poisson Distribution\\|Poisson]]$(\lambda)$ loss count gives a Poisson$(\lambda v)$ payment coun…” |
| A coinsurance percentage applied to the amount in excess of the deductible changes only the payment amount, not whether a payment occurs, s… | fact | tagged | Coverage Modifications: “Only losses above $d$ become payments, so each loss becomes a payment with probability $v = S(d)$.” |
| For a loss uniformly distributed on [0, b], the CDF is F(x) = x/b for 0 ≤ x ≤ b, so P(X > d) = (b - d)/b. | formula | elsewhere | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |

</details>

<details><summary><code>fams-017</code> · gap</summary>

Tagged pages: Loss Elimination Ratio, Deductible, Limited Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The loss elimination ratio for an ordinary deductible d is the fraction of expected losses eliminated by the deductible: LER = E[X ∧ d] / E… | definition | tagged | Loss Elimination Ratio: “**Loss Elimination Ratio** (LER) is the proportion of ground-up losses removed by a deductible — th…” |
| The expected payment per loss with an ordinary deductible d is E[(X−d)+] = E[X] − E[X ∧ d], where E[X ∧ d] = ∫_0^d x f(x) dx + d·[1 − F(d)]. | formula | tagged | Deductible: “$$E[(X - d)_+] = E[X] - E[X \wedge d]$$” |
| The mean of a continuous nonnegative loss variable is E[X] = ∫ x f(x) dx over its support, and probabilities such as F(d) are the integral … | formula | syllabus | Expected Value: “\displaystyle\int_{-\infty}^{\infty} x\, f(x)\, dx & \text{(continuous)}” |
| A piecewise linear density read from a graph is expressed as separate linear functions on each interval (slope and intercept from points on… | procedure | missing |  |

</details>

<details><summary><code>fams-018</code> · untagged</summary>

Tagged pages: Aggregate Loss Model, Normal Approximation, Coinsurance, Poisson Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| For a compound (aggregate) model S = X1 + ... + XN with N independent of the severities, E(S) = E(N)·E(X). | formula | tagged | Aggregate Loss Model: “$$E[S] = E[N] \cdot E[X]$$” |
| For a compound model with independent i.i.d. severities, Var(S) = E(N)·Var(X) + Var(N)·E(X)^2. | formula | tagged | Aggregate Loss Model: “$$\text{Var}(S) = E[N]\cdot\text{Var}(X) + \text{Var}(N)\cdot(E[X])^2$$” |
| A Poisson distribution has mean equal to variance (both equal to λ); for a compound Poisson, Var(S) = λ·E(X^2). | fact | tagged | Aggregate Loss Model: “When $N \sim \text{Poi}(\lambda)$: $\text{Var}(S) = \lambda \cdot E[X^2]$ (simplification since $\t…” |
| Compute the mean and variance of a discrete severity from its probability table via E(X)=Σx·p(x), E(X^2)=Σx^2·p(x), Var(X)=E(X^2)−E(X)^2. | procedure | elsewhere | Variance for Conditional and Marginal Distributions: “$$\text{Var}(X \mid Y=y) = E[X^2 \mid Y=y] - \bigl(E[X \mid Y=y]\bigr)^2$$” |
| When a policyholder pays a percentage of each loss, the insurer's payment per loss is the remaining percentage of the loss amount, so each … | procedure | tagged | Coinsurance: “the insurer pays a fixed percentage $c$ ($0 < c \leq 1$) of the covered loss, with the policyholder…” |
| Normal approximation: approximate aggregate S as normal with its own mean and variance, standardize via Z=(s−E(S))/SD(S), and find the tail… | procedure | tagged | Normal Approximation: “The recipe: identify $n$, compute $E[S_n] = n\mu$ and $\text{Var}(S_n) = n\sigma^2$ ([[Moments for …” |

</details>

<details><summary><code>fams-019</code> · answerable</summary>

Tagged pages: Loss Elimination Ratio, Exponential Distribution, Deductible

| Item | Kind | Status | Where |
|---|---|---|---|
| The loss elimination ratio for an ordinary deductible d is the expected losses eliminated by the deductible divided by total expected losse… | definition | tagged | Loss Elimination Ratio: “$$\text{LER}(d) = \frac{E[X \wedge d]}{E[X]}$$” |
| For an exponential distribution with mean θ, the limited expected value is E[X ∧ d] = θ(1 − e^{−d/θ}), so the loss elimination ratio is 1 −… | formula | tagged | Exponential Distribution: “Capped at a [[Benefit Limit\\|limit]] $u$: $E[\min(X,u)] = \theta\left(1 - e^{-u/\theta}\right)$” |

</details>

<details><summary><code>fams-020</code> · gap</summary>

Tagged pages: Stop-Loss Reinsurance, Aggregate Loss Model, Geometric Distribution, Limited Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The geometric distribution with mean beta has pmf P(N=n) = beta^n / (1+beta)^(n+1), for n = 0, 1, 2, ... | formula | tagged | Geometric Distribution: “The other counts *failures before the first success*, $Y = X - 1 \in \{0,1,2,\ldots\}$, with $P(Y=k…” |
| The expected aggregate loss with a fixed claim amount equals the expected number of claims times the claim amount (E[S] = E[N]*x). | fact | tagged | Aggregate Loss Model: “$$E[S] = E[N] \cdot E[X]$$” |
| The expected excess over a deductible d is E[(X-d)+] = E[X] - E[X ∧ d], where X ∧ d = min(X, d) is the limited loss variable. | formula | tagged | Stop-Loss Reinsurance: “$$E[(S - d)_+] = E[S] - E[S \wedge d]$$” |
| For a discrete distribution, E[X ∧ d] is computed by summing x*P(X=x) for values below d plus d times the probability that X is at least d … | procedure | tagged | Stop-Loss Reinsurance: “$$E[S \wedge d] = \sum_{s < d} s\,f_S(s) + d\,\Pr(S \ge d)$$” |
| With a fixed claim amount, aggregate loss S takes values equal to the claim count times the amount, so the distribution of S is the claim c… | fact | missing |  |

</details>

<details><summary><code>fams-021</code> · untagged</summary>

Tagged pages: Aggregate Loss Model, Normal Approximation

| Item | Kind | Status | Where |
|---|---|---|---|
| For a compound random sum S = X_1 + ... + X_N with N independent of the iid X's, E(S) = E(N)E(X). | formula | tagged | Aggregate Loss Model: “$$E[S] = E[N] \cdot E[X]$$” |
| For a compound random sum with N independent of the iid X's, Var(S) = E(N)Var(X) + Var(N)E(X)^2. | formula | tagged | Aggregate Loss Model: “$$\text{Var}(S) = E[N]\cdot\text{Var}(X) + \text{Var}(N)\cdot(E[X])^2$$” |
| A fair six-sided die has mean 3.5 and variance 35/12 (about 2.9167), from the discrete uniform distribution on 1 to 6. | formula | elsewhere | Uniform Discrete: “$E[X] = (n+1)/2$ and $\text{Var}(X) = (n^2 - 1)/12$” |
| The mean and variance of a sum of independent, identically distributed rounds are the number of rounds times the per-round mean and varianc… | fact | linked | Independent and Identically Distributed: “The mean of $S_n$ grows like $n$ but its standard deviation only like $\sqrt{n}$, so the [[Coeffici…” |
| Use the normal approximation (Central Limit Theorem) for a sum of many independent rounds: standardize to Z = (x - mean)/SD and read the pr… | procedure | tagged | Normal Approximation: “The recipe: identify $n$, compute $E[S_n] = n\mu$ and $\text{Var}(S_n) = n\sigma^2$ ([[Moments for …” |
| When approximating a discrete integer-valued distribution by a normal, apply a continuity correction by using a boundary half a unit away (… | procedure | tagged | Normal Approximation: “widen the event by half a unit first: $P(S_n \le k) \approx \Phi\!\left(\frac{k + 0.5 - n\mu}{\sigm…” |

</details>

<details><summary><code>fams-022</code> · answerable</summary>

Tagged pages: Frequency Distribution, Panjer Recursion, Probability Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| A discrete distribution belongs to the (a,b,0) class if its probabilities satisfy the recursion p_k = (a + b/k) p_{k-1} for k = 1, 2, 3, ..… | definition | tagged | Frequency Distribution: “$$p_k = \left(a + \frac{b}{k}\right) p_{k-1}, \quad k = 1, 2, 3, \ldots$$” |
| To find a and b of an (a,b,0) distribution from known probabilities, apply the recursion at two consecutive values of k to get two linear e… | procedure | tagged | Frequency Distribution (collapsed): “The ratios give $a + b = 1$ and $a + b/2 = 2/3$, so $b/2 = 1/3$.” |

</details>

<details><summary><code>fams-023</code> · answerable</summary>

Tagged pages: Coverage Modifications, Deductible, Inflation, Aggregate Loss Model

| Item | Kind | Status | Where |
|---|---|---|---|
| Under uniform inflation at rate r, each ground-up loss amount is multiplied by (1 + r) before any deductible is applied. | fact | tagged | Inflation: “$$E[(X' - d)_+] = (1+r)\,E\!\left[\left(X - \tfrac{d}{1+r}\right)_+\right]$$” |
| With an ordinary per-claim deductible d, the payment per loss is max(X - d, 0): zero if the loss is at or below d, and the loss minus d oth… | definition | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| Expected payment per loss for a discrete severity distribution is the probability-weighted sum of the payments after applying the deductibl… | procedure | tagged | Deductible: “For a discrete loss with probability function $p(x)$, the payment sums over the loss amounts above …” |
| Expected total payments equal the expected number of losses times the expected payment per loss (frequency times severity), with the freque… | formula | tagged | Coverage Modifications: “Expected aggregate payments are the same either way, $E[N^L]\,E[Y^L] = E[N^P]\,E[Y^P]$” |
| Imposing a deductible with no change in the loss count distribution leaves the expected number of losses unchanged, so the frequency mean s… | fact | tagged | Coverage Modifications: “$Y^L$, the *per-loss* variable, is $0$ whenever $X \le d$ and averages over every loss.” |

</details>

<details><summary><code>fams-024</code> · answerable</summary>

Tagged pages: Aggregate Loss Model, Normal Approximation

| Item | Kind | Status | Where |
|---|---|---|---|
| Aggregate loss S is the sum of a random number N of random claim amounts X, i.e. a compound (collective risk) model, with N independent of … | definition | tagged | Aggregate Loss Model: “$N$ is the **claim count** (frequency) random variable; $X_i$ are i.i.d. **claim severity** random …” |
| For a compound model with independent frequency N and i.i.d. severity X, the mean of aggregate loss is E(S) = E(N)E(X). | formula | tagged | Aggregate Loss Model: “$$E[S] = E[N] \cdot E[X]$$” |
| For a compound model with independent frequency N and i.i.d. severity X, the variance of aggregate loss is Var(S) = E(N)Var(X) + E(X)^2 Var… | formula | tagged | Aggregate Loss Model: “$$\text{Var}(S) = E[N]\cdot\text{Var}(X) + \text{Var}(N)\cdot(E[X])^2$$” |
| Normal approximation: approximate aggregate S as normal with its own mean and variance, standardize via Z = (s - E(S))/SD(S), and look up t… | procedure | tagged | Normal Approximation: “The recipe: identify $n$, compute $E[S_n] = n\mu$ and $\text{Var}(S_n) = n\sigma^2$ ([[Moments for …” |

</details>

<details><summary><code>fams-025</code> · answerable</summary>

Tagged pages: Stop-Loss Reinsurance, Aggregate Loss Model, Poisson Distribution, Payment

| Item | Kind | Status | Where |
|---|---|---|---|
| An annual aggregate deductible d applied to aggregate losses S makes the insurer's payment (S − d)+, whose expectation is the stop-loss pre… | definition | tagged | Stop-Loss Reinsurance: “Over a stated period, the reinsurer pays the amount by which the total losses $S$ exceed a retentio…” |
| The expected payment above a deductible equals E[(S − d)+] = E[S] − E[S ∧ d], where E[S ∧ d] is the limited expected value. | formula | tagged | Stop-Loss Reinsurance: “$$E[(S - d)_+] = E[S] - E[S \wedge d]$$” |
| For a compound frequency-severity model with independent frequency and severity, E[S] = E[N]·E[X]. | formula | tagged | Aggregate Loss Model: “$$E[S] = E[N] \cdot E[X]$$” |
| For a discrete nonnegative S, E[S ∧ d] = Σ s·f_S(s) for s<d plus d·P(S ≥ d), i.e. d times (1 − sum of probabilities below d). | formula | tagged | Stop-Loss Reinsurance: “$$E[S \wedge d] = \sum_{s < d} s\,f_S(s) + d\,\Pr(S \ge d)$$” |
| A Poisson random variable with mean λ has probability mass function P(N=n) = e^{-λ} λ^n / n!. | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| To find the probability that aggregate loss equals a small value, enumerate the combinations of claim count and claim sizes that sum to tha… | procedure | tagged | Stop-Loss Reinsurance (collapsed): “Aggregate losses of 2 arise from one claim of 2 or from two claims of 1.” |

</details>

<details><summary><code>fams-026</code> · answerable</summary>

Tagged pages: Limited Expected Value, Policy Limit, Severity Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The expected payment under a per-claim policy limit u is the limited expected value E[X ∧ u], the mean of the claim amount capped at u. | definition | tagged | Limited Expected Value: “The **Limited Expected Value** (LEV) of a random variable $X$ at limit $u$ is the expected value of…” |
| The limited expected value at u equals the integral from 0 to u of the survival function: E[X ∧ u] = ∫_0^u [1 − F(x)] dx. | formula | tagged | Limited Expected Value: “$$E[X \wedge u] = \int_0^u [1 - F(x)]\,dx \quad \text{(for non-negative } X\text{)}$$” |
| The survival function is S(x) = 1 − F(x), so for a CDF given as 1 minus a sum of exponential terms, S(x) is that sum of exponential terms. | fact | linked | Exponential Distribution: “- Work from the survival function $S(x) = e^{-x/\theta}$ rather than the CDF; almost every exponent…” |

</details>

<details><summary><code>fams-027</code> · answerable</summary>

Tagged pages: Mean Excess Loss, Limited Expected Value, Deductible

| Item | Kind | Status | Where |
|---|---|---|---|
| The mean excess loss (mean residual life) e(d) = E(X - d \| X > d) is the expected payment per payment (per loss exceeding the deductible d… | definition | tagged | Mean Excess Loss: “In insurance terms, it is the expected payment per payment under an ordinary [[Deductible\\|deductib…” |
| The mean excess loss at d equals (E(X) - E(X ∧ d)) / (1 - F(d)), where E(X ∧ d) is the limited expected value at d. | formula | tagged | Mean Excess Loss: “e_X(d) = \frac{E[X] - E[X \wedge d]}{S_X(d)}” |
| If F(u) = 1 at the maximum loss u, then the limited expected value at u equals the unlimited mean, E(X ∧ u) = E(X). | fact | tagged | Limited Expected Value: “E[X \wedge u] = E[X] - E[\max(X - u, 0)] = E[X] - e(u)\cdot[1-F(u)]” |

</details>

<details><summary><code>fams-028</code> · answerable</summary>

Tagged pages: Aggregate Loss Model, Normal Approximation, Variance

| Item | Kind | Status | Where |
|---|---|---|---|
| For a compound (aggregate) model S = X_1 + ... + X_N with N independent of the iid severities X, the mean is E(S) = E(N)E(X). | formula | tagged | Aggregate Loss Model: “$$E[S] = E[N] \cdot E[X]$$” |
| For a compound model with N independent of iid severities X, the variance is Var(S) = E(N)Var(X) + E(X)^2 Var(N). | formula | tagged | Aggregate Loss Model: “$$\text{Var}(S) = E[N]\cdot\text{Var}(X) + \text{Var}(N)\cdot(E[X])^2$$” |
| If the hourly counts are iid, the total count over t hours has mean and variance equal to t times the single-hour mean and variance, so the… | fact | tagged | Normal Approximation: “compute $E[S_n] = n\mu$ and $\text{Var}(S_n) = n\sigma^2$” |
| Normal approximation: approximate the aggregate S by a normal with the same mean and variance, standardize via Z = (x - E(S))/SD(S), and us… | procedure | tagged | Normal Approximation: “replaces the distribution of a sum or average of many [[Independent and Identically Distributed\\|in…” |

</details>

<details><summary><code>fams-029</code> · answerable</summary>

Tagged pages: Stop-Loss Reinsurance, Aggregate Loss Model, Deductible, Payment

| Item | Kind | Status | Where |
|---|---|---|---|
| The net stop-loss premium with deductible d is the expected value of the insurer's payment E[(S-d)_+], i.e. the expected excess of aggregat… | definition | tagged | Stop-Loss Reinsurance: “Over a stated period, the reinsurer pays the amount by which the total losses $S$ exceed a retentio…” |
| For a nonnegative aggregate loss S and deductible d, E[(S-d)_+] = E[S] - E[min(S,d)], and for a discrete S with d=1, E[min(S,1)] = 1·P(S≥1)… | formula | tagged | Stop-Loss Reinsurance: “$$E[(S - d)_+] = E[S] - E[S \wedge d]$$” |
| The expected value of a sum of random variables is the sum of their expected values, so for n identically distributed individual losses E[S… | fact | syllabus | Expected Value: “It is linear: $E[aX + b] = aE[X] + b$” |
| For independent individual losses, the probability that the aggregate loss is zero equals the product of the individual probabilities of ze… | fact | linked | Panjer Recursion: “The recursion must start from $f_S(0)$, the probability that every claim is zero, which is $\sum_k …” |

</details>

<details><summary><code>fams-030</code> · answerable</summary>

Tagged pages: Frequency Distribution, Poisson Distribution, Recursion

| Item | Kind | Status | Where |
|---|---|---|---|
| A distribution is in the (a, b, 0) class if its probabilities satisfy p(k) = (a + b/k) p(k-1) for k = 1, 2, ..., and the recursion identifi… | definition | tagged | Frequency Distribution: “$$p_k = \left(a + \frac{b}{k}\right) p_{k-1}, \quad k = 1, 2, 3, \ldots$$” |
| In the (a, b, 0) class, a = 0 with b > 0 corresponds to the Poisson distribution with mean λ = b. | fact | tagged | Frequency Distribution: “\\| Poisson $(\lambda)$ \\| $e^{-\lambda}$ \\| $0$ \\| $\lambda$ \\|” |
| The Poisson probability mass function is p(k) = e^{-λ} λ^k / k!, for k = 0, 1, 2, ... | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |

</details>

<details><summary><code>fams-031</code> · answerable</summary>

Tagged pages: Aggregate Loss Model, Exponential Distribution, Deductible, Poisson Thinning

| Item | Kind | Status | Where |
|---|---|---|---|
| The exponential distribution is memoryless: given a loss exceeds a deductible d, the excess amount (X - d) is exponential with the same mea… | fact | tagged | Exponential Distribution: “A direct consequence: given $X > d$, the excess $X - d$ is again $\text{Exp}(\theta)$.” |
| The exponential CDF is F(x) = 1 - e^{-x/θ}, so the probability a loss exceeds deductible d is e^{-d/θ}. | formula | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| The expected payment per loss with an ordinary deductible equals the probability the loss exceeds the deductible times the expected payment… | procedure | tagged | Exponential Distribution: “So $E[X \mid X > d] = d + \theta$ and $E[(X-d)_+] = \theta e^{-d/\theta}$” |
| A reduction in loss frequency by a percentage scales the expected number of losses by one minus that percentage. | fact | tagged | Poisson Thinning: “$$N_2(t) \sim \text{Poi}\big(\lambda (1-p)\, t\big)$$” |
| Expected aggregate payments equal expected number of losses times expected payment per loss (E[S] = E[N]·E[X]). | formula | tagged | Aggregate Loss Model: “$$E[S] = E[N] \cdot E[X]$$” |
| When a deductible is imposed, the number of losses is taken as the original loss frequency (payment per loss includes zero payments), so fr… | fact | tagged | Deductible (collapsed): “The insurer expects to pay approximately \$818.73 per loss (including the zero payments when $X \le…” |

</details>

<details><summary><code>fams-032</code> · answerable</summary>

Tagged pages: Aggregate Loss Model, Variance, Frequency Distribution, Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| For a discrete random variable, the mean is E(X)=Σ x·P(x) and the variance is Var(X)=E(X²)−E(X)². | formula | tagged | Variance: “Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$” |
| For a compound (aggregate) distribution S = X1+...+XN with N independent of the iid severities X, the mean is E(S)=E(N)E(X). | formula | tagged | Aggregate Loss Model: “$$E[S] = E[N] \cdot E[X]$$” |
| For a compound distribution with N independent of iid severities X, Var(S)=E(N)Var(X)+E(X)²Var(N). | formula | tagged | Aggregate Loss Model: “$$\text{Var}(S) = E[N]\cdot\text{Var}(X) + \text{Var}(N)\cdot(E[X])^2$$” |
| To find the probability that aggregate S exceeds a threshold, determine which values S can take (including its discrete support), and compu… | procedure | tagged | Aggregate Loss Model: “$$P(S > 55{,}000) = 1 - \Phi(0.858) \approx 1 - 0.8045 = 0.1955$$” |
| The probability of aggregate S equal to 0 is found by conditioning on the number of claims: sum over n of P(N=n) times the probability that… | procedure | linked | Panjer Recursion: “The recursion must start from $f_S(0)$, the probability that every claim is zero, which is $\sum_k …” |

</details>

<details><summary><code>fams-033</code> · gap</summary>

Tagged pages: Coverage Modifications, Limited Expected Value, Pareto Distribution, Coinsurance, Short-Term Insurance Coverage

| Item | Kind | Status | Where |
|---|---|---|---|
| For a Pareto distribution with parameters theta and alpha (alpha not equal to 1), the limited expected value is E(X ∧ x) = θ/(α−1) · [1 − (… | formula | tagged | Pareto Distribution: “$$E[X \wedge x] = \frac{\theta}{\alpha - 1}\left[1 - \left(\frac{\theta}{x + \theta}\right)^{\alpha…” |
| The expected payment on a layer of losses between a and b equals E(X ∧ b) − E(X ∧ a); the expected payment on losses above a equals E(X) − … | fact | tagged | Coverage Modifications: “$$E[Y^L] = \alpha\big(E[X \wedge u] - E[X \wedge d]\big)$$” |
| For a plan with tiered coinsurance across loss bands, the expected plan payment is the sum over bands of (plan's payment share in the band)… | procedure | tagged | Coverage Modifications: “$$Y^L = \alpha\big[(X \wedge u) - (X \wedge d)\big]$$” |
| When a benefit change is triggered by the insured's cumulative out-of-pocket amount reaching a cap, convert that cap into the corresponding… | procedure | missing |  |

</details>

<details><summary><code>fams-034</code> · untagged</summary>

Tagged pages: Aggregate Loss Model, Normal Approximation, Poisson Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| For a compound distribution S = X_1 + ... + X_N with N independent of the severities, E(S) = E(N)E(X). | formula | tagged | Aggregate Loss Model: “$$E[S] = E[N] \cdot E[X]$$” |
| For a compound distribution with N independent of the i.i.d. severities X, Var(S) = E(N)Var(X) + Var(N)E(X)^2. | formula | tagged | Aggregate Loss Model: “$$\text{Var}(S) = E[N]\cdot\text{Var}(X) + \text{Var}(N)\cdot(E[X])^2$$” |
| A Poisson distribution with parameter lambda has mean and variance both equal to lambda. | fact | tagged | Poisson Distribution: “A defining property is $E[X] = \text{Var}(X) = \lambda$ — the mean and variance are equal” |
| A uniform distribution on (a, b) has mean (a+b)/2 and variance (b-a)^2/12. | formula | elsewhere | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| For independent random variables, the means add and the variances add, so the mean and variance of a sum of independent aggregate claim amo… | fact | elsewhere | Linear Combinations of Random Variables: “$$E[L] = \sum_{i=1}^{n} c_i\,E[X_i]$$” |
| To approximate P(S > x) by a normal approximation, match the mean and variance of S, standardize z = (x - mean)/sd, and take 1 - Φ(z) using… | procedure | tagged | Normal Approximation: “The recipe: identify $n$, compute $E[S_n] = n\mu$ and $\text{Var}(S_n) = n\sigma^2$ ([[Moments for …” |

</details>

<details><summary><code>fams-035</code> · untagged</summary>

Tagged pages: Aggregate Loss Model, Limited Expected Value, Pareto Distribution, Deductible

| Item | Kind | Status | Where |
|---|---|---|---|
| With an ordinary deductible d, the payment per loss is (X − d)+, i.e., the loss amount in excess of the deductible (zero if the loss is bel… | fact | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| The expected payment per loss with an ordinary deductible d is E[(X − d)+] = E[X] − E[X ∧ d], where X ∧ d is the limited loss variable. | formula | tagged | Deductible: “$$E[(X - d)_+] = E[X] - E[X \wedge d]$$” |
| For a Pareto distribution with parameters θ and α, E[X] = θ/(α − 1) for α > 1. | formula | tagged | Pareto Distribution: “The mean is $E[X] = \theta/(\alpha - 1)$ for $\alpha > 1$.” |
| For a Pareto distribution, the limited expected value is E[X ∧ d] = θ/(α − 1) · [1 − (θ/(d + θ))^(α − 1)]. | formula | tagged | Limited Expected Value: “$\dfrac{\theta}{\alpha-1}\!\left[1 - \left(\dfrac{\theta}{\theta+u}\right)^{\alpha-1}\right]$” |
| For a compound frequency–severity model, the expected aggregate payments equal the expected number of losses times the expected payment per… | fact | tagged | Aggregate Loss Model: “$$E[S] = E[N] \cdot E[X]$$” |
| The mean of a Poisson distribution equals its parameter λ. | fact | elsewhere | Poisson Distribution: “A defining property is $E[X] = \text{Var}(X) = \lambda$” |

</details>

<details><summary><code>fams-036</code> · answerable</summary>

Tagged pages: Loss Elimination Ratio, Inflation, Pareto Distribution, Limited Expected Value, Scale and Shape Parameters

| Item | Kind | Status | Where |
|---|---|---|---|
| The Loss Elimination Ratio for an ordinary deductible d is the fraction of expected losses eliminated by the deductible: LER = E[X ∧ d] / E… | definition | tagged | Loss Elimination Ratio: “**Loss Elimination Ratio** (LER) is the proportion of ground-up losses removed by a deductible — th…” |
| Under uniform inflation by factor (1+r), a Pareto(α, θ) loss variable becomes Pareto with the same α and scale θ multiplied by (1+r), since… | fact | tagged | Scale and Shape Parameters: “A **scale parameter** $\theta$ sets the units: multiplying the loss by a positive constant $c$ mult…” |
| For a Pareto(α, θ) distribution, the mean is E[X] = θ/(α−1) for α > 1. | formula | tagged | Pareto Distribution: “The mean is $E[X] = \theta/(\alpha - 1)$ for $\alpha > 1$.” |
| For a Pareto(α, θ) distribution, the limited expected value is E[X ∧ d] = θ/(α−1) · [1 − (θ/(d+θ))^(α−1)]. | formula | tagged | Limited Expected Value: “\\| Pareto$(\alpha, \theta)$, $\alpha \neq 1$ \\| $\dfrac{\theta}{\alpha-1}\!\left[1 - \left(\dfrac{\…” |
| The expected payment per loss with an ordinary deductible d is E[(X − d)+] = E[X] − E[X ∧ d]. | fact | tagged | Limited Expected Value: “$$E[X \wedge u] = E[X] - E[\max(X - u, 0)] = E[X] - e(u)\cdot[1-F(u)]$$” |

</details>

<details><summary><code>fams-037</code> · answerable</summary>

Tagged pages: Maximum Likelihood Estimation

| Item | Kind | Status | Where |
|---|---|---|---|
| The likelihood function for independent observations is the product of the density (or probability) function evaluated at each observation,… | definition | tagged | Maximum Likelihood Estimation: “$$L(\theta) = \prod_{i=1}^n f(x_i \mid \theta)$$” |
| To find the maximum likelihood estimate, maximize the likelihood by taking the log-likelihood, setting its derivative with respect to the p… | procedure | tagged | Maximum Likelihood Estimation: “When the maximum is at an interior point and the log-likelihood is differentiable, the MLE solves t…” |
| The logarithm is a monotonic increasing function, so maximizing the log-likelihood gives the same parameter value as maximizing the likelih… | fact | tagged | Maximum Likelihood Estimation: “$$\hat{\theta}_{\text{MLE}} = \arg\max_\theta L(\theta) = \arg\max_\theta \ell(\theta)$$” |

</details>

<details><summary><code>fams-038</code> · answerable</summary>

Tagged pages: Limited Fluctuation Credibility, Full Credibility Standard, Binomial Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| Limited fluctuation (classical) credibility requires that the actual aggregate/claim count be within a fraction k of its expected value wit… | definition | tagged | Limited Fluctuation Credibility: “**Full credibility standard** — the number of observations $n_{\text{full}}$ required so that the o…” |
| For a count that is approximately normal, the number of exposures n needed for full credibility satisfies n = (z/k)^2 × Var/mean^2 per expo… | formula | tagged | Limited Fluctuation Credibility: “$$n_{\text{full}} = \left(\frac{z_{\alpha/2}}{r}\right)^2 \cdot \frac{\text{Var}(X)}{[\text{E}(X)]^…” |
| A binomial(m, q) random variable has mean mq and variance mq(1−q). | fact | tagged | Binomial Distribution: “$E[X] = np$ and $\text{Var}(X) = np(1-p)$” |
| The expected number of claims needed for full credibility is the required number of exposures n multiplied by the expected claims per expos… | procedure | tagged | Full Credibility Standard: “A standard stated in claims converts to exposures by dividing by the expected claim frequency per e…” |

</details>

<details><summary><code>fams-039</code> · answerable</summary>

Tagged pages: Maximum Likelihood Estimation, Truncation, Exponential Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| Observations from a sample where no information is available about losses at or below a threshold d are left-truncated at d (truncated from… | fact | tagged | Maximum Likelihood Estimation: “**[[Truncation]]**: only observations exceeding a threshold $d$ are recorded; condition on $X > d$,…” |
| For a left-truncated observation at d, the likelihood contribution is the conditional density f(x)/(1 - F(d)). | formula | tagged | Maximum Likelihood Estimation: “**[[Truncation]]**: only observations exceeding a threshold $d$ are recorded; condition on $X > d$,…” |
| The exponential distribution with mean θ has density f(x) = θ^{-1}e^{-x/θ} and survival function S(x) = 1 - F(x) = e^{-x/θ}. | formula | tagged | Exponential Distribution: “$$f(x) = \frac{1}{\theta}\,e^{-x/\theta}, \quad x > 0$$” |
| To find the maximum likelihood estimate, form the likelihood as the product of individual contributions, take the log-likelihood, different… | procedure | tagged | Maximum Likelihood Estimation: “When the maximum is at an interior point and the log-likelihood is differentiable, the MLE solves t…” |

</details>

<details><summary><code>fams-040</code> · answerable</summary>

Tagged pages: Maximum Likelihood Estimation, Truncation, Poisson Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The Poisson probability mass function is P(N=k) = e^{-λ} λ^k / k!, so P(N=0)=e^{-λ} and P(N=1)=λe^{-λ}. | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| When observations are truncated or deleted outside a set of values, each remaining observation's likelihood contribution is its probability… | procedure | tagged | Maximum Likelihood Estimation: “**[[Truncation]]**: only observations exceeding a threshold $d$ are recorded; condition on $X > d$,…” |
| The maximum likelihood estimate is found by forming the likelihood as the product of individual contributions, taking its log, setting the … | procedure | tagged | Maximum Likelihood Estimation: “When the maximum is at an interior point and the log-likelihood is differentiable, the MLE solves t…” |

</details>

<details><summary><code>fams-041</code> · answerable</summary>

Tagged pages: Aggregate Loss Model, Deductible, Poisson Thinning, Limited Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| In a collective risk model with Poisson claim counts, imposing an ordinary deductible d makes the number of payments (losses exceeding d) P… | fact | tagged | Poisson Thinning: “if each event of a [[Poisson Process]] with rate $\lambda$ is independently classified as type 1 wi…” |
| The variance of a compound Poisson aggregate S equals the Poisson rate times the second moment of the individual amount: Var(S) = λ·E[Y²]. | formula | tagged | Aggregate Loss Model: “When $N \sim \text{Poi}(\lambda)$: $\text{Var}(S) = \lambda \cdot E[X^2]$ (simplification since $\t…” |
| With an ordinary deductible d, the payment per payment is Y = X − d given X > d, so its second moment is E[(X − d)² \| X > d]. | definition | linked | Policy Limit: “$Y^P$ is the payment per payment, which counts only the losses above $d$, so its mean is divided by…” |
| The expected excess over d per payment is E[X − d \| X > d] = (E[X] − E[X ∧ d]) / (1 − F(d)), using the limited expected value E[X ∧ d]. | formula | linked | Policy Limit: “$$E[Y^P] = \frac{E[X \wedge u] - E[X \wedge d]}{S(d)}$$” |

</details>

<details><summary><code>fams-042</code> · untagged</summary>

Tagged pages: Aggregate Loss Model, Stop-Loss Reinsurance, Deductible, Convolution

| Item | Kind | Status | Where |
|---|---|---|---|
| Expected aggregate payments under an aggregate deductible d (stop-loss insurance) equal the stop-loss premium E[(S - d)_+], the expected va… | definition | tagged | Stop-Loss Reinsurance: “the reinsurer pays the amount by which the total losses $S$ exceed a retention $d$, and the expecte…” |
| For integer-valued aggregate losses S, E[(S - d)_+] = E[S] - d + sum_{s=0}^{d-1} (d - s) f_S(s). | formula | tagged | Convolution (collapsed): “with the stop-loss premium identity $E[(S-d)_+] = E[S] - d + \sum_{x<d}(d-x)f_S(x)$.” |
| In a collective risk model, E[S] = E[N]·E[X], and for a Poisson frequency E[N] = λ. | formula | tagged | Aggregate Loss Model: “$$E[S] = E[N] \cdot E[X]$$” |
| Compute f_S(s) for the aggregate loss by conditioning on the number of losses n: f_S(s) = sum_n P(N=n)·P(sum of n individual losses = s), u… | procedure | tagged | Convolution: “$$f_S(x) = \sum_{k=0}^{\infty} \Pr(N=k)\, f_X^{*k}(x)$$” |
| The Poisson probability mass function is P(N=n) = e^{-λ} λ^n / n!. | formula | elsewhere | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |

</details>

<details><summary><code>fams-043</code> · gap</summary>

Tagged pages: Frequency Distribution, Negative Binomial Distribution, Recursion

| Item | Kind | Status | Where |
|---|---|---|---|
| A distribution belongs to the (a, b, 0) class if its probabilities satisfy p_k/p_{k-1} = a + b/k for k = 1, 2, ..., with the recursion star… | definition | tagged | Frequency Distribution: “p_k = \left(a + \frac{b}{k}\right) p_{k-1}, \quad k = 1, 2, 3, \ldots” |
| In the (a, b, 0) class, the Poisson has a = 0 (b = λ), the geometric has b = 0 (a = β/(1+β)), the binomial has a < 0 (a and b opposite sign… | fact | tagged | Frequency Distribution: “\\| Poisson $(\lambda)$ \\| $e^{-\lambda}$ \\| $0$ \\| $\lambda$ \\| \\| Binomial $(m, q)$ \\| $(1-q)^m$ \…” |
| For the negative binomial with parameters r and β, a = β/(1+β) and b = (r−1)β/(1+β). | formula | tagged | Frequency Distribution: “\\| Neg. binomial $(r, \beta)$ \\| $(1+\beta)^{-r}$ \\| $\frac{\beta}{1+\beta}$ \\| $\frac{(r-1)\beta}{…” |
| For the negative binomial distribution, the probability at zero is p_0 = (1+β)^(-r). | formula | tagged | Negative Binomial Distribution: “$P(Y=k) = \dfrac{r(r+1)\cdots(r+k-1)\,\beta^k}{k!\,(1+\beta)^{r+k}}$” |
| If a Poisson (or geometric-type) recursion forces a = b = 0 with p_0 < 1, all later probabilities are zero and the probabilities fail to su… | fact | missing |  |

</details>

<details><summary><code>fams-044</code> · answerable</summary>

Tagged pages: Individual Risk Model, Binomial Distribution, Variance

| Item | Kind | Status | Where |
|---|---|---|---|
| For a compound (aggregate) model S with frequency N and severity X, E(S) = E(N)·E(X). | formula | linked | Aggregate Loss Model: “$$E[S] = E[N] \cdot E[X]$$” |
| For a compound model with independent frequency N and severity X, Var(S) = E(N)·Var(X) + Var(N)·E(X)^2. | formula | linked | Aggregate Loss Model: “$$\text{Var}(S) = E[N]\cdot\text{Var}(X) + \text{Var}(N)\cdot(E[X])^2$$” |
| A single event that occurs with probability q (at most one per exposure) is Bernoulli, and for n independent such exposures the count is bi… | fact | tagged | Binomial Distribution: “The **Binomial Distribution** $X \sim \text{Bin}(n, p)$ models the number of successes in $n$ indep…” |
| For independent groups, the means and variances of their aggregate costs add, giving the total mean and total variance; the standard deviat… | fact | tagged | Individual Risk Model: “Independence then lets the means and the variances add across policies.” |

</details>

<details><summary><code>fams-045</code> · answerable</summary>

Tagged pages: Payment Random Variable, Deductible, Coverage Modifications

| Item | Kind | Status | Where |
|---|---|---|---|
| The payment-per-payment random variable Y^P is the amount paid by the insurer given that a payment is made (i.e., conditional on the loss e… | definition | tagged | Coverage Modifications: “$Y^P = Y^L \mid Y^L > 0$, the *per-payment* variable, averages only over losses that produce a paym…” |
| For an ordinary deductible d, the payment per payment is Y^P = X - d given X > d, with density f_{Y^P}(y) = f_X(y + d) / S_X(d) for y > 0. | formula | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| The survival function S_X(d) = P(X > d) gives the probability that a loss exceeds the deductible, computed for a discrete distribution by s… | formula | tagged | Deductible: “For a discrete loss with probability function $p(x)$, the payment sums over the loss amounts above …” |
| The variance of a random variable equals E[Y^2] − (E[Y])^2, where moments of a discrete variable are probability-weighted sums of values an… | formula | syllabus | Variance: “Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$” |

</details>

<details><summary><code>fams-046</code> · answerable</summary>

Tagged pages: Mixture Distribution, Pareto Distribution, Probability, Severity

| Item | Kind | Status | Where |
|---|---|---|---|
| The CDF of a mixture distribution is the weighted average of the component CDFs, using the mixing probabilities as weights. | fact | tagged | Mixture Distribution: “The CDF, survival function, raw moments and moment generating function mix with the same weights.” |
| The Pareto distribution with shape α and scale θ has CDF F(x) = 1 - (θ/(x+θ))^α for x > 0. | formula | tagged | Pareto Distribution: “$$F(x) = 1 - \left(\frac{\theta}{x + \theta}\right)^{\alpha}$$” |

</details>

<details><summary><code>fams-047</code> · untagged</summary>

Tagged pages: Limited Fluctuation Credibility, Full Credibility Standard, Negative Binomial Distribution, Aggregate Loss Model

| Item | Kind | Status | Where |
|---|---|---|---|
| For a negative binomial frequency with parameters r and β, the mean is rβ and the variance is rβ(1+β). | formula | tagged | Negative Binomial Distribution: “$E[Y] = r\beta$ and $\text{Var}(Y) = r\beta(1+\beta)$” |
| For a compound distribution with frequency N independent of severity X, the mean of aggregate loss is E[N]E[X] and the variance is E[X]^2 V… | formula | tagged | Aggregate Loss Model: “$$\text{Var}(S) = E[N]\cdot\text{Var}(X) + \text{Var}(N)\cdot(E[X])^2$$” |
| The mean and variance of a discrete severity distribution are computed as the probability-weighted sum of x and the probability-weighted su… | definition | elsewhere | Mixture Distribution: “compute $E[X^2] - (E[X])^2$ from the mixed moments” |
| Full credibility standard (in expected number of exposures/observations) for aggregate losses to be within a proportion k of expected with … | formula | tagged | Limited Fluctuation Credibility: “$$n_{\text{full}} = \left(\frac{z_{\alpha/2}}{r}\right)^2 \cdot \frac{\text{Var}(X)}{[\text{E}(X)]^…” |
| For 95% probability, the standard normal percentile used in the full credibility standard is 1.96 (the 97.5th percentile). | fact | tagged | Full Credibility Standard: “$p = 0.90 \Rightarrow z_{0.95} = 1.645$” |
| To convert a full credibility standard expressed in number of observations (e.g., exposures) into expected number of claims, multiply by th… | procedure | tagged | Full Credibility Standard: “A standard stated in claims converts to exposures by dividing by the expected claim frequency per e…” |

</details>

<details><summary><code>fams-048</code> · untagged</summary>

Tagged pages: Maximum Likelihood Estimation, Truncation, Censoring, Pareto Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The maximum likelihood estimate maximizes the likelihood, the product of each observation's contribution; the estimate is found by maximizi… | procedure | tagged | Maximum Likelihood Estimation: “When the maximum is at an interior point and the log-likelihood is differentiable, the MLE solves t…” |
| An exactly observed loss (no truncation or censoring) contributes its density f(x) to the likelihood. | fact | tagged | Censoring: “An observation that is **not** censored (the exact value is known) contributes $f(x\\|\theta)$ to th…” |
| A loss censored at a policy limit (known only to exceed the limit u) contributes the survival probability 1 - F(u) to the likelihood. | fact | elsewhere | Policy Limit: “a claim recorded at the limit says only that the loss was at least $u$, which is why such a claim e…” |
| With a deductible d (left truncation), a loss observed as ground-up amount x contributes f(x)/(1 - F(d)) to the likelihood, i.e. the densit… | fact | tagged | Truncation: “$$L_i(\theta) = \frac{f(x \mid \theta)}{S(d \mid \theta)}$$” |
| The Pareto distribution with parameters alpha and theta has density f(x) = alpha*theta^alpha/(x+theta)^(alpha+1) and survival function S(x)… | formula | tagged | Pareto Distribution: “$$f(x) = \frac{\alpha\,\theta^{\alpha}}{(x + \theta)^{\alpha + 1}}, \quad x > 0$$” |
| When a policy has a deductible, the ground-up loss is the observed payment plus the deductible, so the distribution's density and survival … | fact | tagged | Truncation: “In insurance, **left-truncation** arises with deductibles: only losses exceeding the deductible $d$…” |

</details>

<details><summary><code>fams-049</code> · answerable</summary>

Tagged pages: Maximum Likelihood Estimation, Censoring, Weibull Distribution, Severity

| Item | Kind | Status | Where |
|---|---|---|---|
| The maximum likelihood estimate is found by maximizing the likelihood (or log-likelihood) function, typically by setting its derivative wit… | procedure | tagged | Maximum Likelihood Estimation: “When the maximum is at an interior point and the log-likelihood is differentiable, the MLE solves t…” |
| For complete (exactly observed) data, each observation contributes its density f(x) to the likelihood, and the likelihood is the product of… | formula | tagged | Maximum Likelihood Estimation: “$$L(\theta) = \prod_{i=1}^n f(x_i \mid \theta)$$” |
| A right-censored observation (value known only to exceed a limit u) contributes the survival probability S(u) = 1 - F(u) to the likelihood. | procedure | tagged | Censoring: “$$\text{If } X > c: \quad L_i(\theta) = P(X > c \mid \theta)$$” |
| The Weibull distribution with parameters theta and tau has CDF F(x) = 1 - exp[-(x/theta)^tau], and its density is the derivative f(x) = tau… | formula | tagged | Weibull Distribution: “$$F(x) = 1 - e^{-(x/\theta)^{\tau}}$$” |

</details>

<details><summary><code>fams-050</code> · gap</summary>

Tagged pages: Reinsurance, Inflation, Pareto Distribution, Deductible, Insurance Premium

| Item | Kind | Status | Where |
|---|---|---|---|
| The expected payment per loss for an insurance with ordinary deductible d is E[(X - d)+] = E[X] - E[X ∧ d], where X ∧ d is the limited loss… | formula | tagged | Deductible: “$$E[(X - d)_+] = E[X] - E[X \wedge d]$$” |
| For a Pareto distribution with shape α and scale θ, the mean is θ/(α-1) and the limited expected value is E[X ∧ d] = θ/(α-1) · [1 - (θ/(θ+d… | formula | tagged | Pareto Distribution: “$$E[X \wedge x] = \frac{\theta}{\alpha - 1}\left[1 - \left(\frac{\theta}{x + \theta}\right)^{\alpha…” |
| Under uniform inflation by factor (1+r) on a loss, a Pareto distribution keeps the same α and its scale θ is multiplied by (1+r), since Par… | fact | syllabus | Scale and Shape Parameters: “In the exam tables, $\theta$ is the scale parameter of the exponential, gamma, Weibull and Pareto f…” |
| A reinsurance layer with a fixed deductible applied to the insurer's payments (after the insurance deductible) is equivalent to a deductibl… | procedure | missing |  |
| A premium equal to (1+loading) times expected claims is the expected claims plus a proportional (relative security) loading. | definition | missing |  |
| Fixed (unindexed) deductibles do not inflate with losses, so after inflation the deductible stays at the same dollar amount while the loss … | fact | tagged | Inflation: “Many deductibles and benefit limits are stated in **fixed dollars** that do not rise with inflation…” |

</details>

<details><summary><code>fams-051</code> · untagged</summary>

Tagged pages: Aggregate Loss Model, Deductible, Poisson Thinning, Variance

| Item | Kind | Status | Where |
|---|---|---|---|
| With an ordinary deductible, the number of payments (losses exceeding the deductible) is Poisson with mean equal to the original Poisson ra… | fact | tagged | Poisson Thinning: “Standard uses: claims that pierce a [[Deductible]] ($p = P(X > d)$), claims by cause of loss or cov…” |
| Find the per-payment severity distribution under an ordinary deductible d as the loss amount minus d, conditional on the loss exceeding d; … | procedure | syllabus | Claim: “The payment per payment $Y^P$ is conditional on $X > d$, and $E[Y^L] = P(X > d)\,E[Y^P]$.” |
| A uniform distribution on (a, b) has mean (a+b)/2 and variance (b-a)^2/12. | formula | elsewhere | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| For a compound frequency-severity model with independent N and X, Var(S) = E(N)Var(X) + E(X)^2 Var(N). | formula | tagged | Aggregate Loss Model: “$$\text{Var}(S) = E[N]\cdot\text{Var}(X) + \text{Var}(N)\cdot(E[X])^2$$” |
| A Poisson random variable has mean equal to its variance, both equal to lambda. | fact | elsewhere | Poisson Distribution: “A defining property is $E[X] = \text{Var}(X) = \lambda$ — the mean and variance are equal” |

</details>

<details><summary><code>fams-052</code> · gap</summary>

Tagged pages: Maximum Likelihood Estimation, Censoring

| Item | Kind | Status | Where |
|---|---|---|---|
| The density is the negative derivative of the survival function: f(x) = -S'(x). | formula | missing |  |
| The likelihood for a sample with exact and right-censored observations is the product of the density f(x) at each exactly observed value an… | procedure | tagged | Maximum Likelihood Estimation: “observation is known to exceed some value $c$; contribute $P(X > c \mid \theta) = S(c \mid \theta)$…” |
| The maximum likelihood estimate is found by maximizing the likelihood, typically by taking the log-likelihood, setting its derivative with … | procedure | tagged | Maximum Likelihood Estimation: “When the maximum is at an interior point and the log-likelihood is differentiable, the MLE solves t…” |
| An observation known only to exceed a value (e.g., 'one other value exceeds 4') is right-censored at that value and contributes S(value) to… | fact | tagged | Maximum Likelihood Estimation: “observation is known to exceed some value $c$; contribute $P(X > c \mid \theta) = S(c \mid \theta)$…” |

</details>

<details><summary><code>fams-053</code> · answerable</summary>

Tagged pages: Maximum Likelihood Estimation, Binomial Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The binomial distribution with parameters m and q gives the probability of k claims as C(m,k) q^k (1-q)^(m-k) for k = 0,...,m. | definition | tagged | Binomial Distribution: “$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$” |
| For grouped (frequency-table) data, the likelihood is the product over categories of the model probability of each category raised to the n… | formula | syllabus | Grouped Data: “$$L(\theta) = \prod_{j=1}^{k}\big[F(c_j \mid \theta) - F(c_{j-1} \mid \theta)\big]^{n_j}$$” |
| To find the maximum likelihood estimate, set the derivative of the loglikelihood with respect to the parameter equal to zero and solve for … | procedure | tagged | Maximum Likelihood Estimation: “When the maximum is at an interior point and the log-likelihood is differentiable, the MLE solves t…” |

</details>

<details><summary><code>fams-054</code> · answerable</summary>

Tagged pages: Maximum Likelihood Estimation, Truncation, Censoring, Uniform Continuous Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| For left-truncated data, a death or failure observed at time x contributes f(x)/S(d) to the likelihood, where d is the truncation (entry) p… | procedure | tagged | Maximum Likelihood Estimation: “**[[Truncation]]**: only observations exceeding a threshold $d$ are recorded; condition on $X > d$,…” |
| For right-censored data, an observation still surviving at the censoring point c contributes S(c) to the likelihood. | procedure | tagged | Maximum Likelihood Estimation: “**[[Censoring]]**: observation is known to exceed some value $c$; contribute $P(X > c \mid \theta) …” |
| For a uniform distribution on (0, ω), the density is f(x) = 1/ω and the survival function is S(x) = (ω − x)/ω for 0 < x < ω. | formula | tagged | Uniform Continuous Distribution: “$$f(x) = \frac{1}{b - a}, \quad a < x < b$$” |
| A maximum likelihood estimate is found by maximizing the likelihood, typically by setting the derivative of the log-likelihood to zero and … | procedure | tagged | Maximum Likelihood Estimation: “When the maximum is at an interior point and the log-likelihood is differentiable, the MLE solves t…” |

</details>

<details><summary><code>fams-055</code> · answerable</summary>

Tagged pages: Limited Fluctuation Credibility, Full Credibility Standard, Uniform Continuous Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| Under limited fluctuation credibility, the full-credibility standard for the number of claims (frequency only) is n = (z/k)^2 for Poisson c… | formula | tagged | Limited Fluctuation Credibility: “For **claim frequency** (Poisson): $\text{Var}(X)/[E(X)]^2 = 1/\lambda$, giving $n_{\text{full}} = …” |
| For full credibility of total cost of claims (aggregate losses) with Poisson frequency, the expected number of claims needed is (z/k)^2 × (… | formula | tagged | Full Credibility Standard: “**[[Aggregate Loss Model\\|Aggregate]]** loss with Poisson frequency: $n_F = (z/k)^2\left(1 + \mathr…” |
| A continuous uniform distribution on [a, b] has mean (a+b)/2 and variance (b−a)^2/12. | fact | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |

</details>

<details><summary><code>fams-056</code> · untagged</summary>

Tagged pages: Maximum Likelihood Estimation, Grouped Data, Single-Parameter Pareto Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| For grouped (interval) data, the likelihood is the product over intervals of the probability of falling in each interval, [F(upper) - F(low… | procedure | tagged | Grouped Data: “$$L(\theta) = \prod_{j=1}^{k}\big[F(c_j \mid \theta) - F(c_{j-1} \mid \theta)\big]^{n_j}$$” |
| The maximum likelihood estimate is found by maximizing the likelihood, typically by taking the log-likelihood, differentiating with respect… | procedure | tagged | Maximum Likelihood Estimation: “When the maximum is at an interior point and the log-likelihood is differentiable, the MLE solves t…” |
| Constant multiplicative factors in the likelihood (not depending on the parameter) can be dropped, since they do not affect the maximizing … | fact | elsewhere | Approximate Confidence Interval (collapsed): “Apart from a constant, the log-likelihood is $\ell(\alpha) = 10\ln\alpha - 4\alpha$” |
| The Single-parameter Pareto distribution with parameter theta has CDF F(x) = 1 - theta/x for x > theta, so P(X in (a,b]) = theta/a - theta/… | definition | tagged | Single-Parameter Pareto Distribution: “$$F(x) = 1 - \left(\frac{\theta}{x}\right)^{\alpha}, \quad x > \theta$$” |

</details>

<details><summary><code>fams-057</code> · answerable</summary>

Tagged pages: Deductible, Limited Expected Value, Policy Limit, Coinsurance, Short-Term Insurance Coverage

| Item | Kind | Status | Where |
|---|---|---|---|
| With a deductible d, coinsurance factor α, and policy limit on payment, the expected payment per loss is α[E(X∧u) − E(X∧d)], where u is the… | formula | tagged | Policy Limit: “With a deductible $d$ and coinsurance $\alpha$, the payment is $\alpha\big[(X \wedge u) - (X \wedge…” |
| When a policy pays a fraction α of the loss in excess of deductible d with a maximum payment M, the maximum is reached at loss level u = M/… | procedure | tagged | Policy Limit: “With a deductible $d$ and coinsurance $\alpha$, the payment is $\alpha\big[(X \wedge u) - (X \wedge…” |
| The limited expected value is E(X∧u) = ∫_0^u S(x) dx, where S(x) = 1 − F(x) is the survival function. | formula | tagged | Limited Expected Value: “E[X \wedge u] = \int_0^u [1 - F(x)]\,dx \quad \text{(for non-negative } X\text{)}” |
| The expected payment per payment equals the expected payment per loss divided by the probability that a loss exceeds the deductible, 1 − F(… | formula | tagged | Policy Limit: “E[Y^P] = \frac{E[X \wedge u] - E[X \wedge d]}{S(d)}” |

</details>

<details><summary><code>fams-058</code> · gap</summary>

Tagged pages: Aggregate Loss Model, Poisson Distribution, Severity Distribution, Moment

| Item | Kind | Status | Where |
|---|---|---|---|
| For a compound Poisson aggregate loss model with frequency mean λ and severity X, the variance of aggregate losses is Var(S) = λ·E[X²]. | formula | tagged | Aggregate Loss Model: “When $N \sim \text{Poi}(\lambda)$: $\text{Var}(S) = \lambda \cdot E[X^2]$ (simplification since $\t…” |
| For aggregate losses S with independent frequency N and severity X, Var(S) = E[N]·Var(X) + Var(N)·(E[X])². | formula | tagged | Aggregate Loss Model: “$$\text{Var}(S) = E[N]\cdot\text{Var}(X) + \text{Var}(N)\cdot(E[X])^2$$” |
| For a Poisson distribution, the mean and variance both equal λ. | fact | tagged | Poisson Distribution: “A defining property is $E[X] = \text{Var}(X) = \lambda$ — the mean and variance are equal” |
| The k-th raw moment of a Burr distribution with parameters α, θ, γ is E[X^k] = θ^k Γ(1+k/γ) Γ(α−k/γ) / Γ(α), valid for −γ < k < αγ (from th… | formula | missing |  |

</details>

<details><summary><code>fams-059</code> · answerable</summary>

Tagged pages: Limited Expected Value, Deductible, Coinsurance, Poisson Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The limited expected value E(X ∧ u) is the expected value of the loss capped at the limit u, i.e., E[min(X, u)]. | definition | tagged | Limited Expected Value: “The **Limited Expected Value** (LEV) of a random variable $X$ at limit $u$ is the expected value of…” |
| For a discrete non-negative integer loss, E(X ∧ u) = Σ_{x<u} x·f(x) + u·[1 − F(u−1)]. | formula | tagged | Deductible: “E[X \wedge d] = \sum_{x < d} x\,p(x) + d\,P(X \geq d)” |
| With an ordinary deductible d, the expected cost per loss is E(X) − E(X ∧ d). | formula | tagged | Deductible: “E[(X - d)_+] = E[X] - E[X \wedge d]” |
| With coinsurance factor α, the insurer pays proportion α of each loss, so the expected cost per loss is α·E(X). | formula | tagged | Coinsurance: “under which the insurer pays a fixed percentage $c$ ($0 < c \leq 1$) of the covered loss, with the …” |
| The Poisson distribution with mean λ has pmf f(k) = e^(−λ) λ^k / k! and mean λ. | formula | tagged | Poisson Distribution: “P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!} … A defining property is $E[X] = \text{Var}(X) = \lambd…” |

</details>

<details><summary><code>fams-060</code> · gap</summary>

Tagged pages: Limited Expected Value, Deductible, Coinsurance, Pareto Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The limited expected value of a Pareto distribution is E(X∧x) = θ/(α−1) · [1 − (θ/(x+θ))^(α−1)], which for α=2 simplifies to θ(1 − θ/(x+θ))… | formula | tagged | Pareto Distribution: “$$E[X \wedge x] = \frac{\theta}{\alpha - 1}\left[1 - \left(\frac{\theta}{x + \theta}\right)^{\alpha…” |
| The expected payment on the layer of losses between a and b equals E(X∧b) − E(X∧a); the expected payment on losses above a equals E(X) − E(… | fact | tagged | Deductible: “$$E[(X - d)_+] = E[X] - E[X \wedge d]$$” |
| For a policy with tiered coinsurance by layer, the insurer's expected reimbursement is the sum over layers of the insurer's share times the… | procedure | linked | Policy Limit: “With a deductible $d$ and coinsurance $\alpha$, the payment is $\alpha\big[(X \wedge u) - (X \wedge…” |
| When a policyholder's out-of-pocket maximum-like threshold is defined by cumulative policyholder payments, find the loss level at which cum… | procedure | missing |  |
| An ordinary deductible d means the insurer pays nothing on losses below d and pays the excess of the loss over d; the policyholder bears th… | definition | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |

</details>

<details><summary><code>fams-061</code> · answerable</summary>

Tagged pages: Aggregate Loss Model, Normal Approximation, Negative Binomial Distribution, Uniform Continuous Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| For a negative binomial distribution with parameters r and beta, the mean is r*beta and the variance is r*beta*(1+beta). | formula | tagged | Negative Binomial Distribution: “$E[Y] = r\beta$ and $\text{Var}(Y) = r\beta(1+\beta)$” |
| For a uniform distribution on (a, b), the mean is (a+b)/2 and the variance is (b-a)^2/12. | formula | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| For a compound aggregate loss S with frequency N independent of severity X, E[S] = E[N]E[X]. | formula | tagged | Aggregate Loss Model: “$$E[S] = E[N] \cdot E[X]$$” |
| For a compound aggregate loss S with frequency N independent of severity X, Var(S) = E[N]Var(X) + Var(N)E[X]^2. | formula | tagged | Aggregate Loss Model: “$$\text{Var}(S) = E[N]\cdot\text{Var}(X) + \text{Var}(N)\cdot(E[X])^2$$” |
| Using the normal approximation, the premium (percentile) at which aggregate losses exceed it with probability p is E[S] + z*sqrt(Var(S)), w… | procedure | tagged | Normal Approximation: “the total exceeded with probability $\alpha$ is about $n\mu + z_{1-\alpha}\,\sigma\sqrt{n}$” |

</details>

<details><summary><code>fams-063</code> · untagged</summary>

Tagged pages: Deductible, Truncation

| Item | Kind | Status | Where |
|---|---|---|---|
| The CDF is obtained from the density by integrating from the lower bound of support to x: F(x) = ∫ f(y) dy from the lower bound to x. | formula | elsewhere | Cumulative Distribution Function (CDF): “For a continuous random variable, $F(x) = \int_{-\infty}^{x} f(t)\, dt$” |
| With an ordinary deductible d, the payment per loss is 0 if the loss X is below d and X − d if X is at least d, i.e. (X − d)+. | definition | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| For a continuous random variable, P(Y < y) = 1 − P(Y ≥ y), and P(X ≥ x) = 1 − F(x), so P(X ≥ x) = 1 − F(x) with no point-mass adjustment. | fact | tagged | Deductible: “For a nonnegative loss with survival function $S(x) = 1 - F(x)$” |

</details>

<details><summary><code>fams-064</code> · gap</summary>

Tagged pages: Deductible, Grouped Data, Loss Elimination Ratio

| Item | Kind | Status | Where |
|---|---|---|---|
| A per-loss ordinary deductible d reduces each loss to max(X - d, 0), so the insurer pays nothing on losses below d and pays the loss minus … | definition | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| From grouped loss data, compute total losses paid under a deductible d by taking total ground-up losses, removing the losses in layers enti… | procedure | tagged | Deductible: “For a discrete loss with probability function $p(x)$, the payment sums over the loss amounts above …” |
| Loss cost is proportional to expected insurer payments, so the percentage reduction in loss costs from changing deductibles equals the perc… | fact | tagged | Loss Elimination Ratio: “The LER is the bridge from a full-coverage rate to a deductible rate: multiply the full-coverage lo…” |
| The percentage reduction in loss cost from moving from deductible d1 to a higher deductible d2 is (payments at d1 - payments at d2) / payme… | formula | missing |  |

</details>

<details><summary><code>fams-068</code> · answerable</summary>

Tagged pages: Parallelogram Method, On-Leveling

| Item | Kind | Status | Where |
|---|---|---|---|
| On-level premium is the premium that would have been earned in a past period had the current rate level been in effect throughout, obtained… | definition | linked | On Level Premium: “**On-Level Premium** is historical earned premium restated as though every policy had been written …” |
| The parallelogram method for on-level factors: draw the calendar-year square with policy term as the side, plot rate change dates as diagon… | procedure | tagged | Parallelogram Method: “A calendar year is a unit square: time across, fraction of the policy term earned up. A rate change…” |
| With one-year policies and uniformly distributed issues, a rate change affects earned premium gradually over a year, so the calendar-year a… | fact | tagged | Parallelogram Method: “$I_k$ is the cumulative rate level index of rate level group $k$ (each index is the previous one ti…” |
| Cumulative rate level indices are found by compounding successive rate changes multiplicatively (each change multiplies the prior level by … | procedure | tagged | Parallelogram Method: “$I_k$ is the cumulative rate level index of rate level group $k$ (each index is the previous one ti…” |
| Rate changes before the earliest period's coverage affect no earned premium in the period (all premium is at the already-established level)… | fact | tagged | Parallelogram Method (collapsed): “CY 2025 needs none at all, since every policy written before $4/1/2024$ expired by $10/1/2024$.” |

</details>

<details><summary><code>fams-069</code> · answerable</summary>

Tagged pages: Loss Ratio Method, Loss Trend, Development Factor, Permissible Loss Ratio, Ratemaking

| Item | Kind | Status | Where |
|---|---|---|---|
| In the loss ratio method, the indicated rate change is the (weighted) projected ultimate loss ratio divided by the permissible loss ratio, … | formula | tagged | Loss Ratio Method: “$$\text{Indicated Change} = \frac{\text{Projected Loss Ratio}}{\text{PLR}} - 1 \quad \text{(all-var…” |
| Projected ultimate losses are obtained by multiplying reported losses by the loss development factor to ultimate and by the loss trend fact… | procedure | tagged | Loss Ratio Method: “The numerator's loss ratio must be **projected**: ultimate losses (developed), trended to the futur…” |
| The loss trend period runs from the average accident date of the experience period to the average accident date of the period the new rates… | procedure | tagged | Loss Trend: “$t$ is the selected annual trend and $n$ the **trend period**, measured from the average date of lo…” |
| For one-year policies written uniformly, rates in effect for one year starting on date D produce accident dates spanning two years, with av… | fact | tagged | Loss Trend (collapsed): “The first policy is exposed $7/1/2025$–$6/30/2026$ and the last $7/1/2026$–$6/30/2027$, so the expo…” |
| For accident-year data with uniformly written one-year policies, the average accident date of the accident year is its midpoint (July 1). | fact | tagged | Loss Trend (collapsed): “Accident year $2023$ runs $1/1$–$12/31/2023$; with losses occurring uniformly, its average loss dat…” |
| Loss ratios for each year are computed as projected ultimate losses divided by earned premium at current rates, and are combined using the … | procedure | linked | Overall Rate Level Indication: “Weighting across years in the experience period is a judgment: many companies sum projected losses …” |

</details>

<details><summary><code>fams-070</code> · answerable</summary>

Tagged pages: Parallelogram Method, On-Leveling

| Item | Kind | Status | Where |
|---|---|---|---|
| The on-level factor is the current rate level divided by the average rate level in effect during the period of interest, and it multiplies … | definition | tagged | On-Leveling: “$$\text{On-Level Factor} = \frac{\text{Current cumulative index}}{\text{Average index for the year}…” |
| In the parallelogram method, the average rate level for a calendar year is the area-weighted average of the cumulative rate levels, where e… | procedure | tagged | On-Leveling: “each region's **area** is the share of the year's earned premium written at that rate level.” |
| With policies written uniformly and a given term, the line for a rate change date on the policy-issue/time diagram is a diagonal, so polici… | fact | tagged | Parallelogram Method: “A rate change for policies written on or after a date is a **diagonal** line whose slope is set by …” |
| Cumulative rate level indices are obtained by multiplying successive rate change factors (1 + percentage change) together. | formula | tagged | Parallelogram Method: “$I_k$ is the cumulative rate level index of rate level group $k$ (each index is the previous one ti…” |
| A rate change whose effect has not fully earned into the year (e.g., a change whose policies are still in force from earlier) affects calen… | fact | tagged | Parallelogram Method (collapsed): “CY 2025 needs none at all, since every policy written before $4/1/2024$ expired by $10/1/2024$.” |

</details>

<details><summary><code>fams-071</code> · answerable</summary>

Tagged pages: Bornhuetter-Ferguson Method, Development Factor, Cumulative Development Factor, Chain Ladder Method

| Item | Kind | Status | Where |
|---|---|---|---|
| The Bornhuetter-Ferguson reserve equals the expected ultimate loss (earned premium times expected loss ratio) multiplied by the percent unr… | formula | tagged | Bornhuetter-Ferguson Method: “$$\text{IBNR} = \left(1 - \tfrac{1}{\text{CDF}}\right) \times \text{ELR} \times \text{EP}$$” |
| The volume-weighted average age-to-age development factor for a period is the sum of cumulative losses at the later age divided by the sum … | formula | tagged | Development Factor: “- **Volume-weighted average**: $\Sigma(\text{col }n{+}1) / \Sigma(\text{col }n)$ — gives more credi…” |
| The cumulative development factor (to ultimate) is found by multiplying the successive age-to-age factors from the current age through the … | procedure | tagged | Cumulative Development Factor: “CDFs are built **backwards from the tail**: start with the tail factor, multiply in each successive…” |
| An accident year whose losses are fully developed (latest age at the final development age with no further development) has a CDF of 1 and … | fact | tagged | Cumulative Development Factor: “The reciprocal is the **percentage reported** (or paid): $p_n = 1/\text{CDF}_n$, and $1 - p_n$ is t…” |
| The indicated loss reserve is the ultimate loss estimate minus losses paid to date, and the total reserve is the sum of the reserves across… | definition | tagged | Chain Ladder Method: “$$\text{IBNR} = U_{\text{AY}} - C_{\text{AY},\,n}$$” |

</details>

<details><summary><code>fams-072</code> · answerable</summary>

Tagged pages: Bornhuetter-Ferguson Method, Development Factor, Cumulative Development Factor, Development Triangle

| Item | Kind | Status | Where |
|---|---|---|---|
| An age-to-age (link ratio) development factor for a given development period is the ratio of cumulative paid losses at the later age to cum… | formula | tagged | Development Factor: “$$f_{n \to n{+}1} = \frac{\text{Losses at age }n{+}1}{\text{Losses at age }n}$$” |
| An n-year arithmetic average development factor is the simple average of the individual age-to-age factors from the most recent n accident … | procedure | tagged | Development Factor: “**Latest-$k$-year average**: uses only the most recent $k$ accident years — reduces the influence o…” |
| The cumulative development factor to ultimate for an age is the product of the selected age-to-age factors from that age through the end of… | procedure | tagged | Cumulative Development Factor: “CDFs are built **backwards from the tail**: start with the tail factor, multiply in each successive…” |
| The expected percentage of ultimate losses still unreported or unpaid at a given age equals 1 minus 1/CDF, where CDF is the cumulative deve… | fact | tagged | Bornhuetter-Ferguson Method: “$C$ is reported (or paid) losses to date, $U_0 = \text{ELR} \times \text{EP}$ the a priori expectat…” |
| The Bornhuetter-Ferguson reserve for an accident year equals earned premium times the expected loss ratio times (1 - 1/CDF), i.e., the a pr… | formula | tagged | Bornhuetter-Ferguson Method: “$$\text{IBNR} = \left(1 - \tfrac{1}{\text{CDF}}\right) \times \text{ELR} \times \text{EP}$$” |
| The total loss reserve is the sum of the accident-year reserves; an accident year already at the final development age has a zero reserve u… | fact | linked | Chain Ladder Method (collapsed): “\\| **Total** \\| $2{,}550$ \\| \\| $3{,}433$ \\| $883$ \\|” |

</details>

<details><summary><code>fams-073</code> · answerable</summary>

Tagged pages: Bornhuetter-Ferguson Method, IBNR, Cumulative Development Factor

| Item | Kind | Status | Where |
|---|---|---|---|
| The Bornhuetter-Ferguson reserve (IBNR) for an accident year equals expected ultimate losses times (1 - 1/CDF), i.e., expected losses times… | formula | tagged | Bornhuetter-Ferguson Method: “$$\text{IBNR} = \left(1 - \tfrac{1}{\text{CDF}}\right) \times \text{ELR} \times \text{EP}$$” |
| Expected losses for an accident year equal earned premium times the expected loss ratio (a priori ELR). | formula | tagged | Bornhuetter-Ferguson Method: “$C$ is reported (or paid) losses to date, $U_0 = \text{ELR} \times \text{EP}$ the a priori expectat…” |
| The cumulative development factor (CDF) to ultimate for an accident year is the product of the age-to-age factors from its current age thro… | procedure | tagged | Cumulative Development Factor: “CDFs are built **backwards from the tail**: start with the tail factor, multiply in each successive…” |
| As of a valuation date, each successive accident year is one development period younger: at Dec 31 of CY3, AY1 is at 36 months, AY2 at 24 m… | fact | linked | Development Triangle: “**Development Triangle** is the fundamental data structure of reserving: amounts arranged with **co…” |
| The total IBNR reserve is the sum of the BF reserves across all accident years. | fact | linked | Cape Cod Method (collapsed): “\\| **Total** \\| \\| $\$2{,}309$K \\|” |

</details>

<details><summary><code>fams-074</code> · answerable</summary>

Tagged pages: Reinsurance, Layer of Insurance, Excess of Loss, Catastrophe Loss, Claim, Insurer

| Item | Kind | Status | Where |
|---|---|---|---|
| A catastrophe reinsurance layer written as 'x% of L excess of R' means the reinsurer pays x% of the portion of the loss falling between R a… | definition | tagged | Layer of Insurance: “is the slice of each loss between an attachment point $a$ and an exhaustion point $b = a + l$” |
| To find the reinsurer's payment on a layered treaty, apply each layer to the loss within its attachment and limit (min(loss, R+L) minus R, … | procedure | tagged | Excess of Loss: “$$Y = \min\left(\max(X - R,\, 0),\; L\right)$$” |
| The primary insurer's retained loss equals the retention plus the unreinsured share (1 minus the reinsurer's percentage) of each layer's lo… | fact | tagged | Reinsurance: “$$\text{Net} = \text{Gross} - \text{Ceded}$$” |

</details>

<details><summary><code>fams-075</code> · answerable</summary>

Tagged pages: Increased Limits, Excess of Loss, Limited Expected Value, Reinsurance, Claim, Insurer

| Item | Kind | Status | Where |
|---|---|---|---|
| An increased limits factor (ILF) at limit L is the ratio of expected loss at limit L to expected loss at the basic limit, i.e. E(X∧L)/E(X∧b… | definition | tagged | Increased Limits: “$$\text{ILF}(L) = \frac{E[X \wedge L]}{E[X \wedge B]}$$” |
| The expected loss in a layer from a to b equals E(X∧b) − E(X∧a), the difference of limited expected values. | fact | tagged | Excess of Loss: “$$E[Y] = E[X \wedge (R + L)] - E[X \wedge R]$$” |
| The proportion of total losses (capped at the policy limit) falling in a layer is the difference of ILFs at the layer's upper and lower lim… | procedure | linked | Layer of Insurance: “In [[Increased Limits\\|ILF]] form, it is the basic-limits loss cost $\times\,[\text{ILF}(b) - \text…” |
| A layer described as X in excess of Y has upper limit X+Y and lower limit Y, so a layer of 300,000 excess of 100,000 spans 100,000 to 400,0… | fact | linked | Layer of Insurance: “the slice of each loss between an attachment point $a$ and an exhaustion point $b = a + l$, written…” |
| Expected losses equal the expected loss ratio times premium. | formula | tagged | Excess of Loss: “In both cases the factor multiplies subject premium times the expected loss ratio.” |

</details>

<details><summary><code>fams-076</code> · answerable</summary>

Tagged pages: Loss Trend, Exponential Trend, Trend

| Item | Kind | Status | Where |
|---|---|---|---|
| In exponential trend (log-linear) projection, the trended loss cost equals the historical loss cost times e raised to the slope of the fitt… | procedure | tagged | Exponential Trend: “The selected trend is applied as a factor $(1 + \hat{T})^{n}$, where $n$ is the trend period from t…” |
| The slope of a straight line fitted to the natural log of loss costs is the continuously compounded annual trend rate, so e raised to the s… | fact | tagged | Exponential Trend: “$b$ is the [[Linear Regression\\|least-squares]] slope of $\ln y_t$ on $t$: $b = \sum (t - \bar{t})(…” |
| Policies written over a one-year period with one-year terms have losses occurring over two years, so the average accident date of the new p… | fact | tagged | Loss Trend: “Policies are written between $7/1/2025$ and $6/30/2026$; each provides coverage for a year after it…” |
| An accident year covering a calendar year has an average accident date at its midpoint (July 1, or about mid-year), which is used to measur… | fact | tagged | Trend: “The trend period runs from the average date of historical losses (midpoint of the accident year) to…” |
| When experience periods are given weights for rate development, the indicated loss cost is the weighted average of each period's trended lo… | procedure | linked | Loss Ratio Method (collapsed): “Weighting the loss ratios $20/30/50$ toward recency would give $70.9\%$ here” |

</details>

<details><summary><code>fams-077</code> · answerable</summary>

Tagged pages: Put-Call Parity

| Item | Kind | Status | Where |
|---|---|---|---|
| Put-call parity for a European option on a non-dividend-paying stock: C - P = S_0 - K·e^{-rT}, where C and P are the call and put prices wi… | formula | linked | Black-Scholes Model: “Call and put satisfy [[Put-Call Parity\\|put-call parity]], $c - p = S_0 - Ke^{-rT}$, which is a qui…” |

</details>

<details><summary><code>fams-078</code> · answerable</summary>

Tagged pages: Put-Call Parity

| Item | Kind | Status | Where |
|---|---|---|---|
| Put-call parity for a non-dividend-paying stock: C - P = S0 - K e^{-rT}, i.e., C + K e^{-rT} = P + S0, where C and P are European call and … | formula | tagged | Put-Call Parity: “$$C - P = S_0 e^{-\delta T} - K e^{-rT}$$” |
| Put-call parity holds for each strike separately, so options on the same stock with the same expiration but different strikes can be relate… | fact | tagged | Put-Call Parity: “$$C - P = S_0 e^{-\delta T} - K e^{-rT}$$” |
| The present value of a strike price K paid at time T under a continuously compounded risk-free rate r is K e^{-rT}, so discounting uses exp… | fact | tagged | Put-Call Parity: “**Discounting the strike at the wrong rate basis.** $Ke^{-rT}$ needs a continuously compounded $r$;…” |

</details>

<details><summary><code>fams-081</code> · answerable</summary>

Tagged pages: Loss Elimination Ratio, Inflation, Exponential Distribution, Deductible, Scale and Shape Parameters

| Item | Kind | Status | Where |
|---|---|---|---|
| The loss elimination ratio for an ordinary deductible d is the fraction of expected losses eliminated by the deductible, LER(d) = E[X ∧ d] … | definition | tagged | Loss Elimination Ratio: “**Loss Elimination Ratio** (LER) is the proportion of ground-up losses removed by a deductible — th…” |
| For an exponential distribution with mean θ, the limited expected value is E[X ∧ d] = θ(1 − e^{−d/θ}) and the mean is θ. | formula | tagged | Exponential Distribution: “Capped at a [[Benefit Limit\\|limit]] $u$: $E[\min(X,u)] = \theta\left(1 - e^{-u/\theta}\right)$” |
| Under uniform inflation by factor (1+r), the new loss Y = (1+r)X has limited expected value E[Y ∧ d] = (1+r)·E[X ∧ d/(1+r)], and its mean i… | fact | tagged | Inflation: “$$E[(X' - d)_+] = (1+r)\,E\!\left[\left(X - \tfrac{d}{1+r}\right)_+\right]$$” |
| The exponential distribution is a scale distribution: multiplying an exponential variable by a constant gives an exponential with mean scal… | fact | tagged | Exponential Distribution: “- $\theta$ is a [[Scale and Shape Parameters\\|scale parameter]]: for $c > 0$, $cX$ is exponential w…” |
| The percentage increase in a quantity from Year 1 to Year 2 is computed as (value₂ / value₁) − 1. | procedure | tagged | Loss Elimination Ratio (collapsed): “$$\frac{2{,}400 \times 0.812}{2{,}000 \times 0.779} - 1 = +25.1\%$$” |

</details>

<details><summary><code>fams-082</code> · answerable</summary>

Tagged pages: Loss Elimination Ratio, Exponential Distribution, Lognormal Distribution, Inflation

| Item | Kind | Status | Where |
|---|---|---|---|
| The mean of a lognormal distribution with parameters mu and sigma is exp(mu + sigma^2/2). | formula | tagged | Lognormal Distribution: “$$E[X] = e^{\mu + \sigma^2/2}$$” |
| The loss elimination ratio for a per-loss deductible d is E[X ∧ d] / E[X], the fraction of expected loss eliminated by the deductible. | definition | tagged | Loss Elimination Ratio: “$$\text{LER}(d) = \frac{E[X \wedge d]}{E[X]}$$” |
| For an exponential distribution with mean theta, the limited expected value is E[X ∧ d] = theta(1 - e^{-d/theta}), so LER = 1 - e^{-d/theta… | formula | tagged | Exponential Distribution: “Capped at a [[Benefit Limit\\|limit]] $u$: $E[\min(X,u)] = \theta\left(1 - e^{-u/\theta}\right)$” |
| Inflation at a constant annual compound rate r over n years scales the expected loss by (1+r)^n. | procedure | tagged | Inflation: “$$X' = (1 + r)\,X$$” |

</details>

<details><summary><code>fams-083</code> · answerable</summary>

Tagged pages: Frequency Distribution, Binomial Distribution, Probability Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| A distribution in the (a, b, 0) class satisfies the recursion p_k / p_{k-1} = a + b/k for k = 1, 2, 3, ... | definition | tagged | Frequency Distribution: “$$p_k = \left(a + \frac{b}{k}\right) p_{k-1}, \quad k = 1, 2, 3, \ldots$$” |
| The sign and size of a and b identify the member of the (a, b, 0) class: a < 0 indicates a binomial, a = 0 a Poisson, and a > 0 a negative … | fact | tagged | Frequency Distribution: “The variance is below the mean for the binomial, equal to it for the Poisson and above it for the n…” |
| For the binomial(m, q) distribution, a = -q/(1-q) and b = (m+1)q/(1-q). | fact | tagged | Frequency Distribution: “\\| Binomial $(m, q)$ \\| $(1-q)^m$ \\| $-\frac{q}{1-q}$ \\| $\frac{(m+1)q}{1-q}$ \\|” |
| The mean of a binomial(m, q) distribution is mq. | fact | tagged | Frequency Distribution: “Every member has $E[N] = (a+b)/(1-a)$ and $\text{Var}(N) = (a+b)/(1-a)^2$, which give $\lambda$ and…” |
| For a zero-modified distribution with P(N^M = 0) = p_0^M built from base distribution N, the mean is E(N^M) = (1 - p_0^M)/(1 - p_0) × E(N),… | formula | tagged | Frequency Distribution: “A zero-modified one puts an arbitrary $p_0^M$ at zero and scales the rest as in the second block, s…” |
| For a binomial(m, q) distribution, the probability at zero is p_0 = (1-q)^m. | fact | tagged | Frequency Distribution: “\\| Binomial $(m, q)$ \\| $(1-q)^m$ \\| $-\frac{q}{1-q}$ \\| $\frac{(m+1)q}{1-q}$ \\|” |

</details>

<details><summary><code>fams-084</code> · error</summary>

Error: ValueError: no usable 'found' list in the reply

</details>

<details><summary><code>fams-085</code> · answerable</summary>

Tagged pages: Aggregate Loss Model, Limited Expected Value, Lognormal Distribution, Normal Approximation, Risk

| Item | Kind | Status | Where |
|---|---|---|---|
| For a lognormal X with parameters mu and sigma, the limited expected value is E[X ∧ d] = exp(mu + sigma^2/2)·Φ((ln d − mu − sigma^2)/sigma)… | formula | tagged | Lognormal Distribution: “$$E[X \wedge d] = e^{\mu + \sigma^2/2}\,\Phi\!\left(\frac{\ln d - \mu - \sigma^2}{\sigma}\right) + …” |
| The retained loss when a deductible (retention) d is applied to each claim is the claim size capped at d, i.e. X ∧ d = min(X, d), so retain… | definition | tagged | Limited Expected Value: “Also written $E[\min(X, u)]$; the **limited loss variable** is $Y = \min(X, u)$” |
| For a compound distribution S = X1+…+XN, E[S] = E[N]·E[X]. | formula | tagged | Aggregate Loss Model: “$$E[S] = E[N] \cdot E[X]$$” |
| For a compound Poisson distribution with Poisson mean λ, Var(S) = λ·E[X^2] (the variance equals the Poisson mean times the second moment of… | formula | tagged | Aggregate Loss Model: “When $N \sim \text{Poi}(\lambda)$: $\text{Var}(S) = \lambda \cdot E[X^2]$ (simplification since $\t…” |
| To approximate a percentile of an aggregate distribution with the normal approximation, match the mean and variance of S and compute the pe… | procedure | tagged | Normal Approximation: “Inverted, it sets a fund: the total exceeded with probability $\alpha$ is about $n\mu + z_{1-\alpha…” |

</details>

<details><summary><code>fams-086</code> · answerable</summary>

Tagged pages: Aggregate Loss Model, Normal Approximation

| Item | Kind | Status | Where |
|---|---|---|---|
| For a compound (aggregate) model S = X_1 + ... + X_N with N independent of the iid severities X, E[S] = E[N]·E[X]. | formula | tagged | Aggregate Loss Model: “$$E[S] = E[N] \cdot E[X]$$” |
| For a compound model with N independent of iid severities X, Var(S) = E[N]·Var(X) + Var(N)·(E[X])^2. | formula | tagged | Aggregate Loss Model: “$$\text{Var}(S) = E[N]\cdot\text{Var}(X) + \text{Var}(N)\cdot(E[X])^2$$” |
| For independent random variables, the means add and the variances add, so the total aggregate loss across independent products has mean and… | fact | syllabus | Individual Risk Model: “Independence then lets the means and the variances add across policies.” |
| To approximate a probability for a normally distributed quantity, standardize by subtracting the mean and dividing by the standard deviatio… | procedure | tagged | Normal Approximation: “The recipe: identify $n$, compute $E[S_n] = n\mu$ and $\text{Var}(S_n) = n\sigma^2$ ([[Moments for …” |

</details>

<details><summary><code>fams-087</code> · answerable</summary>

Tagged pages: Risk Measure

| Item | Kind | Status | Where |
|---|---|---|---|
| A coherent risk measure is one that satisfies all four properties: subadditivity, monotonicity, positive homogeneity, and translation invar… | definition | tagged | Risk Measure: “**Coherence** (Artzner, Delbaen, Eber and Heath, 1999) asks for four properties:” |
| Subadditivity requires that the risk measure of a sum of two losses is at most the sum of their individual risk measures: rho(X+Y) <= rho(X… | definition | tagged | Risk Measure: “*subadditive*: $\rho(X + Y) \leq \rho(X) + \rho(Y)$” |
| Monotonicity requires that if X <= Y with certainty, then rho(X) <= rho(Y). | definition | tagged | Risk Measure: “*monotone*: $X \leq Y \Rightarrow \rho(X) \leq \rho(Y)$” |
| Positive homogeneity requires that rho(cX) = c*rho(X) for any constant c > 0. | definition | tagged | Risk Measure: “*positive homogeneous*: $\rho(\lambda X) = \lambda\,\rho(X)$ for $\lambda \geq 0$” |
| Translation invariance requires that rho(X + c) = rho(X) + c for any constant c. | definition | tagged | Risk Measure: “*translation invariant*: $\rho(X + c) = \rho(X) + c$” |
| Expectation is linear: E(X+Y) = E(X) + E(Y), E(cX) = cE(X), E(X+c) = E(X) + c, and X <= Y implies E(X) <= E(Y). | fact | linked | Expected Value: “It is linear: $E[aX + b] = aE[X] + b$” |

</details>

<details><summary><code>fams-088</code> · answerable</summary>

Tagged pages: Maximum Likelihood Estimation, Pareto Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The likelihood function for an i.i.d. sample is the product of the density evaluated at each observation, viewed as a function of the param… | definition | tagged | Maximum Likelihood Estimation: “**Maximum Likelihood Estimation (MLE)** is a method of parameter estimation that chooses the parame…” |
| To find a maximum likelihood estimate, take the log of the likelihood, differentiate with respect to the parameter, set the derivative to z… | procedure | tagged | Maximum Likelihood Estimation: “When the maximum is at an interior point and the log-likelihood is differentiable, the MLE solves t…” |
| The log of a product is the sum of logs, and ln(a^b) = b ln a, which turns the likelihood product into a sum in the loglikelihood. | fact | tagged | Maximum Likelihood Estimation: “Taking the log turns the product into a sum and simplifies maximization” |
| For the single-parameter Pareto-type density f(x)=α θ^α (θ+x)^{-(α+1)} (Pareto with known θ), the MLE of α is n divided by the sum of ln((θ… | formula | linked | Single-Parameter Pareto Distribution: “$\hat{\alpha} = n \big/ \sum \ln(x_i/\theta)$” |

</details>

<details><summary><code>fams-089</code> · answerable</summary>

Tagged pages: Maximum Likelihood Estimation, Censoring, Pareto Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The likelihood for a sample with exactly observed values and right-censored values (known only to exceed a limit) is the product of the den… | procedure | tagged | Maximum Likelihood Estimation: “**[[Censoring]]**: observation is known to exceed some value $c$; contribute $P(X > c \mid \theta) …” |
| The Pareto distribution with parameters alpha and theta has density f(x) = alpha*theta^alpha/(x+theta)^(alpha+1) and survival function S(x)… | formula | tagged | Pareto Distribution: “f(x) = \frac{\alpha\,\theta^{\alpha}}{(x + \theta)^{\alpha + 1}}, \quad x > 0” |
| To find the maximum likelihood estimate, take the log of the likelihood, differentiate with respect to the parameter, and set the derivativ… | procedure | tagged | Maximum Likelihood Estimation: “Taking the log turns the product into a sum and simplifies maximization” |

</details>

<details><summary><code>fams-090</code> · answerable</summary>

Tagged pages: Maximum Likelihood Estimation, Poisson Distribution, Censoring

| Item | Kind | Status | Where |
|---|---|---|---|
| The likelihood function for grouped data is the product over groups of the probability of each group raised to the number of observations i… | definition | tagged | Maximum Likelihood Estimation: “is a method of parameter estimation that chooses the parameter value $\hat{\theta}$ that **maximize…” |
| For a Poisson distribution with parameter λ, P(N = k) = e^{-λ} λ^k / k!, so P(N = 0) = e^{-λ}, P(N ≥ 1) = 1 − e^{-λ}, and P(N < 2) = e^{-λ}… | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| To find the MLE, take the derivative of the loglikelihood, set it equal to zero, and solve for the parameter. | procedure | tagged | Maximum Likelihood Estimation: “the MLE solves the **score equation** $\ell'(\hat{\theta}) = 0$” |
| When data are censored or grouped into categories such as 'zero claims' and 'one or more claims', the likelihood uses the probability of ea… | fact | tagged | Censoring: “$$\text{If } X > c: \quad L_i(\theta) = P(X > c \mid \theta)$$” |

</details>

<details><summary><code>fams-091</code> · untagged</summary>

Tagged pages: Limited Fluctuation Credibility, Full Credibility Standard, Coefficient of Variation

| Item | Kind | Status | Where |
|---|---|---|---|
| Full credibility (limited fluctuation) requires that actual aggregate losses be within a fraction k of expected with probability p; the sta… | definition | tagged | Limited Fluctuation Credibility: “the number of observations $n_{\text{full}}$ required so that the observed mean is within $100r\%$ …” |
| For Poisson claim counts with random severity, the full credibility standard for aggregate losses (in expected claims) is (z/k)^2 (1 + CV_X… | formula | tagged | Full Credibility Standard: “loss with Poisson frequency: $n_F = (z/k)^2\left(1 + \mathrm{CV}_X^2\right)$ claims” |
| A probability p of being within the tolerance corresponds to the normal percentile z = Φ^{-1}((1+p)/2); for p = 0.90 this is 1.645. | fact | tagged | Full Credibility Standard: “$p = 0.90 \Rightarrow z_{0.95} = 1.645$” |
| The mean of a discrete distribution is Σ x·P(x) and its variance is E[X²] − (E[X])². | formula | elsewhere | Discrete Random Variable: “Expectations are sums: $E[g(X)] = \sum_x g(x)\,p(x)$.” |
| Because the standard is a required number of claims, a non-integer computed value is rounded up to the next whole number. | procedure | syllabus | Normal Approximation (collapsed): “n &\ge 1{,}082.4 … At least $1{,}083$ policies.” |

</details>

<details><summary><code>fams-092</code> · gap</summary>

Tagged pages: Limited Fluctuation Credibility, Full Credibility Standard, Severity Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The full credibility standard for aggregate (total) loss with Poisson claim frequency, in expected number of claims, is (z/k)^2 (1 + CV_X^2… | formula | tagged | Full Credibility Standard: “**[[Aggregate Loss Model\\|Aggregate]]** loss with Poisson frequency: $n_F = (z/k)^2\left(1 + \mathr…” |
| To find the normal percentile z for 'within 100k% of the true value with probability P', use z = Φ^{-1}((1+P)/2), e.g. 1.96 for P = 0.95. | procedure | tagged | Full Credibility Standard: “$p = 0.90 \Rightarrow z_{0.95} = 1.645$, and $k = 0.05$:” |
| The raw moments of a continuous severity distribution are E(X^k) = ∫ x^k f(x) dx over its support. | formula | syllabus | Moment: “$$\mu_n' = E[X^n] = \int_{-\infty}^{\infty} x^n f(x)\,dx$$” |
| Variance equals the second raw moment minus the square of the mean: Var(X) = E(X^2) - [E(X)]^2. | formula | syllabus | Variance: “- Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$” |
| The computed full credibility standard for the expected number of claims is rounded up to the next integer. | procedure | missing |  |

</details>

<details><summary><code>fams-093</code> · untagged</summary>

Tagged pages: Expected Loss Method, Loss Reserving, Unpaid Claims

| Item | Kind | Status | Where |
|---|---|---|---|
| Under the expected loss ratio method, the expected ultimate loss for an accident year equals earned premium times the expected loss ratio. | formula | tagged | Expected Loss Method: “$$U = \text{ELR} \times \text{Earned Premium}$$” |
| The loss reserve for an accident year under the expected loss ratio method equals expected ultimate loss minus cumulative paid (or reported… | formula | tagged | Expected Loss Method: “$$\text{IBNR} = U - \text{Reported}$$” |
| Cumulative paid losses to date for an accident year are the sum of its incremental payments across all development years observed so far in… | definition | elsewhere | Development Triangle: “The cumulative triangle is the running sum of the incremental cells along each row” |
| The total loss reserve across accident years is the sum of the individual accident-year reserves. | fact | linked | Cape Cod Method (collapsed): “\\| **Total** \\| \\| $\$2{,}309$K \\|” |

</details>

<details><summary><code>fams-094</code> · answerable</summary>

Tagged pages: Bornhuetter-Ferguson Method, Chain Ladder Method, Expected Loss Method, Development Factor

| Item | Kind | Status | Where |
|---|---|---|---|
| The Bornhuetter-Ferguson reserve equals (1 - 1/f) times the Expected Loss Ratio reserve plus (1/f) times the Chain Ladder reserve, where f … | formula | tagged | Bornhuetter-Ferguson Method: “$$U_{\text{BF}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) \times U_{0}$$” |
| The cumulative development factor to ultimate at a given duration is the product of the age-to-age loss development factors from that durat… | definition | linked | Cumulative Development Factor: “$$\text{CDF}_{n \to \text{ult}} = \left(\prod_{k \ge n} f_{k \to k+1}\right) \times \text{Tail}$$” |
| An individual age-to-age factor is isolated by dividing the cumulative development factor to ultimate at one duration by the cumulative fac… | procedure | linked | Tail Factor: “\text{CDF}_{\text{last age} \to \text{ult}} = \text{Tail} \qquad \text{CDF}_{\text{prior age} \to \…” |
| At a given valuation date, each accident year sits at a different development duration (the older year is one period further developed), so… | fact | linked | Cumulative Development Factor: “\text{CDF}_{n \to \text{ult}} = \left(\prod_{k \ge n} f_{k \to k+1}\right) \times \text{Tail}” |

</details>

<details><summary><code>fams-095</code> · untagged</summary>

Tagged pages: Trend, Loss Trend, Loss Cost

| Item | Kind | Status | Where |
|---|---|---|---|
| In exponential trend (loss cost) models, a straight line fitted to the natural log of loss costs has slope equal to the continuous trend ra… | fact | elsewhere | Exponential Trend: “$b$ is the [[Linear Regression\\|least-squares]] slope of $\ln y_t$ on $t$: $b = \sum (t - \bar{t})(…” |
| Project each historical period's loss cost to the future period by multiplying it by the trend factor exp(slope × years) where years is the… | procedure | tagged | Loss Trend: “$t$ is the selected annual trend and $n$ the **trend period**, measured from the average date of lo…” |
| The average accident date of an accident year is its midpoint (July 1 for a calendar-year accident year). | fact | tagged | Trend: “The trend period runs from the average date of historical losses (midpoint of the accident year) to…” |
| For one-year policies written uniformly over a one-year rate effective period, the average accident date is one year after the effective da… | fact | tagged | Loss Trend (collapsed): “The first policy is exposed $7/1/2025$–$6/30/2026$ and the last $7/1/2026$–$6/30/2027$, so the expo…” |
| Combine trended period loss costs into a single projection by taking a weighted average using the given experience period weights. | procedure | linked | Loss Ratio Method (collapsed): “whether to weight the three years by premium volume (as here — summing losses and premium across ye…” |

</details>

<details><summary><code>fams-096</code> · untagged</summary>

Tagged pages: Trend, Loss Cost

| Item | Kind | Status | Where |
|---|---|---|---|
| For one-year policies, the average accident date within a policy year is the midpoint of that year, so the average accident date falls one … | fact | tagged | Trend: “The trend period runs from the average date of historical losses (midpoint of the accident year) to…” |
| The projection period for a loss cost runs from the average accident date of the historical policy year to the average accident date of the… | procedure | tagged | Trend: “The trend period runs from the average date of historical losses (midpoint of the accident year) to…” |
| For policies written uniformly over a one-year period of rate effectiveness, the average accident date of the new rates is the effective da… | fact | elsewhere | Loss Trend (collapsed): “The first policy is exposed $7/1/2025$–$6/30/2026$ and the last $7/1/2026$–$6/30/2027$, so the expo…” |
| A historical loss cost is projected to the future period by multiplying by (1 + annual trend rate) raised to the number of years in the tre… | formula | tagged | Trend: “$$\text{Trend Factor} = (1 + r)^n$$” |
| The projected loss cost from multiple years of data is the weighted average of each year's trended loss cost, using the given weights that … | procedure | linked | Loss Ratio Method (collapsed): “summing losses and premium across years, which weights each year's loss ratio by its premium” |

</details>

<details><summary><code>fams-097</code> · answerable</summary>

Tagged pages: Bornhuetter-Ferguson Method, IBNR, Chain Ladder Method, Expected Loss Method

| Item | Kind | Status | Where |
|---|---|---|---|
| Under the Bornhuetter-Ferguson method, IBNR = expected ultimate loss × (1 − 1/reported age-to-ultimate loss development factor), i.e., expe… | formula | tagged | Bornhuetter-Ferguson Method: “$$\text{IBNR} = \left(1 - \tfrac{1}{\text{CDF}}\right) \times \text{ELR} \times \text{EP}$$” |
| In the Bornhuetter-Ferguson method the a priori expected ultimate loss is the same quantity used by the expected loss ratio method, so the … | fact | tagged | Bornhuetter-Ferguson Method: “$C$ is reported (or paid) losses to date, $U_0 = \text{ELR} \times \text{EP}$ the a priori expectat…” |
| Under the expected loss ratio method, IBNR = expected ultimate loss − reported losses, where reported losses = paid-to-date + case reserves. | formula | tagged | Expected Loss Method: “$$\text{IBNR} = U - \text{Reported}$$” |
| Under the chain-ladder method with reported losses, ultimate = reported losses × age-to-ultimate reported loss development factor, so IBNR … | formula | tagged | Chain Ladder Method: “$$U_{\text{AY}} = C_{\text{AY},\,n} \times \text{CDF}_{n \to \text{ult}}$$” |
| Reported (incurred) losses equal paid losses plus case reserves, and IBNR is the ultimate loss estimate minus reported losses. | definition | tagged | IBNR: “$$\text{IBNR} = \text{Ultimate} - \text{Reported}$$” |

</details>

<details><summary><code>fams-098</code> · answerable</summary>

Tagged pages: On-Leveling, Parallelogram Method, Rate Change, Earned Premium

| Item | Kind | Status | Where |
|---|---|---|---|
| The on-level factor is the ratio of earned premium at current rate level to earned premium at the historical rates actually charged, equal … | definition | tagged | On-Leveling: “$$\text{On-Level Factor} = \frac{\text{Current cumulative index}}{\text{Average index for the year}…” |
| The parallelogram method finds the portion of a calendar year's earned exposure written under each rate level by plotting policy effective … | procedure | tagged | On-Leveling: “Picture a unit square whose horizontal axis is calendar time and whose vertical axis is the fractio…” |
| The average rate level for a calendar period is the sum over rate levels of (fraction of earned exposure at that level) times (that rate le… | formula | tagged | Parallelogram Method: “$$\text{OLF}_Y = \frac{I_{\text{current}}}{\sum_k A_{Y,k}\, I_k}$$” |
| Successive rate changes compound multiplicatively: the rate level after a change of r is the prior rate level times (1 + r). | fact | tagged | Parallelogram Method: “$I_k$ is the cumulative rate level index of rate level group $k$ (each index is the previous one ti…” |
| For one-year policies written uniformly, a rate change affects earned premium in the calendar year of the change and the following year, an… | fact | tagged | On-Leveling: “For **annual** policies written uniformly, a rate change effective at time $p$ through year $Y$ ear…” |

</details>

<details><summary><code>fams-099</code> · answerable</summary>

Tagged pages: On-Leveling, Parallelogram Method, Earned Premium

| Item | Kind | Status | Where |
|---|---|---|---|
| On-level earned premium is the earned premium restated to the premium that would have been collected at current rate levels, found by multi… | definition | tagged | On-Leveling: “**On-Leveling** is the procedure that restates historical earned premium to the current rate level,…” |
| On-level factor = current rate level divided by the average rate level earned during the period, where average rate level is the earned-exp… | formula | tagged | On-Leveling: “$$\text{On-Level Factor} = \frac{\text{Current cumulative index}}{\text{Average index for the year}…” |
| In the parallelogram method, with uniformly distributed policy effective dates and one-year policies, policies written before a rate change… | procedure | tagged | On-Leveling: “Picture a unit square whose horizontal axis is calendar time and whose vertical axis is the fractio…” |
| For a rate change occurring a fraction t into the calendar year with one-year policies, the share of that year's earned exposure at the new… | fact | tagged | On-Leveling: “For **annual** policies written uniformly, a rate change effective at time $p$ through year $Y$ ear…” |
| Rate changes are cumulative and multiplicative, so the rate level after successive changes is the base level times the product of (1 + each… | fact | tagged | Parallelogram Method: “$I_k$ is the cumulative rate level index of rate level group $k$ (each index is the previous one ti…” |

</details>

<details><summary><code>fams-100</code> · answerable</summary>

Tagged pages: Binomial Option Pricing Model, Risk-Neutral Valuation, European Option

| Item | Kind | Status | Where |
|---|---|---|---|
| In a one-period binomial model for a non-dividend-paying stock, the risk-neutral probability of an up move is p* = (e^{rh} - d)/(u - d), an… | formula | tagged | Binomial Option Pricing Model: “p^* = \frac{e^{(r - \delta)h} - d}{u - d}” |
| The price of a European option in a binomial model equals the risk-free discounted expected payoff under risk-neutral probabilities: C = e^… | fact | tagged | Binomial Option Pricing Model: “C = e^{-rh}\left[p^*C_u + (1 - p^*)\,C_d\right]” |
| The payoff of a European put option at expiration is max(K - S_T, 0), where K is the strike price and S_T is the stock price at expiration. | formula | tagged | European Option: “\text{Put payoff} = (K - S_T)^+” |
| In a one-period binomial model the stock price at the end of the period is either uS (up) or dS (down), so the put payoff is positive only … | fact | tagged | Binomial Option Pricing Model: “the price of the underlying asset either rises by a factor $u$ or falls by a factor $d$” |

</details>

<details><summary><code>fams-101</code> · answerable</summary>

Tagged pages: Put-Call Parity, Black-Scholes Model, European Option

| Item | Kind | Status | Where |
|---|---|---|---|
| Put-call parity for European options on a non-dividend-paying stock: C - P = S_0 - K e^{-rT}, where C and P are the call and put prices wit… | formula | tagged | Put-Call Parity: “$$C - P = S_0 e^{-\delta T} - K e^{-rT}$$” |
| Put-call parity holds for every strike on the same underlying stock and expiration, so the stock price implied by one strike's call and put… | fact | tagged | Put-Call Parity: “the no-arbitrage identity linking a European call $C$ and a European put $P$ on the same underlying…” |

</details>

<details><summary><code>fams-102</code> · answerable</summary>

Tagged pages: Risk Measure

| Item | Kind | Status | Where |
|---|---|---|---|
| A risk measure has the monotonicity property if, whenever X ≤ Y for all possible outcomes, then ρ(X) ≤ ρ(Y). | definition | tagged | Risk Measure: “*monotone*: $X \leq Y \Rightarrow \rho(X) \leq \rho(Y)$” |
| The variance of a random variable is Var(X) = E[X^2] − (E[X])^2, and the standard deviation is its square root. | formula | linked | Standard Deviation: “$$= \sqrt{E[X^2] - (E[X])^2}$$” |
| A constant random variable has variance and standard deviation equal to zero, so a standard-deviation-loaded risk measure of a constant equ… | fact | tagged | Risk Measure: “The standard deviation principle fails monotonicity (with $k = 2$, a 50/50 chance of $0$ or $10$ sc…” |
| The standard deviation risk measure is ρ(X) = E[X] + kσ_X, the mean plus k times the standard deviation. | formula | tagged | Risk Measure: “the standard deviation principle $E[X] + k\,\sigma(X)$” |

</details>

<details><summary><code>fams-103</code> · answerable</summary>

Tagged pages: Binomial Option Pricing Model, Risk-Neutral Valuation, European Option, Payoff

| Item | Kind | Status | Where |
|---|---|---|---|
| In a binomial tree with continuously compounded risk-free rate r and period length h, the risk-neutral probability of an up move is p* = (e… | formula | tagged | Binomial Option Pricing Model: “$$p^* = \frac{e^{(r - \delta)h} - d}{u - d}$$” |
| Stock prices at each node of a recombining binomial tree are S0 * u^k * d^(n-k), so the up-down and down-up paths give the same price. | procedure | tagged | Risk-Neutral Valuation (collapsed): “Terminal prices are $S_{uu} = 66.125$, $S_{ud} = 51.75$, $S_{dd} = 40.50$, with put payoffs $0$, $2…” |
| The price of a European option in a multi-period binomial tree is the discounted expected payoff under risk-neutral probabilities: e^{-rT} … | formula | tagged | Binomial Option Pricing Model: “A European option depends only on the terminal payoffs, so its price is also the discounted risk-ne…” |
| The payoff of a European put with strike K at expiry is max(K - S_T, 0). | definition | tagged | European Option: “\text{Put payoff} = (K - S_T)^+” |

</details>

<details><summary><code>fams-104</code> · gap</summary>

Tagged pages: Lognormal Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| A lognormal random variable has a normally distributed natural logarithm; if S_t/S_0 ~ LN(mu t, sigma sqrt(t)) then ln(S_t) is normal with … | definition | tagged | Lognormal Distribution: “The **Lognormal Distribution** $X \sim \text{Lognormal}(\mu, \sigma^2)$ applies when $\ln X \sim N(…” |
| For a lognormal stock price model with parameters mu and sigma per year, the log-return over t years has mean mu*t and variance sigma^2*t (… | fact | missing |  |
| Compute a lognormal probability by taking logs of both sides of the inequality, standardizing to a standard normal Z using the mean and sta… | procedure | tagged | Lognormal Distribution: “$$F(x) = \Phi\!\left(\frac{\ln x - \mu}{\sigma}\right)$$” |
| A guaranteed minimum maturity benefit equal to the original investment applies when the fund value at maturity is below the guaranteed amou… | fact | elsewhere | Guaranteed Minimum Maturity Benefit: “The insurer pays $(G - F_n)^+$ to each survivor, which is a European put on the fund with strike $G…” |
| The initial amount invested in the fund equals the premium net of the expense charge (premium times one minus the expense percentage). | procedure | elsewhere | Equity-Linked Insurance: “$P_t$ is the premium paid at the start of year $t$, of which the fraction $a_t$ is allocated to the…” |

</details>

<details><summary><code>fams-105</code> · answerable</summary>

Tagged pages: Limited Expected Value, Lognormal Distribution, Coverage Modifications, Deductible

| Item | Kind | Status | Where |
|---|---|---|---|
| The limited expected value E(X∧u) is the expected value of the loss capped at u, equal to E[min(X,u)] = ∫₀^u x f(x)dx + u[1−F(u)]. | definition | tagged | Limited Expected Value: “The **Limited Expected Value** (LEV) of a random variable $X$ at limit $u$ is the expected value of…” |
| For a lognormal(μ, σ) loss, E(X∧x) = exp(μ+σ²/2)·Φ((ln x − μ − σ²)/σ) + x[1 − Φ((ln x − μ)/σ)]. | formula | tagged | Lognormal Distribution: “E[X \wedge d] = e^{\mu + \sigma^2/2}\,\Phi\!\left(\frac{\ln d - \mu - \sigma^2}{\sigma}\right) + d\…” |
| For a lognormal loss, the CDF is F(x) = Φ((ln x − μ)/σ), where Φ is the standard normal CDF. | fact | tagged | Lognormal Distribution: “F(x) = \Phi\!\left(\frac{\ln x - \mu}{\sigma}\right)” |
| Expected payment with an ordinary deductible d and policy limit u (maximum covered loss) is E(X∧u) − E(X∧d). | procedure | tagged | Coverage Modifications: “E[Y^L] = \alpha\big(E[X \wedge u] - E[X \wedge d]\big)” |
| A policy paying the full loss above a threshold d (up to a cap) can be decomposed into an ordinary deductible d plus a flat bonus of d paid… | procedure | tagged | Coverage Modifications: “Once $X > d$ it pays the whole loss, so with no limit or coinsurance $E[Y^L] = E[(X-d)_+] + d\,S(d)…” |

</details>

<details><summary><code>fams-106</code> · answerable</summary>

Tagged pages: Chain Ladder Method, Development Factor, Reserve, Unpaid Claims

| Item | Kind | Status | Where |
|---|---|---|---|
| Under the chain-ladder method, estimated ultimate loss equals cumulative paid loss to date multiplied by the product of all age-to-age deve… | formula | tagged | Chain Ladder Method: “$$U_{\text{AY}} = C_{\text{AY},\,n} \times \text{CDF}_{n \to \text{ult}}$$” |
| The estimated loss reserve at a given date equals the estimated ultimate loss minus the cumulative claims paid to date. | definition | tagged | Reserve: “$$\text{Claim reserve} = \text{Ultimate incurred} - \text{Paid to date}$$” |
| When actual paid development in the next period equals expected development, the next-period cumulative paid equals current cumulative paid… | procedure | tagged | Chain Ladder Method: “$$U_{\text{AY}} = C_{\text{AY},\,n} \times \text{CDF}_{n \to \text{ult}}$$” |
| An age-to-age (link ratio) development factor is the ratio of cumulative paid loss at one development age to that at the previous age, and … | definition | tagged | Development Factor: “**Development Factor** (link ratio or age-to-age factor) is the ratio used to project cumulative lo…” |

</details>

<details><summary><code>fams-107</code> · answerable</summary>

Tagged pages: Overall Rate Level Indication, Loss Ratio Method, Trend, Variable Expenses, Ratemaking, Profit and Contingency Provision

| Item | Kind | Status | Where |
|---|---|---|---|
| Trend each experience year's losses from the midpoint of its accident period to the midpoint of the period during which the new rates will … | procedure | tagged | Trend: “$$\text{Trend Factor} = (1 + r)^n$$” |
| For one-year policies written uniformly over a year, the average accident date of the rate-effective period is one year after the effective… | fact | linked | Loss Trend (collapsed): “The first policy is exposed $7/1/2025$–$6/30/2026$ and the last $7/1/2026$–$6/30/2027$, so the expo…” |
| Loss and ALAE ratio for an experience year equals trended ultimate loss and ALAE divided by earned premium at current rate level. | formula | tagged | Loss Ratio Method: “The numerator's loss ratio must be **projected**: ultimate losses (developed), trended to the futur…” |
| Combine multiple experience years' loss ratios into one projected loss ratio by taking their weighted average using the given credibility/s… | procedure | tagged | Overall Rate Level Indication: “Weighting across years in the experience period is a judgment: many companies sum projected losses …” |
| Indicated rate change factor (loss ratio method with fixed expenses) = (projected loss ratio + fixed expense per premium) / (1 − variable e… | formula | tagged | Overall Rate Level Indication: “$$\text{Indicated Change} = \frac{\text{Projected Loss \& LAE Ratio} + F\%}{1 - V - Q_T} - 1$$” |
| A fixed per-exposure expense (such as a mandated flat commission) is converted to a ratio to premium by dividing it by the current average … | procedure | linked | Fixed Expenses: “$F$ enters the **numerator** of the rate; [[Variable Expenses\\|variable expenses]] $V$ and the prof…” |
| New average rate = current average rate × indicated rate change factor. | formula | tagged | Overall Rate Level Indication: “$$\text{Indicated Change} = \frac{\text{Indicated Rate}}{\text{Current Rate}} - 1$$” |

</details>

<details><summary><code>fams-108</code> · answerable</summary>

Tagged pages: Binomial Option Pricing Model, Risk-Neutral Valuation, European Option, Payoff

| Item | Kind | Status | Where |
|---|---|---|---|
| The risk-neutral probability of an up move in a one-period binomial model is q = (S0·e^{rh} − S_d)/(S_u − S_d), where S_u and S_d are the u… | formula | tagged | Binomial Option Pricing Model: “$$p^* = \frac{e^{(r - \delta)h} - d}{u - d}$$” |
| The payoff of a European put option at expiration is max(0, K − S_T), where K is the strike price and S_T is the stock price at expiration. | formula | tagged | Payoff: “$$\text{Put: } (K - S_T)^+ = \max(K - S_T,\,0)$$” |
| The option price equals the expected payoff computed under risk-neutral probabilities, discounted at the continuously compounded risk-free … | procedure | tagged | Binomial Option Pricing Model: “$$C = e^{-rh}\left[p^*C_u + (1 - p^*)\,C_d\right]$$” |
| The true (real-world) probability of an up move is irrelevant to pricing an option by no-arbitrage or risk-neutral valuation; only the risk… | fact | tagged | Binomial Option Pricing Model: “The real-world probability of an up move never enters the price, because the replicating portfolio …” |

</details>

<details><summary><code>fams-109</code> · answerable</summary>

Tagged pages: Limited Fluctuation Credibility, Partial Credibility, Full Credibility Standard, Credibility

| Item | Kind | Status | Where |
|---|---|---|---|
| The full credibility standard for limited fluctuation credibility with the observed value within a fraction r of the true value with probab… | formula | tagged | Limited Fluctuation Credibility: “$$n_{\text{full}} = \left(\frac{z_{\alpha/2}}{r}\right)^2 \cdot \frac{\text{Var}(X)}{[\text{E}(X)]^…” |
| For average loss per exposure, the number of exposures required for full credibility is n = lambda_0 * (standard deviation / mean)^2, i.e.,… | formula | tagged | Limited Fluctuation Credibility: “$$n_{\text{full}} = \left(\frac{z_{\alpha/2}}{r}\right)^2 \cdot \frac{\text{Var}(X)}{[\text{E}(X)]^…” |
| Partial credibility under limited fluctuation is Z = sqrt(n / n_full), the square root of the ratio of actual exposures to the full credibi… | formula | tagged | Limited Fluctuation Credibility: “$$Z = \min\!\left(1,\, \sqrt{\frac{n}{n_{\text{full}}}}\right)$$” |
| The credibility-weighted premium estimate is Z times the observed experience mean plus (1 - Z) times the prior (collective) mean. | formula | tagged | Limited Fluctuation Credibility: “$$\text{Estimate} = Z \cdot \bar{X} + (1-Z) \cdot \mu_0$$” |

</details>

<details><summary><code>fams-110</code> · answerable</summary>

Tagged pages: Coverage Modifications, Payment Random Variable, Pareto Distribution, Inflation

| Item | Kind | Status | Where |
|---|---|---|---|
| The maximum covered loss u is the loss amount above which no additional benefits are paid; with coinsurance α and deductible d, a policy li… | definition | tagged | Coverage Modifications: “$u$ the **maximum covered loss** (the loss above which the payment stops growing) and $\alpha$ the …” |
| Expected cost per payment for a policy with deductible d, maximum covered loss u, and coinsurance α is α·[E(X∧u) − E(X∧d)] / [1 − F(d)]. | formula | tagged | Coverage Modifications: “$$E[Y^L] = \alpha\big(E[X \wedge u] - E[X \wedge d]\big)$$ … $$E[Y^P] = \frac{E[Y^L]}{1 - F_X(d)}$$” |
| Under uniform inflation of rate r, a Pareto(α, θ) loss becomes Pareto with the same α and θ multiplied by (1+r). | fact | tagged | Coverage Modifications: “A Pareto scales by its $\theta$, so inflated losses are Pareto with $\alpha = 3$, $\theta = 2{,}200$” |
| For a Pareto(α, θ) distribution, F(x) = 1 − (θ/(x+θ))^α and E(X∧x) = θ/(α−1)·[1 − (θ/(x+θ))^(α−1)]. | formula | tagged | Pareto Distribution: “$$F(x) = 1 - \left(\frac{\theta}{x + \theta}\right)^{\alpha}$$ … $$E[X \wedge x] = \frac{\theta}{\a…” |
| Inflation must be applied to the losses before applying the deductible, limit and coinsurance, with the policy terms held fixed at their st… | fact | tagged | Coverage Modifications: “If losses grow to $(1+r)X$ while $d$ and $u$ stay fixed, deflate the limits instead of inflating th…” |

</details>

Nothing here edits the vault. A gap is fixed from the syllabus reading, in general form — never by copying the question's own numbers onto the page — and the edited page is fact checked again (docs/verification.md).
