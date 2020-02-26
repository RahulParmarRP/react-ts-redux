import { userActionConstants } from '../constants/userActionConstants';

export function users(state = {}, action) {
  switch (action.type) {
    case userActionConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userActionConstants.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case userActionConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}