export type BannerId = 'acas' | 'asa' | 'fcas' | 'fsa' | 'beta_tester' | 'custom'

export interface BannerEquip {
  id: BannerId
  text?: string
}

// A single string = one required exam. An array = "any one of these" (OR group).
export type RequirementGroup = string | [string, ...string[]]

export interface DesignationBanner {
  id: 'acas' | 'asa' | 'fcas' | 'fsa'
  label: string
  fullName: string
  requirements: RequirementGroup[]
  colors: { bg: string; text: string; border: string }
}

export function serializeBanner(equip: BannerEquip): string {
  return JSON.stringify(equip)
}

export function parseBanner(raw: string | null | undefined): BannerEquip | null {
  if (!raw || typeof raw !== 'string') return null
  try { return JSON.parse(raw) as BannerEquip }
  catch { return null }
}

export function isBannerEarned(
  banner: DesignationBanner,
  progress: Record<string, string>,
): boolean {
  return banner.requirements.every(req => {
    if (typeof req === 'string') return progress[req] === 'completed'
    return req.some(r => progress[r] === 'completed')
  })
}

export function bannerProgress(
  banner: DesignationBanner,
  progress: Record<string, string>,
): { done: number; total: number } {
  let done = 0
  for (const req of banner.requirements) {
    if (typeof req === 'string') {
      if (progress[req] === 'completed') done++
    } else {
      if (req.some(r => progress[r] === 'completed')) done++
    }
  }
  return { done, total: banner.requirements.length }
}

const ACAS_REQS: RequirementGroup[] = [
  'VEE-ECON', 'VEE-AF', 'P', 'FM',
  'MAS-I', 'MAS-II', 'CAS-IA', 'CAS-DA', 'CAS-RM',
  'CAS-5', 'CAS-PCPA', 'CAS-6', 'CAS-APC',
]

const ASA_REQS: RequirementGroup[] = [
  'VEE-MS', 'VEE-ECON', 'VEE-AF', 'P', 'FM',
  'PAF', 'FAM', 'SRM', 'ASF', 'PA',
  ['ALTAM', 'ASTAM'],
  'ATPA', 'FAP', 'APC',
]

export const DESIGNATION_BANNERS: DesignationBanner[] = [
  {
    id: 'acas',
    label: 'ACAS',
    fullName: 'Associate of the Casualty Actuarial Society',
    requirements: ACAS_REQS,
    colors: { bg: '#EFF6FF', text: '#1E40AF', border: '#BFDBFE' },
  },
  {
    id: 'asa',
    label: 'ASA',
    fullName: 'Associate of the Society of Actuaries',
    requirements: ASA_REQS,
    colors: { bg: '#F0FDF4', text: '#166534', border: '#BBF7D0' },
  },
  {
    id: 'fcas',
    label: 'FCAS',
    fullName: 'Fellow of the Casualty Actuarial Society',
    requirements: [...ACAS_REQS, 'CAS-7', 'CAS-8', 'CAS-9'],
    colors: { bg: '#FFFBEB', text: '#92400E', border: '#FDE68A' },
  },
  {
    id: 'fsa',
    label: 'FSA',
    fullName: 'Fellow of the Society of Actuaries',
    requirements: [...ASA_REQS, 'FSA-DMAC', 'FSA-FAC'],
    colors: { bg: '#FFF7ED', text: '#9A3412', border: '#FED7AA' },
  },
]

export const CUSTOM_BANNER_PRICE = 100
export const CUSTOM_BANNER_PURCHASE_ID = 'banner:custom'
export const CUSTOM_BANNER_MAX_CHARS = 15
