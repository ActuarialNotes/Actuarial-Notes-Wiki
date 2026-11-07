---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:a9c14fc5063b945a384b419837af6b0ed045e42b5180af8ec4c8c5526fb33bbb
  sources:
    - "AF Group / Accident Fund, Premium Audit Process (web page, read 2026-10-10): estimate vs actual exposures and classifications, online/mail/phone/virtual/physical audits, audit noncompliance charge varies by state, sha256:bb3f82a60aebdb65467e3bf0144b0406cce6742e2713a6ea2c3df00b3f096259 — https://accidentfund.com/ph/premium-audit-process"
    - "Fla. Admin. Code R. 69O-189.003(4)(b) and (f) (via Cornell LII), voluntary-market minimum audit requirements, records examined, classification audits, sha256:a361d22c0e135409ed917b6df625d654dda03db24afd8fbd17602e93d6fff80f — https://www.law.cornell.edu/regulations/florida/Fla-Admin-Code-Ann-R-69O-189-003"
    - "IRMI glossary, 'premium audit', sha256:4d303e9e2670eb03ca6e5050b336726d99d40c4294ec4a273a9a9f79a6b79909 — https://www.irmi.com/term/insurance-definitions/premium-audit"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Premium Audit.md
---

![[Media/Figures/Premium_Audit.svg|340]]

A **Premium Audit** is the verification, after a policy expires, of the policy's actual exposure and classifications, so that its final premium can be determined. It is used on commercial lines whose [[Exposure Base|exposure base]] cannot be known in advance: workers compensation (payroll), general liability (sales or receipts) and commercial auto (mileage or units).

The insured pays a **deposit premium** at inception based on estimated exposures. After the audit, the premium and its adjustment are

> $$\text{Audited Premium} = \text{Rate} \times \text{Actual Exposure}$$

> $$\text{Audit Adjustment} = \text{Audited Premium} - \text{Deposit Premium}$$

- $\text{Rate}$ is the rate per unit of the exposure base, such as per $\$100$ of payroll.
- $\text{Actual Exposure}$ is the exposure found at audit, counted in those units.

A positive adjustment is billed as **additional premium**, and a negative one is refunded as **return premium**.

> [!example]- A workers compensation policy is written on an estimated payroll of $\$2{,}000{,}000$ at $\$3.50$ per $\$100$ of payroll. At audit, the actual payroll for the term was $\$2{,}400{,}000$. What are the deposit premium, the audited premium and the adjustment? {Example}
> - The deposit premium is $(2{,}000{,}000/100) \times 3.50 = \$70{,}000$.
> - The audited premium is $(2{,}400{,}000/100) \times 3.50 = \$84{,}000$.
> - The adjustment is $84{,}000 - 70{,}000 = \$14{,}000$, billed as additional premium.

## What an audit checks

The premium charged at inception is an estimate, and the exposures and classifications behind it change during the policy. The audit compares the actual exposures and classifications with the estimate to fix the final premium, which can go down as well as up, and it checks that each employee's duties are assigned to the right classification. Payroll for duties in another class is moved to that class and charged at its rate.

An audit may be physical, at the insured's premises, or virtual, by telephone, mail or online. The records reviewed include payroll records, federal reports of employee income, state reemployment tax forms, cash disbursement journals and other accounting records, certificates of insurance for subcontractors, and independent contractor documents. Florida's workers compensation rule, for example, requires a physical audit every year for a voluntary market policy with an estimated annual premium of \$10,000 or more, allows a mail or physical audit below that, and requires a physical audit for new business with construction classifications. An insured that does not cooperate with an audit can face an audit noncompliance charge, which varies by state.

> [!example]- An employer's deposit premium was set on an estimated payroll of $\$1{,}500{,}000$, all in a clerical class at $\$0.50$ per $\$100$. At audit the payroll is $\$1{,}600{,}000$, of which $\$400{,}000$ is for employees doing field installation, a class rated at $\$6.00$ per $\$100$. What is the adjustment? {Example}
> - The deposit premium is $(1{,}500{,}000/100) \times 0.50 = \$7{,}500$.
> - The clerical class keeps $\$1{,}200{,}000$ of payroll, for $(1{,}200{,}000/100) \times 0.50 = \$6{,}000$.
> - The installation payroll is moved to its own class, for $(400{,}000/100) \times 6.00 = \$24{,}000$.
> - The audited premium is $6{,}000 + 24{,}000 = \$30{,}000$.
> - The adjustment is $30{,}000 - 7{,}500 = \$22{,}500$ of additional premium, most of it from the classification.

## Premium development

The audit books its adjustment when it occurs, after the policy has expired, so the adjustment is written and earned in full at the audit. [[Calendar Year|Calendar year]] premium is fixed at the end of the year, so it contains audit adjustments belonging to policies of prior years. [[Policy Year|Policy year]] premium assigns each adjustment back to the year the policy was written, so it keeps developing after the policy year ends. Workers compensation audits happen about three to six months after the policy expires.

Policy year premium is brought to ultimate with premium development factors, read from the historical pattern of premium by age:

> $$f_{24 \to 36} = \frac{\text{Policy Year Premium at 36 months}}{\text{Policy Year Premium at 24 months}}$$

Because the final premium follows the audited payroll, an auditable line's premium rises with wage inflation at an unchanged rate. That is its [[Exposure Trend|exposure trend]].

> [!example]- A workers compensation carrier writes one policy a month in 2011, each booked at $\$500{,}000$. Every policy develops upward by 8% at its audit, six months after it expires. What is the Policy Year 2011 premium development factor from 24 to 36 months? {Example}
> - At December 31, 2012, the six policies written in the first half of 2011 have been audited, and the other six have not.
> - The premium at 24 months is $6 \times 500{,}000 \times 1.08 + 6 \times 500{,}000 = \$6{,}240{,}000$.
> - At December 31, 2013, all twelve have been audited, so the premium at 36 months is $12 \times 500{,}000 \times 1.08 = \$6{,}480{,}000$.
> - The development factor is $6{,}480{,}000/6{,}240{,}000 = 1.0385$.

> [!trap] Developing the losses but not the premium
> A policy year loss ratio with ultimate losses over premium still awaiting audits is overstated. In the example, Policy Year 2011's premium at 24 months is $\$6{,}240{,}000$, so its loss ratio is $1.0385$ times what it is on the ultimate $\$6{,}480{,}000$. Develop the premium to ultimate too.
