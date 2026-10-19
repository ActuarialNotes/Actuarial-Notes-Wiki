---
id: "altam-036"
exam: "Exam ALTAM"
topic: "Profit Testing"
learning_objective: "Profit Analysis"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Profit+Testing
  - Concepts/Profit+Margin
  - Concepts/Net+Present+Value
  - Concepts/Deferred+Annuity
  - Concepts/Life+Table
  - Concepts/Long-Term+Care+Insurance
points: 10
---

An insurer offers "immediate needs annuities" (INAs) to lives age 80 or older who are moving permanently into long term care facilities (LTCFs). The annuity may be purchased as a single premium annuity-due, or as a single premium deferred annuity-due, with a 2-year deferral period. The annuity payments are paid directly to the care home to cover the resident's costs.

(This is Question 6 from the Spring 2022 Written Answer exam.)
(Part (a) and (d) are covered by the FAM-L exam.)

## Part a (2 points)

You are given the following excerpt from a select and ultimate mortality table used to price the INA. The selection age is the age at which the life moves into an LTCF. The selection period is 1 year.

| $[x]$ | $l_{[x]}$ | $l_{x+1}$ | $x+1$ |
|---|---|---|---|
| 94 | 1200 | 700 | 95 |
| 95 | 1000 | 550 | 96 |
| 96 | 750 | 385 | 97 |
| 97 | 450 | 195 | 98 |
| 98 | 220 | 50 | 99 |
| 99 | 75 | 0 | 100 |

(i) Calculate the 1-year mortality probability for (95) assuming that she moved into an LTCF at age 95.

(ii) Calculate the 1-year mortality probability for (95) assuming that she moved into an LTCF at age 94.

(iii) Describe how the selection effect in this model differs from that of typical select and ultimate tables used for pricing life insurance.

### Explanation
(i)

$${}_1q_{[95]} = 1 - \frac{l_{96}}{l_{[95]}} = 0.45$$

(ii)

$${}_1q_{95} = 1 - \frac{l_{96}}{l_{95}} = 0.2143$$

(iii) Typical select tables used for life insurance pricing assume lighter mortality during the select period, as the underwriting process selects lives that are healthier than average at inception. In this table, the mortality during the select period is heavier than ultimate mortality.

### Examiner Report
*Graders' Comments:* Candidates generally did well on part A. We awarded partial credit for candidates calculating the probability of survival, not death. On part iii we were looking for commentary on the $q_x$s themselves, and not necessarily the structure of the table (since select and ultimate tables come in many varieties).

## Part b (4 points)

You are given the following additional information for a profit test of an annuity-due contract issued to a 95-year old who is just moving into an LTCF.

- For a single premium of 110,000 the annuity payment is 50,000 at the start of each year including the first, conditional on survival.
- Pre-contract expenses are 300.
- Expenses of 100 are incurred with each annuity payment. There are no other expenses.
- Reserves for the first two years are: ${}_0V = 0$; ${}_1V = 105{,}000$; ${}_2V = 80{,}000$
- The insurer earns 7% per year.
- The hurdle rate is 12% per year.

You are also given the following partially completed profit test table, which is missing the entries for the first two policy years:

| $t$ | ${}_{t-1}V$ | Premium | Annuity | Expenses | Interest | Expected End-year reserve | $\Pr_t$ |
|---|---|---|---|---|---|---|---|
| 0 | | | | -- | | | -- |
| 1 | -- | -- | -- | -- | -- | -- | -- |
| 2 | -- | -- | -- | -- | -- | -- | -- |
| 3 | 80,000 | 0 | 50,000 | 100 | 2,093 | 31,656 | 337 |
| 4 | 62,500 | 0 | 50,000 | 100 | 868 | 12,846 | 422 |
| 5 | 50,100 | 0 | 50,000 | 100 | 0 | 0 | 0 |

(i) Determine the missing entries for the first three rows of the table (missing entries are indicated by --).

(ii) Show that the net present value of the contract, is 6,710 to the nearest 10. You should calculate the value to the nearest 1.

(iii) Show that the profit margin is 6.1% to the nearest 1%. You should calculate the profit margin to the nearest 0.001%.

### Explanation
(i)

