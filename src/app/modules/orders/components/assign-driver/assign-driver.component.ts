import { NgIf, NgFor, NgClass } from "@angular/common";
import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { FuseDrawerComponent } from "@fuse/components/drawer";
import { TranslocoModule } from "@ngneat/transloco";
import { AngularYandexMapsModule } from "angular8-yandex-maps";
import { AuthService } from "app/core/auth/auth.service";
import { PipesModule } from "app/shared/pipes/pipes.module";
import { TypesService } from "app/shared/services/types.service";
import { jwtDecode } from "jwt-decode";
import { ToastrService } from "ngx-toastr";
import { OrdersService } from "../../services/orders.service";

@Component({
  selector: 'app-assign-driver',
  templateUrl: './assign-driver.component.html',
  styleUrls: ['./assign-driver.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  standalone: true,
  imports: [MatIconModule, MatTabsModule, NgIf, PipesModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, AngularYandexMapsModule, MatDialogModule, TranslocoModule, FuseDrawerComponent, MatButtonModule, NgFor, NgClass, MatTooltipModule],
})
export class AssignDriverComponent implements OnInit {
  isLoading: boolean = false;
  form: FormGroup;
  currencies: any;
  currentUser: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private ordersService: OrdersService,
    private typesService: TypesService,
    private dialog: MatDialog,
  ) { }
  ngOnInit(): void {
    this.currentUser = jwtDecode(localStorage.getItem('tmc'));
    this.form = this.formBuilder.group({
      orderId: [this.data.id],
      driverId: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      curencyId: [null, [Validators.required]]
    })
    this.typesService.getCurrencies().subscribe((res: any) => {
      if (res.success) {
        this.currencies = res.data;
        this.form.patchValue({ curencyId: this.currencies[0].id });
      }
    })
  }

  submit() {
    this.form.disable();
    this.ordersService.assignDriver(this.form.value).subscribe((res: any) => {
      if (res.success) {
        this.form.enable();
        this.toastr.success('Success')
        this.dialog.closeAll();
      }
    }, err => {
      this.form.enable();
      if (err.error.message == 'dataNotFound') {
        this.toastr.error('Драйвер не найден')
      }
      if (err.error.message == 'alreadyOfferedToThisOrder') {
        this.toastr.error('Уже предлагался к этому заказу')
      }
      else {
        this.toastr.error(err.error.message)
      }
    })
  }
}  