export type User = {
    username: string
    password: string
}

export interface IActionLoginRequest {
    type: 'LOGIN_REQUEST'
    user: User
}

export interface IActionLoginSuccess {
    type: 'LOGIN_SUCCESS'
    user: User
}

// Union Action Types
export type UserAction = IActionLoginRequest | IActionLoginSuccess

//Action Creators //these action creators are used for the react thunk which just wrap an action object as a return type of  a function
export const request = (user: User): IActionLoginRequest => { return { type: 'LOGIN_REQUEST', user } };
export const success = (user: User): IActionLoginSuccess => { return { type: 'LOGIN_SUCCESS', user } };

// export const request = (user: User): IActionLoginRequest => {
//     return (dispatch): IActionLoginRequest => {
//         setTimeout(() => {
//             dispatch(requestAsync(user));
//         }, 5000)
//     }
// }

export const userActionCreator = {
    request,
    success
}