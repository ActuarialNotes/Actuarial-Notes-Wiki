"""Helvetica / Arial advance widths, measured not guessed.

The cover SVGs are laid out without a font engine, so every wrap decision rests
on a width estimate. These tables are the real per-character advances of the
cover font stack (`Helvetica Neue → Helvetica → Arial → Liberation Sans` — the
three are metric-compatible), measured once in a browser with
`getComputedTextLength` and normalised to the em. Regenerate with
`measure_metrics.html` (open it in a browser) if the stack ever changes.

Accuracy matters here in a way it does not for a concept figure: a title set
two steps too large silently runs off the edge of a 400 px jacket.
"""

# char → advance as a fraction of the font size
REGULAR: dict[str, float] = {}
BOLD: dict[str, float] = {}

_REGULAR_GROUPS = {
    0.1909: "'",
    0.2222: 'ijlł’',
    0.2598: '|',
    0.2778: ' !,./:;I[\\]ftí',
    0.333: '()-`r·“”',
    0.3341: '{}',
    0.355: '"',
    0.3892: '*',
    0.4692: '^',
    0.5: 'Jcksvxyzçćśźż',
    0.5563: '#$0123456789?L_abdeghnopquáäéóöüąęŁńū–',
    0.5841: '+<=>~',
    0.6109: 'FTZŻ',
    0.667: '&ABEKPSVXY',
    0.7222: 'CDHNRUw',
    0.7778: 'GOQ',
    0.833: 'Mm',
    0.8892: '%',
    0.9439: 'W',
    1.0: '—',
    1.0152: '@',
}
_BOLD_GROUPS = {
    0.2378: "'",
    0.2778: ' ,./I\\ijlíł’',
    0.2798: '|',
    0.333: '!()-:;[]`ft·',
    0.3892: '*r{}',
    0.4742: '"',
    0.5: 'zźż“”',
    0.5563: '#$0123456789J_aceksvxyáäçéąćęś–',
    0.5841: '+<=>^~',
    0.6109: '?FLTZbdghnopquóöüŁńūŻ',
    0.667: 'EPSVXY',
    0.7222: '&ABCDHKNRU',
    0.7778: 'GOQw',
    0.833: 'M',
    0.8892: '%m',
    0.9439: 'W',
    0.9752: '@',
    1.0: '—',
}

for _w, _chars in _REGULAR_GROUPS.items():
    for _c in _chars:
        REGULAR[_c] = _w
for _w, _chars in _BOLD_GROUPS.items():
    for _c in _chars:
        BOLD[_c] = _w

DEFAULT_REGULAR = 0.5563
DEFAULT_BOLD = 0.6109


def text_width(s: str, size: float, bold: bool = False,
               tracking: float = 0.0) -> float:
    """Rendered width of `s`, in user units, at `size`.

    `tracking` is the SVG `letter-spacing` in user units, which the renderer
    adds after every character including the last — matching that here keeps a
    tracked-out caps line inside its measure.
    """
    table = BOLD if bold else REGULAR
    default = DEFAULT_BOLD if bold else DEFAULT_REGULAR
    total = sum(table.get(ch, default) for ch in s)
    return total * size + tracking * len(s)
