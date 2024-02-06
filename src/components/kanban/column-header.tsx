import {H3} from "@/components/typography/H3";
import {Module} from "@/types/kanban";
import {useEffect, useState} from "react";
import {Badge} from "@/components/ui/badge";

type ColumnHeaderProps = {
  title: string,
  cards: Module[]
}

export function ColumnHeader(props: ColumnHeaderProps) {
  const [totalEcts, setTotalEcts] = useState(0)

  useEffect(() => {
    let ects = 0
    props.cards.forEach(card => {
      ects += card.ects
    })
    setTotalEcts(ects)
  }, [props.cards])

  return (
    <div className="w-[320px] flex justify-between mb-4 mr-4">
      <H3 className="ml-4">{props.title}</H3>
      <Badge className={"mr-8"}>{totalEcts} ECTS</Badge>
    </div>
  )
}