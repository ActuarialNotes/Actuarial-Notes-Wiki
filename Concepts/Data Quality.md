---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:3c0119f8b4b45e1322dfe947098d07babaa58698774ca75f8484409b7fd83956
  sources:
    - "ASB, ASOP No. 23 Data Quality (Doc. No. 185, Dec. 2016), §2.1 appropriate data, §2.2 audit, §2.5 review, §2.6 sufficient, §3.1-3.6, §3.8(c), §4.1, PDF pp.6-11, sha256:784c57a1379b189b234452dc7fe18d391ae86e7f5fb8815d14d35400eb3e7bdf — https://www.actuarialstandardsboard.org/wp-content/uploads/2017/01/asop023_185.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.3 \"Verification of the Data\", printed p.37 (PDF p.43), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "CAS PCPA Exam & Project Content Outline v.8 (updated 9.9.2026), Domain A 'Dealing with Data' tasks A1-A4 and readings (ASOP 23, ASOP 56, Grolemund and Wickham), PDF pp.3-4, sha256:e22ce369f08e1feec88b1ed8a9273c67fd585b1c62193ea3105fe1fe8077189f — https://www.casact.org/sites/default/files/2024-05/Exam_PCPA_2025_F_Content_Outlines.pdf"
    - "CAS Exam 5 Content Outline, Fall 2026, Domain A task 4 and the reading list (ASOPs 12, 13 and 43 only), PDF pp.2-6, sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf"
    - "Board of Governors of the Federal Reserve / OCC, SR 11-7 Supervisory Guidance on Model Risk Management (2011), Section IV/V: 'rigorous assessment of data quality and relevance, and appropriate documentation'; Section VII: documentation 'sufficiently detailed so that parties unfamiliar with a model can understand how the model operates, its limitations, and its key assumptions', sha256:0046c0e4eb705830d43312da000271655000beb2a349e1cc3802815638c62cc0 — https://www.federalreserve.gov/boarddocs/srletters/2011/sr1107a1.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Data Quality.md
---

**Data Quality** is whether the data behind an actuarial analysis are *appropriate* (suitable for the intended purpose and relevant to what is being analyzed), *reasonable* and *sufficient* (enough records and data elements for the analysis). [[ASOP 23 - Data Quality (ASB - 2016)|ASOP No. 23]] sets out what an actuary must do about it: select the data, review it, decide how it can be used, and disclose its limitations.

> $$\text{Reconciliation difference} = \sum_{i} \text{Premium}_i^{\,\text{data}} - \text{Premium}^{\,\text{financial records}}$$

- The reconciliation above is the most common single review check: totals built from the modelling data (premium, exposure, paid losses, claim counts) are compared with an independent source such as the financial statements. A difference is not automatically an error — it has to be **explained** (a missing month, a line of business excluded, a timing difference)
- **Selection** (ASOP 23 §3.2): consider the data elements wanted and the alternatives; weigh whether the data are appropriate and current, internally consistent, consistent with readily available external information, sufficient, and what their known limitations are
- **Review** (§3.3): make a reasonable effort to learn the *definition* of each data element and to identify questionable values or inconsistent relationships — a policy effective after it expires, a claim reported before the accident, negative exposure. A review is not an **audit**, and the actuary is not required to perform one
- **Use** (§3.4): judge whether the data are acceptable as they are, need enhancement, can be used with judgmental adjustments, or are too inadequate to use at all
- **Reliance** (§3.5–3.6): the accuracy of data supplied by others is their responsibility, but the actuary still reviews it and discloses the reliance. This is the stakeholder side of PCPA objective A1 — the business owners, underwriters and IT staff who supply data and context are the first source of both
- Poor-quality data are a leading source of [[Model Risk|model risk]]: a model will fit whatever it is given

> [!example]- Reconciling a Modelling Extract {Example}
> A homeowners modelling extract totals $\$41{,}600{,}000$ of written premium for the year. The annual statement shows $\$43{,}200{,}000$ for the same line. The data owner explains that $\$1{,}500{,}000$ of premium on policies written through a program administrator is booked outside the policy system. What remains unexplained, and what should the actuary do?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Difference} &= 41{,}600{,}000 - 43{,}200{,}000 \\
> > &= -1{,}600{,}000 \\
> > \text{Unexplained} &= -1{,}600{,}000 + 1{,}500{,}000 \\
> > &= -100{,}000
> > \end{align*}
> > $$
> > $\$100{,}000$ — about $0.2\%$ of premium — remains unexplained. That is small enough that it is unlikely to matter to a rating model, but it should still be noted. The **$\$1.5$M program business** is the real finding: those policies are missing from the model data entirely. The actuary must decide whether their absence biases the analysis — and disclose it either way.

> [!example]- Questionable Values Found in Review {Example}
> Reviewing a personal auto file, an actuary finds $312$ policies with a driver age of $0$ and $41$ with driver age above $110$. How should these be handled under ASOP 23?
>
> > [!answer]-
> > First, **find the definition**: ask the data owner what the field means and why these values occur. Age $0$ is often a default written when the field was left blank, which makes it [[Missing Data|missing data]] in disguise, not a real age. Values above $110$ are more likely keying errors or dates of birth entered in the wrong format.
> >
> > Then decide on **use**: correct the values from source if practical; otherwise treat them as missing rather than letting a model fit a relativity to "age 0." Finally **disclose**: in summary form, the questionable values found and the steps taken to fix them.

> [!tip]- How it appears on the exam
> - **DISC-DA** covers applying data quality principles in its first topic, planning an insurer data modeling project, beside [[Data Documentation|documenting data]] and [[Data Types|data classifications]]. Application questions describe a data set gathered for a model and ask which quality consideration it fails (appropriate, reasonable, sufficient, current) or what the analyst should do next: learn a field's definition, investigate a questionable value, reconcile to another source, or disclose a limitation.
> - **PCPA** uses the same ASOP No. 23 framework: reconciling the data to financial records before an analysis, and judging whether the data can support it.

> [!warning]- Exam traps
> - **A review is not an audit:** ASOP No. 23 defines a review as an examination of the data's obvious characteristics for reasonableness and consistency, which is less detailed than an audit testing accuracy and completeness. An answer requiring the actuary to audit the source data overstates the standard.
> - **Questionable is not wrong:** A strange value is investigated and its definition learned before it is changed or excluded. Unresolved questionable values that could matter are disclosed in summary form.
> - **Imperfect data can still be used:** ASOP No. 23 lets the actuary use data as they are, enhance them, apply disclosed judgmental adjustments, or widen the results, and only if the data are so inadequate that none of these works obtain other data, do the parts of the assignment the data support (with the principal's consent), or decline it.
