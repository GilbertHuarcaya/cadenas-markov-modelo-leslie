"use client";
import React, { useState } from "react";
import DateNow from "./dateNow";
import ClientDate from "./date";

const DateState = () => {
  const [dateState, setDateState] = useState<Date>();
  return (
    <div className="flex flex-col gap-3">
      <p>{JSON.stringify(dateState)}</p>
      {dateState ? (
        <>
          <p>{dateState?.toString()}</p>
          <p>{dateState?.toLocaleString()}</p>
        </>
      ) : (
        <>No hay fecha</>
      )}
      <button
        className="bg-black text-white"
        onClick={() => setDateState(new Date())}>
        Set Date
      </button>
      <button
        className="bg-black text-white"
        onClick={() => setDateState(new Date(Date.now()))}>
        Set Date Now
      </button>
      <h2>Client Date moment</h2>
      <ClientDate />
      <h2>Client Date Now</h2>
      <DateNow />
    </div>
  );
};

export default DateState;
