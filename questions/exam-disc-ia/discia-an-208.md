---
id: "discia-an-208"
exam: "Exam DISC-IA"
topic: "Health Insurance Plans"
learning_objective: "7. Life and Health Insurance"
difficulty: easy
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Health+Insurance+Plans
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:c02740f80e7d97e6412e3ad5e0fd53af93db254262911654afe6ab33fc02f8cf
  sources:
    - "HealthCare.gov glossary and plan-types pages read 2026-10-10: HMO (network only except emergency) sha256:b313815d55482ded08e11d96acdd4df6f15b56f3ff5ca996415c655925014614; PPO (out of network at additional cost) sha256:8b435c4582532e9bcae3c79554698cb0c33032ae8b63b6f2714769a72545e930; plan types (POS requires referral; PPO no referral) sha256:a68d938036a29a2c8f71aef767b7fe8edf3cacd7c85c9e4f8c7f842e2490ad1c; referral (many HMOs) sha256:e4c0b77236ad6721b8dd12a3a967a0ec7461b4fff483a326385dd073afc47c46; HDHP sha256:cd25eb8c46c9294f49251bfc7237b746529c849ab23c73d1a1654a778998041b; HSA (pre-tax) sha256:5e2d83d92d6fffb041a699934902a82efc674483f6dfb9adf7e63784ef3f7172; HRA (employer funds and owns) sha256:fe94ad2932c79df69d3f96765ccedd2cf3c0d1e74bacededdc713d74a16d7007; balance billing sha256:7a9a2151209c64cd7a86b4545fb0abbc2531500f288049bf35a03838b725c003; essential health benefits (10 categories) sha256:41171699188eb33cfa9ee6c6998296f29ab1d33a84882f08f97b46b01fba4ae7; out-of-pocket maximum (excludes premiums, out-of-network care, charges above allowed amount) sha256:83127bb8ccbb163d6bf7194f227574a529d603e4a6a0c10ad72859efb831a18d; Medicare sha256:dafcb2670d59d7aa46041f50c955f87e1aad129cd5c39af08e1fd4d540b23ca6; Medicaid sha256:ad1be61df8b59e2456cdcd25f3a04cd3f6146c1fb0c06b5d85962ed8153ad934 — https://www.healthcare.gov/glossary/ and https://www.healthcare.gov/choose-a-plan/plan-types/"
    - "The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-ia/discia-an-208.md
---

A member's health plan has a \$1,000 annual deductible, 20% coinsurance after the deductible and a \$4,000 out-of-pocket maximum. The plan has no copayments. During the year the member has \$12,000 of allowed charges, all subject to the deductible. How much does the member pay in cost sharing for the year?

- A) \$2,400
- B) \$3,200
- C) \$3,400
- D) \$4,000

## Explanation

The member pays the deductible, then 20% of the allowed charges above it, up to the out-of-pocket maximum:

$$
\begin{align*}
m &= \min\big(1{,}000 + 0.20\,(12{,}000 - 1{,}000),\ 4{,}000\big) \\
&= \min(3{,}200,\ 4{,}000) \\
&= \mathbf{3{,}200}
\end{align*}
$$

- **A** applies 20% to all the charges and forgets the deductible.
- **C** adds the deductible and then applies coinsurance to the full \$12,000, counting the first \$1,000 twice.
- **D** assumes the out-of-pocket maximum is always reached. It caps cost sharing only when the deductible and coinsurance would exceed it.
