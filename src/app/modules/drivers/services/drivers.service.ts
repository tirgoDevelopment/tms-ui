import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { env } from "environments/environment";

@Injectable({ providedIn: 'root' })

export class DriversService {
  constructor(
    private http: HttpClient
  ) { }

  getActiveDrivers(id,pag,filter?, sortBy?, sortType?) {
    return this.http.get(env.apiUsers + '/users/drivers/all-drivers');
    // return this.http.get(env.apiUsers + '/users/drivers/by-driver-merchant?id='+id);
    // let url = `${env.apiUsers}/users/drivers/by-driver-merchant?id=${id}&pageSize=${pag.size}&pageIndex=${pag.currentPage}`;
    // if (filter) {
    //   url += `&${filter}`;
    // }
    // if (sortBy && sortType) {
    //   url += `&sortBy=${sortBy}&sortType=${sortType}`;
    // }
    // return this.http.get(url);
  }
  getArchivedDrivers(id,pag,filter?, sortBy?, sortType?) {
    return this.http.get(env.apiUsers + '/users/drivers/merchant-archive-drivers?merchantId='+id);
    // let url = `${env.apiUsers}/users/drivers/merchant-archive-drivers?merchantId=${id}&pageSize=${pag.size}&pageIndex=${pag.currentPage}`;
    // if (filter) {
    //   url += `&${filter}`;
    // }
    // if (sortBy && sortType) {
    //   url += `&sortBy=${sortBy}&sortType=${sortType}`;
    // }
    // return this.http.get(url);
  }
  createDriver(data) {
    return this.http.post(env.apiUsers + '/users/drivers/register',data);
  }

}