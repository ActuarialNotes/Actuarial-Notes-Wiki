---
id: "masii-an-024"
exam: "Exam MAS-II"
topic: "Credibility"
learning_objective: "Introduction to Credibility"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Credibility
  - Concepts/Complement+of+Credibility
  - Concepts/Bühlmann+Credibility
  - Concepts/Expected+Value+of+Process+Variance
  - Concepts/Variance+of+Hypothetical+Means
  - Concepts/Limited+Fluctuation+Credibility
  - Concepts/Full+Credibility+Standard
answer: "C"
points: 2
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:94a9492c82072b7abc323b1d4ff77457f769286da17f9b23c8c5de7c2a6fcc6b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-ii/masii-an-024.md
---

An actuary blends a risk class's own experience with a broader estimate, the complement, using a credibility factor $Z$:

$$
\text{Estimate} = Z \times \text{Observed} + (1 - Z) \times \text{Complement}
$$

You are given the following three statements:

- I. If $Z = 0.40$, the class's observed pure premium is \$500 and the complement is \$300, the credibility-weighted pure premium is \$380.
- II. Under Bühlmann credibility, if the variance of the hypothetical means rises while the expected value of the process variance and the number of observations stay the same, the credibility factor falls.
- III. Under limited fluctuation credibility, halving the tolerance from 5% to 2.5% (with the probability level unchanged) halves the credibility factor of a class with 400 claims.

Determine which of the above statements are true.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

**I — true.** $Z$ is the weight on the class's own experience, and $(1 - Z)$ the weight on the complement:

$$
0.40(500) + 0.60(300) = 200 + 180 = 380
$$

The estimate always lies between the two inputs, nearer the one carrying more weight; with $Z = 0.40$ it sits nearer the complement.

**II — false.** Bühlmann's credibility factor is

$$
Z = \frac{n}{n + K}, \qquad K = \frac{\text{EPV}}{\text{VHM}}
$$

A larger VHM means the risks genuinely differ from one another, so a risk's own experience says more about *its* expected cost. $K$ falls and $Z$ **rises**. With $n = 400$ and $\text{EPV} = 2{,}500$, doubling the VHM from 4 to 8 cuts $K$ from 625 to 312.5 and raises $Z$ from 0.390 to 0.561. It is a larger **EPV** — noisier individual results — that lowers $Z$.

**III — true.** The full credibility standard is

$$
n_{\text{full}} = \left(\frac{z_{(1+p)/2}}{k}\right)^{2}
$$

so halving $k$ multiplies it by 4: from $(1.645/0.05)^2 = 1{,}082$ to $(1.645/0.025)^2 = 4{,}329$ claims. The square root rule then gives

$$
Z = \sqrt{\frac{400}{1{,}082}} = 0.608 \quad\longrightarrow\quad Z = \sqrt{\frac{400}{4{,}329}} = 0.304
$$

exactly half, because $\sqrt{1/4} = 1/2$. A tighter tolerance demands more data, so the same 400 claims earn less weight.

Statements I and III are true, so the answer is **C**.

**Why not the others**

- **A** — rejects III, typically by assuming $n_{\text{full}}$ scales with $k^{-1}$ rather than $k^{-2}$ (doubling the standard and cutting $Z$ by a factor of $\sqrt{2}$ only, to 0.430), or by forgetting that the square root rule passes the change through to $Z$.
- **B** — accepts II, which reverses the role of the VHM: variation *between* risks is what makes a risk's own experience informative, so more of it raises $Z$. Statement II would be true of the EPV, not the VHM.
- **D** — accepts II and rejects I. Rejecting I usually comes from putting $Z$ on the complement, giving 0.40(300) + 0.60(500) = 420.
- **E** — would need a true set that A–D do not list (such as all three, or II only); here exactly I and III are true, which is C.
