---
id: "altam-031"
exam: "Exam ALTAM"
topic: "Profit Testing"
learning_objective: "Profit Analysis"
difficulty: hard
type: multi-part
wiki_link:
  - Concepts/Profit+Testing
  - Concepts/Life+Annuity
  - Concepts/Multiple+State+Model
  - Concepts/Policy+Value
  - Concepts/Profit+Signature
  - Concepts/Equivalence+Principle
points: 10
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ebdad27e0bd11656474d44d2df6bb1e7cc3ab3419b36e3da58236ba2b33c23dd
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-031.md
---

A life insurer issues a single premium whole life annuity-immediate, payable annually, with a 10-year guarantee, to B who is age 65.

The basis for calculating the premium and policy values is as follows:

(i) Mortality follows the Standard Ultimate Life Table.

(ii) $i = 0.05$

(iii) Commission is 2000 at issue.

(iv) Other acquisition expenses are 500.

(v) Maintenance expenses of 25 per year are payable with the annuity payments.

(vi) The premium is determined using the equivalence principle.

The single premium is 100,000.

(This is Question 5 from the Spring 2020 Written Answer exam.) (Part (a) is covered by the FAM-L exam.)

## Part a (2 points)

Show that B's annuity payment is 7550 to the nearest 10. You should calculate the payment amount to the nearest 0.1.

### Explanation
EPV(payments + expenses) = 100,000

$$2000 + 500 + (B + 25)\,a_{\overline{65:\overline{10}|}} = 100{,}000 \quad \text{where} \quad a_{\overline{65:\overline{10}|}} = a_{\overline{10}|} + {}_{10}E_{65}\,a_{75}$$

$$a_{\overline{65:\overline{10}|}} = \frac{1 - v^{10}}{i} + (0.55305)(9.3178) = 7.72173 + 5.15321 = 12.87494$$

$$\Rightarrow B = \frac{100{,}000 - 2500 - (25)(12.87494)}{12.87494} = 7{,}547.848$$

## Part b (1 point)

The insurer conducts a profit test of this contract using the following three states:

- State 0: Payments in progress; annuitant alive
- State 1: Payments in progress; annuitant dead
- State 2: Payments ceased; annuitant dead

You are also given the following assumptions for a profit test of the contract.

- Interest on insurer's funds: 6%
- All other assumptions follow the premium and policy value basis.
- Reserves are gross premium policy values.

Write down values for the following probabilities:

(i) $p^{01}_{73}$

(ii) $p^{02}_{73}$

(iii) $p^{12}_{73}$

### Explanation
Note that at age 73, the annuity is within the 10-year guarantee period. So only states 0 and 1 are possible. Possible transitions are $0 \to 0$, $0 \to 1$, $1 \to 1$.

(i) $p^{01}_{73} = q_{73} = 0.014664$

(ii) $p^{02}_{73} = 0$

Since there is no possible transition from State 0 at 73 to State 2 at age 74since the annuity is within the guarantee period.

(iii) $p^{12}_{73} = 0$ Since payments would continue until age 76 if annuitant died before 73.

## Part c (2 points)

Show that the reserve at time 8 for a policy in State 0 is ${}_8V^{(0)} = 76{,}100$ to the nearest 100. You should calculate the value to the nearest 1.

### Explanation
At time 8, there are 2 years left in the guarantee period.

$$
\begin{align*}
{}_8V^{(0)} &= EPV(\text{future payments plus maintenance expenses}) \\
{}_8V^{(0)} &= (B + 25)\,a_{\overline{65+8:\overline{10-8}|}} \\
&= (7{,}547.848 + 25)\,a_{\overline{73:\overline{2}|}}
\end{align*}
$$

where

$$
\begin{align*}
a_{\overline{73:\overline{2}|}} &= a_{\overline{2}|} + {}_2E_{73}\,a_{75} \\
                                &= \frac{1 - v^2}{i} + v^2\,{}_2p_{73}(9.3178) \\
&= 1.85941 + (0.879036)(9.3178) \\
 &= 10.050091
\end{align*}
$$

$$\Rightarrow {}_8V^{(0)} = 76{,}107.81$$

### Examiner Report
*Graders' Comments:* Many students did not answer this part, but those that attempted it did well.

## Part d (1 point)

Show that the reserve at time 8 for a policy in State 1 is ${}_8V^{(1)} = 14{,}100$ to the nearest 100. You should calculate the value to the nearest 1.

### Explanation
In State 1, there are only 2 guaranteed payments to be made.

$$
\begin{align*}
{}_8V^{(1)} &= (B + 25)\,a_{\overline{2}|} \\
&= (7547.848 + 25)(1.85941) \\
 &= 14{,}081.03
\end{align*}
$$

### Examiner Report
*Graders' Comments:* As with Part (c), many students did not answer this part. Those that did answer, did well.

## Part e (4 points)

(i) Show that $\Pr_9^{(0)} = 760$ to the nearest 10. You should calculate the value to the nearest 0.1.

(ii) Show that $\Pr_9^{(1)} = 140$ to the nearest 10. You should calculate the value to the nearest 0.1.

(iii) Calculate $\Pi_9$.

### Explanation
(i)

$$
\begin{align*}
Pr_9^{(0)} &= {}_8V^{(0)}(i_9 - i) \\
&= (76{,}107.81)(0.06 - 0.05) \\
 &= 761.08
\end{align*}
$$

(ii)

$$
\begin{align*}
Pr_9^{(1)} &= {}_8V^{(1)}(i_9 - i) \\
&= (14{,}081.03)(0.06 - 0.05) \\
 &= 140.81
\end{align*}
$$

(i)

$$
\begin{align*}
\pi_9 &= {}_8p_{65}\,Pr_9^{(0)} + (1 - {}_8p_{65})\,Pr_9^{(1)} \\
&= (0.9295525)(761.08) + (0.0704475)(140.81) \\
&= 717.38
\end{align*}
$$

### Examiner Report
*Graders' Comments:* Candidates found this part to be very challenging.
