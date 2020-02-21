import React from "react"

export const About: React.SFC<{ name: string }> = (props) => {
    return (
        <h2>About, {props.name}</h2>
    )
}


export const ExampleB: React.StatelessComponent<{}> = (props) => {
    return (
        <div />
    )
}