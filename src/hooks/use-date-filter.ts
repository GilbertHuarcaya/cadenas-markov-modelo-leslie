import { getCurrentTime } from "@/actions/getCurrentTime";
import { getCurrentTimeConverted } from "@/actions/getCurrentTimeConverted";
import { EDeadLineFilters } from "@/domain/constants/components";
import { convertToSystemTimezone } from "@/helpers/convertToSystemTimezone";
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

  return {
    onServerButtonClick,
    onClientButtonClick,
    onClientToSystemButtonClick,
    onServerConvertedButtonClick,
    filters,
  };
};

export default useDateFilter;
