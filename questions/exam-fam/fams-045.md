---
id: "fams-045"
exam: "Exam FAM"
topic: "Payment Random Variable"
learning_objective: "Short-Term Insurance and Reinsurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Payment+Random+Variable
  - Concepts/Deductible
  - Concepts/Coverage+Modifications
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:236a548c24d746085d47c7be10a6cacc9a677436d482985c71a237ea54584523
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-045.md
---

For an insurance policy:

(i) Losses can be 100, 200 or 300 with respective probabilities 0.2, 0.2, and 0.6.

(ii) The policy has an ordinary deductible of 150 per loss.

(iii) $Y^P$ is the claim payment per payment random variable.

Calculate $\mathrm{Var}(X^P)$.

- A) 1500
- B) 1875
- C) 2250
- D) 2625
- E) 3000

## Explanation

$$\begin{align*}
S_X(150) &= 1 - 0.2 \\
&= 0.8
\end{align*}$$

$$f_{Y^P}(y) = \frac{f_X(y + 150)}{S_X(150)}$$

$$\begin{align*}
f_{Y^P}(50) &= \frac{0.2}{0.8} \\
&= 0.25 \\
f_{Y^P}(150) &= \frac{0.6}{0.8} \\
&= 0.75
\end{align*}$$

$$\begin{align*}
E(Y^P) &= 0.25(50) + 0.75(150) \\
&= 125 \\
E\left[(Y^P)^2\right] &= 0.25(50^2) + 0.75(150^2) \\
&= 17{,}500 \\
Var(Y^P) &= 17{,}500 - 125^2 \\
&= 1{,}875
\end{align*}$$

The answer is **B**.
