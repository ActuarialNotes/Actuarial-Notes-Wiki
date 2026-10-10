---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:67083528d52b5cadd34baf22c633eae98f22dd6c6ec26e0e20d0b00ebede267e
  sources:
    - "Terrorism Risk Insurance Act of 2002 as amended, 15 U.S.C. 6701 note (LII): §102(1)(A) certification by the Secretary in consultation with DHS and the Attorney General; §102(6) insurer includes affiliates; §102(7) deductible 20% of prior-year DEP; §103(a) Secretary administers; §103(b)-(c) disclosure and make available; §103(e)(1) federal share 80%, trigger $200M from 2020; §103(e)(2)-(3) $100B cap, pro rata, notice to Congress; §103(e)(6)-(8) IMARA, mandatory recoupment at 140%, discretionary recoupment, policyholder surcharge collected and remitted; §108(a) termination Dec. 31, 2027, sha256:ab50d06aef460fe2adc0d74c45beb59bece7c4f966777cbcf9af2714ad29f0b6 — https://www.law.cornell.edu/uscode/text/15/6701"
    - "31 C.F.R. part 50 (eCFR, read 2026-10-10): §50.4(q) mandatory recoupment amount; §50.90 140% and discretionary recoupment; §50.94(c)(3) 'The Federal terrorism policy surcharge is not considered premium', sha256:f283053648fa0161e09f5741e242364bf2025cd1e3b58939edace0dcd04ac0c5 — https://www.ecfr.gov/current/title-31/part-50"
    - "U.S. Treasury, Terrorism Risk Insurance Program page (Secretary administers with the assistance of FIO; TRIEA 2005 to 2007, TRIPRA 2007 to 2014, 2015 Act to 2020, 2019 Act to 2027), sha256:77d334948b2f89aeabe7679a53269fd8269bf52d8ad862767bc2c6a01ab8096e — https://home.treasury.gov/policy-issues/financial-markets-financial-institutions-and-fiscal-service/federal-insurance-office/terrorism-risk-insurance-program"
    - "Pub. L. 110-160 (TRIPRA 2007), §§2-5, 121 Stat. 1839-1841, sha256:541366d8707b0160ed0d4fad9d6c7190e8bbae12cf73647d76fa668a2558f53d — https://www.govinfo.gov/content/pkg/PLAW-110publ160/pdf/PLAW-110publ160.pdf"
    - "Pub. L. 116-94, div. I, title V, §§501-502 (TRIP Reauthorization Act of 2019), PDF pp.494-495, sha256:d724cc183016bdd5408a523a4fbed5326399decae4e50a4315cead2475c47aa8 — https://www.congress.gov/116/plaws/publ94/PLAW-116publ94.pdf"
    - "The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Terrorism Risk Insurance Program.md
---

**The Terrorism Risk Insurance Program** is the U.S. federal program, created by the Terrorism Risk Insurance Act of 2002 (TRIA) and extended several times since, under which the Treasury shares insured losses from certified acts of terrorism with private insurers and later recovers part of its payments through surcharges on commercial policyholders. The Secretary of the Treasury administers it with the assistance of the Federal Insurance Office. The coverage itself, and how a single attack's loss is split, are on the [[Terrorism Insurance]] page; this page covers how the program works as a mechanism across insurers and over a program year.

> $$D_g = d \times \sum_{i \in g} \text{DEP}_i$$

> $$F_g = c\,\Big(\sum_{e} L_{g,e} - D_g\Big)^+$$

> $$M = \min\left(F,\ (\text{IMARA} - U)^+\right)$$

- **Symbols:** $D_g$ is the deductible of insurer group $g$, the deductible percentage $d$ times the group's prior-year direct earned premium in the program's lines, summed over its affiliated insurers $i$. $L_{g,e}$ is the group's insured loss from certified act $e$ in the program year, $c$ is the federal share and $F_g$ the federal payment to the group. In the recoupment, $F$ is the total federal payment for the year, $U$ is the insured losses insurers bore themselves, IMARA is the insurance marketplace aggregate retention amount and $M$ is the mandatory recoupment amount. The current figures are $d = 20\%$ and $c = 80\%$.
- **An annual aggregate:** The deductible and the federal share apply to an insurer's losses from all certified acts in a calendar year combined, not to each act separately. Affiliated insurers count as one, with a single deductible based on their combined premium.
- **Certification:** The Secretary of the Treasury, in consultation with the Secretary of Homeland Security and the Attorney General, decides whether an act is certified. Without certification nothing is shared, and a policy's terrorism exclusion or coverage applies as written.
- **Make available and disclose:** Insurers in the covered commercial lines must offer terrorism coverage on terms not materially different from the rest of the policy, and must disclose the premium charged for it and the federal share. If the insured declines, the insurer may exclude certified terrorism.
- **Program trigger and cap:** The Treasury pays only when industry insured losses from certified acts in the year exceed the program trigger. Annual losses above \$100 billion are covered by neither the government nor insurers that have met their deductibles, and Congress decides how any excess is handled.
- **Recoupment:** If the losses insurers bore themselves, through deductibles and their 20% co-share, are below the insurance marketplace aggregate retention amount, the Treasury must recoup the shortfall, up to what it paid. The mandatory amount is collected at 140% through surcharges on commercial property and casualty policies, and anything the Treasury paid above it may be recouped at its discretion. The surcharge is a pass-through: insurers collect it from policyholders and remit it, so it isn't premium income.
- **Extensions:** Each reauthorization, in 2005, 2007, 2015 and 2019, raised the private sector's share, through larger deductibles, a smaller federal share or a higher trigger. The program now runs through December 31, 2027, and the questions at each renewal are how much of the risk the private market could carry without it.

