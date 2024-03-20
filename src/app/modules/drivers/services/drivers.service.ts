import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { env } from "environments/environment";
import { Observable, map } from "rxjs";

@Injectable({ providedIn: 'root' })

export class DriversService {
  constructor(
    private http: HttpClient
  ) { }

  getActiveDrivers(id,pag,filter?, sortBy?, sortType?) {
    let url = `${env.apiUsers}/users/drivers/merchant-active-drivers?merchantId=${id}&pageSize=${pag.size}&pageIndex=${pag.currentPage}`;
    if (filter) {
      url += `&${filter}`;
    }
    if (sortBy && sortType) {
      url += `&sortBy=${sortBy}&sortType=${sortType}`;
    }
    return this.http.get(url);
  }
  getArchivedDrivers(id,pag,filter?, sortBy?, sortType?) {
    let url = `${env.apiUsers}/users/drivers/merchant-archive-drivers?merchantId=${id}&pageSize=${pag.size}&pageIndex=${pag.currentPage}`;
    if (filter) {
      url += `&${filter}`;
    }
    if (sortBy && sortType) {
      url += `&sortBy=${sortBy}&sortType=${sortType}`;
    }
    return this.http.get(url);
  }
  getDriverById(data) {
    return this.http.get(env.apiUsers +'/users/drivers/driver-by?id='+data.id+'&userId='+data.userId)
  }
  createDriver(data) {
    return this.http.post(env.apiUsers + '/users/drivers/register',data);
  }
  createTransport(data) {
    return this.http.post(env.apiUsers + '/users/driver/transport',data);
  }
  getFile(fileName: string): Observable<string> {
    return this.http.get(env.apiReferences+ `/references/files/driver/${fileName}`, { responseType: 'blob' })
      .pipe(
        map((blob: Blob) => {
          return URL.createObjectURL(blob);
        })
      );
  }

}