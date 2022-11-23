import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ComponenstModule } from 'src/app/components/componenst.module';


import { ReactiveFormsModule } from '@angular/forms';
import { CompanyFormComponent } from './companies/company-form/company-form.component';
import { InvoiceFormComponent } from './Invoices/invoice-form/invoice-form.component';
import { InvoiceTableComponent } from './Invoices/invoice-table/invoice-table.component';
import { CompaniesTableComponent } from './companies/companies-table/companies-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    MainComponent,
    CompanyFormComponent,
    InvoiceFormComponent,
    InvoiceTableComponent,
    CompaniesTableComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    ComponenstModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ]
})
export class MainModule { }
