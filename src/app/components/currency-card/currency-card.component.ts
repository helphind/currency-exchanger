import { Component, Input } from '@angular/core';
import { CurrencyItem } from "../../models/currency-item";

@Component({
    selector: 'app-currency-card',
    templateUrl: './currency-card.component.html',
    styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent {

    @Input() currencyInfo!: CurrencyItem;

}
