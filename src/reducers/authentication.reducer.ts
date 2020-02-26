import { userActionConstants } from '../constants/userActionConstants';

let user = JSON.parse(localStorage.get('user'));
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