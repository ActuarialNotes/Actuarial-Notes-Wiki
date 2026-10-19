---
id: "altam-002"
exam: "Exam ALTAM"
topic: "Multiple Decrement Model"
learning_objective: "Survival Models for Contingent Cash Flows"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Multiple+Decrement+Model
  - Concepts/Transition+Intensity
  - Concepts/Probability
points: 6
---

You are given the following excerpt from a triple decrement table:

| $x$ | $l_x^{(\tau)}$ | $d_x^{(1)}$ | $d_x^{(2)}$ | $d_x^{(3)}$ |
|---|---|---|---|---|
| 60 | 1000 | $d_{60}^{(1)}$ | 60 | 45 |
| $\vdots$ | $\vdots$ | $\vdots$ | $\vdots$ | $\vdots$ |

You are also given the following information about the decrements:

- $\mu_{60+t}^{(1)} = 1.2t$ for $0 \le t \le 1$
- Decrement 2 happens exactly halfway through the year.
- Decrement 3 happens at the end of the year.

## Part a (2 points)

Calculate $q_{60}^{\prime(2)}$.

### Explanation
Let $l_{x+t^-}^{(\tau)}$ denote the value immediately before exits at exact age $x+t$, and $l_{x+t^+}^{(\tau)}$ denote the value immediately after. At $t = 0.5$, just before decrement 2 exits, we have

$$q_{60}^{\prime(2)} = \frac{d^{(2)}}{l_{60.5^-}^{(\tau)}}$$

$$l_{60.5^-}^{(\tau)} = 1000\exp\left(-\int_0^{0.5} 1.2t\,dt\right) = (1000)(0.86071) = 860.71$$

$$\Rightarrow q_{60}^{\prime(2)} = \frac{60}{860.71} = 0.0697$$

## Part b (2 points)

Calculate $d_{60}^{(1)}$.

### Explanation
$$l_{60.5^+}^{(\tau)} = 800.71 \Rightarrow l_{61^-}^{(\tau)} = 800.71\,e^{-\int_{0.5}^{1} 1.2t\,dt} = 800.71(0.63763) = 510.6$$

$$l_{61^+}^{(\tau)} = 510.6 - 45 = 465.6$$

$$\Rightarrow d_{60}^{(1)} = l_{60}^{(\tau)} - d_{60}^{(2)} - d_{60}^{(3)} - l_{61^+}^{(\tau)} = 1000 - 60 - 45 - 466 = 429$$

### Examiner Report
Graders' Comments: There are different ways of doing this part; full credit was awarded for any correct method. Quite a few candidates gave the answer as 451, which is obtained by ignoring decrement (2).

## Part c (2 points)

Now suppose instead that Decrement 2 occurs at the start of the year, and that each $q_{60}^{\prime(i)}$ remains unchanged.

State with reasons the effect (increase, decrease, no change, cannot be determined) that this change would have on the following probabilities:

(i) $q_{60}^{(1)}$

(ii) $q_{60}^{(2)}$

(iii) $q_{60}^{(3)}$

(MLC, Spring 2015, Question 2.)

### Explanation
(i) If decrement 2 occurs at the start of the year, there are fewer lives exposed to force of decrement 1, so $q_{60}^{(1)}$ would be smaller.

(ii) If decrement 2 occurs at the start of the year, there are more lives exposed to force of decrement 2, so $q_{60}^{(2)}$ would be bigger.

(iii) Because all the decrement 3 exits happen at the end of the year, we have

$$q_{60}^{(3)} = \frac{d_{60}^{(3)}}{l_{60}^{(\tau)}} \qquad q_{60}^{\prime(3)} = \frac{d_{60}^{(3)}}{l_{61^-}^{(\tau)}}$$

Where $l_{61^-}^{(\tau)}$ is the expected number of in-force immediately before the decrement 3 exits at the end of the year. Also $l_{61^-}^{(\tau)} = l_{60}^{(\tau)}\,p_{60}^{\prime(1)}\,p_{60}^{\prime(2)}$ and since the independent rates are unchanged, $l_{61^-}^{(\tau)}$ is unchanged, which means that $d_{60}^{(3)}$ is unchanged, which means that $q_{60}^{(3)}$ is unchanged.
