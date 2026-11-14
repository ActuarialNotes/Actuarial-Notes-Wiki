---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:8ba224befaf6a335b600f4d110b2ba70e2ab1c8482817d4b3f7a6cca35631840
  sources:
    - "ISO CG 00 01 04 13 Commercial General Liability Coverage Form (ISO 2012, 16 pp.), Section II paras 1 a-e, 2 a-d, 3 a-c and closing sentence (pp.9-10); Section V defs 5, 6, 10, 19, 20 (pp.13-16); Coverage A exclusion e (p.2), sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/CGL Who Is an Insured.md
---

**CGL Who Is an Insured** is Section II of the ISO [[Commercial General Liability|Commercial General Liability Coverage Form]] (CG 00 01, 04 13 edition), which decides which persons and organizations the policy protects and for what conduct. The named insured is covered according to its form of organization, its owners, officers and employees are covered only in their roles for it, a few others are covered in narrow circumstances, and newly acquired organizations are covered for a short time.

Who is an insured depends first on what the declarations show the named insured to be:

| Named insured shown as | Who is an insured | For what |
| :--- | :--- | :--- |
| An individual | The individual and spouse | Only the conduct of a business of which the individual is sole owner |
| A partnership or joint venture | The partnership or joint venture | As the named insured |
| | Its members, partners and their spouses | Only the conduct of its business |
| A limited liability company | The LLC | As the named insured |
| | Its members | Only the conduct of its business |
| | Its managers | Only their duties as managers |
| Any other organization, such as a corporation | The organization | As the named insured |
| | Its "executive officers" and directors | Only their duties as officers or directors |
| | Its stockholders | Only their liability as stockholders |
| A trust | The trust | As the named insured |
| | Its trustees | Only their duties as trustees |

An "executive officer" holds an officer position created by the charter, constitution, bylaws or similar governing document. No person or organization is an insured for the conduct of any current or past partnership, joint venture or LLC that is not shown as a named insured in the declarations.

> [!example]- Which of these people are insureds under Diaz Bakery's CGL for the claim described? {Example}
> The declarations of a CGL policy show "Rosa Diaz, an individual, doing business as Diaz Bakery".
>
> - (a) Rosa, sued by a customer injured by a falling sign at the bakery.
> - (b) Her husband, sued by a neighbour his dog bit at their home.
> - (c) A bakery employee, sued by a customer he knocked over while carrying trays.
> - (d) The same employee, sued by a fellow employee he knocked over in the kitchen.
>
> > [!answer]-
> > - Rosa is an insured in (a), because an individual named insured is an insured for the conduct of the business of which she is sole owner.
> > - Her husband is not an insured in (b). A spouse is an insured only with respect to the conduct of the business, and a dog bite at home is a personal exposure for the homeowners policy.
> > - The employee is an insured in (c), because he acted within the scope of his employment.
> > - The employee is not an insured in (d), because employees are not insureds for bodily injury to a co-employee in the course of employment. The injured employee's remedy is workers compensation.

## Employees and volunteer workers

"Employees" are insureds only for acts within the scope of their employment by the named insured or while performing duties related to the conduct of its business. Executive officers of an organization and managers of an LLC are covered as such under the table instead. "Volunteer workers" are insureds only while performing duties related to the conduct of the business.

An "employee" includes a "leased worker", a person leased from a labor leasing firm to perform duties related to the business. It does not include a "temporary worker", a person furnished to substitute for a permanent employee on leave or to meet seasonal or short-term workload conditions. A "volunteer worker" is a person who is not an employee, who donates work, acts at the named insured's direction within the duties it sets, and is not paid a fee, salary or other compensation by anyone for that work.

Employees and volunteer workers are not insureds for:

1. Bodily injury or personal and advertising injury to the named insured, its partners or members, a co-employee in the course of employment, or a fellow volunteer worker on duty.
2. Bodily injury or personal and advertising injury to that person's spouse, child, parent, brother or sister as a consequence of such an injury.
3. Any obligation to share damages with or repay someone else who must pay because of such an injury.
4. Injury arising from providing or failing to provide professional health care services.
5. Property damage to property owned, occupied or used by, or rented to, in the care, custody or control of, or physically controlled by, the named insured, its employees, volunteer workers, partners or members.

Because a temporary worker is not an "employee", paragraph 2a does not make a temporary worker an insured. For the same reason, the employer's liability exclusion, which refers to an "employee" of the insured, does not reach bodily injury to a temporary worker ([[CGL Coverage A Exclusions]]).

## Other insureds

Any person (other than an employee or volunteer worker) or organization is an insured while acting as the named insured's real estate manager. If the named insured dies, anyone with proper temporary custody of its property is an insured for liability arising from maintaining or using that property until a legal representative is appointed. The legal representative is an insured for duties as such, with all the named insured's rights and duties.

Anyone not listed here, such as a project owner or a landlord the insured has contracted to protect, can be added by an additional insured endorsement ([[CGL Endorsements]]). Each insured against whom a claim is made is treated separately under the separation of insureds condition ([[CGL Conditions]]).

## Newly acquired or formed organizations

An organization the named insured newly acquires or forms, other than a partnership, joint venture or LLC, and in which it keeps ownership or a majority interest, qualifies as a named insured if no other similar insurance is available to it. For an organization acquired or formed on day $t_{\text{acq}}$, this coverage ends on

> $$t_{\text{end}} = \min\left(t_{\text{acq}} + 90,\ t_1\right)$$

- $t_{\text{acq}} + 90$ is the 90th day after the acquisition or formation.
- $t_1$ is the end of the policy period.

Coverage A does not apply to injury or damage that occurred before the acquisition or formation, and Coverage B does not apply to offenses committed before it.

> [!example]- How far does the manufacturer's CGL cover the distributor it bought mid-year? {Example}
> A manufacturer's CGL policy runs from January 1, 2026 to January 1, 2027. On March 1, 2026 it buys all the shares of a distribution company that has no liability insurance of its own.
>
> - (a) Until when is the distributor a named insured?
> - (b) Is a customer injured on April 10, 2026 by a forklift at the distributor's warehouse covered?
> - (c) Is a customer injured there on February 20, 2026, who sues in May, covered?
> - (d) Would the answer to (a) change if the manufacturer had instead bought a 50% interest in a joint venture?
>
> > [!answer]-
> > - The distributor qualifies, because the manufacturer owns a majority interest and no other similar insurance is available.
> > - Its coverage ends on $\min(\text{May } 30, 2026,\ \text{Jan } 1, 2027) = \text{May } 30, 2026$, the 90th day after March 1. Coverage after that date needs the distributor added to the policy.
> > - The April 10 injury is covered, because it occurred after the acquisition and within the 90 days. The forklift is mobile equipment, not an auto.
> > - The February 20 injury is not covered, because Coverage A does not apply to bodily injury that occurred before the acquisition, even though the suit came later.
> > - A joint venture would not qualify at all. Automatic coverage excludes partnerships, joint ventures and LLCs, and no one is an insured for the conduct of a joint venture not shown as a named insured.

> [!trap] Covering an insured's personal acts
> Spouses, partners, members, officers and stockholders are insureds only in their roles for the business. Their personal acts, such as a dog bite at home, are outside the CGL.
