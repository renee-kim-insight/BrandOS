import { BotIcon, ChevronRightIcon, FileTextIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"

export default function ItemDemo() {
  return (
    <ItemGroup className="glass w-full max-w-md rounded-3xl border p-2">
      <Item>
        <ItemMedia variant="icon">
          <BotIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Proposal writer</ItemTitle>
          <ItemDescription>Drafts client proposals from discovery notes.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline">
            Run
          </Button>
        </ItemActions>
      </Item>
      <ItemSeparator />
      <Item render={<a href="#" />}>
        <ItemMedia variant="icon">
          <FileTextIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Q4 retail proposal</ItemTitle>
          <ItemDescription>Generated yesterday, 6 pages</ItemDescription>
        </ItemContent>
        <ItemActions>
          <ChevronRightIcon className="size-4" />
        </ItemActions>
      </Item>
    </ItemGroup>
  )
}
