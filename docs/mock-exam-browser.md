# The Mock Exam browser (past papers)

The **Mock Exam** source on the quiz builder (`quiz/src/pages/Landing.tsx`) is a browser of
the exam's **past sittings**, not a single generated draw. Scrolling the shelf shows every
paper the exam has released, how many questions each one holds, and — once the figures are
filled in — the sitting's **effective pass ratio**.

This replaced a row of pills (`Mix · Spring 2019 · Spring 2018 · …`) in the bottom action
bar. A pill can carry a label and nothing else: it couldn't say how long a paper was, how
hard it turned out to be, or that a sitting exists but hasn't been imported yet.

## The three pieces

| File | Role |
|---|---|
| `quiz/src/data/pastExams.ts` | The authored catalogue: which sittings exist, plus their published statistics |
| `quiz/src/lib/pastExams.ts` | Pure read side: merges the catalogue with the question bank into `PastExamRow[]` |
| `quiz/src/components/PastExamBrowser.tsx` | The shelf UI |

### Rows come from the catalogue *and* the bank

`buildPastExamRows(questions, exam)` unions two sources:

- **The catalogue** (`PAST_EXAM_SITTINGS`) — every sitting that really happened, including
  the ones with no questions in the bank. These render greyed out and unselectable, marked
  "Not added yet". This is the point of the browser: a candidate sees the exam's real
  history rather than "whatever has been converted so far", and knows a paper is coming.
- **The question bank** — any `(year, session)` pair present in `questions/<exam-id>/*.md`
  for the exam. A newly converted paper therefore appears in the browser the moment its
  questions land, whether or not anyone remembered to add it to the catalogue.

**Except questions the syllabus moved.** A question re-tagged onto this exam from another
one carries `originally_exam` in its frontmatter and keeps the `year`/`session` of the paper
it was really sat on — so its date names a sitting of the *other* exam.
`isFromAnotherExamsPaper` (in `lib/parser.ts`) skips those, in the row builder and in the
`filterQuestions` sitting filter alike. Without it the bank half of the union invents papers:
the CAS moved Time Series, Statistical Learning and PCA from MAS-I to MAS-II, and the 23
re-tagged MAS-I 2018 questions would otherwise raise an **MAS-II Spring 2018** row — a
sitting half a year before MAS-II first existed — and pad the real **MAS-II Fall 2018** paper
with 11 questions nobody sat on it. The questions themselves are untouched and still reachable
by topic; they simply never claim to be a paper.

Rows sort **newest first**, with Fall ahead of Spring within a year. Session strings in
frontmatter are inconsistent (`Spring`, `spring`, `Sp`), so `normalizeSession` folds them —
without it one sitting splits into two rows.

The first entry in the shelf is always **Mix**: the generated, syllabus-distributed mock
exam (`MOCK_EXAM_QUESTIONS` in `Landing.tsx`), which is what Mock Exam meant before there
was a browser. Selecting it is `selectedSitting === null`, exactly as before.

### Scope of the catalogue

Only sittings whose papers the examining body released publicly. CAS stopped publishing past
papers, answer keys and examiners' reports when the exams moved to CBT, so the shelf ends at
**Fall 2019** for Exam 5, MAS-I and MAS-II alike. It starts where each exam does: Exam 5 at
Spring 2011, MAS-I at Spring 2018, and MAS-II at **Fall 2018** — MAS-II was introduced half a
sitting behind MAS-I, so it has three released papers, not four. Exam P and Exam FM have
**no** sittings — the SOA publishes a rolling sample-question set rather than dated papers —
so their browser is the Mix row alone, with the sample-questions PDF linked underneath.

A sitting is transcribed from the examining body's list, never inferred from what the bank
happens to hold — the same rule the pass ratios below follow, and for the same reason: a row
is a claim that a paper exists and can be sat.

## Pass-rate statistics

`PastExamStats` carries three optional figures per sitting: `candidates`, `passRate`, and
`effectivePassRate`. The browser leads with the **effective** ratio — the raw pass ratio
with candidates who scored under half the pass mark removed, i.e. the pass rate among
people who made a serious attempt — because that's the number a candidate is actually
comparing themselves against. It falls back to the raw ratio when only that is known.

