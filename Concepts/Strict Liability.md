---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:c32c503ff0fb43cbe2e4282c85d46b47db9a52fdad93aed51a4333836bf2f281
  sources: []
  open_findings: 3
  open_critical: 0
  log: .verify/Concepts/Strict Liability.md
---

**Strict Liability** is liability imposed without proof of fault: the defendant pays for harm caused by certain activities, animals or products even though it took every reasonable precaution. The law reserves it for situations where the risk can't be eliminated by care, so the party that creates the risk and profits from it bears its cost. It is one of the three bases of [[Tort Law|tort liability]], alongside [[Intentional Tort|intentional torts]] and [[Negligence|negligence]].

> $$R_{\text{negligence}} = \mathbf{1}\{\text{duty, breach, cause}\}\,(1-p)\,D$$

> $$R_{\text{strict}} = \mathbf{1}\{\text{activity caused the harm}\}\,D$$

- **Symbols:** $D$ is the damages assessed, $p$ the plaintiff's share of fault, and $\mathbf{1}\{\cdot\}$ equals 1 when the condition holds. The difference between the two lines is the breach: a negligence plaintiff must prove the defendant fell below reasonable care, and a strict liability plaintiff need only prove the activity caused the harm. Many comparative fault states now also reduce a strict liability award by the plaintiff's share of fault, while the traditional rule allowed only knowing assumption of the risk as a defence.
- **Abnormally dangerous activities:** The doctrine traces to the English case *Rylands v. Fletcher* (1868), on water escaping from a reservoir. Restatement (Second) of Torts Section 520 weighs whether the activity carries a high risk of serious harm, whether reasonable care can eliminate that risk, whether it is a matter of common usage, and whether it suits the place where it is carried on. Blasting, storing explosives, transporting hazardous chemicals and fumigation are standard examples.
- **Animals:** The keeper of a wild animal, such as a tiger or a venomous snake, is strictly liable for harm from its dangerous propensities. The keeper of a domestic animal is strictly liable only if it knew of that animal's dangerous tendency (the so-called "one-bite" rule), though many states' dog-bite statutes impose strict liability regardless.
- **Statutory strict liability:** Legislatures impose liability without fault in several areas. [[Workers Compensation Underwriting|Workers compensation]] makes an employer pay for work injuries regardless of fault, in exchange for the employee giving up the right to sue in tort. *Dram shop* laws make a seller of alcohol liable when it serves a visibly intoxicated or underage customer who then causes harm. They are usually based on negligence rather than strict liability, but some states impose the liability without proof of fault. Federal environmental law (CERCLA, the Superfund law) makes responsible parties liable for the cost of cleaning up hazardous waste sites without regard to fault.
- **Vicarious liability:** Vicarious liability makes one person answer for another's tort because of their relationship, such as an employer for an employee acting within the scope of employment (*respondeat superior*), or in some states a vehicle owner for a permissive driver. It is strict as to the vicariously liable party, who need not be at fault at all, even though the underlying tort may be negligence.
- **Products:** Since the 1960s, a seller of a product in a defective condition unreasonably dangerous to the user has been strictly liable for the harm it causes, under Restatement (Second) of Torts Section 402A. This branch is covered on [[Products Liability]], and it is what made [[Asbestos]] and most [[Mass Tort|mass tort]] litigation possible.
- **Insurance:** A strict liability judgment is a sum the insured is legally obligated to pay, so a liability policy covers it unless an exclusion applies. Several exclusions are aimed at strict liability exposures, such as the CGL's pollution exclusion and its liquor liability exclusion for insureds in the business of selling or serving alcohol, which push those risks to [[Environmental Insurance|environmental]] and liquor liability policies. Insurers also rate strictly liable classes, such as blasting contractors, much higher than ordinary contractors.

