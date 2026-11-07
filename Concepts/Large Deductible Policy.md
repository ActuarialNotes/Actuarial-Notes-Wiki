---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:918bf98ddc9a96edbd82e8bfe53d0ce11b0070594e48088f11c8bd599e627768
  sources:
    - "Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.2 p.18 (PDF p.23), sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf"
    - "Bahnemann, Distributions for Actuaries, CAS Monograph 2 (2015), printed p.155 (PDF p.167), sha256:d4d172f9646852ab018ae3f0df95e5fbdbfabda4db55d6d4596977ed2eaa3ef8 — https://www.casact.org/sites/default/files/2021-03/8_Bahnemann.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Large Deductible Policy.md
---

A **Large Deductible Policy** is a commercial policy, commonly workers compensation or general or auto liability, whose per-occurrence deductible is high enough that the insured bears a significant share of its own losses. Werner and Modlin's example is a $\$1$ million workers compensation deductible. It is a loss-sensitive arrangement, because the insured's total cost depends on its own claims, and the premium covers only what the insurer still bears, which is

> $$\text{Premium} = \frac{\text{Excess Losses} + \text{ALAE} + F + \text{CR} + \text{RM}}{1 - V - Q_T}$$

- $\text{ALAE}$ is the allocated loss adjustment expense, which the deductible may not reduce.
- $F$ is the fixed expenses, including the cost of processing deductibles.
- $\text{CR}$ is the credit risk provision and $\text{RM}$ the risk margin.
- $V$ is the variable expense provision and $Q_T$ the target profit provision.

The excess losses are the expected losses above the deductible $d$:

> $$\text{Excess Losses} = E[X] \times \big(1 - \text{LER}(d)\big)$$

- $E[X]$ is the expected ground-up loss.
- $\text{LER}(d)$ is the [[Loss Elimination Ratio|loss elimination ratio]] at deductible $d$, so $1 - \text{LER}(d)$ is the excess ratio.

Otherwise the pricing follows ordinary [[Deductible Rating|deductible rating]].

> [!example]- A commercial general liability policy has a $\$500{,}000$ per-occurrence deductible on losses only, and expected ground-up losses of $\$1{,}000{,}000$, of which 95% fall below the deductible. ALAE is 11% of total losses. Fixed expenses are $\$50{,}000$, deductible processing 4% and credit risk 1% of the losses below the deductible, and the risk margin 10% of excess losses. Variable expenses and profit are 15%. What is the premium? {Example}
> - The excess losses are $1{,}000{,}000 \times (1 - 0.95) = \$50{,}000$.
> - The deductible does not reduce ALAE, which is $0.11 \times 1{,}000{,}000 = \$110{,}000$.
> - The losses below the deductible are $\$950{,}000$, so processing costs $0.04 \times 950{,}000 = \$38{,}000$ and credit risk $0.01 \times 950{,}000 = \$9{,}500$.
> - The risk margin is $0.10 \times 50{,}000 = \$5{,}000$.
> - The premium is $(50{,}000 + 110{,}000 + 50{,}000 + 38{,}000 + 9{,}500 + 5{,}000)/0.85 = \$308{,}824$.

## Pricing considerations for a large deductible

Werner and Modlin add four considerations to those of a small deductible:

1. **Claims handling.** Usually the insurer handles every claim, so the premium must cover handling cost even on claims that never pierce the deductible. If the insured handles them, the insurer prices for the risk of leakage above the deductible.
2. **Application of the deductible.** The deductible applies to loss only, or to loss plus ALAE, and the loss elimination ratios must be computed on data consistent with the policy terms.
3. **Deductible processing.** Where the insurer pays the whole claim and bills the insured back, the premium carries the cost of invoicing and monitoring and a provision for the insured's inability to pay. Collateral rarely covers that credit risk fully.
4. **Risk margin.** Losses above a large deductible are more uncertain than those below, so the profit margin may need to rise.

## Large deductible and guaranteed cost

On the retained layer, the insured pays its own losses instead of a premium loaded for variable expense and profit. It keeps the cash for its retained losses until they are paid, and in exchange takes on their volatility.

