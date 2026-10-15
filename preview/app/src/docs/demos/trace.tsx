import { FileSearchIcon, GlobeIcon, SquareTerminalIcon } from "lucide-react"

import { CodeBlock, CodeBlockContent } from "@/components/ui/code-block"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"

export default function TraceDemo() {
  return (
    <div className="glass w-full max-w-md rounded-3xl border p-5">
      <Trace>
        <TraceLine>
          <TraceIcon>
            <FileSearchIcon />
          </TraceIcon>
          <TraceTitle>Read 4 discovery documents</TraceTitle>
        </TraceLine>
        <TraceCollapsible>
          <TraceCollapsibleTrigger>
            <TraceLine>
              <TraceIcon>
                <SquareTerminalIcon />
              </TraceIcon>
              <TraceTitle>Queried the rate card</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <CodeBlock size="sm">
              <CodeBlockContent wrap>{"tier: 2\nseats: 1,200\nbase_rate: 41.60 / seat"}</CodeBlockContent>
            </CodeBlock>
          </TraceCollapsibleContent>
        </TraceCollapsible>
        <TraceLine status="running">
          <TraceIcon>
            <GlobeIcon />
          </TraceIcon>
          <TraceTitle>Checking the client's latest annual report</TraceTitle>
        </TraceLine>
      </Trace>
    </div>
  )
}
