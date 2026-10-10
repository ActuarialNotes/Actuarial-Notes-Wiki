---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ca7e655086e55c7820dadb73b4712976bffb49f73dc1a903bc0590bcfea59b72
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Intentional Tort.md
---

An **Intentional Tort** is a civil wrong in which the defendant meant to do the act that harmed the plaintiff, and either meant to bring about its consequence or knew it was substantially certain to follow. It differs from [[Negligence]], where the harm is careless rather than intended, and from [[Strict Liability|strict liability]], where no fault is needed at all. Intentional torts matter to insurers mostly through what liability policies refuse to cover, the *expected or intended injury* exclusion, and through the listed offenses that CGL Coverage B covers anyway.

> $$\text{Intent} \iff \text{purpose} \vee \Pr(\text{harm} \mid \text{act}) \approx 1$$

> $$\text{Covered} = A_{\text{not expected or intended}} \cup B_{\text{listed offense}}$$

- **Symbols:** The first line says intent exists when the defendant acted for the purpose of causing the result or knew the result was substantially certain. The second says what a [[Commercial General Liability|CGL]] policy covers out of a suit full of intentional-tort counts: bodily injury and property damage under Coverage A only when it was not expected or intended from the insured's standpoint, and Coverage B's enumerated personal and advertising injury offenses, some of which are intentional by nature.
- **Torts against persons:** *Battery* is an intentional harmful or offensive contact with another person. *Assault* is an act that intentionally puts someone in reasonable apprehension of an imminent battery, with no contact needed. *False imprisonment* is intentionally confining someone within fixed boundaries without consent or legal authority. *Intentional infliction of emotional distress* (IIED) is extreme and outrageous conduct that intentionally or recklessly causes severe emotional distress.
- **Torts against property:** *Trespass to land* is an intentional entry onto another's land, liable even without damage. *Trespass to chattels* is an interference with someone's personal property, and *conversion* is an interference so serious, such as destroying or selling the property, that the defendant must pay its full value.
- **Economic and dignitary torts:** *Defamation* is a false statement of fact, published to a third party, that harms the plaintiff's reputation. It is *libel* when written and *slander* when spoken, and a public figure must also prove actual malice. *Invasion of privacy* takes four forms: intrusion upon seclusion, appropriation of a name or likeness, public disclosure of private facts, and placing someone in a false light. *Fraud* is a knowingly false statement of material fact made to induce reliance, which the plaintiff justifiably relied on to its loss. *Malicious prosecution* is starting criminal or civil proceedings without probable cause and with malice, where the proceedings end in the plaintiff's favour.
- **Defences:** *Consent*, express or implied (a boxer, a surgical patient), defeats most intentional torts within its scope. *Self-defence*, *defence of others* and *defence of property* privilege reasonable force, though deadly force is never justified to protect property alone. A shopkeeper may detain a suspected shoplifter for a reasonable time and in a reasonable manner. *Necessity* can excuse a trespass, *legal authority* covers a lawful arrest, and truth and absolute or qualified *privilege* defeat defamation.
- **Damages:** Battery and trespass to land are actionable without proof of loss, so nominal damages are available. Because the conduct is deliberate, [[Punitive Damages|punitive damages]] are far more common than in negligence cases, and many states don't allow them to be insured.
- **The expected or intended exclusion:** Liability policies, including the CGL's Coverage A, the homeowners policy and the personal auto policy, exclude injury the insured expected or intended. Public policy is behind it, since insurance shouldn't let a person buy protection from the cost of hurting someone on purpose. The CGL exclusion doesn't apply to bodily injury from the use of reasonable force to protect persons or property, so a guard who restrains an attacker can still be covered.
- **Coverage B:** CGL Coverage B covers listed offenses rather than accidents. They include false arrest, detention or imprisonment, malicious prosecution, wrongful eviction or entry, libel and slander, and publication that violates a person's right of privacy. Its own exclusions remove offenses committed with knowledge that they would violate another's rights and publications made with knowledge of their falsity. Assault, battery, IIED, conversion and fraud are not on the list.

