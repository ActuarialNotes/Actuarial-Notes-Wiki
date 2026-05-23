- **Probability** is a measure of how likely an event is to occur.
- It is a [[Set Function]] that maps events in a sample space to a real number between 0 and 1.
- If all outcomes in a finite sample space $S$ are equally likely, then
  - the probability of an event $A$ is the ratio of the "size" of the event to the "size" of the total space:
  - $$P(A) = \frac{|A|}{|S|}$$
- For any probability measure $P$ to be mathematically valid, it must satisfy the [[Axioms of Probability]]

> [!example]- Probability of a Fair Die? {Example}
> 
> ### The Big Idea
> We want to find the probability of a subset (even numbers) within the full universe of a die roll (1 through 6). Since the outcomes are mutually exclusive (you can't roll a 2 and a 4 at the same time), we can simply add their individual probabilities.
> 
> ### The Setup
> * **Sample Space ($S$):** $\{1, 2, 3, 4, 5, 6\}$
> * **Event ($E$):** Rolling an even number $\rightarrow \{2, 4, 6\}$
> 
> ### The Solve
> Using **Axiom 3**, we sum the probabilities of each distinct successful outcome:
> 
> $$P(E) = P(\{2\}) + P(\{4\}) + P(\{6\})$$
> 
> Since the die is fair, each face has a probability of $\frac{1}{6}$:
> 
> $$P(E) = \frac{1}{6} + \frac{1}{6} + \frac{1}{6} = \frac{3}{6} = \mathbf{50\%}$$
> 
> > [!tip] Common Trap
> > Always verify the sample space first. If the problem said "a die is rolled and the result is greater than 2," your $|S|$ would change from 6 to 4, which changes the denominator of every subsequent calculation!
