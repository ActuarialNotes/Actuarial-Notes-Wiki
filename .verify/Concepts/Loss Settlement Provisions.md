---
target: Concepts/Loss Settlement Provisions.md
created: 2026-10-10
---

## [F-001] Stated amount, securities and loss-to-a-part rules not located in any source read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- severity: minor
- status: open
- locus: bullets 'Stated amount', 'Market value' (securities sentence), 'Loss to a part'; vase example's last sentence ('Under some fine arts forms ...')
- claim: A stated amount pays the least of the stated amount, ACV and repair cost; securities under crime coverage are valued at market price on the day the loss is discovered; a loss-to-a-part provision pays only for the part; some fine arts forms pay the full set value and take the remaining item.
- evidence: No ISO auto stated-amount endorsement, crime form or fine-arts form was readable this run (the Virginia SCC copy of CA 99 28 failed TLS twice). A web search found the least-of-three stated-amount rule only in carrier forms and study guides. The commit that wrote the page (4d9927e) records these rules as 'stated from memory'. What does check: agreed value optional coverage suspends coinsurance (CP 00 10 G.1.a); 'stock' sold but not delivered at selling price less discounts and expenses (E.7.c); pair or set (HO-3 Section I Condition E; IRMI pair-or-set clause); functional replacement cost (IRMI); book value (IRMI, incl. 'should never be relied on to establish insurable values').
- source_rank: 3
- proposed_action: Cite the ISO forms for each rule (CA 99 28 or PP 03 08-type stated amount endorsement, CR 00 21 valuation, IM fine arts form), or trim the unsupported sentences.
- applied: false
- fingerprint: fb85c7211ee0

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- status_set: in_review
- checks_run: Checked against sources: agreed value (CP 00 10 G.1), selling price for sold-not-delivered stock (E.7.c), pair or set (HO-3 E, IRMI), functional replacement cost (IRMI), book value (IRMI, the sentence the writer added transcribes it). Lathe example recomputed before reading: ACV 64,000 x 7/12 = 37,333.33; BV 50,000 x 2/7 = 14,285.71; payments 61,500 / 42,500 / 37,500 / 34,833.33 / 27,500 / 11,785.71; stated 40,000 caps to ACV 34,833.33; gap 23,047.62 ('about 23,000'). Vases: 12,000 - 3,000 = 9,000 vs 6,000 — all agree.
- sources_checked: ISO CP 00 10 10 12, Building and Personal Property Coverage Form, E.7.c, G.1 (pp.13-15), sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf; ISO HO 00 03 05 11, Homeowners 3 – Special Form (Maine Bureau of Insurance copy), Section I Condition E (p.15), sha256:ac539e500a5767946452d1e6ad4c4b7dcc395c6c65c48fc3a8ac92a7c330a1d4 — https://www.maine.gov/pfr/insurance/sites/maine.gov.pfr.insurance/files/inline-files/ho00-03-05-11-homeowners3-special-form.pdf; IRMI Insurance Glossary, 'functional replacement cost' (fetched 2026-10-10), sha256:70469cded69b4322209026dd5af195bbe8ca95463f05dff062fad72e57a93e55 — https://www.irmi.com/term/insurance-definitions/functional-replacement-cost; IRMI Insurance Glossary, 'pair or set clause' (fetched 2026-10-10), sha256:c1324d6e8a72839b73a5191202c6aa4ef2210a0cd3430f3733da6e982bf5b81e — https://www.irmi.com/term/insurance-definitions/pair-or-set-clause; IRMI Insurance Glossary, 'book value' (fetched 2026-10-10), sha256:999cbf0ed845b3971668eaae1867ff6c90fd4249a091042c256f9f2d13fccd3a — https://www.irmi.com/term/insurance-definitions/book-value; IRMI Insurance Glossary, 'actual cash value (ACV)' (fetched 2026-10-10), sha256:5f284ad72439afe65429eed3341df2aa74bdea4fe89c9f1835b801646fc5053a — https://www.irmi.com/term/insurance-definitions/actual-cash-value
- note: Left in_review for F-001: four valuation rules were written from memory and no ISO form for them was readable this run.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Lead-authorized clean-up, applied: deleted the stated-amount bullet, the securities sentence, the loss-to-a-part bullet and the fine-arts sentence; the lathe example now values four bases (RC, functional RC, ACV, book value) and the stated-amount trap and 'choosing a basis' tip are deleted.

