import { getCurrentTime } from "@/actions/getCurrentTime";
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

  const onClientButtonClick = (
    filter: EDeadLineFilters,
    columnName = "deadLine"
  ) => {
    const now = new Date();
    const currentTime = now.toISOString();
    setFilters(getDateIntervalFilterForDB(filter, columnName, currentTime));
  };

  const onClientToSystemButtonClick = (
    filter: EDeadLineFilters,
    columnName = "deadLine"
  ) => {
    const now = new Date();
    const timeZoneDate = convertToSystemTimezone(now);
    setFilters(
      getDateIntervalFilterForDB(filter, columnName, timeZoneDate.toISOString())
    );
  };

  return {
    onServerButtonClick,
    onClientButtonClick,
    onClientToSystemButtonClick,
    filters,
  };
};

export default useDateFilter;
