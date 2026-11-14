---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:1898825abb34a42eb4456942f743af89936371fabd4b40923e28d745d179f8df
  sources:
    - "Terrorism Risk Insurance Act of 2002 as amended, 15 U.S.C. 6701 note (LII): §102(1)(A) certification by the Secretary in consultation with DHS and the Attorney General; §102(6) insurer includes affiliates; §102(7) deductible 20% of prior-year DEP; §103(a) Secretary administers; §103(b)-(c) disclosure and make available; §103(e)(1) federal share 80%, trigger $200M from 2020; §103(e)(2)-(3) $100B cap, pro rata, notice to Congress; §103(e)(6)-(8) IMARA, mandatory recoupment at 140%, discretionary recoupment, policyholder surcharge collected and remitted; §108(a) termination Dec. 31, 2027, sha256:ab50d06aef460fe2adc0d74c45beb59bece7c4f966777cbcf9af2714ad29f0b6 — https://www.law.cornell.edu/uscode/text/15/6701"
    - "31 C.F.R. part 50 (eCFR, read 2026-10-10): §50.4(q) mandatory recoupment amount; §50.90 140% and discretionary recoupment; §50.94(c)(3) 'The Federal terrorism policy surcharge is not considered premium', sha256:f283053648fa0161e09f5741e242364bf2025cd1e3b58939edace0dcd04ac0c5 — https://www.ecfr.gov/current/title-31/part-50"
    - "U.S. Treasury, Terrorism Risk Insurance Program page (Secretary administers with the assistance of FIO; TRIEA 2005 to 2007, TRIPRA 2007 to 2014, 2015 Act to 2020, 2019 Act to 2027), sha256:77d334948b2f89aeabe7679a53269fd8269bf52d8ad862767bc2c6a01ab8096e — https://home.treasury.gov/policy-issues/financial-markets-financial-institutions-and-fiscal-service/federal-insurance-office/terrorism-risk-insurance-program"
    - "Pub. L. 110-160 (TRIPRA 2007), §§2-5, 121 Stat. 1839-1841, sha256:541366d8707b0160ed0d4fad9d6c7190e8bbae12cf73647d76fa668a2558f53d — https://www.govinfo.gov/content/pkg/PLAW-110publ160/pdf/PLAW-110publ160.pdf"
    - "Pub. L. 116-94, div. I, title V, §§501-502 (TRIP Reauthorization Act of 2019), PDF pp.494-495, sha256:d724cc183016bdd5408a523a4fbed5326399decae4e50a4315cead2475c47aa8 — https://www.congress.gov/116/plaws/publ94/PLAW-116publ94.pdf"
    - "The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Terrorism Risk Insurance Program.md
---

The **Terrorism Risk Insurance Program** is the U.S. federal program under which the Treasury shares insured losses from certified acts of terrorism with private insurers, and later recovers part of its payments through surcharges on commercial policyholders. It was created by the Terrorism Risk Insurance Act of 2002 (TRIA), and the Secretary of the Treasury administers it with the assistance of the Federal Insurance Office. The coverage itself, and how a single attack's loss is split, are on [[Terrorism Insurance]].

The deductible of an insurer group $g$ is

> $$D_g = d \times \sum_{i \in g} \text{DEP}_i$$

- $d$ is the deductible percentage, currently 20%.
- $\text{DEP}_i$ is the prior-year direct earned premium of affiliated insurer $i$ in the program's lines.

Affiliated insurers count as one, with a single deductible based on their combined premium. Once its deductible is met, the federal payment to the group is

> $$F_g = c\,\Big(\sum_{e} L_{g,e} - D_g\Big)^+$$

- $c$ is the federal share, currently 80%.
- $L_{g,e}$ is the group's insured loss from certified act $e$ in the program year.
- $(x)^+$ is $x$ when $x$ is positive and $0$ otherwise.

The deductible and the federal share apply to an insurer's losses from all certified acts in a calendar year combined, not to each act separately.

