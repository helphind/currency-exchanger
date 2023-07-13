import { Component, OnInit } from '@angular/core';
import { CurrencyService } from "../../services/currency.service";
import { PopularCurrencyRequest } from "../../models/popular-currency.request";
import { CurrencyItem } from "../../models/currency-item";
import { AppConstant } from "../../constants/app.constant";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    baseCurrencyCode: string = 'EUR';

    popularCurrencyCode: string = AppConstant.POPULAR_CURRENCIES;
    popularCurrencies: CurrencyItem[] = []

    constructor(private currencyService: CurrencyService) {
    }

    ngOnInit(): void {
        this.getPopularCurrency();
    }

    getPopularCurrency() {
        const reqPayload: PopularCurrencyRequest = {
            base: this.baseCurrencyCode,
            symbols: this.popularCurrencyCode
        }
        this.currencyService.getPopularCurrencies(reqPayload).subscribe({
            next: (currenciesResponse) => {

                const { rates } = currenciesResponse

                this.popularCurrencies = this.formatToArray(rates)
            },
            error: (error) => this.handleError(error)
        })
    }

    private handleError = (error: any) => {
        // todo; handle error
        console.log('error', error)
    }

    private formatToArray = (obj: Object): CurrencyItem[]=> {
        if(!obj) {
            return []
        }
        return Object.entries(obj).map(([key, value]) => ({ currency: key, value }));
    }

}
