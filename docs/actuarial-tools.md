# Actuarial Tools — plan

_Last updated: 2026-10-09 · Status: **plan**. Nothing here is built yet._

**Actuarial Tools** is a new section of the app: a catalogue of actuarial calculators that
people and AI agents both use. A person uses a tool page. An agent uses the same tool through
the MCP connector or a JSON endpoint. Both run the same code on the same inputs and get the
same numbers, the same working and the same citations.

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
- applies one named method, as a cited reading defines it;
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
| **Practising actuary** | "Run the standard method on my data quickly and correctly, with workpapers I can file." | Pastes a paid triangle from Excel. Runs development factors, chain ladder, BF and Cape Cod side by side. Exports an `.xlsx` with the method references for the ASOP 41 documentation. |
| **Pricing analyst** | "Build the indication from rate history, premium and losses." | Enters the rate-change history, then on-levels, trends and develops, and gets the indicated change under both the loss ratio and pure premium methods. |
| **Reviewer / regulator / auditor** | "Re-perform a filed calculation from its exhibit numbers." | Enters the filing's factors and checks that the indicated change reproduces. |
| **Adjacent professional** | "Understand what the number means." | Opens the **Method** tab, the concept page in the popup, without reading a textbook. |
| **AI agent acting for any of these** | "Do the arithmetic with a verified engine instead of in the model's head, and give the human something to inspect." | Claude, with the connector, calls `run_tool` on an uploaded CSV, asks the user to pick the LDFs, runs the methods, drafts commentary citing the concept pages, and returns an `app_url` that opens the same run in the app. |

The agent row is the reason the section exists. A general model will do a chain ladder
"by hand" in its reply. It miscounts the triangle, rounds partway through, and invents a
tail. A tool call fixes all three, and every number becomes something the human can check.

---

## 3. Ground rules

These hold up the whole section. Each is enforced in code and pinned by a test, as in
`docs/ai-connector.md` and `docs/actuaria-online.md` §2.

- **R1 — One engine, two front doors.** A tool is a pure function in `quiz/src/lib/tools/`.
  The tool page, the MCP connector and the HTTP endpoint all call that function. Nothing is
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
- **R5 — The method is a vault page.** A tool's **Method** tab is its concept page, opened in
  `ConceptPopup` (there is no second reader; see `docs/cowork.md` §4). The tool's metadata
  links its concept pages and the readings with chapters. The method page's fact-check
  verdict travels with every result, as it does for every MCP result today.
- **R6 — Tested against a source.** A tool can leave Preview only once it reproduces at
  least one **published** worked example to the source's precision (§9). The tool page shows
  what it was tested against, for example "Reproduces Friedland (2010) Ch. 7 example". It
  shows nothing until such a test passes in CI.
- **R7 — The user's data stays theirs.** In the app, tools compute in the browser, and data
  never leaves the device unless the user saves a run to their account. The HTTP and MCP
  endpoints are stateless: no input is stored, and logs record only the tool id, duration and
  outcome. Analytics events carry the tool id and never a value.
- **R8 — Tool ids are public API.** `reserving.chain_ladder` is a contract, like the MCP tool
  names. Tools are semver'd. A breaking change ships as a new major version, and the old one
  keeps answering through a deprecation window.

---

## 4. The tool catalogue

The catalogue is organised by **practice area**: what a practitioner calls the work, not
which exam examines it. Each tool lists the vault concept pages it implements and the exams
that examine them, and the tool page shows that exam's logo, as an exam row does. That's
the bridge back to Study mode.

**Phase** is when the tool is built (§11). Priority comes from three things: how often
practitioners do the calculation, how deep the vault's coverage is (P&C ratemaking and
reserving are deep, life contingencies are still `development`), and how much existing code
the tool can reuse.

### 4.1 Data and triangles (the foundation every P&C tool stands on)

