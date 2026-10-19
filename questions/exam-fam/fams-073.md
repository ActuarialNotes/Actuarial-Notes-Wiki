---
id: "fams-073"
exam: "Exam FAM"
topic: "Bornhuetter-Ferguson Method"
learning_objective: "Pricing and Reserving for Short-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Bornhuetter-Ferguson+Method
  - Concepts/IBNR
  - Concepts/Cumulative+Development+Factor
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7669ce6871669ec48fa66134d5c1d374fe052f8dd60571526695b7751c474ccb
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-073.md
---

You are given:

i) An insurance company was formed to write workers compensation business in CY1.

ii) Earned premium in CY1 was 1,000,000.

iii) Earned premium growth through CY3 has been constant at 20% per year (compounded).

iv) The expected loss ratio for AY1 is 60%.

v) As of December 31, CY3, the company's reserving actuary believes the expected loss ratio has increased two percentage points each accident year since the company's inception.

vi) Selected reported loss development factors are as follows:

| | |
|---|---|
| 12 to 24 months | 1.500 |
| 24 to 36 months | 1.336 |
| 36 to 48 months | 1.126 |
| 48 to 60 months | 1.057 |
| 60 to 72 months | 1.050 |
| 72 to ultimate | 1.000 |

Calculate the total IBNR reserve as of December 31, CY3 using the Bornhuetter-Ferguson method.

- A) 964,000
- B) 966,000
- C) 968,000
- D) 970,000
- E) 972,000

## Explanation

CY1: ELR = 60%, earned premium = 1,000,000, expected losses $= 0.6(1{,}000{,}000) = 600{,}000$.

$$\begin{align*}
\text{Cumulative development factor (CDF)} &= (1.05)(1.057)(1.126) \\
&= 1.250 \\
\text{Reserve using BF method} &= 600{,}000(1 - 1/1.250) \\
&= 120{,}000
\end{align*}$$

CY2: ELR = 62%, earned premium = 1,200,000, expected losses $= 0.62(1{,}200{,}000) = 744{,}000$.

$$\begin{align*}
\text{CDF} &= (1.05)(1.057)(1.126)(1.336) \\
&= 1.670 \\
\text{Reserve using BF method} &= 744{,}000(1 - 1/1.670) \\
&= 298{,}491
\end{align*}$$

CY3: ELR = 64%, earned premium = 1,440,000, expected losses $= 0.64(1{,}440{,}000) = 921{,}600$.

$$\begin{align*}
\text{CDF} &= (1.05)(1.057)(1.126)(1.336)(1.5) \\
&= 2.504 \\
\text{Reserve using BF method} &= 921{,}600(1 - 1/2.504) \\
&= 553{,}549
\end{align*}$$

$$\begin{align*}
\text{Total reserve} &= 120{,}000 + 298{,}491 + 553{,}549 \\
&= 972{,}040.
\end{align*}$$

The answer is **E**.
