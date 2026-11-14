---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:3b460fb619819b584ec6ebea6ea3d131a413efd6b1d24303b9e356aecd3b63e8
  sources:
    - "FTC, Credit-Based Insurance Scores: Impacts on Consumers of Automobile Insurance (Report to Congress, July 2007), PDF pp.13-14, 29, 48-49, sha256:4ab0292ce105ff017feb03304dd6f89120b87fa76f8afea1594d7f2c7cbeb05d — https://www.ftc.gov/sites/default/files/documents/reports/credit-based-insurance-scores-impacts-consumers-automobile-insurance-report-congress-federal-trade/p044804facta_report_credit-based_insurance_scores.pdf"
    - "NCOIL Model Act Regarding Use of Credit Information in Personal Insurance (2025 readoption text), §5A-B, §5E, §6, re-rating at renewal, sha256:77244865a5db8d1912cec5675aa3e089e5f7c42114fe2b179919a79beadb4f3f — https://ncoil.org/wp-content/uploads/2025/12/NCOIL-Credit-Model-July-2025.pdf"
    - "Safeco Ins. Co. of America v. Burr, 551 U.S. 47 (2007), syllabus (Cornell LII), syllabus, sha256:1a96e589293bc167f65cec575a3318a6fa61a1b4eb4191f84c7eb573cd2eaee5 — https://www.law.cornell.edu/supct/html/06-84.ZS.html"
    - "15 U.S.C. §1681b (Cornell LII), (a)(3)(C), sha256:6a76f86911643b4584aa96bbce68bbfcf097b5295d6c90e236c8256d16a02c1f — https://www.law.cornell.edu/uscode/text/15/1681b"
    - "15 U.S.C. §1681m (Cornell LII), (a), sha256:328c82a65f0c1484276bdcc5f8ef2e0175a70a94491a87aa4a01abe456c03f06 — https://www.law.cornell.edu/uscode/text/15/1681m"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), Ch.10 operational criteria PDF p.168, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
    - "The Institutes, CAS DISC DA Course Syllabus (© 2023), PDF pp.1-3, section 10.a-d titles, sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Credit-Based Insurance Scoring.md
---

**Credit-Based Insurance Scoring** is the use of a score built from an applicant's credit report (payment history, outstanding debt, length of credit history, recent applications for credit and mix of credit) to underwrite and rate personal auto and homeowners insurance. It is one of the most predictive [[Rating Variable|rating variables]] U.S. insurers use and one of the most contested, because its predictive power is well documented while its causal link to loss and its effect on protected groups are disputed.

The insurance score is not the lending score. It is built to predict insurance loss, not default, and state laws based on the NCOIL model bar income, gender, address, ethnic group, religion, marital status and nationality from its inputs.

To test the score, an insurer groups policies by score tier $k$ and computes each tier's [[Loss Ratio|loss ratio]] at current rates that do not use credit. The loss ratio relativity of tier $k$ is

> $$\text{LR relativity}_k = \frac{\text{Loss ratio}_k}{\text{Loss ratio}_{\text{total}}}$$

- $\text{Loss ratio}_{\text{total}}$ is the loss ratio of all tiers combined.

A relativity above $1.00$ means the tier costs more than its current rate, and one below $1.00$ means it costs less. If the relativities move steadily with the score, worst scores highest, the score explains loss the existing rating plan misses. A multivariate model ([[Generalized Linear Model|GLM]]) confirms the effect net of the other variables, as with any rating variable in [[Classification Ratemaking]].

> [!example]- What are the loss ratio relativities by score tier, and what does a state ban on credit do to them? {Example}
> An auto insurer that does not yet use credit reviews a year of experience at current rates, grouped by insurance score:
>
> | Score tier | Premium | Losses |
> | :--- | ---: | ---: |
> | Low | $\$2.0$M | $\$1.70$M |
> | Middle | $\$5.0$M | $\$3.25$M |
> | High | $\$3.0$M | $\$1.50$M |
>
> > [!answer]-
> > - The tier loss ratios are $1.70/2.0 = 85.0\%$, $3.25/5.0 = 65.0\%$ and $1.50/3.0 = 50.0\%$.
> > - The total loss ratio is $\$6.45\text{M} / \$10.0\text{M} = 64.5\%$.
> > - The relativities are $85.0/64.5 = 1.318$ low, $65.0/64.5 = 1.008$ middle and $50.0/64.5 = 0.775$ high.
> > - Weighted by premium they average $1.00$: $2.0(1.318) + 5.0(1.008) + 3.0(0.775) = 10.001$, over $10.0$.
> > - The ordered relativities show that credit explains loss the current plan misses. Before filing, the insurer should check with a GLM that the effect survives the other variables and that the tiers are credible.
> > - If the state prohibits credit, every tier pays relativity $1.00$. Relative to a credit-rated plan, high-score drivers pay $1.00 / 0.775 = 1.29$ times their indicated rate and low-score drivers $1.00 / 1.318 = 0.76$ times theirs.

## Federal law

The Fair Credit Reporting Act gives insurers a permissible purpose to obtain credit reports for underwriting. It requires an **adverse action notice** when a consumer is charged more or refused coverage because of information in the report ([[Insurance Data Regulation]]). The Supreme Court addressed what triggers that notice in *Safeco v. Burr* (2007). The FTC's 2007 study for Congress found scores to be effective predictors of auto claim risk, and also that scores differ markedly across racial and ethnic groups.

## State regulation

Many states follow the NCOIL model act on credit in personal insurance:

1. Credit may not be the sole basis to decline, cancel or non-renew.
2. A thin or missing credit file must be treated neutrally or on a filed, supported basis.
3. The consumer can ask to be re-scored at renewal.
4. Exceptions apply for extraordinary life circumstances such as serious illness, death of a spouse, divorce, job loss, identity theft or military deployment.

A few states go further. California, Hawaii and Massachusetts bar credit in private passenger auto rating.

> [!example]- What must the insurer do for this homeowner whose score fell after a serious illness? {Example}
> At renewal, a homeowner's insurance score has fallen sharply because of unpaid hospital bills after a serious illness, and the insurer's rating plan would raise her premium by $25\%$. Her state has adopted the NCOIL model provisions.
>
> > [!answer]-
> > - **Adverse action notice.** Because credit information is causing a higher premium, she must be told so, with the reason and how to obtain her credit report and dispute errors.
> > - **Reasonable exception.** Serious illness is a listed extraordinary life circumstance. On her written request, and with reasonable documentation, the insurer must provide a reasonable exception to its credit-based rating, for example rating her as though the illness-related deterioration had not occurred, or with a neutral score.
> > - **Re-scoring.** If she disputes an error and the report is corrected, the policy must be re-rated.
> > - **Not the sole reason.** The insurer could not non-renew her solely because of the credit change.

## The debate over its use

| For | Against |
| :--- | :--- |
| Strong, validated predictive power | No agreed causal mechanism |
| Cheap, objective and hard to manipulate | Disparate impact on minority and low-income consumers |
| Its use lowers premiums for most insureds | It penalises people for medical debt, recession job loss or other hardship |
| | Errors in credit files |

Predictive is not the same as permitted: both of the FTC's findings matter to the policy question. Credit scoring is a live case of [[Unfair Discrimination|unfair discrimination]] and proxy discrimination, raised in [[Predictive Analytics]] and [[Emerging Regulatory Issues]].

> [!trap] Thinking a ban removes the cost difference
> A ban does not remove the cost difference between score tiers. It moves it from low-score to high-score drivers, who then subsidize the low-score drivers.
