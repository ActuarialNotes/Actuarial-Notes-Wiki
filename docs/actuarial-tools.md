# Actuarial Tools — plan

_Last updated: 2026-10-10 · Status: **Phase 1 nearly built** — thirty-two tools on the Tools page
and in the MCP connector, each checked against a published source. §16 says what is built and
§15 what of Phase 1 is still to do._

**Actuarial Tools** is a new section of the app: a catalogue of actuarial calculators that
people and AI agents both use. A person uses a tool card. An agent uses the same tool through
the MCP connector or a JSON endpoint. Both run the same code on the same inputs and get the
same numbers, the same working and the same citations.

Two design choices shape everything below:
- **Each tool does one thing.** It answers one question with one method: *Bornhuetter-Ferguson
  ultimate*, not *Reserving*. Bigger jobs are built by passing one tool's output to the next.
- **Each tool is small and live**, in the shape of the distribution simulators
  (`docs/distribution-simulators.md`): one card, the answer on top, the inputs below it,
  recomputed as they change, and nothing else on screen.

This document is the build spec. §4 lists which tools practitioners need, what each is for,
and its features. The rest covers how the tools are built, verified, shown to people and
exposed to agents, phase by phase.

> **Where it fits.** `docs/actuarial-agent-product-plan.md` §9 calls for calculation tools in
> its item **B3** ("actuarial calculators grounded in the question bank's methods … with
> checkable outputs"). `docs/ai-connector.md`'s *Not yet* list names calculators as the next
> connector capability, and notes the obstacle: the tested maths is TypeScript, and the MCP
> function can't import it. This plan delivers B3 and removes that obstacle (§8.2). It is
> also the "Populate" half of Cowork (`docs/cowork.md`). Cowork exports blank value cells
> because the app holds no data. Tools compute values from the reader's own data, so those
> values aren't invented (§10).

---

## 1. What it is, and what it isn't

**It is** a set of deterministic, documented calculators for actuarial methods. Each one:
- takes the user's data (a triangle, a loss listing, a rate history, cash flows or
  distribution parameters);
- applies one named method, as a cited reading defines it, to answer one question;
- returns the result, the step-by-step working, and the judgments that went into it.

**It is not:**
- **A reserving or pricing system.** There are no books of business, no system-of-record
  integration, no scheduled runs. A tool answers one calculation and forgets it unless the
  user saves it.
- **An actuarial opinion.** A tool computes. It never concludes. Every choice that's a matter
  of judgment (an LDF selection, a trend rate, a credibility standard, a tail) is an explicit
  input. The output lists the judgments made, including the ones left at their defaults.
- **A source of parameters.** No "industry LDFs", benchmark trends or typical ELRs. A factor
  either comes from the user or is transcribed from a published source with its citation
  (§3, R2). This is the rule that the pass-rate tables, Cowork and the Store already follow.
- **A spreadsheet.** Excel is where practitioners work. Tools import from it (paste) and
  export to it (`.xlsx`). They don't try to replace it.
- **Part of the game.** Tool runs earn no XP, gems or mastery and keep no streak. A tool is
  for doing the work, and the learning surfaces stay separate.

---

## 2. Who uses it, and for what

| User | Job to be done | Example |
|---|---|---|
| **Exam candidate** | "Show me the method working on numbers, step by step, and check my hand calculation." | Works an Exam 5 BF problem by hand, enters the triangle, and compares their result line by line with the tool's **Working**. |
| **Practising actuary** | "Run the standard method on my data quickly and correctly, with workpapers I can file." | Pastes a paid triangle from Excel into Age-to-Age Factors, then sends the selections on to Development to Ultimate, and from there to Chain Ladder, BF and Cape Cod. Exports each run as an `.xlsx` with the method references for the ASOP 41 documentation. |
| **Pricing analyst** | "Build the indication from rate history, premium and losses." | Gets on-level factors from the rate history, a trend factor from the selected trend, and the indicated change from the Loss Ratio Method tool. Each step is its own tool. |
| **Reviewer / regulator / auditor** | "Re-perform a filed calculation from its exhibit numbers." | Enters the filing's factors and checks that the indicated change reproduces. |
| **Adjacent professional** | "Understand what the number means." | Taps the tool's title, which opens the concept page in the popup, without reading a textbook. |
| **AI agent acting for any of these** | "Do the arithmetic with a verified engine instead of in the model's head, and give the human something to inspect." | Claude, with the connector, runs Age-to-Age Factors on an uploaded CSV, asks the user to pick the LDFs, runs each method as its own call, drafts commentary citing the concept pages, and returns an `app_url` for each run. |

The agent row is the reason the section exists. A general model will do a chain ladder
"by hand" in its reply. It miscounts the triangle, rounds partway through, and invents a
tail. A tool call fixes all three, and every number becomes something the human can check.

---

## 3. Ground rules

These hold up the whole section. Each is enforced in code and pinned by a test, as in
`docs/ai-connector.md` and `docs/actuaria-online.md` §2.

- **R1 — One engine, two front doors.** A tool is a pure function in `quiz/src/lib/tools/`.
  The tool card, the MCP connector and the HTTP endpoint all call that function. Nothing is
  re-implemented for a surface. A parity test runs every tool's fixtures through all three
  and requires identical output.
- **R2 — Nothing is invented.** Results are derived from inputs. A tool ships no default
  *parameter* that stands for a fact about the world, such as an industry factor, a trend or
  a mortality rate. Published tables, such as a life table, OSFI's MCT risk factors or the
  MBBEFD curve parameters, are **transcribed** with their source and the date read, never
  reconstructed. Sample inputs ("Load an example") are **published worked examples** with
  their citation (a Friedland exhibit, a Werner & Modlin appendix, a bank question), never
  plausible-looking made-up data.
- **R3 — Tools compute; people judge.** A judgment is an input. Where a tool offers a default
  method choice (for example, all-year volume-weighted averages), the output's `judgments`
  list names it and marks it `default: true`. An agent therefore can't present a default as
  a selection. Where a standard governs the choice, the judgment links the vault's page for
  it (ASOP 13, 23, 43, 56), never an invented section number.
- **R4 — Show the working.** Every result carries a **trace**: each step's formula (LaTeX),
  the values substituted and the result, in order. A run is reproducible. The result names
  the tool version and engine version and a hash of the canonicalised input. Anything random
  (bootstrap, simulation) takes a seed and echoes it.
- **R5 — The method is a vault page.** A tool's title opens its concept page in
  `ConceptPopup` (there is no second reader; see `docs/cowork.md` §4). The tool's metadata
  links its concept pages and the readings with chapters. The method page's fact-check
  verdict travels with every result, as it does for every MCP result today.
- **R6 — Tested against a source.** A tool can leave Preview only once it reproduces at
  least one **published** worked example to the source's precision (§9). The tool card shows
  what it was tested against, for example "Reproduces Friedland (2010) Ch. 7 example". It
  shows nothing until such a test passes in CI.
- **R7 — The user's data stays theirs.** In the app, tools compute in the browser, and data
  never leaves the device unless the user saves a run to their account. The HTTP and MCP
  endpoints are stateless: no input is stored, and logs record only the tool id, duration and
  outcome. Analytics events carry the tool id and never a value.
- **R8 — Tool ids are public API.** `reserving.chain_ladder` is a contract, like the MCP tool
  names. Tools are semver'd. A breaking change ships as a new major version, and the old one
  keeps answering through a deprecation window.
- **R9 — One tool, one job.** A tool answers **one question**, which its spec states in one
  sentence (`answers`), and produces **one kind of output**. The test for whether two methods
  are one tool or two: if they answer the same question **from the same inputs**, they're
  options of one tool (the averages in Age-to-Age Factors, the curves in Tail Factor). If
  they need different inputs, they're different tools (the loss ratio and pure premium
  methods need premium and exposure respectively). Anything that combines several
  calculations is a chain of tools, never a bigger tool (§6.5). A registry test holds every
  spec to it: one `answers` sentence, one produced kind, at most three headline results and
  at most six scalar inputs.
- **R10 — Small and live.** Every tool is one card in the distribution simulator's shape
  (§6.3): the answer above, the inputs below, recomputed on every change, with no Run
  button and no form to submit. It shows only what the answer needs. Everything else waits
  behind one menu. A scalar tool fits an iPhone screen without scrolling, and an e2e test
  holds it there. As with the simulator, a change that adds a row has to take one away.

---

## 4. The tool catalogue

The catalogue is organised by **practice area**: what a practitioner calls the work, not
which exam examines it. Each tool lists the vault concept pages it implements and the exams
that examine them, and its catalogue row shows those exams' logos, as an exam row does.
That's the bridge back to Study mode.

Every tool is discrete (R9). Each row gives the one question it answers and what goes in
and comes out. **→** means "can be sent to": the output of one tool is the input of the
next.

**Phase** is when the tool is built (§11). Priority comes from three things: how often
practitioners do the calculation, how deep the vault's coverage is (P&C ratemaking and
reserving are deep, life contingencies are still `development`), and how much existing code
the tool can reuse.

### 4.1 Data

