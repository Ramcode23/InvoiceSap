import { createAction, props } from '@ngrx/store';
import { AuthenticatedUser, UserLogin } from 'src/app/Models/user.model';



export const loginUser = createAction('[Auth] LoginUser',
props<{ user: UserLogin }>());

export const loginSuccess = createAction('[Auth] LoginSuccess',
props<{ user: AuthenticatedUser }>());

export const loginError = createAction('[Auth] loginError',
props<{ payload: any }>());


