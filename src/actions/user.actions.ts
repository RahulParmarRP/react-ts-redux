import { userService } from '../services';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { history } from '../utils/history';
import { userActionCreator } from './actionCreators/user.action.creators';

// thunk action
export const login = (username: string, password: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    // Invoke API
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {

        return new Promise<void>((resolve) => {

            dispatch(userActionCreator.request({ username, password }))

            console.log('Login in progress')

            userService.login(username, password)
                .then(
                    user => {
                        dispatch(userActionCreator.success({ username, password }));
                        console.log('Login done');
                        history.push('/about');
                    }
                );
        })
    }
}

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