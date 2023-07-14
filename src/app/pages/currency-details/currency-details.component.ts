import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CurrencyListConstant } from "../../constants/currency-list.constant";
import { CurrencyOption } from "../../models/currency-option";

@Component({
    selector: 'app-currency-details',
    templateUrl: './currency-details.component.html',
    styleUrls: ['./currency-details.component.scss']
})
export class CurrencyDetailsComponent implements OnInit {

    fromCurrency: string = '';
    fromCurrencyName: string = '';
    toCurrency: string = '';

    currenciesList: CurrencyOption[] = CurrencyListConstant;

    constructor(private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            console.log('params', params)
            this.toCurrency = params['currencyTo'] || '';
            this.fromCurrency = params['currencyFrom'] || '';
            this.getFromCurrencyName();
        })
    }

    private getFromCurrencyName = () => {

        if (!this.fromCurrency) {
            return
        }

        const filteredCurrency = this.currenciesList.find((currency) => currency.currencyCode === this.fromCurrency)
        this.fromCurrencyName = (filteredCurrency && filteredCurrency.currencyName) || '';
    }

    backToHome() {
        this.router.navigate(['/'])
    }

}
