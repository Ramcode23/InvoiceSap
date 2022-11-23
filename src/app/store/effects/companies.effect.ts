import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { CompanyService } from "src/app/services/company.service";
import * as  companyActions from '../actions'
@Injectable()
export class CompanyEffect {
  constructor(
    private actions$: Actions,
    private companyService: CompanyService

  ) {}
   loadCompanies$= createEffect(
      ()=>this.actions$.pipe(
        ofType(companyActions.companies.loadCompanies),
        mergeMap(
          (action) => this.companyService.getCompanies(action.paging)
            .pipe(
              map(companies => companyActions.companies.loadCompaniesSuccess({ companies: companies })),
              catchError(err => of(companyActions.companies.loadCompaniesError({ payload: err })))
            )
        )
    ))

    loadCompany$= createEffect(
      ()=>this.actions$.pipe(
        ofType(companyActions.company.loadCompany),
        mergeMap(
          (action) => this.companyService.getCompany(action.id)
            .pipe(
              map(company=> companyActions.company.loadCompanySuccess({ company: company })),
              catchError(err => of(companyActions.company.loadCompanyError({ payload: err })))
            )
        )
    ))


    loadCompanyList$= createEffect(
      ()=>this.actions$.pipe(
        ofType(companyActions.companiesList.loadCompaniesList),
        mergeMap(
          (action) => this.companyService.getCompaniesList(action.name)
            .pipe(
              map(companiesList=> companyActions.companiesList.loadCompaniesListSuccess({ companiesList:[...companiesList]})),
              catchError(err => of(companyActions.company.loadCompanyError({ payload: err })))
            )
        )
    ))
  }

