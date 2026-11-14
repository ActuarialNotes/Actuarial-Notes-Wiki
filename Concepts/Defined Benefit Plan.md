---
aliases:
  - Benefit Plan
  - DB
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:52d524c9623564c4b0ec9987c370e84ab736011c2aa82ba9e676de04c873b844
  sources:
    - "SOA Exam ALTAM sample written-answer solutions (Jan 2026), Q37-Q38 pp.76-78, Q40 pp.80-83, Q42 p.86, Q47 p.94, sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf"
    - "SOA Exam ALTAM sample written-answer questions (Jan 2026), Q38-Q40 pp.71-73, Q42 p.77, Q47 p.85, sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf"
    - "The Pensions Regulator (UK), Trustee toolkit: How a DB scheme works, Tutorial 1, pp.2-3, 9, sha256:99f71eb7fbadec8b4143d239503d18a10b1ed18454401729aa1a6a9f3704d60f — https://trusteetoolkit.thepensionsregulator.gov.uk/pluginfile.php/133/mod_data/content/3071/How%20a%20DB%20scheme%20works%20-%20Tutorial%201%20The%20basics.pdf"
    - "The Pensions Authority (Ireland), Career average defined benefit schemes, whole page, sha256:ca61f10538960af012606f48a5be0889d3a74c7d093186ec50851021893178c2 — https://pensionsauthority.ie/?p=3931"
    - "SOA Tables for Exam FAM (Oct 2024), SULT at i=0.05, pp.20-21 (ages 50, 55, 60, 65, 70-72, 80), sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
    - "U.S. Department of Labor, Types of Retirement Plans (https://www.dol.gov/general/topic/retirement/typesofplans), read 2026-10-31 by web fetch; no sha256 — the site refuses scripted downloads"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Defined Benefit Plan.md
---
A **Defined Benefit Plan** (DB plan) is a [[Retirement Plan|retirement plan]] that promises each member a pension set by a formula, usually an accrual rate times years of service times a salary measure. The [[Plan Sponsor|plan sponsor]] contributes whatever it takes to fund that promise.

The sponsor bears the investment and [[Mortality|longevity]] risks and, in a final salary plan, salary inflation. Poor returns or longer lifetimes raise the contributions the sponsor must make, and the member's pension does not move with the fund. Compare the [[Defined Contribution Plan|defined contribution plan]], where the member bears these risks.

The salary measure names the three classic designs. In a final average salary (FAS) plan, the annual pension of a member who retires after $n$ years of service is

> $$B_{\text{FAS}} = n\,\alpha\,S_{\text{Fin}}$$

- $\alpha$ is the accrual rate, typically 1% to 2%.
- $S_{\text{Fin}}$ is the average salary over the last few years before retirement.

The replacement ratio is the pension as a share of the salary in the final year before retirement.

> [!example]- What is this member's replacement ratio under a FAS plan? {Example}
> A member joins at 35 and retires at exact age 65 with 30 years' service. Salary in the year of age 35 to 36 is $\$60{,}000$ and rises 3% a year. The accrual rate is 1.5%, and $S_{\text{Fin}}$ is the average of the last three years' salaries.
>
> > [!answer]-
> > - Salary in the year of age $y$ to $y+1$ is $60{,}000\,(1.03)^{y-35}$.
> > - The last three years are ages 62, 63 and 64, with salaries $133{,}277$, $137{,}276$ and $141{,}394$.
> > - Their average is $S_{\text{Fin}} = 137{,}316$.
> > - The pension is $B_{\text{FAS}} = 30 \times 0.015 \times 137{,}316 = 61{,}792$.
> > - The replacement ratio is $61{,}792/141{,}394 = 43.7\%$.

## Career average earnings

In a career average earnings (CAE) plan, the annual pension is

> $$B_{\text{CAE}} = \alpha \sum_{k=0}^{n-1} S_{x_0+k}$$

