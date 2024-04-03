import { NgIf } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { UserService } from 'app/core/user/user.service';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'auth-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  animations: fuseAnimations,
  standalone: true,
  imports: [RouterLink, FuseAlertComponent, NgIf, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule],
})

export class AuthSignInComponent implements OnInit {
  @ViewChild('signInNgForm') signInNgForm: NgForm;

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  signInForm: UntypedFormGroup;
  showAlert: boolean = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private userService: UserService,
    private _formBuilder: UntypedFormBuilder,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit() {
    this._authService.signOut();
    this.signInForm = this._formBuilder.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  signIn() {
    if (this.signInForm.invalid) {
      return;
    }
    this.signInForm.disable();
    this._authService.signIn(this.signInForm.value).subscribe((res: any) => {
      if (res.success) {
        this.signInForm.enable();
        this._authService.accessToken = res.data.token;
        let user: any = jwtDecode(res.data.token);
        this._authService.getMerchantById(user.merchantId).subscribe((merchant: any) => {
          this.userService.merchant = merchant.data;
          this._authService.redirect(merchant.data);
        })
      }
    }, error => {
      if(error.error.message == "userNotFound") {
        this.signInForm.enable();
        this.toastr.error('Пользователь не найден')
      }
      else if(error.error.message == "invalidPassword") {
        this.signInForm.enable();
        this.toastr.error('Неверный пароль')
      }
      else {
        this.signInForm.enable();
        this.toastr.error(error.error.message)
      }
    })
  }
}
