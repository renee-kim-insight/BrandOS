import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

const agents = [
  "Proposal writer",
  "Meeting summariser",
  "Contract reviewer",
  "Pricing assistant",
  "Release notes drafter",
  "Support triage",
  "Token cost reporter",
]

export default function ComboboxDemo() {
  return (
    <div className="w-full max-w-xs">
      <Combobox items={agents}>
        <ComboboxInput placeholder="Find an agent" aria-label="Agent" />
        <ComboboxContent>
          <ComboboxEmpty>No agent with that name.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}
