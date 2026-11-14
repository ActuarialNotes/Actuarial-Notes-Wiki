---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:32029087359ac29fbdcc2fd35dffb47ce08debc839a8c5295a9b3db0bf3e8a7f
  sources:
    - "Cornell LII Wex, \"products liability\", whole entry, sha256:3932a61c3a07202fd010d53a48a95868ba5ce8965c19b11890b41f59b224daf5 — https://www.law.cornell.edu/wex/products_liability"
    - "Cornell LII Wex, \"design defect\", whole entry, sha256:dee38ea306d1221efb1fac89e21c6345201c8417decb960b10b1cf17942f5579 — https://www.law.cornell.edu/wex/design_defect"
    - "Cornell LII Wex, \"manufacturing defect\", whole entry, sha256:878c81fb8dfae85a22dc3f7c93878eaaa703b14ab471183f5fb05d87b0697fb1 — https://www.law.cornell.edu/wex/manufacturing_defect"
    - "Cornell LII Wex, \"warranty of merchantability\", whole entry, sha256:f8f2ecfbb71064114586928fbe1f5f182b33233e8fbd0271246fd467f9e97d23 — https://www.law.cornell.edu/wex/warranty_of_merchantability"
    - "UCC s.2-313 (express warranties), via LII, section text, sha256:d46f2186b152678f968e7b8aa9c91538768cd1998c14e2fb0c97a819ad071a87 — https://www.law.cornell.edu/ucc/2/2-313"
    - "UCC s.2-314 (merchantability), via LII, section text, sha256:e01e96d60caf78222cc3459bb8f17147247b090ee11eafc74b0f6126551e9046 — https://www.law.cornell.edu/ucc/2/2-314"
    - "UCC s.2-315 (fitness for particular purpose), via LII, section text, sha256:fbc7416bd26d5141b672d967f4169b59eff4da02b3047f54ec6a08993bedb378 — https://www.law.cornell.edu/ucc/2/2-315"
    - "UCC s.2-316 (exclusion of warranties), via LII, section text, sha256:d804acc380ff4af0e8efd06bda35b657c57e6c3e93e88b883942959da30a884b — https://www.law.cornell.edu/ucc/2/2-316"
    - "Webb v. Zern, 422 Pa. 424 (1966) (Caselaw Access Project), quotation of Restatement (Second) s.402A, sha256:eac448a0817d7253681fb5fd8506c8b786db8c6c360e2609148f256d0947c5f0 — https://static.case.law/pa/422/cases/0424-01.json"
    - "MacPherson v. Buick Motor Co., 217 N.Y. 382 (1916) (Caselaw Access Project), opinion text, sha256:11d9b06149d105cc11a92409ff8c46dc5bcec02a1d26e3754b81144ee561a471 — https://static.case.law/ny/217/cases/0382-01.json"
    - "N.C. Gen. Stat. ch. 99B (Products Liability), ss.99B-1.1, 99B-2, 99B-3, 99B-4, 99B-6, sha256:77f19d9ffee208e103cf242770e09eb5c654562e107a8849b46e389dc5341d65 — https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/ByChapter/Chapter_99B.html"
    - "The Indiana Lawyer (DTCI), \"Are sellers safe from strict liability under the IPLA?\" (rank 3), quotation of Ind. Code 34-20-2-3, read via WebFetch 2026-10-10 (host refuses scripted fetch, no hash) — https://theindianalawyer.com/?p=138294"
    - "IRMI Glossary, \"vendors endorsement\", whole entry, sha256:74b815c93094a19b5557fdbb7832aef01914bde7af83cb952b0467fdba111fdc — https://www.irmi.com/term/insurance-definitions/vendors-endorsement"
    - "ISO CGL Coverage Form CG 00 01 04 13 (specimen copy), s.V def. 16 products-completed operations hazard; exclusions k and n, sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Products Liability.md
---

**Products Liability** is the liability of manufacturers, distributors and sellers for injury or damage caused by a defective product they put into the stream of commerce. Insurers cover it under the products-completed operations hazard of a [[Commercial General Liability|CGL]] policy.

An injured person can sue anyone in the chain of distribution, on three theories:

1. **[[Negligence]]**: the manufacturer failed to use reasonable care.
2. **Breach of warranty**: the product did not meet a promise the seller made or the law implies.
3. **[[Strict Liability|Strict liability]] in tort**: the product was sold in a defective condition, whatever care the seller used.

## Negligence

The plaintiff proves the manufacturer failed to use reasonable care in designing, making, inspecting or labelling the product. Since *MacPherson v. Buick* (1916), the plaintiff need not have bought the product from the defendant, but must still prove breach, which is hard when the defect arose inside a factory the plaintiff never saw.

## Breach of warranty

Under the Uniform Commercial Code, a seller can be liable because the product didn't meet one of three warranties:

- An **express warranty** is a statement of fact or promise about the product.
- The **implied warranty of merchantability** is that the product is fit for the ordinary purposes of such goods.
- The **implied warranty of fitness for a particular purpose** arises where the seller knew the buyer's purpose and the buyer relied on the seller's skill.

