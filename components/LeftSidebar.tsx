import { Home, FolderOpen, CheckSquare, Bell, Settings, Users } from "lucide-react"

const navItems = [
  { icon: Home, label: "Home", active: false },
  { icon: FolderOpen, label: "Projects", active: false },
  { icon: CheckSquare, label: "Tasks", active: true },
  { icon: Users, label: "Team", active: false },
  { icon: Bell, label: "Notifications", active: false },
]

export default function LeftSidebar() {
  return (
    <aside className="w-56 shrink-0 border-r bg-sidebar flex flex-col overflow-y-auto z-20">
      <div className="p-3 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-2 mb-2">
          Menu
        </p>
        <nav className="space-y-0.5">
          {navItems.map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-colors text-left ${
                active
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="size-4 shrink-0" />
              {label}
            </button>
          ))}
        </nav>
      </div>
      <div className="p-3 border-t">
        <button className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
          <Settings className="size-4 shrink-0" />
          Settings
        </button>
      </div>
    </aside>
  )
}
