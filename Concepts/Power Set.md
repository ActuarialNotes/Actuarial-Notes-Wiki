---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:cefef3356a70bef39e98da5bd693201a2dcf8f062e70893ac9f9c595344fcc5b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Power Set.md
---

The **Power Set** of a set $S$, $\mathcal{P}(S)$, is the set of all subsets of $S$, including the empty set $\varnothing$ and $S$ itself. It is

> $$\mathcal{P}(S) = \{\, E : E \subseteq S \,\}$$

On a finite [[Sample Space|sample space]] $S$, $\mathcal{P}(S)$ is the natural collection of [[Event|events]] in [[Set Theory|set theory]]: every event is one of its members.

If $S$ is finite, the number of subsets of $S$ is

> $$|\mathcal{P}(S)| = 2^{|S|}$$

- $|S|$ is the number of elements of $S$.

Each element is either in or out of a given subset, which gives two choices per element.

> [!example]- An auto policy offers 5 distinct optional riders. How many coverage packages can a customer build, including the bare policy with no riders? {Example}
> - Each package is a subset of the 5 riders.
> - The number of packages is $|\mathcal{P}(S)| = 2^{5} = 32$.
> - This counts the empty set (no riders) and the full set (all five riders).

## Subsets of each size

Grouping the subsets by their size $k$ links the count to the [[Combination|combination]] counts, which sum to the power-set total:

> $$\sum_{k=0}^{n} \binom{n}{k} = 2^{n}$$

- $n = |S|$.

> [!example]- One of the subsets of $\{a, b, c\}$ is chosen at random. What is the probability that it has exactly 2 elements? {Example}
> - The sample space is the power set, with $2^3 = 8$ subsets.
> - By size they are $\varnothing$, then $\{a\}$, $\{b\}$, $\{c\}$, then $\{a, b\}$, $\{a, c\}$, $\{b, c\}$, then $\{a, b, c\}$.
> - The counts $1 + 3 + 3 + 1 = 8$ are $\binom{3}{0}$, $\binom{3}{1}$, $\binom{3}{2}$ and $\binom{3}{3}$.
> - The event has $\binom{3}{2} = 3$ subsets, so its [[Probability|probability]] is $3/8 = 0.375$.
