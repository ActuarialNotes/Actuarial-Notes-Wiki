---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:609e826fd69bb342126efcc793930ba1d5dbec0594452fd05da50f44e34194d5
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., Chapter 7, §7.1-7.3.1 incl. fn 17, pp.75-85 (PDF pp.85-95), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted, §4.4.2 pp.148-152 (Tables 4.4-4.7, Fig. 4.8) and §8.1.2 pp.336-338 (eqs 8.6-8.7); §2.2 pp.30, 37 (test MSE, test error rate), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Salis, Measures of Predictive Accuracy, CAS Study Note for MAS-II (updated November 6, 2025), §§1-4, pp.1-12 (whole note), sha256:e952ace6ea6cdc1bea50ffcd81e53227de836e9e7b58a85bb13e86885f67a010 — https://www.casact.org/sites/default/files/2026-01/MAS-II_Measures_of_Predictive_Accuracy_Study_Note-1.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/AUROC.md
---

The **AUROC** (Area Under the Receiver Operating Characteristic Curve) is a model performance metric for binary classification that summarizes the model's ability to **rank** positives above negatives across all possible classification thresholds.

> **ROC Curve**: plot of **True Positive Rate (Sensitivity)** vs. **False Positive Rate (1 − Specificity)** as the threshold varies.
>
> $$\text{TPR} = \frac{\text{TP}}{\text{TP} + \text{FN}}$$

> $$\text{FPR} = \frac{\text{FP}}{\text{FP} + \text{TN}}$$

> $$\text{AUROC} = \int_0^1 \text{TPR}(\text{FPR})\,d(\text{FPR})$$

| AUROC Value | Interpretation |
| :--- | :--- |
| 0.5 | No predictive power: the ROC curve follows the line of equality |
| 1.0 | A perfect model: the ROC curve rises straight to the top of the graph |

- AUROC equals the probability that the model ranks a randomly chosen positive **higher** than a randomly chosen negative, a tie counting half
- AUROC $= 0.5 \times$ normalized [[Gini Index|Gini]] $+ 0.5$, where the normalized Gini is the model's Gini index divided by that of a perfect model. So normalized Gini $= 2 \cdot \text{AUROC} - 1$, and the two should not be taken as separate validation metrics
- AUROC summarizes performance over **all possible thresholds**, which makes ROC curves useful for comparing classifiers. Choosing the threshold itself is a business decision that weighs true positives against the cost of false positives

![[Media/Figures/AUROC.svg|340]]

> [!example]- Interpreting AUROC for a Fraud Model {Example}
> Two fraud detection models are compared: Model A has AUROC = 0.85; Model B has AUROC = 0.72. What is the normalized Gini index of each, and which model should be preferred?
>
> > [!answer]-
> > Gini$_A = 2(0.85) - 1 = 0.70$; Gini$_B = 2(0.72) - 1 = 0.44$.
> > **Model A** should be preferred — it correctly ranks a fraudulent claim above a non-fraudulent one 85% of the time (vs. 72% for Model B) and has substantially better discriminatory power.
