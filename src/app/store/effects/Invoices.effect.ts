import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { InvoiceService } from 'src/app/services/invoice.service';
import * as invoiceActions from '../actions';

@Injectable({
  providedIn: 'root'
})
export class InvoiceEffects {
  constructor(private actions$: Actions,
    private invoiceService: InvoiceService
  ) { }

  loadInvoices$ = createEffect(
    () => this.actions$.pipe(
      ofType(invoiceActions.invoices.loadInvoices),
      mergeMap(
        (action) => this.invoiceService.getInvoices(action.paging)
          .pipe(
            map(invoices => invoiceActions.invoices.loadInvoicesSuccess({ invoices: invoices })),
            catchError(err => of(invoiceActions.companies.loadCompaniesError))))

    )

  )

  loadInvoice$ = createEffect(
    () => this.actions$.pipe(
      ofType(invoiceActions.invoice.loadInvoice),
      mergeMap(
        (action) => this.invoiceService.getInvoice(action.id)
          .pipe(
            map(invoice => invoiceActions.invoice.loadInvoiceSuccess({ invoice })),
            catchError(err=>of(invoiceActions.invoice.loadInvoiceError))
          )

      )

    )


  )



}