## [F-002] Agreed value, functional replacement cost and two book-value/pair sentences went beyond the sources
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- severity: minor
- status: open
- locus: bullets 'Agreed value', 'Functional replacement cost', 'Market value', 'Book value', 'Pair or set'; trap 'Two meanings of agreed value'
- claim: Agreed value is paid in full for a total loss and suits fine art; functional replacement cost is illustrated by drywall for plaster and lets an old building be insured below like-kind cost; 'Policies rarely settle on [book value]'; a pair-or-set payment is 'usually more than the lost item's proportional share'.
- evidence: CP 00 10 10 12 G.1 (p.14): the agreed value optional coverage suspends coinsurance and 'We will pay no more for loss of or damage to that property than the proportion that the Limit of Insurance ... bears to the Agreed Value'. IRMI 'functional replacement cost': 'the cost of acquiring another item of property that will perform the same function with equal efficiency, even if it is not identical'. CP 00 10 E.7.c values sold-not-delivered stock at selling price less discounts and expenses. The scheduled-item agreed-value rule, the drywall illustration, 'rarely settle on it' and the 'usually more' generalisation are in none of these.
- source_rank: 1
- proposed_action: Restate agreed value and functional replacement cost to the BPP and IRMI wording; restate 'Market value' to the BPP's selling-price rule; delete the unsupported sentences.
- applied: true
- fingerprint: 4e215c106198

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- resolves: F-002
- status: resolved
- note: Applied as proposed; the trap now reads 'Agreed value in the BPP: the agreed value option suspends coinsurance, and the insurer pays no more for a loss than the proportion that the limit bears to the agreed value; the loss itself is still valued under the form's valuation condition.' Lathe example recomputed: 61,500 / 42,500 / 34,833.33 / 11,785.71; gap to ACV 23,047.62.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Re-verify after F-001/F-002 clean-up. Every remaining rule is source text: agreed value option (CP 00 10 G.1), selling price for stock (E.7.c), functional replacement cost and book value (IRMI), pair or set (HO 00 03 05 11 Section I Condition E; IRMI). Examples recomputed before reading: ACV 64,000 x 7/12 = 37,333.33; BV 50,000 x 2/7 = 14,285.71; payments 61,500, 42,500, 34,833.33, 11,785.71; vases 12,000 - 3,000 = 9,000.
- sources_checked: ISO CP 00 10 10 12, Building and Personal Property Coverage Form, E.7.c, G.1 (pp.13-15), sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf; ISO HO 00 03 05 11, Homeowners 3 – Special Form (Maine Bureau of Insurance copy), Section I Condition E (p.15), sha256:ac539e500a5767946452d1e6ad4c4b7dcc395c6c65c48fc3a8ac92a7c330a1d4 — https://www.maine.gov/pfr/insurance/sites/maine.gov.pfr.insurance/files/inline-files/ho00-03-05-11-homeowners3-special-form.pdf; IRMI Insurance Glossary, 'functional replacement cost' (fetched 2026-10-10), sha256:70469cded69b4322209026dd5af195bbe8ca95463f05dff062fad72e57a93e55 — https://www.irmi.com/term/insurance-definitions/functional-replacement-cost; IRMI Insurance Glossary, 'pair or set clause' (fetched 2026-10-10), sha256:c1324d6e8a72839b73a5191202c6aa4ef2210a0cd3430f3733da6e982bf5b81e — https://www.irmi.com/term/insurance-definitions/pair-or-set-clause; IRMI Insurance Glossary, 'book value' (fetched 2026-10-10), sha256:999cbf0ed845b3971668eaae1867ff6c90fd4249a091042c256f9f2d13fccd3a — https://www.irmi.com/term/insurance-definitions/book-value; IRMI Insurance Glossary, 'actual cash value (ACV)' (fetched 2026-10-10), sha256:5f284ad72439afe65429eed3341df2aa74bdea4fe89c9f1835b801646fc5053a — https://www.irmi.com/term/insurance-definitions/actual-cash-value
- note: Medium: IRMI (rank 3) defines functional replacement cost and book value.
