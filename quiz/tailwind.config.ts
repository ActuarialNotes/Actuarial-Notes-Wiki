import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    // Quiz Battle's screens are the battle page's lazy chunk alone, so their
    // utilities go into its own stylesheet (tailwind.battle.config.ts), not the
    // first-paint CSS. BattleLogo (Games) and AbilityButton (the Hangar) are
    // drawn elsewhere too, so they stay in.
    '!./src/components/battle/deck/**',
    '!./src/pages/Battle.tsx',
    '!./src/components/battle/AbilityTray.tsx',
    '!./src/components/battle/BattleActionBar.tsx',
    '!./src/components/battle/BattleCountdown.tsx',
    '!./src/components/battle/BattleQuestionCard.tsx',
    '!./src/components/battle/BattleResults.tsx',
    '!./src/components/battle/BattleScoreboard.tsx',
    '!./src/components/battle/BattleSetupForm.tsx',
    '!./src/components/battle/BattleTopRow.tsx',
    '!./src/components/battle/LocalBattle.tsx',
    '!./src/components/battle/Matchmaking.tsx',
    '!./src/components/battle/OnlineBattle.tsx',
    '!./src/components/battle/PlayerTile.tsx',
    '!./src/components/battle/SkinParts.tsx',
    '!./src/components/battle/TopicPick.tsx',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        // The pick (Ink, style guide §7.0): what is chosen goes solid in it —
        // black/white, or the exam's own hue inside an exam's scope.
        pick: {
          DEFAULT: 'var(--pick)',
          foreground: 'var(--pick-foreground)',
        },
        // Actuaria Online's one accent — chrome only, and defined only inside
        // the `.actuaria` scope (style guide §2.6).
        'actuaria-signal': {
          DEFAULT: 'hsl(var(--actuaria-signal) / <alpha-value>)',
          soft: 'var(--actuaria-signal-soft)',
        },
      },
      fontFamily: {
        // Actuaria's display face: the wordmark and in-world labels only,
        // loaded by the Actuaria route chunk (components/actuaria/ActuariaScope.tsx).
        actuaria: ['Oxanium', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
