import { userConstants } from '../constants';
import { User, UserActionTypes } from '../actions/actionCreators/user.action.creators';
import { AuthState } from '../types/states/AuthState';
import * as LOGIN_ACTION_TYPES from '../actions/actionTypeConstants/login.actions.types';

const myUser = localStorage.getItem('user');

// if (typeof myUser === 'string') {
//     var user = JSON.parse(myUser);
// }

// export interface AccessToken {
//     isFetching: boolean
//     accessToken?: string
// }

var user = JSON.parse(window.localStorage.getItem('user') || '{}') as User

const initialState = user ? { loggedIn: true, user } : {};

export function authenticationReducer(state: AuthState = initialState, action: UserActionTypes): AuthState {
    switch (action.type) {
        case LOGIN_ACTION_TYPES.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.payload
            };
        case LOGIN_ACTION_TYPES.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.payload
            };
        default:
            return state
    }
}