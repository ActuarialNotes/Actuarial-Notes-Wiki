---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:cc386f4ff4878af8066a4b946ca1596507be60463cbea3b307d445d26ec4ccf8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Premium Deficiency.md
---

**A Premium Deficiency** was the liability a Canadian P&C insurer carried, under the pre-[[IFRS 17]] framework, when the net policy liabilities in connection with [[Unearned Premium|unearned premium]] exceeded the net unearned premium reserve plus unearned reinsurance commissions. In other words, the premium not yet earned could not pay the future claims and expenses of the policies in force. It is the negative side of the **equity in the unearned premium** (EQUP), whose positive side capped the [[Deferred Policy Acquisition Expenses]]. The test is off the current syllabus: IFRS 17's [[Onerous Contract|onerous-contract]] test and its [[Loss Component]] replaced it.

> $$\text{EQUP} = \text{UPR}_{\text{net}} + \text{UC} - \text{PL}_{\text{net}}$$
>
> $$\text{Premium deficiency} = \max(0,\ -\text{EQUP})$$
>
> $$\text{Maximum DPAE} = \max(0,\ \text{EQUP})$$

- **The symbols.** $\text{UPR}_{\text{net}}$ is the net unearned premium reserve and $\text{UC}$ the unearned reinsurance commissions. $\text{PL}_{\text{net}}$ is the net policy liabilities in connection with unearned premium: the actuarial present value of future claims and adjustment expenses on the unexpired portion of in-force policies, plus expected reinsurance costs for contracts not yet underwritten, plus maintenance expenses for servicing the policies in force. The published answers also include contingent commissions payable on the business.
- **How $\text{PL}_{\text{net}}$ is built**, following the published answers:
  - Start from the net UPR less the expected reinsurance cost, apply the expected loss ratio and add ULAE. The reinsurance cost goes back in as its own item.
  - Discount on the claim-liability payment pattern, moved to the UPR's average accident date. For annual policies written evenly, that date is one-third of a year after the valuation date, against one-half for a future accident year, so the accident-year factor is multiplied by $(1+i)^{1/2 - 1/3}$. The median accident date, $0.2929$ years, was also accepted as an approximation.
  - Add the [[Margin for Adverse Deviations|PfADs]]. Claims development is its MfAD times the net PV. Reinsurance recovery is its MfAD times gross PV less net PV. Investment return is the PV at the discount rate less its MfAD, minus the PV at the full rate. These MfADs may differ from those on claim liabilities, and the standards expect them to where the uncertainty differs.
  - Maintenance expenses are a share of general expenses, usually taken as a percentage of **gross** UPR. They and reinsurance costs are generally left undiscounted: the CIA note calls their time value "not generally material", and examiner's reports count discounting maintenance expenses as an error unless the question supplies a factor for it.
- **Three outcomes**, comparing EQUP with the DPAE the accounting department proposes:
  - EQUP $\geq$ DPAE: nothing changes.
  - $0 \leq$ EQUP $<$ DPAE: the DPAE is written down to EQUP and there is **no** premium deficiency. Examiners marked it wrong to book the shortfall as a deficiency.
  - EQUP $< 0$: the DPAE goes to zero and a premium deficiency of $-\text{EQUP}$ is carried as a liability (page 20.20 of the old P&C-1). A premium deficiency and a positive booked DPAE therefore never coexist.
  - Together, UPR plus deficiency less booked DPAE equals the larger of UPR less the proposed DPAE and $\text{PL}_{\text{net}} - \text{UC}$. The CIA's IFRS 17 comparison note describes old P&C practice the same way: "the higher of UEP less DAC and the explicit valuation".
- **Net, and all lines combined.** Financial statements reported the deficiency on a net basis only, though the gross equity could be discussed with management. EQUP was usually computed for all lines combined, so deficiencies in some lines were offset by redundancies in others. That is reasonable for a going concern whose mix is stable. Done by line, one line can show a deficiency beside a partially offsetting DPAE on others. [[Facility Association]] business enters with its premium and losses, but the published answers charge it no maintenance expense, internal adjustment expense or commission. A fall in the discount rate raises the premium liabilities and lowers the maximum DPAE, and can create a deficiency.
- **What replaced it.** Under IFRS 17, in force in Canada from January 1, 2023, most P&C contracts can use the [[Premium Allocation Approach|PAA]]:
  - A group is presumed not onerous unless facts and circumstances indicate otherwise.
  - When they do, the [[Liability for Remaining Coverage|LRC]] is compared with the [[Fulfilment Cash Flows|fulfilment cash flows]] for remaining coverage (IFRS 17.57). Those cash flows include the [[Risk Adjustment for Non-Financial Risk|risk adjustment]] in place of PfADs.
  - The excess is a [[Loss Component]], recognised in profit or loss.
  - The LRC is measured, and the test applied, **group by group** rather than across all lines combined.

