---
id: "astam-2025f-q5"
exam: "Exam ASTAM"
topic: "Chain Ladder Method"
learning_objective: "Reserving and Pricing for Short-Term Insurance Coverages"
difficulty: medium
type: multi-part
year: 2025
session: Fall
wiki_link:
  - Concepts/Chain+Ladder+Method
  - Concepts/Calendar+Year+Effect
  - Concepts/Chain+Ladder+Assumptions
  - Concepts/Development+Factor
  - Concepts/Inflation
  - Concepts/Unpaid+Claims
points: 10
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:99d5f48b6f45bf868561c458eec3a136ce1ce883a8d111933314ed9c75fddb2a
  sources:
    - "SOA Exam ASTAM Fall 2025 — exam questions, Q5, pp.11-12, sha256:82e9e32cfe70c47f3cba084117198396bf78398428322502889c33d163417254 — https://www.soa.org/globalassets/assets/files/edu/2025/fall/exams/2025-fall-astam-exam.pdf"
    - "SOA Exam ASTAM Fall 2025 — model solutions and examiners' comments, Q5, pp.11-13, sha256:b575524316d2938cec3a30d74109c217e79c4d353b125e489e84e73fe6c44b0a — https://www.soa.org/globalassets/assets/files/edu/2026/spring/solutions/2025-11-astam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-2025f-q5.md
---

A casualty insurance company sells a product that pays a single fixed payment of 200 if the insured is hospitalized.

The following are the cumulative claim payments, in 000's, from the third quarter of 2023 through to the end of 2024.

You can assume that there are no claim payments after Development Quarter 5.

