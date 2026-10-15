import { Kbd, KbdGroup } from "@/components/ui/kbd"

export default function KbdDemo() {
  return (
    <div className="flex flex-col items-center gap-4 text-sm">
      <p className="text-muted-foreground">
        Press{" "}
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>{" "}
        to search, or <Kbd>/</Kbd> to start a message.
      </p>
      <KbdGroup>
        <Kbd>Shift</Kbd>
        <span className="text-muted-foreground">+</span>
        <Kbd>Enter</Kbd>
      </KbdGroup>
    </div>
  )
}
