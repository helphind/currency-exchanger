import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { CurrencyDetailsComponent } from "./pages/currency-details/currency-details.component";
import { ConverterPanelComponent } from './components/converter-panel/converter-panel.component';
import { CurrencyCardComponent } from './components/currency-card/currency-card.component';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        NavBarComponent,
        HomeComponent,
        CurrencyDetailsComponent,
        ConverterPanelComponent,
        CurrencyCardComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
