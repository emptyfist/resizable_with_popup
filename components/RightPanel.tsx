"use client"

import { X, MessageSquare, Send, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface RightPanelProps {
  onClose: () => void
}

const initialMessages = [
  { role: "assistant", text: "Hi there! How can I help you today?" },
  { role: "user", text: "Can you summarize the main content?" },
  { role: "assistant", text: "Sure! The main content shows three items: Document Overview, Analytics Report, and AI Suggestions. Each provides quick access to key workspace features." },
]

export default function RightPanel({ onClose }: RightPanelProps) {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState(initialMessages)

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    setMessages((prev) => [...prev, { role: "user", text: trimmed }])
    setInput("")
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Thanks for your message! This is a demo response." },
      ])
    }, 600)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background border-l">
      {/* Sub-header */}
      <div className="shrink-0 h-12 flex items-center justify-between px-4 border-b bg-muted/40">
        <div className="flex items-center gap-2">
          <MessageSquare className="size-4 text-primary" />
          <span className="text-sm font-medium">AI Assistant</span>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground"
          title="Close panel"
        >
          <X className="size-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            <div
              className={`shrink-0 size-7 rounded-full flex items-center justify-center text-xs ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {msg.role === "user" ? <User className="size-3.5" /> : <Bot className="size-3.5" />}
            </div>
            <div
              className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-sm"
                  : "bg-muted text-foreground rounded-tl-sm"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="shrink-0 border-t p-3">
        <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20 transition-all">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="shrink-0 size-7 rounded-md bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <Send className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
