# SOA topic → concept → learning objective

Reference for the `soa-exam-converter` skill, stage 2. Load this only when
`question_classify.py`'s candidate list is not enough to settle a question.

It augments `scripts/ontology_map.py`, which the classifier already reads — so
if a mapping here keeps coming up, add it there instead and every future
conversion resolves it for free.

## Exam P

| Question topic | `topic` frontmatter | `learning_objective` |
|---|---|---|
| Set theory / Venn diagrams | `Set Theory` | General Probability |
| Combinatorics / counting | `Combinatorics` | General Probability |
| Independent events | `Independent Events` | General Probability |
| Conditional probability | `Conditional Probability` | General Probability |
| Bayes' theorem / total probability | `Bayes Theorem` | General Probability |
| Discrete RV / PMF / CDF | `Discrete Univariate Distributions` | Univariate Random Variables |
| Continuous RV / PDF / CDF | `Continuous Univariate Distributions` | Univariate Random Variables |
| Expected value / moments | `Expected Value` | Univariate Random Variables |
| Variance / std dev | `Variance and Standard Deviation` | Univariate Random Variables |
| Percentile / median / mode | `Percentile` | Univariate Random Variables |
| Deductible / policy limits | `Deductible` | Univariate Random Variables |
| Payment RV / loss RV | `Payment Random Variable` | Univariate Random Variables |
| Binomial distribution | `Binomial` | Univariate Random Variables |
| Poisson distribution | `Poisson` | Univariate Random Variables |
| Exponential distribution | `Exponential` | Univariate Random Variables |
| Normal / lognormal | `Normal` / `Lognormal Distribution` | Univariate Random Variables |
| Gamma / beta distribution | `Gamma` / `Beta` | Univariate Random Variables |
| Uniform distribution | `Continuous Univariate Distributions` | Univariate Random Variables |
| Joint distribution | `Conditional and Marginal Probability Functions` | Multivariate Random Variables |
| Conditional / marginal dist. | `Conditional Probability Function` | Multivariate Random Variables |
| Covariance / correlation | `Covariance and Correlation Coefficient` | Multivariate Random Variables |
| Linear combinations of RVs | `Linear Combinations of Random Variables` | Multivariate Random Variables |
| Order statistics | `Order Statistics` | Multivariate Random Variables |
| Central limit theorem | `Central Limit Theorem` | Multivariate Random Variables |
| Mixture distributions | `Continuous Univariate Distributions` | Multivariate Random Variables |

For anything not listed, `grep -il "<keyword>" Concepts/` to find the closest
existing page. Never invent a page name.

## Exam P learning objectives (verbatim callout names)

- `General Probability` — set theory, combinatorics, independence, Bayes, total probability
- `Univariate Random Variables` — single-variable distributions, E[X], Var, percentiles, insurance payments
- `Multivariate Random Variables` — joint/conditional/marginal, covariance, CLT, order statistics

## Exam FM learning objectives

- `Time Value of Money`
- `Annuities/Cash Flows with Non-Contingent Payments`
- `Loans`
- `Bonds`
- `General Cash Flows, Portfolios, and Asset Liability Management`
