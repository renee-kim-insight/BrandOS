import { ChevronDownIcon, CopyIcon, RotateCcwIcon, ShareIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@/components/ui/button-group"

export default function ButtonGroupDemo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <ButtonGroup>
        <Button variant="outline">
          <CopyIcon data-icon="inline-start" />
          Duplicate
        </Button>
        <Button variant="outline">
          <ShareIcon data-icon="inline-start" />
          Share
        </Button>
        <Button variant="outline">
          <RotateCcwIcon data-icon="inline-start" />
          Re-run
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button>Publish</Button>
        <ButtonGroupSeparator />
        <Button size="icon" aria-label="More publish options">
          <ChevronDownIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <ButtonGroupText>Version</ButtonGroupText>
        <Button variant="outline">v2.3</Button>
      </ButtonGroup>
    </div>
  )
}
