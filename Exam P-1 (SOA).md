<div class="exam-nav"
     data-current="P-1|Probability"
</div>

# Exam P-1
The Probability (P-1) Exam is a 3 hour SOA exam with 30 multiple choice questions that cover probability concepts and applications to measuring risk.

## Prerequisite knowledge
- [[Calculus]], including series, differentiation, and integration.
- Concepts introduced in [[Resources/Books/Risk and Insurance (SOA)]]

> [!info]- Exam day: format, tools, and scoring
> - **Format** — 3 hours, 30 multiple-choice questions, computer-based at a Prometric centre. That is **6 minutes per question** including reading time; a question you cannot start within 30 seconds should be flagged and skipped.
> - **No formula sheet is provided.** Every density, mean, and variance on this page must be recalled from memory. This is the single biggest difference from a university course with an aid sheet.
> - **A standard normal table *is* provided**, on-screen under an Exhibit button. You may not bring your own copy.
> - **Approved calculators** — TI BA-35, BA II Plus, BA II Plus Professional, TI-30Xa, TI-30X II (IIS/IIB), or TI-30X MultiView (XS/XB). Anything else disqualifies the exam. Bring two, with fresh batteries.
> - **Scoring** — scaled 0–10 with **6 required to pass**; the pass mark is set before the sitting using Item Response Theory. There is no penalty for a wrong answer, so never leave a question blank.

> [!tip]- How to work through this material
> A rough order that matches how the topics build, rather than the order they are listed in:
>
> 1. **General Probability first** — it is the smallest section and everything else conditions on it. Get [[Conditional Probability]], [[The Law of Total Probability]], and [[Bayes Theorem]] genuinely automatic before moving on.
> 2. **Univariate distributions next** (the largest section at 44–50%). Learn the six discrete and six continuous families as a *set*: for each, the story it models, its support, PMF/PDF, mean, and variance. The hard skill is identification, not integration — see the selector tables on [[Discrete Univariate Distributions]] and [[Continuous Univariate Distributions]].
> 3. **Insurance applications** ([[Deductible]], [[Benefit Limit]], [[Coinsurance Percentage]], [[Inflation]]) are pure calculus applied to a [[Transformations of Random Variables|transformed]] loss variable. They are heavily tested and consistently under-practised because they do not appear in a standard university probability course.
> 4. **Multivariate last.** The [[Joint Probability Density Function|continuous joint density]] material is where most candidates lose marks, and the obstacle is almost always setting up the double-integral limits over a non-rectangular region — not the integration itself. Sketch the region every single time.
>
> **If you are coming from a second-year university probability course**, the gaps are usually the same four: memorization without an aid sheet, insurance payment variables, non-rectangular double integrals, and speed. Working problems under a 6-minute clock is not optional preparation — it is the exam.

## Learning Objectives

> [!example]- General Probability {23-30%}
> Understand basic concepts of [[Probability]] and [[Discrete Mathematics]].
> 1. Define [[Set Function]], [[Venn Diagram]], [[Sample Space]], and [[Event]]. Define probability as a set function on a collection of events and state the basic [[Axioms of Probability]]. Use [[Set Theory]] to represent and analyze events.
> 2. Calculate probabilities using [[Combinatorics]], such as [[Combination]] and [[Permutation]].
> 3. Define [[Independent Events|Independence]] and calculate probabilities of [[Independent Events]].
> 4. Calculate probabilities of [[Mutually Exclusive Events]].
> 5. Calculate probabilities using [[Probability Addition Rule]] and [[Probability Multiplication Rule|Probability Multiplication Rules]], including the [[Inclusion-Exclusion Principle]].
> 6. Define and calculate [[Conditional Probability]].
> 7. State [[Bayes Theorem]] and [[The Law of Total Probability]] and use them to calculate conditional probabilities.
> 

