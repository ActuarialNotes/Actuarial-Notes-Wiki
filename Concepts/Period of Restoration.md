---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:fae03c88ed17b5f142dc2139de4ca1ab6dcdf5e24b598030c7fd7c34afb5197b
  sources:
    - "ISO CP 00 30 10 12 Business Income (And Extra Expense) Coverage Form, F.3 'period of restoration' (p.9); A.5.c Extended Business Income 60 days; G.4 Extended Period of Indemnity, sha256:4b77049e08827380f912161468b9aef9b182853f5a217f50993546366d101b98 — https://forms.nationwideexcessandsurplus.com/FormsExternal/ContractForm?num=CP+00+30&ed=10-12"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Period of Restoration.md
---

The **Period of Restoration** is the time over which a business income form pays: it begins 72 hours after the direct physical loss for business income, or immediately for extra expense, and ends when the damaged property should be repaired, rebuilt or replaced with reasonable speed and similar quality, or earlier if the business resumes at a new permanent location. Its length is set by how long restoration should take, not by how long it actually takes or by the policy's expiration date, and an underwriter's estimate of its maximum length drives the probable maximum loss of [[Business Income Coverage|business income]].

> $$T = \min\left(t_R,\ t_N\right) - \left(t_0 + 3\right)$$

> $$t_R = \max_{p}\ \sum_{j \in p} d_j$$

> $$\text{PML}_{\text{BI}} = w \times T_{\max} + \text{EE} + \text{EBI}$$

- **Symbols:** $t_0$ is the day of the direct physical loss, the $+3$ is the 72-hour waiting period, $t_R$ is the day restoration with reasonable speed would be complete, $t_N$ is the day the business reopens at a new permanent location, and $T$ is the number of days business income is paid. $t_R$ is the longest path through the restoration tasks, where each path $p$ is a chain of tasks that must follow one another and $d_j$ is a task's duration. In the PML, $w$ is the daily net income plus continuing expenses at risk, $T_{\max}$ is the longest probable period, EE is the extra expense, and EBI is the extended business income after the property is restored.
- **When it begins:** The 72-hour waiting period acts as a time deductible on business income, so short interruptions are retained by the insured. It does not apply to extra expense, which pays from the moment of loss, and an endorsement can shorten or remove it for an additional premium.
- **When it ends:** The period ends at the theoretical completion date. An insured who rebuilds slowly is paid only for the time restoration should have taken, and one who rebuilds faster than expected is paid only until it actually reopens. The expiration of the policy does not cut it short.
- **Building codes:** The ISO definition does not include any increased period required by the enforcement of an ordinance or law that regulates the construction, use or repair of property, or requires its tearing down, or that requires testing for, monitoring, cleaning up or otherwise responding to pollutants.
- **Size and construction:** A large building, a complex structure, or one whose plans and permits take months to obtain takes longer to restore. A wide-area catastrophe lengthens every claim at once, because contractors and materials are scarce.
- **Specialized equipment:** A custom press, kiln or production line may have a lead time far longer than the building, and it often sets the critical path. An underwriter asks whether a spare or a used replacement could be found.
- **Seasonality:** Weather can stop construction for part of the year, and a business that misses its peak season may lose most of a year's income even though restoration takes only months.
- **Contingent dependencies:** Dependent property coverage applies the same idea to a key supplier or customer the insured does not own. Its period of restoration is set by how long it would take to restore the dependent property, which the insured cannot control or easily inspect.
- **Extended business income:** After the property is restored, the form pays for a further period, 60 days on the current ISO form, while sales recover. The extended period of indemnity option replaces it with a longer period shown in the declarations, for businesses whose customers take months to return. For the coinsurance basis and the coverage itself, see [[Business Income Coverage]].

