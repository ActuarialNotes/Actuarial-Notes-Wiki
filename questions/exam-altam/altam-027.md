---
id: "altam-027"
exam: "Exam ALTAM"
topic: "Profit Testing"
learning_objective: "Profit Analysis"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Profit+Testing
  - Concepts/Profit+Vector
  - Concepts/Profit+Signature
  - Concepts/Internal+Rate+of+Return
  - Concepts/Reserve
points: 11
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:54cef493433af3d5e73a5ef3439e656055f4ce5bed22d98dd731404ee47730c3
  sources:
    - "SOA Exam ALTAM Sample Written-Answer Questions (January 2026), Q27, pp.49-50, sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf"
    - "SOA Exam ALTAM Sample Written-Answer Solutions (January 2026), Q27, pp.53-54, sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-027.md
---

For a special 3-year term life insurance issued to (50) with a premium refund feature, you are given:

(i) The death benefit is 100,000.

(ii) The premium refund feature refunds the last premium payment, without interest, at the end of the 3-year term if the insured is still alive.

(iii) The mortality rates are:

| $x$ | $q_x$ |
|---|---|
| 50 | 0.00592 |
| 51 | 0.00642 |
| 52 | 0.00697 |

(iv) Pre-contract expenses are 155.

(v) Commissions are 5% of each premium.

(vi) The hurdle rate is 14%.

(vii) The reserves of this policy have been set to:

| $t$ | ${}_tV$ |
|---|---|
| 0 | 0 |
| 1 | 400 |
| 2 | 800 |

(viii) The annual premium for this policy is 1100.

(ix) The earned interest rates are:

| Year 1 | Year 2 | Year 3 |
|---|---|---|
| 0.01 | 0.02 | 0.03 |

## Part a (1 point)

Show that the expected profit in policy year 2 for a policy in force at the start of year 2 is 37 to the nearest 1. You should calculate your answer to the nearest 0.01.

### Explanation
$$\begin{align*}
\Pr_2 &= ({}_1V + P - E)(1 + i_2) - q_{51}S - p_{51}({}_2V) \\
&= (400 + 1100 - 55)(1.02) - (0.00642)(100{,}000) - (0.99358)(800) \\
&= 37.04
\end{align*}$$

## Part b (4 points)

Calculate the profit vector of this policy.

### Explanation
| $t$ | ${}_{t-1}V$ | $P$ | $E_t$ | $I_t$ | $EDB_t$ | $EMB$ | $E_tV$ | $\Pr_t$ |
|---|---|---|---|---|---|---|---|---|
| 0 | | | 155 | | | | | -155.00 |
| 1 | 0 | 1100 | 55 | 10.45 | 592 | | 397.63 | 65.82 |
| 2 | 400 | 1100 | 55 | 28.90 | 642 | | 794.86 | 37.04 |
| 3 | 800 | 1100 | 55 | 55.35 | 697 | 1092.33 | 0.00 | 111.02 |

The profit vector is the final column.

$P$ is the premium

$E_t$ denotes expenses

$I_t$ denotes interest on funds in year $t$

$EDB_t = 100{,}000\,q_{50+t-1}$

In year 3, $EMB_3 = p_{52} \times 1100$

$E_tV = p_{50+t-1}\,{}_tV$

### Examiner Report
**Graders' Comments:** *Many candidates received full credit for this part, and a larger number received partial credit. The most common errors included (i) ignoring the maturity benefit and (ii) incorrect use of probabilities in $E_tV$. It is not necessary for candidates to define all terms, but it can be helpful when graders are considering partial credit, especially if the values are calculated in Excel.*

## Part c (3 points)

Calculate the profit signature and Net Present Value (NPV) of this policy.

### Explanation
The profit signature at $t$ is $\Pi_t$ where:

$$\Pi_0 = \Pr_0 \quad \text{and} \quad \Pi_t = {}_{t-1}p_{50} \cdot \Pr_t$$

$$\Rightarrow (\Pi_0, \Pi_1, \Pi_2, \Pi_3) = (-155.00,\ 65.82,\ 36.82,\ 109.65)$$

$$\Rightarrow NPV = \sum_{k=0}^{3} \Pi_k \cdot v_{14\%}^k = 5.08$$

### Examiner Report
**Graders' Comments:** *Most candidates did this part well. The most common errors were incorrect survival probabilities when calculating the profit signature from the provit (as printed) vector, and incorrect discounting periods for the NPV.*

## Part d (3 points)

Rank from low to high the Internal Rate of Return (IRR) of the following products, explaining your order.

Product A: The special 3-year term life insurance described above.

Product B: A 3-year term life insurance policy with the following profit signature: $[-155, 0, 0, 210]$

Product C: The same special 3-year term life insurance as Product A, except that the reserves of the product have been set to:

| $t$ | ${}_tV$ |
|---|---|
| 0 | 0 |
| 1 | 300 |
| 2 | 800 |

(This is a modified version of Question 5 from the Fall 2014 Written Answer exam.)

### Explanation
The IRR of B is $j$ where $155 = 210v_j^3 \Rightarrow j = 10.65\%$.

and the IRR of A is greater than 14%, because the NPV at 14% is positive. Hence IRR of B is less than IRR of A.

Product C has lower reserves in year 1,which (as printed) allow an earlier release of surplus compared to Product A, which give a higher NPV than A at an 14% hurdle rate, but does not necessarily mean that C has a higher IRR.

The lower reserve in year 1 results in the following profit signature for C: (-155.00, 165.23, -64.58, 109.65)

We note that the NPV (as printed) of A is a little larger than 14%, because the NPV at 14% is close to zero. Calculating the NPV for A and C at 16% gives $-0.65$ for A and 9.7 for C. Hence, the IRR for C is greater than 16% , and for A is less than 16%.

That is $\Rightarrow IRR(B) < IRR(A) < IRR(C)$

### Examiner Report
**Graders' Comments:** *Many candidates evaluated the IRR for all three cases, presumably using the financial functions on the BA2 calculator. This was awarded full credit if correct. However, it was not necessary to determine the IRR to answer the question.*

*Candidates who demonstrated understanding of the relationship between the release of surplus and the return to the insurer gained partial credit, even if the justification was incomplete. No credit was awarded for the IRR ordering if there was no accompanying explanation or justification*