> [!example]- Univariate Random Variables {44-50%}
> Understand [[Discrete Univariate Distributions]] and [[Continuous Univariate Distributions]] and their applications. 
> 1. Explain and apply the concepts of [[Probability]], [[Random Variable|Random Variables]], [[Probability Density Function (PDF)|probability density functions]], and [[Cumulative Distribution Function (CDF)|cumulative distribution functions]].
> 2. Calculate [[Conditional Probability|Conditional Probabilities]].
> 3. Explain and calculate expected values, including moments, mode, median, and [[Percentile|percentiles]].
> 4. Explain and calculate [[Variance]], [[Standard Deviation]], and [[Coefficient of Variation]].
> 5. Calculate the amount that an insurance company pays to a policyholder for a claim given [[Policy Information]], including [[Deductible|Deductibles]], [[Coinsurance Percentage|Coinsurance Percentages]], and [[Benefit Limit|Benefit Limits]], as well as other factors, such as [[Inflation]].
> 6. Calculate the [[Expected Value]], [[Variance]], and [[Standard Deviation]] of both the [[Loss Random Variable]] and the corresponding [[Payment Random Variable]], applying the relevant [[Transformations of Random Variables|transformation]] to the loss.
>
> ### Discrete Univariate Distributions 
> - [[Binomial Distribution]]
> - [[Geometric Distribution]]
> - [[Hypergeometric Distribution]]
> - [[Negative Binomial Distribution]]
> - [[Poisson Distribution]]
> - [[Uniform Discrete|Uniform]]
>
> ### Continuous Univariate Distributions 
> - [[Beta]]
> - [[Exponential Distribution]]
> - [[Gamma]]
> - [[Lognormal Distribution]]
> - [[Normal Distribution]]
> - [[Uniform Continuous Distribution|Uniform]]

> [!example]- Multivariate Random Variables {23-30%}
> Understand key concepts in the discrete and continuous settings concerning [[Multivariate Distribution|Multivariate Distributions]], the [[Order Statistics|Distribution of Order Statistics]] for [[Independent Random Variables]], and [[Linear Combinations of Random Variables|linear combinations]] of independent random variables, along with associated applications. In the continuous setting the same calculations are carried out on a [[Joint Probability Density Function]], where the work is setting up the region of integration.
> 1. Determine [[Joint Probability Function|Joint Probability Functions]] and [[Joint Cumulative Distribution Function|Joint Cumulative Distribution Functions]] for discrete random variables.
> 2. Determine [[Conditional Probability Function]] and [[Marginal Probability Function]] for discrete random variables.
> 3. Calculate [[Moments for Joint Distributions]] for joint, conditional, and marginal discrete distributions.
> 4. Calculate [[Variance for Conditional and Marginal Distributions|Variance]] and standard deviation for conditional and marginal probability distributions for discrete random variables.
> 5. Calculate the [[Covariance]] and the [[Correlation Coefficient]] for discrete random variables.
> 6. Determine the [[Order Statistics|Joint Distribution of Order Statistics]] for a set of independent random variables.
> 7. Calculate [[Probabilities for Linear Combinations]] of independent discrete random variables as well as for continuous normal random variables.
> 8. Calculate [[Moments for Linear Combinations]] of independent random variables.
> 9. Apply the [[Central Limit Theorem]] to calculate approximations of probabilities for linear combinations of independent and identically distributed random variables.

## Source Material
> [!answer]- Source Material
>
> - [[A First Course in Probability (Ross - 2019)]]
>      - Chapters 1-8, Excluding 4.8.4, 5.6.2, 5.6.3, 5.6.5, 5.7, 7.2.1, 7.2.2, 7.3, 7.6, 7.7, 7.8, 7.9
> - [[Mathematical Statistics with Applications (Wackerly, Mendenhall, & Scheaffer - 2008)]]
>      - Chapters 1-8, Excluding 2.12, MGF, 4.10, Continuous Multivariate Distributions, 5.10, 7.4
> - [[Probability for Risk Management (Hassett - 2021)]]
>      - Chapters 1-11
> - [[Probability and Statistics with Applications - A Problem Solving Text (Asimow - 2021)]]
>      - Chapters 1-8
> - [[Probability and Statistical Inference (Hogg - 2020)]]
>      - Chapters 1-5
> - [[Probability (Leemis - 2018)]]
>      - Chapters 1-8
