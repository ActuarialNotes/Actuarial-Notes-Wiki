---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:dfbc0bee774d95a631d1f3d7303aefa30e40229f9424a85ef4d9184931cdfa4d
  sources:
    - "NAIC, Accounting Practices and Procedures Manual, as of March 2025, Part 1 (Indiana DOI copy), SSAP No. 62R ¶10-13, ¶30-32, ¶40, ¶49, ¶76-78, ¶85 (PDF pp.438, 441-442, 444, 446, 450-451), sha256:a29e7223b53854eff1beb79c3fd6a969c54529d2dacc74510ea122a5c7b4ad13 — https://www.in.gov/idoi/files/INDAP25-Pt-1.pdf"
    - "Odomirok, McFarlane, Kennedy & Brenden, Financial Reporting Through the Lens of a Property/Casualty Actuary (CAS, 2014), p.62 (ceding commissions treated as revenue, benefit surplus); Ch.22 p.306, sha256:eee4cf26c25cc24d4802029ecc44bbc9b419f2bfa9d1859e6e808884a0ec04e6 — https://www.casact.org/sites/default/files/database/studynotes_odomirok-etal_financial-reportingv4.pdf"
    - "IFRS 17 Insurance Contracts as adopted by Commission Regulation (EU) 2021/2036 (OJ L 416, 23.11.2021), ¶63, ¶67, ¶78, ¶82, ¶86 (PDF pp.15-16, 18-19), sha256:c3fd00c0bff726d1886fffc0404815217cba23a84d155d681cfbf9fa631ec315 — https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32021R2036"
    - "IRMI Insurance Glossary, 'commutation' (fetched 2026-10-10), sha256:4a4f0a8117e3514e20cc7e93053507feceb324dfb9a5643fff6d872fa4ed2d96 — https://www.irmi.com/term/insurance-definitions/commutation"
    - "OSFI, Questions and Answers – Guidance for Reinsurance Security Agreements (fetched 2026-10-10), sha256:83c50de632d4683ac140675078179f9e51c8cfefa99d248f8c78730a67bc4d0d — https://www.osfi-bsif.gc.ca/index%2ephp/en/data-forms/applications-approvals/questions-answers-guidance-reinsurance-security-agreements"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Reinsurance Accounting.md
---

![[Media/Figures/Reinsurance_Accounting.svg|340]]

**Reinsurance Accounting** is the recognition and measurement of reinsurance in an insurer's financial statements. Under [[IFRS 17]] and under U.S. statutory accounting (SSAP No. 62R), a contract is accounted for as reinsurance only if it transfers **significant insurance [[Risk Transfer|risk]]**.

The two frameworks present reinsurance in opposite ways:

| | IFRS 17 | U.S. statutory accounting |
| --- | --- | --- |
| Reinsurance on the balance sheet | A separate asset, never netted, with the underlying liabilities gross | Recoverables on unpaid losses netted against the loss reserve |
| Ceded premium | Not deducted from insurance revenue | A reduction of written and earned premium |
| No significant risk transfer | Not an insurance contract, so outside IFRS 17 | A deposit, with no reinsurance credit |

GAAP, like IFRS 17, grosses the reserves up and shows the reinsurance as an asset.

## Risk transfer and deposit accounting

Under SSAP No. 62R the reinsurer must assume significant insurance risk on the reinsured portions, and it must be reasonably possible that the reinsurer realizes a significant loss. Without both, no credit is taken and the contract is a deposit ([[Deposit Accounting]]). The ceded premium is recorded as a deposit asset accruing interest, with no ceded premium, no ceded losses and no improvement in the reported loss ratio. An insurer that has wrongly booked such a contract as reinsurance has overstated capital and understated liabilities.

## Reinsurance held under IFRS 17

[[Reinsurance Contracts Held]] appear as an asset with their own [[Fulfilment Cash Flows|fulfilment cash flows]], [[Risk Adjustment for Non-Financial Risk|risk adjustment]] and [[Contractual Service Margin|CSM]]. The underlying liabilities stay gross. The balance sheet is larger on both sides than under netting, and the gross-up makes **counterparty exposure visible**.

