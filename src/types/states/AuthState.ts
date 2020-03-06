import { User } from "../../actions/actionCreators/user.action.creators";

export interface AuthState {
    loggingIn?: boolean | undefined
    loggedIn?: boolean
    user: User | null
}