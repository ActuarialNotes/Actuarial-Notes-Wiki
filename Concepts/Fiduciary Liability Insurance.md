---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:8e5d77e024eecb464065630bd0219cfd9dd9e98f384e5a7a91fd04f4a770981c
  sources:
    - "ERISA, 29 U.S.C. §1104(a) (exclusive purpose, prudent man, diversification, plan documents) sha256:c41884f90446e9f75256cf0b89d094130d745a69718827c1cdebb573bdbe3e6a; §1109(a) (personal liability to make good plan losses) sha256:0367782c69cbbc2522e78bb6f9699475ab7dd26386d5c0a047a5d1072df8b410; §1110(b) (plan-bought insurance must permit recourse; fiduciary or employer may buy) sha256:8fd31d55e8d7c5cbd6a3054619da077efbf22e71872d71c7ec8ae69f635f3b22; §1112(a) (bond against fraud or dishonesty, not less than 10% of funds handled, $1,000 minimum, $500,000 maximum, $1,000,000 for a plan holding employer securities or a pooled employer plan) sha256:46564def7660b50c21b4f9862e85aa6d4c4b6c10bccd00758d508007cc08308b — https://www.law.cornell.edu/uscode/text/29/"
    - "Lockheed Corp. v. Spink, 517 U.S. 882 (1996) (LII): employers adopting, modifying or terminating plans do not act as fiduciaries but are analogous to settlors, sha256:fb391df8395fadd874d411aa4f5ded665b149a6c8883d095a994a03bb5c220db — https://www.law.cornell.edu/supremecourt/text/517/882"
    - "Chubb, The ForeFront Portfolio Policy Guidebook (specimen forms PF-55501 GTC (07/21) Retention, Severability, Payment Priority, Recourse pp.20-29; PF-55502 D&O and Entity Liability for Private Companies (07/21) Insuring Clauses A-C, Insured v. Insured carve-backs, Conduct (final non-appealable adjudication), ERISA exclusion, advancement pp.30-43; PF-55505 EPL (07/21) Insuring Clauses A-B (Third Party Liability), Employment Claim incl. administrative charge and applicants, Loss exclusions, Exclusions C-D incl. wage and hour, duty to defend or reimbursement pp.73-83; PF-55506 Fiduciary (07/21) Loss exclusions for benefits due and contributions, settlor capacity, Exclusions A-E pp.84-96), sha256:a97417e82bbcbe6773ba442938c4b575ea10b43d40f7b918a5a085f6f3dde294 — https://www.Chubb.com/content/dam/chubb-sites/chubb-com/us-en/the_forefront_portfolio_policy_guide.pdf"
    - "The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Fiduciary Liability Insurance.md
---

**Fiduciary Liability Insurance** covers the fiduciaries of an [[Employee Benefit Plan|employee benefit plan]], such as trustees, plan administrators and investment committee members, along with the plan and its sponsoring employer, against claims alleging a breach of fiduciary duty or an error in administering the plan. In the United States the Employee Retirement Income Security Act (ERISA) makes a fiduciary personally liable to restore any plan loss caused by a breach, so the cover protects individuals' own assets. The policy is written on a [[Claims Made Coverage|claims-made]] basis, and defense costs are part of the loss, which erodes the limit.

> $$\Lambda = V_{\text{prudent}} - V_{\text{actual}}$$

> $$\text{Paid} = \min\left((I + E - R)^+,\ L\right)$$

> $$B_{\text{bond}} = \min\left(\max(0.10\,F,\ 1{,}000),\ 500{,}000\right)$$

- **Symbols:** $\Lambda$ is the plan loss a court would order restored, the value the plan would have had if the fiduciaries had acted prudently less its actual value. $I$ is the settlement or judgment, $E$ the defense cost, $R$ the retention and $L$ the limit. $B_{\text{bond}}$ is the minimum ERISA bond for a person handling plan funds $F$, in dollars.
- **Fiduciary duties:** ERISA requires a fiduciary to act solely in the interest of participants and beneficiaries, for the exclusive purpose of providing benefits and paying reasonable expenses, with the care of a prudent person familiar with such matters, to diversify investments, and to follow the plan documents. Typical claims allege imprudent investment choices, excessive fees in a [[Defined Contribution Plan|defined contribution plan]], prohibited transactions with the employer, or wrong benefit calculations and misleading communications.
- **Settlor versus fiduciary acts:** Designing, amending or terminating a plan are settlor decisions of the employer, not fiduciary acts, so they rarely give rise to a breach claim. Running the plan once it exists, including choosing investments and administering benefits, is fiduciary work.
- **Not the ERISA bond:** ERISA separately requires everyone who handles plan funds to be bonded against loss to the plan from their fraud or dishonesty. The bond is first-party protection for the plan, like [[Commercial Crime Insurance|crime insurance]], and pays the plan when someone steals. Fiduciary liability insurance is third-party protection for the fiduciaries when they are sued for an honest but imprudent decision, and ERISA does not require it.
- **Recourse:** ERISA lets a plan buy fiduciary insurance with plan assets only if the insurer keeps recourse against the fiduciary whose breach caused the loss. Fiduciaries remove that recourse by buying a waiver of recourse endorsement with their own or the employer's money.
- **Exclusions:** Fraud, criminal acts and personal profit are excluded, usually after a final adjudication. Benefits due under the plan's terms are not covered loss, because the plan owed them anyway, and the employer's failure to make required contributions is excluded. Bodily injury and contractual liability are also excluded.
- **Why the line moved:** A run of class actions over 401(k) fees and investment menus raised claim frequency for plans of every size. Insurers responded with higher and separate retentions for those claims, and the cost of defense is a large part of each loss.