**Non-performance risk**, the reinsurer's credit standing including dispute and collectability risk, reduces the reinsurance asset explicitly, and changes in it flow through profit or loss. It is separate from the risk adjustment.

The income statement may show a single net expense (or income) from reinsurance contracts held within the [[Insurance Service Result]]. Ceded premium is not deducted from [[Insurance Revenue]], and reinsurance recoveries are not deducted from [[Insurance Service Expenses]].

> [!example]- How is this cession presented if the contract transfers significant risk, and if it does not? {Example}
> An insurer with \$400 million of gross earned premium and a \$300 million gross loss cedes \$50 million of premium and expects \$38 million of recoveries.
>
> > [!answer]-
> > - With risk transfer, insurance revenue stays \$400M and insurance service expenses stay \$300M.
> > - The net expense from reinsurance held is $50 - 38 = \$12$M, so the insurance service result is $400 - 300 - 12 = \$88$M.
> > - The balance sheet keeps the gross liabilities and adds a reinsurance asset for the \$38M recoverable.
> > - Without risk transfer, there is no reinsurance line, and the insurance service result is $400 - 300 = \$100$M.
> > - The balance sheet shows a deposit asset of \$50M accruing interest, and the \$38M is a repayment of the deposit, not a recovery.
> > - An insurer booking the failed contract as reinsurance would report a \$38M recoverable it has no real claim to and overstate its [[MCT]] ratio, which is why risk transfer is assessed before the accounting.

## U.S. statutory accounting

Premium paid for prospective reinsurance reduces the ceding insurer's written and earned premium and is earned over the contract period in proportion to the protection provided. Ceded premium payable is a liability net of the ceding commission, and ceding commission received is treated as revenue, which immediately benefits surplus ([[Financial Statements]] works a quota share). A ceding commission above the anticipated acquisition cost of the ceded business creates a liability for the excess, amortized over the contract.

Changes in estimated recoveries reduce gross incurred losses. Recoverables on paid losses are an asset, but recoverables on unpaid case and IBNR losses and LAE are netted against the loss reserve, so the balance sheet shows reserves net of reinsurance. For non-proportional reinsurance, a recoverable is recorded only when and to the extent incurred losses on the subject business exceed the attachment point.

> [!example]- How much reinsurance credit does this insurer record on its excess of loss treaty, and where? {Example}
> A U.S. insurer buys per-occurrence excess of loss reinsurance of \$2,000,000 excess of \$1,000,000 from an authorized reinsurer. At year end it has two large claims: one with incurred losses of \$800,000, the other with incurred losses of \$1,300,000, of which \$400,000 has been paid.
>
> > [!answer]-
> > - The first claim is below the \$1,000,000 attachment, so it has no recoverable.
> > - On the second, the recoverable is $1{,}300{,}000 - 1{,}000{,}000 = \$300{,}000$.
> > - The insurer has paid only \$400,000, below the attachment, so nothing is recoverable on paid losses yet.
> > - The whole \$300,000 is recoverable on unpaid losses and is netted against the loss reserve, which reduces the net reserve and net incurred losses.
> > - Once the insurer's payments pass \$1,000,000, amounts it has paid above the attachment become a recoverable on paid losses, an asset.

Reinsurance with an unauthorized reinsurer earns credit only to the extent the ceding insurer holds collateral. Otherwise it records a provision for reinsurance, a liability whose change is charged directly to surplus ([[Schedule F]]). Slow-paying and disputed recoverables are also penalized there.

## Commutations and capital

[[Commutations]] terminate an existing reinsurance contract for a lump sum, extinguishing the asset and any residual recovery. A commutation has immediate profit and capital consequences.

Under the [[MCT]], capital credit for ceded liabilities depends on whether the reinsurer is [[Registered Reinsurance|registered]] or [[Unregistered Reinsurance|unregistered]], so the accounting treatment and the capital treatment are related but governed by different rules.

> [!trap] Netting reserves under IFRS 17
> Statutory reserves are net of ceded reserves. IFRS 17 and GAAP gross them up and show the reinsurance as an asset.
