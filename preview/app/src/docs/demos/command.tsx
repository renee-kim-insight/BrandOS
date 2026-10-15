import { BotIcon, CalendarIcon, CreditCardIcon, FileTextIcon, SettingsIcon, UserIcon } from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export default function CommandDemo() {
  return (
    <Command className="glass bg-glass w-full max-w-md rounded-3xl border">
      <CommandInput placeholder="Search or run a command" />
      <CommandList>
        <CommandEmpty>Nothing matches. Try an agent or page name.</CommandEmpty>
        <CommandGroup heading="Agents">
          <CommandItem>
            <BotIcon />
            <span>Run Proposal writer</span>
          </CommandItem>
          <CommandItem>
            <FileTextIcon />
            <span>Summarise a document</span>
          </CommandItem>
          <CommandItem>
            <CalendarIcon />
            <span>Prepare tomorrow's meetings</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <UserIcon />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCardIcon />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <SettingsIcon />
            <span>Workspace settings</span>
            <CommandShortcut>⌘,</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
