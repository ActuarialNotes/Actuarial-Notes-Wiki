---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:be017e2fc352116dac8987d81f6fda83e0705949d44163061a8bb64771eb7699
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.15 pp.303-304 (PDF pp.315-316); Ch.11 p.197 (PDF p.209), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch.1 p.13 (PDF p.19); Ch.3 p.35 (PDF p.41); Ch.5 p.73 (PDF p.79); Ch.7 pp.84, 96 (PDF pp.90, 102); Ch.13 p.268 (PDF p.274); Ch.15 p.332 (PDF p.338); App. A p.426 (PDF p.432), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Self-Insured Retention.md
---

**Self-Insured Retention (SIR)** is the layer of loss a risk-bearing entity retains on its own balance sheet before any insurance responds. Entities that retain risk this way — self-insured corporations, public entities, captives, and group self-insurance pools — still need [[Unpaid Claims|unpaid claim estimates]] for their retained layer, which is why the reserving syllabus covers non-insurance entities alongside insurers.

> $$\text{Retained Loss} = \sum_i \min(X_i, R)$$

> $$\text{Excess Loss} = \sum_i \max(X_i - R, 0)$$

- **SIR vs. deductible.** Under an SIR the entity itself bears the retained layer and excess coverage attaches above it — Friedland's self-insurance pool of municipalities retains $\$500{,}000$ per occurrence beneath its excess of loss cover. Under a large [[Deductible|deductible]] policy the insurer may instead pay the whole claim and seek reimbursement below the deductible from the insured, and either party may handle the claims inside the deductible. The economics are similar; the cash flow and the claims-handling duty are not.
- **Reserving for a retained layer.** Retained losses are censored at $R$, and larger claims often develop differently from smaller ones, so a [[Development Triangle]] of capped losses develops differently from a gross triangle; retentions also distort severities. Friedland's self-insurance pool projects ultimate claims from reported and paid claims limited to its per-occurrence retention, and the development technique assumes stable retention limits over the experience period — so factors must be built on data capped at the *same* retention (see the loss-limitation issues in [[Large Loss]]).
- **Data volume is often the binding constraint.** Where an entity's own development data is not sufficiently [[Credibility|credible]], actuaries typically rely on [[External Information in Reserving|benchmark]] patterns from comparable lines or industry data — Friedland's self-insurer examples use industry reporting and payment patterns. Self-insurers collect no premium in the insurer's sense, so exposure bases such as payroll, vehicles or property values stand in for it.
- **ALAE treatment must be pinned down.** A deductible may apply to losses alone or to losses plus [[Allocated Loss Adjustment Expense|ALAE]], and the data used must be consistent with the policy's treatment of ALAE.
- **Large deductible programs** are the insurance-market analogue: a deductible set high enough that the insured bears significant risk — Werner's examples are a $\$1$ million per-occurrence workers compensation deductible and a $\$500{,}000$ commercial general liability one. Where the insurer pays the claims and the insured reimburses, the premium carries the cost of processing the [[Deductible Recovery|deductible recoveries]] and a provision for credit risk, since collateral rarely covers it fully; and Friedland's reminder applies on the reserving side, that recoveries such as deductibles must be considered in evaluating the insurer's total reserve position.

![[Media/Figures/Self-Insured_Retention.svg|340]]

> [!example]- Retained vs. Excess Losses at an SIR {Example}
> A self-insured municipality has a $\$500{,}000$ per-occurrence SIR with excess coverage above it. Accident year 2024 produced five claims, valued at ultimate: $\$120{,}000$, $\$380{,}000$, $\$650{,}000$, $\$1{,}400{,}000$, and $\$95{,}000$.
>
> Split ultimate losses between the retained and excess layers.
>
> > [!answer]-
> > Cap each claim at the $\$500{,}000$ retention:
> >
> > | Claim | Ultimate | Retained $\min(X, 500\text{K})$ | Excess $\max(X - 500\text{K}, 0)$ |
> > |---|---|---|---|
> > | 1 | $\$120{,}000$ | $\$120{,}000$ | $\$0$ |
> > | 2 | $\$380{,}000$ | $\$380{,}000$ | $\$0$ |
> > | 3 | $\$650{,}000$ | $\$500{,}000$ | $\$150{,}000$ |
> > | 4 | $\$1{,}400{,}000$ | $\$500{,}000$ | $\$900{,}000$ |
> > | 5 | $\$95{,}000$ | $\$95{,}000$ | $\$0$ |
> > | **Total** | $\$2{,}645{,}000$ | $\$1{,}595{,}000$ | $\$1{,}050{,}000$ |
> >
> > The municipality funds $\$1{,}595{,}000$; the excess carrier funds $\$1{,}050{,}000$. Note that $60\%$ of ultimate cost is retained even though only two of five claims pierced the retention — the retained layer is where the frequency lives.
> >
> > > [!tip] Why the capped triangle behaves differently
> > > Claims 3 and 4 stop developing for the municipality once they reach $\$500{,}000$, but they keep developing for the excess carrier. The retained triangle therefore matures *faster* than the gross triangle, and gross development factors would badly over-state retained ultimate.
