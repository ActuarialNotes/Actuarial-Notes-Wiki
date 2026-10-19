---
id: "altam-014"
exam: "Exam ALTAM"
topic: "Multiple Decrement Model"
learning_objective: "Survival Models for Contingent Cash Flows"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Multiple+Decrement+Model
  - Concepts/Transition+Intensity
  - Concepts/Equivalence+Principle
  - Concepts/Policy+Value
  - Concepts/Life+Insurance
points: 10
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:95da03382aa5fd4859d7551b3c6680a834ec9f95bf4d50e809faaecd2b0350d4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-014.md
---

For a fully discrete three-year term insurance of 100,000 on a person, age 40, you are given:

(i) The person's future mortality follows a double decrement model, where:

- Decrement 1 is death from Disease 1
- Decrement 2 is death from any cause except Disease 1

(ii) $\mu_{40+t}^{(1)} = A + Bc^{40+t}$ for all $t \ge 0$, where $A = 0.0001$, $B = 1.075\times 10^{-5}$, $c = 1.12$

(iii) $\mu_{40+t}^{(2)} = 3\mu_{40+t}^{(1)}$, for all $t \ge 0$.

(iv) $i = 0.05$

## Part a (2 points)

Show that $p_{40}^{(\tau)} = 0.995$ to the nearest 0.001. You should calculate the value to the nearest 0.0001.

### Explanation
$$p_{40}^{(\tau)} = \exp\left\{-\int_0^1 \mu_{40+t}^{(\tau)}\,dt\right\} = \exp\left\{-4\int_0^1 \mu_{40+t}^{(1)}\,dt\right\} = \left(\exp\left\{-\int_0^1 \mu_{40+t}^{(1)}\,dt\right\}\right)^4$$

$$\exp\left\{-\int_0^1 \mu_{40+t}^{(1)}\,dt\right\} = \exp\left\{-A - \frac{B}{\log c}c^{40}(c - 1)\right\} = p_{40}^{\prime(1)} = 0.9988415$$

(using Makeham's survival probability formula)

$$\Rightarrow p_{40}^{(\tau)} = \left(p_{40}^{\prime(1)}\right)^4 = 0.995374$$

### Examiner Report
Graders' Comments: Candidates did well on this part. The most common error was treating decrements as independent instead of dependent. While this resulted in the same answer to four decimal places, points were deducted for an incorrect calculation. Another common error was assuming that the force of decrement was constant.

## Part b (2 points)

You are also given that ${}_2p_{40}^{(\tau)} = 0.99027$ and ${}_3p_{40}^{(\tau)} = 0.98462$.

(i) Show that the expected present value at issue of the person's death benefits is 1400 to the nearest 100. You should calculate the value to the nearest 1.

(ii) Show that the net annual premium for the person's insurance is 490 to the nearest 10. You should calculate the premium to the nearest 0.1.

### Explanation
$$\text{EPV} = 100{,}000\sum_{k=0}^{2} v^{k+1}\cdot{}_kp_x^{(\tau)}\cdot q_{x+k}^{(\tau)} = 100{,}000\sum_{k=0}^{2} v^{k+1}\left({}_kp_x^{(\tau)} - {}_{k+1}p_x^{(\tau)}\right)$$

$$\begin{align*}
\text{EPV} &= 100{,}000\left[(1 - 0.99537)v + (0.99537 - 0.99027)v^2 + (0.99027 - 0.98462)v^3\right] \\
&= 100{,}000(0.013916) \\
&= 1391.60
\end{align*}$$

(i)

$$\text{EPV(premiums)} = P\left(1 + 0.99537v + 0.99027v^2\right) = P(2.84618)$$

$$P = \frac{1391.60}{2.846179} = 488.93$$

## Part c (4 points)

The person purchases a policy rider that pays an additional 50,000 at the end of the year of death, if death is due to Disease 1.

(i) Write down an integral expression for ${}_tq_{40}^{(1)}$, in terms of the dependent survival probabilities, ${}_sp_{40}^{(\tau)}$, and the force of mortality from Disease 1, $\mu_{40+s}^{(1)}$.

(ii) Using your expression from part (c) (i), prove that ${}_tq_{40}^{(1)} = \frac{1}{4}\,{}_tq_{40}^{(\tau)}$.

(iii) Show that the net premium for the Disease 1 rider is 60 to the nearest 10. You should calculate the premium to the nearest 0.1.

### Explanation
(i)

$${}_tq_{40}^{(1)} = \int_0^t {}_sp_{40}^{(\tau)}\,\mu_{40+s}^{(1)}\,ds$$

(ii)

$$\begin{align*}
{}_tq_{40}^{(\tau)} &= \int_0^t {}_sp_{40}^{(\tau)}\,\mu_{40+s}^{(\tau)}\,ds \\
&= 4\int_0^t {}_sp_{40}^{(\tau)}\,\mu_{40+s}^{(1)}\,ds \\
&= 4\,{}_tq_{40}^{(1)}
\end{align*}$$

$$\Rightarrow {}_tq_{40}^{(1)} = \frac{1}{4}\,{}_tq_{40}^{(\tau)}$$

(iii)

$$\begin{align*}
\text{EPV(Disease 1 rider)} &= 50{,}000\sum_{k=0}^{k=2} v^{k+1}\,{}_{k|}q_{40}^{(1)} \\
&= \frac{50{,}000}{4}\sum_{k=0}^{k=2} v^{k+1}\,{}_{k|}q_{40}^{(\tau)} \\
&= \frac{50{,}000}{4}\sum_{k=0}^{2} v^{k+1}\left({}_kp_x^{(\tau)} - {}_{k+1}p_x^{(\tau)}\right) \\
&= \frac{50{,}000\times 0.013916}{4} \\
&= 173.95 \qquad \text{from (b)}
\end{align*}$$

$$\text{Rider Premium} = P^r = \frac{173.95}{2.8462} = 61.12 \qquad \text{(denominator from (b))}$$

### Examiner Report
Graders' Comments Part (i) was done well. In part (ii), candidates who assumed constant forces of decrement were given partial credit. Many candidates skipped (iii), but those who attempted it did well.

## Part d (2 points)

Calculate the net premium policy value at time 1 for the policy, including the Disease 1 rider.

### Explanation
$$\left({}_0V + P + P^r\right)(1.05) = 100{,}000q_{40}^{(\tau)} + 50{,}000q_{40}^{(1)} + p_{40}^{(\tau)}\,{}_1V$$

$$\Rightarrow {}_1V = 57.39$$

### Examiner Report
Graders' Comments: Most candidates who attempted this part calculated ${}_1V$ using the EPV of future outgo minus income. This is a longer method and tricky to get right, but is an acceptable alternative.
