// The pill a project-scope choice is drawn as (ProjectScopeFields, AskDialog):
// primary-tinted when chosen, quiet otherwise.

export function chipClass(active: boolean): string {
  return `rounded-full border px-3 py-1.5 text-sm transition-colors ${
    active
      ? 'border-primary bg-primary/10 text-primary'
      : 'border-input text-muted-foreground hover:text-foreground hover:bg-accent/60'
  }`
}
