---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:bd1e1505b06bb4d1a345ce30a161cf720bc3d498b76c1cd32d11faabdcc50971
  sources: []
  open_findings: 0
  log: .verify/Concepts/Ultimate Loss.md
---

**Ultimate Loss** is the total cost a cohort of claims will have when every one of them is settled and closed — the quantity every reserving method exists to estimate.

> $$U = \text{Paid} + \text{Case Reserves} + \text{IBNR}$$

> $$U = \text{Reported} + \text{IBNR}$$

- Ultimate is an **estimate until the last claim closes**, which in a long-tail line can be decades. Only at that point does it become a fact, and by then it is of historical interest only.
- The methods differ in how they estimate the unknown part, not in what they estimate: [[Chain Ladder Method|chain ladder]] scales the diagonal, [[Bornhuetter-Ferguson Method|BF]] adds an a priori-based estimate of what has not emerged, [[Cape Cod Method|Cape Cod]] derives that a priori from the data, [[Frequency-Severity Method|frequency-severity]] multiplies projected counts by projected severity.
- **Selecting** an ultimate is a separate step from computing the methods. Standard practice is to run several methods on both paid and reported data, lay the results side by side by accident year, and select — leaning on a priori methods at immature ages and development methods at mature ones, with reasons recorded.
- The ultimate loss ratio ($U / \text{EP}$) is the number that links reserving to pricing: it is the retrospective test of whether the year was priced adequately, and it is the input to the a priori for future years ([[Rate Level Change]]).
- Ultimate must be stated on a defined basis — gross or [[Net of Reinsurance|net]], with or without [[Allocated Loss Adjustment Expense|ALAE]], before or after [[Salvage and Subrogation|salvage and subrogation]] — and the basis must be the same on both sides of every comparison.

![[Media/Figures/Ultimate_Loss.svg|340]]

> [!example]- Selecting an Ultimate from Several Methods {Example}
> AY 2023 at $12$ months: paid $\$300{,}000$, case reserves $\$200{,}000$, reported $\$500{,}000$; earned premium $\$1{,}200{,}000$; a priori ELR $83.3\%$; reported $\text{CDF}_{12} = 2.400$; paid $\text{CDF}_{12} = 4.100$.
>
> Compute the candidate ultimates and select.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Reported CL} &= \$500{,}000 \times 2.400 = \$1{,}200{,}000 \\[4pt]
> > \text{Paid CL} &= \$300{,}000 \times 4.100 = \$1{,}230{,}000 \\[4pt]
> > \text{Expected claims} &= 0.833 \times \$1{,}200{,}000 = \$1{,}000{,}000 \\[6pt]
> > \text{BF (reported)} &= \$500{,}000 + \left(1 - \tfrac{1}{2.400}\right)\$1{,}000{,}000 \\
> > &= \$500{,}000 + \$583{,}000 \\
> > &= \$1{,}083{,}000
> > \end{align*}$$
> >
> > The four estimates span $\$1{,}000{,}000$ to $\$1{,}230{,}000$. At **$12$ months** the development methods rest on a $2.4$ (or $4.1$) multiple of a thin diagonal, so they carry the least weight; the expected claims estimate rests entirely on an ELR that may be stale.
> >
> > A selection around $\$1{,}140{,}000$ — between BF and the chain ladders, closer to BF — is defensible, implying
> >
> > $$\text{IBNR} = \$1{,}140{,}000 - \$500{,}000 = \$640{,}000$$
> >
> > What matters more than the exact pick is that the paid and reported chain ladders **agree** ($\$1{,}200$K vs $\$1{,}230$K). That agreement says the diagonal is not distorted by case adequacy or settlement speed, which is what makes leaning toward the development methods reasonable at all.

> [!example]- Ultimates Moving Between Valuations {Example}
> Selected ultimates for one accident year at successive year-ends:
>
> | Valuation | Selected ultimate |
> |---|---|
> | $12$ mo | $\$9{,}200{,}000$ |
> | $24$ mo | $\$9{,}400{,}000$ |
> | $36$ mo | $\$10{,}100{,}000$ |
> | $48$ mo | $\$11{,}300{,}000$ |
>
> What does this pattern indicate?
>
> > [!answer]-
> > The estimate has risen at every valuation, and the increases are **accelerating** ($+2.2\%$, $+7.4\%$, $+11.9\%$). A well-estimated ultimate should move randomly around its final value, not drift consistently in one direction.
> >
> > Consistent upward drift means the estimation process is **systematically low**, and the usual causes are:
> >
> > - development factors selected too low, often by excluding "unusual" high factors each year;
> > - a [[Tail Factor|tail factor]] that is too small — which bites at exactly these later maturities;
> > - an a priori ELR that was too optimistic, holding BF estimates down while the data pulled upward;
> > - a genuine calendar-year deterioration ([[Inflation|social inflation]], a legal change) affecting all open years.
> >
> > The distinction matters: the first three are process failures to be corrected in the method, the fourth is a real-world change to be quantified and reflected in *both* reserves and pricing. Tracking this pattern across accident years is what [[Actual vs Expected Analysis|actual-versus-expected]] monitoring is for, and finding it four years late — as here — is exactly what that monitoring exists to prevent.
