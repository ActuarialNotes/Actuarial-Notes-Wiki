---
id: "altam-052"
exam: "Exam ALTAM"
topic: "Profit Testing"
learning_objective: "Universal Life Insurance"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Universal+Life+Insurance
  - Concepts/Profit+Testing
  - Concepts/Profit+Signature
  - Concepts/Net+Present+Value
  - Concepts/Multiple+Decrement+Model
points: 9
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:09dc28cbeb28b73db3c0172bea367f6922cee7bad69cb73f7fd266c30e717845
  sources:
    - "SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q52, pp.95-96 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf"
    - "SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q52, pp.104 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-052.md
---

For universal life insurance policies with a death benefit of 100,000 plus the account value issued to independent lives age 50, you are given:

(i)

| Policy Year | Annual Premium | Percent of Premium Charge | Annual Cost of Insurance Rate per 1000 | Annual Expense Charge | Surrender Charge |
|---|---|---|---|---|---|
| 1 | 2500 | 5% | 5.00 | 30 | $0.8 * AV_1$ |

(ii) The credited interest rate is $i = 0.06$.

## Part a (2 points)

Show that the cash value at the end of policy year 1 is 400 to the nearest 10. You should calculate the value to the nearest 1.

### Explanation

$$\begin{align*}
AV_1 &= \left(2500(0.95) - 0.005(100{,}000)\,v_{6\%} - 30\right)(1.06) \\
     &= 1985.70 \\
\Rightarrow CV_1 &= 0.2AV_1 = 397.1
\end{align*}$$

### Examiner Report

*Graders Comments (as printed):* Part (a) was done well, although a few assumed that this was a Type A policy, when it is a Type B (fixed additional death benefit).

## Part b (3 points)

You are also given the following information for profit-testing these policies:

- (i) The expenses for each policy are:
  - Pre-contract expenses of 200
  - Annual maintenance expenses of 120 at the beginning of each year including the first year
  - Surrender benefit expenses of 100
  - Death benefit expenses of 200
- (ii) $q_{50} = 0.004$
- (iii) Death benefits are payable at the end of the year of death.
- (iv) At the end of the first year, 10% of the policyholders in force are expected to surrender.
- (v) The earned rate is 11%.
- (vi) The hurdle rate is 14%.

Show that the expected profit emerging at the end of year 1 is 400 to the nearest 10. You should calculate the value to the nearest 1.

### Explanation

$$\Pr_1 = \left(P - E\right)(1 + i^e) - EDB_1 - ESV_1 - EAV_1$$

$P = 2500$; $E = 120$; $i^e = 0.11$;

$$\begin{align*}
EDB_1 &= 0.004\left(100{,}000 + AV_1 + 200\right) \\
      &= 408.7 \\
ESV_1 &= 0.1(0.996)\left(CV_1 + 100\right) \\
      &= 49.5 \\
EAV_1 &= 0.996(0.9)AV_1 \\
      &= 1780.0
\end{align*}$$

$$\Rightarrow \Pr_1 = 403.6$$

### Examiner Report

In part (b), the most common errors were in calculating the dependent withdrawal and survival probabilities, failing to include the account value in EDB, and using the contract expense assumptions instead of the profit test expense assumptions.

## Part c (1 point)

Calculate NPV(1), the actuarial present value of expected profits through year 1.

### Explanation

$$NPV(1) = \Pr_0 + \Pr_1\,v_{14\%} = -200 + 403.6v = 154.0$$

## Part d (3 points)

You have calculated that the Net Present Value (NPV) for the policy is 2000. Your supervisor suggests that the 10% surrender assumption is too low. He recommends assuming 20% of the policies in force surrender at the end of year 1.

Calculate the revised NPV using the new surrender assumption.

(This is Question 6 from the Spring 2015 Written Answer exam.)

### Explanation

Let * denote values under the revised assumptions. Then we have

$$NPV = \Pr_0 + \Pr_1\,v + p_x^{(\tau)}\,\Pr_2\,v^2 + {}_{2}p_x^{(\tau)}\,\Pr_3\,v^3 + \ldots \quad \text{at } i = 0.14$$

$\Pr_t^* = \Pr_t$ for $t = 0, 2, 3, \ldots$

$$\begin{align*}
EDB_1^* &= EDB_1 = 408.7 \\
ESV_1^* &= 0.2(0.996)497.1 \\
        &= 99.0 \\
EAV_1^* &= 0.996(0.8)AV_1 \\
        &= 1582.2
\end{align*}$$

$$\Rightarrow \Pr_1^* = \left(2500 - 120\right)(1.11) - 408.7 - 99.0 - 1582.2 = 551.9$$

Also, for $k = 1, 2, \ldots$, ${}_{k}p_x^{(\tau)*} = \dfrac{0.8}{0.9}\,{}_{k}p_x^{(\tau)}$

$$\begin{align*}
\Rightarrow NPV^* &= \left(NPV - \Pr_0 - \Pr_1\,v\right)\frac{0.8}{0.9} + \Pr_0 + \Pr_1^*\,v \\
&= \left(2000 - 154\right)\frac{0.8}{0.9} - 200 + 551.9v \\
 &= 1925.0
\end{align*}$$

### Examiner Report

*Graders' Comments:* The change in assumptions impacts Pr<sub>1</sub>, which most candidates correctly allowed for, but it also changes the survival probabilities used for all the profit signature values from the 2<sup>nd</sup> contract year, which most candidates did not allow for.
