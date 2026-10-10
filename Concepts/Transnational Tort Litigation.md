---
aliases:
  - Tort Law Environment
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1351306f6a4ab5a0ca1288b854da8ab15cca4c8748c9748dfac378f17468d723
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Transnational Tort Litigation.md
---
**Transnational Tort Litigation** is [[Tort Law|tort]] litigation that crosses national borders: foreign plaintiffs suing in U.S. courts, often over injuries suffered abroad, U.S. plaintiffs suing foreign defendants, and the spread of U.S.-style litigation tools to other countries. For a liability insurer it matters because the same claim can be worth several times as much in a U.S. court as in the plaintiff's home court. The rules that decide where a case is heard, which law applies and whether a judgment can be enforced therefore shape both the insurer's exposure and its reserves.

> $$E[C] = \pi\,V_{\text{U.S.}} + (1 - \pi)\,V_{\text{f}} + K$$

- **Symbols:** $\pi$ is the probability that a U.S. court keeps the case, $V_{\text{U.S.}}$ and $V_{\text{f}}$ are the expected indemnity if it is heard in the U.S. or in the foreign forum, and $K$ is the cost of fighting over the forum. The forum fight is often the most important event in the claim, because $V_{\text{U.S.}}$ can be many times $V_{\text{f}}$.
- **Forum shopping:** Plaintiffs file where the law, the juries, the procedure and the damages favour them. The United States attracts foreign plaintiffs with civil juries, broad pretrial discovery, contingency fees, the rule that each side pays its own costs, and the possibility of [[Punitive Damages|punitive damages]].
- **Forum non conveniens:** A U.S. court may dismiss a case that would be better heard abroad, weighing private factors (where the evidence and witnesses are) and public factors (the local interest in the dispute, the burden on the court). In *Piper Aircraft v. Reyno* (1981), the Supreme Court held that a foreign plaintiff's choice of a U.S. forum deserves less deference, and that less favourable law abroad does not by itself prevent dismissal. The Bhopal litigation against Union Carbide was dismissed to India on this ground.
- **Personal jurisdiction and choice of law:** A court can hear a case only against a defendant with enough connection to the forum, and the Supreme Court has narrowed general jurisdiction over foreign corporations to where they are "at home". Even when a U.S. court keeps a case, conflict-of-laws rules may apply the law of the place of injury, which can cap the damages.
- **The Alien Tort Statute:** This 1789 statute gives federal courts jurisdiction over suits by aliens for torts in violation of the law of nations or a U.S. treaty, and from 1980 it supported human-rights suits against corporations. The Supreme Court has since narrowed it sharply, applying a presumption against conduct abroad (*Kiobel*, 2013) and excluding foreign corporations as defendants (*Jesner*, 2018).
- **Enforcement of judgments:** A U.S. judgment against a foreign defendant must be recognised by the courts where its assets are. Many countries refuse to enforce punitive damages, or awards they consider excessive, as against public policy, so a large U.S. verdict may be collectable only in part.
- **The U.S. tort environment abroad:** U.S. tools have spread. Many countries now allow class or collective actions (the European Union's 2020 directive on representative actions is one example), contingency or conditional fees, third-party litigation funding and more plaintiff-friendly discovery. As they spread, claim frequency, defense costs and severity rise in countries whose rates and reserves were built on lower-cost history, a form of [[Social Inflation|social inflation]].
- **Effect on insurers:** Global and multinational liability programs, products liability, aviation, environmental and directors and officers covers carry the most transnational exposure. Insurers respond with territory and jurisdiction clauses that limit coverage for suits brought in the United States, separate U.S. rates, and reserves that weigh the forum risk explicitly.

> [!example]- Valuing Foreign Claims Filed in a U.S. Court {Example}
> A small aircraft made by a U.S. insured crashes abroad, and the families of 20 foreign passengers sue the manufacturer in a U.S. federal court. Counsel estimates each claim at \$3.0 million in the U.S. court and \$0.6 million in the courts of the country of the crash, and gives a $30\%$ chance that the U.S. court refuses to dismiss on forum non conveniens. The motion and related work will cost \$0.4 million. Find the expected cost of the claims and compare it with the two extremes.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[C] &= 20 \times \left(0.30 \times 3.0 + 0.70 \times 0.6\right) + 0.4 \\
> > &= 20 \times (0.90 + 0.42) + 0.4 \\
> > &= 26.4 + 0.4 \\
> > &= 26.8
> > \end{align*}
> > $$
> > The expected cost is \$26.8 million, between \$12 million if the case is heard abroad and \$60 million if it stays in the U.S. court. The reserve depends heavily on $\pi$, so it should be revisited as soon as the court rules on the motion. A ruling against dismissal is a sudden adverse development of about \$33.6 million.

> [!example]- U.S.-Style Litigation Arrives Abroad {Example}
> In a country that has just introduced opt-out collective actions and allowed litigation funding, a products liability insurer expects claim frequency to rise from $0.0020$ to $0.0026$ per unit of exposure and severity from \$200,000 to \$220,000. Defense and cost-containment expense is expected to rise from $10\%$ to $15\%$ of indemnity. Find the change in the loss and defense cost per exposure.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Before} &= 0.0020 \times 200{,}000 \times 1.10 \\
> > &= 440.00 \\
> > \text{After} &= 0.0026 \times 220{,}000 \times 1.15 \\
> > &= 657.80 \\
> > \text{Change} &= \frac{657.80}{440.00} - 1 \\
> > &= 49.5\%
> > \end{align*}
> > $$
> > Modest-looking changes in frequency, severity and expense compound to an increase of almost half in the cost per exposure. Rates and reserves based on the country's history would understate it badly until enough new experience emerges.

> [!tip]- How it appears on the exam
> - **GI-201:** Objective 3 asks candidates to understand the effects of transnational tort litigation, from the SOA's *Tort Law – Topics for General Insurance Actuaries*. Expect a written answer on why foreign plaintiffs come to U.S. courts and how forum non conveniens and jurisdiction rules limit them.
> - **GI-201:** Objective 7 asks how the U.S. tort environment influences other countries. A good answer names the tools that have spread, such as class actions, contingency fees and litigation funding, and their effect on claim costs and on insurers' pricing and reserving there.
> - **Calculations:** A short question may ask for an expected claim cost weighted by the probability of each forum, or for the combined effect of frequency, severity and expense changes.

> [!warning]- Exam traps
> - **Forum non conveniens is not a defense on the merits:** A dismissal sends the case to another country's courts; it does not end the claim. Reserving the claim at zero after a dismissal ignores the foreign claim that follows.
> - **Keeping the case is not applying U.S. law:** A U.S. court that keeps a case may still apply the law of the place of injury under its choice-of-law rules. Assuming U.S. damages rules follow automatically overstates the exposure.
> - **Collectability:** A U.S. verdict against a defendant with assets only abroad is worth what the foreign courts will enforce. Punitive damages in particular are often refused.
> - **The Alien Tort Statute is narrow today:** Since *Kiobel* and *Jesner*, it reaches little conduct abroad and no foreign corporations. Citing it as a broad route for foreign victims to sue multinationals describes the law before 2013.
