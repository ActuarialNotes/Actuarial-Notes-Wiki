---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:476d9e1fe19f3f7cfa1feb572a3ce94ed8559a7a8ed561895fe669b822c997b9
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

![[Media/Figures/Tort_Litigation.svg|340]]

**Tort Litigation** is the civil action by which an injured person recovers damages from the person whose negligence caused the injury. It is the compensation mechanism that liability insurance responds to, and its cost, duration and unpredictability are why Canadian provinces have replaced parts of it with [[No-Fault Insurance|no-fault]] benefits. To recover, the plaintiff must prove four elements, and failure on any one defeats the claim:

1. A duty of care owed to the plaintiff.
2. A breach of the standard of care.
3. Causation of the injury by the breach.
4. Damages.

The damages a court assesses are

> $$\text{Damages} = \text{Pecuniary Damages} + \text{Non-Pecuniary Damages}$$

- $\text{Pecuniary Damages}$ are the plaintiff's financial losses, such as lost income, the cost of future care and other costs.
- $\text{Non-Pecuniary Damages}$ compensate pain and suffering.

Contributory negligence apportions the loss, so a plaintiff $30\%$ responsible for their own injury recovers $70\%$ of the assessed damages. Future losses are converted to a present value at court-prescribed or evidence-based discount rates.

> [!idea] The idea
> Since the Supreme Court of Canada's 1978 trilogy, Canadian awards for pain and suffering are capped at an inflation-indexed ceiling, about $\$100{,}000$ in 1978 dollars, which is the structural reason Canadian bodily injury severities are far below American ones.

In Canada costs follow the event: the losing party generally pays a portion of the winner's legal costs, which discourages weak claims and weak defences alike. Tort claims are long-tailed, years from accident to resolution, and sensitive to judicial trends. Their development patterns depend on court backlogs, limitation periods and settlement practice.

> [!example]- A plaintiff earning $\$70{,}000$ a year is permanently unable to work after a collision. The court assesses $25$ years of lost income, $\$300{,}000$ of future care and $\$180{,}000$ for pain and suffering, and finds the plaintiff $20\%$ contributorily negligent. Accident benefits of $\$95{,}000$ have already been paid for income replacement. At a discount rate of $2\%$ net of wage inflation, what is the award? {Example}
> - The present value of the lost income is $70{,}000 \times 19.5235 = \$1{,}366{,}642$, using the $25$-year annuity factor at $2\%$.
> - Adding the $\$300{,}000$ of care and $\$180{,}000$ for pain and suffering, the gross damages are $\$1{,}846{,}642$.
> - With $20\%$ contributory negligence, the plaintiff recovers $0.80 \times 1{,}846{,}642 = \$1{,}477{,}314$.
> - Less the $\$95{,}000$ of accident benefits already paid for the same loss, the award is $\$1{,}382{,}314$.

## The legal environment in a reserving analysis

A change in the legal environment, such as a court decision, a tort reform or a change in the statute of limitations, is an external [[Changing Conditions|changing condition]]. It can invalidate the development technique's assumption that past development predicts future development, even when the insurer's case reserving and settlement speed are unchanged. The actuary then considers other techniques or adjusts the selected development factors.