| Tool | Answers | In → out | Vault pages | Phase |
|---|---|---|---|---|
| **Triangle from Claim Listing** | What are the triangles in this claim data? | Transactions (claim, accident/report/transaction date, paid, case; columns mapped by the user), origin basis (AY/RY/PY), evaluation interval → one triangle: paid, reported, or reported/closed/open counts. ASOP 23-style checks (negative values, dates out of order, a claim closed with case open, totals reconciled) appear as warnings | Ratemaking Data Organization, Accident Year, Report Year, Policy Year; ASOP 23 | 2 |
| **Ratio Triangle** | How does one triangle compare to another, cell by cell? | Two triangles → their ratio, shaded by size so a diagonal shift stands out. Covers paid ÷ reported, closed ÷ reported, average case O/S (case ÷ open counts) and average paid | Development Triangle; Friedland Ch. 6 | 1 |

Cumulative ↔ incremental is not a tool. It's a switch on every triangle grid.

### 4.2 Reserving (Friedland 2010; Exam 5, 6C, 7)

| Tool | Answers | In → out | Vault pages / reading | Phase |
|---|---|---|---|---|
| **Age-to-Age Factors** | How has each origin developed between ages? | Triangle, average (simple, volume-weighted, medial, geometric; all or latest *n*), excluded cells → factor triangle and the average at each age. → Development to Ultimate | Loss Development; Friedland Ch. 7 | 0 |
| **Tail Factor** | How much development is left after the last age? | Selected age-to-age factors, curve (exponential decay or inverse power fitted to factor − 1, or Bondy) → tail factor and the fitted curve | Tail Factor | 1 |
| **Development to Ultimate** | What are the CDFs? | Selected age-to-age factors, tail → CDF and % developed by age. → Chain Ladder, BF, Benktander, Cape Cod | Chain Ladder Method | 1 |
| **Chain Ladder** | What's the ultimate by development? | Latest diagonal, CDFs → ultimate and IBNR by origin | Chain Ladder Method, Chain Ladder Assumptions; Friedland Ch. 7 | 1 |
| **Expected Claims** | What's the a priori ultimate? | Earned premium (or exposure), ELR (or pure premium) → expected claims by origin. → BF, Benktander | Friedland Ch. 8 | 1 |
| **Bornhuetter-Ferguson** | What's the BF ultimate? | Latest diagonal, CDFs, expected claims → ultimate and IBNR by origin | Bornhuetter-Ferguson Method; Friedland Ch. 9 | 1 |
| **Benktander** | What's the iterated BF ultimate? | As BF, plus the number of iterations → ultimate and IBNR | Benktander Method; Mack (2000) | 1 |
| **Cape Cod** | What ELR do the data imply, and what ultimate follows? | Latest diagonal, CDFs, on-level earned premium, decay (optional) → the Cape Cod ELR and ultimates | Cape Cod Method; Friedland Ch. 10 | 1 |
| **Frequency-Severity** | What's the ultimate from counts and severities? | Ultimate counts, ultimate severities, severity trend → ultimate by origin | Frequency-Severity Method; Friedland Ch. 11 | 2 |
| **Case Outstanding Development** | What's the IBNR from case reserves? | Case triangle, paid triangle → IBNR by origin (self-insurer method) | Friedland Ch. 12 | 2 |
| **Case Adequacy Adjustment** | What would the reported triangle be at today's case adequacy? | Reported, paid and open-count triangles, severity trend → adjusted reported triangle. → Age-to-Age Factors | Berquist-Sherman Method; Friedland Ch. 13 | 2 |
| **Settlement Rate Adjustment** | What would the paid triangle be at today's settlement rate? | Paid, closed-count and ultimate-count triangles → adjusted paid triangle. → Age-to-Age Factors | Berquist-Sherman Method; Friedland Ch. 13 | 2 |
| **ULAE — Classical** | What's the unpaid ULAE? | Paid ULAE, paid claims, IBNR, case → unpaid ULAE (paid-to-paid ratio) | Friedland Ch. 17 | 2 |
| **ULAE — Kittel** | What's the unpaid ULAE, allowing for reporting? | As Classical, plus reported claims → unpaid ULAE | Friedland Ch. 17 | 2 |
| **Mack Standard Error** | How uncertain is the chain-ladder reserve? | Triangle, selected factors → standard error by origin and in total | Mack Chain Ladder Model; Mack (1994) | 2 |
| **ODP Bootstrap** | What's the distribution of the unpaid? | Incremental triangle, iterations, seed → percentiles and a histogram (in a Web Worker). → VaR & TVaR | ODP Bootstrap Model; Shapland (2016) | 2 |
| **Clark Growth Curve** | What's the ultimate and its variance from a growth curve? | Incremental triangle, curve (loglogistic or Weibull), LDF or Cape Cod form → ultimates, reserve and its standard deviation | Clark (2003) | 2 |
| **Expected Emergence** | How much should have emerged since the last review? | Prior ultimates, prior CDFs, ages now → expected emergence by origin, to compare with actual | Roll Forward Analysis | 3 |
| **Risk Adjustment — Cost of Capital** | What's the IFRS 17 risk adjustment by the cost-of-capital method? | Projected capital by period, cost-of-capital rate, discount curve → risk adjustment | Insurance Risk Margin; CIA IFRS 17 pages | 3 |
| **Risk Adjustment — Confidence Level** | What risk adjustment reaches a confidence level? | A distribution of unpaid (from ODP Bootstrap or a fit), confidence level, best estimate → risk adjustment | Insurance Risk Margin | 3 |

Discounting claim payments is **Present Value** (§4.7). It's the same question as any other
cash-flow PV.

### 4.3 Ratemaking (Werner & Modlin 2016; Exam 5)

| Tool | Answers | In → out | Vault pages / reading | Phase |
|---|---|---|---|---|
| **Earned Premium** | How much of this premium is earned in a period? | Written premium (or exposure) by period, policy term, CY or PY basis → earned and unearned, with the parallelogram drawn | Earned Premium, Earned Exposure; W&M Ch. 4–5 | 1 |
| **On-Level Factors** | What brings each year's premium to current rates? | Rate changes (date, %), policy term, CY or PY basis → on-level factor by year, with the parallelogram's areas drawn | Parallelogram Method, On-Leveling; W&M Ch. 5 | 1 |
| **Extension of Exposures** | What would each policy pay at current rates? | Policies with their rating characteristics, current rate manual → on-level premium | On Level Premium; W&M Ch. 5 | 2 |
| **Trend Fit** | What annual trend do these data show? | Points by period (frequency, severity, pure premium or average premium), exponential or linear, latest *n* → annual trend and R², with the fit drawn | Exponential Trend, Linear Trend; ASOP 13 | 1 |
| **Trend Factor** | How far do these amounts trend to the future period? | Annual trend, experience period, effective date, policy term, rates-in-effect length → trend period and factor | Loss Trend, Premium Trend; W&M Ch. 5–6 | 1 |
| **Two-Step Trend Factor** | How far does premium trend when the latest year isn't current? | Average premium history, current average premium, projected trend, dates → the two-step factor | Premium Trend; W&M Ch. 5 | 2 |
| **Expense Ratios** | What are the fixed and variable expense ratios? | Expenses by type and year, premium; all-variable or premium-based fixed → fixed and variable ratios | Expense Provisions, Fixed Expenses; W&M Ch. 7 | 1 |
| **Permissible Loss Ratio** | What loss ratio do the rates allow? | Variable expense ratio, profit and contingency → permissible loss ratio | Permissible Loss Ratio; W&M Ch. 7 | 1 |
| **Loss Ratio Method** | What's the indicated rate change? | Projected loss & LAE ratio, fixed expense ratio, variable expense ratio, profit → indicated change | Loss Ratio Method, Overall Rate Level Indication; W&M Ch. 8 | 1 |
| **Pure Premium Method** | What's the indicated average rate? | Projected pure premium, fixed expense per exposure, variable expense ratio, profit → indicated average rate | Pure Premium Method; W&M Ch. 8 | 1 |
| **Credibility Weighting** | What's the blended indication? | Indication, complement, Z → credibility-weighted indication | Complement of Credibility; W&M Ch. 12 | 2 |
| **Relativities — Pure Premium** | What are the indicated class relativities, from pure premiums? | Losses and exposures by class, base class → indicated relativities | Classification Ratemaking; W&M Ch. 9 | 2 |
| **Relativities — Loss Ratio** | What are the indicated class relativities, from loss ratios? | Losses and premium at current relativities by class, current relativities → indicated relativities | Classification Ratemaking; W&M Ch. 9 | 2 |
| **Base Rate Offset** | What base rate gives the overall change, after relativity changes? | Exposure distribution, current and proposed relativities, overall change → base rate | Considerations for Implementing Rates; W&M Ch. 14 | 2 |
| **Increased Limit Factors** | What are the ILFs from these losses? | Ground-up losses by size, limits, basic limit → ILF by limit and the consistency check | Increased Limits; W&M Ch. 11 | 2 |
| **Loss Elimination Ratio** | What share of losses does a deductible remove? | Ground-up losses by size, deductible → LER | Deductible; W&M Ch. 11 | 2 |

### 4.4 Loss distributions (Exam P, MAS-I)

