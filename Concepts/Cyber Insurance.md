---
aliases:
  - Cyber Risk
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:ca404ee85c9b0ecb99ba7d5574d9fe3caef17930088e05125867f2cad653cc09
  sources:
    - "Beazley Breach Response policy (Certain Underwriters at Lloyd's, US, NAPA program copy), Declarations pp.1-2 (aggregate limit with regulatory sublimit; breach response services limits; retentions), Insuring Agreements A-E pp.5-7 (privacy & security liability claims-made, breach response services, regulatory, website media, PCI), Exclusion T war p.14, First Party Computer Security endorsement p.37 (cyber extortion, data protection, business interruption; 12-hour waiting period; electrical/telecom infrastructure exclusion), sha256:f37a11b2fd6e195a777b8487c8d2bdc7c044b8c33e50092b9c71d6bf88598acb — https://www.napa-benefits.org/assets/pdf/policy/cyber/cyber-1m.pdf"
    - "Lloyd's Market Bulletin Y5381, State backed cyber-attack exclusions (2022), pp.2-3, sha256:12ec2f94bc3d114ca1c1d778e9e758010e2135b153d59266260fd942ecc4102e — https://assets.lloyds.com/media/35926dc8-c885-497b-aed8-6d2f87c1415d/Y5381%20Market%20Bulletin%20-%20Cyber-attack%20exclusions.pdf"
    - "N.Y. DFS Insurance Circular Letter No. 2 (2021), Cyber Insurance Risk Framework (systemic risk, silent/non-affirmative risk in GL and other policies, ransomware), sha256:9a44513116d576f27193a32cf208509255809ec5089f522f81745dbefb84ca86 — https://www.dfs.ny.gov/industry_guidance/circular_letters/cl2021_02"
    - "ISO CG 00 01 04 13 Commercial General Liability Coverage Form, exclusion f. Pollution (pp.3-4: heating-equipment and hostile-fire exceptions; clean-up costs), g. Aircraft, p. Electronic Data (p.5); no employment-related practices, professional services or data-disclosure exclusion in the base form, sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf"
    - "SOA GI-302 Syllabus (2027-07), learning outcome k (specialty coverages incl. excess, umbrella, professional liability, cyber risk, surety, terrorism), p.2, sha256:4b007f27cdfa4e554dca8638841ef73fddfcf1d0d1e3a954be6244f334c3a284 — https://www.soa.org/globalassets/assets/files/edu/2026/gi-302/2027-07-gi-302-syllabus.pdf"
    - "The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Cyber Insurance.md
---

**Cyber Insurance** covers an organization's own losses from a cyber event, such as a data breach, a ransomware attack or a network outage, and its [[Liability Insurance|liability]] to others for failing to protect data or systems. Cyber risk is the risk itself: loss from the failure, misuse or compromise of information technology and data.

Cyber insurance is sold mainly as a standalone policy combining first-party and third-party insuring agreements, each with its own sublimit, because traditional property and liability forms either exclude cyber losses or respond to them unpredictably. The insuring agreements are:

| | Insuring agreement | What it pays |
| :--- | :--- | :--- |
| First party | Breach response | Forensic investigators, legal advice, notifying affected people, credit monitoring, a call centre and public relations. |
| | Data restoration | Restoring or recreating damaged data and software. |
| | Network business interruption | Lost income and extra expense while systems are down, after a waiting period measured in hours. Dependent business interruption extends this to outages at a cloud or other service provider. |
| | Cyber extortion | Ransom and the cost of negotiating it. |
| Third party | Privacy and network security liability | Claims that the insured failed to protect personal data or let malware spread to others. |
| | Regulatory | The defense of privacy regulators' proceedings, and fines where the law allows them to be insured. |
| | Payment card industry | Assessments under card network contracts. |
| | Media liability | Defamation and infringement in the insured's digital content. |

Third-party coverages are usually claims-made. Notification costs and a ransom are the insured's own losses, while a customer's suit over stolen data is liability, so they sit under different insuring agreements with different triggers.

## Sublimits, retentions and waiting periods

