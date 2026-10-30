/**
 * What Listen carries from one page of the concept popup to the next: whether
 * the voice was reading when the page was left, and at what speed.
 *
 * Each page of the popup is its own `ConceptPagePanel`, mounted per page, so a
 * page's own state ends with it. This module-level record is what lets a
 * reader who opens another page while the voice is reading hear that page read
 * on, at the same speed, rather than land back on the article in silence. It
 * is not persisted: a voice that was reading before a reload is not reading
 * after it, and closing the popup clears it.
 */
let reading = false
let rate = 1

/** Whether the next page opened should open in Listen and read on. */
export function listenCarriesOver(): boolean {
  return reading
}

export function setListenReading(next: boolean): void {
  reading = next
}

export function listenRate(): number {
  return rate
}

export function setListenRate(next: number): void {
  rate = next
}
