import base64, json, re
from pathlib import Path

HERE = Path(__file__).resolve().parent
OUT = HERE / "placeholder-jackets.html"
d = json.loads((HERE / "covers.json").read_text())

ORDER = [
    "A First Course in Probability (Ross - 2019)",
    "Introduction to Mathematical Statistics (Hogg et al. - 2018)",
    "Introduction to Probability Models (Ross - 2019)",
    "Probability Distributions Reference",
    "An Introduction to Statistical Learning (James et al. - 2021)",
    "An Introduction to Generalized Linear Models (Dobson - 2018)",
    "Generalized Linear Models (Larsen - 2015)",
    "Generalized Linear Models for Insurance Rating (Goldburd et al. - 2020)",
    "Linear Mixed Models (West et al. - 2022)",
    "Introductory Time Series with R (Cowpertwait - 2009)",
    "Poisson Processes and Mixture Distributions (Daniel - 2008)",
    "Life Contingencies (Struppeck - 2014)",
    "Basic Ratemaking (Werner - 2016)",
    "Estimating Unpaid Claims Using Basic Techniques (Friedland - 2010)",
    "Nonlife Actuarial Models (Tse - 2009)",
    "Statement of Principles Regarding Property and Casualty Insurance Ratemaking (CAS - 1988)",
    "ASOP 12 - Risk Classification (ASB - 2005)",
    "ASOP 13 - Trending Procedures in Property Casualty Insurance (ASB - 2009)",
    "ASOP 43 - Property Casualty Unpaid Claim Estimates (ASB - 2007)",
]
assert set(ORDER) == set(d), set(d) ^ set(ORDER)


def uri(svg: str) -> str:
    return "data:image/svg+xml;base64," + base64.b64encode(svg.encode()).decode()


DATA = {n: {k: uri(d[n][k]) for k in ("now", "a", "b", "c")} for n in ORDER}
# Short shelf labels for the picker.
LABEL = {n: re.sub(r"\s*\([^()]*\)$", "", n) for n in ORDER}

payload = json.dumps({"order": ORDER, "covers": DATA, "labels": LABEL},
                     separators=(",", ":"))

DESIGNS = [
    ("a", "Poster", "Colour and type, no picture",
     "The jacket is a field of light and a title set as large as it will go. "
     "Nothing competes with the words, which is what makes it hold up when the "
     "card shrinks it to 96 px — at that size the colour is the identity and "
     "the first two words are the label.",
     ["Mesh gradient — three overlaid ramps in the publisher's colour, so the "
      "field reads as lit rather than as a flat swatch",
      "Title at up to 46 px, flush left, tight leading; author and citation "
      "pinned to the foot",
      "The house accent runs full height down the binding edge — the one place "
      "the colour is at full strength"]),
    ("b", "Motif", "A drawing of what the book is about",
     "A near-black field carrying a line chart of the subject: the density and "
     "its tail, the loss triangle, the scatter and its fit, the compounding "
     "curve. Nine drawings cover the shelf, chosen from the title. It is the "
     "only one of the three where you can tell two books apart without reading "
     "either.",
     ["Nine motifs — density, triangle, regression, series, survival, arrivals, "
      "compounding, shield, lattice — matched on the title",
      "The drawing takes whatever height the words leave, so a four-line title "
      "and a two-word title both close up against it",
      "Closest in feel to the app's own dark canvas and the concept figures in "
      "Media/Figures"]),
    ("c", "Paper", "Bright, editorial, two-tone",
     "A band of house colour holding the same subject as flat cut-out shapes, "
     "then paper below with the title in black. The opposite bet from the other "
     "two: on the app's dark canvas a shelf of these reads as a row of lit "
     "objects rather than as more dark rectangles.",
     ["Colour band over paper — the strongest light/dark contrast of the three, "
      "and the brightest thing on the Resources page",
      "The same nine subjects as Motif, drawn as solid shapes instead of lines",
      "Black title on off-white — the most legible of the three at every size"]),
]


