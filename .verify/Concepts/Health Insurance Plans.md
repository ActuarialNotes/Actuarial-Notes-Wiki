---
target: Concepts/Health Insurance Plans.md
created: 2026-10-10
---

## [F-001] Balance billing stated without the No Surprises Act limits
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- severity: minor
- status: open
- locus: 'PPOs' bullet ('An out-of-network provider can also bill the member the difference ...'), PPO out-of-network example, and the 'Balance billing' trap
- claim: An out-of-network provider can bill the member the difference between its charge and the allowed amount (balance billing), stated generally.
- evidence: Since plan years beginning on or after 1 Jan 2022, 42 U.S.C. 300gg-131 bars a nonparticipating emergency facility or provider from billing more than the in-network cost sharing for emergency services, and 300gg-132 bars a nonparticipating provider at a participating facility from doing so for non-emergency items and services, absent notice and consent (LII, sha256:bb1ad70a... and 73ad766f...). HealthCare.gov's balance-billing entry (sha256:7a9a2151...) still describes the practice. The page's elective surgeon example can be read as a fully out-of-network setting, so the arithmetic is not wrong, but the general statement omits the federal limits.
- source_rank: 2
- proposed_action: Add a sentence on the No Surprises Act limits (emergency care; out-of-network providers at in-network facilities) to the PPO bullet or the trap. Authoring; not applied.
- applied: false
- fingerprint: eca82aa6fa06

## [F-002] Plan-type details not found in the sources read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- severity: minor
- status: open
- locus: 'Indemnity plans', 'HMOs' and 'POS plans' bullets
- claim: Indemnity plans reimburse a percentage of reasonable and customary charges and are now rare; an HMO provides care for a fixed prepayment and its cost sharing is usually low, often a flat copayment; a POS member pays HMO-like cost sharing in network and can go out of network at PPO-like cost.
- evidence: HealthCare.gov's HMO entry (sha256:b313815d...) says an HMO limits coverage to its network except in an emergency and may require residence in its service area; the plan-types page (sha256:a68d9380...) says a POS plan charges less in network and requires a referral to see a specialist, and the referral entry says many HMOs require referrals. None of these, IRS Pub. 969 or the ACA sections read say anything about prepayment, flat-copayment cost sharing, reasonable-and-customary reimbursement, indemnity plans being rare, or POS out-of-network coverage. The claims are plausible but unsourced here.
- source_rank: 3
- proposed_action: Cite a primary or reputable source (e.g. a federal or state regulator's plan-type guide, or KFF's Employer Health Benefits Survey for plan-type shares) or soften the unsourced details.
- applied: false
- fingerprint: 564b2bd305e8

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: HMO/PPO/POS/EPO, referral, HDHP, HSA (pre-tax, portable), HRA (employer funds and owns), balance billing, out-of-pocket maximum (excludes premiums) against HealthCare.gov and IRS Pub. 969; ACA bullet against 42 U.S.C. 300gg-3, -6, -11, -13, -14 and 18022(b)-(c); Medicare/Medicaid populations against HealthCare.gov. Cost-sharing formula worked against both examples, recomputed before reading: PPO 500 / 3,000 (cap binds on 6,380), HDHP 1,000 / 6,500 (cap binds on 8,400), totals 4,100 / 1,450 / 6,600 / 6,950, differences 2,650 and 350; out of network 240 vs 1,280, gap 1,040.
- sources_checked: HealthCare.gov glossary and plan-types pages read 2026-10-10: HMO (network only except emergency) sha256:b313815d55482ded08e11d96acdd4df6f15b56f3ff5ca996415c655925014614; PPO (out of network at additional cost) sha256:8b435c4582532e9bcae3c79554698cb0c33032ae8b63b6f2714769a72545e930; plan types (POS requires referral; PPO no referral) sha256:a68d938036a29a2c8f71aef767b7fe8edf3cacd7c85c9e4f8c7f842e2490ad1c; referral (many HMOs) sha256:e4c0b77236ad6721b8dd12a3a967a0ec7461b4fff483a326385dd073afc47c46; HDHP sha256:cd25eb8c46c9294f49251bfc7237b746529c849ab23c73d1a1654a778998041b; HSA (pre-tax) sha256:5e2d83d92d6fffb041a699934902a82efc674483f6dfb9adf7e63784ef3f7172; HRA (employer funds and owns) sha256:fe94ad2932c79df69d3f96765ccedd2cf3c0d1e74bacededdc713d74a16d7007; balance billing sha256:7a9a2151209c64cd7a86b4545fb0abbc2531500f288049bf35a03838b725c003; essential health benefits (10 categories) sha256:41171699188eb33cfa9ee6c6998296f29ab1d33a84882f08f97b46b01fba4ae7; out-of-pocket maximum (excludes premiums, out-of-network care, charges above allowed amount) sha256:83127bb8ccbb163d6bf7194f227574a529d603e4a6a0c10ad72859efb831a18d; Medicare sha256:dafcb2670d59d7aa46041f50c955f87e1aad129cd5c39af08e1fd4d540b23ca6; Medicaid sha256:ad1be61df8b59e2456cdcd25f3a04cd3f6146c1fb0c06b5d85962ed8153ad934 — https://www.healthcare.gov/glossary/ and https://www.healthcare.gov/choose-a-plan/plan-types/; IRS Publication 969 (HSA 'portable', stays with you if you change employers; HRA employer contributions only; HDHP preventive care without deductible), read 2026-10-10, sha256:e7f2142ee40e71690cbc6df147ada169d2f7723a71857af76f27a860b8c4ca0e — https://www.irs.gov/publications/p969; 42 U.S.C. §§300gg-3 (no preexisting condition exclusion) sha256:921d99a4ca5e446141b2b7ca537c3c5e45d9a4ebd0b1a12009a68fb396657ef7; 300gg-6(a) (individual/small group must cover EHB package) sha256:6e7bfc08b2b0f981fac9c2ef2aec2afb6324ad329ed588e1c05c92b22d4ce18d; 300gg-11 (no lifetime or annual dollar limits on EHB) sha256:da7d024e8f1e1dcf4718a5707aab757b46388044dc7486b07f5108df67c33d51; 300gg-13 (preventive without cost sharing) sha256:4c39b631a7b9ba7501d0c3fe0f54ed87dc78b839d1c284b8254c20654acd811d; 300gg-14 (adult child to age 26) sha256:56a3b2f48ce7effc57f0a0fb7555bad357ba524123189a93e033ba43eb27823a; 18022(b)-(c) (ten EHB categories; cost-sharing cap) sha256:4a322609875dfa988bf2364120059f8b82dc8c1e765a84131977a1b9d685b8ad; 300gg-131/-132 (No Surprises Act balance-billing limits) sha256:bb1ad70a27113d73c9a48fe6d8bd107f7ec7b9c6e3247229467a5e165ee89476 / sha256:73ad766fc4ec6902d20f0fdcf6dd03e6429ca64181970e71b1a46ebe9a6e27b0 — https://www.law.cornell.edu/uscode/text/42/; The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf
- note: Verified medium with two minor findings open: F-001 (balance billing without the No Surprises Act limits, 42 U.S.C. 300gg-131/-132) and F-002 (indemnity, HMO prepayment/copay and POS out-of-network details not in the sources read).
