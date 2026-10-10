---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7f0a35cd6069387ac87fbeea26ff1ab90c9865a0be7d686cfe43461886bd6136
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Products Liability.md
---

**Products Liability** is the liability of manufacturers, distributors and sellers for injury or damage caused by a defective product they put into the stream of commerce. An injured person can sue on three theories, [[Negligence|negligence]], breach of warranty and [[Strict Liability|strict liability]] in tort, and can usually sue anyone in the chain of distribution. Insurers cover it under the products-completed operations hazard of a [[Commercial General Liability|CGL]] policy.

> $$\text{Liable} \iff \text{defect} \wedge \text{defect at sale} \wedge \text{causation} \wedge \text{harm}$$

> $$\text{Design defect if } \Delta B < \Delta P \times L$$

- **Symbols:** The first line is the strict liability claim: the product was defective, the defect existed when it left the defendant's control, and it caused the plaintiff's harm. In the risk-utility test for a design defect, $\Delta B$ is the extra cost per unit of a reasonable alternative design, $\Delta P$ the reduction in the probability of injury it achieves, and $L$ the expected loss from an injury, so a design is defective when a safer design would have cost less than the harm it prevents.
- **Negligence:** The plaintiff proves the manufacturer failed to use reasonable care in designing, making, inspecting or labelling the product. Since *MacPherson v. Buick* (1916), the plaintiff need not have bought the product from the defendant, but must still prove breach, which is hard when the defect arose inside a factory the plaintiff never saw.
- **Breach of warranty:** Under the Uniform Commercial Code, a seller can be liable because the product didn't meet an *express warranty* (a statement of fact or promise about it), the *implied warranty of merchantability* (fit for the ordinary purposes of such goods), or the *implied warranty of fitness for a particular purpose* (where the seller knew the buyer's purpose and the buyer relied on the seller's skill). Warranty is a contract theory, so it can be limited by disclaimers, notice requirements and, in some states, privity of contract.
- **Strict liability in tort:** Under Restatement (Second) of Torts Section 402A, a seller in the business of selling a product is liable for physical harm caused by the product sold in a defective condition unreasonably dangerous to the user, even if the seller used all possible care and the user didn't buy from it. Warranty disclaimers don't defeat it.
- **Three kinds of defect:** A *manufacturing defect* is a unit that departs from its intended design, such as a cracked bottle or a mis-welded joint. A *design defect* affects every unit, judged by whether the product is more dangerous than an ordinary consumer would expect or by the risk-utility test above. A *warning defect* is a failure to give adequate instructions or warnings of a risk the seller knew or should have known.
- **Defences:** *Misuse* of the product in a way the seller couldn't reasonably foresee defeats or reduces liability, but foreseeable misuse must be designed or warned against. A *substantial alteration* after sale breaks the link to the seller. The *state of the art* defence argues the product reflected the scientific and technical knowledge available when it was made. *Assumption of risk*, knowingly using a product known to be defective, and in many states comparative fault reduce or bar recovery, and statutes of repose cut off claims a set number of years after first sale.
- **The chain of distribution:** A plaintiff can sue the component maker, the assembler, the distributor and the retailer. A downstream seller held strictly liable without fault of its own can usually claim indemnity from the manufacturer, and many states' "innocent seller" statutes now dismiss a retailer when the manufacturer is solvent and within the court's reach.
- **The products-completed operations hazard:** The CGL treats injury that happens away from the insured's premises and arises from its product as part of this hazard, with its own aggregate limit (see [[Products and Completed Operations Liability]]). The CGL excludes damage to the insured's own product and the cost of a recall, because those are business risks rather than liability to others. A vendors endorsement extends the manufacturer's CGL to retailers who sell its products.

> [!example]- Tracing a Pressure Cooker Claim Up the Chain {Example}
> A pressure cooker's lid blows off and burns a user, whose damages are \$400,000. The cooker was assembled by a manufacturer from a pressure valve made by a component supplier, sold to a distributor, and sold to the user by a retailer. The jury finds a manufacturing defect in the valve and a design defect in the cooker, whose lid had no lock to stop it being opened under pressure, and allocates fault 70% to the manufacturer and 30% to the component supplier. The retailer and distributor are found strictly liable but not at fault. How is the loss shared?
>
> > [!answer]-
> > Where [[Joint and Several Liability|joint and several liability]] applies, the user can collect the whole \$400,000 from any defendant strictly liable to her, typically the solvent one with the most insurance. The defendants then settle among themselves through indemnity and contribution.
> > $$
> > \begin{align*}
> > \text{Manufacturer} &= 0.70 \times \$400{,}000 \\
> > &= \$280{,}000 \\
> > \text{Component supplier} &= 0.30 \times \$400{,}000 \\
> > &= \$120{,}000
> > \end{align*}
> > $$
> > The retailer and distributor are fully indemnified because they only passed the product along, so they bear nothing in the end, although their insurers may pay defence costs until indemnity is secured. Each loss falls under the products-completed operations hazard of the payer's CGL, reducing its products aggregate rather than its general aggregate. If the retailer was an additional insured under the manufacturer's vendors endorsement, the manufacturer's insurer would defend it from the start.

> [!example]- A Risk-Utility Test for a Ladder {Example}
> A ladder maker could add a locking brace for \$6 a ladder. Without it, illustrative test data show a 1-in-2,000 chance that a ladder collapses during its useful life; with it, the chance falls to 1 in 10,000. A collapse causes an average injury of \$40,000. Is the design without the brace defective under the risk-utility test?
>
> > [!answer]-
> > Compare the cost of the alternative design with the expected harm it prevents per ladder.
> > $$
> > \begin{align*}
> > \Delta P &= 0.0005 - 0.0001 \\
> > &= 0.0004 \\
> > \Delta P \times L &= 0.0004 \times \$40{,}000 \\
> > &= \$16 \\
> > \Delta B &= \$6 < \$16
> > \end{align*}
> > $$
> > The safer design costs less than the harm it prevents, so the ladder without the brace has a design defect. Unlike a manufacturing defect, a design defect affects every unit sold, which is why design claims tend to become class or [[Mass Tort|mass tort]] litigation and why products liability is a [[Latent Liability|latent]], long-tail exposure for insurers.

> [!tip]- How it appears on the exam
> - **DISC-IA:** Questions ask which theory fits a set of facts, which kind of defect a product has, or which defence a manufacturer can raise. Others test the warranty types, the elements of Section 402A, and who in the chain of distribution can be sued.
> - **Coverage link:** Expect questions on when a loss falls in the products-completed operations hazard rather than premises and operations, and on the CGL exclusions for the insured's own product and for recalls.

> [!warning]- Exam traps
> - **Foreseeable misuse is not a defence:** Standing on a chair is misuse, but a foreseeable one, so a manufacturer must design or warn against it. Only unforeseeable misuse defeats a claim.
> - **Disclaimers stop warranty claims only:** A seller can disclaim implied warranties under the UCC, but a disclaimer doesn't defeat a strict liability claim in tort for personal injury.
> - **Every seller can be liable:** Strict liability reaches a retailer who never opened the box. Its protection is indemnity from the manufacturer, or an innocent seller statute, not the absence of liability.
> - **The product itself isn't covered:** The CGL pays for injury and damage the product causes to others, not for repairing or replacing the defective product or for recalling the rest of the batch.
