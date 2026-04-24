$$X : S \to \mathbb{R}$$

A Random Variable ($X$) is a function that assigns a real number to each outcome in a sample space $S$, enabling numerical analysis of random experiments.

Random variables are classified as discrete (countable range) or continuous (uncountable range). They are fully characterized by their probability distribution, which describes how probability is spread across their possible values.

> [!example]- Defining a Random Variable for Coin Flips {💡 Example}
> Two fair coins are flipped. Define a random variable $X$ as the number of heads. List the values $X$ can take and their probabilities.
>
> > [!answer]- Answer
> > The sample space is $S = \{HH, HT, TH, TT\}$, each with probability $1/4$. The random variable $X$ maps:
> > $$X(TT) = 0,\quad X(HT) = X(TH) = 1,\quad X(HH) = 2$$
> > So the distribution is $P(X=0)=\tfrac{1}{4}$, $P(X=1)=\tfrac{1}{2}$, $P(X=2)=\tfrac{1}{4}$.