**Cumulative claim payments by quarter-year (in 000's)**

| Accident Quarter | Development Quarter 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| Q3-2023 | 70 | 190 | 236 | 276 | 310 | 316 |
| Q4-2023 | 80 | 220 | 280 | 330 | 360 | |
| Q1-2024 | 80 | 230 | 300 | 360 | | |
| Q2-2024 | 90 | 260 | 340 | | | |
| Q3-2024 | 100 | 290 | | | | |
| Q4-2024 | 100 | | | | | |

## Part a (4 points)

(i) Show that the projected cumulative claims incurred in 2024, using the Chain Ladder method, total 1840 to the nearest 10. You should calculate your answer to the nearest 0.1.

(ii) Explain why the inflation-adjusted chain ladder would not be appropriate in this case.

(iii) Calculate the projected claims payments in Quarter 2 of 2025 in respect of claims arising in 2024.

### Explanation

In the following, subscript $i = 0$ corresponds to Q3-2023, $i = 1$ corresponds to Q4-2023, and so on. The 2024 accident quarters then correspond to $i = 2, 3, 4, 5$.

(i) The development factors are:

$$f_0 = \frac{1190}{420} = 2.8333; \quad f_1 = \frac{1156}{900} = 1.2844; \quad f_2 = \frac{966}{816} = 1.1838;$$

$$f_3 = \frac{670}{606} = 1.1056; \quad f_4 = \frac{316}{310} = 1.0194$$

$$\lambda_j = \prod_{k=j}^{4} f_k$$

$$\Rightarrow \lambda_0 = 4.8554; \quad \lambda_1 = 1.7137; \quad \lambda_2 = 1.3342; \quad \lambda_3 = 1.1270; \quad \lambda_4 = 1.0194$$

So 2024 Projected cumulative claims are

$$
\begin{align*}
& C_{2,3}\lambda_3 + C_{3,2}\lambda_2 + C_{4,1}\lambda_1 + C_{5,0}\lambda_0 \\
&= 360(1.1270) + 340(1.3342) + 290(1.7137) + 100(4.8554) \\
&= \mathbf{1841.85}
\end{align*}
$$

(ii) Claim severities are fixed amounts, so there is no inflationary impact.

(iii) Let $\tilde{X}_{i,j} = \tilde{C}_{i,j} - \tilde{C}_{i,j-1}$ denote the projected claim payments made in Development Quarter (DQ) $j$ arising in Accident Quarter (AQ) $i$.

Q2-2025 projected payments are $\tilde{X}_{i,j}$ where $i + j = 7$.

So the total projected Q2-2025 payments from 2024 claims (that is, for $i = 2, 3, 4, 5$) are:

$$\tilde{X}_{2,5} + \tilde{X}_{3,4} + \tilde{X}_{4,3} + \tilde{X}_{5,2};$$

$$
\begin{align*}
\tilde{X}_{2,5} &= \tilde{C}_{2,5} - \tilde{C}_{2,4} \\
                &= C_{2,3}\left(f_3 f_4 - f_3\right) \\
&= 7.70 \\
\tilde{X}_{3,4} &= \tilde{C}_{3,4} - \tilde{C}_{3,3} \\
                &= C_{3,2}\left(f_2 f_3 - f_2\right) \\
&= 42.51 \\
\tilde{X}_{4,3} &= \tilde{C}_{4,3} - \tilde{C}_{4,2} \\
                &= C_{4,1}\left(f_1 f_2 - f_1\right) \\
&= 68.47 \\
\tilde{X}_{5,2} &= \tilde{C}_{5,2} - \tilde{C}_{5,1} \\
                &= C_{5,0}\left(f_0 f_1 - f_0\right) \\
&= 80.59
\end{align*}
$$

Total: $\mathbf{199.28}$

### Examiner Report

Examiners' Comments

1. The calendar year test used in the second part of this question has not been tested before in ASTAM, and the examiners were aware that many candidates might not have studied it. However, all the necessary formulas were available from the formula sheet. Candidates are advised to be very familiar with all the contents of the formula sheet in order to do well on this exam.
2. Part (a)(i) was done well. Part (a)(ii) required candidates to read and understand the context of the question, and was missed by many. Part (a)(iii) required candidates to understand how accident quarter, development quarter, and calendar quarter are represented in a claims triangle, as well as the difference between cumulative claims and paid claims. This part was more problematic. Candidates should expect the exam to test their understanding of context and processes.

## Part b (1 point)

Explain what is meant by the term "calendar year effect" in relation to estimating outstanding claims using the chain ladder method.

### Explanation

Calendar year effect means that claim payment patterns are dependent on the calendar year (or quarter) of payment, rather than just AQ and DQ.

### Examiner Report

3. Part (b) was hit or miss. The assumption that payment patterns are independent of calendar year/quarter is key to the chain ladder and associated methods and models. Around 40% of candidates achieved all or most credit for this part. Around the same number scored no points for this part.

## Part c (4 points)

The insurer uses the 'Large (L) – Small (S)' test of development factors to test for calendar year effects by quarter-year. The L-S triangle for the development factors is given below. Median values are indicated by *.

| Accident Quarter | Development Quarter 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| Q3-2023 | S | S | S | L | * |
| Q4-2023 | S | S | * | S | |
| Q1-2024 | * | L | L | | |
| Q2-2024 | L | L | | | |
| Q3-2024 | L | | | | |

Let $k = 1$ denote the quarter year Q4-2023, $k = 2$ denote the quarter year Q1-2024, etc.

(i) Write down the null hypothesis for the test.

(ii) Write down the values of $n_k$, $m_k$, and $Z_k$ for $k = 1, 2, 3, 4$.

(iii) Calculate $E[Z_4]$ under the null hypothesis.

(iv) You are given that under the null hypothesis, $E[Z] = 3.0$ and $\text{Var}[Z] = 1.125$. Calculate the $p$-value of the test.

(v) State the conclusion of the test.

### Explanation

(i) The null hypothesis is

H<sub>0</sub>: Development factors are independent of calendar quarter of payment.

(ii) We consider the off diagonals of the triangle, which correspond to payment quarter-years. We ignore the first diagonal ($k = 0$) which only has a single observation.

For each diagonal we find the following statistics:

$S_k$ is the number of S's in QY $k$; $L_k$ is the number of L's in QY $k$;

$$n_k = S_k + L_k; \quad m_k = \lfloor (n_k - 1)/2 \rfloor; \quad Z_k = \min(S_k, L_k)$$

That is:

| $k$ | $S_k$ | $L_k$ | $n_k$ | $m_k$ | $Z_k$ |
|---|---|---|---|---|---|
| 1 (Q4-2023) | 2 | 0 | 2 | 0 | 0 |
| 2 (Q1-2024) | 2 | 0 | 2 | 0 | 0 |
| 3 (Q2-2024) | 0 | 3 | 3 | 1 | 0 |
| 4 (Q3-2024) | 1 | 3 | 4 | 1 | 1 |

(iii) From the formula sheet:

$$E[Z_4] = \frac{n_4}{2} - \binom{n_4 - 1}{m_4}\frac{n_4}{2^{n_4}} = 2 - \binom{3}{1}\frac{1}{4} = 2 - \frac{3}{4} = \mathbf{1.25}$$

(iv) The test statistic is $Z = \sum Z_k = \mathbf{1}$

(v) (as printed)

$$p = 2\left(1 - \Phi\left(\frac{|Z - E[Z]|}{\sqrt{Var[Z]}}\right)\right) = 2\left(1 - \Phi\left(\frac{2}{\sqrt{1.125}}\right)\right) = \mathbf{5.93\%}$$

The test is not significant at the 5% level, and so at this significance we would accept the null hypothesis that payment patterns in different quarters are not significantly different.

(Note though that the result is significant at the 10% level, and with so little data, the test is not very powerful.)

### Examiner Report

4. Part (c) was also hit or miss – candidates either achieved close to maximum points, or 0 points.

## Part d (1 point)

Describe one reason why there might be a calendar year effect in a claims development triangle.

### Explanation

The first chain ladder assumption is that expected run-off patterns are the same for different accident quarter years. If there is a calendar year effect, that implies that the run-off rates might change over time – for example, if the insurer implements improved claims management systems at the start of 2025, then the development factors in 2025 will be different from those before 2025.

### Examiner Report

5. Part (d) was omitted by most candidates. Most of those who did attempt the question offered valid reasons and earned the full exam point.
