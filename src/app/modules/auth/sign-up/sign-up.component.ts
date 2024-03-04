import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOption, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'auth-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [RouterLink, NgIf, NgClass, MatOptionModule, MatSelectModule, FuseAlertComponent, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule],
})
export class AuthSignUpComponent implements OnInit {
  toastr = inject(ToastrService);

  @ViewChild('signUpNgForm') signUpNgForm: NgForm;
  signUpForm: FormGroup;
  phone: string;
  formFieldHelpers: string[] = [''];
  // currentUser: any;
  merchant: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.phone = params.phone;
    });
    this.signUpForm = this.formBuilder.group({
      companyType: ['ООО', Validators.required],
      companyName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      phoneNumber: [this.phone],
      agreement: [false],
    });

  }

  signUp() {
    this.signUpForm.disable();

    if (this.signUpForm.value.confirmPassword && this.signUpForm.value.password !== this.signUpForm.value.confirmPassword) {
      this.signUpForm.enable();
      this.toastr.error('Пароль не совпадает');
    }
    else if (this.signUpForm.value.companyType === '') {
      this.signUpForm.enable();
      this.toastr.error('Требуется указать тип компании');
    }
    else if (this.signUpForm.value.email === '') {
      this.signUpForm.enable();
      this.toastr.error('Требуется указать электронная почта');
    }
    else if (!this.signUpForm.value.email.includes('@')) {
      this.signUpForm.enable();
      this.toastr.error('Неверный формат электронной почты');
    }
    else if (this.signUpForm.value.companyName === '') {
      this.signUpForm.enable();
      this.toastr.error('Требуется указать Наименование фирмы');
    }
    else if (this.signUpForm.value.password === '') {
      this.signUpForm.enable();
      this.toastr.error('Требуется указать пароль');
    }
    else if (this.signUpForm.value.confirmPassword === '') {
      this.signUpForm.enable();
      this.toastr.error('Подтвердить пароль');
    }
    else {
      this.signUpForm.enable();
      this.authService.merchantCreate(this.signUpForm.value).subscribe((res: any) => {
        if (res.success) {
          this.signUpForm.enable();
          this.authService.signIn({ username: this.signUpForm.value.email, password: this.signUpForm.value.password,userType: 'client_merchant_user'}).subscribe((res:any)=> {
            this.authService.accessToken = res.data.token;
            let user: any = jwtDecode(res.data.token);
            this.authService.getMerchantById(user.merchantId).subscribe((merchant: any) => {
              this.userService.merchant = merchant.data;
              this.authService.redirect(merchant.data);
            })
          })
          this.toastr.success("Мерчант успешно добавлен");
        }
      }, error => {
        if (error.error.message == "email must be an email") {
          this.signUpForm.enable();
          this.toastr.error('Неверный формат электронной почты');
        }
      })
    }
  }

}