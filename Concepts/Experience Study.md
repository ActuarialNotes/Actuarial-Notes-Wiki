---
aliases:
  - Past Experience
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:64b80754d2d00147c29be6549a938b0e5bb35c5d680e57391bcb0e6b6edc46f4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Experience Study.md
---
An **Experience Study** measures how a block of policies has actually behaved, counting deaths, lapses, conversions or uses of a benefit against the exposure that could have produced them, so that the insurer can check its [[Actuarial Assumptions|assumptions]] and set new ones. It turns past experience into observed rates, compares them with expected rates, and blends the result with an industry table or prior assumption according to its [[Credibility|credibility]].

The observed rate in one cell of the study is

> $$\hat{q} = \frac{D}{E}$$

- $D$ is the number of events in the cell, such as deaths at one attained age or lapses in one policy year.
- $E$ is the exposure in the cell, in policy-years.

The study period, the cells (age, sex, smoker status, [[Underwriting|underwriting]] class, duration, face amount, distribution channel) and the event definitions are fixed before counting.

## Exact and actuarial exposure

Under the exact method, each policy contributes the time it was actually observed in the cell, from the later of entering the study or the start of the cell, to the earlier of leaving or the end of the cell. Dividing deaths by exact exposure estimates the [[Hazard Rate|force of mortality]] $\mu$, and the annual rate follows as $q = 1 - e^{-\mu}$.

Under the actuarial method, which estimates $q$ directly, a policy that leaves by the event being studied is exposed to the end of the cell, as if it had stayed. Other exits, such as a lapse in a mortality study, keep their exact exposure.

In an anniversary-based study each policy's time is split at its policy anniversaries, so that every piece falls in one policy year and one insurance age. Most insurers' select and lapse assumptions are indexed this way.

> [!example]- What are the exposure and mortality rate of this policy year by the exact and the actuarial methods? {Example}
> A study covers policy year 5 of a block of term policies. In the year, 9,600 policies stay in force throughout, 30 die and 400 lapse. Both deaths and lapses occur on average halfway through the year.
>
> > [!answer]-
> > - Under the exact method, each death and each lapse is exposed only to the middle of the year, so $E^{c} = 9{,}600 + 30(0.5) + 400(0.5) = 9{,}815$.
> > - The force of mortality is $\hat{\mu} = 30/9{,}815 = 0.003057$, so $\hat{q} = 1 - e^{-0.003057} = 0.003052$.
> > - Under the actuarial method, the 30 deaths are exposed to the end of the year and the lapses keep their half year, so $E = 9{,}600 + 30 + 200 = 9{,}830$.
> > - The rate is $\hat{q} = 30/9{,}830 = 0.003052$.
> > - The two methods agree to four decimal places because the rate is small.

## Actual-to-expected ratio

The study compares its events with the events the assumption being tested predicts, as an [[Actual vs Expected Analysis|actual-to-expected (A/E) ratio]]. Over a group of cells, it is

> $$\text{A/E} = \frac{\sum D}{\sum E\,q^{\text{exp}}}$$

- $q^{\text{exp}}$ is the expected rate from the table or assumption being tested, so $\sum E\,q^{\text{exp}}$ is the expected number of events.

The expected count must use the same table, the same age definition and the same select duration as the cells. Results are measured by count and by amount, because a mortality A/E weighted by face amount shows whether large policies, where the money is, behave differently.

> [!example]- What is the A/E ratio of the policy-year-5 cell against an expected rate of 0.0035? {Example}
> - The actuarial exposure is 9,830 policy-years, so the expected number of deaths is $9{,}830 \times 0.0035 = 34.4$.
> - The A/E ratio is $30/34.4 = 87.2\%$.

## Credibility-weighted assumption

A small cell gives a noisy A/E. The new assumption, as a multiple of the table, is

> $$\text{Assumption} = Z\,(\text{A/E}) + (1 - Z)\,(\text{prior})$$

- $Z$ is the credibility of the study's A/E ratio.
- The prior is the A/E ratio that would be assumed without the study, often 100% of an industry table.

Under [[Limited Fluctuation Credibility|limited fluctuation credibility]], full credibility for a claim count needs $n_F = (z/k)^2$ events, which is 1,082 at 90% probability and a 5% tolerance, and partial credibility is $Z = \sqrt{n/n_F}$. With the 30 deaths of policy year 5, $Z = \sqrt{30/1{,}082} = 0.17$, so that cell alone says little about the assumption. Cells are combined, or rates are graduated across ages, before a single cell drives a pricing assumption.

> [!example]- What is this block's new mortality assumption, and its new rate at an age where the table gives 0.0040? {Example}
> Across all durations, the block has 412 deaths against 480 expected on the current pricing basis of 100% of an industry table. The full credibility standard is 1,082 deaths.
>
> > [!answer]-
> > - The A/E ratio is $412/480 = 85.83\%$.
> > - The credibility is $Z = \sqrt{412/1{,}082} = 0.6170$.
> > - The assumption is $0.6170(85.83\%) + 0.3830(100\%) = 91.26\%$ of the table.
> > - The new rate at that age is $0.9126(0.0040) = 0.003650$.
> > - The experience is lighter than the table but only 62% credible, so the assumption moves less than halfway from 100% to 85.8%.

## The assumptions it sets

- **[[Mortality]]** studies give A/E ratios to an industry table by duration and class.
- **[[Lapse]]** studies give lapse rates by duration and around premium jumps, and persistency is one minus the cumulative lapse.
- **Conversion** studies give the share of term policies converted to permanent cover and the heavier mortality of those who convert.
- **[[Utilization]]** studies give the rate at which policyholders use a rider or option, such as a withdrawal benefit or an accelerated death benefit. This is a utilization assumption rather than a decrement.

## From past to future

The study measures the past, and the assumption describes the future. The actuary adjusts for mortality improvement from the middle of the study period to the valuation date, for changes in underwriting or product design, and for anti-selection, such as the healthier lives leaving after a premium increase. A study period with a pandemic, a premium increase or an underwriting change has to be adjusted or excluded. A margin is added where the assumption is used for reserves or capital.

> [!trap] Exposing other exits to the end of the year
> Under the actuarial method, only the decrement being studied is exposed to the end of the cell. In the policy-year-5 cell, exposing the 400 lapses to year-end as well gives 10,030 policy-years and a rate of 0.002991, understating mortality.
