---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:17613bfe1a207911d9c6a311b93305dd246176d4503ad9a760afd1be69de7737
  sources:
    - "ISO CR 00 21 11 15 Commercial Crime Coverage Form (Loss Sustained Form), A.1-6 insuring agreements; D.1 Acts Committed By You, Indirect Loss; D.2.a Inventory Shortages; E.1.g extended period (one year); E.1.k-l prior insurance; E.2.a termination as to any employee; F 'occurrence', sha256:6d33044bc7a0ef1cb11e32f01b65c5f712091d24aad8fb459d085141fdb5f803 — https://forms.nationwideexcessandsurplus.com/FormsExternal/ContractForm?num=CR+00+21&ed=11-15"
    - "FC&S (PropertyCasualty360), 'Commercial Crime Coverage Form' (CR 00 20 / CR 00 21 11 15), 2018, discovery vs loss sustained; 60-day extended period; voluntary parting exclusion; occurrence, sha256:d520566b166dd312a68ed13a51865c385dc63bf00f8149fe62c2ada084366efe — https://propertycasualty360.com/fcs/2018/07/09/commercial-crime-coverage-form"
    - "Case IQ, 'Combatting Workplace Fraud Through Internal Controls', entry, sha256:7bf97d2dd417d551eed40fd9a1818dde76af26ec2e6d8d297e6b9d48daae2200 — https://www.caseiq.com/resources/combatting-workplace-fraud-through-internal-controls"
    - "GRF CPAs & Advisors, 'Steps for Preventing Employee Fraud in Your Organization', entry, sha256:0729972031647ead412cb975486b5ffd76df5d093fe8e727c2a66d3e64b49be7 — https://www.grfcpa.com/resource/steps-for-preventing-employee-fraud-in-your-organization/"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Commercial Crime Insurance.md
---

**Commercial Crime Insurance** covers a business's loss of money, securities and other property to crimes such as theft by its employees, forgery, robbery, burglary and computer fraud. These losses are excluded or limited under [[Commercial Property Insurance|commercial property]] forms. In the U.S. it is usually written on ISO commercial crime forms, which offer a menu of insuring agreements, each with its own limit, on either a discovery basis or a loss-sustained basis. The two bases differ in which policy pays for a theft that went on for years before anyone noticed it.

> $$\text{Discovery: } t_s \le t_D \le t_e$$

> $$\text{Loss sustained: } t_s \le t_O \le t_e,\ \ t_D \le t_e + 1 \text{ yr}$$

> $$\text{Paid} = \min\left(\max(X - d,\ 0),\ C\right)$$

- **Symbols:** $t_s$ and $t_e$ are the start and end of the policy period, $t_O$ is when the loss occurred and $t_D$ is when it was discovered. $X$ is the covered loss from one occurrence, $d$ is the deductible and $C$ is the limit of the insuring agreement that applies. For employee theft, all loss caused by one person, or in which one person is involved, counts as a single occurrence, whether it came from one act or a series of acts over years.
- **Employee theft:** This agreement covers theft of money, securities and other property by an employee, whether or not the employee is identified, acting alone or in collusion with others. Coverage for an employee ends as soon as an insured, other than one in collusion with that employee, learns of any theft or dishonest act the employee has committed, even one before employment.
- **Forgery or alteration:** This covers loss from forgery or alteration of checks, drafts and similar instruments drawn on the insured's account or by someone impersonating the insured.
- **Inside and outside the premises:** The inside the premises agreements cover theft, disappearance or destruction of money and securities on the premises or in a bank, and robbery or safe burglary of other property. The outside the premises agreement covers money, securities and other property while being conveyed by a messenger or an armored car company.
- **Computer and funds transfer fraud:** These cover loss from the use of a computer to fraudulently transfer property from the premises or a bank, and from fraudulent instructions to the insured's bank to transfer funds. Many losses today come from social engineering, in which an employee is tricked into sending a payment, and the standard agreements may not cover them because the employee made the transfer voluntarily. That gap is closed by endorsement or by [[Cyber Insurance|cyber insurance]].
- **Discovery versus loss sustained:** A discovery form pays for loss discovered during the policy period, however long ago it happened, unless the policy carries a retroactive date. It also allows a short period after the policy ends to discover loss sustained before it ended. A loss-sustained form pays for loss that occurs during the policy period and is discovered within one year after it ends. Its prior-insurance conditions let it pick up an earlier loss when the insured has had continuous crime coverage without a gap.
- **Exclusions:** The forms exclude theft by the named insured or its partners and members, indirect loss such as income lost while the business recovers, and a loss whose existence or amount is proved only by an inventory or profit-and-loss computation. Inventory records can still prove the amount once a theft has been established.
- **Internal controls:** Employee theft is controlled by the insured's [[Internal Control|internal controls]] more than by anything the insurer does. Underwriters ask about separation of duties, so that no one both handles cash and records it, dual signatures on large payments, reconciliations by someone other than the bookkeeper, regular external audits, background checks and mandatory vacations.
- **Moral hazard and other factors:** The financial condition of the business and the character of its management matter, because financial pressure on owners or employees raises the chance of theft ([[Moral Hazard]]). For robbery and burglary, the amount of money kept on hand, the neighborhood, safes, alarms and guards drive the exposure. For computer and funds transfer fraud, the key controls are callback verification of payment instructions and limits on who can release funds.

