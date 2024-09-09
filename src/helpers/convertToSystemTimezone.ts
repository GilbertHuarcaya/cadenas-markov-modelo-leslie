import { TIMEZONE_TRANSFORM } from "@/domain/constants/components";

/**
 * Converts a given date to the system's timezone.
 * @param {number | string | Date} date - The date to be converted.
 * @returns {Date} - The date converted to the system's timezone.
 */
export const convertToSystemTimezone = (date: number | string | Date) => {
  const newDate = new Date(
    new Date(date).toLocaleString(TIMEZONE_TRANSFORM.locale, {
      timeZone: TIMEZONE_TRANSFORM.timeZone,
    })
  );
  return newDate;
};

/**
 * Removes the timezone information from a given date.
 * @param {Date} date - The date from which to remove the timezone.
 * @returns {string} - The date in ISO format without timezone information.
 */
export const convertToDateWithoutTimezone = (date: Date) => {
  const tzoffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
  const withoutTimezone = new Date(date.valueOf() - tzoffset)
    .toISOString()
    .slice(0, -1);
  return withoutTimezone;
};

/**
 * Converts a date from the database (CONSTANT timezone) to the system's timezone.
 * @param {number | string | Date} dateFromDatabase - The date from the database.
 * @returns {Date} - The date converted to the system's timezone.
 */
export const convertDBDateToSystemTimeZone = (
  dateFromDatabase: number | string | Date
) => {
  const systemOffset = TIMEZONE_TRANSFORM.offset;

  const timeZonedDate = new Date(dateFromDatabase + "Z"); // 'Z' indicates UTC
  const utcOffsetInMinutes = systemOffset * 60;
  const utcDate = new Date(
    timeZonedDate.getTime() - utcOffsetInMinutes * 60 * 1000
  );

  // Convert to the browser's local timezone

  const localDate = new Date(
    utcDate.toLocaleString(TIMEZONE_TRANSFORM.locale, {
      timeZone: TIMEZONE_TRANSFORM.timeZone,
    })
  );

  return localDate;
};

/**
 * Converts a date from the database (CONSTANT timezone) to the local timezone.
 * @param {number | string | Date} dateFromDatabase - The date from the database.
 * @returns {Date} - The date converted to the local timezone.
 */
export const convertDBDateToLocaleTimeZone = (
  dateFromDatabase: number | string | Date
) => {
  const systemOffset = TIMEZONE_TRANSFORM.offset;

  const timeZonedDate = new Date(dateFromDatabase + "Z"); // 'Z' indicates UTC
  const utcOffsetInMinutes = systemOffset * 60;
  const localeTimeDate = new Date(
    timeZonedDate.getTime() - utcOffsetInMinutes * 60 * 1000
  );

  return localeTimeDate;
};

/**
 * Converts a local date to the system's timezone.
 * @param {number | string | Date} localDate - The local date to be converted.
 * @returns {Date} - The date converted to the system's timezone.
 */
export const convertLocalToSystemTimeZone = (localDate: number | string | Date) => {
  // Create a Date object from the input date (assumed to be in the local timezone)
  const date = new Date(localDate);

  // Get the UTC time in milliseconds
  const utcTime = date.getTime() + date.getTimezoneOffset() * 60000; // Correct the timezone offset in milliseconds

  const systemOffset = TIMEZONE_TRANSFORM.offset * 60; //in minutes

  // Calculate the time in system timezone
  const systemTime = new Date(utcTime + systemOffset * 60 * 1000);

  return systemTime;
};
