---
id: "altam-030"
exam: "Exam ALTAM"
topic: "Profit Testing"
learning_objective: "Profit Analysis"
difficulty: hard
type: multi-part
wiki_link:
  - Concepts/Profit+Testing
  - Concepts/Deferred+Annuity
  - Concepts/Equivalence+Principle
  - Concepts/Lapse
  - Concepts/Net+Present+Value
  - Concepts/Annuity+Contract
points: 9
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:6535af943eeb92df0f08f3e80011970ccc940b3fc5212c17242535d6e4e06fd3
  sources:
    - "SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q30, pp.55-56 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf"
    - "SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q30, pp.59-60 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-030.md
---

An insurer issues a 20-year deferred annuity contract to (65). Level annual premiums will be paid for a maximum of 10 years. On survival to age 85, an annuity of 36,000 per year is paid annually in advance. If the life dies after 10 years, but before the first annuity payment, the premiums paid are returned without interest, at the end of the year of death. There is no payment on death in the first 10 years.

You are given the following premium assumptions:

(i) Mortality follows the Standard Ultimate Life Table.

(ii) Initial expenses are 1000 plus 30% of the premium.

(iii) Expenses of 5% of the premium are payable with the second and subsequent premiums.

(iv) Renewal expenses of 100 per year are payable annually in advance throughout the term of the contract, starting in the second year.

(v) $i = 0.05$

(vi) Premiums are calculated using the equivalence principle.

## Part a (2 points)

Show that the premium is 10,260 to the nearest 10. You should calculate the premium to the nearest 0.1.

### Explanation
EPV(Premiums) = EPV(return of premiums) + EPV(payments) + EPV(expenses)

$$P\left(0.95\,\ddot{a}_{65:\overline{10}|} - 0.25\right) = (10P)\,{}_{10}E_{65}\,A^{\;1}_{75:\overline{10}|} + (36{,}000)\,{}_{20}E_{65}\,\ddot{a}_{85} + 900 + 100\,\ddot{a}_{65}$$

$$P = \frac{36{,}000(0.24381)(6.7993) + 900 + 100(13.5498)}{(0.95)(7.8435) - 0.25 - (10)(0.55305)(0.65142 - 0.44085)} = 10{,}259.385$$

## Part b (4 points)

The insurer profit tests the policy. You are given the following assumptions for the profit test:

(i) Mortality rates are 90% of the mortality rates in the Standard Ultimate Life Table.

(ii) For the first five years of the contract, 3% of policyholders who survive to each year end lapse at that time. There are no lapses after the first five years.

(iii) Pre-contract expenses are 7000.

(iv) Maintenance expenses start at 70 at the start of the first year, and increase at a rate of 2% per year.

(v) Premium expenses are 5% of each premium, including the first.

(vi) The insurer's funds earn 7% interest each year

(vii) The hurdle rate is 10%.

(viii) Reserves at times 0, 1, 11, 12, 29 and 30 are

$$
\begin{array}{ll}
{}_0V = 500 & {}_1V = 10{,}150 \\
{}_{11}V = 143{,}035 & {}_{12}V = 151{,}210 \\
{}_{29}V = 155{,}745 & {}_{30}V = 146{,}275
\end{array}
$$

Calculate $\Pr_t$ for $t = 0$, 1, 12 and 30.

### Explanation
$$Pr_0 = -E_0 - {}_0V = -7000 - 500 = -7500$$

$$Pr_t = {}_{t-1}V + CF_t - E_t + I_t - EDB_t - E\,{}_tV; \qquad t \ge 1$$

where $CF_t$ is the net cash flow received by the insurer at time $t$.

$$
CF_t = \begin{cases} P = 10{,}259.385 & t = 0, 1, \ldots, 9 \\ 0 & t = 10, 11, \ldots, 19 \\ -36{,}000 & t = 20, 21, \ldots \end{cases}
$$

$$
\begin{align*}
Pr_1 &= \left({}_0V + P - (0.05P + 70)\right)(1+i) - 0 - (1 - 0.03)(1 - 0.9\,q_{65})\,{}_1V \\
&= \left(500 + (0.95)(10{,}259.385) - 70\right)(1.07) - (0.9648362)(10{,}150) \\
&= 1{,}095.68
\end{align*}
$$

$$
\begin{align*}
Pr_{12} &= \left({}_{11}V - 70(1.02)^{11}\right)(1+i) - 0.9q_{76}(10)(10{,}259.385) - (1-0)(1 - 0.9\,q_{76})\,{}_{12}V \\
&= \left(143{,}035 - 70(1.02)^{11}\right)(1.07) - 0.0186012(102{,}593.85) - (0.9813988)(151{,}210) \\
&= 2{,}648.64
\end{align*}
$$

$$
\begin{align*}
Pr_{30} &= \left({}_{29}V - 36{,}000 - 70(1.02)^{29}\right)(1+i) - 0 - (1-0)(1 - 0.9\,q_{94})\,{}_{30}V \\
&= \left(155{,}745 - 36{,}000 - 70(1.02)^{29}\right)(1.07) - (0.8595532)(146{,}275) \\
&= 2{,}262.995
\end{align*}
$$

## Part c (3 points)

The insurer calculates the NPV for each policy issued as 8860. Calculate the NPV at the start of the second year of future cashflows for each policy in force at that time.

(This is Question 6 from the Fall 2019 Written Answer exam.) (Part (a) is covered by the FAM-L exam.)

### Explanation
Let $NPV_1$ be the EPV at the start of year 2 (time 1) of future emerging profits per policy in force.

$$NPV_1 = Pr_2\,v^1_{0.1} + {}_1p^{00}_{x+1}\,Pr_3\,v^2_{0.1} + {}_2p^{00}_{x+1}\,Pr_4\,v^3_{0.1} + \ldots$$

$$NPV = \sum_{t=0}^{n} \pi_t\,v^t_{0.1} = 8860$$

where $\pi_0 = Pr_0$ and $\pi_t = {}_{t-1}p^{00}_x\,Pr_t$, $t \ge 1$.

$$
\begin{align*}
NPV &= Pr_0 + Pr_1\,v_{0.1} + \left({}_1p^{00}_x\,Pr_2\,v^2_{0.1} + {}_2p^{00}_x\,Pr_3\,v^3_{0.1} + \ldots\right) \\
&= Pr_0 + Pr_1\,v_{0.1} + (\text{EPV at time 0 of profits emerging in years 2, 3, \ldots}) \\
&= Pr_0 + Pr_1\,v_{0.1} + {}_1p^{00}_x\,v_{0.1}\left(Pr_2\,v_{0.1} + {}_1p^{00}_{x+1}\,Pr_3\,v^2_{0.1} + \ldots\right) \\
&= Pr_0 + Pr_1\,v_{0.1} + {}_1p^{00}_x\,v_{0.1}\,NPV_1
\end{align*}
$$

$$8860 = -7500 + \frac{1095.68}{1.1} + (1 - 0.03)(1 - 0.9q_{65})\,\frac{1}{1.1}\,NPV_1$$

$$NPV_1 = \frac{8860 + 7500 - 1095.68/1.1}{(0.9648362)/1.1} = \frac{15{,}363.9273}{0.877124} = 17{,}516.25$$

### Examiner Report
*Graders' Comments:* This was a challenging question part. Only a minority of candidates achieved partial or full credit.
