import { describe, expect, it } from 'vitest'
import { dialogOpenOver, MODAL_DIALOG_SELECTOR, type DialogNode } from './layeredDialog'

/** A node that contains itself and the nodes listed as inside it. */
function node(...inside: DialogNode[]): DialogNode {
  const self: DialogNode = { contains: other => other === self || inside.includes(other as DialogNode) }
  return self
}

const rootWith = (...dialogs: DialogNode[]) => ({
  querySelectorAll: (selector: string) => (selector === MODAL_DIALOG_SELECTOR ? dialogs : []),
})

describe('dialogOpenOver', () => {
  const host = node()

  it('is false with no dialog open', () => {
    expect(dialogOpenOver(host, rootWith())).toBe(false)
  })

  it('is false for the host itself, or a dialog the host sits inside', () => {
    expect(dialogOpenOver(host, rootWith(host))).toBe(false)
    expect(dialogOpenOver(host, rootWith(node(host)))).toBe(false)
  })

  it('is true for a dialog layered over the host', () => {
    expect(dialogOpenOver(host, rootWith(host, node()))).toBe(true)
  })

  it('counts any dialog for a host not yet mounted, and none without a document', () => {
    expect(dialogOpenOver(null, rootWith(node()))).toBe(true)
    expect(dialogOpenOver(host, undefined)).toBe(false)
  })
})
