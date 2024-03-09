import { DatePipe, NgClass, NgFor, NgIf } from "@angular/common";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { PaginationComponent } from "app/shared/components/pagination/pagination.component";
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatTabsModule } from "@angular/material/tabs";
import { MatMenuModule } from "@angular/material/menu";
import { MatRippleModule } from "@angular/material/core";
import { NgApexchartsModule } from "ng-apexcharts";
import { MatDialog } from "@angular/material/dialog";
import { DetailComponent } from "../detail/detail.component";
import { ConfirmModalComponent } from "app/shared/components/confirm-modal/confirm.component";
import { DriverEditComponent } from "../edit/edit.component";
import { catchError, map, of, switchMap } from "rxjs";
import { DriversService } from "../../services/drivers.service";
import { jwtDecode } from "jwt-decode";
import { AuthService } from "app/core/auth/auth.service";
import { AuthVerifyPhoneComponent } from "../verify-phone/verify-phone.component";
import { PipesModule } from "app/shared/pipes/pipes.module";

@Component({
  selector: 'app-active-drivers',
  templateUrl: './active.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [PaginationComponent,PipesModule, MatInputModule, MatSelectModule, ReactiveFormsModule, FormsModule, DatePipe, MatProgressSpinnerModule, MatPaginatorModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatRippleModule, MatMenuModule, MatTabsModule, MatButtonToggleModule, NgApexchartsModule, NgFor, NgIf, MatTableModule, NgClass],
  animations: [
    trigger('showHideFilter', [
      state('show', style({
        height: '*',
        opacity: 1,
        visibility: 'visible'
      })),
      state('hide', style({
        height: '0',
        opacity: 0,
        visibility: 'hidden'
      })),
      transition('show <=> hide', animate('300ms ease-in-out'))
    ])
  ]
})
export class ActiveDriversComponent implements OnInit {

  showFilter: boolean = false;
  filter = { driverId: null,name:null,phoneNumber:null,transportKind:null,subscribe:null,status:null }
  totalPagesCount: number = 1;
  size: number = 5;
  currentPage: number = 1;

  isLoading: boolean = false;
  dataSource: any[];
  displayedColumns: string[] = ['index', 'id', 'full_name', 'transport_kind', 'status', 'subscribe', 'offers', 'location', 'action'];
  currentUser: any;

  filterPath: string;
  sortColumn: string;
  sortDirection: string;
  sortOptions: { [key: string]: { column: string, direction: string } } = {
    id: { column: 'id', direction: null },
    full_name: { column: 'full_name', direction: null },
    transport_kind: { column: 'transport_kind', direction: null },
    status: { column: 'status', direction: null },
    subscribe: { column: 'subscribe', direction: null },
    offers: { column: 'offers', direction: null },
  };

  constructor(
    private dialog: MatDialog,
    private driverService: DriversService,
    private authService: AuthService,
  ) { }
  ngOnInit(): void {
    this.currentUser = jwtDecode(this.authService.accessToken);
    this.getData();
  }

  getData(filter?: any, sortBy?: string, sortType?: string) {
    this.isLoading = true;
    this.driverService.getActiveDrivers(this.currentUser.merchantId).subscribe((res:any) => {
      if(res.success) {
        this.isLoading = false;
        this.dataSource = res.data;
      }
      else {
        this.isLoading = false;
        this.dataSource = [];
      }
    },error => {
      this.isLoading = false;
      console.log(error);
    })
  }
  create() {
    const dialogRef = this.dialog.open(AuthVerifyPhoneComponent, {
      autoFocus: false,
      disableClose: true,
    });
  }
  showDetails(row) {
    const dialogRef = this.dialog.open(DetailComponent, {
      height: '100vh',
      autoFocus: false,
      disableClose: true,
      data: row,
      position: {
        top: '0',
        right: '0',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.getOrders();
    });
  }
  showEdit(row) {
    const dialogRef = this.dialog.open(DriverEditComponent, {
      height: '100vh',
      autoFocus: false,
      disableClose: true,
      data: row,
      position: {
        top: '0',
        right: '0',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.getOrders();
    });
  }
  confirmModal(): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      autoFocus: false,
      disableClose: true,
    });
    dialogRef.componentInstance.confirmResponse.subscribe((result: boolean) => {
      if (result) {
        // logic confirm
      }
    });
  }
  onPaginationEvent(event: any): void {
    this.size = event.size;
    this.currentPage = event.page;
    this.getData()
  }
  generateFilterPath(filter: any) {
    let url = '';
    for (const key in filter) {
      if (filter[key] !== null && filter[key] !== undefined) {
        url += `&${key}=${encodeURIComponent(filter[key])}`;
      }
    }
    this.getData()
    return url.length > 0 ? url.substr(1) : url;
  }
  applyFilter() {
    if (this.filter) {
      this.filterPath = this.generateFilterPath(this.filter);
      this.getData(this.filterPath, this.sortColumn, this.sortDirection);
    }
  }
  resetSearch() {
    if (this.filter) {
      this.filter = { driverId: null,name:null,phoneNumber:null,transportKind:null,subscribe:null,status:null }
      this.getData();
    }
  }
  sortData(filter: string): void {
    const currentSortOption = this.sortOptions[filter];
    if (currentSortOption.direction === null) {
      currentSortOption.direction = 'asc';
    } else if (currentSortOption.direction === 'asc') {
      currentSortOption.direction = 'desc';
    } else {
      currentSortOption.direction = null;
    }
    this.sortColumn = filter;
    this.sortDirection = currentSortOption.direction;
    this.getData(this.filterPath, this.sortColumn, this.sortDirection);
  }
  getSortIcon(filter: string): string {
    const currentSortOption = this.sortOptions[filter];
    if (currentSortOption.column === this.sortColumn && currentSortOption.direction === 'asc') {
      return 'arrow_upward';
    } else if (currentSortOption.column === this.sortColumn && currentSortOption.direction === 'desc') {
      return 'arrow_downward';
    }
    return 'unfold_more';
  }
}