---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:0b139b00f4b6764e7d6be8f728d01510004457a79a0acb270aca04e95c1acbd3
  sources:
    - "Chubb, The ForeFront Portfolio Policy Guidebook (specimen forms PF-55501 GTC (07/21) Retention, Severability, Payment Priority, Recourse pp.20-29; PF-55502 D&O and Entity Liability for Private Companies (07/21) Insuring Clauses A-C, Insured v. Insured carve-backs, Conduct (final non-appealable adjudication), ERISA exclusion, advancement pp.30-43; PF-55505 EPL (07/21) Insuring Clauses A-B (Third Party Liability), Employment Claim incl. administrative charge and applicants, Loss exclusions, Exclusions C-D incl. wage and hour, duty to defend or reimbursement pp.73-83; PF-55506 Fiduciary (07/21) Loss exclusions for benefits due and contributions, settlor capacity, Exclusions A-E pp.84-96), sha256:a97417e82bbcbe6773ba442938c4b575ea10b43d40f7b918a5a085f6f3dde294 — https://www.Chubb.com/content/dam/chubb-sites/chubb-com/us-en/the_forefront_portfolio_policy_guide.pdf"
    - "Kevin LaCroix, D&O Diary, 'Thinking About the Differences Between Private Company and Public Company D&O Insurance' (June 2019): public company entity coverage limited to Securities Claims, sha256:f6fbcb788786ce102633759912a7e1e95627950bc95a6f1b14a948cdef554f9c — https://www.dandodiary.com/2019/06/articles/d-o-insurance/thinking-about-the-differences-between-private-company-and-public-company-do-insurance/"
    - "8 Del. C. §145(b) (indemnification in actions by or in the right of the corporation limited to expenses) and (g) (power to purchase D&O insurance), sha256:6854d085538edb49b067d2ed41fdd9129b06ee46d32f1492a830abeabb9c2a06 — https://delcode.delaware.gov/title8/c001/sc04/index.html"
    - "The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Directors and Officers Liability Insurance.md
---

**Directors and Officers Liability Insurance** (D&O) covers the directors and officers of an organization for loss from claims alleging a "wrongful act" in their capacity as directors or officers, such as a breach of duty, a misleading statement or a neglectful decision, and reimburses the organization when it indemnifies them. A public company's policy usually also covers the organization itself for securities claims. D&O is written on a [[Claims Made Coverage|claims-made]] basis, and defense costs are part of the loss, so they erode the limit.

> $$P_A = A$$

> $$P_B = (B - R_B)^+$$

> $$P_C = (C - R_C)^+$$

> $$\text{Paid} = \min\left(P_A + P_B + P_C,\ L\right)$$

- **Symbols:** $A$ is the loss of insured persons that the organization does not indemnify, $B$ is the loss of insured persons that it does indemnify, and $C$ is the organization's own loss from a covered securities claim, each including defense costs. $R_B$ and $R_C$ are the retentions on Sides B and C, and $L$ is the policy limit, which the three sides share.
- **Side A, insured persons:** Side A pays directors and officers directly when the organization cannot or may not indemnify them, because it is insolvent, because the law forbids indemnification (as with many derivative-suit settlements), or because it refuses. There is normally no retention, since an individual should not bear the first dollars of a loss the organization was meant to absorb.
- **Side B, corporate reimbursement:** Side B reimburses the organization for what it pays to indemnify its directors and officers under its bylaws or by contract. The organization bears the retention, so in practice Side B acts as balance sheet protection for the company.
- **Side C, entity coverage:** Side C covers the organization's own liability. For a public company it is usually limited to securities claims, such as a shareholder [[Class Action|class action]] alleging misstatements in a prospectus or annual report, and it carries the largest retention. A private company or nonprofit form typically extends entity coverage to most claims against the organization.
- **Claims-made trigger:** The policy covers claims first made during the policy period, often reported within it or a short time after. A prior and pending litigation exclusion removes claims arising from suits filed before a stated date, and notice of circumstances during the period locks later claims from those facts into the current policy.
- **Insured versus insured exclusion:** Claims brought by the organization or one insured person against another are excluded, which prevents collusive suits and keeps internal disputes uninsured. Standard carve-backs restore coverage for shareholder derivative suits brought without insiders' help, employment claims, whistleblower claims and suits by a bankruptcy trustee or receiver.
- **Conduct exclusions:** Fraud, criminal acts and profit to which the insured was not legally entitled are excluded, usually only once established by a final adjudication, so defense costs are advanced until then. A severability provision keeps one director's misconduct from being imputed to the others.
- **Allocation and order of payments:** When a claim involves covered and uncovered parties or matters, an allocation clause splits the loss between them. A priority of payments clause pays Side A loss before Side B and Side C, so the individuals' protection is not used up by the organization's own claims. Some boards buy a separate Side A excess or difference-in-conditions policy that only individuals can draw on.

