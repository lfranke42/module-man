import {Label} from "@/components/ui/label";
import {H3} from "@/components/typography/H3";

type ColumnHeaderProps = {
  title: string
}

export function ColumnHeader(props: ColumnHeaderProps) {
  return (
    <div className={"w-[320px] flex justify-center mb-4"}>
      <H3>{props.title}</H3>
    </div>
  )
}