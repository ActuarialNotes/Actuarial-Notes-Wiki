---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-11
  last_checked_by: agent:validate-v1
  content_hash: sha256:ec597a86cc7ee1b91d6e7c5cbac242e9038b1c5bd4deb785e33522a5d6a74d60
  sources:
    - "NAIC, Insurance Topics: Insurtech (Last Updated 2/18/2026), Background and Actions, read via WebFetch 2026-10-11 (curl refused; no hash) — https://content.naic.org/insurance-topics/insurtech"
    - "NAIC Model Bulletin: Use of Artificial Intelligence Systems by Insurers (adopted Dec 4, 2023), pp.1-2 (Background, Legislative Authority #1780), §3 and Guidelines 1.1-1.4, 4.0-4.2, §4, sha256:d260c950d67fa0cc60cfcabf7df9f8de1dcff0ba84b32b6a711bd5c0b76d28f8 — https://content.naic.org/sites/default/files/cmte-h-big-data-artificial-intelligence-wg-ai-model-bulletin.pdf.pdf"
    - "NAIC, Implementation of NAIC Model Bulletin: Use of AI Systems by Insurers (status as of April 1, 2026), p.2 reference list, sha256:19b539af567047d5b7d1500ce98032606b90b6344d6fac1029fc79270e73b07d — https://content.naic.org/sites/default/files/cmte-h-big-data-artificial-intelligence-wg-map-ai-model-bulletin.pdf"
    - "IAIS, FinTech Developments in the Insurance Industry (21 Feb 2017), pp.4, 7-9, 11-12, 15-17, 23-24, 31 of 45 (¶¶2, 6, 14, 17(b), 21, 29-30, 37, 40-41, 5.3(d), 66, 112-113, 115(e)), sha256:77093852bc029745a2482c969ecf7f18c2b563e40f3a70fcfa88d75daa44f72c — https://iaisweb.org/file/65625/report-on-fintech-developments-in-the-insurance-industry"
    - "IAIS, Application Paper on the supervision of artificial intelligence (July 2025), Executive Summary ¶¶2-4, Box 1 pp.8-9, Table 1 p.11, sha256:db32138a559492d4a9f6e41587876fd1e87e6e315cc2d2c2dec8f1396b7bd9f0 — https://www.iais.org/uploads/2025/07/Application-Paper-on-the-supervision-of-artificial-intelligence.pdf"
    - "U.S. Treasury, Federal Insurance Office, Annual Report on the Insurance Industry (September 2025), p.6 (AI surveys, model bulletin) and p.72 (Parametric Insurance), sha256:a1ba63f18d5a6c3f0bf499d5f055b3d76ed54ee5d608e5480222569e1b248e47 — https://home.treasury.gov/system/files/311/Final%20FIO%202025%20Annual%20Report.pdf"
    - "NCOIL, Insurance Regulatory Sandbox Model Act (adopted Nov 19, 2022), §2(a), (c), (d), (e), (g), sha256:230115f18554e7ac1552a7edc895c8a9619f86bfbaa96983ec0d4634f228a5b8 — https://ncoil.org/wp-content/uploads/2025/12/NCOIL-Sandbox-Model-Adopted-Nov.-2022.pdf"
    - "Werner & Modlin, Basic Ratemaking, 5th ed. (CAS 2016), Ch.9 'Importance of Equitable Rates' and 'Adverse Selection', p.151 (PDF p.163), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurtech.md
---

**Insurtech** is, in the International Association of Insurance Supervisors' definition (IAIS, *FinTech Developments in the Insurance Industry*, February 2017), the insurance branch of FinTech: the emerging technologies and new business models that could transform the insurance business. The NAIC's insurtech topic page (last updated February 2026) describes it as technology that makes insurance easier, faster and more personal to buy, use and understand, and that helps insurers automate and streamline their own work. It says insurtech now affects nearly every part of the insurance process, from how policies are sold to how claims are handled, and so it reaches nearly every [[Insurance Operations|insurance function]].

> $$\text{Indemnity payment} = \min(L,\ \text{limit}) \qquad \text{Parametric payment} = \begin{cases} A & \text{if the index reaches } T \\ 0 & \text{otherwise} \end{cases}$$

