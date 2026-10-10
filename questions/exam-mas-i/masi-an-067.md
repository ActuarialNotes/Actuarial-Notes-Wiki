---
id: "masi-an-067"
exam: "Exam MAS-I"
topic: "Kolmogorov-Smirnov Test"
learning_objective: "Statistics"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Kolmogorov-Smirnov+Test
  - Concepts/Empirical+Distribution
  - Concepts/Exponential+Distribution
answer: "C"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:0577a280c9f9720afe57243adc51efa4f3bf59087b52ef9b7afe4f2d77fe8d05
  sources:
    - "Frees et al., Loss Data Analytics (open text), ch.4 Model Selection and Estimation, Kolmogorov-Smirnov statistic max(D+, D-) with |i/n - F*| and |F* - (i-1)/n|; Example 4.1.8 (F_n(x-) vs F_n(x)), sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html"
    - "CAS Exam MAS-I Content Outline 2026, Domain B tasks 1-9 and readings (Hogg, Tse), PDF p.4; text references (Hogg B sections incl. 2.8; Tse 2.2-2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-067.md
---

Five claim amounts are observed:

$$
100,\ 800,\ 800,\ 2{,}000,\ 3{,}000
$$

They are tested against an exponential distribution with mean 1,000 using the Kolmogorov–Smirnov test.

Calculate the Kolmogorov–Smirnov test statistic $D$.

- A) 0.105
- B) 0.151
- C) 0.351
- D) 0.384
- E) 0.465

## Explanation

The hypothesized CDF is $F^*(x) = 1 - e^{-x/1{,}000}$. The empirical CDF jumps at each distinct value, by 2/5 at the tied value 800, so at each point compare $F^*$ with the empirical CDF just before the jump, $F_5(x^-)$, and at it, $F_5(x)$:

| $x$ | $F^*(x)$ | $F_5(x^-)$ | $F_5(x)$ | $\lvert F^* - F_5(x^-)\rvert$ | $\lvert F_5(x) - F^*\rvert$ |
| :---: | :---: | :---: | :---: | :---: | :---: |
| 100 | 0.0952 | 0.0 | 0.2 | 0.0952 | 0.1048 |
| 800 | 0.5507 | 0.2 | 0.6 | **0.3507** | 0.0493 |
| 2,000 | 0.8647 | 0.6 | 0.8 | 0.2647 | 0.0647 |
| 3,000 | 0.9502 | 0.8 | 1.0 | 0.1502 | 0.0498 |

The largest gap is just below 800, where the empirical CDF is still 0.2 while $F^*(800) = 0.5507$:

$$
D = 0.5507 - 0.2 = 0.351
$$

The answer is **C**.

**Why not the others**

- **A** — 0.105 is the largest *signed* gap $F_5(x) - F^*(x)$, i.e. only the side where the data run ahead of the model; $D$ takes the absolute gap on both sides.
- **B** — 0.151 compares $F^*$ only with the step heights at each data point, $i/5$, never with the height just before the jump, which is where the largest gap here lies.
- **D** — 0.384 uses steps of 1/6, dividing by $n + 1$ as for smoothed empirical percentiles; the empirical CDF divides by $n$.
- **E** — 0.465 counts the tied 800 once, so the empirical CDF rises by only 1/5 there and never reaches 1; each observation adds $n^{-1}$, ties included.
