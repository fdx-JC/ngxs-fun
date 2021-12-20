import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';
import { SPRINT_DATE_FORMAT } from '../utils/date-helper';

const DISPLAY_DATE_FORMAT_FULL = 'dd LLL yy';
const DISPLAY_DATE_FORMAT = 'dd LLL';

@Pipe({ name: 'displayDateRange' })
export class DisplayDateRange implements PipeTransform {
  transform(dateRangeString: string): string {
    if (!dateRangeString) return dateRangeString;
    const dates = dateRangeString.split('-');
    const startDateString = dates[0].trim();
    const endDateString = dates[1].trim();

    const startDate = DateTime.fromFormat(startDateString, SPRINT_DATE_FORMAT);

    const endDate = DateTime.fromFormat(endDateString, SPRINT_DATE_FORMAT);

    const isSameYear = startDate.year === endDate.year;

    return `${startDate.toFormat(
      isSameYear ? DISPLAY_DATE_FORMAT : DISPLAY_DATE_FORMAT_FULL
    )} to ${endDate.toFormat(DISPLAY_DATE_FORMAT_FULL)}`;
  }
}
