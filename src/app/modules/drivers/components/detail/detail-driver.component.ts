import { CommonModule, DatePipe, NgClass, NgFor, NgIf } from "@angular/common";
import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { MatCardModule } from "@angular/material/card";
import { PipesModule } from "app/shared/pipes/pipes.module";
import { CreateTransportComponent } from "../create-transport/create-transport.component";
import { TransportDetailComponent } from "../detail-transport/detail-transport.component";
import { DriversService } from "../../services/drivers.service";
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-driver-detail',
  templateUrl: './detail-driver.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [PaginationComponent, MatDialogModule, MatCardModule, MatInputModule, MatSelectModule, ReactiveFormsModule, FormsModule, PipesModule, MatProgressSpinnerModule, MatPaginatorModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatRippleModule, MatMenuModule, MatTabsModule, MatButtonToggleModule, NgApexchartsModule, NgFor, NgIf, MatTableModule, NgClass],
})
export class DetailComponent implements OnInit {
  currentUser: any;
  data:any
  constructor(
    @Inject(MAT_DIALOG_DATA) public driver: any,
    private dialogRef: MatDialogRef<DetailComponent>,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private driversService: DriversService
  ) { }

  ngOnInit(): void {
    this.currentUser = jwtDecode(localStorage.getItem('tmc'));
    this.getDriver();
  }
  getDriver() {
    let data = { id: this.driver.id, userId: this.currentUser.userId}
    this.driversService.getDriverById(data).subscribe((res:any) => {
      if(res && res.success) {
        this.data = res.data;
      }
    })
  }
  addTransport() {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(CreateTransportComponent, {
      height: '100vh',
      autoFocus: false,
      disableClose: true,
      data: this.data,
      position: {
        top: '0',
        right: '0',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.getOrders();
    });
  }
  detailTransport() {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(TransportDetailComponent, {
      height: '100vh',
      autoFocus: false,
      disableClose: true,
      data: this.data,
      position: {
        top: '0',
        right: '0',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.getOrders();
    });
  }

}