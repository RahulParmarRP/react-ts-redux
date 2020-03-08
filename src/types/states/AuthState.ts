import { User } from "../../models/User";

export interface AuthState {
    loggingIn?: boolean | undefined
    loggedIn?: boolean
    user: User | null
}