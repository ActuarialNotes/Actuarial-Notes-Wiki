---
id: "altam-2025f-q3"
exam: "Exam ALTAM"
topic: "Joint Life"
learning_objective: "Joint Life Insurance and Annuities"
difficulty: hard
type: multi-part
year: 2025
session: Fall
wiki_link:
  - Concepts/Joint+Life
  - Concepts/Multiple+State+Model
  - Concepts/Transition+Intensity
  - Concepts/Annuities
  - Concepts/Woolhouse's+Formula
  - Concepts/Thiele's+Differential+Equation
points: 11
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:acc07b70c6dfa0b8583a4646b787435a3ab1ffcd878d33d46b6cd9deb146e222
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-2025f-q3.md
---

An insurance company uses the following model to price joint life insurance products.

![Joint life model: State 0, (x) Alive, (y) Alive; State 1, (x) Alive, (y) Dead; State 2, (x) Dead, (y) Alive; State 3, (x) Dead, (y) Dead; State 4, (x) Dead, (y) Dead. Arrows from State 0 to State 4, State 0 to State 1, State 0 to State 2, State 1 to State 3, and State 2 to State 3.](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/altam-2025f-q3-joint-life-model.png)

Let $\mu_z^s$ denote the force of mortality for a life age $z$ under the Standard Ultimate Survival Model (SUSM).

The transition intensities of the joint life model are:

$$\mu_{x:y}^{01} = \mu_y^s - \lambda; \qquad \mu_{x:y}^{02} = \mu_x^s - \lambda; \qquad \mu_{x:y}^{04} = \lambda$$

$$\mu_{x:y}^{13} = \mu_x^s; \qquad \mu_{x:y}^{23} = \mu_y^s$$

## Part a (4 points)

(i) Show that the individual force of mortality for (x) is the same whether (y) is alive or dead, and hence that the marginal distribution of $T_x$ is the same as the distribution under the SUSM.

(ii) Your colleague states that because the individual force of mortality for (x) is the same whether (y) is alive or dead, and similarly for (y), then $T_x$ and $T_y$ must be independent. Explain in words why he is wrong.

(iii) Another colleague states that because $\mu_x^{02} < \mu_x^{13}$ this model incorporates a "broken heart" effect. State with reasons whether she is correct.

### Explanation
**(i)** First suppose that at time $t$, both (x) and (y) are alive. The marginal force of mortality for (x) at time $t$ is then $\mu_{x+t:y+t}^{02} + \mu_{x+t:y+t}^{04} = \mu_{x+t}^s$.

Similarly, if (y) has died by time $t$, and (x) has survived, the marginal force of mortality for (x) at time $t$ is $\mu_{x+t}^{13} = \mu_{x+t}^s$.

Since the force of mortality function determines the distribution of $T_x$, and since the marginal force of mortality for (x) is the same as the SUSM force of mortality regardless of the status of (y), then the marginal future lifetime random variable, $T_x$, follows the SUSM distribution.

**(ii)** The lives are not independent because they are subject as a couple to common shock risk. That means that information about the survival status of one life gives information about the survival status of the other.

Specifically, if we know that (x) survives $t$ years, then we know the common shock event did not occur in those $t$ years, which means that (y)'s survival probability is higher than it would be without that knowledge, because it tells us that (y)'s force of mortality over the same period is $\mu_{y+r}^s - \lambda$, which is lower than their marginal force of mortality.

**(iii)** There is no broken heart dependency as the force of mortality for each life is the same whether the other is alive or dead.

### Examiner Report
1. Overall, candidates found this question quite challenging. It required a good understanding of how transition intensities in the joint life model combine to form marginal single life models, as well as an ability to coherently develop the associated functions to evaluate premiums and benefits.
2. Parts (a)(i) and (a)(ii) were done very well by most candidates. However, most candidates wrongly believed that the model incorporated a broken heart effect, or just described the broken heart effect without relating it to the model. In fact, as shown in (a)(i), the marginal mortality of (x) was unaffected by the death of (y), and vice versa. If there were a broken heart effect, then the mortality of (x) would be expected to increase on the death of (y), and/or vice versa.

## Part b (2 points)

Let ${}_tp_z^s$ denote the $t$-year survival probability for a life age $z$ under the SUSM.

Show that ${}_tp_{x:y}^{00} = {}_tp_x^s\;{}_tp_y^s\;e^{\lambda t}$.

### Explanation
$$
\begin{align*}
{}_tp_{x:y}^{00} &= \exp\left\{-\int_0^t \mu_{x+r:y+r}^{01} + \mu_{x+r:y+r}^{02} + \mu_{x+r:y+r}^{04}\,dr\right\} \\
&= \exp\left\{-\int_0^t \left(\mu_{x+r}^s - \lambda\right) + \left(\mu_{y+r}^s - \lambda\right) + \lambda\,dr\right\} \\
&= \exp\left\{-\int_0^t \mu_{x+r}^s + \mu_{y+r}^s - \lambda\,dr\right\} \\
&= e^{-\int_0^t \mu_{x+r}^s\,dr} \times e^{-\int_0^t \mu_{y+r}^s\,dr} \times e^{\lambda t} \\
&= {}_tp_x^s\;{}_tp_y^s\;e^{\lambda t}
\end{align*}
$$

