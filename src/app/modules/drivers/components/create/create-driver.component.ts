import { DatePipe, NgClass, NgFor, NgIf } from "@angular/common";
import { ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
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
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { NgxMatIntlTelInputComponent } from "ngx-mat-intl-tel-input";
import { DriversService } from "../../services/drivers.service";
import { ConfirmAddTransportComponent } from "../confirmAddTransport/confirm-add-transport.component";

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
  showConfirm:boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CreateDriverComponent>,
    private driverService: DriversService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog) { }

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
    else if (this.form.value.password === null) {
      this.form.enable();
      this.toastr.error('Требуется указать пароль');
    }
    else if (this.form.value.driverLicense === null) {
      this.form.enable();
      this.toastr.error('Требуется указать Водительские права');
    }
    else if (this.form.value.passport === null) {
      this.form.enable();
      this.toastr.error('Требуется указать Паспорт');
    }
    else {
      this.formData.append('firstName', this.form.value.firstName);
      this.formData.append('lastName', this.form.value.lastName);
      this.formData.append('phoneNumbers', JSON.stringify(this.form.value.phoneNumbers));
      this.formData.append('password', this.form.value.password);

      this.driverService.createDriver(this.formData).subscribe((res: any) => {
        if (res && res.success) {
          this.dialog.closeAll();
          this.addTransport(res.data);
          this.form.enable();
          this.toastr.success('Водитель успешно добавлень');
          this.formData = new FormData;
        }
      }, error => {
        if (error.error.message == 'duplicateError') {
          this.formData = new FormData;
          this.form.enable();
          this.toastr.error('Пользователь имеет в системе');
        } else {
          this.formData = new FormData;
          this.form.enable();
          this.toastr.error(error.error.message);
        }
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
  addTransport(response) {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(ConfirmAddTransportComponent, {
      autoFocus: false,
      disableClose: true,
      data: response,
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.getOrders();
    });
  }
}