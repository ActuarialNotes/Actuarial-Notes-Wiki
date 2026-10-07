---
aliases:
  - Liability Coverage
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:44edf03f12aae44af9783a51214d67cf2a3c7c28feda708da9d3434d1eb9eec9
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Liability Insurance.md
---
**Liability insurance** pays, on the insured's behalf, the sums the insured becomes legally obligated to pay as damages to a third party — for bodily injury or property damage caused by a covered activity, such as owning or using an auto — up to the policy limit, and provides the insured's legal defence. It is third-party cover: the claimant is not the policyholder, and the amount is set by [[Tort Law|tort law]] and the courts rather than by an inspection of the insured's own loss.

> $$\text{Indemnity} = \min(D, L)$$

> $$\text{Insurer cost} = \min(D, L) + \text{Defence costs}$$

- $D$ is the damages for which the insured is legally liable and $L$ the limit of insurance. Under the business auto liability coverage, defence and other supplementary payments are paid in addition to the limit, and the [[Duty to Defend|duty to defend]] ends once the limit is used up in judgments or settlements; some professional liability forms put defence inside the limit instead.
- **Limits.** A combined single limit applies one $L$ per accident to all bodily injury and property damage together; split limits (per person, per accident, property damage) apply separate caps. Higher limits are priced with [[Increased Limits|increased limits factors]].
- **Liability can attach without fault of the insured's own**, through [[Vicarious Liability|vicarious liability]] for an employee driver, and several defendants may share it ([[Joint and Several Liability]]). The insured is typically "anyone using a covered auto" with permission, not only the named insured.
- Liability is the classic [[Long Tail Lines|long-tail]] line: injuries are litigated and settled over years, so [[IBNR]] and development dominate its reserves — unlike first-party physical damage ([[Short Tail Insurance]]).

> [!example]- Combined Single Versus Split Limits {Example}
> A delivery van hits a car. Three occupants are injured, with damages of \$$450{,}000$, \$$380{,}000$ and \$$300{,}000$, and the other driver's \$$120{,}000$ car is destroyed. Defence costs are \$$90{,}000$. How much does the insurer pay in damages, and how much falls on the insured, if the policy has (a) a \$$1{,}000{,}000$ combined single limit, (b) split limits of \$$250{,}000$ / \$$500{,}000$ / \$$100{,}000$?
>
> > [!answer]-
> > Total damages are \$$1{,}250{,}000$.
> >
> > (a) One limit for the whole accident:
> >
> > $$
> > \begin{align*}
> > \text{Insurer pays} &= \min(1{,}250{,}000,\ 1{,}000{,}000) \\
> > &= \$1{,}000{,}000 \\
> > \text{Insured retains} &= \$250{,}000
> > \end{align*}
> > $$
> >
> > (b) Each injured person is capped at \$$250{,}000$, the accident at \$$500{,}000$, property damage at \$$100{,}000$:
> >
> > $$
> > \begin{align*}
> > \text{BI} &= \min(250{,}000 \times 3,\ 500{,}000) \\
> > &= \$500{,}000 \\
> > \text{PD} &= \min(120{,}000,\ 100{,}000) \\
> > &= \$100{,}000 \\
> > \text{Insured retains} &= 1{,}250{,}000 - 600{,}000 \\
> > &= \$650{,}000
> > \end{align*}
> > $$
> >
> > In both cases the \$$90{,}000$ of defence is paid on top of the damages. The combined single limit leaves the insured with \$$400{,}000$ less exposure for the same accident.

> [!example]- What a Higher Limit Costs {Example}
> Liability claims per vehicle are Poisson with mean $0.05$, and claim size is Pareto with $\alpha = 2$, $\theta = 200{,}000$, so $E[X \wedge u] = 200{,}000\left[1 - \frac{200{,}000}{200{,}000 + u}\right]$. Find the expected loss cost per vehicle at a \$$100{,}000$ basic limit and at \$$1{,}000{,}000$, and the increased limits factor.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[X \wedge 100{,}000] &= 200{,}000\left(1 - \tfrac{2}{3}\right) \\
> > &= 66{,}667 \\
> > E[X \wedge 1{,}000{,}000] &= 200{,}000\left(1 - \tfrac{1}{6}\right) \\
> > &= 166{,}667 \\
> > \text{ILF} &= \frac{166{,}667}{66{,}667} \\
> > &= 2.50 \\[4pt]
> > \text{Loss cost at } \$100\text{K} &= 0.05 \times 66{,}667 \\
> > &= \$3{,}333 \\
> > \text{Loss cost at } \$1\text{M} &= 0.05 \times 166{,}667 \\
> > &= \$8{,}333
> > \end{align*}
> > $$
> >
> > Ten times the limit costs two and a half times the loss cost: the heavy tail puts most of the expected loss above the basic limit.

> [!tip]- How it appears on the exam
> - **DISC-RM** (*Business Auto Underwriting Considerations – Liability Coverage*): a written or scenario question on what an underwriter weighs for the liability exposure of a commercial fleet — factors such as vehicle type and weight, how and how far the vehicles are driven, the industry, driver selection and records, and vehicle maintenance — and why each moves expected liability losses.
> - Expect a described account and a question on which feature most raises the liability hazard, or which underwriting action (driver standards, a higher retention, a limit change) addresses it.
> - Pairs with the business auto form's insuring agreement: who is an insured, what a covered auto is, and that defence is in addition to the limit.

> [!warning]- Exam traps
> - **Treating defence as eroding the limit.** Under the business auto liability coverage it is paid on top; an answer that subtracts defence from the \$$1{,}000{,}000$ has applied a professional-liability-style form.
> - **Applying split limits per claimant only.** The per-accident cap binds after the per-person caps: $3 \times 250{,}000 = 750{,}000$ is cut to \$$500{,}000$.
> - **First-party versus third-party.** Damage to the insured's *own* vehicle is physical damage coverage, not liability; adding it to the liability claim is a classification error.
