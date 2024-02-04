import React, {ReactNode} from "react";

type TypographyH2Props = {
  className?: string,
  children: ReactNode
}

export function H2(props: TypographyH2Props) {
  const className = props.className + " scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"

  return (
    <h2 className={className}>
      {props.children}
    </h2>
  )
}
