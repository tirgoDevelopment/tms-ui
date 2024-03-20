import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
import { CreateTransportComponent } from '../create-transport/create-transport.component';

@Component({
  selector: 'app-confirm-add-transport',
  templateUrl: './confirm-add-transport.component.html',
  styleUrls: ['./confirm-add-transport.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  standalone: true,
  imports: [MatIconModule, MatTabsModule, NgIf, PipesModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, AngularYandexMapsModule, MatDialogModule, TranslocoModule, FuseDrawerComponent, MatButtonModule, NgFor, NgClass, MatTooltipModule],
})
export class ConfirmAddTransportComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ConfirmAddTransportComponent>,
  ) { }
  ngOnInit(): void {
    console.log(this.data);
  }

  confirm(choice: boolean): void {
    if (choice) {
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
    else {
      this.dialog.closeAll();
    }
  }
}