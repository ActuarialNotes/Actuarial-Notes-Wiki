---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:58da196c852a4fc5ad5d931c2a2002abf5787594cec52bc855a201b568c89fae
  sources:
    - "Thompson, Insurance Operations – Claim Procedures and the Claim Adjustment Process (University of Northern Iowa course handout), pp.1–6: two goals of the claim function, users of claim information, regulators and market conduct, centralized/decentralized structure, settlement authority, staff/independent/public adjusters, producers, sha256:5ed85a349071117ddd86bbc495947689c0893f562bc2ada8c6e3db160fd42663 — https://sites.uni.edu/thompsona/Claims%20Settlement.pdf"
    - "Baranoff, Brockett & Kahane, Risk Management for Enterprises and Individuals (Saylor, CC BY-NC-SA), §7.3 'Claims Adjusting', sha256:85078f2f0eb5eeae7a77d336f6f5ff14be25519272bfc27d528e037c21424877 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s11-03-insurance-operations-reinsuran.html"
    - "NAIC Unfair Claims Settlement Practices Act, Model #900 (Jan 1997 printing), §§1, 3, 4A–N, 5, 6A–B, 7, prefatory note, pp.1–4, sha256:ba1d03c3819ae83500abaa0d6f50bba07a896d4be0ba26b84405095c131f6ba2 — https://content.naic.org/sites/default/files/model-law-900.pdf"
    - "NAIC Unfair Property/Casualty Claims Settlement Practices Model Regulation, Model #902 (Jul 1997 printing), §§2–9, pp.1–9, sha256:f33578860a5603a165819316747c996514340f371ca42f77f00621e3b3d41f55 — https://content.naic.org/sites/default/files/model-law-902.pdf"
    - "IRMI glossary, 'public adjuster', sha256:6934eb75ad50a658e817742bdf8d2aa93c6639db79c1b978efeeeede59f5fe9b — https://www.irmi.com/term/insurance-definitions/public-adjuster"
    - "IRMI glossary, 'independent adjuster', sha256:387b879559e3a86f84b47d427855060a9b79408697bdd304ce0ec924e92e04b7 — https://www.irmi.com/term/insurance-definitions/independent-adjuster"
    - "IRMI glossary, 'third party administrator', sha256:e4af3726554996be51cc3d5c9be30579346c584daa43e4438b5ade6f01d735e5 — https://www.irmi.com/term/insurance-definitions/third-party-administrator"
    - "IRMI glossary, 'claims adjuster', sha256:0b5580c20339c7bd76af212b03d797d9c496612b5c0512835156ccd294e9f1cb — https://www.irmi.com/term/insurance-definitions/claims-adjuster"
    - "IRMI glossary, 'claims audit', sha256:1196943c53782d496a35da951b9cd866034dad145f6360543813ce6f5466957d — https://www.irmi.com/term/insurance-definitions/claims-audit"
    - "IRMI glossary, 'reservation of rights', sha256:ada48198a157a8c1c8d24b80c061118d4ac01e8fdc21df0f28d2cba0746333b4 — https://www.irmi.com/term/insurance-definitions/reservation-of-rights"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Claims Handling.md
---

**Claims Handling** is the insurer's claims function: receiving each [[Claim|claim]], investigating it, deciding whether and how much the policy pays, and concluding it. The function has two goals: to keep the promise made in the [[Insurance Policy|insurance policy]] by paying covered losses fairly and promptly, and to support the insurer's profit goal by paying no more than the policy owes and controlling the cost of adjusting. Its work is measured by the losses it pays and the loss adjustment expense it spends.

> $$\text{Claim cost} = \text{Indemnity} + \text{ALAE}$$

> $$\text{Closure rate} = \frac{\text{Claims closed}}{\text{Claims reported}}$$

> $$\text{LAE ratio} = \frac{\text{LAE}}{\text{Losses}}$$

