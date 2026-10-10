---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:bed53335fc03749739da0a055f21e706ae4765cccedaf546e692c8ca66bd07b5
  sources:
    - "ISO CP 00 10 10 12, Building and Personal Property Coverage Form, F.1.a-b with Examples 1-3 (pp.13-14), D (p.10), sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.11 PDF pp.211-213, 221-222 — LER and coinsurance clause, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), §IV limits on policy benefits, PDF p.7, sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Coinsurance.md
---

**Coinsurance** is a policy provision under which the insurer pays a fixed percentage $c$ ($0 < c \leq 1$) of the covered loss, with the policyholder responsible for the remaining fraction $1 - c$. Applied after the deductible, the insurer's payment is:

> $$\text{Payment} = c \cdot (X - d)^+$$

- Coinsurance incentivizes loss prevention by keeping the policyholder exposed to a share of every claim; it is common in health insurance and some property lines
- In ratemaking, Werner and Modlin define the loss elimination ratio for deductibles; they treat the property coinsurance clause separately, through an apportionment ratio applied to the loss payment
- In the property insurance context, a **coinsurance clause** can instead refer to a penalty applied when the insured carries less coverage than a required percentage of replacement value
- **The property coinsurance clause:** Under the ISO Building and Personal Property Coverage Form (CP 00 10 10 12), if the value of the covered property at the time of loss times the coinsurance percentage in the declarations exceeds the limit, the insurer pays: (1) value times the coinsurance percentage, the minimum insurance required; (2) the limit divided by that figure; (3) the whole loss, before any deductible, times that ratio; (4) less the deductible, but never more than the limit. The insured absorbs the rest or relies on other insurance. When one limit covers several items, the test uses the total value of all of them. Why the clause exists, and the other insurance-to-value provisions, are on [[Insurance to Value]].

> $$\text{Property payment} = \min\left(\min\left(\frac{C}{p \times V},\ 1\right) \times L - D,\ C\right)$$

- Here $C$ is the limit, $p$ the coinsurance percentage, $V$ the value at the time of loss and $L$ the loss, all on the policy's valuation basis, and $D$ the deductible.

> [!example]- Coinsurance Payment {Example}
> A health policy has a \$$200$ deductible and $70\%$ coinsurance. A covered loss is \$$1{,}200$.
>
> > [!answer]-
> > $$\text{Insurer payment} = 0.70 \times (1{,}200 - 200) = 0.70 \times 1{,}000 = \$700$$
> > The policyholder pays \$$200$ (deductible) $+ \$300$ (30% coinsurance share) $= \$500$ total.

> [!example]- A Property Coinsurance Penalty {Example}
> A building worth \$500,000 at the time of loss is insured under the BPP for \$360,000 with a 90% coinsurance clause and a \$1,000 deductible. A fire causes an \$80,000 loss. What does the insurer pay?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > p \times V &= 0.90 \times 500{,}000 \\
> > &= 450{,}000 \\
> > R &= \frac{360{,}000}{450{,}000} \\
> > &= 0.80 \\
> > \text{Payment} &= 0.80 \times 80{,}000 - 1{,}000 \\
> > &= 63{,}000
> > \end{align*}
> > $$
> > With at least \$450,000 of insurance the insurer would have paid \$79,000, so the penalty costs the insured \$16,000. The ratio applies to the whole loss before the deductible, as the form's steps require.

> [!tip]- How it appears on the exam
> - **DISC-IA:** Applying coinsurance is a calculation objective: a property's value, the limit, the coinsurance percentage, a deductible and a loss, with the payment to find under the form's four steps.
> - **Exam P:** The health-insurance sense, a fixed share $c$ of each loss above the deductible, appears in loss-model questions with deductibles and limits.

> [!warning]- Exam traps
> - **Two meanings:** In health insurance, coinsurance is the insured's share of every loss. In property insurance, it is a condition on the limit carried, and an insured who meets it pays no share beyond the deductible.
> - **Value at the time of loss:** The property clause tests the limit against the value when the loss occurs, not when the policy was bought.
> - **Ratio before deductible:** The BPP multiplies the full loss by the ratio and then subtracts the deductible.

