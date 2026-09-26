# SEO — how each page is found

Every exam, concept and resource page is meant to be a search result of its own:
its own URL, its own title, its own description. This is how that is done, and the
few rules that keep it true.

## The problem it solves

The app is a client-rendered SPA. Before this, every URL on
`quiz.actuarialnotes.com` answered with the same `index.html` — title *Actuarial
Notes*, description *Practice questions for SOA Exam P and Exam FM* — and only
set `document.title` once the app had run. The sitemap was hand-kept and had
fallen far behind the vault (364 of 853 concepts, 12 of 109 resources), there was
no `robots.txt`, and a concept URL **redirected itself** in JavaScript to its exam
page (`/wiki/exam/…?concept=…`) — and a redirect is never a search result.

## One record per page — `lib/seo.ts`

`buildSeoPages(files, questionCounts)` turns the vault into one `SeoPage` per public
page: the hub (`/wiki`), each exam, each concept, each `Resources/Books/` page. A
record holds the canonical `path` (exactly what `wikiRoute` builds for a link), the
`name` its heading shows, its `title`, its `description`, the study guide it sits
under (`parent`, the middle breadcrumb) and whether it is a `noindex` stub.

Nothing is hand-written — a thousand pages stay described because the words come
from the pages themselves:

| Page | Title | Description |
|---|---|---|
| Concept | `Name — Exam 5 \| Actuarial Notes` (the exam only when the concept is on exactly one syllabus and it fits) | Its **opening definition** — the first substantial paragraph above the first section heading — then *On the Exam 5 syllabus.* if there is room |
| Exam | `Exam P-1 (SOA) Study Guide & Syllabus \| Actuarial Notes` | What the guide holds: *SOA Exam P-1 study guide for Probability: 76 concept pages and 716 practice questions, organized by learning objective.* — counts from the build, then the page's own introduction if it fits |
| Resource | Its front-matter `Title` (main title only when a subtitle makes it long), with the file name's short citation — `(Ross, 2019)` — when it fits | Its lead paragraph; or, for a textbook whose page is only a chapter outline, its bibliographic facts, the exams it is a reading for, and as many chapter names as fit |

The details that make the derived text read cleanly:

- **Math is read, not dropped.** `latexToText` turns the vault's inline TeX into text
  — `$E[X^2]$` → *E[X²]*, `$\frac{a}{b}$` → *a/b*, `$\mu$` → *μ* — so a definition that
  leans on notation still reads as a sentence in a result.
- **`clampText`** cuts to 160 characters, preferring a whole sentence that fills at least
  half of that, otherwise a word boundary and an ellipsis. It never ends on an
  abbreviation, and a lead that introduces a formula ends on a full stop, not a colon.
- **Older pages** that open on a `## Heading`, an Obsidian breadcrumb, or a quoted
  definition (`> An agent is …`) still yield their lead. A callout, a formula box or a
  list never does, and a page that opens on a chapter outline has no lead rather than
  some paragraph from its middle.
