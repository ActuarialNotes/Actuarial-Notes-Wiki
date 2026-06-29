The **Power Set** $\mathcal{P}(S)$ of a set $S$ is the set of all subsets of $S$, including the empty set $\varnothing$ and $S$ itself. It is the building block for defining the collection of [[Event]]s on a [[Sample Space]] in [[Set Theory]].

> $$\mathcal{P}(S) = \{\, A : A \subseteq S \,\}, \qquad |\mathcal{P}(S)| = 2^{|S|}$$

- The cardinality $|\mathcal{P}(S)| = 2^{n}$ for a finite set with $n = |S|$ elements, because each element is independently either in or out of a given subset.
- It always contains both the empty set $\varnothing$ and the full set $S$.
- Grouping subsets by their size links the count to [[Combinatorics]]: $\sum_{k=0}^{n} \binom{n}{k} = 2^{n}$, so the [[Combination]] counts of every size sum to the power-set total.
- On a finite [[Sample Space]], $\mathcal{P}(S)$ is the natural event space — every event is one of its members.

> [!example]- Counting Policy Rider Combinations {Example}
> An auto policy offers 5 distinct optional riders (roadside, rental, glass, gap, accident-forgiveness). How many different coverage packages can a customer build, including the bare policy with no riders?
>
> > [!answer]-
> > Each package is a subset of the 5 riders, so the number of packages is the size of the power set:
> > $$|\mathcal{P}(S)| = 2^{5} = 32$$
> > This counts the empty set (no riders) and the full set (all five riders) among the 32 possible packages.

> [!example]- Decomposing the Power Set by Subset Size {Example}
> List the power set of $S = \{A, B, C\}$ and verify the count by summing the number of subsets of each size.
>
> > [!answer]-
> > The $2^{3} = 8$ subsets, grouped by size, are:
> > $$
> > \begin{align*}
> > \text{size } 0 &: \ \varnothing \\
> > \text{size } 1 &: \ \{A\},\ \{B\},\ \{C\} \\
> > \text{size } 2 &: \ \{A,B\},\ \{A,C\},\ \{B,C\} \\
> > \text{size } 3 &: \ \{A,B,C\}
> > \end{align*}
> > $$
> > Summing the [[Combination]] counts of each size reproduces the total:
> > $$\binom{3}{0} + \binom{3}{1} + \binom{3}{2} + \binom{3}{3} = 1 + 3 + 3 + 1 = 8$$
