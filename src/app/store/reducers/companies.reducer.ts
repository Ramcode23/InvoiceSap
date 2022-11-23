import { createReducer, on } from '@ngrx/store';
import { Company } from 'src/app/Models/company.model';
import { loadCompanies, loadCompaniesError, loadCompaniesSuccess } from '../actions/companies.actions';



export interface CompaniesState {
  hasItems: boolean;
  items:    Company[];
  total:    number;
  page:     number;
  pages:    number;
}

export const initialState: CompaniesState = {
    hasItems: false,
    items:[],
    page:0,
    total:0,
    pages:0
}

export const companiesReducer = createReducer(initialState,

  on(loadCompanies, (state, { paging }) => ({ ...state, paging: paging })),

  on(loadCompaniesSuccess, (state, { companies }) => ({
    ...state ,
    ...companies

  })),
  on(loadCompaniesError, (state, { payload }) => ({
    ...state,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message
    }

  })


  )

);

