import * as React from 'react'

// export type Props = {
//     defaultCount: number
// }

// export type State = Readonly<{
//     count: number
// }>

interface IState {
    username: string;
    password: string;
}

export class Login extends React.Component<{}, IState> {
    // constructor(props: {}) {
    //     super(props);
    //     // this.state = {
    //     //     username: "",
    //     //     password: ""
    //     // }
    // }

    state: IState = {
        username: "",
        password: ""
    }

    handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value }: any = e.target
        //const { name, value }: { name: "username"|"password"; value: string } = e.currentTarget
        //public onChange(event: { target: { name: keyof IAddPlayerFormState; value: any; }; })
        const newState = { [name]: value } as Pick<IState, keyof IState>;
        //console.log(e.currentTarget.name);
        //console.log(e.currentTarget.value);
        // const { name, value }: { name: keyof IState, value: string } = e.target;

        this.setState(newState);
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(this.state);
    }

    componentDidMount() {

    }

    render() {
        return (
            <form method="post" onSubmit={this.handleSubmit}>
                <label>Username</label>
                <input type="text" placeholder="Enter Username" name="username" onChange={this.handleChange} required />
                <label>Password</label>
                <input type="password" placeholder="Enter Password" name="password" onChange={this.handleChange} required />
                <button type="submit">Login</button>
            </form>
        )
    }
}
