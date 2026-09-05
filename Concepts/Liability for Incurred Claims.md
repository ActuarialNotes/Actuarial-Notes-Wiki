---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1013cfa8592d5c8b89097e6b2d9e5573a8c274d1c6e344fd50e9eac8a5083939
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Liability for Incurred Claims.md
---

**The Liability for Incurred Claims** (LIC) is the [[IFRS 17]] liability for claims that have **already occurred** but are not yet fully paid — case reserves, IBNR, reopened claims and the associated adjustment expenses. It is measured as the present value of [[Fulfilment Cash Flows|fulfilment cash flows]] plus a [[Risk Adjustment for Non-Financial Risk|risk adjustment]], and it is where nearly all of a P&C actuary's traditional reserving work now lives.

> $$\text{LIC} = \underbrace{\text{PV(Expected future cash flows)}}_{\text{fulfilment cash flows}} + \underbrace{\text{RA}}_{\text{risk adjustment}}$$

- **No contractual service margin.** The service under an incurred claim has already been provided, so there is no unearned profit to defer — the LIC is fulfilment cash flows plus risk adjustment and nothing else. This is a structural difference from the [[Liability for Remaining Coverage|LRC]] under the [[General Measurement Model|GMM]].
- **Discounting is mandatory**, at [[IFRS 17 Discount Rates|current rates]] consistent with the characteristics of the liability cash flows. There is no PAA exemption for the LIC beyond claims expected to be paid within a year of being incurred.
- **The estimate is unbiased and probability-weighted** — the mean of the distribution of outcomes, not a conservative or a modal estimate. Conservatism enters only through the explicit risk adjustment, which is the whole point of separating the two.
- **Cash flows within the [[Contract Boundary]]** only, and only those **directly attributable** to fulfilling the contracts: claim payments, [[Allocated Loss Adjustment Expense|ALAE]], directly attributable claims-handling overhead (ULAE), and claim-related salvage and subrogation recoveries as negative cash flows.
- **Changes in the LIC are split** on the income statement: changes from claim experience and assumption revisions go to [[Insurance Service Expenses]], while the unwinding of discount and the effect of changes in discount rates go to [[Insurance Finance Income or Expenses]]. Getting this split right is what makes the [[Insurance Service Result]] a clean measure of underwriting performance.
- Reinsurance recoveries on incurred claims are **not** deducted here; they form part of the [[Reinsurance Contracts Held]] asset.

> [!example]- From Undiscounted Reserves to the LIC {Example}
> An actuary's undiscounted central estimate of unpaid claims and ALAE is $\$180$ million, expected to be paid over five years in the pattern $35\%$, $25\%$, $20\%$, $12\%$, $8\%$ (paid at mid-year). The current discount rate is $4\%$. The risk adjustment is set at $6\%$ of the discounted fulfilment cash flows.
>
> Compute the LIC.
>
> > [!answer]-
> > Discount each year's payment at $4\%$ from its mid-year point ($t = 0.5, 1.5, \ldots$):
> >
> > $$\begin{align*}
> > \text{PV} &= \$180\text{M} \times \bigl[0.35 v^{0.5} + 0.25 v^{1.5} + 0.20 v^{2.5} \\
> > &\qquad\qquad + 0.12 v^{3.5} + 0.08 v^{4.5}\bigr]
> > \end{align*}$$
> >
> > with $v = 1.04^{-1}$. Evaluating the bracket:
> >
> > $$\begin{align*}
> > &0.35(0.98058) + 0.25(0.94287) + 0.20(0.90661) \\
> > &\quad + 0.12(0.87174) + 0.08(0.83821) \\
> > &= 0.34320 + 0.23572 + 0.18132 + 0.10461 + 0.06706 \\
> > &= 0.93191
> > \end{align*}$$
> >
> > $$\begin{align*}
> > \text{PV} &= \$180\text{M} \times 0.93191 \\
> > &= \$167.7\text{M}
> > \end{align*}$$
> >
> > **Risk adjustment:**
> >
> > $$0.06 \times \$167.7\text{M} = \$10.1\text{M}$$
> >
> > **LIC:**
> >
> > $$\$167.7\text{M} + \$10.1\text{M} = \$177.8\text{M}$$
> >
> > The discount saves $\$12.3$ million and the risk adjustment gives $\$10.1$ million back, so the LIC lands close to the undiscounted estimate — a coincidence of this payout pattern and these parameters, not a general result. On a long-tail line the discount would dominate; on a short-tail line the risk adjustment would.
> >
> > **In the following year**, the $\$167.7$ million unwinds toward $\$180$ million as time passes; that unwind is [[Insurance Finance Income or Expenses|insurance finance expense]], **not** an underwriting loss, and separating it is exactly what the IFRS 17 income statement is designed to do.
