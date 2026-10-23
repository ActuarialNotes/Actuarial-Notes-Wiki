---
id: "faml-7-13"
exam: "Exam FAM"
topic: "Modified Net Premium Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Modified+Net+Premium+Policy+Value
  - Concepts/Policy+Value
  - Concepts/Endowment+Insurance
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:b4ae1976f0136e5854b894539c59b78157eeced6d83909a925de2bbd276d802d
  sources:
    - "SOA Exam FAM-L Sample Questions (October 2024), Q7.13, p.103, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (October 2024), Q7.13, p.71-72, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-13.md
---

For a fully discrete 30-year endowment insurance of 1000 on (40), you are given:

(i) Mortality follows the Standard Ultimate Life Table

(ii) $i = 0.05$

Calculate the full preliminary term (FPT) reserve for this policy at the end of year 10.

[A modified version of Question 14 on the Spring 2014 exam]

- A) 180
- B) 185
- C) 190
- D) 195
- E) 200

## Explanation

This first solution recognizes that the full preliminary term reserve at the end of year 10 for a 30 year endowment insurance on (40) is the same as the net premium policy value at the end of year 9 for a 29 year endowment insurance on (41). Then, using superscripts of FPT for full preliminary term reserve and NLP for net premium policy value to distinguish the symbols, we have

$$\begin{align*}
1000\,{}_{10}V^{FPT} &= 1000\,{}_{9}V^{NLP} \\
&= 1000(A_{50:\overline{20}|} - P_{41:\overline{29}|}\,\ddot{a}_{50:\overline{20}|}) \\
&= 1000[0.38844 - 0.01622(12.8428)] \\
&= 180
\end{align*}$$

or

$$\begin{align*}
&= 1000\left(1 - \frac{\ddot{a}_{50:\overline{20}|}}{\ddot{a}_{41:\overline{29}|}}\right) \\
&= 1000\left(1 - \frac{12.8428}{15.6640}\right) \\
&= 180
\end{align*}$$

where

$$\begin{align*}
\ddot{a}_{41:\overline{29}|} &= \ddot{a}_{41} - {}_{29}E_{41}\,\ddot{a}_{70} \\
&= 18.3403 - (0.2228726)(12.0083) \\
&= 15.6640
\end{align*}$$

$$\begin{align*}
A_{41:\overline{29}|} &= 1 - d(15.6640) \\
&= 0.254095
\end{align*}$$

$$\begin{align*}
{}_{29}E_{41} &= v^{29}\left(\frac{l_{70}}{l_{41}}\right) \\
&= (0.242946)\left(\frac{91{,}082.4}{99{,}285.9}\right) \\
&= 0.2228726
\end{align*}$$

$$\begin{align*}
P_{41:\overline{29}|} &= \frac{0.254095}{15.6640} \\
&= 0.01622
\end{align*}$$

Alternatively, working from the definition of full preliminary term reserves as having ${}_{1}V^{FPT} = 0$ and the discussion of modified net premium reserves in the Notation and Terminology Study Note, let $\alpha$ be the valuation premium in year 1 and $\beta$ be the valuation premium thereafter. Then (with some of the values taken from above),

$$\begin{align*}
\alpha &= 1000vq_{40} \\
&= 0.5019
\end{align*}$$

APV (valuation premiums) = APV (benefits)

$$\begin{align*}
\alpha + {}_{1}E_{40}(\ddot{a}_{41:\overline{29}|})\beta &= 1000A_{40:\overline{30}|} \\
0.5019 + 0.95188(15.6640)\beta &= 242.37 \\
\beta &= \frac{242.37 - 0.5019}{14.9102} \\
&= 16.22
\end{align*}$$

Where

$$\begin{align*}
{}_{1}E_{40} &= (1 - 0.000527)v \\
&= 0.95188
\end{align*}$$

$$\begin{align*}
A_{40:\overline{30}|} &= A_{40} + {}_{20}E_{40}({}_{10}E_{60})(1 - A_{70}) \\
&= 0.12106 + 0.36663(0.57864)(1 - 0.42818) \\
&= 0.24237
\end{align*}$$

$$\begin{align*}
{}_{10}V^{FPT} &= 1000A_{50:\overline{20}|} - \beta\ddot{a}_{50:\overline{20}|} \\
&= 1000(0.38844) - 16.22(12.8427) \\
&= 180
\end{align*}$$

The answer is **A**.
