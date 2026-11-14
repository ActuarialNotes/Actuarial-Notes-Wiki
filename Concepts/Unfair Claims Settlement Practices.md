---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:2912bbc6897ed8f52576b6da69bc7859ed29823e78f5fe8d73c1ca6c1e67f4f5
  sources:
    - "NAIC Unfair Claims Settlement Practices Act, Model #900 (Jan 1997 printing), §§1, 3, 4A–N, 5, 6A–B, 7, prefatory note, pp.1–4, sha256:ba1d03c3819ae83500abaa0d6f50bba07a896d4be0ba26b84405095c131f6ba2 — https://content.naic.org/sites/default/files/model-law-900.pdf"
    - "NAIC Unfair Property/Casualty Claims Settlement Practices Model Regulation, Model #902 (Jul 1997 printing), §§2–9, pp.1–9, sha256:f33578860a5603a165819316747c996514340f371ca42f77f00621e3b3d41f55 — https://content.naic.org/sites/default/files/model-law-902.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Unfair Claims Settlement Practices.md
---

An **Unfair Claims Settlement Practice** is a claim-handling act that state law prohibits, such as misrepresenting policy provisions, refusing to pay without a reasonable investigation, or failing to settle in good faith once liability is reasonably clear. Most states base their rules on the NAIC's Unfair Claims Settlement Practices Act (model #900) and its Unfair Property/Casualty Claims Settlement Practices Model Regulation (model #902). Together they set minimum standards for investigating and disposing of claims and give the insurance commissioner the power to examine claim files and penalize violations.

Under the model act, a listed act is an improper claims practice if it is committed flagrantly and in conscious disregard of the act, or so often that it indicates a general business practice. A single mistake on one claim is not, by itself, a violation of the act.

The act covers claims under policies issued to the state's residents, but not workers compensation, fidelity, suretyship or boiler and machinery claims. It creates no private cause of action: it is enforced by the commissioner. A claimant who sues an insurer for bad faith does so under other law.

## The prohibited acts

The act lists fourteen. In summary, an insurer may not:

1. knowingly misrepresent relevant facts or policy provisions to claimants;
2. fail to acknowledge claim communications with reasonable promptness;
3. fail to adopt reasonable standards for prompt investigation and settlement;
4. fail to attempt in good faith a prompt, fair and equitable settlement once liability is reasonably clear;
5. force insureds to sue by offering substantially less than they later recover in suits;
6. refuse to pay without a reasonable investigation;
7. fail to affirm or deny coverage within a reasonable time after investigating;
8. settle for less than a reasonable person would expect from the insurer's advertising, or on the basis of an application altered without the insured's knowledge;
9. make payments without saying which coverage each is under;
10. delay by requiring a formal proof of loss and then duplicate verification of the same information;
11. fail to promptly explain the basis for a denial or a compromise offer;
12. fail to provide claim forms within 15 calendar days of a request;
13. fail to ensure that repairs by a repairer it owns or requires are done in a workmanlike manner.

Denying a claim after a reasonable investigation is not on the list.

## Standards of the model regulation

The regulation sets these periods, in calendar days. States that adopt the model often change them, so the state's own rule governs.

| Step | Deadline | Clock starts when |
| :--- | :--- | :--- |
| Acknowledge the claim | 15 days, unless it is paid within that time | The insurer or its agent receives notification of the claim |
| Accept or deny a first-party claim | 21 days | The insurer receives a properly executed proof of loss |
| Pay the claim | 30 days | The insurer affirms liability on an amount determined and not in dispute |
| Answer the insurance department | 21 days | The department's inquiry is received |
| Reply to other claimant communications that expect a response | 15 days | The communication is received |

If the insurer needs more time to decide, it must say why within 21 days of the proof of loss, and then every 45 days while the investigation continues. The deadlines give way to a reasonable time for full investigation when specific information gives the insurer a reasonable basis to suspect the claimant fraudulently caused or contributed to the loss.

A denial must be in writing and must cite the provision, condition or exclusion it relies on. A claimant who objects to a denial must be told in writing that the insurance department can review it.

The insurer must fully disclose to a first-party claimant all pertinent benefits and coverages, and promptly give the forms, instructions and reasonable help the claimant needs. It may not deny a claim for failure to exhibit property unless the file documents a breach of the policy. It may not mark a payment "final" or a "release" unless the policy limit has been paid or a compromise has been agreed. An unrepresented claimant whose rights may be cut off by a statute of limitations must be warned in writing at least 30 days (first party) or 60 days (third party) before it expires.

Claim files are subject to examination by the commissioner. The insurer must be able to produce each claim's number, line of coverage, date of loss and date of payment, denial or closing for the current year and the two before it. Each file must contain enough documentation to reconstruct the insurer's handling of the claim, with every document dated when received, processed or mailed.

The regulation also sets how a first-party auto total loss is settled on actual cash value: a comparable replacement vehicle, or cash based on the cost of comparable vehicles, dealer quotations or a qualifying valuation source, with taxes and fees included. Where liability and damages are reasonably clear, an insurer may not tell a third-party claimant to claim under their own policy just to avoid paying.

> [!example]- Which steps on this fire claim were late under the model regulation? {Example}
> A homeowner reports a fire to her agent on day 0. The insurer's first contact is a letter on day 18. The properly executed proof of loss arrives on day 40, and on day 66 the insurer affirms that it owes \$42,000, an amount not in dispute. It pays on day 101.
>
> > [!answer]-
> > - Notice to the agent is notice to the insurer, so the clock starts on day 0.
> > - The acknowledgment was due by day $0 + 15 = 15$. Day 18 is late, and no payment was made in that time.
> > - The decision was due by day $40 + 21 = 61$. Day 66 is late. If the insurer needed more time, it had to tell her why by day 61.
> > - Payment was due by day $66 + 30 = 96$. Day 101 is late.
> > - One late file is a compliance failure for the claims department to fix. The same delays across many files indicate a general business practice, which is what the model act penalizes.

## Penalties

After a hearing, the commissioner may order the insurer to cease and desist and may impose a penalty of up to \$1,000 a violation, with a \$100,000 aggregate. For flagrant violations in conscious disregard of the act, the caps are \$25,000 a violation and \$250,000 in total. Violating a cease and desist order carries up to \$25,000 a violation, \$250,000 in total. License suspension or revocation is available in both cases.

For $n$ violations, the largest monetary penalty is

> $$\text{Maximum penalty} = \min(n \times \text{per-violation cap},\ \text{aggregate cap})$$

> [!example]- What is the largest penalty for 40 or 160 ordinary violations, or 15 flagrant ones? {Example}
> - For 40 violations that are not flagrant, the penalty is $\min(40 \times 1{,}000,\ 100{,}000) = \$40{,}000$.
> - For 160 violations that are not flagrant, it is $\min(160 \times 1{,}000,\ 100{,}000) = \$100{,}000$.
> - For 15 flagrant violations, it is $\min(15 \times 25{,}000,\ 250{,}000) = \$250{,}000$.

> [!trap] Treating every late letter as a violation of the act
> The model act penalizes a listed act only when it is flagrant and in conscious disregard of the act, or frequent enough to be a general business practice. One late acknowledgment caused by oversight is not, by itself, an improper claims practice.
