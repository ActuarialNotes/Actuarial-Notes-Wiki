---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:622b429a224a6c14278619adc81ea2626bba1219d8a1f51e57a565f8554424ac
  sources:
    - "Humphreys, Exceedance Probability in Catastrophe Modeling, CAS E-Forum Winter 2021, pp.1-7, 16 (definition and perils incl. terrorism; uses: ratemaking, portfolio management, underwriting, cost of capital, cost of reinsurance and risk transfer, ERM, capital adequacy; EP(x) = P(X > x); AAL = sum p_i X_i; return period = 1/EP; OEP = probability the largest loss in a year exceeds x; AEP the survival function of the annual aggregate S, E[S] = integral of A(x) dx; AEP used for aggregate covers such as stop loss), sha256:c161864d85d35169b8e1f92af664542f05f005772e4cc6607ead0d68f08fdf89 — https://www.casact.org/sites/default/files/2021-03/02_humphreys.pdf"
    - "Ermoliev, Ermolieva, MacDonald & Norkin, Insurability of Catastrophic Risks: The Stochastic Optimization Model, IIASA Research Report RR-00-20 (reprinted from Optimization 47, 2000, with permission), PDF pp.3-4 (catastrophes produce losses highly correlated in space and time, which break the law of large numbers; insurers can reduce ruin only by deliberately selecting the dependent risks they cover; catastrophe modelling used for coverage, premiums and reinsurance), sha256:451edc97fb5e761c971298be1e43e1f43ad5970a850631a559fa93d7b93cb5d0 — https://pure.iiasa.ac.at/id/eprint/6252/1/RR-00-20.pdf"
    - "Braun & Kousky, Catastrophe Bonds, Wharton Risk Center Primer (July 2021), pp.1-6 (sponsor, bankruptcy-remote SPV, Treasury collateral in trust, floating rate plus premium; indemnity, industry-loss, parametric and modelled-loss triggers and Figure 3: parametric most transparent and most basis risk, indemnity the opposite, the other two between; modeller estimates probability of first loss and EL from property and policy data; average maturity three years; proportional payout from attachment to exhaustion; multi-year price stability, full collateral, dollar-for-dollar capital in the top layers; complement and substitute for reinsurance), sha256:38708381788f2732616650c245307b1775384bb347f4d1f7a884d05eb13918e7 — https://esg.wharton.upenn.edu/wp-content/uploads/2023/08/Cat-Bond-Primer-July-2021.pdf"
    - "CAS Exam 8 Fall 2012 — exam and examiner's report, Q9, PDF pp.45, 51 (EP curve: annual loss levels and the probability each is exceeded; 1-in-25 PML), sha256:f0a8a4e1060ad54d4a69208dd574d53dbcafc29ceddbabe7be0a2da2e0f9232b — https://www.casact.org/sites/default/files/2021-03/f12-8.pdf"
    - "CAS Exam 8 Fall 2013 — exam and examiner's report, Q24, PDF pp.43, 90-91 (PML at a 1-in-250 return period = OEP 0.004), sha256:8e644179a5722b0d1968c3d9caa38514a01ca4cded397441dd1d9af00d3cc9dc — https://www.casact.org/sites/default/files/2021-03/13-8.pdf"
    - "CAS Exam 8 Fall 2016 — sample answers and examiner's report, Q18, PDF pp.72-73 (the four modules: event/hazard, inventory/exposure, vulnerability/damage, loss; inventory data on building codes, built value, type, contents; policy limits and deductibles; epistemic reducible, aleatory not), sha256:ad67f56b0e090f8c283c58e728d656f4685a6e2b3ff8219144ecb46facbeac2e — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam8_16-8.pdf"
    - "CAS Exam 8 Fall 2018 — exam and examiner's report, Q17, PDF pp.88-89 (inventory and vulnerability modules; parameters such as magnitude, soil type, location, wind speed; epistemic uncertainty; logic trees and simulation), sha256:7993ff15f4c6aae538bde337a57fbbf775aab27f3a232b8a828458ac52a330c4 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam8_18-8.pdf"
    - "CAS Syllabus Committee, Clarification and Errata to Catastrophe Modeling (Grossi & Kunreuther), March 29 2021, pp.1-3 (OEP, AEP and CEP definitions; AAL = sum p_i L_i in Table 2.1), sha256:8677464a4952483b031c9559d96f083629d4e22a14281c604368665f4d9c63a6 — https://www.casact.org/sites/default/files/2021-05/8_Grossi_Kunreuther_Errata_2021.pdf"
    - "Knowledge at Wharton, 'Catastrophe Modeling: A New Approach to Managing Risk' (review of Grossi & Kunreuther), the review (AIR, EQECAT, RMS; Charleston comparison of the three models' EP curves) — scope record of the reading, sha256:f9dca555169b3e45d38f10285a304e40e3968663d129d64fd5eeba7285f2e716 — https://knowledge.wharton.upenn.edu/article/catastrophe-modeling-a-new-approach-to-managing-risk/"
    - "U.S. GAO, Catastrophe Insurance Risks: The Role of Risk-Linked Securities (GAO-02-941, 2002), PDF pp.8, 10, 18, 20-26 (cat bonds' risks uncorrelated with other bond risks; securitization; moral hazard and basis risk of non-indemnity cover; U.S. capital markets about $31 trillion, fn.10; Florida Hurricane Catastrophe Fund established to provide reinsurance; SPRV, trust, LIBOR plus spread, multiyear pricing; non-indemnity cover and reinsurance accounting), sha256:14de86f282f00ef14b4382979e503f0a202138d57bc482017228da5d9a200d24 — https://www.gao.gov/assets/gao-02-941.pdf"
    - "Blanchet, Lam, Tang & Yuan, Mitigating Extreme Risks Through Securitization (SOA research report, Mar 2017), §§1.2-1.4 PDF pp.4-8 (reinsurance capacity too small; ILS, SPV; triggers; moral hazard vs basis risk; disclosure and slow indemnity settlement), sha256:674f956d74f5f5bae9ad9f92126ebf0a8c47693af78dfbf2bd12454f5d9b3d66 — https://www.soa.org/globalassets/assets/files/research/projects/2017-03-mitigating-risks-through-securitization.pdf"
    - "CAS Exam 9 Spring 2018 — sample answers and examiner's report, Q11, PDF pp.14, 62-66 (indemnity, industry-index, modelled-loss and parametric triggers; issuer vs investor preference), sha256:1a71540d2106881211b9b06b4e3735f36d25f12b0d668d0aa4fa08f3fef19d89 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam9_18-9.pdf"
    - "IAIS, presentation on NatCat modelling and climate risk, hosted by EIOPA (May 2023), pp.4, 8 (climate change a source of financial risk to insurers; the IAIS needs estimates of the impact of climate change on future NatCat losses by country and peril), sha256:aecb0656c0f81552575a3a27273eee297577bf994dbda1338d782843f338a982 — https://www.eiopa.europa.eu/system/files/2023-05/Future%20initiative%202%20-%20IAIS%20presentation.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18) — scope check, pp.3, 5, 7 (Domain A tasks 4-5 with Grossi & Kunreuther; Domain C task 7 securitization and CAT bonds with Coval, Jurek & Stafford, Cummins CAT Bond, Cummins Capital, Mildenhall & Major, Panning; readings table: Grossi & Kunreuther Ch.2-6 for A4-A5, CJS for C5-C6, Cummins CAT Bond for C7), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Catastrophe Risk.md
