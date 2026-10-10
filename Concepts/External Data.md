---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:20f90843e5dd7473c24b026f0b6e6258cc319f9efdf51960b1f7457c7771b20e
  sources:
    - "Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, May 2016), Ch.3 External Data / Other Third-Party Data, printed pp.44-47 (PDF pp.56-59): credit, geo-demographic, weather indices, motor vehicle records; Ch.9 Traditional Risk Classification, printed p.158 (PDF p.170): usage-based insurance, privacy consent, legal criteria, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "ASB, ASOP No. 23 Data Quality (Doc. No. 185, Dec. 2016), §3.5 reliance on data supplied by others, disclosed, PDF p.10, sha256:784c57a1379b189b234452dc7fe18d391ae86e7f5fb8815d14d35400eb3e7bdf — https://www.actuarialstandardsboard.org/wp-content/uploads/2017/01/asop023_185.pdf"
    - "Vermont DFR Insurance Bulletin No. 229 (Mar. 12, 2024), adopting the NAIC Model Bulletin on Use of AI Systems by Insurers: unfair discrimination, bias analysis, data lineage/currency, third-party data and AI systems (§§3-4), sha256:0fa2eb6c77c4fad493df0b53612e9fd4cb815834300d37433713caaa70c215a5 — https://dfr.vermont.gov/sites/finreg/files/regbul/dfr-insurance-bulletin-229-ai.pdf"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/External Data.md
---

**External Data** is data that originates outside the insurer's own policy, billing and claims systems: it is bought from vendors, taken from public sources or collected from devices. Insurers add it to their internal data to measure characteristics their own records lack, such as a person's credit history, how a car is driven, a property's exposure to hazards and the weather at a location.

> $$\text{Match rate} = \frac{\text{records matched to the source}}{\text{records submitted}}$$

- **Common sources:** [[Credit-Based Insurance Scoring|Credit-based insurance scores]] are built from credit reports, and telematics devices and phone apps record driving behaviour for [[Usage-Based Insurance|usage-based insurance]]. Geospatial and weather data describe a location's exposure to wildfire, flood or hail, public records include motor vehicle reports and property and court records, and connected sensors in homes and vehicles (the Internet of Things) report events such as water leaks as they happen.
- **Matching:** External data must be attached to the insurer's records by a key such as an address, a vehicle identification number, or a name with a date of birth. The match rate above measures how many records found a match, and the records that fail to match are rarely a random sample of the book.
- **Considerations:** Before using a source, check its quality (accuracy, completeness, how current it is and whether its definitions change over time), whether its use is legal for that purpose and line of business, the privacy and consent requirements for personal data, and its cost against the improvement it brings to the model. Check also whether it carries historical bias that could lead to [[Proxy Discrimination|proxy discrimination]]. [[Data Quality|Data quality]] standards such as ASOP No. 23 still expect the actuary to review data supplied by others and to disclose any reliance on them.

> [!example]- A Match Rate That Is Not Random {Example}
> An insurer sends its 50,000 homeowners policies to a vendor for a roof-condition score derived from aerial images, and 46,000 are matched. Of the 5,000 rural policies, 2,000 are matched, and of the 45,000 other policies, 44,000 are matched. Compute the match rates and say what they mean for the model.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Overall} &= \frac{46{,}000}{50{,}000} \\
> > &= 92.0\% \\
> > \text{Rural} &= \frac{2{,}000}{5{,}000} \\
> > &= 40.0\% \\
> > \text{Other} &= \frac{44{,}000}{45{,}000} \\
> > &= 97.8\%
> > \end{align*}
> > $$
> > The overall rate looks good, but the missing scores are concentrated in rural policies, so they are not missing at random. Dropping the unmatched policies would remove 60% of the rural book and bias the model toward urban risks. The better treatment keeps them with "no score" as a level of its own (see [[Missing Data]]), and the purchase should be justified by the improvement in the model given that the score reaches only 40% of rural risks.

> [!tip]- How it appears on the exam
> - **DISC-DA** covers external data sources in its topic on collecting data for insurer models, beside insurer operational data and statistical plans, and its final topic covers the societal impact of credit-based insurance scores. A question can describe a proposed external source and ask which consideration, such as quality, legality, privacy, cost or bias, matters most for it.

> [!warning]- Exam traps
> - **Predictive is not permitted:** A source that improves a model can still be restricted or barred for that use, and the rules differ by jurisdiction and line of business. Legality should be checked before the modelling work, not after.
> - **Vendor scores are not self-explaining:** A vendor's score is often a model whose inputs the insurer cannot see, so the insurer cannot fully explain it. That limits the model's [[Explainability|explainability]], and testing the score's outputs across groups becomes the main check for bias.