- **Symbols:** The formula contrasts a traditional claim with a parametric one, ignoring deductibles. $L$ is the insured's loss. $A$ is the fixed amount the parametric policy pays, and $T$ is the trigger set on a measured index of the event, such as wind speed or water level. In the U.S. Federal Insurance Office's 2025 annual report, parametric insurance pays a set amount based on the qualities of the event itself, not on the losses the event causes.
- **Connected devices and telematics:** The NAIC page gives usage-based auto insurance, which uses telematics to track driving habits and tailor the price, as an example. Its other examples are smart-home sensors that detect leaks, smoke or unusual activity so that losses are reduced, and wearables. The IAIS (2017) lists the main insurance uses of telematics as connected cars, advanced driver-assistance systems, health monitoring and home monitoring. It describes usage-based insurance as a model that ties premium rates more closely to driving behaviour. Using sensors to reduce losses is a form of [[Risk Control|risk control]].
- **Big data, AI and machine learning:** The IAIS (2017) lists these uses of big data and analytics: product offerings, risk selection, pricing, cross-selling, claims prediction and fraud detection, including customised products and automated underwriting. The NAIC's AI model bulletin (December 2023) says AI is used at every stage of the insurance life cycle: product development, marketing, sales and distribution, underwriting and pricing, policy servicing, claim management and fraud detection. Surveys in 2022 and 2023, cited by the Federal Insurance Office (2025), found that 88% of private passenger auto insurers, 70% of homeowners insurers and 58% of life insurers used AI and machine learning or planned to use or explore them. The IAIS's 2025 application paper gives an example: AI can process satellite images to underwrite natural catastrophe risk more accurately. See [[Predictive Analytics|predictive analytics]].
- **Distribution:** The IAIS (2017) names digital platforms, online comparison services and robo-advisers among the innovations. It describes three strategies for reaching customers. An **aggregator** sits at the front end and offers several insurers' products. An **integrator** embeds the insurance in another service the customer buys. A **game changer** is a fully digital insurer aimed at a niche, or a peer-to-peer platform. It also expected that distributed ledgers could reduce the reliance on agents and brokers for gathering information. See [[Insurance Producer|producers]] and [[Insurance Distribution Systems|distribution systems]].
- **Claims:** The IAIS's 2025 application paper says AI can automate administrative claims tasks such as checking invoices. It can also speed up claims by analysing invoices and images, and a chatbot available 24 hours a day can take a first notice of loss. The NAIC page also names chatbots that answer billing, policy and claims questions, and mobile apps with photo-based claims tools.
- **Distributed ledgers and smart contracts:** A distributed ledger is a database shared across many sites or institutions and secured by cryptography. A blockchain is a decentralised ledger of unchangeable records kept in a chain of "blocks". A smart contract is program code on the ledger that carries out an agreement. In 2017 the IAIS said this technology was still in its infancy in insurance. It added that in claims it could cut administrative costs, reduce the need for adjusters and speed up payments, and that connected devices could help verify that a covered event occurred. It also warned of disputes over whether a smart contract matches what was sold to the client.
- **Parametric products:** The Federal Insurance Office (2025) calls parametric insurance a smaller but growing way to transfer risk. It credits the growth partly to new technologies that make parametric products more precise and efficient. It also reports that in December 2024 New York passed a law defining parametric insurance and setting its disclosure and licensing requirements, and that in 2024 Vermont let its captives write parametric policies.
- **Business models:** The IAIS (2017) found start-ups targeting every part of the value chain: marketing and distribution, underwriting and pricing, and claims settlement. Most improved one part of the chain and collaborated with incumbents, and only a few, using peer-to-peer models, tried to remove the insurer. Its examples include aggregators, claims software, per-mile auto **managing general agents**, digital brokers and managing general agents for small businesses, analytics vendors and new carriers. In one of the IAIS's scenarios, customer-facing distributors rely on insurers' licences to issue policies. In another, where the value chain fragments, the insurer may remain the ultimate risk carrier while technology firms own the customer relationship.
- **How incumbents take part:** The IAIS (2017), citing PwC, lists four approaches: watching new trends, partnering with start-ups on pilots, funding or acquiring start-ups, and using the contact to find new coverage needs. It names several large insurers with venture funds that invest in insurtech start-ups.
- **Risks:** The NAIC page lists the collection of sensitive personal data, cybersecurity, possible bias in AI decisions and limited transparency about how consumer data are used. The IAIS's 2025 application paper adds four more:
    - **Model risk:** A pricing model that fails to adapt to a changing market can undercharge or overcharge.
    - **Uninsurability:** Very granular pricing reduces risk pooling and can price riskier groups out of affordable cover.
    - **Margin setting:** Insurers can use AI to set profit margins that exploit consumers' biases.
    - **Unclear accountability:** With an opaque model, a decision can be hard to trace back to a person.

  See [[Data Ethics|data ethics]].
