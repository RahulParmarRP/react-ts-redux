import { combineReducers } from 'redux';
import { AuthState } from '../types/states/AuthState'
import { authenticationReducer } from './authentication.reducer';

export interface RootState {
  authentication: AuthState
}

export const rootReducer = combineReducers<RootState>({
  authentication: authenticationReducer
});

//export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;