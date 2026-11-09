---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:2c56e68656a804609a0b9ded816111e6f7ada11fe9ce7f506602cbd5d7f17317
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 3 p.33 (PDF p.39); Ch. 14 p.329 (PDF p.335), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 15 p.303 (PDF p.315), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Deductible Recovery.md
---

![[Media/Figures/Deductible_Recovery.svg|340]]

A **Deductible Recovery** is the amount an insurer recovers from its insured for a claim payment it made within the insured's deductible. Deductibles are one of the most common [[Recoveries|recoveries]]. On a loss to which a per-occurrence deductible applies, the recovery is

> $$\text{Deductible Recovery} = \min(\text{Loss}, \text{Deductible})$$

- $\text{Loss}$ is the ground-up amount the insurer paid on the occurrence.

Whether there is a recovery at all depends on how the line is paid. In first-party coverage such as automobile physical damage, the insurer applies the deductible before it pays the insured, so the payment is already net. In third-party coverage such as general liability, the injured party is not the insured, so the insurer pays the injured party and then seeks recovery of the deductible from the insured. Insurers also differ in their case outstanding for deductibles. Some set it net of the deductible and others do not consider the deductible, and practice may vary between lines within one insurer. Paid claims count only actual payments, net of recoveries. A claim closed without payment adds nothing to paid claims, and case outstanding is not in them.

> [!example]- A liability policy has a $\$250{,}000$ per-occurrence deductible. The insurer pays a $\$400{,}000$ claim in full and bills the insured. What are the recovery due and the net loss, and what is the net loss if the insured pays only $\$200{,}000$ before failing? {Example}
> - The recovery due is $\min(400{,}000, 250{,}000) = \$250{,}000$.
> - The net loss is $400{,}000 - 250{,}000 = \$150{,}000$.
> - If only $\$200{,}000$ is collected, the net loss is $400{,}000 - 200{,}000 = \$200{,}000$.
> - The extra $\$50{,}000$ is a credit loss on the deductible, not claim experience.

## Large deductible policies and credit risk

Under a [[Large Deductible Policy|large deductible policy]] the insurer typically handles and pays every claim from the ground up, including those below the deductible, and then bills the insured for the deductible portion. The insurer keeps control of the claims and their ultimate cost. It also takes on credit risk, the risk that the insured becomes bankrupt or otherwise cannot reimburse deductible amounts the insurer has already paid. The credit risk is the deductible amount the insurer expects to recover, so the larger the deductible, the larger the credit risk and the collateral the insurer requires.

> [!example]- An insured expects $40$ claims a year averaging $\$60{,}000$ each, all below $\$100{,}000$. Structure A has a $\$100{,}000$ per-occurrence deductible, and structure B the same deductible with a $\$1{,}000{,}000$ annual aggregate cap on the insured's deductible payments. Which carries more credit risk? {Example}
> - Under structure A every claim is within the deductible, so the expected recoverable is $40 \times 60{,}000 = \$2{,}400{,}000$.
> - Under structure B the insured's reimbursements stop at the cap, so the expected recoverable is at most $\$1{,}000{,}000$.
> - The credit risk is the expected recoverable deductible, so structure A carries more.
