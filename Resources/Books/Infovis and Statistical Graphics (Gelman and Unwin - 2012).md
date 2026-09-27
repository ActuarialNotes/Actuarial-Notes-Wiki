---
Title: "Infovis and Statistical Graphics: Different Goals, Different Looks"
Authors: "Andrew Gelman and Antony Unwin"
Publisher: "Journal of Computational and Graphical Statistics"
Year: "2012"
date: "2012"
Type: "Paper"
Available from: "[stat.columbia.edu](http://www.stat.columbia.edu/~gelman/research/published/vis14.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:45ed83d9c3053ce79d6fe6ec794979f0149c83233b2e7b5d5f2d78a257d07299
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Infovis and Statistical Graphics (Gelman and Unwin - 2012).md
---
![[Infovis and Statistical Graphics (Gelman and Unwin - 2012) - Cover.svg]]

An article on the different goals of statistical graphics and information visualization (Infovis), written to start a conversation between the two fields. It sets out goals for graphical displays, mainly from the statistical point of view, discusses the contradictions among them, and suggests not cramming into a single graph what can be better displayed in two or more. The copy linked here is the authors' manuscript dated 20 January 2012; the article appeared, with discussion, in the Journal of Computational and Graphical Statistics, vol. 22, no. 1 (2013), pp. 2–28.

> [!info] On the syllabus
> - [[Exam PCPA (CAS)|Exam PCPA]] — objectives A1–A4 (Domain A, Dealing with Data); the outline cites the whole article, as an online publication (OP) linked to this manuscript, under the subtitle "Different Goals, Different Views".

## Looking at Infovis through statisticians' eyes
- The article was prompted by Nathan Yau's December 2008 list, on his Flowing Data blog, of the five best data visualizations of the year, whose appeal the authors found at odds with the usual principles of statistical graphics.
- Statisticians look for effective, precise ways of representing data and the right comparisons; Infovis designers want to grab readers' attention and tell them a story.
- [[Exploratory Data Analysis|Exploratory graphics]] are about speed, flexibility and alternative views, presentation graphics about care, specifics and a single view; the article writes mainly about static presentation graphics.

## Understanding and dialogue rather than pure criticism
- The very features that make an effective information visualization can be detrimental to statistical presentation, and vice versa, so the aim is a set of different data views serving different purposes rather than one display that pleases everyone.

## Sources for the two points of view
- Shneiderman's mantra for Infovis — overview first, zoom and filter, then details-on-demand — makes no mention of comparisons; for statisticians there always have to be comparisons.

## Some goals involving the visual display of quantitative information
- Quotes Tukey's four purposes of graphic display: graphics are for the qualitative and descriptive, for comparison, for impact, and for reporting the results of careful data analysis.
- Proposes discovery goals (giving an overview, conveying the scale and complexity of a dataset, exploration) and communication goals (communication to self and others, telling a story, attracting attention and stimulating interest).
- "We communicate when we display a convincing pattern, and we discover when we observe deviations from our expectations."
- A graphic is part of a story, not an isolated object: annotations, legend, title, caption and text should be consistent with it, and several graphics can present a selection of views.

## Background
- Defines two practices in ideal form: statistical [[Data Visualization|data visualization]], focused on facilitating an understanding of patterns in an applied problem, and infographics, which should be attractive, grab attention and tell a story.
- Data and model visualization go together: effective data graphs can often be viewed as comparisons to models, and graphs of models are best shown alongside the data.

## The "5 best data visualization projects of the year"
- Assesses Yau's picks for 2008 against the goals: Wordle, the New York Times' decision tree of the Obama–Clinton divide, a Radiohead music video, box-office streamgraphs, "I Want You to Want Me" and "Britain from Above".
- Stacking the box-office curves makes individual films almost impossible to read; the authors would prefer two graphs, calling it a common error to cram into a single graph what can be better displayed in two.

## Statistical problems with other highly praised infographics
- An award-winning graphic of plane crashes presents events unnormalized by base rates.
- Florence Nightingale's coxcomb of Crimean War mortality is redrawn as simple time-series graphs; the circular plot obscures the patterns, though its unusual appearance may have helped draw attention to the public health problems she was working on.
- A National Geographic parallel-coordinate plot of health spending and life expectancy is redrawn as a [[Scatter Plot|scatterplot]]; an online display might start with the first and reveal the second with a click.
- A flowchart for planning in Afghanistan conveys complexity but is neither a data visualization nor a statistical graph.

## Static statistical graphics: timeless or simply old-fashioned?
- Default statistical graphics are largely determined by the structure of the data — line plots for time series, [[Histogram|histograms]] for univariate data, scatterplots for bivariate data — with conventions such as predictors on the horizontal axis.
- The optimal situation is close cooperation between data analysts and designers.

## The Baby Name Wizard—an example we like
- Laura and Martin Wattenberg's interactive tool combines the eye-catching beauty of the best Infovis with the directness and simplicity of the best statistical visualizations, and meets all six goals.

## Discussion
- Infovis prizes unique, distinctive displays, while statisticians develop generic methods with a similar look and feel across applications.
- Statisticians assume an interested audience and use graphics as part of an explanation; Infovis designers use them more as a door opener.
- Today's infographic may become tomorrow's statistical display.

## References

## Sources
- [Infovis and Statistical Graphics: Different Goals, Different Looks, authors' manuscript of 20 Jan 2012 (Columbia University)](http://www.stat.columbia.edu/~gelman/research/published/vis14.pdf) — the document: title, authors, date, abstract, section headings and the text of every section
- [Crossref record for doi:10.1080/10618600.2012.761137](https://api.crossref.org/works/10.1080/10618600.2012.761137) — the published article: Journal of Computational and Graphical Statistics 22(1), January 2013, pp. 2–28
- [CAS PCPA Content Outline v.8, updated 9.9.2026](https://www.casact.org/sites/default/files/2024-05/Exam_PCPA_2025_F_Content_Outlines.pdf) — the citation, the link to this manuscript, the domain and the source type
