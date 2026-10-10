---
target: Concepts/Auto Physical Damage Coverage.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: every Part D provision diffed against PP 00 01 09 18 ($1,500 trailer, $1,000 electronics, $1,500 custom equipment, $30/day $900, 48/24 hours, 14 days, highest deductible, glass election, sixteen exclusions); BA physical damage coverages against CA 00 01; both examples recomputed blind (7,300; 11,500, net 9,300; E 6,000 and 4,500; fleet 28,800 and 21,600; 7,200 = 4.8 x 1,500)
- sources_checked: ISO PP 00 01 09 18 Personal Auto Policy (Virginia SCC specimen), Part D insuring agreement, collision definition, other than collision 1-10, non-owned auto, custom equipment, transportation expenses, exclusions 1-16, limit of liability A-C, payment of loss, appraisal, other sources of recovery (pp.8-12), sha256:20a8001d97dcc09d70ab2a76579414c3b869ecb4afe23d2446b844ad4c7780c8 — https://www.scc.virginia.gov/media/sccvirginiagov-home/regulated-industries/insurance/insurance-companies/property-casualty-companies/personal-commercial-auto-forms/pp-00-01-09-18.pdf; ISO CA 00 01 10 13 Business Auto Coverage Form, III physical damage, sha256:b8e36d4e31f05a7eaad97cba8b091f8a45cf1ea302e616bad96b4c132c1457e8 — https://assets.touchpointmarkets.com/80/d7/be854d714678be5fefc9d17cc365/ca-00-01-10-13-business-auto-coverage-form.pdf
- note: The PAP content checks line by line against the specimen (rank 1); the business auto underwriting bullet is general, hence medium.
