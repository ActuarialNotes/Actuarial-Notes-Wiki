---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:d33552f55b13176ce67d51f13d39a4346f550c50a5fe0d9939f72b51b77b2157
  sources:
    - "Wilke, Fundamentals of Data Visualization (online), ch.23, sha256:61165b47e92728aa04d804ecfe0ca00b9d49bdecd34ae22c432b00a81e52e88a — https://clauswilke.com/dataviz/balance-data-context.html"
    - "Wilke, Fundamentals of Data Visualization (online), ch.17, sha256:c62d185b4d647fcfe02d24a0707928062db6a7e8cb9172cf777943845e40b96b — https://clauswilke.com/dataviz/proportional-ink.html"
    - "Wilke, Fundamentals of Data Visualization (online), ch.19, sha256:a0a9d0529e2a5b92a35071db8e96bfce0e8f2a8941900173eb08effbad24be41 — https://clauswilke.com/dataviz/color-pitfalls.html"
    - "Wilke, Fundamentals of Data Visualization (online), ch.20, sha256:3bfb247d79ee5c09a0daf09a8b47a56d6e519226a2b4abd5ce4747c744d3f3e8 — https://clauswilke.com/dataviz/redundant-coding.html"
    - "Wilke, Fundamentals of Data Visualization (online), ch.22, sha256:06e044ab60f5f837e5bf29d6954d0ecd8bf1cf87819f1547cdd16bbcdd163724 — https://clauswilke.com/dataviz/figure-titles-captions.html"
    - "Few, 'Tapping the Power of Visual Perception' (Perceptual Edge 2004), PDF pp.3-6 (short-term memory 3-7 chunks, preattentive attributes, 2-D location and line length), sha256:8a67f265391dcb842b5fbe5dfbad54cd5546e10025a250ca297864d7f79fd60a — https://www.perceptualedge.com/articles/ie/visual_perception.pdf"
    - "Few, 'Practical Rules for Using Color in Charts' (Perceptual Edge 2008), Rules 3-9; ~10% of males and 1% of females colorblind, sha256:baf8d7c97cbac13933ec37efd691dc7ab4af6b799a6e8f28023019d4726006ef — https://www.perceptualedge.com/articles/visual_business_intelligence/rules_for_using_color.pdf"
    - "Few, 'Eenie, Meenie, Minie, Moe: Selecting the Right Graph for Your Message' (Perceptual Edge 2004), PDF pp.3-7, seven message types and encodings table, sha256:6e1fc0374f53de68c72c7ec62a48895011abf17e0272c18493d8fee58376553a — https://www.perceptualedge.com/articles/ie/the_right_graph.pdf"
    - "Wickham, Cetinkaya-Rundel & Grolemund, R for Data Science 2e, ch.11 Communication (tens or hundreds of plots; audience; title summarizes main finding), sha256:0756a2408a456cd5dc71f64d18a17f636dd57cfea2a817568f38689421eab088 — https://r4ds.hadley.nz/communication"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Visualization Design Principles.md
---

**Visualization design principles** are the rules that make a chosen chart communicate its message quickly and honestly: remove what does not inform, use the eye's preattentive attributes to direct attention to the point, keep shaded areas proportional to the values, use color sparingly and so that color-blind readers can follow it, and give the chart a title that states its finding.

> $$\text{Data-ink ratio} = \frac{\text{ink devoted to the non-redundant display of data}}{\text{total ink used in the graphic}}$$

> $$\text{Apparent ratio} = \frac{v_2 - b}{v_1 - b}$$

