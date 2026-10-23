---
id: "altam-035"
exam: "Exam ALTAM"
topic: "Profit Testing"
learning_objective: "Profit Analysis"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Profit+Testing
  - Concepts/Profit+Signature
  - Concepts/Profit+Margin
  - Concepts/Net+Present+Value
  - Concepts/Policy+Value
  - Concepts/Term+Life+Insurance
points: 10
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:0913a8fadf322bd6deb48bd379d013aafd8fa22f144d544d639b352f736fc470
  sources:
    - "SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q35, pp.65-66 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf"
    - "SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q35, pp.72-73 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-035.md
---

XYZ Insurance Company sells three-year term policies with a death benefit of 1,000,000 payable at the end of the year of death, to lives age $x$. Premiums are payable annually.

The insurer holds reserves for the policy equal to net premium policy values, based on an interest rate $i = 0.05$ and mortality of $q_{x+t} = 0.10 + 0.10t$ for $t = 0, 1, 2$.

The net premium for this policy is 177,313.20. The net premium policy value at the end of the first year, ${}_1V^n$, is 95,754.

The assumptions used for profit testing this policy are:

(i) The pre-contract underwriting expense is 4,000 per policy.

(ii) Commissions are 20% of premium in year 1 and 5% of premium each year thereafter. The extra 15% of premium in commissions in the first year is treated as a pre-contract cash flow for profit testing purposes.

(iii) Maintenance expense is 100 per policy at the beginning of every year including the first year.

(iv) The earned interest rate is 7%.

(v) Mortality is equal to the policy value mortality.

(vi) At the end of each of the first two years, 10% of the surviving policyholders withdraw.

(vii) There are no cash values.

## Part a (1 point)

List four ways that profit tests are applied in practice.

### Explanation
- To set premiums
- To set reserves
- To measure profitability
- To stress test profitability
- To determine distributable surplus (for participating contracts)

### Examiner Report
*Graders' Comments:* Most candidates that tried this part received full credit for it.

## Part b (1 point)

Show that the net premium policy value at the end of the second year is 108,400 to the nearest 10. You should calculate the value to the nearest 1.

### Explanation
$$
\begin{align*}
{}_2V^n &= EPV \text{ of Future Benefits} - EPV \text{ of Future Premiums} \\
&= S\,v\,q_{x+2} - P \\
 &= 1{,}000{,}000\left(1.05^{-1}\right)(0.3) - 177{,}313.20 \\
&= 285{,}714.29 - 177{,}313{,}20 \text{ (as printed)} \\
 &= 108{,}401.09
\end{align*}
$$

### Examiner Report
*Graders' Comments:* Most candidates received full credit for this part. Common errors involved an incorrect discount rate, including expenses, or including withdrawals.

## Part c (2 points)

XYZ uses a gross premium of 210,000 in its first profit test for this three-year term policy. Using this premium, $\Pr_2 = 37{,}766$ and $\Pr_3 = 29{,}347$.

(i) Determine $\Pr_0$.

(ii) Determine $\Pr_1$.

### Explanation
(i)

$$
\begin{align*}
Pr_0 &= -4000 - (0.15)G \\
&= -4000 - (0.15)(210{,}000) \\
 &= -35{,}500
\end{align*}
$$

(ii) Lapse rate: $w = 0.1$

$$
\begin{align*}
Pr_1 &= (0.95G - E_0)(1 + i^*) - 1{,}000{,}000\,q_x - p_x\,(1 - w)\,{}_1V^n \\
&= (0.95(210{,}000) - 100)(1.07) - 1{,}000{,}000(0.1) - (0.9)(0.9)(95{,}754) \\
&= 213{,}358 - 100{,}000 - 77{,}560.74 \\
 &= 35{,}797.26
\end{align*}
$$

### Examiner Report
*Graders' Comments:* Part (i) was done well by most candidates. In part (ii), many candidates failed to include withdrawals.

## Part d (3 points)

(i) Determine the profit signature for this policy.

(ii) Calculate the NPV for this policy using a risk discount rate of 12%.

(iii) Calculate the profit margin for this policy.

### Explanation
(i)

$$
\begin{align*}
\Pi_0 &= Pr_0 \\
      &= -35{,}500 \\
\Pi_1 &= Pr_1 \\
      &= 35{,}797.26 \\
\Pi_2 &= p_x^{(\tau)}\,Pr_2 \\
      &= (0.9)(0.9)(37{,}766) \\
      &= 30{,}590.46 \\
\Pi_3 &= {}_2p_x^{(\tau)}\,Pr_3 \\
      &= p_x^{(\tau)}\,p_{x+1}^{(\tau)}\,Pr_3 \\
      &= (0.9)(0.9)(0.8)(0.9)(29{,}347) \\
      &= 17{,}115.17
\end{align*}
$$

(ii)

$$
\begin{align*}
NPV &= \sum_t \Pi_t\,v^t_{0.12} \\
&= -35{,}500 + \frac{35{,}797.26}{1.12} + \frac{30{,}590.46}{1.12^2} + \frac{17{,}115.17}{1.12^3} \\
 &= 33{,}030.61
\end{align*}
$$

(iii)

$$
\begin{align*}
PM &= \frac{NPV}{G\left(1 + v^1_{0.12}\,p_x^{(\tau)} + v^2_{0.12}\,{}_2p_x^{(\tau)}\right)} \\
&= \frac{33{,}030.61}{210{,}000(1 + 0.7232143 + 0.4649235)} \\
 &= \frac{33{,}030.61}{495{,}508.93} \text{ (as printed)} \\
&= 0.07188 \text{ or } 7.19\%
\end{align*}
$$

### Examiner Report
*Graders' Comments:* Many candidates failed to include withdrawals, and some candidates did not use the correct discount rates.

## Part e (3 points)

XYZ wants to achieve a profit margin of 10% on this policy. Calculate the gross premium that XYZ should charge to meet that objective.

(This is Question 2 from the Fall 2021 Form B Written Answer exam.)

### Explanation
The NPV in terms of G is ($v = v_{0.12}$)

$$
\begin{align*}
NPV &= -4000 - (0.15)G \\
&\quad + \left\{(0 + 0.95G - 100)(1.07) - (1{,}000{,}000)(0.1) - (0.9)(0.9)(95{,}754)\right\}v \\
&\quad + \left\{(95{,}754 + 0.95G - 100)(1.07) - (1{,}000{,}000)(0.2) - (0.8)(0.9)(108{,}401.09)\right\}(0.9)^2\,v^2 \\
&\quad + \left\{(108{,}401.09 + 0.95G - 100)(1.07) - (1{,}000{,}000)(0.3)\right\}(0.9)^2(0.9)(0.8)\,v^3
\end{align*}
$$

$$
\begin{align*}
NPV &= G\left(-0.15 + 0.95(1.07)\left(v + (0.9)^2v^2 + (0.9)^3(0.8)v^3\right)\right) - 4000 - 177{,}667.74\,v - 142{,}316.19\,v^2 - 107{,}377.52\,v^3 \\
NPV &= 1.8359304\,G - 352{,}514.70
\end{align*}
$$

$$PM = \frac{1.8359304\,G - 352{,}514.70}{2.18814\,G} = 0.1$$

$$\Rightarrow G = \frac{352{,}514.70}{1.8359304 - 0.218814} = \mathbf{217{,}989.69}$$

### Examiner Report
*Graders' Comments:* Very few candidates attempted this part of the problem. Candidates who attempted to write the NPV in terms of the new premium were rewarded significantly, even if the attempt was incomplete/incorrect.