| Tool | What it does | Key features | Vault pages | Phase |
|---|---|---|---|---|
| **Triangle Toolkit** | Builds, converts and inspects development triangles | Paste from Excel (TSV) or CSV; long format (origin, age, value) or matrix; cumulative ↔ incremental; diagonals by calendar period; ratio triangles (paid ÷ reported, closed ÷ reported, average case O/S, average paid, paid ÷ on-level EP); heat-map shading of a diagonal shift | Development Triangle; Friedland Ch. 5–6 | 1 |
| **Triangle Builder** | Turns a claim-transaction listing into triangles | Columns mapped by the user (claim id, accident/report/transaction date, paid, case); AY/RY/PY × evaluation age (any interval); paid, reported, reported/closed/open counts; ASOP 23-style data checks (negative values, dates out of order, a claim closed with case open, totals reconciled to the listing) | Ratemaking Data Organization; Accident Year, Policy Year, Report Year; ASOP 23 | 2 |
| **Period & Dates** | The date arithmetic behind ratemaking and reserving | Earning of a policy in a period (any term, written evenly or by exact dates); average written/earned/accident date; trend periods (one-step, two-step); CY/AY/PY assignment of a transaction | Earned Exposure, Earned Premium, Trend | 1 |

### 4.2 Reserving (Friedland 2010; Exam 5, 6C, 7)

| Tool | What it does | Key features | Vault pages / reading | Phase |
|---|---|---|---|---|
| **Development Factors** | Age-to-age factors, averages, selections, CDFs | Simple, volume-weighted, medial (excluding high/low), geometric, latest-*n* averages; excluded cells; selected factors as input with the average in place shown as the default; CDFs, % reported/paid; development-factor triangle with outliers highlighted | Loss Development, Chain Ladder Method; Friedland Ch. 7 | 0 |
| **Tail Factor** | Development beyond the triangle | Curve fits to (ATA − 1): exponential decay and inverse power, with fit statistics; Bondy; ratio of reported to paid at the last age; user-supplied tail; the fit's extrapolation drawn | Tail Factor; Clark (2003) for growth curves | 1 |
| **Chain Ladder** | The development technique | Paid and reported side by side; ultimate, IBNR, total unpaid; consumes Development Factors' selections | Chain Ladder Method, Chain Ladder Assumptions; Friedland Ch. 7 | 1 |
| **Expected Claims** | A priori ultimate | ELR × earned premium (on-level, trended), or a priori pure premium × exposure; ELR as input or derived from mature years with explicit adjustments | Friedland Ch. 8 | 1 |
| **Bornhuetter-Ferguson** | Credibility-weighted ultimate | Paid and reported; % unreported = 1 − 1/CDF from a chain-ladder run or input; expected claims from that tool or input | Bornhuetter-Ferguson Method; Friedland Ch. 9 | 1 |
| **Benktander** | Iterated BF | Number of iterations; convergence to chain ladder shown | Benktander Method; Mack (2000) | 1 |
| **Cape Cod** | Stanard-Bühlmann | Used-up premium; ELR derived from all years; optional decay factor (generalised Cape Cod) | Cape Cod Method; Friedland Ch. 10 | 1 |
| **Frequency-Severity** | Counts × severities | Projected ultimate counts and severities with trend to each AY; disposal-rate variant | Frequency-Severity Method; Friedland Ch. 11 | 2 |
| **Case Outstanding Development** | Reserves from case | Case-to-paid and case-to-IBNR factors (self-insurer method) | Friedland Ch. 12 | 2 |
| **Berquist-Sherman** | Adjusts for changes in operations | Case-adequacy adjustment (restating average case O/S by a severity trend); settlement-rate adjustment (disposal rates, interpolating paid on closed counts); runs chain ladder on the adjusted triangle | Berquist-Sherman Method; Friedland Ch. 13 | 2 |
| **Recoveries** | S&S and reinsurance | Salvage and subrogation development and ratio methods; gross → ceded → net consistency | Salvage and Subrogation, Reinsurance Reserving; Friedland Ch. 14, Friedland (2022) | 2 |
| **ALAE & ULAE** | Claim adjustment expenses | ALAE development / ratio methods; ULAE classical (paid-to-paid), Kittel refinement, Mango-Allen | Friedland Ch. 16–17 | 2 |
| **Summary of Indications** | Puts methods side by side for selection | Every method's ultimate by origin; the user's selected ultimate (a judgment) with a reason field; range; implied IBNR and unpaid; reasonableness ratios (ultimate ÷ EP, severity, frequency) | Range of Indications; Friedland Ch. 15; ASOP 43 | 1 |
| **Mack Chain Ladder** | Variability of chain-ladder reserves | Standard error by AY and total; σ² estimation and its tail extrapolation; residual plots for the model's assumptions | Mack Chain Ladder Model; Mack (1994) | 2 |
| **ODP Bootstrap** | Predictive distribution of reserves | Shapland's ODP bootstrap: scaled Pearson residuals, heteroscedasticity adjustment, process variance (gamma), seeded, 1k–10k iterations; percentiles and histogram; runs in a Web Worker | ODP Bootstrap Model; Shapland (2016) | 2 |
| **Clark LDF & Cape Cod** | Growth-curve reserving | Loglogistic or Weibull by MLE; LDF and Cape Cod variants; process and parameter variance; truncation | Clark (2003) | 2 |
| **Actual vs. Expected** | Rolls an analysis forward | Expected emergence between evaluations from a prior run's pattern; A − E by origin | Roll Forward Analysis | 3 |
| **Discounting & Risk Adjustment** | IFRS 17 measurement of claims | PV of a payment pattern with a user-supplied yield curve (bottom-up, illiquidity premium as input); risk adjustment by the confidence-level method (from a bootstrap or a fitted distribution) or the cost-of-capital method (capital and cost rate as inputs) | IFRS 17 Discount Rates, Insurance Risk Margin; CIA IFRS 17 pages | 3 |

