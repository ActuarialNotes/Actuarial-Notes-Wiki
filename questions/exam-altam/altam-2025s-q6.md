---
id: "altam-2025s-q6"
exam: "Exam ALTAM"
topic: "Guaranteed Minimum Maturity Benefit"
learning_objective: "Embedded Options in Life Insurance and Annuity Products"
difficulty: medium
type: multi-part
year: 2025
session: Spring
wiki_link:
  - Concepts/Guaranteed+Minimum+Maturity+Benefit
  - Concepts/Black-Scholes+Model
  - Concepts/Guaranteed+Minimum+Income+Benefit
  - Concepts/Guaranteed+Minimum+Withdrawal+Benefit
  - Concepts/Equity-Linked+Insurance
points: 9
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c0896db9a39c3ce32e915ac31354527a74d36de70a20756a7a8488343c3baba4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-2025s-q6.md
---

An insurer issues 10-year Variable Annuity policies, each with a single premium of $P = 100{,}000$, to lives age 50 at issue.

After an initial expense charge of 3% of the premium, the remainder is invested in a separate account called the policyholder's fund. A management charge of $m = 2\%$ per year is deducted from the policyholder's fund continuously while the policy is in force.

The policy offers a Guaranteed Minimum Maturity Benefit (GMMB) of 100% of the premium. The insurer uses the Black-Scholes model to value the GMMB.

You are given the following valuation assumptions:

- There are no lapses or surrenders.
- Mortality follows the Standard Ultimate Mortality Model.
- The asset volatility is $\sigma = 0.20$.
- The risk-free rate is $r = 0.04$, compounded continuously.

## Part a (3 points)

Show that the value of the GMMB option at issue is $\pi(0) = 12{,}360$ to the nearest 10. You should calculate the value to the nearest 1.

### Explanation
From the formula sheet we have

$$p(0) = kPe^{-10r}\Phi\left(-d_2(0)\right) - P\xi\Phi\left(-d_1(0)\right)$$

where $k = 1$ and $\xi = 0.97e^{-10m}$

$$\Rightarrow p(0) = Pe^{-10r}\Phi\left(-d_2(0)\right) - P(0.97)e^{-10m}\Phi\left(-d_1(0)\right)$$

$$d_1(0) = \frac{\log\left(\dfrac{P(0.97)e^{-10m}}{P}\right) + \left(r + \dfrac{\sigma^2}{2}\right)(10)}{\sigma\sqrt{10}} = 0.58430$$

$$d_2(0) = d_1(0) - \sigma\sqrt{10} = -0.04816$$

$$\Rightarrow \Phi\left(-d_1(0)\right) = 0.279511 \qquad \Phi\left(-d_2(0)\right) = 0.51921$$

$$\Rightarrow p(0) = 12{,}605.5$$

$${}_{10}p_{50} = \frac{l_{60}}{l_{50}} = \frac{96{,}634.1}{98{,}576.4} = 0.9803$$

$$\pi(0) = {}_{10}p_{50}\;p(0) = 12{,}357.2$$

### Examiner Report
Examiners' General Comments:

There were some candidates who noted that they were unable to find values from a normal distribution. Per the introductory study note, candidates are expected to know how to use Excel to generate normal distribution values in addition to other distributions.

Some candidates noted they used Excel, provided an answer, but showed no work. Candidates are welcome to use Excel to aid in their calculations but are unlikely to receive full credit for a correct answer without evidence of their work. In cases where an answer is incorrect, we need to see evidence of work to award any points. For non-Excel questions, only the work shown on paper is considered for grading.

Examiners' Comments: We expected this to be a straightforward question. The Black-Scholes formula variant was given in the formula sheet with the same notation as the problem. Many candidates attempted to re-derive the variant of the formula, sometimes with mistakes, while others made mistakes with the appropriate expense levels. Some candidates used discrete discounting instead of continuous.

## Part b (3 points)

At time 6, the policyholder's fund value is $F_6 = 140{,}000$.

Calculate the value at time 6 of the GMMB, assuming no changes to the valuation assumptions.

### Explanation
At $t = 6$:

$$p(6) = Pe^{-4r}\Phi\left(-d_2(6)\right) - F_6\,e^{-4m}\Phi\left(-d_1(6)\right)$$

where

