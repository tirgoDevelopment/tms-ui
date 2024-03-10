import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { env } from "environments/environment";

@Injectable({ providedIn: 'root' })

export class DriversService {
  constructor(
    private http: HttpClient
  ) { }

  getActiveDrivers(id) {
    return this.http.get(env.apiUsers + '/users/drivers/by-driver-merchant?id='+id);
  }
  getArchivedDrivers(id) {
    return this.http.get(env.apiUsers + '/users/drivers/merchant-archive-drivers?id='+id);
  }
  createDriver(data) {
    return this.http.post(env.apiUsers + '/users/drivers/register',data);
  }

}