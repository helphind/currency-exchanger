import { Injectable } from '@angular/core';
import { ExchangeInfo } from "../models/exchnage-info";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    private exchangeInfo = new BehaviorSubject<ExchangeInfo | null>(null);

    constructor() {
    }

    setExchangeInfo(exchangeInfo: ExchangeInfo | null) {
        return this.exchangeInfo.next(exchangeInfo);
    }

    getExchangeInfo() {
        return this.exchangeInfo.asObservable();
    }
}
