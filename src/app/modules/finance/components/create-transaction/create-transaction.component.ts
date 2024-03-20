import { NgFor, NgIf } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent } from '@fuse/components/alert';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ToastrService } from 'ngx-toastr';
import { FinanceService } from '../../services/finance.service';
import { jwtDecode } from 'jwt-decode';
import { TypesService } from 'app/shared/services/types.service';

@Component({
  selector: 'create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, MatDatepickerModule, MatSelectModule, MatAutocompleteModule, MatDialogModule, FuseAlertComponent, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule, NgxMatIntlTelInputComponent],
})
export class CreateTransactionComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  findList: any[] | undefined = [];
  viewText = false;
  currentStep = 1;
  currentUser;
  currencies: any;
  transactionType: string = '';
  constructor(
    private dialogRef: MatDialogRef<CreateTransactionComponent>,
    private formBuilder: FormBuilder,
    private financeService: FinanceService,
    public typesService: TypesService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {
    this.currentUser = jwtDecode(localStorage.getItem('tmc'));
    this.transactionType = this.data.type;
    this.form = this.formBuilder.group({
      amount: [''],
      comment: [''],
      currencyId: [''],
      transactionType: [''],
      merchantId: [''],
    })
    this.typesService.getCurrencies().subscribe((res:any) => {
      this.currencies = res.data;
      this.form.patchValue({
        transactionType: this.transactionType,
        currencyId: this.currencies[0].id,
        merchantId: this.currentUser.merchantId
      })
    })
    
  }

  create() {
    this.form.disable();
    this.financeService.create(this.form.value).subscribe((res: any) => {
      if (res && res.success) {
        this.form.enable();
        this.toastr.success('Запрос отправлен');
        this.closeModal();
      }
    }, err => {
      this.form.enable();
      this.toastr.error(err.error.message);
    })
  }

  closeModal() {
    this.dialogRef.close();
  }

}