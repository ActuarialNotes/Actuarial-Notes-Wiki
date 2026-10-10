---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:8ae1bf834951d90dcab3e3991f1b3529ef49722839544ced8587b06cb1aee21f
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

**Reinsurance Accounting** is the recognition and measurement of reinsurance in an insurer's financial statements. Under [[IFRS 17]] the governing rules are that a contract qualifies as reinsurance only if it transfers **significant insurance [[Risk Transfer|risk]]**, that reinsurance held is measured as a **separate asset** and never netted, and that a contract which does not transfer significant insurance risk is not an insurance contract, so it falls outside IFRS 17.

> $$\text{No significant risk transfer} \implies \text{deposit accounting}$$

- **The gross-up.** [[Reinsurance Contracts Held]] appear as an asset with their own [[Fulfilment Cash Flows|fulfilment cash flows]], [[Risk Adjustment for Non-Financial Risk|risk adjustment]] and [[Contractual Service Margin|CSM]]; the underlying liabilities stay gross. The balance sheet is larger on both sides than under netting, and the point of that is to make **counterparty exposure visible**.
- **Non-performance risk** — the reinsurer's credit standing, including dispute and collectability risk — reduces the reinsurance asset explicitly, and changes in it flow through profit or loss. This is separate from the risk adjustment and must not be conflated with it.
- **The income statement** may show a single net expense (or income) from reinsurance contracts held within the [[Insurance Service Result]]. Ceded premium is **not** deducted from [[Insurance Revenue]], and reinsurance recoveries are **not** deducted from [[Insurance Service Expenses]].
- **Deposit accounting** under U.S. statutory accounting (SSAP No. 62R) applies where risk transfer fails: the ceded premium is recorded as a deposit asset accruing interest, with no ceded premium, no ceded losses and no improvement in the reported loss ratio. An insurer that has wrongly booked such a contract as reinsurance has overstated capital and understated liabilities.
- **[[Commutations]]** terminate an existing reinsurance contract for a lump sum, extinguishing the asset and any residual recovery — an accounting event with immediate profit and capital consequences.
- **The [[MCT]] interacts.** Capital credit for ceded liabilities depends on whether the reinsurer is [[Registered Reinsurance|registered]] or [[Unregistered Reinsurance|unregistered]], so the accounting treatment and the capital treatment are related but governed by different rules.

- **U.S. statutory accounting (SSAP No. 62R):** A U.S. insurer's statutory statements take the opposite approach to IFRS 17 on presentation. Risk transfer is still the gate: the reinsurer must assume significant insurance risk on the reinsured portions, and it must be reasonably possible that the reinsurer realizes a significant loss; without both, no credit is taken and the contract is a deposit ([[Deposit Accounting]]).
- **Statutory premiums and commissions:** Premium paid for prospective reinsurance reduces the ceding insurer's written and earned premium and is earned over the contract period in proportion to the protection provided. Ceded premium payable is a liability net of the ceding commission, and ceding commission received is treated as revenue, which immediately benefits surplus ([[Financial Statements]] works a quota share). A ceding commission above the anticipated acquisition cost of the ceded business creates a liability for the excess, amortized over the contract.
- **Statutory losses:** Changes in estimated recoveries reduce gross incurred losses. Recoverables on paid losses are an asset, but recoverables on unpaid case and IBNR losses and LAE are netted against the loss reserve, so the balance sheet shows reserves net of reinsurance. For non-proportional reinsurance, a recoverable is recorded only when and to the extent incurred losses on the subject business exceed the attachment point.
- **Statutory credit risk:** Reinsurance with an unauthorized reinsurer earns credit only to the extent the ceding insurer holds collateral; otherwise it records a provision for reinsurance, a liability whose change is charged directly to surplus ([[Schedule F]]). Slow-paying and disputed recoverables are also penalized there.

![[Media/Figures/Reinsurance_Accounting.svg|340]]

