import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyDetailsComponent } from './currency-details.component';
import { ConverterPanelComponent } from "../../components/converter-panel/converter-panel.component";
import { HistoricalInfoComponent } from "../../components/historical-info/historical-info.component";
import { ActivatedRoute, Router } from "@angular/router";
import { CurrencyService } from "../../services/currency.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";

describe('CurrencyDetailsComponent', () => {
    let component: CurrencyDetailsComponent;
    let fixture: ComponentFixture<CurrencyDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CurrencyDetailsComponent, ConverterPanelComponent, HistoricalInfoComponent],
            imports: [HttpClientTestingModule, ReactiveFormsModule],
            providers: [
                CurrencyService,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of({ fromCurrency: 'USD', toCurrency: 'EUR' })
                    }
                },
                {
                    provide: Router,
                    useValue: {}
                }
            ]
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
    });

    it('should render the HistoricalInfoComponent with the correct currency values', () => {
        component.fromCurrency = 'USD';
        component.toCurrency = 'EUR';
        fixture.detectChanges();

        const historicalInfoComponent = fixture.debugElement.query(By.directive(HistoricalInfoComponent)).componentInstance;
        expect(historicalInfoComponent.fromCurrency).toBe('USD');
        expect(historicalInfoComponent.toCurrency).toBe('EUR');
    });
});
