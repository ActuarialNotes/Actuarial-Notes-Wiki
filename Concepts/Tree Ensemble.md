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
- **Boosting hyperparameters**: number of trees $B$, shrinkage $\lambda$, tree depth $d$ — all tuned by cross-validation

> [!example]- Random Forest Variable Importance {Example}
> A random forest is fitted to claim severity data with predictors: vehicle age, driver age, territory, and vehicle class. Variable importance (mean decrease in RSS) is 420, 310, 180, 95, respectively. Interpret.
>
> > [!answer]-
> > **Vehicle age** is the most important predictor, reducing RSS by an average of 420 per split across all trees. **Driver age** is second. **Vehicle class** contributes the least. These rankings guide feature selection and business interpretation.
