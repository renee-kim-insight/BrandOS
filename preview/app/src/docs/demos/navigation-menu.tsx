import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const solutions = [
  { title: "Proposal writer", body: "Client proposals from discovery notes." },
  { title: "Meeting summariser", body: "Actions and decisions from any call." },
  { title: "Contract reviewer", body: "Flags risky clauses before legal review." },
  { title: "Pricing assistant", body: "Quotes from the current rate card." },
]

export default function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Agents</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[min(28rem,80vw)] gap-1 p-1 sm:grid-cols-2">
              {solutions.map((s) => (
                <li key={s.title}>
                  <NavigationMenuLink href="#" className="flex flex-col items-start gap-1">
                    <span className="text-sm font-medium">{s.title}</span>
                    <span className="text-muted-foreground text-sm leading-snug">{s.body}</span>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
