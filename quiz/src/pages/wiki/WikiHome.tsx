import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookMarked, GraduationCap } from 'lucide-react'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { buildWikiIndex, type WikiIndexItem } from '@/lib/wikiIndex'
import { wikiRoute, examIdFromFile } from '@/lib/wikiRoutes'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import { TRACKS, type Track } from '@/data/tracks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useWikiPage } from '@/components/wiki/WikiLayout'

// Maps an exam display name (e.g. "Exam 6C (CAS)") to the progress key used in tracks.ts (e.g. "CAS-6").
function examNameToTrackKey(name: string): string {
  const cleaned = name
    .replace(/^Exam\s+/i, '')
    .replace(/\s*\([^)]*\)\s*$/, '')
    .trim()
  return wikiExamIdToProgressKey(cleaned)
}

const TRACK_ORDER = ['ACAS', 'FCAS', 'ASA', 'FSA']

export default function WikiHome() {
  const { syllabi, loading } = useWikiSyllabus()
  const { setPageRefs, setExamId } = useWikiPage()
  const [index, setIndex] = useState<WikiIndexItem[]>([])

  useEffect(() => {
    setPageRefs([])
    setExamId(null)
  }, [setPageRefs, setExamId])

  useEffect(() => {
    buildWikiIndex().then(setIndex).catch(() => setIndex([]))
  }, [])

  const exams = useMemo(() => index.filter(i => i.category === 'exam'), [index])
  const books = useMemo(() => index.filter(i => i.category === 'document'), [index])

  // Map progress key → exam index items (multiple exams can share a key, e.g. 6/6C/6U → "CAS-6").
  const examsByKey = useMemo(() => {
    const map = new Map<string, WikiIndexItem[]>()
    for (const exam of exams) {
      const key = examNameToTrackKey(exam.name)
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(exam)
    }
    return map
  }, [exams])

  // Ordered credential tracks with their available exam study guides.
  const trackGroups = useMemo(() => {
    const credTracks = TRACK_ORDER
      .map(key => TRACKS.find(t => t.key === key))
      .filter((t): t is Track => t != null)

    return credTracks.map(track => {
      const orderedExams: WikiIndexItem[] = []
      const seenKeys = new Set<string>()
      for (const section of track.sections) {
        for (const item of section.items) {
          if (seenKeys.has(item.id)) continue
          seenKeys.add(item.id)
          const items = examsByKey.get(item.id)
          if (items) orderedExams.push(...items)
        }
      }
      return { track, exams: orderedExams }
    })
  }, [examsByKey])

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Study Guides</h1>
        <p className="text-muted-foreground mt-1">
          Concepts, learning objectives, and resources for the actuarial exams.
        </p>
      </header>

      <section>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-teal-500" />
          Exams
        </h2>
        {loading && exams.length === 0 ? (
          <p className="text-sm text-muted-foreground">Loading exams…</p>
        ) : (
          <div className="space-y-8">
            {trackGroups.map(({ track, exams: trackExams }) =>
              trackExams.length > 0 ? (
                <div key={track.key}>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    {track.name}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {trackExams.map(exam => {
                      const match = syllabi.find(
                        s => examIdFromFile(s.examLabel) === examIdFromFile(exam.name),
                      )
                      return (
                        <Link key={exam.path} to={wikiRoute({ kind: 'exam', name: exam.name })}>
                          <Card className="h-full transition-colors hover:bg-accent/30">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base">{exam.name}</CardTitle>
                              {match && <CardDescription>{match.examTopic}</CardDescription>}
                            </CardHeader>
                            <CardContent className="text-xs text-muted-foreground">
                              {match
                                ? `${match.topics.length} topic${match.topics.length === 1 ? '' : 's'} · ${match.topics.reduce((n, t) => n + t.concepts.length, 0)} concepts`
                                : 'Syllabus'}
                            </CardContent>
                          </Card>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ) : null,
            )}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <BookMarked className="h-5 w-5 text-muted-foreground" />
          Resources
        </h2>
        {books.length === 0 ? (
          <p className="text-sm text-muted-foreground">Loading resources…</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {books.map(book => (
              <Link key={book.path} to={wikiRoute({ kind: 'resource', name: book.name })}>
                <Card className="h-full transition-colors hover:bg-accent/30">
                  <CardHeader className="pb-1">
                    <CardTitle className="text-sm leading-snug">
                      {book.title ?? book.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    {[book.author, book.year].filter(Boolean).join(' · ') || 'Textbook'}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
