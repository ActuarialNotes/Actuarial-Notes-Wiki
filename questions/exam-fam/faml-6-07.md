---
id: "faml-6-07"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Endowment+Insurance
  - Concepts/Pure+Endowment
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d2dc000385dbcb24a6a5d150ad87e5611607ef4b12003506cd3dab0691127bea
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-07.md
---

For a special fully discrete 20-year endowment insurance on (40), you are given:

(i) The only death benefit is the return of annual net premiums accumulated with interest at 5% to the end of the year of death

(ii) The endowment benefit is 100,000

(iii) Mortality follows the Standard Ultimate Life Table

(iv) $i = 0.05$

Calculate the annual net premium.

[A modified version of Question 3 on the Spring 2013 exam]

- A) 2680
- B) 2780
- C) 2880
- D) 2980
- E) 3080

## Explanation

There are four ways to approach this problem. In all cases, let $\pi$ denote the net premium.

The first approach is an intuitive result. The key is that in addition to the pure endowment, there is a benefit equal in value to a temporary interest only annuity due with annual payment $\pi$. However, if the insured survives the 20 years, the value of the annuity is not received.

$$\pi\ddot{a}_{40:\overline{20}|} = 100{,}000\,{}_{20}E_{40} + \pi\ddot{a}_{40:\overline{20}|} - {}_{20}p_{40}\,\ddot{a}_{\overline{20}|5\%}\,\pi$$

Based on this equation,

$$\begin{align*}
\pi &= \frac{100{,}000\,{}_{20}E_{40}}{{}_{20}p_{40}\,\ddot{a}_{\overline{20}|}} \\
&= \frac{100{,}000v^{20}}{\ddot{a}_{\overline{20}|}} \\
&= \frac{100{,}000}{\ddot{s}_{\overline{20}|}} \\
&= \frac{100{,}000}{34.71925} \\
&= 2880
\end{align*}$$

The second approach is also intuitive. If you set an equation of value at the end of 20 years, the present value of benefits is 100,000 for all the people who are alive at that time. The people who have died have had their premiums returned with interest. Therefore, the premiums plus interest that the company has are only the premiums for those alive at the end of 20 years. The people who are alive have paid 20 premiums. Therefore $\pi\ddot{s}_{\overline{20}|} = 100{,}000$.

The third approach uses random variables to derive the expected present value of the return of premium benefit. Let $K$ be the curtate future lifetime of (40). The present value random variable is then

$$\begin{align*}
Y &= \begin{cases} \pi\ddot{s}_{\overline{K+1}|}\,v^{K+1}, & K < 20 \\ 0, & K \ge 20 \end{cases} \\
&= \begin{cases} \pi\ddot{a}_{\overline{K+1}|}, & K < 20 \\ 0, & K \ge 20 \end{cases} \\
&= \begin{cases} \pi\ddot{a}_{\overline{K+1}|} - 0, & K < 20 \\ \pi\ddot{a}_{\overline{20}|} - \pi\ddot{a}_{\overline{20}|}, & K \ge 20 \end{cases}
\end{align*}$$

The first term is the random variable that corresponds to a 20-year temporary annuity. The second term is the random variable that corresponds to a payment with a present value of $\pi\ddot{a}_{\overline{20}|}$ contingent on surviving 20 years. The expected present value is then $\pi\ddot{a}_{40:\overline{20}|} - {}_{20}p_{40}\,\ddot{a}_{\overline{20}|}\,\pi$.

The fourth approach takes the most steps.

$$\begin{align*}
\pi\ddot{a}_{40:\overline{20}|} &= 100{,}000\,{}_{20}E_{40} + \pi\sum_{k=0}^{19} v^{k+1}\,\ddot{s}_{\overline{k+1}|}\,{}_{k|}q_{40} \\
&= 100{,}000\,{}_{20}E_{40} + \pi\sum_{k=0}^{19} v^{k+1}\,\frac{(1+i)^{k+1} - 1}{d}\,{}_{k|}q_{40} \\
&= 100{,}000\,{}_{20}E_{40} + \frac{\pi}{d}\left(\sum_{k=0}^{19} {}_{k|}q_{40} - v^{k+1}\,{}_{k|}q_{40}\right) \\
&= 100{,}000\,{}_{20}E_{40} + \frac{\pi}{d}\left({}_{20}q_{40} - A^{1}_{40:\overline{20}|}\right) \\
&= 100{,}000\,{}_{20}E_{40} + \frac{\pi}{d}\left({}_{20}q_{40} - 1 + d\ddot{a}_{40:\overline{20}|} + v^{20}\,{}_{20}p_{40}\right) \\
&= 100{,}000\,{}_{20}E_{40} + \pi\ddot{a}_{40:\overline{20}|} - \pi\,{}_{20}p_{40}\,\frac{1 - v^{20}}{d} \\
&= 100{,}000\,{}_{20}E_{40} + \pi\ddot{a}_{40:\overline{20}|} - {}_{20}p_{40}\,\ddot{a}_{\overline{20}|6\%}\,\pi.
\end{align*}$$

The answer is **C**.
