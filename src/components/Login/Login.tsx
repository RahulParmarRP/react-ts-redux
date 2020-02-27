import * as React from 'react'
import { connect } from 'react-redux';
import { userActions } from '../../actions';
// export type Props = {
//     defaultCount: number
// }

// export type State = Readonly<{
//     count: number
// }>

// interface IState {
//     username: string;
//     password: string;
// }



interface LocalState {
    username: string,
    password: string
} // Internal state for the component
interface StateProps { accessToken: string }  // Props those being mapped from Store
interface DispatchProps { login: (username: string, password: string) => void } // Dispatchable methods (invoke our store's actions)
interface OwnProps { } // Normal properties for the component 
// combine them together
type Props = StateProps & DispatchProps & OwnProps


class Login extends React.Component<Props, LocalState> {
    // constructor(props: {}) {
    //     super(props);
    //     // this.state = {
    //     //     username: "",
    //     //     password: ""
    //     // }
    // }

    state: LocalState = {
        username: "",
        password: ""
    }

    handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value }: any = e.target
        //const { name, value }: { name: "username"|"password"; value: string } = e.currentTarget
        //public onChange(event: { target: { name: keyof IAddPlayerFormState; value: any; }; })
        const newState = { [name]: value } as Pick<LocalState, keyof LocalState>;
        //console.log(e.currentTarget.name);
        //console.log(e.currentTarget.value);
        // const { name, value }: { name: keyof IState, value: string } = e.target;

        this.setState(newState);
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(this.state);
        const { username, password } = this.state;
        this.props.login(username, password);
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


const mapStateToProps = (states: RootState, ownProps: OwnProps): StateProps => {
    return {
      accessToken: states.session.accessToken
    }
  }
  
function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(Login);
export { connectedLoginPage as Login };