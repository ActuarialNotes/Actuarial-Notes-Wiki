// Shared by lib/podcast.test.ts and lib/duplicationContracts.test.ts, which runs
// the daily email's copy of planEpisode against the same clips.
export const EPISODE_CLIPS: Record<string, { d: number; h: string }> = {
  'bridge/intro': { d: 6, h: 'i' },
  'bridge/refreshers': { d: 4, h: 'r' },
  'bridge/outro': { d: 7, h: 'o' },
  'brief/a': { d: 80, h: 'a' },
  'brief/b': { d: 90, h: 'b' },
  'brief/c': { d: 70, h: 'c' },
  'refresher/d': { d: 20, h: 'd' },
  'refresher/e': { d: 25, h: 'e' },
}
