---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:88e448c794c734523cfad27d63a1f2986f26d43172a445d6dc8b26e94534dfb4
  sources:
    - "IRMI glossary, 'risk control', sha256:d1e631a123ad2a66372fb3e2404d1aff925e3588718b570ffbb1fb22c3aaeb61 — https://www.irmi.com/term/insurance-definitions/risk-control"
    - "IRMI glossary, 'loss control', sha256:7efa96e8a590392c1748da96a17f95a0949fc7f3b2546f8a7e06e0fa84f7a950 — https://www.irmi.com/term/insurance-definitions/loss-control"
    - "IRMI glossary, 'avoidance', sha256:4d3e36f99baaea77a2652032aa888207c5eda9ba2e43ccdb8d8ad1839be3faab — https://www.irmi.com/term/insurance-definitions/avoidance"
    - "IRMI glossary, 'loss reduction', sha256:d3a175e005f318461e3170d59824f822c1f1c1e516673203347639aeff85e8f6 — https://www.irmi.com/term/insurance-definitions/loss-reduction"
    - "IRMI glossary, 'duplication', sha256:93f03ed00654b4f2f5d99f7700def916dfc5569cfc0686d36cd29c75e9d5cce7 — https://www.irmi.com/term/insurance-definitions/duplication"
    - "IRMI glossary, 'segregation', sha256:a9234bdba67979e85d524862fc915420d836836e00c8d5ef565d1e7180172f5d — https://www.irmi.com/term/insurance-definitions/segregation"
    - "Baranoff, Brockett & Kahane, Risk Management for Enterprises and Individuals (Saylor), §4.3 cost-benefit analysis of loss control: cost compared with the present value of reduced losses or premium savings, sha256:0365fac76564f49798290d56f0f69dbdf2f25a8b071b72b272e937fbdd34e38e — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s08-03-projected-frequency-and-severi.html"
    - "Baranoff, Brockett & Kahane, Risk Management for Enterprises and Individuals (Saylor), §4.4 risk management matrix: loss prevention and loss reduction, sha256:5da3c20b87e2a72ff64a492c44f23e70c966629c990a5dfd9739b0ec09c59eb8 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s08-04-risk-management-alternatives-t.html"
    - "Baranoff, Brockett & Kahane, Risk Management for Enterprises and Individuals (Saylor), §7.1, 'engineering and loss control' services, sha256:9abf601a8c7e62c112667b15df20471c0a07e5e32ff1dea40448eec0afdccf7e — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s11-01-insurance-operations-marketing.html"
    - "Risk & Insurance Education Alliance, 'Six Steps of the Underwriting Process' (30 Jan 2023): underwriters order loss control inspections; follow-up on loss control recommendations, sha256:ee0156096b5f8c331aae216b138dcade35da2127854d0bee28423df26c0d2ba0 — https://www.riskeducation.org/six-steps-of-the-underwriting-process/"
    - "Thompson, Insurance Operations – Claim Procedures and the Claim Adjustment Process (University of Northern Iowa course handout), pp.1–6: two goals of the claim function, users of claim information, regulators and market conduct, centralized/decentralized structure, settlement authority, staff/independent/public adjusters, producers, sha256:5ed85a349071117ddd86bbc495947689c0893f562bc2ada8c6e3db160fd42663 — https://sites.uni.edu/thompsona/Claims%20Settlement.pdf"
    - "Carpenter, Bauer & Erdogan, Principles of Management v1.1 (Saylor, CC BY-NC-SA), §5.2 'Strategic Management in the P-O-L-C Framework': formulation and implementation, corporate vs business strategy, SWOT and SO/ST/WO/WT, value chain, VRIO, PESTEL, sha256:f8b7b28801d9bdb61effb2c7e7ed4269d9bf3831502508d2ddfb0688bcda5890 — https://saylordotorg.github.io/text_principles-of-management-v1.1/s09-02-strategic-management-in-the-p-.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Control.md
---
**Risk Control** is the set of techniques that reduce the frequency or severity of losses, as distinct from risk financing, which pays for the losses that still occur. Risk control is one half of risk treatment, with risk financing through retention and [[Risk Transfer|transfer]] the other ([[Risk Mitigation]]). Insurers also use the term for their risk control function, whose representatives survey accounts for [[Underwriting|underwriting]] and advise policyholders on preventing losses, in cooperation with the insurer's other [[Insurance Operations|functions]].

The techniques are:

1. Avoidance, which ends the exposure.
2. Loss prevention, which lowers frequency.
3. Loss reduction, which lowers severity.
4. Separation, which divides an exposure among locations or units.
5. Duplication, which keeps a backup.
6. Diversification, which spreads activity across uncorrelated sources.

