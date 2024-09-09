"use client";
import React, { useEffect, useState } from "react";
import DateNow from "./dateNow";
import ClientDate from "./date";
import moment from "moment";
import useDateFilter from "@/hooks/use-date-filter";
import { EDeadLineFilters } from "@/domain/constants/components";

const DateState = () => {
  const {
    onServerButtonClick,
    onClientButtonClick,
    onClientToSystemButtonClick,
    filters,
  } = useDateFilter();

  return (
    <div className="flex flex-col gap-3">
      <p>{JSON.stringify(filters)}</p>

      <button
        className="bg-black text-white"
        onClick={() => onServerButtonClick(EDeadLineFilters.FUTURE)}>
        Set future server Date
      </button>
      <button
        className="bg-black text-white"
        onClick={() => onClientButtonClick(EDeadLineFilters.FUTURE)}>
        Set future client date
      </button>
      <button
        className="bg-black text-white"
        onClick={() => onClientToSystemButtonClick(EDeadLineFilters.FUTURE)}>
        Set future client date to system
      </button>

      <button
        className="bg-black text-white"
        onClick={() => onServerButtonClick(EDeadLineFilters.OVERDUE)}>
        Set OVERDUE server Date
      </button>
      <button
        className="bg-black text-white"
        onClick={() => onClientButtonClick(EDeadLineFilters.OVERDUE)}>
        Set OVERDUE client date
      </button>
      <button
        className="bg-black text-white"
        onClick={() => onClientToSystemButtonClick(EDeadLineFilters.OVERDUE)}>
        Set OVERDUE client date to system
      </button>

      <h2>CONSTANT DATES</h2>

      <h2>Client Date moment</h2>
      <ClientDate />
      <h2>Client Date Now</h2>
      <DateNow />
    </div>
  );
};

export default DateState;
