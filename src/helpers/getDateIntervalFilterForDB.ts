
import { EDeadLineFilters } from "@/domain/constants/components";
import { convertToSystemTimezone, convertToDateWithoutTimezone } from "./convertToSystemTimezone";

export const getDeadLineInterval = (
  filter: EDeadLineFilters,
  currentTime?: string
) => {
  const now = new Date(currentTime || convertToSystemTimezone(new Date()));

  const setStartOfDay = (date: Date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  };

  const setEndOfDay = (date: Date) => {
    const newDate = new Date(date);
    newDate.setHours(23, 59, 59, 999);
    return newDate;
  };

  const getFirstDayOfWeek = (date: Date) => {
    const newDate = new Date(date);
    const day = newDate.getDay();
    const diff = newDate.getDate() - day + 1;
    return new Date(newDate.setDate(diff));
  };

  const getLastDayOfWeek = (date: Date) => {
    const newDate = new Date(date);
    const day = newDate.getDay();
    const diff = newDate.getDate() + 7 - day;
    return new Date(newDate.setDate(diff));
  };

  const getDayAfterNumberOfDays = (date: Date, numberOfDays: number) => {
    const newDate = new Date(date);
    return new Date(newDate.setDate(newDate.getDate() + numberOfDays));
  };

  switch (filter) {
    case EDeadLineFilters.TODAY:
      return {
        startDate: setStartOfDay(now),
        endDate: setEndOfDay(now),
      };
    case EDeadLineFilters.TOMORROW:
      const tomorrow = getDayAfterNumberOfDays(now, 1);
      return {
        startDate: setStartOfDay(tomorrow),
        endDate: setEndOfDay(tomorrow),
      };
    case EDeadLineFilters.THIS_WEEK:
      return {
        startDate: setStartOfDay(getFirstDayOfWeek(now)),
        endDate: setEndOfDay(getLastDayOfWeek(now)),
      };
    case EDeadLineFilters.OVERDUE:
      return {
        startDate: setStartOfDay(new Date(0)),
        endDate: now,
      };
    case EDeadLineFilters.ONE_WEEK:
      const oneWeek = getDayAfterNumberOfDays(now, 7);
      return {
        startDate: setStartOfDay(now),
        endDate: setEndOfDay(oneWeek),
      };
    case EDeadLineFilters.NEXT_WEEK:
      const nextWeekDate = getDayAfterNumberOfDays(now, 7);
      return {
        startDate: setStartOfDay(getFirstDayOfWeek(nextWeekDate)),
        endDate: setEndOfDay(getLastDayOfWeek(nextWeekDate)),
      };
    case EDeadLineFilters.THIS_MONTH:
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return {
        startDate: setStartOfDay(firstDayOfMonth),
        endDate: setEndOfDay(lastDayOfMonth),
      };
    case EDeadLineFilters.FUTURE:
      return {
        startDate: now,
        endDate: undefined,
      };
    default:
      return {
        startDate: setStartOfDay(now),
        endDate: setEndOfDay(now),
      };
  }
};

export const getDateIntervalFilterForDB = (
  filter: EDeadLineFilters,
  columnName: string,
  currentTime?: string
) => {
  const { startDate, endDate } = getDeadLineInterval(filter, currentTime);

  const filters = [];
  if (startDate) {
    filters.push({
      columnName,
      filterValue: convertToDateWithoutTimezone(startDate),
      filterOption: "IsGreaterThanOrEqualTo",
    });
  }
  if (endDate) {
    filters.push({
      columnName,
      filterValue: convertToDateWithoutTimezone(endDate),
      filterOption: "IsLessThanOrEqualTo",
    });
  }
  return filters;
};
