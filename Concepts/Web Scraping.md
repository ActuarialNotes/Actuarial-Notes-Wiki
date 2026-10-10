---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b26262aa9e33b311fab2a02ab576bd1856790cf41d539850e8c65fc559a2cb2f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Web Scraping.md
---

**Web Scraping** is the automated extraction of data from web pages: a program requests each page, parses its HTML and pulls out the values it needs into a structured table. It is one of two ways to collect data from online sources, the other being an application programming interface (API), which returns the data already structured under the provider's terms. Insurers use online sources to add [[External Data|external data]] such as building characteristics, business descriptions and public records to their own policy and claim data.

> $$u = m \times c$$

> $$T_{\text{crawl}} = N_{\text{requests}} \times d$$

- **Symbols:** $m$ is the match rate, the share of the insurer's records for which a page was found, and $c$ is the completeness of a field on the pages found. Their product $u$ is the share of records that end up with a usable value. In the second block, a crawl that waits $d$ seconds between requests, as a site's rules or good practice require, takes $T_{\text{crawl}}$ seconds to make $N_{\text{requests}}$ requests.
- **Scraping versus an API:** An API returns structured fields, such as JSON, with documented definitions, and the provider grants access under stated terms and rate limits. Scraping takes whatever the page displays, so it breaks when the site's layout changes, and its fields carry no definitions. Where an API or a licensed data feed exists, it is usually the better source.
- **Parsing:** A scraper locates each value by the page's structure, such as an HTML tag, a class name or a table position, and then cleans it into a typed field. Free text like "Built 1978, renovated 2015" has to be turned into a year built and a renovation year, and units such as square feet and square metres have to be standardized.
- **Terms of use and legal limits:** A site's terms of use may forbid automated collection, and its `robots.txt` file states which pages crawlers may visit and how fast. Copyright, contract, computer misuse and privacy laws can all apply, especially where the pages hold personal information. Collecting the data legally does not settle whether using it for underwriting or pricing is permitted, so legal and compliance review comes before the crawl.
- **Ethical limits:** Collecting data people did not expect an insurer to use raises the consent and transparency concerns of [[Data Ethics|data ethics]], and a scraped variable can act as a proxy for a protected characteristic. The responsible approach is to collect only the fields the model needs and to document their source.
- **Data quality of scraped data:** Scraped values are self-reported by whoever wrote the page, can be out of date, and cover only the properties or businesses that happen to be listed. The listed records are rarely a random sample of the book, so a low match rate can bias a model, and the values should be validated against an independent source, such as assessment records, before use.
- **Where it fits:** Scraped data are loaded through the same [[Data Pipeline|pipeline]] as other sources, often into a [[Data Mart|data mart]] for the project, and pass through the same [[Data Validation|validation]] checks.

> [!example]- Building Characteristics from Public Listings {Example}
> An insurer wants year built and square footage for 12,000 homeowners policies. It plans to match each insured address to a public real estate listing and scrape the two fields. A pilot finds a listing for 65% of addresses. On the listings found, year built is present 92% of the time and square footage 85% of the time. The site's `robots.txt` asks for a 5-second delay between requests, and each address needs 2 requests, a search and a listing page. How many policies get each field, and how long does the crawl take?
>
> > [!answer]-
> > The usable share for each field is the match rate times that field's completeness.
> > $$
> > \begin{align*}
> > u_{\text{year}} &= 0.65 \times 0.92 \\
> > &= 0.598 \\
> > u_{\text{area}} &= 0.65 \times 0.85 \\
> > &= 0.5525 \\
> > T_{\text{crawl}} &= 24{,}000 \times 5 \\
> > &= 120{,}000 \text{ seconds}
> > \end{align*}
> > $$
> > About 7,176 policies get a year built and 6,630 get a square footage, and the crawl takes about 33.3 hours. Four in ten policies get no value, and listed homes tend to be the ones recently sold, so the insurer should compare the matched and unmatched policies before using the field. It should also check whether the site's terms permit the collection and whether an assessment-roll API offers the same fields with definitions.

> [!example]- Parsing a Listing into Fields {Example}
> A listing page shows `<li class="facts">Built: 1978 (renovated 2015)</li>` and `<li class="facts">Size: 1,850 sq ft</li>`, and another listing on the same site shows `<li class="facts">Size: 172 m2</li>`. Turn these into the fields `year_built`, `renovation_year` and `sq_ft`, and name the quality issues.
>
> > [!answer]-
> > The first listing gives `year_built` = 1978, `renovation_year` = 2015 and `sq_ft` = 1,850, once the comma and the units are stripped. The second listing gives an area in square metres, which converts at 10.7639 square feet per square metre.
> > $$
> > \begin{align*}
> > \text{sq\_ft} &= 172 \times 10.7639 \\
> > &= 1{,}851
> > \end{align*}
> > $$
> > The parser must therefore read the unit, not just the number, or the second home would be recorded as 172 square feet and fail a range check. The renovation note matters for underwriting, since a renovated 1978 home may have newer wiring and plumbing than its year built suggests. Both values are what the seller wrote, so they are self-reported and unverified.

> [!tip]- How it appears on the exam
> - **DISC-DA:** Questions contrast scraping a web page with calling an API, ask about the risks of scraped data (legal, ethical and quality), or ask what an analyst should check before using data extracted from an online source. This objective is taught alongside data marts, so a question may ask where extracted data are stored for a project.
> - **Applied questions:** A scenario describes an insurer that wants a characteristic it does not collect and asks for the best way to obtain it. The answer weighs an API or licensed source against scraping, and names the terms-of-use and data-quality checks either way.

> [!warning]- Exam traps
> - **Public is not free to use:** Data visible on a public page can still be protected by the site's terms of use, copyright or privacy law. Being able to read a page does not grant permission to collect it at scale or to use it for pricing.
> - **An API is not just faster scraping:** An API comes with documented fields and terms of access, while scraping has neither. Answers that treat the two as equivalent in reliability or legality miss the point of the comparison.
> - **Match rate bias:** The records that match an online source are seldom a random sample of the book. A field available for 60% of policies can bias a model toward the kinds of risk that are listed online.
> - **Scrapers break silently:** When a site changes its layout, a scraper may return blanks or values from the wrong field without any error. Each run needs completeness and range checks, not just the first one.
