import { Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { Component, OnInit, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { jwtDecode } from 'jwt-decode';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/core/auth/auth.service';
import { NgxMaskDirective } from 'ngx-mask';
import { TypesService } from 'app/shared/services/types.service';

@Component({
  selector: 'auth-step-3',
  templateUrl: './step-3.component.html',
  styleUrls: ['./step-3.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [MatSnackBarModule, NgxMaskDirective, MatStepperModule, CommonModule, MatCheckboxModule, MatIconModule, NgClass, MatSelectModule, RouterLink, NgIf, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule, NgxMatIntlTelInputComponent],
})
export class Step3Component implements OnInit {
  @ViewChild('signUpNgForm') signUpNgForm: NgForm;
  signUpForm: FormGroup;
  merchant: any;
  phone: string;
  id: number;
  currencies: any;
  showBankAccount2: boolean = false;
  showTrashIcon: boolean = false;
  currentUser: any;
  completed: boolean = false;
  constructor(
    private authService: AuthService,
    private typesService: TypesService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentUser = jwtDecode(localStorage.getItem('tmc'));
    this.authService.getMerchantById(this.currentUser.merchantId).subscribe((res: any) => {
      if (res.success) {
        this.merchant = res.data;
        if (this.merchant.completed && (!this.merchant.verified && !this.merchant.rejected)) {
          this.completed = true;
        }
      }
    })

    this.signUpForm = this.formBuilder.group({
      companyName: [null],
      companyType: [null],
      password: [null],
      email: [null],
      phoneNumber: [null],
      merchantId: [null],
      responsiblePersonLastName: [null],
      responsiblePersonFistName: [null],
      registrationCertificate: [null],
      passport: [null],
      logo: [null],
      responsbilePersonPhoneNumber: [null],
      supervisorFirstName: [null],
      supervisorLastName: [null],
      legalAddress: [null],
      factAddress: [null],
      bankAccounts: [null],
      currency: [null, [Validators.required]],
      bankAccount: [null, [Validators.required, Validators.maxLength(20), Validators.minLength(20), Validators.pattern('^[0-9]*$')]],
      currency2: [null],
      bankAccount2: [null, [Validators.minLength(20), Validators.maxLength(20), Validators.pattern('^[0-9]*$')]],
      bankName: [null, [Validators.required]],
      bankBranchName: [null, [Validators.required]],
      inn: [null, [Validators.required]],
      taxPayerCode: [null, [Validators.minLength(12), Validators.maxLength(12), Validators.required]],
      oked: [null, [Validators.required]],
      mfo: [null, [Validators.required, Validators.required, Validators.maxLength(5), Validators.minLength(5), Validators.pattern('^[0-9]*$')]],
      dunsNumber: [null],
      ibanNumber: [null],
      notes: [null],
    });

    this.typesService.getCurrencies().subscribe((res: any) => {
      if (res.success) {
        this.currencies = res.data;
        this.signUpForm.patchValue({ currency: this.currencies[0].id, currency2: this.currencies[0].id });
      }
    })
  }
  signUp() {
    this.signUpForm.disable();
    if (this.signUpForm.value.bankName === '' || this.signUpForm.value.bankName === null) {
      this.signUpForm.enable();
      this.toastr.error('Требуется указать Наименование банка');
    }
    else if (this.signUpForm.value.bankAccount === '' || this.signUpForm.value.bankAccount === null) {
      this.signUpForm.enable();
      this.toastr.error('Требуется указать Расчетный счет');
    }
    else if (this.signUpForm.value.inn === '' || this.signUpForm.value.inn === null) {
      this.signUpForm.enable();
      this.toastr.error('Требуется указать ИНН');
    }
    else if (this.signUpForm.value.taxPayerCode === '' || this.signUpForm.value.taxPayerCode === null) {
      this.signUpForm.enable();
      this.toastr.error('Требуется указать Код плательщика НДС');
    }
    else if (this.signUpForm.value.oked === '' || this.signUpForm.value.oked === null) {
      this.signUpForm.enable();
      this.toastr.error('Требуется указать Код плательщика ОКЭД');
    }
    else if (this.signUpForm.value.mfo === '' || this.signUpForm.value.mfo === null) {
      this.signUpForm.enable();
      this.toastr.error('Требуется указать Код плательщика МФО');
    }
    else {
      if (this.signUpForm.value.bankAccount2 == '') {
        this.signUpForm.patchValue({
          responsiblePersonLastName: this.merchant.responsiblePersonLastName,
          responsiblePersonFistName: this.merchant.responsiblePersonFistName,
          registrationCertificate: this.merchant.registrationCertificate,
          passport: this.merchant.passport,
          logo: this.merchant.logo,
          responsbilePersonPhoneNumber: this.merchant.responsbilePersonPhoneNumber,
          supervisorFirstName: this.merchant.supervisorFirstName,
          supervisorLastName: this.merchant.supervisorLastName,
          legalAddress: this.merchant.legalAddress,
          factAddress: this.merchant.factAddress,

          merchantId: +this.merchant.id,
          companyName: this.merchant.companyName,
          companyType: this.merchant.companyType,
          password: this.merchant.password,
          phoneNumber: this.merchant.phoneNumber,
          email: this.merchant.email,
          bankAccounts: [
            { account: +this.signUpForm.value.bankAccount, currencyId: this.signUpForm.value.currency },
            { account: +this.signUpForm.value.bankAccount2, currencyId: this.signUpForm.value.currency2 },
          ]
        });
      } 
      else {
        this.signUpForm.patchValue({
          responsiblePersonLastName: this.merchant.responsiblePersonLastName,
          responsiblePersonFistName: this.merchant.responsiblePersonFistName,
          registrationCertificate: this.merchant.registrationCertificate,
          passport: this.merchant.passport,
          logo: this.merchant.logo,
          responsbilePersonPhoneNumber: this.merchant.responsbilePersonPhoneNumber,
          supervisorFirstName: this.merchant.supervisorFirstName,
          supervisorLastName: this.merchant.supervisorLastName,
          legalAddress: this.merchant.legalAddress,
          factAddress: this.merchant.factAddress,
          
          merchantId: +this.merchant.id,
          companyName: this.merchant.companyName,
          companyType: this.merchant.companyType,
          password: this.merchant.password,
          phoneNumber: this.merchant.phoneNumber,
          email: this.merchant.email,
          bankAccounts: [
            { account: +this.signUpForm.value.bankAccount, currencyId: this.signUpForm.value.currency }
          ]
        });
      }
      this.signUpForm.enable();
      this.authService.merchantComplete(this.signUpForm.value).subscribe((res: any) => {
        if (res.success) {
          this.completed = true;
          this.signUpForm.enable();
        }
      }, error => {
        this.signUpForm.enable();
        this.toastr.error(error.error.message);
      })
    }
  }
  toggleShowBankAccount2() {
    this.showBankAccount2 = !this.showBankAccount2;
    this.showTrashIcon = !this.showTrashIcon;
  }
  signOut(): void {
    this.authService.signOut().subscribe(() => { })
    location.reload();
  }
}

