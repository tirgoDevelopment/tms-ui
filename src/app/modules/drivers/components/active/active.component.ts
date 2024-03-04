import { NgIf } from "@angular/common";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { PaginationComponent } from "app/shared/components/pagination/pagination.component";
@Component({
  selector: 'app-active-drivers',
  templateUrl: './active.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [PaginationComponent,MatTableModule,NgIf]
})
export class ActiveDriversComponent implements OnInit {

  totalPagesCount: number = 1;
  size: number = 5;
  currentPage: number = 1;

  isLoading: boolean = false;
  dataSource: any[];
  displayedColumns: string[] = ['index', 'id', 'full_name', 'transport_kind', 'status', 'subscribe', 'offers', 'location',];
  currentUser: any;

  constructor() { }
  ngOnInit(): void { }

  onPaginationEvent(event: any): void {
    this.size = event.size;
    this.currentPage = event.page;
    // this.getOrders()
  }
}