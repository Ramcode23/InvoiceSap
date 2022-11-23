import { ActionReducerMap } from '@ngrx/store';
import * as companies from './reducers/companies.reducer';
import * as companiesList from './reducers/companiesList.reducer';
import * as company from './reducers/company.reducer';
import * as auth from './reducers/auth.reducer';
import { invoice, invoices } from './reducers';



export interface AppState {
  auth:auth.State,
  companies:companies.CompaniesState,
  companiesList:companiesList.CompaniesListState,
  company:company.CompanyState,
  invoices:invoices.InvoicesState,
  invoice:invoice.InvoiceState,
}

export const appReducers: ActionReducerMap<AppState> = {
  auth:auth.authReducer,
  companies:companies.companiesReducer,
  companiesList:companiesList.companiesListReducer,
  company:company.companyReducer,
  invoices:invoices.invoicesReducer,
  invoice:invoice.invoiceReducer,
}
