import { BotIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"

export default function EmptyDemo() {
  return (
    <Empty className="glass w-full max-w-md rounded-3xl border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <BotIcon />
        </EmptyMedia>
        <EmptyTitle>No agents in this workspace yet</EmptyTitle>
        <EmptyDescription>Start from a template or bring one over from another workspace.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Button>Browse templates</Button>
        <Button variant="outline">Import an agent</Button>
      </EmptyContent>
    </Empty>
  )
}
