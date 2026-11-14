---
aliases:
  - Terrorism
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:df575366c11cc6bba0dccabedb480fa81e88e3383dcdcf76385665b2d54bc3c1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Terrorism Insurance.md
---
**Terrorism Insurance** is coverage for losses from acts of terrorism under property, liability, workers compensation and other commercial policies. Terrorism is a man-made [[Catastrophe Risk|catastrophe risk]] that private insurers struggle to price or diversify, so in the United States it is backed by a federal program created by the Terrorism Risk Insurance Act (TRIA) of 2002.

## The federal backstop

Under the program, insurers must make terrorism coverage available, and the federal government shares losses above each insurer's deductible from an act the Treasury certifies. Insurer $i$'s deductible is

> $$D_i = d \times \text{DEP}_i$$

- $d$ is the deductible percentage, currently 20%.
- $\text{DEP}_i$ is the insurer's direct earned premium in the lines the program covers in the prior calendar year.

The federal payment is

> $$F_i = c\,(L_i - D_i)^+ \times \mathbf{1}\{L_{\text{ind}} > T\}$$

- $c$ is the federal share, currently 80%.
- $L_i$ is the insurer's insured loss from certified acts in the year.
- $(L_i - D_i)^+$ is $L_i - D_i$ when it is positive, and $0$ otherwise.
- $L_{\text{ind}}$ is the industry's aggregate insured loss.
- $T$ is the program trigger, currently $\$200$ million.
- $\mathbf{1}\{L_{\text{ind}} > T\}$ is $1$ when the industry loss exceeds the trigger, and $0$ otherwise.

The insurer retains the rest:

> $$\text{Retained}_i = L_i - F_i$$

> [!example]- What are this insurer's federal payment and retained loss after a certified attack? {Example}
> An insurer earned $\$800{,}000{,}000$ of direct premium in the program's lines last year. A certified act of terrorism causes industry insured losses of $\$5{,}000{,}000{,}000$, of which the insurer's share is $\$260{,}000{,}000$. Use a 20% deductible and an 80% federal share.
>
> > [!answer]-
> > - The industry loss exceeds the $\$200$ million trigger, so the program responds.
> > - The deductible is $0.20 \times 800{,}000{,}000 = \$160{,}000{,}000$.
> > - The federal payment is $0.80\,(260{,}000{,}000 - 160{,}000{,}000) = \$80{,}000{,}000$.
> > - The insurer retains $260{,}000{,}000 - 80{,}000{,}000 = \$180{,}000{,}000$, or 22.5% of last year's premium in those lines.
> > - The deductible scales with premium, so a large insurer retains a large amount before the backstop starts, and it must hold capital or buy reinsurance for that amount.

> [!trap] Testing the trigger on the insurer's own loss
> The trigger is tested on industry-wide insured losses, and the deductible on the insurer's own losses. A small insurer with $\$50$ million of premium and $\$30$ million of losses gets nothing if industry losses are $\$150$ million, below the trigger. At $\$400$ million of industry losses it would get $0.80\,(30 - 10) = \$16$ million.

## Certification and the make-available requirement

The program pays only for an act the Secretary of the Treasury certifies as terrorism, in consultation with the Secretary of Homeland Security and the Attorney General. The act must be violent, dangerous to life, property or infrastructure, result in damage within the United States, be committed to coerce the civilian population or influence government policy, and cause insured losses above \$5 million. Domestic as well as foreign terrorism has qualified since the 2007 extension.

Insurers writing the covered commercial lines must offer terrorism coverage on terms not materially different from their other coverage, and must disclose its premium and the federal share. The insured may decline it, except where state law requires the coverage, as in workers compensation. A policy without the coverage is not backstopped for that insured's losses. Lines such as life, health, crop, mortgage guaranty, medical malpractice and reinsurance are outside the program.

## Cap, recoupment and extensions

Neither the government nor insurers pay for aggregate insured losses above \$100 billion in a year, and the Treasury prorates payments if the cap is reached. The federal share is recouped afterwards through surcharges on commercial policyholders, up to an industry retention amount set by the Act.

The original program was temporary and has been extended in 2005, 2007, 2015 and 2019, generally shifting more of the loss to private insurers. The 2015 extension phased the federal share down from 85% to 80% and the trigger up from \$100 million to \$200 million by 2020. The current authorization runs through December 31, 2027.

## Nuclear, biological, chemical and radiological attacks

Nuclear, biological, chemical and radiological (NBCR) attacks are mostly excluded by standard policies through the nuclear hazard and pollution exclusions. The program backstops NBCR losses only where the underlying policy covers them, so commercial property coverage for NBCR terrorism is scarce, while workers compensation covers injured workers whatever the weapon.

## Modelling terrorism risk

Unlike a hurricane, terrorism is caused by people who choose targets and adapt to defenses, and there is little history from which to estimate frequency. [[Catastrophe Modelling|Catastrophe models]] therefore rely on expert judgment for frequency and on deterministic attack scenarios for severity. Insurers manage terrorism mainly by limiting accumulations of insured value and employees in small areas around likely targets ([[Catastrophe Exposure Management]]), since one attack can strike property, workers compensation and life lines together.
