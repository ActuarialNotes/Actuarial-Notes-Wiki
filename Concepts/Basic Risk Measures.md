---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:49df6c2e97ccb4b10ca579577e9d33201f7c7b6557a009955241cd8863c26374
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Basic Risk Measures.md
---

**Basic risk measures** are the descriptive figures a risk manager uses to size up a loss exposure before deciding how to treat it: how many units are exposed, how often losses happen ([[Frequency|frequency]] and [[Probability|probability]]), how large they are ([[Severity|severity]], or consequence), what outcome is typical (central tendency) and how far outcomes stray from it (dispersion, or volatility).

> $$\text{Frequency} = \frac{\text{number of losses}}{\text{number of exposure units}}$$

> $$\text{Severity} = \frac{\text{total losses}}{\text{number of losses}}$$

> $$\mu = E[X] = \sum_i p_i\, x_i$$

> $$\sigma = \sqrt{\sum_i p_i\, (x_i - \mu)^2}$$

> $$\text{CV} = \frac{\sigma}{\mu}$$

- **Symbols:** $x_i$ are the possible outcomes (for a loss exposure, the possible annual losses), $p_i$ their probabilities, $\mu$ the [[Expected Value|expected value]], $\sigma$ the [[Standard Deviation|standard deviation]] and CV the [[Coefficient of Variation|coefficient of variation]]. Frequency is per exposure unit for a stated period, so a frequency of 0.08 means 8 losses per 100 units a year. Frequency times severity gives the loss per exposure unit.
- **Exposure:** In insurance contracts and training materials an *exposure* is the enterprise, property, person or activity that faces a possible loss; a house on the coast near Galveston is an exposure unit for hurricane loss. A risk manager relates the count of incidents to such a base, for example workplace injuries to the number of employees, so that a larger operation is not mistaken for a riskier one ([[Loss Exposure]]).
- **Probability and frequency:** Probability is the relative frequency with which an event occurs. It is estimated from historical relative frequency (mortality tables), from theory or engineering (the failure likelihood of a bridge), or, where neither exists, subjectively by expert opinion, as with the political risk of a government's overthrow. NIST's risk-assessment guide also ties likelihood to a stated time frame, such as the next year.
- **Severity, or consequence:** Severity is the size of a loss, measured as the average loss per claim. More broadly, each possible outcome has a consequence, a loss or a gain, and it is the consequences rather than the uncertainty itself that make a decision hard. NIST describes risk as a function of the likelihood of an event and the impact, the magnitude of harm, if it occurs ([[Risk Assessment]]).
- **Central tendency:** The expected value is the long-run average of all outcomes over many repetitions, so it may not be a possible outcome at all. The [[Median|median]] is the 50 percent mark, with half the outcomes above and half below, and the [[Mode|mode]] is the single most likely value. For a loss distribution with rare large losses the three differ widely, and the expected value says nothing about the risk.
- **Dispersion, or volatility:** Risk is the deviation of actual outcomes from the expected value, the potential for surprise. The *range*, highest outcome minus lowest, is a rough measure of the worst-case spread, but it ignores how likely the extremes are. The [[Variance|variance]] averages the squared deviations, weighting each by its probability, and is in squared units; the standard deviation returns to the original units. When two exposures have different means, the coefficient of variation compares their risk relative to their size.
- **How a risk manager uses them:** Frequency and severity over a stated period are usually the measures that matter most, and treatment aims to lower one or both: physical construction, backup systems, hedging and insurance all work on them. The frequency-severity pair places an exposure in the risk management matrix that points towards retention, loss control, insurance or avoidance ([[Risk Treatment]]), and on a risk map of all the organization's risks ([[Risk Assessment]]). Which measure to use depends on the question: a concern with insolvency calls for a different measure than sensitivity to moderate interest rate changes.
- **Solvency versus performance:** The CAS's 2003 ERM overview sorts the measures used in ERM into two groups. *Solvency-related* measures look at the adverse tail of the distribution, such as the probability of ruin (the chance that capital is exhausted) and shortfall risk (the chance of falling below a threshold), and they concern customers and their proxies, such as regulators and rating agencies. *Performance-related* measures look at the region near the mean, such as the variance, the standard deviation and the semivariance, which counts only unfavourable deviations, and they concern owners and their proxies, such as stock analysts.
- **Beyond the basic measures:** Tail measures such as value at risk and tail value at risk, and the properties that make a risk measure coherent, are the actuarial / Exam 9 treatment in [[Risk Measure]].

