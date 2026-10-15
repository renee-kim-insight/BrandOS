import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Card } from "@/components/ui/card"
import { Message, MessageContent } from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"

const turns = [
  ["user", "What changed in the pricing model?"],
  ["agent", "Three things: the base rate went up 4%, the volume tiers moved, and support is now a separate line."],
  ["user", "Which tier does the retail client fall into?"],
  ["agent", "Tier 2. They are 1,200 seats, and tier 2 now starts at 1,000."],
  ["user", "So their price goes down?"],
  ["agent", "Slightly. About 2% lower once the new tier applies, before support."],
  ["user", "Draft a note to them explaining it."],
  ["agent", "Done. It leads with the lower price, then explains the separate support line in one sentence."],
] as const

export default function MessageScrollerDemo() {
  return (
    <Card variant="glass" className="h-96 w-full max-w-md gap-0 p-0">
      <MessageScrollerProvider>
        <MessageScroller className="h-full">
          <MessageScrollerViewport>
            <MessageScrollerContent className="flex flex-col gap-5 p-5">
              {turns.map(([who, text], i) => (
                <MessageScrollerItem key={i} scrollAnchor={i === turns.length - 1}>
                  <Message align={who === "user" ? "end" : "start"}>
                    <MessageContent>
                      <Bubble align={who === "user" ? "end" : "start"} variant={who === "user" ? "default" : "secondary"}>
                        <BubbleContent>{text}</BubbleContent>
                      </Bubble>
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>
              ))}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>
    </Card>
  )
}
