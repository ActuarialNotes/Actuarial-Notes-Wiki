---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:eaf814d9501726a19e911a9ed1a2be17b7ad72d4dbd293e7c632a5850d6d1ffe
  sources:
    - "NAIC Unfair Trade Practices Act (#880, Spring 2024), ss.1, 4A, 4B, 4D-4F, 4H, 4I, 4K-4M, 6, 8A, sha256:e27f5324468298edb8af55d6166ac73a928c7fcd2571340a51bb342a1bf7367e — https://content.naic.org/sites/default/files/model-law-880.pdf"
    - "NAIC Unfair Claims Settlement Practices Act (#900, 1997), ss.1, 3, 4F, sha256:ba1d03c3819ae83500abaa0d6f50bba07a896d4be0ba26b84405095c131f6ba2 — https://content.naic.org/sites/default/files/model-law-900.pdf"
    - "GAO-03-433, Insurance Regulation: Common Standards and Improved Coordination Needed to Strengthen Market Regulation (2003), market analysis, comprehensive vs targeted exams, 1975 handbook, sha256:a19281e28511a6a0f19dd4e47fdd0ec2979f10afd26f3abb7ce30f6db54aca40 — https://www.gao.gov/assets/a239983.html"
    - "15 U.S.C. s.1013 (McCarran-Ferguson Act), via LII, section text and notes, sha256:12aef39131def2a132d65c7de84d47975d9938b1a5765a660f036c6b1efa0e6c — https://www.law.cornell.edu/uscode/text/15/1013"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/State Market Conduct Regulation.md
---

**State Market Conduct Regulation** is the U.S. states' supervision of how insurers and producers deal with consumers: how they advertise and sell, whom they insure and on what terms, how they handle complaints and how they settle claims. The Canadian counterpart is [[Market Conduct Regulation]].

Its main statutes are the state versions of two NAIC model laws:

1. The Unfair Trade Practices Act, for sales, advertising, underwriting and the treatment of consumers.
2. The Unfair Claims Settlement Practices Act, for claims ([[Unfair Claims Settlement Practices]]).

Its tools are market analysis, consumer complaints and market conduct examinations, backed by cease and desist orders, fines and license action.

## The Unfair Trade Practices Act

The Act regulates trade practices in the business of insurance, as the McCarran-Ferguson Act contemplates, by defining unfair methods of competition and unfair or deceptive acts and practices and prohibiting them. It prohibits:

| Practice | What is prohibited |
| :--- | :--- |
| Misrepresentation | Any illustration, sales presentation, omission or comparison that misrepresents a policy's benefits, terms or dividends, misrepresents an insurer's financial condition, or misrepresents in order to induce someone to buy, lapse, forfeit, exchange, convert or surrender a policy |
| False advertising | Any advertisement or statement about insurance that is untrue, deceptive or misleading |
| Defamation | Defaming an insurer's financial condition |
| Boycott, coercion and intimidation | Any agreement or concerted act of boycott, coercion or intimidation |
| False statements and entries | Knowingly false statements about an insurer's finances, false entries in its records, and false statements on an application to obtain a commission or other benefit |
| Unfair discrimination | Treating people of the same class and hazard differently (below) |
| Rebates and inducements | Offering any rebate of premium, or anything of value not specified in the policy, as an inducement to buy, except as state law expressly allows |

The commissioner may examine and investigate the affairs of any insurer or person, and after a hearing issue written findings and an order to cease and desist. The Act creates no private right to sue. A consumer's own remedy lies elsewhere, such as in contract or tort.

## Unfair discrimination

An insurer may not discriminate unfairly between people of the same class and the same expectation of life in life insurance, or of essentially the same hazard in health insurance. It may not refuse, cancel, non-renew or limit property and casualty coverage solely because of a risk's geographic location, unless sound underwriting and actuarial principles related to loss experience support it, or solely because of a home's age. Nor may it refuse or limit coverage because of a person's sex, marital status, race, religion or national origin.

> [!example]- Which unfair trade practice, if any, does each of these four describe? {Example}
> 1. A producer tells a client her existing policy will lapse worthless unless she replaces it, which is false, to earn a new commission.
> 2. An insurer stops renewing homeowners policies in one ZIP code with no loss or underwriting data supporting it.
> 3. An insurer declines to cover homes over 50 years old, whatever their condition.
> 4. An insurer charges smokers more for life insurance than nonsmokers of the same age.
>
> > [!answer]-
> > - (1) is misrepresentation to induce the lapse, exchange or surrender of a policy.
> > - (2) is unfair discrimination by geographic location, since sound underwriting and actuarial principles don't support it.
> > - (3) is unfair discrimination solely because of the age of the residential property.
> > - (4) is none. Smokers and nonsmokers are not of the same class and equal expectation of life, so a rate difference reflecting that is not unfair discrimination.

## Penalties

Under the Unfair Trade Practices Act, the most the commissioner may fine for $n$ violations is

> $$P = \min\big(1{,}000\,n,\ 100{,}000\big)$$

- $P$ is the maximum fine in dollars: $\$1{,}000$ a violation, up to $\$100{,}000$ in all.

If the violations were committed flagrantly in conscious disregard of the Act, the maximum fine is

> $$P_{\text{flagrant}} = \min\big(25{,}000\,n,\ 250{,}000\big)$$

The commissioner may also suspend or revoke the insurer's license if it knew or reasonably should have known it was violating the Act. States set their own amounts.

> [!example]- What is the most the commissioner may fine this insurer? {Example}
> A market conduct examination finds that the insurer's sales illustrations misrepresented policy dividends in 40 sales. The state follows the NAIC model's penalty limits. Find the maximum fine if the violations were not flagrant, and if they were committed flagrantly in conscious disregard of the law.
>
> > [!answer]-
> > - Not flagrant, $1{,}000 \times 40 = \$40{,}000$, under the $\$100{,}000$ cap, so $P = \$40{,}000$.
> > - Flagrant, $25{,}000 \times 40 = \$1{,}000{,}000$, over the $\$250{,}000$ cap, so $P_{\text{flagrant}} = \$250{,}000$.
> > - Either way the commissioner can also order the insurer to cease and desist, and could suspend or revoke its license if it knew or should have known it was breaking the law.

## Complaints and records

Insurers must keep their records so that data on complaints, claims, rating, underwriting and marketing can be retrieved for examination. They must also keep a complete register of complaints since the last examination, showing the number, the line, the nature, the disposition and the time to process each. A complaint is any written communication primarily expressing a grievance.

## Market analysis and examinations

Regulators gather and analyze information on companies, producers and markets to spot problems and trends. Consumer complaints, often their only window on a pattern of problems, help them choose which companies to examine. The examination then establishes whether there is a violation.

A market conduct examination is the regulator's review of a company's business practices. A *comprehensive* examination covers all or most of a company's operations, and a *targeted* one covers one or a few areas, such as sales practices, underwriting, policy provisions or claims payment. Most states rely mainly on targeted examinations, which take less time. The NAIC's market conduct examiners handbook, first issued in 1975, is a voluntary model.

Unfair claim settlement is defined in its own model law, which reaches only flagrant violations or a general business practice.

> [!trap] Calling any rate difference unfair discrimination
> Charging different rates to risks with different expected losses is not unfair discrimination. The Act forbids treating people of the same class and hazard differently, and it allows a refusal by location when sound underwriting and actuarial principles support it.
