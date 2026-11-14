---
aliases:
  - Catastrophe Modeling Output
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:c808d955c665485ace10057c9ac288adbc5dfdccecc56bf79d1ebc47b55fa8d7
  sources:
    - "CAS Syllabus Committee, Clarification and Errata to Catastrophe Modeling (Grossi & Kunreuther), March 29 2021, pp.1-3 (OEP/AEP/CEP definitions; Table 2.1 events as independent Bernoulli random variables, each occurring at most once; loss 0 if an event does not occur; AAL = sum p_i L_i), sha256:8677464a4952483b031c9559d96f083629d4e22a14281c604368665f4d9c63a6 — https://www.casact.org/sites/default/files/2021-05/8_Grossi_Kunreuther_Errata_2021.pdf"
    - "SOA, An Overview of Catastrophe Modeling Output (GI-301 study note, May 2025), pp.1-3 (printed): OEP/AEP/CEP; AAL = sum p_i L_i; independent Bernoulli events at most once; OEP(L_i) = 1 - prod(1 - p_j); return period = 1/OEP; RPL = PML; TVaR the average loss above a return period; ground-up, gross, net and final net (plus reinstatements) losses; demand surge; secondary uncertainty, sha256:e3826f24e743ccb668df1033fd90465e42c77f1c751682e0805edd748c2ce95e — https://www.soa.org/globalassets/assets/files/edu/2025/fall/study-note/2025-11-gi-301-study-note-catastrophe-output.pdf"
    - "American Academy of Actuaries, Uses of Catastrophe Model Output (July 2018), PDF pp.14-15 (stochastic event set with event rates; hazard, vulnerability with MDRs and secondary uncertainty as a standard deviation or CV; financial module applying deductibles, limits, reinsurance; AAL in ratemaking; PML/RPL in underwriting; mitigation), p.20 (territory and deductible relativities from model output), p.27 (TVaR, concentration, portfolio optimisation), p.35 (limits of historical data), sha256:66a8390a3fa24c93d203b0dec3227811a8dcd15c3cf9c8a49459bf9265260bd6 — https://actuary.org/wp-content/uploads/2019/03/Catastrophe_Modeling_Monograph_07.25.2018.pdf"
    - "Humphreys, Exceedance Probability in Catastrophe Modeling, CAS E-Forum Winter 2021, p.1 (definition; uses: ratemaking, portfolio management, underwriting, loss mitigation, cost of capital, reinsurance and risk transfer, ERM, capital adequacy used by rating agencies), p.12 (Poisson claim counts, the common assumption for catastrophes), sha256:c161864d85d35169b8e1f92af664542f05f005772e4cc6607ead0d68f08fdf89 — https://www.casact.org/sites/default/files/2021-03/02_humphreys.pdf"
    - "Lloyd's Market Association, Catastrophe Modelling: Guidance for Non-Catastrophe Modellers (June 2013), PDF pp.7-9 (ELT from the financial module; EP curve; OEP and AEP; VaR and TVaR; ELT; CoV; ground-up, gross, net and final net losses; RMS weighting academic models into a blended frequency), sha256:a09d4b5333c2e7e3a2f0c7b28a1c083cf66f274ef65f79b07e7d876bfb88fbb9 — https://web.actuaries.ie/sites/default/files/erm-resources/catastrophe_modelling_guidance_for_non_catastrophe_modellers.pdf"
    - "CAS Exam 8 Fall 2015 — sample answers and examiner's report, Q22(a)-(b), PDF pp.93-94 (all eight combinations with products of p and 1 - p; common errors: missing outcomes, not multiplying by 1 - p; simulated year takes the discrete loss, not an interpolated one), sha256:02718b9e95a9c4fc0203158467fe573920d774e0498460bb2dee0d6b4db1a0df — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam8_15-8.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026, pp.3, 7 (tasks A1-A5, readings Clark, Bernegger, Grossi & Kunreuther), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Catastrophe Model Output.md
---
**Catastrophe Model Output** is the set of loss estimates a [[Catastrophe Modelling|catastrophe model]] produces for a portfolio: an event loss table of simulated events with their annual rates and losses, a year loss table of simulated years, and the summaries drawn from them, chiefly the average annual loss and the exceedance probability curves. Actuaries use it in place of a short loss history, because catastrophes are too rare for any company's own experience to measure the risk.

