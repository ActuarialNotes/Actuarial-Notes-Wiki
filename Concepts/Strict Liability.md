---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:4fefeb900d702e540d58d50c620b4e77517f4f331e5b124ec05694ab2ecba719
  sources:
    - "Cornell LII Wex, \"strict liability\", whole entry, sha256:d45534046effd9edd7fcb7e68b0aaaef40a26a3ae15af3dd8ab480d5ad557a06 — https://www.law.cornell.edu/wex/strict_liability"
    - "Cornell LII Wex, \"abnormally dangerous activity\", whole entry, sha256:ebfe3cfce29c1f965f9ce4d508c731258c0a87db6b6117d516da3277fbae14ba — https://www.law.cornell.edu/wex/abnormally_dangerous_activity"
    - "Cornell LII Wex, \"ultrahazardous activity\", whole entry, sha256:086f2b99ee5e944f2c3823938b5caf0a021fb147b60fd99ea5b5b5e689fa10ef — https://www.law.cornell.edu/wex/ultrahazardous_activity"
    - "Cornell LII Wex, \"one-bite rule\", whole entry, sha256:83c3e494197219e1a5fe968f1117bf9880ccf680744f0c0d879135ac1feaef61 — https://www.law.cornell.edu/wex/one-bite_rule"
    - "Cornell LII Wex, \"dram shop rule\", whole entry, sha256:702e3e7b3943a2c88ebb6dad17f2967257cdedeeabfbc765a87cdb4fb22a54bf — https://www.law.cornell.edu/wex/dram_shop_rule"
    - "Cornell LII Wex, \"workers compensation\", whole entry, sha256:8195d152ed7e85da8dc69b09e5ec3f1ed7bf35c4ef9ba7571a60a3b87cb33718 — https://www.law.cornell.edu/wex/workers_compensation"
    - "Cornell LII Wex, \"vicarious liability\", whole entry, sha256:57fcdf516d60286d1e2944aa84388f6fc92233e4e3400316d9881acafbc27856 — https://www.law.cornell.edu/wex/vicarious_liability"
    - "Cornell LII Wex, \"respondeat superior\", whole entry, sha256:fd77a3983e2353c2f15adffd48d82d032d09d3a1ab40c5c752bfb4140e2baf02 — https://www.law.cornell.edu/wex/respondeat_superior"
    - "42 U.S.C. s.9607 (CERCLA liability), via LII, section text, sha256:44d4821fc4607bf9e56abf0eb70b7b5966b58fa03e5e2e4b081c321b7fe4e1f0 — https://www.law.cornell.edu/uscode/text/42/9607"
    - "Webb v. Zern, 422 Pa. 424 (1966) (Caselaw Access Project), quotation of Restatement (Second) s.402A, sha256:eac448a0817d7253681fb5fd8506c8b786db8c6c360e2609148f256d0947c5f0 — https://static.case.law/pa/422/cases/0424-01.json"
    - "ISO CGL Coverage Form CG 00 01 04 13 (specimen copy), exclusions c (liquor liability) and f (pollution), sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Strict Liability.md
---

**Strict Liability** is liability imposed without proof of fault: the defendant pays for harm caused by certain activities, animals or products even though it took every reasonable precaution. It is one of the three bases of [[Tort Law|tort liability]], alongside [[Intentional Tort|intentional torts]] and [[Negligence|negligence]].

The law reserves it for situations where the risk can't be eliminated by care, so the party that creates the risk and profits from it bears its cost. It differs from negligence in what the plaintiff must prove:

| | Negligence | Strict liability |
| :--- | :--- | :--- |
| The plaintiff proves | Duty, breach of reasonable care, causation and damages | That the activity caused the harm |
| Every reasonable precaution taken | Defeats the claim | Is no defence |
| The plaintiff's own fault | Reduces or bars the award | Traditionally, only knowing assumption of the risk is a defence |

Many comparative fault states now also reduce a strict liability award by the plaintiff's share of fault. Strict liability is not absolute: the plaintiff still has to prove that the activity caused the harm and that the harm came from the risk that made the activity dangerous.

