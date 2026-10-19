---
id: "altam-048"
exam: "Exam ALTAM"
topic: "Projected Unit Credit Method"
learning_objective: "Pension Plans and Retirement Benefits"
difficulty: hard
type: multi-part
wiki_link:
  - Concepts/Projected+Unit+Credit+Method
  - Concepts/Traditional+Unit+Credit+Method
  - Concepts/Service+Table
  - Concepts/Actuarial+Accrued+Liability
  - Concepts/Normal+Cost
points: 9
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b013bfd4c8fa5fdfa7e31c016abd9dc9667d159a47ca08f0cbecc3552d8bee8f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-048.md
---

B is the sole member of a final average salary pension plan which is being valued on January 1, 2022. At the valuation date B is 63 years old and has 12 years of service. B's salary at the valuation date is 72,100. B's salary in 2021 was 70,000.

The pension plan benefits are as follows:

- The annual benefit is 1.6% of final average salary times years of service.
- Final average salary is the salary earned during the 12 months preceding retirement.
- Benefits are reduced by 0.4% for each month retirement precedes age 65.

The valuation at January 1, 2022 uses the projected unit cost (PUC) method with the following assumptions:

- (i) Salaries increase by 3% each January 1.
- (ii) Retirements before 65 occur in the middle of the year of age.
- (iii) Decrements before retirement follow the Standard Service Table.
- (iv) $i = 0.05$
- (v) Under post-retirement mortality $\ddot{a}_{63.5}^{(12)} = 13.5139$.

(This is Question 5 from the Spring 2022 Written Answer exam.)

## Part a (3 points)

- (i) Show that if B retires on July 1, 2022, the expected present value of B's retirement benefits at that time would be 178,200 to the nearest 50. You should calculate the value to the nearest 1.
- (ii) Show that the expected cost of mid-year retirement decrements in 2022 is 16,500 to the nearest 50. You should calculate the value to the nearest 1.

### Explanation

**(i)** The EPV at age 63.5 is

$$EPV = 12.5 \times 0.016 \times FAS_{63.5} \times (1 - 18 \times 0.004) \times \ddot{a}_{63.5}^{(12)}$$

where $FAS_{63.5} = 0.5 \times 72{,}100 + 0.5 \times 70{,}000 = 71{,}050$

$$EPV = 13{,}186.88 \times 13.5139 = 178{,}206.18$$

**(ii)** The EPV at 1 Jan 2022 of the mid-year exits is

$$\begin{align*}
\frac{r_{63}}{l_{63}}\,v^{0.5}(178{,}206.18) &= \frac{4{,}515.2}{47{,}579.3}\,1.05^{-0.5}(178{,}206.18) \\
&= 16{,}503.92 \quad \text{(or 16,503.90 if using 178,206)}
\end{align*}$$

## Part b (2 points)

You are also given that the projected accrued liability for B's retirement benefits on January 1, 2023, assuming that B is employed then, is 191,309.

- (i) Show that the actuarial liability of B's retirement benefits at January 1, 2022 is 167,150 to the nearest 10. You should calculate the value to the nearest 1.
- (ii) Calculate the normal cost for B's retirement benefits as of January 1, 2022.

### Explanation

**(i)** The projected actuarial liability (AL) at 1/1/2023 is the value at 1/1/2023 of the exit benefits for ages 64.5 and 65, based on 13 years of past service.

The AL at 1/1/2022 is the value at 1/1/2022 of the exit benefits for ages 63.5, 64.5 and 65, based on 12 years of past service. This gives us

$$\begin{align*}
AL &= \frac{12}{12.5} \times 16{,}503.92 + \frac{12}{13} \times v \times \frac{l_{64}}{l_{63}} \times 191{,}309 \\
&= \frac{12}{12.5} \times 16{,}503.92 + \frac{12}{13} \times 1.05^{-1} \times \frac{42{,}805.0}{47{,}579.3} \times 191{,}309 \\
&= 15{,}843.76 + 151{,}307.50 \\
&= 167{,}151.26
\end{align*}$$

**(ii)** The normal cost is the value at 1/1/2022 of the mid-year exits plus the value at 1/1/2022 of the projected 1/1/2023 AL minus the 1/1/2022 AL. That is

$$NC = 16{,}503.92 + 191{,}309 \times \frac{l_{64}}{l_{63}} \times v - 167{,}151.26 = 13{,}269.11$$

$$\begin{align*}
AL &= \frac{0.5}{12.5} \times 16{,}503.92 + \frac{1}{13} \times v \times \frac{l_{64}}{l_{63}} \times 191{,}309 \\
&= \frac{0.5}{12.5} \times 16{,}503.92 + \frac{1}{13} \times 1.05^{-1} \times \frac{42{,}805.0}{47{,}579.3} \times 191{,}309 \\
&= 660.16 + 12{,}608.96 \\
&= 13{,}269.11
\end{align*}$$

## Part c (2 points)

The pension trustees are considering changing to the traditional unit credit (TUC) funding method.

- (i) State with reasons whether the actuarial liability as of January 1, 2022, under the TUC funding method will be bigger or smaller than the actuarial liability as of January 1, 2022 under the PUC funding method.
- (ii) State with reasons whether the normal cost for 2022 under the TUC funding method will be bigger or smaller than the normal cost for 2022 under the PUC funding method.

### Explanation

**(i)** The AL using TUC will be <u>smaller</u> than the PUC AL.

- The TUC AL does not project the FAS to retirement, using the current FAS instead. As salaries are increasing, this means that the TUC AL is always less than the PUC AL, except at the very start of the member's employment, when service $n = 0$, so both ALs are 0, and at the very last retirement date, when the FAS is the same under both PUC and TUC.

**(ii)** The TUC NC will be <u>greater</u> than the PUC NC.

- The TUC normal cost each year starts below the PUC, but around 2/3 through the max employment period, the lines cross. In B's case, as they are near to retirement, the TUC NC will be greater than the PUC NC.

## Part d (2 points)

You are given the following additional information

- The plan is 100% funded at January 1 2022, under the PUC funding method.
- B retires on January 1, 2023.
- The earned interest rate during 2022 was 5.1%.
- The valuation as of January 1, 2023 uses the PUC funding method, based on the same assumptions as the previous year.
- The normal cost for 2022 was paid in full on January 1, 2022.
- $\ddot{a}_{64}^{(12)} = 13.3735$.

Calculate the gain or loss to the pension plan during 2022.

### Explanation

$$(AL_{2022} + NC_{2022})(1.051) = (167{,}151.26 + 13{,}269.11)(1.051) = 189{,}621.81$$

$$\begin{align*}
&13 \times 0.016 \times 72{,}100 \times (1 - 12 \times 0.004) \times 13.3735 \\
&= 14{,}276.95 \times 13.3735 \\
 &= 190{,}932.84
\end{align*}$$

$$189{,}621.81 - 190{,}932.84 = -1311.03$$

The plan made a loss of 1311 from the early retirement.

### Examiner Report

*Graders' Comments:* Very few candidates attempted this part. When a question is unfamiliar, returning to first principles is usually the best strategy.
