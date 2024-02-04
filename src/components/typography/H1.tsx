import React, {ReactNode} from "react";

type TypographyH1Props = {
  className?: string,
  children: ReactNode
}

export function H1(props: TypographyH1Props) {
  const className = props.className + " scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"

  return (
    <h1 className={className}>
      {props.children}
    </h1>
  )
}
