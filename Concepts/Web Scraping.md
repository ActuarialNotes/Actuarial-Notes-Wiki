---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:a7b3767ae45ba0fdcd334fc2e85e142304158b96a7f3b1d9de072fc94d5286da
  sources:
    - "Wickham, Çetinkaya-Rundel & Grolemund, R for Data Science (2e), Ch.24 'Web scraping', §24.1 (use an API where possible: more reliable data), §24.2 ethics and legalities (terms of service, PII, copyright; public, non-personal, factual data; wait between requests), §24.3-24.4 (HTML elements, id/class attributes, CSS selectors), §24.6 (if the structure of the site changes, the scraping code must change), sha256:460c5ef7b2c93b577eb9edf35c23ac336e97c997fbaf552e08e9df004ec5c817 — https://r4ds.hadley.nz/webscraping.html"
    - "IETF RFC 9309, Robots Exclusion Protocol (Sept. 2022), §2.2 the protocol defines allow/disallow rules for paths; §2.2.4 records that are not part of the protocol (e.g. Sitemaps) MAY be interpreted by crawlers; §2.1 rules are not a form of access authorization, sha256:bbaa280636d3e38f0a1a130a5ce40e9753db1ed18c860945b0bf795ff8dc1a87 — https://www.rfc-editor.org/rfc/rfc9309.html"
    - "NIST SP 811, Guide for the Use of the SI, Appendix B.9, B.9 conversion factors: square foot (ft2) to square meter (m2) 9.290 304E-02, sha256:64d01ada3f09299eeaa3eab7fbb6a6fa78438aa35813cafdbb6b7f2b829371c9 — https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9"
    - "Vermont DFR Insurance Bulletin No. 229 (Mar. 12, 2024), adopting the NAIC Model Bulletin on Use of AI Systems by Insurers: unfair discrimination, bias analysis, data lineage/currency, third-party data and AI systems (§§3-4), sha256:0fa2eb6c77c4fad493df0b53612e9fd4cb815834300d37433713caaa70c215a5 — https://dfr.vermont.gov/sites/finreg/files/regbul/dfr-insurance-bulletin-229-ai.pdf"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Web Scraping.md
---

**Web Scraping** is the automated extraction of data from web pages: a program requests each page, parses its HTML and pulls out the values it needs into a structured table. Insurers use online sources to add [[External Data|external data]] such as building characteristics, business descriptions and public records to their own policy and claim data.

Scraping is one of two ways to collect data from online sources. The other is an application programming interface (API), which returns the data already structured under the provider's terms.

| | API | Web scraping |
| --- | --- | --- |
| What it returns | Structured fields, such as JSON | Whatever the page displays |
| Field definitions | Documented | None |
| Terms of access | Granted by the provider, with stated terms and rate limits | Set by the site's terms of use, which may forbid it |
| When the site changes its layout | Unaffected | The scraper breaks |

Where an API or a licensed data feed exists, it is usually the better source.

## Usable share of records

If a page is found for a share $m$ of the insurer's records (the match rate), and a field is present on a share $c$ of the pages found (its completeness), the share of records that end up with a usable value is

> $$u = m \times c$$

Scraped values are self-reported by whoever wrote the page, can be out of date, and cover only the properties or businesses that happen to be listed. The listed records are rarely a random sample of the book, so a low match rate can bias a model. The values should be validated against an independent source, such as assessment records, before use.

> [!example]- How many policies get each field? {Example}
> An insurer wants year built and square footage for 12,000 homeowners policies. It plans to match each insured address to a public real estate listing and scrape the two fields. A pilot finds a listing for 65% of addresses. On the listings found, year built is present 92% of the time and square footage 85% of the time.
>
> > [!answer]-
> > - The usable share for year built is $0.65 \times 0.92 = 0.598$, so about 7,176 policies get a year built.
> > - The usable share for square footage is $0.65 \times 0.85 = 0.5525$, so about 6,630 policies get a square footage.
> > - Four in ten policies get no value, and listed homes tend to be the ones recently sold, so the insurer should compare the matched and unmatched policies before using the fields.

## Parsing

A scraper locates each value by the page's structure, such as an HTML tag, a class name or a table position, and then cleans it into a typed field. Free text like "Built 1978, renovated 2015" has to be turned into a year built and a renovation year, and units such as square feet and square metres have to be standardized.

> [!example]- What values of `year_built`, `renovation_year` and `sq_ft` should a scraper record from these listings? {Example}
> One listing page shows `<li class="facts">Built: 1978 (renovated 2015)</li>` and `<li class="facts">Size: 1,850 sq ft</li>`. Another listing on the same site shows `<li class="facts">Size: 172 m2</li>`.
>
> > [!answer]-
> > - Once the comma and the units are stripped, the first listing gives `year_built` = 1978, `renovation_year` = 2015 and `sq_ft` = 1,850.
> > - The second listing gives an area in square metres, which converts at 10.7639 square feet per square metre: $172 \times 10.7639 = 1{,}851$ square feet.
> > - The parser must read the unit, not just the number, or the second home would be recorded as 172 square feet and fail a range check.
> > - Both values are what the seller wrote, so they are self-reported and unverified.

## Terms of use and legal limits

A site's terms of use may forbid automated collection, and its `robots.txt` file sets allow and disallow rules for the pages crawlers may visit (the Robots Exclusion Protocol, RFC 9309). A crawl-delay line asking crawlers to slow down is a non-standard extension that some crawlers honour. Waiting between requests is good practice either way. A crawl that waits $d$ seconds between requests takes, in seconds, a time of

> $$T_{\text{crawl}} = N_{\text{requests}} \times d$$

- $N_{\text{requests}}$ is the number of requests the crawl makes.

Copyright, contract, computer misuse and privacy laws can all apply, especially where the pages hold personal information. In the United States, *R for Data Science* gives a general principle that public, non-personal, factual data is likely to be lower risk. Courts have generally not held browse-wrap terms of service binding without some explicit assent, such as creating an account, and copyright does not protect facts. Personal information is the main exception, and the position differs elsewhere, as in Europe. Collecting the data legally does not settle whether using it for underwriting or pricing is permitted, so legal and compliance review comes before the crawl.

> [!example]- A site asks for 5 seconds between requests, and each of 12,000 addresses needs 2 requests. How long does the crawl take? {Example}
> - The crawl makes $12{,}000 \times 2 = 24{,}000$ requests, a search and a listing page for each address.
> - It takes $24{,}000 \times 5 = 120{,}000$ seconds, about 33.3 hours.

## Ethical limits

Collecting data people did not expect an insurer to use raises the consent and transparency concerns of [[Data Ethics|data ethics]], and a scraped variable can act as a proxy for a protected characteristic. The responsible approach is to collect only the fields the model needs and to document their source. Scraped data are loaded through the same [[Data Pipeline|pipeline]] as other sources, often into a [[Data Mart|data mart]] for the project, and pass through the same [[Data Validation|validation]] checks.

> [!trap] Treating public data as free to use
> Data visible on a public page can still be restricted, by terms of service the collector has agreed to, by copyright in content that is more than facts, or by privacy law where it is personal. Public, non-personal, factual data is the lower-risk case, and being able to collect data does not settle whether it may be used for pricing.
