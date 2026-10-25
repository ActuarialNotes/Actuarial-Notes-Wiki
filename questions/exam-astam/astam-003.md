---
id: "astam-003"
exam: "Exam ASTAM"
topic: "Bornhuetter-Ferguson Method"
learning_objective: "Reserving and Pricing for Short-Term Insurance Coverages"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Expected+Loss+Method
  - Concepts/Earned+Premium
  - Concepts/Unearned+Premium
  - Concepts/Chain+Ladder+Method
  - Concepts/Bornhuetter-Ferguson+Method
  - Concepts/Unpaid+Claims
points: 0
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-25
  last_checked_by: agent:validate-v1
  content_hash: sha256:6b598f3a67d514fbcfcde64560bec5c3a80ebd65d7484e32ed4cf5c1dc5e238d
  sources:
    - "SOA ASTAM Sample Questions (version of Feb. 23, 2026), Q3, pp.6-7, sha256:0294cf4e8717191cda2747e7a6bb49fbb5e2d08f2d281ec979e670621de74ab4 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/questions/february-2024-astam-questions.pdf"
    - "SOA ASTAM Solutions to Sample Questions, Q3, pp.7-8, sha256:c4206394603cf205da0668d40333bee5aaa6e3dadcaa241fdb03e5488a1ba4e1 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/february-2024-astam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-003.md
---

During 2021, AAA Insurance collects the following premium amounts:

| Month | January | March | May | July |
|---|---|---|---|---|
| Premium Collected | 1,600 | 1,800 | 1,200 | 1,200 |

- All premiums are paid on the first day of the month and all premiums are annual premiums.
- The unearned premium reserve at 31 Dec 2020 was 1,300.
- The company expects a loss ratio of 80%.
- During 2021, the company paid losses for claims incurred in 2021 of 2,500.

## Part a

Use the loss ratio method to determine the outstanding claim reserve for accident year 2021 for this coverage that should be held on 31 Dec 2021.

### Explanation

- The earned part of the premium paid in January is 1,600
- The earned part of the premium paid in March is $10/12 \times 1{,}800 = 1{,}500$
- The earned part of the premium paid in May is $8/12 \times 1{,}200 = 800$
- The earned part of the premium paid in July is $6/12 \times 1{,}200 = 600$
- The total earned premium paid in 2021 is 4,500
- The premium paid in 2020 and earned in 2021 is 1,300
- The total earned premium in 2021 is 5,800
- Expected total losses are $0.80 \times 5{,}800 = 4{,}640$

$$\text{Reserve} = \text{Expected total losses} - \text{Claims Already Paid} = 4{,}640 - 2{,}500 = 2{,}140$$

## Part b

The insurer has the following Paid Claims triangle for this coverage. There is no further development after year 5.

Cumulative Loss Payments by Development Year

| Accident Year | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| 2016 | 1,000 | 1,500 | 1,700 | 1,800 | 1,850 | 1,875 |
| 2017 | 1,100 | 1,750 | 1,775 | 1,825 | 1,870 | |
| 2018 | 1,200 | 1,900 | 2,200 | 2,350 | | |
| 2019 | 1,500 | 2,200 | 2,500 | | | |
| 2020 | 2,000 | 2,900 | | | | |
| 2021 | 2,500 | | | | | |

- (i) The loss development factor for the period from year 0 to year 1 is 1.51 to two decimal places. Calculate the loss development factor to five decimal places.
- (ii) Calculate the outstanding claim reserve on December 31, 2021.
- (iii) Determine the total amount of claims paid in 2021.

### Explanation

$$\hat{f}_1 = \frac{1500 + 1750 + 1900 + 2200 + 2900}{1000 + 1100 + 1200 + 1500 + 2000} = 1.50735$$

$$\hat{f}_2 = \frac{1700 + 1775 + 2200 + 2500}{1500 + 1750 + 1900 + 2200} = 1.11224$$

$$\hat{f}_3 = \frac{1800 + 1825 + 2350}{1700 + 1775 + 2200} = 1.05286$$

$$\hat{f}_4 = \frac{1850 + 1870}{1800 + 1825} = 1.02621$$

$$\hat{f}_5 = \frac{1875}{1850} = 1.01351$$

| AY | 0 | 1 | 2 | 3 | 4 | 5 | OCR |
|---|---|---|---|---|---|---|---|
| 16 | 1,000 | 1,500 | 1,700 | 1,800 | 1,850 | 1,875 | |
| 17 | 1,100 | 1,750 | 1,775 | 1,825 | 1,870 | 1,895.3 | 25.3 |
| 18 | 1,200 | 1,900 | 2,200 | 2,350 | | 2,444.2 | 94.2 |
| 19 | 1,500 | 2,200 | 2,500 | | | 2,737.7 | 237.6 |
| 20 | 2,000 | 2,900 | | | | 3,532.1 | 632.1 |
| 21 | 2,500 | | | | | 4,589.8 | 2089.8 |

The total OCR is 3,079.0

The total sum paid in 2021 is:

$$\begin{aligned}
&2{,}500 + (2{,}900 - 2{,}000) + (2{,}500 - 2{,}200) \\
&\quad + (2{,}350 - 2{,}200) + (1{,}870 - 1{,}825) \\
&\quad + (1{,}875 - 1{,}850) = 3{,}920
\end{aligned}$$

## Part c

For the claims from accident year 2021, determine the reserves as of 31 Dec 2021 using the Bornhuetter-Ferguson method, where the prior estimate is the outstanding claim reserve using the loss ratio method.

### Explanation

The BF estimate of projected 2021 AY claims is

$$\tilde{C}_{2021,5} = \hat{\beta}_0\,\hat{C}_{2021,5} + (1 - \hat{\beta}_0)\,\mu_{2021}$$

$$\hat{\beta}_0 = \frac{1}{\hat{f}_0 \times \hat{f}_1 \times \cdots \hat{f}_4} = 0.54469 \text{ (as printed)}$$

$\hat{C}_{2021,5}$ is the Chain Ladder estimated projected claims $= 4589.8$

$\mu_{2021}$ is the LR estimated projected claims $= 4640.0$

$$\Rightarrow \tilde{C}_{2021,5} = 4{,}612.7 \Rightarrow \text{OCR for AY } 2021 = 4{,}612.7 - 2500 = 2112.7$$

## Part d

Explain briefly one advantage and one disadvantage of the Bornhuetter-Ferguson method, compared with the Chain Ladder approach.

### Explanation

BF Advantage – much less reliance on a single data point in the most recent AY

BF Disadvantage – relies on subjective estimate of loss ratio (and adequacy of premiums).
