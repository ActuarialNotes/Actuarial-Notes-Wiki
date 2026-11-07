---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-16
  last_checked_by: agent:validate-v1
  content_hash: sha256:d5c9411bc04dcc39b211f52b5e7dd58a11aa208ec76cffaa4aa6e61ea9a8e56d
  sources:
    - "CREDIBLE CLAIMS RESERVES: THE BENKTANDER METHOD, Section 2, p.335 (credibility mixture U_c = cU_CL + (1-c)U_0), sha256:8e9e86f6dd4ed6a402d5380dd446ebeba5e2c3d921f90828ad485a8cfb508086 — https://www.casact.org/sites/default/files/2021-03/7_Mack_2000.pdf"
    - "https://www.casact.org/sites/default/files/2021-03/7_Brosius.pdf, Development Formula 2, p.13, sha256:de06a701db8825c8a6384bf92f577a5fe6ccfab627379f21199df35396a2a690 — https://www.casact.org/sites/default/files/2021-03/7_Brosius.pdf"
    - "https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf, s.5.5.1, pp.41-43 (PDF 49-51): SE rises oldest to most recent; CoV generally decreases, may rise again in most recent years; min/max plausibility, sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf"
    - "https://www.casact.org/sites/default/files/2021-02/08-Meyers.pdf, s.3, pp.7-11 (PDF 17-21): uniformity of predicted percentiles, p-p plot, KS critical value 136/sqrt(n) at 5%, slanted S = light tails, Figure 3.2 Mack incurred, critical values 19.2 and 9.6, sha256:3c01999f6c8a170dc412968658d4f7d673d637e74cb27d84b4173ea60532d2d1 — https://www.casact.org/sites/default/files/2021-02/08-Meyers.pdf"
    - "Estimating Unpaid Claims Using Basic Techniques, ch.3 p.37; ch.9 p.154; ch.14 pp.331-332 incl. fn 80-81; ch.15 pp.345-346, 350-351, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "Werner & Modlin, Basic Ratemaking (5th ed. 2016), ch.3 p.37; ch.6 p.106, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "ASOP No. 23, Data Quality (2016), s.3.3 Review of Data, pp.3-4, sha256:784c57a1379b189b234452dc7fe18d391ae86e7f5fb8815d14d35400eb3e7bdf — https://www.actuarialstandardsboard.org/wp-content/uploads/2017/01/asop023_185.pdf"
    - "Friedland, Reserving for Reinsurance (CAS Exam 7 study note), ch.3 pp.61-62: longer reporting/payment patterns for reinsurance vs primary and non-proportional vs proportional, sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Reasonableness Testing.md
---

**Reasonableness Testing** is the checking of data, intermediate results and final estimates before the actuary relies on them: whether they are free of errors, consistent with each other, and consistent with history and with what is known about the business. It covers ratemaking indications, unpaid claim estimates and stochastic output alike. The tests are applied at four stages:

1. **The data.** The data review checks consistency with the financial statements and with the prior analysis, questionable values and data definitions ([[Data Issues|data issues]], [[Data Quality|data quality]]).
2. **The triangle.** Before any factor is selected, losses at the first development age should be generally consistent from year to year, allowing for loss trend and changes in the portfolio. If they are dramatically different, the claim count triangle is examined ([[Data Diagnostic Analysis|diagnostics]]).
3. **The selected ultimates.** The ultimates are tested by the ratios they imply, year by year: claim ratios, severities, frequencies, pure premiums, ALAE per claim, and the average unpaid amount on open and unreported claims.
4. **Monitoring.** At the next valuation, the claims that emerged are compared with the claims the prior estimate expected ([[Actual vs Expected Analysis|actual versus expected]]).

> [!example]- A ratemaking extract shows earned premium per earned exposure of $\$820$, $\$845$ and $\$1{,}030$ for 2022 to 2024. The only rate changes were $+3\%$ in 2023 and $+2\%$ in 2024, and premium trend runs about 2% a year. Is the data reasonable? {Example}
> - The average premium rose $845/820 - 1 = 3.0\%$ in 2023, in line with the rate change and trend.
> - It rose $1{,}030/845 - 1 = 21.9\%$ in 2024, against about 4% from rate and trend.
> - The jump points to exposures missing in 2024, premium counted twice, or a genuine shift in the mix of business.
> - The first two are errors to correct before any indication, and the third needs its own adjustment. The data is not used until the cause is found.

## Percent reported

The expected percentage of ultimate claims reported at age $t$ is the reciprocal of the [[Cumulative Development Factor|cumulative development factor]]:

> $$p_t = \frac{1}{\text{CDF}_t}$$

- $\text{CDF}_t$ is the cumulative development factor from age $t$ to ultimate.

The same holds for paid claims and the percent paid. The age-to-age factor from age $t$ to the next age is the ratio of the two CDFs, $f_{t \to t+1} = \text{CDF}_t/\text{CDF}_{t+1}$. The [[Chain Ladder Method|chain ladder]] IBNR is the reported claims times $(1 - p_t)/p_t$. The [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] IBNR is the expected claims times $1 - p_t$, with the expected claims the expected claim ratio times the on-level earned premium.