> [!example]- Expected ground-up workers compensation losses are $\$2{,}400{,}000$, and $\text{LER}(\$250{,}000) = 75\%$. ALAE is 9% of ground-up losses and is not reduced by the deductible. Fixed expenses are $\$60{,}000$, deductible processing costs 3% and credit risk 1.5% of expected deductible reimbursements, the risk margin is 12% of excess losses, $V = 10\%$ and $Q_T = 3\%$. How does the insured's expected outlay compare with a guaranteed-cost policy? {Example}
> - The excess losses are $2{,}400{,}000 \times 0.25 = \$600{,}000$, and the reimbursements $2{,}400{,}000 \times 0.75 = \$1{,}800{,}000$.
> - ALAE is $\$216{,}000$, processing $0.03 \times 1{,}800{,}000 = \$54{,}000$, credit risk $\$27{,}000$ and the risk margin $0.12 \times 600{,}000 = \$72{,}000$.
> - The premium is $(600{,}000 + 216{,}000 + 60{,}000 + 54{,}000 + 27{,}000 + 72{,}000)/0.87 = \$1{,}182{,}759$.
> - The insured's expected total outlay under the large deductible is $\$1{,}182{,}759 + \$1{,}800{,}000 = \$2{,}982{,}759$.
> - A guaranteed-cost policy would cost $(2{,}400{,}000 + 216{,}000 + 60{,}000)/0.87 = \$3{,}075{,}862$.
> - Variable expense and profit are no longer loaded on the retained layer, which outweighs the processing, credit and risk charges.

## Excess ratios and trend

An insured's own losses above a high $d$ are too sparse to price from, so the charge for per-occurrence excess losses is often estimated by applying an expected excess ratio to the policy's total expected loss. The ratios are estimated from size-of-loss distributions, as in [[Distributions for Actuaries (Bahnemann)|Distributions for Actuaries]], and they are **leveraged**: with $d$ fixed, the excess layer grows faster than ground-up severity.

> [!example]- Three ground-up claims are $\$200{,}000$, $\$400{,}000$ and $\$900{,}000$, and the deductible is $\$250{,}000$ per occurrence. Severity inflation of 8% applies to every claim. How do the retained and excess losses change? {Example}
> - The excess losses rise from $0 + 150{,}000 + 650{,}000 = \$800{,}000$ to $0 + 182{,}000 + 722{,}000 = \$904{,}000$, which is 13.0%.
> - The retained losses rise from $200{,}000 + 250{,}000 + 250{,}000 = \$700{,}000$ to $\$716{,}000$, which is 2.3%.
> - Ground-up losses grew $8\%$, the insurer's layer grew $13\%$ and the insured's only $2.3\%$, because every dollar of inflation on a claim already above $d$ lands in the excess layer.

## Aggregate deductible limit

Many programs also cap the insured's total reimbursements with an **aggregate limit**. The insurer's expected payments above it are an additional insurance charge, much like the charge for a [[Retrospective Rating|retrospective rating]] maximum. Fisher et al. price a large deductible for the same components as a retrospective plan's premium, except the expected losses below both the per-occurrence deductible and the aggregate limit. The aggregate charge applies only to the limited losses, read from a Table M$_D$, from the unlimited [[Table M]] through the [[Insurance Charge Reflecting Loss Limitation (ICRLL)|ICRLL]], or together with the excess in [[Table L]] ([[Lee Diagram]]). The total expected loss is then the expected loss excess of the deductible plus the aggregate charge times the expected limited loss. Premium tax and some premium-based assessments are lower, because deductible reimbursements are not premium.

## Large deductible and self-insured retention

Under a [[Self-Insured Retention|self-insured retention]] the insured adjusts and pays its own claims, or hires a third-party administrator, whereas a large deductible insurer pays all claims from the first dollar and bills the insured back. Fisher et al. note that the excess-over-SIR insurer therefore:

1. Incurs no ALAE on claims within the retention, which generally applies to loss only.
2. Includes only a minimal amount of ULAE in its premium, which lowers the base for premium taxes and assessments further.
3. Takes on no credit risk, since it is not responsible for claims until the insured has paid them.
4. Has a policy limit generally not eroded by the retention. A $\$1$ million policy over a $\$250{,}000$ SIR covers $\$250{,}000$ to $\$1{,}250{,}000$, while a $\$1$ million large deductible policy with a $\$250{,}000$ deductible covers $\$250{,}000$ to $\$1{,}000{,}000$.

The reserving counterpart, estimating and collecting what insureds owe back, is [[Deductible Recovery]]. How LAE is loaded onto loss is on [[Loss and Loss Adjustment Expense]].
