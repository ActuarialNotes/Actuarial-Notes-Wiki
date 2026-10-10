---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:34a0231c9db40dbacec61069cdf974707f3af29e91c105ed3269b7f1f39da1f2
  sources:
    - "Rowland v. Christian, 69 Cal. 2d 108 (1968) (Caselaw Access Project), opinion text, sha256:6637138ee1290c3ab8819bc096f5e472c37adcfcee21300471aa2cc33b72398d — https://static.case.law/cal-2d/69/cases/0108-01.json"
    - "Demag v. Better Power Equipment, 2014 VT 78 (Vt. Supreme Court), pp.3-6, 10-11, sha256:e74830ed35c819710cc75a2f6dddfa11e62a058e9cdbe78b138129b13b4be43f — https://www.vtcourts.gov/media/4343"
    - "Tucker v. Sullivan, 307 Ark. 440 (1991), headnote 1 and Restatement s.332 quotation; licensee duty p.6, sha256:b256211bc2f79087a7eadd66b09be99fe0b33772ef89d0074b44c796221a25e3 — https://opinions.arcourts.gov/ark/supremecourt/en/264597/1/document.do"
    - "Cornell LII Wex, \"licensee\", whole entry, sha256:d86ad3f8db08b9ab3e11a6ae00eafc9fdae2ba189937012163de40632c97b36d — https://www.law.cornell.edu/wex/licensee"
    - "Cornell LII Wex, \"invitee\", whole entry, sha256:1e19ea6629325da9163cdd4b29730e43bc2419b0ab635ec5f9c3e899503a4c83 — https://www.law.cornell.edu/wex/invitee"
    - "Cornell LII Wex, \"attractive nuisance doctrine\", whole entry, sha256:14b9a76d9034736e1d4249572e7bf7fd8ce01093011f84c851c44c7403d1956a — https://www.law.cornell.edu/wex/attractive_nuisance_doctrine"
    - "Cornell LII Wex, \"trespass\", whole entry, sha256:15930f12119cc6a499137f69e35855f7a780e6f0e3de7f95942c31a35c3c86cc — https://www.law.cornell.edu/wex/trespass"
    - "Katko v. Briney, 183 N.W.2d 657 (Iowa 1971) (Caselaw Access Project), instructions 2, 5 and 6, sha256:db0baf0b78caa8615295b5b37ca669f9da0f03c07d1cc814470080147ca83c31 — https://static.case.law/nw2d/183/cases/0657-01.json"
    - "S.D. Codified Laws s.20-9-11.6 (known trespassers), full section, sha256:97e6c9fe1ee9edffd01b73813ada4e59db71cd36eb8165257748dcd896122dbe — https://sdlegislature.gov/api/Statutes/20-9-11.6.html?all=true"
    - "Sargent v. Ross, 113 N.H. 388 (1973) (Caselaw Access Project), landlord exceptions, Restatement ss.358-62, sha256:b07612aa291c0ae00e53ad4ba7df85cfd02d3584966480af9bb6404731c50f09 — https://static.case.law/nh/113/cases/0388-01.json"
    - "Wikipedia, \"Invitee\" (rank 3), scope of invitation paragraph, sha256:768ff583937f2cd6528372280b7c5f028e6c5a68ae57603de3e52257d0349f78 — https://en.wikipedia.org/wiki/Invitee"
    - "ISO CGL Coverage Form CG 00 01 04 13 (specimen copy), Coverage C insuring agreement and regardless-of-fault clause, p.8, sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Premises Liability.md
---

**Premises Liability** is the liability of a person who owns or occupies land for injuries that people suffer because of the condition of the land or the activities carried on there. Under the traditional common law, the care the occupier owes depends on why the injured person was on the land: an *invitee* is owed the most, a *licensee* less, and a *trespasser* the least. It is a branch of [[Negligence]] and the exposure insured by the premises part of a [[Commercial General Liability|CGL]] policy and by Section II of a [[Homeowners Policy|homeowners policy]].