**These are real-world figures, so they are only ever transcribed, never estimated.** They
arrive one of two ways — live from the publisher, or authored into the catalogue as a
floor.

Until a sitting has a figure from either source, the browser shows no statistics column at
all (`hasPublishedStats`) — a shelf of em-dashes reads as a broken readout — and the header
links out to the exam's lookup page (`PASS_RATE_LOOKUP`) instead. One figure lights the
column for the whole shelf.

### Live figures (`api/pass-rates.js`)

The examining bodies serve no CORS headers, so the browser cannot fetch these tables
itself — the request is blocked before it starts. The fetch therefore happens server-side:

```
PastExamBrowser ← Landing ← applyPassRates(rows, records)
                              ↑
              hooks/useExamPassRates → GET /api/pass-rates?exam=Exam%205
                                              ↓  (Vercel function)
                                        fetch(source) → extractPassRateRecords()
```

| Piece | Where |
|---|---|
| Fetch + cache headers + failure handling | `api/pass-rates.js` |
| Table parsing (pure, no network) | `api/lib/passRates.js` |
| Client cache, sanitising, overlay | `quiz/src/lib/passRates.ts` |
| The hook the builder calls | `quiz/src/hooks/useExamPassRates.ts` |

**Configuring a source.** Nothing is fetched until an operator sets `PASS_RATE_SOURCES` on
the Vercel project — a JSON object of exam → source, so the endpoint can be re-aimed at a
moved page without a redeploy:

```json
{ "Exam 5": { "url": "https://…/exam-statistics", "format": "html" } }
```

`format` is `html` (default), `csv`, `tsv` or `json`. Confirm the source permits automated
fetching before pointing at it; the fetcher identifies itself honestly in its User-Agent
and requests the page once per CDN cache window (six hours fresh, a week of
stale-while-revalidate), not once per user.

**Parsing is by column heading, not by selector.** `extractPassRateRecords` reads every
table on the page, matches headings (`DATE`/`SITTING`, `EXAMS TAKEN`, `PASS RATIO`,
`EFFECTIVE PASS RATIO`, …) and keeps the table that yields the most rows. Headings survive
redesigns that CSS selectors don't, and — importantly — a layout it doesn't recognise
returns **zero** records, so the app falls back rather than displaying garbage. Sitting
labels are normalized from both the seasonal (`Spring 2019`) and monthly (`Mar-2026`)
conventions; when a table gives counts but no percentage, the rate is derived from them.

**Failure is quiet on the client, loud on the server.** A source that's down, unconfigured,
or newly redesigned returns 502/empty from the endpoint; `useExamPassRates` swallows it and
leaves the authored figures in place. Nothing in the UI reports a fetch error — the figures
are a nicety beside the papers themselves. Responses (including "no source configured") are
cached in `localStorage` for a week, since ratios are republished twice a year.

**Authored figures** in `PAST_EXAM_SITTINGS` are the floor beneath all that — used when no
live record matches, and per-field, so a live source that publishes only the effective
ratio doesn't erase an authored raw one:

```ts
{ exam: 'Exam 5', year: 2019, session: 'Spring', candidates: 1234, passRate: 42.0, effectivePassRate: 46.2 },
```

**The effective ratio is a CAS measure.** The SOA publishes a raw pass rate only, so
`StatCell` labels each row by the figure it actually holds — an SOA row reads `PASS RATE`,
never `EFF. PASS`. Monthly SOA records match no row on the shelf (a testing window isn't a
paper anyone can sit) and `applyPassRates` drops them.

## What the selection drives

Selecting a sitting sets `selectedSitting` in `Landing.tsx`, which already fed everything
downstream and still does:

- `currentPool` filters the bank to that sitting, so the deck card's count and the shuffle
  draw from that paper only;
- `handleStart` passes `year` / `session` to `/quiz`, and the sitting's full question count
  as `count` (a past paper is sat whole, not sampled);
