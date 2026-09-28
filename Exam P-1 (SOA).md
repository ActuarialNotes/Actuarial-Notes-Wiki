---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-27
  last_checked_by: agent:validate-v1
  content_hash: sha256:bbfd3a7b8147ffa519e9453d12eee221aaacf37e7d5759a3f94de1b2692555ec
  sources:
    - "SOA Probability Exam syllabus, November 2026 (7 pp.), REFERENCES pp.5-7, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397, https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "SOA Probability Exam syllabus, January 2027, sha256:252d07fc2b3be499bdee55caaf40f5bd610c2d9593bee2f0428b6614d4e14e2a, https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-01-exam-p-syllabus.pdf"
    - "SOA Probability Exam syllabus, September 2026, sha256:a67f56f7ef60ff673730e28b6b6361168d0889683c78373f29a1ed38c1e5d7e3, https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-09-p-syllabus.pdf"
    - "SOA Exam P Sample Questions (Aug 2026 rev.), full-text search, sha256:e47245963f7d2c1c4f8cc5ff1baf2090542d923ac47cbeb27d1f657ac51bf5f0, https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-questions.pdf"
  open_findings: 5
  open_critical: 0
  log: .verify/Exam P-1 (SOA).md
---

<div class="exam-nav"
     data-current="P-1|Probability">
</div>

# Exam P-1
The Probability (P-1) Exam is a three-hour SOA exam of 30 multiple-choice questions, administered as a computer-based test (CBT). Its syllabus develops knowledge of the fundamental probability tools for quantitatively assessing risk, with emphasis on their application to problems encountered in actuarial science.

- Each question has five answer choices, A to E, only one of which is correct; answers for some questions have been rounded.
- A few pilot questions are placed at random in the exam and are not scored; an unanswered question is scored incorrect.
- A table of values for the normal distribution is provided during the exam under an Exhibit button, so candidates may not bring a copy of it into the exam.

## Prerequisite knowledge
- [[Calculus]], including series, differentiation, and integration.
- Concepts introduced in [[Resources/Books/Risk and Insurance (SOA)]]