The average annual loss of a portfolio is

> $$\text{AAL} = \sum_i \lambda_i\,\bar L_i$$

- $\lambda_i$ is the annual rate of event $i$ in the event loss table.
- $\bar L_i$ is the mean loss to the portfolio from event $i$.

An event's loss is the damage ratio the model reads off its damage function at the event's intensity, times the property value. The AAL is the starting point for a [[Catastrophe Expected Loss Cost|catastrophe loss cost]].

> [!example]- What are this homeowners book's average annual loss and its loss cost per $\$1{,}000$ of insured value? {Example}
> The book has $\$4$ billion of total insured value and this simplified event loss table, with losses in $\$$ millions and no secondary uncertainty:
>
> | Event | Annual rate | Loss |
> | :--- | ---: | ---: |
> | 1 | 0.002 | 60 |
> | 2 | 0.004 | 35 |
> | 3 | 0.006 | 20 |
> | 4 | 0.020 | 8 |
> | 5 | 0.100 | 2 |
>
> > [!answer]-
> > - The AAL is $0.002(60) + 0.004(35) + 0.006(20) + 0.020(8) + 0.100(2) = 0.74$, or $\$740{,}000$.
> > - The book has $4{,}000{,}000{,}000/1{,}000 = 4{,}000{,}000$ units of $\$1{,}000$ insured.
> > - The loss cost is $740{,}000/4{,}000{,}000 = \$0.185$, or 18.5 cents per $\$1{,}000$ of insured value.

## Event and year loss tables

Each row of an **event loss table (ELT)** is one stochastic event, such as a hurricane track or an earthquake rupture, with its rate, its mean loss, and usually a standard deviation and an exposure value that describe secondary uncertainty. Its losses can be gross, net of policy terms such as deductibles and limits, or net of reinsurance.

A **year loss table (YLT)** records every event and loss in each of many simulated years, often tens of thousands. It keeps the order and combination of events within a year, which is what aggregate covers, reinstatements and annual capital measures need.

## Exceedance probability curves

An exceedance probability curve shows, for each level of loss in a year, the probability that the loss exceeds that level. The **occurrence exceedance probability (OEP)** is the chance that the largest single event in a year exceeds $x$, which is what a per-occurrence [[Excess of Loss|excess of loss]] treaty responds to. With Poisson event counts and no secondary uncertainty, it is

> $$\text{OEP}(x) = 1 - \exp\Big(-\sum_{i:\,\bar L_i \ge x} \lambda_i\Big)$$

The OEP at a layer's attachment point is the annual probability that a loss reaches the layer.

The **aggregate exceedance probability (AEP)** is the chance that the year's total loss exceeds $x$, which matters for aggregate covers, earnings and capital. It is

> $$\text{AEP}(x) = \Pr\Big(\sum_{k=1}^{N} L_k \ge x\Big)$$

- $N$ is the number of events in a year.
- $L_k$ is the loss from the $k$-th event.

The AEP is never below the OEP, and it is $1 - F(x)$ for the distribution $F$ of the year's total loss.

The return period of a loss level is the average number of years between exceedances of that level. It is

> $$\text{Return period}(x) = \frac{1}{\text{EP}(x)}$$

- $\text{EP}(x)$ is the annual exceedance probability of $x$, on the OEP or the AEP curve.

A 1-in-100 loss has a 1% chance each year, not a guarantee of occurring once a century. Over 30 years the chance of at least one is about 26%. To find the probability that a loss exceeds a given amount, read the return period at that amount off the curve and take its reciprocal.

> [!example]- From the homeowners book's event loss table above, what are its 1-in-100 and 1-in-250 OEP losses? {Example}
> - For each loss, add the rates of the events at least as large: 0.002 for $\$60$ million, 0.006 for $\$35$ million and 0.012 for $\$20$ million.
> - $\text{OEP}(35) = 1 - e^{-0.006} = 0.598\%$, a 167-year return period.
> - $\text{OEP}(20) = 1 - e^{-0.012} = 1.193\%$, an 84-year return period.
> - The 1% exceedance point lies between them. On this discrete table the 99th percentile of the year's largest loss is $\$20$ million, so the 1-in-100 OEP loss is $\$20$ million.
> - $\text{OEP}(60) = 0.200\%$ is below 0.4% and $\text{OEP}(35)$ is above it, so the 1-in-250 OEP loss is $\$35$ million.

