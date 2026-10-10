---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ffaf25745458452f2ab7c49872c07d82871bed456eb0f841c4bd90872185120f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Basic Insurance Ratios.md
---

**Basic Insurance Ratios** are the standard ratios — frequency, severity, pure premium, average premium, loss ratio, LAE ratio, expense ratios, combined ratio, retention and close ratios — that insurers, regulators, rating agencies and investors use to monitor whether a book's rates are adequate. Werner & Modlin introduce them together in Chapter 1 of *Basic Ratemaking*; the rest of [[Ratemaking|ratemaking]] is largely about projecting them.

> $$\begin{aligned} \text{Pure Premium} &= \frac{\text{Losses}}{\text{Exposures}} \\ &= \text{Frequency} \times \text{Severity} \end{aligned}$$

> $$\begin{aligned} \text{Loss Ratio} &= \frac{\text{Losses}}{\text{Premium}} \\ &= \frac{\text{Pure Premium}}{\text{Average Premium}} \end{aligned}$$

> $$\begin{aligned} \text{Combined Ratio} &= \frac{\text{Losses} + \text{LAE}}{\text{EP}} \\ &\quad + \frac{\text{UW Expenses}}{\text{WP}} \end{aligned}$$

- **Loss side.** [[Frequency]] is claims ÷ exposures (normally reported claims over [[Earned Exposure|earned exposures]]); [[Severity]] is losses ÷ claims (a *paid* severity uses paid losses on closed claims over closed counts, a *reported* severity uses reported losses over reported counts, with ALAE in or out); [[Pure Premium]] is losses ÷ exposures.
- **Premium side.** Average premium is premium ÷ exposures, with both on the **same basis** — written, earned or in-force. Once adjusted for rate changes, a moving average premium signals a shift in the mix of business ([[Premium Trend]]).
- **The LAE ratio is to losses, not premium:** $\text{LAE ratio} = \text{LAE}/\text{Losses}$ (allocated and unallocated). So the loss and LAE ratio is $\text{LR} \times (1 + \text{LAE ratio})$ — **not** the sum of the two.
- **Expense ratios.** The underwriting [[Expense Ratio|expense ratio]] measures expenses incurred at inception (commissions, other acquisition, taxes, licenses, fees) against written premium and expenses incurred through the term (general) against earned premium, then adds them. The **operating expense ratio** is $\text{OER} = \text{UW expense ratio} + \text{LAE}/\text{EP}$, and $\text{Combined Ratio} = \text{LR} + \text{OER}$ with the loss ratio *excluding* LAE — otherwise LAE is counted twice. See [[Combined Ratio]].
- **Marketing ratios.** $\text{Retention ratio} = \text{policies renewed} / \text{potential renewal policies}$ and $\text{Close ratio} = \text{accepted quotes} / \text{quotes}$ measure competitiveness rather than cost; they are watched after every [[Rate Change|rate change]] and feed [[Lifetime Value|lifetime value]] models.
- **Measuring the insurer as a whole.** For the company rather than one book, the combined ratio measures underwriting; the *investment income ratio* is investment income ÷ earned premium, and the *operating ratio* subtracts it from the combined ratio, so a combined ratio above 100% can still leave an operating ratio below it ([[Insurance Operations]]). Return on equity, net income ÷ net worth, measures the return to owners. The combined ratio a line needs to break even depends on how much investment income it earns: long-tail liability lines hold funds longer and can break even at a higher combined ratio than property lines.
- **Measuring the other goals.** An insurer's goals include meeting customer needs and legal requirements ([[Insurer Goals and Constraints]]), which are measured differently. A state *complaint index* divides the insurer's share of the state's complaints in a line by its share of the line's premium: 1.00 means complaints in proportion to its business, 2.00 twice as many as its share. Retention ratios show whether customers stay, and regulatory examinations and fines show compliance.
- Every ratio has variants (reported vs. paid, accident vs. calendar year, with or without ALAE, how a claim or a quote is counted), so its inputs must be documented — the same caution as on [[Loss Ratio]].

