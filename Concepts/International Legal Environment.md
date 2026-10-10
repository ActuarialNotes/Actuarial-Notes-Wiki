---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8ace379c43b1270a6f60e49eb2a8c01f6c8bde008fd3fac509ac183a8ba13bc2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/International Legal Environment.md
---

**The International Legal Environment** is the set of legal systems, sources of law, treaties and dispute-resolution mechanisms an [[Insurer|insurer]] meets when it writes risks, settles claims or seeks recoveries outside its home country. The legal system where a loss is litigated decides who decides the case, how damages are measured and who pays the legal costs. Whether a judgment or award can be enforced across a border decides whether a recovery is worth pursuing at all.

| System | Main source of law | Role of judges | Examples |
|---|---|---|---|
| Common law | Case law, with statutes | Precedent binds lower courts | U.S. (except Louisiana), England, Canada (except Quebec), Australia, India |
| Civil law | Comprehensive codes | Apply the code; no binding precedent | France, Germany, Japan, most of Latin America, Quebec |
| Religious law | Religious texts and scholarship | Interpret the religious law | Islamic (Sharia) law in Saudi Arabia and Iran |
| Mixed | Two or more of the above | Varies by area of law | South Africa, Scotland, Israel, the Philippines |

> $$E[\text{Net recovery}] = p \times q \times A - K$$

- **Symbols:** In a cross-border recovery, $p$ is the probability of winning in the chosen forum, $q$ is the probability that the judgment or award is enforced where the defendant's assets are, $A$ is the amount awarded, and $K$ is the cost of pursuing it. The relationship shows why enforceability, $q$, matters as much as the merits.
- **Common law:** Judges make law case by case through precedent, and civil trials in the United States are often heard by juries. Damages for pain and suffering are set case by case, punitive damages are available, and each side usually pays its own lawyers, which supports contingency fees. See [[Tort Law|tort law]].
- **Civil law:** Codes set out the law in general principles, and judges apply them with no jury in civil cases. Damages tend to be lower and more predictable, often following scales, punitive damages are generally unavailable, and the losing party usually pays part of the winner's costs. Many civil-law countries also have a separate insurance contract code.
- **Religious and mixed systems:** In countries applying Islamic law, conventional insurance may be restricted because of the prohibitions on uncertainty (*gharar*) and interest (*riba*), and cooperative takaful insurance is offered instead. Mixed systems combine, for example, a civil-law contract law with common-law procedure.
- **Sources of law:** Every system draws on a constitution, legislation (statutes or codes), regulations and judicial decisions in some proportion, with custom playing a part in some countries. What differs is the weight each carries, which is why a policy wording that is settled law in one country can be read differently in another.
- **International law:** Public international law governs relations between states, through treaties and custom, while private international law (conflict of laws) decides which country's courts hear a private dispute and which country's law applies. Treaties such as the 1958 New York Convention on arbitral awards and regional rules such as the European Union's regulations on jurisdiction and applicable law make outcomes more predictable.
- **Dispute resolution and enforcement:** Parties can litigate in national courts, arbitrate before a private tribunal or mediate. An arbitral award is usually easier to enforce abroad than a court judgment, because most trading nations are party to the New York Convention, while recognition of foreign court judgments depends on each country's own rules or on narrower treaties.
- **What it means for policy wording and claims:** A policy covering risks abroad should state its governing law and its jurisdiction or arbitration clause, and many countries require a locally admitted policy in the local language under local law (see [[International Insurance|international insurance]]). Claims staff need to know the local rules on damages, costs and time limits, and reserves for claims abroad should reflect the system that will decide them.

