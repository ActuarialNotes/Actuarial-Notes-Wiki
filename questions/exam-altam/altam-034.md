---
id: "altam-034"
exam: "Exam ALTAM"
topic: "Profit Testing"
learning_objective: "Profit Analysis"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Profit+Testing
  - Concepts/Profit+Signature
  - Concepts/Net+Present+Value
  - Concepts/Internal+Rate+of+Return
  - Concepts/Lapse
  - Concepts/Term+Life+Insurance
points: 10
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:cfe250df0a2c3e852bc82261999e30ac7c258afb25f57427ef7f8a259745fbca
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-034.md
---

XYZ Insurance Company sells two year term policies to lives age $x$. The death benefit of 1,000,000 is payable at the end of the year of death. Premiums are payable annually.

The insurer holds reserves of 0 for this policy at time $t = 0$ and at time $t = 1$.

The assumptions used for profit testing this policy are:

(i) Precontract underwriting expenses are 3,000 per policy.

(ii) Commissions are 20% of premium in year 1 and 5% of premiums each year thereafter. The extra 15% of premium commissions in the first year is treated as a pre-contract cash flow for profit testing purposes.

(iii) Maintenance expense is 100 per policy at the beginning of every year including the first year.

(iv) The earned interest rate is 7%.

(v) Mortality is $q_{x+t} = 0.05 + 0.05t$ for $t = 0, 1, 2$

(vi) At the end of the first year 10% of the surviving policyholders withdraw.

(vii) There are no cash values.

(viii) $\Pr_1 = 31{,}213$.

XYZ uses a gross premium of 80,000 in its first profit test for this two year term policy.

(This is Question 2 from the Fall 2021 Form A Written Answer exam.)

## Part a (1 point)

Determine $\Pr_0$.

### Explanation
$$\Pr_0 = -3000 - (0.15)P = -3000 - (0.15)(80{,}000) = -15{,}000$$

### Examiner Report
*Graders' Comments:* Candidates generally did well here. Common mistakes included calculating a reserve when the question specifically stated V=0, or recalculating P when the question explicitly gave a gross premium.

## Part b (2 points)

Determine $\Pr_2$.

### Explanation
$$
\begin{align*}
\Pr_2 &= (0.95P - 100)(1.07) - S\,q_{x+1} \\
&= (0.95(80{,}000) - 100)(1.07) - 1{,}000{,}000\,(0.1) \\
&= 81{,}213 - 100{,}000 \\
 &= -18{,}787
\end{align*}
$$

### Examiner Report
*Graders' Comments:* Candidates generally did well here. Some candidates incorrectly applied survival probabilities that should have been applied in part (c).

## Part c (1 point)

Determine the profit signature for this policy.

### Explanation
$$
\begin{align*}
\Pi &= \left(-15{,}000;\ 31{,}213;\ Pr_2\,{}_1p_x^{(\tau)}\right) \\
&= \left(-15{,}000;\ 31{,}213;\ -18{,}787\,(1 - 0.05)(.9)\right) \\
&= \left(-15{,}000;\ 31{,}213;\ -16{,}062.885\right)
\end{align*}
$$

### Examiner Report
*Graders' Comments:* The most common mistake here was not treating the decrements as independent for the profit signature at time 2. Some candidates also forgot to include one of the two decrements entirely.

## Part d (1 point)

The NPV for this policy using a risk discount rate of 20% is negative. Calculate the NPV to the nearest 1.

### Explanation
$$
\begin{align*}
\text{NPV} &= -15{,}000 + 31{,}213\,v_{0.2} - 16{,}062.885\,v^2_{0.2} \\
&= -15{,}000 + 26{,}010.83 - 11{,}154.78 \\
 &= -143.95
\end{align*}
$$

## Part e (1 point)

Calculate the internal rate of return for this policy.

### Explanation
Let $j$ = IRR

$$-15{,}000 + 31{,}213\,v_j - 16{,}062.885\,v_j^2 = 0$$

$$\Rightarrow v_j = \frac{31{,}213 \pm \sqrt{31{,}213^2 - 4(15{,}000)(16{,}062.885)}}{2(16{,}062.885)} = \frac{31{,}213 \pm 3237}{32{,}125.77}$$

$\Rightarrow$ $j = -6.7\%$ or $\mathbf{14.83\%}$ $\Rightarrow$ Keeping the positive rate, IRR = 14.83%.

## Part f (1 point)

Your boss questions how you can have a positive IRR but a negative NPV. Explain how this is possible.

### Explanation
The NPV is being calculated at a risk discount rate of 20% while the IRR uses a discount rate of 14.83. The 20% discount rate results in a negative because the discounted profits at the end of one year and at the end of two years when discounted at 20% are not sufficient to cover the pre-contract expenses. The NPV is positive for some rates of return less than 20%. The IRR>0 for discount rates less than IRR=14.83% (rates between -6.7% and 14.83%).

### Examiner Report
*Graders' Comments:* Many candidates simply restated the question here and could not point to how it's possible to have a positive IRR but a negative NPV. Some mentioned the difference in discount rate vs IRR, but we were really looking for commentary of the timing of the cash flows.

## Part g (2 points)

Calculate the NPV if the lapse rate increases to 15%.

### Explanation
With a 15% lapse rate, ${}_1p_x^{(\tau)} = (1 - 0.05)(.85) = 0.8075$

The profit signature becomes

$$
\begin{align*}
\Pi &= \left(-15{,}000;\ 31{,}213;\ Pr_2\,{}_1p_x^{(\tau)}\right) \\
&= \left(-15{,}000;\ 31{,}213;\ -18{,}787\,(1 - 0.05)(.85)\right) \\
&= \left(-15{,}000;\ 31{,}213;\ -15{,}170.50\right)
\end{align*}
$$

And NPV at 20% is

$$
\begin{align*}
\text{NPV} &= -15{,}000 + 31{,}213\,v_{0.2} - 15{,}170.50\,v^2_{0.2} \\
&= -15{,}000 + 26{,}010.83 - 10{,}535.07 \\
 &= 475.76
\end{align*}
$$

## Part h (1 point)

Policies where profits increase as the lapse rate increases are called lapse supported policies. Explain why such policies are risky to the insurance company.

### Explanation
Lapse rates are much less predictable than mortality rates. A contract that is only profitable if people lapse is very vulnerable to the risk that policyholders lapse at much lower than the expected rates. The growth of the third party market for insurance makes lapsing much less attractive for policyholders, as a rational policyholder would not lapse a policy that could have positive value on the third party market.

### Examiner Report
*Graders' Comments:* Very few candidates noted that the decision to lapse is the policyholder's, and there are many factors outside the control of the insurer to impact it.
