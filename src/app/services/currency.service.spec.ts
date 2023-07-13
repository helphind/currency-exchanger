import { TestBed } from '@angular/core/testing';

import { CurrencyService } from './currency.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { CurrencyConvertRequest } from "../models/currency-convert.request";
import { PopularCurrencyRequest } from "../models/popular-currency.request";

describe('CurrencyService', () => {
    let service: CurrencyService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CurrencyService]
        });
        service = TestBed.inject(CurrencyService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should make a GET request to get popular currencies', () => {
        const payload: PopularCurrencyRequest = { base: 'USD', symbols: 'EUR' };

        service.getPopularCurrencies(payload).subscribe();

        const request = httpMock.expectOne(`${service.API_BASE_URL}latest?access_key=${service.API_KEY}&base=USD`);
        expect(request.request.method).toBe('GET');
    });

    it('should make a GET request to convert currencies', () => {
        const payload: CurrencyConvertRequest = { from: 'USD', to: 'EUR', amount: 100 };

        service.convertCurrencies(payload).subscribe();

        const request = httpMock.expectOne(`${service.API_BASE_URL}convert?access_key=${service.API_KEY}&from=USD&to=EUR&amount=100`);
        expect(request.request.method).toBe('GET');
    });

});
