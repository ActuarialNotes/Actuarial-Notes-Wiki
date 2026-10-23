---
id: "altam-2023f-q6"
exam: "Exam ALTAM"
topic: "Traditional Unit Credit Method"
learning_objective: "Pension Plans and Retirement Benefits"
difficulty: hard
type: multi-part
year: 2023
session: Fall
wiki_link:
  - Concepts/Traditional+Unit+Credit+Method
  - Concepts/Defined+Benefit+Plan
  - Concepts/Actuarial+Accrued+Liability
  - Concepts/Normal+Cost
  - Concepts/Service+Table
points: 10
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:142f0efebcdf4937fe7c42496f70cbe05b6eb3f653cdc2ed1cf1313f21898a21
  sources:
    - "SOA Exam ALTAM Fall 2023 — exam (question paper), Q6, pp.11-12, sha256:c162b6a75c9ccaedf38fcc9f7f4debf83abcf768f1e6ee6ff0d84e89e3098bc7 — https://www.soa.org/globalassets/assets/files/edu/2023/fall/exams/fall-2023-altam-exam.pdf"
    - "SOA Exam ALTAM Fall 2023 — model solutions and examiners' comments, Q6, pp.13-16, sha256:df2ab0d9bc15ea197487448a071c8d909aa27d14841c082505cbb63358a6b93b — https://www.soa.org/globalassets/assets/files/edu/2023/fall/solutions/altam-fall-2023-solutions.pdf"
    - "SOA Exam ALTAM Fall 2023 — exam Excel workbook (tables), sheet 'Service Table', sha256:a6d6a2aeb020d4cdf6bb016971ae98037e97110ca2e16c11467b2b4bbbccda0a — https://www.soa.org/globalassets/assets/files/edu/2023/fall/exams/fall-2023-altam-exam.xlsx"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-2023f-q6.md
---

You are the actuary for a defined benefit pension plan that offers a Final Average Salary (FAS) pension. The final average salary is the average of the earnings in the final two years, and the pension is paid as a whole life annuity due, payable monthly from retirement. The accrual rate is 2%.

You are given the following valuation assumptions:

(i) Decrements are assumed to follow the Standard Service Table up to age 61. All lives in force at age 61 retire immediately.

(ii) All retirements not occurring at exact ages 60 or 61 are assumed to occur at age 60.5.

(iii) $i = 0.05$

(iv) Under the post-retirement mortality assumptions: $\ddot{a}_{60}^{(12)} = 14.441$ $\quad \ddot{a}_{60.5}^{(12)} = 14.315$ $\quad \ddot{a}_{61}^{(12)} = 14.186$

(v) The valuation date is 12/31/2022.

(vi) There were no salary increases in 2021 or 2022.

(vii) Salaries increased by 10% on 1/1/2023.

(viii) The valuation uses the Traditional Unit Credit funding method.

The plan has two members. Their information at the valuation date is given in the following table:

| Employee | Age | Number of years of service | FAS at valuation |
|---|---|---|---|
| A | 35 | 10 | 60,000 |
| B | 60 | 30 | 100,000 |

## Part a (4 points)

(i) Show that the Actuarial Liability for Employee A's retirement benefits is 21,000 to the nearest 1,000. You should calculate the value to the nearest 1.

(ii) You are given that Employee B did not retire at exact age 60. Show that the Actuarial Liability for Employee B's retirement benefits is 810,000 to the nearest 1,000. You should calculate the value to the nearest 1.

### Explanation
Let $r_{60x}$ denote the decrement table values for age retirements at exact age 60, and $r_{60+}$ denotes values for age retirements between age 60 and 61, excluding exact age retirements.

**(i)**

$$
\begin{align*}
AL_A &= 0.02 \times FAS \times svc\left(v^{25}\frac{r_{60x}}{l_{35}}\ddot{a}_{60}^{(12)} + v^{25.5}\frac{r_{60+}}{l_{35}}\ddot{a}_{60.5}^{(12)} + v^{26}\frac{l_{61}}{l_{35}}\ddot{a}_{61}^{(12)}\right) \\
&= 0.02 \times 60{,}000 \times 10\left(\begin{aligned} &1.05^{-25} \times \tfrac{27{,}925.61}{218{,}833.88} \times 14.441 \\ &+ 1.05^{-25.5} \times \tfrac{6{,}187.56}{218{,}833.88} \times 14.315 \\ &+ 1.05^{-26} \times \tfrac{58{,}699.91}{218{,}833.88} \times 14.186 \end{aligned}\right) \\
&= 12{,}000\left(\begin{aligned} &0.295303 \times 0.127611 \times 14.441 \\ &+ 0.288186 \times 0.028275 \times 14.315 \\ &+ 0.281241 \times 0.268240 \times 14.186 \end{aligned}\right) \\
&= 12{,}000(0.544193 + 0.116646 + 1.070190) \\
&= 6{,}530.32 + 1{,}399.75 + 12{,}842.28 \\
&= 20{,}772.35
\end{align*}
$$

