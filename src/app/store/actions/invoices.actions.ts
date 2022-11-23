import { createAction, props } from "@ngrx/store";
import { InvoiceResponse } from "src/app/Models/Invoice.model";
import { Paginator } from "src/app/Models/paginator.model";

export const loadInvoices = createAction('[invoices Component] load invoices',
props<{paging:Paginator}>());

export const loadInvoicesSuccess = createAction('[invoices] load invoices Success',
  props<{ invoices:InvoiceResponse }>());

export const loadInvoicesError = createAction('[invoices] load invoices Error',
  props<{ payload: any }>());


