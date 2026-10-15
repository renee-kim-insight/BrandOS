import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@/components/ui/avatar"

export default function AvatarDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-10">
      <div className="flex items-end gap-4">
        <Avatar size="sm">
          <AvatarFallback>RK</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>SW</AvatarFallback>
          <AvatarBadge className="bg-green-600" />
        </Avatar>
      </div>
      <AvatarGroup>
        {["RK", "SW", "JD", "AM"].map((i) => (
          <Avatar key={i}>
            <AvatarFallback>{i}</AvatarFallback>
          </Avatar>
        ))}
        <AvatarGroupCount>+8</AvatarGroupCount>
      </AvatarGroup>
    </div>
  )
}
