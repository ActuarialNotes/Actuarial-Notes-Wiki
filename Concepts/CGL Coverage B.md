---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0f2571bbb0dec31265441cd5be8a7118d2ed2e357847f72074ead5615dc4ef04
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/CGL Coverage B.md
---

**CGL Coverage B** is the personal and advertising injury liability coverage of the ISO [[Commercial General Liability|Commercial General Liability Coverage Form]] (CG 00 01, 04 13 edition). It pays the damages an insured becomes legally obligated to pay because of "personal and advertising injury", meaning injury arising from a listed set of offenses such as false arrest, libel or using another's advertising idea, and it defends suits seeking those damages, provided the offense arises out of the named insured's business and is committed in the coverage territory during the policy period.

> $$t_0 \le t_{\text{offense}} \le t_1$$

> $$\text{Paid}_j = \min\left(D_j,\ L_{\text{PAI}}\right)$$

> $$\sum_j \text{Paid}_j \le G$$

- **Symbols:** $t_0$ and $t_1$ are the start and end of the policy period and $t_{\text{offense}}$ is when the offense is committed. $D_j$ is the damages because of all personal and advertising injury sustained by person or organization $j$, $L_{\text{PAI}}$ is the Personal and Advertising Injury limit, and $G$ is what remains of the general aggregate, which Coverage B payments reduce ([[CGL Limits of Insurance]]).
- **Insuring agreement:** The insurer pays damages because of personal and advertising injury to which the insurance applies and has the right and duty to defend a suit seeking them, but no duty to defend a suit to which the insurance doesn't apply. It may investigate any offense and settle at its discretion. The amount it pays is limited by Section III, and its right and duty to defend end once the applicable limit is used up in judgments or settlements under Coverages A or B or medical expenses under Coverage C. Other costs are covered only as [[CGL Supplementary Payments|supplementary payments]].
- **The trigger is the offense:** The insurance applies only to injury caused by an offense arising out of the named insured's business, committed in the coverage territory during the policy period. The date of the offense controls, not the date of the injury or the claim, which is the main structural difference from [[CGL Coverage A Insuring Agreement|Coverage A]].
- **The seven offenses:** "Personal and advertising injury" is injury, including consequential bodily injury, arising out of (a) false arrest, detention or imprisonment; (b) malicious prosecution; (c) wrongful eviction from, wrongful entry into, or invasion of the right of private occupancy of a room, dwelling or premises a person occupies, committed by or for its owner, landlord or lessor; (d) oral or written publication of material that slanders or libels a person or organization or disparages its goods, products or services; (e) oral or written publication of material that violates a person's right of privacy; (f) using another's advertising idea in the named insured's "advertisement"; and (g) infringing another's copyright, trade dress or slogan in its advertisement. An injury that isn't one of these offenses isn't covered by Coverage B.
- **Advertisement:** An "advertisement" is a notice broadcast or published to the general public or specific market segments about the named insured's goods, products or services to attract customers or supporters. Material on the Internet counts, but only the part of a website about the insured's goods or services for that purpose is an advertisement.
- **Exclusions a to h:** Coverage B does not apply to injury (a) caused by or at the direction of the insured knowing the act would violate another's rights and inflict the injury; (b) from publishing material the insured knew was false; (c) from material first published before the policy period began; (d) from a criminal act committed by or at the direction of the insured; (e) for which the insured assumed liability in a contract, except liability it would have without the contract; (f) from a breach of contract, except an implied contract to use another's advertising idea in the insured's advertisement; (g) from goods, products or services failing to conform to a statement of quality or performance in the insured's advertisement; or (h) from a wrong description of the price of goods, products or services in its advertisement.
- **Exclusions i to p:** It also does not apply to injury (i) from infringing a copyright, patent, trademark, trade secret or other intellectual property right, except infringement of copyright, trade dress or slogan in the insured's advertisement (and using another's advertising idea is not an intellectual property right for this purpose); (j) committed by an insured whose business is advertising, broadcasting, publishing or telecasting, designing or determining website content for others, or providing Internet search, access, content or service, except for offenses a to c (false arrest, malicious prosecution, wrongful eviction), and placing frames, borders, links or advertising on the Internet is not by itself such a business; (k) from an electronic chatroom or bulletin board the insured hosts, owns or controls; (l) from unauthorized use of another's name or product in the insured's e-mail address, domain name or metatag, or similar tactics to mislead another's potential customers; (m) from the discharge or escape of pollutants at any time; (n) from government-ordered pollution testing or cleanup, or a governmental suit for those costs; (o) from war, warlike action or insurrection; and (p) from violations of the Telephone Consumer Protection Act, the CAN-SPAM Act of 2003, the Fair Credit Reporting Act or any similar law limiting the distribution of material or information.
- **Bodily injury from an offense:** Coverage A's exclusion o removes bodily injury arising out of personal and advertising injury, so consequential bodily injury from, say, a false arrest is paid under Coverage B and its limit ([[CGL Coverage A Exclusions]]).
- **Its own limit:** The Personal and Advertising Injury limit is the most paid for all personal and advertising injury sustained by any one person or organization, subject to the general aggregate. No each occurrence limit applies, because Coverage B responds to offenses rather than occurrences.