- the header row above the shelf offers that sitting's examiner's report as a PDF download
  (`data/examPdfLinks.ts`), beside the pass-rate lookup link.

### The header row

Two out-links sit above the shelf, both sized as real controls rather than fine print —
on a phone they are sandwiched between the tab strip and the sitting rows, so a `text-xs`
link is a miss waiting to happen:

| Link | What it is | Shown when |
|---|---|---|
| Examiner's report | The selected sitting's paper, opened in the in-app PDF viewer (icon + `PDF` tag) | `getSittingPdfLink` has that sitting — or, for an exam with no dated papers at all, `getExamPdfLink` has the exam-level sample-question PDF |
| Pass rates | The exam's lookup page (`PASS_RATE_LOOKUP`) | The exam has a lookup entry |

Either can be absent; the row itself disappears only when both are. The report link tracks
the *selection*, so it appears, changes and vanishes as you move down the shelf — a sitting
whose report isn't in `SITTING_PDF_LINKS` shows no button rather than a dead one.

## Reading the paper (`PdfViewerPanel`)

Tapping the report opens it **in the app**, in the concept popup's shell: the same slide-up
bottom panel, the same drag handle and shared preferred height (`useSplitHeight`), the same
focus-mode expand, the same Previous / position / Next footer — with pages where the popup
has concepts. Reading what the examiners said about question 7 shouldn't cost you the quiz
you were building.

| Piece | Role |
|---|---|
| `quiz/src/components/PdfViewerPanel.tsx` | The panel: header (title, download, expand, close), canvas, zoom slider, page scrubber, paging footer |
| `quiz/src/hooks/usePdfDocument.ts` | Loads one document; imports pdf.js on demand and destroys the loading task on close |
| `quiz/src/lib/pdfjsSetup.ts` | The pdf.js instance, its worker and the URLs of the assets it fetches at run time — reached only through a dynamic import |
| `quiz/src/lib/pdfjsAssets.ts` | The one list of those asset directories, shared with `vite.config.ts` so the two halves can't drift |
| `quiz/src/lib/pdfViewer.ts` | Fit-to-width, the render resolution and pixel budget, the zoom range, the pan/anchor maths, page clamping (pure) |
| `quiz/src/lib/examPdf.ts` | Which sources are viewable, and the endpoint URLs |
| `quiz/src/components/NavProgressBar.tsx` | The shared position bar, scrubbable here (`onScrub`) |
| `quiz/src/lib/navScrub.ts` | Which page a point on the scrubber means, and what a key press moves to (pure) |
| `quiz/api/exam-pdf.js` | Serves the publisher's PDF from our own origin |