Warranty is a contract theory, so it can be limited by disclaimers, notice requirements and, in some states, privity of contract.

## Strict liability in tort

In most states, following Restatement (Second) of Torts Section 402A, a seller in the business of selling a product is liable for physical harm caused by the product sold in a defective condition unreasonably dangerous to the user, even if the seller used all possible care and the user didn't buy from it. The plaintiff must show three things:

1. The product was defective.
2. The defect existed when the product left the defendant's control.
3. The defect caused the plaintiff's harm.

A disclaimer that stops a warranty claim does not defeat a strict liability claim. Not every state follows the rule: North Carolina's statute provides that there shall be no strict liability in tort in product liability actions.

## Kinds of defect

A *manufacturing defect* is a unit that departs from its intended design, such as a cracked bottle or a mis-welded joint, so it affects only some units. A *warning defect* is a failure to give adequate instructions or warnings of a risk the seller knew or should have known.

A *design defect* affects every unit, so a product built exactly as designed can still be defective. It is judged by whether the product is more dangerous than an ordinary consumer would expect, or by the risk-utility test. Under the risk-utility test, the condition for a design defect is

> $$\Delta B < \Delta P \times L$$

- $\Delta B$ is the extra cost per unit of a reasonable alternative design.
- $\Delta P$ is the reduction in the probability of injury it achieves.
- $L$ is the expected loss from an injury.

A design is defective when a safer design would have cost less than the harm it prevents. Because a design defect affects every unit sold, design claims tend to become class or [[Mass Tort|mass tort]] litigation, and products liability is a [[Latent Liability|latent]], long-tail exposure for insurers.

> [!example]- Is this ladder's design without the brace defective under the risk-utility test? {Example}
> A ladder maker could add a locking brace for \$6 a ladder. Without it, illustrative test data show a 1-in-2,000 chance that a ladder collapses during its useful life. With it, the chance falls to 1 in 10,000. A collapse causes an average injury of \$40,000.
>
> > [!answer]-
> > - The brace reduces the probability of a collapse by $\Delta P = 0.0005 - 0.0001 = 0.0004$.
> > - The expected harm it prevents per ladder is $0.0004 \times \$40{,}000 = \$16$.
> > - The brace costs $\Delta B = \$6$, which is less than \$16.
> > - The safer design costs less than the harm it prevents, so the ladder without the brace has a design defect.

## Defences

*Misuse* of the product in a way the seller couldn't reasonably foresee defeats or reduces liability. A *substantial alteration* after sale breaks the link to the seller. The *state of the art* defence argues the product reflected the scientific and technical knowledge available when it was made. *Assumption of risk*, knowingly using a product known to be defective, and in many states comparative fault reduce or bar recovery. Statutes of repose cut off claims a set number of years after first sale.

> [!trap] Treating foreseeable misuse as a defence
> Standing on a chair is misuse, but a foreseeable one, so a manufacturer must design or warn against it. Only unforeseeable misuse defeats a claim.

## The chain of distribution

A plaintiff can sue the component maker, the assembler, the distributor and the retailer. Where the state applies strict liability, it reaches a retailer who never opened the box. A downstream seller held strictly liable without fault of its own can usually claim indemnity from the manufacturer, and many states' "innocent seller" statutes now dismiss a retailer when the manufacturer is solvent and within the court's reach.

> [!example]- How is this pressure cooker loss shared among the four defendants? {Example}
> A pressure cooker's lid blows off and burns a user, whose damages are \$400,000. A manufacturer assembled the cooker using a pressure valve made by a component supplier, sold it to a distributor, and the distributor sold it to the retailer that sold it to the user. The jury finds:
>
> - a manufacturing defect in the valve, and a design defect in the cooker, whose lid had no lock to stop it being opened under pressure;
> - fault of 70% for the manufacturer and 30% for the component supplier;
> - the retailer and distributor strictly liable but not at fault.
>
> > [!answer]-
> > - Where joint and several liability applies, the user can collect the whole \$400,000 from any defendant strictly liable to her, typically the solvent one with the most insurance.
> > - The defendants then settle among themselves through indemnity and contribution.
> > - The manufacturer bears $0.70 \times \$400{,}000 = \$280{,}000$, and the component supplier $0.30 \times \$400{,}000 = \$120{,}000$.
> > - The retailer and distributor are fully indemnified because they only passed the product along, so they bear nothing in the end, although their insurers may pay defence costs until indemnity is secured.
> > - Each loss falls under the products-completed operations hazard of the payer's CGL, reducing its products aggregate rather than its general aggregate.

## The products-completed operations hazard

The CGL treats injury that happens away from the insured's premises and arises from its product as part of this hazard, with its own aggregate limit ([[Products and Completed Operations Liability]]). The CGL excludes damage to the insured's own product and the cost of a recall, because those are business risks rather than liability to others. A vendors endorsement extends the manufacturer's CGL to retailers who sell its products, so the manufacturer's insurer defends such a retailer from the start.
