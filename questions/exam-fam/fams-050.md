---
id: "fams-050"
exam: "Exam FAM"
topic: "Reinsurance"
learning_objective: "Short-Term Insurance and Reinsurance Coverages"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Reinsurance
  - Concepts/Inflation
  - Concepts/Pareto+Distribution
  - Concepts/Deductible
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8055c14c217530ae330401a12eaf6844d4feb4df269dabdf15a094a514eacd26
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-050.md
---

In Year 1 a risk has a Pareto distribution with $\alpha = 2$ and $\theta = 3000$.  In Year 2 losses inflate by 20%.

An insurance on the risk has a deductible of 600 in each year.  $P_i$, the premium in year $i$, equals 1.2 times the expected claims.

The risk is reinsured with a deductible that stays the same in each year.  $R_i$, the reinsurance premium in year $i$, equals 1.1 times the expected reinsured claims.

$$\frac{R_1}{P_1} = 0.55$$

Calculate $\dfrac{R_2}{P_2}$.

- A) 0.46
- B) 0.52
- C) 0.55
- D) 0.58
- E) 0.66

## Explanation

For any deductible $d$ and the given severity distribution

$$\begin{align*}
E[(X - d)_+] &= E(X) - E(X \wedge d) \\
&= 3000 - 3000\left(1 - \frac{3000}{3000 + d}\right) \\
&= 3000\left(\frac{3000}{3000 + d}\right) \\
&= \frac{9{,}000{,}000}{3000 + d}
\end{align*}$$

So

$$\begin{align*}
P_1 &= 1.2\,\frac{9{,}000{,}000}{3000 + 600} \\
&= 3000
\end{align*}$$

Let $r$ denote the reinsurer's deductible relative to insured losses. Thus, the reinsurer's deductible is $600 + r$ relative to losses. Thus

$$\begin{align*}
R_1 &= 1.1\left(\frac{9{,}000{,}000}{3000 + 600 + r}\right) \\
&= 0.55P_1 \\
&= 0.55(3000) \\
&= 1650 \\
\Rightarrow r &= 2400
\end{align*}$$

In Year 2, after 20% inflation, losses will have a Pareto distribution with $\alpha = 2$ and $\theta = 1.2(3000) = 3600$. The general formula for expected claims with a deductible of $d$ is

$$\begin{align*}
E[(X - d)_+] &= 3600\left(\frac{3600}{3600 + d}\right) \\
&= \frac{12{,}960{,}000}{3600 + d}
\end{align*}$$

$$\begin{align*}
P_2 &= 1.2\,\frac{12{,}960{,}000}{3000 + 600} \\
&= 3703 \\
R_2 &= 1.1\,\frac{12{,}960{,}000}{3000 + 600 + 2400} \\
&= 2160 \\
\frac{R_2}{P_2} &= \frac{2160}{3703} \\
&= 0.583
\end{align*}$$

The answer is **D**.
