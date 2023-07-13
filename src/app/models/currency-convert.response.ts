export interface CurrencyRateInfo {
    timestamp: number;
    rate: number;
}

export interface CurrencyConvertResponse {
    success: boolean;
    info: CurrencyRateInfo;
    date: string;
    result: number;
    historical?: string;
}

