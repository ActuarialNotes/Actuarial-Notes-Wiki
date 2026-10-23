---
id: "altam-2023f-q1"
exam: "Exam ALTAM"
topic: "Analysis of Surplus"
learning_objective: "Profit Analysis"
difficulty: medium
type: multi-part
year: 2023
session: Fall
wiki_link:
  - Concepts/Analysis+of+Surplus
  - Concepts/Joint+Life
  - Concepts/Endowment+Insurance
  - Concepts/Equivalence+Principle
  - Concepts/Policy+Value
points: 12
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:ed11f0ad39e26885bfed0513b2145ea1402fcca22c49fc1537525bb7b77a4c2d
  sources:
    - "SOA Exam ALTAM Fall 2023 — exam (question paper), Q1, pp.2-3, sha256:c162b6a75c9ccaedf38fcc9f7f4debf83abcf768f1e6ee6ff0d84e89e3098bc7 — https://www.soa.org/globalassets/assets/files/edu/2023/fall/exams/fall-2023-altam-exam.pdf"
    - "SOA Exam ALTAM Fall 2023 — model solutions and examiners' comments, Q1, pp.1-3, sha256:df2ab0d9bc15ea197487448a071c8d909aa27d14841c082505cbb63358a6b93b — https://www.soa.org/globalassets/assets/files/edu/2023/fall/solutions/altam-fall-2023-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-2023f-q1.md
---

XYZ Insurance issues fully discrete joint life 20-year endowment insurance policies to couples, each age 65, with independent future lifetimes. The sum insured is 100,000, payable at the end of the year of the first death, or at time 20 if both individuals survive to that time.

Premiums are payable annually while both lives survive, for a maximum of 20 years.

You are given the following assumptions for premiums and reserves:

(i) Acquisition expenses are 500 plus 20% of the first year's premium.

(ii) Renewal expenses are 5% of each subsequent premium.

(iii) Mortality follows the Standard Ultimate Mortality Model.

(iv) Gross premiums are calculated using the equivalence principle.

(v) $i = 0.05$

(vi) Reserves are gross premium policy values.

## Part a (1 point)

Calculate ${}_{20}E_{65:65}$.

### Explanation

$$
{}_{20}E_{65:65} = \left({}_{20}E_{65}\right)^2(1.05)^{20} = (0.24381)^2(1.05)^{20} = 0.157727
$$

or

$$
{}_{20}E_{65:65} = \left({}_{20}p_{65}\right)^2(1.05)^{-20} = 0.157727
$$

$$
{}_{20}p_{65} = \frac{61{,}184.9}{94{,}579.7} = 0.64691
$$

### Examiner Report
Overall, this question was done very well, especially for parts (a), (b), and (c). For parts (b) and (c), the most common mistakes were related to incorrectly handling expenses and miscalculating the endowment EPV. Many candidates did confuse the notation for the endowment EPV with that of a term insurance, though this was not penalized if the calculations were done correctly.

## Part b (2 points)

Show that the gross premium for the policy is 4,750 to the nearest 10. You should calculate the value to the nearest 1.

### Explanation

$$
A_{65:65:\overline{20}|} = A_{65:65} - {}_{20}E_{65:65}\,A_{85:85} + {}_{20}E_{65:65} = 0.480488
$$

$$
\ddot{a}_{65:65:\overline{20}|} = \ddot{a}_{65:65} - {}_{20}E_{65:65}\,\ddot{a}_{85:85} = 10.9098
$$

or

$$
\ddot{a}_{65:65:\overline{20}|} = \frac{1 - A_{65:65:\overline{20}|}}{d} = 10.9098
$$

$$
P = \frac{100{,}000(0.480488) + 500}{0.95(10.9098) - 0.15} = 4753.04
$$

$A_{65:65} = 0.44366$ $\quad A_{85:85} = 0.77652$ $\quad \ddot{a}_{65:65} = 11.6831$ $\quad \ddot{a}_{85:85} = 4.903$

## Part c (1 point)

Show that the gross premium policy value at time 10 is 38,250 to the nearest 10. You should calculate the value to nearest 1.

### Explanation

$$
A_{75:75:\overline{10}|} = 1 - d\,\ddot{a}_{75:75:\overline{10}|} = 0.683032
$$

$$
{}_{10}V = 100{,}000\,A_{75:75:\overline{10}|} - 0.95P\,\ddot{a}_{75:75:\overline{10}|} = 38{,}247.28
$$

$\ddot{a}_{75:75} = 6.6563$ $\quad d = 0.0476$

## Part d (2 points)

At time 10, XYZ Insurance had 100 identical and independent policies in force. During the 11th policy year, the actual experience was as follows:

