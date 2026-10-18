---
Title: "Using Multi-Dimensional Credibility to Estimate Class Frequency Vectors in Workers Compensation"
Authors: "Jose Couret and Gary Venter"
Publisher: "ASTIN Bulletin"
Year: "2008"
date: "2008"
Type: "Paper"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2021-03/8_Couret_Venter.pdf)"
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-17
  last_checked_by: agent:validate-v1
  content_hash: sha256:c365cba1145c00dc5c508cd9ae2f688cfca61ff4239c34372f7359cc4c6b582a
  sources:
    - "Couret and Venter, 'Using Multi-Dimensional Credibility to Estimate Class Frequency Vectors in Workers Compensation', ASTIN Bulletin 38(1), 73-85 (2008), CAS copy, 13 pp. read in full, sha256:ce50d8a0fbc395621d29dd153836b0303a269d94697bb1932b5f334b47ebba18 — https://www.casact.org/sites/default/files/2021-03/8_Couret_Venter.pdf"
    - "Same article, Cambridge Core PDF (doi:10.2143/AST.38.1.2030403), 13 pp., text compared word by word with the CAS copy: identical but for Cambridge's per-page download footer, sha256:a1e800e82d62e51f88291ea12c957b049de6c2ed2bff70df0c62795c4b6d6447 — https://www.cambridge.org/core/services/aop-cambridge-core/content/view/72B729B1DE0155A8D93A12F0AA216472/S0515036100015063a.pdf/using-multi-dimensional-credibility-to-estimate-class-frequency-vectors-in-workers-compensation.pdf"
    - "CAS, Exam Content Outline — Advanced Ratemaking – Exam 8, Fall 2026 (Exam_8_CO_2026_F v03 2026_6_22, 6 pp.), PDF pp.1-6 incl. link annotations, sha256:306e7a7b6351597e46fd82fd74c294fce3afc8b1f9227ea8c001f3b081964521 — https://www.casact.org/sites/default/files/2026-03/Exam_8_CO_2026_Fall.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Using Multi-Dimensional Credibility to Estimate Class Frequency Vectors (Couret and Venter - 2008).md
---
![[Using Multi-Dimensional Credibility to Estimate Class Frequency Vectors (Couret and Venter - 2008) - Cover.svg]]

An ASTIN Bulletin article (38(1), 73-85) that estimates the vector of claim frequency by injury type for classes of US workers compensation insureds using multi-dimensional credibility techniques. It shows, by testing a hold-out sample, that credibility estimation by class produces additional information in comparison to a widely-used seven-hazard-group system.

> [!info] On the syllabus
> - [[Exam 8 (CAS)|Exam 8]] — objectives A2–A4.

## Abstract
- The US workers compensation system is reinsured in the world-wide market and has been a laboratory for actuarial [[Credibility|credibility]] techniques.
- With deductibles increasing, the percentage of loss excess of high deductibles needs estimating, and a key element of it is the frequency of loss by injury type.
- Historically the fraction of costs excess of various retentions has been calculated for large groups of classes (hazard groups) and not individual classes.

## 1 Development of the Credibility Procedure
- Serious injury types have low frequencies, so class claim counts are unstable, but the injury types are correlated; multi-dimensional credibility uses the correlations to improve the estimate of each element.
- Credibility is similar to a regression, except that the dependent variable, the population mean, is not observed; a model of how the observed variables arise from it is postulated and its parameters estimated to minimize expected squared error.
- Standard credibility theory is outlined first: the hypothetical mean m(q), the process variance v(q), the Bühlmann estimator with z = n/(n + k) and k = v/a.
- The weight on an estimator is proportional to the reciprocal of its variance; the multivariate correlated credibility derivation follows the same approach.
- The procedure is applied to the ratios of fatal, permanent total, major permanent partial and minor permanent partial claim counts to temporary total claim counts, with class population means estimated as linear functions of the sample means of all the injury types for the class.

## 2 Performance Testing
- Seven years of class data were available; relativities calculated from the even reports (2, 4 and 6) were used to predict the hold-out sample of the odd reports (3, 5 and 7).
- Sums of squared prediction errors by hazard group and injury type (Tables A and B) are compared for the credibility procedure, raw class data and the hazard-group ratios.
- A quintiles test compares predicted and observed ratios, and the predicted mean ratios by class are distributed around the hazard-group ratios (Figures 1 and 2).

## 3 Conclusions
- Individual class experience contains information relevant to future large loss relative frequency, and a correlated credibility approach using the relationships among injury-type frequencies within each class can utilize it.

## References

## Sources
- [Using Multi-Dimensional Credibility to Estimate Class Frequency Vectors in Workers Compensation (ASTIN Bulletin 38(1), doi:10.2143/AST.38.1.2030403)](https://www.cambridge.org/core/services/aop-cambridge-core/content/view/72B729B1DE0155A8D93A12F0AA216472/S0515036100015063a.pdf/using-multi-dimensional-credibility-to-estimate-class-frequency-vectors-in-workers-compensation.pdf) — the document: title page, abstract, section headings and the points under them
- [Using Multi-Dimensional Credibility to Estimate Class Frequency Vectors in Workers Compensation (CAS copy)](https://www.casact.org/sites/default/files/2021-03/8_Couret_Venter.pdf) — the copy the Exam 8 content outline links; the same text as the publisher's PDF without its download footer
- [CAS Exam 8 Content Outline, Fall 2026](https://www.casact.org/sites/default/files/2026-03/Exam_8_CO_2026_Fall.pdf) — the citation and the assigned scope (A2–A4)
