[[Wiki]] / [[Concepts]] / **Random Variable**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="Random Variable"
     data-prev=""
     data-next=""
     data-objectives="P-1|Probability|1. Univariate Random Variables|Exam P-1 (SOA)">
</div>

# Random Variable

## Definition

A ==random variable== is a function $X: \Omega \to \mathbb{R}$ mapping outcomes of a random experiment to real numbers. A random variable is **discrete** if its range is countable, and **continuous** if its range is uncountable.

$$ X: \Omega \to \mathbb{R} $$

> [!example]- <u>Example</u>
> Roll two fair six-sided dice and let $X$ be the sum of the faces.
> - The sample space is $\Omega = \{(i,j) : i,j \in \{1,2,3,4,5,6\}\}$ with $|\Omega| = 36$.
> - $X((1,1)) = 2$, $X((3,4)) = 7$, $X((6,6)) = 12$.
> - The range of $X$ is $\{2, 3, 4, \ldots, 12\}$, which is countable, so $X$ is a **discrete** random variable.
> - $P(X = 7) = \frac{6}{36} = \frac{1}{6}$ since there are 6 outcomes that sum to 7.
