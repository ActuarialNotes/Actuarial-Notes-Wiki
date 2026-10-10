---
aliases:
  - Cyber Risk
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8f383f0827fd9e4f4682b164039e4bfe0323ab4d85d50d8f0f3f2bbfdc4c5fe9
  sources: []
  open_findings: 0
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
