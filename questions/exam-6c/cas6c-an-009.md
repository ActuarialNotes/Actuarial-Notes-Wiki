---
id: "cas6c-an-009"
exam: "Exam 6C"
topic: "Contract Boundary"
learning_objective: "Canadian Financial Reporting, Solvency, and Professional Responsibility"
difficulty: hard
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Contract+Boundary
  - Concepts/Liability+for+Remaining+Coverage
  - Concepts/Premium+Allocation+Approach
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:af982c32b54e66df35d0eec75f467be099e1faca0d1e5b4afdf3ec754430a72a
  sources:
    - "CIA, Educational Note: IFRS 17 – Actuarial Considerations Related to Liability for Remaining Coverage in P&C Insurance Contracts (June 2022, Document 222092), §4.3.1 Contract boundary, PDF pp.13-14 (IFRS 17.34 quoted; rate guarantees \"would likely extend the contract boundary\"; termination clauses), sha256:a7e5ecea716dc20bffcc88045f20c950e71400ac3de3bfb1544736dac46a0333 — https://www.casact.org/sites/default/files/2023-05/6C_CIA_Educational_Note_IFRS_17_Actuarial_Considerations_Related_to_Liability.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-6c/cas6c-an-009.md
---

A P&C insurer issues one-year commercial property policies effective January 1, 2027. To win a large account, it guarantees in the contract that the rate for the 2028 renewal will be the 2027 rate, whatever the insured's 2027 loss experience. The policyholder may decline to renew.

How does the rate guarantee affect the contract boundary?

- A) The boundary likely extends past 2027, because the insurer cannot fully reprice the 2028 renewal
- B) The boundary stays at December 31, 2027, because the policyholder is not obliged to renew
- C) The boundary stays at December 31, 2027, because a P&C contract's boundary is always its stated term
- D) The boundary ends at inception, because the guarantee makes the contract a financial instrument outside IFRS 17
- E) The boundary is shortened, because the insurer can cancel the contract at any time on notice

## Explanation

IFRS 17.34, quoted in the CIA's educational note on the LRC (section 4.3.1), places cash flows within the boundary when they arise from substantive rights and obligations: periods in which the entity can compel the policyholder to pay premiums, or has a substantive obligation to provide services. That obligation ends when the entity has the practical ability to reassess the policyholder's risk and set a price that fully reflects it.

For most P&C contracts the boundary is the coverage period. But the educational note lists, among the factors that could change this, "restrictions on the entity's ability to reprice after expiration of the insurance contract (e.g., rate guarantees for periods extending after the insurance contract expiry date...)", which "would likely extend the contract boundary beyond the insurance contract expiry date." Here the insurer is bound to cover 2028 at a price it cannot reset, so its substantive obligation continues past the expiry date. The answer is **A**.

**Why not the others**

- **B** — the test looks at the *insurer's* substantive obligation and repricing ability. The policyholder's right to walk away does not release the insurer from a price it has guaranteed.
- **C** — the stated term is the usual boundary *because* the insurer can usually reprice at renewal. The educational note names rate guarantees as an exception.
- **D** — the contract still transfers significant insurance risk. A rate guarantee affects its boundary, not whether IFRS 17 applies.
- **E** — the educational note does say a termination clause with commercial substance could shorten the boundary, but no such clause is described here. The guarantee works in the opposite direction.