> [!example]- A Breach Claim Against Plan Trustees {Example}
> The trustees of a company's 401(k) plan kept \$8,000,000 of participants' money in a high-fee fund that earned 4% a year for three years, while a comparable low-cost fund earned 6%. Participants sue the trustees for breach of the duty of prudence. The fiduciary liability policy has a \$5,000,000 limit, defense inside the limit and a \$100,000 retention. Estimate the plan loss on the plaintiffs' measure, and find the insurer's payment if the case settles for \$370,000 after \$210,000 of defense costs.
>
> > [!answer]-
> > The plaintiffs measure the loss against what the prudent alternative would have earned.
> > $$
> > \begin{align*}
> > V_{\text{actual}} &= 8{,}000{,}000 \times 1.04^3 \\
> > &= 8{,}998{,}912 \\
> > V_{\text{prudent}} &= 8{,}000{,}000 \times 1.06^3 \\
> > &= 9{,}528{,}128 \\
> > \Lambda &= 9{,}528{,}128 - 8{,}998{,}912 \\
> > &= 529{,}216
> > \end{align*}
> > $$
> > The settlement is below the claimed loss, reflecting the risk to both sides of going to trial. The insurer pays the settlement and defense costs less the retention.
> > $$
> > \begin{align*}
> > \text{Paid} &= 370{,}000 + 210{,}000 - 100{,}000 \\
> > &= 480{,}000
> > \end{align*}
> > $$
> > The employer bears the \$100,000 retention, and the trustees bear nothing personally. Without the policy, ERISA would make each trustee personally liable to restore the plan's loss.

> [!example]- Theft From the Plan: Bond or Fiduciary Policy? {Example}
> The same plan's outside administrator, who handles all \$8,000,000 of plan funds, embezzles \$120,000. What minimum bond must cover the administrator, which coverage reimburses the plan for the theft, and what is left for the fiduciary policy?
>
> > [!answer]-
> > The bond must be 10% of the funds handled, subject to the floor and the cap.
> > $$
> > \begin{align*}
> > B_{\text{bond}} &= \min\left(\max(800{,}000,\ 1{,}000),\ 500{,}000\right) \\
> > &= 500{,}000
> > \end{align*}
> > $$
> > The ERISA bond, or a crime policy written to satisfy it, reimburses the plan for the \$120,000 stolen, because it covers dishonest acts of those who handle plan money. The fiduciary policy does not pay for the theft itself. If participants later sue the trustees for failing to monitor the administrator, that claim alleges a breach of the trustees' own duty, and the fiduciary policy defends it.

> [!tip]- How it appears on the exam
> - **DISC-IA:** Questions ask who is a fiduciary, what ERISA makes fiduciaries personally liable for, what a fiduciary liability policy covers and excludes, and how it differs from the ERISA bond and from D&O and [[Employment Practices Liability Insurance|EPLI]]. The applied version describes a plan problem and asks which coverage responds.
> - **Benefit plans:** The plans themselves, such as the [[Defined Benefit Plan|defined benefit]] and defined contribution plans of a [[Retirement Plan|retirement plan]] program, are covered in more depth on the pension and retirement exams.

> [!warning]- Exam traps
> - **Bond versus insurance:** The ERISA bond protects the plan from theft by those handling its money. It does not protect fiduciaries from liability for imprudence, which is what fiduciary liability insurance does.
> - **Required versus optional:** The bond is required by ERISA, while fiduciary liability insurance is not. A plan with only a bond leaves its fiduciaries personally exposed.
> - **Recourse:** A policy paid for by the plan gives the insurer recourse against the fiduciary at fault. The waiver of recourse must be bought with non-plan money to remove it.
> - **D&O does not cover it:** Most D&O policies exclude ERISA claims, and the individual trustees of a plan may not be directors or officers at all. A separate fiduciary policy is needed.
> - **Benefits owed are not loss:** If a participant sues for a benefit the plan's terms already promise, the plan pays it out of its own assets, and the policy typically covers only the cost of defending the claim.
