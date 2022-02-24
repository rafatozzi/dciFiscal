import { injectable } from "tsyringe";
import { ICurrencyFormatterProvider } from "../ICurrencyFormatterProvider";

export type optionsProps = {
  significantDigits: number;
  thousandsSeparator: string;
  decimalSeparator: string;
  symbol: string;
};

const defaultOptions = {
  significantDigits: 2,
  thousandsSeparator: ".",
  decimalSeparator: ",",
  symbol: "R$",
};

@injectable()
export class CurrencyFormatterProvider implements ICurrencyFormatterProvider {
  CurrencyFormatter(value: number, options?: optionsProps): string {
    if (typeof value !== "number") value = 0.0;
    options = { ...defaultOptions, ...options };
    const txtValue = value.toFixed(options.significantDigits);

    const [currency, decimal] = txtValue.split(".");
    return `${options.symbol} ${currency.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      options.thousandsSeparator
    )}${options.decimalSeparator}${decimal}`;
  }

}