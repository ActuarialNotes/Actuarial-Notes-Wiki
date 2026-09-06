---
Title: "Common Pitfalls and Practical Considerations in Risk Transfer Analysis"
Authors: "Derek Freihaut, Paul Vendetti"
Year: "2009"
date: "2009"
Publisher: "Casualty Actuarial Society"
Type: "E-Forum Paper"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2021-03/6C_Freihaut_and_Vendetti.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ad7f22daf62c4648cdaa1b04caa469e986e48d01f09b0392f8f05cbb2afa6487
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Freihaut and Vendetti.md
---
![[Freihaut and Vendetti - Cover.svg]]

Freihaut and Vendetti's paper in the *CAS E-Forum*, Fall 2009, on how a **[[Risk Transfer|risk transfer]]** analysis goes wrong in practice. Read for [[Exam 6C (CAS)|Exam 6C]] objectives C1 and C3. **Appendices A and B are for information only and will not be directly tested.**

## Structure

| Section | Subject |
|---|---|
| **1** | Introduction — 1.1 risk transfer in current literature · 1.2 objective · 1.3 outline |
| **2** | **Brief history of risk transfer** — 2.1 the "substantially all" exemption · 2.2 required documentation and "reasonably self-evident" · 2.3 the **Expected Reinsurer Deficit (ERD)** · 2.4 risk transfer thresholds |
| **3** | **Common pitfalls and practical considerations** — 3.1 analyzing risk transfer · 3.2 common pitfalls · 3.3 practical considerations |

## The framework

For a contract to be accounted for as reinsurance, two conditions must hold: **the reinsurer assumes significant insurance risk under the reinsured portion of the contract**, and **it is reasonably possible that the reinsurer may realize a significant loss from the transaction**. Around that sit the attestation requirements: no separate written or oral agreements between the parties, documentation for every contract for which risk transfer is not **reasonably self-evident**, compliance with the statutory accounting requirements, and controls in place to monitor the use of reinsurance.

**Expected Reinsurer Deficit (ERD)** is the measure the paper adopts: the probability of a net loss to the reinsurer multiplied by the average severity of that loss, expressed as a proportion of expected premium. ERD is preferred to the traditional "10-10" rule because 10-10 misses contracts with a small probability of a very large loss — the classic risk-transferring catastrophe cover that fails the test.

## Section 3.2 — the common pitfalls

The list the exam draws on:

| Pitfall | The error |
|---|---|
| **Profit commissions** | A sliding-scale or profit commission returns margin to the cedant in good scenarios; ignoring it overstates the reinsurer's downside |
| **Reinsurer expenses** | Whether the reinsurer's internal expenses belong in the loss calculation — including them makes deficit more likely |
| **Interest rates and discount factors** | The rate used to discount the cash flows changes the answer directly |
| **Premiums** | Which premium is the denominator, and the treatment of adjustable and reinstatement premiums |
| **Evaluation date** | Analysing at inception versus later; a contract can transfer risk at inception and not afterwards |
| **Commutations and timing of payments** | A commutation clause can extinguish the tail the analysis relied on |

## Section 3.3 — practical considerations

- **Parameter selection**, and the fact that the analysis is only as good as the loss distribution assumed.
- **Interest rate** — a case can be made for a rate above risk-free; a **constant yield curve** generally produces a **more stringent** analysis.
- **Payment pattern**, **loss distribution**, and **parameter risk** — a simulation with no parameter uncertainty understates the reinsurer's downside.
- **Use of pricing assumptions** — convenient, but the reinsurer's pricing assumptions are chosen for a different purpose.
- **Commutation clauses.**

## Reading it in Canada

The paper is written to U.S. statutory accounting and U.S. thresholds. Canada has deliberately **not** adopted a bright-line test — see [[CIA Reinsurance Treatment]], where the CIA task force argued against a rules-based approach. So the syllabus uses this paper for the **analysis and its failure modes**, not for the ERD threshold as a Canadian rule. The consequences of failing the test are real either way: no reinsurance accounting under [[CIA IFRS 1|IFRS 17]], and no capital credit under [[OSFI MCT|MCT]] ([[OSFI Reinsurance]]).

## Related readings
- [[CIA Reinsurance Treatment]] — the Canadian principles-based position
- [[OSFI Reinsurance]] — Guideline B-3, and finite reinsurance
- [[CIA IFRS 1]] — reinsurance measurement under IFRS 17
- [[OSFI Annual Return]] 70.90/70.95 — the reinsurance interrogatories

## Links
- [Common Pitfalls and Practical Considerations in Risk Transfer Analysis (CAS)](https://www.casact.org/sites/default/files/2021-03/6C_Freihaut_and_Vendetti.pdf)
