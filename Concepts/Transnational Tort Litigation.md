---
aliases:
  - Tort Law Environment
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b3ca560b6a3ee69809ae1677e7911c7544d3b7c285778e14968b9298391a4e0c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Transnational Tort Litigation.md
---
**Transnational Tort Litigation** is [[Tort Law|tort]] litigation that crosses national borders: foreign plaintiffs suing in U.S. courts, often over injuries suffered abroad, U.S. plaintiffs suing foreign defendants, and the spread of U.S.-style litigation tools to other countries. For a liability insurer it matters because the same claim can be worth several times as much in a U.S. court as in the plaintiff's home court, so the rules that decide where a case is heard, which law applies and whether a judgment can be enforced shape both the insurer's exposure and its reserves.

The expected cost of a claim whose forum is still in dispute is

> $$E[C] = \pi\,V_{\text{U.S.}} + (1 - \pi)\,V_{\text{f}} + K$$

- $\pi$ is the probability that a U.S. court keeps the case.
- $V_{\text{U.S.}}$ and $V_{\text{f}}$ are the expected indemnity if it is heard in the U.S. or in the foreign forum.
- $K$ is the cost of fighting over the forum.

The forum fight is often the most important event in the claim, because $V_{\text{U.S.}}$ can be many times $V_{\text{f}}$.

> [!example]- What is the expected cost of these foreign passengers' claims filed in a U.S. court? {Example}
> A small aircraft made by a U.S. insured crashes abroad, and the families of 20 foreign passengers sue the manufacturer in a U.S. federal court. Counsel estimates each claim at $\$3.0$ million in the U.S. court and $\$0.6$ million in the courts of the country of the crash, and gives a $30\%$ chance that the U.S. court refuses to dismiss on forum non conveniens. The motion and related work will cost $\$0.4$ million.
>
> > [!answer]-
> > - $E[C] = 20 \times (0.30 \times 3.0 + 0.70 \times 0.6) + 0.4$.
> > - $E[C] = 20 \times 1.32 + 0.4 = \$26.8$ million.
> > - That lies between $\$12$ million if the case is heard abroad and $\$60$ million if it stays in the U.S. court.
> > - The reserve depends heavily on $\pi$, so it is revisited as soon as the court rules: a ruling against dismissal is a sudden adverse development of about $\$33.6$ million.

## Forum shopping and forum non conveniens

Plaintiffs file where the law, the juries, the procedure and the damages favour them. The United States attracts foreign plaintiffs with civil juries, broad pretrial discovery, contingency fees, the rule that each side pays its own costs, and the possibility of [[Punitive Damages|punitive damages]].

Under **forum non conveniens**, a U.S. court may dismiss a case that would be better heard abroad, weighing private factors (where the evidence and witnesses are) and public factors (the local interest in the dispute, the burden on the court). In *Piper Aircraft v. Reyno* (1981), the Supreme Court held that a foreign plaintiff's choice of a U.S. forum deserves less deference, and that less favourable law abroad does not by itself prevent dismissal. The Bhopal litigation against Union Carbide was dismissed to India on this ground. A dismissal sends the case to another country's courts; it does not end the claim.

## Jurisdiction and choice of law

A court can hear a case only against a defendant with enough connection to the forum, and the Supreme Court has narrowed general jurisdiction over foreign corporations to where they are "at home". Even when a U.S. court keeps a case, conflict-of-laws rules may apply the law of the place of injury, which can cap the damages.

The **Alien Tort Statute** of 1789 gives federal courts jurisdiction over suits by aliens for torts in violation of the law of nations or a U.S. treaty, and from 1980 it supported human-rights suits against corporations. The Supreme Court has since narrowed it sharply, applying a presumption against conduct abroad (*Kiobel*, 2013) and excluding foreign corporations as defendants (*Jesner*, 2018).

## Enforcement of judgments

A U.S. judgment against a foreign defendant must be recognised by the courts where its assets are. Many countries refuse to enforce punitive damages, or awards they consider excessive, as against public policy, so a large U.S. verdict may be collectable only in part.

## The U.S. tort environment abroad

U.S. tools have spread. Many countries now allow class or collective actions (the European Union's 2020 directive on representative actions is one example), contingency or conditional fees, third-party litigation funding and more plaintiff-friendly discovery. As they spread, claim frequency, defense costs and severity rise in countries whose rates and reserves were built on lower-cost history, a form of [[Social Inflation|social inflation]].

> [!example]- By how much does the loss and defense cost per exposure change when U.S.-style litigation arrives? {Example}
> A country has just introduced opt-out collective actions and allowed litigation funding. A products liability insurer there expects claim frequency to rise from $0.0020$ to $0.0026$ per exposure, severity from $\$200{,}000$ to $\$220{,}000$, and defense and cost-containment expense from $10\%$ to $15\%$ of indemnity.
>
> > [!answer]-
> > - Before: $0.0020 \times 200{,}000 \times 1.10 = \$440.00$ per exposure.
> > - After: $0.0026 \times 220{,}000 \times 1.15 = \$657.80$ per exposure.
> > - The cost per exposure rises $657.80/440.00 - 1 = 49.5\%$, so rates and reserves based on the country's history would understate it badly until new experience emerges.

## Effect on insurers

Global and multinational liability programs, products liability, aviation, environmental and directors and officers covers carry the most transnational exposure. Insurers respond with territory and jurisdiction clauses that limit coverage for suits brought in the United States, separate U.S. rates, and reserves that weigh the forum risk explicitly.

> [!trap] Assuming a U.S. court applies U.S. law
> A U.S. court that keeps a case may still apply the law of the place of injury under its choice-of-law rules. Assuming U.S. damages rules follow automatically overstates the exposure.
