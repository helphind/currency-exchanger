import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConverterPanelComponent } from './converter-panel.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CurrencyService } from "../../services/currency.service";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { SharedService } from "../../services/shared.service";

describe('ConverterPanelComponent', () => {
    let component: ConverterPanelComponent;
    let fixture: ComponentFixture<ConverterPanelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ConverterPanelComponent],
            imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule],
            providers: [CurrencyService, FormBuilder, SharedService]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ConverterPanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
