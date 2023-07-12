import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { CurrencyConvertRequest } from "../models/currency-convert.request";
import { PopularCurrencyRequest } from "../models/popular-currency.request";

@Injectable({
    providedIn: 'root'
})
export class CurrencyService {

    API_BASE_URL: string = environment.apiBaseUrl
    API_KEY: string = environment.apiKey

    constructor(private http: HttpClient) {
    }

    getPopularCurrencies(payload: PopularCurrencyRequest): Observable<any> {
        return this.http.get(`${this.API_BASE_URL}latest`, { params: { ...payload, access_key: this.API_KEY } })
    }

    convertCurrencies(payload: CurrencyConvertRequest): Observable<any> {
        return this.http.get(`${this.API_BASE_URL}convert`, { params: { ...payload, access_key: this.API_KEY } })
    }
}
