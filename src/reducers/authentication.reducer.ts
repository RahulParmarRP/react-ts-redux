import { UserActionTypes } from '../actions/actionCreators/user.action.creators';
import { AuthState } from '../types/states/AuthState';
import * as LOGIN_ACTION_TYPES from '../actions/actionTypeConstants/login.actions.types';
import { AnyAction } from 'redux';
import { User } from '../models/User';

// if (typeof myUser === 'string') {
//     var user = JSON.parse(myUser);
// }

// export interface AccessToken {
//     isFetching: boolean
//     accessToken?: string
// }

var user = JSON.parse(window.localStorage.getItem('user') || '{}') as User

const initialState: AuthState = user ? { loggingIn: false, loggedIn: true, user: user } : { loggingIn: false, loggedIn: false, user: null };

export const authenticationReducer = (state: AuthState = initialState, action: UserActionTypes): AuthState => {
    debugger
    switch (action.type) {
        case LOGIN_ACTION_TYPES.LOGIN_REQUEST:
            return {
                ...state,
                loggingIn: action.payload
            };
        case LOGIN_ACTION_TYPES.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.payload
            };
        default:
            return state;
    }
}

export default authenticationReducer;