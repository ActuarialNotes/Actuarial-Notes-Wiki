---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:396e0f0ab0788c2c73ebbebab024599d981573f7cab381e92146c56447ed2b70
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

A **property loss exposure** is any condition or situation that presents the possibility that a person or organization will suffer a loss because property in which it has a financial interest is damaged, destroyed, taken or made unusable. It is one of the four types of [[Loss Exposure|loss exposure]], and like every exposure it is described by the property exposed, the [[Causes of Loss|cause of loss]] and the financial consequences. Individuals manage these exposures mainly through the [[Homeowners Policy|homeowners policy]] and personal auto coverage, and businesses through [[Commercial Property Insurance|commercial property insurance]].

> $$L = \Delta V + I_{\text{lost}} + E_{\text{extra}}$$

> $$\text{ACV} = \text{RC} - \text{Depreciation}$$

- **Symbols:** $L$ is the total financial consequence of one property loss to the party with the interest. $\Delta V$ is the reduction in the value of the property, measured on whichever valuation basis applies. $I_{\text{lost}}$ is the income lost while the property cannot be used, and $E_{\text{extra}}$ is the extra expense of carrying on in the meantime. ACV is actual cash value and RC is [[Replacement Cost|replacement cost]], the cost to repair or replace with property of like kind and quality.
- **Types of property:** Real property is land, buildings and other structures attached to the land. Personal property is everything else, including furniture, equipment, inventory, vehicles, money and securities, and valuable records such as accounts receivable.
- **Parties with a financial interest:** The owner is not the only party who can lose. A mortgagee or other secured lender loses when the collateral behind its loan is destroyed, a tenant can lose the improvements it paid for and the use of the premises, and a bailee, such as a dry cleaner, can be held responsible for customers' property in its care.
- **Causes of loss:** A cause of loss, or peril, is what damages the property, such as fire, windstorm, theft or water damage. Property policies either list the perils they cover, as the basic and broad forms do, or cover risks of direct physical loss except those excluded, as the special form does. Flood and earth movement are typically excluded and handled by separate coverage.
- **Reduction in value:** The loss in value can be measured at replacement cost, at actual cash value, which deducts depreciation from replacement cost, at market value, or at an agreed value set in advance. The basis matters because the gap between replacement cost and actual cash value is a real loss that the party bears unless the policy pays replacement cost, and [[Insurance to Value|insuring to value]] decides whether the limit is high enough to pay it.
- **Lost income and extra expense:** A business that cannot operate loses the net income it would have earned and still has to pay continuing expenses such as salaried payroll and loan interest. It may also spend extra, such as renting temporary space, to keep operating. A family whose home is unlivable faces the matching personal exposure, the additional living expense of staying elsewhere above its normal costs.
- **Personal exposures:** An individual's main property exposures are the dwelling, other structures on the lot, household personal property, autos, and the loss of use of the home. The HO-3 policy answers these with its dwelling, other structures, personal property and loss of use coverages ([[HO-3 Property Coverages]]), each subject to its perils, exclusions and loss settlement conditions, and the auto is insured under the personal auto policy's [[Auto Physical Damage Coverage|coverage for damage to your auto]]. Exposures the HO-3 limits or excludes, such as valuable articles, earthquake and sewer back-up, are treated with [[Homeowners Endorsements]].
- **Commercial exposures:** A business's exposures fall into its buildings, its business personal property, the property of others in its care, and the business income and extra expense that follow a loss. The [[Building and Personal Property Coverage Form|building and personal property coverage form]] and [[Business Income Coverage|business income coverage]] answer them, and specialized property, such as money, property in transit and equipment that can break down, often needs its own coverage.
- **Managing the exposure:** [[Risk Control|Risk control]] reduces frequency or severity, through sprinklers, alarms, safes and fire-resistive construction. Risk financing pays for the losses that remain, by retaining the small ones through a [[Deductible|deductible]] and transferring the large ones through insurance ([[Risk Transfer]]).

