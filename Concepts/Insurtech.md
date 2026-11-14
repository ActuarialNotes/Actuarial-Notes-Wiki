---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-11
  last_checked_by: agent:validate-v1
  content_hash: sha256:49aad5d5c789cb5116f5a8c2bb0fee033f582a1dba58ac22c053d432bd74512e
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

**Insurtech** is the insurance branch of FinTech: the emerging technologies and new business models that could transform the insurance business, in the International Association of Insurance Supervisors' definition (IAIS, 2017). The NAIC describes it as technology that makes insurance easier, faster and more personal to buy, use and understand, and that helps insurers automate their own work, so it reaches nearly every [[Insurance Operations|insurance function]].

The technologies and their main insurance uses are:

1. **Connected devices and telematics.** Usage-based auto insurance uses telematics to track driving habits and ties the premium more closely to driving behaviour. Smart-home sensors detect leaks, smoke or unusual activity so that losses are reduced, which is a form of [[Risk Control|risk control]].
2. **Big data, AI and machine learning.** The IAIS lists product offerings, risk selection, pricing, cross-selling, claims prediction and fraud detection, including customised products and automated underwriting. AI can process satellite images to underwrite natural catastrophe risk, and it can automate claims tasks such as checking invoices and analysing images. See [[Predictive Analytics|predictive analytics]].
3. **Digital distribution.** Digital platforms, online comparison services, robo-advisers, and chatbots and mobile apps that answer policy questions and take a first notice of loss. See [[Insurance Distribution Systems|distribution systems]] and [[Insurance Producer|producers]].
4. **Distributed ledgers and smart contracts.** A distributed ledger is a database shared across many sites and secured by cryptography, and a smart contract is program code on the ledger that carries out an agreement. In claims, the IAIS expected them to cut administrative costs, reduce the need for adjusters and speed up payments.

## The competitive effect of better data

In Werner and Modlin's *Basic Ratemaking* (CAS, 2016), a company that does not charge each risk the right rate, when competitors do, faces [[Adverse Selection|adverse selection]]. A company that uses a valid risk characteristic its competitors ignore can gain favourable selection.

> [!example]- What happens to this insurer's flat rate when a competitor starts pricing with telematics? {Example}
> An auto insurer has 5,000 low-risk drivers with an expected cost of \$600 each and 5,000 high-risk drivers with an expected cost of \$1,000 each. It charges every driver the same rate. A competitor uses telematics to tell the two groups apart and charges each driver its expected cost. At each renewal, one driver in five in each group shops on price and moves to whichever insurer is cheaper.
>
> > [!answer]-
> > - The flat rate that covers the original book is the average cost, $(5{,}000 \times 600 + 5{,}000 \times 1{,}000)/10{,}000 = 800$.
> > - Low-risk shoppers find \$600 at the competitor and leave, which is 1,000 drivers. High-risk shoppers would pay \$1,000 there and stay. After renewal the book has 4,000 low-risk and 5,000 high-risk drivers.
> > - The premium is $9{,}000 \times 800 = 7{,}200{,}000$.
> > - The expected cost is $4{,}000 \times 600 + 5{,}000 \times 1{,}000 = 7{,}400{,}000$, a shortfall of \$200,000.
> > - The rate now needed is $7{,}400{,}000 / 9{,}000 = 822.22$.
> > - At \$822.22, 800 of the remaining 4,000 low-risk drivers leave at the next renewal, and the needed rate rises again to $6{,}920{,}000 / 8{,}200 = 843.90$.
> > - The spiral continues until the insurer refines its own rating or narrows its target market.

## Parametric insurance

Parametric insurance pays a set amount based on the qualities of the event itself, not on the losses the event causes. Ignoring deductibles, a traditional indemnity payment is

> $$\text{Indemnity payment} = \min(L,\ \text{limit})$$

- $L$ is the insured's loss.

A parametric payment is

> $$\text{Parametric payment} = \begin{cases} A & \text{if the index reaches } T \\ 0 & \text{otherwise} \end{cases}$$