> [!example]- Estimating the Maximum Period of Restoration and the PML {Example}
> A food processor's plant depends on a custom packaging line. An underwriter estimates the longest probable restoration after a total loss by fire: 3 weeks of debris removal, 6 weeks for plans and permits, 20 weeks to rebuild, and 4 more weeks because the current building code requires a sprinkler system and fire walls the old plant lacked. The new packaging line would be ordered at the end of week 3, has a 30-week lead time, and takes 4 weeks to install once both it and the building are ready. Net income plus continuing expenses is \$45,000 a week, and extra expense is estimated at \$60,000. The business income form is the unendorsed ISO CP 00 30. Estimate the maximum period of restoration and the probable maximum loss of business income before any extended period.
>
> > [!answer]-
> > The form's period of restoration does not include any increased period required by an ordinance or law that regulates construction, so the 4 code weeks are left out of the building path. The building path and the machinery path run in parallel, and installation can start only when both are done.
> > $$
> > \begin{align*}
> > t_{\text{building}} &= 3 + 6 + 20 \\
> > &= 29 \text{ weeks} \\
> > t_{\text{machine}} &= 3 + 30 \\
> > &= 33 \text{ weeks} \\
> > t_R &= \max(29,\ 33) + 4 \\
> > &= 37 \text{ weeks}
> > \end{align*}
> > $$
> > The period runs from 72 hours after the fire, so business income is paid for 256 of the 259 days.
> > $$
> > \begin{align*}
> > T_{\max} &= 37 \times 7 - 3 \\
> > &= 256 \text{ days} \\
> > \text{PML} &= 45{,}000 \times \frac{256}{7} + 60{,}000 \\
> > &= 1{,}705{,}714
> > \end{align*}
> > $$
> > The machinery sets the period here, 4 weeks longer than the building path. With a spare line on hand the building path would govern, and the period would be $29 + 4 = 33$ weeks. The 4 code weeks would still be spent rebuilding, but under the unendorsed form they fall outside the period of restoration, so the income lost in them is the insured's. That is why an underwriter asks about equipment lead times as well as construction, and about building code upgrades the form will not pay for.

> [!example]- Is the Standard Extended Period Enough? {Example}
> When the food processor above reopens, it expects to have lost customers: sales start 40% below normal and recover in a straight line to normal over 16 weeks. The weekly business income at risk is \$45,000. How much of the recovery loss does the standard 60-day extended business income cover, and what would an extended period of indemnity of 120 days add?
>
> > [!answer]-
> > The shortfall in week $u$ after reopening is $0.40(1 - u/16)$ of \$45,000, which is a triangle with total area $\tfrac{1}{2}(0.40)(16)(45{,}000)$. Over the first $a$ weeks the loss is $45{,}000 \times 0.40\,(a - a^2/32)$, and 60 days is $a = 60/7 = 8.571$ weeks.
> > $$
> > \begin{align*}
> > \text{Total} &= \tfrac{1}{2}(0.40)(16)(45{,}000) \\
> > &= 144{,}000 \\
> > \text{Covered} &= 18{,}000\left(8.571 - \frac{8.571^2}{32}\right) \\
> > &= 112{,}959 \\
> > \text{Uncovered} &= 144{,}000 - 112{,}959 \\
> > &= 31{,}041
> > \end{align*}
> > $$
> > The standard form leaves about \$31,000 with the insured. A 120-day extended period of indemnity covers more than the 112 days the recovery takes, so it pays the full \$144,000, and the underwriter's PML for this insured should include it.

> [!tip]- How it appears on the exam
> - **DISC-RM:** Questions ask which factors influence the maximum period of restoration, such as building size and construction, code requirements, specialized machinery, seasonal construction limits and dependencies on suppliers, and separately which factors influence the loss during that period. Applied questions give a set of restoration tasks or a description of the insured's operations and ask for the longest probable period, or why an underwriter would expect it to be longer than the time to rebuild.

> [!warning]- Exam traps
> - **Should, not did:** The period ends when restoration should be complete with reasonable speed. Using the actual completion date overpays an insured who delays and underpays one who finishes early but still loses income.
> - **The waiting period applies only to business income:** Extra expense begins at the time of loss. Taking 72 hours off the extra expense understates the claim.
> - **Expiration doesn't end it:** A loss in the last week of the policy is paid for the full period of restoration, even though the policy expires part way through.
> - **The longest path governs:** Restoration ends when the slowest of the parallel tasks is done. Adding the machinery lead time to the construction time double counts, and ignoring it understates the period.
> - **Extended business income is separate:** The period of restoration ends when the property is restored. The loss while sales recover is paid only under extended business income, for 60 days unless an extended period of indemnity is bought.