| $t$ | ${}_{t-1}V$ | Prem | Annuity | Exp | Int | $E_tV$ | $\Pr_t$ |
|---|---|---|---|---|---|---|---|
| 0 | | | | 300 | | | –300 |
| 1 | 0 | 110,000 | 50,000 | 100 | 4,193 | 57,750 | 6,343 |
| 2 | 105,000 | -- | 50,000 | 100 | 3,843 | 56,000 | 2,743 |

$$E_1V = p_{[95]} \times 105{,}000 = 57{,}750; \qquad E_2V = p_{96} \times 80{,}000 = 56{,}000$$

(ii)

$$\Pi_0 = Pr_0 = -300; \quad \Pi_1 = Pr_1 = 6{,}343; \quad \Pi_2 = p_{[95]}\,Pr_2 = 1{,}509;$$

$$\Pi_3 = {}_2p_{[95]}\,Pr_3 = 130; \quad \Pi_4 = {}_3p_{[95]}\,Pr_4 = 82$$

where

$$p_{[95]} = \frac{550}{1000}, \quad {}_2p_{[95]} = \frac{385}{1000}, \quad \text{and} \quad {}_3p_{[95]} = \frac{195}{1000}$$

$$
\begin{align*}
NPV(1) &= NPV(0) + \Pi_1\,v_{12\%} \\
       &= 5{,}363; \\
NPV(2) &= NPV(1) + \Pi_2\,v^2_{12\%} \\
       &= 6{,}566; \\
NPV(3) &= NPV(2) + \Pi_3\,v^3_{12\%} \\
       &= 6{,}659; \\
NPV(4) &= NPV(3) + \Pi_4\,v^4_{12\%} \\
       &= 6{,}711
\end{align*}
$$

(iii) The profit margin is 6,711/110,000 = 0.0610

### Examiner Report
*Graders' Comments:* Candidates also generally did well here.

## Part c (3 points)

The deferred annuity contract is identical to the annuity-due contract, but with no payment in the first two years, and with a lower single premium payable at issue. The time 1 reserve for the deferred annuity contract is ${}_1V = 54{,}900$. All other reserves and expenses are identical to the annuity-due contract.

Calculate the premium required under the deferred annuity contract that generates the same profit margin as the annuity-due.

### Explanation
We now have

| $t$ | ${}_{t-1}V$ | Prem | Annuity | Exp | Int | $E_tV$ | $\Pr_t$ |
|---|---|---|---|---|---|---|---|
| 1 | 0 | $P$ | -- | -- | $0.07P$ | 30,195 | $1.07P - 30{,}195$ |
| 2 | 54,900 | -- | -- | -- | 3,843 | 56,000 | 2,743 |

All the $\Pi_t$ values are the same as in (a), except for the first year:

$$\Pi_1 = Pr_1 = 1.07P - 30{,}195$$

$$NPV = 0.061P = 6711 - 6343\,v_{12\%} + (1.07P - 30{,}195)\,v_{12\%}$$

$$\Rightarrow P = 28{,}973$$

### Examiner Report
*Graders' Comments:* Many candidates did not attempt this question. For those who did, some incorrectly attempted to use recursion to calculate a new premium based on then new reserve, which doesn't work in part because of the constraint to maintain the same profit margin.

## Part d (1 point)

The insurer offers the deferred annuity at a single premium of 28,500. Describe one advantage and one disadvantage of the deferred annuity, compared with the annuity-due, from the perspective of the purchaser of the annuity.

### Explanation
Disadvantages:

Under the deferred annuity, the policyholder would pay 78,973 (annuity plus premium) in the first year, 50,000 in the second year, conditional on survival, and nothing thereafter. The total cost for a survivor, is 128,973. Under the annuity-due, the total cost is 110,000. So, for a 1-year survivor, even allowing for interest, the deferred annuity is more expensive.

If death occurs in the first two years, the annuitant and/or beneficiaries will receive nothing, losing the single premium.

Advantages:

An advantage of the deferred annuity is that it is less costly for lives who die in the first year, whose outlay is 78,973 compared with 110,000 for the annuity-due, thereby leaving more available for bequest under the SPDA, in the event of early death.
