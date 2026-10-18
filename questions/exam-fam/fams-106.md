---
id: "fams-106"
exam: "Exam FAM"
topic: "Chain Ladder Method"
learning_objective: "Pricing and Reserving for Short-Term Insurance Coverages"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Chain+Ladder+Method
  - Concepts/Development+Factor
  - Concepts/Reserve
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4a9252bd6aabf7e3b91370fcce9915f9ee6dc98869850441615d087a4d482f3d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-106.md
---

You are given the following information about AY2:

(i) The age-to-age paid loss development factors are:

| Development Year Factors | | | | | | | | | | |
|---|---|---|---|---|---|---|---|---|---|---|
| 1/0 | 2/1 | 3/2 | 4/3 | 5/4 | 6/5 | 7/6 | 8/7 | 9/8 | 10/9 | $\infty$/10 |
| 1.23 | 1.18 | 1.14 | 1.11 | 1.08 | 1.06 | 1.05 | 1.04 | 1.04 | 1.03 | $r$ |

(ii) As of December 31, CY8, the estimated loss reserve is 12,200 based on the chain-ladder method.

(iii) During CY9, actual paid loss development equals the expected development.

(iv) As of December 31, CY9, the estimated loss reserve is 10,000 based on the chain-ladder method.

Calculate $r$.

- A) 1.092
- B) 1.141
- C) 1.162
- D) 1.187
- E) 1.220

## Explanation

Let $X$ represent the claims-paid to-date for AY2, as of December 31, CY8.

Let $f_{n,m}$ represent the age-to-age (or age-to-ultimate) paid loss development factor from the end of development year $m$ to the end of development year $n$ (where $n$ could be finite or infinite).

In the chain-ladder method, the ultimate loss equals the claims paid-to-date on a given date multiplied by the product of all the loss development factors after this date.

The estimated ultimate loss for AY2 is the claims paid-to-date as of December 31, CY8 (the end of development year 6) multiplied by the product of the loss development factors after the end of development year 6. Therefore, the estimated ultimate loss for AY2 is

$$f_{7,6}f_{8,7}f_{9,8}f_{10,9}f_{\infty,10}X.$$

The estimated loss reserve as of any given date equals the estimated ultimate loss minus claims paid to date as of that date, so the estimated loss reserve as of December 31, CY8 is

$$\left(f_{7,6}f_{8,7}f_{9,8}f_{10,9}f_{\infty,10} - 1\right)X.$$

Since actual paid loss development equals the expected development during CY9, the AY2 estimated claims paid-to-date as of December 31, CY9 (the end of development year 7) is $f_{7,6}X$. Therefore, the estimated loss reserve as of December 31, CY9 is

$$\left(f_{7,6}f_{8,7}f_{9,8}f_{10,9}f_{\infty,10} - f_{7,6}\right)X.$$

Since the estimated loss reserve as of December 31, CY8 is 12,200 and the estimated loss reserve as of December 31, CY9 is 10,000,

$$\frac{f_{7,6}f_{8,7}f_{9,8}f_{10,9}f_{\infty,10} - 1}{f_{7,6}f_{8,7}f_{9,8}f_{10,9}f_{\infty,10} - f_{7,6}} = \frac{12{,}200}{10{,}000}$$

which gives

$$\frac{1.05(1.04)(1.04)(1.03)r - 1}{1.05(1.04)(1.04)(1.03)r - 1.05} = 1.22$$

which solves for

$$\begin{align*}
r &= \frac{1.05(1.22) - 1}{1.05(1.04)(1.04)(1.03)(1.22 - 1)} \\
&= 1.092.
\end{align*}$$

The answer is **A**.
