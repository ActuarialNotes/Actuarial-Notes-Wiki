---
id: "discda-an-020"
exam: "Exam DISC-DA"
topic: "Web Scraping"
learning_objective: "3. Preparing Data for Analysis"
difficulty: medium
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Web+Scraping
  - Concepts/External+Data
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:466e35848bb3d27e097b8c092abfb789360ff2098220757b8e7502935ae4662d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-020.md
---

An insurer wants year built and square footage for its homeowners book. A property-data provider offers both fields through an API under a licence, with documented definitions. The same fields also appear on a public real estate listing site whose terms of use prohibit automated collection. Which course is better?

- A) Scrape the listing site, since data shown on a public page are free to use
- B) Scrape the listing site, since scraped values are checked by the site's owner
- C) Use either source, since an API and a scraper return equally reliable fields
- D) Use the licensed API, whose fields are defined and whose terms allow the use

## Explanation

An API returns structured fields with documented definitions under stated terms of access. Scraping takes whatever a page displays, breaks when the layout changes, carries no field definitions, and here would breach the site's terms of use. The licensed API is the better source, though legal and compliance review of using the fields for underwriting or pricing is still needed. The answer is **D**.

**Why not the others**

- **A** — being able to read a public page does not grant permission to collect it at scale; terms of use, copyright and privacy law can all apply.
- **B** — listing values are typed by whoever wrote the page and can be out of date. Nothing makes them checked.
- **C** — the two are not equivalent: one has definitions and terms of access, the other has neither.