Ransomware, social engineering fraud and dependent business interruption are commonly sublimited well below the aggregate limit. A single retention usually applies to all loss from one event, not a retention for each part. Business interruption has a waiting period in hours, a time deductible, in place of or in addition to a dollar retention. Business interruption is paid only for the hours after the waiting period ends, so the business interruption loss is

> $$\text{BI} = b\,(T - w)^+ + EE$$

- $b$ is the lost net income plus continuing expenses per hour.
- $T$ is the length of the outage in hours.
- $w$ is the waiting period in hours.
- $EE$ is extra expense.

The payment under insuring agreement $k$ is

> $$P_k = \min\left((X_k - R_k)^+,\ s_k\right)$$

- $X_k$ is the loss under insuring agreement $k$.
- $R_k$ is the part of the event's retention it absorbs.
- $s_k$ is its sublimit.

The policy pays in all

> $$\text{Paid} = \min\left(\sum_k P_k,\ L\right)$$

- $L$ is the policy aggregate limit.

> [!example]- What does this cyber policy pay for the ransomware attack, and what does the manufacturer retain? {Example}
> A manufacturer's cyber policy has a $\$5{,}000{,}000$ aggregate limit and a $\$100{,}000$ retention per event, absorbed first by breach response. A ransomware attack shuts the plant's systems for 96 hours:
>
> | Insuring agreement | Sublimit ($) | Loss ($) |
> | :--- | ---: | ---: |
> | Breach response | full limit | 460,000 |
> | Cyber extortion (ransom) | 1,000,000 | 1,400,000 |
> | Business interruption, 12-hour waiting period | 2,000,000 | 25,000 an hour, plus 150,000 extra expense |
> | Data restoration | 500,000 | 380,000 |
>
> > [!answer]-
> > - The retention comes off breach response, which pays $460{,}000 - 100{,}000 = \$360{,}000$.
> > - Cyber extortion pays $\min(1{,}400{,}000,\ 1{,}000{,}000) = \$1{,}000{,}000$.
> > - The business interruption loss counts only the hours after the waiting period, $25{,}000 \times (96 - 12) + 150{,}000 = \$2{,}250{,}000$, and its sublimit cuts the payment to $\$2{,}000{,}000$.
> > - Data restoration is within its sublimit and pays $\$380{,}000$.
> > - The policy pays $360{,}000 + 1{,}000{,}000 + 2{,}000{,}000 + 380{,}000 = \$3{,}740{,}000$, within the aggregate limit.
> > - The full loss is $\$4{,}790{,}000$, counting the 12 hours of the waiting period at $\$300{,}000$.
> > - The manufacturer retains $\$1{,}050{,}000$: the $\$100{,}000$ retention, $\$400{,}000$ of ransom above the sublimit, and $\$550{,}000$ of business interruption from the waiting period and the sublimit.

## Exclusions and silent cyber

Policies exclude war, and many now exclude cyber attacks by or for a state that seriously impair a country's essential functions. They also exclude failure of power, telecommunications or internet infrastructure the insured does not control, because those losses would hit every policyholder at once.

Traditional policies may cover a cyber loss without being priced for it, such as property damage from a hacked control system under a property policy. This is silent cyber. New York's DFS expects insurers to say clearly in every policy that could face a cyber claim whether it covers or excludes cyber loss, and to reduce the silent risk that remains, for example by buying [[Reinsurance|reinsurance]]. The standard CGL form excludes damages from the loss of, or inability to access, electronic data.

## Pricing and accumulation

Insurers are not yet able to measure cyber risk accurately, and much of an insured's risk depends on the caliber of its cybersecurity program, so pricing should rest on an assessment of each insured. A single event, such as self-propagating malware or an attack on a widely used cloud or managed service provider, can damage many insureds at once, which makes cyber a source of [[Concentration Risk|accumulation risk]]. A cyber portfolio is not diversified simply because its insureds are many and unrelated. New York's DFS expects insurers to model such catastrophic events and run stress tests on them.

> [!trap] Comparing a part's loss with the aggregate limit
> A ransom or a business interruption loss can be cut by its sublimit while most of the aggregate limit is unused. Comparing a part's loss with the aggregate limit overstates the payment.
