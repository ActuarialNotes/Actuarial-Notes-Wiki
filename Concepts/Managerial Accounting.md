---
aliases:
  - Distort Perceived Performance
  - Drive Decision Making
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:23670ac0525bcce605a45a282edc6a3af718f62749e0b25b0b16e525b3029240
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Managerial Accounting.md
---
**Managerial Accounting** is the accounting a firm produces for its own managers rather than for outside investors: cost information that supports decisions, and performance measures that evaluate and reward the people and units making them. Because managers act on what they are measured on, the way costs are classified and allocated drives decisions, and a poor allocation can distort the perceived performance of a product, a line or a manager.

> $$\text{Overhead rate} = \frac{\text{Budgeted overhead}}{\text{Budgeted allocation base}}$$

> $$\text{Allocated}_j = \sum_{a} \frac{C_a}{D_a}\, d_{a,j}$$

> $$\text{RI} = \text{NOI} - k \times \text{Invested capital}$$

- **Symbols:** In activity-based costing, $C_a$ is the cost of activity pool $a$, $D_a$ the total volume of its cost driver, and $d_{a,j}$ the volume that product or line $j$ uses. In the residual income (RI) of an investment centre, $\text{NOI}$ is its net operating income and $k$ the [[Cost of Capital|cost of capital]] charged on the capital it uses.
- **Decision management and control:** Zimmerman's framework treats the firm's organizational architecture as three linked parts: how decision rights are assigned, how performance is measured, and how it is rewarded. Accounting serves both decision management, by telling managers what choices cost, and decision control, by measuring how well they chose. A measure that is good for one purpose can be poor for the other.
- **Responsibility centres:** A cost centre is held to cost for a given output, a revenue centre to revenue, a profit centre to profit, and an investment centre to a return on the capital it uses, such as return on investment or residual income. The measure should match the decision rights: a manager who cannot set prices should not be judged on profit.
- **Relevant costs:** A decision should use only the costs and revenues it changes, valued at their opportunity cost. [[Fixed Expenses|Fixed costs]] that stay the same whatever is decided, and sunk costs, are irrelevant even when they have been allocated to the product being judged.
- **Transfer pricing:** When one unit supplies another, the transfer price splits profit between them and drives each unit's choices. The price that leads to the right decision is the firm's opportunity cost of the transfer: the market price when there is a competitive outside market, and the variable cost when the supplying unit has spare capacity.
- **Drive decision making:** Zimmerman's reasons for allocating costs include external reporting, taxes and cost-based reimbursement, but the main internal one is that an allocation works as a tax on using a shared resource. A well-set charge approximates the hidden cost a user imposes on others, such as congestion or delay. A charge set above that cost discourages use the firm would want.
- **Distort perceived performance:** Traditional costing spreads overhead on a volume base such as premium, direct labour or units, which loads too much cost onto high-volume products and too little onto complex, low-volume ones. Activity-based costing traces overhead to the activities that cause it, such as policies issued, claims handled or underwriting hours, and usually gives a truer picture of what each product costs. Absorption costing creates its own distortion: a manager judged on profit can raise it by producing for inventory, since part of the fixed overhead then sits on the balance sheet instead of in expenses.
- **In insurance:** Insurers allocate expenses across lines and products for pricing and profitability reporting, which feeds the [[Expense Ratio|expense ratio]] used in rates. They also allocate [[Risk Capital|risk capital]], which is the same problem applied to the cost of capital.

