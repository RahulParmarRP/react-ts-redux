
import { Action } from 'redux';
import { User } from '../../models/User';
import * as LOGIN_ACTION_TYPES from '../actionTypeConstants/login.actions.types';
import { LoginAttemptState } from '../../types/states/LoginAttemptState';

export interface IActionLoginRequest extends Action<typeof LOGIN_ACTION_TYPES.LOGIN_REQUEST> {
    type: typeof LOGIN_ACTION_TYPES.LOGIN_REQUEST
    payload: boolean
}
export interface IActionLoginSuccess extends Action<typeof LOGIN_ACTION_TYPES.LOGIN_SUCCESS> {
    type: typeof LOGIN_ACTION_TYPES.LOGIN_SUCCESS
    payload: User
}

export type ActionLoginRequest = IActionLoginRequest;

// Union Action Types
export type UserActionTypes = IActionLoginRequest | IActionLoginSuccess



//Action Creators //these action creators are used for the react thunk which just wrap an action object as a return type of  a function
export const request = (isSigningIn: boolean): UserActionTypes => {
    debugger
    return {
        type: LOGIN_ACTION_TYPES.LOGIN_REQUEST,
        payload: isSigningIn
    }
};

export const success = (user: User): UserActionTypes => {
    return {
        type: LOGIN_ACTION_TYPES.LOGIN_SUCCESS,
        payload: user
    }
};

// export const request = (user: User): IActionLoginRequest => {
//     return (dispatch): IActionLoginRequest => {
//         setTimeout(() => {
//             dispatch(requestAsync(user));
//         }, 5000)
//     }
// }

export const LoginActionCreator = {
    request,
    success
}