> [!example]- Subrogation Against a Foreign Manufacturer {Example}
> An insurer paid a \$2,000,000 property claim caused by a defective component made by a manufacturer in a foreign country whose assets are all there. The supply contract between the insured and the manufacturer, which binds the insurer as subrogee, allows arbitration. The insurer's counsel estimates:
>
> - **Suing in a U.S. court:** an $80\%$ chance of winning, costs of \$300,000, and a $40\%$ chance that the foreign courts will recognise the U.S. judgment.
> - **Arbitrating:** a $75\%$ chance of winning, costs of \$250,000, and a $90\%$ chance of enforcing the award, since both countries are party to the New York Convention.
>
> Which route has the higher expected net recovery?
>
> > [!answer]-
> > Apply $E = p \times q \times A - K$ to each route.
> > $$
> > \begin{align*}
> > E_{\text{court}} &= 0.80 \times 0.40 \times 2{,}000{,}000 - 300{,}000 \\
> > &= 640{,}000 - 300{,}000 \\
> > &= 340{,}000 \\
> > E_{\text{arbitration}} &= 0.75 \times 0.90 \times 2{,}000{,}000 - 250{,}000 \\
> > &= 1{,}350{,}000 - 250{,}000 \\
> > &= 1{,}100{,}000
> > \end{align*}
> > $$
> > Arbitration is worth about \$1.1 million against \$0.34 million, even with a slightly lower chance of winning. A judgment that cannot be enforced where the assets are is worth little.

> [!example]- One Injury, Two Legal Systems {Example}
> The same product injures a consumer in a U.S. state and in a civil-law country. In both, liability is found with probability $80\%$ and economic damages are \$600,000. In the U.S. state a jury is expected to award \$1,400,000 of non-economic damages, and defense costs are \$250,000 whatever the result. In the civil-law country the court's scale gives \$150,000 of non-economic damages, defense costs are \$80,000, and the loser pays \$60,000 of the winner's costs if the plaintiff wins or \$40,000 if the defense wins. Find the insurer's expected cost in each.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E_{\text{U.S.}} &= 0.80 \times (600{,}000 + 1{,}400{,}000) + 250{,}000 \\
> > &= 1{,}850{,}000 \\
> > E_{\text{civil}} &= 0.80 \times (750{,}000 + 60{,}000) + 80{,}000 - 0.20 \times 40{,}000 \\
> > &= 648{,}000 + 80{,}000 - 8{,}000 \\
> > &= 720{,}000
> > \end{align*}
> > $$
> > The U.S. claim costs about $2.6$ times as much, almost all of it from the jury's non-economic award and the higher defense cost. A products liability rate built on U.S. experience would overprice the civil-law exposure, and the reverse would badly underprice the U.S. one.

> [!tip]- How it appears on the exam
> - **GI-201:** Objective 6 asks candidates to understand the international legal environment as it relates to general insurance, from the "Legal Systems" pages of *Business Law for Insurance Professionals*. Expect to compare common law and civil law, list the sources of law, or explain the difference between public and private international law.
> - **GI-201:** A written question may describe a cross-border claim and ask what decides where it is heard, which law applies and whether the result can be enforced. Arbitration and the New York Convention are the usual answer to enforcement.
> - **GI-201:** The objective pairs naturally with [[Transnational Tort Litigation|transnational tort litigation]] and the influence of the U.S. tort environment abroad, so a question may ask why the same claim costs more in a U.S. court.

> [!warning]- Exam traps
> - **Common law is not "unwritten":** Common-law countries have extensive statutes. The difference is that judicial decisions are themselves binding law, while in a civil-law system the code is the primary source and decisions are only persuasive.
> - **Winning is not collecting:** A favourable judgment is worth little if it cannot be enforced where the defendant's assets are. An answer that compares only the chances of winning misses the enforcement factor $q$.
> - **Mixing up the two kinds of international law:** Treaties between governments are public international law. The rules that choose the forum and the governing law of a private claim are private international law, which each country sets for itself unless a treaty or regional regulation harmonises them.
> - **Quebec and Louisiana:** Both sit inside common-law countries but have civil-law private law. A Canadian or U.S. answer that assumes common-law contract rules everywhere gets them wrong.
