import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appOrdinalDate',
})
export class OrdinalDatePipe implements PipeTransform {

  transform(value: Date | string): string {
    if (!value) return '';

    const date = new Date(value);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    return `${this.getOrdinal(day)} ${month} ${year}`;
  }

  private getOrdinal(day: number): string {
    if (day > 3 && day < 21) return day + 'th';
    switch (day % 10) {
      case 1: return day + 'st';
      case 2: return day + 'nd';
      case 3: return day + 'rd';
      default: return day + 'th';
    }
  }
  
}
