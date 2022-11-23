import { createReducer, on } from "@ngrx/store";
import { Invoice } from "src/app/Models/Invoice.model";
import { loadInvoices, loadInvoicesError, loadInvoicesSuccess } from "../actions/invoices.actions";

export interface InvoicesState {
  hasItems: boolean;
  items:    Invoice[];
  total:    number;
  page:     number;
  pages:    number;
}

export const initialState: InvoicesState = {
    hasItems: false,
    items:[],
    page:0,
    total:0,
    pages:0
}

export const invoicesReducer = createReducer(initialState,

  on(loadInvoices, (state, { paging }) => ({ ...state, paging: paging })),

  on(loadInvoicesSuccess, (state, { invoices }) => ({
    ...state ,
    ...invoices

  })),
  on(loadInvoicesError, (state, { payload }) => ({
    ...state,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message
    }

  })


  )

);
