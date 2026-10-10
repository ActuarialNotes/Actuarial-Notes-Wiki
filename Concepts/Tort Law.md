---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:3a84e3e2e6c819dd20d16bf943f03cbfb6a9bf85ee6c32cc4aec1918d552b7bc
  sources:
    - "Cornell LII Wex, \"tort\", whole entry, sha256:5b6ecdfed997e750f3cb76fbd9b5f922438bf14a4f026bc153a25e5c7411144c — https://www.law.cornell.edu/wex/tort"
    - "Cornell LII Wex, \"comparative negligence\", whole entry, sha256:2f19566fa7f19db3c57ce3d0147aeaeebb7535d5e7d45ea9e111281973b8a240 — https://www.law.cornell.edu/wex/comparative_negligence"
    - "Cornell LII Wex, \"contributory negligence\", whole entry, sha256:43c1fd0c3cba3b96f36050e083387b1fef7a79d117cc943b600de65e130958b6 — https://www.law.cornell.edu/wex/contributory_negligence"
    - "Cornell LII Wex, \"joint and several liability\", whole entry, sha256:907bf1f785eab437a0b3da0331f065d205461aad65c49955408c9687146bdf55 — https://www.law.cornell.edu/wex/joint_and_several_liability"
    - "Cornell LII Wex, \"vicarious liability\", whole entry, sha256:57fcdf516d60286d1e2944aa84388f6fc92233e4e3400316d9881acafbc27856 — https://www.law.cornell.edu/wex/vicarious_liability"
    - "Cornell LII Wex, \"respondeat superior\", whole entry, sha256:fd77a3983e2353c2f15adffd48d82d032d09d3a1ab40c5c752bfb4140e2baf02 — https://www.law.cornell.edu/wex/respondeat_superior"
    - "Cornell LII Wex, \"collateral source rule\", whole entry, sha256:68039d6a72a6692b38df2497943d4749ae907b17351045a558d3eb2577fc71c6 — https://www.law.cornell.edu/wex/collateral_source_rule"
    - "Cornell LII Wex, \"contingency fee\", whole entry, sha256:552acce77d4446d301041c9ed79862d310562c183f51bc39ac025dffc7ecc718 — https://www.law.cornell.edu/wex/contingency_fee"
    - "Fla. Stat. s.768.81 (2024), subsections (3) and (6); history note ch. 2023-15, sha256:16124ee06032d6f8ec2bed0cf4921c7791efb85e497a4985eee532154cee2407 — https://www.flsenate.gov/Laws/Statutes/2024/768.81"
    - "Cornell LII Wex, \"products liability\", whole entry, sha256:3932a61c3a07202fd010d53a48a95868ba5ce8965c19b11890b41f59b224daf5 — https://www.law.cornell.edu/wex/products_liability"
  open_findings: 1
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
- **Damages** are economic (medical cost, lost earnings), non-economic (pain and suffering) and, for egregious conduct, punitive. The *collateral source rule* traditionally stops a defendant from reducing the award by benefits the plaintiff received elsewhere; many states have modified it.
- **Joint and several liability** lets a plaintiff collect the whole recoverable amount from any liable defendant — the "deep pocket," usually the insured one — and the defendant who pays may then seek contribution from the other wrongdoers. Many states have abolished or narrowed it, for example to economic damages only.
- **Vicarious liability** makes one party answer for another's tort because of the relationship between them, though the party held liable was not itself at fault. Under *respondeat superior* an employer or principal is liable for torts its employees or agents commit within the scope of the employment or agency, but not for those of independent contractors. Like joint and several liability, it decides who pays a tort claim rather than whether there was a tort.
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

> [!tip]- How it appears on the exam
> - **DISC-IA:** The Insurance Law section's objective on liability concepts affecting tort claims asks who pays when several parties are involved. Questions describe an employee's accident on the job and ask whether the employer is vicariously liable, or give several defendants' shares of fault and ask what one of them pays under joint and several or several liability, as in the second example.
> - **Related objectives:** The defenses that reduce or bar a negligence claim are on [[Defenses Against Negligence]], and the measure of damages is on [[Compensatory Damages]].
