---
id: "altam-2023s-q3"
exam: "Exam ALTAM"
topic: "Universal Life Insurance"
learning_objective: "Universal Life Insurance"
difficulty: medium
type: multi-part
year: 2023
session: Spring
wiki_link:
  - Concepts/Universal+Life+Insurance
  - Concepts/Profit+Testing
  - Concepts/Profit+Vector
  - Concepts/Profit+Signature
  - Concepts/Reserve
points: 10
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:932d8e5e56d2c87ea34ae5eca767b274ea71532b205f98474f82aa9d32a11a05
  sources:
    - "SOA Exam ALTAM Spring 2023 — exam (question paper), Q3, pp.6-7, sha256:22d9ab9530cb311d979dada69c2af9c6f87cba7fd854e2da29793aa3d2715095 — https://www.soa.org/globalassets/assets/files/edu/2023/spring/exams/spring-2023-exam-altam.pdf"
    - "SOA Exam ALTAM Spring 2023 — model solutions and examiners' comments, Q3, pp.6-8, sha256:7808fbbb76bc8d54d394976603e8123a3fdb44a6020cfd126cc95f3c6814b512 — https://www.soa.org/globalassets/assets/files/edu/2023/spring/solutions/spring-2023-solutions-altam.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-2023s-q3.md
---

You are conducting a profit test of a Type A universal life insurance policy with a face amount of 150,000 issued to (40).

You are given the following information used to project the policy account values, assuming the policy remains in force.

| Policy year $k$ | Annual premium | Percent of premium charge | Annual expense charge | COI rate per 1000 of insurance | Annual interest rate for discounting the COI | Annual credited interest rate | Corridor factor |
|---|---|---|---|---|---|---|---|
| ⁝ | ⁝ | ⁝ | ⁝ | ⁝ | ⁝ | ⁝ | ⁝ |
| 9 | 7,000 | 6% | 55 | 2.0 | 5% | 6% | 1.97 |
| 10 | 7,000 | 6% | 55 | 2.2 | 5% | 6% | 1.91 |

You are also given that the projected account value at the end of year 8 is 62,000.

## Part a (4 points)

(i) Show that the projected account value at the end of year 9 is 72,480 to the nearest 10. You should calculate the value to the nearest 1.

(ii) Show that the projected account value at the end of year 10 is 83,580 to the nearest 10. You should calculate the value to the nearest 1.

### Explanation
**(i)**

$$
AV_9 = \left(AV_8 + P(0.94) - 55 - (COI)_9\right)(1.06)
$$

where $AV_8 = 62{,}000$; $P = 7000$; $F = 150000$

$$
(COI)_9 = \max\left(0.002\left(F - AV_9\right)v_{5\%},\ 0.002(0.97)AV_9\,v_{5\%}\right)
$$

Assume (first) that $F - AV_9 > 0.97AV_9$ (i.e. CF does not apply)

$$
\Rightarrow (COI)_9 = 0.002\left(F - AV_9\right)v_{5\%}
$$

$$
\begin{align*}
\Rightarrow AV_9 &= \left(62000 + 7000(0.94) - 55 - \left(0.002\left(F - AV_9\right)v_{5\%}\right)\right)(1.06) \\
&= \frac{72636 - 0.002\,v_{5\%}(150{,}000)}{1 - 0.002\,v_{5\%}(1.06)} \text{ (as printed)} \\
&= \frac{72333}{0.99798} \\
&= 72480
\end{align*}
$$

Check CF condition: $F - AV_9 = 77521$; $0.97AV_9 = 70305$

$\Rightarrow$ CF does not apply, as assumed.

**(ii)**

$$
AV_{10} = \left(AV_9 + P(0.94) - 55 - (COI)_{10}\right)(1.06)
$$

where $AV_9 = 72480$;

$$
(COI)_{10} = \max\left(0.0022\left(F - AV_{10}\right)v_{5\%},\ 0.0022(0.97)AV_{10}\,v_{5\%}\right) \text{ (as printed)}
$$

Assume (first) that $F - AV_{10} > 0.91AV_{10}$,

$$
\Rightarrow (COI)_{10} = 0.0022\left(F - AV_{10}\right)v_{5\%}
$$