### 4.3 Ratemaking (Werner & Modlin 2016; Exam 5)

| Tool | What it does | Key features | Vault pages / reading | Phase |
|---|---|---|---|---|
| **Premium & Exposure** | Written, earned, unearned, in-force | By CY or PY; even-writing or exact dates; any policy term; the parallelogram drawn | Earned Exposure, Earned Premium; W&M Ch. 4–5 | 1 |
| **On-Level Premium** | Brings historical premium to current rates | Parallelogram method from a rate-change history (dates, %, policy term, CY or PY aggregation), with the geometry drawn and each area shown; extension of exposures where the user has policy-level data | Parallelogram Method, On-Leveling, On Level Premium; W&M Ch. 5 | 1 |
| **Trend** | Fits and applies trends | Exponential and linear least squares on frequency, severity, pure premium or average premium; latest-*n* points; R² and residuals; selected trend as input; trend periods from Period & Dates; one-step and two-step premium trend | Loss Trend, Premium Trend, Exponential Trend, Linear Trend; W&M Ch. 5–6; ASOP 13 | 1 |
| **Overall Indication** | The indicated rate change | Loss ratio and pure premium methods side by side; fixed and variable expense provisions; permissible loss ratio; profit and contingency as input; consumes On-Level, Trend and a development run | Overall Rate Level Indication, Loss Ratio Method, Pure Premium Method, Permissible Loss Ratio; W&M Ch. 7–8 | 1 |
| **Expense Provisions** | Expense ratios for the indication | All-variable method vs. premium-based and exposure/policy-based fixed expense projections; expense trend | Expense Provisions, Fixed Expenses; W&M Ch. 7 | 1 |
| **Credibility-Weighted Indication** | Blends with a complement | Classical (limited fluctuation) Z; complements (trended present rates, larger group, competitor's indication as input) with the choice recorded as a judgment | Complement of Credibility; W&M Ch. 12 | 2 |
| **Class Relativities** | One-way classification analysis | Pure premium and loss-ratio approaches; credibility weighting; base rate offset (off-balance); relativity capping and its re-balancing | Classification Ratemaking; W&M Ch. 9, 14 | 2 |
| **ILFs & Deductibles** | Limit and deductible factors | ILFs from size-of-loss data (LEV-based, with trend and development caveats as judgments) or a fitted distribution; the consistency test (marginal ILFs falling); loss elimination ratios for deductibles | Increased Limits, Deductible, Limited Expected Value; W&M Ch. 11 | 2 |
| **Rate Implementation** | From indication to a rate manual | Base rate needed for a target overall change given new relativities (extension of exposures or an approximate average relativity); dislocation by segment | Considerations for Implementing Rates; W&M Ch. 14 | 3 |

### 4.4 Loss distributions and coverage (Exam P, MAS-I)

| Tool | What it does | Key features | Vault pages | Phase |
|---|---|---|---|---|
| **Distribution Calculator** | PDF/PMF, CDF, quantiles, moments | The exam parameterisations in `lib/distributions.ts`; probabilities between bounds; the existing simulator drawn as the result view | Continuous / Discrete Univariate Distributions | 1 (reuses `distributionMath.ts`) |
| **Coverage Modifications** | Deductibles, limits, coinsurance, inflation | Per-loss and per-payment expected payments; ordinary vs. franchise deductible; LER; the effect of uniform inflation on each | Deductible, Limited Expected Value, Layer of Insurance | 1 |
| **Aggregate Loss** | Frequency × severity | Moments; Panjer recursion over a discretised severity (rounding or local moment matching); normal / lognormal approximations; stop-loss premium; seeded simulation as a check | Aggregate Loss Model, Frequency-Severity Models | 2 |
| **Distribution Fitting** | Fits a severity or frequency model to data | MLE, method of moments, percentile matching; grouped, censored and truncated data; KS, Anderson-Darling and chi-square tests; AIC / BIC; Q-Q and P-P plots | Fisher Information, Model Selection | 2 |
| **Risk Measures** | VaR, TVaR and others | On a fitted distribution or a sample (e.g. an ODP Bootstrap run); expected policyholder deficit | Risk Measure | 2 |

### 4.5 Credibility (Exam MAS-II, Exam 5, Exam 8)

| Tool | What it does | Key features | Vault pages | Phase |
|---|---|---|---|---|
| **Limited Fluctuation** | Full standard and partial credibility | Standards for frequency, severity, pure premium and aggregate claims from *p* and *k*; square-root rule | Limited Fluctuation Credibility, Full Credibility Standard | 1 |
| **Bühlmann / Bühlmann-Straub** | Greatest-accuracy credibility | From structural parameters, or nonparametric empirical Bayes from the user's data (EPV, VHM estimated, with exposures); Z and premiums by risk | Bühlmann Credibility, Bühlmann-Straub Credibility, Empirical Bayes Credibility | 1 |
| **Bayesian Credibility** | Conjugate updates | Poisson-gamma, binomial-beta, normal-normal, exponential-inverse gamma; posterior and predictive | Bayesian Credibility, Exact Credibility | 2 |

### 4.6 Reinsurance, excess and individual risk rating (Exam 7, 8, 9)

| Tool | What it does | Key features | Vault pages / reading | Phase |
|---|---|---|---|---|
| **Treaty Cession** | Gross → ceded → net on a loss listing | Quota share, surplus share (lines), per-risk XoL, cat XoL with reinstatements (pro-rata as to amount and/or time), aggregate stop loss | Types of Reinsurance, Excess of Loss, Aggregate Excess of Loss | 2 |
| **Experience Rating (Burning Cost)** | Layer cost from history | Individual large losses trended and developed (factors as input), applied to the layer, burn cost by year, exposure-adjusted, loadings as input | Reinsurance Pricing; Clark (2014) | 2 |
| **Exposure Rating** | Layer cost from exposure | Property: MBBEFD curves, with the Swiss Re Y1–Y4 parameters transcribed from Bernegger (1997) and user curves; casualty: ILF-based layer share | Exposure Curves; Bernegger (1997), Clark (2014) | 2 |
| **Retrospective Rating** | Retro premium and its parts | Retro formula (basic, converted losses, LCF, tax multiplier, min/max); insurance charge and savings from an aggregate loss distribution (Table M built from the distribution, never from a copied table); the balance equation | Retrospective Rating, Retrospective Premium Reserve | 3 |
| **Experience Rating Mod** | Primary/excess split plans | Credibility-weighted mod from actual and expected; split-plan parameters supplied by the user, or transcribed with source where a reading publishes them | Experience Rating | 3 |

### 4.7 Financial mathematics (Exam FM, Exam 9)

| Tool | What it does | Key features | Vault pages | Phase |
|---|---|---|---|---|
| **Interest Converter** | Equivalent rates | Effective, nominal (*m*-thly) interest and discount, force of interest, real rates | Interest Rate, Nominal Interest Rate Convertible m-thly, Force of Interest | 0 |
| **Cash Flows** | PV, FV, NPV, IRR | Irregular cash flows at a flat rate or a spot curve; IRR with multiple-root detection; dollar- and time-weighted returns | Discount Function, Rate of Return | 1 |
| **Annuities** | Every annuity form | Immediate/due, deferred, continuous, *m*-thly, arithmetic and geometric increasing/decreasing, perpetuities; solve for any one unknown (PV, payment, *n*, *i*) | Annuities and its variants | 1 |
| **Loan Schedule** | Amortisation | Amortisation and sinking-fund schedules; outstanding balance prospective and retrospective; refinancing comparison | Loan Amortization, Loan Repayment Comparison | 1 |
| **Bond** | Price, yield, book value | Price from yield and yield from price; amortisation schedule (premium/discount); callable bonds (yield-to-worst); accrued interest, clean vs. dirty price | Bond Price, Bond Amortization, Callable Bond, Accrued Interest | 1 |
| **Duration & Immunization** | Interest-rate sensitivity | Macaulay, modified and effective duration; convexity; Redington and full immunization tests; cash-flow matching | Duration, Immunization, Full Immunization, Duration Matching | 1 |
| **Yield Curve** | Spot and forward rates | Bootstrapping spot rates from coupon bonds or par yields; forwards; pricing on the curve | Spot Rates and Forward Rates, Yield Curve | 2 |

### 4.8 Risk, capital and ERM (Exam 9, Exam 6C)

| Tool | What it does | Key features | Vault pages / reading | Phase |
|---|---|---|---|---|
| **Aggregation & Copulas** | Combines lines' distributions | Gaussian and t copulas over fitted or simulated marginals; seeded; diversification benefit | Brehm et al. | 3 |
| **Capital Allocation** | Allocates capital to units | Proportional, marginal, Euler (co-TVaR) on a joint sample; RAROC by unit | Cummins (2000), Return on Capital, Cost of Capital | 3 |
| **MCT** | OSFI's Minimum Capital Test | The risk-factor arithmetic with every factor transcribed from the guideline in force, with its version and date; a factor the vault hasn't transcribed is absent, not estimated | OSFI MCT | 3 |

### 4.9 Life and health contingencies (SOA, ALTAM/FAM and the FSA tracks)

These exams are `development` in `lib/examStatus.ts`, so the tools wait for the vault:
they're built once the concept pages exist and the tables are transcribed with their source.

| Tool | What it does | Key features | Phase |
|---|---|---|---|
| **Life Table** | Survival functions | *ₜp_x*, *ₜq_x*, *e_x*, select and ultimate; fractional ages (UDD, constant force); tables transcribed from a published source, or a parametric law (Gompertz, Makeham) with user parameters | 3 |
| **Insurance & Annuity APVs** | Actuarial present values | Whole/term/endowment/deferred, discrete and continuous (UDD, claims acceleration, Woolhouse); net and gross premiums | 3 |
| **Policy Values** | Reserves | Prospective/retrospective; recursion; Thiele numerically; multiple decrement and multi-state models; joint life | 3 |

### 4.10 Statistical modelling (MAS-I, MAS-II, PA)

| Tool | What it does | Key features | Phase |
|---|---|---|---|
| **GLM** | Rating-factor models | Poisson/gamma/Tweedie/binomial by IRLS; log and logit links; offsets and weights; relativities, deviance, AIC; feeds Class Relativities | 3 |
| **Regression** | Linear models | OLS with diagnostics (residuals, leverage, VIF); added-variable plots | 3 |

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

One shape for every tool, so that UI forms, MCP schemas, OpenAPI, docs and tests can all be
generated from it.

```ts
// quiz/src/lib/tools/types.ts (sketch)
interface ToolSpec<I, O> {
  id: string                    // 'reserving.chain_ladder' — public API (R8)
  version: string               // semver of this tool
  name: string                  // 'Chain Ladder'
  area: PracticeArea            // 'reserving' | 'ratemaking' | 'distributions' | …
  summary: string               // one line: what it computes
  input: JsonSchema             // the one source of truth for validation, UI and agents
  output: JsonSchema
  run(input: I, ctx: RunContext): ToolResult<O>   // pure, deterministic (seeded if random)
  method: {
    concepts: string[]          // vault concept paths → Method tab, exam logos, fact check
    readings: { resource: string; locator: string }[]   // Resources/Books page + chapters
    standards?: string[]        // e.g. the ASOP 43 resource page
  }
  examples: ToolExample[]       // published worked examples, cited (R2) — also fixtures
  checkedAgainst: Fixture[]     // what CI reproduces (R6)
  limits: { maxCells?: number; maxIterations?: number }
  consumes?: DataKind[]         // what it can take from another tool's output (chaining)
  produces?: DataKind[]
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

**Recommendation: Tools is a third app mode**, beside Study and Cowork, in `lib/appMode.ts`:

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
| `/tools` | **Catalogue.** Practice areas as `ListPanel` groups (`components/ui/ListPanel.tsx`); search through `FloatingSearchBar` parts; each row shows the tool's name, its one line, the exam logos of the exams that examine it, and a *Tested against* tick once R6 passes. |
| `/tools/:toolId` | **Tool page** (below). |
| `/tools/runs` | **My runs.** Saved runs, localStorage first and synced to the account when signed in (§8.5). |
| `/tools/analyses/:id` | **Analysis** (Phase 4). A saved chain of runs, e.g. triangle → factors → CL/BF/CC → summary. |

The sidebar lists the practice areas while the mode is open, the way Study Guides lists
Exams / Resources.

### 6.3 The tool page

```
┌ Chain Ladder  [Exam 5][Exam 7]                   ✓ Tested against Friedland Ch. 7 ┐
│ Inputs                          │ Results  ·  Working  ·  Method  ·  Use with AI  │
│  Triangle  [paste ▾][example ▾] │  Ultimate / IBNR / unpaid by AY (table + chart)  │
│  ┌──────────────────────────┐   │  Judgments: averages = vol-weighted all (default)│
│  │ grid (TSV paste, edits)  │   │  Warnings: 12–24 factor on 2 points              │
│  └──────────────────────────┘   │                                                  │
│  Factors  from Development ▸    │  [Export .xlsx] [CSV] [Copy JSON] [Share] [Save] │
└──────────────────────────────────────────────────────────────────────────────────┘
```

- **Inputs** are generated from the input schema, with `x-ui` hints for the custom
  controls: a **data grid** (`components/tools/DataGrid.tsx`, lightweight, with paste from
  Excel as the primary way in; Fortune-sheet is reserved for the workspace), a
  rate-history editor, and a distribution picker that reuses the simulator's sliders. Every
  field shows its unit. A judgment field shows which value is in force and whether it's the
  default.
- **Load an example** offers only cited, published examples (R2). Loading one shows its
  citation above the grid.
- **Results**: the headline figures, the tables (shared styling with Cowork exports), and a
  chart where one helps, drawn with Recharts following the dataviz conventions and the
  style guide. Charts include the triangle heat map, the parallelogram, trend fits and a
  bootstrap histogram.
- **Working**: the trace as KaTeX steps, so math focus works on it unchanged. Each step
  links the concept it applies.
- **Method**: the concept page in `ConceptPopup`, with the readings below as
  `ResourceMetaCard`s and the fact-check verdict on top.
- **Use with AI**: the exact `run_tool` call for this input (JSON), the connector address,
  and a "Copy prompt" button. A human sees precisely what an agent would send and receive,
  and can hand a run to an assistant. This is parity made visible.
- **Actions**: **Export `.xlsx` / `.csv`** through `lib/xlsx.ts` (workbook sheets: Inputs,
  Results, Working, Judgments, Method & sources); **Copy JSON**; **Share** (the input,
  deflated and base64url-encoded into the URL fragment, so it never reaches a server, with
  a fallback to "Save run" for large inputs); **Save**; and **Send to…**, which offers the
  tools that consume this output (`consumes`/`produces`).
- Heavy runs (bootstrap, simulation, MLE) go to a **Web Worker** with progress, so the page
  never freezes. The same function still runs server-side for agents, under `limits`.

### 6.4 Entry points from the rest of the app

- **Concept action menu** (`components/ConceptActionMenu.tsx`): an **Open in Tools** row for
  any concept a tool implements (an index built from every `method.concepts`).
- **Question explanations**: after the answer is revealed, never while the question is live
  (the same rule as `showMeta`), a **Work it in a tool** link opens the tool with the
  question's data loaded, where a fixture maps that question (§9.2).
- **Distribution concept pages**: the inline simulator gains an "Open in Tools" corner link
  to the full Distribution Calculator. Both draw from the same engine.
- **Search**: tools join the Dashboard / Search page indexes (`lib/appSearch.ts`) as a
  **Tools** pill.
- **SEO**: one static page per tool (`dist/tools/<id>/index.html`) with its method
  description and readings, generated alongside the wiki's (`docs/seo.md`).

---

## 7. The agent surface

### 7.1 MCP: three tools on the existing connector

The calculators join the existing endpoint (`quiz/api/mcp.js`) rather than a new server, so
a reader who has added Actuarial Notes already has them. To keep forty schemas out of every
model's context, the connector exposes the catalogue **progressively**:

| MCP tool | Input | Returns |
|---|---|---|
| `list_tools` | optional `area`, `query`, `exam` | id, name, one line, area, exams, tested-against, version |
| `describe_tool` | `tool` | the full input/output JSON Schema, a cited example input, method concepts and readings with URLs, the judgments the tool will ask for |
| `run_tool` | `tool`, `input`, optional `trace` (default on), `format` (`json`/`markdown`) | the `ToolResult` envelope, as `structuredContent` with an `outputSchema` where the client's era supports it, and as text for older clients, plus an `app_url` that opens the same run in the app |

All three are `readOnlyHint: true`, `idempotentHint: true` and `openWorldHint: false`. Nothing
is written anywhere, and the same input always gives the same output. The connector's
contract in `docs/ai-connector.md` ("read-only, public, nothing invented, the fact check
travels with the fact") holds unchanged. A result is derived from the caller's own input,
and its method page's verdict travels with it.

**Prompts** (the skills in MCP form) teach the workflows that chain tools and stop for human
judgment:
- `reserve_analysis`: inspect the triangle (diagnostics), compute factors, **ask the human to
  select**, run the methods, show the Summary of Indications, ask the human to select an
  ultimate, then draft commentary citing the method pages.
- `rate_indication`: rate history → on-level → trend (human picks the trend) → develop →
  indication.
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

### 7.3 An agent call, end to end

```jsonc
// run_tool
{ "tool": "reserving.bornhuetter_ferguson",
  "input": {
    "triangle": { "origins": ["2021","2022","2023"], "ages": [12,24,36],
                  "values": [[1000,1500,1650],[1100,1700,null],[1200,null,null]],
                  "kind": "cumulative", "measure": "reported" },
    "cdf_from": "volume_weighted_all",      // a judgment, made explicit
    "tail": 1.0,
    "expected_claims": [1700, 1850, 1950] } }

// → result (abridged)
{ "tool": "reserving.bornhuetter_ferguson", "version": "1.0.0", "inputHash": "sha256:…",
  "summary": "Total BF ultimate 5,504.8; IBNR 954.8 …",
  "judgments": [
    { "field": "cdf_from", "value": "volume_weighted_all", "default": false },
    { "field": "tail", "value": 1.0, "default": true,
      "note": "No development assumed beyond 36 months." } ],
  "warnings": [ "The 24–36 factor rests on one origin." ],
  "trace": [ { "label": "% unreported, 2023", "latex": "1 - 1/CDF_{12}", "result": 0.4034 } ],
  "method": { "concepts": ["https://…/wiki/concept/bornhuetter-ferguson-method"],
              "readings": [{ "title": "Estimating Unpaid Claims Using Basic Techniques",
                             "locator": "Ch. 9" }],
              "fact_check": "Not fact checked" },
  "app_url": "https://quiz.actuarialnotes.com/tools/reserving.bornhuetter_ferguson#run=…" }
```

(The triangle is a toy, there only to show the envelope's shape. The examples a tool ships
and the docs print come from cited sources, by R2.)

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
quiz/src/pages/Tools/      Catalogue, ToolPage, Runs, Analysis (lazy chunk)
quiz/src/components/tools/ DataGrid, SchemaForm, ResultTables, TracePanel, UseWithAI, charts
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
  tool page loads its own engine module.
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
- **E2E**: `e2e/tools.spec.ts` covers pasting a triangle, running, the Working tab, export,
  and opening a share link.

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
- `TOOLS_ENABLED`, the `tools` mode in Preview, `/tools` catalogue and tool-page shell with
  schema-generated forms, `DataGrid` with Excel paste, Working tab, `.xlsx` export.
- MCP `list_tools` / `describe_tool` / `run_tool`; `POST /api/tools/{id}`.
- **Two tools**: *Interest Converter* (scalar inputs) and *Development Factors* (tabular), each
  with a published fixture.
- **Exit:** both tools return byte-identical envelopes through the UI engine, MCP and HTTP
  (parity test green). An agent in Claude can list, describe and run them, and its `app_url`
  opens the same run in the app.

### Phase 1 — The core practice set (~25 tools)
- Reserving: Tail Factor, Chain Ladder, Expected Claims, BF, Benktander, Cape Cod, Summary
  of Indications.
- Ratemaking: Period & Dates, Premium & Exposure, On-Level, Trend, Expense Provisions,
  Overall Indication.
- Distributions: Distribution Calculator (simulators re-pointed at it), Coverage
  Modifications.
- Credibility: Limited Fluctuation, Bühlmann / Bühlmann-Straub.
- Finance: Cash Flows, Annuities, Loan Schedule, Bond, Duration & Immunization.
- Triangle Toolkit with diagnostics. Chaining (Send to…). Saved runs (local). Share links.
  Concept-menu entry points. Prompts `reserve_analysis`, `rate_indication`, `check_my_work`.
  Skill section. OpenAPI.
- **Exit:** every Phase 1 tool has at least one published fixture passing (R6). At least 50
  bank questions are mapped and reproduced. The tools-eval harness has a baseline for both
  arms. Then the mode can leave Preview (a §14 decision).

### Phase 2 — Depth for practitioners
- Triangle Builder (transaction listings + data checks); Frequency-Severity, Case O/S,
  Berquist-Sherman, Recoveries, ALAE & ULAE; Mack, ODP Bootstrap (Worker), Clark.
- Credibility-Weighted Indication, Class Relativities, ILFs & Deductibles.
- Aggregate Loss, Distribution Fitting, Risk Measures, Bayesian Credibility.
- Treaty Cession, Burning Cost, Exposure Rating (MBBEFD transcribed); Yield Curve.
- Saved runs synced to the account (`user_tool_runs` migration).
- **Exit:** a complete reserving analysis can be done on a pasted transaction listing and
  exported as one workbook, in the app and through an agent. The tools-eval arm shows a
  measured accuracy gain on Exam 5 / 7 numeric questions.

### Phase 3 — Breadth
- Actual vs. Expected; Discounting & Risk Adjustment (IFRS 17); Rate Implementation.
- Retro Rating, Experience Mod; Aggregation & Copulas, Capital Allocation, MCT (factors
  transcribed).
- GLM, Regression, with Open in workspace for anything beyond them.
- Life contingencies, once the SOA life exams leave `development` and the tables are
  transcribed.

### Phase 4 — Workflows and distribution
- **Analyses**: chained, saved, re-runnable pipelines, and an `analysis` envelope agents can
  run as one call.
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
- **Catalogue sprawl** (forty tools, half-built). Phase gates, R6 before Preview exits, and
  the shared kinds and `numeric.ts` so each new tool is mostly method, not plumbing.
- **Tool bloat in model context.** Progressive disclosure (`list` → `describe` → `run`)
  instead of forty MCP tools.
- **Function packaging** (§8.2). Resolved in the Phase 0 spike, with the committed-bundle
  fallback.
- **Maintenance across three surfaces.** There's only one implementation. The surfaces are
  generated from the spec, and the parity test fails the build if they drift.

---

## 14. Open decisions (the product owner's call)

1. **Mode or section?** Tools as a third mode (recommended, §6.1) or a sidebar entry in
   Study mode. A third mode out of Preview puts the mode pill in front of every reader.
2. **Access and pricing.** Recommended: every calculator free and signed-out (it's public
   method maths, it's the SEO and connector story, and an agent needs no account), with
   **Pro** for synced runs, Analyses, Cowork population and, later, higher API limits.
3. **MCP shape.** Progressive `list/describe/run` (recommended) or one MCP tool per family.
   The second suits clients that don't follow a describe step well. The eval (§9.4) can
   decide it with data.
4. **API keys.** Keep the HTTP API keyless and rate-limited, or issue keys (needed for
   batch use and for anything that ever stores state)?
5. **Life contingencies timing.** Build alongside the SOA life exams' content, or ahead of
   it for practitioners?
6. **Open-sourcing the engine.** Publish `lib/tools/` as a package? It strengthens the
   "checkable, not black-box" story and invites review. It also makes the engine a public
   artifact to maintain.

---

## 15. Immediate next steps

1. Ratify §3 (the ground rules) and decisions 1–3 in §14. Everything in Phase 0 depends on
   them.
2. Run the §8.2 bundling spike. It's the one technical unknown.
3. Transcribe the first two fixtures: an FM sample solution for the Interest Converter and
   Friedland's Ch. 7 example for Development Factors. Then build Phase 0 against them.
