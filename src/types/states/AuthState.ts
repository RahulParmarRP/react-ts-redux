import { User } from "../../actions/actionCreators/user.action.creators";

export interface AuthState {
    loggingIn?: boolean
    loggedIn?: boolean
    user?: User
}