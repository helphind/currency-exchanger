import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyDetailsComponent } from './currency-details.component';
import { ConverterPanelComponent } from "../../components/converter-panel/converter-panel.component";
import { HistoricalInfoComponent } from "../../components/historical-info/historical-info.component";

describe('CurrencyDetailsComponent', () => {
    let component: CurrencyDetailsComponent;
    let fixture: ComponentFixture<CurrencyDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CurrencyDetailsComponent, ConverterPanelComponent, HistoricalInfoComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CurrencyDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render the currency code and name', () => {
        component.fromCurrency = 'USD';
        component.fromCurrencyName = 'US Dollar';
        fixture.detectChanges();

        const currencyCode = fixture.nativeElement.querySelector('.currency-code');
        const currencyName = fixture.nativeElement.querySelector('.currency-name');

        expect(currencyCode.textContent).toBe('USD');
        expect(currencyName.textContent).toBe('US Dollar');
    });

    it('should render the "Back to Home" button', () => {
        const backButton = fixture.nativeElement.querySelector('.btn.primary-btn');
        expect(backButton.textContent).toBe('Back to Home');
    });

    it('should render the ConverterPanelComponent with details', () => {
        const converterPanel = fixture.nativeElement.querySelector('app-converter-panel');

        expect(converterPanel).toBeTruthy();
        expect(converterPanel.getAttribute('isDetails')).toBe('true');
        expect(converterPanel.getAttribute('defaultFromCurrency')).toBe(component.fromCurrency);
        expect(converterPanel.getAttribute('defaultToCurrency')).toBe(component.toCurrency);
    });

    it('should render the HistoricalInfoComponent with the correct currency values', () => {
        component.fromCurrency = 'USD';
        component.toCurrency = 'EUR';
        fixture.detectChanges();

        const historicalInfo = fixture.nativeElement.querySelector('app-historical-info');

        expect(historicalInfo).toBeTruthy();
        expect(historicalInfo.getAttribute('fromCurrency')).toBe(component.fromCurrency);
        expect(historicalInfo.getAttribute('toCurrency')).toBe(component.toCurrency);
    });
});