> [!example]- Allocating a Securities Claim Across Sides A, B and C {Example}
> A public company's D&O policy has a \$15,000,000 limit shared by all three sides, no Side A retention, a \$1,000,000 Side B retention and a \$2,500,000 Side C retention. It has a priority of payments clause. A shareholder class action and a related derivative suit are settled, with loss including defense costs allocated as follows:
>
> - \$11,000,000 is the company's own securities loss (Side C).
> - \$8,000,000 is the officers' loss, which the company indemnifies (Side B).
> - \$1,000,000 is the derivative settlement the officers must pay, which the company may not indemnify (Side A).
>
> How much does the insurer pay under each side, and what does the company bear?
>
> > [!answer]-
> > Before the limit, each side's payment is its loss less its retention.
> > $$
> > \begin{align*}
> > P_A &= 1{,}000{,}000 \\
> > P_B &= 8{,}000{,}000 - 1{,}000{,}000 \\
> > &= 7{,}000{,}000 \\
> > P_C &= 11{,}000{,}000 - 2{,}500{,}000 \\
> > &= 8{,}500{,}000 \\
> > P_A + P_B + P_C &= 16{,}500{,}000
> > \end{align*}
> > $$
> > The total exceeds the \$15,000,000 limit, so the priority of payments clause decides who absorbs the shortfall. Side A is paid first and Side B next, so Side C receives only what remains.
> > $$
> > \begin{align*}
> > P_C &= 15{,}000{,}000 - 1{,}000{,}000 - 7{,}000{,}000 \\
> > &= 7{,}000{,}000
> > \end{align*}
> > $$
> > The officers bear nothing. The company bears the \$1,000,000 Side B retention and \$4,000,000 of its own securities loss, \$5,000,000 in all, and the \$20,000,000 loss is fully accounted for. Without the clause, the company's \$8,500,000 Side C claim could have exhausted the limit before the officers' claims were paid.

> [!example]- Which Claims Does the Policy Answer? {Example}
> A company's D&O policy runs from January 1 to December 31, 2025, with a prior and pending litigation date of January 1, 2020. Three matters arise in 2025:
>
> 1. A shareholder files a derivative suit, without help from any insider, alleging the board failed to oversee safety compliance.
> 2. The company sues its former CEO for mismanagement.
> 3. A supplier's suit filed in 2019 is amended to name two directors personally.
>
> Which are covered?
>
> > [!answer]-
> > The derivative suit is covered. Shareholders bring it on the company's behalf, but the insured versus insured exclusion carves back derivative suits brought without insiders' solicitation, and any settlement the company may not indemnify falls under Side A. The company's suit against its former CEO is excluded by the insured versus insured exclusion, unless it is brought by a bankruptcy trustee or receiver. The amended supplier suit arises from litigation pending before the prior and pending litigation date, so it is excluded even though the directors were first named during the policy period.

> [!tip]- How it appears on the exam
> - **DISC-IA:** Questions ask what each of Sides A, B and C covers, why D&O is written claims-made, and how the insured versus insured and conduct exclusions apply. The applied version gives a claim and a policy, and asks which side responds, whether an exclusion removes it and how the retentions and the shared limit divide the loss.
> - **Related coverages:** D&O sits with [[Professional Liability Insurance|professional liability]], [[Employment Practices Liability Insurance|employment practices]] and [[Fiduciary Liability Insurance|fiduciary liability]] in the specialty liability lines, and candidates are expected to say which policy a given wrongful act belongs to.

> [!warning]- Exam traps
> - **Side A has no retention:** The retention applies to Sides B and C, which the organization funds. Taking a retention off Side A loss understates what the individuals recover.
> - **Defense erodes the limit:** Unlike the [[Commercial General Liability|CGL]], D&O counts defense costs as loss, so a long securities defense can use up much of the limit before any settlement is reached.
> - **Conduct exclusions need adjudication:** Fraud and illegal-profit exclusions usually apply only after a final adjudication establishes the conduct. An allegation of fraud does not stop the insurer advancing defense costs.
> - **Entity coverage is narrow for public companies:** A public company's Side C usually covers only securities claims. An employment or contract claim against the company itself is not covered under Side C.
> - **Shared limit:** One limit serves all three sides and all insured persons. A claim against the organization reduces what is left for the directors, which is why order-of-payments clauses and dedicated Side A policies exist.
