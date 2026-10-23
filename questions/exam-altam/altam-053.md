---
id: "altam-053"
exam: "Exam ALTAM"
topic: "Universal Life Insurance"
learning_objective: "Universal Life Insurance"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Universal+Life+Insurance
  - Concepts/No-Lapse+Guarantee
  - Concepts/Reserve
  - Concepts/Life+Insurance
points: 10
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:6213c67e39e23d5a2a1b0bc0584ed36982481672fd6b6af7e2deb18b43d7aa71
  sources:
    - "SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q53, pp.97-98 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf"
    - "SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q53, pp.105 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-053.md
---

For a Type A universal life policy issued to (50), you are given:

- (i) The face amount is 100,000.
- (ii) All cash flows occur at policy anniversaries.
- (iii) The policyholder pays an initial premium of 15,000.
- (iv) The cost of insurance (COI) is calculated based on 120% of the mortality in the Standard Ultimate Life Table. The interest rate for discounting the net amount at risk, $i^q$, is 0.04.
- (v) The expense charge is 1% of premium.
- (vi) The credited interest rate for policy year 1 is 5%.
- (vii) The corridor factor in year 1 is 2.2.
- (viii) The surrender charge in policy year 1 is 5% of the premium paid.

(This is an edited version of Question 6 from the Fall 2014 Written Answer exam.)

## Part a (1 point)

Explain why the corridor factor requirement exists for universal life insurance.

### Explanation

Universal life is regulated as an insurance product. The corridor factor ensures that the insurance benefit is significant throughout the term of the contract, differentiating the policy from a pure investment contract.

## Part b (5 points)

- (i) Calculate the COI in policy year 1 assuming there is no corridor factor requirement.
- (ii) Calculate the COI in policy year 1 based only on the corridor factor (as if the face amount were 0).
- (iii) Determine the COI in policy year 1.

### Explanation

**(i)**

$$\begin{align*}
AV_1 &= \left(15{,}000(0.99) - CoI\right)(1.05) \\
CoI &= 1.2q_{50}\left(100{,}000 - AV_1\right)v_{4\%} \\
    &= 139.62 - 0.0013962AV_1
\end{align*}$$

$$\Rightarrow AV_1 = \frac{15{,}445.9}{0.998534} = 15{,}468.6$$

$$\Rightarrow CoI = 118.02$$

**(ii)**

$$CoI = 1.2q_{50}\left(1.2AV_1\right)v_{4\%} = 0.001675AV_1$$

$$\Rightarrow AV_1 = \frac{15{,}592.5}{1.001759} = 15{,}565.12$$

$$\Rightarrow CoI = 26.07$$

**(iii)** $CoI = \max\left(118.02,\ 26.07\right) = 118.02$

### Examiner Report

*Graders' Comments:* Many candidates memorized the CoI formulas for part (b). If the formulas used were correct, full marks were awarded, as the question did not ask for a derivation. Some candidates answered the question as if the contract were a Type B. This earned little credit as it significantly simplifies the work, and because understanding the difference between Type A and Type B contracts is important.

## Part c (2 points)

Calculate the account value, additional death benefit, and cash value at the end of policy year 1.

### Explanation

$AV_1 = 15{,}468.6$ from (b)(i)

$$\begin{align*}
ADB_1 &= DB_1 - AV_1 \\
      &= 100{,}000 - 15{,}486.6 \text{ (as printed)} \\
      &= 84{,}513.4 \\
CV_1 &= 15{,}486.6 \text{ (as printed)} - 0.05(15{,}000) \\
     &= 14{,}736.6
\end{align*}$$

## Part d (2 points)

The policy contains a no-lapse guarantee providing term insurance of 100,000 until age 90.

If the expected present value of the guaranteed insurance coverage is greater than the account value, the company holds a reserve for the no-lapse guarantee equal to the difference. The expected present value is based on the Standard Ultimate Life Table at 5% interest with no expenses.

The account value at the end of policy year 20 is 20,000.

Calculate the reserve for the no-lapse guarantee at the end of year 20.

### Explanation

The value of the term insurance is

$$100{,}000\,A_{70:\overline{20|}}^{1} = 100{,}000\left(A_{70:\overline{20|}} - {}_{20}E_{70}\right) = 29{,}778$$

$\Rightarrow$ The reserve is $29{,}778 - 20{,}000 = 9{,}778$.
