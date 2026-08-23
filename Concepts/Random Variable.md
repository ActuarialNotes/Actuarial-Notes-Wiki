---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:318e4dfa1228d6e3e1aeb961b5b30de60c8762092756435e7724838bbef38fc8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Random Variable.md
---

A **Random Variable** $X$ is a function that assigns a real number to each outcome in a [[Sample Space]] $S$, enabling numerical analysis of random experiments.

> $$X : S \to \mathbb{R}$$

- Random variables are classified as discrete (countable range of outcomes) or continuous (uncountable range of outcomes)
- They are fully characterized by their probability distribution, which describes how probability is spread across their possible values

![[Media/Figures/Random_Variable.svg|340]]

> [!example]- Defining a Random Variable for Coin Flips {Example}
> Two fair coins are flipped. Define a random variable $X$ as the number of heads. List the values $X$ can take and their probabilities.
>
> > [!answer]-
> > The sample space is $S = \{HH, HT, TH, TT\}$, each with probability $1/4$. The random variable $X$ maps:
> > $$X(TT) = 0,\quad X(HT) = X(TH) = 1,\quad X(HH) = 2$$
> > So the distribution is $P(X=0)=\tfrac{1}{4}$, $P(X=1)=\tfrac{1}{2}$, $P(X=2)=\tfrac{1}{4}$.