Risk control works on the exposures found by [[Risk Identification|risk identification]] and ranked by [[Risk Assessment|risk assessment]]. It rarely removes the need for financing, because what it leaves behind still has to be paid for. A deductible or a reinsurance treaty changes who pays, not how often or how badly losses occur.

## Avoidance

Avoidance eliminates an exposure by never undertaking the activity or by abandoning it, so the probability of loss from it becomes zero. It is often impractical, because the activity usually earns the income the organization exists for, and abandoning one activity can create another exposure.

## Loss prevention and loss reduction

Loss prevention lowers frequency, as machine guarding, driver training and fire-resistive storage do. Loss reduction lowers severity once a loss has begun, as sprinklers, fire walls, seat belts and early return-to-work programs do. The reduction in [[Expected Loss|expected loss]] a year from a measure is

> $$\Delta E[L] = f_0\,s_0 - f_1\,s_1$$

- $f_0$ and $s_0$ are the [[Frequency|frequency]] and [[Severity|severity]] of losses before the measure.
- $f_1$ and $s_1$ are their values after it.

## Separation, duplication and diversification

Separation divides an exposure among several locations or units, such as two warehouses instead of one, so a single event damages less. Duplication keeps a spare or backup that is used only when the original is lost, such as off-site copies of records. Separation and duplication reduce the severity of the largest loss a single event can cause. Diversification spreads activity across products, customers or regions whose losses are not perfectly correlated.

> [!example]- Which risk control technique is each of these six trucking measures? {Example}
> A trucking company is considering six measures:
>
> 1. Stop hauling hazardous materials.
> 2. Install fatigue-monitoring systems in its cabs.
> 3. Fit fire suppression systems in its maintenance garage.
> 4. Park its fleet at two depots instead of one.
> 5. Keep a copy of its dispatch system at a second site.
> 6. Add a warehousing business so that less of its income depends on freight rates.
>
> > [!answer]-
> > - Stopping hazardous materials hauling is avoidance, because the exposure ends with the activity.
> > - Fatigue monitoring is loss prevention, because it reduces how often accidents happen.
> > - Fire suppression is loss reduction, because it limits a fire that has already started.
> > - Two depots is separation, since one hail storm or fire can no longer damage the whole fleet.
> > - The second copy of the dispatch system is duplication, since it is used only when the original fails.
> > - The warehousing business is diversification, which reduces the company's dependence on one source of income.

## The cost-benefit test

A measure is worth adopting when the present value of what it saves, in reduced losses or in premium savings, exceeds what it costs. An insured organization captures part of the saving through lower premiums. A measure passes the test when its [[Net Present Value|net present value]] is positive, where the net present value is

> $$\text{NPV} = \sum_{t=1}^{n} \frac{B_t}{(1+i)^t} - C_0$$

- $C_0$ is the cost of putting the measure in place.
- $B_t$ is its net benefit in year $t$, the reduction in expected loss plus any premium savings less running costs.
- $i$ is the discount rate.
- $n$ is the measure's useful life in years.

> [!example]- Do the warehouse sprinklers pass the cost-benefit test? {Example}
> A company retains its own fire losses. With illustrative figures, a fire at its warehouse has frequency 0.02 a year and would cost \$2,000,000. Sprinklers would cost \$250,000 to install, last 20 years and cost \$3,000 a year to maintain. They would limit a fire's cost to \$400,000 without changing how often fires start. The discount rate is 6%.
>
> > [!answer]-
> > - Sprinklers are loss reduction, so only severity changes.
> > - The reduction in expected loss is $\Delta E[L] = 0.02(2{,}000{,}000) - 0.02(400{,}000) = \$32{,}000$ a year.
> > - The net benefit is $B_t = 32{,}000 - 3{,}000 = \$29{,}000$ a year.
> > - The 20-year annuity factor at 6% is $a_{\overline{20}|} = 11.4699$.
> > - The net present value is $29{,}000(11.4699) - 250{,}000 = \$82{,}628$.
> > - The net present value is positive, so the sprinklers pass.

Avoidance gives up the income of the activity, and separation adds costs such as a second site's rent, so neither is right merely because it lowers risk.

## Insurer risk control

Some insurers, primarily for commercial clients, offer engineering and loss control: methods of preventing and reducing loss wherever the effort is economically feasible. These services are particularly applicable to workers compensation and boiler and machinery exposures. The facilities an insurer devotes to them, and how well they work, are an element a policyholder weighs in choosing an insurer.

Underwriters order loss control inspections to help assess an account and decide whether to accept it, and a policy may be written subject to the insured's compliance with the loss control recommendations. Some insurers also sell loss control separately from insurance, to businesses that retain their own losses.

> [!trap] Calling a severity measure loss prevention
> Loss prevention acts before a loss and lowers frequency, and loss reduction acts during or after one and lowers severity. Sprinklers do not stop fires starting, so they are loss reduction.
