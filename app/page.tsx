"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import type { PanelImperativeHandle, PanelSize } from "react-resizable-panels"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { Button } from "@/components/ui/button"
import { PanelRight } from "lucide-react"
import AppHeader from "@/components/AppHeader"
import LeftSidebar from "@/components/LeftSidebar"
import LeftPanel from "@/components/LeftPanel"
import RightPanel from "@/components/RightPanel"
import ModelessPopup from "@/components/ModelessPopup"

export default function Home() {
  const [rightPanelOpen, setRightPanelOpen] = useState(false)
  const [popupOpen, setPopupOpen] = useState(false)

  // Imperative ref for programmatic resize / collapse of the right panel
  const rightPanelRef = useRef<PanelImperativeHandle | null>(null)

  // DOM ref to the left panel's root element — used to center the modeless popup
  const leftPanelElementRef = useRef<HTMLDivElement | null>(null)

  // Force right panel to be collapsed on mount (in case defaultSize doesn't apply as 0%)
  useEffect(() => {
    const id = setTimeout(() => {
      rightPanelRef.current?.collapse()
    }, 0)
    return () => clearTimeout(id)
  }, [])

  const handleOpenRightPanel = useCallback(() => {
    setRightPanelOpen(true)
    // resize() accepts a number → treated as pixels in react-resizable-panels v4
    rightPanelRef.current?.resize(350)
  }, [])

  const handleCloseRightPanel = useCallback(() => {
    rightPanelRef.current?.collapse()
    setRightPanelOpen(false)
  }, [])

  // Detect when the user drags the panel all the way to 0
  const handleRightPanelResize = useCallback((panelSize: PanelSize) => {
    if (rightPanelOpen && panelSize.inPixels < 1) {
      setRightPanelOpen(false)
    }
  }, [rightPanelOpen])

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <AppHeader />

      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />

        {/* Main content area — ResizablePanelGroup fills this */}
        <div className="flex flex-1 overflow-hidden">
          <ResizablePanelGroup orientation="horizontal" className="h-full">
            {/* Left panel — source of truth for popup positioning */}
            <ResizablePanel
              elementRef={leftPanelElementRef}
              defaultSize={100}
              minSize={20}
            >
              <LeftPanel onOpenPopup={() => setPopupOpen(true)} />
            </ResizablePanel>

            {/* Handle: hidden (no pointer events, zero width) when right panel is closed */}
            <ResizableHandle
              withHandle
              className={
                rightPanelOpen
                  ? ""
                  : "opacity-0 pointer-events-none w-0! overflow-hidden"
              }
            />

            {/* Right panel — starts collapsed (size 0), opened by Button 2 */}
            <ResizablePanel
              panelRef={rightPanelRef}
              defaultSize="0%"
              minSize={0}
              collapsible
              collapsedSize={0}
              groupResizeBehavior="preserve-pixel-size"
              onResize={handleRightPanelResize}
            >
              <RightPanel onClose={handleCloseRightPanel} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>

      {/* Modeless popup — no backdrop, centered on the left panel */}
      {popupOpen && (
        <ModelessPopup
          anchorRef={leftPanelElementRef}
          onClose={() => setPopupOpen(false)}
        />
      )}

      {/* Button 2 — fixed at the bottom-right of the viewport */}
      <Button
        onClick={handleOpenRightPanel}
        className="fixed bottom-6 right-6 z-50 shadow-xl gap-2 px-4 py-2 h-10 text-sm font-medium"
        size="default"
      >
        <PanelRight className="size-4" />
        Open Panel
      </Button>
    </div>
  )
}
