---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5700048ebdf0ca462fc42cc297d4cdf232e6207d14664883bb8d9ec0c45ba4f5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Ancillary Benefit.md
---

An **Ancillary Benefit** is any benefit a [[Defined Benefit Plan|defined benefit plan]] provides beyond the basic lifetime pension from normal retirement age, such as a bridge benefit, an early-retirement subsidy, a death benefit, a disability benefit or indexation. Each one is a separate promise with its own value, so the sponsor chooses them for what they do for members and prices them as additions to the plan's cost.

> $$\text{EPV}_{\text{plan}} = \text{EPV}_{\text{basic}} + \sum_k \text{EPV}_{\text{ancillary},\,k}$$

> $$\text{EPV}_{\text{bridge}} = b\;\ddot{a}^{(12)}_{x:\overline{65-x}|}$$

> $$\ddot{a}^{(12)}_{x:\overline{n}|} \approx \ddot{a}_{x:\overline{n}|} - \tfrac{11}{24}\left(1 - {}_nE_x\right)$$

> $$\text{EPV}_{\text{indexed}} = B\;\ddot{a}_{x}\big|_{j}$$

> $$1 + j = \frac{1+i}{1+g}$$

- **Symbols:** $b$ is the annual bridge benefit paid monthly from age $x$ to 65, $\ddot{a}^{(12)}_{x:\overline{n}|}$ is the monthly temporary [[Life Annuity|life annuity]] factor, approximated with [[Woolhouse's Formula|Woolhouse's formula]], and ${}_nE_x$ is the [[Pure Endowment|pure endowment]] factor. For indexation, $B$ is the initial pension, $g$ the annual increase and $\ddot{a}_x\big|_j$ the annuity factor at the reduced rate $j$, following Dickson, Hardy & Waters (chapter 10).
- **Bridge benefits:** A bridge is a temporary pension from early retirement to the age at which social security or [[Social Insurance|government pensions]] begin, usually 65. It levels the member's income across that date and so makes early retirement affordable. A level income option does the same thing in reverse, by raising the plan pension before government benefits start and lowering it afterward so that the two have equal value.
- **Early-retirement subsidies:** A reduction for early payment smaller than the actuarially equivalent one gives the member more value than the deferred pension, as described in [[Early Retirement|early retirement]]. The subsidy is an ancillary benefit, and it may be vested or non-vested depending on the plan's [[Vesting|eligibility rules]].
- **Death benefits:** A pre-retirement death benefit pays a lump sum, often the commuted value of the accrued pension or a refund of contributions with interest, or a pension to the surviving spouse. A post-retirement death benefit is built into the form of payment, as a guaranteed period or a joint and survivor pension (see [[Optional Form of Payment|optional forms of payment]]). Legislation in both the United States and Canada requires a minimum spousal benefit on death before and after retirement unless the spouse waives it.
- **Disability benefits:** A plan may pay an immediate unreduced pension on total disability, or more often it keeps crediting service while the member receives [[Disability Income Insurance|long-term disability]] benefits, so that the pension is not cut short by the disability.
- **Indexation:** Automatic increases in pensions in payment, tied to a price index or at a fixed rate, protect retirees from [[Inflation|inflation]] and are expensive. Indexation can be full, partial (such as 50% of CPI or CPI less 1%), capped, or conditional on the plan's funded status or on investment returns, which shares the cost with members.
- **Canadian tax rules:** In Canada the Income Tax Regulations define the lifetime retirement benefit of a registered DB plan and list the ancillary benefits that may be added to it, among them bridging, early-retirement benefits, guaranteed periods and other death benefits, disability benefits and indexing, each with its own limits (see [[Canadian Pension Legislation|Canadian pension legislation]]). A plan that pays beyond those limits puts its registration at risk, so richer benefits move to a [[Executive Retirement Plan|supplementary plan]].
- **Sponsor risk:** Ancillary benefits are where much of a DB plan's hidden cost lies, because their value depends on member choices and on assumptions such as retirement and disability rates. The SOA's catalogue of [[Embedded Option|embedded options]] treats subsidized early retirement, bridges and generous optional-form factors as options the members hold against the sponsor.

