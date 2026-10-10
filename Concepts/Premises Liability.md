---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:34a0231c9db40dbacec61069cdf974707f3af29e91c105ed3269b7f1f39da1f2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Premises Liability.md
---

**Premises Liability** is the liability of a person who owns or occupies land for injuries that people suffer because of the condition of the land or the activities carried on there. Under the traditional common law, the care the occupier owes depends on why the injured person was on the land: an *invitee* is owed the most, a *licensee* less, and a *trespasser* the least. It is a branch of [[Negligence]] and the exposure insured by the premises part of a [[Commercial General Liability|CGL]] policy and by Section II of a [[Homeowners Policy|homeowners policy]].

> $$\text{Duty}(s) = \begin{cases} \text{inspect, repair, warn} & s = \text{invitee} \\ \text{warn of known hidden dangers} & s = \text{licensee} \\ \text{no willful or wanton harm} & s = \text{trespasser} \end{cases}$$

> $$R = \mathbf{1}\{\text{breach of Duty}(s)\} \times (1-p)\,D$$

- **Symbols:** $s$ is the entrant's legal status when injured, $\mathbf{1}\{\cdot\}$ equals 1 when the occupier fell short of the duty owed to that status and 0 otherwise, and $(1-p)\,D$ is the damages reduced by the entrant's own share of fault under comparative negligence. The same injury can therefore be worth something to one entrant and nothing to another.
- **Invitees:** An invitee is on the land for a purpose connected with the occupier's business (a *business invitee*, such as a store customer or a delivery driver) or on land held open to the public (a *public invitee*, such as a library patron). The occupier must use reasonable care to keep the premises safe, which includes inspecting to discover hazards and then repairing them or warning of them. An invitee who wanders beyond the area of the invitation, such as into a stockroom marked "Employees Only", can lose that status.
- **Licensees:** A licensee is on the land with the occupier's permission but for the licensee's own purposes. Social guests are licensees, even when invited to dinner, because the visit serves no business purpose of the host. The occupier must warn of dangerous conditions it knows about and the licensee is unlikely to discover, and must not injure the licensee through active negligence, but has no duty to inspect for unknown hazards.
- **Trespassers:** A trespasser enters without permission, and the occupier owes only a duty not to injure the trespasser willfully or wantonly, so setting a trap or spring gun is never allowed. Many states owe more to a trespasser the occupier knows about or should expect at a particular place, such as a path across a field that people regularly use, including a warning of known artificial conditions that could cause death or serious injury.
- **Attractive nuisance:** Children who trespass are protected by the attractive nuisance doctrine, stated in Restatement (Second) of Torts Section 339. The occupier is liable for an artificial condition, such as a swimming pool or an abandoned refrigerator, where it knows children are likely to trespass, the condition poses an unreasonable risk of death or serious harm, the children are too young to appreciate the risk, and the burden of removing the danger is slight compared with the risk.
- **Abolishing the categories:** Some states, starting with California's *Rowland v. Christian* (1968), have replaced the three categories with a single duty of reasonable care to everyone lawfully present or even to all entrants, and others have merged invitees and licensees. A question that names the traditional categories expects the traditional duties.
- **Landlords and tenants:** A tenant, as the occupier, generally owes the duties inside the leased premises. The landlord remains liable for common areas it controls (stairways, lobbies, parking lots), for latent defects it knew about and didn't disclose, for repairs it undertook and performed negligently, for premises leased for public admission, and in many states for violating housing codes. Leases usually shift some of this exposure with indemnity clauses and a requirement that the tenant name the landlord as an additional insured.
- **Insurance:** On a CGL form, injury arising from the premises falls under [[Premises and Operations Liability|premises and operations]] rather than the products-completed operations hazard. [[Medical Payments Coverage|Medical payments]] coverage pays a member of the public's medical expenses after an accident on the premises without anyone having to establish the occupier's duty or breach, which can settle small claims before they become negligence suits.

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