$$
\begin{align*}
\Rightarrow AV_{10} &= \left(72480 + 7000(0.94) - 55 - \left(0.0022\left(F - AV_{10}\right)v_{5\%}\right)\right)(1.06) \\
&= \frac{83745 - 0.0022\,v_{5\%}(150{,}000)(1.06)}{1 - 0.0022\,v_{5\%}(1.06)} \\
&= \frac{83412}{0.99778} \\
&= 83598
\end{align*}
$$

Check CF condition: $F - AV_{10} = 66402 < 0.91AV_{10} = 76074 \Rightarrow$ CF does apply.

Redo the calculation with

$$
\Rightarrow (COI)_{10} = 0.0022(0.91)AV_{10}\,v_{5\%}
$$

$$
\begin{align*}
\Rightarrow AV_{10} &= \left(72480 + 7000(0.94) - 55 - \left(0.0022(0.91)AV_{10}\,v_{5\%}\right)\right)(1.06) \\
&= \frac{83745}{1 + (0.91)0.0022\,v_{5\%}(1.06)} \\
&= 83576
\end{align*}
$$

### Examiner Report
Many candidates earned full credit. For those who did not, the most common error was failing to verify whether the corridor factor applied in each case.

## Part b (1 point)

You are given the following profit test assumptions.

(i) The interest earned on all insurer's funds is 7.5% per year.

(ii) At the end of each of the first 9 policy years, 2% of the in-force policyholders surrender.

(iii) At the end of policy year 10, 15% of the in-force policyholders surrender.

(iv) The surrender charge for policy year 10 is 1,500.

(v) Mortality experience follows the Standard Ultimate Life Table.

(vi) Commission expenses are 5% of premiums.

(vii) Other incurred expenses are 45 at the start of each year, 100 on surrender, and 250 at the end of the year of death.

(viii) There are no reserves held other than the account value.

Show that the expected cost of death benefit plus associated expenses payable at the end of year 10, given that the policy is in force at the start of the year, is 176 to the nearest 1. You should calculate the value to the nearest 0.1.

### Explanation
The death benefit at the end of year 10 is $1.91AV_{10}$

The associated death expense is 250.

The probability of death for year 10 is $q_{49} = 0.0011$

$$
\Rightarrow \text{EDB}_{10} = \left(1.91AV_{10} + 250\right)q_{49} = 175.9
$$

### Examiner Report
(b) (c) Generally done well. The most common error involved using $q_{50}$ instead of $q_{49}$.

## Part c (3 points)

Show that the expected surplus emerging at the end of year 10, given that the policy is in force at the start of the year, is 1,570 to the nearest 10. You should calculate the value to the nearest 1.

### Explanation

$$
\text{Pr}_{10} = AV_9 + P - E_{10} + I_{10} - EDB_{10} - ESV_{10} - EAV_{10}
$$

$$
ESV_{10} = (1 - q_{49})(0.15)(AV_{10} - 1500 + 100) = 12{,}313
$$

$$
EAV_{10} = (1 - q_{49})(0.85)AV_{10} = 70{,}961
$$

$$
\begin{align*}
\text{Pr}_{10} &= \left(72{,}480 + 7000(0.95) - 45\right)(1.075) - 176 - 12313 - 70961 \\
&= 1566
\end{align*}
$$

### Examiner Report
(b) (c) Generally done well. The most common error involved using $q_{50}$ instead of $q_{49}$.

## Part d (1 point)

Calculate the expected surplus emerging at the end of year 10, per policy issued, $\Pi_{10}$.

### Explanation

$$
\Pi_{10} = {}_9p_{40}^{(\tau)}\,\text{Pr}_{10} = {}_9p_{40}\,(1 - 0.02)^9(1566) = 1297
$$

### Examiner Report
Generally done well.

## Part e (1 point)

Describe two reasons why the insurer might hold reserves higher than the account value.

### Explanation
1. The insurer may be required by regulations to hold more reserves.
2. The insurer may hold more reserves for no lapse guarantees.
3. The insurer may need to reserve for the potential additional costs arising from guaranteed maximum mortality or expense rates or guaranteed minimum credited interest rate.
4. The insurer may choose to hold additional reserves to allow for adverse experience, even if mortality, interest, or expense rates are changeable, to avoid having to change rates which could adversely impact policyholder behavior.

### Examiner Report
Only two reasons were required, but the answers needed to be relevant, reasonable and coherent for full credit.

Only the strongest candidates achieved full credit here, with most earning half credit for giving one correct reason.
