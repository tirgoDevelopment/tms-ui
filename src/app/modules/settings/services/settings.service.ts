import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { env } from "environments/environment";

@Injectable({ providedIn: 'root' })

export class SettingService {
  constructor(
    private http: HttpClient
  ) { }

  changePassword(data) {
    return this.http.patch(env.apiUsers + '/users/driver-merchant-user/password?userId='+data.userId, data)
  }
}