---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:98a09c3877a1e71d8558941b3e51589baaf84745ea2faabab4d2ab382b234cc5
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.15 pp.303-304 (PDF pp.315-316); Ch.11 p.197 (PDF p.209), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch.1 p.13 (PDF p.19); Ch.3 p.35 (PDF p.41); Ch.5 p.73 (PDF p.79); Ch.7 pp.84, 96 (PDF pp.90, 102); Ch.13 p.268 (PDF p.274); Ch.15 p.332 (PDF p.338); App. A p.426 (PDF p.432), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS study note, 2019), §5 Self-Insured Retentions, pp.23-24 (PDF 28-29: insurer reimburses only after the insured has paid), sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Self-Insured Retention.md
---

![[Media/Figures/Self-Insured_Retention.svg|340]]

A **Self-Insured Retention** (SIR) is the layer of loss a risk-bearing entity retains on its own balance sheet before any insurance responds. Entities that retain risk this way, such as self-insured corporations, public entities, captives and group self-insurance pools, still need [[Unpaid Claims|unpaid claim estimates]] for their retained layer. For claims $X_i$ and a per-occurrence retention $R$, the retained loss is

> $$\text{Retained Loss} = \sum_i \min(X_i, R)$$

and the loss excess of the retention, paid by the excess insurer, is

> $$\text{Excess Loss} = \sum_i \max(X_i - R, 0)$$

> [!example]- A self-insured municipality has a $\$500{,}000$ per-occurrence SIR with excess coverage above it. Its five claims, at ultimate, are $\$120{,}000$, $\$380{,}000$, $\$650{,}000$, $\$1{,}400{,}000$ and $\$95{,}000$. How are the losses split between the retained and excess layers? {Example}
> - Each claim is capped at $\$500{,}000$ for the retained layer, and the excess layer takes the rest.
>
> | Claim | Ultimate | Retained | Excess |
> | --- | --- | --- | --- |
> | 1 | $\$120{,}000$ | $\$120{,}000$ | $\$0$ |
> | 2 | $\$380{,}000$ | $\$380{,}000$ | $\$0$ |
> | 3 | $\$650{,}000$ | $\$500{,}000$ | $\$150{,}000$ |
> | 4 | $\$1{,}400{,}000$ | $\$500{,}000$ | $\$900{,}000$ |
> | 5 | $\$95{,}000$ | $\$95{,}000$ | $\$0$ |
> | Total | $\$2{,}645{,}000$ | $\$1{,}595{,}000$ | $\$1{,}050{,}000$ |
>
> - **The municipality funds $\$1{,}595{,}000$** and the excess insurer $\$1{,}050{,}000$.
> - 60% of the ultimate cost is retained, although only two of the five claims pierced the retention.

## Self-insured retention and deductible

Under an SIR the entity itself bears the retained layer and excess coverage attaches above it. Friedland's self-insurance pool of municipalities retains $\$500{,}000$ per occurrence beneath its excess of loss cover. Under a large [[Deductible Rating|deductible]] policy, the insurer may instead pay the whole claim and seek reimbursement below the deductible from the insured, and either party may handle the claims inside the deductible. The economics are similar, but the cash flow, the exposure to [[Interest Rate Risk|interest rate risk]] and the claims-handling duty are not.

On a [[Large Deductible Policy|large deductible policy]], where the insurer pays the claims and the insured reimburses, the premium carries the cost of processing the [[Deductible Recovery|deductible recoveries]] and a provision for credit risk, since collateral rarely covers it fully. On the reserving side, recoveries such as deductibles must be considered in evaluating the insurer's total reserve position.

## Reserving for a retained layer

Retained losses are censored at $R$, and larger claims often develop differently from smaller ones, so a [[Development Triangle|development triangle]] of capped losses develops differently from a gross triangle. Friedland's self-insurance pool projects ultimate claims from reported and paid claims limited to its per-occurrence retention. The development technique assumes stable retention limits over the experience period, so factors must be built on data capped at the *same* retention ([[Large Loss]]). A deductible may apply to losses alone or to losses plus [[Allocated Loss Adjustment Expense|ALAE]], and the data must be consistent with the treatment of ALAE.

Where an entity's own development data is not sufficiently [[Credibility|credible]], actuaries typically rely on [[External Information in Reserving|benchmark]] patterns from comparable lines or industry data. Self-insurers collect no premium in the insurer's sense, so exposure bases such as payroll, vehicles or property values stand in for it.

> [!trap] Developing retained losses with gross factors
> Claims capped at the retention stop developing for the self-insurer once they reach it, while they keep developing for the excess insurer. The retained triangle matures faster than the gross one, so gross development factors overstate the retained ultimate.
