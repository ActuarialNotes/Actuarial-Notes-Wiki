---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:fcc13f709b0ec88ef6b3b6db0cd29c916079a6e32f15e337e85a0d28a4019726
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Joint and Several Liability.md
---

**Joint and Several Liability** is the [[Tort Law|tort]] doctrine that lets a plaintiff harmed by several wrongdoers recover damages from the defendants collectively or from any one of them individually. The plaintiff can take all of the damages from one defendant even if that defendant was only partly at fault. That makes a solvent, insured co-defendant the "deep pocket", and it is a standing target of [[Tort Reform|tort reform]]. The syllabus covered it through the [[Harris]] reading (objective A2), which left the syllabus for Fall 2026; the doctrine still runs through the 2013–2019 past papers.

> $$P_i^{\,\text{several}} = f_i \, D$$
>
> $$P_i^{\,\text{J\&S}} = D - \sum_{j \neq i} P_j$$

- $D$ is the damages, $f_i$ defendant $i$'s share of fault and $P_i$ what the plaintiff collects from $i$. Under **several (proportionate) liability** each defendant pays its own share and no more. Under joint and several liability, $i$ owes whatever the plaintiff does not collect from the others. With every co-defendant insolvent, a defendant $1\%$ at fault pays $100\%$ of the loss, the outcome IBC objects to in Harris.
- **The case for it.** The plaintiff is fully compensated as long as one solvent defendant is in the picture. "The number one rule of law is that the innocent party gets full compensation," says the Ontario Trial Lawyers Association in Harris. Trial lawyers add that it promotes settlement: if each party paid only a percentage, there would be more trials, and trials to fix each defendant's share of fault cost time and money.
- **The case against it.** It is unfair to make a defendant with a small share of fault carry most of the loss. It also breeds the **deep-pocket syndrome**, where plaintiffs name a defendant for its resources rather than its fault. A municipal insurer in Harris says, "we are often the deep pocket they come to. And all they have to do is find that 1%." For the **insurer**, the doctrine raises the cost and the unpredictability of insuring a defendant that can be held responsible for more than its share. And the leverage carries into mediation: trial lawyers "know if they have a deep pocket there they can use it to the maximum", in the words of a school-board insurer in Harris.
- **Reforms in the syllabus and the published answers:**
  - Replace it with **proportionate (several) liability**: "if you are in for 1%, just pay your 1%".
  - Bar joint and several liability for **non-economic damages** such as pain and suffering (the RIMS position in Harris), keeping it for economic loss.
  - Apply it only to defendants above a **fault threshold** (the published answers use $25\%$).
  - To answer the trial lawyers' concern, set up a **fund**, "similar to [[PACICC]]", to pay when the at-fault party lacks the means or coverage to indemnify the injured party.
- **Asbestos is the textbook case.** The major [[Asbestos|asbestos]] defendants went bankrupt, so plaintiffs pursued **peripheral defendants**: not the makers or sellers of asbestos but its users, or makers of products that encapsulated the major defendants' asbestos. Under joint and several liability those defendants can be liable for the full damages ([[Mass Tort]]). Where bankruptcy trusts replace once-solvent defendants, the published answer says total compensation is unaffected under joint and several liability. Under several liability it could rise, fall or stay the same.
- **The Canadian picture in 2005.** Harris found that no province was actively looking at tort reform. Joint and several liability leads IBC's reform list in the article, alongside the [[Collateral Benefits|collateral source rule]], gross rather than net income as the basis for loss-of-income damages, and [[Vicarious Liability]]. Because the common law, including negligence, is provincial (Quebec operates on the civil code), reform would have to be made province by province.

> [!example]- The Deep Pocket Under Four Rules {Example}
> A plaintiff's damages are $\$4{,}000{,}000$: $\$1{,}500{,}000$ economic and $\$2{,}500{,}000$ non-economic. The plaintiff is not at fault. The municipality is found $10\%$ at fault and is insured. A contractor is found $90\%$ at fault and is insolvent and uninsured.
>
> How much does the municipality's insurer pay, and how much does the plaintiff recover, under:
>
> 1. joint and several liability;
> 2. proportionate liability;
> 3. joint and several liability barred for non-economic damages;
> 4. joint and several liability applying only to defendants at least $25\%$ at fault?
>
> > [!answer]-
> > **1. Joint and several.** The contractor pays nothing, so the plaintiff collects everything from the municipality:
> >
> > $$P_{\text{muni}} = \$4{,}000{,}000 - 0 = \$4{,}000{,}000$$
> >
> > **2. Proportionate.**
> >
> > $$P_{\text{muni}} = 0.10 \times \$4{,}000{,}000 = \$400{,}000$$
> >
> > The plaintiff recovers $\$400{,}000$ and bears a $\$3{,}600{,}000$ shortfall.
> >
> > **3. Barred for non-economic damages.** Joint and several liability still applies to the economic loss:
> >
> > $$
> > \begin{align*}
> > P_{\text{muni}} &= \$1{,}500{,}000 + 0.10 \times \$2{,}500{,}000 \\
> > &= \$1{,}500{,}000 + \$250{,}000 \\
> > &= \$1{,}750{,}000
> > \end{align*}
> > $$
> >
> > That is also all the plaintiff recovers.
> >
> > **4. Fault threshold.** At $10\%$ the municipality is below $25\%$, so it pays its proportionate $\$400{,}000$.
> >
> > The insurer's bill runs from $\$400{,}000$ to $\$4{,}000{,}000$ on the same verdict, depending only on the liability rule. That spread is why the doctrine makes defendants like municipalities costly and unpredictable to insure. With the only other defendant insolvent, every reform that shrinks the insurer's bill leaves a gap of equal size in the plaintiff's recovery, and that is what the trial lawyers object to. A fund for the shares of insolvent defendants is the remedy that closes the gap without returning the cost to the $10\%$ defendant.

> [!example]- Four Perspectives on the Doctrine {Example}
> Give an advantage or a disadvantage of joint and several liability from the point of view of (i) a defendant, (ii) a plaintiff, (iii) an insurer and (iv) a trial lawyer. Then explain why a peripheral defendant in a mass tort is the doctrine's typical casualty.
>
> > [!answer]-
> > 1. **Defendant, a disadvantage:** it may be held liable for damages out of proportion to its responsibility. That is a fairness problem, and a sharp one for a defendant with deep pockets and a small share of fault.
> > 2. **Plaintiff, an advantage:** it is fully compensated as long as one defendant can pay, even if the others are insolvent.
> > 3. **Insurer, a disadvantage:** insuring a defendant that may be held responsible for more than its share raises both the cost and the unpredictability of the risk.
> > 4. **Trial lawyer, an advantage:** it promotes settlement and makes the legal system more efficient. Proportionate shares would mean more trials, each fought over the percentage of fault.
> >
> > **The peripheral defendant.** When the principal wrongdoers are bankrupt, a peripheral defendant, for example one whose product contained another company's asbestos, may be only $5\%$ at fault while the insolvent major defendant was $95\%$. Under joint and several liability the plaintiff can recover $100\%$ from it. The insolvency of the others is what turns a small share of fault into the whole loss, and that is the point examiners want made.