> [!example]- Premium-Based Against Activity-Based Overhead Allocation {Example}
> A P&C insurer writes commercial property (line A) and personal auto (line B). Line A has premium of \$60 million, 2,000 policies, 1,000 claims and 6,000 underwriting hours, and line B has premium of \$40 million, 78,000 policies, 19,000 claims and 4,000 underwriting hours. Before overhead, line A's margin is \$9 million and line B's is \$14 million. Overhead of \$20 million is made up of \$8 million of policy administration, \$10 million of claims handling and \$2 million of underwriting. Compare each line's profit with overhead allocated by premium and by activity.
>
> > [!answer]-
> > By premium, line A takes 60% of the overhead, \$12 million, and line B takes \$8 million, so A shows a loss of \$3 million and B a profit of \$6 million. The activity rates are \$100 per policy, \$500 per claim and \$200 per underwriting hour.
> > $$
> > \begin{align*}
> > \text{Allocated}_A &= 100(2{,}000) + 500(1{,}000) + 200(6{,}000) \\
> > &= 1{,}900{,}000 \\
> > \text{Allocated}_B &= 100(78{,}000) + 500(19{,}000) + 200(4{,}000) \\
> > &= 18{,}100{,}000
> > \end{align*}
> > $$
> > Under activity-based costing, line A earns \$7.1 million and line B loses \$4.1 million. The total profit is \$3 million either way, but the conclusion is reversed. The premium base charged commercial property for the administration and claims work that personal auto's many small policies cause. A decision to shrink line A on the premium-based numbers would have cut the profitable line.

> [!example]- The Death Spiral of a Full-Cost Charge {Example}
> An insurer's internal modelling platform has fixed costs of \$1,200,000 a year and variable costs of \$30 per compute hour. Three divisions each use 4,000 hours and are charged full cost per hour. An outside vendor offers the same service at \$80 per hour, and one division switches to it. What happens to the internal charge and to the insurer's total cost?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Charge before} &= \frac{1{,}200{,}000}{12{,}000} + 30 \\
> > &= 130 \\
> > \text{Charge after} &= \frac{1{,}200{,}000}{8{,}000} + 30 \\
> > &= 180 \\
> > \text{Change in total cost} &= 4{,}000(80 - 30) \\
> > &= 200{,}000
> > \end{align*}
> > $$
> > The division saved \$50 per hour against its charge, but the insurer now pays \$80 for an hour that cost it \$30 internally, so its costs rise by \$200,000 a year. The fixed cost doesn't go away, and the remaining divisions now see \$180 an hour, which pushes them toward the vendor as well. Charging the \$30 variable cost per hour, and recovering the fixed cost as a lump sum, would have kept the work in-house.

> [!tip]- How it appears on the exam
> - **CFE-201 learning outcome 3a:** Candidates assess how managerial accounting drives decision making and affects behaviour and performance evaluation, from Zimmerman's chapter on responsibility accounting and transfer pricing. Questions describe an organization and ask which responsibility centre, measure or transfer price fits, and how managers will respond to it.
> - **CFE-201 learning outcome 3b:** Candidates assess and recommend cost allocation methods and explain how they can distort perceived performance, from Zimmerman's chapters on cost allocation and absorption cost systems and the study note on managing allocations in the insurance sector. A typical question reallocates overhead under two bases and asks for a recommendation.
> - **Written answers:** Most marks go to the explanation, so state who is affected by the allocation and how their behaviour changes, not only the numbers.

> [!warning]- Exam traps
> - **Allocated cost as avoidable cost:** Dropping a line or outsourcing a service saves only its avoidable costs. Comparing an outside price with a full-cost charge that includes fixed overhead makes outsourcing look cheaper than it is.
> - **Premium as a cost driver:** Premium measures size, not workload. Allocating claims or administration costs by premium understates the cost of lines with many small policies or many claims.
> - **Profit centre without pricing rights:** Judging a unit on profit when it cannot set prices or choose its inputs holds the manager to results they can't control.
> - **Absorption profit from inventory:** Under absorption costing, a rise in profit can come from producing more than was sold. Check inventory before crediting a manager with better performance.
> - **Transfer price at full cost with spare capacity:** When the supplying unit has idle capacity, the firm's cost of the transfer is only its variable cost. A full-cost transfer price can lead the buying unit to buy outside at a higher cost to the firm.
