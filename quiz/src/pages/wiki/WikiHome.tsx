import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookMarked, GraduationCap } from 'lucide-react'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { buildWikiIndex, type WikiIndexItem } from '@/lib/wikiIndex'
import { wikiRoute, examIdFromFile } from '@/lib/wikiRoutes'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useWikiPage } from '@/components/wiki/WikiLayout'

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

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Actuarial Notes Wiki</h1>
        <p className="text-muted-foreground mt-1">
          Concepts, learning objectives, and resources for the actuarial exams.
        </p>
      </header>

      <section>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-teal-500" />
          Exams
        </h2>
        {loading && exams.length === 0 ? (
          <p className="text-sm text-muted-foreground">Loading exams…</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {exams.map(exam => {
              const match = syllabi.find(s => examIdFromFile(s.examLabel) === examIdFromFile(exam.name))
              return (
                <Link key={exam.path} to={wikiRoute({ kind: 'exam', name: exam.name })}>
                  <Card className="h-full transition-colors hover:bg-accent/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{exam.name}</CardTitle>
                      {match && (
                        <CardDescription>{match.examTopic}</CardDescription>
                      )}
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
