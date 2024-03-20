import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { DriversService } from 'app/modules/drivers/services/drivers.service';

@Pipe({
  name: 'fileFetch'
})
export class FileFetchPipe implements PipeTransform {
  constructor(private driverService: DriversService) { }

  transform(fileName: string): Observable<string> {
    return this.driverService.getFile(fileName)
  }
}
