# The Store

The **Store** (`/store`, in the sidebar after Projects) gathers the real products an
actuarial candidate buys — **exam registration**, **study materials**, the
**calculators** the exams allow and the syllabus **textbooks** — and sends the reader to
the page where each is sold. **Nothing is sold on Actuarial Notes.** Every product opens
a sheet of what its seller says about it, and the sheet's one button goes to the seller,
in a new tab.

The **Gem Shop** (`/store/gems`) is a corner of it: the characters, skins, banners and
Actuaria ships bought with the gems earned for correct answers. It is the one place in
the Store where anything is bought in the app. Before the Store existed it *was* `/store`;
the old `?tab=` links (`/store?tab=ships`, the Hangar's) are sent on to it.

## The rules

1. **Transcribed, never constructed.** The vault's rule (`docs/verification.md`,
   `docs/mock-exam-browser.md`) holds for every product: a name is the seller's title for
   it, a price is the price its page showed on the date the product carries, a list of
   contents is what the page says is included — condensed, never added to — and a quote
   is verbatim. A fact the page doesn't state is **absent**, and the Store shows nothing
   in its place: no estimated price, no "about", no invented edition. Where a seller's own
   pages disagree with each other (a manual that is "14 full length exams" in one place and
   "3 practice exams" in another), the Store takes neither.
2. **Every price carries its date and its page.** Prices go stale. Each offer has a
   `checked` date, and the sheet prints it under the button beside a link to the page, so
   a reader can check before buying. Re-read a page and move its date *together*, never
   one without the other.
3. **Out, not in.** The buttons are plain links to the sellers (`target="_blank"`,
   `rel="noopener noreferrer"`), and each sheet says nothing is sold here. A click is
   recorded as `store_outbound_clicked` (`lib/analytics.ts`: product, seller, aisle) — the
   one thing the Store learns.
4. **Nothing is fetched from a seller just by browsing.** The sellers' logos are copies in
   `quiz/public/store-sellers/` — the files their sites serve, resized — never hotlinks,
   for the reason `lib/resourceMeta.ts` gives for the "Get a copy" logos. The one live
   request is a textbook's Amazon price, asked when its sheet opens
   (`lib/amazonPrice.ts`), and only on a deployment with Associates credentials.
5. **Products are drawn, not photographed.** A card leads with an illustration of the
   *kind* of thing it is — a hardback for a study manual, a screen for a video course, a
   pile of answered question cards for a practice bank, a gift box for a bundle, a laptop
   for an online course — painted in the exam's own accent (`lib/examColors.ts`), so a
   shelf narrowed to Exam FM is FM's indigo and the whole Store runs the ramp from blue to
   red (`components/store/ProductArt.tsx`). Calculators are drawn from what tells the
   models apart — lines on the display, body, highlight keys, a financial calculator's TVM
   row, a solar strip — in the objects' own colours: a black calculator is black in either
   theme, which is why those few hexes are not tokens. A textbook shows its cover from the
   vault.

## The shelf

