---
id: "cas5-an-003"
exam: "Exam 5"
topic: "Linear Trend"
learning_objective: "Ratemaking"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Linear+Trend
  - Concepts/Loss+Trend
  - Concepts/Severity
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:f79bf54b41ec81cbdbf9e318ce0423eccf5a4c34fa8e572045be19c6b83ff867
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.6 Loss Trend Selections, linear vs exponential models, printed p.110 (PDF 122), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-5/cas5-an-003.md
---

An actuary is measuring severity trend for a ratemaking analysis. Accident-year average severities are:

| Accident year | 2020 | 2021 | 2022 | 2023 | 2024 |
|---|---|---|---|---|---|
| Average severity | 4,800 | 4,950 | 5,130 | 5,240 | 5,430 |

The actuary selects the trend from a linear least-squares fit to these five points and applies it to the accident year 2024 average severity over a trend period of 2.75 years.

Calculate the projected average severity.

- A) 5,536
- B) 5,585
- C) 5,856
- D) 5,903
- E) 6,050

## Explanation

A linear trend changes the statistic by a **constant amount** per year, so the projected change is the selected annual amount times the length of the trend period (Werner & Modlin, Chapter 6).

Fit the line with $t = 0, \dots, 4$ for 2020–2024, so $\bar{t} = 2$ and $\bar{y} = 5{,}110$:

$$
\begin{align*}
\sum (t - \bar{t})(y_t - \bar{y}) &= (-2)(-310) + (-1)(-160) + 0(20) + 1(130) + 2(320) \\
&= 1{,}550 \\
\sum (t - \bar{t})^2 &= 10 \\
b &= 1{,}550 / 10 \\
&= 155 \text{ per year}
\end{align*}
$$

Apply it to the AY 2024 severity:

$$
\begin{align*}
\text{Projected severity} &= 5{,}430 + 155 \times 2.75 \\
&= 5{,}430 + 426.25 \\
&= \mathbf{5{,}856}
\end{align*}
$$

The answer is **C**.

**Why not the others**

- **A** — 5,536 adds the 2.75 years of trend to the five-year average severity (5,110). The average sits at the middle of 2022, so it would need a longer trend period; the stem trends the 2024 value.
- **B** — 5,585 adds a single year of trend (155) instead of 2.75 years.
- **D** — 5,903 comes from an exponential fit (about 3.08% a year, compounded for 2.75 years). An exponential trend is a constant *percentage*; the stem selects a linear one.
- **E** — 6,050 uses four years, the span of the data, as the trend period instead of the 2.75 years given.
