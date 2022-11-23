import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Company, CompanyCreate, CompanyResponse } from '../Models/company.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  url = environment.AppUrl + '/Companies'
  constructor(private http: HttpClient
    ) { }

  getCompanies(params?: {
    page?: number;
    take?: number;
    ids?: string;
  }) {
    return this.http.get<CompanyResponse>(this.url, { params })
  }

  getCompaniesList(name:string){

    return this.http.get<Company[]>(this.url+'/list',{params:{name}});
  }
getCompany(id:number){
  return this.http.get<Company>(this.url+'/'+id);
}
  saveCompnay(company: CompanyCreate) {
    return this.http.post(this.url, company);
  }

  editCompany(company:Company) {

    return this.http.put(this.url+'/'+company.id, company)
  }

  deleteCompany(id:string) {
    return this.http.delete(this.url+'/'+id)

  }

}
