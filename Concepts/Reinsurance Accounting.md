---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:dc6adf796eaf6364b84ae72b426bd3eb0ef3fa20afe2be221fcde9ed60b5c665
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Reinsurance Accounting.md
---

**Reinsurance Accounting** is the recognition and measurement of reinsurance in an insurer's financial statements. Under [[IFRS 17]] the governing rules are that a contract qualifies as reinsurance only if it transfers **significant insurance [[Risk Transfer|risk]]**, that reinsurance held is measured as a **separate asset** and never netted, and that a contract failing the risk transfer test is accounted for as a **deposit**.

> $$\text{No significant risk transfer} \implies \text{deposit accounting}$$

- **The gross-up.** [[Reinsurance Contracts Held]] appear as an asset with their own [[Fulfilment Cash Flows|fulfilment cash flows]], [[Risk Adjustment for Non-Financial Risk|risk adjustment]] and [[Contractual Service Margin|CSM]]; the underlying liabilities stay gross. The balance sheet is larger on both sides than under netting, and the point of that is to make **counterparty exposure visible**.
- **Non-performance risk** — the reinsurer's credit standing, including dispute and collectability risk — reduces the reinsurance asset explicitly, and changes in it flow through profit or loss. This is separate from the risk adjustment and must not be conflated with it.
- **The income statement** shows a single net expense (or income) from reinsurance contracts held within the [[Insurance Service Result]]. Ceded premium is **not** deducted from [[Insurance Revenue]], and reinsurance recoveries are **not** deducted from [[Insurance Service Expenses]].
- **Deposit accounting** applies where risk transfer fails: the ceded premium is recorded as a deposit asset accruing interest, with no ceded premium, no ceded losses and no improvement in the reported loss ratio. An insurer that has wrongly booked such a contract as reinsurance has overstated capital and understated liabilities.
- **[[Commutations]]** terminate an existing reinsurance contract for a lump sum, extinguishing the asset and any residual recovery — an accounting event with immediate profit and capital consequences.
- **The [[MCT]] interacts.** Capital credit for ceded liabilities depends on whether the reinsurer is [[Registered Reinsurance|registered]] or [[Unregistered Reinsurance|unregistered]], so the accounting treatment and the capital treatment are related but governed by different rules.

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
> > **Where the misstatement would be.** An insurer booking a *failed* contract as reinsurance gets the worst of both: it reports a $\$38$M recoverable it has no real claim to, reduces its net liabilities, and overstates its [[MCT]] ratio. That is why the risk transfer test is assessed before the accounting, not after — and why the [[Appointed Actuary]] must raise it.
