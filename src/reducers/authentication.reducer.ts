import { userActionConstants } from '../constants';

const myUser = localStorage.getItem('user');

// if (typeof myUser === 'string') {
//     var user = JSON.parse(myUser);
// }

var user = JSON.parse(window.localStorage.getItem('user') || '{}')

const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action: { type: any; user: any; }) {
    switch (action.type) {
        case userActionConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userActionConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userActionConstants.LOGIN_FAILURE:
            return {};
        case userActionConstants.LOGOUT:
            return {};
        default:
            return state
    }
}