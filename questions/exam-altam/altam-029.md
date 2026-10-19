---
id: "altam-029"
exam: "Exam ALTAM"
topic: "Profit Testing"
learning_objective: "Profit Analysis"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Profit+Testing
  - Concepts/Multiple+State+Model
  - Concepts/Critical+Illness+Insurance
  - Concepts/Profit+Signature
  - Concepts/Net+Present+Value
points: 8
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:653e6fd47801b560e7592d01a0b23d721cbe7964ee5d28c33f8304a42a239b42
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-029.md
---

A 5-year term life insurance policy with a partially accelerated Critical Illness (CI) rider is sold to a Healthy life age $x$. The policy is to be profit-tested using the multiple state model:

![State diagram: State 0 Healthy to State 1 CI diagnosed; State 0 Healthy to State 3 Dead no CI; State 1 CI diagnosed to State 2 Dead after CI](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/altam-029-state-diagram.png)

The policy pays 600,000 at the end of the year of CI diagnosis, if the policyholder is still alive at the end of that year; 1,000,000 at the end of the year of death, if the policyholder was in State 0 at the start of that year; and 500,000 at the end of the year of death if the policyholder was in State 1 at the start of that year.

Annual premiums of 30,000 are payable while the policyholder is in State 0.

You are given the following profit test assumptions:

(i) One-year transition probabilities at age $x+k$, for $k=0,1,2$, are:

$$p^{01}_{x+k} = 0.01 + 0.002k, \quad p^{02}_{x+k} = 0.008 + 0.003k, \quad p^{03}_{x+k} = 0.004, \quad p^{12}_{x+k} = 0.25$$

(ii) The state-dependent reserves are:

| $t$ | 2 | 3 | 4 |
|---|---|---|---|
| ${}_tV^{(0)}$ | 12,000 | 9,000 | 5,000 |
| ${}_tV^{(1)}$ | 280,000 | 210,000 | 120,000 |

(iii) Pre-contract expenses are 500.

(iv) Commissions are 5% of each premium including the first.

(v) Maintenance expenses in State 1 are 100 at the beginning of the year.

(vi) The insurer earns interest on investments of 6% per year.

(vii) The hurdle rate is 10% per year.

## Part a (3 points)

Show that the emerging profit in year 3, conditional on being in State 0 at the start of the year, is 4,900 to the nearest 100. You should calculate your answer to the nearest 1.

### Explanation
The emerging profit in year 3, conditional on being in State $j$ at time 2 is

$$Pr_3^{(j)} = \left({}_2V^{(j)} + P_3^{(j)} - E_3^{(j)}\right)(1+i_t) - \sum_k E\,B_3^{jk} - \sum_k E_3V^{jk}$$

where $i_t = 0.06$.

For State 0,

$$
\begin{align*}
{}_2V^{(0)} &= 12{,}000 \\
P_3^{(0)} &= 30{,}000 \\
E_3^{(0)} &= (0.05)P_3^{(0)} \\
          &= 1500
\end{align*}
$$

$$
\begin{align*}
E\,B_3^{01} &= p^{01}_{x+2}\,600{,}000 \\
            &= (0.014)(600{,}000) \\
            &= 8400 \\
E\,B_3^{02} &= p^{02}_{x+2}\,1{,}000{,}000 \\
            &= (0.014)(1{,}000{,}000) \\
            &= 14{,}000 \\
E\,B_3^{03} &= p^{03}_{x+2}\,1{,}000{,}000 \\
            &= (0.004)(1{,}000{,}000) \\
            &= 4000
\end{align*}
$$

$$
\begin{align*}
E_3V^{00} &= p^{00}_{x+2}\,{}_3V^{(0)} \\
          &= (1 - 0.014 - 0.014 - 0.004)(9000) \\
          &= 8712 \\
E_3V^{01} &= p^{01}_{x+2}\,{}_3V^{(1)} \\
          &= (0.014)(210{,}000) \\
          &= 2940
\end{align*}
$$

So,

$$
\begin{align*}
Pr_3^{(0)} &= (12{,}000 + 30{,}000 - 1500)(1.06) - 8400 - 14{,}000 - 4000 - 8712 - 2940 \\
&= 4878
\end{align*}
$$

### Examiner Report
*Graders' Comments:* For those who did not achieve full marks, common errors included omitting the value of the benefit payable in case of death after CI, incorrectly including a value for the 500,000 benefit payable in case of transition from State 1 (at the beginning of the year) to State 2, or using the wrong expenses for year 3.

## Part b (2 points)

Show that the emerging profit in year 3, conditional on being in State 1 at the start of the year, is 14,200 to the nearest 100. You should calculate your answer to the nearest 1.

### Explanation
For State 1, we have

$$
\begin{align*}
{}_2V^{(1)} &= 280{,}000 \\
P_3^{(1)} &= 0 \\
E_3^{(1)} &= 100 \\
E\,B_3^{12} &= p^{12}_{x+2}\,500{,}000 \\
            &= (0.25)(500{,}000) \\
            &= 125{,}000 \\
E_3V^{11} &= p^{11}_{x+2}\,{}_3V^{(1)} \\
          &= (1 - 0.25)(210{,}000) \\
          &= 157{,}500
\end{align*}
$$

$$Pr_3^{(1)} = (280{,}000 - 100)(1.06) - 125{,}000 - 157{,}500 = 14{,}194$$

### Examiner Report
*Graders' Comments:* Common errors included ignoring or using wrong expenses, and adding a premium when none is paid while in State 1.

## Part c (2 points)

Calculate the profit signature value for year 3, $\Pi_3$.

### Explanation
$$\Pi_3 = {}_2p^{00}_x\,Pr_3^{(0)} + {}_2p^{01}_x\,Pr_3^{(1)}$$

$$
\begin{align*}
{}_2p^{00}_x &= p^{00}_x\,p^{00}_{x+1} \\
             &= \left(1 - p^{01}_x - p^{02}_x - p^{03}_x\right)\left(1 - p^{01}_{x+1} - p^{02}_{x+1} - p^{03}_{x+1}\right) \\
&= (1 - 0.01 - 0.008 - 0.004)(1 - 0.012 - 0.011 - 0.004) \\
&= 0.951594
\end{align*}
$$

$$
\begin{align*}
{}_2p^{01}_x &= p^{00}_x\,p^{01}_{x+1} + p^{01}_x\,p^{11}_{x+1} \\
&= (0.978)(0.012) + (0.01)(0.75) \\
&= 0.019236
\end{align*}
$$

$$\Pi_3 = (0.951594)(4878) + (0.019236)(14{,}194) = 4914.91$$

## Part d (1 point)

You are given the first three values of the profit signature:

$$\Pi_0 = -500 \qquad \Pi_1 = -770 \qquad \Pi_2 = 3536$$

Calculate the partial net present value for the first 3 years, NPV(3).

(This is Question 5 from the Spring 2019 Written Answer exam.)

### Explanation
$$NPV(3) = \sum_{k=0}^{3} \Pi_k\,v^k_{10\%} = -500 - \frac{770}{1.1} + \frac{3536}{1.1^2} + \frac{4914.91}{1.1^3} = 5414.96$$
