import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatPaginatorModule } from '@angular/material/paginator';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'app/core/auth/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { PaginationComponent } from 'app/shared/components/pagination/pagination.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { TypesService } from 'app/shared/services/types.service';
import { OrdersService } from '../../services/orders.service';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { SseService } from 'app/shared/services/socket.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-active-orders',
  templateUrl: './active.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [PaginationComponent, MatTooltipModule,MatDatepickerModule, MatInputModule, MatSelectModule, ReactiveFormsModule, FormsModule, DatePipe, MatProgressSpinnerModule, MatPaginatorModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatRippleModule, MatMenuModule, MatTabsModule, MatButtonToggleModule, NgApexchartsModule, NgFor, NgIf, MatTableModule, NgClass],
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
export class ActiveOrdersComponent implements OnInit {
  transportTypes: any;
  transportKinds: any;
  totalPagesCount: number = 1;
  size: number = 5;
  currentPage: number = 1;
  showFilter: boolean = false;
  isLoading: boolean = false;
  dataSource: any[];
  displayedColumns: string[] = ['index', 'id', 'loadingLocation', 'deliveryLocation', 'sendDate', 'isSafeTransaction', 'transport_type', 'offeredPrice',];
  currentUser: any;
  filter = { id: null, loadingLocation: null, deliveryLocation: null, createdAt:null,transportKindId:null,transportTypeId:null,sendDate: null, secure_transaction: null, transport_type: null, offeredPrice: null }
  private sseSubscription: Subscription;
  filterPath: string;
  sortColumn: string;
  sortDirection: string;
  sortOptions: { [key: string]: { column: string, direction: string } } = {
    id: { column: 'id', direction: null },
    loadingLocation: { column: 'loadingLocation', direction: null },
    deliveryLocation: { column: 'deliveryLocation', direction: null },
    cargoStatus: { column: 'cargoStatus', direction: null },
    sendDate: { column: 'sendDate', direction: null },
    offeredPrice: { column: 'offeredPrice', direction: null },
    isSafeTransaction: { column: 'isSafeTransaction', direction: null },
  };

  constructor(
    private orderService: OrdersService,
    private typesService: TypesService,
    private authService: AuthService,
    private dialog: MatDialog,
    private sseService: SseService
  ) { }
  ngOnInit(): void {
    this.currentUser = jwtDecode(this.authService.accessToken);
    this.getOrders();
    this.sseSubscription = this.sseService.getUpdates().subscribe(
      (data) => {
        if (data.type == 'clientAcceptOffer' || data.type == 'clientOffer') {
          this.getOrders();
        }
      },
      (error) => {
      }
    );
  }
  getOrders(filter?: any, sortBy?: string, sortType?: string) {
    const pagination = { size: this.size, currentPage: this.currentPage };
    this.isLoading = true;

    const request$ = of({ filter, sortBy, sortType }).pipe(
      switchMap(({ filter, sortBy, sortType }) => {
        const requestParams = { filter, sortBy, sortType };
        return this.orderService.getActiveOrders(this.currentUser.merchantId, pagination, filter, sortBy, sortType).pipe(
          map((res: any) => ({
            success: res.success, data: res.data.content, totalPagesCount: res.data.totalPagesCount
          })),
          catchError(() => of({ success: false, data: [], totalPagesCount: 0 }))
        );
      })
    );

    request$.subscribe({
      next: ({ success, data, totalPagesCount }) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 500)
        if (success) {
          if (data.length > 0) {
            this.dataSource = data;
            this.totalPagesCount = totalPagesCount;
          }
          else if (this.dataSource.length === 0) {
            this.dataSource = [];
          }
        } else {
          this.dataSource = [];
        }
      },
      error: () => {
        this.isLoading = false;
        this.dataSource = [];
      }
    });
  }
  getTypes() {
    forkJoin({
      transportKinds: this.typesService.getTransportKinds(),
      transportTypes: this.typesService.getTransportTypes()
    }).subscribe((res: any) => {
      if (res.transportKinds.success) {
        this.transportKinds = res.transportKinds.data;
      }
      if (res.transportTypes.success) {
        this.transportTypes = res.transportTypes.data;
      }
    });
  }
  showOrderDetails(order) {
    const dialogRef = this.dialog.open(OrderDetailComponent, {
      height: '100vh',
      autoFocus: false,
      disableClose: true,
      data: order,
      position: {
        top: '0',
        right: '0',
      },
      maxHeight: '100%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getOrders();
    });
  }
  onPaginationEvent(event: any): void {
    this.size = event.size;
    this.currentPage = event.page;
    this.getOrders()
  }
  generateFilterPath(filter: any) {
    let url = '';
    for (const key in filter) {
      if (filter[key] !== null && filter[key] !== undefined) {
        url += `&${key}=${encodeURIComponent(filter[key])}`;
      }
    }
    return url.length > 0 ? url.substr(1) : url;
  }
  applyFilter() {
    if (this.filter) {
      this.filterPath = this.generateFilterPath(this.filter);
      this.getOrders(this.filterPath, this.sortColumn, this.sortDirection);
    }
  }
  resetSearch() {
    if (this.filter) {
      this.filter = { id: null, loadingLocation: null, deliveryLocation: null, createdAt:null,transportKindId:null,transportTypeId:null,sendDate: null, secure_transaction: null, transport_type: null, offeredPrice: null }
      this.getOrders();
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
    this.getOrders(this.filterPath, this.sortColumn, this.sortDirection);
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