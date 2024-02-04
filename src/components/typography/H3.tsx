import React, {ReactNode} from "react";

type TypographyH3Props = {
  className?: string,
  children: ReactNode
}

export function H3(props: TypographyH3Props) {
  const className = props.className + " scroll-m-20 text-2xl font-semibold tracking-tight"

  return (
    <h3 className={className}>
      {props.children}
    </h3>
  )
}
