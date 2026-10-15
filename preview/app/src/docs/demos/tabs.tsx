import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TabsDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-10">
      <Tabs defaultValue="overview">
        <TabsList variant="glass">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="runs">Runs</TabsTrigger>
          <TabsTrigger value="access">Access</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-3">
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>Drafts client proposals from discovery notes and past wins.</CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent value="runs" className="mt-3">
          <Card variant="glass">
            <CardContent className="text-sm">412 runs this month, 3 failed.</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="access" className="mt-3">
          <Card variant="glass">
            <CardContent className="text-sm">Sales and Delivery can run it. Only owners can edit.</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Tabs defaultValue="week">
        <TabsList variant="line">
          <TabsTrigger value="day">Day</TabsTrigger>
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
