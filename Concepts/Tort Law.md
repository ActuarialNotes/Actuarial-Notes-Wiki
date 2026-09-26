---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2ee2ad33256623866e62aab054caa03df8c0e02ecc8c558d40ae9ef64704f28a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Tort Law.md
---

**Tort Law** is the body of civil law under which a person injured by another's wrongful act — other than a breach of contract — recovers damages from the wrongdoer. In the United States it is overwhelmingly **state** law, and it is what liability insurance finances: a liability policy pays the sums the insured becomes legally obligated to pay as damages, and tort law decides what those sums are.

> $$R_{\text{pure}} = (1-p)\,D$$
>
> $$R_{\text{modified}} = \begin{cases} (1-p)\,D & p < t \\ 0 & p \geq t \end{cases}$$
>
> $$R_{\text{contributory}} = \begin{cases} D & p = 0 \\ 0 & p > 0 \end{cases}$$

- $D$ is the damages assessed, $p$ the plaintiff's own share of fault, $R$ the recovery, and $t$ the bar in a modified comparative negligence state — $50\%$ (plaintiff barred at half fault) or $51\%$ (barred only when more at fault than the defendants). Pure **contributory negligence** survives only in Alabama, Maryland, North Carolina, Virginia and the District of Columbia.
- **Three bases of liability.** *Intentional torts* (largely excluded as expected or intended injury); *negligence* — duty, breach, causation and damages — the workhorse of auto, premises and professional liability; and *strict liability*, liability without fault, which from the 1960s was extended to defective products and made [[Asbestos]] and most [[Mass Tort|mass tort]] litigation possible.
- **Damages** are economic (medical cost, lost earnings), non-economic (pain and suffering) and, for egregious conduct, [[Punitive Damages|punitive]]. The *collateral source rule* traditionally stops a defendant from reducing the award by benefits the plaintiff received elsewhere; many states have modified it.
- **Joint and several liability** lets a plaintiff collect the whole recoverable amount from any liable defendant — the "deep pocket," usually the insured one. Many states have abolished or narrowed it, for example to economic damages only.
- **Why U.S. severities are high:** civil jury trials, contingency fees, the *American rule* (each side pays its own lawyers), punitive damages and, in most states, no general cap on non-economic damages. Contrast Canada's capped, loser-pays system on [[Tort Litigation]].
- **Actuarial significance.** Because the rules are state-specific, the same accident is worth different amounts in different states, and a change in the law ([[Tort Reform]]) revalues claims already incurred — a calendar-period shock that lands on a diagonal of the [[Development Triangle]]. Florida's 2023 reform (HB 837) switched from pure to modified comparative negligence (a plaintiff more than $50\%$ at fault recovers nothing), the kind of change that must be reflected in rates *and* in reserves for open claims. See also [[Nuclear Verdicts]] and [[Litigation Costs]].

> [!example]- One Accident Under Four Fault Regimes {Example}
> A pedestrian's damages are assessed at $\$800{,}000$. Compute the recovery against the insured driver if the pedestrian is (a) $30\%$ at fault, (b) $50\%$ at fault, under pure comparative, $50\%$-bar modified, $51\%$-bar modified, and contributory negligence.
>
> > [!answer]-
> > **(a) $p = 30\%$:**
> >
> > $$
> > \begin{align*}
> > R_{\text{pure}} &= 0.70 \times \$800{,}000 \\
> > &= \$560{,}000 \\
> > R_{50\%\text{ bar}} &= \$560{,}000 \\
> > R_{51\%\text{ bar}} &= \$560{,}000 \\
> > R_{\text{contributory}} &= \$0
> > \end{align*}
> > $$
> >
> > **(b) $p = 50\%$:**
> >
> > $$
> > \begin{align*}
> > R_{\text{pure}} &= 0.50 \times \$800{,}000 \\
> > &= \$400{,}000 \\
> > R_{50\%\text{ bar}} &= \$0 \\
> > R_{51\%\text{ bar}} &= \$400{,}000 \\
> > R_{\text{contributory}} &= \$0
> > \end{align*}
> > $$
> >
> > The insurer's cost for the identical accident ranges from $\$0$ to $\$560{,}000$ depending only on the state — why liability rates and reserves are built state by state, and why a switch of regime is a reserve event for every open claim.

> [!example]- Joint and Several Liability and the Deep Pocket {Example}
> Damages are $\$1{,}000{,}000$, of which $\$400{,}000$ economic and $\$600{,}000$ non-economic. Fault: plaintiff $10\%$, the insured contractor $20\%$, a co-defendant $70\%$ who is uninsured and insolvent. The state uses pure comparative negligence. What does the contractor's insurer pay under (a) several liability only, (b) full joint and several liability, (c) joint liability for economic damages only?
>
> > [!answer]-
> > **(a) Several only** — the insured pays its own share:
> >
> > $$0.20 \times \$1{,}000{,}000 = \$200{,}000$$
> >
> > **(b) Joint and several** — the insured owes everything the plaintiff can recover:
> >
> > $$(1 - 0.10) \times \$1{,}000{,}000 = \$900{,}000$$
> >
> > Its right of contribution against the insolvent co-defendant is worthless.
> >
> > **(c) Hybrid** — joint for economic, several for non-economic:
> >
> > $$
> > \begin{align*}
> > \text{Economic} &= 0.90 \times \$400{,}000 \\
> > &= \$360{,}000 \\
> > \text{Non-economic} &= 0.20 \times \$600{,}000 \\
> > &= \$120{,}000 \\
> > \text{Total} &= \$360{,}000 + \$120{,}000 \\
> > &= \$480{,}000
> > \end{align*}
> > $$
> >
> > The same verdict costs the insurer $\$200{,}000$, $\$480{,}000$ or $\$900{,}000$. Joint and several liability is why a solvent, insured defendant with a small share of fault can bear most of a loss — and why its reform is a standing item on tort-reform agendas.
