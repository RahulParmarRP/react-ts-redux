import { combineReducers, Action, Store, AnyAction } from 'redux';
import { AuthState } from '../types/states/AuthState'
import { authenticationReducer } from './authentication.reducer';

import { createStore, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { User } from '../models/User';
import { UserActionTypes } from '../actions/actionCreators/user.action.creators';
import { Reducer } from 'react';

export interface RootState {
  auth: AuthState
}

export const rootReducer = combineReducers<RootState, UserActionTypes>(
  {
    auth: authenticationReducer
  });

export type RootReducerType = ReturnType<typeof rootReducer>;
//export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;

export const middleWare = applyMiddleware(
  thunk as ThunkMiddleware<RootState, UserActionTypes, unknown>
);


export const rootStore: Store<RootState, AnyAction> = createStore(
  rootReducer,
  middleWare
);

// export const rootStore = createStore(
//   rootReducer,
//   applyMiddleware(
//     thunk as ThunkMiddleware
//   )
// );