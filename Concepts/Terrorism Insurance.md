---
aliases:
  - Terrorism
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ec8d794f381f58f4cdcc2f9cdd8818d914cbcd1eab40950deec4ec697682e034
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Terrorism Insurance.md
---
**Terrorism Insurance** covers losses from acts of terrorism under property, liability, workers compensation and other commercial policies. Terrorism is a man-made [[Catastrophe Risk|catastrophe risk]] that private insurers struggle to price or diversify, so in the United States it is backed by a federal program created by the Terrorism Risk Insurance Act (TRIA) of 2002. Under the program, insurers must make terrorism coverage available, and the federal government shares losses above each insurer's deductible from an act the Treasury certifies.

> $$D_i = d \times \text{DEP}_i$$

> $$F_i = c\,(L_i - D_i)^+ \times \mathbf{1}\{L_{\text{ind}} > T\}$$

> $$\text{Retained}_i = L_i - F_i$$

- **Symbols:** $\text{DEP}_i$ is insurer $i$'s direct earned premium in the lines the program covers in the prior calendar year, $d$ is the deductible percentage and $D_i$ is the insurer's deductible. $L_i$ is the insurer's insured loss from certified acts in the year, $L_{\text{ind}}$ is the industry's aggregate insured loss, $T$ is the program trigger, $c$ is the federal share and $F_i$ is the federal payment. The current figures are $d = 20\%$, $c = 80\%$ and $T = \$200$ million.
- **Certification:** The program pays only for an act the Secretary of the Treasury certifies as terrorism, in consultation with the Secretary of Homeland Security and the Attorney General. The act must be violent, dangerous to life, property or infrastructure, result in damage within the United States, be committed to coerce the civilian population or influence government policy, and cause insured losses above \$5 million. Domestic as well as foreign terrorism has qualified since the 2007 extension.
- **Make-available requirement:** Insurers writing the covered commercial lines must offer terrorism coverage on terms not materially different from their other coverage, and must disclose its premium and the federal share. The insured may decline it, except where state law requires the coverage, as in workers compensation. Lines such as life, health, crop, mortgage guaranty, medical malpractice and reinsurance are outside the program.
- **Cap and recoupment:** Neither the government nor insurers pay for aggregate insured losses above \$100 billion in a year, and the Treasury prorates payments if the cap is reached. The federal share is recouped afterwards through surcharges on commercial policyholders, up to an industry retention amount set by the Act.
- **Extensions:** The original program was temporary and has been extended in 2005, 2007, 2015 and 2019, generally shifting more of the loss to private insurers. The 2015 extension phased the federal share down from 85% to 80% and the trigger up from \$100 million to \$200 million by 2020. The current authorization runs through December 31, 2027.
- **NBCR exclusions:** Nuclear, biological, chemical and radiological attacks are mostly excluded by standard policies through the nuclear hazard and pollution exclusions. The program backstops NBCR losses only where the underlying policy covers them, so commercial property coverage for NBCR terrorism is scarce, while workers compensation covers injured workers whatever the weapon.
- **Why it is hard to model:** Unlike a hurricane, terrorism is caused by people who choose targets and adapt to defenses, and there is little history from which to estimate frequency. [[Catastrophe Modelling|Catastrophe models]] therefore rely on expert judgment for frequency and on deterministic attack scenarios for severity. Insurers manage terrorism mainly by limiting accumulations of insured value and employees in small areas around likely targets ([[Catastrophe Exposure Management]]), since one attack can strike property, workers compensation and life lines together.

> [!example]- An Insurer's Share After a Certified Attack {Example}
> An insurer earned \$800,000,000 of direct premium in the program's lines last year. A certified act of terrorism causes industry insured losses of \$5,000,000,000, of which the insurer's share is \$260,000,000. Using a 20% deductible and an 80% federal share, find the federal payment and the insurer's retained loss.
>
> > [!answer]-
> > The industry loss exceeds the \$200 million trigger, so the program responds.
> > $$
> > \begin{align*}
> > D &= 0.20 \times 800{,}000{,}000 \\
> > &= 160{,}000{,}000 \\
> > F &= 0.80\,(260{,}000{,}000 - 160{,}000{,}000) \\
> > &= 80{,}000{,}000 \\
> > \text{Retained} &= 260{,}000{,}000 - 80{,}000{,}000 \\
> > &= 180{,}000{,}000
> > \end{align*}
> > $$
> > The insurer keeps \$180 million, or 22.5% of last year's premium in those lines. The deductible scales with premium, so a large insurer retains a large amount before the backstop starts, and that retained amount is what it must hold capital or buy reinsurance for.

> [!example]- When the Program Trigger Is Not Met {Example}
> A small insurer with \$50,000,000 of direct earned premium in the program's lines has \$30,000,000 of losses from a certified attack. Find the federal payment if industry insured losses are \$150,000,000, and again if they are \$400,000,000.
>
> > [!answer]-
> > At \$150 million the industry loss is below the \$200 million trigger, so the federal payment is zero and the insurer retains all \$30 million, 60% of its premium. At \$400 million the program responds.
> > $$
> > \begin{align*}
> > D &= 0.20 \times 50{,}000{,}000 \\
> > &= 10{,}000{,}000 \\
> > F &= 0.80\,(30{,}000{,}000 - 10{,}000{,}000) \\
> > &= 16{,}000{,}000
> > \end{align*}
> > $$
> > The insurer then retains \$14 million. The trigger makes a moderate attack concentrated on a few small insurers the most damaging case for them, because the backstop is measured on the industry's loss rather than on theirs.

> [!tip]- How it appears on the exam
> - **GI-302:** Candidates describe terrorism coverage among the specialty insurance coverages, including how TRIA's federal backstop works (certification, the make-available requirement, the insurer deductible, the federal share, the trigger and the cap), why terrorism is difficult to insure and model, and how NBCR exposures are treated.

> [!warning]- Exam traps
> - **Prior-year premium:** The insurer's deductible is a percentage of its direct earned premium in the covered lines for the prior calendar year, not its losses or its surplus. Using the current year's premium, or premium from every line, misstates the deductible.
> - **Two thresholds:** The trigger is tested on industry-wide insured losses, and the deductible on the insurer's own losses. An insurer with losses above its deductible gets nothing if the industry total is below the trigger.
> - **The federal share applies above the deductible:** The government pays its share of the insurer's losses above the deductible, not of the total loss. Applying 80% to the whole loss overstates the federal payment.
> - **Offered, not compulsory:** Insurers must offer terrorism coverage, but commercial insureds may decline it outside workers compensation. A policy without the coverage is not backstopped for that insured's losses.
