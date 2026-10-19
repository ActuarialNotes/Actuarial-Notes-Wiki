---
id: "astam-an-001"
exam: "Exam ASTAM"
topic: "Loss Trend"
learning_objective: "Reserving and Pricing for Short-Term Insurance Coverages"
difficulty: medium
type: multi-part
bloom: apply
wiki_link:
  - Concepts/Loss+Trend
  - Concepts/Trend
  - Concepts/Exponential+Trend
points: 4
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-19
  last_checked_by: agent:validate-v1
  content_hash: sha256:bbaa713a6c7b791dabd31f6c49219b7859bd8c060196773cec3e9fe0db65cf0a
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 pp.110-111, 113-114 (PDF pp.122-123, 125-126): exponential regression for loss trend; loss trend period, average accident date to average accident date of policy-year forecast period, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "SOA Exam ASTAM Syllabus, October 2026, Topic 6, learning outcome (c), p.5, sha256:6d462aea25c09b15cc457176ecf2d5d6143df8fb88df9f366557de17ec1ec9ba — https://www.soa.org/globalassets/assets/files/edu/2026/astam/2026-fall-exam-astam-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-an-001.md
---

An insurer is setting rates for annual policies that will be written from January 1, 2026 to December 31, 2026; each policy provides coverage for one year from the day it is written. The experience period is accident year 2024, whose losses, developed to ultimate, total 4,200,000. Losses occur uniformly over every period.

The insurer's average claim cost (severity) by accident year, developed to ultimate, is:

| Accident year | Average claim cost |
|---|---|
| 2019 | 5,200 |
| 2020 | 5,450 |
| 2021 | 5,900 |
| 2022 | 6,150 |
| 2023 | 6,600 |
| 2024 | 7,000 |

Claim frequency has shown no trend, so loss trend is taken to be the severity trend.

## Part a (2 points)

Fit an exponential trend to the six average claim costs by least squares — regress the natural logarithm of the average claim cost on the accident year — and calculate the fitted annual trend rate. Enter it as a percentage to one decimal place, without the % sign (for example, 3.5).

### Answer
6.2

### Explanation
The exponential model is $\ln y_x = a + b\,x$, so the annual trend is $e^{b} - 1$. Let $x = 0, 1, \dots, 5$ for 2019–2024, so $\bar{x} = 2.5$ and

$$S_{xx} = \sum (x - \bar{x})^2 = 6.25 + 2.25 + 0.25 + 0.25 + 2.25 + 6.25 = 17.5$$

The logarithms of the average claim costs are 8.556414, 8.603371, 8.682708, 8.724207, 8.794825 and 8.853665, with mean 8.702532. Then

$$S_{x\ln y} = \sum (x - \bar{x})(\ln y_x - \overline{\ln y}) = 1.051060$$

$$b = \frac{S_{x\ln y}}{S_{xx}} = \frac{1.051060}{17.5} = 0.060061$$

$$\text{Annual trend} = e^{0.060061} - 1 = 0.06190$$

The fitted annual trend is **6.2%**.

Why not the likely wrong entries:

- **6.0** reports the slope $b$ itself as the trend. The slope is the trend in the *logarithm*; the annual rate of change is $e^{b} - 1$.
- **6.1** is the end-point trend, $(7{,}000/5{,}200)^{1/5} - 1 = 6.13\%$, which uses only the first and last years and ignores the four in between — not the least-squares fit the question asks for.
- **5.2** fits a *linear* trend (slope 362.86 per year) and divides by the latest year's 7,000. A linear fit is a different model; an exponential fit assumes a constant *percentage* change.

## Part b (1 point)

Calculate the trend period, in years, from the experience period to the period in which the new rates' losses will occur. Enter it to one decimal place.

### Answer
2.5

### Explanation
The trend period runs from the average accident date of the experience period to the average accident date of the policy period.

- **Experience period.** Accident year 2024 runs January 1 to December 31, 2024; with losses uniform its average accident date is **July 1, 2024**.
- **Policy period.** The first policy written (January 1, 2026) covers 2026; the last (December 31, 2026) covers to December 31, 2027. Losses under the new rates therefore occur from January 1, 2026 to December 31, 2027, and their average accident date is **January 1, 2027**.

$$n = \text{January 1, 2027} - \text{July 1, 2024} = \mathbf{2.5} \text{ years}$$

Why not the likely wrong entries:

- **2.0** measures to July 1, 2026, the midpoint of the period in which the policies are *written*, forgetting that each policy then covers a further year.
- **1.5** measures to January 1, 2026, the date the rates take effect.
- **3.0** measures from January 1, 2024, the *start* of the experience period, rather than its average accident date.

## Part c (1 point)

Using the trend rate from Part a rounded to 6.2% and a trend period of 2.5 years, calculate the projected losses for accident year 2024 at the cost level of the policy period. Give your answer to the nearest whole number.

### Answer
4881582

### Explanation
$$\text{Trend factor} = 1.062^{2.5} = 1.162281$$

$$\text{Projected losses} = 4{,}200{,}000 \times 1.162281 = \mathbf{4{,}881{,}582}$$

The trend is compounded over the trend period, $(1 + t)^{n}$; it is not simple interest.

Why not the likely wrong entries:

- **4,736,945** uses $n = 2.0$, the midpoint of the writing period.
- **4,596,593** uses $n = 1.5$, the rates' effective date.
- **5,030,635** uses $n = 3.0$, measured from the start of the experience period.
- **4,851,000** applies the trend as simple growth, 4,200,000 × (1 + 2.5 × 0.062), rather than compounding it.
