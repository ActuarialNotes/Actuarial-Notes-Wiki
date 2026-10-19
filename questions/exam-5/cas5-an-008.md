---
id: "cas5-an-008"
exam: "Exam 5"
topic: "Benktander Method"
learning_objective: "Estimating Claim Liabilities (Reserving)"
difficulty: medium
type: free-entry
bloom: analyze
wiki_link:
  - Concepts/Benktander+Method
  - Concepts/Bornhuetter-Ferguson+Method
  - Concepts/Chain+Ladder+Method
  - Concepts/Expected+Loss+Method
answer: "CBDA"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9d995a30b11a00ac0839d675b0ffd167e52c239d635cf023120d9e888a22afd6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-5/cas5-an-008.md
---

An actuary is estimating ultimate claims for the most recent accident year of a commercial liability book. The reported cumulative development factor to ultimate at this age is greater than 1, and the a priori expected claims come from an expected claim ratio applied to earned premium. Reported claims to date are well **below** what the a priori implies should have been reported by this age.

Rank the four estimates of ultimate claims below from **highest to lowest**. Enter the letters with no spaces, e.g. ABCD.

- (A) Reported development (chain ladder) technique
- (B) Bornhuetter-Ferguson technique
- (C) Expected claims technique
- (D) Benktander technique

## Explanation

Write $C$ for reported claims, $U_0$ for the a priori expected claims, and $p = 1/\text{CDF}$ for the percentage reported. Each estimate is a credibility weighting of the chain ladder ultimate $U_{\text{CL}} = C \times \text{CDF}$ against the a priori:

$$
\begin{align*}
U_{\text{EC}} &= U_0 \\
U_{\text{BF}} &= p\,U_{\text{CL}} + (1-p)\,U_0 \\
U_{\text{GB}} &= p(2-p)\,U_{\text{CL}} + \left[1 - p(2-p)\right] U_0
\end{align*}
$$

Since $p$ lies strictly between 0 and 1, the weight on the chain ladder rises in the order expected claims (none), BF ($p$), Benktander ($p(2-p) > p$), chain ladder (all). Reporting is running behind the a priori, so $U_{\text{CL}} < U_0$, and the more weight a method gives to the chain ladder, the **lower** its estimate:

$$U_{\text{EC}} > U_{\text{BF}} > U_{\text{GB}} > U_{\text{CL}}$$

For example, with $C = 900{,}000$, $\text{CDF} = 2.5$ and $U_0 = 3{,}000{,}000$ (so 1,200,000 was expected to be reported by now), the estimates are 3,000,000 (expected claims), 2,700,000 (BF), 2,520,000 (Benktander) and 2,250,000 (chain ladder).

The answer is **CBDA**.

**Common wrong entries**

- **ADBC** — the ranking when reporting runs *ahead* of the a priori, the case usually shown in worked examples. Which method is highest depends on the direction of the gap between actual and expected reporting, not on the method.
- **CDBA** — places Benktander above BF, as if Benktander were a step back toward the a priori. Benktander is BF iterated once with the BF ultimate as the new a priori, which moves the estimate further toward the chain ladder, not away from it.
- **BCDA** or anything with BF above expected claims — BF keeps the actual reported claims and adds expected unreported claims, so when reported claims fall short of expectation BF is pulled below the a priori by exactly that shortfall.
