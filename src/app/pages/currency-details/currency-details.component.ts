import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CurrencyOption } from "../../models/currency-option";

@Component({
    selector: 'app-currency-details',
    templateUrl: './currency-details.component.html',
    styleUrls: ['./currency-details.component.scss']
})
export class CurrencyDetailsComponent implements OnInit {

    currency: CurrencyOption = {
        currencyCode: '',
        currencyName: ''
    }

    constructor(private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            console.log('params', params)
            const currencyTo = params.get('currencyTo');
            const currencyFrom = params.get('currencyFrom') || '';
            this.currency.currencyCode = currencyFrom
            this.currency.currencyName = currencyFrom
        })
    }

    backToHome() {
        this.router.navigate(['/'])
    }

}
