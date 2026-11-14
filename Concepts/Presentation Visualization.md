---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:20030e4aab5ae9fd6cdf64efa9c86a89d6dabc41a1bf6af605c7c5d2da81befd
  sources:
    - "Knaflic, storytellingwithdata.com 'exploratory vs explanatory analysis' (2014), post text, sha256:e20900367da7a69b5ba71cc68788da59db582996755bf398664c57f4acd0229a — https://www.storytellingwithdata.com/blog/2014/04/exploratory-vs-explanatory-analysis"
    - "Knaflic, storytellingwithdata.com 'the 3-minute story' (2014), post text, sha256:66ccdb5ea05d4425c2afe5f2f9a3dadab3302bd53ecd645c4f22f971e0de00b2 — https://www.storytellingwithdata.com/blog/2014/02/the-3-minute-story"
    - "Knaflic, storytellingwithdata.com 'what's the Big Idea?' (2014), post text (Duarte's three components; Big Idea per slide), sha256:7e3d6bc6a5569611af30442ec33abec445e2b13cedf29732830382d2ba903180 — https://www.storytellingwithdata.com/blog/2014/02/whats-big-idea"
    - "Wickham, Cetinkaya-Rundel & Grolemund, R for Data Science 2e, ch.11 Communication (tens or hundreds of plots; audience; title summarizes main finding), sha256:0756a2408a456cd5dc71f64d18a17f636dd57cfea2a817568f38689421eab088 — https://r4ds.hadley.nz/communication"
    - "Wilke, Fundamentals of Data Visualization (online), ch.22, sha256:06e044ab60f5f837e5bf29d6954d0ecd8bf1cf87819f1547cdd16bbcdd163724 — https://clauswilke.com/dataviz/figure-titles-captions.html"
    - "Wilke, Fundamentals of Data Visualization (online), ch.29, sha256:e57173b0c8558d092245ced5613ed530eef93119246a4bc0ce7214558347efeb — https://clauswilke.com/dataviz/telling-a-story.html"
    - "DrivenData, Deon default Data Science Ethics Checklist (checklist.yml), sections A-E, items A.1-E.4, sha256:d1d2681923bba6f52c2900bae79d61e4ebe1a5ae8c1d19274b69a915277e4631 — https://raw.githubusercontent.com/drivendataorg/deon/main/deon/assets/checklist.yml"
    - "Code of Professional Conduct (U.S.-based organizations, eff. Jan 1 2001; Academy copy), Precepts 1-4, 8, 9, sha256:611f8101cf7bebd9cf8cfc1d5dfdc5f4e5b86e8d1fedca50069d291db9ec950c — https://www.actuary.org/sites/default/files/files/code_of_conduct.8_1.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Presentation Visualization.md
---

A **Presentation Visualization** is a graphic built to tell a particular audience one finding that the analyst has already established. Its job is to make that one message obvious to someone who did not do the analysis.

A presentation visualization is planned in this order:

1. **Know the audience** and what it must know or decide.
2. **State the one message**, the Big Idea, before drawing anything.
3. **Choose the chart** that shows the message ([[Chart Selection]]).
4. **Design it** so the message reads quickly ([[Visualization Design Principles]]): a title that states the point, emphasis on the point against the other data, and direct labels.

The chart type follows from the message, and design comes last. Picking a favorite chart and looking for something to put in it reverses the order.

## Exploratory and explanatory visualization

Knaflic calls the two kinds of graphic *exploratory* and *explanatory* analysis. [[Exploratory Data Visualization|Exploratory graphics]] differ from presentation graphics in audience and purpose:

| | Exploratory | Presentation (explanatory) |
| :--- | :--- | :--- |
| Made for | The analyst | An audience without the analyst's background |
| Purpose | To find the finding | To show a finding already established |
| How many | Tens or hundreds, most thrown away at once | One or a few, rebuilt for a reader |
| Finish | Made quickly | Titles, labels and emphasis, so it explains itself |

*R for Data Science* notes that an analysis produces tens or hundreds of plots, most of them thrown away at once. Knaflic likens exploration to turning over 100 rocks to find one or two gemstones, and explanation to showing someone those gemstones. A deck of every plot made during exploration is not a presentation. The reader gets the one or two that carry the message, and the rest go to an appendix or nowhere.

