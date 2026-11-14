---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:1335a7589c1bd719a13173b58f52b6d6a281b398747312562073e3c79e3815d8
  sources:
    - "Harvard Business School Online, Business Insights blog, 4 Types of Data Analytics, 'Key Types of Data Analytics' (descriptive: what happened; diagnostic: why did this happen; predictive: what might happen; prescriptive: what should we do next), sha256:bf1c1ea414e003a7ab9801d8655a2b59ad54fb050dd451d2ba3aeec312c3d7b0 — https://online.hbs.edu/blog/post/types-of-data-analysis"
    - "IBM Think, What is prescriptive analytics?, four key types of data analytics; prescriptive builds on descriptive and predictive and takes into account constraints, objectives and tradeoffs, sha256:a6b3fcc1956a59ff154ddc25f22dcd029cca7f30de11c59d74f7d814e197e0ea — https://www.ibm.com/think/topics/prescriptive-analytics"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Data Analytics.md
---

**Data Analytics** is the process of examining data to draw conclusions that support decisions. It is commonly divided into four types that answer progressively harder questions: **descriptive** analytics asks what happened, **diagnostic** analytics why it happened, **predictive** analytics what is likely to happen, and **prescriptive** analytics what should be done.

| Type | Question | Insurer example |
| :--- | :--- | :--- |
| Descriptive | What happened? | Loss ratio by line and quarter |
| Diagnostic | Why did it happen? | Tracing a loss ratio rise to water claims in one region |
| Predictive | What is likely to happen? | A pure premium model or a fraud score |
| Prescriptive | What should be done? | Which claims to investigate, given the staff available |

A descriptive summary reports counts and averages, such as the average outcome over the records in a group, as in a territory's claim frequency. A diagnostic analysis starts from a descriptive result and breaks it down by segment, period or cause to find what drove it. Explaining why last quarter's loss ratio rose is diagnostic, even when the explanation uses a model. Predictive analytics estimates outcomes that are not yet known, such as next year's claims or whether an open claim will be litigated, by fitting a model to past data, such as a [[Decision Tree|classification tree]] or a [[Linear Regression|linear regression]]. Prescriptive analytics combines a prediction with costs and constraints to recommend an action.

Every type depends on [[Data Quality|data quality]], because a summary or a model is only as reliable as the data behind it. [[External Data|External data]] can add characteristics that the insurer's own records do not hold.

> [!example]- Which type of analytics is each of these four insurer analyses? {Example}
> 1. A dashboard shows that personal auto claim counts rose 12% from last year.
> 2. An analyst finds that the rise comes from one region, where a hailstorm struck in June.
> 3. A model estimates each open claim's probability of being litigated.
> 4. A tool assigns open claims to adjusters so as to minimize expected cost, given each adjuster's workload.
>
> > [!answer]-
> > 1. **Descriptive:** It summarizes what happened without explaining it.
> > 2. **Diagnostic:** It explains why the count rose by breaking the change down by region and event.
> > 3. **Predictive:** It estimates an outcome that is not yet known for each claim.
> > 4. **Prescriptive:** It turns predictions, costs and a constraint into a recommended action.

> [!trap] Calling a prediction prescriptive
> A fraud score is predictive, and deciding which claims to investigate also needs the cost of an investigation, the expected saving and the investigators' capacity. Calling the score itself prescriptive misses that decision step.
