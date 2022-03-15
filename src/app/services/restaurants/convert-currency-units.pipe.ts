import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertCurrencyUnits',
})
export class ConvertCurrencyUnitsPipe implements PipeTransform {
  getBaseOfCurrencyUnits(units: string) {
    switch (units) {
      case 'Cents':
        return 100;
      case 'DOLLARS':
        return 1;
      default:
        return -1;
    }
  }

  convertToCurrencyUnits(
    magnitude: number,
    fromUnits: string,
    toUnits: string
  ) {
    return (
      magnitude *
      (this.getBaseOfCurrencyUnits(toUnits) /
        this.getBaseOfCurrencyUnits(fromUnits))
    );
  }

  transform(value: number, fromUnits: string, toUnits: string): number {
    return (
      Math.round(this.convertToCurrencyUnits(value, fromUnits, toUnits) * 100) /
      100
    );
  }
}
