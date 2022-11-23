import { createReducer, on } from "@ngrx/store";
import { AuthenticatedUser } from "src/app/Models/user.model";
import { loginError, loginSuccess, loginUser } from "../actions/auth.actions";


export interface State {
  user: AuthenticatedUser|undefined|null;
}

export const initialState: State = {
  user: null,
}

export const authReducer = createReducer(initialState,

  on(loginUser, (state )=> ({ ...state, })),
  on(loginSuccess, (state ,{user})=> ({ ...state,user: {...user}})),
  on(loginError, (state, { payload }) => ({
    ...state,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message
    }
  }))

);

