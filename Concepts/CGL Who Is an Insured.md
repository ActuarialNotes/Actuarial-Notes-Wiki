---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c775ffb9aa52ab7ed740318eadf76845ae013d885b0b951e66f23a8fb5e69aec
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/CGL Who Is an Insured.md
---

**CGL Who Is an Insured** is Section II of the ISO [[Commercial General Liability|Commercial General Liability Coverage Form]] (CG 00 01, 04 13 edition), which decides which persons and organizations the policy protects and for what conduct. The named insured is covered according to its form of organization, its owners, officers and employees are covered only in their roles for it, a few others are covered in narrow circumstances, and newly acquired organizations are covered for a short time.

> $$t_{\text{end}} = \min\left(t_{\text{acq}} + 90,\ t_1\right)$$

- **Symbols:** For an organization the named insured newly acquires or forms, $t_{\text{acq}}$ is the date of acquisition or formation, $t_{\text{acq}} + 90$ is the 90th day after it, $t_1$ is the end of the policy period, and $t_{\text{end}}$ is when its automatic coverage stops.
- **Paragraph 1, the named insured by form of organization:** If the declarations show (a) an individual, that person and spouse are insureds, but only for the conduct of a business of which the individual is sole owner; (b) a partnership or joint venture, it is an insured, and its members, partners and their spouses are insureds only for the conduct of its business; (c) a limited liability company, it is an insured, its members only for the conduct of its business and its managers only for their duties as managers; (d) any other organization, such as a corporation, it is an insured, its "executive officers" and directors only for their duties as officers or directors, and its stockholders only for their liability as stockholders; (e) a trust, it is an insured, and its trustees only for their duties as trustees.
- **Paragraph 2a, employees and volunteer workers:** "Volunteer workers" are insureds only while performing duties related to the business, and "employees" (other than executive officers of an organization, or managers of an LLC, who are covered under paragraph 1) only for acts within the scope of their employment or while performing duties related to the business.
- **What employees and volunteers are not covered for:** They are not insureds for (1) bodily injury or personal and advertising injury to the named insured, its partners or members, a co-employee in the course of employment, or a fellow volunteer worker on duty; to that person's spouse, child, parent, brother or sister as a consequence; for any obligation to share damages with or repay someone else who must pay because of such an injury; or arising from providing or failing to provide professional health care services. Nor are they insureds for (2) property damage to property owned, occupied or used by, or rented to, in the care, custody or control of, or physically controlled by, the named insured, its employees, volunteer workers, partners or members.
- **Paragraphs 2b to 2d, others:** Any person (other than an employee or volunteer worker) or organization is an insured while acting as the named insured's real estate manager. If the named insured dies, anyone with proper temporary custody of its property is an insured for liability arising from maintaining or using that property until a legal representative is appointed, and the legal representative is an insured for duties as such, with all the named insured's rights and duties.
- **Paragraph 3, newly acquired or formed organizations:** An organization the named insured newly acquires or forms, other than a partnership, joint venture or LLC, and in which it keeps ownership or a majority interest, qualifies as a named insured if no other similar insurance is available to it. Coverage lasts only until the 90th day after acquisition or formation or the end of the policy period, whichever is earlier; Coverage A does not apply to injury or damage that occurred before the acquisition, and Coverage B does not apply to offenses committed before it.
- **Partnerships not shown:** No person or organization is an insured for the conduct of any current or past partnership, joint venture or LLC that is not shown as a named insured in the declarations.
- **The definitions it turns on:** "Employee" includes a "leased worker" (a person leased from a labor leasing firm to perform duties related to the business) but not a "temporary worker" (a person furnished to substitute for a permanent employee on leave or to meet seasonal or short-term workload conditions). A "volunteer worker" is a person who is not an employee, who donates work, acts at the named insured's direction within the duties it sets, and is not paid a fee, salary or other compensation by anyone for that work. An "executive officer" holds an officer position created by the charter, constitution, bylaws or similar governing document.
- **Additional insureds:** Anyone not listed here, such as a project owner or a landlord the insured has contracted to protect, can be added by an additional insured endorsement ([[CGL Endorsements]]). Each insured against whom a claim is made is treated separately under the separation of insureds condition ([[CGL Conditions]]).
- **Why the definitions matter:** Because a temporary worker is not an "employee", the employer's liability exclusion, which refers to an "employee" of the insured, does not reach bodily injury to a temporary worker ([[CGL Coverage A Exclusions]]). For the same reason, paragraph 2a does not make a temporary worker an insured.

