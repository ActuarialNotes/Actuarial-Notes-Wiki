---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:162eee5cf3f64972c9216a71ba06d29697e7ab004630a357dd92382acdee737b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Actual Cash Value.md
---

**Actual Cash Value** (ACV) is the value of property at the time of a loss, the amount that puts the insured back where they were rather than paying for something new. Policies rarely define it, so it is measured in one of three ways depending on the jurisdiction: [[Replacement Cost|replacement cost]] less depreciation, fair market value, or the broad evidence rule, under which every relevant fact is weighed. The Institutes' DISC-IA outline calls it actual cost value.

> $$\text{ACV} = \text{RC}_{\text{today}} - \text{Depreciation}$$

> $$\text{ACV} = \text{Fair market value}$$

> $$\text{ACV} = \text{Value weighed on all the evidence}$$

- **Replacement cost less depreciation:** This is the most common measure. Replacement cost is today's price for property of like kind and quality, and depreciation reflects the loss of value from age, wear, physical condition and obsolescence. The calculation on the property itself, with a straight-line estimate and a worked example, is on [[Replacement Cost]].
- **Fair market value:** This is the price a willing buyer would pay a willing seller, neither under pressure to deal. It suits property that trades in an active market, such as a used car, which is why [[Auto Physical Damage Coverage|auto physical damage]] is settled at the vehicle's ACV. It is hard to use for a building, because a sale price includes the land and reflects location and demand rather than the cost to rebuild.
- **The broad evidence rule:** Many courts let the adjuster and the trier of fact consider every relevant factor, including replacement cost, depreciation, market value, obsolescence, the property's use and the income it produces, and reach the figure that best measures the insured's actual loss. The rule is usually traced to the New York case *McAnarney v. Newark Fire Insurance Co.* (1928), and it exists because each single test can badly misstate the loss of an old building in a weak market.
- **Indemnity:** ACV is the measure that comes closest to strict indemnity, which pays the insured what was lost and no more. A replacement cost basis pays more than that whenever property has aged, so policies offer it as an option or a condition, often requiring the property to be rebuilt first.
- **Where it applies:** The commercial [[Building and Personal Property Coverage Form|BPP]] values property at ACV unless the replacement cost option is chosen, the [[Homeowners Policy|homeowners policy]] settles personal property at ACV unless endorsed, and the [[Personal Auto Policy|personal auto policy]] limits physical damage payments to ACV. The other settlement bases that replace or modify it are on [[Loss Settlement Provisions]].
- **Coinsurance on an ACV basis:** When the policy values property at ACV, the coinsurance requirement is also measured at ACV, so the measure chosen changes the required limit too ([[Insurance to Value]]).

> [!example]- An Old Building Valued Three Ways {Example}
> A three-story brick warehouse is 30 years into a 50-year useful life, in a district where demand has collapsed. A building of like kind and quality would cost \$900,000 to build today. A comparable property, land included, recently sold for \$250,000, and the land alone is worth \$100,000. The building's upper floors are unusable for modern storage. Find its ACV under replacement cost less depreciation and under fair market value, and describe how the broad evidence rule would approach it.
>
> > [!answer]-
> > With straight-line depreciation:
> > $$
> > \begin{align*}
> > \text{Depreciation} &= 900{,}000 \times \frac{30}{50} \\
> > &= 540{,}000 \\
> > \text{ACV}_{\text{RC}} &= 900{,}000 - 540{,}000 \\
> > &= 360{,}000
> > \end{align*}
> > $$
> > The market measure values the building alone, so the land is taken out of the sale price.
> > $$
> > \begin{align*}
> > \text{ACV}_{\text{FMV}} &= 250{,}000 - 100{,}000 \\
> > &= 150{,}000
> > \end{align*}
> > $$
> > The two measures differ by \$210,000. The broad evidence rule uses no formula: the adjuster or court weighs both figures together with the functional obsolescence of the upper floors and the rent the building can earn. Here those facts point toward the lower figure, because a buyer would not pay \$360,000 for a building the market values at \$150,000. A building in a strong market, where the sale price exceeds the depreciated replacement cost, would push the weighing the other way.

> [!example]- Depreciating Today's Cost, Not the Price Paid {Example}
> A restaurant bought a walk-in freezer six years ago for \$20,000. A freezer of like kind and quality costs \$26,000 today, and the useful life is 15 years. The adjuster also deducts an illustrative 10% of replacement cost for obsolescence, because the freezer's refrigerant is being phased out. Find the ACV, and the figure an adjuster would reach by depreciating the purchase price.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{ACV} &= 26{,}000\left(1 - \frac{6}{15} - 0.10\right) \\
> > &= 13{,}000 \\
> > \text{Price-based} &= 20{,}000\left(1 - \frac{6}{15} - 0.10\right) \\
> > &= 10{,}000
> > \end{align*}
> > $$
> > The price-based figure understates the loss by \$3,000, because prices have risen 30% since the purchase. ACV starts from what it would cost to replace the property now. Obsolescence is a deduction in its own right, so an item can lose value faster than its age alone suggests.

> [!tip]- How it appears on the exam
> - **DISC-IA:** The objective is to determine replacement cost and actual cash value. A question gives an item's replacement cost, age and useful life, or a depreciation percentage, and asks for its ACV and the payment after a deductible.
> - **Measures of ACV:** A definitional question asks how ACV is measured under the fair market value approach or the broad evidence rule, or which measure suits a given kind of property.
> - **Combined provisions:** A settlement question can apply a coinsurance clause measured at ACV, or compare the ACV payment with what a replacement cost or other basis would pay ([[Loss Settlement Provisions]]).

> [!warning]- Exam traps
> - **Today's cost:** Depreciation comes off the current replacement cost, not the original purchase price. A question that gives both is testing which one you start from.
> - **Land in the market price:** A real estate sale price includes the land, which is not destroyed by fire and is not insured. Using the full sale price as a building's ACV overstates it.
> - **ACV is not book value:** The insured's accounting records show cost less accounting depreciation, which follows tax or accounting schedules rather than the property's real condition. ACV is an economic value and can be far above the book figure.
> - **Total auto losses:** Auto physical damage pays the lesser of the ACV and the repair cost. An answer that pays a repair estimate above the car's ACV has missed the total-loss rule.