> [!example]- Six Years of Embezzlement Under a Discovery Form {Example}
> A bookkeeper at a distribution company stole \$27,000 a year for six years by paying invoices from a fictitious supplier. The theft is discovered during the current policy year. The company's employee theft coverage has a \$100,000 limit and a \$5,000 deductible. What does the insurer pay if the current policy is (a) a discovery form with no retroactive date, (b) a discovery form with a retroactive date three years before discovery, or (c) a loss-sustained form with no earlier crime insurance in force?
>
> > [!answer]-
> > All six years of theft were committed by one person, so they are one occurrence, and the deductible applies once.
> > $$
> > \begin{align*}
> > X &= 6 \times 27{,}000 \\
> > &= 162{,}000 \\
> > \text{Paid}_{(a)} &= \min(162{,}000 - 5{,}000,\ 100{,}000) \\
> > &= 100{,}000 \\
> > \text{Paid}_{(b)} &= \min(3 \times 27{,}000 - 5{,}000,\ 100{,}000) \\
> > &= 76{,}000 \\
> > \text{Paid}_{(c)} &= \min(27{,}000 - 5{,}000,\ 100{,}000) \\
> > &= 22{,}000
> > \end{align*}
> > $$
> > The discovery form without a retroactive date pays the full limit, because the whole loss is discovered in the period. The retroactive date removes the theft from before it. The loss-sustained form pays only for the theft in the current year, because the earlier years were not covered by any crime policy. The limit is far below the loss in (a), and an underwriter would look at whether the company's controls let one bookkeeper both create and pay suppliers.

> [!tip]- How it appears on the exam
> - **DISC-RM:** Questions ask what an underwriter evaluates for commercial crime: the insured's internal controls and audits, the character and financial condition of its management, the money and property exposed, and its physical protection. Others ask how the insuring agreements differ, or which form, discovery or loss sustained, pays for a theft that occurred over several policy periods.

> [!warning]- Exam traps
> - **One thief, one occurrence:** A series of thefts by the same employee over several years is one occurrence, subject to one limit and one deductible. Applying the limit to each year overstates the recovery.
> - **Discovery, not occurrence:** A discovery form pays for old losses found now. A loss-sustained form pays for losses that occur in its period and are found within a year after, so a theft found two years after the policy ended is not covered by it.
> - **Known dishonesty ends coverage:** Once the insured learns that an employee has been dishonest, employee theft coverage for that employee ends, so keeping the employee in a cash-handling role leaves later theft uninsured.
> - **Inventory alone doesn't prove theft:** A shortage found only by comparing inventory records is excluded unless a theft has been established another way.
> - **Being tricked isn't the same as fraud:** An employee who sends money because of a fake email from a supplier made the transfer voluntarily, and the standard computer and funds transfer fraud agreements may not respond.
