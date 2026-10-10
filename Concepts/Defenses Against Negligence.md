**Defenses Against Negligence** are the grounds on which a defendant who is otherwise liable in [[Negligence|negligence]] avoids or reduces paying damages. Some turn on the plaintiff's own conduct (contributory negligence, comparative negligence, assumption of risk), some on the defendant's status (immunities), and some on time (statutes of limitations and repose). They are state law, so the same accident can be worth the full damages, a reduced amount or nothing depending on where it happened.

> $$R = \begin{cases} D & \text{no plaintiff fault} \\ (1-p)\,D & \text{pure comparative} \\ (1-p)\,D \cdot \mathbf{1}\{p < 0.50\} & \text{modified, 50\% bar} \\ (1-p)\,D \cdot \mathbf{1}\{p < 0.51\} & \text{modified, 51\% bar} \\ D \cdot \mathbf{1}\{p = 0\} & \text{contributory} \end{cases}$$

- **Symbols:** $D$ is the damages the plaintiff proves, $p$ is the plaintiff's share of fault, $R$ is what the plaintiff recovers, and $\mathbf{1}\{\cdot\}$ is 1 when the condition holds and 0 otherwise. A last clear chance finding lifts the contributory negligence bar, and a primary assumption of risk, an immunity or an expired time limit gives $R = 0$ whatever $p$ is.
- **Contributory negligence:** The common law rule bars a plaintiff who was negligent in causing their own harm from recovering anything, so a plaintiff 1% at fault recovers nothing from a defendant 99% at fault. Its advantage is that a court need not measure shares of blame, and its drawback is outcomes many see as unfair. It survives only in Alabama, Maryland, North Carolina, Virginia and the District of Columbia.
- **Last clear chance:** Courts softened the contributory negligence bar with this doctrine: a negligent plaintiff can still recover if the defendant had the last opportunity to avoid the accident and failed to take it. In *Davies v. Mann* the plaintiff negligently left a donkey tied by a road, and recovered from a defendant who drove into it at speed, because the defendant had the last clear chance. A defendant can also argue that it was the plaintiff who had the last clear chance.
- **Comparative negligence:** Most states replaced the bar with comparative negligence, which reduces the award by the plaintiff's share of fault. Under *pure* comparative negligence, followed in roughly a third of the states including California and New York, a plaintiff 99% at fault still recovers 1% of the damages. Under *modified* comparative negligence, the majority approach, the plaintiff recovers the reduced amount only below a threshold: under the 50% bar rule a plaintiff 50% or more at fault recovers nothing, and under the 51% bar rule only a plaintiff 51% or more at fault is barred.
- **Assumption of risk:** A plaintiff who voluntarily accepts a known risk may be unable to recover for harm from it. *Express* assumption is usually a signed waiver, enforced within its terms unless it is against public policy. *Implied* assumption requires that the plaintiff knew and appreciated the risk. *Primary* implied assumption means the defendant owed no duty at all against risks inherent in the activity, such as contact in a sport, so it remains a complete bar. *Secondary* implied assumption, where the defendant did owe and breach a duty, is folded into comparative negligence in many states, reducing rather than barring recovery.
- **Immunities:** *Sovereign immunity* means a government cannot be sued without its consent. The federal government waived it for many tort claims in the Federal Tort Claims Act, and states may waive theirs in whole or in part. *Charitable immunity* once shielded charities from tort suits, but almost every state abrogated or limited it between the 1940s and 1992. *Interspousal immunity*, which barred spouses from suing each other, has been abrogated or modified in many states, and very few still recognize it.
- **Statutes of limitations:** A limitations statute bars a claim filed too long after it accrues. For personal injury the claim accrues when the injury occurred or was discovered, or when it should reasonably have been discovered, and the period varies by state and by type of claim. Equitable tolling can pause the clock when a diligent plaintiff is prevented from suing by extraordinary circumstances. See [[Limitation Period]].
- **Statutes of repose:** A repose statute runs from the defendant's last culpable act, such as designing or manufacturing a product, not from the injury. It can bar a claim before the plaintiff is even hurt, and its period is fixed: it is not extended by tolling or estoppel. It reflects a legislative judgment that a defendant should be free of liability after a set time, which is why it matters most for long-tail exposures such as [[Products Liability|products]].

