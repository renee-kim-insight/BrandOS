import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

export default function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger render={<Button variant="link" />}>@sam.wong</HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="flex gap-3">
          <Avatar size="lg">
            <AvatarFallback>SW</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <span className="font-semibold">Sam Wong</span>
            <span className="text-muted-foreground text-sm">Strategy lead, agentic AI. Owns 6 agents in this workspace.</span>
            <span className="text-muted-foreground text-xs">Joined March 2025</span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
