import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export default function SpinnerDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Spinner aria-label="Loading" />
      <Button disabled>
        <Spinner data-icon="inline-start" />
        Saving changes
      </Button>
      <Badge variant="secondary">
        <Spinner data-icon="inline-start" />
        Indexing
      </Badge>
    </div>
  )
}
