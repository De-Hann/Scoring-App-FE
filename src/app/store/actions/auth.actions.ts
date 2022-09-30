import { createAction, props } from '@ngrx/store';
import { AuthStateModel } from '../models/auth.model';

export const login = createAction(
  '[Auth] Login',
  props<{ auth: AuthStateModel }>()
);
export const logout = createAction('[Auth] Logout');
