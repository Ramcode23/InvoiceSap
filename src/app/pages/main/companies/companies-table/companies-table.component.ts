import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Company, CompanyResponse } from 'src/app/Models/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { loadCompanies } from 'src/app/store/actions/companies.actions';
import { AppState } from 'src/app/store/app.reducer';
import Swal from 'sweetalert2';
import { CompaniesTableDataSource, CompaniesTableItem } from './companies-table-datasource';

@Component({
  selector: 'app-companies-table',
  templateUrl: './companies-table.component.html',
  styleUrls: ['./companies-table.component.css']
})
export class CompaniesTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CompaniesTableItem>;
  dataSource: CompaniesTableDataSource;
  companies$!: Observable<CompanyResponse>;
  companiesSub!: Subscription;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'actions'];

  constructor(
    private companyService: CompanyService,
    private store: Store<AppState>
  ) {
    this.dataSource = new CompaniesTableDataSource();
  }

  ngOnInit(): void {


  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    const paging = {
      page: 1,
      take: 10
    }

    this.companiesSub = this.store.select('companies').subscribe(resp => {
      this.loadData(resp.items)
    })
    this.store.dispatch(loadCompanies({ paging: { page: 1, take: 10 } }))
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    /*    this.dataSource.filter = filterValue.trim().toLowerCase(); */
  }



  loadData(companies: Company[]) {
    this.dataSource = new CompaniesTableDataSource();
    this.dataSource.data = companies;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

  }

  pageChanged(event: any) {
    /*  this.loading = true; */
    console.log(event);
    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;

    let previousIndex = event.previousPageIndex;
    let previousSize = pageSize * pageIndex;

    this.companies$ = this.companyService.getCompanies({ page: pageIndex, take: pageSize });
    this.dataSource = new CompaniesTableDataSource();
    this.companies$.subscribe(companies => {
      this.loadData(companies.items);
    }
    );

    /*   this.getNextData(previousSize, (pageIndex).toString(), pageSize.toString()); */
  }



  submit() {

  }
  delete(company: Company) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
debugger
        this.companyService.deleteCompany(company.id.toString()).subscribe(resp => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          this.store.dispatch(loadCompanies({ paging: { page: 1, take: 10 } }))
        },
          error => {
            Swal.fire(
              'warning!',
              'There are something worn!.',
              'success'
            )
          }

        )

      }
    })
  }

  ngOnDestroy(): void {
    this.companiesSub.unsubscribe();
  }

}
