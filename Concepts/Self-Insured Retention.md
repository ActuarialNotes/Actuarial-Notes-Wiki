**Self-Insured Retention (SIR)** is the layer of loss a risk-bearing entity retains on its own balance sheet before any insurance responds. Entities that retain risk this way — self-insured corporations, public entities, captives, and group self-insurance pools — still need [[Unpaid Claims|unpaid claim estimates]] for their retained layer, which is why the reserving syllabus covers non-insurance entities alongside insurers.

> $$\text{Retained Loss} = \sum_i \min(X_i, R)$$

> $$\text{Excess Loss} = \sum_i \max(X_i - R, 0)$$

- **SIR vs. deductible.** Under an SIR the insured handles and pays claims in the retained layer directly, and the insurer's limit sits *above* the retention. Under a [[Deductible|deductible]] the insurer typically pays the claim ground-up and bills the insured back, and the deductible erodes the policy limit. The economics are similar; the cash flow, claims-handling duty, and [[Allocated Loss Adjustment Expense|ALAE]] treatment are not.
- **Reserving for a retained layer is harder than reserving gross.** Retained losses are censored at $R$, so a [[Development Triangle]] of capped losses develops differently from a gross triangle — capping removes the large, slow-developing claims that drive the tail. Development factors must be built on data capped at the *same* retention, not borrowed from gross experience (see the loss-limitation issues in [[Large Loss]]).
- **Data volume is the binding constraint.** A single self-insured entity rarely has [[Credibility|credible]] data at its own retention, so the actuary leans on the [[Complement of Credibility|complement]] — industry or [[External Information in Reserving|external benchmark]] development patterns adjusted to the entity's retention, exposure mix, and jurisdiction.
- **ALAE treatment must be pinned down.** Whether ALAE erodes the retention, sits inside it, or is shared pro-rata materially changes both the retained cost and the triangle being developed. The same question governs the excess carrier's exposure.
- **Collateral and accounting.** Regulators and excess carriers usually require collateral (letters of credit, trusts) sized off the actuarial estimate of retained unpaid claims, so the estimate has direct cash consequences for the entity. Estimates are often required on both an undiscounted and a discounted basis.
- **Large deductible programs** are the insurance-market analogue: a policy written with a deductible of $\$250{,}000$ or more, where the insurer fronts the claims and the insured reimburses. The insurer carries credit risk on the reimbursement and must reserve gross while tracking the [[Deductible Recovery|deductible recoveries]] as an offsetting asset.

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
