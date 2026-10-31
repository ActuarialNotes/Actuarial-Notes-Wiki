---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:8e42575eed60aaf34ff2ae4d440acc232e58633ef8fe98b70fe0428aa5a9608f
  sources:
    - "Davidson, The Cap on Non-Pecuniary General Damages (CAS Exam 6C reading), pp. 1-5 (the 1978 trilogy and the non-pecuniary cap), sha256:9b544951d4a031e08f3c40a9a30b552764f705bc09a7a6ea2af3d57e5907149f — https://www.casact.org/sites/default/files/2021-03/6C_Davidson.pdf"
    - "Cappelletti, Tort Law: Topics for General Insurance Actuaries (SOA GI-201 study note, rev. May 2025), PDF pp. 5, 8, 10-15, 31, 33, 60-66 (printed pp. 3, 6, 8-13, 29, 31, 58-64), sha256:5316698581bb73d51dbcfb9a74ea92254fed6fc2b018253e2b26abc346ca2a6f — https://www.soa.org/globalassets/assets/files/edu/2025/fall/study-note/2025-11-gi-201-study-note-tort-law.pdf"
    - "Automobile Insurance Advisory Committee, Report on Fundamental Reform of the Alberta Automobile Insurance Compensation System (2020; CAS Exam 6C reading), pp. 52, 55, 73-78, 85-86, 184-188, 192, sha256:2fb0e97ad65126b5f2bcd44abf9f1215a21f2240dc2be147e9df66f86e8a163e — https://www.casact.org/sites/default/files/2021-05/6C_Alberta_Auto_Reform.pdf"
    - "Marshall, Fair Benefits Fairly Delivered: A Review of the Auto Insurance System in Ontario (2017; CAS Exam 6C reading), pp. 8, 11, 15, 46, 71-73, sha256:326913d5117f8dc2cc937a10f31f2d6fa712b509e040cd63220c2a8843b9d8fc — https://www.casact.org/sites/default/files/2021-03/6C_Marshall.pdf"
    - "Harris, Tort Reform Tension (Canadian Underwriter, 2005; CAS Exam 6C reading to Fall 2025), pp. 1-5 (text layer font-shifted by +29; decoded), sha256:a3ce120729ed687d0ef2fff8beb0f2228250c9bc869e4151d9669c134fac35d7 — https://www.casact.org/sites/default/files/2021-03/6C_Harris.pdf"
    - "British Columbia, Negligence Act, RSBC 1996 c. 333, s. 1 (apportionment of liability), sha256:60a11965a28bea6404152e1f5e4f300f4f61a1583f5f29e597e6677a735e34b2 — https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/96333_01"
    - "Alberta, Contributory Negligence Act, RSA 2000 c. C-27, ss. 1-2 (apportionment of liability), sha256:29bb28f7ffd94841f33d8678e4ec7aa827cd42832e4d87aceba4725bbab00bfe — https://kings-printer.alberta.ca/documents/Acts/C27.pdf"
    - "British Columbia, Law and Equity Act, RSBC 1996 c. 253, s. 56 (discount rates), sha256:fe5fbf9f78fd1eba8ba3f454bea9eefb0d960f6209f195dc77074bc352acb4bf — https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/96253_01"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Tort Litigation.md
---

**Tort Litigation** is the civil action by which an injured person recovers damages from the person whose negligence caused the injury. It is the compensation mechanism that liability insurance responds to, and its cost, duration and unpredictability are the reason Canadian provinces have progressively replaced parts of it with [[No-Fault Insurance|no-fault]] benefits.

> $$\text{Damages} = \underbrace{\text{Pecuniary}}_{\text{income, care, cost}} + \underbrace{\text{Non-pecuniary}}_{\text{pain and suffering}}$$

- **What must be proved:** a duty of care, breach of the standard of care, causation, and damages. Failure on any element defeats the claim entirely.
- **Contributory negligence** apportions the loss: a plaintiff $30\%$ responsible for their own injury recovers $70\%$ of assessed damages. Canada uses apportionment.
- **The non-pecuniary cap.** Since the Supreme Court's 1978 trilogy, Canadian awards for pain and suffering are capped at an inflation-indexed ceiling (roughly $\$100{,}000$ in 1978 dollars). This is the structural reason Canadian bodily injury severities are far below American ones, and candidates should cite it whenever asked to compare the two systems.
- **Costs follow the event** in Canada: the losing party generally pays a portion of the winner's legal costs. This discourages weak claims and weak defences alike, and is another significant difference from the American rule.
- **Actuarial consequences:** tort claims are **long-tailed** (years from accident to resolution) and sensitive to judicial trend. Development patterns depend on court backlogs, limitation periods and settlement practice.
- Future losses are converted to present value using court-prescribed or evidence-based discount rates.

![[Media/Figures/Tort_Litigation.svg|340]]

> [!example]- Building a Bodily Injury Award {Example}
> A plaintiff aged $40$, earning $\$70{,}000$ per year, is permanently unable to work after a collision. The court assesses $25$ years of future income loss, $\$300{,}000$ of future care, and $\$180{,}000$ for pain and suffering. The plaintiff is found $20\%$ contributorily negligent. Accident benefits of $\$95{,}000$ have been paid for income replacement. Assume future losses are discounted at $2\%$ net of wage inflation.
>
> Compute the award.
>
> > [!answer]-
> > **Future income loss**, as a present value at a net rate of $2\%$ over $25$ years:
> >
> > $$\begin{align*}
> > \text{PV} &= \$70{,}000 \times \frac{1 - 1.02^{-25}}{0.02} \\
> > &= \$70{,}000 \times 19.523 \\
> > &= \$1{,}366{,}610
> > \end{align*}$$
> >
> > **Gross damages:**
> >
> > $$\begin{align*}
> > \text{Total} &= \$1{,}366{,}610 + \$300{,}000 + \$180{,}000 \\
> > &= \$1{,}846{,}610
> > \end{align*}$$
> >
> > **Contributory negligence** of $20\%$:
> >
> > $$0.80 \times \$1{,}846{,}610 = \$1{,}477{,}288$$
> >
> > **Less collateral benefits** already paid for the same head of loss:
> >
> > $$\$1{,}477{,}288 - \$95{,}000 = \$1{,}382{,}288$$
> >
> > Observe where the money is: $74\%$ of the award is **future income loss**, a discounted annuity.
