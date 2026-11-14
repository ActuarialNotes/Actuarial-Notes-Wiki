---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:33698127121bd2a12bd3e91f3c1c7a955a2c10bfbedd60c8589bbc4d335ab82c
  sources:
    - "Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s10 pooling + transfer to a third party; steps; sentimental value; reduces risk and anxiety; objective/subjective estimates, sha256:a643d7b54dd325ce18405f2c482ebef89986853c6894651046d3f112a552cc04 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s10-02-nature-of-insurance.html"
    - "Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s10 six requisites; economic feasibility; deductibles, sha256:a313b603e25c423326a69258356cf6a570917a4d41924c731e91cd3fe3c061f3 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s10-03-ideal-requisites-for-insurabil.html"
    - "Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s08 Table 4.4 matrix; incorporation; warranties; leases; hold-harmless; surety, sha256:5da3c20b87e2a72ff64a492c44f23e70c966629c990a5dfd9739b0ec09c59eb8 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s08-04-risk-management-alternatives-t.html"
    - "Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s10 binomial CV, sha256:0fb4dd0d04812eb4f4ceaf8bc2e059ae323809659ce7945309682a998ee487fd — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s10-05-appendix-more-exposures-less-r.html"
    - "Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.3 pp.51-53 (PDF pp.70-72): noninsurance transfers and their advantages/disadvantages; five areas when using insurance; insurer selection; advantages/disadvantages of insurance, sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance as a Risk Management Technique.md
---

**Insurance as a risk management technique** is the use of insurance to finance the losses an organization or person cannot avoid or reduce to an acceptable level. It combines two things: [[Risk Transfer|transfer]] of the financial consequences of a loss to an insurer, in return for a premium, and the insurer's *pooling* of many similar exposures, which makes the losses of the group predictable.

Insurance fits best the exposures with a low [[Frequency|frequency]] and a high [[Severity|severity]] of loss. The traditional risk management matrix for one exposure gives the treatment:

| | Low severity | High severity |
| --- | --- | --- |
| **Low frequency** | Retention | Transfer by insurance |
| **High frequency** | Retention with loss control | Avoidance |

Insurance is economically feasible when the possible loss is significant to the insured and the premium is small next to it. Insuring frequent small losses would cost a premium large compared with the losses themselves, which is why [[Deductible|deductibles]] retain them. The exposure should also have the characteristics of an [[Insurable Risk|insurable risk]]: many similar units, accidental losses, no catastrophe for the group, definite losses, a calculable loss distribution and a feasible cost.

> [!example]- How should a firm treat a rare loss that would cost more than it could pay? {Example}
> - The exposure has low frequency and high severity.
> - The possible loss is significant to the firm, and its rarity keeps the premium small next to it, so insurance is economically feasible.
> - The firm should transfer it by insurance, retaining the small losses through a deductible.

## Pooling

Insurance does not prevent the event. The insured transfers the risk to the insurer, the insurer pools the exposures and forecasts their losses, and underwriting classifies each exposure with similar ones so that each pays a premium reflecting its expected loss. Pooling alone is not insurance. Insurance also transfers the losses to a third party.

If $n$ similar exposures each have probability $p$ of a loss of size $s$ in the period, the expected cost per insured is

> $$\frac{n\,p\,s}{n} = p\,s$$

The pool's losses are shared through premiums by all members, those with no loss and those with large losses alike. Each pays the expected cost $p\,s$ plus a charge for expenses, profit and the risk of losses exceeding expectations.

The relative variation of the pool's number of losses, $\sigma / \mu$, falls as $n$ grows ([[Law of Large Numbers]], [[Risk Classifications]]). For independent exposures it is

> $$\frac{\sigma}{\mu} = \sqrt{\frac{q}{n\,p}}$$

- $q = 1 - p$.

> [!example]- How much more predictable is a pool of 10,000 houses than one house? {Example}
> A house has a 1% chance of a total fire loss of $\$150{,}000$ in a year. An insurer pools 10,000 such houses, independently exposed.
>
> > [!answer]-
> > - The expected annual cost per house is $0.01 \times 150{,}000 = \$1{,}500$.
> > - The pool expects $10{,}000 \times 0.01 = 100$ fires, $\$15$ million in all, which is $\$1{,}500$ for each house before expenses and profit.
> > - For one house, $\sigma/\mu = \sqrt{0.99/0.01} \approx 9.95$. The homeowner pays either nothing or $\$150{,}000$.
> > - For the pool, $\sigma/\mu = \sqrt{0.99/100} \approx 0.0995$. The insurer's number of fires varies only about 10% around 100.
> > - The insurer can promise to pay for a premium near $\$1{,}500$. Transfer moves the loss off the homeowner, and pooling makes it predictable for the insurer.

## Advantages and disadvantages to the buyer

Insurance has these advantages for the buyer:

1. After a loss the firm is indemnified and can keep operating.
2. Uncertainty, and with it worry, is reduced.
3. Insurers provide services such as loss control and claims adjusting.
4. Premiums are deductible as a business expense.

It has these disadvantages:

1. Premiums are a major cost, paid in advance, whereas under retention the money could stay invested in the business until claims are paid.
2. Negotiating coverage takes considerable time and effort.
3. An insured may take less care over loss control ([[Moral Hazard]]).

Insurance also cannot replace sentimental value or the grief of a loss, which cannot be measured in money.

## Using insurance in a risk management program

A risk manager who uses insurance must select the coverages, select the insurer, negotiate the terms, tell the organization what is covered and what records to keep, and review the program periodically. Insurers are chosen on financial strength, the risk management services they provide, and the cost and terms of protection.

## Noninsurance risk transfer

Risk can also be shifted by contracts other than insurance: hold-harmless and indemnity clauses, leases and rental agreements, warranties, and surety bonds. Forming a separate corporation limits the owners' loss to their investment ([[Risk Treatment]]).

A noninsurance transfer can shift a loss that is not commercially insurable, often costs less than insurance, and can place the loss with a party better able to control it. But the transfer can fail if the contract language is ambiguous, and if the party who accepted the loss cannot pay it, the firm is still responsible. Insurance places the loss with an insurer that is pooling it, rather than with a single counterparty. Risk transfer between insurers and reinsurers is in [[Risk Transfer]].

> [!example]- What has this museum transferred by its hold-harmless clause, and what has it kept? {Example}
> A museum lets a small catering company use its hall. The contract requires the caterer to indemnify the museum for any claims arising from the caterer's use of the premises. A guest is injured by the caterer's equipment and sues the museum for $\$400{,}000$. The caterer has few assets and no insurance.
>
> > [!answer]-
> > - The hold-harmless clause is a noninsurance transfer: by contract, the financial consequences of claims arising from the caterer's use pass to the caterer.
> > - It cost the museum nothing, and the caterer is the party best placed to control the hazard.
> > - The caterer cannot pay $\$400{,}000$, so the museum is still responsible for the loss.
> > - Insurance would have placed the same loss with an insurer that pools it with many others, which is why the two techniques are often used together.

> [!trap] Insuring frequent small losses
> Insurance is for low-frequency, high-severity exposures. Insuring frequent small losses costs more in premium than it saves, so those losses are retained, with loss control where they are frequent.
