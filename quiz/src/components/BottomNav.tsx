import { NavLink } from 'react-router-dom'
import { BookOpen, LayoutDashboard, Layers, Play, Settings2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

const NAV_ITEMS = [
  { to: '/',            label: 'Quiz',      icon: Play,            end: true,  authRequired: false },
  { to: '/flashcards',  label: 'Flashcards', icon: Layers,          end: false, authRequired: false },
  { to: '/wiki',        label: 'Guides',    icon: BookOpen,        end: false, authRequired: false },
  { to: '/dashboard',   label: 'Dashboard', icon: LayoutDashboard, end: false, authRequired: true  },
  { to: '/settings',    label: 'Settings',  icon: Settings2,       end: false, authRequired: false },
] as const

export default function BottomNav() {
  const { user } = useAuth()

  const items = NAV_ITEMS.filter(item => !item.authRequired || !!user)

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[45] flex md:hidden bg-background/95 backdrop-blur-md border-t border-border h-14">
      {items.map(item => {
        const Icon = item.icon
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center justify-center gap-0.5 transition-colors ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`
            }
          >
            <Icon className="h-5 w-5 shrink-0" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        )
      })}
    </nav>
  )
}
