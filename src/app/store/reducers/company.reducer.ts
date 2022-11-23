import { createReducer, on } from "@ngrx/store";
import { loadCompany, loadCompanyError, loadCompanySuccess } from "../actions/company.actions";



export interface CompanyState {
  id:   number;
  name?: string;
}

export const initialState: CompanyState = {
  id:0,
  name:''
}



export const companyReducer = createReducer(initialState,

  on(loadCompany, (state, { id }) => ({ ...state, id: id })),

  on(loadCompanySuccess, (state, { company }) => ({
    ...state ,
    ...company
  })),
  on(loadCompanyError, (state, { payload }) => ({
    ...state,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message
    }
  }))



);
