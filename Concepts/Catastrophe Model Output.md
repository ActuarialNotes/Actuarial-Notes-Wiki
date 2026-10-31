---
aliases:
  - Catastrophe Modeling Output
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:8b601219cf2ef0ebb1e692f6b09c8ad389f404541579ace8a11defe61018a31a
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

> $$\text{AAL} = \sum_i \lambda_i\,\bar L_i$$

> $$\text{OEP}(x) = 1 - \exp\Big(-\sum_{i:\,\bar L_i \ge x} \lambda_i\Big)$$

> $$\text{AEP}(x) = \Pr\Big(\sum_{k=1}^{N} L_k \ge x\Big) \ge \text{OEP}(x)$$

> $$\text{Return period}(x) = \frac{1}{\text{EP}(x)}$$

- **Symbols:** Event $i$ in the event loss table has annual rate $\lambda_i$ and mean loss $\bar L_i$ to the portfolio. $N$ is the number of events in a year and $L_k$ the loss from the $k$-th. The OEP formula assumes Poisson event counts and no secondary uncertainty.
- **Event loss table (ELT):** Each row is one stochastic event, such as a hurricane track or an earthquake rupture, with its rate, its mean loss, and usually a standard deviation and an exposure value that describe secondary uncertainty. Its losses can be gross, net of policy terms such as deductibles and limits, or net of reinsurance.
- **Year loss table (YLT):** The model simulates many years, often tens of thousands, and records every event and loss in each. A YLT keeps the order and combination of events within a year, which is what aggregate covers, reinstatements and annual capital measures need.
- **OEP and AEP:** The occurrence exceedance probability is the chance that the largest single event in a year exceeds $x$, which is what a per-occurrence [[Excess of Loss|excess of loss]] treaty responds to. The aggregate exceedance probability is the chance that the year's total exceeds $x$, which matters for aggregate covers, earnings and capital. AEP is never below OEP.
- **Aggregate outcomes from independent events.** The CAS errata to Grossi and Kunreuther treat the events of an event table as independent Bernoulli random variables, each occurring at most once a year with probability $p_i$, and an event that does not occur has loss $0$. The year's total is then the sum of the losses of the events that occur, so with $n$ events there are $2^n$ combinations of occurring or not. Each combination's probability is the product of $p_i$ over the events that occur and $1 - p_i$ over those that don't, and its loss is the sum of the occurring events' losses. Sorting the combinations by total loss and adding probabilities from the top gives the AEP; the year with no event has probability $\prod_i (1 - p_i)$. For two events with $p_1 = 0.2$ (loss $5$) and $p_2 = 0.1$ (loss $8$), the outcomes are $0$ with probability $0.8 \times 0.9 = 0.72$, $5$ with $0.2 \times 0.9 = 0.18$, $8$ with $0.8 \times 0.1 = 0.08$ and $13$ with $0.2 \times 0.1 = 0.02$, so $\text{AEP}(13) = 0.02$, $\text{AEP}(8) = 0.10$ and $\text{AEP}(5) = 0.28$. The distribution is discrete: a simulated year whose random number falls between two cumulative probabilities takes the loss of that step, not an interpolated amount.
- **AAL, PML and TVaR:** The average annual loss is the mean of the annual loss and is the starting point for a [[Catastrophe Expected Loss Cost|catastrophe loss cost]]. A [[Probable Maximum Loss|probable maximum loss]] is the loss at a stated return period, a value-at-risk read off the OEP or AEP curve. Tail value-at-risk averages the losses beyond that point, so it sees how bad the tail is, not only where it starts.
- **Uses:** In ratemaking, the AAL by territory and construction replaces catastrophe losses in the experience period and drives territory and deductible relativities. In reinsurance, the curves price layers and size the program. In capital and [[Catastrophe Exposure Management|exposure management]], PMLs and TVaRs are compared with limits and with rating agency or regulatory return periods. Output is also used for underwriting, accumulation control, mitigation credits and post-event loss estimates.
- **Secondary uncertainty:** Even for a given event the loss is uncertain, because damage to buildings of the same type varies. Models carry a distribution of loss for each event, often a beta distribution, and including it fattens the tail of the curves while leaving the AAL unchanged.
- **Model uncertainty and blending:** Vendor models can give materially different results for the same portfolio. Actuaries validate them against history and adjust them, and they may blend several models by weighting their losses or their exceedance probabilities, which is a source of [[Model Risk|model risk]] that should be disclosed.

