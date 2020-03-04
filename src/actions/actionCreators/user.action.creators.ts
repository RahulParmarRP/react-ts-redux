import * as LOGIN_ACTION_TYPES from '../actionTypeConstants/login.actions.types';

export type User = {
    username: string
    password: string
}

export interface IActionLoginRequest {
    type: typeof LOGIN_ACTION_TYPES.LOGIN_REQUEST
    payload: User
}

export interface IActionLoginSuccess {
    type: typeof LOGIN_ACTION_TYPES.LOGIN_SUCCESS
    payload: User
}

// Union Action Types
export type UserActionTypes = IActionLoginRequest | IActionLoginSuccess



//Action Creators //these action creators are used for the react thunk which just wrap an action object as a return type of  a function
export const request = (user: User): UserActionTypes => {
    return {
        type: LOGIN_ACTION_TYPES.LOGIN_REQUEST,
        payload: user
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