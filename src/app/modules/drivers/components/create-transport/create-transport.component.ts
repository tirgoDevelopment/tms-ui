import { CommonModule, DatePipe, NgClass, NgFor, NgIf } from "@angular/common";
import { ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
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
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { MatCardModule } from "@angular/material/card";
import { PipesModule } from "app/shared/pipes/pipes.module";
import { TypesService } from "app/shared/services/types.service";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { DriversService } from "../../services/drivers.service";

@Component({
  selector: 'app-create-transport',
  templateUrl: './create-transport.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [PaginationComponent, MatDialogModule, MatCardModule,MatCheckboxModule, MatInputModule, MatSelectModule, ReactiveFormsModule, FormsModule, PipesModule, MatProgressSpinnerModule, MatPaginatorModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatRippleModule, MatMenuModule, MatTabsModule, MatButtonToggleModule, NgApexchartsModule, NgFor, NgIf, MatTableModule, NgClass],
})
export class CreateTransportComponent implements OnInit {
  formData = new FormData();
  loadCapacityOptions: number[] = [17, 18, 19, 20, 21, 22, 23, 24, 25];
  form: FormGroup;
  transportTypes:any;
  transportKinds:any;
  loadingMethod:any;

  techPassportFrontFilePath:string;
  techPassportBackFilePath:string;
  goodsTransportationLicenseCardFilePath:string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private typesService:TypesService,
    private driverService:DriversService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.typesService.getTransportKinds().subscribe((res:any) => {
      if(res && res.success) {
        this.transportKinds = res.data
      }
    })
    this.typesService.getTransportTypes().subscribe((res:any) => {
      if(res && res.success) {
        this.transportTypes = res.data
      }
    })
    this.typesService.getCargoLoadingMethod().subscribe((res:any) => {
      if(res && res.success) {
        this.loadingMethod = res.data
      }
    })
    this.form = this.formBuilder.group({
      driverId: [this.data.id],
      name: [null, [Validators.required]],
      stateNumber: [null],
      transportKindIds: [null],
      transportTypeIds: [null],
      loadingMethodIds: [null],
      cubicCapacity:[null], 
      loadCapacity:[null], 
      isAdr: [false],
      techPassportFrontFilePath: [null],
      techPassportBackFilePath: [null],
      goodsTransportationLicenseCardFilePath:[null]
    })
  }
  addTransport() {
    this.form.disable();
    if(this.form.value.name == null || this.form.value.name == '') {
      this.form.enable();
      this.toastr.error('Введите Марка Транспорта')
    }
    else if(this.form.value.techPassportFrontFilePath == null || this.form.value.techPassportFrontFilePath == '') {
      this.form.enable();
      this.toastr.error('Введите Тех. паспорт (спереди)')
    }
    else if(this.form.value.techPassportBackFilePath == null || this.form.value.techPassportBackFilePath == '') {
      this.form.enable();
      this.toastr.error('Введите Тех. паспорт (сзади)')
    }
    else if(this.form.value.techPassportFrontFilePath == null || this.form.value.techPassportFrontFilePath == '') {
      this.form.enable();
      this.toastr.error('Введите Лицензия на грузоперевозку')
    }
    else {
      this.formData.delete('driverId')
      this.formData.delete('name')
      this.formData.delete('stateNumber')
      this.formData.delete('cubicCapacity')
      this.formData.delete('transportKindIds')
      this.formData.delete('transportTypeIds')
      this.formData.delete('loadingMethodIds')
      this.formData.delete('isAdr')
      this.formData.delete('loadCapacity')

      this.formData.append('driverId', this.form.value.driverId)
      this.formData.append('name', this.form.value.name)
      this.formData.append('stateNumber', this.form.value.stateNumber)
      this.formData.append('cubicCapacity', this.form.value.cubicCapacity)
      this.formData.append('transportKindIds', JSON.stringify(this.form.value.transportKindIds))
      this.formData.append('transportTypeIds', JSON.stringify(this.form.value.transportTypeIds))
      this.formData.append('loadingMethodIds', JSON.stringify(this.form.value.loadingMethodIds))
      this.formData.append('isAdr', this.form.value.isAdr)
      this.formData.append('loadCapacity', this.form.value.loadCapacity)
      this.driverService.createTransport(this.formData).subscribe((res:any) => {
        if(res && res.success) {
          this.form.enable();
          this.dialog.closeAll();
          this.toastr.success('Успешно добавлена')
        }
      },err => {
        this.form.enable();
        this.toastr.error(err.error.message)
      })
    }
    
  }
  selectFile(event: any, name: string) {
    const file: File = event.target.files[0];
    if (file) {
      this.formData.append(name, file, new Date().getTime().toString() + '.jpg');
      const reader = new FileReader();
      reader.onload = () => {
        this[name] = reader.result;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }
}