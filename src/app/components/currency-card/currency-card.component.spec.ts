import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyCardComponent } from './currency-card.component';


describe('CurrencyCardComponent', () => {
    let component: CurrencyCardComponent;
    let fixture: ComponentFixture<CurrencyCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CurrencyCardComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CurrencyCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the currency label and value', () => {

        const currencyInfo = {
            currency: 'USD',
            value: 123.45
        };

        component.currencyInfo = currencyInfo;
        fixture.detectChanges();

        // Retrieve the DOM elements
        const currencyLabel = fixture.nativeElement.querySelector('.currency-label');
        const currencyValue = fixture.nativeElement.querySelector('.currency-value');

        // Verify the displayed label and value
        expect(currencyLabel.textContent).toBe('USD');
        expect(currencyValue.textContent).toBe('123.45');
    });
});