**(ii)**

$$
\begin{align*}
AL_B &= 0.02 \times FAS \times svc\left(v^{0.5}\frac{r_{60+}}{l_{60+}}\ddot{a}_{60.5}^{(12)} + v\frac{l_{61}}{l_{60+}}\ddot{a}_{61}^{(12)}\right) \\
&= 0.02 \times 100{,}000 \times 30\left(\begin{aligned} &1.05^{-0.5} \times \tfrac{6{,}187.56}{65{,}159.77} \times 14.315 \\ &+ 1.05^{-1} \times \tfrac{58{,}699.91}{65{,}159.77} \times 14.186 \end{aligned}\right) \\
&= 60{,}000\left(\begin{aligned} &0.975900 \times 0.094960 \times 14.315 \\ &+ 0.952381 \times 0.900861 \times 14.186 \end{aligned}\right) \\
&= 60{,}000(1.326590 + 12.171064) \\
&= 79{,}595.38 + 730{,}263.85 \\
&= 809{,}859.22
\end{align*}
$$

### Examiner Report
Actuarial liabilities were calculated well in general. The key issue was with using the Standard Service Table correctly for the person who had not retired at exact age 60.

## Part b (4 points)

(i) (1 point) Calculate the Normal Contribution for Employee A's retirement benefits.

(ii) (2.5 points) Calculate the Normal Contribution for Employee B's retirement benefits.

(iii) (0.5 points) The Aggregate Normal Contribution Rate is the total Normal Contribution divided by the total annual salary rate as of 1/1/2023.

Calculate the Aggregate Normal Contribution Rate for the plan.

### Explanation
The FAS for each life is the same as the current salary, as there have been no salary increases over the past 2 years.

**(i)**

$$
NC_A = AL_A\left(\frac{FAS_{36}}{FAS_{35}}\,\frac{11}{10} - 1\right)
$$

$$
FAS_{36} = \tfrac{1}{2}(60{,}000 + 60{,}000 \times 1{,}1) = 63{,}000 \text{ (as printed)}
$$

$$
NC_A = 20{,}772.35\left(\frac{63{,}000}{60{,}000} \times \frac{11}{10} - 1\right) = 3{,}219.71
$$

or (instead of shortcut admissible as there are no midyear exits)

$$
\begin{align*}
NC_A &= v\frac{l_{36}}{l_{35}}AL_A(t+1) + apv(\text{midyear benefits}) - AL_A(t) \\
&= v\frac{l_{36}}{l_{35}}AL_A(t+1) - AL_A(t) \quad \text{(since there are no midyear benefits)}
\end{align*}
$$

$$
FAS_{36} = \tfrac{1}{2}(60{,}000 + 60{,}000 \times 1{,}1) = 63{,}000 \text{ (as printed)}
$$

$$
\begin{align*}
AL_A(t+1) &= 0.02 \times FAS_{36} \times svc \times \left(v^{24}\frac{r_{60x}}{l_{36}}\ddot{a}_{60}^{(12)} + v^{24.5}\frac{r_{60+}}{l_{36}}\ddot{a}_{60.5}^{(12)} + v^{25}\frac{l_{61}}{l_{36}}\ddot{a}_{61}^{(12)}\right) \\
&= 0.02 \times 63{,}000 \times 11\left(\begin{aligned} &1.05^{-24} \times \tfrac{27{,}925.61}{207{,}871.81} \times 14.441 \\ &+ 1.05^{-24.5} \times \tfrac{6{,}187.56}{207{,}871.81} \times 14.315 \\ &+ 1.05^{-25} \times \tfrac{58{,}699.91}{207{,}871.81} \times 14.186 \end{aligned}\right) \\
&= 13{,}860\left(\begin{aligned} &0.310068 \times 0.134341 \times 14.441 \\ &+ 0.302595 \times 0.029766 \times 14.315 \\ &+ 0.295303 \times 0.282385 \times 14.186 \end{aligned}\right) \\
&= 13{,}860(0.601535 + 0.128937 + 1.182958) \\
&= 8337{,}28 + 1787{,}07 + 16{,}395.80 \text{ (as printed)} \\
&= 26{,}520.14
\end{align*}
$$

