import { describe, expect, it } from 'vitest'
import { vaultMediaUrl } from './vaultAssets'

describe('vaultMediaUrl', () => {
  it('serves a vault image from the app itself, at the same path', () => {
    expect(vaultMediaUrl('Media/Figures/Bayes_Theorem.svg')).toBe('/Media/Figures/Bayes_Theorem.svg')
  })

  it('encodes each segment, so a title with spaces, commas and ampersands is one URL', () => {
    expect(
      vaultMediaUrl('Media/Attachments/Mathematical Statistics (Wackerly, Mendenhall, & Scheaffer - 2008) - Cover.jpg'),
    ).toBe('/Media/Attachments/Mathematical%20Statistics%20(Wackerly%2C%20Mendenhall%2C%20%26%20Scheaffer%20-%202008)%20-%20Cover.jpg')
  })

  it('tolerates a leading slash', () => {
    expect(vaultMediaUrl('/Media/Attachments/a.png')).toBe('/Media/Attachments/a.png')
  })

  it('has no copy of anything outside Media/', () => {
    expect(vaultMediaUrl('Concepts/Bayes Theorem.md')).toBeUndefined()
    expect(vaultMediaUrl('README.md')).toBeUndefined()
    expect(vaultMediaUrl('MediaX/a.png')).toBeUndefined()
  })
})
