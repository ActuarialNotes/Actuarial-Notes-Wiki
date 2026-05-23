- **Combinatorics** is a branch of discrete mathematics.
- Combinatorics is about counting the number of ways to arrange, select, or partition objects.
- Combinatorics provides the tools needed to compute probabilities when outcomes are equally likely.
- The two fundamental problems are counting **ordered** arrangements (permutations) and **unordered** selections (combinations).
- $$|\text{arrangements of } n \text{ objects}| = n! = n \times (n-1) \times \cdots \times 2 \times 1$$
- In probability, combinatorics is used to determine the sizes of events and sample spaces
- $P(A) = |A| / |S|$ for uniform experiments.

> [!example]- Counting Equally Likely Outcomes for a Lottery {Example}
> A lottery draws 3 numbers from $\{1, 2, 3, 4, 5\}$ without replacement. How many equally likely outcomes are there if order does not matter?
>
> > [!answer]- Answer
> > This is a combination problem (order irrelevant, no replacement):
> > $$\binom{5}{3} = \frac{5!}{3!\,2!} = \frac{120}{6 \times 2} = 10$$
> > There are 10 equally likely outcomes, so each has probability $1/10 = 0.10$.
