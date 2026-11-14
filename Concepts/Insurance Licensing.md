---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:19641d6d165e719f294fb17dcc7564f5cd8b3539cab6eca47ef0cceb10da4956
  sources:
    - "NAIC Nonadmitted Insurance Model Act (#870, Summer 2023), s.3 definitions (exempt commercial purchaser, CPI adjustment), s.5A diligent search, s.5C(2) eligibility, s.5D home state, sha256:00383df09c6d2d91bce6836f20c24d591be44649acae74fc0ed50c01083da04f — https://content.naic.org/sites/default/files/model-law-870.pdf"
    - "15 U.S.C. s.8202 (NRRA), via LII, (a), sha256:cf4e57fcddec7fd2f98ed13c40e1ef9b71228f42bdb68e9bf9cfcb55c5321808 — https://www.law.cornell.edu/uscode/text/15/8202"
    - "15 U.S.C. s.8201 (NRRA), via LII, (a), sha256:0b1eb5ec89a52bc7a819e3e1308158542a156880973a2e1ed07c65562d5c8465 — https://www.law.cornell.edu/uscode/text/15/8201"
    - "NAIC Producer Licensing Model Act (#218, 2005), ss.2, 4, 6, 7, 8, 12, 14, 15, sha256:5b1eafdc7b1a841a97440f0e1e7c98e30c935855de4add58838c0f76aee37a34 — https://content.naic.org/sites/default/files/model-law-218.pdf"
    - "NAIC Public Adjuster Licensing Model Act (#228, Spring 2025), s.2 definition, s.3, s.12 bond, s.15 contract, sha256:9d317f813d94b58570ffcf2396dbbf9040c5a8b594e06b29e389fb98303c2b28 — https://content.naic.org/sites/default/files/model-law-228.pdf"
    - "NAIC Glossary of Insurance Terms, Domestic Insurer, Foreign Insurer, Alien Company, Admitted Company, Nonadmitted Insurer, Public Adjuster, Independent Adjuster, Prior Approval Law, read via WebFetch 2026-10-10 (host refuses scripted fetch, no hash) — https://content.naic.org/glossary-insurance-terms"
    - "NAIC testimony (Csiszar), Senate Commerce Committee, Oct 22 2003, PDF p.3 (\"one overriding reason\"); p.5 (UCAA), sha256:b465c2a47d11ff54d304ff2c91a26987265d74208a77e37fdb2c6c65157c1d1a — https://content.naic.org/sites/default/files/naic_archive/testimony_0310_csiszar.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Licensing.md
---

**Insurance Licensing** is the state's control over who may transact insurance. An [[Insurer|insurer]] may not do business in a state without a license from its insurance department, and the people who sell insurance or adjust claims for the public must hold licenses of their own.

Licensing admits only insurers that meet capital and other standards and only [[Insurance Producer|producers]] who have passed an examination. It also lets the regulator suspend or revoke a license when the rules are broken.

## Licensing insurers

An insurer may not transact insurance in a state unless it holds a license in force there or is exempt. The license, often called a certificate of authority, is issued for particular lines, and the NAIC's Uniform Certificate of Authority Application lets an insurer apply to many states on one form.

An insurer is *domestic* in the state where it is domiciled and licensed, *foreign* in every other U.S. state where it sells insurance, and *alien* if it was formed under the laws of another country. An Ohio insurer writing in Indiana is domestic in Ohio and foreign in Indiana. The domiciliary state leads the insurer's solvency supervision ([[Solvency Monitoring]]), while each state where it is licensed regulates its business there.

An admitted insurer is licensed in the state, so its rates, forms and conduct are subject to that state's rules. A nonadmitted insurer is not licensed there, and dealing with one is generally prohibited except through a lawful route, chiefly surplus lines.

> [!example]- How is each of these three insurers classified in Indiana? {Example}
> Three insurers write business in Indiana:
>
> 1. An insurer incorporated and licensed in Indiana.
> 2. An insurer domiciled in Ohio and licensed in Indiana.
> 3. An insurer formed in Bermuda, not licensed in Indiana, that writes Indiana risks through a surplus lines broker.
>
> > [!answer]-
> > - The first is domestic and admitted. Indiana is its domicile, so Indiana leads its financial supervision.
> > - The second is foreign and admitted. It is licensed in Indiana but domiciled in Ohio, so Ohio leads its financial supervision while Indiana regulates its Indiana business.
> > - The third is alien and nonadmitted. It was formed under another country's law and holds no Indiana license.
> > - It may write in Indiana only as an eligible surplus lines insurer, which for an alien insurer means appearing on the NAIC's Quarterly Listing of Alien Insurers.

> [!trap] Foreign means another state, alien another country
> A Canadian insurer licensed in New York is alien there, not foreign. A New Jersey insurer is foreign in New York.

## Surplus lines

