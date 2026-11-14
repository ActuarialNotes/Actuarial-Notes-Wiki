---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:15b76247ba5d858030e6e36fe0ffcd8ce26093a6c91e99d5e8850488711d5726
  sources:
    - "Wickham, Çetinkaya-Rundel & Grolemund, R for Data Science (2e), Ch.1 'Data visualization', §1.4.1 bar chart, reorder by frequency; §1.4.2 histogram (equally spaced bins; binwidth too narrow/too wide), density plot (modes, skewness, fewer details); §1.5.1 box plot anatomy (IQR 25th-75th, median, points beyond 1.5 IQR, whisker to farthest non-outlier); §1.5.2 stacked/filled bars; §1.5.3 scatterplot, sha256:871721caf69ea711517d9a4f0f627806da4200f6f7fd0068aa89530943339ad4 — https://r4ds.hadley.nz/data-visualize.html"
    - "Wickham, Çetinkaya-Rundel & Grolemund, R for Data Science (2e), Ch.10 'Exploratory data analysis', §10.5.1 density = count standardized so the area is one; boxplots compact with less information; fct_reorder by median; §10.5.2 geom_tile; §10.5.3 overplotting, geom_bin2d/geom_hex, sha256:ab13c323616810e786eb9f6298ed5d4b9bc50d1cebfb753d2725f91684553432 — https://r4ds.hadley.nz/EDA.html"
    - "Wickham, Çetinkaya-Rundel & Grolemund, R for Data Science (2e), Ch.9 Layers, §9.4 facet_wrap/facet_grid; facets share scales by default, free scales show within-facet detail, sha256:da70e620cf22ecb2faa7a31e0fd7b9be8e7621ecbcacabf0db7169c462bb19c3 — https://r4ds.hadley.nz/layers.html"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.25 Run-Sequence Plot: y(i) vs i; shifts in location and scale; outliers, sha256:3de6be786eb2ab529c8fa7c5e2c9c70501478bfdbf2cd7c735673b179f0b0e26 — https://www.itl.nist.gov/div898/handbook/eda/section3/runseqpl.htm"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.14 Histogram (count and relative/density normalisation), sha256:8505d865ba5c787e3179e903ad98276d05386fab18449eb3b554d12b271b58d5 — https://www.itl.nist.gov/div898/handbook/eda/section3/histogra.htm"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Types of Plots.md
---
**Types of Plots** are the standard graphics an analyst chooses among when creating a plot, each built to show one kind of pattern for variables of particular [[Data Types|types]]. Choosing well means matching the plot to the number and type of variables and to the question being asked.

| Plot | Variables | What it shows |
| :--- | :--- | :--- |
| Bar chart | One categorical | Count of observations at each level |
| Histogram | One numerical | Shape of the distribution, by counts in equal-width bins |
| Density plot | One numerical | A smoothed histogram: modes and skewness, with less detail |
| Box plot | Numerical by categorical | Median, quartiles and outliers, one box per level |
| Stacked bar chart | Two categorical | Counts, or proportions, of one variable within each level of the other |
| Heat map | Two categorical | A tile for each pair of levels, coloured by a count or an average |
| Scatter plot | Two numerical | Each observation as a point: direction, form and strength of a relationship |
| Line chart | Numerical over time | Values in time order: shifts in level or spread, and outliers |

Faceting splits any of them by a further variable.

> [!example]- Which plot shows whether monthly claim counts changed after a new claims system went live? {Example}
> - The question is about time, so the plot must keep the months in order.
> - A line chart of monthly claim counts, with time on the horizontal axis, shows a shift in level or spread at the month it happens.
> - A histogram or a box plot of the counts summarizes their distribution and loses the time order, so neither can show when a shift occurred.
> - A scatter plot of claim counts against another variable shows their relationship, not change over time.
> - The line chart is the plot to use.

## Bar chart

A bar chart's bar height is the number of observations at each level of a categorical variable. For a nominal variable, ordering the bars by frequency makes the common and rare levels easier to read. An ordinal variable keeps its natural order. A bar chart of counts per category says nothing about the distribution of a numerical variable such as severity.

## Histogram and density plot

A [[Histogram|histogram]] divides the axis of one numerical variable into equally spaced bins and draws a bar over each. Its bars stand on adjacent intervals of the axis and their width is a choice, while a bar chart counts the levels of a categorical variable. For $n$ observations in bins of equal width $w$, the height of bin $j$ on the density scale is

> $$\text{density height}_j = \frac{n_j}{n \, w}$$

- $n_j$ is the count in bin $j$.

The area of a bar, its height times $w$, is the proportion of observations in the bin, and the bars have total area one. That is what lets histograms or density curves of groups of different sizes be compared. To count observations in a range of several bins, sum their areas and multiply by $n$.