(i) The interest rate earned was 5.5%.

(ii) Renewal expenses were 5% of the premium.

(iii) There were 4 claims.

(iv) Each claim had a termination expense of 100.

You are given that the gross premium policy value at time 11 is 42,811.92.

Calculate the total gain in the 11th policy year for the portfolio.

### Explanation
The gain is

$$
\begin{align*}
&100\left(38{,}247.28 + 0.95(4{,}753.04)\right)(1.055) - 4(100{,}100) - 96(42{,}811.92) \\
&= 1{,}117.12
\end{align*}
$$

### Examiner Report
Parts (d) and (e) were generally done well, with common mistakes including incorrectly calculating the mortality rate, and calculating the gain / loss for a single policy rather than for the portfolio.

## Part e (4 points)

Calculate the gain by source in the 11th policy year, in the order of (1) Interest, (2) Mortality, and (3) Expenses.

### Explanation
The probability that at least one of the lives dies in the 11th year is

$$
q_{75:75} = 1 - p_{75:75} = 1 - (0.981567)^2 = 0.036526
$$

The interest gain is Profit using actual interest, expected mortality and expected expenses – Profit using expected interest, mortality and expenses, i.e.

$$
\begin{align*}
&100\left(38{,}247.28 + 0.95(4{,}753.04)\right)(1.055) - 100q_{75:75}(100{,}000) - 100p_{75:75}(42{,}811.92) \\
&\quad - \Big(100\left(38{,}247.28 + 0.95(4{,}753.04)\right)(1.05) - 100q_{75:75}(100{,}000) - 100p_{75:75}(42{,}811.92)\Big) \\
&= 100\left(38{,}247.28 + 0.95(4{,}753.04)\right)(0.005) \\
&= 21{,}381.33
\end{align*}
$$

The mortality gain is Profit using actual interest, actual mortality and expected expenses – Profit using actual interest, expected mortality and expected expenses, i.e.

$$
\begin{align*}
&100\left(38{,}247.28 + 0.95(4{,}753.04)\right)(1.055) - 4(100{,}000) - 96(42{,}811.92) \\
&\quad - \Big(100\left(38{,}247.28 + 0.95(4{,}753.04)\right)(1.055) - 100q_{75:75}(100{,}000) - 100p_{75:75}(42{,}811.92)\Big) \\
&= \left(100q_{75:75} - 4\right)(100{,}000 - 42{,}811.92) \\
&= -19{,}864.11
\end{align*}
$$

The expense gain is Profit using actual interest, actual mortality and actual expenses – Profit using actual interest, actual mortality and expected expenses, i.e.

$$
\begin{align*}
&100\left(38{,}247.28 + 0.95(4{,}753.04)\right)(1.055) - 4(100{,}100) - 96(42{,}811.92) \\
&\quad - \Big(100\left(38{,}247.28 + 0.95(4{,}753.04)\right)(1.055) - 4(100{,}000) - 96(42{,}811.92)\Big) \\
&= -400.00
\end{align*}
$$

So we have an interest gain of 21,381, a mortality loss of 19,864 and an expense loss of 400, giving a total of $21{,}381 - 19{,}864 - 400 = 1{,}117$ as required.

## Part f (2 points)

At time 19, there were 40 policies remaining in force. During the 20th policy year, a pandemic occurred, such that the actual experience was:

- The interest rate earned was 5.0%.
- Renewal expenses were 5% of the premium.
- There were 35 claims.
- There were no termination expenses.

(i) Show that the total gain in the 20th policy year for the portfolio is zero.

(ii) Explain why there is no mortality loss despite the pandemic.

### Explanation
**(i)**

$$
\begin{align*}
\text{Profit}_{20} &= 40\left(({}_{19}V + 0.95P)(1.05)\right) - 35(100{,}000) - 5(100{,}000) \\
&= 40\left(({}_{19}V + 0.95P)(1.05) - 100{,}000\right)
\end{align*}
$$

$$
{}_{19}V = 100{,}000v - 0.95P
$$

$$
\Rightarrow \text{Profit}_{20} = 40\left(100{,}000v(1.05) - 100{,}000\right) = 0
$$

**(ii)** A major pandemic would have no impact on the mortality gain/loss in the final year, since the benefit of 100,000 is paid at the year end regardless of the survival or death of the policyholders (as endowment if both partners survive, as death claim if they do not).

### Examiner Report
For part (f), some candidates calculated the total gain directly, while others calculated the gain by source and then combined them; both approaches were correct. Most candidates were able to identify that the endowment policy being in its final year resulted in no mortality loss.