### Examiner Report
3. In part (b), most candidates understood that they needed to integrate the sum of the transition forces, but a large number made unnecessary errors or unreasonable simplification in the derivation. In particular, many candidates treated the transition forces as if they were constant, either implicitly, by ignoring the integration variable in the subscript of the transition forces, or explicitly, by replacing the integrals with $t\mu_x^s$ and $t\mu_y^s$. Very little credit was given where the forces were explicitly assumed to be constant. Partial credit was awarded to candidates who omitted the integration variable in the formula, but who did not explicitly assume constant forces. For full credit, candidates were required to write the integrals correctly, including the integration variable in the subscripts.

## Part c (4 points)

A couple, $x = 50$ and $y = 55$, purchases a special whole life reversionary annuity. The annuity is valued using the model above.

You are given the following information:

1. An annuity of 50,000 per year is payable continuously, starting immediately on the first death, and continuing until the second death.
2. Premiums are paid continuously at a rate of $P$ per year while both (x) and (y) are alive.
3. If both lives die simultaneously, a death benefit of the total premium paid is paid immediately on death. That is, the death benefit payable at time $t$ if both lives die simultaneously at that time is $tP$.
4. You should use Woolhouse's two term formula to evaluate continuous annuity functions.
5. $i = 0.05$
6. $\lambda = 0.0005$
7. $\bar{a}_{50:55}^{00} = 14.7443$

Let $\left(\bar{I}\bar{a}\right)_{x:y}^{00}$ denote the EPV of a continuously increasing joint life annuity, with a rate of payment of $t$ per year at time $t$, payable continuously while (x) and (y) both survive.

(i) Show that the EPV of the common shock death benefit is $\lambda P\left(\bar{I}\bar{a}\right)_{50:55}^{00}$.

(ii) Show that the EPV of the annuity benefit is 129,800 to the nearest 100. You should calculate the value to the nearest 0.1.

(iii) You are given that $\left(\bar{I}\bar{a}\right)_{50:55}^{00} = 167.13$. Calculate the annual net premium for the policy.

### Explanation
**(i)** If the lives die by common shock at time $t$, then the return of premium benefit is $tP$, so the EPV is

$$\int_0^\infty (tP)\;{}_tp_{x:y}^{00}\,\mu_{x+t:y+t}^{04}\,v^t\,dt = P\lambda\int_0^\infty t\,v^t\,{}_tp_{x:y}^{00}\,dt = P\lambda\left(\bar{I}\bar{a}\right)_{x:y}^{00}$$

**(ii)** We know that a unit reversionary annuity to (x) following the death of (y), payable continuously, has value $\bar{a}_x - \bar{a}_{x:y}^{00}$, and similarly for a reversionary annuity to (y). The single life annuities are from SUSM, and the joint life annuity value is given. Hence the EPV is

$$
\begin{align*}
50{,}000\left(\left(\bar{a}_x - \bar{a}_{x:y}^{00}\right) + \left(\bar{a}_y - \bar{a}_{x:y}^{00}\right)\right) &= 50{,}000\left(\bar{a}_{50} + \bar{a}_{55} - 2\bar{a}_{50:55}^{00}\right) \\
&= 50{,}000\Big((17.0245 - 0.5) + (16.0599 - 0.5) - 2(14.7443)\Big) \\
&= \mathbf{129{,}790.08}
\end{align*}
$$

**(iii)**

$$P\bar{a}_{x:y}^{00} = 129{,}790.08 + 167.13(\lambda P)$$

$$\Rightarrow P = \frac{129{,}790.08}{14.7443 - 0.0005 \times 167.13} = \mathbf{8{,}852.90}$$

### Examiner Report
4. Part (c)(i) was done well by a large number of candidates. Part (c)(ii) proved more challenging, but this was consistent with the examiners' expectations..Many candidates got part (c)(iii) correct by using the givens in (c) (i) and (c) (ii) even if they could not do those parts. This is an excellent strategy in answering these questions and one of the reasons that the Exam Committee provides the answers or a close approximation to the answers. Candidates using this approach correctly got full credit for (c) (iii).

## Part d (1 point)

Write down Thiele's differential equation for the net premium policy value at time $t > 0$, assuming both lives are alive.

### Explanation
Let ${}_tV^{(j)}$ denote the net premium policy value at $t$ given that the policy is in state $j$, for $j = 0, 1, 2$. Then

$$\frac{d}{dt}\,{}_tV^{(0)} = \delta\,{}_tV^{(0)} + P - \lambda\left(tP - {}_tV^{(0)}\right) - \mu_{y+t}^{01}\left({}_tV^{(1)} - {}_tV^{(0)}\right) - \mu_{x+t}^{02}\left({}_tV^{(2)} - {}_tV^{(0)}\right)$$

where ${}_tV^{(1)} = 50{,}000\,\bar{a}_x$ and ${}_tV^{(2)} = 50{,}000\,\bar{a}_y$

### Examiner Report
5. Candidates who attempted part (d) generally did well. Around 30% of candidates did not attempt it.
