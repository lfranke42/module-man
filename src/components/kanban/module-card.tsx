import * as React from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Badge} from "@/components/ui/badge";

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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <CardTitle className="text-ellipsis overflow-hidden">{props.name}</CardTitle>
            </TooltipTrigger>
            <TooltipContent>
              {props.id + " " + props.name}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <CardDescription>{props.lecturers.at(0)}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <div className="max-w-40">{props.semester}</div>
          <Badge className={"self-start"}>{props.ects} ECTS</Badge>
        </div>
      </CardContent>
    </Card>
  )
}
