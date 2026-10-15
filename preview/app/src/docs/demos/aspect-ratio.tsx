import { AspectRatio } from "@/components/ui/aspect-ratio"

export default function AspectRatioDemo() {
  return (
    <div className="w-full max-w-md">
      <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-3xl border">
        <div
          className="flex size-full items-end p-5"
          style={{ background: "linear-gradient(135deg, var(--backdrop-1), var(--backdrop-2) 55%, var(--backdrop-3))" }}
        >
          <span className="glass rounded-full border px-3 py-1 text-xs font-medium">16 : 9</span>
        </div>
      </AspectRatio>
    </div>
  )
}
