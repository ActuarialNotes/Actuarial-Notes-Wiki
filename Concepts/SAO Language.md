---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e404a473a27af8547bcca0c6e852a73605025a0bc42bf1c096f83f074d245d1f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/SAO Language.md
---

**SAO Language** is the prescribed structure and wording of the U.S. property-casualty **Statement of Actuarial Opinion** under the NAIC Annual Statement Instructions and ASOP No. 36: four clearly designated sections — **Identification, Scope, Opinion and Relevant Comments** — supported by Exhibit A (what is opined on) and Exhibit B (disclosures), with the opinion taking one of five types.

> $$\text{Type} = \begin{cases} \text{Reasonable (R)} & L \le C \le H \\ \text{Deficient or inadequate (I)} & C < L \\ \text{Redundant or excessive (E)} & C > H \end{cases}$$

> $$\text{Significant RMAD if } C + M \le H$$

- **Symbols and the other two types.** $C$ is the carried reserve, $[L, H]$ the actuary's range of reasonable estimates and $M$ the materiality standard. An inadequate opinion discloses the minimum reasonable amount, an excessive one the maximum. **Qualified (Q)**: reasonable *except for* named items that cannot be reasonably estimated or on which the actuary cannot opine — unnecessary if they are unlikely to be material. **No opinion (N)**: deficiencies in data, analyses or assumptions prevent a conclusion, and the reasons are stated. The type is coded in Exhibit B.
- **Identification** — who is opining: relationship to the company (employee or consultant), qualifications, date of appointment, and that the **board of directors** made the appointment. An actuary approved by the Academy's Casualty Practice Council or by the commissioner attaches the approval letter each year.
- **Scope** — what was examined, in a sentence such as: "I have examined the actuarial assumptions and methods used in determining reserves listed in Exhibit A, as shown in the Annual Statement of the Company as prepared for filing with state regulatory officials, as of December 31, 20__, and reviewed information provided to me through XXX date." A data paragraph names who prepared the data (name and title) and states that it was evaluated for reasonableness and consistency and that the data used was reconciled to [[Schedule P]], Part 1. Exhibit A lists the items and amounts, net and direct-and-assumed.
- **Opinion** — at least: "In my opinion, the amounts carried in Exhibit A on account of the items identified: A. Meet the requirements of the insurance laws of (state of domicile). B. Are computed in accordance with accepted actuarial standards. C. Make a reasonable provision for all unpaid loss and loss adjustment expense obligations of the Company under the terms of its contracts and agreements." Another actuary relied on for a material portion of the reserves is named here, with credential and affiliation.
- **Relevant Comments** — company-specific risk factors, not generic lists of economic, judicial or social risks; **RMAD**, giving the materiality standard, its basis, its dollar amount and an explicit yes or no; the significance of Exhibit B items ([[Salvage and Subrogation|salvage and subrogation]], [[Loss Reserve Discounting|discount]], [[Asbestos|asbestos]] and environmental reserves, claims-made extended reporting reserves); reinsurance collectability, retroactive and financial reinsurance; unusual reserve [[IRIS Ratios]]; changes in methods or assumptions; and the assurance that the [[Actuarial Report]] and workpapers are kept for seven years.
- **Around it.** The Academy's annual COPLFR practice note supplies illustrative wording ([[American Academy of Actuaries]]); the confidential numbers go in the [[Actuarial Opinion Summary]]. The Canadian [[Statement of Actuarial Opinion]] uses a different vocabulary — unqualified, qualified, adverse, denial.

> [!example]- Choosing the Opinion Type and the RMAD Answer {Example}
> Statutory surplus is \$300 million and the materiality standard is $10\%$ of surplus. The actuary's range for net loss and LAE reserves is \$395 million to \$450 million. Give the opinion type and the RMAD conclusion if the company carries (a) \$430 million, (b) \$405 million, (c) \$385 million.
>
> > [!answer]-
> > $$M = 0.10 \times 300 = 30$$
> >
> > **(a)** $395 \le 430 \le 450$: **Reasonable (R)**. $C + M = 460 > 450$, so the ASOP No. 36 test is not triggered. She may still find significant RMAD on qualitative grounds, and must state her conclusion either way.
> >
> > **(b)** $395 \le 405 \le 450$: **Reasonable (R)**. $C + M = 435 \le 450$: an outcome worse than carried by more than the materiality standard is itself a reasonable estimate, so **significant RMAD exists** — "Yes" in Exhibit B, with the factors explained.
> >
> > **(c)** $385 < 395$: **Deficient or inadequate (I)**. The opinion says the carried amount does not make a reasonable provision and discloses the minimum reasonable amount, \$395 million. With $C + M = 415$ inside the range, RMAD is "Yes" as well.
> >
> > One range, three opinions: the type turns on where management carries the reserve, not only on the actuary's analysis.

> [!example]- Critique and Redraft an Opinion {Example}
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
> Identify the deficiencies and redraft the weakest paragraphs.
>
> > [!answer]-
> > - **Identification.** The CFO cannot make the appointment: it must be the board of directors (or a committee reporting to it), and the paragraph must say so, give the date and state her qualifications. Her relationship, consultant, is correctly given.
> > - **Scope.** Missing the prescribed sentence (assumptions and methods examined, Exhibit A, the Annual Statement as prepared for filing, the date through which information was reviewed) and the data paragraph — who prepared the data, that it was tested for reasonableness and consistency, and that it was reconciled to Schedule P, Part 1.
> > - **Opinion.** "Reasonable" is a conclusion without its content. It must cover Texas law, accepted actuarial standards and reasonable provision for all unpaid loss and LAE obligations under the Company's contracts and agreements.
> > - **Relevant Comments.** It is the generic risk list the instructions exclude. Missing: company-specific risks, RMAD, Exhibit B items, reinsurance, IRIS ratios, changes in methods, and the Actuarial Report assurance.
> >
> > *Identification, redrafted:* "I, Jane Doe, am a consulting actuary with ABC Actuaries and a Fellow of the Casualty Actuarial Society. I was appointed by the Board of Directors of XYZ Insurance Company (the Company) on November 12, 2025 to render this opinion. I meet the requirements of a Qualified Actuary set out in the NAIC Annual Statement Instructions."
> >
> > *RMAD, drafted:* "The materiality standard I have used is \$30 million, 10% of the Company's statutory surplus, a level I consider relevant to the regulators who rely on this opinion. I believe there are significant risks and uncertainties that could result in material adverse deviation in the Company's reserves. The principal risk is its concentration in long-haul trucking liability, where severity on recent accident years has been rising faster than assumed."
