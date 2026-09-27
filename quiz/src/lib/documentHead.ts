// Writes a page's head into the live document.
//
// The same tags, found by the same selectors, that `headTagsHtml` (lib/seo.ts)
// writes into a page's static file — so a page fetched cold and a page reached
// by navigating the app end with one head, and the tags a static file shipped
// are updated in place rather than duplicated. Google renders the app before it
// indexes, so this is what it reads once the page has run.

import type { PageHead } from '@/lib/seo'

function setMeta(doc: Document, attr: 'name' | 'property', key: string, content: string | undefined): void {
  let el = doc.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (content == null) {
    el?.remove()
    return
  }
  if (!el) {
    el = doc.createElement('meta')
    el.setAttribute(attr, key)
    doc.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(doc: Document, href: string | undefined): void {
  let el = doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!href) {
    el?.remove()
    return
  }
  if (!el) {
    el = doc.createElement('link')
    el.setAttribute('rel', 'canonical')
    doc.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function setJsonLd(doc: Document, data: object[] | undefined): void {
  let el = doc.head.querySelector<HTMLScriptElement>('script[type="application/ld+json"][data-page-jsonld]')
  if (!data?.length) {
    el?.remove()
    return
  }
  if (!el) {
    el = doc.createElement('script')
    el.type = 'application/ld+json'
    el.setAttribute('data-page-jsonld', '')
    doc.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

/** Make the document's head say `head` — every tag, including the ones it leaves out. */
export function applyPageHead(head: PageHead, doc: Document = document): void {
  doc.title = head.title
  setMeta(doc, 'name', 'description', head.description)
  setMeta(doc, 'name', 'robots', head.noindex ? 'noindex' : undefined)
  setCanonical(doc, head.canonical)
  setMeta(doc, 'property', 'og:type', head.ogType ?? 'website')
  setMeta(doc, 'property', 'og:title', head.title)
  setMeta(doc, 'property', 'og:description', head.description)
  setMeta(doc, 'property', 'og:url', head.canonical)
  setJsonLd(doc, head.jsonLd)
}

/** The canonical URL the document currently declares, if any. */
export function currentCanonical(doc: Document = document): string | undefined {
  return doc.head.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? undefined
}
