---
concept: "Calculus"
exam: exam-p
topic: "Prerequisite Knowledge"
correct: A
---
A continuous random variable has cumulative distribution function $F$ and density $f$. Which pairing of operations is correct?

- A) $f = F'$, and $P(a \le X \le b) = \int_a^b f(x)\,dx$
- B) $f = F'$, and $P(a \le X \le b) = f(b) - f(a)$
- C) $f = \int F$, and $P(a \le X \le b) = \int_a^b f(x)\,dx$
- D) $f = \int F$, and $P(a \le X \le b) = f'(b) - f'(a)$

<!-- rationale: 1: applies the Fundamental Theorem to the density instead of to its antiderivative — F(b)−F(a) is right, f(b)−f(a) is not · 2: inverts the derivative half, treating the CDF as the thing accumulated rather than the accumulation · 3: reverses both operations, the classic "which one undoes which" slip -->
