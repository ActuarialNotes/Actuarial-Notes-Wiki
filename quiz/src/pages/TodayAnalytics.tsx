// Analytics, the screen Today's tile opens (docs/redesign-spec.md §4.5): one
// exam's practice over 7, 30 or 90 days. Pro only (R1): anyone else is sent to
// Upgrade, and no one else's answers are read.

import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { AnalyticsScreen } from '@/components/today/AnalyticsScreen'
import { LoadingMark } from '@/components/LoadingMark'
import { GROUND } from '@/components/ui/OutlineCard'
import { useAccuracyTrend } from '@/hooks/useAccuracyTrend'
import { useAllQuestions } from '@/hooks/useAllQuestions'
import { useAuth } from '@/hooks/useAuth'
import { useBack, usePageLabel } from '@/hooks/useBack'
import { useSubscription } from '@/hooks/useSubscription'
import { useTodayExam } from '@/hooks/useTodayExam'
import { questionExamLabel } from '@/lib/examIds'
import { cn } from '@/lib/utils'

export default function TodayAnalytics() {
  const { user, loading: authLoading } = useAuth()
  const { isPro, loading: subscriptionLoading } = useSubscription()
  const { questions } = useAllQuestions()
  const exam = useTodayExam()
  const back = useBack({ to: '/dashboard', label: 'Today' })
  usePageLabel('Analytics')

  const examLabel = exam.active ? questionExamLabel(exam.active) : null
  const { trends, rows } = useAccuracyTrend(isPro ? examLabel : null, questions)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  if (authLoading || subscriptionLoading || exam.loading) {
    return <div className={cn(GROUND, 'flex min-h-screen items-center justify-center')}><LoadingMark /></div>
  }
  if (!user) return <Navigate to="/dashboard" replace />
  if (!isPro) return <Navigate to="/upgrade" replace />
  if (!exam.active || !exam.activeKey || !examLabel) return <Navigate to="/dashboard" replace />
  if (!trends || !rows) {
    return <div className={cn(GROUND, 'flex min-h-screen items-center justify-center')}><LoadingMark /></div>
  }

  return (
    <AnalyticsScreen
      trends={trends}
      rows={rows}
      examLabel={examLabel}
      examKey={exam.activeKey}
      syllabus={exam.active}
      questions={questions}
      onBack={back.go}
      backLabel={back.label}
    />
  )
}
