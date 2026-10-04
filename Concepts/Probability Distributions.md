---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1ba234abb638d36ee597b57903d5d181b507e471198bfc3144d4175bca651f10
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Probability Distributions.md
---

**External Resources**
1. [ProbStats](https://probstats.org/) for visual plots.
2. ProbOnto (Probability Distribution Ontology) for data about distributions and their relationships.
3. SIPMath 3.0 for data structures for probability distributions.
---

## Probability Distributions

- **Uniform** (a Die Roll)
- **Binomial** (a Coin Flip)
- **Poisson** (N Coins Flips)
- **Normal** (Many Coin Flips)
	- **t-Distribution**
- **Exponential** ()
- **Gamma** ()

Relationships

- **Binomial → Poisson**: As $n \to \infty, p \to 0, np = \lambda$.
- **Binomial → Normal**: As $n \to \infty, np \text{ and } n(1-p)$ are large.
- **Poisson → Normal**: As $\lambda$ becomes large.

**Exponential Family**
$f(x∣θ)=h(x)exp(η(θ)T(x)−A(θ))$

### Binomial
Tossing a coin n times, how likely to get k heads?
### Poisson

### Normal

### Exponential

---

## Central Concepts

- **Central Limit Theorem**

![[Media/Figures/Probability_Distributions.svg|340]]
