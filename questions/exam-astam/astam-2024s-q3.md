---
id: "astam-2024s-q3"
exam: "Exam ASTAM"
topic: "Aggregate Loss Model"
learning_objective: "Aggregate Models"
difficulty: medium
type: multi-part
year: 2024
session: Spring
wiki_link:
  - Concepts/Aggregate+Loss+Model
  - Concepts/Panjer+Recursion
  - Concepts/Stop-Loss+Reinsurance
  - Concepts/Binomial+Distribution
  - Concepts/Negative+Binomial+Distribution
  - Concepts/Frequency
points: 10
---

Let $S$ denote the aggregate claims for a portfolio of policies issued by ABC insurance company. You are given:

(i) The claim frequency, $N$, belongs to the $(a,b,0)$ class with $\mathrm{E}[N] = 1.0$ and $\mathrm{Var}[N] = 0.9$

(ii) The claim severity, $X$, also belongs to the $(a,b,0)$ class with $\mathrm{E}[X] = 10.0$ and $\mathrm{Var}[X] = 60.0$

## Part a (2 points)

Calculate the mean and standard deviation of $S$.

### Explanation
The mean is

$$E[S] = E[N]E[X] = 10.0$$

The variance is

$$\begin{align*}
\mathrm{Var}[S] &= E\big[\mathrm{Var}[X|N]\big] + \mathrm{Var}\big[E[X|N]\big] \\
&= E[N\,\mathrm{Var}[X]] + \mathrm{Var}[10N] \\
&= E[60N] + 100\,\mathrm{Var}[N] \\
&= 60 + 90 \\
&= 150 \\
\Rightarrow SD[S] &= \sqrt{150} \\
&= 12.2474
\end{align*}$$

### Examiner Report
a. Was well answered by most candidates. Some candidates applied the formula directly, with a few using an incorrect formula.
Many candidates only calculated the variance and not the standard deviation.

## Part b (2 points)

(i) Explain why $N$ must have a binomial distribution.

(ii) Identify the parameters of the distribution of $N$.

(iii) Identify the distribution and parameters of $X$.

### Explanation
(i) There are three (a,b,0) distributions.

- The binomial has variance < mean
- The Poisson has variance = mean
- The negative binomial has variance > mean.

Therefore, since variance < mean, $N$ must be binomially distributed.

(ii) Suppose $N \sim Bin(m, q)$. Then

$$E[N] = mq = 1; \quad Var[N] = mq(1 - q) = 0.9$$

$$\Rightarrow q = 0.1 \ \text{ and } \ m = 10$$

(iii) We know (from (i)) that the severity distribution is negative binomial.

That is:

$$\begin{align*}
&X_j \sim NB(r, \beta) \\
\Rightarrow\ &E[X_j] = r\beta = 10;\ Var[X_j] = r\beta(1+\beta) = 60 \\
\Rightarrow\ &\beta = 5; \quad r = 2
\end{align*}$$

### Examiner Report
b. Most well prepared candidates did well here.

## Part c (1 point)

Determine the probability generating function (pgf) of $S$.

### Explanation
The probability generating function of $S$ is

$$\begin{align*}
P_S(z) &= P_N(P_X(z)) \\
&= \left(1 + q\left((1 - \beta(z-1))^{-r} - 1\right)\right)^m \\
&= \left(1 + 0.1\left(\frac{1}{(1-5(z-1))^2} - 1\right)\right)^{10} \\
&= \left(0.9 + \frac{0.1}{(6-5z)^2}\right)^{10}
\end{align*}$$

### Examiner Report
c. Only a few candidates could answer the question. Many seemed not to understand what a PGF is, and confused it with a PDF.

## Part d (3 points)

Using the pgf or otherwise, calculate the following probabilities:

(i) $\Pr[S = 0]$

(ii) $\Pr[S > 1]$

### Explanation
(i) Using the pgf we have

$$Pr[S = 0] = P_S(0) = \left(0.9 + \frac{0.1}{36}\right)^{10} = 0.35959$$

Alternatively, let $Pr[X = k] = f_X(k)$, then

$$\begin{align*}
Pr[S = 0] &= P_N(f_X(0)); \\
f_X(0) &= \left(\frac{1}{6}\right)^2 \\
&= 0.027778 \\
\Rightarrow Pr[S = 0] &= \left(1 + 0.1(0.027778 - 1)\right)^{10} \\
&= 0.35959
\end{align*}$$

(ii) Using the pgf we have

$$\begin{align*}
Pr[S = 1] &= \frac{d}{dz}P_S(z)\bigg|_{z=0} \\
&= \frac{10}{(6-5z)^3}\left(0.9 + \frac{0.1}{(6-5z)^2}\right)^9\bigg|_{z=0} \\
&= 0.018441
\end{align*}$$

Hence, $Pr[S > 1] = 1 - 0.35959 - 0.01844 = 0.62197$

Alternatively, using Panjer recursions, we have

$$Pr[S = 1] = \frac{(a+b)f_X(1)f_S(0)}{1 - af_X(0)}$$

Where

$$\begin{align*}
a &= -\frac{q}{1-q} \\
&= -0.111111; \\
b &= \frac{(m+1)q}{1-q} \\
&= 1.222222; \\
f_X(1) &= r\left(\frac{\beta}{1+\beta}\right)\left(\frac{1}{1+\beta}\right)^r \\
&= 0.046296 \\
\Rightarrow Pr[S = 1] &= \frac{1.11111(0.046296)(0.35959)}{1 + 0.11111(0.027778)} \\
&= 0.018441
\end{align*}$$

Therefore, $Pr[S > 1] = 1 - 0.35959 - 0.01844 = 0.62197$

### Examiner Report
d. Very few candidates understood the link between the PGF and the PDF. And instead used brute force or alternative approaches.

## Part e (2 points)

ABC insurance is entering a stop-loss reinsurance agreement with a deductible $d = 2$. Calculate the net stop-loss premium.

### Explanation
The stop loss premium is:

$$\begin{align*}
E[(S-2)^+] &= E[S] - E[S \wedge 2] \\
E[S \wedge 2] &= 1f_S(1) + 2(Pr[S > 1]) \\
&= 1.26238 \\
\Rightarrow E[(S-2)^+] &= 10 - 1.26238 \\
&= 8.73762
\end{align*}$$

Alternatively:

$$E[(S-2)^+] = E[S] - 2 + 2f_S(0) + f_S(1) = 8.73762$$

### Examiner Report
e. Many candidates were able to write down the stop-loss formula, but were unable to solve it.
Better prepared candidates did well on this question.
