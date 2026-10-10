---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5cb9c9cf2154787fe9fbd70ce20fe91d6931fee9fc0b5036becb20b948dc5fb6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Corporate Bond.md
---

A **Corporate Bond** is a debt security issued by a company, promising [[Coupon|coupons]] and the return of principal on fixed dates, whose value depends on the issuer's ability to pay as well as on interest rates. For an insurer it is the core income asset of the general account: it pays more than a government bond of the same term because the holder bears [[Credit Risk|credit risk]], and the extra yield, the **credit spread**, is compensation for expected default losses plus premia for bearing default and downgrade risk and for giving up liquidity.

> $$s = y_{\text{corp}} - y_{\text{govt}}$$

> $$s \approx PD \times LGD + \pi_{\text{risk}} + \pi_{\text{liq}}$$

> $$\frac{\Delta P}{P} \approx -D_s \, \Delta s$$

- **Symbols:** $y_{\text{corp}}$ and $y_{\text{govt}}$ are the yields of the corporate bond and a government bond of matching term. $PD$ is the annual probability of default and $LGD = 1 - R$ the share lost on default, as on [[Credit Risk]]. $\pi_{\text{risk}}$ pays for defaults that cluster in recessions and for downgrades, $\pi_{\text{liq}}$ pays for the cost and difficulty of selling, and $D_s$ is the **spread duration**, the percentage price change per unit change in the spread.
- **Seniority and security:** A bond's place in the [[Capital Structure|capital structure]] sets its recovery. Secured bonds are backed by a lien on specific assets, senior unsecured bonds rank with other general creditors, and subordinated bonds are paid only after senior debt, so recoveries fall in that order.
- **Covenants:** The indenture limits what the issuer may do, for example how much more debt it may take on or what it may pay out to shareholders. Investment grade bonds carry few covenants, while high yield indentures carry more, because the holder needs protection against the issuer levering up or selling assets.
- **Embedded options:** A [[Callable Bond|callable bond]] lets the issuer repay early, usually when rates fall, which caps the price gain and creates [[Reinvestment Risk|reinvestment risk]]; many investment grade bonds carry a make-whole call, priced off a Treasury yield plus a small spread, that costs the issuer too much to use for refinancing. A putable bond gives the holder the right to sell back at par, and a sinking fund retires part of the issue each year, which shortens the average life. Each is an [[Embedded Option|embedded option]] valued in the price.
- **Investment grade and high yield:** [[Rating Agency|Rating agencies]] split the market at BBB- (Moody's Baa3). Investment grade bonds are rated BBB- or better, and high yield bonds, rated BB+ or below, have higher default rates, lower recoveries and far wider spreads. A U.S. insurer's capital charge follows the NAIC designation, roughly NAIC 1 for A and above, NAIC 2 for BBB and NAIC 3 to 6 for high yield, under [[Risk-Based Capital|risk-based capital]].
- **Why spreads exceed expected loss:** Expected loss is a small part of an investment grade spread. The rest is the risk and liquidity premia, which is why an insurer can earn a credit risk premium by holding the bonds to maturity and why booking the whole spread as profit overstates the return.
- **Where the risks sit:** A corporate bond carries [[Interest Rate Risk|interest rate risk]] through its [[Duration|duration]], default risk, downgrade risk through [[Credit Rating Migration|rating migration]] and liquidity risk. The spread and the government yield can move independently, so a portfolio manager hedges or measures them separately.

> [!example]- Decomposing a BBB Spread {Example}
> A 10-year BBB corporate bond held by a life insurer yields 5.40%, and the 10-year Treasury yields 4.10%. The insurer's credit model gives a one-year default probability of 0.30% and an expected recovery of 40%. Split the spread into expected loss and the residual premium.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > s &= 5.40\% - 4.10\% \\
> > &= 1.30\% \\
> > PD \times LGD &= 0.0030 \times (1 - 0.40) \\
> > &= 0.18\% \\
> > \pi_{\text{risk}} + \pi_{\text{liq}} &= 1.30\% - 0.18\% \\
> > &= 1.12\%
> > \end{align*}
> > $$
> > Only 18 of the 130 basis points pay for the defaults the insurer expects. The other 112 basis points pay for bearing risk that rises in recessions and for illiquidity. A buy-and-hold insurer with stable liabilities can earn much of that premium, but it should still hold capital for the years when defaults cluster.

> [!example]- Price Loss from a Downgrade {Example}
> The same bond is priced at 101.50 and has a spread duration of 6.5. The issuer is downgraded from BBB to BB, and its spread widens from 130 to 280 basis points while Treasury yields are unchanged. Estimate the new price, and say what the downgrade means for the insurer's capital.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \Delta s &= 2.80\% - 1.30\% \\
> > &= 1.50\% \\
> > \frac{\Delta P}{P} &\approx -6.5 \times 0.015 \\
> > &= -9.75\% \\
> > P_{\text{new}} &\approx 101.50 \times (1 - 0.0975) \\
> > &= 91.60
> > \end{align*}
> > $$
> > The bond loses about 9.9 points without any default. Moving from BBB to BB also moves it from NAIC 2 to NAIC 3, which raises its risk-based capital charge, so a "fallen angel" costs the insurer both market value and capital. Positive spread convexity would make the true loss slightly smaller than the duration estimate.

> [!tip]- How it appears on the exam
> - **INV-101:** Learning outcome 1a asks for the cash flow characteristics, risks and portfolio role of corporate bonds, from Fabozzi's chapter on corporate bonds and the high-yield primer. Written answers describe the features of an issue (seniority, covenants, call or sinking fund) and say how each changes the holder's risk.
> - **Calculations:** A short calculation splits a spread into expected loss and premium, or estimates a price change from a spread change with spread duration.
> - **Portfolio role:** Questions ask why an insurer holds investment grade credit against long liabilities, and how it fits with [[Asset-Liability Management|asset-liability management]], alongside [[Mortgage Loan|mortgages]], [[Private Debt|private debt]] and [[Leveraged Loan|leveraged loans]].

> [!warning]- Exam traps
> - **Spread is not expected loss:** Treating the whole spread as the market's estimate of default loss overstates default probabilities by several times for investment grade bonds. Subtract $PD \times LGD$ and call the rest a premium.
> - **Use LGD, not PD alone:** Expected loss multiplies the default probability by the loss given default. Using $PD$ alone ignores recovery and roughly doubles the loss on a senior unsecured bond with a 40% recovery.
> - **Spread duration versus duration:** For a fixed-rate bond, spread duration and [[Modified Duration|modified duration]] are close, but for a floating-rate note the rate duration is near zero while the spread duration is not. Using the rate duration for a spread shock on a floater understates the loss.
> - **Callable bonds:** A call caps the price near the call price, so the price rise from a spread tightening is smaller than the duration estimate suggests. Use effective duration for a bond whose cash flows depend on rates.