> [!example]- A Store Detective's Mistake {Example}
> A supermarket's security guard, an employee acting within his duties, wrongly detains a customer for an hour on suspicion of shoplifting. The customer faints during the detention and hits her head, and she sues the supermarket for false imprisonment and for her head injury. Under which coverage of the supermarket's CGL does each part fall?
>
> > [!answer]-
> > False detention is offense (a) in the definition of personal and advertising injury, committed during the policy period and arising out of the supermarket's business, so it falls under Coverage B. Her head injury is bodily injury, but it arose out of the personal and advertising injury, so Coverage A's exclusion o removes it from Coverage A. The definition includes consequential bodily injury, so Coverage B covers both parts under the Personal and Advertising Injury limit. Exclusion a would apply only if the guard acted knowing the detention would violate her rights and inflict injury.

> [!example]- Four Advertising Claims {Example}
> A sporting goods retailer runs a television campaign during the policy period. Four suits follow: (a) a competitor alleges the campaign uses its well-known slogan; (b) another company alleges the retailer's new product design infringes its patent; (c) a customer alleges the advertised "waterproof" jacket leaks; (d) a former employee alleges the retailer published her photograph in the advertisement without consent. Which are covered under Coverage B?
>
> > [!answer]-
> > - **(a) Covered:** Infringing another's slogan in the insured's advertisement is offense (g), and the intellectual property exclusion gives back infringement of copyright, trade dress or slogan in the insured's advertisement.
> > - **(b) Not covered:** Patent infringement is not one of the seven offenses, and exclusion i removes it in any case.
> > - **(c) Not covered:** Exclusion g removes injury from goods failing to conform to a statement of quality or performance in the advertisement.
> > - **(d) Covered:** Publishing material that violates a person's right of privacy is offense (e).

> [!example]- Applying the Per-Person Limit {Example}
> A newspaper publisher's CGL policy, which carries no media endorsement, has a \$1,000,000 Personal and Advertising Injury limit and a \$2,000,000 general aggregate. Its in-house security guard falsely detains a visitor, who recovers \$1,300,000. Separately, a landlord subsidiary named on the policy wrongfully evicts a tenant, who recovers \$400,000. What does Coverage B pay?
>
> > [!answer]-
> > The publisher's business is publishing, so exclusion j applies to it, but that exclusion does not apply to offenses a to c: false arrest, malicious prosecution and wrongful eviction. Both claims are therefore covered, each capped at the per-person limit.
> > $$
> > \begin{align*}
> > \text{Paid}_1 &= \min(1{,}300{,}000,\ 1{,}000{,}000) \\
> > &= 1{,}000{,}000 \\
> > \text{Paid}_2 &= \min(400{,}000,\ 1{,}000{,}000) \\
> > &= 400{,}000
> > \end{align*}
> > $$
> > The insurer pays \$1,400,000, which leaves \$600,000 of the general aggregate, and the publisher bears \$300,000. A libel claim against the newspaper's content would be excluded by exclusion j.

> [!tip]- How it appears on the exam
> - **DISC-IA:** Section 10's Coverage B objective asks whether a claim is one of the listed offenses, whether the offense was committed during the policy period, and whether an exclusion (knowledge of falsity, prior publication, breach of contract, intellectual property, media businesses) removes it.
> - **Contrast with Coverage A:** Questions contrast the offense trigger with the occurrence trigger, and the per-person limit with the each occurrence limit.

> [!warning]- Exam traps
> - **Offense, not accident:** Coverage B covers listed offenses, several of them intentional acts such as an eviction. What it excludes is acting with knowledge that the act would violate another's rights, or publishing with knowledge of falsity.
> - **First publication date:** Material first published before the policy period is excluded even if it is republished during it.
> - **Intellectual property:** Copyright, trade dress and slogan infringement in the insured's advertisement is covered; patent, trademark and trade secret infringement are not.
> - **Media businesses keep three offenses:** A publisher or Internet business loses Coverage B for most offenses but keeps false arrest, malicious prosecution and wrongful eviction.
> - **No each occurrence limit:** Coverage B is capped per person or organization by the Personal and Advertising Injury limit and reduces the general aggregate, not the products-completed operations aggregate.