**Why the app draws the pages itself.** The obvious implementation — `<iframe src={pdf}>` —
depends on the browser having a PDF viewer, and Chrome on Android has none (nor do the
headless browsers this repo's e2e suite runs: they report `navigator.pdfViewerEnabled ===
false`). An embedded PDF is a blank rectangle there, and no event fires to say so. pdf.js
renders identically everywhere, and makes the panel's controls ours rather than a plugin's.

Two consequences worth remembering:

- It is the **legacy** pdfjs-dist build. The modern one calls
  `Map.prototype.getOrInsertComputed`, which only the newest browsers ship — everything else
  throws on the first render.
- **A good deal of pdf.js lives outside its bundle**, in directories it fetches from at run
  time and expects the caller to point it at. `pdfjsAssetsPlugin` in `vite.config.ts` copies
  them out of `node_modules`, `lib/pdfjsSetup.ts` turns them into URLs, and
  `hooks/usePdfDocument.ts` hands those to `getDocument`. See below — getting this wrong is
  the most consequential mistake available here.

### The assets pdf.js fetches at run time

| Directory | Served from | What is lost without it |
|---|---|---|
| `standard_fonts` | `/pdf-standard-fonts/` | Text in a PDF that names Helvetica/Times/Courier without embedding it — routine for anything produced from Word, so most of what CAS publishes |
| `wasm` | `/pdf-wasm/` | **The image codecs: CCITT fax, JBIG2, JPEG 2000, colour management** |
| `cmaps` | `/pdf-cmaps/` | Text in CID-keyed fonts that name a predefined encoding rather than embedding one |
| `iccs` | `/pdf-iccs/` | The fallback ICC profile |

`wasm` is the one that decides whether a **scanned** page has any ink on it. The older
papers are photocopies: the page is one big bitonal image, CCITT- or JBIG2-compressed, and
in pdf.js 6 both of those decode through `jbig2.wasm`. Without the URL,
`JBig2CCITTFaxImage.decode` throws "JBig2 failed to initialize", the image object resolves
to **null**, and the scan is never painted — while everything else on the page draws
normally. The result is a page that looks haunted rather than broken: ghost text from a
background layer, a few crisp fragments, thin air where the rest of the paper should be.
It is easy to read as a resampling or font problem, and it is neither.

**None of these failures are loud.** pdf.js warns to the console and carries on drawing the
rest of the page, so a missing or mistyped URL surfaces as a document that renders *almost*
right — which is much harder to place than one that doesn't render at all. That is why the
directory list lives in `lib/pdfjsAssets.ts` and is imported by both halves, and why
`lib/pdfjsAssets.test.ts` asserts pdfjs-dist still ships each directory: an upgrade that
renames one would otherwise put the ghost pages back with nothing failing.

The trailing slash on each URL is required — pdf.js throws `Invalid factory url` without
one. Nothing is fetched until a document actually needs it, so a reader who never opens a
paper pays for none of it.

**How big a page is drawn.** A canvas is sized in device pixels and laid out in
CSS pixels, and the obvious ratio between them — `devicePixelRatio` — is the wrong
one here. Fitted to a phone, a letter page is about 0.6 device pixels per PDF point
even on a 3× screen: ~125 dpi. That is plenty for the pages that are *vector* text,
which pdf.js rasterises at whatever size it is asked for and which come out crisp at
any resolution. It is not plenty for the pages that are **scans** — the examining
bodies' older papers include photocopied instruction and question pages, 200–300 dpi
bitmaps that then have to be squeezed ~2.5× to fit that canvas, which costs a scan
more than it costs vector text: strokes near a pixel wide are what a photocopy is made
of.

(This resolution floor is *not* what fixed the ghost pages — that was `wasmUrl`, above.
The two were diagnosed together and only one of them was the bug. Drawing a scan at a
real resolution is worth doing on its own, but it is a quality choice, not a cure.)

`canvasPixelRatio` therefore holds the ratio to whatever reaches
`MIN_DEVICE_PIXELS_PER_POINT` (3 px/pt, ~216 dpi) rather than to the screen's, so a
scan's strokes stay wider than a pixel however the panel is sized, and the last step
down to the screen's own pixels is left to the compositor. It takes the render scale
(`fit × zoom`) for this: zoomed in far enough the scale alone clears the floor and the
ratio is the screen's again. `MAX_CANVAS_PIXELS` still has the final say — a fitted
letter page at that resolution is ~4.4 of the 8 megapixels allowed, and a deep zoom is
capped by the budget exactly as before.

**Zooming, and reaching the rest of the page.** Zoom is a multiple of fit-to-width, so
1× is the page drawn across the panel, and the range runs up to 4×. The *bottom* of the
range is not 1× but `pageFitZoom` — the zoom at which the whole page is on screen, which
is what "Fit" means on the slider and the size a document opens at. On a phone the panel
is about the shape of a page, so the two are the same number and the slider runs 1×–4× as
it always did; on a desktop the panel is a wide, short strip, where a page fitted to its
width runs two or three panel-heights down and the reader would open a document to the
top third of page 1 with no way to see the rest at once. There the fit is well below 1×
and the width fit sits a little way along the slider. `MIN_ZOOM` (0.2) is the floor under
it, for a panel dragged down to a sliver. The fit is deliberately *not* snapped to the
slider's 0.05 grid: down at 0.3 a whole step is a tenth of the zoom, and a page that
doesn't quite fit is the one thing the number exists to prevent.

Two things follow in the panel. The page is **measured before it is drawn** — a
`getPage`/`getViewport({scale: 1})` pass of its own fills `pageBase`, and the render
effect waits for it and for the zoom to have settled on the fit, because drawing first
would show a fitted-width page for a moment and then shrink it. And the fit is only the
*default*: `zoomed` records whether the reader has set the zoom themselves, so the page
re-fits as the panel is resized until they touch the slider, and after that their zoom is
kept (clamped back into range when a resize raises the floor). The
control is the **same slider** the image gallery (`ImageGalleryModal`) and math focus mode
use — `.zoom-slider`, with the two custom properties set for a themed background — because
this is read one-handed on a phone, where a thumb on a 40px knob works and a pair of small
+/− targets in the footer did not. Pinch works too: the page area sets `touch-action:
pan-x pan-y`, which keeps a one-finger drag scrolling natively (with the momentum no
hand-rolled pan matches) while taking the pinch away from the browser, which would
otherwise zoom the whole site. A mouse gets grab-and-drag over the page, a trackpad's
pinch arrives as ctrl+wheel, and `+`/`−` still nudge by 0.25.

Three things follow, and all three are load-bearing:

- **The page is centred with `m-auto`, never `justify-content: center`.** Once the page is
  wider than the panel, centring it in a flex row pushes half of it off the *left* edge,
  into space a scroll container cannot reach — `scrollLeft` bottoms out at 0 with the
  page's left margin already 150px past it. Auto margins collapse to zero instead when the
  free space goes negative, so the whole page stays inside the scrollable area. This is
  what made a zoomed page only half readable.
- **A slider move does not redraw the page.** A drag across the range fires ~60 changes;
  each redraw would be cancelled by the next, so the reader would never see a sharp page.
  The panel keeps three zooms — what was asked for, what the renderer is working towards
  (140ms behind), and what the drawn bitmap is sized for — and covers the gap by scaling
  that bitmap with a CSS transform, which comes off in the same statement that resizes the
  canvas (a frame later would paint the new page scaled up again).
- **The layout follows the zoom immediately, even though the bitmap doesn't.** The page
  sits in a box (`pageBoxRef`) sized for the zoom that was *asked* for, and the stand-in
  bitmap is scaled from its top-left corner to fill it. So the scrollable area grows
  continuously under the gesture, every point of the page is already where the redraw will
  put it, and the redraw changes sharpness and nothing else. Transforming the canvas alone
  is what the first version did, and it is why zoom used to jump: a transform doesn't
  resize anything, so the page ballooned about its own centre over a scroll area that
  hadn't moved, and the redraw then snapped it all into place.
- **The scroll position is re-anchored on every zoom change** (`anchoredScroll`), in a
  layout effect so it lands in the same frame — on the panel's midpoint for the slider,
  and on the fingers' midpoint for a pinch, which is why a pinch holds whatever is between
  the fingers. The measurement it works from is taken in the event that asked for the
  zoom, before the DOM has changed under it. Without any of this, zooming re-anchors at
  the top-left corner and the paragraph you zoomed in to read has to be hunted down again:
  measured on a 4× zoom while reading two-thirds down a page, the old panel drifted ~30%
  of the page away from that point, in steps of up to 3% at a time; it now holds to
  within 0.15%.

**Moving through the document.** The footer's "1 of 423" says where you are and nothing
about how far that is, and Previous / Next is 422 presses from one end of a Basic Ratemaking
to the other. So the panel carries the app's shared `NavProgressBar` between the zoom row
and the footer — the same green bar every Previous / Next surface has — with the
`onScrub` handler that makes it a control as well as a readout: press anywhere on it to go
to that page, or drag along it, the gesture a video timeline uses. A bubble above the
finger names the page it would land on, because 62% of a 423-page report is not a page
number. Keyboard: arrows step a page, PageUp/PageDown a tenth of the document, Home/End the
ends. The maths — which page a point on the track means, and where a key press goes — is
`lib/navScrub.ts`, kept as the exact inverse of `navProgressPercent` so the page the drag
lands on is always the one whose fill reaches the finger.

The panel therefore keeps **two page numbers**, for the same reason it keeps three zooms:
`page` is where the reader is, live under their finger, and `renderPage` is the one being
drawn, 60ms behind. A drag crosses a page every few milliseconds; parsing each one only to
cancel it on the next frame would leave the reader watching a spinner instead of the page
they stopped on. The delay is short enough that a Previous / Next press still starts
drawing immediately as far as anyone can tell, and the scroll-to-top and the canvas's
`aria-label` follow `renderPage` so they happen once, with the page that arrives.

Scrubbing is **silent**, unlike the Previous / Next buttons either side of it — a drag past
200 pages would fire the page-flick cue 200 times. See `docs/sound-design.md`.

**Why the endpoint lives under `quiz/`.** The quiz app is its own Vercel project rooted at
`quiz/`, so a function in the repo-root `api/` is *not* on the app's origin. Worse than
missing: `quiz/vercel.json` rewrites unmatched paths to `index.html`, so `/api/exam-pdf`
answered **200 with the app's own HTML**, and pdf.js reported that as "Invalid PDF
structure" — a message that reads as a corrupt paper and sends you looking at the links.
The function therefore sits in the quiz project, the SPA rewrite excludes `/api/`, and the
client checks the response really is a PDF before parsing it, naming the deployment when it
isn't (`describeNonPdfResponse`). If the app and the functions are ever split apart again,
`VITE_EXAM_PDF_URL` points the viewer at whichever origin serves them.

**Why the bytes come through `quiz/api/exam-pdf.js`.** The publishers send no CORS headers, so the
page cannot read the file itself (the same reason `api/pass-rates.js` exists), and
`<a download>` is ignored cross-origin, so "Download" would navigate away instead of saving.
The endpoint re-serves the file from our origin with `Content-Disposition` chosen by the
caller (`?download=1` for a save), and caches it hard at the edge — a past paper never
changes. Because it takes a URL from the client it is **allowlisted to the publishers we
link source PDFs from** (the two examining bodies and the Actuarial Standards Board) and to
`.pdf` paths over https, re-checked after redirects, and it refuses a response
that isn't really a PDF (publishers answer 200 with an HTML "not found" page often enough
that this would otherwise render as an empty panel). Set `EXAM_PDF_HOSTS` to re-aim the
allowlist without a redeploy.

Every failure path ends in the same place: the panel says so in a sentence and offers the
publisher's own copy, which is the only action any of them leaves.

### The link table (`data/examPdfLinks.ts`)

A URL in that table is **transcribed from the publisher, never constructed**. The CAS
filenames look regular and are not — Spring 2019 is `admissions_studytools_exam5_sp19-5.pdf`,
Spring 2015 is `sp15-5_0.pdf`, Spring 2018 is `sp18-5_examiners_report.pdf`, and Spring 2012
still sits under `/old/` — so extrapolating the pattern is precisely how the table filled up
with 404s. A sitting whose PDF hasn't been located is **absent**, and the button simply
doesn't render.

The same table also holds each exam's **syllabus** (`SYLLABUS_PDF_LINKS`, keyed by the wiki
exam id — so Exam 5 is `5-1`, as in `data/examGuides.ts`). That one is read by
`components/wiki/ExamSyllabusButton.tsx`, which sits beside the title on a study-guide page
(`pages/wiki/WikiExam.tsx` passes it in the `titleBadge` slot) and opens the publisher's
document in the same `PdfViewerPanel`: the page under it is *our* reading of that syllabus,
and checking one against the other shouldn't cost you the page you were on.

Two things differ from the sittings above:

- **The label follows the body.** The SOA publishes a per-sitting *Syllabus*; since the move
  to CBT, CAS's per-exam *Content Outline* is the document that defines what's examined, so
  that is what the button says on a CAS page.
- **A syllabus is reissued, not just published once**, so these entries rot into *superseded*
  rather than dead — a link that still opens and is no longer what the candidate sits. Each
  entry records which edition it is, so staleness shows up in the diff. The same "absent
  beats guessed" rule applies: Exams 6U, 8 and 9 have no entry and therefore no button.
  CAS's own naming is the warning against extrapolating — the newer outlines are
  `Exam_6C_CO_2026_Fall.pdf` where the older ones are `Exam7_Content_Outline.pdf`.

### Source documents on a resource page (`ResourceMetaCard`)

The third caller of the viewer isn't an exam at all. A `Resources/Books/*.md` page whose
frontmatter carries an `Available from:` link to a PDF — the ASOPs, the CAS study notes,
the SOA's *Risk and Insurance* — shows a **Read PDF** button on its metadata card
(`components/wiki/ResourceMetaCard.tsx`, rendered both on the resource page and inside the
concept popup), and that opens the same `PdfViewerPanel`. The reasoning is the one the
syllabus button uses: the page under it is *our* summary of the source, and checking one
against the other shouldn't throw a candidate out to a browser tab they then have to find
their way back from — least of all on a phone, where the tab that opens is a different app
shell entirely.

The button is a **plain anchor to the publisher underneath**, exactly as the syllabus button
is: only an unmodified left click is intercepted, so ⌘/ctrl-click, middle-click and
long-press still behave like a link and the real URL stays visible on hover.

Because that card is read *inside* the concept popup as often as on the standalone page, the
reader has to open **over** the page that asked for it, and the popup's own layer is what it
would otherwise open behind: the popup paints at `z-index: 56` in focus mode, above the
panel's `z-50`, so a Read PDF press on a full-screen resource page looked like it did
nothing. Three things follow, and all of them live with the panel:

- **Its own layer.** The panel carries `.pdf-viewer-aside` alongside the popup's class and
  takes `z-index: 58` — a step above the popup and the image gallery (57) — in its own focus
  mode too (`index.css`; the ladder is `docs/style-guide.md` §8.2).
- **No chrome gaps over a full-screen host.** `hostFullScreen` (passed down as
  `ConceptPagePanel`'s `focusMode`) drops the `bottom-14` the mobile bottom nav needs and the
  desktop sidebar inset, because the page underneath has already covered both — leaving them
  would show a strip of that page instead of the chrome they were reserved for.
- **The keys.** The popup binds Esc and the arrows too, so `ResourceMetaCard` reports the
  reader opening (`onViewerOpenChange` → `ConceptPagePanel`'s `onReaderOpenChange` →
  `ConceptPopup`) and the popup hands them over while it is up — the same hand-over the image
  gallery gets, but kept on its own flag: the gallery's also makes the footer's Previous /
  Next carry the gallery to the next concept, which a document being read must not do.

What decides between reading and out-linking is `isSupportedPdfSource` — the same predicate
the exam shelf uses, so the viewer never opens on a request the endpoint would refuse. A
resource whose link is a library catalogue (`worldcat.org`), a publisher's shop page, or an
ASOP *landing* page rather than the document is not a PDF we can serve, and keeps the
ordinary out-link it always had (`Get a copy`, or `Download PDF` for a PDF on a host outside
the allowlist). Adding a publisher means adding the host in **both** lists —
`EXAM_PDF_HOSTS` in `lib/examPdf.ts` and `DEFAULT_HOSTS` in `quiz/api/exam-pdf.js`, which
can't import from `src/` — and a test in `examPdfEndpoint.test.ts` walks the client list
through the endpoint's resolver so the two can't drift.

The gaps are researched, not forgotten: CAS began publishing Examiner's Reports with the
**May 2012** sitting (2011 has none), stopped when testing moved to CBT in **Fall 2020**, and
MAS-II was first sat in **Fall 2018**. Fall 2012 Exam 5 has not been located. What's
published also differs by exam — Exams 5–9 are written papers with an Examiner's Report,
while the MAS exams are multiple choice and come with a final answer key — so the button's
label follows the document (`Examiner's Report` vs `Exam & Answer Key`), not the button.
