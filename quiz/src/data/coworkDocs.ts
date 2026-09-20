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
}
