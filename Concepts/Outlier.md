---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:910e2a1df03d9c94078565fcb2ffb0c32271fa85e1d7595288a18ed9d08ce503
  sources:
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §7.1.6 'What are outliers in the data?', sha256:1f1c9855ffcd8cd40165c97844e410a56edb032b8100616794732a32dfb094ee — https://www.itl.nist.gov/div898/handbook/prc/section1/prc16.htm"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.7 'Box Plot' (L1 = lower quartile - 1.5 IQ, U1 = upper quartile + 1.5 IQ), sha256:4cb2b0dd09d0803cb0613c9cf7dc939e80491badfc0f39b1f4fdb0468ff29730 — https://www.itl.nist.gov/div898/handbook/eda/section3/boxplot.htm"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021), §3.3.3 items 4-5 'Outliers' and 'High Leverage Points': recording errors, care before removing, unusual y vs unusual x, leverage statistic (3.37), printed pp.97-99 (PDF pp.107-109), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Penn State STAT 501 Regression Methods (online course notes), Lesson 11 §11.1 outlier (unusual y) vs high leverage (extreme x) vs influential, 'have the potential to be influential'; §11.2 leverage h_ii, hat-matrix diagonal, 'depends only on the predictor values', 'merely quantifies the potential'; §11.4 fit pulled toward a potential outlier; §11.5 Cook's D_i = e_i²/(p MSE) x h_ii/(1-h_ii)², p = parameters incl. intercept, depends on both residual and leverage, sha256:6229ca1803f9d152028893131b323ac3ebdff7b49733518cc14a77a87200dbb9 — https://online.stat.psu.edu/stat501/Lesson11.html"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.6 'Losses and LAE' — shock losses capped at a threshold, excess loaded back by a long-term provision, printed pp.95-97 (PDF pp.107-109), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
    - "CAS PCPA Exam & Project Content Outline v.8 (effective Sept 2026, updated 9.9.2026), 'Performance Evaluation Criteria' p.6 (A-4: 'describes any anomalous characteristics of the data (e.g., outliers, missing data) and how they were addressed'), sha256:e22ce369f08e1feec88b1ed8a9273c67fd585b1c62193ea3105fe1fe8077189f — https://www.casact.org/sites/default/files/2024-05/Exam_PCPA_2025_F_Content_Outlines.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Outlier.md
---

An **Outlier** is an observation that lies far from the bulk of the data, or far from what a model predicts for it. The first question to ask about one is always *why*: an outlier is either an **error** to be corrected, or a **real but extreme** value, such as a [[Large Loss|large loss]], that has to be kept but kept from dominating the fit.

A value is flagged as an outlier when it falls outside the fences, which are

> $$\text{Lower fence} = Q_1 - 1.5 \times \text{IQR}$$

> $$\text{Upper fence} = Q_3 + 1.5 \times \text{IQR}$$

- $Q_1$ and $Q_3$ are the first and third quartiles.
- $\text{IQR} = Q_3 - Q_1$ is the interquartile range.

This is the rule a [[Box Plot|box plot]] draws. It relies on quartiles, which the outliers themselves barely move.

> [!example]- For $2{,}000$ auto physical damage claims, $Q_1 = \$1{,}200$ and $Q_3 = \$6{,}800$. Which of the claims $\$14{,}000$, $\$95{,}000$ and $-\$3{,}000$ are flagged? {Example}
> - The IQR is $6{,}800 - 1{,}200 = 5{,}600$.
> - The upper fence is $6{,}800 + 1.5 \times 5{,}600 = 15{,}200$.
> - The lower fence is $1{,}200 - 1.5 \times 5{,}600 = -7{,}200$.
> - Only the $\$95{,}000$ claim is flagged. It could be a genuine total loss on an expensive vehicle, so it is checked rather than dropped.
> - The $-\$3{,}000$ claim passes the fence but is still wrong. It is probably a salvage or subrogation recovery recorded as a separate transaction, a [[Data Quality|data quality]] problem the fence cannot see.

## Outliers and leverage in a regression

In a model, an outlier is a point with a large standardized [[Residual Plot|residual]]: its *response* is unusual given its predictors. A **high-leverage** point is different: its *predictor* values are unusual, measured by the leverage $h_{ii}$ (the $i$-th diagonal of the hat matrix, which depends only on the $x$ values). A point is **influential** when removing it would change the fitted coefficients materially.

Outliers and high-leverage points only have the *potential* to be influential. Whether a point is influential depends on both its residual and its leverage, and **Cook's distance** combines the two:

> $$D_i = \dfrac{e_i^2}{p \cdot \text{MSE}} \cdot \dfrac{h_{ii}}{(1 - h_{ii})^2}$$

- $e_i$ is the residual of observation $i$.
- $p$ is the number of coefficients, including the intercept.
- $\text{MSE}$ is the mean squared error of the fit.

A high-leverage point can be influential without having a large residual, because it pulls the fit toward itself.

> [!example]- A regression with an intercept and one predictor has $\text{MSE} = 4$. An observation has residual $3$ and leverage $0.5$. What is its Cook's distance? {Example}
> - The model has an intercept and one slope, so $p = 2$.
> - The first factor is $3^2/(2 \times 4) = 1.125$.
> - The second factor is $0.5/(1 - 0.5)^2 = 2$.
> - Cook's distance is $D_i = 1.125 \times 2 = 2.25$.

## Treating an outlier

Insurance losses are right-skewed by nature, so a fence built for symmetric data flags many legitimate claims. A flagged value is judged against the business, not only against the rule.

A data error is corrected at source. A real extreme value can be capped at a threshold, with the excess loaded back separately. The variable can be transformed, since a log compresses the tail, or modelled with a distribution suited to heavy tails. Deleting a real observation because it is inconvenient biases the result. Whatever is done has to be described: the PCPA project rubric awards credit for stating which anomalies were found and how they were handled.

> [!example]- Five claims of $\$10{,}000$, $\$40{,}000$, $\$80{,}000$, $\$300{,}000$ and $\$600{,}000$ are capped at $\$250{,}000$. How much loss does the cap remove? {Example}
> - The uncapped losses total $10 + 40 + 80 + 300 + 600 = 1{,}030$ thousand.
> - The capped losses total $10 + 40 + 80 + 250 + 250 = 630$ thousand.
> - The cap removes $1{,}030 - 630 = \$400{,}000$.
> - The severity model now fits without two claims driving it, and the $\$400{,}000$ comes back as an **excess load**, estimated from a longer or broader base than these five claims.

> [!trap] Deleting every value outside the fences
> A fixed removal rule applied before looking at the data deletes genuine large claims along with the errors. Investigate each flagged value, correct the errors, and cap or model the real ones.
