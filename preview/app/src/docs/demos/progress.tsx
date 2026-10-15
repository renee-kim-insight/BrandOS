import * as React from "react"

import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"

export default function ProgressDemo() {
  const [value, setValue] = React.useState(18)
  React.useEffect(() => {
    const t = setInterval(() => setValue((v) => (v >= 100 ? 18 : Math.min(100, v + 9))), 900)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="flex w-full max-w-sm flex-col gap-8">
      <Progress value={value}>
        <ProgressLabel>Indexing documents</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress value={64} aria-label="Storage used" />
    </div>
  )
}
