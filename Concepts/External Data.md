---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:3bdebc4e24073056adb8f06213b6781ec2f7131f87ca518b09b0623bcded031c
  sources:
    - "Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, May 2016), Ch.3 External Data / Other Third-Party Data, printed pp.44-47 (re-read p.44 this session) (PDF pp.56-59): credit, geo-demographic, weather indices, motor vehicle records; Ch.9 Traditional Risk Classification, printed p.158 (PDF p.170): usage-based insurance, privacy consent, legal criteria, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "ASB, ASOP No. 23 Data Quality (Doc. No. 185, Dec. 2016), §3.5 reliance on data supplied by others, disclosed, PDF p.10, sha256:784c57a1379b189b234452dc7fe18d391ae86e7f5fb8815d14d35400eb3e7bdf — https://www.actuarialstandardsboard.org/wp-content/uploads/2017/01/asop023_185.pdf"
    - "Vermont DFR Insurance Bulletin No. 229 (Mar. 12, 2024), adopting the NAIC Model Bulletin on Use of AI Systems by Insurers: unfair discrimination, bias analysis, data lineage/currency, third-party data and AI systems (§§3-4), sha256:0fa2eb6c77c4fad493df0b53612e9fd4cb815834300d37433713caaa70c215a5 — https://dfr.vermont.gov/sites/finreg/files/regbul/dfr-insurance-bulletin-229-ai.pdf"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/External Data.md
---

**External Data** is data that originates outside the insurer's own policy, billing and claims systems. It is bought from vendors, taken from public sources or collected from devices. Insurers add it to their internal data to measure characteristics their own records lack, such as a person's credit history, how a car is driven, a property's exposure to hazards and the weather at a location.

The insurer's own records are its [[Insurer Operational Data|operational data]], which describe its own book at the level of the individual policy and claim. External data supplements them. Its common sources are:

| Source | What it describes |
| :--- | :--- |
| Credit reports | A person's credit history, scored by [[Credit-Based Insurance Scoring]] |
| Telematics devices and phone apps | Driving behaviour, for [[Usage-Based Insurance]] |
| Geospatial and weather data | A location's exposure to wildfire, flood or hail |
| Public records | Motor vehicle reports, property and court records |
| Connected sensors (the Internet of Things) | Events in homes and vehicles, such as water leaks, as they happen |

Before using a source, an insurer checks:

1. Its quality: accuracy, completeness, how current it is and whether its definitions change over time.
2. Whether its use is legal for that purpose and line of business.
3. The privacy and consent requirements for personal data.
4. Its cost against the improvement it brings to the model.
5. Whether it carries historical bias that could lead to [[Proxy Discrimination|proxy discrimination]].

[[Data Quality|Data quality]] standards such as ASOP No. 23 still expect the actuary to review data supplied by others and to disclose any reliance on them. A vendor's score is often a model whose inputs the insurer cannot see, so the insurer cannot fully explain it. That limits the model's [[Explainability|explainability]], and testing the score's outputs across groups becomes the main check for bias.

## Matching to internal records

External data must be attached to the insurer's records by a key such as an address, a vehicle identification number, or a name with a date of birth. For a group of records, the share that found a match is the

> $$\text{Match rate} = \frac{\text{records matched to the source}}{\text{records submitted}}$$

The records that fail to match are rarely a random sample of the book, so match rates are compared across segments, such as territories, as well as overall.

> [!example]- What do these match rates mean for the roof-condition model? {Example}
> An insurer sends its 50,000 homeowners policies to a vendor for a roof-condition score derived from aerial images.
>
> | Segment | Policies | Matched |
> | :--- | ---: | ---: |
> | Rural | 5,000 | 2,000 |
> | Other | 45,000 | 44,000 |
> | Total | 50,000 | 46,000 |
>
> > [!answer]-
> > - The overall match rate is $46{,}000/50{,}000 = 92.0\%$.
> > - The rural match rate is $2{,}000/5{,}000 = 40.0\%$, and the rate for the other policies is $44{,}000/45{,}000 = 97.8\%$.
> > - The overall rate looks good, but the missing scores are concentrated in rural policies, so they are not missing at random.
> > - Dropping the unmatched policies would remove 60% of the rural book and bias the model toward urban risks.
> > - The better treatment keeps them with "no score" as a level of its own ([[Missing Data]]).
> > - The purchase should be justified by the improvement in the model, given that the score reaches only 40% of rural risks.

> [!trap] Treating a predictive source as permitted
> A source that improves a model can still be restricted or barred for that use, and the rules differ by jurisdiction and line of business. Legality should be checked before the modelling work, not after.