> [!example]- Central Tendency and Dispersion for a Warehouse's Fire Losses {Example}
> A distributor estimates its warehouse's annual fire loss as follows: no loss with probability 0.80, \$10,000 with probability 0.12, \$50,000 with probability 0.06 and \$400,000 with probability 0.02. Find the expected value, median, mode, range, standard deviation and coefficient of variation. Why would budgeting the expected value each year not settle the risk?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \mu &= 0(0.80) + 10{,}000(0.12) + 50{,}000(0.06) + 400{,}000(0.02) \\
> > &= 0 + 1{,}200 + 3{,}000 + 8{,}000 \\
> > &= 12{,}200
> > \end{align*}
> > $$
> > The median and the mode are both \$0: no loss is the most likely outcome, and it alone carries 80 percent of the probability. The range is $400{,}000 - 0 = 400{,}000$.
> > $$
> > \begin{align*}
> > \sigma^2 &= 0.80(-12{,}200)^2 + 0.12(-2{,}200)^2 \\
> > &\quad + 0.06(37{,}800)^2 + 0.02(387{,}800)^2 \\
> > &= 119{,}072{,}000 + 580{,}800 + 85{,}730{,}400 + 3{,}007{,}776{,}800 \\
> > &= 3{,}213{,}160{,}000
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > \sigma &= \sqrt{3{,}213{,}160{,}000} \\
> > &\approx 56{,}685 \\
> > \text{CV} &= 56{,}685 / 12{,}200 \\
> > &\approx 4.65
> > \end{align*}
> > $$
> > The expected loss is \$12,200, but in most years the loss is nothing, and in one year in fifty it is \$400,000. The standard deviation is more than four and a half times the mean, almost all of it from the rare large fire, so a budget of \$12,200 a year would not cover the loss that matters. That is the low-frequency, high-severity pattern that points to transfer rather than retention.

> [!example]- Frequency and Severity Against an Exposure Base {Example}
> A delivery company's auto physical damage claims for three years were as follows. Year 1: 200 vehicles, 20 claims, \$90,000 of losses. Year 2: 300 vehicles, 24 claims, \$120,000. Year 3: 400 vehicles, 28 claims, \$154,000. The operations manager says the fleet is becoming less safe because claims rose every year. Compute the frequency per vehicle-year, the severity and the loss per vehicle-year for each year and for the three years combined, and assess the claim.
>
> > [!answer]-
> > | Year | Frequency | Severity | Loss per vehicle-year |
> > |---|---|---|---|
> > | 1 | $20/200 = 0.10$ | $90{,}000/20 = 4{,}500$ | $90{,}000/200 = 450$ |
> > | 2 | $24/300 = 0.08$ | $120{,}000/24 = 5{,}000$ | $120{,}000/300 = 400$ |
> > | 3 | $28/400 = 0.07$ | $154{,}000/28 = 5{,}500$ | $154{,}000/400 = 385$ |
> >
> > Combined, frequency is $72/900 = 0.08$, severity is $364{,}000/72 \approx 5{,}056$ and the loss per vehicle-year is $364{,}000/900 \approx 404$.
> >
> > Claim counts rose only because the fleet doubled. Per vehicle, frequency fell from 0.10 to 0.07, while severity rose from \$4,500 to \$5,500 a claim. The fleet is having fewer accidents for its size but more costly ones, so the useful questions are about what drives the cost of each claim, not about the number of crashes.

> [!tip]- How it appears on the exam
> - **DISC-RM:** The introduction to risk management covers basic risk measures. Questions describe an exposure and ask which measure answers a stated concern, such as the coefficient of variation for exposures of different sizes, or ask for a short calculation of frequency, severity, an expected value or a standard deviation.
> - **Reading a distribution:** A question may give a loss distribution and ask for the mean, median or mode, or why the expected value understates what could happen.
> - **Linking to treatment:** Frequency and severity estimates are often followed by a question on the treatment the risk management matrix suggests ([[Risk Treatment]]).

> [!warning]- Exam traps
> - **Counts are not frequency:** A rising number of claims means nothing until it is divided by the exposure base. A growing operation produces more claims at the same frequency.
> - **The expected value is not the typical year:** For a skewed loss distribution the median and mode can be zero while the mean is large. Read which measure the question asks for.
> - **Standard deviations of different-sized exposures:** The larger exposure usually has the larger standard deviation. Compare relative risk with the coefficient of variation.
> - **The range ignores likelihood:** Two exposures with the same range can reach their extremes with very different probabilities.
