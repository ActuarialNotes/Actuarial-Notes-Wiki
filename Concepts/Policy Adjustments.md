**Policy Adjustments** are the modifications applied to a raw loss amount — [[Deductible|deductibles]], [[Coinsurance|coinsurance]], and [[Benefit Limit|benefit limits]] — that transform the ground-up loss $X$ into the insurer's net payment. Applied in sequence, they determine the payment random variable from the loss random variable.

> [!example]- A loss of \$$8{,}000$ occurs under a policy with a \$$1{,}000$ deductible, 80% coinsurance, and a \$$5{,}000$ benefit limit. What does the insurer pay?
> 1. Apply deductible: $8{,}000 - 1{,}000 = 7{,}000$.
> 2. Apply coinsurance: $0.80 \times 7{,}000 = 5{,}600$.
> 3. Apply benefit limit: $\min(5{,}600,\ 5{,}000) = 5{,}000$.
>
> The insurer pays \$$5{,}000$.
