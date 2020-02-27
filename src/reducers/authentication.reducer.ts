import { userConstants } from '../constants';
import { User, UserAction } from '../actions';

const myUser = localStorage.getItem('user');

// if (typeof myUser === 'string') {
//     var user = JSON.parse(myUser);
// }

export interface AccessToken {
    isFetching: boolean
    accessToken?: string
}

export interface AuthState {
    loggingIn?: boolean
    loggedIn?: boolean
    user?: User
}

var user = JSON.parse(window.localStorage.getItem('user') || '{}') as User

const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state: AuthState = initialState, action: UserAction): AuthState {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return { loggingIn: true, user: action.user };
        case 'LOGIN_SUCCESS':
            return { loggedIn: true, user: action.user };
        default:
            return state
    }
}