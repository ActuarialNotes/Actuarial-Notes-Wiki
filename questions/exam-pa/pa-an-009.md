---
id: "pa-an-009"
exam: "Exam PA"
topic: "Data Design"
learning_objective: "Data Exploration and Visualization"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Data+Design
answer: "B"
points: 1
---

Fraud is confirmed on a small share of an insurer's claims. To train a fraud model, an analyst keeps every fraudulent claim and a random 20% of the legitimate ones. The model, fitted to this sample, gives a new claim a fraud probability of 0.40.

Calculate the claim's fraud probability on the scale of the full population of claims.

- A) 0.080
- B) 0.118
- C) 0.133
- D) 0.400
- E) 0.769

## Explanation

When every event is kept and non-events are kept with probability $r$, the population odds are $r$ times the sample odds. In terms of the sample probability $p_s$,

$$
p = \frac{r\,p_s}{r\,p_s + 1 - p_s}
$$

With $r = 0.20$ and $p_s = 0.40$:

$$
p = \frac{0.08}{0.08 + 0.60} = \frac{0.08}{0.68} = 0.118
$$

The answer is **B**. Keeping only a fifth of the legitimate claims makes fraud more common in the sample than in the population, so the correction brings the probability down.

**Why not the others**

- **A** multiplies the probability by $r$ and forgets the denominator, which treats the probability as if it were the odds.
- **C** multiplies the sample odds, $p_s/(1 - p_s) = 0.40/0.60 = 0.667$, by $r$ to get 0.133, but stops at the population odds without turning them back into a probability.
- **D** uses the sample probability uncorrected, as if the sample had the population's mix.
- **E** divides the odds by $r$ instead of multiplying, which corrects in the wrong direction and raises the probability.
