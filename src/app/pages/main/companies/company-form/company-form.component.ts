import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CompanyService } from 'src/app/services/company.service';
import { loadCompany } from 'src/app/store/actions/company.actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {
  companyForm!: FormGroup;
  id?:string;
  companySub!: Subscription;
  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private store: Store<AppState>,
    private router: Router,
    private route:ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      name: ['', Validators.required]
    })
    this.loadData()
  }

  loadData(){
    this.id=this.route.snapshot.params['id'];
    if(this.id){
      this.store.select('company').subscribe( company=>{
        this.companyForm.controls['name'].setValue(company.name)
      })
      this.store.dispatch(loadCompany({id:Number( this.id)}))
    }

  }


  submit() {
    if (this.companyForm.valid) {
      if(!this.id){
        this.companyService.saveCompnay(this.companyForm.value).subscribe(resp => {
          this.router.navigateByUrl('/main/companies')

        })
      }
      this.companyService.editCompany({...this.companyForm.value,id:this.id}).subscribe(resp=>{

        this.router.navigateByUrl('/main/companies');
      })
    }
  }


}
