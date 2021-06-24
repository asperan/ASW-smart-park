import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  now() {
    return new Date();
  }

  mock(year, month, day, hours, minutes) {
    const date = new Date();
    date.setFullYear(year);
    date.setMonth(month);
    date.setDate(day);
    date.setHours(hours);
    date.setMinutes(minutes);
    return date;
  }

}
