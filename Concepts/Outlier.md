---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:754a86e15eedaf80f5dda4f429dcbb749d88020c7aab7b796791dbe344b794a2
  sources:
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §7.1.6 'What are outliers in the data?', sha256:1f1c9855ffcd8cd40165c97844e410a56edb032b8100616794732a32dfb094ee — https://www.itl.nist.gov/div898/handbook/prc/section1/prc16.htm"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.7 'Box Plot' (box plots with fences), sha256:4cb2b0dd09d0803cb0613c9cf7dc939e80491badfc0f39b1f4fdb0468ff29730 — https://www.itl.nist.gov/div898/handbook/eda/section3/boxplot.htm"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021), §3.3.3 items 4-5 'Outliers' and 'High Leverage Points': recording errors, studentized residuals beyond ±3, care before removing, leverage statistic, printed pp.97-99 (PDF pp.107-109), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Penn State STAT 501 Regression Methods (online course notes), Lesson 11 §11.1 outlier vs high leverage vs influential; §11.2 leverage; §11.3-11.4 studentized and deleted residuals (fit pulled toward an influential point); §11.5 Cook's distance, sha256:6229ca1803f9d152028893131b323ac3ebdff7b49733518cc14a77a87200dbb9 — https://online.stat.psu.edu/stat501/Lesson11.html"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.6 'Losses and LAE' — extraordinary (shock) losses, capping and the excess loss provision, printed pp.95-97 (PDF pp.107-109), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
    - "CAS PCPA Exam & Project Content Outline v.8 (effective Sept 2026, updated 9.9.2026), Domain A task 4 p.4 and 'Performance Evaluation Criteria' p.6, sha256:e22ce369f08e1feec88b1ed8a9273c67fd585b1c62193ea3105fe1fe8077189f — https://www.casact.org/sites/default/files/2024-05/Exam_PCPA_2025_F_Content_Outlines.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Outlier.md
---

An **Outlier** is an observation that lies far from the bulk of the data, or far from what a model predicts for it. The first question to ask about one is always *why*: an outlier is either an **error** to be corrected, or a **real but extreme** value, such as a [[Large Loss|large loss]], that has to be kept but kept from dominating the fit.

> $$\text{Lower fence} = Q_1 - 1.5 \times \text{IQR}$$
>
> $$\text{Upper fence} = Q_3 + 1.5 \times \text{IQR}$$

- $Q_1$ and $Q_3$ are the first and third quartiles and $\text{IQR} = Q_3 - Q_1$; a value outside the fences is flagged. This is the rule a [[Box Plot]] draws, and it relies on quartiles, which the outliers themselves barely move
- **In a model**, an outlier is a point with a large standardized [[Residual Plot|residual]]; a point is **influential** when removing it would change the fitted coefficients materially (high leverage, measured by Cook's distance). A point can be influential without having a large residual, because it pulls the fit toward itself
- Insurance losses are **right-skewed by nature**, so a fence built for symmetric data flags many legitimate claims. Judge a flagged value against the business, not only against the rule
- Treatments: **correct** a data error at source; **cap** (winsorize) extreme values at a threshold and load the excess back separately; **transform** the variable (a log compresses the tail); or model with a distribution suited to heavy tails. Deleting a real observation because it is inconvenient biases the result
- Whatever is done has to be described: the PCPA project rubric awards credit for stating which anomalies were found and how they were handled

> [!example]- Flagging Outliers with the IQR Rule {Example}
> For $2{,}000$ auto physical damage claims, $Q_1 = \$1{,}200$ and $Q_3 = \$6{,}800$. Which of these claims are flagged: $\$14{,}000$, $\$95{,}000$, and a claim recorded as $-\$3{,}000$?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{IQR} &= 6{,}800 - 1{,}200 = 5{,}600 \\
> > \text{Upper fence} &= 6{,}800 + 1.5(5{,}600) = 15{,}200 \\
> > \text{Lower fence} &= 1{,}200 - 1.5(5{,}600) = -7{,}200
> > \end{align*}
> > $$
> > Only the $\$95{,}000$ claim is flagged. It could well be a genuine total loss on an expensive vehicle, so check it rather than drop it. The **$-\$3{,}000$ claim passes the fence but is still wrong**: a negative claim is probably a salvage or subrogation recovery recorded as a separate transaction. That is a [[Data Quality|data quality]] problem the fence cannot see.

> [!example]- Capping Losses Before Fitting a Severity Model {Example}
> Five claims of $\$10{,}000$, $\$40{,}000$, $\$80{,}000$, $\$300{,}000$ and $\$600{,}000$ are capped at $\$250{,}000$ before fitting a severity model. What are the capped losses, and how much is removed?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Capped} &= 10 + 40 + 80 + 250 + 250 \\
> > &= 630 \text{ (thousand)} \\
> > \text{Uncapped} &= 10 + 40 + 80 + 300 + 600 \\
> > &= 1{,}030 \text{ (thousand)} \\
> > \text{Removed} &= 1{,}030 - 630 = 400 \text{ (thousand)}
> > \end{align*}
> > $$
> > The model now fits the relativities without two claims driving them. The $\$400{,}000$ above the cap is not thrown away: it comes back as an **excess load**, estimated from a longer or broader base than these five claims (see [[Large Loss]]).
