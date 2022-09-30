import { authReducer } from './reducers/auth.reducer';
import { AuthStateModel } from './models/auth.model';
import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import { hydrationMetaReducer } from './reducers/hydration.reducer';

export interface AppState {
  auth: AuthStateModel;
}

export const selectUser = (state: AppState) => state.auth;

export const selectUserState = createSelector(
  selectUser,
  (state: AuthStateModel) => state
);

export const selectUserId = createSelector(
  selectUser,
  (state: AuthStateModel) => state.id
);

export const selectUsername = createSelector(
  selectUser,
  (state: AuthStateModel) => state.userName
);

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
};

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];
