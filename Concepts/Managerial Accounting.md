---
aliases:
  - Distort Perceived Performance
  - Drive Decision Making
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:87a0b947b732eebaf542a1f23fc4cfdd00f52956ba1cd43b6ab92e4dc91529b1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Managerial Accounting.md
---

**Managerial Accounting** is the accounting a firm produces for its own managers rather than for outside investors: cost information that supports decisions, and performance measures that evaluate and reward the people and units making them. Because managers act on what they are measured on, the way costs are classified and allocated drives decisions, and a poor allocation can distort the perceived performance of a product, a line or a manager.

Zimmerman's framework treats the firm's organizational architecture as three linked parts:

1. How decision rights are assigned.
2. How performance is measured.
3. How performance is rewarded.

Accounting serves both decision management, by telling managers what choices cost, and decision control, by measuring how well they chose. A measure that is good for one purpose can be poor for the other.

## Responsibility centres

The measure a unit is held to should match its decision rights. A manager who cannot set prices or choose inputs should not be judged on profit.

| Centre | Held to |
| --- | --- |
| Cost centre | Cost for a given output |
| Revenue centre | Revenue |
| Profit centre | Profit |
| Investment centre | A return on the capital it uses, such as return on investment or residual income |

The residual income (RI) of an investment centre is

> $$\text{RI} = \text{NOI} - k \times \text{Invested capital}$$

- $\text{NOI}$ is the centre's net operating income.
- $k$ is the [[Cost of Capital|cost of capital]] charged on the capital it uses.

## Relevant costs

A decision should use only the costs and revenues it changes, valued at their opportunity cost. [[Fixed Expenses|Fixed costs]] that stay the same whatever is decided, and sunk costs, are irrelevant even when they have been allocated to the product being judged.

## Transfer pricing

When one unit supplies another, the transfer price splits profit between them and drives each unit's choices. The price that leads to the right decision is the firm's opportunity cost of the transfer. That is the market price when there is a competitive outside market, and the variable cost when the supplying unit has spare capacity. A full-cost transfer price with spare capacity can lead the buying unit to buy outside at a higher cost to the firm.

## Cost allocation and decision making

Zimmerman's reasons for allocating costs include external reporting, taxes and cost-based reimbursement. The main internal one is that an allocation works as a tax on using a shared resource. A well-set charge approximates the hidden cost a user imposes on others, such as congestion or delay. A charge set above that cost discourages use the firm would want.

Traditional costing spreads overhead at a single rate, which is

> $$\text{Overhead rate} = \frac{\text{Budgeted overhead}}{\text{Budgeted allocation base}}$$

> [!example]- What happens to the internal charge and to the insurer's total cost when one division switches to the vendor? {Example}
> An insurer's internal modelling platform has fixed costs of \$1,200,000 a year and variable costs of \$30 per compute hour. Three divisions each use 4,000 hours and are charged full cost per hour. An outside vendor offers the same service at \$80 per hour, and one division switches to it.
>
> > [!answer]-
> > - The charge before is $1{,}200{,}000/12{,}000 + 30 = \$130$ per hour.
> > - The division saves \$50 per hour against its charge.
> > - The insurer now pays \$80 for an hour that cost it \$30 internally, so its costs rise by $4{,}000 \times (80 - 30) = \$200{,}000$ a year.
> > - The fixed cost does not go away, so the charge to the other two divisions rises to $1{,}200{,}000/8{,}000 + 30 = \$180$ per hour, which pushes them toward the vendor as well.
> > - Charging the \$30 variable cost per hour, and recovering the fixed cost as a lump sum, would have kept the work in-house.

## Distortion of perceived performance

A volume base such as premium, direct labour or units loads too much overhead onto high-volume products and too little onto complex, low-volume ones. Premium measures size, not workload, so allocating claims or administration costs by premium understates the cost of lines with many small policies or many claims.

Activity-based costing traces overhead to the activities that cause it, such as policies issued, claims handled or underwriting hours, and usually gives a truer picture of what each product costs. The overhead it allocates to product or line $j$ is

> $$\text{Allocated}_j = \sum_{a} \frac{C_a}{D_a}\, d_{a,j}$$

- $C_a$ is the cost of activity pool $a$.
- $D_a$ is the total volume of its cost driver.
- $d_{a,j}$ is the volume of that driver that product or line $j$ uses.

> [!example]- What is each line's profit with overhead allocated by premium and by activity? {Example}
> A P&C insurer writes commercial property (line A) and personal auto (line B). Before overhead, line A's margin is \$9 million and line B's is \$14 million. Overhead of \$20 million is made up of \$8 million of policy administration, \$10 million of claims handling and \$2 million of underwriting.
>
> | | Line A | Line B |
> | --- | ---: | ---: |
> | Premium (\$ millions) | 60 | 40 |
> | Policies | 2,000 | 78,000 |
> | Claims | 1,000 | 19,000 |
> | Underwriting hours | 6,000 | 4,000 |
>
> > [!answer]-
> > - By premium, line A takes 60% of the overhead, \$12 million, and line B takes \$8 million, so A shows a loss of \$3 million and B a profit of \$6 million.
> > - The activity rates are $8{,}000{,}000/80{,}000 = \$100$ per policy, $10{,}000{,}000/20{,}000 = \$500$ per claim and $2{,}000{,}000/10{,}000 = \$200$ per underwriting hour.
> > - Line A is allocated $100 \times 2{,}000 + 500 \times 1{,}000 + 200 \times 6{,}000 = \$1.9$ million, so it earns \$7.1 million.
> > - Line B is allocated $100 \times 78{,}000 + 500 \times 19{,}000 + 200 \times 4{,}000 = \$18.1$ million, so it loses \$4.1 million.
> > - The total profit is \$3 million either way, but the conclusion is reversed.
> > - Shrinking line A on the premium-based numbers would have cut the profitable line.

Absorption costing creates its own distortion. A manager judged on profit can raise it by producing for inventory, since part of the fixed overhead then sits on the balance sheet instead of in expenses. Inventory is checked before a rise in profit is credited as better performance.

## In insurance

Insurers allocate expenses across lines and products for pricing and profitability reporting, which feeds the [[Expense Ratio|expense ratio]] used in rates. They also allocate [[Risk Capital|risk capital]], which is the same problem applied to the cost of capital.

> [!trap] Treating an allocated cost as avoidable
> Dropping a line or outsourcing a service saves only its avoidable costs. Comparing an outside price with a full-cost charge that includes fixed overhead makes outsourcing look cheaper than it is.
