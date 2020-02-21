import * as React from 'react'

type Props = {
    message: string
}


export class Home extends React.Component<Props, {}> {

    render() {
        return (
            <div>
                Hello , {this.props.message}
            </div>
        )
    }
}