> [!example]- Sorting a Nightclub Suit Into Covered and Excluded {Example}
> A patron sues a nightclub and its bouncer. The club settles for \$120,000, allocated as follows: battery (the bouncer punched the patron after he had stopped resisting), \$50,000; false imprisonment (he was held in a back room for an hour before police came), \$30,000; defamation (the club posted online that he was a thief, which the club's manager believed but was untrue), \$25,000; and IIED (based on the whole episode), \$15,000. The club has a standard CGL policy with no assault and battery endorsement. Which amounts does the policy pay?
>
> > [!answer]-
> > **Battery:** The punch came after the threat had ended, so it was not reasonable force to protect persons or property, and the injury was expected or intended. Coverage A excludes it.
> >
> > **False imprisonment:** Detention is a listed Coverage B offense. Covered.
> >
> > **Defamation:** Libel is a Coverage B offense, and the knowledge-of-falsity exclusion doesn't apply because the manager believed the statement. Covered.
> >
> > **IIED:** It is not a listed offense and the distress was intended, so neither coverage part pays it.
> > $$
> > \begin{align*}
> > \text{Covered} &= \$30{,}000 + \$25{,}000 \\
> > &= \$55{,}000 \\
> > \text{Club retains} &= \$120{,}000 - \$55{,}000 \\
> > &= \$65{,}000
> > \end{align*}
> > $$
> > Because two counts were potentially covered, the insurer had a [[Duty to Defend|duty to defend]] the whole suit, which in most states includes the uncovered counts, even though it indemnifies only part of the settlement. Many insurers add an assault and battery exclusion to bar and nightclub policies, which would also remove claims framed as negligent hiring of the bouncer.

> [!example]- Reasonable Force Under the Exclusion {Example}
> A store guard sees a customer swing a bottle at a cashier, tackles him, and breaks his wrist in the fall. The customer sues for battery and \$40,000 of damages. Separately, the guard wrongly accuses a second customer of shoplifting, searches her bag in front of other shoppers and lets her go after ten minutes, and she sues for false imprisonment. How do the defences and the CGL respond?
>
> > [!answer]-
> > **First claim:** Tackling someone to stop an attack on a third person is defence of others, a privilege that defeats the battery claim if the force was reasonable. Even if a jury found the force excessive, the CGL's expected or intended exclusion does not apply to bodily injury resulting from reasonable force to protect persons, so the insurer defends, and pays anything the store owes up to the limit.
> >
> > **Second claim:** The shopkeeper's privilege lets a store detain a suspected shoplifter on reasonable grounds, for a reasonable time and in a reasonable manner. A ten-minute stop may be reasonable, but a public search on weak grounds can exceed the privilege. Either way, detention is a Coverage B offense, so the policy defends and covers it.

> [!tip]- How it appears on the exam
> - **DISC-IA:** Questions describe conduct and ask which intentional tort it is, such as assault versus battery, trespass to chattels versus conversion, or libel versus slander. Others ask which defence applies to a set of facts, or test the elements of defamation and the four privacy torts.
> - **Coverage link:** Expect a question on whether a liability policy covers an intentional act, which turns on the expected or intended exclusion, its reasonable-force exception, and whether the offense is one of Coverage B's listed offenses.

> [!warning]- Exam traps
> - **Assault needs no contact:** Assault is the apprehension of an imminent contact, and battery is the contact itself. A punch that lands without the victim seeing it coming is a battery without an assault.
> - **Intent to act versus intent to harm:** Intent means purpose or substantial certainty about the result. A practical joke that causes an offensive contact is still a battery even though the joker meant no harm.
> - **Coverage B covers some intentional conduct:** Libel and false imprisonment are usually deliberate, yet the CGL covers them as listed offenses. The expected or intended exclusion belongs to Coverage A only.
> - **Knowing falsity:** A defamation claim falls outside Coverage B if the insured published the statement knowing it was false, but not if the insured believed it to be true.
> - **Duty to defend is broader:** One potentially covered count usually obliges the insurer to defend the whole suit, even when most of the settlement is excluded.
