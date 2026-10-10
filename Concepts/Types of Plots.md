---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:184061bc72b234cd1f35f6d4a10ae03f2da704fcd20b8dd519a3ffa2413f26a4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Types of Plots.md
---

**Types of Plots** are the standard graphics an analyst chooses among when creating a plot, each built to show one kind of pattern for variables of particular [[Data Types|types]]: a bar chart, histogram or density plot for one variable; a box plot, scatter plot, stacked bar chart or heat map for two; a line chart for a variable over time; and faceting to split any of them by a further variable. Choosing well means matching the plot to the number and type of variables and to the question being asked.

> $$\text{density height}_j = \frac{n_j}{n \, w}$$

> $$x \text{ is plotted as an outlier if } x < Q_1 - 1.5\,\text{IQR} \text{ or } x > Q_3 + 1.5\,\text{IQR}$$

- **Symbols:** In the first block a [[Histogram|histogram]] of $n$ observations has bins of equal width $w$, and $n_j$ is the count in bin $j$. Drawn on the density scale, the bars have total area one, which is what lets histograms or density curves of groups of different sizes be compared. In the second, $Q_1$ and $Q_3$ are the 25th and 75th percentiles and $\text{IQR} = Q_3 - Q_1$ is the interquartile range, the rule a [[Box Plot|box plot]] uses to draw points individually.

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

- **Bar chart:** The bar's height is the number of observations at each level. For a nominal variable, ordering the bars by frequency makes the common and rare levels easier to read; an ordinal variable keeps its natural order.
- **Histogram and density plot:** A histogram divides the axis into equally spaced bins and draws a bar over each, so its picture depends on the bin width: too narrow gives a jagged comb, too wide hides the shape in a few bars, and several widths should be tried. A density plot is a smoothed version, easier for judging modes and skewness, and several groups' densities can be overlaid with transparency to compare their shapes.
- **Box plot:** The box runs from the 25th to the 75th percentile with a line at the median, whiskers reach the farthest points within $1.5\,\text{IQR}$ of the box, and points beyond are drawn individually. Box plots side by side are compact enough to compare many levels at once, at the cost of hiding the shape within each box, and reordering the levels by median makes a trend easier to see.
- **Stacked bar chart:** One categorical variable sets the bars and the other fills them. Counts show which groups are large; scaling every bar to the same height shows proportions, which compares the mix within groups of different size.
- **Heat map:** A grid of tiles for every combination of two categorical variables, each tile's colour showing a count or an average of a numerical variable, such as claim frequency by territory and vehicle age.
- **Scatter plot:** The most common plot for two numerical variables. With many points it overplots, which transparency or two-dimensional binning (rectangular or hexagonal) fixes; a smooth curve fitted through the points helps show the trend.
- **Line chart:** Values plotted in time order and joined by lines, such as monthly claim counts. In the NIST handbook's terms (a run-sequence plot), it answers whether the level shifts, whether the variation shifts, and whether there are outliers.
- **Faceting:** Adding a third variable by colour or shape can clutter a plot; faceting instead draws one small plot per level of a categorical variable (or per combination of two, in a grid). Facets share their axis scales by default, which is what makes them comparable; freeing the scales shows each panel's detail but makes comparison across panels harder.

> [!example]- A Heat Map of Claim Frequency {Example}
> An analyst builds a heat map of auto claim frequency by territory and vehicle age group. The data are:
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
> What value does each tile show, which tile is darkest, and what would go wrong if the tiles were coloured by claim count?
>
> > [!answer]-
> > Each tile shows claims per car-year.
> > $$
> > \begin{align*}
> > f_{T1,\,9+} &= \frac{95}{1{,}000} \\
> > &= 0.095 \\
> > f_{T2,\,0\text{–}3} &= \frac{60}{1{,}500} \\
> > &= 0.040
> > \end{align*}
> > $$
> > The six tiles are 0.060, 0.070 and 0.095 for T1 and 0.040, 0.050 and 0.070 for T2. The darkest tile is T1 with vehicles aged 9 and over, and frequency rises with vehicle age in both territories, so the pattern holds within each one. Coloured by claim count, the darkest tile would be T1 aged 4–8, with 210 claims, only because it has the most exposure.

> [!example]- Choosing a Bin Width {Example}
> A histogram of 5,000 claim severities covers \$0 to \$60,000. How many bars do bin widths of \$100, \$2,000 and \$30,000 produce? With \$2,000 bins, the first bin holds 1,500 claims. What is its height on the density scale?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Bars at } 100 &= \frac{60{,}000}{100} \\
> > &= 600 \\
> > \text{Bars at } 2{,}000 &= \frac{60{,}000}{2{,}000} \\
> > &= 30 \\
> > \text{Bars at } 30{,}000 &= \frac{60{,}000}{30{,}000} \\
> > &= 2 \\
> > \text{Height}_1 &= \frac{1{,}500}{5{,}000 \times 2{,}000} \\
> > &= 0.00015
> > \end{align*}
> > $$
> > Six hundred bars turn sampling noise into a jagged comb, and two bars hide the shape entirely; thirty is a reasonable start, to be checked against a few other widths. The density height times the bin width, $0.00015 \times 2{,}000 = 0.30$, is the share of claims in the first bin.

> [!tip]- How it appears on the exam
> - **DISC-DA** covers creating plots as the last section of its topic on analyzing data with visualizations, after the fundamentals of [[Exploratory Data Visualization|exploratory visualizations]]. Application questions give a question about an insurance data set and the variables involved and ask which plot fits it, or describe a plot and ask what it shows.
> - Expect distinctions between neighbours: a histogram against a bar chart, a box plot against a histogram (summary against shape), a stacked bar of counts against one of proportions, and faceting against adding colour.

> [!warning]- Exam traps
> - **A histogram is not a bar chart:** A histogram bins a numerical variable, so its bars stand on adjacent intervals of the axis and their width is a choice. A bar chart counts the levels of a categorical variable.
> - **A box plot hides the shape:** Two very different distributions, one with two clusters and one spread evenly, can give the same five numbers. Use a histogram or density plot when shape is the question.
> - **Colour by a rate, not a count:** A heat map or bar chart of counts mostly shows where the exposure is. For frequency or severity, plot the ratio.
> - **One bin width is not enough:** A histogram's shape depends on its bin width, so a conclusion drawn from a single width may be an artefact.
