---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:62c6c6564f04c4bd4a9e8505f84483e88b2a70b43cb118e99d63df2788de06e7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/International Legal Environment.md
---
The **International Legal Environment** is the set of legal systems, sources of law, treaties and dispute-resolution mechanisms an [[Insurer|insurer]] meets when it writes risks, settles claims or seeks recoveries outside its home country. The legal system where a loss is litigated decides who decides the case, how damages are measured and who pays the legal costs, and whether a judgment or award can be enforced across a border decides whether a recovery is worth pursuing at all.

The world's legal systems fall into four families:

| System | Main source of law | Role of judges | Examples |
|---|---|---|---|
| Common law | Case law, with statutes | Precedent binds lower courts | U.S. (except Louisiana), England, Canada (except Quebec), Australia, India |
| Civil law | Comprehensive codes | Apply the code; no binding precedent | France, Germany, Japan, most of Latin America, Quebec |
| Religious law | Religious texts and scholarship | Interpret the religious law | Islamic (Sharia) law in Saudi Arabia and Iran |
| Mixed | Two or more of the above | Varies by area of law | South Africa, Scotland, Israel, the Philippines |

Every system draws on a constitution, legislation (statutes or codes), regulations and judicial decisions in some proportion, with custom playing a part in some countries. What differs is the weight each carries, which is why a policy wording that is settled law in one country can be read differently in another.

## Common law

In a common-law system judges make law case by case through precedent, and civil trials in the United States are often heard by juries. Common-law countries also have extensive statutes; the difference is that judicial decisions are themselves binding law. Damages for pain and suffering are set case by case, punitive damages are available, and each side usually pays its own lawyers, which supports contingency fees. See [[Tort Law|tort law]].

## Civil law

In a civil-law system codes set out the law in general principles, and judges apply them with no jury in civil cases; decisions are only persuasive. Damages tend to be lower and more predictable, often following scales, punitive damages are generally unavailable, and the losing party usually pays part of the winner's costs. Many civil-law countries also have a separate insurance contract code. Quebec and Louisiana sit inside common-law countries but have civil-law private law.

> [!example]- What is the insurer's expected cost for the same injury in a U.S. state and in a civil-law country? {Example}
> The same product injures a consumer in each. In both, liability is found with probability $80\%$ and economic damages are $\$600{,}000$.
>
> - In the U.S. state a jury is expected to award $\$1{,}400{,}000$ of non-economic damages, and defense costs are $\$250{,}000$ whatever the result.
> - In the civil-law country the court's scale gives $\$150{,}000$ of non-economic damages and defense costs are $\$80{,}000$. The loser pays $\$60{,}000$ of the winner's costs if the plaintiff wins, or $\$40{,}000$ if the defense wins.
>
> > [!answer]-
> > - U.S.: $0.80 \times (600{,}000 + 1{,}400{,}000) + 250{,}000 = \$1{,}850{,}000$.
> > - Civil law, if the plaintiff wins the insurer pays $600{,}000 + 150{,}000 + 60{,}000 = \$810{,}000$, and if the defense wins it recovers $\$40{,}000$.
> > - Civil law: $0.80 \times 810{,}000 + 80{,}000 - 0.20 \times 40{,}000 = \$720{,}000$.
> > - The U.S. claim costs about $2.6$ times as much, almost all of it from the jury's non-economic award and the higher defense cost, so a products liability rate built on U.S. experience would overprice the civil-law exposure.

## Religious and mixed systems

In countries applying Islamic law, conventional insurance may be restricted because of the prohibitions on uncertainty (*gharar*) and interest (*riba*), and cooperative takaful insurance is offered instead. Mixed systems combine, for example, a civil-law contract law with common-law procedure.

## International law

Public international law governs relations between states, through treaties and custom. Private international law (conflict of laws) decides which country's courts hear a private dispute and which country's law applies; each country sets it for itself unless a treaty or regional regulation harmonises it. Treaties such as the 1958 New York Convention on arbitral awards and the European Union's regulations on jurisdiction and applicable law make outcomes more predictable.

## Dispute resolution and enforcement

Parties can litigate in national courts, arbitrate before a private tribunal or mediate. An arbitral award is usually easier to enforce abroad than a court judgment, because most trading nations are party to the New York Convention, while recognition of foreign court judgments depends on each country's own rules or on narrower treaties.

In a cross-border recovery, the expected net recovery is

> $$E[\text{Net recovery}] = p \times q \times A - K$$

- $p$ is the probability of winning in the chosen forum.
- $q$ is the probability that the judgment or award is enforced where the defendant's assets are.
- $A$ is the amount awarded.
- $K$ is the cost of pursuing it.

> [!example]- Should this insurer sue the foreign manufacturer in a U.S. court or arbitrate? {Example}
> An insurer paid a $\$2{,}000{,}000$ property claim caused by a defective component made by a foreign manufacturer whose assets are all abroad. The supply contract, which binds the insurer as subrogee, allows arbitration. Counsel estimates:
>
> - Suing in a U.S. court: an $80\%$ chance of winning, costs of $\$300{,}000$, and a $40\%$ chance the foreign courts recognise the judgment.
> - Arbitrating: a $75\%$ chance of winning, costs of $\$250{,}000$, and a $90\%$ chance of enforcing the award, since both countries are party to the New York Convention.
>
> > [!answer]-
> > - Court: $0.80 \times 0.40 \times 2{,}000{,}000 - 300{,}000 = \$340{,}000$.
> > - Arbitration: $0.75 \times 0.90 \times 2{,}000{,}000 - 250{,}000 = \$1{,}100{,}000$.
> > - **Arbitrate**: it is worth about $\$1.1$ million against $\$0.34$ million, even with a slightly lower chance of winning.

## Policy wording and claims

A policy covering risks abroad should state its governing law and its jurisdiction or arbitration clause, and many countries require a locally admitted policy in the local language under local law (see [[International Insurance|international insurance]]). Claims staff need to know the local rules on damages, costs and time limits, and reserves for claims abroad should reflect the system that will decide them.

> [!trap] Treating winning as collecting
> A favourable judgment is worth little if it cannot be enforced where the defendant's assets are. Comparing only the chances of winning leaves out $q$.
