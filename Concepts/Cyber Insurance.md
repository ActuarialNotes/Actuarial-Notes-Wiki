---
aliases:
  - Cyber Risk
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:8f383f0827fd9e4f4682b164039e4bfe0323ab4d85d50d8f0f3f2bbfdc4c5fe9
  sources:
    - "Beazley Breach Response policy (Certain Underwriters at Lloyd's, US, NAPA program copy), Declarations pp.1-2 (aggregate limit with regulatory sublimit; breach response services limits; retentions), Insuring Agreements A-E pp.5-7 (privacy & security liability claims-made, breach response services, regulatory, website media, PCI), Exclusion T war p.14, First Party Computer Security endorsement p.37 (cyber extortion, data protection, business interruption; 12-hour waiting period; electrical/telecom infrastructure exclusion), sha256:f37a11b2fd6e195a777b8487c8d2bdc7c044b8c33e50092b9c71d6bf88598acb — https://www.napa-benefits.org/assets/pdf/policy/cyber/cyber-1m.pdf"
    - "Lloyd's Market Bulletin Y5381, State backed cyber-attack exclusions (2022), pp.2-3, sha256:12ec2f94bc3d114ca1c1d778e9e758010e2135b153d59266260fd942ecc4102e — https://assets.lloyds.com/media/35926dc8-c885-497b-aed8-6d2f87c1415d/Y5381%20Market%20Bulletin%20-%20Cyber-attack%20exclusions.pdf"
    - "N.Y. DFS Insurance Circular Letter No. 2 (2021), Cyber Insurance Risk Framework (systemic risk, silent/non-affirmative risk in GL and other policies, ransomware), sha256:9a44513116d576f27193a32cf208509255809ec5089f522f81745dbefb84ca86 — https://www.dfs.ny.gov/industry_guidance/circular_letters/cl2021_02"
    - "ISO CG 00 01 04 13 Commercial General Liability Coverage Form, exclusion f. Pollution (pp.3-4: heating-equipment and hostile-fire exceptions; clean-up costs), g. Aircraft, p. Electronic Data (p.5); no employment-related practices, professional services or data-disclosure exclusion in the base form, sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf"
    - "SOA GI-302 Syllabus (2027-07), learning outcome k (specialty coverages incl. excess, umbrella, professional liability, cyber risk, surety, terrorism), p.2, sha256:4b007f27cdfa4e554dca8638841ef73fddfcf1d0d1e3a954be6244f334c3a284 — https://www.soa.org/globalassets/assets/files/edu/2026/gi-302/2027-07-gi-302-syllabus.pdf"
    - "The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Cyber Insurance.md
---
**Cyber Insurance** covers an organization's own losses from a cyber event, such as a data breach, a ransomware attack or a network outage, and its [[Liability Insurance|liability]] to others for failing to protect data or systems. It is sold mainly as a standalone policy combining first-party and third-party insuring agreements, each with its own sublimit, because traditional property and liability forms either exclude cyber losses or respond to them unpredictably. Cyber risk is the risk itself: loss from the failure, misuse or compromise of information technology and data.

> $$\text{BI} = b\,(T - w)^+ + EE$$

> $$P_k = \min\left((X_k - R_k)^+,\ s_k\right)$$

> $$\text{Paid} = \min\left(\sum_k P_k,\ L\right)$$

- **Symbols:** In the business interruption loss, $b$ is the lost net income plus continuing expenses per hour, $T$ is the length of the outage in hours, $w$ is the waiting period and $EE$ is extra expense. $X_k$ is the loss under insuring agreement $k$, $R_k$ is the part of the event's retention it absorbs, $s_k$ is its sublimit and $L$ is the policy aggregate limit.
- **First-party coverages:** Breach response pays forensic investigators, legal advice, notifying affected people, credit monitoring, a call centre and public relations. Data restoration pays to restore or recreate damaged data and software. Network business interruption pays lost income and extra expense while systems are down, after a waiting period measured in hours, and dependent business interruption extends this to outages at a cloud or other service provider. Cyber extortion pays ransom and the cost of negotiating it.
- **Third-party coverages:** Privacy and network security liability covers claims that the insured failed to protect personal data or let malware spread to others. Regulatory coverage pays the defense of privacy regulators' proceedings and fines where the law allows them to be insured, and payment card industry coverage pays assessments under card network contracts. Media liability covers defamation and infringement in the insured's digital content. Third-party coverages are usually claims-made.
- **Sublimits and retentions:** Ransomware, social engineering fraud and dependent business interruption are commonly sublimited well below the aggregate limit. A single retention usually applies to all loss from one event, and business interruption has a waiting period in hours in place of, or in addition to, a dollar retention.
- **War and infrastructure exclusions:** Policies exclude war, and many now exclude cyber attacks by or for a state that seriously impair a country's essential functions. They also exclude failure of power, telecommunications or internet infrastructure the insured does not control, because those losses would hit every policyholder at once.
- **Silent cyber:** Traditional policies may cover a cyber loss without being priced for it, such as property damage from a hacked control system under a property policy. Insurers now either exclude cyber explicitly or affirm and price it, and the standard CGL has been amended to exclude claims from disclosure of confidential data.
- **Cyber risk as a U.S. line:** The market is young, so loss data are short, and the threat changes faster than experience accumulates. A single vulnerability or a widely used cloud service can produce correlated losses across many insureds, which makes cyber a source of [[Concentration Risk|accumulation risk]] that insurers manage with scenarios, exposure limits and [[Reinsurance|reinsurance]]. Pricing relies on revenue, industry and the insured's security controls, such as multi-factor authentication and offline backups, which underwriters now require.

