import { createAction, props } from '@ngrx/store';
import {  Company } from 'src/app/Models/company.model';

  export const loadCompaniesList = createAction('[Companies Component] load CompaniesList',
  props<{name:string}>());

  export const loadCompaniesListSuccess = createAction('[Companies] load CompaniesList Success',
    props<{ companiesList:Company[] }>());

  export const loadCompaniesListError = createAction('[Companies] load CompaniesList Error',
    props<{ payload: any }>());




