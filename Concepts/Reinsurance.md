**Reinsurance** is a transaction in which a primary insurer (cedent) transfers a portion of its loss exposure to a reinsurer in exchange for a ceded premium, reducing the cedent's net liability and providing protection against large individual losses or catastrophes.

- **Proportional reinsurance**: the reinsurer shares a fixed percentage of losses and premiums — quota share (flat %) and surplus share (scaled by policy limit) are the main forms
- **Non-proportional (excess of loss) reinsurance**: the reinsurer pays losses exceeding a retention per occurrence or per accident year; catastrophe XL covers aggregate event losses above a threshold
- Net losses must be projected separately from gross: $\text{Net Ultimate} = \text{Gross Ultimate} - \text{Ceded Ultimate}$; ceded [[IBNR]] is often modeled using its own [[Development Triangle|development triangle]] since ceded development lags gross development
- Reserve uncertainty is amplified for ceded and net positions because reinsurance contracts introduce coverage disputes, commutations, and potential reinsurer insolvency

> [!example]- Calculating Net Losses Under Quota Share {Example}
> A cedent has gross ultimate losses of \$$5{,}000{,}000$ for an accident year. It has a 40% quota share treaty (reinsurer takes 40% of all losses). Calculate net ultimate losses.
>
> > [!answer]-
> > $$\text{Ceded Ultimate} = 0.40 \times \$5{,}000{,}000 = \$2{,}000{,}000$$
> > $$\text{Net Ultimate} = \$5{,}000{,}000 - \$2{,}000{,}000 = \$3{,}000{,}000$$
> > The cedent retains 60% of ultimate liability; separate IBNR projections are needed for gross and ceded triangles.
