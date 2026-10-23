---
id: "fams-072"
exam: "Exam FAM"
topic: "Bornhuetter-Ferguson Method"
learning_objective: "Pricing and Reserving for Short-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Bornhuetter-Ferguson+Method
  - Concepts/Development+Factor
  - Concepts/Cumulative+Development+Factor
  - Concepts/Development+Triangle
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:d66c281b2ba49825b7205cf0979570633eac3828a58aa84a5d3ee32d8961eca6
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q72, p.57, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q72, p.30, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-072.md
---

You are given:

i)

| Accident Year | Cumulative Paid Losses through Development Year 0 | 1 | 2 | 3 | 4 | 5 | Earned premium |
|---|---|---|---|---|---|---|---|
| AY4 | 1,400 | 5,200 | 7,300 | 8,800 | 9,800 | 9,800 | 18,000 |
| AY5 | 2,200 | 6,400 | 8,800 | 10,200 | 11,500 | | 20,000 |
| AY6 | 2,500 | 7,500 | 10,700 | 12,600 | | | 25,000 |
| AY7 | 2,800 | 8,700 | 12,900 | | | | 26,000 |
| AY8 | 2,500 | 7,900 | | | | | 27,000 |
| AY9 | 2,600 | | | | | | 28,000 |

ii) The expected loss ratio for each Accident Year is 0.550.

Calculate the total loss reserve using the Bornhuetter-Ferguson method and three-year arithmetic average paid loss development factors.

- A) 21,800
- B) 22,500
- C) 23,600
- D) 24,700
- E) 25,400

## Explanation

The development factors are:

$$\begin{align*}
0-1: \quad &\frac{1}{3}\left(\frac{7{,}900}{2{,}500} + \frac{8{,}700}{2{,}800} + \frac{7{,}500}{2{,}500}\right) \\
&= 3.089 \\
1-2: \quad &\frac{1}{3}\left(\frac{12{,}900}{8{,}700} + \frac{10{,}700}{7{,}500} + \frac{8{,}800}{6{,}400}\right) \\
&= 1.428 \\
2-3: \quad &\frac{1}{3}\left(\frac{12{,}600}{10{,}700} + \frac{10{,}200}{8{,}800} + \frac{8{,}800}{7{,}300}\right) \\
&= 1.181 \\
3-4: \quad &\frac{1}{2}\left(\frac{11{,}500}{10{,}200} + \frac{9{,}800}{8{,}800}\right) \\
&= 1.1205 \\
4-5: \quad &1
\end{align*}$$

The cumulative factors are 0-5: 5.8372, 1-5: 1.8897, 2-5: 1.3233, 3-5: 1.1205; 4-5: 1.

The B-F reserve is

$$\begin{align*}
&[25{,}000(1 - 1/1.1205) + 26{,}000(1 - 1/1.3233) + 27{,}000(1 - 1/1.8897) + 28{,}000(1 - 1/5.8372)](0.55) \\
&= 24{,}726.
\end{align*}$$

The answer is **D**.
