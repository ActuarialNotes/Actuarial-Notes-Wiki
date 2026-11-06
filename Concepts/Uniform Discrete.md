---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:9dd346b84d9fed57902eb7e70eb9e06da9fb6d7ab96893a0a520948cced217a5
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 6.2 Exercise 11: X chosen at random from 1..n has E(X) = (n+1)/2, V(X) = (n-1)(n+1)/12, p.264 (PDF p.272), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), Deductibles section (PDF p.7), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Uniform Discrete.md
---

The **Discrete Uniform Distribution** $X \sim \text{Unif}\{1, \ldots, n\}$ assigns the same probability to each of $n$ consecutive integers. It models an experiment whose outcomes are all equally likely, such as the roll of a fair die.

> $$P(X = k) = \frac{1}{n}, \quad k = 1, 2, \ldots, n$$

> $$E[X] = \frac{n+1}{2}$$

> $$\text{Var}(X) = \frac{n^2 - 1}{12}$$

- On a general range $\{a, a+1, \ldots, b\}$ there are $n = b - a + 1$ values. The mean is $(a+b)/2$ and the variance is still $(n^2 - 1)/12$.
- Compared with the [[Uniform Continuous Distribution|continuous uniform]] on $(a, b)$, whose variance is $(b-a)^2/12$, the discrete variance counts the values, not the length of the interval.

> [!idea] The idea
> Equal weights put the mean in the middle of the range. The spread depends only on how many values there are, not on where the range sits, because shifting every value by the same amount moves the mean with it.

![[Media/Figures/Uniform_Discrete.svg|340]]

## Days to settle a claim

A small claim takes $N$ days to settle, where $N$ is equally likely to be any of $1, 2, \ldots, 6$. Each value has probability $1/6$.

The mean is the average of the six values.

> $$E[N] = \frac{1 + 2 + \cdots + 6}{6} = \frac{21}{6} = 3.5$$

- In general, $1 + 2 + \cdots + n = n(n+1)/2$, and dividing by $n$ gives $(n+1)/2$.

## The variance from the sum of squares

The variance needs $E[N^2]$, the average of the squared values.

> $$E[N^2] = \frac{1 + 4 + 9 + 16 + 25 + 36}{6} = \frac{91}{6}$$

- $\text{Var}(N) = 91/6 - 3.5^2 = 35/12 \approx 2.917$.
- In general, $1^2 + \cdots + n^2 = n(n+1)(2n+1)/6$. Dividing by $n$ and subtracting $\left(\frac{n+1}{2}\right)^2$ simplifies to $(n^2-1)/12$.

## A cost that depends on the days

Suppose the cost of settling is $C = 10N^2 + 50N$. Its mean is a sum over the same six equally likely values, so it uses the moments already found.

> $$E[C] = 10\,E[N^2] + 50\,E[N]$$

- $E[C] = 10(91/6) + 50(3.5) = 151.67 + 175 = 326.67$.
- Any function of $N$ works the same way: $E[g(N)] = \frac{1}{n}\sum_k g(k)$.

## A range that does not start at 1

If every claim took 10 more days, $N + 10$ would be uniform on $\{11, \ldots, 16\}$. The mean moves to 13.5. The variance stays $35/12$, because there are still six values one day apart.

- Use $(a+b)/2$ for the mean on $\{a, \ldots, b\}$. The formula $(n+1)/2$ assumes the range starts at 1.

## Discrete or continuous?

Treating $N$ as continuous on $(1, 6)$ gives a variance of $25/12 \approx 2.08$, not $35/12$. The two models put their probability in different places.

> [!trap] Using $(b-a)^2/12$ for a discrete range
> For $\{1, \ldots, 6\}$ the discrete variance is $(6^2 - 1)/12 = 35/12$. The continuous formula on $(1, 6)$ gives $25/12$, which is too small. Count the values, $n = b - a + 1$, and use $(n^2-1)/12$.

## Try it

> [!example]- A deductible on a discrete uniform loss {Example}
> A loss $X$ is equally likely to be any integer from 1 to 10 (in thousands). A deductible of 4 applies, so the insurer pays $Y = (X-4)_+$. Find $E[Y]$.
>
> > [!answer]-
> > **Plan:** average the payment over the ten equally likely losses.
> >
> > Losses of 1 to 4 pay nothing. Losses of 5 to 10 pay $1, 2, \ldots, 6$.
> > $$
> > \begin{align*}
> > E[Y] &= \frac{1}{10}(1+2+3+4+5+6) \\
> >      &= \frac{21}{10} \\
> >      &= 2.1
> > \end{align*}
> > $$
> > The insurer expects to pay 2.1 thousand per loss, against a ground-up mean of 5.5. The [[Deductible|deductible]] removes $E[X \wedge 4] = (1+2+3+4 \times 7)/10 = 3.4$ on average, less than the full 4, because a loss of 1, 2 or 3 is withheld only up to its own amount.

> [!example]- A range from 20 to 29 {Example}
> Claim counts are equally likely to be any integer from 20 to 29. Find the mean and variance.
>
> > [!answer]-
> > **Plan:** count the values, then use the general-range formulas.
> >
> > There are $n = 29 - 20 + 1 = 10$ values.
> > $$E[X] = \frac{20 + 29}{2} = 24.5$$
> > $$\text{Var}(X) = \frac{10^2 - 1}{12} = 8.25$$
> > Why not $(n+1)/2 = 5.5$? That formula assumes the range starts at 1.

> [!warning]- Exam traps
> - **Assuming the range starts at 1.** On $\{a, \ldots, b\}$ the mean is $(a+b)/2$.
> - **Miscounting the values.** $\{a, \ldots, b\}$ has $b - a + 1$ values, not $b - a$. The range $\{0, \ldots, 10\}$ has 11 values.
> - **The continuous formula.** $(b-a)^2/12$ belongs to the continuous uniform and understates the discrete variance.
