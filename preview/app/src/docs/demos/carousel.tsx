import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const slides = [
  { title: "Discover", body: "Find the repeatable task that eats real hours." },
  { title: "Prototype", body: "Build it with the team and test it on live work." },
  { title: "Measure", body: "Track time saved and quality, run by run." },
  { title: "Scale", body: "Publish it so every team can use it." },
]

export default function CarouselDemo() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {slides.map((s) => (
          <CarouselItem key={s.title}>
            <Card variant="glass" className="aspect-square justify-end">
              <CardContent className="flex flex-col gap-2">
                <span className="text-2xl font-semibold tracking-tight">{s.title}</span>
                <span className="text-muted-foreground text-sm">{s.body}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious variant="glass" />
      <CarouselNext variant="glass" />
    </Carousel>
  )
}