- **Symbols:** In the first block, "ink" is anything drawn that differs from the background (Tufte's ratio, as discussed by Wilke, *Fundamentals of Data Visualization*, ch. 23). In the second, $v_1$ and $v_2$ are two values drawn as bars and $b$ is where the value axis starts. The bars' lengths are in the apparent ratio, while the values are in the ratio $v_2 / v_1$. The two agree only when $b = 0$.
- **Declutter, within reason:** Frames, dense or dark gridlines, borders around the legend and background shading carry no data and compete with it. Wilke removes them and draws light gray major gridlines, but warns that Tufte's advice to maximize the data-ink ratio must be read "within reason": a chart stripped of axis titles, tick labels or every reference line leaves points floating in space. Few's rule is that non-data components should be just visible enough to do their job and no more.
- **Proportional ink:** The sizes of shaded areas must be proportional to the values they represent (Bergstrom and West's principle, in Wilke ch. 17). Bars and shaded areas start at zero. To show small differences, plot the differences themselves as bars from zero, or use points, whose position alone carries the value.
- **Preattentive attributes:** Some visual attributes are processed at once, without conscious effort: 2-D position, line length, size, shape, orientation and color hue and intensity (Few, *Tapping the Power of Visual Perception*). Making one item differ in one of these attributes, such as one bar in a strong color among gray ones, makes it stand out before the reader starts to read. Only position and length encode quantities accurately; hue distinguishes categories.
- **Focusing attention:** Knaflic's explanatory charts keep the full data and draw the eye to the point with color, leaving the rest as context. Few's color rules say the same: use color only when it serves the communication, use different colors only for differences in meaning, use soft colors for most data and a bright or dark color for what needs attention, and avoid visual effects such as shadows and 3-D.
- **Limits of memory:** Short-term memory holds roughly three to seven chunks at a time, so a graph whose lines each need a legend entry should have no more than about five (Few). Wilke's rule of thumb is that qualitative color scales work best for three to five categories and become a burden at eight to ten. Label lines directly instead of using a legend, and if a legend is needed, order it as the data appear.
- **Accessible color:** About 10% of men and 1% of women have abnormal color vision, mostly an inability to tell red from green (Few). Avoid red and green together; blue and red work for positive and negative. For a sequential scale, vary the intensity of one hue from pale to dark, and avoid the rainbow scale, whose colors do not run in order (Wilke ch. 19). Encode important distinctions redundantly, for example with both color and point shape, so the chart still reads in grayscale (Wilke ch. 20).
- **Titles and labels:** The title states the point the chart makes. Every axis gets a title with units unless the labels explain themselves (Wilke ch. 22; *R for Data Science*, ch. 11).

The message comes from the [[Presentation Visualization]] and the chart type from [[Chart Selection]]; these principles are the last step. [[Data Visualization]] covers how charts mislead in general.

> [!example]- A Truncated Loss Ratio Axis {Example}
> A slide compares two programs' loss ratios, 62% and 68%, as bars on an axis that starts at 60%. How much larger does the second bar look, and how much larger is the loss ratio?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Apparent ratio} &= \frac{68 - 60}{62 - 60} \\
> > &= \frac{8}{2} \\
> > &= 4.0 \\
> > \text{Actual ratio} &= \frac{68}{62} \\
> > &= 1.097
> > \end{align*}
> > $$
> > The second bar is drawn **four times** as long, but the loss ratio is under 10% higher, so the chart violates proportional ink. Start the bars at zero, or, if the six-point gap is the message, show the two values as points on a narrow scale, or plot a single bar for the 6-point difference from a reference line.

> [!example]- Redesigning a Cluttered Territory Chart {Example}
> A chart shows quarterly claim frequency for eight territories as eight lines in a rainbow palette, with Territory 3 in red and Territory 5 in green. It has a dark gridline at every tick, a gray background, a legend in alphabetical order and the title "Frequency trends". The message is that Territory 3's frequency has doubled while the others are stable. List the design changes and the principle behind each.
>
> > [!answer]-
> > - **Focus:** Draw Territory 3 in one strong color and the other seven in light gray. A single preattentive difference in color points the eye to the message, and the gray lines keep the comparison.
> > - **Color access:** Removing the red-green pair matters because the most common color-vision deficiency cannot tell those two apart, and eight hues is beyond what a reader can match to a legend.
> > - **Labels:** Label Territory 3 directly at the end of its line and drop the legend. Note "other territories" once in gray.
> > - **Declutter:** Remove the background shading and lighten the gridlines to a few light horizontal lines, keeping the axis titles and units.
> > - **Title:** Replace "Frequency trends" with the finding, such as "Territory 3's claim frequency has doubled since 2023; other territories are flat".

> [!tip]- How it appears on the exam
> - **DISC-DA:** Section 6.3 covers maximizing a presentation visualization's effectiveness. Questions show or describe a chart and ask which change would most improve it, which design choice misleads, or how to make one data point stand out.
> - Expect principle-recognition questions: why a bar axis must start at zero, why to avoid red-green coding, why to replace a legend with direct labels, or which preattentive attribute a highlight uses.

> [!warning]- Exam traps
> - **Removing everything:** Decluttering removes what carries no information, not the axis titles, units or reference lines that let the reader decode the data.
> - **Color as decoration:** Giving every bar its own color adds no meaning and dilutes the one color that should draw the eye. Color should mean something.
> - **Hue for quantities:** A scale that runs through unrelated hues has no natural order. Use one hue from light to dark for a sequential quantity.
> - **Truncated bars:** A bar chart's axis starting above zero exaggerates differences, as the first example shows. Points can use a narrow axis; bars cannot.