> [!example]- A Ransomware Loss Through the Sublimits {Example}
> A manufacturer's cyber policy has a \$5,000,000 aggregate limit and a \$100,000 retention per event, absorbed first by breach response. It has sublimits of \$1,000,000 for cyber extortion, \$2,000,000 for business interruption with a 12-hour waiting period, and \$500,000 for data restoration, while breach response has the full limit. A ransomware attack shuts the plant's systems for 96 hours. The losses are:
>
> - Breach response costs of \$460,000 for forensics, legal advice and notifying 40,000 people.
> - A negotiated ransom of \$1,400,000.
> - Lost income and continuing expenses of \$25,000 an hour while down, and \$150,000 of extra expense.
> - Data restoration costs of \$380,000.
>
> Find the insurer's payment and the manufacturer's retained loss.
>
> > [!answer]-
> > The retention comes off breach response, and each other part is capped by its sublimit. Business interruption counts only the hours after the waiting period.
> > $$
> > \begin{align*}
> > P_{\text{breach}} &= 460{,}000 - 100{,}000 \\
> > &= 360{,}000 \\
> > P_{\text{extortion}} &= \min(1{,}400{,}000,\ 1{,}000{,}000) \\
> > &= 1{,}000{,}000 \\
> > \text{BI} &= 25{,}000\,(96 - 12) + 150{,}000 \\
> > &= 2{,}250{,}000 \\
> > P_{\text{BI}} &= \min(2{,}250{,}000,\ 2{,}000{,}000) \\
> > &= 2{,}000{,}000 \\
> > P_{\text{data}} &= 380{,}000 \\
> > \text{Paid} &= 360{,}000 + 1{,}000{,}000 + 2{,}000{,}000 + 380{,}000 \\
> > &= 3{,}740{,}000
> > \end{align*}
> > $$
> > The total is within the \$5,000,000 aggregate. The full loss is \$4,790,000, counting the 12 hours of the waiting period at \$300,000, so the manufacturer retains \$1,050,000: the \$100,000 retention, \$400,000 of ransom above the sublimit, and \$550,000 of business interruption from the waiting period and the sublimit. The sublimits, not the aggregate limit, decided the outcome, which is why buyers and underwriters negotiate them as carefully as the limit itself.

> [!tip]- How it appears on the exam
> - **DISC-IA:** Questions ask what each first-party and third-party insuring agreement covers, how sublimits, retentions and waiting periods apply, and what the war and infrastructure exclusions remove. The applied version takes one event through the policy part by part, as in the example.
> - **GI-302:** Cyber risk is one of the specialty coverages candidates describe, alongside [[Umbrella Liability Insurance|umbrella]], [[Professional Liability Insurance|professional liability]] and [[Terrorism Insurance|terrorism]]. Expect to explain the coverages, why traditional policies handle cyber poorly, and why scarce data and correlated losses make the line hard to price and reserve.

> [!warning]- Exam traps
> - **Sublimits cap below the limit:** A ransom or a business interruption loss can be cut by its sublimit while most of the aggregate limit is unused. Comparing a part's loss with the aggregate limit overstates the payment.
> - **The waiting period is a time deductible:** Business interruption is paid only for the hours after the waiting period ends. Paying for the full outage overstates the loss, and in many policies the waiting period applies in addition to the dollar retention.
> - **One retention per event:** A single event usually bears one retention across all its coverages, not a retention for each part. Taking it off every part understates the payment.
> - **First-party versus third-party:** Notification costs and a ransom are the insured's own losses, while a customer's suit over stolen data is liability. They sit under different insuring agreements with different triggers.
> - **Accumulation:** Unlike most commercial lines, one cyber event can cause losses across thousands of policies, so a cyber portfolio is not diversified simply because its insureds are many and unrelated.
