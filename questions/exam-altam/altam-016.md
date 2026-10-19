---
id: "altam-016"
exam: "Exam ALTAM"
topic: "Thiele's Differential Equation"
learning_objective: "Premium and Policy Valuation for Long-Term State-Dependent Coverages"
difficulty: hard
type: multi-part
wiki_link:
  - Concepts/Critical+Illness+Insurance
  - Concepts/Multiple+State+Model
  - Concepts/Policy+Value
  - Concepts/Thiele's+Differential+Equation
  - Concepts/Markov+Chain
points: 10
---

An insurer issues a 20-year term insurance to (50) which pays a death benefit of 500,000, and an additional 100,000 on diagnosis of a critical illness (CI).

The insurer uses the Markov model illustrated below to value the CI benefit.

*(Figure: three-state model — Healthy (0), Critically Ill (1), Dead (2); arrows 0 → 1, 0 → 2 and 1 → 2)*

You are given the following information:

(i) Premiums are payable continuously while the policyholder is healthy.

(ii) The annual net premium rate is 4,850.

(iii) Death and CI benefits are payable immediately on transition.

(iv) $i = 0.05$.

(v) ${}_tV^{(j)}$ denotes the net premium policy value at time $t$, conditional on being in State $j$ at that time.

(vi) The following values from the model illustrated above:

| $x$ | $\bar{a}_x^{00}$ | $\bar{A}_x^{01}$ | $\bar{A}_x^{02}$ | $\bar{A}_x^{12}$ | ${}_{10}p_x^{00}$ | ${}_{10}p_x^{01}$ | ${}_{10}p_x^{11}$ |
|---|---|---|---|---|---|---|---|
| 60 | 10.1729 | 0.34249 | 0.39077 | 0.47904 | 0.75055 | 0.13135 | 0.75283 |
| 70 | 6.5690 | 0.49594 | 0.54335 | 0.62237 | | | |

(LTAM, Spring 2022, Question 2)

## Part a (3 points)

(i) Show that $\bar{A}_{60:\overline{10}|}^{02} = 0.0902$ to the nearest 0.0001. You should calculate the value to the nearest 0.00001.

(ii) Show that ${}_{10}V^{(0)} = 21{,}850$ to the nearest 50. You should calculate the value to the nearest 1.

(iii) Show that ${}_{10}V^{(1)} = 95{,}700$ to the nearest 10. You should calculate the value to the nearest 1.

### Explanation
(i)
$$\begin{align*}
\bar{A}_{60:\overline{10}|}^{02} &= \bar{A}_{60}^{02} - {}_{10}p_{60}^{00}\,v^{10}\,\bar{A}_{70}^{02} - {}_{10}p_{60}^{01}\,v^{10}\,\bar{A}_{70}^{12} \\
&= 0.39077 - (0.75055)(1.05)^{-10}(0.54335) - (0.13135)(1.05)^{-10}(0.62237) \\
&= 0.09022
\end{align*}$$

(ii)
$${}_{10}V^{(0)} = 500{,}000\,\bar{A}_{60:\overline{10}|}^{02} + 100{,}000\,\bar{A}_{60:\overline{10}|}^{01} - 4850\,\bar{a}_{60:\overline{10}|}^{00} = 21{,}850.4$$

$$\bar{a}_{60:\overline{10}|}^{00} = \bar{a}_{60}^{00} - {}_{10}p_{60}^{00}\,v^{10}\,\bar{a}_{70}^{00} = 7.1461$$

$$\bar{A}_{60:\overline{10}|}^{01} = \bar{A}_{60}^{01} - {}_{10}p_{60}^{00}\,v^{10}\,\bar{A}_{70}^{01} = 0.11397$$

(iii)
$${}_{10}V^{(1)} = 500{,}000\,\bar{A}_{60:\overline{10}|}^{12} = 95{,}700$$