> [!example]- AAL, a 1-in-100 OEP Loss and a Layer's Expected Loss {Example}
> A homeowners book with \$4 billion of total insured value has this simplified event loss table, with losses in \$ millions and no secondary uncertainty. Find the average annual loss and the loss cost per \$1,000 of insured value, the 1-in-100 and 1-in-250 OEP losses, and the expected annual loss to a \$20 million excess of \$15 million per-occurrence layer.
>
> | Event | Annual rate | Loss |
> |---|---|---|
> | 1 | 0.002 | 60 |
> | 2 | 0.004 | 35 |
> | 3 | 0.006 | 20 |
> | 4 | 0.020 | 8 |
> | 5 | 0.100 | 2 |
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{AAL} &= 0.002(60) + 0.004(35) + 0.006(20) + 0.020(8) + 0.100(2) \\
> > &= 0.74 \\
> > \text{Loss cost} &= \frac{740{,}000}{4{,}000{,}000{,}000 / 1{,}000} \\
> > &= 0.185
> > \end{align*}
> > $$
> > The AAL is \$740,000, or 18.5 cents per \$1,000 of insured value. For the OEP curve, add the rates of events at least as large as each loss.
> > $$
> > \begin{align*}
> > \text{OEP}(35) &= 1 - e^{-0.006} \\
> > &= 0.598\% \\
> > \text{OEP}(20) &= 1 - e^{-0.012} \\
> > &= 1.193\%
> > \end{align*}
> > $$
> > A loss of \$20 million or more has an 84-year return period and one of \$35 million or more a 167-year return period. The 1% exceedance point lies between them, and on this discrete table the 99th percentile of the year's largest loss is \$20 million, so the 1-in-100 OEP loss is \$20 million. Similarly the 1-in-250 OEP loss is \$35 million, since $\text{OEP}(60) = 0.200\%$ is below 0.4%. The layer pays $\min(\max(\bar L - 15, 0), 20)$ for each event.
> > $$
> > \begin{align*}
> > E[\text{Layer}] &= 0.002(20) + 0.004(20) + 0.006(5) \\
> > &= 0.15
> > \end{align*}
> > $$
> > The layer's expected annual loss is \$150,000, about 20% of the AAL, before any load for risk or reinstatements.

> [!tip]- How it appears on the exam
> - **GI-301 (objectives 8a to 8c):** Questions ask what a catastrophe model is built from, what an ELT and a YLT contain, and the difference between OEP and AEP, AAL, PML and TVaR.
> - **Calculations:** From a small event table candidates compute the AAL, read a return-period loss from the OEP curve, or find a layer's expected loss, as in the example.
> - **Uses:** Written answers describe how the output is used in ratemaking, reinsurance purchasing and pricing, capital and accumulation management, and what secondary uncertainty and model blending do to the results. The output then feeds the [[Catastrophe Risk Load|risk load]] allocation of objective 8d.

> [!warning]- Exam traps
> - **OEP versus AEP:** A per-occurrence treaty is priced from the occurrence curve, and an aggregate cover from the aggregate curve. Using the OEP for an aggregate cover understates the chance it is hit.
> - **Adding probabilities:** Exceedance probabilities come from the summed rates through $1 - e^{-\lambda}$. Adding the rates directly is a close approximation only when they are small.
> - **Return period language:** A 1-in-100 loss has a 1% chance each year, not a guarantee of occurring once a century. Over 30 years the chance of at least one is about 26%.
> - **Secondary uncertainty and the AAL:** Secondary uncertainty widens the curves and raises the tail losses and layer losses at high attachments, but it does not change the AAL. A question that adds it should move the PML, not the mean.
