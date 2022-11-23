import { createReducer, on } from "@ngrx/store";
import { InvoiceLine } from "src/app/Models/Invoice.model";
import { loadInvoice, loadInvoiceError, loadInvoiceSuccess } from "../actions/invoice.action";

export interface InvoiceState {
  id:number;
  invoiceNumber: string;
  description:   string;
  invoiceDate:  Date;
  invoiceLines: InvoiceLine[];
  total:         number;
}

export const initialState: InvoiceState = {
  id: 0,
  invoiceNumber: '',
  description: '',
  invoiceLines: [],
  invoiceDate: new Date,
  total:0,
}



export const invoiceReducer = createReducer(initialState,

  on(loadInvoice, (state, { id }) => ({ ...state, id: id })),

  on(loadInvoiceSuccess, (state, { invoice }) => ({
    ...state ,
    ...invoice
  })),
  on(loadInvoiceError, (state, { payload }) => ({
    ...state,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message
    }
  }))
);
