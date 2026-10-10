---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:737480f720fb777103371b2b245a0048fa3e3944261d18e0be7acd992b77f113
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Presentation Visualization.md
---

A **presentation visualization** is a graphic built to tell a particular audience one finding that the analyst has already established, as opposed to an exploratory graphic made to find that finding. Knaflic calls the two *explanatory* and *exploratory* analysis, and the work of a presentation graphic is to make its one message obvious to someone who did not do the analysis.

- **Exploratory vs. explanatory:** [[Exploratory Data Visualization|Exploratory graphics]] are made quickly, for the analyst, in large numbers. *R for Data Science* notes that an analysis produces tens or hundreds of plots, most of them thrown away at once. Knaflic likens exploration to turning over 100 rocks to find one or two gemstones, and explanation to showing someone those gemstones. A presentation graphic is one of the few that survive, rebuilt for a reader.
- **Know the audience:** The audience "will likely not share your background knowledge and will not be deeply invested in the data" (*R for Data Science*, ch. 11), so the graphic has to explain itself: a title, axis titles with units, and labels on the data rather than a legend to decode. An underwriting manager, a claims vice-president and a regulator need different levels of detail from the same analysis.
- **One message first:** Before drawing anything, Knaflic recommends being able to say the whole story in three minutes, and then in one sentence, the **Big Idea**. Following Duarte, the Big Idea states the presenter's point of view, conveys what is at stake, and is a complete sentence. With slides, each slide has its own Big Idea and the deck has an overall one.
- **The title states the point:** The purpose of a plot title is to summarize the main finding, not to describe the chart. "Water damage drove the 2025 frequency increase" is a title; "Claim frequency by peril, 2021–2025" is only a description (*R for Data Science*; Wilke, *Fundamentals of Data Visualization*, ch. 22).
- **Context, not just the highlight:** Knaflic's makeover keeps the full exploratory chart and draws attention to the point of interest, so the other data remain as context. Focusing on one story makes the others harder to see, which is why exploration comes first: it gives confidence that the audience is being pointed at the right thing.
- **A story is usually more than one chart:** Wilke (ch. 29) notes that a single static visualization rarely tells a whole story. A sequence of graphics can carry the opening, the challenge, the action and the resolution.
- **Honesty:** A presentation graphic chooses what to emphasize, but it must still represent the data honestly. That is item C.3 of the [[Data Ethics Checklist|Deon ethics checklist]], and an actuary's work is bound by Precept 8 of the Code of Professional Conduct not to be used to mislead ([[Professional Responsibilities of the Actuary]]).

The choice of chart is [[Chart Selection]], and the design rules that make it read quickly are [[Visualization Design Principles]]. Both start from the message decided here.

> [!example]- Writing the Big Idea for a Frequency Increase {Example}
> A homeowners actuary has spent two weeks exploring claim data and produced 60 plots. Total claim counts rose from 4,000 in 2024 to 4,360 in 2025 on a stable book. Water damage claims rose from 1,200 to 1,560, and the counts for every other peril combined were unchanged. The claims vice-president has ten minutes at a monthly meeting and must decide whether to fund a leak-detection device program. Plan the presentation visualization.
>
> > [!answer]-
> > The water damage increase is the whole change:
> > $$
> > \begin{align*}
> > \Delta_{\text{water}} &= 1{,}560 - 1{,}200 \\
> > &= 360 \\
> > \Delta_{\text{total}} &= 4{,}360 - 4{,}000 \\
> > &= 360 \\
> > \frac{1{,}560}{1{,}200} - 1 &= 30\%
> > \end{align*}
> > $$
> > - **Audience and decision:** The vice-president needs to know what drove the increase and whether the device program addresses it, not how the data were cleaned.
> > - **Big Idea:** "Water damage claims rose 30% in 2025 and account for the entire increase in claim counts, so funding leak detection targets the one peril that is getting worse." It states a point of view, what is at stake and is a complete sentence.
> > - **Graphic:** One chart of claim counts by year for each peril, with water damage in a strong color and the other perils in gray as context. The title is the finding, not "Claims by peril".
> > - **What stays out:** The other 59 exploratory plots. Any that answer a likely question can go in an appendix.

> [!example]- From an Exploratory Chart to a Presentation Chart {Example}
> An analyst's exploratory chart shows auto claim frequency for 12 territories over five years: 12 lines in 12 default colors, a legend in alphabetical order, gridlines on both axes and the title "Frequency by territory". The finding is that Territory 7's frequency has risen every year while the others are flat. The chart is going into a rate-review deck for the pricing committee. What should change?
>
> > [!answer]-
> > - **Title:** Replace the description with the finding, for example "Territory 7 is the only territory whose frequency rose every year since 2021".
> > - **Focus:** Draw Territory 7 in one strong color and the other 11 lines in light gray. The gray lines keep the context that the rest are flat, and the reader's eye goes straight to the highlighted line.
> > - **Labels:** Label the Territory 7 line directly at its end and drop the 12-entry legend. Twelve colors cannot be matched to a legend at a glance.
> > - **Clutter:** Keep light horizontal gridlines at most, so the reader can see the level, and remove anything else that does not carry data.
> > - **Keep the exploratory version:** It remains the analyst's tool, and it may answer a committee member who asks about another territory.

> [!tip]- How it appears on the exam
> - **DISC-DA:** Section 6.1 covers the keys to effective presentation visualizations. Questions give an analysis and an audience and ask what the presenter should do first (identify the audience and the one message), whether a graphic is exploratory or explanatory, or which title best serves a stated audience.
> - Scenario questions combine this with [[Chart Selection]] and [[Visualization Design Principles]]: the message is fixed first, then the chart type, then the design.

> [!warning]- Exam traps
> - **Showing the analysis instead of the finding:** A deck of every plot made during exploration is not a presentation. The reader gets the one or two that carry the message, and the rest go to an appendix or nowhere.
> - **A title that describes the axes:** "Loss ratio by year" names the chart. A presentation title states what the reader should conclude from it.
> - **Deleting all context:** Focusing attention does not mean removing the comparison. Highlight the point against the other data in gray, rather than showing only the one series.
> - **Choosing the chart before the message:** The chart type follows from the message. Picking a favorite chart and looking for something to put in it reverses the order.
