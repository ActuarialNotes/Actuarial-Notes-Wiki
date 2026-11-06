# Exemplar: a concept page in the standard shape

`Concepts/Permutation.md`, as the maintainer approved it on 2026-11-06. It was
written from their own draft, and it shows every part of the shape: the
figure, the definition, two boxed forms of the formula with their bullets, an
example under the formula, and sections that each add one variation.
`Concepts/Probability.md` (with a trap card) and `Concepts/Combinatorics.md`
(with an idea card, and a section with no new terms) are the other two models.

````markdown
![[Media/Figures/Permutation.svg|340]]

A **Permutation** is an ordered arrangement of distinct objects. The number of permutations of $k$ objects chosen from $n$ distinct objects, ${}_{n}P_{k}$, is

> $${}_{n}P_{k} = n \times (n-1) \times \cdots \times (n-k+1)$$

> $${}_{n}P_{k} = \frac{n!}{(n-k)!}$$

- $n!$, read "$n$ factorial", is $n \times (n-1) \times \cdots \times 2 \times 1$, with $0! = 1$.
- $k \le n$.

> [!example] In a race with 10 runners, how many ways are there to award gold, silver and bronze medals?
> - Any of the 10 runners could win gold. Once gold is awarded, there are 9 remaining runners who could win silver, then 8 who could win bronze.
> - ${}_{10}P_{3} = 10 \times 9 \times 8 = 720$.

## Arranging all $n$ objects

When all $n$ objects are arranged, $k = n$ and the number of permutations is

> $${}_{n}P_{n} = n!$$

…

## Arrangements with repeated objects

When the $n$ objects are not all distinct, arranging identical objects among themselves produces no new arrangement. If there are $r$ types of object, the number of distinct arrangements of all $n$ is

> $$\frac{n!}{n_1!\, n_2! \cdots n_r!}$$

- $n_i$ is the number of identical objects of type $i$, with $n_1 + n_2 + \cdots + n_r = n$.

> [!example] How many distinct arrangements are there of the letters in LOSS?
> - There are $n = 4$ letters: one L, one O and two S's.
> - Swapping the two S's gives the same arrangement, so divide the $4!$ arrangements by $2!$.
> - There are $\frac{4!}{1!\,1!\,2!} = \frac{24}{2} = 12$ distinct arrangements.
````

## Notes on each part

- **The figure comes first.** It exists (`Media/Figures/Permutation.svg`), so it
  opens the page.
- **The definition introduces the symbols.** "$k$ objects chosen from $n$
  distinct objects, ${}_{n}P_{k}$" defines $n$, $k$ and the quantity in words,
  so the formula needs bullets only for $n!$ and the condition $k \le n$.
- **Two forms, two boxes.** The product, which the medals example uses, comes
  before the factorial form.
- **The bullets carry no reasoning.** The draft's "$k \le n$, because no
  object can be used twice" lost its reason in review: the definition already
  says the objects are arranged, not reused.
- **No idea card.** "Use a permutation when order matters" only repeated the
  definition, so it was cut.
- **The example applies the formula without announcing it.** The draft's "By
  the multiplication principle (see [[Combinatorics]])" was cut: the step is
  this page's own formula.
- **Each section is a variation** — all $n$ objects, then repeated objects —
  built like the opening: a sentence into the formula, the box, bullets for
  the new symbols, an example.
- **A probability appears.** The PIN example in *Arranging all $n$ objects*
  ends in $P(E)$, which ties the counting back to the exam's question.
