---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ac4e1a4116d1fe6947160a6217b41e1ddc47cadac0d23fa51ced3a8a988e08de
  sources: []
  open_findings: 0
  log: .verify/Concepts/Loss and Loss Adjustment Expense.md
---

**Loss and Loss Adjustment Expense** (loss & LAE) is the total cost of claims: the indemnity paid to claimants plus everything spent investigating, defending and settling those claims. It is the numerator of both the [[Pure Premium Method|pure premium]] and the [[Loss Ratio Method|loss ratio]] indication.

> $$\text{Loss \& LAE} = \text{Loss} + \text{ALAE} + \text{ULAE}$$

> $$\text{Loss \& LAE Ratio} = \frac{\text{Loss} + \text{LAE}}{\text{Earned Premium}}$$

- **[[Allocated Loss Adjustment Expense|ALAE]]** is claim-specific: defence counsel, expert witnesses, independent adjusters, court costs. Because it attaches to a claim, it can be carried inside the loss triangle and developed with the losses.
- **[[Unallocated Loss Adjustment Expenses ULAE|ULAE]]** is claims-department overhead: staff salaries, systems, occupancy. It cannot be traced to a claim, so it is estimated in aggregate — classically as a ratio of paid ULAE to paid loss.
- The four "loss" numbers in an analysis are different: **paid**, **reported** (paid $+$ case), **ultimate** (reported $+$ IBNR), and **projected** (ultimate, trended to the future policy period). Each adjustment answers a different question and skipping one biases the indication in a predictable direction.
- The full ratemaking chain on the loss side is: start with reported losses → **develop** to ultimate ([[Loss Development]]) → **trend** to the forecast period ([[Loss Trend]]) → adjust for [[Large Loss|large losses]] and [[Catastrophe Loss|catastrophes]] → adjust for benefit or coverage changes → add LAE.
- The statutory Annual Statement calls ALAE **Defense and Cost Containment (DCC)** and ULAE **Adjusting and Other (A&O)**; the definitions do not match exactly, which matters when using industry data.

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
> > $$\$3{,}840{,}000 \times 1.05^{2.5} = \$3{,}840{,}000 \times 1.1294 = \$4{,}336{,}900$$
> >
> > **4. Add back a large-loss provision** — not this year's actual shock loss, but the long-run expected excess load (say $6\%$ of the trended non-shock losses):
> >
> > $$\$4{,}336{,}900 \times 1.06 = \$4{,}597{,}100$$
> >
> > **5. Load LAE**, and only then divide by exposures or premium.
> >
> > The order is not decorative. Trending before developing gives the same answer only if both are simple multiplications applied to the same base; developing the shock loss, or adding this year's actual large loss instead of the expected load, does not — and each error goes in a direction the analysis will not reveal.
