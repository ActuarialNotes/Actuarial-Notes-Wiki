The **AUROC** (Area Under the Receiver Operating Characteristic Curve) is a model performance metric for binary classification that summarizes the model's ability to **rank** positives above negatives across all possible classification thresholds.

> **ROC Curve**: plot of **True Positive Rate (Sensitivity)** vs. **False Positive Rate (1 − Specificity)** as the threshold varies.
>
> $$\text{TPR} = \frac{\text{TP}}{\text{TP} + \text{FN}}, \quad \text{FPR} = \frac{\text{FP}}{\text{FP} + \text{TN}}$$
>
> $$\text{AUROC} = \int_0^1 \text{TPR}(\text{FPR})\,d(\text{FPR})$$

| AUROC Value | Interpretation |
| :--- | :--- |
| 0.5 | Random classifier (no discrimination) |
| 0.5–0.7 | Poor discrimination |
| 0.7–0.8 | Acceptable |
| 0.8–0.9 | Excellent |
| > 0.9 | Outstanding |

- AUROC equals the probability that the model ranks a randomly chosen positive **higher** than a randomly chosen negative
- The **[[Gini Index]]** (as a model metric) $= 2 \cdot \text{AUROC} - 1$
- The **[[Lift]]** curve and AUROC both measure ranking quality; AUROC is threshold-independent while lift focuses on specific fractions of the population
- AUROC is **invariant to class imbalance**, making it suitable for rare-event modeling (e.g., fraud, catastrophic claims)

> [!example]- Interpreting AUROC for a Fraud Model {Example}
> Two fraud detection models are compared: Model A has AUROC = 0.85; Model B has AUROC = 0.72. What is the Gini coefficient of each, and which model should be preferred?
>
> > [!answer]-
> > Gini$_A = 2(0.85) - 1 = 0.70$; Gini$_B = 2(0.72) - 1 = 0.44$.
> > **Model A** should be preferred — it correctly ranks a fraudulent claim above a non-fraudulent one 85% of the time (vs. 72% for Model B) and has substantially better discriminatory power.
