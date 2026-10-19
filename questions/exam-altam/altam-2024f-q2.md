---
id: "altam-2024f-q2"
exam: "Exam ALTAM"
topic: "Multiple Decrement Model"
learning_objective: "Survival Models for Contingent Cash Flows"
difficulty: medium
type: multi-part
year: 2024
session: Fall
wiki_link:
  - Concepts/Multiple+Decrement+Model
  - Concepts/Critical+Illness+Insurance
  - Concepts/Probability
  - Concepts/Fractional+Age+Assumption
points: 8
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5ebea87d580132eaf5a0fdd03a4d0a2eb9247ee99a45a410ce41e10f9c41d6fb
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-2024f-q2.md
---

A life age 60 purchases a 5-year critical illness policy which pays 100,000 at the end of the year of death or of diagnosis of a critical illness, whichever occurs first. There is no benefit on lapse.

The insurer uses the following multiple decrement table, where decrement (1) represents deaths, decrement (2) represents critical illness (CI) diagnoses, and decrement (3) represents lapses.

| $x$ | $l_x^{(\tau)}$ | $d_x^{(1)}$ | $d_x^{(2)}$ | $d_x^{(3)}$ |
|---|---|---|---|---|
| 60 | 10,000 | 50 | 105 | 400 |
| 61 | 9,445 | 52 | 115 | 500 |
| 62 | 8,778 | 53 | 125 | 600 |
| 63 | 8,000 | 54 | 140 | 500 |
| 64 | 7,306 | 55 | 152 | 0 |

## Part a (2 points)

(i) Calculate the probability that the policy generates a claim.

(ii) Given that the policy generates a claim, calculate the probability that the triggering event was a CI diagnosis.

### Explanation
**(i)**

$$\text{Prob. of a claim} = \frac{d_{40}^{(1)} + \dots + d_{44}^{(1)} + d_{40}^{(2)} + \dots + d_{44}^{(2)}}{l_{40}} = \frac{264 + 637}{100{,}000} = 0.0901$$

**(ii)**

$$\text{Prob. claim is from CI} = \frac{637}{901} = 0.707$$

### Examiner Report
Most candidates did well on part A. Those who didn't either mistakenly used just a single age or used the surviving lives at each age as the denominator rather than the beginning lives.

## Part b (3 points)

Assume that the respective forces of decrement for deaths and critical illness diagnoses are constant within each year of age, and assume that all lapses occur at the year end.

(i) Show that the independent rate of decrement for lapses at age 60 is 0.041 to the nearest 0.001. You should calculate the value to the nearest 0.0001.

(ii) Calculate the independent rate of decrement for deaths at age 60.

(iii) Calculate the independent rate of decrement for CI diagnoses at age 60.

### Explanation
**(i)** The independent rate of lapse at the year-end is

$$q_{60}^{*(3)} = \frac{d_{60}^{(3)}}{l_{60} - d_{60}^{(1)} - d_{60}^{(2)}} = \frac{400}{10{,}000 - 50 - 105} = \frac{400}{9845} = 0.04063$$

**(ii)** The Multiple Decrement Table from age 60 to just before age 61 is

| $x$ | $l_x$ | $d_x^{(1)}$ | $d_x^{(2)}$ |
|---|---|---|---|
| 60 | 10,000 | 50 | 105 |
| $61^-$ | 9,845 | | |

With constant forces for decrements (1) and (2) we have independent survival probabilities:

$$p_{60}^{*(1)} = \left(p_{60}^{00}\right)^{p_{60}^{01}/p_{60}^{0\bullet}} = \left(p_{60}^{00}\right)^{d_{60}^{(1)}/\left(d_{60}^{(1)} + d_{60}^{(2)}\right)} = (0.9845)^{50/155} = 0.994974$$

$$\Rightarrow q_{60}^{*(1)} = 0.005026$$

**(iii)** Similarly

$$p_{60}^{*(2)} = (0.9845)^{105/155} = 0.989474 \Rightarrow q_{60}^{*(2)} = 0.010526$$

### Examiner Report
There were a few common mistakes on part B. Some candidates mistakenly included lapses as a constant force of decrement instead of occurring at the year end. Others incorrectly assumed a uniform distribution.

## Part c (3 points)

The insurer decides to restrict the definition of critical illnesses covered by the policy for new policyholders, such that the new independent rates of decrement for CI diagnoses will be 50% of the current rates. At the same time, the insurer reduces the independent lapse rate assumption to 60% of current rates. Assume that the independent mortality rates are not affected. All other assumptions are as in (b).

(i) Calculate the revised value of $d_{60}^{(3)}$.

(ii) Explain in words why the revised value of $d_{60}^{(1)}$ will be greater than the original value.

### Explanation
**(i)** Again, first consider exits up to just before the year-end lapses.

$$p_{60}^{00} = p_{60}^{*(1)}\,p_{60}^{*(2)} = (0.994974)\left(1 - 0.5(0.010526)\right) = 0.989737$$

$$\Rightarrow l_{61^-} = 10{,}000(0.989737) = 9{,}897.37$$

$$\Rightarrow d_{60}^{(3)} = 0.6(0.04063)(9897.37) = 241.3$$

**(ii)** Fewer lives will exit through CI diagnosis, leaving more lives exposed to the risk of death. Hence $d_{60}^{(1)}$ will increase.

### Examiner Report
On part (i), the most common mistake was changing the force of mortality rather than the q's directly themselves. Candidates lost points in part (ii) for asserting that the reduction in the lapse rate impacted $d_{60}^{(1)}$; it doesn't since lapses occur at the end of the year.