> [!example]- Financial Consequences of a Bakery Fire {Example}
> A fire closes a bakery for three months. With illustrative figures, the building damage would cost \$320,000 to repair at replacement cost, and the damaged part of the building had depreciated by 30%. Ovens and fixtures that would cost \$90,000 to replace had depreciated by 40%. While closed, the bakery loses net income of \$15,000 a month and continues to pay \$20,000 a month in expenses, and it spends \$12,000 renting a temporary kitchen to keep supplying its wholesale customers. Find the financial consequences on a replacement cost basis and on an actual cash value basis.
>
> > [!answer]-
> > The reduction in value depends on the valuation basis, and the income and expense items do not.
> > $$
> > \begin{align*}
> > \text{ACV}_{\text{bldg}} &= 320{,}000(1 - 0.30) \\
> > &= 224{,}000 \\
> > \text{ACV}_{\text{equip}} &= 90{,}000(1 - 0.40) \\
> > &= 54{,}000 \\
> > I_{\text{lost}} &= 3(15{,}000 + 20{,}000) \\
> > &= 105{,}000
> > \end{align*}
> > $$
> > Adding the extra expense to each basis gives the total.
> > $$
> > \begin{align*}
> > L_{\text{RC}} &= 320{,}000 + 90{,}000 + 105{,}000 + 12{,}000 \\
> > &= 527{,}000 \\
> > L_{\text{ACV}} &= 224{,}000 + 54{,}000 + 105{,}000 + 12{,}000 \\
> > &= 395{,}000
> > \end{align*}
> > $$
> > Restoring the bakery costs \$527,000. If its insurance values property at actual cash value, the bakery bears the \$132,000 of depreciation itself, which is why most commercial property is insured at replacement cost.

> [!example]- A Homeowner's Kitchen Fire {Example}
> A kitchen fire causes \$60,000 of damage to a house. Household contents that would cost \$18,000 to replace have an actual cash value of \$11,000. The family rents an apartment for two months at \$3,000 a month and spends \$900 more than usual on meals, while its mortgage and other normal costs continue. The homeowners policy has a \$1,000 deductible applied to the dwelling claim, values the dwelling at replacement cost and values personal property at actual cash value. Find the family's financial consequences and the part it retains.
>
> > [!answer]-
> > The additional living expense is the increase over normal living costs, which here is the rent and the extra meals.
> > $$
> > \begin{align*}
> > L &= 60{,}000 + 18{,}000 + 2(3{,}000) + 900 \\
> > &= 84{,}900 \\
> > \text{Insured} &= (60{,}000 - 1{,}000) + 11{,}000 + 6{,}900 \\
> > &= 76{,}900 \\
> > \text{Retained} &= 84{,}900 - 76{,}900 \\
> > &= 8{,}000
> > \end{align*}
> > $$
> > The family retains \$8,000, made up of the \$1,000 deductible and the \$7,000 of depreciation on its contents. A replacement cost endorsement on personal property would shrink that to the deductible.

> [!tip]- How it appears on the exam
> - **DISC-IA:** The homeowners section opens by asking how an individual manages personal property exposures, and the commercial property section opens by asking candidates to analyze a business's property exposures. Questions name the property, the causes of loss and the financial consequences, then ask which part of the HO-3 or the BPP responds.
> - **DISC-RM:** In the section on insurance as a risk management technique, a scenario describes a household or a business and asks which property exposures it faces, what a loss would cost, and how risk control and insurance would treat them.

> [!warning]- Exam traps
> - **Forgetting the time element:** A property loss usually brings lost income and extra expense, or additional living expense for a family. Measuring a loss by the repair cost alone understates it, often by a large share.
> - **Actual cash value versus replacement cost:** Actual cash value deducts depreciation, and the difference is borne by the insured unless the policy pays replacement cost. A question that gives both figures expects the candidate to say which basis applies.
> - **Additional living expense is an increase:** Additional living expense is what the family spends above its normal costs, not the total cost of living elsewhere. Costs that stop during the displacement reduce it.
> - **The owner is not the only interest:** A lender, a tenant and a bailee all have property exposures in property they do not own. An answer that names only the owner misses parties the course expects candidates to identify.
