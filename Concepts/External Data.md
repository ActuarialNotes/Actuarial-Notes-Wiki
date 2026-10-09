---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:20f90843e5dd7473c24b026f0b6e6258cc319f9efdf51960b1f7457c7771b20e
  sources: []
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
