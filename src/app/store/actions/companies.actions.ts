import { createAction, props } from '@ngrx/store';
import {  CompanyResponse } from 'src/app/Models/company.model';
import { Paginator } from 'src/app/Models/paginator.model';

export const loadCompanies = createAction('[Companies Component] load Companies',
props<{paging:Paginator}>());

export const loadCompaniesSuccess = createAction('[Companies] load Companies Success',
  props<{ companies:CompanyResponse }>());

export const loadCompaniesError = createAction('[Companies] load Companies Error',
  props<{ payload: any }>());