## Other Resources
- [Tables for Exam P](https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf) — the normal distribution table provided in the exam
- Exam P Sample Questions and Solutions: [questions](https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-questions.pdf) and [solutions](https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf)
- [Online Sample Exam P](https://www.soa.org/education/exam-req/syllabus-study-materials/edu-exam-p-online-sample/) — a balanced yet randomized set of questions on each attempt, drawn from the sample questions and coded to the learning objectives

## Learning Objectives

> [!example]- General Probability {23–30%}
> Understand basic concepts of [[Probability]] and [[Discrete Mathematics]].
> 1. Define [[Set Function|set functions]], [[Venn Diagram|Venn diagrams]], [[Sample Space|sample space]], and [[Event|events]]. Define [[Probability|probability]] as a [[Set Function|set function]] on a collection of [[Event|events]] and state the basic [[Axioms of Probability|axioms of probability]].
>    - *Key concepts:* [[Set Theory]]
> 2. Calculate [[Probability|probabilities]] using [[Combinatorics]], such as [[Combination]] and [[Permutation]].
> 3. Define [[Independent Events|Independence]] and calculate [[Probability|probabilities]] of [[Independent Events]].
> 4. Calculate [[Probability|probabilities]] of [[Mutually Exclusive Events]].
> 5. Calculate [[Probability|probabilities]] using [[Probability Addition Rule|addition]] and [[Probability Multiplication Rule|multiplication rules]].
>    - *Key concepts:* [[Inclusion-Exclusion Principle]]
> 6. Define and calculate [[Conditional Probability]].
> 7. State [[Bayes Theorem]] and [[The Law of Total Probability]] and use them to calculate [[Conditional Probability|conditional probabilities]].
> 

> [!example]- Univariate Random Variables {44–50%}
> Understand [[Discrete Univariate Distributions]] and [[Continuous Univariate Distributions]] and their applications. 
> 1. Explain and apply the concepts of [[Probability]], [[Random Variable|Random Variables]], [[Probability Density Function (PDF)|probability density functions]], and [[Cumulative Distribution Function (CDF)|cumulative distribution functions]].
> 2. Calculate [[Conditional Probability|Conditional Probabilities]].
> 3. Explain and calculate [[Expected Value|expected values]], including [[Moment|moments]], [[Mode|mode]], [[Median|median]], and [[Percentile|percentiles]].
> 4. Explain and calculate [[Variance]], [[Standard Deviation]], and [[Coefficient of Variation]].
> 5. Calculate the amount that an [[Insurer|insurance company]] pays to a [[Policyholder|policyholder]] for a [[Claim|claim]] given [[Policy Information]], including [[Deductible|Deductibles]], [[Coinsurance Percentage|Coinsurance Percentages]], and [[Benefit Limit|Benefit Limits]], as well as other factors, such as [[Inflation]].
> 6. Calculate the [[Expected Value|expected value]], [[Variance|variance]], and [[Standard Deviation|standard deviation]] of both the [[Loss Random Variable|loss random variable]] and the corresponding [[Payment Random Variable|payment amount random variable]].
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
> - [[Normal Distribution]]
> - [[Uniform Continuous Distribution|Uniform]]

> [!example]- Multivariate Random Variables {23–30%}
> Understand key concepts in the [[Discrete Random Variable|discrete]] and [[Continuous Random Variable|continuous]] settings concerning [[Multivariate Distribution|multivariate distributions]], the [[Order Statistics|distribution of order statistics]] for [[Independent Random Variables|independent random variables]], and [[Linear Combinations of Random Variables|linear combinations]] of [[Independent Random Variables|independent random variables]], along with associated applications.
> 1. Determine [[Joint Probability Function|Joint Probability Functions]] and [[Joint Cumulative Distribution Function|Joint Cumulative Distribution Functions]] for [[Discrete Random Variable|discrete random variables]].
> 2. Determine [[Conditional Probability Function]] and [[Marginal Probability Function]] for [[Discrete Random Variable|discrete random variables]].
> 3. Calculate [[Moments for Joint Distributions]] for [[Joint Probability Function|joint]], [[Conditional Probability Function|conditional]], and [[Marginal Probability Function|marginal discrete distributions]].
> 4. Calculate [[Variance for Conditional and Marginal Distributions|Variance]] and [[Standard Deviation|standard deviation]] for [[Conditional Probability Function|conditional]] and [[Marginal Probability Function|marginal probability distributions]] for [[Discrete Random Variable|discrete random variables]].
> 5. Calculate the [[Covariance]] and the [[Correlation Coefficient]] for [[Discrete Random Variable|discrete random variables]].
> 6. Determine the [[Order Statistics|Joint Distribution of Order Statistics]] for a set of [[Independent Random Variables|independent random variables]].
> 7. Calculate [[Probabilities for Linear Combinations]] of [[Independent Random Variables|independent]] [[Discrete Random Variable|discrete random variables]] as well as for [[Continuous Random Variable|continuous]] [[Normal Distribution|normal random variables]].
> 8. Calculate [[Moments for Linear Combinations]] of [[Independent Random Variables|independent random variables]].
> 9. Apply the [[Central Limit Theorem]] to calculate [[Normal Approximation|approximations]] of [[Probability|probabilities]] for [[Linear Combinations of Random Variables|linear combinations]] of [[Independent and Identically Distributed|independent and identically distributed random variables]].

## Source Material
> [!answer]- Source Material
>
> - [[A First Course in Probability (Ross - 2019)]]
>      - Chapter 1; Chapter 2; Chapter 3; Chapter 4 (exclude 4.8.4); Chapter 5 (exclude 5.6.2, 5.6.3, 5.6.5, 5.7); Chapter 6: 6.1, 6.2, 6.3.3, 6.3.4, 6.4, 6.6; Chapter 7 Discrete Only (exclude 7.2.1, 7.2.2, 7.3, 7.6, 7.7, 7.8, 7.9); Chapter 8: 8.1, 8.3
> - [[Mathematical Statistics with Applications (Wackerly, Mendenhall, & Scheaffer - 2008)]]
>      - Chapter 1; Chapter 2 (exclude 2.12); Chapter 3: 3.1-3.8, 3.9 (exclude MGF); Chapter 4 (exclude 4.10); Chapter 5 (exclude continuous multivariate distributions, exclude 5.10); Chapter 6: 6.7; Chapter 7 (exclude 7.4)
> - [[Probability for Risk Management (Hassett - 2021)]]
>      - Chapter 1; Chapter 2; Chapter 3; Chapter 4; Chapter 5; Chapter 6: 6.1, 6.2.1; Chapter 7; Chapter 8 (exclude 8.5, 8.6, 8.7); Chapter 9 (exclude 9.2, 9.3, 9.4, 9.6); Chapter 10 (exclude 10.2, 10.3.2, 10.3.3 continuous, 10.4.2); Chapter 11 (exclude 11.1.4, 11.1.5, 11.2.3 continuous, 11.2.5 continuous, 11.2.8, 11.3)
> - [[Probability and Statistics with Applications - A Problem Solving Text (Asimow - 2021)|Probability and Statistics with Applications: A Problem-Solving Text (Asimow & Maxwell, Second Edition, 2015)]]
>      - Chapter 1; Chapter 2; Chapter 3 (exclude 3.4.5, 3.7); Chapter 4 (exclude 4.6.2, 4.6.3, 4.6.5); Chapter 5 (exclude 5.6); Chapter 6 (exclude 6.3.4, 6.4.2, 6.4.6, 6.7); Chapter 7 (exclude 7.5, 7.6, 7.7, 7.9, 7.10); Chapter 8: 8.1.5, 8.3, 8.4 (exclude continuous), 8.6
> - [[Probability and Statistical Inference (Hogg - 2020)]]
>      - Chapter 1; Chapter 2; Chapter 3 (exclude Chi-Square); Chapter 4 (exclude 4.4, 4.5); Chapter 5: 5.3 (discrete only), 5.5, 5.6, 5.7
> - [[Probability (Leemis - 2018)]]
>      - Chapter 1 (exclude 1.1); Chapter 2; Chapter 3 (exclude moment generating functions in 3.4, exclude 3.5); Chapter 4 (exclude 4.7); Chapter 5 (include only beta distribution in 5.5); Chapter 6 (exclude continuous, exclude moment generating functions in 6.3, exclude 6.4); Chapter 7 (exclude 7.1, include only order statistics in 7.2, exclude 7.3); Chapter 8 (exclude 8.1, exclude 8.2)
