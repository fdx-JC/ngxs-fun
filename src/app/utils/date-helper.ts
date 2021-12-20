import { DateTime, Interval } from 'luxon';

export const SPRINT_DATE_FORMAT = 'd.L.yyyy';
const FULL_DATE_FORMAT = 'yyyyLLdd';

function convertDateStringToDateNumber(
  dateString: string,
  format: string
): number {
  const date = DateTime.fromFormat(dateString, SPRINT_DATE_FORMAT);

  return Number(date.toFormat(format));
}

function convertDateToDateNumber(date: DateTime, format: string): number {
  return Number(date.toFormat(format));
}

export function isCurrentDateRange(
  startDateString: string,
  endDateString: string
): boolean {
  const currentDate = convertDateToDateNumber(DateTime.now(), FULL_DATE_FORMAT);
  const startDate = convertDateStringToDateNumber(
    startDateString,
    FULL_DATE_FORMAT
  );
  const endDate = convertDateStringToDateNumber(
    endDateString,
    FULL_DATE_FORMAT
  );

  return currentDate >= startDate && currentDate <= endDate;
}
