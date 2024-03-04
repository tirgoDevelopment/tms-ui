import { NgIf } from "@angular/common";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { PaginationComponent } from "app/shared/components/pagination/pagination.component";
@Component({
  selector: 'app-active-orders',
  templateUrl: './active.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [PaginationComponent,MatTableModule,NgIf]
})
export class ActiveOrdersComponent implements OnInit {

  totalPagesCount: number;
  size: number = 5;
  currentPage: number = 1;

  isLoading: boolean = false;
  dataSource: any[];
  displayedColumns: string[] = ['index', 'id', 'sendLocation', 'cargoDeliveryLocation', 'date_send', 'secure_transaction', 'driver','client','location'];
  currentUser: any;

  constructor() { }
  ngOnInit(): void { }

  onPaginationEvent(event: any): void {
    this.size = event.size;
    this.currentPage = event.page;
    // this.getOrders()
  }
}