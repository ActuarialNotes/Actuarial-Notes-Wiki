---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7e22b208b41df1c6c3c78cc64276cf2acb4c18f8640fec4f08a0d54afcd8b6c8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance as a Risk Management Technique.md
---

**Insurance as a risk management technique** is the use of insurance to finance the losses an organization or person cannot avoid or reduce to an acceptable level. It combines two things: [[Risk Transfer|transfer]] of the financial consequences of a loss to an insurer, in return for a premium, and the insurer's *pooling* of many similar exposures, which makes the losses of the group predictable. It fits best the exposures with a low [[Frequency|frequency]] and a high [[Severity|severity]] of loss.

> $$\text{Expected cost per insured} = \frac{n\,p\,s}{n} = p\,s$$

> $$\frac{\sigma}{\mu} = \sqrt{\frac{q}{n\,p}}$$

- **Symbols:** $n$ is the number of similar exposures in the pool, $p$ the probability that one has a loss in the period, $q = 1 - p$, and $s$ the loss when one occurs. The pool's losses are shared through premiums by all members, those with no loss and those with large losses alike, so each pays the expected cost $p\,s$ plus a charge for expenses, profit and the risk of losses exceeding expectations. The relative variation of the pool's number of losses, $\sigma / \mu$, falls as $n$ grows ([[Law of Large Numbers]], [[Risk Classifications]]).
- **How insurance works:** The insured transfers the risk to the insurer; the insurer pools the exposures and forecasts their losses, more accurately as the number grows; and underwriting classifies each exposure with similar ones, so that each pays a premium reflecting its expected loss. Transfer and pooling together reduce risk for society and the anxiety it causes. Insurance does not prevent the event, and it cannot replace sentimental value or the grief of a loss, which cannot be measured in money.
- **When insurance fits:** In the traditional risk management matrix for one exposure, low frequency and high severity point to transfer by insurance; low frequency and low severity to retention; high frequency and low severity to retention with loss control; and high frequency and high severity to avoidance. Insurance is economically feasible when the possible loss is significant to the insured and the premium is small next to it. Insuring frequent small losses would cost a premium large compared with the losses themselves, which is why [[Deductible|deductibles]] retain them. The exposure should also have the characteristics of an [[Insurable Risk|insurable risk]]: many similar units, accidental losses, no catastrophe for the group, definite losses, a calculable loss distribution and a feasible cost.
- **Using insurance in a program:** A risk manager who uses insurance must select the coverages, select the insurer, negotiate the terms, tell the organization what is covered and what records to keep, and review the program periodically. When the budget will not insure everything, coverages are ranked as *essential* (required by law or contract, such as [[Workers Compensation Insurance|workers compensation]], or protecting against a loss that threatens survival), *desirable* (losses that would cause financial difficulty but not bankruptcy) and *available* (slight losses that would only be an inconvenience). Insurers are chosen on financial strength, the risk management services they provide, and the cost and terms of protection.
- **Advantages to the buyer:** After a loss the firm is indemnified and can keep operating; uncertainty, and with it worry, is reduced; insurers provide services such as loss control and claims adjusting; and premiums are deductible as a business expense.
- **Disadvantages to the buyer:** Premiums are a major cost, paid in advance, whereas under retention the money could stay invested in the business until claims are paid; negotiating coverage takes considerable time and effort; and an insured may take less care over loss control ([[Moral Hazard]]).
- **Insurance versus noninsurance transfer:** Risk can also be shifted by contracts other than insurance: hold-harmless and indemnity clauses, leases and rental agreements, warranties, and surety bonds; forming a separate corporation limits the owners' loss to their investment. A noninsurance transfer can shift a loss that is not commercially insurable, often costs less than insurance, and can place the loss with a party better able to control it. But the transfer can fail if the contract language is ambiguous, and if the party who accepted the loss cannot pay it, the firm is still responsible. Insurance places the loss with an insurer that is pooling it, rather than with a single counterparty ([[Risk Treatment]]).
- **The actuarial / Exam 9 treatment:** Risk transfer between insurers and reinsurers, and the accounting test of whether a contract transfers enough risk to count as reinsurance, are in [[Risk Transfer]].

