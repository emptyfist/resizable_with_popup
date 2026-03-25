import { LayoutDashboard } from "lucide-react"

export default function AppHeader() {
  return (
    <header className="h-14 shrink-0 border-b bg-card flex items-center gap-3 px-5 z-10">
      <div className="flex items-center gap-2.5">
        <div className="size-7 rounded-lg bg-primary flex items-center justify-center">
          <LayoutDashboard className="size-4 text-primary-foreground" />
        </div>
        <span className="font-semibold text-sm tracking-tight">Panel App</span>
      </div>
      <div className="h-5 w-px bg-border mx-1" />
      <nav className="flex items-center gap-1 text-sm text-muted-foreground">
        <span className="px-2 py-1 rounded-md hover:bg-muted hover:text-foreground cursor-pointer transition-colors">
          Dashboard
        </span>
        <span className="px-2 py-1 rounded-md hover:bg-muted hover:text-foreground cursor-pointer transition-colors">
          Projects
        </span>
        <span className="px-2 py-1 rounded-md bg-muted text-foreground cursor-pointer transition-colors">
          Workspace
        </span>
      </nav>
    </header>
  )
}
