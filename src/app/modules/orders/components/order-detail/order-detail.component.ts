import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseDrawerComponent } from '@fuse/components/drawer';
import { TranslocoModule } from '@ngneat/transloco';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';
import { PipesModule } from 'app/shared/pipes/pipes.module';
import { SseService } from 'app/shared/services/socket.service';
import { Subscription } from 'rxjs';
import { OrdersService } from '../../services/orders.service';
import { ToastrService } from 'ngx-toastr';
import { TypesService } from 'app/shared/services/types.service';
import { AssignDriverComponent } from '../assign-driver/assign-driver.component';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  standalone: true,
  imports: [MatIconModule, MatTabsModule, NgIf, PipesModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, AngularYandexMapsModule, MatDialogModule, TranslocoModule, FuseDrawerComponent, MatButtonModule, NgFor, NgClass, MatTooltipModule],
})
export class OrderDetailComponent implements OnInit {
  private sseSubscription: Subscription;
  currencies: any;
  editing: boolean = false;

  originalAmount: number;
  editedAmount: number;
  originalCurrencyId: string;
  editedCurrencyId: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sseService: SseService,
    private orderService: OrdersService,
    private typesService: TypesService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {
    this.typesService.getCurrencies().subscribe((res: any) => {
      if (res.success) {
        this.currencies = res.data;
      }
    })
  }
  getOrderById() {
    this.orderService.getOrderById(this.data.id).subscribe((res: any) => {
      if (res.success) {
        this.data = res.data;
        this.updateDriverOffers();
      }
    })
  }
  assignDriver() {
    const dialogRef = this.dialog.open(AssignDriverComponent, {
      autoFocus: false,
      disableClose: true,
      data: this.data
    });    
  }
  editOffer(offer) {
    this.editing = true;

    this.originalAmount = offer.amount;
    this.originalCurrencyId = offer.currency.id;

    this.editedAmount = offer.amount;
    this.editedCurrencyId = offer.currency.id;

  }
  saveEditedOffer(offer) {
    if (this.originalAmount == this.editedAmount) {
      this.toastr.warning('Предложение о сумме не редактировалось')
    }
    else {
      let data = {
        orderId: this.data.id,
        driverId: offer.driver.id,
        amount: this.editedAmount,
        curencyId: this.editedCurrencyId
      }
      this.orderService.contrOffer(data).subscribe((res: any) => {
        if (res.success) {
          this.toastr.success('Updated');
          this.dialog.closeAll();
        }
      }, error => {
        this.toastr.error(error.error.message);
      })
    }
  }
  cancelEditing() {
    this.editedAmount = this.originalAmount;
    this.editedCurrencyId = this.originalCurrencyId;

    this.editing = false;
  }
  updateDriverOffers() {
    if (this.data.driverOffers && Array.isArray(this.data.driverOffers)) {
      this.data.driverOffers = this.data.driverOffers.filter(offer => offer.rejected == false);
    }
  }
}
