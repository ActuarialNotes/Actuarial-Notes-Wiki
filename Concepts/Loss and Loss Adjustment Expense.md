---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:81fd18ad83f3c32e3aad14d6a8955493ff76cfce80daeb4228191ec1be3b731b
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 p.9 (PDF p.21); Ch. 3 p.42 (PDF p.54); Ch. 6 pp.94-97 and 121-123 (PDF pp.106-109, 133-135), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Loss and Loss Adjustment Expense.md
---

**Loss and Loss Adjustment Expense** (loss & LAE) is the total cost of claims: the indemnity paid to claimants plus everything spent investigating, defending and settling those claims. It is the numerator of both the [[Pure Premium Method|pure premium]] and the [[Loss Ratio Method|loss ratio]] indication.

> $$\text{Loss \& LAE} = \text{Loss} + \text{ALAE} + \text{ULAE}$$

> $$\text{Loss \& LAE Ratio} = \frac{\text{Loss} + \text{LAE}}{\text{Earned Premium}}$$

- **[[Allocated Loss Adjustment Expense|ALAE]]** is claim-specific: defence counsel, expert witnesses, independent adjusters, court costs. Because it attaches to a claim, it can be carried inside the loss triangle and developed with the losses.
- **[[Unallocated Loss Adjustment Expenses ULAE|ULAE]]** is claims-department overhead: staff salaries, systems, occupancy. It cannot be traced to a claim, so it is estimated in aggregate — classically as the ratio of calendar-year paid ULAE to calendar-year paid loss plus ALAE, applied to loss plus ALAE that has been adjusted for extraordinary events, development and trend.
- The four "loss" numbers in an analysis are different: **paid**, **reported** (paid $+$ case), **ultimate** (reported $+$ IBNR), and **projected** (ultimate, trended to the future policy period). Each adjustment answers a different question and skipping one biases the indication in a predictable direction.
- The ratemaking adjustments on the loss side: start with reported losses → remove extraordinary [[Large Loss|shock]] and [[Catastrophe Loss|catastrophe]] losses → **develop** to ultimate ([[Loss Development]]) → **trend** to the forecast period ([[Loss Trend]]) → restate for benefit or coverage changes → add back a long-term large-loss and catastrophe provision → load ULAE. Werner & Modlin prescribe no single order, but a catastrophe provision is added to losses that have already been trended and developed — trending and developing it again would over-adjust it — and the ULAE ratio is applied to losses already adjusted.
- The statutory Annual Statement calls ALAE **Defense and Cost Containment (DCC)** and ULAE **Adjusting and Other (A&O)**; the definitions do not match exactly, which matters when using industry data.
- **Statutory accounting (SSAP No. 55):** Losses and LAE are recognized as expenses when a covered event occurs, with a liability for the unpaid amount ([[Unpaid Claims]]). Defense and cost containment (DCC) covers defense, litigation and medical cost containment expenses, internal or external, including attorney fees incurred under a duty to defend, surveillance, litigation management and the cost of experts. Adjusting and other (AO) covers the rest, such as fees and expenses of adjusters and settling agents and attorney fees incurred to determine coverage, including litigation between the insurer and the policyholder. Extra-contractual and bad-faith losses are included in losses.

![[Media/Figures/Loss_and_Loss_Adjustment_Expense.svg|340]]

> [!example]- Building the Loss & LAE Ratio {Example}
> Accident year $2023$: ultimate losses $\$650{,}000$, ultimate ALAE $\$78{,}000$, ULAE loaded at $4\%$ of loss and ALAE, earned premium $\$1{,}200{,}000$. The permissible loss ratio is $65\%$.
>
> Compute the loss & LAE ratio and the indicated change.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{ULAE} &= 0.04 \times (\$650{,}000 + \$78{,}000) \\
> > &= \$29{,}120 \\[6pt]
> > \text{Loss \& LAE} &= \$650{,}000 + \$78{,}000 + \$29{,}120 \\
> > &= \$757{,}120 \\[6pt]
> > \text{Ratio} &= \frac{\$757{,}120}{\$1{,}200{,}000} \\
> > &= 63.1\%
> > \end{align*}$$
> >
> > $$\text{Indication} = \frac{0.631}{0.65} - 1 = -2.9\%$$
> >
> > Note the ALAE ratio here is $12\%$ of loss — typical of a liability line. On a property line it would be a fraction of that, which is why an LAE load taken from one line and applied to another is a common and expensive mistake.

> [!example]- Where Each Adjustment Belongs {Example}
> An actuary has AY 2023 reported losses of $\$5{,}000{,}000$ at $24$ months, a reported CDF of $1.28$, annual loss trend of $5\%$, a trend period of $2.5$ years, and a $\$2{,}000{,}000$ shock loss included in the reported figure. Rates are being set for policies written in $2026$.
>
> Sequence the adjustments and compute the projected loss.
>
> > [!answer]-
> > **1. Remove the shock loss** before developing — a [[Large Loss|large loss]] does not develop like ordinary claims and would be multiplied by the CDF:
> >
> > $$\$5{,}000{,}000 - \$2{,}000{,}000 = \$3{,}000{,}000$$
> >
> > **2. Develop** the remaining losses to ultimate:
> >
> > $$\$3{,}000{,}000 \times 1.28 = \$3{,}840{,}000$$
> >
> > **3. Trend** to the future cost level:
> >
> > $$\$3{,}840{,}000 \times 1.05^{2.5} = \$3{,}840{,}000 \times 1.1297 = \$4{,}338{,}000$$
> >
> > **4. Add back a large-loss provision** — not this year's actual shock loss, but the long-run expected excess load (say $6\%$ of the trended non-shock losses):
> >
> > $$\$4{,}338{,}000 \times 1.06 = \$4{,}598{,}300$$
> >
> > **5. Load LAE**, and only then divide by exposures or premium.
> >
> > The order is not decorative. Trending before developing gives the same answer only if both are simple multiplications applied to the same base; developing the shock loss, or adding this year's actual large loss instead of the expected load, does not — and each error goes in a direction the analysis will not reveal.

> [!tip]- How it appears on the exam
> - **DISC-IA:** The objective on loss and loss adjustment expense accounting asks when losses and LAE are recognized and how LAE is classified. Expect a list of claim costs, such as a defense attorney, an independent adjuster or coverage counsel, and a question asking which are DCC and which AO.
> - **Exam 5:** Ratemaking loads ALAE and ULAE onto losses, as in the examples above.

> [!warning]- Exam traps
> - **Two attorneys, two categories:** An attorney defending the insured under the duty to defend is DCC; an attorney hired to decide whether the policy covers the claim is AO.
> - **DCC is not exactly ALAE:** The statutory categories do not line up exactly with the allocated and unallocated split, so industry data need care.
> - **Recognition follows the event:** Losses are expensed when the covered event occurs, not when they are paid.
