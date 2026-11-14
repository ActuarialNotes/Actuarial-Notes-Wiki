---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f8f78fc54eb274a53571b87e252429cb8db9a437225a2d8555efcdd093c5d4b8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/SAO Language.md
---

**SAO Language** is the prescribed structure and wording of the U.S. property-casualty Statement of Actuarial Opinion under the NAIC Annual Statement Instructions and ASOP No. 36. Exhibit A lists what is opined on, and Exhibit B holds the disclosures.

The opinion has four clearly designated sections:

1. **Identification**: who is opining, and who appointed them.
2. **Scope**: what was examined, and the data used.
3. **Opinion**: the conclusion on the amounts in Exhibit A.
4. **Relevant Comments**: the company-specific risks and disclosures behind the conclusion.

The [[American Academy of Actuaries]]' annual COPLFR practice note offers illustrative wording. The confidential numbers go in the [[Actuarial Opinion Summary]]. The Canadian [[Statement of Actuarial Opinion]] speaks of unqualified, qualified, adverse and denied opinions instead.

## Identification

The Identification paragraph gives the actuary's relationship to the company (employee or consultant), their qualifications and the date of appointment, and states that the **board of directors** made the appointment. If the actuary was approved by the Academy's Casualty Practice Council or by the commissioner, the company attaches the approval letter each year and this paragraph refers to it.

## Scope

The Scope paragraph states what was examined, in a sentence such as: "I have examined the actuarial assumptions and methods used in determining reserves listed in Exhibit A, as shown in the Annual Statement of the Company as prepared for filing with state regulatory officials, as of December 31, 20__, and reviewed information provided to me through XXX date."

A data paragraph names who prepared the data (name and title). It states that the data was evaluated for reasonableness and consistency, and that the data used was reconciled to [[Schedule P]], Part 1. Exhibit A lists the items and amounts, net and direct-and-assumed.

## Opinion

The Opinion paragraph says at least: "In my opinion, the amounts carried in Exhibit A on account of the items identified: A. Meet the requirements of the insurance laws of (state of domicile). B. Are computed in accordance with accepted actuarial standards. C. Make a reasonable provision for all unpaid loss and loss adjustment expense obligations of the Company under the terms of its contracts and agreements." Another actuary relied on for a material portion of the reserves is named here, with credential and affiliation.

The opinion takes one of five types, coded in Exhibit B. With $C$ the carried reserve and $[L, H]$ the actuary's range of reasonable estimates, the type is

> $$\text{Type} = \begin{cases} \text{Reasonable (R)} & L \le C \le H \\ \text{Deficient or inadequate (I)} & C < L \\ \text{Redundant or excessive (E)} & C > H \end{cases}$$

An inadequate opinion discloses the minimum reasonable amount, and an excessive one the maximum. The other two types are:

- **Qualified (Q)**: reasonable *except for* named items that cannot be reasonably estimated or on which the actuary cannot opine. A qualification is unnecessary if the items are unlikely to be material.
- **No opinion (N)**: deficiencies in data, analyses or assumptions prevent a conclusion, and the reasons are stated.

## Relevant Comments

The Relevant Comments cover company-specific risk factors, not generic lists of economic, judicial or social risks. They also cover the significance of Exhibit B items ([[Salvage and Subrogation|salvage and subrogation]], [[Loss Reserve Discounting|discount]], [[Asbestos|asbestos]] and environmental reserves, claims-made extended reporting reserves), reinsurance collectability, retroactive and financial reinsurance, unusual reserve [[IRIS Ratios]], and changes in methods or assumptions. They give the assurance that the [[Actuarial Report]] and workpapers are kept for seven years.

They must address the **risk of material adverse deviation** (RMAD), giving the materiality standard $M$, its basis, its dollar amount and an explicit yes or no. Under the ASOP No. 36 test, significant RMAD exists when

> $$C + M \le H$$

The actuary may still find significant RMAD on qualitative grounds when the test is not met, and must state the conclusion either way.

> [!example]- What opinion type and RMAD conclusion apply at each carried reserve? {Example}
> Statutory surplus is $\$300$ million and the materiality standard is $10\%$ of surplus. The actuary's range for net loss and LAE reserves is $\$395$ million to $\$450$ million. The company could carry (a) $\$430$ million, (b) $\$405$ million or (c) $\$385$ million.
>
> > [!answer]-
> > - The materiality standard is $M = 0.10 \times 300 = \$30$ million.
> > - (a) $395 \le 430 \le 450$, so the opinion is **Reasonable (R)**. $C + M = 460 > 450$, so the ASOP No. 36 test is not met, and the actuary states her RMAD conclusion on qualitative grounds.
> > - (b) $395 \le 405 \le 450$, so the opinion is **Reasonable (R)**. $C + M = 435 \le 450$, so **significant RMAD exists**: "Yes" in Exhibit B, with the factors explained.
> > - (c) $385 < 395$, so the opinion is **Deficient or inadequate (I)**, disclosing the minimum reasonable amount, $\$395$ million. $C + M = 415 \le 450$, so RMAD is "Yes" as well.

> [!example]- What is wrong with this draft opinion, and how should its weakest paragraphs read? {Example}
> A consultant's draft for a Texas-domiciled insurer reads:
>
> **Identification.** "I, Jane Doe, am a consultant with ABC Actuaries and a Fellow of the Casualty Actuarial Society. I was engaged by the Company's Chief Financial Officer to render this opinion."
>
> **Scope.** "I have reviewed the Company's loss reserves as of December 31, 2025, using data provided by the Company."
>
> **Opinion.** "In my opinion, the Company's reserves are reasonable."
>
> **Relevant Comments.** "Reserve estimates are subject to uncertainty from economic, judicial, regulatory and social factors, and actual results may differ."
>
> > [!answer]-
> > - The CFO cannot make the appointment. It must be the board (or a committee reporting to it), and the Identification paragraph must say so, give the date and state her qualifications.
> > - The Scope paragraph lacks the prescribed sentence (assumptions and methods, Exhibit A, the review-through date). It also lacks the data paragraph: who prepared the data, its testing for reasonableness and consistency, and reconciliation to Schedule P, Part 1.
> > - "Reasonable" is a conclusion without its content. The Opinion paragraph must cover Texas law, accepted actuarial standards and reasonable provision for all unpaid loss and LAE obligations under the Company's contracts and agreements.
> > - The Relevant Comments are the generic risk list the instructions exclude, and everything required is missing, starting with RMAD.
> > - Identification, redrafted: "I, Jane Doe, am a consulting actuary with ABC Actuaries and a Fellow of the Casualty Actuarial Society. I was appointed by the Board of Directors of XYZ Insurance Company (the Company) on November 12, 2025 to render this opinion. I meet the requirements of a Qualified Actuary set out in the NAIC Annual Statement Instructions."
> > - RMAD, drafted: "The materiality standard I have used is \$30 million, 10% of the Company's statutory surplus, a level relevant to the regulators who rely on this opinion. I believe there are significant risks and uncertainties that could result in material adverse deviation in the Company's reserves. The principal risk is its concentration in long-haul trucking liability, where severity on recent accident years has been rising faster than assumed."

> [!trap] Treating a reasonable opinion as no RMAD
> The opinion type and the RMAD conclusion are separate answers. A carried reserve of $\$405$ million inside a $\$395$–$\$450$ million range is Reasonable, yet with a $\$30$ million materiality standard $C + M = 435 \le 450$, so significant RMAD exists.