$$d_1(6) = \frac{\log\left(F_6\,e^{-4m}/P\right) + (r + \sigma^2/2)(4)}{\sigma\sqrt{4}} = 1.24118$$

$$d_2(6) = d_1(6) - \sigma\sqrt{4} = 0.84118$$

$$\Rightarrow \Phi\left(-d_1(6)\right) = 0.10727 \qquad \Phi\left(-d_2(6)\right) = 0.20012$$

$$\Rightarrow p(6) = 3190.27$$

$${}_4p_{56} = \frac{l_{60}}{l_{56}} = \frac{96{,}634.1}{97{,}651.2} = 0.98958$$

$$\pi(6) = {}_4p_{56}\,p(6) = 3157.05$$

### Examiner Report
Performance on part B was similar to part A. An additional common mistake here was candidates attempting to re-solve the benefit amount given in the problem or deducting additional expenses/discounting, not recognizing that we were looking for the value at time 6.

## Part c (1 point)

The policy also offers a Guaranteed Minimum Income Benefit (GMIB) at maturity. The GMIB is calculated using a Benefit Base, and a guaranteed annuitization rate of $\gamma = 8\%$. The GMIB Benefit Base is equal to the maximum of the initial premium $P$ accumulated at 3% per year, with a step-up guarantee every 3 years.

You are given that the policyholder's fund value at time 3 was $F_3 = 103{,}000$.

Calculate the guaranteed minimum annual income under the GMIB, based on the information available at time 6.

### Explanation
$$BB_{10} \ge \max\left(P(1.03^{10}),\ F_3,\ F_6\right) = \max(134{,}392,\ 103{,}000,\ 140{,}000)$$

$$\Rightarrow BB_{10} \ge 140{,}000$$

$\Rightarrow$ guaranteed minimum income annual benefit is

$$\gamma(140{,}000) = 0.08(140{,}000) = 11{,}200$$

### Examiner Report
The primary goal with this question was to assess different benefit amounts as the benefit base. Many candidates missed different components to consider in calculating the benefit base. The most common mistake was recognizing that the fund value at time 6, 140,000, should have been considered (and is what we were looking for). Some candidates overcomplicated this and calculated an annuity factor.

## Part d (1 point)

At time 6, the insurer offers the opportunity to exchange the policy's existing GMIB for a Guaranteed Minimum Withdrawal Benefit (GMWB). The GMWB allows lifetime withdrawals of 6% of the GMWB Benefit Base, starting at time 10.

The GMWB Benefit Base is the greater of:

- 105% of the policyholder's fund value at time 6; and
- the highest year-end value of the fund during the first 4 years after the exchange.

Calculate the minimum guaranteed withdrawal amount payable from age 60, based on the information at the time of the exchange offer.

### Explanation
$$BB_4 \ge 1.05 \times 140{,}000 = 147{,}000$$

$$\Rightarrow \text{guaranteed minimum WB} = 0.06 \times 147{,}000 = 8820$$

### Examiner Report
Many candidates made a similar mistake here as in part C - not recognizing that the time 6 fund value given in the problem, 140,000, should be used here. Some candidates attempted to forecast future values of the fund which was incorrect since we were concerned with the amount payable 'based on the information at the time of the exchange offer,' i.e. time 6.

## Part e (1 point)

Describe one advantage and one disadvantage of the GMWB compared with the GMIB, from the perspective of the policyholder.

### Explanation
Advantages:

- More flexible – can withdraw more or less than GMWB, as long as funds are available. The GMIB is a fixed annuitization.
- Continue to participate in investment returns – as long as the fund is not fully depleted. Under the GMIB all funds are converted to a fixed annuity.
- Any funds not withdrawn as GMWB can still be withdrawn on surrendering the policy, or they will pass onto the policyholder's estate on their death. Under the GMIB, as with all life annuities, the policyholder (or their heirs) has no entitlement to any of the underlying assets on death or surrender (except possibly for any additional payment guarantees under the GMIB terms).

Disadvantage

- Typically, as in this case, the minimum payment is lower under the GMWB than under a GMIB, with the same fund value at the start of the annuity.

### Examiner Report
Most commonly, candidates simply stated an advantage or disadvantage of a GMWB or GMIB, missing that we were looking for a comparison of the two. That said, candidates were typically able to determine an advantage of a GMWB over an GMIB, but many missed the primary disadvantage (GMWBs typically offer less income than GMIBs).
