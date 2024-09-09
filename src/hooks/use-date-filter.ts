import { getCurrentTime } from "@/actions/getCurrentTime";
import { getCurrentTimeConverted } from "@/actions/getCurrentTimeConverted";
import { EDeadLineFilters } from "@/domain/constants/components";
import {
  convertLocalToSystemTimeZone,
  convertToSystemTimezone,
} from "@/helpers/convertToSystemTimezone";
import { getDateIntervalFilterForDB } from "@/helpers/getDateIntervalFilterForDB";
import React, { useState } from "react";

const useDateFilter = () => {
  const [filters, setFilters] = useState<
    {
      columnName: string;
      filterValue: string;
      filterOption: string;
    }[]
  >([]);
  const [days, setDays] = useState("");
  const onServerButtonClick = (
    filter: EDeadLineFilters,
    columnName = "deadLine"
  ) => {
    getCurrentTime().then((currentTime) => {
      console.log("Current time:", currentTime);
      setFilters(getDateIntervalFilterForDB(filter, columnName, currentTime));
    });
  };

  const onServerConvertedButtonClick = (
    filter: EDeadLineFilters,
    columnName = "deadLine"
  ) => {
    getCurrentTimeConverted().then((currentTime) => {
      console.log("Current time converted:", currentTime);
      setFilters(getDateIntervalFilterForDB(filter, columnName, currentTime));
    });
  };

  const onClientButtonClick = (
    filter: EDeadLineFilters,
    columnName = "deadLine"
  ) => {
    const now = new Date();
    const currentTime = now.toISOString();
    console.log("Current Locale time ", currentTime);
    setFilters(getDateIntervalFilterForDB(filter, columnName, currentTime));
  };

  const onClientToSystemButtonClick = (
    filter: EDeadLineFilters,
    columnName = "deadLine"
  ) => {
    const now = new Date();
    const timeZoneDate = convertToSystemTimezone(now);

    console.log(
      "Current Locale time converted:",
      timeZoneDate,
      timeZoneDate.toISOString()
    );
    setFilters(
      getDateIntervalFilterForDB(filter, columnName, timeZoneDate.toISOString())
    );
  };

  const getServerOnlyDaysDifference = (date: number | string | Date) => {
    // Get the current date in the system timezone
    getCurrentTime().then((currentTime) => {
      console.log("Current time:", currentTime);
      const dateNow = new Date(currentTime || new Date());

      console.log("date now:", dateNow, dateNow.toISOString());
      const dateToNow = convertToSystemTimezone(
        new Date(
          Date.UTC(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate())
        )
      );
      const dateToCompare = convertToSystemTimezone(
        new Date(
          Date.UTC(
            new Date(date).getFullYear(),
            new Date(date).getMonth(),
            new Date(date).getDate()
          )
        )
      );

      const diff = dateToCompare.getTime() - dateToNow.getTime();
      const days = diff / (1000 * 60 * 60 * 24);
      setDays(String(days) + " - " + dateNow.toISOString());
    });
  };

  const getServerCovertedOnlyDaysDifference = (date: number | string | Date) => {
    // Get the current date in the system timezone
    getCurrentTime().then((currentTime) => {
      console.log("Current time:", currentTime);
      const cDate = new Date(currentTime || new Date());

      const dateNow = convertLocalToSystemTimeZone(cDate);
      console.log("date now:", dateNow, dateNow.toISOString());
      const dateToNow = convertToSystemTimezone(
        new Date(
          Date.UTC(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate())
        )
      );
      const dateToCompare = convertToSystemTimezone(
        new Date(
          Date.UTC(
            new Date(date).getFullYear(),
            new Date(date).getMonth(),
            new Date(date).getDate()
          )
        )
      );

      const diff = dateToCompare.getTime() - dateToNow.getTime();
      const days = diff / (1000 * 60 * 60 * 24);
      setDays(String(days) + " - " + dateNow.toISOString());
    });
  };

  const getOnlyDaysDifference = (date: number | string | Date) => {
    // Get the current date in the system timezone
    const dateNow = new Date();
    console.log("date now:", dateNow, dateNow.toISOString());
    const dateToNow = convertToSystemTimezone(
      new Date(
        Date.UTC(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate())
      )
    );
    const dateToCompare = convertToSystemTimezone(
      new Date(
        Date.UTC(
          new Date(date).getFullYear(),
          new Date(date).getMonth(),
          new Date(date).getDate()
        )
      )
    );

    const diff = dateToCompare.getTime() - dateToNow.getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    setDays(String(days) + " - " + dateNow.toISOString());
  };

  const getGlobalConversorOnlyDaysDifference = (
    date: number | string | Date
  ) => {
    // Get the current date in the system timezone
    const cDate = new Date();
    const dateNow = convertLocalToSystemTimeZone(cDate);
    console.log("date now:", dateNow, dateNow.toISOString());
    const dateToNow = convertToSystemTimezone(
      new Date(
        Date.UTC(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate())
      )
    );
    const dateToCompare = convertToSystemTimezone(
      new Date(
        Date.UTC(
          new Date(date).getFullYear(),
          new Date(date).getMonth(),
          new Date(date).getDate()
        )
      )
    );

    const diff = dateToCompare.getTime() - dateToNow.getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    setDays(String(days) + " - " + dateNow.toISOString());
  };

  return {
    onServerButtonClick,
    onClientButtonClick,
    onClientToSystemButtonClick,
    onServerConvertedButtonClick,
    filters,
    getOnlyDaysDifference,
    getServerOnlyDaysDifference,
    days,
    getGlobalConversorOnlyDaysDifference,
  };
};

export default useDateFilter;
