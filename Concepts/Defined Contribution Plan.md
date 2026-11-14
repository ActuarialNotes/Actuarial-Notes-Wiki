---
aliases:
  - DC
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:450bce8b16566ed63d3cc0111a7a4194ad9384d84b304047448d122fbdbbfbe6
  sources:
    - "SOA Exam ALTAM sample written-answer solutions (Jan 2026), Q37-Q38 pp.76-78, Q40 pp.80-83, Q42 p.86, Q47 p.94, sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf"
    - "SOA Exam ALTAM sample written-answer questions (Jan 2026), Q38-Q40 pp.71-73, Q42 p.77, Q47 p.85, sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf"
    - "The Pensions Regulator (UK), Trustee toolkit: How a DB scheme works, Tutorial 1, pp.2-3, 9, sha256:99f71eb7fbadec8b4143d239503d18a10b1ed18454401729aa1a6a9f3704d60f — https://trusteetoolkit.thepensionsregulator.gov.uk/pluginfile.php/133/mod_data/content/3071/How%20a%20DB%20scheme%20works%20-%20Tutorial%201%20The%20basics.pdf"
    - "U.S. Department of Labor, Types of Retirement Plans (https://www.dol.gov/general/topic/retirement/typesofplans), read 2026-10-31 by web fetch; no sha256 — the site refuses scripted downloads"
    - "SOA RET-101 syllabus 2026-2027, Topics 1 and 3, pp.2-4, 7, sha256:d33bc465548ca0595f8f716f3bcd30ef23c54843c4ed46a6d01ba46c67d10bc6 — https://www.soa.org/globalassets/assets/files/edu/2026/ret-101/2026-2027-ret-101-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Defined Contribution Plan.md
---
A **Defined Contribution Plan** (DC plan) is a [[Retirement Plan|retirement plan]] in which the employer and member pay a fixed contribution rate $c$ of salary into the member's own account. The retirement income is whatever the accumulated account can buy, typically a [[Life Annuity|life annuity]] bought at retirement.

The contribution is promised and the benefit is not. The member bears the risks a [[Defined Benefit Plan|defined benefit plan]] leaves with the [[Plan Sponsor|plan sponsor]]: investment returns before retirement, annuity prices (interest rates and [[Mortality|longevity]]) at retirement, and, if no annuity is bought, outliving the account. The sponsor's cost is fixed at $c$ times payroll.

If each year's contribution is paid at its start and the account earns $i$ a year, the account at retirement after $n$ years is

> $$F_{x_0+n} = \sum_{k=0}^{n-1} c\,S_{x_0+k}\,(1+i)^{\,n-k}$$

- $x_0$ is the age at entry.
- $S_y$ is the salary in the year of age $y$ to $y+1$.

With monthly contributions, a common approximation is mid-year timing, $(1+i)^{n-k-1/2}$.

The annual pension the account buys is

> $$P = \frac{F_{x_0+n}}{\ddot{a}^{(12)}_{x_0+n}}$$

- $\ddot{a}^{(12)}_{x_0+n}$ is the price at retirement of an annuity of 1 a year, paid monthly for life.

Lower interest rates or longer lifetimes raise the annuity price at retirement and reduce the pension, so an annuity price or a pension projected before retirement is not guaranteed.

The replacement ratio, against the final year's salary, is

> $$R = \frac{P}{S_{x_0+n-1}}$$

## Salary growing at a constant rate

When salary grows at a rate $g$ a year, the sum is geometric and the account at retirement is

> $$F_{x_0+n} = c\,S_{x_0}(1+i)^n\, \frac{1-k^n}{1-k}$$

- $k = (1+g)/(1+i)$.

> [!example]- What is this member's replacement ratio? {Example}
> A member joins at 35 with salary $\$50{,}000$ in the year of age 35 to 36. Salaries rise 3.5% a year, 10% of salary is contributed at the start of each year to age 65, and the account earns 6%. At 65 the account buys a monthly life annuity at $\ddot{a}^{(12)}_{65} = 13.0870$.
>
> > [!answer]-
> > - With $k = 1.035/1.06$ and $n = 30$, the account is $F_{65} = 5{,}000\,(1.06)^{30}\,\frac{1 - k^{30}}{1 - k} = 5{,}000 \times 124.516 = 622{,}580$.
> > - The pension is $P = 622{,}580/13.0870 = 47{,}572$.
> > - The final year's salary is $S_{64} = 50{,}000\,(1.035)^{29} = 135{,}594$.
> > - The replacement ratio is $R = 47{,}572/135{,}594 = 35.1\%$.

## Required contribution rate

The account is proportional to $c$, so the contribution rate that meets a target replacement ratio $R^{*}$ is

> $$c^{*} = c\,\frac{R^{*}}{R}$$

- $R$ is the replacement ratio the rate $c$ gives.

> [!example]- What contribution rate gives this member a 60% replacement ratio if the account earns 6%, and if it earns 4%? {Example}
> At a 10% contribution rate, the member's replacement ratio is $35.084\%$ if the account earns 6% and $25.588\%$ if it earns 4%.
>
> > [!answer]-
> > - At 6%, $c^{*} = 0.10 \times 0.60/0.35084 = 17.1\%$.
> > - At 4%, $c^{*} = 0.10 \times 0.60/0.25588 = 23.4\%$.
> > - Two points less return cost the member 6.3 points more of pay a year.

> [!trap] Leaving out a year of interest on each contribution
> Contributions at the start of years 0 to $n-1$ earn $(1+i)^{n-k}$, not $(1+i)^{n-k-1}$, so the first earns $n$ years of interest and the last earns one. Mid-year contributions earn a half-year less.
