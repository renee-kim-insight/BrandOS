import { ArrowRightIcon, PlusIcon, SparklesIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export default function ButtonDemo() {
  return (
    <div className="flex max-w-xl flex-col items-center gap-6">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button>Publish agent</Button>
        <Button variant="glass">Save draft</Button>
        <Button variant="outline">Preview</Button>
        <Button variant="secondary">Duplicate</Button>
        <Button variant="ghost">Cancel</Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button variant="destructive">Delete agent</Button>
        <Button variant="link">View run history</Button>
        <Button size="sm" variant="glass">
          <PlusIcon data-icon="inline-start" />
          New run
        </Button>
        <Button size="lg">
          Get started
          <ArrowRightIcon data-icon="inline-end" />
        </Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button size="icon" variant="glass" aria-label="Generate with AI">
          <SparklesIcon />
        </Button>
        <Button size="icon" aria-label="Add">
          <PlusIcon />
        </Button>
        <Button disabled>
          <Spinner data-icon="inline-start" />
          Publishing
        </Button>
      </div>
    </div>
  )
}
