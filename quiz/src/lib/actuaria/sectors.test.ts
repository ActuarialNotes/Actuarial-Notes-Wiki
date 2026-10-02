import { describe, expect, it } from 'vitest'
import examPages from 'virtual:exam-pages'
import { TRACKS } from '@/data/tracks'
import { parseExamMetadata, parseExamSyllabus, type WikiExamSyllabus } from '@/lib/wikiParser'
import {
  ORBIT_FLATTENING,
  buildSectors,
  ladderRank,
  pointsAlongEllipse,
  sectorByKey,
  starMapLayout,
} from './sectors'

const SYLLABI: WikiExamSyllabus[] = Object.entries(examPages).flatMap(([file, content]) => {
  const meta = parseExamMetadata(content)
  return meta ? [parseExamSyllabus(content, meta.examId, meta.examLabel, meta.examTopic, file.replace(/\.md$/, ''))] : []
})

const DEFAULT = TRACKS.find(t => t.key === 'DEFAULT')!
const ASA = TRACKS.find(t => t.key === 'ASA')!

describe('sectors', () => {
  it('puts every exam of the track the vault covers on the map, in ladder order', () => {
    const sectors = buildSectors({ syllabi: SYLLABI, track: DEFAULT, progress: {} })
    const keys = sectors.map(s => s.key)
    expect(keys.slice(0, 4)).toEqual(['P', 'FM', 'MAS-I', 'MAS-II'])
    expect(keys).toContain('CAS-5')
    expect(keys.indexOf('CAS-PCPA')).toBe(keys.indexOf('CAS-5') + 1)
    expect(keys.indexOf('CAS-6')).toBe(keys.indexOf('CAS-PCPA') + 1)
    // One place per exam: Exam 6's regional pages share a key.
    expect(new Set(keys).size).toBe(keys.length)
    for (let i = 1; i < sectors.length; i++) expect(ladderRank(sectors[i].key)).toBeGreaterThan(ladderRank(sectors[i - 1].key))
  })

  it('leaves requirements that are not rungs — the DISCs — off the map', () => {
    const acas = TRACKS.find(t => t.key === 'ACAS')!
    const keys = buildSectors({ syllabi: SYLLABI, track: acas, progress: {} }).map(s => s.key)
    expect(keys.some(k => k.startsWith('CAS-D') || k === 'CAS-IA' || k === 'CAS-RM')).toBe(false)
  })

  it('charts an exam being studied or passed, and keeps a charted exam off the track on the map', () => {
    const sectors = buildSectors({
      syllabi: SYLLABI,
      track: ASA,
      progress: { P: 'in_progress', FM: 'completed', 'CAS-5': 'in_progress' },
    })
    const p = sectorByKey(sectors, 'P')!
    expect([p.charted, p.cleared, p.onTrack]).toEqual([true, false, true])
    expect(sectorByKey(sectors, 'FM')!.cleared).toBe(true)
    // Exam 5 is on no SOA track, but the player studies it.
    const five = sectorByKey(sectors, 'CAS-5')!
    expect([five.charted, five.onTrack]).toEqual([true, false])
    // MAS-I is on neither and not charted: not a place on this player's map.
    expect(sectorByKey(sectors, 'MAS-I')).toBeUndefined()
  })

  it('binds Exam 6 to the syllabus with a question bank unless a variant is chosen', () => {
    const sectors = buildSectors({ syllabi: SYLLABI, track: DEFAULT, progress: {} })
    const six = sectorByKey(sectors, 'CAS-6')!
    expect(six.syllabus.examId).toBe('6C')
    expect(six.bankLabel).toBe('Exam 6C')
  })
})

describe('the star map', () => {
  it('spaces points round an ellipse by arc length', () => {
    const points = pointsAlongEllipse(300, 126, 8, Math.PI)
    expect(points).toHaveLength(8)
    const gaps = points.map((p, i) => {
      const q = points[(i + 1) % points.length]
      return Math.hypot(q.x - p.x, q.y - p.y)
    })
    const min = Math.min(...gaps)
    const max = Math.max(...gaps)
    expect(max / min).toBeLessThan(1.25)
    // The first sits at the left end, the next one over the top.
    expect(points[0].x).toBeCloseTo(-300, 5)
    expect(points[1].y).toBeLessThan(0)
  })

  it('puts charted sectors on the second orbit and uncharted on the third, on the ellipse', () => {
    const sectors = buildSectors({ syllabi: SYLLABI, track: DEFAULT, progress: { P: 'in_progress', FM: 'in_progress' } })
    for (const size of ['wide', 'compact'] as const) {
      const layout = starMapLayout(sectors, size)
      expect(layout.orbits[1].ry).toBeCloseTo(layout.orbits[1].rx * ORBIT_FLATTENING)
      for (const placed of layout.sectors) {
        const orbit = layout.orbits[placed.charted ? 1 : 2]
        const dx = (placed.x - layout.cx) / orbit.rx
        const dy = (placed.y - layout.cy) / orbit.ry
        expect(dx * dx + dy * dy).toBeCloseTo(1, 3)
        // Inside the canvas.
        expect(placed.x - placed.r).toBeGreaterThanOrEqual(0)
        expect(placed.x + placed.r).toBeLessThanOrEqual(layout.width)
        expect(placed.y - placed.r).toBeGreaterThanOrEqual(0)
        expect(placed.y + placed.r).toBeLessThanOrEqual(layout.height)
      }
      // No two planets touch.
      for (let i = 0; i < layout.sectors.length; i++) {
        for (let j = i + 1; j < layout.sectors.length; j++) {
          const a = layout.sectors[i]
          const b = layout.sectors[j]
          expect(Math.hypot(a.x - b.x, a.y - b.y), `${a.key}/${b.key} ${size}`).toBeGreaterThan(a.r + b.r)
        }
      }
    }
  })

  it('keeps ladder order round each orbit', () => {
    const sectors = buildSectors({ syllabi: SYLLABI, track: DEFAULT, progress: {} })
    const layout = starMapLayout(sectors)
    expect(layout.sectors.map(s => s.key)).toEqual(sectors.map(s => s.key))
  })
})
