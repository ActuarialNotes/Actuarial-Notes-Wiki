---
target: Concepts/Histogram.md
created: 2026-10-04
---

## [F-001] Figure's density-scale bars total about 0.82, under the overlaid fitted density
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: nit
- status: open
- locus: figure (Media/Figures/Histogram.svg, built by scripts/figures_exam_mas_i.py histogram())
- claim: The figure draws a density-scale histogram (y-axis 'density') with a 'fitted density' curve over the bars, illustrating the page's statement that density-scale bars have total area 1 and can be overlaid on a fitted density.
- evidence: NIST e-Handbook §1.3.3.14: with counts divided by n times the class width 'the area (or integral) under the histogram is equal to one' and this is the normalisation to use when overlaying a density (sha256:5dd49706cfe4151a32e35dcae8bf63d421ba68685abf7473588776c7830f065a — https://www.itl.nist.gov/div898/handbook/eda/section3/histogra.htm). Recomputed from the builder: bars of width 2 with heights 0.075, 0.101, 0.083, 0.058, 0.038, 0.024, 0.015, 0.009, 0.005, 0.003 have total area 0.822; the curve is a Gamma(shape 1.9, scale 3.1) density, whose bin averages are 0.0789, 0.1216, 0.1025, 0.0732, 0.0483, 0.0304, 0.0186, 0.0111, 0.0065, 0.0038 and whose mass beyond 20 is only 0.010. Every bar from the second on sits about 20% below the curve, so the picture shows a poor fit rather than a density-scale histogram matching its density (rank-5 recomputation; falsifies, does not confirm).
- source_rank: 3
- proposed_action: Rescale the bar heights in the generator (histogram() in scripts/figures_exam_mas_i.py) to the density's bin averages, or to a sample drawn from it, and regenerate; do not hand-edit the SVG.
- applied: false
- fingerprint: b98674920f21

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: definition (equal-width bins = NIST's 'most common form'; bar area proportional to count; picture of the density) and density-scale height n_j/(n w) with total area 1 = NIST §1.3.3.14 normalisation 2 and R hist(freq = FALSE); count scale = NIST normalisation-free form; shape/skew/outliers/multiple modes read off a histogram and used to choose the distributional model = NIST 'what the histogram shows'; spike-at-zero plus continuous positive part -> Tweedie (compound Poisson-gamma) = Larsen p.2; bin-number rules sqrt(n) and Sturges ceil(log2 n + 1) = Smile Histogram API (Sturges is R's default breaks); examples recomputed before reading answers: 180/(500 x 2000) = 1.8e-4 and 36%; sqrt(64) = 8, 1 + log2 64 = 7, 64/32 = 2 per bin — all match; links and figure embed resolve; figure builder checked (F-001 nit); scope = MAS-I outline task C9 ('histograms').
- sources_checked: NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.14 'Histogram' (definition, count and density normalisations, questions answered), sha256:5dd49706cfe4151a32e35dcae8bf63d421ba68685abf7473588776c7830f065a — https://www.itl.nist.gov/div898/handbook/eda/section3/histogra.htm; Smile (Statistical Machine Intelligence and Learning Engine) Java API, smile.math.Histogram: bins(n) square-root rule and sturges(n) k = ceil(log2(n) + 1), sha256:1a0502638b9edbf8b5b7bb5a4ad62e41fc6dd0be3bcf9ae6947be2f3977b37c5 — http://haifengl.github.io/api/java/smile/math/Histogram.html; R Documentation, graphics::hist (breaks = "Sturges" default; freq = FALSE plots densities with total area one), sha256:77630f10cde01668526e0e8ed07b58a325b5bf0a4e235713c7420789c3d92397 — https://stat.ethz.ch/R-manual/R-devel/library/graphics/html/hist.html; Larsen, 'Generalized Linear Models', CAS Study Note (rev. 6/29/2016), pp.1-2 ('QQ and Box Plots…', 'Tweedie Distributions'), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Section C Extended Linear Models, tasks 5 and 9, p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Medium: the sources for the definition and rules are rank 3 (NIST, R/Smile documentation); the bin-width trade-off and the tail remark versus a QQ plot are standard reasoning not found verbatim in a source read. Only open item is the figure nit.

## [F-001/R] Histogram figure bars rescaled to the density's bin averages
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: histogram() in scripts/figures_exam_mas_i.py no longer hard-codes the bar heights: each bar is now the Gamma(shape 1.9, scale 3.1) density's average over its width-2 bin (new helper _bin_mean, composite Simpson), so the bars sit on the overlaid curve and their total area is the density's mass on (0, 20) = 0.990 (the 1% tail beyond 20 is off the axis); the bin-width brace was raised to y = 0.020 so the curve no longer runs through it. Regenerated Media/Figures/Histogram.svg only (generate_concept_figures.py --only Histogram). Checked: read the bar rects back out of the SVG (base 348 px, 252 px = 0.135) -> heights 0.0789, 0.1216, 0.1025, 0.0732, 0.0483, 0.0304, 0.0186, 0.0111, 0.0065, 0.0038, area 0.990, within 3e-6 of an independent 20,000-point midpoint integration of the Gamma density per bin; rendered the SVG in headless Chromium and confirmed the bars meet the curve. NIST e-Handbook §1.3.3.14 (area under a density-scale histogram is one) as cited in F-001. scripts/test_figure_kit.py: 11 tests OK.
