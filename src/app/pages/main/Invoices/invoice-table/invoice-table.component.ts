import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Invoice } from 'src/app/Models/Invoice.model';
import { InvoiceService } from 'src/app/services/invoice.service';
import { loadInvoices } from 'src/app/store/actions/invoices.actions';
import { AppState } from 'src/app/store/app.reducer';
import { InvoiceTableDataSource } from './invoice-table-datasource';

@Component({
  selector: 'app-invoice-table',
  templateUrl: './invoice-table.component.html',
  styleUrls: ['./invoice-table.component.css']
})
export class InvoiceTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Invoice>;
  dataSource: InvoiceTableDataSource;
  invoiceSub!: Subscription;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'invoiceNumber', 'invoiceDate', 'total', 'actions'];

  constructor(private invoice: InvoiceService,
    private store: Store<AppState>
  ) {
    this.dataSource = new InvoiceTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    const paging = {
      page: 1,
      take: 10
    }

    this.invoiceSub = this.store.select('invoices').subscribe(resp => {
      console.log(resp);

      this.loadData(resp.items);
    });
    this.store.dispatch(loadInvoices({ paging: { page: 1, take: 10 } }))
  }

  loadData(invoices: Invoice[]) {
    this.dataSource = new InvoiceTableDataSource();
    this.dataSource.data = invoices;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

  }

  delete(invoices: Invoice){

  }
}
