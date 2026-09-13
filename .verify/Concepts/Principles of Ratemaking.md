---
target: Concepts/Principles of Ratemaking.md
created: 2026-09-13
---

## [F-001] Rate/price distinction attributed to the Statement, which contains neither
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/f8d9
- date: 2026-09-13
- severity: minor
- status: open
- locus: opening paragraph, second sentence
- claim: The Statement first defines a rate as an estimate of the expected value of future costs, and distinguishes it from a price, which may also reflect marketing, competition and regulation.
- evidence: CAS Statement of Principles Regarding P&C Insurance Ratemaking (adopted May 1988; rescinded Dec 2020, reinstated May 2021), Section I Definitions, p.1 (sha256:f240ea62dd033aac827c2073e56c0a4061d5c84531e5cf6be02d333a8f9f2140). Section I defines *Ratemaking* -- 'the process of establishing rates used in insurance or other risk transfer mechanisms. This process involves a number of considerations including marketing goals, competition and legal restrictions to the extent they affect the estimation of future costs' -- and then defines the cost components (incurred losses, ALAE, ULAE, commission and brokerage, other acquisition, taxes/licenses/fees, policyholder dividends, general administrative, UW profit and contingency). It defines no term 'rate'; the rate definition is Principle 1 in Section II, not in the Definitions. Full-text search of all five pages for 'price'/'pricing' returns zero hits, so the Statement draws no rate-vs-price distinction at all.
- source_rank: 2
- proposed_action: Say that Section I defines *ratemaking* (and the cost components) and that Principle 1 in Section II is where the rate is defined; attribute the rate-vs-price distinction to Werner Ch.1 or drop it.
- applied: false
- fingerprint: b9b42058cb7c

## [F-002] 'Judgment is necessary' overstates the Statement's permissive wording
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/f8d9
- date: 2026-09-13
- severity: nit
- status: open
- locus: Further points, first bullet (list of considerations)
- claim: [The Statement] is explicit that judgment is a necessary part of ratemaking.
- evidence: CAS SOP Ratemaking, Section III Considerations, p.4: 'Actuarial Judgment---Informed actuarial judgments can be used effectively in ratemaking. Such judgments may be applied throughout the ratemaking process and should be documented and available for disclosure.' 'Can be used effectively' / 'may be applied' is permissive; the Statement nowhere calls judgment necessary. (The rest of the bullet's list checks out against Section III: Exposure Unit, Data, Organization of Data, Homogeneity, Credibility, Loss Development, Trends, Catastrophes, Policy Provisions, Mix of Business, Reinsurance, Operational Changes, Other Influences, Classification Plans, Individual Risk Rating, Risk, Investment and Other Income, Actuarial Judgment.)
- source_rank: 2
- proposed_action: Use the Statement's own wording: informed actuarial judgment may be applied throughout the process and should be documented and available for disclosure.
- applied: false
- fingerprint: 2e51995a6426

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/f8d9
- date: 2026-09-13
- status_set: verified
- confidence: high
- checks_run: Diffed all four principles word for word against Section II, p.2. Principle 1 'A rate is an estimate of the expected value of future costs.'; Principle 2 'A rate provides for all costs associated with the transfer of risk.'; Principle 3 'A rate provides for the costs associated with an individual risk transfer.'; Principle 4 'A rate is reasonable and not excessive, inadequate, or unfairly discriminatory if it is an actuarially sound estimate of the expected value of all future costs associated with an individual risk transfer.' -- all four are verbatim on the page. The surrounding narrative also checks out: 'Ratemaking is prospective because the P&C insurance rate must be developed prior to the transfer of risk' supports the page's Principle 1 paragraph; the Principle 3 lead-in ('When the experience of an individual risk does not provide a credible basis... it is appropriate to consider the aggregate experience of similar risks') supports the credibility sentence; and 'Ratemaking produces cost estimates that are actuarially sound if the estimation is based on Principles 1, 2, and 3. Such rates comply with four criteria... reasonable, not excessive, not inadequate, and not unfairly discriminatory' supports the Principle 4 paragraph. The cost list behind the page's Rate = E[Losses + LAE + Expenses + Cost of Capital] display matches Section I p.1 ('claims, claim settlement expenses, operational and administrative expenses, and the cost of capital'). Recomputed the build-up example independently: (250+38)/(1-0.20-0.05) = 288/0.75 = 384.00 exactly. Two wording findings raised against Section I and Section III (F-001 minor, F-002 nit). LaTeX balanced; links and embed resolve.
- sources_checked: CAS Statement of Principles Regarding Property and Casualty Insurance Ratemaking (adopted May 1988; rescinded Dec 2020, reinstated May 2021 for reference for U.S.-regulated ratemaking), Sections I-IV, pp.1-5, sha256:f240ea62dd033aac827c2073e56c0a4061d5c84531e5cf6be02d333a8f9f2140
