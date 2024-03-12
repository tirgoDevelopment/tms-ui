import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgApexchartsModule } from 'ng-apexcharts';
import { jwtDecode } from 'jwt-decode';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { SettingService } from './services/settings.service';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from 'app/core/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [ MatInputModule,ReactiveFormsModule, FormsModule, MatProgressSpinnerModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatRippleModule, MatMenuModule, MatTabsModule, MatButtonToggleModule, NgApexchartsModule, NgFor, NgIf, MatTableModule, NgClass],
})
export class SettingsComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  currentUser:any;

  constructor(
    private settingSevice: SettingService,
    private authService: AuthService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }
  ngOnInit(): void {
    this.currentUser = jwtDecode(this.authService.accessToken);

    this.form = this.formBuilder.group({
      userId: [this.currentUser.userId],
      password: [null, Validators.required],
      newPassword: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    })
  }

  changePassword() {
    this.loading = true;
    if(this.form.value.newPassword !== this.form.value.confirmPassword) {
      this.toastr.error('Пароль не совпадает');
      this.loading = false;
    }
    else if(this.form.value.password == null) {
      this.loading = false;
      this.toastr.error('Требуется старый пароль');
    }
    else if(this.form.value.newPassword == null) {
      this.loading = false;
      this.toastr.error('Требуется новый пароль');
    }
    else if(this.form.value.confirmPassword == null) {
      this.loading = false;
      this.toastr.error('Подтвердите пароль');
    }
    else {
      this.settingSevice.changePassword(this.form.value).subscribe((res:any) => {
        if(res.success) {
          this.loading = false;
          this.toastr.success('Пароль успешно обновлен');
        }
      }, err => {
        if(err.error.message == 'invalidPassword') {
          this.toastr.error('Неверный старый пароль ');
          this.loading = false;
        }else {
          this.toastr.error(err.error.message);
          this.loading = false;
        }
      })
    }
    
  }
}