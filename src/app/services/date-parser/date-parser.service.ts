import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateParserService {

  constructor() { }

  parseDate(dateStr: String): Date {
    const date = dateStr.split('');
    
    const day = parseInt(date[0]);
    const month = this.monthToNumber(date[2]);
    const year = parseInt(date[4]);

    const time = date[6].split(':');

    const hour = parseInt(time[0]);
    const minutes = parseInt(time[1]);
    
    return new Date(year, month, day, hour, minutes);
  }

  monthToNumber(month: String): number {
    const months = new Map<String, number>();

    months.set('janeiro', 1);
    months.set('fevereiro', 2);
    months.set('março', 3);
    months.set('abril', 4);
    months.set('maio', 5);
    months.set('junho', 6);
    months.set('julho', 7);
    months.set('agosto', 8);
    months.set('setembro', 9);
    months.set('outubro', 10);
    months.set('novembro', 11);
    months.set('dezembro', 12);

    return months.get(month)!;
  }
}
