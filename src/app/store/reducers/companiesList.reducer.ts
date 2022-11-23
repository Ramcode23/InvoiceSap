import { createReducer, on } from '@ngrx/store';
import { Company } from 'src/app/Models/company.model';
import { loadCompaniesList, loadCompaniesListError, loadCompaniesListSuccess } from '../actions/companiesList.actions';

export interface CompaniesListState {
  companiesList: Company[]
}

export const initialState: CompaniesListState = {
  companiesList: []
}

export const companiesListReducer = createReducer(initialState,

  on(loadCompaniesList, (state, { name }) => ({ ...state, name: name })),

  on(loadCompaniesListSuccess, (state, { companiesList }) => ({
    ...state,
    companiesList: [...companiesList]

  })),
  on(loadCompaniesListError, (state, { payload }) => ({
    ...state,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message
    }

  })


  )

);