> [!example]- Who Is Covered at a Family Business? {Example}
> The declarations of a CGL policy show "Rosa Diaz, an individual, doing business as Diaz Bakery". Which of the following are insureds for the claim described? (a) Rosa, sued by a customer injured by a falling sign at the bakery; (b) her husband, sued by a neighbour his dog bit at their home; (c) a bakery employee, sued by a customer he knocked over while carrying trays; (d) the same employee, sued by a fellow employee he knocked over in the kitchen.
>
> > [!answer]-
> > - **(a) Insured:** An individual named insured is an insured for the conduct of the business of which she is sole owner.
> > - **(b) Not insured for this claim:** A spouse is an insured only with respect to the conduct of the business. A dog bite at home is a personal exposure for the homeowners policy.
> > - **(c) Insured:** An employee is an insured for acts within the scope of employment.
> > - **(d) Not insured:** Employees are not insureds for bodily injury to a co-employee in the course of employment. The injured employee's remedy is workers compensation.

> [!example]- A Subsidiary Bought Mid-Year {Example}
> A manufacturer's CGL policy runs from January 1, 2026 to January 1, 2027. On March 1, 2026 it buys all the shares of a distribution company that has no liability insurance of its own. (a) Until when is the distributor a named insured? (b) A customer is injured on April 10, 2026 by a forklift at the distributor's warehouse. (c) A customer injured there on February 20, 2026 sues in May. (d) Would the answer to (a) change if the manufacturer had instead bought a 50% interest in a joint venture?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > t_{\text{end}} &= \min(\text{Mar } 1 + 90 \text{ days},\ \text{Jan } 1, 2027) \\
> > &= \min(\text{May } 30,\ \text{Jan } 1, 2027) \\
> > &= \text{May } 30, 2026
> > \end{align*}
> > $$
> > - **(a)** The distributor qualifies as a named insured because the manufacturer owns a majority interest and no other similar insurance is available, until May 30, 2026. Coverage after that date needs the distributor added to the policy.
> > - **(b) Covered:** The injury occurred after the acquisition and within the 90 days. The forklift is mobile equipment, not an auto.
> > - **(c) Not covered:** Coverage A does not apply to bodily injury that occurred before the organization was acquired, even though the suit came later.
> > - **(d) Not covered:** Automatic coverage excludes partnerships, joint ventures and LLCs, and no one is an insured for the conduct of a joint venture not shown as a named insured.

> [!tip]- How it appears on the exam
> - **DISC-IA:** Section 11 opens with Who Is an Insured. Questions name a person (an owner, spouse, officer, employee, volunteer, real estate manager, a subsidiary) and an act, and ask whether that person is an insured for that act.
> - **With other provisions:** The answer then feeds the exclusions (employer's liability, Coverage C's any insured exclusion) and the limits, which are not multiplied by the number of insureds.

> [!warning]- Exam traps
> - **Insured "only with respect to":** Spouses, partners, members, officers and stockholders are insureds only in their roles for the business. Personal acts are outside the CGL.
> - **Co-employee injuries:** An employee who injures a co-employee at work is not an insured for that injury, even though the employee is an insured for injuring a customer.
> - **Temporary versus leased workers:** A leased worker is an employee under the form; a temporary worker is not.
> - **90 days or the expiry, whichever is earlier:** A subsidiary bought two weeks before expiry is covered for two weeks, not 90 days. Automatic coverage never applies to partnerships, joint ventures or LLCs, or to injury before the acquisition.
