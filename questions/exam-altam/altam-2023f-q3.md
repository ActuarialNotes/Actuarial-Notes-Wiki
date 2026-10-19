---
id: "altam-2023f-q3"
exam: "Exam ALTAM"
topic: "Profit Testing"
learning_objective: "Embedded Options in Life Insurance and Annuity Products"
difficulty: hard
type: multi-part
year: 2023
session: Fall
wiki_link:
  - Concepts/Profit+Testing
  - Concepts/Profit+Vector
  - Concepts/Profit+Signature
  - Concepts/Equity-Linked+Insurance
  - Concepts/Guaranteed+Minimum+Maturity+Benefit
  - Concepts/Hedging
points: 9
---

An insurer sells a 3-year single premium Variable Annuity contract, with the following provisions:

(i) The policyholder deposits the 10,000 premium at the start of the contract.

(ii) The insurer deducts a 2% front-end charge from the premium before allocating the remainder to the policyholder fund.

(iii) At the start of each year after the first, the insurer deducts a management charge of 1% of the fund value.

(iv) The death benefit under the contract is 110% of the fund value at the end of the year of death, payable at that time.

(v) If the policyholder surrenders during the first year, they receive 85% of their fund value at the end of the year. In subsequent years, the policyholder receives the full fund value at the end of the year of surrender.

(vi) The contract has a Guaranteed Minimum Maturity Benefit (GMMB) rider, which is 100% of the premium.

An actuary conducts a stress test of this contract using the following assumptions:

- Initial expenses are 200 at contract inception.
- Renewal expenses are 0.6% of the policyholder's fund value (before management charge deductions) incurred at the start of the second and third policy years.
- Mortality rates are 0.05 each year.
- At the end of the first and second years, 10% of the surviving policyholders surrender their policies.
- The policyholder's fund earns 0% in the first year, 0% in the second year, and 5% in the third year.
- The insurer's funds earn 3% in each year.
- The insurer holds a reserve of 300, 200, and 100 at the start of years 1, 2, and 3 respectively, for each contract in force at the start of the year.

## Part a (1 point)

Show that the policyholder fund value at the end of year 3, assuming the policy remains in force, is 10,100 to the nearest 100. You should calculate the value to the nearest 1.

### Explanation
The fund projection is as follows, where –/+ in the subscript indicates value before/after management charge deductions.

| $t$ | $F_{t-}$ | $MC$ | $F_{t+}$ | $F_{t+1-}$ |
|---|---|---|---|---|
| 0 | 10000.0 | 200.0 | 9800.0 | 9800.0 |
| 1 | 9800.0 | 98.0 | 9702.0 | 9702.0 |
| 2 | 9702.0 | 97.0 | 9605.0 | 10085.2 |

*Note: No need to put this in the form of a table.*

### Examiner Report
Part (a) was done well, with a large majority of candidates achieving maximum credit.

## Part b (5 points)

(i) (3.5 points) Determine the profit vector of the contract using the stress test assumptions.

(ii) (1.5 points) Calculate the net present value of the profit per policy issued, using a hurdle rate of 10% per year.

### Explanation
**(i)** The full profit test table is:

| $t$ | ${}_{t-1}V$ | $MC_t$ | $E_t$ | $I_t$ | $EDB_t$ | $ESB_t$ | $E_tV$ | $Pr_t$ | $\Pi_t$ | NPV |
|---|---|---|---|---|---|---|---|---|---|---|
| 0 | | | 200.0 | | | | 300.0 | -500.0 | -500.0 | |
| 1 | 300 | 200.0 | | 15.0 | 49.0 | -139.7 | 171.0 | 434.7 | 434.7 | |
| 2 | 200 | 98.0 | 58.8 | 7.2 | 48.5 | 0.0 | 85.5 | 112.4 | 96.1 | |
| 3 | 100 | 97.0 | 58.2 | 4.2 | 50.4 | 0.0 | 0.0 | 92.5 | 67.7 | 25.4 |

Key:

${}_{t-1}V$ is the reserve brought forward.

$MC_t$ is the management charge/Unallocated Premium Income at the start of the t-th year. These are taken from the table in (a).

$E_t$ denotes the expenses incurred at the start of the t-th year. The pre-contract expenses are assigned to year 0. The year 2 and 3 expenses are $0.006\,F_{t-1-}$.

