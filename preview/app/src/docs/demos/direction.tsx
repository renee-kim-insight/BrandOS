import { DirectionProvider } from "@/components/ui/direction"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

export default function DirectionDemo() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl" lang="ar" className="w-full max-w-sm">
        <Card variant="glass">
          <CardHeader>
            <CardTitle>الميزانية الشهرية</CardTitle>
            <CardDescription>تتوقف التشغيلات عند الوصول إلى الحد.</CardDescription>
          </CardHeader>
          <CardContent>
            <Slider defaultValue={[60]} aria-label="الميزانية" />
          </CardContent>
          <CardFooter className="justify-end">
            <Button>حفظ</Button>
          </CardFooter>
        </Card>
      </div>
    </DirectionProvider>
  )
}
