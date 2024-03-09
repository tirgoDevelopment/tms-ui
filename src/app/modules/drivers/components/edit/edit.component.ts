import { DatePipe, NgClass, NgFor, NgIf } from "@angular/common";
import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
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
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { NgxMatIntlTelInputComponent } from "ngx-mat-intl-tel-input";

@Component({
  selector: 'app-driver-edit',
  templateUrl: './edit.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [PaginationComponent, NgxMatIntlTelInputComponent,MatDialogModule, MatInputModule, MatSelectModule, ReactiveFormsModule, FormsModule, DatePipe, MatProgressSpinnerModule, MatPaginatorModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatRippleModule, MatMenuModule, MatTabsModule, MatButtonToggleModule, NgApexchartsModule, NgFor, NgIf, MatTableModule, NgClass],

})
export class DriverEditComponent implements OnInit {
  form: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: [this.data.firstName,Validators.required],
      lastName: [this.data.lastName,Validators.required],
      phoneNumber: [this.data.phoneNumbers[0].phoneNumber,Validators.required],
      password: [null,Validators.required]
    })
   }
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  
}