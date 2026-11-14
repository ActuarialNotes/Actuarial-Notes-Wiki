---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:950b97c8051bca5e1d6b9b1b42ddfb644dbbcdde7f77e0869c26598967212b1c
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
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Tort Law.md
---

**Tort Law** is the body of civil law under which a person injured by another's wrongful act, other than a breach of contract, recovers damages from the wrongdoer. In the United States it is overwhelmingly state law, and it is what liability insurance finances: a liability policy pays the sums the insured becomes legally obligated to pay as damages, and tort law decides what those sums are.

Tort law recognizes three bases of liability:

1. **Intentional torts**, which liability policies largely exclude as expected or intended injury ([[Intentional Tort]]).
2. **[[Negligence]]**: duty, breach, causation and damages, the basis of most auto, premises and professional liability claims.
3. **[[Strict Liability|Strict liability]]**, liability without fault, which from the 1960s was extended to defective products and made [[Asbestos]] and most [[Mass Tort|mass tort]] litigation possible.

## Comparative and contributory negligence

A plaintiff's own fault reduces or bars the recovery, and the rule depends on the state. Under pure comparative negligence, the recovery of a plaintiff whose damages are assessed at $D$ and whose own share of fault is $p$ is

> $$R_{\text{pure}} = (1-p)\,D$$

Under modified comparative negligence, the plaintiff recovers nothing at or above a bar $t$, so the recovery is

> $$R_{\text{modified}} = \begin{cases} (1-p)\,D & p < t \\ 0 & p \geq t \end{cases}$$

- $t$ is $50\%$ in a state where the plaintiff is barred at half fault, or $51\%$ in one where the plaintiff is barred only when more at fault than the defendants.

Under contributory negligence, a plaintiff at fault at all recovers nothing, so the recovery is

> $$R_{\text{contributory}} = \begin{cases} D & p = 0 \\ 0 & p > 0 \end{cases}$$

Pure contributory negligence survives only in Alabama, Maryland, North Carolina, Virginia and the District of Columbia.

> [!example]- What does a pedestrian with $\$800{,}000$ of damages recover at 30% and at 50% fault, under each of the four rules? {Example}
> - At $p = 30\%$, pure comparative gives $0.70 \times \$800{,}000 = \$560{,}000$.
> - At $30\%$ the plaintiff is under both the $50\%$ and the $51\%$ bar, so both modified rules also give $\$560{,}000$, and contributory negligence gives $\$0$.
> - At $p = 50\%$, pure comparative gives $0.50 \times \$800{,}000 = \$400{,}000$.
> - At $50\%$ the $50\%$ bar applies and gives $\$0$, the $51\%$ bar does not and gives $\$400{,}000$, and contributory negligence gives $\$0$.
> - The insurer's cost for the identical accident ranges from $\$0$ to $\$560{,}000$ depending only on the state.

The defenses that reduce or bar a negligence claim are on [[Defenses Against Negligence]].

## Damages

Damages are economic (medical cost, lost earnings), non-economic (pain and suffering) and, for egregious conduct, punitive ([[Compensatory Damages]]). The *collateral source rule* traditionally stops a defendant from reducing the award by benefits the plaintiff received elsewhere. Many states have modified it.

## Joint and several liability

Under joint and several liability, each liable defendant owes the whole recoverable amount, so the plaintiff may collect it from any one of them regardless of that defendant's share of fault. The plaintiff usually collects from the "deep pocket", the insured defendant. The defendant who pays may then seek contribution from the other wrongdoers, but that right is worthless against an insolvent co-defendant, so the paying defendant or its insurer bears the uncollectable share.

Under several liability, each defendant owes only the share of damages equal to its percentage of fault. Many states have abolished or narrowed joint and several liability, for example to economic damages only.

> [!example]- What does the insured contractor's insurer pay under several, joint and several, and joint-for-economic-only liability? {Example}
> Damages are $\$1{,}000{,}000$, of which $\$400{,}000$ is economic and $\$600{,}000$ non-economic. Fault is plaintiff $10\%$, the insured contractor $20\%$, and a co-defendant $70\%$ who is uninsured and insolvent. The state uses pure comparative negligence.
>
> > [!answer]-
> > - Under several liability only, the contractor pays its own share, $0.20 \times \$1{,}000{,}000 = \$200{,}000$.
> > - Under joint and several liability, it owes everything the plaintiff can recover, $(1 - 0.10) \times \$1{,}000{,}000 = \$900{,}000$, and its right of contribution against the insolvent co-defendant is worthless.
> > - Joint for economic damages, it owes $0.90 \times \$400{,}000 = \$360{,}000$ of the economic damages.
> > - Several for non-economic damages, it owes $0.20 \times \$600{,}000 = \$120{,}000$ of the non-economic damages.
> > - The hybrid total is $\$360{,}000 + \$120{,}000 = \$480{,}000$.

## Vicarious liability

Vicarious liability makes one party answer for another's tort because of the relationship between them, though the party held liable was not itself at fault. Under *respondeat superior* an employer or principal is liable for torts its employees or agents commit within the scope of the employment or agency, but not for those of independent contractors. Like joint and several liability, it decides who pays a tort claim rather than whether there was a tort.

## Tort law and claim costs

U.S. severities are high because of civil jury trials, contingency fees, the *American rule* (each side pays its own lawyers), punitive damages and, in most states, no general cap on non-economic damages. Canada's capped, loser-pays system is on [[Tort Litigation]].

Because the rules are state-specific, the same accident is worth different amounts in different states. A change in the law ([[Tort Reform]]) revalues claims already incurred, a calendar-period shock that lands on a diagonal of the [[Development Triangle]]. Florida's 2023 reform (HB 837) switched from pure to modified comparative negligence, under which a plaintiff more than $50\%$ at fault recovers nothing. A change like that must be reflected in rates and in reserves for open claims. See also [[Nuclear Verdicts]] and [[Litigation Costs]].

> [!trap] Confusing the 50% bar with the 51% bar
> A plaintiff exactly $50\%$ at fault recovers nothing under a $50\%$ bar but recovers half the damages under a $51\%$ bar. Check whether the bar applies at half fault or only at more than half.
