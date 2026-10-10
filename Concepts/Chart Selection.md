---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:1b26c0cdffba43761ccd6b785e6c27f7f17e2c426071f003433de8bc601647d7
  sources:
    - "Few, 'Eenie, Meenie, Minie, Moe: Selecting the Right Graph for Your Message' (Perceptual Edge 2004), PDF pp.3-7, seven message types and encodings table, sha256:6e1fc0374f53de68c72c7ec62a48895011abf17e0272c18493d8fee58376553a — https://www.perceptualedge.com/articles/ie/the_right_graph.pdf"
    - "Few, 'Tapping the Power of Visual Perception' (Perceptual Edge 2004), PDF pp.3-6 (short-term memory 3-7 chunks, preattentive attributes, 2-D location and line length), sha256:8a67f265391dcb842b5fbe5dfbad54cd5546e10025a250ca297864d7f79fd60a — https://www.perceptualedge.com/articles/ie/visual_perception.pdf"
    - "Few, 'Effectively Communicating Numbers' (Perceptual Edge 2005), PDF p.6 (tables for look-up, graphs for shape), sha256:4de4c11e00faec2ea5fb3f4f31e240908e8356808a0253938d268359144f3a4e — https://www.perceptualedge.com/articles/Whitepapers/Communicating_Numbers.pdf"
    - "Few, 'Save the Pies for Dessert' (Perceptual Edge 2007), part-to-whole strength; slices judged only near 0/25/50/75/100%, sha256:9086dad31f86399e1aa1a219867779e4ee86fa4d25cfe3faa4d1323fbbe37b6d — https://www.perceptualedge.com/articles/visual_business_intelligence/save_the_pies_for_dessert.pdf"
    - "Wilke, Fundamentals of Data Visualization (online), ch.5, sha256:166fe68485742ef7e9a9c64af3769e243c4e4d08154bfc3811004ed39b0b5c7f — https://clauswilke.com/dataviz/directory-of-visualizations.html"
    - "Wilke, Fundamentals of Data Visualization (online), ch.6, sha256:5550b27f5be4dee9f495b8c4cd02609c713c46cf9dff80b372f34bd48a2d371f — https://clauswilke.com/dataviz/visualizing-amounts.html"
    - "Wilke, Fundamentals of Data Visualization (online), ch.10, sha256:54ea3fb66ae94952d034d7e4021a1641b0083a465fdd9194fb7da643a6e5e15a — https://clauswilke.com/dataviz/visualizing-proportions.html"
    - "Wilke, Fundamentals of Data Visualization (online), ch.26, sha256:d467dbb2f7ab77c6b7cd873dda31c897cb44ebf015a7df8107afe26ec30c8a94 — https://clauswilke.com/dataviz/no-3d.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Chart Selection.md
---

**Chart selection** is choosing the display, a table or a particular type of graph, that makes a presentation's message easiest to see. The choice follows from the kind of comparison the message makes: Few sorts almost every quantitative message into seven relationship types, each with its own best encoding, and the wrong chart can hide the message or distort it.

- **Table or graph:** Tables work best when the reader will look up individual values or needs them precisely. Graphs work best when the message lives in the shape of the data, in patterns, trends and exceptions (Few, *Effectively Communicating Numbers*). A rating manual's factor table is a table; the fact that the factors rise with driving record is a graph.
- **The strongest encodings:** Of the visual attributes a graph can use, only 2-D position and line length let a reader judge quantities accurately. Area, color intensity and hue show that one value is larger than another but not by how much (Few, *Tapping the Power of Visual Perception*). That is why points, lines and bars carry most quantitative graphs, and why pie slices, bubble sizes and color scales are weaker.
- **Points, lines and bars:** Bars give each value visual weight and are best for comparing individual values. Lines show the shape of a series as it changes, especially through time. Points stand alone mainly in a scatter plot, where both axes are quantitative.

