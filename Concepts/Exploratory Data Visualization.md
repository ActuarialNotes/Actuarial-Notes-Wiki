---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:5c1442a060b2de8218a3fc05b54f991326821d210806e9037550546f533c9951
  sources:
    - "Wickham, Çetinkaya-Rundel & Grolemund, R for Data Science (2e), Ch.11 Communication, §11.1: exploratory plots — variables known before looking, made for a purpose, looked at quickly, tens or hundreds per analysis mostly thrown away; communication plots for an audience without the background, made self-explanatory, sha256:0756a2408a456cd5dc71f64d18a17f636dd57cfea2a817568f38689421eab088 — https://r4ds.hadley.nz/communication.html"
    - "Wickham, Çetinkaya-Rundel & Grolemund, R for Data Science (2e), Ch.1 'Data visualization', §1.4.1-1.4.2 bar chart / histogram / density; §1.5.1-1.5.3 side-by-side box plots, stacked bar plots (position = \"fill\" for relative frequency), scatterplots; §1.5.4 extra aesthetics clutter, facets, sha256:871721caf69ea711517d9a4f0f627806da4200f6f7fd0068aa89530943339ad4 — https://r4ds.hadley.nz/data-visualize.html"
    - "Wickham, Çetinkaya-Rundel & Grolemund, R for Data Science (2e), Ch.10 'Exploratory data analysis', §10.3.1-10.3.2 typical/rare/unusual values, clusters, zero-coded missing, coord_cartesian zoom, repeat with and without outliers; §10.5.1 density when group sizes differ; §10.5.2 geom_tile counts; §10.5.3 overplotting: alpha, geom_bin2d/geom_hex, cut_width boxplots; §10.6 pattern questions, sha256:ab13c323616810e786eb9f6298ed5d4b9bc50d1cebfb753d2725f91684553432 — https://r4ds.hadley.nz/EDA.html"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Exploratory Data Visualization.md
---

**Exploratory Data Visualization** is the use of quick plots, made by an analyst for their own understanding, to see how each variable is distributed and how variables relate to one another, to find unusual values and data problems, and to raise the next question. It is the graphical core of [[Exploratory Data Analysis]].

It differs from a [[Presentation Visualization|presentation graphic]], which is polished so that an audience can understand a finding the analyst already has:

| | Exploratory plot | Presentation graphic |
| :--- | :--- | :--- |
| Audience | The analyst | People without the analyst's background |
| Purpose | Find out what the data show | Explain a finding already made |
| Effort | Made quickly, looked at briefly | Labels, annotations, scales and themes chosen for the reader |
| Number made | Tens or hundreds, most thrown away | Chosen for the message |

When making an exploratory plot, the analyst knows before looking which variables it will show, makes it for a purpose, looks at it quickly and moves on. An analysis produces tens or hundreds of them, and most are thrown away. A presentation graphic is made for an audience that does not share the analyst's background, so effort goes into making it self-explanatory. An answer that adds titles, annotation and a narrative to an exploratory plot describes a presentation graphic.

## Choosing the plot

The [[Data Types|type]] of each variable decides the starting plot. A categorical variable takes one of a small set of values. A numerical one takes a wide range of values that can sensibly be added or averaged.

| Variables | Starting plot |
| :--- | :--- |
| One categorical | Bar chart |
| One numerical | [[Histogram]] or density |
| Two categorical | Stacked bar chart, or a heat map of counts |
| One categorical, one numerical | Side-by-side box plots, one [[Box Plot]] per category |
| Two numerical | [[Scatter Plot]] |

A third variable is added by colour or shape, or by **faceting** into one small plot per level ([[Types of Plots]]).

> [!example]- Which plot would the analyst make first to answer each of these questions about a homeowners claim file? {Example}
> An analyst starts exploring a file of 200,000 homeowners claims with these columns: `severity` (paid amount), `roof_type` (asphalt, tile, metal, wood), `construction` (frame, masonry), `coverage_a` (the dwelling limit) and `report_month`.
>
> 1. How is claim severity distributed?
> 2. Which roof types are common, and which are rare?
> 3. Does severity differ by roof type?
> 4. Does severity rise with the dwelling limit?
> 5. How do roof type and construction occur together?
>
> > [!answer]-
> > 1. A **histogram** of `severity`, trying several bin widths, and of its logarithm if the histogram shows a long right tail.
> > 2. A **bar chart** of `roof_type`, with the bars ordered by frequency, which shows thin levels before they reach a model.
> > 3. **Side-by-side box plots** of `severity`, one per roof type, which compare medians, spread and outliers compactly.
> > 4. A **scatter plot** of `severity` against `coverage_a`. With 200,000 points it will overplot, so use transparency or hexagonal bins.
> > 5. A **heat map** of counts (a tile for each roof and construction pair, coloured by count) or a stacked bar chart.
> >
> > None of these needs a title or careful styling. Each answers one question for the analyst, and the next plot depends on what it shows.

## Variation within a variable

Look for the typical values (which are most common, which are rare, and whether that matches expectations), for clusters that suggest subgroups, and for unusual values. A value that cannot be true, such as a zero square footage, is often a missing value coded as zero ([[Missing Data]]).

An [[Outlier|outlier]] is an individual unusual value. It may be a data entry error, a genuine extreme, or a discovery. An extreme claim may be real, so repeat the analysis with and without it, and drop it only with a reason that is disclosed.

A [[Histogram|histogram]]'s bin width can hide a shape or invent one, so try several. Zooming in on the axis shows rare values that the tallest bars dwarf.

## Covariation between variables

A pattern in a two-variable plot is a clue to a relationship. Ask whether it could be chance, how strong it is, what other variable might explain it, and whether it holds within subgroups.

## Comparing groups of different sizes

When groups differ greatly in size, plotting counts compares sizes rather than shapes. A taller bar in a count chart says the group is bigger, not that its mix is different. Plot densities, whose area is one in every group, or proportions, as in a stacked bar chart scaled so that every bar is the same height.

> [!example]- Does this insurer's agency channel write a larger share of tier A business? {Example}
> A stacked bar chart of policy counts by channel shows the agency bar taller in every credit tier:
>
> | Channel | Tier A | Tier B | Tier C | Total |
> | :--- | ---: | ---: | ---: | ---: |
> | Agency | 12,000 | 12,000 | 6,000 | 30,000 |
> | Direct | 6,000 | 3,000 | 1,000 | 10,000 |
>
> > [!answer]-
> > - Compare proportions within each channel, which is what a stacked bar chart scaled to equal heights shows.
> > - The agency share in tier A is $12{,}000/30{,}000 = 40\%$.
> > - The direct share in tier A is $6{,}000/10{,}000 = 60\%$.
> > - No. The agency channel has more tier A policies only because it is three times as large.
> > - The direct channel's mix is 60% A, 30% B and 10% C, against 40%, 40% and 20% for agency, so direct business is weighted toward the better tier.

## Overplotting in large data

A [[Scatter Plot|scatter plot]] of hundreds of thousands of points overplots into a solid mass. Transparency, binning in two dimensions (rectangular or hexagonal bins coloured by count), or binning one variable and drawing a [[Box Plot|box plot]] for each bin restore the view.

> [!trap] Treating a pattern as a conclusion
> A relationship seen in a plot may be chance or driven by a third variable. Check it within subgroups before acting on it.
