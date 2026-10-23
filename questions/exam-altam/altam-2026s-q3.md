---
id: "altam-2026s-q3"
exam: "Exam ALTAM"
topic: "Multiple State Model"
learning_objective: "Premium and Policy Valuation for Long-Term State-Dependent Coverages"
difficulty: hard
type: multi-part
year: 2026
session: Spring
wiki_link:
  - Concepts/Multiple+State+Model
  - Concepts/Chapman-Kolmogorov+Equations
  - Concepts/Woolhouse's+Formula
  - Concepts/Equivalence+Principle
  - Concepts/Policy+Value
  - Concepts/Thiele's+Differential+Equation
points: 11
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:f84ae3f526bce813e1d9203995301fbf34d740299326a05c22388ef1374aeacb
  sources:
    - "SOA Exam ALTAM Spring (April) 2026 – exam (questions), Q3, pp.6-7, sha256:be424c84e360f858fda955257513b27618d695b7e05cae80fca475145f90a9aa — https://www.soa.org/globalassets/assets/files/edu/2026/altam/april-2026-altam-exam.pdf"
    - "SOA ALTAM Spring 2026 Model Solutions and Examiners' Comments, Q3, pp.5-6, sha256:ca1bffa86e9b64729358c65e002dc38c533661dda14693310f8b3cddc852b4d6 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/solutions/2026-spring-altam-solutions.pdf"
    - "SOA Exam ALTAM April 2026 – Excel workbook (tables), sheet 'Sickness-Death Model', parameters O26:R33, sha256:2d8c59a01df2a61781bafcf3c64f9f85304dca80e284e5da1f73d9f223440074 — https://www.soa.org/globalassets/assets/files/edu/2026/altam/april-2026-altam-excel.xlsx"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-2026s-q3.md
---

You are using the Standard Sickness-Death multiple state model to price a whole life insurance policy issued to (50), with a waiver of premiums on sickness.

You are given the following policy information and assumptions:

(i) The death benefit of 100,000 is payable immediately on death.

(ii) Premiums are payable at the start of each of the first 20 years, if the policyholder is Healthy.

(iii) Premiums are waived if the policyholder is Sick at the premium payment date.

(iv) Commissions are 45% of premium in the first year and 8% of premiums paid thereafter. Commission is not paid on waived premiums.

(v) All policyholders are Healthy at the issue date.

(vi) Transitions follow the Standard Sickness-Death model given in the Excel worksheet.

(vii) $i = 0.05$

(viii) The Two-Term Woolhouse's Formula is used to calculate annual payment annuity values.

## Part a (3 points)

(i) Show that ${}_{20}p_{50}^{01} = 0.21$ to the nearest 0.01. You should calculate the value to the nearest 0.0001.

(ii) You are given that ${}_{20}p_{50}^{00} = 0.49695$. Show that $\ddot{a}_{50:\overline{20}|}^{00} = 11.22$ to the nearest 0.01. You should calculate the value to the nearest 0.0001.

### Explanation
**(i)**

$$
\begin{align*}
{}_{20}p_{50}^{01} &= \left({}_{10}p_{50}^{00}\right)\left({}_{10}p_{60}^{01}\right) + \left({}_{10}p_{50}^{01}\right)\left({}_{10}p_{60}^{11}\right) \\
&= 0.16442 + 0.04690 \\
&= 0.21131
\end{align*}
$$

**(ii)**

$$\ddot{a}_{50:\overline{20}|}^{00} = \ddot{a}_{50}^{00} - v^{20}\,{}_{20}p_{50}^{00}\,\ddot{a}_{70}^{00} - v^{20}\,{}_{20}p_{50}^{01}\,\ddot{a}_{70}^{10}$$

By W2term: $\ddot{a}_x^{00} = \bar{a}_x^{00} + 0.5$; $\quad \ddot{a}_x^{01} = \bar{a}_x^{01}$ (as printed)

$$
\begin{align*}
\Rightarrow \ddot{a}_{50:\overline{20}|}^{00} &= (11.7454 + 0.5) - v^{20}(0.49695)(4.9609 + 0.5) - v^{20}(0.21132)\text{ (as printed)}(0.0134) \\
&= 11.2215
\end{align*}
$$

### Examiner Report
1. Part (i) was done well by most candidates.
2. Candidates who attempted to calculate the probability in (i) by integration using constant transition rates earned no credit.
3. Part (ii) was not done as well as the Examiners had expected. In particular, most candidates omitted the third term in the expression (which accounts for the possibility of moving into State 1 and then back to State 0).
4. Many candidates seemed unfamiliar with applying the Woolhouse 2-term formula, which is given in the formula sheet. The Examiners strongly encourage all candidates to be as familiar as possible with all the information in the formula sheet.

## Part b (2.5 points)

Let $L$ denote the gross loss-at-issue random variable, and let $G$ denote the gross annual premium. You are given that $E[L] = -100$.