## Aggregate losses from independent events

The CAS errata to Grossi and Kunreuther treat the events of an event table as independent Bernoulli random variables, each occurring at most once a year with probability $p_i$. An event that does not occur has loss $0$, so the year's total is the sum of the losses of the events that occur. With $n$ events there are $2^n$ combinations of occurring or not, and the probability of each combination is

> $$\prod_{i \text{ occurs}} p_i \prod_{i \text{ does not}} (1 - p_i)$$

Its loss is the sum of the occurring events' losses, and the year with no event has probability $\prod_i (1 - p_i)$. Sorting the combinations from the largest total loss to the smallest and cumulating the probabilities from the top gives the AEP. The distribution is discrete: a simulated year whose random number falls between two cumulative probabilities takes the loss of that step, not an interpolated amount.

> [!example]- Event 1 has $p_1 = 0.2$ and loss $5$. Event 2 has $p_2 = 0.1$ and loss $8$. What are $\text{AEP}(13)$, $\text{AEP}(8)$ and $\text{AEP}(5)$? {Example}
> - The outcome $0$ (neither event) has probability $0.8 \times 0.9 = 0.72$.
> - The outcome $5$ (event 1 only) has probability $0.2 \times 0.9 = 0.18$.
> - The outcome $8$ (event 2 only) has probability $0.8 \times 0.1 = 0.08$.
> - The outcome $13$ (both) has probability $0.2 \times 0.1 = 0.02$.
> - Cumulating from the top, $\text{AEP}(13) = 0.02$, $\text{AEP}(8) = 0.02 + 0.08 = 0.10$ and $\text{AEP}(5) = 0.10 + 0.18 = 0.28$.

## Probable maximum loss and tail value-at-risk

A [[Probable Maximum Loss|probable maximum loss]] (PML) is the loss at a stated return period, a value-at-risk read off the OEP or AEP curve. A 1-in-$N$ year PML is the loss whose annual exceedance probability is $1/N$. Tail value-at-risk (TVaR) averages the losses beyond that point, so it measures how bad the tail is, not only where it starts.

A per-occurrence layer of $l$ excess of $a$ pays $\min(\max(\bar L_i - a, 0), l)$ for each event, so its expected annual loss is

> $$E[\text{Layer}] = \sum_i \lambda_i \min\big(\max(\bar L_i - a, 0),\, l\big)$$

> [!example]- From the homeowners book's event loss table above, what is the expected annual loss to a $\$20$ million excess of $\$15$ million per-occurrence layer? {Example}
> - Events 1 and 2 exhaust the layer, so each pays $\$20$ million.
> - Event 3 pays $20 - 15 = \$5$ million. Events 4 and 5 do not reach it.
> - The expected annual loss is $0.002(20) + 0.004(20) + 0.006(5) = 0.15$, or $\$150{,}000$.
> - That is about 20% of the AAL, before any load for risk or reinstatements.

## Uses of the output

In ratemaking, the AAL by territory and construction replaces catastrophe losses in the experience period and drives territory and deductible relativities. In reinsurance, the curves price layers, size the program, decide how much risk to cede and assess the effect of adding new risks. In capital and [[Catastrophe Exposure Management|exposure management]], PMLs and TVaRs are compared with limits and with rating agency or regulatory return periods, and required capital may be set to cover the PML at a return period such as 1-in-100. Output is also used for underwriting, accumulation control, mitigation credits and post-event loss estimates.

## Secondary uncertainty and model uncertainty

Even for a given event the loss is uncertain, because damage to buildings of the same type varies. Models carry a distribution of loss for each event, often a beta distribution, and including it fattens the tail of the curves while leaving the AAL unchanged. It raises the tail losses and the losses to layers at high attachments, so it moves the PML but not the mean.

Vendor models can give materially different results for the same portfolio. Actuaries validate them against history and adjust them, and they may blend several models by weighting their losses or their exceedance probabilities, which is a source of [[Model Risk|model risk]] that should be disclosed.

> [!trap] Pricing an aggregate cover from the OEP curve
> A per-occurrence treaty is priced from the occurrence curve, and an aggregate cover from the aggregate curve. Using the OEP for an aggregate cover understates the chance it is hit.
