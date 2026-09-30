import { describe, expect, it } from 'vitest'
import { callsBackToBattle, isQueued, lobbyOwnerKey, reusesLobby, showsBattleQueue, waitedClock } from './battleQueue'
import type { LobbySnapshot } from './battleMatchmaking'

const me = { id: 'c1', name: 'Ada', exam: 'any', since: 0, v: 1 } as LobbySnapshot['me']

describe('isQueued', () => {
  it('is ready and still looking', () => {
    expect(isQueued({ status: 'searching', ready: true, me })).toBe(true)
    expect(isQueued({ status: 'connecting', ready: true, me })).toBe(true)
  })

  it('is not a player only watching the lobby', () => {
    expect(isQueued({ status: 'searching', ready: false, me })).toBe(false)
    expect(isQueued({ status: 'searching', ready: true, me: null })).toBe(false)
    expect(isQueued(null)).toBe(false)
  })

  it('is over once matched or gone', () => {
    expect(isQueued({ status: 'matched', ready: true, me })).toBe(false)
    expect(isQueued({ status: 'closed', ready: true, me })).toBe(false)
  })
})

describe('reusesLobby', () => {
  const key = lobbyOwnerKey({ name: 'Ada' })

  it('takes the held session back for the same player', () => {
    expect(reusesLobby({ ownerKey: key, snapshot: { status: 'searching' } }, key)).toBe(true)
    expect(reusesLobby({ ownerKey: key, snapshot: { status: 'connecting' } }, key)).toBe(true)
  })

  it('starts afresh for a new name or avatar', () => {
    expect(reusesLobby({ ownerKey: key, snapshot: { status: 'searching' } }, lobbyOwnerKey({ name: 'Bo' }))).toBe(false)
    expect(
      reusesLobby({ ownerKey: key, snapshot: { status: 'searching' } }, lobbyOwnerKey({ name: 'Ada', avatarUrl: 'a.png' })),
    ).toBe(false)
  })

  it('never takes over a finished session', () => {
    expect(reusesLobby({ ownerKey: key, snapshot: { status: 'matched' } }, key)).toBe(false)
    expect(reusesLobby({ ownerKey: key, snapshot: { status: 'closed' } }, key)).toBe(false)
    expect(reusesLobby(null, key)).toBe(false)
  })
})

describe('showsBattleQueue', () => {
  it('shows while queued and no lobby screen is up', () => {
    expect(showsBattleQueue(true, 0)).toBe(true)
    expect(showsBattleQueue(true, 1)).toBe(false)
    expect(showsBattleQueue(false, 0)).toBe(false)
  })
})

describe('callsBackToBattle', () => {
  it('fetches the player only when no battle page will pick the match up', () => {
    expect(callsBackToBattle(true, 0)).toBe(true)
    expect(callsBackToBattle(true, 1)).toBe(false)
    expect(callsBackToBattle(false, 0)).toBe(false)
  })
})

describe('waitedClock', () => {
  it('reads minutes and seconds since the place was taken', () => {
    expect(waitedClock(1_000, 43_500)).toBe('0:42')
    expect(waitedClock(0, 125_000)).toBe('2:05')
  })

  it('never reads negative on a clock that stepped back', () => {
    expect(waitedClock(10_000, 5_000)).toBe('0:00')
  })
})
