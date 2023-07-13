import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ConverterPanelComponent } from "../../components/converter-panel/converter-panel.component";
import { CurrencyCardComponent } from "../../components/currency-card/currency-card.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CurrencyService } from "../../services/currency.service";

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [HomeComponent, ConverterPanelComponent, CurrencyCardComponent],
            providers: [CurrencyService]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render the page title', () => {
        const pageTitle = fixture.nativeElement.querySelector('.page-title');
        expect(pageTitle.textContent).toContain('Currency Exchanger');
    });

    it('should render a list of currency cards', () => {
        const currencies: any[] = [
            { code: 'USD', name: 'US Dollar', rate: 1.322891 },
            { code: 'EUR', name: 'Euro', rate: 1.0 },
            { code: 'GBP', name: 'British Pound', rate: 0.855246 }
        ];
        component.popularCurrencies = currencies;
        fixture.detectChanges();

        const currencyItems = fixture.nativeElement.querySelectorAll('.currency-item');
        expect(currencyItems.length).toBe(currencies.length);

        currencyItems.forEach((item: any, index: number) => {
            const currencyCard = item.querySelector('app-currency-card');
            expect(currencyCard).toBeTruthy();

            const currencyInfo = currencyCard.componentInstance.currencyInfo;
            expect(currencyInfo).toEqual(currencies[index]);
        });
    });
});
