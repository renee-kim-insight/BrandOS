import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble"

export default function BubbleDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Bubble align="end">
        <BubbleContent>Can you summarise the client call in five bullets?</BubbleContent>
      </Bubble>
      <BubbleGroup>
        <Bubble variant="secondary">
          <BubbleContent>Here is the summary. Their main worry is migration time, not price.</BubbleContent>
        </Bubble>
        <Bubble variant="secondary">
          <BubbleContent>Want me to draft a follow-up email that addresses it?</BubbleContent>
        </Bubble>
      </BubbleGroup>
      <Bubble variant="tinted" align="end">
        <BubbleContent>Yes, keep it under 120 words.</BubbleContent>
      </Bubble>
      <Bubble variant="destructive">
        <BubbleContent>The CRM connection expired. Reconnect it in Settings to continue.</BubbleContent>
      </Bubble>
    </div>
  )
}
