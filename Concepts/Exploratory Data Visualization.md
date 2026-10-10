---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:851141db3629c3f3cba49df8aeb392ed3995e7205027bf6bc5f62201dd141ac7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Exploratory Data Visualization.md
---

**Exploratory Data Visualization** is the use of quick plots, made by an analyst for their own understanding, to see how each variable is distributed and how variables relate to one another, to find unusual values and data problems, and to raise the next question. It is the graphical core of [[Exploratory Data Analysis]], and it differs from a [[Presentation Visualization|presentation graphic]], which is polished so that an audience can understand a finding the analyst already has.

> $$\text{plot}(X) = \begin{cases} \text{bar chart} & X \text{ categorical} \\ \text{histogram or density} & X \text{ numerical} \end{cases}$$

> $$\text{plot}(X, Y) = \begin{cases} \text{stacked bar chart} & \text{both categorical} \\ \text{side-by-side box plots} & \text{one of each} \\ \text{scatter plot} & \text{both numerical} \end{cases}$$

- **Symbols:** $X$ and $Y$ are variables of the data set, and the [[Data Types|type]] of each decides the starting plot. A categorical variable takes one of a small set of values; a numerical one takes a wide range of values that can sensibly be added or averaged. A third variable is added by colour or shape, or by **faceting** into one small plot per level ([[Types of Plots]]).
- **Exploratory versus presentation:** When making an exploratory plot, the analyst knows before looking which variables it will show, makes it for a purpose, looks at it quickly and moves on; an analysis produces tens or hundreds of them, and most are thrown away. A presentation graphic is made for an audience that does not share the analyst's background, so effort goes into making it self-explanatory: labels, annotations, scales and themes chosen for the reader.
- **Variation within a variable:** Look for the typical values (which are most common, which are rare, and whether that matches expectations), for clusters that suggest subgroups, and for unusual values. An outlier may be a data entry error, a genuine extreme, or a discovery; a value that cannot be true, such as a zero square footage, is often a missing value coded as zero ([[Missing Data]], [[Outlier]]).
- **Covariation between variables:** A pattern in a two-variable plot is a clue to a relationship. Ask whether it could be chance, how strong it is, what other variable might explain it, and whether it holds within subgroups.
- **Making comparisons fair:** When groups differ greatly in size, plotting counts compares sizes rather than shapes. Plot densities, whose area is one in every group, or proportions, as in a stacked bar chart scaled so that every bar is the same height.
- **Large data:** A [[Scatter Plot|scatter plot]] of hundreds of thousands of points overplots into a solid mass. Transparency, binning in two dimensions (rectangular or hexagonal bins coloured by count), or binning one variable and drawing a [[Box Plot|box plot]] for each bin restore the view.
- **Settings change the picture:** A [[Histogram|histogram]]'s bin width can hide a shape or invent one, so try several. Zooming in on the axis shows rare values that the tallest bars dwarf.

> [!example]- Choosing the First Plots for a Homeowners Claim File {Example}
> An analyst starts exploring a file of 200,000 homeowners claims with these columns: `severity` (paid amount), `roof_type` (asphalt, tile, metal, wood), `construction` (frame, masonry), `coverage_a` (the dwelling limit) and `report_month`. Which plot would she make first to answer each question?
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
> > None of these needs a title or careful styling: each answers one question for the analyst, and the next plot depends on what it shows.

> [!example]- Counts Versus Proportions {Example}
> An insurer's agency channel has 30,000 policies, of which 12,000 are in credit tier A, 12,000 in tier B and 6,000 in tier C. Its direct channel has 10,000 policies: 6,000 in A, 3,000 in B and 1,000 in C. A stacked bar chart of counts by channel shows the agency bar taller in every tier. Does the agency channel write a larger share of tier A business?
>
> > [!answer]-
> > Compare proportions within each channel, which is what a stacked bar chart scaled to equal heights shows.
> > $$
> > \begin{align*}
> > \text{Agency share in A} &= \frac{12{,}000}{30{,}000} \\
> > &= 40\% \\
> > \text{Direct share in A} &= \frac{6{,}000}{10{,}000} \\
> > &= 60\%
> > \end{align*}
> > $$
> > No. The agency channel has more tier A policies only because it is three times as large. The direct channel's mix is 60% A, 30% B and 10% C, against 40%, 40% and 20% for agency, so direct business is weighted toward the better tier. The count chart answers "which channel is bigger"; the proportion chart answers the question asked.

> [!tip]- How it appears on the exam
> - **DISC-DA** covers the fundamentals of exploratory data visualizations in its topic on analyzing data with visualizations, between data exploration fundamentals and creating plots, and its next topic turns to presentation visualizations. Application questions describe a data set and a question and ask which plot fits, or describe what a plot shows and ask what to conclude or check next.
> - Expect contrasts between an exploratory plot and a presentation graphic (purpose, audience, polish), and scenarios where the plot misleads: groups of very different size plotted as counts, an overplotted scatter, or a bin width that hides a shape.

> [!warning]- Exam traps
> - **Exploratory graphics are not for the audience:** An answer that adds titles, annotation and a narrative to an exploratory plot describes a presentation graphic. The exploratory plot's job is to inform the analyst quickly.
> - **Count is not share:** A taller bar in a count chart says the group is bigger, not that its mix is different. Compare within-group proportions or densities.
> - **A pattern is a clue, not a conclusion:** A relationship seen in a plot may be chance or driven by a third variable. Check it within subgroups before acting on it.
> - **Outliers are investigated, not deleted:** An extreme claim may be real. Repeat the analysis with and without it, and drop it only with a reason that is disclosed.
