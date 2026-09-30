// Internal routing helpers for the wiki section of the quiz app.
// Replaces the old external URL builder (wikiUrl.ts) that pointed at
// wiki.actuarialnotes.com; everything now resolves to /wiki/... routes.
// "Expected Value" → "Expected+Value" (matches Obsidian Publish slugs, keeps
// existing `wiki_link` values in question frontmatter working).
function toSlug(name) {
    // encodeURIComponent first (encodes special chars), then swap %20 → +.
    // Doing the space→+ replacement before encodeURIComponent would cause +
    // to be double-encoded as %2B, breaking fromSlug round-trips.
    return encodeURIComponent(name.trim()).replace(/%20/g, '+');
}
export function fromSlug(slug) {
    return decodeURIComponent(slug.replace(/\+/g, ' '));
}
export function wikiRoute(ref) {
    return "/wiki/".concat(ref.kind, "/").concat(toSlug(ref.name));
}
// Convert a repo-relative file path ("Concepts/Expected Value.md",
// "Resources/Books/Probability for Risk Management.md",
// "Exam P-1 (SOA).md") to its wiki route and vice versa.
export function pathToEntryRef(path) {
    var _a;
    var p = path.replace(/^\/+/, '').replace(/\.md$/i, '');
    if (p.toLowerCase().startsWith('concepts/')) {
        return { kind: 'concept', name: p.slice('concepts/'.length) };
    }
    if (p.toLowerCase().startsWith('resources/books/')) {
        return { kind: 'resource', name: p.slice('resources/books/'.length) };
    }
    if (p.toLowerCase().startsWith('resources/events/')) {
        return { kind: 'event', name: p.slice('resources/events/'.length), path: "".concat(p, ".md") };
    }
    if (p.toLowerCase().startsWith('resources/regulation/')) {
        return { kind: 'regulation', name: p.slice('resources/regulation/'.length), path: "".concat(p, ".md") };
    }
    if (p.toLowerCase().startsWith('resources/benchmarks/')) {
        return { kind: 'resource', name: p.slice('resources/benchmarks/'.length), path: "".concat(p, ".md") };
    }
    // An exam-page orientation tip: Guides/<exam page>/<tip>.md. The name is the
    // tip alone — the folder is what says which exam it belongs to — so the path
    // has to travel with the ref ("Scoring" is a page under every exam).
    if (p.toLowerCase().startsWith('guides/')) {
        var title = (_a = p.split('/').pop()) !== null && _a !== void 0 ? _a : p;
        return { kind: 'guide', name: title, path: "".concat(p, ".md") };
    }
    if (/^Exam[ -]/i.test(p)) {
        return { kind: 'exam', name: p };
    }
    return null;
}
export function entryRefToRepoPath(ref) {
    if (ref.path)
        return ref.path;
    switch (ref.kind) {
        case 'concept':
            return "Concepts/".concat(ref.name, ".md");
        case 'resource':
            return "Resources/Books/".concat(ref.name, ".md");
        case 'exam':
            return "".concat(ref.name, ".md");
        case 'event':
            return "Resources/Events/".concat(ref.name, ".md");
        case 'regulation':
            return "Resources/Regulation/".concat(ref.name, ".md");
        // Only reachable for a guide ref built without its path; a real one always
        // carries the exam folder it lives in and returns above.
        case 'guide':
            return "Guides/".concat(ref.name, ".md");
    }
}
// Normalise the many forms a wiki reference can take — Obsidian wikilinks,
// plus/encoded slugs, absolute or relative URLs — into a WikiEntryRef.
// Returns null when the href doesn't look like an internal wiki target.
export function hrefToEntryRef(href) {
    if (!href)
        return null;
    // Strip protocol/host for known wiki domains.
    var clean = href;
    try {
        var u = new URL(href, 'https://placeholder.local');
        if (u.host === 'wiki.actuarialnotes.com' ||
            u.host === 'placeholder.local' // relative
        ) {
            clean = u.pathname + u.search + u.hash;
        }
        else {
            return null;
        }
    }
    catch (_a) {
        /* non-URL string, treat as path */
    }
    // Drop fragment / query, trim leading slashes, turn + back into spaces.
    clean = clean.split('#')[0].split('?')[0].replace(/^\/+/, '').replace(/\+/g, ' ');
    if (!clean)
        return null;
    // Already slugged as concept/resource/exam internal route?
    var internal = clean.match(/^wiki\/(concept|resource|exam|event|regulation|guide)\/(.+)$/i);
    if (internal) {
        return { kind: internal[1].toLowerCase(), name: fromSlug(internal[2]) };
    }
    var decoded = decodeURIComponent(clean);
    var asPath = pathToEntryRef(decoded);
    if (asPath)
        return asPath;
    // Otherwise assume it's a bare concept name (the common [[Expected Value]] case).
    return { kind: 'concept', name: decoded };
}
// Canonical short exam id used as a localStorage key (`actuarial-notes-learned`)
// and as the `?from=` query param on concept routes. Accepts any of:
//   "Exam P-1 (SOA)"   (filename)          → "p-1"
//   "Exam P-1 (SOA).md"                    → "p-1"
//   "Exam P"           (syllabus label)    → "p-1"   (assumes -1 suffix)
//   "P-1"              (raw id)            → "p-1"
// Fills in the -N suffix when missing because publish.js keys always carry it.
export function examIdFromFile(name) {
    var cleaned = name
        .replace(/\.md$/i, '')
        .replace(/^Exam\s+/i, '')
        .replace(/\s*\([^)]*\)\s*$/, '')
        .trim();
    if (!cleaned)
        return name.toLowerCase();
    var withDash = cleaned.includes('-') ? cleaned : "".concat(cleaned, "-1");
    return withDash.toLowerCase();
}
// Display name for an exam page: the file name without its `.md` extension and
// without the examining-body suffix the vault files carry.
//   "Exam P-1 (SOA).md"  → "Exam P-1"
//   "Exam MAS-I (CAS)"   → "Exam MAS-I"
// The quiz builder already labels exams this way (`Exam P-1`, `Exam 5`), so the
// study-guide cards use this to match.
export function examDisplayName(name) {
    var cleaned = name
        .replace(/\.md$/i, '')
        .replace(/\s*\((?:SOA|CAS)\)\s*$/i, '')
        .trim();
    return cleaned || name;
}