> [!example]- One Blast, Two Theories {Example}
> A quarry operator sets off a scheduled blast using standard charges, after posting warning signs and sounding sirens, in full compliance with state regulations. The vibration cracks the foundation of a house 400 metres away, costing \$180,000 to repair. A hiker who walked past the signs into the cordoned area is hit by flying rock and has damages of \$90,000. Compare the owner's and the hiker's recovery in negligence and in strict liability. In the state, the hiker is found 60% at fault, and strict liability awards are reduced by comparative fault.
>
> > [!answer]-
> > **Homeowner, negligence:** The operator followed industry practice and the regulations, so the homeowner would struggle to prove a breach. Without a breach the claim fails, and the recovery is \$0.
> >
> > **Homeowner, strict liability:** Blasting is an abnormally dangerous activity, so causation alone suffices and the homeowner recovers the full \$180,000 with no fault to deduct.
> >
> > **Hiker, strict liability:** The hiker knowingly entered the danger zone. Under the traditional rule, that knowing assumption of risk bars recovery entirely. Under the state's comparative fault rule, the award is reduced instead.
> > $$
> > \begin{align*}
> > R_{\text{hiker}} &= (1 - 0.60) \times \$90{,}000 \\
> > &= \$36{,}000
> > \end{align*}
> > $$
> > The operator's general liability insurer pays both strict liability claims if the policy carries no explosion exclusion. Insurers sometimes add one by endorsement for blasting contractors, which is why the operator should check that its policy covers the operation it is actually carrying out.

> [!example]- A Dram Shop Claim {Example}
> A bar keeps serving a customer who is visibly intoxicated. On the way home he runs a red light and injures another driver, whose damages are \$500,000. The drunk driver's auto policy has a \$100,000 bodily injury limit, and the state's dram shop act caps recovery against a seller at \$150,000 per person (illustrative). The bar's CGL has the standard liquor liability exclusion, but it also buys a separate liquor liability policy with a \$1,000,000 limit. How much does the injured driver collect from insurance?
>
> > [!answer]-
> > Assume the state's dram shop act is one of those that impose liability without proof of fault, so the bar is liable because it served a visibly intoxicated customer who then caused the injury. (In most states dram shop liability is negligence-based, and the injured driver would also have to prove the bar's negligence.) Its CGL excludes the claim because the bar is in the business of serving alcohol, so the liquor liability policy responds, up to the statutory cap.
> > $$
> > \begin{align*}
> > \text{Insured recovery} &= \$100{,}000 + \$150{,}000 \\
> > &= \$250{,}000 \\
> > \text{Unrecovered} &= \$500{,}000 - \$250{,}000 \\
> > &= \$250{,}000
> > \end{align*}
> > $$
> > The remaining \$250,000 can be pursued only against the drunk driver personally, or through the injured driver's own [[Uninsured Automobile Coverage|underinsured motorists coverage]] if it has any.

> [!tip]- How it appears on the exam
> - **DISC-IA:** Questions describe an activity and ask whether strict liability, negligence or an intentional tort governs it, or list the factors that make an activity abnormally dangerous. Others test the animal rules, the statutory examples (workers compensation, CERCLA, and dram shop acts where a state imposes them without fault) and how vicarious liability relates to fault.
> - **Coverage link:** A question may ask why a strictly liable defendant's CGL might still not pay, which points to the pollution or liquor liability exclusion and the specialty policy that fills the gap.

> [!warning]- Exam traps
> - **Strict isn't absolute:** The plaintiff still has to prove that the activity caused the harm and that the harm came from the risk that made the activity dangerous. Strict liability removes only the need to prove fault.
> - **Care is no defence:** Proof that the defendant used every reasonable precaution defeats a negligence claim but not a strict liability claim. That is the whole point of the doctrine.
> - **Domestic versus wild animals:** A dog owner is not automatically strictly liable at common law, only if it knew of the dog's dangerous tendency, unless a statute says otherwise. A wild animal's keeper is strictly liable from the start.
> - **Vicarious liability needs the other person's tort:** An employer is liable for an employee's negligence without being at fault itself, but if the employee committed no tort there is nothing to be vicariously liable for.