$$
NC_A = 1.05^{-1} \times \frac{207{,}871.81}{218{,}833.88} \times 26{,}520.14 + 0 - 20{,}772.35 = 3{,}219.71
$$

**(ii)**

$$
NC_B = v\frac{l_{61}}{l_{60+}}AL_B(t+1) + apv(\text{midyear benefits}) - AL_B(t)
$$

$$
FAS_{61} = \tfrac{1}{2}(100{,}000 + 100{,}000 \times 1{,}1) = 105{,}000 \text{ (as printed)}
$$

$$
\begin{align*}
AL_B(t+1) &= 0.02 \times FAS_{61} \times svc \times \ddot{a}_{61}^{(12)} \\
&= 0.02 \times 105{,}000 \times 31 \times 14.186 \\
&= 65{,}100 \times 14.186 \\
&= 923{,}508.60
\end{align*}
$$

$$
FAS_{60.5} = \tfrac{1}{2}(100{,}000 \times 1.5 + 100{,}000 \times 1{,}1 \times 0.5) = 102{,}500 \text{ (as printed)}
$$

$$
\begin{align*}
apv(\text{midyear benefits}) &= 0.02 \times FAS_{60.5} \times svc \times v^{0.5} \times \frac{r_{60+}}{l_{60+}} \times \ddot{a}_{60.5}^{(12)} \\
&= 0.02 \times 102{,}500 \times 30.5 \times 1.05^{-0.5} \times \frac{6{,}187.56}{65{,}159.77} \times 14.315 \\
&= 62{,}525 \times 0.975900 \times 0.094960 \times 14.315 \\
&= 62{,}525 \times 1.326590 \\
&= 82{,}945.01
\end{align*}
$$

$$
\begin{align*}
NC_B &= 1.05^{-1} \times \frac{58{,}699.91}{65{,}159.77} \times 923{,}508.60 + 82{,}945.01 - 809{,}859.22 \\
&= 65{,}422.07
\end{align*}
$$

**(iii)**

$$
NC\%_{agg} = \frac{NC_A + NC_B}{Sal_A + Sal_B} = \frac{3{,}219.71 + 65{,}422.07}{66{,}000 + 110{,}000} = 39.00\%
$$

### Examiner Report
For the normal cost, if a shortcut is used, the right one needs to be used – beware PUC versus TUC – and it needs to be applied correctly – TUC requires the FAS (not the annual salary) to be brought ahead one year. However, shortcuts do not work if there are midyear exits. It is advisable to master the first principles: they will work regardless of the method, whether there are midyear exits or not. Besides, midyear exits are meant to capture exits in the coming year, not all exits assumed to happen halfway through the year. Also, midyear exits do accrue 0.5 year in service and their FAS needs to be revised, just like the actuarial liability one year hence accrues 1 year in service along with a revised FAS.

## Part c (2 points)

A new entrant who is age 35 joins the plan on 12/31/2022.

(i) State with reasons whether the plan's total Actuarial Liability for retirement benefits would increase, decrease, or stay the same.

(ii) State with reasons whether the Aggregate Normal Contribution Rate for retirement benefits would increase, decrease, or stay the same.

### Explanation
**(i)**

- The plan's total AL for retirement benefits would stay the same.
- The AL values accrued benefits, and the new entrant has no past (pensionable) service and therefore no accrued benefits.

**(ii)**

- The aggregate normal contribution rate would decrease.
- The aggregate normal contribution rate is a weighted average of individual normal contribution rates, the weights being the individual salary rates. The new entrant's normal contribution rate is lower than that of either current employee because he is age 35, equal to the lower of 35 and 60, and has no past service, unlike employees A and B.

### Examiner Report
When a question gives you a choice, it is wise to at least answer with one of the choices given. Then, the reasons have to match the choice! Comments on changes in absolute terms (in total actuarial liability) are generally well handled, whereas comments on changes in relative terms (in aggregate normal contribution rate) are generally weak. It helps to see the aggregate rate as a weighted average of individual rates. Many candidates correctly mentioned that the denominator increased, but the numerator increases as well. For new entrants, the actuarial liability is nil, but not the normal cost. To answer this question, it helps to remember that, with TUC, the normal cost as a % of salary increases a lot throughout a worker's career, as every additional year adds service and revalues all prior years of service.
