import { createReducer, on } from '@ngrx/store';
import { login, logout } from '../actions/auth.actions';
import { AuthStateModel } from '../models/auth.model';

const initialState: any = null;

const newState = (state: any, newData: any) => {
  return Object.assign({}, state, newData);
};

export const authReducer = createReducer(
  initialState,
  on(login, (state, { auth }): AuthStateModel => newState(state, auth)),
  on(logout, () => null)
);
