---
aliases:
  - Past Experience
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:086c75d2964e19b57be83a55e6443aa114ec4d8e61e0c68b41360a02231d2925
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Experience Study.md
---
An **Experience Study** measures how a block of policies has actually behaved, counting deaths, lapses, conversions or uses of a benefit against the exposure that could have produced them, so that the insurer can check its [[Actuarial Assumptions|assumptions]] and set new ones. The study turns past experience into observed rates, compares them with expected rates as [[Actual vs Expected Analysis|actual-to-expected (A/E) ratios]], and blends the result with an industry table or prior assumption according to its [[Credibility|credibility]].

> $$\hat{q} = \frac{D}{E}$$

> $$\text{A/E} = \frac{\sum D}{\sum E\,q^{\text{exp}}}$$

> $$\text{Assumption} = Z\,(\text{A/E}) + (1 - Z)\,(\text{prior})$$

- **Symbols:** $D$ is the number of events in a cell, such as deaths at one attained age or lapses in one policy year, and $E$ is the exposure in that cell, in policy-years. $q^{\text{exp}}$ is the expected rate from the table or assumption being tested, so $\sum E\,q^{\text{exp}}$ is the expected number of events. $Z$ is the credibility of the study's A/E ratio, and the prior is the A/E ratio that would be assumed without the study, often 100% of an industry table.
- **Exact exposure:** Each policy contributes the time it was actually observed in the cell, from the later of entering the study or the start of the cell, to the earlier of leaving or the end of the cell. Dividing deaths by exact exposure estimates the [[Hazard Rate|force of mortality]] $\mu$, and the annual rate follows as $q = 1 - e^{-\mu}$.
- **Actuarial and anniversary exposure:** To estimate $q$ directly, a policy that leaves by the event being studied is exposed to the end of the cell, as if it had stayed. Other exits, such as a lapse in a mortality study, keep their exact exposure. In an anniversary-based study each policy's time is split at its policy anniversaries, so that every piece falls in one policy year and one insurance age, which is how most insurers' select and lapse assumptions are indexed.
- **Study design:** The study period, the cells (age, sex, smoker status, [[Underwriting|underwriting]] class, duration, face amount, distribution channel) and the event definitions are fixed before counting. Results are measured by count and by amount, because a mortality A/E weighted by face amount shows whether large policies, where the money is, behave differently.
- **Credibility:** A small cell gives a noisy A/E. Under [[Limited Fluctuation Credibility|limited fluctuation credibility]], full credibility for a claim count needs $n_F = (z/k)^2$ events, which is 1,082 at 90% probability and a 5% tolerance, and partial credibility is $Z = \sqrt{n/n_F}$. Cells are combined, or rates are graduated across ages, before a single cell drives a pricing assumption.
- **The assumptions it sets:** [[Mortality]] studies give A/E ratios to an industry table by duration and class. [[Lapse]] studies give lapse rates by duration and around premium jumps, and persistency is one minus the cumulative lapse. Conversion studies give the share of term policies converted to permanent cover and the heavier mortality of those who convert. Utilization studies give the rate at which policyholders use a rider or option, such as a withdrawal benefit or an accelerated death benefit, which is a [[Utilization|utilization]] assumption rather than a decrement.
- **From past to future:** The study measures the past, and the assumption describes the future. The actuary adjusts for mortality improvement since the study period, for changes in underwriting or product design, and for anti-selection, such as the healthier lives leaving after a premium increase. A margin is added where the assumption is used for reserves or capital.

> [!example]- Exposure Two Ways in One Policy Year {Example}
> A study covers policy year 5 of a block of term policies. In the year, 9,600 policies stay in force throughout, 30 die and 400 lapse. Both deaths and lapses occur on average halfway through the year. Find the exposure and the mortality rate by the exact and the actuarial methods, and the A/E ratio against an illustrative expected rate of 0.0035.
>
> > [!answer]-
> > Under the exact method, each death and each lapse is exposed only to the middle of the year.
> > $$
> > \begin{align*}
> > E^{c} &= 9{,}600 + 30(0.5) + 400(0.5) \\
> > &= 9{,}815 \\
> > \hat{\mu} &= \frac{30}{9{,}815} \\
> > &= 0.003057 \\
> > \hat{q} &= 1 - e^{-0.003057} \\
> > &= 0.003052
> > \end{align*}
> > $$
> > Under the actuarial method, the 30 deaths are exposed to the end of the year, while the lapses keep their half year.
> > $$
> > \begin{align*}
> > E &= 9{,}600 + 30(1) + 400(0.5) \\
> > &= 9{,}830 \\
> > \hat{q} &= \frac{30}{9{,}830} \\
> > &= 0.003052 \\
> > \text{A/E} &= \frac{30}{9{,}830(0.0035)} \\
> > &= 87.2\%
> > \end{align*}
> > $$
> > The two methods agree to four decimal places because the rate is small. With only 30 deaths, $Z = \sqrt{30/1{,}082} = 0.17$, so this cell alone says little about the assumption.

> [!example]- Setting a Mortality Assumption with Partial Credibility {Example}
> Across all durations, the same block has 412 deaths against 480 expected on the current pricing basis of 100% of an industry table. Using a full credibility standard of 1,082 deaths, set the new mortality assumption as a percentage of the table, and find the new rate at an age where the table gives 0.0040.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{A/E} &= \frac{412}{480} \\
> > &= 85.83\% \\
> > Z &= \sqrt{\frac{412}{1{,}082}} \\
> > &= 0.6170 \\
> > \text{Assumption} &= 0.6170(85.83\%) + 0.3830(100\%) \\
> > &= 91.26\%
> > \end{align*}
> > $$
> > The new rate at that age is $0.9126(0.0040) = 0.003650$. The block's experience is lighter than the table, but only 62% credible, so the assumption moves less than halfway from 100% to 85.8%. Before using it, the actuary checks that the study period was not unusual and allows for improvement from the middle of the study period to the valuation date.

> [!tip]- How it appears on the exam
> - **ILA-101:** Questions ask candidates to describe the types of assumptions an insurer sets, such as mortality, lapse, premium persistency, conversion and utilization, and how an experience study is designed to measure each one, including the choice of cells, study period and exposure method.
> - **ILA-101:** Calculation questions give policy-level or grouped data and ask for exposures, observed rates and A/E ratios, then for a credibility-weighted assumption, followed by a written answer on whether the result should replace the current assumption.

> [!warning]- Exam traps
> - **Exposure for the event studied:** Under the actuarial method, only the decrement being studied is exposed to the end of the cell. Exposing lapses to year-end in a mortality study overstates the exposure and understates the mortality rate.
> - **Count versus amount:** An A/E by policy count and an A/E by face amount can differ widely when large policies behave differently. Pricing and reserves depend on amounts, so a count-based result alone can mislead.
> - **Expected on the right basis:** The expected count must use the same table, the same age definition and the same select duration as the cells. Mixing age last birthday with age nearest birthday shifts every expected rate by about half a year of age.
> - **Credibility of a cell:** A striking A/E in a small cell is usually noise. With 30 events the credibility is under 20%, so the cell supports only a small move from the prior.
> - **History is not the assumption:** A study period with a pandemic, a premium increase or an underwriting change has to be adjusted or excluded before the result becomes a forward-looking assumption.
