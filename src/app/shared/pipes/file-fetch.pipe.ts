import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { DriversService } from 'app/modules/drivers/services/drivers.service';

@Pipe({
  name: 'fileFetch'
})
export class FileFetchPipe implements PipeTransform {
  constructor(private driverService: DriversService) { }

  transform(fileName: string): Observable<string> {
    return new Observable<string>((observer) => {
      this.driverService.getFile(fileName).subscribe(
        (url: string) => {
          observer.next(url);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
}
