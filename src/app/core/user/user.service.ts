import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/core/user/user.types';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    API_URL = 'https://merchant.tirgo.io/api/v2';
    private _user = new BehaviorSubject<any>(null);
    private _merchant = new BehaviorSubject<any>(null);

    /**
     * Constructor
     */
    constructor(private http: HttpClient) {
    }

    getUser() {
     let user = jwtDecode(localStorage.getItem('tmc'));
    }
    set user(value) {
        this._user.next(value.data);
    }

    get user$(): Observable<any> {
        return this._user.asObservable();
    }

    getUserValue(): any {
        return this._user.getValue();
    }

    set merchant(value) {
        this._merchant.next(value.data);
    }

    get merchant$(): Observable<any> {
        return this._merchant.asObservable();
    }

    getMerchantValue(): any {
        return this._merchant.getValue();
    }

    update(user: User): Observable<any> {
        return this.http.patch<User>('api/common/user', { user }).pipe(
            map((response) => {
                this._user.next(response);
            }),
        );
    }
}
