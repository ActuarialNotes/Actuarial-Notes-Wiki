---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b91c336921be127d3cc064a1f451e14e245b8370fec09424e23cbfacdc3aefae
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Premium Liability.md
---

**Premium liabilities** are the part of an insurer's [[Insurance Contract Liabilities|insurance contract liabilities]] that are not claim liabilities: the actuarial present value of the costs still to come on the unexpired portion of the policies in force at the valuation date. Canadian practice before [[IFRS 17]] built them from future claims and adjustment expenses, expected reinsurance costs and maintenance expenses, each with a provision for adverse deviations. The [[Appointed Actuary]] then compared them with the [[Unearned Premium|unearned premium]] they are meant to be paid from.

> $$\text{PL} = \text{APV}(\text{claims} + \text{LAE}) + \text{RC} + \text{ME}$$

> $$\text{EQUP} = \text{UPR}_{\text{net}} + \text{UC} - \text{PL}_{\text{net}}$$

> $$\bar{t} = \frac{\int_0^1 x\,(1-x)\,dx}{\int_0^1 (1-x)\,dx} = \frac{1}{3}$$

- **Symbols:** $\text{PL}$ is the premium liabilities. $\text{APV}$ is the actuarial present value, which discounts the cash flows and adds the provisions for adverse deviations. $\text{RC}$ is the expected cost of reinsurance protecting the unexpired coverage, and $\text{ME}$ is the maintenance expenses. $\text{EQUP}$ is the equity in the net unearned premium, $\text{UPR}_{\text{net}}$ is the net unearned premium reserve and $\text{UC}$ is the unearned reinsurance commissions. $\bar{t}$ is the average accident date of the losses in the UPR, in years after the valuation date.
- **Future claims:** The largest piece is found by applying a selected expected loss ratio to the UPR, by line or by a segmentation consistent with the claim liability analysis. The CIA's educational note adjusts historical experience to the period the UPR will be earned in, through trend to its average accident date, on-level factors, legal changes, mix, catastrophe loadings and seasonality.
- **Adjustment expenses:** ALAE and ULAE are either included with the losses or estimated separately, consistently with the claim liabilities. A common approach applies a ULAE ratio from historical experience to the expected losses.
- **Reinsurance costs:** On a net basis, the cost of reinsurance covering the unexpired portion is subtracted from the UPR before the expected loss ratio is applied, and is added back as its own item. A proportional treaty needs no separate cost, because the net UPR is already reduced and the loss ratio is the same gross and net.
- **Maintenance expenses:** These are the cost of servicing the policies in force, such as endorsements and mid-term cancellations. They are usually a share of the general expense ratio applied to the **gross** UPR, and the note gives typical shares of 25% to 50%. Their time value is "not generally material", so they are usually left undiscounted.
- **Discounting:** The payment pattern and discount rate normally match the claim liabilities. A future accident year has its average accident date half-way through the year, but the UPR of annual policies written evenly has it at one-third of a year, because the exposure left declines linearly. The present value of a future accident year is therefore moved forward by $(1+i)^{1/2 - 1/3}$. The median date, $1 - \sqrt{0.5} = 0.2929$ years, is an accepted approximation.
- **Margins:** [[Margin for Adverse Deviations|Margins for adverse deviations]] are added for claims development, reinsurance recovery and the investment return rate. The standards expect them to differ from those on claim liabilities, and claims that have not yet occurred are generally more uncertain.
- **The test:** If EQUP is at least the proposed [[Deferred Policy Acquisition Expenses|DPAE]], nothing changes. If it is positive but smaller, the DPAE is written down to EQUP. If it is negative, the DPAE goes to zero and a [[Premium Deficiency|premium deficiency]] of $-\text{EQUP}$ is carried. The equity is usually computed for all lines combined.
- **Under IFRS 17:** The [[Liability for Remaining Coverage]] took the UPR's place. Under the [[Premium Allocation Approach|PAA]], an [[Onerous Contract|onerous]] group's shortfall is recognised as a [[Loss Component|loss component]], group by group, with a risk adjustment in place of the margins.

