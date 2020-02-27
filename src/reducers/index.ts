import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';


export interface RootState {
  authentication: typeof authentication
  users: typeof users
}

const rootReducer = combineReducers<RootState>({
  authentication,
  users
});

export default rootReducer;