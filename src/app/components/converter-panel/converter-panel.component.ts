import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurrencyConvertRequest } from "../../models/currency-convert.request";
import { CurrencyService } from "../../services/currency.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CurrencyOption } from "../../models/currencyOption";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-converter-panel',
    templateUrl: './converter-panel.component.html',
    styleUrls: ['./converter-panel.component.scss']
})
export class ConverterPanelComponent implements OnInit, OnDestroy {

    private subscriptions = new Subscription();

    currencyList: CurrencyOption[] = [
        {
            currencyName: 'EURO',
            currencyCode: 'EUR',
        },
        {
            currencyName: 'GBP',
            currencyCode: 'GBP',
        },
        {
            currencyName: 'JPY',
            currencyCode: 'JPY',
        },
        {
            currencyName: 'USD',
            currencyCode: 'USD',
        },
        {
            currencyName: 'AUD',
            currencyCode: 'AUD',
        },
        {
            currencyName: 'CAD',
            currencyCode: 'CAD',
        },
        {
            currencyName: 'CHF',
            currencyCode: 'CHF',
        },
        {
            currencyName: 'CNH',
            currencyCode: 'CNH',
        },
        {
            currencyName: 'HKD',
            currencyCode: 'HKD',
        },
        {
            currencyName: 'NZD',
            currencyCode: 'NZD',
        },
        {
            currencyName: 'CNY',
            currencyCode: 'CNY',
        },
        {
            currencyName: 'SGD',
            currencyCode: 'SGD',
        },
    ]

    convertedCurrency = 0
    private defaultFromCurrency = 'EUR'
    private defaultToCurrency = 'USD'

    converterForm: FormGroup = this.fb.group({
        amount: [null, [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
        currencyFrom: [{ value: this.defaultFromCurrency, disabled: true }, [Validators.required]],
        currencyTo: [{ value: this.defaultToCurrency, disabled: true }, [Validators.required]],
    })

    constructor(private currencyService: CurrencyService, private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.handleValueChanged();
    }

    private handleValueChanged() {
        this.subscriptions.add(
            this.converterForm.get('amount')?.valueChanges.subscribe(res => {
                console.log('res', res)
                if(!res) {
                    this.disableFormFields();
                    return
                }
                this.enableFormFields();

            })
        )
    }

    private disableFormFields() {
        this.converterForm.get('currencyFrom')?.disable();
        this.converterForm.get('currencyTo')?.disable();
    }

    private enableFormFields() {
        this.converterForm.get('currencyFrom')?.enable();
        this.converterForm.get('currencyTo')?.enable();
    }

    convertCurrency() {

        const { amount, currencyFrom, currencyTo } = this.converterForm.value;

        const reqPayload: CurrencyConvertRequest = {
            from: currencyFrom,
            to: currencyTo,
            amount: amount
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

    swapCurrency() {
    }

    gotoDetails() {
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
