---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:513a5a1ad57e9a02ed943f314d9e94385d11292854a325b5b9e8b00c79c506a0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Excess and Deductible Rating.md
---

**Excess and Deductible Rating** is the pricing of coverage that pays only part of each loss — above a deductible or retention, up to a limit, or between an attachment and an exhaustion point — by splitting the expected ground-up loss among the parties with a [[Severity Distribution|severity distribution]] and its [[Limited Expected Value|limited expected values]].

> $$
> \begin{aligned}
> E[X] = {} & E[X \wedge d] \\
> & + \left(E[X \wedge u] - E[X \wedge d]\right) \\
> & + \left(E[X] - E[X \wedge u]\right)
> \end{aligned}
> $$

- $X$ is the ground-up loss per occurrence, $d$ the deductible or retention and $u$ the limit. The first term over $E[X]$ is the [[Loss Elimination Ratio|LER]] behind [[Deductible Rating|deductible credits]]; the second is the insured [[Layer of Insurance|layer]], priced by [[Increased Limits|ILFs]]; the third is what [[Excess Insurance|excess coverage]] or [[Excess of Loss|excess-of-loss reinsurance]] pays. Multiply by the expected claim count $E[N]$ for aggregate cost.
- **Problems common to every line.** Few claims reach the upper layers, so pricing leans on fitted curves and industry data, and the tail fit drives the answer. Data are [[Truncation|truncated]] below deductibles and [[Censoring|censored]] at policy limits. A fixed retention **leverages [[Inflation|inflation]]** into the excess layer. Excess losses report and settle later. Parameter uncertainty is large relative to the expected loss, which calls for a [[Risk Loads|risk load]].
- **Expenses do not scale with the layer.** Claims handling, fixed expense and the risk provision stay behind when the expected loss moves to the insured, so a high-deductible or high-layer premium looks large relative to its expected loss.
- **Selection.** Insureds choose their limits and deductibles knowing their own risk. The GLM monograph therefore estimates coverage-option factors outside the model, by loss elimination and ILF methods, and enters them as an [[Offset Variable|offset]].
- **Line-specific problems.** In **property**, loss is capped by the insured value and damage ratios fall as risk size grows, hence [[Exposure Curves]]; catastrophes accumulate across risks. In **liability**, nothing below the limit caps the loss: tails are heavy, reporting is slow, and whether ALAE sits inside or outside the limit matters. In **workers compensation**, statutory benefits have no policy limit, excess cost is driven by rare fatal and permanent-total claims, and large-deductible reimbursements carry [[Credit Risk|credit risk]].

> [!example]- Inflation Is Leveraged Into the Excess Layer {Example}
> Severity is Pareto with $\alpha = 2$, so $E[X \wedge u] = \dfrac{\theta u}{\theta + u}$, with $\theta = \$50{,}000$. Severity inflation of $10\%$ raises $\theta$ to $\$55{,}000$. Compare the change in expected loss per claim for the primary layer $\$100{,}000$ xs $0$ and for $\$500{,}000$ xs $\$500{,}000$.
>
> > [!answer]-
> > Primary layer:
> >
> > $$
> > \begin{align*}
> > E[X \wedge 100\text{K}]_{\text{before}} &= \frac{50{,}000 \times 100{,}000}{150{,}000} \\
> > &= 33{,}333.33 \\[4pt]
> > E[X \wedge 100\text{K}]_{\text{after}} &= \frac{55{,}000 \times 100{,}000}{155{,}000} \\
> > &= 35{,}483.87
> > \end{align*}
> > $$
> >
> > Excess layer, $E[X \wedge 1\text{M}] - E[X \wedge 500\text{K}]$:
> >
> > $$
> > \begin{align*}
> > \text{Before} &= 47{,}619.05 - 45{,}454.55 \\
> > &= 2{,}164.50 \\[4pt]
> > \text{After} &= 52{,}132.70 - 49{,}549.55 \\
> > &= 2{,}583.15
> > \end{align*}
> > $$
> >
> > The ground-up trend is $+10\%$. The primary layer grows $+6.5\%$ and the excess layer $+19.3\%$, because more claims now pierce $\$500{,}000$. A rate for the excess layer that is trended at the ground-up $10\%$ is inadequate.

> [!example]- Premium for a Large Deductible Policy {Example}
> A workers compensation account has expected ground-up losses of $\$800{,}000$. Losses limited to a $\$250{,}000$ per-occurrence deductible are expected to be $\$560{,}000$, and $\$540{,}000$ after a $\$900{,}000$ aggregate deductible limit. The insurer adjusts every claim at $10\%$ of ground-up loss and has fixed expenses of $\$60{,}000$. It targets a $\$25{,}000$ profit and risk provision, and premium tax is $3\%$. Deductible reimbursements are not premium.
>
> Compute the premium and the insured's expected total cost.
>
> > [!answer]-
> > The insurer's expected loss is the per-occurrence excess plus the aggregate excess:
> >
> > $$
> > \begin{align*}
> > \text{Insured loss} &= (800{,}000 - 560{,}000) + (560{,}000 - 540{,}000) \\
> > &= \$260{,}000 \\[6pt]
> > \text{Premium} &= \frac{260{,}000 + 80{,}000 + 60{,}000 + 25{,}000}{1 - 0.03} \\
> > &= \$438{,}144
> > \end{align*}
> > $$
> >
> > The insured's expected cost is $\$438{,}144 + \$540{,}000 = \$978{,}144$.
> >
> > Only $59\%$ of the premium is expected loss. The claims handling on the deductible layer, the fixed expense and the risk provision all remain. Against a guaranteed-cost premium of $(800{,}000 + 80{,}000 + 60{,}000 + 40{,}000)/0.97 = \$1{,}010{,}309$, the insured saves $\$32{,}165$. That saving comes from no premium tax on the $\$540{,}000$ of reimbursements and from a smaller risk provision. In exchange, the insurer now carries credit risk on the reimbursements.
