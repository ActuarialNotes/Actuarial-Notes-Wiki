---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:d1ef3613db33356bf7391918dee81a484405102c576fb40b7fb067a38ea399a0
  sources:
    - "ISO CP 10 10 10 12 Causes of Loss – Basic Form, A.1-11 covered causes; B.1.a-h exclusions with lead-in; B.1.b earth movement fire exception, sha256:14aea49e74f393f8370fa78a89f12e99a9f4927dc704bd386fc7e41a9223f5b4 — https://forms.nationwideexcessandsurplus.com/FormsExternal/ContractForm?num=CP+10+10&ed=10-12"
    - "ISO CP 10 20 10 12 Causes of Loss – Broad Form, A.12-14; Additional Coverage – Collapse, sha256:fde6a92d0aabc909a84622d0588db0ac570c564ced0c056fa7efbcb454768207 — https://forms.nationwideexcessandsurplus.com/FormsExternal/ContractForm?num=CP+10+20&ed=10-12"
    - "ISO CP 10 30 10 12 Causes of Loss – Special Form, A; B.2.d, B.2.h; C.1.c; C.3 theft special limits, sha256:119fcd978212db836e1084ca8ca90c0fdacb60d157caf4867bbc7b4e02f498e3 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2018/09/CP.10.30.10.12-1-1.pdf"
    - "ISO HO 00 03 05 11 Homeowners 3 – Special Form (Maine BOI copy), Section I Perils Insured Against B.1-16; Exclusion A.2 earth movement fire/explosion/theft exception, sha256:ac539e500a5767946452d1e6ad4c4b7dcc395c6c65c48fc3a8ac92a7c330a1d4 — https://www.maine.gov/pfr/insurance/sites/maine.gov.pfr.insurance/files/inline-files/ho00-03-05-11-homeowners3-special-form.pdf"
    - "IRMI Glossary, 'open perils', entry, sha256:e3325a9af88920cc1c7453f4e8e9e9a647ed89f923594177217aca2c8c7ea454 — https://www.irmi.com/term/insurance-definitions/open-perils"
    - "Property Insurance Coverage Law Blog, 'Who Has the Burden to Prove the Cause of Property Damage?', entry, sha256:6cf6c6de018f1ee9594d8a4b20f5493fe11148d46a9685b29f575ffce964e44f — https://www.propertyinsurancecoveragelaw.com/blog/who-has-the-burden-to-prove-the-cause-of-property-damage-those-burdens-of-proof-can-switch/"
    - "HUB International Insurance Glossary, 'All risks insurance' (burden of proof), Burden of Proof, sha256:14c2714c17163b29db7709239c0a40cd0e8342868849b62f2d6fa82e0d4ae3e2 — https://www.hubinternational.com/insurance-glossary/a/all-risks-insurance/"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Causes of Loss.md
---

A **cause of loss**, or peril, is what produces a loss, such as fire, windstorm, theft or flood. A property policy states which causes of loss it covers in one of two ways. A named perils policy lists the perils it covers, and an open perils policy covers every risk of direct physical loss that it doesn't exclude. The ISO commercial property program puts the choice in a separate causes of loss form, basic, broad or special, which is attached to a coverage form such as the [[Building and Personal Property Coverage Form|building and personal property coverage form]].

> $$\text{Named: covered} \iff c \in N \ \text{and}\ c \notin E$$

> $$\text{Open: covered} \iff c \notin E$$

> $$E[L] = \sum_c f_c \times s_c$$

