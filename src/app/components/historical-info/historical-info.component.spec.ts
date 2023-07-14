import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalInfoComponent } from './historical-info.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CurrencyService } from "../../services/currency.service";

describe('HistoricalInfoComponent', () => {
    let component: HistoricalInfoComponent;
    let fixture: ComponentFixture<HistoricalInfoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HistoricalInfoComponent],
            imports: [HttpClientTestingModule],
            providers: [CurrencyService],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HistoricalInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
