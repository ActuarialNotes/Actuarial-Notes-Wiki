---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:7cd6bddf7928c8a7191e34cfb7b9a3abe4e4f20e53f0390fc84d83120e8de725
  sources:
    - "Chubb, The ForeFront Portfolio Policy Guidebook (specimen forms PF-55501 GTC (07/21) Retention, Severability, Payment Priority, Recourse pp.20-29; PF-55502 D&O and Entity Liability for Private Companies (07/21) Insuring Clauses A-C, Insured v. Insured carve-backs, Conduct (final non-appealable adjudication), ERISA exclusion, advancement pp.30-43; PF-55505 EPL (07/21) Insuring Clauses A-B (Third Party Liability), Employment Claim incl. administrative charge and applicants, Loss exclusions, Exclusions C-D incl. wage and hour, duty to defend or reimbursement pp.73-83; PF-55506 Fiduciary (07/21) Loss exclusions for benefits due and contributions, settlor capacity, Exclusions A-E pp.84-96), sha256:a97417e82bbcbe6773ba442938c4b575ea10b43d40f7b918a5a085f6f3dde294 — https://www.Chubb.com/content/dam/chubb-sites/chubb-com/us-en/the_forefront_portfolio_policy_guide.pdf"
    - "Kevin LaCroix, D&O Diary, 'Thinking About the Differences Between Private Company and Public Company D&O Insurance' (June 2019): public company entity coverage limited to Securities Claims, sha256:f6fbcb788786ce102633759912a7e1e95627950bc95a6f1b14a948cdef554f9c — https://www.dandodiary.com/2019/06/articles/d-o-insurance/thinking-about-the-differences-between-private-company-and-public-company-do-insurance/"
    - "8 Del. C. §145(b) (indemnification in actions by or in the right of the corporation limited to expenses) and (g) (power to purchase D&O insurance), sha256:6854d085538edb49b067d2ed41fdd9129b06ee46d32f1492a830abeabb9c2a06 — https://delcode.delaware.gov/title8/c001/sc04/index.html"
    - "The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Directors and Officers Liability Insurance.md
---

**Directors and Officers Liability Insurance** (D&O) is insurance that covers the directors and officers of an organization for loss from claims alleging a "wrongful act" in their capacity as directors or officers, such as a breach of duty, a misleading statement or a neglectful decision, and reimburses the organization when it indemnifies them. A public company's policy usually also covers the organization itself for securities claims.

A D&O policy has three insuring agreements, called sides:

1. **Side A, insured persons.** Side A pays directors and officers directly when the organization cannot or may not indemnify them: it is insolvent, the law forbids indemnification (as with many derivative-suit settlements), or it refuses. There is normally no retention.
2. **Side B, corporate reimbursement.** Side B reimburses the organization for what it pays to indemnify its directors and officers under its bylaws or by contract. The organization bears a retention, so in practice Side B protects the company's balance sheet.
3. **Side C, entity coverage.** Side C covers the organization's own liability rather than the personal defense costs of its directors and officers. For a public company it is usually limited to securities claims, such as a shareholder [[Class Action|class action]] alleging misstatements in a prospectus or annual report. A private company or nonprofit form typically extends entity coverage to most claims against the organization.

D&O is written on a [[Claims Made Coverage|claims-made]] basis. The policy covers claims first made during the policy period, often reported within it or a short time after. A prior and pending litigation exclusion removes claims arising from suits filed before a stated date, and notice of circumstances given during the period locks later claims from those facts into the current policy.

D&O sits with [[Professional Liability Insurance|professional liability]], [[Employment Practices Liability Insurance|employment practices liability]] and [[Fiduciary Liability Insurance|fiduciary liability]] in the specialty liability lines.

## Retentions, the shared limit and the order of payments

Defense costs are part of the loss, so they erode the limit, and one limit serves all three sides and all insured persons. The amount the insurer pays on a claim is

> $$\text{Paid} = \min\left(A + (B - R_B)^+ + (C - R_C)^+,\ L\right)$$