| Tool | Answers | In → out | Vault pages | Phase |
|---|---|---|---|---|
| **Distribution** | What's the probability, quantile or moment? | Distribution and parameters (the exam parameterisations in `lib/distributions.ts`), bounds or a level → probability or quantile, with the moments. This is the simulator itself, given a readout | Continuous / Discrete Univariate Distributions | 1 |
| **Limited Expected Value** | What's the expected loss capped at *u*? | Distribution, limit → E[X∧u], E[X] and the LER, with the layer shaded | Limited Expected Value, Layer of Insurance | 1 |
| **Expected Payment** | What does the insurer expect to pay per loss and per payment? | Distribution, deductible (ordinary or franchise), limit, coinsurance, inflation → per-loss and per-payment expected payment | Deductible | 1 |
| **Aggregate Moments** | What are the mean and variance of aggregate losses? | Frequency and severity distributions → E[S], Var[S] | Aggregate Loss Model | 2 |
| **Aggregate Distribution** | What's the distribution of aggregate losses? | Frequency, severity, discretisation span → the CDF by Panjer recursion | Aggregate Loss Model, Frequency-Severity Models | 2 |
| **Stop-Loss Premium** | What does a stop-loss cover above *d* cost? | Frequency, severity, retention → E[(S − d)₊] | Aggregate Loss Model | 2 |
| **Maximum Likelihood Fit** | Which parameters best fit these losses? | Data (individual, grouped, censored or truncated), family → parameters, log-likelihood, AIC/BIC. → Goodness of Fit, Distribution | Fisher Information, Model Selection | 2 |
| **Goodness of Fit** | Does this distribution fit these data? | Data, fitted distribution → KS, Anderson-Darling and chi-square statistics, with a P-P plot | Model Selection | 2 |
| **VaR & TVaR** | How big is the tail at level *p*? | Distribution or sample, *p* → VaR and TVaR | Risk Measure | 2 |

### 4.5 Credibility (Exam MAS-II, Exam 5, Exam 8)

| Tool | Answers | In → out | Vault pages | Phase |
|---|---|---|---|---|
| **Full Credibility Standard** | How many claims make full credibility? | *p*, *k*, what's being estimated (frequency, severity, pure premium), severity CV → the standard | Full Credibility Standard, Limited Fluctuation Credibility | 1 |
| **Partial Credibility** | How much credibility does this experience get? | Observed claims, the full standard → Z by the square-root rule. → Credibility Weighting | Limited Fluctuation Credibility | 1 |
| **Bühlmann Credibility** | What's Z from the structural parameters? | EPV, VHM, exposure → *k*, Z and the credibility premium | Bühlmann Credibility, Bühlmann-Straub Credibility | 1 |
| **Empirical Bayes** | What are Z and the premiums from these data? | Experience by risk and period, with exposures → estimated EPV and VHM, Z and premium by risk | Empirical Bayes Credibility | 2 |
| **Bayesian Update** | What's the posterior after this experience? | Conjugate pair (Poisson-gamma, binomial-beta, normal-normal, exponential-inverse gamma), prior, observations → posterior and predictive mean | Bayesian Credibility, Exact Credibility | 2 |

### 4.6 Reinsurance and individual risk rating (Exam 7, 8, 9)

| Tool | Answers | In → out | Vault pages / reading | Phase |
|---|---|---|---|---|
| **Quota Share** | What's ceded and retained? | Losses (and premium), ceded share → ceded and net | Types of Reinsurance | 2 |
| **Surplus Share** | What's ceded under a surplus treaty? | Risks with limits and losses, retained line, number of lines → ceded share and amounts | Types of Reinsurance | 2 |
| **Per-Risk Excess** | What does the layer pay on these losses? | Losses, retention, limit → layer losses and net | Excess of Loss | 2 |
| **Cat Excess with Reinstatements** | What does a cat layer pay, and what do reinstatements cost? | Event losses, retention, limit, reinstatement terms → recoveries and reinstatement premium | Excess of Loss | 2 |
| **Aggregate Stop Loss** | What does an aggregate cover recover? | Annual losses, attachment, limit (as amounts or loss ratios) → recovery | Aggregate Excess of Loss | 2 |
| **Burning Cost** | What has the layer cost historically? | Large losses trended and developed (factors as input), subject premium, layer → burn cost by year and on average | Reinsurance Pricing; Clark (2014) | 2 |
| **Exposure Rating** | What should a property layer cost from exposure? | Risk profile, MBBEFD curve (the Swiss Re Y1–Y4 parameters transcribed from Bernegger, or user *b* and *g*), layer → expected layer loss | Exposure Curves; Bernegger (1997), Clark (2014) | 2 |
| **Retrospective Premium** | What's the retro premium on these losses? | Basic premium, losses, LCF, tax multiplier, min and max → retro premium | Retrospective Rating | 3 |
| **Insurance Charge** | What's the charge for a maximum? | Aggregate loss distribution, entry ratio → charge and savings (Table M built from the distribution, never copied) | Retrospective Rating | 3 |
| **Experience Mod** | What's the experience modification? | Actual and expected losses (primary and excess), credibility parameters supplied by the user or transcribed with source → mod | Experience Rating | 3 |

### 4.7 Financial mathematics (Exam FM, Exam 9)

| Tool | Answers | In → out | Vault pages | Phase |
|---|---|---|---|---|
| **Interest Converter** | What's this rate in another form? | A rate in any form (effective, nominal *m*-thly interest or discount, force) → every other form | Interest Rate, Nominal Interest Rate Convertible m-thly, Force of Interest | 0 |
| **Present Value** | What are these cash flows worth today? | Cash flows with times, flat rate or spot curve → PV (and FV), with the flows drawn on a timeline | Discount Function | 1 |
| **Internal Rate of Return** | What rate makes these flows worth zero? | Cash flows with times → IRR, flagging more than one root | Rate of Return | 1 |
| **Annuity** | Solve the annuity equation for one unknown | Type (immediate, due, continuous, deferred, increasing), three of PV, payment, *n*, *i* → the fourth | Annuities and its variants | 1 |
| **Loan Schedule** | How is this loan repaid? | Amount, rate, term, payment frequency → amortisation schedule and the balance at any time | Loan Amortization | 1 |
| **Bond Price ↔ Yield** | What's the price at this yield, or the yield at this price? | Face, coupon, term, frequency, and price or yield → the other; yield-to-worst for a callable bond | Bond Price, Callable Bond | 1 |
| **Bond Amortization** | How does the book value move? | Bond terms, yield → book-value schedule with premium or discount amortised | Bond Amortization | 1 |
| **Duration & Convexity** | How sensitive is this value to the rate? | Cash flows, rate → Macaulay and modified duration, convexity | Duration | 1 |
| **Redington Immunization** | Is this portfolio immunized? | Asset and liability flows, rate → the three Redington conditions, each passed or failed | Immunization, Full Immunization | 1 |
| **Spot & Forward Rates** | What's the spot curve under these bonds? | Coupon bonds or par yields → spot and forward rates | Spot Rates and Forward Rates, Yield Curve | 2 |

### 4.8 Risk and capital (Exam 9, Exam 6C)

| Tool | Answers | In → out | Vault pages / reading | Phase |
|---|---|---|---|---|
| **Copula Aggregation** | What's the combined distribution of these lines? | Marginal distributions, correlation, copula (Gaussian or t), seed → combined sample and the diversification benefit. → VaR & TVaR, Capital Allocation | Brehm et al. | 3 |
| **Capital Allocation** | How much capital does each unit use? | Joint sample by unit, measure (TVaR), method (proportional, marginal, Euler) → allocation by unit | Cummins (2000) | 3 |
| **MCT Ratio** | What's the MCT ratio? | Capital available and each risk's amounts, with every factor transcribed from the OSFI guideline in force (version and date shown) → the ratio. A factor the vault hasn't transcribed is absent, not estimated | OSFI MCT | 3 |

### 4.9 Life contingencies (SOA, ALTAM/FAM and the FSA tracks)

These exams are `development` in `lib/examStatus.ts`, so the tools wait for the vault:
they're built once the concept pages exist and the tables are transcribed with their source.

| Tool | Answers | In → out | Phase |
|---|---|---|---|
| **Survival Probability** | What's the chance (*x*) survives *t* years? | Table (transcribed) or law (Gompertz, Makeham), *x*, *t*, fractional-age assumption → *ₜp_x*, *ₜq_x*, *e_x* | 3 |
| **Life Insurance Value** | What's the APV of this insurance? | Table, *x*, type (whole, term, endowment, deferred), interest → APV | 3 |
| **Life Annuity Value** | What's the APV of this annuity? | Table, *x*, type, interest → APV | 3 |
| **Net Premium** | What's the net premium? | Benefit and premium patterns, table, interest → net premium | 3 |
| **Policy Value** | What's the reserve at time *t*? | Policy terms, basis, *t* → policy value, by recursion | 3 |

### 4.10 Statistical modelling (MAS-I, MAS-II, PA)

| Tool | Answers | In → out | Phase |
|---|---|---|---|
| **GLM Relativities** | What relativities does a GLM give? | Data, rating variables, family (Poisson, gamma, Tweedie), log link, offset → relativities with standard errors. → Base Rate Offset | 3 |
| **Linear Regression** | What's the fitted line? | Response, predictors → coefficients, R², residual plot | 3 |

For anything heavier, a tool can offer **Open in workspace**. That opens the PCPA
simulator's webR / Pyodide workspace (`docs/pcpa-project.md`) with the data and an
equivalent R or Python snippet, rather than re-implementing a modelling library.

### 4.11 Deliberately not tools

- **Benchmark factors** ("industry LDFs", typical trends). By R2 they can't exist unless
  transcribed from a public source with its date. Even then they ship as a dataset the user
  chooses, never as a default.
- **Opinions, sign-offs, statements of actuarial opinion, filings.** Drafting belongs to
  the Agent plan's Phase C and to Cowork, with a human reviewer. A tool's output is an
  exhibit, not a conclusion.
