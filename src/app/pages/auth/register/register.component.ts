import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogMessageComponent } from 'src/app/components/dialog-message/dialog-message.component';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  dialogConfig: MatDialogConfig<any> = {
    width: '250px',

  };

  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private tokenService: TokenService,
    public dialog: MatDialog,
  ) { }


  ngOnInit(): void {

    this.registerForm = this.fb.group({
      email: ['user01@gmail.com', [Validators.required, Validators.email]],
      password: ['Password123@', [
        Validators.required,
        Validators.minLength(6)]],
      firstName: ['Luis', Validators.required],
      lastName: ['polonia', Validators.required],

    });
  }
  submit() {

    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe((resp: any) => {
        this.tokenService.setToken(resp.token.token)
        this.router.navigateByUrl('/main/invoices')
      }, error => {
        this.openDialog(error.error);
      }
      )
    }
  }

  openDialog(message: string): void {
    this.dialog.open(DialogMessageComponent, {
      width: '250px',
      data: { message }
    }
    );
  }
}
