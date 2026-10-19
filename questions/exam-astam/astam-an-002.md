---
id: "astam-an-002"
exam: "Exam ASTAM"
topic: "Trend"
learning_objective: "Reserving and Pricing for Short-Term Insurance Coverages"
difficulty: medium
type: multi-part
bloom: analyze
wiki_link:
  - Concepts/Trend
  - Concepts/Loss+Trend
  - Concepts/Deductible
  - Concepts/Increased+Limits
points: 5
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-19
  last_checked_by: agent:validate-v1
  content_hash: sha256:7549a976ab04674c538011c6c7b6395fd8e333ddac69e6bd7ef8fa045d4f6664
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 pp.117-118 (PDF pp.129-130): leveraged effect of limits on severity trend, Exhibit 6.20-6.21; deductibles' leveraging effect, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "SOA Exam ASTAM Syllabus, October 2026, Topic 6, learning outcome (c), p.5, sha256:6d462aea25c09b15cc457176ecf2d5d6143df8fb88df9f366557de17ec1ec9ba — https://www.soa.org/globalassets/assets/files/edu/2026/astam/2026-fall-exam-astam-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-an-002.md
---

A pricing actuary has measured a severity trend of 10% a year on an insurer's **ground-up** losses: every loss, whatever its size, is expected to be 10% larger next year. To see what that trend does to the losses the insurer actually prices, the actuary takes six ground-up losses from the current year as a representative sample:

| Loss | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| Ground-up amount | 480 | 1,000 | 2,500 | 6,000 | 9,600 | 20,000 |

Next year each of these losses is 10% larger.

## Part a (1 point)

The insurer sells a policy with a straight deductible of 500 per loss and no limit. Calculate the annual trend in the insurer's total payments on the six losses. Enter it as a percentage to one decimal place, without the % sign (for example, 3.5).

### Answer
10.8

### Explanation
Payments are $\max(X - 500,\, 0)$ for each loss $X$.

| Loss | This year | Next year (ground-up × 1.10) | Payment this year | Payment next year |
|---|---|---|---|---|
| 1 | 480 | 528 | 0 | 28 |
| 2 | 1,000 | 1,100 | 500 | 600 |
| 3 | 2,500 | 2,750 | 2,000 | 2,250 |
| 4 | 6,000 | 6,600 | 5,500 | 6,100 |
| 5 | 9,600 | 10,560 | 9,100 | 10,060 |
| 6 | 20,000 | 22,000 | 19,500 | 21,500 |
| **Total** | 39,580 | 43,538 | **36,600** | **40,538** |

$$\text{Trend in payments} = \frac{40{,}538}{36{,}600} - 1 = 0.1076 = \mathbf{10.8\%}$$

Why not the likely wrong entries:

- **10.0** assumes a trend measured on ground-up losses applies unchanged to losses net of a deductible.
- **10.7** is the trend on the five losses that already exceeded the deductible, $(40{,}510/36{,}600) - 1$; it leaves out loss 1, which crosses the deductible and produces a payment for the first time.

## Part b (1 point)

The insurer's rates are based on **basic-limits** losses: each loss capped at 10,000. Calculate the annual trend in the six losses' total basic-limits amount. Enter it as a percentage to one decimal place, without the % sign.

### Answer
4.7

### Explanation
Basic-limits losses are $\min(X,\, 10{,}000)$.

| Loss | Basic limits this year | Basic limits next year |
|---|---|---|
| 1 | 480 | 528 |
| 2 | 1,000 | 1,100 |
| 3 | 2,500 | 2,750 |
| 4 | 6,000 | 6,600 |
| 5 | 9,600 | 10,000 |
| 6 | 10,000 | 10,000 |
| **Total** | **29,580** | **30,978** |

$$\text{Trend in basic-limits losses} = \frac{30{,}978}{29{,}580} - 1 = 0.0473 = \mathbf{4.7\%}$$

Why not the likely wrong entries:

- **10.0** applies the ground-up trend to capped losses.
- **7.1** drops loss 6 from both years as if it were wholly excess, giving 20,978 / 19,580 - 1; at basic limits it still contributes 10,000 in each year, and leaving it out hides how much the cap dampens the trend.

## Part c (1 point)

The actuary proposes to project both the deductible policy's payments and the basic-limits losses by applying the 10% ground-up severity trend directly. Which statement describes the effect?

- A) Both projections are correct, because a trend in every loss is a trend of the same size in every layer
- B) The deductible projection is understated and the basic-limits projection is overstated
- C) The deductible projection is overstated and the basic-limits projection is understated
- D) Both projections are understated, because a deductible and a limit each leverage the trend upward
- E) Both projections are overstated, because a deductible and a limit each dampen the trend

### Answer
B

### Explanation
From Part a, payments net of the deductible rise 10.8% — faster than 10% — so a 10% projection **understates** them. From Part b, basic-limits losses rise 4.7% — slower than 10% — so a 10% projection **overstates** them. The answer is **B**.

- **A** is the misconception the question is built on: the trend is uniform in *ground-up* dollars, but a fixed deductible and a fixed limit do not move with it, so the layers they cut do not trend at the same rate.
- **C** reverses the two effects — the deductible is the one that leverages the trend up.
- **D** treats the limit like the deductible. A limit caps the growth of the largest losses, so it dampens the trend; it is the layer *above* the limit that is leveraged (here the losses excess of 10,000 grow from 10,000 to 12,560, a 25.6% trend).
- **E** treats the deductible like the limit.

## Part d (2 points)

Explain why the trend in the deductible policy's payments differs from the ground-up trend, why the trend in basic-limits losses differs from it in the other direction, and how the actuary should measure the trend to apply to each.

### Explanation
A full-credit answer makes these points:

1. **Deductible — leveraged up.** The deductible is a fixed dollar amount, so the whole of each loss's increase falls on the insurer: a loss that grows 10% has its payment grow by more than 10% (loss 2's payment rises from 500 to 600, or 20%). In addition, losses just below the deductible are pushed above it, so the **number** of losses producing a payment rises (from 5 to 6 here) even though ground-up frequency has not changed.
2. **Basic limits — dampened.** The limit is also fixed, so a loss already above 10,000 contributes nothing more as it grows, and a loss just below the limit can grow only up to it. Only the increases below the limit are counted, so the capped losses trend at less than 10%. The increase that is lost reappears, leveraged, in the layer above the limit.
3. **What to do.** Measure the trend on data in the same form as the losses being projected — payments net of the deductible, or losses capped at basic limits — or apply the ground-up trend to a ground-up loss distribution (or to individual ground-up losses, as here) and recompute the layer. The ground-up severity trend should not be applied directly to limited or deductible data.

**Sample answer.** Because the deductible does not inflate, every dollar of ground-up growth on a loss above it is paid by the insurer, and some losses below it cross it and start producing payments, so payments net of the deductible grow faster than the ground-up 10%. Because the limit does not inflate, growth on losses at or near 10,000 is cut off, so basic-limits losses grow slower than 10%. The actuary should measure each trend on deductible or basic-limits data directly, or trend the ground-up losses and reapply the deductible and the limit, rather than applying the ground-up trend to either.