> [!example]- Reinsurance Versus Deposit on the Same Numbers {Example}
> An insurer with $\$400$ million of gross earned premium and a $\$300$ million gross loss cedes $\$50$ million of premium and expects $\$38$ million of recoveries. Show the presentation if the contract transfers significant risk, and if it does not.
>
> > [!answer]-
> > **With risk transfer — reinsurance accounting:**
> >
> > - [[Insurance Revenue]]: $\$400$M (unchanged — ceded premium is **not** netted here).
> > - [[Insurance Service Expenses]]: $\$300$M (unchanged).
> > - Net expense from reinsurance held: $\$50\text{M} - \$38\text{M} = \$12\text{M}$.
> > - **[[Insurance Service Result]]:** $\$400 - \$300 - \$12 = \$88$M.
> > - Balance sheet: gross liabilities intact, plus a reinsurance asset for the $\$38$M recoverable.
> >
> > **Without risk transfer — deposit accounting:**
> >
> > - Insurance revenue: $\$400$M.
> > - Insurance service expenses: $\$300$M.
> > - **No reinsurance line at all.**
> > - **Insurance service result:** $\$100$M.
> > - Balance sheet: a **deposit asset** of $\$50$M accruing interest; the $\$38$M is a repayment of the deposit, not a recovery.
> >
> > **The difference to notice.** Deposit accounting reports a *better* service result here ($\$100$M against $\$88$M), because the $\$12$M net cost of the reinsurance is not an expense — it is a financing arrangement. But the balance sheet tells the truth either way: the insurer still carries $\$300$M of gross liability with no risk transferred, and the deposit is simply money lent and repaid.
> >
> > **Where the misstatement would be.** An insurer booking a *failed* contract as reinsurance gets the worst of both: it reports a $\$38$M recoverable it has no real claim to, reduces its net liabilities, and overstates its [[MCT]] ratio. That is why the risk transfer test is assessed before the accounting, not after.

> [!example]- An Excess of Loss Treaty on the Statutory Balance Sheet {Example}
> A U.S. insurer buys per-occurrence excess of loss reinsurance of \$2,000,000 excess of \$1,000,000 from an authorized reinsurer. At year end it has two large claims: one with incurred losses of \$800,000, the other with incurred losses of \$1,300,000, of which \$400,000 has been paid. How much reinsurance credit is recorded, and where?
>
> > [!answer]-
> > Credit for non-proportional reinsurance is taken only when incurred losses exceed the attachment point. The first claim is below \$1,000,000, so it has no recoverable. On the second:
> > $$
> > \begin{align*}
> > \text{Recoverable} &= 1{,}300{,}000 - 1{,}000{,}000 \\
> > &= 300{,}000
> > \end{align*}
> > $$
> > The insurer has paid only \$400,000, below the attachment, so nothing is recoverable on paid losses yet; the whole \$300,000 is recoverable on unpaid losses and is netted against the loss reserve, which reduces the net reserve and net incurred losses. Once the insurer's payments pass \$1,000,000, amounts it has paid above the attachment become a recoverable on paid losses, an asset.

> [!tip]- How it appears on the exam
> - **DISC-IA:** The objective is reinsurance accounting basics for a U.S. insurer. Expect questions on how ceded premium, ceding commission and recoverables appear in the statutory statements, and why a contract without risk transfer is a deposit.
> - **Exams 6C and 6U:** Exam 6C uses the IFRS 17 presentation described at the top of this page, with reinsurance held as a separate asset; Exam 6U uses the statutory treatment.

> [!warning]- Exam traps
> - **Net under SAP, gross under IFRS 17 and GAAP:** Statutory reserves are net of ceded reserves; IFRS 17 and GAAP gross them up and show the reinsurance as an asset.
> - **Ceded premium reduces premium:** Under SAP, ceded premium is a reduction of written and earned premium, not an expense.
> - **No credit below the attachment:** An excess of loss recoverable exists only for incurred losses above the retention.

