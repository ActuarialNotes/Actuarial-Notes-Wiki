import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import { useExamProgress, type ExamProgressRow } from '@/contexts/ExamProgressContext'
import type { ItemStatus } from '@/data/tracks'

export type { ExamProgressRow }
export type { ItemStatus }

export interface ProfileData {
  displayName: string
  email: string
  avatarUrl: string
}

interface SectionState {
  saving: boolean
  error: string | null
  success: string | null
}

function initSection(): SectionState {
  return { saving: false, error: null, success: null }
}

export function useSettings() {
  const { user } = useAuth()
  const { examRows, setExamRows, loadingExams, saveExamRows, examsState } = useExamProgress()

  const [profile, setProfile] = useState<ProfileData>({ displayName: '', email: '', avatarUrl: '' })
  const [loadingProfile, setLoadingProfile] = useState(true)

  const [accountState, setAccountState] = useState<SectionState>(initSection)
  const [profileState, setProfileState] = useState<SectionState>(initSection)
  const [dataState, setDataState] = useState<SectionState>(initSection)

  // Load profile from user metadata
  useEffect(() => {
    if (!user) return
    const meta = user.user_metadata ?? {}
    setProfile({
      displayName: (meta.display_name as string) ?? '',
      email: user.email ?? '',
      avatarUrl: (meta.avatar_url as string) ?? '',
    })
    setLoadingProfile(false)
  }, [user])

  // --- Account: change password ---
  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    if (!user?.email) return
    setAccountState({ saving: true, error: null, success: null })
    const { error: signInErr } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    })
    if (signInErr) {
      setAccountState({ saving: false, error: 'Current password is incorrect.', success: null })
      return false
    }
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) {
      setAccountState({ saving: false, error: error.message, success: null })
      return false
    }
    setAccountState({ saving: false, error: null, success: 'Password updated successfully.' })
    return true
  }, [user])

  // --- Profile: update display name / email / avatar URL ---
  const updateProfile = useCallback(async (data: Partial<ProfileData>) => {
    setProfileState({ saving: true, error: null, success: null })
    const updatePayload: Parameters<typeof supabase.auth.updateUser>[0] = {}

    if (data.email && data.email !== user?.email) {
      updatePayload.email = data.email
    }
    if (data.displayName !== undefined || data.avatarUrl !== undefined) {
      updatePayload.data = {
        ...(data.displayName !== undefined && { display_name: data.displayName }),
        ...(data.avatarUrl !== undefined && { avatar_url: data.avatarUrl }),
      }
    }

    const { error } = await supabase.auth.updateUser(updatePayload)
    if (error) {
      setProfileState({ saving: false, error: error.message, success: null })
      return false
    }
    const message = data.email && data.email !== user?.email
      ? 'Confirmation email sent to new address. Display name saved.'
      : 'Profile saved.'
    setProfileState({ saving: false, error: null, success: message })
    return true
  }, [user])

  // --- Profile: upload avatar to Supabase Storage ---
  const uploadAvatar = useCallback(async (file: File): Promise<string | null> => {
    if (!user) return null
    const ext = file.name.split('.').pop()
    const path = `${user.id}/${Date.now()}.${ext}`
    const { error: uploadErr } = await supabase.storage
      .from('avatars')
      .upload(path, file, { upsert: true })
    if (uploadErr) {
      setProfileState(s => ({ ...s, error: uploadErr.message }))
      return null
    }
    const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(path)
    return urlData.publicUrl
  }, [user])

  // --- Data: reset study history ---
  const resetHistory = useCallback(async () => {
    if (!user) return false
    setDataState({ saving: true, error: null, success: null })
    const { error } = await supabase.from('quiz_sessions').delete().eq('user_id', user.id)
    if (error) {
      setDataState({ saving: false, error: error.message, success: null })
      return false
    }
    setDataState({ saving: false, error: null, success: 'Study history cleared.' })
    return true
  }, [user])

  // --- Data: delete account (via Edge Function) ---
  const deleteAccount = useCallback(async () => {
    setDataState({ saving: true, error: null, success: null })
    const { error } = await supabase.functions.invoke('delete-account')
    if (error) {
      setDataState({ saving: false, error: error.message, success: null })
      return false
    }
    await supabase.auth.signOut()
    return true
  }, [])

  return {
    profile,
    setProfile,
    examRows,
    setExamRows,
    loadingProfile,
    loadingExams,
    changePassword,
    updateProfile,
    uploadAvatar,
    saveExamRows,
    resetHistory,
    deleteAccount,
    accountState,
    profileState,
    examsState,
    dataState,
  }
}