- $A$ is the loss of insured persons that the organization does not indemnify, including defense costs.
- $B$ is the loss of insured persons that the organization does indemnify, including defense costs.
- $C$ is the organization's own loss from a covered securities claim, including defense costs.
- $R_B$ and $R_C$ are the retentions on Sides B and C.
- $L$ is the policy limit.

When a claim involves covered and uncovered parties or matters, an allocation clause splits the loss between them. A priority of payments clause pays Side A loss before Side B and Side C, so the individuals' protection is not used up by the organization's own claims. Some forms add a limit only individuals can draw on: Chubb's provides an Additional Limit of Liability Dedicated for Executives, outside the aggregate limit, for loss the organization does not indemnify.

> [!example]- How much does the insurer pay under each side, and what does the company bear? {Example}
> A public company's D&O policy has a $\$15{,}000{,}000$ limit shared by all three sides, no Side A retention, a $\$1{,}000{,}000$ Side B retention, a $\$2{,}500{,}000$ Side C retention and a priority of payments clause. A shareholder class action and a related derivative suit settle, with loss including defense costs allocated as follows:
>
> | Loss | Side | Amount ($) |
> | :--- | :--- | ---: |
> | The company's own securities loss | C | 11,000,000 |
> | The officers' loss, which the company indemnifies | B | 8,000,000 |
> | The derivative settlement the officers must pay, which the company may not indemnify | A | 1,000,000 |
>
> > [!answer]-
> > - Before the limit, Side A pays $\$1{,}000{,}000$, Side B pays $8{,}000{,}000 - 1{,}000{,}000 = \$7{,}000{,}000$ and Side C pays $11{,}000{,}000 - 2{,}500{,}000 = \$8{,}500{,}000$.
> > - The total, $\$16{,}500{,}000$, exceeds the $\$15{,}000{,}000$ limit.
> > - Side A is paid first and Side B next, so Side C receives what remains: $15{,}000{,}000 - 1{,}000{,}000 - 7{,}000{,}000 = \$7{,}000{,}000$.
> > - The officers bear nothing. The company bears the $\$1{,}000{,}000$ Side B retention and $\$4{,}000{,}000$ of its own securities loss, $\$5{,}000{,}000$ in all.
> > - Without the clause, the company's $\$8{,}500{,}000$ Side C claim could have exhausted the limit before the officers' claims were paid.

## Exclusions

The **insured versus insured exclusion** removes claims brought by the organization or one insured person against another, which prevents collusive suits and keeps internal disputes uninsured. Standard carve-backs restore coverage for shareholder derivative suits brought without insiders' help, employment claims, whistleblower claims and suits by a bankruptcy trustee or receiver.

The **conduct exclusions** remove fraud, criminal acts and profit to which the insured was not legally entitled. They usually apply only once a final adjudication establishes the conduct, so defense costs are advanced until then. A severability provision keeps one director's misconduct from being imputed to the others.

> [!example]- Which of these three matters does this D&O policy cover? {Example}
> A company's D&O policy runs from January 1 to December 31, 2025, with a prior and pending litigation date of January 1, 2020. Three matters arise in 2025:
>
> 1. A shareholder files a derivative suit, without help from any insider, alleging the board failed to oversee safety compliance.
> 2. The company sues its former CEO for mismanagement.
> 3. A supplier's suit filed in 2019 is amended to name two directors personally.
>
> > [!answer]-
> > - The derivative suit is covered, because the insured versus insured exclusion carves back derivative suits brought without insiders' solicitation. A settlement the company may not indemnify falls under Side A.
> > - The company's suit against its former CEO is excluded by the insured versus insured exclusion, unless a bankruptcy trustee or receiver brings it.
> > - The supplier's suit arises from litigation pending before the prior and pending litigation date, so it is excluded even though the directors were first named during the policy period.

> [!trap] Taking a retention off Side A loss
> The retentions apply to Sides B and C, which the organization funds. Side A normally carries no retention, so deducting one understates what the individuals recover.
