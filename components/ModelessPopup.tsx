"use client"

import { useEffect, useState, type RefObject } from "react"
import { X, Info, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ModelessPopupProps {
  anchorRef: RefObject<HTMLDivElement | null>
  onClose: () => void
}

interface Position {
  left: number
  top: number
}

export default function ModelessPopup({ anchorRef, onClose }: ModelessPopupProps) {
  const [position, setPosition] = useState<Position>({ left: 0, top: 0 })

  const updatePosition = () => {
    if (anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect()
      setPosition({
        left: rect.left + rect.width / 2,
        top: rect.top + rect.height / 2,
      })
    }
  }

  useEffect(() => {
    updatePosition()

    const observer = new ResizeObserver(() => {
      updatePosition()
    })

    if (anchorRef.current) {
      observer.observe(anchorRef.current)
    }

    window.addEventListener("resize", updatePosition)

    return () => {
      observer.disconnect()
      window.removeEventListener("resize", updatePosition)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchorRef])

  return (
    <div
      style={{
        position: "fixed",
        left: position.left,
        top: position.top,
        transform: "translate(-50%, -50%)",
        zIndex: 50,
      }}
      className="w-80 rounded-2xl border bg-card shadow-2xl overflow-hidden"
    >
      {/* Popup header */}
      <div className="flex items-center justify-between px-5 py-4 border-b bg-muted/30">
        <div className="flex items-center gap-2.5">
          <div className="size-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <Info className="size-4 text-primary" />
          </div>
          <span className="text-sm font-semibold">Quick Actions</span>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="size-4" />
        </Button>
      </div>

      {/* Popup body */}
      <div className="p-5 space-y-3">
        <p className="text-sm text-muted-foreground leading-relaxed">
          This popup is modeless — you can still interact with the rest of the
          app while it&apos;s open. It is centered within the left panel.
        </p>

        <div className="space-y-2">
          {[
            { icon: CheckCircle2, label: "Mark all as complete", color: "text-emerald-600" },
            { icon: AlertCircle, label: "Flag for review", color: "text-amber-600" },
            { icon: Info, label: "View details", color: "text-blue-600" },
          ].map(({ icon: Icon, label, color }) => (
            <button
              key={label}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-muted transition-colors text-left"
            >
              <Icon className={`size-4 shrink-0 ${color}`} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pb-4">
        <Button className="w-full" size="sm" onClick={onClose}>
          Done
        </Button>
      </div>
    </div>
  )
}
