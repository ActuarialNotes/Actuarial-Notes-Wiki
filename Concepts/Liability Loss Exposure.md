---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b34c3f3186fdbca1e3a3e695bb48c19b4ed438d1845d675fa8cbde1a4f44a42d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Liability Loss Exposure.md
---

A **liability loss exposure** is any condition or situation that presents the possibility of a claim alleging that a person or organization is legally responsible for injury or damage suffered by another party. It is one of the four types of [[Loss Exposure|loss exposure]], and its financial consequences are the damages the party may have to pay and the cost of defending the claim, which is incurred even when the claim has no merit. [[Liability Insurance|Liability insurance]] finances these consequences, through the homeowners and personal auto policies for individuals and through [[Commercial General Liability|commercial general liability]] and related forms for businesses.

> $$L = D + C_{\text{def}}$$

> $$E[L] = f\left(p\,\bar{D} + \bar{C}_{\text{def}}\right)$$

- **Symbols:** $L$ is the cost of one claim, made up of the damages $D$ the party is held liable for and the defense costs $C_{\text{def}}$. In the expected cost, $f$ is the expected number of claims a year, $p$ is the probability that a claim results in a payment, $\bar{D}$ is the average damages when one does, and $\bar{C}_{\text{def}}$ is the average cost of defending a claim, which applies to every claim.
- **Torts:** A tort is a civil wrong other than a breach of contract, and [[Tort Law|tort law]] is the main source of liability claims. Negligence requires a duty owed to the claimant, a breach of that duty, an injury, and the breach being the proximate cause of the injury. Intentional torts, such as assault, libel and trespass, require intent to act rather than carelessness. Strict liability attaches without fault to activities such as using explosives, keeping wild animals and selling defective products.
- **Contracts and statutes:** A party can be liable for breaching a contract or a warranty, and it can take on another party's liability by contract, through a hold harmless or indemnity agreement in a lease or a construction contract. Statutes create liability as well, as workers compensation laws do for employers and environmental laws do for polluters.
- **Damages:** Compensatory damages are special damages, which are measurable economic losses such as medical expenses and lost wages, and general damages, which compensate for losses with no market price, such as pain and suffering. [[Punitive Damages|Punitive damages]] punish especially reckless or malicious conduct, and their insurability varies by jurisdiction.
- **Liability without one's own fault:** [[Vicarious Liability|Vicarious liability]] makes an employer answer for an employee's torts committed at work, and [[Joint and Several Liability|joint and several liability]] can make one defendant pay the whole of an award that several caused. Both widen an exposure beyond the party's own conduct.
- **Personal exposures:** An individual faces liability from owning or renting a home, from personal activities such as sports, from pets, and from owning or driving autos and watercraft. The homeowners policy's liability section, the [[Personal Auto Policy|personal auto policy]] and an [[Umbrella Liability Insurance|umbrella policy]] above them treat these exposures.
- **Commercial exposures:** A business faces liability from its premises and operations, from the products it sells and the work it has completed, from autos, from injuries to its employees, from pollution, from professional services, and from the decisions of its directors and officers. The CGL covers the first two, and the others call for business auto, [[Workers Compensation Insurance|workers compensation]] and employers liability, pollution, [[Professional Liability Insurance|professional liability]] and management liability coverage.
- **Managing the exposure:** [[Risk Control|Risk control]] reduces the chance and size of claims through safe premises, product testing, warnings, training and careful contract wording. Noninsurance transfer moves liability to another party through a hold harmless agreement, and insurance pays for what remains, with defense costs usually paid in addition to the limits.

> [!example]- Expected Cost of Premises Claims for a Store {Example}
> A retail store expects 3 premises liability claims a year, such as customers who slip or trip. With illustrative figures, 40% of claims result in a payment averaging \$25,000, and defending a claim costs an average of \$6,000 whether or not it results in a payment. Find the expected annual cost and the share that is defense.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[L] &= 3\left(0.40 \times 25{,}000 + 6{,}000\right) \\
> > &= 3(10{,}000 + 6{,}000) \\
> > &= 48{,}000 \\
> > E[C_{\text{def}}] &= 3 \times 6{,}000 \\
> > &= 18{,}000
> > \end{align*}
> > $$
> > The store's liability exposure costs \$48,000 a year on average, and defense makes up \$18,000 of it, or 37.5%. Defense is paid on all three claims, including the ones that fail, which is why a liability exposure has a cost even for a party that is rarely found liable and why insurers value the [[Duty to Defend|duty to defend]].

> [!example]- An Award Above the Homeowners Limit {Example}
> A guest falls on icy steps the homeowner failed to clear and suffers \$140,000 of medical expenses, \$90,000 of lost wages and \$350,000 of pain and suffering. The court finds the guest 20% at fault for ignoring a warning, and the state applies pure comparative negligence. The homeowners policy has a \$300,000 liability limit, and the homeowner also carries an umbrella policy. Find the award and how it is paid.
>
> > [!answer]-
> > The medical expenses and lost wages are special damages and the pain and suffering is general damages. Comparative negligence reduces the award by the guest's share of fault.
> > $$
> > \begin{align*}
> > D &= 140{,}000 + 90{,}000 + 350{,}000 \\
> > &= 580{,}000 \\
> > R &= (1 - 0.20) \times 580{,}000 \\
> > &= 464{,}000 \\
> > \text{Above limit} &= 464{,}000 - 300{,}000 \\
> > &= 164{,}000
> > \end{align*}
> > $$
> > The homeowners policy pays \$300,000 and the umbrella pays the \$164,000 above it. Without the umbrella, the homeowner would owe \$164,000 personally, which is the severity that makes personal liability an exposure to transfer rather than retain. General damages are more than half of this award, which is why liability severity is hard to predict from economic losses alone.

> [!tip]- How it appears on the exam
> - **DISC-IA:** The homeowners section asks how an individual manages personal liability exposures, and the CGL section opens by analyzing a business's liability exposures. Questions describe an activity and ask what legal basis a claim would rest on, what damages it could bring, and which policy responds.
> - **DISC-RM:** In the section on insurance as a risk management technique, a scenario describes a household or business and asks for its personal or commercial liability exposures, their financial consequences, and how risk control, contracts and insurance would treat them.

> [!warning]- Exam traps
> - **Defense costs are part of the exposure:** A claim with no merit still has to be defended. Measuring a liability exposure by expected damages alone leaves out a cost that is incurred on every claim.
> - **Negligence needs all four elements:** A careless act with no injury, or an injury the breach did not cause, gives no negligence claim. Answers that stop at "the insured was careless" miss causation and damages.
> - **Strict liability is not negligence:** Under strict liability the claimant does not have to prove carelessness, so precautions do not defeat the claim. Precautions still reduce how often injuries occur.
> - **Contractual liability is assumed liability:** A hold harmless agreement moves another party's liability onto the insured, so the exposure depends on contracts the insured signs as well as on what it does. Whether a policy covers that assumed liability depends on its insured contract wording.
