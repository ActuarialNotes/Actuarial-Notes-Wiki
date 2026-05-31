**Chain Ladder Method** (also called the development method or link ratio method) is a loss reserving technique that projects cumulative losses to ultimate by multiplying each accident year's latest reported losses by a cumulative development factor (CDF) derived from historical age-to-age patterns.

> $$\text{Ultimate}$$
>
> $$= \text{Latest Reported} \times \text{CDF}_{\text{age} \to \text{ult}}$$

> $$\text{IBNR} = \text{Ultimate} - \text{Reported}$$

- Key steps: build a cumulative loss triangle, calculate age-to-age factors, select factors (simple average, volume-weighted, or latest $n$-year), chain them into CDFs, then multiply each accident year's diagonal by its CDF
- The method assumes **historical development patterns are stable** — it is purely data-driven with no external adjustment for expected losses
- Best suited for **mature accident years** with credible reported emergence; for immature years, the [[Bornhuetter Ferguson Method]] is preferred because actual data is thin
- The volume-weighted factor $f = \Sigma(\text{losses at age }n{+}1) / \Sigma(\text{losses at age }n)$ gives more credibility to larger accident years

> [!example]- Chain Ladder Projection {Example}
> Cumulative incurred losses ($000s): AY 2022 — 575 @ 12mo, 875 @ 24mo, 1,025 @ 36mo; AY 2023 — 600 @ 12mo, 900 @ 24mo; AY 2024 — 625 @ 12mo.
>
> Selected factors: $f_{12\text{-}24} = 1.500$, $f_{24\text{-}36} = 1.170$, tail $= 1.081$
>
> > [!answer]-
> > $\text{CDF}_{12\text{-ult}} = 1.500 \times 1.170 \times 1.081 = 1.896$; $\;\text{CDF}_{24\text{-ult}} = 1.170 \times 1.081 = 1.265$
> >
> > AY 2024 (12 mo): $625 \times 1.896 = \$1{,}185{,}000$
> >
> > AY 2023 (24 mo): $900 \times 1.265 = \$1{,}139{,}000$
> >
> > AY 2022 (36 mo): $1{,}025 \times 1.081 = \$1{,}108{,}000$ (tail only)
> >
> > Total IBNR $= (1{,}185 + 1{,}139 + 1{,}108) - (625 + 900 + 1{,}025) = \$882{,}000$
