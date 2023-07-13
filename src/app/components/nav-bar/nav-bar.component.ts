import { Component, OnInit } from '@angular/core';
import { PageItem } from "../../models/page-item";

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

    pages: PageItem[] = [
        {
            title: 'EUR-USD Details',
            link: 'currency-details/EUR/USD',
        },
        {
            title: 'EUR-GBP Details',
            link: 'currency-details/EUR/GBP',
        }
    ]

    constructor() {
    }

    ngOnInit(): void {
    }

}
