import { ArrowUpIcon, PaperclipIcon, SearchIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"

export default function InputGroupDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search agents" aria-label="Search agents" />
        <InputGroupAddon align="inline-end">
          <Kbd>⌘K</Kbd>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="your-workspace" aria-label="Workspace address" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>.agents.app</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup className="glass bg-glass rounded-3xl">
        <InputGroupTextarea placeholder="Ask the agent anything" aria-label="Message" className="min-h-20" />
        <InputGroupAddon align="block-end">
          <InputGroupButton size="icon-sm" variant="ghost" aria-label="Attach a file">
            <PaperclipIcon />
          </InputGroupButton>
          <InputGroupButton size="icon-sm" variant="default" className="ml-auto rounded-full" aria-label="Send">
            <ArrowUpIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
