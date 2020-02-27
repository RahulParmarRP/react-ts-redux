import { userConstants } from '../constants';
import { userService } from '../services';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
//import { history } from '../helpers';

// export const userActions = {
//     login
// };

export type User = {
    username: string
    password: string
}

// Action Definition
export interface SetAction {
    type: 'SET'
    accessToken: string
}

export interface SetFetcing {
    type: 'SET_FETCHING'
    isFetching: boolean
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

//Action Creators
export const request = (user: User): IActionLoginRequest => { return { type: 'LOGIN_REQUEST', user } }
export const success = (user: User): IActionLoginSuccess => { return { type: 'LOGIN_SUCCESS', user } }

/*
function login(username: string, password: string) {
    return dispatch => {
        dispatch(request({ username, password }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    //history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    //dispatch(alertActions.error(error));
                }
            );
    };

    //Action Creators
    // function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    // function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    // function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
*/

// thunk action
export const login = (username: string, password: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    // Invoke API
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {

        return new Promise<void>((resolve) => {

            dispatch(request({ username, password }))

            console.log('Login in progress')

            // // Fake async process
            // setTimeout(() => {
            //     // set
            //     dispatch(set('this_is_access_token'))
            //     setTimeout(() => {
            //         dispatch(isFetching(false))
            //         console.log('Login done')
            //         resolve()
            //     }, 1000)
            // }, 3000)

            userService.login(username, password)
                .then(
                    user => {
                        dispatch(success({ username, password }));
                        console.log('Login done')
                        //history.push('/');
                    }
                );
        })
    }
}

// function logout() {
//     userService.logout();
//     return { type: userConstants.LOGOUT };
// }