> [!example]- Why Pooling Makes a House Fire Insurable {Example}
> A homeowner's house has a 1% chance of a total fire loss of \$150,000 in a year. An insurer pools 10,000 such houses, independently exposed. Find the expected annual cost per house, and compare the relative variation ($\sigma / \mu$) of the number of losses for one homeowner bearing the risk alone and for the insurer.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > p\,s &= 0.01 \times 150{,}000 \\
> > &= 1{,}500
> > \end{align*}
> > $$
> > The pool expects $10{,}000 \times 0.01 = 100$ fires, \$15 million in all, which is \$1,500 for each house before expenses and profit.
> > $$
> > \begin{align*}
> > \text{One house: } \sigma/\mu &= \sqrt{0.99 / 0.01} \\
> > &\approx 9.95 \\
> > \text{Pool: } \sigma/\mu &= \sqrt{0.99 / 100} \\
> > &\approx 0.0995
> > \end{align*}
> > $$
> > Alone, the homeowner pays either nothing or \$150,000, a relative variation of almost 10. The insurer's number of fires varies only about 10% around 100, so it can promise to pay for a premium near \$1,500. Transfer moves the loss off the homeowner; pooling is what makes it predictable for the insurer.

> [!example]- Ranking a Dental Practice's Coverages {Example}
> A dental practice cannot afford to insure everything. Its exposures are: injuries to its staff, in a state that requires workers compensation; a malpractice claim that could exceed the practice's net worth; damage to \$250,000 of dental equipment, which would be a serious setback but not fatal; theft of small supplies worth a few hundred dollars at a time; and liability to visitors, which its office lease requires it to insure. Rank the coverages as essential, desirable or available.
>
> > [!answer]-
> > - **Essential:** Workers compensation (required by law), professional liability for malpractice (a loss that threatens survival) and premises liability (required by the lease).
> > - **Desirable:** Property insurance on the equipment, a loss that would cause financial difficulty but not bankruptcy.
> > - **Available:** Coverage for theft of supplies, a slight loss that would only be an inconvenience. If the budget runs out, this is the coverage to go without.

> [!example]- Relying on a Hold-Harmless Clause {Example}
> A museum lets a small catering company use its hall for events. The contract requires the caterer to indemnify the museum for any claims arising from the caterer's use of the premises. A guest is injured by the caterer's equipment and sues the museum for \$400,000. The caterer has few assets and no insurance. What has the museum transferred, and what has it kept?
>
> > [!answer]-
> > The hold-harmless clause is a noninsurance transfer: by contract, the financial consequences of claims arising from the caterer's use pass to the caterer. It cost the museum nothing, and the caterer is the party best placed to control the hazard. But a transfer is only as good as the party who accepts it. Because the caterer cannot pay \$400,000, the museum is still responsible for the loss. Insurance would have placed the same loss with an insurer that pools it with many others, which is why the two techniques are often used together.

> [!tip]- How it appears on the exam
> - **DISC-RM:** The section on insurance as a risk management technique opens with using insurance to treat risk. Questions ask when insurance fits an exposure, using the frequency and severity of its losses, how a risk manager ranks coverages and selects insurers, and what insurance offers and costs the buyer compared with retention or noninsurance transfer.
> - **Pooling and transfer:** A question may ask which element of insurance makes losses predictable and which shifts them off the insured.
> - **Scenarios:** A short case lists an organization's exposures and asks which coverage is essential, desirable or available, or whether a contract clause leaves any loss with the organization.

> [!warning]- Exam traps
> - **Insure the large, retain the small:** Insurance is for low-frequency, high-severity exposures. Insuring frequent small losses costs more in premium than it saves.
> - **Essential is not the same as most likely:** Essential coverage is what law or contract requires, or what protects against a loss the organization could not survive, however rare.
> - **Pooling alone is not insurance:** Pooling makes losses predictable, but insurance also transfers them to a third party.
> - **A noninsurance transfer can fail:** If the other party cannot pay, or the clause is ambiguous, the loss comes back to the organization.
