import { Component, OnInit } from '@angular/core';
import { Page } from "../../models/page";

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

    pages: Page[] = [
        {
            title: 'EUR-USD Details',
            link: '/EUR-USD-Details',
        },
        {
            title: 'EUR-GBP Details',
            link: '/EUR-GBP Details',
        }
    ]

    constructor() {
    }

    ngOnInit(): void {
    }

}