- **Checklists and documentation templates** (ASOP 41 disclosures and similar). That's
  document work, so it belongs to Cowork's deliverables.

---

## 5. Anatomy of a tool

One shape for every tool, so that the card, MCP schemas, OpenAPI, docs and tests can all be
generated from it. A spec is to a tool what a `DistributionSpec` is to the simulator: write
the spec, and the card draws itself.

```ts
// quiz/src/lib/tools/types.ts (sketch)
interface ToolSpec<I, O> {
  id: string                    // 'reserving.chain_ladder' — public API (R8)
  version: string               // semver of this tool
  name: string                  // 'Chain Ladder'
  area: PracticeArea            // 'reserving' | 'ratemaking' | 'distributions' | …
  answers: string               // the one question, e.g. "What's the ultimate by development?" (R9)
  input: JsonSchema             // the one source of truth for validation, the card and agents;
                                // each field carries x-ui: slider {min,max,step} | choice | grid column
  output: JsonSchema
  notation(input: I): string    // the formula with live values, under the title (LaTeX)
  tiles(result: O): Tile[]      // the headline results, at most three (R9)
  view: 'plot' | 'grid' | null  // the one thing drawn under the tiles
  run(input: I, ctx: RunContext): ToolResult<O>   // pure, deterministic (seeded if random)
  method: {
    concepts: string[]          // vault concept paths → Method tab, exam logos, fact check
    readings: { resource: string; locator: string }[]   // Resources/Books page + chapters
    standards?: string[]        // e.g. the ASOP 43 resource page
  }
  examples: ToolExample[]       // published worked examples, cited (R2) — also fixtures
  checkedAgainst: Fixture[]     // what CI reproduces (R6)
  limits: { maxCells?: number; maxIterations?: number }
  consumes: DataKind[]          // what it can take from another tool's output (chaining)
  produces: DataKind            // exactly one kind (R9)
}

interface ToolResult<O> {
  tool: string; version: string; engine: string; inputHash: string; seed?: number
  results: O                    // typed values
  tables: Table[]               // what the UI renders and the xlsx export writes
  summary: string               // a few lines of markdown, for agents and the page header
  judgments: Judgment[]         // { field, value, default: boolean, note, standard? } (R3)
  warnings: Warning[]           // e.g. 'factor for 12–24 rests on 2 points'
  trace: TraceStep[]            // { label, latex, values, result } (R4)
  method: MethodRef             // concept URLs, readings, fact-check verdict (R5)
}
```

**Typed data kinds** let tools chain together, and let an agent pass one tool's output
straight into the next: `Triangle` (origins, ages, values, cumulative|incremental, measure,
units), `OriginVector` (ultimates, CDFs, ELRs by origin), `FactorVector`, `LossListing`,
`ClaimTransactions`, `RateHistory`, `CashFlows`, `Distribution` (family + parameters,
the `lib/distributions.ts` keys), `Sample` (simulated values).

**Lenient in, strict out.** Agents and humans hand data over in whatever form they have it.
`coerce` accepts a triangle as a matrix with labels, as long-format rows, or as CSV text. It
accepts percentages as `5%`, `0.05` or `5` with an explicit unit, and dates as ISO or
`2019-Q3`. It normalises everything before validation and records each coercion as a
warning. The output is always the one canonical shape.

**Errors are instructions.** A validation failure names the field, says what was expected
and gives a corrected example. The MCP connector already does this
(`isError: true` with a message the model can act on).

---

## 6. The human surface

### 6.1 Where it lives

**Decided: Tools is a page in the sidebar** (`/tools`, between Projects and the Shop), inside
Study mode and open to every reader, gated by `TOOLS_ENABLED`. The rest of this section is the
option weighed against it, kept for the record.

The option was a third app mode, beside Study and Cowork, in `lib/appMode.ts`:

```ts
{ id: 'tools', label: 'Tools', tagline: 'Actuarial calculators, for you and your AI',
  home: '/tools', routes: ['/tools'], access: 'open', preview: true }
```

A mode is "a place, not a filter", with its own navigation and readers. Tools has its own
nav (the practice areas) and serves both of the other modes' readers. It's open (`access:
'open'`) because a calculator on public methods has nothing to sell and a great deal to
offer: search traffic ("parallelogram method calculator") and the AI connector. While
`preview: true` it's limited to `PREVIEW_APPROVED_EMAILS`. Leaving Preview makes the mode
pill appear for every reader (`showsModeSwitcher` counts visible modes), which is a product
decision in its own right (§14).

The alternative is a `/tools` sidebar row inside Study mode. It's cheaper, but it files
practitioner tools under "Study". See §14.

### 6.2 Routes and pages

| Route | Page |
|---|---|
| `/tools` | **Catalogue.** Practice areas as `ListPanel` groups (`components/ui/ListPanel.tsx`), searched through `FloatingSearchBar` parts. Each row has the tool's name, the question it answers, and the logos of the exams that examine it. The search matches the question too, so "what loss ratio do my rates allow" finds Permissible Loss Ratio. |
| `/tools/:toolId` | **The tool card**, alone on the page under a back arrow. |
| `/tools/runs` | **My runs.** Saved runs, localStorage first and synced to the account when signed in (§8.5). |
| `/tools/analyses/:id` | **Analysis** (Phase 4). A saved chain of runs (§6.5). |

The sidebar lists the practice areas while the mode is open, the way Study Guides lists
Exams / Resources.

### 6.3 The tool card

Every tool is one card, `components/tools/ToolCard.tsx`, and it renders any spec. Its rules
are the distribution simulator's (`docs/distribution-simulators.md`, *Layout & touch*),
because that's the design this section is copying:

```
┌──────────────────────────────────────┐
│ Bornhuetter-Ferguson          ⟲   ⋯  │  title opens the method · reset · one menu
│ U = L + E(1 − 1/CDF)                 │  the notation, with live values
│ ┌───────────┐ ┌───────────┐          │
│ │ U 5,504.8 │ │ IBNR 954.8│          │  at most three tiles
│ └───────────┘ └───────────┘          │
│  AY      L    CDF      E      U      │  one view: here the grid, which is
│  2021  1,650  1.000  1,700  1,650.0  │  also the input (L, CDF and E are
│  2022  1,700  1.100  1,850  1,868.2  │  editable; U is computed and shaded)
│  2023  1,200  1.676  1,950  1,986.7  │
│ ▸ Show working                       │
└──────────────────────────────────────┘
```

- **It reads top-down**: title, reset and menu → notation → up to three tiles → one view
  (a plot or a grid) → the inputs that aren't in the view (sliders and choices) → at most
  one action. The only tools with an action are the random ones (ODP Bootstrap, Copula
  Aggregation), which get the simulator's one **Simulate** button and nothing more.
- **It's live.** Every change recomputes the result. There's no Run button and no form to
  submit. A slider moves the tiles while it's being dragged.
- **The answer comes first.** The tiles sit above what they summarise, each led by its
  symbol (*U*, IBNR, *Z*, *PV*), as the simulator's μ, σ and γ₁ do.
- **For a table tool the grid is both the input and the output.** The editable columns are
  the inputs and the computed columns are the result, shaded. There's no input form beside
  a result table. Pasting from Excel fills the grid. A triangle grid has the cumulative ↔
  incremental switch.
- **Scalar inputs are sliders**, the shared `.sim-slider` (a 32px knob, a 44px row). Each one's
  value can be tapped to type an exact number, since an actuary often has the exact figure.
  A method option with the same inputs (R9) is a segmented choice, never a dropdown of forms.
- **A default says so in place.** An input left at its default carries a small dot, with
  "default" in its accessible name. That's R3 on screen. There's no separate judgments
  list in the card; the full list is in the export and the agent envelope.
- **No explanatory text.** Units go in the labels, and the notation is the explanation. A
  warning is one line under the tiles, shown only when there is one
  (`docs/visual-noise-review.md`).
- **The working is one fold.** "Show working" opens the trace as KaTeX steps, so math focus
  works on it unchanged.
- **The title is the way to the method.** It opens the concept page in the concept popup,
  the same way an exam's title opens its menu. The page shows the readings and the fact
  check.
- **Everything else is in the ⋯ menu**: what it was tested against (R6), Export `.xlsx` /
  `.csv` (through `lib/xlsx.ts`), Copy JSON, Copy for AI (the exact `run_tool` call),
  Share (the input deflated into the URL fragment, which never reaches a server), Save,
  and **Send to…** (the tools that consume this output).
- **It fits a phone.** A scalar tool fits an iPhone screen without scrolling. A table tool
  scrolls its grid and nothing else. Every button is `h-10`, as in the simulator. Charts
  follow the style guide: `--primary` for the result only, everything else `currentColor` at
  low opacity.
- **Heavy work stays smooth.** Bootstrap, simulation and MLE run in a Web Worker, and the card
  keeps its last result on screen until the new one is ready.

### 6.4 One card, everywhere

The card is the same component wherever it appears, as the simulator is:
- **On the tool's route**, alone.
- **On a concept page**, inline. A `%%tool reserving.bornhuetter_ferguson%%` line, an
  Obsidian comment that shows nothing in the vault, is swapped for the card by
  `WikiArticle`, the way `%%credential-path%%` is. It opens empty or with the tool's cited
  example (R2), never with invented numbers.
