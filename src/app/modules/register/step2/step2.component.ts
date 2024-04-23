import { NgIf, NgClass, CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'auth-step-2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [MatStepperModule, CommonModule, MatCheckboxModule, MatIconModule, NgClass, MatSelectModule, RouterLink, NgIf, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule, NgxMatIntlTelInputComponent],
})
export class Step2Component implements OnInit {
  formData = new FormData()
  @ViewChild('signUpNgForm') signUpNgForm: NgForm;
  signUpForm: FormGroup;

  logo: string | ArrayBuffer | null = null;
  registrationCertificate: string | ArrayBuffer | null = null;
  passport: string | ArrayBuffer | null = null;
  transportationCertificate: string | ArrayBuffer | null = null;

  merchant: any;
  currencies: any;
  showBankAccount2: boolean = false;
  showTrashIcon: boolean = false;
  data;
  currentUser;
  loading:boolean = false;
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.data = { certificate_registration: '', supervisor_passport: '' };
    this.currentUser = jwtDecode(localStorage.getItem('tmc'));
    this.authService.getMerchantById(this.currentUser.merchantId).subscribe((res: any) => {
      if (res.success) {
        this.merchant = res.data;
        this.initForm(this.merchant);
      }
    })
    this.signUpForm = this.formBuilder.group({
      merchantId: [null],
      companyName: [null],
      companyType: [null],
      password: [null],
      email: [null],
      supervisorFirstName: [null, [Validators.required]],
      supervisorLastName: [null, [Validators.required]],
      phoneNumber: [{value:null, disabled: true}],
      responsiblePersonFistName: [null, [Validators.required]],
      responsiblePersonLastName: [null, [Validators.required]],
      responsbilePersonPhoneNumber: [null, [Validators.required]],
      factAddress: [''],
      legalAddress: [null, [Validators.required]],
      garageAddress: [''],
      postalCode: [''],
      logo: [null],
      passport: [null],
      registrationCertificate: [null],
      transportationCertificate: [null]
    });
  }
  initForm(merchant) {
    this.signUpForm.patchValue({
      merchantId: this.merchant.id,
      companyName: this.merchant.companyName,
      companyType: this.merchant.companyType,
      password: this.merchant.password,
      email: this.merchant.email,
      supervisorFirstName: merchant.supervisorFirstName,
      supervisorLastName: merchant.supervisorLastName,
      phoneNumber: merchant.phoneNumber.substring(3),
      postalCode: merchant.postalCode,
      garageAddress: merchant.garageAddress,
      responsiblePersonFistName: merchant.responsiblePersonFistName,
      responsiblePersonLastName: merchant.responsiblePersonLastName,
      responsbilePersonPhoneNumber: merchant.responsbilePersonPhoneNumber,
      legalAddress: merchant.legalAddress,
      factAddress: merchant.factAddress,
    })
  }
  signUp() {
    console.log(this.signUpForm.value);
    
    this.loading = true;
    if (this.signUpForm.value.supervisorFirstName === null || this.signUpForm.value.supervisorFirstName === '') {
      this.loading = false;
      this.toastr.error('Требуется указать Имя руководителя');
      return;
    }
    else if (this.signUpForm.value.supervisorLastName === null || this.signUpForm.value.supervisorLastName === '') {
      this.loading = false;
      this.toastr.error('Требуется указать Фамилия руководителя');
      return;
    }
    else if (this.signUpForm.value.phoneNumber ===null || this.signUpForm.value.phoneNumber === '') {
      this.loading = false;
      this.toastr.error('Требуется указать Телефон руководителя');
      return;
    }
    else if (this.signUpForm.value.responsiblePersonFistName === null || this.signUpForm.value.responsiblePersonFistName === '') {
      this.loading = false;
      this.toastr.error('Требуется указать Имя ответственного лица');
      return;
    }
    else if (this.signUpForm.value.responsiblePersonLastName === null || this.signUpForm.value.responsiblePersonLastName === '') {
      this.loading = false;
      this.toastr.error('Требуется указать Фамилия ответственного лица');
      return;
    }
    else if (this.signUpForm.value.responsbilePersonPhoneNumber === null || this.signUpForm.value.responsbilePersonPhoneNumber === '') {
      this.loading = false;
      this.toastr.error('Требуется указать Телефон ответственного лица');
      return;
    }
    else if (this.signUpForm.value.address === null || this.signUpForm.value.address === '') {
      this.loading = false;
      this.toastr.error('Требуется указать Юридический адрес');
      return;
    }
    else if (this.signUpForm.value.passport === null || this.signUpForm.value.passport === '') {
      this.loading = false;
      this.toastr.error('Требуется указать Паспорт руководителя');
      return;
    }
    else if (this.signUpForm.value.registrationCertificate === null || this.signUpForm.value.registrationCertificate === '') {
      this.loading = false;
      this.toastr.error('Требуется указать Регистрация сертификата');
      return;
    }
    else if (this.signUpForm.value.logo === null || this.signUpForm.value.logo === '') {
      this.loading = false;
      this.toastr.error('Требуется указать Логотип');
      return;
    }
    else if (this.signUpForm.value.transportationCertificate === null || this.signUpForm.value.transportationCertificate === '') {
      this.loading = false;
      this.toastr.error('Требуется указать Лицензия для перевозки груза');
      return;
    }
    else {
      this.formData.delete('merchantId')
      this.formData.delete('supervisorFirstName')
      this.formData.delete('supervisorLastName')
      this.formData.delete('responsiblePersonFistName')
      this.formData.delete('responsiblePersonLastName')
      this.formData.delete('responsbilePersonPhoneNumber')
      this.formData.delete('factAddress')
      this.formData.delete('legalAddress')
      this.formData.delete('garageAddress')
      this.formData.delete('postalCode')

      this.formData.append('merchantId', this.currentUser.merchantId?? '')
      this.formData.append('supervisorFirstName', this.signUpForm.value.supervisorFirstName?? '')
      this.formData.append('supervisorLastName', this.signUpForm.value.supervisorLastName?? '')
      this.formData.append('responsiblePersonFistName', this.signUpForm.value.responsiblePersonFistName?? '')
      this.formData.append('responsiblePersonLastName', this.signUpForm.value.responsiblePersonLastName?? '')
      this.formData.append('responsbilePersonPhoneNumber', this.signUpForm.value.responsbilePersonPhoneNumber?? '')
      this.formData.append('factAddress', this.signUpForm.value.factAddress?? '')
      this.formData.append('legalAddress', this.signUpForm.value.legalAddress?? '')
      this.formData.append('garageAddress', this.signUpForm.value.garageAddress?? '')
      this.formData.append('postalCode', this.signUpForm.value.postalCode?? '')
      this.authService.merchantUpdate(this.formData).subscribe((res: any) => {
        if (res.success) {
          this.loading = true;
          this.router.navigate(['register/step3']);
        }
      }, error => {
        this.loading = true;
        this.toastr.error(error.message);
      })
    }
  }
  selectFile(event: any, name: string) {
    const file: File = event.target.files[0];
    if (file) {
      this.formData.append(name, file, new Date().getTime().toString() + '.jpg');
      const reader = new FileReader();
      reader.onload = () => {
        this[name] = reader.result;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }
}