Show that $G = 3{,}340$ to the nearest 10. You should calculate the value to the nearest 0.1.

### Explanation
The premium equation is

$$E[L] = 100{,}000\,\bar{A}_{50}^{02} - 0.92\,G\,\ddot{a}_{50:\overline{20}|}^{00} + 0.37G = -100$$

$$\Rightarrow G = \frac{100{,}000\,\bar{A}_{50}^{02} + 100}{0.92\,\ddot{a}_{50:\overline{20}|}^{00} - 0.37} = 3337.98$$

### Examiner Report
1. This part was done well by most candidates, with a majority earning full credit.

## Part c (3 points)

You are given the following additional information:

- ${}_tV^{(j)}$ denotes the gross premium policy value at time $t$ for a policy in State $j$ at time $t$.
- For integer $t$, ${}_tV^{(j)}$ denotes the value immediately before the time $t$ premium is due to be paid, and ${}_{t^+}V^{(j)}$ denotes the value immediately after the time $t$ premium is due to be paid.
- $\ddot{a}_{60:\overline{10}|}^{00} = 6.9073 \qquad {}_{10}V^{(1)} = 49{,}334$
- $\mu_{60}^{01} = 0.014086 \qquad \mu_{60}^{02} = 0.014518 \qquad \mu_{60}^{10} = 0.003443 \qquad \mu_{60}^{12} = 0.02325$ (as printed)

(i) Show that ${}_{10}V^{(0)} = 25{,}000$ to the nearest 100. You should calculate the value to the nearest 1.

(ii) Show that ${}_{10^+}V^{(0)} = 28{,}100$ to the nearest 100. You should calculate the value to the nearest 1.

(iii) Write down the value of ${}_{10^+}V^{(1)}$.

### Explanation
**(i)**

$${}_{10}V^{(0)} = 100{,}000\,\bar{A}_{60}^{02} - 0.92G\,\ddot{a}_{60:\overline{10}|}^{00} = 25{,}023.79$$

**(ii)** There is a jump in ${}_tV^{(0)}$ when a premium is paid, from ${}_tV^{(0)}$ to

$${}_{t^+}V^{(0)} = {}_tV^{(0)} + 0.92G, \quad \text{so} \quad {}_{10^+}V^{(0)} = {}_{10}V^{(0)} + 0.92G = 28{,}094.75$$

**(iii)** There are no cash flows at time 10 in State 1, because of the premium waiver, so

$${}_{10^+}V^{(1)} = {}_{10}V^{(1)} = 49{,}334$$

### Examiner Report
1. Part (i) was done well by most candidates who attempted it.
2. Many candidates omitted (c)(ii) and (c)(iii).
3. The most common error amongst those who attempted it was to add the premium back onto the reserve in State 1 (for part (iii)) , similarly to part (ii).

## Part d (2.5 points)

(i) Show that $\displaystyle\lim_{t \to 10^+} \frac{d}{dt}\,{}_tV^{(0)} = 28$ to the nearest 1. You should calculate the value to the nearest 0.001.

(ii) Calculate ${}_{10.2}V^{(0)}$ using Euler's method with a step size of $h = 0.2$.

### Explanation
**(i)** For non-integer $t$, we have

$$\frac{d}{dt}\,{}_tV^{(0)} = \delta\,{}_tV^{(0)} - \mu_{x+t}^{01}\left({}_tV^{(1)} - {}_tV^{(0)}\right) - \mu_{x+t}^{02}\left(S - {}_tV^{(0)}\right)$$

$$
\begin{align*}
\Rightarrow \lim_{t \to 10^+} \frac{d}{dt}\,{}_tV^{(0)} &= \delta\,{}_{10^+}V^{(0)} - \mu_{60}^{01}\left({}_{10}V^{(1)} - {}_{10^+}V^{(0)}\right) - \mu_{60}^{02}\left(S - {}_{10^+}V^{(0)}\right) \\
&= (0.04879)(28{,}094.74)\text{ (as printed)} - 0.014086(49{,}334 - 28{,}094.74) - 0.014518(100{,}000 - 28{,}094.74) \\
&= 27.6498
\end{align*}
$$

**(ii)**

$${}_{10.2}V^{(0)} \approx {}_{10+}V^{(0)} + 0.2(27.6498) = 28100.3$$

### Examiner Report
1. The key idea for the second half of Question 3 is that cash flows in State 0 are continuous at all times except at premium dates. So when we apply the Euler method to move forward from time 10 to 10.2, we need to start after the jump at time 10. The limit notation in the question signals that the limit is approaching time 10 from above.
2. A common error was to include the premium in the differential equations. This is incorrect, in this case, because the premium is discretely paid, not continuously paid.. (as printed)
3. Candidates who wrote down a generic Thiele's formula, without any application to the contract in the question received no credit.
4. Many candidates omitted this part.
