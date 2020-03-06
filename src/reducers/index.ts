import { combineReducers } from 'redux';
import { AuthState } from '../types/states/AuthState'
import { authenticationReducer } from './authentication.reducer';

import { createStore, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';

export interface RootState {
  authentication: AuthState
}

export const rootReducer = combineReducers({
  authentication: authenticationReducer
});

export type RootReducerType = ReturnType<typeof rootReducer>;
//export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;

export const rootStore = createStore(
  rootReducer,
  applyMiddleware(
    thunk as ThunkMiddleware
  )
);