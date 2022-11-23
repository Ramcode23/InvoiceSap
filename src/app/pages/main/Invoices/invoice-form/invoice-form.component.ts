import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { Company } from 'src/app/Models/company.model';
import { InvoiceService } from 'src/app/services/invoice.service';
import { loadCompaniesList } from 'src/app/store/actions/companiesList.actions';
import { loadInvoice } from 'src/app/store/actions/invoice.action';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit, OnDestroy {
  myControl = new FormControl('');
  companiesSub!: Subscription;
  invoiceForm!: FormGroup;
  total!: 0;
  filteredOptions!: Observable<Company[]>;
  id?: string;
  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private invoiceService: InvoiceService,
  ) { }


  ngOnInit(): void {
    this.store.select('companiesList').subscribe(resp => resp.companiesList);
    this.filteredOptions = this.store.select('companiesList').pipe(
      map(values => values.companiesList)
    )
    this.companiesSub = this.filteredOptions.subscribe(resp => resp);
    this.loadForm();
    this.loadData();
  }


  saveinvoice() {
    if (!this.invoiceForm.valid) {
      return;
    }

    this.invoiceService.saveInvoice(this.invoiceForm.value).subscribe(resp => {
      this.router.navigateByUrl('/main/invoices');
    },
      error => {
        console.log(error)
      }

    )
  }



  loadForm() {
    this.invoiceForm = this.fb.group({
      company: ['', Validators.required],
      description: ['', Validators.required],
      invoiceDate: ['', Validators.required],
      invoiceLines: this.fb.array([])
    });
    this.addInvoiceLine();
  }


  filter(name: string) {
    const seconds = 3000;
    console.log(this.invoiceForm.controls['company'].value)
    setTimeout(() => {
      this.store.dispatch(loadCompaniesList({ name: this.invoiceForm.controls['company'].value }))
    }, seconds);

  }

  getTotal() {
    this.total = 0;
    this.invoiceLines.controls.map(c => this.total += c.value.price * c.value.quality);

  }

  displayFn(company: Company): string {
    return company && company.name ? company.name : '';
  }


  ngOnDestroy(): void {
    this.companiesSub.unsubscribe();
  }

  get invoiceLines() {
    return this.invoiceForm.get('invoiceLines') as FormArray;
  }

  loadData() {
    debugger;
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.store.select('invoice').subscribe(invoice => {
        console.log(invoice);

        if (invoice) {
          this.invoiceForm.controls['description'].setValue(invoice.description);
          this.invoiceForm.controls['invoiceDate'].setValue(invoice!.invoiceDate);

          this.invoiceLines.clear();
          invoice.invoiceLines.map(invoiceLine => {

            this.addInvoiceLine(invoiceLine);
          })

        }
      })
      this.store.dispatch(loadInvoice({ id: Number(this.id) }))
    }

  }

  addInvoiceLine(invoiceLine?: any) {
    let newInvoiceLine: any;
    if (invoiceLine == null) {
      newInvoiceLine = this.fb.group({
        description: ['', Validators.required],
        price: [0, [Validators.min(0), Validators.required]],
        quality: [0, [Validators.min(0), Validators.required]],
      })

    } else {
      newInvoiceLine = this.fb.group({
        description: [invoiceLine.description, Validators.required],
        price: [invoiceLine.price, [Validators.min(0), Validators.required]],
        quality: [invoiceLine.price, [Validators.min(0), Validators.required]],
      })
    }

    this.invoiceLines.push(newInvoiceLine);
  }

  removeInvoiceLine(index: number) {
    this.invoiceLines.removeAt(index);
    this.getTotal();
  }

}
