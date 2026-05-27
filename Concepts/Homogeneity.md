**Homogeneity** is the property of a rating class in which all members have sufficiently similar loss-generating characteristics that their experience can be combined to produce a meaningful and equitable average rate.

> $$\text{Class is homogeneous if } E[\text{Loss Cost}_i] \approx E[\text{Loss Cost}_j] \text{ for all } i, j \text{ in the class}$$

- A homogeneous class reduces cross-subsidization: low-risk insureds do not subsidize high-risk insureds within the same class
- There is a fundamental trade-off between homogeneity and [[Credibility]]: finer classification improves homogeneity but reduces the volume of data in each class, lowering credibility
- Classes are typically defined by variables that are objective, measurable, and causally related to losses (e.g., age, vehicle type, territory)
- Homogeneity is one of the four criteria for a good rating variable alongside statistical significance, social acceptability, and operational feasibility

> [!example]- Personal Auto Classification {Example}
> An insurer considers two rating plans: Plan A uses a single rate for all drivers; Plan B splits drivers by age group (under 25, 25–64, 65+). Which plan is more homogeneous?
>
> > [!answer]-
> > Plan B achieves greater homogeneity because drivers under 25 have materially higher accident frequencies than middle-aged drivers, and grouping them separately ensures each class contains risks with similar expected loss costs. Under Plan A, young drivers are subsidized by older drivers, violating the homogeneity requirement.
