import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesTableComponent } from './companies/companies-table/companies-table.component';
import { CompanyFormComponent } from './companies/company-form/company-form.component';

import { InvoiceFormComponent } from './Invoices/invoice-form/invoice-form.component';
import { InvoiceTableComponent } from './Invoices/invoice-table/invoice-table.component';
import { MainComponent } from './main.component';


const routes: Routes = [
  { path: '', component: MainComponent ,children:[

    { path: 'invoices', component: InvoiceTableComponent },
    { path: 'invoice', component:InvoiceFormComponent },
    { path: 'invoice/:id', component:InvoiceFormComponent },
    { path: 'companies', component: CompaniesTableComponent },
    { path: 'company', component: CompanyFormComponent },
    { path: 'company/:id', component: CompanyFormComponent },
    {
      path: '',
      redirectTo: '',
      pathMatch: 'full'
    },
  ]},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
