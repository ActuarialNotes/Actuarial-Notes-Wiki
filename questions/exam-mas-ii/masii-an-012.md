---
id: "masii-an-012"
exam: "Exam MAS-II"
topic: "Neural Network"
learning_objective: "Statistical Learning"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Neural+Network
  - Concepts/Hidden+Layer
  - Concepts/Activation+Function
answer: "E"
points: 2
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:5eb6c3dbaa9e552600b4a007180fc7b4d0956c4c1599110b4a884a54de76f080
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted PDF, §10.1 eqs.(10.1)-(10.5), PDF pp.411-412: f(X) = beta0 + sum beta_k g(w_k0 + sum w_kj X_j); sigmoid (10.4); ReLU g(z) = (z)+ (10.5), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-ii/masii-an-012.md
---

A neural network for a quantitative response has two inputs, one hidden layer of three units with the ReLU activation $g(z) = \max(0, z)$, and a linear output layer:

$$
f(X) = \beta_0 + \sum_{k=1}^{3}\beta_k\, g\!\left(w_{k0} + w_{k1}X_1 + w_{k2}X_2\right)
$$

The fitted weights are:

| Unit $k$ | $w_{k0}$ | $w_{k1}$ | $w_{k2}$ | $\beta_k$ |
| :--- | ---: | ---: | ---: | ---: |
| 1 | 0.5 | 1.0 | 0.5 | 0.8 |
| 2 | -1.0 | 0.25 | 1.5 | 0.5 |
| 3 | 0.2 | -0.4 | -1.0 | -1.5 |

and $\beta_0 = 0.6$.

Calculate the network's prediction for $X_1 = 2$, $X_2 = -1$.

- A) 0.47
- B) 0.60
- C) 1.00
- D) 1.50
- E) 1.60

## Explanation

Each hidden unit forms a linear combination of the inputs, then passes it through the activation:

$$
\begin{aligned}
z_1 &= 0.5 + 1.0(2) + 0.5(-1) \\
&= 2.0 \\
A_1 &= \max(0, 2.0) = 2.0 \\[4pt]
z_2 &= -1.0 + 0.25(2) + 1.5(-1) \\
&= -2.0 \\
A_2 &= \max(0, -2.0) \\
&= 0 \\[4pt]
z_3 &= 0.2 - 0.4(2) - 1.0(-1) \\
&= 0.4 \\
A_3 &= \max(0, 0.4) = 0.4
\end{aligned}
$$

The output layer is linear in the activations:

$$
f(X) = 0.6 + 0.8(2.0) + 0.5(0) - 1.5(0.4) = \mathbf{1.60}
$$

The answer is **E**.

**Why not the others**

- **A** — uses the sigmoid $g(z) = 1/(1 + e^{-z})$ in place of ReLU.
- **B** — skips the activation and feeds $z_2 = -2.0$ straight through. ReLU switches unit 2 off for this input; without the non-linearity the network is just a linear model.
- **C** — drops the output bias $\beta_0$.
- **D** — drops the hidden-unit biases $w_{k0}$, which shift where each ReLU switches on.
