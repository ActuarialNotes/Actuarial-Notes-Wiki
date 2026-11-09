---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:09184edc4a593bdccda0f529e6401e952a26f62b5c99a906fd788a2e8386927a
  sources:
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), PDF pp.2-3 (policyholder pays premium; insurer pays the policyholder or his designated beneficiary), p.7 (deductible; three reasons for deductibles; policyholder covers part of the loss), pp.8-9 (benefit limits; maximum on a claim payment; 80% of the lesser of 5000 and the cost), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 2016), Ch.1 PDF p.14 (claim; claimant can be an insured or a third party alleging injuries or damages covered by the policy), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "SOA, Tables for Exam C (Fall 2009), exponential E[X ^ x] = theta(1 - e^{-x/theta}) (PDF p.11), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "SOA Probability Exam syllabus, November 2026, Topic 2 learning outcomes c) (expected values incl. mode, median, percentiles) and e) (amount an insurance company pays to a policyholder given deductibles, coinsurance percentages, benefit limits, inflation), PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "SOA INV 201 syllabus 2026-2027, PDF p.7: risks that can only be partially hedged or cannot be hedged, including policyholder behavior, sha256:8b5d280585ae9d0e35943729f861ac13ada7462be850c328da93645b7bbd9bc1 — https://www.soa.org/globalassets/assets/files/edu/2026/inv-201/2026-2027-inv-201-syllabus.pdf"
    - "SOA ILA 201-U syllabus 2026-2027, PDF p.4: perspectives of regulators, investors, policyholders and insurance company management regarding capital, sha256:daa04ce74955f3f9410aa18ae501d020420272b16de1fe550a788bf89c1d4e87 — https://www.soa.org/globalassets/assets/files/edu/2026/ila-201u/2026-2027-ila-201u-syllabus.pdf"
    - "CIA FCIA syllabus, Group benefits track (2026 file), PDF pp.7, 13, 16: identify the stakeholders in an insurance policy (policyholder, insureds, including employees and dependents), sha256:bd811a7377eec93db261e916a3db6b0765be5917c843993b4acdf32f0c5a2634 — https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=36229&fid=17015"
    - "CIA FCIA syllabus, Financial/investment track (2026 file), PDF p.7: risks of guaranteed riders incl. policyholder behaviour; partially hedgeable or unhedgeable policyholder behaviour, sha256:596ac4b5b2e73cdc20410d14652686301c4d219b2bf85fd838751770de91b539 — https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=36225&fid=17007"
    - "CIA FCIA syllabus, Individual life and annuities track (2026 file), PDF p.12: policyholder behavior such as policy and premium persistency, sha256:ff0543bc33cd8d299931b668b66d589ebd03f5bc7595fd11ce67173d4e1a9097 — https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=36227&fid=17011"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Policyholder.md
---

A **Policyholder** is the person or organization that buys an [[Insurance Policy|insurance policy]], pays its [[Insurance Premium|premium]] and holds the rights under it. When the policyholder has a loss $X$ and the [[Insurer|insurer]] pays $Y$ on it, the amount the policyholder retains is

> $$X - Y$$

- $X$ is the ground-up [[Loss Random Variable|loss]].
- $Y$ is the insurer's [[Payment Random Variable|payment]].

> [!example]- A policy has a deductible of 500, the insurer pays 75% of the loss above it, and the insurer pays at most 6,000. How are losses of 300, 2,500 and 10,000 split between the insurer and the policyholder? {Example}
> | Loss $X$ | Insurer pays $Y$ | Policyholder retains $X - Y$ |
> | --- | --- | --- |
> | 300 | 0 | 300 |
> | 2,500 | 1,500 | 1,000 |
> | 10,000 | 6,000 | 4,000 |
>
> - A loss of 300 is below the deductible, so the policyholder retains all of it.
> - On 2,500, the insurer pays $0.75 \times 2{,}000 = 1{,}500$.
> - On 10,000, 75% of the excess would be 7,125, so the insurer pays its maximum of 6,000.

## Parts of a loss the policyholder retains

Under a [[Deductible|deductible]] $d$, a [[Coinsurance Percentage|coinsurance percentage]] $\alpha$ and a [[Benefit Limit|benefit limit]], the policyholder retains

1. the deductible, the first $d$ of the loss,
2. the coinsurance share, $(1 - \alpha)(X - d)$, until the insurer's payment reaches the limit, and
3. everything above the loss at which the limit is reached.

A deductible saves the expense of handling small claims, lowers the premium, and gives the policyholder a reason to prevent losses ([[Moral Hazard|moral hazard]]).

## Expected amount retained under a deductible

When the policy has only a deductible $d$, the policyholder retains $\min(X, d)$ on every loss, so the expected amount retained is the [[Limited Expected Value|limited expected value]]

> $$E[X - Y] = E[X \wedge d]$$

- $X \wedge d$ is $\min(X, d)$.

> [!example]- A policyholder's loss is exponential with mean 1,000, and the policy has a deductible of 250. What is the expected amount the policyholder retains? {Example}
> - The insurer's expected payment per loss is $1{,}000\,e^{-0.25} \approx 778.80$.
> - The policyholder retains the rest of the expected loss, $1{,}000 - 778.80 = 221.20$.

> [!trap] The payment versus the amount retained
> A question can ask what the insurer pays or what the policyholder retains. The two always add to the loss, and the wrong one is usually among the options.

## Policyholders, beneficiaries and claimants

The policyholder, the beneficiary and the claimant can be different people.

- The insurer pays the policyholder or a designated **beneficiary**.
- The **claimant**, who makes the demand for payment, can be an insured or a third party alleging injuries or damages that the policy covers.

## Policyholders on the life and health exams

- **Policyholder behaviour** is a risk to the insurer. Policyholders decide whether to keep paying premiums, to [[Lapse|lapse]] or to use a guarantee.
- **Group benefits** separate the policyholder, often an employer, from the insureds, its employees and their dependents.