- **Full screen**, in the image gallery, the way a distribution card opens there.
- **From a question explanation**, after the answer is revealed and never while the
  question is live (the same rule as `showMeta`): a **Work it in a tool** link opens the card
  with the question's data loaded, where a fixture maps that question (§9.2).
- **From the concept action menu** (`components/ConceptActionMenu.tsx`): an **Open in Tools**
  row for any concept a tool implements.
- **From search**: tools join the Dashboard and Search page indexes (`lib/appSearch.ts`) as a
  **Tools** pill.
- **From a search engine**: one static page per tool (`dist/tools/<id>/index.html`) with its
  question, notation and readings, generated alongside the wiki's (`docs/seo.md`).

The distribution simulator becomes the **Distribution** tool's card: the same sliders, plot
and tiles, plus a probability and quantile readout. The concept pages keep showing it
exactly as they do now.

### 6.5 Bigger jobs are chains, not bigger tools

A reserve review or a rate indication is many questions, so it's many tools. Three things
make that easy instead of tedious:
- **Send to…** carries a result into the next tool, already filled in. Age-to-Age Factors
  sends its averages to Development to Ultimate as the starting selections (each marked
  as a default until the user changes it), which sends CDFs to Chain Ladder, BF and Cape Cod.
- **Any grid column accepts a pasted column**, so data can come from Excel as easily as
  from another tool.
- **Analyses** (Phase 4) save a chain: the runs and the wiring between them, re-run when an
  input upstream changes. Comparing methods side by side (the old "summary of indications")
  is a view of an Analysis, not a tool, because comparing is choosing, and choosing is the
  actuary's job (R3).

---

## 7. The agent surface

### 7.1 MCP: three tools on the existing connector

The calculators join the existing endpoint (`quiz/api/mcp.js`) rather than a new server, so
a reader who has added Actuarial Notes already has them. To keep eighty schemas out of every
model's context, the connector exposes the catalogue **progressively**:

| MCP tool | Input | Returns |
|---|---|---|
| `list_tools` | optional `area`, `query`, `exam` | id, name, one line, area, exams, tested-against, version |
| `describe_tool` | `tool` | the full input/output JSON Schema, a cited example input, method concepts and readings with URLs, the judgments the tool will ask for |
| `run_tool` | `tool`, `input`, optional `trace` (default on), `format` (`json`/`markdown`) | the `ToolResult` envelope, as `structuredContent` with an `outputSchema` where the client's era supports it, and as text for older clients, plus an `app_url` that opens the same run in the app |

Discrete tools suit agents. Each schema is small and asks for what one question needs, so
a model fills it correctly more often, and a run's envelope is short enough to quote. The
question in `answers` is what `list_tools` searches, so a model finds a tool by asking what
it wants to know.

All three are `readOnlyHint: true`, `idempotentHint: true` and `openWorldHint: false`. Nothing
is written anywhere, and the same input always gives the same output. The connector's
contract in `docs/ai-connector.md` ("read-only, public, nothing invented, the fact check
travels with the fact") holds unchanged. A result is derived from the caller's own input,
and its method page's verdict travels with it.

**Prompts** (the skills in MCP form) teach the workflows that chain tools and stop for human
judgment:
- `reserve_analysis`: Ratio Triangle for diagnostics → Age-to-Age Factors → **ask the human
  to select** → Development to Ultimate → Chain Ladder, BF and Cape Cod as separate calls →
  lay the ultimates side by side → ask the human to select an ultimate → draft commentary
  citing the method pages.
- `rate_indication`: On-Level Factors → Trend Fit (the human picks the trend) → Trend Factor
  → Loss Ratio Method.
- `check_my_work`: the candidate gives their hand result, the agent runs the tool, and the
  two are compared step by step against the trace.

The **Agent Skill** (`quiz/skills/actuarial-notes/SKILL.md`) gains a "Calculations" section
with four rules: never compute an actuarial method in prose when a tool exists; surface
`judgments` to the user instead of choosing silently; quote `warnings`; and give the user
the `app_url`.

### 7.2 HTTP and OpenAPI, for agents that don't speak MCP

- `GET /api/tools`: the catalogue. `POST /api/tools/{id}`: the same envelope as `run_tool`.
- The build emits `/ai/tools-openapi.json` beside `knowledge-base.json` (the
  `ai-connector-assets` plugin), for GPT Actions, function calling, LangChain and plain
  scripts. `llms.txt` points at it.
- No sign-in and no stored state (R7), rate-limited per IP on the `api/chat.js` pattern, with
  input-size caps from each tool's `limits`. API keys are a later, deliberate step (§14).

### 7.3 An agent chain, end to end

Three discrete calls. Each takes the previous one's output:

```jsonc
// 1. run_tool reserving.age_to_age_factors
{ "triangle": { "origins": ["2021","2022","2023"], "ages": [12,24,36],
                "values": [[1000,1500,1650],[1100,1700,null],[1200,null,null]],
                "kind": "cumulative", "measure": "reported" },
  "average": "volume_weighted_all" }
// → factors 12–24: 1.5238, 24–36: 1.1000; warning: "The 24–36 factor rests on one origin."

// 2. run_tool reserving.development_to_ultimate   (after the user accepts those as selections)
{ "factors": { "12-24": 1.5238, "24-36": 1.1 } }
// → CDFs 12: 1.6762, 24: 1.1000, 36: 1.0000; judgment: tail = 1.0 (default)

// 3. run_tool reserving.bornhuetter_ferguson
{ "origins": ["2021","2022","2023"], "latest": [1650,1700,1200],
  "cdf": [1.0, 1.1, 1.6762], "expected_claims": [1700,1850,1950] }
```

The third call's envelope:

```jsonc
{ "tool": "reserving.bornhuetter_ferguson", "version": "1.0.0", "inputHash": "sha256:…",
  "summary": "BF ultimate 5,504.8; IBNR 954.8.",
  "results": { "ultimate": [1650.0, 1868.2, 1986.7], "ibnr": [0.0, 168.2, 786.7] },
  "judgments": [],
  "warnings": [],
  "trace": [ { "label": "% unreported, 2023", "latex": "1 - 1/1.6762", "result": 0.4034 } ],
  "method": { "concepts": ["https://…/wiki/concept/bornhuetter-ferguson-method"],
              "readings": [{ "title": "Estimating Unpaid Claims Using Basic Techniques",
                             "locator": "Ch. 9" }],
              "fact_check": "Not fact checked" },
  "app_url": "https://quiz.actuarialnotes.com/tools/reserving.bornhuetter_ferguson#run=…" }
```

The judgments sit where they were made: the averaging in call 1 and the tail in call 2. BF
itself takes none, so its list is empty. (The triangle is a toy, there only to show the
shape. The examples a tool ships and the docs print come from cited sources, by R2.)

---

## 8. Architecture

### 8.1 Code layout

```
quiz/src/lib/tools/
  types.ts              ToolSpec, ToolResult, DataKind, Judgment, TraceStep
  schema.ts             a small JSON-Schema subset: validate + defaults (no new dependency)
  coerce.ts             lenient-in normalisation (§5)
  registry.ts           every ToolSpec; lookups by id, area, concept, data kind
  envelope.ts           inputHash (canonical JSON → sha256), engine version, method refs
  trace.ts              trace builder helpers
  triangle.ts           Triangle kind: shape, cum/incr, diagonals, ratios (shared by all P&C tools)
  numeric.ts            root finding, least squares, IRLS, optimisers (MLE), quadrature
  reserving/*.ts        one file per tool
  ratemaking/*.ts
  distributions/*.ts    wraps lib/distributionMath.ts + lib/distributions.ts (moved under, re-exported)
  credibility/*.ts  finance/*.ts  reinsurance/*.ts  capital/*.ts  life/*.ts  stats/*.ts
  fixtures/<tool>/*.json   cited published examples (§9)
  *.test.ts
quiz/src/pages/Tools/      Catalogue, ToolRoute, Runs, Analysis (lazy chunk)
quiz/src/components/tools/ ToolCard (renders any spec), ToolGrid, ToolTiles, ToolMenu,
                           WorkingFold, plots (shared with components/wiki/DistributionPlot)
quiz/src/hooks/useToolRuns.ts, useToolWorker.ts
quiz/api/tools.js          GET catalogue / POST run (HTTP)
quiz/api/_tools/engine.js  the engine, bundled for the functions (§8.2)
quiz/api/_mcp/server.js    + list_tools / describe_tool / run_tool, + prompts
```

Every module under `lib/tools/` uses **relative imports only**, never `@/`. That's the same
rule `lib/resourceExams.ts` and `lib/seo.ts` follow, for the same reason: the module is
pulled into a non-app graph.

### 8.2 One engine in the browser and in the function

The MCP function is plain JS and can't import TypeScript (`docs/ai-connector.md`, *Not
yet*). Bundling fixes this instead of mirroring the code: a build step uses the esbuild that
Vite already ships to bundle `lib/tools/index.ts` into one dependency-free ESM file,
`quiz/api/_tools/engine.js`, which `mcp.js` and `tools.js` import.

**Phase 0 spike:** confirm that Vercel packages a function file generated during `npm run
build`. If it doesn't, **commit** the bundle and add a test that rebuilds it and fails when
the committed copy differs. That's the same freshness contract the repo's other mirrors
have (`mcpServer.test.ts`). Either way, there is one implementation (R1).

### 8.3 Performance and limits

