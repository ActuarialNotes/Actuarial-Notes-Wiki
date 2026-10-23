---
id: "altam-2023s-q1"
exam: "Exam ALTAM"
topic: "Transition Probability Matrix"
learning_objective: "Survival Models for Contingent Cash Flows"
difficulty: medium
type: multi-part
year: 2023
session: Spring
wiki_link:
  - Concepts/Transition+Probability+Matrix
  - Concepts/Chapman-Kolmogorov+Equations
  - Concepts/Multiple+State+Model
  - Concepts/Expected+Value
  - Concepts/Present+Value
points: 10
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:2bd3c8b0f1c1e219c61f940b882a13d1e158674f548e21a9f4217a10cb20000e
  sources:
    - "SOA Exam ALTAM Spring 2023 — exam (question paper), Q1, pp.2-3, sha256:22d9ab9530cb311d979dada69c2af9c6f87cba7fd854e2da29793aa3d2715095 — https://www.soa.org/globalassets/assets/files/edu/2023/spring/exams/spring-2023-exam-altam.pdf"
    - "SOA Exam ALTAM Spring 2023 — model solutions and examiners' comments, Q1, pp.1-3, sha256:7808fbbb76bc8d54d394976603e8123a3fdb44a6020cfd126cc95f3c6814b512 — https://www.soa.org/globalassets/assets/files/edu/2023/spring/solutions/spring-2023-solutions-altam.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-2023s-q1.md
---

You are given the following information about a portfolio of in-force policies.

(i) Policyholders are either Healthy (State 0), Temporarily Disabled (State 1), Permanently Disabled (State 2), or Dead (State 3).

(ii) At time 0, there are 14 Healthy lives, 0 Temporarily Disabled lives, and 1 Permanently Disabled life.

(iii) All 15 lives are independent.

(iv) Transitions are modeled as a homogeneous Markov model.

(v) The annual transition matrix is

$$
P = \begin{pmatrix} 0.80 & 0.10 & 0.05 & 0.05 \\ 0.20 & 0.50 & 0.10 & 0.20 \\ 0 & 0 & 0.70 & 0.30 \\ 0 & 0 & 0 & 1 \end{pmatrix}
$$

(vi) The two-year transition matrix, but with some missing values denoted by $-\,-$, is

$$
{}_2P = \begin{pmatrix} 0.660 & -\,- & 0.085 & -\,- \\ 0.260 & 0.270 & 0.130 & -\,- \\ 0 & 0 & -\,- & -\,- \\ 0 & 0 & 0 & 1 \end{pmatrix}
$$

## Part a (2 points)

Calculate the missing values in the two-year transition matrix.

### Explanation

$$
{}_2p_x^{01} = \begin{pmatrix} 0.80 & 0.10 & 0.05 & 0.05 \end{pmatrix} \begin{pmatrix} 0.10 \\ 0.50 \\ 0.00 \\ 0.00 \end{pmatrix} = 0.130
$$

$$
{}_2p_x^{03} = \begin{pmatrix} 0.80 & 0.10 & 0.05 & 0.05 \end{pmatrix} \begin{pmatrix} 0.05 \\ 0.20 \\ 0.30 \\ 1.00 \end{pmatrix} = 0.125
$$

$$
{}_2p_x^{13} = \begin{pmatrix} 0.20 & 0.50 & 0.10 & 0.20 \end{pmatrix} \begin{pmatrix} 0.05 \\ 0.20 \\ 0.30 \\ 1.00 \end{pmatrix} = 0.340
$$

$$
{}_2p_x^{22} = \begin{pmatrix} 0 & 0 & 0.7 & 0.3 \end{pmatrix} \begin{pmatrix} 0.05 \\ 0.10 \\ 0.70 \\ 0 \end{pmatrix} = 0.490
$$

$$
{}_2p_x^{23} = \begin{pmatrix} 0 & 0 & 0.7 & 0.3 \end{pmatrix} \begin{pmatrix} 0.05 \\ 0.20 \\ 0.30 \\ 1.00 \end{pmatrix} = 0.510
$$

