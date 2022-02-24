export type optionsProps = {
  significantDigits: number;
  thousandsSeparator: string;
  decimalSeparator: string;
  symbol: string;
};

export interface ICurrencyFormatterProvider {
  CurrencyFormatter(value: number, options?: optionsProps): string;
}