---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-17
  last_checked_by: agent:validate-v1
  content_hash: sha256:fb8e572ea57d102dcbd0955ae53017a889e1f3d837e2615a6860429a1996e2fa
  sources:
    - "ASOP No. 12, Risk Classification (Actuarial Standards Board, Dec 2005, doc. 132), §2.5-2.9, §3.2-3.4, PDF pp.8-12, sha256:7d4f2631a589bac24cf34b1f622e95aa7bfa979aaca96de27c651099c0b12dc7 — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop012_132.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §5.5 PDF p.65, §6.4 PDF pp.83-84, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Holmes & Casotto, Penalized Regression and Lasso Credibility, CAS Monograph 13 (2025 revision), Ch.6 intro, §6.1-6.3.3, PDF pp.56-59, sha256:f6978accbd2bcd43284ec939dd90966430a3e36fc126aab4584241a13d7a28cd — https://www.casact.org/sites/default/files/2025-08/CAS_Monograph_13_2025_revision.pdf"
    - "Couret & Venter, Using Multi-Dimensional Credibility to Estimate Class Frequency Vectors in Workers Compensation (ASTIN Bulletin 38(1), 2008), §2 Performance Testing, Tables A-C, PDF pp.7-11, sha256:ce50d8a0fbc395621d29dd153836b0303a269d94697bb1932b5f334b47ebba18 — https://www.casact.org/sites/default/files/2021-03/8_Couret_Venter.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Rate Class Validity.md
---

**Rate Class Validity** is whether a set of [[Rating Class|rate classes]] reflects real and lasting differences in expected cost. A valid class is [[Homogeneity|homogeneous]] inside, differs from the other classes by more than random noise, has enough data to be estimated [[Credibility|credibly]], keeps its relativity when the data change, and can be used in practice and under the law.

> $$\text{SSE}_{\text{hold}} = \sum_{j} w_j \left(\hat{R}_j - R_j^{\text{hold}}\right)^2$$

- $\hat{R}_j$ is class $j$'s relativity estimated on the modelling data, $R_j^{\text{hold}}$ is the relativity observed in a [[Holdout Sample|holdout]] the estimate never saw, and $w_j$ is the class's share of exposure. A finer set of classes is only worth having if it predicts the holdout better than a coarser one. Splitting by noise lowers the error on the modelling data but raises it on the holdout.
- **ASOP 12's considerations.** [[ASOP 12 - Risk Classification (ASB - 2005)|ASOP No. 12]] §3.3 lists what to weigh when establishing risk classes:
  - **Adverse selection.** If expected outcomes vary too much within a class, [[Adverse Selection|adverse selection]] is likely, so each class needs enough homogeneity for its intended use.
  - **Credibility.** Classes should be large enough for credible inferences. When the data are thin, the actuary balances predictability against homogeneity.
  - **Practicality.** Cost, time and effort grow with the number of classes.
  - **Other considerations.** Applicable law, industry practices and the system's business practices.
  - **Reasonableness of results**, such as a consistent pattern of rates among classes.
