---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:fd1dd4e86754b79f583ba01dc9a8f680defa06f5051d8db21814434ffe4305c8
  sources:
    - "ISO CR 00 21 11 15 Commercial Crime Coverage Form (Loss Sustained Form), A.1-6 insuring agreements; D.1 Acts Committed By You, Indirect Loss; D.2.a Inventory Shortages; E.1.g extended period (one year); E.1.k-l prior insurance; E.2.a termination as to any employee; F 'occurrence', sha256:6d33044bc7a0ef1cb11e32f01b65c5f712091d24aad8fb459d085141fdb5f803 — https://forms.nationwideexcessandsurplus.com/FormsExternal/ContractForm?num=CR+00+21&ed=11-15"
    - "FC&S (PropertyCasualty360), 'Commercial Crime Coverage Form' (CR 00 20 / CR 00 21 11 15), 2018, discovery vs loss sustained; 60-day extended period; voluntary parting exclusion; occurrence, sha256:d520566b166dd312a68ed13a51865c385dc63bf00f8149fe62c2ada084366efe — https://propertycasualty360.com/fcs/2018/07/09/commercial-crime-coverage-form"
    - "Case IQ, 'Combatting Workplace Fraud Through Internal Controls', entry, sha256:7bf97d2dd417d551eed40fd9a1818dde76af26ec2e6d8d297e6b9d48daae2200 — https://www.caseiq.com/resources/combatting-workplace-fraud-through-internal-controls"
    - "GRF CPAs & Advisors, 'Steps for Preventing Employee Fraud in Your Organization', entry, sha256:0729972031647ead412cb975486b5ffd76df5d093fe8e727c2a66d3e64b49be7 — https://www.grfcpa.com/resource/steps-for-preventing-employee-fraud-in-your-organization/"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Commercial Crime Insurance.md
---
**Commercial Crime Insurance** covers a business's loss of money, securities and other property to crimes such as theft by its employees, forgery, robbery, burglary and computer fraud. These losses are excluded or limited under [[Commercial Property Insurance|commercial property]] forms. In the U.S. it is usually written on ISO commercial crime forms, which offer a menu of insuring agreements, each with its own limit:

| Insuring agreement | What it covers |
| :--- | :--- |
| Employee theft | Theft of money, securities and other property by an employee, whether or not the employee is identified, acting alone or in collusion with others |
| Forgery or alteration | Forgery or alteration of checks, drafts and similar instruments drawn on the insured's account or by someone impersonating the insured |
| Inside the premises | Theft, disappearance or destruction of money and securities on the premises or in a bank, and robbery or safe burglary of other property |
| Outside the premises | Money, securities and other property while being conveyed by a messenger or an armored car company |
| Computer fraud | Use of a computer to fraudulently transfer property from the premises or a bank |
| Funds transfer fraud | Fraudulent instructions to the insured's bank to transfer funds |

Coverage for an employee ends as soon as an insured, other than one in collusion with that employee, learns of any theft or dishonest act the employee has committed, even one before employment.

Many losses today come from social engineering, in which an employee is tricked into sending a payment. The standard computer and funds transfer fraud agreements may not cover them, because the employee made the transfer voluntarily. That gap is closed by endorsement or by [[Cyber Insurance|cyber insurance]].

## Discovery and loss-sustained forms

The forms are written on either a discovery basis or a loss-sustained basis. The two bases differ in which policy pays for a theft that went on for years before anyone noticed it:

| | Discovery form | Loss-sustained form |
| :--- | :--- | :--- |
| Loss covered | Discovered during the policy period, however long ago it happened, unless the policy carries a retroactive date | Occurs during the policy period and is discovered within one year after it ends |
| After the policy ends | A short period to discover loss sustained before it ended | One year to discover loss that occurred in the period |
| Earlier losses | Covered back to the retroactive date, if any | Picked up by the prior-insurance conditions when the insured has had continuous crime coverage without a gap |

For one occurrence, the insurer pays

> $$\text{Paid} = \min\left(\max(X - d,\ 0),\ C\right)$$

- $X$ is the covered loss from the occurrence.
- $d$ is the deductible.
- $C$ is the limit of the insuring agreement that applies.

For employee theft, all loss caused by one person, or in which one person is involved, counts as a single occurrence, whether it came from one act or a series of acts over years.

> [!example]- What does the insurer pay for six years of embezzlement under each of these three forms? {Example}
> A bookkeeper stole $\$27{,}000$ a year for six years by paying invoices from a fictitious supplier. The theft is discovered during the current policy year. The employee theft coverage has a $\$100{,}000$ limit and a $\$5{,}000$ deductible. The current policy is one of:
>
> - (a) a discovery form with no retroactive date;
> - (b) a discovery form with a retroactive date three years before discovery;
> - (c) a loss-sustained form, with no earlier crime insurance in force.
>
> > [!answer]-
> > - All six years of theft were committed by one person, so they are one occurrence, and the deductible applies once.
> > - (a) The whole loss, $6 \times 27{,}000 = \$162{,}000$, is discovered in the period, so the form pays $\min(157{,}000,\ 100{,}000) = \$100{,}000$.
> > - (b) The retroactive date removes the theft before it, so the form pays $3 \times 27{,}000 - 5{,}000 = \$76{,}000$.
> > - (c) Only the current year's theft occurred in a period covered by a crime policy, so the form pays $27{,}000 - 5{,}000 = \$22{,}000$.

## Exclusions

The forms exclude theft by the named insured or its partners and members, indirect loss such as income lost while the business recovers, and a loss whose existence or amount is proved only by an inventory or profit-and-loss computation. Inventory records can still prove the amount once a theft has been established.

## Underwriting commercial crime

Employee theft is controlled by the insured's [[Internal Control|internal controls]] more than by anything the insurer does. Underwriters ask about separation of duties, so that no one both handles cash and records it, dual signatures on large payments, reconciliations by someone other than the bookkeeper, regular external audits, background checks and mandatory vacations.

The financial condition of the business and the character of its management matter, because financial pressure on owners or employees raises the chance of theft ([[Moral Hazard]]). For robbery and burglary, the amount of money kept on hand, the neighborhood, safes, alarms and guards drive the exposure. These physical protections guard against outsiders, not against employees who have legitimate access to the money and other property. For computer and funds transfer fraud, the key controls are callback verification of payment instructions and limits on who can release funds.

> [!trap] Applying the limit to each year of a theft
> A series of thefts by the same employee over several years is one occurrence, subject to one limit and one deductible. Applying the limit to each year overstates the recovery.