$I_t$ denotes the interest earned on the insurer's funds. This is $0.03\left({}_{t-1}V + MC_t - E_t\right)$

$EDB_t$ denotes the expected cost of death benefit in excess of the fund value. For this contract the DB is 110% of the fund value, so we have $EDB_t = q_{x+t-1}^{(d)}(0.10)F_{t-}$.

$ESB_t$ denotes the expected cost of surrender or maturity benefit in excess of the fund value. For this contract, the SB is only 85% of the fund value in the first year, and the surrender probability in the first year is $q_x^{(s)} = (0.95)(0.10) = 0.095$, so that $ESB_1 = (0.095)(1 - 0.85)F_{1-}$

In the second year the SB is the fund value, so ESB_2=0

In the third year, the SB is the additional maturity benefit in excess of the terminal fund value, which is 0 in this projection.

$E_tV$ denotes the expected cost of the reserve carried forward. In the $t = 0$ row, this captures the cost of setting up the initial reserve of ${}_0V = 300$. In the first and second years, we have $E_tV = p_{x+t-1}^{(\tau)}\left({}_tV\right)$ where $p_{x+t-1}^{(\tau)} = 1 - 0.05 - (0.95)(0.10) = 0.855$ for $t = 0$ or $1$. There is no cost in the third year.

$Pr_t$ is the profit vector, $\Pi_t$ is the profit signature.

OR Unsegregated version:

| $t$ | $F_{t-1}$ | ${}_{t-1}V$ | $E_t$ | $If_t$ | $I_t$ | $EDB_t$ | $ECV$ | $E_tV$ | $EF_t$ | $Pr_t$ | $\Pi_t$ |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 0 | | | 200.0 | | | | | 300.0 | | -500.0 | -500.0 |
| 1 | 10000 | 300 | | 0.0 | 15.0 | 539.0 | 791.4 | 171.0 | 8379.0 | 434.7 | 434.7 |
| 2 | 9800 | 200 | 58.8 | 0.0 | 7.2 | 533.6 | 921.7 | 85.5 | 8295.2 | 112.4 | 96.1 |
| 3 | 9702 | 100 | 58.2 | 480.2 | 4.2 | 554.7 | 9581.0 | 0.0 | 0.0 | 92.5 | 67.7 |

Where If_t is the interest earned on the policyholder's funds (after MC deduction) and $I_t$ is interest earned on the other income, including the MC. The final payout could come under the CV or the EFt columns.

**(ii)** The NPV is

$$
\sum_{t=0}^{3} \Pi_t\,v_{10\%}^t = 25.36.
$$

### Examiner Report
For Part (b), many candidates struggled to identify the correct cashflows to include in the profit test. The VA is a separate account contract, so that the policyholder's funds are not part of the cashflows involved in the profit test. The management charge and unallocated premium are included as income, and the outgo relevant to the insurer's funds only the difference between a claim/benefit payout and the amount of policyholder's funds available.

## Part c (3 points)

The actuary is concerned about the GMMB risk.

(i) One colleague suggests selling more policies to mitigate the risk. Explain why this strategy would be ineffective.

(ii) Another colleague suggests a hedging strategy for the GMMB. The price at issue of the required put option is 900.

Describe one advantage and one disadvantage of hedging the guarantee, compared with holding reserves.

### Explanation
**(i)** Most policies continue to maturity. If the returns on policyholders' funds are poor, then all the policies maturing at the same time will require supplementary payments to meet the GMMB, and there will be no benefit from selling a larger number of policies. There is no diversification benefit.

**(ii)** Advantage: The GMMB will be hedged, so that the risk of very severe losses arising from a large number of policies maturing at the same time with fund values far below the initial investment is mitigated.

Disadvantage: The cost of hedging is large, relative to the potential income. This is a larger outlay than the reserve used in the profit test above, and unlike the reserve, the option cost is not recovered if the policy matures with no GMMB liability for the insurer. There is a very high likelihood of a loss on each policy.

### Examiner Report
Part (c) was done moderately well. Most candidates who attempted the question recognized that a large part of the VA risk comes from poor investment returns, which is not diversified by selling more policies. The second part proved a bit more challenging, with many candidates failing to show an understanding of the costs and benefits of hedging the VA guarantees.
