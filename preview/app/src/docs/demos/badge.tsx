import { CheckIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"

export default function BadgeDemo() {
  return (
    <div className="flex max-w-md flex-wrap items-center justify-center gap-2.5">
      <Badge>Published</Badge>
      <Badge variant="glass">Beta</Badge>
      <Badge variant="secondary">Sales</Badge>
      <Badge variant="outline">Draft</Badge>
      <Badge variant="destructive">Failed</Badge>
      <Badge variant="ghost">Archived</Badge>
      <Badge variant="secondary">
        <CheckIcon data-icon="inline-start" />
        Verified
      </Badge>
      <Badge variant="link" render={<a href="#" />}>
        12 runs today
      </Badge>
    </div>
  )
}
