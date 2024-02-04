import * as React from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"

type ModuleCardProps = {
  name: string,
  ects: number,
  semester: string,
  id: string,
  lecturers: string[],
}

export function ModuleCard(props: ModuleCardProps) {
  return (
    <Card className="w-[300px] mb-4">
      <CardHeader>
        <CardTitle>{props.name}</CardTitle>
        <CardDescription>{props.lecturers.at(0)}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 w-full items-center gap-2">
          <div>{props.ects} ECTS</div>
          <div>{props.semester}</div>
          <div>{props.id}</div>
        </div>
      </CardContent>
    </Card>
  )
}