---

**Catastrophe Risk** is the risk of a very large loss from a single event — hurricane, earthquake, flood, wildfire, severe convective storm, or a man-made event such as terrorism — that damages many insured exposures at once. Its defining feature is **correlation**: one event strikes many policies together, so pooling does not diversify it the way it diversifies independent claims.

> $$\text{EP}(x) = P(\text{annual loss} > x)$$
>
> $$\text{Return period}(x) = \frac{1}{\text{EP}(x)}$$

- The **exceedance probability curve** $\text{EP}(x)$ is the standard description of catastrophe risk. The *occurrence* curve (OEP) looks at the largest single event in a year, the *aggregate* curve (AEP) at the year's total. The area under the AEP curve is the average annual loss ([[Catastrophe Expected Loss Cost]]), and the loss at a chosen return period is the [[Probable Maximum Loss|PML]].
- **How it is modelled.** Grossi and Kunreuther describe a catastrophe model in four parts: *hazard* (where events occur, how often, how intense), *inventory* (the exposed properties), *vulnerability* (damage given intensity) and *loss* (the financial result after policy terms). See [[Catastrophe Modelling]].
- **Two kinds of uncertainty.** *Aleatory* uncertainty is the inherent randomness of events and cannot be reduced; *epistemic* uncertainty comes from incomplete knowledge of the hazard, vulnerability and exposure, and can be. Different vendor models give materially different answers for the same book ([[Model Risk]]).
- **Why it is capital-hungry.** Catastrophes produce losses correlated in space and time, so the [[Law of Large Numbers]] does not operate across the book, and catastrophe risk needs capital out of proportion to its expected loss: in the highest layers a reinsurer's diversification advantage becomes negligible and it must back each dollar of exposure with a dollar of capital. Insurers transfer it through [[Reinsurance|reinsurance]] ([[Reinsurance Pricing]]) and choose which accumulations to hold ([[Catastrophe Exposure Management]]).
- **Capital markets.** [[Securitization]] moves catastrophe risk to investors through [[CAT Bonds]] and other [[Insurance-Linked Securities]]. A cat bond's principal is held in a collateral trust, largely removing counterparty credit risk. Its trigger — indemnity (the sponsor's own losses), industry index, parametric (physical event measures) or modelled loss — trades *basis risk* (the payout not matching the sponsor's loss) against moral hazard, transparency and speed of settlement.
- Public mechanisms share part of the risk, for example the [[Florida Hurricane Catastrophe Fund]]; a changing climate alters future catastrophe losses ([[Climate Risk]]).

> [!example]- Why Pooling Fails: Independent Versus Correlated Homes {Example}
> An insurer covers $1{,}000$ homes, each with a $1\%$ annual chance of a \$200,000 total loss. Compare the mean and standard deviation of annual losses if (a) the losses are independent (fires) and (b) a single event destroys every home at once with probability $1\%$ (a storm).
>
> > [!answer]-
> > The mean is the same in both: $1{,}000 \times 0.01 \times \$200{,}000 = \$2$M.
> >
> > $$
> > \begin{align*}
> > \sigma_{(a)} &= \$200{,}000\sqrt{1{,}000(0.01)(0.99)} \\
> > &= \$0.63\text{M} \\
> > \sigma_{(b)} &= \$200\text{M}\sqrt{0.01(0.99)} \\
> > &= \$19.9\text{M}
> > \end{align*}
> > $$
> >
> > The coefficient of variation is $0.31$ for independent losses and $9.95$ for correlated ones — about $32$ times as large. Adding homes shrinks the relative volatility in (a) but not at all in (b). The expected loss is identical; the capital needed is not.

> [!example]- Occurrence Versus Aggregate Exceedance {Example}
> A region faces two independent perils, each striking at most once a year: a hurricane costing $60$ with probability $0.05$, and a hailstorm costing $30$ with probability $0.10$. Find the AAL, the occurrence and aggregate exceedance probabilities at $50$ and $70$, and the return period of a year's losses exceeding $70$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{AAL} &= 0.05(60) + 0.10(30) \\
> > &= 6 \\
> > \text{OEP}(50) &= P(\text{hurricane}) \\
> > &= 0.05 \\
> > \text{AEP}(70) &= P(\text{both occur}) \\
> > &= 0.05(0.10) \\
> > &= 0.005
> > \end{align*}
> > $$
> >
> > $\text{AEP}(50) = 0.05$ as well, since the year's total exceeds $50$ exactly when the hurricane occurs; but $\text{OEP}(70) = 0$, because no single event exceeds $70$. The year's total exceeds $70$ once in $1/0.005 = 200$ years. A per-occurrence cover attaching at $70$ would never pay; an aggregate cover attaching at $70$ would — which is why the two curves answer different questions.
