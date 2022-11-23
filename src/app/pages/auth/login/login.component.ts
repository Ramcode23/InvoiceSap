import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private tokeService: TokenService,
    private router: Router,
    private store:Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['admin@gmail.com', [Validators.required, Validators.email]],
      password: ['Password123@', Validators.required]

    })
  }


  submit() {

    this.authService.loging(this.loginForm.value)
      .subscribe((resp: any) => {

        if (resp.token.token) {
          this.tokeService.setToken(resp.token.token)
          this.router.navigateByUrl('/main/invoices')
        }
      }, error => {
        console.log(error.error,)
      });
  }


}
