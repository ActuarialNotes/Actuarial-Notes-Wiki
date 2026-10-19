---
id: "altam-004"
exam: "Exam ALTAM"
topic: "Multiple State Model"
learning_objective: "Premium and Policy Valuation for Long-Term State-Dependent Coverages"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Multiple+State+Model
  - Concepts/Policy+Value
  - Concepts/Transition+Intensity
  - Concepts/State-Dependent+Insurance
  - Concepts/Mortality
points: 10
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:84713683c9f800735f21a90a1fa82112c583a878979f847971884380fb8f503d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-004.md
---

A life insurer issues a 5-year term insurance, with premiums payable half-yearly, to a person who is age 60. The death benefit of 100,000 is paid at the end of the half-year of death.

You are given:

(i) Expenses are 10% of each semi-annual premium.

(ii) $i = 0.05$

(iii) Mortality follows the Standard Ultimate Life Table; the force of mortality of the Standard Ultimate Life Table is:

$$\mu_{x+t} = A + Bc^{x+t}, \text{ where } A = 2.2\times 10^{-4},\ B = 2.7\times 10^{-6},\ c = 1.124$$

(iv) The gross premium is 270 per half-year.

## Part a (3 points)

(i) Show that $100{,}000\ {}_{0.5}q_{64} = 260$ to the nearest 10. You should calculate the value to the nearest 1.

(ii) Show that the gross premium policy value at time 4 is 30 to the nearest 10. You should calculate the policy value to the nearest 0.1.

### Explanation
(i)

$${}_tp_x = \exp\left(-At - \frac{B}{\log c}\,c^x\left(c^t - 1\right)\right) \text{ from formula sheet.}$$

$$\Rightarrow {}_{0.5}p_{64} = e^{-0.00257678} = 0.9974265$$

$$\Rightarrow {}_{0.5}q_{64} = 0.0025735 \Rightarrow 100{,}000\ {}_{0.5}q_{64} = 257.35$$

(ii)

$$\begin{align*}
{}_4V &= \text{EPV(Benefit)} - \text{EPV(Premiums)} \\
&= 100{,}000\left({}_{0.5}q_{64}\,v^{0.5} + {}_{0.5|0.5}q_{64}\,v\right) - 0.9(270)\left(1 + {}_{0.5}p_{64}\,v^{0.5}\right)
\end{align*}$$

where

$${}_{0.5|0.5}q_{64} = q_{64} - {}_{0.5}q_{64} = 0.005288 - 0.0025735 = 0.0027145$$

$$\Rightarrow {}_4V = 100{,}000\left(0.0025115 + 0.0025852\right) - 243\left(1.9733886\right) = 30.14$$

Alternatively, by recursion

$$\left({}_{4.5}V + 0.9P\right)(1.05)^{0.5} = 100{,}000\ {}_{0.5}q_{64.5} + {}_{0.5}p_{64.5}\ {}_5V$$

$$\Rightarrow {}_{4.5}V = 272.15v^{-0.5} - 0.9(270) = 22.5912$$

$$\left({}_4V + 0.9P\right)(1.05)^{0.5} = 100{,}000\ {}_{0.5}q_{64} + {}_{0.5}p_{64}\ {}_{4.5}V$$

$$\Rightarrow {}_4V = 30.14$$

### Examiner Report
Graders' Comments: Most candidates knew to use either EPV or recursive formula to compute the reserve. Common errors made by candidates include:

- Not properly handling the semi-annual premiums;
- Approximating semi-annual annuity using annual annuity; and
- Assuming uniform distribution of deaths or constant force of mortality.

## Part b (2 points)

In the final year of the policy, the insurer decides to re-evaluate the gross premium policy value due to a virus that is spreading through the community. The insurer uses the following multiple state model.

![State diagram: Healthy (0), At Risk (1), Sick (2) and Dead (3); arrows run 0 to 1, 1 to 2, 0 to 3 and 2 to 3, and a double-headed arrow joins 0 and 2.](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/altam-004-state-diagram.png)

A Healthy person will move to State 1, At Risk, if exposed to the virus. Every person moving into the At Risk state will be tested for the virus. If the result of the test is positive, the person moves to State 2, Sick; otherwise, the person will move back to the Healthy state.

The transition intensities for all $x$ are:

$$\mu_x^{01} = 0.06$$

$\mu_x^{03}$ is the force of mortality of the Standard Ultimate Life Table, as in (iii) above.

$$\mu_x^{10} = 20.0; \quad \mu_x^{12} = 80.0$$

$$\mu_x^{20} = 4.0; \quad \mu_x^{23} = 5\mu_x^{03}$$

You are also given that the insured is Healthy at time 4, and that premiums are payable conditional on being in State 0, 1, or 2.

Calculate the probability that the insured will remain in the Healthy state throughout the final year of the policy, ${}_1p_{64}^{\overline{00}}$.

### Explanation
$${}_1p_{64}^{\overline{00}} = \exp\left\{-\int_0^1 \mu_{64+t}^{01} + \mu_{64+t}^{03}\,dt\right\} = e^{-0.06} \times p_{64}^{SULT} = 0.9367845$$

## Part c (3 points)

The insurer re-evaluates the gross premium policy value at time 4 using the model above, with the same interest rate and expense assumptions as in part (a).

You are given the following probabilities:

| $x$ | ${}_{0.5}p_x^{00}$ | ${}_{0.5}p_x^{01}$ | ${}_{0.5}p_x^{02}$ | ${}_{0.5}p_x^{03}$ | ${}_{0.5}p_x^{13}$ | ${}_{0.5}p_x^{23}$ |
|---|---|---|---|---|---|---|
| 64.0 | 0.98661 | 0.00059 | 0.01016 | 0.00264 | 0.00605 | 0.00700 |
| 64.5 | 0.98646 | 0.00059 | 0.01016 | 0.00279 | 0.00640 | 0.00740 |

Calculate the revised gross premium policy value for the insured's policy at time 4.

### Explanation
$${}_4V^{(0)} = 100{,}000\left({}_{0.5}p_{64}^{03}\,v^{0.5} + \left(p_{64}^{03} - {}_{0.5}p_{64}^{03}\right)v\right) - 0.9(270)\left(1 + \left(1 - {}_{0.5}p_{64}^{03}\right)v^{0.5}\right)$$

$${}_{0.5}p_{64}^{03} = 1 - 0.00264 = 0.99736$$

So

$${}_4V^{(0)} = 100{,}000\left(0.002576 + 0.002697\right) - 243\left(1.97332\right) = 47.80$$

### Examiner Report
Graders' Comments: Candidates generally earned some credit. Typical mistakes included:

- Did not consider all possible transitions when calculating the probability for the year-end benefit;
- Did not realize premium is paid in State 0, 1, and 2 or improperly calculated the EPV; and
- Did not consider state dependent reserves when using the recursive formula in a multiple state model.

## Part d (2 points)

Calculate the expected time, in days, of each sojourn in the At Risk state.

(LTAM, Spring 2021, Question 1)

(Part (a) is covered by the FAM-L exam.)

### Explanation
The expected time of each sojourn in "At risk", in years, is

$$\int_0^\infty {}_tp_x^{\overline{11}}\,dt = \int_0^\infty e^{-t\left(\mu^{10} + \mu^{12}\right)}\,dt = \int_0^\infty e^{-100t}\,dt = \frac{1}{100} \text{ years} = 3.65 \text{ days}$$

### Examiner Report
Graders' Comments: Many candidates skipped this part.