> $$\text{Duty}(s) = \begin{cases} \text{inspect, repair, warn} & s = \text{invitee} \\ \text{warn of known hidden dangers} & s = \text{licensee} \\ \text{no willful or wanton harm} & s = \text{trespasser} \end{cases}$$

> $$R = \mathbf{1}\{\text{breach of Duty}(s)\} \times (1-p)\,D$$

- **Symbols:** $s$ is the entrant's legal status when injured, $\mathbf{1}\{\cdot\}$ equals 1 when the occupier fell short of the duty owed to that status and 0 otherwise, and $(1-p)\,D$ is the damages reduced by the entrant's own share of fault under comparative negligence. The same injury can therefore be worth something to one entrant and nothing to another.
- **Invitees:** An invitee is on the land for a purpose connected with the occupier's business (a *business invitee*, such as a store customer or a delivery driver) or on land held open to the public (a *public invitee*, such as a library patron). The occupier must use reasonable care to keep the premises safe, which includes inspecting to discover hazards and then repairing them or warning of them. An invitee who wanders beyond the area of the invitation, such as into a stockroom marked "Employees Only", can lose that status.
- **Licensees:** A licensee is on the land with the occupier's permission but for the licensee's own purposes. Social guests are licensees, even when invited to dinner, because the visit serves no business purpose of the host. The occupier must warn of dangerous conditions it knows about and the licensee is unlikely to discover, and must not injure the licensee through active negligence, but has no duty to inspect for unknown hazards.
- **Trespassers:** A trespasser enters without permission, and the occupier owes only a duty not to injure the trespasser willfully or wantonly, so an occupier may not set a spring gun or similar device to injure intruders: in *Katko v. Briney* (Iowa 1971) a landowner was held liable for wounding a burglar with a spring gun set to guard an unoccupied farmhouse, because such force is justified only against a trespasser committing a violent felony or endangering human life. Many states owe more to a trespasser the occupier knows about or should expect at a particular place, such as a path across a field that people regularly use, including a warning of known artificial conditions that could cause death or serious injury.
- **Attractive nuisance:** Children who trespass are protected by the attractive nuisance doctrine, stated in Restatement (Second) of Torts Section 339. The occupier is liable for an artificial condition, such as a swimming pool or an abandoned refrigerator, where it knows children are likely to trespass, the condition poses an unreasonable risk of death or serious harm, the children are too young to appreciate the risk, and the burden of removing the danger is slight compared with the risk.
- **Abolishing the categories:** Some states, starting with California's *Rowland v. Christian* (1968), have replaced the three categories with a single duty of reasonable care to everyone lawfully present or even to all entrants, and others have merged invitees and licensees. A question that names the traditional categories expects the traditional duties.
- **Landlords and tenants:** A tenant, as the occupier, generally owes the duties inside the leased premises. The landlord remains liable for common areas it controls (stairways, lobbies, parking lots), for latent defects it knew about and didn't disclose, for repairs it undertook and performed negligently, for premises leased for public admission, and in many states for violating housing codes. Leases usually shift some of this exposure with indemnity clauses and a requirement that the tenant name the landlord as an additional insured.
- **Insurance:** On a CGL form, injury arising from the premises falls under [[Premises and Operations Liability|premises and operations]] rather than the products-completed operations hazard. [[CGL Coverage C|Medical payments]] coverage pays a member of the public's medical expenses after an accident on the premises without anyone having to establish the occupier's duty or breach, which can settle small claims before they become negligence suits.

