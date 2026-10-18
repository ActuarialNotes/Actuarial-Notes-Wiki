---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:3b426af615f423845dd9cb7d50e792853d9b96950c5f123f46f59674bc20abb0
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.2.1-8.2.3 and 8.2.5, printed pp.340-347, 351-352 (PDF pp.348-355, 359-360), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.3.3-8.3.4 lab, printed pp.358-360 (PDF pp.366-368), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Tree Ensemble.md
---

A **Tree Ensemble** combines many [[Decision Tree]]s to produce a single, more accurate and stable prediction. Ensembles reduce the high variance of individual trees while preserving their ability to capture complex, non-linear patterns.

**Major ensemble methods:**

| Method | Mechanism | Key Property |
| :--- | :--- | :--- |
| **Bagging** | Bootstrap + average | Reduces variance; trees grown independently |
| **Random Forest** | Bagging + random feature subsets | Decorrelates trees; typically $\sqrt{p}$ features per split |
| **Boosting** | Sequential trees; each fits residuals | Reduces bias; shrinkage parameter $\lambda$ controls learning rate |

**Bagging (Bootstrap Aggregation):**
$$\hat{f}_{\text{bag}}(x) = \frac{1}{B}\sum_{b=1}^B \hat{f}^b(x)$$

**Boosting (e.g., gradient boosting):**
$$\hat{f}^{(m)}(x) = \hat{f}^{(m-1)}(x) + \lambda \cdot \hat{f}_b(x; r_i^{(m-1)})$$

- **Out-of-bag (OOB) error**: for bagging/random forests, each tree is tested on the ~37% of training data not used in its bootstrap sample — provides a free cross-validation estimate
- **Variable importance**: for random forests, measured by the average decrease in [[Gini Index]] or RSS over all splits on a variable
- **Boosting hyperparameters**: number of trees $B$ (chosen by cross-validation), shrinkage $\lambda$, tree depth $d$

![[Media/Figures/Tree_Ensemble.svg|340]]

> [!example]- Random Forest Variable Importance {Example}
> A random forest is fitted to claim severity data with predictors: vehicle age, driver age, territory, and vehicle class. Variable importance (mean decrease in RSS) is 420, 310, 180, 95, respectively. Interpret.
>
> > [!answer]-
> > **Vehicle age** is the most important predictor, reducing RSS by a total of 420 from its splits, averaged over all the trees. **Driver age** is second. **Vehicle class** contributes the least. These rankings guide feature selection and business interpretation.
