import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe extends DatePipe implements PipeTransform {

  transform(value: any, format?: string, timezone?: string, locale?: string): string | null {
    if (value === null || value === '' || value !== value) {
      return null;
    }

    const date = new Date(value);

    // Incoming date from backend is in the form of GMT+0, we need to convert it to locale timezone, then pass into DatePipe
    date.setTime(date.getTime() - date.getTimezoneOffset() * 60 * 1000);

    return super.transform(date, format, timezone, locale);
  }

}