### Examiner Report
Candidates did well on this part. The most common mistake was calculation error.

## Part b (2 points)

Calculate the probability that exactly one policyholder will die within 2 years.

### Explanation
The probability is equal to

a. the probability that one healthy life dies, and the other healthy lives and the permanently disabled life all survive

b. plus the probability that all healthy lives survive but the permanently disabled life dies;

That is:

$$
\begin{align*}
&\binom{14}{1}\,{}_2p^{03}\left(1 - {}_2p^{03}\right)^{13}\left(1 - {}_2p^{23}\right) + \left(1 - {}_2p^{03}\right)^{14}\,{}_2p^{23} \\
&= 0.15113 + 0.07865 \\
&= 0.22977
\end{align*}
$$

### Examiner Report
Although many candidates earned maximum credit, many did not. The most common errors included not allowing for the 14 healthy lives, or ignoring the permanently disabled life.

## Part c (1 point)

Calculate the expected number of policyholders who will die within 2 years.

### Explanation
As the lives are independent, the expected number of deaths is

$$
14\,{}_2p^{03} + {}_2p^{23} = 2.26
$$

### Examiner Report
Candidates did well on this part.

## Part d (4 points)

The policies provide the following benefits:

- A benefit of 500,000 is paid at the end of the year that a policyholder becomes permanently disabled, if they are still alive at that time.
- A benefit of 1,000,000 is paid at the end of the year of death (whether they were disabled or not).

The insurer values the benefits at $i = 0.06$.

(i) (1.5 points) Show that the expected present value of the benefits payable in the next 2 years to the one Permanently Disabled life is 469,920 to the nearest 10. You should calculate the value to the nearest 1.

(ii) (2.5 points) Calculate the expected present value of all the benefits payable in the next 2 years for the 14 Healthy lives.

### Explanation
**(i)** For the PD life:

A Death Benefit will be paid at time 1 with probability ${}_1p^{23} = 0.3$

A Death Benefit will be paid at time 2 with probability ${}_1p^{22} \times {}_1p^{23} = 0.21$

There are no remaining Disability Benefits

So the expected present value is

$$
1{,}000{,}000\left(\frac{0.3}{1.06} + \frac{0.21}{1.06^2}\right) = 469{,}918
$$

**(ii)** For each of the 14 healthy lives:

A Death Benefit will be paid at time 1 with probability ${}_1p^{03} = 0.05$

A Death Benefit will be paid at time 2 with probability ${}_2p^{03} - {}_1p^{03} = 0.075$

A Disability Benefit is paid at time 1 with probability ${}_1p^{02} = 0.05$

A Disability benefit is paid at time 2 with probability

$$
{}_1p^{00}\,{}_1p^{02} + {}_1p^{01}\,{}_1p^{12} = 0.05
$$

So the EPV of all benefits to all 14 healthy lives is

$$
\begin{align*}
&14\left(1{,}000{,}000\left(0.05\,v_{6\%} + 0.075\,v_{6\%}^2\right) + 500{,}000\left(0.05\,v_{6\%} + 0.05\,v_{6\%}^2\right)\right) \\
&= 1{,}594{,}874 + 641{,}687 \\
&= 2{,}236{,}561
\end{align*}
$$

### Examiner Report
Candidates had the most difficulty with the time 2 benefits. Some tried to use shortcuts, which missed states that a life could move into. A few candidates tried to use the part (i) answer in part (ii), not realizing they were unrelated benefits.

## Part e (1 point)

Describe one disadvantage of the assumption of homogeneity of the Markov model for valuing this portfolio.

### Explanation
Possible answers

a. We do not expect these values to be homogeneous – that is, we expect the transition probabilities to change over time.

b. We do not expect the probabilities to be Markov – for example, the probability of becoming permanently disabled for a life that is temporarily disabled might depend on the length of time that the life has been in the temporarily disabled state.

### Examiner Report
Several candidates stated advantages instead of disadvantages. Some stated disadvantages of using an average instead of relating it to the homogeneity of the Markov model, as required in the question.