> [!example]- One Accident, Five Rules {Example}
> A cyclist riding at night without a light is struck by a driver who was speeding. Her damages are \$400,000. The jury finds the cyclist 30% at fault for riding without a light and a further 20% at fault for knowingly riding in a closed construction zone, a secondary assumption of risk that the state folds into comparative fault. What does she recover under pure comparative negligence, the 50% bar, the 51% bar and contributory negligence? What changes in the contributory negligence state if the driver saw her in time to stop but was looking at a phone?
>
> > [!answer]-
> > Her combined share of fault is $p = 0.30 + 0.20 = 0.50$.
> > $$
> > \begin{align*}
> > R_{\text{pure}} &= (1 - 0.50)(400{,}000) \\
> > &= 200{,}000 \\
> > R_{50\%\text{ bar}} &= 0 \\
> > R_{51\%\text{ bar}} &= 200{,}000 \\
> > R_{\text{contributory}} &= 0
> > \end{align*}
> > $$
> > At exactly half the fault she is barred under the 50% rule but not under the 51% rule. In the contributory negligence state, if the driver had the last clear chance to avoid her and failed to take it, the bar is lifted and the driver's insurer pays the full \$400,000.

> [!example]- Which Defense Applies? {Example}
> Name the defense each defendant raises.
>
> 1. A skydiving school is sued by a customer hurt on a jump, who signed a release of the school's liability for the jump's ordinary risks.
> 2. A baseball club is sued by a fan hit by a foul ball in the stands.
> 3. A state highway department is sued over a pothole, in a state that has waived immunity only for claims filed with its claims board.
> 4. A worker injured in 2024 by a press manufactured in 2010 sues the maker in a state with a 10-year repose period for products.
>
> > [!answer]-
> > 1. **Express assumption of risk.** The signed release bars recovery within its terms, unless a court finds it against public policy.
> > 2. **Primary implied assumption of risk.** Being hit by a ball is inherent in watching the game, so the club owed no duty against it and the fan's claim fails, not merely shrinks.
> > 3. **Sovereign immunity.** The state can be sued only as far as it has consented, so a claim outside the waiver's terms is barred.
> > 4. **Statute of repose.** The period runs from the 2010 manufacture and ended in 2020, before the injury. The claim is barred even though it was brought promptly after the injury, which a statute of limitations would have allowed.

> [!example]- Limitations or Repose? {Example}
> A state has a three-year statute of limitations for personal injury, running from discovery, and a ten-year statute of repose for products, running from the manufacturer's last act. A consumer is injured by a heater 8 years after the manufacturer last modified it, discovers the cause of her illness 2 years after the injury, and sues 1 year after that, 11 years after the manufacturer's last act. A court finds she was diligent and was misled about the cause, which would justify equitable tolling. Is the suit timely?
>
> > [!answer]-
> > Under the statute of limitations the suit is timely: it was filed 1 year after discovery, well inside 3 years, and tolling would help her further if it were needed.
> > Under the statute of repose it is barred. The ten years ran from the manufacturer's last act and expired a year before she sued, and a repose period is not extended by tolling or by when the injury was discovered.
> > Both time limits must be met, so the claim fails. Repose is what finally ends a manufacturer's exposure for products long in use.

> [!tip]- How it appears on the exam
> - **DISC-IA:** The Insurance Law section asks candidates to identify defenses against negligence claims. Questions give a fact pattern and ask which defense applies: contributory or comparative negligence, assumption of risk, last clear chance, an immunity, or a time limit.
> - **Fault-rule calculations:** A question gives the damages and the plaintiff's share of fault and asks what the plaintiff recovers under a named rule, or under each rule in turn, as in the first example.
> - **Insurance link:** Each defense changes what a [[Liability Insurance|liability insurer]] pays on its insured's behalf, so a question may ask how much the insurer owes after a defense applies.

> [!warning]- Exam traps
> - **50% versus 51%:** At exactly 50% fault the plaintiff is barred under the 50% bar rule and recovers half under the 51% bar rule. Mixing them up flips the answer.
> - **Primary versus secondary assumption of risk:** Primary assumption means no duty, so recovery is barred. Secondary assumption, where a duty was breached, usually only reduces the award under comparative negligence.
> - **Last clear chance helps the plaintiff:** It is an exception to the contributory negligence bar, not a further defense. A negligent plaintiff recovers when the defendant had the last opportunity to avoid the accident and failed to take it.
> - **Repose ignores the injury date:** A statute of limitations runs from injury or discovery, while a statute of repose runs from the defendant's act and is not tolled. A claim can be timely under one and barred by the other.
> - **Immunity is waivable and narrowing:** Sovereign immunity applies only as far as the government has not consented to suit, and charitable and interspousal immunity have been abolished or limited in most states.
