---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:8d76807c006da5aa84babff349b5e911497327c999b3b902f1dcb74acdefa234
  sources:
    - "U.S. Geological Survey, Data Management: Data Dictionaries, contents of a data dictionary (data type, size, nullability, business rules, domains/lookup tables, definitions); USGS Survey Manual 502.7 metadata (who produced the data, collection and processing methods, definitions of entities and attributes), sha256:4d1a24d7a64bec6e3f31b3b12d59fb36f14427d6a4aacfa206e393a1274bc830 — https://www.usgs.gov/data-management/data-dictionaries"
    - "Google Cloud, Dataplex documentation, About data lineage, 'Data lineage ... shows you where your data comes from (the origin), where it travels (the destinations), and all the changes or transformations', sha256:7748d727c6fd9c29c65f30f109cf59cc39f7e51f661de7c8ca50c27945dbe4b1 — https://docs.cloud.google.com/dataplex/docs/about-data-lineage"
    - "ASB, ASOP No. 23 Data Quality (Doc. No. 185, Dec. 2016), §2.4 data element; §3.3(a) reasonable effort to determine the definition of each data element; §4.1 disclosures, PDF pp.6-11, sha256:784c57a1379b189b234452dc7fe18d391ae86e7f5fb8815d14d35400eb3e7bdf — https://www.actuarialstandardsboard.org/wp-content/uploads/2017/01/asop023_185.pdf"
    - "ASB, ASOP No. 56 Modeling (Doc. No. 195, Dec. 2019), §3.1.5 Data (refer to ASOP 23); §3.7 Documentation (another actuary qualified in the same practice area could assess the reasonableness), PDF pp.10-16, sha256:f3e159300fde3ff3f9db4198eb6b0a660f182875b2cc47a2da92c2567b7bd799 — https://www.actuarialstandardsboard.org/wp-content/uploads/2020/01/asop056_195.pdf"
    - "Board of Governors of the Federal Reserve / OCC, SR 11-7 Supervisory Guidance on Model Risk Management (2011), Section IV/V: 'rigorous assessment of data quality and relevance, and appropriate documentation'; Section VII: documentation 'sufficiently detailed so that parties unfamiliar with a model can understand how the model operates, its limitations, and its key assumptions', sha256:0046c0e4eb705830d43312da000271655000beb2a349e1cc3802815638c62cc0 — https://www.federalreserve.gov/boarddocs/srletters/2011/sr1107a1.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.3, printed p.37 (PDF p.43): similar labels do not imply similar definitions; paid claims net or gross of recoveries, with or without expenses, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "Vermont DFR Insurance Bulletin No. 229 (Mar. 12, 2024), adopting the NAIC Model Bulletin on Use of AI Systems by Insurers: unfair discrimination, bias analysis, data lineage/currency, third-party data and AI systems (§§3-4), sha256:0fa2eb6c77c4fad493df0b53612e9fd4cb815834300d37433713caaa70c215a5 — https://dfr.vermont.gov/sites/finreg/files/regbul/dfr-insurance-bulletin-229-ai.pdf"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Data Documentation.md
---

**Data Documentation** is the written record of what a data set contains and how it was made: a definition, type, unit and valid range for every field, where each field came from, and every transformation applied on the way. It lets someone who did not build the data, such as a modeler, a reviewer or a regulator, use it correctly and reproduce it, and it is the first defence of [[Data Quality|data quality]] in an insurer's modelling project.

> $$E_{[a,b]} = \sum_i u_i \times \frac{\left|[s_i, e_i] \cap [a, b]\right|}{e_i - s_i}$$

> $$\text{field} = T_k \circ \cdots \circ T_2 \circ T_1(\text{source})$$

- **Symbols:** The first block is the kind of precise definition a data dictionary should hold, here for [[Earned Exposure|earned exposure]] over a reporting period $[a, b]$. Policy $i$ runs from $s_i$ to $e_i$ and carries written exposure $u_i$ in stated units, such as car-years, and the fraction is the share of its term that falls inside the period. The second block is a field's lineage: the ordered transformations $T_1, \dots, T_k$ that turn a source field into the field as delivered.
- **Data dictionary:** A data dictionary lists every field with its name, plain-language definition, data type and format, unit, allowed values or range, how missing values are coded, the source system, and the owner who can answer questions about it. A coded field also needs its code list, because `03` means nothing until the dictionary says which territory or coverage it stands for.
- **Metadata:** Metadata is data about the data set as a whole. It records when the data were extracted and as of what valuation date, the number of records and the control totals, the filters applied, the version, and who prepared it. The control totals are what later [[Data Validation|validation]] reconciles against.
- **Lineage:** Lineage traces each field back through the [[Data Pipeline|pipeline]] to its source: which tables were joined, which records were excluded, how amounts were converted, and which rules derived a new field. When a number looks wrong, lineage is what lets the analyst find the step that changed it.
- **Transformations and assumptions:** A derived field is documented with its formula and the judgments behind it. Examples are whether losses include allocated loss adjustment expense, whether [[Salvage and Subrogation|salvage and subrogation]] are netted, how a policy cancelled mid-term is earned, and how outliers were capped.
- **Why it matters:** The same word often means different things in different departments. Underwriting may count exposure in policies, ratemaking in car-years, and finance may book premium net of [[Reinsurance|ceded reinsurance]]. Documentation fixes one meaning per field, so that two analysts who join the same tables get the same answer.
- **Standards:** [[ASOP 23 - Data Quality (ASB - 2016)|ASOP No. 23]] asks the actuary to make a reasonable effort to learn the definition of each data element and to disclose the data's limitations, and [[Model Governance|model governance]] frameworks require the data behind a model to be documented well enough that the model can be reproduced.

