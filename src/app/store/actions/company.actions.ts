import { createAction, props } from "@ngrx/store";
import { Company } from "src/app/Models/company.model";

  export const loadCompany = createAction('[Company Component] load Company',
  props<{id:number}>());

  export const loadCompanySuccess = createAction('[Company] load Company Success',
    props<{ company:Company }>());

  export const loadCompanyError = createAction('[Company] load Company Error',
    props<{ payload: any }>());

