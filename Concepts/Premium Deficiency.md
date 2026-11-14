---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6fe5a6efcf298c00a7c863750c7e996d93c4dfedc428836858daee5d02849826
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Premium Deficiency.md
---
A **Premium Deficiency** was the liability a Canadian P&C insurer carried, under the pre-[[IFRS 17]] framework, when the net policy liabilities in connection with [[Unearned Premium|unearned premium]] exceeded the net unearned premium reserve plus unearned reinsurance commissions. The premium not yet earned could not pay the future claims and expenses of the policies in force.

The test is made on the **equity in the unearned premium** (EQUP), which is

> $$\text{EQUP} = \text{UPR}_{\text{net}} + \text{UC} - \text{PL}_{\text{net}}$$

- $\text{UPR}_{\text{net}}$ is the net unearned premium reserve.
- $\text{UC}$ is the unearned reinsurance commissions.
- $\text{PL}_{\text{net}}$ is the net policy liabilities in connection with unearned premium.

A premium deficiency is the negative side of EQUP, so the deficiency is

> $$\text{Premium deficiency} = \max(0,\ -\text{EQUP})$$

The positive side of EQUP caps the [[Deferred Policy Acquisition Expenses|deferred policy acquisition expenses]] (DPAE), so the maximum DPAE is

> $$\text{Maximum DPAE} = \max(0,\ \text{EQUP})$$

The test is off the current syllabus. IFRS 17's [[Onerous Contract|onerous-contract]] test and its [[Loss Component|loss component]] replaced it.

## Net policy liabilities in connection with unearned premium

$\text{PL}_{\text{net}}$ is the actuarial present value of future claims and adjustment expenses on the unexpired portion of in-force policies, plus expected reinsurance costs for contracts not yet underwritten, plus maintenance expenses for servicing the policies in force. The published answers also include contingent commissions payable on the business. They build it in four steps:

1. Start from the net UPR less the expected reinsurance cost, apply the expected loss ratio and add ULAE. The reinsurance cost goes back in as its own item.
2. Discount on the claim-liability payment pattern, moved to the UPR's average accident date. For annual policies written evenly, that date is one-third of a year after the valuation date, against one-half for a future accident year, so the accident-year factor is multiplied by $(1+i)^{1/2 - 1/3}$. The median accident date, $0.2929$ years, was also accepted as an approximation.
3. Add the [[Margin for Adverse Deviations|PfADs]]. The claims development PfAD is its MfAD times the net PV. The reinsurance recovery PfAD is its MfAD times the gross PV less the net PV. The investment return PfAD is the PV at the discount rate less its MfAD, minus the PV at the full rate. These MfADs may differ from those on claim liabilities, and the standards expect them to where the uncertainty differs.
4. Add maintenance expenses, a share of general expenses usually taken as a percentage of **gross** UPR. Maintenance expenses and reinsurance costs are generally left undiscounted. The CIA note calls their time value "not generally material", and examiner's reports count discounting maintenance expenses as an error unless the question supplies a factor for it.

> [!example]- What is this insurer's premium deficiency? {Example}
> At December 31 (amounts in $\$000$s), net UPR is $50{,}000$, gross UPR $56{,}000$ and expected reinsurance costs $4{,}000$. The net and gross undiscounted loss and ALAE ratio is 95%, and expected ULAE is $2{,}000$, none of it ceded.
>
> An accident year pays 50%, 35% and 15% of its losses in its first three years, at mid-year. The discount rate is 3%. The MfADs are 8% for claims development, 1% for reinsurance recovery and 0.5% for investment return.
>
> Maintenance expenses are 3% of gross UPR, unearned reinsurance commissions are $1{,}200$, and the proposed DPAE is $6{,}000$.
>
> > [!answer]-
> > - Net undiscounted losses and LAE are $(50{,}000 - 4{,}000)(0.95) + 2{,}000 = 45{,}700$.
> > - Gross undiscounted losses and LAE are $56{,}000(0.95) + 2{,}000 = 55{,}200$.
> > - At 3%, a future accident year's factor is $0.50(1.03)^{-0.5} + 0.35(1.03)^{-1.5} + 0.15(1.03)^{-2.5} = 0.9668$.
> > - Moved to the UPR's average accident date, it is $0.9668 \times 1.03^{1/6} = 0.9716$.
> > - At $3\% - 0.5\% = 2.5\%$ the same steps give $0.9722 \times 1.025^{1/6} = 0.9762$.
> > - The net PV is $45{,}700(0.9716) = 44{,}402.1$ and the gross PV is $55{,}200(0.9716) = 53{,}632.3$.
> > - The claims development PfAD is $0.08(44{,}402.1) = 3{,}552.2$.
> > - The reinsurance recovery PfAD is $0.01(53{,}632.3 - 44{,}402.1) = 92.3$.
> > - The investment return PfAD is $45{,}700(0.9762 - 0.9716) = 210.2$.
> > - The actuarial present value is $44{,}402.1 + 3{,}552.2 + 92.3 + 210.2 = 48{,}256.8$.
> > - Adding reinsurance costs and maintenance, $\text{PL}_{\text{net}} = 48{,}256.8 + 4{,}000 + 0.03(56{,}000) = 53{,}936.8$.
> > - $\text{EQUP} = 50{,}000 + 1{,}200 - 53{,}936.8 = -2{,}736.8$.
> > - The DPAE of $6{,}000$ is written off entirely and a premium deficiency of $2{,}736.8$ is booked.
> > - Without PfADs, EQUP would be $51{,}200 - 50{,}082.1 = +1{,}117.9$. The $3{,}854.7$ of PfADs turn a thin positive equity into a deficiency.