> [!example]- A Data Dictionary Entry for Earned Exposure {Example}
> An auto insurer's modelling data set has a field `earned_exposure_cy`, which holds the exposure each policy earned in calendar year 2024. Two policies illustrate it. Policy A insures 2 cars for 12 months from October 1, 2024 to October 1, 2025. Policy B insures 1 car for 6 months from August 15, 2024 to February 15, 2025. Write the dictionary entry for the field and compute its value for each policy, counting days.
>
> > [!answer]-
> > A useful entry for the field reads as follows.
> >
> > - **Definition:** The car-years of coverage provided by the policy term within calendar year 2024, earned evenly by day.
> > - **Unit and type:** The unit is car-years, where 1 car insured for 365 days is 1.0000, and the type is a decimal with 4 places.
> > - **Range:** The value lies between 0 and the term's written car-years, and a negative value is an error.
> > - **Source and lineage:** It comes from `policy_term` (effective date, expiry date and vehicle count) and is derived as written car-years times the share of the term's days inside 2024. A cancelled term uses its cancellation date as $e_i$.
> > - **Owner and as-of date:** The pricing data team owns it, and it was extracted as of March 31, 2025.
> >
> > Policy A writes 2 car-years, and 92 of its 365 days fall in 2024. Policy B writes 0.5 car-years over 184 days, and 139 of them fall in 2024.
> > $$
> > \begin{align*}
> > E_A &= 2 \times \frac{92}{365} \\
> > &= 0.5041 \\
> > E_B &= 0.5 \times \frac{139}{184} \\
> > &= 0.3777
> > \end{align*}
> > $$
> > Together the two policies earned 0.8818 car-years in 2024. The definition matters for Policy B: counted in policy terms instead of car-years, it would show 0.7554, twice its car-years.

> [!example]- What Goes Wrong Without a Definition {Example}
> A pricing analyst receives a file of six-month auto policies with a field named `exposure` and no data dictionary. In the year, 2,000 policy terms were fully earned and incurred losses were \$1,200,000. The rate manual quotes premiums per car-year. The analyst assumes `exposure` counts car-years, but it actually counts policy terms. What pure premium does the analyst compute, and what should it be?
>
> > [!answer]-
> > Each six-month term is half a car-year, so the 2,000 terms are 1,000 car-years.
> > $$
> > \begin{align*}
> > \text{PP}_{\text{analyst}} &= \frac{1{,}200{,}000}{2{,}000} \\
> > &= 600 \\
> > \text{PP}_{\text{correct}} &= \frac{1{,}200{,}000}{1{,}000} \\
> > &= 1{,}200
> > \end{align*}
> > $$
> > The analyst's \$600 is a pure premium per six-month term, but it would be read as \$600 per car-year, so the indicated annual rate is half what the losses support. Nothing in the data looks wrong, because every value is valid. Only a dictionary entry stating the unit, or a reconciliation of exposure to the policy count, would catch it.

> [!tip]- How it appears on the exam
> - **DISC-DA:** Questions describe a modelling project and ask which element of documentation is missing or what a data dictionary should record for a field. Others ask why lineage matters when a result cannot be reproduced. Expect application questions that pair documentation with [[Data Quality|data quality principles]] and [[Data Types|data classifications]] from the same topic.
> - **Scenario questions:** A common shape gives two analysts who reach different totals from the same source and asks for the cause. The answer is usually an undocumented definition, filter or transformation, such as a field counting policies in one extract and car-years in the other.

> [!warning]- Exam traps
> - **A field name is not a definition:** A name like `exposure` or `losses` leaves open the unit, the basis and what is included. The documentation has to say whether losses are paid or incurred, whether they include expenses, and whether they are gross or net of recoveries.
> - **Metadata versus the data dictionary:** The data dictionary describes each field, while metadata describes the data set as a whole, such as its extract date, record count, filters and version. A question about control totals or the as-of date is about metadata.
> - **Lineage is about transformations, not storage:** Lineage records how a field was derived and which records were dropped on the way, not just which database it sits in. Without it, an excluded line of business or a changed rule is invisible.
> - **Documentation does not validate the data:** Documenting a field correctly does not make its values right. The values still need the range, consistency and reconciliation checks of [[Data Validation|data validation]].
