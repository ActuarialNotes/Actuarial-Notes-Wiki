---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2dc26f038afe0abe1789df002dc63688a0441f55959736c61c64178a95541b71
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Corporate Bond.md
---
A **Corporate Bond** is a debt security issued by a company, promising [[Coupon|coupons]] and the return of principal on fixed dates. Its value depends on the issuer's ability to pay as well as on interest rates. It pays more than a government bond of the same term because the holder bears [[Credit Risk|credit risk]], and the extra yield is the **credit spread**. The credit spread $s$ is

> $$s = y_{\text{corp}} - y_{\text{govt}}$$

- $y_{\text{corp}}$ is the yield of the corporate bond.
- $y_{\text{govt}}$ is the yield of a government bond of matching term.

The spread is compensation for expected default losses, plus premia for bearing default and downgrade risk and for giving up liquidity. Split that way, the spread is approximately

> $$s \approx PD \times LGD + \pi_{\text{risk}} + \pi_{\text{liq}}$$

- $PD$ is the annual probability of default.
- $LGD = 1 - R$ is the share lost on default, where $R$ is the recovery rate, as on [[Credit Risk]].
- $\pi_{\text{risk}}$ pays for defaults that cluster in recessions and for downgrades.
- $\pi_{\text{liq}}$ pays for the cost and difficulty of selling.

Expected loss is a small part of an investment grade spread. The rest is the risk and liquidity premia, so an insurer can earn a credit risk premium by holding the bonds to maturity, and booking the whole spread as profit overstates the return.

> [!example]- How much of this BBB bond's spread pays for expected defaults? {Example}
> A 10-year BBB corporate bond held by a life insurer yields 5.40%, and the 10-year Treasury yields 4.10%. The insurer's credit model gives a one-year default probability of 0.30% and an expected recovery of 40%.
>
> > [!answer]-
> > - The spread is $5.40\% - 4.10\% = 1.30\%$, or 130 basis points.
> > - The expected loss is $PD \times LGD = 0.0030 \times (1 - 0.40) = 0.18\%$.
> > - The risk and liquidity premia are $1.30\% - 0.18\% = 1.12\%$.
> > - Only 18 of the 130 basis points pay for the defaults the insurer expects. The other 112 pay for bearing risk that rises in recessions and for illiquidity.

## Spread duration

The spread and the government yield can move independently, so the price change from a change in the spread alone is measured separately. For a change $\Delta s$ in the spread, the percentage price change is approximately

> $$\frac{\Delta P}{P} \approx -D_s \, \Delta s$$

- $P$ is the bond's price.
- $D_s$ is the **spread duration**, the percentage price change per unit change in the spread.

For a fixed-rate bond, spread duration and [[Modified Duration|modified duration]] are close. For a floating-rate note the rate duration is near zero while the spread duration is not, so using the rate duration for a spread shock on a floater understates the loss.

> [!example]- What is this bond's price after its downgrade? {Example}
> The BBB bond above is priced at 101.50 and has a spread duration of 6.5. The issuer is downgraded from BBB to BB, and its spread widens from 130 to 280 basis points while Treasury yields are unchanged.
>
> > [!answer]-
> > - The spread change is $\Delta s = 2.80\% - 1.30\% = 1.50\%$.
> > - The price change is $\Delta P / P \approx -6.5 \times 0.015 = -9.75\%$.
> > - The new price is about $101.50 \times (1 - 0.0975) = 91.60$, a loss of about 9.9 points without any default.
> > - Moving from BBB to BB also moves the bond from NAIC 2 to NAIC 3, which raises its [[Risk-Based Capital|risk-based capital]] charge, so a "fallen angel" costs the insurer both market value and capital.

## Seniority, security and covenants

A bond's place in the [[Capital Structure|capital structure]] sets its recovery. Secured bonds are backed by a lien on specific assets. Senior unsecured bonds rank with other general creditors, and subordinated bonds are paid only after senior debt, so recoveries fall in that order.

The indenture limits what the issuer may do, for example how much more debt it may take on or what it may pay out to shareholders. Investment grade bonds carry few covenants. High yield indentures carry more, because the holder needs protection against the issuer levering up or selling assets.

## Embedded options in corporate bonds

A [[Callable Bond|callable bond]] lets the issuer repay early, usually when rates fall, which caps the price gain and creates [[Reinvestment Risk|reinvestment risk]]. Many investment grade bonds carry a make-whole call, priced off a Treasury yield plus a small spread, which costs the issuer too much to use for refinancing. A putable bond gives the holder the right to sell back at par. A sinking fund retires part of the issue each year, which shortens the average life. Each is an [[Embedded Option|embedded option]] valued in the price, and for a bond whose cash flows depend on rates, effective duration replaces modified duration.

## Investment grade and high yield

[[Rating Agency|Rating agencies]] split the market at BBB- (Moody's Baa3). Investment grade bonds are rated BBB- or better. High yield bonds, rated BB+ or below, have higher default rates, lower recoveries and far wider spreads. A U.S. insurer's capital charge follows the NAIC designation, roughly NAIC 1 for A and above, NAIC 2 for BBB and NAIC 3 to 6 for high yield, under [[Risk-Based Capital|risk-based capital]].

## Risks of a corporate bond

A corporate bond carries [[Interest Rate Risk|interest rate risk]] through its [[Duration|duration]], default risk, downgrade risk through [[Credit Rating Migration|rating migration]], and liquidity risk. A portfolio manager hedges or measures the interest rate and spread risks separately. Against long liabilities, investment grade credit is held as part of [[Asset-Liability Management|asset-liability management]], alongside [[Mortgage Loan|mortgages]], [[Private Debt|private debt]] and [[Leveraged Loan|leveraged loans]].

> [!trap] Treating the whole spread as expected loss
> Reading the whole spread as the market's estimate of default loss overstates default probabilities by several times for investment grade bonds. Expected loss is $PD \times LGD$, not $PD$ alone, and the rest of the spread is a premium. In the BBB example, only 18 of the 130 basis points are expected loss.