> [!example]- The CDFs to ultimate are 2.000 at 12 months and 1.250 at 24 months. What are the percents reported and the 12-to-24 age-to-age factor? {Example}
> - At 12 months, $p_{12} = 1/2.000 = 50\%$.
> - At 24 months, $p_{24} = 1/1.250 = 80\%$.
> - The age-to-age factor is $2.000/1.250 = 1.600$.

## Actual versus expected emergence

The claims expected to emerge between the age $t$ of one valuation and the age $t + 1$ of the next are the unreported claims at the first, times the share of them the pattern says will be reported by the second:

> $$\text{Expected Emergence} = (\text{Ultimate} - \text{Reported}) \times \frac{p_{t+1} - p_t}{1 - p_t}$$

- $\text{Ultimate}$ is the selected ultimate claims at the first valuation.
- $\text{Reported}$ is the reported claims at the first valuation, so $\text{Ultimate} - \text{Reported}$ is the IBNR.
- $p_t$ and $p_{t+1}$ are the expected percents reported at the two ages.

The actual emergence is the change in reported claims between the two valuations. Actual above expected says the development factors or the ultimate were understated, and actual below expected that they were overstated. With the chain ladder's own ultimate, the expected emergence is $\text{Ultimate} \times p_{t+1} - \text{Reported}$. For paid claims with the chain ladder, it is the current paid claims times $\text{CDF}_t/\text{CDF}_{t+1} - 1$.

> [!example]- At the prior year-end, accident year 2024 had $6{,}000$ of reported claims, a 12-month CDF of 2.000 and a 24-month CDF of 1.250, so its chain ladder ultimate was $12{,}000$. Twelve months later its reported claims are $10{,}500$. How do actual and expected emergence compare? {Example}
> - The IBNR was $12{,}000 - 6{,}000 = 6{,}000$, and $p_{12} = 0.50$, $p_{24} = 0.80$.
> - The expected emergence is $6{,}000 \times (0.80 - 0.50)/(1 - 0.50) = 3{,}600$.
> - The actual emergence is $10{,}500 - 6{,}000 = 4{,}500$, so actual exceeded expected by $900$, an actual-to-expected ratio of 1.25.
> - Re-running the chain ladder moves the ultimate to $10{,}500 \times 1.250 = 13{,}125$. Keeping the prior ultimate as the a priori in a Bornhuetter-Ferguson gives $10{,}500 + 0.20 \times 12{,}000 = 12{,}900$.

## Comparing the results of methods

The ultimate claim ratios of each method are compared accident year by accident year, and against the expected claim ratio assumed. A development estimate that departs from the other methods in one year points to the factors used only for that year. Further checks:

- A credibility-weighted estimate, such as the [[Benktander Method|Benktander]], lies between the chain ladder and the a priori.
- Reinsurance shows longer reporting and payment patterns than primary insurance, and excess (non-proportional) cover longer patterns than proportional.
- Net claims and premium are no greater than gross, and a net tail factor larger than the gross one is generally not reasonable ([[Net of Reinsurance|net of reinsurance]]).

## Testing an unpaid claim distribution

For a stochastic model, Shapland's checks on the [[Unpaid Claim Distribution|unpaid claim distribution]] are that the standard errors rise from the oldest to the most recent accident years, the coefficients of variation generally fall, and the minimum and maximum outcomes are plausible. Meyers tests a model on outcomes: across many triangles whose outcomes are now known, the predicted percentiles of the actual outcomes should be uniform. Uniformity is judged on a p-p plot with a Kolmogorov-Smirnov band at the 5% level of

> $$D_{\text{crit}} = \frac{136}{\sqrt{n}}$$

- $n$ is the number of triangles tested.
- $D_{\text{crit}}$ is in percentage points.

A slanted "S" on the p-p plot means too many outcomes in the extreme percentiles, so the predicted distribution is too light in the tails.

> [!example]- A reserving model is run on 200 historical triangles. The largest gap between the sorted percentiles of the outcomes and a uniform is $D = 11.3$ points, and the p-p plot is a slanted S. Does the model validate? {Example}
> - The critical value is $136/\sqrt{200} = 9.6$ points.
> - $D = 11.3$ exceeds it, so uniformity is rejected at the 5% level.
> - The slanted S says the predicted distribution is too light in the tails, as Meyers found for the Mack model on incurred data.
> - On 50 triangles the critical value would be $136/\sqrt{50} = 19.2$, and the same $D$ would pass, so the test needs many triangles.

> [!trap] Expected emergence on the wrong ultimate
> When the selected ultimate differs from the chain ladder's, the expected emergence uses the selected ultimate's IBNR. On a selected ultimate of $11{,}000$ in the example above, it is $(11{,}000 - 6{,}000) \times 0.60 = 3{,}000$, not the $3{,}600$ the chain ladder implies.