> [!example]- Testing the Equity in the Unearned Premium {Example}
> At December 31, a personal property insurer that cedes nothing has an unearned premium of \$20.00 million on annual policies written evenly through the year. The accounting department proposes a DPAE of \$3.60 million. The illustrative assumptions are:
>
> - an expected loss ratio of 75%, with ULAE of 6% of losses;
> - maintenance expenses of 3% of the UPR, undiscounted;
> - payments of 45%, 35% and 20% made 0.5, 1.5 and 2.5 years after the accident date;
> - a discount rate of 4%, an investment return MfAD of 50 basis points, and a claims development MfAD of 7.5%.
>
> Find the premium liabilities and the DPAE to book.
>
> > [!answer]-
> > The losses in the UPR have an average accident date one-third of a year out, so the payments fall at $0.8333$, $1.8333$ and $2.8333$ years. Weighting the discount factors by the pattern gives $0.9402$ at 4% and $0.9473$ at the 3.5% that remains after the investment return MfAD.
> > $$
> > \begin{align*}
> > \text{Claims and LAE} &= 0.75 \times 20.00 \times 1.06 \\
> > &= 15.90 \\
> > \text{PV at } 4\% &= 15.90 \times 0.9402 \\
> > &= 14.95 \\
> > \text{Claims PfAD} &= 0.075 \times 14.95 \\
> > &= 1.12 \\
> > \text{Interest PfAD} &= 15.90 \times (0.9473 - 0.9402) \\
> > &= 0.11
> > \end{align*}
> > $$
> > Maintenance expenses are $0.03 \times 20.00 = 0.60$, so the premium liabilities and the equity are:
> > $$
> > \begin{align*}
> > \text{PL} &= 14.95 + 1.12 + 0.11 + 0.60 \\
> > &= 16.78 \\
> > \text{EQUP} &= 20.00 - 16.78 \\
> > &= 3.22
> > \end{align*}
> > $$
> > The equity is positive but below the proposed \$3.60 million, so the DPAE is written down to \$3.22 million and there is no premium deficiency. At an expected loss ratio of 95%, the same steps give premium liabilities of \$21.10 million and an equity of -\$1.10 million. The DPAE then goes to zero and a premium deficiency of \$1.10 million is carried.

> [!example]- Moving a Future Accident Year to the UPR {Example}
> Discounted at 4% on the claim payment pattern, a future accident year's losses have a present value factor of $0.9250$ at the valuation date. Find the factor for the losses in the UPR of annual policies, and of six-month policies, both written evenly.
>
> > [!answer]-
> > For six-month policies, the exposure left declines linearly over half a year, so the average accident date is one-third of six months, or $1/6$ of a year. Each factor is moved from the future accident year's date of $1/2$ to the UPR's date.
> > $$
> > \begin{align*}
> > \text{Annual} &= 0.9250 \times 1.04^{1/2 - 1/3} \\
> > &= 0.9311 \\
> > \text{Six-month} &= 0.9250 \times 1.04^{1/2 - 1/6} \\
> > &= 0.9372
> > \end{align*}
> > $$
> > The UPR's losses happen sooner than a future accident year's, so they are discounted less, and shorter policies are discounted less still.

> [!tip]- How it appears on the exam
> - **GI-301:** The first objective asks for the purpose of premium liabilities: an adequacy test of the unearned premium, the cap on deferred acquisition expenses and the premium deficiency. The second asks candidates to calculate them, building future claims, adjustment expenses, maintenance expenses, discounting and margins from given assumptions. The readings apply the calculation to an insurer and to a captive, so expect the inputs to come from a case study's exhibits.

> [!warning]- Exam traps
> - **The wrong average accident date:** Discounting the UPR's losses from the middle of the year treats them as a future accident year. For annual policies written evenly the date is one-third of a year out, and for six-month policies it is one-sixth.
> - **Deficiency or write-down:** A positive equity below the proposed DPAE is a DPAE write-down, not a premium deficiency. A deficiency exists only when the equity is negative, and the booked DPAE is then zero.
> - **Maintenance on the wrong base:** Maintenance expenses are a share of general expenses applied to the gross UPR. Applying the full general expense ratio, or adding acquisition costs that are already prepaid in the DPAE, double-counts them.
> - **Reinsurance on a net basis:** On a non-proportional treaty, the cost of reinsurance for the unexpired coverage is taken off the UPR before the loss ratio is applied and is carried as its own item. Leaving it out overstates the equity.
