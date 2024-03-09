import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { jwtDecode } from 'jwt-decode';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { env } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  API_URL = 'https://merchant.tirgo.io/api/v1'
  public _authenticated: boolean;
  private _user: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }
  set accessToken(token: string) {
    localStorage.setItem('tmc', token);
  }
  get accessToken(): string {
    return localStorage.getItem('tmc') ?? '';
  }
  merchantCreate(data) {
    return this.http.post(env.apiUsers + '/users/driver-merchants/register', data);
  }
  merchantComplete(data) {
    return this.http.post(env.apiUsers + '/users/driver-merchants/register/complete', data);
  }
  merchantUpdate(data) {
    return this.http.post(env.apiUsers + '/users/driver-merchants/register/step', data);
  }
  verifyPhone(data) {
    return this.http.post(env.apiUsers + '/users/driver-merchant-user/phone-verify', data);
  }
  verifyCode(data) {
    return this.http.post(env.apiUsers + '/users/driver-merchant-user/verify-code', data);
  }
  getMerchantById(id) {
    return this.http.get(env.apiUsers + '/users/driver-merchants/driver-merchant-by?id=' + id);
  }
  resetPassword(data): Observable<any> {
    return this.http.patch(env.apiUsers + '/users/driver-merchant-user/reset-password', data);
  }
  signIn(credentials: { username: string; password: string,userType: string }) {
    credentials.userType = 'driver_merchant_user';
    return this.http.post(env.apiUsers + '/users/login', credentials);
  }
  sendEmail(email) {
    return this.http.post(env.apiUsers + '/users/driver-merchant-user/send-code', email);
  }
  signOut(): Observable<any> {
    localStorage.removeItem('tmc');
    this._authenticated = false;
    return of(true);
  }
  check(): Observable<boolean> {
    if (this.accessToken) {
      return of(true);
    }
    if (this._authenticated) {
      return of(true);
    }
    if (!this.accessToken) {
      return of(false);
    }
  }
  redirect(curMerch) {
    if(curMerch.completed && curMerch.verified) {
      this.router.navigate(['/orders'])
    }
    if (curMerch.completed && !curMerch.verified) {
      this.router.navigate(['/auth/sign-up'])
    }
    if (!curMerch.completed && curMerch.email) {
      this.router.navigate(['/register/step2'])
    }
    if (curMerch.completed && (!curMerch.rejected && !curMerch.verified)) {
      this.router.navigate(['/register/step3'])
    }
  }
}
