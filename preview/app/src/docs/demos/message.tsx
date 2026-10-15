import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Message, MessageAvatar, MessageContent, MessageFooter, MessageHeader } from "@/components/ui/message"

export default function MessageDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>SW</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Sam Wong · 9:41</MessageHeader>
          <Bubble variant="secondary">
            <BubbleContent>Can the agent pull last quarter's numbers into the deck?</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble align="end">
            <BubbleContent>Yes. It reads the finance sheet and fills slides 4 to 6.</BubbleContent>
          </Bubble>
          <MessageFooter>Read</MessageFooter>
        </MessageContent>
      </Message>
    </div>
  )
}
