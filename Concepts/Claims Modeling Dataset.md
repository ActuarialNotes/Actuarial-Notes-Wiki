---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:f5858dd1252234fb16b50bcf0444c20acf33d2ef982af7d7dbd49f376de16422
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., §2.8 PDF p.35; §4.1 PDF pp.45-46; §4.3.1 PDF p.50; §5.1.3 PDF p.55, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS 2010), ch.3 PDF pp.43, 45 (reopened claims, valuation date), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "scikit-learn User Guide, Common pitfalls, §'Data leakage', definition, sha256:21fac11c181ab35624dcf8673f0475d403d4f6ecf0f9bead01a573d7642b515c — https://scikit-learn.org/stable/common_pitfalls.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Claims Modeling Dataset.md
---

A **claims modeling dataset** is the table a claims model is trained on: one row per claim, holding the features that are known at the moment the model will score a claim, such as at first report, and a target that records the claim's outcome measured the same way for every claim, at a fixed age or valuation date. Claims models answer questions about claims already reported, such as whether a claim is fraudulent, whether a newly opened claim will exceed a large-loss threshold, or whether a subrogation opportunity will be realized (Goldburd et al., CAS Monograph 5, §2.8 and §7.3.1).

- **Unit of observation:** A claim. Claim systems store transactions, a row for every payment and every change in the case reserve, so the data are aggregated to one row per claim, as Friedland's claim example shows (*Estimating Unpaid Claims Using Basic Techniques*, ch. 3). Counting transaction rows as claims overstates the count. Decide in advance whether a reopened claim is the same claim or a new one; Friedland notes this choice matters in lines such as workers compensation.
- **Key dates:** Friedland lists the dates that organize claim data: the policy effective dates, the accident date, the report date, the transaction dates, closing and reopening dates, and the valuation date, which is the date through which transactions are included in the database. The report date fixes what was known at first notice; the valuation date fixes how much of each claim's later history is in the extract.
- **Features as of scoring time:** A model that scores a claim at first report can only use what is known then: the loss description and cause, the accident and report dates, the claimant and coverage details, and the policy's characteristics joined from the policy system. Using information that would not be available when the model makes its prediction is **data leakage**, and it makes the model look better on historical data than it will be in use (scikit-learn, *Common pitfalls*, §12.2). Later payments, later case reserves, the closing date and anything learned during the investigation are outcomes, not features.
- **Joining the policy data:** Each claim must match exactly one policy record, the term in force on the accident date. A key that matches several records double-counts claims, and one that matches none leaves orphaned claims (Goldburd et al., §4.1; [[Data Preparation]]).
- **A consistent target:** Claims of different ages are not comparable at the valuation date: a three-year-old claim has had time to develop and a three-month-old one has not. Goldburd et al. (§5.1.3) note that where the data include claims not at full loss maturity, the losses may need to be developed before modeling. The other way to keep the target consistent is to measure every claim's outcome at the same fixed age, such as 24 months after its report or accident date, so that every claim is observed for equally long. A claim too young to have reached that age by the valuation date, the date through which transactions are included in the data (Friedland, ch. 3), has no target yet and is left out. Very large losses may be capped so a few claims do not dominate a severity target.
- **Splitting:** An out-of-time holdout, such as the latest report year, tests the model the way it will be used. A random split puts claims from one catastrophe in both sets and flatters the model (Goldburd et al., §4.3.1; [[Model Training and Evaluation]]).

The policy-side counterpart is the [[Underwriting Modeling Dataset]], whose unit is the policy or risk rather than the claim.

> [!example]- Building a Large-Loss Target {Example}
> A liability insurer wants to flag, at first report, claims likely to exceed \$100,000 incurred within 24 months of report. The extract is valued at 2025-12-31.
>
> | Claim | Report date | Incurred at 24 months | Incurred at valuation |
> | :--- | :--- | ---: | ---: |
> | C1 | 2022-03-15 | 180,000 | 210,000 |
> | C2 | 2023-06-01 | 40,000 | 40,000 |
> | C3 | 2024-02-10 | — | 150,000 |
> | C4 | 2023-11-20 | 95,000 | 130,000 |
>
> Which claims are rows of the training data, and what is each target?
>
> > [!answer]-
> > A claim is usable only if its 24-month date falls on or before the valuation date.
> >
> > - **C1:** 24 months after report is 2024-03-15, before 2025-12-31. Incurred at 24 months is \$180,000, so $y = 1$.
> > - **C2:** Reaches 24 months on 2025-06-01. Incurred is \$40,000, so $y = 0$.
> > - **C3:** Would reach 24 months on 2026-02-10, after the valuation date. It is **excluded**: its \$150,000 is not yet a 24-month value. Labeling it 1 now would measure it differently from the others.
> > - **C4:** Reaches 24 months on 2025-11-20. Incurred at that age is \$95,000, so $y = 0$, even though it has since grown to \$130,000. The target is defined at 24 months for every claim, and C4's later growth happened after that age.
> >
> > The training data have three rows, with one positive.

> [!example]- Spotting Leakage in Candidate Features {Example}
> For the model in the first example, an analyst proposes these features, all available in the claims data warehouse: (a) cause of loss coded at first notice; (b) whether an attorney was involved, taken from the claim's current record; (c) days from accident to report; (d) total paid to date; (e) the policy's liability limit; (f) the date the claim closed. Which may be used?
>
> > [!answer]-
> > - **(a), (c) and (e) may be used.** Each is known when the claim is first reported: the coded cause, the reporting lag, and the policy limit from the policy record.
> > - **(b) leaks unless its timing is controlled.** The current record shows attorney involvement at the valuation date, which may have begun months after report. Only an attorney flag as of first report is a valid feature.
> > - **(d) and (f) leak.** Paid to date and the closing date are part of the outcome the model is trying to predict, and neither exists when the claim is first scored. A model trained with them would look excellent on history and could not be used.

> [!tip]- How it appears on the exam
> - **DISC-DA:** Section 9.2 covers creating datasets for claims models. Questions describe a claims modeling goal and raw tables and ask for the unit of observation, which fields are valid features at the scoring point, how to define the target, or why a dataset gives a misleadingly good model.
> - Questions often pair this with SQL and [[Data Preparation]]: aggregating transactions to claims, joining claims to the policy in force, and filtering on dates.

> [!warning]- Exam traps
> - **Features from after the scoring point:** A feature that is only recorded later in the claim's life, such as a reserve change or a closing date, leaks the outcome. Check *when* each field becomes known, not just whether it is in the warehouse.
> - **Targets at different ages:** Labeling recent claims with their current incurred and old claims with their ultimate mixes maturities. Define the target at a fixed age and drop claims too young to have one.
> - **Transactions as claims:** A claim with a payment and two reserve changes is one claim, not three rows of claims.
> - **Policy unit vs. claim unit:** A claims model's row is a claim. Building it on the policy-level dataset of an underwriting model drops the claim's own details.
