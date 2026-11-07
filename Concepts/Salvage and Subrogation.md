---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:f2ed9ca970371314f30082f6a0fefcd34bdb03399942a8b58ce2f22236ff91b9
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 3 p.33 (PDF p.39); Ch. 4 (PDF pp.50-56, chapter title); Ch. 14 pp.329-330 (PDF pp.335-336), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Salvage and Subrogation.md
---

![[Media/Figures/Salvage_and_Subrogation.svg|340]]

**Salvage and Subrogation** (S&S) are two of the most common [[Recoveries|recoveries]] of an insurer. When the insurer pays an insured for a total loss, it acquires the rights to the damaged property, and salvage is what it collects from selling that property. Subrogation is the insurer's right to recover the amount it paid an insured from a third party responsible for the injury or damage. Ultimate claims net of S&S are

> $$\text{Net Ultimate Claims} = \text{Gross Ultimate Claims} - \text{Ultimate S\&S}$$

Salvage is most commonly associated with property coverages, and is fast to report and fast to settle. Subrogation, typically associated with liability coverages, can take years to realize, well after the underlying claims are paid. That gives age-to-age factors below $1.000$ at older ages for some lines. Subrogation follows a covered payment. Whether a policy covers a loss does not depend on whether the insurer can recover from a liable third party, such as a manufacturer.

## Developing S&S on its own

Where the insurer keeps S&S data, the [[Chain Ladder Method|development technique]] can be applied to the reported or the received S&S alone, with the S&S triangle's own age-to-age factors. Received S&S, sometimes called paid S&S, is a payment from a third party to the insurer. Developed this way, an accident year's ultimate S&S is

> $$\text{Ultimate S\&S} = \frac{\text{Received S\&S}}{\text{Percentage Received}}$$

- $\text{Percentage Received}$ is the expected share of ultimate S&S received by the year's age, the reciprocal of the S&S CDF.

The S&S recoverable is the ultimate S&S minus the S&S received, and it is a reduction to the estimate of unpaid claims. Unpaid claims net of S&S are the gross unpaid claims minus the recoverable. The alternative is to develop the ratio of S&S to paid claims, the [[Recoveries#The ratio approach to salvage and subrogation|ratio approach]], whose factors are less leveraged.

> [!example]- An accident year has gross reported claims of $\$1{,}000{,}000$ with a gross CDF of $1.200$, and received S&S of $\$120{,}000$, of which $80\%$ is expected to have been received by its age. Gross paid claims are $\$700{,}000$. What are its net ultimate claims and its net unpaid claims? {Example}
> - The gross ultimate claims are $1{,}000{,}000 \times 1.200 = \$1{,}200{,}000$.
> - The ultimate S&S is $120{,}000/0.80 = \$150{,}000$.
> - The net ultimate claims are $1{,}200{,}000 - 150{,}000 = \$1{,}050{,}000$.
> - The gross unpaid claims are $1{,}200{,}000 - 700{,}000 = \$500{,}000$, and the S&S recoverable is $150{,}000 - 120{,}000 = \$30{,}000$.
> - The net unpaid claims are $500{,}000 - 30{,}000 = \$470{,}000$.
