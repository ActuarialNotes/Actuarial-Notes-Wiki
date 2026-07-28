# Where TOCs actually live

Concrete recipes per source tier. Read this when a search isn't landing, or when you
need to know what a given host will and won't give you.

Contents:
- [Search queries that work](#search-queries-that-work)
- [Tier 1 — the document itself](#tier-1--the-document-itself)
- [Tier 2 — publisher product pages](#tier-2--publisher-product-pages)
- [Tier 3 — library catalogues](#tier-3--library-catalogues)
- [Tier 4 — Google Books and Internet Archive](#tier-4--google-books-and-internet-archive)
- [Tier 5 — retailers](#tier-5--retailers)
- [Papers, preprints, and standards](#papers-preprints-and-standards)
- [Reading a MARC 505 contents note](#reading-a-marc-505-contents-note)
- [Failure modes worth recognising](#failure-modes-worth-recognising)

## Search queries that work

Generic "<title> table of contents" mostly returns retailer noise. Better:

```
"<exact title>" "<edition>" table of contents site:<publisher domain>
<isbn13> contents
"<title>" filetype:pdf                     # finds the free official copy
"<title>" site:catdir.loc.gov              # LoC's plain-HTML TOC pages (see Tier 3)
"<title>" sample pages filetype:pdf        # publisher samples open with the TOC
"<title>" "<author>" site:openlibrary.org
"<distinctive chapter title>" "<title>"    # confirms a chapter really exists
```

Two habits that pay off:

- Search the ISBN alone. Catalogue and retailer records are ISBN-keyed, so this is
  the query least likely to return a different edition.
- Search a distinctive chapter title you already have. If a candidate source is the
  right edition, the chapter comes back; if it doesn't, you probably have the wrong
  edition in hand.

## Tier 1 — the document itself

The best case, and common for actuarial material because so much of it is free.

| Publisher | URL shape | Notes |
|---|---|---|
| CAS | `casact.org/sites/default/files/…/<name>.pdf` | Werner & Modlin, Friedland, Statements of Principles |
| SOA | `soa.org/globalassets/assets/files/edu/<code>.pdf` | Study notes carry a code like `P-21-05` |
| ASB | `actuarialstandardsboard.org/asops/<slug>/` | Landing page links the ASOP PDF; sections are numbered 1–4 |
| arXiv | `arxiv.org/abs/<id>` → `arxiv.org/pdf/<id>` | Also an HTML render at `arxiv.org/html/<id>` for recent papers |
| PMC | `ncbi.nlm.nih.gov/pmc/articles/PMC<id>/` | Full text with section headings in HTML |
| NAIC / OSFI / IAA | varies | Regulator papers; often the only citable source for their own structure |

Check the vault before searching — `Resources/Books/*.md` frontmatter often already
holds the PDF URL in `Available from:`, and `Resources/{Regulation,Events,Benchmarks}`
pages carry `source_url` / `pdf_url`.

Working a PDF: use the `pdf` skill. The contents pages are almost always within the
first 15 pages, on roman-numbered front matter. If the PDF has bookmarks/outline,
that is the cleanest possible TOC — it is generated from the real headings.

For a paper with no contents page, the section headings *are* the TOC. Harvest them
in document order (`## 1. Introduction`, `## 2. Data`, …) and say that's what you did.

## Tier 2 — publisher product pages

Best source for a paywalled textbook, and edition-correct because the page *is* the
edition.

| Publisher | Where the TOC is |
|---|---|
| Springer | `link.springer.com/book/<doi>` — chapters listed individually with page ranges |
| Wiley | `wiley.com/en-us/…` — "Table of Contents" tab, full depth |
| Cambridge | `cambridge.org/…/<isbn>` — "Contents" tab |
| CRC / Routledge | `routledge.com/…/<isbn>` — full TOC inline |
| Pearson | `pearson.com/en-us/subject-catalog/p/…` — "Table of contents" section |
| AMS | `bookstore.ams.org/<code>` — "Table of Contents" link, sometimes a PDF |
| World Scientific | `worldscientific.com/worldscibooks/<doi>` — chapter list with abstracts |
| Elsevier | `shop.elsevier.com/books/…` — "Table of contents" accordion |
| ACTEX / ACTEX Learning | `actexlearning.com/…` — inconsistent; often only a sample-pages PDF, which does contain the TOC |

Publisher pages are frequently JavaScript-rendered. If a fetch returns a shell with
no TOC, try the print or `?tab=contents` variant, or fall back a tier rather than
concluding the TOC isn't there.

**The sample-pages PDF is the reliable trick here.** Most textbook publishers post a
free "sample" or "look inside" PDF, and those almost always open with the front
matter — meaning the complete, typeset, edition-correct TOC. Search
`"<title>" sample filetype:pdf` or look for a `/samples/` path on the publisher's
domain (ACTEX uses `actexlearning.com/samples/<TITLE>_<edition>_SAMPLE.pdf`). This
often beats the product page outright, because it is a scan of the actual book.

## Tier 3 — library catalogues

Genuine catalogue records, ISBN-keyed, chapter-level. Usually the fastest reliable
answer when the publisher page is unfetchable.

- **LoC CIP contents pages** — `catdir.loc.gov/catdir/toc/<batch>/<lccn>.html` is a
  plain-HTML, full table of contents that the Library of Congress captured at
  cataloguing time. No JavaScript, no paywall, complete to subsection level for many
  titles. There's no way to construct the URL from an ISBN, so find it by search:
  results titled "Table of contents for &lt;title&gt;" are these pages. Worth trying
  early — when it exists it's the best non-publisher source there is. (Caveat: it
  reflects the edition that was catalogued, so check the year.)
- **Open Library** — `openlibrary.org/isbn/<isbn>.json` returns edition JSON with a
  `table_of_contents` array when a librarian has entered one. Often absent; check
  rather than assume. `openlibrary.org/search.json?q=<title>+<author>` to find the
  edition key first.
- **Library of Congress** — `loc.gov/search/?q=<query>&fo=json`, or the item page
  plus `&fo=json`. The `notes`/`description` fields carry the 505 contents note.
- **WorldCat** — `search.worldcat.org/title/<oclc>`. Human-readable, no open API;
  fetch the HTML. This is also where the vault's
  `Find at your local library at:` links point.
- **University catalogues** — searching `"<title>" contents` alongside a large
  library's domain (many run Primo/Blacklight at `catalog.<uni>.edu`) turns up
  fuller 505 notes than LoC in some cases.

## Tier 4 — Google Books and Internet Archive

- **Google Books** — `books.google.com/books/about/…?id=<volumeid>` sometimes shows
  a "Contents" block with page numbers; the preview's own TOC pane is richer but not
  reliably fetchable. The API (`googleapis.com/books/v1/volumes?q=isbn:<isbn>`)
  returns metadata and a description, but essentially never a TOC — good for
  confirming edition/publisher/year, not for chapters.
- **Internet Archive** — `archive.org/details/<identifier>` for the item page and
  `archive.org/metadata/<identifier>` for its JSON. Scanned textbooks often expose a
  contents note; borrowable items include the actual TOC pages in the scan. Search
  with `archive.org/advancedsearch.php?q=<title>&output=json`.

## Tier 5 — retailers

Amazon, AbeBooks, RedShelf, Perlego, VitalSource, Barnes & Noble. Frequently carry a
complete TOC, and frequently carry the *previous edition's*, because listings get
recycled when a new edition ships. Amazon in particular merges editions under one
listing. Use to corroborate, or as a last resort with the source labelled. Cross-check
the chapter count against any other source before trusting one of these alone.

Scribd, Course Hero, Studocu, chegg-style sites, and "book summary" blogs are not
sources — they're reposts and paraphrases, unattributable to an edition.

## Papers, preprints, and standards

Different shape: sections, not chapters, and the authoritative structure is in the
document.

- **DOI first.** `doi.org/<doi>` redirects to the publisher landing page.
  `api.crossref.org/works/<doi>` returns title, authors, journal, year, and
  sometimes a `content-domain` — useful for pinning the version, not for sections.
- **Published vs preprint** structure differs after review. Say which you read.
- **arXiv** — the abstract page gives metadata; take headings from
  `arxiv.org/html/<id>` (recent papers) or the PDF.
- **ASOPs** — the four-section structure (1 Purpose/Scope/Effective Date,
  2 Definitions, 3 Analysis of Issues and Recommended Practices, 4 Communications)
  is standard, but the **subsection** titles under section 3 are what matter and
  they are specific to each standard. Take them from the PDF, and note that many
  ASOPs have been revised — match the version the syllabus assigns, not the current
  one, and say which.
- **CAS/SOA study notes** number sections idiosyncratically (roman numerals, letters,
  unnumbered headings). Keep whatever the document uses.

## Reading a MARC 505 contents note

Catalogue contents notes are one flat string, chapters separated by ` -- ` and
sometimes statements of responsibility by ` / `:

```
Combinatorial analysis -- Axioms of probability -- Conditional probability and
independence -- Random variables -- ...
```

Notes on turning one into a TOC:

- Separator is ` -- `; nested parts occasionally use ` ; `.
- Catalogue records often **lowercase everything after the first word** (as above).
  Title-case it to match the book — that's transcription normalisation, not
  rewriting.
- Chapter numbers are frequently stripped. Numbering them 1..n in the order given is
  safe *only* when the count matches a source that does number them; otherwise leave
  them unnumbered rather than asserting a numbering the record doesn't support.
- Notes are sometimes truncated with "…" or cover only part of the book. A truncated
  note is a partial TOC — label it as one.

`scripts/format_toc.py --flat "<the note>"` does the mechanical part.

## Failure modes worth recognising

- **Right book, wrong edition.** The most common bad outcome, and invisible in the
  result. Chapter count is the cheap check.
- **Instructor's/international/student edition.** Different chapter sets from the
  same title and year.
- **Volume splits.** Some texts ship as two volumes with independent numbering;
  confirm which volume the ISBN denotes.
- **Publisher page shows the series, not the book.** Springer series pages list
  *books*, not chapters — easy to mistake for a TOC.
- **A "contents" that's actually the index.** Index entries are alphabetical with
  page numbers; a TOC is document-ordered. If the list is alphabetical, it's an index.
- **Marketing bullets dressed as chapters.** Retailer "What you'll learn" lists look
  like TOCs and aren't.
