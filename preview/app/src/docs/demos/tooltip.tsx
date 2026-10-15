import { CopyIcon, SparklesIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export default function TooltipDemo() {
  return (
    <div className="flex items-center gap-3">
      <Tooltip>
        <TooltipTrigger render={<Button variant="glass" size="icon" aria-label="Improve with AI" />}>
          <SparklesIcon />
        </TooltipTrigger>
        <TooltipContent>Improve with AI</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" size="icon" aria-label="Copy link" />}>
          <CopyIcon />
        </TooltipTrigger>
        <TooltipContent>
          Copy link <Kbd>⌘C</Kbd>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