- Pure TypeScript with doubles throughout. Rounding happens only at display and in the
  export's number formats, never in the middle of a calculation. (Exam answers often round
  intermediate steps. Fixtures compare at the source's stated precision, §9.)
- Each tool declares `limits` (cells, iterations, sample size). The server enforces them
  with a clear error. The browser warns but allows more, since it's the user's own CPU.
- Bootstrap, simulation and MLE run in a Web Worker in the app. Server-side they're capped
  to stay within the function's time budget (for example, 10,000 bootstrap iterations on a
  20×20 triangle).

### 8.4 Flag, mode and chunk

- `TOOLS_ENABLED` in `featureFlags.ts` (annotated `: boolean`), off until Phase 0 exits.
- The `tools` mode in `appMode.ts` (§6.1), its sidebar nav, and its route guard in `App.tsx`.
- `/tools` is a `lib/lazyRoute.ts` route, a lazy chunk the way Cowork's is. The catalogue
  page imports only the registry's metadata (`registry.meta.ts`), not every engine, and each
  tool card loads its own engine module.
- A `deskPlace` entry in `lib/viewTransition.ts` for the new tab and its depths.

### 8.5 Persistence

- **Runs**: `{ id, tool, version, input, savedAt, label }`. The result is *recomputed* on
  open, not stored, so a fixed tool fixes old runs too. If the version changed, the page says
  "computed with v1.2, now v1.3" and offers the old figures from a stored summary.
  localStorage first; a signed-in user syncs to a `user_tool_runs` table (RLS: own rows only;
  last writer wins per row, with tombstones, like `lib/project/projectSync.ts`). Saving is
  opt-in, and it's the only time user data leaves the browser (R7).
- **Analyses** (Phase 4): a DAG of run ids with the wiring between outputs and inputs.

### 8.6 Analytics

`tool_view` and `tool_run` (`{ tool_id, surface: 'ui', ok, ms }`), `tool_export`, and
`tool_share`, typed in `AnalyticsEventMap`. They never include an input value
(`docs/analytics-and-monitoring.md`). The server endpoints count runs per tool and surface
(`mcp`/`http`) in logs, without payloads.

---

## 9. Verification and testing

A calculator that's confidently wrong is worse than none. That's the agent plan's
"existential risk" and the reason for R6.

### 9.1 Published fixtures (the R6 gate)

Each fixture under `fixtures/<tool>/` holds:
- the source (a `Resources/Books` page) and a locator (chapter, exhibit, page);
- the inputs, transcribed;
- the expected outputs, transcribed;
- the precision the source prints.

CI runs every fixture. A tool's **Tested against** line is generated from passing fixtures
and can't be hand-written. The transcriptions are content, so they follow the vault's VERIFY
discipline: a fixture records who checked it against the source, and a reviewer can open
the cited exhibit.

Priority sources: Friedland's worked chapters (Ch. 7–17), Werner & Modlin's examples and
appendices, Mack (1994), Clark (2003), Shapland (2016, deterministic parts and a seeded
distribution summary), Bernegger (1997), and the SOA FM / P sample solutions.

### 9.2 The question bank as a test suite

The bank holds hundreds of numeric questions with official answers. A **question fixture**
maps one question to a tool input: `{ question: 'cas5-2016s-q14', tool, input,
answerPath }`. The test reads the **official answer from the bank at test time** (never
retyped, as in `docs/pdf-question-pipeline.md`) and requires the tool to reproduce it to the
question's precision. Questions with an open critical finding are skipped, as
`filterQuestions` skips them. Two benefits:
- each mapped question gains the **Work it in a tool** link (§6.4);
- the set is the **agent eval** below.

### 9.3 Property and parity tests

- **Method identities**: BF with every origin fully developed equals chain ladder; Benktander
  converges to chain ladder; Cape Cod with a known ELR equals BF; on-level factors are 1 for
  a flat rate history; annuity identities (ä = (1+i)a, the perpetuity limit); Panjer
  reproduces the compound Poisson moments; Bühlmann Z ∈ [0,1).
- **Parity (R1)**: every fixture through `run()`, through the bundled engine via `run_tool`,
  and through `POST /api/tools/{id}` returns byte-identical envelopes.
- **Schema**: every tool's examples validate against its own input schema; every output
  validates against its output schema; every concept path in `method.concepts` resolves to a
  vault file (as `coworkContent.test.ts` holds `wikiRef`s).
- **Discreteness (R9)**: every spec has one `answers` sentence, one `produces` kind, at most
  three tiles and at most six scalar inputs, and every `consumes` kind is some tool's
  `produces`, so no Send to… leads nowhere.
- **E2E**: `e2e/tools.spec.ts` covers pasting a triangle, the result changing as an input
  changes, Show working, export, Send to…, and opening a share link. At iPhone size, every
  scalar tool's card fits the viewport without scrolling (R10).

### 9.4 Agent eval

A harness under `simulations/tools-eval/` gives a model the bank's mapped numeric questions
in two arms: connector without calculators, and connector with them. It measures accuracy,
calls per question and invalid-input rate. That's the agent plan's §7 factuality metric,
measured on calculation. The invalid-input rate is the main feedback for improving schemas,
`coerce` and error messages.

---

## 10. Integration with the rest of the product

| Surface | Integration |
|---|---|
| **Study mode** | Open in Tools from concept pages; Work it in a tool from revealed explanations; exam logos on each tool lead back to the exam. Tools never affect mastery. |
| **Cowork** | A deliverable's **Populate** step attaches tool runs. An exhibit's value cells are filled from a run on the reader's data, and each cell names the run (tool, version, input hash) as its source. That keeps "nothing invented" true when the cells are no longer blank. Phase 4. |
| **AI connector** | `list_tools` / `describe_tool` / `run_tool`, the prompts, and the skill section (§7). Bump the connector's version documentation in the same change. The knowledge-base export is untouched, so `KNOWLEDGE_BASE_VERSION` stays as it is. |
| **Agent product plan** | Delivers B3. Its eval harness gains the calculation arm (§9.4). Phase C copilots (reserve review, method rationale) are built on these tools. |
| **Distribution simulators** | One engine. The simulator becomes a view of the Distribution Calculator. |
| **PCPA workspace** | "Open in workspace" for modelling beyond the tools (§4.10). |

---

## 11. Phased build plan

Phases are gated by exit criteria, not dates. No phase widens the catalogue until the
previous phase's tools pass R6.

### Phase 0 — Foundations: two tools end to end
- `lib/tools/` core: types, schema subset, coerce, envelope (hash, versions), trace,
  registry, the `Triangle` kind.
- The engine-bundling spike (§8.2) and the chosen mechanism with its test.
- `TOOLS_ENABLED`, the `tools` mode in Preview, the `/tools` catalogue, and `ToolCard`
  rendering a spec: notation, tiles, the grid with Excel paste, sliders, Show working, the ⋯
  menu with `.xlsx` export.
- MCP `list_tools` / `describe_tool` / `run_tool`; `POST /api/tools/{id}`.
- **Two tools**: *Interest Converter* (a scalar card) and *Age-to-Age Factors* (a grid card),
  each with a published fixture.
- **Exit:** both tools return byte-identical envelopes through the UI engine, MCP and HTTP
  (parity test green). An agent in Claude can list, describe and run them, and its `app_url`
  opens the same run in the app.

### Phase 1 — The core practice set (~30 tools)
- Data: Ratio Triangle.
- Reserving: Tail Factor, Development to Ultimate, Chain Ladder, Expected Claims, BF,
  Benktander, Cape Cod.
- Ratemaking: Earned Premium, On-Level Factors, Trend Fit, Trend Factor, Expense Ratios,
  Permissible Loss Ratio, Loss Ratio Method, Pure Premium Method.
- Distributions: Distribution (the simulator re-pointed at it), Limited Expected Value,
  Expected Payment.
- Credibility: Full Credibility Standard, Partial Credibility, Bühlmann Credibility.
- Finance: Present Value, Internal Rate of Return, Annuity, Loan Schedule, Bond Price ↔ Yield,
  Bond Amortization, Duration & Convexity, Redington Immunization.
- Send to…, saved runs (local), share links, the `%%tool%%` marker on concept pages, the
  concept-menu row. Prompts `reserve_analysis`, `rate_indication`, `check_my_work`. Skill
  section. OpenAPI.
- **Exit:** every Phase 1 tool has at least one published fixture passing (R6). At least 50
  bank questions are mapped and reproduced. The tools-eval harness has a baseline for both
  arms. Then the mode can leave Preview (a §14 decision).

### Phase 2 — Depth for practitioners
- Triangle from Claim Listing; Frequency-Severity, Case Outstanding Development, Case
  Adequacy and Settlement Rate Adjustments, ULAE (Classical, Kittel); Mack Standard Error,
  ODP Bootstrap (Worker), Clark Growth Curve.
- Extension of Exposures, Two-Step Trend Factor, Credibility Weighting, both Relativities
  tools, Base Rate Offset, Increased Limit Factors, Loss Elimination Ratio.
- Aggregate Moments, Aggregate Distribution, Stop-Loss Premium, Maximum Likelihood Fit,
  Goodness of Fit, VaR & TVaR; Empirical Bayes, Bayesian Update.
- Quota Share, Surplus Share, Per-Risk Excess, Cat Excess with Reinstatements, Aggregate Stop
  Loss, Burning Cost, Exposure Rating (MBBEFD transcribed); Spot & Forward Rates.
