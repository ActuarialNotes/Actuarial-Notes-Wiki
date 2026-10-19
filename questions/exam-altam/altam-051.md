---
id: "altam-051"
exam: "Exam ALTAM"
topic: "Universal Life Insurance"
learning_objective: "Universal Life Insurance"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Universal+Life+Insurance
  - Concepts/Expected+Value
  - Concepts/Random+Variable
points: 10
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1943f6a9416dea4e669b73c0fc6e4638afd9c44a625a4247c39f2a2ed4c5d69b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-051.md
---

Person D buys a Type B universal life contract of 100,000. You are given:

(i)

| Policy Year $k$ | Annual Premium | Annual Cost of Insurance Rate per 1000 of Insurance | Percent of Premium Charge | Annual Expense Charge | Surrender Charge |
|---|---|---|---|---|---|
| 1 | 1000 | –– | 60% | –– | –– |
| 2 | $P_2$ | 2 | 10% | 10 | 200 |
| 3 | $P_3$ | 3 | 10% | 10 | 100 |
| $k \ge 4$ | $P_k$ | $k$ | 5% | 10 | 0 |

- (ii) The credited interest rate is $i = 0.06$.
- (iii) D's account value at the end of year 1 is 165.
- (iv) Except as indicated, there are no deaths or surrenders.

(This is Question 5 from the Fall 2015 Written Answer exam.)

## Part a (2 points)

Show that if $P_2$ were $1000$, D's account value at the end of year 2 would be 920 to the nearest 10. You should calculate the account value to the nearest 1.

### Explanation

$$AV_2 = \left(AV_1 + 0.9P_2 - 10 - 200v\right)(1.06) = 918.3$$

## Part b (2 points)

D's account value at the end of year 3 can be expressed as $aP_2 + bP_3 + c$. Calculate $a$, $b$, and $c$.

### Explanation

Now

$$AV_2 = \left(165 + 0.9P_2 - 10\right)(1.06) - 200 = 0.954P_2 - 35.7$$

$$\begin{align*}
AV_3 &= \left(AV_2 + 0.9P_3 - 10\right)(1.06) - 300 \\
&= \left(0.954P_2 - 35.7 + 0.9P_3 - 10\right)(1.06) - 300 \\
&= 1.0112P_2 + 0.954P_3 - 348.4
\end{align*}$$

$$\Rightarrow a = 1.0112;\ b = 0.954;\ c = -348.4$$

## Part c (4 points)

In year 2, D pays a premium of 1000 with probability 0.6, or 200 with probability 0.4.

If D paid 1000 in year 2, then in year 3 D will pay either 1000 with probability 0.6, or 200 with probability 0.4.

If D paid 200 in year 2, then in year 3 D will pay either 1000 with probability 0.2, or 200 with probability 0.8

- (i) Calculate the expected death benefit payable at the end of year 3, if D dies then.
- (ii) Calculate the expected surrender benefit payable at the end of year 3, if D surrenders the contract then.

### Explanation

There are four possible outcomes for $AV_3$, and hence for the death benefit and surrender values. Note that the surrender value cannot be negative.

| P<sub>1</sub> | P<sub>2</sub> | AV<sub>3</sub> | DB<sub>3</sub> | SV<sub>3</sub> | Prob |
|---|---|---|---|---|---|
| 1000 | 1000 | 1616.8 | 101,616.8 | 1516.8 | 0.36 |
| 1000 | 200 | 853.6 | 100,853.6 | 753.6 | 0.24 |
| 200 | 1000 | 807.8 | 100,807.8 | 707.8 | 0.08 |
| 200 | 200 | 44.6 | 100,044.6 | 0 | 0.32 |

So

- (i) $\mathrm{E}[DB_3] = 101{,}616.8 \times 0.36 + \ldots + 100{,}044.6 \times 0.32 = 100{,}866$
- (ii) $\mathrm{E}[SV_3] = 1516.8 \times 0.36 + \ldots + 0 \times 0.32 = 783.5$

### Examiner Report

*Graders' Comments:* In part (c)(ii), many candidates subtracted the surrender charge from $\mathrm{E}[AV_3]$, which does not work because of the floor of 0 on the surrender value.

## Part d (2 points)

D's identical twin, M, buys a contract identical to D's. If M pays 1000 every year, M's account value at the end of year 10 will be 5114.

M will pay premiums of 1000 in 9 of the first 10 years. M will pay no premium in one year, with the year of no premium equally likely to be year 3 or year 10.

Calculate M's expected surrender value at the end of year 10.

### Explanation

Let $AV_{10}^{(1)} = 5114$ denote the account value at time 10 if all the premiums are paid, $AV_{10}^{(2)}$, and $AV_{10}^{(3)}$, denote the account values if the 3<sup>rd</sup> premium and the 10<sup>th</sup> premium, respectively, are omitted. Then

$$\begin{align*}
AV_{10}^{(2)} &= AV_{10}^{(1)} - 1000(0.9)(1.06)^8 \\
              &= 3679.5 \\
AV_{10}^{(3)} &= AV_{10}^{(1)} - 1000(0.95)(1.06) \\
              &= 4107.0
\end{align*}$$

$$\Rightarrow \mathrm{E}[AV_{10}] = 0.5 \times 3679.5 + 0.5 \times 4107.0 = 3893.3$$

### Examiner Report

*Graders' Comments:* Many candidates omitted part (d), but those who attempted it scored well.