> [!example]- Four Entrants, One Broken Step {Example}
> A hardware store has a cracked step on the stairs to its basement stockroom, which the manager noticed a week ago and neither repaired nor marked. The stairs are behind a door marked "Staff Only". Four people fall on the step. Classify each and state the duty the store owed:
>
> 1. A customer who opened the door looking for a restroom.
> 2. A sales representative from a supplier, whom the manager took downstairs to look at stock.
> 3. The owner's friend, who came by after hours to borrow a tool and was sent down to get it.
> 4. A burglar who broke in at night.
>
> > [!answer]-
> > 1. **Customer:** The customer was an invitee in the shop, but the "Staff Only" door marked the limit of the invitation, so on the stairs the customer is treated as a licensee or, in a strict reading, a trespasser. As a licensee, the customer was owed a warning of the known crack, which the store didn't give, so the store is likely liable, subject to the customer's comparative fault for ignoring the sign.
> > 2. **Sales representative:** The visit served the store's business and was in an area the manager brought the representative into, so the representative is a business invitee. The store owed reasonable care to repair or warn of the crack it knew about, and breached it.
> > 3. **Friend:** A social visitor is a licensee even with permission. The crack was known to the store and not obvious on the stairs, so the store owed a warning and is liable for failing to give one.
> > 4. **Burglar:** The burglar was a trespasser owed only freedom from willful or wanton injury. An unrepaired step is not a trap set for intruders, so the store owes nothing.
> >
> > The same breach gives three of the four entrants a claim, and the classification, not the injury, decides which.

> [!example]- Landlord or Tenant? {Example}
> A tenant's guest falls twice in one visit. First, she trips on a loose stair tread in the building's common stairway, which the landlord had been told about a month earlier. Her damages are \$60,000, and she was 20% at fault for carrying a box that blocked her view. Later she slips on a rug the tenant left loose inside the apartment, with damages of \$8,000 and no fault of her own. The state uses pure comparative negligence. Who owes what?
>
> > [!answer]-
> > The common stairway is under the landlord's control, and the landlord knew of the hazard, so the landlord is liable for the first fall, reduced by her share of fault.
> > $$
> > \begin{align*}
> > R_{\text{landlord}} &= (1 - 0.20) \times \$60{,}000 \\
> > &= \$48{,}000
> > \end{align*}
> > $$
> > Inside the apartment the tenant is the occupier, and the guest, a social visitor, is a licensee. Whether the tenant owes the \$8,000 turns on whether the loose rug was a danger the tenant knew of and the guest was unlikely to notice. If so, the tenant's renters policy pays under its personal liability coverage. The landlord's own liability coverage, typically a CGL written for the building, pays the \$48,000, because the injury arose from a part of the premises the landlord controls rather than from the tenant's unit.

> [!tip]- How it appears on the exam
> - **DISC-IA:** The standard question names an entrant and asks for the duty owed, so most of the marks are in classifying the entrant correctly, especially social guests (licensees) and invitees who stray beyond the invitation. Other questions test the attractive nuisance elements and when a landlord rather than the tenant is liable.
> - **Coverage link:** A question may then ask which policy responds, such as a CGL for a business occupier, a homeowners or renters policy for a household, or medical payments coverage for a small no-fault claim.

> [!warning]- Exam traps
> - **Social guests are licensees:** An invited dinner guest feels like an invitee but is a licensee under the traditional rules, because the visit has no business purpose for the host. The host owes a warning of known hidden dangers but no inspection.
> - **Status can change on the premises:** An invitee who goes beyond the area of the invitation becomes a licensee or trespasser there. The duty is set by the status at the moment and place of the injury.
> - **Attractive nuisance needs every element:** The doctrine protects child trespassers from artificial conditions only. A natural pond, an older child who understands the risk, or a danger that would be very costly to remove usually falls outside it.
> - **The landlord isn't the occupier of the unit:** Inside leased premises the tenant ordinarily owes the duties. Landlord liability attaches through control of common areas, concealed latent defects, negligent repairs or statute, not through ownership alone.
> - **State variation:** Some states use a single reasonable-care standard for all lawful entrants. Apply the traditional categories unless the question says otherwise.