- Saved runs synced to the account (`user_tool_runs` migration).
- **Exit:** a complete reserving analysis can be done from a pasted transaction listing by
  chaining tools, in the app and through an agent. The tools-eval arm shows a
  measured accuracy gain on Exam 5 / 7 numeric questions.

### Phase 3 — Breadth
- Expected Emergence; Risk Adjustment (Cost of Capital, Confidence Level).
- Retrospective Premium, Insurance Charge, Experience Mod; Copula Aggregation, Capital
  Allocation, MCT Ratio (factors transcribed).
- GLM Relativities, Linear Regression, with Open in workspace for anything beyond them.
- Life contingencies, once the SOA life exams leave `development` and the tables are
  transcribed.

### Phase 4 — Workflows and distribution
- **Analyses**: chained, saved, re-runnable chains of tools (§6.5), with the side-by-side
  comparison view, and an `analysis` envelope agents can run as one call.
- Cowork population (§10).
- `.xlsx` with **live formulas** where a method is spreadsheet-native (chain ladder, BF,
  indication), so the workpaper recalculates in Excel. That's an extension of `lib/xlsx.ts`
  to write `<f>` cells.
- Distribution of the engine outside the app: an npm package of `lib/tools/` and a thin
  Python client over the HTTP API (§14). Connector-directory listings.

---

## 12. Success metrics

| Metric | Why |
|---|---|
| **Fixture coverage**: % of tools with a passing published fixture (target 100% before a tool leaves Preview) | R6, the trust gate |
| **Bank questions reproduced** by a tool | Breadth of verified correctness, and the size of the eval set |
| **Agent accuracy uplift** (tools-eval, with vs. without) | The core claim: agents are better with these tools |
| **Invalid-input rate on agent calls** | How usable the schemas, coercion and errors are for models |
| **Time to first result**: seconds from opening a card to its first computed answer | Whether the cards are as easy as R10 intends |
| **Send to… use** | Whether discrete tools chain as easily as one big tool would have been |
| **Runs per surface** (UI / MCP / HTTP) and **exports per run** | Adoption by humans vs. agents; whether outputs reach real workpapers |
| **Judgments surfaced vs. defaults left in place** | Whether R3 works: are people and agents making selections? |
| **Study → Tools and Tools → Study clicks** | Whether the section strengthens the learning product |

---

## 13. Risks and mitigations

- **A wrong number.** Mitigated by R6 fixtures, property tests, the parity test, the trace on
  every result, and "Tested against" shown only when CI proves it.
- **Method variants.** Sources differ: medial averages, tail conventions, the Cape Cod used-up
  premium, the exam's rounding vs. a practitioner's. Every variant is an explicit option
  named after its source, never a silent choice, and the trace states which one ran.
- **Agents presenting computation as opinion.** Mitigated by `judgments` with
  `default: true`, the skill's rules, and the prompts that stop for human selection. Every
  envelope says it's a calculation for review.
- **Confidential data.** Browser compute, stateless endpoints, no payload logging, and
  opt-in saving (R7). This is stated plainly on the page and in the connector's docs.
- **Licensing of parameter tables** (mortality tables, NCCI and Swiss Re curves, OSFI
  factors). Transcribe only tables published for free use, with source and date. Anything
  else is a user-supplied input.
- **Catalogue sprawl** (eighty small tools, half-built). Phase gates, R6 before Preview
  exits, and the shared kinds, `numeric.ts` and the one `ToolCard`, so each new tool is a
  spec and a method, not a page.
- **Too many small tools to find, or to chain by hand.** The catalogue and `list_tools`
  search the question each tool answers. Send to… pre-fills the next tool. Analyses save a
  chain. The metrics for Send to… use and time to first result say whether it's working.
- **The card growing.** Every request to add a field or a panel to a card is pressure against
  R10. The rule from the simulator applies: a change that adds a row takes one away, and the
  e2e phone-size test fails otherwise.
- **Tool bloat in model context.** Progressive disclosure (`list` → `describe` → `run`)
  instead of eighty MCP tools.
- **Function packaging** (§8.2). Resolved in the Phase 0 spike, with the committed-bundle
  fallback.
- **Maintenance across three surfaces.** There's only one implementation. The surfaces are
  generated from the spec, and the parity test fails the build if they drift.

---

## 14. Open decisions (the product owner's call)

