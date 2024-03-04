import { CommonModule, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
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
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [ReactiveFormsModule,MatSelectModule, CommonModule, FormsModule, DatePipe, MatProgressSpinnerModule, MatPaginatorModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatRippleModule, MatMenuModule, MatTabsModule, MatButtonToggleModule, NgApexchartsModule, NgFor, NgIf, MatTableModule, NgClass],

})
export class PaginationComponent implements OnInit {

options = [5, 10, 20, 50]

  @Input() totalPagesCount: number;
  @Input() size: number;
  @Input() currentPage: number;
  @Input() pageSizeOptions?: number[];
  @Output() paginationEvent = new EventEmitter<any>();

  pages: any = []

  constructor() { }

  ngOnInit(): void {
    this.totalPagesCount = 2
    setTimeout(() => {
      if (this.pageSizeOptions) {
        this.options = this.pageSizeOptions;
      }
    }, 0)
  }

  onSizePageClick(): void {
    this.currentPage = 1;
    this.paginationEvent.emit({ size: this.size, page: this.currentPage });
  }

  onPrevPageClick(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginationEvent.emit({ size: this.size, page: this.currentPage });
    }
  }

  onNextPageClick(): void {
    if (this.currentPage < this.totalPagesCount) {
      this.currentPage++;
      this.paginationEvent.emit({ size: this.size, page: this.currentPage });
    }
  }
}