| Aisle | Built from | What a card is |
|---|---|---|
| **Registration** | `data/examFees.ts` (the fee table, also the study guide info panel's "Fee" row) and the sittings tables (`data/examSittings.ts`, `data/examSittingDetails.ts`) — plus the DISC course packages, which include the exam | a **ticket**: the exam's logo and fee above a perforation, the window and the deadline on the stub |
| **Study materials** | `STUDY_PRODUCTS` in `data/storeCatalog.ts` | a product card: the drawing, the kind, the name, the seller, the price ("From" when the page offers choices) |
| **Calculators** | `CALCULATORS` and `CALCULATOR_POLICIES` in `data/storeCatalog.ts` | a product card with the bodies whose lists carry it |
| **Textbooks** | `virtual:store-books` (`lib/storeBooks.ts`) | the book's cover |

Two choices narrow it, and both ride the URL (`?exam=FM&aisle=study`) so Back and a shared
link keep them: the **exam strip** — the ladder's logos left to right, a radiogroup — and
the **aisle pills**. With no aisle chosen, an aisle shows six products and "See all": for
the whole Store, one exam at a time up the ladder (`showcase`), and for registration the
ones open now, soonest deadline first (`registrationUrgency`); the aisle itself stays in
ladder order. Study materials stand exam by exam, and within an exam like with like —
manuals, courses, practice, flashcards, bundles — cheapest first.

Below the pills, three **refinements** narrow every aisle at once, each in the URL too
(`?free=1&price=under-100&by=ACTEX+Learning`, repeated for several): **Free** (every price
nothing, or a textbook its publisher puts online), **Price** (bands on the lowest price an item
is sold at — under $100, $100–$299, $300–$599, $600 and up; an item with no printed price is in
none) and **Publisher / author** (the seller, the examining body or a book's publisher, and the
people a product's "By" line or a book's Authors names — `splitPeople` drops credentials, roles
and team names, and `canonicalAuthors` joins "Weishaus" to "Abraham Weishaus" when the shelf
has exactly one such full name). OR within a filter, AND across them; with any refinement on,
the aisles show every match rather than a preview.

A card leads with its picture, the exam's tile in the picture's top-left corner (a
calculator's SOA / CAS verdicts there instead), and ends on one line: the seller on the left,
the price on the right.

### Comparing study materials

**Compare study materials** opens one exam's study materials as a table
(`components/store/CompareSheet.tsx`, `comparisonFor` / `comparisonFactLabels`): a column per
product, like with like and cheapest first, and a row for the kind, the price (its range, and
the lowest on the table marked), the options, what's included, every fact any of them states
(Format, Access, Author, Edition…), the exam windows, the reviews and the date the page was
read, ending in each seller's link. A seller that doesn't state something gets a dash, never a
guess. The table's own exam strip moves between exams; its kind pills narrow the columns.

### Reviews

`data/storeReviews.ts` quotes what candidates and sellers say, from three places: **r/actuary**
(read through the Arctic Shift archive, which keeps a comment's text as posted — Reddit's own
site refuses the session's requests), the **Actuarial Outpost** forum, and **the seller's own**
reviews or testimonials. Every quote is copied from the page it links to, cut only at an
ellipsis, never reworded, with its author as shown and its date; the selection follows what the
threads say rather than picking the praise. A seller's aggregate rating is carried only when its
page prints one (`PUBLISHER_RATINGS`). The sheet shows a tally by source, then the quotes, newest
first; a card shows the count beside its kind; the comparison has a row for them.
`storeReviews.test.ts` holds each to a known product, a link on its source's own domain, a date
no later than the day they were gathered and a quotable length. To add one: read the post,
copy the words, record the permalink and date — and when a product's threads turn critical, the
quotes should too.

### The disclaimer

Every listing ends in the same legal notice (`storeDisclaimer` in `lib/store.ts`), naming its own
seller and the date its page was read: independent of the seller and the examining bodies, marks
used only to identify, details transcribed and governed by the seller's page, nothing sold here,
reviews their authors' opinions, provided "as is" with no advice and no paid placement. The
Store's footer and the comparison table carry it too. Change the wording there, once.

### Registration

A registration is assembled, not authored: for each exam with a transcribed fee, the fee
(`EXAM_FEES` — one table, so the ticket and the info panel can't disagree), the exam's
facts from `EXAM_ABOUT`, and where its registration stands (`registrationStatus`):

- **open** — the first published sitting whose deadline hasn't passed: "Register by
  Dec 15 · in 74 days", amber in the last fortnight (§4.1, *due*);
- **opens** — that sitting has a published opening date still to come ("Registration
  opens the week of Oct 26" — SOA dates P's by the week, and the milestone's label says
  so);
- **closed** — the next published sitting's registration has closed;
- **unscheduled** — no sitting published yet.

A deadline transcribed into `examSittingDetails.ts` replaces the one its sittings row
carries — the timeline's rule — so PCPA's December project, whose row has none, reads
its December 9 from the details. The sheet draws the sitting with the study guide's own
`SittingTimeline`. A fee paid in parts prints as its parts ("$300 + $700"), not a total
that would read as one payment. The DISCs have no CAS fee — "The course fee includes one
attempt at the exam" — so their registration is The Institutes' course package, which
stands in this aisle; `storeCatalog.test.ts` holds that only a product whose every option
"Includes Exam Fee" may.

### Study materials

Each product is one seller's page: its title, its options (licence lengths, print or
digital, with or without videos, packages — grouped the way the page groups them, and
drawn as a grid when they are a ladder of access lengths), what's included, its format,
edition, author and access, and a sentence of its own description. The sellers are the
providers on the CAS's own list of study-aid vendors ("Seminars and Study Aids",
casact.org) and the established providers of SOA Exams P and FM; ASM's manuals and Howard
Mahler's guides are listed under The Actuarial Bookstore, where both send their buyers.

### Calculators

The SOA and the CAS list the same six entries, and the Store has one card per entry —
"TI-30XS MultiView (or XB battery)" is one card with the TI-30XB as its twin, as the lists
have it. Facts and features are Texas Instruments' (the BA-35's from its Quick Reference
Guide, the only page TI keeps for it); prices are retailers' listings. Each body's rules
(memory cleared at the door, how many calculators, what happens if you forget one — the
CAS embeds a digital TI-30XS MultiView in its exams) are kept in their words.
`storeCatalog.test.ts` pins every card to the exact line it occupies on both lists.

### Textbooks

`lib/storeBooks.ts` reads the vault at bundle time: every `Resources/Books` page typed
Textbook or Casebook with an ISBN that at least one exam's `Source Material` lists, with
each exam's assigned chapters. It is the study guides' own reading list, so a book added
to an exam's sources is on the shelf at the next build. A book's sheet offers a library
(WorldCat) and Amazon — never the shadow library the resource page's "Get a copy" menu
also lists — and links back to its page in the study guide. A book the publisher puts
online free wears a **Free online** sticker.

## Files

| File | What |
|---|---|
| `quiz/src/pages/Store.tsx` | The page: header, exam strip, aisle pills, shelves, Gem Shop row (lazy route) |
| `quiz/src/pages/GemShop.tsx` | The gem cosmetics shop, `/store/gems` |
| `quiz/src/components/store/StoreCards.tsx` | Ticket, product card, book card, the exam chips and price |
| `quiz/src/components/store/ProductSheet.tsx` | The product sheet, per aisle — with its reviews and disclaimer |
| `quiz/src/components/store/CompareSheet.tsx` | The comparison table of one exam's study materials |
| `quiz/src/components/store/useStoreDialog.ts` | What both dialogs do while open: focus, Tab, Escape, scroll lock |
| `quiz/src/components/store/ProductArt.tsx` | The drawings |
| `quiz/src/components/store/SellerLogo.tsx` | A seller's logo tile, monogram fallback |
| `quiz/src/lib/store.ts` | Types, aisles, exams, prices, registration status, the shelf (pure, tested) |
| `quiz/src/lib/storeBooks.ts` | The textbook aisle from the vault (pure, tested; runs in `vite.config.ts`) |
| `quiz/src/data/storeCatalog.ts` | Sellers, study materials, calculator policies and calculators |
| `quiz/src/data/storeReviews.ts` | The quoted reviews and the sellers' printed ratings |
| `quiz/src/data/examFees.ts` | The exam fee tables |
| `quiz/public/store-sellers/` | The sellers' logos |
| `quiz/public/review-sources/` | Reddit's logo (Actuarial Outpost serves only its web host's default icon, so it gets a monogram) |

## Adding or updating a product

1. Read the seller's page — the HTML, its JSON-LD or the data the page itself draws its
   price from. A price only a script can show, behind a bot check, is left out rather than
   guessed.
2. Add or edit the entry in `data/storeCatalog.ts` with today's `checked` date. A new seller
   needs a `STORE_SELLERS` entry and its logo in `public/store-sellers/` (the site's own
   icon — `apple-touch-icon` or the largest favicon — resized to 96px).
3. `npm test` — `data/storeCatalog.test.ts` checks every offer goes to the domain of the
   seller it names, every date and price is well formed, every exam is one the shelf
   knows, every calculator is on the list it claims, and every logo is in the bundle.