> [!example]- Write Down or Book a Deficiency? {Example}
> An insurer has the following at December 31 (all amounts in \$000s):
>
> | Line | Net UPR | Undiscounted loss ratio | Discount factor |
> |---|---|---|---|
> | Auto | 40,000 | 80% | 0.95 |
> | Property | 15,000 | 62% | 0.96 |
> | Facility Association | 3,000 | 110% | 0.95 |
>
> Internal adjustment expenses are $10\%$ of discounted losses, maintenance expenses $5\%$ of UPR and contingent commissions $2\%$ of UPR. None of the three applies to Facility Association business. Unearned reinsurance commissions are $500$ and the accounting department proposes a DPAE of $9{,}000$.
>
> (a) Determine the booked DPAE and any premium deficiency.
>
> (b) Repeat with the auto loss ratio revised to $102\%$.
>
> > [!answer]-
> > **(a)** Discounted losses are $40{,}000(0.80)(0.95) = 30{,}400$ for auto, $15{,}000(0.62)(0.96) = 8{,}928$ for property and $3{,}000(1.10)(0.95) = 3{,}135$ for Facility Association. The expense items apply to the voluntary lines only:
> >
> > $$
> > \begin{align*}
> > \text{IAE} &= 0.10\,(30{,}400 + 8{,}928) \\
> > &= 3{,}932.8 \\
> > \text{Maintenance} &= 0.05\,(55{,}000) \\
> > &= 2{,}750 \\
> > \text{Contingent commissions} &= 0.02\,(55{,}000) \\
> > &= 1{,}100
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{PL}_{\text{net}} &= 30{,}400 + 8{,}928 + 3{,}135 + 3{,}932.8 + 2{,}750 + 1{,}100 \\
> > &= 50{,}245.8 \\
> > \text{EQUP} &= 58{,}000 + 500 - 50{,}245.8 \\
> > &= 8{,}254.2
> > \end{align*}
> > $$
> >
> > EQUP is positive but below the proposed $9{,}000$. The DPAE is **written down by $745.8$ to $8{,}254.2$**, and there is **no premium deficiency**.
> >
> > **(b)** Auto losses become $40{,}000(1.02)(0.95) = 38{,}760$:
> >
> > $$
> > \begin{align*}
> > \text{IAE} &= 0.10\,(38{,}760 + 8{,}928) \\
> > &= 4{,}768.8 \\
> > \text{PL}_{\text{net}} &= 38{,}760 + 8{,}928 + 3{,}135 + 4{,}768.8 + 2{,}750 + 1{,}100 \\
> > &= 59{,}441.8 \\
> > \text{EQUP} &= 58{,}500 - 59{,}441.8 \\
> > &= -941.8
> > \end{align*}
> > $$
> >
> > EQUP is negative, so the **DPAE goes to zero and a premium deficiency of $941.8$** is carried as a liability.
> >
> > Against part (a), the booked DPAE falls by $8{,}254.2$ and a $941.8$ liability appears. Together that is $9{,}196$, exactly the increase in $\text{PL}_{\text{net}}$. The deficiency is only what the deferred expenses could not absorb.

> [!example]- Premium Deficiency from First Principles {Example}
> At December 31 (amounts in \$000s): net UPR $50{,}000$, gross UPR $56{,}000$, expected reinsurance costs $4{,}000$, and a net and gross undiscounted loss and ALAE ratio of $95\%$. Expected ULAE is $2{,}000$, none of it ceded.
>
> An accident year pays $50\%$, $35\%$ and $15\%$ of its losses in its first three years, at mid-year. The discount rate is $3\%$. The MfADs are $8\%$ for claims development, $1\%$ for reinsurance recovery and $0.5\%$ for investment return.
>
> Maintenance expenses are $3\%$ of gross UPR, unearned reinsurance commissions are $1{,}200$, and the proposed DPAE is $6{,}000$. Calculate the premium deficiency.
>
> > [!answer]-
> > **Undiscounted losses and LAE**, deducting the reinsurance cost from the net UPR first:
> >
> > $$
> > \begin{align*}
> > \text{Net} &= (50{,}000 - 4{,}000)(0.95) + 2{,}000 \\
> > &= 45{,}700 \\
> > \text{Gross} &= 56{,}000(0.95) + 2{,}000 \\
> > &= 55{,}200
> > \end{align*}
> > $$
> >
> > **Discount factors.** For a future accident year at $3\%$, $0.50(1.03)^{-0.5} + 0.35(1.03)^{-1.5} + 0.15(1.03)^{-2.5} = 0.9668$. Moving it to the UPR's average accident date gives $0.9668 \times 1.03^{1/6} = 0.9716$. At $2.5\%$ the same steps give $0.9722 \times 1.025^{1/6} = 0.9762$.
> >
> > **Present values and PfADs:**
> >
> > $$
> > \begin{align*}
> > \text{Net PV} &= 45{,}700(0.9716) \\
> > &= 44{,}402.1 \\
> > \text{Gross PV} &= 55{,}200(0.9716) \\
> > &= 53{,}632.3 \\
> > \text{Claims PfAD} &= 0.08(44{,}402.1) \\
> > &= 3{,}552.2 \\
> > \text{Reinsurance PfAD} &= 0.01(53{,}632.3 - 44{,}402.1) \\
> > &= 92.3 \\
> > \text{Investment PfAD} &= 45{,}700(0.9762 - 0.9716) \\
> > &= 210.2
> > \end{align*}
> > $$
> >
> > **Premium liabilities and equity:**
> >
> > $$
> > \begin{align*}
> > \text{APV} &= 44{,}402.1 + 3{,}552.2 + 92.3 + 210.2 \\
> > &= 48{,}256.8 \\
> > \text{PL}_{\text{net}} &= 48{,}256.8 + 4{,}000 + 0.03(56{,}000) \\
> > &= 53{,}936.8 \\
> > \text{EQUP} &= 50{,}000 + 1{,}200 - 53{,}936.8 \\
> > &= -2{,}736.8
> > \end{align*}
> > $$
> >
> > The **DPAE of $6{,}000$ is written off entirely and a premium deficiency of $2{,}736.8$ is booked.**
> >
> > **The margins decide it.** Without PfADs, $\text{PL}_{\text{net}}$ would be $44{,}402.1 + 4{,}000 + 1{,}680 = 50{,}082.1$ and EQUP would be $+1{,}117.9$. The $3{,}854.7$ of PfADs turn a thin positive equity into a deficiency, which is why premium-liability MfADs were chosen with care.
