import { Component, OnInit } from '@angular/core';
import { CurrencyConvertRequest } from "../../models/currency-convert.request";
import { CurrencyService } from "../../services/currency.service";

@Component({
    selector: 'app-converter-panel',
    templateUrl: './converter-panel.component.html',
    styleUrls: ['./converter-panel.component.scss']
})
export class ConverterPanelComponent implements OnInit {

    convertedCurrency = 0

    constructor(private currencyService: CurrencyService) {
    }

    ngOnInit(): void {
    }

    convertCurrency() {
        const reqPayload: CurrencyConvertRequest = {
            from: 'EUR',
            to: 'JPY',
            amount: 1
        }
        this.currencyService.convertCurrencies(reqPayload).subscribe({
            next: (currencies) => {
                this.convertedCurrency = currencies
            },
            error: (error) => {
                //todo handle error
            }
        })
    }
}
