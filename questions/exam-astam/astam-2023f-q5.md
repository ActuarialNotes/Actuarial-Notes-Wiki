---
id: "astam-2023f-q5"
exam: "Exam ASTAM"
topic: "Chain Ladder Method"
learning_objective: "Reserving and Pricing for Short-Term Insurance Coverages"
difficulty: medium
type: multi-part
year: 2023
session: Fall
wiki_link:
  - Concepts/Chain+Ladder+Method
  - Concepts/Inflation
  - Concepts/Parallelogram+Method
  - Concepts/Loss+Ratio+Method
  - Concepts/Overall+Rate+Level+Indication
points: 9
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b6f94df91f2588a85543721fcd9d8089be5395f5d55f26c91b366c4b7dea1dac
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-2023f-q5.md
---

An insurer has a portfolio of one-year policies with annual premiums. The claims triangle below shows the incremental claim payments for the portfolio for each of the last four accident years, by development year. Assume all incremental payments are made at the middle of each year, and claims are fully developed by the end of Development Year (DY) 3.

| Accident Year (AY) | DY 0 | DY 1 | DY 2 | DY 3 |
|---|---|---|---|---|
| 2019 | 104 | 38 | 17 | 5 |
| 2020 | 106 | 40 | 19 | |
| 2021 | 138 | 45 | | |
| 2022 | 145 | | | |

You are given the following inflation rates, measured from mid-year to mid-year:

| Period | Inflation |
|---|---|
| 2019-2020 | 2.0% |
| 2020-2021 | 4.4% |
| 2021-2022 | 7.5% |
| 2022-2023 | 3.0% |

## Part a (1 point)

Show that the AY 2019 inflation-adjusted aggregate paid claims, expressed in terms of mid-2023 monetary units, are 190 to the nearest 10. You should calculate the value to the nearest 0.1.

### Explanation
The aggregate inflation adjusted 2019 AY claims are:

$$
\begin{align*}
& 5(1.03) + 17(1.03)(1.075) + 38(1.03)(1.075)(1.044) + 104(1.03)(1.075)(1.044)(1.02) \\
&= 190.53
\end{align*}
$$

### Examiner Report
This was a question where Execl could be an asset in answering the question. However, as is clearly stated in the instructions, candidates who use Excel MUST provide enough work on the page for the grader to be able to follow their thought process and check their work. There were candidates using Excel who did not provide sufficient information.

## Part b (3 points)

Using the inflation-adjusted chain ladder method, show that the estimated total ultimate claims from all four accident years of the table, expressed in terms of mid-2023 monetary units, is 840 to the nearest 10. You should calculate the value to the nearest 0.1.

### Explanation
The incremental claims adjusted for inflation to 2023 values are:

| Accident Year (AY) | DY 0 | DY 1 | DY 2 | DY 3 |
|---|---|---|---|---|
| 2019 | 122.63 | 43.93 | 18.82 | 5.15 |
| 2020 | 122.53 | 44.29 | 19.57 | |
| 2021 | 152.80 | 46.35 | | |
| 2022 | 149.35 | | | |

The inflation-adjusted cumulative claims are:

| Accident Year (AY) | DY 0 | DY 1 | DY 2 | DY 3 |
|---|---|---|---|---|
| 2019 | 122.63 | 166.55 | 185.38 | 190.53 |
| 2020 | 122.53 | 166.82 | 186.39 | |
| 2021 | 152.80 | 199.15 | | |
| 2022 | 149.35 | | | |

The development factors are:

| | DY 0 | DY 1 | DY 2 | DY 3 |
|---|---|---|---|---|
| $\hat{f}_j$ | 1.338 | 1.115 | 1.028 | - |
| $\hat{\lambda}_j$ | 1.534 | 1.146 | 1.028 | |

Hence, the total incurred claims in 2023 units are:

$$
190.53 + 186.39\hat{f}_2 + 199.15\hat{f}_2\hat{f}_1 + 149.35\hat{f}_2\hat{f}_1\hat{f}_0 = 839.4
$$

$$
\text{or: } 190.53 + 186.39\hat{\lambda}_2 + 199.15\hat{\lambda}_1 + 149.35\hat{\lambda}_0 = 839.4
$$

### Examiner Report
There were a number of candidates who did (a) correctly, and then didn't use those values in (b). When developing claims with inflation, the inflation adjustment should be done first, so all values are in a common year, before developing the claims. Many candidates either ignored inflation or calculated development factors using non-inflation-adjusted values and then attempted to adjust for inflation.

## Part c (3 points)

You are given that the total earned premiums were:

| Year | Earned Premiums |
|---|---|
| 2019 | 220 |
| 2020 | 225 |
| 2021 | 235 |
| 2022 | 275 |

Between 2018 and 2023 there were only two premium rate increases:

- A 4% increase on 1 July 2020
- A 6% increase on 1 October 2021

It is assumed that policies are issued uniformly and premiums are earned evenly over each year.

Show that the total earned premium for 2019-2022 at current rate levels is 1020 to the nearest 10. You should calculate the value to the nearest 0.1.

### Explanation
Assuming policies are issued uniformly over each calendar year:

| Year | Earned Premiums | Parallelogram Increase | On-level Factor | Earned Premium at current rates |
|---|---|---|---|---|
| 2019 | 220 | 1 | 1.1024 | 242.53 |
| 2020 | 225 | 1.0050 | 1.0969 | 246.81 |
| 2021 | 235 | 1.0370 | 1.0631 | 249.83 |
| 2022 | 275 | 1.0849 | 1.0162 | 279.45 |

The total earned premium for 2019-2022 at current rates is

$$
242.53 + 246.81 + 249.83 + 279.45 = 1018.6
$$

### Examiner Report
Many candidates had trouble with the parallelogram method in part (c).

## Part d (1 point)

You are also given the following information:

(i) Total inflation-adjusted fixed expenses of 35 were incurred during 2019-2022.

(ii) Variable expenses are included in the run-off triangle figures.

(iii) The permissible loss ratio is 0.8.

Calculate the percentage increase in premium using the loss ratio method.

### Explanation
The loss ratio for the period is $(839.4 + 35)/1018.6 = 0.8584331$

Therefore, the percentage increase in premium is $(0.8584331/0.80) - 1 = 0.0730 = 7.30\%$.

### Examiner Report
For part (d), we'd like to emphasize that candidates who used the rounded values in earlier parts of the problem received full credit. Also in (d), the loss ratio needs to cover both claims and fixed expenses and the calculation should involve both earned premium and the developed losses.

## Part e (1 point)

State with reasons whether the year 2019 earned premiums adjusted to current rate level would increase, decrease, or stay the same if the policies were all issued in the first three months of 2019. Assume that the unadjusted 2019 earned premiums remain at 220.

### Explanation
Since there were no premium increases during 2019, the 2019 earned premiums adjusted to current rate levels would stay the same.

### Examiner Report
For Part (e), a common mistake was to say that issuing policies earlier would cause the EP to increase – a typical reasoning was that there would be more time for inflation to be applied.
