import { createAction, props } from "@ngrx/store";
import { Invoice } from "src/app/Models/Invoice.model";

export const loadInvoice = createAction('[Invoice Component] load Invoice',
props<{id:number}>());

export const loadInvoiceSuccess = createAction('[Invoice] load Invoice Success',
  props<{ invoice:Invoice }>());

export const loadInvoiceError = createAction('[Invoice] load Invoice Error',
  props<{ payload: any }>());