> [!example]- Two Attacks Against One Group Deductible {Example}
> An insurer group has two affiliated companies with prior-year direct earned premium in the program's lines of \$600,000,000 and \$400,000,000. Two certified acts occur in the same year. The group's losses are \$150,000,000 from the first and \$250,000,000 from the second, and industry losses comfortably exceed the program trigger. Find the federal payment, and compare it with treating each act on its own.
>
> > [!answer]-
> > The two affiliates share one deductible, and the losses from both acts are added before it applies.
> > $$
> > \begin{align*}
> > D_g &= 0.20 \times (600{,}000{,}000 + 400{,}000{,}000) \\
> > &= 200{,}000{,}000 \\
> > F_g &= 0.80\,(400{,}000{,}000 - 200{,}000{,}000) \\
> > &= 160{,}000{,}000
> > \end{align*}
> > $$
> > The group retains \$240,000,000. Treated act by act, the first loss would fall below the deductible and the second would earn only $0.80 \times (250{,}000{,}000 - 200{,}000{,}000) = 40{,}000{,}000$, so the per-act view understates the federal share by \$120,000,000. The annual aggregate is what protects an insurer hit by a series of attacks.

> [!example]- Mandatory Recoupment After a Severe Year {Example}
> Suppose, for illustration, that the insurance marketplace aggregate retention amount for the year is \$45 billion. Certified acts cause insured losses of \$60 billion, of which insurers bear \$35 billion through their deductibles and co-shares and the Treasury pays \$25 billion. Find the mandatory recoupment amount, the surcharges collected for it, and the amount left to the Treasury's discretion.
>
> > [!answer]-
> > Insurers bore less than the retention amount, so the shortfall must be recouped, up to what the Treasury paid.
> > $$
> > \begin{align*}
> > M &= \min\left(25,\ 45 - 35\right) \\
> > &= 10 \\
> > \text{Surcharges} &= 1.40 \times 10 \\
> > &= 14
> > \end{align*}
> > $$
> > The Treasury must collect \$14 billion in surcharges from commercial policyholders, and the remaining \$15 billion of its payments may be recouped at its discretion. If insurers had borne \$45 billion or more, there would be no mandatory recoupment. In a moderate year, then, the federal payments are largely a loan from future policyholders, and only in a severe year does the program act as true federal reinsurance.

> [!tip]- How it appears on the exam
> - **DISC-IA:** Questions ask what the program is for, which acts and lines it covers, what the make-available and disclosure requirements mean for a commercial policy, and how certification, the insurer deductible, the federal share, the program trigger, the cap and recoupment work. The applied version asks how much of a terrorism loss an insurer keeps.
> - **Related reading:** Why terrorism is hard to insure, the NBCR exclusions and single-event calculations are on [[Terrorism Insurance]], and GI-302 links that page for the same material.

> [!warning]- Exam traps
> - **Annual, not per event:** The deductible and federal share apply to the year's combined losses from all certified acts. Applying the deductible to each act separately understates the federal payment.
> - **Group, not company:** Affiliated insurers share one deductible based on their combined premium. Computing a deductible for each affiliate misstates both the deductible and the federal share.
> - **Recoupment is from policyholders:** Mandatory recoupment is collected as a surcharge on commercial policies, not charged to the insurers that received federal payments. Insurers act only as collection agents.
> - **140%, not 100%:** The mandatory recoupment amount is collected at 140%. Discretionary recoupment above it is a separate decision for the Treasury.
> - **The cap is not reinsurance:** Above \$100 billion, insurers that have met their deductibles owe nothing more and the government is not obliged to pay. Policyholders' recovery then depends on how losses are prorated and on what Congress does.