- **The competitive effect of better data:** In Werner and Modlin's *Basic Ratemaking* (CAS, 2016), a company that does not charge each risk the right rate, when competitors do, faces [[Adverse Selection|adverse selection]]. A company that uses a valid risk characteristic its competitors ignore can gain favourable selection.
- **Regulatory sandboxes:** The IAIS (2017) suggested supervisors could encourage innovation through regulatory sandboxes or innovation hubs. Under the NCOIL Insurance Regulatory Sandbox Model Act (November 2022), the commissioner may waive a specific insurance law, regulation or bulletin if four conditions are met:
    - The rule would block an innovative or more efficient product.
    - The rule's purpose is met by other means.
    - The waiver does not substantially or unreasonably raise risk to consumers.
    - The waiver is in the public interest.

  The model act also sets limits. A waiver lasts up to 12 months, with one extension of up to 12 more. No more than 10,000 consumers may use the product, and they must be told that it rests on a temporary waiver. A waiver can never cover solvency requirements, participation in residual markets or guaranty funds, taxes and fees, or the laws needed for NAIC accreditation, unless such a law itself permits a waiver. It also cannot reduce consumers' rights to recover.
- **The NAIC AI model bulletin:** Adopted on December 4, 2023, the bulletin reminds insurers that decisions made or supported by AI must comply with existing law, including the laws on unfair trade practices and unfair discrimination. Under the rating law, rates built with AI and predictive models must not be excessive, inadequate or unfairly discriminatory. Each insurer is expected to keep a written **AIS Program** to reduce the risk of adverse consumer outcomes. The program should:
    - cover governance, risk management controls and internal audit;
    - make senior management, accountable to the board, responsible for it;
    - be proportionate to the insurer's use of AI;
    - reach AI and data obtained from third parties, through due diligence and audit rights.

  In an investigation or market conduct exam, a regulator may ask for the program and the documents behind it. The NAIC's map of where the bulletin is in force (status as of April 1, 2026) lists 24 states and the District of Columbia as having adopted it. California, Colorado, New York and Texas have their own insurance-specific rules or guidance. The Federal Insurance Office (2025) describes the bulletin as principles-based, non-binding guidance that applies existing law and creates no new standards. See [[Insurance Data Regulation|insurance data regulation]] and [[Emerging Regulatory Issues|emerging regulatory issues]].
- **Supervision beyond the bulletin:** The NAIC page says its Big Data and Artificial Intelligence (H) Working Group is putting the bulletin into practice and exploring ways to test models for accuracy, fairness and bias. Its Third-Party Data and Models (H) Working Group studies insurers' use of outside data and models. Internationally, the IAIS's *Application Paper on the supervision of artificial intelligence* (July 2025) holds that the existing Insurance Core Principles apply to insurers' and intermediaries' use of AI. It covers five topics:
    - risk-based supervision and proportionality;
    - governance and accountability;
    - robustness, safety and security;
    - transparency and explainability;
    - fairness, ethics and redress.

