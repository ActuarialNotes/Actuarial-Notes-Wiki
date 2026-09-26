---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4bd5ba43710b6e1728e3f58100e1c1d5c25c602b992d9dad576235ae25fcfc2a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Credit-Based Insurance Scoring.md
---

**Credit-Based Insurance Scoring** is the use of a score built from an applicant's credit report — payment history, outstanding debt, length of credit history, recent applications for credit, mix of credit — to underwrite and rate personal auto and homeowners insurance. It is one of the most predictive [[Rating Variable|rating variables]] U.S. insurers use and one of the most contested, because its predictive power is well documented while its causal link to loss and its effect on protected groups are disputed.

> $$\text{LR relativity}_k = \frac{\text{Loss ratio}_k}{\text{Loss ratio}_{\text{total}}}$$

- **How its value is shown.** Group policies by score tier $k$ and compute each tier's [[Loss Ratio|loss ratio]] at current rates that do not use credit. If the relativities move steadily with the score — worst scores highest — the score explains loss the existing rating plan misses. A multivariate model ([[Generalized Linear Model|GLM]]) confirms the effect net of the other variables, as with any rating variable in [[Classification Ratemaking]].
- **The insurance score is not the lending score.** It is built to predict insurance loss, not default, and state laws based on the NCOIL model bar income, gender, address, ethnic group, religion, marital status and nationality from its inputs.
- **Federal law.** The Fair Credit Reporting Act gives insurers a permissible purpose to obtain credit reports for underwriting and requires an **adverse action notice** when a consumer is charged more or refused coverage because of information in the report; the Supreme Court addressed what triggers that notice in *Safeco v. Burr* (2007). The FTC's 2007 study for Congress found scores to be effective predictors of auto claim risk, and also that scores differ markedly across racial and ethnic groups.
- **State regulation.** Many states follow the NCOIL model act on credit in personal insurance: credit may not be the sole basis to decline, cancel or non-renew; a thin or missing credit file must be treated neutrally or on a filed, supported basis; the consumer can ask to be re-scored at renewal; and exceptions apply for extraordinary life circumstances such as serious illness, death of a spouse, divorce, job loss, identity theft or military deployment. A few states go further — California, Hawaii and Massachusetts bar credit in private passenger auto rating.
- **The debate, as the syllabus frames it.** *For:* strong, validated predictive power; cheap, objective and hard to manipulate; its use lowers premiums for most insureds. *Against:* no agreed causal mechanism; disparate impact on minority and low-income consumers; penalising people for medical debt, recession job loss or other hardship; errors in credit files. This is a live case of [[Unfair Discrimination]] and proxy discrimination — see also [[Predictive Analytics]] and [[Emerging Regulatory Issues]].

> [!example]- Testing Credit as a Rating Variable {Example}
> An auto insurer that does not yet use credit reviews a year of experience at current rates, grouped by insurance score:
>
> - Low score: premium $\$2.0$M, losses $\$1.70$M
> - Middle score: premium $\$5.0$M, losses $\$3.25$M
> - High score: premium $\$3.0$M, losses $\$1.50$M
>
> Compute the loss ratio relativities, and describe the effect of a state ban on credit.
>
> > [!answer]-
> > The total loss ratio is $\$6.45\text{M} / \$10.0\text{M} = 64.5\%$.
> >
> > $$
> > \begin{align*}
> > \text{Low} &= \frac{85.0\%}{64.5\%} \\
> > &= 1.318 \\[4pt]
> > \text{Middle} &= \frac{65.0\%}{64.5\%} \\
> > &= 1.008 \\[4pt]
> > \text{High} &= \frac{50.0\%}{64.5\%} \\
> > &= 0.775
> > \end{align*}
> > $$
> >
> > The premium-weighted average relativity is $1.00$, as it must be:
> >
> > $$
> > \begin{align*}
> > \frac{2.0(1.318) + 5.0(1.008) + 3.0(0.775)}{10.0} &= \frac{10.001}{10.0} \\
> > &= 1.00
> > \end{align*}
> > $$
> >
> > The ordered relativities show that credit explains loss the current plan misses. Before filing, the insurer should check with a GLM that the effect survives the other variables and that the tiers are credible.
> >
> > **A ban.** If the state prohibits credit, every tier pays relativity $1.00$. Relative to a credit-rated plan, high-score drivers pay $1.00 / 0.775 = 1.29$ times their indicated rate and low-score drivers $1.00 / 1.318 = 0.76$ times theirs. A ban does not remove the cost difference; it moves it from low-score to high-score drivers. Whether that transfer is fair is the policy question — how big it is, is the actuary's.

> [!example]- An Extraordinary Life Circumstance {Example}
> At renewal, a homeowner's insurance score has fallen sharply because of unpaid hospital bills after a serious illness, and the insurer's rating plan would raise her premium by $25\%$. Her state has adopted the NCOIL model provisions. What must the insurer do?
>
> > [!answer]-
> > - **Adverse action notice.** Because credit information is causing a higher premium, she must be told so, with the reason and how to obtain her credit report and dispute errors.
> > - **Reasonable exception.** Serious illness is a listed extraordinary life circumstance. On her written request, and with reasonable documentation, the insurer must provide a reasonable exception to its credit-based rating — for example, rating her as though the illness-related deterioration had not occurred, or with a neutral score.
> > - **Re-scoring.** If she disputes an error and the report is corrected, the policy must be re-rated.
> > - **Not the sole reason.** The insurer could not non-renew her solely because of the credit change.
> >
> > The provisions mark the line regulators have drawn: credit is admissible as a statistical predictor, but not where the credit damage reflects a misfortune rather than the behaviour the score is taken to measure.