> [!example]- What do the homeowner and the hiker recover from this quarry blast, in negligence and in strict liability? {Example}
> A quarry operator sets off a scheduled blast using standard charges, after posting warning signs and sounding sirens, in full compliance with state regulations. The vibration cracks the foundation of a house 400 metres away, costing $\$180{,}000$ to repair. A hiker who walked past the signs into the cordoned area is hit by flying rock and has damages of $\$90{,}000$. The hiker is found 60% at fault, and the state reduces strict liability awards by comparative fault.
>
> > [!answer]-
> > - In negligence, the operator followed industry practice and the regulations, so the homeowner would struggle to prove a breach. Without a breach the claim fails, and the recovery is $\$0$.
> > - In strict liability, blasting is an abnormally dangerous activity, so causation alone suffices and the homeowner recovers the full $\$180{,}000$.
> > - The hiker knowingly entered the danger zone. Under the traditional rule, that knowing assumption of the risk bars recovery entirely.
> > - Under the state's comparative fault rule, the hiker's award is reduced instead, to $(1 - 0.60) \times \$90{,}000 = \$36{,}000$.
> > - The operator's general liability insurer pays both strict liability claims if the policy carries no explosion exclusion, which insurers sometimes add by endorsement for blasting contractors.

## Abnormally dangerous activities

The doctrine traces to the English case *Rylands v. Fletcher* (1868), on water escaping from a reservoir. Restatement (Second) of Torts Section 520 weighs four factors:

1. Whether the activity carries a high risk of serious harm.
2. Whether reasonable care can eliminate that risk.
3. Whether it is a matter of common usage.
4. Whether it suits the place where it is carried on.

Blasting, storing explosives, transporting hazardous chemicals and fumigation are standard examples.

## Animals

The keeper of a wild animal, such as a tiger or a venomous snake, is strictly liable for harm from its dangerous propensities. The keeper of a domestic animal is strictly liable only if it knew of that animal's dangerous tendency (the so-called "one-bite" rule). Many states' dog-bite statutes impose strict liability regardless.

## Statutory strict liability

Legislatures impose liability without fault in several areas:

- [[Workers Compensation Underwriting|Workers compensation]] makes an employer pay for work injuries regardless of fault, in exchange for the employee giving up the right to sue in tort.
- *Dram shop* laws make a seller of alcohol liable when it serves a visibly intoxicated or underage customer who then causes harm. They are usually based on negligence, but some states impose the liability without proof of fault.
- Federal environmental law (CERCLA, the Superfund law) makes responsible parties liable for the cost of cleaning up hazardous waste sites without regard to fault.

> [!example]- How much does the driver injured by this bar's customer collect from insurance? {Example}
> A bar keeps serving a customer who is visibly intoxicated. On the way home he runs a red light and injures another driver, whose damages are $\$500{,}000$. The drunk driver's auto policy has a $\$100{,}000$ bodily injury limit. The state's dram shop act imposes liability without proof of fault and caps recovery against a seller at $\$150{,}000$ per person (illustrative). The bar's CGL has the standard liquor liability exclusion, and the bar buys a separate liquor liability policy with a $\$1{,}000{,}000$ limit.
>
> > [!answer]-
> > - The bar is liable because it served a visibly intoxicated customer who then caused the injury. In a state with a negligence-based dram shop law, the injured driver would also have to prove the bar's negligence.
> > - The CGL excludes the claim because the bar is in the business of serving alcohol, so the liquor liability policy responds, up to the statutory cap of $\$150{,}000$.
> > - The insured recovery is $\$100{,}000 + \$150{,}000 = \$250{,}000$.
> > - The remaining $\$500{,}000 - \$250{,}000 = \$250{,}000$ can be pursued only against the drunk driver personally, or through the injured driver's own [[Uninsured Automobile Coverage|underinsured motorists coverage]] if it has any.

## Vicarious liability

Vicarious liability makes one person answer for another's tort because of their relationship, such as an employer for an employee acting within the scope of employment (*respondeat superior*), or in some states a vehicle owner for a permissive driver. It is strict as to the vicariously liable party, who need not be at fault at all, even though the underlying tort may be negligence. If the employee committed no tort, there is nothing for the employer to be vicariously liable for.

## Products liability

Since the 1960s, a seller of a product in a defective condition unreasonably dangerous to the user has been strictly liable for the harm it causes, under Restatement (Second) of Torts Section 402A. This branch is [[Products Liability]], and it is what made [[Asbestos]] and most [[Mass Tort|mass tort]] litigation possible.

## Strict liability and insurance

A strict liability judgment is a sum the insured is legally obligated to pay, so a liability policy covers it unless an exclusion applies. Several exclusions are aimed at strict liability exposures, such as the CGL's pollution exclusion and its liquor liability exclusion for insureds in the business of selling or serving alcohol. They push those risks to [[Environmental Insurance|environmental]] and liquor liability policies. Insurers also rate strictly liable classes, such as blasting contractors, much higher than ordinary contractors.

> [!trap] Treating reasonable care as a defence
> Proof that the defendant used every reasonable precaution defeats a negligence claim but not a strict liability claim. A blaster who followed every regulation still pays for the cracked foundation.
