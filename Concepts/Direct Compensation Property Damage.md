---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4933b3e2cbabf76ae9ba44a1ea609f9042b8d484bae71f3f105b907f859f501c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Direct Compensation Property Damage.md
---
![[Media/Figures/Direct_Compensation_Property_Damage.svg|340]]

**Direct Compensation Property Damage** (DCPD) is the coverage under which an insured's own insurer pays for damage to the insured's vehicle caused by another driver, to the extent that other driver was at fault. It replaces the tort claim against the at-fault driver's insurer with a first-party claim, and it is compulsory in Ontario, Quebec and several other provinces.

Before the insured's own [[Deductible|deductible]], the DCPD recovery is

> $$\text{DCPD recovery} = \text{Damage} \times \bigl(1 - \text{Insured's degree of fault}\bigr)$$

- $\text{Damage}$ is the damage to the insured's own vehicle.
- The insured's degree of fault is set by the [[Fault Determination Rules]].

DCPD does not ignore who caused the collision. Fault is determined mechanically, and a driver $50\%$ at fault recovers $50\%$ of their damage. It is the right to sue that is removed, not the concept of fault.

> [!example]- What does each insurer pay under DCPD, and how does that compare with tort? {Example}
> Driver X, insured by Insurer 1, and Driver Y, insured by Insurer 2, collide. Under the [[Fault Determination Rules]], X is $25\%$ at fault and Y is $75\%$ at fault. Both carry $\$500$ DCPD deductibles.
>
> | Driver | Insurer | Fault | Damage to own vehicle |
> | :--- | :--- | ---: | ---: |
> | X | Insurer 1 | $25\%$ | $\$12{,}000$ |
> | Y | Insurer 2 | $75\%$ | $\$8{,}000$ |
>
> > [!answer]-
> > - Insurer 1 pays X $0.75 \times \$12{,}000 - \$500 = \$8{,}500$.
> > - Insurer 2 pays Y $0.25 \times \$8{,}000 - \$500 = \$1{,}500$.
> > - No money moves between the insurers. X bears $25\%$ of their own damage plus the deductible, and Y bears $75\%$ plus the deductible.
> > - Under tort, X would recover $\$9{,}000$ from Insurer 2 and Y $\$2{,}000$ from Insurer 1, through two liability claims, two adjusters negotiating fault, possible litigation and an inter-company transfer.
> > - The compensation is nearly the same, and DCPD saves the friction cost.
> > - Insurer 1's loss experience records the $\$8{,}500$ of damage to its own insured's vehicle, not the $\$2{,}000$ its insured caused.

## Advantages and disadvantages

Property damage liability claims are numerous, individually small and factually simple. Under tort, each one still requires two insurers to negotiate liability and transfer money. DCPD removes the transfer, because each insurer pays its own policyholder and the payments net out across the industry.

| Advantages | Disadvantages |
| :--- | :--- |
| Much lower adjusting and legal expense | The at-fault driver's insurer pays nothing for the damage it caused, so the price signal is muted at the insurer level |
| Faster payment, because the insured deals with their own insurer | An insurer with a book of good drivers pays for damage caused by other insurers' bad drivers |
| The insured's own deductible and coverage terms govern | |
| No need to pursue an underinsured or uncooperative third party | |

The price signal is not muted at the driver level, since fault still affects the driver's rating.

## Rating DCPD

DCPD experience reflects the cost of repairing the insured's own vehicles, not the vehicles its policyholders hit. So DCPD rating relativities depend on the insured vehicle, and an insurer writing expensive vehicles has a high DCPD cost however carefully its policyholders drive.

Some provinces permit a DCPD deductible option. Alberta introduced DCPD in 2022, and the direction across Canada has been toward it.

> [!trap] Rating DCPD on the vehicles the insured might hit
> Under tort, a driver's insurer pays for the other car. Under DCPD, it pays for its own insured's car, so a high-value insured vehicle drives the DCPD cost.
