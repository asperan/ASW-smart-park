import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "price" })
export class PricePipe implements PipeTransform {
  transform(value: number): string {
    const cents = (value % 100).toString();
    const full = (value / 100).toFixed(0);
    return full + getDigitSeparator() + (cents.length === 1 ? "0" : "") + cents + getCurrencySymbol();
  }
}

function getDigitSeparator(): string {
  return ".";
}

function getCurrencySymbol(): string {
  return "€";
}