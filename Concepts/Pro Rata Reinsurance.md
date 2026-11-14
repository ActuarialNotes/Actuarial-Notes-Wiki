---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:738fcc74a2437bf9b0b18552f44b1cb19b87a07cf483698bea88398acecd6195
  sources:
    - "Clark, Basics of Reinsurance Pricing (CAS study note, rev. 2014), §1A pp.3–4, §1B pp.9–12, §2A pp.14–15, casualty layers pp.22–23, 27, sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/2021-03/8_Clark.pdf"
    - "Myers, Reinsurance Overview (NAMIC Directors' Education, 9 May 2017), slides pp.6–17 (functions, types, facultative uses, pro rata, per-risk/cat XOL, types of reinsurers, marketing), sha256:c8c7fe0c3bbd0f5d327147142f007ff9d13af260c71da725eb9973a0700121a4 — https://www.namic.org/pdf/reinsuranceRe/17dbc_ReinsuranceOverview.pdf"
    - "IRMI glossary, 'surplus share', sha256:ed71737b7b895e79a3c5a11fdd70d35675c6d78baf97a62dd3ae544c84f66d13 — https://www.irmi.com/term/insurance-definitions/surplus-share"
    - "IRMI glossary, 'ceding commission', sha256:88a3389009b6868cb1b320484faec2ea1d2e744f5e74e14631b2cebe31600323 — https://www.irmi.com/term/insurance-definitions/ceding-commission"
    - "IRMI glossary, 'pro rata reinsurance', sha256:87029130ba567ffc15e84988e1569b5582477b2cb4c4f27db17e5717c4a85c6f — https://www.irmi.com/term/insurance-definitions/pro-rata-reinsurance"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Pro Rata Reinsurance.md
---

**Pro Rata Reinsurance** (proportional reinsurance) is reinsurance in which the reinsurer takes a stated percentage of the premium on the business reinsured and pays the same percentage of every loss on it, usually returning part of the premium to the ceding insurer as a ceding commission. Its two main forms are [[Quota Share|quota share]], where the percentage is the same for every policy, and [[Surplus Share|surplus share]], where the percentage depends on how far each risk's value exceeds the cedant's retained line.

[[Excess of Loss|Excess of loss]] reinsurance, by contrast, pays only the part of a loss above the retention.

## Quota share

If a quota share cedes the percentage $a$, the part of a loss $X$ the reinsurer pays is

> $$\text{Ceded}_{\text{QS}} = a \times X$$

The reinsurer receives a flat percentage of the premium for the book reinsured and pays that percentage of its losses, usually including allocated loss adjustment expense. Because every policy is shared alike, a quota share reduces the cedant's net premium and net losses in proportion without changing the shape of its results. It is also how an insurer can leave a territory or line, by ceding 100% of the business until the policies run off.

## Surplus share

The cedant keeps up to a fixed amount of each risk, its retained line, and cedes the part of the insured value above it, up to the treaty's number of lines. The cession percentage of a risk is

> $$s = \frac{\min\big(\max(V - R,\ 0),\ N R\big)}{V}$$

- $V$ is the risk's insured value.
- $R$ is the retained line.
- $N$ is the number of lines the treaty provides.

The treaty's capacity is $NR$, and a risk worth more than $R + NR$ leaves the excess with the cedant unless it buys more reinsurance. The part of a loss $X$ on the risk that the reinsurer pays is

> $$\text{Ceded}_{\text{SS}} = s \times X$$

In a surplus share the retention is used only to fix the risk's cession percentage. Once that is fixed, the reinsurer pays its share of every loss on the risk, however small. Small risks are retained entirely and large ones are mostly ceded, which evens out the cedant's net amount at risk per policy. A line guide can set different retentions by class.

> [!example]- What are each risk's cession percentage and its ceded and retained loss under this surplus share? {Example}
> A property insurer has a surplus share treaty with a retained line of \$250,000 and 4 lines.
>
> | Risk | Insured value | Loss |
> | :--- | ---: | ---: |
> | A | \$200,000 | \$50,000 |
> | B | \$750,000 | \$300,000 |
> | C | \$2,000,000 | \$400,000 |
>
> > [!answer]-
> > - The treaty's capacity is $4 \times 250{,}000 = \$1{,}000{,}000$, so it covers risks up to \$1,250,000 in full.
> > - Risk A is below the retained line, so $s_A = 0$ and the cedant keeps the \$50,000 loss.
> > - For risk B, $s_B = 500{,}000 / 750{,}000 = 66.67\%$. The reinsurer pays \$200,000 and the cedant keeps \$100,000.
> > - For risk C, $s_C = \min(1{,}750{,}000,\ 1{,}000{,}000) / 2{,}000{,}000 = 50\%$. The reinsurer pays \$200,000 and the cedant keeps \$200,000.
> > - Risk B's loss is less than its value, yet two-thirds of it is ceded. An excess of loss treaty with the same \$250,000 retention would have ceded only \$50,000.

## Ceding commission

The reinsurer pays the cedant a ceding commission to compensate it for the underwriting and acquisition expenses it incurred to write the business. The premium is ceded in the same percentage as the losses, and the commission is

> $$\text{Commission} = c \times \text{Ceded premium}$$

- $c$ is the ceding commission rate.

The commission offsets the cedant's expenses on the ceded share, and in practice it is the price of a proportional treaty. A sliding scale commission moves with the treaty's loss experience between a minimum and a maximum. In Clark's illustration the provisional commission is 30%, the minimum 25% at a 65% loss ratio, rising one point per point of loss ratio to 35% at a 55% loss ratio, then half a point per point to a maximum of 45% at a 35% loss ratio. A profit commission instead pays the cedant a share of the treaty's profit after losses, the ceding commission and the reinsurer's margin.

## What it does for the cedant

Proportional reinsurance supplies capacity, because surplus supports only so much premium and ceding part of it lowers the net premium the insurer carries against its surplus. It gives surplus relief to a growing insurer whose premium and unearned premium are outpacing its surplus, with the commission offsetting the expenses on the share ceded. It also makes the risks the cedant retains more alike, which stabilizes its results. Surplus share also adds large-line capacity, letting an insurer write a risk far larger than it could retain alone.

> [!example]- What does this quota share cede, and how does it change the insurer's net premium-to-surplus ratio? {Example}
> An insurer writes \$40 million of premium a year on a book with an expected loss ratio of 62%, and has \$12 million of surplus. It considers a 30% quota share with a 32% ceding commission. Ignore the treaty's effect on surplus itself.
>
> > [!answer]-
> > - The ceded premium is $0.30 \times 40 = \$12$ million.
> > - The commission is $0.32 \times 12 = \$3.84$ million, which offsets the expenses the insurer paid to write the ceded share.
> > - The expected ceded losses are $0.30 \times 0.62 \times 40 = \$7.44$ million.
> > - The net premium is $40 - 12 = \$28$ million.
> > - The premium-to-surplus ratio falls from $40/12 = 3.33$ to $28/12 = 2.33$, so the same surplus supports more new writing.

> [!trap] Treating a surplus share as excess of loss
> The reinsurer pays its percentage of every loss on a ceded risk, including small ones. Subtracting the retention from the loss treats the treaty as excess of loss.
