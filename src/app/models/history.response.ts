export interface Rates {
    [date: string]: {
        [currency: string]: number;
    };
}

export interface HistoryResponse {
    success: boolean;
    timeseries: boolean;
    start_date: string;
    end_date: string;
    base: string;
    rates: Rates;
}

