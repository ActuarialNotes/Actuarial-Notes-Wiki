---
Title: "Linear Mixed Models: A Practical Guide Using Statistical Software"
Authors: "Brady T. West, Kathleen B. Welch, Andrzej T. Gałecki"
Year: "2022"
date: "2022"
Edition: 3rd
Publisher: Chapman & Hall/CRC
Type: Textbook
Available from: "[routledge.com](https://www.routledge.com/Linear-Mixed-Models-A-Practical-Guide-Using-Statistical-Software/West-Welch-Galecki/p/book/9781032019321)"
---
The [[Linear Mixed Model]] text on the [[Exam MAS-II (CAS)|MAS-II]] syllabus, covering section B (objectives B1–B4). The book is organized as an introductory chapter on the general model followed by worked case studies in five statistical packages; the third edition adds a chapter on power analysis for mixed-effects models.

Read for the **model, not the software**: the exam tests interpretation of output, so the case-study chapters matter for what the printouts mean rather than for the syntax that produced them.

## What the syllabus takes from it

### The general linear mixed model

- The specification $\mathbf{y} = \mathbf{X}\boldsymbol\beta + \mathbf{Z}\mathbf{b} + \boldsymbol\varepsilon$ and its assumptions
- [[Fixed Effects]] versus [[Random Effects]] — when a grouping factor belongs in each
- [[Variance Components]] and the implied [[Covariance Structure]]: independent, compound symmetry, AR(1), Toeplitz, unstructured
- [[Intraclass Correlation]] and the design effect under clustering

### Model specifications

- [[Random Intercept and Slope]] models, and nested versus crossed grouping factors
- [[Hierarchical Model|Hierarchical (multilevel)]] formulations of the same model
- Marginal versus conditional interpretation of the fitted values

### Estimation and inference

- Maximum likelihood versus [[Restricted Maximum Likelihood|REML]], and the rule for which to use when comparing models
- The [[Likelihood Ratio Test]] for nested models, including the boundary problem when testing a variance component at zero
- [[AIC]] and [[BIC]] for non-nested comparisons
- [[Best Linear Unbiased Predictor|BLUPs]] of the random effects, and their shrinkage toward the population mean

### Diagnostics

- Residual diagnostics for the conditional and marginal residuals
- Assessing [[Model Structure|model structure]] and [[Variable Selection|variable selection]] from the fitted output
- Power analysis for mixed-effects designs (new in the third edition)

## Links
- [Linear Mixed Models, 3rd edition (Routledge)](https://www.routledge.com/Linear-Mixed-Models-A-Practical-Guide-Using-Statistical-Software/West-Welch-Galecki/p/book/9781032019321)
- [Author's companion site (University of Michigan)](https://websites.umich.edu/~bwest/almmussp.html)
