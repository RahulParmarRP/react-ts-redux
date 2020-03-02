import { combineReducers } from 'redux';
import { AuthState } from '../types/states/AuthState'
import { authenticationReducer } from './authentication.reducer';
import { userReducer } from './users.reducer';
import { alertReducer } from './alert.reducer';



export interface RootState {
  authentication: AuthState
}


//export type RootState = ReturnType<typeof rootReducer>


export const rootReducer = combineReducers<RootState>({
  authentication: authenticationReducer
});

//export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;