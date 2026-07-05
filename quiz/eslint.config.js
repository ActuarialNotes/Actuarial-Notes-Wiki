import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

// Flat config (ESLint 9+). Lints the app source under `src`. Rule choices are
// tuned to idioms this codebase already uses intentionally, so a green run is
// a meaningful signal rather than noise:
//   • `cond ? a() : b()` / `x?.y?.() ?? z()` as side-effecting statements
//     → allowTernary / allowShortCircuit
//   • best-effort `catch {}` around localStorage / JSON parsing → allowEmptyCatch
//   • `_`-prefixed names mark deliberately-unused bindings
// `react-hooks/exhaustive-deps` stays a warning (many deps arrays here are
// intentional); warnings don't fail the build, so CI still gates on real errors.
export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    // Leave existing `eslint-disable` directives in place: several intentionally
    // document deliberate hook-dependency choices. We don't want a lint run to
    // strip that author intent, so don't report/auto-remove "unused" directives.
    linterOptions: { reportUnusedDisableDirectives: 'off' },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowShortCircuit: true, allowTernary: true },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'no-empty': ['error', { allowEmptyCatch: true }],
    },
  },
)
