---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:7b364a38261bb2abb58f4fb1d626ff4efdccd1019b7cdeb4775c6096197672c7
  sources:
    - "IRMI Insurance Glossary, 'actual cash value (ACV)' (fetched 2026-10-10), sha256:5f284ad72439afe65429eed3341df2aa74bdea4fe89c9f1835b801646fc5053a — https://www.irmi.com/term/insurance-definitions/actual-cash-value"
    - "NY Supreme Court 2011 NY Slip Op 30852(U) opinion citing McAnarney v. Newark Fire Ins. Co., 247 NY 176 (fetched 2026-10-10), sha256:be29872438be8a9e0d15ad74b62bc2817deb7e99044e1e74a559e006672e7841 — https://www.nycourts.gov/reporter/pdfs/2011/2011_30852.pdf"
    - "Trupin, 'Actual Cash Value, Depreciation Deduction and the Broad Evidence Rule', Adjusting Today (Adjusters International) (fetched 2026-10-10), sha256:574b70c8ccf943731b839d0abf99440514ed6e3ac65719d6aa7ee97fd97e67e8 — https://adjustersinternational.com/pubs/adjusting-today/actual-cash-value-depreciation-deduction-and-the-broad-evidence-rule"
    - "ISO CP 00 10 10 12, Building and Personal Property Coverage Form, E.7.a, F.1, G.3 (pp.12-13, 15), sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf"
    - "ISO HO 00 03 05 11, Homeowners 3 – Special Form (Maine Bureau of Insurance copy), Section I Conditions D.1 (p.14), sha256:ac539e500a5767946452d1e6ad4c4b7dcc395c6c65c48fc3a8ac92a7c330a1d4 — https://www.maine.gov/pfr/insurance/sites/maine.gov.pfr.insurance/files/inline-files/ho00-03-05-11-homeowners3-special-form.pdf"
    - "ISO PP 00 01 09 18 Personal Auto Policy (Virginia SCC specimen), Part D Limit of Liability (p.11), sha256:20a8001d97dcc09d70ab2a76579414c3b869ecb4afe23d2446b844ad4c7780c8 — https://www.scc.virginia.gov/media/sccvirginiagov-home/regulated-industries/insurance/insurance-companies/property-casualty-companies/personal-commercial-auto-forms/pp-00-01-09-18.pdf"
    - "IRMI Insurance Glossary, 'book value' (fetched 2026-10-10), sha256:999cbf0ed845b3971668eaae1867ff6c90fd4249a091042c256f9f2d13fccd3a — https://www.irmi.com/term/insurance-definitions/book-value"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Actual Cash Value.md
---

**Actual Cash Value** (ACV) is the value of property at the time of a loss, the amount that puts the insured back where they were rather than paying for something new. The Institutes' DISC-IA outline calls it actual cost value. Policies rarely define it, so depending on the jurisdiction it is measured in one of three ways:

1. **[[Replacement Cost|Replacement cost]] less depreciation**, the most common measure.
2. **Fair market value**, the price a willing buyer would pay a willing seller, neither under pressure to deal.
3. **The broad evidence rule**, under which every relevant fact is weighed.

> [!example]- What is this warehouse's ACV under each of the three measures? {Example}
> A three-story brick warehouse is 30 years into a 50-year useful life, in a district where demand has collapsed. A building of like kind and quality would cost $\$900{,}000$ to build today. A comparable property, land included, recently sold for $\$250{,}000$, and the land alone is worth $\$100{,}000$. The building's upper floors are unusable for modern storage.
>
> > [!answer]-
> > - Straight-line depreciation is $900{,}000 \times \frac{30}{50} = \$540{,}000$, so replacement cost less depreciation is $900{,}000 - 540{,}000 = \$360{,}000$.
> > - The market measure values the building alone, so the land comes out of the sale price, leaving $250{,}000 - 100{,}000 = \$150{,}000$.
> > - The two measures differ by $\$210{,}000$.
> > - The broad evidence rule uses no formula. The adjuster or court weighs both figures with the functional obsolescence of the upper floors and the rent the building can earn.
> > - Here those facts point toward the lower figure, because a buyer would not pay $\$360{,}000$ for a building the market values at $\$150{,}000$.

## Replacement cost less depreciation

Replacement cost is today's price for property of like kind and quality, and depreciation reflects the loss of value from age, wear, physical condition and obsolescence. The ACV is

> $$\text{ACV} = \text{RC} - \text{Depreciation}$$

- $\text{RC}$ is the replacement cost today.

With straight-line depreciation over the property's useful life, the depreciation is

> $$\text{Depreciation} = \text{RC} \times \frac{\text{Age}}{\text{Useful life}}$$

An adjuster may also deduct for obsolescence, so an item can lose value faster than its age alone suggests.

> [!example]- What is the freezer's ACV, and what would depreciating its purchase price give? {Example}
> A restaurant bought a walk-in freezer six years ago for $\$20{,}000$. A freezer of like kind and quality costs $\$26{,}000$ today, and the useful life is 15 years. The adjuster also deducts an illustrative 10% of replacement cost for obsolescence, because the freezer's refrigerant is being phased out.
>
> > [!answer]-
> > - Age takes off $\frac{6}{15} = 40\%$ and obsolescence another 10%, leaving 50% of the starting value.
> > - ACV starts from today's cost: $26{,}000 \times 0.50 = \$13{,}000$.
> > - Depreciating the price paid gives $20{,}000 \times 0.50 = \$10{,}000$.
> > - The price-based figure understates the loss by $\$3{,}000$, because prices have risen 30% since the purchase.

## Fair market value

Fair market value suits property that trades in an active market, such as a used car, which is why [[Auto Physical Damage Coverage|auto physical damage]] is settled at the vehicle's ACV. It is hard to use for a building, because a sale price includes the land, which is not destroyed by fire and is not insured, and it reflects location and demand rather than the cost to rebuild.

## The broad evidence rule

Many courts let the adjuster and the trier of fact consider every relevant factor, including replacement cost, depreciation, market value, obsolescence, the property's use and the income it produces, and reach the figure that best measures the insured's actual loss. The rule is usually traced to the New York case *McAnarney v. Newark Fire Insurance Co.* (1928). It exists because each single test can badly misstate the loss of an old building in a weak market.

## ACV and indemnity

ACV is the measure that comes closest to strict indemnity, which pays the insured what was lost and no more. A replacement cost basis pays more than that whenever property has aged, so policies offer it as an option or a condition, often requiring the property to be rebuilt first.

The commercial [[Building and Personal Property Coverage Form|BPP]] values property at ACV unless the replacement cost option is chosen. The [[Homeowners Policy|homeowners policy]] settles personal property at ACV unless endorsed, and the [[Personal Auto Policy|personal auto policy]] limits physical damage payments to ACV. When the policy values property at ACV, the coinsurance requirement is also measured at ACV ([[Insurance to Value]]). The other settlement bases are on [[Loss Settlement Provisions]].

ACV is not book value. The insured's accounting records show cost less accounting depreciation, which follows tax or accounting schedules rather than the property's real condition.

> [!trap] Depreciating the purchase price
> Depreciation comes off the current replacement cost, not the original purchase price. A question that gives both is testing which one you start from.