- **Testing the system (ASOP 12 §3.4).** Once classes are in use, the actuary evaluates emerging experience and decides whether change is needed. A test may use a *different* set of classes from the one that set the rates. ASOP 12's example is a gender-neutral system that is tested with the classes split by gender.
- **Significance is necessary, not sufficient.** A class coefficient's [[Statistical Significance|significance]] is measured against the base level and grows with volume. It says nothing about whether the difference will repeat.
- **Stability (Goldburd et al. §6.4).** The classic failure is one unusually large loss in a class with few members. With it, the model says with high confidence that the class is very risky. Without it, the model may say with the same confidence that the class is very safe. Influential records (high Cook's distance) are found and the model is refit without them. The monograph also refits on [[Cross-Validation|cross-validation]] folds and [[Bootstrap|bootstrap]] samples, and a valid class shows similar estimates on each.
- **Grouping (Goldburd et al. §5.5).** A categorical variable can start with many levels, and neighbouring levels with similar coefficients are combined. The goal is to balance predictive power, parsimony and overfitting.
- **Lasso credibility (Holmes and Casotto, Ch. 6).** A [[Penalized Regression and Lasso Credibility (Holmes and Casotto - 2025)|lasso credibility]] model gives no p-values. Its review moves from significance to credibility: is each class's deviation from the [[Complement of Credibility|complement]] stable and intuitive? A relativity plot shows the complement, the indicated and the observed relativity, with exposure bars. A class penalised back to its complement either has plenty of data that agrees with the complement, or too little data to move it.

> [!example]- One Large Loss and a Class's Relativity {Example}
> A book has $20{,}000$ exposures and $\$5{,}000{,}000$ of losses. Class Q has $400$ exposures and $\$260{,}000$ of losses, including one claim of $\$150{,}000$. Find Q's pure premium relativity with and without that claim. Is the class's indication valid?
>
> > [!answer]-
> > With the claim:
> >
> > $$
> > \begin{align*}
> > \text{PP}_{\text{book}} &= \frac{5{,}000{,}000}{20{,}000} \\
> > &= \$250 \\[4pt]
> > \text{PP}_Q &= \frac{260{,}000}{400} \\
> > &= \$650 \\[4pt]
> > R_Q &= \frac{650}{250} \\
> > &= 2.60
> > \end{align*}
> > $$
> >
> > Without it:
> >
> > $$
> > \begin{align*}
> > \text{PP}_{\text{book}} &= \frac{4{,}850{,}000}{20{,}000} \\
> > &= \$242.50 \\[4pt]
> > \text{PP}_Q &= \frac{110{,}000}{400} \\
> > &= \$275 \\[4pt]
> > R_Q &= \frac{275}{242.50} \\
> > &= 1.13
> > \end{align*}
> > $$
> >
> > A single record moves the class from more than two and a half times average to about average, so the $2.60$ is **not** a valid indication. It should not get full weight. The usual remedies are to limit large losses and spread the excess over all classes, to credibility-weight Q toward a broader group, or to merge Q with a similar class.

> [!example]- Four Classes or Two? {Example}
> A class is split four ways. Relativities fitted on the even years, and observed in the odd years (the holdout), are:
>
> | Class | Exposure share | Fitted (even years) | Holdout (odd years) |
> |---|---|---|---|
> | 1 | $0.4$ | $0.80$ | $0.88$ |
> | 2 | $0.3$ | $0.95$ | $0.86$ |
> | 3 | $0.2$ | $1.15$ | $1.30$ |
> | 4 | $0.1$ | $1.70$ | $1.38$ |
>
> The alternative merges classes 1 and 2 and classes 3 and 4, using exposure-weighted fitted relativities. Which scheme is valid: four classes, two, or no split?
>
> > [!answer]-
> > The two-class relativities are:
> >
> > $$
> > \begin{align*}
> > R_{12} &= \frac{0.4(0.80) + 0.3(0.95)}{0.7} \\
> > &= 0.864 \\[4pt]
> > R_{34} &= \frac{0.2(1.15) + 0.1(1.70)}{0.3} \\
> > &= 1.333
> > \end{align*}
> > $$
> >
> > The weighted squared errors against the holdout are:
> >
> > $$
> > \begin{align*}
> > \text{SSE}_4 &= 0.00256 + 0.00243 + 0.00450 + 0.01024 \\
> > &= 0.0197 \\[4pt]
> > \text{SSE}_2 &= 0.00010 + 0.00000 + 0.00022 + 0.00022 \\
> > &= 0.0005 \\[4pt]
> > \text{SSE}_1 &= 0.00576 + 0.00588 + 0.01800 + 0.01444 \\
> > &= 0.0441
> > \end{align*}
> > $$
> >
> > **Two classes.** The difference between the low and high groups is real, because no split has the worst error. The split *within* each group is not: class 2 came out above class 1 on the even years and below it on the odd years, and class 4's $1.70$ fell back to $1.38$. Those are noise, and they make the four-class error more than thirty times the two-class error.

> [!tip]- How it appears on the exam
> - Exam 8 objective A5 asks the candidate to *evaluate* the validity of rate classes. That is a judgment, which suits a written answer: given class data or model output, say whether a class or split should stand and why.
> - Expect a holdout or quintile comparison of competing class schemes, the approach Couret and Venter used for workers compensation classes, scored by squared error.
> - Expect a GLM output with standard errors, paired with a question on whether significance alone justifies the class ([[Statistical Significance]]).
> - Lasso credibility questions describe a relativity plot and ask whether the deviation from the complement is supportable.

> [!warning]- Exam traps
> - Calling a class valid because its p-value is small. With enough data a trivial difference is significant, and a significant estimate can still be driven by one record.
> - Judging a split on the data that fitted it. More classes always fit the modelling data better, so the comparison must use a holdout.
> - Reading a lasso coefficient of zero as "no data". It can also mean ample data that agrees with the complement, and the two call for different reviews.
> - Treating ASOP 12 as requiring causality. §3.2.2 says a cause-and-effect relationship need not be established; the characteristic must be related to expected outcomes.
