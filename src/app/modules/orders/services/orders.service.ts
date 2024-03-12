import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { env } from "environments/environment";

@Injectable({ providedIn: 'root' })

export class OrdersService {
  constructor(
    private http: HttpClient
  ) { }

  getWaitingOrders(pag,filter?, sortBy?, sortType?) {
    let url = `${env.apiOrders}/orders/drivers/all-waiting-orders?pageSize=${pag.size}&pageIndex=${pag.currentPage}`;
    if (filter) {
      url += `&${filter}`;
    }
    if (sortBy && sortType) {
      url += `&sortBy=${sortBy}&sortType=${sortType}`;
    }
    return this.http.get(url);
  }
  getActiveOrders(id,pag,filter?, sortBy?, sortType?) {
    let url = `${env.apiOrders}/orders/drivers/merchant-active-orders?merchantId=${id}&pageSize=${pag.size}&pageIndex=${pag.currentPage}`;
    if (filter) {
      url += `&${filter}`;
    }
    if (sortBy && sortType) {
      url += `&sortBy=${sortBy}&sortType=${sortType}`;
    }
    return this.http.get(url);
  }
  getArchiveOrders(id,pag,filter?, sortBy?, sortType?) {
    let url = `${env.apiOrders}/orders/drivers/archive-orders-by?driverId=${id}&pageSize=${pag.size}&pageIndex=${pag.currentPage}`;
    if (filter) {
      url += `&${filter}`;
    }
    if (sortBy && sortType) {
      url += `&sortBy=${sortBy}&sortType=${sortType}`;
    }
    return this.http.get(url);
  }
  getOrderById(id) {
    return this.http.get(env.apiOrders + '/orders/drivers/order-by-id?orderId=' + id);
  }
  assignDriver(data) {
    return this.http.post(env.apiOrders+ '/orders/drivers/offer-price', data)
  }
  acceptOffer(id) {
    // @ts-ignore
    return this.http.post(env.apiOrders + '/orders/drivers/accept-offer?id='+id)
  }
  contrOffer(data) {
    return this.http.post(env.apiOrders + '/orders/drivers/offer-price',data)
  }
}