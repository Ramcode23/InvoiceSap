import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Invoice, InvoiceCreate, InvoiceResponse } from '../Models/Invoice.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  url = environment.AppUrl + '/Invoice'
  constructor(private http: HttpClient
    ) {}


    getInvoices(params?: {
      page?: number;
      take?: number;
      ids?: string;
    }) {
      return this.http.get<InvoiceResponse>(this.url, { params })
    }

  getInvoice(id:number){
    return this.http.get<Invoice>(this.url+'/'+id);
  }
    saveInvoice(invoice: InvoiceCreate) {
      return this.http.post(this.url, invoice);
    }

    editInvoice(id:string,invoice:InvoiceCreate) {
      return this.http.put(this.url+'/'+id, invoice)
    }

    deleteInvoice(id:string) {
      return this.http.delete(this.url+'/'+id)

    }

  }



