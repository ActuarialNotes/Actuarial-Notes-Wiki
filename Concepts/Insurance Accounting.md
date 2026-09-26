---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4086adaa39b29f6d8d277915de0a4895f98c09d194dc29c325b55045d354c47b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Accounting.md
---

**Insurance Accounting** — for a reinsurance contract, *reinsurance accounting* — is the treatment a contract earns when it genuinely indemnifies the cedant against insurance risk: ceded premium reduces written and earned premium, ceded losses reduce losses incurred, and the cedant takes credit for the recoverable. Under statutory accounting (SSAP No. 62R) and [[GAAP]] (ASC 944-20) a contract qualifies only if **both** conditions below hold; otherwise it receives [[Deposit Accounting|deposit accounting]].

> $$\begin{aligned} \text{Reinsurance accounting} \iff {} & \text{(a) significant insurance risk assumed} \\ \wedge\; & \text{(b) significant loss reasonably possible} \end{aligned}$$

> $$\text{ERD} = \frac{E\left[\max(\text{PV payments} - \text{PV premium},\ 0)\right]}{\text{PV premium}}$$

- **(a) Significant insurance risk** means both underwriting risk (amount) and timing risk: the reinsurer's payments must depend on, and vary directly with, the cedant's claim payments. Any feature that can delay **timely reimbursement** — payment schedules, retentions accumulating over several years — fails this condition outright.
- **(b) Reasonably possible significant loss** compares the present value of *all* cash flows between the parties, in each outcome that is more than remote, with the present value of the **gross** premium. One constant, reasonable interest rate applies in every scenario; reinsurer expenses, brokerage and taxes are excluded, while experience refunds, [[Loss Corridors|loss corridors]], caps, cancellation terms and any side agreement are included.
- **Neither standard sets a number.** Practice supplies two heuristics: the **10-10 rule** — at least a $10\%$ chance of a loss of at least $10\%$ of premium — and the **expected reinsurer deficit** (ERD, above: the probability of a PV loss times its average severity, as a share of premium), conventionally passed at $\text{ERD} \geq 1\%$ to match 10-10. They are rules of thumb for judging condition (b), not accounting rules.
- **The narrow exception.** If the reinsurer assumes **substantially all** the insurance risk on the reinsured portion — a straight [[Quota Share|quota share]] with no risk-limiting features — condition (b) need not be met, so an inherently profitable book can still be reinsured.
- **Governance.** Contracts whose risk transfer is not *reasonably self-evident* need documented analysis, and the CEO and CFO attest annually that no undisclosed side agreements exist; actuaries usually do the testing. [[Freihaut and Vendetti]] catalogue the common pitfalls, and [[Finite Reinsurance]] is where the test bites hardest. See also [[Risk Transfer]].
- A contract that passes is then classified as **prospective** or **retroactive**; retroactive covers (loss portfolio transfers, adverse development covers) get special treatment — a restricted special-surplus gain under SAP, a deferred gain under GAAP.

> [!example]- Testing Risk Transfer with 10-10 and ERD {Example}
> A reinsurer receives premium with present value $\$10$M. Modelled outcomes for the present value of its payments to the cedant, all at one constant risk-free rate:
>
> - probability $60\%$: $\$4$M
> - probability $25\%$: $\$9$M
> - probability $10\%$: $\$12$M
> - probability $5\%$: $\$16$M
>
> Does the contract pass the 10-10 rule and the ERD benchmark?
>
> > [!answer]-
> > The reinsurer's PV result (premium less payments) is $+6$, $+1$, $-2$ and $-6$.
> >
> > **10-10.** A loss occurs with probability $10\% + 5\% = 15\%$, and each losing outcome loses $20\%$ or $60\%$ of premium — at least a $10\%$ chance of a loss of at least $10\%$. Pass.
> >
> > **ERD.**
> >
> > $$
> > \begin{align*}
> > \text{ERD} &= \frac{0.10(2) + 0.05(6)}{10} \\
> > &= \frac{0.50}{10} \\
> > &= 5\%
> > \end{align*}
> > $$
> >
> > Well above $1\%$. Both heuristics support a reasonably possible significant loss, so with condition (a) also met the contract receives reinsurance accounting.

> [!example]- A Loss Corridor Removes the Risk {Example}
> The same contract is amended so that the cedant retains ceded losses between $\$8$M and $\$14$M (in present value, for simplicity; in a real test the corridor applies to nominal losses before discounting). The reinsurer pays the first $\$8$M and anything above $\$14$M; premium is unchanged. Re-test.
>
> > [!answer]-
> > Reinsurer payments are $\min(L, 8) + \max(L - 14, 0)$:
> >
> > $$
> > \begin{align*}
> > L = 4 &\;\Rightarrow\; 4 \\
> > L = 9 &\;\Rightarrow\; 8 \\
> > L = 12 &\;\Rightarrow\; 8 \\
> > L = 16 &\;\Rightarrow\; 10
> > \end{align*}
> > $$
> >
> > The reinsurer's results become $+6$, $+2$, $+2$ and $0$. It loses money in **no** outcome, so ERD is $0$ and 10-10 fails: the corridor hands back to the cedant exactly the band in which the reinsurer would have lost.
> >
> > The substantially-all exception is unavailable, because the cedant retains the corridor. The contract is a **deposit**: no ceded premium, no ceded losses, and no reduction of net reserves. To restore reinsurance accounting, narrow or remove the corridor, or reduce the premium until a significant loss is again reasonably possible.