def design_section(key, name, tag, blurb, points, index):
    pts = "".join(f"<li>{p}</li>" for p in points)
    return f"""
      <section class="design" id="design-{key}">
        <header class="design-head">
          <div class="design-mark" aria-hidden="true">{key.upper()}</div>
          <div class="design-title">
            <h2>{name}</h2>
            <p class="tag">{tag}</p>
          </div>
        </header>
        <div class="design-body">
          <p class="blurb">{blurb}</p>
          <ul class="points">{pts}</ul>
        </div>
        <div class="shelf-wrap">
          <p class="shelf-label">All 19, at the size the card renders them</p>
          <div class="shelf" data-shelf="{key}"></div>
          <div class="shelf-edge" aria-hidden="true"></div>
        </div>
        <div class="incontext">
          <p class="shelf-label">In the Source Material card</p>
          <div class="cards" data-cards="{key}"></div>
        </div>
      </section>"""


sections = "".join(design_section(k, n, t, b, p, i)
                   for i, (k, n, t, b, p) in enumerate(DESIGNS))

HTML = f"""<title>Placeholder Jackets</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>
:root {{
  --ground: #f1f2f5;
  --surface: #ffffff;
  --surface-2: #e9ebf0;
  --ink: #14171d;
  --ink-2: #5d6675;
  --ink-3: #8b93a2;
  --rule: #dde1e8;
  --rule-2: #c8cedb;
  --accent: #2b4fc4;
  --accent-soft: #e6ebfb;
  --shadow: 0 1px 2px rgba(16,20,28,.06), 0 8px 24px -12px rgba(16,20,28,.22);
  --shadow-lift: 0 2px 4px rgba(16,20,28,.08), 0 18px 40px -16px rgba(16,20,28,.34);
  --measure: 62ch;
}}
@media (prefers-color-scheme: dark) {{
  :root:not([data-theme="light"]) {{
    --ground: #0e1116;
    --surface: #161a21;
    --surface-2: #1d222b;
    --ink: #e8ecf3;
    --ink-2: #a2abbb;
    --ink-3: #798395;
    --rule: #262c36;
    --rule-2: #333b47;
    --accent: #8ba9ff;
    --accent-soft: #1a2135;
    --shadow: 0 1px 2px rgba(0,0,0,.5), 0 10px 28px -14px rgba(0,0,0,.8);
    --shadow-lift: 0 2px 6px rgba(0,0,0,.55), 0 22px 46px -18px rgba(0,0,0,.9);
  }}
}}
:root[data-theme="dark"] {{
  --ground: #0e1116;
  --surface: #161a21;
  --surface-2: #1d222b;
  --ink: #e8ecf3;
  --ink-2: #a2abbb;
  --ink-3: #798395;
  --rule: #262c36;
  --rule-2: #333b47;
  --accent: #8ba9ff;
  --accent-soft: #1a2135;
  --shadow: 0 1px 2px rgba(0,0,0,.5), 0 10px 28px -14px rgba(0,0,0,.8);
  --shadow-lift: 0 2px 6px rgba(0,0,0,.55), 0 22px 46px -18px rgba(0,0,0,.9);
}}

* {{ box-sizing: border-box; }}
body {{
  margin: 0;
  background: var(--ground);
  color: var(--ink);
  font-family: Archivo, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}}
.wrap {{ max-width: 1120px; margin: 0 auto; padding: 0 24px 96px; }}
h1, h2, h3 {{ font-family: "Instrument Serif", Georgia, serif; font-weight: 400;
  letter-spacing: -0.01em; text-wrap: balance; margin: 0; }}
p {{ margin: 0; }}
.eyebrow {{
  font-family: "IBM Plex Mono", ui-monospace, monospace;
  font-size: 11px; letter-spacing: .14em; text-transform: uppercase;
  color: var(--ink-3);
}}

/* ── masthead ─────────────────────────────────────────────── */
.masthead {{ padding: 64px 0 40px; border-bottom: 1px solid var(--rule); }}
.masthead h1 {{ font-size: clamp(44px, 7vw, 76px); line-height: 1.02; margin: 14px 0 0; }}
.masthead h1 em {{ font-style: italic; color: var(--accent); }}
.standfirst {{ margin-top: 20px; max-width: var(--measure); font-size: 17px; color: var(--ink-2); }}
.specs {{
  display: flex; flex-wrap: wrap; gap: 8px; margin-top: 26px;
  font-family: "IBM Plex Mono", ui-monospace, monospace; font-size: 12px;
}}
.specs span {{
  border: 1px solid var(--rule-2); border-radius: 3px;
  padding: 3px 9px; color: var(--ink-2); background: var(--surface);
}}

/* ── head to head ─────────────────────────────────────────── */
.h2h {{ padding: 48px 0 8px; }}
.section-head {{ display: flex; flex-wrap: wrap; align-items: baseline;
  gap: 8px 18px; margin-bottom: 6px; }}
.section-head h2 {{ font-size: 30px; }}
.section-note {{ color: var(--ink-2); font-size: 15px; max-width: var(--measure); }}
.picker {{ display: flex; flex-wrap: wrap; gap: 6px; margin: 22px 0 26px; }}
.picker button {{
  font: inherit; font-size: 13px; line-height: 1.2;
  padding: 7px 12px; border-radius: 999px; cursor: pointer;
  border: 1px solid var(--rule-2); background: var(--surface); color: var(--ink-2);
  transition: background .12s, color .12s, border-color .12s;
}}
.picker button:hover {{ border-color: var(--accent); color: var(--ink); }}
.picker button[aria-pressed="true"] {{
  background: var(--accent); border-color: var(--accent); color: #fff; font-weight: 600;
}}
.picker button:focus-visible, .shelf img:focus-visible {{
  outline: 2px solid var(--accent); outline-offset: 2px;
}}
.compare {{
  display: grid; gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}}
.compare figure {{ margin: 0; display: flex; flex-direction: column; gap: 10px; }}
.compare img {{
  width: 100%; height: auto; aspect-ratio: 400 / 580; display: block; border-radius: 4px;
  box-shadow: var(--shadow);
}}
.compare figcaption {{ display: flex; align-items: baseline; gap: 8px; }}
.compare .cap-key {{
  font-family: "IBM Plex Mono", ui-monospace, monospace; font-size: 11px;
  letter-spacing: .1em; text-transform: uppercase; color: var(--ink-3);
}}
.compare .cap-name {{ font-size: 15px; font-weight: 600; }}
.compare .is-now .cap-name {{ color: var(--ink-3); font-weight: 500; }}

/* ── the three designs ────────────────────────────────────── */
.design {{ padding: 56px 0; border-top: 1px solid var(--rule); }}
.design-head {{ display: flex; align-items: center; gap: 16px; }}
.design-mark {{
  flex: 0 0 auto; width: 46px; height: 46px; border-radius: 50%;
  display: grid; place-items: center;
  background: var(--accent-soft); color: var(--accent);
  font-family: "IBM Plex Mono", ui-monospace, monospace;
  font-size: 17px; font-weight: 500;
}}
.design-title h2 {{ font-size: 34px; line-height: 1.1; }}
.design-title .tag {{ font-size: 14px; color: var(--ink-3); }}
.design-body {{
  display: grid; gap: 24px 44px; margin-top: 24px;
  grid-template-columns: minmax(280px, 1.1fr) minmax(260px, 1fr);
}}
.blurb {{ font-size: 16.5px; color: var(--ink-2); }}
.points {{ margin: 0; padding: 0; list-style: none; display: grid; gap: 10px; }}
.points li {{
  position: relative; padding-left: 20px; font-size: 14.5px; color: var(--ink-2);
}}
.points li::before {{
  content: ""; position: absolute; left: 0; top: 10px;
  width: 8px; height: 1px; background: var(--rule-2);
}}
.shelf-wrap {{ margin-top: 34px; }}
.shelf-label {{
  font-family: "IBM Plex Mono", ui-monospace, monospace;
  font-size: 11px; letter-spacing: .12em; text-transform: uppercase;
  color: var(--ink-3); margin-bottom: 12px;
}}
.shelf {{
  display: flex; gap: 14px; overflow-x: auto; padding: 4px 2px 18px;
  scrollbar-width: thin;
}}
.shelf img {{
  flex: 0 0 auto; width: 96px; height: auto; aspect-ratio: 400 / 580;
  border-radius: 3px; display: block;
  box-shadow: var(--shadow); transition: transform .16s ease, box-shadow .16s ease;
}}
.shelf img:hover {{ transform: translateY(-5px); box-shadow: var(--shadow-lift); }}
.shelf-edge {{ height: 3px; border-radius: 2px; background: var(--rule-2); opacity: .65; }}
.incontext {{ margin-top: 34px; }}
.cards {{ display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }}
.card {{
  display: flex; align-items: center; gap: 16px;
  border: 1px solid var(--rule); border-radius: 10px;
  background: var(--surface); padding: 16px;
}}
.card img {{ width: 88px; height: auto; aspect-ratio: 400 / 580;
  border-radius: 5px; border: 1px solid var(--rule);
  flex: 0 0 auto; }}
.card-body {{ min-width: 0; }}
.card-kicker {{
  font-size: 11px; font-weight: 700; letter-spacing: .09em; text-transform: uppercase;
  color: var(--ink-3);
}}
.card-title {{ font-size: 16px; font-weight: 600; line-height: 1.3; margin-top: 3px; }}
.card-author {{ font-size: 13.5px; color: var(--ink-2); margin-top: 2px; }}
.chips {{ display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }}
.chips span {{
  border: 1px solid var(--rule-2); border-radius: 5px; padding: 1px 7px;
  font-size: 11.5px; color: var(--ink-2);
}}

/* ── closing ──────────────────────────────────────────────── */
.closing {{ padding: 56px 0 0; border-top: 1px solid var(--rule); }}
.closing h2 {{ font-size: 30px; }}
.closing p {{ margin-top: 16px; max-width: var(--measure); color: var(--ink-2); }}
.next {{
  margin-top: 26px; display: grid; gap: 14px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}}
.next div {{
  background: var(--surface); border: 1px solid var(--rule);
  border-radius: 10px; padding: 16px 18px;
}}
.next h3 {{ font-size: 19px; }}
.next p {{ margin-top: 6px; font-size: 14.5px; }}
.footnote {{
  margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--rule);
  font-family: "IBM Plex Mono", ui-monospace, monospace;
  font-size: 12px; color: var(--ink-3); line-height: 1.8;
}}
@media (max-width: 720px) {{
  .design-body {{ grid-template-columns: 1fr; }}
  .masthead {{ padding-top: 44px; }}
}}
@media (prefers-reduced-motion: reduce) {{
  * {{ transition: none !important; animation: none !important; }}
}}
</style>

<div class="wrap">
  <header class="masthead">
    <p class="eyebrow">Resources · cover images · 19 of 30 source pages</p>
    <h1>Placeholder <em>jackets</em></h1>
    <p class="standfirst">
      Eleven of the thirty pages in <code>Resources/Books/</code> have a real
      publisher jacket. The other nineteen get one drawn for them from the
      page's own front matter — and the current drawing is a maroon rectangle
      with a hairline box around it. Here are three replacements. Every jacket
      below is generated: pick a direction and the whole shelf redraws.
    </p>
    <div class="specs">
      <span>400 × 580 SVG</span><span>~3.5 KB each</span>
      <span>no web fonts</span><span>drawn from front matter</span>
      <span>colour keyed to the publisher</span>
    </div>
  </header>

  <section class="h2h">
    <div class="section-head">
      <h2>The same book, four ways</h2>
    </div>
    <p class="section-note">
      Pick any source to see what today's cover looks like beside the three
      proposals.
    </p>
    <div class="picker" id="picker" role="group" aria-label="Choose a source"></div>
    <div class="compare" id="compare"></div>
  </section>
{sections}
  <section class="closing">
    <h2>Picking one</h2>
    <p>
      Say A, B or C and I'll wire it into
      <code>scripts/generate_resource_covers.py</code>, redraw all nineteen,
      update <code>docs/resource-covers.md</code>, and push it to the branch.
      Mixing is fine too — Motif's drawings on Poster's field, say, or Paper
      with the band on the bottom.
    </p>
    <div class="next">
      <div>
        <h3>What also gets fixed</h3>
        <p>
          <em>A First Course in Probability</em> — the one you circled — is a
          generated cover that was exported to PNG under a name the generator
          doesn't own, so it has been frozen out of every redraw since. It goes
          back to a generated SVG.
        </p>
      </div>
      <div>
        <h3>Real jackets still win</h3>
        <p>
          The eleven pages with a publisher jacket are untouched, and the rule
          holds: drop a real cover in under any name that isn't
          <code>… - Cover.svg</code> and the generator leaves it alone forever.
        </p>
      </div>
      <div>
        <h3>Type is measured now</h3>
        <p>
          All three lay out against real Helvetica/Arial advance widths rather
          than an estimate, so a title can't silently run off the edge the way
          <em>Property/Casualty</em> did.
        </p>
      </div>
    </div>
    <p class="footnote">
      Sources shown in syllabus order · probability → statistical models →
      time series → ratemaking &amp; reserving → standards<br>
      Prototype code in <code>scripts/</code>: cover_kit · motifs · palettes ·
      metrics
    </p>
  </section>
</div>

<script>
const DATA = {payload};
const CARD = {{
  "a": ["Textbook", "A First Course in Probability", "Sheldon Ross",
        ["10th ed.", "2019", "Pearson"]],
  "b": ["Study Note", "Basic Ratemaking", "Geoff Werner, Claudine Modlin",
        ["5th ed.", "2016", "Casualty Actuarial Society"]],
  "c": ["Textbook", "Introductory Time Series with R",
        "Paul S.P. Cowpertwait, Andrew V. Metcalfe",
        ["2009", "Springer"]]
}};
const KEYS = [["now", "Today"], ["a", "Poster"], ["b", "Motif"], ["c", "Paper"]];
const STORE = "jackets.pick";

function readPick() {{
  try {{
    const v = localStorage.getItem(STORE);
    if (v && DATA.covers[v]) return v;
  }} catch (e) {{ /* private window, blocked storage — fall through */ }}
  return DATA.order[0];
}}
function writePick(v) {{
  try {{ localStorage.setItem(STORE, v); }} catch (e) {{ /* not essential */ }}
}}

const picker = document.getElementById("picker");
const compare = document.getElementById("compare");
let current = readPick();

function paintCompare() {{
  compare.innerHTML = KEYS.map(([k, name]) => `
    <figure class="${{k === "now" ? "is-now" : ""}}">
      <img src="${{DATA.covers[current][k]}}" alt="${{name}} design for ${{DATA.labels[current]}}">
      <figcaption>
        <span class="cap-key">${{k === "now" ? "Now" : k.toUpperCase()}}</span>
        <span class="cap-name">${{name}}</span>
      </figcaption>
    </figure>`).join("");
  picker.querySelectorAll("button").forEach(b => {{
    b.setAttribute("aria-pressed", String(b.dataset.book === current));
  }});
}}

picker.innerHTML = DATA.order.map(n =>
  `<button type="button" data-book="${{n.replace(/"/g, "&quot;")}}" aria-pressed="false">${{DATA.labels[n]}}</button>`
).join("");
picker.addEventListener("click", e => {{
  const b = e.target.closest("button");
  if (!b) return;
  current = b.dataset.book;
  writePick(current);
  paintCompare();
}});
paintCompare();

document.querySelectorAll("[data-shelf]").forEach(shelf => {{
  const k = shelf.dataset.shelf;
  shelf.innerHTML = DATA.order.map(n =>
    `<img src="${{DATA.covers[n][k]}}" alt="${{DATA.labels[n]}}" title="${{DATA.labels[n]}}">`
  ).join("");
}});

document.querySelectorAll("[data-cards]").forEach(host => {{
  const k = host.dataset.cards;
  const [kicker, title, author, chips] = CARD[k];
  const book = DATA.order.find(n => DATA.labels[n] === title) || DATA.order[0];
  host.innerHTML = `
    <div class="card">
      <img src="${{DATA.covers[book][k]}}" alt="Cover of ${{title}}">
      <div class="card-body">
        <p class="card-kicker">${{kicker}}</p>
        <p class="card-title">${{title}}</p>
        <p class="card-author">${{author}}</p>
        <div class="chips">${{chips.map(c => `<span>${{c}}</span>`).join("")}}</div>
      </div>
    </div>
    <div class="card">
      <img src="${{DATA.covers[book]["now"]}}" alt="Today's cover of ${{title}}">
      <div class="card-body">
        <p class="card-kicker">${{kicker}} · today</p>
        <p class="card-title">${{title}}</p>
        <p class="card-author">${{author}}</p>
        <div class="chips">${{chips.map(c => `<span>${{c}}</span>`).join("")}}</div>
      </div>
    </div>`;
}});
</script>
"""

OUT.write_text(HTML, encoding="utf-8")
print(OUT, len(HTML))
