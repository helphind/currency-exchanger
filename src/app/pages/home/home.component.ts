import { Component, OnInit } from '@angular/core';
import { CurrencyService } from "../../services/currency.service";
import { PopularCurrencyRequest } from "../../models/popular-currency.request";
import { CurrencyItem } from "../../models/currencyItem";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    baseCurrencyCode: string = 'EUR';

    popularCurrencyCode: string = 'GBP, JPY, USD, AUD, CAD, CHF, CNH, HKD, NZD, CNY, SGD ';
    // popularCurrencies: CurrencyItem[] = []
    popularCurrencies: CurrencyItem[] =  [
        {
            "currency": "GBP",
            "value": 0.856654
        },
        {
            "currency": "JPY",
            "value": 154.009313
        },
        {
            "currency": "EUR",
            "value": 1
        },
        {
            "currency": "GBP",
            "value": 0.856654
        },
        {
            "currency": "JPY",
            "value": 154.009313
        },
        {
            "currency": "EUR",
            "value": 1
        },
        {
            "currency": "GBP",
            "value": 0.856654
        },
        {
            "currency": "JPY",
            "value": 154.009313
        },
        {
            "currency": "EUR",
            "value": 1
        }
    ]

    constructor(private currencyService: CurrencyService) {
    }

    ngOnInit(): void {
        // this.getPopularCurrency();
    }

    getPopularCurrency() {
        const reqPayload: PopularCurrencyRequest = {
            base: this.baseCurrencyCode,
            symbols: this.popularCurrencyCode
        }
        this.currencyService.getPopularCurrencies(reqPayload).subscribe({
            next: (currenciesResponse) => {

                const { rates } = currenciesResponse
                //  {
                //         "GBP": 0.856608,
                //         "JPY": 154.053612,
                //         "USD": 1.112558,
                //         "AUD": 1.638753,
                //         "CAD": 1.46693,
                //         "CHF": 0.966168,
                //         "HKD": 8.707322,
                //         "NZD": 1.766286,
                //         "CNY": 7.973036,
                //         "SGD": 1.479596
                //     }

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