1. ~~**Mode or section?**~~ Decided: a page in the sidebar, in Study mode (§6.1).
2. **Access and pricing.** Recommended: every calculator free and signed-out (it's public
   method maths, it's the SEO and connector story, and an agent needs no account), with
   **Pro** for synced runs, Analyses, Cowork population and, later, higher API limits.
3. **MCP shape.** Progressive `list/describe/run` (recommended) or a handful of the most-used
   tools promoted to first-class MCP tools. The second suits clients that don't follow a
   describe step well. The eval (§9.4) can decide it with data.
4. **API keys.** Keep the HTTP API keyless and rate-limited, or issue keys (needed for
   batch use and for anything that ever stores state)?
5. **Life contingencies timing.** Build alongside the SOA life exams' content, or ahead of
   it for practitioners?
6. **Open-sourcing the engine.** Publish `lib/tools/` as a package? It strengthens the
   "checkable, not black-box" story and invites review. It also makes the engine a public
   artifact to maintain.

---

## 15. Immediate next steps

1. **Finish Phase 1's tools (§11).** One tool is left, **Tail Factor**, waiting on a source
   that prints a fitted tail to check it against (R6): Friedland's Chapter 7 discusses the
   curves but its exhibits select the tail by judgment. Two parts of built tools are left too:
   the callable bond's yield-to-worst (SOA FM sample questions 41, 136 and 292 would check it),
   and Annuity solving for whichever of PV, payment, *n* or *i* is unknown.
2. The Phase 1 workflow pieces: the MCP prompts `reserve_analysis` / `rate_indication` /
   `check_my_work`, the `%%tool%%` marker on concept pages and the concept-menu row, saved runs,
   and the OpenAPI export (§7.2).
3. Map more bank questions to tools (§9.2) — now 46 — toward the 50 Phase 1's exit asks for,
   and give the question explanations a **Work it in a tool** link. Exam 5's own past papers are
   the richest seam left.
4. The agent eval (§9.4): with 32 checked tools and their questions, the eval set exists.

## 16. What's built (2026-10-10)

**Thirty-two tools**, each in its own file under `quiz/src/lib/tools/<area>/`, every one
reproducing a published worked example or exam question in CI (§17):

| Area | Tools |
|---|---|
| Reserving | Ratio Triangle, Age-to-Age Factors, Development to Ultimate, Chain Ladder, Expected Claims, Bornhuetter-Ferguson, Benktander, Cape Cod |
| Ratemaking | Earned Premium, On-Level Factors, Trend Fit, Trend Factor, Expense Ratios, Permissible Loss Ratio, Loss Ratio Method, Pure Premium Method |
| Loss distributions | Distribution, Limited Expected Value, Expected Payment |
| Credibility | Full Credibility Standard, Partial Credibility, Bühlmann Credibility |
| Financial mathematics | Interest Converter, Annuity, Present Value, Internal Rate of Return, Loan Schedule, Bond Price, Bond Yield, Bond Amortization, Duration & Convexity, Redington Immunization |

Where the build departs from the §4 catalogue, it is to keep a tool to one job (R9) or to what a
source can check:
- **Bond Price ↔ Yield** is two tools, Bond Price and Bond Yield: one card with both a yield and
  a price input would carry eight scalar inputs. Callable bonds wait (§15).
- **Earned Premium** takes policies with their effective dates, as Werner & Modlin's Chapter 4
  examples do, and aggregates by calendar or policy year as of a year end.
- **Trend Factor** is the one-step trend from an accident or policy year's average accident date
  to the future one; the two-step trend is Phase 2's.
- **Limited Expected Value** and **Expected Payment** run seven loss models in closed form
  (`distributions/lossModels.ts`: exponential, uniform, Pareto, single-parameter Pareto, gamma,
  lognormal, Weibull), each tested against ∫ S(x) dx. Coinsurance multiplies both expected
  payments, so it is said in the field's description rather than added as a seventh input.
- **Distribution** is the simulators' catalogue (`lib/distributions.ts`), its parameters drawn
  only for the family chosen (`showWhen`); R9's six-input rule counts what a card draws at once.

**The engine** (`quiz/src/lib/tools/`): `types.ts` (the spec and the result envelope),
`input.ts` (lenient in, strict out: `"5%"`, `"$1,200"`, a bare matrix for a triangle, rows as
objects or arrays; errors that name the field and the fix), `hash.ts` (a synchronous SHA-256 of
the canonical input), `run.ts` (the envelope: judgments marked `default` when the caller left
them out), `schema.ts` (the JSON Schema an agent reads), `share.ts` (`#input=` run links),
`registry.ts`. Relative imports only. Tested in `tools.test.ts`, including the registry's R9
rules (one question, at most six scalar inputs, at most three tiles, every handoff accepted by
its target).

**One engine for the connector (§8.2).** The spike's answer was the fallback: the bundle is
committed. `npm run tools:bundle` writes `quiz/api/_tools/engine.js` with esbuild (pinned as a
dev dependency), and `lib/tools/bundle.test.ts` rebuilds it and fails when the committed copy
differs, then runs every tool through both engines and requires byte-identical results (R1).

**The connector** (`quiz/api/_mcp/server.js`): `list_tools`, `describe_tool`, `run_tool`, the
server instructions' line on using them, and the skill's "Calculations" section. The three are
`standalone`: they answer even when the knowledge base can't be loaded, with the method's
pages unlinked. `run_tool` returns the envelope with `input_hash`, the method's concept pages
(URL and fact check) and an `app_url` that opens the same run.

**The app**: the sidebar row, `/tools` (catalogue: practice areas as `ListPanel`s, each row the
tool's question) and `/tools/:slug` (the card alone), `pages/Tools.tsx`, lazy. The card is
`components/tools/ToolCard.tsx` with `ToolGrid.tsx` (the editable table whose computed columns
sit beside the inputs; the triangle with its cumulative ↔ incremental switch; Excel paste
into both) and `ToolMenu.tsx` (copy link, copy for AI, copy JSON, `.xlsx` via
`lib/toolExport.ts`, Send to…). Pure helpers are `lib/toolDraft.ts`. The title opens the
method's concept pages in the concept popup, loading the wiki bundle on that first tap.
`e2e/tools.spec.ts` covers the sidebar, a live recompute, an error kept to one line, Send to…,
a run link and the phone fit.

**Not built yet**, from §3–§11: the six Phase 1 tools and pieces in §15; the agent eval (§9.4);
`POST /api/tools/{id}` and the OpenAPI export (§7.2); saved runs and Analyses (§6.5, §8.5);
analytics events (§8.6); the notation and working as KaTeX rather than plain text.

**The card's new shapes.** A tool may take several grids: Ratio Triangle's two triangles, each
named, or On-Level Factors' rate changes beside the factors they produce. A `date` field (an
effective date) is the browser's date picker over an ISO date; `lib/tools/dates.ts` reads the
texts' `01/01/17` too, and measures time in months as Werner & Modlin do. A number field may
set `sliderMin` where its valid range starts far below where values live (a year, a mean).

## 17. Tested against (R6)

All thirty-two tools reproduce published work in CI: 495 printed values across 33 exhibits of the
two Exam 5 texts, and 46 published exam questions. One pair of lists — `CHECKS` in
`quiz/src/lib/tools/checks.ts` and `QUESTION_CHECKS` in `questionChecks.ts` — is both what
`checks.test.ts` runs and what the card's ⋯ menu, the catalogue's tick and the connector's
`tested_against` say, so a tool can only claim a check that passes.

**Published documents (§9.1).** `scripts/tool_fixtures.py` reads the exhibits off the CAS's free
copies of Friedland and Werner & Modlin, mechanically, with no model retyping a number: the same
rule as the question pipeline. It refuses a PDF whose sha256 isn't the printing it was written
for, and records each exhibit's PDF page and printed page. Even an appendix's assumptions — the
policy term, the effective date, how long rates are in effect — are read off its first page by a
pattern, not typed. The output is `quiz/src/lib/tools/fixtures/*.json`, committed;
`scripts/test_tool_fixtures.py` tests the parsers.

| Tool | Source | Held to |
|---|---|---|
| Ratio Triangle | Friedland (2010), Ch. 6, Tables 2, 3, 6, 8–10 | 56 ratios: paid-to-reported (Table 3 over Table 2) and closed-to-reported counts (Table 9 over Table 8) |
| Age-to-Age Factors | Ch. 7, Exhibit I, Sheet 1 | the 45 age-to-age factors, and all six rows of averages: simple, medial and volume-weighted over the latest 3 or 5, geometric over the latest 4 |
| Development to Ultimate | the same sheet, Part 4 | 10 CDFs and 10 percents reported, from the selected factors |
| Chain Ladder | Ch. 7, Exhibit I, Sheet 3 | 20 ultimates, reported and paid |
| Expected Claims | Ch. 8, Exhibit II, Sheet 1 | 10 expected claims, at each year's own ELR |
| Bornhuetter-Ferguson | Ch. 9, Exhibit I, Sheet 1 | 60 values: percent unreported, expected unreported and ultimate, reported and paid |
| Benktander | Ch. 9, Exhibits III and V | 60 ultimates under the changing-conditions scenarios, from Exhibit III's expected claims |
| Cape Cod | Ch. 10, Exhibit I, Sheets 1–2 | the used-up premium, the 69.5% claim ratio, and 30 expected claims, IBNR and ultimates |
| Earned Premium | Werner & Modlin (2016), Ch. 4, Tables 4.7, 4.11, 4.13, 4.18–4.21 | 24 written and earned exposures, annual and six-month policies, calendar and policy year |
| On-Level Factors | Appendix A, Current Rate Level - 1 and - 2 | 35 shares of earned premium by rate level group, 5 average rate levels, 5 on-level factors |
| Trend Fit | Appendix A, Premium Trend - 1; Loss Trend - 1 | 24 exponential fits: average premium, frequency, severity and pure premium over 20, 16, 12, 8, 6 and 4 points |
| Trend Factor | Appendix A, Loss Trend - 5; Appendix B, Loss Trend - 3 | the projected trend periods (2.25 and 2.5 years) and factors |
| Expense Ratios | Appendix A, Expense | each type's three-year ratio, fixed and variable share, and the 11.3% and 17.0% provisions |
| Permissible Loss Ratio | Appendices A-7, B-5, C-7 | the (variable) permissible loss ratio of each indication |
| Loss Ratio Method | Appendix A, LR Indication; Appendix C, LR Indication | the variable permissible loss ratio and indicated change, with and without a fixed provision |
| Pure Premium Method | Appendix B, PP Indication | the 81.2% permissible loss ratio and the $850.76 indicated rate |
| Full Credibility Standard | Werner & Modlin, Ch. 12, p. 218 | z and the 1,082-claim standard at p = 90%, k = 5% |
| Partial Credibility | Werner & Modlin, Ch. 12, p. 219; Appendices A-8, B-5, C-7 | Z for 100, 3,612, 683 and 283 claims |

Each value is compared at the precision the source prints: three decimals for factors, four for
rate levels, a tenth of a percent for percentages, a dollar or a cent for amounts. Where an
exhibit's own inputs are printed rounded, the tolerance carries that rounding through the
formula — ½(1 + q + q²) dollars for a Benktander ultimate, ½(1 + a/b)/b for a ratio of two
amounts in $000 — and the comment beside the check says so.

**Published questions (§9.2).** The official answer is never copied into a check: the test reads
the keyed option from the bank and requires the tool to land within its printed precision *and*
nearer it than any other option — or, for a CAS question answered by a range ("At least 21, but
less than 23"), inside the keyed range. Every input's printed form is quoted from the question's
stem, and the test finds each quote there. A check is a **chain** of runs, as a person or an agent
would work the question, and every tool in the chain counts it — which is how Interest Converter
and Annuity, which no question asks about alone, are checked.

| Tool | Questions |
|---|---|
| Present Value | SOA FM 26, 71, 82, 225, 245, 281 |
| Interest Converter | SOA FM 90, 291, 367, 370 (chained) |
| Annuity | SOA FM 334, 367 (chained) |
| Internal Rate of Return | SOA FM 291, 334, 370 (chained) |
| Loan Schedule | SOA FM 90, 190, 212, 232, 380 |
| Bond Price, Bond Yield, Bond Amortization | SOA FM 71; 213, 325; 7, 281 |
| Duration & Convexity, Redington Immunization | SOA FM 50, 101, 165, 183, 228, 372, 409, 429; 219 |
| Distribution | SOA P 66, 124, 158, 164, 327, 355, 390, 670 |
| Limited Expected Value, Expected Payment | SOA P 48, 50, 563; 337, 601, and CAS MAS-I Fall 2019 questions 1 and 23 |
| Bühlmann Credibility | CAS MAS-II Fall 2018 questions 4 and 5 |

**Conventions the checks surfaced**, now explicit options rather than silent choices (§13):
- *Latest n.* Friedland averages the latest 3 or 5 years, and the geometric mean over 4. Age-to-Age
  Factors' average is two judgments, the method and the latest years (0 for all), and Expected
  Claims takes an optional ELR per origin, as Friedland's Chapter 8 sets 75% and 65%.
- *Rounded CDFs.* Friedland rounds each CDF to three decimals, and takes percent reported and the
  ultimates from the rounded CDF: unrounded, 1/1.0508 is 95.2% where the book prints 95.1%.
  Development to Ultimate has a **CDFs: Unrounded / 3 decimals** choice. The Chain Ladder and B-F
  checks take the printed CDFs as inputs, as a reader working the exhibit would.
- *Rounded rate levels.* Werner & Modlin round each cumulative rate level to four decimals at
  every step of the product (1.0973 × 0.98 → 1.0754, and on to 1.1857 where unrounded gives
  1.1855), and the average level before dividing. On-Level Factors has a **Rate level indices:
  Unrounded / 4 decimals** choice, half-up as a spreadsheet's ROUND.
- *Percentages, not CDFs.* Friedland's changing-conditions scenarios are built from percentages
  unreported (1.0%, 23.0%), and his Benktander arithmetic uses them, so that check gives the
  CDF as 1 / (1 − the printed percentage). Exhibit V's reported claims under case strengthening
  develop on averages printed only rounded, both ways, so those two scenarios aren't held to the
  dollar; their paid claims are.
- *Fits of printed figures.* Appendix A's trend fits reproduce from the averages and frequencies
  the exhibit prints, not from the totals behind them (the 4-point premium fit is 1.95% from the
  totals, 1.947% from the printed averages, and the exhibit prints 1.9%).
