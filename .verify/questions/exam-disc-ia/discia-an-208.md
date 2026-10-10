---
target: questions/exam-disc-ia/discia-an-208.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- status_set: verified
- confidence: high
- checks_run: Blind recompute from the stem with key and explanation stripped, then compared with the key; every distractor's explanation checked; wiki_link and learning_objective (section title matches the DISC-IA page; question_lint clean).
- sources_checked: HealthCare.gov glossary and plan-types pages read 2026-10-10: HMO (network only except emergency) sha256:b313815d55482ded08e11d96acdd4df6f15b56f3ff5ca996415c655925014614; PPO (out of network at additional cost) sha256:8b435c4582532e9bcae3c79554698cb0c33032ae8b63b6f2714769a72545e930; plan types (POS requires referral; PPO no referral) sha256:a68d938036a29a2c8f71aef767b7fe8edf3cacd7c85c9e4f8c7f842e2490ad1c; referral (many HMOs) sha256:e4c0b77236ad6721b8dd12a3a967a0ec7461b4fff483a326385dd073afc47c46; HDHP sha256:cd25eb8c46c9294f49251bfc7237b746529c849ab23c73d1a1654a778998041b; HSA (pre-tax) sha256:5e2d83d92d6fffb041a699934902a82efc674483f6dfb9adf7e63784ef3f7172; HRA (employer funds and owns) sha256:fe94ad2932c79df69d3f96765ccedd2cf3c0d1e74bacededdc713d74a16d7007; balance billing sha256:7a9a2151209c64cd7a86b4545fb0abbc2531500f288049bf35a03838b725c003; essential health benefits (10 categories) sha256:41171699188eb33cfa9ee6c6998296f29ab1d33a84882f08f97b46b01fba4ae7; out-of-pocket maximum (excludes premiums, out-of-network care, charges above allowed amount) sha256:83127bb8ccbb163d6bf7194f227574a529d603e4a6a0c10ad72859efb831a18d; Medicare sha256:dafcb2670d59d7aa46041f50c955f87e1aad129cd5c39af08e1fd4d540b23ca6; Medicaid sha256:ad1be61df8b59e2456cdcd25f3a04cd3f6146c1fb0c06b5d85962ed8153ad934 — https://www.healthcare.gov/glossary/ and https://www.healthcare.gov/choose-a-plan/plan-types/; The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf
- note: Blind 1,000 + 0.20(11,000) = 3,200 < 4,000 = key B; A 2,400, C 3,400 recomputed. Deductible, coinsurance and out-of-pocket maximum as HealthCare.gov defines them.
