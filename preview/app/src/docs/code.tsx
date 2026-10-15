import * as React from "react"
import { highlight } from "sugar-high"

import { cn } from "@/lib/utils"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/ui/code-block"

export function Code({
  code,
  title,
  className,
  maxHeight = 480,
}: {
  code: string
  title?: string
  className?: string
  maxHeight?: number
}) {
  const html = React.useMemo(() => highlight(code.replace(/\n$/, "")), [code])
  return (
    <CodeBlock className={cn("glass bg-glass border", className)}>
      <CodeBlockHeader>
        <CodeBlockTitle className="font-mono text-xs">{title ?? "tsx"}</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={code} aria-label="Copy code" />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent style={{ maxHeight }} className="text-[13px] leading-6">
        <span dangerouslySetInnerHTML={{ __html: html }} />
      </CodeBlockContent>
    </CodeBlock>
  )
}

export function InlineCommand({ command }: { command: string }) {
  return <Code code={command} title="Terminal" />
}
