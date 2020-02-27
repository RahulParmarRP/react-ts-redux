import { combineReducers } from 'redux';

import { authentication, AuthState } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';


export interface RootState {
  authentication: AuthState
}

const rootReducer = combineReducers<RootState>({
  authentication
});

export default rootReducer;