The picture depends on the bin width. Too narrow gives a jagged comb, too wide hides the shape in a few bars, and several widths should be tried. A density plot is a smoothed version, easier for judging modes and skewness, and several groups' densities can be overlaid with transparency to compare their shapes. A single histogram of pooled data shows the overall distribution and hides differences between groups.

> [!example]- How many bars do bin widths of \$100, \$2,000 and \$30,000 give, and what is the first \$2,000 bin's density height? {Example}
> A histogram of 5,000 claim severities covers \$0 to \$60,000. With \$2,000 bins, the first bin holds 1,500 claims.
>
> > [!answer]-
> > - Bins of \$100 give $60{,}000 / 100 = 600$ bars, which turn sampling noise into a jagged comb.
> > - Bins of \$2,000 give $60{,}000 / 2{,}000 = 30$ bars, a reasonable start to check against a few other widths.
> > - Bins of \$30,000 give $60{,}000 / 30{,}000 = 2$ bars, which hide the shape entirely.
> > - The first bin's density height is $1{,}500 / (5{,}000 \times 2{,}000) = 0.00015$.
> > - Its area, $0.00015 \times 2{,}000 = 0.30$, is the share of claims in the first bin.

## Box plot

A [[Box Plot|box plot]] runs a box from the 25th percentile $Q_1$ to the 75th percentile $Q_3$, with a line at the median, so the box holds the middle half of the data. The interquartile range is

> $$\text{IQR} = Q_3 - Q_1$$

The lower fence is

> $$Q_1 - 1.5\,\text{IQR}$$

and the upper fence is

> $$Q_3 + 1.5\,\text{IQR}$$

An observation beyond a fence is an outlier and is drawn individually. Each whisker reaches the farthest observation within its fence, so it ends at a data value, not at the fence.

Box plots side by side, one per level of a categorical variable, compare the median, spread and outliers of a numerical variable across the levels in one compact view. Reordering the levels by median makes a trend easier to see. The cost is that a box plot hides the shape within each box. Two very different distributions, one with two clusters and one spread evenly, can give the same five numbers, so a histogram or density plot is the plot when shape is the question.

## Stacked bar chart

In a stacked bar chart, one categorical variable sets the bars and the other fills them. Counts show which groups are large. Scaling every bar to the same height (100% stacked) shows each group's proportions, the count with a characteristic divided by the group's own total, which compares the mix within groups of different size.

## Heat map

A heat map is a grid of tiles for every combination of two categorical variables. Each tile's colour shows a count or an average of a numerical variable, such as claim frequency by territory and vehicle age, with darker tiles for higher values.

> [!example]- Which tile of this claim frequency heat map is darkest? {Example}
> An analyst builds a heat map of auto claim frequency by territory and vehicle age group.
>
> | Territory | Age group | Exposure (car-years) | Claims |
> | :--- | :--- | ---: | ---: |
> | T1 | 0–3 | 2,000 | 120 |
> | T1 | 4–8 | 3,000 | 210 |
> | T1 | 9+ | 1,000 | 95 |
> | T2 | 0–3 | 1,500 | 60 |
> | T2 | 4–8 | 2,500 | 125 |
> | T2 | 9+ | 500 | 35 |
>
> > [!answer]-
> > - Each tile shows claims per car-year, such as $95 / 1{,}000 = 0.095$ for T1 aged 9+.
> > - The tiles are 0.060, 0.070 and 0.095 for T1 and 0.040, 0.050 and 0.070 for T2.
> > - The darkest tile is T1 with vehicles aged 9 and over.
> > - Frequency rises with vehicle age in both territories, so the pattern holds within each one.
> > - Coloured by claim count, the darkest tile would be T1 aged 4–8, with 210 claims, only because it has the most exposure.

> [!trap] Colouring by a count instead of a rate
> A heat map or bar chart of counts mostly shows where the exposure is. For frequency or severity, plot the ratio.

## Scatter plot

A scatter plot is the most common plot for two numerical variables. With many points it overplots. Transparency fixes that, or two-dimensional binning (rectangular or hexagonal), which colours each bin by the count of points in it. A smooth curve fitted through the points helps show the trend.

## Line chart

A line chart plots values in time order, with time on the horizontal axis, and joins them by lines, such as monthly claim counts. In the NIST handbook's terms (a run-sequence plot), it answers whether the level shifts, whether the variation shifts, and whether there are outliers.

## Faceting

Adding a third variable by colour or shape can clutter a plot. Faceting instead draws one small plot per level of a categorical variable, or per combination of two in a grid. Facets share their axis scales by default, which is what makes them comparable. Freeing the scales shows each panel's detail but makes comparison across panels harder.