- **Titles are unique.** When two pages would share one (the concept *Appointed
  Actuary* and OSFI's guideline of that name), the resource gives way and takes its
  `Code` or `Type`.
- **Stubs are `noindex`.** A page with under 20 words, or a placeholder line
  (*concept summary to be written*), is served but kept out of the index and the
  sitemap — thin pages count against a site. They become indexable the moment they
  are written; nothing to flip.
- **An authored `description:`** in a page's front matter overrides the derived one.
  Use it sparingly: it edits the file, which downgrades its VERIFY status to `stale`
  (`docs/verification.md`, P4). Improving the page's opening sentence is usually the
  better fix, and it improves the page too.

## Three places the record is used

`seoPagesPlugin` in `vite.config.ts` builds the records once per build and uses them:

1. **`virtual:seo-pages`** → `lib/seoPages.ts` → `hooks/useWikiPageHead.ts`. Each wiki
   page (`WikiHome`, `WikiExam`, `WikiConcept`, `WikiResource`) writes its record into
   the live head through `lib/documentHead.ts` — title, description, canonical, Open
   Graph, JSON-LD. Google renders the app before indexing, so this is what it reads
   after the page has run. The records ride in the wiki's lazy chunk, not the shell.
2. **A static file per page.** After the bundle is written, each page gets
   `dist/wiki/<kind>/<slug>/index.html`: the built `index.html` with that page's head
   swapped in between the `<!-- page-head -->` markers, and a crawlable copy of its
   article inside `#root` (`lib/seoPrerender.ts`). Vercel serves a file before the SPA
   rewrite in `quiz/vercel.json`, and decodes the request path before it looks, so
   `/wiki/exam/Exam+P-1+%28SOA%29` finds `wiki/exam/Exam+P-1+(SOA)/index.html`. A
   crawler that runs no JavaScript — most AI crawlers, link previews, Bing's first
   pass, Google's HTML-only first pass — gets the page's title, description, words and
   every wiki link as a real `<a href>`.
3. **`dist/sitemap.xml`**, generated: the app's public routes (`SITEMAP_APP_PATHS`) and
   every indexable page. It can't fall behind the vault again. `public/robots.txt`
   points to it.

### The crawlable copy is never seen

`index.html`'s first script adds `js` to `<html>`, and its inline style hides
`#prerender` under `html.js` — before first paint. React replaces the contents of
`#root` when it mounts. So a reader never sees the static copy, and it is the same
article the app renders, so there is nothing a crawler reads that a reader doesn't.
It is text and links only: math stays as its TeX source, and images, raw HTML and
task-list checkboxes are left out. A link to a missing page or a `noindex` stub is
written as plain text, so no crawl is spent on it.

### Head order in the app

`usePageTracking` writes the route's **fallback head** (`fallbackHead`: its name, the
site's description, its canonical URL) in a *layout* effect; a page's own record is
written by `usePageHead` in a *passive* effect, so the fuller record always lands
last. On the very first render of a page served from its static file, the fallback
is skipped — the head already carries the full record, and blanking it while the
wiki chunk loads would only make the rendered head flicker. A route that names
nothing — `NotFound`, a wiki page that fails to load — writes `NOT_FOUND_HEAD`,
which is `noindex`: the app answers every path 200, so without it a typo'd URL
would be indexed as a page.

## Concept URLs: shown to whoever lands on them

`WikiConcept` used to redirect every concept that belongs to one syllabus into its
study guide. It still does — **for a link followed inside the app**. A visitor who
*lands* on the URL (a search result, a shared link, a bookmark, a crawler: the
router keys the entry it started on `'default'`) is shown the concept page itself,
with a pill per study guide that opens the guide at that concept. That is what
lets a concept URL be a search result at all. **Don't reintroduce a redirect on
landing** — a JavaScript redirect is followed by Google, and the concept would drop
out of the index.

## Adding a kind of page

A new public route with vault content needs: a builder in `lib/seo.ts` (and a case
in `buildSeoPages`), `useWikiPageHead` in its component, and a `fallbackHead`
branch if its URL can be named from the path alone. The static file, the sitemap
entry and the head then follow. `seo.test.ts` reads the whole vault and fails on a
duplicate title, a duplicate description, an over-long description, or markdown or
TeX left in either.

## Outside the repo

- **Google Search Console** — submit `https://quiz.actuarialnotes.com/sitemap.xml`,
  and use URL Inspection on a concept page to confirm it is indexed as itself.
- **`wiki.actuarialnotes.com`**, the old Obsidian Publish site, 301s every path to the
  quiz *home page* (a Cloudflare redirect rule). Old links into it — and whatever
  ranking they carry — land on the home page rather than the page they named. Its
  slugs are the ones `wikiRoute` still uses (`Concepts/Chain+Ladder+Method`), so a
  path-preserving rule sends each to its page:
  `wiki.actuarialnotes.com/Concepts/*` → `https://quiz.actuarialnotes.com/wiki/concept/${1}`,
  `…/Resources/Books/*` → `/wiki/resource/${1}`, and `…/Exam*` → `/wiki/exam/Exam${1}`.