## Comparing EQUP with the proposed DPAE

EQUP is compared with the DPAE the accounting department proposes, with three outcomes:

| EQUP | Booked DPAE | Premium deficiency |
| :--- | :--- | :--- |
| $\text{EQUP} \geq \text{DPAE}$ | The proposed DPAE | None |
| $0 \leq \text{EQUP} < \text{DPAE}$ | Written down to EQUP | None |
| $\text{EQUP} < 0$ | Zero | $-\text{EQUP}$, carried as a liability (page 20.20 of the old P&C-1) |

A premium deficiency and a positive booked DPAE therefore never coexist. Together, UPR plus deficiency less booked DPAE equals the larger of UPR less the proposed DPAE and $\text{PL}_{\text{net}} - \text{UC}$. The CIA's IFRS 17 comparison note describes old P&C practice the same way: "the higher of UEP less DAC and the explicit valuation".

> [!example]- Does this insurer write down its DPAE or book a premium deficiency? {Example}
> At December 31 (amounts in $\$000$s):
>
> | Line | Net UPR | Undiscounted loss ratio | Discount factor |
> | :--- | ---: | ---: | ---: |
> | Auto | 40,000 | 80% | 0.95 |
> | Property | 15,000 | 62% | 0.96 |
> | Facility Association | 3,000 | 110% | 0.95 |
>
> Internal adjustment expenses (IAE) are 10% of discounted losses, maintenance expenses 5% of UPR and contingent commissions 2% of UPR. None of the three applies to Facility Association business. Unearned reinsurance commissions are $500$ and the accounting department proposes a DPAE of $9{,}000$. Answer for these figures, and again with the auto loss ratio revised to 102%.
>
> > [!answer]-
> > - Discounted losses are $40{,}000(0.80)(0.95) = 30{,}400$ for auto, $15{,}000(0.62)(0.96) = 8{,}928$ for property and $3{,}000(1.10)(0.95) = 3{,}135$ for Facility Association.
> > - IAE is $0.10(30{,}400 + 8{,}928) = 3{,}932.8$, maintenance $0.05(55{,}000) = 2{,}750$ and contingent commissions $0.02(55{,}000) = 1{,}100$.
> > - $\text{PL}_{\text{net}}$ is the sum, $50{,}245.8$.
> > - $\text{EQUP} = 58{,}000 + 500 - 50{,}245.8 = 8{,}254.2$, positive but below the proposed $9{,}000$.
> > - The DPAE is written down by $745.8$ to $8{,}254.2$, and there is no premium deficiency.
> > - At 102%, auto losses become $40{,}000(1.02)(0.95) = 38{,}760$ and IAE becomes $0.10(38{,}760 + 8{,}928) = 4{,}768.8$.
> > - $\text{PL}_{\text{net}}$ becomes $59{,}441.8$, so $\text{EQUP} = 58{,}500 - 59{,}441.8 = -941.8$.
> > - The DPAE goes to zero and a premium deficiency of $941.8$ is carried as a liability.
> > - The booked DPAE falls by $8{,}254.2$ and a $941.8$ liability appears, $9{,}196$ in all, which is exactly the increase in $\text{PL}_{\text{net}}$.

## Net basis and all lines combined

Financial statements reported the deficiency on a net basis only, though the gross equity could be discussed with management. EQUP was usually computed for all lines combined, so deficiencies in some lines were offset by redundancies in others. That is reasonable for a going concern whose mix is stable. Done by line, one line can show a deficiency beside a partially offsetting DPAE on others.

[[Facility Association]] business enters with its premium and losses, but the published answers charge it no maintenance expense, internal adjustment expense or commission. A fall in the discount rate raises the premium liabilities and lowers the maximum DPAE, and can create a deficiency.

## The IFRS 17 replacement

Under IFRS 17, in force in Canada from January 1, 2023, most P&C contracts can use the [[Premium Allocation Approach|premium allocation approach]]. A group is presumed not onerous unless facts and circumstances indicate otherwise. When they do, the [[Liability for Remaining Coverage|liability for remaining coverage]] is compared with the [[Fulfilment Cash Flows|fulfilment cash flows]] for remaining coverage (IFRS 17.57). Those cash flows include the [[Risk Adjustment for Non-Financial Risk|risk adjustment]] in place of PfADs. The excess is a loss component, recognised in profit or loss. The test is applied group by group rather than across all lines combined.

> [!trap] Booking a deficiency when EQUP is positive
> When EQUP is positive but below the proposed DPAE, the DPAE is written down to EQUP and there is no premium deficiency. Examiners marked it wrong to book the shortfall as a deficiency.