- **Symbols:** $c$ is the cause of a loss, $N$ is the list of named perils and $E$ is the set of excluded causes. In the third block, $f_c$ and $s_c$ are the expected frequency and severity of losses from peril $c$, so $E[L]$ is the expected loss from all perils together, which is how an underwriter sizes a [[Property Loss Exposure|property loss exposure]].
- **Burden of proof:** Under named perils the insured must show that a listed peril caused the loss. Under open perils the loss is covered unless the insurer shows that an exclusion applies, which is a large part of the open perils form's value to the insured.
- **Basic form:** The basic form covers fire, lightning, explosion, windstorm or hail, smoke, aircraft or vehicles, riot or civil commotion, vandalism, sprinkler leakage, sinkhole collapse and volcanic action.
- **Broad form:** The broad form adds falling objects, the weight of snow, ice or sleet, and water damage from the accidental discharge of water or steam from a plumbing, heating or air conditioning system or appliance. It also adds an additional coverage for collapse.
- **Special form:** The special form covers risks of direct physical loss unless excluded or limited, so it covers theft and other perils no list names. It adds exclusions for causes that are gradual or within the insured's control, such as wear and tear, rust, settling, mechanical breakdown, insects, and dishonest acts of the insured or its employees. It also caps theft of items such as furs and jewelry.
- **Exclusions in every form:** All three forms exclude ordinance or law, earth movement, governmental action, nuclear hazard, utility service failure, war, water (flood, surface water, sewer backup and underground water) and fungus or rot. The exclusions apply whatever other cause contributes to the loss, concurrently or in sequence. Many carry an exception for an ensuing loss, so fire that follows an earthquake is covered even though the earthquake damage is not.
- **Homeowners perils:** The HO-3 covers the dwelling and other structures on an open perils basis. Personal property is covered for sixteen named perils: fire or lightning, windstorm or hail, explosion, riot or civil commotion, aircraft, vehicles, smoke, vandalism, theft, falling objects, the weight of ice, snow or sleet, accidental discharge of water or steam, sudden tearing apart of a heating or water system, freezing, sudden damage from artificially generated electrical current, and volcanic eruption ([[Homeowners Policy]]).
- **The forms in depth:** Each peril's definition, every exclusion and the additional coverages are worked through on [[Causes of Loss Basic and Broad Forms]] and [[Causes of Loss Special Form]].
- **Commercial property underwriting:** Fire is the cause of loss that dominates commercial property underwriting, judged by the building's construction, its occupancy, its fire protection and the hazards next door. Windstorm, hail, flood and earthquake are catastrophe perils, evaluated by location and by how much value is concentrated in one area ([[Catastrophe Risk]]). Theft, water damage and collapse depend on the occupancy, the property's condition and its security. [[Flood Insurance|Flood]] and earthquake are usually insured separately.

> [!example]- Five Losses Under Three Forms {Example}
> A retail store has five losses in a year: a \$40,000 fire, a \$25,000 roof collapse from the weight of snow, \$8,000 of water damage from a burst water heater, a \$15,000 burglary of inventory, and \$60,000 of damage when a nearby river floods the store. Ignoring deductibles and limits, how much is covered under the basic, broad and special causes of loss forms?
>
> > [!answer]-
> > Fire is a basic peril. The broad form adds the weight of snow and the accidental discharge of water. Only the special form covers theft, because no list names it. Flood is excluded under all three.
> > $$
> > \begin{align*}
> > \text{Basic} &= 40{,}000 \\
> > \text{Broad} &= 40{,}000 + 25{,}000 + 8{,}000 \\
> > &= 73{,}000 \\
> > \text{Special} &= 73{,}000 + 15{,}000 \\
> > &= 88{,}000
> > \end{align*}
> > $$
> > The \$60,000 flood loss is uninsured under every form. The store would need flood insurance to cover it.

> [!example]- Fire After an Earthquake {Example}
> An earthquake shakes a house insured under an HO-3 with a \$1,000 deductible, causing \$50,000 of structural damage. It also ruptures a gas line, and the fire that follows causes \$180,000 of damage to the dwelling. The homeowner has no earthquake endorsement. What does the insurer pay?
>
> > [!answer]-
> > Earth movement is excluded, but the exclusion has an exception for direct loss by an ensuing fire, so the fire damage is covered and the shaking damage is not.
> > $$
> > \begin{align*}
> > \text{Payment} &= 180{,}000 - 1{,}000 \\
> > &= 179{,}000
> > \end{align*}
> > $$
> > The homeowner bears the \$50,000 of earthquake damage. The ensuing loss exception keeps the earthquake exclusion from also removing the fire, which the policy would cover from any other cause.

> [!tip]- How it appears on the exam
> - **DISC-IA:** Questions give a commercial property loss and ask whether the basic, broad or special causes of loss form covers it, which exclusions apply, and how the special form's limitations affect the payment. The homeowners version asks whether the HO-3 Section I perils insured against cover a loss to the dwelling or to the personal property.
> - **DISC-RM:** The underwriting questions ask which causes of loss threaten a commercial property and how an underwriter evaluates each, with fire, windstorm, flood and earthquake the usual examples.

> [!warning]- Exam traps
> - **Theft is special form only:** Neither the basic nor the broad form lists theft, so burglary of a building's contents is covered only under the special form. Vandalism is named in all three, but a theft is not vandalism.
> - **Open perils is not all risks:** The special form covers only what it doesn't exclude, and its exclusions are long. A flood or earthquake loss is excluded under every form, open perils included.
> - **Ensuing loss:** An excluded cause doesn't exclude a covered peril that follows it. Denying the fire after an earthquake treats the exclusion as broader than its own exception.
> - **HO-3 contents:** The dwelling is open perils but the contents are named perils. A loss covered for the dwelling, such as paint spilled by a guest, may not be covered for the furniture it ruins.
