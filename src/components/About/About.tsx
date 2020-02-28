import React from "react"


export type AboutProps = {
    name: string
}

export const About: React.SFC<AboutProps> = (props) => {
    return (
        <h2>About, {props.name}</h2>
    )
}
