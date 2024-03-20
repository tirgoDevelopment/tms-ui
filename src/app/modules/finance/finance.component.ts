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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { CreateTransactionComponent } from './components/create-transaction/create-transaction.component';
import { FinanceService } from './services/finance.service';
import { jwtDecode } from 'jwt-decode';
import { SseService } from 'app/shared/services/socket.service';
import { Subscription } from 'rxjs';
import { PipesModule } from 'app/shared/pipes/pipes.module';
import { PaginationComponent } from 'app/shared/components/pagination/pagination.component';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'app/core/user/user.service';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [PaginationComponent, ReactiveFormsModule, MatDatepickerModule, MatSelectModule, PipesModule, FormsModule, MatInputModule, MatDatepickerModule, MatProgressSpinnerModule, DatePipe, MatPaginatorModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatRippleModule, MatMenuModule, MatTabsModule, MatButtonToggleModule, NgApexchartsModule, NgFor, NgIf, MatTableModule, NgClass],
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
export class FinanceComponent implements OnInit {
  totalPagesCount: number = 1;
  size: number = 5;
  currentPage: number = 1;
  showFilter: boolean = false;


  isLoading: boolean = false;
  dataSource: any;
  displayedColumns: string[] = ['index', 'id', 'status', 'type', 'amount', 'created_at', "comment"];
  currentUser: any = { activeBalance: '', frozenbalance: '' };
  balances: any;
  filter = { fromDate: null, toDate: null, transactionType: null }
  filterPath: string;
  sortColumn: string;
  sortDirection: string;
  sortOptions: { [key: string]: { column: string, direction: string } } = {
    id: { column: 'id', direction: null },
    transctionType: { column: 'transctionType', direction: null },
    created_at: { column: 'created_at', direction: null },
    amount: { column: 'amount', direction: null },
    comment: { column: 'comment', direction: null },
  };
  private sseSubscription: Subscription;

  constructor(
    private financeService: FinanceService,
    public authService: AuthService,
    private dialog: MatDialog,
    private sseService: SseService,
    private ref: ChangeDetectorRef,
    private toastr: ToastrService
  ) { }
  ngOnChanges() {
    this.ref.detectChanges();
  }
  ngOnInit(): void {
    this.currentUser = jwtDecode(localStorage.getItem('tmc'));
    // this.sseSubscription = this.sseService.getUpdates().subscribe(
    //   (data) => {
    //     if (data.type == 'transactionVerified' || data.type == 'transactionRejected') {
    //       this.getAllTransaction();
    //       this.getBalance();
    //     }
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );
    this.getAllTransaction();
    this.getBalance();
  }
  getBalance() {
    this.financeService.getBalance(this.currentUser.merchantId).subscribe((res: any) => {
      if (res) {
        this.balances = res.data;
      }
    })
  }
  getAllTransaction(filter?: any, sortBy?: string, sortType?: string) {
    let pagination = { size: this.size, currentPage: this.currentPage };
    this.isLoading = true;
    let request;

    if (sortBy !== null && sortType !== null) {
      if (filter !== null) {
        request = this.financeService.getAll(this.currentUser.userId, pagination, filter, sortBy, sortType);
      } else {
        request = this.financeService.getAll(this.currentUser.userId, pagination, null, sortBy, sortType);
      }
    } else {
      request = this.financeService.getAll(this.currentUser.userId, pagination, filter);
    }

    request.subscribe((res: any) => {
      if (res && res.success) {
        setTimeout(() => {
          this.isLoading = false;
        }, 500)
        this.dataSource = res.data.content;
        this.totalPagesCount = res.data.totalPAgesCount;
      } else {
        setTimeout(() => {
          this.isLoading = false;
        }, 500)
        this.dataSource = [];
      }
    }, error => {
      setTimeout(() => {
        this.isLoading = false;
        this.toastr.error(error.error.message);
      }, 500)
    });
  }
  createModal(type) {
    const dialogRef = this.dialog.open(CreateTransactionComponent, {
      autoFocus: false,
      disableClose: true,
      data: { type }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllTransaction();
    });
  }
  onPaginationEvent(event: any): void {
    this.size = event.size;
    this.currentPage = event.page;
    this.getAllTransaction();
  }
  generateFilterPath(filter: any) {
    let url = '';
    for (const key in filter) {
      if (filter[key] !== null && filter[key] !== undefined) {
        url += `&${key}=${encodeURIComponent(filter[key])}`;
      }
    }
    this.getAllTransaction()
    return url.length > 0 ? url.substr(1) : url;
  }
  applyFilter() {
    if (this.filter) {
      this.filterPath = this.generateFilterPath(this.filter);
      this.getAllTransaction(this.filterPath, this.sortColumn, this.sortDirection);
    }
  }
  resetSearch() {
      this.filter = { fromDate: null, toDate: null, transactionType: null };
      this.applyFilter();
      // this.getAllTransaction(this.filterPath, this.sortColumn, this.sortDirection);
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
    this.getAllTransaction(this.filterPath, this.sortColumn, this.sortDirection);
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