import { DatePipe, NgClass, NgFor, NgIf } from "@angular/common";
import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatSelect, MatSelectModule } from "@angular/material/select";
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
import { jwtDecode } from "jwt-decode";
import { AuthService } from "app/core/auth/auth.service";
import { TypesService } from "app/shared/services/types.service";
import { MatCardModule } from "@angular/material/card";
import { MatRadioModule } from "@angular/material/radio";

@Component({
  selector: 'app-add-subscribe',
  templateUrl: './add-subscribe.component.html',
  styleUrls: ['./add-subscribe.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [PaginationComponent,MatCardModule,MatRadioModule, NgxMatIntlTelInputComponent, MatDialogModule, MatInputModule, MatSelectModule, ReactiveFormsModule, FormsModule, DatePipe, MatProgressSpinnerModule, MatPaginatorModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatRippleModule, MatMenuModule, MatTabsModule, MatButtonToggleModule, NgApexchartsModule, NgFor, NgIf, MatTableModule, NgClass],
})
export class AddSubscribeComponent implements OnInit {
  form: FormGroup;
  currentUser:any;
  driversList:any;
  subscriptions:any;
  constructor(
    private formBuilder: FormBuilder,
    private driverService: DriversService,
    private typesService:TypesService,
    private authService:AuthService,
    private toastr:ToastrService,
    private dialog: MatDialog) { }
  ngOnInit(): void {
    this.currentUser = jwtDecode(this.authService.accessToken);

    this.form = this.formBuilder.group({
      driversIds: [null,],
      subscriptionId:[null]
    })
    this.getDrivers();
    this.getSubscriptions();
  }

  getDrivers() {
    let pag = {size: '', currentPage: ''}
    this.driverService.getActiveDrivers(this.currentUser.merchantId,pag).subscribe((res:any) => {
      this.driversList = res.data.content
    })
  }

  getSubscriptions() {
    this.typesService.getSubscriptions().subscribe((res:any) => {
      this.subscriptions = res.data;
    })
  }
  
  addSubscribe() {
    this.form.disable();
    if(this.form.value.driversIds == '' || this.form.value.driversIds == null) {
      this.form.enable();
      this.toastr.error('Выберите водитель')
    }
    else if(this.form.value.subscriptionId == '' || this.form.value.subscriptionId == null) {
      this.form.enable();
      this.toastr.error('Выберите тип подписку');
    }
    else {
      this.form.enable();
      this.driverService.addSubsription(this.form.value).subscribe((res:any) => {
        if(res && res.success) {
          this.toastr.success('Success');
          this.dialog.closeAll();
        }
      },err => {
        this.toastr.error(err.error.message);
      })
    }
  }
}