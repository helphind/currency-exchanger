import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CurrencyConvertRequest } from "../../models/currency-convert.request";
import { CurrencyService } from "../../services/currency.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { CurrencyOption } from "../../models/currency-option";
import { debounceTime, Subscription, take } from "rxjs";
import { Router } from "@angular/router";
import { CurrencyListConstant } from "../../constants/currency-list.constant";
import { CurrencyConvertResponse } from "../../models/currency-convert.response";
import { SharedService } from "../../services/shared.service";
import { ExchangeInfo } from "../../models/exchnage-info";

@Component({
    selector: 'app-converter-panel',
    templateUrl: './converter-panel.component.html',
    styleUrls: ['./converter-panel.component.scss']
})
export class ConverterPanelComponent implements OnInit, OnDestroy {

    @Input() defaultFromCurrency = 'EUR'
    @Input() defaultToCurrency = 'USD'
    @Input() isDetails = false;
    private subscriptions = new Subscription();

    currencyList: CurrencyOption[] = CurrencyListConstant;

    exchangeRate: number = 0 || 148.972231;
    exchangeResult: number = 0 || 3724.305775;
    errorMessage = '';

    converterForm: FormGroup = this.fb.group({
        amount: [null, [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
        currencyFrom: [{ value: this.defaultFromCurrency, disabled: true }, [Validators.required]],
        currencyTo: [{ value: this.defaultToCurrency, disabled: true }, [Validators.required]],
    })

    constructor(private currencyService: CurrencyService,
                private fb: FormBuilder,
                private router: Router,
                private sharedService: SharedService) {
    }

    ngOnInit(): void {
        this.handleValueChanged();
        this.handleFromCurrency();
        this.getExistingInfo();
        console.log('isDetails', this.isDetails)
    }

    private handleValueChanged() {
        this.subscriptions.add(
            this.converterForm.get('amount')?.valueChanges.pipe(debounceTime(200)).subscribe(res => {
                console.log('res', res)
                if (!res) {
                    this.disableFormFields();
                    return
                }
                this.enableFormFields();

            })
        )
    }

    private handleFromCurrency() {

        const amount = this.converterForm.get('amount')?.value
        if (this.isDetails || !amount) {
            this.disableCurrencyFrom();
            return;
        }
        this.enableCurrencyFrom();
    }

    private disableFormFields() {
        this.disableCurrencyFrom();
        this.converterForm.get('currencyTo')?.disable();
    }

    private enableFormFields() {
        this.handleFromCurrency();
        this.converterForm.get('currencyTo')?.enable();
    }

    private disableCurrencyFrom() {
        this.converterForm.get('currencyFrom')?.disable();
    }

    private enableCurrencyFrom() {
        this.converterForm.get('currencyFrom')?.enable();
    }

    private getExistingInfo() {

        this.sharedService.getExchangeInfo().pipe(take(1)).subscribe((res: ExchangeInfo | null) => {
            if (!res) {
                this.resetExchangeValues();
                return
            }

            const { currencyFrom, currencyTo, amount, currencyRate, currencyResult } = res;

            if (!amount || currencyFrom != this.defaultFromCurrency || currencyTo != this.defaultToCurrency) {
                this.resetExchangeValues();
                return
            }

            this.converterForm.get('amount')?.patchValue(amount);

            this.exchangeRate = currencyRate;
            this.exchangeResult = currencyResult;

        })
    }

    private resetExchangeValues = () => {
        this.converterForm.get('amount')?.patchValue(null);
        this.exchangeRate = 0;
        this.exchangeResult = 0;
        this.sharedService.setExchangeInfo(null)
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

                if (!success) {
                    this.errorMessage = 'Sorry, something went wrong. Please try again after some time.'
                    this.exchangeRate = 0;
                    return;
                }

                this.exchangeRate = info.rate;
                this.exchangeResult = result;
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
        this.sharedService.setExchangeInfo({
            ...this.converterForm.value,
            currencyRate: this.exchangeRate,
            currencyResult: this.exchangeResult
        })
        this.router.navigate(['currency-details', currencyFrom, currencyTo])
    }


    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
