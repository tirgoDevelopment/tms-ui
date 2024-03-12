import { CommonModule, DatePipe, NgClass, NgFor, NgIf } from "@angular/common";
import { ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { PaginationComponent } from "app/shared/components/pagination/pagination.component";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatTabsModule } from "@angular/material/tabs";
import { MatMenuModule } from "@angular/material/menu";
import { MatRippleModule } from "@angular/material/core";
import { NgApexchartsModule } from "ng-apexcharts";
import { Subscription, catchError, map, of, switchMap } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { NgxMatIntlTelInputComponent } from "ngx-mat-intl-tel-input";
import { DriversService } from "../../services/drivers.service";

@Component({
  selector: 'app-create-driver',
  templateUrl: './create-driver.component.html',
  styleUrls: ['./create-driver.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [PaginationComponent, NgxMatIntlTelInputComponent, MatDialogModule, MatInputModule, MatSelectModule, ReactiveFormsModule, FormsModule, DatePipe, MatProgressSpinnerModule, MatPaginatorModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatRippleModule, MatMenuModule, MatTabsModule, MatButtonToggleModule, NgApexchartsModule, NgFor, NgIf, MatTableModule, NgClass],
})
export class CreateDriverComponent implements OnInit {
  formData = new FormData()
  form: FormGroup;
  driverLicense: string;
  passport: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private driverService: DriversService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phoneNumbers: this.formBuilder.array([this.data.phone], Validators.required),
      email: [null, Validators.required],
      citizenship: [null, Validators.required],
      password: [null, Validators.required],
      driverLicense: [null, Validators.required],
      passport: [null, Validators.required],
    })
  }
  submit() {
    this.form.disable();

    if (this.form.value.firstName === null) {
      this.form.enable();
      this.toastr.error('Требуется указать Имя');
    }
    else if (this.form.value.lastName === null) {
      this.form.enable();
      this.toastr.error('Требуется указать Фамилия');
    }
    else if (this.form.value.phoneNumbers === null) {
      this.form.enable();
      this.toastr.error('Требуется указать Номер телефона');
    }
    else if (this.form.value.email === null) {
      this.form.enable();
      this.toastr.error('Требуется указать Электронная почта');
    }
    else if (this.form.value.citizenship === null) {
      this.form.enable();
      this.toastr.error('Требуется указать Гражданство');
    }
    else if (this.form.value.password === null) {
      this.form.enable();
      this.toastr.error('Требуется указать пароль');
    }
    else {
      this.formData.append('firstName', this.form.value.firstName);
      this.formData.append('lastName', this.form.value.lastName);
      this.formData.append('phoneNumbers',JSON.stringify(this.form.value.phoneNumbers) );
      this.formData.append('email', this.form.value.email);
      this.formData.append('citizenship', this.form.value.citizenship);
      this.formData.append('password', this.form.value.password);

      this.driverService.createDriver(this.formData).subscribe((res: any) => {
        if (res.succes) {
          console.log(res);
          this.form.enable();
          this.toastr.success('Водитель успешно добавлень');
          this.formData = new FormData;
        }
      }, error => {
        if(error.error.message == 'duplicateError') {
          this.formData = new FormData;
          this.form.enable();
          this.toastr.error('Пользователь имеет в системе');
        }
        this.formData = new FormData;
        this.form.enable();
        this.toastr.error(error.error.message);
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