> [!example]- What is the federal payment to this insurer group for the year's two attacks? {Example}
> An insurer group has two affiliated companies with prior-year direct earned premium in the program's lines of $\$600{,}000{,}000$ and $\$400{,}000{,}000$. Two certified acts occur in the same year. The group's losses are $\$150{,}000{,}000$ from the first and $\$250{,}000{,}000$ from the second, and industry losses comfortably exceed the program trigger.
>
> > [!answer]-
> > - The two affiliates share one deductible, $D_g = 0.20 \times \$1{,}000{,}000{,}000 = \$200{,}000{,}000$.
> > - The losses from both acts are added before the deductible applies, for $\$400{,}000{,}000$.
> > - The federal payment is $F_g = 0.80 \times (\$400{,}000{,}000 - \$200{,}000{,}000) = \$160{,}000{,}000$, and the group retains $\$240{,}000{,}000$.
> > - Treated act by act, the first loss would fall below the deductible and the second would earn only $0.80 \times \$50{,}000{,}000 = \$40{,}000{,}000$, understating the federal payment by $\$120{,}000{,}000$.

## Certification

The Secretary of the Treasury, in consultation with the Secretary of Homeland Security and the Attorney General, decides whether an act is certified. Without certification nothing is shared, and a policy's terrorism exclusion or coverage applies as written.

## Make available and disclose

Insurers in the covered commercial lines must offer terrorism coverage on terms not materially different from the rest of the policy. They must disclose the premium charged for it and the federal share. If the insured declines, the insurer may exclude certified terrorism.

## Program trigger and cap

The Treasury pays only when industry insured losses from certified acts in the year exceed the program trigger. Annual losses above $\$100$ billion are covered by neither the government nor insurers that have met their deductibles. The Secretary determines each insurer's pro rata share of insured losses when they exceed the cap, and must notify Congress if losses are estimated to exceed $\$100$ billion.

## Recoupment

If the losses insurers bore themselves, through deductibles and their 20% co-share, are below the insurance marketplace aggregate retention amount (IMARA), the Treasury must recoup the shortfall, up to what it paid. The mandatory recoupment amount is

> $$M = \min\left(F,\ (\text{IMARA} - U)^+\right)$$

- $F$ is the total federal payment for the year.
- $U$ is the insured losses insurers bore themselves.

The mandatory amount is collected at 140% through surcharges on commercial property and casualty policies. Anything the Treasury paid above it may be recouped at its discretion. The surcharge is a pass-through: insurers collect it from policyholders and remit it, so it isn't premium income, and it is not charged to the insurers that received federal payments.

> [!example]- What must the Treasury recoup after this severe year, and how much is left to its discretion? {Example}
> Suppose, for illustration, that the IMARA for the year is $\$45$ billion. Certified acts cause insured losses of $\$60$ billion, of which insurers bear $\$35$ billion through their deductibles and co-shares and the Treasury pays $\$25$ billion.
>
> > [!answer]-
> > - Insurers bore less than the retention amount, so the shortfall must be recouped, up to what the Treasury paid.
> > - The mandatory recoupment amount is $M = \min(25,\ 45 - 35) = \$10$ billion.
> > - It is collected at 140%, so the Treasury collects $1.40 \times 10 = \$14$ billion in surcharges from commercial policyholders.
> > - The remaining $25 - 10 = \$15$ billion of its payments may be recouped at its discretion.

## Extensions

Congress extended the program in 2005 (to 2007), 2007 (to 2014), 2015 (to 2020) and 2019 (to 2027). The 2015 Act phased the federal share down from 85% to 80% and the trigger up from $\$100$ million to $\$200$ million by 2020. The 2007 and 2019 Acts extended the program without changing the deductible, the federal share or the trigger. The program now runs through December 31, 2027.

> [!trap] Applying the deductible to each attack separately
> The deductible and federal share apply to the year's combined losses from all certified acts. Applying the deductible to each act separately understates the federal payment, by $\$120{,}000{,}000$ in the example above.