The audience "will likely not share your background knowledge and will not be deeply invested in the data" (*R for Data Science*, ch. 11), so the graphic has to explain itself: a title, axis titles with units, and labels on the data rather than a legend to decode. An underwriting manager, a claims vice-president and a regulator need different levels of detail from the same analysis.

## The Big Idea

Before drawing anything, Knaflic recommends being able to say the whole story in three minutes, and then in one sentence, the **Big Idea**. Following Duarte, the Big Idea states the presenter's point of view, conveys what is at stake, and is a complete sentence. With slides, each slide has its own Big Idea and the deck has an overall one.

> [!example]- What Big Idea and graphic should this actuary present to the claims vice-president? {Example}
> A homeowners actuary has spent two weeks exploring claim data and produced 60 plots. Total claim counts rose from 4,000 in 2024 to 4,360 in 2025 on a stable book. Water damage claims rose from 1,200 to 1,560, and the counts for every other peril combined were unchanged. The claims vice-president has ten minutes at a monthly meeting and must decide whether to fund a leak-detection device program.
>
> > [!answer]-
> > - Water damage rose by $1{,}560 - 1{,}200 = 360$ claims, and the total by $4{,}360 - 4{,}000 = 360$, so water damage is the whole change. It rose $1{,}560/1{,}200 - 1 = 30\%$.
> > - The vice-president needs to know what drove the increase and whether the device program addresses it, not how the data were cleaned.
> > - The Big Idea is "Water damage claims rose 30% in 2025 and account for the entire increase in claim counts, so funding leak detection targets the one peril that is getting worse." It states a point of view and what is at stake, and it is a complete sentence.
> > - The graphic is one chart of claim counts by year for each peril, with water damage in a strong color and the other perils in gray as context. Its title is the finding, not "Claims by peril".
> > - The other 59 exploratory plots stay out. Any that answer a likely question can go in an appendix.

## The title and the emphasis

The purpose of a plot title is to summarize the main finding. "Water damage drove the 2025 frequency increase" is a title, while "Claim frequency by peril, 2021–2025" is only a description (*R for Data Science*; Wilke, *Fundamentals of Data Visualization*, ch. 22). What is plotted, the variables and their units go in the axis titles and labels.

Knaflic's makeover keeps the full exploratory chart and draws attention to the point of interest, so the other data remain as context. Focusing on one story makes the others harder to see, which is why exploration comes first: it gives confidence that the audience is being pointed at the right thing.

> [!example]- What should change to turn this exploratory chart into a presentation chart? {Example}
> An analyst's exploratory chart shows auto claim frequency for 12 territories over five years: 12 lines in 12 default colors, a legend in alphabetical order, gridlines on both axes and the title "Frequency by territory". The finding is that Territory 7's frequency has risen every year while the others are flat. The chart is going into a rate-review deck for the pricing committee.
>
> > [!answer]-
> > - Replace the title with the finding, for example "Territory 7 is the only territory whose frequency rose every year since 2021".
> > - Draw Territory 7 in one strong color and the other 11 lines in light gray. The gray lines keep the context that the rest are flat, and the reader's eye goes straight to the highlighted line.
> > - Label the Territory 7 line directly at its end and drop the 12-entry legend, because twelve colors cannot be matched to a legend at a glance.
> > - Keep light horizontal gridlines at most, so the reader can see the level, and remove anything else that does not carry data.
> > - Keep the exploratory version as the analyst's tool. It may answer a committee member who asks about another territory.

## Stories and honesty

Wilke (ch. 29) notes that a single static visualization rarely tells a whole story. A sequence of graphics can carry the opening, the challenge, the action and the resolution.

A presentation graphic chooses what to emphasize, but it must still represent the data honestly. That is item C.3 of the [[Data Ethics Checklist|Deon ethics checklist]], and Precept 8 of the Code of Professional Conduct requires that an actuary's work not be used to mislead ([[Professional Responsibilities of the Actuary]]).

> [!trap] A title that describes the axes
> "Loss ratio by year" names the chart. A presentation title states what the reader should conclude from it, and the description moves to the axis titles.
