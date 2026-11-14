---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:4a679a113737a0c03bc5739de42ffe80f82100c5770bb029d6f36faab53a8673
  sources:
    - "ISO CP 00 30 10 12 Business Income (And Extra Expense) Coverage Form, F.3 'period of restoration' (p.9); A.5.c Extended Business Income 60 days; G.4 Extended Period of Indemnity, sha256:4b77049e08827380f912161468b9aef9b182853f5a217f50993546366d101b98 — https://forms.nationwideexcessandsurplus.com/FormsExternal/ContractForm?num=CP+00+30&ed=10-12"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Period of Restoration.md
---

The **Period of Restoration** is the time over which a [[Business Income Coverage|business income]] form pays, from 72 hours after the direct physical loss until the damaged property should be repaired, rebuilt or replaced with reasonable speed and similar quality, or until the business resumes at a new permanent location if that is earlier. Its length is set by how long restoration should take, not by how long it actually takes or by the policy's expiration date.

If the loss happens on day $t_0$, the number of days business income is paid is

> $$T = \min\left(t_R,\ t_N\right) - \left(t_0 + 3\right)$$

- $t_R$ is the day restoration with reasonable speed would be complete.
- $t_N$ is the day the business reopens at a new permanent location.
- The $+3$ is the 72-hour waiting period.

The 72-hour waiting period acts as a time deductible on business income, so short interruptions are retained by the insured. It does not apply to extra expense, which pays from the moment of loss, and an endorsement can shorten or remove it for an additional premium.

The period ends at the theoretical completion date. An insured who rebuilds slowly is paid only for the time restoration should have taken, and one who rebuilds faster than expected is paid only until it actually reopens. The expiration of the policy does not cut it short, so a loss in the last week of the policy is paid for the full period.

## The maximum period of restoration

An underwriter estimates the maximum period of restoration, the longest the period could probably run after a loss at the location. Restoration ends when the slowest chain of tasks is done, so

> $$t_R = \max_{p}\ \sum_{j \in p} d_j$$

- $p$ is a path, a chain of restoration tasks that must follow one another.
- $d_j$ is the duration of task $j$.

The factors that lengthen it are physical:

1. **Size and construction.** A large building, a complex structure, or one whose plans and permits take months to obtain takes longer to restore. A wide-area catastrophe lengthens every claim at once, because contractors and materials are scarce.
2. **Building codes.** The ISO definition does not include any increased period required by the enforcement of an ordinance or law that regulates the construction, use or repair of property, or requires its tearing down, or that requires testing for, monitoring, cleaning up or otherwise responding to pollutants.
3. **Specialized equipment.** A custom press, kiln or production line may have a lead time far longer than the building, and it often sets the critical path. An underwriter asks whether a spare or a used replacement could be found.
4. **The season.** Weather can stop construction for part of the year.
5. **Contingent dependencies.** Dependent property coverage applies the same idea to a key supplier or customer the insured does not own. Its period of restoration is set by how long it would take to restore the dependent property, which the insured cannot control or easily inspect.

Seasonality of sales changes how much income is lost, not how long restoration takes. A business that misses its peak season may lose most of a year's income even though restoration takes only months.

The maximum period drives the [[Probable Maximum Loss|probable maximum loss]] of business income, which is

> $$\text{PML}_{\text{BI}} = w \times T_{\max} + \text{EE} + \text{EBI}$$

- $w$ is the daily net income plus continuing expenses at risk.
- $T_{\max}$ is the longest probable period of restoration, in days.
- $\text{EE}$ is the extra expense.
- $\text{EBI}$ is the extended business income after the property is restored.

> [!example]- What are the maximum period of restoration and the probable maximum loss of business income for this plant? {Example}
> A food processor's plant depends on a custom packaging line. After a total loss by fire, an underwriter estimates 3 weeks of debris removal, 6 weeks for plans and permits, 20 weeks to rebuild, and 4 more weeks because the current building code requires a sprinkler system and fire walls the old plant lacked. The new packaging line would be ordered at the end of week 3, has a 30-week lead time, and takes 4 weeks to install once both it and the building are ready. Net income plus continuing expenses is \$45,000 a week, and extra expense is estimated at \$60,000. The business income form is the unendorsed ISO CP 00 30. Leave out any extended period.
>
> > [!answer]-
> > - The form excludes any increased period required by an ordinance or law, so the 4 code weeks are left out.
> > - The building path is $3 + 6 + 20 = 29$ weeks.
> > - The machinery path is $3 + 30 = 33$ weeks.
> > - Installation starts when both paths are done, so $t_R = \max(29,\ 33) + 4 = 37$ weeks.
> > - The period runs from 72 hours after the fire, so $T_{\max} = 37 \times 7 - 3 = 256$ days.
> > - The PML is $45{,}000 \times 256/7 + 60{,}000 = \$1{,}705{,}714$.
> > - The machinery sets the period. With a spare line on hand, the building path would govern and the period would be $29 + 4 = 33$ weeks.

## Extended business income

After the property is restored, the form pays for a further period, 60 days on the current ISO form, while sales recover. The extended period of indemnity option replaces it with a longer period shown in the declarations, for businesses whose customers take months to return.

> [!example]- How much of this recovery loss do 60 days of extended business income cover, and how much would a 120-day extended period of indemnity cover? {Example}
> When the food processor reopens, sales start 40% below normal and recover in a straight line to normal over 16 weeks. The weekly business income at risk is \$45,000.
>
> > [!answer]-
> > - The shortfall in week $u$ after reopening is $0.40(1 - u/16) \times 45{,}000$, a triangle.
> > - The total loss is $\tfrac{1}{2} \times 0.40 \times 16 \times 45{,}000 = \$144{,}000$.
> > - Over the first $a$ weeks the loss is $18{,}000\,(a - a^2/32)$.
> > - 60 days is $a = 60/7 = 8.571$ weeks, so 60 days cover $\$112{,}959$ and leave about $\$31{,}041$ with the insured.
> > - The recovery takes $16 \times 7 = 112$ days, so a 120-day extended period of indemnity covers the full $\$144{,}000$.

> [!trap] Taking the waiting period off extra expense
> The 72 hours apply only to business income. Extra expense is paid from the moment of loss, so subtracting 72 hours from it understates the claim.
