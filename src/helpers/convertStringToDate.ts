import {
  convertDBDateToSystemTimeZone,
  convertToDateWithoutTimezone,
  convertDBDateToLocaleTimeZone,
} from "./convertToSystemTimezone";

/**
 * Converts a string with format to a Date object.
 * @param {string} stringDate - The date string in the format dd/mm/yyyy hh:mm:ss.
 */
export const convertStringToDate = (stringDate: string): Date | null => {
  /**
   * Converts a string with format dd/mm/yyyy hh:mm:ss to a Date object.
   * @param {string} stringDate - The date string in the format dd/mm/yyyy hh:mm:ss.
   * @returns {Date} - The corresponding Date object.
   */
  const formatStringToDate = (stringDate: string): Date | null => {
    const [datePart, timePart] = stringDate?.split(" ");
    if (!datePart || !timePart) {
      return null;
    }
    const [day, month, year] = datePart?.split("/").map(Number);
    if (!day || !month || !year) {
      return null;
    }
    const [hours, minutes, seconds] = timePart?.split(":").map(Number);
    // Note: Months are 0-indexed in JavaScript Date object, so we subtract 1 from the month.
    const date = new Date(year, month - 1, day, hours, minutes, seconds);
    if (isNaN(date.getTime())) {
      return null;
    }
    return date;
  };

  /**
   * Converts a string with format d/m/yyyy, hh:mm:ss a. m. to a Date object.
   * @param {string} stringDate - The date string in the format d/m/yyyy, hh:mm:ss a. m.
   * @returns {Date | null} - The corresponding Date object or null if the date is invalid.
   */
  const formatLocaleStringToDate = (stringDate: string): Date | null => {
    const [datePart, timePartWithPeriod] = stringDate?.split(", ");
    if (!datePart || !timePartWithPeriod) {
      return null;
    }
    const [day, month, year] = datePart?.split("/").map(Number);
    if (!day || !month || !year) {
      return null;
    }
    const [timePart, period] = timePartWithPeriod?.split(" ");
    if (!timePart || !period) {
      return null;
    }
    const [hours, minutes, seconds] = timePart?.split(":").map(Number);

    // Convert 12-hour format to 24-hour format
    let finalHours = 0;
    if (period.includes("p") && hours < 12) {
      finalHours = hours + 12;
    } else if (period.includes("a") && hours === 12) {
      finalHours = 0;
    } else {
      finalHours = hours;
    }
    // Note: Months are 0-indexed in JavaScript Date object, so we subtract 1 from the month.
    const date = new Date(year, month - 1, day, finalHours, minutes, seconds);
    if (isNaN(date.getTime())) {
      return null;
    }
    return date;
  };

  if (
    stringDate.includes("a") ||
    stringDate.includes("p") ||
    stringDate.includes("m")
  ) {
    const formattedDate = formatLocaleStringToDate(stringDate);
    return formattedDate;
  } else if (stringDate) {
    const formattedDate = formatStringToDate(stringDate);
    return formattedDate;
  }

  return null;
};

/**
 * Converts a string with format to a Date object with system timezone.
 * @param {string} stringDate - The date string in the format dd/mm/yyyy hh:mm:ss.
 */
export const convertDBStringToSystemTimeZone = (stringDate: string) => {
  // get Date value or null from string

  const date = convertStringToDate(stringDate);

  if (!date) return null;

  const systemDate = convertDBDateToSystemTimeZone(
    convertToDateWithoutTimezone(date)
  );

  return systemDate;
};

/**
 * Converts a string with format to a Date object with locale client timezone.
 * @param {string} stringDate - The date string in the format dd/mm/yyyy hh:mm:ss.
 */
export const convertDBStringToLocaleTimeZone = (stringDate: string) => {
  // get Date value or null from string

  const date = convertStringToDate(stringDate);

  if (!date) return null;

  const localeTimeDate = convertDBDateToLocaleTimeZone(
    convertToDateWithoutTimezone(date)
  );

  return localeTimeDate;
};
