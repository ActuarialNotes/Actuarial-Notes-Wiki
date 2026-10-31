---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:fed3ea4e151f90a43ac4dac4e15011d1b03800410b7365903f5089370dc879e9
  sources:
    - "Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.2 p.18 (PDF p.23), sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf"
    - "Bahnemann, Distributions for Actuaries, CAS Monograph 2 (2015), printed p.155 (PDF p.167), sha256:d4d172f9646852ab018ae3f0df95e5fbdbfabda4db55d6d4596977ed2eaa3ef8 — https://www.casact.org/sites/default/files/2021-03/8_Bahnemann.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Large Deductible Policy.md
---

A **Large Deductible Policy** is a commercial policy — commonly workers compensation, also general and auto liability — whose per-occurrence deductible is high enough that the insured bears a significant share of its own losses (Werner's example is a $\$1$ million workers compensation deductible). It is a loss-sensitive arrangement: the insured's total cost depends on its own claims, and the premium covers only what the insurer still bears.

> $$\text{Premium} = \frac{\text{Excess Losses} + \text{ALAE} + F + \text{CR} + \text{RM}}{1 - V - Q}$$

> $$\text{Excess Losses} = E[X] \times \big(1 - \text{LER}(d)\big)$$

- $E[X]$ is expected ground-up loss, $\text{LER}(d)$ the [[Loss Elimination Ratio|loss elimination ratio]] at deductible $d$ (so $1 - \text{LER}$ is the excess ratio), $F$ fixed expenses including the cost of processing deductibles, CR a credit risk provision, RM a risk margin, $V$ the variable expense and $Q$ the profit provision. This is Werner & Modlin's premium formula; otherwise the pricing follows ordinary [[Deductible Rating|deductible rating]].
- **Werner's four additional considerations:**
  - *Claims handling* — usually the insurer handles every claim, so the premium must cover handling cost even on claims that never pierce the deductible; if the insured handles them, price for the risk of leakage above the deductible.
  - *Application of the deductible* — to loss only, or to loss plus ALAE; the LERs must be computed on data consistent with the policy terms.
  - *Deductible processing* — where the insurer pays the whole claim and bills the insured back, the premium carries the cost of invoicing and monitoring and a provision for the insured's inability to pay; collateral rarely covers that credit risk fully.
  - *Risk margin* — losses above a large deductible are more uncertain than those below, so the profit margin may need to rise.
- **Excess ratios.** The charge for per-occurrence excess losses is often estimated by applying an expected ratio of excess to total losses to the total loss estimate for the policy, the ratios being estimated from loss distributions as in [[Distributions for Actuaries (Bahnemann)|Distributions for Actuaries]], and they are **leveraged**: with $d$ fixed, the excess layer grows faster than ground-up severity.
- Many programs also cap the insured's total reimbursements with an **aggregate limit**; the insurer's expected payments above it are an additional insurance charge, much like the charge for a [[Retrospective Rating|retro]] maximum.
- **Fisher et al.'s pricing.** The premium for a large deductible must cover the same components that a retro plan's premium covers, with one exception: it does not cover the expected cost of losses below both the per-occurrence deductible and the aggregate deductible limit. So it covers the expected per-occurrence excess losses, the expected aggregate excess losses, expenses and an underwriting profit provision. The aggregate charge applies only to the limited losses: total expected loss is the expected excess of the deductible plus the insurance charge times the expected limited losses, read from a Table M$_D$, from the unlimited [[Table M]] through [[Insurance Charge Reflecting Loss Limitation (ICRLL)|ICRLL]], or combined with the excess in [[Table L]] (see the [[Lee Diagram]]). Premium tax and some premium-based assessments are lower, because deductible reimbursements are not premium, and commission may be lower if it is a percentage of net premium.
- **Against excess over an SIR** (Fisher et al.): under a [[Self-Insured Retention|self-insured retention]] the insured adjusts and pays its own claims (or hires a third-party administrator), whereas a large deductible insurer pays all claims from the first dollar and bills the insured back. So the excess-over-SIR insurer: incurs no ALAE on claims within the retention, and the retention generally applies to loss only; includes only a minimal amount of ULAE in its premium, which also lowers the base for premium taxes and premium-based assessments even further; takes on no credit risk for the loss-sensitive feature, since it is not responsible for claims until the insured has paid them; and has a policy limit generally *not eroded* by the retention ($\$1$m over a $\$250$k SIR covers $\$250$k to $\$1{,}250$k, while a $\$1$m large deductible policy with a $\$250$k deductible covers only $\$250$k to $\$1$m).
- The reserving counterpart — estimating and collecting what insureds owe back — is [[Deductible Recovery]]. Related mechanisms: [[Loss Sensitive Rating]], [[Commercial Lines Rating]].
- How LAE is split and loaded onto loss is on [[Loss and Loss Adjustment Expense]].

> [!example]- Pricing a Workers Compensation Large Deductible {Example}
> Expected ground-up losses are $\$2{,}400{,}000$; $\text{LER}(\$250{,}000) = 75\%$. The insurer handles and pays every claim and bills back amounts under the deductible, which applies to loss only; ALAE is $9\%$ of ground-up losses and is not reduced by the deductible. Fixed expenses are $\$60{,}000$; deductible processing costs $3\%$ and credit risk $1.5\%$ of expected deductible reimbursements; the risk margin is $12\%$ of excess losses; $V = 10\%$ and $Q = 3\%$.
>
> Compute the premium and compare with a guaranteed-cost (no deductible) premium.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Excess losses} &= \$2{,}400{,}000 \times 0.25 = \$600{,}000 \\
> > \text{Reimbursed} &= \$2{,}400{,}000 \times 0.75 = \$1{,}800{,}000 \\
> > \text{ALAE} &= 0.09 \times \$2{,}400{,}000 = \$216{,}000 \\
> > \text{Processing} &= 0.03 \times \$1{,}800{,}000 = \$54{,}000 \\
> > \text{Credit risk} &= 0.015 \times \$1{,}800{,}000 = \$27{,}000 \\
> > \text{Risk margin} &= 0.12 \times \$600{,}000 = \$72{,}000
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{Numerator} &= 600{,}000 + 216{,}000 + 60{,}000 \\
> > &\quad + 54{,}000 + 27{,}000 + 72{,}000 \\
> > &= \$1{,}029{,}000 \\
> > \text{Premium} &= \frac{\$1{,}029{,}000}{1 - 0.10 - 0.03} \\
> > &= \$1{,}182{,}759
> > \end{align*}
> > $$
> >
> > A guaranteed-cost policy would cost $(\$2{,}400{,}000 + \$216{,}000 + \$60{,}000) / 0.87 = \$3{,}075{,}862$. The insured's expected total outlay under the large deductible is $\$1{,}182{,}759 + \$1{,}800{,}000 = \$2{,}982{,}759$: in this model, variable expense and profit are no longer loaded on the retained layer, which outweighs the processing, credit and risk charges, and the insured keeps the cash for its retained losses until they are paid. In exchange it takes on the volatility of $\$1.8$ million of its own losses.

> [!example]- Leveraged Trend in the Excess Layer {Example}
> Three claims, ground-up: $\$200{,}000$, $\$400{,}000$ and $\$900{,}000$. The deductible is $\$250{,}000$ per occurrence. Severity inflation of $8\%$ applies to every claim. How do the insured's retained losses and the insurer's excess losses change?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Excess before} &= 0 + 150{,}000 + 650{,}000 = \$800{,}000 \\
> > \text{Excess after} &= 0 + 182{,}000 + 722{,}000 = \$904{,}000 \\
> > \text{Change} &= 904 / 800 - 1 = +13.0\% \\
> > \text{Retained before} &= 200{,}000 + 250{,}000 + 250{,}000 = \$700{,}000 \\
> > \text{Retained after} &= 216{,}000 + 250{,}000 + 250{,}000 = \$716{,}000 \\
> > \text{Change} &= 716 / 700 - 1 = +2.3\%
> > \end{align*}
> > $$
> >
> > Ground-up losses grew $8\%$; the insurer's layer grew $13\%$ and the insured's only $2.3\%$, because every dollar of inflation on a claim already above $d$ lands in the excess layer. A large deductible left unchanged for several years quietly shifts cost to the insurer, so both the excess losses and the deductible level need trending.
