import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CurrencyConvertRequest } from "../../models/currency-convert.request";
import { CurrencyService } from "../../services/currency.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { CurrencyOption } from "../../models/currency-option";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { CurrencyListConstant } from "../../constants/currency-list.constant";
import { CurrencyConvertResponse } from "../../models/currency-convert.response";

@Component({
    selector: 'app-converter-panel',
    templateUrl: './converter-panel.component.html',
    styleUrls: ['./converter-panel.component.scss']
})
export class ConverterPanelComponent implements OnInit, OnDestroy {

    @Input() defaultFromCurrency = 'EUR'
    @Input() defaultToCurrency = 'USD'
    private subscriptions = new Subscription();

    currencyList: CurrencyOption[] = CurrencyListConstant;

    exchangeRate: number = 0;
    exchangeResult: number = 0;
    errorMessage = '';

    converterForm: FormGroup = this.fb.group({
        amount: [null, [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
        currencyFrom: [{ value: this.defaultFromCurrency, disabled: true }, [Validators.required]],
        currencyTo: [{ value: this.defaultToCurrency, disabled: true }, [Validators.required]],
    })

    constructor(private currencyService: CurrencyService, private fb: FormBuilder, private router: Router) {
    }

    ngOnInit(): void {
        this.handleValueChanged();
    }

    private handleValueChanged() {
        this.subscriptions.add(
            this.converterForm.get('amount')?.valueChanges.subscribe(res => {
                console.log('res', res)
                if (!res) {
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
            next: (convertResponse: CurrencyConvertResponse) => {
                convertResponse = {
                    "success": true,
                    "info": {
                        "timestamp": 1519328414,
                        "rate": 148.972231
                    },
                    "historical": "",
                    "date": "2018-02-22",
                    "result": 3724.305775
                }

                const { success, result, info } = convertResponse

                if(!success) {
                    this.errorMessage = 'Sorry, something went wrong. Please try again after some time.'
                    this.exchangeRate = 0;
                    return;
                }


                this.exchangeResult = info.rate
                this.exchangeRate = result
            },
            error: (error) => {
                //todo handle error
            }
        })
    }

    swapCurrency() {
        const currencyFromCtrl = this.converterForm.get('currencyFrom') as FormControl;
        const currencyToCtrl = this.converterForm.get('currencyTo') as FormControl;

        if (!currencyFromCtrl || !currencyToCtrl) {
            console.log('from control not set')
            return
        }

        const currencyFromValue = currencyFromCtrl.value

        currencyFromCtrl.setValue(currencyToCtrl.value);
        currencyToCtrl.setValue(currencyFromValue);
    }

    gotoDetails() {
        const { currencyFrom, currencyTo } = this.converterForm.value;
        this.router.navigate(['currency-details', currencyFrom, currencyTo])
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
