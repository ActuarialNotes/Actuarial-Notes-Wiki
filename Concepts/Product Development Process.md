---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:83d5ffda74ace9bf40bc2cd43b671df838eb45ccfea74cf8c07d31290afe8aaf
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Product Development Process.md
---

**The Product Development Process** is the sequence of stages by which an insurer takes a new group health or benefit product from an idea to a product on sale and then manages it once it is sold: generating the idea, researching the market, designing the benefits, pricing, filing with regulators, launching, and monitoring results. Each stage ends with a decision to go on, change course or stop, and each has its own [[Risk|risks]] and opportunities, so the process is as much about controlling what can go wrong as about building the product.

> $$\text{NPV} = -D_0 + \sum_{t=1}^{n} \frac{12\,N_t\,(\pi - c - e) - F}{(1 + r)^t}$$

> $$N^{*} = \frac{F}{12\,(\pi - c - e)}$$

- **Symbols:** $D_0$ is the up-front development cost, $N_t$ the average members enrolled in year $t$, $\pi$ the premium PMPM, $c$ the expected claim cost PMPM, $e$ the variable expense PMPM, $F$ the fixed annual cost of running the product, and $r$ the insurer's hurdle rate. $N^{*}$ is the break-even membership, the enrollment at which the product's margin just covers its fixed costs.
- **The decision rule:** A product passes a gate when its projected [[Net Present Value|net present value]] is positive under the best-estimate assumptions and the result under adverse assumptions is one the insurer can bear. The projection is redone at each gate as the design, the price and the expected sales become firmer.
- **The framework:** The stages, and what can go right or wrong at each, are shown in the table below.

| Stage | Main work | Risks | Opportunities |
| --- | --- | --- | --- |
| Idea | Ideas from brokers, employers, members, competitors, regulation and new technology | Chasing a fad, or copying a competitor without its cost advantage | A gap in the market, such as a product a law change creates |
| Market research | Size of the market, buyers' needs, competitors' products and prices, distribution | Overstating demand, or misreading what buyers value | Finding an underserved segment |
| Design | Benefits, eligibility, cost sharing, network, underwriting rules | Moral hazard, adverse selection, features administration can't support | Designs that steer members to efficient care |
| Pricing | Claim cost, trend, expenses, margin and manual rates | Assumptions with little or no credible data | Sharper pricing than competitors on the target segment |
| Filing and compliance | Forms and rates filed where required, mandated benefits, contracts | Delay or rejection, a different product in each state | Speed to market where approval is quick |
| Launch | Systems, claims, billing, sales training, marketing | Systems failure, poor service, weak broker interest | Cross-selling to existing clients |
| Monitoring | Sales, persistency, claims and expenses against the pricing | Late detection of an anti-selection spiral | Early repricing or redesign while the block is small |

- **Pricing a new product:** A new product has no experience of its own, so its claim cost is built from related products, population data, published studies and the claim cost of the benefits it is made from. The thin data is the main pricing risk, and it argues for close monitoring and a margin for uncertainty in the first [[Manual Rate|manual rates]].
- **Who is involved:** Actuaries, underwriters, marketing, legal and compliance, claims, systems and distribution all take part. A product that is priced well can still fail when the administration can't pay its claims correctly or the brokers won't sell it, which is why the operational stages carry as much weight as the pricing.
- **Monitoring closes the loop:** After launch, sales, enrollment mix, [[Lapse|lapse]], claims and expenses are compared with the pricing assumptions in an [[Actual vs Expected Analysis|actual versus expected analysis]]. What is learned feeds back into rate changes, design changes and the next product.

> [!example]- Testing a New Small-Group Dental Product {Example}
> An insurer is deciding whether to launch a small-group dental product. Development costs \$600,000 now. The premium is \$40 PMPM, expected claims are \$30 PMPM, variable expenses are \$4 PMPM, and the fixed costs of running the product are \$150,000 a year. Marketing projects average enrollment of 2,000, 5,000, 8,000, 10,000 and 10,000 members in years 1 to 5. The hurdle rate is 10%. Find the break-even membership and the five-year NPV, then repeat the NPV with claims 5% above expected.
>
> > [!answer]-
> > The margin is $40 - 30 - 4 = 6$ dollars PMPM, or \$72 per member per year.
> > $$
> > \begin{align*}
> > N^{*} &= \frac{150{,}000}{72} \\
> > &= 2{,}083
> > \end{align*}
> > $$
> > The yearly cash flows are $72 N_t - 150{,}000$, which are $-6{,}000$, $210{,}000$, $426{,}000$, $570{,}000$ and $570{,}000$.
> > $$
> > \begin{align*}
> > \text{NPV} &= -600{,}000 - 5{,}454.55 + 173{,}553.72 \\
> > &\quad + 320{,}060.11 + 389{,}317.67 + 353{,}925.15 \\
> > &= 631{,}402.10
> > \end{align*}
> > $$
> > With claims of \$31.50 PMPM, the margin falls to \$4.50 PMPM, or \$54 a year, the break-even rises to 2,778 members, and the NPV falls to \$181,397.07. The product passes the gate, but most of its value rests on reaching 8,000 members by year 3 and on a claim cost that has no experience behind it yet.

> [!example]- Monitoring Detects Anti-Selection {Example}
> Nine months after launch, the dental product's claims are running at \$34.50 PMPM against the \$30.00 expected, and most of the groups sold had no dental coverage before. The target loss ratio is 75%. Find the actual to expected ratio and the actual loss ratio, and the rate increase that would restore the target if the actual claim cost persists.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{A/E} &= \frac{34.50}{30.00} \\
> > &= 1.15 \\
> > \text{LR} &= \frac{34.50}{40.00} \\
> > &= 86.25\% \\
> > \pi_{\text{new}} &= \frac{34.50}{0.75} \\
> > &= 46.00
> > \end{align*}
> > $$
> > A 15% increase would restore the 75% loss ratio. Groups buying dental cover for the first time often have pent-up needs for major work, so the first-year excess may partly wear off. The insurer can also act on the design instead, through a waiting period for major services or a lower first-year maximum for groups without prior coverage.

> [!tip]- How it appears on the exam
> - **GH-101 objective 1d:** Written questions ask candidates to describe the product development process for a short-duration group product and the risks and opportunities to weigh at each stage, from Skwire's chapter on product development.
> - **Case questions:** A question describes a proposed product, such as a new dental, vision or voluntary benefit, and asks what research to do, which design features control [[Moral Hazard|moral hazard]] and [[Adverse Selection|adverse selection]], and what to monitor after launch.
> - **Calculation:** Some questions add a simple profit test or break-even enrollment, which links the process to the pricing objectives.

> [!warning]- Exam traps
> - **Pricing is not the whole process:** An answer that only prices the product misses the stages where most new products fail, such as filing, systems, distribution and monitoring. A full answer names the risk at each stage and how to control it.
> - **Risks and opportunities:** The objective asks for both. Listing only risks leaves out half the marks, and the opportunities are usually the reason the product is worth developing.
> - **Break-even is not profit:** Covering the fixed costs each year is not enough when there is an up-front development cost and a hurdle rate. Judge the product on its NPV, not on the year it first breaks even.
> - **A good first year can mislead:** Early claims may run low because of waiting periods, or high because of pent-up demand. Read the first months of experience against a projection that allows for these effects before repricing.
