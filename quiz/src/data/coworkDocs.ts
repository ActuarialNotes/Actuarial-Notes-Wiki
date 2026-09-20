/**
 * The bodies of Cowork's **sample source documents**.
 *
 * Each one stands for a *class* of document a publisher issues, not a
 * particular issue of it — Cowork does not carry FSRA's bulletin archive or
 * Intact's filings yet, and naming an imaginary one would put a citation in a
 * deliverable that nothing supports. So a sample says what that kind of
 * document contains, what an actuary takes out of it, and where to go for the
 * real thing; it carries no date, no figures and no link it cannot support.
 * `docs/cowork.md` calls this the seed contract, and replacing a sample with a
 * real document is the shape the next phase takes.
 *
 * They are authored with `Resources/Books`-style front matter so the popup
 * viewer renders them with the same metadata card a vault resource page gets
 * (`lib/resourceMeta.ts`), and registered as virtual vault files by
 * `lib/coworkContent.ts`.
 */

/** Front matter + body, keyed by the virtual path in `data/coworkSources.ts`. */
export const COWORK_DOCS: Record<string, string> = {
  'Cowork/Sources/fsra/auto-rate-filing-bulletins.md': `---
Title: "Auto rate filing bulletins"
Author: "Financial Services Regulatory Authority of Ontario"
Publisher: "FSRA"
Type: "Regulatory bulletin series"
Available from: "[fsrao.ca](https://www.fsrao.ca)"
---

> [!info] Sample entry
> Cowork does not carry FSRA's bulletin archive yet. This page describes the
> series so a deliverable can be scoped against it; cite the specific bulletin
> in force at your filing date.

FSRA issues bulletins that change what an Ontario automobile rate filing must
contain and which filing path it may take. They are short, they supersede one
another, and the one that governs is the one in force **at the date of the
filing** — not the date the analysis was run.

## What a filing takes from it

- **The filing path.** Major, standard, simplified or an expedited path; the
  path determines the supporting exhibits and the review timeline.
- **Required exhibits.** Which indication, territory and classification
  exhibits accompany the filing, and in what form.
- **Benchmark expectations.** Where FSRA expects a benchmark rather than a
  company-specific selection — often trend, and often development.
- **Effective dates and transition.** What applies to filings already in
  progress when a bulletin lands.

## How it is used in a deliverable

A pricing analysis cites the governing bulletin in its assumptions as the
*basis for the filing path*, and a report for a regulator restates it in the
scope section. Because bulletins supersede, a filing memorandum normally names
the bulletin **and** its date — the pair is the citation, not the number alone.

Related: [[FSRA Filing Specifications for SABS Optionality (2025)]].
`,

  'Cowork/Sources/ibc/severe-weather-insured-losses.md': `---
Title: "Severe weather insured-loss statements"
Author: "Insurance Bureau of Canada"
Publisher: "IBC"
Type: "Industry loss statistics"
Available from: "[ibc.ca](https://www.ibc.ca)"
---

> [!info] Sample entry
> Cowork does not carry the loss series itself. This page describes what the
> series is and how it is used; take the figures from IBC's own statement.

IBC publishes industry insured losses attributed to named catastrophe events in
Canada. It is the usual external reference point when a deliverable has to say
something about catastrophe experience that its own book is too small to
support.

## What the series settles

- **Event attribution.** Which losses belong to a named event, and over what
  dates.
- **Industry magnitude.** The insured loss for the event, on an industry basis.
- **Trend context.** A run of years, which is what lets a catastrophe load be
  discussed as a trend rather than as one bad year.

## Cautions when citing it

- Industry insured loss is **not** a company's loss. Using it as a load without
  an exposure basis substitutes someone else's book for your own.
- The threshold that makes an event "catastrophic" is a definition, not a fact;
  a deliverable that compares series has to compare definitions first.
- Losses are restated as claims develop, so the figure cited carries an as-of
  date.

## How it is used in a deliverable

A pricing analysis uses it to support a **catastrophe load** assumption, and an
ERM or capital deliverable uses it as the external check on a modelled
distribution's tail. Either way the row in the assumptions table names the
series and the as-of date, and the value is read off the statement.
`,

  'Cowork/Sources/pacicc/insurer-failure-research.md': `---
Title: "Insurer failure research series"
Author: "Property and Casualty Insurance Compensation Corporation"
Publisher: "PACICC"
Type: "Research report series"
Available from: "[pacicc.ca](https://www.pacicc.ca)"
---

> [!info] Sample entry
> Cowork does not carry the individual papers yet. This page describes the
> series; cite the specific paper you rely on.

PACICC maintains a standing research programme on why property and casualty
insurers fail, what failure costs, and how the compensation mechanism responds.
For a Canadian ERM or capital deliverable it is the closest thing to a domestic
empirical base for insolvency.

## What the series settles

- **A cause taxonomy.** Under-reserving, rapid growth, catastrophe exposure,
  reinsurance failure, and their relative frequency.
- **The cost of failure.** What a failure costs policyholders and the surviving
  members through assessment.
- **The assessment mechanism.** How a levy falls across members, which is a real
  contingent exposure on a member's balance sheet.

## How it is used in a deliverable

An ORSA or capital deliverable uses it twice: as the *external* evidence behind
a risk-appetite statement about insolvency, and as the basis for the
assessment-exposure row in its assumptions. A reserving deliverable uses the
cause taxonomy as the standing argument for why reserve adequacy is a solvency
question and not only a reporting one.

Related: [[PACICC]].
`,

  'Cowork/Sources/gisa/automobile-statistical-exhibits.md': `---
Title: "Automobile insurance statistical exhibits"
Author: "General Insurance Statistical Agency"
Publisher: "GISA"
Type: "Industry statistical exhibits"
Available from: "[gisa-asag.ca](https://www.gisa-asag.ca)"
---

> [!info] Sample entry
> Cowork does not carry the exhibits. This page describes them so an analysis
> can be scoped against them; take every figure from the exhibit itself.

GISA collects automobile insurance data for most Canadian jurisdictions and
publishes industry exhibits from it. In a rate filing it is the benchmark a
company's own experience is set beside — and in several jurisdictions the
benchmark a regulator expects to see referenced.

## What the exhibits carry

- **Industry experience** by jurisdiction, coverage and accident year: earned
  exposures, earned premium, claim counts and claim amounts.
- **Loss development** on an industry basis, which is the usual benchmark for a
  company whose own volume will not support a credible tail.
- **Trend series**, by coverage, over a run of accident half-years or years.

## Cautions when citing them

- Industry mix is not company mix. A benchmark development pattern imported
  without a mix adjustment silently assumes the two books are the same book.
- Exhibits are restated as data matures; the citation carries the **evaluation
  date**, not just the accident year.
- Coverage definitions differ across jurisdictions; a cross-province comparison
  is a comparison of definitions before it is a comparison of results.

## How it is used in a deliverable

A pricing analysis uses it for **benchmark development factors** and **benchmark
trend**, each entered as an assumption naming the exhibit and its evaluation
date. A reserving analysis uses it as the credibility complement when company
experience is thin.
`,

  'Cowork/Sources/intact/annual-report.md': `---
Title: "Annual report and MD&A"
Author: "Intact Financial Corporation"
Publisher: "Intact Financial Corporation"
Type: "Public company disclosure"
Available from: "[intactfc.com](https://www.intactfc.com)"
---

> [!info] Sample entry
> Cowork does not carry the filings themselves. This page describes what a
> listed P&C carrier's annual disclosure contains and what an actuary takes out
> of it; read the figures from the report for the year you are citing.

A listed carrier's annual report is a *public* actuarial document in everything
but name. Because it is audited and filed, it is usable as a benchmark in a way
that a competitor's internal numbers never are.

## What an actuary reads it for

- **Combined ratio**, and its split between loss ratio and expense ratio, by
  segment. The peer point a company's own result is judged against.
- **Prior-year claims development**, in the claims-liability note. Whether a
  peer has been strengthening or releasing, and in which lines.
- **Catastrophe load**, usually discussed in the MD&A as the year's cat
  experience against an expected level.
- **Capital position** — the MCT or equivalent ratio, and the target the company
  says it manages to.
- **Reinsurance structure**, at the level of retention and programme changes.

## Cautions when citing it

- Segment definitions are the company's own and differ between carriers; a peer
  comparison compares the definitions first.
- MD&A measures are often non-GAAP and defined in the report's own glossary.
- A benchmark drawn from one carrier is one observation. Two carriers is a
  range; the range is the honest form of the statement.

## How it is used in a deliverable

A financial-reporting or capital deliverable uses it as the **peer benchmark**
row of its assumptions table, with the reporting year as the locator. A
reserving deliverable uses the development disclosure as external context for
its own selections — never as a substitute for them.
`,

  'Cowork/Sources/intact/quarterly-results.md': `---
Title: "Quarterly results and supplementary package"
Author: "Intact Financial Corporation"
Publisher: "Intact Financial Corporation"
Type: "Public company disclosure"
Available from: "[intactfc.com](https://www.intactfc.com)"
---

> [!info] Sample entry
> Cowork does not carry the filings themselves. This page describes the
> quarterly package and what is in it that the annual report aggregates away.

The quarterly package is where a peer's result becomes *timely*. An annual
report is a year old at the point a mid-year analysis needs it; the quarterly
supplement is at most a quarter old, and it carries segment detail at a grain
the annual report summarises.

## What the package adds over the annual report

- **Segment detail** by line and geography, quarter by quarter.
- **Development by accident year**, at a finer grain, in the supplementary
  tables.
- **Catastrophe experience for the quarter**, which is what makes a bad-weather
  quarter visible as a quarter rather than smoothed into a year.
- **Management commentary on trend**, which is the earliest public signal that a
  peer's view of severity has moved.

## How it is used in a deliverable

A pricing analysis run mid-year uses it as the **current-quarter market read**
supporting a trend selection. A report to management uses it to say what peers
have disclosed since the last board cycle. As with the annual report, the
assumption row names the quarter it was read from.
`,

  'Cowork/Sources/definity/annual-report.md': `---
Title: "Annual report and MD&A"
Author: "Definity Financial Corporation"
Publisher: "Definity Financial Corporation"
Type: "Public company disclosure"
Available from: "[definityfinancial.com](https://www.definityfinancial.com)"
---

> [!info] Sample entry
> Cowork does not carry the filings themselves. This page describes what the
> disclosure contains; read the figures from the report for the year you cite.

A second listed Canadian carrier's disclosure, read for the same items as any
other: combined ratio by segment, prior-year development, catastrophe
experience, capital position and reinsurance structure.

## Why a second carrier matters

One carrier's result is an observation; two make a **range**, and a range is
what an assumption can honestly be drawn from. A benchmark stated as a single
peer's number implies a precision the comparison does not have — different mix,
different geography, different reserving posture.

## How it is used in a deliverable

Paired with the first carrier's report in the assumptions table, so the
benchmark row reads as a range with both sources named. Where the two disagree
materially, that disagreement is itself a finding and belongs in the
deliverable's narrative rather than being averaged away.
`,

  'Cowork/Sources/canadian-underwriter/auto-reform-coverage.md': `---
Title: "Auto reform and market coverage"
Author: "Canadian Underwriter"
Publisher: "Canadian Underwriter"
Type: "Trade press"
Available from: "[canadianunderwriter.ca](https://www.canadianunderwriter.ca)"
---

> [!info] Sample entry
> Cowork does not carry the archive. This page describes what trade reporting is
> good for in a deliverable, and what it is not good for.

Trade press is not a technical source and should never be cited for a number. It
is cited for two things a technical source cannot supply: **when** something
became publicly known, and **who** said it.

## What it is legitimately used for

- **Dating a change.** A subsequent-events section needs the date a reform,
  ruling or announcement became known — and a dateline is evidence of that in a
  way a later technical paper is not.
- **Attribution.** Who announced it, and in what terms.
- **Direction of travel.** What the market is saying about severity, capacity or
  appetite, as context for an assumption that is selected on other grounds.

## What it must not be used for

- A loss figure, a trend or a development factor. If a number matters, cite the
  publisher of the number.
- A statement of what a regulation *requires*. Cite the regulation.

## How it is used in a deliverable

As the basis for a **key date** — the date a change became known — in the
assumptions table, and as supporting context in the external-environment section
of a report. A deliverable whose only support for a material assumption is trade
reporting has not been supported.
`,

  'Cowork/Sources/oliver-wyman/auto-benchmark-studies.md': `---
Title: "Auto benchmark and reform-costing studies"
Author: "Oliver Wyman"
Publisher: "Oliver Wyman"
Type: "Consulting research"
Available from: "[oliverwyman.com](https://www.oliverwyman.com)"
---

> [!info] Sample entry
> Cowork does not carry the studies. This page describes the class of work and
> how to cite it; take any figure from the study itself.

Consulting actuarial studies sit between an industry statistic and a company
analysis: they are technical, they are public, and they are prepared for a named
purpose that shapes what they measure.

## What they typically settle

- **Cost impact of a reform.** What a benefit change is expected to do to
  severity, and over what transition.
- **Industry benchmarks.** Development, trend and loss-ratio benchmarks derived
  from pooled data.
- **Method commentary.** The reasoning behind a selection, which is often the
  part a filing cites rather than the number.

## Cautions when citing them

- A study is prepared **for a client and a purpose**, stated in its scope
  section. The scope limits what the result supports — a costing done for one
  jurisdiction's reform is not a costing for another's.
- Reliances and limitations in the study travel with any figure taken from it;
  a deliverable citing the figure inherits them.
- A consulting benchmark is still someone else's data. It is a complement to
  company experience, weighted, not a replacement for it.

## How it is used in a deliverable

As the basis for a **reform cost impact** or **benchmark selection** row, with
the study and its scope named. Under CIA and ASB standards, relying on another
actuary's work is a disclosable reliance — so this citation belongs in the
documentation as well as in the analysis.
`,
  'Cowork/Sources/bank-of-canada/benchmark-bond-yields.md': `---
Title: "Government of Canada benchmark bond yields"
Author: "Bank of Canada"
Publisher: "Bank of Canada"
Type: "Published interest rate series"
Available from: "[bankofcanada.ca](https://www.bankofcanada.ca)"
---

> [!info] Sample entry
> Cowork does not carry the rate series. This page describes what they are so a
> valuation can be scoped against them; take every rate from the Bank's own
> published series at your valuation date.

The Bank publishes daily and monthly series for Government of Canada bond
yields, treasury bills and the policy rate. For an actuary they are the
**risk-free** half of a discount rate: the part that is observed rather than
selected, and therefore the part a reviewer will reproduce exactly or not at
all.

## What a valuation takes from it

- **A curve at a date.** Discounting is done on the term structure at the
  *valuation* date, not the reporting date and not an average of the year.
- **A term to match the liability.** A long-tail liability discounted on a
  short rate is a duration mismatch dressed up as a discount rate.
- **The illiquidity or spread adjustment's starting point.** What is added to
  the risk-free curve is a selection; what it is added *to* is not.

## Cautions when citing it

- Name the **series** and the **date**, not "the Bank of Canada rate". Several
  series would each be a defensible answer to that phrase and they do not agree.
- Series are revised and occasionally discontinued; a valuation repeated a year
  later on "the same series" may not be on the same series.
- A rate read from a news story is not a citation. The Bank publishes the
  numbers itself.

## How it is used in a deliverable

The discount-rate row of the assumptions register names the series and the
valuation date, and the selection built on top of it — the spread, the
illiquidity premium, the margin — is a **separate row** with its own basis. The
two are kept apart on purpose: one is observed and one is judged, and an auditor
will ask which is which.

Related: [[CIA Discount Rates]], [[CIA Duration]].
`,

  'Cowork/Sources/bank-of-canada/monetary-policy-report.md': `---
Title: "Monetary Policy Report"
Author: "Bank of Canada"
Publisher: "Bank of Canada"
Type: "Quarterly economic projection"
Available from: "[bankofcanada.ca](https://www.bankofcanada.ca)"
---

> [!info] Sample entry
> Cowork does not carry the reports. This page describes the series; cite the
> specific Report in force at the date of your analysis.

Four times a year the Bank publishes its projection for inflation, growth and
the risks around both. It is not an actuarial document and it says nothing
about insurance — which is exactly why it is useful. A severity trend argued
only from a company's own triangle is a circular argument; the Report is the
outside view it can be tested against.

## What an analysis takes from it

- **The inflation projection**, as the economy-wide backdrop a claims-severity
  trend is set against. Claims inflation is not CPI, but a selection far from it
  needs a reason.
- **The risks section**, which is a ready-made set of adverse scenarios for a
  stress test or an ORSA — authored by someone with no stake in the result.
- **The turning points.** A Report says when the Bank thinks a regime changed,
  which is what a trend period selection has to respect.

## Cautions when citing it

- It is a **projection**, superseded quarterly. Cite the Report and its date;
  "the Bank expects" with no date is not a citation.
- The projection is for the whole economy. Moving from it to a line of business
  is a judgment that belongs in the assumptions register as its own row.

## How it is used in a deliverable

A pricing analysis cites it as the **external basis** beside its own fitted
trend, so the selection is visibly a reconciliation of two views rather than an
extrapolation of one. A capital deliverable takes its adverse scenarios from
the risks section and says so.

Related: [[ASOP 13 - Trending Procedures in Property Casualty Insurance (ASB - 2009)]].
`,

  'Cowork/Sources/statistics-canada/consumer-price-index.md': `---
Title: "Consumer Price Index"
Author: "Statistics Canada"
Publisher: "Statistics Canada"
Type: "Published statistical series"
Available from: "[statcan.gc.ca](https://www.statcan.gc.ca)"
---

> [!info] Sample entry
> Cowork does not carry the series. This page describes what is in them so a
> trend selection can be scoped against them; take every index value from the
> published table.

The CPI is published for Canada and for each province, as an all-items index
and as a long list of components. The components are the part that matters:
an auto physical-damage severity trend has more to do with the parts,
maintenance and repair series than with all-items, and a bodily-injury trend
has more to do with wages and health care.

## What a trend selection takes from it

- **A component series** that resembles the cost being claimed, rather than the
  headline index.
- **A province**, where the book is provincial and the index is published that
  way.
- **A measurement period** with a stated start and end, so the annualised change
  can be recomputed by anyone.

## Cautions when citing it

- **CPI is not claims inflation.** It measures the price of a consumer's basket,
  not the cost of indemnifying a loss; social inflation, utilisation and
  severity mix are not in it at all.
- Basket weights are updated and series are rebased. A long history spliced
  across a rebasing is a new series, and saying so is part of the citation.
- Seasonally adjusted and unadjusted series answer different questions. Pick one
  and name it.

## How it is used in a deliverable

The trend row of the assumptions register names the **series, the geography and
the period**, and the selected trend sits beside it as a separate, judged row.
Where the selection departs from the index, the departure is the assumption —
so it is the departure that carries the explanation, not the index.

Related: [[ASOP 13 - Trending Procedures in Property Casualty Insurance (ASB - 2009)]], [[Basic Ratemaking (Werner - 2016)]].
`,

  'Cowork/Sources/statistics-canada/life-tables.md': `---
Title: "Life tables, Canada, provinces and territories"
Author: "Statistics Canada"
Publisher: "Statistics Canada"
Type: "Published statistical series"
Available from: "[statcan.gc.ca](https://www.statcan.gc.ca)"
---

> [!info] Sample entry
> Cowork does not carry the tables. This page describes them so a mortality
> basis can be scoped against them; take every rate from the published table.

Statistics Canada publishes complete and abridged life tables by jurisdiction,
age and sex, built from registered deaths and population estimates. They are
**population** mortality, which makes them the wrong table for an insured book
and the right table to measure one against.

## What a valuation takes from it

- **A base level** for a population an insured group is drawn from, before any
  selection or underwriting effect.
- **A geographic split**, where a plan or a block is concentrated in one
  province.
- **A denominator for a relative measure** — an insured table expressed as a
  ratio to population mortality travels better across years than one quoted in
  absolute rates.

## Cautions when citing it

- Insured lives are not the general population. Underwriting selection, income
  and occupation all move mortality, and the gap is the assumption.
- The tables are a **reference period**, not a projection. Improvement is a
  separate selection with its own basis.
- Small jurisdictions are published as abridged tables with wide age bands;
  precision claimed past the band is precision that is not there.

## How it is used in a deliverable

A life or pensions deliverable carries two rows where an outsider would expect
one: the **population basis** (this table, named by jurisdiction, sex and
reference period) and the **insured adjustment** applied to it. Keeping them
apart is what lets a reviewer re-derive the first and argue only about the
second.

Related: [[Life Contingencies (Struppeck - 2014)]], [[CIA Valuation]].
`,

  'Cowork/Sources/amf/capital-adequacy-guideline.md': `---
Title: "Capital adequacy requirements guideline — damage insurance"
Author: "Autorité des marchés financiers"
Publisher: "AMF"
Type: "Regulatory capital guideline"
Available from: "[lautorite.qc.ca](https://lautorite.qc.ca)"
---

> [!info] Sample entry
> Cowork does not carry the guideline. This page describes what it settles so a
> capital deliverable can be scoped against it; cite the edition in force at
> your reporting date.

An insurer chartered in Québec is capitalised under the AMF's own guideline
rather than OSFI's MCT. The two are close relatives and they are not the same
document: the capital required of a group that writes on both charters is
computed twice, under two sets of factors, against two targets.

## What a capital deliverable takes from it

- **The capital basis** — which test the ratio in the deliverable is a ratio
  *of*. This is the row that most often goes unstated and most often causes the
  confusion.
- **The target**, and the distance the company runs above it.
- **The risk components** and their factors: insurance risk, market risk, credit
  risk and the diversification credit between them.

## Cautions when citing it

- Never carry an MCT figure into an AMF discussion, or the reverse, without
  saying which test produced it. A ratio with no test named is not a number.
- The guideline is reissued; the edition and its effective date are part of the
  citation.
- The French text governs. A translated phrase quoted as though it were the
  guideline's own wording is a paraphrase.

## How it is used in a deliverable

The capital row of the assumptions register names the **test, the edition and
the target**, and a group deliverable carries one such row per charter rather
than a blended figure. An ORSA written for a Québec entity reconciles its
internal target to this guideline, not to the MCT.

Related: [[OSFI MCT]], [[OSFI Target Capital]].
`,

  'Cowork/Sources/amf/sound-commercial-practices.md': `---
Title: "Sound commercial practices guideline"
Author: "Autorité des marchés financiers"
Publisher: "AMF"
Type: "Regulatory guideline"
Available from: "[lautorite.qc.ca](https://lautorite.qc.ca)"
---

> [!info] Sample entry
> Cowork does not carry the guideline. This page describes what it covers; cite
> the edition in force at the date of the work.

The AMF's expectations for how an insurer treats its clients — product design,
distribution, disclosure, claims handling and complaint resolution — expressed
as outcomes the institution is answerable for rather than as procedures.

## What it settles for an actuary

- **Fair treatment as a design constraint.** A rating structure that is
  technically supportable can still fail a conduct expectation; the guideline is
  where that boundary is written down.
- **Product oversight.** Who owns the question of whether a product still does
  what it was sold to do, and on what cycle it is reviewed.
- **The paper trail.** What the institution is expected to be able to show,
  which is what a pricing file has to contain rather than merely conclude.

## How it is used in a deliverable

A pricing or product deliverable for a Québec entity carries a conduct row in
its assumptions naming this guideline as the basis for a constraint — a rating
variable not used, a cap applied at renewal, a disclosure the filing commits
to. The row exists so the constraint is visibly a requirement rather than a
preference.

Related: [[IBC Code of Conduct]], [[FSRA Risk Management]].
`,

  'Cowork/Sources/airb/rate-filing-guidelines.md': `---
Title: "Automobile insurance rate filing guidelines"
Author: "Automobile Insurance Rate Board"
Publisher: "AIRB"
Type: "Filing guidelines"
Available from: "[airbfordrivers.ca](https://www.airbfordrivers.ca)"
---

> [!info] Sample entry
> Cowork does not carry the guidelines. This page describes what they govern so
> a filing can be scoped against them; cite the version in force at your filing
> date.

Alberta private passenger automobile rates are approved by the AIRB, and its
guidelines say which filing path a change may take and what the filing has to
carry. As in Ontario, the governing version is the one in force **at the filing
date**, not the date the indication was run.

## What a filing takes from it

- **The filing path.** Which route a change qualifies for, and the review that
  comes with it.
- **The required exhibits.** Indication, trend, development, expense and
  classification support, in the form the Board expects to receive them.
- **Where a benchmark is expected** rather than a company selection — normally
  trend, and often development for a company whose volume will not support its
  own.
- **The rate cap or constraint in force**, where one applies, which is a
  constraint on the filed change rather than on the indication.

## How it is used in a deliverable

The filing memorandum cites the guideline version as the basis for the **filing
path** row, and the indication carries the benchmark rows separately from the
company-selected ones. Where a constraint binds, the deliverable shows the
indicated change and the filed change as two figures, because they are two
figures.

Related: [[Basic Ratemaking (Werner - 2016)]], [[Alberta Auto Reform]].
`,

  'Cowork/Sources/airb/annual-review.md': `---
Title: "Annual review of automobile insurance premiums"
Author: "Automobile Insurance Rate Board"
Publisher: "AIRB"
Type: "Regulatory review report"
Available from: "[airbfordrivers.ca](https://www.airbfordrivers.ca)"
---

> [!info] Sample entry
> Cowork does not carry the reviews. This page describes the series; cite the
> specific review you rely on, by year.

Each year the Board publishes its own read on Alberta automobile experience —
where loss costs have moved, what the industry's results look like, and how
premiums for benchmark driver profiles compare across companies. It is a
regulator's published view, which makes it both a benchmark and a statement of
what the regulator will find persuasive.

## What an analysis takes from it

- **Industry loss trend** by coverage, as the outside view a company selection
  is reconciled to.
- **Benchmark premium profiles**, which show where a company's rates sit in the
  market without needing a competitor's manual.
- **The Board's stated concerns**, which is a preview of the questions a filing
  will have to answer.

## Cautions when citing it

- The review is retrospective and annual; an indication run mid-year is working
  from a stale industry picture and should say so.
- Benchmark profiles are illustrative drivers, not the company's mix. A rank
  against them is not a rank against the market.

## How it is used in a deliverable

A filing cites the review as the **industry basis** row beside the company's own
fitted trend, so the selection reads as a reconciliation. A market-position
section cites the benchmark profiles rather than asserting where the company
sits.

Related: [[Alberta Auto Reform]], [[Basic Ratemaking (Werner - 2016)]].
`,

  'Cowork/Sources/ccir/annual-statement-market-conduct.md': `---
Title: "Annual Statement on Market Conduct"
Author: "Canadian Council of Insurance Regulators"
Publisher: "CCIR"
Type: "Harmonised regulatory return"
Available from: "[ccir-ccrra.org](https://www.ccir-ccrra.org)"
---

> [!info] Sample entry
> Cowork does not carry the Statement or its reporting guide. This page
> describes the return; cite the guide in force for the reporting year.

CCIR exists so that an insurer writing in ten provinces files one thing rather
than ten. The Annual Statement on Market Conduct is the clearest case: a single
harmonised return on distribution, complaints, claims handling and the fair
treatment of customers, collected once and shared among the regulators.

## What it carries

- **Complaints and claims data**, on definitions set by the return rather than
  by the company.
- **Distribution information** — channels, intermediaries, and the oversight
  over them.
- **Fair-treatment governance**, evidencing the outcomes the conduct guidance
  expects.

## Cautions when citing it

- The return's **definitions** govern. A complaint count computed on an internal
  definition and reported on the return's are two different numbers, and mixing
  them in one deliverable makes the trend meaningless.
- The reporting guide changes between years; a multi-year comparison is a
  comparison of guides as much as of results.

## How it is used in a deliverable

A conduct or governance deliverable takes its counts from the filed Statement
rather than from the operational system, and names the reporting year and guide
as the basis — so the figure in the deliverable is the figure the regulator
already has.

Related: [[CCIR Instructions]], [[IBC Code of Conduct]].
`,

  'Cowork/Sources/soa/experience-studies.md': `---
Title: "Experience studies and mortality tables"
Author: "Society of Actuaries"
Publisher: "Society of Actuaries"
Type: "Research and table series"
Available from: "[soa.org](https://www.soa.org)"
---

> [!info] Sample entry
> Cowork does not carry the studies or the tables. This page describes the
> series so an assumption can be scoped against it; cite the specific study and
> table you use.

The SOA collects industry experience and publishes it as studies and as
tables — mortality, lapse, morbidity, retirement — with the contributing basis
documented. For a life or pensions deliverable this is where a base assumption
comes from when the block's own experience will not support one.

## What an assumption takes from it

- **A base table**, named exactly: the table, its variant, and the ages and
  durations it covers.
- **An improvement scale**, which is a separate selection with a separate
  source and does not travel automatically with the table.
- **The credibility question**, answered explicitly: how much of the assumption
  is the block's own experience and how much is the table.

## Cautions when citing it

- A study describes the **contributing companies**, not the industry. Whether
  that population resembles the block is the assumption, not a detail.
- Tables are superseded, and a superseded table is sometimes still the right one
  for a contract written under it. The reason for the choice belongs in the row.
- A table quoted without its improvement basis is half an assumption.

## How it is used in a deliverable

The mortality row of the assumptions register names the table; the improvement
row names the scale; the credibility row says how the two were blended with own
experience. Three rows, because a reviewer will want to move one without moving
the others.

Related: [[Risk and Insurance (SOA)]], [[CIA Valuation]].
`,

  'Cowork/Sources/catiq/insured-loss-estimates.md': `---
Title: "Insured catastrophe loss estimates"
Author: "Catastrophe Indices and Quantification Inc."
Publisher: "CatIQ"
Type: "Event loss data service"
Available from: "[catiq.com](https://www.catiq.com)"
---

> [!info] Sample entry
> Cowork does not carry the loss data. This page describes it so a catastrophe
> assumption can be scoped against it; take every figure from CatIQ's own
> release for the event.

CatIQ estimates insured losses for Canadian catastrophe events and publishes
them against a stated threshold and peril attribution. Most figures quoted as
"the industry loss" from a Canadian storm trace back here, including the ones
reported by the industry association and the trade press.

## What a catastrophe assumption takes from it

- **An event definition.** What counts as one event, what the qualifying
  threshold is, and where a multi-day system is cut — the answers determine the
  frequency in any frequency-severity view.
- **Per-event insured loss**, on a consistent basis across events, which is what
  makes a historical series a series rather than a list.
- **Peril and geography attribution**, so a load can be built for the exposure
  actually written rather than for the country.

## Cautions when citing it

- Estimates are **revised** as claims develop. The citation carries the release
  date, not only the event date.
- Industry loss is not company loss. Moving from one to the other is a market
  share and mix judgment, and it is its own assumption row.
- Losses are nominal at the date of the event; a historical series used for a
  load has to be trended and re-exposed first, and both are selections.

## How it is used in a deliverable

The catastrophe row of the assumptions register names the **event series and
its threshold**; the load built from it is a separate row naming the trending
and re-exposure applied. A capital deliverable uses the same series as the
empirical check on a model's return periods.

Related: [[OSFI Earthquake]], [[GOC Flood Risks]].
`,

  'Cowork/Sources/catiq/annual-loss-review.md': `---
Title: "Annual catastrophe loss review"
Author: "Catastrophe Indices and Quantification Inc."
Publisher: "CatIQ"
Type: "Annual review"
Available from: "[catiq.com](https://www.catiq.com)"
---

> [!info] Sample entry
> Cowork does not carry the reviews. This page describes the series; cite the
> review for the year you rely on.

The year's qualifying events gathered into one place, with the annual insured
total and the commentary that says what drove it. It is the document a
catastrophe load is usually *argued* from, where the event releases are what it
is *computed* from.

## What it settles

- **The annual total**, on the same definition as the individual events, which
  is what makes a year-over-year comparison legitimate.
- **The composition** — which perils and which regions carried the year, which
  is what tells you whether a bad year is evidence about your book.
- **Context against prior years**, as published rather than as recalled.

## Cautions when citing it

- A single year is one observation of a heavy-tailed variable. A load set from
  the most recent review is a load set from noise.
- Growth in insured losses mixes hazard, exposure and inflation. Attribution
  among the three is the interesting question and the review does not settle it.

## How it is used in a deliverable

An external-environment or ORSA section cites the review for context, and the
catastrophe load itself cites the underlying event series. Keeping them apart
prevents the most common failure here — a narrative sentence about a record
year quietly becoming the basis for a number.

Related: [[OSFI Earthquake]], [[OSFI Stress Testing]].
`,

  'Cowork/Sources/facility-association/residual-market-rate-filings.md': `---
Title: "Residual market rate filings"
Author: "Facility Association"
Publisher: "Facility Association"
Type: "Rate filing series"
Available from: "[facilityassociation.com](https://www.facilityassociation.com)"
---

> [!info] Sample entry
> Cowork does not carry the filings. This page describes the series so an
> analysis can be scoped against it; cite the filing for the jurisdiction and
> date you rely on.

Facility Association files rates, by jurisdiction, for the automobile risks the
voluntary market declines. Its rate level matters to a company that writes none
of that business: the residual market is the alternative a declined risk has, so
where FA sits relative to the voluntary market is one of the forces moving who
shops, who stays and who ends up where.

## What an analysis takes from it

- **The residual market rate level** for the jurisdiction, and the indicated
  change behind it.
- **Territory and class definitions**, which are not always the company's and
  have to be mapped before a comparison means anything.
- **Take-all-comers context.** FA's experience is the experience of risks
  selected *against*, which is the closest published thing to an
  adverse-selection benchmark.

## Cautions when citing it

- FA's mix is unlike any voluntary book. Its loss ratios are not a benchmark for
  one, and using them as such imports the selection.
- Rates and rules are jurisdiction-specific; FA does not operate in every
  province.

## How it is used in a deliverable

A pricing deliverable cites the residual market rate level in its market-context
section and, where relevant, as the basis for a **migration** assumption — the
expectation that a rate change pushes business toward or away from the residual
market. A reserving deliverable for a member cites its share of the FARM as an
exposure it carries without writing.

Related: [[Basic Ratemaking (Werner - 2016)]], [[Ontario Reg. 664]].
`,

  'Cowork/Sources/facility-association/member-bulletins.md': `---
Title: "Member and broker bulletins"
Author: "Facility Association"
Publisher: "Facility Association"
Type: "Bulletin series"
Available from: "[facilityassociation.com](https://www.facilityassociation.com)"
---

> [!info] Sample entry
> Cowork does not carry the bulletin archive. This page describes the series;
> cite the bulletin in force at the date of the work.

FA issues bulletins that change eligibility, rules, forms and servicing
arrangements in the residual market. They supersede one another, so the one that
governs is the one in force at the date of the transaction — the same discipline
a regulator's bulletin series demands.

## What they settle

- **Eligibility.** Which risks the residual market takes, which is the other
  half of what a company's underwriting appetite means in practice.
- **Rules and endorsements** applying to residual market policies.
- **Servicing carrier arrangements**, which decide who administers the business
  a member is nonetheless sharing in.

## How it is used in a deliverable

An underwriting or product deliverable cites the governing bulletin as the basis
for an eligibility row — what happens to a risk the company declines. A member's
financial deliverable cites the servicing and participation rules behind its
share of residual market results.

Related: [[Ontario Reg. 664]], [[IBC Code of Conduct]].
`,

  'Cowork/Sources/msa-research/msa-researcher.md': `---
Title: "MSA Researcher — Canadian insurer financial database"
Author: "Market-Security Analysis & Research Inc."
Publisher: "MSA Research"
Type: "Financial database"
Available from: "[msaresearch.com](https://www.msaresearch.com)"
---

> [!info] Sample entry
> Cowork does not carry the database. This page describes it so a benchmarking
> exercise can be scoped against it; take every figure from MSA directly.

MSA compiles the financial returns Canadian insurers file into one database,
company by company and in aggregate, with the ratios computed on consistent
definitions. It is the practical answer to "how did we do against the market",
because the alternative — reading every competitor's return — is the same work
done worse.

## What a benchmarking exercise takes from it

- **A peer group**, defined explicitly: which companies, on what basis, over
  what period. The definition is the assumption; the ratio is the output.
- **Industry aggregates** for loss, expense and combined ratios, and for
  reserve development.
- **A consistent history**, which is what makes a company's movement separable
  from the market's.

## Cautions when citing it

- Ratio definitions are MSA's. A company's internally reported combined ratio
  and its MSA combined ratio are both correct and are not the same number;
  [[MSA Legend]] is the document that settles which is which.
- The data are **filed** figures. Restatements and late filings mean a
  comparison drawn at one date may not reproduce at another.
- A peer group chosen after seeing the answer is not a benchmark.

## How it is used in a deliverable

A financial-reporting or advisory deliverable carries the **peer group
definition** and the **ratio definition** as their own assumption rows, with the
benchmark figures beside them. Naming both is what lets a reader disagree with
the comparison without having to re-derive it.

Related: [[MSA Legend]], [[CCIR Instructions]].
`,

}