where
$$\begin{align*}
\bar{A}_{60:\overline{10}|}^{12} &= \bar{A}_{60}^{12} - {}_{10}p_{60}^{11}\,v^{10}\,A_{70}^{12} \\
&= 0.47904 - 90.75283)(1.05)^{-10}(0.62237) \\
&= 0.19140
\end{align*}$$

## Part b (3 points)

You are given that $\mu_{60}^{01} = 0.00818$; $\mu_{60}^{02} = 0.00724$; $\mu_{60}^{12} = 0.01811$.

(i) Calculate $\dfrac{d}{dt}\,{}_tV^{(0)}$ at $t = 10$.

(ii) Calculate $\dfrac{d}{dt}\,{}_tV^{(1)}$ at $t = 10$.

(iii) Explain why ${}_tV^{(1)}$ is decreasing while ${}_tV^{(0)}$ is increasing at $t = 10$.

### Explanation
(i)
$$\frac{d}{dt}\,{}_tV^{(0)} = \delta\,{}_tV^{(0)} + P - \mu_{x+t}^{01}\left(100{,}000 + {}_tV^{(1)} - {}_tV^{(0)}\right) - \mu_{x+t}^{02}\left(500{,}000 - {}_tV^{(0)}\right)$$

At $t = 10$:

$$\begin{align*}
\frac{d}{dt}\,{}_tV^{(0)} &= \ln(1.05)(21{,}850) + 4850 - (0.00818)(100{,}000 + 95{,}700 - 21{,}850) - (0.00724)(500{,}000 - 21{,}850) \\
&= 1032.2
\end{align*}$$

(ii)
$$\frac{d}{dt}\,{}_tV^{(1)} = \delta\,{}_tV^{(1)} - \mu_{x+t}^{12}\left(500{,}000 - {}_tV^{(1)}\right)$$

At $t = 10$:

$$\begin{align*}
\frac{d}{dt}\,{}_tV^{(1)} &= \ln(1.05)(95{,}700) - (0.01811)(500{,}000 - 97{,}500) \\
&= -2652.8
\end{align*}$$

(iii) In State 0, the cash flows in are interest and premiums, and the cash flows out are claims and reserves on transition to State 1, and claims on transition to State 2.

In the early years of the term insurance the State 0 reserve will gradually increase, as premiums exceed expected outgo. In later years the reserve will decrease, as the greater number of claims outweighs the premium and investment income. At time 10, the reserve is still in the increasing phase.

If a policy is in state 1 it is effectively a single premium term insurance. There is a little interest income, but no premium income. The outgo on claims, on average, depletes the reserve, which will decline to 0 just before the end of the contract.

### Examiner Report
**Graders' Comments:** *Candidates found part (b) challenging. Many candidates skipped part (iii).*

## Part c (2 points)

The policy terms are revised for new policies such that the CI benefit is paid six months after diagnosis, conditional on the policyholder surviving to that time, and conditional on the diagnosis occurring within the 20-year term.

Write down an integral expression for the expected present value at issue of the revised CI benefit.

### Explanation
$$100{,}000\int_0^{20} {}_tp_x^{00}\,\mu_{x+t}^{01}\,{}_{0.5}p_{x+t}^{11}\,v^{t+0.5}\,dt$$

### Examiner Report
**Graders' Comments:** *Candidates who attempted this part received the majority of the points.*

## Part d (2 points)

One reason for the change is that mortality is very high in the first year after a CI diagnosis.

(i) Define the Markov property.

(ii) Explain whether high mortality in the period immediately after a CI diagnosis is consistent with the Markov property.

### Explanation
(i) Under the Markov property, for a policy in State 1 at time t, the probability of moving from State 1 to State 2 in any future time interval is independent of the history of the state process before time t.

This means, that (for example) the probability of a life dying in the next 6 months for a policyholder currently in State 1, is the same if they were diagnosed, say, in the last week as if they were diagnosed several years ago.

(ii) This is inconsistent with the spike in mortality observed after diagnosis, as this implies a higher mortality rate for lives recently arrived in State 2, compared with lives who have been in State 2 for a long time.

### Examiner Report
**Graders' Comments:** *Many candidates skipped this part.*
