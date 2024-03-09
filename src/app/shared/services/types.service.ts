import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { env } from "environments/environment";

@Injectable({ providedIn: 'root' })

export class TypesService {

  constructor(private http: HttpClient) { }

  getTransportTypes() {
    return this.http.get(env.apiReferences + '/references/transport-types/all');
  }
  getTransportKinds() {
    return this.http.get(env.apiReferences + '/references/transport-kinds/all');
  }
  getCargoTypes() {
    return this.http.get(env.apiReferences + '/references/cargo-type-groups/all');
  }
  getCurrencies() {
    return this.http.get(env.apiReferences + '/references/currencies/all');
  }
  getPackages() {
    return this.http.get(env.apiReferences + '/references/cargo-packages/all');
  }
  getCargoLoadingMethod() {
    return this.http.get(env.apiReferences + '/references/cargo-loading-method/all');
  }
}