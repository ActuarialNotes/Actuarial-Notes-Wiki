---
id: "faml-4-05"
exam: "Exam FAM"
topic: "Term Life Insurance"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Term+Life+Insurance
  - Concepts/Percentile
  - Concepts/Life+Table
  - Concepts/Fractional+Age+Assumption
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6d72fa9716b6dcfc23627ecf3c91aeae52a616cb7252fca0bbfedf033969a4b9
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-4-05.md
---

For a 30-year term life insurance of 100,000 on (45), you are given:

(i) The death benefit is payable at the moment of death

(ii) Mortality follows the Standard Ultimate Life Table

(iii) $\delta = 0.05$

(iv) Deaths are uniformly distributed over each year of age

Calculate the 95th percentile of the present value of benefits random variable for this insurance.

[A modified version of Question 11 on the Fall 2017 exam]

- A) 30,200
- B) 31,200
- C) 35,200
- D) 36,200
- E) 37,200

## Explanation

The earlier the death (before year 30), the larger the loss. Since we are looking for the 95th percentile of the present value of benefits random variable, we must find the time at which 5% of the insureds have died. The present value of the death benefit for that insured is what is being asked for.

$$\begin{align*}
l_{45} &= 99{,}033.9 \\
0.95l_{45} &= 94{,}082.2 \\
l_{65} &= 94{,}579.7 \\
l_{66} &= 94{,}020.3
\end{align*}$$

So, the time is between ages 65 and 66, i.e., time 20 and time 21.

$$\begin{align*}
l_{65} - l_{66} &= 94{,}579.7 - 94{,}020.3 \\
&= 559.4 \\
l_{65+t} - l_{66} &= 94{,}579.7 - 94{,}082.2 \\
&= 497.5 \\
497.5/559.4 &= 0.8893
\end{align*}$$

The time just before the last 5% of deaths is expected to occur is: $20 + 0.8893 = 20.8893$

The present value of death benefits at this time is:

$$\begin{align*}
100{,}000e^{-20.8893(0.05)} &= 35{,}188
\end{align*}$$

The answer is **C**.