> [!example]- The Cost of a Bridge Benefit {Example}
> A plan pays a member who retires at 60 a bridge benefit of \$8,000 a year, monthly in advance, until age 65 or earlier death. Using the Standard Ultimate Life Table at 5%, with $\ddot{a}_{60} = 14.9041$, $\ddot{a}_{65} = 13.5498$ and ${}_5E_{60} = 0.76687$, find the EPV of the bridge at 60.
>
> > [!answer]-
> > First find the annual temporary annuity factor, then convert it to monthly payments with Woolhouse's two-term approximation.
> > $$
> > \begin{align*}
> > \ddot{a}_{60:\overline{5}|} &= \ddot{a}_{60} - {}_5E_{60}\,\ddot{a}_{65} \\
> > &= 14.9041 - 0.76687(13.5498) \\
> > &= 4.5132 \\
> > \ddot{a}^{(12)}_{60:\overline{5}|} &\approx 4.5132 - \tfrac{11}{24}(1 - 0.76687) \\
> > &= 4.4063 \\
> > \text{EPV}_{\text{bridge}} &= 8{,}000 \times 4.4063 \\
> > &= 35{,}250
> > \end{align*}
> > $$
> > The bridge adds about \$35,250 to the cost of the member's retirement, a little less than five years of payments because some members die before 65 and later payments are discounted. Valuing it as an annual annuity would give \$36,106 and overstate the cost by about 2.4%.

> [!example]- What Indexation Adds to a Pension {Example}
> A member retires at 65 with a pension of \$30,000 a year, paid annually in advance. On the SULT at 5% the life annuity factor is $\ddot{a}_{65} = 13.5498$. The plan is considering 2% compound annual increases after the first payment, and the annuity factor at the reduced rate is $\ddot{a}_{65}\big|_{j} = 16.5404$. Find $j$ and the cost of the indexation.
>
> > [!answer]-
> > The payment at time $k$ is $30{,}000(1.02)^k$, so discounting at 5% is the same as discounting a level payment at $j$.
> > $$
> > \begin{align*}
> > j &= \frac{1.05}{1.02} - 1 \\
> > &= 0.02941 \\
> > \text{EPV}_{\text{level}} &= 30{,}000 \times 13.5498 \\
> > &= 406{,}494 \\
> > \text{EPV}_{\text{indexed}} &= 30{,}000 \times 16.5404 \\
> > &= 496{,}212 \\
> > \text{Cost} &= 496{,}212 - 406{,}494 \\
> > &= 89{,}718
> > \end{align*}
> > $$
> > Indexing at 2% raises the value of the pension by about 22%. A sponsor that wants inflation protection at lower cost can cap the increase, index only part of CPI, or make increases conditional on the plan's funded status.

> [!tip]- How it appears on the exam
> - **RET-101 plan features:** Objective 1b lists ancillary benefits among the plan features whose relevance and range candidates must explain for a given plan type. Expect a written answer describing bridges, death and disability benefits and indexation, why a sponsor offers each, and how it interacts with social security and other benefits.
> - **Subsidy values:** Objective 1b also asks for the value of benefit subsidies, so a calculation may ask for the EPV of a bridge or of indexation with annuity factors and pure endowments, as in the examples.
> - **Sponsor risk:** Objective 3 asks how plan features can adversely affect the sponsor and how to mitigate the risk. Bridges and subsidized early retirement appear there as embedded options, alongside the readings on early retirement windows.

> [!warning]- Exam traps
> - **A bridge is a temporary annuity:** It stops at 65 as well as on death, so its factor is $\ddot{a}_{x:\overline{n}|}$, not $\ddot{a}_x$. Using the whole-life factor values a lifetime pension and more than triples the cost of a five-year bridge.
> - **Monthly payments:** The Woolhouse adjustment for a temporary annuity is $\frac{11}{24}(1 - {}_nE_x)$, not $\frac{11}{24}$. Subtracting the full $\frac{11}{24}$ is the whole-life adjustment, and it understates the factor because it ignores the correction that comes back when the payments stop at 65.
> - **Indexation rate:** The indexed factor uses $j = (1+i)/(1+g) - 1$, which is slightly smaller than $i - g$. Using $i - g = 3\%$ instead discounts too heavily, gives a smaller factor and understates the cost.
> - **Ancillary is not optional:** An ancillary benefit is provided by the plan's terms, while an optional form changes how the member's own benefit is paid. A joint and survivor form with actuarially equivalent factors costs the sponsor nothing, but a subsidized one is an ancillary benefit.
