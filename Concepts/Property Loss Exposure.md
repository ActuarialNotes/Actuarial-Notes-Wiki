---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:19f854c3e591470b51dda9fdaa081a4a8115b61df7764c1cadf94f406dcdf25e
  sources:
    - "Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.9 pp.167-169 (PDF pp.186-188): ACV = RC less depreciation, valuation methods, insurable interest of owners, bailees, secured creditors, sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0"
    - "Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.3 p.46: business income exposures (loss of income, continuing expenses, extra expenses), sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0"
    - "ISO CP 00 10 10 12, Building and Personal Property Coverage Form (specimen), A.1.b.(6) use interest as tenant in improvements and betterments, sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf"
    - "ISO HO 00 03 05 11, Homeowners 3 - Special Form (specimen, Maine BOI), Section I Coverage D; Section II Coverage E, sha256:ac539e500a5767946452d1e6ad4c4b7dcc395c6c65c48fc3a8ac92a7c330a1d4 — https://www.maine.gov/pfr/insurance/sites/maine.gov.pfr.insurance/files/inline-files/ho00-03-05-11-homeowners3-special-form.pdf"
    - "Risk & Insurance Education Alliance, Risk Identification (ELR course reading), pp.1-5, sha256:1592f41132ab2c9854a94b3de7c237a84442678d065a545621991fda4d6148cc — https://riskeducation.org/pub/media/elr/Risk-Identification.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Property Loss Exposure.md
---
A **Property Loss Exposure** is any condition or situation that presents the possibility that a person or organization will suffer a loss because property in which it has a financial interest is damaged, destroyed, taken or made unusable. It is one of the four types of [[Loss Exposure|loss exposure]], and it is described by the property exposed, the [[Causes of Loss|cause of loss]] and the financial consequences.

The total financial consequence of one property loss to the party with the interest is

> $$L = \Delta V + I_{\text{lost}} + E_{\text{extra}}$$

- $\Delta V$ is the reduction in the value of the property, measured on whichever valuation basis applies.
- $I_{\text{lost}}$ is the income lost while the property cannot be used.
- $E_{\text{extra}}$ is the extra expense of carrying on in the meantime.

## Types of property

Real property is land, buildings and other structures attached to the land. Personal property is everything else, including furniture, equipment, inventory, vehicles, money and securities, and valuable records such as accounts receivable.

## Parties with a financial interest

The owner is not the only party who can lose when property is damaged:

- A **mortgagee** or other secured lender loses when the collateral behind its loan is destroyed.
- A **tenant** can lose the improvements it paid for and the use of the premises.
- A **bailee**, such as a dry cleaner, can be held responsible for customers' property in its care.

## Causes of loss

A cause of loss, or peril, is what damages the property, such as fire, windstorm, theft or water damage. Property policies either list the perils they cover, as the basic and broad forms do, or cover risks of direct physical loss except those excluded, as the special form does. Flood and earth movement are typically excluded and handled by separate coverage.

## Valuation of property

The reduction in value can be measured at [[Replacement Cost|replacement cost]] (RC), the cost to repair or replace with property of like kind and quality, at actual cash value (ACV), at market value, or at an agreed value set in advance. Actual cash value is

> $$\text{ACV} = \text{RC} - \text{Depreciation}$$

The gap between replacement cost and actual cash value is a real loss that the party bears unless the policy pays replacement cost. [[Insurance to Value|Insuring to value]] decides whether the limit is high enough to pay it.