- $A$ is the fixed amount the policy pays.
- $T$ is the trigger set on a measured index of the event, such as wind speed or water level.

The U.S. Federal Insurance Office (2025) calls it a smaller but growing way to transfer risk, and credits the growth partly to technologies that make parametric products more precise and efficient.

> [!example]- How do a parametric policy and an indemnity policy pay on these three homes? {Example}
> A parametric windstorm policy pays \$25,000 if the wind speed at a named weather station reaches the trigger. An indemnity policy with a \$50,000 limit pays the insured's loss. Home 1 loses \$40,000 and the trigger is reached. Home 2 loses nothing and the trigger is reached. Home 3 loses \$15,000 from a storm that stays below the trigger.
>
> > [!answer]-
> > - Home 1: the indemnity policy pays \$40,000 and the parametric policy \$25,000, less than the loss.
> > - Home 2: the indemnity policy pays nothing and the parametric policy \$25,000, more than the loss.
> > - Home 3: the indemnity policy pays \$15,000 and the parametric policy nothing, although there was a loss.
> > - The parametric payment can be settled from the index reading alone, without assessing any loss, so it matters what the insured is told the policy does and does not cover.

## Business models

The IAIS (2017) found start-ups targeting every part of the value chain: marketing and distribution, underwriting and pricing, and claims settlement. Most improved one part of the chain and collaborated with incumbents. Only a few, using peer-to-peer models, tried to remove the insurer. It describes three strategies for reaching customers:

- An **aggregator** sits at the front end and offers several insurers' products.
- An **integrator** embeds the insurance in another service the customer buys.
- A **game changer** is a fully digital insurer aimed at a niche, or a peer-to-peer platform.

Customer-facing distributors may rely on insurers' licences to issue policies, and where the value chain fragments, the insurer may remain the ultimate risk carrier while technology firms own the customer relationship. Incumbents take part by watching new trends, partnering with start-ups on pilots, funding or acquiring start-ups, and using the contact to find new coverage needs.

## Risks

The NAIC lists the collection of sensitive personal data, cybersecurity, possible bias in AI decisions and limited transparency about how consumer data are used. The IAIS (2025) adds model risk, where a pricing model that fails to adapt to a changing market can undercharge or overcharge. Very granular pricing reduces risk pooling and can price riskier groups out of affordable cover. Insurers can use AI to set profit margins that exploit consumers' biases, and with an opaque model a decision can be hard to trace back to a person. See [[Data Ethics|data ethics]].

## The regulatory response

The NAIC's AI model bulletin (December 2023) reminds insurers that decisions made or supported by AI must comply with existing law, including the laws on unfair trade practices and unfair discrimination, and that rates built with AI must not be excessive, inadequate or unfairly discriminatory. It creates no new standards. Each insurer is expected to keep a written AIS Program, governed by senior management accountable to the board, proportionate to its use of AI, and reaching AI and data obtained from third parties. A regulator may ask for the program in an investigation or market conduct exam. See [[Insurance Data Regulation|insurance data regulation]] and [[Emerging Regulatory Issues|emerging regulatory issues]].

Supervisors can also encourage innovation through regulatory sandboxes. Under the NCOIL Insurance Regulatory Sandbox Model Act (2022), the commissioner may waive a specific insurance law, regulation or bulletin if:

1. The rule would block an innovative or more efficient product.
2. The rule's purpose is met by other means.
3. The waiver does not substantially or unreasonably raise risk to consumers.
4. The waiver is in the public interest.

A waiver lasts up to 12 months, with one extension of up to 12 more. No more than 10,000 consumers may use the product, and they must be told that it rests on a temporary waiver. A waiver never covers solvency requirements, participation in residual markets or guaranty funds, taxes and fees, or the laws needed for NAIC accreditation, and it cannot reduce consumers' rights to recover.

> [!trap] Treating insurtech as start-ups replacing insurers
> Most start-ups improve one part of the value chain in collaboration with incumbents, and incumbents take part by partnering with, funding and buying them. Even where a technology firm owns the customer, the insurer may remain the ultimate risk carrier.
