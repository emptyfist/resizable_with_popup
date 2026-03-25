"use client"

import { FileText, Sparkles, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LeftPanelProps {
  onOpenPopup: () => void
}

const items = [
  {
    icon: FileText,
    title: "Document Overview",
    description: "Review all submitted documents and their statuses in one place.",
    tag: "Updated",
  },
  {
    icon: BarChart2,
    title: "Analytics Report",
    description: "Weekly summary of usage metrics and performance indicators.",
    tag: "New",
  },
  {
    icon: Sparkles,
    title: "AI Suggestions",
    description: "Smart recommendations based on your recent activity.",
    tag: "Beta",
  },
]

export default function LeftPanel({ onOpenPopup }: LeftPanelProps) {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      <div className="flex-1 overflow-y-auto p-5">
        <div className="mb-5">
          <h2 className="text-base font-semibold">Main Content</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage your workspace and content below.
          </p>
        </div>

        <div className="space-y-3">
          {items.map(({ icon: Icon, title, description, tag }) => (
            <div
              key={title}
              className="rounded-xl border bg-card p-4 hover:border-primary/30 transition-colors cursor-default"
            >
              <div className="flex items-start gap-3">
                <div className="shrink-0 size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="size-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{title}</span>
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                      {tag}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="shrink-0 border-t bg-card/50 p-4">
        <Button
          onClick={onOpenPopup}
          variant="outline"
          className="w-full"
        >
          <Sparkles className="size-4 mr-2" />
          Open Popup
        </Button>
      </div>
    </div>
  )
}