> [!example]- What are the bakery's financial consequences on a replacement cost basis and on an actual cash value basis? {Example}
> A fire closes a bakery for three months. The figures are illustrative:
>
> | Item | Amount |
> | :--- | ---: |
> | Building damage at replacement cost | \$320,000, depreciated 30% |
> | Ovens and fixtures at replacement cost | \$90,000, depreciated 40% |
> | Net income lost | \$15,000 a month |
> | Continuing expenses | \$20,000 a month |
> | Temporary kitchen rented to keep supplying customers | \$12,000 |
>
> > [!answer]-
> > - The building's actual cash value loss is $320{,}000(1 - 0.30) = \$224{,}000$.
> > - The equipment's actual cash value loss is $90{,}000(1 - 0.40) = \$54{,}000$.
> > - The lost income is the net income plus the continuing expenses, $3(15{,}000 + 20{,}000) = \$105{,}000$, on either basis.
> > - The extra expense is the $\$12{,}000$ temporary kitchen, on either basis.
> > - At replacement cost, $L = 320{,}000 + 90{,}000 + 105{,}000 + 12{,}000 = \$527{,}000$.
> > - At actual cash value, $L = 224{,}000 + 54{,}000 + 105{,}000 + 12{,}000 = \$395{,}000$.
> > - If its insurance pays actual cash value, the bakery bears the $\$132{,}000$ of depreciation itself, which is why most commercial property is insured at replacement cost.

## Lost income and extra expense

A business that cannot operate loses the net income it would have earned and still has to pay continuing expenses such as salaried payroll and loan interest. Its business income loss is the net income lost plus those continuing expenses. It may also spend extra, such as renting temporary space, to keep operating.

A family whose home is unlivable faces the matching personal exposure, the additional living expense of staying elsewhere. Additional living expense is the increase over the family's normal living costs, not the total cost of living elsewhere. Costs that continue regardless, such as the mortgage, are not part of it, and costs that stop during the displacement reduce it.

> [!example]- What are the family's financial consequences, and how much of them does it retain? {Example}
> A kitchen fire causes \$60,000 of damage to a house. Household contents that would cost \$18,000 to replace have an actual cash value of \$11,000. The family rents an apartment for two months at \$3,000 a month and spends \$900 more than usual on meals, while its mortgage and other normal costs continue. The homeowners policy values the dwelling at replacement cost with a \$1,000 deductible, and values personal property at actual cash value.
>
> > [!answer]-
> > - The additional living expense is the rent and the extra meals, $2(3{,}000) + 900 = \$6{,}900$. The mortgage continues anyway, so it is not part of it.
> > - The financial consequence is $L = 60{,}000 + 18{,}000 + 6{,}900 = \$84{,}900$.
> > - The policy pays $(60{,}000 - 1{,}000) + 11{,}000 + 6{,}900 = \$76{,}900$.
> > - The family retains $84{,}900 - 76{,}900 = \$8{,}000$, the $\$1{,}000$ deductible and the $\$7{,}000$ of depreciation on its contents.

## Personal property exposures

An individual's main property exposures are the dwelling, other structures on the lot, household personal property, autos, and the loss of use of the home. The [[Homeowners Policy|homeowners policy]] answers these with its dwelling, other structures, personal property and loss of use coverages ([[HO-3 Property Coverages]]), each subject to its perils, exclusions and loss settlement conditions. The auto is insured under the personal auto policy's [[Auto Physical Damage Coverage|coverage for damage to your auto]]. Exposures the HO-3 limits or excludes, such as valuable articles, earthquake and sewer back-up, are treated with [[Homeowners Endorsements]].

## Commercial property exposures

A business's exposures fall into its buildings, its business personal property, the property of others in its care, and the business income and extra expense that follow a loss. The [[Building and Personal Property Coverage Form|building and personal property coverage form]] and [[Business Income Coverage|business income coverage]] answer them, under [[Commercial Property Insurance|commercial property insurance]]. Specialized property, such as money, property in transit and equipment that can break down, often needs its own coverage.

## Managing the exposure

[[Risk Control|Risk control]] reduces frequency or severity, through sprinklers, alarms, safes and fire-resistive construction. Risk financing pays for the losses that remain, by retaining the small ones through a [[Deductible|deductible]] and transferring the large ones through insurance ([[Risk Transfer]]).

> [!trap] Measuring the loss by the repair cost alone
> A property loss usually brings lost income and extra expense, or additional living expense for a family. Leaving them out understates the loss: in the bakery example they add $\$117{,}000$ to the $\$410{,}000$ of property damage.