> [!example]- Computing the Full Set for One Year {Example}
> A personal lines book for one year: $40{,}000$ earned exposures; $2{,}400$ reported claims; reported losses $\$18{,}000{,}000$; LAE (ALAE and ULAE) $\$2{,}160{,}000$; earned premium $\$28{,}000{,}000$; written premium $\$30{,}000{,}000$; commissions, other acquisition, taxes, licenses and fees $\$5{,}400{,}000$; general expenses $\$1{,}680{,}000$.
>
> Compute the basic ratios.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Frequency} &= 2{,}400 / 40{,}000 = 6.0\% \\
> > \text{Severity} &= \$18{,}000{,}000 / 2{,}400 = \$7{,}500 \\
> > \text{Pure premium} &= 0.060 \times \$7{,}500 = \$450 \\
> > \text{Average premium} &= \$28{,}000{,}000 / 40{,}000 = \$700 \\
> > \text{Loss ratio} &= \$450 / \$700 = 64.29\%
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{LAE ratio} &= \$2{,}160{,}000 / \$18{,}000{,}000 = 12.0\% \\
> > \text{Loss \& LAE ratio} &= 64.29\% \times 1.12 = 72.0\% \\
> > \text{UW expense ratio} &= \tfrac{5.40}{30.0} + \tfrac{1.68}{28.0} \\
> > &= 18.0\% + 6.0\% = 24.0\% \\
> > \text{OER} &= 24.0\% + \tfrac{2.16}{28.0} = 31.71\% \\
> > \text{Combined ratio} &= 64.29\% + 31.71\% = 96.0\%
> > \end{align*}
> > $$
> >
> > The book keeps four cents of each premium dollar before investment income. Note that adding the $12\%$ LAE ratio straight onto the loss ratio would give $76.3\%$, overstating the loss and LAE ratio by more than four points.

> [!example]- Decomposing a Loss Ratio Movement {Example}
> From one year to the next, with no rate change: frequency fell from $6.00\%$ to $5.82\%$, severity rose from $\$7{,}000$ to $\$7{,}560$, and average earned premium rose from $\$660$ to $\$673.20$.
>
> How much did the loss ratio move, and why?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{LR}_1 &= \frac{0.0600 \times \$7{,}000}{\$660} = \frac{\$420}{\$660} = 63.6\% \\
> > \text{LR}_2 &= \frac{0.0582 \times \$7{,}560}{\$673.20} = \frac{\$440}{\$673.20} = 65.4\% \\
> > \frac{\text{LR}_2}{\text{LR}_1} &= \frac{0.97 \times 1.08}{1.02} \\
> > &= 1.0271
> > \end{align*}
> > $$
> >
> > The loss ratio rose $2.7\%$. Severity ($+8\%$) is the driver; lower frequency ($-3\%$) offsets part of it, so pure premium rose $4.8\%$. Average premium rose $2\%$ without any rate change — a shift toward higher-rated risks — which absorbed part of the pure premium increase. Each ratio points at a different question: severity at claim costs and [[Loss Trend|trend]], frequency at underwriting and the claim environment, average premium at the [[Mix of Business|mix of business]].

> [!example]- Measuring an Insurer's Overall Performance {Example}
> With illustrative figures in \$ millions, an insurer has earned premium of 500, incurred losses and LAE of 340, underwriting expenses of 150 and investment income of 45; its net income is 60 and its policyholders' surplus 400. In one state it received 30 of the 1,200 complaints filed in personal auto, where it writes 2% of the premium. Find its combined ratio, investment income ratio, operating ratio, return on equity and complaint index.
>
> > [!answer]-
> > For simplicity every ratio here uses earned premium.
> > $$
> > \begin{align*}
> > \text{CR} &= \frac{340 + 150}{500} \\
> > &= 98\% \\
> > \text{Investment income ratio} &= \frac{45}{500} \\
> > &= 9\% \\
> > \text{Operating ratio} &= 98\% - 9\% \\
> > &= 89\% \\
> > \text{ROE} &= \frac{60}{400} \\
> > &= 15\%
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > \text{Complaint index} &= \frac{30 / 1{,}200}{0.02} \\
> > &= \frac{0.025}{0.02} \\
> > &= 1.25
> > \end{align*}
> > $$
> > The insurer is profitable on underwriting and more so after investment income, but it draws 25% more complaints than its share of the market would suggest, a sign it may not be meeting customers' needs as well as its profit goal.

> [!tip]- How it appears on the exam
> - **Exam 5:** The ratios open *Basic Ratemaking*, and questions compute them from a year of data or decompose a loss ratio change into frequency, severity and average premium, as in the examples above.
> - **DISC-RM:** The overview of insurance operations covers measuring insurer performance. Questions compute a combined, investment income or operating ratio, explain why a combined ratio above 100% need not mean a loss, or ask how performance against non-financial goals, such as meeting customer needs, is measured.

> [!warning]- Exam traps
> - **The LAE ratio is to losses, not premium:** Adding it to the loss ratio double-counts; multiply instead, or divide LAE by premium for the operating expense ratio.
> - **Combined ratio is not total profit:** Investment income is outside it. The operating ratio brings it in.
> - **Same basis:** Average premium and the expense ratios must use premium on the basis stated, written or earned, or the ratio drifts with growth.
> - **A complaint index is relative:** It compares the insurer's share of complaints with its share of business. A large insurer with many complaints can still have an index below 1.00.