| Message (Few's relationship) | Example in insurance | Display |
| :--- | :--- | :--- |
| **Nominal comparison** | Average severity by line of business | Bars, in a meaningful order |
| **Ranking** | Territories by loss ratio | Bars sorted by value, descending to stress the largest |
| **Part-to-whole** | Share of written premium by line | Bars on a percentage scale; stacked bars only when the whole matters too |
| **Time series** | Monthly claim counts | Lines, time on the horizontal axis; bars to stress single values |
| **Deviation** | Actual minus expected losses by region | Bars or lines with a reference line at zero |
| **Frequency distribution** | Claim sizes | [[Histogram]] or frequency polygon; [[Box Plot|box plots]] to compare many groups |
| **Correlation** | Vehicle value against severity | [[Scatter Plot]] with a trend line |

- **Amounts:** Bars start at zero, because their length encodes the value. Long category labels read better on horizontal bars than on rotated labels, and bars arranged by size are easier to read than bars in alphabetical order (Wilke, *Fundamentals of Data Visualization*, ch. 6). Where zero cannot be on the axis, use dots instead of bars.
- **Proportions:** A pie chart shows that the parts add to a whole and makes simple fractions such as one-half or one-quarter easy to see, and it suits a single small set of parts. Side-by-side bars make the parts easier to compare with each other. Stacked bars can compare several sets of proportions, but segments that do not start on the baseline are hard to compare across bars (Wilke, ch. 10). Few's view is that bars on a percentage scale beat pies for comparing parts, since a slice is easy to judge only near 0%, 25%, 50%, 75% or 100%.
- **Distributions and relationships:** Histograms and density plots are the intuitive views of one distribution. Box plots suit many distributions at once, and scatter plots are the standard view of one quantitative variable against another (Wilke, ch. 5).
- **Charts to avoid:** 3-D effects on pies, bars and lines add no data and distort what is shown, because the projection makes the front of a tilted pie look larger and pushes bars away from their gridlines (Wilke, ch. 26). Using hue to encode quantities is a puzzle for the reader (Few). A pie with many similar slices hides the differences it is meant to show.

Charts used to *find* patterns are [[Types of Plots|exploratory plots]]. Here the message is already known from the [[Presentation Visualization]], and the design that follows the choice is [[Visualization Design Principles]].

> [!example]- Matching Messages to Displays {Example}
> A pricing actuary is preparing five exhibits for a rate filing support package. Choose a display for each.
>
> 1. The 40 final rating factors, which the regulator will check against the rating manual.
> 2. Monthly reported claim counts for the last 36 months, showing a step up after a hailstorm.
> 3. The ten territories with the highest loss ratios.
> 4. The relationship between building age and fire severity across 2,000 claims.
> 5. Each line's share of the company's written premium, where the point is that commercial auto is now one-third of the book.
>
> > [!answer]-
> > 1. **A table.** The reader will look up exact values, which is what tables do best.
> > 2. **A line graph** with months on the horizontal axis. The message is the shape of the series, a level shift, and lines show change over time.
> > 3. **Horizontal bars sorted in descending order.** It is a ranking, and horizontal bars leave room for territory names.
> > 4. **A scatter plot** with a trend line. Both variables are quantitative, and the message is a correlation.
> > 5. **A pie or a bar chart on a percentage scale.** The point is a simple fraction of a whole, which a pie shows well when there are only a few lines. If the reader must compare the other lines' shares precisely, sorted bars are better.

> [!example]- When a Pie Chart Hides the Message {Example}
> A pie chart shows the share of claim counts by cause of loss for a homeowners book: wind 19%, water 18%, fire 17%, theft 16%, liability 15% and other 15%. The presenter's message is that wind is now the largest cause. Why does the pie fail, and what should replace it?
>
> > [!answer]-
> > The six slices differ by one or two percentage points, and none sits at an easy fraction such as 25% or 50%. Judging angles or areas, a reader cannot tell that wind's 19% is bigger than water's 18%, so the message is invisible. The shares sum to $19 + 18 + 17 + 16 + 15 + 15 = 100\%$, so the pie is not wrong, only uninformative.
> >
> > Replace it with **horizontal bars sorted from largest to smallest**, starting at zero, with the values labeled. Position and length are the encodings readers judge most accurately, so wind's lead becomes visible, and the sorted order makes it the first bar read. A title such as "Wind is now the largest cause of homeowners claims" states the point.

> [!tip]- How it appears on the exam
> - **DISC-DA:** Section 6.2 covers selecting the right presentation visualization. Questions describe a message and ask which chart type best supports it, or which of several charts is the weakest choice and why.
> - Expect distractors built on popular but weak choices: a pie with many slices, a 3-D column chart, a table for a trend, or a line chart across unordered categories.

> [!warning]- Exam traps
> - **Lines across unordered categories:** A line implies a sequence, as in time. Connecting lines of business or territories with a line suggests a trend that does not exist. Use bars.
> - **Bars that do not start at zero:** Bar length encodes the value, so a truncated axis exaggerates differences. If the differences are small, use points or plot the differences themselves.
> - **Stacked bars for comparing parts:** Only the bottom segment shares a baseline. Comparing a middle segment across bars is hard, so stacked bars suit comparing totals, not individual parts.
> - **A table when the message is a pattern:** A table of 36 monthly counts makes the reader find the trend. A table is right when the reader needs exact values.