> [!example]- A Competitor Starts Pricing With Telematics {Example}
> An auto insurer has 5,000 low-risk drivers with an expected cost of \$600 each and 5,000 high-risk drivers with an expected cost of \$1,000 each. It charges every driver the same rate. A competitor uses telematics to tell the two groups apart and charges each driver its expected cost. At each renewal, one driver in five in each group shops on price and moves to whichever insurer is cheaper. Find the insurer's result after one renewal, and the rate it would then need.
>
> > [!answer]-
> > The flat rate that covers the original book is the average cost.
> > $$
> > \begin{align*}
> > \text{Rate} &= \frac{5{,}000(600) + 5{,}000(1{,}000)}{10{,}000} \\
> > &= 800
> > \end{align*}
> > $$
> > Low-risk shoppers find \$600 at the competitor and leave, which is 1,000 drivers. High-risk shoppers would pay \$1,000 there and stay. After renewal the book has 4,000 low-risk and 5,000 high-risk drivers.
> > $$
> > \begin{align*}
> > \text{Premium} &= 9{,}000 \times 800 = 7{,}200{,}000 \\
> > \text{Expected cost} &= 4{,}000(600) + 5{,}000(1{,}000) = 7{,}400{,}000 \\
> > \text{Shortfall} &= 7{,}400{,}000 - 7{,}200{,}000 = 200{,}000 \\
> > \text{Needed rate} &= \frac{7{,}400{,}000}{9{,}000} = 822.22
> > \end{align*}
> > $$
> > The rate was adequate for the old mix but loses \$200,000 on the new one. If the insurer raises its rate to \$822.22, 800 of the remaining 4,000 low-risk drivers leave at the next renewal. The needed rate then rises again, to $6{,}920{,}000 / 8{,}200 = 843.90$. This is the [[Adverse Selection|adverse selection]] spiral Werner and Modlin describe. It continues until the insurer refines its own rating or narrows its target market.

> [!example]- Parametric Versus Indemnity Cover {Example}
> A parametric windstorm policy pays \$25,000 if the wind speed recorded at a named weather station reaches the trigger. An indemnity policy with a \$50,000 limit pays the insured's loss. In one storm, three insured homes have these outcomes. Home 1 loses \$40,000 and the trigger is reached. Home 2 loses nothing and the trigger is reached. Home 3 loses \$15,000 from a storm that stays below the trigger. Compare what each policy pays.
>
> > [!answer]-
> > The indemnity policy pays $\min(L, 50{,}000)$. The parametric policy pays \$25,000 whenever the trigger is reached, and nothing otherwise.
> > $$
> > \begin{align*}
> > \text{Home 1:}\quad &\text{indemnity } 40{,}000, \quad \text{parametric } 25{,}000 \\
> > \text{Home 2:}\quad &\text{indemnity } 0, \quad \text{parametric } 25{,}000 \\
> > \text{Home 3:}\quad &\text{indemnity } 15{,}000, \quad \text{parametric } 0
> > \end{align*}
> > $$
> > The parametric payment depends only on the event, so the insurer can settle it from the index reading alone, without assessing any loss. But the payment can be less than the loss (Home 1), more than the loss (Home 2) or nothing even though there was a loss (Home 3). That gap is why it matters what the insured is told the policy does and does not cover.

> [!tip]- How it appears on the exam
> - **DISC-RM:** The page is the reading for "The Digitization of Insurance" in the Overview of Insurance Operations topic. Expect questions on how one technology changes one insurance function, on the business models new entrants use, and on the regulatory response, such as what the AI model bulletin expects or what a sandbox waiver can and cannot cover.
> - **Linked topics:** Questions about distribution change can come up alongside the functional view of insurance and [[Insurance Distribution Systems|distribution systems]]. Questions about data and AI risk can come up alongside [[Insurance Data Regulation|data regulation]].

> [!warning]- Exam traps
> - **Insurtech isn't only start-ups:** The IAIS (2017) found that most start-ups improve one part of the value chain in collaboration with incumbents. Incumbents also take part by partnering with, funding and buying start-ups.
> - **The customer-facing firm isn't always the insurer:** In the IAIS's scenarios, a customer-facing distributor relies on an insurer's licence to issue the policy, and the insurer remains the ultimate risk carrier.
> - **The AI bulletin applies existing law:** It creates no new standards. Unfair trade practice, unfair discrimination and rating laws apply whatever method produced the decision. The insurer stays responsible for AI systems and data it buys from third parties.
> - **A sandbox waiver has firm limits:** In the NCOIL model it is temporary (up to 12 months plus one 12-month extension), capped at 10,000 consumers and disclosed to them. It never covers solvency, guaranty fund or residual market participation, or taxes.
> - **A parametric policy pays on the event, not the loss:** Its payment can be more or less than the actual loss, or nothing at all.
> - **Technology brings risks too:** These include privacy, cybersecurity, bias, model risk and reduced risk pooling. An answer that lists only benefits is incomplete.