- $S_y$ is the salary earned in the year of age $y$ to $y+1$.
- $x_0$ is the age at entry.

A member whose earnings grow gets a lower pension from a career average plan than from a comparable final salary plan, so a CAE plan needs a higher $\alpha$ for the same replacement ratio.

> [!example]- What is this member's replacement ratio under a CAE plan? {Example}
> A member joins at 35 and retires at exact age 65 with 30 years' service. Salary in the year of age 35 to 36 is $\$60{,}000$ and rises 3% a year. The accrual rate is 1.5%. Under a FAS plan the replacement ratio is 43.7%.
>
> > [!answer]-
> > - The total career salary is $\sum_{y=35}^{64} 60{,}000\,(1.03)^{y-35} = 2{,}854{,}525$.
> > - The pension is $B_{\text{CAE}} = 0.015 \times 2{,}854{,}525 = 42{,}818$.
> > - The final year's salary is $141{,}394$, so the replacement ratio is $42{,}818/141{,}394 = 30.3\%$.
> > - Matching the FAS plan's 43.7% would need $\alpha \approx 2.16\%$.

## Career average revalued earnings

In a career average revalued earnings (CARE) plan, each year's salary is revalued to retirement by an index before it is summed, so the annual pension is

> $$B_{\text{CARE}} = \alpha \sum_{k=0}^{n-1} S_{x_0+k}\,\frac{I_{\text{ret}}}{I_{x_0+k}}$$

- $I_y$ is the revaluation index (of prices or wages) at age $y$, and $I_{\text{ret}}$ is its value at retirement.

## Projected salaries

Future salaries are projected with a salary scale $s_y$. For a member aged $x$ with known salary $S_x$, the salary in the year of age $y$ to $y+1$ is

> $$S_y = S_x\,\frac{s_y}{s_x}$$

The benefit is paid as a [[Life Annuity|life annuity]], so its value is $B$ times an annuity factor discounted for interest and survival to retirement. The sponsor's cost is measured by [[Valuation|valuation]]: the [[Actuarial Accrued Liability|actuarial accrued liability]] for service to date and the [[Normal Cost|normal cost]] for the year's accrual. The traditional unit credit (TUC) method values the accrued benefit on current salary, and the projected unit credit (PUC) method on projected salary.

> [!example]- What is the actuarial liability for this member's accrued benefit under TUC and under PUC? {Example}
> An active member is exactly 50 with 15 years' service. Salary in the year of age 49 to 50 was $\$80{,}000$, and $s_y = 1.03^{\,y}$. The plan pays $1.5\%$ of the final year's salary per year of service from 65, monthly for life. Retirement at 65 is the only exit apart from death, ${}_{15}E_{50} = 0.46151$ and $\ddot{a}^{(12)}_{65} = 13.0870$ (SUSM, 5%).
>
> > [!answer]-
> > - On current salary, the accrued benefit is $B_{\text{TUC}} = 15 \times 0.015 \times 80{,}000 = 18{,}000$.
> > - The projected final salary is $S_{64} = 80{,}000 \times s_{64}/s_{49} = 80{,}000 \times 1.03^{15} = 124{,}637$.
> > - On projected salary, the accrued benefit is $B_{\text{PUC}} = 15 \times 0.015 \times 124{,}637 = 28{,}043$.
> > - $AL_{\text{TUC}} = 18{,}000 \times 0.46151 \times 13.0870 = 108{,}716$.
> > - $AL_{\text{PUC}} = 28{,}043 \times 0.46151 \times 13.0870 = 169{,}376$, which is 56% more because it prices the expected salary growth.

> [!trap] Projecting the final salary one year too far
> Salary in the year of age $y$ to $y+1$ is $S_x\,s_y/s_x$, so the final year before retirement at 65 uses $s_{64}$. Projecting with $s_{65}/s_x$ adds a year of growth, and FAS over the last three years uses ages 62, 63 and 64, not 63, 64 and 65.
