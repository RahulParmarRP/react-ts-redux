import { userActionConstants } from '../constants';

export function users(state = {}, action: { type: any; users: any; error: any; }) {
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