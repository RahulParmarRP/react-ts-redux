import { userService } from '../services';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction, Action } from 'redux'
import { history } from '../utils/history';
import { LoginActionCreator } from './actionCreators/user.action.creators';
import { AuthState } from '../types/states/AuthState';
import { RootState } from '../reducers'

// thunk action
export const login = (username: string, password: string): ThunkAction<Promise<void>, AuthState, unknown, AnyAction> => {

    // Invoke API
    return async (dispatch: ThunkDispatch<AuthState, unknown, AnyAction>): Promise<void> => {

        return new Promise<void>((resolve) => {

            debugger
            dispatch(LoginActionCreator.request({ username, password }))

            console.log('Login in progress')

            //API CALL
            userService.login(username, password)
                .then(
                    user => {

                        dispatch(LoginActionCreator.success({ username, password }));

                        console.log('Login done');
                        history.push('/about');
                    }
                );
        })
    }
}


export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>

// function logout() {
//     userService.logout();
//     return { type: userConstants.LOGOUT };
// }


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