---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f53436beafe01b44656de7a5ec959dd0eaa34066f85dadc8d49fa21e415bd273
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Direct Compensation Property Damage.md
---

**Direct Compensation Property Damage** (DCPD) is the coverage under which an insured's **own insurer** pays for damage to the insured's vehicle caused by another driver, to the extent that other driver was at fault. It replaces the tort claim against the at-fault driver's insurer with a first-party claim, and it is compulsory in Ontario, Quebec and several other provinces.

> $$\text{DCPD recovery} = \text{Damage} \times \bigl(1 - \text{Insured's degree of fault}\bigr)$$

- **Why it exists.** Property damage liability claims are numerous, individually small, and factually simple, yet under tort each one requires two insurers to negotiate liability and transfer money. DCPD removes the transfer: each insurer pays its own policyholder, and in aggregate the payments net out across the industry.
- **Fault still matters** — DCPD is not "no-fault" in the sense of ignoring who caused the collision. Fault is determined mechanically by the [[Fault Determination Rules]], and a driver $50\%$ at fault recovers $50\%$ of their damage. It is the *right to sue* that is removed, not the fault concept.
- **Advantages:** dramatically lower adjusting and legal expense; faster payment because the insured deals with their own insurer; the insured's own [[Deductible|deductible]] and coverage terms govern, which they chose and understand; no need to pursue an underinsured or uncooperative third party.
- **Disadvantages:** the at-fault driver's insurer pays nothing for the damage it caused, so the **price signal is muted** at the individual insurer level (though not at the driver level, since fault still affects the driver's rating); and an insurer with a book of good drivers pays for damage caused by other insurers' bad drivers.
- **Actuarial effect.** DCPD experience reflects the **cost of the insured's own vehicles**, not the vehicles its policyholders hit. So DCPD rating relativities depend on the insured's vehicle, and an insurer writing expensive vehicles has high DCPD cost regardless of how carefully its policyholders drive.
- Some provinces permit a **DCPD deductible option**, and Alberta introduced DCPD in 2022 — the direction across Canada has been toward it.

> [!example]- Who Pays What {Example}
> Driver X (insured by Insurer 1) and Driver Y (insured by Insurer 2) collide. Under the [[Fault Determination Rules]], X is $25\%$ at fault and Y is $75\%$ at fault. Damage to X's vehicle is $\$12{,}000$; damage to Y's vehicle is $\$8{,}000$. Both carry $\$500$ DCPD deductibles.
>
> Determine the payments under DCPD and compare with tort.
>
> > [!answer]-
> > **Under DCPD**, each insurer pays its own insured, in proportion to the *other* party's fault:
> >
> > $$\begin{align*}
> > \text{Insurer 1 pays X} &= 0.75(\$12{,}000) - \$500 \\
> > &= \$9{,}000 - \$500 = \$8{,}500 \\[6pt]
> > \text{Insurer 2 pays Y} &= 0.25(\$8{,}000) - \$500 \\
> > &= \$2{,}000 - \$500 = \$1{,}500
> > \end{align*}$$
> >
> > No money moves between the insurers. X bears $25\%$ of their own damage plus the deductible; Y bears $75\%$ plus the deductible.
> >
> > **Under tort**, the same net economics would be reached — X recovers $\$9{,}000$ from Insurer 2 and Y recovers $\$2{,}000$ from Insurer 1 — but through two liability claims, two adjusters negotiating fault, potential litigation, and an inter-company transfer. The **compensation is nearly identical; the friction cost is not**, and that difference is the entire case for DCPD.
> >
> > Note where the loss is recorded: under DCPD, Insurer 1's loss experience reflects $\$8{,}500$ of damage to *its own* insured's expensive vehicle, not the $\$2{,}000$ of damage its insured caused. That is why DCPD rating is driven by the insured vehicle's repair cost.
