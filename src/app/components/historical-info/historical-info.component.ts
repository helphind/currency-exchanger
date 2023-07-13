import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CurrencyService } from "../../services/currency.service";
import { HistoryRequest } from "../../models/history.request";
import { HistoricalDataConstant } from "../../constants/historical-data.constant";
import { EChartsOption } from "echarts";

@Component({
    selector: 'app-historical-info',
    templateUrl: './historical-info.component.html',
    styleUrls: ['./historical-info.component.scss']
})
export class HistoricalInfoComponent implements OnInit {

    @Input() fromCurrency = ''
    @Input() toCurrency = ''

    historicalResponse = HistoricalDataConstant;
    options!: EChartsOption;
    showChart = false

    constructor(private currencyService: CurrencyService) {
    }

    ngOnInit(): void {
        this.getHistoricalInfo()
    }

    private getHistoricalInfo() {

        if(!this.fromCurrency || !this.toCurrency) {
            return
        }

        const currentDate = new Date();
        const fromDate = this.formatDate(currentDate)
        const toDate = this.formatDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate()))

        const requestParams: HistoryRequest = {
            base: this.fromCurrency,
            symbols: this.toCurrency,
            start_date: fromDate,
            end_date: toDate,
        }

        this.currencyService.getHistoricalInfo(requestParams).subscribe( res => {
            console.log('res', res)
            // this.historicalResponse = res;
            this.formatHistoricalData();
        })

    }

    private formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    private formatHistoricalData() {
        const { rates} = this.historicalResponse;

        if(!rates) {
            return
        }

        const availableDates = Object.keys(rates)
        const historicalInfo: any = {}

        const lastDays = this.getLastDates(availableDates);

        lastDays.map(lastDate => {
            const keyName = this.getKeyName(lastDate);
            console.log('key', keyName)
            historicalInfo[keyName] = rates[lastDate][this.toCurrency].toFixed(2)
        })

        setTimeout(() => {
            this.setChartOptions(historicalInfo);
            this.showChart = true
        }, 100)

    }

    private setChartOptions(historicalInfo: any) {
        this.options = {
            tooltip: {},
            xAxis: {
                type: 'category',
                data: Object.keys(historicalInfo),
                show: true
            },
            yAxis: [
                {
                    type: 'value',
                }
            ],
            series: [
                {
                    name: `${this.fromCurrency} - ${this.toCurrency}`,
                    type: 'bar',
                    data: Object.values(historicalInfo),
                }
            ]
        };
    }

    private getKeyName(lastDate: string) {
        const dateInfo =  new Date(lastDate);
        return dateInfo.toLocaleString('default', { month: 'long' });
    }

    private getLastDates(availableDates: string[]) {
        const lastDays: string[] = [];
        let currentDate = new Date(availableDates[0]);
        const lastDate = new Date(availableDates[availableDates.length - 1]);

        while (currentDate <= lastDate) {
            const lastDateOfMonth = this.getLastDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

            if (lastDateOfMonth <= lastDate) {
                lastDays.push(this.formatDate(lastDateOfMonth));
            } else {
                lastDays.push(this.formatDate(lastDate));
            }

            currentDate.setMonth(currentDate.getMonth() + 1);
            currentDate.setDate(1);
        }
        return lastDays;
    }

    private getLastDayOfMonth(year: number, month: number): Date {
        const nextMonth = new Date(year, month + 1, 1);

        return new Date(nextMonth.getTime() - 1);

    }

}
