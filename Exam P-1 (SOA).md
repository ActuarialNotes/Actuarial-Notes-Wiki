---
aliases:
  - Exam P
  - P
---
[[Actuarial Notes Wiki|Wiki]] / [[Actuarial Certifications]] / [[Society of Actuaries (SOA)]] / **Exam P-1 (SOA)**

<div class="exam-nav"
	 data-color="#2563eb"
     data-current="P-1|Probability"
     data-next="FM-2|Financial Mathematics|Exam FM-2 (SOA).md"
</div>

<a href= "https://www.soa.org/4ab79c/globalassets/assets/files/edu/2026/spring/syllabi/2026-03-exam-p-syllabus.pdf" class="download-link download-link--blue">Exam P-1 Syllabus - March 2026</a>

## Exam P-1 Syllabus
The **Probability (P-1) Exam** is a 3 hour, 30 multiple choice question exam about probability theory concepts and their application to measuring risk.

### Prerequisite Knowledge
- Concepts in [[calculus]], including series, differentiation, and integration.
- Concepts introduced in [Risk and Insurance](https://www.soa.org/49355c/globalassets/assets/files/edu/p-21-05.pdf)

### Exam Topics

| Topic                            | Weight |
| -------------------------------- | ------ |
| 1. General Probability           | 23-30% |
| 2. Univariate Random Variables   | 44-50% |
| 3. Multivariate Random Variables | 23-30% |


### 1. General Probability
> [!example]- **Learning Objective**: Understand basic concepts of probability and discrete mathematics. {15 concepts}

==Probability== is the mathematical framework that quantifies uncertainty by assigning numerical values (between 0 and 1) to the likelihood of events occurring. The mathematics of probability is expressed naturally in terms of sets.

---

#### Foundations of Probability Theory
###### Set Theory
![[Set Theory#Definition]]

###### Venn Diagram

![[Venn Diagram#Definition]]

###### Sample Space

![[Sample Space#Definition]]

###### Event

![[Event#Definition]]

###### Set Operations
![[Set Operations#Definition]]

###### Set Function

![[Set Function#Definition]]

#### Probability Laws and Rules

###### Probability

![[Probability#Definition]]

###### Axioms of Probability

![[Axioms of Probability#Definition]]

###### Inclusion-Exclusion Principle

![[Inclusion-Exclusion Principle#Definition]]

###### Probability Addition Rule

![[Probability Addition Rule#Definition]]

###### Probability Multiplication Rules

![[Probability Multiplication Rules#Definition]]



###### Bayes Theorem

![[Bayes Theorem#Definition]]

#### Conditional Probability and Independence
###### Independent Events

![[Independent Events#Definition]]

###### Mutually Exclusive Events

![[Mutually Exclusive Events#Definition]]

###### Conditional Probability

![[Conditional Probability#Definition]]

###### The Law of Total Probability

![[The Law of Total Probability#Definition]]

#### Combinatorics
###### Combinatorics

![[Combinatorics#Definition]]

###### Combination

![[Combination#Definition]]

###### Permutation

![[Permutation#Definition]]

#### Practice Problems

> [!question]- **Problem 1.1** — An urn contains 10 balls: 4 red and 6 blue. Two balls are selected at random without replacement. What is the probability that both balls are red?
> **A.** 2/15
> **B.** 4/25
> **C.** 1/5
> **D.** 4/15
> **E.** 2/5

> [!solution]- **Solution 1.1**
> Using combinations:
> $$P(\text{both red}) = \frac{\binom{4}{2}}{\binom{10}{2}} = \frac{6}{45} = \frac{2}{15}$$
>
> **Answer: A**

> [!question]- **Problem 1.2** — A survey of 200 students found that 120 study math, 90 study science, and 40 study both. What is the probability that a randomly selected student studies neither?
> **A.** 0.10
> **B.** 0.15
> **C.** 0.25
> **D.** 0.30
> **E.** 0.85

> [!solution]- **Solution 1.2**
> By the inclusion-exclusion principle:
> $$P(M \cup S) = P(M) + P(S) - P(M \cap S) = \frac{120}{200} + \frac{90}{200} - \frac{40}{200} = \frac{170}{200} = 0.85$$
> $$P(\text{neither}) = 1 - 0.85 = 0.15$$
>
> **Answer: B**

---

### 2. Univariate Random Variables

> [!example]- **Learning Objective:** Understand Discrete Univariate Distributions and Continuous Univariate Distributions and their applications. {20 concepts}
> - Discrete distributions include: binomial, geometric, hypergeometric, negative binomial, Poisson, uniform
> - Continuous distributions include beta, exponential, gamma, lognormal, normal, and uniform)

A ==Univariate Random Variable== is a single random variable that represents uncertain outcomes of an experiment, taking values in one dimension.



<figure>
  <img src="Media/Attachments/Symmetric distribution for continuous probability distribution.png" alt="Standard Normal Distribution">
</figure>

#### Discrete Random Variables

###### Random Variable

![[Random Variable#Definition]]

###### Probability Mass Function (PMF)

![[Probability Mass Function (PMF)#Definition]]


###### Expected Value

![[Expected Value#Definition]]


###### Probability Density Function (PDF)

![[Probability Density Function (PDF)#Definition]]

###### Cumulative Distribution Function (CDF) 

![[Cumulative Distribution Function (CDF)#Definition]]

###### Variance

![[Variance#Definition]]

###### Standard Deviation (SD)

![[Standard Deviation (SD)#Definition]]

###### Moments

![[Moments#Definition]]

###### Mode

![[Mode#Definition]]

###### Median

![[Median#Definition]]

###### Percentile

![[Percentile#Definition]]

###### Coefficient of Variation

![[Coefficient of Variation#Definition]]

#### Insurance & Payment Modifications

###### Policy Adjustments

![[Policy Adjustments#Definition]]

###### Deductible

![[Deductible#Definition]]

###### Coinsurance

![[Coinsurance#Definition]]

###### Benefit Limits

![[Benefit Limits#Definition]]

###### Payment

![[Payment#Definition]]

###### Inflation

![[Inflation#Definition]]

###### Loss Random Variable

![[Loss Random Variable#Definition]]

###### Payment Random Variable

![[Payment Random Variable#Definition]]

#### Practice Problems

> [!question]- **Problem 2.1** — A continuous random variable $X$ has PDF $f(x) = 3x^2$ for $0 < x < 1$. Calculate $E[X]$.
> **A.** 1/2
> **B.** 3/5
> **C.** 2/3
> **D.** 3/4
> **E.** 4/5

> [!solution]- **Solution 2.1**
> $$E[X] = \int_0^1 x \cdot 3x^2\, dx = 3\int_0^1 x^3\, dx = 3 \cdot \frac{x^4}{4}\Big|_0^1 = \frac{3}{4}$$
>
> **Answer: D**

> [!question]- **Problem 2.2** — An insurance policy has a deductible of 100. Losses follow an exponential distribution with mean 200. What is the expected payment per loss?
> **A.** 100
> **B.** $200 e^{-1/2}$
> **C.** $100 e^{-1/2}$
> **D.** $200(1 - e^{-1/2})$
> **E.** $100(1 + e^{-1/2})$

> [!solution]- **Solution 2.2**
> For an exponential distribution with mean $\theta = 200$ and deductible $d = 100$:
> $$E[\text{payment per loss}] = E[(X - d)^+] = \theta \cdot e^{-d/\theta} = 200 \cdot e^{-100/200} = 200e^{-1/2}$$
> This uses the memoryless property of the exponential distribution.
>
> **Answer: B**

---

### 3. Multivariate Random Variables

> [!example]- **Learning Objective:** Understand key concepts in the discrete and continuous settings concerning multivariate distributions, the distribution of order statistics for independent random variables, and linear combinations of independent random variables, along with associated applications. {10 concepts}

A ==Multivariate Random Variable== is a collection of two or more random variables considered jointly, capturing the relationships and dependencies among them.

<figure>
  <img src="Media/Attachments/Multivariate Gaussian.png">
</figure>


---

#### Joint Probability

###### Joint Probability Function

![[Joint Probability Function#Definition]]

###### Joint Cumulative Distribution Function

![[Joint Cumulative Distribution Function#Definition]]

###### Conditional Probability Function

![[Conditional Probability Function#Definition]]

###### Marginal Probability Function

![[Marginal Probability Function#Definition]]

###### Joint Moments

![[Joint Moments#Definition]]

#### Dependence Measures

###### Covariance

![[Covariance#Definition]]

###### Correlation Coefficient

![[Correlation Coefficient#Definition]]

#### Functions of Multiple Random Variables

###### Linear Combination

![[Linear Combination#Definition]]

###### Moments

![[Moments#Definition]]

###### Order Statistics

![[Order Statistics#Definition]]

###### Central Limit Theorem (CLT)

![[Central Limit Theorem (CLT)#Definition]]

#### Practice Problems

> [!question]- **Problem 3.1** — Let $X$ and $Y$ be independent random variables with $E[X] = 3$, $E[Y] = 5$, $\text{Var}(X) = 4$, and $\text{Var}(Y) = 9$. Calculate $\text{Var}(2X - Y + 1)$.
> **A.** 7
> **B.** 16
> **C.** 22
> **D.** 25
> **E.** 31

> [!solution]- **Solution 3.1**
> Since $X$ and $Y$ are independent:
> $$\text{Var}(2X - Y + 1) = 4\,\text{Var}(X) + \text{Var}(Y) = 4(4) + 9 = 25$$
> Constants do not affect variance.
>
> **Answer: D**

> [!question]- **Problem 3.2** — Two fair dice are rolled. Let $X$ be the minimum and $Y$ be the maximum of the two outcomes. Calculate $E[Y - X]$.
> **A.** 25/18
> **B.** 35/18
> **C.** 45/18
> **D.** 55/18
> **E.** 65/18

> [!solution]- **Solution 3.2**
> For two fair dice, by direct enumeration over all 36 equally likely outcomes:
> $$E[Y - X] = \frac{1}{36}\sum_{i=1}^{6}\sum_{j=1}^{6} |i - j| = \frac{70}{36} = \frac{35}{18}$$
>
> **Answer: B**


## Sources

| Source                                                                                    | Coverage                                                                                            |
| ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [[A First Course in Probability (Ross - 2019)]]                                           | Chapters 1-8^[Excluding 4.8.4, 5.6.2, 5.6.3, 5.6.5, 5.7, 7.2.1, 7.2.2, 7.3, 7.6, 7.7, 7.8, 7.9]<br> |
| [[Mathematical Statistics with Applications - 2008]]                                      | Chapters 1-8^[Exlcuding 2.12, MGF, 4.10, Continuous Multivariate Distributions, 5.10, 7.4]          |
| [[Probability for Risk Management (Hassett - 2021)]]                                      | Chapters 1-11                                                                                       |
| [[Probability and Statistics with Applications-- A Problem-Solving Text (Asimow - 2021)]] | Chapters 1-8                                                                                        |
| [[Probability and Statistical Inference (Hogg - 2020)]]                                   | Chapters 1-5                                                                                        |
| [[Probability (Leemis - 2018)]]                                                           | Chapters 1-8                                                                                        |




