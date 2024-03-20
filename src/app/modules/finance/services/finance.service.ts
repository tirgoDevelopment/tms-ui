import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { env } from "environments/environment";

@Injectable({ providedIn: 'root' })

export class FinanceService {
  constructor(
    private http: HttpClient
  ) { }
  
  getAll(user,pag, filter?,sortBy?,sortType? ) {
    let url = `${env.apiFinance}/finance/transaction/driver-merchant-transactions?userId=${user}&pageSize=${pag.size}&pageIndex=${pag.currentPage}`;
    if (filter) {
      url += `&${filter}`;
    }
    if (sortBy && sortType) {
      url += `&sortBy=${sortBy}&sortType=${sortType}`;
    }
    return this.http.get(url);
  }
  create(data) {
    return this.http.post(env.apiFinance+'/finance/transaction',data);
  }
  getBalance(id) {
    return this.http.get(env.apiFinance+'/finance/transaction/merchant-balance?merchantId='+id);
  }
}