Surplus lines insurance is placed by a licensed surplus lines broker with an *eligible* nonadmitted insurer, usually after a diligent search shows the full amount or type of cover is not available from admitted insurers. A nonadmitted insurer escapes the state's rate and form rules, but the broker must be licensed and the insurer must be eligible. Only the insured's home state's rules and tax apply to a nonadmitted placement. See [[Excess and Surplus Lines]].

A U.S.-domiciled surplus lines insurer must be authorized for the line in its home jurisdiction and meet a capital test, and an alien insurer must be on the NAIC's Quarterly Listing of Alien Insurers. Under the NAIC Nonadmitted Insurance Model Act, the capital and surplus a U.S.-domiciled nonadmitted insurer needs to be eligible, $CS_{\text{req}}$, is

> $$CS_{\text{req}} = \max\big(CS_{\text{state}},\ 15{,}000{,}000\big)$$

- $CS_{\text{state}}$ is the state's own minimum for a licensed insurer.

The commissioner may accept less on an affirmative finding, but never less than $\$4{,}500{,}000$. Large commercial buyers that qualify as *exempt commercial purchasers* skip the diligent search.

> [!example]- Is this surplus lines placement allowed? {Example}
> A manufacturer wants a $\$10{,}000{,}000$ product recall policy that no admitted insurer in its home state will write. The surplus lines broker proposes a nonadmitted insurer domiciled in Texas, authorized there to write the line, with capital and surplus of $\$12{,}000{,}000$. The home state follows the NAIC model and its minimum for licensed insurers is $\$5{,}000{,}000$. The manufacturer employs a risk manager, paid $\$250{,}000$ of commercial property and casualty premium last year and has revenue of $\$80{,}000{,}000$.
>
> > [!answer]-
> > - The insurer must hold $\max(\$5{,}000{,}000,\ \$15{,}000{,}000) = \$15{,}000{,}000$ of capital and surplus.
> > - At $\$12{,}000{,}000$ it falls short, but it is above the $\$4{,}500{,}000$ floor, so the commissioner may still accept it on an affirmative finding.
> > - The manufacturer has a risk manager, more than $\$100{,}000$ of premium and revenue above $\$50{,}000{,}000$, so it is an exempt commercial purchaser and no diligent search is needed. These dollar thresholds are the model's, and some states index them to inflation.
> > - The placement is allowed only if the commissioner makes the affirmative finding.

## Licensing producers

Under the NAIC Producer Licensing Model Act, no one may sell, solicit or negotiate insurance for a line without a license for that line of authority. A resident applicant must be at least 18, pass the state's examination, complete any prelicensing course the state requires, pay the fees and have committed no act that is a ground for denial. The lines include life, accident and health, property, casualty, variable life and variable annuity, personal lines and credit. The license must be renewed, with continuing education. The license itself gives no authority to bind an insurer, which needs an agency contract or appointment.

An insurer itself, and its officers or employees who receive no commission and whose work is administrative, underwriting, loss control, inspection or claims, are exempt, as are salaried employees advising their own employer on its insurance.

A producer licensed and in good standing in the home state receives a nonresident license in another state on application and payment, where the home state does the same for that state's residents, with no further examination. In states that require it, a producer who acts as an insurer's agent must be appointed by that insurer, which files a notice of appointment and must notify the commissioner within 30 days if it terminates the producer for cause.

The commissioner may refuse, suspend, revoke or not renew a producer license, place it on probation or fine the producer. The causes include false statements on the application, misappropriating premiums, misrepresenting policy terms, a felony conviction, unfair trade practices, fraud or incompetence, and losing a license in another state. No insurer or producer may pay a commission to a person who must be licensed and is not.

> [!example]- Which of these people need a producer license? {Example}
> 1. An insurer's salaried underwriter who decides whether to accept applications and earns no commission.
> 2. An agency employee who quotes auto policies to callers, recommends limits and is paid a commission on each sale.
> 3. A producer licensed in Georgia who wants to sell homeowners insurance to Florida residents.
> 4. A producer who was convicted of a felony after being licensed.
>
> > [!answer]-
> > - The underwriter needs no license. An employee doing underwriting, with no commission, is exempt.
> > - The agency employee needs one. Quoting and recommending coverage for a commission is selling, soliciting and negotiating.
> > - The Georgia producer needs a nonresident license. Being licensed and in good standing in Georgia, she can obtain a Florida nonresident license without a Florida examination, if Georgia grants the same to Florida residents.
> > - The convicted producer still needs the license, and a felony conviction is a ground on which the commissioner may suspend or revoke it.

## Adjusters

A *public adjuster* negotiates first-party property claims for the insured, for a fee, and under the NAIC Public Adjuster Licensing Model Act must be licensed, post a bond or letter of credit, use a written contract with the insured, and never pose as the insurer's adjuster. An *independent adjuster* is a contractor adjusting losses for insurers. Whether staff and independent adjusters need a license varies by state.