- **Symbols:** Indemnity is what the insurer pays the insured or the claimant. [[Allocated Loss Adjustment Expense|ALAE]] is adjusting cost attributable to the claim, such as defense counsel and experts. [[Unallocated Loss Adjustment Expenses ULAE|ULAE]], the claims department's salaries and overhead, is spread over all claims. The closure rate and LAE ratio are two of the measures used to judge a claims department, alongside average paid amounts, claims audits and customer satisfaction.
- **Department structure:** Claims are handled from the home office, regional offices and branch offices, with each claims person given settlement authority up to a limit. Larger or more complex claims go to more experienced staff or to the home office.
- **Claims personnel:** Staff claims representatives are the insurer's employees. Independent adjusters are hired by the claim, often in remote areas or after a catastrophe, and third-party administrators handle claims for self-insurers and sometimes for insurers. Producers may settle small claims under delegated authority, and public adjusters represent the insured against the insurer for a fee.
- **Regulatory compliance:** Most U.S. states have unfair claims settlement practices laws, based on an NAIC model act, that prohibit acts such as misrepresenting policy provisions, failing to acknowledge and act promptly on claim communications, refusing to pay without a reasonable investigation, and failing to settle in good faith once liability is reasonably clear. Claims departments track timeliness, documentation and complaints against these standards, and regulators review files in market conduct examinations ([[State Market Conduct Regulation|market conduct regulation]]). Conduct that breaches the duty of good faith can also expose the insurer to bad faith damages beyond the policy limits.
- **The process in detail:** [[Claims Handling Process]] works through the activities below one by one, with the NAIC model regulation's deadlines, and [[Unfair Claims Settlement Practices]] covers the model act and regulation that set the minimum standards.
- **Acknowledge and assign:** The insurer confirms that it received the claim and assigns it to a claims representative with the right authority and expertise. It may set an initial [[Case Reserves|case reserve]] at this stage.
- **Identify the policy:** The representative confirms that a policy was in force on the date of loss and identifies its coverages, limits, [[Deductible|deductibles]] and endorsements. A question about coverage that emerges here can lead to a reservation of rights letter, which tells the insured that the insurer is investigating without giving up its right to deny coverage later.
- **Contact the insured:** The representative contacts the insured, or the insured's representative, to explain the process and gather facts. Prompt contact is required by many state regulations and reduces later disputes.
- **Investigate and document:** The representative gathers statements, inspects damaged property, collects records and documents every step in the claim file. A well-documented file supports the decision and defends it in a regulatory audit or a lawsuit.
- **Determine cause of loss, liability and loss amount:** The representative applies the [[Coverage Analysis|coverage analysis]] framework to decide whether the cause of loss is covered, whether the insured is legally liable in a liability claim, and the amount owed after limits and deductibles. The claim is then concluded by payment, by a denial explained in writing, or through negotiation, appraisal, mediation, arbitration or litigation when the parties disagree. Recoveries through [[Salvage and Subrogation|salvage and subrogation]] can reduce the net loss after payment.

> [!example]- A Water Damage Claim From Report to Payment {Example}
> A homeowner reports that a supply line under the kitchen sink burst while the family was away. The policy is in force with a \$1,000 deductible and covers sudden and accidental discharge of water. The claims representative's inspection finds \$18,400 of damage to the dwelling and no sign that the leak had been continuing for weeks. Walk the claim through the process and find the payment.
>
> > [!answer]-
> > The representative acknowledges the claim, confirms the policy and its coverages, and contacts the insured to arrange an inspection. The investigation documents the failed fitting and the damage. The cause of loss, a sudden burst, falls within the covered water damage, and because the leak was not continuing over weeks, an exclusion for repeated seepage doesn't apply. This is a first-party claim, so liability isn't in question, and the loss amount follows from the damage and the deductible.
> > $$
> > \begin{align*}
> > \text{Payment} &= 18{,}400 - 1{,}000 \\
> > &= 17{,}400
> > \end{align*}
> > $$
> > The payment is within the dwelling limit, so the claim is concluded by paying \$17,400 and closing the file. If the investigation had found long-term seepage, the representative would have needed to explain the denial in writing, citing the policy language.

> [!example]- Reading Two Branches' Performance Measures {Example}
> Two claims branches handle the same line. Branch A had 1,200 claims reported, closed 1,140 and paid \$6,840,000 on them, with \$720,000 of LAE. Branch B had 1,150 reported, closed 920 and paid \$4,600,000, with \$460,000 of LAE. Compare the closure rate, average paid per closed claim and LAE ratio.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Closure}_A &= \frac{1{,}140}{1{,}200} \\
> > &= 95\% \\
> > \text{Closure}_B &= \frac{920}{1{,}150} \\
> > &= 80\% \\
> > \text{Avg}_A &= \frac{6{,}840{,}000}{1{,}140} \\
> > &= 6{,}000 \\
> > \text{Avg}_B &= \frac{4{,}600{,}000}{920} \\
> > &= 5{,}000 \\
> > \text{LAE ratio}_A &= \frac{720{,}000}{6{,}840{,}000} \\
> > &= 10.5\% \\
> > \text{LAE ratio}_B &= \frac{460{,}000}{4{,}600{,}000} \\
> > &= 10.0\%
> > \end{align*}
> > $$
> > Branch B looks cheaper on both average paid and LAE ratio, but it has closed only 80% of its claims. If the open claims are the larger and harder ones, Branch B's average will rise as they close. The measures have to be read together, and a claims audit of the open files would show which branch is handling claims better.

> [!tip]- How it appears on the exam
> - **DISC-RM:** Questions ask for the goals of the claims function, the roles of the different claims personnel, and the measures used to judge performance and regulatory compliance. The process questions list or order the activities of the claims handling process, and the applied section combines the process with the coverage analysis framework on a described loss, asking what the representative should do at each step and whether the policy pays.

> [!warning]- Exam traps
> - **Two goals, not one:** The claims function both keeps the insurer's promise and supports its profit. An answer that describes claims handling only as cost control misses the first goal, which regulation enforces.
> - **Public adjusters work for the insured:** Independent adjusters and third-party administrators work for the insurer or self-insurer, while a public adjuster is hired by the insured. Confusing them reverses whose interest the adjuster represents.
> - **Order of the steps:** The policy is identified and the facts investigated before cause of loss, liability and amount are determined. Settling the amount before confirming coverage risks paying a claim the policy doesn't cover, or waiving a defense.
> - **A reservation of rights is not a denial:** It tells the insured the insurer may deny coverage later while it continues to investigate. A denial is a final decision that must be explained in writing.
