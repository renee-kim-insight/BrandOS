import { ChevronsUpDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export default function CollapsibleDemo() {
  return (
    <Card variant="glass" className="w-full max-w-sm gap-3 px-5 py-4">
      <Collapsible className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">3 tools connected</span>
          <CollapsibleTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Show tools" />}>
            <ChevronsUpDownIcon />
          </CollapsibleTrigger>
        </div>
        <div className="rounded-2xl border px-4 py-2.5 text-sm">SharePoint</div>
        <CollapsibleContent className="flex flex-col gap-3">
          <div className="rounded-2xl border px-4 py-2.5 text-sm">Salesforce</div>
          <div className="rounded-2xl border px-4 py-2.5 text-sm">Outlook calendar</div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
